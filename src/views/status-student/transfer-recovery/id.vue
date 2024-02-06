<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import {
  semesterByIdOnlyEduPlan,
  academicGroupById,
  eduPlanById,
} from "@/utils/api/reference/id";
import draggable from "vuedraggable";
import {
  getListStudentById,
  getOrderList,
  getSubjectsByEduPlan,
  transferRecoverStudy
} from "@/utils/api/student-action/recover";
import { useNotyf } from "@/composable/useNotyf";
import helpers from "@/utils/helper";
const notif = useNotyf();

const list1 = ref([]);
const list2 = reactive([]);
const list3 = reactive([]);
const list4 = reactive([]);
const list5 = ref([]);


const allSemesters = ref([])

const route = useRoute();
const { t } = useI18n();
const isLoading = ref(false);
const id = route.params.id;
const router = useRouter();

const apiData: any = reactive({
  search: "",
  edu_plan_id: null,
  edu_type: null,
  semester_id: null,
  academic_group_id: null,
  edu_form: null,
  command_id: null,
  edu_form_id: null,
  edu_plan: null
});

const allSem: object = reactive({})



const sideFormOptions: any = reactive({
  eduPlanOptions: null,
  semesterOptions: null,
  academicGroupOptions: null,
  orderListOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.orderListOptions = await getOrderList().then(
    (res) => res.result?.data.map((e) => {
      return {
        id: e?.id,
        name: e?.name + ' ' + e?.number
      }
    })
  );
});


async function getDataByPlanId(id: number, isFirst?: boolean) {

  if (!isFirst) {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.academicGroupOptions = null;
  }
  if (id) {
    let res = await academicGroupById(id);
    sideFormOptions.academicGroupOptions = res?.result?.data.map(
      (item: any) => {
        return { id: item.id, name: item.name };
      }
    );
    let sem = await semesterByIdOnlyEduPlan(id).then(res => res?.result?.data);
    allSemesters.value = sem
    sideFormOptions.semesterOptions = allSemesters.value.map((item: any) => {
      return {
        id: item.id,
        name:
          item.course +
          "-" +
          t("Course") +
          " " +
          item.semester +
          "-" +
          t("semester_number"),
      };
    });
    getLeftSubjects()
  }
}

async function getLeftSubjects() {
  if (apiData.semester_id) {
    let semester = allSemesters.value.find((i: any) => i.id == apiData.semester_id).semester
    let val = await getSubjectsByEduPlan(apiData.edu_plan_id, semester).then(res => res?.result)
    // console.log(val, 'comp');
    // comp2(datas?.subjects)
    comp(val)
  }
}

async function fetchList() {

  let datas = await getListStudentById(id).then(e => e.result);
  apiData.edu_plan_id = datas?.edu_plan?.id
  apiData.semester_id = datas?.semester?.id
  apiData.academic_group_id = datas?.academic_group?.id
  getDataByPlanId(apiData.edu_plan_id, true)
  Object.assign(apiData, datas);
  sideFormOptions.eduPlanOptions = await eduPlanById(
    datas?.edu_form?.id
  ).then((res) => res.result?.data);
  // console.log(datas, 'datas');
  // list1.value = datas?.semesters
  list5.value = datas?.semesters
  comp2(datas?.semesters)

}

function checkMove(evt) {
  let element = evt.to;
  let val = element.getElementsByClassName('list-group-item')
  if (val.length) {
    return false
  }
  return true;
}

watch(
  () => apiData.edu_plan_id,
  async () => {
    getDataByPlanId(apiData.edu_plan_id, false)
  }, { deep: true }
);

watch(
  () => apiData.semester_id,
  async () => {
    list1.value = [];
    list2.splice(0);
    list3.splice(0);
    list4.splice(0);
    getLeftSubjects()
    comp2(list5.value)

  }
);

watch(
  () => apiData.academic_group_id,
  async () => {
    list1.value = [];
    list2.splice(0);
    list3.splice(0);
    list4.splice(0);
    getLeftSubjects()
    comp2(list5.value)

  }
);


