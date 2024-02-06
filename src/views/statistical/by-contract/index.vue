<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from "vue";
import {
  academicYearsList,
  semesterTypeList,
  educationListAll,
} from "@/utils/api/reference/index";
import { statisticalByContract } from "@/utils/api/statistical/by-contract/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import type { statisticalByPerformanceFace } from "@/utils/interfaces";
import NoData from "@/components/NoData.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();
const isLoading = ref(false);
const sumOfCol = ref<number[]>([]);
const forStatisContract = ref<any[]>([]);
const deparmentEmployeesCount = ref<any[]>([]);
const forItem2Name = ref<any[]>([]);
const edu_type_id_name = ref();
const academicYear_name = ref();
const semesterType_name = ref();
const contractListRow = ref<any[]>([]);
const control = ref();

const apiData: {
  result: statisticalByPerformanceFace[];
} = reactive({
  result: [],
});

const optionsList: any = reactive({
  optionacademicYeList: null,
  optionsemesterTypeList: null,
  optioneducationList: null,
});

const apiParams = reactive({
  edu_type_id: null, // ta'lim turi
  academic_year_id: null, // oquv yili
  semester_type: null, // semester turi`
});

// hooks

onMounted(async () => {
  optionsList.optionacademicYeList = await academicYearsList().then(
    (res) => res.result?.data
  ); // oquv yili
  optionsList.optionsemesterTypeList = await semesterTypeList().then(
    (res) => res.result
  ); // semester tipi
  optionsList.optioneducationList = await educationListAll().then(
    (res) => res.result
  ); // talim turi
});

watch(
  () => apiParams,
  async (oldVal, newVal) => {
    if (newVal == oldVal) {
      control.value = 0;
    } else control.value = 1;
  }
);

// functions

async function onSearch() {
  await fetchList();
  edu_type_id_name.value = optionsList.optioneducationList.find(
    (x: any) => x.id == apiParams.edu_type_id
  ).name;
  academicYear_name.value = optionsList.optionacademicYeList.find(
    (x: any) => x.id == apiParams.academic_year_id
  ).name;
  semesterType_name.value = optionsList.optionsemesterTypeList.find(
    (x: any) => x.code == apiParams.semester_type
  ).name;
}

function getArray(arr: any) {
  let datas: any = [];
  arr.map((item: any) => {
    datas.push(item);
  });

  return datas;
}

