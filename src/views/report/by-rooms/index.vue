<script lang="ts" setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useI18n } from "vue-i18n";
import { reportByRooms } from "@/utils/api/report/by-rooms/index";
import type { byRoomsReportFace } from "@/utils/interfaces";
import { buildingList, weekList } from "@/utils/api/reference/index";
import type { PaginationProps } from "@/components/partials/PaginationForStatistical.vue";
import { Modal } from "bootstrap";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import moment from "moment";
import PaginationForStatistical from "@/components/partials/PaginationForStatistical.vue";
import { useUserStore } from "@/stores/user";
import helper from "@/utils/helper";
import helpers from "@/utils/helper";

const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const isLoading = ref(false);
const { t } = useI18n();
const roomName = ref<string | null>("");
const counter = ref(0);
const btnDisabledNext = ref(false);
const btnDisabledPrew = ref(false);
const optionWeekList = ref<any>([]);
const selectedDate = reactive({
  // week_id: null,
  date: null,
  pair_id: null,
  audience_id: null,
});

const counters = ref<any>({
  sequenceNumber: null,
  theNumber: null,
  sorting: null,
});

const apiParams = reactive({
  building_id: null,
  per_page: helpers.pagePer,
  page: 1,
});

const optionList: any = reactive({
  optionBuildingList: null,
});

const apiData: {
  pagination: PaginationProps;
  result: byRoomsReportFace[];
} = reactive({
  pagination: {
    current_page: 1,
    per_page: apiParams.per_page,
    loading: false,
  },
  result: [],
});

const selectedWeekDate = ref("");

const selectedWeek = computed(() => {
  const weekDays: any[] = [
    { day: t("Monday"), date: "" },
    { day: t("Tuesday"), date: "" },
    { day: t("Wednesday"), date: "" },
    { day: t("Thursday"), date: "" },
    { day: t("Friday"), date: "" },
    { day: t("Saturday"), date: "" },
  ];

  if (selectedWeekDate.value) {
    const foundWeek = optionWeekList.value?.find(
      (week: any) => week?.date === selectedWeekDate.value
    );

    Array(6)
      .fill("")
      .forEach(
        (_, index) =>
          (weekDays[index].date =
            foundWeek &&
            moment(foundWeek?.start_date, "YYYY-MM-DD")
              .add(index, "days")
              .format("YYYY-MM-DD"))
      );

    return {
      ...foundWeek,
      weekDays,
    };
  } else return { weekDays };
});

// hooks

onBeforeMount(async () => {
  isLoading.value = true;
  if (counter.value == 0) {
    btnDisabledPrew.value = true;
  }
  Promise.all([buildingList(), weekList()]).then((res: any) => {
    optionList.optionBuildingList = res[0].result;
    optionWeekList.value = res[1];
    selectedWeekDate.value = res[1][counter.value].date;
  });
  isLoading.value = false;
});

watch(
  apiParams,
  async (newVal, oldVal) => {
    await fetchList();
  },
  { deep: true }
);

watch(
  () => apiData.pagination.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);

watch(
  counter,
  async (newVal: any, oldVal: any) => {
    const res = await weekList();
    optionWeekList.value = res;
    selectedWeekDate.value = res[counter.value].date;
  },
  { deep: true }
);

watchEffect(async () => {
  if (selectedWeekDate.value) {
    await fetchList();
  }
});

// functions

//btn next
function btnNext() {
  counter.value += 1;
  if (optionWeekList.value.length - 1 < counter.value || counter.value > 0) {
    btnDisabledNext.value = false;
    btnDisabledPrew.value = false;
  }
  if (optionWeekList.value.length - 1 == counter.value) {
    btnDisabledNext.value = true;
    btnDisabledPrew.value = false;
  }
}

//btn prev
function btnPrew() {
  counter.value -= 1;
  if (optionWeekList.value.length - 1 < counter.value || counter.value > 0) {
    btnDisabledNext.value = false;
    btnDisabledPrew.value = false;
  }
  if (counter.value == 0) {
    btnDisabledPrew.value = true;
    btnDisabledNext.value = false;
  }
}

async function onSearch() {
  await fetchList();
}

