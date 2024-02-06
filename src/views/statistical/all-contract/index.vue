<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from "vue";
import {
  academicYearsList,
  educationListAll,
} from "@/utils/api/reference/index";
import { statisticalAllContract } from "@/utils/api/statistical/all-contcart/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import type { statisticalByPerformanceFace } from "@/utils/interfaces";
import NoData from "@/components/NoData.vue";
import { useUserStore } from "@/stores/user";
import { cloneDeep } from "lodash";

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

const { t } = useI18n();
const isLoading = ref(false);
const edu_type_id_name = ref();
const academicYear_name = ref();
const control = ref();

const apiData: {
  result: any[];
} = reactive({
  result: [],
});

const optionsList: any = reactive({
  optioneducationList: null,
  optionacademicYeList: null,
});

const apiParams = reactive({
  academic_year_id: null, // oquv yili
  edu_type_id: null, // ta'lim turi
});

// hooks
onMounted(async () => {
  optionsList.optionacademicYeList = await academicYearsList().then(
    (res) => res.result?.data
  ); // oquv yili

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
  fetchList();
  edu_type_id_name.value = optionsList.optioneducationList.find(
    (x: any) => x.id == apiParams.edu_type_id
  ).name;
  academicYear_name.value = optionsList.optionacademicYeList.find(
    (x: any) => x.id == apiParams.academic_year_id
  ).name;
}

async function fetchList() {
  try {
    isLoading.value = true;
    const res = await statisticalAllContract(apiParams);
    Object.assign(apiData, res);
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}

function sumOfColumn(
  row: any,
  countType: string,
  selectedCourse: number | null = null
) {
  let sum = 0;
  if (apiData.result?.length > 0) {
    if (selectedCourse)
      row.edu_forms.forEach((eduForm: any) => {
        const foundCourse = eduForm.courses.find(
          (course: any) => course.course == selectedCourse
        );

        const obj = cloneDeep(foundCourse);

        if (obj) {
          sum += obj[countType];
        }
      });
    else
      row.edu_forms.forEach((eduForm: any) => {
        sum += eduForm[countType];
      });
  }

  return sum;
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
            <a-form-item class="my-2 col-md-4" name="faculty">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
            </a-form-item>
            <a-form-item class="my-2 col-md-3" name="educationYear">
              <a-select
                v-model:value="apiParams.academic_year_id"
                :options="optionsList.optionacademicYeList"
                :field-names="{ value: 'id', label: 'name' }"
                allow-clear
                :placeholder="t('Choose_Education_Year')"
              >
              </a-select>
            </a-form-item>
            <a-form-item class="my-2 col-md-3" name="educationType">
              <a-select
                v-model:value="apiParams.edu_type_id"
                :options="optionsList.optioneducationList"
                :field-names="{ value: 'id', label: 'name' }"
                allow-clear
                :placeholder="t('Choose_Education_Type')"
                :disabled="!apiParams.academic_year_id"
              >
              </a-select>
            </a-form-item>

            <div class="my-2 col-md-2">
              <button
                :disabled="
                  !apiParams.edu_type_id || !apiParams.academic_year_id
                "
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
        <LoadingOverlay v-if="isLoading" />
        <div class="card-body">
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
                    <span>{{ t("Education_Type") }}:</span>
                    <b>{{ edu_type_id_name }}</b>
                  </td>
                </tr>
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowspan="2" style="min-width: 150px">
                    <b>{{ $t("Student_Special") }}</b>
                  </th>
                  <th rowspan="2" style="min-width: 150px">
                    <b>{{ $t("Edu_form") }}</b>
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
                <template
                  v-for="(row, rowIndex) in apiData.result"
                  :key="rowIndex"
                >
                  <tr
                    v-for="(item, itemIndex) in row.edu_forms"
                    :key="itemIndex"
                  >
                    <td v-if="itemIndex === 0" :rowspan="row.edu_forms.length">
                      {{ row.specialty }}
                    </td>
                    <td>{{ item.edu_form }}</td>
                    <template
                      v-for="(element, elIndex) in item.courses"
                      :key="elIndex"
                    >
                      <td>{{ element.student_count }}</td>
                      <td>{{ element.contract_count }}</td>
                    </template>
                    <td>{{ item.total_student }}</td>
                    <td>{{ item.total_contract }}</td>
                  </tr>
                  <tr>
                    <th colspan="2">{{ $t("Total_Point") }}</th>
                    <template v-for="course in 5">
                      <th>
                        {{ sumOfColumn(row, "student_count", course) }}
                      </th>
                      <th>
                        {{ sumOfColumn(row, "contract_count", course) }}
                      </th>
                    </template>
                    <th>{{ sumOfColumn(row, "total_student") }}</th>
                    <th>{{ sumOfColumn(row, "total_contract") }}</th>
                  </tr>
                </template>
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
  .table-header table td span {
    width: auto;
    margin-right: 15px;
  }
}
</style>
