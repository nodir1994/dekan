<template>
  <div pagetitle="`Talabalar kontengenti`" class="studentDatePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Student_Student") }}</h5>
          <div class="panel-toggles">
            <router-link to="/student/student/student-edit">
              <button class="btns c-save py-1.5 px-4 me-3" type="submit">
                <i class="mdi mdi-school font-size-14 align-middle me-1"></i>Talaba yaratish
              </button>
            </router-link>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <!-- //izlash  -->
            <div class="my-2 col-md-10 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu"
                >{{ $t("Search_by_Name_Student_ID_Passport_PIN") }}</label
              >
            </div>

            <!-- //search button  -->
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

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-contingent-list">
                    <th>#</th>
                    <th>{{ $t("Status") }}</th>
                    <th>{{ $t("Second_Name") }}</th>
                    <th>{{ $t("Passport_Number") }}</th>
                    <th>{{ $t("Year_Of_Enter") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Payment_Form") }}</th>
                    <th>{{ $t("Updated_At") }}</th>
                    <th>{{ $t("Created_At") }}</th>
                    <th>{{$t('action')}}</th>
                    <th>{{ $t("Password") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-contingent-list"
                    v-for="element in allTables.tableStudents"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      <i class="mdi mdi-circle-check"></i>
                    </td>
                    <td>
                      {{ element.secondName }} <br />
                      {{ element.studentId }}
                    </td>
                    <td>
                      {{ element.passportNumber }} <br />
                      {{ element.pin }}
                    </td>
                    <td>
                      {{ element.yearOfEnter }} <br />
                      {{ element.studentStatus }}
                    </td>
                    <td>
                      {{ element.educationType }} <br />
                      {{ element.formOfEducation }}
                    </td>
                    <td>
                      {{ element.paymentForm }}
                    </td>
                    <td>{{ element.updatedAt }}</td>
                    <td>
                      {{ element.createdAt }}
                    </td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link
                              to="/student/student/student-edit"
                            >
                              <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                            </router-link>
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
                    <td>
                      <a href="#" class="password"
                        ><i class="mdi mdi-key"></i
                      ></a>
                    </td>
                    <!-- ---------END ACTIONS-------------- -->
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

import Swal from "sweetalert2";
// import { Modal } from "ant-design-vue";
// import { ref, createVNode } from "vue";
// import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { allTables } from "../../data";

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
    return {
      cancel, //delete modal
      allTables: allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.studentDatePage {
  .table-row-contingent-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 60px auto 140px 150px 100px 120px 100px 100px 80px 60px;
    @include mobile() {
      grid-template-columns: 50px 200px 120px 140px 100px 100px 100px 140px 170px;
    }
  }
  .password {
    font-size: 18px;
  }
  .fa-circle-check {
    font-size: 20px;
    color: green;
  }
}

.contengent-list .content-table {
  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    &:nth-last-child(1) {
      justify-content: left;
      display: flex;
    }
    &:nth-child(1) {
      display: flex;
      justify-content: left;
    }
  }
}
</style>