<template>
  <div pagetitle="`Bandlik statistikasi`" class="teacherRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Bandlik statistikasi</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <a-form
              :model="formTeacherRating"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <div class="row">
                <a-form-item
                  class="my-2 col-lg-2"
                  name="educationYear"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <a-select
                    v-model:value="formTeacherRating.educationYear"
                    :options="allDate.optionsEducationYear"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                    :placeholder="t('Choose_Education_Year')"
                    allow-clear
                  >
                  </a-select>
                </a-form-item>
                <a-form-item
                  class="my-2 col-lg-3"
                  name="faculty"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <a-select
                    v-model:value="formTeacherRating.faculty"
                    :options="allDate.optionsFaculty"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                    :placeholder="t('Choose_faculty')"
                    allow-clear
                  >
                  </a-select>
                </a-form-item>
                <a-form-item
                  class="my-2 col-lg-3"
                  name="optionsDivisions"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <a-select
                    v-model:value="formTeacherRating.optionsDivisions"
                    :options="allDate.optionsDivisions"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                    :placeholder="t('Choose_a_specialty')"
                    allow-clear
                  >
                  </a-select>
                </a-form-item>
                <a-form-item
                  class="my-2 col-lg-2"
                  name="educationType"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon bo'sh bo'lishi mumkin emas!`,
                    },
                  ]"
                >
                  <a-select
                    v-model:value="formTeacherRating.educationType"
                    :options="allDate.optionsEducationForm"
                    style="width: 100%; border-radius: 10px !important"
                    @change="handleChange"
                    :placeholder="t('Choose_Education_Form')"
                    allow-clear
                  >
                  </a-select>
                </a-form-item>

                <div class="my-2 col-lg-2">
                  <button class="btn-search c-save" type="submit">
                    <i class="mdi mdi-eye me-2"></i>{{ $t("View") }}
                  </button>
                </div>
              </div>
            </a-form>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive table-statistical">
          <div class="table-header">
            <table>
              <tr>
                <td>
                  <span>{{ $t("Curriculum_Education_Year") }}:</span>
                  <b>2022-2023</b>
                </td>
                <td>
                  <span>{{ $t("Faculty") }}:</span>
                  <b>Matematika va informatika</b>
                </td>
              </tr>
              <tr>
                <td>
                  <span>{{ $t("Education_Form") }}:</span>
                  <b>Kunduzgi</b>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th style="min-width: 250px">{{ $t("Indicators") }}</th>
                <th>{{ $t("Bachelor") }}</th>
                <th>{{ $t("Women") }}</th>
                <th>{{ $t("Grant") }}</th>
                <th>{{ $t("Contract") }}</th>
                <th>{{ $t("Magister") }}</th>
                <th>{{ $t("Women") }}</th>
                <th>{{ $t("Grant") }}</th>
                <th>{{ $t("Contract") }}</th>
                <th>{{ $t("Total_Point") }}</th>
                <th>{{ $t("Women") }}</th>
              </tr>
            </thead>
            <tbody
              v-for="(element, index) in allTables.tableByEmployment"
              :key="index"
            >
              <tr>
                <th style="background: #fefae0">{{ element.id }}</th>
                <th colspan="11" style="text-align: start; background: #fefae0">
                  {{ element.indicators }}
                </th>
              </tr>
              <tr
                v-for="(elementAll, index1) in element.pieceOfIndicators"
                :key="index1"
              >
                <td>{{ elementAll.id }}</td>
                <td style="text-align: start">{{ elementAll.name }}</td>
                <td>{{ elementAll.areas.bachelorCount }}</td>
                <td>{{ elementAll.areas.bachelorWomens }}</td>
                <td>{{ elementAll.areas.bachelorGarnt }}</td>
                <td>{{ elementAll.areas.bachelorContract }}</td>
                <td>{{ elementAll.areas.magistrCount }}</td>
                <td>{{ elementAll.areas.magistrWomens }}</td>
                <td>{{ elementAll.areas.magistrGarnt }}</td>
                <td>{{ elementAll.areas.magistrContract }}</td>
                <td>{{ elementAll.areas.allCount }}</td>
                <td>{{ elementAll.areas.allWomens }}</td>
              </tr>
              <tr>
                <td></td>
                <td style="text-align: start">
                  <b>{{ $t("Total_Point") }} </b>
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td></td>
                <td style="text-align: start">
                  <b>{{ $t("Graduates") }}</b>
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td style="text-align: start">
                  <b>{{ $t("Number_of_foreign_graduates") }} </b>
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td style="text-align: start">
                  <b>{{ $t("Total_number_of_graduates") }} </b>
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-------END TABLE 1---------------------------------------->
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { allDate, allTables } from "../../data";

export default {
  setup() {
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //-----------------------------------
    const formTeacherRating = reactive({
      educationYear: undefined,
      semeterType: undefined,
      faculty: undefined,
      optionsDivisions: undefined,
      educationType: undefined,
      educationForm: undefined,
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const value = ref("1");
    //----------------------------------
    return {
      value,
      formTeacherRating, //validation add
      onFinish, //validation
      onFinishFailed, //validation
      //--------------------------
      filterOption,
      allDate: allDate, //barcha datalar
      allTables: allTables, //jadvallar
    };
  },
};
</script>

<style lang="scss">
.teacherRatingPage .content-table {
  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;

    &:nth-last-child(1) {
      justify-content: left;
      display: flex;
    }

    &:nth-child(1) {
      display: flex;
      justify-content: left;
    }
  }
}
</style>
