import { useApi } from "@/composable/useApi";

const api = useApi();

//Dars jadvalini korish
export async function statisticalByContract(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/contract`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
