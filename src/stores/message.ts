import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("messageStore", () => {
  const isLoading = ref(false);
  const searchString = ref("");

  function updateSearchString(str: string) {
    searchString.value = str;
  }

  return { isLoading, searchString, updateSearchString };
});
