<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute,useRouter  } from "vue-router";



import { updateAwardById, createAward, getAwardById } from "@/utils/api/students/award";
import { educationList, eduFormList, archiveMentList, archiveMentTypeList, eduPlanList, academicYearsList } from "@/utils/api/reference/index"
import { fetchStudentBySemesterByAcademicGroup } from "@/utils/api/students/create";

import {
  semesterByIdOnlyEduPlan,
  academicGroupById
} from "@/utils/api/reference/id";

const route = useRoute();
const router = useRouter();
const paramsID = route.params?.id ?? null;

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData = reactive({
  edu_type_id: null,
  edu_form_id: null,
  edu_plan_id: null,
  semester_id: null,
  academic_group_id: null,
  student_id: null,
  type_id: null,
  category_id: null,
  year: null,
  document: null,
  status: null
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  academicYearOptions: null,
  studentOptions: null,
  awardGroupOptions: null,
  awardCategoryOptions: null,
});

const errors = reactive({
  student_id: [],
  category_id: [],
  type_id: [],
  document: [],
  year: []
});

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then((res) => res?.result)
  sideFormOptions.eduFormOptions = await eduFormList().then((res) => res?.result)
  sideFormOptions.eduPlanOptions = await eduPlanList().then((res) => res?.result?.data)
  sideFormOptions.awardGroupOptions = await archiveMentList().then((res) => res?.result)
  sideFormOptions.academicYearOptions = await academicYearsList().then((res) => res?.result.data.map(item=> {
    return{
      id: item.year,
      name: item.year
    }
  }))
  sideFormOptions.awardCategoryOptions = await archiveMentTypeList().then((res) => res?.result)
  

});
if (paramsID) {
  await fetchData();
}
async function fetchData() {
  let result = await getAwardById(paramsID)
  Object.assign(apiData, result.result);
}

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    apiData.student_id = null;
    sideFormOptions.academicGroupOptions = null
    sideFormOptions.semesterOptions = null
    sideFormOptions.studentOptions = null

    if (apiData.edu_plan_id) {
      let res = await semesterByIdOnlyEduPlan(apiData.edu_plan_id)
      sideFormOptions.semesterOptions = res?.result?.data.map(item => { return { id: item.id, name: item.course + '-kurs / ' + item.semester + '-' + t('semester') } })
      let res2 = await academicGroupById(apiData.edu_plan_id)
      sideFormOptions.academicGroupOptions = res2?.result?.data.map(item => { return { id: item.id, name: item.name } })
    }
  }
);

watch(
  () => apiData.academic_group_id,
  async () => {
    if (apiData.academic_group_id && apiData.semester_id) {
      sideFormOptions.studentOptions = await fetchStudentBySemesterByAcademicGroup(apiData).then((res) => res?.result?.data.map(
        item => { return { id: item.id, name: item.name + ' ' + item.surname } }
      ))
    } else {
      apiData.student_id = null
      sideFormOptions.studentOptions = null
    }
  }
);

watch(
  () => apiData.semester_id,
  async () => {
    if (apiData.academic_group_id && apiData.semester_id) {
      sideFormOptions.studentOptions = await fetchStudentBySemesterByAcademicGroup(apiData).then((res) => res?.result?.data)
    } else {
      apiData.student_id = null
      sideFormOptions.studentOptions = null
    }
  }
);


