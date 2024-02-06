<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import {
  academicGroupListByEduPlan,
  semesterListByAcademicYear,
  semestrListEduPlan,
  academicYearListByEduPlan,
  eduPlanList,
} from "@/utils/api/reference/index";
import type { CurriculumApiParamsExamCreate } from "@/utils/interfaces";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const apiParams: CurriculumApiParamsExamCreate = reactive({
  name: "",
  exam_type_id: null,
  edu_plan_id: null,
  academic_year_id: null,
  subject_id: null,
  semester_id: null,
  employee_id: null,
  datetime_start: "",
  datetime_end: "",
  duration: null,
  max_ball: null,
  attemps_count: null,
  questions_count: null,
  randomable: null,
  comment: "",
  status: null,
});
const ExamsStatus: any = {
  res: [
    {
      id: true,
      name: t("yes"),
    },
    {
      id: false,
      name: t("No"),
    },
  ],
  ran: [
    {
      id: true,
      name: t("yes"),
    },
    {
      id: false,
      name: t("No"),
    },
  ],
};
const options = reactive({
  academicYearOption: null,
  eduPlanIdOption: null,
  semesterId: null,
  subjectId: null,
});

onMounted(async () => {
  options.eduPlanIdOption = await eduPlanList().then((res) => res.result?.data);
});

