import axios from "axios";
import { useStorage } from "@vueuse/core";
import { useUserStore } from "@/stores/user";

let api: any = null;

const baseOrgn = import.meta.env.VITE_API_BASE_URL
let baseEduni = '.eduni.uz'
let baseNavEduni = '.naveduni.uz'
let baseTest = '.rasmlar.net';
let forPortfolio = '.educlub.uz';

let urlInfo: any = null;

if (window.location.href.includes(".eduni")) {
  urlInfo = baseOrgn + baseEduni;
} else if (
  window.location.href.includes(".naveduni")
) {
  urlInfo = baseOrgn + baseNavEduni;
} else if (
  window.location.href.includes(".educlub")
) {
  urlInfo = baseOrgn + forPortfolio;
} else {
  urlInfo = baseOrgn + baseTest
}
export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    baseURL: urlInfo,
  });

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config: any) => {
    const userStore = useUserStore();

    if (userStore.isLoggedIn) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userStore.token}`,
        lang: useStorage("locale", "uz").value,
        Accept: "application/json",
      };
    }

    return config;
  });

  // We set an interceptor for each response to
  // check if user is logged in
  api.interceptors.response.use(
    function (response: any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error: any) {
      const userStore = useUserStore();

      if (error) {
        if (error.response?.status === 401 /* && !originalRequest._retry */) {
          // const token = useStorage("token", "");
          // store.commit("user/setToken", "");
          // store.commit("user/setUser", {});
          // localStorage.setItem("token", "");
          // location.href = "/auth/login";
          userStore.setToken("");
          userStore.setUser(null);
          location.href = "/";
        }

        throw error;
      }
    }
  );

  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
