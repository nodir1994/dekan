// import { turn } from "core-js/core/array"

// import { faL } from "@fortawesome/free-solid-svg-icons"

// import { ref } from "vue";
const allDate = {
  //mutaxassislik
  optionsSpecial: [
    { value: "Matematika va informatika" },
    { value: "Matematika o‘qitish metodikasi" },
    { value: "Fizika va astronomiya o‘qitish metodikasi" },
    { value: "Geografiya va iqtisodiy bilim asoslari" },
    { value: "Ona tili va adabiyoti (Qozoq tili va adabiyoti)" },
    { value: "Milliy g‘oya, ma’naviyat asoslari va huquq ta’limi" },
  ],
  //mutaxassislik
  optionsSpecialId: [
    { value: "10112343-Matematika va informatika" },
    { value: "10112343-Matematika o‘qitish metodikasi" },
    { value: "10112343-Fizika va astronomiya o‘qitish metodikasi" },
    { value: "10112343-Geografiya va iqtisodiy bilim asoslari" },
    { value: "10112343-Ona tili va adabiyoti (Qozoq tili va adabiyoti)" },
    { value: "10112343-Milliy g‘oya, ma’naviyat asoslari va huquq ta’limi" },
  ],
  optionsWeeksDete: [
    { value: "05.09.2022 - 10.09.2022" },
    { value: "12.09.2022 - 17.09.2022" },
    { value: "19.09.2022 - 24.09.2022" },
    { value: "26.09.2022 - 01.10.2022" },
    { value: "03.10.2022 - 08.10.2022" },
    { value: "10.10.2022 - 15.10.2022" },
  ],
  optinsContractPriceCalculation: [
    { value: "Summa bo'yicha" },
    { value: "Koyeffitsient bo'yicha" },
  ],
  //-------------ILMIY DARAJASI----------------
  optionsAcademicDegree: [
    { value: "Darajasiz" },
    { value: "Fan nomzodi, PhD" },
    { value: "Fan doktori, DSc" },
  ],
  //til
  optionsLanguage: [
    { value: "O'zbekcha" },
    { value: "Ruscha" },
    { value: "Ingilizcha" },
  ],
  //sport turlari
  optionsSportType: [
    { value: "Volyebol" },
    { value: "Fudbol" },
    { value: "Tenns" },
    { value: "Kurash" },
  ],
  //auditoriya nomi
  optionsAuditoriumANme: [
    { value: "100(BB)" },
    { value: "102(BB)" },
    { value: "120(IB)" },
    { value: "123(IB)" },
    { value: "120(L)" },
  ],
  //auditoriya nomi
  optionsLessonPair: [
    { value: "1. 09:00-10:20" },
    { value: "2. 10:30-11:50" },
    { value: "3. 12:00-13:20" },
  ],
  //to'lov shakli
  optionsPaymentForm: [
    { value: "Davlat granti" },
    { value: "To'lov-shartnoma" },
  ],
  //tadqiqotchi toifasi
  optionsDoctorateCategory: [
    { value: "PhD doktarant" },
    { value: "PhD mustaqil izlanuvchi" },
    { value: "DSc doktarant" },
    { value: "DSc mustaqil izlanuvchi" },
    { value: "Stajyor tadqiqotchi" },
  ],
  //loyiha turi
  optionsProjectType: [
    { value: "Boshqa" },
    { value: "Fundamental (yosh olimlar)" },
    { value: "Amaliy (yosh olimlar)" },
    { value: "Xo'jalik shartnomasi" },
    { value: "Fundamental (umumiy)" },
    { value: "Amaliy (umumiy)" },
    { value: "Innavatsion loyiha" },
  ],
  //--------------ILMIY UNVONI-----------------
  optionsAcademicTitle: [
    { value: "Unvonsiz" },
    { value: "Dotsent" },
    { value: "Katta ilmiy xodim" },
    { value: "Professor" },
  ],
  optionsWorkType: [{ value: "Kafedra" }, { value: "Bo'lim" }],
  //loyiha toifasi
  optionsProjectCategory: [
    { value: "Boshqa" },
    { value: "Hududiy" },
    { value: "Xorijiy" },
  ],
  //tizim rollari
  optionsRoles: [
    { value: "Super adminstrator" },
    { value: "Bugalteriya" },
    { value: "Kutubxona" },
    { value: "Yotoqxona" },
    { value: "Dekan" },
    { value: "...." },
  ],
  //valyuta
  optionsCurrency: [
    { value: "Boshqa" },
    { value: "So'm" },
    { value: "AQSH dollari" },
    { value: "Yevro" },
  ],
  //qabul buyrug'i
  optionsAdmissionOrder: [
    { value: "2022-07-18 / №03-400 o'qishni ko'chirish" },
    { value: "2021-10-18 / №11-440 Talabalar sasiga qabul qilish" },
    { value: "2022-07-18 / №05-010 stipendiya" },
  ],
  //xabar turi
  optionsMessageType: [
    { value: "Jo'natilgan" },
    { value: "Qoralama" },
    { value: "Korzina" },
    { value: "Kiruvchi xabarlar" },
  ],
  //statistika turi
  optionsStatisticalType: [
    { value: "O'qituvchi bo'yicha" },
    { value: "Guruh bo'yicha" },
    { value: "Fakultet bo'yicha" },
    { value: "Juftiliklar bo'yicha" },
  ],
  //fuqarolik
  optionsCitizenship: [
    { value: "O'zbekiston Respublikasi fuqarosi" },
    { value: "Xorijiy davlat fuqarosi" },
    { value: "Fuqaroligi yo'q shaxslar" },
  ],
  optionsOtm: [
    { value: "OTm nomi ..." },
    { value: "OTm nomi ..." },
    { value: "OTm nomi ..." },
    { value: "OTm nomi ..." },
  ],
  //otm turi
  optionsHeiType: [
    { value: "Davlat" },
    { value: "Xorijiy" },
    { value: "Xususiy" },
    { value: "Qo'shma" },
    { value: "Boshqa" },
  ],
  //otm shakli
  optionsHeiShape: [
    { value: "Institut" },
    { value: "Universitet" },
    { value: "Akademiya" },
    { value: "Fileal" },
    { value: "Boshqa" },
  ],
  //jinsi
  optionsGender: [{ value: "Erkak" }, { value: "Ayol" }],
  //topshiriq turi
  optionsTasksType: [{ value: "Topshiriq" }, { value: "Test" }],
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
  //ixtisoslik turi
  optionsSpecialty: [
    { value: "04.12.09-Konchilik mashinalari" },
    { value: "06.02.10-Suyuqlik va gaz mexanikasi" },
    { value: "va boshqa turlar" },
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
  optionsEducationType: [{ value: "Bakalavr" }, { value: "Magistr" }],
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
  //qaydnomalar
  optionsRatingCounts: [
    { value: "1-qaydnoma" },
    { value: "2-qaydnoma" },
    { value: "3-qaydnoma" },
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
  optionsSubjectGroup: [
    { value: "Fizika" },
    { value: "Kimyo" },
    { value: "Bologiya" },
    { value: "Matematika" },
    { value: "DAK" },
    { value: "Bitruv ishi" },
    { value: "Informatika" },
  ],
  //foydalanuvhcilar
  optionsRoleUser: [{ value: "Adminstrator" }, { value: "Student" }],
  //rol status
  optionsRoleStatus: [
    { value: "Muvaffaqiyatli" },
    { value: "Muvaffaqiyatsiz" },
  ],
  //lavozim
  optionsPosition: [
    { value: "Tyutor" },
    { value: "Dispetcher" },
    { value: "Dekan muovini" },
    { value: "Kabinet mudiri" },
    { value: "Uslubchi" },
  ],
  //kafedra / bo'lim
  optionsDepartment: [
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Buxgalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "O'quv uslubiy boshqarma" },
  ],
  optionsFacultySorts: [
    { value: "Maxalliy" },
    { value: "Qo'shma" },
    { value: "Bo'lim" },
    { value: "Boshqa" },
  ],
  //xodim turi
  optionsEmployeeType: [
    { value: "Boshqa" },
    { value: "Adminstariv-boshqaruv xodimi" },
    { value: "O'quv-yordamchi va texnik xodim" },
    { value: "Xizmat ko'rsatuvchi xodim" },
  ],
  //mexnat shakli
  optionsCocktailForm: [
    { value: "Asosiy ish joyi" },
    { value: "O'rindoshlik (tashqi)" },
    { value: "Soatbay" },
    { value: "O'rindoshlik (ichki-qo'shimcha)" },
    { value: "O'rindoshlik (ichki-asosiy)" },
  ],
  //stavka
  optionsRate: [
    { value: "1,00 stavka" },
    { value: "0,75 stavka" },
    { value: "0,50 stavka" },
    { value: "0,25 stavka" },
  ],
  //bo'lim filter
  optionsSection: [
    { value: "Axborot resurs markazi" },
    { value: "Boshlang'ich ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Bugalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "Pedagogika" },
  ],
  //o'qituvchi
  optionsTeacher: [
    { value: "ABDULLAYEV ORTIQ MEHRIDDINOVICH" },
    { value: "ABDUQODIROV BOBURJON ABDUXALILOVICH" },
    { value: "ABDURAHIMOV ASADBEK ABDUHALIM O‘G‘LI" },
    { value: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI" },
    { value: "ABDURAXIMOV NURXO‘JA ABDURASIL O‘G‘LI" },
  ],
  //lavozim
  optionsPositionTecher: [
    { value: "Katta o'qituvchi" },
    { value: "Dotsent" },
    { value: "Professor" },
    { value: "Kafedra mudiri" },
    { value: "Stajwer-o'qituvchi" },
    { value: "Assistent" },
  ],
  //o'qituvchi turi
  optionsTeacherType: [
    { value: "Boshqa" },
    { value: "Professior-o'qituvchi xodim" },
    { value: "O'qituvchi" },
    { value: "Mutaxasis" },
  ],
  //tanlov turi
  optionsChoseCompetition: [
    { value: "Respublika darajada" },
    { value: "Xalqaro darajada" },
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
  //ijrochi toifasi
  optionsPerformerCategory: [
    { value: "Loyiha rahbari" },
    { value: "Loyiha ijrochisi" },
  ],
  //o'qish joyi
  trainingPlace: [
    { value: "Boshqa" },
    { value: "BIMM markazi" },
    { value: "KQT va MO markazi" },
    { value: "Xorijiy muassasa" },
  ],
  //mashg'ulot turi
  trainingType: [
    { value: "Maruza" },
    { value: "Seminar" },
    { value: "Amaliy" },
    { value: "Labarato'riya" },
  ],
  optionsSubjectSemester: [
    {
      label: "1-semester",
      options: [{ value: "Informatika" }],
    },
  ],
  //fakultet
  optionsFaculty: [
    { value: "Matematika va informatka" },
    { value: "Pedagogika" },
    { value: "Informatika o'qitish metodikasi" },
    { value: "Matematika o'qitish metodikasi" },
    { value: "Tarix va tillar" },
  ],
  //bo'linma turi
  optionsDivisionType: [
    { value: "Boshqa" },
    { value: "Bo'lim" },
    { value: "Boshqarma" },
    { value: "Markaz" },
    { value: "Rektorat" },
  ],
  //kafedra
  optionsDivisions: [
    { value: "Informatika va axborot texnologiyalari" },
    { value: "Informatika o'qitish metodikasi" },
    { value: "Matematika o'qitish metodikasi va geometrya" },
    { value: "Matematik analiz" },
  ],
  // qaydnoma turi
  optionsRatingGrade: [
    { value: "Fan qaydnomasi (Asosiy)" },
    { value: "Fan qaydnomasi (Qo'shmcha)" },
    { value: "Kurs ishi qaydnomasi" },
    { value: "Davlat imtihon qaydnomasi" },
    { value: "Malakaviy amaliyot qaytnomasi" },
    { value: "Bitruv ishi qaydnomasi qaytnomasi" },
  ],
  //yakuniy baxolash turi
  optionsExamFinish: [{ value: "Imtihon" }, { value: "Sinov" }],
  //yil
  optionsYear: [
    { value: "2022" },
    { value: "2021" },
    { value: "2020" },
    { value: "2019" },
  ],
  //o'quv yili
  optionsEducationYear: [
    { value: "2025-2026" },
    { value: "2024-2025" },
    { value: "2023-2024" },
    { value: "2022-2023" },
    { value: "2021-2022" },
    { value: "2020-2021" },
    { value: "2019-2020" },
    { value: "2018-2019" },
  ],
  // daak ro'yhati
  optionsDak: [
    { value: "DAK-12-IO'M" },
    { value: "DAK-12-MI" },
    { value: "DAK-12-KO'M" },
    { value: "DAK-12-MO'M" },
    { value: "DAK-12-FA" },
  ],
  //akkaunt xolati
  optionsEmployeeSatatus: [
    { value: "Ochiq" },
    { value: "Yopiq" },
    { value: "Bloklangan" },
  ],
  //o'quv yili
  optionsEducationYears: [
    { value: "2025(2025-2026)" },
    { value: "2024(2024-2025)" },
    { value: "2023(2023-2024)" },
    { value: "2022(2022-2023)" },
    { value: "2021(2021-2022)" },
    { value: "2020(2020-2021)" },
    { value: "2019(2019-2020)" },
    { value: "2018(2018-2019)" },
  ],
  //buyruq turi
  optionsDecreeType: [
    { value: "O'qishdan chetlashtirish" },
    { value: "Akademik ta'til berish" },
    { value: "Kursga o'tkazish" },
    { value: "O'qishni ko'chirish" },
    { value: "Talabaning shaxsiy grafigi" },
    { value: "Kursdan qoldirish" },
    { value: "Kursga o'tkazish" },
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
  //ixtitslik turi
  optionsSpecialtyType: [
    { value: "Boshqa" },
    { value: "Maxalliy" },
    { value: "Qo'shma" },
    { value: "Bo'lim" },
  ],
  // guruh
  optionsGroup: [
    { value: "IO'M_19-2" },
    { value: "MO'M_20-2" },
    { value: "GO'M_21-1" },
    { value: "KO'M_21-3 (r)" },
  ],
  // topshiriq statusi
  optionsTaskStstus: [
    { value: "Topshirildi" },
    { value: "Baholandi" },
    { value: "Berildi" },
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
  ],
  //status
  optionsStatus: [{ value: "Faol" }, { value: "Nofaol" }],
  //jadval guruhlash
  optionsGroupTable: [{ value: "Fanlar" }, { value: "O'quv reja" }],
  //fan turi
  optionsGroupsTable: [{ value: "Majburiy" }, { value: "Tanlov fani" }],
  //kurs
  optionsLavel: [
    { value: "1-kurs" },
    { value: "2-kurs" },
    { value: "3-kurs" },
    { value: "4-kurs" },
    { value: "5-kurs" },
  ],
  //semestr turi
  optionsSemestrType: [
    { value: "Kuzgi semestr" },
    { value: "Bahorgi semestr" },
  ],
  //kvalifikatsiyalar
  optionsQualification: [
    { value: "Biologiya fani o'qituvchisi" },
    { value: "Tasviriy sanʼat va muhandislik grafikasi bo‘yicha o‘qituvchi" },
    { value: "Tarix fani o'qituvchi" },
    { value: "Fizika fani o'qituvchisi" },
    { value: "Texnologik ta'lim o'qituvchisi" },
    { value: "	Ingliz tili va adabiyoti o'qituvchisi" },
  ],
  //baxolash tizimi
  optionsEvaluationSystem: [
    { value: "5 baxolik baholash tizimi" },
    { value: "Kredit baholash tizimi" },
    { value: "Reyting baholash tizimi" },
  ],
  //chora turi
  optionsAttendanceSetting: [
    { value: "Ogohlantirish" },
    { value: "Hayfsan" },
    { value: "Chetlashtirish" },
  ],
  //xaftalik
  optionsWeekType: [
    { value: "Kredit tizimiga kirish" },
    { value: "Nazariy ta’lim" },
    { value: "Ta’til" },
    { value: "Attestatsiya" },
    { value: "Malakaviy amaliyot" },
    { value: "Ta’til" },
  ],
  //baxolash tizimi
  markingSystem: [
    { value: "5 baholik baholash tizimi" },
    { value: "Reyting baholash tizimi" },
    { value: "Kredit baholash tizimi" },
  ],
  //almashinuv turi
  optionsExchangeType: [{ value: "Ketgan talaba" }, { value: "Klegan talaba" }],
  //imtihon turi
  optionsExamType: [
    { value: "Yakuniy nazorat" },
    { value: "Oraliq nazorat" },
    { value: "Umumiy" },
  ],
  //faol
  optionsActive: [{ value: "Yo'q" }, { value: "Ha" }],
  //tasodifiy
  optionsRandom: [{ value: "Ha" }, { value: "Yo'q" }],
  //fanlar
  optionsSubject: [
    { value: "Biologiya" },
    { value: "Matematika" },
    { value: "Fizika" },
    { value: "Informatika" },
    { value: "Matematik analiz" },
    { value: "Informatika o'qitish metodikasi" },
    { value: "Kompyuter grafikasi" },
    { value: "Informatikani o'qitish texnologiyalari va loyihalashtirish" },
    { value: "Axborot tizimlari" },
    { value: "Umumiy psixologiya" },
  ],
  //bino
  optionsBuilding: [
    { value: "2-bino" },
    { value: "1-bino" },
    { value: "Bosh bino" },
    { value: "Qo'shimcha bino" },
    { value: "Kollej" },
  ],
  //auditoriya turi
  optionsAuditoriumType: [
    { value: "Boshqa" },
    { value: "Maruza" },
    { value: "Labarato'riya" },
    { value: "Amaliyot" },
    { value: "Seminar" },
  ],
  //nashr turi
  optionsPublicationType: [
    { value: "Uslubiy nashrlar" },
    { value: "Ilmiy nashrlar" },
    { value: "Intellektual mulk" },
  ],
  optionsPublicationCategory: [
    { value: "Boshqa" },
    { value: "Darslik" },
    { value: "O'quv qo'llanma" },
    { value: "Uslubiy qo'llanma" },
    { value: "Uslubiy ko'rsatma" },
  ],
  optionsScientificPlatform: [
    { value: "Boshqa" },
    { value: "Research Gate" },
    { value: "Google Scholar" },
    { value: "Scopus" },
  ],
  //ijrochi turi
  optionsPerformerType: [
    { value: "Boshqa" },
    { value: "O'qituvchi" },
    { value: "Tadqiqitchi" },
    { value: "Talaba" },
  ],
  //student staus
  optionsStudentStatus: [
    { value: "O'qimoqda" },
    { value: "Bitirgan" },
    { value: "Akademik ta'til" },
    { value: "Chetlashtirilgan" },
  ],
  //yutuq toyifasi
  optionsAwardForm: [
    { value: "Oliy stipendiyalar" },
    { value: "Mukofotlar" },
    { value: "Tanlov va musobaqalar" },
    { value: "Boshaqa" },
  ],
  optionsProperty: [
    { value: "Boshqa" },
    { value: "Ixtiro" },
    { value: "Foidali model" },
    { value: "Sanoat namunasi" },
    { value: "Seleksiya yutuqlari" },
    { value: "Tovar belgisi" },
    { value: "Firma nomlari" },
    { value: "Ehem dasturi va malumotlar bazasi" },
  ],
  optionsScientifical: [
    { value: "Monografiya" },
    { value: "Maqola (Maxalliy jurnal)" },
    { value: "Maqola (Xorijiy jurnal)" },
    { value: "Maqola (Konferensiya)" },
    { value: "Tezis (Xalqaro)" },
    { value: "Tezis (Respublika)" },
  ],
  optionsCriteriaType: [
    { value: "h-index" },
    { value: "Iqtiboslar ulushi" },
    { value: "Google Scholar" },
    { value: "Scopus" },
  ],
  optionsWeeks: [
    { value: "12-sentiyabr - 18-sentiyabr" },
    { value: "20-sentiyabr - 26-sentiyabr" },
    { value: "13-sentiyabr - 19-sentiyabr" },
    { value: "14-sentiyabr - 20-sentiyabr" },
    { value: "15-sentiyabr - 21-sentiyabr" },
    { value: "16-sentiyabr - 22-sentiyabr" },
  ],
  // DAK turi
  optionsDAKType: [{ value: "Imtihon" }, { value: "Himoya" }],
  //yutuq turi
  optionsAwardType: [
    { value: "Navoiy stipendiyasi" },
    { value: "Xalqaro musobaqa g‘olibi" },
    { value: "Fan olimpidalari g‘olibi" },
    { value: "Xalqaro tanlov g‘olibi" },
  ],
  optionsLessons: [
    { value: "Flash dasturida oddiy harakatli animatsiyalar yaratish" },
    { value: "Flash dasturida kadrlar va qatlamlar bilan ishlash" },
    { value: "Flash dasturida ob’yektlarni chizish" },
    { value: "Flash dasturi asosiy oynasi elementlari bilan ishlash" },
    { value: "Flash dasturi murakkab jarayonli animatsiyalar yaratish" },
  ],
};

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
      subject: "Matematika o'qitish metodikasi", // qarzdorligi bor fan
      countSubject: 11, //fanlar soni
      faculty: "Matematika va informatika", // fakultet
      credit: "0",
      gpa: "-",
      debt: "0",
      dak: "DAK-1 Bakalavr",
      orderNumber: "12313",
      date: "15.04.2022",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      specialty: "Matematika o'qitish metodikasi",
      statusSheetCheck: true,
      status: 1,
      awardType: "Xalqaro musobaqa g‘olibi",
      curriculm: "TAR(kunduzgi)_2020-2021",
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
      subject: "Axborot tizimlari", // qarzdorligi bor fan
      countSubject: 11, //fanlar soni
      faculty: "Matematika va informatika", // fakultet
      credit: "0",
      gpa: "-",
      debt: "0",
      dak: "DAK-1 Bakalavr",
      orderNumber: "12313",
      date: "15.04.2022",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      specialty: "Matematika o'qitish metodikasi",
      statusSheetCheck: true,
      status: 1,
      awardType: "Xalqaro musobaqa g‘olibi",
      curriculm: "TAR(kunduzgi)_2020-2021",
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
      subject: "Informatikani o'qitish texnologiyalari", // qarzdorligiz bor fan
      countSubject: 11, //fanlar soni
      faculty: "Matematika va informatika", // fakultet
      credit: "0",
      gpa: "-",
      debt: "0",
      dak: "DAK-1 Bakalavr",
      orderNumber: "12313",
      date: "15.04.2022",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      specialty: "Matematika o'qitish metodikasi",
      statusSheetCheck: false,
      status: 0,
      awardType: "Xalqaro musobaqa g‘olibi",
      curriculm: "TAR(kunduzgi)_2020-2021",
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
      subject: "Dasturiy taminot", // qarzdorligi bor fan
      countSubject: 11, //fanlar soni
      faculty: "Matematika va informatika", // fakultet
      credit: "0",
      gpa: "-",
      debt: "0",
      dak: "DAK-1 Bakalavr",
      orderNumber: "12313",
      date: "15.04.2022",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      specialty: "Matematika o'qitish metodikasi",
      statusSheetCheck: true,
      status: 1,
      awardType: "Xalqaro musobaqa g‘olibi",
      curriculm: "TAR(kunduzgi)_2020-2021",
    },
  ],
  //kafedra jadval
  tableDepartment: [
    {
      id: 1,
      kod: "354-001",
      name: "Tasviriy san'at",
      type: "San'atshunoslik",
    },
    {
      id: 2,
      kod: "354-002",
      name: "Fakultetlar'aro ijtimoiy fanlar",
      type: "Gumanitar fanlar",
    },
    {
      id: 3,
      kod: "354-003",
      name: "Milliy g'oya, ma'naviyat asoslari va huquq ta'limi",
      type: "Gumanitar fanlar",
    },
    {
      id: 4,
      kod: "354-004",
      name: "Matematika o'qitish metodikasi va geometriya",
      type: "Matematika va informatika",
    },
    {
      id: 5,
      kod: "354-005",
      name: "Informatika va axborot texnologiyalari",
      type: "Matematika va informatika",
    },
    {
      id: 6,
      kod: "354-006",
      name: "Fizika va astronomiya o'qitish metodikasi",
      type: "Fizika va kimyo",
    },
    {
      id: 7,
      kod: "354-007",
      name: "Genetika va evolutsion biologiya",
      type: "Tabiiy fanlar",
    },
    {
      id: 8,
      kod: "354-008",
      name: "Fakultetlar'aro jismoniy tarbiya",
      type: "Sport va chaqiriqqacha harbiy ta'lim",
    },
    {
      id: 9,
      kod: "354-009",
      name: "Umumkasbiy va ixtisoslik fanlari",
      type: "Turizm",
    },
  ],
  tableDivision: [
    { id: 1, kod: "354-001", name: "Rektor", type: "Rektor" },
    {
      id: 2,
      kod: "354-002",
      name: "O'quv uslubiy boshqarma",
      type: "Boshqarma",
    },
    { id: 3, kod: "354-003", name: "Kadrlar bo'limi", type: "Bo'lim" },
    { id: 4, kod: "354-004", name: "Buglateriya", type: "Bo'lim" },
    {
      id: 5,
      kod: "354-005",
      name: "Ilmiy-tadqiqot, inovatsiyalar va ilmiy-padagogik kadrlar tayyorlash bo'limi",
      type: "Bo'lim",
    },
    {
      id: 6,
      kod: "354-006",
      name: "Buyurtmalar portfelini shakllantirish, bitiruvchilarni ishga taqsimlash va monitoring bo‘limi",
      type: "Bo'lim",
    },
    { id: 7, kod: "354-007", name: "Sirtqi (maxsus sirtqi)", type: "Bo'lim" },
    { id: 8, kod: "354-008", name: "Rektor", type: "Rektorat" },
    { id: 9, kod: "354-009", name: "Rektorat", type: "Rektorat" },
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
      time: "12:02:52",
      message:
        "`BOT(S)-19/1` guruhning `Matematika o'qitish metodikasi ` fandan o'zlashtirishi muvaffaqiyatli o'zgartirildi",
      createAt: "12.09.2021 12:12:00",
      login: "abdalova_sayyora",
      role: "Kafedra mudiri, O'qituvchi",
      email: "abdalovasayyora12@gmail.com",
      status: "Ochiq",
    },
    {
      id: 1, //id
      employee: "YUSUPOVA MUXABBAT ANATOLEVNA", //xodim
      department: "Ingliz tili", //kafedra
      employeePosition: "Stajer-o‘qituvchi", //lavozim
      trainingPlase: "", //o'qish joyi
      beginDate: "12.02.2021", //o'qish muddai boshlanish sanasi
      endDate: "-", //o'qish muddati tugash sanasi
      trainingYear: "", //yil
      duration: "24 oy", //muddati
      time: "12:02:52",
      message: "7 nafar talabaning GPA bali muvaffaqiyatli hisoblandi",
      createAt: "12.09.2021 12:12:00",
      login: "abdalova_sayyora",
      role: "O'qituvchi",
      email: "abdalovasayyora12@gmail.com",
      status: "Ochiq",
    },
  ],
  tableBackup: [
    {
      id: 1,
      name: "postg_hemis_01-11-2022_00_00.bak.tar",
      size: "2.0345",
      time: "12.04.2022 00:12:12",
    },
    {
      id: 2,
      name: "postg_hemis_01-11-2022_00_00.bak.tar",
      size: "2.0345",
      time: "12.04.2022 00:12:12",
    },
    {
      id: 3,
      name: "postg_hemis_01-11-2022_00_00.bak.tar",
      size: "2.0345",
      time: "12.04.2022 00:12:12",
    },
    {
      id: 4,
      name: "postg_hemis_01-11-2022_00_00.bak.tar",
      size: "2.0345",
      time: "12.04.2022 00:12:12",
    },
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
  ],
  tableOrderList: [
    {
      id: 1,
      orderNumber: "03-543", //Buyruq raqami
      orderDate: "06.09.2021", //buyruq sanasi
      orderName: "O'qishini boshqa oliy ta'lim muassasasiga ko'chirish", //buyruq nomi
      orderType: "O'qishdan chetlashtirish", //buyruq turi
      fakulty: "Matematika va informatika", //fakultet
      students: 2,
      createdAt: "07.09.2021 12:44:34", //Yaratilgan
    },
    {
      id: 2,
      orderNumber: "03-543", //Buyruq raqami
      orderDate: "06.09.2021", //buyruq sanasi
      orderName: "O'qishini boshqa oliy ta'lim muassasasiga ko'chirish.", //buyruq nomi
      orderType: "O'qishdan chetlashtirish", //buyruq turi
      fakulty: "Matematika va informatika", //fakultet
      students: 2,
      createdAt: "07.09.2021 12:44:34", //Yaratilgan
    },
    {
      id: 3,
      orderNumber: "03-543", //Buyruq raqami
      orderDate: "06.09.2021", //buyruq sanasi
      orderName: "TFF-talaba safidan chetlashtirish to'g'risida", //buyruq nomi
      orderType: "O'qishdan chetlashtirish", //buyruq turi
      fakulty: "Matematika va informatika", //fakultet
      students: 2,
      createdAt: "07.09.2021 12:44:34", //Yaratilgan
    },
    {
      id: 4,
      orderNumber: "03-543", //Buyruq raqami
      orderDate: "06.09.2021", //buyruq sanasi
      orderName:
        "Akademik ta'til berish to'g'risida 'Gumanitar fanlar' fakulteti", //buyruq nomi
      orderType: "O'qishdan chetlashtirish", //buyruq turi
      fakulty: "Matematika va informatika", //fakultet
      students: 2,
      createdAt: "07.09.2021 12:44:34", //Yaratilgan
    },
  ],
  tableSubjects: [
    {
      id: 1,
      kodSubjectGroup: "202",
      nameSubjectGroup: "Fizika",
      nameSubject: "Abstrakt algebra (kurs ishi)",
      subjectGroup: "Fizika",
      subjectCode: "2.04",
      educationType: "Bakalavr",
    },
    {
      id: 2,
      kodSubjectGroup: "202",
      nameSubjectGroup: "Fizika",
      nameSubject: "Abstrakt algebra (kurs ishi)",
      subjectGroup: "Fizika",
      subjectCode: "2.04",
      educationType: "Bakalavr",
    },
    {
      id: 3,
      kodSubjectGroup: "202",
      nameSubjectGroup: "Fizika",
      nameSubject: "Abstrakt algebra (kurs ishi)",
      subjectGroup: "Fizika",
      subjectCode: "2.04",
      educationType: "Bakalavr",
    },
    {
      id: 4,
      kodSubjectGroup: "202",
      nameSubjectGroup: "Fizika",
      nameSubject: "Abstrakt algebra (kurs ishi)",
      subjectGroup: "Fizika",
      subjectCode: "2.04",
      educationType: "Bakalavr",
    },
    {
      id: 5,
      kodSubjectGroup: "202",
      nameSubjectGroup: "Fizika",
      nameSubject: "Abstrakt algebra (kurs ishi)",
      subjectGroup: "Fizika",
      subjectCode: "2.04",
      educationType: "Bakalavr",
    },
  ],
  tableEducationYears: [
    {
      id: 1,
      name: "2021-2022",
      kod: "2021",
      currentStatus: "Yo'q", //joriy holat
      updatedAt: "12.09.2021 12:12:12", //o'zgartirilgan
    },
    {
      id: 2,
      name: "2020-2021",
      kod: "2020",
      currentStatus: "Yo'q", //joriy holat
      updatedAt: "12.09.2021 12:12:12", //o'zgartirilgan
    },
    {
      id: 3,
      name: "2019-2020",
      kod: "2019",
      currentStatus: "Yo'q", //joriy holat
      updatedAt: "12.09.2021 12:12:12", //o'zgartirilgan
    },
    {
      id: 4,
      name: "2018-2019",
      kod: "2018",
      currentStatus: "Yo'q", //joriy holat
      updatedAt: "12.09.2021 12:12:12", //o'zgartirilgan
    },
  ],
  tableCurriculum: [
    {
      id: 1,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 12 },
        { numberOfLesson: 13 },
        { numberOfLesson: 12 },
        { numberOfLesson: 15 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
    },
    {
      id: 2,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 12 },
        { numberOfLesson: 13 },
        { numberOfLesson: 12 },
        { numberOfLesson: 15 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 2 },
        { numberOfLesson: 0 },
        { numberOfLesson: 15 },
        { numberOfLesson: 14 },
        { numberOfLesson: 14 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
    },
    {
      id: 3,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 13 },
        { numberOfLesson: 12 },
        { numberOfLesson: 15 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 14 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 15 },
        { numberOfLesson: 14 },
        { numberOfLesson: 13 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
    },
    {
      id: 4,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 12 },
        { numberOfLesson: 13 },
        { numberOfLesson: 12 },
        { numberOfLesson: 15 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
        { numberOfLesson: 14 },
        { numberOfLesson: 12 },
        { numberOfLesson: 12 },
        { numberOfLesson: 0 },
        { numberOfLesson: 0 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
    },
  ],
  tableSemester: [
    {
      id: 1,
      name: "1-semestr",
      lavel: "1-kurs", // kurs
      curriculum: "GIB(kunduzgi)_2020-2021", //o'quv reja
      educationYear: "2022-2023", //o'quv yili
      period: "02.09.2022 - 06.02.2023", //muddati
    },
    {
      id: 2,
      name: "1-semestr",
      lavel: "1-kurs", // kurs
      curriculum: "GIB(kunduzgi)_2020-2021", //o'quv reja
      educationYear: "2022-2023", //o'quv yili
      period: "02.09.2022 - 06.02.2023", //muddati
    },
    {
      id: 3,
      name: "1-semestr",
      lavel: "1-kurs", // kurs
      curriculum: "GIB(kunduzgi)_2020-2021", //o'quv reja
      educationYear: "2022-2023", //o'quv yili
      period: "02.09.2022 - 06.02.2023", //muddati
    },
    {
      id: 4,
      name: "1-semestr",
      lavel: "1-kurs", // kurs
      curriculum: "GIB(kunduzgi)_2020-2021", //o'quv reja
      educationYear: "2022-2023", //o'quv yili
      period: "02.09.2022 - 06.02.2023", //muddati
    },
  ],
  tableWeek: [
    {
      id: 2,
      week: "12.12.2021-19.12.2021", //xafta
      lavel: "1-kurs", //kurs
      semester: "1-semester",
      weekType: "Nazariy ta'lim", //xafta turi
    },
    {
      id: 3,
      week: "12.12.2021-19.12.2021", //xafta
      lavel: "1-kurs", //kurs
      semester: "1-semester",
      weekType: "Nazariy ta'lim", //xafta turi
    },
    {
      id: 4,
      week: "12.12.2021-19.12.2021", //xafta
      lavel: "1-kurs", //kurs
      semester: "1-semester",
      weekType: "Nazariy ta'lim", //xafta turi
    },
    {
      id: 5,
      week: "12.12.2021-19.12.2021", //xafta
      lavel: "1-kurs", //kurs
      semester: "1-semester",
      weekType: "Nazariy ta'lim", //xafta turi
    },
  ],
  tableCurriculumInfo: [
    {
      id: 1,
      fakulty: "Tabiiy fanlar",
      specialty: "Biologiya",
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      markingSystem: "5 baholik baholash tizimi",
      groups: "BIO_19-1, BIO_19-2, BIO_19-3, BIO_19-4, BIO_19-5(rus)",
    },
  ],
  tableWeekInfo: [
    {
      id: 1,
      name: "Fizika",
      weekType: "Majburiy",
      trainingType: [
        { name: "Maruza", value: 30 },
        { name: "Seminar", value: 30 },
        { name: "Mustaqil ta'lim", value: 60 },
      ],
      examType: [{ name: "Umumiy", value: 5 }],
      wordLoad: 120,
      kredit: "4.0",
    },
    {
      id: 2,
      name: "informatika va axborot texnologiyalari",
      weekType: "Majburiy",
      trainingType: [
        { name: "Maruza", value: 30 },
        { name: "Seminar", value: 30 },
        { name: "Mustaqil ta'lim", value: 60 },
      ],
      examType: [{ name: "Umumiy", value: 5 }],
      wordLoad: 120,
      kredit: "4.0",
    },
    {
      id: 3,
      name: "Sotsologiya",
      weekType: "Majburiy",
      trainingType: [
        { name: "Maruza", value: 30 },
        { name: "Seminar", value: 30 },
        { name: "Mustaqil ta'lim", value: 60 },
      ],
      examType: [{ name: "Umumiy", value: 5 }],
      wordLoad: 120,
      kredit: "4.0",
    },
    {
      id: 4,
      name: "Bilogiya o'qitish metodikasi",
      weekType: "Majburiy",
      trainingType: [
        { name: "Maruza", value: 30 },
        { name: "Seminar", value: 30 },
        { name: "Mustaqil ta'lim", value: 60 },
      ],
      examType: [{ name: "Umumiy", value: 5 }],
      wordLoad: 120,
      kredit: "4.0",
    },
    {
      id: 5,
      name: "Matematika",
      weekType: "Majburiy",
      trainingType: [
        { name: "Maruza", value: 30 },
        { name: "Seminar", value: 30 },
        { name: "Mustaqil ta'lim", value: 60 },
      ],
      examType: [{ name: "Umumiy", value: 5 }],
      wordLoad: 120,
      kredit: "4.0",
    },
  ],

  optionsWeekTempelate: [
    {
      id: 1,
      weekPsition: "106",
      week: "05.09.2022 - 10.09.2022",
      semester: "5-semestr",
      countLesson: "13",
    },
    {
      id: 2,
      weekPsition: "106",
      week: "05.09.2022 - 10.09.2022",
      semester: "5-semestr",
      countLesson: "13",
    },
    {
      id: 3,
      weekPsition: "106",
      week: "05.09.2022 - 10.09.2022",
      semester: "5-semestr",
      countLesson: "13",
    },
    {
      id: 4,
      weekPsition: "106",
      week: "05.09.2022 - 10.09.2022",
      semester: "5-semestr",
      countLesson: "13",
    },
    {
      id: 5,
      weekPsition: "106",
      week: "05.09.2022 - 10.09.2022",
      semester: "5-semestr",
      countLesson: "13",
    },
  ],
  tableExam: [
    {
      id: 1,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { name: "Musiqa tarixi", value: 1 },
        { name: "Vokal va zamonaviy musiqa", value: 2 },
        { name: "Musiqa nazariyasi", value: 3 },
        { name: "Dirijiyorlik", value: 3 },
        {
          name: "Umumta'lim maktablarida musiqa to'garaklarini tashkil qilish",
          value: 1,
        },
        { name: "Ananaviy xonandalik", value: 0 },
        { name: "Cholg'ushunoslik", value: 1 },
        { name: "Xor va xorshunoslik", value: 0 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
      week: "Musiqa tarixi",
    },
    {
      id: 2,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { name: "Musiqa tarixi", value: 0 },
        { name: "Vokal va zamonaviy musiqa", value: 2 },
        { name: "Musiqa nazariyasi", value: 3 },
        { name: "Dirijiyorlik", value: 3 },
        {
          name: "Umumta'lim maktablarida musiqa to'garaklarini tashkil qilish",
          value: 1,
        },
        { name: "Ananaviy xonandalik", value: 1 },
        { name: "Cholg'ushunoslik", value: 1 },
        { name: "Xor va xorshunoslik", value: 0 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
      week: "Musiqa tarixi",
    },
    {
      id: 3,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { name: "Musiqa tarixi", value: 1 },
        { name: "Vokal va zamonaviy musiqa", value: 2 },
        { name: "Musiqa nazariyasi", value: 0 },
        { name: "Dirijiyorlik", value: 3 },
        {
          name: "Umumta'lim maktablarida musiqa to'garaklarini tashkil qilish",
          value: 1,
        },
        { name: "Ananaviy xonandalik", value: 6 },
        { name: "Cholg'ushunoslik", value: 1 },
        { name: "Xor va xorshunoslik", value: 3 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
      week: "Musiqa tarixi",
    },
    {
      id: 4,
      name: "BIO(kunduzgi)_2020-2021", //o'quv reja nomi
      educationYear: "2021-2022", //o'quv yili
      semester: "2-semestr", //semestr
      group: "BIO-20/1", //guruh
      weeks: [
        { name: "Musiqa tarixi", value: 1 },
        { name: "Vokal va zamonaviy musiqa", value: 2 },
        { name: "Musiqa nazariyasi", value: 3 },
        { name: "Dirijiyorlik", value: 3 },
        {
          name: "Umumta'lim maktablarida musiqa to'garaklarini tashkil qilish",
          value: 1,
        },
        { name: "Ananaviy xonandalik", value: 6 },
        { name: "Cholg'ushunoslik", value: 1 },
        { name: "Xor va xorshunoslik", value: 4 },
      ],
      countWeeks: 15, //xaftaliklar soni
      faculty: "Biologiya", //fakultet
      speciality: "Biologiya o'qitish metodikasi", //mutaxassislik
      educationType: "Bakalavr",
      markingSystem: "5 baxolik baxolash tizimi", //baxolash tizimi
      week: "Musiqa tarixi",
    },
  ],
  tableMarkingSystem: [
    {
      id: 1,
      name: "Besh baholik baholash tizimi",
      kod: 11,
      minimumLimit: "51%",
      countFinalExams: "3",
    },
    {
      id: 2,
      name: "Kredit baholash tizimi",
      kod: 22,
      minimumLimit: "60%",
      countFinalExams: "3",
    },
    {
      id: 3,
      name: "Reyting baholash tizimi",
      kod: 33,
      minimumLimit: "55%",
      countFinalExams: "3",
    },
  ],
  tableGradeType: [
    {
      id: 1,
      name: "5",
      kod: "11",
      markingSystem: "Reyting baholash tizmi",
      minLimit: "86",
      maxLimit: "100",
    },
    {
      id: 1,
      name: "5",
      kod: "12",
      markingSystem: "Kredit baholash tizmi",
      minLimit: "4.6",
      maxLimit: "5.0",
    },
    {
      id: 1,
      name: "3",
      kod: "13",
      markingSystem: "5 baholik baholash tizmi",
      minLimit: "2.5",
      maxLimit: "4.5",
    },
    {
      id: 1,
      name: "3",
      kod: "14",
      markingSystem: "Reyting baholash tizmi",
      minLimit: "57",
      maxLimit: "70",
    },
  ],
  tableRatingGrade: [
    {
      id: 1,
      name: "Fan qaydnomasi (Asosiy)",
      kod: "11",
    },
    {
      id: 1,
      name: "Fan qaydnomasi (Qo'shimcha)",
      kod: "11",
    },
    {
      id: 1,
      name: "Kurs ishi qaydnomasi",
      kod: "11",
    },
    {
      id: 1,
      name: "Davlat imtihon qaydnomasi",
      kod: "11",
    },
    {
      id: 1,
      name: "Malaka amaliyoti qaydnomasi",
      kod: "11",
    },
    {
      id: 1,
      name: "Bitiruv ishi qaydnomasi",
      kod: "11",
    },
  ],
  tableLessonPair: [
    {
      id: 1,
      code: "12",
      name: "2",
      time: {
        start: "10:30",
        end: "11-50",
      },
      educationYear: "2021-2022",
      active: true,
    },
    {
      id: 1,
      code: "13",
      name: "3",
      time: {
        start: "12:00",
        end: "13-20",
      },
      educationYear: "2021-2022",
      active: true,
    },
    {
      id: 1,
      code: "11",
      name: "1",
      time: {
        start: "09:00",
        end: "10-20",
      },
      educationYear: "2021-2022",
      active: false,
    },
  ],
  tableExams: [
    {
      id: 1,
      name: "Amliy ingliz tili",
      subject: "Amaliy ingiliz tili",
      controlType: "Yakuniy nazorat",
      employee: "Abdalova S. S",
      educationYear: "2021-2022",
      semester: "1-semeter",
      groups: [
        { value: "MO'M(k)-18/1" },
        { value: "MO'M(k)-18/2" },
        { value: "MO'M(k)-18/3" },
      ],

      quvestionsCount: "170",
      quvestions: "30",
      startDate: "20.06.2022",
      statrTime: "18:00",
      endDate: "22.06.2022",
      endTime: "18:00",
      deadline: "30",
      active: true,
    },
    {
      id: 1,
      name: "Amaliy ingliz tili",
      subject: "Amaliy ingiliz tili",
      controlType: "Yakuniy nazorat",
      employee: "Abdalova S. S",
      educationYear: "2021-2022",
      semester: "1-semeter",
      groups: [
        { value: "MO'M(k)-18/1" },
        { value: "MO'M(k)-18/2" },
        { value: "MO'M(k)-18/3" },
      ],

      quvestionsCount: "170",
      quvestions: "30",
      startDate: "20.06.2022",
      statrTime: "18:00",
      endDate: "22.06.2022",
      endTime: "18:00",
      deadline: "30",
      active: true,
    },
    {
      id: 1,
      name: "Amliy ingliz tili",
      subject: "Amaliy ingiliz tili",
      controlType: "Yakuniy nazorat",
      employee: "Abdalova S. S",
      educationYear: "2021-2022",
      semester: "1-semeter",
      groups: [
        { value: "MO'M(k)-18/1" },
        { value: "MO'M(k)-18/2" },
        { value: "MO'M(k)-18/3" },
      ],

      quvestionsCount: "170",
      quvestions: "30",
      startDate: "20.06.2022",
      statrTime: "18:00",
      endDate: "22.06.2022",
      endTime: "18:00",
      deadline: "30",
      active: true,
    },
    {
      id: 1,
      name: "Amliy ingliz tili",
      subject: "Amaliy ingiliz tili",
      controlType: "Yakuniy nazorat",
      employee: "Abdalova S. S",
      educationYear: "2021-2022",
      semester: "1-semeter",
      groups: [
        { value: "MO'M(k)-18/1" },
        { value: "MO'M(k)-18/2" },
        { value: "MO'M(k)-18/3" },
      ],

      quvestionsCount: "170",
      quvestions: "30",
      startDate: "20.06.2022",
      statrTime: "18:00",
      endDate: "22.06.2022",
      endTime: "18:00",
      deadline: "30",
      active: true,
    },
  ],
  tableGrroup: [
    {
      id: 1,
      name: "MO'M-19/2",
      faculty: "Matematika va informatika",
      educationType: "Bakalavr",
      educationLanguage: "O'zbek tili",
    },
    {
      id: 2,
      name: "MO'M-19/2",
      faculty: "Matematika va informatika",
      educationType: "Bakalavr",
      educationLanguage: "O'zbek tili",
    },
    {
      id: 3,
      name: "MO'M-19/2",
      faculty: "Matematika va informatika",
      educationType: "Bakalavr",
      educationLanguage: "O'zbek tili",
    },
    {
      id: 4,
      name: "MO'M-19/2",
      faculty: "Matematika va informatika",
      educationType: "Bakalavr",
      educationLanguage: "O'zbek tili",
    },
  ],
  tableExamInfo: [
    {
      id: 1,
      group: "MO'M(k)-18/2",
      faculty: "Matematika va informatika",
      language: "O'zbek",
      startAt: "Boshlanish vaqti",
      endAt: "Tugash vati",
    },
    {
      id: 2,
      group: "MO'M(k)-18/2",
      faculty: "Matematika va informatika",
      language: "O'zbek",
      startAt: "Boshlanish vaqti",
      endAt: "Tugash vati",
    },
    {
      id: 3,
      group: "MO'M(k)-18/2",
      faculty: "Matematika va informatika",
      language: "O'zbek",
      startAt: "Boshlanish vaqti",
      endAt: "Tugash vati",
    },
    {
      id: 4,
      group: "MO'M(k)-18/2",
      faculty: "Matematika va informatika",
      language: "O'zbek",
      startAt: "Boshlanish vaqti",
      endAt: "Tugash vati",
    },
  ],
  tableQuestions: [
    {
      id: 1,
      name: "Berilgsn msalani yeching",
      active: true,
    },
    {
      id: 2,
      name: "Berilgsn msalani yeching",
      active: true,
    },
    {
      id: 3,
      name: "Tenglsmsni yeching",
      active: true,
    },
    {
      id: 4,
      name: "Ifodani qiymatini toping",
      active: true,
    },
    {
      id: 5,
      name: "to'g'ri javobni belgilang",
      active: true,
    },
  ],
  tableGpaSubject: [
    {
      id: 1,
      semester: "5-semestr",
      subjects: [
        {
          id: 1,
          name: "Fizika",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
        {
          id: 2,
          name: "Umumiy pedagogika",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
        {
          id: 3,
          name: "Dasturlash tillari",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
        {
          id: 4,
          name: "Kompyuter taminoti",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
      ],
    },
    {
      id: 2,
      semester: "6-semestr",
      subjects: [
        {
          id: 1,
          name: "Fizika",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
        {
          id: 2,
          name: "Umumiy pedagogika",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
        {
          id: 3,
          name: "Dasturlash tillari",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
        {
          id: 4,
          name: "Kompyuter taminoti",
          totalAcload: "98",
          credit: "0.0",
          grade: "4.00",
        },
      ],
    },
  ],
  tableBuilding: [
    {
      id: 1,
      name: "2-maktab binosi",
      sity: " Toshkent viloyati Chirchiq shahar Sharof Rashidov ko'chasi 2-uy",
      active: true,
    },
    {
      id: 2,
      name: "2-maktab binosi",
      sity: " Toshkent viloyati Chirchiq shahar Sharof Rashidov ko'chasi 2-uy",
      active: false,
    },
    {
      id: 3,
      name: "2-maktab binosi",
      sity: " Toshkent viloyati Chirchiq shahar Sharof Rashidov ko'chasi 2-uy",
      active: true,
    },
    {
      id: 4,
      name: "2-maktab binosi",
      sity: " Toshkent viloyati Chirchiq shahar Sharof Rashidov ko'chasi 2-uy",
      active: true,
    },
  ],
  tableAuditorium: [
    {
      id: 1,
      name: "100(BB)-xona",
      building: "Bosh bino",
      auditoriumType: "Laborato'riya",
      volume: 15,
      active: true,
    },
    {
      id: 2,
      name: "100(BB)-xona",
      building: "Bosh bino",
      auditoriumType: "Laborato'riya",
      volume: 15,
      active: true,
    },
    {
      id: 3,
      name: "100(BB)-xona",
      building: "Bosh bino",
      auditoriumType: "Laborato'riya",
      volume: 15,
      active: true,
    },
    {
      id: 4,
      name: "100(BB)-xona",
      building: "Bosh bino",
      auditoriumType: "Laborato'riya",
      volume: 15,
      active: true,
    },
  ],
  unversiytInfos: [
    {
      id: 1,
      kod: "001",
      nomi: "Profi University",
      kontakt: "+998 87 777 11 11",
      stir: "308798797",
      rektor: "XURSHID SHAVKATBOYEVICH",
      hudud: "Toshkent Shahar",
      shahar: "Mirzo Ulug'bek tumani",
      otmTuri: "Xususiy",
      otmShakli: "Universitet",
      email: "info@profiuniversity.uz",
      bank: "Ipoteka bank",
      akk: `2021 yil 28 dekabrdagi № 0050 seriyali guvohnoma "PROFI UNIVERSITY" MCHJ`,
    },
  ],
  tableTempelateCriteria: [
    {
      id: 1,
      educationYear: "2021-2022", //o'quv yili
      scientificPlatform: "Scopus", // ilmiy platforma
      criteriaType: "Iqtiboslar ulushi", //mezon turi
      criteriaValue: "10", //qiymat
      typeOfPublication: "Uslubiy nashrlar", //nashr turi
      publicationMethodicalType: "Darslik", //mezon
      inPublicationDatabase: "Yo'q", //ilmiy baza
      existCertificate: "Yo'q", //nashr guvohnomasi
      markValue: "30", //ball
      updatedAt: "27.02.2022 18:14:14", //o'zgartirilgan
      active: true,
    },
    {
      id: 2,
      educationYear: "2021-2022", //o'quv yili
      scientificPlatform: "Scopus", // ilmiy platforma
      criteriaValue: "10", //qiymat
      typeOfPublication: "Uslubiy nashrlar", //nashr turi
      publicationMethodicalType: "Darslik", //mezon
      inPublicationDatabase: "Yo'q", //ilmiy baza
      existCertificate: "Yo'q", //nashr guvohnomasi
      criteriaType: "(berilmagan)", //mezon turi
      markValue: "30", //ball
      updatedAt: "27.02.2022 18:14:14", //o'zgartirilgan
      active: true,
    },
    {
      id: 3,
      educationYear: "2021-2022", //o'quv yili
      scientificPlatform: "Scopus", // ilmiy platforma
      criteriaType: "Iqtiboslar ulushi", //mezon turi
      criteriaValue: "10", //qiymat
      typeOfPublication: "Uslubiy nashrlar", //nashr turi
      publicationMethodicalType: "Darslik", //mezon
      inPublicationDatabase: "Yo'q", //ilmiy baza
      existCertificate: "Yo'q", //nashr guvohnomasi
      markValue: "30", //ball
      updatedAt: "27.02.2022 18:14:14", //o'zgartirilgan
      active: true,
    },
    {
      id: 4,
      educationYear: "2021-2022", //o'quv yili
      scientificPlatform: "Scopus", // ilmiy platforma
      criteriaValue: "10", //qiymat
      typeOfPublication: "Uslubiy nashrlar", //nashr turi
      publicationMethodicalType: "Darslik", //mezon
      inPublicationDatabase: "Yo'q", //ilmiy baza
      existCertificate: "Yo'q", //nashr guvohnomasi
      criteriaType: "(berilmagan)", //mezon turi
      markValue: "30", //ball
      updatedAt: "27.02.2022 18:14:14", //o'zgartirilgan
      active: true,
    },
  ],
  messageAll: [
    {
      id: 1,

      messageSender: "Shodiya Abdumuminova",
      messageSubject: "IO'M_19/3 guruhi talabalaridan iltimosnoma",
      messageType: "Qoralama",
      message:
        "M.Oʻ.M 19/1 guruh talabalari uchun shanba kuni quyilgan 4 paralik darsni oʻzgartirishlarizni soʻrayman. Haftaning boshqa kunlarida bir paralik yoki ikki paralik darslar bor, oʻsha joylarga shanba kuni boʻladigan 4-paradagi inglis tili quyilganda yaxshi boʻlardi.",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 2,
      messageSender: "Gulmira Abdumuminova",
      messageSubject: "MI_20/3 gurux talabasi",
      messageType: "Jo'natilgan",
      message: "Yakunylar jadvali qachon chiqariladi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 3,
      messageSender: "Dildora Rahmonova",
      messageSubject: "MI_20/3 gurux talabasi",
      messageType: "Korzina",
      message:
        "Kontraktimmi to'laganman. lekin hemisda to'lnmagan ko'rsatayabdi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 4,
      messageSender: "Elmira Rushanova",
      messageSubject: "MI_20/3 gurux talabasi",
      messageType: "Kiruvchi xabarlar",
      message: "Hemisdan olingan ma'lumotnoma hamma joyga o'tadimi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
  ],
  tableTeacherRating: [
    {
      id: 1,
      employee: "Abdullayev Jamshid Rustamovich",
      criteria: "Ilmiy nashr", //mezon
      publicationCategory: "O'quv qo'llanma", // nashr toifasi
      publicationName: "Kompyuterni mustaqil o'rganish", //nashr nomi
      points: "30",
    },
    {
      id: 2,
      employee: "Abdullayev Jamshid Rustamovich",
      criteria: "Ilmiy nashr", //mezon
      publicationCategory: "O'quv qo'llanma", // nashr toifasi
      publicationName: "Kompyuterni mustaqil o'rganish", //nashr nomi
      points: "30",
    },
    {
      id: 3,
      employee: "Abdullayev Jamshid Rustamovich",
      criteria: "Ilmiy nashr", //mezon
      publicationCategory: "O'quv qo'llanma", // nashr toifasi
      publicationName: "Kompyuterni mustaqil o'rganish", //nashr nomi
      points: "30",
    },
    {
      id: 4,
      employee: "Abdullayev Jamshid Rustamovich",
      criteria: "Ilmiy nashr", //mezon
      publicationCategory: "O'quv qo'llanma", // nashr toifasi
      publicationName: "Kompyuterni mustaqil o'rganish", //nashr nomi
      points: "30",
    },
  ],
  tableDepatmentRating: [
    {
      id: 1,
      name: "Gumanitar fanlar",
      points: "30",
    },
    {
      id: 2,
      name: "Matematika va informatika",
      points: "30",
    },
    {
      id: 3,
      name: "Matematka o'qitish metodikasi",
      points: "30",
    },
    {
      id: 4,
      name: "Tarix va tillar",
      points: "30",
    },
    {
      id: 5,
      name: "Pedagogika va psixologiya",
      points: "30",
    },
  ],
  tableAdminLog: [
    {
      id: 1,
      name: "ATANAZAR RAKHIMOV",
      ip: "192.168.144.84",
      action: "dashboard/login",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      createdAt: "01.11.2022 13:03:01",
    },
    {
      id: 2,
      name: "ATANAZAR RAKHIMOV",
      ip: "192.168.144.84",
      action: "dashboard/login",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      createdAt: "01.11.2022 13:03:01",
    },
    {
      id: 3,
      name: "ATANAZAR RAKHIMOV",
      ip: "192.168.144.84",
      action: "dashboard/login",
      message: "Siz tizimga muvaffaqiyatli kirdingiz",
      createdAt: "01.11.2022 13:03:01",
    },
    {
      id: 4,
      name: "ATANAZAR RAKHIMOV",
      ip: "192.168.144.84",
      action: "dashboard/login",
      message:
        "`MG'T-20/3` guruhning `Tarbiya fanlarini o'qitish metodikasi` fani boyicha davomati muvaffaqiyatli o'zgartirildi",
      createdAt: "01.11.2022 13:03:01",
    },
  ],
  tableStatisticalStudent: [
    {
      id: 1,
      faculty: {
        name: "Matematika va informatika",
        specialty: {
          name: "Matematika o'qitish metodikas",
          lavels: {
            lavel1: {
              name: 1,
              grant: {
                girls: 12,
                men: 15,
                all: 27,
              },
              shartnoma: {
                girls: 10,
                men: 12,
                all: 22,
              },
              all: {
                girls: 22,
                men: 27,
                all: 49,
              },
            },
            lavel2: {
              name: 2,
              grant: {
                girls: 12,
                men: 15,
                all: 27,
              },
              shartnoma: {
                girls: 10,
                men: 12,
                all: 22,
              },
              all: {
                girls: 22,
                men: 27,
                all: 49,
              },
            },
            lavel3: {
              name: 3,
              grant: {
                girls: 12,
                men: 15,
                all: 27,
              },
              shartnoma: {
                girls: 10,
                men: 12,
                all: 22,
              },
              all: {
                girls: 22,
                men: 27,
                all: 49,
              },
            },
            lavel4: {
              name: 4,
              grant: {
                girls: 12,
                men: 15,
                all: 27,
              },
              shartnoma: {
                girls: 10,
                men: 12,
                all: 22,
              },
              all: {
                girls: 22,
                men: 27,
                all: 49,
              },
            },
            lavel5: {
              name: 5,
              grant: {
                girls: 0,
                men: 0,
                all: 0,
              },
              shartnoma: {
                girls: 0,
                men: 0,
                all: 0,
              },
              all: {
                girls: 0,
                men: 0,
                all: 0,
              },
            },
          },
        },
      },
    },
  ],
  tableByTeacher: [
    {
      nameCategory: "Ilmiy daraja",
      supCategores: [
        {
          name: "Ona tili",
        },
        {
          name: "Adabiyot",
        },
        {
          name: "Ingliz tili",
        },
        {
          name: "Matematika",
        },
      ],
      departments: [
        {
          department: "Matematika o'qitish metodikasi va geometriya",
          category: [
            {
              count: 12,
            },
            {
              count: 15,
            },
            {
              count: 15,
            },
            {
              count: 15,
            },
            {
              count: 15,
            },
            {
              count: 14,
            },
            {
              count: 15,
            },
            {
              count: 12,
            },
            {
              count: 15,
            },
            {
              count: 55,
            },
            {
              count: 25,
            },
            {
              count: 17,
            },
          ],
        },
        {
          department: "Matematika o'qitish metodikasi va geometriya",
          category: [
            {
              count: 12,
            },
            {
              count: 15,
            },
            {
              count: 15,
            },
            {
              count: 15,
            },
            {
              count: 15,
            },
            {
              count: 14,
            },
            {
              count: 15,
            },
            {
              count: 12,
            },
            {
              count: 15,
            },
            {
              count: 55,
            },
            {
              count: 25,
            },
            {
              count: 17,
            },
          ],
        },
      ],
      summary: [
        {
          count: 12,
        },
        {
          count: 15,
        },
        {
          count: 15,
        },
        {
          count: 15,
        },
        {
          count: 15,
        },
        {
          count: 14,
        },
        {
          count: 15,
        },
        {
          count: 12,
        },
        {
          count: 15,
        },
        {
          count: 55,
        },
        {
          count: 25,
        },
        {
          count: 17,
        },
      ],
    },
  ],
  //xodim ma'lumotlari
  tablEemployeeInfo: [
    {
      id: 1,
      imageEmployee: "00100000001",
      employeeIdNumber: 3542112036,
      fristName: "SAYYORA",
      secondName: "ABDALOVA",
      thirdName: "KOMILOVNA",
      birthDate: "12-23-1969",
      passpostNumber: "AA1234567",
      pin: 12345678901234,
      specialty: "Fizika",
      academicRank: "Unvonsiz",
      academicDegree: "Fan nomzodi, PhD",
      role: "O'qituvchi",
      createdAt: "10.02.2021 14:45:32",
      updatedAt: "19.03.2022 15:45:32",
    },
  ],
  // jadval fakultet
  tableFaculty: [
    {
      id: 1,
      kod: "001-001",
      name: "Matematika va informatika",
      type: "Maxalliy",
    },
    {
      id: 2,
      kod: "001-002",
      name: "Pedagogika",
      type: "Maxalliy",
    },
    {
      id: 3,
      kod: "001-003",
      name: "Til va adabiyot",
      type: "Maxalliy",
    },
    {
      id: 4,
      kod: "001-004",
      name: "Gumanitar fanlar",
      type: "Maxalliy",
    },
    {
      id: 5,
      kod: "001-005",
      name: "Sanat va madaniyat",
      type: "Maxalliy",
    },
    {
      id: 6,
      kod: "001-006",
      name: "Tabiiy fanlar",
      type: "Maxalliy",
    },
  ],
  tablebByPerformance: {
    faculty: [
      {
        id: 1,
        name: "Matemtika va informatika",
        totalStudent: 147,
        five: {
          count: 11,
          percentage: "11%",
        },
        four: {
          count: 30,
          percentage: "30%",
        },
        three: {
          count: 25,
          percentage: "25%",
        },
        two: {
          count: 34,
          percentage: "34%",
        },
      },
      {
        id: 2,
        name: "Matemtika va informatika",
        totalStudent: 147,
        five: {
          count: 11,
          percentage: "11%",
        },
        four: {
          count: 30,
          percentage: "30%",
        },
        three: {
          count: 25,
          percentage: "25%",
        },
        two: {
          count: 34,
          percentage: "34%",
        },
      },
      {
        id: 3,
        name: "Matemtika va informatika",
        totalStudent: 147,
        five: {
          count: 11,
          percentage: "11%",
        },
        four: {
          count: 30,
          percentage: "30%",
        },
        three: {
          count: 25,
          percentage: "25%",
        },
        two: {
          count: 34,
          percentage: "34%",
        },
      },
    ],
    total: [
      {
        totalCount: 147,
        five: {
          count: 11,
          percentage: "11%",
        },
        four: {
          count: 30,
          percentage: "30%",
        },
        three: {
          count: 25,
          percentage: "25%",
        },
        two: {
          count: 34,
          percentage: "34%",
        },
      },
    ],
  },
  tableTrainigStat: [
    {
      id: 1,
      subject: "Web-dizayn",
      maruza: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      labaratoriya: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      amaliy: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      seminar: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      total: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
    },
    {
      id: 2,
      subject: "Dasturlash tillari",
      maruza: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      labaratoriya: {
        plan: "",
        done: "",
        unDone: "",
      },
      amaliy: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      seminar: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      total: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
    },
    {
      id: 3,
      subject: "Informarmatika o;qitish metodikasi",
      maruza: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      labaratoriya: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      amaliy: {
        plan: "",
        done: "",
        unDone: "",
      },
      seminar: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
      total: {
        plan: 12,
        done: 28,
        unDone: -16,
      },
    },
  ],
  tableDepartmentEmployee: [
    {
      id: 1,
      department: "Umumiy pedagogika",
      employmentStaff: "1,00 stavka",
      position: "Dotsent",
      employeeStatus: "Ishlamoqda",
    },
    {
      id: 2,
      department: "Umumiy pedagogika",
      employmentStaff: "0,25 stavka",
      position: "Dotsent",
      employeeStatus: "Bo‘shagan",
    },
    {
      id: 3,
      department: "Qo'shma ta'lim",
      employmentStaff: "0,25 stavka",
      position: "Stajer-o‘qituvchi",
      employeeStatus: "Bo‘shagan",
    },
  ],
  tableByResourse: [
    {
      id: 1,
      division: "Boshlang'ich ta'lim metodikasi",
      faculty: "Boshlang'ich ta'lim",
      subject: "Matematika o'qitish metodikasi",
      curriculum: "BOT(kunduzgi)_2019-2020",
      educationForm: "Bakalavr",
      educationType: "Kunduzgi",
      trainingType: "Maruza",
      semester: "5-semester",
      topics: "8",
      resourcesCount: 17,
      tasksCount: 0,
      date: "09-10-2022",
      group: "MI-20/7",
    },
    {
      id: 2,
      division: "Boshlang'ich ta'lim metodikasi",
      faculty: "Boshlang'ich ta'lim",
      subject: "Matematika o'qitish metodikasi",
      curriculum: "BOT(kunduzgi)_2019-2020",
      educationForm: "Bakalavr",
      educationType: "Kunduzgi",
      trainingType: "Maruza",
      semester: "5-semester",
      topics: "8",
      resourcesCount: 17,
      tasksCount: 0,
      date: "09-10-2022",
      group: "MI-20/7",
    },
    {
      id: 3,
      division: "Boshlang'ich ta'lim metodikasi",
      faculty: "Boshlang'ich ta'lim",
      subject: "Matematika o'qitish metodikasi",
      curriculum: "BOT(kunduzgi)_2019-2020",
      educationForm: "Bakalavr",
      educationType: "Kunduzgi",
      trainingType: "Maruza",
      semester: "5-semester",
      topics: "8",
      resourcesCount: 17,
      tasksCount: 0,
      date: "09-10-2022",
      group: "MI-20/7",
    },
    {
      id: 4,
      division: "Boshlang'ich ta'lim metodikasi",
      faculty: "Boshlang'ich ta'lim",
      subject: "Matematika o'qitish metodikasi",
      curriculum: "BOT(kunduzgi)_2019-2020",
      educationForm: "Bakalavr",
      educationType: "Kunduzgi",
      trainingType: "Maruza",
      semester: "5-semester",
      topics: "8",
      resourcesCount: 17,
      tasksCount: 0,
      date: "09-10-2022",
      group: "MI-20/7",
    },
  ],
  tableRooms: [
    {
      id: 1,
      name: "100BB",
      employeee: "Jumayeva A. M",
      type: "Maruza",
      volume: 150,
      weeks: [
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
          current: 1,
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "0",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "0",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "2",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
          current: 1,
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
          current: 1,
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "3",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "",
        },
        {
          lessonPair: "",
        },
        {
          lessonPair: "1",
        },
        {
          lessonPair: "1",
        },
      ],
    },
  ],
  tableReportByRooms: [
    {
      id: 1,
      subject: "Psihologiya",
      auditoriumType: "Maruza",
      employee: "Smandar SH.R",
      group: "BOT-20/2",
      lessonPair: 1,
    },
    {
      id: 2,
      subject: "Psihologiya",
      auditoriumType: "Maruza",
      employee: "Smandar SH.R",
      group: "BOT-20/2",
      lessonPair: 1,
    },
    {
      id: 3,
      subject: "Psihologiya",
      auditoriumType: "Maruza",
      employee: "Smandar SH.R",
      group: "BOT-20/2",
      lessonPair: 1,
    },
    {
      id: 4,
      subject: "Psihologiya",
      auditoriumType: "Maruza",
      employee: "Smandar SH.R",
      group: "BOT-20/2",
      lessonPair: 1,
    },
  ],
  tableGroupResultExam: [
    {
      id: 1,
      active: true,
      studen: "KRUSHELNITSKAYA ANASTASIYA VIKTOROVNA",
      attempts: 2, //urunishlar soni
      correct: "22.0", // to'g'ri javoblar soni
      percent: "73.3%", //to'g'ri javoblar foizi
      finishedAt: "2022-03-19 06:31:21", //tugagan vaqti
    },
    {
      id: 2,
      active: false,
      studen: "KRUSHELNITSKAYA ANASTASIYA VIKTOROVNA",
      attempts: 2, //urunishlar soni
      correct: "22.0", // to'g'ri javoblar soni
      percent: "73.3%", //to'g'ri javoblar foizi
      finishedAt: "2022-03-19 06:31:21", //tugagan vaqti
    },
    {
      id: 3,
      active: true,
      studen: "KRUSHELNITSKAYA ANASTASIYA VIKTOROVNA",
      attempts: 2, //urunishlar soni
      correct: "22.0", // to'g'ri javoblar soni
      percent: "73.3%", //to'g'ri javoblar foizi
      finishedAt: "2022-03-19 06:31:21", //tugagan vaqti
    },
    {
      id: 4,
      active: true,
      studen: "KRUSHELNITSKAYA ANASTASIYA VIKTOROVNA",
      attempts: 2, //urunishlar soni
      correct: "22.0", // to'g'ri javoblar soni
      percent: "73.3%", //to'g'ri javoblar foizi
      finishedAt: "2022-03-19 06:31:21", //tugagan vaqti
    },
  ],
  //jadval xodim ma'lumotlari
  tableInfoEmployees: [
    {
      id: 1,
      name: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      section: "Buxgalteriya",
      position: "Bugalter",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 2,
      name: "SOBIROVA SAIDA RAVSHANBEKOVNA",
      section: "Buxgalteriya",
      position: "Bugalter",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 3,
      name: "TADJIBAYEV IKRAM URALBAYEVICH",
      section: "Buxgalteriya",
      position: "Bugalter",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 4,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      section: "Buxgalteriya",
      position: "Bugalter",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 5,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      section: "Buxgalteriya",
      position: "Bugalter",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
    {
      id: 6,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      section: "Buxgalteriya",
      position: "Bugalter",
      stavka: "1,00 stavka, Asosiy ish joyi",
      status: "Ishlamoqda",
      commandNumber: "12-126 26.01.2022",
    },
  ],
  tableResults: [
    {
      id: 1,
      exam: "Texnologiya",
      student: "RAHMONOVA XURSANOY SHAVKATJON QIZI",
      group: "BOT(s)-21/3",
      ipAdress: "185.123.230.50",
      attempts: "1",
      correct: "12",
      mark: "3",
      percent: "60%",
      startedAt: "29.09.2022 10:08",
      time: "123",
      finishedAt: "29.09.2022 11:55",
    },
    {
      id: 2,
      exam: "Texnologiya",
      student: "RAHMONOVA XURSANOY SHAVKATJON QIZI",
      group: "BOT(s)-21/3",
      ipAdress: "185.123.230.50",
      attempts: "1",
      correct: "12",
      mark: "3",
      percent: "60%",
      startedAt: "29.09.2022 10:08",
      time: "123",
      finishedAt: "29.09.2022 11:55",
    },
    {
      id: 3,
      exam: "Texnologiya",
      student: "RAHMONOVA XURSANOY SHAVKATJON QIZI",
      group: "BOT(s)-21/3",
      ipAdress: "185.123.230.50",
      attempts: "1",
      correct: "12",
      mark: "3",
      percent: "60%",
      startedAt: "29.09.2022 10:08",
      time: "123",
      finishedAt: "29.09.2022 11:55",
    },
    {
      id: 4,
      exam: "Texnologiya",
      student: "RAHMONOVA XURSANOY SHAVKATJON QIZI",
      group: "BOT(s)-21/3",
      ipAdress: "185.123.230.50",
      attempts: "1",
      correct: "12",
      mark: "3",
      percent: "60%",
      startedAt: "29.09.2022 10:08",
      time: "123",
      finishedAt: "29.09.2022 11:55",
    },
  ],
  tableQuestionsWeek: [
    {
      id: 1,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
    {
      id: 2,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 0,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
    {
      id: 3,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
      ],
    },
    {
      id: 4,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 0,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
    {
      id: 5,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
  ],
  tableQuestionsEdit: [
    {
      id: 1,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
    {
      id: 2,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
    {
      id: 3,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
      ],
    },
    {
      id: 4,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
    {
      id: 5,
      question: "Daraxt barglarini quritish yo‘llari.",
      variants: [
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: 1,
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
        {
          answer: "Dazmollab, presslab va gerbariy qutilarida quritish",
          value1: "",
        },
      ],
    },
  ],
  tableSubjectCurriculum: [
    {
      id: 1,
      type: "Majburiy",
      name: "Matematik analiz",
      kod: "Math 112233",
      department: "Matematik analiz va geometrya",
      qaydnomaType: "Asosiy",
      examType: "S",
      Kredit: 5,
      time: 150,
      all: 60,
      maruza: 30,
      amaliy: 30,
      labaratoriya: "",
      seminar: "",
      amaliyot: "",
      mustqailTalim: 90,
      kursIshi: "",
      oraliq: 5,
      yakuniy: 5,
      umumiy: 5,
    },
  ],
  subjectSelection: [
    {
      id: 1,
      curriculum: {
        name: "MI_2022-2023",
        groups: [
          {
            id: 1,
            name: "MI 23-1",
          },
          {
            id: 1,
            name: "MI 23-2",
          },
          {
            id: 1,
            name: "MI 23-3",
          },
          {
            id: 1,
            name: "MI 23-4",
          },
        ],
      },
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      semester: "1-semester",
      count: 57,
      subjects: [
        {
          name: "Flash texnologiyalri",
          chooseCount: 12,
        },
        {
          name: "Robototexnika",
          chooseCount: 13,
        },
        {
          name: "Web dizayn",
          chooseCount: 32,
        },
      ],
    },
    {
      id: 2,
      curriculum: {
        name: "MI_2022-2023",
        groups: [
          {
            id: 1,
            name: "MI 23-1",
          },
          {
            id: 1,
            name: "MI 23-2",
          },
          {
            id: 1,
            name: "MI 23-3",
          },
          {
            id: 1,
            name: "MI 23-4",
          },
        ],
      },
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      semester: "1-semester",
      count: 186,
      subjects: [
        {
          name: "Flash texnologiyalri",
          chooseCount: 12,
        },
        {
          name: "Robototexnika",
          chooseCount: 33,
        },
        {
          name: "Web dizayn",
          chooseCount: 22,
        },
      ],
    },
    {
      id: 3,
      curriculum: {
        name: "MI_2022-2023",
        groups: [
          {
            id: 1,
            name: "MI 23-1",
          },
          {
            id: 1,
            name: "MI 23-2",
          },
          {
            id: 1,
            name: "MI 23-3",
          },
          {
            id: 1,
            name: "MI 23-4",
          },
        ],
      },
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      semester: "1-semester",
      count: 186,
      subjects: [
        {
          name: "Flash texnologiyalri",
          chooseCount: 32,
        },
        {
          name: "Robototexnika",
          chooseCount: 13,
        },
        {
          name: "Web dizayn",
          chooseCount: 22,
        },
      ],
    },
  ],
  tableStudentSelection: [
    {
      id: 1,
      student: "Adhamov Shohruh Rasul o'g'li",
      group: "IO'M-19/2",
      subject: "Flash texnologiyalari",
    },
    {
      id: 2,
      student: "Adhamov Shohruh Rasul o'g'li",
      group: "IO'M-19/2",
      subject: "",
    },
    {
      id: 3,
      student: "Adhamov Shohruh Rasul o'g'li",
      group: "IO'M-19/2",
      subject: "Flash texnologiyalari",
    },
    {
      id: 4,
      student: "Adhamov Shohruh Rasul o'g'li",
      group: "IO'M-19/2",
      subject: "",
    },
    {
      id: 5,
      student: "Adhamov Shohruh Rasul o'g'li",
      group: "IO'M-19/2",
      subject: "Flash texnologiyalari",
    },
    {
      id: 6,
      student: "Adhamov Shohruh Rasul o'g'li",
      group: "IO'M-19/2",
      subject: "Flash texnologiyalari",
    },
  ],
  tableSubjectTopics: [
    {
      id: 1,
      subject: "Ta'limda axborot texnologiyalari",
      curriculm: "IO'M(kunduzgi)_2021-2022",
      educationYear: "2021-2022",
      semester: "2-semester",
      educationType: "Bakalavr",
      status: "Ochiq",
      employee: "Qo'shqarov Sabriddin Rutamovich",
      faculty: "Matematika va informatika",
      department: "Informatika texnologiyalari",
      educationForm: "Kunduzgi",
      subjectType: "Majburiy",
      group: "MI_21-2",
      lessonPair: "1. 09:00-10:20",
      date: "21.01.2023",
      training: [
        {
          id: 1,
          name: "Maruza",
          time: 30,
          theme: [
            {
              id: 1,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 2,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 3,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
          ],
        },
        {
          id: 1,
          name: "Amlaiy",
          time: 30,
          theme: [
            {
              id: 1,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 2,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 3,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      subject: "Ta'limda axborot texnologiyalari",
      curriculm: "IO'M(kunduzgi)_2021-2022",
      educationYear: "2021-2022",
      semester: "2-semester",
      educationType: "Bakalavr",
      status: "Ochiq",
      employee: "Qo'shqarov Sabriddin Rutamovich",
      faculty: "Matematika va informatika",
      department: "Informatika texnologiyalari",
      educationForm: "Kunduzgi",
      subjectType: "Majburiy",
      group: "MI_21-2",
      lessonPair: "1. 09:00-10:20",
      date: "21.01.2023",
      training: [
        {
          id: 1,
          name: "Maruza",
          time: 6,
          theme: [
            {
              id: 1,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 2,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 3,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
          ],
        },
        {
          id: 1,
          name: "Amlaiy",
          time: 12,
          theme: [
            {
              id: 1,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 2,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 3,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 4,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 5,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 6,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
          ],
        },
        {
          id: 1,
          name: "Labarato'riya",
          time: 8,
          theme: [
            {
              id: 1,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 2,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
            {
              id: 3,
              name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
            },
          ],
        },
      ],
    },
  ],
  tableTopics: [
    {
      id: 1,
      name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
      type: "Amaliy",
      hours: 2,
      semester: "1-semestr",
      lessonDate: "12.10.2022",
      checked: null,
      active: true,
    },
    {
      id: 2,
      name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
      type: "Amaliy",
      hours: 2,
      semester: "1-semestr",
      lessonDate: "12.10.2022",
      checked: null,
      active: true,
    },
    {
      id: 3,
      name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
      type: "Amaliy",
      hours: 2,
      semester: "1-semestr",
      lessonDate: "12.10.2022",
      checked: null,
      active: true,
    },
    {
      id: 4,
      name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
      type: "Amaliy",
      hours: 2,
      semester: "1-semestr",
      lessonDate: "12.10.2022",
      checked: null,
      active: true,
    },
    {
      id: 5,
      name: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar",
      type: "Amaliy",
      hours: 2,
      semester: "1-semestr",
      lessonDate: "12.10.2022",
      checked: null,
      active: true,
    },
  ],
  tableCalendarPlan: [
    {
      id: 1,
      name: "Kompyuter ta'minoti",
      curriculum: "MI(kunduzgi)_2021-2022",
      group: "MI-21/1",
      language: "O'zbek",
      type: "Amaliy",
      employee: "BOYMURODOV A. X",
      semester: "3-semester",
      educationYear: "2022-2021",
    },
  ],
  tableDAkMember: [
    {
      id: 1,
      memeberName: "R.A. Ikramov",
      DAKname: "DAK_TO'M_1",
      workPlase: "Toshkent viloyati Chirchiq davlat pedagogika instituti",
      position: "Gumanitar fanlar fakulteti dekani",
      role: "Rais o'rinbosari",
    },
    {
      id: 2,
      memeberName: "R.A. Ikramov",
      DAKname: "DAK_TO'M_1",
      workPlase: "Toshkent viloyati Chirchiq davlat pedagogika instituti",
      position: "Gumanitar fanlar fakulteti dekani",
      role: "Rais o'rinbosari",
    },
    {
      id: 3,
      memeberName: "R.A. Ikramov",
      DAKname: "DAK_TO'M_1",
      workPlase: "Toshkent viloyati Chirchiq davlat pedagogika instituti",
      position: "Gumanitar fanlar fakulteti dekani",
      role: "Rais o'rinbosari",
    },
  ],
  tableDak: [
    {
      id: 1,
      name: "	DAK_MO'M_1",
      type: "Imtihon",
      educationType: "Bakalavr",
      specialty: "51001234",
      department: "Matematika o'qitish metodikasi va geometriya",
      educationYear: "2020-2021",
      memebersCount: 7,
      active: true,
    },
    {
      id: 2,
      name: "	DAK_MO'M_1",
      type: "Imtihon",
      educationType: "Bakalavr",
      specialty: "51001234",
      department: "Matematika o'qitish metodikasi va geometriya",
      educationYear: "2020-2021",
      memebersCount: 7,
      active: true,
    },
    {
      id: 3,
      name: "	DAK_MO'M_1",
      type: "Imtihon",
      educationType: "Bakalavr",
      specialty: "51001234",
      department: "Matematika o'qitish metodikasi va geometriya",
      educationYear: "2020-2021",
      memebersCount: 7,
      active: true,
    },
  ],
  tableGraduteWork: [
    {
      id: 1,
      student: "XOLDAROVA FOTIMAXON MAXAMMADJON QIZI",
      educationType: "Magistr",
      specialty: "5A110101 (2021-2022)",
      group: "ATFO'M(matem)-20/1",
      workName:
        "Modern methods of teaching planimetry elements in general secondary schools using information and communication technologies",
      supervisorName: "Jurayeva Nilufar Vayitovna",
      active: true,
    },
    {
      id: 2,
      student: "XOLDAROVA FOTIMAXON MAXAMMADJON QIZI",
      educationType: "Magistr",
      specialty: "5A110101 (2021-2022)",
      group: "ATFO'M(matem)-20/1",
      workName:
        "Modern methods of teaching planimetry elements in general secondary schools using information and communication technologies",
      supervisorName: "Jurayeva Nilufar Vayitovna",
      active: true,
    },
    {
      id: 3,
      student: "XOLDAROVA FOTIMAXON MAXAMMADJON QIZI",
      educationType: "Magistr",
      specialty: "5A110101 (2021-2022)",
      group: "ATFO'M(matem)-20/1",
      workName:
        "Modern methods of teaching planimetry elements in general secondary schools using information and communication technologies",
      supervisorName: "Jurayeva Nilufar Vayitovna",
      active: false,
    },
  ],
  tableOlimpiad: [
    {
      id: 1,
      student: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      name: "Yengil atletika",
      contestType: "Xalqaro darajada",
      country: "Yaponiya",
      city: "Tokio shaxrida",
      winnerPlase: "1",
      diplomaCeria: "D",
      diplomaNumber: "123321",
      createdAt: "12.12.2022 23:12:45",
      educationYear: "2022-2023",
    },
    {
      id: 2,
      student: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      name: "Yengil atletika",
      contestType: "Xalqaro darajada",
      country: "Yaponiya",
      city: "Tokio shaxrida",
      winnerPlase: "1",
      diplomaCeria: "D",
      diplomaNumber: "123321",
      createdAt: "12.12.2022 23:12:45",
      educationYear: "2022-2023",
    },
    {
      id: 3,
      student: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      name: "Yengil atletika",
      contestType: "Xalqaro darajada",
      country: "Yaponiya",
      city: "Tokio shaxrida",
      winnerPlase: "1",
      diplomaCeria: "D",
      diplomaNumber: "123321",
      createdAt: "12.12.2022 23:12:45",
      educationYear: "2022-2023",
    },
    {
      id: 4,
      student: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      name: "Yengil atletika",
      contestType: "Xalqaro darajada",
      country: "Yaponiya",
      city: "Tokio shaxrida",
      winnerPlase: "1",
      diplomaCeria: "D",
      diplomaNumber: "123321",
      createdAt: "12.12.2022 23:12:45",
      educationYear: "2022-2023",
    },
  ],
  tableProjectInfo: [
    {
      id: 1,
      name: "C++ da dasturlash asoslari",
      authors: "Исмоилов А.А., Юсупов Р.А., Хуррамом А.Ж.",
      year: "2021",
      type: "O'quv qo'llanma",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      fileName: "С++ da dasturlash asoslari.pdf",
      checkedAuthor: {
        type: true,
      },
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      action: true,
      projectNumber: "BF-G4-21",
      faculty: "Informatifa va axborot texnologiyalari",
      projectType: "Pundamental (umumiy)",
      projectForm: "Hududdiy",
      date: "10.10.2021",
      startAt: "11.10.2021",
      endAt: "12.10.2022",
      currency: "So'm",
    },
  ],
  tablePublication: [
    {
      id: 1,
      name: "C++ da dasturlash asoslari",
      authors: "Исмоилов А.А., Юсупов Р.А., Хуррамом А.Ж.",
      year: "2021",
      type: "O'quv qo'llanma",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      fileName: "С++ da dasturlash asoslari.pdf",
      checkedAuthor: {
        type: true,
      },
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      action: true,
      projectNumber: "BF-G4-21",
      faculty: "Informatifa va axborot texnologiyalari",
      projectType: "Pundamental (umumiy)",
      projectForm: "Hududdiy",
      startAt: "11.10.2021",
      endAt: "12.10.2022",
      currency: "So'm",
    },
    {
      id: 2,
      name: "C++ da dasturlash asoslari",
      authors: "Исмоилов А.А., Юсупов Р.А., Хуррамом А.Ж.",
      year: "2021",
      type: "O'quv qo'llanma",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      fileName: "С++ da dasturlash asoslari.pdf",
      checkedAuthor: {
        type: true,
      },
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      action: true,
      projectNumber: "BF-G4-21",
      faculty: "Informatifa va axborot texnologiyalari",
      projectType: "Pundamental (umumiy)",
      projectForm: "Hududdiy",
      startAt: "11.10.2021",
      endAt: "12.10.2022",
      currency: "So'm",
    },
    {
      id: 3,
      name: "C++ da dasturlash asoslari",
      authors: "Исмоилов А.А., Юсупов Р.А., Хуррамом А.Ж.",
      year: "2021",
      type: "O'quv qo'llanma",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      fileName: "С++ da dasturlash asoslari.pdf",
      checkedAuthor: {
        type: false,
      },
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      action: true,
      projectNumber: "BF-G4-21",
      faculty: "Informatifa va axborot texnologiyalari",
      projectType: "Pundamental (umumiy)",
      projectForm: "Hududdiy",
      startAt: "11.10.2021",
      endAt: "12.10.2022",
      currency: "So'm",
    },
  ],
  tablePublicationName: [
    {
      id: 1,
      name: "C++ da dasturlash asoslari",
      type: "O'quv qo'llanma",
      counts: 4,
      authors: "Исмоилов А.А., Юсупов Р.А., Хуррамом А.Ж.",
      publisher: "ЎзМУ",
      issueYear: "2021",
      educationYear: "2020-2021",
      parameter: "100 nusxada",
      certificateNumber: "234",
      certificateDate: "02.02.2021",
      fileName: "С++ da dasturlash asoslari.pdf",
      createdAt: "02.10.2021 11:25:53",
      updatedAt: "29.10.2021 16:27:04",
      keywords: "mathematical model, unsteady flow of water",
    },
  ],
  tableActivity: [
    {
      id: 1,
      scientificPlatform: "Google Scholar",
      profileLink:
        "https://cyberleninka.ru/article/n/ustoz-tyutor-talaba-ilmiy-faoliyati",
      h_index: 3,
      publicationWorkCount: 6,
      citationCount: 12,
      employee: "SULTANOV RAVSHONBEK OTONAZAROVICH",
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      active: true,
      educationYear: "2021-2022",
    },
    {
      id: 2,
      scientificPlatform: "Google Scholar",
      profileLink:
        "https://cyberleninka.ru/article/n/ustoz-tyutor-talaba-ilmiy-faoliyati",
      h_index: 3,
      publicationWorkCount: 6,
      citationCount: 12,
      employee: "SULTANOV RAVSHONBEK OTONAZAROVICH",
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      active: false,
      educationYear: "2021-2022",
    },
    {
      id: 3,
      scientificPlatform: "Google Scholar",
      profileLink:
        "https://cyberleninka.ru/article/n/ustoz-tyutor-talaba-ilmiy-faoliyati",
      h_index: 3,
      publicationWorkCount: 6,
      citationCount: 12,
      employee: "SULTANOV RAVSHONBEK OTONAZAROVICH",
      updateData: "02.10.2022",
      updateTime: "11:23:45",
      active: true,
      educationYear: "2021-2022",
    },
  ],
  optionsLessons: [
    {
      id: 1,
      years: 2022,
      month: 11,
      date: 3,
      lessonPair: "13:30 - 14:50",
      trainingType: "Maruza",
      subject: "Umumiy psixologiya",
      employee: "ALIJONOV ALISHER ALMARDONOVICH",
      auditorium: "305(BB)",
    },
    {
      id: 2,
      years: 2022,
      month: 10,
      date: 3,
      lessonPair: "13:30 - 14:50",
      trainingType: "Maruza",
      subject: "Umumiy psixologiya",
      employee: "ALIJONOV ALISHER ALMARDONOVICH",
      auditorium: "305(BB)",
    },
    {
      id: 4,
      years: 2022,
      month: 11,
      date: 3,
      lessonPair: "13:30 - 14:50",
      trainingType: "Maruza",
      subject: "Umumiy psixologiya",
      employee: "ALIJONOV ALISHER ALMARDONOVICH",
      auditorium: "305(BB)",
    },
    {
      id: 5,
      years: 2022,
      month: 11,
      date: 4,
      lessonPair: "13:30 - 14:50",
      trainingType: "Maruza",
      subject: "Umumiy psixologiya",
      employee: "ALIJONOV ALISHER ALMARDONOVICH",
      auditorium: "305(BB)",
    },
    {
      id: 6,
      years: 2023,
      month: 11,
      date: 4,
      lessonPair: "13:30 - 14:50",
      trainingType: "Maruza",
      subject: "Umumiy psixologiya",
      employee: "ALIJONOV ALISHER ALMARDONOVICH",
      auditorium: "305(BB)",
    },
  ],
  tableTrainingList: [
    {
      id: 1,
      educationYear: "2022-2023",
      semester: "7-semester",
      group: "IO'M-19/3",
      lessonDate: {
        date: "06-09-2022",
        status: false,
      },
      subject: "Informatika o'qitish metodikasi",
      trainingType: "Maruza",
      lessonPair: "7.18:00-19:20",
      auditorium: "211(BB)-xona",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      exsamType1: "ORALIQ NAZORAT",
      exsamType2: "YAKUNIY NAZORAT",
      exsamType3: "UMUMIY",
      qaydnoma: "1-qaydnoma",
    },
    {
      id: 2,
      educationYear: "2022-2023",
      semester: "7-semester",
      group: "IO'M-19/3",
      lessonDate: {
        date: "06-09-2022",
        status: true,
      },
      subject: "Informatika o'qitish metodikasi",
      trainingType: "Maruza",
      lessonPair: "7.18:00-19:20",
      auditorium: "211(BB)-xona",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      exsamType1: "ORALIQ NAZORAT",
      exsamType2: "YAKUNIY NAZORAT",
      exsamType3: "UMUMIY",
      qaydnoma: "1-qaydnoma",
    },
    {
      id: 3,
      educationYear: "2022-2023",
      semester: "7-semester",
      group: "IO'M-19/3",
      lessonDate: {
        date: "06-09-2022",
        status: true,
      },
      subject: "Informatika o'qitish metodikasi",
      trainingType: "Maruza",
      lessonPair: "7.18:00-19:20",
      auditorium: "211(BB)-xona",
      employee: "BOYMURODOV ADHAM XUSHIMQULOVICH",
      exsamType1: "ORALIQ NAZORAT",
      exsamType2: "YAKUNIY NAZORAT",
      exsamType3: "UMUMIY",
      qaydnoma: "1-qaydnoma",
    },
  ],
  tableChekLessonInfo: [
    {
      id: 1,
      division: "Boshlang'ich ta'lim metodikasi",
      faculty: "Boshlang'ich ta'lim",
      subject: "Matematika o'qitish metodikasi",
      curriculum: "BOT(kunduzgi)_2019-2020",
      educationForm: "Bakalavr",
      educationType: "Kunduzgi",
      trainingType: "Maruza",
      semester: "5-semester",
      topics: "8",
      qaydnoma: "1-qaydnoma",
      examType: "Oraliq nazorat [5]",
      resourcesCount: 17,
      tasksCount: 0,
      date: "09-10-2022",
      group: "MI-20/7",
      gradeType: "5 baholik baholash tizimi",
    },
  ],
  optionsSelectExam: [
    {
      id: 1,
      name: "Amaliy dasturlar paketi",
      subject: "Amaliy dasturlar paketi",
      examType: "Yakuniy nazorat",
      teacher: "ABDURAIMOV J. G‘.",
      groups: "MI(k)-20/1, MI(k)-20/2, MI(k)-20/3",
      startAt: "31.01.2022 18:00",
      endAt: "03.02.2022 18:00",
    },
  ],
  tableSubjectResource: [
    {
      id: 1,
      titie: "Flash dasturida oddiy harakatli animatsiyalar yaratish",
      language: "Uzbek",
      curriculmSubject: "Flash technologies",
      semester: "7-semestr",
      trainingType: "Labarato'riya",
      employee: "SULTANOV R. O.",
      files: "1",
      createdAt: "10.111.2022 13:25:23",
      active: true,
    },
    {
      id: 2,
      titie: "Flash dasturida oddiy harakatli animatsiyalar yaratish",
      language: "Uzbek",
      curriculmSubject: "Flash technologies",
      semester: "7-semestr",
      trainingType: "Labarato'riya",
      employee: "SULTANOV R. O.",
      files: "1",
      createdAt: "10.111.2022 13:25:23",
      active: true,
    },
    {
      id: 3,
      titie: "Flash dasturida oddiy harakatli animatsiyalar yaratish",
      language: "Uzbek",
      curriculmSubject: "Flash technologies",
      semester: "7-semestr",
      trainingType: "Labarato'riya",
      employee: "SULTANOV R. O.",
      files: "1",
      createdAt: "10.111.2022 13:25:23",
      active: true,
    },
    {
      id: 4,
      titie: "Flash dasturida oddiy harakatli animatsiyalar yaratish",
      language: "Uzbek",
      curriculmSubject: "Flash technologies",
      semester: "7-semestr",
      trainingType: "Labarato'riya",
      employee: "SULTANOV R. O.",
      files: "1",
      createdAt: "10.111.2022 13:25:23",
      active: true,
    },
  ],
  tableSubjectTasks: [
    {
      id: 1,
      subject: "Amaliy dasturlar paketi",
      curriculm: "MI(kunduzgi)_2021-2022",
      groups: [
        { value: "MI-21/1" },
        { value: "MI-21/2" },
        { value: "MI-21/3" },
      ],
      trainingType: "Amaliy",
      tasks: 0,
      semester: "3-semestr",
      educationYear: "2022-2023",
      educationLanguage: "O‘zbek",
    },
    {
      id: 2,
      subject: "Amaliy dasturlar paketi",
      curriculm: "MI(kunduzgi)_2021-2022",
      groups: [
        { value: "MI-21/1" },
        { value: "MI-21/2" },
        { value: "MI-21/3" },
      ],
      trainingType: "Amaliy",
      tasks: 0,
      semester: "3-semestr",
      educationYear: "2022-2023",
      educationLanguage: "O‘zbek",
    },
  ],
  tableTasksList: [
    {
      id: 1,
      taskName: "Topshiriq-1",
      taskType: "Topshiriq",
      taskStatus: "Yopiq",
      grade: "5 ball",
      examType: "Oraliq nazorat",
      question: {
        type: true,
        count: 1,
      },
      deadline: "26.10.2022 23:00",
      newStudent: "1",
      students: "23",
      answered: "12",
      evaluated: "3",
    },
    {
      id: 2,
      taskName: "Topshiriq-1",
      taskType: "Topshiriq",
      taskStatus: "Yopiq",
      grade: "5 ball",
      examType: "Oraliq nazorat",
      question: {
        type: false,
        count: 2,
      },
      deadline: "26.10.2022 23:00",
      newStudent: "1",
      students: "23",
      answered: "12",
      evaluated: "3",
    },
  ],
  tableStudentsSendTasks: [
    {
      id: 1,
      student: "ABDULLAYEVA TANZILA FAXRIDDINOVNA",
      group: "BOT-22/6 (t)",
      status: "Berilmagan",
      data: "13.10.2022 12:20",
    },
    {
      id: 2,
      student: "ABDULLAYEVA TANZILA FAXRIDDINOVNA",
      group: "BOT-22/6 (t)",
      status: "Berilmagan",
      data: "13.10.2022 12:20",
    },
  ],
  tableTasksAnswer: [
    {
      id: 1,
      group: "MI-20/1",
      student: "ABDULLAYEVA TANZILA FAXRIDDINOVNA",
      status: -1,
      examType: "1-qaydnoma",
      grade: "0",
      date: "12.09.2022 13:45",
    },
    {
      id: 2,
      group: "MI-20/1",
      student: "ABDULLAYEVA TANZILA FAXRIDDINOVNA",
      status: 1,
      examType: "1-qaydnoma",
      grade: "4",
      date: "12.09.2022 13:45",
    },
    {
      id: 2,
      group: "MI-20/1",
      student: "ABDULLAYEVA TANZILA FAXRIDDINOVNA",
      status: 0,
      examType: "1-qaydnoma",
      grade: "0",
      date: "12.09.2022 13:45",
    },
  ],
  tablePerformance: [
    {
      id: 1,
      group: "BOT(S)-19/10(t)",
      subjects: "Boshlang'ich ta'lim pedagogikasi innovatsiya va integratsiya",
      examType: "ORALIQ NAZORAT",
      qaydnomaType: "1-qaydnoma",
      educationYear: "2022-2023",
      semester: "7-semestr",
    },
    {
      id: 2,
      group: "BOT(S)-19/10(t)",
      subjects: "Boshlang'ich ta'lim pedagogikasi innovatsiya va integratsiya",
      examType: "ORALIQ NAZORAT",
      qaydnomaType: "1-qaydnoma",
      educationYear: "2022-2023",
      semester: "7-semestr",
    },
    {
      id: 3,
      group: "BOT(S)-19/10(t)",
      subjects: "Boshlang'ich ta'lim pedagogikasi innovatsiya va integratsiya",
      examType: "ORALIQ NAZORAT",
      qaydnomaType: "1-qaydnoma",
      educationYear: "2022-2023",
      semester: "7-semestr",
    },
    {
      id: 4,
      group: "BOT(S)-19/10(t)",
      subjects: "Boshlang'ich ta'lim pedagogikasi innovatsiya va integratsiya",
      examType: "ORALIQ NAZORAT",
      qaydnomaType: "1-qaydnoma",
      educationYear: "2022-2023",
      semester: "7-semestr",
    },
  ],
  tableByEmployment: [
    {
      id: "II",
      indicators:
        "Iqtisodiyot sohalari bo‘yicha ishga joylashish, shu jumladan:",
      pieceOfIndicators: [
        {
          id: 1,
          name: "Xalq ta’limi tizimida",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 2,
          name: "O‘rta maxsus ta’lim tizimida (AL)",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 3,
          name: "	O‘rta maxsus ta’lim tizimida (KHK)",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 4,
          name: "	Oliy ta’lim tizimida",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
      ],
    },
    {
      id: "III",
      indicators: "Ishga joylashish jarayonidagi bitiruvchilar, shu jumladan",
      pieceOfIndicators: [
        {
          id: 1,
          name: "Xalq ta’limi tizimida",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 2,
          name: "O‘rta maxsus ta’lim tizimida (AL)",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 3,
          name: "	O‘rta maxsus ta’lim tizimida (KHK)",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 4,
          name: "	Oliy ta’lim tizimida",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
      ],
    },
    {
      id: "I",
      indicators:
        "Iqtisodiyot sohalari bo‘yicha ishga joylashish, shu jumladan:",
      pieceOfIndicators: [
        {
          id: 1,
          name: "Xalq ta’limi tizimida",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 2,
          name: "O‘rta maxsus ta’lim tizimida (AL)",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 3,
          name: "	O‘rta maxsus ta’lim tizimida (KHK)",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
        {
          id: 4,
          name: "	Oliy ta’lim tizimida",
          areas: {
            bachelorCount: 12,
            bachelorWomens: 3,
            bachelorGarnt: 2,
            bachelorContract: 3,
            magistrCount: 12,
            magistrWomens: 3,
            magistrGarnt: 2,
            magistrContract: 3,
            allCount: 12,
            allWomens: 3,
          },
        },
      ],
    },
  ],
  tableFinancialInformation: [
    {
      id: 1,
      year: "2021",
      budget: "10000000.000",
      count: "3",
    },
    {
      id: 2,
      year: "2021",
      budget: "10000000.000",
      count: "3",
    },
    {
      id: 3,
      year: "2021",
      budget: "10000000.000",
      count: "3",
    },
  ],
  tablePerformerInformation: [
    {
      id: 1,
      type: "O'qituvchi",
      category: "Loyiha rahbari",
      secondName: "Salimboyeb A. D.",
      startDate: "12.10.2021",
      endDate: "12.10.2022",
    },
    {
      id: 2,
      type: "O'qituvchi",
      category: "Loyiha rahbari",
      secondName: "Salimboyeb A. D.",
      startDate: "12.10.2021",
      endDate: "12.10.2022",
    },
    {
      id: 3,
      type: "O'qituvchi",
      category: "Loyiha rahbari",
      secondName: "Salimboyeb A. D.",
      startDate: "12.10.2021",
      endDate: "12.10.2022",
    },
  ],
  tableSpecialty: [
    {
      id: 1,
      code: "01.01.02",
      name: "Organik moddalar va ular asosidagi materiallar texnologiyasi",
    },
    {
      id: 2,
      code: "01.01.02",
      name: "Organik moddalar va ular asosidagi materiallar texnologiyasi",
    },
    {
      id: 3,
      code: "01.01.02",
      name: "Organik moddalar va ular asosidagi materiallar texnologiyasi",
    },
  ],
  tableStudentDoctorate: [
    {
      id: 1,
      IDnumber: "354211400002",
      lastName: "ISLOMOV SAN’AT MASH’AL O‘G‘LI",
      specialty: "01.01.01",
      studentType: "PhD doktorant",
      passportNumber: "AA000000",
      birthDate: "12.23.1990",
      updatedAt: "21.10.2022 21:49:40",
    },
    {
      id: 2,
      IDnumber: "354211400002",
      lastName: "ISLOMOV SAN’AT MASH’AL O‘G‘LI",
      specialty: "01.01.01",
      studentType: "PhD doktorant",
      passportNumber: "AA000000",
      birthDate: "12.23.1990",
      updatedAt: "21.10.2022 21:49:40",
    },
    {
      id: 3,
      IDnumber: "354211400002",
      lastName: "ISLOMOV SAN’AT MASH’AL O‘G‘LI",
      specialty: "01.01.01",
      studentType: "PhD doktorant",
      passportNumber: "AA000000",
      birthDate: "12.23.1990",
      updatedAt: "21.10.2022 21:49:40",
    },
  ],
  tableDoctorate: [
    {
      id: 1,
      IDnumber: "354211400002",
      firstName: "ISLOMOV",
      lastName: "SAN’AT",
      secondName: "MASH’AL O‘G‘LI",
      jshshirKode: "32701911570017",
      specialty: "Astronomiya",
      studentType: "PhD doktorant",
      passportNumber: "AA000000",
      birthDate: "12.23.1990",
      createdAt: "21.10.2022 21:49:40",
      updatedAt: "21.10.2022 21:49:40",
      //-----------------
      defensePlace: "Термиз давлат университети",
      defenseDate: "18-03-2022",
      diplomaNumber: "01 № 006836",
      approvedDate: "	30-04-2022",
      registerNumber: "6613",
      scientificCouncil: "PhD.03/30.12.2019.Tar.78.02",
      diplomaGivenByWhom: "Ўзбекистон республикаси Олий аттестация комиссияси",
    },
  ],
  tableEnterIstoriya: [
    {
      id: 1,
      ip: "192.168.150.235",
      login: "zaxiya_narimbetova",
      status: "Muvaffaqiyatsiz",
      createdAt: "01.11.2022 14:46:08",
    },
    {
      id: 2,
      ip: "192.168.150.235",
      login: "zaxiya_narimbetova",
      status: "Muvaffaqiyatsiz",
      createdAt: "01.11.2022 14:46:08",
    },
    {
      id: 3,
      ip: "192.168.150.235",
      login: "zaxiya_narimbetova",
      status: "Muvaffaqiyatsiz",
      createdAt: "01.11.2022 14:46:08",
    },
    {
      id: 4,
      ip: "192.168.150.235",
      login: "zaxiya_narimbetova",
      status: "Muvaffaqiyatsiz",
      createdAt: "01.11.2022 14:46:08",
    },
  ],
  //tizim ro'llari
  tableUserRoles: [
    {
      id: 1,
      name: "Moliya-nazorat",
      code: "finance_control",
    },
    {
      id: 2,
      name: "Buxgalteriya",
      code: "accounting",
    },
    {
      id: 3,
      name: "Yotoqxona",
      code: "	dormitory",
    },
    {
      id: 4,
      name: "Super Administrator",
      code: "super_admin",
    },
    {
      id: 5,
      name: "Ilmiy bo'lim",
      code: "science",
    },
    {
      id: 6,
      name: "Doktorantura bo'limi",
      code: "doctorate",
    },
    {
      id: 7,
      name: "Tyutor",
      code: "tutor",
    },
    {
      id: 8,
      name: "Dekan",
      code: "dean",
    },
    {
      id: 9,
      name: "Kafedra mudiri",
      code: "department",
    },
    {
      id: 10,
      name: "O'qituvchi",
      code: "teacher",
    },
    {
      id: 11,
      name: "O'quv bo'limi",
      code: "academic_board",
    },
    {
      id: 12,
      name: "Marketing",
      code: "marketing",
    },
    {
      id: 13,
      name: "Kutubxona",
      code: "librarian",
    },
    {
      id: 14,
      name: "Kadrlar bo'limi",
      code: "staff",
    },
    {
      id: 15,
      name: "Rahbariyat",
      code: "direction",
    },
  ],
  optionsRol: [
    {
      id: 1,
      kode: "accounting",
      name: "Buxgalteriya",
      status: "Faol",
      createdAt: "19.09.2022 15:01:36",
      editAt: "26.10.2022 21:18:22",
    },
    {
      id: 2,
      kode: "accounting",
      name: "Buxgalteriya",
      status: "Faol",
      createdAt: "19.09.2022 15:01:36",
      editAt: "26.10.2022 21:18:22",
    },
    {
      id: 3,
      kode: "accounting",
      name: "Buxgalteriya",
      status: "Faol",
      createdAt: "19.09.2022 15:01:36",
      editAt: "26.10.2022 21:18:22",
    },
    {
      id: 4,
      kode: "accounting",
      name: "Buxgalteriya",
      status: "Faol",
      createdAt: "19.09.2022 15:01:36",
      editAt: "26.10.2022 21:18:22",
    },
  ],
  optionsResourse: [
    {
      id: 1,
      group: "Archive",
      name: "Akad. ma'lumotnoma",
      way: "archive/academic-information",
      createAt: "28.07.2021 13:01:22",
    },
    {
      id: 2,
      group: "Archive",
      name: "Akad. ma'lumotnoma",
      way: "archive/academic-information",
      createAt: "28.07.2021 13:01:22",
    },
    {
      id: 3,
      group: "Archive",
      name: "Akad. ma'lumotnoma",
      way: "archive/academic-information",
      createAt: "28.07.2021 13:01:22",
    },
    {
      id: 3,
      group: "Archive",
      name: "Akad. ma'lumotnoma",
      way: "archive/academic-information",
      createAt: "28.07.2021 13:01:22",
    },
  ],
  optionsSport: [
    {
      id: 1,
      student: "Abdullayeva Sanobar Rahim qizi",
      studentId: "123456789012",
      educationYear: "2022-2023",
      sporttype: "Alpinizm",
      date: "12.10.2022",
      razryad: "1",
      documentSeria: "D123321",
    },
    {
      id: 2,
      student: "Abdullayeva Sanobar Rahim qizi",
      studentId: "123456789012",
      educationYear: "2022-2023",
      sporttype: "Alpinizm",
      date: "12.10.2022",
      razryad: "1",
      documentSeria: "D123321",
    },
    {
      id: 3,
      student: "Abdullayeva Sanobar Rahim qizi",
      studentId: "123456789012",
      educationYear: "2022-2023",
      sporttype: "Alpinizm",
      date: "12.10.2022",
      razryad: "1",
      documentSeria: "D123321",
    },
    {
      id: 4,
      student: "Abdullayeva Sanobar Rahim qizi",
      studentId: "123456789012",
      educationYear: "2022-2023",
      sporttype: "Alpinizm",
      date: "12.10.2022",
      razryad: "1",
      documentSeria: "D123321",
    },
  ],
  tableAttendanceSetting: [
    {
      id: 1,
      minBorder: "12",
      attendanceSetting: "Ogohlantrish",
      markingSystem: "5 baholik baholash tizimi",
    },
    {
      id: 2,
      minBorder: "12",
      attendanceSetting: "Ogohlantrish",
      markingSystem: "5 baholik baholash tizimi",
    },
    {
      id: 3,
      minBorder: "12",
      attendanceSetting: "Ogohlantrish",
      markingSystem: "5 baholik baholash tizimi",
    },
    {
      id: 4,
      minBorder: "12",
      attendanceSetting: "Ogohlantrish",
      markingSystem: "5 baholik baholash tizimi",
    },
  ],
  tableExchangeStudent: [
    {
      id: 1,
      secondName: "ORTIQOVA SHAXZODA ROVASHAN QIZI",
      educationYear: "2022-2023",
      educationType: "Bakalavr",
      exchangeType: "Ketgan talaba",
      otm: "Oksfort universiteti",
      country: "Amerika Qo'shma Shtatlari",
      docunemt: "15/ 12.11.2022",
      createdAt: "12.11.2022 12:24:45",
    },
    {
      id: 2,
      secondName: "ORTIQOVA SHAXZODA ROVASHAN QIZI",
      educationYear: "2022-2023",
      educationType: "Bakalavr",
      exchangeType: "Ketgan talaba",
      otm: "Oksfort universiteti",
      country: "Amerika Qo'shma Shtatlari",
      docunemt: "15/ 12.11.2022",
      createdAt: "12.11.2022 12:24:45",
    },
  ],
};
export { allDate, allTables };
