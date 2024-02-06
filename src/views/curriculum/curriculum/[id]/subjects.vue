<template>
  <div pagetitle="`O'quv reja`" class="weeksPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/curriculum">{{ $t("Curriculum") }} / </router-link>{{ apiData.name }}
          </h5>
          <div class="panel-toggles">
            <button @click="downloadFile(curriculumID)" class="btns c-save py-1.5 px-4 me-3" type="button">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{ $t("Download") }}
            </button>
            <router-link to="/curriculum/curriculum"><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Back") }}
              </button></router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE 1---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive mb-4">
          <table class="table-vertical">
            <tr class="table-row w-100 d-grid">
              <td colspan="2" style="text-align: cenetr">
                <b>{{ apiData.name }}</b>
              </td>
            </tr>
            <tr class="table-row w-100 d-grid">
              <td style="text-align: start">
                <b>{{ $t("all_Main") }}</b>
              </td>
              <td style="text-align: end">
                {{ apiData?.total_load }} / {{ apiData?.total_credit }}
              </td>
            </tr>
            <tr class="table-row w-100 d-grid">
              <td style="text-align: start">
                <b>{{ $t("all_Additional") }}</b>
              </td>
              <td style="text-align: end">0 / 0</td>
            </tr>
            <tr class="table-row w-100 d-grid">
              <td style="text-align: start">
                <b>{{ $t("Total_Point") }}</b>
              </td>
              <td style="text-align: end">
                {{ apiData?.total_load }} / {{ apiData?.total_credit }}
              </td>
            </tr>
          </table>
        </div>
        <div v-for="(element, index) in apiData.semesters" :key="index" class="table-responsive table-curriculm mb-5">
          <table>
            <thead>
              <tr style="background-color: #219ebc; color: #fff">
                <th :colspan="
                  9 +
                  tableHeader.lesson_activity.length +
                  tableHeader.additional_type.length
                ">
                  {{ apiData?.name }}
                </th>
                <th :colspan="2 + tableHeader.exam_type.length">
                  {{ element.semester }}-{{ $t("semester_number") }}
                </th>
              </tr>

              <tr style="background-color: #99c1de">
                <th rowspan="2" style="min-width: 80px">
                  {{ $t("sciense_type") }}
                </th>
                <th rowspan="2" style="min-width: 200px; width: 100%">
                  {{ $t("Subject_name") }}
                </th>
                <th rowspan="2" style="min-width: 80px">
                  {{ $t("Subject_code") }}
                </th>
                <th rowspan="2" style="min-width: 200px; width: 100%">
                  {{ $t("Hei_department") }}
                </th>
                <th rowspan="2" style="min-width: 100px">
                  {{ $t("Curriculum_Rating_Grade") }}
                </th>
                <th rowspan="2" style="text-align: start" class="vertical-text">
                  {{ $t("Test") }} / {{ $t("Exam") }}
                </th>
                <th rowspan="2" class="vertical-text" style="text-align: start">
                  {{ $t("Credit") }}
                </th>
                <th rowspan="2" style="text-align: start" class="vertical-text">
                  {{ $t("Hours") }}
                </th>
                <th :colspan="tableHeader.lesson_activity.length + 1">
                  {{ $t("Auditorm_hour") }}
                </th>
                <th :colspan="tableHeader.additional_type.length">
                  {{ $t("Extra_hour") }}
                </th>
                <th :colspan="tableHeader.exam_type.length" style="min-width: 60px">
                  {{ $t("Rating_Grades") }}
                </th>
                <th colspan="2" rowspan="2" style="min-width: 60px"></th>
              </tr>
              <tr style="background-color: #ffbe0b">
                <th rowspan="2" style="text-align: start" class="vertical-text">
                  {{ $t("Total_Point") }}
                </th>
                <th rowspan="2" style="text-align: start" class="vertical-text"
                  v-for="(item, index) in tableHeader.lesson_activity" :key="index">
                  {{ item.name }}
                </th>
                <th rowspan="2" style="text-align: start" class="vertical-text"
                  v-for="(item1, index1) in tableHeader.additional_type" :key="index1">
                  {{ item1.name }}
                </th>
                <th rowspan="2" style="text-align: start" class="vertical-text"
                  v-for="(item2, index2) in tableHeader.exam_type" :key="index2">
                  {{ item2.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(curriculum, item) in element.curriculums" :key="item" :class="
                curriculum?.subject_type_code == 12
                  ? 'bg-light text-primary'
                  : ''
              ">
                <td>
                  {{ curriculum.type }}
                  <!-- <span v-if="curriculum?.subject_type_code == 11"
                    >{{ $t("Mandatory") }}
                  </span>
                  <span v-if="curriculum?.subject_type_code == 12">{{
                    $t("Choice")
                  }}</span> -->
                </td>
                <td class="p-0">
                  <div class="flex-wrap-table">
                    <span v-for="(subjectName, item1) in curriculum.subjects" :key="item1">{{ subjectName?.subjects?.name
                    }}</span>
                  </div>
                </td>
                <td class="p-0">
                  <div class="flex-wrap-table">
                    <span v-for="(subjectName, item1) in curriculum.subjects" :key="item1">{{ subjectName?.subjects?.code
                    }}</span>
                  </div>
                </td>
                <td class="p-0">
                  <div class="flex-wrap-table">
                    <span v-for="(subjectName, item1) in curriculum.subjects" :key="item1">{{
                      subjectName?.departments?.name }}
                    </span>
                  </div>
                </td>
                <td>{{ curriculum?.ratinggrade?.name }}</td>
                <td>{{ curriculum?.final_exam_type?.name[0] }}</td>
                <td>{{ curriculum?.credit }}</td>
                <td>{{ curriculum?.total_load }}</td>
                <td>
                  {{
                    functionAuditorumConutSumm(
                      curriculum.curriculum_audience_hours
                    )
                  }}
                </td>
                <td v-for="(item, index) in tableHeader.lesson_activity" :key="index">
                  <span
                    v-for="(
                                                                                                                element, index1
                                                                                                              ) in curriculum.curriculum_audience_hours"
                    :key="index1">
                    <span v-if="item.id == element?.lesson_activity?.id">{{
                      element.value
                    }}</span>
                  </span>
                </td>
                <td v-for="(item, index) in tableHeader.additional_type" :key="index">
                  <span
                    v-for="(
                                                                                                                element, index1
                                                                                                              ) in curriculum.curriculum_additional_types"
                    :key="index1">
                    <span v-if="item.id == element?.additional_type?.id">{{
                      element.value
                    }}</span>
                  </span>
                </td>
                <td v-for="(item, index) in tableHeader.exam_type" :key="index">
                  <span
                    v-for="(
                                                                                                                element, index1
                                                                                                              ) in curriculum.curriculum_exam_types"
                    :key="index1">
                    <span v-if="item.id == element?.exam_type?.id">{{
                      element.value
                    }}</span>
                  </span>
                </td>
                <td class="gridjs-td" style="min-width: 60px">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div>
                        <a type="text" @click="handleEdit(curriculum.id)">
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div>
                        <a class="text-danger" type="danger" @click="handleDelete(curriculum.id)"><i
                            class="mdi mdi-delete font-size-18 text-danger"></i></a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr style="background-color: #219ebc; color: #fff">
                <th colspan="6" style="text-align: end">
                  {{ $t("In_total_semester") }}
                </th>
                <td>{{ functionAllcreditSumm(element?.curriculums) }}</td>
                <td>{{ functionTotalSumm(element?.curriculums) }}</td>
                <td>{{ functionAllAuditoriumSumm(element?.curriculums) }}</td>
                <td v-for="(item, index) in tableHeader.lesson_activity" :key="index">
                  {{
                    functionLessonActivityAllSumm(
                      element?.curriculums,
                      item?.type
                    )
                  }}
                </td>
                <td v-for="(item1, index1) in tableHeader.additional_type" :key="index1">
                  {{
                    functionAddditionalTypeAllSumm(
                      element?.curriculums,
                      item1?.type
                    )
                  }}
                </td>
                <th :colspan="2 + tableHeader.exam_type.length" class="p-0">
                  <router-link class="btns c-subject-add py-2 px-4" type="text"
                    :to="`/curriculum/curriculum/${curriculumID}/create-subject/${element.id}`">
                    <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>
                    {{ $t("Add_subject") }}
                  </router-link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-------END TABLE 1---------------------------------------->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import {
  subjectEduList,
  tableHeaderList,
  deleteSubjectEdu,
  exportFile,
} from "@/utils/api/edu/subject";
import { useNotyf } from "@/composable/useNotyf";
import { Modal } from "bootstrap";
const props = defineProps({
  //
});
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const notif = useNotyf();
const curriculumID: number = (route.params?.id as number) ?? null;
const selectedId = ref<number | null>(null);

