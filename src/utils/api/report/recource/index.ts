import { useApi } from "@/composable/useApi";

const api = useApi();

//hisobotlar talaba faolligi
export async function byResourceList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/resources`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
