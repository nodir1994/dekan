<template>
  <div pagetitle="'Ilmiy faollik'" class="scienActPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Ilmiy faollik</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                class="btns c-save py-1.5 px-4 me-3"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#myModalScientificActivity"
              >
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{$t('Create')}}
              </button>
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
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
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsEducationYear"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsScientificPlatform"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Ilmiy platformani tanlang</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START ADD MODAL---------------------------------------->
    <div
      id="myModalScientificActivity"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Ilmiy faollik</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formScientificActive"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <div class="row">
                <a-form-item
                  class="mb-3"
                  name="educationYear"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >O'quv yilini tanlang</label
                  >
                  <a-select
                    v-model:value="formScientificActive.educationYear"
                    show-search
                    :options="allDate.optionsEducationYear"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item
                  class="mb-3"
                  name="scientificPlatform"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >Ilmiy platforma</label
                  >
                  <a-select
                    v-model:value="formScientificActive.scientificPlatform"
                    show-search
                    :options="allDate.optionsScientificPlatform"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item
                  class="mb-3"
                  name="name"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Profil linki</label
                  >
                  <a-input v-model:value="formScientificActive.name" />
                </a-form-item>

                <a-form-item
                  class="mb-3"
                  name="hIndex"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >h-indeks</label
                  >
                  <a-input v-model:value="formScientificActive.hIndex" />
                </a-form-item>

                <a-form-item
                  class="mb-3"
                  name="hIndex"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Ilmiy ishlar soni</label
                  >
                  <a-input v-model:value="formScientificActive.hIndex" />
                </a-form-item>

                <a-form-item
                  class="mb-3"
                  name="hIndex"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Iqtiboslar soni</label
                  >
                  <a-input v-model:value="formScientificActive.hIndex" />
                </a-form-item>
              </div>
              <!-- -------------------------------------------------- -->
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                   <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
                <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END  ADD MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row">
                <th><strong>Ilmiy platforma</strong></th>
                <th><strong>O'quv yili</strong></th>
                <th><strong>Profil linki</strong></th>
                <th><strong>h-indeks</strong></th>
                <th><strong>Ilmiy ishlar soni</strong></th>
                <th><strong>Iqtiboslar soni</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="(element, index1) in allTables.tableActivity"
                :key="index1"
              >
                <td>
                  {{ element.scientificPlatform }}
                </td>
                <td>
                  {{ element.educationYear }}
                </td>
                <td>
                  {{ element.profileLink }}
                </td>
                <td>
                  {{ element.h_index }}
                </td>
                <td>
                  {{ element.publicationWorkCount }}
                </td>
                <td>
                  {{ element.citationCount }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalScientificActivity"
                        >
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </a>
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
                  <div class="form-check form-switch">
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
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { ref, reactive } from "vue";
import Swal from "sweetalert2";
import { allDate, allTables } from "../../data";

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
              "success",
              "btn btn-success"
            );
          }
        });
    }
    //validation add
    const formScientificActive = reactive({
      name: "",
      educationYear: undefined,
      scientificPlatform: undefined,
      hIndex: "",
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      current: ref(1),
      allTables,
      allDate,
      formScientificActive,
      onFinish,
      onFinishFailed,
      cancel,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.scienActPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 100px 250px 120px 150px 150px 70px 60px;
    @include mobile() {
      grid-template-columns:  200px 100px 250px 120px 150px 150px 70px 60px;
    }
    td, th {
      &:first-child {
        justify-content: start;
      }
    }
  }
}
</style>





