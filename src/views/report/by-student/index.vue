<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from "vue";
import {
  educationList,
  courseList,
  eduFormList,
  academicGroupsList,
  academicGroupsListAll,
  educationListAll,
  eduFormLists,
} from "@/utils/api/reference/index";
import type { ReportByStudentFace } from "@/utils/interfaces";
import { byStudentList, exportFile } from "@/utils/api/report/student/index";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import PaginationForStatistical from "@/components/partials/PaginationForStatistical.vue";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
// consts
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();
const isLoading = ref(false);
const optionecourseLists = ref();
const loader = ref(true);
const apiParams: any = reactive({
  faculty_id: null, // fakultet
  edu_type_id: null, // ta'lim turi
  edu_form_id: null, //ta'lim shakli
  academic_group_id: null, // gurh
  course: null, // kursi
  text: null,
  per_page: helpers.pagePer,
  page: 1,
});

const apiData: {
  pagination: PaginationProps;
  result: ReportByStudentFace[];
} = reactive({
  pagination: {
    current_page: 1,
    per_page: apiParams.per_page,
    loading: false,
  },
  result: [],
});

const counters = ref<any>({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});

const optionList: any = reactive({
  facultyOption: null,
  optioneduTypeList: null,
  optionGroupList: null,
  optioneduFormList: null,
});

// hooks

onMounted(async () => {
  let optionecourseList = await courseList().then((res) => res.result);
  optionecourseLists.value = optionecourseList.map((item: any) => {
    return {
      id: item.id,
      name: item.name + "-" + t("Course"),
    };
  });
  optionList.optioneduTypeList = await educationListAll().then(
    (res) => res.result
  );
  optionList.optionGroupList = await academicGroupsListAll().then(
    (res) => res.result.data
  );
  optionList.optioneduFormList = await eduFormLists().then((res) => res.result);
});
await fetchList();
// option kuzatish uchun
watch(
  () => [
    apiParams.edu_type_id,
    apiParams.edu_form_id,
    apiParams.academic_group_id,
    apiParams.course,
  ],
  async (newVal, oldVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.pagination.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
// functions

async function onSearch() {
  await fetchList();
}
async function fetchList(pages?: number) {
  delete apiParams.page;
  let datas: any = reactive({
    ...apiParams,
    page: pages || 1,
  });
  isLoading.value = true;
  if (loader) {
    loader.value = false;
    const res = await byStudentList(datas);
    Object.assign(apiData, res);
    setTimeout(() => {
      loader.value = true;
    }, 50);
    let sequenceNumber = `${
      apiData.pagination.per_page * (apiData.pagination.current_page - 1) + 1
    }- ${
      apiData.result.length +
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1)
    }`;
    let theNumber = `${t("Total_Point")} : ${apiData.pagination.total}`;
    let sorting =
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1);
    isLoading.value = false;
    counters.value.sequenceNumber = sequenceNumber;
    counters.value.theNumber = theNumber;
    counters.value.sorting = sorting;
  }
}

async function exportLink() {
  delete apiParams.page;
  delete apiParams.per_page;
  let datas: any = reactive({
    ...apiParams,
  });
  try {
    isLoading.value = true;
    const res = await exportFile(datas);
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
</script>
<template>
  <div pagetitle="`Talaba faolligi`" class="reportByStudentPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Student_activity") }}</h5>
          <div class="panel-toggles">
            <button
              @click="exportLink"
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
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  :value="deanId"
                  :options="optionList.facultyOption"
                  :field-names="{ value: 'id', label: 'name' }"
                  disabled
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Select_the_faculty") }}</label>
            </div>

            <!-- //Ta'lim turi  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.edu_type_id"
                  :options="optionList.optioneduTypeList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_the_type_of_education") }}</label>
            </div>

            <!-- //Ta'lim shakli  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.edu_form_id"
                  :options="optionList.optioneduFormList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_a_form_of_education") }}</label>
            </div>

            <!-- //Guruhni tanlang  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.academic_group_id"
                  :options="optionList.optionGroupList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_a_group") }}</label>
            </div>
            <!-- //Kursni tanlang  -->
            <div class="my-2 col-xl-2 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.course"
                  :options="optionecourseLists"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_the_course") }}</label>
            </div>
            <!-- //izlash  -->
            <div class="my-2 col-xl-6 form--item">
              <a-space>
                <a-input
                  allowClear
                  id="yu"
                  class="form-control"
                  v-model:value="apiParams.text"
                />
              </a-space>
              <label for="yu"
                >{{ $t("Full_name") }} / {{ $t("Passport") }} /
                {{ $t("By_code") }} {{ $t("search") }}</label
              >
            </div>

            <!-- //search button  -->
            <div class="my-2 col-xl-2">
              <button type="submit" class="btn-search search-color">
                <i class="mdi mdi-magnify me-1"></i>{{ $t("search") }}
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
                      <b>{{ $t("Student") }}</b>
                    </th>

                    <th>
                      <b>{{ $t("Specialist") }}</b>
                    </th>
                    <th>
                      <b>{{ t("Type_of_education") }}</b>
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
                    :key="element.id"
                  >
                    <td>{{ counters.sorting + index + 1 }}</td>
                    <td>
                      {{ element.full_name }} <br />
                      {{ element.academic_group }}
                    </td>
                    <td>
                      {{ element.specialty }}<br />
                      {{ element.specialty_code }}
                    </td>
                    <td>
                      {{ element.edu_type }} <br />
                      {{ element.edu_form }}
                    </td>
                    <td>{{ element.ip }} / {{ index }}</td>
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
.reportByStudentPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 200px 150px 150px 300px 150px;
    @include mobile() {
      grid-template-columns: 50px 200px 140px 130px 130px 250px 120px;
    }
  }
}
</style>