watch(
  () => apiParams.edu_plan_id,
  async () => {
    let resOnce = await semestrListEduPlan(apiParams.edu_plan_id).then((res) =>
      res.result?.data.map((item: any) => {
        return {
          id: item.id,
          name: item.semester + `- ${t("semester")}`,
        };
      })
    );
    options.semesterId = resOnce;
    let res1 = await academicYearListByEduPlan(apiParams.edu_plan_id).then(
      (res) => res.result?.data
    );
    options.academicYearOption = res1;
  }
);
watch(
  () => apiParams.semester_id,
  async () => {
    let resOnce = await semesterListByAcademicYear(apiParams.edu_plan_id).then(
      (res) => res.result?.data
    );
    options.semesterId = resOnce;
  }
);
</script>
<template>
  <div pagetitle="'Xaftaliklar'" class="createExam">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/exams"
              >{{ $t("Report_By_Exam") }} / </router-link
            >{{ $t("Create_Exam") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/exams"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START MODAL-xodim--------------------------------------->
    <!-- <div
      id="myModalCreateGroup"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Xodimni tanlang</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="my-2 col-xl-10 form--item">
                <a-input id="yu" class="form-control" />
                <label for="yu">{{ $t("Search_by_Name") }}</label>
              </div>
              <div class="my-2 col-xl-2">
                <button class="btn-search search-color">
                  <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                  >{{ $t("Search") }}
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="content-table">
                <tr class="table-row-group">
                  <th>
                     <a-checkbox v-model:checked1="checked"></a-checkbox> 
                  </th>
                  <th><b>Nomi</b></th>
                  <th><b>Fakultet</b></th>
                  <th>
                    <b>{{ $t("Education_Type") }}</b>
                  </th>
                  <th><b>Ta'lim tili</b></th>
                </tr>
                 <tbody>
                  <tr
                    class="table-row-group"
                    v-for="element in allTables.tableGrroup"
                    :key="element.id"
                  >
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.faculty }}</td>
                    <td>{{ element.educationType }}</td>
                    <td>{{ element.educationLanguage }}</td>
                  </tr>
                </tbody> 
              </table>
            </div>
         
            <div class="d-flex justify-content-between">
              <div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close") }}
                </button>
                <button class="btns c-save">{{ $t("add") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-------END MODAL--xodim-------------------------------------->

    <div class="card">
      <div class="card-body">
        <a-form>
          <div class="row">
            <div class="col-md-6">
              <a-form-item class="mb-3" name="name">
                <label for="otm-name-input" class="form-label">{{
                  $t("name")
                }}</label
                >1234
                <!-- // Nomi -->
                <a-space>
                  <a-input
                    class="select form-control"
                    v-model:value="apiParams.name"
                  />
                </a-space>
              </a-form-item>

              <a-form-item class="mb-3" name="comment">
                <label for="akkreditasiya-info-input" class="form-label"
                  >Izoh</label
                >
                <a-textarea
                  :auto-size="{ minRows: 4.5, maxRows: 6 }"
                  v-model:value="apiParams.comment"
                />
              </a-form-item>

              <div class="mb-3" name="trainingPlan">
                <label for="fakultet-sort-input" class="form-label">{{
                  $t("Curriculum")
                }}</label>
                <a-space>
                  <a-select
                    v-model:value="apiParams.edu_plan_id"
                    :options="options.eduPlanIdOption"
                    :field-names="{ value: 'id', label: 'name' }"
                    allow-clear
                  >
                  </a-select>
                </a-space>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <a-form-item class="mb-3" name="educationYear">
                    <label for="fakultet-sort-input" class="form-label">{{
                      $t("Education_Year_Name")
                    }}</label>
                    <a-select
                      v-model:value="apiParams.academic_year_id"
                      :options="options.academicYearOption"
                      :disabled="!apiParams.edu_plan_id"
                      :field-names="{ value: 'id', label: 'name' }"
                      autocomplete="off"
                    >
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-md-6">
                  <a-form-item class="mb-3" name="semester">
                    <label for="fakultet-sort-input" class="form-label">{{
                      $t("Semester_Name")
                    }}</label>
                    <a-select
                      v-model:value="apiParams.semester_id"
                      :options="options.semesterId"
                      :disabled="!apiParams.edu_plan_id"
                      :field-names="{ value: 'id', label: 'name' }"
                      autocomplete="off"
                    >
                    </a-select>
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <a-form-item class="mb-3 col-md-6" name="examType">
                  <label for="fakultet-sort-input" class="form-label"
                    >Nazorat turi</label
                  >
                  <a-select
                    autocomplete="off"
                    placeholder="Imthon turini tanlang"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item class="mb-3 col-md-6" name="active">
                  <label for="fakultet-sort-input" class="form-label"
                    >Faol</label
                  >
                  <a-select
                    autocomplete="off"
                    v-model:value="apiParams.status"
                    :options="ExamsStatus.res"
                    allow-clear
                    :field-names="{ value: 'id', label: 'name' }"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item class="mb-3 col-md-6" name="startAt">
                  <label for="fakultet-sort-input" class="form-label"
                    >Boshlanish</label
                  >
                  <a-date-picker
                    :show-time="{ format: 'HH:mm' }"
                    format="YYYY-MM-DD HH:mm"
                    v-model:value="apiParams.datetime_start"
                    :placeholder="['Start Time']"
                  />
                </a-form-item>

                <a-form-item class="mb-3 col-md-6" name="endAt">
                  <label for="fakultet-sort-input" class="form-label"
                    >Tugash</label
                  >
                  <a-date-picker
                    :show-time="{ format: 'HH:mm' }"
                    format="DD-MM-YYYY HH:mm"
                    v-model:value="apiParams.datetime_end"
                    :placeholder="['End Time']"
                  />
                </a-form-item>

                <a-form-item class="mb-3 col-md-6" name="time">
                  <label for="otm-name-input" class="form-label"
                    >Vaqti (daqiqa)</label
                  >
                  <a-input
                    class="select"
                    v-model:value="apiParams.duration"
                    type="number"
                  />
                </a-form-item>

                <a-form-item class="mb-3 col-md-6" name="maxPoints">
                  <label for="otm-name-input" class="form-label"
                    >Max.ball</label
                  >
                  <a-input
                    class="select"
                    v-model:value="apiParams.max_ball"
                    type="number"
                  />
                </a-form-item>

                <a-form-item class="mb-3 col-md-4" name="attempts">
                  <label for="otm-name-input" class="form-label"
                    >Urinishlar</label
                  >
                  <a-input
                    class="select"
                    v-model:value="apiParams.attemps_count"
                    type="number"
                  />
                </a-form-item>

                <a-form-item class="mb-3 col-md-4" name="questionCount">
                  <label for="otm-name-input" class="form-label"
                    >Savollar soni</label
                  >
                  <a-input
                    class="select"
                    v-model:value="apiParams.questions_count"
                    type="number"
                  />
                </a-form-item>

                <a-form-item class="mb-3 col-md-4" name="active">
                  <label for="fakultet-sort-input" class="form-label"
                    >Tasodifiy</label
                  >
                  <a-select
                    autocomplete="off"
                    v-model:value="apiParams.randomable"
                    :options="ExamsStatus.ran"
                    allow-clear
                    :field-names="{ value: 'id', label: 'name' }"
                  >
                  </a-select>
                </a-form-item>
              </div>

              <a-form-item class="mb-3" name="subject">
                <label for="fakultet-sort-input" class="form-label">{{
                  $t("Subjects")
                }}</label>
                <a-select
                  v-model:value="apiParams.subject_id"
                  autocomplete="off"
                  style="width: 100%"
                >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btns c-save py-2 px-4">
              {{ $t("Save") }}
            </button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.createExam {
  .table-row-group {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 100px auto 100px 100px;
    @include mobile() {
      grid-template-columns: 40px 100px 150px 100px 100px;
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
  .modal-dialog {
    max-width: $mobile;
  }
}
</style>
