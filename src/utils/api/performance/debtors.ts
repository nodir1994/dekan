import { useApi } from "@/composable/useApi";

const api = useApi();

//Jamlanma qaydnoma listi
export async function getListDebtors(
  semester_id: number,
  academic_group_id: number
) {
  try {
    const { data } = await api({
      url: `api/academic-debtors?semester_id=${semester_id}&academic_group_id=${academic_group_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// export
export async function exportFile(payload: any) {
  try {
    const { data } = await api({
      url: "api/academic-debtors/export",
      params: payload,
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
