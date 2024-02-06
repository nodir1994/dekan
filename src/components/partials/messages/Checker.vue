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
  <div class="d-flex gap-3 align-items-center">
    <div class="form-check my-2">
      <input
        v-model="computedValue"
        id="check-all"
        class="form-check-input"
        type="checkbox"
      />
      <label for="check-all" class="form-check-label d-flex gap-2 mt-1">
        <span v-if="checkedMessagesLength">{{ checkedMessagesLength }}</span>
        <span v-if="isAllChecked">{{ $t("Deselect") }}</span>
        <span v-else="isAllChecked">{{ $t("Select_all") }}</span>
      </label>
    </div>
    <template v-if="checkedMessagesLength > 0">
      <div class="btn-group gap-2">
        <slot></slot>
      </div>
    </template>
  </div>
</template>
