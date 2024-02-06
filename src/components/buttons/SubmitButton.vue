<script setup lang="ts">

defineProps({
  loading: false,
  icon: "",
});
</script>

<template>
  <button type="submit" class="btns c-save" :disabled="loading">
    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" v-if="loading"></span>
    <i v-else :class="`mdi mdi-${icon} font-size-14 align-middle me-1`"></i>
    <slot>
      {{ $t("Save") }}
    </slot>
  </button>
</template>
