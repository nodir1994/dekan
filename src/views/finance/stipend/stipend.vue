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
  scholarshipTypeList,
} from "@/utils/api/reference/index";

import { stipendAllList, changeStatus } from "@/utils/api/finance/stipend";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  edu_type_id: null,
  edu_plan_id: null,
  academic_group_id: null,
  semester_id: null,
  payment_type_id: null,
  scholarship_id: null,
  current_page: 1,
  students: [],
  data: [],
  links: [],
  per_page: 25,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduPlanOptions: null,
  academicGroupOptions: null,
  semesterOptions: null,
  paymentTypeOptions: null,
  scholarshipTypeOptions: null,
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
  sideFormOptions.scholarshipTypeOptions = await scholarshipTypeList().then(
    (res) => res?.result
  );
});

watch(
  () => apiData.edu_plan_id,
  async (newVal) => {
    apiData.academic_group_id = null;
    apiData.semester_id = null;
    if (newVal) {
      sideFormOptions.academicGroupOptions = await academicGroupById(
        newVal
      ).then((res) => res?.result?.data);
      sideFormOptions.semesterOptions = await semesterEduPlanById(newVal).then(
        (res) =>
          res?.result?.data.map((item) => {
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
  () => apiData.edu_form_id,
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
  () => apiData.academic_group_id,
  async () => {
    if (apiData.edu_plan_id) {
      await fetchList();
    }
  }
);

watch(
  () => apiData.semester_id,
  async () => {
    if (apiData.edu_plan_id) {
      await fetchList();
    }
  }
);

watch(
  () => apiData.payment_type_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.scholarship_id,
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
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  if (apiData.payment_type_id) datas.payment_type_id = apiData.payment_type_id;
  if (apiData.scholarship_id) datas.scholarship_id = apiData.scholarship_id;

  const res = await stipendAllList(datas);
  Object.assign(apiData, res.result);
}
</script>

<template>
  <div pagetitle="`Stipendiya bazaviy`" class="studentListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Finance_Scholarship") }}</h5>
          <div class="panel-toggles">
            <router-link
              to="/finance/stipend/stipend-set"
              class="btns c-save py-1.5 px-4 me-3"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
              >{{ $t("Stipend_assignment") }}
            </router-link>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
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
          <div class="row">
            <!-- Ta'lim turi -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.edu_type_id"
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
                  v-model:value="apiData.edu_plan_id"
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
                  v-model:value="apiData.academic_group_id"
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
                  v-model:value="apiData.semester_id"
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
                  v-model:value="apiData.payment_type_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.paymentTypeOptions"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Select_payment_form") }}</label>
            </div>

            <!-- //Stipendiya turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiData.scholarship_id"
                  allowClear
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.scholarshipTypeOptions"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("choosee__type__stipend") }}</label>
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
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-rating-stipend">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Decree") }}</th>
                    <th>{{ $t("amount_of_minimum_wage") }}</th>
                    <th>{{ $t("Deadline") }}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-rating-stipend"
                    v-for="(element, index) in apiData.data"
                    :key="element?.id"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <router-link :to="'/finance/stipend/' + element.id">
                        {{ element?.fullname }}
                      </router-link>
                    </td>
                    <td>
                      {{ element?.specialty?.name }}
                    </td>
                    <td>
                      {{ element?.academic_group?.name }}
                    </td>
                    <td>{{ element?.semester?.semester }} - semestr</td>
                    <td>
                      {{ element?.command }}
                    </td>
                    <td>
                      {{ element?.summa }}
                    </td>
                    <td>{{ element?.start_date }} / {{ element?.end_date }}</td>
                    <td>
                      <div class="form-check form-switch my-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          :checked="element.status"
                          :disabled="isLoading"
                          @change="updateStatus(element.id)"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <Pagination
                v-if="apiData.last_page > 1"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
              />
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
        <span class="element-count mb-2" v-if="apiData.data.length"
          >{{ apiData.current_page }}-{{
            apiData?.data.length +
            apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-rating-stipend {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 190px 120px 140px 100px 90px 180px 90px;

  @include mobile() {
    // grid-template-columns: 50px 100px 120px 200px 140px 100px 100px 100px 140px;
  }
}

.studentListPage .content-table {
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
</style>
