<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import {
  academicYearsList,
  semesterTypeList,
} from "@/utils/api/reference/index";
import type { BystudentGeneral } from "@/utils/interfaces";
import { bySocialStudentList } from "@/utils/api/statistical/social-student/index";
import type { PaginationProps } from "@/components/partials/Pagination.vue";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import SelectData from "@/components/SelectData.vue";
const { t } = useI18n();
const isLoading = ref(false);

const optionacademicYearsList = await academicYearsList().then(
  (res) => res.result.data
);
const optionsemesterTypeList = await semesterTypeList().then(
  (res) => res.result
);
const viewCourse = ref(false);
const viewSocial = ref(false);
const academicYear_name = ref();
const semesterType_name = ref();
const coursBall = ref<number[]>([]);
const allCourseBall = reactive({
  summ: 0,
});
const allFaculteySumm = reactive({
  summ: 0,
});
const socialSum = ref<any[]>([]);
const apiData: {
  result: BystudentGeneral[];
} = reactive({
  result: [],
});
const apiParams = reactive({
  url: "",
  academic_year_id: null, // fakultet
  semester_type: null, // kafedra
});
const sumOfCol = ref<number[]>([]);
const dataOfCount = ref<any[]>([]);

async function onSearch() {
  await fetchList();
  academicYear_name.value = optionacademicYearsList.find(
    (x: any) => x.id == apiParams.academic_year_id
  ).name;
  semesterType_name.value = optionsemesterTypeList.find(
    (x: any) => x.code == apiParams.semester_type
  ).name;
}

function getArray(arr: any) {
  let datas: any = [];
  arr.map((item2: any) => {
    item2.courses.map((item: any) => {
      datas.push(item);
    });
  });
  return datas;
}