async function onSubmit() {
  try {
    isLoading.value = true;
    clearError();
    Object.assign(errors, {});
    if (paramsID) {
      await updateAwardById(paramsID, apiData);
    } else {
      await createAward(apiData);
    }
    notif.success(t("Data_stored_successfully"));
    router.push(`/student/award`)
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}

function clearError(error: string) {
  errors[error] = [];
}


</script>

<template>
  <div pagetitle="`Talaba yutug'i yaratish`" class="creat-award-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/student/award">{{ $t('Student_Award') }} / </router-link>
            <span v-if="!paramsID">{{ $t('create__award') }}</span>
            <span v-else>{{ $t('Manage_Award') }}</span>
          </h5>
          <div class="panel-toggles">
            <router-link to="/student/award" class="btns black-c py-1.5 px-4" type="submit">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-lg-6" v-if="!paramsID">
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-3" name="optionsEducationType">
                    <label for="division-name-select" class="form-label">{{ $t("Education_Type") }}</label>
                    <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.edu_type_id"
                      :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose')" allow-clear>
                    </a-select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3" name="optionsEducationForm">
                    <label for="division-name-select" class="form-label">{{ $t('Edu_form') }}</label>
                    <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.edu_form_id"
                      :options="sideFormOptions.eduFormOptions" :placeholder="t('Choose')" allow-clear>
                    </a-select>
                    <span v-if="errors.edu_form_id" class="text-danger small">
                      {{ errors.edu_form_id[0] }}
                    </span>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3" name="optionsTrainingPlan">
                    <label for="division-name-select" class="form-label">{{ $t('edu_plan') }}</label>
                    <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.edu_plan_id"
                      :options="sideFormOptions.eduPlanOptions" :placeholder="t('Choose')" allow-clear>
                    </a-select>
                    <span v-if="errors.edu_plan_id" class="text-danger small">
                      {{ errors.edu_plan_id[0] }}
                    </span>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3" name="courseStudent">
                    <label for="division-name-select" class="form-label">{{ $t('student__course') }}</label>
                    <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.semester_id"
                      :options="sideFormOptions.semesterOptions" :placeholder="t('Choose')" allow-clear>
                    </a-select>
                    <span v-if="errors.semester_id" class="text-danger small">
                      {{ errors.semester_id[0] }}
                    </span>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3" name="optionsGroup">
                    <label for="division-name-select" class="form-label">{{ $t('group__students') }}</label>
                    <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.academic_group_id"
                      :options="sideFormOptions.academicGroupOptions" :placeholder="t('Choose')" allow-clear>
                    </a-select>
                    <span v-if="errors.academic_group_id" class="text-danger small">
                      {{ errors.academic_group_id[0] }}
                    </span>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3" name="optionsEmployee">
                    <label for="division-name-select" class="form-label">{{ $t('Student') }}</label>
                    <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.student_id"
                      :options="sideFormOptions.studentOptions" :placeholder="t('Choose')" allow-clear>
                    </a-select>
                    <span v-if="errors.student_id" class="text-danger small">
                      {{ errors.student_id[0] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3" name="optionsEducationForm" v-if="paramsID">
                <h3 class="fw-bold">
                  {{ apiData?.student?.surname }} {{apiData?.student?.name}}
                </h3>
              </div>
              <div class="mb-3" name="awardTypes">
                <label for="division-name-select" class="form-label">{{ $t('award_Category') }}</label>
                <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.type_id"
                  :options="sideFormOptions.awardCategoryOptions" :placeholder="t('Choose')" allow-clear>
                </a-select>
                <span v-if="errors.type_id" class="text-danger small">
                  {{ errors.type_id[0] }}
                </span>
              </div>
              <div class="mb-3" name="awardType">
                <label for="division-name-select" class="form-label">{{ $t('award_Group') }}</label>
                <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.category_id"
                  :options="sideFormOptions.awardGroupOptions" :placeholder="t('Choose')" allow-clear>
                </a-select>
                <span v-if="errors.category_id" class="text-danger small">
                  {{ errors.category_id[0] }}
                </span>
              </div>
              <div class="mb-3" name="lessonAdvecedTraining">
                <label for="division-name-input" class="form-label">{{ $t('award_Document') }}</label>
                <a-input v-model:value="apiData.document" />
                <span v-if="errors.document" class="text-danger small">
                  {{ errors.document[0] }}
                </span>
              </div>
              <div class="mb-3" name="year">
                <label for="division-name-input" class="form-label">{{ $t('award_Year') }}</label>
                <!-- <a-input v-model:value="apiData.year" /> -->
                <a-select :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.year"
                  :options="sideFormOptions.academicYearOptions" :placeholder="t('Choose')" allow-clear>
                </a-select>
                <span v-if="errors.year" class="text-danger small">
                  {{ errors.year[0] }}
                </span>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btns c-save" type="submit" :disabled="!apiData.student_id">
                  <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
                  {{ $t("Save") }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
