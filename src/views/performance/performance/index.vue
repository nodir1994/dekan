<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";

import { eduPlanList, eduPlanListAll } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
} from "@/utils/api/reference/id";

import {
  getListPerformance,
  getListSubjectsById,
} from "@/utils/api/performance/performance";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const params = reactive({});

const deanId = computed(() => userStore?.user?.faculty?.name);
const userStore = useUserStore();
const apiData: any = reactive({
  search: "",
  data: [],
  edu_plan_id: null,
  academic_year_id: null,
  course: null,
  semester_id: null,
  academic_group_id: null,
  subject_id: null,
  per_page: null,
  current_page: null,
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  courseBottomOptions: null,
  subjectOptions: null,
});

const loader = ref(true);

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
    apiData.subject_id = null;
    sideFormOptions.academicYearsOptions = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.subjectOptions = null;

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
  () => apiData.semester_id,
  async () => {
    apiData.subject_id = null;
    sideFormOptions.subjectOptions = null;

    if (apiData.edu_plan_id && apiData.semester_id) {
      let res = await getListSubjectsById(
        apiData.edu_plan_id,
        apiData.semester_id
      );
      // console.log(res, 'res')
      sideFormOptions.subjectOptions = res?.result?.map((item: any) => {
        return { id: item?.subject?.id, name: item?.subject?.name };
      });
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

async function onSearch() {
  await fetchList();
}

async function fetchList(page: Number = 1) {
  isLoading.value = true;
  try {
    Object.assign(params, apiData);
    if (apiData.semester_id && apiData.academic_group_id) {
      loader.value = false;
      const params = {
        semester_id: apiData.semester_id,
        academic_group_id: apiData.academic_group_id,
        page,
      };
      const res = await getListPerformance(params);
      Object.assign(apiData, res?.result);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`Reyting qaytnoma`" class="performancePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Performance_Performance") }}</h5>
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
          <form class="row" @submit.prevent>
            <!-- //o'Fakultetni tanlang  -->
            <div class="my-2 col-xl-6 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- //o'quv reja  -->
            <div class="my-2 col-xl-6 form--item">
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
            <div class="my-2 col-xl-3 form--item">
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

            <!-- //Semestr  -->
            <div class="my-2 col-xl-3 form--item">
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

            <!-- //mutaxassislikni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
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
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>

            <!-- // view -->
            <div class="my-2 col-xl-3">
              <button
                :disabled="
                  !apiData.edu_plan_id ||
                  !apiData.academic_group_id ||
                  !apiData.academic_year_id ||
                  !apiData.semester_id
                "
                @click="onSearch"
                class="btn-search c-save"
                type="submit"
              >
                <i class="mdi mdi-eye me-2"></i>{{ $t("View") }}
              </button>
            </div>
          </form>
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
            <!-- {{ apiData }} -->
            <div v-if="apiData.data.length > 0" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>#</th>
                    <th>{{ $t("Group_name") }}</th>
                    <th>{{ $t("Subjects") }}</th>
                    <th>{{ $t("Exam_Type") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>

                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="(element, index) in apiData.data"
                    :key="element.id"
                  >
                    <td>{{ index + 1+ ((apiData.current_page-1)*apiData.per_page) }}</td>
                    <td>
                      <router-link
                        :to="{
                          path: '/performance/performance/' + element.id,
                        }"
                      >
                        {{ element?.academic_group }}</router-link
                      >
                    </td>
                    <td>{{ element?.subject }}</td>
                    <td>
                      {{ element?.exam_type }} |
                      {{ element?.final_exam_position }}
                    </td>
                    <td>{{ element?.semester?.academic_year }}</td>
                    <td>
                      {{ element?.semester?.semester }} - {{ $t("semestr") }}
                    </td>
                    <td>
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <router-link
                            :to="{
                              path: '/performance/performance/' + element.id,
                            }"
                          >
                            <i class="far fa-eye font-size-16 text-primary"></i>
                          </router-link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                v-if="apiData.data.length"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
              />
            </div>
            <div v-else>
              <h5 class="text-center">{{ $t("No_data") }}</h5>
              <p class="text-center">
                {{ $t("No_information_found") }}
              </p>
            </div>
          </div>
        </div>
        <span v-if="apiData.total" class="element-count mb-2"
          >{{ apiData.current_page }}-{{
            apiData?.data.length +
            apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.performancePage {
  .table-row {
    grid-template-columns: 50px 130px auto 250px 140px 100px 100px;

    @include mobile() {
      grid-template-columns: 50px 130px 200px 250px 100px 90px 60px;
    }
  }
}
</style>
