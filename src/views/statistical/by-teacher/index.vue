<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { facultyList } from "@/utils/api/reference/index";
import type { StatisticalByTeacherFace } from "@/utils/interfaces";
import { statisticalByTeacherList } from "@/utils/api/statistical/by-teacher/index";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import NoData from "@/components/NoData.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const { t } = useI18n();
const isLoading = ref(false);
const sumOfCol = ref<number[]>([]);
const forDeparmentEach = ref<any[]>([]);
const forItem2Name = ref<any[]>([]);
const deparmentEmployeesCount = ref<any[]>([]);
const statisticalChoose = ref(false);
const allCounts = ref<any[]>([]);
const loader = ref(true);
const apiData: {
  // pagination: PaginationProps;
  result: StatisticalByTeacherFace[];
} = reactive({
  // pagination: {
  //   current_page: 1,
  //   per_page: 1,
  //   total_pages: 1,
  // },
  result: [],
});
const apiParams = reactive({
  url: "",
});
// option kuzatish uchun

async function onSearch() {
  await fetchList();
}

function getArray(arr: any) {
  let datas: any = [];

  arr.map((item: any) => {
    datas.push(item);
  });

  return datas;
}
async function fetchList() {
  if (apiParams.url == "academic-degree") {
    statisticalChoose.value = true;
  }

  if (apiParams.url == "academic-title") {
    statisticalChoose.value = true;
  }
  if (apiParams.url == "position") {
    statisticalChoose.value = true;
  }
  if (apiParams.url == "work-form") {
    statisticalChoose.value = true;
  }
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await statisticalByTeacherList(apiParams);
      apiData.result = res.result;
    }
    setTimeout(() => {
      loader.value = true;
    }, 100);
    forDeparmentEach.value = [];
    forItem2Name.value = [];
    sumOfCol.value = [];
    apiData.result.forEach((element) => {
      const tempArr: any[] = getArray(element.departments);
      forDeparmentEach.value.push(tempArr);
    });
    deparmentEmployeesCount.value = [];
    forDeparmentEach.value.forEach((item) => {
      item.forEach((item2: any, index2: number) => {
        forItem2Name.value.push(item2);
        allCounts.value = [];
        item2.degrees.forEach((element: any) => {
          allCounts.value.push(element.male_count);
          allCounts.value.push(element.female_count);
          allCounts.value.push(element.all_count);
        });

        allCounts.value.push(
          item2.degrees.reduce(
            (total: number, item: any) => total + item.male_count,
            0
          )
        );
        allCounts.value.push(
          item2.degrees.reduce(
            (total: number, item: any) => total + item.female_count,
            0
          )
        );

        allCounts.value.push(
          item2.degrees.reduce(
            (total: number, item: any) => total + item.all_count,
            0
          )
        );
        allCounts.value.forEach((element: any, index2: number) => {
          if (sumOfCol.value.length < index2 + 1) {
            sumOfCol.value.length = index2 + 1;
            sumOfCol.value[index2] = 0;
          }
          sumOfCol.value[index2] += element;
        });

        deparmentEmployeesCount.value.push(allCounts.value);
      });
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div pagetitle="`O'qituvchi statistikasi`" class="byStudentGeneral">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Teacher_statistics") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <a-form-item class="my-2 col-md-5" name="faculty">
              <a-select class="form--item" :value="deanId" disabled> </a-select>
            </a-form-item>

            <div class="mt-3 col-md-5">
              <a-radio-group v-model:value="apiParams.url" name="radioGroup" class="d-flex">
                <a-radio value="academic-degree">{{
                  $t("Academic_degree")
                }}</a-radio>
                <a-radio value="academic-title">{{
                  $t("Scientific_title")
                }}</a-radio>
                <a-radio value="position">{{ $t("Position") }}</a-radio>
                <a-radio value="work-form">{{ $t("Form_of_work") }}</a-radio>
              </a-radio-group>
            </div>
            <div class="my-2 mt- col-md-2">
              <button :disabled="!apiParams.url" class="btn-search c-save" type="submit">
                <i class="mdi mdi-eye me-2"></i>{{ $t("View_Academic_Sheet") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <template v-if="statisticalChoose && apiData.result.length">
      <div class="card">
        <LoadingOverlay v-if="isLoading" />
        <div class="card-body">
          <div class="table-responsive table-statistical">
            <div class="table-header">
              <table>
                <tr>
                  <td>
                    <span>{{ $t("Faculty") }}:</span>
                    <b>{{ deanId }}</b>
                  </td>
                </tr>
              </table>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowspan="2" style="min-width: 350px">
                    {{ $t("Academic_degree") }}
                  </th>
                  <th colspan="3" v-for="(supCategory, idSC) in apiData.result[0]
                    .departments[0].degrees" :key="idSC">
                    {{ supCategory.academic_degree }}
                  </th>
                  <th colspan="3">{{ $t("Total_Point") }}</th>
                </tr>
                <tr>
                  <th v-for="index1 in (apiData.result[0].departments[0].degrees
                    .length +
                    1) *
                    3" :key="index1">
                    <span v-if="index1 % 3 == 1" style="min-width: 50px">{{
                      $t("Male")
                    }}</span>
                    <span v-if="index1 % 3 == 2" style="min-width: 50px">{{
                      $t("Female")
                    }}</span>
                    <span v-if="index1 % 3 == 0" style="min-width: 50px">{{
                      $t("Total_Point")
                    }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, elIndex) in forItem2Name" :key="elIndex">
                  <td>{{ element.name }}</td>
                  <td v-for="(element, index) in deparmentEmployeesCount[elIndex]" :key="index">
                    {{ element }}
                  </td>
                </tr>
                <tr>
                  <th>{{ $t("Total_Point") }}</th>
                  <template v-for="(item, index) in sumOfCol">
                    <th>
                      {{ item }}
                    </th>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="card">
        <div class="card-body">
          <LoadingOverlay v-if="isLoading" />
          <NoData />
        </div>
      </div>
    </template>
    <!-------END TABLE 1---------------------------------------->
  </div>
</template>
