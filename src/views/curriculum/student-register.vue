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
  getListSubjects,
  studentWithSubject,
  attach,
  studentFilter,
  studentWithSubjectDelete,
  studentWithGroup,
} from "@/utils/api/students/register";
import { Item } from "ant-design-vue/lib/menu";
import NoData from "@/components/NoData.vue";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const params: any = reactive({});
const loadingSubjects = ref(false);
//fanga biriktirilgan talabalar
const newData: any = reactive({
  students: [],
  subject_id: null,
  student_id: null,
});

const apiData: any = reactive({
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  curriculum_id: null,
  data_subjects: [],
  data: [],
  subjects: [],
  links: [],
  students: [],
  total: 0,
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  subjectsOptions: null,
  studentOptions: null,
});

const plains: any = reactive({
  students: [],
  subjects: [],
  enroll: [],
});

const checkAll1 = computed({
  get() {
    return (
      apiData?.students?.length === plains.students?.value?.length &&
      apiData?.students?.length > 0
    );
  },
  set(val) {
    if (val) {
      apiData.students = plains.students.value;
    } else {
      apiData.students = [];
    }
  },
});

const checkAll2 = computed({
  get() {
    return (
      apiData?.data_subjects?.length === plains.subjects?.value?.length &&
      apiData?.subjects?.length > 0
    );
  },
  set(val) {
    if (val) {
      apiData.subjects = plains.subjects.value;
    } else {
      apiData.subjects = [];
    }
  },
});
const checkAll3 = computed({
  get() {
    return (
      newData?.students?.length === plains.enroll?.value?.length &&
      newData?.students?.length > 0
    );
  },
  set(val) {
    if (val) {
      newData.students = plains.enroll.value;
    } else {
      newData.students = [];
    }
  },
});

// await fetchList();

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
      apiData.subjects = [];
    }
  }
);

watch(
  () => apiData.academic_year_id,
  async () => {
    apiData.semester_id = null;
    sideFormOptions.semesterOptions = null;
    if (apiData.edu_plan_id && apiData.academic_year_id) {
      let res = await semesterById(apiData);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
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
    }
    await fetchList();
  }
);

