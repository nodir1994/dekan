import{a as f,b as w}from"./data.ef1c0a69.js";import{_ as x}from"./_plugin-vue_export-helper.cdc0426e.js";import{B as k,i as m,o as e,e as o,f as t,j as n,k as r,z as i,F as u,r as _,t as l}from"./index.3390162f.js";const N={setup(){const a=(d,p)=>p.value.toLowerCase().indexOf(d.toLowerCase())>=0;return{current:k(1),filterOption:a,allDate:f,allTables:w}},components:{}},T={pagetitle:"'Reyting'",class:"examMidternGradePage"},B={class:"card panel-header-bg"},I={class:"card-body"},z={class:"panel-header"},L={class:"card-title"},j={class:"filterBlock"},F=t("i",{class:"mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"},null,-1),M={class:"row"},C={class:"col-xl-8"},S={class:"card"},P=t("div",{class:"card-header bg-card-header"},[t("h5",{class:"modal-title"},"Oraliq nazorat")],-1),$={class:"card-body"},q={class:"table-responsive table-statistical"},G=t("tr",null,[t("th",{style:{"min-width":"60px"}},"\u2116"),t("th",{style:{width:"100%","text-align":"start"}}," Talabaning F.I.Sh. "),t("th",{style:{"min-width":"100px"}},"Top. bali"),t("th",{style:{"min-width":"100px"}},"Ball [5]")],-1),O=t("td",null,null,-1),V=t("td",null,null,-1),A=t("div",{class:"d-flex justify-content-end mt-2"},[t("button",{"data-bs-toggle":"modal","data-bs-target":"#myModalFaculty",class:"btns application-color py-2 px-4 me-2"}," To'ldirish "),t("button",{type:"submit",class:"btns c-save py-2 px-4"}," Saqlash ")],-1),D={class:"col-xl-4"},E={class:"card sticky-top",style:{top:"100px"}},R=t("div",{class:"card-header bg-card-header"},[t("h5",{class:"modal-title"},"Ma'lumotlar")],-1),U={class:"card-body"},Y={class:"table-responsive"},H={class:"table-row-sub d-grid w-100"},J={scope:"row"},K={class:"table-row-sub d-grid w-100"},Q=t("th",null,"Nazorat turi",-1),W={class:"table-row-sub d-grid w-100"},X=t("th",null,"YN turi",-1),Z={class:"table-row-sub d-grid w-100"},tt=t("th",null,"Nazorat sanasi",-1),st={class:"table-row-sub d-grid w-100"},lt={class:"table-row-sub d-grid w-100"},at=t("th",null,"Baholash tizimi",-1),et={id:"myModalFaculty",class:"modal fade",tabindex:"-1","aria-labelledby":"myModalLabelFaculty","aria-hidden":"true"},ot={class:"modal-dialog"},dt={class:"modal-content"},nt=t("div",{class:"modal-header bg-card-header"},[t("h5",{class:"modal-title",id:"myModalLabel"},"Imtihonni tanlash"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal"},[t("i",{class:"mdi mdi-close font-size-18"})])],-1),it={class:"modal-body"},ct={class:"table-responsive"},rt={class:"table-vertical"},ut={class:"table-row-modal d-grid w-100"},_t=t("th",null,"Guruhlar",-1),ht=t("th",null,"Boshlanish",-1),bt=t("th",null,"Tugash",-1),mt={href:"#"},pt=t("br",null,null,-1),yt=t("div",{class:"d-flex justify-content-end"},[t("button",{type:"button",class:"btns c-cancel me-1","data-bs-dismiss":"modal"}," Yopish ")],-1);function vt(a,d,p,c,gt,ft){const y=m("router-link"),v=m("a-input"),g=m("a-form-item");return e(),o("div",T,[t("div",B,[t("div",I,[t("div",z,[t("h5",L,[n(y,{to:"/teacher/midterm-exam-table"},{default:r(()=>[i("Nazorat jadvali ")]),_:1}),i(" / Reyting ")]),t("div",j,[n(y,{to:"/teacher/midterm-exam-table",class:"btns black-c py-1.5 px-4 d-inline-block"},{default:r(()=>[F,i(l(a.$t("Prev")),1)]),_:1})])])])]),t("div",M,[t("div",C,[t("div",S,[P,t("div",$,[t("div",q,[t("table",null,[t("thead",null,[G,(e(!0),o(u,null,_(c.allTables.tablebByPerformance.faculty,(s,h)=>(e(),o("tr",{key:h},[t("td",null,l(s.id),1),t("td",null,l(s.secondName),1),O,t("td",null,[n(g,{class:"mb-0",name:"heiNameInput"},{default:r(()=>[n(v,{class:"select py-1",tupe:"text",value:a.heiNameInput,"onUpdate:value":d[0]||(d[0]=b=>a.heiNameInput=b)},null,8,["value"])]),_:1})])]))),128))]),t("tbody",null,[(e(!0),o(u,null,_(c.allTables.tablebByPerformance.faculty,(s,h)=>(e(),o("tr",{key:h},[t("td",null,l(s.id),1),t("td",null,l(s.secondName),1),V,t("td",null,[n(g,{class:"mb-0",name:"heiNameInput"},{default:r(()=>[n(v,{class:"select py-1",tupe:"number",value:a.heiNameInput,"onUpdate:value":d[1]||(d[1]=b=>a.heiNameInput=b)},null,8,["value"])]),_:1})])]))),128))])]),A])])])]),t("div",D,[t("div",E,[R,t("div",U,[t("div",Y,[(e(!0),o(u,null,_(c.allTables.tableChekLessonInfo,s=>(e(),o("table",{class:"table-vertical",key:s.id},[t("tr",H,[t("th",J,l(a.$t("Subjects")),1),t("td",null,l(s.subject),1)]),t("tr",K,[Q,t("td",null,l(s.examType),1)]),t("tr",W,[X,t("td",null,l(s.qaydnoma),1)]),t("tr",Z,[tt,t("td",null,l(s.date),1)]),t("tr",st,[t("th",null,l(a.$t("Group")),1),t("td",null,l(s.group),1)]),t("tr",lt,[at,t("td",null,l(s.gradeType),1)])]))),128))])])])])]),t("div",et,[t("div",ot,[t("div",dt,[nt,t("div",it,[t("div",ct,[t("table",rt,[t("thead",null,[t("tr",ut,[t("th",null,l(a.$t("Name")),1),_t,ht,bt])]),t("tbody",null,[(e(!0),o(u,null,_(c.allTables.optionsSelectExam,s=>(e(),o("tr",{class:"table-row-modal d-grid w-100",key:s.id},[t("td",null,[t("a",mt,[i(l(s.name)+" ",1),pt,i(" "+l(s.subject)+" / "+l(s.examType)+" / "+l(s.teacher),1)])]),t("td",null,l(s.groups),1),t("td",null,l(s.startAt),1),t("td",null,l(s.endAt),1)]))),128))])])]),yt])])])])])}const Nt=x(N,[["render",vt]]);export{Nt as default};
