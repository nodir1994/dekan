<script setup lang="ts">
import { computed, ref, reactive, watch } from "vue";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { formatDate } from "@vueuse/core";
import {
  commandList,
  deleteCommand,
  changeStatus,
} from "@/utils/api/status-student/order-list";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import helpers from "@/utils/helper";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const router = useRouter();
const loader = ref(true);
const selectedId = ref<number | null>(null);

// const optionsAcademicYear = await academicYearsList().then((res) => res.result);

//search
async function onSearch() {
  await fetchList();
}

const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});
const apiParams: any = reactive({
  page: 1,
  academic_year_id: null,
  faculty_id: null,
  search: "",
  per_page: helpers.pagePer,
});
await fetchList();

//filter education_year
watch(
  () => apiParams.academic_year_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

//filter faculty
// S

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);

async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: apiParams.per_page,
  };
  if (apiParams.academic_year_id)
    datas.academic_year_id = apiParams.academic_year_id;
  if (apiParams.faculty_id) datas.faculty_id = apiParams.faculty_id;
  if (apiParams.search) datas.search = apiParams.search;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await commandList(datas);
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

// async function handleSearch() {
//   await fetchList();
// }

async function handleEdit(id: number) {
  router.push(`/status-student/order-list/${id}`);
}

//actions delete
async function handleDelete(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger ml-2",
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
      await deleteCommand(id);
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
//-------------------attach studens--------------------------
//open attach students
function onImportModalClose() {
  selectedId.value = null;
}

function openAttachCommands(id: number | null) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#attachCommandsModal");
  modal.show();
}
</script>

<template>
  <div pagetitle="'Buyruqlar'" class="order-list-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Commands") }}</h5>
          <div class="panel-toggles">
            <router-link
              to="/status-student/order-list/create-order"
              class="btns c-save py-1.5 px-4 me-3"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>
              {{ $t("Create") }}
            </router-link>
            <router-link
              to="/status-student/order-list/apply-order"
              class="btns c-save py-1.5 px-4"
            >
              <i class="mdi mdi-check-all font-size-14 align-middle me-1"></i
              >{{ $t("apply_Decree") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="onSearch" class="row">
          <!-- //izlash  -->
          <div class="my-2 col-md-10 form--item">
            <a-space>
              <a-input
                id="yu"
                class="form-control"
                allow-clear
                v-model:value="apiParams.search"
            /></a-space>
            <label for="yu">{{ $t("Search_by_Name_Number") }}</label>
          </div>

          <!-- //search button  -->
          <div class="my-2 col-xl-2">
            <button type="submit" class="btn-search search-color">
              <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
              >{{ $t("Search") }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th>#</th>
                <th>{{ $t("Command_number") }}</th>
                <th>{{ $t("Decree_Date") }}</th>
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("Decree_Type") }}</th>
                <th>{{ $t("Structure_Faculty") }}</th>
                <th>{{ $t("Student_Contingents") }}</th>
                <th>{{ $t("Created_At") }}</th>
                <th>{{ $t("Download") }}</th>
                <th>{{ $t("action") }}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row w-100 d-grid"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element.number }}
                </td>
                <td>
                  {{ element.date }}
                </td>
                <td>{{ element.name }}</td>
                <td>
                  {{ element?.command_type?.name }}
                </td>
                <td>
                  {{ element?.department?.name }}
                </td>
                <td>
                  <span v-if="element?.student_count">
                    <a @click="openAttachCommands(element.id)">
                      {{ element.student_count }}
                      <i class="mdi mdi-eye c-sacces ml-2"></i>
                    </a>
                  </span>
                </td>
                <td>
                  {{
                    formatDate(
                      new Date(element.created_at),
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </td>
                <td class="justify-content-center">
                  <a :href="element?.file" target="_blank" class="btns c-save">
                    <i class="mdi mdi-download me-1"></i>
                  </a>
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a @click="handleEdit(element.id)">
                          <i
                            class="mdi mdi-pencil font-size-18 text-primary"
                          ></i>
                        </a>
                      </div>
                    </li>
                    <!-- <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" :href="element.file">
                          <i class="mdi mdi-arrow-down-bold-box font-size-18 text-warning"></i>
                        </a>
                      </div>
                    </li> -->
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a
                          class="text-danger"
                          type="danger"
                          @click="handleDelete(element.id)"
                          ><i class="mdi mdi-delete font-size-18"></i
                        ></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  <div class="form-check form-switch my-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      :checked="element.status"
                      :disabled="isLoading"
                      @change="updateStatus(element.id)"
                    />
                  </div>
                  <!-- {{ (element.id) }} -->
                </td>
              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination
            v-if="apiData.last_page > 1"
            class="mt-2"
            v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page"
          />
          <!-------------END PAGINATION-------------->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <!-- <span class="element-count"
      >1-{{ allTables.tableOrderList.length }}/ {{ $t("Total_Point") }}:
      {{ allTables.tableOrderList.length }}</span
    > -->
    <!-------START TABLE---------------------------------------->
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
    <AttachCommandsModal
      :command-id="selectedId"
      @update:list="fetchList"
      @close="onImportModalClose"
    />
  </div>
</template>

<style lang="scss">
.order-list-page {
  .table-row {
    grid-template-columns: 50px 8% 8% auto 13% 15% 5% 10% 7% 130px 90px;

    @include mobile() {
      grid-template-columns: 50px 40px 200px 100px 100px 100px 90px 100px 100px 100px 60px;
    }

    td,
    th {
      &:nth-last-child(2) {
        justify-content: center;
      }
    }
  }
}
</style>
