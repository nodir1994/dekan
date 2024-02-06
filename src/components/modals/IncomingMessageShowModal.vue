<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { MessageInterface } from "@/utils/interfaces";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  message: MessageInterface;
}>();

const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "delete"): void;
  (e: "reply"): void;
}>();

const { t } = useI18n();
const incomingMessageModal = ref<HTMLDivElement>();

// hooks
onMounted(() => {
  incomingMessageModal.value?.addEventListener("hidden.bs.modal", (event) => {
    emits("closeModal");
  });
});

// functions
function onDeleteAction() {
  emits("delete");
}

function onReplyAction() {
  emits("reply");
}
</script>

<template>
  <div
    id="incoming-message-modal"
    ref="incomingMessageModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="incomingMessageModalLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-lg">
      <div v-if="message" class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <div
              v-if="message.sender?.image"
              class="flex-shrink-0 avatar-sm me-3 d-sm-block"
            >
              <img
                :src="message.sender?.image"
                alt="Sender's image"
                class="img-fluid d-block rounded-circle"
              />
            </div>
            <div v-else class="avatar-sm me-2">
              <span class="avatar-title rounded-circle bg-success text-white">
                {{ message.sender?.full_name[0]?.toUpperCase() }}
              </span>
            </div>
          </div>
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
                    <b
                      >{{ message.sender?.full_name }}
                      &nbsp;
                      <span
                        >({{
                          message.sender?.user?.roles
                            ?.map(({ name }) => name)
                            .join(", ")
                        }})</span
                      >
                    </b>
                  </span>
                </p>
                <p>
                  {{ $t("To") }}:
                  <span>
                    <b>{{ $t("to_you") }}</b>
                  </span>
                </p>
              </div>

              <div v-if="message.file_path" class="mb-3">
                <a :href="message.file_path">{{ $t("attached_file") }}</a>
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
              <button
                type="button"
                class="btn btn-primary rounded-1"
                @click="onReplyAction"
              >
                <i class="mdi mdi-reply"></i>
                <span class="ms-2">{{ $t("Reply") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