async function fetchList() {
  try {
    isLoading.value = true;
    const res = await bySocialStudentList(apiParams);
    Object.assign(apiData, res);
    if (apiParams.url == "course") {
      viewCourse.value = true;
      viewSocial.value = false;
      dataOfCount.value = [];

      apiData.result.forEach((element) => {
        const tempArr: any[] = getArray(element.edu_forms);
        dataOfCount.value.push(tempArr);
      });
      allCourseBall.summ = 0;
      coursBall.value = [];
      sumOfCol.value = [];
      dataOfCount.value.forEach((item) => {
        item.forEach((item2: any, index2: number) => {
          if (sumOfCol.value.length < index2 + 1) {
            sumOfCol.value.length = index2 + 1;
            sumOfCol.value[index2] = 0;
          }
          sumOfCol.value[index2] += item2.count;
        });

        coursBall.value.push(
          item.reduce((total: number, it: any) => total + it.count, 0)
        );

        allCourseBall.summ = coursBall.value.reduce(
          (total: any, item: any) => total + item,
          0
        );
      });
    }
    if (apiParams.url == "social") {
      viewCourse.value = false;
      viewSocial.value = true;
      socialSum.value = [];
      allFaculteySumm.summ = 0;
      apiData.result.forEach((element) => {
        const tempArr: any[] = element?.list;
        socialSum.value.push(
          tempArr.reduce(
            (total: number, item: any) => total + item.student_count,
            0
          )
        );
        allFaculteySumm.summ = socialSum.value.reduce(
          (total: number, item: any) => total + item,
          0
        );
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`Talaba (ijtimoiy)`" class="byStudentGeneral">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Student") }} ({{ $t("social") }})</h5>
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
            <a-form-item class="my-2 col-md-3">
              <a-select
                :placeholder="t('Choose_Education_Year')"
                v-model:value="apiParams.academic_year_id"
                :options="optionacademicYearsList"
                :field-names="{ value: 'id', label: 'name' }"
                allow-clear
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-md-3">
              <a-select
                :placeholder="t('Choose_Semestr_Type')"
                v-model:value="apiParams.semester_type"
                :options="optionsemesterTypeList"
                :field-names="{ value: 'code', label: 'name' }"
                :disabled="!apiParams.academic_year_id"
                allow-clear
              >
              </a-select>
            </a-form-item>

            <div class="my-2 col-md-4">
              <a-radio-group
                v-model:value="apiParams.url"
                name="radioGroup"
                class="d-flex"
              >
                <a-radio value="course" class="font-size-16">{{
                  $t("by_All_Student")
                }}</a-radio>
                <a-radio value="social" class="font-size-16">{{
                  $t("by_Social_Category")
                }}</a-radio>
              </a-radio-group>
            </div>
            <div class="my-2 mt- col-md-2">
              <button
                :disabled="
                  !apiParams.academic_year_id ||
                  !apiParams.url ||
                  !apiParams.semester_type
                "
                class="btn-search c-save"
                type="submit"
              >
                <span>
                  <i
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></i>
                </span>
                <i class="mdi mdi-eye font-size-14 align-middle me-1"></i>
                <slot>
                  {{ $t("View_Academic_Sheet") }}
                </slot>
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->

    <template v-if="viewCourse && apiData.result.length > 0">
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
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowspan="2">
                    {{ $t("Faculty") }}
                  </th>
                  <th
                    v-for="element in apiData.result[0].edu_forms"
                    colspan="5"
                    style="min-width: 200px"
                  >
                    {{ element.edu_form }}
                  </th>
                  <th rowspan="2">{{ $t("Total_Point") }}</th>
                </tr>
                <tr>
                  <th
                    v-for="(element, index) in apiData.result[0].edu_forms
                      .length * 5"
                    style="min-width: 75px"
                    :key="index"
                  >
                    {{ (index % 5) + 1 }}-{{ $t("course_number") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, elIndex) in apiData.result" :key="elIndex">
                  <td>{{ element.faculty }}</td>
                  <td v-for="(item, itemIndex) in dataOfCount[elIndex]">
                    {{ item.count }}
                  </td>
                  <td>{{ coursBall[elIndex] }}</td>
                </tr>
                <tr>
                  <th>{{ $t("Total_Point") }}</th>
                  <template v-for="(item, index) in sumOfCol">
                    <th>{{ item }}</th>
                  </template>
                  <th>{{ allCourseBall.summ }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
    <!-------END TABLE 1---------------------------------------->

    <!-------START TABLE 2---------------------------------------->
    <template v-else-if="viewSocial && apiData.result.length > 0">
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
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="min-width: 200px">{{ $t("Faculty") }}</th>
                  <th style="min-width: 250px">{{ $t("Social_class") }}</th>
                  <th style="width: 100px">{{ $t("Number_of_students") }}</th>
                </tr>
                <tr></tr>
              </thead>
              <tbody
                v-if="apiData.result.length > 0"
                v-for="(element, index) in apiData.result"
                :key="index"
              >
                <tr>
                  <td :rowspan="apiData.result[index].list.length + 2">
                    {{ element.faculty }}
                  </td>
                </tr>
                <tr v-for="(item, index1) in element.list" :key="index1">
                  <td style="text-align: start">
                    {{ item.name }}
                  </td>
                  <td>{{ item.student_count }}</td>
                </tr>

                <tr>
                  <th style="text-align: center">{{ $t("Total_Point") }}</th>
                  <th>{{ socialSum[index] }}</th>
                </tr>
              </tbody>
              <!-- <tr>
                <th></th>
                <th style="text-align: center">
                  {{ $t("Total_faculty") }}
                </th>
                <th>{{ allFaculteySumm.summ }}</th>
              </tr> -->
            </table>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="!apiData.result.length && !viewSocial && !viewCourse">
      <div class="card">
        <div class="card-body">
          <LoadingOverlay v-if="isLoading" />
          <SelectData />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="card">
        <div class="card-body">
          <LoadingOverlay v-if="isLoading" />
          <NoData />
        </div>
      </div>
    </template>

    <!-------END TABLE 2---------------------------------------->
  </div>
</template>

<style lang="scss"></style>
