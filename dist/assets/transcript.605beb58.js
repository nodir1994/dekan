import{bR as e}from"./index.3390162f.js";const a=e();async function i(r){try{const{data:t}=await a({url:"api/archive/transcript",params:r,method:"GET"});return t}catch(t){throw t}}async function s(r){try{const{data:t}=await a({url:"api/archive/transcript/student",params:r,method:"GET"});return t}catch(t){throw t}}async function o(r){try{const{data:t}=await a({url:`api/archive/transcript/${r}`,method:"GET"});return t}catch(t){throw t}}async function u(r){try{const{data:t}=await a({url:`api/archive/transcript/student/${r}`,method:"GET"});return t}catch(t){throw t}}async function d(r){try{const{data:t}=await a({url:"/api/archive/transcript/create",method:"POST",data:r});return t}catch(t){throw t}}async function h(r,t){try{const{data:c}=await a({url:`/api/archive/transcript/update/${r}`,method:"PUT",data:t});return c}catch(c){throw c}}async function p(r,t){try{const{data:c}=await a({url:`api/archive/transcript/accreditation?student_id=${t}&semester=${r}`,method:"GET"});return c}catch(c){throw c}}async function y(r){try{const{data:t}=await a({url:`/api/archive/transcript/delete/${r}`,method:"DELETE"});return t}catch(t){throw t}}export{s as a,p as b,d as c,y as d,o as e,u as f,i as g,h as u};