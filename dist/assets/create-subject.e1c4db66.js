import{_ as B}from"./SubjectForm.vue_vue_type_script_setup_true_lang.506bd05c.js";import{c as D}from"./subject.a5ecd5ae.js";import{d as E,n as V,a as I,bO as z,B as L,bq as O,Z as x,i as q,o as A,e as F,f as a,j as d,k as m,z as r,t as c,g as p,bV as R}from"./index.3390162f.js";import{p as T}from"./plan.0a3ba948.js";import"./SubmitButton.vue_vue_type_script_setup_true_lang.fe21b651.js";import"./index.30e99442.js";import"./helper.569bc08f.js";import"./sweetalert2.all.fdef424e.js";import"./moment.2cad4b18.js";const X={pagetitle:"'Xaftaliklar'",class:"weeksPage"},Z={class:"card panel-header-bg"},G={class:"card-body"},H={class:"panel-header"},J={class:"card-title"},K={class:"panel-toggles"},M={class:"btns black-c py-1.5 px-4",type:"submit"},P=a("i",{class:"mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"},null,-1),Q={class:"card"},U={class:"card-body"},ce=E({__name:"create-subject",async setup(W){var b,g,h,j;let o,f;const y=V(),i=(g=(b=y.params)==null?void 0:b.id)!=null?g:null,k=(j=(h=y.params)==null?void 0:h.idSemester)!=null?j:null,{t:S}=I(),N=z(),n=L(!1),_=([o,f]=O(()=>T().then(t=>t.result)),o=await o,f(),o);let w=_==null?void 0:_.data.find(t=>t.id==i).name;const e=x({edu_plan_id:Number(i),semester_id:Number(k),ratinggrade_id:null,final_exam_type_id:null,credit:null,total_load:null,type:null,date_start:"",date_end:"",subjects:[{subject_id:null,department_id:null}],audience_hours:[],exam_types:[],additional_types:[],subject_type_code:null}),l=x({edu_plan_id:[],semester_id:[],ratinggrade_id:[],final_exam_type_id:[],credit:[],total_load:[],type:[],date_start:[],date_end:[],subjects:[],exam_types:[],audience_hours:[],additional_types:[]});async function C(){var t,u;try{n.value=!0;let s={edu_plan_id:e.edu_plan_id,semester_id:e.semester_id,ratinggrade_id:e.ratinggrade_id,final_exam_type_id:e.final_exam_type_id,credit:e.credit,total_load:e.total_load,type:e.type,date_start:e.date_start,date_end:e.date_end,subjects:e.subjects,audience_hours:e.audience_hours,exam_types:e.exam_types,additional_types:e.additional_types,subject_type_code:e.subject_type_code};const v=await D(s);N.success(S("Data_stored_successfully")),R.back()}catch(s){Object.assign(l,(u=(t=s.response)==null?void 0:t.data)==null?void 0:u.errors)}finally{n.value=!1}}function $(t){l[t]=[]}return(t,u)=>{const s=q("router-link"),v=B;return A(),F("div",X,[a("div",Z,[a("div",G,[a("div",H,[a("h5",J,[d(s,{to:"/curriculum/curriculum"},{default:m(()=>[r(c(t.$t("Curriculum")),1)]),_:1}),r(" / "),d(s,{to:`/curriculum/curriculum/${p(i)}/subjects`},{default:m(()=>[r(c(p(w)),1)]),_:1},8,["to"]),r(" / "+c(t.$t("Science_program")),1)]),a("div",K,[d(s,{to:`/curriculum/curriculum/${p(i)}/subjects`},{default:m(()=>[a("button",M,[P,r(c(t.$t("Back")),1)])]),_:1},8,["to"])])])])]),a("div",Q,[a("div",U,[d(v,{"form-state":e,errors:l,"is-loading":n.value,onSubmit:C,onClearError:$},null,8,["form-state","errors","is-loading"])])])])}}});export{ce as default};
