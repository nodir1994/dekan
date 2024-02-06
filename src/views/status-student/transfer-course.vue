<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { eduPlanList, eduPlanListAll } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
  getCoursesListId,
  getAcademicGroupsBySemesterId,
} from "@/utils/api/reference/id";

import {
  getListStudents,
  courseTransferPut,
  getListOrders,
} from "@/utils/api/student-action/transfer-course";
import Swal from "sweetalert2";
import helpers from "@/utils/helper";
import router from "@/router";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  academic_year_id: null,
  course: null,
  semester_id: null,
  academic_group_id: null,
  course_id: null,
  command_id: null,
  dateCommand: null,
  course_bottom_id: null,
  current_page: 1,
  students: [],
  data: [],
  per_page: helpers.pagePer,
  links: [],
});

const sideFormOptions: any = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  courseOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  courseBottomOptions: null,
  orderOptions: null,
});

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
  sideFormOptions.eduPlanOptions = await eduPlanListAll().then(
    (res) => res?.result?.data
  );
  sideFormOptions.orderOptions = await getListOrders().then((res) =>
    res?.result.data.map((item: any) => {
      return { id: item.id, name: item.name, date: item.date };
    })
  );
});

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.course_bottom_id = null;
    apiData.academic_year_id = null;
    apiData.semester_id = null;
    apiData.course_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.academicYearsOptions = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.courseOptions = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.courseBottomOptions = null;

    await fetchList();

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
    apiData.semester = null;
    sideFormOptions.semesterOptions = null;
    apiData.course_id = null;
    sideFormOptions.courseOptions = null;

    await fetchList();

    if (apiData.edu_plan_id && apiData.academic_year_id) {
      let res = await semesterById(apiData);
      let aa = res?.result?.data.map((item: any) => {
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
      sideFormOptions.semesterOptions = aa.filter(
        (item: any) => !(item.semester % 2)
      );
    }
  }
);

watch(
  () => apiData.semester,
  async () => {
    await fetchList();
    if (apiData.semester) {
      // let semester
      sideFormOptions.courseBottomOptions = await getCoursesListId(
        apiData
      ).then((res) =>
        res?.result.map((item: any) => {
          return {
            id: item.semester_id,
            name:
              item.course +
              "-" +
              t("course") +
              " " +
              item.semester +
              "-" +
              t("semester"),
          };
        })
      );
    }
  }
);