const apiParams: any = reactive({
  curriculum_id: curriculumID,
});

const apiData = reactive({});
const tableHeader = await tableHeaderList().then((res) => res.result);

await fetchList();

async function fetchList() {
  const res = await subjectEduList(apiParams);
  Object.assign(apiData, res.result);
}
//edit subject
async function handleEdit(id: number) {
  router.push(`/curriculum/curriculum/${curriculumID}/subject-update/${id}`);
}

function goBack() {
  router.push("/employees/base");
}
function functionAuditorumConutSumm(any: any) {
  return any.reduce((cur: Number, acc: any) => cur + Number(acc.value), 0);
}
function functionAllcreditSumm(any: any) {
  return any.reduce((cur: Number, acc: any) => cur + Number(acc.credit), 0);
}
function functionTotalSumm(any: any) {
  return any.reduce((cur: Number, acc: any) => cur + Number(acc.total_load), 0);
}
function functionAllAuditoriumSumm(any: any) {
  return any.reduce(
    (cur: Number, acc: any) =>
      cur + functionAuditorumConutSumm(acc.curriculum_audience_hours),
    0
  );
}

// ----Auditoriya soatlari umumiy summasi functionAddditionalTypeAllSumm
function control(curriculum_audience_hours: any, type: string) {
  return curriculum_audience_hours.find(
    (x: any) => x.lesson_activity?.type == type
  )
    ? curriculum_audience_hours.find(
      (x: any) => x.lesson_activity?.type == type
    )?.value
    : 0;
}
function functionLessonActivityAllSumm(any: any, type: string) {
  return any.reduce(
    (cur: Number, acc: any) =>
      cur + control(acc.curriculum_audience_hours, type),
    0
  );
}

