
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCalendarPlanById } from "@/utils/api/subject/calendar";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const id = (route.params?.id as number) ?? null;

const apiData: {
  current_page: number;
  data: [];
  links: [];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
});

await fetchList();

//filter semester
watch(
  () => apiParams.semester_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

async function fetchList() {
  const res = await getCalendarPlanById(id);
  Object.assign(apiData, res.result);
}

</script>

<template>
  <div pagetitle="'Plans'" class="plansPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Ta'limda axborot texnologiyalari</h5>
          <div class="filterBlock">
            <router-link to="/subjects/calendar-plan" class="btns black-c py-1.5 px-4" type="submit">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th><strong>#</strong></th>
                <th><strong>Mavzular</strong></th>
                <th><strong>{{$t('Training')}}</strong></th>
                <th><strong>Soat</strong></th>
                <th><strong>Dars sanasi</strong></th>
                <th><strong>O'tildi</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row w-100 d-grid" v-for="element in allTables.tableTopics" :key="element.id">
                <td>{{ element.id }}</td>
                <td>{{ element.name }}</td>
                <td>{{ element.type }}</td>
                <td>{{ element.hours }}</td>
                <td>
                  <span v-if="element.lessonDate == null"> (berilmagan)</span>
                  <span v-else> {{ element.lessonDate }} </span>
                </td>
                <td>
                  <span v-if="element.checked == null"> (berilmagan)</span>
                  <span v-else> {{ element.checked }} </span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <div class="mt-2">
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item disabled">
                  <span class="page-link"><i class="mdi mdi-chevron-left"></i></span>
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
                  <a class="page-link" href="#"><i class="mdi mdi-chevron-right"></i></a>
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

<style lang="scss">
.plansPage {
  .table-row {
    grid-template-columns: 40px auto 100px 80px 120px 100px;

    @include mobile() {
      grid-template-columns: 40px 200px 100px 80px 100px 100px;
    }
  }
}
</style>





