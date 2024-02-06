<template>
  <div>
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-career">
                <th>#</th>
                <th>
                  {{ tableData.name }}
                </th>
                <th>
                  {{ $t("Score") }}
                </th>
                <th>
                  {{ $t("Save") }}
                </th>
              </tr>
            </thead>
            <tbody v-if="tableData.data?.length > 0">
              <tr
                class="table-row-career"
                v-for="(element, index) in tableData.data"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ element.name }}</td>
                <td>
                  <a-input type="number" v-model:value="element.value" />
                </td>
                <td>
                  <button
                    class="btns c-save py-1.5 px-4"
                    @click="updateElelemntValue(element)"
                  >
                    {{ $t("Save") }}
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" class="d-flex flex-column">
                  <h5 class="text-center">{{ $t("No_data") }}</h5>
                  <p class="text-center mb-0">
                    {{ $t("There_is_no_data_that_match_your_query") }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const props = defineProps({
  tableData: null,
  isLoading: null,
});

const { t } = useI18n();
const emits = defineEmits<{
  (e: "openFormModal", value: number): void;
  (e: "onRemove", value: number): void;
  (e: "updateStatus", value: any): void;
  (e: "updateElelemntValue", value: any): void;
}>();

const elemenеValue = ref();

function openFormModal(val?: any) {
  emits("openFormModal", val);
}

function onRemove(val?: any) {
  emits("onRemove", val);
}
function updateStatus(val?: any) {
  emits("updateStatus", val);
}

function updateElelemntValue(val?: any) {
  emits("updateElelemntValue", val);
}
</script>