watch(
  () => [newData.subject_id, newData.student_id],
  async () => {
    await subjectFetchList();
  }
);
watch(
  () => [apiData.academic_group_id, apiData.semester_id],
  async () => {
    await fetchList();
    if (apiData.academic_group_id) {
      await subjectFetchList();
    }

    const datas = {
      academic_group_id: apiData.academic_group_id,
      semester_id: apiData.semester_id,
    };
    if (datas.academic_group_id && datas.semester_id) {
      sideFormOptions.studentOptions = await studentFilter(datas);
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
watch(
  () => newData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      newData.page = Number(newVal);
      await subjectFetchList(newVal);
    }
  }
);
function clearErrors() {
  Object.assign(errors, {
    academic_group_id: [],
  });
}
const errors: any = reactive({
  edu_plan_id: [],
  semester_id: [],
});

async function fetchList(pages?: number) {
  if (apiData.semester_id && apiData.academic_group_id) {
    try {
      let params: any = reactive({
        page: pages || 1,
        per_page: helpers.pagePer,
      });
      if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
      if (apiData.academic_year_id)
        params.academic_year_id = apiData.academic_year_id;
      if (apiData.semester_id) params.semester_id = apiData.semester_id;
      if (apiData.academic_group_id)
        params.academic_group_id = apiData.academic_group_id;
      isLoading.value = true;
      const res = await studentWithGroup(params);
      Object.assign(apiData, res.result);
      apiData.data_subjects = await getListSubjects(params).then(
        (res) => res?.result
      );
      sideFormOptions.subjectsOptions = apiData.data_subjects.map(
        (item: any) => {
          return { id: item.subject.id, name: item.subject.name };
        }
      );

      plains.subjects.value = apiData.data_subjects.map((item: any) => item.id);
      plains.students.value = apiData.data.map((item: any) => item.id);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    apiData.data = [];
    apiData.data_subjects = [];
  }
}
async function subjectFetchList(pages?: number) {
  if (apiData.semester_id && apiData.academic_group_id) {
    let params: any = reactive({
      page: pages || 1,
      per_page: helpers.pagePer,
    });
    if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
    if (apiData.semester_id) params.semester_id = apiData.semester_id;
    if (apiData.academic_group_id)
      params.academic_group_id = apiData.academic_group_id;
    if (newData.subject_id) params.subject_id = newData.subject_id;
    if (newData.student_id) params.student_id = newData.student_id;
    loadingSubjects.value = true;

    try {
      const res = await studentWithSubject(params);
      Object.assign(newData, res.result);
      plains.enroll.value = newData.data.map((item: any) => item.id);
    } catch (error) {
      console.log(error);
    } finally {
      loadingSubjects.value = false;
    }
  } else {
    newData.data = [];
  }
}
async function attachSubjects() {
  try {
    isLoading.value = true;
    clearErrors();
    let datas: any = {};
    if (apiData.page > 1) datas.page = apiData?.page;
    Object.assign(datas, {
      students: apiData.students,
      curriculum_subjects: apiData.subjects,
      semester_id: apiData.semester_id2,
      // curriculum_id: apiData?.data_subjects[0].curriculum_id,
      academic_group_id: apiData.academic_group_id,
    });

    const res = await attach(datas);
    notif.success(
      t("Selected_students_for_subject_is_successfully_registered")
    );
    apiData.subjects = [];
    apiData.students = [];
    fetchList();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function deleteSubjectWithStudent() {
  try {
    isLoading.value = true;
    let student_subjects = {
      student_subjects: newData.students,
    };
    await studentWithSubjectDelete(student_subjects);
    notif.success(t("Delete_message.Record_deleted_successfull"));
    fetchList();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}
const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<template>
  <div pagetitle="'Fanga biriktirish'" class="transferPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header p-2 ps-0">
          <h5 class="card-title">{{ $t("attach__subject") }}</h5>
        </div>
      </div>
    </div>
    <!----------------------------------------->
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <h4 class="mb-3">{{ $t("Students_in_Group") }}</h4>
            <form class="row">
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select
                    allow-clear
                    v-model:value="apiData.edu_plan_id"
                    :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.eduPlanOptions"
                    :placeholder="$t('Please_select_curriculum')"
                  >
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select
                    allow-clear
                    v-model:value="apiData.academic_year_id"
                    :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.academicYearsOptions"
                    :disabled="!apiData.edu_plan_id"
                    :placeholder="t('Choose_Education_Year')"
                  >
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select
                    allow-clear
                    v-model:value="apiData.semester_id"
                    :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.semesterOptions"
                    :disabled="!apiData.academic_year_id"
                    :placeholder="t('Choose_Semester')"
                  >
                  </a-select>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="mb-3" name="nameFaculty">
                  <a-select
                    allow-clear
                    v-model:value="apiData.academic_group_id"
                    :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.academicGroupOptions"
                    :disabled="!apiData.semester_id"
                    :placeholder="t('Choose_Group')"
                  >
                  </a-select>
                  <span
                    v-if="errors['academic_group_id']"
                    class="text-danger small"
                  >
                    {{ errors["academic_group_id"][0] }}
                  </span>
                </div>
              </div>
            </form>

            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-all-coupling">
                    <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll1"
                        />
                      </div>
                    </th>
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-all-coupling"
                    v-for="(element, index) in apiData.data"
                    :key="element?.id"
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="apiData.students"
                          :value="element?.id"
                        />
                      </div>
                    </td>

                    <td>{{ element?.id }}</td>
                    <td>{{ element?.fullname }} <br /></td>
                    <td>
                      {{ element?.specialty?.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                v-if="apiData.last_page > 1 && apiData.edu_plan_id"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <h4 class="mb-3">{{ $t("Subjects_in_Curriculum") }}</h4>
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-all-coupling2">
                    <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll2"
                        />
                      </div>
                    </th>
                    <th>#</th>
                    <th>{{ $t("Subjects") }}</th>
                    <th>{{ $t("sciense_type") }}</th>
                    <!-- <th>{{ $t('In_Group') }}</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-all-coupling2"
                    v-for="(element, index) in apiData.data_subjects"
                    :key="element?.id"
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="apiData.subjects"
                          :value="element?.id"
                        />
                      </div>
                    </td>
                    <td>{{ index + 1 }}/1</td>
                    <td>
                      <!-- {{ element.data_subjects }} -->
                      {{ element?.subject?.name }}
                    </td>
                    <td>{{ element?.type }}</td>
                    <!-- <td>----</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btns c-save mt-3 py-1.5 px-4"
                @click="attachSubjects"
                :disabled="
                  !(
                    apiData.subjects?.length > 0 && apiData.students?.length > 0
                  )
                "
                type="button"
              >
                <i class="mdi mdi-check font-size-14 align-middle me-1"></i>Ok
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4">
        <div class="card" v-if="newData?.data && apiData.edu_plan_id">
          <div class="card-body">
            <LoadingOverlay v-if="loadingSubjects" />
            <h3>{{ $t("student__register__by__subjects") }}</h3>
            <div class="card">
              <div class="row">
                <!-- //Fanlar  -->
                <div class="my-2 col-xl-6 form--item">
                  <a-space>
                    <a-select
                      allow-clear
                      v-model:value="newData.subject_id"
                      :field-names="{ value: 'id', label: 'name' }"
                      :options="sideFormOptions.subjectsOptions"
                    ></a-select>
                  </a-space>
                  <label for="yu">{{ $t("Choose_Subject") }}</label>
                </div>
                <div class="my-2 col-xl-6 form--item">
                  <a-space>
                    <a-select
                      allow-clear
                      v-model:value="newData.student_id"
                      :field-names="{ value: 'id', label: 'fullname' }"
                      :options="sideFormOptions.studentOptions?.result"
                      :filter-option="filterOption"
                      show-search
                    >
                    </a-select>
                  </a-space>
                  <label for="yu">{{ $t("Choose_Student") }}</label>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-all-coupling3">
                    <th>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="checkAll3"
                      />
                    </th>
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Subjects") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Group") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-all-coupling3"
                    v-for="(element, index) in newData.data"
                    :key="element?.id"
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="newData.students"
                          :value="element?.id"
                        />
                      </div>
                    </td>
                    <td>
                      {{
                        (newData.current_page - 1) * newData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.student?.fullname }}
                    </td>
                    <td>
                      {{ element?.subject?.name }}
                    </td>
                    <td>
                      {{ element?.academic_year }}
                    </td>
                    <td>{{ element?.semester }}-{{ t("semestr") }}</td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                v-if="newData.last_page > 1 && apiData.edu_plan_id"
                class="mt-2"
                v-bind="{ ...newData }"
                v-model:current-page="newData.current_page"
              />
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  :disabled="!newData.students.length"
                  @click="deleteSubjectWithStudent"
                  class="btns c-delete mt-3"
                >
                  {{ $t("Remove") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="card" v-else>
          <div class="card-body">
            <NoData />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.transferPage {
  .table-row-all-coupling {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px auto 255px;

    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }

  .table-row-all-coupling2 {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px auto 200px;

    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }

  .table-row-all-coupling3 {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px auto 280px 150px 150px 150px;

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
