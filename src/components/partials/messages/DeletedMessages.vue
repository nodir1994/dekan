<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import {
  deleteMessages,
  fetchDeletedMessages,
  restoreMessages,
} from "@/utils/api/messages";
import helpers from "@/utils/helper";
import { isArray, isEmpty } from "lodash";
import { useI18n } from "vue-i18n";
import type { MessageInterface } from "@/utils/interfaces";
import { Modal } from "bootstrap";
import { useNotyf } from "@/composable/useNotyf";
import { useRouter } from "vue-router";
import { useMessageStore } from "@/stores/message";
import { useUserStore } from "@/stores/user";

const messageStore = useMessageStore();
const userStore = useUserStore();
const authID = userStore.getUser?.id;
const router = useRouter();
const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(true);
const checkedMessages = ref<number[]>([]);
const selectedMessage = ref<MessageInterface | null>(null);
const apiData: {
  current_page: number;
  data: MessageInterface[];
  links: [];
  total: number;
  last_page: number
} = reactive({
  current_page: 1,
  last_page: 1,
  data: [],
  links: [],
  total: 0,
});
const isAllChecked = computed({
  get() {
    return (
      apiData.data?.length > 0 &&
      checkedMessages.value?.length === apiData.data?.length
    );
  },
  set(val) {
    if (val) {
      checkedMessages.value = apiData.data?.map(
        (item: any) => item.id
      ) as number[];
    } else {
      checkedMessages.value = [];
    }
  },
});
const isMessageShowModalOpen = ref(false);
const controller = new AbortController();
const signal = controller.signal;

// hooks
onMounted(async function () {
  await fetchList();
});

onUnmounted(() => {
  controller.abort();
});

watch(isMessageShowModalOpen, function (newVal) {
  const modal = Modal.getOrCreateInstance("#deleted-message-modal");
  newVal ? modal.show() : modal.hide();
});

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      checkedMessages.value = [];
      await fetchList(newVal);
    }
  }
);

watch(
  () => messageStore.searchString,
  async (newVal) => {
    await fetchList();
    messageStore.isLoading = false;
  },
  { deep: true }
);

// functions
async function fetchList(page: number = 1) {
  isLoading.value = true;
  const params = {
    search_string: messageStore.searchString,
    page,
  };

  const res = await fetchDeletedMessages(params, signal);

  Object.assign(apiData, res);
  isLoading.value = false;
}

function onMessageView(message: MessageInterface) {
  isMessageShowModalOpen.value = true;
  selectedMessage.value = message;
}

async function handleDelete(value: number | number[]) {
  const ids: any = !isArray(value) ? [value] : value;
  checkedMessages.value = [];
  const res = await helpers.confirmDeletionAction(deleteMessages, ids);
  await fetchList();
}

async function handleModalDeleteAction() {
  const message = selectedMessage.value;
  handleCloseModal();
  const ids: any = [message?.id] as number[];
  const res = await helpers.confirmDeletionAction(deleteMessages, ids);
  await fetchList();
}

async function handleCloseModal() {
  isMessageShowModalOpen.value = false;
  selectedMessage.value = null;
}

async function handleMessageRestoreAction() {
  try {
    const message = selectedMessage.value;
    handleCloseModal();
    isLoading.value = true;
    if (message) await restoreMessages([message.id as number]);
    await fetchList();
  } catch (error) {
    notif.error(t("Something_went_wrong"));
  } finally {
    isLoading.value = false;
  }
}

async function handleRestoreMany() {
  try {
    isLoading.value = true;
    await restoreMessages(checkedMessages.value);
    await fetchList();
    checkedMessages.value = [];
  } catch (error) {
    notif.error(t("Something_went_wrong"));
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <SpinnerBlock v-if="isLoading" />
    <div v-else-if="apiData.data.length" class="table-responsive">
      <table class="content-table">
        <tbody>
          <tr>
            <td class="justify-content-start">
              <Checker v-model:is-all-checked="isAllChecked" :checked-messages-length="checkedMessages.length">
                <button type="button" class="btn btn-danger delete-btn py-1" @click="handleDelete(checkedMessages)">
                  <i class="mdi mdi-delete"></i>
                  <span class="ms-2">{{ $t("Remove") }}</span>
                </button>
                <button type="button" class="btn btn-primary rounded-1" @click="handleRestoreMany">
                  <i class="mdi mdi-restore"></i>
                  <span class="ms-2">{{ $t("Restore") }}</span>
                </button>
              </Checker>
            </td>
          </tr>
          <tr class="table-row-message" v-for="element in apiData.data">
            <td>
              <div class="form-check text-center">
                <input v-model="checkedMessages" :value="element.id" class="form-check-input" type="checkbox" />
              </div>
            </td>

            <td>
              <template v-if="element.sender?.user_id === authID">
                <AvatarStack v-if="element.receivers?.length" :recipients="element.receivers"
                  @view="onMessageView(element)" />
                <div v-else class="d-flex align-items-center">
                  <div class="avatar-group me-3">
                    <div class="avatar-group-item">
                      <div class="avatar-sm">
                        <span class="avatar-title rounded-circle bg-success text-white">
                          <MdiIcon icon="account-circle-outline" size="2.5rem" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <a href="javascript:;" class="link-primary" @click="onMessageView(element)">
                    {{ $t("Not_specified") }}
                  </a>
                </div>
              </template>
              <div v-else class="d-flex align-items-center">
                <div class="avatar-group me-3">
                  <div class="avatar-group-item">
                    <a v-if="element.sender?.image" href="javascript: void(0);" class="d-inline-block">
                      <img :src="element.sender?.image" alt="" class="rounded-circle avatar-sm" />
                    </a>
                    <div v-else class="avatar-sm">
                      <span class="avatar-title rounded-circle bg-success text-white">
                        {{ element.sender?.full_name[0]?.toUpperCase() }}
                      </span>
                    </div>
                  </div>
                </div>
                <a href="javascript:;" class="link-primary" @click="onMessageView(element)">
                  {{ element.sender?.full_name }}
                </a>
              </div>
            </td>

            <td>
              <a href="javascript:;" class="link-dark" @click="onMessageView(element)">
                <span>
                  {{ element.theme || $t("No_subject") }}
                </span>
                <br />
                <span class="text-truncate">
                  {{ helpers.truncatedMessage(element.message) }}
                </span>
              </a>
            </td>

            <td>{{ element.created_at }}</td>

            <td>
              <button class="btn p-0 border-0 text-danger" type="button" @click="handleDelete(element.id as number)">
                <MdiIcon icon="delete-outline" size="1.5rem" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-------------START PAGINATION-------------->
      <Pagination v-if="apiData?.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
        v-model:current-page="apiData.current_page" :loading="isLoading" />
      <!-------------END PAGINATION-------------->
    </div>
    <NoMessagesBlock v-else />

    <DeletedMessageShowModal :message="selectedMessage" @close-modal="handleCloseModal"
      @restore="handleMessageRestoreAction" @delete="handleModalDeleteAction" />
  </div>
</template>

<style lang="scss" scoped>
button.delete-btn:disabled {
  cursor: not-allowed;
  pointer-events: all;
}
</style>
