<template>
  <div
    id="advencedTrainingFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("Education_Year_Name") }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Employee")
                  }}</label>
                  <a-select
                    v-model:value="formData.employee_id"
                    :options="optionsEmployee"
                    :field-names="{ value: 'id', label: 'surname' }" 
                    :placeholder="$t('Choose')"
                    @change="clearError('employee_id')"
                  >
                  </a-select>
                  <span v-if="errors.employee_id" class="text-danger small">
                    {{ errors.employee_id[0] }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("by_Post")
                  }}</label>
                  <a-select
                    v-model:value="formData.position_id"
                    :options="optionsPosition.data"
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="$t('Choose')"
                    @change="clearError('position_id')"
                  >
                  </a-select>
                  <span v-if="errors.position_id" class="text-danger small">
                    {{ errors.position_id[0] }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="division-name-input" class="form-label"
                    >{{ $t('Professional_development_theme') }}</label
                  >
                  <a-input
                    v-model:value="formData.topic"
                    @change="clearError('topic')"
                  />
                  <span v-if="errors.topic" class="text-danger small">
                    {{ errors.topic[0] }}
                  </span>
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <label for="division-name-select" class="form-label"
                  >{{ $t('Training_Place') }}</label
                >
                <a-select
                  v-model:value="formData.training_place_id"
                  :options="optionsTrainingPlaces"
                  :field-names="{ value: 'id', label: 'name' }"
                  :placeholder="$t('Choose')"
                  @change="clearError('training_place_id')"
                >
                </a-select>
                <span v-if="errors.training_place_id" class="text-danger small">
                  {{ errors.training_place_id[0] }}
                </span>
              </div>
              <div class="col-md-3 mb-3">
                <label for="division-name-input" class="form-label">{{ $t('year') }}</label>
                <a-input
                  v-model:value="formData.year"
                  @change="clearError('year')"
                  type="number"
                />
                <span v-if="errors.year" class="text-danger small">
                  {{ errors.year[0] }}
                </span>
              </div>
              <div class="col-md-3 mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t('Choice_Start_Date') }}</label
                >
                <a-date-picker
                  placeholder="YYYY-MM-DD"
                  v-model:value="formData.date_start"
                  type="date"
                  value-format="YYYY-MM-DD"
                  @change="clearError('date_start')"
                />
                <span v-if="errors.date_start" class="text-danger small">
                  {{ errors.date_start[0] }}
                </span>
              </div>
              <div class="col-md-3 mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t('End_date') }}</label
                >

                <a-date-picker
                  placeholder="YYYY-MM-DD"
                  type="date"
                  v-model:value="formData.date_end"
                  value-format="YYYY-MM-DD"
                  @change="clearError('date_end')"
                />
                <span v-if="errors.date_end" class="text-danger small">
                  {{ errors.date_end[0] }}
                </span>
              </div>

              <div class="col-md-6 mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t('Professional_development_document') }}</label
                >
                <a-input
                  v-model:value="formData.document"
                  @change="clearError('document')"
                />
                <span v-if="errors.document" class="text-danger small">
                  {{ errors.document[0] }}
                </span>
              </div>
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
              <SubmitButton :loading="isLoading" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import {
  createTraining,
  fetchTrainingById,
  updateTrainingById,
} from "@/utils/api/employee/advenced-training";
import {
  teacherList,
  positionList,
  trainingPlacesList,
} from "@/utils/api/reference/index";

const props = defineProps({
  advencedTrainingId: null,
});

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const optionsEmployee = ref([]);
const optionsPosition = ref([]);
const optionsTrainingPlaces = ref([]);

const formData = reactive({
  employee_id: null,
  position_id: null,
  training_place_id: null,
  topic: null,
  year: null,
  date_start: null,
  date_end: null,
  document: "",
});

const errors = reactive({
  employee_id: [],
  position_id: [],
  training_place_id: [],
  topic: [],
  year: [],
  date_start: [],
  date_end: [],
  document: [],
});

const modal = ref<Element>();

onMounted(async () => {
  const modalEl = document.getElementById(
    "advencedTrainingFormModal"
  ) as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearErrors();
    clearFields()
    emits("close");
  });
  // qualGovTypeListOptions.value = await specialList().then((res) => res.result?.data.map(item => { return { id: item.id, name: item.name } }));
  optionsEmployee.value = await teacherList().then((res) => res.result.data.map(item=>{
    return {
      id: item.employee_id, surname: item.fullname
    }
  }));
  optionsPosition.value = await positionList().then((res) => res.result);
  optionsTrainingPlaces.value = await trainingPlacesList().then(
    (res) => res.result
  );
});

watchEffect(async () => {
  if (props.advencedTrainingId) {
    const res = await fetchTrainingById(props.advencedTrainingId);
    console.log('res', res)
    Object.assign(formData, res.result);
  }
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.advencedTrainingId
      ? await updateTrainingById(props.advencedTrainingId, formData)
      : await createTraining(formData);
    //Object.assign(formData, res);

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
    employee_id: null,
    position_id: null,
    training_place_id: null,
    topic: null,
    year: null,
    date_start: null,
    date_end: null,
    document: null,
  });
}
function clearErrors() {
  Object.assign(errors, {
    employee_id: [],
    position_id: [],
    training_place_id: [],
    topic: [],
    year: [],
    date_start: [],
    date_end: [],
    document: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#advencedTrainingFormModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>
