<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";

import {
  specialList,
  academicGroupListById,
  semesterListById,
  eduPlanListByIdSpecial,
  specialListAll,
} from "@/utils/api/reference/index";
import {
  semesterOnlyEduPlanById,
  academicGroupById,
} from "@/utils/api/reference/id";
import { getAttachLists, setAttachList } from "@/utils/api/students/attach";
import Swal from "sweetalert2";
import helpers from "@/utils/helper";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const params: any = reactive({});

// jadval bino
const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
  search: "",
  edu_plan_id: null,
  academic_year_id: null,
  edu_type_id: null,
  semester_id: null,
  academic_group_id: null,
  edu_form_id: null,
  page: 1,
  per_page: helpers.pagePer,
  students: [],
  faculty_id: null,
  specialty_id: null,
});
const counter = ref();

const sideFormOptions = reactive({
  specialOptions: null,
  eduPlanOptions: null,
  academicGroupOptions: null,
  semesterOptions: null,
});

const plainOptions = ref<any>([]);

const checkAll = computed({
  get() {
    return apiData.students.length === plainOptions.value.length;
  },
  set(val) {
    if (val) {
      apiData.students = plainOptions.value;
    } else {
      apiData.students = [];
    }
  },
});

await fetchList();

onMounted(async () => {
  const userStore = useUserStore();
  apiData.faculty_id = userStore?.user?.faculty?.name;
  let res = await specialListAll();
  sideFormOptions.specialOptions = res?.result?.data.map((item: any) => {
    return { id: item.id, name: item.code + " - " + item.name };
  });
});

watch(
  () => apiData.specialty_id,
  async () => {
    let res = await eduPlanListByIdSpecial(apiData.specialty_id);
    // await fetchList();
    apiData.edu_plan_id = null;
    sideFormOptions.eduPlanOptions = res?.result?.data;
  }
);

watch(
  () => apiData.edu_plan_id,
  async () => {
    apiData.semester_id = null;
    apiData.academic_group_id = null;
    sideFormOptions.semesterOptions = null;
    sideFormOptions.academicGroupOptions = null;

    if (apiData.edu_plan_id) {
      let res = await semesterOnlyEduPlanById(apiData);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
        return {
          id: item.id,
          name:
            item.semester +
            `-${t("semestr")} / ` +
            item.course +
            `-${t("course_number")}`,
        };
      });

      let res2 = await academicGroupById(apiData.edu_plan_id);
      sideFormOptions.academicGroupOptions = res2?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
    }
  }
);

watch(
  () => apiData.search,
  async (newVal, oldVal) => {
    if (apiData.search == "" && counter.value == 1) {
      await fetchList();
      counter.value = 0;
    }
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);
const errors: any = reactive({
  semester_id: [],
  specialty_id: [],
});

async function onSearch() {
  await fetchList();
  counter.value = 1;
}

async function attachData() {
  try {
    isLoading.value = true;
    clearErrors();
    let params = {
      students: apiData.students,
      semester_id: apiData.semester_id,
      academic_group_id: apiData.academic_group_id,
    };
    Swal.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      cancelButtonText: t("No_Cancel"),
      confirmButtonText: t("transfer"),
    }).then(async (result) => {
      if (result.value) {
        await setAttachList(params);
        notif.success(t("Data_was_successfully_transferred"));
        location.reload();
      }
    });
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    notif.error(t("Failed") + ": " + error.message);
  } finally {
    isLoading.value = false;
    await fetchList();
  }
}
function clearErrors() {
  Object.assign(errors, {
    specialty_id: [],
    semester_id: [],
    academic_group_id: [],
  });
}

