<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { teacherList, exportFile } from "@/utils/api/employee/index";
import { departmentList } from "@/utils/api/reference/index";
import helpers from "@/utils/helper";

const { t } = useI18n();
const isLoading = ref(false);
const loader = ref(true);
// jadval teacher
const apiData: any = reactive({
  search: "",
  page: 1,
  department_id: null,
  current_page: 1,
  data: [],
  links: [],
  per_page: helpers.pagePer,
});

const departmentOptions = await departmentList().then((res) => res.result);

await fetchList();

onMounted(async () => {
  let res = await teacherList();
});

watch(
  () => apiData.department_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.search,
  async () => {
    if (apiData.search.length == 0) {
      await fetchList();
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

const errors = reactive({
  semester_id: [],
  teacherty_id: [],
});

async function onSearch() {
  await fetchList();
}
async function downloadFile() {
  let apiParams: any = {};
  if (apiData.search) apiParams.search = apiData.search;
  if (apiData.department_id) apiParams.department_id = apiData.department_id;
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
async function fetchList(page?: number) {
  let datas: any = {
    page: page || apiData.page,
  };
  if (apiData.department_id) datas.department_id = apiData.department_id;
  if (apiData.search) datas.search = apiData.search;
  if (apiData.per_page) datas.per_page = apiData.per_page;

  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await teacherList(datas);
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
  <div pagetitle="`O'qituvchilar ro'yxati`" class="teacherListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Employee_Teacher") }}</h5>
          <div class="panel-toggles">
            <button @click="downloadFile" class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t("Download") }}
            </button>
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
          <form @submit.prevent="onSearch" class="row">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select class="form--item" :field-names="{ value: 'id', label: 'name' }"
                  v-model:value="apiData.department_id" :filter-option="helpers.filterOptionByName" showSearch
                  :options="departmentOptions" allow-clear></a-select>
              </a-space>
              <label>{{ $t("Choose_Department") }}</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear /> </a-space><label>{{
                  $t("Search_by_Name_Passport_Employee_ID") }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button type="submit" class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
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
                  <tr class="table-row-teacher-list">
                    <th>#</th>
                    <th>{{ $t("Employee") }}</th>
                    <th>{{ $t("Hei_department") }}</th>
                    <th>{{ $t("by_Post") }}</th>
                    <th>{{ $t("Employment_Staff") }}</th>
                    <th>{{ $t("Status") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-teacher-list" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div>{{ element?.fullname }}</div>
                    </td>
                    <td>{{ element?.department }}</td>
                    <td>{{ element?.position }}</td>
                    <td>{{ element?.work_rate }}</td>
                    <td>{{ element?.position }}</td>
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
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.teacherListPage {
  .table-row-teacher-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 400px auto 200px 150px 150px;

    @include mobile() {
      grid-template-columns: 50px 400px 200px auto auto 120px;
    }
  }

  .modal-dialog {
    max-width: $ipad;
  }
}
</style>
