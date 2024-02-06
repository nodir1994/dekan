import { useApi } from "@/composable/useApi";

const api = useApi();

//resurslar statistikasi
export async function byTrainingStatistical(payload: any) {
  try {
    const { data } = await api({
      url: `api/statistic/training`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
