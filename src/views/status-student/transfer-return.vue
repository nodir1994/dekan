<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { eduPlanList } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
  academicYearsAll,
} from "@/utils/api/reference/id";

import {
  getListStudents,
  // getStatusList,
  statusStudentInfo,
  createReturnStudent,
} from "@/utils/api/student-action/return";
import Swal from "sweetalert2";
import helpers from "@/utils/helper";

const params: any = reactive({});
const notif = useNotyf();
const isLoading = ref(false);
const { t } = useI18n();
const referenceId = ref<number | null>(null);
const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  reference_id: referenceId, //jarayon sababi
  current_page: 1,
  data: [],
  links: [],
  page: 1,
  per_page: helpers.pagePer,
  students: [],
});
const sideFormOptions: any = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  orderOptions: null,
});
sideFormOptions.orderOptions = await statusStudentInfo().then(
  (res: any) => res?.result
);
referenceId.value = sideFormOptions.orderOptions.find(
  (item: any) => item.code == 11
).id;
const plainOptions: any = ref([]);
const loader = ref(true);

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

await fetchList();

onMounted(async () => {
  let res = await eduPlanList();
  sideFormOptions.eduPlanOptions = res?.result?.data;
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

    await fetchList();

    if (apiData.edu_plan_id) {
      let res = await academicYearsAll();
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

async function onSearch() {
  await fetchList();
}

async function attachData() {
  try {
    isLoading.value = true;
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
        let datas: any = reactive({
          students: apiData.students,
          student_status_id: apiData.reference_id,
        });
        await createReturnStudent(datas);
        notif.success(t("Data_was_successfully_transferred"));
        location.reload();
      }
    });
  } catch (error: any) {
    // Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

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
  isLoading.value = true
  try {
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(params);
      Object.assign(apiData, res.result);

      plainOptions.value = apiData.data.map((item: any) => item.id);
      setTimeout(() => {
        loader.value = true;
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div pagetitle="'Akademik tatil'" class="transfer-return-page">
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Transfer_Return") }}</h5>
          <div class="filterBlock">
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <div class="col-xl-3 form--item">
              <div class="my-2" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </div>
            </div>
            <div class="col-xl-3 form--item">
              <div class="my-2" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_year_id" :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicYearsOptions"
                  :placeholder="t('Choose_Education_Year')">
                </a-select>
              </div>
            </div>
            <div class="col-xl-3 form--item">
              <div class="my-2" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  :disabled="!apiData.academic_year_id" v-model:value="apiData.semester_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose_Semester')">
                </a-select>
              </div>
            </div>
            <div class="col-xl-3 form--item">
              <div class="my-2" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  :disabled="!apiData.edu_plan_id" v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </div>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>#</th>
                    <th>
                      <input class="form-check-input" type="checkbox" v-model="checkAll" />
                    </th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Payment_Form") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="apiData.students" :value="element.id" />
                      </div>
                    </td>
                    <td>{{ element.name }} {{ element.surname }}</td>
                    <td>
                      {{ element?.specialty?.id }} /
                      {{ element?.specialty?.name }}
                    </td>
                    <td>
                      <div>
                        {{ element?.semester?.course }} - kurs <br />
                        {{ element?.semester?.semester }} - semestr
                      </div>
                    </td>
                    <td>{{ element?.payment_type?.name }}</td>
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
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <a-form>
              <div class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Transfer_Status")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.reference_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.orderOptions" :placeholder="t('select__status__student')" disabled>
                </a-select>
              </div>
              <div class="d-flex justify-content-end">
                <button @click="attachData" :disabled="
                  !apiData?.students?.length || !apiData.reference_id
                " class="btns c-save" type="button">
                  <i class="mdi mdi-check font-size-14 align-middle me-1"></i>Ok
                </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.transfer-return-page {
  .table-row {
    grid-template-columns: 40px 40px auto 18% 18% 140px;

    @include mobile() {
      grid-template-columns: 40px 40px 250px 120px 120px 140px;
    }

    th,
    td {
      &:last-child {
        justify-content: start;
      }
    }
  }
}
</style>
