import { useApi } from "@/composable/useApi";

const api = useApi();

export async function defenseList(payload?: any) {
  try {
    const { data } = await api({
      url: `/api/archive/bmi-md`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDefense(id: any) {
  try {
    const { data } = await api({
      url: `/api/archive/bmi-md/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function defenseStatusChange(id: number, status?: boolean) {
  try {
    const { data } = await api({
      url: `/api/archive/bmi-md/status/${id}`,
      method: "PUT",
      data: { status: status },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createDefense(payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/bmi-md`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDefense(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/bmi-md/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function defenseById(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/bmi-md/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function orderList() {
  try {
    const { data } = await api({
      url: `/api/commands/types`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
