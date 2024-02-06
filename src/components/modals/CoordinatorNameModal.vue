<script setup lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import {
  academicGroupListById,
  coordinatorModalByID,
  eduPlanList,
  semesterListById,
  coordinatooGroups,
  coordinatoorNames,
  createCoordinator,
  updateCoordinator,
  deleteCoordinatorById,
} from "@/utils/api/coordinator/list";
import helpers from "@/utils/helper";
interface CoordinatorNameFace {
  edu_plan_id: null | string | number;
  semester_id: null | string | number;
  academic_group_id: null | string | number;
  employee_id: null | string | number;
}
const props = defineProps({
  getId: null,
  coordinatorName: null,
  coordinatorId: null,
});

const notif = useNotyf();
const modal = ref<Element>();
const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const isLoading = ref(false);
const formData = reactive({
  edu_plan_id: null,
  semester_id: null,
  academic_group_id: null,
  academic_group_ids: [],
  employee_id: null,
});
const errors: any = reactive({
  edu_plan_id: [],
  semester_id: [],
  academic_group_id: [],
  employee_id: [],
});
const coordinatorNameModal = ref<HTMLDivElement | null>(null);
const optionsModals: any = reactive({
  eduPlanList: null,
  groupList: null,
  semesterList: null,
  employeeList: null,
});

watchEffect(async () => {
  if (props.getId) {
    const res = await coordinatorModalByID(props.getId);
    Object.assign(formData, res.result);
  }
});
// hooks
onMounted(async () => {
  const modalEl = document.getElementById("coordinatorNameModal") as Element;
  modalEl?.addEventListener("hidden.bs.modal", (event) => {
    clearErrors();
    clearFields();
    emits("close");
  });
  optionsModals.eduPlanList = await eduPlanList().then(
    (res: any) => res.result?.data
  );
  optionsModals.employeeList = await coordinatoorNames().then((res: any) =>
    res.result?.data.map((item: any) => {
      return {
        employee_id: item.coordinator?.id,
        fullname: item.coordinator?.full_name,
      };
    })
  );
  optionsModals.groupList = await coordinatooGroups().then(
    (res) => res.result?.data
  );
});

watch(
  () => formData.edu_plan_id,
  async (newVal) => {
    if (formData.edu_plan_id) {
      optionsModals.semesterList = await semesterListById(
        formData.edu_plan_id
      ).then((res) =>
        res.result?.data.map((item: any) => {
          return {
            id: item.id,
            name: item.semester + `-` + `${t("semestr")}`,
          };
        })
      );
      optionsModals.groupList = await academicGroupListById(
        formData.edu_plan_id
      ).then((res) => res.result?.data);
    }
  }
);

