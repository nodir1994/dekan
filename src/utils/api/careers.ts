import { useApi } from "@/composable/useApi";

const api = useApi();

// list
export async function list(payload?: any) {
  try {
    const { data } = await api({
      url: "/api/rewards/filter",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// created
export async function created(params?: any) {
  try {
    const { data } = await api({
      method: "POST",
      url: "/api/rewards/create",
      data: params,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// created
export async function update(id: number, params?: any) {
  try {
    const { data } = await api({
      url: `/api/rewards/${id}/update`,
      method: "POST",
      data: params,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// list career type
export async function listCareerType() {
  try {
    const { data } = await api({
      url: "/api/references/reward-types",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// delete element
export async function deleteElement(id: string) {
  try {
    const { data } = await api({
      url: `/api/rewards/${id}/delete`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getById(id: number) {
  try {
    const { data } = await api({
      url: `/api/rewards/${id}/show`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
