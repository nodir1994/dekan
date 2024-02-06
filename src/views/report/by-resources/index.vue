<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from "vue";
import {
  semestrListForReport,
  departmentList,
  academicYearList,
} from "@/utils/api/reference/index";
import type { RecourceByStudentFace } from "@/utils/interfaces";
import { byResourceList } from "@/utils/api/report/recource/index";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import PaginationForStatistical from "@/components/partials/PaginationForStatistical.vue";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
// consts
const { t } = useI18n();
const isLoading = ref(false);
const semesterOptions = ref();

const apiParams = reactive({
  faculty_id: null, // fakultet
  academic_year_id: null, // yil
  semester: null, // semester
  department_id: null,
  text: "",
  per_page: helpers.pagePer,
  page: 1,
});

const deanId = computed(() => userStore?.user?.faculty?.name);
const userStore = useUserStore();

const counters = ref<any>({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});

const apiData: {
  pagination: PaginationProps;
  result: RecourceByStudentFace[];
} = reactive({
  pagination: {
    current_page: 1,
    per_page: apiParams.per_page,
    loading: false,
  },
  result: [],
});

const options = reactive({
  departmentListOption: null,
  academicYearListOption: null,
});

// hooks

onMounted(async () => {
  semesterOptions.value = await semestrListForReport().then((res) =>
    res.result.map((item: any) => {
      return {
        id: item.semester,
        name: item.semester + "-" + t("semester"),
      };
    })
  );
  options.departmentListOption = await departmentList().then(
    (res) => res.result
  );
  options.academicYearListOption = await academicYearList().then((res) =>
    res.result.data.map((item: any) => {
      return { id: item.id, name: item.name };
    })
  );
});

await fetchList();
// option kuzatish uchun
watch(
  () => apiParams.faculty_id,
  async (newVal, oldVal) => {
    await fetchList();
    apiData.pagination.current_page = 1;
  }
);
watch(
  () => apiParams.academic_year_id,
  async (newVal, oldVal) => {
    await fetchList();
    apiData.pagination.current_page = 1;
  }
);
watch(
  () => apiParams.department_id,
  async (newVal, oldVal) => {
    await fetchList();
    apiData.pagination.current_page = 1;
  }
);
watch(
  () => apiParams.semester,
  async (newVal, oldVal) => {
    await fetchList();
    apiData.pagination.current_page = 1;
  }
);
watch(
  () => apiData.pagination.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);

async function fetchList() {
  try {
    isLoading.value = true;
    const res = await byResourceList(apiParams);
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
  <div pagetitle="`O'zlashtirish statistikasi`" class="byResourse">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Resource_statistics") }}</h5>
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
          <div class="row">
            <a-form>
              <div class="row">
                <a-form-item class="my-2 col-md-4">
                  <a-select
                    v-model:value="deanId"
                    :field-names="{ value: 'id', label: 'name' }"
                    disabled
                    allowClear
                  >
                  </a-select>
                </a-form-item>

                <a-form-item class="my-2 col-md-4">
                  <a-select
                    v-model:value="apiParams.department_id"
                    :options="options.departmentListOption"
                    :field-names="{ value: 'id', label: 'name' }"
                    allowClear
                    :placeholder="t('Select_a_cathedra')"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item class="my-2 col-md-2">
                  <a-select
                    v-model:value="apiParams.academic_year_id"
                    :options="options.academicYearListOption"
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="t('Select_academic_year')"
                    allowClear
                  >
                  </a-select>
                </a-form-item>

                <a-form-item class="my-2 col-md-2">
                  <a-select
                    v-model:value="apiParams.semester"
                    :options="semesterOptions"
                    :field-names="{ value: 'id', label: 'name' }"
                    allowClear
                    :placeholder="t('Select_semester')"
                  >
                  </a-select>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div class="table-responsive" v-if="apiData.result.length">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th><b>#</b></th>
                <th>
                  <b> {{ $t("Department") }}</b>
                </th>
                <th>
                  <b>{{ $t("student_Sciences") }}</b>
                </th>
                <th>
                  <b>{{ $t("Type_of_education") }}</b>
                </th>
                <th>
                  <b>{{ $t("student_Training") }}</b>
                </th>
                <th>
                  <b>{{ $t("Topics") }}</b>
                </th>
                <th>
                  <b>{{ $t("Resourcess") }}</b>
                </th>
                <th>
                  <b>{{ $t("Assignments") }}</b>
                </th>
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
                  {{ element.department }} <br />
                  {{ element.faculty }}
                </td>
                <td>
                  {{ element.subject }} <br />
                  {{ element.edu_plan }}
                </td>
                <td>
                  {{ element.edu_type }} <br />
                  {{ element.edu_form }}
                </td>
                <td>
                  {{ element.subject_type }} <br />
                  {{ element.semester }}-{{ $t("semester") }}
                </td>
                <td>
                  {{ element.topic_count }}
                </td>
                <td>
                  {{ element.resource_count }}
                </td>
                <td>
                  {{ element.task_count }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <PaginationForStatistical
            v-if="apiData.pagination.last_page! > 1"
            class="mt-2"
            v-bind="{ ...apiData.pagination }"
            v-model:current-page="apiData.pagination.current_page"
            :loading="isLoading"
            @on-page-change="fetchList"
          />
          <!-- --------------end pagination--------------------- -->
        </div>
        <div class="table-responsive" v-else>
          <NoData />
        </div>
      </div>
    </div>
    <!-------END TABLE 1---------------------------------------->
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
.byResourse {
  .table-row {
    grid-template-columns: 50px auto 250px 150px 150px 130px 100px 110px;
    @include mobile() {
      grid-template-columns: 50px 200px 150px 90px 90px 90px 100px 100px;
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
