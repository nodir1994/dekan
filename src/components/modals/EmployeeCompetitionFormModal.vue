<template>
  <div
    id="employeeCompetitionFormModal"
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
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="$t('Choose')"
                    @change="clearError('employee_id')"
                  >
                  </a-select>
                  <!-- {{ optionsEmployee }} -->
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
              <div class="col-md-4 mb-3">
                <label for="division-name-input" class="form-label">{{
                  $t("Competition_date")
                }}</label>
                <a-date-picker
                  placeholder="YYYY-MM-DD"
                  v-model:value="formData.date"
                  type="date"
                  value-format="YYYY-MM-DD"
                  @change="clearError('date')"
                />
                <span v-if="errors.date" class="text-danger small">
                  {{ errors.date[0] }}
                </span>
              </div>

              <div class="col-md-8 mb-3">
                <label for="division-name-input" class="form-label">{{
                  $t("Competition_document")
                }}</label>
                <a-input
                  v-model:value="formData.contract"
                  @change="clearError('contract')"
                />
                <span v-if="errors.contract" class="text-danger small">
                  {{ errors.contract[0] }}
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
              <!-- <button
                type="button"
                class="btns c-clear me-1"
                @click="clearFields"
              >
                <i class="mdi mdi-cancel font-size-14 align-middle me-1"></i>
                {{ $t("Clear") }}
              </button> -->
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
  createEmployeeCompetition,
  fetchEmployeeCompetitionById,
  updateEmployeeCompetitionById,
} from "@/utils/api/employee/employee-competition";
import {
  employeeList,
  positionList,
  trainingPlacesList,
} from "@/utils/api/reference/index";

const props = defineProps({
  employeeCompetitionId: null,
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
  date: "",
  contract: "",
});

const errors = reactive({
  employee_id: [],
  position_id: [],
  date: [],
  contract: [],
});

const modal = ref<Element>();

onMounted(async () => {
  const modalEl = document.getElementById(
    "employeeCompetitionFormModal"
  ) as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearFields();
    clearErrors();
    emits("close");
  });
  optionsEmployee.value = await employeeList().then((res) => res.result.data.map(item=>{
    return {
      id: item.id, name: item.name + ' ' + item.surname
    }
  }));
  optionsPosition.value = await positionList().then((res) => res.result);
  optionsTrainingPlaces.value = await trainingPlacesList().then(
    (res) => res.result
  );
});

watchEffect(async () => {
  if (props.employeeCompetitionId) {
    const res = await fetchEmployeeCompetitionById(props.employeeCompetitionId);
    Object.assign(formData, res.result);
  }
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.employeeCompetitionId
      ? await updateEmployeeCompetitionById(
          props.employeeCompetitionId,
          formData
        )
      : await createEmployeeCompetition(formData);
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
    date: "",
    contract: "",
  });
}

function clearErrors() {
  Object.assign(errors, {
    employee_id: [],
    position_id: [],
    date: [],
    contract: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#employeeCompetitionFormModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>
