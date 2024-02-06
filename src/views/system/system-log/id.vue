<template>
  <div pagetitle="'Tizim jurnali'" class="system-log-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/system/system-log"> Tizim jurnali </router-link>
            / MG'T-20/3` guruhning `Tarbiya fanlarini o'qitish metodikasi` fani
            boyicha davomati muvaffaqiyatli o'zgartirildi
          </h5>
          <div class="panel-toggles">
            <router-link
              to="/system/system-log"
              class="btns black-c py-1.5 px-4"
            >
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1"></i>{{ $t("Prev") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <JsonEditorVue v-model="value" v-bind="{/* local props & attrs */}" />
      </div>
    </div>
  </div>
</template>

<script>

import { ref } from "vue";
import Swal from "sweetalert2";
import { allDate, allTables } from "../../data";
import JsonEditorVue from "json-editor-vue"

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
    
    JsonEditorVue
  },
};
</script>

<style lang="scss">

.system-log-page {
  .table-row {
    grid-template-columns: 300px 150px 200px auto 180px;
    @include mobile() {
      grid-template-columns: 200px 150px 200px 300px 100px;
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





