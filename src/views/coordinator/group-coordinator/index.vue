<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import { eduPlanListAll } from "@/utils/api/reference/index";

import {
  academicYearsById,
  semesterById,
  academicGroupById,
  getAcademicGroupsBySemesterId,
} from "@/utils/api/reference/id";

import { getCoordinatorGroupsList } from "@/utils/api/coordinator/groups";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const params = reactive({});
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  current_page: 1,
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

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanListAll().then(
    (res) => res?.result?.data
  );
});

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
  () => apiData.edu_plan_id,
  async () => {
    apiData.academic_year_id = null;
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    // sideFormOptions.academicYearsOptions = null;
    sideFormOptions.academicGroupOptions = null;
    sideFormOptions.semesterOptions = null;

    await fetchList();

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

    await fetchList();

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
  () => apiData.semester_id,
  async () => {
    await fetchList();
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
      await fetchList();
    }
  }
);

async function fetchList(page?: number) {
  let datas: any = {
    page: apiData?.page,
  };
  if (!page) datas.page = page;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData?.edu_plan_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData?.academic_year_id;
  if (apiData.semester_id) datas.semester_id = apiData?.semester_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await getCoordinatorGroupsList(datas);
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
  <div pagetitle="'Kordinator'" class="group-coordinator">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("coordinator_groups") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filter") }}
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
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  :value="deanId"
                  :field-names="{ value: 'id', label: 'name' }"
                  disabled
                  allow-clear
                  show-search
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Please_select_curriculum") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_plan_id"
                  :options="sideFormOptions.academicYearsOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.semester_id"
                  :field-names="{ value: 'semester', label: 'name' }"
                  :options="sideFormOptions.semesterOptions"
                  :disabled="!apiData.academic_year_id"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Semester") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                  :disabled="!apiData.edu_plan_id"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-schedule">
                <th>#</th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("study_plan") }}</th>
                <th>{{ $t("Curriculum_Education_Year") }}</th>
                <th>{{ $t("coordinator_fish") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-schedule"
                v-for="(element, index) in apiData.data"
                :key="element?.id"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>

                <td>
                  <router-link
                    :to="{
                      path: '/coordinator/group-coordinator/' + element?.id,
                      query: {
                        groupName: element?.academic_group?.name,
                        semester_id: element?.semester?.id,
                      },
                    }"
                    class="actions-h me-1 mt-1"
                  >
                    {{ element?.academic_group?.name }}
                  </router-link>
                </td>
                <td>
                  {{ element?.edu_plan?.name }}
                </td>
                <td>
                  {{ element?.semester?.academic_year }}
                </td>
                <td>
                  {{ element.fullname }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->

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
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.group-coordinator {
  .table-row-schedule {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 300px auto 200px 300px;

    @include mobile() {
      grid-template-columns: 40px 170px 100px 100px;
    }
  }

  .actions-h {
    &:hover {
      color: white;
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
  }

  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;

      &:last-child,
      &:first-child {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
