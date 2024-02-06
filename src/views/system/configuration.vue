<template>
  <div pagetitle="`Tizimni sozlamalari`" class="configurationPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title" style="padding: 7px 0">Tizimni sozlamalari</h5>
          <div class="panel-toggles">
            <div class="filterBlock"></div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-- ----------------tab--------------------- -->
    <div class="card">
      <div class="card-body">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="tab"
              href="#home"
              role="tab"
            >
              <span class="d-block d-sm-none p-0"
                ><i class="mdi mdi-web align-middle"></i
              ></span>
              <span class="d-none d-sm-block"
                ><i class="mdi mdi-web align-middle me-1"></i>Tizm tillari</span
              >
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              data-bs-toggle="tab"
              href="#messages"
              role="tab"
            >
              <span class="d-block d-sm-none p-0"
                ><i class="mdi mdi-cog align-middle"></i
              ></span>
              <span class="d-none d-sm-block"
                ><i class="mdi mdi-cog align-middle me-1"></i>Umumiy
                sozlamalar</span
              >
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="tab"
              href="#settings"
              role="tab"
            >
              <span class="d-block d-sm-none p-0"
                ><i class="mdi mdi-lock align-middle"></i
              ></span>
              <span class="d-none d-sm-block"
                ><i class="mdi mdi-lock align-middle me-1"></i>Integratiya</span
              >
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content p-3 text-muted">
          <div class="tab-pane" id="home" role="tabpanel">
            <a-form autocomplete="off">
              <a-form-item class="mb-3" name="endDate" v-bind="config">
                <a-checkbox v-model:checked="checked" class="mb-3"
                  >O'zbek (lotin)</a-checkbox
                >
                <a-checkbox v-model:checked="checked" class="mb-3"
                  >Rus</a-checkbox
                >
                <a-checkbox v-model:checked="checked" class="mb-3"
                  >Ingliz</a-checkbox
                >
              </a-form-item>
            </a-form>
          </div>
          <div class="tab-pane active" id="messages" role="tabpanel">
            <a-form
              :model="formCreatSemester"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <div class="row">
                <div class="col-md-2">
                  <label for="division-name-select" class="form-label"
                    >Tizim Logosi (000 X 000 px)</label
                  >
                  <avatar-input></avatar-input>
                </div>
                <div class="col-md-5">
                  <a-form-item class="mb-3" name="name">
                    <label for="otm-name-input" class="form-label"
                      >Anliz ID</label
                    >
                    <a-input
                      class="select"
                      tupe="text"
                      v-model:value="formCreatSemester.name"
                      placeholder="Nomini kiriting"
                    />
                  </a-form-item>
                  <a-form-item class="mb-3" name="name">
                    <label for="otm-name-input" class="form-label"
                      >Yuklanadigan fayning maksimal hajmi (Mb)</label
                    >
                    <a-input
                      class="select"
                      tupe="text"
                      v-model:value="formCreatSemester.name"
                      placeholder="Nomini kiriting"
                    />
                  </a-form-item>
                  <a-form-item
                    class="mb-3"
                    name="semester"
                    :rules="[
                      {
                        required: true,
                        message: `Maydon bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >Shartnoma summasini hisoblash usuli</label
                    >
                    <a-select
                      v-model:value="formCreatSemester.semester"
                      :options="allDate.optinsContractPriceCalculation"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                     :placeholder="t('Choose_Semester')"
                    >
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-md-5">
                  <a-form-item class="mb-3" name="name">
                    <label for="otm-name-input" class="form-label"
                      >Qayta o'qish kredit miqdori</label
                    >
                    <a-input
                      class="select"
                      tupe="text"
                      v-model:value="formCreatSemester.name"
                      placeholder="Nomini kiriting"
                    />
                  </a-form-item>
                  <div class="d-flex flex-column justify-content-start">
                    <a-checkbox v-model:checked="checked" class="mb-3 ml-0"
                      >Davomat kiritishni cheklash</a-checkbox
                    >
                    <a-checkbox v-model:checked="checked" class="mb-3 ms-0"
                      >Baholarni kiritishni cheklash</a-checkbox
                    >
                    <a-checkbox v-model:checked="checked" class="mb-3 ms-0"
                      >Dars jadvali nazorati</a-checkbox
                    >
                  </div>
                </div>
              </div>
            </a-form>
          </div>
          <div class="tab-pane" id="settings" role="tabpanel">
            <a-form
              :model="formCreatSemester"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <div class="row">
                <div class="mb-2 col-md-6">
                  <label for="division-name-input" class="form-label"
                    ><a-checkbox
                      v-model:checked="checkRadio"
                      class="me-2"
                    ></a-checkbox
                    >Login</label
                  >
                  <a-input
                    :disabled="!checkRadio"
                    v-model:value="value"
                    placeholder="Yangi parol"
                  />
                </div>
                <div class="mb-2 col-md-6">
                  <label for="division-name-input" class="form-label"
                    >Parol</label
                  >
                  <a-input-password
                    :disabled="!checkRadio"
                    v-model:value="value"
                    placeholder="Parol tasdig'i"
                  />
                </div>
              </div>
            </a-form>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btns c-save" type="submit">
            <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
            Saqlash
          </button>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------- -->
  </div>
</template>

<script>

import { ref, reactive } from "vue";
import { allDate, allTables } from "../data";
import Swal from "sweetalert2";
// import avatarInput from "../../../components/avatarInput";

export default {
  setup() {
    const checkRadio = ref(false);
    const formCreatSemester = reactive({
      semester: undefined,
      lavel: undefined,
      educationYear: undefined,
      trainingPlan: undefined,
      startDate: undefined,
      endDate: undefined,
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
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //-----------------------------------
    return {
      formEditEducationYear,
      formCreatSemester,
      onFinish,
      onFinishFailed,
      cancel,
      checkRadio,
      //--------------------------
      filterOption,
      allDate: allDate, //barcha datalar
      allTables: allTables, //jadvallar
    };
  },
  components: {
    
    avatarInput,
  },
};
</script>

<style lang="scss">
.configurationPage {
  .table-row {
    grid-template-columns: auto 250px 250px 80px;
    @include mobile() {
      grid-template-columns: 300px 250px 250px 80px;
    }
    th,
    td {
      &:first-child {
        justify-content: start;
      }
    }
  }
}
</style>