async function fetchList() {
  try {
    isLoading.value = true;
    const res = await statisticalByContract(apiParams);
    Object.assign(apiData, res);
    isLoading.value = false;
    forStatisContract.value = [];
    apiData.result.forEach((element: any) => {
      const tempArr: any[] = getArray(element.list);
      forStatisContract.value.push(tempArr);
    });
    forItem2Name.value = [];
    deparmentEmployeesCount.value = [];
    forStatisContract.value.forEach((item) => {
      item.forEach((item2: any) => {
        forItem2Name.value.push(item2);
        sumOfCol.value = [];
        item.forEach((item2: any) => {
          contractListRow.value = [];
          item2.courses.forEach((element: any) => {
            contractListRow.value.push(element.student_count);
            contractListRow.value.push(element.contract_count);
          });
          contractListRow.value.push(
            item2.courses.reduce(
              (total: number, item: any) => total + item.student_count,
              0
            )
          );
          contractListRow.value.push(
            item2.courses.reduce(
              (total: number, item: any) => total + item.contract_count,
              0
            )
          );
          contractListRow.value.forEach((element: any, index2: number) => {
            if (sumOfCol.value.length < index2 + 1) {
              sumOfCol.value.length = index2 + 1;
              sumOfCol.value[index2] = 0;
            }
            sumOfCol.value[index2] += element;
          });
          deparmentEmployeesCount.value.push(contractListRow.value);
        });
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`Shartnoma statistikasi`" class="byContractPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Contract_statistics") }}</h5>
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
            <a-form-item class="my-2 col-lg-3" name="faculty">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
            </a-form-item>

            <a-form-item class="my-2 col-lg-2" name="educationType">
              <a-select
                v-model:value="apiParams.edu_type_id"
                :options="optionsList.optioneducationList"
                :field-names="{ value: 'id', label: 'name' }"
                allow-clear
                :placeholder="t('Choose_Education_Type')"
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-lg-2" name="educationYear">
              <a-select
                v-model:value="apiParams.academic_year_id"
                :options="optionsList.optionacademicYeList"
                :field-names="{ value: 'id', label: 'name' }"
                allow-clear
                :placeholder="t('Choose_Education_Year')"
                :disabled="!apiParams.edu_type_id"
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-lg-3" name="semeterType">
              <a-select
                v-model:value="apiParams.semester_type"
                :options="optionsList.optionsemesterTypeList"
                :field-names="{ value: 'code', label: 'name' }"
                :disabled="!apiParams.academic_year_id"
                allow-clear
                :placeholder="t('Choose_Semestr_Type')"
              >
              </a-select>
            </a-form-item>
            <div class="my-2 col-lg-2">
              <button
                :disabled="!apiParams.semester_type"
                class="btn-search c-save"
                type="submit"
              >
                <i class="mdi mdi-eye me-2"></i>{{ $t("View") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <template v-if="apiData.result.length > 0">
      <div class="card">
        <div class="card-body">
          <LoadingOverlay v-if="isLoading" />
          <div
            class="table-responsive table-statistical"
            v-if="apiData.result.length"
          >
            <div class="table-header">
              <table>
                <tr>
                  <td>
                    <span>{{ $t("Curriculum_Education_Year") }}:</span>
                    <b>{{ academicYear_name }}</b>
                  </td>
                  <td>
                    <span>{{ $t("Faculty") }}:</span>
                    <b>{{ deanId }}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{{ t("Education_Type") }}:</span>
                    <b>{{ edu_type_id_name }}</b>
                  </td>
                  <td>
                    <span>{{ t("Semestr_Type") }}:</span>
                    <b>{{ semesterType_name }}</b>
                  </td>
                </tr>
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowspan="2" style="min-width: 150px">
                    <b>{{ $t("by_Level") }}</b>
                  </th>
                  <th colspan="2">1-{{ $t("course_number") }}</th>
                  <th colspan="2">2-{{ $t("course_number") }}</th>
                  <th colspan="2">3-{{ $t("course_number") }}</th>
                  <th colspan="2">4-{{ $t("course_number") }}</th>
                  <th colspan="2">5-{{ $t("course_number") }}</th>
                  <th colspan="2">{{ t("all_Student") }}</th>
                </tr>
                <tr>
                  <th>{{ t("Number_of_students") }}</th>
                  <th>{{ t("Contract_number") }}</th>
                  <th>{{ t("Number_of_students") }}</th>
                  <th>{{ t("Contract_number") }}</th>
                  <th>{{ t("Number_of_students") }}</th>
                  <th>{{ t("Contract_number") }}</th>
                  <th>{{ t("Number_of_students") }}</th>
                  <th>{{ t("Contract_number") }}</th>
                  <th>{{ t("Number_of_students") }}</th>
                  <th>{{ t("Contract_number") }}</th>
                  <th>{{ t("Number_of_students") }}</th>
                  <th>{{ t("Contract_number") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, elIndex) in forItem2Name" :key="elIndex">
                  <td class="text-start" style="min-width: 50px !important">
                    {{ element.edu_form }}
                  </td>
                  <td
                    v-for="(element, index) in deparmentEmployeesCount[elIndex]"
                    :key="index"
                  >
                    {{ element }}
                  </td>
                </tr>
                <tr>
                  <th>{{ $t("Total_Point") }}</th>
                  <template v-for="(item, index) in sumOfCol">
                    <th>{{ item }}</th>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
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
    <!-------END TABLE 1---------------------------------------->
  </div>
</template>
<style lang="scss">
.byContractPage {
  .table-header {
    table {
      td {
        span {
          width: auto;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
