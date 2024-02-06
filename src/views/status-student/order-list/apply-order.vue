<script setup lang="ts">
import { computed, ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  studentCommandList,
  attachCommand,
  getCommandEnrollment,
} from "@/utils/api/status-student/apply-order";
import {
  eduPlanListAll,
  semesterListById,
  academicGroupsList,
  orderList,
} from "@/utils/api/reference/index";
import { academicYearsById } from "@/utils/api/reference/id";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import helpers from "@/utils/helper";

const router = useRouter();

const selectedId = ref<number | null>(null);
const { t } = useI18n();
const isLoading = ref(false);
const notif = useNotyf();
const optionsAcademicYear: any = ref([]);
const optionsEduPlan: any = ref([]);
const optionsSemester: any = ref([]);
const optionsAcademicGroup: any = ref([]);
const loader = ref(true);

// onMounted(async () => {
//   const res1 = await fetchHei();
//   Object.assign(apiParams, res1);
//   optionsEduPlan.value = await eduPlanListAll().then((res) => res.result);
//   optionsSemester.value = await semesterListById().then((res) => res.result);
//   optionsAcademicGroup.value = await academicGroupsList().then((res) => res.result);
// });
// const optionsEduPlan = await eduPlanListAll().then((res) => res.result);
// const optionsSemester = await semesterListById().then((res) => res.result);
// const optionsAcademicGroup = await academicGroupsList().then(
//   (res) => res.result
// );
const optionsCommand = await getCommandEnrollment().then(
  (res) => res.result.data
);

onMounted(async () => {
  Promise.all([eduPlanListAll()]).then((responses) => {
    optionsEduPlan.value = responses[0].result;
  });
});

const apiData: any = reactive({
  current_page: 1,
  per_page: helpers.pagePer,
  data: [],
  links: [],
});
const apiParams = reactive({
  page: 1,
  edu_plan_id: null,
  academic_group_id: null,
  faculty_id: null,
  semester_id: null,
  course: null,
  academic_year_id: null,
  per_page: helpers.pagePer,
  search: "",
});

const sideForm: any = reactive({
  command_id: null,
  students: [],
});

const errors = reactive({
  semester_id: [],
  specialty_id: [],
});
const plainOptions: any = ref([]);

await fetchList();

//filter faculty
// S

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
watch(
  () => apiParams.edu_plan_id,
  async function (newVal) {
    await fetchList();
    if (newVal) {
      // const res = await academicYearsById(newVal);
      // optionsAcademicYear.value = res.result;
      const res2 = await semesterListById(newVal);
      optionsSemester.value = res2.result?.data.map((item: any) => {
        return {
          id: item.id,
          name: item.semester + "-" + t("semester_number"),
        };
      });
    }
  }
);
// watch(
//   () => apiParams.academic_year_id,
//   async function (newVal) {
//     await fetchList();
//   }
// );
watch(
  () => apiParams.semester_id,
  async function (newVal) {
    if (newVal) {
      const res = await academicGroupsList(newVal);
      optionsAcademicGroup.value = res.result;
      await fetchList();
    }
  }
);

//search
const counter = ref();

watch(
  () => apiParams.search,
  async (newVal, oldVal) => {
    if (apiParams.search == "" && counter.value == 1) {
      await fetchList();
      counter.value = 0;
    }
  }
);

