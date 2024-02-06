<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { educationList, eduFormList } from "@/utils/api/reference/index";
import { academicGroupById, eduPlanById } from "@/utils/api/reference/id";
import { getListGraphSome } from "@/utils/api/performance/graph";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  edu_type_id: null,
  academic_group_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  academicGroupOptions: null,
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
});

watch(
  () => apiData.edu_type_id,
  async (newVal) => {
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
async function onSubmit() {
  await fetchList();
}
async function fetchList(page?: number) {
  let params: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData.search) params.search = apiData.search;
  if (apiData.edu_type_id) params.edu_type_id = apiData.edu_type_id;
  if (apiData.edu_form_id) params.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_plan_id) params.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_group_id)
    params.academic_group_id = apiData.academic_group_id;
  isLoading.value = true;

  try {
    if (loader.value) {
      loader.value = false;

      const res = await getListGraphSome(params);
      Object.assign(apiData, res.result);

      setTimeout(() => {
        loader.value = true;
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
// async function countGpa(id: number) {
//     try {
//         isLoading.value = true;
//         await gpaEval(id);
//         notif.success(t("Student_GPA_of_name_recalculated_successfully"));
//     } catch (error: any) {
//         notif.error(t("Request_failed1") + ": " + error.message);
//     } finally {
//         isLoading.value = false;
//     }
// }
</script>
<template>
  <div pagetitle="`Shaxsiy grafik qo'shish`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Performance_Ptt_Edit") }}</h5>
          <div class="panel-toggles">
            <router-link :to="`/performance/graphic`"
              ><button class="btns black-c me-2 py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Back") }}
              </button></router-link
            >
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
          <form @submit.prevent="onSubmit" class="row">
            <!-- //o'Fakultetni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- //Ta'lim turi  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_type_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //Ta'lim shakli  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_form_id"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //mutaxassislikni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-xl-6 form--item">
              <a-space>
                <a-input
                  v-model:value="apiData.search"
                  id="yu"
                  class="form-control"
                  allow-clear
                />
              </a-space>
              <label for="yu">{{
                $t("Search_by_Name_Student_ID_Passport_PIN")
              }}</label>
            </div>
            <!-- //search button  -->
            <div class="my-2 col-xl-3">
              <button type="submit" class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                >{{ $t("Search") }}
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
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-all-graph-create">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-all-graph-create"
                    v-for="(element, index) in apiData.data"
                    :key="index"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.fullname }}
                    </td>
                    <td>
                      {{ element?.specialty?.edu_type?.name }}
                    </td>
                    <td>
                      {{ element?.specialty?.name }}
                    </td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                    <td>
                      <div class="action__td">
                        <router-link
                          class="btns c-save py-1 px-2 me-2"
                          :to="
                            '/performance/graphic/add' + '?id=' + element?.id
                          "
                        >
                          <i class="mdi mdi-plus"></i>
                          {{ $t("add") }}
                        </router-link>
                      </div>
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
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
  </div>
</template>

<style lang="scss">
.table-row-all-graph-create {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 200px 280px 150px 120px;
}

.c-save {
  display: inline-block;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
}
</style>
