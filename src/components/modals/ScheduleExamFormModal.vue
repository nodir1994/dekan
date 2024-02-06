<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { formatDate } from "@vueuse/core";
import {
  fetchLessonPairs,
  fetchAudiences,
  fetchSubjectsByEduPlanId,
  fetchLessonClasses,
  fetchEmployees,
  fetchAcademicGroupsByEduPlanId,
  createLessonExamTopic,
  updateLessonExamTopic,
  examTypeList,
} from "@/utils/api/lesson-exam";
import { academicYearList } from "@/utils/api/reference";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import SubmitButton from "../buttons/SubmitButton.vue";

export interface ExamInterface {
  id?: number | null;
  date: string;
  semester_id: number | null;
  academic_group_ids: (number | string | null)[];
  academic_group_id: number | null;
  edu_plan_id: number | null;
  subject_id: number | null;
  audience_id: number | null;
  pair_id: number | null;
  employee_id: number | null;
  final_exam_position: number | null;
  exam_type_id: number | null;
}

const props = withDefaults(
  defineProps<{
    currentDate: {
      year: number | string;
      month: number | string;
      date: number | string;
    };
    topic: ExamInterface;
    eduPlanId: number;
    semesterId: number;
  }>(),
  {}
);

const emits = defineEmits<{
  (e: "update:currentDate"): void;
  (e: "update:topic", value: ExamInterface): void;
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
const optionsLessonPair = ref([]);
const optionsAudience = ref([]);
const optionsSubject = ref([]);
const optionsLessonClass = ref([]);
const optionsEmployee = ref([]);
const optionsExamType = ref([]);
const optionsGroup = ref<any | null>(null);
const computedFormState = ref({});
const eduPlanId = ref<number | null>(null);
const multipleAcademicGroupID = ref<(number | null)[]>([]);
const singleAcademicGroupID = ref<number | null>(null);
const formErrors = reactive({
  date: [],
  semester_id: [],
  academic_group_ids: [],
  subject_id: [],
  audience_id: [],
  pair_id: [],
  employee_id: [],
  final_exam_position: [],
  exam_type_id: [],
  academic_group_id: [],
});

const optionsAcademicYear = await academicYearList().then((res) => res.result);
let ress = optionsAcademicYear?.data.find((x: any) => x.is_current == true).id;
const academicYearIsCurrentTrue = ress ? Number(ress) : null;
// hooks
onMounted(async () => {
  if (props.eduPlanId) {
    return Promise.all([
      fetchLessonPairs(academicYearIsCurrentTrue),
      fetchAudiences(),
      fetchLessonClasses(),
      fetchEmployees(),
      fetchSubjectsByEduPlanId(props.eduPlanId, props.semesterId),
      fetchAcademicGroupsByEduPlanId(props.eduPlanId),
      examTypeList(),
    ]).then((responses) => {
      optionsLessonPair.value = responses[0].result;
      optionsAudience.value = responses[1].result;
      optionsLessonClass.value = responses[2].result;
      optionsEmployee.value = responses[3].result?.data.map((item: any) => {
        return {
          id: item.employee_id,
          name: item.fullname,
        };
      });

      optionsSubject.value = responses[4].result.map((item: any) => {
        return {
          id: item.subject?.id,
          name: item.subject?.name,
        };
      });
      optionsGroup.value = responses[5].result?.data;
      optionsExamType.value = responses[6].result;
    });
  }
});

const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
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
      academic_group_ids: props.topic.id
        ? [props.topic.academic_group_id]
        : multipleAcademicGroupID.value,
    };

    const res = params.id
      ? await updateLessonExamTopic(params.id, params)
      : await createLessonExamTopic(params);
    emits("close");
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    Object.assign(formErrors, error.response?.data?.errors);
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
    final_exam_position: [],
    exam_type_id: [],
  });
}

watch(
  props.topic,
  (newVal, oldVal) => {
    computedFormState.value = { ...props.topic };
    singleAcademicGroupID.value = props.topic.academic_group_id;
    eduPlanId.value = props.topic.edu_plan_id;
    setSelectedExamGroups();
    clearErrors();
  },
  { deep: true }
);

function setSelectedExamGroups() {
  multipleAcademicGroupID.value = [props.topic.academic_group_id];
  singleAcademicGroupID.value = props.topic.academic_group_id;
}

function clearError(field: string) {
  formErrors[field] = "";
}
</script>

