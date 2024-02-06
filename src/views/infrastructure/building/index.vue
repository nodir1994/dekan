

<template>
  <div pagetitle="'Bino'" class="buildingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Bino</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalCreatBuilding"
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
      id="myModalCreatBuilding"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Bino yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatBuilding"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
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
                <label for="fakulty-kod-input" class="form-label">Nomi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatBuilding.name"
                  placeholder="Bino nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="sity"
                :rules="[
                  {
                    required: true,
                    message: `Shahar bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakulty-name-input" class="form-label">{{ $t("address")}}</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatBuilding.sity"
                  placeholder="Bino joylashgan shaharni kiriting"
                />
              </a-form-item>

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
    <!-- <div
      id="myModalEditSubject"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Fan guruhi taxrirlash</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formEditSubjectGroup"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="nameSubjectGroup"
                :rules="[
                  {
                    required: true,
                    message: `Fan guruhi nomi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakulty-kod-input" class="form-label">Nomi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formEditSubjectGroup.nameSubjectGroup"
                  placeholder="Fan guruhi nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="kodSubjectGroup"
                :rules="[
                  {
                    required: true,
                    message: `Fan guruhi kodi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakulty-name-input" class="form-label">Kodi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formEditSubjectGroup.kodSubjectGroup"
                  placeholder="Fan guruhi kodini kiriting"
                />
              </a-form-item>

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
    </div> -->
    <!-------END EDIT MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th><strong>#</strong></th>
                <th><strong>Nomi</strong></th>
                <th><strong>{{ $t("address")}}</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="element in allTables.tableBuilding"
                :key="element.id"
              >
                <td>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.sity }}</td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalCreatBuilding"
                        >
                          <i class="mdi mdi-pencil font-size-18 text-primary b-actions c-edit"></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="cancel"
                          ><i class="mdi mdi-delete font-size-18 b-actions c-delet"></i
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
import { allTables } from "../../data";
import Swal from "sweetalert2";

export default {
  setup() {
    // ------------delete modal oyna--------------------
    function cancel() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger me-2",
          cancelButton: "btn btn-success",
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
    const formCreatBuilding = reactive({
      name: "",
      shahar: "",
    });

    const formEditSubjectGroup = reactive({
      nameSubjectGroup: "Fizika",
      kodSubjectGroup: "202",
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formCreatBuilding, //validation add
      formEditSubjectGroup, //validation edit
      onFinish, //validation
      onFinishFailed, //validation
      cancel,
      close,
      current: ref(1),
      allTables: allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.buildingPage {
  .table-row {
    grid-template-columns: 40px 200px  auto 110px 60px;
    @include mobile() {
      grid-template-columns: 40px 100px 200px 110px 60px;
    }
  }
}
</style>





