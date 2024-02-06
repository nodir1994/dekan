<template>
  <div pagetitle="'Dars jadvali'" class="timetable">
    <div class="card">
      <div class="card-body">
        <div class="change-locale">
          <span style="margin-right: 16px">Change locale of components:</span>
          <a-radio-group v-model:value="locale">
            <a-radio-button key="en" :value="enUS.locale">English</a-radio-button>
            <a-radio-button key="cn" :value="zhCN.locale">中文</a-radio-button>
            <a-radio-button key="uz" :value="uzUZ.locale">Uzbek</a-radio-button>
          </a-radio-group>
        </div>
        <a-config-provider :locale="locale === 'en' ? enUS : (locale === 'ru' ? zhCN : uzUZ)">
          <a-calendar />
        </a-config-provider>
        <button ref="trig" @click="showModal">Press me ...</button>
        <button @click="triggerFunction">Trigger</button>
      </div>
    </div>
  </div>
</template>
<script>
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/ru_RU';
import uzUZ from '../../../../ants/fr_FR';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/uz';
import { defineComponent, ref, watch } from 'vue';
dayjs.locale('en', {
  week: {
    dow: 1
  }
});
export default defineComponent({
  setup() {
    const locale = ref(enUS.locale);
    const showModal = function () {
      console.log(1515);
    }
    const trig = ref(null)
    const triggerFunction = function () {
      trig.value.click()
    }
    watch(locale, val => {
      dayjs.locale(val);
    });
    return {
      locale,
      dayjs,
      enUS,
      zhCN,
      uzUZ,
      showModal,
      triggerFunction,
      trig
    };
  },

});
</script>
<style scoped>

</style>