// import { ref } from "vue";
const advecedTraining = {
    optionsEmployee: [
        { value: "ABDIMUROTOV OYBEK URALOVICH" },
        { value: "ABDRASHITOVA YELENA VLADIMIROVNA" },
        { value: "ABDULAXATOV AKRAMJON RUZMAMATOVICH" },
        { value: "ABDULLAYEV HABIB SHUKURULLAYEVICH" },
        { value: "SAMAROVA SHOXISTA RABIDJANOVNA" },
        { value: "SAYFULLAYEVA ISMIGUL QODIR QIZI" },
        { value: "RAXMANOV SAPARBOY ZARIPOVICH" },
    ],
    employeePosition: [
        { value: "Stajer o'qituvchi" },
        { value: "Assistent" },
        { value: "Katta o'qituvchi" },
        { value: "Dotsent" },
        { value: "Professor" },
        { value: "Kafedra mudiri" },
    ],
    trainingPlace: [
        { value: "Boshqa" },
        { value: "BIMM markazi" },
        { value: "KQT va MO markazi" },
        { value: "Xorijiy muassasa" },
    ],
}
const filtersTable = {
    optionsFaculty: [
        { value: "Matematika va informatka" },
        { value: "Pedagogika" },
        { value: "Informatika o'qitish metodikasi" },
        { value: "Matematika o'qitish metodikasi" },
        { value: "Tarix va tillar" },
    ],
    optionsDivisions: [
        { value: "Informatika va axborot texnologiyalari" },
        { value: "Informatika o'qitish metodikasi" },
        { value: "Matematika o'qitish metodikasi va geometrya" },
        { value: "Matematik analiz" },
    ],
    optionsYear: [
        { value: "2022" },
        { value: "2021" },
        { value: "2020" },
        { value: "2019" },
    ]
}

