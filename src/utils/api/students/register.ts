import { useApi } from "@/composable/useApi";

const api = useApi();

//talabalar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/student-subjects/subjects?edu_plan_id=${payload.edu_plan_id}&semester_id=${payload.semester_id}`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// student filter
export async function studentFilter(payload: any) {
  try {
    const { data } = await api({
      url: `api/student-subjects/filter/students?academic_group_id=${payload.academic_group_id}&semester_id=${payload.semester_id}`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//fanga biriktirilgan talabalar listi
export async function studentWithSubject(payload: any) {
  try {
    const { data } = await api({
      url: `api/student-subjects`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//Guruhga biriktirlgan talabalar
export async function studentWithGroup(payload: any) {
  try {
    const { data } = await api({
      url: `api/students`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//fanga biriktirilgan talabalarni udalit qilish
export async function studentWithSubjectDelete(payload: any) {
  try {
    const { data } = await api({
      url: `api/student-subjects/delete`,
      method: "DELETE",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//fanlar listi
export async function getListSubjects(payload: any) {
  try {
    const { data } = await api({
      url: `api/student-subjects/subjects?edu_plan_id=${payload.edu_plan_id}&semester_id=${payload.semester_id}`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//yaratish
export async function attach(payload: any) {
  try {
    const { data } = await api({
      url: `/api/student-subjects`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
