<script lang="ts" setup>
import { computed, onMounted } from "vue";

const props = defineProps<{
  recipients: any[];
}>();

const emits = defineEmits<{
  (e: "view"): void;
}>();
const computedRecipients = computed(() => {
  const data: any[] = [];
  props.recipients.forEach((recipient) => {
    if (recipient.employee) {
      data.push(recipient.employee);
    } else if (recipient.student) {
      data.push(recipient.student);
    }
  });
  return data.length > 3 ? data.splice(0, 3) : data;
});

// hooks
onMounted(() => {});
// functions
function onMessageView() {
  emits("view");
}
</script>

<template>
  <div class="d-flex align-items-center">
    <div class="avatar-group me-3">
      <div v-for="recipient in computedRecipients" class="avatar-group-item">
        <a
          v-if="recipient.image"
          href="javascript: void(0);"
          class="d-inline-block"
        >
          <img
            :src="recipient.image"
            alt="recipient's image"
            class="rounded-circle avatar-sm"
          />
        </a>
        <div v-else class="avatar-sm">
          <span class="avatar-title rounded-circle bg-success text-white">
            {{ recipient.full_name[0]?.toUpperCase() }}
          </span>
        </div>
      </div>
      <div v-if="recipients.length > 3" class="avatar-group-item">
        <div class="avatar-sm">
          <span class="avatar-title rounded-circle bg-success text-white">
            +{{ recipients.length - 3 }}
          </span>
        </div>
      </div>
    </div>
    <a
      v-if="computedRecipients?.length === 1"
      href="javascript:;"
      class="link-primary"
      @click="onMessageView"
    >
      <span>
        {{ computedRecipients[0].full_name }}
      </span>
    </a>
  </div>
</template>
