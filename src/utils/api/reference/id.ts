import { useApi } from "@/composable/useApi";

const api = useApi();

export async function academicYearsAll() {
  try {
    const { data } = await api({
      url: `api/academic-years?order=year`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - akademik yillar o'quv reja id si bilan

export async function academicYearsById(id: Number) {
  try {
    const { data } = await api({
      url: `api/academic-years?edu_plan_id=${id}&order=year`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - akademik yillar o'quv reja id si bilan
export async function semesterById(obj: Object) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plan_id=${obj.edu_plan_id}&academic_year_id=${obj.academic_year_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - semestralr akademik yil id si bilan
export async function semesterByIdOnlyAcademicYearEduPlan(
  edu_plan_id: number,
  academic_year_id: number
) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plan_id=${edu_plan_id}&academic_year_id=${academic_year_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function semesterByIdOnlyEduPlan(obj: Object) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plan_id=${obj}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function semesterByIdOnlyAcademicYearId(id: number) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?academic_group_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - semester faqat o'quv reja id si bilan
export async function semesterOnlyEduPlanById(obj: Object) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plan_id=${obj.edu_plan_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - semester faqat o'quv reja id si bilan
export async function semesterEduPlanById(obj: Object) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plan_id=${obj}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - akademik yillar o'quv reja id si bilan
export async function academicGroupById(id: Number) {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active?edu_plan_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - akademik yillar mutaxasislik id si bilan
export async function academicGroupByIdSpeciality(id: Number) {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active?specialty_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - o'quv reja ta'lim shakli id si bilan
export async function eduPlanById(id: Number) {
  try {
    const { data } = await api({
      url: `api/edu-plans/list/active?edu_form_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function eduPlanByAcademicYear(id: Number) {
  try {
    const { data } = await api({
      url: `api/edu-plans/list/active?academic_year_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getCoursesListId(obj: Object) {
  try {
    const { data } = await api({
      url: `api/courses?edu_plan_id=${obj.edu_plan_id}&semester=${obj.semester}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//mutaxassiliklar ta'lim turi orqali
export async function getSpecialByEduType(edu_type_id: number) {
  try {
    const { data } = await api({
      url: `api/specialties?edu_type_id=${edu_type_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//akademik guruhlar mutaxassiliklar turi orqali
export async function getAcademicGroupsBySpecialId(specialty_id: number) {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active?specialty_id=${specialty_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//akademik guruhlar semester orqali
export async function getAcademicGroupsBySemesterId(id: number) {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active?semester_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//talaba akademik guruh orqali
export async function getStudentsByAcademicGroupsId(academic_group_id: number) {
  try {
    const { data } = await api({
      url: `api/students/list?academic_group_id=${academic_group_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//talaba oquv yili orqali
export async function getSubjectssByAcademicGroupsId(
  edu_plan_id: number,
  academic_year_id: number
) {
  try {
    const { data } = await api({
      url: `api/student-subjects/subjects?edu_plan_id=${edu_plan_id}&academic_year_id=${academic_year_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//fanlar academic-group-id va semestr-id orqali
export async function getSubjectssBySemestrIdAcademicId(
  academic_group_id: number,
  semester_id: number
) {
  try {
    const { data } = await api({
      url: `api/student-subjects/subjects?academic_group_id=${academic_group_id}&semester_id=${semester_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//talaba semestr orqali
export async function getSubjectsBySemestrId(
  edu_plan_id: number,
  semester_id: number
) {
  try {
    const { data } = await api({
      url: `api/student-subjects/subjects?edu_plan_id=${edu_plan_id}&semester_id=${semester_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
