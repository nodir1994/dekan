import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getStudentList(payload: object, statistic: string) {
  try {
    if (statistic) {
      statistic = "/" + statistic;
    } else {
      statistic = "";
    }
    const { data } = await api({
      url: `/api/topics-monitoring${statistic}`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getStatisticsList() {
  try {
    const { data } = await api({
      url: `/api/references/monitoring-lessons`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
