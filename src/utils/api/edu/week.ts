import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function weekList(params: any) {
  try {
    const { data } = await api({
      url: `/api/weeks`,
      method: "GET",
      params: params,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//taxrirlash
export async function updateWeek(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/weeks/${id}`,
      method: "PUT",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchWeekById(id: number) {
  try {
    const { data } = await api({
      url: `/api/weeks/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/weeks/${id}/status`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
