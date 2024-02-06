<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps({
    field: {
      type: String || Number,
      default: "",
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
    <a-input
      :id="labelText"
      v-model:value="computedField"
      @input="clearError"
    />
    <span v-if="errorText" class="text-danger small">
      {{ errorText }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