// ----Qo'shimcha soatlar umumiy summasi functionAddditionalTypeAllSumm
function controlAT(curriculum_additional_types: any, type: string) {
  return curriculum_additional_types.find(
    (x: any) => x.additional_type?.type == type
  )
    ? curriculum_additional_types.find(
      (x: any) => x.additional_type?.type == type
    )?.value
    : 0;
}
function functionAddditionalTypeAllSumm(any: any, type: string) {
  return any.reduce(
    (cur: Number, acc: any) =>
      cur + controlAT(acc.curriculum_additional_types, type),
    0
  );
}

//open form modal
function openFormModal(id: number) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#weekFormModal");
  modal.show();
}

function onModalClose() {
  selectedId.value = null;
}

//actions delete
async function handleDelete(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger ml-2",
    },
    buttonsStyling: false,
  });

  try {
    const res = await swalWithBootstrapButtons.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      icon: "warning",
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteSubjectEdu(id);

      await fetchList();
      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(
      t("Something_went_wrong"),
      error.message,
      "error"
    );
  }
}

//update status
async function updateStatus(id: number) {
  try {
    isLoading.value = true;
    await changeStatus(id);
    notif.success("Data_stored_successfully");
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}
// download file
async function downloadFile(e_plan: number) {
  try {
    isLoading.value = true;
    const res = await exportFile(e_plan);
    const url = URL.createObjectURL(
      new Blob([res], {
        type: "application/vnd.ms-excel",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Worksheet_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss">
.weeksPage {
  .table-row {
    grid-template-columns: 50% 50%;

    td {
      &:last-child {
        justify-content: end;
      }
    }
  }

  .modal-dialog {
    max-width: $ipad_pro !important;
  }

  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}

.vertical-text {
  min-width: 40px;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  vertical-align: left;
  transform: rotate(180deg);
  letter-spacing: 1.5px;
}
</style>
