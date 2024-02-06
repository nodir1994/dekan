<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { MessageInterface } from "@/utils/interfaces";

const props = defineProps<{
  message: MessageInterface;
}>();

const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "delete"): void;
}>();

const sentMessageShowModal = ref<HTMLDivElement>();
const recipientNames = computed<string>(() => {
  return props.message?.receivers
    .map((recipient) => {
      if (recipient.employee) {
        const rolesText = recipient.employee?.user?.roles.length
          ? `(${recipient.employee?.user?.roles
              ?.map((role) => role.name)
              .join(", ")})`
          : "";
        return `${recipient.employee?.full_name} ${rolesText}`;
      }
      if (recipient.student) {
        return `${recipient.student?.full_name} (${
          recipient.student?.academic_group?.name ?? ""
        })`;
      }
      return "";
    })
    .join(", ");
});

// hooks
onMounted(() => {
  sentMessageShowModal.value?.addEventListener("hidden.bs.modal", (event) => {
    emits("closeModal");
  });
});

// functions
function onDeleteAction() {
  emits("delete");
}
</script>

<template>
  <div
    id="sent-message-modal"
    ref="sentMessageShowModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="sentMessageModalLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-lg">
      <div v-if="message" class="modal-content">
        <div class="modal-header">
          <AvatarStack
            v-if="message.receivers.length"
            :recipients="message.receivers"
          />
        </div>
        <div class="modal-body">
          <ul class="list-unstyled mb-0">
            <li class="chat-day-title mb-4">
              <div class="lineDate">
                <span class="title">{{ message.created_at }}</span>
              </div>
            </li>
            <li>
              <div class="messageDate">
                <p>
                  {{ $t("From") }}:
                  <span>
                    <b>{{ $t("You") }}</b>
                  </span>
                </p>
                <p>
                  {{ $t("To") }}:
                  <span class="">
                    <b>{{ recipientNames }}</b>
                  </span>
                </p>
              </div>

              <div v-if="message.file_path" class="mb-3">
                <a :href="message.file_path" download>{{
                  $t("attached_file")
                }}</a>
              </div>

              <div class="ctext-wrap">
                <div class="ctext-wrap-content w-100">
                  <h5>{{ message.theme }}</h5>
                </div>
              </div>

              <div class="ctext-wrap">
                <div class="ctext-wrap-content w-100">
                  <span v-html="message.message"></span>
                </div>
              </div>
              <hr />
            </li>
          </ul>
          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-danger rounded-1"
              @click="onDeleteAction"
            >
              <i class="mdi mdi-delete-sweep"></i>
              <span class="ms-2">{{ $t("Remove") }}</span>
            </button>
            <div class="btn-group gap-2">
              <button
                type="button"
                class="btn btn-warning rounded-1"
                data-bs-dismiss="modal"
              >
                {{ $t("Close") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
