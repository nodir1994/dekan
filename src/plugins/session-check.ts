import { definePlugin } from "@/main";
import { useUserStore } from "@/stores/user";
import { useNotyf } from "@/composable/useNotyf";

/**
 * Here we are setting up two router navigation guards
 * (note that we can have multiple guards in multiple plugins)
 *
 * We can add meta to pages either by declaring them manualy in the
 * routes declaration (see @/router.ts)
 * or by adding a <route> tag into .vue files (see @/pages/sidebar/dashboards.ts)
 *
 * <route lang="yaml">
 * meta:
 *   requiresAuth: true
 * </route>
 *
 * <script setup lang="ts">
 *  // TS script
 * </script>
 *
 * <template>
 *  // HTML content
 * </template>
 */
export default definePlugin(async ({ router, api, pinia }) => {
  const userStore = useUserStore(pinia);
  const notyf = useNotyf();

  // 1. Check token validity at app startup
  if (userStore.isLoggedIn) {
    try {
      // Do api request call to retreive user profile.
      // Note that the api is provided with json-server
      userStore.fetchProfile();
      // const { data: user } = await api.get('/api/users/me')
      // userStore.setUser(user)
    } catch (err) {
      // delete stored token if it fails
      userStore.logoutUser();
      notyf.error("Your session is invalid");
    }
  }

  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
      // 2. If the page requires auth, check if user is logged in
      // if not, redirect to login page.
      return {
        name: "/",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }
  });
});
