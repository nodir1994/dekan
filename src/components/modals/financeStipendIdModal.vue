<script setup lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import {
  createFinance,
  fetchFinanceById,
  updateFinanceById,
} from "@/utils/api/finance/stipend";

const props = defineProps({
  scholarId: null,
  stipentId: null,
});

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const formData: any = reactive({
  summa: null,
  date: null,
  id: null,
  awarding_scholarship_id: props.scholarId,
});

const errors: any = reactive({
  summa: [],
  data: [],
  id: [],
  awarding_scholarship_id: [],
});

const modal = ref<Element>();

onMounted(async () => {
  const modalEl = document.getElementById("financeStipendIdModal") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearFields();
    clearErrors();
    emits("close");
  });
});

watchEffect(async () => {
  isLoading.value = true;
  if (props.stipentId) {
    const res = await fetchFinanceById(props.stipentId);
    Object.assign(formData, res.result);
  }
  console.log(props.scholarId);
  isLoading.value = false;
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.stipentId
      ? await updateFinanceById(props.stipentId, formData)
      : await createFinance(formData);
    //Object.assign(formData, res);
    props.stipentId
      ? notif.success(t("Data_stored_successfully"))
      : notif.success(t("success_created"));
    emits("update:list");
    closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response.status == 422) {
      notif.error(
        t("Dashboard_Error") + ": " + t("Fill_in_the_required_fields")
      );
    } else {
      notif.error(t("Dashboard_Error") + ": " + error.response.status);
    }
  } finally {
    isLoading.value = false;
  }
}

function clearFields() {
  Object.assign(formData, {
    summa: null,
    date: null,
    id: null,
    awarding_scholarship_id: props.scholarId,
  });
}

function clearErrors() {
  Object.assign(errors, {
    summa: [],
    date: [],
    id: [],
    awarding_scholarship_id: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#financeStipendIdModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>

<template>
  <div
    id="financeStipendIdModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 v-if="props.stipentId" class="modal-title" id="myModalLabel">
            {{ $t("Edit_Resource") }}
          </h5>
          <h5 v-else class="modal-title" id="myModalLabel">
            {{ $t("Stipend_assignment") }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <LoadingOverlay v-if="isLoading" />
          <form @submit.prevent="onSubmit">
            <div class="row">
              <div class="mb-3">
                <label for="division-name-input" class="form-label">{{
                  $t("apply_Date")
                }}</label>

                <a-date-picker
                  placeholder="YYYY-MM-DD"
                  type="date"
                  v-model:value="formData.date"
                  value-format="YYYY-MM-DD"
                  @change="clearError('date')"
                />
                <span v-if="errors.date" class="text-danger small">
                  {{ errors.date[0] }}
                </span>
              </div>
            </div>
            <div class="mb-3">
              <label for="division-name-input" class="form-label">{{
                $t("Enter_the_amount")
              }}</label>
              <a-input
                v-model:value="formData.summa"
                @change="clearError('summa')"
                :placeholder="$t('Enter')"
              />
              <span v-if="errors.summa" class="text-danger small">
                {{ errors.summa[0] }}
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
</template>
