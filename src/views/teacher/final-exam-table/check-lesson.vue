<template>
  <div pagetitle="'Reyting'" class="examFinalGradePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/teacher/final-exam-table"
              >Nazorat jadvali
            </router-link>
            / Reyting
          </h5>
          <div class="filterBlock">
            <router-link
              to="/teacher/final-exam-table"
              class="btns black-c py-1.5 px-4 d-inline-block"
            >
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------->

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-header bg-card-header">
            <h5 class="modal-title">Oraliq nazorat</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive table-statistical">
              <table>
                <thead>
                  <tr>
                    <th rowspan="2" style="min-width: 60px">№</th>
                    <th rowspan="2" style="width: 100%; text-align: start">
                      Talabaning F.I.Sh.
                    </th>
                    <th colspan="2" style="min-width: 110px">JN</th>
                    <th colspan="2" style="min-width: 110px">ON</th>
                    <th rowspan="2" style="min-width: 110px">JN+ON [51%]</th>
                    <th colspan="2" style="min-width: 140px">YN [5]</th>
                    <th rowspan="2" style="min-width: 80px">Umumiy</th>
                  </tr>
                  <tr>
                    <th>As.</th>
                    <th>1-QT</th>
                    <th>As.</th>
                    <th>1-QT</th>
                    <th>As.</th>
                    <th>1-QT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(element, index) in allTables.tablebByPerformance
                      .faculty"
                    :key="index"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.secondName }}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <a-form-item class="mb-0" name="heiNameInput">
                        <a-input
                          class="select py-1"
                          tupe="number"
                          v-model:value="heiNameInput"
                        />
                      </a-form-item>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end mt-2">
                <button class="btns search-color py-2 px-4 me-2">
                  Ro'yxat
                </button>
                <button class="btns c-filter py-2 px-4 me-2">Chop etish</button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#myModalFaculty"
                  class="btns application-color py-2 px-4 me-2"
                >
                  To'ldirish
                </button>
                <button type="submit" class="btns c-save py-2 px-4">
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card sticky-top" style="top: 100px">
          <div class="card-header bg-card-header">
            <h5 class="modal-title">Ma'lumotlar</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table-vertical"
                v-for="info in allTables.tableChekLessonInfo"
                v-bind:key="info.id"
              >
                <tr class="table-row-sub d-grid w-100">
                  <th scope="row">{{$t('Subjects')}}</th>
                  <td>{{ info.subject }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>Nazorat turi</th>
                  <td>{{ info.examType }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>YN turi</th>
                  <td>{{ info.qaydnoma }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>Nazorat sanasi</th>
                  <td>{{ info.date }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{$t('Group')}}</th>
                  <td>{{ info.group }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>Baholash tizimi</th>
                  <td>{{ info.gradeType }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="myModalFaculty"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabelFaculty"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Imtihonni tanlash</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-row-modal d-grid w-100">
                    <th>{{ $t("Name") }}</th>
                    <th>Guruhlar</th>
                    <th>Boshlanish</th>
                    <th>Tugash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-modal d-grid w-100"
                    v-for="element in allTables.optionsSelectExam"
                    :key="element.id"
                  >
                    <td>
                      <a href="#">
                        {{ element.name }}
                        <br />
                        {{ element.subject }} / {{ element.examType }} /
                        {{ element.teacher }}
                      </a>
                    </td>
                    <td>
                      {{ element.groups }}
                    </td>
                    <td>
                      {{ element.startAt }}
                    </td>
                    <td>
                      {{ element.endAt }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btns c-cancel me-1"
                data-bs-dismiss="modal"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL------------------------------------------>
  </div>
</template>

<script>

import { ref } from "vue";
import { allDate, allTables } from "../../data";
export default {
  setup() {
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      current: ref(1),
      filterOption,
      allDate,
      allTables,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.examFinalGradePage {
  .table-row {
    grid-template-columns: 40px auto 120px 120px;
    @include mobile() {
      grid-template-columns: 40px 200px 120px 120px;
    }
    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }
  .table-row-sub {
    grid-template-columns: 150px auto;
  }
  .table-row-modal {
    grid-template-columns: auto 250px 150px 150px;
    @include mobile() {
      grid-template-columns: 200px 250px 150px 150px;
    }
    th,
    td {
      &:first-child,
      &:last-child {
        justify-content: start;
      }
    }
  }
  .modal-dialog {
    max-width: $ipad;
  }
}
.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>





