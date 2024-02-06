<template>
  <div pagetitle="`Kafedra`" class="attendance-setting-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Davomat choralari</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4"
                data-bs-toggle="modal"
                data-bs-target="#myModalDivision"
              >
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
                >{{ $t("add") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

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
            <h5 class="modal-title" id="myModalLabel">
              Davomat chorasini qo'shish
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="mb-3">
                <label for="division-name-select" class="form-label"
                  >Baholash tizimi</label
                >
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsEvaluationSystem"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  placeholder="Baholash tizimini tanlang"
                >
                </a-select>
              </div>
              <div class="mb-3">
                <label for="division-name-select" class="form-label"
                  >Chora turi</label
                >
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsAttendanceSetting"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                  placeholder="Chora turini tanlang"
                >
                </a-select>
              </div>
              <div class="mb-3">
                <label for="division-name-input" class="form-label"
                  >Minimal chegara</label
                >
                <a-input v-model:value="value2" />
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close") }}
                </button>
                <button class="btns c-save">
                  <i
                    class="mdi mdi-content-save font-size-14 align-middle me-1"
                  ></i
                  >{{ $t("Save") }}
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
            <div class="row">
              <div class="my-2 col-xl-4 form--item">
                <a-space>
                  <a-select
                    v-model:value="value"
                    :options="allDate.optionsEvaluationSystem"
                    @change="handleChange"
                  >
                  </a-select>
                </a-space>
                <label for="yu">Baholash tizimini tanlang</label>
              </div>
            </div>
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>Minimal chegara</th>
                    <th>Chora turi</th>
                    <th>Baholash tizimi</th>
                    <th>Actions</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="element in allTables.tableAttendanceSetting"
                    :key="element.id"
                  >
                    <td>{{ element.minBorder }}</td>
                    <td>
                      <span
                        class="havola"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalDivision"
                        >{{ element.attendanceSetting }}</span
                      >
                    </td>
                    <td>{{ element.markingSystem }}</td>
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

<!-- <script>
import appConfig from "@/app.config";
import { ref } from "vue";
import Swal from "sweetalert2";

import { allDate, allTables } from "../../data"

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

    //kafedra jadval
    const objDivision = [
      {
        id: 1,
        kod: "354-001",
        name: "Tasviriy san'at",
        type: "San'atshunoslik",
      },
      {
        id: 2,
        kod: "354-002",
        name: "Fakultetlar'aro ijtimoiy fanlar",
        type: "Gumanitar fanlar",
      },
      {
        id: 3,
        kod: "354-003",
        name: "Milliy g'oya, ma'naviyat asoslari va huquq ta'limi",
        type: "Gumanitar fanlar",
      },
      {
        id: 4,
        kod: "354-004",
        name: "Matematika o'qitish metodikasi va geometriya",
        type: "Matematika va informatika",
      },
      {
        id: 5,
        kod: "354-005",
        name: "Informatika va axborot texnologiyalari",
        type: "Matematika va informatika",
      },
      {
        id: 6,
        kod: "354-006",
        name: "Fizika va astronomiya o'qitish metodikasi",
        type: "Fizika va kimyo",
      },
      {
        id: 7,
        kod: "354-007",
        name: "Genetika va evolutsion biologiya",
        type: "Tabiiy fanlar",
      },
      {
        id: 8,
        kod: "354-008",
        name: "Fakultetlar'aro jismoniy tarbiya",
        type: "Sport va chaqiriqqacha harbiy ta'lim",
      },
      {
        id: 9,
        kod: "354-009",
        name: "Umumkasbiy va ixtisoslik fanlari",
        type: "Turizm",
      },
    ];
    const optionsDepartment = ref([
      { value: "Matematika va informatika" },
      { value: "Pedagogika" },
      { value: "Til va adabiyot" },
      { value: "Gumanitar fanlar" },
      { value: "Sanat va madaniyat" },
      { value: "Tabiiy fanlar" },
    ]);
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
      allDate, allTables,
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      optionsDepartment,
      // value,
      current: ref(2),
      objDivision,
      // showModal,
      // showModalEdit,
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
</script> -->

<style lang="scss">
.attendance-setting-page {
  .table-row {
    grid-template-columns: 150px auto 300px 80px 60px;
    @include mobile() {
      grid-template-columns: 150px 200px 200px 80px 60px;
    }
    th,
    td {
      &:first-child {
        justify-content: start;
      }
    }
  }
  .havola:hover {
    cursor: pointer;
  }
}
</style>
