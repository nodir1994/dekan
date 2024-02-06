<template>
  <div pagetitle="'Malaka oshirish'" class="examResultsPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/exam"
              >Imtihonlar ro'yxati /
            </router-link>
            <router-link to="/curriculum/exam/subject"
              >Kompyuterni modellashtirish /
            </router-link>
            <router-link to="/curriculum/exam/result">Natijalar / </router-link>
            RAHMONOVA XURSANOY SHAVKATJON QIZI
          </h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="fas fa-print me-1"></i>Chop etish
            </button>
            <router-link to="/curriculum/exam/result"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0"><b>Natijalar</b></h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <tr class="student-result w-100 d-grid">
                  <th scope="row"><b>Imtihon</b></th>
                  <td>{{ allTables.tableResults[0].exam }}</td>
                </tr>
                <tr class="student-result w-100 d-grid">
                  <th><strong>{{ $t('Student') }}</strong></th>
                  <td>{{ allTables.tableResults[0].student }}</td>
                </tr>
                <tr class="student-result w-100 d-grid">
                  <th><strong>{{$t('Group')}}</strong></th>
                  <td>{{ allTables.tableResults[0].group }}</td>
                </tr>
                <tr class="student-result w-100 d-grid">
                  <th><strong>Boshlandi</strong></th>
                  <td>{{ allTables.tableResults[0].startedAt }}</td>
                </tr>
                <tr class="student-result w-100 d-grid">
                  <th><strong>Tugadi</strong></th>
                  <td>{{ allTables.tableResults[0].finishedAt }}</td>
                </tr>
                <tr class="student-result w-100 d-grid">
                  <th><strong>To'g'ri</strong></th>
                  <td>{{ allTables.tableResults[0].correct }}</td>
                </tr>
                <tr class="student-result w-100 d-grid">
                  <th><strong>Foiz</strong></th>
                  <td>{{ allTables.tableResults[0].percent }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead
                  v-for="(element, index) in allTables.tableQuestionsWeek"
                  :key="index"
                >
                  <tr class="table-row w-100 d-grid shadow-none">
                    <th>
                      <strong>{{ element.id }}</strong>
                    </th>
                    <th>
                      <strong>{{ element.question }}</strong>
                    </th>
                  </tr>
                  <tr
                    class="table-row w-100 d-grid"
                    v-for="(variant, indexV) in element.variants"
                    :key="indexV"
                    :class="
                      variant.value1 === 1
                        ? 'answerTrue'
                        : variant.value1 === 0
                        ? 'ansverFalse'
                        : 'shadow-none bg-white'
                    "
                  >
                    <td>
                      <span v-if="variant.value1 === 1"
                        ><i class="fas fa-check ms-3"></i
                      ></span>
                      <span v-else-if="variant.value1 === 0"
                        ><i class="fas fa-times ms-3"></i
                      ></span>
                      <span v-else></span>
                    </td>
                    <td>{{ variant.answer }}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { allDate, allTables } from "../../data";
export default {
  setup() {
    return {
      allTables,
      allDate,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.examResultsPage {
  .table-row {
    grid-template-columns: 50px auto;
  }
  .student-result {
    grid-template-columns: 100px auto;
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-child(1),
      &:last-child {
        display: flex;
        justify-content: left;
      }
    }
  }
  .answerTrue {
    background-color: #b2ff9e !important;
  }
  .ansverFalse {
    background-color: #ffb3c1 !important;
  }
}
</style>





