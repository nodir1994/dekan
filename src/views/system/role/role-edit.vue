<template>
  <div pagetitle="'Tizim resurslari'" class="rol-edit-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title" style="padding: 7px 0">
            <router-link to="/system/role"> Tizim rollari </router-link>
            / Bugalteriya
          </h5>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row">
      <div class="col-md-4">
        <div class="card sticky-top" style="top: 100px">
          <div class="card-body">
            <a-form
              :model="formEditRole"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item class="mb-3" name="name">
                <label for="fakulty-name-input" class="form-label"
                  >Nomi<sup class="ms-1">⚬</sup></label
                >
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formEditRole.nameFaculty"
                />
              </a-form-item>

              <a-form-item class="mb-3" name="code">
                <label for="fakulty-name-input" class="form-label">{{ $t("Code")}}</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formEditRole.code"
                  disabled="true"
                />
              </a-form-item>

              <a-form-item class="mb-3" name="status">
                <label for="fakultet-sort-input" class="form-label">{{ $t("Publication_Property_Type") }}</label>
                <a-select
                  autocomplete="off"
                  v-model:value="formEditRole.status"
                  :options="allDate.optionsStatus"
                  style="width: 100%"
                  @change="handlestatus"
                >
                </a-select>
              </a-form-item>

              <div class="d-flex justify-content-end">
                <button class="btns c-save" type="submit">
                  <i
                    class="mdi mdi-content-save font-size-14 align-middle me-1"
                  ></i>
                  {{ $t("Save")}}
                </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>{{$t('Group')}}</th>
                    <th>{{ $t("Name") }}</th>
                    <th>Yo'l</th>
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
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { ref, reactive } from "vue";
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
    const formEditRole = reactive({
      nameFaculty: "",
      kodFaculty: "",
      value: undefined,
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    // -------------------ACTION---------------------
    return {
      formEditRole,
      onFinishFailed,
      onFinish,
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
.rol-edit-page {
  .table-row {
    grid-template-columns: 140px 200px auto 60px;
    @include mobile() {
      grid-template-columns: 100px 200px 200px 60px;
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





