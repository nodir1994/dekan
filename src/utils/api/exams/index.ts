import { useApi } from "@/composable/useApi";

const api = useApi();

// Imtihonlar ro'yhati jadval
export async function examsAllList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/exams`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
