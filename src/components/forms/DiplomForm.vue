<script setup lang="ts">
import { useNotyf } from "@/composable/useNotyf";
import { useI18n } from "vue-i18n";
import { onMounted, reactive, ref } from "vue";
import {
  createDiplom,
  updateDiplom,
  dublicate,
} from "@/utils/api/archive/give";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { diplomTypes } from "@/utils/api/reference";
import helpers from "@/utils/helper";

const isLoading = ref(false);
const notif = useNotyf();
const { t } = useI18n();
const router = useRouter();
const props = defineProps({
  form: {},
});
const diplomTypesOptions = await diplomTypes().then((res) => res.result);
const formData = reactive({
  student_id: null,
  name: null,
  surname: null,
  last_name: null,
  birthdate: null,
  eduni_name: null,
  rector: null,
  about_eduni: null,
  email_eduni: null,
  accridation: null,
  faculty: null,
  speciality_code: null,
  speciality: null,
  qualification: null,
  about_qualification: null,
  edu_type: null,
  edu_language: null,
  edu_form: null,
  academic_year: null,
  edu_duration: null,
  graduation_work: null,
  old_eduni_data: null,
  old_edu: null,
  old_edu_rating_system: null,
  entering_data: null,
  next_edu_data: null,
  about_diplom: null,
  working_activity: null,
  given_place: null,
  number: null,
  diplom_category_id: null,
  note_number: null,
  note_date: null,
  dak_date: null,
  synchronous_status: null,
  synchronous_date: null,
  status: null,
  diplom_status_form_id: null,
});

const errors = reactive({
  student_id: [],
  name: [],
  surname: [],
  last_name: [],
  birthdate: [],
  eduni_name: [],
  rector: [],
  about_eduni: [],
  email_eduni: [],
  accridation: [],
  faculty: [],
  speciality_code: [],
  speciality: [],
  qualification: [],
  about_qualification: [],
  edu_type: [],
  edu_language: [],
  edu_form: [],
  academic_year: [],
  edu_duration: [],
  graduation_work: [],
  old_eduni_data: [],
  old_edu: [],
  old_edu_rating_system: [],
  entering_data: [],
  next_edu_data: [],
  about_diplom: [],
  working_activity: [],
  given_place: [],
  number: [],
  diplom_category_id: [],
  note_number: [],
  note_date: [],
  dak_date: [],
  synchronous_status: [],
  synchronous_date: [],
  status: [],
  diplom_status_form_id: [],
});

async function submit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = props.form?.id
      ? await updateDiplom(formData?.id, formData)
      : await createDiplom(formData);
    props.form?.id
      ? notif.success(t("Data_stored_successfully"))
      : notif.success(t("success_created"));
    if (props.form?.id) {
      await router.push("/archive/diplom-give/edit?id=" + props.form?.id);
    } else {
      await router.push("/archive/diplom-give");
    }
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Dashboard_Error"));
  } finally {
    isLoading.value = false;
  }
}

async function dublicateDiplom() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = await dublicate(props.form.id);
    notif.success(t("Duplicate_Diploma"));
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
    name: [],
    surname: [],
    last_name: [],
    birthdate: [],
    eduni_name: [],
    rector: [],
    about_eduni: [],
    email_eduni: [],
    accridation: [],
    faculty: [],
    speciality_code: [],
    speciality: [],
    qualification: [],
    about_qualification: [],
    edu_type: [],
    edu_language: [],
    edu_form: [],
    academic_year: [],
    edu_duration: [],
    graduation_work: [],
    old_eduni_data: [],
    old_edu: [],
    old_edu_rating_system: [],
    entering_data: [],
    next_edu_data: [],
    about_diplom: [],
    working_activity: [],
    given_place: [],
    number: [],
    diplom_category_id: [],
    note_number: [],
    note_date: [],
    dak_date: [],
    synchronous_status: [],
    synchronous_date: [],
    status: [],
    diplom_status_form_id: [],
  });
}

function clearError(field: string) {
  errors[field] = "";
}
onMounted(() => {
  Object.assign(formData, props.form);
});
</script>

