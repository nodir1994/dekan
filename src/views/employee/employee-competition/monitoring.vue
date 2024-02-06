<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { employeeCompetitionMonitoringList } from "@/utils/api/employee/employee-competition";
import { useUserStore } from "@/stores/user";
import { departmentList } from "@/utils/api/reference/index";
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

//filterlar
const optionsDepartmentByFaculty = ref([]);
const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams = reactive({
  department_id: null,
  name: "",
  page: 1,
});
onMounted(async () => {
  optionsDepartmentByFaculty.value = await departmentList().then(
    (res) => res.result
  );
});
await fetchList();

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);
// search
async function onSearch() {
  await fetchList();
}

//filter kafedra / bo'lim
watch(
  () => apiParams.department_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

async function fetchList() {
  const res = await employeeCompetitionMonitoringList(apiParams);
  Object.assign(apiData, res.result);
}
</script>
<template>
  <div pagetitle="'Malaka oshirish'" class="monitoring-competition-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/employee/employee-competition"
              >{{ $t("Employee_Competition") }} /
            </router-link>
            {{ $t("Teacher_competition_monitoring") }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
            <router-link to="/employee/employee-competition"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Back") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
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
                  v-model:value="apiParams.department_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsDepartmentByFaculty"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Department") }}</label>
            </div>
          </div>
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
                <th>{{ $t("Employee") }}</th>
                <th>{{ $t("Hei_cathedra") }}</th>
                <th>{{ $t("by_Post") }}</th>
                <th>{{ $t("Staff_Date") }}</th>
                <th>{{ $t("Competition_position") }}</th>
                <th>{{ $t("Competition_date") }}</th>
                <th>{{ $t("Difference") }}</th>
                <th>{{ $t("Deadline") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="(element, index) in apiData.data"
                :key="index"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element?.fullname }}
                </td>
                <td>
                  {{ element?.department }}
                </td>
                <td>
                  {{ element?.position }}
                </td>
                <td>
                  {{ element?.date_position }}
                </td>
                <td>
                  <span v-if="element.select_position == null"
                    >({{ $t("Not_given") }})</span
                  >
                  <span v-else>{{ element?.select_position }}</span>
                </td>
                <td>
                  <span v-if="element.date_selection == null"
                    >({{ $t("Not_given") }})</span
                  >
                  <span v-else>{{ element?.date_selection }}</span>
                </td>
                <td>
                  <span v-if="element.difference == null">-</span>
                  <span v-else>{{ element?.difference }}</span>
                </td>
                <td>
                  <span v-if="element.term == null">-</span>
                  <span v-else>{{ element?.date_selection }}</span>
                </td>
              </tr>
            </tbody>
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
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
  </div>
</template>

<style lang="scss">
.monitoring-competition-page {
  .table-row {
    grid-template-columns: 50px auto 20% 12% 12% 12% 10% 5% 90px;
    @include mobile() {
      grid-template-columns: 50px 40px 200px 100px 100px 100px 90px 100px 90px;
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
