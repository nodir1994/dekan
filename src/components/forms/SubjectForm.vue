<script setup lang="ts">
import {
  subjectTypesListForEduForm,
  subjectListForEduForm,
  departmentListAll,
  ratingGradesListForEduForm,
  finalExamTypesListForEduForm,
  eduFormList,
  ratingSystemListForEduForm,
  eduFormLists,
} from "@/utils/api/reference/index";
import { ratingGradeList } from "@/utils/api/edu/rating-grade";
import { computed, onMounted, ref, watch, reactive } from "vue";
import helpers from "@/utils/helper";

export interface SubjectFormInterface {
  edu_plan_id: number | null;
  semester_id: number | null;
  ratinggrade_id: number | null;
  final_exam_type_id: number | null;
  credit: number | null;
  total_load: number | null;
  type: number | null;
  date_start: string;
  date_end: string;
  subjects: [] | any;
  audience_hours: [] | any;
  exam_types: [] | any;
  additional_types: [] | any;
  subject_type_code: number;
}

const props = defineProps<{
  formState: SubjectFormInterface;
  errors: any;
  isLoading: boolean;
}>();

const emits = defineEmits<{
  (e: "submit"): void;
  (e: "update:formState", value: SubjectFormInterface): void;
  (e: "clearError", value: string): void;
}>();

const computedFormState = computed({
  get() {
    return props.formState;
  },
  set(val) {
    emits("update:formState", val);
  },
});
const optionsEduForm = ref([]);
const optionsRatingGrade: any = ref([]);
const optionsFinalExamTypes = ref([]);
const optionsRatingSystem = ref([]);
const optionsSubjectTypes = ref([]);
const optionsSubject = ref([]);
const optionsDepartment = ref([]);
const ratig_grade_shablon = reactive({
  rating_grade_lesson_activities: [],
  rating_grade_additionals: [],
  rating_grade_exam_types: [],
});
const subject_type = ref({});
const subjectTypeDisabled = ref(false);
const subjectTypeCode = ref({});
const audiance_hours_sum = computed(() => {
  return dynamicLessonActivity.audience_hours?.reduce(
    (cur, acc) => cur + acc.value * 1,
    0
  );
});
const additional_types_sum = computed(() => {
  return dynamicAdditionalType.additional_types?.reduce(
    (cur, acc) => cur + acc.value * 1,
    0
  );
});
const totalSumm = computed(() => {
  return (audiance_hours_sum.value + additional_types_sum.value) * 1;
});

// hooks
onMounted(async () => {
  Promise.all([
    eduFormLists(),
    ratingGradesListForEduForm(),
    finalExamTypesListForEduForm(),
    ratingSystemListForEduForm(),
    subjectTypesListForEduForm(),
    departmentListAll(),
  ]).then(async (responses) => {
    optionsEduForm.value = responses[0].result;
    optionsRatingGrade.value = responses[1].result;
    optionsFinalExamTypes.value = responses[2].result;
    optionsRatingSystem.value = responses[3].result;
    optionsSubjectTypes.value = responses[4].result;
    computedFormState.value.type =
      computedFormState.value.type ?? responses[4].result[1].id;
    optionsDepartment.value = responses[5].result;

    if (computedFormState.value.ratinggrade_id) {

      const res = await ratingGradeList();
      let ress = res.result?.data?.find(
        (x: any) =>
          x.id ==
          optionsRatingGrade.value.data?.find(
            (x: any) => x.id == computedFormState.value.ratinggrade_id
          ).id
      );

      Object.assign(ratig_grade_shablon, ress);
    } else {
      computedFormState.value.ratinggrade_id = responses[1].result.data[0].id;
    }
  });
});

watch(
  () => computedFormState.value.ratinggrade_id,
  async (newVal) => {

    const res = await ratingGradeList();

    let ress = res?.result?.data.find(
      (x: any) =>
        x.id ==
        optionsRatingGrade?.value?.data.find((y: any) => y.id == newVal).id
    );
    Object.assign(ratig_grade_shablon, ress);
  }
);

watch(
  () => computedFormState.value.type,
  async (newVal) => {
    const res = await subjectTypesListForEduForm();

    let ress = res?.result?.find((x: any) => x.id == newVal)?.code;
    subject_type.value = ress;
    if (subject_type.value == 12) {
      subjectTypeDisabled.value = false;
      subjectTypeCode.value = 1;
    } else {
      subjectTypeDisabled.value = true;
      subjectTypeCode.value = 2;
    }
    if (newVal) {
      const res = await subjectListForEduForm(newVal);
      optionsSubject.value = res.result;
    }
  },
  { immediate: true }
);

