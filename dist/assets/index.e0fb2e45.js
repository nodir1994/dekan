import{_ as J}from"./Pagination.f4a9fc5d.js";import{_ as K}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{d as Q,a as W,bO as X,B as S,h as D,c as ee,Z as C,bq as te,y as se,w as v,i as h,b6 as oe,o as c,e as r,f as t,t as a,j as n,k as _,z as y,bs as ae,g as T,s as x,l as O,F,r as L,q as N,aR as le}from"./index.3390162f.js";import{a as ie,e as ne,b as de,p as ce,c as re,d as _e}from"./index.30e99442.js";import{c as ue,g as pe}from"./aylanma.9ee81440.js";import{S as me}from"./sweetalert2.all.fdef424e.js";import{e as fe,g as he}from"./id.5a6e5f30.js";import{h as P}from"./helper.569bc08f.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./vue.runtime.esm-bundler.84001772.js";import"./moment.2cad4b18.js";const ye=function(){return me.mixin({buttonsStyling:!1,customClass:{confirmButton:"btn btn-success m-1",cancelButton:"btn btn-danger m-1",input:"form-control"}})},ve={class:"circulationSheetPage"},be={class:"card panel-header-bg"},ge={class:"card-body"},we={class:"panel-header"},ke={class:"card-title"},Ce={class:"panel-toggles"},Oe={class:"btns c-save py-1.5 px-4 me-3",type:"submit"},$e=t("i",{class:"mdi mdi-plus me-2"},null,-1),Be={class:"filterBlock"},Se={class:"btns c-filter py-1.5 px-4"},Te={class:"mdi mdi-filter me-2"},xe={class:"collapse__block"},Fe={class:"row"},Le={class:"my-2 col-xl-4 form--item"},Ne={for:"yu"},Pe={class:"my-2 col-xl-4 form--item"},Ee={for:"yu"},Ue={class:"my-2 col-xl-4 form--item"},Ye={for:"yu"},Ge={class:"my-2 col-xl-4 form--item"},ze={class:"my-2 col-xl-4 form--item"},Ie={for:"yu"},Ae={class:"my-2 col-xl-4 form--item"},Re={class:"my-2 col-xl-10 form--item"},je={for:"yu"},qe={class:"my-2 col-xl-2"},Ve=t("i",{class:"mdi mdi-magnify font-size-14 align-middle me-1"},null,-1),Me={class:"row table-division"},Ze={class:"col-xl-12"},He={class:"card"},Je={class:"card-body"},Ke={key:1,class:"table-responsive"},Qe={class:"content-table"},We={class:"table-row-diploma-list"},Xe=t("th",null,"#",-1),De=t("br",null,null,-1),et=t("br",null,null,-1),tt={class:"d-flex flex-wrap"},st={class:"text-center align-middle"},ot=["onClick","disabled"],at={key:0,class:"mdi mdi-check font-size-18 text-primary"},lt={key:1,class:"mdi mdi-close-thick font-size-18 text-danger"},it={key:2},nt={class:"text-center"},dt={class:"text-center"},ct={key:0,class:"element-count mb-2"},kt=Q({__name:"index",async setup(E){let $,B;const{t:u}=W(),U=X(),b=S(!1),g=D(),Y=ee(()=>{var s,o;return(o=(s=g==null?void 0:g.user)==null?void 0:s.faculty)==null?void 0:o.name}),e=C({search:"",specialty_id:null,edu_type_id:null,payment_type_id:null,academic_group_id:null,edu_form_id:null,edu_year_id:null,data:[],links:[],students:[],academic_year_id:null,current_page:1,per_page:P.pagePer,page:1});C({id:null,is_approved:!1,description:null});const d=C({eduTypeOptions:null,eduFormOptions:null,eduPlanOptions:null,academicGroupOptions:null,academicYearOptions:null,specialOptions:null,paymentTypeOptions:null}),w=S(!0);[$,B]=te(()=>p()),await $,B(),se(async()=>{d.academicYearOptions=await ie().then(s=>{var o;return(o=s.result)==null?void 0:o.data}),d.eduTypeOptions=await ne().then(s=>s.result),d.eduFormOptions=await de().then(s=>s.result),d.paymentTypeOptions=await ce().then(s=>s.result),d.specialOptions=await re().then(s=>{var o;return(o=s.result)==null?void 0:o.data.map(i=>({id:i.id,name:i.name+`-(${i.code})`}))})});async function G(){await p()}v(()=>[e.payment_type_id,e.edu_type_id,e.academic_year_id,e.academic_group_id,e.payment_type_id],async()=>{await p()}),v(()=>e.edu_form_id,async()=>{await p(),e.edu_form_id&&(d.eduPlanOptions=await fe(e.edu_form_id).then(s=>{var o;return(o=s.result)==null?void 0:o.data}),d.specialOptions=await _e(e.edu_form_id).then(s=>{var o;return(o=s==null?void 0:s.result)==null?void 0:o.data.map(i=>({id:i.id,name:i.name+`-(${i.code})`}))}))}),v(()=>e.specialty_id,async()=>{var s;if(await p(),e.specialty_id){let o=await he(e.specialty_id);d.academicGroupOptions=(s=o==null?void 0:o.result)==null?void 0:s.data.map(i=>({id:i.id,name:i.name}))}}),v(()=>e.current_page,async s=>{Number(s)&&(e.page=Number(s),await p(s))});function z(s){return!!(s.student_confirmations.length===5&&s.student_confirmations.every(o=>o.is_approved))}async function I(s){const o=ye();try{const i=await o.fire({title:u("Delete_message.Are_you_sure"),icon:"warning",confirmButtonText:u("Delete_message.Yes_Delete"),cancelButtonText:u("Delete_message.Yo_Cancel"),showCancelButton:!0});i.isConfirmed?(await ue(s),await p(),U.success(u("Data_stored_successfully"))):i.dismiss&&o.fire(u("Canceled"),"","success")}catch(i){o.fire(u("Dashboard_Error"),i.message,"error")}}async function p(s){let o={page:s||1,per_page:e.per_page};e.search.length>0&&(o.search=e==null?void 0:e.search),e.edu_type_id&&(o.edu_type_id=e==null?void 0:e.edu_type_id),e.academic_year_id&&(o.academic_year_id=e==null?void 0:e.academic_year_id),e.edu_form_id&&(o.edu_form_id=e==null?void 0:e.edu_form_id),e.specialty_id&&(o.specialty_id=e==null?void 0:e.specialty_id),e.academic_group_id&&(o.academic_group_id=e==null?void 0:e.academic_group_id),b.value=!0;try{if(w.value){w.value=!1;const i=await pe(o);Object.assign(e,i.result),setTimeout(()=>{w.value=!0},P.loaderRefresh)}}catch(i){console.log(i)}finally{b.value=!1}}return(s,o)=>{const i=h("router-link"),f=h("a-select"),m=h("a-space"),A=h("a-input"),R=h("b-card"),j=h("b-collapse"),q=K,V=J,M=oe("b-toggle");return c(),r("div",ve,[t("div",be,[t("div",ge,[t("div",we,[t("h5",ke,a(s.$t("Turnover_sheet")),1),t("div",Ce,[n(i,{to:"/archive/circulation-sheet/removeCirculationSheet"},{default:_(()=>[t("button",Oe,[$e,y(a(s.$t("add")),1)])]),_:1}),t("div",Be,[ae((c(),r("button",Se,[t("i",Te,a(s.$t("Filter")),1)])),[[M,void 0,void 0,{"collapse-3":!0}]])])])])])]),t("div",xe,[n(j,{visible:"",id:"collapse-3"},{default:_(()=>[n(R,null,{default:_(()=>[t("div",Fe,[t("div",Le,[n(m,null,{default:_(()=>[n(f,{class:"form--item",value:Y.value,disabled:""},null,8,["value"])]),_:1}),t("label",Ne,a(s.$t("Choose_faculty")),1)]),t("div",Pe,[n(m,null,{default:_(()=>[n(f,{value:e.academic_year_id,"onUpdate:value":o[0]||(o[0]=l=>e.academic_year_id=l),"field-names":{value:"id",label:"name"},options:d.academicYearOptions,"allow-clear":"","show-search":""},null,8,["value","options"])]),_:1}),t("label",Ee,a(s.$t("Choose_Education_Year")),1)]),t("div",Ue,[n(m,null,{default:_(()=>[n(f,{value:e.edu_type_id,"onUpdate:value":o[1]||(o[1]=l=>e.edu_type_id=l),"field-names":{value:"id",label:"name"},options:d.eduTypeOptions,"allow-clear":"","show-search":""},null,8,["value","options"])]),_:1}),t("label",Ye,a(s.$t("Choose_Education_Type")),1)]),t("div",Ge,[n(m,null,{default:_(()=>[n(f,{"allow-clear":"",value:e.edu_form_id,"onUpdate:value":o[2]||(o[2]=l=>e.edu_form_id=l),"field-names":{value:"id",label:"name"},options:d.eduFormOptions,placeholder:T(u)("Choose_Education_Form")},null,8,["value","options","placeholder"])]),_:1}),t("label",null,a(s.$t("Choose_Education_Form")),1)]),t("div",ze,[n(m,null,{default:_(()=>[n(f,{value:e.specialty_id,"onUpdate:value":o[3]||(o[3]=l=>e.specialty_id=l),"field-names":{value:"id",label:"name"},options:d.specialOptions,"allow-clear":"","show-search":""},null,8,["value","options"])]),_:1}),t("label",Ie,a(s.$t("select__specialty")),1)]),t("div",Ae,[n(m,null,{default:_(()=>[n(f,{"allow-clear":"",value:e.academic_group_id,"onUpdate:value":o[4]||(o[4]=l=>e.academic_group_id=l),"field-names":{value:"id",label:"name"},disabled:!e.specialty_id,options:d.academicGroupOptions,placeholder:T(u)("Choose_Group")},null,8,["value","disabled","options","placeholder"])]),_:1}),t("label",null,a(s.$t("Choose_Group")),1)]),t("div",Re,[n(m,null,{default:_(()=>[n(A,{id:"yu",value:e.search,"onUpdate:value":o[5]||(o[5]=l=>e.search=l),class:"form-control","allow-clear":""},null,8,["value"])]),_:1}),t("label",je,a(s.$t("choose__fish__passport__code")),1)]),t("div",qe,[t("button",{class:"btn-search search-color",onClick:G},[Ve,y(a(s.$t("Search")),1)])])])]),_:1})]),_:1})]),t("div",Me,[t("div",Ze,[t("div",He,[t("div",Je,[b.value?(c(),x(q,{key:0})):O("",!0),e.data.length?(c(),r("div",Ke,[t("table",Qe,[t("thead",null,[t("tr",We,[Xe,t("th",null,a(s.$t("Student")),1),t("th",null,a(s.$t("by_Specialty")),1),t("th",null,a(s.$t("Education_Year_Name")),1),t("th",null,a(s.$t("Circulation_Doc_Number")),1),t("th",null,a(s.$t("Responsiple_checked_status")),1),t("th",null,a(s.$t("Confirmation")),1)])]),t("tbody",null,[(c(!0),r(F,null,L(e==null?void 0:e.data,(l,Z)=>(c(),r("tr",{class:"table-row-diploma-list",key:l.id},[t("td",null,a((e.current_page-1)*e.per_page+Z+1),1),t("td",null,[y(a(l.student)+" ",1),De,y(" "+a(l.id)+" / "+a(l.edu_type)+" , "+a(l.edu_form),1)]),t("td",null,a(l.specialty_code),1),t("td",null,[y(a(l.academic_year)+" ",1),et,y(" "+a(l.academic_group),1)]),t("td",null,a(l.document_number),1),t("td",null,[t("div",tt,[(c(!0),r(F,null,L(l==null?void 0:l.student_confirmations,(k,H)=>(c(),r("div",{class:N("mb-1"),key:H},[t("span",{class:N(["btns1 d-block text-nowrap done-c px-1 me-1",k.is_approved?"actions-h":"actions-r"])},a(k.name),3)]))),128))])]),t("td",st,[t("button",{class:"btns",type:"button",onClick:k=>I(l.id),disabled:!z(l)},[l.is_approved?(c(),r("i",at)):(c(),r("i",lt))],8,ot)])]))),128))])]),e.last_page>1?(c(),x(V,le({key:0,class:"mt-2"},{...e},{"current-page":e.current_page,"onUpdate:currentPage":o[6]||(o[6]=l=>e.current_page=l)}),null,16,["current-page"])):O("",!0)])):(c(),r("div",it,[t("h5",nt,a(s.$t("No_data")),1),t("p",dt,a(s.$t("No_information_found")),1)]))])]),e!=null&&e.total?(c(),r("span",ct,a(e==null?void 0:e.current_page)+"-"+a((e==null?void 0:e.data.length)+e.per_page*((e==null?void 0:e.current_page)-1))+"/ "+a(s.$t("Total_Point"))+": "+a(e==null?void 0:e.total),1)):O("",!0)])])])}}});export{kt as default};
