import { useApi } from "@/composable/useApi";

const api = useApi();

//Dars jadvalini korish
export async function statisticalAllContract(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/general-contract`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
