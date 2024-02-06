import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getListData(payload: object) {
  try {
    const { data } = await api({
      url: `/api/academic-groups/subjects-attendance`,
      method: "GET",
      params: payload
    });

    return data;
  } catch (error) {
    throw error;
  }
}
