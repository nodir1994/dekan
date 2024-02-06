<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { formatDate } from "@vueuse/core";
import { Modal } from "bootstrap";
import {
  fetchLessonPairs,
  fetchAudiences,
  fetchSubjectsByEduPlanIdBySemesterId,
  fetchLessonClasses,
  fetchEmployees,
  fetchAcademicGroupsByEduPlanId,
  createLessonScheduleTopic,
  updateLessonScheduleTopic,
} from "@/utils/api/lesson-schedule";
import { academicYearList } from "@/utils/api/reference";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import SubmitButton from "../buttons/SubmitButton.vue";
import { useRoute } from "vue-router";
import helpers from "@/utils/helper";

export interface LessonTopicInterface {
  id?: number | null;
  date: string;
  semester_id: number | null;
  lesson_activity_id: number | null;
  academic_group_ids: (number | string | null)[];
  group_id: number | null;
  edu_plan_id: number | null;
  subject_id: number | null;
  audience_id: number | null;
  pair_id: number | null;
  employee_id: number | null;
  additional: string;
}

const props = withDefaults(
  defineProps<{
    currentDate: {
      year: number | string;
      month: number | string;
      date: number | string;
    };
    topic: LessonTopicInterface;
    eduPlanId: number;
    semesterId: number;
  }>(),
  {}
);

const emits = defineEmits<{
  (e: "update:currentDate"): void;
  (e: "update:topic", value: LessonTopicInterface): void;
  (e: "close"): void;
}>();

const computedCurrentDate = computed({
  get() {
    return props.currentDate;
  },
  set(val) {
    emits("update:currentDate");
  },
});

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const optionsLessonPair: any = ref([]);
const optionsAudience = ref([]);
const optionsSubject = ref([]);
const optionsLessonClass: any = ref([]);
const optionsEmployee = ref([]);
const optionsGroup = ref([]);
const route = useRoute();
// const computedFormState = computed({
//   get() {
//     return props.topic;
//   },
//   set(val) {
//     emits("update:topic", val);
//   },
// });

const computedFormState: any = ref({});
const eduPlanId = ref<number | null>(null);
const multipleAcademicGroupID = ref<(number | null)[]>([]);
const singleAcademicGroupID = ref<number | null>(null);
const selectedLessonActivity = reactive({
  id: null,
  name: "",
  type: "",
});

watch(
  props.topic,
  (newVal, oldVal) => {
    Object.assign(selectedLessonActivity, {
      id: null,
      name: "",
      type: "",
    });
    computedFormState.value = { ...props.topic };
    singleAcademicGroupID.value = props.topic.group_id;
    eduPlanId.value = props.topic.edu_plan_id;

    setSelectedLessonActivity();
    clearErrors();
  },
  { deep: true }
);

const formErrors: any = reactive({
  date: [],
  semester_id: [],
  academic_group_ids: [],
  subject_id: [],
  audience_id: [],
  pair_id: [],
  employee_id: [],
  lesson_activity_id: [],
  additional: [],
});

const optionsAcademicYear = await academicYearList().then((res) => res.result);
let ress = optionsAcademicYear?.data.find((x: any) => x.is_current == true).id;
const academicYearIsCurrentTrue = ress ? Number(ress) : null;
async function selectFunction() {
  await fetchLessonPairs(academicYearIsCurrentTrue).then((responses) => {
    optionsLessonPair.value = responses.result;
  }),
    await fetchAudiences().then((responses) => {
      optionsAudience.value = responses?.result;
    }),
    await fetchLessonClasses().then((responses) => {
      optionsLessonClass.value = responses.result;
    }),
    await fetchEmployees().then((responses) => {
      optionsEmployee.value = responses.result?.data;
    }),
    await fetchSubjectsByEduPlanIdBySemesterId(
      props.eduPlanId,
      props.semesterId
    ).then(
      (response) =>
      (optionsSubject.value = response.result?.map((item: any) => {
        return {
          id: item.subject.id,
          name: item.subject.name,
        };
      }))
    );
}
// hooks
// onMounted(async () => {
//   if (props.eduPlanId) {
//     await selectFunction();
//   }
// });

// watchEffect(async () => {
//   if (props.eduPlanId) {

//     await selectFunction();
//   }
// });
watch(
  () => props.eduPlanId,
  async (newVal) => {
    await selectFunction();
    if (props.eduPlanId) {
      await fetchAcademicGroupsByEduPlanId(props.eduPlanId).then(
        (responses) => {
          optionsGroup.value = responses.result.data;
        }
      );
    }
  },
  { immediate: true }
);

// watch(props.eduPlanId, async (newVal) => {
//   await selectFunction();
// });
// functions
function dateObjToStr(obj: any): string {
  if (obj) {
    const date = new Date(`${obj.year}-${obj.month}-${obj.date}`);
    return formatDate(date, "YYYY-MM-DD");
  }
  return "";
}

async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const params = {
      ...computedFormState.value,
      academic_group_ids:
        selectedLessonActivity.type === "lecture"
          ? multipleAcademicGroupID.value
          : [singleAcademicGroupID.value],
    };
    const res = params.id
      ? await updateLessonScheduleTopic(params.id, params)
      : await createLessonScheduleTopic(params);
    emits("close");
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    Object.assign(formErrors, error.response?.data?.errors);
    notif.error(error?.response?.data?.message);
  } finally {
    isLoading.value = false;
  }
}

