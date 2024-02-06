import { useApi } from "@/composable/useApi";

const api = useApi();

export async function cathedrasList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/cathedras`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createCathedra(payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/cathedras`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCathedraById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/cathedras/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function facultiesList() {
  try {
    const { data } = await api({
      url: `/api/departments/cathedras/faculties`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
