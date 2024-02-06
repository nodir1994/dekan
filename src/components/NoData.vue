<script setup lang="ts"></script>
<template>
  <tr>
    <td colspan="6" class="py-5">
      <h5 class="text-center">{{ $t("No_data") }}</h5>
      <p class="text-center">
        {{ $t("No_information_found") }}
      </p>
    </td>
  </tr>
</template>
<style lang="scss" scoped>
tr {
  display: block;
  td {
    width: 100%;
    display: block;
  }
}
</style>
