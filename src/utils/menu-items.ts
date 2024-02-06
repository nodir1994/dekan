/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    //--------------Karyera xizmati------------------
    {
      name: "career_service",
      subActivePaths: "/career",
      icon: "mdi mdi-chevron-triple-up",
      sub: [
        {
          name: "points",
          icon: "mdi mdi-record-circle align-middle",
          to: "/career/index",
        },
        {
          name: "settings",
          icon: "mdi mdi-record-circle align-middle",
          to: "/career/crud",
        },
        // {
        //   name: "Qualification_improvement",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/employee/advenced-training",
        // },
        // {
        //   name: "Teacher_competition",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/employee/employee-competition",
        // },
      ],
    },
    //--------------XODIMLAR------------------

    {
      name: "Employee_Information",
      subActivePaths: "/employee",
      icon: "mdi mdi-briefcase-variant",
      sub: [
        {
          name: "Employee_Teacher",
          icon: "mdi mdi-record-circle align-middle",
          to: "/employee/teacher",
        },
        // {
        //   name: "Qualification_improvement",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/employee/advenced-training",
        // },
        // {
        //   name: "Teacher_competition",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/employee/employee-competition",
        // },
      ],
    },

    //----------TALABALAR-------------
    {
      name: "Student_Contingents",
      subActivePaths: "/student",
      icon: "mdi mdi-account-supervisor",
      sub: [
        {
          name: "Student_Special",
          icon: "mdi mdi-record-circle align-middle",
          to: "/student/special",
        },
        {
          name: "Student_Student",
          icon: "mdi mdi-record-circle align-middle",
          to: "/student/student",
        },
        {
          name: "Retraining_Student_Register",
          icon: "mdi mdi-record-circle align-middle",
          to: "/student/attach",
        },
        {
          name: "Student_Employment_List",
          icon: "mdi mdi-record-circle align-middle",
          to: "/student/list",
        },
        // {
        //   name: "Student_Student_Award",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/student/award",
        // },
        {
          name: "classification",
          icon: "mdi mdi-record-circle align-middle",
          to: "/student/qualification",
        },
      ],
    },
    //----------TALABA HARAKATI-------------
    {
      name: "Student_Status",
      subActivePaths: "/status-student",
      icon: "mdi mdi-account-tie",
      sub: [
        {
          name: "Commands",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/order-list",
        },
        {
          name: "Transfer_Student_Transfer",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/student-transfer/semestr",
        },
        {
          name: "Student_Student_Transfer",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/student-transfers",
        },
        {
          name: "Transfer_Student_Course Transfer",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-courses",
        },
        {
          name: "Expel_Course_Semester",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-course-down",
        },
        {
          name: "Transfer_Student_Expel",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-out",
        },
        {
          name: "Transfer_Academic_Mobile",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-mobile",
        },
        {
          name: "academic_leave",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-vacation",
        },
        {
          name: "education__recovery",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-recovery",
        },
        {
          name: "Transfer_Return",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-return",
        },
        {
          name: "Transfer_Graduate",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/transfer-finish",
        },
        {
          name: "Transfer_Status",
          icon: "mdi mdi-record-circle align-middle",
          to: "/status-student/status",
        },
      ],
    },
    //----------FANLAR BAZASI-------------
    {
      name: "Subjects",
      subActivePaths: "/subjects",
      icon: "mdi mdi-database",
      sub: [
        {
          name: "calendar_Plan",
          icon: "mdi mdi-record-circle align-middle",
          to: "/subjects/calendar-plan",
        },
      ],
    },
    //----------O'QUV JARAYONI-------------
    {
      name: "Curriculum_Process",
      subActivePaths: "/curriculum",
      icon: "mdi mdi-book",
      sub: [
        {
          name: "Curriculum",
          icon: "mdi mdi-record-circle align-middle",
          to: "/curriculum/curriculum",
        },
        {
          name: "Curriculum_Semester",
          icon: "mdi mdi-record-circle align-middle",
          to: "/curriculum/semester",
        },
        {
          name: "Curriculum_Student_Register",
          icon: "mdi mdi-record-circle align-middle",
          to: "/curriculum/student-register",
        },
        {
          name: "Curriculum_Schedule",
          icon: "mdi mdi-record-circle align-middle",
          to: "/curriculum/info-schedule",
        },
        {
          name: "Curriculum_Exam_Schedule",
          icon: "mdi mdi-record-circle align-middle",
          to: "/curriculum/exam-schedule",
        },
        // {
        //   name: "List_of_exams",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/curriculum/exams",
        // },
      ],
    },
    //------------------------Davomat----------------------- -->
    {
      name: "attendance",
      subActivePaths: "/attendance",
      icon: "mdi mdi-account-check",
      sub: [
        {
          name: "attendance_Attendance_Journal",
          icon: "mdi mdi-record-circle align-middle",
          to: "/attendance/journal",
        },
        {
          name: "attendance_Activity",
          icon: "mdi mdi-record-circle align-middle",
          to: "/attendance/status",
        },
        {
          name: "attendance_Report",
          icon: "mdi mdi-record-circle align-middle",
          to: "/attendance/report",
        },
        {
          name: "attendance_Overall",
          icon: "mdi mdi-record-circle align-middle",
          to: "/attendance/statistic",
        },
        {
          name: "attendance_By_Subjects",
          icon: "mdi mdi-record-circle align-middle",
          to: "/attendance/subject",
        },
        {
          name: "lessons_Monitoring",
          icon: "mdi mdi-record-circle align-middle",
          to: "/attendance/lessons",
        },
      ],
    },
    //------------------------Nazoratlar----------------------- -->
    {
      name: "Rating_Grades",
      subActivePaths: "/teacher",
      icon: "mdi mdi-finance",
      sub: [
        {
          name: "certificate_Committee_Result",
          icon: "mdi mdi-record-circle align-middle",
          to: "/teacher/certificate-committee-result",
        },
      ],
    },

    //------------------------Akademik arxiv----------------------- -->
    {
      name: "archive",
      subActivePaths: "/archive",
      icon: "mdi mdi-archive",
      sub: [
        {
          name: "academic_record",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/academic-note",
        },
        {
          name: "archive_Diploma",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/diplom-give",
        },
        {
          name: "Diploma_Blank",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/diplom-blank",
        },
        // {
        //   name: "Diplomas_list",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/archive/diplomaList",
        // },
        {
          name: "archive_Transcript",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/transcript",
        },
        // {
        //   name: "academic_Information",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/archive/academic-reference",
        // },
        {
          name: "accreditation",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/accreditation",
        },
        {
          name: "archive_Batch_Rate",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/diplom-ball",
        },
        // {
        //   name: "add_Employment",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/archive/employment",
        // },
        {
          name: "archive_Certificate_Committee",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/certificate-committee",
        },
        {
          name: "archive_Graduate_Work",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/graduate-work",
        },
        {
          name: "archive_Academic_Sheet",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/sheet",
        },
        {
          name: "archive_Reference",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/reference",
        },
        {
          name: "archive_Circulation_Sheet",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/circulation-sheet",
        },
        {
          name: "archive_Circulation_Sheet_Check",
          icon: "mdi mdi-record-circle align-middle",
          to: "/archive/circ-sheet-check",
        },
      ],
    },

    //----------REYTING-------------
    {
      name: "Rating",
      subActivePaths: "/science",
      icon: "mdi mdi-finance",
      sub: [
        {
          name: "Rating_Teacher",
          icon: "mdi mdi-record-circle align-middle",
          to: "/science/teacher-rating",
        },
        {
          name: "Rating_Department",
          icon: "mdi mdi-record-circle align-middle",
          to: "/science/department-rating",
        },
      ],
    },
    //----------Moliyaviy faoliyat-------------
    {
      name: "Finance",
      subActivePaths: "/finance",
      icon: "mdi mdi-finance",
      sub: [
        {
          name: "Finance_Payment_Monitoring_Department",
          icon: "mdi mdi-record-circle align-middle",
          to: "/finance/contract",
        },
        {
          name: "Finance_Scholarship",
          icon: "mdi mdi-record-circle align-middle",
          to: "/finance/stipend",
        },
      ],
    },
    //----------O'zlashtirish statistikasi-------------
    {
      name: "Education_Performance",
      subActivePaths: "/performance",
      icon: "mdi mdi-check-bold",
      sub: [
        {
          name: "Performance_Performance",
          icon: "mdi mdi-record-circle align-middle",
          to: "/performance/performance",
        },
        {
          name: "Performance_Summary",
          icon: "mdi mdi-record-circle align-middle",
          to: "/performance/summary",
        },
        {
          name: "Academic_debt",
          icon: "mdi mdi-record-circle align-middle",
          to: "/performance/debtors",
        },
        {
          name: "Performance_Gpa",
          icon: "mdi mdi-record-circle align-middle",
          to: "/performance/gpa",
        },
        {
          name: "Performance_Ptt",
          icon: "mdi mdi-record-circle align-middle",
          to: "/performance/graphic",
        },
      ],
    },
    //----------Statistikasi-------------
    {
      name: "Statistics",
      subActivePaths: "/statistical",
      icon: "mdi mdi-chart-bar",
      sub: [
        {
          name: "Statistical_By_Student",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/by-student",
        },
        {
          name: "by_Student_General",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/general-by-student",
        },
        {
          name: "Statistical_By_Student_Social",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/student-social",
        },
        {
          name: "Statistical_By_Teacher",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/by-teacher",
        },
        {
          name: "File_Resource_Report",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/resource-statistics",
        },
        {
          name: "Statistical_By_Contract",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/by-contract",
        },
        {
          name: "Statistical_By_Contract__All",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/all-contracts",
        },
        // {
        //   name: "Statistical_By_Employment",
        //   icon: "mdi mdi-record-circle align-middle",
        //   to: "/statistical/by-employment",
        // },
        {
          name: "Statistical_By_Performance",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/by-performance",
        },
        {
          name: "Statistical_Load_Stat",
          icon: "mdi mdi-record-circle align-middle",
          to: "/statistical/training",
        },
      ],
    },
    //----------Hisobotlar-------------
    {
      name: "Reports",
      subActivePaths: "/report",
      icon: "mdi mdi-view-list",
      sub: [
        {
          name: "Teacher_activity",
          icon: "mdi mdi-record-circle align-middle",
          to: "/report/teacher",
        },
        {
          name: "Student_activity",
          icon: "mdi mdi-record-circle align-middle",
          to: "/report/student",
        },
        {
          name: "Resources_report",
          icon: "mdi mdi-record-circle align-middle",
          to: "/report/resources",
        },
        {
          name: "Audience_occupancy",
          icon: "mdi mdi-record-circle align-middle",
          to: "/report/rooms",
        },
        {
          name: "Teacher_employment",
          icon: "mdi mdi-record-circle align-middle",
          to: "/report/map-teacher",
        },
        {
          name: "List_of_exams",
          icon: "mdi mdi-record-circle align-middle",
          to: "/report/exams",
        },
      ],
    },
    // Kordinator
    {
      name: "Coordinator",
      subActivePaths: "/coordinator",
      icon: "mdi mdi-account-network",
      sub: [
        {
          name: "coordinator_list",
          icon: "mdi mdi-record-circle align-middle",
          to: "/coordinator/list-coordinator",
        },
        {
          name: "all_groups",
          icon: "mdi mdi-record-circle align-middle",
          to: "/coordinator/all-group",
        },
        {
          name: "coordinator_groups",
          icon: "mdi mdi-record-circle align-middle",
          to: "/coordinator/group-coordinator",
        },
      ],
    },
    // Konferensiyalar
    {
      name: "conference",
      subActivePaths: "/conferences",
      icon: "mdi mdi-monitor",
      sub: [
        {
          name: "all_conference",
          icon: "mdi mdi-record-circle align-middle",
          to: "/conferences",
        },
      ],
    },
    // XABARLAR
    {
      name: "sectionName.messages",
      subActivePaths: "/messages",
      icon: "mdi mdi-email",
      sub: [
        {
          name: "My_messages",
          icon: "mdi mdi-record-circle align-middle",
          to: "/messages/all",
        },
        {
          name: "Compose_message",
          icon: "mdi mdi-record-circle align-middle",
          to: "/messages/compose",
        },
      ],
    },
  ],
};
