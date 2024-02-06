<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {
  academicYearsList,
  semesterTypeList,
  courseList,
  educationList,
  eduFormList,
} from "@/utils/api/reference/index";
import { statisticalByPerformanceList } from "@/utils/api/statistical/by-performance/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import type { statisticalByPerformanceFace } from "@/utils/interfaces";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import NoData from "@/components/NoData.vue";

// consts

const { t } = useI18n();
const isLoading = ref(false);
const studentCount = ref();
const countRating5 = ref();
const percent5 = ref();
const countRating4 = ref();
const percent_4 = ref();
const countRating3 = ref();
const percent3 = ref();
const countRating2 = ref();
const percent_2 = ref();
const academicYear_name = ref();
const semesterType_name = ref();
const course_name = ref();
const edu_type_id_name = ref();
const optioncourseLists = ref();
const apiData: {
  // pagination: PaginationProps;
  result: statisticalByPerformanceFace[];
} = reactive({
  // pagination: {
  //   current_page: 1,
  //   per_page: 1,
  //   total_pages: 1,
  // },
  result: [],
});
const optionsList: any = reactive({
  optionacademicYeList: null,
  optionsemesterTypeList: null,
  optioncourseList: null,
  optioneducationList: null,
  optioneduFormList: null,
});
const apiParams = reactive({
  academic_year_id: null, // oquv yili
  semester_type: null, // semester turi`
  course: null, // kurs
  edu_type_id: null, // ta'lim turi
  edu_form_id: null, // ta'lim shakli
});

// hooks

onMounted(async () => {
  optionsList.optionacademicYeList = await academicYearsList().then(
    (res) => res.result?.data
  ); // oquv yili
  optionsList.optionsemesterTypeList = await semesterTypeList().then(
    (res) => res.result
  ); // semester tipi
  optionsList.optioneducationList = await educationList().then(
    (res) => res.result
  ); // talim turi
  optionsList.optioneduFormList = await eduFormList().then((res) => res.result); // talim shakli

  optionsList.optioncourseList = await courseList().then((res) => res.result); // kurs
  optioncourseLists.value = optionsList.optioncourseList.map((item: any) => {
    return {
      id: item.id,
      name: item.name + "-" + t("by_Level"),
    };
  });
});

// function

async function onSearch() {
  await fetchList();
}

