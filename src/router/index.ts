import { createRouter, createWebHistory } from "vue-router";
import { isEmpty } from "lodash";
import { useNotyf } from "@/composable/useNotyf";
import routes from "./routes";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/AboutView.vue')
  //   }
  // ]
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const notyf = useNotyf();

  // 1. Check token validity at app startup
  if (isEmpty(userStore.getUser) && userStore.isLoggedIn) {
    try {
      userStore.fetchProfile();
    } catch (err) {
      userStore.logoutUser();
      notyf.error("Your session is invalid");
    }
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 2. If the page requires auth, check if user is logged in
    // if not, redirect to login page.
    return {
      path: "/auth/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
