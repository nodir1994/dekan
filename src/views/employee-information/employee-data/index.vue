<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { listEmployees } from "@/utils/api/employee";
import { changeStatus } from "@/utils/api/employee";
import { Modal } from "bootstrap";
import Pagination from "@/components/partials/Pagination.vue";

const router = useRouter();

//actions delete
function handleDelete() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger ml-2",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Aminmisiz?",
      text: "Siz buni qaytara olmaysiz!",
      icon: "warning",
      confirmButtonText: "Ha, o'chirish!",
      cancelButtonText: "Yo'q, bekor qilish!",
      showCancelButton: true,
    })
    .then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          "O'chirildi!",
          "Xabarni o'chirish muvaffaqiyatli amalga oshirildi!",
          "success"
        );
      }
    });
}

// -------------------ACTION---------------------

const apiData = reactive({
  current_page: 1,
  data: [],
  links: [],
});
const isLoading = ref(false);
const searchInput = ref("");
const currentPage = computed({
  get: () => {
    return apiData.current_page;
  },
  set: async (page) => {
    await fetchData(page);
  },
});

await fetchData();

async function fetchData(page = 1) {
  isLoading.value = true;
  const res = await listEmployees({
    page,
    search_string: searchInput.value,
    department_id: 1,
  });
  Object.assign(apiData, res.data);
  isLoading.value = false;
}

function onEdit(rowId) {
  selectedId.value = rowId;
  isFormModalOpen.value = true;
}

async function onRemove(id) {
  selectedId.value = id;
  mainStore.$patch({ confirmModalState: true });
}

async function handleRemoveAction() {
  await removeById(selectedId.value);
  fetchData();
}

async function handleSearch() {
  await fetchData();
}

async function handleEdit(id) {
  router.push(`/employee-information/employee-data/employee/${id}`);
}

async function toggleStatus(id) {
  const res = await changeStatus(id);
}

function openEmployeeFormModal() {
  const modal = Modal.getOrCreateInstance("#employeeFormModal");
  modal.show();
}
</script>

<template>
  <div class="employeeDataPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Employees_base") }}</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              @click="openEmployeeFormModal"
            >
              <i class="mdi mdi-user-plus me-2"></i>
              {{ $t("Add_employee") }}
            </button>
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download me-2"></i>
              {{ $t("Export_employee") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>
                {{ $t("Filter") }}
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
          <div class="row">
            <div class="my-2 col-xl-10 form--item">
              <input
                v-model="searchInput"
                id="search-input"
                class="form-control"
              />
              <label for="search-input">{{
                $t("Search_by_Name_Passport_Employee_ID")
              }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button
                class="btn-search search-color"
                @click="handleSearch"
                :disabled="isLoading"
              >
                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <i v-else class="mdi mdi-magnifying-glass me-2"></i>
                <span>{{ $t("Search") }}</span>
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead v-if="apiData.data.length">
              <tr class="table-row-employee-data">
                <th>#</th>
                <th><a-checkbox></a-checkbox></th>
                <th>{{ $t("ID") }}</th>
                <th>{{ $t("Surname") }}</th>
                <th>{{ $t("Role") }}</th>
                <th>{{ $t("Birthdate") }}</th>
                <th>{{ $t("Passport_number") }}</th>
                <th>{{ $t("Updated_at") }}</th>
                <th>{{ $t("Job_number") }}</th>
                <th>{{ $t("Actions") }}</th>
                <th>{{ $t("Active") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="apiData.data.length">
                <tr
                  class="table-row-employee-data"
                  v-for="(element, elIndex) in apiData.data"
                  :key="elIndex"
                >
                  <td>{{ elIndex + 1 }}</td>
                  <td><a-checkbox></a-checkbox></td>
                  <td>{{ element.id }}</td>
                  <td class="cursor-pointer">
                    <router-link
                      :to="`/employee-information/employee-data/employee/${element.id}`"
                    >
                      {{ element.fio }}
                    </router-link>
                  </td>
                  <td>{{ element.roles }}</td>
                  <td>{{ element.birthdate }}</td>
                  <td>{{ element.passport_number }}</td>
                  <td>{{ element.updated_at }}</td>
                  <td class="justify-content-end">{{ element.work_count }}</td>
                  <!-- ---------START ACTIONS-------------- -->
                  <td class="flex-wrap">
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-link"
                        @click="handleEdit(element.id)"
                      >
                        <i class="bx bx-pencil font-size-18"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-link text-danger"
                        @click="handleDelete(element.id)"
                      >
                        <i class="bx bx-trash-alt font-size-18"></i>
                      </button>
                    </div>
                  </td>
                  <!-- ---------END ACTIONS-------------- -->
                  <td>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        @change="toggleStatus(element.id)"
                        :checked="element.status"
                      />
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <div class="py-5">
                  <h5 class="text-center">{{ $t("No_data") }}</h5>
                  <p class="text-center">
                    {{ $t("No_information_found") }}
                  </p>
                </div>
              </template>
            </tbody>
          </table>
          <!-- ----------------start pagenation-------------------- -->
          <Pagination
            v-if="apiData.data.length"
            class="mt-2"
            v-model:current-page="apiData.current_page"
            :links="apiData.links"
            :current_page=""
          />
          <!-- -----------------end-pagenation--------------------- -->
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->

    <!-------START MODAL---------------------------------------->
    <EmployeeFormModal />
    <!-------END MODAL---------------------------------------->
  </div>
</template>

<style lang="scss">
.employeeDataPage {
  .table-row-employee-data {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 40px 100px auto 120px 140px 140px 120px 80px 80px 70px;
    @include mobile() {
      grid-template-columns: 50px 40px 100px 200px auto 140px 140px 120px 80px 80px 60px;
    }
  }

  .modal-dialog {
    max-width: $ipad_pro !important;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
</style>
