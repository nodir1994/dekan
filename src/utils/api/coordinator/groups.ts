import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getCoordinatorGroupsList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBeforeSessionList(id: number, semester_id: number) {
  try {
    const { data } = await api({
      url: `/api/extramural-students/control/${id}?semester_id=${semester_id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function getOnSessionList(id: number, semester_id: number) {
  try {
    const { data } = await api({
      url: `/api/extramural-students/attendance/${id}?semester_id=${semester_id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
