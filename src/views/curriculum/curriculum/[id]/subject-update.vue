<template>
  <div pagetitle="'Xaftaliklar'" class="weeksPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/curriculum"
              >{{ $t("Curriculum") }}
            </router-link>
            /
            <router-link
              :to="`/curriculum/curriculum/${curriculumID}/subjects`"
              >{{ planName }}</router-link
            >
            / {{ $t("Revision_of_science_program") }}
          </h5>
          <div class="panel-toggles">
            <!-- <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i
              >{{ $t("Download") }}
            </button> -->
            <router-link :to="`/curriculum/curriculum/${curriculumID}/subjects`"
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
    <!-----------START PAGE LIST HEADER TOP -------------------->

    <!-------------------create subject------------------------->
    <div class="card">
      <div class="card-body">
        <SubjectForm
          :form-state="formState"
          :errors="errors"
          :is-loading="isLoading"
          @submit="onSubmit"
          @clear-error="clearError"
        />
      </div>
    </div>
    <!-------------------create subject------------------------->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { updateSubjectEdu, fetchSubjectEduById } from "@/utils/api/edu/subject";
import { planList } from "@/utils/api/edu/plan";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
import SubjectForm from "@/components/forms/SubjectForm.vue";
const route = useRoute();

const curriculumID = (route.params?.id as number) ?? null;
const semesterID = (route.params?.idSemester as number) ?? null;
const subjectID = (route.params?.idSubject as number) ?? null;
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const optionsPlan = await planList().then((res) => res.result);
let planName = optionsPlan?.data.find((x) => x.id == curriculumID).name;
const formState: any = reactive({
  edu_plan_id: curriculumID,
  semester_id: semesterID,
  ratinggrade_id: null,
  final_exam_type_id: null,
  credit: null,
  total_load: null,
  type: null,
  date_start: "",
  date_end: "",
  subjects: [],
  audience_hours: [],
  exam_types: [],
  additional_types: [],
  subject_type_code: null,
});

const errors = reactive({
  edu_plan_id: [],
  semester_id: [],
  ratinggrade_id: [],
  final_exam_type_id: [],
  credit: [],
  total_load: [],
  type: [],
  date_start: [],
  date_end: [],
  subjects: [],
  audience_hours: [],
  exam_types: [],
  additional_types: [],
});

async function onSubmit() {
  try {
    isLoading.value = true;
    let datas = {
      edu_plan_id: formState.edu_plan_id,
      semester_id: formState.semester_id,
      ratinggrade_id: formState.ratinggrade_id,
      final_exam_type_id: formState.final_exam_type_id,
      credit: formState.credit,
      total_load: formState.total_load,
      type: formState.type,
      date_start: formState.date_start,
      date_end: formState.date_end,
      subjects: formState.subjects,
      audience_hours: formState.audience_hours,
      exam_types: formState.exam_types,
      additional_types: formState.additional_types,
      subject_type_code: formState.subject_type_code,
    };
    const res = await updateSubjectEdu(subjectID, formState);
    //Object.assign(formData, res);

    notif.success(t("Data_stored_successfully"));
    router.back();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

await fetchData();

async function fetchData() {
  const res = await fetchSubjectEduById(subjectID);
  Object.assign(formState, res.result);
}

function clearError(error: string) {
  errors[error] = [];
}
</script>

<style lang="scss"></style>

<style lang="scss">
.weeksPage {
  .table-row {
    grid-template-columns: 50% 50%;
    td {
      &:last-child {
        justify-content: end;
      }
    }
  }
  .modal-dialog {
    max-width: $ipad_pro !important;
  }
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
.vertical-text {
  min-width: 40px;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  vertical-align: left;
  transform: rotate(180deg);
  letter-spacing: 1.5px;
}
.table-curriculm {
  table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      width: 7%;
      border: 2px solid #e9ecef;
      padding: 10px;
      text-align: center;
    }
    th {
      font-weight: 700;
    }
  }
}
</style>
