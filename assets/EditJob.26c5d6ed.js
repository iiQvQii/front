import{N as z,aV as L,O as K,u as X,s as G,r as b,a as V,P as g,p as U,o as y,S as I,w as c,l as ee,aJ as S,f as a,T as n,e as o,bv as te,j as w,k as T,t as le,i as C,W as _,aM as F,d as k,aK as E,F as M,b8 as se,U as oe,X as ie,Y as ae,bt as re,_ as B}from"./index.edeae69a.js";import{d as r,a as p,Q as ne,b as de}from"./data-zh.4fb3324c.js";import{Q as N}from"./QSelect.a75092c0.js";import{Q as ue}from"./QFile.ea654cd3.js";import{Q as ce}from"./QImg.68f7e976.js";import{Q as me}from"./QForm.e93bf988.js";import"./QChip.74d8cce9.js";const pe={class:"q-pa-md",style:{"min-width":"500px"}},fe={class:"row items-center justify-end"},ye={class:"q-gutter-sm"},he={style:{"font-size":"1rem",margin:"0"}},be={key:0},we={class:"q-pa-md flex row"},xe={__name:"EditJob",setup(_e){const{locale:u}=z({useScope:"global"}),{t:d}=z(),x=L(),P=K(),W=X(),{role:J,isHost:O}=G(W),j=b(null),v=b(""),D=b(""),q=b(!1);b(!0),V([]);const i=V({city:"",district:""}),e=V({_id:"",title:"",date:{},date_from:"",date_to:"",welfare:[],city:"",district:"",address:"",zipcode:"",role:J.value,description:"",photos:[],question:"",week_hours:10,is_shown:!0});g(()=>e.date,()=>{v.value=e.date.from+"~"+e.date.to});const R=U(()=>[{label:d("accommodation"),value:"accommodation"},{label:d("vehicle"),value:"vehicle"},{label:d("pocket_money"),value:"pocket_money"},{label:d("insurance"),value:"insurance"},{label:d("free_course"),value:"free_course"},{label:d("meal"),value:"meal"}]),f=V({title:[l=>!!l||d("required"),l=>l.length>=2&&l.length<=30||"\u540D\u7A31\u9577\u5EA6\u70BA 2 \u5230 30 \u500B\u5B57"],address:[l=>!!l||d("required"),l=>l.length>=5||"\u8ACB\u586B\u5BEB\u6B63\u78BA\u8A73\u7D30\u5730\u5740\u8CC7\u8A0A"],required:[l=>!!l||d("required")]}),Y=U(()=>u.value==="zh-TW"?r.counties:p.counties),Z=U(()=>{if(u.value==="zh-TW"&&e.city){const l=r.counties.findIndex(t=>t===e.city);return r.districts[l][0]}else if(u.value==="en-US"&&e.city){const l=p.counties.findIndex(t=>t===e.city);return console.log(e.city),console.log(l),p.districts[l][0]||""}else return null});g(()=>u.value,()=>{e.city="",e.district=""}),g(()=>e.city,()=>{if(u.value==="zh-TW"){const l=r.counties.findIndex(t=>t===e.city);l>-1&&(i.city=l)}else{const l=p.counties.findIndex(t=>t===e.city);l>-1&&(i.city=l)}}),g(()=>e.district,()=>{if(u.value==="zh-TW"){const l=r.districts[i.city][0].findIndex(t=>t===e.district);l>-1&&(i.district=l,e.zipcode=r.districts[i.city][1][l])}else{const l=p.districts[i.city][0].findIndex(t=>t===e.district);l>-1&&(i.district=l,e.zipcode=r.districts[i.city][1][l])}}),(async()=>{var l;try{const{data:t}=await S.get("/jobs/"+x.params.id);e._id=t.result._id,e.title=t.result.title,e.city=t.result.city,e.district=t.result.district,e.address=t.result.address,e.zipcode=t.result.zipcode,e.description=t.result.description,j.value.setHTML(e.description),D.value=t.result.photos,e.welfare=(l=t.result.welfare[0])==null?void 0:l.split(","),e.week_hours=t.result.week_hours,e.published_time=t.result.published_time,e.question=t.result.question,e.is_shown=t.result.is_shown;let s=new Date(t.result.date_from).getFullYear(),m=new Date(t.result.date_from).getMonth()+1,h=new Date(t.result.date_from).getDate();if(e.date.from=s+"/"+m+"/"+h,s=new Date(t.result.date_to).getFullYear(),m=new Date(t.result.date_to).getMonth()+1,h=new Date(t.result.date_to).getDate(),e.date.to=s+"/"+m+"/"+h,v.value=e.date.from+"~"+e.date.to,u.value==="en-US"){const Q=r.counties.findIndex($=>$===t.result.city);e.city=p.counties[Q];const H=r.districts[Q][0].findIndex($=>$===t.result.district);e.district=p.districts[Q][0][H]}}catch(t){console.log(t)}})();const A=async()=>{q.value=!0;try{e.date_from=e.date.from,e.date_to=e.date.to,u.value==="en-US"&&(e.city=r.counties[i.city],e.district=r.districts[i.city][0][i.district]);const l=new FormData;for(const t in e)if(t==="photos"){if(console.log(e[t].length),e[t].length>0)for(let s=0;s<e[t].length;s++)l.append(t,e[t][s])}else l.append(t,e[t]);await S.patch("/jobs/"+x.params.id,l),await B.fire({icon:"success",title:"\u6210\u529F",text:"\u7DE8\u8F2F\u6210\u529F"}),P.push("/admin/jobs")}catch(l){console.log(l),B.fire({icon:"error",title:"\u5931\u6557",text:l.isAxiosError&&l.response.data?l.response.data.message:"\u767C\u751F\u932F\u8AA4"})}q.value=!1};return(l,t)=>(y(),I(ee,{id:"post_jobs",class:"flex flex-center column"},{default:c(()=>[a("h4",null,n(l.$t("edit_jobs")),1),a("div",pe,[o(me,{autocorrect:"off",autocapitalize:"off",autocomplete:"off",spellcheck:"false",onSubmit:ie(A,["prevent"])},{default:c(()=>[o(te,{modelValue:e.is_shown,"onUpdate:modelValue":t[0]||(t[0]=s=>e.is_shown=s),label:e.is_shown?l.$t("is_shown"):l.$t("is_not_shown")},null,8,["modelValue","label"]),o(w,{outlined:"",modelValue:e.title,"onUpdate:modelValue":t[1]||(t[1]=s=>e.title=s),label:l.$t("job_title")+"*",rules:f.title},null,8,["modelValue","label","rules"]),o(w,{outlined:"",modelValue:v.value,"onUpdate:modelValue":t[3]||(t[3]=s=>v.value=s),rules:f.required,label:l.$t("job_time")},{append:c(()=>[o(T,{name:"event",class:"cursor-pointer"},{default:c(()=>[o(ne,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:c(()=>[o(de,{modelValue:e.date,"onUpdate:modelValue":t[2]||(t[2]=s=>e.date=s),range:""},{default:c(()=>[a("div",fe,[le(o(C,{label:"Close",color:"primary",flat:""},null,512),[[ae]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","rules","label"]),o(N,{outlined:"",modelValue:e.city,"onUpdate:modelValue":t[4]||(t[4]=s=>e.city=s),options:_(Y),label:l.$t("city")+"*","emit-value":"","lazy-rules":"",rules:f.required},null,8,["modelValue","options","label","rules"]),o(N,{outlined:"",modelValue:e.district,"onUpdate:modelValue":t[5]||(t[5]=s=>e.district=s),options:_(Z),label:l.$t("district")+"*","emit-value":"",rules:f.required},null,8,["modelValue","options","label","rules"]),F(" "+n(i.city),1),o(w,{outlined:"",type:"text",modelValue:e.address,"onUpdate:modelValue":t[6]||(t[6]=s=>e.address=s),label:l.$t("address")+"*","lazy-rules":"",rules:f.address},null,8,["modelValue","label","rules"]),a("h5",null,n(l.$t("job_welfare")),1),a("div",ye,[(y(!0),k(M,null,E(_(R),(s,m)=>(y(),I(re,{key:m,modelValue:e.welfare,"onUpdate:modelValue":t[7]||(t[7]=h=>e.welfare=h),val:s.value,label:s.label},null,8,["modelValue","val","label"]))),128))]),a("h5",null,n(l.$t("job_week_hours")),1),o(w,{modelValue:e.week_hours,"onUpdate:modelValue":t[8]||(t[8]=s=>e.week_hours=s),modelModifiers:{number:!0},type:"number",filled:"",rules:f.required},{append:c(()=>[a("p",he,n(l.$t("hours_a_week")),1)]),_:1},8,["modelValue","rules"]),a("h5",null,n(l.$t("job_description")),1),o(_(se),{content:e.description,"onUpdate:content":t[9]||(t[9]=s=>e.description=s),contentType:"html",theme:"snow",toolbar:"minimal",placeholder:l.$t("write_down_what_the_helpers_need_to_do"),ref_key:"a",ref:j},null,8,["content","placeholder"]),F(" "+n(e.description)+" ",1),a("pre",null,n(e),1),_(O)?(y(),k("h5",be,n(l.$t("photos_host")),1)):oe("",!0),o(ue,{color:"primary",accept:".jpg, image/*","max-files":3,filled:"",multiple:"",modelValue:e.photos,"onUpdate:modelValue":t[10]||(t[10]=s=>e.photos=s),label:l.$t("upload_file"),hint:"\u6700\u591A\u4E0A\u50B33\u5F35"},{prepend:c(()=>[o(T,{name:"cloud_upload"})]),_:1},8,["modelValue","label"]),a("div",we,[(y(!0),k(M,null,E(D.value,(s,m)=>(y(),k("div",{class:"col-6 q-pa-xs",key:m},[o(ce,{src:s,ratio:4/3,"spinner-color":"white"},null,8,["src"])]))),128))]),a("h5",null,n(l.$t("job_question")),1),o(w,{modelValue:e.question,"onUpdate:modelValue":t[11]||(t[11]=s=>e.question=s),filled:"",type:"textarea",hint:l.$t("job_question_hint")},null,8,["modelValue","hint"]),o(C,{class:"full-width",color:"primary",label:l.$t("submit"),type:"submit",loading:q.value},null,8,["label","loading"])]),_:1},8,["onSubmit"])])]),_:1}))}};export{xe as default};
