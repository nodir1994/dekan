<template>
  <div pagetitle="`Kafedra`" class="department-page">
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{$t('Hei_department')}}</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4 me-3"
                data-bs-toggle="modal"
                data-bs-target="#myModalDivision"
              >
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
                >Kafedra yaratish
              </button>
            </div>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsFaculty"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{ $t("Search_by_Name") }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                >{{ $t("Search") }}
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>
    <!-------START MODAL---------------------------------------->
    <div
      id="myModalDivision"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Kafedra yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="mb-3">
                <label for="division-name-select" class="form-label"
                  >Fakultetni tanlang</label
                >
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsFaculty"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </div>
              <div class="mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Name_Uz")}}<sup>⚬</sup></label
                >
                <a-input
                  v-model:value="value2"
                  placeholder="Kafedra nomini kiriting"
                />
              </div>
              <div class="mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Name_RU")}}<sup>⚬</sup></label
                >
                <a-input
                  v-model:value="value3"
                  placeholder="Kafedra nomini kiriting"
                />
              </div>
              <div class="mb-3">
                <label for="division-name-input" class="form-label"
                  >{{ $t("Name_EN")}}<sup>⚬</sup></label
                >
                <a-input
                  v-model:value="value4"
                  placeholder="Kafedra nomini kiriting"
                />
              </div>
              <div class="mb-3">
                <label for="division-kod-input" class="form-label">{{ $t("Code")}}</label>
                <a-input
                  v-model:value="value3"
                  placeholder="Kafedra kodini kiriting"
                />
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
                <button class="btns c-save">
                  <i
                    class="mdi mdi-content-save font-size-14 align-middle me-1"
                  ></i
                  >Saqlash
                </button>
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
                  <tr class="table-row-division">
                    <th>#</th>
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th>{{ $t("Code") }}</th>
                    <th>{{ $t("Name") }}</th>
                    <th>{{ $t("Structure_Faculty") }}</th>
                    <th>Actions</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-division"
                    v-for="element in allTables.tableDepartment"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.kod }}</td>
                    <td>
                      <span
                        class="havola"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalDivision"
                        >{{ element.name }}</span
                      >
                    </td>
                    <td>{{ element.type }}</td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a
                              type="text"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalDivision"
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

<script>
import appConfig from "@/app.config";
import { ref } from "vue";
import Swal from "sweetalert2";

import { allDate, allTables } from "../../data";

export default {
  setup() {
    //action delete
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
    // const value = ref("");
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log("blur");
    };

    const handleFocus = () => {
      console.log("focus");
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return {
      allDate,
      allTables,
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      // value,
      current: ref(2),
      cancel, //action delete
    };
  },
  components: {
    
  },
  page: {
    title: "department",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
};
</script>

<style lang="scss">

.department-page {
  .table-row-division {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 40px 90px auto 300px 80px 60px;
    @include mobile() {
      grid-template-columns: 50px 40px 90px 200px 200px 80px 60px;
    }
  }
  .havola:hover {
    cursor: pointer;
  }
}
</style>

