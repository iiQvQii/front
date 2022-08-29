import{aM as D,Z as j,aN as z,$ as U,r as b,j as p,B as I,a0 as N,w as P,k as n,a1 as g,p as r,Q as A,aO as E,aa as J,t as e,n as a,_ as L,v as w,x as i,a5 as R,C as x,a6 as T,I as F,y as f,a3 as Q,m,aP as V,F as q,a2 as O,a8 as Z,aQ as M,aR as W,aS as $,aB as G,aT as H,aU as K}from"./index.ed091abd.js";import{a as k,Q as X}from"./QBreadcrumbs.7c484d5c.js";import{Q as Y}from"./QSelect.eab90644.js";import{d as ee,Q as te}from"./QPopupProxy.5df1867d.js";const se={id:"find_job"},ae={class:"main_banner"},oe=e("div",{class:"bg"},null,-1),le={class:"text-dark text-center"},re={class:"container q-mx-auto"},ie={class:"row q-py-lg"},ce={class:"container q-mx-auto"},ne={class:"row"},de={class:"col"},ue={id:"job_search_area"},_e={class:"row flex-center q-col-gutter-md"},me={class:"col-3"},he={class:"col-3"},pe={class:"row items-center justify-end"},fe={class:"col-5"},ve={class:"col-1"},ye={class:"container job_card_container q-mx-auto"},be={class:"row q-col-gutter-md"},ge=["href"],we={class:"row"},xe={class:"col-2 flex align-center"},Qe=["src"],Ve={class:"col-10"},qe={class:"text-overline text-orange-9"},$e={class:"text-h5 q-mt-sm q-mb-xs title"},ke={class:"row"},Be={class:"col-12 q-py-sm"},Ce={class:"text-overline text-orange-9"},Se={class:"row"},De={class:"col-12 description text-caption text-grey"},je={key:0,class:"row flex-center"},ze={class:"col-12"},Ue={class:"text-center text-accent"},Le={__name:"SearchJobs",setup(Ie){const v=D(),{locale:B}=j({useScope:"global"}),_=z();U();const y=b(!1),d=p([]),h=b(""),u=p({date:{}}),c=p({title:_.query.title,city:_.query.city,date_from:_.query.date_from,date_to:_.query.date_to}),C=I(()=>B.value==="zh-TW"?N.counties:ee.counties);return P(()=>u.date,()=>{h.value=u.date.from+"~"+u.date.to}),(async()=>{v.loading.show({delay:400});try{let s="/jobs/search?";for(const o in c)s+=o+"="+(c[o]||"")+"&";console.log(s);const l=s.slice(0,-1);console.log(l);const{data:t}=await E.get(l);d.push(...t.result),console.log(d),d.map(o=>(o.date_from=new Date(o.date_from).toLocaleDateString(),o.date_to=new Date(o.date_to).toLocaleDateString(),o.description=o.description.replace(/<(?:.|\s)*?>/g,""),o)),d.length===0&&(y.value=!0),v.loading.hide()}catch(s){console.log(s),J.fire({icon:"error",title:"\u5931\u6557",text:s.isAxiosError&&s.response.data?s.response.data.message:"\u767C\u751F\u932F\u8AA4"})}})(),(s,l)=>(n(),g(A,null,{default:r(()=>[e("div",se,[e("div",ae,[a(w,{class:"main_banner",src:L,width:"100%",height:"300px"}),oe,e("h2",le,i(s.$t("find_jobs")),1)]),e("div",re,[e("div",ie,[a(X,{class:"col-12"},{default:r(()=>[a(k,{exact:"",label:s.$t("home"),to:"/"},null,8,["label"]),a(k,{exact:"",label:s.$t("find_jobs"),to:"/jobs/search"},null,8,["label"])]),_:1})])]),e("div",ce,[e("div",ne,[e("div",de,[e("div",ue,[e("div",_e,[e("div",me,[a(Y,{outlined:"",modelValue:c.city,"onUpdate:modelValue":l[0]||(l[0]=t=>c.city=t),options:R(C),label:s.$t("city")+"*","emit-value":"","lazy-rules":"","bg-color":"white"},null,8,["modelValue","options","label"])]),e("div",he,[a(Q,{outlined:"",modelValue:h.value,"onUpdate:modelValue":l[2]||(l[2]=t=>h.value=t),label:s.$t("job_time"),"bg-color":"white"},{append:r(()=>[a(x,{name:"event",class:"cursor-pointer"},{default:r(()=>[a(te,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:r(()=>[a(T,{modelValue:u.date,"onUpdate:modelValue":l[1]||(l[1]=t=>u.date=t),range:""},{default:r(()=>[e("div",pe,[F(a(f,{label:"Close",color:"primary",flat:""},null,512),[[Z]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","label"])]),e("div",fe,[a(Q,{modelValue:c.keyword,"onUpdate:modelValue":l[3]||(l[3]=t=>c.keyword=t),outlined:"",type:"search",maxlength:"20","bg-color":"white",label:s.$t("search"),"input-style":{color:"#112B3C",fontSize:"1.1rem"}},null,8,["modelValue","label","input-style"])]),e("div",ve,[a(f,{id:"search_btn",class:"full-width",color:"primary",icon:"search"})])])])])])]),e("div",ye,[e("div",be,[(n(!0),m(q,null,V(d,t=>(n(),m("div",{key:t._id,class:"col-12 col-md-6 col-lg-4"},[a(K,{class:"job_card",flat:"",bordered:""},{default:r(()=>[e("a",{href:"#/jobs/"+t._id},[a(w,{src:t.photos[0],ratio:4/3},null,8,["src"])],8,ge),a(M,null,{default:r(()=>[e("div",we,[e("div",xe,[a(W,{class:"q-mt-xs",size:"2.5rem"},{default:r(()=>[e("img",{src:t.host.avatar},null,8,Qe)]),_:2},1024)]),e("div",Ve,[e("div",qe,[a(x,{name:"pin_drop",size:"1.1rem"}),$(" "+i(t.city+" "+t.district),1)]),e("div",$e,i(t.title),1)])]),e("div",ke,[e("div",Be,[e("div",Ce,i(s.$t("job_welfare")),1),(n(!0),m(q,null,V(t.welfare,(o,S)=>(n(),g(G,{key:S,size:".6rem"},{default:r(()=>[$(i(s.$t(o)),1)]),_:2},1024))),128))])]),e("div",Se,[e("div",De,i(t.description),1)])]),_:2},1024),a(H,null,{default:r(()=>[a(f,{class:"full-width",flat:"",color:"primary",label:s.$t("more"),to:"/jobs/"+t._id},null,8,["label","to"])]),_:2},1024)]),_:2},1024)]))),128))])]),y.value?(n(),m("div",je,[e("div",ze,[e("h4",Ue,[e("i",null,i(s.$t("no_results_label")),1)])])])):O("",!0)])]),_:1}))}};export{Le as default};