<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import {
  govList,
  fetchStudentSpecialById,
  updateSpecialById,
  createSpeciality,
} from "@/utils/api/student-special/fetch";
import { educationList, specialGovTypeList } from "@/utils/api/reference";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const props = defineProps({
  specialId: null,
});

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const educationTypeOptions = ref([]);
const govOptions = ref([]);
const specialTypeOptions = ref([]);

const formData = reactive({
  faculty_id: null,
  edu_type_id: null,
  gov_specialty_id: null,
  type_id: null,
});

const errors: any = reactive({
  edu_type_id: [],
  gov_specialty_id: [],
  type_id: [],
});

onMounted(async () => {
  const modalEl = document.getElementById("createSpecialityModal") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearErrors();
    clearFields();
    emits("close");
  });

  formData.faculty_id = userStore?.user?.faculty?.id;
  educationTypeOptions.value = await educationList().then((res) => res.result);
  specialTypeOptions.value = await specialGovTypeList().then(
    (res) => res.result
  );
});

watchEffect(async () => {
  if (props.specialId) {
    const res = await fetchStudentSpecialById(props.specialId);
    Object.assign(formData, res.result);
  }
});

watch(
  () => formData.edu_type_id,
  async (newVal) => {
    if (formData.edu_type_id) {
      govOptions.value = await govList(formData.edu_type_id).then((res) =>
        res.result.map((item: any) => {
          return {
            id: item.id,
            name: item.name + "-" + `(${item.code})`,
          };
        })
      );
      if (!govOptions.value.length) formData.gov_specialty_id = null;
    }
  }
);

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.specialId
      ? await updateSpecialById(props.specialId, formData)
      : await createSpeciality(formData);
    // Object.assign(formData, res);

    notif.success(t("Data_stored_successfully"));
    emits("update:list");
    closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

function clearFields() {
  Object.assign(formData, {
    edu_type_id: null,
    gov_specialty_id: null,
    type_id: null,
  });
}

function clearErrors() {
  Object.assign(errors, {
    edu_type_id: [],
    gov_specialty_id: [],
    type_id: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#createSpecialityModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>
<template>
  <!-------START ADD MODAL--------------------------------------->
  <div id="createSpecialityModal" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("Student_Special") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Structure_Faculty")
                }}</label>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </div>
              <div class="mb-3" name="optionsEducationType">
                <label for="division-name-select" class="form-label">{{
                  $t("Education_Type")
                }}</label>
                <a-select v-model:value="formData.edu_type_id" :filter-option="helpers.filterOptionByName" show-search
                  :field-names="{ value: 'id', label: 'name' }" :options="educationTypeOptions"
                  :placeholder="t('Choose_Education_Type')">
                </a-select>
                <span v-if="errors.edu_type_id" class="text-danger small">
                  {{ errors.edu_type_id[0] }}
                </span>
              </div>
              <div class="mb-3" name="nameSpecial">
                <label for="division-name-select" class="form-label">{{
                  $t("by_Specialty")
                }}</label>

                <a-select v-model:value="formData.gov_specialty_id" :options="govOptions"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  :placeholder="t('select__specialty')" :disabled="!formData.edu_type_id">
                </a-select>
                <span v-if="errors.gov_specialty_id" class="text-danger small">
                  {{ errors.gov_specialty_id[0] }}
                </span>
              </div>
              <div class="mb-3" name="paymentForm">
                <label for="division-name-select" class="form-label">{{
                  $t("Publication_Property_Type")
                }}</label>
                <a-select v-model:value="formData.type_id" :options="specialTypeOptions"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  :placeholder="t('choose__type')">
                </a-select>
                <span v-if="errors.type_id" class="text-danger small">
                  {{ errors.type_id[0] }}
                </span>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btns c-cancel me-1" data-bs-dismiss="modal">
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close") }}
                </button>
                <button class="btns c-save" type="submit" :disabled="
                  !formData.gov_specialty_id ||
                  !formData.type_id ||
                  !formData.edu_type_id
                ">
                  <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
                  {{ $t("Save") }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-----END ADD MODAL---------------------------------------->
</template>
