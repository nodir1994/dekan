<script setup lang="ts">
import type { StudentAllCourseStatistical } from "@/utils/interfaces";
import type { PaginationProps } from "@/components/partials/Pagination.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import {
  semesterTypeList,
  academicYearsList,
  educationList,
  eduFormList,
  eduFormLists,
  educationListAll,
} from "@/utils/api/reference/index";
import {
  StudentCourseList,
  StudentSpecialtyList,
  StudentNationList,
  StudentRegionList,
} from "@/utils/api/statistical/by-student/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";

const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
// consts
const academic_year_name = ref();
const edu_type_name = ref();
const edu_form_name = ref();
const statisticName = ref();
const isLoading = ref(false);
const { t } = useI18n();
const viewTheScheduleStatisticAndCourse = ref(false);
const viewTheScheduleNationsAndTerritory = ref(false);
const forDeparmentEach = ref<any[]>([]);
const allCounts = ref<any[]>([]);
const deparmentEmployeesCount = ref<any[]>([]);
const optionsList: any = reactive({
  OptionacademicYeList: null,
  optionTypeSemester: null,
  optioneducationList: null,
  optioneeduFormList: null,
});

const apiData: {
  result: StudentAllCourseStatistical[];
} = reactive({
  result: [],
});

const apiParams = reactive({
  academic_year_id: null, // oquv yili
  semester_type: null, // semestr turi
  faculty_id: null, // fakultet
  edu_type_id: null, // talim turi
  edu_form_id: null, // talim shakli
  statistical_type: null,
});

// hooks

onMounted(async () => {
  optionsList.OptionacademicYeList = await academicYearsList().then(
    (res) => res.result.data
  ); // O'quv yili
  optionsList.optionTypeSemester = await semesterTypeList().then(
    (res) => res.result
  ); // semestr
  optionsList.optioneducationList = await educationListAll().then(
    (res) => res.result
  ); // ta'lim turi
  optionsList.optioneeduFormList = await eduFormLists().then(
    (res) => res.result
  ); // ta'lim shakli
}),
  // function

  await fetchList();

function getArray(arr: any) {
  let datas: any = [];

  arr.map((item: any) => {
    datas.push(item);
  });

  return datas;
}

async function onSubmit() {
  await fetchList();
}

