<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { educationList, eduFormList, eduPlanList } from "@/utils/api/reference";
import {
  getListStudents,
  getReferenceList,
  getOrderList,
  postMobile,
} from "@/utils/api/student-action/out";

import {
  semesterByIdOnlyEduPlan,
  academicGroupById,
  eduPlanById,
} from "@/utils/api/reference/id";
import Swal from "sweetalert2";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const params = reactive({});

const apiData = reactive({
  search: "",
  edu_plan_id: null,
  edu_type_id: null,
  semester_id: null,
  academic_group_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  students: [],
  current_page: 1,
  per_page: helpers.pagePer,
  command_id: null,
  reference_id: null,
  dateCommand: null,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  orderListOptions: null,
  typeMobileOptions: null,
});

const plainOptions = ref([]);
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
  sideFormOptions.typeMobileOptions = await getReferenceList().then(
    (res) => res.result
  );
  sideFormOptions.orderListOptions = await getOrderList().then((res) =>
    res.result?.data.map((item) => {
      return { id: item.id, name: item.name, date: item.date };
    })
  );

  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
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
    apiData.edu_plan_id = null;
    await fetchList();
    if (apiData.edu_form_id) {
      sideFormOptions.eduPlanOptions = await eduPlanById(
        apiData.edu_form_id
      ).then((res) => res.result?.data);
    }
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
      sideFormOptions.academicGroupOptions = res?.result?.data.map((item) => {
        return { id: item.id, name: item.name };
      });

      let res2 = await semesterByIdOnlyEduPlan(apiData.edu_plan_id);
      sideFormOptions.semesterOptions = res2?.result?.data.map((item) => {
        return {
          id: item.id,
          name:
            item.course +
            "-" +
            t("course") +
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
  () => apiData.command_id,
  () => {
    if (apiData.command_id) {
      apiData.dateCommand = sideFormOptions.orderListOptions.find(
        (item) => item.id == apiData.command_id
      ).date;
    } else {
      apiData.dateCommand = null;
    }
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

function clearAllSelect() {
  apiData.search = "";
  apiData.edu_form_id = null;
  apiData.edu_type_id = null;
  apiData.edu_plan_id = null;
  apiData.semester_id = null;
  apiData.academic_group_id = null;
  apiData.reference_id = null;
  apiData.command_id = null;
  apiData.students = [];
}

async function mobileTransfer() {
  try {
    isLoading.value = true;
    clearErrors();
    let datas = {
      students: apiData.students,
      command_id: apiData.command_id,
      reference_id: apiData.reference_id,
    };
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
        await postMobile(datas);
        notif.success(t("Data_was_successfully_transferred"));
        setTimeout(() => {
          fetchList();
          clearAllSelect();
        }, 100);
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
    command_id: [],
    reference_id: [],
    students: [],
  });
}

const errors = reactive({
  command_id: [],
  reference_id: [],
  students: [],
});

async function fetchList(pages?: number) {
  let params: any = reactive({
    page: pages || 1,
    per_page: apiData.per_page,
  });
  if (apiData.edu_type_id) params.edu_type_id = apiData.edu_type_id;
  if (apiData.edu_form_id) params.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.semester_id) params.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  if (apiData.search) params.search = apiData.search;
  isLoading.value = true;

  try {
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(params);
      Object.assign(apiData, res.result);

      plainOptions.value = apiData.data.map((item) => item.id);
      setTimeout(() => {
        loader.value = true;
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'Chetlashtirish'" class="transfer-out-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 style="padding: 7px 0" class="card-title">
            {{ $t("Transfer_Student_Expel") }}
          </h5>
        </div>
      </div>
    </div>
    <!----------------------------------------->
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
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="checkAll" />
                      </div>
                    </th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Level") }}</th>
                    <th>{{ $t("Group") }}</th>
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
                    <td>
                      <div>
                        {{ element?.surname }} {{ element?.name }} <br />
                        <span class="c-gray">
                          {{ element.id }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <!-- {{ element?.edu_type }} <br /> -->
                        {{ element?.specialty?.edu_type?.name }} <br />
                        <span class="c-gray">
                          {{ element.edu_form }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.semester?.course }} - kurs <br />
                        <span class="c-gray">
                          {{ element?.semester?.semester }} - semestr
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.academic_group?.name }} <br />
                        <span class="c-gray">
                          {{ element.academicYear }}
                        </span>
                      </div>
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
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <form class="row" @submit.prevent="onSearch">
              <div class="mb-3 col-md-10">
                <a-input id="yu" v-model:value="apiData.search" class="form-control"
                  :placeholder="t('choose__fish__student__passport__code')" />
              </div>
              <div class="col-md-2">
                <button type="submit" class="btn-search search-color">
                  <i class="mdi mdi-magnify font-size-14 align-middle"></i>
                </button>
              </div>
            </form>
            <div class="row">
              <div class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose_Education_Type')">
                </a-select>
              </div>
              <div class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions" :placeholder="t('Choose_Education_Form')">
                </a-select>
              </div>

              <div class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </div>

              <div class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.semester_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions" :placeholder="t('Choose_Semester')">
                </a-select>
              </div>

              <div class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions" :placeholder="t('Choose_Group')">
                </a-select>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btns c-delet" type="button" @click="clearAllSelect">
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>{{ $t("Clear") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="mb-3" name="nameFaculty">
              <label for="division-name-select" class="form-label">{{
                $t("Status_Change_Reason")
              }}</label>
              <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                v-model:value="apiData.reference_id" :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.typeMobileOptions" :placeholder="t('Choose')">
              </a-select>
            </div>
            <div class="mb-3" name="nameFaculty">
              <label for="division-name-select" class="form-label">{{
                $t("Decree")
              }}</label>
              <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                v-model:value="apiData.command_id" :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.orderListOptions" :placeholder="t('Select_the_command')">
              </a-select>
              <span v-if="errors.command_id" class="text-danger small">
                {{ errors.command_id[0] }}
              </span>
            </div>
            <div class="mb-3" name="nameFaculty">
              <label for="division-name-input" class="form-label">{{
                $t("Circulation_Doc_Date")
              }}</label>
              <a-input v-model:value="apiData.dateCommand" placeholder="YYYY-MM-DD" disabled value-format="YYYY-MM-DD" />
            </div>
            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("Count_of_Contract_Student")
              }}</label>
              <a-input disabled :value="apiData?.students?.length" />
            </div>

            <div class="d-flex justify-content-end">
              <button class="btns c-save" type="submit" :disabled="!apiData?.students?.length || !apiData.reference_id"
                @click="mobileTransfer">
                <i class="mdi mdi-check font-size-14 align-middle me-1"></i>{{ $t("Send_Grades") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.transfer-out-page {
  .table-row {
    grid-template-columns: 40px 50px auto 17% 17% 100px;

    @include mobile() {
      grid-template-columns: 40px 50px 250px 100px 100px 100px;
    }

    th,
    td {
      &:nth-child(2) {
        justify-content: center;
      }

      &:last-child {
        justify-content: start;
      }
    }
  }
}
</style>
