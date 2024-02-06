<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import {
  getListSpeciality,
  deleteSpeciality,
  changeStatus,
} from "@/utils/api/student-special/fetch";
import { educationList } from "@/utils/api/reference/index";
import helpers from "@/utils/helper";

// consts

const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const deanId = computed(() => userStore?.user?.faculty?.name);
const userStore = useUserStore();
const educationOptions = await educationList().then((res) => res.result);
// jadval mutaxassislik
const apiData: {
  current_page: number;
  data: any[];
  links: any[];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams = reactive({
  edu_type_id: null,
  page: 1,
  search: "",
});

// hooks

function onModalClose() {
  selectedId.value = null;
}

watch(
  () => apiParams.edu_type_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);
watch(
  () => apiParams.search,
  async (newVal, oldVal) => {
    if (apiParams.search === "") {
      await fetchList();
    }
  }
);
//watch pagination
watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);

// functions

async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: 10,
  };
  if (apiParams.edu_type_id) datas.edu_type_id = apiParams.edu_type_id;
  if (apiParams.search) datas.search = apiParams.search;
  isLoading.value = true;
  const res = await getListSpeciality(datas);
  Object.assign(apiData, res.result);
  isLoading.value = false;
}

await fetchList();
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
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteSpeciality(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
  }
}

//update status
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

//open form modal
function openFormModal(id: number | null) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#createSpecialityModal");
  modal.show();
}

async function onSearch() {
  await fetchList();
}
</script>

<template>
  <div pagetitle="'Mutaxassislik'" class="special-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Student_Special") }}</h5>
          <div class="filterBlock">
            <button class="btns c-save py-1.5 px-4 me-3" type="button" @click="openFormModal(null)">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("Create_Special") }}
            </button>
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form @submit.prevent="onSearch" class="row">
            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled />
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select class="form--item" v-model:value="apiParams.edu_type_id" :options="educationOptions"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-input id="yu" class="form-control" allow-clear v-model:value="apiParams.search" /></a-space>
              <label for="yu">{{ $t("Search_by_speciality_Name_Code") }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
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
                <th>{{ $t("Code") }}</th>
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("action") }}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row d-grid w-100" v-for="(element, index) in apiData.data" :key="element.id">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>{{ element?.code }}</td>
                <td>
                  <a type="text" @click="openFormModal(element.id)">
                    {{ element?.name }}
                  </a>
                </td>
                <td>{{ element?.edu_type?.name }}</td>
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
                <!-- ---------END ACTIONS-------------- -->
                <td class="gridjs-td">
                  <div class="form-check form-switch my-auto ">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" :checked="element.status"
                      :disabled="isLoading" @change="updateStatus(element.id)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
          <!-------------END PAGINATION-------------->
        </div>
        <div v-else>
          <NoData />
        </div>
      </div>
      <CreateSpecialtyFormModal :special-id="selectedId" @update:list="fetchList" @close="onModalClose" />
    </div>
    <span class="element-count mb-2">{{ apiData?.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.special-page {
  .table-row {
    grid-template-columns: 50px 100px auto 300px 140px 70px 60px;

    @include mobile() {
      grid-template-columns: 50px 100px 200px 200px 140px 70px 60px;
    }

    th,
    td {
      &:nth-last-child(2) {
        justify-content: center;
      }
    }
  }
}
</style>