async function fetchList() {
  try {
    academic_year_name.value = optionsList.OptionacademicYeList?.find(
      (x: any) => x.id == apiParams.academic_year_id
    ).name;
    edu_type_name.value = optionsList.optioneducationList?.find(
      (x: any) => x.id == apiParams.edu_type_id
    ).name;
    edu_form_name.value = optionsList.optioneeduFormList?.find(
      (x: any) => x.id == apiParams.edu_form_id
    ).name;
    let datas = {
      academic_year_id: apiParams.academic_year_id,
      semester_type: apiParams.semester_type,
      edu_type_id: apiParams.edu_type_id,
      edu_form_id: apiParams.edu_form_id,
    };
    isLoading.value = true;
    if (apiParams.statistical_type == "course") {
      statisticName.value = "course";
      viewTheScheduleNationsAndTerritory.value = false;
      viewTheScheduleStatisticAndCourse.value = true;
      const res = await StudentCourseList(datas);
      Object.assign(apiData, res);
      forDeparmentEach.value = [];
      apiData.result.forEach((element) => {
        const tempArr: any[] = getArray(element.list);
        forDeparmentEach.value.push(tempArr);
      });
      deparmentEmployeesCount.value = [];
      forDeparmentEach.value.forEach((item) => {
        allCounts.value = [];
        item.forEach((item2: any) => {
          allCounts.value.push(item2.male);
          allCounts.value.push(item2.female);
          allCounts.value.push(item2.count);
        });

        deparmentEmployeesCount.value.push(allCounts.value);
      });
    }
    if (apiParams.statistical_type == "specialty") {
      statisticName.value = "specialty";
      viewTheScheduleNationsAndTerritory.value = false;
      viewTheScheduleStatisticAndCourse.value = true;
      const res = await StudentSpecialtyList(datas);
      Object.assign(apiData, res);
      forDeparmentEach.value = [];
      apiData.result.forEach((element) => {
        const tempArr: any[] = getArray(element.list);
        forDeparmentEach.value.push(tempArr);
      });
      deparmentEmployeesCount.value = [];
      forDeparmentEach.value.forEach((item) => {
        allCounts.value = [];
        item.forEach((item2: any) => {
          allCounts.value.push(item2.male);
          allCounts.value.push(item2.female);
          allCounts.value.push(item2.count);
        });

        deparmentEmployeesCount.value.push(allCounts.value);
      });
    }
    if (apiParams.statistical_type == "nation") {
      statisticName.value = "nation";
      viewTheScheduleStatisticAndCourse.value = false;
      viewTheScheduleNationsAndTerritory.value = true;
      const res = await StudentNationList(datas);
      Object.assign(apiData, res);
      forDeparmentEach.value = [];

      apiData.result.forEach((element) => {
        const tempArr: any[] = getArray(element.list);
        forDeparmentEach.value.push(tempArr);
      });
      deparmentEmployeesCount.value = [];
      forDeparmentEach.value.forEach((item) => {
        allCounts.value = [];
        item.forEach((item2: any) => {
          allCounts.value.push(item2.male);
          allCounts.value.push(item2.female);
          allCounts.value.push(item2.count);
        });

        deparmentEmployeesCount.value.push(allCounts.value);
      });
    }
    if (apiParams.statistical_type == "region") {
      statisticName.value = "region";
      viewTheScheduleStatisticAndCourse.value = false;
      viewTheScheduleNationsAndTerritory.value = true;
      const res = await StudentRegionList(datas);
      Object.assign(apiData, res);
      forDeparmentEach.value = [];

      apiData.result.forEach((element) => {
        const tempArr: any[] = getArray(element.list);
        forDeparmentEach.value.push(tempArr);
      });
      deparmentEmployeesCount.value = [];
      forDeparmentEach.value.forEach((item) => {
        allCounts.value = [];
        item.forEach((item2: any) => {
          allCounts.value.push(item2.male);
          allCounts.value.push(item2.female);
          allCounts.value.push(item2.count);
        });

        deparmentEmployeesCount.value.push(allCounts.value);
      });
    }
  } catch (error: any) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`O'qituvchi reytingi`" class="teacherRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            {{ $t("Student") }} ({{ $t("Total_Point") }})
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <!-- <router-link to="/statistical/student/all">
                                                                            <button class="btns c-save py-1.5 px-4 me-3" type="button">
                                                                              <i class="mdi mdi-plus me-2"></i>{{ $t("All_Statistics") }}
                                                                            </button>
                                                                          </router-link> -->
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
          <form class="row" @submit.prevent="onSubmit">
            <!-- //oquv yili  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  :filter-option="helpers.filterOptionByName"
                  show-search
                  class="form--item"
                  v-model:value="apiParams.academic_year_id"
                  :options="optionsList.OptionacademicYeList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //Semestr  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  :filter-option="helpers.filterOptionByName"
                  show-search
                  class="form--item"
                  v-model:value="apiParams.semester_type"
                  :options="optionsList.optionTypeSemester"
                  :field-names="{ value: 'code', label: 'name' }"
                  :disabled="!apiParams.academic_year_id"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ t("Choose_Semestr_Type") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  :filter-option="helpers.filterOptionByName"
                  show-search
                  class="form--item"
                  v-model:value="apiParams.edu_type_id"
                  :options="optionsList.optioneducationList"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiParams.semester_type"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <!-- talim shakli tanlang -->
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  :filter-option="helpers.filterOptionByName"
                  show-search
                  class="form--item"
                  v-model:value="apiParams.edu_form_id"
                  :options="optionsList.optioneeduFormList"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiParams.edu_type_id"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Form") }}</label>
            </div>
            <div class="my-2 col-md-4">
              <a-radio-group
                v-model:value="apiParams.statistical_type"
                name="radioGroup"
                class="d-flex"
              >
                <a-radio value="course" class="font-size-16">{{
                  $t("by_Level")
                }}</a-radio>
                <a-radio value="specialty" class="font-size-16">{{
                  $t("by_Specialty")
                }}</a-radio>
                <a-radio value="nation" class="font-size-16">{{
                  $t("by_Nation")
                }}</a-radio>
                <a-radio value="region" class="font-size-16">{{
                  $t("by_Region")
                }}</a-radio>
              </a-radio-group>
            </div>
            <div class="my-2 col-md-2 form--item">
              <button
                :disabled="
                  !apiParams.edu_form_id || !apiParams.statistical_type
                "
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
    <template v-if="viewTheScheduleStatisticAndCourse">
      <div class="card">
        <div class="card-body">
          <LoadingOverlay v-if="isLoading" />
          <div
            class="table-responsive table-statistical"
            v-if="apiData.result.length > 0"
          >
            <div class="table-header">
              <table class="table-header-tr">
                <tr>
                  <td>
                    <span>{{ $t("Curriculum_Education_Year") }}:</span>
                    <b>{{ academic_year_name }}</b>
                  </td>
                  <td>
                    <span>{{ $t("Faculty") }}:</span>
                    <b>{{ deanId }}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{{ t("Education_Type") }}:</span>
                    <b>{{ edu_form_name }}</b>
                  </td>
                  <td>
                    <span>{{ $t("Education_Form") }}:</span>
                    <b>{{ edu_type_name }}</b>
                  </td>
                </tr>
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowspan="2" style="min-width: 70px">
                    <span v-if="statisticName == 'course'">{{
                      $t("by_Level")
                    }}</span>
                    <span v-if="statisticName == 'specialty'">{{
                      $t("by_Specialty")
                    }}</span>
                  </th>
                  <th v-for="element in apiData.result[0].list" colspan="3">
                    {{ element?.payment_type ?? $t("all_Student") }}
                  </th>
                </tr>
                <tr>
                  <template
                    v-for="index1 in apiData.result[0].list.length * 3"
                    :key="index1"
                  >
                    <th>
                      <span v-if="index1 % 3 == 1" style="min-width: 50px">{{
                        $t("Male")
                      }}</span>
                      <span v-if="index1 % 3 == 2" style="min-width: 50px">{{
                        $t("Female")
                      }}</span>
                      <span v-if="index1 % 3 == 0" style="min-width: 50px">{{
                        $t("Total_Point")
                      }}</span>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, elIndex) in apiData.result" :key="elIndex">
                  <td class="text-start" v-if="statisticName == 'course'">
                    <b>{{ element.course }}-{{ $t("course_number") }}</b>
                  </td>
                  <td class="text-start" v-if="statisticName == 'specialty'">
                    <b>{{ element?.specialty }} </b>
                    <span class="c-gray ms-1">({{ element?.code }}) </span>
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
          <div class="table-responsive" v-else>
            <NoData />
          </div>
        </div>
      </div>
    </template>
    <!-------END TABLE 1---------------------------------------->

    <!-------START TABLE 2---------------------------------------->
    <template v-if="viewTheScheduleNationsAndTerritory">
      <div class="card">
        <div class="card-body">
          <LoadingOverlay v-if="isLoading" />
          <div
            class="table-responsive table-statistical"
            v-if="apiData.result.length > 0"
          >
            <div class="table-header">
              <table class="table-header-tr">
                <tr>
                  <td>
                    <span>{{ $t("Curriculum_Education_Year") }}:</span>
                    <b>{{ academic_year_name }}</b>
                  </td>
                  <td>
                    <span sty>{{ $t("Faculty") }}:</span>
                    <b>{{ deanId }}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span sty>{{ t("Education_Type") }}:</span>
                    <b>{{ edu_type_name }}</b>
                  </td>
                  <td>
                    <span sty>{{ t("Education_Form") }}:</span>
                    <b>{{ edu_form_name }}</b>
                  </td>
                </tr>
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowspan="2" style="min-width: 70px">
                    <span v-if="statisticName == 'nation'">{{
                      $t("by_Nation")
                    }}</span>
                    <span v-if="statisticName == 'region'">{{
                      $t("by_Region")
                    }}</span>
                  </th>

                  <th
                    v-for="(element, elIndex) in apiData.result[0].list"
                    :key="elIndex"
                    colspan="3"
                  >
                    {{ element?.course ? element?.course : $t("Total_Point")
                    }}<span v-if="element?.course"
                      >-{{ $t("course_number") }}</span
                    >
                  </th>
                </tr>
                <tr>
                  <template
                    v-for="(element, elIndex) in apiData.result[0].list"
                    :key="elIndex"
                  >
                    <th style="min-width: 50px">{{ $t("Male") }}</th>
                    <th style="min-width: 50px">{{ $t("Female") }}</th>
                    <th style="min-width: 50px">{{ $t("Total_Point") }}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, elIndex) in apiData.result" :key="elIndex">
                  <td class="text-start" v-if="statisticName == 'nation'">
                    <b>{{ element.natoin }}</b>
                  </td>
                  <td class="text-start" v-if="statisticName == 'region'">
                    <b>{{ element?.region }}</b>
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
          <div class="table-responsive" v-else>
            <NoData />
          </div>
        </div>
      </div>
    </template>
    <!-------END TABLE 2---------------------------------------->
  </div>
</template>

<style lang="scss">
.teacherRatingPage .content-table {
  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;

    &:nth-last-child(1) {
      justify-content: left;
      display: flex;
    }

    &:nth-child(1) {
      display: flex;
      justify-content: left;
    }
  }
}

.table-header-tr {
  tr {
    td {
      span {
        width: auto;
        margin: 0 10px;
      }
    }
  }
}
</style>
