import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/alienation`,
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
      url: `api/references/student-alienation-reasons`,
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
      url: `api/commands/list/alienation`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//mobile O'tkazish
export async function postMobile(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-actions/alienation`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
