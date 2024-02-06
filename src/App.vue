<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";
import { useHead } from "@vueuse/head";

const { t } = useI18n();

useHead({
  title: `${t("dean_department")} - Eduni`,
});
</script>

<template>
  <RouterView />
</template>
