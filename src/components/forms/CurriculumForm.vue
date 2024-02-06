<script setup lang="ts">
import {
  specialList,
  academicYearsList,
  eduFormList,
  ratingSystemList,
  qualificationListBySpeciality,
} from "@/utils/api/reference/index";
import { computed, onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);

const props = defineProps<{
  formState: [];
  errors: any;
  isLoading: boolean;
}>();
const emits: any = defineEmits<{
  (e: "submit"): void;
  (e: "updateCount", obj: {}): void;
  (e: "clearError", value: string): void;
}>();
const { locale, t } = useI18n();
const classficationBoo = ref(false);
const optriosAcademicYear: any = ref([]);
const optionsEduForm: any = ref([]);
const optionsSpeciality: any = ref([]);
const optionsRatingSystem: any = ref([]);
const optionsQualification: any = ref([]);
const computedFormState: any = computed({
  get() {
    return props.formState;
  },
  set(val) {
    emits("update:formState", val);
  },
});

onMounted(async () => {
  Promise.all([
    academicYearsList(),
    eduFormList(),
    ratingSystemList(),
    specialList(),
  ]).then((responses) => {
    optriosAcademicYear.value = responses[0].result;
    optionsEduForm.value = responses[1].result;
    optionsRatingSystem.value = responses[2].result;
    optionsSpeciality.value = responses[3].result;
  });
});

watch(
  () => computedFormState.value.specialty_id,
  async (newVal) => {
    if (Number(newVal)) {
      const resQualification = await qualificationListBySpeciality(
        Number(newVal)
      );
      optionsQualification.value = resQualification.result;
      if (optionsQualification.value?.data?.length > 0) {
        classficationBoo.value = false;
      } else {
        classficationBoo.value = true;
      }
    }
  },
  { immediate: true }
);

function onSubmit() {
  emits("submit");
}
</script>

<template>
  <a-form @finish="onSubmit" :model="computedFormState">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="division-name-input" class="form-label">{{
            $t("Title")
          }}</label>
          <a-input
            v-model:value="computedFormState.name"
            @change="emits('clearError', 'name')"
            :placeholder="$t('Enter_name')"
          />
          <span v-if="errors.name" class="text-danger small">
            {{ errors.name[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Structure_Faculty")
          }}</label>
          <a-select  class="form--item" :value="deanId" disabled> </a-select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("by_Specialty")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search
            v-model:value="computedFormState.specialty_id"
            :options="optionsSpeciality.data"
            :field-names="{ value: 'id', label: 'name' }"
            @change="emits('clearError', 'specialty_id')"
            :placeholder="$t('Choose')"
            allow-clear
          >
          </a-select>
          <span v-if="errors.specialty_id" class="text-danger small">
            {{ errors.specialty_id[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">
            {{ $t("Qualification") }}</label
          >
          <a-select :filter-option="helpers.filterOptionByName" show-search
            v-model:value="computedFormState.qualification_id"
            :options="optionsQualification.data"
            :disabled="classficationBoo || !computedFormState.specialty_id"
            :field-names="{ value: 'id', label: 'name' }"
            @change="emits('clearError', 'qualification_id')"
            :placeholder="$t('Choose')"
            allow-clear
          >
          </a-select>
          <span v-if="errors.qualification_id" class="text-danger small">
            {{ errors.qualification_id[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Education_Year_Name")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search
            v-model:value="computedFormState.academic_year_id"
            :options="optriosAcademicYear.data"
            :field-names="{ value: 'id', label: 'name' }"
            @change="emits('clearError', 'academic_year_id')"
            :placeholder="$t('Choose_Education_Year')"
          >
          </a-select>
          <span v-if="errors.academic_year_id" class="text-danger small">
            {{ errors.academic_year_id[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">
            {{ $t("Edu_form") }}</label
          >
          <a-select :filter-option="helpers.filterOptionByName" show-search
            v-model:value="computedFormState.edu_form_id"
            :options="optionsEduForm"
            :field-names="{ value: 'id', label: 'name' }"
            @change="emits('clearError', 'edu_form_id')"
            :placeholder="$t('Choose_Education_Form')"
          >
          </a-select>
          <span v-if="errors.edu_form_id" class="text-danger small">
            {{ errors.edu_form_id[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Curriculum_Marking_System")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search
            v-model:value="computedFormState.rating_system_id"
            :field-names="{ value: 'id', label: 'name' }"
            @change="emits('clearError', 'rating_system_id')"
            :placeholder="$t('Select_Rating_System')"
            :options="optionsRatingSystem"
          >
          </a-select>
          <span v-if="errors.rating_system_id" class="text-danger small">
            {{ errors.rating_system_id[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="division-name-input" class="form-label">
            {{ $t("Training_Period") }}
          </label>
          <a-input
            type="number"
            v-model:value="computedFormState.term"
            @change="emits('clearError', 'term')"
            :placeholder="$t('Enter')"
          />
          <span v-if="errors.term" class="text-danger small">
            {{ errors.term[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="division-name-input" class="form-label">{{
            $t("Count_of_semesters")
          }}</label>
          <a-input
            type="number"
            v-model:value="computedFormState.count_semester"
            @change="emits('clearError', 'count_semester')"
            :placeholder="$t('Enter')"
          />
          <span v-if="errors.count_semester" class="text-danger small">
            {{ errors.count_semester[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-3">
        <label for="division-name-input" class="form-label">
          {{ $t("Start_Autumn_period") }}</label
        >
        <a-date-picker
          v-model:value="computedFormState.autumn_start"
          value-format="YYYY-MM-DD"
          @change="emits('clearError', 'autumn_start')"
          :placeholder="$t('Date_Picer')"
          :locale="locale"
          :language="locale"
        />
        <span v-if="errors.autumn_start" class="text-danger small">
          {{ errors.autumn_start[0] }}
        </span>
      </div>
      <div class="col-md-3">
        <label for="division-name-input" class="form-label">
          {{ $t("End_Autumn_period") }}</label
        >
        <a-date-picker
          v-model:value="computedFormState.autumn_end"
          value-format="YYYY-MM-DD"
          @change="emits('clearError', 'autumn_end')"
          :placeholder="$t('Date_Picer')"
        />
        <span v-if="errors.autumn_end" class="text-danger small">
          {{ errors.autumn_end[0] }}
        </span>
      </div>
      <div class="col-md-3">
        <label for="division-name-input" class="form-label">
          {{ $t("Start_Spring_period") }}</label
        >
        <a-date-picker
          v-model:value="computedFormState.spring_start"
          value-format="YYYY-MM-DD"
          @change="emits('clearError', 'spring_start')"
          :placeholder="$t('Date_Picer')"
        />
        <span v-if="errors.spring_start" class="text-danger small">
          {{ errors.spring_start[0] }}
        </span>
      </div>
      <div class="col-md-3">
        <label for="division-name-input" class="form-label">{{
          $t("End_Spring_period")
        }}</label>
        <a-date-picker
          v-model:value="computedFormState.spring_end"
          value-format="YYYY-MM-DD"
          @change="emits('clearError', 'spring_end')"
          :placeholder="$t('Date_Picer')"
        />
        <span v-if="errors.spring_end" class="text-danger small">
          {{ errors.spring_end[0] }}
        </span>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-2">
      <SubmitButton :loading="isLoading" />
    </div>
  </a-form>
</template>

<style scoped></style>
