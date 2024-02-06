<script setup lang="ts">
import type { StatisticalRecourseFace } from "@/utils/interfaces";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { reactive, ref, onMounted, watch, computed } from "vue";
import {
  eduPlanList,
  semesterListById,
  getListSubjects,
  academicTrainingList,
  systemLanguageList,
  eduPlanListAll,
} from "@/utils/api/reference/index";
import { recourseStatisticList } from "@/utils/api/statistical/resource/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
// consts
const isLoading = ref(false);
const { t } = useI18n();
const semesterOptions = ref();
const apiParams: any = reactive({
  edu_plan_id: null, // o'quv reja
  semester_id: null, // Semester
  subject_id: null, // Fan
  lesson_activity_id: null, // Mashg'ulot
  language_id: null, // Til
  grouping_type: "subject",
  page: 1,
  per_page: helpers.pagePer,
});
const apiData: {
  pagination: PaginationProps;
  result: StatisticalRecourseFace[];
} = reactive({
  pagination: {
    current_page: 1,
    per_page: apiParams.per_page,
    loading: false,
  },
  result: [],
});
const optionsList = reactive({
  optionaEduPlanByList: null,
  optionSemesterList: null,
  optionSubjectList: null,
  optionAcademicTrainingList: null,
  optionEduLangList: null,
});
const counters = ref<any>({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});
const forGrouping = ref<any[]>([
  { id: "subject", name: t("student_Sciences") },
  { id: "edu_plan", name: t("Curriculum") },
]);
const loader = ref(false);
// hooks

onMounted(async () => {
  optionsList.optionaEduPlanByList = await eduPlanListAll().then(
    (res) => res.result.data
  ); // o'quv reja

  optionsList.optionEduLangList = await systemLanguageList().then(
    (res) => res.result
  ); // Til
  optionsList.optionAcademicTrainingList = await academicTrainingList().then(
    (res) => res.result
  ); // Mashg'ulot
  // console.log(
  //   "optionsList.optionAcademicTrainingList",
  //   optionsList.optionAcademicTrainingList
  // );
});
watch(
  () => [
    apiParams.edu_plan_id,
    apiParams.semester_id,
    apiParams.subject_id,
    apiParams.lesson_activity_id,
    apiParams.language_id,
    apiParams.grouping_type,
  ],
  async (newVal) => {
    await fetchList();
  }
);

watch(
  () => apiParams.edu_plan_id,
  async (newVal) => {
    apiParams.semester_id = null;
    semesterOptions.value = null;
    if (Number(newVal)) {
      let semesterOption = await semesterListById(apiParams.edu_plan_id).then(
        (res) => res.result.data
      ); // Semesterlar
      semesterOptions.value = semesterOption.map((item: any) => {
        return {
          id: item.id,
          name: item.semester + "-" + t("semester"),
        };
      });
    }
  }
);
watch(
  () => apiData.pagination.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      await fetchList(newVal);
    }
  }
);

watch(
  () => apiParams.semester_id,
  async (newVal) => {
    apiParams.subject_id = null;
    optionsList.optionSubjectList = null;
    if (newVal) {
      optionsList.optionSubjectList = await getListSubjects(apiParams).then(
        (res) =>
          res.result?.map((element: any) => {
            return {
              id: element?.subject?.id,
              name: element?.subject?.name,
            };
          })
      ); // Fanlar
    }
  }
);

// functions

await fetchList();

async function fetchList(page?: number) {
  delete apiParams.page;
  let datas: any = reactive({
    ...apiParams,
    page: page || 1,
  });

  try {
    isLoading.value = true;
    if (loader) {
      loader.value = false;
      const res = await recourseStatisticList(datas);
      Object.assign(apiData, res);
      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
    let sequenceNumber = `${
      apiData.pagination.per_page * (apiData.pagination.current_page - 1) + 1
    }- ${
      apiData.result.length +
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1)
    }`;
    let theNumber = `${t("Total_Point")} : ${apiData.pagination.total}`;
    let sorting =
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1);
    counters.value.sequenceNumber = sequenceNumber;
    counters.value.theNumber = theNumber;
    counters.value.sorting = sorting;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'Malaka oshirish'" class="transferPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Resource_statistics") }}</h5>
          <div class="filterBlock">
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------->

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <!-- // Fakultet  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Faculty") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.edu_plan_id"
                  :options="optionsList.optionaEduPlanByList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  class="form--item"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("study_plan") }}</label>
            </div>

            <!-- //semestr  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.semester_id"
                  :options="semesterOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiParams.edu_plan_id"
                  allow-clear
                  class="form--item"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("semester") }} </label>
            </div>

            <!-- // Fanlar  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.subject_id"
                  :options="optionsList.optionSubjectList"
                  :disabled="!apiParams.semester_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  class="form--item"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("student_Sciences") }}</label>
            </div>

            <!-- // Mashg'ulot  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.lesson_activity_id"
                  :options="optionsList.optionAcademicTrainingList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  class="form--item"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("student_Training") }}</label>
            </div>

            <!-- // Til  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.language_id"
                  :options="optionsList.optionEduLangList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  class="form--item"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Language") }}</label>
            </div>

            <!-- // Guruhlash  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.grouping_type"
                  :options="forGrouping"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  class="form--item"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Grouping") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div class="table-responsive" v-if="apiData.result.length">
          <table class="content-table">
            <thead>
              <tr class="table-row-all-students">
                <th>#</th>
                <th>{{ $t("study_plan") }}</th>
                <th>{{ $t("student_Sciences") }}</th>
                <th>{{ $t("semester") }}</th>
                <th>{{ $t("Numbe_resources") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-all-students"
                v-for="(element, index) in apiData.result"
                :key="index"
              >
                <td>
                  {{
                    apiData.pagination.per_page *
                      (apiData.pagination.current_page - 1) +
                    index +
                    1
                  }}
                </td>
                <td>
                  {{ element.edu_plan }} <br />
                  {{ deanId }}
                </td>
                <td>{{ element.subject }} <br /></td>
                <td v-if="element.semester">
                  {{ element.semester }}-{{ $t("semester") }}
                </td>
                <td v-else></td>
                <td class="text-center">
                  {{ element.count }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <PaginationForStatistical
            v-if="apiData.pagination.last_page! > 1"
            class="mt-2"
            v-bind="{ ...apiData.pagination }"
            v-model:current-page="apiData.pagination.current_page"
            :loading="isLoading"
            @on-page-change="fetchList"
          />
          <!-- --------------end pagination--------------------- -->
        </div>
        <div class="table-responsive" v-else>
          <NoData />
        </div>
      </div>
    </div>
    <span
      class="element-count mb-2"
      :class="!apiData.pagination.total ? 'd-none' : ''"
    >
      <span v-if="apiData.pagination.last_page">
        {{ counters.sequenceNumber }} / </span
      >{{ counters.theNumber }}</span
    >
  </div>
</template>

<style lang="scss">
.transferPage {
  .table-row-all-students {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 400px auto 150px 100px;

    @media (max-width: 767px) {
      grid-template-columns: 50px 300px 300px 120px 80px;
    }

    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }
}

.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>
