<script setup lang="ts">
import { useNotyf } from "@/composable/useNotyf";
import { useI18n } from "vue-i18n";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { createDak, dakTypeList, updateDak } from "@/utils/api/additional";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import {
  departmentList,
  academicYearsList,
  getListSubjectsAcademicAndYear,
  educationListAll,
  specialListAll,
} from "@/utils/api/reference";

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
  optionsDakTypeList: null,
});

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const isLoading = ref(false);
const notif = useNotyf();
const { t } = useI18n();
const router = useRouter();
const props: any = defineProps({
  form: { type: Object, required: true },
});

const formState: any = reactive({
  name: {
    uz: "",
    ru: "",
    en: "",
  },
});
Object.assign(formState, props.form);

onMounted(async () => {
  options.optionsDepartment = await departmentList().then((res) => res.result);
  options.optionsSpecialList = await specialListAll().then(
    (res) => res?.result?.data.map((e: any) => {
      return {
        id: e?.id,
        name: e?.code + ' - ' + e?.name
      }
    })
  );
  options.optionsAcademicYearList = await academicYearsList().then(
    (res) => res?.result?.data
  );
  options.optionsEduTypeList = await educationListAll().then(
    (res) => res.result
  );
  options.optionsDakTypeList = await dakTypeList().then((res) => res.result);
});

const errors: any = reactive({
  edu_type: [],
  specialty: [],
  department: [],
  academic_year: [],
  type: [],
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
      options.getListSubjectsAll = res?.result?.map((res: any) => {
        return {
          id: res.subject.id,
          name: res.subject.name,
        };
      });
    }
  }
  // { immediate: true }
);
async function submit() {
  try {
    isLoading.value = true;

    const forms = new FormData();
    Object.getOwnPropertyNames(formState).forEach((prop) => {
      if (formState[prop] && !["name"].includes(prop)) {
        forms.append(prop, formState[prop]);
      }
    });

    forms.append("name[uz]", formState.name.uz);
    forms.append("name[ru]", formState.name.ru);
    forms.append("name[en]", formState.name.en);
    console.log(props.form.id);

    if (props.form.id) {
      const res = await updateDak(formState?.id, formState);
      notif.success(res.result);
      clearErrors();
      setTimeout(async () => {
        await router.push("/archive/certificate-committee");
      }, 1000);
    } else {
      const ress = await createDak(forms);
      notif.success(ress.result);
      clearErrors();
      setTimeout(async () => {
        await router.push("/archive/certificate-committee");
      }, 1000);
    }
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
      <div class="col-md-6">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Faculty")
          }}</label>
          <a-select v-model:value="deanId" disabled></a-select>
        </a-form-item>
      </div>
      <div class="col-md-6">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("by_Specialty")
          }}</label>
          <a-select v-model:value="formState.specialty_id" :field-names="{ value: 'id', label: 'name' }"
            :options="options.optionsSpecialList"></a-select>
          <span v-if="errors.specialty_id" class="text-danger small">
            {{ errors.specialty_id[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-6">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Hei_department")
          }}</label>
          <a-select v-model:value="formState.department_id" :field-names="{ value: 'id', label: 'name' }"
            :options="options.optionsDepartment"></a-select>
          <span v-if="errors.department_id" class="text-danger small">
            {{ errors.department_id[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Curriculum_Education_Year")
          }}</label>
          <a-select v-model:value="formState.academic_year_id" :field-names="{ value: 'id', label: 'name' }"
            :options="options.optionsAcademicYearList"></a-select>
          <span v-if="errors.academic_year_id" class="text-danger small">
            {{ errors.academic_year_id[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("name")
          }}</label>
          <a-select v-model:value="formState.type_id" :field-names="{ value: 'id', label: 'name' }"
            :options="options.optionsDakTypeList">
            <!-- buni aniqlashtirish kerak -->
          </a-select>
          <span v-if="errors.type_id" class="text-danger small">
            {{ errors.type_id[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-6">
        <a-form-item class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Education_Type")
          }}</label>
          <a-select v-model:value="formState.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
            :options="options.optionsEduTypeList"></a-select>
          <span v-if="errors.edu_type_id" class="text-danger small">
            {{ errors.edu_type_id[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-6">
        <a-form-item class="mb-3" name="nameFaculty">
          <label for="division-name-select" class="form-label">{{ $t("name") }} <span class="c-gray">(UZ)</span>
            <sup>o</sup></label>
          <a-input v-model:value="formState.name.uz" class="form--item" />
          <!-- <span v-if="errors['name.uz']" class="text-danger small">
                                {{ errors["name.uz"][0] }}
                              </span> -->
        </a-form-item>
      </div>
      <div class="col-md-6">
        <a-form-item class="mb-3" name="nameFaculty">
          <label for="division-name-select" class="form-label">{{ $t("name") }} <span class="c-gray">(RU)</span>
            <sup>o</sup></label>
          <a-input v-model:value="formState.name.ru" class="form--item" />
          <!-- <span v-if="errors.name.ru" class="text-danger small">
                                {{ errors.name.ru[0] }}
                              </span> -->
        </a-form-item>
      </div>
      <div class="col-md-6">
        <a-form-item class="mb-3" name="nameFaculty">
          <label for="division-name-select" class="form-label">{{ $t("name") }} <span class="c-gray">(EN)</span>
            <sup>o</sup></label>
          <a-input v-model:value="formState.name.en" class="form--item" />
          <!-- <span v-if="errors.name.en" class="text-danger small">
                                {{ errors.name.en[0] }}
                              </span> -->
        </a-form-item>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <SubmitButton :loading="isLoading" :icon="'content-save'" />
    </div>
  </form>
</template>
