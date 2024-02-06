<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";

import { educationList, eduFormList } from "@/utils/api/reference";
import {
  getCoordinatorListAll,
  updateStatusCoordinator,
} from "@/utils/api/coordinator/list";
import helpers from "@/utils/helper";

const route: any = useRoute();
const id: any = route.params.id;
const query: any = route.query.employee;
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  edu_type_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  students: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions: any = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
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

async function updateStatus(element: any) {
  try {
    isLoading.value = true;
    let datas: any = {
      academic_group_id: Number(element?.id),
      employee_id: +id,
    };
    if (element?.coordinator) datas.employee_id = null;
    await updateStatusCoordinator(datas);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => [apiData.edu_form_id, apiData.edu_type_id],
  async (newVal, newVal2) => {
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

const errors = reactive({});

async function fetchList(page?: number) {
  let datas: any = {
    page: apiData?.page,
  };
  if (!page) datas.page = page;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  try {
    isLoading.value = true;
    const res = await getCoordinatorListAll(datas);
    Object.assign(apiData, res.result);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="'Kordinator guruhlari'" class="academicGroupPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/coordinator/list-coordinator">
              {{ $t("coordinator_list") }}
            </router-link>
            / {{ query }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link
                to="/coordinator/list-coordinator"
                class="btns black-c py-1.5 px-4 d-inline-block"
              >
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}</router-link
              >
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 ms-3 px-4"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
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
                  allow-clear
                  v-model:value="apiData.edu_type_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions"
                  :placeholder="t('Choose_Education_Type')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions"
                  :placeholder="t('Choose_Education_Form')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
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
              <tr class="table-row-academic-group">
                <th>#</th>
                <th></th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("by_Specialty") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("Education_Form") }}</th>
                <th>{{ $t("Education_Language") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-academic-group"
                v-for="(element, index) in apiData.data"
                :key="element.id"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td>
                  <div class="form-check form-switch my-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      :checked="element.coordinator"
                      :disabled="isLoading"
                      @change="updateStatus(element)"
                    />
                  </div>
                </td>
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  {{ element.name }}
                </td>

                <td>{{ element?.edu_plan?.specialty?.name }}</td>
                <td>
                  {{ element?.edu_plan?.specialty?.edu_type?.name }}
                </td>
                <td>
                  {{ element?.edu_plan?.edu_form?.name }}
                </td>
                <td>
                  {{ element?.language.name }}
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
    <span v-if="apiData?.total" class="element-count mb-2"
      >{{ apiData?.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span
    >
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.academicGroupPage {
  .table-row-academic-group {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 100px auto 160px 160px 160px 160px;

    @include mobile() {
      grid-template-columns: 50px 100px 100px 100px 100px 90px 100px;
    }
  }
}
</style>
