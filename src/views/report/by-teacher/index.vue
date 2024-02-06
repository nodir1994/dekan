<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from "vue";
import { departmentList } from "@/utils/api/reference/index";
import type { ReportByTeacherFace } from "@/utils/interfaces";
import { byTeacherList, exportFile } from "@/utils/api/report/teacher/index";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import PaginationForStatistical from "@/components/partials/PaginationForStatistical.vue";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();
const isLoading = ref(false);
const optiondepartmentList = await departmentList().then((res) => res.result);
const loader = ref(true);

const apiParams = reactive({
  faculy_id: null, // fakultet
  department_id: null,
  search: "",
  page: 1,
  per_page: helpers.pagePer,
});

const counters = ref<any>({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});

const apiData: {
  pagination: PaginationProps;
  result: ReportByTeacherFace[];
} = reactive({
  pagination: {
    current_page: 1,
    per_page: apiParams.per_page,
    loading: false,
  },
  result: [],
});

await fetchList();
watch(
  () => apiData.pagination.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
watch(
  () => apiParams.department_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

async function downloadFile() {
  let datas: any = {};
  if (apiParams.search != "") datas.search = apiParams.search;
  if (apiParams.department_id) datas.department_id = apiParams.department_id;
  try {
    isLoading.value = true;
    const res = await exportFile(apiParams);
    const url = URL.createObjectURL(
      new Blob([res], {
        type: "application/vnd.ms-excel",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Worksheet_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
}

async function onSearch() {
  await fetchList();
}
async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: apiParams.per_page,
  };
  if (apiParams.search != "") datas.search = apiParams.search;
  if (apiParams.department_id) datas.department_id = apiParams.department_id;
  if (apiParams.faculy_id) datas.faculy_id = apiParams.faculy_id;
  try {
    if (loader.value) {
      loader.value = false;
      isLoading.value = true;
      const res = await byTeacherList(datas);
      Object.assign(apiData, res);
      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
    let sequenceNumber = `${
      apiData.pagination.per_page * (apiData.pagination.current_page - 1) + 1
    }- ${
      apiData.result.length +
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1)
    }`;
    let theNumber = `${t("Total_Point")} : ${apiData.pagination.total}`;
    let sorting =
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1);
    counters.value.sequenceNumber = sequenceNumber;
    counters.value.theNumber = theNumber;
    counters.value.sorting = sorting;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`O'qituvchi faolligi`" class="reportByTeacherPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Teacher_activity") }}</h5>
          <div class="panel-toggles">
            <button
              @click="downloadFile()"
              class="btns c-save py-1.5 px-4 me-3"
              type="submit"
            >
              <i class="mdi mdi-download me-2"></i>{{ $t("Export") }}
            </button>

            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
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
          <form class="row" @submit.prevent="onSearch">
            <!-- //fakultet  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_the_faculty") }}</label>
            </div>
            <!-- Kafedrani tanlang -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.department_id"
                  :options="optiondepartmentList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_a_cathedra") }}</label>
            </div>
            <!-- //izlash  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-input
                  allowClear
                  id="yu"
                  class="form-control"
                  v-model:value="apiParams.search"
                />
              </a-space>
              <label for="yu"
                >{{ $t("Full_name") }} / {{ $t("Passport") }} /
                {{ $t("By_employee_ID") }} {{ $t("search") }}</label
              >
            </div>

            <!-- //search button  -->
            <div class="my-2 col-md-2">
              <button type="submit" class="btn-search search-color">
                <i class="mdi mdi-magnifying-glass me-2"></i>{{ $t("search") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="table-responsive" v-if="apiData.result.length">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th><b>#</b></th>
                    <th>
                      <b>{{ $t("employee") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("cathedra") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("IP_address") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Message") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Date_of_entry") }}</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="(element, index) in apiData.result"
                    :key="index"
                  >
                    <td>
                      {{
                        (apiData.pagination.current_page - 1) *
                          apiData.pagination.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element.full_name }}
                    </td>
                    <td>
                      {{ element.department }}
                    </td>
                    <td>{{ element.ip }} {{ element.id }}</td>
                    <td>{{ element.message }}</td>
                    <td>{{ element.date }}</td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <PaginationForStatistical
                v-if="apiData.pagination.last_page! > 1"
                class="mt-2"
                v-bind="{ ...apiData.pagination }"
                v-model:current-page="apiData.pagination.current_page"
                :loading="isLoading"
                @on-page-change="fetchList"
              />
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
    <span
      class="element-count mb-2"
      :class="!apiData.pagination.total ? 'd-none' : ''"
    >
      <span v-if="apiData.pagination.last_page">
        {{ counters.sequenceNumber }} / </span
      >{{ counters.theNumber }}</span
    >
  </div>
</template>

<style lang="scss">
.reportByTeacherPage {
  .table-row {
    grid-template-columns: 50px auto 220px 170px 300px 180px;

    @include mobile() {
      grid-template-columns: 50px 200px 180px 140px 200px 150px;
    }

    th,
    td {
      &:last-child {
        justify-content: start;
      }
    }
  }
}
</style>
