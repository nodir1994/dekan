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
export {
    advecedTraining,
    filtersTable,
    tableEmployee,
}
console.log(advecedTraining.employeePosition[1], "asdadas");