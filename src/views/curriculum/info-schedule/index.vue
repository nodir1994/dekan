<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { lessonScheduleList, exportFile } from "@/utils/api/edu/schedule-info";
import type { LessonScheduleInterface } from "./[id]/index.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import helpers from "@/utils/helper";
const counters: any = ref({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});
const { t } = useI18n();
const router = useRouter();
const isLoading = ref(false);
//filterlar
const apiData: {
  current_page: number;
  data: LessonScheduleInterface[];
  links: [];
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
  page: 1,
  per_page: helpers.pagePer,
});

await fetchList();

// hooks
watch(
  () => apiData.current_page,
  async (newVal) => {
    if (newVal) {
      await fetchList(newVal);
    }
  }
);

async function fetchList(page?: number) {
  isLoading.value = true;
  const params = {
    ...apiParams,
    page: apiData.current_page,
  };
  const res = await lessonScheduleList(params);
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
async function downloadFile() {
  delete apiParams.page;
  delete apiParams.per_page;

  try {
    isLoading.value = true;
    const res = await exportFile(apiParams);
    const url = URL.createObjectURL(
      new Blob([res], {
        type: "application/vnd.ms-excel",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Worksheet_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
}
function gotoCalendarView(id: number) {
  const query: any = {};
  Object.getOwnPropertyNames(apiParams).forEach((prop) => {
    if (apiParams[prop]) {
      query[prop] = apiParams[prop];
    }
  });

  const path = `/curriculum/info-schedule/${id}`;
  router.push({ path });
}
</script>

<template>
  <div pagetitle="'Dars jadvali'" class="schedule-list-page-lesson">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <PageHeader :title="$t('Curriculum_Schedule')">
      <div class="filterBlock">
        <button class="btns c-save py-1.5 px-4 me-3" @click="downloadFile()">
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
    <LessonScheduleFilter
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
                <th>{{ $t("Count_of_weeks") }}</th>
                <th>{{ $t("Weeks_lessons") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row w-100 d-grid"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{ element.edu_plan }}
                </td>
                <td>
                  {{ element.academic_year }}
                </td>
                <td>
                  <template v-if="element?.semester?.semester">
                    {{ element?.semester?.semester }}-
                    {{ $t("semester_number") }}
                  </template>
                </td>
                <td>
                  <router-link
                    class="btn text-primary p-0"
                    type="button"
                    :to="`/curriculum/info-schedule/${element.id}`"
                  >
                    <i class="mdi mdi-arrow-top-right me-1"></i>
                    {{ element?.academic_group?.name }}
                  </router-link>
                </td>
                <td>
                  {{ element.week_count }}
                </td>
                <td>
                  <div v-for="(week, index) in element.weeks" :key="index">
                    <span
                      :class="week.count != 0 ? 'actions-h' : 'actions-r'"
                      class="btns1"
                    >
                      №{{ week?.position }}
                      <span v-if="!week.count">- 0</span>
                      <span v-else>- {{ week.count }}</span>
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
.schedule-list-page-lesson {
  .table-row {
    grid-template-columns: auto 120px 10% 10% 12% 40%;
    @include mobile() {
      grid-template-columns: 170px 100px 100px 100px 70px 350px;
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