<template>
  <form @submit.prevent="submit">
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("Student_information") }}
    </h5>
    <div class="row">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-md-4">
            <a-form-item>
              <label for="">{{ $t("Second_Name") }} *</label>
              <a-input v-model:value="formData.last_name" />
              <span v-if="errors.last_name" class="text-danger small">
                {{ errors.last_name[0] }}
              </span>
            </a-form-item>
          </div>
          <div class="col-md-4">
            <a-form-item>
              <label for="">{{ $t("First_Name") }} *</label>
              <a-input v-model:value="formData.name" />
              <span v-if="errors.name" class="text-danger small">
                {{ errors.name[0] }}
              </span>
            </a-form-item>
          </div>
          <div class="col-md-4">
            <a-form-item>
              <label for="">{{ $t("Third_Name") }} *</label>
              <a-input v-model:value="formData.surname" />
              <span v-if="errors.surname" class="text-danger small">
                {{ errors.surname[0] }}
              </span>
            </a-form-item>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="row">
          <div class="col-md-6">
            <a-form-item>
              <label for="">{{ $t("Student_Birthday") }}</label>
              <a-date-picker v-model:value="formData.birthdate" placeholder="YYYY-MM-DD" type="date"
                value-format="YYYY-MM-DD" />
              <span v-if="errors.birthdate" class="text-danger small">
                {{ errors.birthdate[0] }}
              </span>
            </a-form-item>
          </div>
          <div class="col-md-6">
            <a-form-item>
              <label for="">{{ $t("ID_number") }}</label>
              <a-input v-model:value="formData.student_id" />
              <span v-if="errors.student_id" class="text-danger small">
                {{ errors.student_id[0] }}
              </span>
            </a-form-item>
          </div>
        </div>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">{{ $t("HEI_information") }}</h5>
    <div class="row">
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Name_of_HEI") }} *</label>
          <a-input v-model:value="formData.eduni_name" />
          <span v-if="errors.eduni_name" class="text-danger small">
            {{ errors.eduni_name[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Rector_Fullname") }} *</label>
          <a-input v-model:value="formData.rector" />
          <span v-if="errors.rector" class="text-danger small">
            {{ errors.rector[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Given_Hei_Information") }} *</label>
          <a-input v-model:value="formData.about_eduni" />
          <span v-if="errors.about_eduni" class="text-danger small">
            {{ errors.about_eduni[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Mailing_Address") }}i *</label>
          <a-textarea v-model:value="formData.email_eduni" :auto-size="{ minRows: 3, maxRows: 5 }" />
          <span v-if="errors.email_eduni" class="text-danger small">
            {{ errors.email_eduni[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("University_Accreditation") }} *</label>
          <a-textarea v-model:value="formData.accridation" :auto-size="{ minRows: 3, maxRows: 5 }" />
          <span v-if="errors.accridation" class="text-danger small">
            {{ errors.accridation[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("Specialty_information") }}
    </h5>
    <div class="row">
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Structure_Faculty") }}</label>
          <a-input v-model:value="formData.faculty" />
          <span v-if="errors.faculty" class="text-danger small">
            {{ errors.faculty[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Specialty_code") }}</label>
          <a-input v-model:value="formData.speciality_code" />
          <span v-if="errors.speciality_code" class="text-danger small">
            {{ errors.speciality_code[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Specialty_Name") }} *</label>
          <a-input v-model:value="formData.speciality" />
          <span v-if="errors.speciality" class="text-danger small">
            {{ errors.speciality[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Qualification_Name") }} *</label>
          <a-input v-model:value="formData.qualification" />
          <span v-if="errors.qualification" class="text-danger small">
            {{ errors.qualification[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Qualification_Data") }} *</label>
          <a-textarea v-model:value="formData.about_qualification" :auto-size="{ minRows: 13, maxRows: 13 }">
          </a-textarea><span v-if="errors.about_qualification" class="text-danger small">
            {{ errors.about_qualification[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("Education_information") }}
    </h5>
    <div class="row">
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Education_Type") }} *</label>
          <a-input v-model:value="formData.edu_type" />
          <span v-if="errors.edu_type" class="text-danger small">
            {{ errors.edu_type[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Edu_form") }}</label>
          <a-input v-model:value="formData.edu_form" />
          <span v-if="errors.edu_form" class="text-danger small">
          {{ errors.edu_form[0] }}
        </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Graduate_qualifying_work") }} *</label>
          <a-textarea v-model:value="formData.graduation_work" :auto-size="{ minRows: 3, maxRows: 3 }" />
          <span v-if="errors.graduation_work" class="text-danger small">
            {{ errors.graduation_work[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Education_Language") }} *</label>
          <a-input v-model:value="formData.edu_language" />
          <span v-if="errors.edu_language" class="text-danger small">
            {{ errors.edu_language[0] }}
          </span>
        </a-form-item>
        <div class="row">
          <div class="col-sm-6">
            <a-form-item>
              <label for="">{{ $t("Education_Year_Name") }} *</label>
              <a-input v-model:value="formData.academic_year" />
              <span v-if="errors.academic_year" class="text-danger small">
                {{ errors.academic_year[0] }}
              </span>
            </a-form-item>
          </div>
          <div class="col-sm-6">
            <a-form-item>
              <label for="">{{ $t("Education_Period_Year") }} *</label>
              <a-input v-model:value="formData.edu_duration" />
              <span v-if="errors.edu_duration" class="text-danger small">
                {{ errors.edu_duration[0] }}
              </span>
            </a-form-item>
          </div>
        </div>
        <a-form-item>
          <label for="">{{ $t("before_otm_name") }} *</label>
          <a-textarea v-model:value="formData.old_edu" :auto-size="{ minRows: 3, maxRows: 3 }" />
          <span v-if="errors.old_edu" class="text-danger small">
            {{ errors.old_edu[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("additional_information") }}
    </h5>
    <div class="row">
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("last_Education") }} *</label>
          <a-input v-model:value="formData.old_eduni_data" />
          <span v-if="errors.old_eduni_data" class="text-danger small">
            {{ errors.old_eduni_data[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Evaluation_system") }} *</label>
          <a-textarea v-model:value="formData.old_edu_rating_system" :auto-size="{ minRows: 3, maxRows: 3 }" />
          <span v-if="errors.old_edu_rating_system" class="text-danger small">
            {{ errors.old_edu_rating_system[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("additional_Info") }}*</label>
          <a-textarea v-model:value="formData.about_diplom" :auto-size="{ minRows: 3, maxRows: 3 }" />
          <span v-if="errors.about_diplom" class="text-danger small">
            {{ errors.about_diplom[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("admission_Information") }} *</label>
          <a-textarea v-model:value="formData.entering_data" :auto-size="{ minRows: 2, maxRows: 2 }" />
          <span v-if="errors.entering_data" class="text-danger small">
            {{ errors.entering_data[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Information") }} *</label>
          <a-textarea v-model:value="formData.next_edu_data" :auto-size="{ minRows: 2, maxRows: 2 }" />
          <span v-if="errors.next_edu_data" class="text-danger small">
            {{ errors.next_edu_data[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Professional_Activity") }} *</label>
          <a-textarea v-model:value="formData.working_activity" :auto-size="{ minRows: 3, maxRows: 3 }" />
          <span v-if="errors.working_activity" class="text-danger small">
            {{ errors.working_activity[0] }}
          </span>
        </a-form-item>
      </div>
    </div>
    <h5 class="modal-title modal-data-tip mb-2">
      {{ $t("Diploma_information") }}
    </h5>
    <div class="row">
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("Given_City") }} *</label>
          <a-input v-model:value="formData.given_place" />
          <span v-if="errors.given_place" class="text-danger small">
            {{ errors.given_place[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Diploma_category") }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="formData.diplom_category_id"
            :field-names="{ value: 'id', label: 'name' }" :options="diplomTypesOptions" />
          <span v-if="errors.diplom_category_id" class="text-danger small">
            {{ errors.diplom_category_id[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("Diploma_number") }} *</label>
          <a-input v-model:value="formData.number" />
          <span v-if="errors.number" class="text-danger small">
            {{ errors.number[0] }}
          </span>
        </a-form-item>
      </div>
      <div class="col-lg-6">
        <a-form-item>
          <label for="">{{ $t("academic_Register_Number") }} *</label>
          <a-input v-model:value="formData.note_number" />
          <span v-if="errors.note_number" class="text-danger small">
            {{ errors.note_number[0] }}
          </span>
        </a-form-item>
        <a-form-item>
          <label for="">{{ $t("academic_Register_Date") }} *</label>
          <a-date-picker v-model:value="formData.note_date" :placeholder="$t('YYYY_MM_DD')" type="date"
            value-format="YYYY-MM-DD" />
          <span v-if="errors.note_date" class="text-danger small">
            {{ errors.note_date[0] }}
          </span></a-form-item>
        <a-form-item>
          <label for="">{{ $t("SAC_decision_date") }} *</label>
          <a-date-picker v-model:value="formData.dak_date" :placeholder="$t('YYYY_MM_DD')" type="date"
            value-format="YYYY-MM-DD" />
          <span v-if="errors.dak_date" class="text-danger small">
            {{ errors.dak_date[0] }}
          </span></a-form-item>
      </div>
      <div class="col-12">
        <div class="d-flex justify-content-end">
          <template v-if="formData?.id">
            <button @click="dublicateDiplom" class="btns actions-h px-3 me-2" type="button">
              {{ $t("duplicate") }}
            </button>
            <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
          </template>
          <button v-else class="btns c-save" type="submit">
            <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>
            {{ $t("Create") }}
          </button>
        </div>
      </div>
    </div>
    <div class="table-responsive my-3" v-if="formData?.id">
      <table class="content-table change-diplom-give-table">
        <tbody>
          <tr>
            <td>{{ $t("Record_Title") }}</td>
            <td>
              ({{ formData?.name }} {{ formData?.surname }}
              {{ formData?.last_name }})
            </td>
          </tr>
          <tr>
            <td>{{ $t("Sync_Status") }}</td>
            <td>{{ formData?.synchronous_status }}</td>
          </tr>
          <tr>
            <td>{{ $t("Sync_Date") }}</td>
            <td>{{ formData?.synchronous_date }}</td>
          </tr>
        </tbody>
      </table>

      <!-------------END PAGINATION-------------->
    </div>
    <!-- <div class="d-flex justify-content-end">
                  <button class="btns black-c px-3  me-2" type="submit">{{ $t('Check_Sync_Data') }}</button>
                </div> -->
  </form>
</template>
