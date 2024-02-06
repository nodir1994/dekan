<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { Modal } from "bootstrap";
import {
  sendConferences,
  fetchConferenceById,
  deleteUserById,
} from "@/utils/api/conference/conference";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

interface SelectedRecipientInterface {
  id: number | any;
  full_name: string | any;
}

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const notif = useNotyf();
const isLoading = ref(false);
const isEmployeesListModalOpen = ref(false);
const isStudentsListModalOpen = ref(false);
const id = route.params.id;

const selectedEmployees = ref<SelectedRecipientInterface[]>([]);
const selectedStudents = ref<SelectedRecipientInterface[]>([]);

const formState = reactive({
  users: [],
  theme: "",
  message: "",
});

const apiData = ref({});

async function fetchList() {
  const res = await fetchConferenceById(id);
  // console.log(res)
  Object.assign(apiData.value, res?.result);
}

const formErrors = reactive({
  users: [],
  theme: [],
  message: [],
});

// hooks
await fetchList(id);

watch(isEmployeesListModalOpen, function (newVal) {
  const modal = Modal.getOrCreateInstance("#employeesListModal");
  newVal ? modal.show() : modal.hide();
});

watch(isStudentsListModalOpen, function (newVal) {
  const modal = Modal.getOrCreateInstance("#studentsListModal");
  newVal ? modal.show() : modal.hide();
});
const disablet = ref(true);
watch(selectedStudents, function (newVal) {
  selectedStudents.value.length
    ? (disablet.value = false)
    : (disablet.value = true);
});
watch(selectedEmployees, function (newVal) {
  selectedEmployees.value.length
    ? (disablet.value = false)
    : (disablet.value = true);
});

// functions
async function onSubmit() {
  try {
    isLoading.value = true;
    clearErrors();
    const res = await sendConferences({
      id,
      user_ids: [
        ...selectedEmployees.value.map((item) => item.id),
        ...selectedStudents.value.map((item) => item.id),
      ],
    });
    notif.success(t("Message_title_sent_to_count_address"));
    await fetchList(id);
  } catch (error: any) {
    Object.assign(formErrors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}

function clearErrors() {
  formErrors.user_ids = [];
  formErrors.theme = [];
  formErrors.message = [];
}
async function deleteUser(userId) {
  try {
    isLoading.value = true;
    clearErrors();
    const res = await deleteUserById(id, userId);
    notif.success(t("Delete_message.Record_deleted_successfull"));
    // await fetchList(id);
    router.push("/conferences");
  } catch (error: any) {
    Object.assign(formErrors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="sendConferencesList">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div
            class="card-header bg-card-header justify-content-between d-flex align-items-center"
          >
            <h5 class="card-title">
              <router-link to="/conferences"
                >{{ $t("all_conference") }}
              </router-link>
              / {{ $t("list_conference_one") }}
            </h5>

            <router-link to="/conferences" class="btns black-c py-1.5 px-4">
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i>
              {{ $t("Back") }}
            </router-link>
          </div>
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-md-8">
                  <div class="mb-3 height-auto conference-select">
                    <a-select
                      :value="[
                        ...selectedEmployees.map((item) => item.full_name),
                        ...selectedStudents.map((item) => item.full_name),
                      ]"
                      mode="multiple"
                      :placeholder="$t('Recipients')"
                    />
                    <span class="text-danger">
                      {{ formErrors.users[0] }}
                    </span>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="mb-3">
                    <button
                      class="btns student-c py-2 px-4 w-100 text-center"
                      type="button"
                      @click="isEmployeesListModalOpen = true"
                    >
                      <i class="mdi mdi-plus me-2"></i>
                      {{ $t("employee") }}
                    </button>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="mb-3">
                    <button
                      type="button"
                      class="btns c-save text-center py-2 px-4 w-100"
                      @click="isStudentsListModalOpen = true"
                    >
                      <i class="mdi mdi-plus me-2"></i>
                      {{ $t("Student") }}
                    </button>
                  </div>
                </div>
              </div>
              <table class="table conf_table">
                <tbody>
                  <tr>
                    <td>
                      <b>{{ $t("Type") }}</b>
                    </td>
                    <td>{{ apiData?.conference_type_id }}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>{{ $t("Name") }}</b>
                    </td>
                    <td>{{ apiData?.name }}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>{{ $t("Begin_Date") }}</b>
                    </td>
                    <td>{{ apiData?.date }}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>{{ $t("Explanation") }}</b>
                    </td>
                    <td>{{ apiData?.description }}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>{{ $t("participants") }}</b>
                    </td>
                    <td>
                      <span
                        class="d-inline-block me-4"
                        v-for="item in apiData?.participants"
                        :key="item.id"
                        >{{ item.fio
                        }}<button
                          type="button"
                          class="btn p-0"
                          @click="deleteUser(item.id)"
                        >
                          <i class="mdi mdi-delete"></i>
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-3 d-flex">
                <SubmitButton
                  :disabled="disablet"
                  class="c-filter py-2 px-4 my-1 ms-auto"
                  :loading="isLoading"
                  :icon="'send'"
                >
                  {{ $t("Run_Report") }}
                </SubmitButton>
              </div>
            </form>

            <!-------START MODAL-xodim--------------------------------------->
            <EmployeesListModal
              v-model:is-open="isEmployeesListModalOpen"
              v-model:selected-employees="selectedEmployees"
            />
            <!-------END MODAL--xodim-------------------------------------->

            <!-------START MODAL-talaba--------------------------------------->
            <StudentsListModal
              v-model:is-open="isStudentsListModalOpen"
              v-model:selected-students="selectedStudents"
            />
            <!-------END MODAL---------------------------------------->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "/src/assets/scss/_screenDimensions.scss";

.conf_table {
  tr {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 25% 75%;
  }
}

.sendConferencesList {
  .table-row-create-message-list {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px 50px 40% 60%;
  }

  table {
    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }

  .modal-dialog {
    max-width: $mobile;
  }

  .ck-editor__editable {
    min-height: 200px;
  }
}

.conference-select {
  .ant-select-selector {
    height: auto !important;
    min-height: 38px;
  }
}

.text-center {
  text-align: center;
  justify-content: center;
}

.conference-select {
  span.ant-select-selection-item-remove {
    display: none !important;
  }
}
</style>
