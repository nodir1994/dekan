<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { academicYearsList, eduPlanListAll } from "@/utils/api/reference/index";

import {
  semesterByIdOnlyAcademicYearEduPlan,
  getSubjectsBySemestrId,
  academicGroupById,
} from "@/utils/api/reference/id";

import { getJournalList } from "@/utils/api/attendance/journal";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  edu_plan_id: null,
  academic_year: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  subject_id: null,
  current_page: 1,
  data: [],
  per_page: helpers.pagePer,
  links: [],
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  subjectOptions: null,
});

const loader = ref(true);

apiData.academic_year = await academicYearsList().then((res) =>
  res.result.data.find((item: any) => item?.is_current == true)
);

await fetchList();
onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanListAll().then(
    (res) => res?.result?.data
  );

  // apiData.academic_year_id = apiData.academic_year?.name
});

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.semesterOptions = null;
    await fetchList();

    if (apiData.edu_plan_id) {
      sideFormOptions.semesterOptions =
        await semesterByIdOnlyAcademicYearEduPlan(
          apiData.edu_plan_id,
          apiData.academic_year?.id
        ).then((res) =>
          res?.result?.data.map((item: any) => {
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
          })
        );
      sideFormOptions.academicGroupOptions = await academicGroupById(
        apiData.edu_plan_id
      ).then((res) => res?.result?.data);
    }
  }
);

watch(
  () => apiData.academic_group_id,
  async () => {
    await fetchList();
    if (apiData.academic_group_id && apiData.semester_id) {
      sideFormOptions.subjectOptions = await getSubjectsBySemestrId(
        apiData.edu_plan_id,
        apiData.semester_id
      ).then((res) =>
        res?.result.map((item: any) => {
          return {
            id: item?.subject?.id,
            name: item?.subject?.name,
          };
        })
      );
    }
  }
);

watch(
  () => apiData.semester_id,
  async () => {
    await fetchList();
    if (apiData.academic_group_id && apiData.semester_id) {
      sideFormOptions.subjectOptions = await getSubjectsBySemestrId(
        apiData.edu_plan_id,
        apiData.semester_id
      ).then((res) =>
        res?.result.map((item: any) => {
          return {
            id: item?.subject?.id,
            name: item?.subject?.name,
          };
        })
      );
    }
  }
);

watch(
  () => apiData.subject_id,
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

async function fetchList(pages?: number) {
  let datas: any = reactive({
    page: pages || 1,
    per_page: apiData.per_page,
  });
  if (apiData.page > 1) datas.page = apiData?.page;
  datas.academic_year_id = apiData.academic_year?.id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.subject_id) datas.subject_id = apiData.subject_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  try {
    isLoading.value = true;
    if (loader.value && apiData.academic_year) {
      loader.value = false;
      const res = await getJournalList(datas);
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
  <div pagetitle="`Davomat jurnali`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Davomat jurnali</h5>
          <div class="panel-toggles">
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
                <a-select allow-clear disabled :value="apiData?.academic_year?.name || null"
                  :placeholder="t('Choose_Education_Year')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>

            <div class="my-2 col-xl-3 form--item">
              <div class="mb-3" name="nameFaculty">
                <a-space>
                  <a-select allow-clear v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                    :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                  </a-select>
                </a-space>
                <label>{{ $t("Please_select_curriculum") }}</label>
              </div>
            </div>

            <!-- //Semestr  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.semester_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions" :disabled="!apiData.edu_plan_id"
                  :placeholder="t('Choose_Semester')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>

            <!-- //mutaxassislikni tanlang  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.academic_group_id" :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>

            <!-- //Fanlar  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select allow-clear v-model:value="apiData.subject_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_plan_id || !apiData.semester_id" :options="sideFormOptions.subjectOptions"
                  :placeholder="t('Choose_Subject')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Subject") }}</label>
            </div>

            <!-- //search button  -->
            <!-- <div class="my-2 col-xl-2">
                  <button class="btn-search search-color" @click="onSearch">
                    <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
                  </button>
                </div> -->
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
            <div v-if="apiData?.data?.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-diploma-list journal">
                    <th>#</th>
                    <th>{{ $t("Group_Name") }}</th>
                    <th>{{ $t("Subject") }}</th>
                    <th>{{ $t("Training") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-diploma-list journal" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.academic_group?.name }}
                    </td>
                    <td>
                      {{ element?.subject?.name }}
                    </td>
                    <td>
                      {{ element?.lesson_activity?.name }}
                    </td>
                    <td>
                      {{ apiData.academic_year?.name }}
                    </td>
                    <td>
                      {{ element?.semester?.semester }}-{{
                        $t("semester_number")
                      }}
                    </td>
                    <td>
                      <div class="action__td">
                        <router-link class="btns c-save py-1 px-2 me-2"
                          :to="`/attendance/journal/id?semester_id=${element?.semester?.id}&academic_group_id=${element?.academic_group?.id}&subject_id=${element?.subject?.id}&lesson_activity_id=${element?.lesson_activity?.id}`">
                          <i class="mdi mdi-eye me-1"></i>
                          {{ $t("Preview") }}
                        </router-link>
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
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-diploma-list.journal {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px 200px auto 160px 160px 130px 150px;
}

.action__td {
  display: flex;
  align-items: center;

  a,
  button {
    white-space: nowrap;
    color: #fff;
  }
}
</style>
