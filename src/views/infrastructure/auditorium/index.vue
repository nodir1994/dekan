<template>
  <div pagetitle="'Malaka oshirish'" class="auditoriumPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Auditoriya</h5>
          <div class="filterBlock">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalCreatAuditorium"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>Auditoriya yaratish
            </button>
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------->

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsBuilding"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Binoni tanlang</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsAuditoriumType"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Auditoriya turini tanlang</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{ $t("Search_by_Name") }}</label>
            </div>
            <div class="my-2 col-md-2">
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
      id="myModalCreatAuditorium"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Auditoriya yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatAuditorium"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="building"
                :rules="[
                  {
                    required: true,
                    message: `Bino bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >Bino</label
                >
                <a-select
                  v-model:value="formCreatAuditorium.building"
                  :options="allDate.optionsBuilding"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="auditormType"
                :rules="[
                  {
                    required: true,
                    message: `Auditoriya turi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >Auditoriya turi</label
                >
                <a-select
                  v-model:value="formCreatAuditorium.auditormType"
                  :options="allDate.optionsAuditoriumType"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
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
                <label for="fakulty-kod-input" class="form-label">Nomi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatAuditorium.name"
                  placeholder="Auditoriya nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="volume"
                :rules="[
                  {
                    required: true,
                    message: `Sig'imi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakulty-name-input" class="form-label">Sig'im</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatAuditorium.volume"
                  placeholder="Auditoriya sig'imini kiriting"
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
            <h5 class="modal-title" id="myModalLabel">Fan taxrirlash</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formEditSubject"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
            <a-form-item
                class="mb-3"
                name="educationType"
                :rules="[
                  {
                    required: true,
                    message: `Ta'lim turi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >{{ $t("Education_Type") }}</label
                >
                <a-select
                  v-model:value="formEditSubject.educationType"
                  :options="allDate.optionsEducationType"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="subjectGroup"
                :rules="[
                  {
                    required: true,
                    message: `Fanlar guruhi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="division-name-select" class="form-label"
                  >Fanlar guruhi</label
                >
                <a-select
                  v-model:value="formEditSubject.subjectGroup"
                  :options="allDate.optionsSubjectGroup"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
              <a-form-item
                class="mb-3"
                name="nameSubject"
                :rules="[
                  {
                    required: true,
                    message: `Fan nomi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakulty-kod-input" class="form-label">Nomi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formEditSubject.nameSubject"
                  placeholder="Fan nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="kodSubject"
                :rules="[
                  {
                    required: true,
                    message: `Fan kodi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakulty-name-input" class="form-label">Kodi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formEditSubject.kodSubject"
                  placeholder="Fan kodini kiriting"
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
                <th>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </th>
                <th><strong>Nomi</strong></th>
                <th><strong>Bino</strong></th>
                <th><strong>Auditoriya turi</strong></th>
                <th><strong>Sig'imi</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="element in allTables.tableAuditorium"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.building }}</td>
                <td>{{ element.auditoriumType }}</td>
                <td>{{ element.volume }}</td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalCreatAuditorium"
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
                      v-model="element.action"
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

    const formCreatAuditorium = reactive({
      building: undefined,
      auditormType: undefined,
      name: "",
      volume: "",
    });

    const formEditSubject = reactive({
      educationType: allDate.optionsEducationType[0],
      subjectGroup: allDate.optionsSubjectGroup[0],
      nameSubject: "Dinamika",
      kodSubject: "202",
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      current: ref(1),
      formCreatAuditorium, //validation add
      formEditSubject, //validation edit
      onFinish, //validation
      onFinishFailed, //validation
      cancel,
      filterOption,
      allDate,
      allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">

.auditoriumPage {
  .table-row {
    grid-template-columns: 50px 40px auto 100px 120px 80px 110px 60px;
    @include mobile() {
      grid-template-columns: 50px 40px 200px 70px 80px 80px 110px 60px;
    }
  }
}
</style>





