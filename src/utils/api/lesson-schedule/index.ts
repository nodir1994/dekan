import { useApi } from "@/composable/useApi";

const api = useApi();

export async function addLessonSchedule(payload: any) {
  try {
    const { data } = await api({
      url: `/api/lesson-schedule`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLessonScheduleByID(id: number) {
  try {
    const { data } = await api({
      url: `/api/lesson-schedule/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLessonScheduleTopic(payload: any) {
  try {
    const { data } = await api({
      url: `/api/lesson-schedule/topic`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateLessonScheduleTopic(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/lesson-schedule/${id}`,
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
      url: `/api/references/lesson-activities`,
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
      url: `/api/edu/week`,
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
      url: `/api/subjects/subject`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchSubjectsByEduPlanId(id: number) {
  try {
    const { data } = await api({
      url: `/api/subjects/list/active?edu_plan_id=${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchSubjectsByEduPlanIdBySemesterId(
  edu_plan_id: number,
  semester_id: number
) {
  try {
    const { data } = await api({
      url: `/api/student-subjects/subjects?edu_plan_id=${edu_plan_id}&semester_id=${semester_id}`,
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
      url: `/api/edu/academic_group`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchAcademicGroupsByEduPlanId(edu_plan_id: any) {
  try {
    const { data } = await api({
      url: `/api/academic-groups/list/active?edu_plan_id=${edu_plan_id}`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteLessonSchedule(id: number) {
  try {
    const { data } = await api({
      url: `/api/lesson-schedule/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
