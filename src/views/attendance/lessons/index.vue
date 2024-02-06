<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import {
  getStudentList,
  getStatisticsList,
} from "@/utils/api/attendance/lessons";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const { t } = useI18n();
const loader = ref(true);
const isLoading = ref(false);
const isSearch = ref(false)
const apiData: any = reactive({
  search: "",
  page: 1,
  date_start: null,
  date_end: null,
  statistic: "faculty",
  current_page: 1,
  data: [],
  per_page: helpers.pagePer,
  links: [],
});

const sideFormOptions = reactive({
  statisticOptions: null,
});

await fetchList();

onMounted(async () => {
  sideFormOptions.statisticOptions = await getStatisticsList().then((res) =>
    res.result.map((item: any) => {
      return { id: item.code, name: item.name };
    })
  );

  //
});

watch(
  () => [apiData.date_start, apiData.date_end, apiData.statistic],
  async (newVal) => {

    await fetchList();
  }
);

watch(
  () => apiData.search,
  async (newVal) => {
    isSearch.value = true
    if (apiData.search == "" && isSearch.value == true) {
      await fetchList();
      isSearch.value = false
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


async function fetchList(newVal?: number) {
  let datas: any = {
    page: 1 || newVal,
    per_page: apiData.per_page
  };
  if (apiData.search) datas.search = apiData.search;
  if (apiData.date_start) datas.date_start = apiData.date_start;
  if (apiData.date_end) datas.date_end = apiData.date_end;
  isLoading.value = true;
  try {
    if (loader.value) {
      loader.value = false;
      const res = await getStudentList(datas, apiData.statistic);
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
  <div pagetitle="`Darslar monitoringi`" class="lessonsPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Monitoring_of_lessons") }}</h5>
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="fetchList()">
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-date-picker v-model:value="apiData.date_start" allow-clear value-format="YYYY-MM-DD"
                  :placeholder="$t('Enter_start_date')" />
              </a-space>
              <label for="yu">{{ $t("Choice_Start_Date") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-date-picker v-model:value="apiData.date_end" value-format="YYYY-MM-DD" allow-clear
                  :placeholder="$t('Enter_end_date')" />
              </a-space>
              <label for="yu">{{ $t("End_date") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiData.statistic"
                  :options="sideFormOptions.statisticOptions" :field-names="{ value: 'id', label: 'name' }"
                  :placeholder="$t('choose__statistics')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("choose__statistics") }}</label>
            </div>
            <div class="my-2 col-md-9 form--item">
              <a-space>
                <a-input allow-clear id="yu" class="form-control" v-model:value="apiData.search" />
              </a-space>
              <label for="yu">{{ $t("Search_by_Employee_Group_Subject_Lesson_Pair") }}
              </label>
            </div>
            <div class="my-2 col-md-3">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
            </div>
          </form>
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
              <tr class="table-row w-100 d-grid">
                <th><strong>#</strong></th>
                <th><strong>{{ $t("employee") }}</strong></th>
                <th>
                  <strong>{{ $t("Group") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Subjects") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Couple") }}</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="element?.id">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  <div>
                    {{ element?.employee }} <br />
                    <span class="c-gray">
                      {{ element?.department }}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ element?.academic_group }} <br />
                    <span class="c-gray">
                      {{ element?.faculty }}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ element?.subject }} <br />
                    <span class="c-gray"> {{ element?.lesson_activity }}</span>
                    <span v-if="element?.topic_count">
                      {{ element?.topic_count }}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ element?.pair?.position }} <br />
                    {{ element?.pair?.time_start }} -
                    {{ element?.pair?.time_end }}
                    <br />
                    <span class="c-gray">
                      {{ element?.date }}
                    </span>
                  </div>
                </td>
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
    <span class="element-count mb-2" v-if="apiData?.total">{{ apiData.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.lessonsPage {
  .table-row {
    grid-template-columns: 50px auto 250px 250px 150px;

    @include mobile() {
      grid-template-columns: 50px 250px 250px 250px 150px;
    }
  }

  .content-table {

    th,
    td {
      &:last-child {
        justify-content: left;
      }
    }
  }
}
</style>
