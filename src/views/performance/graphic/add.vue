<script setup lang="ts">
import { allDate, allTables } from "../../data";

import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute, useRouter } from "vue-router";
import {
  subjectList,
  orderList,
  getStudentByIdNotGraph,
  setGraph,
} from "@/utils/api/performance/graph";

const route = useRoute();
const router = useRouter();
const id = route.query.id || "";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const plainOptions = ref([]);
const checkAll = computed({
  get() {
    return (
      apiData?.subjects?.length === plainOptions?.value?.length &&
      plainOptions?.value?.length > 0
    );
  },
  set(val) {
    if (val) {
      apiData.subjects = plainOptions.value;
    } else {
      apiData.subjects = [];
    }
  },
});

const apiData = reactive({
  student: null,
  student_id: null,
  number: null,
  date: null,
  command_id: null,
  semester_id: null,
  subjects: [],
  subjectList: [],
});

const sideFormOptions = reactive({
  orderOptions: null,
  semesterOptions: null,
});

const loader = ref(true);

onMounted(async () => {
  if (id) {
    apiData.student = await getStudentByIdNotGraph(id).then(
      (res) => res.result
    );
    apiData.student_id = apiData.student.id;
    sideFormOptions.semesterOptions = apiData.student.semesters.map((item) => {
      return {
        id: item.id,
        name: item.semester + "-semestr",
      };
    });
  }
  sideFormOptions.orderOptions = await orderList().then(
    (res) => res.result.data
  );
});

watch(
  () => apiData.semester_id,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.subjects = [];
      apiData.subjectList = [];
      plainOptions.value = [];
      apiData.subjectList = await subjectList({
        student_id: apiData.student_id,
        semester_id: apiData.semester_id,
      }).then((res) => res.result);
      apiData.subjectList.forEach(function (item) {
        if (!item.ball) plainOptions.value.push(item.subject_id);
      });
    }
  }
);

async function createGraph() {
  try {
    let params = {
      student_id: apiData.student_id,
    };
    if (apiData.number) params.number = apiData.number;
    if (apiData.date) params.date = apiData.date;
    if (apiData.command_id) params.command_id = apiData.command_id;
    if (apiData.semester_id) params.semester_id = apiData.semester_id;
    if (apiData.subjects.length) params.subjects = apiData.subjects;
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await setGraph(params);
      router.push(`/performance/graphic/${res?.result.id}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="`Talaba ma'lumotlari`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card mb-3">
      <div class="card-body">
        <div class="mb-3">
          <router-link to="/performance/graphic/create"
            ><button class="btns back-c py-1.5 px-4" type="button">
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Prev") }}
            </button></router-link
          >
        </div>
        <h5 class="card-title mb-3">{{ $t("Student_information") }}</h5>
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-rowed2">
                <th>{{ $t("Student") }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("by_Specialty") }}</th>
                <th>{{ $t("Group") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-rowed2">
                <td>
                  {{ apiData?.student?.fullname }}
                </td>
                <td>
                  <div>
                    {{ apiData?.student?.specialty?.edu_type?.name }} <br />
                    <span style="color: #ccc; font-size: inherit">{{
                      apiData?.student?.edu_form
                    }}</span>
                  </div>
                </td>
                <td>
                  {{ apiData?.student?.specialty?.name }}
                </td>
                <td>
                  {{ apiData?.student?.academic_group }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Data") }}</h5>
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
          <div class="row">
            <div class="my-2 col-xl-3">
              <label class="form-label" for="yu">{{ $t("Ptt_Number") }}</label>
              <a-input
                id="yu"
                v-model:value="apiData.number"
                class="form-control"
              />
            </div>
            <div class="my-2 col-xl-3">
              <label for="division-name-input" class="form-label">{{
                $t("apply_Date")
              }}</label>
              <a-date-picker
                v-model:value="apiData.date"
                placeholder="YYYY-MM-DD"
                type="date"
                value-format="YYYY-MM-DD"
              />
            </div>
            <div class="my-2 col-xl-3">
              <label for="division-name-select" class="form-label">{{
                $t("Decree")
              }}</label>
              <a-select
                :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.orderOptions"
                :placeholder="t('Choose')"
                allow-clear
                v-model:value="apiData.command_id"
              >
              </a-select>
            </div>
            <div class="my-2 col-xl-3">
              <label for="division-name-select" class="form-label">{{
                $t("Semester_Name")
              }}</label>
              <a-select
                v-model:value="apiData.semester_id"
                :placeholder="t('Choose_Semester')"
                :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.semesterOptions"
                allow-clear
              >
              </a-select>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division" v-if="apiData.semester_id">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="top d-flex justify-content-between mb-4">
              <h5 class="mb-0">{{ $t("Self plan_courses") }}</h5>
              <span>* {{ $t("system__grade__5") }}</span>
            </div>
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-key-elements32">
                    <th>#</th>
                    <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll"
                        />
                      </div>
                    </th>
                    <th>{{ $t("Subjects") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("sciense_type") }}</th>
                    <th>{{ $t("acload/credit") }}</th>
                    <th>{{ $t("Score") }}</th>
                    <th>{{ $t("gradeSome") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-key-elements32"
                    v-for="(element, ind) in apiData.subjectList"
                    :key="ind"
                  >
                    <td>{{ ind + 1 }}</td>
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          :disabled="element?.ball"
                          class="form-check-input"
                          v-model="apiData.subjects"
                          :value="element?.subject_id"
                        />
                      </div>
                    </td>
                    <td>
                      {{ element?.subject }}
                    </td>
                    <td>
                      {{ element?.semester?.semester }} -
                      {{ $t("semester_number") }}
                    </td>
                    <td>
                      {{ element?.subject_type }}
                    </td>
                    <td>{{ element?.load }}/{{ element?.credit }}</td>
                    <td>{{ element?.ball }}</td>
                    <td>{{ element?.grade }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end mt-3">
              <button
                class="btns c-save"
                type="button"
                @click="createGraph"
                :disabled="
                  !apiData.subjects.length ||
                  !apiData.number ||
                  !apiData.date ||
                  !apiData.command_id
                "
              >
                <i class="mdi mdi-check font-size-14 align-middle me-1"></i
                >{{ $t("Save") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-rowed2 {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: auto 20% 35% 20%;
}

.table-key-elements32 {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px 50px auto 150px 200px 200px 100px 100px;
}

.c-save {
  &:hover {
    color: #fff;
  }
}
</style>
