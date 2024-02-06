<template>
  <div pagetitle="'Admin yaratish'" class="creat-admin-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title" style="padding: 7px 0">
            <router-link to="/system/admin"> Adminstratorlar </router-link>
            / Admin yaratish
          </h5>
          <div class="panel-toggles">
            <router-link to="/system/admin" class="btns black-c py-1.5 px-4">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1"></i
              >{{ $t("Prev") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row">
      <div class="col-md-7">
        <div class="card sticky-top" style="top: 100px">
          <div class="card-body">
            <a-form>
              <div class="row">
                <div class="col-md-4">
                  <avatar-input></avatar-input>
                </div>
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Login</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >To'liq ismi</label
                    >
                    <a-input v-model:value="value2" />
                  </div>
                </div>

                <div class="mb-3 col-md-6">
                  <label for="division-name-input" class="form-label"
                    >Email</label
                  >
                  <a-input v-model:value="value2" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="otm-name-input" class="form-label">{{ $t("Contact")}}</label>
                  <a-input
                    class="select"
                    tupe="tel"
                    v-model:value="otmCallInput"
                    placeholder="+998## ###-##-##"
                    v-maska="['+998## ###-##-##', '+998## ###-##-##']"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="division-name-select" class="form-label"
                    >Holati</label
                  >
                  <a-select
                    v-model:value="value"
                    :options="allDate.optionsEmployeeSatatus"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="division-name-select" class="form-label"
                    >Til</label
                  >
                  <a-select
                    v-model:value="value"
                    :options="allDate.optionsLanguage"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="division-name-input" class="form-label"
                    ><a-checkbox
                      v-model:checked="checkRadio"
                      class="me-2"
                    ></a-checkbox
                    >Parolni o'zgartirish</label
                  >
                  <a-input-password
                    :disabled="!checkRadio"
                    v-model:value="value"
                    placeholder="Parolni kiriting"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="division-name-input" class="form-label"
                    >Parolni tasdig'i</label
                  >
                  <a-input-password
                    :disabled="!checkRadio"
                    v-model:value="value"
                    placeholder="Parolni tasdiqlash"
                  />
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btns c-delete me-1">
                    <i
                      class="mdi mdi-trash-can font-size-14 align-middle me-1"
                    ></i
                    >{{ $t("Remove") }}
                  </button>
                  <router-link class="btns c-save" to="/employee/employee/edit-accaunt">
                    <i
                      class="
                        mdi mdi-content-save-edit-outline
                        font-size-14
                        align-middle
                        me-1
                      "
                    ></i
                    >O'zgartirish
                  </router-link>
                </div>
              </div>
            </a-form>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>{{ $t("Name") }}</th>
                    <th>{{ $t("Code") }}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="(element, index) in allTables.tableUserRoles"
                    :key="index"
                  >
                    <td>{{ element.name }}</td>
                    <td>{{ element.code }}</td>
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
            </div>
          </div>
        </div>
        <span class="element-count"
          >1-{{ allTables.tableUserRoles.length }}/ {{ $t("Total_Point") }}:
          {{ allTables.tableUserRoles.length }}</span
        >
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { ref, reactive } from "vue";
import Swal from "sweetalert2";
import { allDate, allTables } from "../../data";
// import avatarInput from "../../../../components/avatarInput";

export default {
  setup() {
    const checkRadio = ref(false);
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
      checkRadio,
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
    
    avatarInput,
  },
};
</script>

<style lang="scss">
.creat-admin-page {
  .table-row {
    grid-template-columns: auto 150px 60px;
    @include mobile() {
      grid-template-columns: 150px 150px 60px;
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