async function fetchList() {
  try {
    isLoading.value = true;
    const params = {
      ...apiParams,
      start_date: selectedWeek.value.start_date,
      end_date: selectedWeek.value.end_date,
    };

    const res = await reportByRooms(params);
    Object.assign(apiData, res);
    let sequenceNumber = `${
      apiData.pagination.per_page * (apiData.pagination.current_page - 1) + 1
    }- ${
      apiData.result.length +
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1)
    }`;
    let theNumber = `${t("Total_Point")} : ${apiData.pagination.total}`;
    let sorting =
      apiData.pagination.per_page! * (apiData.pagination.current_page - 1);
    counters.value.sequenceNumber = sequenceNumber;
    counters.value.theNumber = theNumber;
    counters.value.sorting = sorting;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}

// for open modal

function onDaySelect(topic: any, room_name: string) {
  selectedDate.date = topic.date;
  selectedDate.pair_id = topic.pair_id;
  selectedDate.audience_id = topic.audience_id;
  roomName.value = room_name;
  const modal = Modal.getOrCreateInstance("#ReportByRoomsModal");
  modal.show();
}
</script>

<template>
  <div pagetitle="`O'zlashtirish statistikasi`" class="byRooms">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Audience_occupancy") }}</h5>
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
            <div class="col-md-4 d-flex">
              <div class="row w-100">
                <div class="col-2 my-2">
                  <button
                    :disabled="btnDisabledPrew"
                    @click="btnPrew()"
                    class="b-prev"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </button>
                </div>
                <div class="col-8">
                  <a-form-item
                    class="my-2"
                    name="nameFaculty"
                    style="text-align: center"
                  >
                    <a-select
                      v-model:value="selectedWeekDate"
                      :options="optionWeekList"
                      :field-names="{ value: 'date', label: 'date' }"
                    >
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-2 my-2">
                  <button
                    :disabled="btnDisabledNext"
                    @click="btnNext()"
                    class="b-next"
                  >
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <a-form-item class="my-2 col-md-4" name="nameFaculty">
              <a-select
                :value="deanId"
                :field-names="{ value: 'id', label: 'name' }"
                allowClear
                disabled
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-md-4" name="nameFaculty">
              <a-select
                v-model:value="apiParams.building_id"
                :options="optionList.optionBuildingList"
                :field-names="{ value: 'id', label: 'name' }"
                allowClear
                :placeholder="$t('Select_the_building')"
              >
              </a-select>
            </a-form-item>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div
          v-if="apiData.result.length"
          class="table-responsive table-statistical"
        >
          <table>
            <thead class="position-sticky t-0">
              <tr>
                <th rowspan="2" style="min-width: 55px">
                  {{ $t("Auditorium") }}
                </th>
                <th rowspan="2" style="min-width: 200px">{{ $t("Type") }}</th>
                <th rowspan="2">{{ $t("Capacity") }}</th>
                <th
                  v-for="weekDay in selectedWeek.weekDays"
                  :colspan="helper.paraNumber"
                >
                  {{ weekDay.day }} <br />
                  {{ weekDay.date }}
                </th>
              </tr>
              <tr>
                <th
                  v-for="week in helper.paraNumber"
                  :key="week"
                  style="min-width: 25px"
                >
                  {{ week }}
                </th>
                <th
                  v-for="week in helper.paraNumber"
                  :key="week"
                  style="min-width: 25px"
                >
                  {{ week }}
                </th>
                <th
                  v-for="week in helper.paraNumber"
                  :key="week"
                  style="min-width: 25px"
                >
                  {{ week }}
                </th>
                <th
                  v-for="week in helper.paraNumber"
                  :key="week"
                  style="min-width: 25px"
                >
                  {{ week }}
                </th>
                <th
                  v-for="week in helper.paraNumber"
                  :key="week"
                  style="min-width: 25px"
                >
                  {{ week }}
                </th>
                <th
                  v-for="week in helper.paraNumber"
                  :key="week"
                  style="min-width: 25px"
                >
                  {{ week }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, index) in apiData.result" :key="index">
                <td>
                  {{ element.name }}
                </td>
                <td>
                  {{ element.type }}
                </td>
                <td>
                  {{ element.capacity }}
                </td>
                <template v-for="weekDay in selectedWeek.weekDays">
                  <td
                    v-for="(para, paraIndex) in helper.paraNumber"
                    :key="paraIndex"
                    style="padding: 1px"
                  >
                    <template v-for="(topic, topicIndex) in element.topics">
                      <button
                        v-if="
                          Number(topic.pair) === para &&
                          topic.date === weekDay.date
                        "
                        class="b-rooms"
                        @click="onDaySelect(topic, element.name)"
                      >
                        {{ topic.count }}
                      </button>
                    </template>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
          <PaginationForStatistical
            v-if="apiData.pagination.last_page! > 1"
            class="mt-2"
            v-bind="{ ...apiData.pagination }"
            v-model:current-page="apiData.pagination.current_page"
            :loading="isLoading"
            @on-page-change="fetchList"
          />
        </div>
        <div v-else class="table-responsive">
          <LoadingOverlay v-if="isLoading" />
          <NoData />
        </div>
      </div>
    </div>
    <!-------END TABLE 1---------------------------------------->
    <!-------START ADD MODAL---------------------------------------->
    <ReportByRoomsModal
      :data="selectedDate"
      :roomName="roomName"
      @update:list="fetchList"
    />
    <!-------END ADD MODAL---------------------------------------->
    <span
      class="element-count mb-2"
      :class="!apiData.pagination.total ? 'd-none' : ''"
    >
      <span v-if="apiData.pagination.last_page">
        {{ counters.sequenceNumber }} / </span
      >{{ counters.theNumber }}</span
    >
  </div>
</template>

<style lang="scss">
.byRooms {
  .table-modal {
    grid-template-columns: auto 150px 150px 80px;
    @include mobile() {
      grid-template-columns: 150px 100px 80px 70;
    }
  }
  .modal-dialog {
    max-width: $mobile !important;
  }
}
</style>