//jadval malaka oshirish
const tableEmployee =  {
    tableElements: [
    {
      id: 1, //id
      employee: "ABDALOVA SAYYORA KOMILOVNA", //xodim
      department: "Tasviriy san'at", //kafedra
      employeePosition: "Katta o'qituvchi", //lavozim 
      academicDgree: "Fan nomzodi", //ilmiy daraja
      academicRank: "Unvonsiz", //ilmiy unvon
      trainingPlase: "BIMM markazi", //o'qish joyi
      beginDate: "12.02.2021", //o'qish muddai boshlanish sanasi
      endDate: "12.02.2022", //o'qish muddati tugash sanasi
      trainingYear: "1", //yil
    },
  ],
  tableMonitoring: [
    {
        id: 1, //id
        employee: "ABDALOVA SAYYORA KOMILOVNA", //xodim
        department: "Tasviriy san'at", //kafedra
        employeePosition: "Katta o'qituvchi", //lavozim
        trainingPlase: "BIMM markazi", //o'qish joyi
        beginDate: "12.02.2021", //o'qish muddai boshlanish sanasi
        endDate: "12.02.2022", //o'qish muddati tugash sanasi
        trainingYear: "1", //yil
        duration: "24 oy", //muddati
    },
    {
        id: 1, //id
        employee: "YUSUPOVA MUXABBAT ANATOLEVNA", //xodim
        department: "Ingliz tili", //kafedra
        employeePosition: "Stajer-o‘qituvchi", //lavozim
        trainingPlase: "", //o'qish joyi
        beginDate: "-", //o'qish muddai boshlanish sanasi
        endDate: "-", //o'qish muddati tugash sanasi
        trainingYear: "", //yil
        duration: "24 oy", //muddati
    }
  ]
}
// import { ref } from "vue";
const allDate = {
    //mutaxasislik
    optionsSpecial: [
        { value: "Matematika va informatika" },
        { value: "Matematika o‘qitish metodikasi" },
        { value: "Fizika va astronomiya o‘qitish metodikasi" },
        { value: "Geografiya va iqtisodiy bilim asoslari" },
        { value: "Ona tili va adabiyoti (Qozoq tili va adabiyoti)" },
        { value: "Milliy g‘oya, ma’naviyat asoslari va huquq ta’limi" },
    ],
    //to'lov shakli
    optionsPaymentForm: [
        { value: "Davlat granti" },
        { value: "To'lov-shartnoma" },
    ],
    //qabul buyrug'i
    optionsAdmissionOrder: [
        { value: "2022-07-18 / №03-400 o'qishni ko'chirish" },
        { value: "2021-10-18 / №11-440 Talabalar sasiga qabul qilish" },
        { value: "2022-07-18 / №05-010 stipendiya" },
    ],
    //fuqarolik
    optionsCitizenship: [
        { value: "O'zbekiston Respublikasi fuqarosi" },
        { value: "Xorijiy davlat fuqarosi" },
        { value: "Fuqaroligi yo'q shaxslar" },
    ],
    //jinsi
    optionsGender: [
        { value: "Erkak" },
        { value: "Ayol" },
    ],
    //millati
    optionsNationality: [
        { value: "Turkmanlar" },
        { value: "O'zbeklar" },
        { value: "Uyg'urlar" },
        { value: "Ukrainlar" },
        { value: "Ruslar" },
        { value: "Qozoqlar" },
    ],
    //ijtimoy ma'lumot
    optionsSocialCategory: [
        { value: "Boshqa" },
        { value: "To'liq davlat taminotida bo'lgan yetim bollar" },
        { value: "1 va 2-guruh nogironligi bo'lgan talabalar" },
        { value: "Ota-ona qaramog'idan mahrum bo'lgan yetim bolalar" },
        { value: "Halok bo'lgan xarbiylar farzandi" },
    ],
    //student toyifa
    optionsStudentType: [
        { value: "Oddiy" },
        { value: "Ikkinchi oliy" },
        { value: "Superkontrakt" },
        { value: "Imtiyozli" },
    ],
    //davlat
    optionsCountry: [
        { value: "O'zbekiston" },
        { value: "Avstraliya" },
        { value: "Qozog'iston" },
        { value: "Turkmaniston" },
        { value: "Tojikiston" },
        { value: "Qizg'iziston" },
    ],
    //viloyat
    optionsProvince: [
        { value: "Toshken shahri" },
        { value: "Sirdaryo viloyati" },
        { value: "Toshkent viloyati" },
        { value: "Farg'ona viloyati" },
        { value: "Xorazim viloyati" },
        { value: "Qoraqalpog'iston respublikasi" },
        { value: "Andijon viloyati" },
        { value: "Buxoro viloyati" },
        { value: "Jizzax viloyati" },
    ],
    //ta'lim turi
    optionsEducationType: [
        { value: "Bakalavr" },
        { value: "Magistr" },
    ],
    //tuman
    optionsDistrict: [
        { value: "Angren shahri" },
        { value: "Bekobod shahri" },
        { value: "Bo'ka tumani" },
        { value: "Parkent tumani" },
    ],
    //joriy yashash joyi
    optionsAccommodation: [
        { value: "Talabalar turar joyida" },
        { value: "O'z uyida" },
        { value: "Qarindoshining uyida" },
        { value: "Tanishining uyida" },
        { value: "Ijaradagi uyda" },
    ],
    // birga yashaydiganlar toifasi
    optionsStudentRoommateType: [
        { value: "Oila a'zolari" },
        { value: "Kursdoshlari" },
        { value: "Yaqin qarndoshlari" },
        { value: "Ijara uy egasi" },
    ],
    //Yashasjh joyi statusi
    optionsLivingPlaceStatus: [
        { value: "Yashil hudud" },
        { value: "Sariq hudud" },
        { value: "Qizil hudud" },
    ],
    optionsNationality3: [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
    ],
    //Xodim
    optionsEmployee: [
        { value: "ABDIMUROTOV OYBEK URALOVICH" },
        { value: "ABDRASHITOVA YELENA VLADIMIROVNA" },
        { value: "ABDULAXATOV AKRAMJON RUZMAMATOVICH" },
        { value: "ABDULLAYEV HABIB SHUKURULLAYEVICH" },
        { value: "SAMAROVA SHOXISTA RABIDJANOVNA" },
        { value: "SAYFULLAYEVA ISMIGUL QODIR QIZI" },
        { value: "RAXMANOV SAPARBOY ZARIPOVICH" },
    ],
    //xodim lavozimi
    employeePosition: [
        { value: "Stajer o'qituvchi" },
        { value: "Assistent" },
        { value: "Katta o'qituvchi" },
        { value: "Dotsent" },
        { value: "Professor" },
        { value: "Kafedra mudiri" },
    ],
    //o'qish joyi
    trainingPlace: [
        { value: "Boshqa" },
        { value: "BIMM markazi" },
        { value: "KQT va MO markazi" },
        { value: "Xorijiy muassasa" },
    ],
    //fakultet
    optionsFaculty: [
        { value: "Matematika va informatka" },
        { value: "Pedagogika" },
        { value: "Informatika o'qitish metodikasi" },
        { value: "Matematika o'qitish metodikasi" },
        { value: "Tarix va tillar" },
    ],
    //kafedra
    optionsDivisions: [
        { value: "Informatika va axborot texnologiyalari" },
        { value: "Informatika o'qitish metodikasi" },
        { value: "Matematika o'qitish metodikasi va geometrya" },
        { value: "Matematik analiz" },
    ],
    //o'quv yili
    optionsYear: [
        { value: "2022" },
        { value: "2021" },
        { value: "2020" },
        { value: "2019" },
    ],
    // ta'lim shakli
    optionsEducationForm: [
        { value: "Kunduzgi" },
        { value: "Qo'shma" },
        { value: "Maxsus sirtqi" },
        { value: "Sirtqi" },
        { value: "Kechki" },
        { value: "Masofaviy" },
        { value: "Ikkinchi oliy (s)" },
        { value: "Ikkinchi oliy (k)" },
    ],
    // guruh
    optionsGroup: [
        { value: "IO'M_19-2" },
        { value: "MO'M_20-2" },
        { value: "GO'M_21-1" },
        { value: "KO'M_21-3 (r)" },
    ],
    //o'quv reja
    optionsTrainingPlan: [
        { value: "IO'M_2021-2022" },
        { value: "MO'M_2021-2022" },
        { value: "GO'M_2021-2022" },
        { value: "FO'M_2021-2022" },
        { value: "JIM_2021-2022" },
        { value: "KO'M_2021-2022" },
    ],
    //semestr
    optionsSemestr: [
        { value: "1-semestr" },
        { value: "2-semestr" },
        { value: "3-semestr" },
        { value: "4-semestr" },
    ],
    //ta'lim tili
    optionsEducationLang: [
        { value: "O'zbek" },
        { value: "Rus" },
        { value: "Tojik" },
        { value: "Qozoq" },
        { value: "Turk" },
    ]

}

