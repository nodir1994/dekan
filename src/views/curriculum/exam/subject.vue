<template>
  <div pagetitle="'Xaftaliklar'" class="subjectExam">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/exam"
              >Imtihonlar ro'yxati / </router-link
            >Kompyuterni modellashtirish
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/exam/questions"
              ><button class="btns c-save py-1.5 px-4 me-3" type="button">
                Savollar (10)
              </button></router-link
            ><button
              class="btns c-save py-1.5 px-4 me-3"
              data-bs-toggle="modal"
              data-bs-target="#myModalCreateGroup"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>Guruh qo'shish
            </button>
            <router-link to="/curriculum/exam/result"
              ><button class="btns c-save py-1.5 px-4 me-3" type="button">
                Natija (28)
              </button></router-link
            >
            <router-link to="/curriculum/exam"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
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

    <!-------START MODAL-guruh--------------------------------------->
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
            <h5 class="modal-title" id="myModalLabel">guruhni tanlang</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="my-2 col-xl-10 form--item">
                <a-input id="yu" class="form-control" />
                <label for="yu">{{ $t("Search_by_Name") }}</label>
              </div>
              <div class="my-2 col-xl-2">
                <button class="btn-search search-color">
                  <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="content-table">
                <tr class="table-row-group w-100 d-grid">
                  <th>
                    <a-checkbox v-model:checked1="checked"></a-checkbox>
                  </th>
                  <th><b>Nomi</b></th>
                  <th><b>Fakultet</b></th>
                  <th><b>{{ $t('Education_Type') }}</b></th>
                  <th><b>Ta'lim tili</b></th>
                </tr>
                <tbody>
                  <tr
                    class="table-row-group w-100 d-grid"
                    v-for="element in allTables.tableGrroup"
                    :key="element.id"
                  >
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.faculty }}</td>
                    <td>{{ element.educationType }}</td>
                    <td>{{ element.educationLanguage }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- ------------------------------------------------ -->
            <div class="d-flex justify-content-between">
              <div>
                <!-------------START PAGINATION-------------->
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
                        <a class="page-link" href="#"
                          ><i class="mdi mdi-chevron-right"></i
                        ></a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <!-------------END PAGINATION-------------->
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                   <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
                <button class="btns c-save">{{ $t("add") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL--guruh-------------------------------------->

    <!-- -------------start modal ko'rish--------------------- -->
    <div
      id="myModalResult"
      class="modal fade result"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">IO'M-19/2</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <tr class="table-row-result w-100 d-grid">
                  <th>
                    <div class="form-check form-switch my-auto">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        checked
                      />
                    </div>
                  </th>
                  <th><b>{{ $t('Student') }}</b></th>
                  <th><b>Urinishlar</b></th>
                  <th><b>To'g'ri</b></th>
                  <th><b>Foiz</b></th>
                  <th><b>Tugadi</b></th>
                </tr>
                <tbody>
                  <tr
                    class="table-row-result w-100 d-grid"
                    v-for="element in allTables.tableGroupResultExam"
                    :key="element.id"
                  >
                    <td>
                      <div class="form-check form-switch my-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                          v-model="element.active"
                        />
                      </div>
                    </td>
                    <td>{{ element.studen }}</td>
                    <td>{{ element.attempts }}</td>
                    <td>{{ element.correct }}</td>
                    <td>{{ element.percent }}</td>
                    <td>{{ element.finishedAt }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- ------------------------------------------------ -->
            <div class="d-flex justify-content-between">
              <div></div>
              <div class="mt-3">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                   <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL--natija-------------------------------------->

    <div class="card">
      <div class="card-body">
        <a-form
          :model="subjectExamForm"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="row">
            <div class="col-md-6">
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
                  tupe="text"
                  v-model:value="subjectExamForm.name"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="comment"
                :rules="[
                  {
                    required: true,
                    message: `Izox bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="akkreditasiya-info-input" class="form-label"
                  >Izoh</label
                >
                <a-textarea
                  v-model:value="subjectExamForm.comment"
                  :auto-size="{ minRows: 4.5, maxRows: 6 }"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="trainingPlan"
                :rules="[
                  {
                    required: true,
                    message: `O'quv reja bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakultet-sort-input" class="form-label"
                  >{{ $t("Curriculum")}}</label
                >
                <a-select
                  autocomplete="off"
                  v-model:value="subjectExamForm.trainingPlan"
                  :options="allDate.optionsTrainingPlan"
                  style="width: 100%"
                  @change="handleFacultySort"
                  :placeholder="t('Select_Curriculum')"
                >
                </a-select>
              </a-form-item>

              <div class="row">
                <div class="col-md-6">
                  <a-form-item
                    class="mb-3"
                    name="educationYear"
                    :rules="[
                      {
                        required: true,
                        message: `O'quv yili bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="fakultet-sort-input" class="form-label"
                      >{{ $t("Education_Year_Name") }}</label
                    >
                    <a-select
                      autocomplete="off"
                      v-model:value="subjectExamForm.educationYear"
                      :options="allDate.optionsEducationYear"
                      style="width: 100%"
                      @change="handleFacultySort"
                      placeholder="O'quv yilni tanlang"
                    >
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-md-6">
                  <a-form-item
                    class="mb-3"
                    name="semester"
                    :rules="[
                      {
                        required: true,
                        message: `Semestr bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="fakultet-sort-input" class="form-label"
                      >{{ $t("Semester_Name") }}</label
                    >
                    <a-select
                      autocomplete="off"
                      v-model:value="subjectExamForm.semester"
                      :options="allDate.optionsSemestr"
                      style="width: 100%"
                      @change="handleFacultySort"
                      placeholder="Semesterni tanlang"
                    >
                    </a-select>
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <a-form-item
                  class="mb-3 col-md-6"
                  name="examType"
                  :rules="[
                    {
                      required: true,
                      message: `Imtihon turi bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="fakultet-sort-input" class="form-label"
                    >{{ $t("Semester_Name") }}</label
                  >
                  <a-select
                    autocomplete="off"
                    v-model:value="subjectExamForm.examType"
                    :options="allDate.optionsExamType"
                    style="width: 100%"
                    @change="handleFacultySort"
                    placeholder="Imthon turini tanlang"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-6"
                  name="active"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="fakultet-sort-input" class="form-label"
                    >Faol</label
                  >
                  <a-select
                    autocomplete="off"
                    v-model:value="subjectExamForm.active"
                    :options="allDate.optionsActive"
                    style="width: 100%"
                    @change="handleFacultySort"
                    placeholder="Imthon turini tanlang"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-6"
                  name="startAt"
                  :rules="[
                    {
                      required: true,
                      message: `Boshlanish vaqti bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="fakultet-sort-input" class="form-label"
                    >Boshlanish</label
                  >
                  <a-date-picker
                    :show-time="{ format: 'HH:mm' }"
                    format="YYYY-MM-DD HH:mm"
                    :placeholder="['Start Time']"
                    v-model:value="subjectExamForm.startAt"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-6"
                  name="endAt"
                  :rules="[
                    {
                      required: true,
                      message: `Tugash vaqti bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="fakultet-sort-input" class="form-label"
                    >Tugash</label
                  >
                  <a-date-picker
                    :show-time="{ format: 'HH:mm' }"
                    format="DD-MM-YYYY HH:mm"
                    :placeholder="['End Time']"
                    v-model:value="subjectExamForm.endAt"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-6"
                  name="time"
                  :rules="[
                    {
                      required: true,
                      message: `Vaqti bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >Vaqti (daqiqa)</label
                  >
                  <a-input
                    class="select"
                    type="number"
                    v-model:value="subjectExamForm.time"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-6"
                  name="maxPoints"
                  :rules="[
                    {
                      required: true,
                      message: `Max.ball bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >Max.ball</label
                  >
                  <a-input
                    class="select"
                    type="number"
                    v-model:value="subjectExamForm.maxPoints"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="attempts"
                  :rules="[
                    {
                      required: true,
                      message: `Urunushlar bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >Urinishlar</label
                  >
                  <a-input
                    class="select"
                    type="number"
                    v-model:value="subjectExamForm.attempts"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="questionCount"
                  :rules="[
                    {
                      required: true,
                      message: `Savollar soni bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >Savollar soni</label
                  >
                  <a-input
                    class="select"
                    type="number"
                    v-model:value="subjectExamForm.questionCount"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="random"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="fakultet-sort-input" class="form-label"
                    >Tasodifiy</label
                  >
                  <a-select
                    autocomplete="off"
                    v-model:value="subjectExamForm.random"
                    :options="allDate.optionsRandom"
                    style="width: 100%"
                  >
                  </a-select>
                </a-form-item>
              </div>

              <a-form-item
                class="mb-3"
                name="subject"
                :rules="[
                  {
                    required: true,
                    message: `Fan bo'sh bo'lishi mumkin emas!`,
                  },
                ]"
              >
                <label for="fakultet-sort-input" class="form-label"
                  >{{$t('Subjects')}}</label
                >
                <a-select
                  autocomplete="off"
                  v-model:value="subjectExamForm.subject"
                  :options="allDate.optionsSubject"
                  style="width: 100%"
                >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btns c-save py-2 px-4">{{$t("Save")}}</button>
          </div>
        </a-form>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th><strong>{{$t('Group')}}</strong></th>
                <th><strong>Facultet</strong></th>
                <th><strong>Til</strong></th>
                <th><strong>Boshlanish</strong></th>
                <th><strong>Tugash</strong></th>
                <th><strong>Action</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row w-100 d-grid"
                v-for="element in allTables.tableExamInfo"
                :key="element.id"
              >
                <td>
                  {{ element.group }}
                </td>
                <td>
                  {{ element.faculty }}
                </td>
                <td>
                  {{ element.language }}
                </td>
                <td>
                  <a-form-item class="mb-0" name="startAt">
                    <a-date-picker
                      :show-time="{ format: 'HH:mm' }"
                      format="YYYY-MM-DD HH:mm"
                      :placeholder="['Start Time']"
                    />
                  </a-form-item>
                </td>
                <td>
                  <a-form-item class="mb-0" name="startAt">
                    <a-date-picker
                      :show-time="{ format: 'HH:mm' }"
                      format="YYYY-MM-DD HH:mm"
                      :placeholder="['End Time']"
                    />
                  </a-form-item>
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="see__project">
                        <a
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#myModalResult"
                        >
                          <i
                            class="far fa-eye font-size-14 b-actions c-see"
                          ></i>
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
  </div>
</template>

<script>

import { ref, reactive } from "vue";
import { allDate, allTables } from "../../data";
import Swal from "sweetalert2";

export default {
  setup() {
    // ------------delete modal oyna--------------------
    function cancel() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: "btn btn-success",
          confirmButton: "btn btn-danger  me-2",
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
    const subjectExamForm = reactive({
      name: "",
      comment: "",
      trainingPlan: undefined,
      educationYear: undefined,
      semester: undefined,
      examType: undefined,
      active: allDate.optionsActive[0],
      time: "",
      maxPoints: "",
      attempts: "",
      questionCount: "",
      random: allDate.optionsRandom[0],
      subject: undefined,
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
      subjectExamForm, //validation add
      formEditEducationYear, //validation edit
      onFinish, //validation
      onFinishFailed, //validation
      cancel,
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
.subjectExam {
  .table-row-group {
    grid-template-columns: 40px 100px auto 100px 100px;
    @include mobile() {
      grid-template-columns: 40px 100px 150px 100px 100px;
    }
  }
  .table-row {
    grid-template-columns: 120px auto 150px 200px 200px 100px;
    @include mobile() {
      grid-template-columns: 100px 120px 150px 150px 150px 100px;
    }
  }
  .table-row-result {
    grid-template-columns: 50px auto 120px 120px 120px 200px;
    @include mobile() {
      grid-template-columns: 50px 200px 120px 120px 120px 200px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-child(1),
      :last-child {
        display: flex;
        justify-content: left;
      }
    }
  }
  .modal-dialog {
    max-width: $mobile;
  }
  .result {
    .modal-dialog {
      max-width: $ipad;
    }
  }
}
</style>





