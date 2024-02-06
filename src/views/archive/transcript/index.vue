<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import { educationList, eduFormList } from "@/utils/api/reference";
import { getListStudents } from "@/utils/api/archive/transcript";
import {
  semesterByIdOnlyEduPlan,
  getSpecialByEduType,
  academicGroupById,
  eduPlanById,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";

const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const params = reactive({});

const apiData: any = reactive({
  search: "",
  specialty_id: null,
  edu_plan_id: null,
  edu_type_id: null,
  academic_group_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions: any = reactive({
  eduTypeOptions: null,
  specialOptions: null,
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
  async () => {
    await fetchList();
    apiData.specialty_id = null;
    sideFormOptions.specialOptions = null;
    if (apiData.edu_type_id) {
      sideFormOptions.specialOptions = await getSpecialByEduType(
        apiData.edu_type_id
      ).then((res) =>
        res.result?.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name + "-" + `(${item.code})`,
          };
        })
      );
    }
  }
);

watch(
  () => apiData.edu_form_id,
  async () => {
    apiData.edu_plan_id = null;
    await fetchList();
    if (apiData.edu_form_id) {
      sideFormOptions.eduPlanOptions = await eduPlanById(
        apiData.edu_form_id
      ).then((res) => res.result?.data);
    }
  }
);

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (apiData.edu_plan_id) {
      let res = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );

      let res2 = await semesterByIdOnlyEduPlan(apiData.edu_plan_id);
      sideFormOptions.semesterOptions = res2?.result?.data.map((item: any) => {
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

function clearAllSelect() {
  apiData.search = "";
  apiData.edu_form_id = null;
  apiData.edu_type_id = null;
  apiData.edu_plan_id = null;
}

function clearErrors() {
  Object.assign(errors, {
    command_id: [],
    reference_id: [],
    students: [],
  });
}

const errors = reactive({
  command_id: [],
  reference_id: [],
  students: [],
});

async function fetchList(page?: number) {
  let datas: any = {
    page: page,
    per_page: apiData.per_page
  };
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  if (apiData.specialty_id) datas.specialty_id = apiData?.specialty_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData?.edu_plan_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
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
  <div pagetitle="`Transkript`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("archive_Transcript") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link to="/archive/transcript/create" class="btns d-inline-block c-save py-1.5 px-4 me-3">
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("add") }}
              </router-link>
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
            <!-- //o'Fakultetni tanlang  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- //Ta'lim turi  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose_Education_Type')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //Mutaxassislik  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.specialty_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.specialOptions" :disabled="!apiData.edu_type_id"
                  :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>

            <!-- //Ta'lim shakli  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions" :placeholder="t('Choose_Education_Form')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_form_id" :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //Guruhni tanlang  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.specialty_id" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
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
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-transcript-index">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t('Number') }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-transcript-index" v-for="(element, index) in apiData.data" :key="element?.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div>
                        {{ element?.full_name }} <br />
                        <span style="color: #ccc">{{ element?.id }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.edu_type }}<br />
                        <span style="color: #ccc">{{ element?.edu_form }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.speciality }}<br />
                        <span style="color: #ccc">{{ element?.shifr }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.group }}<br />
                        <span style="color: #ccc">{{
                          element?.specialty
                        }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.number }} <br />
                        <span style="color: #ccc">{{
                          element?.given_date
                        }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="action__td">
                        <router-link class="btns c-save py-1 px-2 me-2"
                          :to="'/archive/transcript/edit?id=' + element?.id">
                          <i class="mdi mdi-eye"></i>
                          {{ $t("View") }}
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
        <span v-if="apiData?.total" class="element-count mb-2">{{ apiData?.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData?.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-transcript-index {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 200px 240px 200px 180px 140px;
}

.c-save {
  &:hover {
    color: #fff;
  }
}
</style>
