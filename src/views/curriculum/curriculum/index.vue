<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import {
  planList,
  deletePlan,
  changeStatus,
  archiveEduPlan,
} from "@/utils/api/edu/plan";
import { academicYearsList } from "@/utils/api/reference/index";
import { useI18n } from "vue-i18n";
import helpers from "@/utils/helper";
const notif = useNotyf();
const router = useRouter();
const { t } = useI18n();
const isLoading = ref(false);

const optionsAcademicYear = await academicYearsList().then((res) => res.result);
const counter = ref();

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});
const apiParams = reactive({
  page: 1,
  academic_year_id: null,
  name: "",
});
await fetchList();

//name
async function onSearch() {
  counter.value = 1;
  await fetchList();
}
watch(
  () => apiParams.name,
  async (newVal, oldVal) => {
    if (apiParams.name == "" && counter.value == 1) {
      await fetchList();
      counter.value = 0;
    }
  }
);
//filter education_year
watch(
  () => apiParams.academic_year_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);

async function fetchList() {
  isLoading.value = true;
  const res = await planList(apiParams);
  Object.assign(apiData, res.result);
  isLoading.value = false;
}

// async function handleSearch() {
//   await fetchList();
// }

async function handleEdit(id: number) {
  router.push(`/curriculum/curriculum/${id}`);
}
//active
async function updateStatus(id: number, eduPlanName: string) {
  try {
    isLoading.value = true;
    await changeStatus(id);
    await fetchList();
    notif.success(`[${eduPlanName}] - ${t("Status_changed_successfully")}`);
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}

//actions delete
async function handleDelete(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn  btn-danger me-2",
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
      await deletePlan(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Curriculum_name_deleted_successfully"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
  }
}

//actions archive
async function archivedEduPlan(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger ml-2",
    },
    buttonsStyling: false,
  });

  try {
    const res = await swalWithBootstrapButtons.fire({
      title: t("Do_you_want_to_archive"),
      text: t("Transferred_to_the_curriculum_archive_department"),
      icon: "warning",
      confirmButtonText: t("Yes_archiving"),
      cancelButtonText: t("No_cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await archiveEduPlan(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Archived"),
        t("The_curriculum_was_transferred_to_the_archive_department"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
  }
}
</script>

<template>
  <div pagetitle="`O'quv reja`" class="curriculum-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Curriculum") }}</h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/curriculum/create"><button class="btns c-save py-1.5 px-4 me-3" type="button">
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("Create_curriculum") }}
              </button></router-link>
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

    <!-- ---------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiParams.academic_year_id" :options="optionsAcademicYear.data" allow-clear
                  :field-names="{ value: 'id', label: 'name' }">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-input id="yu" class="form-control" v-model:value="apiParams.name" allow-clear /></a-space>
              <label for="yu"> {{ $t("Search_by_Name") }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color" type="submit">
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
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("Structure_Faculty") }}</th>
                <th>{{ $t("Actions") }}</th>
                <th>{{ $t("Structure_Faculty") }}</th>
                <th>{{ $t("Active") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="index">
                <td>
                  <span>
                    {{ element?.name }} <br />
                    {{ element?.specialty?.gov_specialty?.name }}
                  </span>
                </td>
                <td>
                  {{ element?.faculty?.name }} <br />
                  {{ element?.specialty?.edu_type?.name }} /
                  {{ element?.rating_system?.name }}
                </td>
                <td>
                  <router-link :to="`/curriculum/semester?id=${element.id}`"><button class="btns1 actions-c p-1 me-2"
                      type="submit">
                      <i class="mdi mdi-calendar-month-outline me-1"></i>
                      {{ $t("Semester_Name") }}
                    </button></router-link>
                  <router-link :to="`/curriculum/curriculum/${element?.id}/week`" class="btns1 actions-c p-1 me-2">
                    <i class="mdi mdi-timer-sand-full me-1"></i>
                    {{ $t("Week") }}
                  </router-link>
                  <router-link :to="`/curriculum/curriculum/${element?.id}/subjects`" class="btns1 actions-c p-1 me-2">
                    <i class="mdi mdi-book me-1"></i> {{ $t("Subjects") }}
                  </router-link>
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td justify-content-center">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a @click="handleEdit(element.id)"><i class="mdi mdi-pencil font-size-18 text-primary"></i></a>
                      </div>
                    </li>
                    <!-- <li class="list-inline-item">
                          <div class="delete__project">
                            <a
                              class="text-bluee"
                              type="danger"
                              @click="archivedEduPlan(element.id)"
                              ><i
                                class="mdi mdi-archive text-secondary font-size-18"
                              ></i
                            ></a>
                          </div>
                        </li> -->
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="handleDelete(element.id)"><i
                            class="mdi mdi-delete font-size-18"></i></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  <div class="form-check form-switch my-auto">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" :checked="element.status"
                      :disabled="isLoading" @change="updateStatus(element.id, element.name)" />
                  </div>
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
    <!-------START TABLE---------------------------------------->
    <span class="element-count mb-2" v-if="apiData.data.length"><span v-if="apiData.last_page > 1">
        {{ apiData.current_page }}-{{
          apiData.data.length + apiData.per_page * (apiData.current_page - 1)
        }}
        /
      </span>
      {{ $t("Total_Point") }}: {{ apiData.total }}</span>
  </div>
</template>

<style lang="scss">
.curriculum-page {
  .table-row {
    grid-template-columns: auto 24% 290px 100px 70px;

    @include ipad {
      grid-template-columns: 200px 200px 290px 100px 70px;
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
