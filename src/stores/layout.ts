import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", () => {
  const layoutMode = ref("light");
  const layoutScrollable = ref(false);
  const sidebarColor = ref("dark");
  const layoutType = ref("vertical");
  const layoutWidth = ref("fluid");
  const leftSidebarType = ref("default");
  const topbar = ref("light");

  function changeLayoutType(type: string) {
    layoutType.value = type;
  }

  function changeLayoutMode(mode: string) {
    layoutMode.value = mode;
  }

  function changeLayoutPosition(val: boolean) {
    layoutScrollable.value = val;
  }

  function changeLayoutWidth(val: string) {
    layoutWidth.value = val;
  }

  function changeSidebarColor(val: string) {
    sidebarColor.value = val;
  }

  function changeLeftSidebarType(val: string) {
    leftSidebarType.value = val;
  }

  function changeTopbar(val: string) {
    topbar.value = val;
  }

  return {
    layoutMode,
    layoutScrollable,
    sidebarColor,
    layoutType,
    layoutWidth,
    leftSidebarType,
    topbar,
    changeLayoutType,
    changeLayoutMode,
    changeLayoutPosition,
    changeLayoutWidth,
    changeSidebarColor,
    changeLeftSidebarType,
    changeTopbar,
  };
});
