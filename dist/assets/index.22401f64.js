import{_ as B}from"./CommandForm.vue_vue_type_script_setup_true_lang.05c1d1b3.js";import{f as O,u as j}from"./order-list.31611d4b.js";import{d as x,n as N,a as E,bO as F,B as z,Z as y,bq as I,i as S,o as V,e as $,f as e,j as l,k as b,z as m,t as _,F as P}from"./index.3390162f.js";import"./SubmitButton.vue_vue_type_script_setup_true_lang.fe21b651.js";import"./UploadFile.vue_vue_type_style_index_0_lang.f7f83f37.js";import"./index.30e99442.js";import"./helper.569bc08f.js";import"./sweetalert2.all.fdef424e.js";import"./moment.2cad4b18.js";const T={pagetitle:"'Malaka oshirish'",class:"create-order-page"},q={class:"card panel-header-bg"},A={class:"card-body"},L={class:"panel-header"},M={class:"card-title"},R={class:"panel-toggles"},U={class:"btns black-c py-1.5 px-4",type:"submit"},Z=e("i",{class:"mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"},null,-1),G={class:"card"},H={class:"card-body"},nt=x({__name:"index",async setup(J){var p,h;let u,f;const g=N(),{t:v}=E(),k=F(),i=z(!1),t=y({name:"",target:"",body:"",date:"",number:"",file:null,status:"",command_type_id:null,department_id:null,conclusion:"",_method:"PUT"}),n=y({name:[],target:[],body:[],date:[],number:[],file:[],status:[],command_type_id:[],department_id:[],conclusion:[]}),c=(h=(p=g.params)==null?void 0:p.id)!=null?h:null;[u,f]=I(()=>w()),await u,f();async function w(){console.log(c);const s=await O(c);Object.assign(t,s.result)}async function C(){var s,d;try{i.value=!0,Object.assign(n,{});const a=new FormData;let o={name:t.name,target:t.target,body:t.body,date:t.date,status:t.status,number:t.number,file:typeof t.file=="string"?"":t.file,command_type_id:t.command_type_id,department_id:t.department_id,conclusion:t.conclusion,_method:t._method};t.status||(o.status="false"),Object.getOwnPropertyNames(o).forEach(r=>{!["id","citizenship","user_id"].includes(r)&&o[r]&&a.append(r,o[r])});const K=await j(c,a);k.success(v("Data_stored_successfully"))}catch(a){Object.assign(n,(d=(s=a.response)==null?void 0:s.data)==null?void 0:d.errors)}finally{i.value=!1}}function D(s){n[s]=[]}return(s,d)=>{const a=S("router-link"),o=B;return V(),$(P,null,[e("div",T,[e("div",q,[e("div",A,[e("div",L,[e("h5",M,[l(a,{to:"/status-student/order-list"},{default:b(()=>[m(_(s.$t("Decree"))+" / ",1)]),_:1}),m(" "+_(t.name),1)]),e("div",R,[l(a,{to:"/status-student/order-list"},{default:b(()=>[e("button",U,[Z,m(_(s.$t("Back")),1)])]),_:1})])])])])]),e("div",G,[e("div",H,[l(o,{"form-state":t,errors:n,"is-loading":i.value,onSubmit:C,onClearError:D},null,8,["form-state","errors","is-loading"])])])],64)}}});export{nt as default};
