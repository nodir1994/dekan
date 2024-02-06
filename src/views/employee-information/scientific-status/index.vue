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

  //jadval ilmiy status
  const tablEemployee = [
    {
      id: 1, //id
      nomerId: "00100000001", //status id
      name: "ABDALOVA SAYYORA KOMILOVNA", //xodim name
      typeOfDiploma: "Ilmiy unvon", //diplom turi
      academicYear: "2022-2023", //o'quv yili
      academicTitle: "Dotsent", //ilmiy unvon
      state: "O'zbekiston", //davlat
      otmName: "Chirchiq davlat pedagogika unversiteti", //otm nomi
      diplomaNumber: "04 №1234567890", //diplom raqam
      diplomaDate: "12.21.2022", //diplom sanasi
      scientificCouncilNumber: "DSC 007.15.6000", //ilmiy kengash raqami
      oakApprovalDate: "31.12.2021", //oak tasdiq sanasi
    },
  ];

  //ilmiy daraja
  const optionsAcademicDegree = ref([
    { value: "Darajasiz" },
    { value: "Fan nomzodi, PhD" },
    { value: "Fan doktori, DSc" },
  ]);
  // ------------------------------------------

  //ilmiy unvon
  const optionsAcademicTitle = ref([
    { value: "Unvonsiz" },
    { value: "Dotsent" },
    { value: "Katta ilmiy xodim" },
    { value: "Professor" },
  ]);
  //-----------------------------------------

  //o'quv yili
  const optionsAcademicYear = ref([
    { value: "2019" },
    { value: "2020" },
    { value: "2021" },
    { value: "2022" },
  ]);
  //xodimlar
  const optionsEmployee = ref([
    { value: "ABDIMUROTOV OYBEK URALOVICH" },
    { value: "ABDRASHITOVA YELENA VLADIMIROVNA" },
    { value: "ABDULAXATOV AKRAMJON RUZMAMATOVICH" },
    { value: "ABDULLAYEV HABIB SHUKURULLAYEVICH" },
    { value: "SAMAROVA SHOXISTA RABIDJANOVNA" },
    { value: "SAYFULLAYEVA ISMIGUL QODIR QIZI" },
    { value: "RAXMANOV SAPARBOY ZARIPOVICH" },
  ]);
  //davlat
  const optionsState = ref([
    { value: "O'zbekiston" },
    { value: "Rassiya" },
    { value: "Qozog'iston" },
    { value: "Turkmaniston" },
    { value: "Italiya" },
    { value: "Ispaniya" },
    { value: "Xitoy" },
  ]);
  //diplom turi
  const optionsTypeOfDiploma = ref([
    { value: "Ilmiy daraja" },
    { value: "Ilmiy unvon" },
  ]);
</script>

<template>
  <div class="scientificStatusPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Ilmiy status</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModScientificStatus"
            >
              <i class="mdi mdi-user-plus me-2"></i>Statusni kiritish
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsTypeOfDiploma"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Diplom turini tanlang</label>
            </div>
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsAcademicTitle"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Ilmiy darajani tanlang</label>
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
      id="myModScientificStatus"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Status kiritish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >O'quv yili</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsAcademicYear"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Xodim</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsEmployee"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Shifr</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsShifr"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Mutaxassislik nomi</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Davlat</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsState"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >OTM</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Diplom turi</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsTypeOfDiploma"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Diplom raqami</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Ilmiy unvon</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsAcademicTitle"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Diplom sanasi</label
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

                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Ilmiy kengash raqami</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >OAK tasdiq sanasi</label
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
              <!-- -------------------------------------------------- -->
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
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-scientific-status">
                <th>#</th>
                <th><a-checkbox v-model:checked1="checked"></a-checkbox></th>
                <th>{{$t("Employee")}}</th>
                <th>Diplom turi</th>
                <th>Davlat</th>
                <th>Diplom raqami</th>
                <th>Ilmiy kengash raqami</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-scientific-status"
                v-for="element in tablEemployee"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td><a-checkbox v-model:checked1="checked"></a-checkbox></td>
                <td>
                  {{ element.name }} <br />
                  {{ element.nomerId }}
                </td>
                <td>
                  {{ element.typeOfDiploma }} <br />
                  {{ element.academicYear }} / {{ element.academicTitle }}
                </td>
                <td>
                  {{ element.state }} <br />
                  {{ element.otmName }}
                </td>
                <td>
                  {{ element.diplomaNumber }} <br />
                  {{ element.diplomaDate }}
                </td>
                <td>
                  {{ element.scientificCouncilNumber }} <br />
                  {{ element.oakApprovalDate }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModScientificStatus"
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
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
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
                  <a class="page-link" href="#">4</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">5</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">6</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#"
                    ><i class="mdi mdi-chevron-right"></i
                  ></a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- --------------end pagination--------------------- -->
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
  
  .scientificStatusPage {
    .table-row-scientific-status {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 40px auto 170px 270px 140px 170px 80px;
      @include mobile() {
        grid-template-columns: 50px 40px 200px 120px 200px 140px 170px 80px;
      }
    }
    .modal-dialog {
      max-width: $ipad;
    }
  }
</style>
