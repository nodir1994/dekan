import{d as $,o as s,e as n,f as t,t as e,F as d,r as _,l as g,a as H,n as I,bq as j,B as z,c as L,i as A,b6 as M,j as B,k as F,z as y,g as w,bs as P,q as D,s as G,C as O}from"./index.3390162f.js";import{a as R,b as U}from"./groups.f8e17714.js";const J={class:"coordinator-before"},K={class:"table-responsive table-statistical pb-5"},Q=t("th",{rowspan:"3",style:{"min-width":"50px"},class:"fixed-table"},"\u2116",-1),W={rowspan:"3",style:{"min-width":"300px"},class:"fixed-table tr2"},X={rowspan:"3",style:{"min-width":"40px"},class:"fixed-table tr3"},Y={rowspan:"3",style:{"min-width":"40px"},class:"fixed-table tr4"},Z=["colspan"],tt={key:0,style:{width:"50px"}},et={key:1,style:{"min-width":"50px"}},st={key:2,style:{"min-width":"50px"}},nt={class:"fixed-table"},at={style:{"text-align":"start"},class:"fixed-table tr2"},lt={class:"fixed-table tr3"},ot={class:"fixed-table tr4"},it=t("tr",null,null,-1),rt=$({__name:"before",props:{date1:{}},setup(f){const o=f;return(l,v)=>{var c,i,r,u;return s(),n("div",J,[t("div",K,[t("table",null,[t("thead",null,[t("tr",null,[Q,t("th",W,e(l.$t("Student_Full_name")),1),t("th",X,e(l.$t("Does_the_student_have_a_telegram")),1),t("th",Y,e(l.$t("Has_the_student_been_called_to_the_session")),1),t("th",{colspan:((c=o.date1)==null?void 0:c.subjects.length)*3+1},e(l.$t("student_Sciences")),9,Z)]),(s(!0),n(d,null,_((i=o.date1)==null?void 0:i.subjects,(a,h)=>(s(),n("th",{class:"coor-before-odd",colspan:"3",key:h},e(a.name),1))),128)),t("tr",null,[(s(!0),n(d,null,_(((r=o.date1)==null?void 0:r.subjects.length)*3,a=>(s(),n("th",{key:a},[a%3==1?(s(),n("span",tt,e(l.$t("Have_the_video_lessons_been_sent")),1)):g("",!0),a%3==2?(s(),n("span",et,e(l.$t("Have_study_materials_been_sent")),1)):g("",!0),a%3==0?(s(),n("span",st,e(l.$t("Teacher_attached")),1)):g("",!0)]))),128))])]),t("tbody",null,[(s(!0),n(d,null,_((u=o.date1)==null?void 0:u.extramural_students,(a,h)=>(s(),n("tr",{key:h},[t("td",nt,e(h+1),1),t("td",at,e(a.fullname),1),t("td",lt,e(a.telegram_group),1),t("td",ot,e(a.student_called_session),1),(s(!0),n(d,null,_(a==null?void 0:a.session_controls,p=>(s(),n(d,{key:p},[t("td",null,e(p.send_video),1),t("td",null,e(p.send_tutorial),1),t("td",null,e(p.teacher_attached),1)],64))),128))]))),128)),it])])])])}}});const dt={class:"coordinator-center"},ct={class:"table-responsive table-statistical"},_t=t("th",{rowspan:"3",class:"fixed-table",style:{"min-width":"40px"}},"\u2116",-1),ut={rowspan:"3",style:{"min-width":"300px"},class:"fixed-table tr2"},ht={rowspan:"3",style:{"min-width":"40px"},class:"fixed-table tr3"},pt=["colspan"],mt=["colspan"],bt={class:"fixed-table"},ft={style:{"text-align":"start"},class:"fixed-table tr2"},gt={class:"fixed-table tr3"},yt=$({__name:"center",props:{date2:{}},setup(f){const o=f;return(l,v)=>{var c,i;return s(),n("div",dt,[t("div",ct,[t("table",null,[t("thead",null,[t("tr",null,[_t,t("th",ut,e(l.$t("Student_Full_name")),1),t("th",ht,e(l.$t("Does_the_student_have_a_telegram")),1),t("th",{style:{"text-align":"left","padding-left":"30px"},colspan:((c=o.date2.dates)==null?void 0:c.length)*5},e(l.$t("Student_attendance")),9,pt)]),t("tr",null,[t("th",{style:{"text-align":"left","padding-left":"30px"},colspan:o.date2.dates.length*5},e(l.$t("The_date")),9,mt)]),t("tr",null,[(s(!0),n(d,null,_(o.date2.dates,r=>(s(),n("th",{style:{width:"100px !important"},class:"font-size-14",key:r},e(r.date),1))),128))])]),t("tbody",null,[(s(!0),n(d,null,_((i=o.date2)==null?void 0:i.extramural_students,(r,u)=>(s(),n("tr",{key:u},[t("td",bt,e(u+1),1),t("td",ft,e(r.fullname),1),t("td",gt,e(r.telegram_group),1),(s(!0),n(d,null,_(r==null?void 0:r.session_attendances,a=>(s(),n("td",{key:a},e(a.is_coming),1))),128))]))),128))])])])])}}});const $t={class:"coordinator-after"},vt={class:"table-responsive table-statistical"},xt=t("th",{rowspan:"3",style:{"min-width":"50px"},class:"fixed-table"},"\u2116",-1),wt={rowspan:"3",style:{"min-width":"300px"},class:"fixed-table tr2"},kt={rowspan:"3",style:{"min-width":"40px"},class:"fixed-table tr3"},St=["colspan"],Ct={key:0,style:{width:"50px"}},Tt={key:1,style:{"min-width":"50px"}},jt={key:2,style:{"min-width":"50px"}},zt={class:"fixed-table"},Bt={style:{"text-align":"start"},class:"fixed-table tr2"},Ft={class:"fixed-table tr3"},Dt=$({__name:"after",props:{date1:{}},setup(f){const o=f;return(l,v)=>{var c,i,r,u;return s(),n("div",$t,[t("div",vt,[t("table",null,[t("thead",null,[t("tr",null,[xt,t("th",wt,e(l.$t("Student_Full_name")),1),t("th",kt,e(l.$t("Does_the_student_have_a_telegram")),1),t("th",{colspan:((c=o.date1)==null?void 0:c.subjects.length)*3+1},e(l.$t("student_Sciences")),9,St)]),(s(!0),n(d,null,_((i=o.date1)==null?void 0:i.subjects,(a,h)=>(s(),n("th",{class:"coor-before-odd",colspan:"3",key:h},e(a.name),1))),128)),t("tr",null,[(s(!0),n(d,null,_(((r=o.date1)==null?void 0:r.subjects.length)*3,a=>(s(),n("th",{key:a},[a%3==1?(s(),n("span",Ct,e(l.$t("Current_control")),1)):g("",!0),a%3==2?(s(),n("span",Tt,e(l.$t("Midterm_Examtable")),1)):g("",!0),a%3==0?(s(),n("span",jt,e(l.$t("Final_Examtable")),1)):g("",!0)]))),128))])]),t("tbody",null,[(s(!0),n(d,null,_((u=o.date1)==null?void 0:u.extramural_students,(a,h)=>(s(),n("tr",{key:h},[t("td",zt,e(h+1),1),t("td",Bt,e(a.fullname),1),t("td",Ft,e(a.telegram_group),1),(s(!0),n(d,null,_(a==null?void 0:a.session_controls,p=>(s(),n(d,{key:p},[t("td",null,e(p.current_control),1),t("td",null,e(p.intermediate_control),1),t("td",null,e(p.final_control),1)],64))),128))]))),128))])])])])}}});const Nt={class:"myMessagePage"},qt={class:"card panel-header-bg"},Vt={class:"card-body"},Et={class:"panel-header"},Ht={class:"card-title"},It={class:"panel-toggles"},Lt={class:"filterBlock"},At=t("i",{class:"mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"},null,-1),Mt={class:"btns c-filter py-1.5 ms-3 px-4"},Pt=t("i",{class:"mdi mdi-filter font-size-14 align-middle me-1"},null,-1),Gt={class:"card"},Ot={class:"card-message"},Rt={class:"nav nav-tabs nav-tabs-custom nav-justified",role:"tablist"},Ut=["data-bs-target","aria-controls","onClick"],Jt={class:"icon-text-none"},Kt={class:"tab-content p-3"},Zt=$({__name:"id",async setup(f){var k,S,C;let o,l;const{locale:v,t:c}=H(),i=I(),r=(k=i==null?void 0:i.query)==null?void 0:k.groupName,u=(S=i==null?void 0:i.query)==null?void 0:S.semester_id,a=(C=i==null?void 0:i.params)==null?void 0:C.id,h=([o,l]=j(()=>R(a,u).then(m=>m.result)),o=await o,l(),o),p=([o,l]=j(()=>U(a,u).then(m=>m.result)),o=await o,l(),o),N=z({beforeSession:{slug:"beforeSession",iconClasses:"mdi mdi-account-arrow-left font-size-18 me-2 align-middle",title:c("Until_the_session")},inTheSession:{slug:"inTheSession",iconClasses:"mdi mdi-account font-size-18 me-2 align-middle",title:c("During_the_session")},afterTheSession:{slug:"afterTheSession",iconClasses:"mdi mdi-account-arrow-right font-size-18 me-2 align-middle",title:c("After_the_session")}}),x=z({slug:"beforeSession",iconClasses:"mdi mdi-inbox-arrow-down me-2",title:c("Incoming_messages")}),q={beforeSession:rt,inTheSession:yt,afterTheSession:Dt},V=L(()=>q[x.value.slug]);return(m,Qt)=>{const T=A("router-link"),E=M("b-toggle");return s(),n("div",Nt,[t("div",qt,[t("div",Vt,[t("div",Et,[t("h5",Ht,[B(T,{to:"/coordinator/group-coordinator"},{default:F(()=>[y(e(m.$t("coordinator_list")),1)]),_:1}),y(" / "+e(w(r)),1)]),t("div",It,[t("div",Lt,[B(T,{to:"/coordinator/group-coordinator",class:"btns black-c py-1.5 px-4 d-inline-block"},{default:F(()=>[At,y(e(m.$t("Prev")),1)]),_:1}),P((s(),n("button",Mt,[Pt,y(e(m.$t("Filter")),1)])),[[E,void 0,void 0,{"collapse-3":!0}]])])])])])]),t("div",Gt,[t("div",Ot,[t("ul",Rt,[(s(!0),n(d,null,_(N.value,b=>(s(),n("li",{key:b,class:"nav-item",role:"presentation"},[t("button",{class:D(["nav-link",b.slug===x.value.slug&&"active"]),type:"button","data-bs-toggle":"tab","data-bs-target":"#"+b.slug,"aria-controls":b.slug,"aria-selected":"true",role:"tab",onClick:Wt=>x.value=b},[t("i",{class:D(b.iconClasses)},null,2),t("span",Jt,e(b.title),1)],10,Ut)]))),128))])]),t("div",Kt,[(s(),G(O(V.value),{date1:w(h),date2:w(p)},null,8,["date1","date2"]))])])])}}});export{Zt as default};