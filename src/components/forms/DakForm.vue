<script setup lang="ts">
import { useNotyf } from "@/composable/useNotyf";
import { useI18n } from "vue-i18n";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { createDak, updateDak } from "@/utils/api/additional";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import {
  departmentListAll,
  academicYearsList,
  specialList,
  educationList,
  getListSubjectsAcademicAndYear,
  allDakList,
  allDakTypeList,
  academicGroupsList,
  allStudentsDaks,
} from "@/utils/api/reference";
import helpers from "@/utils/helper";

const options: any = reactive({
  optionsAcademicYearList: null,
  optionsEduTypeList: null,
  optionsSpecialList: null,
  optionsDepartment: null,
  optionsDak: null,
  optionsAllDak: null,
  getListSubjectsAll: null,
  academicGroupsList: null,
  allStudents: null,
});

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const isLoading = ref(false);
const notif = useNotyf();
const { t } = useI18n();
const router = useRouter();
const props: any = defineProps({
  formState: { type: [Array, Object], required: true },
});

const formState = reactive({
  student_id: null,
  dak_id: null,
  dak_order: null,
  date: null,
  theme_id: null,
  subject_id: null,
  mark: null,
  ball: null,
  academic_year_id: null,
  department_id: null,
  edu_type_id: null,
  specialty_id: null,
  academic_group_id: null,
});
Object.assign(formState, props.formState);

onMounted(async () => {
  options.optionsDepartment = await departmentListAll().then(
    (res) => res.result
  );
  options.optionsAcademicYearList = await academicYearsList().then(
    (res) => res?.result?.data
  );
  options.academicGroupsList = await academicGroupsList().then(
    (res: any) => res?.result?.data
  );
  options.optionsEduTypeList = await educationList().then((res) => res.result);
  options.optionsSpecialList = await specialList().then((res) =>
    res?.result?.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    })
  );
  options.optionsDak = await allDakTypeList().then((res) => res?.result);
  options.optionsAllDak = await allDakList().then((res) => res?.result);
});

const errors: any = reactive({
  edu_type: [],
  specialty: [],
  department: [],
  academic_year: [],
  type: [],
  name: [],
});

