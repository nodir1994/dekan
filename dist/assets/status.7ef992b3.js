import{_ as nt}from"./UploadFile.vue_vue_type_style_index_0_lang.f7f83f37.js";import{_ as lt}from"./Pagination.f4a9fc5d.js";import{_ as dt}from"./LoadingOverlay.vue_vue_type_script_setup_true_lang.89ce9ad6.js";/* empty css                                                       */import{bR as ct,d as it,h as rt,c as j,bO as ut,B as g,a as _t,Z as U,bq as pt,w as F,i as p,b6 as ft,o as d,e as c,f as s,t as n,bs as N,z as m,j as l,k as i,s as Y,l as k,bH as M,F as A,r as ht,aR as mt,g as G}from"./index.3390162f.js";import{h as I}from"./helper.569bc08f.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./vue.runtime.esm-bundler.84001772.js";import"./sweetalert2.all.fdef424e.js";import"./moment.2cad4b18.js";const q=ct();async function vt(w){try{const{data:r}=await q({url:"/api/attendances/students",method:"GET",params:w});return r}catch(r){throw r}}async function bt(w){try{const{data:r}=await q({url:"/api/attendances/status",method:"POST",data:w});return r}catch(r){throw r}}const yt={pagetitle:"`Davomat statusi`",class:"studentListPage"},gt={class:"card panel-header-bg"},kt={class:"card-body"},wt={class:"panel-header"},$t={class:"card-title"},St={class:"panel-toggles"},Dt={class:"filterBlock"},Ct={class:"btns c-filter py-1.5 px-4"},Ut=s("i",{class:"mdi mdi-filter font-size-14 align-middle me-1"},null,-1),Ft={class:"collapse__block"},Nt={class:"row"},Yt={class:"my-2 col-md-4 form--item"},Lt={for:"yu"},Ot={class:"my-2 col-md-4 form--item"},Pt={for:"yu"},zt={class:"my-2 col-md-4 form--item"},Bt={for:"yu"},Et={class:"my-2 col-md-10 form--item"},Rt={for:"yu"},Tt={class:"my-2 col-md-2"},Vt=s("i",{class:"mdi mdi-magnify font-size-14 align-middle me-1"},null,-1),jt={class:"row table-division"},Mt={class:"row"},At={class:"col-xl-8"},Gt={class:"card"},It={class:"card-body"},qt={key:1,class:"table-responsive"},Ht={class:"content-table"},Kt={class:"table-row-student-list"},Zt={class:"form-check"},Jt=s("th",null,"#",-1),Qt={class:"form-check"},Wt=["value"],Xt=s("br",null,null,-1),xt={style:{color:"#a99494"}},ts={key:0,class:"text-success"},ss={key:1,class:"text-danger"},es={key:0,class:"justify-content-center"},as=["href"],os=s("i",{class:"mdi mdi-download font-size-18"},null,-1),ns=[os],ls={key:2},ds={class:"text-center"},cs={class:"text-center"},is={key:0,class:"element-count mb-2"},rs={class:"col-xl-4"},us={class:"card"},_s={class:"card-body"},ps={for:"division-name-input",class:"form-label"},fs={for:"division-name-input",class:"form-label"},hs={for:"division-name-select",class:"form-label"},ms={class:"d-flex justify-content-end"},vs=["disabled"],bs={key:0,class:"spinner-border spinner-border-sm me-1",role:"status","aria-hidden":"true"},ys={key:1,class:"mdi mdi-check font-size-14 align-middle me-1"},Ys=it({__name:"status",async setup(w){let r,L;const S=rt(),H=j(()=>{var e,o;return(o=(e=S==null?void 0:S.user)==null?void 0:e.faculty)==null?void 0:o.name}),O=ut(),P=g(!1),D=g(!1),{t:C}=_t(),v=g([]),y=g(!0),f=g(!1),t=U({search:"",date_start:null,date_end:null,status:"1",file:null,comment:null,current_page:1,students:[],data:[],per_page:I.pagePer,links:[]});function K(e,o){t.file=e,t.file&&(P.value=!0)}var z=U({key:0});const B=j({get(){var e,o;return((e=t==null?void 0:t.students)==null?void 0:e.length)===((o=v==null?void 0:v.value)==null?void 0:o.length)},set(e){e?t.students=v.value:t.students=[]}});[r,L]=pt(()=>b()),await r,L(),F(()=>[t.date_start,t.date_end],async e=>{await b()}),F(()=>t.search,async e=>{D.value=!0,t.search==""&&D.value==!0&&(await b(),D.value=!1)}),F(()=>t.current_page,async e=>{Number(e)&&(t.page=Number(e),await b(e))});async function b(e){f.value=!0;let o=U({page:e||1,per_page:t.per_page});t.search&&(o.search=t.search),t.date_start&&(o.date_start=t.date_start),t.date_end&&(o.date_end=t.date_end);try{if(y.value){y.value=!1;const u=await vt(o);Object.assign(t,u.result),v.value=t.data.map(_=>_.id),setTimeout(()=>{y.value=!0},I.loaderRefresh)}}catch(u){console.log(u)}finally{f.value=!1}}async function Z(){var u,_;f.value=!0;const e=new FormData;e.append("status",t.status),e.append("file",t.file),e.append("comment",t.comment),e.append("students",t.students);for(var o=0;o<t.students.length;o++)e.append("attendances[]",t.students[o]);try{y.value=!0;const h=await bt(e);O.success(C("Data_stored_successfully")),t.status=null,t.file=null,t.comment=null,v.value=[],t.students=[],z.key++,b()}catch(h){O.error(C("Failed")+": "+((_=(u=h==null?void 0:h.response)==null?void 0:u.data)==null?void 0:_.message))}finally{y.value=!1,f.value=!1}}return(e,o)=>{var R;const u=p("a-select"),_=p("a-space"),h=p("a-date-picker"),J=p("a-input"),Q=p("b-card"),W=p("b-collapse"),X=dt,x=lt,E=p("a-select-option"),$=p("a-form-item"),tt=p("a-textarea"),st=nt,et=ft("b-toggle");return d(),c("div",yt,[s("div",gt,[s("div",kt,[s("div",wt,[s("h5",$t,n(e.$t("attendance_Activity")),1),s("div",St,[s("div",Dt,[N((d(),c("button",Ct,[Ut,m(n(e.$t("Filter")),1)])),[[et,void 0,void 0,{"collapse-3":!0}]])])])])])]),s("div",Ft,[l(W,{visible:"",id:"collapse-3"},{default:i(()=>[l(Q,null,{default:i(()=>[s("div",Nt,[s("div",Yt,[l(_,null,{default:i(()=>[l(u,{class:"form--item",value:H.value,disabled:""},null,8,["value"])]),_:1}),s("label",Lt,n(e.$t("Choose_faculty")),1)]),s("div",Ot,[l(_,null,{default:i(()=>[l(h,{value:t.date_start,"onUpdate:value":o[0]||(o[0]=a=>t.date_start=a),"allow-clear":"","value-format":"YYYY-MM-DD",placeholder:e.$t("Enter_start_date")},null,8,["value","placeholder"])]),_:1}),s("label",Pt,n(e.$t("Enter_start_date")),1)]),s("div",zt,[l(_,null,{default:i(()=>[l(h,{value:t.date_end,"onUpdate:value":o[1]||(o[1]=a=>t.date_end=a),"value-format":"YYYY-MM-DD","allow-clear":"",placeholder:e.$t("Enter_end_date")},null,8,["value","placeholder"])]),_:1}),s("label",Bt,n(e.$t("Enter_end_date")),1)]),s("div",Et,[l(_,null,{default:i(()=>[l(J,{"allow-clear":"",id:"yu",class:"form-control",value:t.search,"onUpdate:value":o[2]||(o[2]=a=>t.search=a)},null,8,["value"])]),_:1}),s("label",Rt,n(e.$t("Search_by_Group_Student_Teacher_Subject")),1)]),s("div",Tt,[s("button",{class:"btn-search search-color",onClick:o[3]||(o[3]=a=>b())},[Vt,m(n(e.$t("Search")),1)])])])]),_:1})]),_:1})]),s("div",jt,[s("div",Mt,[s("div",At,[s("div",Gt,[s("div",It,[f.value?(d(),Y(X,{key:0})):k("",!0),t.data.length?(d(),c("div",qt,[s("table",Ht,[s("thead",null,[s("tr",Kt,[s("th",null,[s("div",Zt,[N(s("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":o[4]||(o[4]=a=>B.value=a)},null,512),[[M,B.value]])])]),Jt,s("th",null,n(e.$t("Student")),1),s("th",null,n(e.$t("Lesson_Date")),1),s("th",null,n(e.$t("condition")),1),s("th",null,n(e.$t("Download1")),1)])]),s("tbody",null,[(d(!0),c(A,null,ht(t.data,(a,at)=>{var T,V;return d(),c("tr",{class:"table-row-student-list",key:a==null?void 0:a.id},[s("td",null,[s("div",Qt,[N(s("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o[5]||(o[5]=ot=>t.students=ot),value:a==null?void 0:a.id},null,8,Wt),[[M,t.students]])])]),s("td",null,n((t.current_page-1)*t.per_page+at+1),1),s("td",null,n(a.student),1),s("td",null,[s("div",null,[a!=null&&a.semester?(d(),c(A,{key:0},[m(n(a==null?void 0:a.semester)+"-"+n(e.$t("semestr"))+" / ",1)],64)):k("",!0),m(" "+n(a==null?void 0:a.date)+" ",1),Xt,s("span",xt,n((T=a==null?void 0:a.pair)==null?void 0:T.time_start)+"-"+n((V=a==null?void 0:a.pair)==null?void 0:V.time_end),1)])]),s("td",null,[a!=null&&a.status_id?(d(),c("span",ts,n(e.$t("absent_On")),1)):(d(),c("span",ss,n(e.$t("absent_Off")),1))]),a.file?(d(),c("td",es,[s("a",{href:a.file,target:"_blank",class:"btns c-save"},ns,8,as)])):k("",!0)])}),128))])]),t.last_page>1?(d(),Y(x,mt({key:0,class:"mt-2"},{...t},{"current-page":t.current_page,"onUpdate:currentPage":o[6]||(o[6]=a=>t.current_page=a)}),null,16,["current-page"])):k("",!0)])):(d(),c("div",ls,[s("h5",ds,n(e.$t("No_data")),1),s("p",cs,n(e.$t("No_information_found")),1)]))])]),t.data.length?(d(),c("span",is,n(t.current_page)+"-"+n(t.data.length+t.per_page*(t.current_page-1))+"/ "+n(e.$t("Total_Point"))+": "+n(t.total),1)):k("",!0)]),s("div",rs,[s("div",us,[s("div",_s,[l($,{class:"mb-3",name:"nameFaculty"},{default:i(()=>[s("label",ps,n(e.$t("Status")),1),l(u,{value:t.status,"onUpdate:value":o[7]||(o[7]=a=>t.status=a),placeholder:G(C)("select__status__student")},{default:i(()=>[l(E,{value:"1"},{default:i(()=>[m(n(e.$t("absent_On")),1)]),_:1}),l(E,{value:"0"},{default:i(()=>[m(n(e.$t("absent_Off")),1)]),_:1})]),_:1},8,["value","placeholder"])]),_:1}),l($,{class:"mb-3",name:"nameFaculty"},{default:i(()=>[s("label",fs,n(e.$t("Reason")),1),l(tt,{value:t.comment,"onUpdate:value":o[8]||(o[8]=a=>t.comment=a),"auto-size":{minRows:3,maxRows:5}},null,8,["value"])]),_:1}),l($,null,{default:i(()=>[s("label",hs,n(e.$t("file")),1),l($,{name:"dragger"},{default:i(()=>[(d(),Y(st,{key:G(z).key,"on-upload":K}))]),_:1})]),_:1}),s("div",ms,[s("button",{class:"btns c-save",onClick:Z,disabled:!((R=t==null?void 0:t.students)!=null&&R.length)||!t.comment||!t.status||!P.value||f.value},[f.value?(d(),c("span",bs)):(d(),c("i",ys)),m(n(e.$t("Save")),1)],8,vs)])])])])])])])}}});export{Ys as default};
