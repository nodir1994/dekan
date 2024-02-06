import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function commandList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/commands`,
      method: "GET",
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
    console.log(id);

    return data;
  } catch (error) {
    throw error;
  }
}
//attach commmand list
export async function attachCommandList(id: number) {
  try {
    const { data } = await api({
      url: `/api/commands/students/${id}`,
      method: "GET",
    });

    return data;

    // return {}
  } catch (error) {
    throw error;
  }
}
