<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from "vue";
import { studentStatusList, facultyList } from "@/utils/api/reference/index";
import { searchListStatuses } from "@/utils/api/student-action/statuses";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const { t } = useI18n();
const isLoading = ref(false);

const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const loader = ref(true);

const apiParams = reactive({
  student_status_id: null,
  search: "",
  page: 1,
  per_page: helpers.pagePer,
});

const optionsStatuses = await studentStatusList().then((res) => res.result);
const optionFacultylist = await facultyList().then((res) => res.result);

await fetchList();

async function onSearch() {
  await fetchList();
}

watch(
  () => apiParams.student_status_id,
  async () => {
    await fetchList();
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
async function fetchList(page?: number) {
  if (loader.value) {
    loader.value = false;
    let datas = {
      student_status_id: apiParams.student_status_id || null,
      search: apiParams.search || null,
      page: page || 1,
      per_page: apiParams.per_page,
    };
    const res = await searchListStatuses(datas);
    Object.assign(apiData, res.result);
    setTimeout(() => {
      loader.value = true;
    }, 100);
  }
}
</script>
<template>
  <div pagetitle="'Talaba holati'" class="student-status-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Transfer_Status") }}</h5>
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
          <form class="row" @submit.prevent="onSearch">
            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select class="form--item" allowClear :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiParams.student_status_id" :options="optionsStatuses"
                  :field-names="{ value: 'id', label: 'name' }">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__status__student") }}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-input id="yu" class="form-control" v-model:value="apiParams.search" allow-clear />
              </a-space>
              <label for="yu">{{
                $t(
                  "Search_by_Name_ID_Number_Passport_Decree_Number_Decree_Date"
                )
              }}</label>
            </div>

            <!-- //search button  -->
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
    <div class="card">
      <div class="card-body">
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>#</th>
                <th>{{ $t("Student") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("by_Level") }}</th>
                <th>{{ $t("Group") }}</th>
                <th>{{ $t("Transfer_Status") }}</th>
                <th>{{ $t("Document_number") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row d-grid w-100" v-for="(element, index) in apiData.data" :key="element?.id">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  <div>
                    {{ element?.fullname }} <br />
                    <span class="c-gray">{{ element?.user_id }} / {{ element?.passport }} /
                      {{ element?.faculty?.name }}</span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ element?.specialty?.edu_type?.name }} <br />
                    <span class="c-gray"> {{ element?.edu_form?.name }}</span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ element?.semester?.course }}-{{ $t("Course") }} <br />
                    <span class="c-gray">
                      {{ element?.semester?.semester }}-{{
                        $t("semester")
                      }}</span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ element?.academic_group?.name }} <br />
                    <span class="c-gray">
                      {{ element?.semester?.date_start }}</span>
                  </div>
                </td>
                <td>{{ element?.student_status?.name }}</td>
                <td>
                  <div>
                    {{ element?.document_number }}<br />
                    {{ element?.document_seria }}<br />
                    <span class="c-gray">{{ element?.date }}</span>
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
    <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
      apiData.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.student-status-page {
  .table-row {
    grid-template-columns: 50px auto 13% 10% 13% 13% 150px;

    @include mobile() {
      grid-template-columns: 50px 200px 100px 100px 100px 100px 150px;
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
