<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";
import { getStipendById, deleteTraining } from "@/utils/api/finance/stipend";
import { useUserStore } from "@/stores/user";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
const route: any = useRoute();
const id: any = route.params.id;
const userStore = useUserStore();
const deanId: any = computed(() => userStore?.user?.faculty?.name);
const selectedId = ref<number | null>(null);
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const apiData: any = reactive({});

//actions delete
await fetchList();

async function onRemove(id: number, full_name: string) {
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
      await deleteTraining(id);
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

async function fetchList() {
  const res = await getStipendById(id);
  Object.assign(apiData, res.result);
}

function openFormModal(id: number | null) {
  selectedId.value = id;
  const modal = Modal.getOrCreateInstance("#financeStipendIdModal");
  modal.show();
}
function onModalClose() {
  selectedId.value = null;
}
</script>
<template>
  <div pagetitle="`Guruhdagi talabalar`" class="studentListPage11">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/finance/stipend"
              >{{ $t("Finance_Scholarship") }}
            </router-link>
            / {{ $t("Stipend_assignment") }}
          </h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              @click="openFormModal(null)"
            >
              <i class="mdi mdi-account-plus font-size-14 align-middle me-1"></i
              >{{ $t("add") }}
            </button>
            <div class="filterBlock">
              <router-link
                to="/finance/stipend"
                class="btns black-c py-1.5 px-4 d-inline-block"
              >
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}
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
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="row">
              <div class="col-lg-4">
                <div class="table-responsive">
                  <table class="table-vertical">
                    <tbody>
                      <tr>
                        <th>{{ $t("Student") }}</th>
                        <td>{{ apiData?.fullname }}</td>
                      </tr>
                      <tr>
                        <th>{{ $t("Structure_Faculty") }}</th>
                        <td>{{ deanId }}</td>
                      </tr>
                      <tr>
                        <th>{{ $t("by_Specialty") }}</th>
                        <td>{{ apiData?.specialty?.name }}</td>
                      </tr>
                      <tr>
                        <th>{{ $t("Decree") }}</th>
                        <td>{{ apiData?.command?.name }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-4">
                <table class="table-vertical">
                  <tbody>
                    <tr>
                      <th>{{ $t("Payment_Form") }}</th>
                      <td>{{ apiData?.payment_type }}</td>
                    </tr>
                    <tr>
                      <th>{{ $t("Education_Year_Name") }}</th>
                      <td>{{ apiData?.semester?.academic_year }}</td>
                    </tr>
                    <tr>
                      <th>{{ $t("Education_Type") }}</th>
                      <td>{{ apiData?.specialty?.edu_type?.name }}</td>
                    </tr>
                    <tr>
                      <th>{{ $t("Finance_Scholarship_Amount") }}</th>
                      <td>{{ apiData?.scholarship_type }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-4">
                <table class="table-vertical">
                  <tbody>
                    <tr>
                      <th>{{ $t("Group") }}</th>
                      <td>{{ apiData?.academic_group?.name }}</td>
                    </tr>
                    <tr>
                      <th>{{ $t("Semester_Name") }}</th>
                      <td>
                        {{ apiData?.semester?.semester }} - {{ $t("semester") }}
                      </td>
                    </tr>
                    <tr>
                      <th>{{ $t("Edu_form") }}</th>
                      <td>{{ apiData?.edu_form }}</td>
                    </tr>
                    <tr>
                      <th>{{ $t("amount_of_minimum_wage") }}</th>
                      <td>{{ apiData?.scholarship_summa }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- <div class="d-flex justify-content-end mt-3">
                            <button class="btns c-save" type="submit">
                                <i class="mdi mdi-check font-size-14 align-middle me-1"></i>Stipendiya qo'shish
                            </button>
                        </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="table-responsive">
              <table class="table-vertical">
                <thead>
                  <tr>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Education_Year_Name") }}</th>
                    <th>{{ $t("month_Name") }}</th>
                    <th>{{ $t("amount_of_minimum_wage") }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in apiData?.monthlies" :key="element?.id">
                    <td>
                      {{ apiData?.semester?.semester }}-{{ $t("semestr") }}
                    </td>
                    <td>{{ apiData?.semester?.academic_year }}</td>
                    <td>{{ element?.date }}</td>
                    <td>{{ element?.summa }}</td>
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a type="text" @click="openFormModal(element?.id)">
                              <i
                                class="mdi mdi-pencil font-size-18 text-primary"
                              ></i>
                            </a>
                          </div>
                        </li>
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a
                              class="text-danger"
                              type="danger"
                              @click="onRemove(element?.id, element?.full_name)"
                              ><i class="mdi mdi-delete font-size-18"></i
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <div class="d-flex justify-content-end mt-3">
                            <router-link to="/employee/employee-competition/monitoring"
                                class="btn py-1.5 px-4 me-3">
                                Bekor qilish
                            </router-link>
                            <button @click="" class="btns c-delete me-1">
                                O'chirish
                            </button>
                        </div> -->
          </div>
        </div>
      </div>
    </div>
    <financeStipendIdModal
      :scholar-id="id"
      :stipent-id="selectedId"
      @update:list="fetchList"
      @close="onModalClose"
    />
    <!-------END TABLE---------------------------------------->
  </div>
</template>
<style lang="scss" scoped>
.table-vertical {
  height: 100%;

  tr {
    th,
    td {
      display: revert;
    }
  }
}

.stipendTable {
  width: 100%;
}
</style>
