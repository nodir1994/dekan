import { useApi } from "@/composable/useApi";

const api = useApi();

//o'zlashtirish listi
export async function getListPerformance(payload: any) {
  try {
    const { data } = await api({
      url: `api/exam-results`,
      params: payload,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//buyruqlar listi
export async function getListSubjectsById(
  edu_plan_id: number,
  semester_id: number
) {
  try {
    const { data } = await api({
      url: `/api/student-subjects/subjects?edu_plan_id=${edu_plan_id}&semester_id=${semester_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//o'zlashtirish listi id boyicha
export async function getListPerformanceById(id: number) {
  try {
    const { data } = await api({
      url: `api/exam-results/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
