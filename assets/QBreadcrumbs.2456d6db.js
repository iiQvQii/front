import{n as m,aP as h,aQ as C,p as i,q as r,k,L as q,aR as S,aS as _,aT as y,B as Q}from"./index.edeae69a.js";var $=m({name:"QBreadcrumbsEl",props:{...h,label:String,icon:String,tag:{type:String,default:"span"}},setup(e,{slots:l}){const{linkTag:o,linkProps:c,linkClass:d,hasRouterLink:b,navigateToRouterLink:n}=C(),u=i(()=>{const s={class:"q-breadcrumbs__el q-link flex inline items-center relative-position "+(e.disable!==!0?"q-link--focusable"+d.value:"q-breadcrumbs__el--disable"),...c.value};return b.value===!0&&(s.onClick=n),s}),t=i(()=>"q-breadcrumbs__el-icon"+(e.label!==void 0?" q-breadcrumbs__el-icon--with-label":""));return()=>{const s=[];return e.icon!==void 0&&s.push(r(k,{class:t.value,name:e.icon})),e.label!==void 0&&s.push(e.label),r(o.value,{...u.value},q(l.default,s))}}});const x=["",!0];var E=m({name:"QBreadcrumbs",props:{...S,separator:{type:String,default:"/"},separatorColor:String,activeColor:{type:String,default:"primary"},gutter:{type:String,validator:e=>["none","xs","sm","md","lg","xl"].includes(e),default:"sm"}},setup(e,{slots:l}){const o=_(e),c=i(()=>`flex items-center ${o.value}${e.gutter==="none"?"":` q-gutter-${e.gutter}`}`),d=i(()=>e.separatorColor?` text-${e.separatorColor}`:""),b=i(()=>` text-${e.activeColor}`);return()=>{const n=y(Q(l.default));if(n.length===0)return;let u=1;const t=[],s=n.filter(a=>a.type!==void 0&&a.type.name==="QBreadcrumbsEl").length,g=l.separator!==void 0?l.separator:()=>e.separator;return n.forEach(a=>{if(a.type!==void 0&&a.type.name==="QBreadcrumbsEl"){const v=u<s,f=a.props!==null&&x.includes(a.props.disable),p=(v===!0?"":" q-breadcrumbs--last")+(f!==!0&&v===!0?b.value:"");u++,t.push(r("div",{class:`flex items-center${p}`},[a])),v===!0&&t.push(r("div",{class:"q-breadcrumbs__separator"+d.value},g()))}else t.push(a)}),r("div",{class:"q-breadcrumbs"},[r("div",{class:c.value},t)])}}});export{$ as Q,E as a};
