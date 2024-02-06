<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { eduPlanList, eduPlanListAll } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
} from "@/utils/api/reference/id";

import {
  getListStudents,
  semesterTransferPut,
} from "@/utils/api/student-action/semester";
import Swal from "sweetalert2";
import router from "@/router";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const isTransfer = ref(false);
const params = reactive({});
const isTotal = ref(false);
const apiData: any = reactive({
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  semester_id2: null,
  academic_group_id: null,
  data: [],
  links: [],
  students: [],
  search: null,
  current_page: 1,
  total: 0,
  page: 1,
  per_page: helpers.pagePer,
});

const apiData2: any = reactive({
  current_page: 1,
  total: 0,
  data: [],
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
});

const plainOptions: any = ref([]);

const checkAll = computed({
  get() {
    return apiData?.students?.length === plainOptions?.value?.length;
  },
  set(val) {
    if (val) {
      apiData.students = plainOptions.value;
    } else {
      apiData.students = [];
    }
  },
});

//search
async function onSearch() {
  await fetchList();
}
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
    apiData.semester_id2 = null;
    apiData.academic_group_id = null;
    sideFormOptions.academicYearsOptions = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.semesterOptions = null;

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
    } else {
      apiData.data = [];
      apiData2.data = [];
    }
  }
);

watch(
  () => apiData.academic_year_id,
  async () => {
    apiData.semester_id = null;
    sideFormOptions.semesterOptions = null;

    if (!apiData.academic_year_id && apiData.edu_plan_id) {
      await fetchList();
    }
    if (apiData.academic_year_id) {
      await fetchList();
    }

    if (apiData.edu_plan_id && apiData.academic_year_id) {
      let res = await semesterById(apiData);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
        return {
          id: item.id,
          name: item.semester + "-" + t("semester_number"),
        };
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
  () => apiData.semester_id,
  async () => {
    if (!apiData.semester_id && apiData.academic_year_id) {
      await fetchList();
    }
    if (apiData.semester_id) {
      await fetchList();
    }
  }
);
watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      await fetchList(newVal);
    }
  }
);
watch(
  () => apiData2.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      await fetchData(newVal);
    }
  }
);
watch(
  () => apiData.semester_id2,
  async () => {
    if (apiData.semester_id2) {
      await fetchData();
    } else {
      apiData2.data = [];
      isTotal.value = false;
    }
  }
);
async function confirm(elementID: number | string) {
  Swal.fire({
    title: t("test_start"),
    text: t("Do_you_want_to_start_testing"),
    showCancelButton: true,
    confirmButtonColor: "#34c38f",
    cancelButtonColor: "#f46a6a",
    cancelButtonText: t("No_cancel"),
    confirmButtonText: t("Start_the_test"),
  }).then((result: any) => {
    if (result.value) {
      // examAdd(elementID, true);
      router.push(`/student/exams-info/${elementID}/questions`);
    }
  });
}
async function semesterTransfer() {
  try {
    isLoading.value = true;
    clearErrors();
    let datas: any = {};
    if (apiData.page > 1) datas.page = apiData?.page;
    Object.assign(datas, {
      students: apiData.students,
      semester_id: apiData.semester_id2,
      edu_plan_id: apiData.edu_plan_id,
    });
    Swal.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      cancelButtonText: t("No_Cancel"),
      confirmButtonText: t("transfer"),
    }).then(async (result) => {
      if (result.value) {
        await semesterTransferPut(datas);
        notif.success(t("Data_was_successfully_transferred"));
        setTimeout(async () => {
          await fetchList();
        }, 1000);
        location.reload();
      }
    });
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}
function clearErrors() {
  Object.assign(errors, {
    semester_id: [],
    academic_group_id: [],
  });
}
const errors = reactive({
  edu_plan_id: [],
  semester_id: [],
});

