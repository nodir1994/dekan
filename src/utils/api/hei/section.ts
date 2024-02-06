import { useApi } from "@/composable/useApi";

const api = useApi();

export async function sectionTypeList() {
  try {
    const { data } = await api({
      url: `/api/departments/sections/types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sectionsList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/sections`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createSection(payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/sections`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateSectionById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/departments/sections/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
