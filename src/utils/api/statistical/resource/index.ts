import { useApi } from "@/composable/useApi";

const api = useApi();

//resurslar statistikasi
export async function recourseStatisticList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/resources`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
