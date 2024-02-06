import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { isEmpty } from "lodash";
import { useStorage } from "@vueuse/core";
import { login, logout } from "@/utils/api/auth";
import { editProfile, getProfile } from "@/utils/api/user";

export type UserData = Record<string, any> | null;

export const useUserStore = defineStore("user", () => {
  const token = useStorage("token", "");
  const user = ref<Partial<UserData>>();

  // const doubleCount = computed(() => count.value * 2);

  // function increment() {
  //   count.value++;
  // }

  const isLoggedIn = computed(
    () => token.value !== undefined && token.value !== ""
  );
  const getUser = computed(() => user.value);
  const getToken = computed(() => token.value);
  const userRoleID = computed(() => user.value?.role_id);

  function setUser(newUser: UserData) {
    user.value = newUser;
  }

  function setToken(newToken: string) {
    token.value = newToken;
  }

  async function loginUser(payload: any) {
    try {
      const res = await login(payload);
      setToken(res.data?.access_token);
    } catch (error) {
      throw error;
    }
  }

  async function logoutUser() {
    try {
      await logout();
      token.value = "";
      user.value = null;
    } catch (error) {
      throw error;
    }
  }

  async function fetchProfile() {
    try {
      const res = await getProfile();
      res.result ? setUser(res.result) : setUser(res);
    } catch (error) {
      throw error;
    }
  }

  async function updateProfile(payload: any) {
    try {
      const res = await editProfile(payload);
      setUser(res.data);
    } catch (error) {
      throw error;
    }
  }

  return {
    // state
    token,
    user,

    // getters
    isLoggedIn,
    getUser,
    getToken,
    userRoleID,

    // actions
    setUser,
    setToken,
    loginUser,
    logoutUser,
    fetchProfile,
    updateProfile,
  };
});
