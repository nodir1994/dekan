<script setup lang="ts">
import { ref, watch } from "vue";

export interface PaginationLinkInterface {
  active: boolean;
  label: string;
  url: string | null;
}

export interface PaginationProps {
  current_page: number;
  data: [];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  links: PaginationLinkInterface[];
  next_page_url?: string | null;
  path?: string;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  total?: number;
  currentPage?: number;
  loading: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  links: () => [],
  last_page: 1,
  currentPage: 1,
  loading: false,
});
const emits = defineEmits<{
  (e: "update:currentPage", value: number): void;
}>();

const pagesCount = ref(1);
const lastInView = ref(1);

// hooks
watch(
  () => props.last_page,
  (newVal) => {
    if (newVal) {
      pagesCount.value = newVal > 4 ? 3 : newVal;
      lastInView.value = newVal > 4 ? 3 : newVal;
    }
  },
  { immediate: true }
);

watch(
  () => props.currentPage,
  (newVal) => {
    if (newVal) {
      if (
        newVal < pagesCount.value &&
        newVal >= 1 &&
        props.last_page > pagesCount.value
      ) {
        lastInView.value = pagesCount.value;
      } else if (newVal >= props.last_page - 2 && newVal <= props.last_page)
        lastInView.value = props.last_page;
      else if (newVal >= pagesCount.value && newVal < props.last_page - 2)
        lastInView.value = newVal + 1;
      // else lastInView.value = props.last_page;
    }
  },
  { immediate: true }
);

// functions
function updateCurrentPage(val: number) {
  emits("update:currentPage", props.currentPage + val);

  if (props.currentPage < pagesCount.value) {
    lastInView.value = pagesCount.value;
  } else if (
    props.currentPage >= pagesCount.value &&
    props.currentPage < props.last_page
  )
    lastInView.value = props.currentPage + 1;
}

function gotoLastPage() {
  emits("update:currentPage", props.last_page);
  lastInView.value = props.last_page;
}
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination mb-1">
      <li :class="['page-item', (currentPage === 1 || loading) && 'disabled']">
        <button class="page-link" @click="$emit('update:currentPage', 1)">
          <i class="mdi mdi-chevron-double-left"></i>
        </button>
      </li>
      <li :class="['page-item', (currentPage === 1 || loading) && 'disabled']">
        <button class="page-link" @click="updateCurrentPage(-1)">
          <i class="mdi mdi-chevron-left"></i>
        </button>
      </li>
      <template v-for="page in pagesCount">
        <li
          :class="[
            'page-item',
            page + (lastInView - pagesCount) === currentPage && 'active',
            loading && 'disabled',
          ]"
        >
          <button
            class="page-link"
            @click="
              $emit('update:currentPage', page + (lastInView - pagesCount))
            "
          >
            {{ page + (lastInView - pagesCount) }}
          </button>
        </li>
      </template>
      <template v-if="last_page > lastInView + 1">
        <li v-if="currentPage !== last_page">
          <button class="page-link">…</button>
        </li>
        <li :class="[loading && 'disabled']">
          <button class="page-link" @click="gotoLastPage">
            {{ last_page }}
          </button>
        </li>
      </template>
      <li
        :class="[
          'page-item',
          (currentPage === last_page || loading) && 'disabled',
        ]"
      >
        <button class="page-link" @click="updateCurrentPage(1)">
          <i class="mdi mdi-chevron-right"></i>
        </button>
      </li>
      <li
        :class="[
          'page-item',
          (currentPage === last_page || loading) && 'disabled',
        ]"
      >
        <button class="page-link" @click="gotoLastPage">
          <i class="mdi mdi-chevron-double-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
li.disabled {
  cursor: not-allowed;
}
</style>
