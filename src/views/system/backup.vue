<template>
  <div pagetitle="`Tizimni arxivlash`" class="backupPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title" style="padding: 7px 0">Tizimni arxivlash</h5>
          <div class="panel-toggles">
            <div class="filterBlock"></div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th><b>Nomi</b></th>
                <th><b>Xajmi</b></th>
                <th><b>Vaqti</b></th>
                <th><b>Action</b></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="element in allTables.tableBackup"
                :key="element.id"
              >
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.size }}
                </td>
                <td>
                  {{ element.time }}
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-primary" type="danger"
                          ><i class="mdi mdi-download-circle font-size-18"></i
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
    <!-------END TABLE 1---------------------------------------->
  </div>
</template>

<script>

import { reactive } from "vue";
import { allDate, allTables } from "../data";
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
    const formTeacherRating = reactive({
      educationYear: undefined,
      semester: undefined,
      curriculum: undefined,
      group: undefined,
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    //----------------------------------
    return {
      cancel,
      formTeacherRating, //validation add
      onFinish, //validation
      onFinishFailed, //validation
      //--------------------------
      filterOption,
      allDate: allDate, //barcha datalar
      allTables: allTables, //jadvallar
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.backupPage {
  .table-row {
    grid-template-columns: auto 250px 250px 80px;
    @include mobile() {
      grid-template-columns: 300px 250px 250px 80px;
    }
    th,
    td {
      &:first-child {
        justify-content: start;
      }
    }
  }
}
</style>