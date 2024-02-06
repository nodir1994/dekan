<script setup lang="ts">
import {
  fetchStudents,
  fetchAcademicGroupsByEduPlanID,
} from "@/utils/api/messages";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import SearchButton from "../buttons/SearchButton.vue";
import { isEmpty } from "lodash";

interface FormModalProps {
  selectedStudents: any[];
  isOpen: boolean;
}
const props = withDefaults(defineProps<FormModalProps>(), {
  isOpen: false,
});

const emits = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
  (e: "update:selectedStudents", value: any[]): void;
  (e: "update:academicGroupId", value: number): void;
  (e: "close"): void;
}>();

const { locale, t } = useI18n();
const isLoading = ref(false);
const isAllChecked = computed({
  get() {
    return (
      apiData.data?.length > 0 &&
      computedSelectedStudents.value.some((item) => item.id === "all_students")
    );
  },
  set(val) {
    if (val) {
      computedSelectedStudents.value = [
        {
          id: "all_students",
          full_name: t("All_students"),
        },
      ];

      if (filterForm.academic_group_id) {
        const selectedGroup = academicGroups.value.find(
          (item) => item.id === filterForm.academic_group_id
        );

        const groupName = selectedGroup?.name;

        computedSelectedStudents.value = [
          {
            id: "all_students",
            full_name: `${t("All_students")}(${groupName})`,
          },
        ];

        emits("update:academicGroupId", filterForm.academic_group_id);
      }

      emits("update:isOpen", false);

      // computedSelectedStudents.value = apiData.data?.map((item) => ({
      //   id: item.user_id,
      //   full_name: setFullName(item),
      // }));
    } else {
      computedSelectedStudents.value = [];
    }
  },
});
const computedSelectedStudents = computed({
  get() {
    return props.selectedStudents;
  },
  set(val) {
    emits("update:selectedStudents", val);
  },
});
const academicGroups = ref([]);
const apiData = ref<{
  current_page: number;
  data: [];
  links: [];
}>({
  current_page: 1,
  data: [],
  links: [],
});
const filterForm = reactive({
  search_string: "",
  academic_group_id: null,
});

// hooks
onMounted(async () => {
  const res = await fetchAcademicGroupsByEduPlanID();
  academicGroups.value = res;
});

watch(
  () => apiData.value.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      await fetchList(newVal);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => filterForm,
  async (newVal) => {
    if (newVal) {
      computedSelectedStudents.value = [];

      if (newVal.search_string.length === 0) {
        await fetchList();
      }
    }
  },
  { deep: true }
);

// functions
async function fetchList(page: number = 1) {
  try {
    isLoading.value = true;
    const params = {
      ...filterForm,
      page,
    };
    const res = await fetchStudents(params);

    apiData.value = res;
  } catch (error: any) {
    alert(error.response.data);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    id="studentsListModal"
    class="modal modal-lg fade"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="studentsListModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="studentsListModalLabel">
            {{ $t("Select_students") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="$emit('update:isOpen', false)"
          >
            x
          </button>
        </div>
        <div class="modal-body">
          <form class="row" @submit.prevent="fetchList(1)">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <ASelect
                  v-model:value="filterForm.academic_group_id"
                  :placeholder="$t('All')"
                  allow-clear
                >
                  <ASelectOption
                    v-for="(option, optionIndex) in academicGroups"
                    :value="option.id"
                  >
                    {{ option.name }}
                  </ASelectOption>
                </ASelect>
              </a-space>
              <label>{{ $t("Select_group") }}</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-input
                  id="yu1"
                  class="form-control"
                  v-model:value="filterForm.search_string"
                  allow-clear
                />
              </a-space>
              <label for="yu1">
                {{ $t("Search_by_name") }}
              </label>
            </div>
            <div class="my-2 col-xl-2">
              <SearchButton type="submit" :loading="isLoading" />
            </div>
          </form>

          <div class="table-responsive rounded-top">
            <table
              v-if="apiData.data?.length > 0"
              class="table table-sm table-striped"
            >
              <thead>
                <tr class="align-middle">
                  <th><b>#</b></th>
                  <th>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="isAllChecked"
                        :disabled="!isEmpty(filterForm.search_string)"
                      />
                    </div>
                  </th>
                  <th>
                    <b>{{ $t("Name") }}</b>
                  </th>
                  <th>
                    <b>{{ $t("Group") }}</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(element, elIndex) in apiData.data" :key="elIndex">
                  <td class="text-center">
                    {{
                      (apiData.current_page - 1) * apiData.per_page +
                      (elIndex + 1)
                    }}
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="computedSelectedStudents"
                        :value="{
                          id: element.user_id,
                          full_name: element.full_name,
                        }"
                        :disabled="isAllChecked"
                      />
                    </div>
                  </td>
                  <td>{{ element?.full_name }}</td>
                  <td>{{ element?.academic_group?.name }}</td>
                </tr>
              </tbody>
            </table>
            <NoDataBlock v-else />
          </div>
          <!-- ------------------------------------------------ -->
          <div class="d-flex justify-content-between">
            <div>
              <!-------------START PAGINATION-------------->
              <Pagination
                v-if="apiData.data.length"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
                :loading="isLoading"
              />
              <!-------------END PAGINATION-------------->
            </div>
            <div class="mt-3">
              <button
                type="button"
                class="btns c-cancel me-1"
                @click="$emit('update:isOpen', false)"
              >
                <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                {{ $t("Close") }}
              </button>
              <!-- <button
                class="btns c-save"
                type="button"
                :disabled="computedSelectedStudents.length === 0"
              >
                {{ $t("Add") }}
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
