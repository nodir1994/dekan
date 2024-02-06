<script setup lang="ts">
import type { ByStudentSocialFace } from "@/utils/interfaces";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { reactive, ref, watch, onMounted, computed } from "vue";
import {
  semesterTypeList,
  academicYearsList,
  socialCategoryListAll,
} from "@/utils/api/reference/index";
import { byStudentSocialList } from "@/utils/api/statistical/by-student-social/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { useUserStore } from "@/stores/user";
import NoData from "@/components/NoData.vue";
import helpers from "@/utils/helper";

// consts

const userStore = useUserStore();
const isLoading = ref(false);
const { t } = useI18n();
const semesterType_name = ref();
const academicYear_name = ref();
const socialCat_name = ref();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const counters = ref<any>({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});
const apiParams: any = reactive({
  academic_year_id: null, // oquv yili
  semester_type: null, // semestr turi
  social_category_id: null, // ijtimoiy toifa
  per_page: helpers.pagePer,
  page: 1,
});
const apiData: {
  pagination: PaginationProps;
  result: ByStudentSocialFace[];
} = reactive({
  pagination: {
    current_page: 1,
    per_page: apiParams.per_page,
    loading: false,
  },
  result: [],
});
const optionsList: any = reactive({
  optionfacultyList: null,
  optionacademicYeList: null,
  optionTypeSemester: null,
  optionsocialCategoryList: null,
});

// await fetchList();

onMounted(async () => {
  optionsList.optionsocialCategoryList = await socialCategoryListAll().then(
    (res) => res.result
  ); // ijtimoiy toifa
  optionsList.optionTypeSemester = await semesterTypeList().then(
    (res) => res.result
  ); // Semester tipi

  optionsList.optionacademicYeList = await academicYearsList().then(
    (res) => res.result?.data
  ); // oquv yili
});

watch(
  () => apiData.pagination.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);

async function onSearch() {
  semesterType_name.value = optionsList.optionTypeSemester.find(
    (x: any) => x.code == apiParams.semester_type
  ).name;
  academicYear_name.value = optionsList.optionacademicYeList.find(
    (x: any) => x.id == apiParams.academic_year_id
  ).name;
  socialCat_name.value = optionsList.optionsocialCategoryList.find(
    (x: any) => x.id == apiParams.social_category_id
  ).name;
  await fetchList();
}

async function fetchList(pages?: number) {
  delete apiParams.page;
  let datas: any = reactive({
    ...apiParams,
    page: pages || 1,
  });
  try {
    isLoading.value = true;
    const res = await byStudentSocialList(datas);
    Object.assign(apiData, res);
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
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`Talaba ro'yxati (toifa)`" class="byStudentSocial">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            {{ $t("Student_list") }} ({{ $t("category") }})
          </h5>
          <div class="panel-toggles">
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
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.academic_year_id"
                  :options="optionsList.optionacademicYeList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //Semestr  -->
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.semester_type"
                  :options="optionsList.optionTypeSemester"
                  :field-names="{ value: 'code', label: 'name' }"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ t("Choose_Semestr_Type") }}</label>
            </div>
            <!-- //Fakultet  -->

            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiParams.social_category_id"
                  :options="optionsList.optionsocialCategoryList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Social_Category") }}</label>
            </div>

            <div class="my-2 col-md-2 form--item">
              <button
                :disabled="
                  !apiParams.academic_year_id ||
                  apiParams.semester_type == null ||
                  !apiParams.social_category_id
                "
                class="btn-search c-save"
                type="submit"
              >
                <i class="mdi mdi-eye me-2"></i>{{ $t("View_Academic_Sheet") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div class="table-responsiveWS" v-if="apiData.result.length > 0">
          <div class="table-header">
            <table>
              <tr>
                <td style="width: 33%">
                  <span>{{ $t("Academic_year") }}:</span>
                  <b>{{ academicYear_name }}</b>
                </td>
                <td style="width: 33%">
                  <span>{{ $t("Semester_type") }}:</span>
                  <b>{{ semesterType_name }}</b>
                </td>
                <td style="width: 33%">
                  <span>{{ $t("Social_class") }}:</span>
                  <b>{{ socialCat_name }}</b>
                </td>
              </tr>
            </table>
          </div>
          <div class="table-responsive">
            <table class="table-vertical">
              <thead>
                <tr class="table-row d-grid w-100">
                  <th>#</th>
                  <th>{{ $t("Student") }}</th>
                  <th>{{ t("Type_of_education") }}</th>
                  <th>{{ $t("Form_of_education") }}</th>
                  <th>{{ $t("semester") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="table-row d-grid w-100"
                  v-for="(element, index) in apiData.result"
                  :key="index"
                >
                  <td>{{ counters.sorting + index + 1 }}</td>
                  <td>
                    {{ element.name }} {{ element.surname }}
                    {{ element.last_name }}
                  </td>

                  <td>
                    {{ element.edu_type }}
                  </td>
                  <td>
                    {{ element.edu_form }}
                  </td>
                  <td>{{ element.semester }}-{{ $t("semester") }}</td>
                </tr>
              </tbody>
            </table>
            <!-- ------start pagination-------------- -->
            <Pagination
              v-if="apiData.pagination.last_page! > 1"
              class="mt-2"
              v-bind="{ ...apiData.pagination }"
              v-model:current-page="apiData.pagination.current_page"
              :loading="isLoading"
              @on-page-change="fetchList"
            />
            <!-- --------------end pagination--------------------- -->
          </div>
        </div>
        <div class="table-responsiveWS" v-else>
          <NoData />
        </div>
      </div>
    </div>
    <!-------END TABLE 1---------------------------------------->
    <span
      class="element-count mb-2"
      v-if="apiData.pagination.total"
      :class="!apiData.pagination.total ? 'd-none' : ''"
      >{{ apiData.pagination.current_page }}-{{
        apiData.result.length +
        apiData.pagination.per_page * (apiData.pagination.current_page - 1)
      }}
      / {{ $t("Total_Point") }}: {{ apiData.pagination.total }}</span
    >
  </div>
</template>

<style lang="scss">
.byStudentSocial {
  .table-row {
    grid-template-columns: 50px auto 200px 200px 200px;
    @include mobile() {
      grid-template-columns: 50px 200px 90px 90px 90px;
    }
    th,
    td {
      &:last-child {
        justify-content: start;
      }
    }
  }
}

.table-header {
  margin-bottom: 1rem;
  table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      border: 0.3px solid #fff;
      padding: 5px 0;
      text-align: start;
      span {
        width: auto;
        margin-right: 10px;
      }
      &:nth-child(odd) {
        min-width: 120px;
      }
      &:nth-child(even) {
        width: 50%;
      }
    }
  }
}
</style>
