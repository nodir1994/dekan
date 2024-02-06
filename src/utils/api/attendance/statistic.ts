import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getListStudents(payload: object) {
  try {
    const { data } = await api({
      url: `/api/attendances/statistic`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
