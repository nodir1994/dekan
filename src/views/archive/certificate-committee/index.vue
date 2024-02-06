<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import {
  academicYearsList,
  educationList,
  departmentList,
} from "@/utils/api/reference";
import { dakList, dakStatusChange } from "@/utils/api/additional";
import { useNotyf } from "@/composable/useNotyf";
import { useI18n } from "vue-i18n";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const optionsAcademicYearList = ref();
const optionsEduTypeList = ref();
const optionsDepartment = ref();
const isRefreshLoader = ref(true)
const apiData: {
  current_page: number;
  data: any[];
  links: [];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams: any = reactive({
  department_id: null,
  academic_year_id: null,
  edu_type_id: null,
  page: 1,
  per_page: helpers.pagePer,
});

onMounted(async () => {
  optionsAcademicYearList.value = await academicYearsList().then(
    (res) => res.result.data
  );
  optionsEduTypeList.value = await educationList().then((res) => res.result);
  optionsDepartment.value = await departmentList().then((res) => res.result);
});

watch(
  () => [
    apiParams.academic_year_id,
    apiParams.edu_type_id,
    apiParams.department_id,
  ],
  async (newVal, oldVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    await fetchList(newVal);
  }
);

await fetchList();

async function fetchList(newVal?: number) {
  isLoading.value = true
  delete apiParams.page
  let datas: any = reactive({
    ...apiParams,
    page: newVal || 1
  })
  try {
    if (isRefreshLoader.value) {
      isRefreshLoader.value = false
      const res = await dakList(datas);
      Object.assign(apiData, res.result);
      setTimeout(() => {
        isRefreshLoader.value = true
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}

async function updateStatus(id: number) {
  try {
    isLoading.value = true;
    await dakStatusChange(id);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div :pagetitle="$t('DAK results')" class="certificatePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("DAK list") }}</h5>
          <div class="panel-toggles">
            <router-link to="/archive/certificate-committee/create" class="btns c-save py-1.5 px-4 me-3">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("add") }}
            </router-link>
            <router-link to="/archive/certificate-committee/certificate-committee-member"
              class="btns application-color py-1.5 px-4 me-3">
              <i class="fas fa-users me-1"></i>{{ $t("Members") }}
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
            <!-- //ta'lim turi  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" v-model:value="apiParams.edu_type_id"
                  :options="optionsEduTypeList" :field-names="{ value: 'id', label: 'name' }" allow-clear show-search>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //o'quv yili  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" v-model:value="apiParams.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="optionsAcademicYearList" allow-clear
                  show-search>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>

            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" v-model:value="apiParams.department_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="optionsDepartment" allow-clear show-search>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Department") }}</label>
            </div>
            <!-- //ta'lim shakli  -->
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
            <div class="table-responsive" v-if="apiData.data.length">
              <table class="content-table">
                <thead>
                  <tr class="table-row">
                    <th>#</th>
                    <th>{{ $t("Name") }} <sup> ⚬</sup></th>
                    <th>{{ $t("Publication_Property_Type") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Department") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Members_count") }}</th>
                    <th>{{ $t("Actions") }}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row" v-for="(element, index1) in apiData?.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index1 +
                        1
                      }}
                    </td>
                    <td>
                      {{ element.name }}
                    </td>
                    <td>
                      {{ element.type }}
                    </td>
                    <td>
                      {{ element.edu_type }}
                    </td>
                    <td>
                      {{ element.specialty }}
                    </td>
                    <td>
                      {{ element.department }}
                    </td>
                    <td>
                      {{ element.academic_year }}
                    </td>
                    <td>
                      {{ element.dak_members_count }}
                    </td>
                    <td class="justify-content-center">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link :to="`/archive/certificate-committee/edit/${element.id}`">
                              <i class="mdi mdi-pencil"></i>
                            </router-link>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <div class="form-check form-switch my-auto">
                        <input class="form-check-input" type="checkbox" :checked="element.status" :disabled="isLoading"
                          @change="updateStatus(element?.id)" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page" :loading="isLoading" />
              <!-------------END PAGINATION-------------->
            </div>
            <div class="table-responsive" v-else>
              <NoData />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
    <span class="element-count mb-2" v-if="apiData?.total">{{ apiData?.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
  </div>
</template>

<style lang="scss">
.certificatePage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 80px 140px 190px 250px 120px 120px 90px 90px;

    @include mobile() {
      grid-template-columns: 50px 200px 80px 120px 100px 300px 100px 100px 70px 70px;
    }
  }
}
</style>
