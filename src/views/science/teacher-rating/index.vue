<script setup lang="ts">
import { onBeforeMount, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";

import { teachersList, teacherById } from "@/utils/api/science/teacher";
import { academicYearsList, departmentList } from "@/utils/api/reference/index";
import helpers from "@/utils/helper";

const { t } = useI18n();
const userStore = useUserStore();

const deanId = computed(() => userStore?.user?.faculty?.name);
const isLoading = ref(false);

const teacher: any = reactive({});
const total = ref();

const apiParams = reactive({
  page: 1,
  academic_year_id: null,
  department_id: null,
  per_page: helpers.pagePer,
});

// jadval bino
const apiData: {
  current_page: number;
  total: number;
  data: any[];
  links: [];
} = reactive({
  current_page: 1,
  total: 0,
  data: [],
  links: [],
});
const options: any = reactive({
  optionsAcademicYearList: null,
  departmentOptions: null,
});
onBeforeMount(async () => {
  options.optionsAcademicYearList = await academicYearsList().then(
    (res) => res.result
  );
  options.departmentOptions = await departmentList().then((res) => res.result);
});

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList();
    }
  }
);
const errors = reactive({
  academic_year_id: [],
  department_id: [],
});
function clearErrors() {
  Object.assign(errors, {
    academic_year_id: [],
    department_id: [],
  });
}
async function onSearch() {
  await fetchList();
}

async function fetchList() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = await teachersList(apiParams);
    Object.assign(apiData, res.result);
    apiData.total = apiData?.data.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.ball;
    }, 0);
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}
async function openModal(id) {
  let datas = await teacherById(id);
  Object.assign(teacher, datas.result);
  total.value = datas?.result.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.ball;
  }, 0);
}
</script>
<template>
  <div pagetitle="`O'qituvchi reytingi`" class="teacherRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Rating_Teacher") }}</h5>
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
          <form @submit.prevent="fetchList" class="row">
            <div class="my-2 col-xl-3 col-lg-6" name="faculty">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
            </div>
            <div class="my-2 col-xl-3 col-lg-6" name="educationYear">
              <a-select
                v-model:value="apiParams.academic_year_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="options.optionsAcademicYearList?.data"
                allow-clear
                :placeholder="$t('Choose_Education_Year')"
              >
              </a-select>
              <span v-if="errors['academic_year_id']" class="text-danger small">
                {{ errors["academic_year_id"][0] }}
              </span>
            </div>
            <div class="my-2 col-xl-3 col-lg-6 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  :field-names="{ value: 'id', label: 'name' }"
                  v-model:value="apiParams.department_id"
                  :options="options.departmentOptions"
                  :placeholder="$t('Choose_Department')"
                  allow-clear
                ></a-select>
              </a-space>
              <span v-if="errors['department_id']" class="text-danger small">
                {{ errors["department_id"][0] }}
              </span>
            </div>
            <div class="my-2 col-xl-3 col-lg-6">
              <button
                :disabled="
                  !apiParams.department_id || !apiParams.academic_year_id
                "
                class="btn-search c-save"
                type="submit"
              >
                <i class="fas fa-eye me-1"></i>{{ $t("Rating_view") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START Employee modal---------------------------------------->
    <div
      id="myModalImportCriteriya"
      class="modal fade import"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ teacher?.fullname }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-row-modal d-grid w-100">
                    <th>#</th>
                    <th>{{ $t("Publication") }}</th>
                    <th><strong>Nashr toifasi</strong></th>
                    <th><strong>Nashr nomi</strong></th>
                    <th>{{ $t("Score") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-modal d-grid w-100"
                    v-for="(element, index) in teacher"
                    :key="index"
                  >
                    <td>
                      {{ +index + 1 }}
                    </td>
                    <td>{{ element?.critery }}</td>
                    <td>{{ element?.publication_type }}</td>
                    <td>{{ element?.publication_name }}</td>
                    <td>{{ element?.ball }}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr class="table-row-modal w-100 d-grid">
                    <th><b></b></th>
                    <th>
                      <b>{{ $t("Total_Point") }}</b>
                    </th>
                    <th><b></b></th>
                    <th><b></b></th>
                    <th>
                      <b>{{ total }}</b>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END Employee modal---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="table-responsive" v-if="apiData?.data.length !== 0">
              <table class="table-vertical">
                <thead>
                  <tr class="table-row w-100 d-grid">
                    <th><b>#</b></th>
                    <th>
                      <b>{{ $t("Employee") }}</b>
                    </th>
                    <th>
                      <b>{{ $t("Score") }}</b>
                    </th>
                    <th><b>Action</b></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-if="apiData?.data.length === 0">
                    <td class="table-error" rowspan="4">
                      {{ $t("not__found") }}
                    </td>
                  </tr> -->
                  <tr
                    class="table-row w-100 d-grid"
                    v-for="(element, index) in apiData?.data"
                    :key="element.id"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.fullname }}
                    </td>
                    <td>
                      {{ element?.ball }}
                    </td>
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="see__project">
                            <a
                              type="text"
                              data-bs-toggle="modal"
                              @click="openModal(element.id)"
                              data-bs-target="#myModalImportCriteriya"
                            >
                              <i
                                class="far fa-eye font-size-14 b-actions c-see"
                              ></i>
                            </a>
                          </div>
                        </li>
                      </ul>
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
                    <th><b></b></th>
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
            <div class="table-responsive" v-else>
              <NoData />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.teacherRatingPage {
  .table-row {
    grid-template-columns: 50px auto 120px 70px;

    @include mobile() {
      grid-template-columns: 50px auto 120px 70px;
    }
  }

  .table-row-modal {
    grid-template-columns: 50px 100px 170px auto 70px;

    @include mobile() {
      grid-template-columns: 50px 100px 120px 200px 70px;
    }
  }

  .modal-dialog {
    max-width: $ipad !important;
  }
}

.teacherRatingPage .content-table {
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
