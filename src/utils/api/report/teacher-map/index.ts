import { useApi } from "@/composable/useApi";

const api = useApi();

// O'qituvchi bandligi
export async function reportAuditoryList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/teachers`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// O'qituvchi bandligi modal
export async function reportByTeacherID(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/teachers/topic`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
