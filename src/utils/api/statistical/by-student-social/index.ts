import { useApi } from "@/composable/useApi";

const api = useApi();

//student boyica
export async function byStudentSocialList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/category`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
