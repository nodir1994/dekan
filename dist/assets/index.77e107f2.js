import{_ as X}from"./Pagination.f4a9fc5d.js";import{_ as ee}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{bR as te,d as se,a as ae,bO as oe,B as S,Z as F,c as le,bq as ne,y as ie,w as v,i as V,o as y,e as b,f as t,t as l,s as z,l as B,bs as I,bH as D,F as de,r as re,z as g,aR as ue,v as ce,j as p,g as r}from"./index.3390162f.js";import{e as _e,b as pe}from"./index.30e99442.js";import{e as R,b as q,f as H}from"./id.5a6e5f30.js";import{S as me}from"./sweetalert2.all.fdef424e.js";import{h as f}from"./helper.569bc08f.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./vue.runtime.esm-bundler.84001772.js";import"./moment.2cad4b18.js";const G=te();async function fe(w){try{const{data:c}=await G({url:"api/students/transfer-study",method:"GET",params:w});return c}catch(c){throw c}}async function he(w){try{const{data:c}=await G({url:"api/commands/list/transfer-study",method:"GET"});return c}catch(c){throw c}}async function ve(w){try{const{data:c}=await G({url:"/api/student-actions/transfer-study",method:"POST",data:w});return c}catch(c){throw c}}const ye={pagetitle:"`Talabani ko'chirish`",class:"transfer-page"},be={class:"card panel-header-bg"},ge={class:"card-body"},we={class:"panel-header"},Oe={style:{padding:"7px 0"},class:"card-title"},Ce={class:"row"},ke={class:"col-xl-8"},Fe={class:"card"},Be={class:"card-body"},Ne={key:1,class:"table-responsive"},$e={class:"content-table"},Se={class:"table-row d-grid w-100"},Ge=t("th",null,"#",-1),Te={class:"form-check"},Pe={class:"form-check"},Ue=["value"],Le=t("br",null,null,-1),Ee={class:"c-gray"},Ye=t("br",null,null,-1),je={class:"c-gray"},Me=t("br",null,null,-1),xe={class:"c-gray"},Ae=t("br",null,null,-1),Ve={class:"c-gray"},ze={key:2},Ie={class:"text-center"},De={class:"text-center"},Re={key:0,class:"element-count mb-2"},qe={class:"card"},He={class:"card-body"},Ze={class:"row"},Je={class:"mb-3 col-md-10"},Ke=t("i",{class:"mdi mdi-magnify font-size-14 align-middle"},null,-1),Qe=[Ke],We={class:"row"},Xe={class:"mb-3",name:"nameFaculty"},et={class:"mb-3",name:"nameFaculty"},tt={class:"mb-3",name:"nameFaculty"},st={class:"mb-3",name:"nameFaculty"},at={class:"mb-3",name:"nameFaculty"},ot={class:"d-flex justify-content-end"},lt=t("i",{class:"mdi mdi-close font-size-14 align-middle me-1"},null,-1),nt={class:"card"},it={class:"card-body"},dt={class:"mb-3",name:"nameFaculty"},rt={for:"division-name-input",class:"form-label"},ut={class:"mb-3",name:"nameFaculty"},ct={for:"division-name-input",class:"form-label"},_t={class:"mb-3",name:"nameFaculty"},pt={for:"division-name-input",class:"form-label"},mt={class:"mb-3",name:"nameFaculty"},ft={for:"division-name-input",class:"form-label"},ht={class:"mb-3",name:"nameFaculty"},vt={for:"division-name-select",class:"form-label"},yt={key:0,class:"text-danger small"},bt={class:"mb-3",name:"nameFaculty"},gt={for:"division-name-input",class:"form-label"},wt={class:"mb-3"},Ot={for:"division-name-select",class:"form-label"},Ct={class:"d-flex justify-content-end"},kt=["disabled"],Ft=t("i",{class:"mdi mdi-check font-size-14 align-middle me-1"},null,-1),jt=se({__name:"index",async setup(w){let c,T;const{t:d}=ae(),N=oe(),O=S(!1);F({});const e=F({search:"",edu_plan_id:null,edu_plan_id2:null,edu_type_id:null,edu_type_id2:null,semester_id:null,semester_id2:null,academic_group_id:null,academic_group_id2:null,edu_form_id:null,edu_form_id2:null,edu_year_id:null,edu_year_id2:null,data:[],links:[],students:[],current_page:1,per_page:f.pagePer,command_id:null,reference_id:null,dateCommand:null}),n=F({eduTypeOptions:null,eduFormOptions:null,eduPlanOptions:null,eduPlanOptions2:null,semesterOptions:null,semesterOptions2:null,academicGroupOptions:null,academicGroupOptions2:null,orderListOptions:null}),C=S([]),$=S(!0),P=le({get(){var o,s;return((o=e==null?void 0:e.students)==null?void 0:o.length)===((s=C==null?void 0:C.value)==null?void 0:s.length)},set(o){o?e.students=C.value:e.students=[]}});[c,T]=ne(()=>h()),await c,T(),ie(async()=>{n.eduTypeOptions=await _e().then(o=>o.result),n.eduFormOptions=await pe().then(o=>o.result),n.orderListOptions=await he().then(o=>{var s;return(s=o.result)==null?void 0:s.data})}),v(()=>e.edu_type_id,async()=>{await h()}),v(()=>e.edu_form_id,async()=>{e.edu_plan_id=null,await h(),e.edu_form_id&&(n.eduPlanOptions=await R(e.edu_form_id).then(o=>{var s;return(s=o.result)==null?void 0:s.data}))}),v(()=>e.edu_plan_id,async()=>{var o,s;if(e.semester_id=null,e.academic_group_id=null,n.semesterOptions=null,n.academicGroupOptions=null,await h(),e.edu_plan_id){let u=await q(e.edu_plan_id);n.academicGroupOptions=(o=u==null?void 0:u.result)==null?void 0:o.data.map(i=>({id:i.id,name:i.name}));let _=await H(e.edu_plan_id);n.semesterOptions=(s=_==null?void 0:_.result)==null?void 0:s.data.map(i=>({id:i.id,name:i.course+"-"+d("Course")+" "+i.semester+"-"+d("semester")}))}}),v(()=>e.semester_id,async()=>{await h()}),v(()=>e.academic_group_id,async()=>{await h()}),v(()=>e.edu_form_id2,async()=>{e.edu_plan_id2=null,e.edu_form_id2&&(n.eduPlanOptions2=await R(e.edu_form_id2).then(o=>{var s;return(s=o.result)==null?void 0:s.data}))}),v(()=>e.edu_plan_id2,async()=>{var o,s;if(e.semester_id2=null,e.academic_group_id2=null,n.semesterOptions2=null,n.academicGroupOptions2=null,e.edu_plan_id2){let u=await q(e.edu_plan_id2);n.academicGroupOptions2=(o=u==null?void 0:u.result)==null?void 0:o.data.map(i=>({id:i.id,name:i.name}));let _=await H(e.edu_plan_id2);n.semesterOptions2=(s=_==null?void 0:_.result)==null?void 0:s.data.map(i=>({id:i.id,name:i.course+"-"+d("Course")+" "+i.semester+"-"+d("semester")}))}}),v(()=>e.command_id,()=>{e.command_id?e.dateCommand=n.orderListOptions.find(o=>o.id==e.command_id).date:e.dateCommand=null}),v(()=>e.current_page,async o=>{Number(o)&&await h(o)});async function Z(){var o,s;try{O.value=!0,K();let u={};e.page>1&&(u.page=e==null?void 0:e.page),Object.assign(u,{students:e.students,edu_plan_id:e.edu_plan_id2,academic_group_id:e.academic_group_id2,semester_id:e.semester_id2,command_id:e.command_id}),me.fire({title:d("Delete_message.Are_you_sure"),text:d("Delete_message.Action_irreversible"),showCancelButton:!0,confirmButtonColor:"#34c38f",cancelButtonColor:"#f46a6a",cancelButtonText:d("No_Cancel"),confirmButtonText:d("transfer")}).then(async _=>{if(_.value){const i=await ve(u);N.success(d("Data_was_successfully_transferred")),setTimeout(async()=>{await h(),U()},100)}})}catch(u){Object.assign(k,(s=(o=u.response)==null?void 0:o.data)==null?void 0:s.errors),N.error(d("Failed")+": "+u.message)}finally{O.value=!1}}async function J(){await h()}function U(){e.search="",e.edu_form_id=null,e.edu_type_id=null,e.edu_form_id2=null,e.edu_plan_id2=null,e.academic_group_id2=null,e.semester_id2=null,e.command_id=null,e.students=[]}function K(){Object.assign(k,{command_id:[],reference_id:[],students:[]})}const k=F({command_id:[],reference_id:[],students:[]});async function h(o){var u,_;let s=F({page:o||1,per_page:e.per_page});e.edu_type_id&&(s.edu_type_id=e.edu_type_id),e.edu_form_id&&(s.edu_form_id=e.edu_form_id),e.edu_plan_id&&(s.edu_plan_id=e.edu_plan_id),e.semester_id&&(s.semester_id=e.semester_id),e.search&&(s.search=e.search),e.academic_group_id&&(s.academic_group_id=e.academic_group_id);try{if(O.value=!0,$.value){$.value=!1;const i=await fe(s);Object.assign(e,i.result),C.value=e.data.map(m=>m.id),setTimeout(()=>{$.value=!0},100)}}catch(i){Object.assign(k,(_=(u=i.response)==null?void 0:u.data)==null?void 0:_.errors),N.error(d("Failed")+": "+i.message)}finally{O.value=!1}}return(o,s)=>{var L,E;const u=ee,_=X,i=V("a-input"),m=V("a-select");return y(),b("div",ye,[t("div",be,[t("div",ge,[t("div",we,[t("h5",Oe,l(o.$t("Student_Student_Transfer")),1)])])]),t("div",Ce,[t("div",ke,[t("div",Fe,[t("div",Be,[O.value?(y(),z(u,{key:0})):B("",!0),e.data.length?(y(),b("div",Ne,[t("table",$e,[t("thead",null,[t("tr",Se,[Ge,t("th",null,[t("div",Te,[I(t("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":s[0]||(s[0]=a=>P.value=a)},null,512),[[D,P.value]])])]),t("th",null,l(o.$t("Student")),1),t("th",null,l(o.$t("Education_Type")),1),t("th",null,l(o.$t("by_Level")),1),t("th",null,l(o.$t("Group")),1)])]),t("tbody",null,[(y(!0),b(de,null,re(e.data,(a,Q)=>{var Y,j,M,x,A;return y(),b("tr",{class:"table-row w-100 d-grid",key:a.id},[t("td",null,l((e.current_page-1)*e.per_page+Q+1),1),t("td",null,[t("div",Pe,[I(t("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":s[1]||(s[1]=W=>e.students=W),value:a.id},null,8,Ue),[[D,e.students]])])]),t("td",null,[t("div",null,[g(l(a==null?void 0:a.surname)+" "+l(a==null?void 0:a.name)+" ",1),Le,t("span",Ee,l(a.id),1)])]),t("td",null,[t("div",null,[g(l((j=(Y=a==null?void 0:a.specialty)==null?void 0:Y.edu_type)==null?void 0:j.name)+" ",1),Ye,t("span",je,l(a.edu_form),1)])]),t("td",null,[t("div",null,[g(l((M=a==null?void 0:a.semester)==null?void 0:M.course)+" - kurs ",1),Me,t("span",xe,l((x=a==null?void 0:a.semester)==null?void 0:x.semester)+" - semestr ",1)])]),t("td",null,[t("div",null,[g(l((A=a==null?void 0:a.academic_group)==null?void 0:A.name)+" ",1),Ae,t("span",Ve,l(a.academicYear),1)])])])}),128))])]),e.last_page>1?(y(),z(_,ue({key:0,class:"mt-2"},{...e},{"current-page":e.current_page,"onUpdate:currentPage":s[2]||(s[2]=a=>e.current_page=a)}),null,16,["current-page"])):B("",!0)])):(y(),b("div",ze,[t("h5",Ie,l(o.$t("No_data")),1),t("p",De,l(o.$t("No_information_found")),1)]))])]),e.data.length?(y(),b("span",Re,l(e.current_page)+"-"+l((e==null?void 0:e.data.length)+e.per_page*(e.current_page-1))+"/ "+l(o.$t("Total_Point"))+": "+l(e.total),1)):B("",!0)]),t("form",{onSubmit:ce(Z,["prevent"]),class:"col-xl-4"},[t("div",qe,[t("div",He,[t("div",Ze,[t("div",Je,[p(i,{id:"yu",value:e.search,"onUpdate:value":s[3]||(s[3]=a=>e.search=a),class:"form-control",placeholder:r(d)("choose__fish__student__passport__code")},null,8,["value","placeholder"])]),t("div",{class:"col-md-2"},[t("button",{onClick:J,type:"button",class:"btn-search search-color"},Qe)])]),t("div",We,[t("div",Xe,[p(m,{"filter-option":r(f).filterOptionByName,"show-search":"","allow-clear":"",value:e.edu_type_id,"onUpdate:value":s[4]||(s[4]=a=>e.edu_type_id=a),"field-names":{value:"id",label:"name"},options:n.eduTypeOptions,placeholder:r(d)("Choose_Education_Type")},null,8,["filter-option","value","options","placeholder"])]),t("div",et,[p(m,{"filter-option":r(f).filterOptionByName,"show-search":"","allow-clear":"",value:e.edu_form_id,"onUpdate:value":s[5]||(s[5]=a=>e.edu_form_id=a),"field-names":{value:"id",label:"name"},options:n.eduFormOptions,placeholder:r(d)("Choose_Education_Form")},null,8,["filter-option","value","options","placeholder"])]),t("div",tt,[p(m,{"filter-option":r(f).filterOptionByName,"show-search":"","allow-clear":"",value:e.edu_plan_id,"onUpdate:value":s[6]||(s[6]=a=>e.edu_plan_id=a),"field-names":{value:"id",label:"name"},options:n.eduPlanOptions,placeholder:o.$t("Please_select_curriculum")},null,8,["filter-option","value","options","placeholder"])]),t("div",st,[p(m,{"filter-option":r(f).filterOptionByName,"show-search":"","allow-clear":"",value:e.semester_id,"onUpdate:value":s[7]||(s[7]=a=>e.semester_id=a),"field-names":{value:"id",label:"name"},options:n.semesterOptions,placeholder:r(d)("Choose_Semester")},null,8,["filter-option","value","options","placeholder"])]),t("div",at,[p(m,{"filter-option":r(f).filterOptionByName,"show-search":"","allow-clear":"",value:e.academic_group_id,"onUpdate:value":s[8]||(s[8]=a=>e.academic_group_id=a),"field-names":{value:"id",label:"name"},options:n.academicGroupOptions,placeholder:r(d)("Choose_Group")},null,8,["filter-option","value","options","placeholder"])]),t("div",ot,[t("button",{class:"btns c-delet",type:"button",onClick:U},[lt,g(l(o.$t("Clear")),1)])])])])]),t("div",nt,[t("div",it,[t("div",dt,[t("label",rt,l(o.$t("Next_Education Form")),1),p(m,{"filter-option":r(f).filterOptionByName,"show-search":"",value:e.edu_form_id2,"onUpdate:value":s[9]||(s[9]=a=>e.edu_form_id2=a),"field-names":{value:"id",label:"name"},options:n.eduFormOptions,placeholder:r(d)("Choose_Education_Form")},null,8,["filter-option","value","options","placeholder"])]),t("div",ut,[t("label",ct,l(o.$t("transfer__edu__plan")),1),p(m,{"filter-option":r(f).filterOptionByName,"show-search":"",value:e.edu_plan_id2,"onUpdate:value":s[10]||(s[10]=a=>e.edu_plan_id2=a),options:n.eduPlanOptions2,"field-names":{value:"id",label:"name"},placeholder:r(d)("Select_Curriculum")},null,8,["filter-option","value","options","placeholder"])]),t("div",_t,[t("label",pt,l(o.$t("Next_Group")),1),p(m,{"filter-option":r(f).filterOptionByName,"show-search":"",value:e.academic_group_id2,"onUpdate:value":s[11]||(s[11]=a=>e.academic_group_id2=a),"field-names":{value:"id",label:"name"},options:n.academicGroupOptions2,placeholder:r(d)("Choose_Group")},null,8,["filter-option","value","options","placeholder"])]),t("div",mt,[t("label",ft,l(o.$t("Next_Semester")),1),p(m,{"filter-option":r(f).filterOptionByName,"show-search":"",value:e.semester_id2,"onUpdate:value":s[12]||(s[12]=a=>e.semester_id2=a),options:n.semesterOptions2,"field-names":{value:"id",label:"name"},placeholder:r(d)("Choose_Semester")},null,8,["filter-option","value","options","placeholder"])]),t("div",ht,[t("label",vt,l(o.$t("Decree")),1),p(m,{"filter-option":r(f).filterOptionByName,"show-search":"","allow-clear":"",value:e.command_id,"onUpdate:value":s[13]||(s[13]=a=>e.command_id=a),"field-names":{value:"id",label:"name"},options:n.orderListOptions,placeholder:r(d)("Select_the_command")},null,8,["filter-option","value","options","placeholder"]),k.command_id?(y(),b("span",yt,l(k.command_id[0]),1)):B("",!0)]),t("div",bt,[t("label",gt,l(o.$t("Circulation_Doc_Date")),1),p(i,{value:e.dateCommand,"onUpdate:value":s[14]||(s[14]=a=>e.dateCommand=a),disabled:"",placeholder:"YYYY-MM-DD","value-format":"YYYY-MM-DD"},null,8,["value"])]),t("div",wt,[t("label",Ot,l(o.$t("Count_of_Contract_Student")),1),p(i,{disabled:"",value:(L=e==null?void 0:e.students)==null?void 0:L.length},null,8,["value"])]),t("div",Ct,[t("button",{class:"btns c-save",type:"submit",disabled:!((E=e==null?void 0:e.students)!=null&&E.length)||!e.edu_plan_id2||!e.academic_group_id2||!e.semester_id2||!e.command_id},[Ft,g(l(o.$t("transfer")),1)],8,kt)])])])],32)])])}}});export{jt as default};