<template>
  <div pagetitle="`Int.mulklar ro'yxati`" class="addPubProPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/scientific-activity/publication-property"
              >Intelektual mulklar /
            </router-link>
            Int.mulklar ro'yxati
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
            <router-link to="/scientific-activity/publication-property"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
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
            <div class="my-2 col-md-10 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">Nashr nomi / muallif bo'yicha qidirish</label>
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

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row">
                <th>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </th>
                <th><strong>#</strong></th>
                <th><strong>Int.mulk nomi</strong></th>
                <th><strong>Mualliflar</strong></th>
                <th><strong>Int. mulk raqami</strong></th>
                <th><strong>Int. mulk turi</strong></th>
                <th><strong>Xodim</strong></th>
                <th><strong>Fayl nomi</strong></th>
                <th><strong>Action</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="(element, index1) in allTables.tablePublication"
                :key="index1"
              >
                <td>
                  <a-checkbox v-model:checked1="checked"></a-checkbox>
                </td>
                <td>
                  {{ element.id }}
                </td>
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.authors }}
                </td>
                <td>
                  {{ element.year }}
                </td>
                <td>
                  {{ element.type }}
                </td>
                <td>
                  {{ element.employee }}
                </td>
                <td>
                  {{ element.fileName }}
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        class="text-danger"
                        type="danger"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalCreatSubject"
                      >
                        <i class="far fa-eye font-size-16 text-primary"></i
                      ></a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <div class="mt-2 d-flex justify-content-between">
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
            <div>
              <button
                class="btns c-save py-2 px-4"
                data-bs-toggle="modal"
                data-bs-target="#myModalStudents"
              >
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("add") }}
              </button>
            </div>
          </div>
          <!-- --------------end pagination--------------------- -->
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import Swal from "sweetalert2";
import { allDate, allTables } from "../../data";

export default {
  setup() {
    //actions delete
    function cancel() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger ml-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Tasdiqni o'zgartirish?",
          icon: "warning",
          confirmButtonText: "Ha, tasdiqlash!",
          cancelButtonText: "Yo'q, bekor qilish!",
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              "Tasdiq o'zgartirildi!",
              "Tasdiqni o'zgartirish muvaffaqiyatli amalga oshirildi!",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Bekor qilindi",
              "Tasdiqni o'zgartirish bekor qilindi :)",
              "error"
            );
          }
        });
    }

    // --------------form-------------------------
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
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      cancel,
      allDate,
      allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.addPubProPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px auto 200px 150px 150px 180px 200px 60px;
    @include mobile() {
      grid-template-columns: 40px 50px 200px 180px 80px 90px 180px 170px 60px;
    }
  }
}
</style>