function comp(arr: any) {
  arr.map(function (e) {
    if (e?.subjects && e?.subjects.length > 0) {
      let obj = [{
        semester: e?.semester + '-semestr'
      }]
      list1.value.push(obj)
      list2.push(obj)
      list4.push(obj)
      e?.subjects.forEach(element => {
        let aa = []
        let bb = [element]
        list2.push(aa)
        list1.value.push(bb)
        list4.push(bb)
      });
    }
  })
  // console.log(list3, 'list3');
}

function comp2(arr: any) {
  arr.map(function (e) {
    if (e?.accreditations && e?.accreditations.length > 0) {
      let obj = [{
        semester: e?.semester + '-semestr'
      }]
      list3.push(obj)
      e?.accreditations.forEach(element => {
        let aa = [element]
        list3.push(aa)
      });
    }
  })
  // console.log(list3, 'list3');
}
async function sendData() {
  let datas = {
    students: [
      +id
    ],
    semester_id: apiData?.semester_id,
    academic_group_id: apiData?.academic_group_id,
    command_id: apiData?.command_id,
    accreditations: [
    ]
  }
  let kk: array = []

  list2.forEach(function (item, index) {
    // if (item.length > 0) {
    // }
    if (!(item[0]?.semester)) {
      let arr1 = {
        curriculum_subject_id: list4[index][0]?.id,
        grade: item[0]?.grade || null,
        ball: item[0]?.ball || null,
      }
      datas.accreditations.push(arr1)
    }

  })
  try {
    isLoading.value = true;
    // await transferRecoverStudy(datas);
    // notif.success(t("Data_stored_successfully"));
    // setTimeout(async () => {
    //     await router.push("/status-student/transfer-recovery");
    //   }, 2000);
  } catch (error: any) {
    // console.log(error, 'error')
    notif.error(t("Dashboard_Error") + ": " + error.response?.data?.message);
  } finally {
    isLoading.value = false;
  }
  console.log(datas, 'datas')

  // transferRecoverStudy
}
</script>

