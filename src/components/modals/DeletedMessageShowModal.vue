<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { MessageInterface } from "@/utils/interfaces";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  message: MessageInterface;
}>();

const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "delete"): void;
  (e: "restore"): void;
}>();

const { t } = useI18n();
const deletedMessageShowModal = ref<HTMLDivElement>();
const recipientNames = computed<string>(() => {
  return props.message?.receivers?.length
    ? props.message?.receivers
        .map((recipient) => {
          if (recipient.employee) {
            return (
              recipient.employee?.surname +
              " " +
              recipient.employee?.name +
              " " +
              recipient.employee?.patronymic
            );
          }
          if (recipient.student) {
            return (
              recipient.student?.surname +
              " " +
              recipient.student?.name +
              " " +
              recipient.student?.patronymic
            );
          }
          return "";
        })
        .join(", ")
    : t("You");
});

// hooks
onMounted(() => {
  deletedMessageShowModal.value?.addEventListener(
    "hidden.bs.modal",
    (event) => {
      emits("closeModal");
    }
  );
});

// functions
function onDeleteAction() {
  emits("delete");
}

function onRestoreAction() {
  emits("restore");
}
</script>

<template>
  <div
    id="deleted-message-modal"
    ref="deletedMessageShowModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deletedMessageModalLabel"
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
                <h5>{{ message.theme }}</h5>
                <p>
                  {{ $t("From") }}:
                  <span>
                    <b
                      >{{ message.sender?.surname }} {{ message.sender?.name }}
                      {{ message.sender?.patronymic }}</b
                    >
                  </span>
                </p>
                <p>
                  {{ $t("To_recipient") }}:
                  <span class="">
                    <b>{{ recipientNames }}</b>
                  </span>
                </p>
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
                <i class="mdi mdi-close"></i>
                {{ $t("Close") }}
              </button>
              <button
                type="button"
                class="btn btn-primary rounded-1"
                @click="onRestoreAction"
              >
                <i class="mdi mdi-restore"></i>
                <span class="ms-2">{{ $t("Restore") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
