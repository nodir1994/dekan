<template>
  <div pagetitle="'Malaka oshirish'" class="curriculumArchive">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">O'quv rejalar arxivi</h5>
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
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsEducationYear"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t('Choose_Education_Year')}}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
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
            <div class="my-2 col-xl-4 form--item">
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
              <tr class="table-row-curriculum">
                <th><strong>Nomi</strong></th>
                <th><strong>Fakultet</strong></th>
                <th><strong>Actions</strong></th>
                <th><strong>Arxiv</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-curriculum"
                v-for="element in allTables.tableCurriculum"
                :key="element.id"
              >
                <td>
                  {{ element.name }} <br />
                  {{ element.speciality }}
                </td>
                <td>
                  {{ element.faculty }} <br />
                  {{ element.educationType }} / {{ element.markingSystem }}
                </td>
                <td>
                  <button class="btns1 actions-h px-2 me-2" type="submit">
                    <i class="fas fa-calendar-alt me-1"></i> Semestr 8
                  </button>
                  <button class="btns1 actions-h px-2 me-2" type="submit">
                    <i class="fas fa-hourglass me-1"></i> Xafta 208
                  </button>
                  <button class="btns1 actions-h px-2 me-2" type="submit">
                    <i class="fas fa-book me-1"></i> Fanlar 34
                  </button>
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td>
                  <button class="btns1 actions-c px-2 me-2" @click="recovery">
                    <i class="mdi mdi-file-zipper me-1"></i> Tiklash
                  </button>
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

<script>

import { ref, reactive } from "vue";
import { allDate, allTables } from "../../data";
import Swal from "sweetalert2";

export default {
  setup() {
    // ------------delete modal oyna--------------------
    function recovery() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger ml-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "O'quv rejani tiklashni hohlaysizmi?",
          text: "Siz buni qaytara olmaysiz!",
          icon: "warning",
          confirmButtonText: "Ha, Tiklash!",
          cancelButtonText: "Yo'q, bekor qilish!",
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              "Tiklandi!",
              "O'quv rejani tiklash muvaffaqiyatli amalga oshirildi!",
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
      recovery,
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
.curriculumArchive {
  .table-row-curriculum {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 240px 350px 120px;
    @include mobile() {
      grid-template-columns: 200px 140px 350px 120px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:last-child, &:first-child {
        display: flex;
        justify-content: left;
      }
    }
  }
}
</style>





