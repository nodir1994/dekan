<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import {
  trainingList,
  deleteTraining,
  changeStatus,
} from "@/utils/api/employee/advenced-training";
import { academicYearsList, departmentList } from "@/utils/api/reference/index";
import { formatDate } from "@vueuse/core";
import helpers from "@/utils/helper";
const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
//-------filterlar----------
const optionsDepartment = ref([]);
const optionsAcademicYearList = await academicYearsList().then((res) =>
  res.result.data.map((item: any) => {
    return {
      id: item.year,
      name: item.year + "-" + t("year"),
    };
  })
);

const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams = reactive({
  department_id: null,
  year: null,
  name: "",
  page: 1,
  per_page: helpers.pagePer,
});

await fetchList();

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);

//filter department
watch(
  () => apiParams.department_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);
//filter education year
watch(
  () => apiParams.year,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

onBeforeMount(async () => {
  const res = await departmentList();
  optionsDepartment.value = res.result;
});

async function fetchList() {
  const res = await trainingList(apiParams);
  Object.assign(apiData, res.result);
}
//open form modal
function openFormModal(id: number | null) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#advencedTrainingFormModal");
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
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteTraining(id);
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
  <div pagetitle="'Malaka oshirish'" class="advenced-training-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            {{ $t("Employee_Professional_Development") }}
          </h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              @click="openFormModal(null)"
            >
              <i class="mdi mdi-account-plus font-size-14 align-middle me-1"></i
              >{{ $t("add") }}
            </button>
            <router-link to="/employee/advenced-training/monitoring">
              <button class="btns c-save py-1.5 px-4 me-3" type="button">
                <i
                  class="mdi mdi-text-search font-size-14 align-middle me-2"
                ></i>
                {{ $t("Employee_Competition_Monitoring") }}
              </button></router-link
            >
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.department_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsDepartment"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Department") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.year"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsAcademicYearList"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Year") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>#</th>
                <th>{{ $t("Employee") }}</th>
                <th>{{ $t("Hei_cathedra") }}</th>
                <th>{{ $t("by_Post") }}</th>
                <th>{{ $t("academic_Degree") }}</th>
                <th>{{ $t("academic_Rank") }}</th>
                <th>{{ $t("Training_Place") }}</th>
                <th>{{ $t("Training_Period") }}</th>
                <th>{{ $t("Year") }}</th>
                <th>{{ $t("action") }}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.fullname }}
                </td>
                <td>
                  {{ element?.department }}
                </td>
                <td>{{ element?.position }}</td>
                <td>
                  <span v-if="element?.academic_degree == null">{{
                    $t("No_Degree")
                  }}</span>
                  <span v-else>{{ element?.academic_degree }}</span>
                </td>
                <td>
                  <span v-if="element?.academic_title == null">{{
                    $t("Untitled")
                  }}</span>
                  <span v-else>{{ element?.academic_title }}</span>
                </td>
                <td>
                  {{ element?.training_place }}
                </td>
                <td>
                  {{
                    formatDate(new Date(element.date_start), "YYYY-MM-DD")
                  }}/{{ formatDate(new Date(element.date_end), "YYYY-MM-DD") }}
                </td>
                <td>
                  {{ element.year }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" @click="openFormModal(element.id)">
                          <i
                            class="mdi mdi-pencil font-size-18 text-primary"
                          ></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a
                          class="text-danger"
                          type="danger"
                          @click="onRemove(element.id)"
                          ><i class="mdi mdi-delete font-size-18"></i
                        ></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  <div class="form-check form-switch my-auto">
                    <!-- {{ element.id }} -->
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="element.status"
                      :disabled="isLoading"
                      @change="updateStatus(element.id)"
                    />
                  </div>
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
          <p class="text-center mb-0">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
    <AdvencedTrainingFormModal
      :advenced-training-id="selectedId"
      @update:list="fetchList"
      @close="onModalClose"
    />
  </div>
</template>

<style lang="scss">
.advenced-training-page {
  .table-row {
    grid-template-columns: 50px auto 15% 10% 10% 8% 10% 15% 5% 70px 70px;

    @include mobile() {
      grid-template-columns: 50px 200px 100px 100px 100px 90px 100px 80px 50px 70px 60px;
    }
  }

  .modal-dialog {
    max-width: $ipad;
  }
}
</style>
