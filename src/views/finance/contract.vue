<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import {
  specialList,
  eduFormList,
  academicGroupsList,
  academicYearsList,
  semestrList,
  academicGroupsListBySpeciliatyByEduForm,
} from "@/utils/api/reference/index";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import {
  contractAllList,
  exportListForStudent,
} from "@/utils/api/finance/contract";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();
const isLoading = ref(false);
const loader = ref(true);
const apiData: any = reactive({
  specialty_id: null,
  edu_form_id: null,
  academic_group_id: null,
  academic_year_id: null,
  course: null,
  current_page: 1,
  students: [],
  data: [],
  links: [],
  per_page: helpers.pagePer,
});

const sideFormOptions: any = reactive({
  specialtyOptions: null,
  eduFormOptions: null,
  academicGroupOptions: null,
  academicYearsOptions: null,
  courseOptions: [
    {
      course: 1,
      name: `1-${t("Course")}`,
    },
    {
      course: 2,
      name: `2-${t("Course")}`,
    },
    {
      course: 3,
      name: `3-${t("Course")}`,
    },
    {
      course: 4,
      name: `4-${t("Course")}`,
    },
    {
      course: 5,
      name: `5-${t("Course")}`,
    },
    {
      course: 6,
      name: `6-${t("Course")}`,
    },
  ],
  semesterOptions: null,
});

await fetchList();

// function onlyUnique(value, index, self) {
//   return self.indexOf(value.course) === index.course;
// }

onMounted(async () => {
  const key = "id";
  sideFormOptions.specialtyOptions = await specialList().then((res) =>
    res?.result?.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    })
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res?.result
  );
  sideFormOptions.academicGroupOptions = await academicGroupsList().then(
    (res) => res?.result?.data
  );
  sideFormOptions.academicYearsOptions = await academicYearsList().then(
    (res) => res?.result?.data
  );
  sideFormOptions.semesterOptions = await semestrList().then((res) =>
    res?.result?.data.map((item: any) => {
      return { id: item.id, name: item.course + "-" + t("Course") };
    })
  );
  sideFormOptions.semesterOptions = [
    ...new Map(
      sideFormOptions.semesterOptions.map((item: any) => [item[key], item])
    ).values(),
  ];
});

watch(
  () => [
    apiData.course,
    apiData.academic_year_id,
    apiData.academic_group_id,
    apiData.edu_form_id,
    apiData.specialty_id,
  ],
  async (newVal, oldVal) => {
    await fetchList();
    if (apiData.edu_form_id && apiData.specialty_id) {
      let datas: any = reactive({
        edu_form_id: apiData.edu_form_id,
        specialty_id: apiData.specialty_id,
      });
      sideFormOptions.academicGroupOptions =
        await academicGroupsListBySpeciliatyByEduForm(datas).then(
          (res) => res?.result?.data
        );
      await fetchList();
    }
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

async function downloadFile() {
  let datas: any = {};
  if (apiData.course) datas.course = apiData.course;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData.academic_year_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  if (apiData.specialty_id) datas.specialty_id = apiData.specialty_id;

  try {
    isLoading.value = true;
    const res = await exportListForStudent(datas);
    const url = URL.createObjectURL(
      new Blob([res], {
        type: "application/vnd.ms-excel",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${t("Contract_Payment")}-${Date.now()}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
}
async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData.specialty_id) datas.specialty_id = apiData.specialty_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData.academic_year_id;
  if (apiData.course) datas.course = apiData.course;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await contractAllList(datas);
      Object.assign(apiData, res.result);
      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="`Shartnoma to'lovi`" class="studentListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            {{ $t("Finance_Payment_Monitoring_Department") }}
          </h5>
          <div class="panel-toggles">
            <button
              @click="downloadFile()"
              class="btns c-save py-1.5 px-4 me-3"
              type="submit"
            >
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i
              >{{ $t("Export_to_Excel") }}
            </button>
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
          <div class="row">
            <!-- //fakultet  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- //mutaxassislikni  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.specialty_id"
                  :options="sideFormOptions.specialtyOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>
            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiData.edu_form_id"
                  allow-clear
                  :options="sideFormOptions.eduFormOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="apiData.academic_group_id"
                  :options="sideFormOptions.academicGroupOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :options="sideFormOptions.academicYearsOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //Kursni tanlang  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.course"
                  :options="sideFormOptions.courseOptions"
                  :field-names="{ value: 'course', label: 'name' }"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Level") }}</label>
            </div>
          </div>
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
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-rating-contract">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Finance_To_Set_Student_Contract") }}</th>
                    <th>{{ $t("Finance_To_Set_Student_number") }}</th>
                    <th>{{ $t("amount_of_minimum_wage") }}</th>
                    <th>{{ $t("Paid_Contract_Fee") }}</th>
                    <th>{{ $t("Contract_Indebtedness") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-rating-contract"
                    v-for="(element, index) in apiData.data"
                    :key="element?.id"
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
                      {{ element?.academic_group }}
                    </td>
                    <td>
                      {{ element?.specialty?.name }}
                    </td>
                    <td>
                      {{ element?.academic_year }}
                    </td>
                    <td>
                      {{ element?.payment_type }}
                    </td>
                    <td>
                      {{ element?.contract_number }}
                    </td>
                    <td>
                      {{ element?.summa }}
                    </td>
                    <td>
                      {{ element?.payment }}
                    </td>
                    <td>
                      {{ element?.debt }}
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
            apiData?.data.length +
            apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.studentListPage {
  .table-row-rating-contract {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 100px 170px 120px 130px 160px 115px 115px 115px;

    @include mobile() {
      // grid-template-columns: 50px auto 140px 100px 100px 100px 140px 170px 170px;
    }
  }
}

.studentListPage .content-table {
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
</style>
