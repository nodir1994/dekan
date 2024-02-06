import{_ as Z}from"./Pagination.f4a9fc5d.js";import{bR as H,d as J,a as K,bO as Q,B as z,h as X,c as D,Z as $,bq as tt,y as at,w as m,i as h,b6 as st,o as y,e as b,f as t,t as i,bs as et,z as f,j as l,k as u,g as E,F as ot,r as it,s as lt,aR as nt,l as G,v as dt}from"./index.3390162f.js";import{a as ct,e as rt,b as ut,p as _t,c as pt}from"./index.30e99442.js";import{S as mt}from"./sweetalert2.all.fdef424e.js";import{e as ht,g as yt}from"./id.5a6e5f30.js";import{h as M}from"./helper.569bc08f.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./moment.2cad4b18.js";const k=H();async function ft(p){try{const{data:d}=await k({url:"api/archive/graduation-sheet/filter",method:"GET",params:p});return d}catch(d){throw d}}async function vt(p){try{const{data:d}=await k({url:`api/archive/graduation-sheet/show/${p}`,method:"GET"});return d}catch(d){throw d}}async function bt(p){try{console.log(p);const{data:d}=await k({url:`api/archive/graduation-sheet/update/${p.id}`,method:"PUT",params:p});return d}catch(d){throw d}}const gt={pagetitle:"`Bitruv varag'i`",class:"circulationSheetCheckPage"},wt={class:"card panel-header-bg"},Ct={class:"card-body"},$t={class:"panel-header"},kt={class:"card-title"},Ot={class:"panel-toggles"},St={class:"filterBlock"},Bt={class:"btns c-filter py-1.5 px-4"},Tt=t("i",{class:"mdi mdi-filter font-size-14 align-middle me-1"},null,-1),Ft={class:"collapse__block"},Lt={class:"row"},xt={class:"my-2 col-xl-4 form--item"},zt={for:"yu"},Et={class:"my-2 col-xl-4 form--item"},Gt={for:"yu"},Mt={class:"my-2 col-xl-4 form--item"},Pt={for:"yu"},Ut={class:"my-2 col-xl-4 form--item"},It={class:"my-2 col-xl-4 form--item"},Nt={for:"yu"},Yt={class:"my-2 col-xl-4 form--item"},jt={class:"my-2 col-xl-10 form--item"},Rt={for:"yu"},At={class:"my-2 col-xl-2"},Vt=t("i",{class:"mdi mdi-magnify font-size-14 align-middle me-1"},null,-1),qt={class:"row table-division"},Wt={class:"col-xl-12"},Zt={class:"card"},Ht={class:"card-body"},Jt={class:"table-responsive"},Kt={class:"content-table"},Qt={class:"table-row d-grid w-100"},Xt=t("th",null,[t("b",null,"#")],-1),Dt={type:"text","data-bs-toggle":"modal","data-bs-target":"#myModalMessasge"},ta=t("br",null,null,-1),aa=t("br",null,null,-1),sa={class:"list-inline mb-0"},ea={class:"list-inline-item"},oa={class:"edit__project"},ia=["onClick"],la=t("i",{class:"mdi mdi-pencil font-size-18 text-primary"},null,-1),na=[la],da={class:"list-inline-item"},ca={key:0},ra=["onClick"],ua=t("i",{class:"mdi mdi-check font-size-18 text-primary"},null,-1),_a=[ua],pa={key:1},ma=["onClick"],ha=t("i",{class:"mdi mdi-close-thick font-size-18 text-danger"},null,-1),ya=[ha],fa={key:0,class:"element-count mb-2"},va={id:"myModalMessasge",class:"modal fade",tabindex:"-1","aria-labelledby":"myModalLabel","aria-hidden":"true"},ba={class:"modal-dialog"},ga={class:"modal-content"},wa={class:"modal-header bg-card-header"},Ca={class:"modal-title",id:"myModalLabel"},$a=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal"},[t("i",{class:"mdi mdi-close font-size-18"})],-1),ka={class:"modal-body"},Oa={for:"division-name-input",class:"form-label"},Sa={class:"d-flex justify-content-end"},Ba={type:"button",class:"btns c-cancel me-1","data-bs-dismiss":"modal"},Ta=t("i",{class:"mdi mdi-close font-size-14 align-middle me-1"},null,-1),Fa={class:"btns c-save","data-bs-dismiss":"modal",type:"submit"},La=t("i",{class:"mdi mdi-content-save font-size-14 align-middle me-1"},null,-1),Na=J({__name:"circulation-sheet-check",async setup(p){let d,O;const{t:_}=K(),S=Q(),B=z(!1),w=X(),P=D(()=>{var s,o;return(o=(s=w==null?void 0:w.user)==null?void 0:s.faculty)==null?void 0:o.name}),a=$({search:"",specialty_id:null,edu_type_id:null,payment_type_id:null,academic_group_id:null,edu_form_id:null,edu_year_id:null,data:[],links:[],students:[],academic_year_id:null,current_page:1,per_page:M.pagePer}),g=$({id:null,is_approved:!1,description:null}),c=$({eduTypeOptions:null,eduFormOptions:null,eduPlanOptions:null,academicGroupOptions:null,academicYearOptions:null,specialOptions:null,paymentTypeOptions:null}),C=z(!0);[d,O]=tt(()=>r()),await d,O(),at(async()=>{c.academicYearOptions=await ct().then(s=>{var o;return(o=s.result)==null?void 0:o.data}),c.eduTypeOptions=await rt().then(s=>s.result),c.eduFormOptions=await ut().then(s=>s.result),c.paymentTypeOptions=await _t().then(s=>s==null?void 0:s.result),c.specialOptions=await pt().then(s=>s.result.data.map(o=>({id:o.id,name:o.name+`-(${o.code})`})))});async function U(){await r()}m(()=>a.payment_type_id,async()=>{await r()}),m(()=>a.edu_type_id,async()=>{await r()}),m(()=>a.academic_year_id,async()=>{await r()}),m(()=>a.edu_form_id,async()=>{a.specialty_id=null,c.specialOptions=null,await r(),a.edu_form_id&&(c.eduPlanOptions=await ht(a.edu_form_id).then(s=>{var o;return(o=s.result)==null?void 0:o.data}))}),m(()=>a.specialty_id,async()=>{var s;if(a.academic_group_id=null,c.academicGroupOptions=null,await r(),a.specialty_id){let o=await yt(a.specialty_id);c.academicGroupOptions=(s=o==null?void 0:o.result)==null?void 0:s.data.map(n=>({id:n.id,name:n.name}))}}),m(()=>a.academic_group_id,async()=>{await r()}),m(()=>a.current_page,async s=>{Number(s)&&(a.page=Number(s),await r(s))}),m(()=>a.payment_type_id,async()=>{await r()});async function r(s){let o={page:s||1,per_page:a.per_page};a.search.length>0&&(o.search=a==null?void 0:a.search),a.edu_type_id&&(o.edu_type_id=a==null?void 0:a.edu_type_id),a.edu_form_id&&(o.edu_form_id=a==null?void 0:a.edu_form_id),a.specialty_id&&(o.specialty_id=a==null?void 0:a.specialty_id),a.academic_group_id&&(o.academic_group_id=a==null?void 0:a.academic_group_id);try{if(B.value=!0,C.value){C.value=!1;const n=await ft(o);Object.assign(a,n.result),setTimeout(()=>{C.value=!0},M.loaderRefresh)}}catch(n){console.log(n)}finally{B.value=!1}}async function T(s){let o=await vt(s).then(n=>n.result);Object.assign(g,o)}async function F(s){try{const o=await bt(g);await r(),S.success(_("Data_stored_successfully"))}catch(o){S.error(_("Failed")+": "+o.message)}}async function L(s){const o=mt.mixin({customClass:{confirmButton:"btn btn-danger me-2",cancelButton:"btn btn-success"},buttonsStyling:!1});try{(await o.fire({title:_("Delete_message.Are_you_sure"),text:_("change_statuses"),icon:"warning",confirmButtonText:_("Continue"),cancelButtonText:_("No_cancel"),showCancelButton:!0})).isConfirmed&&(await T(s),g.is_approved=!g.is_approved,await F(s))}catch(n){o.fire(_("Dashboard_Error"),n.message,"error")}}return(s,o)=>{const n=h("a-select"),v=h("a-space"),I=h("a-input"),N=h("b-card"),Y=h("b-collapse"),j=Z,R=h("a-textarea"),A=h("a-form-item"),V=h("a-form"),q=st("b-toggle");return y(),b("div",gt,[t("div",wt,[t("div",Ct,[t("div",$t,[t("h5",kt,i(s.$t("archive_Circulation_Sheet_Check")),1),t("div",Ot,[t("div",St,[et((y(),b("button",Bt,[Tt,f(i(s.$t("Filter")),1)])),[[q,void 0,void 0,{"collapse-3":!0}]])])])])])]),t("div",Ft,[l(Y,{visible:"",id:"collapse-3"},{default:u(()=>[l(N,null,{default:u(()=>[t("div",Lt,[t("div",xt,[l(v,null,{default:u(()=>[l(n,{class:"form--item",value:P.value,disabled:""},null,8,["value"])]),_:1}),t("label",zt,i(s.$t("Choose_faculty")),1)]),t("div",Et,[l(v,null,{default:u(()=>[l(n,{value:a.academic_year_id,"onUpdate:value":o[0]||(o[0]=e=>a.academic_year_id=e),"field-names":{value:"id",label:"name"},options:c.academicYearOptions,"allow-clear":""},null,8,["value","options"])]),_:1}),t("label",Gt,i(s.$t("Choose_Education_Year")),1)]),t("div",Mt,[l(v,null,{default:u(()=>[l(n,{value:a.edu_type_id,"onUpdate:value":o[1]||(o[1]=e=>a.edu_type_id=e),"field-names":{value:"id",label:"name"},options:c.eduTypeOptions,"allow-clear":""},null,8,["value","options"])]),_:1}),t("label",Pt,i(s.$t("Choose_Education_Type")),1)]),t("div",Ut,[l(v,null,{default:u(()=>[l(n,{"allow-clear":"",value:a.edu_form_id,"onUpdate:value":o[2]||(o[2]=e=>a.edu_form_id=e),"field-names":{value:"id",label:"name"},options:c.eduFormOptions,placeholder:E(_)("Choose_Education_Form")},null,8,["value","options","placeholder"])]),_:1}),t("label",null,i(s.$t("Choose_Education_Form")),1)]),t("div",It,[l(v,null,{default:u(()=>[l(n,{value:a.specialty_id,"onUpdate:value":o[3]||(o[3]=e=>a.specialty_id=e),"field-names":{value:"id",label:"name"},options:c.specialOptions,"allow-clear":""},null,8,["value","options"])]),_:1}),t("label",Nt,i(s.$t("select__specialty")),1)]),t("div",Yt,[l(v,null,{default:u(()=>[l(n,{"allow-clear":"",value:a.academic_group_id,"onUpdate:value":o[4]||(o[4]=e=>a.academic_group_id=e),"field-names":{value:"id",label:"name"},disabled:!a.specialty_id,options:c.academicGroupOptions,placeholder:E(_)("Choose_Group")},null,8,["value","disabled","options","placeholder"])]),_:1}),t("label",null,i(s.$t("Choose_Group")),1)]),t("div",jt,[l(v,null,{default:u(()=>[l(I,{id:"yu",value:a.search,"onUpdate:value":o[5]||(o[5]=e=>a.search=e),class:"form-control","allow-clear":""},null,8,["value"])]),_:1}),t("label",Rt,i(s.$t("choose__fish__passport__code")),1)]),t("div",At,[t("button",{class:"btn-search search-color",onClick:U},[Vt,f(i(s.$t("Search")),1)])])])]),_:1})]),_:1})]),t("div",qt,[t("div",Wt,[t("div",Zt,[t("div",Ht,[t("div",Jt,[t("table",Kt,[t("thead",null,[t("tr",Qt,[Xt,t("th",null,[t("b",null,i(s.$t("Student")),1)]),t("th",null,[t("b",null,i(s.$t("Curriculum_Education_Year")),1)]),t("th",null,[t("b",null,i(s.$t("Education_Type")),1)]),t("th",null,[t("b",null,i(s.$t("by_Specialty")),1)]),t("th",null,[t("b",null,i(s.$t("Group")),1)]),t("th",null,[t("b",null,i(s.$t("Circulation_Sheet_Comment")),1)]),t("th",null,[t("b",null,i(s.$t("Circulation_Status")),1)])])]),t("tbody",null,[(y(!0),b(ot,null,it(a==null?void 0:a.data,(e,W)=>(y(),b("tr",{class:"table-row d-grid w-100",key:e.id},[t("td",null,i((a.current_page-1)*a.per_page+W+1),1),t("td",null,[t("a",Dt,[f(i(e==null?void 0:e.student)+" ",1),ta,f(" "+i(e==null?void 0:e.id),1)])]),t("td",null,i(e==null?void 0:e.academic_year),1),t("td",null,[f(i(e==null?void 0:e.edu_type)+" ",1),aa,f(" "+i(e==null?void 0:e.edu_form),1)]),t("td",null,i(e==null?void 0:e.specialty),1),t("td",null,i(e==null?void 0:e.academic_group),1),t("td",null,i(e==null?void 0:e.description),1),t("td",null,[t("ul",sa,[t("li",ea,[t("div",oa,[t("a",{type:"text",onClick:x=>T(e.id),"data-bs-toggle":"modal","data-bs-target":"#myModalMessasge"},na,8,ia)])]),t("li",da,[e!=null&&e.is_approved?(y(),b("div",ca,[t("a",{type:"text",onClick:x=>L(e==null?void 0:e.id)},_a,8,ra)])):(y(),b("div",pa,[t("a",{type:"text",onClick:x=>L(e==null?void 0:e.id)},ya,8,ma)]))])])])]))),128))])]),a.last_page>1?(y(),lt(j,nt({key:0,class:"mt-2"},{...a},{"current-page":a.current_page,"onUpdate:currentPage":o[6]||(o[6]=e=>a.current_page=e)}),null,16,["current-page"])):G("",!0)])])])])]),a.data.length?(y(),b("span",fa,i(a.current_page)+"-"+i(a.data.length+a.per_page*(a.current_page-1))+"/ "+i(s.$t("Total_Point"))+": "+i(a.total),1)):G("",!0),t("div",va,[t("div",ba,[t("div",ga,[t("div",wa,[t("h5",Ca,i(s.$t("Circulation_Sheet_Comment")),1),$a]),t("div",ka,[l(V,{onSubmit:dt(F,["prevent"])},{default:u(()=>[l(A,{class:"mb-3",name:"nameFaculty"},{default:u(()=>[t("label",Oa,i(s.$t("Circulation_Sheet_Comment")),1),l(R,{value:g.description,"onUpdate:value":o[7]||(o[7]=e=>g.description=e),"auto-size":{minRows:4.5,maxRows:6}},null,8,["value"])]),_:1}),t("div",Sa,[t("button",Ba,[Ta,f(" "+i(s.$t("Close")),1)]),t("button",Fa,[La,f(" "+i(s.$t("Save")),1)])])]),_:1})])])])])])}}});export{Na as default};