async function fetchList() {
  isLoading.value = true;
  const res = await statisticalByPerformanceList(apiParams);
  Object.assign(apiData, res);
  academicYear_name.value = optionsList.optionacademicYeList.find(
    (x: any) => x.id == apiParams.academic_year_id
  ).name;
  semesterType_name.value = optionsList.optionsemesterTypeList.find(
    (x: any) => x.code == apiParams.semester_type
  ).name;
  course_name.value = optionsList.optioncourseList.find(
    (x: any) => x.id == apiParams.course
  ).name;
  edu_type_id_name.value = optionsList.optioneducationList.find(
    (x: any) => x.id == apiParams.edu_type_id
  ).name;
  studentCount.value = apiData.result.reduce(
    (total: any, item: any) => total + item.student_count,
    0
  );
  countRating5.value = apiData.result.reduce(
    (total: any, item: any) => total + item.count_rating_5,
    0
  );

  percent5.value = apiData.result.reduce(
    (total: any, item: any) => total + item.percent_5,
    0
  );
  countRating4.value = apiData.result.reduce(
    (total: any, item: any) => total + item.count_rating_4,
    0
  );
  percent_4.value = apiData.result.reduce(
    (total: any, item: any) => total + item.percent_4,
    0
  );
  countRating3.value = apiData.result.reduce(
    (total: any, item: any) => total + item.count_rating_3,
    0
  );
  percent3.value = apiData.result.reduce(
    (total: any, item: any) => total + item.percent_3,
    0
  );
  countRating2.value = apiData.result.reduce(
    (total: any, item: any) => total + item.count_rating_2,
    0
  );
  percent_2.value = apiData.result.reduce(
    (total: any, item: any) => total + item.percent_2,
    0
  );
  isLoading.value = false;
}
</script>
<template>
  <div pagetitle="`O'zlashtirish statistikasi`" class="teacherRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Appropriation_statistics") }}</h5>
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
          <div class="row">
            <form class="row" @submit.prevent="onSearch">
              <a-form-item class="my-2 col-md-4" name="educationYear">
                <a-select
                  :placeholder="t('Choose_Education_Year')"
                  v-model:value="apiParams.academic_year_id"
                  :options="optionsList.optionacademicYeList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-form-item>

              <a-form-item class="my-2 col-md-4" name="semeterType">
                <a-select
                  :placeholder="t('Choose_Semestr_Type')"
                  v-model:value="apiParams.semester_type"
                  :options="optionsList.optionsemesterTypeList"
                  :disabled="!apiParams.academic_year_id"
                  :field-names="{ value: 'code', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-form-item>

              <a-form-item class="my-2 col-md-4" name="lavel">
                <a-select
                  :placeholder="t('Select_the_course')"
                  v-model:value="apiParams.course"
                  :options="optioncourseLists"
                  :disabled="!apiParams.semester_type"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-form-item>

              <a-form-item class="my-2 col-md-4" name="educationType">
                <a-select
                  :placeholder="t('Choose_Education_Type')"
                  v-model:value="apiParams.edu_type_id"
                  :disabled="!apiParams.course"
                  :options="optionsList.optioneducationList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-form-item>

              <a-form-item class="my-2 col-md-4" name="educationForm">
                <a-select
                  :placeholder="t('Choose_Education_Form')"
                  v-model:value="apiParams.edu_form_id"
                  :disabled="!apiParams.edu_type_id"
                  :options="optionsList.optioneduFormList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-form-item>
              <div class="my-2 col-md-4">
                <button
                  :disabled="
                    !apiParams.edu_form_id ||
                    !apiParams.edu_type_id ||
                    !apiParams.semester_type ||
                    !apiParams.academic_year_id
                  "
                  class="btn-search c-save"
                  type="submit"
                >
                  <!-- !apiParams.course || -->

                  <i class="mdi mdi-eye me-2"></i
                  >{{ $t("View_Academic_Sheet") }}
                </button>
              </div>
            </form>
          </div>
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
          <div class="table-header">
            <table>
              <tr>
                <td>
                  <span>{{ $t("Curriculum_Education_Year") }}:</span>
                  <b>{{ academicYear_name }}</b>
                </td>
                <td>
                  <span>{{ $t("Semestr_Type") }}:</span>
                  <b>{{ semesterType_name }}</b>
                </td>
              </tr>
              <tr>
                <td>
                  <span>{{ $t("by_Level") }}:</span>
                  <b>{{ course_name }}</b>
                </td>
                <td>
                  <span>{{ t("Education_Type") }}:</span>
                  <b>{{ edu_type_id_name }}</b>
                </td>
              </tr>
            </table>
          </div>
          <table>
            <thead>
              <tr>
                <th rowspan="3" style="min-width: 70px">№</th>
                <th rowspan="3" style="min-width: 300px">
                  {{ $t("Faculty") }}
                </th>
                <th rowspan="3" style="min-width: 70px">
                  {{ $t("all_Student") }}
                </th>
                <th colspan="8">{{ $t("Mastery_indicator") }}</th>
              </tr>
              <tr>
                <th colspan="2">5</th>
                <th colspan="2">4</th>
                <th colspan="2">3</th>
                <th colspan="2">2</th>
              </tr>
              <tr>
                <th style="min-width: 60px">{{ $t("Number") }}</th>
                <th style="min-width: 60px">{{ $t("Percent") }}</th>
                <th style="min-width: 60px">{{ $t("Number") }}</th>
                <th style="min-width: 60px">{{ $t("Percent") }}</th>
                <th style="min-width: 60px">{{ $t("Number") }}</th>
                <th style="min-width: 60px">{{ $t("Percent") }}</th>
                <th style="min-width: 60px">{{ $t("Number") }}</th>
                <th style="min-width: 60px">{{ $t("Percent") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, index) in apiData.result" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td style="text-align: start">{{ element?.faculty }}</td>
                <td>{{ element?.student_count }}</td>
                <td>{{ element?.count_rating_5 }}</td>
                <td>{{ element?.percent_5 }}</td>
                <td>{{ element?.count_rating_4 }}</td>
                <td>{{ element?.percent_4 }}</td>
                <td>{{ element?.count_rating_3 }}</td>
                <td>{{ element?.percent_3 }}</td>
                <td>{{ element?.count_rating_2 }}</td>
                <td>{{ element?.percent_2 }}</td>
              </tr>

              <tr>
                <th></th>
                <th style="text-align: start">{{ $t("Total_Point") }}</th>
                <th>{{ studentCount }}</th>
                <th>{{ countRating5 }}</th>
                <th>{{ percent5 }} %</th>
                <th>{{ countRating4 }}</th>
                <th>{{ percent_4 }} %</th>
                <th>{{ countRating3 }}</th>
                <th>{{ percent3 }} %</th>
                <th>{{ countRating2 }}</th>
                <th>{{ percent_2 }} %</th>
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
  .table-header table td span {
    width: auto;
    margin-right: 15px;
  }
}
</style>
