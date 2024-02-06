<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";

import { eduPlanList } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
} from "@/utils/api/reference/id";

import { getListSummary } from "@/utils/api/performance/summary";

const { t } = useI18n();
const params = reactive({});
const apiData: any = reactive({
  search: "",
  data: [],
  edu_plan_id: null,
  academic_year_id: null,
  course: null,
  semester_id: null,
  academic_group_id: null,
  current_page: 1,
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
});

const isLoading = ref(false);

onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanList().then(
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
    if (apiData.edu_plan_id && apiData.academic_year_id) {
      let res = await semesterById(apiData);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
        return {
          id: item.id,
          semester: item.semester,
          name:
            item.course +
            "-" +
            t("Course") +
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

async function fetchList() {
  try {
    isLoading.value = true;
    let datas: any = reactive({});
    if (apiData.semester_id) datas.semester_id = apiData.semester_id;
    if (apiData.academic_year_id)
      datas.academic_year_id = apiData.academic_year_id;
    if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
    if (apiData.academic_group_id)
      datas.academic_group_id = apiData.academic_group_id;

    const res = await getListSummary(datas);
    Object.assign(apiData, res.result);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="`Jamlanma qaytnoma`" class="summaryPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Performance_Summary") }}</h5>
          <div class="panel-toggles">
            <!-- <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>Export
            </button> -->
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
          <form class="row" @submit.prevent="onSearch">
            <!-- //o'quv reja  -->
            <div class="my-2 col-md-7 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <!-- //o'quv yili  -->
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearsOptions"
                  :disabled="!apiData.edu_plan_id"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //semestr  -->
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.semester_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions"
                  :disabled="!apiData.academic_year_id"
                  :placeholder="t('Choose_Semester')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>
            <!-- //guruh  -->
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                  :disabled="!apiData.edu_plan_id"
                  :placeholder="t('Choose_Group')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-md-2">
              <button
                :disabled="
                  !apiData.academic_group_id ||
                  !apiData.semester_id ||
                  !apiData.academic_year_id ||
                  !apiData.edu_plan_id
                "
                type="submit"
                class="btn-search search-color"
              >
                <i class="mdi mdi-search-web me-2"></i>{{ $t("search") }}
              </button>
            </div>
          </form>
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
            <div
              v-if="apiData?.subjects?.length > 0"
              class="table-responsive table-statistical"
            >
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th class="text-start">
                      {{ $t("Fullname_of_Student") }}
                    </th>
                    <th v-for="item in apiData?.subjects" :key="item.id">
                      {{ item.name }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(element, index) in apiData?.students"
                    :key="element.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td style="text-align: start">
                      {{ element?.fullname }}
                    </td>
                    <td v-for="(item, i) in element.ratings" :key="i">
                      {{ item.rating ? item.rating : 0 }}[{{
                        item.position ? item.position : 0
                      }}]
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
        <span class="element-count mb-2" v-if="apiData.data.length"
          >{{ apiData.current_page }}-{{
            apiData.data.length + apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.summaryPage {
  table {
    // display: table-row;
    width: 100% !important;

    tr {
      td,
      th {
        max-width: inherit;
        width: 100%;

        &:nth-child(1) {
          width: 50px;
        }

        &:nth-child(2) {
          max-width: inherit;
          min-width: 100px;
          width: 100%;
        }
      }
    }
  }
}
</style>
