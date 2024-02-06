import { useApi } from "@/composable/useApi";

const api = useApi();

//student boyica
export async function statisticalByTeacherList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/teacher/${payload.url}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
