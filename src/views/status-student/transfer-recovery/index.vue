<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

import { educationList, eduFormList, studentStatusList } from "@/utils/api/reference";
import {
  getListStudents,
} from "@/utils/api/student-action/recover";

import Swal from "sweetalert2";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData = reactive({
  search: "",
  student_status_id: null,
  edu_type_id: null,
  edu_form_id: null,
  data: [],
  links: [],
  current_page: 1,
  per_page: helpers.pagePer
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  optionsStatuses: null

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
  sideFormOptions.optionsStatuses = await studentStatusList().then(
    (res) => res.result
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
    await fetchList();
  }
);

watch(
  () => apiData.student_status_id,
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

async function onSearch() {
  await fetchList();
}


async function fetchList(pages?: number) {
  let params: any = reactive({
    page: pages || 1,
    per_page: apiData.per_page,
  });
  if (apiData.edu_type_id) params.edu_type_id = apiData.edu_type_id;
  if (apiData.edu_form_id) params.edu_form_id = apiData.edu_form_id;
  if (apiData.student_status_id) params.student_status_id = apiData.student_status_id;
  if (apiData.search) params.search = apiData.search;
  isLoading.value = true;

  try {
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(params);
      Object.assign(apiData, res.result);
      setTimeout(() => {
        loader.value = true;
      }, 100);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`O'qishni tiklash`" class="student-recovery-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t('education__recovery') }}</h5>
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
          <div class="row">
            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose_Education_Type')">
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.edu_form_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions" :placeholder="t('Choose_Education_Form')">
                </a-select>
              </a-space>
              <label>{{ $t('Choose_Education_Form') }}</label>
            </div>
            <!-- //talaba holati  -->
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item" allowClear
                  v-model:value="apiData.student_status_id" :options="sideFormOptions.optionsStatuses" :placeholder="t('select__status__student')"
                  :field-names="{ value: 'id', label: 'name' }">
                </a-select>
              </a-space>
              <label for="yu">{{ $t('select__status__student') }}</label>
            </div>
            <!-- //izlash  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear />
              </a-space>
              <label for="yu">{{ $t('choose__fish__passport__code') }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-md-2">
              <button class="btn-search search-color" @click="onSearch">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
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
                  <tr class="table-row d-grid w-100">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t('Group') }}</th>
                    <th>{{ $t('by_Level') }}</th>
                    <th>{{ $t('Transfer_Status') }}</th>
                    <th>{{ $t("Updated_At") }}</th>
                    <th>{{ $t('action') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div>
                        {{ element?.fullname }} <br />
                        <span class="c-gray"> {{ element?.id }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.specialty?.edu_type?.name }} <br />
                        <span class="c-gray">
                          {{ element?.edu_form }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.academic_group?.name }} <br />
                        <span class="c-gray"> {{ element?.edu_plan?.name }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.semester?.course }} - {{ $t('course_number') }} <br />
                        <span class="c-gray"> {{ element?.semester?.semester }} - {{ $t('semester_number') }}</span>
                      </div>
                    </td>
                    <td>
                      {{ element?.student_status?.name }}
                    </td>
                    <td>
                      {{ element?.updated_at }}
                    </td>
                    <td>
                      <router-link class="btns search btn btn-success"
                        :to="{ path: `/status-student/transfer-recovery/${element?.id}` }">
                        <i class="mdi mdi-reload font-size-14 align-middle me-1"></i>{{ $t('Restore') }}
                      </router-link>
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
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
      apiData?.data.length +
      apiData.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.student-recovery-page {
  .table-row {
    grid-template-columns: 50px auto 10% 16% 10% 12% 12% 120px;

    @include mobile() {
      grid-template-columns: 50px auto 100px 200px 120px 120px 160px 120px;
    }

    td,
    th {
      &:last-child {
        justify-content: center;
      }
    }
  }
}

.student-recovery-page .content-table {

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