<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { useNotyf } from "@/composable/useNotyf";
import {
  paymentTypeList,
  eduFormList,
  eduPlanList,
} from "@/utils/api/reference";
import {
  getBaseStudents,
  exportListForStudent,
  exportListForStudentList,
  getBaseStudentsList,
} from "@/utils/api/students/base";
import {
  academicGroupById,
  semesterByIdOnlyEduPlan,
} from "@/utils/api/reference/id";
import { formatDate } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";

const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isSearch = ref(false)
const isLoading = ref(false);
const allTables = reactive({});
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
// jadval talabalar ro'yhati
const apiData: any = reactive({
  payment_type_id: null,
  edu_form_id: null,
  edu_plan_id: null,
  semester_id: null,
  academic_group_id: null,
  search: "",
  current_page: 1,
  data: [],
  links: [],
  per_page: helpers.pagePer,
});

const formOptions: any = reactive({
  paymentTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
});

onMounted(async () => {
  formOptions.paymentTypeOptions = await paymentTypeList().then(
    (res) => res.result
  );
  formOptions.eduFormOptions = await eduFormList().then((res) => res.result);
  formOptions.edu_plan_id = await eduPlanList().then((res) =>
    res.result?.data.map((item: any) => {
      return { id: item.id, name: item.name };
    })
  );
});

watch(
  () => [apiData.semester_id, apiData.academic_group_id, apiData.edu_type_id, apiData.edu_form_id, apiData.payment_type_id,],
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    formOptions.academicGroupOptions = null;
    formOptions.semesterOptions = null;

    await fetchList();

    if (apiData.edu_plan_id) {
      let res = await academicGroupById(apiData.edu_plan_id);
      formOptions.academicGroupOptions = res?.result?.data.map((item: any) => {
        return { id: item.id, name: item.name };
      });

      let res2 = await semesterByIdOnlyEduPlan(apiData.edu_plan_id);
      formOptions.semesterOptions = res2?.result?.data.map((item: any) => {
        return {
          id: item.id,
          name:
            item.semester +
            `-${t("semestr")} / ` +
            item.course +
            `-${t("course_number")}`,
        };
      });
    }
  }
);

watch(
  () => apiData.search,
  async (newVal) => {
    isSearch.value = true
    if (apiData.search == "" && isSearch.value == true) {
      await fetchList();
      isSearch.value = false
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

await fetchList();
async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData.payment_type_id) datas.payment_type_id = apiData.payment_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData.academic_year_id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.search) datas.search = apiData.search;
  isLoading.value = true;
  const res = await getBaseStudentsList(datas);

  Object.assign(apiData, res.result);
  isLoading.value = false;
}
const params: any = reactive({
  search: apiData.search ?? "",
});

async function onSearch() {
  await fetchList();
}
async function studentContingentDownload() {
  let apiParams: any = {};
  if (apiData.search) apiParams.search = apiData.search;
  if (apiData.payment_type_id)
    apiParams.payment_type_id = apiData.payment_type_id;
  if (apiData.edu_form_id) apiParams.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) apiParams.edu_plan_id = apiData.edu_plan_id;
  if (apiData.semester_id) apiParams.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    apiParams.academic_group_id = apiData.academic_group_id;
  try {
    isLoading.value = true
    await helpers.downloadFile(exportListForStudentList, apiParams)
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}
async function studentListDownload() {
  let apiParams: any = {};
  if (apiData.search) apiParams.search = apiData.search;
  if (apiData.payment_type_id)
    apiParams.payment_type_id = apiData.payment_type_id;
  if (apiData.edu_form_id) apiParams.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) apiParams.edu_plan_id = apiData.edu_plan_id;
  if (apiData.semester_id) apiParams.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    apiParams.academic_group_id = apiData.academic_group_id;
  try {
    isLoading.value = true
    await helpers.downloadFile(exportListForStudentList, apiParams)
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div pagetitle="`Talabalar ro'yxati`" class="student-list-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Student_Employment_List") }}</h5>
          <div class="panel-toggles">
            <button @click="studentContingentDownload" :disabled="isLoading" class="btns c-save py-1.5 px-4 me-3"
              type="button">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"
                aria-hidden="true"></span>
              <i v-else class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t("Import_Students") }}
            </button>
            <button @click="studentListDownload" :disabled="isLoading" class="btns c-save py-1.5 px-4 me-3" type="button">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"
                aria-hidden="true"></span>
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t("Student_Address") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
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
          <form @submit.prevent="onSearch" class="row">
            <!-- //to'lov shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.payment_type_id"
                  :options="formOptions.paymentTypeOptions" allow-clear></a-select>
              </a-space>
              <label>{{ $t("Select_payment_form") }}</label>
            </div>
            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.edu_form_id"
                  :options="formOptions.eduFormOptions" allow-clear></a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //fakultet  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item" disabled
                  :field-names="{ value: 'id', label: 'name' }" v-model:value="deanId"></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :field-names="{ value: 'id', label: 'name' }" :options="formOptions.edu_plan_id"
                  v-model:value="apiData.edu_plan_id" allow-clear></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //semestr  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :field-names="{ value: 'id', label: 'name' }" :disabled="!apiData.edu_plan_id"
                  v-model:value="apiData.semester_id" :options="formOptions.semesterOptions" allow-clear>
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :field-names="{ value: 'id', label: 'name' }" :disabled="!apiData.edu_plan_id"
                  :options="formOptions.academicGroupOptions" v-model:value="apiData.academic_group_id"
                  allow-clear></a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-md-10 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear />
              </a-space>
              <label for="yu">{{ $t("choose__fish__passport__code") }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-md-2">
              <button class="btn-search search-color" type="submit">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
            </div>
          </form>
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
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>#</th>
                    <th>{{ $t("Employee_Id_Number") }}</th>
                    <th>{{ $t("Passport_Number") }}</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("Updated_At") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row d-grid w-100" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.id_number }}
                    </td>
                    <td>
                      {{ element?.passport }}
                    </td>
                    <td>
                      <router-link :to="{ path: `/student/student/${element?.id}` }">
                        <!-- :datas="(element.surname, element.name)" wuni korsatasan Oybek -->
                        {{ element?.surname }} {{ element?.name }}
                        {{ element?.last_name }}<br />
                      </router-link>
                    </td>
                    <td>
                      <div>
                        {{ element.specialty?.code }} <br />
                        <span class="c-gray">{{
                          element?.payment_type?.name
                        }}</span>
                      </div>
                    </td>
                    <td>
                      {{ element?.semester?.academic_year?.name }}
                    </td>
                    <td>
                      <div>
                        {{ element?.specialty?.edu_type?.name }}<br />
                        <span class="c-gray">{{ element?.edu_form_id }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.semester?.semester }} - {{ $t("semester")
                        }}<br />
                        <span class="c-gray">{{ element?.semester?.course }} -
                          {{ $t("Course") }}</span>
                      </div>
                    </td>
                    <td>
                      {{ element?.academic_group?.name }}
                    </td>
                    <td>
                      {{
                        formatDate(
                          new Date(element?.updated_at),
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page" :loading="isLoading" />
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
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData?.total">{{ apiData?.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.student-list-page {
  .table-row {
    grid-template-columns: 5% 7% 9% auto 10% 10% 10% 10% 7% 10%;

    @include ipad {
      grid-template-columns: 50px 100px 120px 200px 140px 100px 100px 100px 140px 170px;
    }

    td,
    th {
      &:last-child {
        justify-content: start;
      }
    }
  }
}
</style>
