import{_ as T}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{bR as na,d as j,a as W,B as v,Z as F,y as ia,w as I,o as t,e as s,f as a,s as O,l as L,t as o,F as p,r as m,z as x,h as ra,c as A,aU as da,bn as ua,i as q,b6 as ca,bs as pa,j as b,k as S,v as _a,g as $,aR as ma,q as va,bS as ha}from"./index.3390162f.js";import{_ as ya}from"./NoData.ac42776e.js";import{$ as ba,a0 as E}from"./index.30e99442.js";import{h as ga}from"./moment.2cad4b18.js";import{P as fa}from"./PaginationForStatistical.bc37bc8c.js";import{h as w}from"./helper.569bc08f.js";import"./vue.runtime.esm-bundler.84001772.js";/* empty css                                                               */import"./_plugin-vue_export-helper.cdc0426e.js";import"./sweetalert2.all.fdef424e.js";const G=na();async function wa(B){try{const{data:_}=await G({url:"/api/report/audiences",params:B});return _}catch(_){throw _}}async function Na(B){try{const{data:_}=await G({url:"/api/report/audiences/topic",params:B});return _}catch(_){throw _}}const $a={class:"modal-dialog"},ka={class:"modal-content"},Da={class:"modal-header bg-card-header"},Ba={class:"modal-title",id:"myModalLabel"},Ma=a("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal"},[a("i",{class:"mdi mdi-close font-size-18"})],-1),Ra={class:"modal-body"},Ca={class:"table-responsive"},La={class:"table-vertical"},xa={class:"table-modal w-100 d-grid"},Pa=a("br",null,null,-1),Sa=j({__name:"ReportByRoomsModal",props:{data:{},roomName:{}},emits:["update:list","close"],setup(B,{emit:_}){const Y=B,g=_;W();const h=v(!1),P=v([]);F({name:[],code:[],department_id:[]}),v();const u=v(null);ia(()=>{var i;(i=u.value)==null||i.addEventListener("hidden.bs.modal",function(f){g("close")})}),I(()=>Y.data,async i=>{i&&await k()},{deep:!0});async function k(){try{h.value=!0;const i=await Na(Y.data);P.value=i.result}catch(i){console.log({error:i})}finally{h.value=!1}}return(i,f)=>{const M=T;return t(),s("div",null,[a("div",{id:"ReportByRoomsModal",ref_key:"ReportByRoomsModal",ref:u,class:"modal fade",tabindex:"-1","aria-labelledby":"myModalLabel","aria-hidden":"true"},[a("div",$a,[a("div",ka,[h.value?(t(),O(M,{key:0})):L("",!0),a("div",Da,[a("h5",Ba,o(i.roomName),1),Ma]),a("div",Ra,[a("div",Ca,[a("table",La,[a("thead",null,[a("tr",xa,[a("th",null,[a("strong",null,o(i.$t("student_Sciences")),1)]),a("th",null,[a("strong",null,o(i.$t("employee")),1)]),a("th",null,[a("strong",null,o(i.$t("Group")),1)]),a("th",null,[a("strong",null,o(i.$t("Couple")),1)])])]),a("tbody",null,[(t(!0),s(p,null,m(P.value,(r,N)=>(t(),s("tr",{class:"table-modal w-100 d-grid",key:N},[a("td",null,[x(o(r==null?void 0:r.subject)+" ",1),Pa,x(" "+o(r==null?void 0:r.type),1)]),a("td",null,o(r==null?void 0:r.employee),1),a("td",null,o(r==null?void 0:r.academic_group),1),a("td",null,o(r==null?void 0:r.pair),1)]))),128))])])])])])])],512)])}}}),Fa={pagetitle:"`O'zlashtirish statistikasi`",class:"byRooms"},Ya={class:"card panel-header-bg"},Va={class:"card-body"},Ua={class:"panel-header"},qa={class:"card-title"},Ia={class:"panel-toggles"},Oa={class:"filterBlock"},Ta={class:"btns c-filter py-1.5 px-4"},za=a("i",{class:"mdi mdi-filter me-2"},null,-1),Aa={class:"collapse__block"},Ea={class:"col-md-4 d-flex"},ja={class:"row w-100"},Wa={class:"col-2 my-2"},Ga=["disabled"],Za=a("i",{class:"fas fa-chevron-left"},null,-1),Ha=[Za],Ja={class:"col-8"},Ka={class:"col-2 my-2"},Qa=["disabled"],Xa=a("i",{class:"fas fa-chevron-right"},null,-1),at=[Xa],tt={class:"card"},et={class:"card-body"},st={key:1,class:"table-responsive table-statistical"},lt={class:"position-sticky t-0"},ot={rowspan:"2",style:{"min-width":"55px"}},nt={rowspan:"2",style:{"min-width":"200px"}},it={rowspan:"2"},rt=["colspan"],dt=a("br",null,null,-1),ut=["onClick"],ct={key:2,class:"table-responsive"},pt={key:0},Mt=j({__name:"index",setup(B){const _=ra(),Y=A(()=>{var l,n;return(n=(l=_==null?void 0:_.user)==null?void 0:l.faculty)==null?void 0:n.name}),g=v(!1),{t:h}=W(),P=v(""),u=v(0),k=v(!1),i=v(!1),f=v([]),M=F({date:null,pair_id:null,audience_id:null}),r=v({sequenceNumber:null,theNumber:null,sorting:null}),N=F({building_id:null,per_page:w.pagePer,page:1}),z=F({optionBuildingList:null}),d=F({pagination:{current_page:1,per_page:N.per_page,loading:!1},result:[]}),D=v(""),V=A(()=>{var n;const l=[{day:h("Monday"),date:""},{day:h("Tuesday"),date:""},{day:h("Wednesday"),date:""},{day:h("Thursday"),date:""},{day:h("Friday"),date:""},{day:h("Saturday"),date:""}];if(D.value){const c=(n=f.value)==null?void 0:n.find(y=>(y==null?void 0:y.date)===D.value);return Array(6).fill("").forEach((y,C)=>l[C].date=c&&ga(c==null?void 0:c.start_date,"YYYY-MM-DD").add(C,"days").format("YYYY-MM-DD")),{...c,weekDays:l}}else return{weekDays:l}});da(async()=>{g.value=!0,u.value==0&&(i.value=!0),Promise.all([ba(),E()]).then(l=>{z.optionBuildingList=l[0].result,f.value=l[1],D.value=l[1][u.value].date}),g.value=!1}),I(N,async(l,n)=>{await R()},{deep:!0}),I(()=>d.pagination.current_page,async l=>{Number(l)&&(N.page=Number(l),await R())}),I(u,async(l,n)=>{const c=await E();f.value=c,D.value=c[u.value].date},{deep:!0}),ua(async()=>{D.value&&await R()});function Z(){u.value+=1,(f.value.length-1<u.value||u.value>0)&&(k.value=!1,i.value=!1),f.value.length-1==u.value&&(k.value=!0,i.value=!1)}function H(){u.value-=1,(f.value.length-1<u.value||u.value>0)&&(k.value=!1,i.value=!1),u.value==0&&(i.value=!0,k.value=!1)}async function J(){await R()}async function R(){try{g.value=!0;const l={...N,start_date:V.value.start_date,end_date:V.value.end_date},n=await wa(l);Object.assign(d,n);let c=`${d.pagination.per_page*(d.pagination.current_page-1)+1}- ${d.result.length+d.pagination.per_page*(d.pagination.current_page-1)}`,y=`${h("Total_Point")} : ${d.pagination.total}`,C=d.pagination.per_page*(d.pagination.current_page-1);r.value.sequenceNumber=c,r.value.theNumber=y,r.value.sorting=C}catch(l){console.log(l)}finally{g.value=!1}}function K(l,n){M.date=l.date,M.pair_id=l.pair_id,M.audience_id=l.audience_id,P.value=n,ha.getOrCreateInstance("#ReportByRoomsModal").show()}return(l,n)=>{const c=q("a-select"),y=q("a-form-item"),C=q("b-card"),Q=q("b-collapse"),X=ya,aa=Sa,ta=ca("b-toggle");return t(),s("div",Fa,[a("div",Ya,[a("div",Va,[a("div",Ua,[a("h5",qa,o(l.$t("Audience_occupancy")),1),a("div",Ia,[a("div",Oa,[pa((t(),s("button",Ta,[za,x(o(l.$t("Filtr")),1)])),[[ta,void 0,void 0,{"collapse-3":!0}]])])])])])]),a("div",Aa,[b(Q,{visible:"",id:"collapse-3"},{default:S(()=>[b(C,null,{default:S(()=>[a("form",{class:"row",onSubmit:_a(J,["prevent"])},[a("div",Ea,[a("div",ja,[a("div",Wa,[a("button",{disabled:i.value,onClick:n[0]||(n[0]=e=>H()),class:"b-prev"},Ha,8,Ga)]),a("div",Ja,[b(y,{class:"my-2",name:"nameFaculty",style:{"text-align":"center"}},{default:S(()=>[b(c,{value:D.value,"onUpdate:value":n[1]||(n[1]=e=>D.value=e),options:f.value,"field-names":{value:"date",label:"date"}},null,8,["value","options"])]),_:1})]),a("div",Ka,[a("button",{disabled:k.value,onClick:n[2]||(n[2]=e=>Z()),class:"b-next"},at,8,Qa)])])]),b(y,{class:"my-2 col-md-4",name:"nameFaculty"},{default:S(()=>[b(c,{value:Y.value,"field-names":{value:"id",label:"name"},allowClear:"",disabled:""},null,8,["value"])]),_:1}),b(y,{class:"my-2 col-md-4",name:"nameFaculty"},{default:S(()=>[b(c,{value:N.building_id,"onUpdate:value":n[3]||(n[3]=e=>N.building_id=e),options:z.optionBuildingList,"field-names":{value:"id",label:"name"},allowClear:"",placeholder:l.$t("Select_the_building")},null,8,["value","options","placeholder"])]),_:1})],32)]),_:1})]),_:1})]),a("div",tt,[a("div",et,[g.value?(t(),O(T,{key:0})):L("",!0),d.result.length?(t(),s("div",st,[a("table",null,[a("thead",lt,[a("tr",null,[a("th",ot,o(l.$t("Auditorium")),1),a("th",nt,o(l.$t("Type")),1),a("th",it,o(l.$t("Capacity")),1),(t(!0),s(p,null,m(V.value.weekDays,e=>(t(),s("th",{colspan:$(w).paraNumber},[x(o(e.day)+" ",1),dt,x(" "+o(e.date),1)],8,rt))),256))]),a("tr",null,[(t(!0),s(p,null,m($(w).paraNumber,e=>(t(),s("th",{key:e,style:{"min-width":"25px"}},o(e),1))),128)),(t(!0),s(p,null,m($(w).paraNumber,e=>(t(),s("th",{key:e,style:{"min-width":"25px"}},o(e),1))),128)),(t(!0),s(p,null,m($(w).paraNumber,e=>(t(),s("th",{key:e,style:{"min-width":"25px"}},o(e),1))),128)),(t(!0),s(p,null,m($(w).paraNumber,e=>(t(),s("th",{key:e,style:{"min-width":"25px"}},o(e),1))),128)),(t(!0),s(p,null,m($(w).paraNumber,e=>(t(),s("th",{key:e,style:{"min-width":"25px"}},o(e),1))),128)),(t(!0),s(p,null,m($(w).paraNumber,e=>(t(),s("th",{key:e,style:{"min-width":"25px"}},o(e),1))),128))])]),a("tbody",null,[(t(!0),s(p,null,m(d.result,(e,ea)=>(t(),s("tr",{key:ea},[a("td",null,o(e.name),1),a("td",null,o(e.type),1),a("td",null,o(e.capacity),1),(t(!0),s(p,null,m(V.value.weekDays,sa=>(t(),s(p,null,[(t(!0),s(p,null,m($(w).paraNumber,(la,oa)=>(t(),s("td",{key:oa,style:{padding:"1px"}},[(t(!0),s(p,null,m(e.topics,(U,_t)=>(t(),s(p,null,[Number(U.pair)===la&&U.date===sa.date?(t(),s("button",{key:0,class:"b-rooms",onClick:mt=>K(U,e.name)},o(U.count),9,ut)):L("",!0)],64))),256))]))),128))],64))),256))]))),128))])]),d.pagination.last_page>1?(t(),O(fa,ma({key:0,class:"mt-2"},{...d.pagination},{"current-page":d.pagination.current_page,"onUpdate:currentPage":n[4]||(n[4]=e=>d.pagination.current_page=e),loading:g.value,onOnPageChange:R}),null,16,["current-page","loading"])):L("",!0)])):(t(),s("div",ct,[g.value?(t(),O(T,{key:0})):L("",!0),b(X)]))])]),b(aa,{data:M,roomName:P.value,"onUpdate:list":R},null,8,["data","roomName"]),a("span",{class:va(["element-count mb-2",d.pagination.total?"":"d-none"])},[d.pagination.last_page?(t(),s("span",pt,o(r.value.sequenceNumber)+" / ",1)):L("",!0),x(o(r.value.theNumber),1)],2)])}}});export{Mt as default};