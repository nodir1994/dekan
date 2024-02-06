<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  fetchById,
  deleteSubjectById,
  showSubjectById,
  changesSubjectById,
} from "@/utils/api/archive/accreditation";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
const route: any = useRoute();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const apiData: any = reactive({});
const modalData: any = reactive({
  id: null,
});

const paramsID = route.params?.id ?? null;

await fetchList();

async function fetchList() {
  const res = await fetchById(paramsID);
  Object.assign(apiData, res.result);
}
const errors = reactive({});

async function deleteSubject(id: any) {
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
      await deleteSubjectById(id);
      await fetchList();
      isLoading.value = true;
      notif.success(t("Delete_message.Record_deleted_successfull"));
    }
  } catch (error: any) {
    notif.error(t("Dashboard_Error"));
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}
async function openFormModal(id: number) {
  const modal = Modal.getOrCreateInstance("#modalAccreditation");
  modalData.id = id;
  let data = await showSubjectById(id).then((res) => res.result);
  Object.assign(modalData, data);
  modal.show();
}

async function changeSubjectById() {
  try {
    const modal = Modal.getOrCreateInstance("#modalAccreditation");
    await changesSubjectById(modalData);
    isLoading.value = true;
    notif.success(t("updated_successfully"));
    modal.hide();
    await fetchList();
  } catch (error: any) {
    console.log(error, "error");
    notif.error(t("Dashboard_Error"));
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div pagetitle="`Akkreditatsiya`" class="createStudentPage adf">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/accreditation">
              {{ $t("accreditation") }}
            </router-link>
            /
            {{ $t("accreditation_student") }}
          </h5>
          <div class="panel-toggles">
            <router-link
              to="/archive/accreditation"
              class="btns black-c py-1.5 px-4 d-inline-block me-2"
            >
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Prev") }}
            </router-link>
            <a class="btns c-save py-1.5 px-4 me-2" href="#">
              <i class="fa fa-download font-size-12"></i>
              {{ $t("Download") }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive mb-5">
          <table class="table__style__custom">
            <tbody>
              <tr>
                <td>{{ $t("Student") }}</td>
                <td>{{ apiData?.data?.student }}</td>
              </tr>
              <tr>
                <td>{{ $t("by_speciality") }}</td>
                <td>{{ apiData?.data?.specialty }}</td>
              </tr>
              <tr>
                <td>{{ $t("Education_Type") }}</td>
                <td>{{ apiData?.data?.edu_type }}</td>
              </tr>
              <tr>
                <td>{{ $t("Edu_form") }}</td>
                <td>{{ apiData?.data?.edu_form }}</td>
              </tr>
              <tr>
                <td>{{ $t("edu_plan") }}</td>
                <td>{{ apiData?.data?.edu_plan }}</td>
              </tr>
              <tr>
                <td>{{ $t("Evaluation_system") }}</td>
                <td>{{ apiData?.data?.rating_system }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-responsive">
          <table class="table table__style__custom">
            <thead>
              <tr class="table-row-accredit-id-index">
                <th>#</th>
                <th>{{ $t("Curriculum_subjects") }}</th>
                <th>{{ $t("mastered__subjects") }}</th>
                <th>{{ $t("Semester_Name") }}</th>
                <th>{{ $t("mastered") }}</th>
                <th>{{ $t("acload/credit") }}</th>
                <th>{{ $t("Score") }}</th>
                <th>{{ $t("gradeSome") }}</th>
                <th>{{ $t("action") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" class="table-row-accredit-id-index">
                  <b>{{ $t("sciene_record") }}</b>
                </td>
                <td>
                  <b
                    >{{ apiData?.data?.sum_load }}/{{
                      apiData?.data?.sum_credit
                    }}</b
                  >
                </td>
                <td>
                  <b>{{ apiData?.data?.avg_ball }}</b>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="(element, index) in apiData?.list" :key="element.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div
                    @click="openFormModal(element.id)"
                    style="cursor: pointer"
                  >
                    {{ element.subject }}
                  </div>
                </td>
                <td>
                  {{ element.subject }}
                </td>
                <td>{{ element.semester }}-{{ $t("semester_number") }}</td>
                <td>
                  <span v-if="element?.is_learning">{{ $t("yes") }}</span>
                  <span v-else>{{ $t("No") }}</span>
                </td>
                <td>{{ element.load }}/{{ element.credit }}</td>
                <td>{{ element.ball }}</td>
                <td>{{ element.grade }}</td>
                <td class="gridjs-td justify-content-center">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <button
                        class="btns1 btn"
                        @click="deleteSubject(element.id)"
                      >
                        <i
                          class="mdi mdi-delete font-size-14 b-actions c-delet"
                        ></i>
                      </button>
                    </li>
                    <li class="list-inline-item">
                      <div class="edit__project text-center">
                        <a type="text" @click="openFormModal(element.id)">
                          <i class="mdi mdi-pencil text-primary"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      id="modalAccreditation"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("Edit_Resource") }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="card-body">
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Total_Acload")
                }}</label>
                <a-input v-model:value="modalData.load" />
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Credit")
                }}</label>
                <a-input v-model:value="modalData.credit" />
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("ball")
                }}</label>
                <a-input v-model:value="modalData.ball" />
              </a-form-item>
              <div class="d-flex justify-content-end">
                <button
                  class="btns c-save"
                  type="button"
                  @click="changeSubjectById"
                >
                  <i class="mdi mdi-check font-size-14 align-middle me-1"></i
                  >{{ $t("Save") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.createStudentPage.adf {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}

.top__system__raiting {
  h5 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      @include mobile {
        font-size: 12px;
      }
    }
  }
}

.table__style__custom {
  width: 100%;

  tbody {
    tr {
      &:nth-child(even) {
        background-color: #f6f9fd;
      }
    }
  }

  thead {
    tr {
      background-color: #f6f9fd;
    }
  }

  tr {
    td {
      padding: 5px 10px;
      vertical-align: middle;
    }
  }
}
</style>
