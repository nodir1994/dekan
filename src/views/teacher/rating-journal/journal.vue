<template>
  <div pagetitle="'Malaka oshirish'" class="ratingJournalPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/teacher/rating-journal"
              >Baholash jurnali
            </router-link>
            / Fan baholari
          </h5>
          <div class="filterBlock">
            <router-link
              to="/teacher/rating-journal"
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
      <div class="col-xl-9">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive table-statistical">
              <table>
                <thead>
                  <tr>
                    <th
                      rowspan="3"
                      style="min-width: 50px"
                      class="fixed-table"
                    >
                      №
                    </th>
                    <th
                      rowspan="3"
                      style="min-width: 300px"
                      class="fixed-table tr2"
                    >
                      Talabaning F.I.Sh
                    </th>
                    <th  colspan="20" class="text-start">Dars sanasi</th>
                  </tr>
                  <tr>
                    <th v-for="index in 20" :key="index">
                      <router-link
                        to="/teacher/rating-journal/check-lesson"
                        class="btn text-white py-1 diploma-color font-size-10"
                        >12-10-2022</router-link
                      >
                    </th>
                  </tr>
                  <tr>
                    <th
                      style="min-width: 100px"
                      class="font-size-10"
                      v-for="index in 20"
                      :key="index"
                    >
                      5. 15:00-16-20
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in 10" :key="element">
                    <td class="fixed-table">
                      {{ element }}
                    </td>
                    <td style="text-align: start" class="fixed-table tr2">
                      Davlatov Shohruh Egamberdiyovich
                    </td>
                    <td v-for="index in 20" :key="index"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3">
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
                  <th>{{$t('Training')}}</th>
                  <td>{{ info.trainingType }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>Dars sanasi</th>
                  <td>{{ info.date }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{$t('Group')}}</th>
                  <td>{{ info.group }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.ratingJournalPage {
  .table-statistical {
    .fixed-table {
      position: -webkit-sticky; // for safari
      position: sticky;
      left: 0px;
      background-color: #fff;
      border: 0;
      z-index: 2;
      width: 200px;
      &:after {
        content: "";
        position: absolute;
        left: 1px;
        right: 1px;
        bottom: 1px;
        top: 1px;
        border: 1px solid #dee2e6;
      }
    }
    .tr2 {
      left: 50px !important;
    }
    .tr3 {
      left: 350px !important;
    }
  }
}
.table-row {
  grid-template-columns: 40px auto 150px 100px;
  @include mobile() {
    grid-template-columns: 40px 200px 150px 100px;
  }
}
.table-row-sub {
  grid-template-columns: 110px auto;
  @include mobile() {
    grid-template-columns: 120px auto !important;
  }
}
.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>





