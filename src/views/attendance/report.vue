<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { educationList, eduPlanList, eduFormList } from "@/utils/api/reference";
import { getListStudents } from "@/utils/api/attendance/report";
import { useUserStore } from "@/stores/user";

import {
  semesterByIdOnlyEduPlan,
  academicGroupById,
  getSubjectsBySemestrId,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";

const { t } = useI18n();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  edu_type_id: null,
  edu_plan_id: null,
  semester_id: null,
  academic_group_id: null,
  subject_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  subjectOptions: null,
  eduFormList: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduPlanOptions = await eduPlanList().then(
    (res) => res.result.data
  );
  sideFormOptions.eduFormList = await eduFormList().then((res) => res.result);
});

watch(
  () => apiData.edu_type_id,
  async () => {
    await fetchList();
  }
);
watch(
  () => apiData.edu_form_id,
  async () => {
    await fetchList();
  }
);
watch(
  () => apiData.subject_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (apiData.edu_plan_id) {
      let res = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );

      let res2 = await semesterByIdOnlyEduPlan(apiData.edu_plan_id);
      sideFormOptions.semesterOptions = res2?.result?.data.map((item: any) => {
        return {
          id: item.id,
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

watch(
  () => apiData.semester_id,
  async () => {
    await fetchList();
    if (apiData.edu_plan_id && apiData.semester_id) {
      sideFormOptions.subjectOptions = await getSubjectsBySemestrId(
        apiData.edu_plan_id,
        apiData.semester_id
      ).then((res) =>
        res.result.map((item: any) => {
          return {
            id: item?.subject?.id,
            name: item?.subject?.name,
          };
        })
      );
    }
  }
);
watch(
  () => apiData.academic_group_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList();
    }
  }
);

async function fetchList() {
  let datas: any = {};
  if (apiData.page > 1) datas.page = apiData?.page;
  if (apiData.edu_type_id) datas.edu_type_id = apiData.edu_type_id;
  if (apiData.subject_id) datas.subject_id = apiData.subject_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(datas);
      Object.assign(apiData, res.result);
      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

function clearAll() {
  apiData.edu_type_id = null;
  apiData.subject_id = null;
  apiData.edu_plan_id = null;
  apiData.semester_id = null;
  apiData.academic_group_id = null;
  apiData.edu_form_id = null;
  sideFormOptions.semesterOptions = null;
  sideFormOptions.academicGroupOptions = null;
  sideFormOptions.subjectOptions = null;
}
</script>

<template>
  <div pagetitle="'Davomat hisoboti'" class="attendancePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("attendance_Report") }}</h5>
          <div class="panel-toggles">
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
              >{{ $t("Filter") }}
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
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_type_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions"
                  :placeholder="t('Choose_Education_Type')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //o'quv yili  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //guruhlar  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <!-- //semestr  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.semester_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_plan_id"
                  :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose_Semester')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Semester") }}</label>
            </div>
            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormList"
                  :placeholder="t('Choose_Education_Form')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Form") }}</label>
            </div>

            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.subject_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.semester_id"
                  :options="sideFormOptions.subjectOptions"
                  :placeholder="t('Choose_Subject')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Subject") }}</label>
            </div>
            <div class="my-2 col-md-2">
              <button
                type="button"
                @click="clearAll"
                class="btn-search search-color"
              >
                <i class="mdi mdi-close me-1"></i>{{ $t("Clear") }}
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-all-students-report-attendace">
                <th>#</th>
                <th>{{ $t("Student") }}</th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("Subjects") }}</th>
                <th>{{ $t("Auditorm_hour") }}</th>
                <th>{{ $t("absent_On") }}</th>
                <th>{{ $t("absent_Off") }}</th>
                <th>{{ $t("Total_Point") }}</th>
                <th class="text-center">{{ $t("absent_Off_Percent") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-all-students-report-attendace"
                v-for="(element, index) in apiData.data"
                :key="element.id"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.fullname }}
                </td>
                <td>{{ element?.academic_group }}</td>
                <td>{{ element?.subject }}</td>
                <td>{{ element?.load }}</td>
                <td>{{ element?.caused }}</td>
                <td>{{ element?.uncaused }}</td>
                <td>{{ element?.total }}</td>
                <td>{{ element?.percent }}</td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <Pagination
            v-if="apiData.last_page > 1"
            class="mt-2"
            v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page"
          />
          <!-- --------------end pagination--------------------- -->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
  </div>
</template>

<style lang="scss">
.attendancePage {
  .table-row-all-students-report-attendace {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 100px 100px 100px 100px 120px 80px 80px;

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
