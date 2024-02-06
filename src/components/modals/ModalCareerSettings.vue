<template>
  <div
    id="modalCareerSettings"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <LoadingOverlay v-if="isLoading" />
        <div class="modal-header bg-card-header">
          <h5 v-if="elementId" class="modal-title" id="myModalLabel">
            {{ $t("editing_scale") }}
          </h5>
          <h5 v-else class="modal-title" id="myModalLabel">
            {{ $t("add_scale") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <a-form @submit.prevent="onSubmit">
            <!-- turi -->
            <a-form-item class="mb-3" name="nameFaculty">
              <label for="division-name-input" class="form-label">{{
                $t("Type")
              }}</label>
              <SelectCareerType
                v-model:value="formData.reward_type_id"
                @change="clearError('reward_type_id')"
              />
              <span v-if="errors.reward_type_id" class="text-danger small">
                {{ errors.reward_type_id[0] }}
              </span>
            </a-form-item>

            <!-- nomi -->
            <a-form-item class="mb-3" name="nameFaculty">
              <label for="division-name-input" class="form-label">{{
                $t("Name")
              }}</label>
              <a-input
                v-model:value="formData.name"
                :placeholder="$t('Enter')"
                @change="clearError('name')"
              />
              <span v-if="errors.name" class="text-danger small">
                {{ errors.name[0] }}
              </span>
            </a-form-item>

            <!-- holati -->
            <a-form-item class="mb-3" name="nameFaculty">
              <label for="division-name-input" class="form-label">{{
                $t("Status")
              }}</label>
              <SelectElementStatus
                v-model:value="formData.status"
                @change="clearError('status')"
              />
              <span v-if="errors.status" class="text-danger small">
                {{ errors.status[0] }}
              </span>
            </a-form-item>

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
          </a-form>
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
import { created, getById, update } from "@/utils/api/careers";
// components
import SelectCareerType from "../selects/SelectCareerType.vue";
import SelectElementStatus from "../selects/SelectElementStatus.vue";

const props = defineProps({
  elementId: null,
});

const emits = defineEmits<{
  (e: "updateList"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const optionsEmployee = ref([]);
const optionsPosition = ref([]);
const optionsTrainingPlaces = ref([]);

const formData = reactive({
  name: null,
  status: null,
  reward_type_id: null,
});

const errors = reactive({
  name: [],
  status: [],
  reward_type_id: [],
});

const modal = ref<Element>();

onMounted(async () => {
  const modalEl = document.getElementById("modalCareerSettings") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearErrors();
    clearFields();
    emits("close");
  });
});

watchEffect(async () => {
  if (props.elementId) {
    console.log("salom");

    isLoading.value = true;
    const res = await getById(props.elementId);
    Object.assign(formData, res.result);
    formData.status = res.result?.status;
    formData.name = res.result?.name;
    formData.reward_type_id = res.result?.reward_type?.id;
    isLoading.value = false;
  }
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.elementId
      ? await update(props.elementId, { _method: "PUT", ...formData })
      : await created(formData);
    notif.success(t("Data_stored_successfully"));
    emits("updateList");
    closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response.status == 422) {
      notif.error(
        t("Dashboard_Error") + ": " + t("Fill_in_the_required_fields")
      );
    } else notif.error(error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}
function clearFields() {
  Object.assign(formData, {
    name: null,
    status: null,
    reward_type_id: null,
  });
}
function clearErrors() {
  Object.assign(errors, {
    name: [],
    status: [],
    reward_type_id: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#modalCareerSettings");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>
