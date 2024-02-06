import { useApi } from "@/composable/useApi";

const api = useApi();

//Dars jadvalini korish
export async function reportExamsList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/exams`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
