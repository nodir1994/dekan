import{_ as Z}from"./Pagination.f4a9fc5d.js";import{_ as J}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{d as K,a as Q,bO as W,B as N,h as X,c as Y,Z as A,bq as D,y as ee,w as b,i as f,b6 as se,o as d,e as _,f as s,t as l,j as i,k as r,z as w,bs as C,g as y,s as P,l as B,bH as z,F as te,r as ae,aR as oe}from"./index.3390162f.js";import{a as le,a1 as ie}from"./index.30e99442.js";import{g as ne,t as ce}from"./academic-note.86023cee.js";import"./sweetalert2.all.fdef424e.js";import{o as de,g as re}from"./id.5a6e5f30.js";import{h as v}from"./helper.569bc08f.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./vue.runtime.esm-bundler.84001772.js";import"./moment.2cad4b18.js";const ue={pagetitle:"`Akademik yozuv`",class:"diploma-list"},_e={class:"card panel-header-bg"},pe={class:"card-body"},me={class:"panel-header"},he={class:"card-title"},fe={class:"panel-toggles"},ye=s("i",{class:"fas fa-eye me-1"},null,-1),ve=["disabled"],ge=s("i",{class:"mdi mdi-check font-size-14 align-middle me-1"},null,-1),be={class:"filterBlock"},we={class:"btns c-filter py-1.5 px-4"},ke=s("i",{class:"mdi mdi-filter font-size-14 align-middle me-1"},null,-1),Oe={class:"collapse__block"},$e={class:"row"},Ne={class:"my-2 col-xl-3 form--item"},Ce={for:"yu"},Be={class:"my-2 col-xl-3 form--item"},Se={for:"yu"},Ue={class:"my-2 col-xl-3 form--item"},Ge={for:"yu"},Le={class:"my-2 col-xl-3 form--item"},Ye={class:"my-2 col-xl-4 form--item"},Ae={class:"my-2 col-xl-5 form--item"},Pe={for:"yu"},ze={class:"my-2 col-xl-3"},Fe=s("i",{class:"mdi mdi-magnify font-size-14 align-middle me-1"},null,-1),Ie={class:"row table-division"},je={class:"col-xl-12"},Te={class:"card"},Ve={class:"card-body"},xe={key:1,class:"table-responsive"},Ee={class:"content-table"},Me={class:"table-row-note-ind"},Re={class:"form-check"},qe=s("th",null,"#",-1),He={class:"form-check"},Ze=["value"],Je={key:2},Ke={class:"text-center"},Qe={class:"text-center"},We={key:0,class:"element-count mb-2"},us=K({__name:"index",async setup(Xe){let S,U;const{t:p}=Q(),G=W(),k=N(!1),O=X(),F=Y(()=>{var t,a;return(a=(t=O==null?void 0:O.user)==null?void 0:t.faculty)==null?void 0:a.name}),g=N([]),e=A({search:"",specialty_id:null,academic_group_id:null,academic_year_id:null,semester_id:null,data:[],links:[],students:[],current_page:1,per_page:v.pagePer}),L=Y({get(){var t,a;return((t=e==null?void 0:e.students)==null?void 0:t.length)===((a=g==null?void 0:g.value)==null?void 0:a.length)},set(t){t?e.students=g.value:e.students=[]}}),c=A({academicGroupOptions:null,academicYearOptions:null,specialOptions:null,paymentTypeOptions:null,semesterOptions:null}),$=N(!0);[S,U]=D(()=>m()),await S,U(),ee(async()=>{c.academicYearOptions=await le().then(t=>{var a;return(a=t.result)==null?void 0:a.data}),c.specialOptions=await ie().then(t=>t.result.data.map(a=>({id:a.id,name:a.name+`-(${a.code})`})))});async function I(){await m()}b(()=>e.academic_year_id,async()=>{await m()}),b(()=>e.academic_group_id,async()=>{var t;if(e.semester_id=null,c.semesterOptions=null,e.academic_group_id){let a=await de(e.academic_group_id);c.semesterOptions=(t=a==null?void 0:a.result)==null?void 0:t.data.map(n=>({id:n.id,semester:n.semester,name:n.course+"-"+p("course")+" "+n.semester+"-"+p("semester")}))}await m()}),b(()=>e.specialty_id,async()=>{var t;if(e.academic_group_id=null,c.academicGroupOptions=null,await m(),e.specialty_id){let a=await re(e.specialty_id);c.academicGroupOptions=(t=a==null?void 0:a.result)==null?void 0:t.data.map(n=>({id:n.id,name:n.name}))}}),b(()=>e.current_page,async t=>{Number(t)&&(e.page=Number(t),await m(t))});async function m(t){let a={page:t||1,per_page:e.per_page};e.search.length>0&&(a.search=e==null?void 0:e.search),e.semester_id&&(a.semester_id=e==null?void 0:e.semester_id),e.academic_year_id&&(a.academic_year_id=e==null?void 0:e.academic_year_id),e.specialty_id&&(a.specialty_id=e==null?void 0:e.specialty_id),e.academic_group_id&&(a.academic_group_id=e==null?void 0:e.academic_group_id);try{if(k.value=!0,$.value){$.value=!1;const n=await ne(a);Object.assign(e,n.result),g.value=e.data.map(u=>u.id),setTimeout(()=>{$.value=!0},v.loaderRefresh)}}catch(n){console.log(n)}finally{k.value=!1}}async function j(){try{let t=e.students;const a=await ce({list:t});G.success(p("Data_stored_successfully"))}catch(t){G.error(p("Failed")+": "+t.message)}}return(t,a)=>{const n=f("router-link"),u=f("a-select"),h=f("a-space"),T=f("a-input"),V=f("b-card"),x=f("b-collapse"),E=J,M=Z,R=se("b-toggle");return d(),_("div",ue,[s("div",_e,[s("div",pe,[s("div",me,[s("h5",he,l(t.$t("academic_record")),1),s("div",fe,[i(n,{to:"/archive/academic-note/view",class:"btns student-c py-1.5 px-4 me-3"},{default:r(()=>[ye,w(l(t.$t("Preview")),1)]),_:1}),s("button",{onClick:j,disabled:!(e!=null&&e.students.length),class:"btns c-save py-1.5 px-4 me-3"},[ge,w(l(t.$t("transfer")),1)],8,ve),s("div",be,[C((d(),_("button",we,[ke,w(l(t.$t("Filter")),1)])),[[R,void 0,void 0,{"collapse-3":!0}]])])])])])]),s("div",Oe,[i(x,{visible:"",id:"collapse-3"},{default:r(()=>[i(V,null,{default:r(()=>[s("div",$e,[s("div",Ne,[i(h,null,{default:r(()=>[i(u,{class:"form--item",value:F.value,disabled:""},null,8,["value"])]),_:1}),s("label",Ce,l(t.$t("Choose_faculty")),1)]),s("div",Be,[i(h,null,{default:r(()=>[i(u,{"filter-option":y(v).filterOptionByName,"show-search":"",value:e.academic_year_id,"onUpdate:value":a[0]||(a[0]=o=>e.academic_year_id=o),"field-names":{value:"id",label:"name"},options:c.academicYearOptions,"allow-clear":""},null,8,["filter-option","value","options"])]),_:1}),s("label",Se,l(t.$t("Choose_Education_Year")),1)]),s("div",Ue,[i(h,null,{default:r(()=>[i(u,{"filter-option":y(v).filterOptionByName,"show-search":"",value:e.specialty_id,"onUpdate:value":a[1]||(a[1]=o=>e.specialty_id=o),"field-names":{value:"id",label:"name"},options:c.specialOptions,"allow-clear":""},null,8,["filter-option","value","options"])]),_:1}),s("label",Ge,l(t.$t("select__specialty")),1)]),s("div",Le,[i(h,null,{default:r(()=>[i(u,{"filter-option":y(v).filterOptionByName,"show-search":"","allow-clear":"",value:e.academic_group_id,"onUpdate:value":a[2]||(a[2]=o=>e.academic_group_id=o),"field-names":{value:"id",label:"name"},disabled:!e.specialty_id,options:c.academicGroupOptions,placeholder:y(p)("Choose_Group")},null,8,["filter-option","value","disabled","options","placeholder"])]),_:1}),s("label",null,l(t.$t("Choose_Group")),1)]),s("div",Ye,[i(h,null,{default:r(()=>[i(u,{"filter-option":y(v).filterOptionByName,"show-search":"","allow-clear":"",value:e.semester_id,"onUpdate:value":a[3]||(a[3]=o=>e.semester_id=o),disabled:!e.academic_group_id,"field-names":{value:"id",label:"name"},options:c.semesterOptions,placeholder:y(p)("Choose")},null,8,["filter-option","value","disabled","options","placeholder"])]),_:1}),s("label",null,l(t.$t("Choose_Semester")),1)]),s("div",Ae,[i(h,null,{default:r(()=>[i(T,{id:"yu",value:e.search,"onUpdate:value":a[4]||(a[4]=o=>e.search=o),class:"form-control","allow-clear":""},null,8,["value"])]),_:1}),s("label",Pe,l(t.$t("choose__fish__passport__code")),1)]),s("div",ze,[s("button",{onClick:I,class:"btn-search search-color"},[Fe,w(l(t.$t("Search")),1)])])])]),_:1})]),_:1})]),s("div",Ie,[s("div",je,[s("div",Te,[s("div",Ve,[k.value?(d(),P(E,{key:0})):B("",!0),e.data.length?(d(),_("div",xe,[s("table",Ee,[s("thead",null,[s("tr",Me,[s("th",null,[s("div",Re,[C(s("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":a[5]||(a[5]=o=>L.value=o)},null,512),[[z,L.value]])])]),qe,s("th",null,l(t.$t("Student")),1),s("th",null,l(t.$t("Education_Year_Name")),1),s("th",null,l(t.$t("Semester_Name")),1),s("th",null,l(t.$t("Group")),1),s("th",null,l(t.$t("Subjects")),1),s("th",null,l(t.$t("gradeSome")),1)])]),s("tbody",null,[(d(!0),_(te,null,ae(e.data,(o,q)=>(d(),_("tr",{class:"table-row-note-ind",key:o.id},[s("td",null,[s("div",He,[C(s("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":a[6]||(a[6]=H=>e.students=H),value:o==null?void 0:o.id},null,8,Ze),[[z,e.students]])])]),s("td",null,l((e.current_page-1)*e.per_page+q+1),1),s("td",null,l(o==null?void 0:o.student),1),s("td",null,l(o==null?void 0:o.academic_year),1),s("td",null,l(o==null?void 0:o.semester)+"-"+l(t.$t("semestr")),1),s("td",null,l(o==null?void 0:o.academic_group),1),s("td",null,l(o==null?void 0:o.subject),1),s("td",null,l(o==null?void 0:o.rating),1)]))),128))])]),e.last_page>1?(d(),P(M,oe({key:0,class:"mt-2"},{...e},{"current-page":e.current_page,"onUpdate:currentPage":a[7]||(a[7]=o=>e.current_page=o)}),null,16,["current-page"])):B("",!0)])):(d(),_("div",Je,[s("h5",Ke,l(t.$t("No_data")),1),s("p",Qe,l(t.$t("No_information_found")),1)]))])]),e.total?(d(),_("span",We,l(e.current_page)+"-"+l((e==null?void 0:e.data.length)+e.per_page*(e.current_page-1))+"/ "+l(t.$t("Total_Point"))+": "+l(e.total),1)):B("",!0)])])])}}});export{us as default};