import{N as Q,u as S,r as s,a as c,p as m,o as k,S as q,w as f,l as z,f as n,T as d,e as o,j as g,V as B,W as y,i as b,X as U,aI as F}from"./index.edeae69a.js";import{Q as I}from"./QBtnToggle.7f1e2fca.js";import{Q as N}from"./QForm.e93bf988.js";const A={class:"q-pa-md",style:{"min-width":"300px"}},P={class:"q-my-sm text-center"},C={__name:"LoginPage",setup(T){const{t:a}=Q(),w=S(),h=s(null),_=s(null),u=s(!1),p=s(!1),l=c({account:"",password:"",role:""}),V=m(()=>[{label:a("role_host"),value:"role_host"},{label:a("role_helper"),value:"role_helper"}]),i=c({account:[e=>!!e||a("required"),e=>e.length>=4&&e.length<=20||"\u5E33\u865F\u9577\u5EA6\u70BA 4 \u5230 20 \u500B\u5B57",e=>/^[a-zA-Z0-9]+$/.test(e)||"\u5E33\u865F\u53EA\u80FD\u7531\u82F1\u6578\u5B57\u7D44\u6210"],password:[e=>!!e||a("required"),e=>e.length>=4&&e.length<=20||"\u5BC6\u78BC\u9577\u5EA6\u70BA 4 \u5230 20 \u500B\u5B57",e=>/^[a-zA-Z0-9]+$/.test(e)||"\u5BC6\u78BC\u53EA\u80FD\u7531\u82F1\u6578\u5B57\u7D44\u6210"],role:[e=>!!e||a("required")]}),$=m(()=>p.value&&!l.role?{color:"red"}:{color:"black"}),v=()=>{if(!l.role){p.value=!0;return}u.value=!0,l.role==="role_host"?l.role=1:l.role==="role_host"?l.role=2:l.role=null,w.login(l),u.value=!1};return(e,r)=>(k(),q(z,{class:"flex flex-center column"},{default:f(()=>[n("h4",null,d(e.$t("login")),1),n("div",A,[o(N,{ref_key:"loginForm",ref:h,autocorrect:"off",autocapitalize:"off",autocomplete:"off",spellcheck:"false",onSubmit:U(v,["prevent"])},{default:f(()=>[o(g,{outlined:"",modelValue:l.account,"onUpdate:modelValue":r[0]||(r[0]=t=>l.account=t),label:e.$t("account")+"*",rules:i.account},null,8,["modelValue","label","rules"]),o(g,{outlined:"",type:"password",modelValue:l.password,"onUpdate:modelValue":r[1]||(r[1]=t=>l.password=t),label:e.$t("password")+"*","lazy-rules":"",rules:i.password},null,8,["modelValue","label","rules"]),n("p",{style:B(y($))},d(e.$t("login_as")+"*"),5),o(I,{modelValue:l.role,"onUpdate:modelValue":r[2]||(r[2]=t=>l.role=t),"toggle-color":"primary",options:y(V),spread:"",rules:i.role,ref_key:"role",ref:_,style:{"margin-bottom":"20px"}},null,8,["modelValue","options","rules"]),o(b,{class:"full-width",color:"primary",label:e.$t("login"),type:"submit",loading:u.value},null,8,["label","loading"])]),_:1},8,["onSubmit"]),o(F,{class:"q-my-lg"}),n("p",P,d(e.$t("not_yet_registered")),1),o(b,{class:"full-width",label:e.$t("create_account"),color:"primary",outline:"","no-caps":"",to:"/register"},null,8,["label"])])]),_:1}))}};export{C as default};
