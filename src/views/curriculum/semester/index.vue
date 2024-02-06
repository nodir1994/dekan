<template>
  <div pagetitle="'Malaka oshirish'" class="semester-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Curriculum_Semester") }}</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              @click="openFormModal(null)"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
              >{{ $t("Create_Semester") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
            <router-link
              v-if="queryID"
              to="/curriculum/curriculum"
              class="btns black-c py-1.5 px-4 ms-3"
            >
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Back") }}
            </router-link>
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
                <a-select
                  v-model:value="apiParams.edu_plan_id"
                  :options="optionsCurriculum.data"
                  allow-clear
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_Curriculum") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.semester"
                  :options="semesterOptions"
                  allow-clear
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label for="yu"> {{ $t("Search_by_semester_Name_Code") }}</label>
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
              <tr class="table-row w-100 d-grid">
                <th>#</th>
                <th>{{ $t("semester") }}</th>
                <th>{{ $t("by_Level") }}</th>
                <th>{{ $t("Curriculum") }}</th>
                <th>{{ $t("Education_Year_Name") }}</th>
                <th>{{ $t("Deadline") }}</th>
                <th>{{ $t("action") }}</th>
                <th>{{ $t("Active") }}</th>
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
                    index + 1 + apiData.per_page * (apiData.current_page - 1)
                  }}
                </td>
                <td>{{ element?.semester }}-{{ $t("semester_number") }}</td>
                <td>{{ element?.course }}-{{ $t("course_number") }}</td>
                <td>{{ element?.edu_plan?.name }}</td>
                <td>{{ element?.academic_year?.name }}</td>
                <td>{{ element?.date_start }}-{{ element?.date_end }}</td>
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
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      :checked="element.status"
                      :disabled="isLoading"
                      @change="updateStatus(element.id, element?.semester)"
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
    <SemesterFormModal
      :semester-id="selectedId"
      @update:list="fetchList"
      @close="onModalClose"
    />
    <span class="element-count mb-2" v-if="apiData.data.length"
      ><span v-if="apiData.last_page > 1">
        {{ apiData.current_page }}-{{
          apiData.data.length + apiData.per_page * (apiData.current_page - 1)
        }}
        /
      </span>
      {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import {
  semesterList,
  deleteSemester,
  changeStatus,
} from "@/utils/api/edu/semester";
import { eduPlanListAll } from "@/utils/api/reference/index";
import { useRoute } from "vue-router";
import router from "@/router";
import helpers from "@/utils/helper";
import { loadRouteLocation } from "vue-router";
const route = useRoute();
const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const queryID = route.query?.id ?? null;
const eduPlanID = queryID ? Number(queryID) : null;
const loader = ref(true);
const semesterOptions = [
  {
    id: 1,
    name: `1-${t("semester")}`,
  },
  {
    id: 2,
    name: `2-${t("semester")}`,
  },
  {
    id: 3,
    name: `3-${t("semester")}`,
  },
  {
    id: 4,
    name: `4-${t("semester")}`,
  },
  {
    id: 5,
    name: `5-${t("semester")}`,
  },
  {
    id: 6,
    name: `6-${t("semester")}`,
  },
  {
    id: 7,
    name: `7-${t("semester")}`,
  },
  {
    id: 8,
    name: `8-${t("semester")}`,
  },
  {
    id: 9,
    name: `9-${t("semester")}`,
  },
  {
    id: 10,
    name: `10-${t("semester")}`,
  },
  {
    id: 11,
    name: `11-${t("semester")}`,
  },
  {
    id: 11,
    name: `12-${t("semester")}`,
  },
];
const optionsCurriculum = await eduPlanListAll().then((res) => res.result);
const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams: any = reactive({
  edu_plan_id: eduPlanID,
  semester: null,
  page: 1,
  per_page: helpers.pagePer,
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
//filter o'quv reja
watch(
  () => [apiParams.edu_plan_id, apiParams.semester],
  async (newVal, oldVal) => {
    // if (Number(newVal)) {
    await fetchList();
    // }
  }
);

async function fetchList(pages?: number) {
  delete apiParams.page;
  let datas: any = reactive({
    ...apiParams,
    page: pages || 1,
  });
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await semesterList(datas);
      Object.assign(apiData, res.result);
      setTimeout(() => {
        loader.value = true;
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
//open form modal
function openFormModal(id: number | null) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#semesterFormModal");
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
      await deleteSemester(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Semester_name_deleted_successfully"),
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

async function updateStatus(id: number, semester: any) {
  try {
    await changeStatus(id);
    await fetchList();
    notif.success(
      `[${semester}-${t("semester_number")}]- ${t(
        "Status_changed_successfully"
      )}`
    );
  } catch (error: any) {
    notif.error(error.message);
  }
}
</script>

<style lang="scss">
.semester-page {
  .table-row {
    grid-template-columns: 50px 10% 10% auto 15% 20% 80px 70px;
    @include mobile() {
      grid-template-columns: 50px 100px 70px auto 120px 200px 80px 70px;
    }
    td,
    th {
      &:first-child {
        justify-content: start;
      }
    }
  }
}
</style>
