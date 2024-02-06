import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/transfer-study`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//yaratish
export async function semesterTransferPut(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-actions/transfer-semester`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
