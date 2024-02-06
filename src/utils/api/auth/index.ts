import { useApi } from "@/composable/useApi";
import { useStorage } from "@vueuse/core";

const api = useApi();
api.defaults.headers.lang = useStorage("locale", "uz").value;
const baseOrgn = import.meta.env.VITE_API_AUTH_URL
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
}else if (
  window.location.href.includes(".educlub")
) {
  urlInfo = baseOrgn + forPortfolio;
} else {
  urlInfo = baseOrgn + baseTest
}

export async function login(payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/auth/login`,
      method: "POST",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/auth/logout`,
      method: "POST",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
