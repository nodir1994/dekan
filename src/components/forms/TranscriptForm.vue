<script setup lang="ts">
import { useNotyf } from "@/composable/useNotyf";
import { useI18n } from "vue-i18n";
import { onMounted, reactive, ref, computed, watch } from "vue";
import {
  updateTranskript,
  createTranskript,
  getSubjects,
  deleteTranscript,
} from "@/utils/api/archive/transcript";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

import { semesterAll } from "@/utils/api/reference/index";
import helpers from "@/utils/helper";

const isLoading = ref(false);
const notif = useNotyf();
const { t } = useI18n();
const router = useRouter();
const props = defineProps({
  form: {},
});
const route = useRoute();

const paramsID = route.query?.id ?? null;
const student_id = route.query?.student_id ?? null;
console.log({ props }, "salom", { paramsID }, "alik");

const optionSemesters = await semesterAll().then((res) =>
  res.result.map((item: any) => {
    return {
      id: item?.semester,
      name: item?.semester + "-" + t("semester_number"),
    };
  })
);

const plainOptions: any = reactive([]);
const checkAll = computed({
  get() {
    return (
      formData?.transcript_subject_ids?.length ===
      plainOptions?.value?.length && plainOptions?.value?.length > 0
    );
  },
  set(val) {
    if (val) {
      formData.transcript_subject_ids = plainOptions.value;
    } else {
      formData.transcript_subject_ids = [];
    }
  },
});

const subjects = reactive({});

const formData: any = reactive({
  student_id: null,
  number: null,
  given_date: null,
  token: null,
  semester: null,
  full_name: null,
  label: null,
  birthdate: null,
  academic_group: null,
  university: null,
  faculty: null,
  rector: null,
  dean: null,
  edu_type: null,
  edu_form: null,
  shifr: null,
  intered_year: null,
  graduation_year: null,
  specialty: null,
  transcript_subject_ids: [],
});

const errors: any = reactive({
  student_id: [],
  number: [],
  given_date: [],
  token: [],
  semester: [],
  full_name: [],
  label: [],
  birthdate: [],
  academic_group: [],
  university: [],
  faculty: [],
  rector: [],
  dean: [],
  edu_type: [],
  edu_form: [],
  shifr: [],
  intered_year: [],
  graduation_year: [],
  specialty: [],
});

