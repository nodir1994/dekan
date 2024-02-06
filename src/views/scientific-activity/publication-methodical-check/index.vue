<template>
  <div pagetitle="'Uslubiy (tasdiqlash)'" class="methodicalCheckPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Uslubiy (tasdiqlash)</h5>
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
            <div class="my-2 col-md-3 form--item">
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
            <div class="my-2 col-md-3 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsPublicationCategory"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Uslubiy nashr turi</label>
            </div>
            <div class="my-2 col-md-4 form--item">
              <a-input id="yu" />
              <label for="yu">{{ $t("Search_by_Name") }}</label>
            </div>
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
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row">
                <th><strong>#</strong></th>
                <th><strong>Uslubiy nash nomi</strong></th>
                <th><strong>Mualliflar</strong></th>
                <th><strong>Nashr yili</strong></th>
                <th><strong>Uslubiy nashr turi</strong></th>
                <th><strong>Xodim</strong></th>
                <th><strong>Fayl nomi</strong></th>
                <th><strong>Tekshirish</strong></th>
                <th><strong>O‘zgartirilgan</strong></th>
                <th><strong>Action</strong></th>
                <th><strong>Tasdiq</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row"
                v-for="(element, index1) in allTables.tablePublication"
                :key="index1"
              >
                <td>
                  {{ element.id }}
                </td>
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.authors }}
                </td>
                <td>
                  {{ element.year }}
                </td>
                <td>
                  {{ element.type }}
                </td>
                <td>
                  {{ element.employee }}
                </td>
                <td>
                  {{ element.fileName }}
                </td>
                <td>
                  {{ element.checkedAuthor }}
                </td>
                <td>
                  {{ element.updateData }} <br />
                  {{ element.updateTime }}
                </td>
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        class="text-danger"
                        type="danger"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalCreatSubject"
                      >
                        <i class="far fa-eye font-size-16 b-actions c-see"></i
                      ></a>
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
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
            <h5 class="modal-title" id="myModalLabel">
              C++ da dasturlash asoslari
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table
                class="table-vertical"
                v-for="info in allTables.tablePublicationName"
                v-bind:key="info.id"
              >
                <tr class="table-row-modal">
                  <th>Uslubiy nash nomi</th>
                  <td>{{ info.name }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Uslubiy nashr turi</th>
                  <td>{{ info.type }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Mualliflar soni</th>
                  <td>{{ info.counts }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Mualliflar</th>
                  <td>{{ info.authors }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Nashriyot</th>
                  <td>{{ info.publisher }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Nashr yili</th>
                  <td>{{ info.issueYear }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>O‘quv yili</th>
                  <td>{{ info.educationYear }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Nashr parametrlari</th>
                  <td>{{ info.parameter }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Guvohnoma raqami</th>
                  <td>{{ info.certificateNumber }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Guvohnoma sanasi</th>
                  <td>{{ info.certificateDate }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>Fayl nomi</th>
                  <td>{{ info.fileName }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>{{ $t("Created_At") }}</th>
                  <td>{{ info.createdAt }}</td>
                </tr>
                <tr class="table-row-modal">
                  <th>O‘zgartirilgan</th>
                  <td>{{ info.updatedAt }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END ADD MODAL---------------------------------------->
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
.methodicalCheckPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 180px 80px 90px 180px 170px 100px 100px 60px 60px;
    @include mobile() {
      grid-template-columns: 50px 200px 180px 80px 90px 180px 170px 100px 100px 60px 60px;
    }
  }
  .table-row-modal {
    width: 100% !important;
    display: grid;
    grid-gap: 0;
    grid-template-columns: 200px auto;
    @include mobile() {
      grid-template-columns: 150px auto !important;
    }
  }
  .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-last-child(2) {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
      }
    }
  }
  .modal-dialog {
    max-width: $mobile;
  }
}
</style>