<template>
  <div pagetitle="`O'qishni tiklash`" class="student-recovery-id-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/status-student/transfer-recovery">{{
              $t("education__recovery")
            }}</router-link>
            / {{ $t("student__fish") }}
          </h5>

          <div class="panel-toggles">
            <div class="panel-toggles">
              <router-link to="/status-student/transfer-recovery" class="btns black-c py-1.5 px-4">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header bg-card-header">
            <h4 class="card-title mb-0">{{ $t('Student_information') }}</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("by_Level") }}</th>
                    <th>{{ $t('Transfer_Status') }}</th>
                    <th>{{ $t("Updated_At") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row d-grid w-100">
                    <td>1</td>
                    <td>
                      <div>
                        {{ apiData?.fullname }} <br />
                        <span class="c-gray">
                          {{ id }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ apiData?.edu_type?.name }} <br />
                        <span class="c-gray">
                          {{ apiData?.edu_form?.name }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ apiData?.academic_group?.name }} <br />
                        <span class="c-gray">
                          {{ apiData?.edu_plan?.name }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ apiData?.semester?.course }} - kurs <br />
                        <span class="c-gray">
                          {{ apiData?.semester?.semester }} - semestr</span>
                      </div>
                    </td>
                    <td>
                      {{ apiData?.student_status?.name }}
                    </td>
                    <td>
                      {{ apiData?.updated_at }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header bg-card-header">
        <h4 class="card-title mb-0">{{ $t('Readmission_parametrs') }}</h4>
      </div>
      <div class="card-body">
        <a-form>
          <div class="row">
            <div class="col-xl-6">
              <a-form-item class="mb-3" name="educationType">
                <label for="division-name-select" class="form-label">{{
                  $t("Education_Type")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search :value="apiData.edu_type?.name"
                  :field-names="{ value: 'id', label: 'name' }" :placeholder="t('Choose_Education_Type')" disabled>
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="educationForm">
                <label for="division-name-select" class="form-label">{{
                  $t("Edu_form")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  :value="apiData.edu_form?.name" :field-names="{ value: 'id', label: 'name' }"
                  :placeholder="t('Choose_Education_Form')" disabled>
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Curriculum")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiData.edu_plan_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.eduPlanOptions"
                  :placeholder="$t('Please_select_curriculum')">
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xl-6">
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{ $t('semester') }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.semester_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.edu_plan_id" :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose_Semester')">
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{ $t('Group') }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.academicGroupOptions" :disabled="!apiData.edu_plan_id"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Decree")
                }}</label>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.command_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="sideFormOptions.orderListOptions" :placeholder="t('Select_the_command')">
                </a-select>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
    </div>
    <div v-if="1">
      <!-- drag drop body -->
      <div class="card" v-show="apiData?.semester_id && apiData?.academic_group_id">
        <div class="card-body">
          <div class="row">
            <div class="col list1" style="min-height: 300px">
              <h5>{{ $t("Readmission_Curr_Courses") }}</h5>
              <p>
                {{ $t("Select_the_curriculum_and_semester_to_be_renewed") }}
              </p>
              <div class="table-responsive">
                <div class="drag_table">
                  <div class="column5" style="background: none !important;">
                    <!-- <div>#</div> -->
                    <div>{{ $t("Subjects") }}</div>
                    <div>{{ $t("Type") }}</div>
                    <div>{{ $t("acload") }}</div>
                    <div>{{ $t("Credit") }}</div>
                  </div>
                  <!-- <div v-if="element?.semester" class="semestr_title list-group-item">{{ element?.semester }}</div>
                      <div v-else class="list-group-item">
                        <div class="column name_subject">{{ element?.subject }}</div>
                        <div class="column">{{ element?.subject_type }}</div>
                        <div class="column">{{ element?.load }}</div>
                        <div class="column">{{ element?.credit }}</div>
                        <div class="column">{{ element?.ball }}</div>
                      </div> -->
                  <template v-for="(item, index) in list1" :key="item.id">
                    <div v-if="item[0]?.semester" class="semestr_title column1">{{ item[0]?.semester }}</div>

                    <div v-else class="column5">
                      <!-- <div class="column">{{ index + 1 }}</div> -->
                      <div class="column name_subject">{{ item[0]?.subject?.name }}</div>
                      <div class="column">{{ item[0]?.type }}</div>
                      <div class="column">{{ item[0]?.load }}</div>
                      <div class="column">{{ item[0]?.credit }}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="col list2">
              <h5 style="opacity: 0;">{{ $t('Readmission_Curr_Courses') }}</h5>
              <p style="opacity: 0;">
                Tiklanadigan o'quv rejasi va semestrni tanlang
              </p>
              <div class="table-responsive">
                <div class="drag_table">
                  <div class="top">
                    <div>{{ $t("Subjects") }}</div>
                    <div>{{ $t('Type') }}</div>
                    <div>{{ $t('acload') }}</div>
                    <div>{{ $t("Credit") }}</div>
                    <div>{{ $t("gradeSome") }}</div>
                  </div>
                  <div class="block_list" v-for="(item, ind) in list2" :key="ind">
                    <draggable :move="checkMove" class="list-group" :list="item" willInsertAfter="false" group="people"
                      :sort="false" itemKey="item.name">
                      <template #item="{ element, index }">
                        <div v-if="element?.semester" class="semestr_title list-group-item">{{ element?.semester }}</div>
                        <div v-else class="list-group-item">
                          <div class="column name_subject">{{ element?.subject }}</div>
                          <div class="column">{{ element?.subject_type }}</div>
                          <div class="column">{{ element?.load }}</div>
                          <div class="column">{{ element?.credit }}</div>
                          <div class="column">{{ element?.ball }}</div>
                        </div>
                      </template>
                    </draggable>
                  </div>
                </div>
              </div>
            </div>
            <div class="col list3">
              <h5>{{ $t('Academic_Records') }}</h5>
              <p style="opacity: 0;">
                {{ $t("Select_the_curriculum_and_semester_to_be_renewed") }}
              </p>
              <div class="table-responsive">
                <div class="drag_table">
                  <div class="top">
                    <div>{{ $t("Subjects") }}</div>
                    <div>{{ $t('Type') }}</div>
                    <div>{{ $t('acload') }}</div>
                    <div>{{ $t("Credit") }}</div>
                    <div>{{ $t("gradeSome") }}</div>
                  </div>
                  <!-- <pre>{{ allSem.centerSubject }}</pre> -->
                  <div class="block_list" v-for="(item, ind) in list3" :key="ind">
                    <draggable :move="checkMove" class="list-group" :list="item" willInsertAfter="false" group="people"
                      :sort="false" itemKey="item.name">
                      <template #item="{ element, index }">
                        <div v-if="element?.semester" class="semestr_title list-group-item">{{ element?.semester }}</div>
                        <div v-else class="list-group-item">
                          <div class="column name_subject">{{ element?.subject }}</div>
                          <div class="column">{{ element?.subject_type }}</div>
                          <div class="column">{{ element?.load }}</div>
                          <div class="column">{{ element?.credit }}</div>
                          <div class="column">{{ element?.ball }}</div>
                        </div>
                      </template>
                    </draggable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-end" v-show="apiData?.semester_id && apiData?.academic_group_id">
        <button type="button" class="btns c-save m-3" @click="sendData()" :disabled="!apiData.command_id">{{
          $t('Run_Report') }}</button>
      </div>
    </div>
    <div v-else class="text-center">
      <h2>{{ $t('notif_transfer') }}</h2>
    </div>
  </div>
</template>

<style lang="scss">
.list1 {
  .drag_table {
    &>div {
      &:nth-child(odd) {
        background-color: #f9f9f9;
      }
    }
  }
}

.drag_table {
  .block_list {
    &:nth-child(odd) {
      background-color: #f9f9f9;
    }
  }
}

.column5 {
  display: grid;
  min-height: 55px;
  grid-template-columns: auto 90px 70px 70px;
  border: 1px solid #ccc;
  margin-bottom: 6px;
  padding: 5px 5px;
}

.list2,
.list3 {
  .top {
    display: grid;
    grid-template-columns: auto 90px 70px 70px 70px;
    border: 1px solid #ccc;
    margin-bottom: 6px;
    min-height: 55px;
    padding: 5px 5px;
  }
}

.column1 {
  display: grid;
  min-height: 55px;
  grid-template-columns: 100%;
  border: 1px solid #ccc;
  margin-bottom: 6px;
  padding: 5px 5px;
}

.name_subject {
  overflow: hidden;
  line-height: 1;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  height: 40px;
  padding-right: 15px;
}

.list-group {
  min-height: 55px;
  width: 100%;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-bottom: 6px;
  padding: 5px 5px;
  width: 100%;
  border-radius: 0;

  .list-group-item {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    background: none;
    grid-template-columns: auto 90px 70px 70px 70px;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    border: 0;
    transition: all .15s;
  }
}

.semestr_title {
  text-align: center;
  padding: 5px;
  display: block !important;
  pointer-events: none;
}

.row__column {
  pre {
    width: 100%;
    min-width: 350px;
  }
}



.student-recovery-id-page {
  .table-row {
    grid-template-columns: 50px auto 10% 16% 10% 12% 160px;

    @include mobile() {
      grid-template-columns: 50px auto 100px 200px 120px 120px 160px;
    }

    td,
    th {
      &:last-child {
        justify-content: start;
      }
    }
  }
}

.student-recovery-id-page .content-table {

  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;

    &:nth-last-child(1) {
      justify-content: left;
      display: flex;
    }

    &:nth-child(1) {
      display: flex;
      justify-content: left;
    }
  }
}
</style>
