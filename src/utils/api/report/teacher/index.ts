import { useApi } from "@/composable/useApi";

const api = useApi();

//hisobotlar talaba faolligi
export async function byTeacherList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/active-teachers`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// o'qituvchi bandligi
export async function byMapTeacherList(payload: any) {
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
//list
export async function exportFile(payload: any) {
  try {
    const { data } = await api({
      url: "/api/report/teacher-export",
      params: payload,
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
