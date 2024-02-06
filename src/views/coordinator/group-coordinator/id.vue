<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import beforeSessionInfo from "@/components/partials/coordinator/before.vue";
import inTheSessionInfo from "@/components/partials/coordinator/center.vue";
import afterTheSessionInfo from "@/components/partials/coordinator/after.vue";

import {
  getBeforeSessionList,
  getOnSessionList,
} from "@/utils/api/coordinator/groups";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const { locale, t } = useI18n();
const route: any = useRoute();

const group_name = route?.query?.groupName;
const semester_id = route?.query?.semester_id;
const urlId = route?.params?.id;
const res1 = await getBeforeSessionList(urlId, semester_id).then(
  (res) => res.result
);
const res2 = await getOnSessionList(urlId, semester_id).then(
  (res) => res.result
);

const tabs = ref({
  beforeSession: {
    slug: "beforeSession",
    iconClasses: "mdi mdi-account-arrow-left font-size-18 me-2 align-middle",
    title: t("Until_the_session"),
  },
  inTheSession: {
    slug: "inTheSession",
    iconClasses: "mdi mdi-account font-size-18 me-2 align-middle",
    title: t("During_the_session"),
  },
  afterTheSession: {
    slug: "afterTheSession",
    iconClasses: "mdi mdi-account-arrow-right font-size-18 me-2 align-middle",
    title: t("After_the_session"),
  },
});
const currentTab = ref({
  slug: "beforeSession",
  iconClasses: "mdi mdi-inbox-arrow-down me-2",
  title: t("Incoming_messages"),
});
const CoordinatorGroupSession: any = {
  beforeSession: beforeSessionInfo,
  inTheSession: inTheSessionInfo,
  afterTheSession: afterTheSessionInfo,
};

const currentTabComponent = computed(
  () => CoordinatorGroupSession[currentTab.value.slug]
);
</script>

<template>
  <div class="myMessagePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/coordinator/group-coordinator">
              {{ $t("coordinator_list") }}
            </router-link>
            / {{ group_name }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link
                to="/coordinator/group-coordinator"
                class="btns black-c py-1.5 px-4 d-inline-block"
              >
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}</router-link
              >
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 ms-3 px-4"
              >
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
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
      <div class="tab-content p-3">
        <Component :date1="res1" :date2="res2" :is="currentTabComponent" />
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
