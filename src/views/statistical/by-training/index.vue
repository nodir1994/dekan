<script setup lang="ts">
import type { StatisticalByTrainingFace } from "@/utils/interfaces";
import { reactive, ref, onMounted, watch } from "vue";
import {
  eduPlanListAll,
  academicGroupListById,
  academicYearsList,
  semesterListByAcademicYearAndEduPlan,
} from "@/utils/api/reference/index";
import { byTrainingStatistical } from "@/utils/api/statistical/by-training/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";

// consts

const isLoading = ref(false);
const { t } = useI18n();
const semesterOptions: any = ref([]);
const deparmentEmployeesCount = ref<any[]>([]);
const forDeparmentEach = ref<any[]>([]);
const allCounts = ref<any[]>([]);

const apiData: {
  result: StatisticalByTrainingFace[];
} = reactive({
  result: [],
});

const optionsList = reactive({
  optionaEduPlanByList: null,
  optionacademicYearsList: null,
  optionacademicGroupListById: null,
});

const apiParams = reactive({
  edu_plan_id: null, // o'quv reja
  academic_year_id: null, // o'quv yili
  semester_id: null, // Semester
  academic_group_id: null, // guruh
});

// hooks

onMounted(async () => {
  optionsList.optionaEduPlanByList = await eduPlanListAll().then(
    (res) => res.result.data
  ); // o'quv reja
  optionsList.optionacademicYearsList = await academicYearsList().then(
    (res) => res.result?.data
  ); // o'quv yili
});

watch(
  () => apiParams.edu_plan_id,
  async (newVal: any) => {
    if (Number(newVal)) {
      optionsList.optionacademicGroupListById = await academicGroupListById(
        newVal
      ).then((res) => res.result.data); // guruh
    }
  }
);

watch(
  () => apiParams.academic_year_id,
  async (newVal: any) => {
    if (Number(newVal)) {
      let datas: any = reactive({});
      if (apiParams.academic_year_id)
        datas.academic_year_id = apiParams.academic_year_id;
      if (apiParams.edu_plan_id) datas.edu_plan_id = apiParams.edu_plan_id;
      let semesterOption = await semesterListByAcademicYearAndEduPlan(
        datas
      ).then((res) => res.result.data); // Semesterlar
      semesterOptions.value = semesterOption.map((item: any) => {
        return {
          id: item.id,
          name: item.semester + "-" + t("semester"),
        };
      });
    }
  }
);

// functions

function getArray(arr: any) {
  let datas: any = [];

  arr.map((item: any) => {
    datas.push(item);
  });

  return datas;
}

async function onSearch() {
  isLoading.value = true;
  const res = await byTrainingStatistical(apiParams);
  Object.assign(apiData, res);
  apiData.result.forEach((element) => {
    const tempArr: any[] = getArray(element.list);
    forDeparmentEach.value.push(tempArr);
  });
  forDeparmentEach.value.forEach((item) => {
    allCounts.value = [];
    item.forEach((item2: any) => {
      allCounts.value.push(item2.hour);
      allCounts.value.push(item2.done_hour);
      allCounts.value.push(item2.relic_hour);
    });
    allCounts.value.push(
      item.reduce((total: number, item: any) => total + item.hour, 0)
    );
    allCounts.value.push(
      item.reduce((total: number, item: any) => total + item.done_hour, 0)
    );
    allCounts.value.push(
      item.reduce((total: number, item: any) => total + item.relic_hour, 0)
    );

    deparmentEmployeesCount.value.push(allCounts.value);
  });
  isLoading.value = false;
}
</script>
<template>
  <div pagetitle="`O'zlashtirish statistikasi`" class="teacherRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Training_statistics") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <a-form-item class="my-2 col-md-6" name="curriculum">
              <a-select
                v-model:value="apiParams.edu_plan_id"
                :options="optionsList.optionaEduPlanByList"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="t('Choose_a_curriculum')"
                allow-clear
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-md-6" name="educationYear">
              <a-select
                v-model:value="apiParams.academic_year_id"
                :options="optionsList.optionacademicYearsList"
                :placeholder="t('Choose_Education_Year')"
                :field-names="{ value: 'id', label: 'name' }"
                allow-clear
                :disabled="!apiParams.edu_plan_id"
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-md-6" name="semester">
              <a-select
                v-model:value="apiParams.semester_id"
                :options="semesterOptions"
                :placeholder="t('Select_semester')"
                :field-names="{ value: 'id', label: 'name' }"
                :disabled="!apiParams.academic_year_id"
                allow-clear
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-md-3" name="group">
              <a-select
                v-model:value="apiParams.academic_group_id"
                :options="optionsList.optionacademicGroupListById"
                :placeholder="t('Select_a_group')"
                :field-names="{ value: 'id', label: 'name' }"
                :disabled="!apiParams.edu_plan_id"
                allow-clear
              >
              </a-select>
            </a-form-item>

            <div class="my-2 col-md-3">
              <button
                :disabled="!apiParams.academic_group_id"
                class="btn-search c-save"
                type="submit"
              >
                <i class="mdi mdi-eye me-2"></i>{{ $t("View_Academic_Sheet") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div
          class="table-responsive table-statistical"
          v-if="apiData.result.length > 0"
        >
          <table>
            <thead>
              <tr>
                <th rowspan="2" style="min-width: 55px">№</th>
                <th rowspan="2" style="min-width: 200px">
                  {{ $t("student_Sciences") }}
                </th>
                <th colspan="3">{{ $t("Lecture") }}</th>
                <th colspan="3">{{ $t("Laboratory") }}</th>
                <th colspan="3">{{ $t("Practical") }}</th>
                <th colspan="3">{{ $t("Seminar") }}</th>
                <th colspan="3">{{ $t("Total_Point") }}</th>
              </tr>

              <tr>
                <th style="min-width: 55px">{{ $t("Plan") }}</th>
                <th style="min-width: 55px">{{ $t("In_practice") }}</th>
                <th style="min-width: 55px">{{ $t("Remained") }}</th>
                <th style="min-width: 55px">{{ $t("Plan") }}</th>
                <th style="min-width: 55px">{{ $t("In_practice") }}</th>
                <th style="min-width: 55px">{{ $t("Remained") }}</th>
                <th style="min-width: 55px">{{ $t("Plan") }}</th>
                <th style="min-width: 55px">{{ $t("In_practice") }}</th>
                <th style="min-width: 55px">{{ $t("Remained") }}</th>
                <th style="min-width: 55px">{{ $t("Plan") }}</th>
                <th style="min-width: 55px">{{ $t("In_practice") }}</th>
                <th style="min-width: 55px">{{ $t("Remained") }}</th>
                <th style="min-width: 55px">{{ $t("Plan") }}</th>
                <th style="min-width: 55px">{{ $t("In_practice") }}</th>
                <th style="min-width: 55px">{{ $t("Remained") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, elIndex) in apiData.result" :key="elIndex">
                <td>
                  {{ +elIndex + 1 }}
                </td>
                <td class="text-start">
                  {{ element.subject }}
                </td>
                <td
                  v-for="(element, index) in deparmentEmployeesCount[elIndex]"
                >
                  {{ element }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-responsive table-statistical" v-else>
          <NoData />
        </div>
      </div>
    </div>
    <!-------END TABLE 1---------------------------------------->
  </div>
</template>
<style lang="scss">
.teacherRatingPage {
  .table-statistical {
    table {
      td {
        width: auto;
      }
    }
  }
}
</style>