async function onSearch() {
  await fetchList();
  counter.value = 1;
}
async function fetchList(page?: number) {
  isLoading.value = true;
  let datas: any = reactive({
    page: page || 1,
    per_page: apiParams.per_page,
  });
  if (apiParams.edu_plan_id) datas.edu_plan_id = apiParams.edu_plan_id;
  if (apiParams.academic_group_id)
    datas.academic_group_id = apiParams.academic_group_id;
  if (apiParams.faculty_id) datas.faculty_id = apiParams.faculty_id;
  if (apiParams.semester_id) datas.semester_id = apiParams.semester_id;
  if (apiParams.course) datas.course = apiParams.course;
  if (apiParams.academic_year_id)
    datas.academic_year_id = apiParams.academic_year_id;
  if (apiParams.search != "") datas.search = apiParams.search;

  try {
    if (loader.value) {
      loader.value = false;
      const res = await studentCommandList(datas);
      Object.assign(apiData, res.result);
      plainOptions.value = apiData.data.map((item: any) => item.id);
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

const checkAll = computed({
  get() {
    return sideForm.students.length === plainOptions.value.length;
  },
  set(val) {
    if (val) {
      sideForm.students = plainOptions.value;
    } else {
      sideForm.students = [];
    }
  },
});
watch(
  () => sideForm.command_id,
  () => {
    if (sideForm.command_id) {
      sideForm.dateCommand = optionsCommand.find(
        (item: any) => item.id == sideForm.command_id
      ).date;
    } else {
      sideForm.dateCommand = null;
    }
  }
);
async function attachData() {
  try {
    const res = await attachCommand(sideForm);
    notif.success(t("Decree_name_applied_to_count_students"));
    plainOptions.value = [];
    sideForm.students = [];
    sideForm.command_id = null;
    clearErrors();
    await fetchList();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  }
}
function clearErrors() {
  Object.assign(errors, {
    specialty_id: [],
    semester_id: [],
    academic_group_id: [],
  });
}
function clearFields() {
  apiParams.edu_plan_id = null;
  apiParams.academic_group_id = null;
  apiParams.semester_id = null;
  apiParams.course = null;
  apiParams.academic_year_id = null;
  apiParams.search = "";
}
</script>

<template>
  <div pagetitle="'Buyruqqa biriktirish'" class="apply-order-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/status-student/order-list"
              >{{ $t("Decree") }} /
            </router-link>
            {{ $t("Decree_Apply") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/status-student/order-list"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Back") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!--------------------------------------->

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="table-responsive" v-if="apiData.data.length">
              <table class="content-table">
                <thead>
                  <tr class="table-row w-100 d-grid">
                    <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll"
                        />
                      </div>
                    </th>
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Level") }}</th>
                    <th>{{ $t("Group") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row w-100 d-grid"
                    v-for="(element, index) in apiData.data"
                    :key="index"
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="sideForm.students"
                          :value="element.id"
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
                      <div>
                        {{ element.surname }} {{ element.name }}
                        {{ element.last_name }}<br />
                        <span class="c-gray">
                          {{ element.id }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.specialty?.edu_type?.name }} <br />
                        <!-- <span class="c-gray">
                          {{ element.specialty?.name }}
                        </span> -->
                      </div>
                    </td>
                    <td>
                      <div v-if="element?.semester?.course">
                        {{ element?.semester?.course }} - {{ $t("Course")
                        }}<br />
                        <span v-if="element.semester.semester" class="c-gray">
                          {{ element.semester.semester }}- {{ $t("semester") }}
                        </span>
                      </div>
                    </td>
                    <td>
                      {{ element?.academic_group?.name }}
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
            <div class="table-responsive" v-else>
              <NoData />
            </div>
          </div>
        </div>
        <span class="element-count mb-2" v-if="apiData.data.length"
          >{{ apiData.current_page }}-{{
            apiData.data.length + apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
      <form @submit.prevent="attachData" class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="mb-3 col-md-10" name="nameFaculty">
                <a-input
                  v-model:value="apiParams.search"
                  allow-clear
                  style="width: 100%; border-radius: 10px !important"
                  :placeholder="t('choose__fish__student__passport__code')"
                />
              </div>
              <div class="col-md-2">
                <button
                  @click="onSearch"
                  allow-clear
                  type="button"
                  class="btn-search search-color"
                  :disabled="apiParams.search == '' || apiParams.search == null"
                >
                  <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>
                </button>
              </div>
              <div class="mb-3" name="nameFaculty">
                <a-select
                  v-model:value="apiParams.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsEduPlan?.data"
                  :placeholder="t('Choose_a_curriculum')"
                  allow-clear
                >
                </a-select>
              </div>

              <!-- <div class="mb-3" name="nameFaculty">
                <a-select
                  v-model:value="apiParams.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsAcademicYear?.data"
                  :placeholder="t('Choose_Education_Year')"
                  allow-clear
                >
                </a-select>
              </div> -->

              <div class="mb-3" name="nameFaculty">
                <a-select
                  v-model:value="apiParams.course"
                  :placeholder="t('Choose_Level')"
                  @change="clearError('course')"
                >
                  <a-select-option :value="1" label="1-course"
                    >1-{{ $t("course_number") }}</a-select-option
                  >
                  <a-select-option :value="2" label="2-course"
                    >2-{{ $t("course_number") }}</a-select-option
                  ><a-select-option :value="3" label="3-course"
                    >3-{{ $t("course_number") }}</a-select-option
                  ><a-select-option :value="4" label="4-course"
                    >4-{{ $t("course_number") }}</a-select-option
                  >
                </a-select>
              </div>

              <div class="mb-3" name="nameFaculty">
                <a-select
                  v-model:value="apiParams.semester_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsSemester"
                  :disabled="!optionsSemester"
                  :placeholder="t('Choose_Semester')"
                >
                </a-select>
              </div>

              <div class="mb-3" name="nameFaculty">
                <a-select
                  v-model:value="apiParams.faculty_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsAcademicGroup?.data"
                  :disabled="!optionsAcademicGroup.data"
                  :placeholder="t('Choose_Group')"
                >
                </a-select>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-delet me-1"
                  @click="clearFields()"
                >
                  <i class="mdi mdi-cancel font-size-14 align-middle me-1"></i>
                  {{ $t("Clear") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <label for="division-name-input" class="form-label">{{
                $t("Count_of_Contract_Student")
              }}</label>
              <a-input :value="sideForm.students?.length" disabled />
            </div>

            <div class="mb-3" name="nameFaculty">
              <label for="division-name-select" class="form-label">{{
                $t("Decree")
              }}</label>
              <a-select
                v-model:value="sideForm.command_id"
                :options="optionsCommand"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="t('Select_the_command')"
              >
              </a-select>
            </div>

            <div class="mb-3" name="nameFaculty">
              <label for="division-name-input" class="form-label">{{
                $t("Circulation_Doc_Date")
              }}</label>
              <a-input
                v-model:value="sideForm.dateCommand"
                placeholder="YYYY-MM-DD"
                disabled
                value-format="YYYY-MM-DD"
              />
            </div>

            <div class="d-flex justify-content-end">
              <button
                class="btns c-save"
                type="submit"
                :disabled="
                  !(sideForm.students?.length > 0) || !sideForm.command_id
                "
              >
                <i class="mdi mdi-check font-size-14 align-middle me-1"></i
                >{{ $t("apply_Decree") }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.apply-order-page {
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
    }
  }
}
</style>
