<script lang="ts" setup>
import moment, { months } from "moment";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Modal } from "bootstrap";
import { addLessonSchedule } from "@/utils/api/lesson-schedule";
import ScheduleInfoFormModal, {
  type LessonTopicInterface,
} from "@/components/modals/ScheduleInfoFormModal.vue";
import { formatDate, useEventListener } from "@vueuse/core";
import { BCollapse, BCard } from "bootstrap-vue-3";
import { useRoute } from "vue-router";
import { fetchLessonScheduleByID } from "@/utils/api/lesson-schedule";
import Swal from "sweetalert2";
import { deleteLessonSchedule } from "@/utils/api/lesson-schedule";
import {
  eduPlanListByFaculty,
  academicGroupListByEduPlan,
  semesterListByAcademicYearAndEduPlan,
  academicYearListByEduPlan,
} from "@/utils/api/reference";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import helpers from '@/utils/helper'
export interface LessonScheduleInterface {
  [x: string]: any;
  edu_plan_id: number | null;
  faculty_id: number | null;
  academic_group: string;
  academic_year: string;
  edu_plan: string;
  id: number | null;
  lesson_activity_id: number | null;
  lesson_topics: LessonTopicInterface[];
  group_id: number | null;
  semester_id: number | null;
  week_count: number;
  weeks: [];
}
const icon: string = 'mdi mdi-check font-size-14 align-middle me-1'
const router = useRouter();
const { t } = useI18n();
const route: any = useRoute();
const months = ref([
  { value: t("Months.January") },
  { value: t("Months.February") },
  { value: t("Months.March") },
  { value: t("Months.April") },
  { value: t("Months.May") },
  { value: t("Months.June") },
  { value: t("Months.July") },
  { value: t("Months.August") },
  { value: t("Months.September") },
  { value: t("Months.October") },
  { value: t("Months.November") },
  { value: t("Months.December") },
]);
const heading = ref([
  t("Week_days.Monday"),
  t("Week_days.Tuesday"),
  t("Week_days.Wednesday"),
  t("Week_days.Thursday"),
  t("Week_days.Friday"),
  t("Week_days.Saturday"),
  t("Week_days.Sunday"),
]);

const current = reactive({
  year: 0,
  month: 0,
  date: 0,
});

const today = reactive({
  year: 0,
  month: 0,
  date: 0,
});

const buildCalendar = computed(() => {
  let currentYear = current.year;
  let currentMonth = current.month;
  let currentDate = current.date;

  let dateArray = [];
  let patchNum = 0;
  let daysInMonth = moment(`${currentYear}-${currentMonth}`).daysInMonth();
  let week: any = moment(`${currentYear}-${currentMonth}`).format("d");

  for (let i = 0; i < daysInMonth; i++) {
    let dateNum = i + 1;
    let isToday = false;
    let isCurrent = false;
    let dateText = "";

    if (
      currentYear === today.year &&
      currentMonth === today.month &&
      dateNum === today.date
    ) {
      isToday = true;
    }

    if (dateNum === currentDate) {
      isCurrent = true;
    }

    dateNum < 10 ? (dateText = `0${dateNum}`) : (dateText = dateNum.toString());

    let obj = {
      year: currentYear,
      month: currentMonth,
      date: dateNum,
      number: dateText,
      today: isToday,
      current: isCurrent,
    };
    dateArray.push(obj);
  }

  for (let i = 0; i < week; i++) {
    let obj: any = {
      number: "",
      none: true,
    };
    dateArray.splice(i, 0, obj);
  }

  dateArray.length % 7 === 0
    ? (patchNum = 0)
    : (patchNum = 7 - (dateArray.length % 7));

  for (let i = 0; i < patchNum; i++) {
    let obj: any = {
      number: "",
      none: true,
    };
    dateArray.splice(dateArray.length, 0, obj);
  }
  return dateArray;
});

