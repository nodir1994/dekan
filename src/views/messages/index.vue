<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import DeletedMessages from "@/components/partials/messages/DeletedMessages.vue";
import Draft from "@/components/partials/messages/Draft.vue";
import IncomingMessages from "@/components/partials/messages/IncomingMessages.vue";
import SentMessages from "@/components/partials/messages/SentMessages.vue";

const { locale, t } = useI18n();
const tabs = ref({
  incoming: {
    slug: "incoming",
    iconClasses: "mdi mdi-inbox-arrow-down me-2",
    title: t("Incoming_messages"),
  },
  sent: {
    slug: "sent",
    iconClasses: "mdi mdi-inbox-arrow-up me-2",
    title: t("Sent_messages"),
  },
  draft: {
    slug: "draft",
    iconClasses: "mdi mdi-email-open me-2",
    title: t("Draft"),
  },
  deleted: {
    slug: "deleted",
    iconClasses: "mdi mdi-delete-variant me-2",
    title: t("Deleted_messages"),
  },
});
const currentTab = ref({
  slug: "incoming",
  iconClasses: "mdi mdi-inbox-arrow-down me-2",
  title: t("Incoming_messages"),
});

const messageTabs: any = {
  incoming: IncomingMessages,
  sent: SentMessages,
  draft: Draft,
  deleted: DeletedMessages,
};

const currentTabComponent = computed(() => messageTabs[currentTab.value.slug]);
</script>

<template>
  <div class="myMessagePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <PageHeader :title="$t('My_messages')">
      <RouterLink to="/messages/compose" class="btns c-save px-4 me-3">
        <i class="mdi mdi-comment me-2"></i>
        {{ $t("Compose_message") }}
      </RouterLink>
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-3"
        class="btns c-search px-4"
      >
        <i class="mdi mdi-filter me-1"></i>
        <span>{{ $t("Filter") }}</span>
      </button>
    </PageHeader>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <MessageFilterForm />
    <!-----------END FILTERS ------------------------>

    <div class="card">
      <div class="card-message">
        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
          <template v-for="tab in tabs" :key="tab">
            <li class="nav-item" role="presentation">
              <button
                :class="['nav-link', tab.slug === currentTab.slug && 'active']"
                type="button"
                data-bs-toggle="tab"
                :data-bs-target="'#' + tab.slug"
                :aria-controls="tab.slug"
                aria-selected="true"
                role="tab"
                @click="currentTab = tab"
              >
                <i :class="tab.iconClasses"></i>
                <span class="icon-text-none">{{ tab.title }}</span>
              </button>
            </li>
          </template>
        </ul>
      </div>
      <div class="tab-content p-4">
        <Component :is="currentTabComponent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "/src/assets/scss/_screenDimensions.scss";
.myMessagePage {
  .table-row-message {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 250px auto 120px 50px;
    @include mobile() {
      grid-template-columns: 50px 170px 300px 100px 50px;
    }
  }
}
</style>
