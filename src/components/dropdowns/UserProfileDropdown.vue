<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const { t } = useI18n();

const router = useRouter();
const userStore = useUserStore();

const computedUser = computed(() => userStore.getUser);
async function logout() {
  await userStore.logoutUser();
  location.replace("/auth/login");
}
</script>

<template>
  <div class="dropdown d-inline-block">
    <button
      type="button"
      class="btn header-item user text-start d-flex align-items-center"
      id="page-header-user-dropdown-v"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <!-- <img
        class="rounded-circle header-profile-user"
        src="/src/assets/images/users/avatar-6.jpg"
        alt="Header Avatar"
      /> -->
      <img
        v-if="computedUser?.image"
        class="rounded-circle header-profile-user"
        :src="computedUser?.image"
      />
      <img
        v-else
        class="rounded-circle header-profile-user"
        src="@/assets/images/users/avatar-default.png"
      />
    </button>
    <div class="dropdown-menu dropdown-menu-end pt-0">
      <div class="p-3 border-bottom">
        <h6 class="mb-0">
          {{ computedUser?.fullname }}
          {{}}
        </h6>
        <p class="mb-0 font-size-11 text-muted">
          {{ computedUser?.email }}
        </p>
      </div>
      <router-link class="dropdown-item" to="/profile"
        ><i
          class="mdi mdi-account-circle text-muted font-size-16 align-middle me-1"
        ></i>
        <span class="align-middle">{{ $t("My_Profile") }}</span></router-link
      >
      <!-- <router-link class="dropdown-item" to="/messages/myMessages"
        ><i
          class="mdi mdi-message-text-outline text-muted font-size-16 align-middle me-1"
        ></i>
        <span class="align-middle">{{$t('sectionName.messages')}}</span></router-link
      > -->
      <button class="dropdown-item" @click="logout">
        <i class="mdi mdi-logout text-muted font-size-16 align-middle me-1"></i>
        <span class="align-middle">{{ $t("Logout") }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.dropdown-menu {
  --bs-dropdown-min-width: 15rem;
}
// .my-profile{
//   width: 100% !important;
// }
</style>
