import{bR as n}from"./index.3390162f.js";const t=n();async function o(r){try{const{data:a}=await t({url:"api/calendar-plans",method:"GET",params:r});return a}catch(a){throw a}}async function s(r){try{const{data:a}=await t({url:`api/calendar-plans/${r}`,method:"GET"});return a}catch(a){throw a}}export{s as a,o as g};