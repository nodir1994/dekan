<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps({
    field: null,
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    errorText: {
      type: String,
      default: "",
      required: false,
    },
    labelText: {
      type: String,
      default: "",
      required: false,
    },
    fieldNames: {
      type: Object,
      default: () => ({ value: "id", label: "name" }),
      required: false,
    },
  });
  const emits = defineEmits(["update:field", "update:errorText"]);

  const computedField = computed({
    get() {
      return props.field;
    },
    set(val) {
      emits("update:field", val);
    },
  });

  function clearError() {
    emits("update:errorText", "");
  }
</script>

<template>
  <div>
    <label :for="labelText" class="form-label">
      {{ labelText }}
    </label>
    <a-select
      :id="labelText"
      v-model:value="computedField"
      :options="options"
      :field-names="fieldNames"
      @change="clearError"
    />
    <span v-if="errorText" class="text-danger small">
      {{ errorText }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
