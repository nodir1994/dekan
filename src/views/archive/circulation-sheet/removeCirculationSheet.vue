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
import { studentListIn, addStudent } from "@/utils/api/archive/aylanma";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

import {
  getAcademicGroupsBySpecialId,
  eduPlanById,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";

const plainOptions: any = reactive([]);

const checkAll = computed({
  get() {
    return apiData?.students?.length === plainOptions?.value?.length;
  },
  set(val) {
    if (val) {
      apiData.students = plainOptions.value;
    } else {
      apiData.students = [];
    }
  },
});

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
  sideFormOptions.specialOptions = await specialList().then(
    (res) => res.result.data
  );
});

async function onSearch() {
  await fetchList();
}
async function addStudents() {
  try {
    isLoading.value = true;
    const res = await addStudent({ list: apiData.students });
    notif.success(t("Data_stored_successfully"));
    apiData.students = [];
    plainOptions.value = [];
    fetchList();
  } catch (error: any) {
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
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

async function fetchList(pages?: number) {
  let datas: any = {
    page: pages || 1,
    per_page: apiData.per_page,
  };
  if (apiData.search.length > 0) datas.search = apiData?.search;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  if (apiData.specialty_id) datas.specialty_id = apiData?.specialty_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await studentListIn(datas);
      Object.assign(apiData, res.result);
      plainOptions.value = res?.result?.data.map((item: any) => item.id);
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
  <div class="removeCirculationSheetPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/circulation-sheet"
              >{{ $t("Turnover_sheet") }} /
            </router-link>
            {{ $t("archive_Circulation_Sheet_Set") }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filter") }}
              </button>
            </div>
            <router-link to="/archive/circulation-sheet"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left me-2"></i>{{ $t("Prev") }}
              </button></router-link
            >
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
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-diploma-list">
                    <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll"
                        />
                      </div>
                    </th>
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Edu_form") }}</th>
                    <th>{{ $t("Specialist") }}</th>
                    <th>{{ $t("Group") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-diploma-list"
                    v-for="(element, index) in apiData.data"
                    :key="element?.id"
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="apiData.students"
                          :value="element?.id"
                        />
                      </div>
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ element.full_name }} <br />
                      {{ element.id }} / {{ element.student_status }}
                    </td>
                    <td>
                      {{ element.academic_year }} <br />
                      {{ element.semester }}-{{ $t("semester_number") }}
                    </td>
                    <td>
                      {{ element.edu_type }}
                    </td>
                    <td>
                      {{ element.edu_form }}
                    </td>
                    <td>
                      <div>
                        {{ element.specialty_code }}
                        <br />
                        {{ element.specialty }}
                      </div>
                    </td>
                    <td>
                      {{ element.academic_group }}
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
        <div class="d-flex mb-4 justify-content-between">
          <span class="element-count mb-2" v-if="apiData?.total"
            >{{ apiData?.current_page }}-{{
              apiData?.data.length +
              apiData.per_page * (apiData?.current_page - 1)
            }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span
          >
          <button
            v-if="apiData?.total"
            @click="addStudents"
            :disabled="!apiData.students.length > 0"
            class="btns c-save"
            type="button"
          >
            <i class="mdi mdi-plus me-2"></i>{{ $t("add") }}
          </button>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.removeCirculationSheetPage {
  .table-row-diploma-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px auto 120px 140px 150px 330px 120px;

    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }

    @include mobile() {
      grid-template-columns: 40px 50px 200px 100px 140px 150px 330px 120px;
    }
  }
}
</style>
