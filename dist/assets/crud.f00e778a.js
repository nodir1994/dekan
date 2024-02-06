import{d as U,o as m,e as p,f as e,s as O,l as D,t as o,F as Z,r as G,j as d,B as $,y as j,i as w,a as E,k as h,z as M,bO as z,Z as I,bn as H,v as T,bS as N,c as J,w as B,b6 as Q,bs as W}from"./index.3390162f.js";import{h as X}from"./helper.569bc08f.js";import{a as Y,g as x,u as R,c as ee,l as te,d as se}from"./careers.0606e984.js";import{_ as ae}from"./NoData.ac42776e.js";import{_ as P}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{_ as le}from"./SubmitButton.vue_vue_type_script_setup_true_lang.fe21b651.js";import{_ as oe}from"./_plugin-vue_export-helper.cdc0426e.js";import"./sweetalert2.all.fdef424e.js";import"./moment.2cad4b18.js";/* empty css                                                               */import"./vue.runtime.esm-bundler.84001772.js";const ne={class:"card"},ie={class:"card-body"},de={key:1,class:"table-responsive"},re={class:"content-table"},ce={class:"table-career"},ue=e("th",null,"#",-1),me={class:"list-inline mb-0"},_e={class:"list-inline-item"},pe={class:"form-check form-switch my-auto"},fe=["checked","onClick"],ve={class:"list-inline mb-0"},he={class:"list-inline-item"},be={class:"edit__project"},ye=["onClick"],$e=e("i",{class:"mdi mdi-pencil font-size-18 text-primary"},null,-1),ge=[$e],we={class:"list-inline-item"},Ce={class:"edit__project"},ke=["onClick"],Se=e("i",{class:"mdi mdi-delete font-size-18 text-danger"},null,-1),Fe=[Se],Me={key:2,class:"table-responsive"},Le={key:0,class:"element-count mb-2"},De=U({__name:"TableCareerSetttings",props:{tableData:null,isLoading:null},emits:["openFormModal","onRemove","updateStatus"],setup(f,{emit:b}){const c=b;function u(t){c("openFormModal",t)}function r(t){c("onRemove",t)}function a(t){c("updateStatus",t)}return(t,n)=>{var C;const i=P,F=ae;return m(),p("div",null,[e("div",ne,[e("div",ie,[f.isLoading?(m(),O(i,{key:0})):D("",!0),((C=f.tableData)==null?void 0:C.length)>0?(m(),p("div",de,[e("table",re,[e("thead",null,[e("tr",ce,[ue,e("th",null,o(t.$t("Name")),1),e("th",null,o(t.$t("Type")),1),e("th",null,o(t.$t("Status")),1),e("th",null,o(t.$t("Actions")),1)])]),e("tbody",null,[(m(!0),p(Z,null,G(f.tableData,(_,L)=>{var k;return m(),p("tr",{class:"table-career",key:L},[e("td",null,o(L+1),1),e("td",null,o(_.name),1),e("td",null,o((k=_.reward_type)==null?void 0:k.name),1),e("td",null,[e("ul",me,[e("li",_e,[e("div",pe,[e("input",{class:"form-check-input",type:"checkbox",checked:_.status,onClick:s=>a(_)},null,8,fe)])])])]),e("td",null,[e("ul",ve,[e("li",he,[e("div",be,[e("a",{type:"text",onClick:s=>u(_.id)},ge,8,ye)])]),e("li",we,[e("div",Ce,[e("a",{type:"text",onClick:s=>r(_.id)},Fe,8,ke)])])])])])}),128))])])])):(m(),p("div",Me,[d(F)]))])]),f.tableData?(m(),p("span",Le,o(t.$t("Total_Point"))+": "+o(f.tableData.length),1)):D("",!0)])}}}),V=U({__name:"SelectCareerType",emits:["update:value"],setup(f,{emit:b}){const c=$([]);j(async()=>{(await Y().then(a=>a.result)).forEach(a=>{a.code!=="action"&&a.code!=="scientific-career"&&c.value.push(a)})});const u=$();return(r,a)=>{const t=w("a-select");return m(),O(t,{value:u.value,"onUpdate:value":a[0]||(a[0]=n=>u.value=n),"field-names":{value:"id",label:"name"},options:c.value,onChange:a[1]||(a[1]=n=>r.$emit("update:value",u.value)),"allow-clear":"",placeholder:r.$t("Choose")},null,8,["value","options","placeholder"])}}}),A=U({__name:"SelectElementStatus",emits:["update:value"],setup(f,{emit:b}){E();const c=$();return(u,r)=>{const a=w("a-select-option"),t=w("a-select");return m(),O(t,{"allow-clear":"",value:c.value,"onUpdate:value":r[0]||(r[0]=n=>c.value=n),placeholder:u.$t("Choose"),onChange:r[1]||(r[1]=n=>u.$emit("update:value",c.value))},{default:h(()=>[d(a,{value:!0,label:"true"},{default:h(()=>[M(o(u.$t("Active")),1)]),_:1}),d(a,{value:!1,label:"false"},{default:h(()=>[M(o(u.$t("Disable")),1)]),_:1})]),_:1},8,["value","placeholder"])}}}),Ue={id:"modalCareerSettings",class:"modal fade",tabindex:"-1","aria-labelledby":"myModalLabel","aria-hidden":"true"},Ie={class:"modal-dialog"},Oe={class:"modal-content"},Ee={class:"modal-header bg-card-header"},Be={key:0,class:"modal-title",id:"myModalLabel"},je={key:1,class:"modal-title",id:"myModalLabel"},ze=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal"},[e("i",{class:"mdi mdi-close font-size-18"})],-1),Te={class:"modal-body"},Ne={for:"division-name-input",class:"form-label"},Re={key:0,class:"text-danger small"},Pe={for:"division-name-input",class:"form-label"},Ve={key:0,class:"text-danger small"},Ae={for:"division-name-input",class:"form-label"},qe={key:0,class:"text-danger small"},Ke={class:"d-flex justify-content-end"},Ze={type:"button",class:"btns c-cancel me-1","data-bs-dismiss":"modal"},Ge=e("i",{class:"mdi mdi-close font-size-14 align-middle me-1"},null,-1),He=e("i",{class:"mdi mdi-cancel font-size-14 align-middle me-1"},null,-1),Je=U({__name:"ModalCareerSettings",props:{elementId:null},emits:["updateList","close"],setup(f,{emit:b}){const c=f,u=b,{t:r}=E(),a=z(),t=$(!1);$([]),$([]),$([]);const n=I({name:null,status:null,reward_type_id:null}),i=I({name:[],status:[],reward_type_id:[]});$(),j(async()=>{const s=document.getElementById("modalCareerSettings");s==null||s.addEventListener("hidden.bs.modal",l=>{_(),C(),u("close")})}),H(async()=>{var s,l,g,v;if(c.elementId){console.log("salom"),t.value=!0;const y=await x(c.elementId);Object.assign(n,y.result),n.status=(s=y.result)==null?void 0:s.status,n.name=(l=y.result)==null?void 0:l.name,n.reward_type_id=(v=(g=y.result)==null?void 0:g.reward_type)==null?void 0:v.id,t.value=!1}});async function F(){var s,l,g,v;try{t.value=!0,_();const y=c.elementId?await R(c.elementId,{_method:"PUT",...n}):await ee(n);a.success(r("Data_stored_successfully")),u("updateList"),L()}catch(y){Object.assign(i,(l=(s=y.response)==null?void 0:s.data)==null?void 0:l.errors),y.response.status==422?a.error(r("Dashboard_Error")+": "+r("Fill_in_the_required_fields")):a.error((v=(g=y.response)==null?void 0:g.data)==null?void 0:v.errors)}finally{t.value=!1}}function C(){Object.assign(n,{name:null,status:null,reward_type_id:null})}function _(){Object.assign(i,{name:[],status:[],reward_type_id:[]})}function L(){N.getOrCreateInstance("#modalCareerSettings").hide()}function k(s){i[s]=""}return(s,l)=>{const g=P,v=w("a-form-item"),y=w("a-input"),q=le,K=w("a-form");return m(),p("div",Ue,[e("div",Ie,[e("div",Oe,[t.value?(m(),O(g,{key:0})):D("",!0),e("div",Ee,[f.elementId?(m(),p("h5",Be,o(s.$t("editing_scale")),1)):(m(),p("h5",je,o(s.$t("add_scale")),1)),ze]),e("div",Te,[d(K,{onSubmit:T(F,["prevent"])},{default:h(()=>[d(v,{class:"mb-3",name:"nameFaculty"},{default:h(()=>[e("label",Ne,o(s.$t("Type")),1),d(V,{value:n.reward_type_id,"onUpdate:value":l[0]||(l[0]=S=>n.reward_type_id=S),onChange:l[1]||(l[1]=S=>k("reward_type_id"))},null,8,["value"]),i.reward_type_id?(m(),p("span",Re,o(i.reward_type_id[0]),1)):D("",!0)]),_:1}),d(v,{class:"mb-3",name:"nameFaculty"},{default:h(()=>[e("label",Pe,o(s.$t("Name")),1),d(y,{value:n.name,"onUpdate:value":l[2]||(l[2]=S=>n.name=S),placeholder:s.$t("Enter"),onChange:l[3]||(l[3]=S=>k("name"))},null,8,["value","placeholder"]),i.name?(m(),p("span",Ve,o(i.name[0]),1)):D("",!0)]),_:1}),d(v,{class:"mb-3",name:"nameFaculty"},{default:h(()=>[e("label",Ae,o(s.$t("Status")),1),d(A,{value:n.status,"onUpdate:value":l[4]||(l[4]=S=>n.status=S),onChange:l[5]||(l[5]=S=>k("status"))},null,8,["value"]),i.status?(m(),p("span",qe,o(i.status[0]),1)):D("",!0)]),_:1}),e("div",Ke,[e("button",Ze,[Ge,M(" "+o(s.$t("Close")),1)]),e("button",{type:"button",class:"btns c-clear me-1",onClick:C},[He,M(" "+o(s.$t("Clear")),1)]),d(q,{loading:t.value},null,8,["loading"])])]),_:1})])])])])}}}),Qe={},We={type:"submit",class:"btn-search search-color"},Xe=e("i",{class:"mdi mdi-magnify font-size-14 align-middle me-1"},null,-1);function Ye(f,b){return m(),p("button",We,[Xe,M(o(f.$t("Search")),1)])}const xe=oe(Qe,[["render",Ye]]),et={class:"collapse_block"},tt={class:"my-2 col-md-5 form--item"},st={for:"name"},at={class:"my-2 col-md-3 form--item"},lt={for:"..."},ot={class:"my-2 col-md-2 form--item"},nt={for:"..."},it={class:"my-2 col-md-2"},dt=U({__name:"FilterCareerSettings",props:{filterForm:{}},emits:["update:filterForm","search"],setup(f,{emit:b}){const c=f,u=b;J({get(){return c.filterForm},set(a){u("update:filterForm",a)}});async function r(){u("search")}return(a,t)=>{const n=w("a-input"),i=w("a-space"),F=w("b-card"),C=w("b-collapse");return m(),p("div",et,[d(C,{visible:"",id:"collapse-3"},{default:h(()=>[d(F,null,{default:h(()=>[e("form",{class:"row",onSubmit:T(r,["prevent"])},[e("div",tt,[d(i,null,{default:h(()=>[d(n,{id:"name",placeholder:a.$t("Enter"),class:"form-control",value:a.filterForm.search,"onUpdate:value":t[0]||(t[0]=_=>a.filterForm.search=_),"allow-clear":""},null,8,["placeholder","value"])]),_:1}),e("label",st,o(a.$t("Search_by_name")),1)]),e("div",at,[d(i,null,{default:h(()=>[d(V,{value:a.filterForm.reward_type_id,"onUpdate:value":t[1]||(t[1]=_=>a.filterForm.reward_type_id=_)},null,8,["value"])]),_:1}),e("label",lt,o(a.$t("choose__type")),1)]),e("div",ot,[d(i,null,{default:h(()=>[d(A,{value:a.filterForm.status,"onUpdate:value":t[2]||(t[2]=_=>a.filterForm.status=_)},null,8,["value"])]),_:1}),e("label",nt,o(a.$t("Select_status")),1)]),e("div",it,[d(xe,{disabled:!a.filterForm.search},null,8,["disabled"])])],32)]),_:1})]),_:1})])}}}),rt={pagetitle:"'Kordinator'",class:"crud_career"},ct={class:"card panel-header-bg"},ut={class:"card-body"},mt={class:"panel-header"},_t={class:"card-title"},pt={class:"panel-toggles"},ft=e("i",{class:"mdi mdi-plus font-size-14 align-middle me-1"},null,-1),vt={class:"filterBlock"},ht={class:"btns c-filter py-1.5 px-4"},bt=e("i",{class:"mdi mdi-filter font-size-14 align-middle me-1"},null,-1),It=U({__name:"crud",setup(f){const{t:b}=E(),c=z(),u=$(null),r=$(!1),a=$(0),t=I({search:"",status:null,reward_type_id:null,clear:!0}),n=I({result:[]});B(()=>t,async()=>{t.search==""&&a.value==1&&(await i(),a.value=0)},{deep:!0}),B(()=>[t.reward_type_id,t.status],async()=>{await i()}),i();async function i(){var l;r.value=!0,(l=t.search)!=null&&l.length||delete t.search;let s=await te(t);Object.assign(n,s),r.value=!1}async function F(s){const l=await X.confirmDeletionAction(se,s);console.log("salom",l),l&&await i()}async function C(){a.value=1,await i()}function _(s){u.value=s,N.getOrCreateInstance("#modalCareerSettings").show()}function L(){u.value=null}async function k(s){var l;try{r.value=!0,await R(s.id,{name:s.name,reward_type_id:(l=s.reward_type)==null?void 0:l.id,status:!s.status,_method:"PUT"}),await i(),c.success(b("Data_stored_successfully"))}catch{c.error(b("Request_failed1"))}finally{r.value=!1}}return(s,l)=>{const g=Q("b-toggle");return m(),p("div",rt,[e("div",ct,[e("div",ut,[e("div",mt,[e("h5",_t,o(s.$t("settings")),1),e("div",pt,[e("a",{class:"btns c-save py-1.5 px-4 me-3","data-bs-toggle":"modal",onClick:l[0]||(l[0]=v=>_(null)),"data-bs-target":"#myModalMessasge"},[ft,M(o(s.$t("add")),1)]),e("div",vt,[W((m(),p("button",ht,[bt,M(o(s.$t("Filter")),1)])),[[g,void 0,void 0,{"collapse-3":!0}]])])])])])]),d(dt,{"filter-form":t,"onUpdate:filterForm":l[1]||(l[1]=v=>t=v),onSearch:C},null,8,["filter-form"]),d(De,{"table-data":n.result,"is-loading":r.value,onOnRemove:F,onOpenFormModal:_,onUpdateStatus:k},null,8,["table-data","is-loading"]),d(Je,{"element-id":u.value,onUpdateList:i,onClose:L},null,8,["element-id"])])}}});export{It as default};