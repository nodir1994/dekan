<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import {
  createQualitification,
  updateQualitificationById,
  getQualitificationById,
} from "@/utils/api/students/qualification";
import { specialList } from "@/utils/api/reference";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const props = defineProps({
  qualId: null,
});

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const modal = ref<Element>();

const qualGovTypeListOptions = ref([]);

const formData = reactive({
  name: {
    uz: "",
    ru: "",
    en: "",
  },
  description: {
    uz: "",
    ru: "",
    en: "",
  },
  specialty_id: null,
});

const errors: any = reactive({
  ["name.uz"]: [],
  ["description.uz"]: [],
  specialty_id: "",
});

onMounted(async () => {
  const modalEl = document.getElementById(
    "createQualificationModal"
  ) as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearFields();
    clearErrors();
    emits("close");
  });
  qualGovTypeListOptions.value = await specialList().then((res) =>
    res.result?.data.map((item: any) => {
      return { id: item.id, name: item.name + "-" + `(${item.code})` };
    })
  );
});

watchEffect(async () => {
  if (props.qualId) {
    const res = await getQualitificationById(props.qualId);
    Object.assign(formData, res.result);
  }
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.qualId
      ? await updateQualitificationById(props.qualId, formData)
      : await createQualitification(formData);

    props.qualId
      ? notif.success(t("Data_stored_successfully"))
      : notif.success(t("success_created"));
    emits("update:list");
    closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    // notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

function clearFields() {
  Object.assign(formData, {
    name: {
      uz: "",
      ru: "",
      en: "",
    },
    description: {
      uz: "",
      ru: "",
      en: "",
    },
    specialty_id: null,
  });
}

function clearErrors() {
  isLoading.value = true;
  Object.assign(errors, {
    ["name.uz"]: [],
    ["description.uz"]: [],
    specialty_id: "",
  });
  isLoading.value = false;
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#createQualificationModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>
<template>
  <!-------START ADD MODAL--------------------------------------->
  <div id="createQualificationModal" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("Qualification") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="mb-3" name="special">
                  <label for="division-name-select" class="form-label">{{
                    $t("by_Specialty")
                  }}</label>
                  <a-select :filter-option="helpers.filterOptionByName" v-model:value="formData.specialty_id" show-search
                    :field-names="{ value: 'id', label: 'name' }" :options="qualGovTypeListOptions" allow-clear>
                  </a-select>
                  <span v-if="errors.specialty_id" class="text-danger small">
                    {{ errors.specialty_id[0] }}
                  </span>
                </div>
                <div class="mb-3 col-md-4" name="nameUz">
                  <label for="division-name-input" class="form-label">{{ $t("Name_Uz") }}<sup> ⚬</sup></label>
                  <a-input v-model:value="formData.name.uz" />
                  <span v-if="errors['name.uz']" class="text-danger small">
                    {{ errors["name.uz"][0] }}
                  </span>
                </div>
                <div class="mb-3 col-md-4" name="nameRu">
                  <label for="division-name-input" class="form-label">{{ $t("Name_RU") }}<sup> ⚬</sup></label>
                  <a-input v-model:value="formData.name.ru" />
                  <span v-if="errors['name.ru']" class="text-danger small">
                    {{ errors["name.ru"][0] }}
                  </span>
                </div>
                <div class="mb-3 col-md-4" name="nameEn">
                  <label for="division-name-input" class="form-label">{{ $t("Name_EN") }}<sup> ⚬</sup></label>
                  <a-input v-model:value="formData.name.en" />
                  <span v-if="errors['name.en']" class="text-danger small">
                    {{ errors["name.en"][0] }}
                  </span>
                </div>
                <div class="mb-3 col-md-4" name="textarea__specialUz">
                  <label for="division-name-input" class="form-label">{{ $t("Data") }} (UZ)<sup> ⚬</sup></label>
                  <a-textarea v-model:value="formData.description.uz" placeholder=""
                    :auto-size="{ minRows: 4, maxRows: 5 }" />
                  <span v-if="errors['description.uz']" class="text-danger small">
                    {{ errors["description.uz"][0] }}
                  </span>
                </div>
                <div class="mb-3 col-md-4" name="textarea__specialRu">
                  <label for="division-name-input" class="form-label">{{ $t("Data") }} (RU)<sup> ⚬</sup></label>
                  <a-textarea v-model:value="formData.description.ru" placeholder=""
                    :auto-size="{ minRows: 4, maxRows: 5 }" />
                  <span v-if="errors['description.ru']" class="text-danger small">
                    {{ errors["description.ru"][0] }}
                  </span>
                </div>
                <div class="mb-3 col-md-4" name="textarea__specialEn">
                  <label for="division-name-input" class="form-label">{{ $t("Data") }} (EN)<sup> ⚬</sup></label>
                  <a-textarea v-model:value="formData.description.en" placeholder=""
                    :auto-size="{ minRows: 4, maxRows: 5 }" />
                  <span v-if="errors['description.en']" class="text-danger small">
                    {{ errors["description.en"][0] }}
                  </span>
                </div>
              </div>
              <!-- -------------------------------------------------- -->
              <div class="d-flex justify-content-end">
                <button data-bs-dismiss="modal" class="btns c-delete me-1" @click="closeModal" type="button">
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>{{ $t("Close") }}
                </button>
                <button type="submit" class="btns c-save">
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
