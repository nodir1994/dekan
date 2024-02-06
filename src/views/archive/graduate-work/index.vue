<script setup lang="ts">
import Swal from "sweetalert2";
import { useNotyf } from "@/composable/useNotyf";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { educationList } from "@/utils/api/reference";
import {
  getSpecialByEduType,
  getAcademicGroupsBySpecialId,
} from "@/utils/api/reference/id";
import { useUserStore } from "@/stores/user";
import {
  defenseList,
  defenseStatusChange,
  deleteDefense,
} from "@/utils/api/archive/bmi";
import { useApi } from "@/composable/useApi";
import { useI18n } from "vue-i18n";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();

const notif = useNotyf();
const isLoading = ref(false);

// ------- filterlar ----------

const loader = ref(true);

const apiData: {
  edu_type_id: null | number;
  specialty_id: null | number;
  academic_group_id: null | number;
  page: number;
  current_page: number;
  per_page: number;
  data: any[];
  links: any[];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
  page: 1,
  per_page: helpers.pagePer,
  edu_type_id: null,
  specialty_id: null,
  academic_group_id: null,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  specialOptions: null,
  academicGroupOptions: null,
});
sideFormOptions.eduTypeOptions = await educationList().then(
  (res) => res.result
);

// filter education year
watch(
  () => apiData.edu_type_id,
  async (newVal, oldVal) => {
    apiData.specialty_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.specialOptions = null;
    await fetchList();
    if (apiData.edu_type_id) {
      sideFormOptions.specialOptions = await getSpecialByEduType(
        apiData.edu_type_id
      ).then((res) =>
        res.result.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name + "-" + `(${item.code})`,
          };
        })
      );
    }


  }
);

watch(
  () => apiData.specialty_id,
  async (newVal, oldVal) => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;
    await fetchList();
    if (apiData.specialty_id) {
      sideFormOptions.academicGroupOptions = await getAcademicGroupsBySpecialId(
        apiData.specialty_id
      ).then((res) => res.result.data);
    }


  }
);

watch(
  () => apiData.academic_group_id,
  async (newVal, oldVal) => {
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

await fetchList();

async function fetchList(page?: number) {
  isLoading.value = true;
  let datas: any = {
    page: page || 1,
  };

  if (apiData.edu_type_id) datas.edu_type_id = apiData.edu_type_id;
  if (apiData.per_page) datas.per_page = apiData.per_page;
  if (apiData.specialty_id) datas.specialty_id = apiData.specialty_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await defenseList(datas);
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

async function updateStatus(id: number, status: boolean) {
  try {
    isLoading.value = true;
    await defenseStatusChange(id, status);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

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
      await deleteDefense(id);
      await fetchList();

      await swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    await swalWithBootstrapButtons.fire(
      t("Something_went_wrong"),
      error.message,
      "error"
    );
  }
}
</script>

<template>
  <div pagetitle="`{{$t('archive_Graduate_Work')}}`" class="graduateWorkPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("archive_Graduate_Work") }}</h5>
          <div class="panel-toggles">
            <!-- <button class="btns c-save py-1.5 px-4 me-3" @click="exportToExcel">
                                              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t('Export') }}
                                            </button> -->
            <router-link to="/archive/graduate-work/create" class="btns c-save py-1.5 px-4 me-3">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("Create") }}
            </router-link>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" v-model:value="apiData.edu_type_id"
                  :options="sideFormOptions.eduTypeOptions" :field-names="{ value: 'id', label: 'name' }" allow-clear
                  show-search>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //o'quv yili  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" class="form--item"
                  v-model:value="apiData.specialty_id" :options="sideFormOptions.specialOptions"
                  :disabled="!apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }" show-search
                  allow-clear></a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>

            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }" :disabled="!apiData.specialty_id"
                  :options="sideFormOptions.academicGroupOptions" allow-clear show-search>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <!-- //ta'lim shakli  -->
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("Graduate_work_name") }}</th>
                    <th>{{ $t("Supervisor_Name") }}</th>
                    <th>{{ $t("Actions") }}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row" v-for="(element, index1) in apiData?.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index1 +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.student }}
                    </td>
                    <td>
                      {{ element.edu_type }}
                    </td>
                    <td>
                      {{ element.specialty }}
                    </td>
                    <td>
                      {{ element.academic_group }}
                    </td>
                    <td>
                      {{ element.theme }}
                    </td>
                    <td>
                      {{ element.advisor_name }}
                    </td>
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link :to="`/archive/graduate-work/edit/${element.id}`">
                              <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                            </router-link>
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
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                          :checked="element.status" :disabled="isLoading"
                          @change="updateStatus(element.id, !element.status)" />
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
              <h5 class="text-center">{{ $t("No_data") }}</h5>
              <p class="text-center">
                {{ $t("No_information_found") }}
              </p>
            </div>
          </div>
        </div>
        <span class="element-count mb-2" v-if="apiData?.total">{{ apiData?.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData?.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.graduateWorkPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 140px 190px 100px 300px 150px 100px 80px;
  }
}
</style>
