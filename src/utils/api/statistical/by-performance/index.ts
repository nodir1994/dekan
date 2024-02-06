import { useApi } from "@/composable/useApi";

const api = useApi();

//Dars jadvalini korish
export async function statisticalByPerformanceList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/appropriation`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
