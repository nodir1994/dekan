import{d as m,B as l,w as v,o as g,e as h,f as e}from"./index.3390162f.js";const y={class:"my-profile d-flex justify-content-center align-items-center"},b={class:"position-relative inline-block avatar-contenet d-flex"},k=["src"],x={class:"position-absolute top-0 h-100 w-100 rounded d-flex justify-content-center align-items-center"},w=e("i",{class:"mdi mdi-camera"},null,-1),B=[w],A=m({__name:"AvatarInput",props:{imgUrl:String},emits:["input"],setup(c,{emit:r}){const u=c,d=r,n=l("/src/assets/images/users/avatar-default.png"),a=l(""),o=l(null);v(()=>u.imgUrl,t=>{t&&(n.value=t)},{immediate:!0});function _(){o.value.click()}function p(t){var i;a.value=(i=t.target)==null?void 0:i.files[0],d("input",a.value);let s=new FileReader;s.readAsDataURL(a.value),s.onload=f=>{n.value=f.target.result}}return(t,s)=>(g(),h("div",y,[e("input",{type:"file",accept:"image/*",class:"visually-hidden",ref_key:"fileEl",ref:o,onChange:p},null,544),e("div",b,[e("img",{src:n.value,class:"h-100 w-100 rounded"},null,8,k),e("div",x,[e("button",{type:"button",class:"btn btn-link",onClick:s[0]||(s[0]=i=>_())},B)])])]))}});export{A as _};