async function submit() {
  try {
    isLoading.value = true;
    clearErrors();
    if (formData.university) {
      formData.eduni_name = formData.university;
    } else {
      formData.eduni_name = formData.eduni_name;
    }
    if (formData.academic_group) {
      formData.group = formData.academic_group;
    } else {
      formData.group = formData.group;
    }
    if (formData.specialty) {
      formData.speciality = formData.specialty;
    } else {
      formData.speciality = formData.speciality;
    }
    const res = paramsID
      ? await updateTranskript(formData?.id, formData)
      : await createTranskript(formData);
    if (paramsID) {
      notif.success(t("Data_stored_successfully"));
    } else {
      notif.success(t("success_created"));
      await router.push("/archive/transcript");
    }
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

async function deleted() {
  try {
    isLoading.value = true;
    const res = await deleteTranscript(formData?.id);
    notif.success(t("Delete_message.Removed"));
    await router.push("/archive/transcript");
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

function clearErrors() {
  Object.assign(errors, {
    student_id: [],
    number: [],
    given_date: [],
    token: [],
    semester: [],
    full_name: [],
    label: [],
    birthdate: [],
    academic_group: [],
    university: [],
    faculty: [],
    rector: [],
    dean: [],
    edu_type: [],
    edu_form: [],
    shifr: [],
    intered_year: [],
    graduation_year: [],
    specialty: [],
  });
}

function clearError(field: string) {
  errors[field] = "";
}
onMounted(() => {
  Object.assign(formData, props.form);
});

watch(
  () => formData.semester,
  async (newVal) => {
    let res = await getSubjects(newVal, formData.student_id);
    plainOptions.value = res?.result.map((item: any) => item.id);
    formData.transcript_subjects = res?.result;
  }
);
</script>

<template>
  <form @submit.prevent="submit">
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("Student_information") }}
    </h5>
    <div class="row">
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Student_Name") }}</label>
          <a-input disabled v-model:value="formData.full_name" />
          <span v-if="errors.full_name" class="text-danger small">
            {{ errors.full_name[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Student_Status_Label") }}</label>
          <a-input disabled v-model:value="formData.label" />
          <span v-if="errors.label" class="text-danger small">
            {{ errors.label[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Student_Birthday") }}</label>
          <a-date-picker disabled placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD"
            v-model:value="formData.birthdate" />
          <span v-if="errors.birthdate" class="text-danger small">
            {{ errors.birthdate[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item v-if="formData.academic_group">
          <label for="">{{ $t("Group_name") }}</label>
          <a-input disabled v-model:value="formData.academic_group" />
          <span v-if="errors.academic_group" class="text-danger small">
            {{ errors.academic_group[0] }}
          </span>
        </a-form-item>
        <a-form-item v-if="formData.group">
          <label for="">{{ $t("Group_name") }}</label>
          <a-input disabled v-model:value="formData.group" />
          <span v-if="errors.group" class="text-danger small">
            {{ errors.group[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">{{ $t("HEI_information") }}</h5>
    <div class="row">
      <div class="col-md-3">
        <a-form-item v-if="formData.university">
          <label for="">{{ $t("Name_of_HEI") }}</label>
          <a-input disabled v-model:value="formData.university" />
          <span v-if="errors.university" class="text-danger small">
            {{ errors.university[0] }}
          </span>
        </a-form-item>
        <a-form-item v-if="formData.eduni_name">
          <label for="">{{ $t("Name_of_HEI") }}</label>
          <a-input disabled v-model:value="formData.eduni_name" />
          <span v-if="errors.eduni_name" class="text-danger small">
            {{ errors.eduni_name[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Faculty_Name") }}</label>
          <a-input disabled v-model:value="formData.faculty" />
          <span v-if="errors.faculty" class="text-danger small">
            {{ errors.faculty[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Rector") }}</label>
          <a-input disabled v-model:value="formData.rector" />
          <span v-if="errors.rector" class="text-danger small">
            {{ errors.rector[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("rolName") }}</label>
          <a-input disabled v-model:value="formData.dean" />
          <span v-if="errors.dean" class="text-danger small">
            {{ errors.dean[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("Education_information") }}
    </h5>
    <div class="row">
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Education_Type") }}</label>
          <a-input disabled v-model:value="formData.edu_type" />
          <span v-if="errors.edu_type" class="text-danger small">
            {{ errors.edu_type[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Edu_form") }}</label>
          <a-input disabled v-model:value="formData.edu_form" />
          <span v-if="errors.edu_form" class="text-danger small">
            {{ errors.edu_form[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Specialty_code") }}</label>
          <a-input disabled v-model:value="formData.shifr" />
          <span v-if="errors.shifr" class="text-danger small">
            {{ errors.shifr[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Year_Of_Entered") }}</label>
          <a-input v-model:value="formData.intered_year" />
          <span v-if="errors.intered_year" class="text-danger small">
            {{ errors.intered_year[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("Year_Of_Graduated") }}</label>
          <a-input v-model:value="formData.graduation_year" />
          <span v-if="errors.graduation_year" class="text-danger small">
            {{ errors.graduation_year[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item v-if="formData.specialty">
          <label for="">{{ $t("Specialty_Name") }}</label>
          <a-input disabled v-model:value="formData.specialty" />
          <span v-if="errors.specialty" class="text-danger small">
            {{ errors.specialty[0] }}
          </span>
        </a-form-item>
        <a-form-item v-if="formData.speciality">
          <label for="">{{ $t("Specialty_Name") }}</label>
          <a-input disabled v-model:value="formData.speciality" />
          <span v-if="errors.speciality" class="text-danger small">
            {{ errors.speciality[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">Transkript ma'lumotlari</h5>
    <div class="row">
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("academic_Register_Number") }}</label>
          <a-input v-model:value="formData.number" />
          <span v-if="errors.number" class="text-danger small">
            {{ errors.number[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item>
          <label for="">{{ $t("academic_Register_Date") }}</label>
          <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD"
            v-model:value="formData.given_date" />
          <span v-if="errors.given_date" class="text-danger small">
            {{ errors.given_date[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-md-3">
        <a-form-item class="mb-3">
          <label for="division-name-select">{{ $t("Choose_Semester") }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search class="form--item"
            v-model:value="formData.semester" allowClear :disabled="paramsID" :options="optionSemesters"
            :field-names="{ value: 'id', label: 'name' }" :placeholder="t('Select_payment_form')">
          </a-select>
          <span v-if="errors.semester" class="text-danger small">
            {{ errors.semester[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <div class="top__system__raiting">
      <h5 class="modal-title modal-data-tip mb-2">
        <b>{{ $t("Curriculum_Subject") }}</b>
        <span>{{ formData?.rating_system }}</span>
      </h5>
    </div>
    <div class="table-responsive">
      <table v-if="formData.semester" class="content-table mb-3" :class="paramsID ? 'edit' : 'create'">
        <thead>
          <tr class="table-row-transkript-id">
            <th>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="checkAll" />
              </div>
            </th>
            <th>#</th>
            <th>{{ $t("Subjects") }}</th>
            <th>{{ $t("Semester_Name") }}</th>
            <th>{{ $t("Total_Acload") }}</th>
            <th>{{ $t("Credit") }}</th>
            <th>{{ $t("Score") }}</th>
            <th>{{ $t("gradeSome") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row-transkript-id" v-for="(element, index) in formData?.transcript_subjects"
            :key="element?.id">
            <td>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" v-model="formData.transcript_subject_ids"
                  :value="element?.id" />
              </div>
            </td>
            <td>{{ index + 1 }}</td>
            <td>
              {{ element.subjec }}
            </td>
            <td>{{ element.semester }} - {{ $t("semester") }}</td>
            <td>{{ element?.load }}</td>
            <td>{{ element?.credit }}</td>
            <td>{{ element?.ball }}</td>
            <td>{{ element?.grade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-end" v-if="paramsID">
      <button class="btns c-delete me-2" @click="deleted()" type="button">
        <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
        {{ $t("Delete") }}
      </button>
      <button class="btns c-save" type="submit">
        <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
        {{ $t("Save") }}
      </button>
    </div>
    <div class="d-flex justify-content-end" v-else>
      <button class="btns c-save" type="submit">
        <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
        {{ $t("Create") }}
      </button>
    </div>
  </form>
</template>
<style lang="scss">
.edit {
  .table-row-transkript-id {

    th,
    td {
      &:first-child {
        display: none !important;
      }
    }
  }
}
</style>
