<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  academicGroupById,
  semesterEduPlanById,
} from "@/utils/api/reference/id";
import { useNotyf } from "@/composable/useNotyf";
import {
  educationList,
  eduPlanList,
  paymentTypeList,
} from "@/utils/api/reference/index";

import {
  stipendNotStipendList,
  changeStatus,
  orderTypeList,
  stipendTypeList,
  transferStipentStudent,
} from "@/utils/api/finance/stipend";
import helpers from "@/utils/helper";
import Swal from "sweetalert2";

export interface SchoolarshipInterface {
  academic_group_id: number | null;
  academic_year_id: number | null;
  command_id: number | null;
  created_at: string;
  end_date: string;
  id: number | null;
  scholarship_type_id: number | null;
  semester_id: number | null;
  specialty_id: number | null;
  start_date: string;
  status: boolean;
  student_id: number;
  updated_at: string;
}

export interface StudentInterface {
  academic_debt: number;
  academic_group: any;
  contract_debt: number;
  fullname: string;
  id: number;
  rating: number;
  scholarship: SchoolarshipInterface;
  subject_30_percent: number;
}

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const loader = ref(true);
const apiData: any = reactive({
  links: [],
  current_page: 1,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduPlanOptions: null,
  academicGroupOptions: null,
  semesterOptions: null,
  paymentTypeOptions: null,
  orderTypeOptions: null,
  stipendTypeOptions: null,
});

const selectedRows = ref<StudentInterface[]>([]);
const apiParams: any = reactive({
  edu_plan_id: null,
  edu_type_id: null,
  academic_group_id: null,
  semester_id: null,
  payment_type_id: null,
  command_id: null,
  per_page: helpers.pagePer,
});

const checkAll = computed({
  get() {
    return (
      selectedRows.value.length > 0 &&
      apiData.data?.length === selectedRows.value?.length
    );
  },
  set(val) {
    if (val) {
      selectedRows.value = apiData.data?.map((item: any) => item);
    } else {
      selectedRows.value = [];
    }
  },
});

await fetchList();

//update status
async function updateStatus(id: number) {
  try {
    isLoading.value = true;
    await changeStatus(id);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res?.result
  );
  sideFormOptions.eduPlanOptions = await eduPlanList().then(
    (res) => res?.result?.data
  );
  sideFormOptions.paymentTypeOptions = await paymentTypeList().then(
    (res) => res?.result
  );
  sideFormOptions.orderTypeOptions = await orderTypeList().then(
    (res) => res?.result?.data
  );
  sideFormOptions.stipendTypeOptions = await stipendTypeList().then(
    (res) => res?.result
  );
});

watch(
  () => apiParams.edu_plan_id,
  async (newVal) => {
    apiParams.academic_group_id = null;
    apiParams.semester_id = null;
    if (newVal) {
      sideFormOptions.academicGroupOptions = await academicGroupById(
        newVal
      ).then((res) => res?.result?.data);
      sideFormOptions.semesterOptions = await semesterEduPlanById(newVal).then(
        (res) =>
          res?.result?.data.map((item: any) => {
            return { id: item.id, name: item.semester + "-semestr" };
          })
      );
    } else {
      sideFormOptions.academicGroupOptions = null;
      sideFormOptions.semesterOptions = null;
    }
    await fetchList();
  }
);

watch(
  () => [apiParams.edu_type_id, apiParams.payment_type_id],
  async () => {
    await fetchList();
  }
);

