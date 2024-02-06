<template>
  <div pagetitle="'Malaka oshirish'" class="checkLessonPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/teacher/time-table">Dars jadvali </router-link>
            / Tekshirish
          </h5>
          <div class="filterBlock">
            <router-link
              to="/teacher/time-table"
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
            <h5 class="modal-title">
              Darsda qatnashmagan talabalar belgilanadi
            </h5>
          </div>
          <div class="card-body">
            <a-form-item class="mb-3">
              <label for="fakultet-type-input" class="form-label"
                >Mavzular</label
              >
              <a-select
                v-model:value="value"
                :options="allDate.optionsLessons"
                style="width: 100%; border-radius: 10px !important"
                @change="handleChange"
              >
              </a-select>
            </a-form-item>
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>№</th>
                    <th>Talabaning F.I.Sh.</th>
                    <th>{{ $t("Payment_Form") }}</th>
                    <th>Tekshirish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row d-grid w-100"
                    v-for="element in allTables.tableStudents"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.secondName }}
                    </td>
                    <td>
                      {{ element.paymentForm }}
                    </td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
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
                  <th scope="row"><b>{{$t('Subjects')}}</b></th>
                  <td>{{ info.subject }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th><strong>{{$t('Training')}}</strong></th>
                  <td>{{ info.trainingType }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th><strong>Dars sanasi</strong></th>
                  <td>{{ info.date }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th><strong>{{$t('Group')}}</strong></th>
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
.checkLessonPage {
  .table-row {
    grid-template-columns: 40px auto 150px 100px;
    @include mobile() {
      grid-template-columns: 40px 200px 150px 100px;
    }
    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }
  .table-row-sub {
    grid-template-columns: 120px auto;
    @include mobile() {
      grid-template-columns: 150px auto !important;
    }
  }
}
.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>





