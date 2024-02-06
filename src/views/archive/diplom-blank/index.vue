<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";

import {
  educationList,
  diplomCategories,
  diplomTypes,
  educationListAll,
} from "@/utils/api/reference";
import {
  getListDiploms,
  showBlankById,
  changesBlankById,
} from "@/utils/api/archive/blank";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const errors = reactive({});

const apiData: any = reactive({
  search: "",
  edu_type_id: null, //ta'lim turi
  diplom_category_id: null, //Diplom toifasi
  diplom_blank_status_id: null, //Diplom blanki holati
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  typeOptions: null,
  categoryOptions: null,
  statusOptions: null,
});

const modalData: any = reactive({
  id: null,
});
const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.typeOptions = await educationListAll().then(
    (res) => res.result
  );
  sideFormOptions.categoryOptions = await diplomCategories().then(
    (res) => res.result
  );
  sideFormOptions.statusOptions = await diplomTypes().then(
    (res) => res?.result
  );
});

async function onSearch() {
  await fetchList();
}

watch(
  () => [
    apiData.edu_type_id,
    apiData.diplom_category_id,
    apiData.diplom_blank_status_id,
  ],
  async (newVal, newVal2, newVal3) => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);

async function fetchList(page?: number) {
  let datas: any = {
    page: apiData?.page,
    per_page: apiData?.per_page
  };

  if (apiData.search.length > 0) datas.search = apiData?.search;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.diplom_category_id)
    datas.diplom_category_id = apiData?.diplom_category_id;
  if (apiData.diplom_blank_status_id)
    datas.diplom_blank_status_id = apiData?.diplom_blank_status_id;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListDiploms(datas);
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

async function openFormModal(id: number) {
  const modal = Modal.getOrCreateInstance("#modalBlank");
  modalData.id = id;
  modalData.about_diplom = "";
  let data = await showBlankById(id).then((res) => res.result);
  Object.assign(modalData, data);
  modal.show();
}

async function changeSubjectById() {
  try {
    const modal = Modal.getOrCreateInstance("#modalBlank");
    await changesBlankById(modalData);
    isLoading.value = true;
    notif.success(t("updated_successfully"));
    modal.hide();
    await fetchList();
  } catch (error: any) {
    console.log(error, "error");
    notif.error(t("Dashboard_Error"));
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'Diplom blanki'" class="transferPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Diploma_Blank") }}</h5>
          <div class="filterBlock">
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------->

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="col-xl-3 my-2 form--item">
              <a-form-item class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiData.edu_type_id"
                  :options="sideFormOptions.typeOptions" :field-names="{ value: 'id', label: 'name' }" allow-clear
                  :placeholder="t('choose__type')">
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xl-2 my-2 form--item">
              <a-form-item class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiData.diplom_category_id" :options="sideFormOptions.statusOptions"
                  :field-names="{ value: 'id', label: 'name' }" allow-clear :placeholder="t('category')">
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xl-3 my-2 form--item">
              <a-form-item class="mb-3" name="nameFaculty">
                <a-select :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiData.diplom_blank_status_id" :options="sideFormOptions.categoryOptions"
                  :field-names="{ value: 'id', label: 'name' }" allow-clear :placeholder="t('Contract_Status')">
                </a-select>
              </a-form-item>
            </div>
            <div class="my-2 col-xl-3 my-2 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear /> </a-space><label
                for="yu">{{ $t("Search_by_number") }}</label>
            </div>
            <div class="my-2 col-xl-1 me-0 ms-auto">
              <button @click="onSearch" class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>
                {{ $t("search") }}
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="card">
      <div class="card-body">
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-all-blank">
                <th>#</th>
                <th>{{ $t("Diploma_number") }}</th>
                <th>{{ $t("Education_Year_Name") }}</th>
                <th>{{ $t("Publication_Property_Type") }}</th>
                <th>{{ $t("category") }}</th>
                <th>{{ $t("Contract_Status") }}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-all-blank" v-for="(element, index) in apiData.data" :key="element.id">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element.number }}
                </td>
                <td>
                  {{ element.academic_year }}
                </td>
                <td>
                  {{ element.edu_type }}
                </td>
                <td>
                  {{ element.diplom_category }}
                </td>
                <td>
                  {{ element.diplom_blank_status }}
                </td>
                <td class="gridjs-td justify-content-center">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project text-center">
                        <a type="text" @click="openFormModal(element.id)">
                          <i class="mdi mdi-pencil text-primary"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
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

    <span class="element-count mb-2" v-if="apiData?.total">{{ apiData?.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>

    <div id="modalBlank" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("Diploma_Blank") }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="card-body">
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Diploma_number")
                }}</label>
                <a-input :value="modalData.number" disabled placeholder="B0034834786" />
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Education_Year_Name")
                }}</label>
                <a-input disabled :value="modalData.academic_year" />
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Publication_Property_Type")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="modalData.edu_type_id"
                  :options="sideFormOptions.typeOptions" disabled :field-names="{ value: 'id', label: 'name' }">
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("category")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="modalData.diplom_blank_status_id" :options="sideFormOptions.categoryOptions"
                  :field-names="{ value: 'id', label: 'name' }">
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Status")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search :options="sideFormOptions.statusOptions"
                  :field-names="{ value: 'id', label: 'name' }" v-model:value="modalData.diplom_category_id">
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-input" class="form-label">{{
                  $t("Reason")
                }}</label>
                <a-textarea :auto-size="{ minRows: 4.5, maxRows: 6 }" v-model:value="modalData.about_diplom" />
              </a-form-item>
              <div class="d-flex justify-content-end">
                <button class="btns c-save" type="button" @click="changeSubjectById">
                  <i class="mdi mdi-check font-size-14 align-middle me-1"></i>{{ $t("Save") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.transferPage {
  .table-row-all-blank {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 250px auto 230px 200px 200px 100px;

    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }
}

.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>
