import { useApi } from "@/composable/useApi";

const api = useApi();

//Jamlanma qaydnoma listi
export async function getListSummary(payload: any) {
  try {
    const { data } = await api({
      url: `api/exam-results/summary-record`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
