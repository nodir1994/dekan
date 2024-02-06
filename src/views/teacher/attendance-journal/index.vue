<template>
  <div pagetitle="`DAK natijalari`" class="attendanseJournalPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Davomat jurnali</h5>
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
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <!-- //o'quv yili  -->
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsYear"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //fakultet  -->
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsSemestr"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label>{{$t('Choose_Semester')}}</label>
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
                  <tr class="table-row w-100 d-grid">
                    <th>#</th>
                    <th>{{$t('Group')}}</th>
                    <th>{{$t('Subjects')}}</th>
                    <th>{{$t('Training')}}</th>
                    <th>{{$t('Education_Year_Name')}}</th>
                    <th>{{$t('Semester_Name')}}</th>
                    <th>{{$t('action')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row w-100 d-grid"
                    v-for="element in allTables.tableTrainingList"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.group }}
                    </td>
                    <td>
                      {{ element.subject }}
                    </td>
                    <td>
                      {{ element.trainingType }}
                    </td>
                    <td>{{ element.educationYear }}</td>
                    <td>{{ element.semester }}</td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link
                              to="/teacher/attendance-journal/journal"
                              ><i class="mdi mdi-pencil font-size-18 text-primary"></i
                            ></router-link>
                          </div>
                        </li>
                      </ul>
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

import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { allDate, allTables } from "../../data";
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
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //-----------------------------------
    const showDeleteConfirm = () => {
      Modal.confirm({
        title: "Siz rostdan shu bo'limni o'chirmoqchimisiz?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "",
        okText: "Ha",
        okType: "danger",
        cancelText: "Yo'q",

        onOk() {
          console.log("OK");
        },

        onCancel() {
          console.log("Cancel");
        },
      });
    };
    return {
      showDeleteConfirm,
      //--------------------------
      filterOption,
      allDate, //barcha datalar
      allTables, //jadvallar
      cancel,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.attendanseJournalPage {
  .table-row {
    grid-template-columns: 50px 100px auto 100px 150px 150px 60px;
    @include mobile() {
      grid-template-columns: 50px 100px 200px 100px 120px 120px 60px;
    }
  }
  .content-table {
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
}
</style>