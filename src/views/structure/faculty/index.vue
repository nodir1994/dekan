<!----------------FAKULTET------------------->
<template>
  <div pagetitle="'Fakultet'" class="faculty-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Fakultet</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="butoon"
                class="btns c-save py-1.5 px-4"
                data-bs-toggle="modal"
                data-bs-target="#myModalFaculty"
              >
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>
                <span>Fakultet yaratish</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START MODAL---------------------------------------->
    <div
      id="myModalFaculty"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabelFaculty"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Fakultet yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatFaculty"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="nameUZ"
                :rules="[
                  { required: true, message: `Fakultet nomini kiriting!` },
                ]"
              >
                <label for="fakulty-name-input" class="form-label"
                  >{{ $t("Name_Uz")}}<sup>⚬</sup></label
                >
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatFaculty.nameUz"
                  placeholder="Fakultet nomini kiriting"
                />
              </a-form-item>
              <a-form-item
                class="mb-3"
                name="nameRu"
                :rules="[
                  { required: true, message: `Fakultet nomini kiriting!` },
                ]"
              >
                <label for="fakulty-name-input" class="form-label"
                  >{{ $t("Name_RU")}}<sup>⚬</sup></label
                >
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatFaculty.nameRu"
                  placeholder="Fakultet nomini kiriting"
                />
              </a-form-item>
              <a-form-item
                class="mb-3"
                name="nameEn"
                :rules="[
                  { required: true, message: `Fakultet nomini kiriting!` },
                ]"
              >
                <label for="fakulty-name-input" class="form-label"
                  >{{ $t("Name_EN")}}<sup>⚬</sup></label
                >
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatFaculty.nameEn"
                  placeholder="Fakultet nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="kodFaculty"
                :rules="[
                  { required: true, message: `Fakultet kodini kiriting!` },
                ]"
              >
                <label for="fakulty-kod-input" class="form-label">Kodi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatFaculty.kodFaculty"
                  placeholder="Fakultet kodini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="facultySort"
                :rules="[
                  { required: true, message: `Fakultet kodini kiriting!` },
                ]"
              >
                <label for="fakultet-sort-input" class="form-label">{{ $t("Publication_Property_Type") }}</label>
                <a-select
                  autocomplete="off"
                  v-model:value="formCreatFaculty.facultySort"
                  :options="allDate.optionsFacultySorts"
                  style="width: 100%"
                  @change="handleFacultySort"
                >
                </a-select>
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
                  <i
                    class="mdi mdi-content-save font-size-14 align-middle me-1"
                  ></i>
                  {{ $t("Save")}}
                </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL------------------------------------------>

    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-fakulty">
                    <th>#</th>
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th>Kodi</th>
                    <th>{{ $t("Name") }}</th>
                    <th>Turi</th>
                    <th>{{$t('action')}}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-fakulty"
                    v-for="element in allTables.tableFaculty"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.kod }}</td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.type }}</td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a
                              type="text"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalFaculty"
                            >
                              <i
                                class="mdi mdi-pencil font-size-18 text-primary"
                              ></i>
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

<script>

import { reactive } from "vue";
import appConfig from "@/app.config";
import Swal from "sweetalert2";
import { allDate, allTables } from "../../data";

export default {
  setup() {
    //actions delete
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
    const formCreatFaculty = reactive({
      nameUz: "",
      nameRu: "",
      nameEn: "",
      kodFaculty: "",
      value: undefined,
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formCreatFaculty,
      onFinishFailed,
      onFinish,
      cancel, //actions delete
      allDate,
      allTables,
    };
  },
  page: {
    title: "fakulty",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    
  },
};
</script>

<style lang="scss">

.faculty-page {
  .table-row-fakulty {
    width: 100% !important;
    display: grid;
    grid-gap: 0;
    grid-template-columns: 50px 40px 100px auto 200px 80px 60px;
    @include mobile() {
      grid-template-columns: 50px 40px 100px 200px auto 80px 60px;
    }
  }
}
</style>