import { useApi } from "@/composable/useApi";

const api = useApi();

export async function fetchStudents(payload: any) {
  try {
    const { data } = await api({
      url: "/api/students-contingent/students",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchReferences(table_name: string) {
  try {
    const { data } = await api({
      url: `/api/references/${table_name}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEduPlans(edu_form_id: number) {
  try {
    const { data } = await api({
      url: `/api/students-contingent/edu-plans`,
      params: { edu_form_id },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSemestersByEduPlanID(edu_plan_id: number) {
  try {
    const { data } = await api({
      url: `/api/students-contingent/semesters`,
      params: { edu_plan_id },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function exportStudentsListToExcel(payload: any) {
  try {
    const { data } = await api({
      url: `/api/students-contingent/export-many`,
      params: payload,
      responseType: "blob",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
