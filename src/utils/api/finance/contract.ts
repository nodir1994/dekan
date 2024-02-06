import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function contractAllList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/finance/monitoring-payments`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
export async function exportListForStudent(payload: any) {
  try {
    const { data } = await api({
      url: `/api/finance/monitoring-payments/export`,
      params: payload,
      responseType: "blob",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
