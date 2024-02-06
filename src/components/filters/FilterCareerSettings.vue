<template>
  <div class="collapse_block">
    <b-collapse visible id="collapse-3">
      <b-card>
        <form class="row" @submit.prevent="onSearch">
          <!-- search name  -->
          <div class="my-2 col-md-5 form--item">
            <a-space>
              <a-input
                id="name"
                :placeholder="$t('Enter')"
                class="form-control"
                v-model:value="filterForm.search"
                allow-clear
              />
            </a-space>
            <label for="name">{{ $t("Search_by_name") }}</label>
          </div>
          <!-- turi bo'yicha  -->
          <div class="my-2 col-md-3 form--item">
            <a-space>
              <SelectCareerType v-model:value="filterForm.reward_type_id" />
            </a-space>
            <label for="...">{{ $t("choose__type") }}</label>
          </div>

          <!-- holati ] bo'yicha  -->
          <div class="my-2 col-md-2 form--item">
            <a-space>
              <SelectElementStatus v-model:value="filterForm.status" />
            </a-space>
            <label for="...">{{ $t("Select_status") }}</label>
          </div>

          <!-- search  -->
          <div class="my-2 col-md-2">
            <ButtonSearch :disabled="!filterForm.search" />
          </div>
        </form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
// components
import ButtonSearch from "../buttons/ButtonSearch.vue";
import SelectCareerType from "../selects/SelectCareerType.vue";
import SelectElementStatus from "../selects/SelectElementStatus.vue";

interface FilterProps {
  filterForm: {
    search: string | null;
    reward_type_id: number | null;
    status: string | null;
  };
}
const props = defineProps<FilterProps>();
const emits = defineEmits<{
  (e: "update:filterForm", value: any): void;
  (e: "search"): void;
}>();

const computedFilterForm = computed({
  get() {
    return props.filterForm;
  },
  set(val) {
    emits("update:filterForm", val);
  },
});

async function onSearch() {
  emits("search");
}
</script>