//jadval malaka oshirish
const allTables = {
    tableStudents: [
        {
            id: 1, //id
            secondName: "SHARIPOVA MAFTUNA RUZIMUROTOVNA", //talaba
            sex: "Ayol", //jinsi
            studentId: "354201103862", //id raqam
            passportNumber: "AC2768840", //pasport raqami
            pin: "12345678901234", //jshshir
            specialtyId: 543543, //yo'nalish kodi
            academicYear: "2021-2022", //o'quv yili
            yearOfEnter: "2022", //o'qishga kirgan yili
            groupName: "JIM_20/2", //akademik guruh
            semestr: "2-semestr", //semestr
            course: "1-kurs", //kursi
            studentStatus: "O'qimoqda", //ilmiy unvon
            educationType: "Bakalavr", //o'qish joyi
            formOfEducaton: "Kunduzgi", //ta'lim shakli
            paymentForm: "To'lov shartnoma", //to'lov shakli
            province: "Toshkent viloyati", //yashsh joyi viloyat
            district: "Bo'ka tumani", //yashash joyi tuman
            placeOfResidence: "Talabalar turar joyida", //joriy yashash manzili
            telNumber: "+998934215645", //telifon raqami
            updatedAt: "15.12.2022 10:12:34", //o'zgartirilgan
            createdAt: "11.02.2021 10:12:24", //yaratilgan
            faculty: "Aniq fanlar"
        },
        {
            id: 2, //id
            secondName: "NORIMBOYEV XAYOT XAYRULLA O‘G‘LI", //talaba
            sex: "Erkak", //jinsi
            studentId: "354201103862", //id raqam
            passportNumber: "AC2768840", //pasport raqami
            pin: "12345678901234", //jshshir
            specialtyId: 543543, //yo'nalish kodi
            academicYear: "2021-2022", //o'quv yili
            yearOfEnter: "2022", //o'qishga kirgan yili
            groupName: "JIM_20/2", //akademik guruh
            semestr: "2-semestr", //semestr
            course: "1-kurs", //kursi
            studentStatus: "O'qimoqda", //ilmiy unvon
            educationType: "Bakalavr", //o'qish joyi
            formOfEducaton: "Kunduzgi", //ta'lim shakli
            paymentForm: "To'lov shartnoma", //to'lov shakli
            province: "Toshkent viloyati", //yashsh joyi viloyat
            district: "Bo'ka tumani", //yashash joyi tuman
            placeOfResidence: "Talabalar turar joyida", //joriy yashash manzili
            telNumber: "+998934215645", //telifon raqami
            updatedAt: "15.12.2022 10:12:34", //o'zgartirilgan
            createdAt: "11.02.2021 10:12:24", //yaratilgan
            faculty: "Aniq fanlar"
        },
        {
            id: 3, //id
            secondName: "MO‘MINOV YAXYOBEK SOYIBJON O‘G‘LI", //talaba
            sex: "Erkak", //jinsi
            studentId: "354201103862", //id raqam
            passportNumber: "AC2768840", //pasport raqami
            pin: "12345678901234", //jshshir
            specialtyId: 543543, //yo'nalish kodi
            academicYear: "2021-2022", //o'quv yili
            yearOfEnter: "2022", //o'qishga kirgan yili
            groupName: "JIM_20/2", //akademik guruh
            semestr: "2-semestr", //semestr
            course: "1-kurs", //kursi
            studentStatus: "O'qimoqda", //ilmiy unvon
            educationType: "Bakalavr", //o'qish joyi
            formOfEducaton: "Kunduzgi", //ta'lim shakli
            paymentForm: "To'lov shartnoma", //to'lov shakli
            province: "Toshkent viloyati", //yashsh joyi viloyat
            district: "Bo'ka tumani", //yashash joyi tuman
            placeOfResidence: "Talabalar turar joyida", //joriy yashash manzili
            telNumber: "+998934215645", //telifon raqami
            updatedAt: "15.12.2022 10:12:34", //o'zgartirilgan
            createdAt: "11.02.2021 10:12:24", //yaratilgan
            faculty: "Aniq fanlar"
        },
        {
            id: 4, //id
            secondName: "XAYDARALIYEVA AYSULU ADIL QIZI", //talaba
            sex: "Ayol", //jinsi
            studentId: "354201103862", //id raqam
            passportNumber: "AC2768840", //pasport raqami
            pin: "12345678901234", //jshshir
            specialtyId: 543543, //yo'nalish kodi
            academicYear: "2021-2022", //o'quv yili
            yearOfEnter: "2022", //o'qishga kirgan yili
            groupName: "JIM_20/2", //akademik guruh
            semestr: "2-semestr", //semestr
            course: "1-kurs", //kursi
            studentStatus: "O'qimoqda", //ilmiy unvon
            educationType: "Bakalavr", //o'qish joyi
            formOfEducaton: "Kunduzgi", //ta'lim shakli
            paymentForm: "To'lov shartnoma", //to'lov shakli
            province: "Toshkent viloyati", //yashsh joyi viloyat
            district: "Bo'ka tumani", //yashash joyi tuman
            placeOfResidence: "Talabalar turar joyida", //joriy yashash manzili
            telNumber: "+998934215645", //telifon raqami
            updatedAt: "15.12.2022 10:12:34", //o'zgartirilgan
            createdAt: "11.02.2021 10:12:24", //yaratilgan
            faculty: "Aniq fanlar"
        },
    ],
    tebleEmployees: [
        {
            id: 1, //id
            employee: "ABDALOVA SAYYORA KOMILOVNA", //xodim
            department: "Tasviriy san'at", //kafedra
            employeePosition: "Katta o'qituvchi", //lavozim
            trainingPlase: "BIMM markazi", //o'qish joyi
            beginDate: "12.02.2021", //o'qish muddai boshlanish sanasi
            endDate: "12.02.2022", //o'qish muddati tugash sanasi
            trainingYear: "1", //yil
            duration: "24 oy", //muddati
        },
        {
            id: 1, //id
            employee: "YUSUPOVA MUXABBAT ANATOLEVNA", //xodim
            department: "Ingliz tili", //kafedra
            employeePosition: "Stajer-o‘qituvchi", //lavozim
            trainingPlase: "", //o'qish joyi
            beginDate: "-", //o'qish muddai boshlanish sanasi
            endDate: "-", //o'qish muddati tugash sanasi
            trainingYear: "", //yil
            duration: "24 oy", //muddati
        }
    ],
    tableGroups: [
        {
            id: 1,
            name: "BIO-20/1", //nomi
            faculty: "Aniq fanlar", //fakultet
            specialty: "5110400", //mutaxassislik
            educationType: "Bakalavr", //ta'lim turi
            educationForm: "Kunduzgi", //ta'lim shakli
            educationLang: "O'zbek", //ta'lim tili
        },
        {
            id: 2,
            name: "MO'M-20/1", //nomi
            faculty: "Aniq fanlar", //fakultet
            specialty: "5110400", //mutaxassislik
            educationType: "Bakalavr", //ta'lim turi
            educationForm: "Kunduzgi", //ta'lim shakli
            educationLang: "O'zbek", //ta'lim tili
        },
        {
            id: 3,
            name: "MI-20/1", //nomi
            faculty: "Aniq fanlar", //fakultet
            specialty: "5110400", //mutaxassislik
            educationType: "Bakalavr", //ta'lim turi
            educationForm: "Kunduzgi", //ta'lim shakli
            educationLang: "O'zbek", //ta'lim tili
        },
        {
            id: 4,
            name: "BIO-20/1", //nomi
            faculty: "Aniq fanlar", //fakultet
            specialty: "5110400", //mutaxassislik
            educationType: "Bakalavr", //ta'lim turi
            educationForm: "Kunduzgi", //ta'lim shakli
            educationLang: "O'zbek", //ta'lim tili
        },
    ]
}
export {
    allDate,
    allTables,
    advecedTraining,
    filtersTable,
    tableEmployee,
}
