<template>
  <div pagetitle="'Malaka oshirish'" class="academicGroupPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Teacher_professional_development") }}</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalCreateGroup"
            >
              <i class="mdi mdi-account-plus font-size-14 align-middle me-1"></i>{{ $t("add") }}
            </button>
            <div class="filterBlock">
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
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsYear"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsTrainingPlan"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{$t('Search_by_Name_Passport_Employee_ID')}}</label>
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

    <!-------START ADD MODAL---------------------------------------->
    <div
      id="myModalCreateGroup"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Guruh yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreateGroup"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <div class="row">
                <a-form-item
                  class="mb-3"
                  name="groupName"
                  :rules="[
                    {
                      required: true,
                      message: `Nomi bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Nomi</label
                  >
                  <a-input v-model:value="formCreateGroup.groupName" />
                </a-form-item>
                <a-form-item
                  class="mb-3"
                  name="nameTrainingPlan"
                  :rules="[
                    {
                      required: true,
                      message: `O'quv reja bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >{{ $t("Curriculum")}}</label
                  >
                  <a-select
                    v-model:value="formCreateGroup.nameTrainingPlan"
                    show-search
                    :options="allDate.optionsTrainingPlan"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>
                <a-form-item
                  class="mb-3"
                  name="educationLang"
                  :rules="[
                    {
                      required: true,
                      message: `Ta'lim tili bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >{{ $t("Education_Language")}}</label
                  >
                  <a-select
                    v-model:value="formCreateGroup.educationLang"
                    :options="allDate.optionsEducationLang"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
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

    <!-------START EDIT MODAL---------------------------------------->
    <div
      id="myModalEditGroup"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">BIO-20/1</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formEditGroup"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <div class="row">
                <a-form-item
                  class="mb-3"
                  name="groupName"
                  :rules="[
                    {
                      required: true,
                      message: `Nomi bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Nomi</label
                  >
                  <a-input v-model:value="formEditGroup.groupName" />
                </a-form-item>
                <a-form-item
                  class="mb-3"
                  name="nameTrainingPlan"
                  :rules="[
                    {
                      required: true,
                      message: `O'quv reja bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >{{ $t("Curriculum")}}</label
                  >
                  <a-select
                    v-model:value="formEditGroup.nameTrainingPlan"
                    show-search
                    :options="allDate.optionsTrainingPlan"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>
                <a-form-item
                  class="mb-3"
                  name="educationLang"
                  :rules="[
                    {
                      required: true,
                      message: `Ta'lim tili bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >{{ $t("Education_Language")}}</label
                  >
                  <a-select
                    v-model:value="formEditGroup.educationLang"
                    :options="allDate.optionsEducationLang"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
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
                <button @click="cancel" class="btns c-delete me-1">
                  O'chirish
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
    <!-------END EDIT MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row-academic-group">
                <th>#</th>
                <th><a-checkbox v-model:checked1="checked"></a-checkbox></th>
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("Structure_Faculty") }}</th>
                <th>{{ $t("by_Specialty") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("Education_Form") }}</th>
                <th>{{ $t("Education_Language") }}</th>
                <th>{{$t('action')}}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-academic-group"
                v-for="element in allTables.tableGroups"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td><a-checkbox v-model:checked1="checked"></a-checkbox></td>
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.faculty }}
                </td>
                <td>{{ element.specialty }}</td>
                <td>
                  {{ element.educationType }}
                </td>
                <td>
                  {{ element.educationForm }}
                </td>
                <td>
                  {{ element.educationLang }}
                </td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalEditGroup"
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
                <!-- ---------END ACTIONS-------------- -->
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
    //validation add
    const formCreateGroup = reactive({
      groupName: "",
      nameTrainingPlan: undefined,
      educationLang: undefined,
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    //validation edit
    const formEditGroup = reactive({
      groupName: "BIO-20/1",
      nameTrainingPlan: "IO'M_2021-2022",
      educationLang: "O'zbek",
    });
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
    return {
      current: ref(1),
      cancel, //delete modal
      formCreateGroup, //validation add
      formEditGroup, //validation edit
      onFinish, //validation value
      onFinishFailed, //validation error
      allDate: allDate, //
      allTables: allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">

.academicGroupPage {
  .table-row-academic-group {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 40px auto 120px 120px 120px 100px 120px 70px 60px;
    @include mobile() {
      grid-template-columns: 50px 40px 200px 100px 100px 100px 90px 100px 70px 60px;
    }
  }
}
</style>





