import { useApi } from "@/composable/useApi";

const api = useApi();

export async function facultiesList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/faculties`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function facultyTypesList() {
  try {
    // const { data } = await api({
    //   url: `/api/departments/faculties/types`,
    //   method: "GET",
    // });

    return {};
  } catch (error) {
    throw error;
  }
}

export async function createFaculty(payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/faculties`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchFacultyById(id: number) {
  try {
    const { data } = await api({
      url: `/api/departments/faculties/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateFacultyById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/faculties/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
