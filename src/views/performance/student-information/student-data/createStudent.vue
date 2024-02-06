<template>
  <div pagetitle="`Talabalar kontengenti`" class="createStudentPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/student/student">
              Talabalar bazasi /
            </router-link>
            Talaba yaratish
          </h5>
          <div class="panel-toggles">
            <router-link to="/student/student"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <a-form
          :model="formCreateStudent"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="row">
            <h5 class="modal-title modal-data-tip mb-2">{{ $t("Education_information") }}</h5>
            <div class="col-md-4">
              <a-form-item
                class="mb-3"
                name="nameFaculty"
                :rules="[
                  {
                    required: true,
                    message: `Fakultet bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >{{ $t("Structure_Faculty") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.nameFaculty"
                  :options="allDate.optionsFaculty"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  placeholder="Fakultetni tanlang"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-8">
              <a-form-item
                class="mb-3"
                name="nameSpecial"
                :rules="[
                  {
                    required: true,
                    message: `Mutaxassislik bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >{{ $t("by_Specialty") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.nameSpecial"
                  :options="allDate.optionsSpecial"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  :placeholder="t('select__specialty')"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-4">
              <a-form-item class="mb-3" name="yearOfEnter">
                <label for="division-name-select" class="form-label"
                  >O'qishga kirgan yili</label
                >
                <a-select
                  v-model:value="formCreateStudent.yearOfEnter"
                  :options="allDate.optionsYear"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-4">
              <a-form-item class="mb-3" name="paymentForm">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Payment_Form") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.paymentForm"
                  :options="allDate.optionsPaymentForm"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-4">
              <a-form-item
                class="mb-3"
                name="admissionOrder"
                :rules="[
                  {
                    required: true,
                    message: `Qabul buyrug'i bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >{{ $t("Decree_Enroll") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.admissionOrder"
                  :options="allDate.optionsAdmissionOrder"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  placeholder="Qabul buyrug'ini kiriting"
                >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <!-- ---------------------------------------- -->
          <div class="row">
            <h5 class="modal-title modal-data-tip mb-2">{{ $t("Passport_Information") }}</h5>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="citizenship">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Citizenship") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.citizenship"
                  :options="allDate.optionsCitizenship"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Passport_Date") }}</label
                >
                <a-form-item
                  name="passportIssueDate"
                  :rules="[
                    {
                      required: true,
                      message: `Passport berilgan sana bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                  v-bind="config"
                >
                  <a-date-picker
                    placeholder="DD-MM-YYYY"
                    v-model:value="formCreateStudent.passportIssueDate"
                    type="date"
                    format="DD-MM-YYYY"
                  />
                </a-form-item>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item
                class="mb-3"
                autoLink
                name="PIN"
                :rules="[
                  {
                    required: true,
                    message: `JSHSHIR-KOD bo'sh bolishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >{{ $t("Passport_Pin") }}</label
                >
                <a-input
                  v-model:value="formCreateStudent.PIN"
                  v-maska="{
                    mask: '00000000000000',
                    tokens: {
                      0: { pattern: /[0-9]/ },
                    },
                  }"
                />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item
                class="mb-3"
                name="passportNumber"
                :rules="[
                  {
                    required: true,
                    message: `Pasport raqami bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >{{ $t("Passport_Number") }}</label
                >
                <a-input
                  v-model:value="formCreateStudent.passportNumber"
                  v-maska="{
                    mask: 'AA0000000',
                    tokens: {
                      A: { pattern: /[А-ЯA-Zа-яa-z]/, uppercase: true },
                      0: { pattern: /[0-9]/ },
                    },
                  }"
                />
              </a-form-item>
            </div>
          </div>
          <!-- -------------------------------------------------- -->
          <div class="row">
            <div class="col-xl-2">
              <AvatarInput @fileChanged="onChangeAvatar" />
            </div>
            <div class="col-xl-10">
              <div class="row">
                <div class="col-md-4">
                  <a-form-item
                    class="mb-3"
                    name="secondName"
                    :rules="[
                      {
                        required: true,
                        message: `Familiya bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-input" class="form-label"
                     >{{ $t("Second_Name") }}</label
                    >
                    <a-input v-model:value="formCreateStudent.secondName" />
                  </a-form-item>
                </div>
                <div class="col-md-4">
                  <a-form-item
                    class="mb-3"
                    name="firstName"
                    :rules="[
                      {
                        required: true,
                        message: `Ismi bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-input" class="form-label"
                      >Ismi</label
                    >
                    <a-input v-model:value="formCreateStudent.firstName" />
                  </a-form-item>
                </div>
                <div class="col-md-4">
                  <a-form-item
                    class="mb-3"
                    name="thirdName"
                    :rules="[
                      {
                        required: true,
                        message: `Otasining ismi bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-input" class="form-label"
                      >Otasining ismi</label
                    >
                    <a-input v-model:value="formCreateStudent.thirdName" />
                  </a-form-item>
                </div>
                <div class="col-md-4">
                  <a-form-item class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >{{ $t("Date_of_birth") }}</label
                    >
                    <a-form-item
                      name="birthDate"
                      :rules="[
                        {
                          required: true,
                          message: `Tug'ulgan sana bo'sh bo'lishi mumkin emas!`,
                        },
                      ]"
                      v-bind="config"
                    >
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="formCreateStudent.birthDate"
                        type="date"
                        value-format="YYYY-MM-DD"
                      />
                    </a-form-item>
                  </a-form-item>
                </div>
                <div class="col-md-4">
                  <a-form-item
                    class="mb-3"
                    name="gender"
                    :rules="[
                      {
                        required: true,
                        message: `Jinsi bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >{{ $t("Gender") }}</label
                    >
                    <a-select
                      v-model:value="formCreateStudent.gender"
                      :options="allDate.optionsGender"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-md-4">
                  <a-form-item
                    class="mb-3"
                    name="nationality"
                    :rules="[
                      {
                        required: true,
                        message: `Millati bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >{{ $t("by_Nation") }}</label
                    >
                    <a-select
                      v-model:value="formCreateStudent.nationality"
                      :options="allDate.optionsNationality"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>
          <!-- -------------------------------- -->
          <div class="row">
            <h5 class="modal-title modal-data-tip mb-2">
              {{ $t("additional_information") }}
            </h5>
            <div class="col-md-6">
              <a-form-item class="mb-3" name="socialCategory">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Social_Category") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.socialCategory"
                  :options="allDate.optionsSocialCategory"
                  show-search
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-6">
              <a-form-item class="mb-3" name="studentType">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Student_Type") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.studentType"
                  :options="allDate.optionsStudentType"
                  show-search
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <!-- -------------------------------- -->
          <div class="row">
            <h5 class="modal-title modal-data-tip mb-2">
              {{ $t("Other") }}
            </h5>
            <div class="col-md-2">
              <a-form-item
                class="mb-3"
                name="previousEducationYear"
                v-maska="{
                  mask: '0000-0000',
                  tokens: {
                    0: { pattern: /[0-9]/ },
                  },
                }"
                :rules="[
                  {
                    required: true,
                    message: `Bitirgan yili bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >Bitirgan yili</label
                >
                <a-input
                  v-model:value="formCreateStudent.previousEducationYear"
                  placeholder="2012-2021"
                />
              </a-form-item>
            </div>

            <div class="col-md-4">
              <a-form-item
                class="mb-3"
                name="previousEducationName"
                :rules="[
                  {
                    required: true,
                    message: `Bitirgan ta’lim muassasasi nomi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >Bitirgan ta’lim muassasasi nomi</label
                >
                <a-input
                  v-model:value="formCreateStudent.previousEducationName"
                />
              </a-form-item>
            </div>

            <div class="col-md-2">
              <a-form-item
                class="mb-3"
                name="previousEducationSeriaDocument"
                :rules="[
                  {
                    required: true,
                    message: `Xujjat seriyasi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >Xujjat seriyasi</label
                >
                <a-input
                  v-model:value="
                    formCreateStudent.previousEducationSeriaDocument
                  "
                />
              </a-form-item>
            </div>

            <div class="col-md-4">
              <a-form-item
                class="mb-3"
                name="previousEducationNumberDocument"
                :rules="[
                  {
                    required: true,
                    message: `Xujjat raqami bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >Xujjat raqami</label
                >
                <a-input
                  v-model:value="
                    formCreateStudent.previousEducationNumberDocument
                  "
                />
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <h5 class="modal-title modal-data-tip mb-2">
              {{ $t("address_Information") }}
            </h5>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="country">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Country") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.country"
                  :options="allDate.optionsCountry"
                  show-search
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="province">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Province") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.province"
                  :options="allDate.optionsProvince"
                  show-search
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item
                class="mb-3"
                name="district"
                :rules="[
                  {
                    required: true,
                    message: `Tuman bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >{{ $t("District") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.district"
                  :options="allDate.optionsDistrict"
                  show-search
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item
                class="mb-3"
                name="homeAddress"
                :rules="[
                  {
                    required: true,
                    message: `Uy manzili bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-input" class="form-label"
                  >{{ $t("Home_Address") }}</label
                >
                <a-input v-model:value="formCreateStudent.homeAddress" />
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <h5 class="modal-title modal-data-tip mb-2">
              {{ $t("Current_Address_Information") }}<
            </h5>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="accommodation">
                <label for="division-name-select" class="form-label"
                  >{{ $t("accommodation") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.accommodation"
                  :options="allDate.optionsAccommodation"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <div class="mb-3" name="currentProvince">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Current_Province") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.currentProvince"
                  :options="allDate.optionsProvince"
                  show-search
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </div>
            </div>

            <div class="col-md-3">
              <a-form-item class="mb-3" name="currentDistrict">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Current_District") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.currentDistrict"
                  :options="allDate.optionsDistrict"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="currentAddress">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Temporary_address") }}</label
                >
                <a-input v-model:value="formCreateStudent.currentAddress" />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="roommateCount">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Roommate_Count") }}</label
                >
                <a-input
                  v-model:value="formCreateStudent.roommateCount"
                  type="number"
                />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="studentRoommateType">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Student_Roommate_Type") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.studentRoommateType"
                  :options="allDate.optionsStudentRoommateType"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="livingPlaceStatus">
                <label for="division-name-select" class="form-label"
                  >{{ $t("Student_Living_Status") }}</label
                >
                <a-select
                  v-model:value="formCreateStudent.livingPlaceStatus"
                  :options="allDate.optionsLivingPlaceStatus"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="geoLocation">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Geo_Location") }}</label
                >
                <a-input v-model:value="formCreateStudent.geoLocation" />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="email">
                <label for="division-name-input" class="form-label"
                  >Email</label
                >
                <a-input v-model:value="formCreateStudent.email" />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="studentPhone">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Parent_Phone") }}</label
                >
                <a-input
                  v-model:value="formCreateStudent.studentPhone"
                  placeholder="+998## ###-##-##"
                  v-maska="'+998## ###-##-##'"
                />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="parentIsPhone">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Person_Phone") }}</label
                >
                <a-input
                  v-model:value="formCreateStudent.parentIsPhone"
                  placeholder="+998## ###-##-##"
                  v-maska="'+998## ###-##-##'"
                />
              </a-form-item>
            </div>
            <div class="col-md-3">
              <a-form-item class="mb-3" name="personPhone">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Student_Phone") }}</label
                >
                <a-input
                  v-model:value="formCreateStudent.personPhone"
                  placeholder="+998## ###-##-##"
                  v-maska="'+998## ###-##-##'"
                />
              </a-form-item>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button class="btns c-delete me-1"> <i class="mdi mdi-trash-can font-size-14 align-middle me-1"></i>{{ $t("Remove") }}</button>
            <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>

import { reactive } from "vue";
// import AvatarInput from "../../../../components/avatarInput";
// import { allDate } from "../../data";

export default {
  setup() {
    //validation
    const formCreateStudent = reactive({
      avatar: undefined,
      nameFaculty: undefined,
      nameSpecial: undefined,
      yearOfEnter: allDate.optionsYear[0],
      paymentForm: allDate.optionsPaymentForm[0],
      admissionOrder: undefined,
      citizenship: allDate.optionsCitizenship[0],
      passportIssueDate: undefined,
      PIN: "",
      passportNumber: "",
      secondName: "",
      firstName: "",
      thirdName: "",
      birthDate: undefined,
      gender: undefined,
      nationality: undefined,
      socialCategory: allDate.optionsSocialCategory[0],
      studentType: allDate.optionsStudentType[0],
      previousEducationYear: "",
      previousEducationName: "",
      previousEducationSeriaDocument: "",
      previousEducationNumberDocument: "",
      country: allDate.optionsCountry[0],
      province: allDate.optionsProvince[0],
      district: undefined,
      homeAddress: "",
      accommodation: allDate.optionsAccommodation[0],
      currentProvince: allDate.optionsProvince[0],
      currentDistrict: undefined,
      currentAddress: undefined,
      roommateCount: "",
      studentRoommateType: undefined,
      livingPlaceStatus: undefined,
      geoLocation: "",
      email: "",
      studentPhone: "",
      parentIsPhone: "",
      personPhone: "",
    });
    const onFinish = (values) => {
      console.log("Success:", { ...values, avatar: formCreateStudent.avatar });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", {
        ...errorInfo,
        values: {
          ...errorInfo.values,
          avatar: formCreateStudent.avatar,
        },
      });
    };

    // --------------form-------------------------
    return {
      formCreateStudent,
      onFinish,
      onFinishFailed,
      allDate: allDate,
      //--------------------------
    };
  },
  components: {
    
    AvatarInput,
  },
  methods: {
    onChangeAvatar(file) {
      console.log(file, "LLLLLLLL");
      this.formCreateStudent.avatar = file;
      console.log(this.formCreateStudent.avatar, "ddddddd");
    },
  },
};
</script>

<style lang="scss">
.createStudentPage {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
</style>