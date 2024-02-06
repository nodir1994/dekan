<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import {
  educationList,
  academicYearsList,
  eduFormList,
  paymentTypeList,
  specialList,
} from "@/utils/api/reference";
import {
  getListStudents,
  getListStudentById,
  changeDataById,
} from "@/utils/api/archive/circulation";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

import {
  getAcademicGroupsBySpecialId,
  eduPlanById,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  search: "",
  specialty_id: null,
  edu_type_id: null,
  payment_type_id: null,
  academic_group_id: null,
  edu_form_id: null,
  edu_year_id: null,
  data: [],
  links: [],
  students: [],
  academic_year_id: null,
  current_page: 1,
  per_page: helpers.pagePer,
});

const modalData = reactive({
  id: null,
  is_approved: false,
  description: null,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  academicGroupOptions: null,
  academicYearOptions: null,
  specialOptions: null,
  paymentTypeOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.academicYearOptions = await academicYearsList().then(
    (res) => res.result?.data
  );
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
  sideFormOptions.paymentTypeOptions = await paymentTypeList().then(
    (res) => res?.result
  );
  sideFormOptions.specialOptions = await specialList().then((res) =>
    res.result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    })
  );
});

async function onSearch() {
  await fetchList();
}

watch(
  () => apiData.payment_type_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_type_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.academic_year_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_form_id,
  async () => {
    apiData.specialty_id = null;
    sideFormOptions.specialOptions = null;
    await fetchList();
    if (apiData.edu_form_id) {
      sideFormOptions.eduPlanOptions = await eduPlanById(
        apiData.edu_form_id
      ).then((res) => res.result?.data);
    }
  }
);

watch(
  () => apiData.specialty_id,
  async () => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (apiData.specialty_id) {
      let res = await getAcademicGroupsBySpecialId(apiData.specialty_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
    }
  }
);

watch(
  () => apiData.academic_group_id,
  async () => {
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

watch(
  () => apiData.payment_type_id,
  async () => {
    await fetchList();
  }
);

async function fetchList(newVal?: number) {
  let datas: any = {
    page: newVal || 1,
    per_page: apiData.per_page,
  };
  if (apiData.search.length > 0) datas.search = apiData?.search;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  if (apiData.specialty_id) datas.specialty_id = apiData?.specialty_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(datas);
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

async function getItem(id: number) {
  let res = await getListStudentById(id).then((res) => res.result);
  Object.assign(modalData, res);
}

async function updateItem(id: number) {
  try {
    const res = await changeDataById(modalData);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(t("Failed") + ": " + error.message);
  }
}

async function changeStatus(id: number) {
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
      text: t("change_statuses"),
      icon: "warning",
      confirmButtonText: t("Continue"),
      cancelButtonText: t("No_cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await getItem(id);
      modalData.is_approved = !modalData.is_approved;
      await updateItem(id);
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
  }
}
</script>

<template>
  <div pagetitle="`Bitruv varag'i`" class="circulationSheetCheckPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            {{ $t("archive_Circulation_Sheet_Check") }}
          </h5>
          <div class="panel-toggles">
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
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //o'quv yili  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearOptions"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.edu_type_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions"
                  :placeholder="t('Choose_Education_Form')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //mutaxassislikni  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.specialty_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.specialOptions"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.specialty_id"
                  :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-xl-10 form--item">
              <a-space>
                <a-input
                  id="yu"
                  v-model:value="apiData.search"
                  class="form-control"
                  allow-clear
                />
              </a-space>

              <label for="yu">{{ $t("choose__fish__passport__code") }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color" @click="onSearch">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                >{{ $t("Search") }}
              </button>
            </div>
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
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th><b>#</b></th>
                    <th>
                      <b>{{ $t("Student") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Curriculum_Education_Year") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Education_Type") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("by_Specialty") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Group") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Circulation_Sheet_Comment") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Circulation_Status") }}</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="(element, index) in apiData?.data"
                    :key="element.id"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <a
                        type="text"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalMessasge"
                      >
                        {{ element?.student }} <br />
                        {{ element?.id }}</a
                      >
                    </td>
                    <td>
                      {{ element?.academic_year }}
                    </td>
                    <td>
                      {{ element?.edu_type }} <br />
                      {{ element?.edu_form }}
                    </td>
                    <td>
                      {{ element?.specialty }}
                    </td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                    <td>
                      {{ element?.description }}
                    </td>
                    <td>
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a
                              type="text"
                              @click="getItem(element.id)"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalMessasge"
                            >
                              <i
                                class="mdi mdi-pencil font-size-18 text-primary"
                              ></i>
                            </a>
                          </div>
                        </li>
                        <li class="list-inline-item">
                          <div v-if="element?.is_approved">
                            <a type="text" @click="changeStatus(element?.id)">
                              <i
                                class="mdi mdi-check font-size-18 text-primary"
                              ></i
                            ></a>
                          </div>
                          <div v-else>
                            <a type="text" @click="changeStatus(element?.id)">
                              <i
                                class="mdi mdi-close-thick font-size-18 text-danger"
                              ></i
                            ></a>
                          </div>
                        </li>
                      </ul>
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
          </div>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
    <!-------END TABLE---------------------------------------->
    <!-------START EDIT MODAL---------------------------------------->
    <div
      id="myModalMessasge"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("Circulation_Sheet_Comment") }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form @submit.prevent="updateItem">
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-input" class="form-label">{{
                  $t("Circulation_Sheet_Comment")
                }}</label>
                <a-textarea
                  v-model:value="modalData.description"
                  :auto-size="{ minRows: 4.5, maxRows: 6 }"
                />
              </a-form-item>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close") }}
                </button>
                <button
                  class="btns c-save"
                  data-bs-dismiss="modal"
                  type="submit"
                >
                  <i
                    class="mdi mdi-content-save font-size-14 align-middle me-1"
                  ></i>
                  {{ $t("Save") }}
                </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END EDIT MODAL---------------------------------------->
  </div>
</template>

<style lang="scss">
.circulationSheetCheckPage {
  .table-row {
    grid-template-columns: 50px auto 120px 150px 280px 100px 250px 120px;
  }

  .fa-circle-check {
    color: #208b3a;
    border-color: #208b3a;
    font-size: 20px;
  }

  .fa-circle-xmark {
    color: red;
    font-size: 20px;
  }
}
</style>
