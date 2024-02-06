<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { lessonExamSchedule } from "@/utils/api/edu/schedule-exam";
import type { LessonScheduleInterface } from "./[id]/index.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import helpers from "@/utils/helper";
const { t } = useI18n();
const router = useRouter();
const isLoading = ref(false);
const counters: any = ref({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});
const apiData: {
  current_page: number;
  data: LessonScheduleInterface[];
  links: any[];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams: any = reactive({
  faculty_id: null,
  edu_plan_id: null,
  edu_form_id: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  per_page: helpers.pagePer,
});

await fetchList();

// hooks
watch(
  () => apiData.current_page,
  async (newVal) => {
    if (newVal) {
      await fetchList();
    }
  }
);

async function fetchList() {
  isLoading.value = true;
  const params = {
    ...apiParams,
    page: apiData.current_page,
  };
  const res = await lessonExamSchedule(params);
  Object.assign(apiData, res.result);
  if (apiParams.academic_group_id && apiData.data.length) {
    let group_id = apiData.data.map((item) => {
      return { id: item.id };
    });
  }
  let sequenceNumber = `${apiData.current_page}- ${
    apiData.data.length + apiData.per_page * (apiData.current_page - 1)
  }`;
  let theNumber = `${t("Total_Point")} : ${apiData.total}`;
  let sorting = apiData.per_page * (apiData.current_page - 1);
  isLoading.value = false;
  counters.value.sequenceNumber = sequenceNumber;
  counters.value.theNumber = theNumber;
  counters.value.sorting = sorting;
}

function gotoCalendarView(id: number) {
  const query: any = {};
  Object.getOwnPropertyNames(apiParams).forEach((prop) => {
    if (apiParams[prop]) {
      query[prop] = apiParams[prop];
    }
  });
  const path = `/curriculum/exam-schedule/${id}`;
  router.push({ path });
}
</script>

<template>
  <div pagetitle="'Dars jadvali'" class="schedule-list-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <PageHeader>
      <template #title> {{ $t("Curriculum_Exam_Schedule") }} </template>
      <div class="filterBlock">
        <button class="btns c-save py-1.5 px-4 me-3" type="submit">
          <i class="mdi mdi-download font-size-14 align-middle me-1"></i
          >{{ $t("Download") }}
        </button>
        <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
          <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
          >{{ $t("Filter") }}
        </button>
      </div>
    </PageHeader>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <ExamScheduleFilter
      v-model:filter-form="apiParams"
      @search="fetchList"
      @open="gotoCalendarView"
    />
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th>{{ $t("Curriculum") }}</th>
                <th>{{ $t("Education_Year_Name") }}</th>
                <th>{{ $t("Semester_Name") }}</th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("Subjects_midterm_final") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row w-100 d-grid"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{ element?.edu_plan?.name }}
                </td>
                <td>
                  {{ element?.academic_year?.name }}
                </td>
                <td>
                  {{ element?.semester?.semester }}- {{ $t("semester_number") }}
                </td>
                <td>
                  <router-link
                    class="btn text-primary p-0"
                    type="button"
                    :to="`/curriculum/exam-schedule/${element.id}?semester_id=${element?.semester?.id}`"
                  >
                    <i class="mdi mdi-arrow-top-right me-1"></i>
                    {{ element?.academic_group?.name }}
                  </router-link>
                </td>
                <td>
                  <div v-for="(exam, index) in element.exams" :key="index">
                    <span
                      :class="exam.count != 0 ? 'actions-h' : 'actions-r'"
                      class="btns1"
                    >
                      №{{ index + 1 }}|
                      {{ exam.subject }}
                      <span v-if="!exam.count">- [0]</span>
                      <span v-else>- [{{ exam.count }}]</span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination
            v-if="apiData.last_page > 1"
            class="mt-2"
            v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page"
            :loading="isLoading"
          />
          <!-------------END PAGINATION-------------->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center mb-0">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length">
      <span v-if="apiData.last_page > 1"> {{ counters.sequenceNumber }} / </span
      >{{ counters.theNumber }}</span
    >
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.schedule-list-page {
  .table-row {
    grid-template-columns: auto 10% 10% 12% 45%;
    @include mobile() {
      grid-template-columns: 170px 100px 100px 100px 350px;
    }
    th,
    td {
      &:last-child,
      &:first-child {
        justify-content: left;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
