<template>
  <div pagetitle="'Malaka oshirish'" class="creatEducationYeasrPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">O'quv yili</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalCreatSubject"
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

    <!-------START ADD MODAL---------------------------------------->
    <div
      id="myModalCreatSubject"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">O'quv yili yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatEducationYear"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="educationYears"
                :rules="[
                  {
                    required: true,
                    message: `O'quv yili bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label">{{ $t("Education_Year_Name") }}</label>
                <a-select
                  v-model:value="formCreatEducationYear.educationYears"
                  :options="allDate.optionsEducationYears"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="semestrType"
                :rules="[
                  {
                    required: true,
                    message: `Semestr turi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >Semestr turi</label
                >
                <a-select
                  v-model:value="formCreatEducationYear.semestrType"
                  :options="allDate.optionsSemestrType"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  placeholder="Semestr turini tanlang"
                >
                </a-select>
              </a-form-item>
              <a-checkbox v-model:checked="checked" class="mb-3">Joriy holat</a-checkbox>

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

    <!-------START EDIT MODAL---------------------------------------->
    <div
      id="myModalEditSubject"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">O'quv yilini taxrirlash</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formEditEducationYear"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="educationYears"
                :rules="[
                  {
                    required: true,
                    message: `O'quv yili bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label">{{ $t("Education_Year_Name") }}</label>
                <a-select
                  v-model:value="formEditEducationYear.educationYears"
                  :options="allDate.optionsEducationYears"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  :placeholder="t('Choose_Education_Year')"
                >
                </a-select>
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="semestrType"
                :rules="[
                  {
                    required: true,
                    message: `Semestr turi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >Semestr turi</label
                >
                <a-select
                  v-model:value="formEditEducationYear.semestrType"
                  :options="allDate.optionsSemestrType"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  placeholder="Semestr turini tanlang"
                >
                </a-select>
              </a-form-item>
              <a-checkbox v-model:checked="checked" class="mb-3">Joriy holat</a-checkbox>

              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                   <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
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
    </div>
    <!-------END EDIT MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-education-year">
                <th><strong>#</strong></th>
                <th>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </th>
                <th><strong>Nomi</strong></th>
                <th><strong>Kod</strong></th>
                <th><strong>Joriy holat</strong></th>
                <th><strong>O'zgartirilgan</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-education-year"
                v-for="element in allTables.tableEducationYears"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.kod }}</td>
                <td>{{ element.currentStatus }}</td>
                <td>{{ element.updatedAt }}</td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalEditSubject"
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
    const formCreatEducationYear = reactive({
      semestrType: undefined,
      educationYears: undefined,
    });

    const formEditEducationYear = reactive({
      educationYears: allDate.optionsEducationYears,
      semestrType: allDate.optionsSemestrType[0],
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formCreatEducationYear, //validation add
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
.creatEducationYeasrPage {
  .table-row-education-year {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 40px 100px 100px 100px auto 80px 60px;
    @include mobile() {
      grid-template-columns: 50px 40px 70px 70px 70px 200px 80px 60px;
    }
  }
}
</style>





