import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function teacherList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/teachers`,
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
      url: "https://api-dekan.eduni.uz/api/teachers/export",
      params: payload,
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
