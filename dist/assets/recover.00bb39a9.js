import{bR as s}from"./index.3390162f.js";const a=s();async function c(t){try{const{data:r}=await a({url:"api/students/recovery",method:"GET",params:t});return r}catch(r){throw r}}async function o(t){try{const{data:r}=await a({url:`api/student-actions/student/${t}`,method:"GET"});return r}catch(r){throw r}}async function u(){try{const{data:t}=await a({url:"api/commands/list/recovery",method:"GET"});return t}catch(t){throw t}}async function i(t,r){try{const{data:e}=await a({url:`api/student-subjects/subjects/semester?edu_plan_id=${t}&semester=${r}`,method:"GET"});return e}catch(e){throw e}}export{u as a,o as b,i as c,c as g};
