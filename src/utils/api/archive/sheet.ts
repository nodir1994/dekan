import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/archive/study-sheet`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// download
export async function exportDiplomById(id: number) {
  try {
    const { data } = await api({
      url: `api/archive/study-sheet/export-pdf/${id}`,
      responseType: "blob",
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// Wiew
export async function exportAppById(id: number) {
  try {
    const { data } = await api({
      url: `api/archive/study-sheet/export-pdf/${id}`,
      responseType: "blob",
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