// const formModal = ref<HTMLDivElement>();
// useEventListener(formModal, "hidden.bs.modal", () => {
//   clearCurrentTopic();
// });

const paramsID = route.params?.id ?? null;
const filterFormState = reactive<any>({
  edu_plan_id: null,
  academic_year_id: null,
  semester_id: null,
  academic_group_id: null,
});
const currentLessonSchedule: LessonScheduleInterface = reactive({
  edu_plan_id: null,
  faculty_id: null,
  lesson_activity_id: null,
  academic_group: "",
  academic_year: "",
  edu_plan: "",
  id: null,
  lesson_topics: [],
  semester_id: null,
  group_id: null,
  week_count: 0,
  weeks: [],
});
// const semesterID = computed(() => currentLessonSchedule?.semester_id);
const semesterID = ref();
const eduPlanId = ref();

const academicGroupId = computed(() => currentLessonSchedule.academic_group_id);
const currentLessonTopic: LessonTopicInterface = reactive({
  date: dateObjToStr(current),
  semester_id: semesterID.value,
  edu_plan_id: eduPlanId.value,
  academic_group_ids: [],
  group_id: academicGroupId.value,
  subject_id: null,
  audience_id: null,
  pair_id: null,
  employee_id: null,
  lesson_activity_id: null,
  additional: "",
});

const optionsAcademicYear = ref<[] | null>(null);
const optionsEduPlan = ref<[] | null>(null);
const optionsSemester = ref<[] | null>(null);
const optionsAcademicGroup = ref<[] | null>(null);
const facultyId = ref();
getToday();
backToToday();

async function fetchEduPlanListByFaculty(val?: number) {
  const res = await eduPlanListByFaculty(facultyId.value);
  optionsEduPlan.value = res.result?.data;
}
async function fetchEducationYearByEduPlan(val?: number) {
  if (val) {
    const res = await academicYearListByEduPlan(val);
    optionsAcademicYear.value = res.result?.data;
  }
}
async function fetchSemesterByEducationYearAndEduPlan(val1?: any) {
  const res = await semesterListByAcademicYearAndEduPlan(val1);
  optionsSemester.value = res?.result?.data.map((item: any) => {
    return {
      id: item.id,
      name:
        item.semester +
        "-" +
        t("semester_number") +
        " / " +
        item.course +
        "-" +
        t("course_number"),
    };
  });
}
async function fetchAcademicGroupByEduPlan(val?: number) {
  const res = await academicGroupListByEduPlan(val);
  optionsAcademicGroup.value = res.result?.data;
}
// hooks
onMounted(async () => {
  semesterID.value = currentLessonSchedule.semester_id;
  facultyId.value = currentLessonSchedule.faculty_id;
});

watch(
  () => paramsID,
  async function (newVal) {
    if (newVal) {
      await fetchDataByID(newVal);
    }
  },
  { immediate: true }
);

watch(
  () => filterFormState.faculty_id,
  async (newVal) => {
    fetchEduPlanListByFaculty(newVal);
  },
  { immediate: true }
);
watch(
  () => filterFormState.edu_plan_id,
  async (newVal, oldVal) => {
    fetchEducationYearByEduPlan(newVal);
    if (newVal != oldVal && newVal != currentLessonSchedule.edu_plan_id) {
      optionsAcademicYear.value = null;
      optionsSemester.value = null;
      optionsAcademicGroup.value = null;
      filterFormState.academic_year_id = null;
      filterFormState.semester_id = null;
      filterFormState.academic_group_id = null;
    }
    fetchAcademicGroupByEduPlan(newVal);
  },
  { immediate: true }
);

// watch(
//   () => filterFormState.edu_plan_id,
//   async (newVal) => {
//     fetchAcademicGroupByEduPlan(newVal);
//   },
//   { immediate: true }
// );

watch(
  () => filterFormState.academic_year_id,
  async (newVal, oldVal) => {
    if (newVal) {
      fetchSemesterByEducationYearAndEduPlan(filterFormState);
    }
  },
  { immediate: true }
);

