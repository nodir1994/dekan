<template>
  <div pagetitle="'Xaftaliklar'" class="questionsPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/exam"
              >Kompyuterni modellashtrish / </router-link
            >Imtihon savollari
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/exam/questionsInput"
              ><button class="btns c-save py-1.5 px-4 me-3">
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>Savol kiritish
              </button></router-link
            >
            <router-link to="/curriculum/exam/subject"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row">
                <th><strong></strong></th>
                <th><strong>#</strong></th>
                <th><strong>Nomi</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="element in allTables.tableQuestions"
                :key="element.id"
              >
                <td><i class="mdi mdi-bars font-size-18"></i></td>
                <td>
                  {{ element.id }}
                </td>
                <td>
                  {{ element.name }}
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                       <div class="edit__project">
                        <a
                          type="danger"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalCreatSubject"
                        >
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i
                        ></a>
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
            <h5 class="modal-title" id="myModalLabel">Savolni taxrirlash</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <editor
              api-key="no-api-key"
              :init="{
                height: 400,
                menubar: false,
                selector: 'textarea',
                images_upload_url: 'postAcceptor.php',
                images_upload_base_path: '',
                plugins: 'advlist image media mediaembed emoticons',
                toolbar:
                  'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | media file image emoticons',
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <!-------END ADD MODAL---------------------------------------->
  </div>
</template>

<script>

import { ref, reactive } from "vue";
import { allDate, allTables } from "../../data";
import Swal from "sweetalert2";
import Editor from "@tinymce/tinymce-vue";

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
    const questionsPageForm = reactive({
      name: "",
      comment: "",
      trainingPlan: undefined,
      educationYear: undefined,
      semester: undefined,
      examType: undefined,
      active: allDate.optionsActive[0],
      time: "",
      maxPoints: "",
      attempts: "",
      questionCount: "",
      random: allDate.optionsRandom[0],
      subject: undefined,
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
      questionsPageForm, //validation add
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
    
    editor: Editor,
  },
};
</script>

<style lang="scss">
.questionsPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px auto 80px 60px;
    @include mobile() {
      grid-template-columns: 40px 50px 200px 80px 60px;
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
  .modal-dialog {
    max-width: $mobile;
  }
}
</style>





