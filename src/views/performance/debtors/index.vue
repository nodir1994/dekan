<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { eduPlanList, eduPlanListAll } from "@/utils/api/reference/index";
import {
  academicYearsById,
  semesterById,
  academicGroupById,
} from "@/utils/api/reference/id";
import { getListDebtors, exportFile } from "@/utils/api/performance/debtors";
import helpers from "@/utils/helper";
const { t } = useI18n();
const params = reactive({});
const isLoading = ref(false);
const loader = ref(true);
const apiData: any = reactive({
  search: "",
  data: [],
  edu_plan_id: null,
  academic_year_id: null,
  course: null,
  semester_id: null,
  academic_group_id: null,
  current_page: 1,
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
});



// await fetchList();

onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanListAll().then(
    (res) => res?.result?.data
  );
});

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.academic_year_id = null;
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.academicYearsOptions = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.semesterOptions = null;
    apiData.data = [];
    apiData.total = 0
    // await fetchList();

    if (apiData.edu_plan_id) {
      let res = await academicYearsById(apiData.edu_plan_id);
      sideFormOptions.academicYearsOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
      let res2 = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res2?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
    }
  }
);

watch(
  () => apiData.academic_year_id,
  async () => {
    apiData.semester_id = null;
    sideFormOptions.semesterOptions = null;
    await fetchList();
    if (apiData.edu_plan_id && apiData.academic_year_id) {
      let res = await semesterById(apiData);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
        return {
          id: item.id,
          semester: item.semester,
          name:
            item.course +
            "-" +
            t("Course") +
            " " +
            item.semester +
            "-" +
            t("semester"),
        };
      });
    }
  }
);

// watch(
//   () => apiData.academic_group_id,
//   async () => {
//     await fetchList();
//   }
// );

// watch(
//   () => apiData.semester_id,
//   async () => {
//     await fetchList();
//   }
// );

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList();
    }
  }
);

async function onSearch() {
  await fetchList();
}

async function fetchList() {
  try {
    isLoading.value = true
    Object.assign(params, apiData);
    if (apiData.semester_id && apiData.academic_group_id) {
      if (loader.value) {
        loader.value = false;

        const res = await getListDebtors(
          apiData.semester_id,
          apiData.academic_group_id
        );
        Object.assign(apiData, res.result);

        setTimeout(() => {
          loader.value = true;
        }, 100);
      }
    }
  } catch (error) {
    console.log(error);

  } finally {
    isLoading.value = false
  }

}

async function downloadExcelFile() {
  let datas: any = {};
  if (apiData.search) datas.search = apiData.search;
  if (apiData.course) datas.course = apiData.course;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData.academic_year_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  try {
    isLoading.value = true;
    await helpers.downloadFile(exportFile, datas)
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="'Akademik qarzdorlar'" class="debtorsPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Debtor_List") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button @click="downloadExcelFile()" :disabled="apiData?.data.length === 0"
                class="btns c-save py-1.5 px-4 me-3" type="submit">
                <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t("Excel_report") }}
              </button>
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch()">
            <!-- //o'quv reja  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <!-- //o'quv yili  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicYearsOptions"
                  :disabled="!apiData.edu_plan_id" :placeholder="t('Choose_Education_Year')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //semestr  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.semester_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions" :disabled="!apiData.academic_year_id"
                  :placeholder="t('Choose_Semester')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>
            <!-- //guruh  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicGroupOptions"
                  :disabled="!apiData.edu_plan_id" :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>
            <!-- // view -->
            <div class="my-2 col-md-2">
              <button :disabled="
                !apiData.edu_plan_id ||
                !apiData.academic_group_id ||
                !apiData.academic_year_id ||
                !apiData.semester_id
              " class="btn-search c-save" type="submit">
                <i class="mdi mdi-eye me-2"></i>{{ $t("View") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>#</th>
                <th>{{ $t("Student") }}</th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("Education_Year_Name") }}</th>
                <th>{{ $t("Semester_Name") }}</th>
                <th>{{ $t("Subject_name") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row d-grid w-100" v-for="(element, index) in apiData.data" :key="index">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.fullname }}
                </td>
                <td>
                  {{ element?.academic_group }}
                </td>
                <td>
                  {{ element?.academic_year }}
                </td>
                <td>{{ element?.semester }}-{{ $t("semestr") }}</td>
                <td>
                  {{ element?.subject }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
          <!-------------END PAGINATION-------------->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.total">{{ apiData.current_page }}-{{
      apiData.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.debtorsPage {
  .table-row {
    grid-template-columns: 50px auto 140px 150px 120px 30%;

    @include mobile() {
      grid-template-columns: 50px 200px 100px 100px 100px 160px;
    }
  }

  .content-table {

    th,
    td {

      &:last-child,
      &:first-child {
        display: flex;
        justify-content: left;
      }
    }
  }
}
</style>
