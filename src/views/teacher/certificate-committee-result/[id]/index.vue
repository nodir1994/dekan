<template>
  <div pagetitle="'DAK yaratish'" class="dak-id-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("certificate_Committee") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link to="/teacher/certificate-committee-result"
                ><button class="btns black-c py-1.5 px-4" type="submit">
                  <i
                    class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                  ></i
                  >{{ $t("Prev") }}
                </button></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <DakForm
          :form-state="formState"
          :errors="errors"
          :is-loading="isLoading"
          @clear-error="clearError"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { updateDak, fetchDakById } from "@/utils/api/controls/result-dak";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import router from "@/router";
import { useRoute } from "vue-router";
const props: any = defineProps<{
  datas: any;
}>();
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const route = useRoute();

const formState = reactive({
  dak_id: null,
  student_id: null,
  dak_order: null,
  date: null,
  theme_id: null,
  subject_id: null,
  ball: null,
  mark: null,
  academic_group_id: null,
  academic_year_id: null,
  edu_type_id: null,
  specialty_id: null,
  department_id: null,
  // old_educational_name: {
  //   uz: "",
  //   ru: "",
  //   en: "",
  // },
});

const errors: any = reactive({
  dak_id: [],
  student_id: [],
  dak_order: [],
  date: [],
  theme_id: [],
  subject_id: [],
  ball: [],
  mark: [],
  academic_group_id: [],
  academic_year_id: [],
  edu_type_id: [],
  specialty_id: [],
  department_id: [],
  // academic_group_id: [],
  // academic_year_id: [],
  // ["old_educational_name.uz"]: [],
});

const paramsID: any = route.params?.id ?? null;

await fetchData();

async function fetchData() {
  const res = await fetchDakById(paramsID);
  // console.log(res)
  Object.assign(formState, res);
}
async function onSubmit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const res = await updateDak(paramsID, formState);
    notif.success(t("updated_successfully"));
    // router.back();
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

<style lang="scss">
.createStudentPage.adf {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
</style>
