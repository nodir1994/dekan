import { useApi } from "@/composable/useApi";

const api = useApi();

export async function fetchDepartmentById(id: number) {
  try {
    const { data } = await api({
      url: `/api/departments/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDepartment(id: number) {
  try {
    const { data } = await api({
      url: `/api/departments/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/departments/${id}/status`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
