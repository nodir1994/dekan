<script setup lang="ts">
  import { ref, reactive } from "vue";
  import Swal from "sweetalert2";

  //select date
  const formState1 = reactive({});
  const formState2 = reactive({});
  // ------------delete modal oyna--------------------
  function cancel() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ml-2",
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
        }
      });
  }

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
  //kafedra / bo'lim
  const optionsDepartment = ref([
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Tarix" },
    { value: "Tasviriy sanat" },
    { value: "Umumiy pedagogika" },
  ]);
  //o'qituvchi turi
  const optionsTeacherType = ref([
    { value: "Boshqa" },
    { value: "Professior-o'qituvchi xodim" },
    { value: "O'qituvchi" },
    { value: "Mutaxasis" },
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
  //jadval xodim
  const objTeachers = [
    {
      id: 1,
      name: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      department: "Umumiy pedagogika",
      position: "Dotsent",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 2,
      name: "SOBIROVA SAIDA RAVSHANBEKOVNA",
      department: "Geografiya",
      position: "Stajer-o‘qituvchi",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 3,
      name: "TADJIBAYEV IKRAM URALBAYEVICH",
      department: "Fakultetlar'aro jismoniy tarbiya",
      position: "Kafedra mudiri",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 4,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      department: "Boshlang'ich ta'lim metodikasi",
      position: "Stajer-o‘qituvchi",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 5,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      department: "Fizika va astronomiya o'qitish metodikasi",
      position: "Katta o‘qituvchi",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 6,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      department: "Pedagogika va menejment",
      position: "Katta o‘qituvchi",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
  ];
  //fakultet filter
  const optionsFakulty = ref([
    { value: "Umumiy pedagogika" },
    { value: "Boshlang'ich ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Bugalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "Pedagogika" },
  ]);
  const optionsDepartment2 = ref([
    { value: "Boshlang'ich ta'lim metodikasi" },
    { value: "Bolalar sporti" },
    { value: "Fizika va astronomiya o'qitish metodikasi" },
    { value: "Informatika va axborot texnologiyalari" },
    { value: "Maktabgacha ta'lim metodikasi" },
    { value: "Milliy g'oya, ma'naviyat asoslari va huquq ta'limi" },
  ]);
</script>

<template>
  <div class="teacherListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{$t('Employee_Teacher')}}</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download me-2"></i>{{$t('Download')}}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>Filtr
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsFakulty"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Fakultetni tanlang</label>
            </div>
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsDepartment2"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t("Choose_Department")}}</label>
            </div>
            <div class="my-2 col-xl-4 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{$t('Search_by_Name_Passport_Employee_ID')}}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnifying-glass me-2"></i>Qidirish
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START MODAL---------------------------------------->
    <div
      id="myModalEmployees"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              ABDUQODIROV BOBURJON ABDUXALILOVICH
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Xodim</label
                    >
                    <a-select
                      v-model:value="value"
                      :options="optionsTeacher"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Lavozim</label
                    >
                    <a-select
                      v-model:value="value"
                      :options="optionsPositionTecher"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
              </div>
              <!-- -------------------------------------------------- -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Kafedra / Bo'lim</label
                    >
                    <a-select
                      v-model:value="value"
                      :options="optionsDepartment"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Xodim turi</label
                    >
                    <a-select
                      v-model:value="value"
                      :options="optionsTeacherType"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
              </div>
              <!-- ------------------------------------------------------------ -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Mexnat shakli</label
                    >
                    <a-select
                      v-model:value="value"
                      :options="optionsCocktailForm"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Stavka</label
                    >
                    <a-select
                      v-model:value="value"
                      :options="optionsRate"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
              </div>

              <!-- ------------------------------------------------------------- -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Kontrakt raqami</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Kontrakt sanasi</label
                    >
                    <a-form-item name="date-picker" v-bind="config">
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="formState1['date-picker']"
                        value-format="YYYY-MM-DD"
                      />
                    </a-form-item>
                  </div>
                </div>
              </div>
              <!-- ----------------------------------------- -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Buyruq raqami</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Buyruq sanasi</label
                    >
                    <a-form-item name="date-picker" v-bind="config">
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="formState2['date-picker']"
                        value-format="YYYY-MM-DD"
                      />
                    </a-form-item>
                  </div>
                </div>
              </div>
              <!-- ------------------------------------------------ -->
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  Yopish
                </button>
                <button class="btns c-delete me-1">O'chirish</button>
                <button class="btns c-save">Saqlash</button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-teacher-list">
                    <th>#</th>
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th>{{$t("Employee")}}</th>
                    <th>{{$t("Hei_department")}}</th>
                    <th>{{$t("by_Post")}}</th>
                    <th>{{$t("Employment_Staff")}}</th>
                    <th>Status</th>
                    <th>{{$t("Command_number")}}</th>
                    <th>Actions</th>
                    <th>Faol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-teacher-list"
                    v-for="element in objTeachers"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.department }}</td>
                    <td>{{ element.position }}</td>
                    <td>{{ element.stavka }}</td>
                    <td>{{ element.status }}</td>
                    <td>{{ element.commandNumber }}</td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a
                              type="text"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalEmployees"
                            >
                              <i class="bx bx-pencil font-size-18"></i>
                            </a>
                          </div>
                        </li>
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a class="text-danger" type="danger" @click="cancel"
                              ><i class="bx bx-trash-alt font-size-18"></i
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <!-- ---------END ACTIONS-------------- -->
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <div class="mt-2">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <span class="page-link"
                        ><i class="mdi mdi-chevron-left"></i
                      ></span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item active">
                      <span class="page-link">
                        2
                        <span class="sr-only">(current)</span>
                      </span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#"
                        ><i class="mdi mdi-chevron-right"></i
                      ></a>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-------------END PAGINATION-------------->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
  
  .teacherListPage {
    .table-row-teacher-list {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 40px auto 200px 150px 150px 100px 130px 80px 60px;
      @include mobile() {
        grid-template-columns: 50px 40px 200px auto auto 120px 100px 110px 80px 60px;
      }
    }
    .modal-dialog {
      max-width: $ipad;
    }
  }
</style>
