<template>
  <a-select
    allow-clear
    v-model:value="value"
    :placeholder="$t('Choose')"
    @change="$emit('update:value', value)"
  >
    <a-select-option :value="true" label="true">{{
      $t("Active")
    }}</a-select-option>
    <a-select-option :value="false" label="false">{{
      $t("Disable")
    }}</a-select-option>
  </a-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emits = defineEmits<{
  (e: "update:value"): void;
}>();

const value = ref();
</script>
