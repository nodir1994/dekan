<script setup lang="ts">
import LoadingOutlined from "@ant-design/icons-vue/lib/icons/LoadingOutlined";
import { h } from "vue";

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "24px",
  },
  spin: true,
});
</script>

<template>
  <div class="loader_overlay">
    <a-spin :indicator="indicator" />
  </div>
</template>

<style>
.loader_overlay {
  top: 0;
  bottom: 0;
  z-index: 10;
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.748);
}
</style>
