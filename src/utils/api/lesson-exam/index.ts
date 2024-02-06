import { useApi } from "@/composable/useApi";

const api = useApi();

export async function addExamSchedule(payload: any) {
  try {
    const { data } = await api({
      url: `/api/exam-schedules`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchExamScheduleByID(id: number, s_id: number) {
  try {
    const { data } = await api({
      url: `/api/exam-schedules/${id}/${s_id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchExamType() {
  try {
    const { data } = await api({
      url: `/api/lesson-activate`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLessonExamTopic(payload: any) {
  try {
    const { data } = await api({
      url: `/api/exam-schedules/subject`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateLessonExamTopic(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/exam-schedules/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLessonClasses() {
  try {
    const { data } = await api({
      url: `/api/references/pairs`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLessonPairs(
  academicYearIsCurrentTrue: number | null
) {
  try {
    const { data } = await api({
      url: `/api/references/pairs?academic_year_id=${academicYearIsCurrentTrue}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchWeekSchedules() {
  try {
    const { data } = await api({
      url: `/api/weeks`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAudiences() {
  try {
    const { data } = await api({
      url: `/api/references/audiences`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSubjects() {
  try {
    const { data } = await api({
      url: `/api/student-subjects/subjects`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchSubjectsByEduPlanId(id: number, s_id: number) {
  try {
    const { data } = await api({
      url: `/api/student-subjects/subjects?edu_plan_id=${id}&semester_id=${s_id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEmployees() {
  try {
    const { data } = await api({
      url: `/api/teachers/schedule`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAcademicGroups() {
  try {
    const { data } = await api({
      url: `/api/academic-groups/list/active`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchAcademicGroupsByEduPlanId(id: any) {
  try {
    const { data } = await api({
      url: `/api/academic-groups/list/active?edu_plan_id=${id}`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteExamSchedule(id: number) {
  try {
    const { data } = await api({
      url: `/api/exam-schedules/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function examTypeList() {
  try {
    const { data } = await api({
      url: `/api/exam-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
