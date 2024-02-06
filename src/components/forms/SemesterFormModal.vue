<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import {
  createSemester,
  fetchSemesterById,
  updateSemester,
} from "@/utils/api/edu/semester";
import { eduPlanList, academicYearsList } from "@/utils/api/reference/index";

const props = defineProps({
  semesterId: null,
});

const optionsCurriculum = ref([]);
const optionsAcademicYear = ref([]);

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const formData = reactive({
  semester: null,
  edu_plan_id: null,
  course: null,
  date_start: null,
  date_end: null,
  academic_year_id: null,
});

const errors = reactive({
  semester: [],
  edu_plan_id: [],
  course: [],
  date_start: [],
  date_end: [],
  academic_year_id: [],
});

const modal = ref<Element>();

onMounted(async () => {
  const modalEl = document.getElementById("semesterFormModal") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearFields();
    clearErrors();
    emits("close");
  });
  optionsCurriculum.value = await eduPlanList().then((res) => res.result);
  optionsAcademicYear.value = await academicYearsList().then(
    (res) => res.result
  );
});

watchEffect(async () => {
  if (props.semesterId) {
    const res = await fetchSemesterById(props.semesterId);
    res.data.edu_plan_id = res?.data?.edu_plan?.id;
    res.data.academic_year_id = res?.data?.academic_year?.id;
    Object.assign(formData, res.data);
  }
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.semesterId
      ? await updateSemester(props.semesterId, formData)
      : await createSemester(formData);

    props.semesterId
      ? notif.success(t("Semester_name_updated_successfully"))
      : notif.success(t("Semester_name_created_successfully"));
    emits("update:list");
    closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response.status == 422) {
      // notif.error(
      //   t("Dashboard_Error") + ": " + t("Fill_in_the_required_fields")
      // );
    } else {
      notif.error(t("Dashboard_Error") + ": " + error.message);
    }
  } finally {
    isLoading.value = false;
  }
}

function clearFields() {
  Object.assign(formData, {
    semester: null,
    edu_plan_id: null,
    course: null,
    date_start: null,
    date_end: null,
    academic_year_id: null,
  });
}

function clearErrors() {
  Object.assign(errors, {
    semester: [],
    edu_plan_id: [],
    course: [],
    date_start: [],
    date_end: [],
    academic_year_id: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#semesterFormModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>

<template>
  <!-------START ADD MODAL--------------------------------------->
  <div
    id="semesterFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 v-if="props.semesterId" class="modal-title" id="myModalLabel">
            {{ $t("Edit_Resource") }}
          </h5>
          <h5 v-else class="modal-title" id="myModalLabel">
            {{ $t("Create_Semester") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("Semester_Name")
              }}</label>
              <a-select
                v-model:value="formData.semester"
                :placeholder="$t('Choose_Semester')"
                @change="clearError('semester')"
              >
                <a-select-option :value="1" label="1-semester"
                  >1-{{ $t("semester_number") }}</a-select-option
                >
                <a-select-option :value="2" label="2-semester"
                  >2-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="3" label="3-semester"
                  >3-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="4" label="4-semester"
                  >4-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="5" label="5-semester"
                  >5-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="6" label="6-semester"
                  >6-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="7" label="7-semester"
                  >7-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="8" label="8-semester"
                  >8-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="9" label="9-semester"
                  >9-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="10" label="10-semester"
                  >10-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="11" label="11-semester"
                  >11-{{ $t("semester_number") }}</a-select-option
                ><a-select-option :value="12" label="12-semester"
                  >12-{{ $t("semester_number") }}</a-select-option
                >
              </a-select>
              <span v-if="errors.semester" class="text-danger small">
                {{ errors.semester[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("by_Level")
              }}</label>
              <a-select
                v-model:value="formData.course"
                :placeholder="$t('Choose_Level')"
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
              <span v-if="errors.course" class="text-danger small">
                {{ errors.course[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("Education_Year_Name")
              }}</label>
              <a-select
                v-model:value="formData.academic_year_id"
                :options="optionsAcademicYear.data"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="$t('Choose_Education_Year')"
                @change="clearError('academic_year_id')"
              >
              </a-select>
              <span v-if="errors.academic_year_id" class="text-danger small">
                {{ errors.academic_year_id[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("Curriculum")
              }}</label>
              <a-select
                v-model:value="formData.edu_plan_id"
                :options="optionsCurriculum.data"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="$t('Select_Curriculum')"
                @change="clearError('edu_plan_id')"
              >
              </a-select>
              <span v-if="errors.edu_plan_id" class="text-danger small">
                {{ errors.edu_plan_id[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label for="division-name-input" class="form-label">{{
                $t("Choice_Start_Date")
              }}</label>
              <a-date-picker
                v-model:value="formData.date_start"
                value-format="YYYY-MM-DD"
                @change="('date_start')"
                :placeholder="$t('Enter_date')"
              />
              <span v-if="errors.date_start" class="text-danger small">
                {{ errors.date_start[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="division-name-input" class="form-label">{{
                $t("End_date")
              }}</label>
              <a-date-picker
                v-model:value="formData.date_end"
                value-format="YYYY-MM-DD"
                @change="('date_end')"
                :placeholder="$t('Enter_date')"
              />
              <span v-if="errors.date_end" class="text-danger small">
                {{ errors.date_end[0] }}
              </span>
            </div>

            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btns c-cancel me-1"
                data-bs-dismiss="modal"
              >
                <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                {{ $t("Close") }}
              </button>
              <button
                type="button"
                class="btns c-clear me-1"
                @click="clearFields"
              >
                <i class="mdi mdi-cancel font-size-14 align-middle me-1"></i>
                {{ $t("Clear") }}
              </button>
              <SubmitButton :loading="isLoading" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-----END ADD MODAL---------------------------------------->
</template>
