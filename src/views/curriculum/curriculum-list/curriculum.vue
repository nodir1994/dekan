<template>
  <div pagetitle="'Xaftaliklar'" class="weekPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/curriculum-list"
              >O'quv rejalar ro'yxati / </router-link
            >IO'M (kunduzgi)19-2
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/curriculum-list/"
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

    <!-- --------------table o'quv reja info----------- -->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table-vertical"
            v-for="info in allTables.tableCurriculumInfo"
            v-bind:key="info.id"
          >
            <tr class="table-row-curriculum-info">
              <th scope="row"><b>Fakultet</b></th>
              <td>{{ info.fakulty }}</td>
            </tr>
            <tr class="table-row-curriculum-info">
              <th><strong>Mutaxassislik</strong></th>
              <td>{{ info.specialty }}</td>
            </tr>
            <tr class="table-row-curriculum-info">
              <th><strong>{{ $t('Education_Type') }}</strong></th>
              <td>{{ info.educationType }}</td>
            </tr>
            <tr class="table-row-curriculum-info">
              <th><strong>{{$t('Edu_form')}}</strong></th>
              <td>{{ info.educationForm }}</td>
            </tr>
            <tr class="table-row-curriculum-info">
              <th><strong>Baxolash tizimi</strong></th>
              <td>{{ info.markingSystem }}</td>
            </tr>
            <tr class="table-row-curriculum-info">
              <th><strong>Guruhlar</strong></th>
              <td>{{ info.groups }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- --------------table o'quv reja info----------- -->

    <!-- --------------table fan info----------- -->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table-vertical"
            v-for="info in allTables.tableCurriculumInfo"
            v-bind:key="info.id"
          >
            <thead>
              <tr class="table-row-week-info">
                <th><strong></strong></th>
                <th><strong>Fan</strong></th>
                <th><strong>Fan turi</strong></th>
                <th><strong>Yuklama</strong></th>
                <th><strong>{{ $t('Credit') }}</strong></th>
              </tr>
            </thead>
            <h5 class="modal-data-tip">1-semestr</h5>
            <tbody>
              <tr
                class="table-row-week-info"
                v-for="element in allTables.tableWeekInfo"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td>
                  <a
                    type="text"
                    data-bs-toggle="modal"
                    data-bs-target="#myModalCreatSubject"
                    >{{ element.name }}</a
                  >
                </td>
                <td>{{ element.weekType }}</td>
                <td>{{ element.wordLoad }}</td>
                <td>{{ element.kredit }}</td>
              </tr>
            </tbody>
            <h5 class="modal-data-tip">2-semestr</h5>
            <tbody>
              <tr
                class="table-row-week-info"
                v-for="element in allTables.tableWeekInfo"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td>{{ element.name }}</td>
                <td>{{ element.weekType }}</td>
                <td>{{ element.wordLoad }}</td>
                <td>{{ element.kredit }}</td>
              </tr>
            </tbody>
            <h5 class="modal-data-tip">3-semestr</h5>
            <tbody>
              <tr
                class="table-row-week-info"
                v-for="element in allTables.tableWeekInfo"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <td>{{ element.name }}</td>
                <td>{{ element.weekType }}</td>
                <td>{{ element.wordLoad }}</td>
                <td>{{ element.kredit }}</td>
              </tr>
            </tbody>
            <h5 class="modal-data-tip">4-semestr</h5>
            <h5 class="modal-data-tip">5-semestr</h5>
            <h5 class="modal-data-tip">6-semestr</h5>
            <h5 class="modal-data-tip">7-semestr</h5>
            <h5 class="modal-data-tip">8-semestr</h5>
          </table>
        </div>
      </div>
    </div>
    <!-- --------------table fan info----------- -->
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