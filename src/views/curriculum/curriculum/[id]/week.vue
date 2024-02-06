<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { weekList, changeStatus } from "@/utils/api/edu/week";
import { semesterListById } from "@/utils/api/reference/index";
import { fetchPlanById } from "@/utils/api/edu/plan";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
import helpers from "@/utils/helper";
const { t } = useI18n();

const route: any = useRoute();
const router = useRouter();
const isLoading = ref(false);
const notif = useNotyf();
const curriculumID = (route.params?.id as number) ?? null;
const selectedId = ref<number | null>(null);
const curriculum_id = ref<number | null>(null);

// const optionsSemester = await semesterList().then((res) => res.result);
const optionsSemester = ref([]);
const eduPlanName: any = ref({});
const apiParams: any = reactive({
  edu_plan_id: curriculumID,
  semester_id: null,
  search: null,
  page: 1,
  per_page: helpers.pagePer,
});

const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

onMounted(async () => {
  let ress = await semesterListById(curriculumID);

  optionsSemester.value = ress?.result?.data.map((item: any) => {
    return {
      id: item.id,
      name:
        item.semester +
        "-" +
        t("semester") +
        " / " +
        item.course +
        "-" +
        t("course_number"),
    };
  });
});

await fetchList();

//filter semester
watch(
  () => apiParams.semester_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);
watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
//search
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
  try {
    const res = await weekList(datas);
    Object.assign(apiData, res.result);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.push("/employees/base");
}
//open form modal
function openFormModal(id: number) {
  selectedId.value = id;
  curriculum_id.value = curriculumID;
  const modal = Modal.getOrCreateInstance("#weekFormModal");
  modal.show();
}

function onModalClose() {
  selectedId.value = null;
}

//update status
async function updateStatus(id: number, weekType: string) {
  isLoading.value = true;
  try {
    await changeStatus(id);
    notif.success(`[${weekType}] - ${t("Status_changed_successfully")}`);
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="'Xaftaliklar'" class="week-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/curriculum"
              >{{ $t("Curriculum") }} / </router-link
            >{{ apiData.data[0]?.edu_plan?.name }}
          </h5>
          <div class="panel-toggles">
            <div v-if="0" class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
            <router-link
              class="btns black-c py-1.5 px-4"
              to="/curriculum/curriculum"
            >
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Back") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form @submit.prevent="onSearch" class="row">
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.semester_id"
                  :options="optionsSemester"
                  allow-clear
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Semester_And_Course") }}</label>
            </div>
            <!-- //izlash  -->
            <!-- <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.week_type_id"
                  :options="optionsSemester"
                  allow-clear
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select
              ></a-space>
              <label for="yu">{{ $t("Education_Week_Type") }}</label>
            </div> -->
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>№</th>
                <th>{{ $t("Week") }}</th>
                <th>{{ $t("by_Level") }}</th>
                <th>{{ $t("Semester_Name") }}</th>
                <th>{{ $t("Week_type") }}</th>
                <th>{{ $t("action") }}</th>
                <th>{{ $t("Active") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(element, index) in apiData.data"
                :key="index"
                class="table-row d-grid w-100"
                :class="element?.type?.code"
              >
                <td>
                  {{
                    index + 1 + apiData?.per_page * (apiData?.current_page - 1)
                  }}
                  {{}}
                </td>
                <td>{{ element?.date }}</td>
                <td>
                  <span v-if="element?.semester?.course"
                    >{{ element?.semester?.course }} -{{
                      $t("course_number")
                    }}</span
                  >
                  <span v-else>{{ $t("not_set") }}</span>
                </td>
                <td>
                  <span v-if="element?.semester?.semester"
                    >{{ element?.semester?.semester }} -{{
                      $t("semester_number")
                    }}</span
                  >
                  <span v-else>{{ $t("not_set") }}</span>
                </td>
                <td>{{ element?.type?.name }}</td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" @click="openFormModal(element.id)">
                          <i
                            class="mdi mdi-pencil font-size-18 text-primary"
                          ></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  <div class="form-check form-switch my-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      :checked="element.status"
                      :disabled="isLoading"
                      @change="updateStatus(element.id, element.type.name)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination
            v-if="apiData.last_page > 1"
            class="mt-2"
            v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page"
          />
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center mb-0">{{ $t("No_information_found") }}</p>
        </div>
      </div>
    </div>
    <WeekFormModal
      :week-id="selectedId"
      :curriculum-id="curriculumID"
      @update:list="fetchList"
      @close="onModalClose"
    />
    <span class="element-count mb-2" v-if="apiData.data.length"
      ><span v-if="apiData.last_page > 1">
        {{ apiData.current_page }}-{{
          apiData.data.length + apiData.per_page * (apiData.current_page - 1)
        }}
        /
      </span>
      {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >
  </div>
</template>

<style lang="scss">
.week-page {
  .table-row {
    grid-template-columns: 50px auto 15% 20% 20% 80px 70px;

    @include mobile() {
      grid-template-columns: 50px 200px 100px 100px 120px 80px 70px;
    }
  }
}

body {
  .vacation {
    background-color: #ffadad !important;
  }
}
</style>
