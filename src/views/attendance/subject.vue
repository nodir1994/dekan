<script setup lang="ts">
import { allDate, allTables } from "../data";

import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { eduPlanList, eduPlanListAll } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
} from "@/utils/api/reference/id";

import { getListData } from "@/utils/api/attendance/subject";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const loader = ref(true);
const params = reactive({});

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  current_page: 1,
  students: [],
  subjects: [],
  data: [],
  per_page: helpers.pagePer,
  links: [],
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
});

// await fetchList();

onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanListAll().then(
    (res) => res?.result?.data
  );
});

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.academic_year_id = null;
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.academicYearsOptions = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.semesterOptions = null;

    // await fetchList();

    if (apiData.edu_plan_id) {
      let res = await academicYearsById(apiData.edu_plan_id);
      sideFormOptions.academicYearsOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
      let res2 = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res2?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
    }
  }
);

watch(
  () => apiData.academic_year_id,
  async () => {
    apiData.semester_id = null;
    sideFormOptions.semesterOptions = null;
    // await fetchList();

    if (apiData.edu_plan_id && apiData.academic_year_id) {
      let res = await semesterById(apiData);
      console.log("res", res);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
        return {
          id: item.id,
          name:
            item.course +
            "-" +
            t("course") +
            " " +
            item.semester +
            "-" +
            t("semester"),
        };
      });
    }
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList();
    }
  }
);

async function onSearch() {
  await fetchList();
}

function clearAllSelect() {
  apiData.edu_plan_id = null;
}

async function fetchList() {
  let params: any = reactive({});
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  if (apiData.semester_id) params.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListData(params);
      Object.assign(apiData, res.result[0]);
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
  <div pagetitle="'Fanlar davomati'" class="transferPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("attendance_By_Subjects") }}</h5>
          <div class="filterBlock">
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
              >{{ $t("Filter") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------->

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="col-xl-3 form--item">
              <a-form-item class="my-2" name="nameFaculty">
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xl-3 form--item">
              <a-form-item class="my-2" name="nameFaculty">
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearsOptions"
                  :placeholder="t('Choose_Education_Year')"
                  :disabled="!apiData.edu_plan_id"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xl-3 form--item">
              <a-form-item class="my-2" name="nameFaculty">
                <a-select
                  allow-clear
                  v-model:value="apiData.semester_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose_Semester')"
                  :disabled="!apiData.academic_year_id"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xl-2 form--item">
              <a-form-item class="my-2" name="nameFaculty">
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                  :disabled="!apiData.semester_id"
                  :placeholder="t('Choose_Group')"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="my-2 col-xl-1">
              <button
                :disabled="
                  !apiData.edu_plan_id ||
                  !apiData.academic_group_id ||
                  !apiData.semester_id ||
                  !apiData.academic_year_id
                "
                class="btn-search search-color"
                @click="onSearch"
              >
                <i class="fas fa-check me-1"></i>OK
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div
              v-if="apiData?.students.length"
              class="table-responsive table-statistical"
            >
              <table>
                <thead>
                  <tr>
                    <th rowspan="2" style="min-width: 60px">#</th>
                    <th rowspan="2" style="min-width: 200px">
                      {{ $t("Fullname_of_Student") }}
                    </th>
                    <th
                      style="min-width: 160px"
                      colspan="2"
                      v-for="(item, index) in apiData?.subjects"
                      :key="index"
                    >
                      {{ item?.name }}
                    </th>
                    <th colspan="2">{{ $t("Total_Point") }}</th>
                    <!-- <th></th> -->
                  </tr>
                  <tr>
                    <!-- <th></th>
                    <th></th> -->
                    <th
                      v-for="(item, index) in 2 * apiData?.subjects.length"
                      :key="index"
                    >
                      <span v-if="index % 2 == 0">{{
                        $t("Reasonably_s")
                      }}</span>
                      <span v-else>{{ $t("uncaused_s") }}</span>
                    </th>
                    <th style="min-width: 50px">{{ $t("Reasonably_s") }}</th>
                    <th style="min-width: 50px">{{ $t("uncaused_s") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class=""
                    v-for="(element, idx) in apiData?.students"
                    :key="element.id"
                  >
                    <td>{{ idx + 1 }}</td>
                    <td style="text-align: start">
                      {{ element?.fullname }} <br />
                    </td>
                    <template
                      v-for="(item, index) in element?.caused_uncaused"
                      :key="index + '11'"
                    >
                      <td>
                        <span v-if="item?.caused > 0">{{ item?.caused }}</span>
                      </td>
                      <td>
                        <span v-if="item?.uncaused > 0">{{
                          item?.uncaused
                        }}</span>
                      </td>
                    </template>
                    <td>{{ element?.total_caused }}</td>
                    <td>{{ element?.total_uncaused }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- ------start pagination-------------- -->
              <Pagination
                v-if="apiData.last_page > 1"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
              />
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
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
  </div>
</template>

<style lang="scss">
.subject__attendance {
  width: 100%;

  th,
  td {
    border: 1px solid rgba(#eee, 0.3);
    padding: 10px 5px;
    min-width: 75px;
  }

  thead {
    th {
      font-weight: 700;
      text-align: center;
    }
  }

  tbody {
    tr {
      &:nth-child(2n) {
        background-color: rgba($color: #ccc, $alpha: 0.15);
      }
    }
  }
}
</style>