watch(
  () => formState.academic_group_id || formState.academic_year_id,
  async () => {
    if (formState.academic_group_id && formState.academic_year_id) {
      let datas: any = reactive({
        academic_group_id: formState.academic_group_id,
        academic_year_id: formState.academic_year_id,
      });
      const res = await getListSubjectsAcademicAndYear(datas);
      options.getListSubjectsAll = res.result.data.map((res: any) => {
        return {
          id: res.id,
          name: res.name,
        };
      });
      options.allStudents = await allStudentsDaks(
        formState?.academic_group_id
      ).then((res) => res?.result?.data);
    }
  }
  // { immediate: true }
);
async function submit() {
  try {
    isLoading.value = true;
    clearErrors();

    const forms = new FormData();
    Object.getOwnPropertyNames(formState).forEach((prop) => {
      if (formState[prop]) {
        forms.append(prop, formState[prop]);
      }
    });

    // forms.append("name[uz]", formData.name.uz);
    // forms.append("name[ru]", formData.name.ru);
    // forms.append("name[en]", formData.name.en);

    const res = props.form?.id
      ? await updateDak(formState?.id, formState)
      : await createDak(forms);
    notif.success(t("Data_stored_successfully"));
    // await router.push("/archive/certificate-committee");
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

function clearErrors() {
  Object.assign(errors, {
    edu_type: [],
    specialty: [],
    department: [],
    academic_year: [],
    type: [],
    name: [],
  });
}

function clearError(field: string) {
  errors[field] = "";
}
</script>

<template>
  <form @submit.prevent="submit">
  <div class="row">
    <div class="col-md-4">
      <a-form-item class="mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Hei_department")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formState.department_id"
          :field-names="{ value: 'id', label: 'name' }" :options="options.optionsDepartment"></a-select>
        <span v-if="errors.department_id" class="text-danger small">
          {{ errors.department_id[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Education_Year_Name")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formState.academic_year_id"
            :field-names="{ value: 'id', label: 'name' }" :options="options.optionsAcademicYearList"></a-select>
          <span v-if="errors.academic_year_id" class="text-danger small">
            {{ errors.academic_year_id[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Student")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByFullName" show-search v-model:value="formState.student_id"
            :field-names="{ value: 'id', label: 'fullname' }"
            :disabled="!formState.academic_group_id || !formState.academic_year_id"
            :options="options.allStudents"></a-select>
          <span v-if="errors.student_id" class="text-danger small">
            {{ errors.student_id[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="nameFaculty">
          <label for="division-name-input" class="form-label">{{
            $t("SAC_decision_date")
          }}</label>
          <a-date-picker v-model:value="formState.date" value-format="YYYY-MM-DD" :placeholder="$t('select_the_data')" />

          <span v-if="errors.date" class="text-danger small">
            {{ errors.date[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-4">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Education_Type")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formState.edu_type_id"
            :field-names="{ value: 'id', label: 'name' }" :options="options.optionsEduTypeList"></a-select>
          <span v-if="errors.edu_type_id" class="text-danger small">
            {{ errors.edu_type_id[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Group")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formState.academic_group_id"
            :field-names="{ value: 'id', label: 'name' }" :options="options.academicGroupsList"></a-select>
          <span v-if="errors.academic_group_id" class="text-danger small">
            {{ errors.academic_group_id[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("certificate_Committee")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
            v-model:value="formState.dak_id" :options="options.optionsAllDak"
            :field-names="{ value: 'id', label: 'name' }">
          </a-select>
          <span v-if="errors.dak_id" class="text-danger small">
            {{ errors.dak_id[0] }}
          </span>
        </a-form-item>

        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Graduate_Qualifying_Work")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByTheme" show-search v-model:value="formState.theme_id"
            :field-names="{ value: 'id', label: 'theme' }" :options="options.optionsDak"></a-select>
          <span v-if="errors.theme_id" class="text-danger small">
            {{ errors.theme_id[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-4">
        <a-form-item class="mb-3" name="nameSpecial">
          <label for="division-name-select" class="form-label">{{
            $t("by_speciality")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formState.specialty_id"
            :field-names="{ value: 'id', label: 'name' }" :options="options.optionsSpecialList">
          </a-select>
          <span v-if="errors.specialty_id" class="text-danger small">
            {{ errors.specialty_id[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="nameSpecial">
          <label for="division-name-select" class="form-label">{{
            $t("Subjects")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formState.subject_id"
            :disabled="
              !formState.academic_year_id || !formState.academic_group_id
            " :field-names="{ value: 'id', label: 'name' }" :options="options.getListSubjectsAll">
          </a-select>
          <span v-if="errors.subject_id" class="text-danger small">
            {{ errors.subject_id[0] }}
          </span>
        </a-form-item>

        <a-form-item class="mb-3" name="nameFaculty">
          <label for="division-name-select" class="form-label">{{
            $t("DAK_qarori_raqami")
          }}</label>
          <a-input v-model:value="formState.dak_order" class="form--item" />
          <span v-if="errors.dak_order" class="text-danger small">
            {{ errors.dak_order[0] }}
          </span>
        </a-form-item>
        <div class="row">
          <a-form-item class="mb-3 col-md-6" name="nameFaculty">
            <label for="division-name-select" class="form-label">{{
              $t("Score")
            }}</label>
            <a-input class="form--item" v-model:value="formState.ball" />
            <span v-if="errors.ball" class="text-danger small">
              {{ errors.ball[0] }}
            </span>
          </a-form-item>
          <a-form-item class="mb-3 col-md-6" name="nameFaculty">
            <label for="division-name-select" class="form-label">{{
              $t("Grade")
            }}</label>
            <a-input class="form--item" v-model:value="formState.mark" />
            <span v-if="errors.mark" class="text-danger small">
              {{ errors.mark[0] }}
            </span>
          </a-form-item>
        </div>
      </div>

      <!-- <a-form-item class="mb-3">
                                              <label for="division-name-input" class="form-label"
                                                >{{ $t("Name") }} <sup>⚬</sup>(UZ)</label
                                              >
                                              <a-input v-model:value="formState.name['uz']" />
                                              <span v-if="errors['name.uz']" class="text-danger small">
                                                {{ errors["name.uz"][0] }}
                                              </span>
                                            </a-form-item>
                                            <a-form-item class="mb-3">
                                              <label for="division-name-input" class="form-label"
                                                >{{ $t("Name") }} <sup>⚬</sup>(RU)</label
                                              >
                                              <a-input v-model:value="formState.name['ru']" />
                                            </a-form-item>
                                            <a-form-item class="mb-3">
                                              <label for="division-name-input" class="form-label"
                                                >{{ $t("Name") }} <sup>⚬</sup>(EN)</label
                                              >
                                              <a-input v-model:value="formState.name['en']" />
                                            </a-form-item> -->
    </div>
    <div class="d-flex justify-content-end">
      <SubmitButton :loading="isLoading" :icon="'content-save'" />
    </div>
  </form>
</template>
