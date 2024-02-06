<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import {
  educationList,
  eduFormList,
  paymentTypeList,
} from "@/utils/api/reference";
import {
  exportAppById,
  exportDiplomById,
  getListStudents,
} from "@/utils/api/archive/sheet";
import { useUserStore } from "@/stores/user";

import { academicGroupById, eduPlanById } from "@/utils/api/reference/id";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import helpers from "@/utils/helper";
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const counter = ref(false)
const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  edu_type_id: null,
  payment_type_id: null,
  academic_group_id: null,
  edu_form_id: null,
  edu_year_id: null,
  data: [],
  links: [],
  students: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  paymentTypeOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
  sideFormOptions.paymentTypeOptions = await paymentTypeList().then(
    (res) => res?.result
  );
});



watch(
  () => apiData.edu_type_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_form_id,
  async () => {
    apiData.edu_plan_id = null;
    await fetchList();
    if (apiData.edu_form_id) {
      sideFormOptions.eduPlanOptions = await eduPlanById(
        apiData.edu_form_id
      ).then((res) => res.result?.data);
    }
  }
);

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (apiData.edu_plan_id) {
      let res = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
    }
  }
);

watch(
  () => [apiData.academic_group_id, apiData.payment_type_id,],
  async () => {
    await fetchList();
  }
);
watch(
  () => apiData.search,
  async (newVal, oldVal) => {
    counter.value = true
    if (apiData.search == "" && counter.value == true) {
      await fetchList();
      counter.value = false;
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

// async function downloadFile(id){
//     einwo
// }

async function fetchList(pages?: number) {
  isLoading.value = true;
  let datas: any = {
    page: pages || 1,
    per_page: apiData.per_page,
  };
  if (apiData.search != "") datas.search = apiData?.search;
  if (apiData.edu_type_id) datas.edu_type_id = apiData?.edu_type_id;
  if (apiData.edu_form_id) datas.edu_form_id = apiData?.edu_form_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData?.edu_plan_id;
  if (apiData.payment_type_id) datas.payment_type_id = apiData?.payment_type_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(datas);
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
function saveByteArray(pdfUrl: any) {
  // set the blog type to final pdf
  const file = new Blob([pdfUrl], { type: "application/pdf" });

  // process to auto download it
  const fileURL = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = "FileName" + new Date() + ".pdf";
  link.click();
}

async function downloadDiplom(id: number) {
  let byte = await exportDiplomById(id);
  // console.log(byte);

  saveByteArray(byte);
}

async function downloadSupplement(id: number) {
  let byte = await exportAppById(id);
  // console.log(byte);
  saveByteArray(byte);
}
</script>

<template>
  <div pagetitle="``" class="studentListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Study__sheet") }}</h5>
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
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="fetchList()">
            <!-- //fakultet  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //to'lov shakli  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
                  v-model:value="apiData.payment_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.paymentTypeOptions" :placeholder="t('Select_payment_form')" allowClear>
                </a-select>
              </a-space>
              <label>{{ $t("Select_payment_form") }}</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose_Education_Type')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions" :placeholder="t('Choose_Education_Form')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_plan_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_form_id" :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_plan_id" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>  

            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear />
              </a-space>
              <label for="yu">{{
                $t("choose__fish__student__passport__code")
              }}</label>
            </div>
            <!-- //search button  -->
            <div class="my-2 col-md-2">
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
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="table-responsive" v-if="apiData.data.length > 0">
              <table class="content-table">
                <thead>
                  <tr class="table-row-sheet-index">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th class="justify-content-center">{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-sheet-index" v-for="(element, index) in apiData.data" :key="element?.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div>
                        {{ element?.full_name }} <br />
                        <span style="color: #ccc" class="py-1 d-block">{{
                          element?.pinfl
                        }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.edu_type }}<br />
                        <span style="color: #ccc">{{ element?.edu_form }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.specialty }}<br />
                        <span style="color: #ccc">{{
                          element?.academic_group
                        }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.semester }} - {{ $t("semester_number")
                        }}<br />
                        <span style="color: #ccc">{{
                          element?.academic_year
                        }}</span>
                      </div>
                    </td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                    <td class="justify-content-center">
                      <div class="action__td">
                        <a @click="downloadDiplom(element.id)" class="btns c-save py-2 px-4 me-2" target="_blank">
                          <i class="mdi mdi-download font-size-12"></i>
                          {{ $t("Download") }}
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page" :loading="isLoading" />
              <!-------------END PAGINATION-------------->
            </div>
            <div class="table-responsive" v-else>
              <NoData />
            </div>
          </div>
        </div>
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.studentListPage {
  .table-row-sheet-index {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 180px 220px 140px 100px 200px;
  }
}
</style>
