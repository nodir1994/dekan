<script setup lang="ts">
  import { onMounted, watch } from "vue";
  import SimpleBar from "simplebar";
  import menuItems from "@/utils/menu-items";

  const props = defineProps({
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  });
  const emits = defineEmits(["toggleMenu"]);
  const navigation = menuItems.main;

  watch(
    () => props.type,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        switch (newVal) {
          case "default":
            document.body.setAttribute("data-sidebar-size", "lg");
            break;
          case "compact":
            document.body.setAttribute("data-sidebar-size", "md");
            document.body.classList.remove("vertical-collpsed");
            break;
          case "icon":
            document.body.setAttribute("data-sidebar-size", "sm");
            break;
          default:
            document.body.setAttribute("data-sidebar-size", "lg");
            break;
        }
      }
    },
    { immediate: true }
  );

  watch(
    () => props.width,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        switch (newVal) {
          case "boxed":
            document.body.setAttribute("data-layout-size", "boxed");
            break;
          case "fluid":
            document.body.setAttribute("data-layout-size", "fluid");
            break;
          default:
            document.body.setAttribute("data-layout-size", "fluid");
            break;
        }
      }
    },
    { immediate: true }
  );

  watch(
    () => props.color,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        switch (newVal) {
          case "light":
            document.body.setAttribute("data-sidebar", "light");
            break;
          case "dark":
            document.body.setAttribute("data-sidebar", "dark");
            break;
          case "brand":
            document.body.setAttribute("data-sidebar", "brand");
            break;
          default:
            document.body.setAttribute("data-sidebar", "dark");
            break;
        }
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    const sidebar = document.getElementById("simplebar-sidebar");
    if (sidebar) {
      new SimpleBar(sidebar);
    }
  });

  function toggleMenu() {
    emits("toggleMenu");
  }
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <RouterLink to="/" class="logo logo-dark">
        <span class="logo-sm">
          <img src="/src/assets/images/logo-eduni.png" alt="" height="22" />
        </span>
        <span class="logo-lg">
          <img
            src="/src/assets/images/logo-eduni-mini.png"
            alt=""
            height="22"
          />
        </span>
      </RouterLink>

      <RouterLink to="/" class="logo logo-light">
        <span class="logo-lg">
          <img src="/src/assets/images/logo-eduni.png" alt="" height="35" />
        </span>
        <span class="logo-sm">
          <img
            src="/src/assets/images/logo-eduni-mini.png"
            alt=""
            height="30"
          />
        </span>
      </RouterLink>
    </div>

    <button
      type="button"
      class="btn btn-sm px-3 header-item vertical-menu-btn topnav-hamburger"
      @click="toggleMenu"
    >
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <!-- Sidebar Scrolling -->
    <div id="simplebar-sidebar" class="sidebar-menu-scroll">
      <div class="d-flex flex-column align-content-between h-100">
        <div id="sidebar-menu">
          <BaseNavigation :nodes="navigation" />
        </div>
        <!-- END Side Navigation -->
        <div class="p-3 px-4 sidebar-footer">
          <p class="mb-1 main-title">
            {{ new Date().getFullYear() }} &copy; Eduni.
          </p>
        </div>
      </div>
    </div>
    <!-- END Sidebar Scrolling -->
  </div>
  <!-- Left Sidebar End -->
</template>

<style scoped lang="scss">
  .router-link-exact-active {
    color: #fff !important;
  }
</style>
