<script setup lang="ts">
import { Modal } from "bootstrap";
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import { eduPlanList, academicYearsList } from "@/utils/api/reference/index";
import {
  semesterByIdOnlyAcademicYearEduPlan,
  getSubjectssBySemestrIdAcademicId,
} from "@/utils/api/reference/id";
import {
  getAllgroup,
  addCoordinator,
  deleteCoordinatorSubjectById,
} from "@/utils/api/coordinator/all";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);

const apiData: any = reactive({
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  data: [],
  links: [],
  students: [],
  per_page: helpers.pagePer,
  current_page: 1,
  page: 1,
});

const modalData: any = reactive({
  academic_group_id: null,
  semester_id: null,
  subjects: [],
  date_list: null,
  date_start: null,
  date_end: null,
});

const sideFormOptions: any = reactive({
  eduPlanOptions: null,
  academicYearsOptions: null,
  semesterOptions: null,
  subjectOptions: null,
});
sideFormOptions.academicYearsOptions = await academicYearsList().then(
  (res) => res?.result?.data
);
apiData.academic_year_id = sideFormOptions.academicYearsOptions.find(
  (item: any) => {
    return item.is_current == true;
  }
).id;
onMounted(async () => {
  sideFormOptions.eduPlanOptions = await eduPlanList().then(
    (res) => res?.result?.data
  );
});

watch(
  () => [apiData.edu_plan_id, apiData.academic_year_id],
  async (newVal, newVal2) => {
    apiData.semester_id = null;
    sideFormOptions.semesterOptions = null;
    await fetchList();
    if (apiData.edu_plan_id && apiData.academic_year_id) {
      sideFormOptions.semesterOptions =
        await semesterByIdOnlyAcademicYearEduPlan(
          apiData.edu_plan_id,
          apiData.academic_year_id
        ).then((res) =>
          res?.result?.data.map((item: any) => {
            return {
              id: item.id,
              name: item.semester + "-" + t("semester_number"),
            };
          })
        );
    }
  }
);

watch(
  () => apiData.semester_id,
  async () => {
    await fetchList();
  }
);

await fetchList();

function closeModal() {
  let modal = Modal.getOrCreateInstance("#AllGroupCoordinator");
  modal.hide();
}

