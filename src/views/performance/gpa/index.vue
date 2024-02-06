<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import {
  educationList,
  eduFormList,
  academicYearsList,
} from "@/utils/api/reference/index";
import { formatDate } from "@vueuse/core";
import { academicGroupById, eduPlanById } from "@/utils/api/reference/id";
import {
  getListGpa,
  gpaEval,
  getSubjectsGpa,
} from "@/utils/api/performance/gpa";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData = reactive({
  search: "",
  edu_plan_id: null,
  edu_type_id: null,
  academic_group_id: null,
  academic_year_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  subjectData: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const modalData: any = reactive({
  studentName: null,
  semester1: null,
  semester2: null,
  subjects1: [],
  subjects2: [],
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  academicYearOptions: null,
  academicGroupOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.academicYearOptions = await academicYearsList().then(
    (res) => res.result.data
  );
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
});

watch(
  () => apiData.academic_year_id,
  async () => {
    await fetchList();
  }
);
watch(
  () => apiData.edu_type_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_form_id,
  async (newVal) => {
    apiData.edu_plan_id = null;
    sideFormOptions.eduPlanOptions = null;
    if (newVal) {
      sideFormOptions.eduPlanOptions = await eduPlanById(newVal).then(
        (res) => res.result.data
      );
    }
    await fetchList();
  }
);

watch(
  () => apiData.edu_plan_id,
  async (newVal) => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (newVal) {
      let res = await academicGroupById(newVal);
      sideFormOptions.academicGroupOptions = res?.result?.data.map((item) => {
        return { id: item.id, name: item.name };
      });
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
      await fetchList(newVal);
    }
  }
);

async function fetchList(pages?: number) {
  let params: any = {
    page: pages || 1,
    per_page: apiData.per_page,
  };
  if (apiData.edu_type_id) params.edu_type_id = apiData.edu_type_id;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  if (apiData.edu_form_id) params.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  isLoading.value = true;
  if (loader.value) {
    loader.value = false;
    const res = await getListGpa(params);
    Object.assign(apiData, res.result);

    setTimeout(() => {
      loader.value = true;
    }, 100);
  }
  isLoading.value = false;
}
async function countGpa(id: number) {
  try {
    isLoading.value = true;
    await gpaEval(id);
    notif.success(t("Student_GPA_of_name_recalculated_successfully"));
  } catch (error: any) {
    notif.error(t("Request_failed1") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function getModalData(element: object) {
  modalData.name = element?.fullname;
  modalData.semester2 = null;
  modalData.subjects1 = [];
  modalData.subjects2 = [];
  let datas = await getSubjectsGpa(element?.id).then((res) => res.result);
  if (datas[0]) {
    modalData.semester1 = datas[0].semester;
    datas.map((item) => {
      if (item.semester == modalData.semester1) {
        modalData.subjects1.push(item);
      } else {
        modalData.semester2 = item.semester;
        modalData.subjects2.push(item);
      }
    });
  }
  console.log(datas);
}
</script>

<template>
  <div pagetitle="'Akademik qarzdorlar'" class="gpaPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Performance_Gpa") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link to="/performance/gpa/gpa-add">
                <button class="btns c-save py-1.5 px-4 me-3" type="button">
                  <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
                  >{{ $t("Performance_Gpa_Add") }}
                </button>
              </router-link>
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
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
          <div class="row">
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearOptions"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
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
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions"
                  :placeholder="t('Choose_Education_Form')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_form_id"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_Curriculum") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
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
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START EDIT MODAL---------------------------------------->
    <div
      id="myModalGpaInfo"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("Performance_Gpa") }} [ {{ modalData.name }} ]
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-modal d-grid w-100">
                    <th><strong>#</strong></th>
                    <th>
                      <strong>{{ $t("Subjects") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Total_Acload") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Credit") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("gradeSome") }}</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <h5 class="modal-data-tip">
                    {{ modalData?.semester1 }}-{{ $t("semester_number") }}
                  </h5>
                  <tr
                    class="table-modal d-grid w-100"
                    v-for="(subject, index) in modalData.subjects1"
                    :key="index"
                  >
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ subject?.subject }}
                    </td>
                    <td>
                      {{ subject?.load }}
                    </td>
                    <td>
                      {{ subject?.credit }}
                    </td>
                    <td>
                      {{ subject?.rating }}
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="modalData.semester2">
                  <h5 class="modal-data-tip">
                    {{ modalData?.semester2 }}-{{ $t("semester_number") }}
                  </h5>
                  <tr
                    class="table-modal d-grid w-100"
                    v-for="(subject, index) in modalData.subjects2"
                    :key="index"
                  >
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ subject?.subject }}
                    </td>
                    <td>
                      {{ subject?.load }}
                    </td>
                    <td>
                      {{ subject?.credit }}
                    </td>
                    <td>
                      {{ subject?.rating }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END EDIT MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th><strong>#</strong></th>
                <th>
                  <strong>{{ $t("Student") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Education_Type") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Group") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("by_Level") }} </strong>
                </th>
                <th>
                  <strong>{{ $t("Subjects_Coun") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("gpa") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Contract_Indebtedness") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Updated_At") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("calculate_GPA") }}</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.fullname }}
                </td>
                <td>
                  {{ element?.edu_form }} <br />
                  {{ element?.edu_type }}
                </td>
                <td>
                  {{ element?.academic_group }}
                </td>
                <td>
                  {{ element?.course }} - {{ t("course_number") }} <br />
                  {{ element?.academic_year }}
                </td>
                <td>
                  <a
                    href="text"
                    style="display: block; width: 100%; text-align: center"
                    data-bs-toggle="modal"
                    @click="getModalData(element)"
                    data-bs-target="#myModalGpaInfo"
                    >{{ element?.subject }} / {{ element?.credit }}</a
                  >
                </td>
                <td>
                  {{ element?.gpa }}
                </td>
                <td>
                  {{ element?.debt }}
                </td>
                <td>
                  {{
                    formatDate(
                      new Date(element?.updated_at),
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </td>
                <td>
                  <button
                    @click="countGpa(element?.id)"
                    class="btns1 actions-c px-2 me-2"
                  >
                    {{ $t("calculate_GPA") }}
                  </button>
                </td>
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
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.gpaPage {
  .table-row {
    grid-template-columns: 50px auto 150px 100px 100px 140px 60px 60px 150px 100px;

    @include mobile() {
      grid-template-columns: 50px 200px 130px 100px 100px 100px 60px 60px 150px 100px;
    }
  }

  .table-modal {
    grid-template-columns: 50px auto 150px 80px 80px;

    @include mobile() {
      grid-template-columns: 50px 200px 100px 80px 80px;
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

  .modal-data-tip {
    text-align: center;
    background-color: #dee2e6;
    padding: 10px;
    font-weight: 600;
  }

  .modal-dialog {
    max-width: $ipad !important;
  }
}
</style>
