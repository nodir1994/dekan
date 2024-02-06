import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function planList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/edu-plans`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list
export async function planArchiveList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/edu-plans/archived`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//yaratish
export async function createPlan(payload: any) {
  try {
    const { data } = await api({
      url: `/api/edu-plans`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//taxrirlash
export async function updatePlanById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/edu-plans/${id}`,
      method: "PUT",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//delete
export async function deletePlan(id: number) {
  try {
    const { data } = await api({
      url: `/api/edu-plans/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//archive
export async function archiveEduPlan(id: number) {
  try {
    const { data } = await api({
      url: `/api/edu-plans/${id}/archive`,
      method: "put",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchPlanById(id: number) {
  try {
    const { data } = await api({
      url: `/api/edu-plans/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/edu-plans/${id}/status`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//baxolash tizimi
export async function ratingSystemList() {
  try {
    const { data } = await api({
      url: `/api/edu/rating_system`,
      method: "GET",
    });

    return {};
    return data;
  } catch (error) {
    throw error;
  }
}
