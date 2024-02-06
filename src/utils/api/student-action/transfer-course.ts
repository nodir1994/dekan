import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/transfer-course`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//yaratish
export async function courseTransferPut(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-actions/transfer-course`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//buyruqlar listi
export async function getListOrders() {
  try {
    const { data } = await api({
      url: `/api/commands/list/transfer-course`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
