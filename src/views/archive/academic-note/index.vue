<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import {
  academicYearsList,
  specialList,
  specialListAll,
} from "@/utils/api/reference";
import { getListStudents, transfer } from "@/utils/api/archive/academic-note";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/user";

import {
  getAcademicGroupsBySpecialId,
  semesterByIdOnlyAcademicYearId,
} from "@/utils/api/reference/id";
import helpers from "@/utils/helper";
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
const plainOptions: any = ref([]);

const apiData: any = reactive({
  search: "",
  specialty_id: null,
  academic_group_id: null,
  academic_year_id: null,
  semester_id: null,
  data: [],
  links: [],
  students: [],
  current_page: 1,
  per_page: helpers.pagePer,
});

const checkAll = computed({
  get() {
    return apiData?.students?.length === plainOptions?.value?.length;
  },
  set(val) {
    if (val) {
      apiData.students = plainOptions.value;
    } else {
      apiData.students = [];
    }
  },
});

const sideFormOptions = reactive({
  academicGroupOptions: null,
  academicYearOptions: null,
  specialOptions: null,
  paymentTypeOptions: null,
  semesterOptions: null,
});

const loader = ref(true);

await fetchList();

onMounted(async () => {
  sideFormOptions.academicYearOptions = await academicYearsList().then(
    (res) => res.result?.data
  );
  sideFormOptions.specialOptions = await specialListAll().then((res) =>
    res.result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    })
  );
});

async function onSearch() {
  await fetchList();
}

watch(
  () => apiData.academic_year_id,
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.academic_group_id,
  async () => {
    apiData.semester_id = null;
    sideFormOptions.semesterOptions = null;
    if (apiData.academic_group_id) {
      let res = await semesterByIdOnlyAcademicYearId(apiData.academic_group_id);
      sideFormOptions.semesterOptions = res?.result?.data.map((item: any) => {
        return {
          id: item.id,
          semester: item.semester,
          name:
            item.course +
            "-" +
            t("course") +
            " " +
            item.semester +
            "-" +
            t("semester"),
        };
      });
    }
    await fetchList();
  }
);

watch(
  () => apiData.specialty_id,
  async () => {
    apiData.academic_group_id = null;
    sideFormOptions.academicGroupOptions = null;

    await fetchList();
    if (apiData.specialty_id) {
      let res = await getAcademicGroupsBySpecialId(apiData.specialty_id);
      sideFormOptions.academicGroupOptions = res?.result?.data.map(
        (item: any) => {
          return { id: item.id, name: item.name };
        }
      );
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

async function fetchList(pages?: number) {
  let datas: any = {
    page: pages || 1,
    per_page: apiData.per_page
  };
  if (apiData.search.length > 0) datas.search = apiData?.search;
  if (apiData.semester_id) datas.semester_id = apiData?.semester_id;
  if (apiData.academic_year_id)
    datas.academic_year_id = apiData?.academic_year_id;
  if (apiData.specialty_id) datas.specialty_id = apiData?.specialty_id;
  if (apiData.academic_group_id)
    datas.academic_group_id = apiData?.academic_group_id;
  try {
    isLoading.value = true;
    if (loader.value) {
      loader.value = false;
      const res = await getListStudents(datas);
      Object.assign(apiData, res.result);
      plainOptions.value = apiData.data.map((item: any) => item.id);
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

async function transferStudents() {
  try {
    let list = apiData.students;
    const res = await transfer({ list });
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(t("Failed") + ": " + error.message);
  }
}

// async function changeStatus(id: number) {
//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-danger me-2",
//       cancelButton: "btn btn-success",
//     },
//     buttonsStyling: false,
//   });

//   try {
//     const res = await swalWithBootstrapButtons.fire({
//       title: t("Delete_message.Are_you_sure"),
//       text: t("change_statuses"),
//       icon: "warning",
//       confirmButtonText: t("Continue"),
//       cancelButtonText: t("No_cancel"),
//       showCancelButton: true,
//     });

//     if (res.isConfirmed) {
//       await getItem(id);
//       modalData.is_approved = !modalData.is_approved;
//       await updateItem(id);
//     }
//   } catch (error: any) {
//     swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
//   }
// }
</script>

<template>
  <div pagetitle="`Akademik yozuv`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("academic_record") }}</h5>
          <div class="panel-toggles">
            <router-link to="/archive/academic-note/view" class="btns student-c py-1.5 px-4 me-3">
              <i class="fas fa-eye me-1"></i>{{ $t("Preview") }}
            </router-link>
            <button @click="transferStudents" :disabled="!apiData?.students.length" class="btns c-save py-1.5 px-4 me-3">
              <i class="mdi mdi-check font-size-14 align-middle me-1"></i>{{ $t("transfer") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
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
            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- //o'quv yili  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.academicYearOptions"
                  allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //mutaxassislikni tanlang  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search v-model:value="apiData.specialty_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.specialOptions" allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>
            <!-- //guruh  -->
            <div class="my-2 col-xl-3 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.academic_group_id" :field-names="{ value: 'id', label: 'name' }"
                  :disabled="!apiData.specialty_id" :options="sideFormOptions.academicGroupOptions"
                  :placeholder="t('Choose_Group')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>
            <!-- //Semestrni tanlang  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select :filter-option="helpers.filterOptionByName" show-search allow-clear
                  v-model:value="apiData.semester_id" :disabled="!apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.semesterOptions"
                  :placeholder="t('Choose')">
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Semester") }}</label>
            </div>
            <!-- //izlash  -->
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiData.search" class="form-control" allow-clear />
              </a-space>
              <label for="yu">{{ $t("choose__fish__passport__code") }}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-xl-3">
              <button @click="onSearch" class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
            </div>
          </div>
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
                  <tr class="table-row-note-ind">
                    <th>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="checkAll" />
                      </div>
                    </th>
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("Subjects") }}</th>
                    <th>{{ $t("gradeSome") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-note-ind" v-for="(element, index) in apiData.data" :key="element.id">
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="apiData.students" :value="element?.id" />
                      </div>
                    </td>
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
                      {{ element?.academic_year }}
                    </td>
                    <td>{{ element?.semester }}-{{ $t("semestr") }}</td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                    <td>{{ element?.subject }}</td>
                    <td>{{ element?.rating }}</td>
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
        <span class="element-count mb-2" v-if="apiData.total">{{ apiData.current_page }}-{{
          apiData?.data.length +
          apiData.per_page * (apiData.current_page - 1)
        }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.table-row-note-ind {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px 50px auto 140px 150px 180px 170px 120px;

  @media (max-width: 767px) {
    // grid-template-columns: 50px 200px 200px 140px 150px 180px 70px;
  }
}
</style>
