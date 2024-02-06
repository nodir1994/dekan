<template>
  <div pagetitle="`Reyting qaydnomasi`" class="performanceIdPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/performance/performance"
              >{{ $t("Performance_Performance") }}
            </router-link>
            / {{ $t("Performance_Rating_Info_Simple") }}
          </h5>
          <div class="panel-toggles">
            <router-link
              to="/performance/performance"
              class="btns black-c py-1.5 px-4"
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
    <!----------------------------------------->
    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive" v-if="apiData?.students.length > 0">
              <table class="content-table">
                <thead>
                  <tr class="performance-id">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("gradeSome") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="performance-id"
                    v-for="(element, index) in apiData?.students"
                    :key="element.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ element?.fullname }}
                    </td>
                    <td>{{ element?.rating }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-responsive" v-else>
              <no-data />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card sticky-top" style="top: 100px">
          <div class="card-header bg-card-header">
            <h5 class="modal-title">{{ $t("Data") }}</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <tr class="table-row-sub d-grid w-100">
                  <th scope="row">{{ $t("Subjects") }}</th>
                  <td>{{ apiData?.title?.subject }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{ $t("Exam_Type") }}</th>
                  <td>{{ apiData?.title?.exam_type }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{ $t("Final_Exam_Type") }}</th>
                  <td>{{ apiData?.title?.final_exam_position }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{ $t("Exam_Date") }}</th>
                  <td>{{ apiData?.title?.date }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{ $t("Group") }}</th>
                  <td>{{ apiData?.title?.academic_group }}</td>
                </tr>
                <tr class="table-row-sub d-grid w-100">
                  <th>{{ $t("Curriculum_Marking_System") }}</th>
                  <td>{{ apiData?.title?.rating_system }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { getListPerformanceById } from "@/utils/api/performance/performance";
import NoData from "@/components/NoData.vue";
const route: any = useRoute();
const paramsID = route.params?.id ?? null;
const { t } = useI18n();
const apiData: any = ref({});
if (paramsID) {
  apiData.value = await getListPerformanceById(paramsID).then(
    (res) => res?.result
  );
}
</script>

<style lang="scss">
.performanceIdPage {
  .performance-id {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 120px;

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
}
</style>
