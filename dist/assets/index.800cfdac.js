import{bR as Z,d as q,h as G,c as H,a as J,B as $,Z as S,y as K,w as Q,i as C,b6 as W,o as n,e as c,f as t,t as e,bs as X,z as F,j as d,k as b,v as x,g as l,s as P,l as N,F as m,r as Y,c2 as tt}from"./index.3390162f.js";import{a as et,R as st}from"./index.30e99442.js";import{_ as U}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{_ as at}from"./NoData.ac42776e.js";import"./vue.runtime.esm-bundler.84001772.js";/* empty css                                                               */import"./_plugin-vue_export-helper.cdc0426e.js";const nt=Z();async function lt(B){try{const{data:r}=await nt({url:"/api/statistic/general-contract",params:B});return r}catch(r){throw r}}const ot={pagetitle:"`Shartnoma statistikasi`",class:"byContractPage"},ct={class:"card panel-header-bg"},it={class:"card-body"},ut={class:"panel-header"},dt={class:"card-title"},rt={class:"panel-toggles"},_t={class:"filterBlock"},mt={class:"btns c-filter py-1.5 px-4"},pt=t("i",{class:"mdi mdi-filter me-2"},null,-1),ht={class:"collapse__block"},ft={class:"my-2 col-md-2"},bt=["disabled"],yt=t("i",{class:"mdi mdi-eye me-2"},null,-1),vt={key:0,class:"card"},gt={class:"card-body"},Ct={key:0,class:"table-responsive table-statistical"},kt={class:"table-header"},Lt={rowspan:"2",style:{"min-width":"150px"}},wt={rowspan:"2",style:{"min-width":"150px"}},$t={colspan:"2"},Nt={colspan:"2"},Yt={colspan:"2"},Et={colspan:"2"},St={colspan:"2"},Bt={colspan:"2"},Dt=["rowspan"],Vt={colspan:"2"},Tt={key:1,class:"card"},jt={class:"card-body"},It=q({__name:"index",setup(B){const r=G(),M=H(()=>{var s,o;return(o=(s=r==null?void 0:r.user)==null?void 0:s.faculty)==null?void 0:o.name}),{t:a}=J(),k=$(!1),D=$(),V=$(),T=$(),y=S({result:[]}),p=S({optioneducationList:null,optionacademicYeList:null}),u=S({academic_year_id:null,edu_type_id:null});K(async()=>{p.optionacademicYeList=await et().then(s=>{var o;return(o=s.result)==null?void 0:o.data}),p.optioneducationList=await st().then(s=>s.result)}),Q(()=>u,async(s,o)=>{o==s?T.value=0:T.value=1});async function O(){R(),D.value=p.optioneducationList.find(s=>s.id==u.edu_type_id).name,V.value=p.optionacademicYeList.find(s=>s.id==u.academic_year_id).name}async function R(){try{k.value=!0;const s=await lt(u);Object.assign(y,s)}catch(s){console.log(s)}finally{k.value=!1}}function L(s,o,h=null){var f;let v=0;return((f=y.result)==null?void 0:f.length)>0&&(h?s.edu_forms.forEach(g=>{const E=g.courses.find(i=>i.course==h),w=tt.exports.cloneDeep(E);w&&(v+=w[o])}):s.edu_forms.forEach(g=>{v+=g[o]})),v}return(s,o)=>{const h=C("a-select"),v=C("a-space"),f=C("a-form-item"),g=C("b-card"),E=C("b-collapse"),w=W("b-toggle");return n(),c("div",ot,[t("div",ct,[t("div",it,[t("div",ut,[t("h5",dt,e(s.$t("Contract_statistics")),1),t("div",rt,[t("div",_t,[X((n(),c("button",mt,[pt,F(e(s.$t("Filtr")),1)])),[[w,void 0,void 0,{"collapse-3":!0}]])])])])])]),t("div",ht,[d(E,{visible:"",id:"collapse-3"},{default:b(()=>[d(g,null,{default:b(()=>[t("form",{class:"row",onSubmit:x(O,["prevent"])},[d(f,{class:"my-2 col-md-4",name:"faculty"},{default:b(()=>[d(v,null,{default:b(()=>[d(h,{class:"form--item",value:M.value,disabled:""},null,8,["value"])]),_:1})]),_:1}),d(f,{class:"my-2 col-md-3",name:"educationYear"},{default:b(()=>[d(h,{value:u.academic_year_id,"onUpdate:value":o[0]||(o[0]=i=>u.academic_year_id=i),options:p.optionacademicYeList,"field-names":{value:"id",label:"name"},"allow-clear":"",placeholder:l(a)("Choose_Education_Year")},null,8,["value","options","placeholder"])]),_:1}),d(f,{class:"my-2 col-md-3",name:"educationType"},{default:b(()=>[d(h,{value:u.edu_type_id,"onUpdate:value":o[1]||(o[1]=i=>u.edu_type_id=i),options:p.optioneducationList,"field-names":{value:"id",label:"name"},"allow-clear":"",placeholder:l(a)("Choose_Education_Type"),disabled:!u.academic_year_id},null,8,["value","options","placeholder","disabled"])]),_:1}),t("div",ft,[t("button",{disabled:!u.edu_type_id||!u.academic_year_id,class:"btn-search c-save",type:"submit"},[yt,F(e(s.$t("View")),1)],8,bt)])],32)]),_:1})]),_:1})]),y.result.length>0?(n(),c("div",vt,[k.value?(n(),P(U,{key:0})):N("",!0),t("div",gt,[y.result.length?(n(),c("div",Ct,[t("div",kt,[t("table",null,[t("tr",null,[t("td",null,[t("span",null,e(s.$t("Curriculum_Education_Year"))+":",1),t("b",null,e(V.value),1)]),t("td",null,[t("span",null,e(l(a)("Education_Type"))+":",1),t("b",null,e(D.value),1)])])])]),t("table",null,[t("thead",null,[t("tr",null,[t("th",Lt,[t("b",null,e(s.$t("Student_Special")),1)]),t("th",wt,[t("b",null,e(s.$t("Edu_form")),1)]),t("th",$t,"1-"+e(s.$t("course_number")),1),t("th",Nt,"2-"+e(s.$t("course_number")),1),t("th",Yt,"3-"+e(s.$t("course_number")),1),t("th",Et,"4-"+e(s.$t("course_number")),1),t("th",St,"5-"+e(s.$t("course_number")),1),t("th",Bt,e(l(a)("all_Student")),1)]),t("tr",null,[t("th",null,e(l(a)("Number_of_students")),1),t("th",null,e(l(a)("Contract_number")),1),t("th",null,e(l(a)("Number_of_students")),1),t("th",null,e(l(a)("Contract_number")),1),t("th",null,e(l(a)("Number_of_students")),1),t("th",null,e(l(a)("Contract_number")),1),t("th",null,e(l(a)("Number_of_students")),1),t("th",null,e(l(a)("Contract_number")),1),t("th",null,e(l(a)("Number_of_students")),1),t("th",null,e(l(a)("Contract_number")),1),t("th",null,e(l(a)("Number_of_students")),1),t("th",null,e(l(a)("Contract_number")),1)])]),t("tbody",null,[(n(!0),c(m,null,Y(y.result,(i,z)=>(n(),c(m,{key:z},[(n(!0),c(m,null,Y(i.edu_forms,(_,j)=>(n(),c("tr",{key:j},[j===0?(n(),c("td",{key:0,rowspan:i.edu_forms.length},e(i.specialty),9,Dt)):N("",!0),t("td",null,e(_.edu_form),1),(n(!0),c(m,null,Y(_.courses,(A,I)=>(n(),c(m,{key:I},[t("td",null,e(A.student_count),1),t("td",null,e(A.contract_count),1)],64))),128)),t("td",null,e(_.total_student),1),t("td",null,e(_.total_contract),1)]))),128)),t("tr",null,[t("th",Vt,e(s.$t("Total_Point")),1),(n(),c(m,null,Y(5,_=>(n(),c(m,null,[t("th",null,e(L(i,"student_count",_)),1),t("th",null,e(L(i,"contract_count",_)),1)],64))),64)),t("th",null,e(L(i,"total_student")),1),t("th",null,e(L(i,"total_contract")),1)])],64))),128))])])])):N("",!0)])])):(n(),c("div",Tt,[t("div",jt,[k.value?(n(),P(U,{key:0})):N("",!0),d(at)])]))])}}});export{It as default};
