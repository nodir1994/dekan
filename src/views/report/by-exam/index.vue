<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import {
  semestrListForReport,
  academicYearList,
  eduFormLists,
} from "@/utils/api/reference/index";
import type { ReportExamsFace } from "@/utils/interfaces";
import { reportExamsList } from "@/utils/api/report/exams/index";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import PaginationForStatistical from "@/components/partials/PaginationForStatistical.vue";
import helpers from "@/utils/helper";
const semesterOptions = ref();
const { t } = useI18n();
const isLoading = ref(false);
const loader = ref(true);
const academicYearListOption = await academicYearList().then((res) =>
  res.result.data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
    };
  })
);
const optionsEduForm: {
  value: any;
} = reactive({
  value: [],
});
const apiParams: any = reactive({
  academic_year_id: null, // fakultet
  semester_id: null,
  edu_form_id: null,
  text: null,
  page: 1,
  per_page: helpers.pagePer,
});

const apiData: {
  pagination: PaginationProps;
  result: ReportExamsFace[];
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

onMounted(async () => {
  semesterOptions.value = await semestrListForReport().then((res) =>
    res.result.map((item: any) => {
      return {
        id: item.semester,
        name: item.semester + "-" + t("semester"),
      };
    })
  );
  optionsEduForm.value = await eduFormLists().then((res) => res.result);
});

await fetchList();
// option kuzatish uchun
watch(
  () => [
    apiParams.academic_year_id,
    apiParams.semester_id,
    apiParams.edu_form_id,
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

async function onSearch() {
  await fetchList();
}
async function fetchList(page?: number) {
  delete apiParams.page;
  let datas: any = {
    ...apiParams,
    page: page || 1,
  };

  if (loader.value) {
    loader.value = false;
    isLoading.value = true;
    const res = await reportExamsList(datas);
    Object.assign(apiData, res);
    setTimeout(() => {
      loader.value = true;
    }, helpers.loaderRefresh);
  }
  let sequenceNumber = `${apiData.pagination.per_page * (apiData.pagination.current_page - 1) + 1
    }- ${apiData.result.length +
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
</script>
<template>
  <div pagetitle="`Imtihonlar ro'yhati`" class="reportByExamPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("List_of_exams") }}</h5>
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
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select v-model:value="apiParams.academic_year_id" :options="academicYearListOption"
                  :field-names="{ value: 'id', label: 'name' }" allowClear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Select_academic_year") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select v-model:value="apiParams.semester_id" :options="semesterOptions"
                  :field-names="{ value: 'id', label: 'name' }" allowClear>
                </a-select>
              </a-space>

              <label for="yu">{{ $t("Select_semester") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select v-model:value="apiParams.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsEduForm.value" allowClear>
                </a-select>
              </a-space>

              <label for="yu">{{ $t("Choose_Education_Form") }}</label>
            </div>
            <!-- //izlash  -->
            <div class="my-2 col-md-10 form--item">
              <a-space>
                <a-input allowClear id="yu" class="form-control" v-model:value="apiParams.text" />
              </a-space>
              <label for="yu">{{ $t("Search_by_name") }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-md-2">
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
                      <b>{{ $t("employee") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("student_Sciences") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("name") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Groups") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Academic_year") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Time") }}({{ $t("minute") }})</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row d-grid w-100" v-for="(element, index) in apiData.result" :key="index">
                    <td>{{ counters.sorting + index + 1 }}</td>
                    <td>
                      {{ element.employee }}
                    </td>
                    <td>{{ element.subject }}</td>
                    <td>
                      {{ element.name }}
                    </td>
                    <td>
                      {{ element.academic_group }}
                    </td>
                    <td>{{ element.academic_year }} <br /></td>
                    <td>
                      {{ element.duration }} {{ $t("minute") }} <br />
                      {{ element.datetime_start }}-{{ element.datetime_end }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <PaginationForStatistical v-if="apiData.pagination.last_page! > 1" class="mt-2"
                v-bind="{ ...apiData.pagination }" v-model:current-page="apiData.pagination.current_page"
                :loading="isLoading" @on-page-change="fetchList" />
              <!-------------END PAGINATION-------------->
            </div>
            <div class="table-responsive" v-else>
              <NoData />
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" :class="!apiData.pagination.total ? 'd-none' : ''">
      <span v-if="apiData.pagination.last_page">
        {{ counters.sequenceNumber }} / </span>{{ counters.theNumber }}</span>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.reportByExamPage {
  .table-row {
    grid-template-columns: 50px auto 300px 300px 140px 160px 240px;

    @include mobile() {
      grid-template-columns: 50px 200px 230px 160px 140px 150px 240px;
    }

    td {
      &:last-child {
        justify-content: flex-start;
      }
    }
  }
}
</style>
