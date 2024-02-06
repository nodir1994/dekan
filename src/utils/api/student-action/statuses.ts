import { useApi } from "@/composable/useApi";

const api = useApi();

export async function searchListStatuses(obj: any) {
  try {
    const { data } = await api({
      url: `/api/students/status`,
      method: "GET",
      params: obj,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
