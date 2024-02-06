<template>
  <div pagetitle="'Fayl menejer'" class="login-history-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Fayl menejer</h5>
          <div class="panel-toggles">
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { ref } from "vue";
import Swal from "sweetalert2";
import { allDate, allTables } from "../data";

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
.login-history-page {
  .table-row {
    grid-template-columns: auto 200px 200px 200px 60px;
    @include mobile() {
      grid-template-columns: 300px 180px 180px 180px 60px;
    }
    td,
    th {
      justify-content: start;
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





