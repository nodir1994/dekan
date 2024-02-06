import { useApi } from "@/composable/useApi";

const api = useApi();

//list - ta'lim turi
export async function educationList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/edu-types`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list - ta'lim turi
export async function educationListAll() {
  try {
    const { data } = await api({
      url: `api/references/edu-types`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//kafedra | bo'lim
export async function departmentAndSectionList() {
  try {
    const { data } = await api({
      url: `/api/department`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list - semestr turi
export async function semesterTypeList() {
  try {
    const { data } = await api({
      url: `api/references/semester-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list - fakultetlar turi
export async function facultyList(payload: any) {
  try {
    const { data } = await api({
      url: `api/departments/faculty`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list - o'quv yillari
export async function academicYearsList() {
  try {
    const { data } = await api({
      url: `api/academic-years/list/active?order=year`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - o'quv yillari wtih params
export async function academicYearsListParams(payload: any) {
  try {
    const { data } = await api({
      url: `api/academic-years/list/active?order=year`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - o'quv yillari
export async function academicYearList() {
  try {
    const { data } = await api({
      url: `api/academic-years?order=year`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//o'quv yili / edu plan id ga kora
export async function academicYearListByEduPlan(id: any) {
  try {
    const { data } = await api({
      url: `/api/academic-years?order=year&edu_plan_id=${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//semestr / filter o'quv yiliga ko'ra
export async function semesterListByAcademicYear(apiParams: any) {
  try {
    const { data } = await api({
      url: `/api/semesters/list/active?academic_year_id=${apiParams}`,
      method: "GET",
    });

    return data;
    return {};
  } catch (error) {
    throw error;
  }
}
//semestr / filter o'quv rejaga va o'quv yiliga ko'ra
export async function semesterListByAcademicYearAndEduPlan(apiParams: any) {
  try {
    if (apiParams) {
      const { data } = await api({
        url: `/api/semesters/list/active?edu_plan_id=${apiParams.edu_plan_id}&academic_year_id=${apiParams.academic_year_id}`,
        method: "GET",
      });

      return data;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}
//list - barcha semesterlar
export async function semesterAll() {
  try {
    const { data } = await api({
      url: `api/semesters/distinct`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - mutaxassislik turi dekan yaratgan

export async function specialListAll() {
  try {
    const { data } = await api({
      url: `api/specialties`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - mutaxassislik turi dekan yaratgan

export async function specialList(payload: any) {
  try {
    const { data } = await api({
      url: `api/specialties`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function specialListByEduForm(payload: any) {
  try {
    const { data } = await api({
      url: `api/specialties?specialty_id=${payload}`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - kafedralar
export async function departmentList() {
  try {
    const { data } = await api({
      url: `api/departments/department`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - kafedralar
export async function departmentListAll() {
  try {
    const { data } = await api({
      url: `api/departments/schedule`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - mutaxassislik turi
export async function specialGovTypeList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/specialty-types`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - to'lov shakllari
export async function paymentTypeList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/payment-types`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - Stipendiya turlari
export async function scholarshipTypeList(payload: any) {
  try {
    const { data } = await api({
      url: `api/scholarship-types`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - ta'lim shakllari
export async function eduFormList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/edu-forms`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - ta'lim shakllari
export async function eduFormLists() {
  try {
    const { data } = await api({
      url: `api/references/edu-forms`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - o'quv rejalar
export async function eduPlanList(payload: any) {
  try {
    const { data } = await api({
      url: `api/edu-plans/list/active`,
      params: payload,
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}
//list - o'quv rejalar
export async function eduPlanListAll() {
  try {
    const { data } = await api({
      url: `api/edu-plans/list/active`,
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}
//edu plan / facultet id ga kora
export async function eduPlanListByFaculty(id?: number) {
  try {
    const { data } = await api({
      url: `api/edu-plans/list/active`,
      params: id ? { faculty_id: id } : {},
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list - o'quv rejalar mutaxassislik id si bilan
export async function eduPlanListByIdSpecial(id: Number) {
  try {
    if (id) {
      const { data } = await api({
        url: `api/edu-plans/list/active?specialty_id=${id}`,
        method: "GET",
      });
      return data;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}

//list - akademik guruhlar o'quv reja id si bilan
export async function academicGroupListById(id: Number) {
  try {
    if (id) {
      const { data } = await api({
        url: `api/academic-groups/list/active?edu_plan_id=${id}`,
        method: "GET",
      });
      return data;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}

//list - semestrlar o'quv reja id si bilan
export async function semesterListById(id: Number) {
  try {
    if (id) {
      const { data } = await api({
        url: `api/semesters/list/active`,
        params: id ? { edu_plan_id: id } : {},
      });
      return data;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}
//list - semestrlar listi edu planga ko'ra
export async function semestrListEduPlan(id: number) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plad_id=${id}`,
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}
//list - semestrlar listi edu planga va academic_year  ko'ra
export async function semestrListEduPlanByAcademicYear(
  e_id: number,
  a_id: number
) {
  try {
    const { data } = await api({
      url: `api/semesters/list/active?edu_plad_id=${e_id}&academic_year_id=${a_id}`,
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}

//list - semestrlar listi
export async function semestrList() {
  try {
    const { data } = await api({
      url: `api/semesters/list/active`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - semestrlar listi for hisobot
export async function semestrListForReport() {
  try {
    const { data } = await api({
      url: `api/semesters/distinct`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - kurslar listi
export async function courseList() {
  try {
    const { data } = await api({
      url: `api/selects/courses`,
      method: "GET",
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}

//list - akademik guruhlar listi
export async function academicGroupsListAll() {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - akademik guruhlar listi
export async function academicGroupsList(payload: number) {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active`,
      params: payload ? { academic_year_id: payload } : {},
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}
//list - akademik guruhlar listi mutaxasislik va talim shakliga kora
export async function academicGroupsListBySpeciliatyByEduForm(payload: number) {
  try {
    const { data } = await api({
      url: `api/academic-groups/list/active`,
      params: payload,
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}

//list - yashash (turar-joy) joy
export async function livePlaceList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/live-places`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - yashash (turar-joy) joyi statuslari
export async function livePlaceStatusList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/residence-place-statuses`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - talaba yutug'i toifalari
export async function archiveMentList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/achivement-categories`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - talaba yutug'i turlari hammasi
export async function archiveMentTypeList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/achievement-types`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - talaba yutug'i turlari id bo'yicha
export async function archiveMentTypeByIdList(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `api/references/achivement-types?category_id=${id}`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - birga yashaydiganlar toifasi
export async function liveTogetherList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/category-live-togethers`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - fuqaroliklar
export async function citizenList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/citizenship`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - davlatlar
export async function countryList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/countries`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - regionlar
export async function regionList(id: any) {
  try {
    const { data } = await api({
      url: `api/references/regions?country_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - regionlar
export async function regionListAll() {
  try {
    const { data } = await api({
      url: `api/references/regions`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - tumanlar
export async function districtList(id: number) {
  try {
    const { data } = await api({
      url: `api/references/districts?region_id=${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function currentDistrictList(id: number) {
  try {
    const { data } = await api({
      url: `/api/references/districts?region_id=${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list - millatlar
export async function nationsList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/nations`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - ijtimoiy toifalar
export async function socialCategoryListAll() {
  try {
    const { data } = await api({
      url: `api/references/social-categories`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//list - ijtimoiy toifalar
export async function socialCategoryList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/social-categories`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//diplom toifasi
export async function diplomTypes() {
  try {
    const { data } = await api({
      url: `/api/references/diplom-categories`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//diplom blanki toifasi
export async function diplomCategories() {
  try {
    const { data } = await api({
      url: `/api/references/diplom-blank-status`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//diplom holati
export async function diplomStatuses() {
  try {
    const { data } = await api({
      url: `/api/references/diplom-status-form`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

///DAK end

//list - talaba toifalari
export async function studentCategoryList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/student-categories`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - talaba holati
export async function studentStatusList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/student-statuses`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - qaydnoma turlari
export async function registrationList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/rating-grades`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - yangi imtihon turlari
export async function newExamList(payload: any) {
  try {
    const { data } = await api({
      url: `api/references/final-exam-types`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - Buyruqlar listi
export async function orderList(payload: any) {
  try {
    const { data } = await api({
      url: `api/commands/types`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - Buyruqlar listi
export async function orderListEnrollment(payload: any) {
  try {
    const { data } = await api({
      url: `api/commands/list/enrollment`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//list - barcha talabalar listi
export async function allStudentList(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/student`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//xodimlar ro'yhati
export async function employeeList() {
  try {
    const { data } = await api({
      url: `/api/employees`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//lavozimlar ro'yhati
export async function positionList() {
  try {
    const { data } = await api({
      url: `/api/positions`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//o'qish joylari
export async function trainingPlacesList() {
  try {
    const { data } = await api({
      url: `/api/references/training-places`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//tizim tillari
export async function systemLanguageList() {
  try {
    const { data } = await api({
      url: `/api/languages`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//baxolash tizimi
export async function ratingSystemList() {
  try {
    const { data } = await api({
      url: `/api/references/rating-systems`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//kvalifikatsiyalar
export async function qualificationListBySpeciality(id: number) {
  try {
    const { data } = await api({
      url: `/api/qualifications?specialty_id=${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//Xaftaliklar turi
export async function weekTypeList() {
  try {
    const { data } = await api({
      url: `/api/references/week-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//o'qituvchilar listi
export async function teacherList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/teachers`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//Bitiruv ishi
export async function defencesList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/defence-themes`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//guruhlar / o'quv rejaga kora
export async function academicGroupListByEduPlan(id: number) {
  try {
    const { data } = await api({
      url: `/api/academic-groups/list/active`,
      method: "GET",
      params: id ? { edu_plan_id: id } : {},
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//Dak lar royhati
export async function allDakList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/daks`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//Dak lar turlari
export async function allDakTypeList() {
  try {
    const { data } = await api({
      url: `/api/defence-themes`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// Mashg'ulotlar ro'yxati
export async function academicTrainingList() {
  try {
    const { data } = await api({
      url: `/api/references/lesson-activities`,
      method: "GET",
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
//fanlar listi academic year va academic group
export async function getListSubjectsAcademicAndYear(payload: any) {
  try {
    const { data } = await api({
      url: `api/subjects?academic_year_id=${payload?.academic_year_id}&academic_group_id=${payload?.academic_group_id}`,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// Semesterlar ro'yxati
export async function semesterList() {
  try {
    const { data } = await api({
      url: `/api/search/semestr-list`,
      method: "GET",
    });

    return {};
    return data;
  } catch (error) {
    throw error;
  }
}

//   for DAK

export async function dakMemberList(payload?: any) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/member`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDakMember(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/member/${id}`,
      method: "DELETE",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createDakMember(payload: object) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/member/create`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDakMember(id: number, payload: object) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/member/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function weekList() {
  try {
    const { data } = await api({
      url: `/api/selects/weeks`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function buildingList() {
  try {
    const { data } = await api({
      url: `/api/selects/buildings`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function allStudents() {
  try {
    const { data } = await api({
      url: `/api/students`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function allStudentsDaks(id: Number) {
  try {
    const { data } = await api({
      url: `/api/students?academic_group_id=${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//fan turi
export async function subjectTypesList() {
  try {
    const { data } = await api({
      url: `/api/reference/subject-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//fanlar
export async function subjectList(id: number) {
  try {
    const { data } = await api({
      url: `/api/subjects/subject?subject_type_id=${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//fanlar
export async function ratingGradesList() {
  try {
    const { data } = await api({
      url: `/api/edu/rating-grade`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//yakuniy imtihon turi
export async function finalExamTypesList() {
  try {
    const { data } = await api({
      url: `/api/reference/final-exam-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
///DAK end

// oquv reja create uchun
//fan turi
export async function subjectTypesListForEduForm() {
  try {
    const { data } = await api({
      url: `/api/references/subject-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//baxolash tizimi
export async function ratingSystemListForEduForm() {
  try {
    const { data } = await api({
      url: `/api/references/rating-systems`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function ratingGradesListForEduForm() {
  try {
    const { data } = await api({
      url: `/api/references/rating-grades/curriculum`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//yakuniy imtihon turi
export async function finalExamTypesListForEduForm() {
  try {
    const { data } = await api({
      url: `/api/references/final-exam-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//fanlar
export async function subjectListForEduForm(id: number) {
  try {
    const { data } = await api({
      url: `/api/subjects/list/active`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// konfersiya uchun guruhlar

export async function groupList(id?: number) {
  try {
    const { data } = await api({
      url: `/api/academic-groups/search/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
