<script lang="ts" setup>
import { useMessageStore } from "@/stores/message";
import { ref, watch } from "vue";

// const props = withDefaults(
//   defineProps<{
//     isLoading: boolean;
//   }>(),
//   {
//     isLoading: false,
//   }
// );
const messageStore = useMessageStore();
const searchString = ref("");
const isLoading = ref(false);

// hooks
watch(searchString, (newVal) => {
  if (newVal === "") {
    messageStore.updateSearchString(searchString.value);
  }
});

// functions
async function onSearch() {
  messageStore.updateSearchString(searchString.value);
}
</script>

<template>
  <div class="collapse__block">
    <div class="collapse show" id="collapse-3">
      <div class="card p-3">
        <form class="row" @submit.prevent="onSearch">
          <div class="my-2 col-xl-10 form--item">
            <a-space>
              <a-input
                v-model:value="searchString"
                id="yu"
                class="form-control"
                allow-clear
              />
            </a-space>
            <label for="yu">{{ $t("Search_by_name") }}</label>
          </div>
          <div class="my-2 col-xl-2">
            <SearchButton type="submit" :loading="isLoading" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
