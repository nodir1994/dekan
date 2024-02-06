<template>
  <div pagetitle="'Malaka oshirish'" class="activityCheckPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Ilmiy faollik (tasdiqlash)</h5>
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
                  :options="allDate.optionsEducationYear"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsScientificPlatform"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Ilmiy platformani tanlang</label>
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
                <th><strong>#</strong></th>
                <th><strong>Ilmiy platforma</strong></th>
                <th><strong>Profil linki</strong></th>
                <th><strong>h-indeks</strong></th>
                <th><strong>Ilmiy ishlar soni</strong></th>
                <th><strong>Iqtiboslar soni</strong></th>
                <th><strong>Xodim</strong></th>
                <th><strong>O‘zgartirilgan</strong></th>
                <th><strong>Tasdiq</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="(element, index1) in allTables.tableActivity"
                :key="index1"
              >
                <td>
                  {{ element.id }}
                </td>
                <td>
                  {{ element.scientificPlatform }}
                </td>
                <td>
                  {{ element.profileLink }}
                </td>
                <td>
                  {{ element.h_index }}
                </td>
                <td>
                  {{ element.publicationWorkCount }}
                </td>
                <td>
                  {{ element.citationCount }}
                </td>
                <td>
                  {{ element.employee }}
                </td>
                <td>
                  {{ element.updateData }} <br />
                  {{ element.updateTime }}
                </td>

                <td>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                      v-model="element.action"
                    />
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

import { ref } from "vue";
import { allDate, allTables } from "../../data";

export default {
  setup() {
    return {
      current: ref(1),
      allTables,
      allDate,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.activityCheckPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 120px auto 90px 130px 120px 200px 100px 60px;
    @include mobile() {
      grid-template-columns: 50px 200px 180px 80px 90px 180px 170px 100px 100px 60px 60px;
    }
  }
}
</style>





