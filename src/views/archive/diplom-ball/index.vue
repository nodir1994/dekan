<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { educationList, eduFormList } from "@/utils/api/reference";
import { getSubjectsBySemestrId } from "@/utils/api/reference/id";
import {
  getListStudents,
  setBallStudent,
} from "@/utils/api/archive/diplom_ball";
import {
  semesterByIdOnlyEduPlan,
  academicGroupById,
  eduPlanById,
} from "@/utils/api/reference/id";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import helpers from "@/utils/helper";
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  edu_type_id: null,
  semester_id: null,
  academic_group_id: null,
  edu_form_id: null,
  edu_year_id: null,
  data: [],
  links: [],
  students: [],
  current_page: 1,
  per_page: helpers.pagePer,
  subject_id: null,
  balls: [],
});

const sideFormOptions = reactive({
  eduTypeOptions: null,
  eduFormOptions: null,
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  subjectListOptions: null,
});

const plainOptions: any = reactive([]);
const loader = ref(true);

// const checkAll = computed({
//     get() {
//         return apiData?.students?.length === plainOptions?.value?.length
//     },
//     set(val) {
//         if (val) {
//             apiData.students = plainOptions.value
//         } else {
//             apiData.students = []
//         }
//     }
// })
const datas = ref<any[]>([]);

onMounted(async () => {
  sideFormOptions.eduTypeOptions = await educationList().then(
    (res) => res.result
  );
  sideFormOptions.eduFormOptions = await eduFormList().then(
    (res) => res.result
  );
});

// watch(
//   () => apiData.edu_type_id,
//   async () => {
//     await fetchList();
//   }
// );

// watch(
//   () => apiData.subject_id,
//   async () => {
//     await fetchList();
//   }
// );

watch(
  () => apiData.edu_form_id,
  async () => {
    apiData.edu_plan_id = null;
    // await fetchList();
    if (apiData.edu_form_id) {
      sideFormOptions.eduPlanOptions = await eduPlanById(
        apiData.edu_form_id
      ).then((res) => res.result?.data);
    }
  }
);

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.academicGroupOptions = null;

    // await fetchList();
    if (apiData.edu_plan_id) {
      let res = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );

      let res2 = await semesterByIdOnlyEduPlan(apiData.edu_plan_id);
      sideFormOptions.semesterOptions = res2?.result?.data.map((item: any) => {
        return {
          id: item.id,
          name:
            item.course +
            "-" +
            t("Course") +
            " " +
            item.semester +
            "-" +
            t("semester"),
        };
      });
    }
  }
);

watch(
  () => apiData.semester_id,
  async (newVal) => {
    apiData.subject_id = null;
    sideFormOptions.subjectListOptions = null;
    if (newVal) {
      sideFormOptions.subjectListOptions = await getSubjectsBySemestrId(
        apiData.edu_plan_id,
        apiData.semester_id
      ).then((res) =>
        res.result.map((item: any) => {
          return {
            id: item?.subject?.id,
            name: item?.subject?.name,
          };
        })
      );
    }
    // await fetchList();
  }
);
// watch(
//   () => apiData.academic_group_id,
//   async () => {
//     await fetchList();
//   }
// );

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
async function onSearch() {
  await fetchList();
}

async function setBall() {
  try {
    isLoading.value = true;
    // let datas = {}
    const res = await setBallStudent(datas.value);
    notif.success(t("updated_successfully"));
    fetchList();
  } catch (error: any) {
    Object.assign(error, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function fetchList(page?: number) {
  isLoading.value = true;
  let datas: any = {
    page: apiData.page,
  };
  if (!page) {
    datas.page = 1;
  }
  if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  if (apiData.edu_type_id) datas.edu_type_id = apiData.edu_type_id;
  if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData.academic_group_id;
  if (apiData.subject_id) datas.subject_id = apiData.subject_id;

  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(datas);
      Object.assign(apiData, res.result);
      plainOptions.value = apiData.data.map((item: any) => {
        return {
          id: item?.id,
          grade: item?.ball,
        };
      });
      setTimeout(() => {
        loader.value = true;
      }, helpers.loaderRefresh);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

function updateBalls(event: Event, id: number) {
  const target: any = event.target;
  const elIndex = datas.value.findIndex((item) => item.id == id);
  if (elIndex === -1) datas.value.push({ id, ball: target.value });
  else datas.value.splice(elIndex, 1, { id, ball: target.value });
}
</script>
<template>
  <div pagetitle="`Akademik ma'lumotnoma`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("archive_Batch_Rate") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <!-- //Ta'lim turi  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_type_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduTypeOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>

            <!-- //Ta'lim shakli  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduFormOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Education_Form") }}</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.edu_plan_id"
                  :disabled="!apiData.edu_form_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Curriculum") }}</label>
            </div>

            <!-- //semestr  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.semester_id"
                  :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>

            <!-- //Guruhni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.academic_group_id"
                  :disabled="!apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Group") }}</label>
            </div>

            <!-- //Malakaviy amaliyot  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  allow-clear
                  v-model:value="apiData.subject_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.semester_id"
                  :options="sideFormOptions.subjectListOptions"
                  :placeholder="t('Choose')"
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Subject") }}</label>
            </div>
            <div class="my-2 col-md-2">
              <button
                type="submit"
                :disabled="
                  !apiData.subject_id ||
                  !apiData.academic_group_id ||
                  !apiData.edu_plan_id ||
                  !apiData.semester_id ||
                  !apiData.edu_form_id
                "
                class="btn-search search-color"
              >
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"> </i>
                {{ $t("View") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-diplom-ball-index">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("mastered__subjects") }}</th>
                    <th>{{ $t("mastered") }}</th>
                    <th>{{ $t("acload/credit") }}</th>
                    <th>{{ $t("Curriculum_Marking_System") }}</th>
                    <th>{{ $t("Score") }}</th>
                    <th>{{ $t("gradeSome") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-diplom-ball-index"
                    v-for="(element, index) in apiData.data"
                    :key="element.id"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.student }}
                    </td>
                    <td>
                      {{ element?.subject }}
                    </td>
                    <td>
                      <span v-if="element?.is_learning">{{ $t("yes") }}</span>
                      <span v-else>{{ $t("No") }}</span>
                    </td>
                    <td>{{ element?.load }} / {{ element?.credit }}</td>
                    <td>
                      {{ element?.rating_system }}
                    </td>
                    <td>
                      <input
                        class="text-end"
                        type="number"
                        min="1"
                        max="100"
                        :value="element.ball"
                        @input="(e) => updateBalls(e, element.id)"
                      />
                    </td>
                    <td>{{ element?.grade }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end mt-3">
                <button class="btns c-save py-1.5 px-4" @click="setBall">
                  {{ $t("assign") }}
                </button>
              </div>
              <!-------------START PAGINATION-------------->
              <Pagination
                v-if="apiData.last_page > 1"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
              />
              <!-------------END PAGINATION-------------->
            </div>
            <div v-else>
              <h5 class="text-center">{{ $t("No_data") }}</h5>
              <p class="text-center">
                {{ $t("No_information_found") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-diplom-ball-index {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 250px 140px 150px 130px 100px 80px;

  input {
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 2px 5px;
    outline: none;
  }
}

.c-save {
  &:hover {
    color: #fff;
  }
}
</style>
