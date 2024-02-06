<script setup lang="ts">

import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";

import {
  academicGroupsList,
  academicYearsList,
  getListSubjectsAcademicAndYear,
  semesterListByAcademicYear,
  specialList,

} from "@/utils/api/reference";
import { getCalendarPlanLists } from "@/utils/api/subject/calendar";
import helpers from "@/utils/helper";

// import { getAttachLists, setAttachList } from "@/utils/api/students/attach";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);


// jadval bino
const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams: any = reactive({
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
  subject_id: null,
  page: 1,
  per_page: helpers.pagePer
});

const formOptions = reactive({
  academicYearOptions: null,
  semesterOptions: null,
  groupOptions: null,
  subjectOptions: null
});


await fetchList();

onMounted(async () => {
  formOptions.academicYearOptions = await academicYearsList().then(
    (res) => res?.result?.data
  );
}),

  watch(
    () => apiParams.academic_year_id,

    async () => {
      apiParams.semester_id = null;
      apiParams.academic_group_id = null;
      apiParams.subject_id = null;
      if (apiParams.academic_year_id) {
        formOptions.semesterOptions = await semesterListByAcademicYear(apiParams.academic_year_id).then((res: any) => res?.result?.data.map((item: any) => {
          return {
            id: item.id,
            name: item.semester + '-' + t('semester')
          }
        }))
      }
      await fetchList();
    }
  );
watch(
  () => apiParams.academic_year_id,

  async () => {
    if (apiParams.academic_year_id) {
      formOptions.groupOptions = await academicGroupsList(apiParams.academic_year_id).then((res: any) => res?.result?.data)
    }
    await fetchList();
  }
);
watch(
  () => apiParams.academic_year_id && apiParams.academic_group_id,

  async () => {
    if (apiParams.academic_year_id && apiParams.academic_group_id) {
      formOptions.subjectOptions = await getListSubjectsAcademicAndYear(apiParams).then((res: any) => res?.result?.data.map((item: any) => {
        return {
          id: item?.id,
          name: item?.name
        }
      }))
    }
    console.log(formOptions.subjectOptions);

    await fetchList();
  }
);

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
  semester_id: [],
  specialty_id: []
});


async function onSearch() {
  await fetchList();
}

// async function attachData() {
//   try {
//     isLoading.value = true;
//     clearErrors();
//     const res = await setAttachList(sideForm);
//     notif.success(t("Data_stored_successfully"));
//     fetchList();
//   } catch (error: any) {
//     Object.assign(errors, error.response?.data?.errors);
//     notif.error(t("Failed") + ": " + error.message);
//   } finally {
//     isLoading.value = false;
//   }
// }
// function clearErrors() {
//   Object.assign(errors, {
//     specialty_id: [],
//     semester_id: [],
//     academic_group_id: []
//   });
// }

async function fetchList() {
  try {
    isLoading.value = true
    const res = await getCalendarPlanLists(apiParams);
    Object.assign(apiData, res.result);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div pagetitle="'Malaka oshirish'" class="calendarPlanPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t('calendar_Plan') }}</h5>
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
          <div class="row">
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiParams.academic_year_id" :options="formOptions.academicYearOptions"
                  :field-names="{ value: 'id', label: 'name' }" allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiParams.semester_id"
                  :options="formOptions.semesterOptions" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiParams.academic_year_id" allow-clear>
                </a-select>
              </a-space>
              <label>{{ $t('Choose_Semester') }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search
                  v-model:value="apiParams.academic_group_id" :options="formOptions.groupOptions"
                  :field-names="{ value: 'id', label: 'name' }" :disabled="!apiParams.academic_year_id" allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t('Choose_Group') }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiParams.subject_id"
                  :options="formOptions.subjectOptions" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiParams.academic_year_id || !apiParams.academic_group_id" allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t('Choose_Subject') }}</label>
            </div>
          </div>
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
              <tr class="table-row w-100 d-grid">
                <th>#</th>
                <th>{{ $t('Subjects') }}</th>
                <th>{{ $t('edu_plan') }}</th>
                <th>{{ $t('Group') }}</th>
                <th>{{ $t('Training') }}</th>
                <th>{{ $t('Semester_Name') }}</th>
                <th>{{ $t('file') }}</th>
                <th>{{ $t('action') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="index">
                <td>
                <td>{{ (apiData.current_page - 1) * apiData.per_page + index + 1 }}</td>
                </td>
                <td>
                  {{ element?.lesson_activity?.name }}
                </td>
                <td>
                  {{ element?.curriculum_subject?.edu_plan?.name }}
                </td>
                <td>
                  {{ element?.academic_group_id }} <br />
                  {{ element?.language }}
                </td>
                <td>
                  {{ element?.lesson_activity?.type }} <br />
                  {{ element?.employee?.name }}{{ element?.employee?.surname }}
                </td>
                <td>
                  {{ element?.semester }} <br />
                  {{ element?.educationYear }}
                </td>
                <td class="gridjs-td">
                  <a href="#" class="btns diploma-color py-1 px-2 me-1"><i
                      class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t('Download') }} </a>
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <router-link :to="`/subjects/calendar-plan/${element?.id}`">
                        <i class="fas fa-eye me-1"></i>
                      </router-link>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
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
    <!-------START TABLE---------------------------------------->
    <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
      apiData.data.length + apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
  </div>
</template>
<style lang="scss">
.calendarPlanPage {
  .table-row {
    grid-template-columns: 50px auto 280px 120px 180px 120px 130px 70px;

  }

  .content-table {

    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;

      &:nth-last-child(2) {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
      }
    }
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: auto !important;
  }

  .modal-dialog {
    max-width: $mobile;
  }
}
</style>





