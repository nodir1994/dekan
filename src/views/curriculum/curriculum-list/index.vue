<template>
  <div pagetitle="'Malaka oshirish'" class="curriculumListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">O'quv rejalar ro'xati</h5>
          <div class="panel-toggles">
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
            <div class="my-2 col-md-4 form--item">
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

            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsEducationType"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsEducationForm"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Talim shaklini tanlang</label>
            </div>

            <div class="my-2 col-xl-8 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu"> Nomi bo'yicha qidirish</label>
            </div>
            <div class="my-2 col-xl-4">
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
              <tr class="table-row-curriculum">
                <th><strong>Nomi</strong></th>
                <th><strong>Fakultet</strong></th>
                <th><strong>Actions</strong></th>
                <th><strong>Tasdiq</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-curriculum"
                v-for="element in allTables.tableCurriculum"
                :key="element.id"
              >
                <td>
                  <router-link to="/curriculum/curriculum-list/curriculum"
                    >{{ element.name }} <br />
                    {{ element.speciality }}</router-link
                  >
                </td>
                <td>
                  {{ element.faculty }} <br />
                  {{ element.educationType }} / {{ element.markingSystem }}
                </td>
                <td>
                  <button class="btns1 actions-c p-2 me-2" type="submit">
                    <i class="fas fa-calendar-alt me-1"></i> Semestr: 8
                  </button>
                  <button class="btns1 actions-c p-2 me-2" type="submit">
                    <i class="fas fa-hourglass me-1"></i> Xafta: 208
                  </button>
                  <button class="btns1 actions-c p-2 me-2" type="submit">
                    <i class="fas fa-book me-1"></i> Fanlar: 34
                  </button>
                  <button class="btns1 actions-c p-2 me-2" type="submit">
                    <i class="fas fa-layer-group me-1"></i> Guruh: 5
                  </button>
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <router-link
                          to="/curriculum/curriculum-list/curriculum"
                        >
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i
                        ></router-link>
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
.curriculumListPage {
  .table-row-curriculum {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 240px 450px 80px 60px;
    @include mobile() {
      grid-template-columns: 200px 140px 450px 80px 60px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-child(1) {
        display: flex;
        justify-content: left;
      }
    }
  }
}
</style>





