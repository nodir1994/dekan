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

//Jarayon sabablari
export async function getReferenceList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/mobility-categories`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//Buyruq list
export async function getOrderList(payload: any) {
  try {
    const { data } = await api({
      url: `api/commands/list/transfer-study`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//guruhga o'tkazish
export async function transferStudent(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-actions/transfer-study`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
