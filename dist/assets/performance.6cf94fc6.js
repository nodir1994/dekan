import{bR as s}from"./index.3390162f.js";const e=s();async function o(r){try{const{data:t}=await e({url:"api/exam-results",params:r,method:"GET"});return t}catch(t){throw t}}async function n(r,t){try{const{data:a}=await e({url:`/api/student-subjects/subjects?edu_plan_id=${r}&semester_id=${t}`,method:"GET"});return a}catch(a){throw a}}async function i(r){try{const{data:t}=await e({url:`api/exam-results/${r}`,method:"GET"});return t}catch(t){throw t}}export{o as a,i as b,n as g};