function closeModal() {
  const modal = Modal.getOrCreateInstance("#coordinatorNameModal");
  modal.hide();
}
async function deleteCoordinator(id: number) {
  let datas: number = id;
  isLoading.value = true;
  try {
    await deleteCoordinatorById(datas);
    notif.success(t("Deleted_successfully"));
    closeModal();
    emits("update:list");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function onSubmit() {
  let datas: any = reactive({});
  if (formData.semester_id) datas.semester_id = formData.semester_id;
  if (formData.employee_id) datas.employee_id = formData.employee_id;
  if (props.coordinatorId && props.coordinatorName)
    datas.employee_id = props.coordinatorId;
  if (formData.academic_group_ids.length > 1)
    datas.academic_group_ids = formData.academic_group_ids;
  if (formData.academic_group_id)
    datas.academic_group_id = formData.academic_group_id;
  try {
    isLoading.value = true;
    clearErrors();
    props.getId
      ? await updateCoordinator(props.getId, datas)
      : await createCoordinator(datas);
    // Object.assign(formData, res);
    props.getId
      ? notif.success(t("Data_stored_successfully"))
      : notif.success(t("success_created"));
    emits("update:list");
    closeModal();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response?.status === 500) {
      notif.error(t("Failed") + ": " + error.response?.data?.message);
    }
  } finally {
    isLoading.value = false;
  }
}
function clearErrors() {
  Object.assign(errors, {
    edu_plan_id: [],
    semester_id: [],
    academic_group_id: [],
    employee_id: [],
  });
}

function clearFields() {
  Object.assign(formData, {
    edu_plan_id: null,
    semester_id: null,
    academic_group_id: null,
    employee_id: null,
  });
}
</script>

<template>
  <div
    id="coordinatorNameModal"
    class="modal fade selectionSubject"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("Coordinator") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <a-form autocomplete="" @submit.prevent="onSubmit">
            <div class="row">
              <div class="mb-3">
                <a-select
                  v-model:value="formData.edu_plan_id"
                  :options="optionsModals?.eduPlanList"
                  :field-names="{ value: 'id', label: 'name' }"
                  :placeholder="t('Choose_Curriculum')"
                >
                </a-select>
                <span v-if="errors.edu_plan_id" class="text-danger small">
                  {{ errors.edu_plan_id[0] }}
                </span>
              </div>
              <div class="mb-3 height-auto">
                <template v-if="props.getId">
                  <a-select
                    v-model:value="formData.academic_group_id"
                    :options="optionsModals.groupList"
                    :disabled="!optionsModals.groupList"
                    :field-names="{ value: 'id', label: 'name' }"
                    style="width: 200px"
                    :placeholder="t('Select_Groups')"
                  >
                  </a-select>
                  <span
                    v-if="errors.academic_group_id"
                    class="text-danger small"
                  >
                    {{ errors.academic_group_id[0] }}
                  </span>
                </template>
                <template v-else>
                  <a-space direction="vertical">
                    <a-select
                      required
                      v-model:value="formData.academic_group_ids"
                      mode="multiple"
                      :disabled="!optionsModals.groupList"
                      :options="optionsModals.groupList"
                      :field-names="{ value: 'id', label: 'name' }"
                      style="width: 200px"
                      :placeholder="t('Select_Groups')"
                    >
                    </a-select>
                    <span
                      v-if="errors.academic_group_ids"
                      class="text-danger small"
                    >
                      {{ errors.academic_group_ids[0] }}
                    </span>
                  </a-space>
                </template>
              </div>
              <div class="mb-3">
                <template v-if="props.getId">
                  <a-select
                    v-model:value="formData.semester_id"
                    :options="optionsModals?.semesterList"
                    :disabled="
                      !formData.academic_group_id || !formData.edu_plan_id
                    "
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="t('Choose_Semester')"
                  >
                  </a-select>
                </template>
                <template v-else>
                  <a-select
                    v-model:value="formData.semester_id"
                    :options="optionsModals?.semesterList"
                    :disabled="
                      !formData.academic_group_ids.length ||
                      !formData.edu_plan_id
                    "
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="t('Choose_Semester')"
                  >
                  </a-select>
                </template>
                <span v-if="errors.semester_id" class="text-danger small">
                  {{ errors.semester_id[0] }}
                </span>
              </div>
              <div class="mb-3">
                <template v-if="props.getId">
                  <a-select
                    v-model:value="formData.employee_id"
                    :options="optionsModals?.employeeList"
                    :field-names="{ value: 'employee_id', label: 'fullname' }"
                    :placeholder="t('Choose_a_coordinator')"
                    disabled
                  >
                  </a-select>
                </template>
                <template v-else>
                  <a-select
                    :value="props.coordinatorName"
                    :placeholder="t('Choose_a_coordinator')"
                    disabled
                  >
                  </a-select>
                </template>

                <span v-if="errors.employee_id" class="text-danger small">
                  {{ errors.employee_id[0] }}
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-between">
              <button
                @click="closeModal()"
                type="button"
                class="btns c-cancel me-1"
              >
                <i class="mdi mdi-close font-size-14 align-middle me-1"></i
                >{{ $t("Close") }}
              </button>
              <div>
                <template v-if="props.getId">
                  <button
                    @click="deleteCoordinator(props.getId)"
                    type="button"
                    class="btns c-delet me-1"
                  >
                    <i class="mdi mdi-delete font-size-14 align-middle me-1"></i
                    >{{ $t("Delete") }}
                  </button>
                </template>
                <template v-if="props.getId">
                  <button
                    class="btns c-save"
                    type="submit"
                    :disabled="
                      !formData.academic_group_id ||
                      !formData.edu_plan_id ||
                      !formData.employee_id ||
                      !formData.semester_id
                    "
                  >
                    <i
                      class="mdi mdi-content-save font-size-14 align-middle me-1"
                    ></i>
                    {{ $t("Save") }}
                  </button>
                </template>
                <template v-else>
                  <button
                    class="btns c-save"
                    type="submit"
                    :disabled="
                      !formData.academic_group_ids.length ||
                      !formData.edu_plan_id ||
                      !formData.semester_id
                    "
                  >
                    <i
                      class="mdi mdi-content-save font-size-14 align-middle me-1"
                    ></i>
                    {{ $t("Save") }}
                  </button>
                </template>
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
input[type="checkbox"]:disabled,
button:disabled {
  cursor: not-allowed;
  pointer-events: all;
  background-color: #cfd5db;
  color: #555;
  &:hover {
    background-color: #cfd5db;
    color: #555;
  }
}
.c-delet:hover {
  background-color: #f35656;
  box-shadow: rgba(0, 0, 0) 0px 0px 0px;
}
</style>
