import{T as D,aO as Y,U as H,u as L,s as X,r as b,j as g,w as V,y as x,V as a,k as h,W as z,p as u,Q as G,aP as I,t as r,X as c,n as o,aM as K,bx as ee,Z as _,z as S,A as te,x as T,$ as w,aU as le,m as q,aQ as C,F,Y as se,a0 as oe,a1 as ie,v as ae,bl as re,aR as ne,a3 as E}from"./index.26cfbce9.js";import{d as p,Q as de,a as ue}from"./QPopupProxy.65bcb048.js";import{Q as M}from"./QSelect.1cbf6466.js";import{Q as ce}from"./QFile.0aca6983.js";import{Q as me}from"./QForm.3d2f0b40.js";import"./QChip.c2651943.js";const pe={class:"q-pa-xl q-mx-auto"},fe={class:"text-center"},he={class:"q-mx-auto form_container"},ye={class:"row items-center justify-end"},be={class:"q-gutter-sm"},_e={style:{"font-size":"1rem",margin:"0"}},we={key:0},ve={class:"q-pa-md flex row"},je={__name:"EditJob",setup(ge){const{locale:d}=D({useScope:"global"}),{t:n}=D(),$=Y(),B=H(),P=L(),{role:W,isHost:N}=X(P),U=b(null),v=b(""),j=b(""),k=b(!1);b(!0),g([]);const i=g({city:"",district:""}),t=g({_id:"",title:"",date:{},date_from:"",date_to:"",welfare:[],city:"",district:"",address:"",zipcode:"",role:W.value,description:"",photos:[],question:"",week_hours:10,is_shown:!0});V(()=>t.date,()=>{v.value=t.date.from+"~"+t.date.to});const R=x(()=>[{label:n("accommodation"),value:"accommodation"},{label:n("vehicle"),value:"vehicle"},{label:n("pocket_money"),value:"pocket_money"},{label:n("insurance"),value:"insurance"},{label:n("free_course"),value:"free_course"},{label:n("meal"),value:"meal"}]),f=g({title:[e=>!!e||n("required"),e=>e.length>=2&&e.length<=30||"\u540D\u7A31\u9577\u5EA6\u70BA 2 \u5230 30 \u500B\u5B57"],address:[e=>!!e||n("required"),e=>e.length>=5||"\u8ACB\u586B\u5BEB\u6B63\u78BA\u8A73\u7D30\u5730\u5740\u8CC7\u8A0A"],required:[e=>!!e||n("required")]}),Z=x(()=>d.value==="zh-TW"?a.counties:p.counties),A=x(()=>{if(d.value==="zh-TW"&&t.city){const e=a.counties.findIndex(l=>l===t.city);return a.districts[e][0]}else if(d.value==="en-US"&&t.city){const e=p.counties.findIndex(l=>l===t.city);return console.log(t.city),console.log(e),p.districts[e][0]||""}else return null});V(()=>d.value,()=>{t.city="",t.district=""}),V(()=>t.city,()=>{if(d.value==="zh-TW"){const e=a.counties.findIndex(l=>l===t.city);e>-1&&(i.city=e)}else{const e=p.counties.findIndex(l=>l===t.city);e>-1&&(i.city=e)}}),V(()=>t.district,()=>{if(d.value==="zh-TW"){const e=a.districts[i.city][0].findIndex(l=>l===t.district);e>-1&&(i.district=e,t.zipcode=a.districts[i.city][1][e])}else{const e=p.districts[i.city][0].findIndex(l=>l===t.district);e>-1&&(i.district=e,t.zipcode=a.districts[i.city][1][e])}}),(async()=>{try{const{data:e}=await I.get("/jobs/"+$.params.id);t._id=e.result._id,t.title=e.result.title,t.city=e.result.city,t.district=e.result.district,t.address=e.result.address,t.zipcode=e.result.zipcode,t.description=e.result.description,U.value.setHTML(t.description),j.value=e.result.photos,t.welfare=e.result.welfare,t.week_hours=e.result.week_hours,t.published_time=e.result.published_time,t.question=e.result.question,t.is_shown=e.result.is_shown;let l=new Date(e.result.date_from).getFullYear(),s=new Date(e.result.date_from).getMonth()+1,m=new Date(e.result.date_from).getDate();if(t.date.from=l+"/"+s+"/"+m,l=new Date(e.result.date_to).getFullYear(),s=new Date(e.result.date_to).getMonth()+1,m=new Date(e.result.date_to).getDate(),t.date.to=l+"/"+s+"/"+m,v.value=t.date.from+"~"+t.date.to,d.value==="en-US"){const y=a.counties.findIndex(Q=>Q===e.result.city);t.city=p.counties[y];const O=a.districts[y][0].findIndex(Q=>Q===e.result.district);t.district=p.districts[y][0][O]}}catch(e){console.log(e)}})();const J=async()=>{k.value=!0;try{t.date_from=t.date.from,t.date_to=t.date.to,d.value==="en-US"&&(t.city=a.counties[i.city],t.district=a.districts[i.city][0][i.district]);const e=new FormData;for(const l in t)if(l==="photos"){if(console.log(t[l].length),t[l].length>0)for(let s=0;s<t[l].length;s++)e.append(l,t[l][s])}else if(l==="welfare")for(let s=0;s<t[l].length;s++)e.append(l,t[l][s]);else e.append(l,t[l]);await I.patch("/jobs/"+$.params.id,e),await E.fire({icon:"success",title:"\u6210\u529F",text:"\u7DE8\u8F2F\u6210\u529F"}),B.push("/admin/jobs")}catch(e){console.log(e),E.fire({icon:"error",title:"\u5931\u6557",text:e.isAxiosError&&e.response.data?e.response.data.message:"\u767C\u751F\u932F\u8AA4"})}k.value=!1};return(e,l)=>(h(),z(G,{id:"post_jobs"},{default:u(()=>[r("div",pe,[r("h3",fe,c(e.$t("edit_jobs")),1),o(K,{inset:"",class:"q-mb-lg"}),r("div",he,[o(me,{autocorrect:"off",autocapitalize:"off",autocomplete:"off",spellcheck:"false",onSubmit:oe(J,["prevent"])},{default:u(()=>[o(ee,{modelValue:t.is_shown,"onUpdate:modelValue":l[0]||(l[0]=s=>t.is_shown=s),label:t.is_shown?e.$t("is_shown"):e.$t("is_not_shown")},null,8,["modelValue","label"]),o(_,{outlined:"",modelValue:t.title,"onUpdate:modelValue":l[1]||(l[1]=s=>t.title=s),label:e.$t("job_title")+"*",rules:f.title},null,8,["modelValue","label","rules"]),o(_,{outlined:"",modelValue:v.value,"onUpdate:modelValue":l[3]||(l[3]=s=>v.value=s),rules:f.required,label:e.$t("job_time")},{append:u(()=>[o(S,{name:"event",class:"cursor-pointer"},{default:u(()=>[o(de,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:u(()=>[o(ue,{modelValue:t.date,"onUpdate:modelValue":l[2]||(l[2]=s=>t.date=s),range:""},{default:u(()=>[r("div",ye,[te(o(T,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","rules","label"]),o(M,{outlined:"",modelValue:t.city,"onUpdate:modelValue":l[4]||(l[4]=s=>t.city=s),options:w(Z),label:e.$t("city")+"*","emit-value":"","lazy-rules":"",rules:f.required},null,8,["modelValue","options","label","rules"]),o(M,{outlined:"",modelValue:t.district,"onUpdate:modelValue":l[5]||(l[5]=s=>t.district=s),options:w(A),label:e.$t("district")+"*","emit-value":"",rules:f.required},null,8,["modelValue","options","label","rules"]),le(" "+c(i.city),1),o(_,{outlined:"",type:"text",modelValue:t.address,"onUpdate:modelValue":l[6]||(l[6]=s=>t.address=s),label:e.$t("address")+"*","lazy-rules":"",rules:f.address},null,8,["modelValue","label","rules"]),r("h5",null,c(e.$t("job_welfare")),1),r("div",be,[(h(!0),q(F,null,C(w(R),(s,m)=>(h(),z(ae,{key:m,modelValue:t.welfare,"onUpdate:modelValue":l[7]||(l[7]=y=>t.welfare=y),val:s.value,label:s.label},null,8,["modelValue","val","label"]))),128))]),r("h5",null,c(e.$t("job_week_hours")),1),o(_,{modelValue:t.week_hours,"onUpdate:modelValue":l[8]||(l[8]=s=>t.week_hours=s),modelModifiers:{number:!0},type:"number",filled:"",rules:f.required},{append:u(()=>[r("p",_e,c(e.$t("hours_a_week")),1)]),_:1},8,["modelValue","rules"]),r("h5",null,c(e.$t("job_description")),1),o(w(re),{content:t.description,"onUpdate:content":l[9]||(l[9]=s=>t.description=s),contentType:"html",theme:"snow",toolbar:"minimal",placeholder:e.$t("write_down_what_the_helpers_need_to_do"),ref_key:"a",ref:U},null,8,["content","placeholder"]),w(N)?(h(),q("h5",we,c(e.$t("photos_host")),1)):se("",!0),o(ce,{color:"primary",accept:".jpg, image/*","max-files":3,filled:"",multiple:"",modelValue:t.photos,"onUpdate:modelValue":l[10]||(l[10]=s=>t.photos=s),label:e.$t("upload_file"),hint:"\u6700\u591A\u4E0A\u50B33\u5F35"},{prepend:u(()=>[o(S,{name:"cloud_upload"})]),_:1},8,["modelValue","label"]),r("div",ve,[(h(!0),q(F,null,C(j.value,(s,m)=>(h(),q("div",{class:"col-6 q-pa-xs",key:m},[o(ne,{src:s,ratio:4/3,"spinner-color":"white"},null,8,["src"])]))),128))]),r("h5",null,c(e.$t("job_question")),1),o(_,{modelValue:t.question,"onUpdate:modelValue":l[11]||(l[11]=s=>t.question=s),filled:"",type:"textarea",hint:e.$t("job_question_hint")},null,8,["modelValue","hint"]),o(T,{class:"full-width",color:"primary",label:e.$t("submit"),type:"submit",loading:k.value},null,8,["label","loading"])]),_:1},8,["onSubmit"])])])]),_:1}))}};export{je as default};
