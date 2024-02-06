import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getJournalList(payload: object) {
  try {
    const { data } = await api({
      url: `/api/attendance-journal`,
      method: "GET",
      params: payload
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDataById(payload: object) {
  try {
    const { data } = await api({
      url: `/api/academic-groups/attendance`,
      method: "GET",
      params: payload
    });

    return data;
  } catch (error) {
    throw error;
  }
}
