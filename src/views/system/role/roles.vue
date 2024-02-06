<template>
  <div pagetitle="'Tizim jurnali'" class="rol-components-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/system/role"> Tizim rollari </router-link>
            / Tizim resurslari
          </h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3">
              <i class="mdi mdi-reload font-size-14 align-middle me-1"></i
              >Resueslarni qayta indekslash
            </button>
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
            <router-link to="/system/role" class="btns black-c py-1.5 px-4">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1"></i
              >{{ $t("Prev") }}
            </router-link>
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
            <div class="my-2 col-xl-10 form--item">
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

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>{{$t('Group')}}</th>
                <th>{{ $t("Name") }}</th>
                <th>Yo'l</th>
                <th>{{ $t("Updated_At") }}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="element in allTables.optionsResourse"
                :key="element.id"
              >
                <td>{{ element.group }}</td>
                <td>{{ element.name }}</td>
                <td>{{ element.way }}</td>
                <td>{{ element.createAt }}</td>
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
          <!-- ----------------start pagenation-------------------- -->
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
          <!-- -----------------end-pagenation--------------------- -->
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { ref } from "vue";
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
    // -------------------ACTION---------------------
    return {
      current: ref(1),
      cancel, //actons delete
      allDate,
      allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">

.rol-components-page {
  .table-row {
    grid-template-columns: 100px 200px auto 200px 60px;
    @include mobile() {
      grid-template-columns: 100px 200px 200px 200px 60px;
    }
    td,
    th {
      &:first-child {
        justify-content: start;
      }
    }
  }
  .modal-dialog {
    max-width: $ipad_pro !important;
  }
  .cursor-pointer {
    cursor: pointer;
  }

  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
</style>





