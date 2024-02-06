<script setup lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";
import { reportByTeacherID } from "@/utils/api/report/teacher-map/index";
interface ByStatisticalTeacherMapFace {
  employee: string;
  subject: string;
  type: string | number;
  academic_group: string | number;
  pair: string | number;
}
const props: any = defineProps<{
  data: any;
}>();
// console.log(props.data);

const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const isLoading = ref(false);

const formData = ref<ByStatisticalTeacherMapFace[]>([]);

const errors = reactive({
  name: [],
  code: [],
  department_id: [],
});
const modal = ref<Element>();
const ByStatisticalTeacherMapModal = ref<HTMLDivElement | null>(null);

// hooks
onMounted(() => {
  ByStatisticalTeacherMapModal.value?.addEventListener(
    "hidden.bs.modal",
    function (event: Event) {
      emits("close");
    }
  );
});

watch(
  () => props.data,
  async (newVal) => {
    if (newVal) {
      await fetchData();
    }
  },
  { deep: true }
);

function closeModal() {
  const modal = Modal.getOrCreateInstance("#ByStatisticalTeacherMapModal");
  modal.hide();
}

async function fetchData() {
  try {
    isLoading.value = true;
    const res = await reportByTeacherID(props.data);
    formData.value = res.result;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <div
      id="ByStatisticalTeacherMapModal"
      ref="ByStatisticalTeacherMapModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <LoadingOverlay v-if="isLoading" />
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ formData[0]?.employee }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-modal w-100 d-grid">
                    <th>
                      <strong>{{ $t("student_Sciences") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("employee") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Group") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Couple") }}</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-modal w-100 d-grid"
                    v-for="(element, index) in formData"
                    :key="index"
                  >
                    <td>
                      {{ element?.subject }} <br />
                      {{ element?.type }}
                    </td>
                    <td>{{ element?.employee }}</td>
                    <td>{{ element?.academic_group }}</td>
                    <td>{{ element?.pair }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
