import{d as U,a as Y,Z as h,y as I,w as k,i as r,o as g,e as P,f as l,j as t,k as o,z as b,t as m}from"./index.3390162f.js";import{k as $,L as E,H,M as j}from"./index.30e99442.js";const N={pagetitle:"'Xaftaliklar'",class:"createExam"},O={class:"card panel-header-bg"},q={class:"card-body"},B={class:"panel-header"},M={class:"card-title"},S={class:"panel-toggles"},C={class:"btns black-c py-1.5 px-4",type:"submit"},T=l("i",{class:"mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"},null,-1),z={class:"card"},D={class:"card-body"},L={class:"row"},V={class:"col-md-6"},A={for:"otm-name-input",class:"form-label"},R=l("label",{for:"akkreditasiya-info-input",class:"form-label"},"Izoh",-1),F={class:"mb-3",name:"trainingPlan"},X={for:"fakultet-sort-input",class:"form-label"},Z={class:"row"},G={class:"col-md-6"},J={for:"fakultet-sort-input",class:"form-label"},K={class:"col-md-6"},Q={for:"fakultet-sort-input",class:"form-label"},W={class:"col-md-6"},ee={class:"row"},ae=l("label",{for:"fakultet-sort-input",class:"form-label"},"Nazorat turi",-1),te=l("label",{for:"fakultet-sort-input",class:"form-label"},"Faol",-1),le=l("label",{for:"fakultet-sort-input",class:"form-label"},"Boshlanish",-1),se=l("label",{for:"fakultet-sort-input",class:"form-label"},"Tugash",-1),oe=l("label",{for:"otm-name-input",class:"form-label"},"Vaqti (daqiqa)",-1),ne=l("label",{for:"otm-name-input",class:"form-label"},"Max.ball",-1),de=l("label",{for:"otm-name-input",class:"form-label"},"Urinishlar",-1),ie=l("label",{for:"otm-name-input",class:"form-label"},"Savollar soni",-1),ue=l("label",{for:"fakultet-sort-input",class:"form-label"},"Tasodifiy",-1),me={for:"fakultet-sort-input",class:"form-label"},re={class:"d-flex justify-content-end"},ce={type:"submit",class:"btns c-save py-2 px-4"},be=U({__name:"create",setup(_e){const{t:p}=Y(),e=h({name:"",exam_type_id:null,edu_plan_id:null,academic_year_id:null,subject_id:null,semester_id:null,employee_id:null,datetime_start:"",datetime_end:"",duration:null,max_ball:null,attemps_count:null,questions_count:null,randomable:null,comment:"",status:null}),v={res:[{id:!0,name:p("yes")},{id:!1,name:p("No")}],ran:[{id:!0,name:p("yes")},{id:!1,name:p("No")}]},c=h({academicYearOption:null,eduPlanIdOption:null,semesterId:null,subjectId:null});return I(async()=>{c.eduPlanIdOption=await $().then(n=>{var a;return(a=n.result)==null?void 0:a.data})}),k(()=>e.edu_plan_id,async()=>{let n=await E(e.edu_plan_id).then(u=>{var i;return(i=u.result)==null?void 0:i.data.map(f=>({id:f.id,name:f.semester+`- ${p("semester")}`}))});c.semesterId=n;let a=await H(e.edu_plan_id).then(u=>{var i;return(i=u.result)==null?void 0:i.data});c.academicYearOption=a}),k(()=>e.semester_id,async()=>{let n=await j(e.edu_plan_id).then(a=>{var u;return(u=a.result)==null?void 0:u.data});c.semesterId=n}),(n,a)=>{const u=r("router-link"),i=r("a-input"),f=r("a-space"),d=r("a-form-item"),w=r("a-textarea"),_=r("a-select"),y=r("a-date-picker"),x=r("a-form");return g(),P("div",N,[l("div",O,[l("div",q,[l("div",B,[l("h5",M,[t(u,{to:"/curriculum/exams"},{default:o(()=>[b(m(n.$t("Report_By_Exam"))+" / ",1)]),_:1}),b(m(n.$t("Create_Exam")),1)]),l("div",S,[t(u,{to:"/curriculum/exams"},{default:o(()=>[l("button",C,[T,b(m(n.$t("Prev")),1)])]),_:1})])])])]),l("div",z,[l("div",D,[t(x,null,{default:o(()=>[l("div",L,[l("div",V,[t(d,{class:"mb-3",name:"name"},{default:o(()=>[l("label",A,m(n.$t("name")),1),b("1234 "),t(f,null,{default:o(()=>[t(i,{class:"select form-control",value:e.name,"onUpdate:value":a[0]||(a[0]=s=>e.name=s)},null,8,["value"])]),_:1})]),_:1}),t(d,{class:"mb-3",name:"comment"},{default:o(()=>[R,t(w,{"auto-size":{minRows:4.5,maxRows:6},value:e.comment,"onUpdate:value":a[1]||(a[1]=s=>e.comment=s)},null,8,["value"])]),_:1}),l("div",F,[l("label",X,m(n.$t("Curriculum")),1),t(f,null,{default:o(()=>[t(_,{value:e.edu_plan_id,"onUpdate:value":a[2]||(a[2]=s=>e.edu_plan_id=s),options:c.eduPlanIdOption,"field-names":{value:"id",label:"name"},"allow-clear":""},null,8,["value","options"])]),_:1})]),l("div",Z,[l("div",G,[t(d,{class:"mb-3",name:"educationYear"},{default:o(()=>[l("label",J,m(n.$t("Education_Year_Name")),1),t(_,{value:e.academic_year_id,"onUpdate:value":a[3]||(a[3]=s=>e.academic_year_id=s),options:c.academicYearOption,disabled:!e.edu_plan_id,"field-names":{value:"id",label:"name"},autocomplete:"off"},null,8,["value","options","disabled"])]),_:1})]),l("div",K,[t(d,{class:"mb-3",name:"semester"},{default:o(()=>[l("label",Q,m(n.$t("Semester_Name")),1),t(_,{value:e.semester_id,"onUpdate:value":a[4]||(a[4]=s=>e.semester_id=s),options:c.semesterId,disabled:!e.edu_plan_id,"field-names":{value:"id",label:"name"},autocomplete:"off"},null,8,["value","options","disabled"])]),_:1})])])]),l("div",W,[l("div",ee,[t(d,{class:"mb-3 col-md-6",name:"examType"},{default:o(()=>[ae,t(_,{autocomplete:"off",placeholder:"Imthon turini tanlang"})]),_:1}),t(d,{class:"mb-3 col-md-6",name:"active"},{default:o(()=>[te,t(_,{autocomplete:"off",value:e.status,"onUpdate:value":a[5]||(a[5]=s=>e.status=s),options:v.res,"allow-clear":"","field-names":{value:"id",label:"name"}},null,8,["value","options"])]),_:1}),t(d,{class:"mb-3 col-md-6",name:"startAt"},{default:o(()=>[le,t(y,{"show-time":{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",value:e.datetime_start,"onUpdate:value":a[6]||(a[6]=s=>e.datetime_start=s),placeholder:["Start Time"]},null,8,["value"])]),_:1}),t(d,{class:"mb-3 col-md-6",name:"endAt"},{default:o(()=>[se,t(y,{"show-time":{format:"HH:mm"},format:"DD-MM-YYYY HH:mm",value:e.datetime_end,"onUpdate:value":a[7]||(a[7]=s=>e.datetime_end=s),placeholder:["End Time"]},null,8,["value"])]),_:1}),t(d,{class:"mb-3 col-md-6",name:"time"},{default:o(()=>[oe,t(i,{class:"select",value:e.duration,"onUpdate:value":a[8]||(a[8]=s=>e.duration=s),type:"number"},null,8,["value"])]),_:1}),t(d,{class:"mb-3 col-md-6",name:"maxPoints"},{default:o(()=>[ne,t(i,{class:"select",value:e.max_ball,"onUpdate:value":a[9]||(a[9]=s=>e.max_ball=s),type:"number"},null,8,["value"])]),_:1}),t(d,{class:"mb-3 col-md-4",name:"attempts"},{default:o(()=>[de,t(i,{class:"select",value:e.attemps_count,"onUpdate:value":a[10]||(a[10]=s=>e.attemps_count=s),type:"number"},null,8,["value"])]),_:1}),t(d,{class:"mb-3 col-md-4",name:"questionCount"},{default:o(()=>[ie,t(i,{class:"select",value:e.questions_count,"onUpdate:value":a[11]||(a[11]=s=>e.questions_count=s),type:"number"},null,8,["value"])]),_:1}),t(d,{class:"mb-3 col-md-4",name:"active"},{default:o(()=>[ue,t(_,{autocomplete:"off",value:e.randomable,"onUpdate:value":a[12]||(a[12]=s=>e.randomable=s),options:v.ran,"allow-clear":"","field-names":{value:"id",label:"name"}},null,8,["value","options"])]),_:1})]),t(d,{class:"mb-3",name:"subject"},{default:o(()=>[l("label",me,m(n.$t("Subjects")),1),t(_,{value:e.subject_id,"onUpdate:value":a[13]||(a[13]=s=>e.subject_id=s),autocomplete:"off",style:{width:"100%"}},null,8,["value"])]),_:1})])]),l("div",re,[l("button",ce,m(n.$t("Save")),1)])]),_:1})])])])}}});export{be as default};
