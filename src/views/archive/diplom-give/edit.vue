<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";
import { getDiplomById, getDiplomByIdStudent } from "@/utils/api/archive/give";

const { t } = useI18n();
const isLoading = ref(false);
const route = useRoute();

const formState = reactive({
  student_id: null,
  name: null,
  surname: null,
  last_name: null,
  birthdate: null,
  eduni_name: null,
  rector: null,
  about_eduni: null,
  email_eduni: null,
  accridation: null,
  faculty: null,
  speciality_code: null,
  speciality: null,
  qualification: null,
  about_qualification: null,
  edu_type: null,
  edu_language: null,
  edu_form: null,
  academic_year: null,
  edu_duration: null,
  graduation_work: null,
  old_eduni_data: null,
  old_edu: null,
  old_edu_rating_system: null,
  entering_data: null,
  next_edu_data: null,
  about_diplom: null,
  working_activity: null,
  given_place: null,
  number: null,
  diplom_category_id: null,
  note_number: null,
  note_date: null,
  dak_date: null,
  synchronous_status: null,
  synchronous_date: null,
  status: null,
  diplom_status_form_id: null,
});

const errors: any = reactive({
  student_id: [],
  name: [],
  surname: [],
  last_name: [],
  birthdate: [],
  eduni_name: [],
  rector: [],
  about_eduni: [],
  email_eduni: [],
  accridation: [],
  faculty: [],
  speciality_code: [],
  speciality: [],
  qualification: [],
  about_qualification: [],
  edu_type: [],
  edu_language: [],
  edu_form: [],
  academic_year: [],
  edu_duration: [],
  graduation_work: [],
  old_eduni_data: [],
  old_edu: [],
  old_edu_rating_system: [],
  entering_data: [],
  next_edu_data: [],
  about_diplom: [],
  working_activity: [],
  given_place: [],
  number: [],
  diplom_category_id: [],
  note_number: [],
  note_date: [],
  dak_date: [],
  synchronous_status: [],
  synchronous_date: [],
  status: [],
  diplom_status_form_id: [],
});
const paramsID: any = route.query?.id ?? null;
const student_id: any = route.query?.student_id ?? null;

async function fetchDataByID(id: number) {
  const res = await getDiplomById(id);
  Object.assign(formState, res.result);
}

async function fetchDataByIDStudent(id: number) {
  const res = await getDiplomByIdStudent(id);
  Object.assign(formState, res.result);
}

if (paramsID) {
  await fetchDataByID(paramsID);
} else {
  await fetchDataByIDStudent(student_id);
}

function clearError(error: string) {
  errors[error] = [];
}
</script>

<template>
  <div pagetitle="`Diplom`" class="createStudentPage adf">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/diplom-give"
              >{{ $t("archive_Diploma") }}
            </router-link>
            / {{ $t("Manage_Diploma") }}
          </h5>
          <div class="panel-toggles">
            <router-link
              to="/archive/diplom-give"
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
    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <DiplomForm
          :form="formState"
          :errors="errors"
          :is-loading="isLoading"
          @submit="onSubmit"
          @clear-error="clearError"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.createStudentPage.adf {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}

.change-diplom-give-table tr {
  display: grid;
  grid-template-columns: 50% 50%;

  td {
    justify-content: flex-start !important;
  }
}
</style>
