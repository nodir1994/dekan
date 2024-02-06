import{_ as A}from"./Pagination.f4a9fc5d.js";import{_ as R}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{bR as V,d as z,a as q,B as k,h as D,c as M,Z as P,bq as Z,y as H,w as h,i as y,b6 as J,o as r,e as f,f as s,t as o,bs as K,z as L,j as i,k as _,g as v,s as F,l as $,F as Q,r as W,aR as X}from"./index.3390162f.js";import{e as Y,k as x,b as ee}from"./index.30e99442.js";import{b as se,f as te,j as ae}from"./id.5a6e5f30.js";import{h as S}from"./helper.569bc08f.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./vue.runtime.esm-bundler.84001772.js";import"./sweetalert2.all.fdef424e.js";import"./moment.2cad4b18.js";const oe=V();async function le(j){try{const{data:b}=await oe({url:"/api/attendances/report",params:j});return b}catch(b){throw b}}const de={pagetitle:"'Davomat hisoboti'",class:"attendancePage"},ie={class:"card panel-header-bg"},ne={class:"card-body"},ue={class:"panel-header"},re={class:"card-title"},_e={class:"panel-toggles"},ce={class:"btns c-filter py-1.5 px-4"},pe=s("i",{class:"mdi mdi-filter font-size-14 align-middle me-1"},null,-1),me={class:"collapse__block"},he={class:"row"},fe={class:"my-2 col-md-4 form--item"},be={for:"yu"},ve={class:"my-2 col-md-4 form--item"},ye={for:"yu"},ge={class:"my-2 col-md-4 form--item"},we={for:"yu"},Oe={class:"my-2 col-md-2 form--item"},$e={for:"yu"},je={class:"my-2 col-md-2 form--item"},Ce={for:"yu"},ke={class:"my-2 col-md-3 form--item"},Pe={for:"yu"},Le={class:"my-2 col-md-3 form--item"},Fe={for:"yu"},Se={class:"my-2 col-md-2"},Ge=s("i",{class:"mdi mdi-close me-1"},null,-1),Te={class:"card"},Be={class:"card-body"},Ne={key:1,class:"table-responsive"},Ue={class:"content-table"},Ee={class:"table-row-all-students-report-attendace"},Ie=s("th",null,"#",-1),Ae={class:"text-center"},Re={key:2},Ve={class:"text-center"},ze={class:"text-center"},qe={key:0,class:"element-count mb-2"},es=z({__name:"report",async setup(j){let b,C;const{t:m}=q(),g=k(!1),w=D(),G=M(()=>{var t,l;return(l=(t=w==null?void 0:w.user)==null?void 0:t.faculty)==null?void 0:l.name}),e=P({edu_type_id:null,edu_plan_id:null,semester_id:null,academic_group_id:null,subject_id:null,edu_form_id:null,data:[],links:[],current_page:1,per_page:S.pagePer}),d=P({eduTypeOptions:null,eduPlanOptions:null,semesterOptions:null,academicGroupOptions:null,subjectOptions:null,eduFormList:null}),O=k(!0);[b,C]=Z(()=>c()),await b,C(),H(async()=>{d.eduTypeOptions=await Y().then(t=>t.result),d.eduPlanOptions=await x().then(t=>t.result.data),d.eduFormList=await ee().then(t=>t.result)}),h(()=>e.edu_type_id,async()=>{await c()}),h(()=>e.edu_form_id,async()=>{await c()}),h(()=>e.subject_id,async()=>{await c()}),h(()=>e.edu_plan_id,async()=>{var t,l;if(e.semester_id=null,e.academic_group_id=null,d.semesterOptions=null,d.academicGroupOptions=null,await c(),e.edu_plan_id){let n=await se(e.edu_plan_id);d.academicGroupOptions=(t=n==null?void 0:n.result)==null?void 0:t.data.map(p=>({id:p.id,name:p.name}));let u=await te(e.edu_plan_id);d.semesterOptions=(l=u==null?void 0:u.result)==null?void 0:l.data.map(p=>({id:p.id,name:p.course+"-"+m("Course")+" "+p.semester+"-"+m("semester")}))}}),h(()=>e.semester_id,async()=>{await c(),e.edu_plan_id&&e.semester_id&&(d.subjectOptions=await ae(e.edu_plan_id,e.semester_id).then(t=>t.result.map(l=>{var n,u;return{id:(n=l==null?void 0:l.subject)==null?void 0:n.id,name:(u=l==null?void 0:l.subject)==null?void 0:u.name}})))}),h(()=>e.academic_group_id,async()=>{await c()}),h(()=>e.current_page,async t=>{Number(t)&&(e.page=Number(t),await c())});async function c(){let t={};e.page>1&&(t.page=e==null?void 0:e.page),e.edu_type_id&&(t.edu_type_id=e.edu_type_id),e.subject_id&&(t.subject_id=e.subject_id),e.edu_plan_id&&(t.edu_plan_id=e.edu_plan_id),e.semester_id&&(t.semester_id=e.semester_id),e.edu_form_id&&(t.edu_form_id=e.edu_form_id),e.academic_group_id&&(t.academic_group_id=e.academic_group_id);try{if(g.value=!0,O.value){O.value=!1;const l=await le(t);Object.assign(e,l.result),setTimeout(()=>{O.value=!0},S.loaderRefresh)}}catch(l){console.log(l)}finally{g.value=!1}}function T(){e.edu_type_id=null,e.subject_id=null,e.edu_plan_id=null,e.semester_id=null,e.academic_group_id=null,e.edu_form_id=null,d.semesterOptions=null,d.academicGroupOptions=null,d.subjectOptions=null}return(t,l)=>{const n=y("a-select"),u=y("a-space"),p=y("b-card"),B=y("b-collapse"),N=R,U=A,E=J("b-toggle");return r(),f("div",de,[s("div",ie,[s("div",ne,[s("div",ue,[s("h5",re,o(t.$t("attendance_Report")),1),s("div",_e,[K((r(),f("button",ce,[pe,L(o(t.$t("Filter")),1)])),[[E,void 0,void 0,{"collapse-3":!0}]])])])])]),s("div",me,[i(B,{visible:"",id:"collapse-3"},{default:_(()=>[i(p,null,{default:_(()=>[s("div",he,[s("div",fe,[i(u,null,{default:_(()=>[i(n,{class:"form--item",value:G.value,disabled:""},null,8,["value"])]),_:1}),s("label",be,o(t.$t("Choose_faculty")),1)]),s("div",ve,[i(u,null,{default:_(()=>[i(n,{"allow-clear":"",value:e.edu_type_id,"onUpdate:value":l[0]||(l[0]=a=>e.edu_type_id=a),"field-names":{value:"id",label:"name"},options:d.eduTypeOptions,placeholder:v(m)("Choose_Education_Type")},null,8,["value","options","placeholder"])]),_:1}),s("label",ye,o(t.$t("Choose_Education_Type")),1)]),s("div",ge,[i(u,null,{default:_(()=>[i(n,{"allow-clear":"",value:e.edu_plan_id,"onUpdate:value":l[1]||(l[1]=a=>e.edu_plan_id=a),"field-names":{value:"id",label:"name"},options:d.eduPlanOptions,placeholder:t.$t("Please_select_curriculum")},null,8,["value","options","placeholder"])]),_:1}),s("label",we,o(t.$t("Choose_Curriculum")),1)]),s("div",Oe,[i(u,null,{default:_(()=>[i(n,{"allow-clear":"",value:e.academic_group_id,"onUpdate:value":l[2]||(l[2]=a=>e.academic_group_id=a),disabled:!e.edu_plan_id,"field-names":{value:"id",label:"name"},options:d.academicGroupOptions,placeholder:v(m)("Choose_Group")},null,8,["value","disabled","options","placeholder"])]),_:1}),s("label",$e,o(t.$t("Choose_Group")),1)]),s("div",je,[i(u,null,{default:_(()=>[i(n,{"allow-clear":"",value:e.semester_id,"onUpdate:value":l[3]||(l[3]=a=>e.semester_id=a),"field-names":{value:"id",label:"name"},disabled:!e.edu_plan_id,options:d.semesterOptions,placeholder:v(m)("Choose_Semester")},null,8,["value","disabled","options","placeholder"])]),_:1}),s("label",Ce,o(t.$t("Choose_Semester")),1)]),s("div",ke,[i(u,null,{default:_(()=>[i(n,{"allow-clear":"",value:e.edu_form_id,"onUpdate:value":l[4]||(l[4]=a=>e.edu_form_id=a),"field-names":{value:"id",label:"name"},options:d.eduFormList,placeholder:v(m)("Choose_Education_Form")},null,8,["value","options","placeholder"])]),_:1}),s("label",Pe,o(t.$t("Choose_Education_Form")),1)]),s("div",Le,[i(u,null,{default:_(()=>[i(n,{"allow-clear":"",value:e.subject_id,"onUpdate:value":l[5]||(l[5]=a=>e.subject_id=a),"field-names":{value:"id",label:"name"},disabled:!e.semester_id,options:d.subjectOptions,placeholder:v(m)("Choose_Subject")},null,8,["value","disabled","options","placeholder"])]),_:1}),s("label",Fe,o(t.$t("Choose_Subject")),1)]),s("div",Se,[s("button",{type:"button",onClick:T,class:"btn-search search-color"},[Ge,L(o(t.$t("Clear")),1)])])])]),_:1})]),_:1})]),s("div",Te,[s("div",Be,[g.value?(r(),F(N,{key:0})):$("",!0),e.data.length?(r(),f("div",Ne,[s("table",Ue,[s("thead",null,[s("tr",Ee,[Ie,s("th",null,o(t.$t("Student")),1),s("th",null,o(t.$t("Group")),1),s("th",null,o(t.$t("Subjects")),1),s("th",null,o(t.$t("Auditorm_hour")),1),s("th",null,o(t.$t("absent_On")),1),s("th",null,o(t.$t("absent_Off")),1),s("th",null,o(t.$t("Total_Point")),1),s("th",Ae,o(t.$t("absent_Off_Percent")),1)])]),s("tbody",null,[(r(!0),f(Q,null,W(e.data,(a,I)=>(r(),f("tr",{class:"table-row-all-students-report-attendace",key:a.id},[s("td",null,o((e.current_page-1)*e.per_page+I+1),1),s("td",null,o(a==null?void 0:a.fullname),1),s("td",null,o(a==null?void 0:a.academic_group),1),s("td",null,o(a==null?void 0:a.subject),1),s("td",null,o(a==null?void 0:a.load),1),s("td",null,o(a==null?void 0:a.caused),1),s("td",null,o(a==null?void 0:a.uncaused),1),s("td",null,o(a==null?void 0:a.total),1),s("td",null,o(a==null?void 0:a.percent),1)]))),128))])]),e.last_page>1?(r(),F(U,X({key:0,class:"mt-2"},{...e},{"current-page":e.current_page,"onUpdate:currentPage":l[6]||(l[6]=a=>e.current_page=a)}),null,16,["current-page"])):$("",!0)])):(r(),f("div",Re,[s("h5",Ve,o(t.$t("No_data")),1),s("p",ze,o(t.$t("No_information_found")),1)]))])]),e.data.length?(r(),f("span",qe,o(e.current_page)+"-"+o((e==null?void 0:e.data.length)+e.per_page*(e.current_page-1))+"/ "+o(t.$t("Total_Point"))+": "+o(e.total),1)):$("",!0)])}}});export{es as default};