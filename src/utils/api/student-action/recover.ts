import { useApi } from "@/composable/useApi";

const api = useApi();

//Talabalar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/recovery`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getListStudentById(id: number) {
  try {
    const { data } = await api({
      url: `api/student-actions/student/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderList() {
  try {
    const { data } = await api({
      url: `api/commands/list/recovery`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function transferRecoverStudy(obj: object) {
  try {
    const { data } = await api({
      url: `api/student-actions/recovery-study`,
      method: "POST",
      data: obj
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSubjectsByEduPlan(edu_plan_id: number, semestr: number) {
  try {
    const { data } = await api({
      url: `api/student-subjects/subjects/semester?edu_plan_id=${edu_plan_id}&semester=${semestr}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

