export default [
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/[...all].vue') },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/index.vue"), // main page
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile.vue"), // main page
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/page/500",
        name: "500",
        component: () => import("@/views/utility/500.vue"), // main page
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/page/404",
        name: "404",
        component: () => import("@/views/utility/404.vue"), // main page
        // meta: {
        //   requiresAuth: true,
        // },
      },

      // karyera  start
      {
        path: "career",
        children: [
          {
            path: "index",
            component: () =>
              import("@/views/career/index.vue"),
          },
          {
            path: "crud",
            component: () =>
              import("@/views/career/crud.vue"),
          }
        ]
      },

      // {
      //   path: "coordinator",
      //   children: [
      //     {
      //       path: "list-coordinator",
      //       children: [
      //         {
      //           path: "",
      //           component: () =>
      //             import("@/views/coordinator/list-coordinator/index.vue"),
      //         },
      //         {
      //           path: ":id",
      //           component: () =>
      //             import("@/views/coordinator/list-coordinator/id.vue"),
      //         },
      //       ],
      //     },
      //   ],
      // },

      // {
      //   path: "/employee-information/employee-data/employee/:id",
      //   name: "employee",
      //   component: () =>
      //     import(
      //       "@/views/employee-information/employee-data/employee/[id].vue"
      //     ), //Xodim
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/employee-data",
      //   name: "employee-data",
      //   component: () =>
      //     import("@/views/employee-information/employee-data/index.vue"), //Xodimlar bazasi
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/foreign-professor",
      //   name: "foreign-professor",
      //   component: () =>
      //     import("@/views/employee-information/foreign-professor.vue"), //xodimlar ro'yxati
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/employee-list",
      //   name: "employee-list",
      //   component: () =>
      //     import("@/views/employee-information/employee-list/index.vue"),
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/teacher-list",
      //   name: "teacher-list",
      //   component: () =>
      //     import("@/views/employee-information/teacher-list/index.vue"), //o'qituvchilar ro'yxati
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/scientific-status",
      //   name: "scientific-status",
      //   component: () =>
      //     import("@/views/employee-information/scientific-status/index.vue"), // ilmiy status
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/foreign-training",
      //   name: "foreign-training",
      //   component: () =>
      //     import("@/views/employee-information/foreign-training/index.vue"), // xorijiy faliyat
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/employee-information/employee-status",
      //   name: "employee-status",
      //   component: () =>
      //     import("@/views/employee-information/employee-status/index.vue"), //xodimlar xolati
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      // {
      //   path: "/students/index",
      //   name: "students",
      //   component: () => import("@/views/students/index.vue"), //talabalar kontengenti
      //   // meta: {
      //   //   requiresAuth: true,
      //   // },
      // },
      {
        path: "/archive/diplomas",
        name: "diplomas",
        component: () => import("@/views/archive/diplomas.vue"), //diplomlar ro'yxati
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/archive/circulation-sheet",
        name: "circulation-sheet",
        component: () => import("@/views/archive/circulation-sheet/index.vue"), // aylanma varaqa
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/archive/circulation-sheet/removeCirculationSheet",
        name: "removeCirculationSheet",
        component: () =>
          import(
            "@/views/archive/circulation-sheet/removeCirculationSheet.vue"
          ), //aylanma varaqa qo'shish
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/pages/404",
        name: "pages-404",
        component: () => import("@/views/utility/404.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/pages/500",
        name: "pages-500",
        component: () => import("@/views/utility/500.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      ///////NEW//////
      {
        path: "/my-profil",
        name: "my-profil",
        component: () => import("@/views/my-profil.vue"), // main page
      },
      // {
      //   path: '/structure/university',
      //   name: 'university',
      //   component: () => import('@/views/structure/university/index.vue') // OTM haqida
      // },
      // {
      //   path: '/structure/faculty',
      //   name: 'faculty',
      //   component: () => import('@/views/structure/faculty/index.vue') // Fakultet
      // },
      // {
      //   path: '/structure/department',
      //   name: 'department',
      //   component: () => import('@/views/structure/department/index.vue') // Kafedra
      // },
      // {
      //   path: '/structure/section',
      //   name: 'division',
      //   component: () => import('@/views/structure/section/index.vue') // bo'lim
      // },
      // {
      //   path: '/employee/employee',
      //   name: 'employee-data',
      //   component: () => import('@/views/employee/employee/index.vue') //Xodimlar bazasi
      // },
      // {
      //   path: '/employee/employee/employee',
      //   name: 'employee',
      //   component: () => import('@/views/employee/employee/employee.vue') //Xodim [FISH]
      // },
      // {
      //   path: '/employee/employee/create',
      //   name: 'create-employee',
      //   component: () => import('@/views/employee/employee/create.vue') //Xodim yaratish
      // },
      // {
      //   path: '/employee/employee/edit-accaunt',
      //   name: 'edit-accaunt',
      //   component: () => import('@/views/employee/employee/edit-accaunt.vue') //Xodim yaratish
      // },
      // {
      //   path: '/employee/foreign-professor',
      //   name: 'foreign-professor',
      //   component: () => import('@/views/employee/foreign-professor.vue')  //xodimlar ro'yxati
      // },
      // {
      //   path: '/employee/direction',
      //   name: 'employee-list',
      //   component: () => import('@/views/employee/direction/index.vue')
      // },
      {
        path: "/employee/teacher",
        name: "teacher-list",
        component: () => import("@/views/employee/teacher/index.vue"), //o'qituvchilar ro'yxati
      },
      // {
      //   path: '/employee/scientific-status',
      //   name: 'scientific-status',
      //   component: () => import('@/views/employee/scientific-status/index.vue') // ilmiy status
      // },
      // {
      //   path: '/employee/foreign-training',
      //   name: 'foreign-training',
      //   component: () => import('@/views/employee/foreign-training/index.vue') // xorijiy faliyat
      // },
      // {
      //   path: '/employee/employee-status',
      //   name: 'employee-status',
      //   component: () => import('@/views/employee/employee-status/index.vue') //xodimlar xolati
      // },
      {
        path: "/employee/employee-competition/monitoring",
        name: "monitoring",
        component: () =>
          import("@/views/employee/employee-competition/monitoring.vue"), //monitoring tanlovdan o'tish
      },
      {
        path: "/employee/advenced-training/monitoring",
        name: "monitoring1",
        component: () =>
          import("@/views/employee/advenced-training/monitoring.vue"), //monitoring malaka oshirish
      },
      {
        path: "/employee/employee-competition",
        name: "employee-competition",
        component: () =>
          import("@/views/employee/employee-competition/index.vue"), //tanlovdan o'tis
      },
      {
        path: "/employee/advenced-training",
        name: "advenced-training",
        component: () => import("@/views/employee/advenced-training/index.vue"), //ma'laka oshirish
      },
      {
        path: "/employee/employee-competition",
        name: "employee-competition",
        component: () =>
          import("@/views/employee/employee-competition/index.vue"), //buyruqlar
      },
      {
        path: "/employee/advenced-training",
        name: "advenced-training",
        component: () => import("@/views/employee/advenced-training/index.vue"), //talabani ko'chirish
      },
      {
        path: "/employee/tyutor",
        name: "tyutor",
        component: () => import("@/views/employee/tyutor/index.vue"), //tyutor
      },
      {
        path: "/employee/tyutor/:id",
        name: "tyutor-id",
        component: () => import("@/views/employee/tyutor/id.vue"), //tyutor guruhlari
      },
      // kordinator  start
      {
        path: "coordinator",
        children: [
          {
            path: "list-coordinator",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/coordinator/list-coordinator/index.vue"),
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/coordinator/list-coordinator/id.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "coordinator",
        children: [
          {
            path: "group-coordinator",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/coordinator/group-coordinator/index.vue"),
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/coordinator/group-coordinator/id.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/coordinator/all-group",
        name: "coordinator-all-group",
        component: () => import("@/views/coordinator/all-group/index.vue"), // Hamma guruhlar
      },
      // kordinator end
      //-------------Talaba xarakati----------------
      {
        path: "status-student",
        children: [
          {
            path: "order-list",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/status-student/order-list/index.vue"), //buyruqlar
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/status-student/order-list/[id]/index.vue"), //buyruq[id]
              },
            ],
          },
          // {
          //   path: "apply-order",
          //   component: () => import('@/views/status-student/order-list/apply-order.vue') //buyruqga biriktirish
          // }
        ],
      },
      {
        path: "/status-student/order-list/apply-order",
        name: "apply-order",
        component: () =>
          import("@/views/status-student/order-list/apply-order.vue"), //buyruqga biriktirish
      },
      {
        path: "/status-student/order-list/create-order",
        name: "create-order",
        component: () =>
          import("@/views/status-student/order-list/create-order.vue"), //buyruq yaratish
      },
      {
        path: "/status-student/student-transfers",
        name: "student-transfer",
        component: () =>
          import("@/views/status-student/student-transfer/index.vue"), //talabani ko'chirish
      },
      {
        path: "/status-student/student-transfer/semestr",
        name: "transfer-student-semestr",
        component: () =>
          import("@/views/status-student/student-transfer/semestr.vue"), //talabalarni kochirish (semestr boyicha)
      },
      {
        path: "/status-student/transfer-courses",
        name: "transfer-course",
        component: () => import("@/views/status-student/transfer-course.vue"), //talabalarni kursga otkazish
      },
      {
        path: "/status-student/transfer-course-down",
        name: "transfer-course-down",
        component: () =>
          import("@/views/status-student/transfer-course-down.vue"), //talabalarni kursdan qoldirish
      },
      {
        path: "/status-student/transfer-out",
        name: "transfer-out",
        component: () => import("@/views/status-student/transfer-out.vue"), //Chetlashtirish
      },
      {
        path: "/status-student/transfer-mobile",
        name: "transfer-mobile",
        component: () => import("@/views/status-student/transfer-mobile.vue"), //Akademik mobillik
      },
      {
        path: "/status-student/transfer-vacation",
        name: "transfer-vacation",
        component: () => import("@/views/status-student/transfer-vacation.vue"), //Akademik ta'til
      },
      {
        path: "/status-student/transfer-recovery",
        name: "transfer-recovery",
        component: () =>
          import("@/views/status-student/transfer-recovery/index.vue"), //O'qishni tiklash
      },
      {
        path: "/status-student/transfer-recovery-test",
        name: "transfer-recovery-test",
        component: () =>
          import("@/views/status-student/transfer-recovery/test.vue"), //O'qishni tiklash test
      },
      {
        path: "/status-student/transfer-recovery/:id",
        name: "transfer-recovery-id",
        component: () =>
          import("@/views/status-student/transfer-recovery/id.vue"), //O'qishni tiklash - id
      },
      {
        path: "/status-student/transfer-return",
        name: "transfer-return",
        component: () => import("@/views/status-student/transfer-return.vue"), //O'qishga qaytarish
      },
      {
        path: "/status-student/transfer-finish",
        name: "transfer-finish",
        component: () => import("@/views/status-student/transfer-finish.vue"), //O’qishni bitirish
      },
      {
        path: "/status-student/status",
        name: "statusus",
        component: () => import("@/views/status-student/status.vue"), //talabalar holati
      },

      // -------------------------------------------

      //-------------o'quv jarayoni------------------
      {
        path: "/curriculum/education-year",
        name: "education-year",
        component: () => import("@/views/curriculum/education-year/index.vue"), //o'quv yili
      },
      {
        path: "curriculum",
        children: [
          {
            path: "curriculum",
            children: [
              {
                path: "create",
                component: () =>
                  import("@/views/curriculum/curriculum/create.vue"), //o'quv reja yaratish
              },
              {
                path: "",
                component: () =>
                  import("@/views/curriculum/curriculum/index.vue"), //o'quv reja
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/curriculum/curriculum/[id]/index.vue"),
              },
              {
                path: ":id/week",
                component: () =>
                  import("@/views/curriculum/curriculum/[id]/week.vue"), //xaftaliklar
              },
              {
                path: ":id/subjects",
                component: () =>
                  import("@/views/curriculum/curriculum/[id]/subjects.vue"), //fanlar
              },
              {
                path: ":id/create-subject/:idSemester",
                component: () =>
                  import(
                    "@/views/curriculum/curriculum/[id]/create-subject.vue"
                  ), // fan sillabusi
              },
              {
                path: ":id/subject-update/:idSubject",
                component: () =>
                  import(
                    "@/views/curriculum/curriculum/[id]/subject-update.vue"
                  ), //fan sillabusini o'zgartirish
              },
            ],
          },
          {
            path: "info-schedule",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/curriculum/info-schedule/index.vue"), //dars jadvali
              },
              {
                path: ":id",
                name: "schedule",
                component: () =>
                  import("@/views/curriculum/info-schedule/[id]/index.vue"), //jadval
              },
            ],
          },
          // {
          //   path: "list-curriculum",
          //   children: [
          //     {
          //       path: "",
          //       component: () =>
          //         import("@/views/curriculum/list-curriculum/index.vue"), //o'quv rejalar ro'yxati
          //     },
          //     {
          //       path: ":id/curriculum",
          //       component: () =>
          //         import(
          //           "@/views/curriculum/list-curriculum/[id]/curriculum.vue"
          //         ), //o'quv rejalar ro'yxati
          //     },
          //   ],
          // },
          {
            path: "exam-schedule",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/curriculum/exam-schedule/index.vue"), //dars jadvali
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/curriculum/exam-schedule/[id]/index.vue"), //jadval
              },
            ],
          },
          {
            path: "exams",
            children: [
              {
                path: "",
                component: () => import("@/views/curriculum/exam/index.vue"), // Imhtihonlar ro'yxati umumiy
              },
              {
                path: "create",
                component: () => import("@/views/curriculum/exam/create.vue"), // Imhtihonlar ro'yxati umumiy
              },
            ],
          },
        ],
      },
      // {
      //   path: '/curriculum/archive-curriculum',
      //   name: 'archive-curriculum',
      //   component: () => import('@/views/curriculum/archive-curriculum/index.vue') //o'quv rejalar arxivi
      // },
      // {
      //   path: '/curriculum/exam-schedule',
      //   name: 'exam-schedule',
      //   component: () => import('@/views/curriculum/exam-schedule/index.vue') //nazorat jadvali
      // },
      // {
      //   path: '/curriculum/exam-schedule/exam',
      //   name: 'examSchedule',
      //   component: () => import('@/views/curriculum/exam-schedule/exam.vue') //nazorat
      // },
      // {
      //   path: '/curriculum/list-exam',
      //   name: 'list-exam',
      //   component: () => import('@/views/curriculum/list-exam/index.vue') //nazorat jadvalini ko'rish
      // },
      // {
      //   path: '/curriculum/list-exam/exam',
      //   name: 'examLooc',
      //   component: () => import('@/views/curriculum/list-exam/exam.vue') //nazorat jadvalini ko'rish gurux
      // },

      {
        path: "/curriculum/semester",
        name: "semester",
        component: () => import("@/views/curriculum/semester/index.vue"), //semestrlar
      },
      {
        path: "/curriculum/student-register",
        name: "student-register",
        component: () => import("@/views/curriculum/student-register.vue"), //semestrlar
      },
      {
        path: "/curriculum/info-schedule",
        name: "info-schedule",
        component: () => import("@/views/curriculum/info-schedule/index.vue"), //dars jadvali
      },
      {
        path: "/curriculum/info-schedule/generation",
        name: "generation",
        component: () =>
          import("@/views/curriculum/info-schedule/generation.vue"), //jadval
      },
      // {
      //   path: '/curriculum/list-schedule',
      //   name: 'list-schedule',
      //   component: () => import('@/views/curriculum/list-schedule/index.vue') //dars jadvalini ko'rish
      // },
      // {
      //   path: '/curriculum/list-schedule/schedule',
      //   name: 'scheduleLooc',
      //   component: () => import('@/views/curriculum/list-schedule/schedule.vue') //o'quv reja jadvalini ko'rish
      // },
      {
        path: "/curriculum/marking-system",
        name: "marking-system",
        component: () => import("@/views/curriculum/marking-system/index.vue"), //baxolash tizimi
      },
      {
        path: "/curriculum/grade-type",
        name: "grade-type",
        component: () => import("@/views/curriculum/grade-type/index.vue"), //baxo turlari
      },
      {
        path: "/curriculum/rating-grade",
        name: "rating-grade",
        component: () => import("@/views/curriculum/rating-grade/index.vue"), //qaydnoma turlari
      },
      {
        path: "/curriculum/lesson-pair",
        name: "lesson-pair",
        component: () => import("@/views/curriculum/lesson-pair/index.vue"), //juftliklar
      },
      {
        path: "/curriculum/exam",
        name: "exam",
        component: () => import("@/views/curriculum/exam/index.vue"), //imtihon;ar ro'yhati
      },
      {
        path: "/curriculum/exam/create",
        name: "create",
        component: () => import("@/views/curriculum/exam/create.vue"), //imtihon;ar ro'yhati
      },
      {
        path: "/curriculum/exam/subject",
        name: "subject",
        component: () => import("@/views/curriculum/exam/subject.vue"), //imtihon fan
      },
      {
        path: "/curriculum/exam/questions",
        name: "questions",
        component: () => import("@/views/curriculum/exam/questions.vue"), //imtihon savollari
      },
      {
        path: "/curriculum/exam/result",
        name: "result",
        component: () => import("@/views/curriculum/exam/result.vue"), //natija
      },
      {
        path: "/curriculum/exam/resultStudent",
        name: "resultStudent",
        component: () => import("@/views/curriculum/exam/resultStudent.vue"), //natija talaba
      },
      {
        path: "/curriculum/exam/questionsInput",
        name: "questionsInput",
        component: () => import("@/views/curriculum/exam/questionsInput.vue"), //natija talaba
      },

      //-------------davomat--------------------------------
      {
        path: "/attendance/journal",
        name: "attendance",
        component: () => import("@/views/attendance/journal/index.vue"), //Davomat jurnali
      },
      {
        path: "/attendance/journal/:id",
        name: "/attendance-id",
        component: () => import("@/views/attendance/journal/id.vue"), //Davomat jurnali ichki page
      },
      {
        path: "/attendance/status",
        name: "attendance-status",
        component: () => import("@/views/attendance/status.vue"), //Davomat statusi
      },
      {
        path: "/attendance/lessons",
        name: "lessons",
        component: () => import("@/views/attendance/lessons/index.vue"), //darslar monitoringi
      },
      {
        path: "/attendance/report",
        name: "attendance-report",
        component: () => import("@/views/attendance/report.vue"), //Davomat hisoboti
      },
      {
        path: "/attendance/statistic",
        name: "attendance-statistic",
        component: () => import("@/views/attendance/statistic.vue"), //Statistik davomat
      },
      {
        path: "/attendance/subject",
        name: "attendance-subject",
        component: () => import("@/views/attendance/subject.vue"), //Fanlar davomati
      },
      {
        path: "/attendance/attendance-setting",
        name: "attendance-setting",
        component: () =>
          import("@/views/attendance/attendance-setting/index.vue"), //Davomat choralari
      },
      //-------------nazoratlar--------------------------------
      {
        path: "teacher",
        children: [
          {
            path: "certificate-committee-result",
            children: [
              {
                path: "",
                component: () =>
                  import(
                    "@/views/teacher/certificate-committee-result/index.vue"
                  ), //o'quv reja yaratish
              },
              {
                path: "create",
                component: () =>
                  import(
                    "@/views/teacher/certificate-committee-result/create.vue"
                  ), //o'quv reja yaratish
              },
              {
                path: ":id",
                component: () =>
                  import(
                    "@/views/teacher/certificate-committee-result/[id]/index.vue"
                  ), //talabalar bazasi
              },
            ],
          },
        ],
      },
      // {
      //   path: '/teacher/certificate-committee-result/create',
      //   name: 'certificate-commit',
      //   component: () => import('@/views/teacher/certificate-committee-result/create.vue') //dak yaratish
      // },

      //---------nazoratlat o'qituvchi----------
      {
        path: "/teacher/midterm-exam-table",
        name: "midterm-exam-table",
        component: () => import("@/views/teacher/midterm-exam-table/index.vue"), //oraliq nazorat
      },
      {
        path: "/teacher/midterm-exam-table/check-lesson",
        name: "check-lesson-exam",
        component: () =>
          import("@/views/teacher/midterm-exam-table/check-lesson.vue"), //Oraliq nazorat ko'rish
      },
      {
        path: "/teacher/final-exam-table",
        name: "final-exam-table",
        component: () => import("@/views/teacher/final-exam-table/index.vue"), //yakuniy nazorat
      },
      {
        path: "/teacher/final-exam-table/check-lesson",
        name: "check-lesson-final-exam",
        component: () =>
          import("@/views/teacher/final-exam-table/check-lesson.vue"), //yakuniy nazorat ko'rish
      },
      {
        path: "/teacher/other-exam-table",
        name: "other-exam-table",
        component: () => import("@/views/teacher/other-exam-table/index.vue"), //umumiy nazorat
      },
      {
        path: "/teacher/other-exam-table/check-lesson",
        name: "check-lesson-other-exam",
        component: () =>
          import("@/views/teacher/other-exam-table/check-lesson.vue"), //umumiy nazorat ko'rish
      },
      //-----------O'zlashtrish---------------------------------
      {
        path: "/performance/debtors",
        name: "debtors",
        component: () => import("@/views/performance/debtors/index.vue"), //imtihon savollari
      },
      {
        path: "/performance/gpa",
        name: "gpa",
        component: () => import("@/views/performance/gpa/index.vue"), // gpa
      },
      {
        path: "/performance/gpa/gpa-add",
        name: "gpa-add",
        component: () => import("@/views/performance/gpa/gpa-add.vue"), // akademik qarzdor
      },
      {
        path: "/performance/performance",
        name: "performance",
        component: () => import("@/views/performance/performance/index.vue"), // Reyting qaytnoma
      },
      {
        path: "/performance/performance/:id",
        name: "/performance/performance-id",
        component: () => import("@/views/performance/performance/id.vue"), // reyting qaydnoma ichki page
      },
      {
        path: "/performance/summary",
        name: "performance-summary",
        component: () => import("@/views/performance/summary.vue"), // Jamlanma qaytnoma
      },
      {
        path: "/performance/graphic",
        name: "graphic",
        component: () => import("@/views/performance/graphic/index.vue"), // Shaxsiy grafik
      },
      {
        path: "/performance/graphic/create",
        name: "performance-create",
        component: () => import("@/views/performance/graphic/create.vue"), // Shaxsiy grafik ko'rish
      },
      {
        path: "/performance/graphic/add",
        name: "performance-add",
        component: () => import("@/views/performance/graphic/add.vue"), // Shaxsiy grafik ko'rish
      },
      {
        path: "/performance/graphic/:id",
        name: "performance-id",
        component: () => import("@/views/performance/graphic/id.vue"), // Shaxsiy grafik ko'rish - id
      },
      //--------------------------------------------

      //-----------infrastruktura---------------------------------
      {
        path: "/infrastructure/building",
        name: "building",
        component: () => import("@/views/infrastructure/building/index.vue"), //imtihon savollari
      },
      {
        path: "/infrastructure/auditorium",
        name: "auditorium",
        component: () => import("@/views/infrastructure/auditorium/index.vue"), // gpa
      },
      //--------------------------------------------

      //-------------------------Moliyaviy faoliyat start-------------------
      {
        path: "/finance/contract",
        name: "finance-contract",
        component: () => import("@/views/finance/contract.vue"), // Shartnoma to’lovi
      },
      {
        path: "finance",
        children: [
          {
            path: "stipend",
            children: [
              {
                path: "",
                component: () => import("@/views/finance/stipend/stipend.vue"), // Stipendiya bazaviy
              },
              {
                path: "stipend-set",
                component: () =>
                  import("@/views/finance/stipend/stipend-set.vue"), //  Stipendiya bazaviy
              },
              {
                path: ":id",
                component: () => import("@/views/finance/stipend/id.vue"), //  Stipendiya bazaviy id boyicha
              },
            ],
          },
        ],
      },
      // {
      //   path: "/finance/stipend",
      //   name: "finance-stipend",
      //   component: () => import("@/views/finance/stipend/stipend.vue"), //
      // },
      // {
      //   path: "/finance/stipend/stipend-set",
      //   name: "finance-stipend-set",
      //   component: () => import("@/views/finance/stipend/stipend-set.vue"), //
      // },
      // {
      //   path: "/finance/stipend/stipend-set/:id",
      //   name: "finance-stipend-set-id",
      //   component: () => import("@/views/finance/stipend/id.vue"), // Stipendiya bazaviy id boyicha
      // },
      //-------------------------Moliyaviy faoliyat end-------------------

      //-------------statistika---------------------
      {
        path: "statistical",
        children: [
          {
            path: "by-student",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/statistical/by-student/index.vue"), //Statistika student umumiy
              },
              {
                path: "all",
                component: () =>
                  import("@/views/statistical/by-student/all.vue"), // umumiy statistika
              },
            ],
          },
        ],
      },
      {
        path: "/statistical/student-social",
        name: "student-social",
        component: () =>
          import("@/views/statistical/by-student-social/index.vue"), //talaba royxati (toifa)
      },
      {
        path: "/statistical/general-by-student",
        name: "by-student-general",
        component: () =>
          import("@/views/statistical/by-student-general/index.vue"), //talaba (ijtimoiy)
      },
      {
        path: "/statistical/by-teacher",
        name: "by-teacher",
        component: () => import("@/views/statistical/by-teacher/index.vue"), //o'qituvchi statistikasi
      },
      {
        path: "/statistical/resource-statistics",
        name: "resource-statistics",
        component: () =>
          import("@/views/statistical/resource-statistics/index.vue"), //resurslar statistikasi
      },
      {
        path: "/statistical/by-contract",
        name: "by-contract",
        component: () => import("@/views/statistical/by-contract/index.vue"), //shartnoma statistikasi
      },

      {
        path: "/statistical/by-performance",
        name: "by-performance",
        component: () => import("@/views/statistical/by-performance/index.vue"), //o'zlashtirish statistikasi
      },
      {
        path: "/statistical/training",
        name: "training",
        component: () => import("@/views/statistical/by-training/index.vue"), //mashg'ulotlar statistikasi
      },
      {
        path: "/statistical/all-contracts",
        name: "all_contracts",
        component: () => import("@/views/statistical/all-contract/index.vue"), //shartnomalar statistikasi (umumiy)
      },

      //-------------hisobotlar---------------------
      {
        path: "/report/teacher",
        component: () => import("@/views/report/by-teacher/index.vue"), //O'qituvchi faolligi
      },
      {
        path: "/report/student",
        component: () => import("@/views/report/by-student/index.vue"), // Talaba faolligi
      },
      {
        path: "/report/resources",
        component: () => import("@/views/report/by-resources/index.vue"), // Resurslar hisoboti
      },
      {
        path: "/report/rooms",
        component: () => import("@/views/report/by-rooms/index.vue"), // Auditoriya bandligi
      },
      {
        path: "/report/map-teacher",
        component: () => import("@/views/report/teacher-map/index.vue"), // O'qituvchi bandligi
      },
      {
        path: "/report/exams",
        component: () => import("@/views/report/by-exam/index.vue"), // Imtixonlar ro'yxati
      },
      //----------------akademik arxiv----------------------------
      {
        path: "/archive/circ-sheet-check",
        name: "circ-sheet-check",
        component: () => import("@/views/archive/circulation-sheet-check.vue"), //bitruv varog'i
      },
      {
        path: "/archive/diplomaList",
        name: "diplomaList",
        component: () => import("@/views/archive/diplomaList.vue"), //diplomlar ro'yxati
      },
      {
        path: "/archive/circulation-sheet",
        name: "circulation-sheet",
        component: () => import("@/views/archive/circulation-sheet/index.vue"), // aylanma varaqa
      },
      {
        path: "/archive/circulation-sheet/removeCirculationSheet",
        name: "removeCirculationSheet",
        component: () =>
          import(
            "@/views/archive/circulation-sheet/removeCirculationSheet.vue"
          ), //aylanma varaqa qo'shish
      },
      {
        path: "/archive/certificate-committee",
        name: "certificate-committee",
        component: () =>
          import("@/views/archive/certificate-committee/index.vue"), // DAK royxati
      },
      {
        path: "/archive/certificate-committee/create",
        name: "certificate-committee-create",
        component: () =>
          import("@/views/archive/certificate-committee/create.vue"), // DAK yaratish
      },
      {
        path: "/archive/certificate-committee/edit/:id",
        name: "certificate-committee-edit",
        component: () =>
          import("@/views/archive/certificate-committee/edit.vue"), // DAK yaratish
      },
      {
        path: "/archive/certificate-committee/certificate-committee-member",
        name: "certificate-committee-member",
        component: () =>
          import(
            "@/views/archive/certificate-committee/certificate-committee-member.vue"
          ), // DAK a'zo qo'shish
      },
      {
        path: "/archive/graduate-work",
        name: "graduate-work",
        component: () => import("@/views/archive/graduate-work/index.vue"), // BMI va MD mavzulari
      },
      {
        path: "/archive/graduate-work/create",
        name: "graduate-work-create",
        component: () => import("@/views/archive/graduate-work/create.vue"), // DAK yaratish
      },
      {
        path: "/archive/graduate-work/edit/:id",
        name: "graduate-work-edit",
        component: () => import("@/views/archive/graduate-work/edit.vue"), // DAK yaratish
      },
      {
        path: "/archive/academic-note",
        name: "archive-academic-note",
        component: () => import("@/views/archive/academic-note/index.vue"), //Akademik yozuv
      },
      {
        path: "/archive/academic-note/view",
        name: "archive-academic-note-view",
        component: () => import("@/views/archive/academic-note/view.vue"), //Akademeik yozuv ko'rish
      },

      {
        path: "/archive/transcript",
        name: "transcript",
        component: () => import("@/views/archive/transcript/index.vue"), // transcript
      },
      {
        path: "/archive/transcript/create",
        name: "transcript-create",
        component: () => import("@/views/archive/transcript/create.vue"), // transcript ko'rish
      },
      {
        path: "/archive/transcript/:id",
        name: "transcript-id",
        component: () => import("@/views/archive/transcript/edit.vue"), // transcript ko'rish - id
      },

      {
        path: "/archive/academic-reference",
        name: "academic-reference",
        component: () => import("@/views/archive/academic-reference/index.vue"), // academic-ma'lumotnoma
      },
      {
        path: "/archive/academic-reference/create",
        name: "academic-reference-create",
        component: () =>
          import("@/views/archive/academic-reference/create.vue"), // academic-ma'lumotnoma ko'rish
      },
      {
        path: "/archive/academic-reference/:id",
        name: "academic-reference-id",
        component: () => import("@/views/archive/academic-reference/id.vue"), // academic-ma'lumotnoma ko'rish - id
      },
      {
        path: "/archive/accreditation",
        name: "accreditation",
        component: () => import("@/views/archive/accreditation/index.vue"), // akkreditatsiya
      },
      {
        path: "/archive/accreditation/:id",
        name: "accreditation-id",
        component: () => import("@/views/archive/accreditation/id.vue"), // akkreditatsiya - id
      },
      {
        path: "/archive/diplom-ball",
        name: "diplom-ball-index",
        component: () => import("@/views/archive/diplom-ball/index.vue"), //  Diplom ballar
      },
      {
        path: "/archive/reference",
        name: "reference-index",
        component: () => import("@/views/archive/reference/index.vue"), // Ma'lumotnomalar
      },
      {
        path: "/archive/employment",
        name: "employment-index",
        component: () => import("@/views/archive/employment/index.vue"), // Ishga joylashish
      },
      {
        path: "/archive/sheet",
        name: "sheet-index",
        component: () => import("@/views/archive/sheet/index.vue"), // O'quv varaqa
      },

      {
        path: "/archive/certificate-committee",
        name: "certificate-committee",
        component: () =>
          import("@/views/archive/certificate-committee/index.vue"), // DAK royxati
      },
      // {
      //   path: '/archive/certificate-committee/creat',
      //   name: 'creat',
      //   component: () => import('@/views/archive/certificate-committee/creat.vue') // DAK yaratish
      // },
      {
        path: "/archive/certificate-committee/certificate-committee-member",
        name: "certificate-committee-member",
        component: () =>
          import(
            "@/views/archive/certificate-committee/certificate-committee-member.vue"
          ), // DAK a'zo qo'shish
      },
      {
        path: "/archive/diplom-blank",
        name: "archive-diplom-blank",
        component: () => import("@/views/archive/diplom-blank/index.vue"), //Diplom blank
      },
      {
        path: "/archive/diplom-give",
        name: "archive-diplom-give",
        component: () => import("@/views/archive/diplom-give/index.vue"), //Diplom berish
      },
      {
        path: "/archive/diplom-give/create",
        name: "archive-diplom-give-create",
        component: () => import("@/views/archive/diplom-give/create.vue"), //Diplom berish create
      },
      {
        path: "/archive/diplom-give/edit",
        name: "diplom-give-id",
        component: () => import("@/views/archive/diplom-give/edit.vue"), // Diplom berish - id
      },
      //-----------reyting---------------------------------
      {
        path: "science",
        children: [
          {
            path: "teacher-rating",
            component: () => import("@/views/science/teacher-rating/index.vue"), //o'qituvchi reytingi
          },
          {
            path: "department-rating",
            component: () =>
              import("@/views/science/department-rating/index.vue"), //kafedra reytingi
          },
        ],
      },

      //--------------------------------------------

      //-------------fanlar bazasi------------------

      {
        path: "subjects",
        children: [
          {
            path: "calendar-plan",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/subjects/calendar-plan/index.vue"), //kalendar reja
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/subjects/calendar-plan/id.vue"), //kalendar reja mavzulari
              },
            ],
          },
        ],
      },

      //---------talabalar----------------------
      {
        path: "student",
        children: [
          {
            path: "student",
            children: [
              {
                path: "",
                component: () => import("@/views/student/student/index.vue"), //talabalar bazasi
              },

              {
                path: "create",
                component: () => import("@/views/student/student/create.vue"), //talaba yaratish
              },
              {
                path: ":id",
                component: () =>
                  import("@/views/student/student/[id]/index.vue"), //talabalar bazasi
              },
            ],
          },
          {
            path: "qualification",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/student/qualification/index.vue"), //klassifikatsiyalar
              },
            ],
          },
          {
            path: "special",
            component: () => import("@/views/student/special/index.vue"), //Mutaxassislik
          },
          {
            path: "list",
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/student/student-list/index.vue"), //talabalar ro'yxati
              },
            ],
          },
          {
            path: "award",
            children: [
              {
                path: "",
                component: () => import("@/views/student/award/index.vue"), //Talaba yutug'i
              },
              {
                path: "create",
                component: () => import("@/views/student/award/create.vue"), //talaba yutug'i qo'shish
              },
              {
                path: "create/:id",
                component: () => import("@/views/student/award/create.vue"), //talaba yutug'ini o'zgartirish
              },
            ],
          },
        ],
      },

      {
        path: "/student/attach",
        name: "attach",
        component: () => import("@/views/student/attach.vue"), //talabani biriktirish
      },
      {
        path: "/student/qualification",
        name: "qualification",
        component: () => import("@/views/student/qualification/index.vue"), //klassifikatsiyalar
      },
      {
        path: "/student/qualification/creat",
        name: "qualification-creat",
        component: () => import("@/views/student/qualification/creat.vue"), //klassifikatsiya yaratish
      },

      //----------------------------tizim-------------------------------
      {
        path: "/system/admin",
        name: "admin",
        component: () => import("@/views/system/admin/index.vue"), //adminstartorlar
      },
      {
        path: "/system/admin/create",
        name: "admin-create",
        component: () => import("@/views/system/admin/create.vue"), //admin yaratish
      },
      {
        path: "/system/backup",
        name: "backup",
        component: () => import("@/views/system/backup.vue"), //tizimni arxivlash
      },
      {
        path: "/system/configuration",
        name: "configuration",
        component: () => import("@/views/system/configuration.vue"), //tizimni sozlash
      },
      {
        path: "/system/system-log",
        name: "system-log",
        component: () => import("@/views/system/system-log/index.vue"), //tizim jurnali
      },
      {
        path: "/system/system-log/id",
        name: "system-log/id",
        component: () => import("@/views/system/system-log/id.vue"), //jurnalni ko'rish
      },
      {
        path: "/system/login",
        name: "login-history",
        component: () => import("@/views/system/login.vue"), //kirish tarixi
      },
      {
        path: "/system/manager",
        name: "manager",
        component: () => import("@/views/system/manager.vue"), //kirish tarixi
      },
      {
        path: "/system/role",
        name: "role",
        component: () => import("@/views/system/role/index.vue"), //tizm rollari
      },
      {
        path: "/system/role/roles",
        name: "roles",
        component: () => import("@/views/system/role/roles.vue"), //tizim resursalri
      },
      {
        path: "/system/role/role-edit",
        name: "role-edit",
        component: () => import("@/views/system/role/role-edit.vue"), //tizim resursalri
      },
      // Xabarlar
      {
        path: "messages",
        children: [
          {
            path: "all",
            component: () => import("@/views/messages/index.vue"), //mening xabarlarim
          },
          {
            path: "compose",
            component: () => import("@/views/messages/compose.vue"), //xabar yaratish
          },
          {
            path: ":id",
            component: () => import("@/views/messages/[id].vue"),
          },
        ],
      },
      {
        path: "conferences",
        children: [
          {
            path: "",
            component: () => import("@/views/conferences/index.vue"), //mening xabarlarim
          },
          {
            path: ":id",
            component: () => import("@/views/conferences/view.vue"), //mening xabarlarim
          },
          // {
          //   path: "zoom",
          //   component: () => import("@/views/conferences/zoom.vue"), //mening xabarlarim
          // },
        ],
      },
    ],
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("@/views/auth/login.vue"),
  },
];