<template>
  <div
    id="myModalCreateSubject"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="myModalCreateSubjectLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5
            v-if="props.topic.id"
            class="modal-title"
            id="myModalCreateSubjectLabel"
          >
            {{ $t("Curriculum_Exam_Schedule_Edit") }}
          </h5>
          <h5 v-else class="modal-title" id="myModalCreateSubjectLabel">
            {{ $t("Curriculum_Exam_Schedule_Create") }}
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
                  <a-date-picker
                    :placeholder="$t('Date_Picer')"
                    v-model:value="computedFormState.date"
                    type="date"
                    value-format="YYYY-MM-DD"
                    @change="clearError('date')"
                  />
                  <span v-if="formErrors.date" class="text-danger">
                    {{ formErrors.date[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Subjects")
                  }}</label>
                  <a-select
                    v-model:value="computedFormState.subject_id"
                    :options="optionsSubject"
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="$t('Choose_Subject')"
                    @change="clearError('subject_id')"
                  />
                  <span v-if="formErrors.subject_id" class="text-danger">
                    {{ formErrors.subject_id[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Exam_Type")
                  }}</label>
                  <a-select
                    v-model:value="computedFormState.exam_type_id"
                    :options="optionsExamType"
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="$t('Choose')"
                    @change="clearError('exam_type_id')"
                  />
                  <span v-if="formErrors.exam_type_id" class="text-danger">
                    {{ formErrors.exam_type_id[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Final_Exam_Type")
                  }}</label>
                  <a-select
                    v-model:value="computedFormState.final_exam_position"
                    :placeholder="$t('Choose')"
                    @change="clearError('final_exam_position')"
                  >
                    <a-select-option :value="1" label="1-position"
                      >1-{{ $t("EE_type") }}</a-select-option
                    >
                    <a-select-option :value="2" label="2-position"
                      >2-{{ $t("EE_type") }}</a-select-option
                    ><a-select-option :value="3" label="3-position"
                      >3-{{ $t("EE_type") }}</a-select-option
                    >
                    <a-select-option :value="4" label="4-position"
                      >4-{{ $t("EE_type") }}</a-select-option
                    >
                  </a-select>

                  <span
                    v-if="formErrors.final_exam_position"
                    class="text-danger"
                  >
                    {{ formErrors.final_exam_position[0] }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Lesson_Pair")
                  }}</label>
                  <ASelect
                    v-model:value="computedFormState.pair_id"
                    :placeholder="$t('Choose')"
                    @change="clearError('pair_id')"
                  >
                    <ASelectOption
                      v-for="(pair, pairIndex) in optionsLessonPair"
                      :value="pair.id"
                    >
                      {{ pair.time_start }} - {{ pair.time_end }}
                    </ASelectOption>
                  </ASelect>
                  <span v-if="formErrors.pair_id" class="text-danger">
                    {{ formErrors.pair_id[0] }}
                  </span>
                </div>

                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("auditorium")
                  }}</label>
                  <a-select
                    v-model:value="computedFormState.audience_id"
                    :options="optionsAudience"
                    :field-names="{ value: 'id', label: 'name' }"
                    :placeholder="$t('Choose')"
                    @change="clearError('audience_id')"
                  />
                  <span v-if="formErrors.audience_id" class="text-danger">
                    {{ formErrors.audience_id[0] }}
                  </span>
                </div>

                <div class="mb-3 height-auto">
                  <label for="division-name-select" class="form-label">{{
                    $t("Group")
                  }}</label>
                  <template v-if="props.topic.id">
                    <a-select
                      v-model:value="singleAcademicGroupID"
                      :options="optionsGroup"
                      :field-names="{ value: 'id', label: 'name' }"
                      :placeholder="$t('Choose_Group')"
                      disabled
                      @change="clearError('academic_group_ids')"
                    />
                    <span
                      v-if="formErrors.academic_group_id"
                      class="text-danger"
                    >
                      {{ formErrors.academic_group_id[0] }}
                    </span>
                  </template>
                  <template v-else>
                    <a-select
                      v-model:value="multipleAcademicGroupID"
                      mode="multiple"
                      :options="optionsGroup"
                      :field-names="{ value: 'id', label: 'name' }"
                      :placeholder="$t('Choose_Groups')"
                      @change="clearError('academic_group_ids')"
                    />
                  </template>
                  <span
                    v-if="formErrors.academic_group_ids"
                    class="text-danger"
                  >
                    {{ formErrors.academic_group_ids[0] }}
                  </span>
                </div>
                <div class="mb-3">
                  <label for="division-name-select" class="form-label">{{
                    $t("Employee")
                  }}</label>
                  <a-select
                    v-model:value="computedFormState.employee_id"
                    :options="optionsEmployee"
                    :field-names="{ value: 'id', label: 'name' }"
                    :filter-option="filterOption"
                    :placeholder="$t('Choose_Employee')"
                    @change="clearError('employee_id')"
                    show-search
                  />
                  <span v-if="formErrors.employee_id" class="text-danger">
                    {{ formErrors.employee_id[0] }}
                  </span>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <div class="btn-group gap-2">
                <button
                  class="btn btn-light rounded-0"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close") }}
                </button>
                <SubmitButton :loading="isLoading" />
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
