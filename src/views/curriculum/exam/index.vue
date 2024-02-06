<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { examsAllList } from "@/utils/api/exams/index";
import type { examsAllListFace } from "@/utils/interfaces";
import {
  academicYearsList,
  academicGroupsList,
  academicGroupsListAll,
} from "@/utils/api/reference/index";
import { useI18n } from "vue-i18n";
import helpers from "@/utils/helper";

const { t } = useI18n();
const isLoading = ref(false);

const apiData: {
  current_page: number;
  per_page: number;
  data: any[];
} = reactive({
  current_page: 1,
  data: [],
  per_page: helpers.pagePer,
});

const options: any = reactive({});
const apiParams: any = reactive({
  academic_year_id: null,
  academic_group_id: null,
  search: "",
  current_page: 1,
  per_page: helpers.pagePer,
});
onMounted(async () => {
  options.optionsAcademicYear = await academicYearsList().then(
    (res) => res.result?.data
  );
  options.optionsacademicGroupsList = await academicGroupsListAll().then(
    (res) => res.result?.data
  );
});
watch(
  () => apiParams.academic_year_id,
  async (newVal: number, oldVal) => {
    await fetchList();
    const res = await academicGroupsList(newVal).then(
      (res) => res.result?.data
    );
    options.optionsacademicGroupsList = res;
  }
);

await fetchList();

async function onSearch() {
  await fetchList();
}

async function fetchList() {
  isLoading.value = true;
  const res = await examsAllList(apiParams);
  Object.assign(apiData, res.result);
  isLoading.value = false;
}
</script>
<template>
  <div pagetitle="'Malaka oshirish'" class="examPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Report_By_Exam") }}</h5>
          <div class="panel-toggles">
            <!-- <router-link to="/curriculum/exams/create"
              ><button class="btns c-save py-1.5 px-4 me-3" type="button">
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
                >{{ $t("Create_Exam") }}
              </button></router-link
            > -->
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.academic_year_id"
                  :options="options.optionsAcademicYear"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.academic_group_id"
                  :options="options.optionsacademicGroupsList"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-input
                  id="yu"
                  class="form-control"
                  v-model:value="apiParams.search"
                  allow-clear
                />
              </a-space>
              <label for="yu"> {{ $t("Search_by_name") }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button type="submit" class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                >{{ $t("Search") }}
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
        <div class="table-responsive">
          <table class="content-table" v-if="apiData.data">
            <thead>
              <tr class="table-row">
                <th>
                  <strong>{{ $t("Title") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Curriculum_Education_Year") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Fixed_Groups") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Exam_Questions_count") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Start_At") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Finish_At") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Time") }} ({{ $t("minute") }})</strong>
                </th>
                <th>
                  <strong>{{ $t("action") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Active") }}</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="element in apiData.data"
                :key="element.id"
              >
                <td>
                  <router-link to="/curriculum/exam/subject">
                    {{ element?.name }} <br />
                  </router-link>
                </td>
                <td>
                  {{ element?.semester.academic_year }}
                </td>
                <td>
                  <div
                    v-for="(group, index) in element?.academic_groups"
                    :key="index"
                  >
                    <span class="ms-2"> {{ group?.academic_group?.name }}</span>
                  </div>
                </td>
                <td>
                  {{ element?.quvestionsCount }} / {{ element?.quvestions }}
                </td>
                <td>{{ element?.datetime_start }} <br /></td>
                <td>
                  {{ element?.datetime_end }}
                </td>
                <td>{{ element?.deadline }} {{ $t("minute") }}</td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <router-link to="/curriculum/exam/subject">
                          <i
                            class="mdi mdi-pencil font-size-18 text-primary"
                          ></i
                        ></router-link>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="cancel"
                          ><i class="mdi mdi-delete font-size-18"></i
                        ></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="form-check form-switch my-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                      v-model="element.active"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <NoData />
          </div>

          <!-- --------------end pagination--------------------- -->
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.examPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 125px 250px 100px 100px 100px 140px 90px 100px;
    @include mobile() {
      grid-template-columns: 200px 100px 150px 100px 100px 100px 100px 80px 60px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-child(1) {
        display: flex;
        justify-content: left;
      }
    }
  }
}
</style>
