<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { eduPlanList } from "@/utils/api/reference/index";
import { academicGroupById } from "@/utils/api/reference/id";
import {
  getListAccreditations,
  changeStatus,
} from "@/utils/api/archive/accreditation";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const loader = ref(true);

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  academic_group_id: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduPlanOptions: null,
  academicGroupOptions: null,
});

await fetchList();

onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanList().then(
    (res) => res?.result?.data
  );
});

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;
    await fetchList();
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

async function fetchList(page?: number) {
  let datas: any = {
    page: apiData.page,
  };
  if (!page) {
    datas.page = 1;
  }
  if (apiData.search) datas.search = apiData.search;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await getListAccreditations(datas);
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

async function onSearch() {
  fetchList();
}
</script>
<template>
  <div pagetitle="`Akkreditatsiya`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("accreditation") }}</h5>
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
            <!-- //o'quv reja  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions" :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //Guruhni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" /></a-space>
              <label for="yu">{{
                $t("Search_by_Name_Student_ID_Passport_PIN")
              }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color" @click="onSearch">
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
                  <tr class="table-row-accreditation-index">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("student_load") }}</th>
                    <th>{{ $t("Status") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-accreditation-index" v-for="(element, index) in apiData.data" :key="element?.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <router-link :to="'/archive/accreditation/' + element.id">{{ element.student }} <br />
                        <span style="color: #ccc">
                          {{ element.edu_type }}/
                          {{ element.edu_form }}
                        </span>
                      </router-link>
                    </td>
                    <td>
                      <div>
                        {{ element.specialty }}<br />
                        <span style="color: #ccc">{{ element.edu_plan }}</span>
                      </div>
                    </td>
                    <td>
                      {{ element.academic_group }}
                    </td>
                    <td>{{ element.total_credit }}/{{ element.total_load }}</td>
                    <td>
                      <div class="form-check form-switch my-auto">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                          :checked="element.status" :disabled="isLoading" @change="updateStatus(element.id)" />
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
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-accreditation-index {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 400px 180px 150px 120px;
}

.c-save {
  &:hover {
    color: #fff;
  }
}
</style>
