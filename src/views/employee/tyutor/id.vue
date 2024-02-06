<template>
  <div pagetitle="'Malaka oshirish'" class="academicGroupPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/employee/tyutor"> Tyutor guruhlari </router-link>
            / {{ urlPath.id }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 me-3 px-4"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
              <router-link
                to="/employee/tyutor"
                class="btns black-c py-1.5 px-4 d-inline-block"
              >
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}</router-link
              >
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
                  :options="allDate.optionsEducationType"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Ta’lim turini tanlang </label>
            </div>
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  show-search
                  :options="allDate.optionsEducationForm"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Ta’lim shaklini tanlang </label>
            </div>
            <div class="my-2 col-md-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i
                >{{ $t("Search") }}
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
          <p @click="openPath">Click me...</p>
          <table class="content-table">
            <thead>
              <tr class="table-row-academic-group">
                <th>#</th>
                <th></th>
                <th>{{ $t("Name") }}</th>
                <th>{{ $t("Structure_Faculty") }}</th>
                <th>{{ $t("by_Specialty") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("Education_Form") }}</th>
                <th>{{ $t("Education_Language") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row-academic-group"
                v-for="element in allTables.tableGroups"
                :key="element.id"
              >
                <td>{{ element.id }}</td>
                <!-- ---------START ACTIONS-------------- -->
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
                <!-- ---------END ACTIONS-------------- -->
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.faculty }}
                </td>
                <td>{{ element.specialty }}</td>
                <td>
                  {{ element.educationType }}
                </td>
                <td>
                  {{ element.educationForm }}
                </td>
                <td>
                  {{ element.educationLang }}
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
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { allDate, allTables } from "../../data";

export default {
  setup() {
    //validation add
    const route = useRoute();
    const router = useRouter();

    const urlPath = reactive({
      id: 0,
    });
    const openPath = function () {
      console.log(route);
      router.push({
        name: "award ",
        query: {
          ...route.query,
        },
      });
    };

    onMounted(() => {
      urlPath.id = route.params.id;
    });

    return {
      urlPath,
      openPath,
      current: ref(1),
      allDate: allDate,
      allTables: allTables,
    };
  },
  components: {},
};
</script>

<style lang="scss">
.academicGroupPage {
  .table-row-academic-group {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 100px 120px auto 160px 160px 100px 160px;

    @include mobile() {
      grid-template-columns: 50px 100px 200px 100px 100px 100px 90px 100px;
    }
  }
}
</style>
