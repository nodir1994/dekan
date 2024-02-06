<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from "vue";
  import CKE from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import { editorConfig } from "@/utils/editor-config";
  import { Modal } from "bootstrap";
  import {
    updateMessage,
    fetchDraftMessageByID,
    updateDraftMessage,
  } from "@/utils/api/messages";
  import { useNotyf } from "@/composable/useNotyf";
  import { useRoute, useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";

  interface SelectedRecipientInterface {
    id: number;
    full_name: string;
  }

  const route = useRoute();
  const router = useRouter();
  const { t } = useI18n();
  const paramsID = route.params?.id ?? null;
  const notif = useNotyf();
  const CKEditor = CKE.component;
  const isLoading = ref(false);
  const isEmployeesListModalOpen = ref(false);
  const isStudentsListModalOpen = ref(false);

  const selectedEmployees = ref<SelectedRecipientInterface[]>([]);
  const selectedStudents = ref<SelectedRecipientInterface[]>([]);
  const selectedUsers = computed(() => {
    return [
      ...selectedEmployees.value.map((item) => item.full_name),
      ...selectedStudents.value.map((item) => item.full_name),
    ];
  });
  const formState = reactive({
    users: [],
    theme: "",
    message: "",
    file_path: "",
  });
  const formErrors = reactive({
    users: [],
    theme: [],
    message: [],
    file: [],
  });
  const fileUpload = ref<HTMLInputElement>();
  const attachedFile = ref(null);

  // hooks
  onMounted(async () => {
    if (paramsID) {
      const res = await fetchDraftMessageByID(paramsID);
      formState.theme = res.theme;
      formState.message = res.message ?? "";
      formState.file_path = res.file_path ?? "";
      res.receivers.forEach((receiver: any) => {
        if (receiver.employee) {
          selectedEmployees.value.push({
            id: receiver.employee.user_id,
            full_name: receiver.employee.full_name,
          });
        } else if (receiver.student) {
          selectedStudents.value.push({
            id: receiver.student.user_id,
            full_name: receiver.student.full_name,
          });
        }
      });
    }

    if (fileUpload.value)
      fileUpload.value.onchange = (e: Event) => {
        const target = e.target as Record<string, any>;
        const inputGroupFile01 = document.getElementById(
          "inputGroupFile01"
        ) as HTMLInputElement;
        if (inputGroupFile01)
          inputGroupFile01.value = target.value?.replace(/C:\\fakepath\\/i, "");
        attachedFile.value = target.files[0];
      };
  });

  watch(isEmployeesListModalOpen, function (newVal) {
    const modal = Modal.getOrCreateInstance("#employeesListModal");
    newVal ? modal.show() : modal.hide();
  });

  watch(isStudentsListModalOpen, function (newVal) {
    const modal = Modal.getOrCreateInstance("#studentsListModal");
    newVal ? modal.show() : modal.hide();
  });

  // functions
  async function onSubmit() {
    try {
      isLoading.value = true;
      clearErrors();
      const formData = new FormData();
      formData.append("theme", formState.theme);
      formData.append("message", formState.message);
      const users = [
        ...selectedEmployees.value.map((item) => item.id),
        ...selectedStudents.value.map((item) => item.id),
      ];
      users.forEach((item) => {
        formData.append("users[]", item);
      });

      if (attachedFile.value) formData.append("file", attachedFile.value);

      await updateMessage(paramsID, formData);
      notif.success(t("Message_sent"));
      router.back();
    } catch (error: any) {
      Object.assign(formErrors, error.response?.data);
    } finally {
      isLoading.value = false;
    }
  }

  async function onUpdateDraft() {
    try {
      isLoading.value = true;
      clearErrors();
      const formData = new FormData();
      formData.append("theme", formState.theme);
      formData.append("message", formState.message);
      const users = [
        ...selectedEmployees.value.map((item) => item.id),
        ...selectedStudents.value.map((item) => item.id),
      ];
      users.forEach((item) => {
        formData.append("users[]", item);
      });

      if (attachedFile.value) formData.append("file", attachedFile.value);

      await updateDraftMessage(paramsID, formData);
      notif.success(t("Message_saved"));
    } catch (error: any) {
      Object.assign(formErrors, error.response?.data);
    } finally {
      isLoading.value = false;
    }
  }

  function clearErrors() {
    Object.assign(formErrors, {
      users: [],
      theme: [],
      message: [],
      file: [],
    });
  }

  function trigerFIleUpload() {
    const el = document.getElementById("file_upload");
    el?.click();
  }
</script>

<template>
  <div class="createMessageList">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <PageHeader :title="$t('Compose_message')">
      <RouterLink to="/messages/all">
        <button class="btns c-save px-4" type="button">
          <i class="mdi mdi-comment-multiple me-2"></i>
          <span>{{ $t("My_messages") }}</span>
        </button>
      </RouterLink>
    </PageHeader>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div
            class="card-header bg-card-header justify-content-between d-flex align-items-center"
          >
            <h4 class="card-title">
              {{ $t("Create_new_message") }}
            </h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-md-8">
                  <a-textarea
                    :value="selectedUsers"
                    :rows="1"
                    :placeholder="$t('Recipients')"
                  />
                  <span class="text-danger">
                    {{ formErrors.users[0] }}
                  </span>
                </div>
                <div class="col-md-2">
                  <button
                    class="btns student-c py-2 px-4 w-100"
                    type="button"
                    @click="isEmployeesListModalOpen = true"
                  >
                    <i class="mdi mdi-plus me-2"></i>
                    {{ $t("Employee") }}
                  </button>
                </div>
                <div class="col-md-2">
                  <button
                    type="button"
                    class="btns c-save py-2 px-4 w-100"
                    @click="isStudentsListModalOpen = true"
                  >
                    <i class="mdi mdi-plus me-2"></i>
                    {{ $t("Student") }}
                  </button>
                </div>
              </div>
              <div class="row my-3">
                <div class="col col-md-6">
                  <a-input
                    v-model:value="formState.theme"
                    type="text"
                    :placeholder="$t('Subject')"
                  />
                  <span class="text-danger">
                    {{ formErrors.theme[0] }}
                  </span>
                </div>
                <div class="col-auto ms-auto align-self-center">
                  <div v-if="formState.file_path">
                    <a :href="formState.file_path" download>
                      <span class="mdi mdi-paperclip"></span>
                      {{ $t("attached_file") }}
                    </a>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="input-group">
                    <input
                      type="file"
                      id="file_upload"
                      ref="fileUpload"
                      class="d-none"
                    />
                    <label
                      class="input-group-text"
                      for="inputGroupFile01"
                      style="border-radius: 0.75rem 0 0 0.75rem"
                    >
                      {{ $t("attach_file") }}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputGroupFile01"
                      @click="trigerFIleUpload"
                    />
                  </div>
                  <span class="text-danger">
                    {{ formErrors.file[0] }}
                  </span>
                </div>
              </div>
              <CKEditor
                v-model="formState.message"
                :editor="ClassicEditor"
                :config="editorConfig"
              />
              <span class="text-danger">
                {{ formErrors.message[0] }}
              </span>
              <div class="mt-3 d-flex">
                <button
                  class="btns black-c py-2 my-1"
                  type="button"
                  @click="onUpdateDraft"
                  :disabled="isLoading"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <i v-else class="mdi mdi-content-save me-1"></i>
                  <span>{{ $t("Save_to_draft") }}</span>
                </button>
                <SubmitButton
                  class="c-filter py-2 px-4 my-1 ms-auto"
                  :loading="isLoading"
                >
                  {{ $t("Send_message") }}
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
  .createMessageList {
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
</style>
