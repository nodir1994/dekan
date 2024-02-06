<template>
  <div pagetitle="`Talaba yaratish`" class="create-student-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/student/student">
              {{ $t("Student_Student") }}
            </router-link>
            / {{ $t("Create_Student") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/student/student" class="btns black-c py-1.5 px-4">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Back") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-------------------create semestr------------------------->
    <div class="card">
      <div class="card-body">
        <StudentForm :form-state="formState" :errors="errors" :is-loading="isLoading" @submit="onSubmit"
          @clear-error="clearError" />
      </div>
    </div>
    <!-------------------create semestr------------------------->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { addStudent } from "@/utils/api/students/create";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import router from "@/router";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const formState: any = reactive({
  faculty_id: null,
  specialty_id: null,
  date_start: null,
  payment_type_id: null,
  acceptance_id: null,
  citizenship_id: null,
  passport_issue_date: null,
  pinfl: null,
  passport: "",
  surname: "",
  name: "",
  last_name: "",
  birthdate: null,
  gender: null,
  nation_id: null,
  social_category_id: null,
  student_category_id: null,
  date_end: null,
  old_educational_name: {
    uz: "",
    ru: "",
    en: "",
  },
  document_seria: "",
  document_number: "",
  country_id: null,
  region_id: null,
  now_district_id: null,
  address_home: "",
  live_place_id: null,
  now_region_id: null,
  district_id: null,
  now_address: "",
  count_of_people_living: null,
  category_live_together_id: null,
  residence_place_status: null,
  email: "",
  phone: "",
  phone_father: "",
  phone_person: "",
  student_status_id: null,
  dbt_count: null,
  residence_place_location: "",
  image: "",
});
const errors: any = reactive({
  faculty_id: [],
  specialty_id: [],
  date_start: [],
  payment_type_id: [],
  acceptance_id: [],
  citizenship_id: [],
  passport_issue_date: [],
  pinfl: [],
  passport: [],
  surname: [],
  name: [],
  last_name: [],
  birthdate: [],
  gender: [],
  nation_id: [],
  social_category_id: [],
  student_category_id: [],
  date_end: [],
  ["old_educational_name.uz"]: [],
  document_seria: [],
  document_number: [],
  country_id: [],
  region_id: [],
  now_district_id: [],
  address_home: [],
  live_place_id: [],
  now_region_id: [],
  district_id: [],
  now_address: [],
  count_of_people_living: [],
  category_live_together_id: [],
  residence_place_status: [],
  email: [],
  phone: [],
  phone_father: [],
  phone_person: [],
  student_status_id: [],
  dbt_count: [],
  residence_place_location: [],
  image: [],
});

const formImage = ref<string | File | null>(null);

async function onSubmit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const formData = new FormData();

    Object.getOwnPropertyNames(formState).forEach((prop) => {
      if (!["id", "citizenship", "user_id"].includes(prop) && formState[prop])
        formData.append(prop, formState[prop]);
    });

    formData.append(
      "old_educational_name[uz]",
      formState.old_educational_name.uz
    );
    formData.append(
      "old_educational_name[ru]",
      formState.old_educational_name.ru
    );
    formData.append(
      "old_educational_name[en]",
      formState.old_educational_name.en
    );

    const res = await addStudent(formData);
    notif.success(t("Data_stored_successfully"));
    router.back();
    // router.push(`/employees/base/employee/${res.data.id}`)
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

<style lang="scss">
.create-student-page {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
</style>
