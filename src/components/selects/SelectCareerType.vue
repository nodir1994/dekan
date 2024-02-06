<template>
  <a-select
    v-model:value="value"
    :field-names="{ value: 'id', label: 'name' }"
    :options="options"
    @change="$emit('update:value', value)"
    allow-clear
    :placeholder="$t('Choose')"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listCareerType } from "@/utils/api/careers";

const emits = defineEmits<{
  (e: "update:value", value: any): void;
}>();

const options = ref([]);

onMounted(async () => {
  let res = await listCareerType().then((res) => res.result);
  res.forEach((element) => {
    if (element.code !== "action" && element.code !== "scientific-career") {
      options.value.push(element);
    }
  });
});

const value = ref<any>();
</script>
