<template>
  <div pagetitle="'Xaftaliklar'" class="weekPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Nazorat jadvali</h5>
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

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsTrainingPlan"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsEducationYear"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t('Choose_Education_Year')}}</label>
            </div>
            <div class="my-2 col-md-2 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="allDate.optionsSemestr"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label>{{$t('Choose_Semester')}}</label>
            </div>
            <div class="my-2 col-md-2 form--item">
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
            <div class="my-2 col-md-1">
              <button class="btn-search c-save">OK</button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

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
                    data-bs-toggle="modal"
                    data-bs-target="#myModalCreatSubject"
                    class="calendar__item"
                    :class="{
                      'is-today': item.today === true,
                      current: item.current === true,
                    }"
                    @click.prevent="getDateData(item)"
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
                          data-bs-toggle="modal"
                          data-bs-target="#myModalCreatSubject"
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
              Guruh jadvali ma'lumotlari
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form autocomplete="off">
              <div class="row">
                <div class="col-md-6">
                  <a-form-item class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Nazorat sanasi</label
                    >
                    <a-form-item
                      class="mb-0"
                      name="birthDate"
                      :rules="[
                        {
                          required: true,
                          message: ``,
                        },
                      ]"
                      v-bind="config"
                    >
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="birthDate"
                        type="date"
                        value-format="YYYY-MM-DD"
                      />
                    </a-form-item>
                  </a-form-item>

                  <a-form-item
                    class="mb-3"
                    name="nameSpecial"
                    :rules="[
                      {
                        required: true,
                        message: `Fanlar bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >{{$t('Subjects')}}</label
                    >
                    <a-select
                      v-model:value="nameSpecial"
                      :options="allDate.optionsSubject"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                      placeholder="Fanni tanlang"
                    >
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    class="mb-3"
                    name="nameSpecial"
                    :rules="[
                      {
                        required: true,
                        message: `Nazorat turi bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >Nazorat turi</label
                    >
                    <a-select
                      v-model:value="nameSpecial"
                      :options="allDate.optionsExamType"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                      placeholder="Tanlash"
                    >
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    class="mb-3"
                    name="nameSpecial"
                    :rules="[
                      {
                        required: true,
                        message: `YN turi bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >YN turi</label
                    >
                    <a-select
                      v-model:value="nameSpecial"
                      :options="allDate.optionsRatingCounts"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                      placeholder="Tanlash"
                    >
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-md-6">
                  <a-form-item
                    class="mb-3"
                    name="nameSpecial"
                    :rules="[
                      {
                        required: true,
                        message: `Mutaxassislik bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >Juftlik</label
                    >
                    <a-select
                      v-model:value="nameSpecial"
                      :options="allDate.optionsLessonPair"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                      placeholder="Juftlikni tanlang"
                    >
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    class="mb-3"
                    name="nameSpecial"
                    :rules="[
                      {
                        required: true,
                        message: `Mutaxassislik bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >Auditoriya</label
                    >
                    <a-select
                      v-model:value="nameSpecial"
                      :options="allDate.optionsAuditoriumANme"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                      placeholder="Auditoriyani tanlang"
                    >
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    class="mb-3"
                    name="employee"
                    :rules="[
                      {
                        required: true,
                        message: `Ta'lim turi bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >{{$t('Group')}}</label
                    >
                    <a-select
                      mode="multiple"
                      v-model:value="nameSpecial"
                      :options="allDate.optionsGroup"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    class="mb-3"
                    name="nameSpecial"
                    :rules="[
                      {
                        required: true,
                        message: `Mutaxassislik bo'sh bo'lishi mumkin emas!`,
                      },
                    ]"
                  >
                    <label for="division-name-select" class="form-label"
                      >Xodim</label
                    >
                    <a-select
                      v-model:value="nameSpecial"
                      :options="allDate.optionsEmployee"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                      placeholder="Xodimni tanlang"
                    >
                    </a-select>
                  </a-form-item>
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <button class="btns c-delete me-1"> <i class="mdi mdi-trash-can font-size-14 align-middle me-1"></i>{{ $t("Remove") }}</button>
                <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END ADD MODAL---------------------------------------->
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