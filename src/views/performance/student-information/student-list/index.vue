<template>
  <div pagetitle="`Talabalar kontengenti`" class="studentListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{$t('Student_Employment_List')}}</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{$t('Import_Students')}}
            </button>
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{$t('Student_Address')}}
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
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">

            <!-- //to'lov shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsPaymentForm"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label>{{$t('Select_payment_form')}}</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsEducationForm"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label>{{$t('Choose_Education_Form')}}</label>
            </div>

            <!-- //fakultet  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsFaculty"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsTrainingPlan"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //semestr  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsSemestr"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label>{{$t('Choose_Semester')}}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsGroup"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label>{{$t('Choose_Group')}}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-md-10 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{$t('choose__fish__passport__code')}}</label>
            </div>

            <!-- //search button  -->
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

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-student-list">
                    <th>#</th>
                    <th>{{$t('Employee_Id_Number')}}</th>
                    <th>{{ $t("Passport_Number") }}</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{$t('Education_Year_Name')}}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{$t('Semester_Name')}}</th>
                    <th>{{$t('Group')}}</th>
                    <th>{{ $t("Updated_At") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-student-list"
                    v-for="element in allTables.tableStudents"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.studentId }}
                    </td>
                    <td>
                      {{ element.passportNumber }}
                    </td>
                    <td>
                      {{ element.secondName }}
                    </td>
                    <td>
                      {{ element.specialtyId }} <br />
                      {{ element.paymentForm }}
                    </td>
                    <td>
                      {{ element.academicYear }}
                    </td>
                    <td>
                      {{ element.educationType }}
                    </td>
                    <td>
                      {{ element.semestr }}
                    </td>
                    <td>
                      {{ element.groupName }}
                    </td>
                    <td>
                      {{ element.updatedAt }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<script>

import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { allDate, allTables } from "../../data"

export default {
  setup() {

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //-----------------------------------
    const showDeleteConfirm = () => {
      Modal.confirm({
        title: "Siz rostdan shu bo'limni o'chirmoqchimisiz?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "",
        okText: "Ha",
        okType: "danger",
        cancelText: "Yo'q",

        onOk() {
          console.log("OK");
        },

        onCancel() {
          console.log("Cancel");
        },
      });
    };
    return {
      showDeleteConfirm,
      //--------------------------
      filterOption,
      allDate: allDate, //barcha datalar
      allTables: allTables, //jadvallar
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">

.studentListPage {
  .table-row-student-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 100px 120px auto  140px 100px 90px 90px 90px 170px;
    @include mobile() {
      grid-template-columns: 50px 100px 120px 200px  140px 100px 100px 100px 140px 170px;
    }
  }
}

.studentListPage .content-table {
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