<script setup lang="ts">
import { fetchEmployees, departmentsList } from "@/utils/api/messages";
import type { EmployeeInterface } from "@/utils/interfaces";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import SearchButton from "../buttons/SearchButton.vue";
import NoDataBlock from "../partials/NoDataBlock.vue";
import { isEmpty } from "lodash";
import loader from "@intlify/vue-i18n-loader";

interface FormModalProps {
  selectedEmployees: number[];
  isOpen: boolean;
}
const props = withDefaults(defineProps<FormModalProps>(), {
  isOpen: false,
});

const emits = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
  (e: "update:selectedEmployees", value: number[]): void;
  (e: "update:departmentId", value: number): void;
  (e: "close"): void;
}>();

const { locale, t } = useI18n();
const isLoading = ref(false);
const isLoader = ref(true);
const isAllChecked = computed({
  get() {
    return (
      apiData.data?.length > 0 &&
      computedSelectedEmployees.value.some(
        (item) => item.id === "all_employees"
      )
    );
  },
  set(val) {
    if (val) {
      computedSelectedEmployees.value = [
        {
          id: "all_employees",
          full_name: t("All_employees"),
        },
      ];

      if (filterForm.department_id) {
        const selectedDept = optionsDepartment.value.find(
          (item) => item.id === filterForm.department_id
        );

        const deptName = selectedDept?.name[locale] ?? selectedDept?.name["uz"];

        computedSelectedEmployees.value = [
          {
            id: "all_employees",
            full_name: `${t("All_employees")}(${deptName})`,
          },
        ];

        emits("update:departmentId", filterForm.department_id);
      }

      emits("update:isOpen", false);
    } else {
      computedSelectedEmployees.value = [];
    }
  },
});
const computedSelectedEmployees = computed({
  get() {
    return props.selectedEmployees;
  },
  set(val) {
    emits("update:selectedEmployees", val);
  },
});
const optionsDepartment = ref([]);
const apiData: {
  current_page: number;
  data: EmployeeInterface[];
  links: [];
} = reactive({
  current_page: 1,
  data: [],
  links: [],
});
const filterForm = reactive({
  search_string: "",
  department_id: null,
});

// hooks
onMounted(async () => {
  const res = await departmentsList();
  optionsDepartment.value = res;
});

watch(
  () => apiData.current_page,
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
      computedSelectedEmployees.value = [];

      if (newVal.search_string.length === 0) {
        await fetchList();
      }
    }
  },
  { deep: true }
);

// functions
async function fetchList(page: number = 1) {
  isLoading.value = true;
  const params = {
    ...filterForm,
    page,
  };
  if (isLoader.value) {
    isLoader.value = false;
    const res = await fetchEmployees(params);
    Object.assign(apiData, res);
    setTimeout(() => {
      isLoader.value = true;
    }, 100);
  }

  isLoading.value = false;
}
</script>

<template>
  <div
    id="employeesListModal"
    class="modal modal-lg fade"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="employeesListModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="employeesListModalLabel">
            {{ $t("Select_employee") }}
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
          <form class="row" @submit.prevent="fetchList">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <ASelect
                  v-model:value="filterForm.department_id"
                  :placeholder="$t('All')"
                  allow-clear
                >
                  <ASelectOption
                    v-for="(option, optionIndex) in optionsDepartment"
                    :value="option.id"
                  >
                    {{ option.name[locale] || option.name["uz"] }}
                  </ASelectOption>
                </ASelect>
              </a-space>
              <label>{{ $t("Select_cathedra_section") }}</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-input
                  id="yu4"
                  class="form-control"
                  v-model:value="filterForm.search_string"
                  allow-clear
                />
              </a-space>
              <label for="yu4">
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
                    <b>{{ $t("Department") }}</b>
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
                        v-model="computedSelectedEmployees"
                        :value="{
                          id: element.user_id,
                          full_name: element.full_name,
                        }"
                        :disabled="isAllChecked"
                      />
                    </div>
                  </td>
                  <td>{{ element?.full_name }}</td>
                  <td>{{ element?.departments[0]?.name[locale] }}</td>
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
                :disabled="computedSelectedEmployees.length === 0"
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