function clearErrors() {
  Object.assign(formErrors, {
    date: [],
    semester_id: [],
    academic_group_ids: [],
    subject_id: [],
    audience_id: [],
    pair_id: [],
    employee_id: [],
    lesson_activity_id: [],
    additional: [],
  });
}

function setSelectedLessonActivity() {
  clearError("lesson_activity_id");

  const lessonClass = optionsLessonClass.value.find(
    (item: any) => item.id === computedFormState.value.lesson_activity_id
  );
  multipleAcademicGroupID.value = [props.topic.group_id];
  singleAcademicGroupID.value = props.topic.group_id;
  Object.assign(selectedLessonActivity, lessonClass);
}

function clearError(field: string) {
  formErrors[field] = "";
}
</script>

<template>
  <div id="myModalCreateSubject" class="modal fade" tabindex="-1" aria-labelledby="myModalCreateSubjectLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalCreateSubjectLabel">
            {{ $t("Group_Schedule_Information") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <a-form @finish="onSubmit" :model="computedFormState">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">{{
                    $t("Lesson_Date")
                  }}</label>
                  <a-date-picker :placeholder="$t('Date_Picer')" v-model:value="computedFormState.date" type="date"
                    value-format="YYYY-MM-DD" @change="clearError('date')" />
                  <span v-if="formErrors.date" class="text-danger">
                    {{ formErrors.date[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("auditorium")
                  }}</label>
                  <a-select :filter-option="helpers.filterOptionByName" show-search
                    v-model:value="computedFormState.audience_id" :options="optionsAudience"
                    :field-names="{ value: 'id', label: 'name' }" :placeholder="$t('Choose')"
                    @change="clearError('audience_id')" />
                  <span v-if="formErrors.audience_id" class="text-danger">
                    {{ formErrors.audience_id[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Subjects")
                  }}</label>
                  <a-select :filter-option="helpers.filterOptionByName" show-search
                    v-model:value="computedFormState.subject_id" :options="optionsSubject"
                    :field-names="{ value: 'id', label: 'name' }" :placeholder="$t('Choose_Subject')"
                    @change="clearError('subject_id')" />
                  <span v-if="formErrors.subject_id" class="text-danger">
                    {{ formErrors.subject_id[0] }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Lesson_Pair")
                  }}</label>
                  <ASelect v-model:value="computedFormState.pair_id" :placeholder="$t('Choose')"
                    @change="clearError('pair_id')">
                    <ASelectOption v-for="(pair, pairIndex) in optionsLessonPair" :value="pair.id">
                      {{ pair.time_start }} - {{ pair.time_end }}
                    </ASelectOption>
                  </ASelect>
                  <span v-if="formErrors.pair_id" class="text-danger">
                    {{ formErrors.pair_id[0] }}
                  </span>
                </div>
                <div class="mb-3" name="previousEducationSeriaDocument">
                  <label for="division-name-input" class="form-label">{{
                    $t("additional")
                  }}</label>
                  <a-input v-model:value="computedFormState.additional" />
                  <span class="text-danger">
                    {{ formErrors.additional[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Training")
                  }}</label>
                  <ASelect v-model:value="computedFormState.lesson_activity_id" :placeholder="$t('Choose')"
                    @change="setSelectedLessonActivity">
                    <ASelectOption v-for="(opt, optionIndex) in optionsLessonClass" v-model:value="opt.id">
                      {{ opt.name }}
                    </ASelectOption>
                  </ASelect>
                  <span v-if="formErrors.lesson_activity_id" class="text-danger">
                    {{ formErrors.lesson_activity_id[0] }}
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label for="division-name-select" class="form-label">{{
                  $t("Employee")
                }}</label>
                <a-select v-model:value="computedFormState.employee_id" :options="optionsEmployee"
                  :filter-option="helpers.filterOptionByFullName" show-search
                  :field-names="{ value: 'employee_id', label: 'fullname' }" :placeholder="$t('Choose_Employee')"
                  @change="clearError('employee_id')" />
                <span v-if="formErrors.employee_id" class="text-danger">
                  {{ formErrors.employee_id[0] }}
                </span>
              </div>

              <div class="mb-3">
                <label for="division-name-select" class="form-label">{{
                  $t("Group")
                }}</label>
                <template v-if="selectedLessonActivity.type === 'lecture'">
                  <a-select :filter-option="helpers.filterOptionByName" show-search
                    v-model:value="multipleAcademicGroupID" mode="multiple" :options="optionsGroup"
                    :field-names="{ value: 'id', label: 'name' }" :placeholder="$t('Choose_Groups')"
                    @change="clearError('academic_group_id')" />
                </template>
                <template v-else>
                  <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="singleAcademicGroupID"
                    :options="optionsGroup" :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="$t('Choose_Group')" disabled @change="clearError('academic_group_ids')" />
                </template>
                <span v-if="formErrors.academic_group_ids" class="text-danger">
                  {{ formErrors.academic_group_ids[0] }}
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <div class="btn-group gap-2">
                <button class="btn btn-light rounded-0" type="button" data-bs-dismiss="modal">
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close") }}
                </button>
                <SubmitButton :loading="isLoading" :icon="'content-save'" />
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
