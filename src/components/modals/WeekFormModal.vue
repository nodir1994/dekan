<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import { fetchWeekById, updateWeek } from "@/utils/api/edu/week";
import {
  semesterListById,
  weekTypeList,
} from "@/utils/api/reference/index";

const props = defineProps({
  weekId: null,
  curriculumId: null,
});

const optionsWeekType = ref([]);
const optionsSemester = ref([]);

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const formData = reactive({
  date_start: "",
  date_end: "",
  type_id: null,
  semester_id: null,
});

const errors = reactive({
  date_start: [],
  date_end: [],
  type_id: [],
  semester_id: [],
});

const modal = ref<Element>();

onMounted(async () => {
  const modalEl = document.getElementById("weekFormModal") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearFields();
    clearErrors();
    emits("close");
  });
  optionsWeekType.value = await weekTypeList().then((res) => res.result);
  let res = await semesterListById(props.curriculumId);
  optionsSemester.value = res?.result?.data.map((item) => {
    return {
      id: item.id,
      name:
        item.semester +
        "-" +
        t("semester") +
        " / " +
        item.course +
        "-" +
        t("course_number"),
    };
  });
});

watchEffect(async () => {
  if (props.weekId) {
    const res = await fetchWeekById(props.weekId);
    res.result.type_id = res?.result?.type?.id
    res.result.semester_id = res?.result?.semester?.id
    Object.assign(formData, res.result);
  }
});

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = await updateWeek(props.weekId, {
      date_start: formData.date_start,
      date_end: formData.date_end,
      type_id: formData.type_id,
      semester_id: formData.semester_id,
    });
    notif.success(t("Item_code_edited_to_Curriculum_Week"));
    emits("update:list");
    closeModal();
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

function clearFields() {
  Object.assign(formData, {
    date_start: "",
    date_end: "",
    type_id: null,
    semester_id: null,
  });
}

function clearErrors() {
  Object.assign(errors, {
    date_start: [],
    date_end: [],
    type_id: [],
    semester_id: [],
  });
}

function closeModal() {
  const modal = Modal.getOrCreateInstance("#weekFormModal");
  modal.hide();
}

function clearError(field: string) {
  errors[field] = "";
}
</script>

<template>
  <!-------START ADD MODAL--------------------------------------->
  <div
    id="weekFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("Week_update") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="division-name-input" class="form-label"
                >Boshlanish sanasi</label
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
            <div class="mb-3">
              <label for="division-name-input" class="form-label"
                >Tugash sanasi</label
              >
              <a-date-picker
                placeholder="YYYY-MM-DD"
                v-model:value="formData.date_end"
                type="date"
                value-format="YYYY-MM-DD"
                @change="clearError('date_end')"
              />
              <span v-if="errors.date_end" class="text-danger small">
                {{ errors.date_end[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="division-name-select" class="form-label"
                >Semestr</label
              >
              <a-select
                v-model:value="formData.semester_id"
                show-search
                :options="optionsSemester"
                :field-names="{ value: 'id', label: 'name' }"
                @change="clearError('semester_id')"
                placeholder="Semestrni tanlang"
              >
              </a-select>
              <span v-if="errors.semester_id" class="text-danger small">
                {{ errors.semester_id[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="division-name-select" class="form-label"
                >Xafta turi</label
              >
              <a-select
                v-model:value="formData.type_id"
                show-search
                :options="optionsWeekType"
                :field-names="{ value: 'id', label: 'name' }"
                @change="clearError('type_id')"
                placeholder="Xafta turini tanlang"
              >
              </a-select>
              <span v-if="errors.type_id" class="text-danger small">
                {{ errors.type_id[0] }}
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