// functions
function changeMonth(isNext: boolean) {
  let month = current.month;
  isNext === true ? (month = month + 1) : (month = month - 1);
  if (month <= 0) {
    month = 12;
    current.year = current.year - 1;
  }
  if (month > 12) {
    month = 1;
    current.year = current.year + 1;
  }
  current.month = month;
  current.date = 1;
}

function getDateData(data: any, lesson: any) {
  current.year = data.year;
  current.month = data.month;
  current.date = data.date;
  if (lesson) {
    Object.assign(currentLessonTopic, lesson);
    currentLessonTopic.group_id = academicGroupId.value;
  } else {
    clearCurrentTopic();
  }
  currentLessonTopic.group_id = academicGroupId.value;
  // currentLessonTopic.edu_plan_id = eduPlanId.value;
}

function backToToday() {
  current.year = today.year;
  current.month = today.month;
  current.date = today.date;
}

function getToday() {
  today.year = moment().year();
  today.month = moment().month() + 1;
  today.date = moment().date();
}

async function fetchDataByID(id: number) {
  const res = await fetchLessonScheduleByID(id);
  Object.assign(currentLessonSchedule, res.result);
  eduPlanId.value = currentLessonSchedule.edu_plan_id;
  semesterID.value = currentLessonSchedule.semester_id;
  Object.assign(filterFormState, res.result);
}

function dateObjToStr(obj: any) {
  if (obj.year && obj.month && obj.date) {
    const date = new Date(`${obj.year}-${obj.month}-${obj.date}`);
    return formatDate(date, "YYYY-MM-DD");
  } else {
    ("");
  }
  // return formatDate(new Date(), "YYYY-MM-DD");
}

function clearCurrentTopic() {
  Object.assign(currentLessonTopic, {
    id: null,
    date: dateObjToStr(current),
    semester_id: semesterID.value,
    academic_group_ids: [],
    group_id: null,
    subject_id: null,
    audience_id: null,
    pair_id: null,
    employee_id: null,
    lesson_activity_id: null,
    additional: "",
  });
}

async function onAddSchedule() {
  const datas = {
    semester_id: filterFormState.semester_id,
    academic_group_id: filterFormState.academic_group_id,
  };
  try {
    const res = await addLessonSchedule(datas);
    const path = `/curriculum/info-schedule/${res.result.id}`;
    router.push({ path });
  } catch (error: any) {
  } finally {
  }
}

function onModalClose() {
  clearCurrentTopic();
  const modal = Modal.getOrCreateInstance("#myModalCreateSubject");
  modal.hide();
  fetchDataByID(paramsID);
}

function isSameDate(
  obj1: { year: number; month: number; date: number },
  lessonDate: string
) {
  const str1 = dateObjToStr(obj1);
  if (str1 != undefined && str1 == lessonDate) return str1 == lessonDate;
}

//actions delete
async function onRemove(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-2",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });

  try {
    const res = await swalWithBootstrapButtons.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      icon: "warning",
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteLessonSchedule(id);
      await fetchDataByID(paramsID);
      // await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(
      t("Something_went_wrong"),
      error.message,
      "error"
    );
  }
}
</script>

