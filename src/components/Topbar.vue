<script setup lang="ts">
import LocaleSwitcher from "./LocaleSwitcher.vue";
import UserProfileDropdown from "./dropdowns/UserProfileDropdown.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <header id="page-topbar" class="isvertical-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
            <span class="logo-lg">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-lg">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
            <span class="logo-sm">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
          </router-link>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn topnav-hamburger"
          @click="$emit('toggleMenu')"
        >
          <span class="hamburger-icon open">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div class="d-none d-sm-block ms-3 align-self-center">
          <h4 class="page-title">{{ $t("rolName") }}</h4>
        </div>
      </div>

      <div class="d-flex">
        <LocaleSwitcher />

        <!-- --------START FOIDALANUVCHI ROLLARI---------------- -->
        <div class="dropdown d-none d-lg-inline-block" v-if="0">
          <button
            type="button"
            class="btn header-item noti-icon"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <!-- <eva-icon class="icon-sm" name="grid-outline"></eva-icon> -->
            <i class="mdi mdi-view-grid-outline" style="font-size: 25px"></i>
            <!-- <BIcon icon="grid" size="1.2rem" /> -->
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="m-0 font-size-15">{{ $t("User_Roles") }}</h5>
                </div>
              </div>
            </div>
            <div class="px-lg-4 pb-2">
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/oquv-bolim.png"
                      alt="mail_chimp"
                    />
                    <span>{{ $t("rolName") }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ----------END FOIDALANUVCHI ROLLARI---------------- -->

        <UserProfileDropdown />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.language-switch {
  button {
    display: inline-flex;
    align-items: center;
    img {
      width: 24px;
      height: auto;
      margin-right: 6px;
    }
    span {
      text-transform: uppercase;
      font-weight: 600;
      color: #000;
    }
  }
}
</style>
