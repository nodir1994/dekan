<script setup lang="ts">
import { allDate, allTables } from "../../data";

import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import { academicYearsList } from "@/utils/api/reference";
import {
  getListStudentsShow,
  changeStatus,
  students,
} from "@/utils/api/archive/academic-note";

import {
  academicGroupById,
  eduPlanByAcademicYear,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";

const userStore = useUserStore();
const deanId = reactive({});

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData = reactive({
  edu_plan_id: null,
  academic_year_id: null,
  academic_group_id: null,
  student_id: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  academicYearsOptions: null,
  eduPlanOptions: null,
  academicGroupOptions: null,
  studentOptions: null,
});

const loader = ref(true);

onMounted(async () => {
  sideFormOptions.academicYearsOptions = await academicYearsList().then(
    (res) => res.result.data
  );
});

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;

    if (apiData.edu_plan_id) {
      let res = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map((item) => {
        return { id: item.id, name: item.name };
      });
    }
  }
);

watch(
  () => apiData.academic_group_id,
  async (newValue) => {
    apiData.student_id = null;
    sideFormOptions.studentOptions = null;
    if (newValue) {
      sideFormOptions.studentOptions = await students(newValue).then((res) =>
        res.result.data.map((item) => {
          return {
            id: item.id,
            name: item?.name + " " + item?.surname,
          };
        })
      );
    }
  }
);

watch(
  () => apiData.academic_year_id,
  async (newValue) => {
    await fetchList();
    apiData.edu_plan_id = null;
    sideFormOptions.eduPlanOptions = null;
    if (newValue) {
      sideFormOptions.eduPlanOptions = await eduPlanByAcademicYear(
        newValue
      ).then((res) => res.result.data);
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

async function fetchList(page?: number) {
  isLoading.value = true;
  let datas: any = {
    page: page,
    per_page: apiData.per_page
  };
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData?.edu_plan_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData?.academic_year_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  if (apiData.student_id) datas.student_id = apiData?.student_id;
  try {
    if (loader.value && apiData.student_id) {
      loader.value = false;
      const res = await getListStudentsShow(datas);
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
  <div pagetitle="`Baholarni ko'rish`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/academic-note">{{ $t("archive") }}
            </router-link>
            / {{ $t("archive_Academic_Record_View") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/archive/academic-note" class="btns black-c py-1.5 px-4 d-inline-block me-2">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
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
            <!-- //o'quv yili  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_year_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearsOptions" :placeholder="t('Choose_Education_Year')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.academic_year_id" :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <!-- //guruh  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_plan_id" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.student_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.academic_group_id" :options="sideFormOptions.studentOptions"
                  :placeholder="t('Choose_Student')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Student") }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color" @click="fetchList()" :disabled="!apiData.student_id">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
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
                  <tr class="table-row-note-view">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Subjects") }}</th>
                    <th>{{ $t("Total_Acload") }}</th>
                    <th>{{ $t("Score") }}</th>
                    <th>{{ $t("gradeSome") }}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-note-view" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.student }}
                    </td>
                    <td>
                      {{ element?.academic_year }}
                    </td>
                    <td>{{ element?.semester }}-{{ $t("semester_number") }}</td>
                    <td>
                      {{ element?.subject }}
                    </td>
                    <td>{{ element?.load }}</td>
                    <td>{{ element?.ball }}</td>
                    <td>{{ element?.grade }}</td>
                    <td>
                      <div class="form-check form-switch my-auto">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                          :checked="element?.status" :disabled="isLoading" @change="updateStatus(element?.id)" />
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
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-note-view {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 250px 140px 150px 180px 70px 90px 90px;

  @media (max-width: 767px) {
    // grid-template-columns: 50px 200px 200px 140px 150px 180px 70px;
  }
}
</style>
