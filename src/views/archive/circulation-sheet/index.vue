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
  specialListByEduForm,
} from "@/utils/api/reference";
import { getListStudents, changeDataById } from "@/utils/api/archive/aylanma";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

import {
  getAcademicGroupsBySpecialId,
  eduPlanById,
} from "@/utils/api/reference/id";
import { useSwal } from "@/composable/useSwal";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

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
  page: 1,
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
    (res) => res.result
  );
  sideFormOptions.specialOptions = await specialList().then((res) =>
    res.result?.data.map((item: any) => {
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
  () => [
    apiData.payment_type_id,
    apiData.edu_type_id,
    apiData.academic_year_id,
    apiData.academic_group_id,
    apiData.payment_type_id,
  ],
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_form_id,
  async () => {
    await fetchList();
    if (apiData.edu_form_id) {
      sideFormOptions.eduPlanOptions = await eduPlanById(
        apiData.edu_form_id
      ).then((res) => res.result?.data);
      sideFormOptions.specialOptions = await specialListByEduForm(
        apiData.edu_form_id
      ).then((res) =>
        res?.result?.data.map((item: any) => {
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
  async () => {
    // apiData.academic_group_id = null;
    // sideFormOptions.academicGroupOptions = null;

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
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
function confirmAllowed(el: any) {
  if (
    el.student_confirmations.length === 5 &&
    el.student_confirmations.every((item: any) => item.is_approved)
  )
    return true;

  return false;
}

async function onConfirm(id: number) {
  const swal = useSwal();
  try {
    const res = await swal.fire({
      title: t("Delete_message.Are_you_sure"),
      icon: "warning",
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await changeDataById(id);
      await fetchList();

      notif.success(t("Data_stored_successfully"));
    } else if (res.dismiss) {
      swal.fire(t("Canceled"), "", "success");
    }
  } catch (error: any) {
    swal.fire(t("Dashboard_Error"), error.message, "error");
  }
}
async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData.search.length > 0) datas.search = apiData?.search;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData?.academic_year_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  if (apiData.specialty_id) datas.specialty_id = apiData?.specialty_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  isLoading.value = true;
  try {
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
</script>

<template>
  <div class="circulationSheetPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Turnover_sheet") }}</h5>
          <div class="panel-toggles">
            <!-- <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download me-2"></i>Exel xisobot
            </button> -->
            <router-link to="/archive/circulation-sheet/removeCirculationSheet">
              <button class="btns c-save py-1.5 px-4 me-3" type="submit">
                <i class="mdi mdi-plus me-2"></i>{{ $t("add") }}
              </button>
            </router-link>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2">{{ $t("Filter") }}</i>
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
                  show-search
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
                  show-search
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
                  show-search
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
            <LoadingOverlay v-if="isLoading" />
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-diploma-list">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Circulation_Doc_Number") }}</th>
                    <th>{{ $t("Responsiple_checked_status") }}</th>
                    <th>{{ $t("Confirmation") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-diploma-list"
                    v-for="(element, index1) in apiData?.data"
                    :key="element.id"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index1 +
                        1
                      }}
                    </td>
                    <td>
                      {{ element.student }} <br />
                      {{ element.id }} / {{ element.edu_type }} ,
                      {{ element.edu_form }}
                    </td>
                    <td>
                      {{ element.specialty_code }}
                    </td>
                    <td>
                      {{ element.academic_year }} <br />
                      {{ element.academic_group }}
                    </td>
                    <td>
                      {{ element.document_number }}
                    </td>
                    <td>
                      <div class="d-flex flex-wrap">
                        <div
                          :class="'mb-1'"
                          v-for="(item, ind) in element?.student_confirmations"
                          :key="ind"
                        >
                          <span
                            :class="[
                              'btns1 d-block text-nowrap done-c px-1 me-1',
                              item.is_approved ? 'actions-h' : 'actions-r',
                            ]"
                          >
                            {{ item.name }}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="text-center align-middle">
                      <button
                        class="btns"
                        type="button"
                        @click="onConfirm(element.id)"
                        :disabled="!confirmAllowed(element)"
                      >
                        <i
                          v-if="element.is_approved"
                          class="mdi mdi-check font-size-18 text-primary"
                        ></i>
                        <i
                          v-else
                          class="mdi mdi-close-thick font-size-18 text-danger"
                        ></i>
                      </button>
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
        <span class="element-count mb-2" v-if="apiData?.total"
          >{{ apiData?.current_page }}-{{
            apiData?.data.length +
            apiData.per_page * (apiData?.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.circulationSheetPage {
  button:disabled {
    cursor: no-drop;
    background-color: unset !important;
  }
  .table-row-diploma-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 200px 140px 150px 380px 120px;

    @include mobile() {
      grid-template-columns: 50px 200px 200px 140px 150px 380px 70px;
    }
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