// // fanlar
// watch(
//   () => computedFormState.value.ratinggrade_id,
//   async (newVal) => {
//     const res = await ratingGradeList();
//     let ress = res?.result?.data.find(
//       (x: any) =>
//         x.id ==
//         optionsRatingGrade.value.data.find((x: any) => x.id == newVal).code
//     );
//     Object.assign(ratig_grade_shablon, ress); // bu qaydnoma turiga qarab yani ratinggrade_id ga qarab shabol yasavoladi
//   }

// );

const dynamicValidateForm = reactive<{ subjects: Sights[] }>({
  subjects: computedFormState.value.subjects.map((item: any) => {
    return {
      subject_id: item.subject_id,
      department_id: item.department_id,
    };
  }),
});

// ------exam_type component----------
const dynamicExamType = reactive<{ exam_types: Sights[] }>({ exam_types: [] });
watch(
  () => ratig_grade_shablon.rating_grade_exam_types,
  (newVal) => {
    Object.assign(dynamicExamType, {
      exam_types: newVal.map((item: any) => {
        return {
          exam_type_name: item.exam_type?.name,
          exam_type_id: item.exam_type?.id,
          value:
            computedFormState.value.exam_types.length > 0
              ? computedFormState.value.exam_types.find(
                (x: any) => x.exam_type.id == item.exam_type?.id
              )?.value
              : null,
        };
      }),
    });
  }
);
//------------------------------------

// ------additional type component----------
const dynamicAdditionalType = reactive<{ additional_types: Sights[] }>({
  additional_types: [],
});
watch(
  () => ratig_grade_shablon.rating_grade_additionals,
  (newVal) => {
    Object.assign(dynamicAdditionalType, {
      additional_types: newVal.map((item: any) => {
        return {
          additional_type_name: item.additional_type?.name,
          additional_type_id: item.additional_type?.id,
          value:
            computedFormState.value.additional_types.length > 0
              ? computedFormState.value.additional_types.find(
                (x: any) => x.additional_type.id == item.additional_type?.id
              )?.value
              : "0",
        };
      }),
    });
  }
);
//------------------------------------

// ------dynamicLesson activity component----------
const dynamicLessonActivity = reactive<{ audience_hours: Sights[] }>({
  audience_hours: [],
});
watch(
  () => ratig_grade_shablon.rating_grade_lesson_activities,
  (newVal) => {
    Object.assign(dynamicLessonActivity, {
      audience_hours: newVal.map((item: any, index: number) => {
        return {
          lesson_activity_name: item.lesson_activity?.name,
          lesson_activity_id: item.lesson_activity?.id,
          value:
            computedFormState.value.audience_hours.length > 0
              ? computedFormState.value.audience_hours.find(
                (x: any) =>
                  x.lesson_activity?.id != undefined &&
                  x.lesson_activity?.id == item.lesson_activity?.id
              )?.value ?? 0
              : 0,
        };
      }),
    });
  }
);
//------------------------------------

// functions
const removeSight = (item: Sights) => {
  let index = dynamicValidateForm.subjects.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.subjects.splice(index, 1);
  }
};

const addSubject = () => {
  dynamicValidateForm.subjects.push({
    subject_id: null,
    department_id: null,
  });
};

function onSubmit() {
  computedFormState.value.audience_hours = dynamicLessonActivity.audience_hours;
  computedFormState.value.exam_types = dynamicExamType.exam_types;
  computedFormState.value.additional_types =
    dynamicAdditionalType.additional_types;
  computedFormState.value.subjects = dynamicValidateForm.subjects;
  computedFormState.value.total_load = totalSumm.value;
  emits("submit");
}
</script>

