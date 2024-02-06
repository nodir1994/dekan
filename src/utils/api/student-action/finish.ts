import { useApi } from "@/composable/useApi";

const api = useApi();

//studentlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//buyruqlar listi
export async function getCommandList(payload: any) {
  try {
    const { data } = await api({
      url: `api/commands/list/graduation`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//yaratish
export async function createFinish(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-actions/graduation`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
