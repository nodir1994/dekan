<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from "vue";
import { getStudentList, setStatus } from "@/utils/api/attendance/status";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import { useNotyf } from "@/composable/useNotyf";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const notif = useNotyf();
const changeStatus = ref(false);
const isSearch = ref(false)
const { t } = useI18n();
const plainOptions = ref([]);
const loader = ref(true);
const isLoading = ref(false);
const apiData: any = reactive({
  search: "",
  date_start: null,
  date_end: null,
  status: "1",
  file: null,
  comment: null,
  current_page: 1,
  students: [],
  data: [],
  per_page: helpers.pagePer,
  links: [],
});

//-------file upload-----
function onChangeFile(val: any, name: string) {
  apiData.file = val;
  if (apiData.file) {
    changeStatus.value = true;
  }
}

var componentKey = reactive({
  key: 0,
});

const checkAll = computed({
  get() {
    return apiData?.students?.length === plainOptions?.value?.length;
  },
  set(val) {
    if (val) {
      apiData.students = plainOptions.value;
    } else {
      apiData.students = [];
    }
  },
});
await fetchList();

watch(
  () => [apiData.date_start, apiData.date_end,],
  async (newVal) => {
    await fetchList();
  }
);
watch(
  () => apiData.search,
  async (newVal) => {
    isSearch.value = true
    if (apiData.search == "" && isSearch.value == true) {
      await fetchList();
      isSearch.value = false
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

async function fetchList(pages?: number) {
  isLoading.value = true;
  let datas: any = reactive({
    page: pages || 1,
    per_page: apiData.per_page,
  });
  if (apiData.search) datas.search = apiData.search;
  if (apiData.date_start) datas.date_start = apiData.date_start;
  if (apiData.date_end) datas.date_end = apiData.date_end;
  try {

    if (loader.value) {
      loader.value = false;
      const res = await getStudentList(datas);
      Object.assign(apiData, res.result);
      plainOptions.value = apiData.data.map((item: any) => item.id);
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

async function submitData() {
  isLoading.value = true
  const formData = new FormData();

  formData.append("status", apiData.status);
  formData.append("file", apiData.file);
  formData.append("comment", apiData.comment);
  formData.append("students", apiData.students);

  for (var i = 0; i < apiData.students.length; i++) {
    formData.append("attendances[]", apiData.students[i]);
  }

  // console.log(formData)
  try {
    loader.value = true;
    const res = await setStatus(formData);
    notif.success(t("Data_stored_successfully"));
    apiData.status = null;
    apiData.file = null;
    apiData.comment = null;
    plainOptions.value = [];
    apiData.students = [];
    componentKey.key++;
    fetchList();
  } catch (error: any) {
    // Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error?.response?.data?.message);
  } finally {
    loader.value = false;
    isLoading.value = false
  }
}
</script>

<template>
  <div pagetitle="`Davomat statusi`" class="studentListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("attendance_Activity") }}</h5>
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
            <!-- //fakultet  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-date-picker v-model:value="apiData.date_start" allow-clear value-format="YYYY-MM-DD"
                  :placeholder="$t('Enter_start_date')" />
              </a-space>
              <label for="yu">{{ $t("Enter_start_date") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-date-picker v-model:value="apiData.date_end" value-format="YYYY-MM-DD" allow-clear
                  :placeholder="$t('Enter_end_date')" />
              </a-space>
              <label for="yu">{{ $t("Enter_end_date") }}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-md-10 form--item">
              <a-space>
                <a-input allow-clear id="yu" class="form-control" v-model:value="apiData.search" />
              </a-space>
              <label for="yu">{{
                $t("Search_by_Group_Student_Teacher_Subject")
              }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-md-2">
              <button class="btn-search search-color" @click="fetchList()">
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
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <LoadingOverlay v-if="isLoading" />
              <div v-if="apiData.data.length" class="table-responsive">
                <table class="content-table">
                  <thead>
                    <tr class="table-row-student-list">
                      <th>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="checkAll" />
                        </div>
                      </th>
                      <th>#</th>
                      <th>{{ $t("Student") }}</th>
                      <th>{{ $t("Lesson_Date") }}</th>
                      <th>{{ $t("condition") }}</th>
                      <th>{{ $t("Download1") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="table-row-student-list" v-for="(element, index) in apiData.data" :key="element?.id">
                      <td>
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" v-model="apiData.students"
                            :value="element?.id" />
                        </div>
                      </td>
                      <td>
                        {{
                          (apiData.current_page - 1) * apiData.per_page +
                          index +
                          1
                        }}
                      </td>
                      <td>
                        {{ element.student }}
                      </td>
                      <td>
                        <div>
                          <template v-if="element?.semester">
                            {{ element?.semester }}-{{ $t("semestr") }} /
                          </template>
                          {{ element?.date }} <br />
                          <span style="color: #a99494">{{ element?.pair?.time_start }}-{{
                            element?.pair?.time_end
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <span class="text-success" v-if="element?.status_id">{{
                          $t("absent_On")
                        }}</span>
                        <span class="text-danger" v-else>{{
                          $t("absent_Off")
                        }}</span>
                      </td>
                      <td v-if="element.file" class="justify-content-center">
                        <a :href="element.file" target="_blank" class="btns c-save">
                          <i class="mdi mdi-download font-size-18"></i></a>
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
          <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
            apiData.data.length +
            apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
        </div>
        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-input" class="form-label">{{
                  $t("Status")
                }}</label>
                <a-select v-model:value="apiData.status" :placeholder="t('select__status__student')">
                  <a-select-option value="1">{{
                    $t("absent_On")
                  }}</a-select-option>
                  <a-select-option value="0">{{
                    $t("absent_Off")
                  }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-input" class="form-label">{{
                  $t("Reason")
                }}</label>
                <a-textarea v-model:value="apiData.comment" :auto-size="{ minRows: 3, maxRows: 5 }" />
              </a-form-item>
              <a-form-item>
                <label for="division-name-select" class="form-label">{{
                  $t("file")
                }}</label>
                <a-form-item name="dragger">
                  <UploadFile :key="componentKey.key" :on-upload="onChangeFile" />
                </a-form-item>
              </a-form-item>
              <div class="d-flex justify-content-end">
                <button class="btns c-save" @click="submitData" :disabled="
                  !apiData?.students?.length ||
                  !apiData.comment ||
                  !apiData.status ||
                  !changeStatus || isLoading
                ">
                  <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"
                    v-if="isLoading"></span>
                  <i class="mdi mdi-check font-size-14 align-middle me-1" v-else></i>{{ $t("Save") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.studentListPage {
  .table-row-student-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 50px auto 200px 120px 100px;
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
