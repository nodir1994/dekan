<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import {
  educationList,
  departmentListAll,
  academicYearsList,
  educationListAll,
} from "@/utils/api/reference";
import {
  getAcademicGroupsBySpecialId,
  getSpecialByEduType,
  getStudentsByAcademicGroupsId,
} from "@/utils/api/reference/id";
import {
  createDefense,
  updateDefense,
  orderList,
} from "@/utils/api/archive/bmi";
import helpers from "@/utils/helper";

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const props: any = defineProps({
  form: {},
});
const route: any = useRoute();
const router = useRouter();
const paramsID: any = route.params?.id ?? null;

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const formData: any = reactive({});
Object.assign(formData, props.form);

const sideFormOptions = reactive({
  eduTypeOptions: null,
  departmentOptions: null,
  specialOptions: null,
  academicGroupOptions: null,
  academicYearOptions: null,
  studentOptions: null,
  orderOptions: null,
});

const errors: any = reactive({
  student_id: [],
  category_id: [],
  type_id: [],
  document: [],
  year: [],
});

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationListAll().then(
    (res) => res?.result
  );
  sideFormOptions.departmentOptions = await departmentListAll().then(
    (res) => res?.result
  );
  sideFormOptions.academicYearOptions = await academicYearsList().then((res) =>
    res?.result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.year,
      };
    })
  );
  sideFormOptions.orderOptions = await orderList().then((res) => res?.result);
});

watch(
  () => formData.edu_type_id,
  async (newVal, oldVal) => {
    if (formData.edu_type_id) {
      sideFormOptions.specialOptions = await getSpecialByEduType(
        formData?.edu_type_id
      ).then((res) => res?.result?.data);
    } else {
      formData.specialty_id = null;
      sideFormOptions.specialOptions = null;
    }
  },
  { immediate: true }
);

watch(
  () => formData.specialty_id,
  async (newVal, oldVal) => {
    if (formData.specialty_id) {
      sideFormOptions.academicGroupOptions = await getAcademicGroupsBySpecialId(
        formData.specialty_id
      ).then((res) => res.result.data);
    } else {
      formData.academic_group_id = null;
      sideFormOptions.academicGroupOptions = null;
    }
  },
  { immediate: true }
);

watch(
  () => formData.academic_group_id,
  async () => {
    if (formData.academic_group_id) {
      sideFormOptions.studentOptions = await getStudentsByAcademicGroupsId(
        formData.academic_group_id
      ).then((res) =>
        res?.result?.data.map((item) => {
          return { id: item.id, name: item.name + " " + item.surname };
        })
      );
    } else {
      formData.student_id = null;
      sideFormOptions.studentOptions = null;
    }
  },
  { immediate: true }
);

