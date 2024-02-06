<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  educationList,
  academicYearsList,
  eduFormList,
} from "@/utils/api/reference";
import { getListStudents } from "@/utils/api/attendance/statistic";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";

const { t } = useI18n();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  edu_type_id: null,
  edu_form_id: null,
  academic_year: null,
  semester_type: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormList: null,
});

const loader = ref(true);

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  apiData.academic_year = await academicYearsList().then((res) =>
    res.result.data.find((item: any) => item?.is_current == true)
  );
  sideFormOptions.eduFormList = await eduFormList().then((res) => res.result);
});

watch(
  () => [apiData.edu_type_id, apiData.semester_type, apiData.edu_form_id,],
  async () => {
    await fetchList();
  }
);

await fetchList();

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList();
    }
  }
);

async function fetchList() {
  let datas: any = {};
  if (apiData.page > 1) datas.page = apiData?.page;
  if (apiData.edu_type_id) datas.edu_type_id = apiData.edu_type_id;
  if (apiData.semester_type) datas.semester_type = apiData.semester_type;
  if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  isLoading.value = true;
  try {
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
  <div pagetitle="'Statistik davomat'" class="attStatisticPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("attendance_Overall") }}</h5>
          <div class="filterBlock">
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
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
          <div class="row">
            <!-- //fakultet  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item" :value="deanId"
                  disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- //O'quv yili  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear disabled
                  :value="apiData?.academic_year?.name || null" :placeholder="t('Choose_Education_Year')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose_Education_Type')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormList" :placeholder="t('Choose_Education_Form')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Form") }}</label>
            </div>
            <!-- //Semestr turi  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  :placeholder="t('Choose_Semestr_Type')" allowClear v-model:value="apiData.semester_type">
                  >
                  <a-select value="0">{{
                    $t("Spring_semester")
                  }}</a-select>
                  <a-select value="1">{{
                    $t("Fall_semester")
                  }}</a-select>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Semestr_Type") }}</label>
            </div>
            <!-- //search button  -->
            <!-- <div class="my-2 col-xl-1">
                            <button class="btn-search search-color" @click="fetchList">
                              <i class="fas fa-check me-1"></i>OK
                            </button>
                          </div> -->
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-all-statistic-attendance">
                <th>#</th>
                <th>{{ $t("Student") }}</th>
                <th>{{ $t("by_Specialty") }}</th>
                <th>{{ $t("Education_Form") }}</th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("Semester_Name") }}</th>
                <th>{{ $t("Total_Point") }}</th>
                <th>{{ $t("absent_On") }}</th>
                <th>{{ $t("absent_Off") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-all-statistic-attendance" v-for="(element, index) in apiData.data" :key="element.id">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.fullname }}
                </td>
                <td>
                  {{ element?.specialty?.code }}
                </td>
                <td>
                  {{ element?.edu_form }}
                </td>
                <td>
                  {{ element?.academic_group }}
                </td>
                <td>{{ element?.semester }}-{{ $t("semestr") }}</td>
                <td>{{ element?.total }}</td>
                <td>{{ element?.caused }}</td>
                <td>{{ element?.uncaused }}</td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
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
    <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
  </div>
</template>

<style lang="scss">
.attStatisticPage {
  .table-row-all-statistic-attendance {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px auto 150px 150px 100px 100px 100px 100px 120px;

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
