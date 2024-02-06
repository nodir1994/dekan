<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import { specialList, educationList } from "@/utils/api/reference/index";
import {
  getQualificationList,
  changeStatus,
  deleteQualificationById,
} from "@/utils/api/students/qualification";
import helpers from "@/utils/helper";

const { locale } = useI18n();
const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const formOptions: any = reactive({});

onMounted(async () => {
  formOptions.educationTypeOptions = await educationList().then(
    (res: any) => res.result
  );
  formOptions.specialListOptions = await specialList().then((res) =>
    res.result?.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    })
  );
});

// jadval bino
const apiData: {
  current_page: number;
  data: any[];
  links: [];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams = reactive({
  edu_type_id: null,
  specialty_id: null,
  per_page: helpers.pagePer,
  page: 1,
});

await fetchList();

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);

watch(
  () => [apiParams.specialty_id, apiParams.edu_type_id],
  async (newVal, oldVal) => {
    await fetchList();
  }
);
async function fetchList(pages?: number) {
  let datas: any = {
    per_page: apiParams.per_page,
    page: pages || 1,
  };
  if (apiParams.edu_type_id) datas.edu_type_id = apiParams.edu_type_id;
  if (apiParams.specialty_id) datas.specialty_id = apiParams.specialty_id;
  try {
    isLoading.value = true;
    const res = await getQualificationList(datas);
    Object.assign(apiData, res.result);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
//open form modal
function openFormModal(id: number | null) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#createQualificationModal");
  modal.show();
}
//actions delete

async function onRemove(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-2",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });

  try {
    const res = await swalWithBootstrapButtons.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      icon: "warning",
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      confirmButtonText: t("Delete_message.Yes_Delete"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteQualificationById(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("The_classification_was_successfully_removed"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
  }
}

function onModalClose() {
  selectedId.value = null;
}

async function onSearch() {
  await fetchList();
}

async function updateStatus(id: number) {
  try {
    isLoading.value = true;
    await changeStatus(id);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'Kvalifikatsiyalar'" class="qulification-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Qualification") }}</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="button" @click="openFormModal(null)">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("add") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  v-model:value="apiParams.edu_type_id" :field-names="{ value: 'id', label: 'name' }" allow-clear
                  :options="formOptions.educationTypeOptions">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :field-names="{ value: 'id', label: 'name' }" v-model:value="apiParams.specialty_id"
                  :options="formOptions.specialListOptions" allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>#</th>
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("by_Specialty") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("action") }}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row d-grid w-100" v-for="(element, index) in apiData?.data" :key="index">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>

                <td>
                  <router-link to="/student/qualification/creat"></router-link>{{ element?.name }}
                </td>

                <td>
                  {{ element?.specialty?.code }}
                </td>
                <td>
                  {{ element?.edu_type?.name }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" @click="openFormModal(element?.id)">
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="onRemove(element.id)"><i
                            class="mdi mdi-delete font-size-18"></i></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="form-check form-switch my-auto">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" :checked="element.status"
                      :disabled="isLoading" @change="updateStatus(element.id)" />
                  </div>
                </td>
                <!-- ---------END ACTIONS-------------- -->
              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
          <!-------------END PAGINATION-------------->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
      <createQualificationFormModal :qual-id="selectedId" @update:list="fetchList" @close="onModalClose" />
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
      apiData.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.qulification-page {
  .table-row {
    grid-template-columns: 50px auto 20% 20% 90px 80px;

    @include mobile() {
      grid-template-columns: 50px 200px 120px 120px 70px 60px;
    }
  }

  .modal-dialog {
    max-width: $ipad;
  }
}
</style>