async function submit() {
  try {
    isLoading.value = true;
    clearErrors();

    const forms = new FormData();
    Object.getOwnPropertyNames(formData).forEach((prop) => {
      if (formData[prop]) {
        forms.append(prop, formData[prop]);
      }
    });

    forms.append("theme[uz]", formData.theme.uz);
    forms.append("theme[ru]", formData.theme.ru);
    forms.append("theme[en]", formData.theme.en);

    const res = props.form?.id
      ? await updateDefense(formData?.id, formData)
      : await createDefense(forms);
    notif.success(res?.result);
    await router.push("/archive/graduate-work");
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    console.log(error);

    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

function clearErrors(error: string) {
  errors[error] = [];
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-md-6">
        <a-form-item class="mb-3" name="nameFaculty">
          <label for="division-name-select" class="form-label">{{
            $t("Structure_Faculty")
          }}</label>
          <a-select class="form--item" :value="deanId" disabled>
          </a-select>
        </a-form-item>

        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-select" class="form-label">{{
            $t("Education_Type")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
            v-model:value="formData.edu_type_id" :field-names="{ value: 'id', label: 'name' }"
            :options="sideFormOptions.eduTypeOptions" :placeholder="t('Choose')">
          </a-select>
          <span v-if="errors.edu_type_id" class="text-danger small">
            {{ errors.edu_type_id[0] }}
          </span>
        </a-form-item>

        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-select" class="form-label">{{
            $t("Department")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formData.department_id"
            :field-names="{ value: 'id', label: 'name' }" :placeholder="t('Choose')"
            :options="sideFormOptions.departmentOptions" allow-clear>
          </a-select>
          <span v-if="errors.department_id" class="text-danger small">
            {{ errors.department_id[0] }}
          </span>
        </a-form-item>

        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-select" class="form-label">{{
            $t("by_Specialty")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formData.specialty_id"
            :field-names="{ value: 'id', label: 'name' }" :disabled="!formData.edu_type_id"
            :options="sideFormOptions.specialOptions" :placeholder="t('Choose')">
          </a-select>
          <span v-if="errors.specialty_id" class="text-danger small">
            {{ errors.specialty_id[0] }}
          </span>
        </a-form-item>

        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-select" class="form-label">{{
            $t("Group")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
            v-model:value="formData.academic_group_id" :disabled="!formData.specialty_id"
            :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicGroupOptions"
            :placeholder="t('Choose')">
          </a-select>
          <span v-if="errors.academic_group_id" class="text-danger small">
            {{ errors.academic_group_id[0] }}
          </span>
        </a-form-item>

        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-select" class="form-label">{{
            $t("Student")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
            v-model:value="formData.student_id" :disabled="!formData.academic_group_id"
            :options="sideFormOptions.studentOptions" :placeholder="t('Choose')" allow-clear>
          </a-select>
          <span v-if="errors.student_id" class="text-danger small">
            {{ errors.student_id[0] }}
          </span>
        </a-form-item>
      </div>

      <div class="col-md-6">
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{ $t("Graduation_work") }} <sup>⚬</sup>(UZ)</label>
          <a-input v-model:value="formData.theme['uz']" />
          <span v-if="errors['theme.uz']" class="text-danger small">
            {{ errors["theme.uz"][0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{ $t("Graduation_work") }} <sup>⚬</sup>(RU)</label>
          <a-input v-model:value="formData.theme['ru']" />
          <span v-if="errors['theme.ru']" class="text-danger small">
            {{ errors["theme.ru"][0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{ $t("Graduation_work") }} <sup>⚬</sup>(EN)</label>
          <a-input v-model:value="formData.theme['en']" />
          <span v-if="errors['theme.en']" class="text-danger small">
            {{ errors["theme.en"][0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{
            $t("Supervisor_Name")
          }}</label>
          <a-input v-model:value="formData.supervisor_name" />
          <span v-if="errors.supervisor_name" class="text-danger small">
            {{ errors.supervisor_theme[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{ $t("Supervisor_Work") }} <sup>⚬</sup></label>
          <a-input v-model:value="formData.supervisor_work_address" />
          <span v-if="errors.supervisor_work_address" class="text-danger small">
            {{ errors.supervisor_work_address[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{ $t("advisor_Name") }} <sup>⚬</sup></label>
          <a-input v-model:value="formData.advisor_name" />
          <span v-if="errors.advisor_name" class="text-danger small">
            {{ errors.advisor_theme[0] }}
          </span>
        </a-form-item>
        <a-form-item class="mb-3" name="yearOfEnter">
          <label for="division-name-input" class="form-label">{{ $t("advisor_Work") }} <sup>⚬</sup></label>
          <a-input v-model:value="formData.advisor_work_address" />
          <span v-if="errors.advisor_work_address" class="text-danger small">
            {{ errors.advisor_work_address[0] }}
          </span>
        </a-form-item>

        <div class="row">
          <div class="col-md-8">
            <a-form-item class="mb-3" name="yearOfEnter">
              <label for="division-name-select" class="form-label">{{
                $t("Command")
              }}</label>
              <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formData.command_id"
                :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.orderOptions"></a-select>
              <span v-if="errors.command_id" class="text-danger small">
                {{ errors.command_id[0] }}
              </span>
            </a-form-item>
          </div>
          <div class="col-md-4">
            <a-form-item class="mb-3" name="yearOfEnter">
              <label for="division-name-select" class="form-label">{{
                $t("Education_Year_Name")
              }}</label>
              <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formData.academic_year_id"
                :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicYearOptions"></a-select>
              <span v-if="errors.academic_year_id" class="text-danger small">
                {{ errors.academic_year_id[0] }}
              </span>
            </a-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <SubmitButton :loading="isLoading" :icon="'content-save'" />
    </div>
  </form>
</template>