<template>
  <a-form @finish="onSubmit" :model="computedFormState">
    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Curriculum_Subject_Detail") }}
      </h5>
      <div class="col-md-6 mb-3">
        <label for="division-name-select" class="form-label">
          {{ $t("sciense_type") }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.type"
          :options="optionsSubjectTypes" :field-names="{ value: 'id', label: 'name' }"
          @change="emits('clearError', 'type')" :placeholder="$t('Choose')">
        </a-select>
        <span v-if="errors.type" class="text-danger small">
          {{ errors.type[0] }}
        </span>
      </div>
      <div class="col-md-6 mb-3">
        <div>
          <label for="division-name-select" class="form-label">{{
            $t("Add_subject")
          }}</label>
          <a-button :disabled="subjectTypeDisabled" type="dashed" block @click="addSubject">
            <i class="mdi mdi-plus me-2 align-middle"></i>
            {{ $t("add") }}
          </a-button>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row bg-light" v-for="(sight, index) in dynamicValidateForm.subjects" :key="sight.id">
          <div class="col-md-6 mb-3" :name="['subjects', 'subject_id']">
            <label for="division-name-select" class="form-label">{{
              $t("Subject")
            }}</label>
            <a-select :filter-option="helpers.filterOptionByName" show-search :options="optionsSubject?.data"
              :field-names="{ value: 'id', label: 'name' }" @change="emits('clearError', `subjects.${index}.subject_id`)"
              :placeholder="$t('Choose')" v-model:value="sight.subject_id"></a-select>
            <span v-if="errors[`subjects.${index}.subject_id`]" class="text-danger small">
              {{ errors[`subjects.${index}.subject_id`][0] }}
            </span>
          </div>
          <div class="col-md-5 mb-3" :name="['subjects', 'department_id']">
            <label for="division-name-select" class="form-label">{{
              $t("Hei_department")
            }}</label>
            <a-select :filter-option="helpers.filterOptionByName" show-search :options="optionsDepartment"
              :field-names="{ value: 'id', label: 'name' }"
              @change="emits('clearError', `subjects.${index}.department_id`)" :placeholder="$t('Choose')"
              v-model:value="sight.department_id"></a-select>
            <span v-if="errors[`subjects.${index}.department_id`]" class="text-danger small">
              {{ errors[`subjects.${index}.department_id`][0] }}
            </span>
          </div>
          <div class="col-md-1 mt-4">
            <button :disabled="subjectTypeDisabled" type="button" class="btns c-clear me-1 w-100"
              @click="removeSight(sight)">
              <i class="mdi mdi-delete-sweep text-danger font-size-16 align-middle me-1"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="mb-3 col-md-4">
        <label for="division-name-select" class="form-label">
          {{ $t("Curriculum_Rating_Grade") }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.ratinggrade_id"
          :options="optionsRatingGrade.data" :field-names="{ value: 'id', label: 'name' }"
          @change="emits('clearError', 'ratinggrade_id')" :placeholder="$t('Choose')">
        </a-select>
        <span v-if="errors.ratinggrade_id" class="text-danger small">
          {{ errors.ratinggrade_id[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-4">
        <label for="division-name-select" class="form-label">
          {{ $t("Exam_Finish") }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.final_exam_type_id" :options="optionsFinalExamTypes"
          :field-names="{ value: 'id', label: 'name' }" @change="emits('clearError', 'final_exam_type_id')"
          :placeholder="$t('Choose')">
        </a-select>
        <span v-if="errors.final_exam_type_id" class="text-danger small">
          {{ errors.final_exam_type_id[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-2">
        <label for="division-name-input" class="form-label">
          {{ $t("Credit") }}</label>
        <a-input v-model:value="computedFormState.credit" @change="emits('clearError', 'credit')" />
        <span v-if="errors.credit" class="text-danger small">
          {{ errors.credit[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-2">
        <label for="division-name-input" class="form-label">{{
          $t("Total_Acload")
        }}</label>
        <a-input disabled v-model:value="totalSumm" />
      </div>
      <div>
        <div v-if="ratig_grade_shablon.rating_grade_lesson_activities.length" class="row">
          <h5 class="modal-title modal-data-tip mb-2">
            {{ $t("Auditorm_hour") }}
          </h5>
          <div class="mb-3 col-md-4">
            <label for="division-name-input" class="form-label">{{
              $t("Total_Point")
            }}</label>
            <a-input disabled :value="audiance_hours_sum" />
          </div>
          <div class="mb-3 col-md-2" v-for="(sight, index) in dynamicLessonActivity.audience_hours" :key="index">
            <div :name="['audience_hours', 'lesson_activity_id']">
              <label for="division-name-input" class="form-label">{{
                sight.lesson_activity_name
              }}</label>
              <a-input v-model:value="sight.value" />
            </div>
          </div>
        </div>

        <div class="row">
          <h5 class="modal-title modal-data-tip mb-2">
            {{ $t("additional") }}
          </h5>
          <div class="mb-3 col-md-4" v-for="(sight, index) in dynamicAdditionalType.additional_types" :key="sight.id">
            <div :name="['additional_types', 'additional_type_id']">
              <label for="division-name-input" class="form-label">{{
                sight.additional_type_name
              }}</label>
              <a-input v-model:value="sight.value" />
            </div>
          </div>
        </div>
        <div class="row">
          <h5 class="modal-title modal-data-tip mb-2">
            {{ $t("Rating_Grades") }}
          </h5>
          <div class="mb-3 col-md-4" v-for="(sight, index) in dynamicExamType.exam_types" :key="sight.id">
            <div :name="['exam_types', 'exam_type_id']">
              <label for="division-name-input" class="form-label">{{
                sight.exam_type_name
              }}</label>
              <a-input v-model:value="sight.value" @change="emits('clearError', `exam_types.${index}.value`)" />
              <span v-if="errors[`exam_types.${index}.value`]" class="text-danger small">
                {{ errors[`exam_types.${index}.value`][0] }}
              </span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-2">
          <SubmitButton :loading="isLoading" :icon="'content-save'" />
        </div>
      </div>
      <!-- ------------------------------------------ -->
    </div>
  </a-form>
</template>

<style scoped></style>
