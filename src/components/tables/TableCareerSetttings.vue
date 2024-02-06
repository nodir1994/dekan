<template>
  <div>
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div class="table-responsive" v-if="tableData?.length > 0">
          <table class="content-table">
            <thead>
              <tr class="table-career">
                <th>#</th>
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("Type") }}</th>
                <th>{{ $t("Status") }}</th>
                <th>{{ $t("Actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-career"
                v-for="(item, index) in tableData"
                :key="index"
              >
                <td>
                  {{ index + 1 }}
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.reward_type?.name }}</td>
                <td>
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="form-check form-switch my-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :checked="item.status"
                          @click="updateStatus(item)"
                        />
                      </div>
                    </li>
                  </ul>
                </td>
                <td>
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" @click="openFormModal(item.id)">
                          <i
                            class="mdi mdi-pencil font-size-18 text-primary"
                          ></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" @click="onRemove(item.id)">
                          <i
                            class="mdi mdi-delete font-size-18 text-danger"
                          ></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-responsive" v-else>
          <NoData />
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="tableData">
      {{ $t("Total_Point") }}: {{ tableData.length }}</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  tableData: null,
  isLoading: null,
});

const emits = defineEmits<{
  (e: "openFormModal", value: number): void;
  (e: "onRemove", value: number): void;
  (e: "updateStatus", value: any): void;
}>();

function openFormModal(val?: any) {
  emits("openFormModal", val);
}

function onRemove(val?: any) {
  emits("onRemove", val);
}
function updateStatus(val?: any) {
  emits("updateStatus", val);
}
</script>
