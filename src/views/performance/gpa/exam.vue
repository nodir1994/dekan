<template>
  <div pagetitle="'Xaftaliklar'" class="weekPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            Nazorat jadvali
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/exam-list"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START ADD MODAL---------------------------------------->
    <div
      id="myModalCreatSubject"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Fan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <table
              class="table-vertical"
              v-for="info in allTables.tableCurriculumInfo"
              v-bind:key="info.id"
            >
              <thead>
                <tr class="week-modal">
                  <th><strong>{{$t('Training')}}</strong></th>
                  <th><strong>Yuklama</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="week-modal"
                  v-for="(element, index) in allTables.tableWeekInfo[0]
                    .trainingType"
                  :key="index"
                >
                  <td>{{ element.name }} soat</td>
                  <td>{{ element.value }} soat</td>
                </tr>
                <tr class="week-modal">
                  <td><strong>Umumiy</strong></td>
                  <td>
                    <strong
                      >{{ allTables.tableWeekInfo[0].wordLoad }} soat</strong
                    >
                  </td>
                </tr>
              </tbody>
              <!-- ----------------------------- -->
              <thead>
                <tr class="week-modal">
                  <th><strong>Nazorat turi</strong></th>
                  <th><strong>Max.ball</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="week-modal"
                  v-for="(element, index) in allTables.tableWeekInfo[0].examType"
                  :key="index"
                >
                  <td>{{ element.name }}</td>
                  <td>{{ element.value }} ball</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-------END ADD MODAL---------------------------------------->

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
.weekPage {
  .table-row-curriculum-info {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 200px auto;
  }
  .table-row-week-info {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 200px 200px 70px;
    @include mobile() {
      grid-template-columns: 50px 200px 100px 100px 70px;
    }
  }
  .week-modal {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50% 50%;
  }
  .modal-data-tip {
    text-align: center;
    background-color: #dee2e6;
    padding: 10px;
    font-weight: 600;
  }
}
</style>