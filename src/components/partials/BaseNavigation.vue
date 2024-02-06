<script setup lang="ts">
  import { useRoute } from "vue-router";

  export interface MenuItem {
    icon?: string;
    name: string;
    sub?: MenuItem[];
    subActivePaths?: string;
    to?: string;
  }
  // Main store and Route
  // const store = useMainStore();
  const route = useRoute();
  // console.log(route.fullPath);

  // Component properties
  const props = withDefaults(
    defineProps<{
      nodes: MenuItem[];
      subMenu?: boolean;
      horizontal?: boolean;
      horizontalHover?: boolean;
      disableClick?: boolean;
    }>(),
    {
      subMenu: false,
      horizontal: false,
      horizontalHover: false,
      disableClick: false,
    }
  );

  // Checks if a submenu path is part of the URL path
  function subIsActive(paths: string | string[]) {
    // console.log(paths, 'path')
    const activePaths = Array.isArray(paths) ? paths : [paths];

    return activePaths.some((path) => {
      return route.fullPath.indexOf(path) === 0; // current path starts with this path string
    });
  }

  // Main menu toggling and mobile functionality
  function linkClicked(e: Event, submenu: boolean = false) {
    if (submenu) {
      // Get closest li element
      let el = e.target?.closest("li");

      // Check if we are in a large screen, have horizontal navigation and hover is enabled
      if (
        !(
          window.innerWidth > 991 &&
          ((props.horizontal && props.horizontalHover) || props.disableClick)
        )
      ) {
        if (el.classList.contains("open")) {
          // If submenu is open, close it..
          el.classList.remove("open");
        } else {
          // .. else if submenu is closed, close all other (same level) submenus first before open it
          Array.from(el.closest("ul").children).forEach((element) => {
            element.classList.remove("open");
          });

          el.classList.add("open");
        }
      }
    } else {
      // If we are in mobile, close the sidebar
      // if (window.innerWidth < 992) {
      //   store.sidebar({ mode: "close" });
      // }
    }
  }
</script>

<template>
  <ul :class="['nav flex-column', props.subMenu && 'sub-menu']">
    <li
      v-for="(node, index) in nodes"
      :key="`node-${index}`"
      :class="[
        'nav-item font-size-18',
        // props.subMenu && 'side-nav-link-ref',
        {
          open:
            node.sub && node.subActivePaths
              ? subIsActive(node.subActivePaths)
              : false,
        },
      ]"
    >
      <!-- Normal RouterLink -->
      <!-- <div v-if="!node.sub" @click="linkClicked($event)"> -->
      <RouterLink
        :to="node.to"
        :class="[
          'nav-link',
          props.subMenu && 'ms-3',
          route.fullPath?.startsWith(node.to) && 'router-link-exact-active',
        ]"
        v-if="!node.sub"
        @click="linkClicked($event)"
      >
        <i v-if="node.icon" :class="`${node.icon} me-1`"></i>
        <span v-if="node.name">
          {{ $t(node.name) }}
        </span>
      </RouterLink>
      <!-- </div> -->
      <!-- END Normal RouterLink -->

      <template v-if="node.sub">
        <!-- Submenu RouterLink -->
        <a
          href="#"
          class="nav-link has-arrow"
          @click.prevent="linkClicked($event, true)"
        >
          <i v-if="node.icon" :class="`${node.icon} me-1`"></i>
          <span v-if="node.name" class="menu-item">
            {{ $t(node.name) }}
          </span>
        </a>
        <!-- END Submenu RouterLink -->

        <BaseNavigation
          :nodes="node.sub"
          sub-menu
          :disable-click="props.horizontal && props.horizontalHover"
        />
      </template>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .router-link-exact-active {
    color: #fff !important;
  }

  // Sub menus
  .sub-menu {
    height: 0;
    overflow: hidden;

    .nav-item {
      // opacity: 0;
      transition: opacity 0.25s ease-out, transform 0.25s ease-out;
      transform: translateX(-0.75rem);
    }
  }

  // Active sub menu
  .nav-item.open {
    > .has-arrow {
      color: #fff !important;

      &:after {
        transform: rotate(-180deg);
      }
    }
    > .sub-menu {
      height: auto;

      > .nav-item {
        // opacity: 1;
        transform: translateX(0);
      }
    }
  }
</style>
