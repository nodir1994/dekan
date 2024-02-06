<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import { attachCommandList } from "@/utils/api/status-student/order-list";
import { formatDate } from "@vueuse/core";

const props = defineProps({
  commandId: null,
});
// console.log("asdasdad", props.commandId);
const emits = defineEmits<{
  (e: "update:list"): void;
  (e: "close"): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const modal = ref<Element>();
// jadval bino
const apiData: {
  data: [];
} = reactive({
  data: [],
});

watchEffect(async () => {
  if (props.commandId) {
    isLoading.value = true;
    const res = await attachCommandList(props.commandId);
    // Object.assign(apiData, res.result);
    apiData.data = await res.result;
    isLoading.value = false;
  }
});

function closeModal() {
  const modal = Modal.getOrCreateInstance("#attachCommandsModal");
  modal.hide();
}
</script>

<template>
  <div
    id="attachCommandsModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            {{ $t("Students_attached_to_the_command") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <LoadingOverlay v-if="isLoading" />
          <div v-if="apiData?.data?.length" class="table-responsive">
            <table class="table-vertical">
              <thead>
                <tr class="table-row-import d-grid w-100">
                  <th>#</th>
                  <th>{{ $t("First_Name") }}</th>
                  <th>{{ $t("Semester_Name") }}</th>
                  <th>{{ $t("Group") }}</th>
                  <th>{{ $t("apply_Date") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="table-row-import d-grid w-100"
                  v-for="(element, index) in apiData.data"
                  :key="index"
                >
                  <td>
                    {{ index + 1 }}
                  </td>
                  <td>{{ element?.fullname }}</td>
                  <td>{{ element?.semester }}-{{ $t("semester_number") }}</td>
                  <td>
                    {{ element?.academic_group }}
                  </td>
                  <td>
                    {{
                      formatDate(new Date(element?.updated_at), "YYYY-MM-DD")
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <h5 class="text-center">{{ $t("No_data") }}</h5>
            <p class="text-center mb-0">
              {{ $t("No_information_found") }}
            </p>
          </div>
          <div class="pb-2 mt-2">
            <span class="element-count" v-if="apiData?.data?.length">
              {{ $t("Total_Point") }}: {{ apiData?.data?.length }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-----END ADD MODAL---------------------------------------->
</template>

<style lang="scss" scoped>
.table-row-import {
  grid-template-columns: 50px auto 15% 20% 20%;
  @include mobile() {
    grid-template-columns: 50px 100px 150px 70px 120px 60px;
  }
}
.modal-dialog {
  max-width: $ipad !important;
}
</style>
