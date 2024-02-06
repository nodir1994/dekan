<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { useNotyf } from "@/composable/useNotyf";
import {
  getBaseStudents,
  deleteStudentsById,
  changePasswordById,
} from "@/utils/api/students/base";
import { formatDate } from "@vueuse/core";
import helpers from "@/utils/helper";
const counter = ref();
const isLoading = ref(false);
const { t } = useI18n();
const notif = useNotyf();
const apiData: {
  current_page: number;
  per_page: number;
  data: any[];
  links: any[];
  page: number;
  search: string;
  last_page: number;
  total: number;
} = reactive({
  current_page: 1,
  data: [],
  links: [],
  per_page: helpers.pagePer,
  search: "",
  page: 1,
  last_page: 1,
  total: 0,
});

onMounted(() => {
  // console.log(JSON.parse(JSON.stringify(apiData.data)))
});

await fetchList();

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

async function fetchList(page?: number) {
  let datas: any = {
    page: page || 1,
    per_page: apiData.per_page,
  };
  if (apiData.search) datas.search = apiData.search;
  isLoading.value = true;
  const res = await getBaseStudents(datas);
  Object.assign(apiData, res.result);
  isLoading.value = false;
}

async function onSearch() {
  await fetchList();
  counter.value = 1;
}
//actions delete
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
      await deleteStudentsById(id);
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

async function changePassword(id: number) {
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
      confirmButtonText: t("Delete_message.yes_drop"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });
    if (res.isConfirmed) {
      await changePasswordById(id);
      swalWithBootstrapButtons.fire(
        t("completed_successfully"),
        t("The_password_has_been_reset"),
        "success"
      );
      await fetchList();

      // notif.success(t("The_password_has_been_reset"));
    }
  } catch (error: any) {
    notif.error("error");
  } finally {
  }
}
</script>

<template>
  <div pagetitle="`Talabalar bazasi`" class="student-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Student_Student") }}</h5>
          <div class="panel-toggles">
            <router-link to="/student/student/create" class="btns c-save py-1.5 px-4 me-3">
              <i class="mdi mdi-school font-size-14 align-middle me-1"></i>{{ $t("Create_Student") }}
            </router-link>
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
          <form class="row" @submit.prevent="onSearch">
            <div class="my-2 col-md-10 form--item">
              <a-space>
                <a-input id="asss" v-model:value="apiData.search" class="form-control" allow-clear />
              </a-space>
              <label for="asss">{{
                $t("Search_by_Name_Student_ID_Passport_PIN")
              }}</label>
            </div>
            <div class="my-2 col-md-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row d-grid w-100">
                    <th>#</th>
                    <th>{{ $t("Status") }}</th>
                    <th>{{ $t("Second_Name") }}</th>
                    <th>{{ $t("Passport_Number") }}</th>
                    <th>{{ $t("Year_Of_Enter") }}</th>
                    <th>{{ $t("Education_Type") }}</th>
                    <th>{{ $t("Payment_Form") }}</th>
                    <th>{{ $t("Updated_At") }}</th>
                    <th>{{ $t("Created_At") }}</th>
                    <th>{{ $t("action") }}</th>
                    <th>{{ $t("Password") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row d-grid w-100" v-for="(element, index) in apiData?.data" :key="element?.id">
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      <a v-if="element?.academic_group_id" class="position-relative s-status">
                        <i class="mdi mdi-check-bold font-size-18 text-success"></i>
                        <span class="student-status">{{
                          element?.academic_group?.name
                        }}</span></a>
                      <a v-else class="position-relative s-status">
                        <i class="mdi mdi-account-group font-size-18 text-danger"></i>
                        <span class="student-status">{{
                          $t("Not_attached_to_a_group")
                        }}</span>
                      </a>
                    </td>
                    <td>
                      <router-link :to="{ path: `/student/student/${element?.id}` }">
                        <!-- :datas="(element.surname, element.name)" wuni korsatasan Oybek -->
                        {{ element?.fullname }}<br />
                        <span class="c-gray"> {{ element?.id_number }}</span>
                      </router-link>
                    </td>
                    <td>
                      <div>
                        {{ element?.passport }} <br />
                        <span class="c-gray"> {{ element?.pinfl }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.date_start }}
                        <br />
                        <span class="c-gray">
                          {{ element?.student_status?.name }}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {{ element?.specialty?.edu_type?.name }} <br />
                        <span class="c-gray">
                          {{ element?.edu_form }}
                        </span>
                      </div>
                    </td>
                    <td>
                      {{ element?.payment_type?.name }}
                    </td>
                    <td>
                      <div v-if="element?.created_at">
                        {{
                          formatDate(
                            new Date(element?.updated_at),
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        }}
                      </div>
                    </td>
                    <td>
                      <div v-if="element?.created_at">
                        {{
                          formatDate(
                            new Date(element?.created_at),
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        }}
                      </div>
                    </td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link :to="{
                              path: `/student/student/${element.id}`,
                            }">
                              <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                            </router-link>
                          </div>
                        </li>
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a class="text-danger" type="danger" @click="onRemove(element.id)"><i
                                class="mdi mdi-delete font-size-18"></i></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <a @click="changePassword(element.id)" class="password"><i
                          class="mdi mdi-account-key font-size-20 align-middle me-2 text-success"></i></a>
                    </td>
                    <!-- ---------END ACTIONS-------------- -->
                  </tr>
                </tbody>
              </table>
              <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page" :loading="isLoading" />
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
    <span class="element-count mb-2" v-if="apiData?.data.length > 0">{{ apiData.current_page }}-{{
      apiData.data.length + apiData?.per_page * (apiData.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData.total }}</span>
  </div>
</template>

<style lang="scss">
.student-page {
  .table-row {
    grid-template-columns: 50px 80px auto 140px 150px 150px 150px 100px 100px 90px 80px;

    @include mobile() {
      grid-template-columns: 50px 80px 200px 140px 150px 120px 120px 100px 100px 90px 80px;
    }

    th,
    td {

      &:nth-last-child(2),
      &:nth-child(2) {
        justify-content: center;
      }
    }
  }

  .password {
    font-size: 18px;
  }

  .fa-circle-check {
    font-size: 20px;
    color: green;
  }
}

.contengent-list .content-table {

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
