<template>
  <div pagetitle="'Juftliklar'" class="markingLessonPairPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Juftliklar</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalGradeType"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{$t('Create')}}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START ADD MODAL---------------------------------------->
    <div
      id="myModalGradeType"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Juftlik yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatGradeType"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="educationYear"
                :rules="[
                  {
                    required: true,
                    message: `O'quv yili bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >{{ $t("Education_Year_Name") }}</label
                >
                <a-select
                  v-model:value="formCreatGradeType.educationYear"
                  :options="allDate.optionsEducationYear"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="name"
                :rules="[
                  {
                    required: true,
                    message: `Nomi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="otm-name-input" class="form-label">Nomi</label>
                <a-input
                  class="select"
                  tupe="text"
                  v-model:value="formCreatGradeType.name"
                  placeholder="Nomini kiriting"
                />
              </a-form-item>

              <div class="row">
                <label for="otm-name-input" class="form-label"
                  >Vaqt oralig'ini kiriting</label
                >
                <div class="col-6">
                  <a-form-item
                    class="mb-3"
                    name="timeStart"
                    :rules="[
                      {
                        required: true,
                        message: `Boshlanish vaqtini kiriting!`,
                      },
                    ]"
                  >
                    <a-time-picker
                      v-model:value="formCreatGradeType.timeStart"
                      format="HH:mm"
                      placeholder="Boshlanish vaqti"
                    />
                  </a-form-item>
                </div>
                <div class="col-6">
                  <a-form-item
                    class="mb-3"
                    name="timeEnd"
                    :rules="[
                      {
                        required: true,
                        message: `Tugash vaqtini kiriting!`,
                      },
                    ]"
                  >
                    <a-time-picker
                      v-model:value="formCreatGradeType.timeEnd"
                      format="HH:mm"
                      placeholder="Tugash vaqti"
                    />
                  </a-form-item>
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                   <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
                <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END ADD MODAL---------------------------------------->

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-10 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu"> Nomi bo'yicha qidirish</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row">
                <th>
                  <strong><i class="mdi mdi-bars font-size-18"></i></strong>
                </th>
                <th><strong>Nom</strong></th>
                <th><strong>Kod</strong></th>
                <th><strong>Boshlanish vaqti</strong></th>
                <th><strong>O'quv yili</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="element in allTables.tableLessonPair"
                :key="element.id"
              >
                <td>
                  <i class="mdi mdi-bars font-size-18"></i>
                </td>
                <td>
                  {{ element.code }}
                </td>
                <td>
                  {{ element.name }}
                </td>
                <td>{{ element.time.start }} - {{ element.time.end }}</td>
                <td>
                  {{ element.educationYear }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalGradeType"
                        >
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="cancel"
                          ><i class="mdi mdi-delete font-size-18"></i
                        ></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  <div class="form-check form-switch my-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                      v-model="element.active"
                    />
                  </div>
                </td>
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

<script>

import { ref, reactive } from "vue";
import { allDate, allTables } from "../../data";
import Swal from "sweetalert2";

export default {
  setup() {
    // ------------delete modal oyna--------------------
    function cancel() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: "btn btn-success",
          confirmButton: "btn btn-danger  me-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Juftlikni o'chirishni hohlaysizmi?",
          text: "Siz buni qaytara olmaysiz!",
          icon: "warning",
          confirmButtonText: "Ha, O'chrish!",
          cancelButtonText: "Yo'q, bekor qilish!",
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              "O'chirildi!",
              "O'chirish muvaffaqiyatli amalga oshirildi!",
              "success"
            );
          }
        });
    }
    const formCreatGradeType = reactive({
      timeStrat: undefined,
      timeEnd: undefined,
      educationYear: undefined,
      name: "",
    });

    const formEditEducationYear = reactive({
      educationYears: allDate.optionsEducationYear,
      semestrType: allDate.optionsSemestrType[0],
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formCreatGradeType, //validation add
      formEditEducationYear, //validation edit
      onFinish, //validation
      onFinishFailed, //validation
      cancel,
      current: ref(1),
      checked: ref(false),
      allTables,
      allDate,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.markingLessonPairPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 60px 100px auto 150px 80px 60px;
    @include mobile() {
      grid-template-columns: 50px 60px 100px 150px 150px 80px 60px;
    }
  }
}
</style>





