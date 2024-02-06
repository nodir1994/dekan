<template>
  <div pagetitle="'Dars jadvali'" class="timetable">
    <div class="card">
      <div class="card-body">
        <a-alert :message="`You selected date: ${selectedValue && selectedValue.format('DD-YYYY-MM')}`" />
        <a-calendar :locale="locale" v-model="date" @select="onSelect" @panelChange="onPanelChange">
          <!-- <template #dateCellRender="{current}"> -->
            <!-- <a-button type="primary" data-bs-toggle="modal" data-bs-target="#myModalStudents"><i
                class="mdi mdi-plus"></i></a-button> -->
            <!-- <a-modal v-model:visible="visible" :title="current && current.format('YYYY-MM-DD')" @ok="handleOk">
              <a-form-item label="Dars jadvalini kiriting" >
                <a-input  />
              </a-form-item>
            </a-modal> -->
            <!-- {{current && current.format('YYYY-MM-DD')}} -->
            <!-- <ul class="events">
              <li v-for="item in getListData(current)" :key="item.content">
                <a-badge :status="item.type" :text="item.content" />
              </li>
            </ul>
          </template> -->
          <!-- <template #monthCellRender="{ current }">
            <div v-if="getMonthData(current)" class="notes-month">
              <section>{{ getMonthData(current) }}</section>
              <span>Backlog number</span>
            </div>
          </template> -->
        </a-calendar>
      </div>
    </div>
  </div>
  <!-------START MODAL-talaba--------------------------------------->
  <div id="myModalStudents" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="myModalLabel">
            Dars jadvalini kiriting
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="mdi mdi-close font-size-18"></i>
          </button>
        </div>
        <div class="modal-body">
          <a-form-item class="mb-3" :rules="[
            {
              required: true,
              message: `Ma'lumot bo'sh bo'lishi mumkin emas!`,
            },
          ]">
            <label for="division-name-input" class="form-label">Ma'lumot ({{selectedValue && selectedValue.format('YYYY-MM-DD')}})</label>
            <a-textarea   placeholder=""
              :auto-size="{ minRows: 2, maxRows: 15 }" />
          </a-form-item>
        </div>
      </div>
    </div>
  </div>
  <!-------END MODAL---------------------------------------->
</template>

<script>

import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import moment from 'moment';
// import 'moment/locale/ru_RU';
// import locale from 'ant-design-vue/es/date-picker/locale/ru_RU';
import locale from 'ant-design-vue/es/calendar/locale/ru_RU';
// import { ConfigProvider } from 'antd';
// import frFR from 'antd/es/locale/fr_FR';

export default defineComponent({
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
    const value = ref();
    const date = ref(dayjs('2017-01-25'));
    const selectedValue = ref(dayjs('2017-01-25'));

    const onSelect = value => {
      date.value = value;
      selectedValue.value = value;
    };

    const onPanelChange = value => {
      date.value = value;
    };


    const getListData = value => {
      let listData;


      switch (value.date()) {
        case 8:
          listData = [{
            type: 'warning',
            content: 'This is warning event.',
          }, {
            type: 'success',
            content: 'This is usual event.',
          }];
          break;

        case 10:
          listData = [{
            type: 'warning',
            content: 'This is warning event.',
          }, {
            type: 'success',
            content: 'This is usual event.',
          }, {
            type: 'error',
            content: 'This is error event.',
          }];
          break;

        case 15:
          listData = [{
            type: 'warning',
            content: 'This is warning event',
          }, {
            type: 'success',
            content: 'This is very long usual event。。....',
          }, {
            type: 'error',
            content: 'This is error event 1.',
          }, {
            type: 'error',
            content: 'This is error event 2.',
          }, {
            type: 'error',
            content: 'This is error event 3.',
          }, {
            type: 'error',
            content: 'This is error event 4.',
          }];
          break;

        default:
      }

      return listData || [];
    };

    const getMonthData = value => {
      (value.month());
      // if (value.month() === 8) {
      //   return 1394;
      // }
    };

    return {
      value,
      getListData,
      getMonthData,
      date,
      selectedValue,
      onSelect,
      onPanelChange,
      visible,
      showModal,
      handleOk,
      locale,
      moment
    };
  },
  components: {
  },
});
</script>

<style lang="scss">
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content {
  height: auto;
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-body th,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-body td {
  vertical-align: baseline;
}

.ant-picker-calendar-header .ant-picker-calendar-mode-switch {
  display: flex;
  align-items: center;
}
.timetable{
  .ant-picker-content{
    thead, tbody {
      th:nth-child(6),td:nth-child(6){
        display: none;
      }
    }
  }
}
</style>





