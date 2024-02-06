<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import {
  educationList,
  eduFormList,
  academicYearsList,
} from "@/utils/api/reference/index";
import { academicGroupById, eduPlanById } from "@/utils/api/reference/id";
import { getListGpaStudentsAll, setGpa } from "@/utils/api/performance/gpa";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const plainOptions = ref([]);

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
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

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  edu_type_id: null,
  academic_group_id: null,
  academic_year_id: null,
  edu_form_id: null,
  data: [],
  students: [],
  links: [],
  subjectData: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  academicYearOptions: null,
  academicGroupOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.academicYearOptions = await academicYearsList().then(
    (res) => res.result.data
  );
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
});

watch(
  () => apiData.academic_year_id,
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
  () => apiData.edu_form_id,
  async (newVal) => {
    apiData.edu_plan_id = null;
    sideFormOptions.eduPlanOptions = null;
    if (newVal) {
      sideFormOptions.eduPlanOptions = await eduPlanById(newVal).then(
        (res) => res.result.data
      );
    }
    await fetchList();
  }
);

watch(
  () => apiData.edu_plan_id,
  async (newVal) => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (newVal) {
      let res = await academicGroupById(newVal);
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
      await fetchList(newVal);
    }
  }
);
async function onSearch() {
  await fetchList();
}
async function fetchList(page?: number) {
  let params: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData?.search?.length) params.search = apiData.search;
  if (apiData.edu_type_id) params.edu_type_id = apiData.edu_type_id;
  if (apiData.academic_year_id)
    params.academic_year_id = apiData.academic_year_id;
  if (apiData.edu_form_id) params.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  if (loader.value) {
    loader.value = false;
    const res = await getListGpaStudentsAll(params);
    Object.assign(apiData, res.result);
    console.log(res.result);
    plainOptions.value = apiData.data.map((item: any) => item.id);
    setTimeout(() => {
      loader.value = true;
    }, 100);
  }
}
async function countGpaStudents() {
  try {
    let obj = {
      students: apiData.students,
    };
    isLoading.value = true;
    await setGpa(obj);
    notif.success(t("Student_GPA_of_name_recalculated_successfully"));
  } catch (error: any) {
    notif.error(t("Request_failed1") + ": " + error.message);
  } finally {
    location.reload();
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'GPA hisoblash'" class="gpaEddPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Performance_Gpa_Add") }}</h5>
          <div class="filterBlock">
            <router-link
              to="/performance/gpa"
              class="btns black-c py-1.5 px-4 d-inline-block me-2"
            >
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Prev") }}
            </router-link>
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
          <form @submit.prevent="onSearch" class="row">
            <div class="my-2 col-xl-10 form--item">
              <a-input
                id="yu"
                class="form-control"
                v-model:value="apiData.search"
              />
              <label for="yu">{{
                $t("choose__fish__student__passport__code")
              }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                >{{ $t("Search") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
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
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Education_Form") }}</th>
                    <th>{{ $t("by_Level") }}</th>
                    <th>{{ $t("gpa") }}</th>
                    <th>{{ $t("Contract_Indebtedness") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="(element, index) in apiData.data"
                    :key="element.id"
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
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.fullname }} <br />
                      {{ element?.id }}
                    </td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                    <td>
                      {{ element?.edu_type }}
                    </td>
                    <td>
                      {{ element?.edu_form }}
                    </td>
                    <td>{{ element?.course }} - {{ t("course_number") }}</td>
                    <td>
                      {{ element?.gpa }}
                    </td>
                    <td>
                      {{ element?.debt }}
                    </td>
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
        <span class="element-count mb-2" v-if="apiData.data.length"
          >{{ apiData.current_page }}-{{
            apiData?.data.length +
            apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <a-form-item class="mb-3" name="nameFaculty">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
            </a-form-item>

            <a-form-item class="mb-3" name="nameFaculty">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearOptions"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-space>
            </a-form-item>

            <a-form-item class="mb-3" name="nameFaculty">
              <a-select
                allow-clear
                v-model:value="apiData.edu_type_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.eduTypeOptions"
                :placeholder="t('Choose_Education_Type')"
              >
              </a-select>
            </a-form-item>

            <a-form-item class="mb-3" name="nameFaculty">
              <a-select
                allow-clear
                v-model:value="apiData.edu_form_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.eduFormOptions"
                :placeholder="t('Choose_Education_Form')"
              >
              </a-select>
            </a-form-item>

            <a-form-item class="mb-3" name="nameFaculty">
              <a-select
                allow-clear
                v-model:value="apiData.edu_plan_id"
                :field-names="{ value: 'id', label: 'name' }"
                :disabled="!apiData.edu_form_id"
                :options="sideFormOptions.eduPlanOptions"
                :placeholder="$t('Please_select_curriculum')"
              >
              </a-select>
            </a-form-item>

            <a-form-item class="mb-3" name="nameFaculty">
              <a-select
                allow-clear
                v-model:value="apiData.academic_group_id"
                :disabled="!apiData.edu_plan_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.academicGroupOptions"
                :placeholder="t('Choose_Group')"
              >
              </a-select>
            </a-form-item>
            <div class="d-flex justify-content-end">
              <button
                class="btns c-save"
                :disabled="!apiData?.students?.length"
                type="button"
                @click="countGpaStudents"
              >
                <i class="mdi mdi-check font-size-14 align-middle me-1"></i
                >{{ $t("calculate_GPA") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.gpaEddPage {
  .table-row {
    grid-template-columns: 40px 50px auto 80px 140px 150px 70px 60px 60px;

    @include mobile() {
      grid-template-columns: 40px 50px 200px 100px 100px 100px 80px 80px 80px;
    }

    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }
}

.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>
