<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import { useUserStore } from "@/stores/user";
import { dakList } from "@/utils/api/additional";
import { createDakMember, updateDakMember } from "@/utils/api/reference";
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
const optionsDakList = await dakList().then((res) => res.result?.data);
const props = defineProps({
  modalForm: null,
});

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const formData = reactive({
  id: null,
  dak_id: null,
  name: null,
  work_place: null,
  position: null,
  role: null,
});

const errors: any = reactive({
  dak_id: [],
  name: [],
  work_place: [],
  position: [],
  role: [],
});

watch(
  () => props.modalForm,
  (newVal) => {
    Object.assign(formData, props.modalForm);
  },
  { deep: true }
);

const modal = ref<Element>();

onMounted(async () => {
  // if(!props.modalForm?.id){
  //   clearFields();
  // }
  const modalEl = document.getElementById("dakMemberFormModal") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearFields();
    clearErrors();
    emits("close");
  });
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.modalForm?.id
      ? await updateDakMember(props.modalForm?.id, formData)
      : await createDakMember(formData);

    notif.success(t("Data_stored_successfully"));
    emits("update:list");
    closeModal();
  } catch (error: any) {
    console.log(error.response?.data);
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

function clearFields() {
  Object.assign(props.modalForm, {
    id: null,
    dak_id: null,
    name: null,
    work_place: null,
    position: null,
    role: null,
  });
}

function clearErrors() {
  Object.assign(errors, {
    dak_id: [],
    name: [],
    work_place: [],
    position: [],
    role: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#dakMemberFormModal");
  clearFields();
  emits("close");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>

<template>
  <div id="dakMemberFormModal" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("archive_Certificate_Committee_Member") }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("Structure_Faculty")
              }}</label>
              <a-select class="form--item" :value="deanId" disabled> </a-select>
            </div>

            <div class="mb-3">
              <label for="division-name-select" class="form-label">{{
                $t("DAK")
              }}</label>
              <a-select v-model:value="formData.dak_id" :options="optionsDakList"
                :field-names="{ value: 'id', label: 'name' }" style="width: 100%; border-radius: 10px !important">
              </a-select>
              <span v-if="errors.dak_id" class="text-danger small">
                {{ errors.dak_id[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label for="otm-name-input" class="form-label">{{
                $t("Performer")
              }}</label>
              <a-input class="select" tupe="text" v-model:value="formData.name" />
              <span v-if="errors.name" class="text-danger small">
                {{ errors.name[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label for="otm-name-input" class="form-label">{{
                $t("Work_place")
              }}</label>
              <a-input class="select" tupe="text" v-model:value="formData.work_place" />
              <span v-if="errors.work_place" class="text-danger small">
                {{ errors.work_place[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label for="otm-name-input" class="form-label">{{
                $t("by_Post")
              }}</label>
              <a-input class="select" tupe="text" v-model:value="formData.position" />
              <span v-if="errors.position" class="text-danger small">
                {{ errors.position[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label for="otm-name-input" class="form-label">{{
                $t("Role")
              }}</label>
              <a-input class="select" tupe="text" v-model:value="formData.role" />
              <span v-if="errors.role" class="text-danger small">
                {{ errors.role[0] }}
              </span>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btns c-cancel me-1" data-bs-dismiss="modal">
                <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                {{ $t("Close") }}
              </button>
              <button type="button" class="btns c-clear me-1" @click="clearFields">
                <i class="mdi mdi-cancel font-size-14 align-middle me-1"></i>
                {{ $t("Clear") }}
              </button>
              <SubmitButton :loading="isLoading" :icon="'content-save'" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
