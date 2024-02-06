<template>
  <div pagetitle="'Malaka oshirish'" class="markingGradeTypePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Baho turlari</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalGradeType"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{$t('Create')}}
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

    <!-------START ADD MODAL---------------------------------------->
    <div
      id="myModalGradeType"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Baho turini yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatGradeType"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="markingSystem"
                :rules="[
                  {
                    required: true,
                    message: `Baholash timi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakultet-sort-input" class="form-label"
                  >Baholash tizmi</label
                >
                <a-select
                  autocomplete="off"
                  v-model:value="formCreatGradeType.markingSystem"
                  :options="allDate.markingSystem"
                  style="width: 100%"
                  @change="handleFacultySort"
                  placeholder="Baholash tizimini kiriting"
                >
                </a-select>
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="name"
                :rules="[
                  {
                    required: true,
                    message: `Nomi bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="otm-name-input" class="form-label">Nomi</label>
                <a-input
                  class="select"
                  type="text"
                  v-model:value="formCreatGradeType.name"
                  placeholder="Nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="minLimit"
                :rules="[
                  {
                    required: true,
                    message: `Minimum chegara bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="otm-name-input" class="form-label"
                  >Minimum chegara</label
                >
                <a-input
                  class="select"
                  type="number"
                  v-model:value="formCreatGradeType.minLimit"
                  placeholder="Minimal chegarani kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="maxLimit"
                :rules="[
                  {
                    required: true,
                    message: `Maksimal chegara bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="otm-name-input" class="form-label"
                  >Maksimal chegara</label
                >
                <a-input
                  class="select"
                  type="number"
                  v-model:value="formCreatGradeType.maxLimit"
                  placeholder="Maksimal chegarani kiriting"
                />
              </a-form-item>

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
    <!-------END ADD MODAL---------------------------------------->

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.markingSystem"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Baholash tizimini tanlanng</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu"> Nomi bo'yicha qidirish</label>
            </div>
            <div class="my-2 col-xl-2">
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
              <tr class="table-row-grade-type">
                <th><strong>Nom</strong></th>
                <th><strong>Kod</strong></th>
                <th><strong>Baholash tizmi</strong></th>
                <th><strong>Minimal chegara</strong></th>
                <th><strong>Maksimal chegara</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-grade-type"
                v-for="element in allTables.tableGradeType"
                :key="element.id"
              >
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.kod }}
                </td>
                <td>
                  {{ element.markingSystem }}
                </td>
                <td>
                  {{ element.minLimit }}
                </td>
                <td>
                  {{ element.maxLimit }}
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalGradeType"
                        >
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
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
import { allDate, allTables } from "../../data";

export default {
  setup() {
    const formCreatGradeType = reactive({
      markingSystem: undefined,
      name: "",
      maxLimit: "",
      minLimit: "",
    });

    const formEditEducationYear = reactive({
      educationYears: allDate.optionsEducationYears,
      semestrType: allDate.optionsSemestrType[0],
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formCreatGradeType, //validation add
      formEditEducationYear, //validation edit
      onFinish, //validation
      onFinishFailed, //validation
      current: ref(1),
      checked: ref(false),
      allTables,
      allDate,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.markingGradeTypePage {
  .table-row-grade-type {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 70px 70px auto 170px 170px 60px 70px;
    @include mobile() {
      grid-template-columns: 70px 70px 150px 100px 100px 60px 70px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:first-child {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
      }
    }
  }
}
</style>





