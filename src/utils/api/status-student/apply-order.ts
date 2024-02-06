import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function studentCommandList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/students`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//yaratish
export async function createCommand(payload: any) {
  try {
    const { data } = await api({
      url: `/api/commands`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//taxrirlash
export async function updateCommand(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/commands/${id}`,
      method: "POST",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//delete
export async function deleteCommand(id: number) {
  try {
    const { data } = await api({
      url: `/api/commands/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCommandById(id: number) {
  try {
    const { data } = await api({
      url: `/api/commands/${id}`,
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
      url: `/api/commands/${id}/status`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//biriktirish
export async function attachCommand(payload: any) {
  try {
    const { data } = await api({
      url: `/api/commands/students`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//biriktirish
export async function getCommandEnrollment(payload: any) {
  try {
    const { data } = await api({
      url: `/api/commands/list/enrollment`,
      method: "GET",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
