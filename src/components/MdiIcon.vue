<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      color?: string;
      icon: string;
      size?: string;
    }>(),
    {
      color: "",
      icon: "null",
      size: "1rem",
    }
  );
</script>

<template>
  <i
    :class="['mdi', icon && `mdi-${icon}`, color && `text-${color}`]"
    :style="{ 'font-size': size }"
  ></i>
</template>
