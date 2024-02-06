<template>
  <div pagetitle="'OTM haqida'" class="info-university-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Structure_University")}}</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <i class="mdi mdi-square-edit-outline me-2 font-size-14"></i>{{ $t("Decree_Edit")}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START MODAL---------------------------------------->
    <div
      id="myModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("University_Data_Edit")}}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formHeiInfo"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <!-- --------------------------- -->
              <div class="row">
                <!-- ----otm kod---------- -->
                <div class="mb-3">
                  <label for="otm-kod-input" class="form-label">{{ $t("Code")}}</label>
                  <a-input
                    class="select"
                    tupe="text"
                    v-model:value="otmKod"
                    :placeholder="$t('University_Code')"
                    :disabled="true"
                  />
                </div>
                <!-- otm nomi uz ru en -->
                <a-form-item
                  class="col-md-4 mb-3"
                  name="heiNameUz"
                >
                  <label for="otm-name-input" class="form-label"
                    >{{ $t("Name_Uz")}}<sup>⚬</sup></label
                  >
                  <a-input
                    class="select"
                    tupe="text"
                    v-model:value="formHeiInfo.heiNameUz"
                    :placeholder="$t('University_Name')"
                  />
                </a-form-item>

                <a-form-item
                  class="col-md-4 mb-3"
                  name="heiNameRu"
                  :rules="[
                    {
                      required: true,
                      message: `Имя OTM не может быть пустым!`,
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >{{ $t("Name_RU")}}<sup>⚬</sup></label
                  >
                  <a-input
                    class="select"
                    tupe="text"
                    v-model:value="formHeiInfo.heiNameRu"
                    placeholder="Имя OTM"
                  />
                </a-form-item>

                <a-form-item
                  class="col-md-4 mb-3"
                  name="heiNameEn"
                  :rules="[
                    {
                      required: true,
                      message: `OTM name can not be empty!`,
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >{{ $t("Name_EN")}}<sup>⚬</sup></label
                  >
                  <a-input
                    class="select"
                    tupe="text"
                    v-model:value="formHeiInfo.heiNameEn"
                    placeholder="OTM name"
                  />
                </a-form-item>

                <!-- otm kontakti -->
                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiTelNumber"
                  :rules="[{ required: true, message: `Kontaktni kiriting!` }]"
                >
                  <label for="otm-name-input" class="form-label">{{ $t("Contact")}}</label>
                  <a-input
                    class="select"
                    tupe="tel"
                    v-model:value="formHeiInfo.heiTelNumber"
                    placeholder="+998## ###-##-##"
                    v-maska="['+998## ###-##-##', '+998## ###-##-##']"
                  />
                </a-form-item>
                <!-- otm stir -->
                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiStir"
                  :rules="[{ required: true, message: `STIR ni kiriting!` }]"
                >
                  <label for="otm-stir-input" class="form-label">STIR</label>
                  <a-input
                    v-model:value="formHeiInfo.heiStir"
                    type="text"
                    v-maska="{
                      mask: '---------',
                      tokens: { '-': { pattern: /[0-9]/ } },
                    }"
                    class="form-control"
                    placeholder="STIR"
                    id="otm-stir-input"
                  />
                </a-form-item>
                <!-- otm joylashgan hudud  -->
                <a-form-item class="mb-3 col-md-4">
                  <label for="fakultet-territoy-input" class="form-label"
                    >{{ $t("by_Region")}}</label
                  >
                  <a-select
                    v-model:value="value"
                    :options="allDate.optionsProvince"
                    show-search
                    :filter-option="filterOption"
                    style="width: 100%; border-radius: 10px !important"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>
                <!-- otm joylashgan shaxar -->
                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiSity"
                  :rules="[{ required: true, message: `Shaharni kiriting!` }]"
                >
                  <label for="otm-sity-input" class="form-label"
                    >{{ $t("address")}} (UZ)<sup>⚬</sup></label
                  >
                  <a-input
                    v-model:value="formHeiInfo.heiSity"
                    type="text"
                    class="form-control"
                    placeholder="Shaharni kiriting"
                    id="otm-sity-input"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiSity"
                  :rules="[{ required: true, message: `Shaharni kiriting!` }]"
                >
                  <label for="otm-sity-input" class="form-label"
                    >{{ $t("address")}} (RU)<sup>⚬</sup></label
                  >
                  <a-input
                    v-model:value="formHeiInfo.heiSity"
                    type="text"
                    class="form-control"
                    placeholder="Shaharni kiriting"
                    id="otm-sity-input"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiSity"
                  :rules="[{ required: true, message: `Shaharni kiriting!` }]"
                >
                  <label for="otm-sity-input" class="form-label"
                    >{{ $t("address")}} (EN)<sup>⚬</sup></label
                  >
                  <a-input
                    v-model:value="formHeiInfo.heiSity"
                    type="text"
                    class="form-control"
                    placeholder="Shaharni kiriting"
                    id="otm-sity-input"
                  />
                </a-form-item>
                <!-- otm turi -->
                <a-form-item class="mb-3 col-md-6">
                  <label for="fakultet-type-input" class="form-label"
                    >{{ $t("Ownership")}}</label
                  >
                  <a-select
                    v-model:value="value"
                    :options="allDate.optionsHeiType"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>
                <!-- otm shakli -->
                <a-form-item class="mb-3 col-md-6">
                  <label for="fakultet-shape-input" class="form-label"
                    >{{ $t("University_Form")}}</label
                  >
                  <a-select
                    v-model:value="value"
                    :options="allDate.optionsHeiShape"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                  >
                  </a-select>
                </a-form-item>
                <!-- pochta manzili  -->
                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiEmail"
                  :rules="[
                    { required: true, message: `Pochta manzilini kiriting!` },
                  ]"
                >
                  <label for="email-address-input" class="form-label"
                    >{{ $t("Mailing_Address")}} (UZ)<sup>⚬</sup></label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.heiEmail"
                    placeholder="Pochta manzilini kiriting"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiEmail"
                  :rules="[
                    { required: true, message: `Pochta manzilini kiriting!` },
                  ]"
                >
                  <label for="email-address-input" class="form-label"
                    >{{ $t("Mailing_Address")}} (RU)<sup>⚬</sup></label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.heiEmail"
                    placeholder="Pochta manzilini kiriting"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="heiEmail"
                  :rules="[
                    { required: true, message: `Pochta manzilini kiriting!` },
                  ]"
                >
                  <label for="email-address-input" class="form-label"
                    >{{ $t("Mailing_Address")}} (EN)<sup>⚬</sup></label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.heiEmail"
                    placeholder="Pochta manzilini kiriting"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>
                <!-- bank ma'lumotlari -->
                <a-form-item
                  class="mb-3"
                  name="heiBankDetails"
                  :rules="[
                    {
                      required: true,
                      message: `Bank ma'lumotlarini kiriting!`,
                    },
                  ]"
                >
                  <label for="bank-info-input" class="form-label"
                    >{{ $t("bank_Details")}}</label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.heiBankDetails"
                    placeholder="Bank ma'lumotlarini kiriting"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                  />
                </a-form-item>
                <!-- akkreditatsiya  malumotlari -->
                <a-form-item
                  class="mb-3 col-md-4"
                  name="akk"
                  :rules="[
                    {
                      required: true,
                      message: `Akkreditasiya ma'lumotlarini kiriting!`,
                    },
                  ]"
                >
                  <label for="akkreditasiya-info-input" class="form-label"
                    >{{ $t("accreditation_Info")}} (UZ)<sup>⚬</sup></label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.akk"
                    placeholder="Akkreditasiya ma'lumotlarini kiriting"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="akk"
                  :rules="[
                    {
                      required: true,
                      message: `Akkreditasiya ma'lumotlarini kiriting!`,
                    },
                  ]"
                >
                  <label for="akkreditasiya-info-input" class="form-label"
                    >{{ $t("accreditation_Info")}} (RU)<sup>⚬</sup></label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.akk"
                    placeholder="Akkreditasiya ma'lumotlarini kiriting"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>

                <a-form-item
                  class="mb-3 col-md-4"
                  name="akk"
                  :rules="[
                    {
                      required: true,
                      message: `Akkreditasiya ma'lumotlarini kiriting!`,
                    },
                  ]"
                >
                  <label for="akkreditasiya-info-input" class="form-label"
                    >{{ $t("accreditation_Info")}} (EN)<sup>⚬</sup></label
                  >
                  <a-textarea
                    v-model:value="formHeiInfo.akk"
                    placeholder="Akkreditasiya ma'lumotlarini kiriting"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
                <button class="btns c-save"><i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>{{ $t("Save")}}</button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL---------------------------------------->

    <div class="col-xl-12 pb-1">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table-vertical"
              v-for="info in allTables.unversiytInfos"
              v-bind:key="info.id"
            >
              <tr class="table-row d-grid w-100">
                <th scope="row">{{ $t("Code")}}</th>
                <td>{{ info.kod }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("Name") }} <sup class="ps-1">⚬</sup></th>
                <td>{{ info.nomi }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("by_Region") }}</th>
                <td>{{ info.hudud }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("address") }} <sup class="ps-1"> ⚬</sup></th>
                <td>{{ info.shahar }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>STIR</th>
                <td>{{ info.stir }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("Contact") }}</th>
                <td>{{ info.kontakt }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>Rektor</th>
                <td>{{ info.rektor }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("Ownership") }}</th>
                <td>{{ info.otmTuri }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("University_Form") }}</th>
                <td>{{ info.otmShakli }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("Mailing_Address") }} <sup class="ps-1"> ⚬</sup></th>
                <td>{{ info.email }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("bank_Details") }}</th>
                <td>{{ info.bank }}</td>
              </tr>
              <tr class="table-row d-grid w-100">
                <th>{{ $t("accreditation_Info") }}<sup class="ps-1"> ⚬</sup></th>
                <td>{{ info.akk }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { reactive } from "vue";
import { allDate, allTables } from "../../data";
export default {
  setup() {
    const otmKod = "001";
    const formHeiInfo = reactive({
      heiNameUz: "",
      heiNameRu: "",
      heiNameEn: "",
      akk: "",
      heiTelNumber: "",
      heiStir: "",
      heiSity: "",
      heiEmail: "",
      heiBankDetails: "",
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      onFinish,
      onFinishFailed,
      formHeiInfo,
      otmKod,
      allDate,
      allTables,
    };
  },
  components: {
    
  },
};
</script>


<style lang="scss" scpoed>
.info-university-page {
  .table-row {
    grid-template-columns: 220px auto;
    @include mobile() {
      grid-template-columns: 150px auto;
    }
  }
  .modal-dialog {
    max-width: $ipad-pro;
  }
}
</style>