<template>
  <div pagetitle="'Xaftaliklar'" class="weekPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Nazorat jadvalini ko'rish</h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/exam-list"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <div class="calendar">
            <div class="calendar__header">
              <div class="nextPrev">
                <a href="javascript:;" @click.prevent="changeMonth(false)"
                  ><i class="fas fa-chevron-left"></i
                ></a>
                <a href="javascript:;" @click.prevent="changeMonth(true)"
                  ><i class="fas fa-chevron-right"></i
                ></a>
              </div>
              <div class="calendar__title" @click.prevent="backToToday()">
                <span class="caption-year pe-2">{{ current.year }} - yil</span>
                <span class="caption-month">{{
                  moon[+convertTwoDigits - 1].value
                }}</span>
              </div>
            </div>
            <div class="calendar__body">
              <ul class="calendar__heading">
                <li
                  v-for="(item, index) in heading"
                  :key="index"
                  :class="index % 7 == 6 ? 'd-none' : ''"
                >
                  <div class="calendar__item">{{ item }}</div>
                </li>
              </ul>
              <ul class="calendar__content">
                <li
                  v-for="(item, index) in buildCalendar"
                  :key="index"
                  :class="index % 7 == 0 ? 'd-none' : ''"
                >
                  <a
                    href="javascript:;"
                    type="text"
                    class="calendar__item"
                    :class="{
                      'is-today': item.today === true,
                      current: item.current === true,
                    }"
                    ><i class="fas fa-plus me-3"></i>{{ item.number }}</a
                  >
                  <div class="calendar-day-content">
                    <ul class="sessons">
                      <li
                        v-for="(lesson, keys) in allTables.optionsLessons"
                        :key="keys"
                        :class="
                          item.date == lesson.date &&
                          item.month == lesson.month &&
                          item.years == lesson.years
                            ? ''
                            : 'd-none'
                        "
                      >
                        <a
                          v-if="
                            item.date == lesson.date &&
                            item.month == lesson.month &&
                            item.years == lesson.years
                          "
                          type="text"
                        >
                          {{ lesson.lessonPair }} |{{ lesson.trainingType
                          }}<br />
                          <span class="fw-bold">{{ lesson.subject }}</span>
                          <br />
                          {{ lesson.employee }} <br />
                          Xona: {{ lesson.auditorium }}-xona
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="todolist">
          <div class="todolist__header">
            <span class="caption-year">{{ current.year }}- yil</span>
            <span class="caption-month">{{ current.month }}- oy</span>
            <span class="caption-date">{{ current.date }}-kun</span>
          </div>
          <div class="todolist__body"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

import { allDate, allTables } from "../../data";
import { reactive } from "vue";
import moment from "moment";

export default {
  setup() {
    const formCreateStudent = reactive({});
    const onFinish = (values) => {
      console.log("Success:", { ...values, avatar: formCreateStudent.avatar });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", {
        ...errorInfo,
        values: {
          ...errorInfo.values,
          avatar: formCreateStudent.avatar,
        },
      });
    };
    return {
      formCreateStudent,
      onFinish,
      onFinishFailed,
    };
  },
  methods: {
    changeMonth(isNext) {
      let month = this.current.month;
      isNext === true ? (month = month + 1) : (month = month - 1);
      if (month <= 0) {
        month = 12;
        this.current.year = this.current.year - 1;
      }
      if (month > 12) {
        month = 1;
        this.current.year = this.current.year + 1;
      }
      this.current.month = month;
      this.current.date = 1;
    },
    getDateData(data) {
      if (data.none === true) {
        return false;
      } else {
        if (
          data.years === this.current.year &&
          data.month === this.current.month &&
          data.date === this.current.date
        ) {
          return false;
        } else {
          this.current.year = data.years;
          this.current.month = data.month;
          this.current.date = data.date;
        }
      }
    },
    backToToday() {
      this.current.year = this.today.year;
      this.current.month = this.today.month;
      this.current.date = this.today.date;
    },
    getToday() {
      this.today.year = moment().year();
      this.today.month = moment().month() + 1;
      this.today.date = moment().date();
    },
  },
  computed: {
    buildCalendar() {
      let myYears = this.current.year;
      let myMonth = this.current.month;
      let myDate = this.current.date;

      let monthText = "";
      myMonth < 10
        ? (monthText = `0${myMonth}`)
        : (monthText = myMonth.toString());

      let dateArray = [];
      let patchNum = 0;
      let totalDate = moment(`${myYears}-${monthText}`).daysInMonth();
      let week = moment(`${myYears}-${monthText}`).format("d");

      for (let i = 0; i < totalDate; i++) {
        let dateNum = i + 1;
        let isToday = false;
        let isCurrent = false;
        let dateText = "";

        if (
          myYears === this.today.year &&
          myMonth === this.today.month &&
          dateNum === this.today.date
        ) {
          isToday = true;
        }

        if (dateNum === myDate) {
          isCurrent = true;
        }

        dateNum < 10
          ? (dateText = `0${dateNum}`)
          : (dateText = dateNum.toString());

        let obj = {
          years: myYears,
          month: myMonth,
          date: dateNum,
          number: dateText,
          today: isToday,
          current: isCurrent,
        };
        dateArray.push(obj);
      }

      // 補上前面的
      for (let i = 0; i < week; i++) {
        let obj = {
          number: "",
          none: true,
        };
        dateArray.splice(i, 0, obj);
      }

      // 補上後面的
      dateArray.length % 7 === 0
        ? (patchNum = 0)
        : (patchNum = 7 - (dateArray.length % 7));

      for (let i = 0; i < patchNum; i++) {
        let obj = {
          number: "",
          none: true,
        };
        dateArray.splice(dateArray.length, 0, obj);
      }
      return dateArray;
    },
    convertTwoDigits() {
      let text = "";
      this.current.month < 10
        ? (text = `0${this.current.month}`)
        : (text = this.current.month);
      return text;
    },
  },
  created() {
    this.getToday();
    this.backToToday();
  },
  mounted() {},
  data() {
    return {
      allTables,
      allDate,
      current: {
        year: 0,
        month: 0,
        date: 0,
      },
      today: {
        year: 0,
        month: 0,
        date: 0,
      },
      heading: [
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba",
        "Yakshanba",
      ],
      moon: [
        { value: "Yanvar" },
        { value: "Fevral" },
        { value: "Mart" },
        { value: "Aprel" },
        { value: "May" },
        { value: "Iyun" },
        { value: "Iyul" },
        { value: "Avgust" },
        { value: "Sentiyabr" },
        { value: "Oktiyabr" },
        { value: "Noyabr" },
        { value: "Dekabr" },
      ],
    };
  },
  components: {
    
  },
};
</script>


<style lang="scss">
.modal-dialog {
  max-width: $mobile;
}
</style>