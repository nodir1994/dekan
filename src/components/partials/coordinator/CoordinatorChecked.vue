<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    isAllChecked: boolean;
    checkedMessagesLength: number;
  }>(),
  {
    isAllChecked: false,
    checkedMessagesLength: 0,
  }
);

const emits = defineEmits<{
  (e: "update:isAllChecked", value: boolean): void;
}>();

const computedValue = computed({
  get() {
    return props.isAllChecked;
  },
  set(value) {
    emits("update:isAllChecked", value);
  },
});
</script>

<template>
  <input
    v-model="computedValue"
    id="check-all"
    class="form-check-input"
    type="checkbox"
  />
</template>
