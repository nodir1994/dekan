<template>
  <div pagetitle="`Int.mulk qo'shish`" class="createPublicationPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/scientific-activity/publication-property"
              >Intelektual mulklar /
            </router-link>
            Int.mulk qo'shish
          </h5>
          <div class="panel-toggles">
            <router-link to="/scientific-activity/publication-property"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card mb-5">
      <div class="card-body">
        <a-form
          :model="formCreateOrder"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="row">
            <div class="col-md-10">
              <div class="row">
                <a-form-item
                  class="mb-3 col-md-8"
                  name="employee"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Xodim</label
                  >
                  <a-input v-model:value="formCreateOrder.employee" />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="typeNashr"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >Int.mulk turi</label
                  >
                  <a-select
                    v-model:value="formCreateOrder.typeNashr"
                    :options="allDate.optionsPublicationCategory"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                    placeholder="Int.mulk turini tanlang"
                  >
                  </a-select>
                </a-form-item>

                <a-form-item
                  class="mb-3"
                  name="nameNashr"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Int.mulk nomi</label
                  >
                  <a-input v-model:value="formCreateOrder.nameNashr" />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-8"
                  name="count"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Int.mulk raqami</label
                  >
                  <a-input
                    type="number"
                    v-model:value="formCreateOrder.count"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="nashrDate"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                  v-bind="config"
                >
                  <label for="division-name-input" class="form-label"
                    >Int.mulk sanasi</label
                  >
                  <a-date-picker
                    placeholder="YYYY-MM-DD"
                    v-model:value="formCreateOrder.nashrDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                  />
                </a-form-item>
                <a-form-item
                  class="mb-3 col-md-3"
                  name="count"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Mualliflar soni</label
                  >
                  <a-input
                    type="number"
                    v-model:value="formCreateOrder.count"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-9"
                  name="emloyeess"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Mualliflar</label
                  >
                  <a-input
                    placeholder="Masalan: Samadov, Faxriddin Hakimovich; Baxtiyorov, Laziz Nematovich"
                    v-model:value="formCreateOrder.emloyeess"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-8"
                  name="emloyeess"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-input" class="form-label"
                    >Nashr parametrlari</label
                  >
                  <a-input v-model:value="formCreateOrder.emloyeess" />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="eduYear"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <label for="division-name-select" class="form-label"
                    >{{ $t("Education_Year_Name") }}</label
                  >
                  <a-select
                    v-model:value="formCreateOrder.eduYear"
                    :options="allDate.optionsEducationYear"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                    :placeholder="t('Choose_Education_Year')"
                  >
                  </a-select>
                </a-form-item>
              </div>
            </div>
            <div class="col-md-2">
              <a-form-item>
                <label for="division-name-select" class="form-label"
                  >Fay nomi</label
                >
                <a-form-item
                  name="dragger"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <a-upload-dragger
                    v-model:fileList="formCreateOrder.dragger"
                    name="files"
                    accept=".pdf"
                    action="/upload.do"
                  >
                    <p class="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p class="ant-upload-text">Faylni yuklang!</p>
                    <i class="mdi mdi-download fa-3x"></i>
                  </a-upload-dragger>
                </a-form-item>
              </a-form-item>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btns c-delete me-1"> <i class="mdi mdi-trash-can font-size-14 align-middle me-1"></i>{{ $t("Remove") }}</button>
            <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
          </div>
        </a-form>
      </div>
    </div>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th><strong>#</strong></th>
                <th><strong>Xodim</strong></th>
                <th><strong>Yaratilgan</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Faol</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row d-grid w-100">
                <td>1</td>
                <td>BOYMURODOV ADHAM XUSHIMQULOVICH</td>
                <td>02.10.2021 11:25:53</td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
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
          <div class="d-flex justify-content-end">
            <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { ref, reactive } from "vue";
import { allDate } from "../../data";
import Swal from "sweetalert2";
export default {
  setup() {
    function cancel() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger me-2",
          cancelButton: " btn btn-success",
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
    const formCreateOrder = reactive({
      nameFaculty: undefined,
      decreeType: undefined,
      orderName: "",
      decreeObjective: "",
      decreeBody: "",
      orderDate: undefined,
      orderNumber: undefined,
      dragger: undefined,
      status: allDate.optionsStatus[0],
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      cancel,
      current: ref(1),
      formCreateOrder,
      onFinish,
      onFinishFailed,
      allDate,
    };
  },
  components: {
    
    // AvatarInput,
  },
};
</script>

<style lang="scss">
.createPublicationPage {
  .table-row {
    grid-template-columns: 50px auto 200px 60px 60px;
    @media (max-width: 767px) {
      grid-template-columns: 50px 200px 200px 60px 60px;
    }
    th,
    td {
      &:nth-child(2) {
        justify-content: start;
      }
    }
  }
}
.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>





