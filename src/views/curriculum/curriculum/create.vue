<template>
  <div pagetitle="`O'quv reja yaratish`" class="curriculumEditPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/curriculum">
              {{ $t("Curriculum") }}</router-link
            >
            / {{ $t("Create_curriculum") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/curriculum"
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------------------create semestr------------------------->
    <div class="card">
      <div class="card-body">
        <CurriculumForm
          :form-state="formState"
          :errors="errors"
          :is-loading="isLoading"
          @submit="onSubmit"
          @clear-error="clearError"
        />
      </div>
    </div>
    <!-------------------create semestr------------------------->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { createPlan } from "@/utils/api/edu/plan";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import router from "@/router";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const formState: any = reactive({
  name: "",
  faculty_id: null,
  specialty_id: null,
  qualification_id: null,
  academic_year_id: null,
  edu_form_id: null,
  rating_system_id: null,
  term: null,
  count_semester: null,
  autumn_start: null,
  autumn_end: null,
  spring_start: null,
  spring_end: null,
});
const errors: any = reactive({
  name: [],
  faculty_id: [],
  specialty_id: [],
  qualification_id: [],
  academic_year_id: [],
  edu_form_id: [],
  rating_system_id: [],
  term: [],
  count_semester: [],
  autumn_start: [],
  autumn_end: [],
  spring_start: [],
  spring_end: [],
  asfasf: [],
});

async function onSubmit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const formData = new FormData();

    Object.getOwnPropertyNames(formState).forEach((prop) => {
      if (!["id", "citizenship", "user_id"].includes(prop) && formState[prop])
        formData.append(prop, formState[prop]);
    });

    // if (formImage.value && typeof formImage.value !== "string")
    //   formData.append("image", formImage.value);

    const res = await createPlan(formData);
    notif.success(t("Curriculum_name_created_successfully"));
    router.back();
    // router.push(`/employees/base/employee/${res.data.id}`)
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response.status == 422) {
      notif.error(
        t("Dashboard_Error") + ": " + t("Fill_in_the_required_fields")
      );
    } else {
      notif.error(t("Dashboard_Error") + ": " + error.message);
    }
  } finally {
    isLoading.value = false;
  }
}

function clearError(error: string) {
  errors[error] = [];
}
</script>

<style lang="scss"></style>
