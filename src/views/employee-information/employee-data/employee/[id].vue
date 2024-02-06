<script setup lang="ts">
  import { ref, reactive, watchEffect } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  import Swal from "sweetalert2";
  import { fetchEmployeeByID } from "@/utils/api/employee";
  import AvatarInput from "@/components/AvatarInput.vue";
  import EmployeeFormModal from "@/components/modals/EmployeeFormModal.vue";
  import type { EmployeeInterface } from "@/utils/interfaces";
  import EmployeeInfoCard from "@/components/cards/EmployeeInfoCard.vue";
  import ChangeAccountFormCard from "@/components/cards/ChangeAccountFormCard.vue";
  import EmployeeConnectCard from "@/components/cards/EmployeeConnectCard.vue";
  import { Modal } from "bootstrap";

  //actions delete
  function deleteAction() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success ml-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Aminmisiz?",
        text: "Siz buni qaytara olmaysiz!",
        icon: "warning",
        confirmButtonText: "Ha, o'chirish!",
        cancelButtonText: "Yo'q, bekor qilish!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "O'chirildi!",
            "Xabarni o'chirish muvaffaqiyatli amalga oshirildi!",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Bekor qilindi",
            "Xabarni o'chirish bekor qilindi :)",
            "error"
          );
        }
      });
  }

  //xodim ma'lumotlari
  const tablEemployeeInfo = [
    {
      id: 1,
      imageEmployee: "00100000001",
      employeeIdNumber: 3542112036,
      fristName: "SAYYORA",
      secondName: "ABDALOVA",
      thirdName: "KOMILOVNA",
      birthDate: "12-23-1969",
      passpostNumber: "AA1234567",
      pin: 12345678901234,
      specialty: "Fizika",
      academicRank: "Unvonsiz",
      academicDegree: "Fan nomzodi, PhD",
      role: "O'qituvchi",
      createdAt: "10.02.2021 14:45:32",
      updatedAt: "19.03.2022 15:45:32",
    },
  ];

  //xodim ishlari
  const tableDepartmentEmployee = [
    {
      id: 1,
      department: "Umumiy pedagogika",
      employmentStaff: "1,00 stavka",
      position: "Dotsent",
      employeeStatus: "Ishlamoqda",
    },
    {
      id: 2,
      department: "Umumiy pedagogika",
      employmentStaff: "0,25 stavka",
      position: "Dotsent",
      employeeStatus: "Bo‘shagan",
    },
    {
      id: 3,
      department: "Qo'shma ta'lim",
      employmentStaff: "0,25 stavka",
      position: "Stajer-o‘qituvchi",
      employeeStatus: "Bo‘shagan",
    },
  ];

  //tizim ro'llari
  const userRoles = [
    {
      id: 1,
      rolName: "Moliya-nazorat",
      rolKod: "finance_control",
    },
    {
      id: 2,
      rolName: "Buxgalteriya",
      rolKod: "accounting",
    },
    {
      id: 3,
      rolName: "Yotoqxona",
      rolKod: "	dormitory",
    },
    {
      id: 4,
      rolName: "Super Administrator",
      rolKod: "super_admin",
    },
    {
      id: 5,
      rolName: "Ilmiy bo'lim",
      rolKod: "science",
    },
    {
      id: 6,
      rolName: "Doktorantura bo'limi",
      rolKod: "doctorate",
    },
    {
      id: 7,
      rolName: "Tyutor",
      rolKod: "tutor",
    },
    {
      id: 8,
      rolName: "Dekan",
      rolKod: "dean",
    },
    {
      id: 9,
      rolName: "Kafedra mudiri",
      rolKod: "department",
    },
    {
      id: 10,
      rolName: "O'qituvchi",
      rolKod: "teacher",
    },
    {
      id: 11,
      rolName: "O'quv bo'limi",
      rolKod: "academic_board",
    },
    {
      id: 12,
      rolName: "Marketing",
      rolKod: "marketing",
    },
    {
      id: 13,
      rolName: "Kutubxona",
      rolKod: "librarian",
    },
    {
      id: 14,
      rolName: "Kadrlar bo'limi",
      rolKod: "staff",
    },
    {
      id: 15,
      rolName: "Rahbariyat",
      rolKod: "direction",
    },
  ];

  // millat
  const optionsNation = ref([
    { value: "O'zbek" },
    { value: "Rus" },
    { value: "Qozoq" },
    { value: "Tojik" },
    { value: "Turkman" },
  ]);

  //xodim
  const optionsEmployee = ref([
    { value: "ABDULLAYEV ORTIQ MEHRIDDINOVICH" },
    { value: "ABDUQODIROV BOBURJON ABDUXALILOVICH" },
    { value: "ABDURAHIMOV ASADBEK ABDUHALIM O‘G‘LI" },
    { value: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI" },
    { value: "ABDURAXIMOV NURXO‘JA ABDURASIL O‘G‘LI" },
  ]);

  //lavozim
  const optionsPosition = ref([
    { value: "Tyutor" },
    { value: "Dispetcher" },
    { value: "Dekan muovini" },
    { value: "Kabinet mudiri" },
    { value: "Uslubchi" },
  ]);

  //kafedra / bo'lim
  const optionsDepartment = ref([
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Buxgalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "O'quv uslubiy boshqarma" },
  ]);

  //xodim turi
  const optionsEmployeeType = ref([
    { value: "Boshqa" },
    { value: "Adminstariv-boshqaruv xodimi" },
    { value: "O'quv-yordamchi va texnik xodim" },
    { value: "Xizmat ko'rsatuvchi xodim" },
  ]);

  //mexnat shakli
  const optionsCocktailForm = ref([
    { value: "Asosiy ish joyi" },
    { value: "O'rindoshlik (tashqi)" },
    { value: "Soatbay" },
    { value: "O'rindoshlik (ichki-qo'shimcha)" },
    { value: "O'rindoshlik (ichki-asosiy)" },
  ]);

  //stavka
  const optionsRate = ref([
    { value: "1,00 stavka" },
    { value: "0,75 stavka" },
    { value: "0,50 stavka" },
    { value: "0,25 stavka" },
  ]);

  //bo'lim filter
  const optionsSection = ref([
    { value: "Axborot resurs markazi" },
    { value: "Boshlang'ich ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Bugalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "Pedagogika" },
  ]);

  //o'qituvchi
  const optionsTeacher = ref([
    { value: "ABDULLAYEV ORTIQ MEHRIDDINOVICH" },
    { value: "ABDUQODIROV BOBURJON ABDUXALILOVICH" },
    { value: "ABDURAHIMOV ASADBEK ABDUHALIM O‘G‘LI" },
    { value: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI" },
    { value: "ABDURAXIMOV NURXO‘JA ABDURASIL O‘G‘LI" },
  ]);

  //lavozim
  const optionsPositionTecher = ref([
    { value: "Katta o'qituvchi" },
    { value: "Dotsent" },
    { value: "Professor" },
    { value: "Kafedra mudiri" },
    { value: "Stajwer-o'qituvchi" },
    { value: "Assistent" },
  ]);

  //o'qituvchi turi
  const optionsTeacherType = ref([
    { value: "Boshqa" },
    { value: "Professior-o'qituvchi xodim" },
    { value: "O'qituvchi" },
    { value: "Mutaxasis" },
  ]);

  //til
  const optionsLanguage = ref([{ value: "O'zbekcha" }, { value: "Yana...." }]);

  //-------------ILMIY DARAJASI----------------
  const optionsAcademicDegree = ref([
    { value: "Darajasiz" },
    { value: "Fan nomzodi, PhD" },
    { value: "Fan doktori, DSc" },
  ]);

  // ------------------------------------------

  //--------------ILMIY UNVONI-----------------
  const optionsAcademicTitle = ref([
    { value: "Unvonsiz" },
    { value: "Dotsent" },
    { value: "Katta ilmiy xodim" },
    { value: "Professor" },
  ]);

  //-----------------------------------------

  //---------------YIL-----------------------
  const optionsYear = ref([
    { value: "2019" },
    { value: "2020" },
    { value: "2021" },
    { value: "2022" },
  ]);
  const optionsCitizenship = ref([
    { value: "O'zbekiston Respublikasi fuqarosi" },
    { value: "Xorijiy davlat fuqarosi" },
    { value: "Fuqaroligi yo'q shaxslar" },
  ]);

  //akkaunt xolati
  const employeeSatatus = ref([
    { value: "Ochiq" },
    { value: "Yopiq" },
    { value: "Bloklangan" },
  ]);

  //jinsi
  const optionsGender = ref([{ value: "Erkak" }, { value: "Ayol" }]);

  // tumanlar
  const optionsDistrict = ref([
    { value: "Parkent tumani" },
    { value: "Yuqori chirchiq tumani" },
    { value: "Yangiyo'l tumani" },
    { value: "Olamzor tumani" },
    { value: "Chilonzor tumani" },
  ]);

  // viloyat
  const optionsProvince = ref([
    { value: "Toshkent viloyati" },
    { value: "Andijon viloyati" },
    { value: "Buxoro viloyati" },
    { value: "Xorazim viloyati" },
    { value: "Qashqadaryo viloyati" },
  ]);

  // davlat
  const optionsState = ref([
    { value: "O'zbekiston" },
    { value: "Tojikiston" },
    { value: "Qozog'iston" },
    { value: "Rassiya" },
    { value: "Fransiya" },
  ]);

  function handleChange() {
    //
  }

  // new
  const route = useRoute();
  const paramsID = route.params?.id ?? null;
  const selectedCitizenship = ref(null);
  const otmCallInput = ref(null);
  const employeeData: EmployeeInterface = reactive({});

  watchEffect(async () => {
    if (paramsID) {
      const res = await fetchEmployeeByID(paramsID);
      Object.assign(employeeData, res.data);
    }
  });

  function openEmployeeFormModal() {
    const modal = Modal.getOrCreateInstance("#employeeFormModal");
    modal.show();
  }
</script>

<template>
  <div class="employeeMy">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <RouterLink to="/employee-information/employee-data/"
              >{{ $t("Employees_base") }} /
            </RouterLink>
            {{
              employeeData.surname +
              " " +
              employeeData.name +
              " " +
              employeeData.patronymic
            }}
          </h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              @click="openEmployeeFormModal"
            >
              <i class="mdi mdi-pen-to-square me-2"></i>
              {{ $t("Edit") }}
            </button>
            <RouterLink to="/employee-information/employee-data/"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left me-2"></i>
                {{ $t("Back") }}
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <!-- -----------------start tab xodim ------------------------ -->
    <div class="card">
      <!-- Nav tabs -->
      <div class="card-message">
        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              data-bs-toggle="tab"
              href="#about"
              role="tab"
            >
              <i class="mdi mdi-user me-2"></i
              ><span class="icon-text-none">{{ $t("Employee_info") }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#sent" role="tab">
              <i class="mdi mdi-user-pen me-2"></i
              ><span class="icon-text-none">
                {{ $t("Change_account") }}
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="tab"
              href="#messages-draft"
              role="tab"
            >
              <i class="mdi mdi-plus me-2"></i
              ><span class="icon-text-none">{{$t('apply_Decree')}}</span>
            </a>
          </li>
        </ul>
      </div>
      <h4 class="text-center my-3" style="color: #666">
        <b>{{
          employeeData.surname +
          " " +
          employeeData.name +
          " " +
          employeeData.patronymic
        }}</b>
      </h4>
    </div>
    <!-- Tab content kiruvchi xabarlar -->
    <div class="tab-content">
      <!-- ------------------start xodim ma'lumotlari----------------------- -->
      <div class="tab-pane active" id="about" role="tabpanel">
        <EmployeeInfoCard :employee-data="employeeData" />
      </div>

      <!-- -----------------------accauntni o'zgartirish---------------------------- -->
      <div class="tab-pane" id="sent" role="tabpanel">
        <ChangeAccountFormCard :employee-data="employeeData" />
      </div>
      <!-- -----------------accauntni o'zgartirish------------------------------- -->

      <!-- ------------------Start-Biriktirish---------------- -->
      <div class="tab-pane" id="messages-draft" role="tabpanel">
        <EmployeeConnectCard :employee-data="employeeData" />
      </div>

      <!-- --------------end-biriktirish---------------- -->
    </div>
    <!-- -------------------end-tab-xodim------------------------- -->

    <!-------START MODAL---------------------------------------->
    <EmployeeFormModal :form-data="employeeData" />
    <!-------END MODAL---------------------------------------->
  </div>
</template>

<style lang="scss">
  

  .employeeMy {
    .table-row-employee-department {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 35px auto 110px 120px 110px;
      td,
      th {
        &:nth-last-child(1) {
          justify-content: start;
        }
      }
    }
    .table-row-infoEmployee {
      widows: 100% !important;
      display: grid;
      grid-gap: 0;
      grid-template-columns: 200px auto !important;
      @include mobile() {
        grid-template-columns: 140px auto !important;
      }
    }
    .modal-dialog {
      max-width: $ipad_pro !important;
    }
    .card-message {
      background-color: #208b3a;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      .active {
        background-color: #fff;
        color: #222222;
      }
      .nav-link {
        color: #fff;
      }
    }
    .nav-tabs-custom .nav-item .nav-link.active {
      color: #222;
      background: #fff;
    }
    .table-row-user-roles {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 180px auto 70px;
      th,
      td {
        &:nth-child(1) {
          justify-content: start;
        }
      }
    }
    .tab-department-division {
      background-color: #208b3a;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      .nav-link {
        color: #ffffff;
      }
      .nav-tabs-custom {
        color: #fff;
        .nav-item .nav-link.active {
          color: #000000;
          background-color: #fff;
          &::after {
            background: #fff;
          }
        }
      }
    }
    .modal-data-tip {
      background-color: #dee2e6;
      padding: 10px 10px;
    }
  }

  .ant-select {
    width: 100%;
    border-radius: 10px !important;
  }
</style>
