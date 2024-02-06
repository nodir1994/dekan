<script lang="ts" setup>
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";
import { addExamSchedule } from "@/utils/api/lesson-exam";
import {
  academicGroupListByEduPlan,
  eduPlanListByFaculty,
  facultyList,
  semesterListByAcademicYearAndEduPlan,
  academicYearList,
} from "@/utils/api/reference";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

interface FilterProps {
  filterForm: {
    faculty_id: number | null;
    edu_plan_id: number | null;
    academic_year_id: number | null;
    semester_id: number | null;
    academic_group_id: number | null;
  };
}

const props = defineProps<FilterProps>();
const emits = defineEmits<{
  (e: "search"): void;
  (e: "open", value: number): void;
  (e: "update:filterForm", value: FilterProps["filterForm"]): void;
}>();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const optionsFaculty = ref([]);
const optionsEduPlan = ref([]);
const optionsAcademicYear = ref([]);
const optionsSemester = ref([]);
const optionsAcademicGroup = ref([]);
const academicYearIsCurrentTrue = ref();
const computedfilterForm = computed({
  get() {
    return props.filterForm;
  },
  set(val) {
    emits("update:filterForm", val);
  },
});

const filterFormErrors = reactive({
  academic_group_id: [],
  edu_plan_id: [],
  semester_id: [],
});
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
// hooks
onMounted(async () => {
  Promise.all([facultyList()]).then((responses: any) => {
    optionsFaculty.value = responses.result;
  });
  await fetchEduPlanListByFaculty();
  await fetchEducationYearByEduPlan();
  await fetchAcademicGroupByEduPlan();
  props.filterForm.academic_year_id = academicYearIsCurrentTrue.value;
});

watch(
  computedfilterForm,
  async (newVal, oldVal) => {
    emits("search");
  },
  { deep: true }
);

watch(
  () => computedfilterForm.value.faculty_id,
  async (newVal: any) => fetchEduPlanListByFaculty(newVal)
);
watch(
  () => computedfilterForm.value.edu_plan_id,
  (newVal) => {
    fetchEducationYearByEduPlan();
  },
  { immediate: true }
);
watch(
  () => computedfilterForm.value.academic_year_id,
  async (newVal, oldVal) => {
    fetchSemesterByEducationYearAndEduPlan(computedfilterForm.value);
  },
  { immediate: true }
);
watch(
  () => computedfilterForm.value.edu_plan_id,
  async (newVal, oldVal) => {
    fetchSemesterByEducationYearAndEduPlan(computedfilterForm.value);
  },
  { immediate: true }
);
watch(
  () => computedfilterForm.value.edu_plan_id,
  async (newVal: any) => fetchAcademicGroupByEduPlan(newVal)
);

// functions
async function onAddExam() {
  try {
    isLoading.value = true;
    const formData = {
      semester_id: computedfilterForm.value.semester_id,
      academic_group_id: computedfilterForm.value.academic_group_id,
    };
    const res = await addExamSchedule(formData);
    notif.success(t("Data_stored_successfully"));
    emits("open", res.result.id);
  } catch (error: any) {
    Object.assign(filterFormErrors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}

async function fetchEduPlanListByFaculty(val?: number) {
  const res = await eduPlanListByFaculty(val);
  optionsEduPlan.value = res.result?.data;
}
async function fetchEducationYearByEduPlan() {
  const res = await academicYearList();
  optionsAcademicYear.value = res.result?.data;
  academicYearIsCurrentTrue.value = res.result?.data.find(
    (x: any) => x.is_current == true
  ).id;
}
async function fetchSemesterByEducationYearAndEduPlan(val1?: any) {
  if (val1.edu_plan_id) {
    const res = await semesterListByAcademicYearAndEduPlan(val1);
    optionsSemester.value = res?.result?.data.map((item: any) => {
      return {
        id: item.id,
        name:
          item.semester +
          "-" +
          t("semester_number") +
          " / " +
          item.course +
          "-" +
          t("course_number"),
      };
    });
  }
}
async function fetchAcademicGroupByEduPlan(val?: number) {
  const res = await academicGroupListByEduPlan(val);
  optionsAcademicGroup.value = res.result?.data;
}
</script>

<template>
  <div class="collapse__block">
    <b-collapse visible id="collapse-3">
      <b-card>
        <div class="row">
          <div class="my-2 col-md-6 form--item">
            <a-space>
              <a-select
                class="form--item"
                v-model:value="deanId"
                :field-names="{ value: 'id', label: 'name' }"
                :options="optionsFaculty"
                disabled
                allow-clear
                show-search
              ></a-select>
            </a-space>
            <label for="yu">{{ $t("Choose_faculty") }}</label>
          </div>
          <div class="my-2 col-md-6 form--item">
            <a-space>
              <a-select
                v-model:value="filterForm.edu_plan_id"
                class="form--item"
                :field-names="{ value: 'id', label: 'name' }"
                :options="optionsEduPlan"
                allow-clear
                show-search
              >
              </a-select>
            </a-space>
            <label for="yu">{{ $t("Choose_Curriculum") }}</label>
          </div>
          <div class="my-2 col-md-3 form--item">
            <a-space>
              <a-select
                class="form--item"
                v-model:value="filterForm.academic_year_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="optionsAcademicYear"
                :disabled="!filterForm.edu_plan_id"
                allow-clear
                show-search
              >
              </a-select>
            </a-space>
            <label for="yu">{{ $t("Choose_Education_Year") }}</label>
          </div>
          <div class="my-2 col-md-3 form--item">
            <a-space>
              <a-select
                class="form--item"
                v-model:value="filterForm.semester_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="optionsSemester"
                allow-clear
                :disabled="optionsSemester.length == 0"
                show-search
              >
              </a-select>
            </a-space>
            <label for="yu">{{ $t("Choose_Semester") }}</label>
            <span class="text-danger">
              {{ filterFormErrors.semester_id[0] }}
            </span>
          </div>
          <div class="my-2 col-md-4 form--item">
            <a-space>
              <a-select
                class="form--item"
                v-model:value="filterForm.academic_group_id"
                :field-names="{ value: 'id', label: 'name' }"
                :options="optionsAcademicGroup"
                :disabled="optionsSemester.length == 0"
                allow-clear
                show-search
              >
              </a-select>
            </a-space>
            <label for="yu">{{ $t("Select_Group") }}</label>
            <span class="text-danger">
              {{ filterFormErrors.academic_group_id[0] }}
            </span>
          </div>
          <div class="my-2 col-md-2">
            <button
              class="btn-search c-save"
              type="button"
              @click="onAddExam"
              :disabled="
                !filterForm.academic_group_id || !filterForm.semester_id
              "
            >
              <span
                class="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
                v-if="isLoading"
              ></span>
              <i v-else class="mdi mdi-plus font-size-14 align-middle me-1"></i>
              <span>{{ $t("Create") }}</span>
            </button>
          </div>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>