async function fetchList(page?: number) {
  isLoading.value = true;
  let datas: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData.specialty_id) datas.specialty_id = apiData.specialty_id;
  // if (apiData.edu_plan_id) datas.edu_plan_id = apiData.edu_plan_id;
  // if (apiData.academic_year_id)
  //   datas.academic_year_id = apiData.academic_year_id;
  // if (apiData.edu_type_id) datas.edu_type_id = apiData.edu_type_id;
  // if (apiData.semester_id) datas.semester_id = apiData.semester_id;
  // if (apiData.academic_group_id)
  //   datas.academic_group_id = apiData.academic_group_id;
  // if (apiData.edu_form_id) datas.edu_form_id = apiData.edu_form_id;
  // if (apiData.faculty_id) datas.faculty_id = apiData.faculty_id;
  if (apiData.search) datas.search = apiData.search;
  try {
    const res = await getAttachLists(datas);
    Object.assign(apiData, res.result);
    plainOptions.value = apiData.data.map((item: any) => item.id);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="`Talabalar kontengenti`" class="attach-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title" style="padding: 7px 0">
            {{ $t("Retraining_Student_Register") }}
          </h5>
          <div class="panel-toggles"></div>
        </div>
      </div>
    </div>

    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <form class="row py-2" @submit.prevent="onSearch">
              <!-- //izlash  -->
              <div class="my-2 col-md-10 form--item">
                <a-space>
                  <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear />
                </a-space>
                <label for="yu">{{
                  $t("Search_by_Name_Student_ID_Passport_PIN")
                }}</label>
              </div>

              <!-- //search button  -->
              <div class="my-2 col-md-2">
                <button type="submit" class="btn-search search-color">
                  <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
                </button>
              </div>
            </form>
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row w-100 d-grid">
                    <th>#</th>
                    <th>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="checkAll" />
                      </div>
                    </th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("Year_Of_Enter") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Payment_Form") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row w-100 d-grid" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="apiData.students" :value="element.id" />
                      </div>
                    </td>
                    <td>
                      {{ element?.surname }} {{ element?.name }}
                      {{ element?.last_name }}
                    </td>
                    <td>
                      {{ element?.specialty?.code }}
                    </td>
                    <td>{{ element?.date_start }}</td>
                    <td>{{ element?.specialty?.edu_type?.name }}</td>
                    <td>
                      {{ element?.payment_type?.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page" />
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
        <span class="element-count mb-2" v-if="apiData.data.length">{{ apiData.current_page }}-{{
          apiData.data.length + apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
      <div class="col-lg-4">
        <form @submit.prevent="attachData" class="card">
          <div class="card-body">
            <div class="mb-3 form-item" name="nameFaculty">
              <label for="division-name-select" class="form-label">{{
                $t("Structure_Faculty")
              }}</label>
              <a-select allow-clear disabled :filter-option="helpers.filterOptionByName" show-search
                :field-names="{ value: 'id', label: 'name' }" v-model:value="apiData.faculty_id" placeholder="Tanlang">
              </a-select>
            </div>
            <div class="mb-3 form-item" name="nameSpecial">
              <label for="division-name-select" class="form-label">{{
                $t("by_Specialty")
              }}</label>
              <a-select allow-clear v-model:value="apiData.specialty_id" :filter-option="helpers.filterOptionByName"
                show-search :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.specialOptions"
                :disabled="!apiData.faculty_id" placeholder="Tanlang">
              </a-select>
            </div>
            <div class="mb-3 form-item" name="plan">
              <label for="division-name-select" class="form-label">{{
                $t("Curriculum")
              }}</label>
              <a-select allow-clear v-model:value="apiData.edu_plan_id" :filter-option="helpers.filterOptionByName"
                show-search :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.eduPlanOptions"
                :disabled="!apiData.specialty_id" placeholder="Tanlang">
              </a-select>
            </div>
            <div class="mb-3 form-item" name="optionsGroup">
              <label for="division-name-select" class="form-label">{{
                $t("Group")
              }}</label>
              <a-select allow-clear v-model:value="apiData.academic_group_id" :disabled="!apiData.edu_plan_id"
                :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.academicGroupOptions" placeholder="Tanlang">
              </a-select>
              <span v-if="errors['academic_group_id']" class="text-danger small">
                {{ errors["academic_group_id"][0] }}
              </span>
            </div>
            <div class="mb-3 form-item" name="semester">
              <label for="division-name-select" class="form-label">{{
                $t("Semester_Name")
              }}</label>
              <a-select allow-clear v-model:value="apiData.semester_id" :disabled="!apiData.academic_group_id"
                :filter-option="helpers.filterOptionByName" show-search :field-names="{ value: 'id', label: 'name' }"
                :options="sideFormOptions.semesterOptions" placeholder="Tanlang">
              </a-select>
              <span v-if="errors['semester_id']" class="text-danger small">
                {{ errors["semester_id"][0] }}
              </span>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btns c-save py-1.5 px-4" type="submit" :disabled="
                !(apiData.students?.length > 0) || !apiData.semester_id
              ">
                <i class="mdi mdi-account-check font-size-14 align-middle me-1"></i>{{ $t("Send_Grades") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.attach-page {
  .table-row {
    grid-template-columns: 50px 40px auto 14% 18% 12% 130px;

    @include mobile() {
      grid-template-columns: 50px 40px 200px 140px 140px 90px 100px;
    }

    td,
    th {
      &:nth-child(2) {
        justify-content: center;
      }

      &:last-child {
        justify-content: start;
      }
    }
  }
}
</style>
