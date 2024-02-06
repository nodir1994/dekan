import { useApi } from "@/composable/useApi";

const api = useApi();

//hisobotlar talaba faolligi
export async function byStudentList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/active-students`,
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
      url: "/api/report/student-export",
      params: payload,
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
