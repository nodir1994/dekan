<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { useNotyf } from "@/composable/useNotyf";
import {
  academicYearsList,
  departmentList,
  educationList,
  specialList,
  academicGroupsList,
} from "@/utils/api/reference";
import {
  getList,
  changeStatus,
  deleteDakById,
} from "@/utils/api/controls/result-dak";
import {
  academicGroupByIdSpeciality,
  semesterByIdOnlyEduPlan,
} from "@/utils/api/reference/id";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const allTables = reactive({});

// jadval talabalar ro'yhati
const apiData: any = reactive({
  academic_year_id: null,
  department_id: null,
  edu_type_id: null,
  specialty_id: null,
  academic_group_id: null,
  current_page: 1,
  data: [],
  links: [],
  per_page: 25,
});

const formOptions = reactive({
  academicYearOptions: null,
  departmentOptions: null,
  eduTypeOptions: null,
  specialOptions: null,
  academicGroupOptions: null,
});

onMounted(async () => {
  formOptions.academicYearOptions = await academicYearsList().then(
    (res) => res.result.data
  );
  formOptions.departmentOptions = await departmentList().then(
    (res) => res.result
  );
  formOptions.eduTypeOptions = await educationList().then((res) => res.result);
  formOptions.specialOptions = await specialList().then((res) =>
    res.result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name + "-" + `(${item.code})`,
      };
    })
  );
  formOptions.academicGroupOptions = await academicGroupsList().then(
    (res) => res.result.data
  );
});

watch(
  () => apiData.academic_year_id,
  async (newVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.department_id,
  async (newVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.edu_type_id,
  async (newVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.specialty_id,
  async (newVal) => {
    formOptions.academicGroupOptions = await academicGroupByIdSpeciality(
      newVal
    ).then((res) => res.result.data);
    await fetchList();
  }
);

watch(
  () => apiData.academic_group_id,
  async (newVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList();
    }
  }
);

await fetchList();

function clean(obj: any) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

async function fetchList() {
  let datas = {
    academic_year_id: apiData.academic_year_id || "",
    department_id: apiData.department_id || "",
    edu_type_id: apiData.edu_type_id || "",
    specialty_id: apiData.specialty_id || "",
    academic_group_id: apiData.academic_group_id || "",
  };
  datas = clean(datas);
  const res = await getList(datas);
  Object.assign(apiData, res.result);
}

async function onSearch() {
  await fetchList();
}

async function updateStatus(id: number) {
  try {
    isLoading.value = true;
    await changeStatus(id);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}

async function onRemove(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-2",
      cancelButton: "btn btn-success",
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
      await deleteDakById(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(t("Dashboard_Error"), error.message, "error");
  }
}
</script>

<template>
  <div pagetitle="`DAK natijalari`" class="dakPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("certificate_Committee_Result") }}</h5>
          <div class="panel-toggles">
            <router-link
              to="/teacher/certificate-committee-result/create"
              class="btns c-save py-1.5 px-4 me-3"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
              >{{ $t("Create") }}
            </router-link>
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
            <!-- //o'quv yili  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.academic_year_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="formOptions.academicYearOptions"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>
            <!-- //fakultet  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <!-- {{$t("Choose_Department")}} -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.department_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="formOptions.departmentOptions"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Department") }}</label>
            </div>
            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.edu_type_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="formOptions.eduTypeOptions"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Type") }}</label>
            </div>
            <!-- //mutaxassislikni tanlang  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.specialty_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="formOptions.specialOptions"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("select__specialty") }}</label>
            </div>
            <!-- //guruh  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.academic_group_id"
                  :field-names="{ value: 'id', label: 'name' }"
                  :options="formOptions.academicGroupOptions"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label>{{ $t("Choose_Group") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div v-if="apiData?.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-dak">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>{{ $t("Group") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("by_Specialty") }}</th>
                    <th>{{ $t("certificate_Committee") }}</th>
                    <th>{{ $t("Order_Number_Date") }}</th>
                    <th>{{ $t("Ball_grade") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("action") }}</th>
                    <th>{{ $t("Enable") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-dak"
                    v-for="(element, index) in apiData?.data"
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
                      {{ element?.fullname }}
                    </td>
                    <td>
                      {{ element?.academic_group }}
                    </td>
                    <td>
                      {{ element?.specialty?.edu_type?.name }}
                    </td>
                    <td>
                      {{ element?.specialty?.name }}
                    </td>
                    <td>{{ element.dak }}</td>
                    <td>
                      {{ element?.order?.number }} <br />
                      {{ element?.order?.date }}
                    </td>
                    <td>{{ element?.mark }}</td>
                    <td>
                      {{ element?.academic_year }}
                    </td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link
                              :to="`/teacher/certificate-committee-result/${element?.id}`"
                              ><i
                                class="mdi mdi-pencil font-size-18 text-primary"
                              ></i
                            ></router-link>
                          </div>
                        </li>
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a
                              class="text-danger"
                              type="danger"
                              @click="onRemove(element.id)"
                              ><i class="mdi mdi-delete font-size-18"></i
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <!-- ---------END ACTIONS-------------- -->
                    <td>
                      <div class="form-check form-switch my-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :checked="element.status"
                          :disabled="isLoading"
                          @change="updateStatus(element.id)"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
              <p class="text-center mb-0">
                {{ $t("No_information_found") }}
              </p>
            </div>
          </div>
        </div>
        <span class="element-count mb-2" v-if="apiData.data.length"
          >{{ apiData.current_page }}-{{
            apiData.data.length + apiData.per_page * (apiData.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.dakPage {
  .table-row-dak {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 100px 110px 190px 100px 160px 100px 110px 80px 60px;
  }

  .content-table {
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
}
</style>
