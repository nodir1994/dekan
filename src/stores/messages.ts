import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore('messageIdd', {
    state: () => {
      return {
        id: 0
      }
    },
    getters: {
        getPostAuthor: (state) => {
          return state.id
        }
      },
  })
