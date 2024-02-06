import { useApi } from "@/composable/useApi";

const api = useApi();

//studentlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/academic-leave`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//jarayon sababalari listi
export async function getReasonList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/academic-break-reasons`,
      method: "GET",
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
      url: `api/commands/list/academic-leave`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//yaratish
export async function createAcademicLeave(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-actions/academic-leave`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