<template>
  <div pagetitle="'Xaftaliklar'" class="weekPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <PageHeader :title="$t('Curriculum_Schedule')">
      <!-- <RouterLink
                                                  to="/curriculum/info-schedule/generation"
                                                  class="btns c-save py-1.5 px-4 me-3"
                                                >
                                                  <i class="fas fa-sync-alt me-1"></i>
                                                  <span>{{ $t("Generate") }}</span>
                                                </RouterLink> -->
      <RouterLink to="/curriculum/info-schedule">
        <button class="btns black-c py-1.5 px-4" type="submit">
          <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>
          {{ $t("Back") }}
        </button>
      </RouterLink>
    </PageHeader>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select v-model:value="filterFormState.edu_plan_id" :options="optionsEduPlan"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  allow-clear />
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select v-model:value="filterFormState.academic_year_id" :options="optionsAcademicYear"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  allow-clear />
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select v-model:value="filterFormState.semester_id" :options="optionsSemester"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  allow-clear :disabled="!filterFormState.academic_year_id" />
              </a-space>
              <label for="yu">{{ $t("Choose_Semester") }}</label>
            </div>
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select v-model:value="filterFormState.academic_group_id" :options="optionsAcademicGroup"
                  :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                  allow-clear :disabled="!filterFormState.semester_id" />
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>
            <div class="my-2 col-md-1">
              <button class="btn-search c-save" @click="onAddSchedule" :disabled="
                !filterFormState.academic_group_id ||
                !filterFormState.semester_id
              ">
                <i :class="icon"></i>
                {{ $t('OK') }}
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <div class="calendar">
            <div class="calendar__header">
              <div class="nextPrev">
                <a href="javascript:;" @click.prevent="changeMonth(false)"><i class="fas fa-chevron-left"></i></a>
                <a href="javascript:;" @click.prevent="changeMonth(true)"><i class="fas fa-chevron-right"></i></a>
              </div>
              <div class="calendar__title" @click.prevent="backToToday()">
                <span class="caption-year pe-2">{{ current.year }} - yil</span>
                <span class="caption-month">{{
                  months[current.month - 1].value
                }}</span>
              </div>
            </div>
            <div class="calendar__body">
              <ul class="calendar__heading">
                <li v-for="(item, index) in heading" :key="index" :class="index % 7 == 6 ? 'd-none' : ''">
                  <div class="calendar__item">{{ item }}</div>
                </li>
              </ul>
              <ul class="calendar__content">
                <li v-for="(item, index) in buildCalendar" :key="index" :class="index % 7 == 0 ? 'd-none' : ''">
                  <button type="button" data-bs-toggle="modal" data-bs-target="#myModalCreateSubject"
                    class="calendar__item" :class="{
                      'is-today': item.today === true,
                      current: item.current === true,
                    }" @click.prevent="getDateData(item, null)" :disabled="!item.number">
                    <i class="fas fa-plus me-3"></i>{{ item.number }}
                  </button>
                  <div class="calendar-day-content">
                    <ul class="sessons">
                      <li class="d-flex justify-content-between" v-for="(
                                                                    lesson, keys
                                                                  ) in currentLessonSchedule.lesson_schedule_topics"
                        :key="keys" :class="isSameDate(item, lesson.date) ? '' : 'd-none'">
                        <a v-if="isSameDate(item, lesson.date)" type="text" data-bs-toggle="modal"
                          data-bs-target="#myModalCreateSubject" @click.prevent="getDateData(item, lesson)">
                          {{ lesson.pair?.time_start }} -
                          {{ lesson.pair?.time_end }} |
                          {{ lesson.lesson_activity }}<br />
                          <span class="fw-bold">{{
                            lesson.subject?.name
                          }}</span>
                          <br />
                          {{ lesson.employee?.surname }}
                          {{ lesson.employee?.name }}
                          {{ lesson.employee?.patronymic }}<br />
                          {{ $t("Room") }}: {{ lesson.audience }}-xona
                        </a>
                        <div class="delete__project deleteTopic">
                          <a class="text-danger ps-1" type="danger" @click="onRemove(lesson.id)"><i
                              class="mdi mdi-delete font-size-18"></i></a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-------START ADD MODAL---------------------------------------->
    <ScheduleInfoFormModal v-model:current-date="current" :topic="currentLessonTopic" :edu-plan-id="eduPlanId"
      :semester-id="semesterID" @close="onModalClose" />
    <!-------END ADD MODAL---------------------------------------->
  </div>
</template>

<style lang="scss">
.modal-dialog {
  max-width: $mobile;
}

button {
  &:disabled {
    cursor: not-allowed !important;

    &:hover {
      background-color: #0a9396;
    }
  }
}
</style>
