<template>
  <div pagetitle="'Malaka oshirish'" class="schedulePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Nazorat jadvalini ko'rish</h5>
          <div class="panel-toggles">
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
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsFaculty"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsTrainingPlan"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsEducationYear"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t('Choose_Education_Year')}}</label>
            </div>
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsSemestr"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label>{{$t('Choose_Semester')}}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsGroup"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t('Choose_Group')}}</label>
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
              <tr class="table-row-schedule">
                <th><strong>{{$t('edu_plan')}}</strong></th>
                <th><strong>O'quv yili</strong></th>
                <th><strong>Semestr</strong></th>
                <th><strong>{{$t('Group')}}</strong></th>
                <th><strong>Xafta</strong></th>
                <th><strong>Xaftalar [dars]</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-schedule"
                v-for="(element, index1) in allTables.tableExam"
                :key="index1"
              >
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.educationYear }}
                </td>
                <td>
                  {{ element.semester }}
                </td>
                <td>
                  <router-link to="/curriculum/exam-list/exam">
                    {{ element.group }}
                  </router-link>
                </td>
                <td>
                  {{ element.countWeeks }}
                </td>
                <td>
                  <div v-for="(week, index) in element.weeks" :key="index">
                    <span
                      :class="week.value != 0 ? 'actions-h' : 'actions-r'"
                      class="btns1"
                    >
                      №{{ index + 1 }} {{ week.name }} {{ [week.value] }}
                    </span>
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
    const formCreatEducationYear = reactive({
      semestrType: undefined,
      educationYears: undefined,
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
      formCreatEducationYear, //validation add
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
.schedulePage {
  .table-row-schedule {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 100px 100px 100px 70px 635px;
    @include mobile() {
      grid-template-columns: 170px 100px 100px 100px 70px 350px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:last-child,
      &:first-child {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
      }
    }
  }
}
</style>