async function sendCoordinator() {
  try {
    isLoading.value = true;
    clearErrors();
    await addCoordinator(modalData);
    closeModal();
    notif.success(t("updated_successfully"));
    fetchList();
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}
function clearErrors() {
  Object.assign(errors, {
    date_start: [],
    date_end: [],
    subjects: [],
  });
}
const errors = reactive({
  date_start: [],
  date_end: [],
  subjects: [],
});

async function openModal(element: any) {
  // console.log(element)
  modalData.current = [];
  modalData.current = element?.group_session_time.subjects;
  modalData.subjects = [];
  element?.group_session_time?.subjects.forEach((element: any) => {
    modalData.subjects.push(element?.subject_id);
  });
  modalData.date_start = element?.group_session_time?.date_start || null;
  modalData.date_end = element?.group_session_time?.date_end || null;
  modalData.academic_group_id = element?.id;
  modalData.semester_id = element?.semester_id;
  sideFormOptions.subjectOptions = await getSubjectssBySemestrIdAcademicId(
    modalData.academic_group_id,
    modalData.semester_id
  ).then((res) =>
    res?.result?.map((item: any) => {
      return {
        id: item?.subject?.id,
        subject_id: item?.id,
        name: item?.subject?.name,
      };
    })
  );
}

async function fetchList() {
  let datas: any = {};
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData.academic_year_id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  isLoading.value = true;
  try {
    if (apiData.academic_year_id) {
      const res = await getAllgroup(datas);
      Object.assign(apiData, res.result);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function deleteSubjectById(e: any) {
  console.log(e);
  let id = modalData.current.find((x: any) => x.subject_id == e).id;
  try {
    await deleteCoordinatorSubjectById(id);
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div pagetitle="'Kordinator'" class="all-group">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("all_groups") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
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
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ t("Please_select_curriculum") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicYearsOptions"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.semester_id"
                  :disabled="!apiData.edu_plan_id || !apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose_Semester')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Semester") }}</label>
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
          <!-- {{ apiData.data }} -->
          <table class="content-table">
            <thead>
              <tr class="table-row-schedule">
                <th><strong>#</strong></th>
                <th>
                  <strong>{{ $t("Group") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("study_plan") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Academic_year") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Semester_Name") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Subjects") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Time") }}</strong>
                </th>
                <th>
                  <strong>{{ $t("Actions") }}</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-schedule"
                v-for="(element, index) in apiData.data"
                :key="element?.id"
              >
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index + 1
                  }}
                </td>
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.edu_plan }}
                </td>
                <td>
                  {{ element.academic_year }}
                </td>
                <td>{{ element.semester }} - {{ $t("semester") }}</td>
                <td class="d-flex flex-wrap">
                  <span
                    v-for="item in element?.group_session_time?.subjects"
                    :key="item.id"
                    class="actions-h me-1"
                  >
                    {{ item.name }}
                  </span>
                </td>

                <td>
                  {{ element?.group_session_time?.date_start }}
                  <br />
                  {{ element?.group_session_time?.date_end }}
                </td>
                <td
                  data-bs-toggle="modal"
                  @click="openModal(element)"
                  data-bs-target="#AllGroupCoordinator"
                >
                  <button class="btns c-save">
                    <i class="mdi mdi-plus me-1"></i>
                    {{ $t("add") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->

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
    <span class="element-count mb-2" v-if="apiData.data.length"
      >{{ apiData.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData.current_page - 1)
      }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
    >

    <!-- <AllGroupCoordinator /> -->
    <!-------START TABLE---------------------------------------->
    <div
      id="AllGroupCoordinator"
      class="modal fade selectionSubject"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("Education_Subject_Choose") }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form autocomplete="" @submit.prevent="sendCoordinator">
              <div class="row">
                <div class="col-md-6">
                  <a-space
                    direction="vertical"
                    class="mb-3 height-auto"
                    name="employee"
                  >
                    <label for="division-name-select" class="form-label">{{
                      $t("Exam_Start_At")
                    }}</label>
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      v-model:value="modalData.date_start"
                      :placeholder="$t('Enter_name')"
                    />
                    <span v-if="errors.date_start" class="text-danger small">
                      {{ errors.date_start[0] }}
                    </span>
                  </a-space>
                </div>
                <div class="col-md-6">
                  <a-space
                    direction="vertical"
                    class="mb-3 height-auto"
                    name="employee"
                  >
                    <label for="division-name-select" class="form-label">{{
                      $t("End_date")
                    }}</label>
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      v-model:value="modalData.date_end"
                      :placeholder="$t('Enter_name')"
                    />
                    <span v-if="errors.date_end" class="text-danger small">
                      {{ errors.date_end[0] }}
                    </span>
                  </a-space>
                </div>
                <div class="mt-3">
                  <a-space
                    direction="vertical"
                    class="mb-3 height-auto"
                    name="employee"
                  >
                    <label for="division-name-select" class="form-label">{{
                      $t("Subjects")
                    }}</label>
                    <a-select
                      required
                      v-model:value="modalData.subjects"
                      mode="multiple"
                      :options="sideFormOptions.subjectOptions"
                      :field-names="{ value: 'id', label: 'name' }"
                      style="width: 200px"
                      :onDeselect="deleteSubjectById"
                    >
                    </a-select>
                    <span v-if="errors.subjects" class="text-danger small">
                      {{ errors.subjects[0] }}
                    </span>
                  </a-space>
                </div>
              </div>

              <div class="d-flex justify-content-between">
                <button class="btns c-cancel me-1">
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i
                  >{{ $t("Close") }}
                </button>
                <button class="btns c-save" type="submit">
                  <i
                    class="mdi mdi-content-save font-size-14 align-middle me-1"
                  ></i>
                  {{ $t("Save") }}
                </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.all-group {
  .table-row-schedule {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 150px auto 150px 150px 300px 150px 130px;

    @include mobile() {
      grid-template-columns: 30px 200px 200px 100px 200px 250px 120px 130px;
    }
  }

  .actions-h {
    &:hover {
      color: white;
    }
  }

  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;

      &:last-child,
      &:first-child {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  .table-selection-result {
    grid-template-columns: 40px 150px auto;
  }

  .modal.show {
    .modal-dialog {
      .modal-content {
        width: 600px !important;
      }
    }
  }
}
</style>
