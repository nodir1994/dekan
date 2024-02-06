import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function ratingGradeList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/references/rating-grades/curriculum`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/edu/rating-grade/${id}`,
      method: "POST",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
