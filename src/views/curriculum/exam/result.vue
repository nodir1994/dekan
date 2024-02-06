<template>
  <div pagetitle="'Malaka oshirish'" class="resultPage">
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
            Natijalar
          </h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{$t('Download')}}
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
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-5 form--item">
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
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu"> Nomi bo'yicha qidirish</label>
            </div>
            <div class="my-2 col-xl-2">
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
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row">
                <th><strong>{{ $t('Student') }}</strong></th>
                <th><strong>{{$t('Group')}}</strong></th>
                <th><strong>IP manzil</strong></th>
                <th><strong>Urunishlar</strong></th>
                <th><strong>To'g'ri</strong></th>
                <th><strong>{{$t('Score')}}</strong></th>
                <th><strong>Foiz</strong></th>
                <th><strong>Boshlandi</strong></th>
                <th><strong>Vaqt</strong></th>
                <th><strong>Tugadi</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="element in allTables.tableResults"
                :key="element.id"
              >
                <td>
                  <router-link to="/curriculum/exam/resultStudent">
                    {{ element.student }}</router-link
                  >
                </td>
                <td>
                  {{ element.group }}
                </td>
                <td>
                  {{ element.ipAdress }}
                </td>
                <td>
                  {{ element.attempts }}
                </td>
                <td>
                  {{ element.correct }}
                </td>
                <td>{{ element.mark }} ball</td>
                <td>{{ element.percent }}</td>
                <td>{{ element.startedAt }}</td>
                <td>{{ element.time }} daqiqa</td>
                <td>{{ element.finishedAt }}</td>
              </tr>
            </tbody>
          </table>
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
.resultPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 100px 130px 100px 80px 80px 80px 150px 100px 150px;
    @include mobile() {
      grid-template-columns: 200px 100px 130px 100px 80px 80px 80px 120px 80px 120px;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-child(1), &:last-child {
        display: flex;
        justify-content: left;
      }
    }
  }
}
</style>





