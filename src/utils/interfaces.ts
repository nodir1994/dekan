export interface EmployeeInterface {
  user_id: number;
  id: number;
  citizenship_id: string;
  code: string | number;
  contract_date: string;
  passport_date: string;
  pinfl: string;
  passport_number: string;
  surname: string;
  name: string;
  patronymic: string;
  image: string;
  birthdate: string;
  gender: string;
  address_home: string;
  speciality: string;
  email: string;
  phone: string;
  work_count: string;
  status: boolean;
  country_id: string;
  region_id: string;
  district_id: string;
  nation_id: string;
  academic_degree_id: string;
  academic_title_id: string;
  recruitment_date: string;
  role: string;
  created_at: string;
  updated_at: string;
  language: string;
  type: string;
  departments: any[];
}

export interface EmployeeRoleInterface {
  id: string | number;
  name: string;
  code: string;
}

export interface HeiInterface {
  id: string | number;
  code: string | number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  akk: string;
  phone: string;
  title: string;
  region: string;
  city: string;
  stir: string;
  contact: string;
  rector: string;
  email: string;
  bank: string;
  district: string;
  university_type: string;
  university_form: string;
  bank_information: string;
  accriditaion: string;
}

export interface FacultyInterface {
  code: string | number;
  department_type_id: string;
  id: string | number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  status: boolean;
  type: string;
}

export interface CathedraInterface {
  code: string | number;
  department_type_id: string | number;
  faculty_id: string | number;
  faculty: FacultyInterface;
  id: string | number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  status: boolean;
  type: string;
}

export interface SectionInterface {
  code: string | number;
  department_type_id: string | number;
  id: string | number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  status: boolean;
  type: string;
}
export interface StatisticalRecourseFace {
  edu_plan: string;
  subject: string;
  semester: number | string;
  count: number | string;
  faculty: string;
}
export interface StatisticalStudentAll {}
export interface StudentAllCourseStatistical {
  course: number;
  nation: string;
  natoin: string;
  region: string;
  specialty: string;
  code: string;
  list: {
    payment_type_id: number;
    payment_type: string;
    male: number;
    female: number;
    count: number;
  }[];
}
export interface StatisticalByTrainingFace {
  subject: string;
  list: {
    type: string;
    hour: number;
    done_hour: number;
    relic_hour: number;
  }[];
}
export interface statisticalByPerformanceFace {
  faculty: string;
  student_count: number | string;
  count_rating: number | string;
  count_rating_5: number | string;
  percent_5: string | number;
  count_rating_4: number | string;
  percent_4: string | number;
  count_rating_3: number | string;
  percent_3: string | number;
  count_rating_2: number | string;
  percent_2: string | number;
  edu_type: string;
  academic_year: string;
}
export interface BystudentGeneral {
  faculty: string;
  edu_forms: {
    edu_form: string;
  }[];
  courses: {
    course: number;
    count: number;
  }[];
  list: {
    name: string;
    student_count: string | number;
  }[];
}
export interface ByStudentSocialFace {
  name: string;
  surname: string;
  last_name: string;
  faculty: string;
  edu_type: string;
  edu_form: string;
  semester: number | string;
}
export interface StatisticalByTeacherFace {
  faculty: string;
  departments: {
    name: string;
    degrees: {
      academic_degree: string;
      male_count: number | string;
      female_count: number | string;
      all_count: number | string;
    }[];
  }[];
}
export interface ReportByStudentFace {
  id: number;
  full_name: string;
  faculty: string;
  specialty: string;
  edu_type: string;
  ip: string;
  message: string;
  date: string;
  academic_group: string;
  payment_type: string;
  specialty_code: string | number;
  edu_form: string;
  pair_end: string;
  count_topic: string | number;
}
export interface ReportByTeacherFace {
  id: number;
  full_name: string;
  faculty: null;
  department: string;
  ip: string;
  message: string;
  date: string;
}
export interface RecourceByStudentFace {
  faculty: string;
  department: string;
  subject: string;
  edu_plan: string;
  edu_type: string;
  edu_form: string;
  subject_type: string;
  semester: number;
  topic_count: number;
  resource_count: number;
  task_count: number;
}
export interface departmentRatingScienceFace {
  id: number;
  department: string | number;
  department_ball: string;
}
export interface ReportExamsFace {
  id: number;
  employee: string;
  subject: string;
  name: string;
  academic_group: string;
  academic_year: string;
  duration: number | string;
  datetime_start: string;
  datetime_end: string | number;
}
export interface byRoomsReportFace {
  name: string;
  type: string;
  capacity: number;
  topics: {
    date: string;
    pair_id: number | string;
    audience_id: number | string;
    pair: string;
    count: number | string;
  }[];
}

export interface MessageInterface {
  id: number | null;
  name: string;
  theme: string;
  message: string;
  sender_id: number | null;
  status_id: number | null;
  sender: any;
  receiver: any;
  receivers: any[];
  status: any;
  old_status: string | number | null;
  view_count: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface byReportTeacherMap {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  topics: {
    date: string;
    pair_id: number;
    employee_id: number;
    pair: string;
    count: number;
  }[];
}
export interface CurriculumInfoScheduleIndexFace {
  academic_group: string;
  academic_year: string;
  edu_plan: string;
  id: number;
  week_count: number;
  lesson_topics: {
    additional: number | string;
    audience: string;
    date: string;
    employee: string;
    id: number;
    lesson_activity: string;
    pair: {
      id: string | number;
      name: string | number;
      position: number;
      time_start: string;
      time_end: string;
    };
    subject: string;
    topic_done: string;
  }[];
  semester: {
    id: number;
    semester: number;
    course: number;
    status: boolean;
    academic_year: string;
  };
  weeks: {
    count: number;
    position: number;
  }[];
}
export interface examsAllListFace {
  from?: null | number | string;
  last_page?: number;
  first_page_url?: string;
  current_page?: number;
  links?: {
    url?: null | string;
    label?: string;
    active?: boolean;
  }[];
  next_page_url?: null | string;
  path?: string;
  per_page?: number;
  prev_page_url?: null | number | string;
  to?: null | string | number;
  total?: number;
  data?: {}[];
}
export interface CurriculumApiParamsExamCreate {
  name?: string | null;
  exam_type_id?: number | null;
  edu_plan_id: number | null;
  academic_year_id?: number | null;
  subject_id?: number | null;
  semester_id?: number | null;
  employee_id?: number | null;
  datetime_start?: string | null;
  datetime_end?: string | null;
  duration?: number | null;
  max_ball?: number | null;
  attemps_count?: number | null;
  questions_count?: number | null;
  randomable?: boolean | null;
  comment?: string | null;
  status?: boolean | null;
}