watch(
  () => [apiParams.academic_group_id, apiParams.semester_id],
  async () => {
    if (apiParams.edu_plan_id) {
      await fetchList();
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

async function fetchList(pages?: number) {
  delete apiParams.command_id;
  let datas: any = {
    ...apiParams,
    page: pages || 1,
    per_page: apiParams.per_page,
  };
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await stipendNotStipendList(datas);
      Object.assign(apiData, res.result);
      apiData.data = apiData.data?.map((item: any) => {
        const obj: any = { ...item };
        if (!obj.scholarship) {
          obj.scholarship = {
            student_id: obj.id,
            scholarship_type_id: null,
            end_date: "",
            start_date: "",
          };
        }

        return obj;
      });

      setTimeout(() => {
        loader.value = true;
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }

  // selectedRows.value = apiData.data.map(item => item.id)
}
async function stipentTransfer() {
  try {
    isLoading.value = true;
    let obj: any = reactive({
      datas: [],
      command_id: apiParams.command_id,
    });
    if (apiData.page > 1) obj.datas.page = apiData?.page;
    apiData?.data.forEach((element: any) => {
      if (
        element?.scholarship?.start_date &&
        element?.scholarship?.end_date &&
        element?.scholarship?.scholarship_type_id &&
        element?.scholarship?.student_id
      ) {
        obj.datas.push(element?.scholarship);
      }
    });

    Swal.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      cancelButtonText: t("No_Cancel"),
      confirmButtonText: t("transfer"),
    })
      .then(async (result) => {
        if (result.value) {
          const res = await transferStipentStudent(obj);
          notif.success(t("Data_was_successfully_transferred"));
          setTimeout(async () => {
            await fetchList();
            clearAllSelect();
          }, 100);
        }
      })
      .catch((error: any) => {
        notif.error(t("Failed") + ": " + error.response?.data?.message);
      })
      .finally(() => {
        isLoading.value = false;
      });
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}
function clearAllSelect() {
  apiParams.edu_plan_id = null;
  apiParams.edu_type_id = null;
  apiParams.academic_group_id = null;
  apiParams.semester_id = null;
  apiParams.payment_type_id = null;
  apiParams.command_id = null;
  apiData.students = [];
}

const errors: any = reactive({
  command_id: [],
  reference_id: [],
  students: [],
});
</script>
<template>
  <div pagetitle="`Guruhdagi talabalar`" class="studentListPage11">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/finance/stipend"
              >{{ $t("Finance_Scholarship") }}
            </router-link>
            / {{ $t("Students_in_Group") }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
              <router-link
                to="/finance/stipend"
                class="btns black-c py-1.5 px-4 d-inline-block"
              >
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}
              </router-link>
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
          <div class="row">
            <!-- Ta'lim turi -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.edu_type_id"
                  :options="sideFormOptions.eduTypeOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <!-- //o'quv reja  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.edu_plan_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.academic_group_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>

            <!-- //semestr  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.semester_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>

            <!-- tolov shakli-->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.payment_type_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.paymentTypeOptions"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Select_payment_form") }}</label>
            </div>

            <!-- //Buyruq  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.command_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.orderTypeOptions"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_the_command") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <form @submit.prevent="stipentTransfer">
              <div class="table-responsive">
                <table class="content-table">
                  <thead>
                    <tr class="table-row-stipend-set">
                      <th>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll"
                        />
                      </th>
                      <th>#</th>
                      <th>{{ $t("Student") }}</th>
                      <th>{{ $t("Group") }}</th>
                      <th>{{ $t("Finance_Scholarship_Amount") }}</th>
                      <th>{{ $t("Debtor_List") }}</th>
                      <th>{{ $t("Contract_Debt") }}</th>
                      <th>{{ $t("gradeSome") }}</th>
                      <th>30% - {{ $t("Subject") }}</th>
                      <th style="justify-content: center">
                        {{ $t("Deadline") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="table-row-stipend-set"
                      v-for="(element, index) in apiData.data"
                      :key="element?.id"
                    >
                      <td>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="selectedRows"
                            :value="element"
                          />
                        </div>
                      </td>
                      <td>
                        {{
                          (apiData.current_page - 1) * apiData.per_page +
                          index +
                          1
                        }}
                      </td>
                      <td>
                        {{ element?.fullname }}
                      </td>
                      <td>
                        {{ element?.academic_group?.name }}
                      </td>
                      <td>
                        <a-space>
                          <a-select
                            class="form--item"
                            v-model:value="
                              element.scholarship.scholarship_type_id
                            "
                            allowClear
                            :field-names="{ value: 'id', label: 'name' }"
                            :options="sideFormOptions.stipendTypeOptions"
                          >
                          </a-select>
                        </a-space>
                      </td>
                      <td class="justify-content-center">
                        {{ element?.academic_debt }}
                      </td>
                      <td class="justify-content-center">
                        <template v-if="element?.contract_debt">
                          {{ $t("Yes") }}
                        </template>
                        <template v-else>
                          {{ $t("No") }}
                        </template>
                      </td>
                      <td class="justify-content-center">
                        {{ element?.rating }}
                      </td>
                      <td class="justify-content-center">
                        <template v-if="element?.subject_30_percent">
                          {{ $t("Yes") }}
                        </template>
                        <template v-else>
                          {{ $t("No") }}
                        </template>
                      </td>

                      <td class="d-flex gap-2">
                        <div class="mb-3">
                          <label for="division-name-input" class="form-label">{{
                            $t("Choice_Start_Date")
                          }}</label>
                          <a-date-picker
                            v-model:value="element.scholarship.start_date"
                            value-format="YYYY-MM-DD"
                            @change="('date_start')"
                            :placeholder="$t('Enter_date')"
                          />
                          <span
                            v-if="errors.start_date"
                            class="text-danger small"
                          >
                            {{ errors.start_date[0] }}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="division-name-input" class="form-label">{{
                            $t("End_date")
                          }}</label>
                          <a-date-picker
                            v-model:value="element.scholarship.end_date"
                            value-format="YYYY-MM-DD"
                            @change="('date_end')"
                            :placeholder="$t('Enter_date')"
                          />
                          <span
                            v-if="errors.end_date"
                            class="text-danger small"
                          >
                            {{ errors.end_date[0] }}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <button class="btns c-save" type="submit">
                  <i class="mdi mdi-check font-size-14 align-middle me-1"></i
                  >{{ $t("assign") }}
                </button>
              </div>
            </form>
            <!-------------START PAGINATION-------------->
            <Pagination
              v-if="apiData.last_page > 1"
              class="mt-2"
              v-bind="{ ...apiData }"
              v-model:current-page="apiData.current_page"
            />
            <!-------------END PAGINATION-------------->
          </div>
        </div>
        <span class="element-count mb-2" v-if="apiData.data.length"
          >{{ apiData.current_page }}-{{
            apiData.data.length + apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.studentListPage11 {
  .table-row-stipend-set {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 50px auto 100px 200px 180px 150px 90px 90px 350px;

    @include mobile() {
      grid-template-columns: 50px 50px auto 100px 120px 140px 100px 100px 100px 240px;
    }
  }

  tr {
    td,
    th {
      text-align: center;
      justify-content: center;
    }
  }
}

.studentListPage11 {
  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;

    &:nth-child(3),
    &:nth-child(4) {
      justify-content: left !important;
      text-align: left;
    }
  }
}
</style>
