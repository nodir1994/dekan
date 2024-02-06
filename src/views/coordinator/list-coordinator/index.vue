<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  getCoordinatorList,
  academicYearsAll,
} from "@/utils/api/coordinator/list";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
import { Modal } from "bootstrap";

const { t } = useI18n();

const apiData: any = reactive({
  search: "",
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
  academic_year_id: null,
});
const isLoading = ref(false);
const sideFormOptions: any = reactive({
  academicYearsOptions: null,
});
const loader = ref(true);
const getId = ref<number | null>(null);
const coordinatorName = ref<string>();
const coordinatorid = ref<number | null>();

sideFormOptions.academicYearsOptions = await academicYearsAll().then(
  (res: any) => res?.result?.data
);

apiData.academic_year_id = sideFormOptions.academicYearsOptions.find(
  (item: any) => {
    return item.is_current == true;
  }
).id;

await fetchList();

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
watch(
  () => apiData.academic_year_id,
  async () => {
    await fetchList();
  }
);
// async function sendData() {
//   await fetchList();
// }

async function listCoordinator() {
  await fetchList();
}

async function fetchList(page?: any) {
  let params: any = {
    page: page || 1,
  };
  if (apiData.search) params.search = apiData.search;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await getCoordinatorList(params);
      Object.assign(apiData, res.result);

      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function openModal(id: number | null) {
  getId.value = id;
  const modal = Modal.getOrCreateInstance("#coordinatorNameModal");
  modal.show();
}

async function openFormModal(coordinatorByName: string, id: number) {
  coordinatorName.value = coordinatorByName;
  coordinatorid.value = id;
  const modal = Modal.getOrCreateInstance("#coordinatorNameModal");
  modal.show();
}
function onModalClose() {
  getId.value = null;
}
</script>
<template>
  <div pagetitle="'Tyutor'" class="academicGroupPage2">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("coordinator_list") }}</h5>
          <div class="panel-toggles">
            <!-- <button class="btns c-save py-1.5 px-4 me-3" type="button">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
              >{{ $t("Add_a_coordinator") }}
            </button> -->
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <a-form @submit.prevent="listCoordinator" class="row">
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearsOptions"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-input
                  allowClear
                  id="yu"
                  class="form-control"
                  v-model:value="apiData.search"
                />
              </a-space>
              <label for="yu2">{{ $t("name_group_fish_code") }}</label>
            </div>
            <div class="my-2 col-md-2">
              <button type="submit" class="btn-search search-color">
                <i class="mdi mdi-magnifying-glass me-2"></i>{{ $t("search") }}
              </button>
            </div>
          </a-form>
        </b-card>
      </b-collapse>
    </div>
    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-academic-group2">
                <th>#</th>
                <th>{{ $t("coordinator_fish") }}</th>
                <th>{{ $t("Fixed_Groups") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-academic-group2"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td
                  @click="
                    openFormModal(element?.fullname, element?.employee_id)
                  "
                  class="coordinator_name"
                >
                  {{ element?.fullname }}
                  <i class="mdi mdi-plus font-size-18"></i>
                </td>
                <td class="d-flex flex-wrap">
                  <span
                    class="actions-h me-1 mt-1"
                    v-for="item in element.coordinator_groups"
                    @click="openModal(item?.id)"
                  >
                    {{ item.name }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <Pagination
            v-if="apiData.last_page > 1"
            class="mt-2"
            v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page"
          />
          <!-- --------------end pagination--------------------- -->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
    <!-------START TABLE---------------------------------------->
    <CoordinatorNameModal
      :get-id="getId"
      :coordinator-name="coordinatorName"
      :coordinator-id="coordinatorid"
      @update:list="fetchList"
      @close="onModalClose"
    />
  </div>
</template>

<style lang="scss">
.academicGroupPage2 {
  .table-row-academic-group2 {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 500px;

    @include mobile() {
      grid-template-columns: 50px 200px 350px;
    }
  }
  .actions-h {
    &:hover {
      color: white;
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
      cursor: pointer;
    }
  }
  .coordinator_name {
    color: #3b76e1;
    cursor: pointer;
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;

      &:last-child,
      &:first-child {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
