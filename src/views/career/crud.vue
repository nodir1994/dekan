<template>
  <div pagetitle="'Kordinator'" class="crud_career">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("settings") }}</h5>
          <div class="panel-toggles">
            <a
              class="btns c-save py-1.5 px-4 me-3"
              data-bs-toggle="modal"
              @click="openModal(null)"
              data-bs-target="#myModalMessasge"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
              >{{ $t("add") }}
            </a>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- filter -->
    <FilterCareerSettings v-model:filter-form="apiParams" @search="onSearch" />

    <!-- table -->
    <TableCareerSetttings
      :table-data="apiData.result"
      :is-loading="isLoading"
      @onRemove="onRemove"
      @openFormModal="openModal"
      @updateStatus="updateStatus"
    />

    <!-- modal -->
    <ModalCareerSettings
      :element-id="selectedId"
      @updateList="fetchList"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import helpers from "@/utils/helper";
import { Modal } from "bootstrap";
// api functions
import { list, deleteElement, update } from "@/utils/api/careers";
// components
import TableCareerSetttings from "@/components/tables/TableCareerSetttings.vue";
import ModalCareerSettings from "@/components/modals/ModalCareerSettings.vue";
import FilterCareerSettings from "@/components/filters/FilterCareerSettings.vue";

const { t } = useI18n();
const notif = useNotyf();
const selectedId = ref<number | null>(null);
const isLoading = ref(false);
const counter = ref<number>(0);

const apiParams = reactive({
  search: "",
  status: null,
  reward_type_id: null,
  clear: true,
});

const apiData = reactive({
  result: [],
});

watch(
  () => apiParams,
  async () => {
    if (apiParams.search == "" && counter.value == 1) {
      await fetchList();
      counter.value = 0;
    }
  },
  {
    deep: true,
  }
);

watch(
  () => [apiParams.reward_type_id, apiParams.status],
  async () => {
    await fetchList();
  }
);

fetchList();
async function fetchList() {
  isLoading.value = true;
  if (!apiParams.search?.length) delete apiParams.search;
  let val = await list(apiParams);
  Object.assign(apiData, val);
  isLoading.value = false;
}

async function onRemove(id: number) {
  const res = await helpers.confirmDeletionAction(deleteElement, id);
  console.log("salom", res);
  if (res) {
    await fetchList();
  }
}

async function onSearch() {
  counter.value = 1;
  await fetchList();
}

function openModal(val: number | null) {
  selectedId.value = val;
  const modal = Modal.getOrCreateInstance("#modalCareerSettings");
  modal.show();
}

function closeModal() {
  selectedId.value = null;
}

async function updateStatus(elementData: any) {
  try {
    isLoading.value = true;
    await update(elementData.id, {
      name: elementData.name,
      reward_type_id: elementData.reward_type?.id,
      status: !elementData.status,
      _method: "PUT",
    });
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(t("Request_failed1"));
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss">
.crud_career {
  .table-career {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 180px 100px 140px;

    @include mobile() {
      grid-template-columns: 50px 200px 180px 100px 140px;
    }
  }
}
</style>
