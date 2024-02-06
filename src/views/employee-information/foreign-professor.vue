<script setup lang="ts">
  import { ref } from "vue";
  import Swal from "sweetalert2";

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

  //jadval xorijiy o'qiyuvchi
  const tablEemployee = [
    {
      id: 1, //id
      name: "ALEX WILSON", //xodim name
      state: "Amerika Qo'shma Shtatlari", //davlat
      specialityNmae: "Kompyuter ingirining", //mutaxassislik nomi
      otmName: "Kembridge universiteti", //otm nomi
      sciences: "Dotsent", //fanlar
      academicYear: "2022-2023", //o'quv yili
      mainDocument: "12.12.2022", //asos hujjat
      date: "12.10.2022 13:24:13", //shartnoma vaqti
    },
  ];

  //ish joyi
  const optionsPlaseOfWork = ref([{ value: "Ish joylar aniqlanmanagan" }]);
  // ------------------------------------------

  //fanlar
  const optionsSciences = ref([{ value: "Fanlar aniqlanmagan" }]);
  //-----------------------------------------

  //o'quv yili
  const optionsAcademicYear = ref([
    { value: "2019" },
    { value: "2020" },
    { value: "2021" },
    { value: "2022" },
  ]);
  //mutaxassisliklar
  const optionsSpecialty = ref([
    { value: "Mutaxassislilklar hali aniqlanmagan" },
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
</script>

<template>
  <div class="foregnProfessor">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Xorijiy o'qituvchi</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModScientificStatus"
            >
              <i class="mdi mdi-user-plus me-2"></i>Qo'shish
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
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsState"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Davlatni tanlang</label>
            </div>
            <div class="my-2 col-xl-6 form--item">
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
            <h5 class="modal-title" id="myModalLabel">Xorijiy o'qituvchi</h5>
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
                      v-model:value="value"
                      :options="optionsAcademicYear"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >To'liq ismi</label
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
                    <label for="division-name-select" class="form-label"
                      >Ish joyi</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsPlaseOfWork"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >{{$t('Subjects')}}</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsSciences"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Mutaxassislik nomi</label
                    >
                    <a-select
                      v-model:value="valueC"
                      :options="optionsSpecialty"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Ilmiy kengash raqami</label
                    >
                    <a-input v-model:value="value2" />
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
              <tr class="table-row-foreign-professor">
                <th>#</th>
                <th><a-checkbox v-model:checked1="checked"></a-checkbox></th>
                <th>To'liq ismi</th>
                <th>Mutaxassislik nomi</th>
                <th>{{$t('Subjects')}}</th>
                <th>Contract Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-foreign-professor"
                v-for="element in tablEemployee"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td><a-checkbox v-model:checked1="checked"></a-checkbox></td>
                <td>
                  {{ element.name }} <br />
                  {{ element.state }}
                </td>
                <td>
                  {{ element.specialityNmae }} <br />
                  {{ element.otmName }}
                </td>
                <td>
                  {{ element.sciences }} <br />
                  {{ element.academicYear }}
                </td>
                <td>
                  {{ element.mainDocument }} <br />
                  {{ element.date }}
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
          <!-- -------------start pagination------------- -->
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
          <!-- --------end pagination---------------- -->
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
  
  .foregnProfessor {
    .table-row-foreign-professor {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 40px 40px auto 200px 120px 180px 80px;
      @include mobile() {
        grid-template-columns: 40px 40px 200px 160px 100px 180px 80px;
      }
    }
    .modal-dialog {
      max-width: $ipad;
    }
  }
</style>
