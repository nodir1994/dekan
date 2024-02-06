import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function getBaseStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/base`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list
export async function getBaseStudentsList(payload: any) {
  try {
    const { data } = await api({
      url: `api/students`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//delete by id
export async function deleteStudentsById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `api/students/${id}`,
      method: "DELETE",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//toggle status student
export async function changePasswordById(id: number) {
  try {
    const { data } = await api({
      url: `api/students/${id}/password`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
export async function exportListForStudent(payload: any) {
  try {
    const { data } = await api({
      url: "/api/students/export/list",
      params: payload,
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list
export async function exportListForStudentList(payload: any) {
  try {
    const { data } = await api({
      url: "/api/students/export/contingent",
      params: payload,
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
