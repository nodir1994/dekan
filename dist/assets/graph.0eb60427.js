import{bR as o}from"./index.3390162f.js";const r=o();async function n(a){try{const{data:t}=await r({url:"api/personal-graphics",method:"GET",params:a});return t}catch(t){throw t}}async function c(a){try{const{data:t}=await r({url:"api/personal-graphics/students",params:a});return t}catch(t){throw t}}async function e(a){try{const{data:t}=await r({url:`api/personal-graphics/${a}`,method:"GET"});return t}catch(t){throw t}}async function i(a){try{const{data:t}=await r({url:`api/personal-graphics/student/${a}`,method:"GET"});return t}catch(t){throw t}}async function h(){try{const{data:a}=await r({url:"api/teachers",method:"GET"});return a}catch(a){throw a}}async function p(){try{const{data:a}=await r({url:"api/commands/list/personal-graph",method:"GET"});return a}catch(a){throw a}}async function u(a){try{const{data:t}=await r({url:"api/personal-graphic/subjects",method:"GET",params:a});return t}catch(t){throw t}}async function d(a){try{const{data:t}=await r({url:"api/personal-graphics",method:"POST",data:a});return t}catch(t){throw t}}async function y(a){try{const{data:t}=await r({url:`api/personal-graphics/${a}`,method:"DELETE"});return t}catch(t){throw t}}async function l(a){try{const{data:t}=await r({url:`/api/personal-graphics/${a.id}`,method:"PUT",data:a});return t}catch(t){throw t}}async function w(a){try{const{data:t}=await r({url:`api/personal-graphics/${a}/download`,method:"GET",responseType:"blob"});return t}catch(t){throw t}}export{c as a,i as b,d as c,e as d,y as e,l as f,n as g,w as h,p as o,u as s,h as t};
