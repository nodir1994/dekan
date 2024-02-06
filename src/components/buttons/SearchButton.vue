<script setup lang="ts">
withDefaults(defineProps<{ iconClasses?: string; loading?: boolean }>(), {
  loading: false,
  iconClasses: "mdi mdi-magnify font-size-14 align-middle me-1",
});
</script>

<template>
  <button type="button" class="btn-search search-color" :disabled="loading">
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm me-1"
      role="status"
      aria-hidden="true"
    ></span>
    <i v-else :class="iconClasses"></i>
    <slot>
      {{ $t("search") }}
    </slot>
  </button>
</template>
