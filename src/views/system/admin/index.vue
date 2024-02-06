<template>
  <div pagetitle="'Adminstratorlar'" class="adminPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Adminstratorlar</h5>
          <div class="panel-toggles">
            <router-link
              class="btns c-save py-1.5 px-4 me-3"
              to="/system/admin/create"
            >
              <i
                class="
                  mdi mdi-account-plus-outline
                  font-size-14
                  align-middle
                  me-2
                "
              ></i
              >Admin yaratish
            </router-link>
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i
              >Export
            </button>
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

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsRoles"
                  @change="handleChange"
                  allow-clear
                >
                </a-select>
              </a-space>
              <label for="yu">Rolni tanlang</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">To'liq ism  / Login  / Email bo'yicha qidirish</label>
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
                <th>Login</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Holati</th>
                <th>{{ $t("Created_At") }}</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row d-grid w-100"
                v-for="element in allTables.tebleEmployees"
                :key="element.id"
              >
                <td class="cursor-pointer">
                  <router-link to="/system/admin/create"
                    >{{ element.login }} <br />
                    {{ element.employee }}</router-link
                  >
                </td>
                <td>{{ element.role }}</td>
                <td>{{ element.email }}</td>
                <td>{{ element.status }}</td>
                <td>{{ element.createAt }}</td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <router-link
                          to="/employee/employee/employee"
                          ><i
                            class="mdi mdi-pencil font-size-18 text-primary"
                          ></i
                        ></router-link>
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
    return {
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

.adminPage {
  .table-row {
    grid-template-columns: 300px auto 200px 100px 180px 80px;
    @include mobile() {
      grid-template-columns: 300px 200px 200px 100px 120px 80px;
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





