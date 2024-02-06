<script setup lang="ts">
import {
  facultyList,
  specialList,
  academicYearsList,
  paymentTypeList,
  socialCategoryList,
  studentCategoryList,
  liveTogetherList,
  livePlaceStatusList,
  countryList,
  regionList,
  districtList,
  orderListEnrollment,
  citizenList,
  nationsList,
  livePlaceList,
  academicGroupsList,
  semestrList,
  currentDistrictList,
  regionListAll,
} from "@/utils/api/reference/index";
import { computed, onMounted, ref, watch, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const max: any = ref(14);
const props: any = defineProps<{
  formState: object;
  errors: any;
  isLoading: boolean;
}>();
const emits = defineEmits<{
  (e: "submit"): void;
  (e: "clearError", value: string): void;
  (e: "update:formState", val: any): void;
}>();

const { t } = useI18n();
const optriosAcademicYear = ref([]);
const optionsFaculty = ref([]);
const optionsSpeciality = ref([]);
const optionsPaymentTypes = ref([]);
const optionsSocialCategories = ref([]);
const optionsStudentCategories = ref([]);
const optionsCategoryLiveTogethers = ref([]);
const optionsResidencePlaceStatuses = ref([]);
const optionsCountry = ref([]);
const optionsRegion = ref([]);
const optionsRegionCurrent: any = ref([]);
const optionsDistrict = ref([]);
const optionsDistrictNewDistrict = ref([]);
const optionsCommand = ref([]);
const optionsCitizenship = ref([]);
const optionsNation = ref([]);
const optionsLivePlaces = ref([]);
const optionsAcademicGroup = ref([]);
const optionsSemester = ref([]);
const computedFormState: any = computed({
  get() {
    return props.formState;
  },
  set(val) {
    emits("update:formState", val);
  },
});
// computedFormState?.old_educational_name?.uz =

onMounted(async () => {
  Promise.all([
    academicYearsList(),
    facultyList(),
    paymentTypeList(),
    specialList(),
    socialCategoryList(),
    studentCategoryList(),
    liveTogetherList(),
    livePlaceStatusList(),
    countryList(),
    orderListEnrollment(),
    citizenList(),
    nationsList(),
    livePlaceList(),
    academicGroupsList(),
    semestrList(),
    regionListAll(),
  ]).then((responses) => {
    optriosAcademicYear.value = responses[0].result.data;
    optionsFaculty.value = responses[1].result;
    optionsPaymentTypes.value = responses[2].result;
    optionsSpeciality.value = responses[3].result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    });
    optionsSocialCategories.value = responses[4].result;
    optionsStudentCategories.value = responses[5].result;
    optionsCategoryLiveTogethers.value = responses[6].result;
    optionsResidencePlaceStatuses.value = responses[7].result;
    optionsCountry.value = responses[8].result;
    optionsCommand.value = responses[9].result.data;
    optionsCitizenship.value = responses[10].result;
    optionsNation.value = responses[11].result;
    optionsLivePlaces.value = responses[12].result;
    optionsAcademicGroup.value = responses[13].result.data;
    optionsSemester.value = responses[14].result.data.map((item: any) => {
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
    optionsRegionCurrent.value = responses[15].result;
    // computedFormState.value.social_category_id =
    //   responses[4].result[computedFormState.social_category_id].id;
    // computedFormState.value.student_category_id =
    //   responses[5].result[computedFormState?.student_category_id].id;
    // computedFormState.value.country_id =
    //   responses[8].result[computedFormState?.country_id].id;
    // computedFormState.value.payment_type_id = responses[2].result;
    // computedFormState.value.citizenship_id =
    //   responses[10].result[computedFormState?.citizenship_id].id;
    // console.log(computedFormState.value.citizenship_id);
  });
});

const academicYear = props.formState.semester?.academic_year_id;
// console.log(props.formState.semester)

watch(
  () => computedFormState.value.country_id,
  async (newVal) => {
    if (Number(newVal)) {
      const resRegion = await regionList(Number(newVal));
      // console.log('11',resRegion)
      optionsRegion.value = resRegion.result;
    }
  },
  { immediate: true }
);
// tuman
watch(
  () => computedFormState.value.region_id,
  async (newVal) => {
    if (Number(newVal)) {
      const resDistrict = await districtList(Number(newVal));
      optionsDistrictNewDistrict.value = resDistrict.result;
      // console.log('22',resDistrict.result)
    }
  },
  { immediate: true }
);
//joriy tuman
watch(
  () => computedFormState.value.now_region_id,
  async (newVal: number) => {
    if (newVal) {
      const resDistrict = await currentDistrictList(newVal);
      optionsDistrict.value = resDistrict.result;
    }
  },
  { immediate: true }
);

function onSubmit() {
  emits("submit");
}
// console.log(computedFormState.value)
// optionsSemester = res?.result?.data.map((item) => {
//   return { id: item.id, name: item.semester + "-" + t("semester") };
// });
</script>

<template>
  <a-form @finish="onSubmit" :model="computedFormState">
    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Education_information") }}
      </h5>
      <div class="col-md-4 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Structure_Faculty")
        }}</label>
        <a-select class="form--item" :value="deanId" disabled>
        </a-select>
        <span v-if="errors.faculty_id" class="text-danger small">
          {{ errors.faculty_id[0] }}
        </span>
      </div>
      <div class="col-md-8 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("by_Specialty")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.specialty_id"
          :options="optionsSpeciality" :field-names="{ value: 'id', label: 'name' }"
          @change="emits('clearError', 'specialty_id')" :placeholder="t('select__specialty')">
        </a-select>
        <span v-if="errors.specialty_id" class="text-danger small">
          {{ errors.specialty_id[0] }}
        </span>
      </div>
      <div class="col-md-4 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Admission_date")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.date_start"
          :options="optriosAcademicYear" :field-names="{ value: 'year', label: 'year' }"
          @change="emits('clearError', 'academic_year_id')">
        </a-select>
        <span v-if="errors.date_start" class="text-danger small">
          {{ errors.date_start[0] }}
        </span>
      </div>
      <div class="col-md-4 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Payment_Form")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.payment_type_id" :options="optionsPaymentTypes"
          :field-names="{ value: 'id', label: 'name' }">
          <!-- @change="emits('clearError', 'payment_type_id')" -->
        </a-select>
      </div>
      <div class="mb-3 col-md-4">
        <label for="division-name-select" class="form-label">{{
          $t("Decree_Enroll")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.acceptance_id"
          :options="optionsCommand" :field-names="{ value: 'id', label: 'name' }">
        </a-select>
      </div>
      <div v-if="computedFormState.academic_group_id" class="col-md-4 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Group")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.academic_group_id" :options="optionsAcademicGroup"
          :field-names="{ value: 'id', label: 'name' }" disabled>
        </a-select>
      </div>
      <div v-if="computedFormState.academic_group_id" class="col-md-4 mb-3">
        <label for="division-name-select" class="form-label">{{ $t("Semester_Name") }} / {{ $t("by_Level") }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.semester_id"
          :options="optionsSemester" :field-names="{ value: 'id', label: 'name' }" disabled>
        </a-select>
      </div>
      <div v-if="computedFormState.academic_group_id" class="col-md-4 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Education_Year_Name")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.academic_year_id" :options="optriosAcademicYear"
          :field-names="{ value: 'id', label: 'name' }" disabled>
        </a-select>
        <!-- {{ computedFormState }}{{ optriosAcademicYear }} -->
      </div>
    </div>
    <!-- ---------------------------------------- -->
    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Passport_Information") }}
      </h5>
      <div class="col-md-3">
        <div class="mb-3">
          <label for="division-name-select" class="form-label">{{
            $t("Citizenship")
          }}</label>
          <a-select :filter-option="helpers.filterOptionByName" show-search
            v-model:value="computedFormState.citizenship_id" :options="optionsCitizenship"
            :field-names="{ value: 'id', label: 'name' }">
          </a-select>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Passport_Date")
        }}</label>
        <a-date-picker v-model:value="computedFormState.passport_issue_date" value-format="YYYY-MM-DD"
          :placeholder="$t('YYYY_MM_DD')" @change="emits('clearError', 'passport_issue_date')" />
        <span v-if="errors.passport_issue_date" class="text-danger small">
          {{ errors.passport_issue_date[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Passport_Pin")
        }}</label>
        <a-input v-model:value="computedFormState.pinfl" @change="emits('clearError', 'pinfl')" type="text"
          :maxlength="max" v-maska="{
            mask: '00000000000000',
            tokens: {
              0: { pattern: /[0-9]/ },
            },
          }" />
        <span v-if="errors.pinfl" class="text-danger small">
          {{ errors.pinfl[0] }}
        </span>
        <span v-if="computedFormState.pinfl != null">
          <span v-if="computedFormState.pinfl.length != 14" class="text-danger small">
            {{ $t("Enter_the_14_digit_JSHSHIR_code") }}
          </span>
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Passport_Number")
        }}</label>
        <a-input v-model:value="computedFormState.passport" @change="emits('clearError', 'passport')" v-maska="{
          mask: 'AA0000000',
          tokens: {
            A: { pattern: /[А-ЯA-Zа-яa-z]/, uppercase: true },
            0: { pattern: /[0-9]/ },
          },
        }" placeholder="AB1234567" />
        <span v-if="errors.passport" class="text-danger small">
          {{ errors.passport[0] }}
        </span>
      </div>
    </div>
    <!-- -------------------------------------------------- -->
    <div class="row">
      <div class="col-xl-2 d-flex justify-content-center align-items-center">
        <AvatarInput :img-url="computedFormState.image" @input="computedFormState.image = $event" />
      </div>
      <div class="col-xl-10">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="division-name-input" class="form-label">{{
              $t("Second_Name")
            }}</label>
            <a-input v-model:value="computedFormState.surname" @change="emits('clearError', 'surname')" />
            <span v-if="errors.surname" class="text-danger small">
              {{ errors.surname[0] }}
            </span>
          </div>
          <div class="col-md-4 mb-3">
            <label for="division-name-input" class="form-label">{{
              $t("First_Name")
            }}</label>
            <a-input v-model:value="computedFormState.name" @change="emits('clearError', 'name')" />
            <span v-if="errors.name" class="text-danger small">
              {{ errors.name[0] }}
            </span>
          </div>
          <div class="col-md-4 mb-3">
            <label for="division-name-input" class="form-label">{{
              $t("Third_Name")
            }}</label>
            <a-input v-model:value="computedFormState.last_name" @change="emits('clearError', 'last_name')" />
            <span v-if="errors.last_name" class="text-danger small">
              {{ errors.last_name[0] }}
            </span>
          </div>
          <div class="col-md-4 mb-3" name="birthDate">
            <label for="division-name-input" class="form-label">{{
              $t("birth_Date")
            }}</label>
            <a-date-picker v-model:value="computedFormState.birthdate" value-format="YYYY-MM-DD"
              :placeholder="$t('YYYY_MM_DD')" @change="emits('clearError', 'birthdate')" />
            <span v-if="errors.birthdate" class="text-danger small">
              {{ errors.birthdate[0] }}
            </span>
          </div>
          <div class="col-md-4 mb-3">
            <label for="division-name-select" class="form-label">{{
              $t("Gender")
            }}</label>
            <a-select v-model:value="computedFormState.gender" @change="emits('clearError', 'gender')">
              <a-select value="male" label="male">{{
                $t("Male")
              }}</a-select>
              <a-select value="female" label="fimale">{{
                $t("Female")
              }}</a-select>
            </a-select>
            <span v-if="errors.gender" class="text-danger small">
              {{ errors.gender[0] }}
            </span>
          </div>
          <div class="col-md-4 mb-3">
            <label for="division-name-select" class="form-label">{{
              $t("by_Nation")
            }}</label>
            <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.nation_id"
              :options="optionsNation" :field-names="{ value: 'id', label: 'name' }"
              style="width: 100%; border-radius: 10px !important" @change="emits('clearError', 'nation_id')">
            </a-select>
            <span v-if="errors.nation_id" class="text-danger small">
              {{ errors.nation_id[0] }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------------------------- -->
    <div class="row mt-3">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("additional_information") }}
      </h5>
      <div class="col-md-6 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Social_Category")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.social_category_id" :options="optionsSocialCategories"
          :field-names="{ value: 'id', label: 'name' }" @change="emits('clearError', 'social_category_id')">
        </a-select>
        <span v-if="errors.social_category_id" class="text-danger small">
          {{ errors.social_category_id[0] }}
        </span>
      </div>
      <div class="col-md-6 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Graduate_Type")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.student_category_id" :options="optionsStudentCategories"
          :field-names="{ value: 'id', label: 'name' }" @change="emits('clearError', 'student_category_id')">
        </a-select>
        <span v-if="errors.student_category_id" class="text-danger small">
          {{ errors.student_category_id[0] }}
        </span>
      </div>
    </div>
    <!-- -------------------------------- -->
    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Other") }}
      </h5>
      <div class="mb-3 col-md-4" v-maska="{
        mask: '0000-0000',
        tokens: {
          0: { pattern: /[0-9]/ },
        },
      }">
        <label for="division-name-input" class="form-label">{{
          $t("Graduation_year")
        }}</label>
        <a-input v-model:value="computedFormState.date_end" placeholder="2018-2022"
          @change="emits('clearError', 'date_end')" />
        <span v-if="errors.date_end" class="text-danger small">
          {{ errors.date_end[0] }}
        </span>
      </div>

      <div class="mb-3 col-md-4" name="previousEducationSeriaDocument">
        <label for="division-name-input" class="form-label">{{
          $t("Document_series")
        }}</label>
        <a-input v-model:value="computedFormState.document_seria" @change="emits('clearError', 'document_seria')" />
        <span v-if="errors.document_seria" class="text-danger small">
          {{ errors.document_seria[0] }}
        </span>
      </div>

      <div class="mb-3 col-md-4" name="previousEducationNumberDocument">
        <label for="division-name-input" class="form-label">{{
          $t("Document_number")
        }}</label>
        <a-input v-model:value="computedFormState.document_number" @change="emits('clearError', 'document_number')" />
        <span v-if="errors.document_number" class="text-danger small">
          {{ errors.document_number[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-4" name="previousEducationName">
        <label for="division-name-input" class="form-label">{{
          $t("The_name_of_the_educational_institution_where_graduated")
        }}
          (UZ) <sup>⚬</sup>
        </label>
        <a-input v-model:value="computedFormState.old_educational_name.uz"
          @change="emits('clearError', ['old_educational_name.uz'])" />
        <span v-if="errors['old_educational_name.uz']" class="text-danger small">
          {{ errors["old_educational_name.uz"][0] }}
        </span>
      </div>
      <div class="mb-3 col-md-4" name="previousEducationName">
        <label for="division-name-input" class="form-label">{{
          $t("The_name_of_the_educational_institution_where_graduated")
        }}
          (RU) <sup>⚬</sup></label>
        <a-input v-model:value="computedFormState.old_educational_name.ru" />
      </div>
      <div class="mb-3 col-md-4" name="previousEducationName">
        <label for="division-name-input" class="form-label">{{
          $t("The_name_of_the_educational_institution_where_graduated")
        }}
          (EN) <sup>⚬</sup></label>
        <a-input v-model:value="computedFormState.old_educational_name.en" />
      </div>
    </div>

    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("address_Information") }}
      </h5>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Country")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.country_id"
          :options="optionsCountry" :field-names="{ value: 'id', label: 'name' }">
        </a-select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Region")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.region_id"
          :options="optionsRegion" :field-names="{ value: 'id', label: 'name' }"
          @change="emits('clearError', 'region_id')" :placeholder="$t('Choose')">
        </a-select>
        <span v-if="errors.region_id" class="text-danger small">
          {{ errors.region_id[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("District")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.district_id"
          :options="optionsDistrictNewDistrict" :field-names="{ value: 'id', label: 'name' }"
          @change="emits('clearError', 'district_id')" :placeholder="$t('Choose')">
        </a-select>
        <span v-if="errors.district_id" class="text-danger small">
          {{ errors.district_id[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Home_Address")
        }}</label>
        <a-input v-model:value="computedFormState.address_home" @change="emits('clearError', 'address_home')" />
        <span v-if="errors.address_home" class="text-danger small">
          {{ errors.address_home[0] }}
        </span>
      </div>
    </div>
    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Current_Address_Information") }}
      </h5>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("accommodation")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.live_place_id"
          :options="optionsLivePlaces" :field-names="{ value: 'id', label: 'name' }">
        </a-select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Current_Province")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="computedFormState.now_region_id"
          :options="optionsRegionCurrent" :field-names="{ value: 'id', label: 'name' }">
        </a-select>
      </div>

      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Current_District")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.now_district_id" :options="optionsDistrict"
          :field-names="{ value: 'id', label: 'name' }">
        </a-select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Current_Address")
        }}</label>
        <a-input v-model:value="computedFormState.now_address" />
        <span v-if="errors.now_address" class="text-danger small">
          {{ errors.now_address[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Roommate_Count")
        }}</label>
        <a-input v-model:value="computedFormState.count_of_people_living" type="number" />
        <span v-if="errors.count_of_people_living" class="text-danger small">
          {{ errors.count_of_people_living[0] }}</span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Student_Roommate_Type")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.category_live_together_id" :options="optionsCategoryLiveTogethers"
          :field-names="{ value: 'id', label: 'name' }" :placeholder="$t('Cohabitation_category')">
        </a-select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-select" class="form-label">{{
          $t("Student_Living_Status")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.residence_place_status" :options="optionsResidencePlaceStatuses"
          :field-names="{ value: 'id', label: 'name' }" :placeholder="$t('Residence_status')">
        </a-select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Geo_Location")
        }}</label>
        <a-input v-model:value="computedFormState.residence_place_location" />
        <span v-if="errors.residence_place_location" class="text-danger small">
          {{ errors.residence_place_location[0] }}</span>
      </div>
      <div class="col-md-3">
        <div class="mb-3">
          <label for="division-name-input" class="form-label">Email</label>
          <a-input v-model:value="computedFormState.email" type="email" />
          <span v-if="errors.email" class="text-danger small">
            {{ errors.email[0] }}</span>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Parent_Phone")
        }}</label>
        <a-input v-model:value="computedFormState.phone_father" placeholder="+998## ###-##-##"
          v-maska="'+998## ###-##-##'" />
        <span v-if="errors.phone_father" class="text-danger small">
          {{ errors.phone_father[0] }}</span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Person_Phone")
        }}</label>
        <a-input v-model:value="computedFormState.phone_person" placeholder="+998## ###-##-##"
          v-maska="'+998## ###-##-##'" />
        <span v-if="errors.phone_person" class="text-danger small">
          {{ errors.phone_person[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Student_Phone")
        }}</label>
        <a-input v-model:value="computedFormState.phone" placeholder="+998## ###-##-##" v-maska="'+998## ###-##-##'" />
        <span v-if="errors.phone" class="text-danger small">
          {{ errors.phone[0] }}
        </span>
      </div>
    </div>

    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Information_about_parents") }}
      </h5>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Father")
        }}</label>
        <a-input v-model:value="computedFormState.fio_father" />
        <span v-if="errors.fio_father" class="text-danger small">
          {{ errors.fio_father[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Mother")
        }}</label>
        <a-input v-model:value="computedFormState.fio_mother" />
        <span v-if="errors.fio_mother" class="text-danger small">
          {{ errors.fio_mother[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Residence_address_of_father")
        }}</label>
        <a-input v-model:value="computedFormState.address_father" />
        <span v-if="errors.address_father" class="text-danger small">
          {{ errors.address_father[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Mothers_residential_address")
        }}</label>
        <a-input v-model:value="computedFormState.address_mother" />
        <span v-if="errors.address_mother" class="text-danger small">
          {{ errors.address_mother[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{ $t("Father_phone") }} (+998 xx --)</label>
        <a-input v-model:value="computedFormState.phone_father" placeholder="+998## ###-##-##"
          v-maska="'+998## ###-##-##'" />
        <span v-if="errors.phone_father" class="text-danger small">
          {{ errors.phone_father[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{ $t("Mother_phone") }}(+998 xx --)</label>
        <a-input v-model:value="computedFormState.phone_mother" placeholder="+998## ###-##-##"
          v-maska="'+998## ###-##-##'" />
        <span v-if="errors.phone_mother" class="text-danger small">
          {{ errors.phone_mother[0] }}
        </span>
      </div>

      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("fathers_workplace")
        }}</label>
        <a-input v-model:value="computedFormState.workplace_father" />
        <span v-if="errors.address_father" class="text-danger small">
          {{ errors.address_father[0] }}
        </span>
      </div>
      <div class="col-md-3 mb-3">
        <label for="division-name-input" class="form-label">{{
          $t("Mothers_workplace")
        }}</label>
        <a-input v-model:value="computedFormState.workplace_mother" />
        <span v-if="errors.address_mother" class="text-danger small">
          {{ errors.address_mother[0] }}
        </span>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-2">
      <SubmitButton :loading="isLoading" :icon="'content-save'" />
    </div>
  </a-form>
</template>

<style scoped></style>