async function fetchList(pages?: number) {
  let params: any = reactive({
    page: pages || 1,
    per_page: apiData.per_page,
  });
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  if (apiData.semester_id) params.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  if (apiData.search) params.search = apiData.search;
  isLoading.value = true;
  try {
    const res = await getListStudents(params);
    Object.assign(apiData, res.result);
    plainOptions.value = apiData.data.map((item: any) => item.id);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function fetchData(pages?: number) {
  let params: any = reactive({
    page: pages || 1,
    per_page: apiData.per_page,
  });
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  if (apiData.semester_id) params.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  if (apiData.search) params.search = apiData.search;
  isTransfer.value = true;
  try {
    params.semester_id = apiData.semester_id2;
    const res2 = await getListStudents(params);
    Object.assign(apiData2, res2.result);
  } catch (error) {
    console.log(error);
  } finally {
    isTransfer.value = false;
    isTotal.value = true;
  }
}
</script>
<template>
  <div pagetitle="'Talabani tiklash'" class="transfer-semester-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 style="padding: 7px 0" class="card-title">
            {{ $t("transfer__student__corse") }}
          </h5>
        </div>
      </div>
    </div>
    <!----------------------------------------->
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="onSearch" class="row">
          <!-- //izlash  -->
          <div class="my-2 col-md-10 form--item">
            <a-space>
              <a-input id="yu" class="form-control" allow-clear v-model:value="apiData.search" /></a-space>
            <label for="yu">{{ $t("Search_by_Name_Number") }}</label>
          </div>

          <!-- //search button  -->
          <div class="my-2 col-xl-2">
            <button type="submit" class="btn-search search-color"
              :disabled="!apiData.academic_year_id || !apiData.edu_plan_id">
              <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-5">
        <div class="card">
          <div class="card-header bg-card-header">
            <h4 class="card-title mb-0">{{ $t("Students_in_Group") }}</h4>
          </div>
          <LoadingOverlay v-if="isLoading" />
          <div class="card-body">
            <form class="row">
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                    v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                    v-model:value="apiData.academic_year_id" :disabled="!apiData.edu_plan_id"
                    :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicYearsOptions"
                    :placeholder="t('Choose_Education_Year')">
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                    v-model:value="apiData.semester_id" :disabled="!apiData.academic_year_id"
                    :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.semesterOptions"
                    :placeholder="t('Choose_Semester')">
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                    v-model:value="apiData.academic_group_id" :disabled="!apiData.semester_id"
                    :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicGroupOptions"
                    :placeholder="t('Choose_Group')">
                  </a-select>
                </div>
              </div>
            </form>

            <div v-if="apiData.data.length" class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="checkAll" />
                      </div>
                    </th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Payment_Form") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="element?.id">
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="apiData.students" :value="element?.id" />
                      </div>
                    </td>
                    <td>
                      {{ element?.surname }} {{ element?.name }}
                      {{ element?.last_name }} <br />
                    </td>
                    <td>{{ element?.payment_type?.name }} <br /></td>
                  </tr>
                </tbody>
              </table>
              <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page" />
            </div>
            <div v-else>
              <h5 class="text-center">{{ $t("No_data") }}</h5>
              <p class="text-center">
                {{ $t("No_information_found") }}
              </p>
            </div>
          </div>
        </div>
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData?.data?.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
      <div class="col-lg-7">
        <div class="card">
          <div class="card-header bg-card-header">
            <h4 class="card-title mb-0">{{ $t("transfer") }}</h4>
          </div>
          <LoadingOverlay v-if="isTransfer" />
          <div class="card-body">
            <div class="row">
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear disabled
                    v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Curriculum')">
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear disabled
                    v-model:value="apiData.academic_year_id" :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.academicYearsOptions" :placeholder="t('Curriculum_Education_Year')">
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                    v-model:value="apiData.semester_id2" :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.semesterOptions" :disabled="!apiData.academic_year_id"
                    :placeholder="t('Choose_Semester')">
                  </a-select>
                  <span v-if="errors['semester_id']" class="text-danger small">
                    {{ errors["semester_id"][0] }}
                  </span>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="d-flex h-100 justify-content-end align-items-center">
                  <button class="btns search-color" @click="semesterTransfer" type="button"
                    :disabled="!(apiData.students?.length > 0)">
                    <i class="mdi mdi-check font-size-14 align-middle me-1"></i>{{ $t("transfer") }}
                  </button>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table-vertical">
                  <thead>
                    <tr class="table-row-transfer d-grid w-100">
                      <th>#</th>
                      <th>{{ $t("Student") }}</th>
                      <th>{{ $t("Education_Year_Name") }}</th>
                      <th>{{ $t("Semester_Name") }}</th>
                      <th>{{ $t("by_Level") }}</th>
                      <th>{{ $t("Group") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="table-row-transfer w-100 d-grid" v-for="(element, index) in apiData2.data"
                      :key="element?.id">
                      <td>
                        {{
                          (apiData.current_page - 1) * apiData.per_page +
                          index +
                          1
                        }}
                      </td>
                      <td>
                        {{ element?.surname }} {{ element?.name }}
                        {{ element?.last_name }}
                      </td>
                      <td>{{ element?.semester?.academic_year?.name }}</td>
                      <td>
                        {{ element?.semester?.semester }}-
                        {{ $t("semester_number") }}
                      </td>
                      <td>
                        {{ element?.semester?.course }}-
                        {{ $t("course_number") }}
                      </td>
                      <td>{{ element?.academic_group?.name }}</td>
                    </tr>
                  </tbody>
                </table>
                <Pagination v-if="apiData2.last_page > 1 && apiData2.data.length" class="mt-2" v-bind="{ ...apiData2 }"
                  v-model:current-page="apiData2.current_page" />
              </div>
            </div>
          </div>
        </div>
        <span class="element-count mb-2" v-if="isTotal">{{ apiData2.current_page }}-{{
          apiData2?.data?.length +
          apiData2.per_page * (apiData2.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData2.total }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.transfer-semester-page {
  .table-row {
    grid-template-columns: 40px auto 140px;
  }

  .table-row-transfer {
    grid-template-columns: 40px auto 15% 15% 10% 100px;
  }
}

.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>
