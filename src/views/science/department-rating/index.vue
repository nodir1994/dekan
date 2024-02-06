<script setup lang="ts">
import { onBeforeMount, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import type { departmentRatingScienceFace } from "@/utils/interfaces";
import { departmentList } from "@/utils/api/science/department";
import { academicYearsList } from "@/utils/api/reference/index";
import helpers from "@/utils/helper";

const { t } = useI18n();
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const isLoading = ref(false);
const apiParams = reactive({
  page: 1,
  academic_year_id: 150,
  per_page: helpers.pagePer,
});

// jadval bino
const apiData: {
  current_page: number;
  total: number;
  last_page: number;
  per_page: number;
  data: departmentRatingScienceFace[];
  links: [];
} = reactive({
  current_page: 1,
  total: 0,
  last_page: 1,
  per_page: 1,
  data: [],
  links: [],
});

const optionsAcademicYearList: any = ref([]);

optionsAcademicYearList.value = await academicYearsList().then(
  (res) => res.result
);

apiParams.academic_year_id = 1;

await fetchList();

watch(
  () => apiParams.academic_year_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);

async function onSearch() {
  await fetchList();
}

async function fetchList() {
  isLoading.value = true;
  const res = await departmentList(apiParams);
  Object.assign(apiData, res.result);
  apiData.total = apiData?.data.reduce(function (
    accumulator: any,
    currentValue: any
  ) {
    return accumulator + currentValue.department_ball;
  },
  0);
  isLoading.value = false;
}
</script>

<template>
  <div pagetitle="`O'qituvchi reytingi`" class="departmentRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Rating_Department") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
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
            <div class="my-2 col-md-6" name="faculty">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
            </div>
            <div class="my-2 col-md-6" name="educationYear">
              <a-select
                v-model:value="apiParams.academic_year_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="optionsAcademicYearList?.data"
                show-search
              >
              </a-select>
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
        <div class="table-responsive">
          <table class="table-vertical">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th><b>#</b></th>
                <th>
                  <b>{{ $t("Hei_department") }}</b>
                </th>
                <th>
                  <b>{{ $t("Score") }}</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="apiData?.data.length === 0">
                <td class="table-error" rowspan="4">
                  {{ $t("not__found") }}
                </td>
              </tr>
              <tr
                class="table-row w-100 d-grid"
                v-for="(element, index) in apiData?.data"
                :key="element.id"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.department }}
                </td>
                <td>
                  {{ element?.department_ball }}
                </td>
              </tr>
            </tbody>
            <thead>
              <tr class="table-row w-100 d-grid">
                <th><b></b></th>
                <th>
                  <b>{{ $t("Total_Point") }}</b>
                </th>
                <th>
                  <b>{{ apiData?.total }}</b>
                </th>
              </tr>
            </thead>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination
            v-if="apiData.last_page > 1"
            class="mt-2"
            v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page"
          />
          <!-------------END PAGINATION-------------->
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.departmentRatingPage {
  .table-row {
    grid-template-columns: 50px auto 70px;

    @include mobile() {
      grid-template-columns: 50px auto 70px;
    }
  }
}

.departmentRatingPage .content-table {
  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;

    &:nth-last-child(1) {
      justify-content: left;
      display: flex;
    }

    &:nth-child(1) {
      display: flex;
      justify-content: left;
    }
  }
}

.table-error {
  font-size: 25px;
  color: #999999;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #faf9f9;
}
</style>
