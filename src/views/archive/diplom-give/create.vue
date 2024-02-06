<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { educationList, eduFormList, diplomTypes } from "@/utils/api/reference";
import { getListStudents, changeStatus } from "@/utils/api/archive/give";

import {
  getAcademicGroupsBySpecialId,
  getSpecialByEduType,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  search: "",
  specialty_id: null,
  edu_type_id: null,
  academic_group_id: null,
  edu_form_id: null,
  diplom_category_id: null,
  data: [],
  links: [],
  students: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  specialOptions: null,
  academicGroupOptions: null,
  diplomTypeOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
  sideFormOptions.diplomTypeOptions = await diplomTypes().then(
    (res) => res.result
  );
});

watch(
  () => apiData.edu_type_id,
  async () => {
    await fetchList();
    apiData.specialty_id = null;
    sideFormOptions.specialOptions = null;
    if (apiData.edu_type_id) {
      sideFormOptions.specialOptions = await getSpecialByEduType(
        apiData.edu_type_id
      ).then((res) => res.result?.data);
    }
  }
);

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

watch(
  () => apiData.edu_form_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.diplom_category_id,
  async () => {
    await fetchList();
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
  () => [apiData.edu_form_id, apiData.academic_group_id],
  async (newVal, newVal2) => {
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
  () => apiData.academic_group_id,
  async () => {
    await fetchList();
  }
);

async function transferGroup() {
  try {
    isLoading.value = true;
    clearErrors();
    let datas = {};
    if (apiData.page > 1) datas.page = apiData?.page;
    Object.assign(datas, {
      students: apiData.students,
      specialty_id: apiData.specialty_id2,
      academic_group_id: apiData.academic_group_id2,
      semester_id: apiData.semester_id2,
      command_id: apiData.command_id,
    });
    notif.success(t("Data_success__transfer__semester"));
    clearAllSelect();
    apiData.students = [];
    fetchList();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

const errors = reactive({});

async function onSearch() {
  await fetchList();
}

async function fetchList(page?: number) {
  let datas: any = {
    page: apiData?.page,
  };
  if (!page) datas.page = page;
  if (apiData.search.length > 0) datas.search = apiData?.search;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  if (apiData.specialty_id) datas.specialty_id = apiData?.specialty_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  if (apiData.diplom_category_id)
    datas.diplom_category_id = apiData?.diplom_category_id;
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
</script>

<template>
  <div pagetitle="'Diplom berish'" class="award">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("archive_Diploma") }}</h5>
          <div class="panel-toggles">
            <router-link to="/archive/diplom-give"><button class="btns black-c py-1.5 px-4 me-2" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1"></i>{{ $t("Prev") }}
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

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <!-- //Ta'lim turi  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose_Education_Type')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <!-- //Ta'lim shakli  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions" :placeholder="t('Choose_Education_Form')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>
            <!-- //Mutaxassislik  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.specialty_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.specialOptions" :disabled="!apiData.edu_type_id"
                  :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>

            <!-- //Guruhni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.specialty_id" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <!-- //Diplom toifasini tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.diplom_category_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.diplomTypeOptions" :placeholder="t('choose_diplom_type')">
                </a-select>
              </a-space>

              <label for="yu">{{ $t("choose_diplom_type") }}</label>
            </div>
            <div class="my-2 col-xl-7 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear /> </a-space><label
                for="yu">{{
                  $t("Search_by_Diploma_Number_Register_Number")
                }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color" @click="onSearch">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
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
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-gived2">
                <th>#</th>
                <th>{{ $t("Student") }}</th>
                <th>{{ $t("Education_Type") }}</th>

                <th>{{ $t("academic_Register_Number") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-gived2" v-for="(element, index) in apiData.data" :key="element.id">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  <router-link :to="'/archive/diplom-give/edit?id=' + element?.id">
                    {{ element.fullname }}
                    <span class="badge bg-success">{{
                      element.status_form
                    }}</span>
                  </router-link>
                </td>
                <td>{{ element.edu_type }}</td>
                <td>
                  <router-link :to="'/archive/diplom-give/edit?student_id=' + element?.id"
                    class="btns c-save py-1.5 px-4 w-100 d-inline-block mb-2 text-center">
                    <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("archive_Diploma_Create") }}
                  </router-link>
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
    <span class="element-count mb-2">{{ apiData?.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-gived2 {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 40px auto 180px 200px;
}
</style>