watch(
  () => apiData.command_id,
  () => {
    if (apiData.command_id) {
      apiData.dateCommand = sideFormOptions.orderOptions.find(
        (item: any) => item.id == apiData.command_id
      ).date;
    } else {
      apiData.dateCommand = null;
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

async function onSearch() {
  await fetchList();
}

function clearAllSelect() {
  apiData.edu_plan_id = null;
  apiData.search = null;
  apiData.course_bottom_id = null;
  apiData.academic_year_id = null;
  apiData.semester_id = null;
  apiData.semester = null;
  apiData.course_id = null;
  apiData.academic_group_id = null;
  apiData.command_id = null;
  apiData.students = [];
}

async function courseTransfer() {
  try {
    isLoading.value = true;
    clearErrors();
    let datas: any = {};
    if (apiData.page > 1) datas.page = apiData?.page;
    Object.assign(datas, {
      students: apiData.students,
      semester_id: apiData.course_bottom_id,
      command_id: apiData.command_id,
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
          const res = await courseTransferPut(datas);
          notif.success(t("Data_was_successfully_transferred"));
          clearAllSelect();
          await fetchList();
        }
      })
      .catch(error => {
        Object.assign(errors, error.response?.data);
        notif.error(t("Failed") + ": " + error.response?.data?.message);
      })
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}
function clearErrors() {
  Object.assign(errors, {
    specialty_id: [],
    semester_id: [],
    academic_group_id: [],
  });
}

const errors = reactive({
  semester_id: [],
  command_id: [],
});

async function fetchList(pages?: number) {
  let params: any = reactive({});
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  if (apiData.semester_id) params.semester_id = apiData.semester_id;
  if (apiData.search) params.search = apiData.search;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  params.per_page = apiData.per_page;
  params.page = pages || 1;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;

      const res = await getListStudents(params);
      Object.assign(apiData, res.result);

      plainOptions.value = apiData.data.map((item: any) => item.id);
      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response.status == 500) {
      const path = `/page/500`;
      router.push({ path });
    }
    if (error.response.status == 422) {
      notif.error(
        t("Dashboard_Error") + ": " + t("Fill_in_the_required_fields")
      );
    }
    if (error.response.status == 404) {
      const path = `/page/404`;
      router.push({ path });
    } else {
      notif.error(t("Dashboard_Error") + ": " + error.message);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'Kursga o’tkazish'" class="transfer-course-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 style="padding: 7px 0" class="card-title">
            {{ $t("transfer__course") }}
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
                  <tr class="table-row w-100 d-grid">
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
                    <th>{{ $t("gpa") }}</th>
                    <th>{{ $t("Contract_Indebtedness") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="element?.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="apiData.students" :value="element?.id" />
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.surname }} {{ element?.name }} <br />
                        <span class="c-gray">
                          {{ element.id_number }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.specialty?.edu_type?.name }}
                        <br />
                        <span class="c-gray"> {{ element.edu_form }} </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.semester?.course }}-{{ $t("Course") }}
                        <br />
                        <span class="c-gray">
                          {{ element?.semester?.semester }}-{{ $t("semester") }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.academic_group?.name }} <br />
                        <span class="c-gray">
                          {{ element?.academicYear }}
                        </span>
                      </div>
                    </td>
                    <td>{{ element?.gpa }}</td>
                    <td>{{ element?.gpa }}</td>
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
              <div class="mb-3">
                <a-select allow-clear :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </div>
              <div class="mb-3">
                <a-select allow-clear :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiData.academic_year_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearsOptions" :placeholder="t('Choose_Education_Year')">
                </a-select>
              </div>
              <!-- <div class="mb-3">
                    <a-select allow-clear v-model:value="apiData.course_id" :field-names="{ value: 'id', label: 'name' }"
                      :options="s
                      :filter-option="helpers.filterOptionByName" show-searchideFormOptions.courseOptions" :placeholder="t('Choose_Level')">
                    </a-select>
                  </div> -->
              <div class="mb-3">
                <a-select allow-clear :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiData.semester" :field-names="{ value: 'semester', label: 'name' }"
                  :options="sideFormOptions.semesterOptions" :placeholder="t('Choose_Semester')">
                </a-select>
              </div>
              <div class="mb-3">
                <a-select allow-clear :filter-option="helpers.filterOptionByName" show-search
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
            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("Next_Level")
              }}</label>
              <a-select allow-clear :filter-option="helpers.filterOptionByName" show-search
                v-model:value="apiData.course_bottom_id" :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.courseBottomOptions" :placeholder="t('next__level__course')"
                :disabled="!apiData.semester">
              </a-select>
            </div>

            <div class="mb-3" name="nameFaculty">
              <label for="division-name-select" class="form-label">{{
                $t("Decree")
              }}</label>
              <a-select allow-clear :filter-option="helpers.filterOptionByName" show-search
                v-model:value="apiData.command_id" :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.orderOptions" :placeholder="t('Select_the_command')">
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
              <button class="btns c-save" :disabled="!apiData?.students?.length || !apiData.course_bottom_id
                " type="button" @click="courseTransfer">
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
.transfer-course-page {
  .table-row {
    grid-template-columns: 40px 50px auto 14% 14% 14% 60px 60px;

    @include mobile() {
      grid-template-columns: 40px 50px auto 120px 120px 120px 60px 60px;
    }

    th,
    td {

      &:nth-last-child(1),
      &:nth-last-child(2) {
        justify-content: center;
      }
    }
  }
}

.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>
