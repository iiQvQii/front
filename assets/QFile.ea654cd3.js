import{Q as B}from"./QChip.74d8cce9.js";import{n as K,a1 as T,$ as U,b9 as G,a2 as H,ba as J,a4 as M,r as C,ad as W,bb as X,bc as Y,p as i,ae as x,bd as Z,q as s,a3 as ee,v as te,ai as le}from"./index.edeae69a.js";var ie=K({name:"QFile",inheritAttrs:!1,props:{...T,...U,...G,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...H,...J],setup(e,{slots:o,emit:V,attrs:S}){const{proxy:p}=te(),u=M(),r=C(null),v=C(!1),A=W(e),{pickFiles:I,onDragover:j,onDragleave:q,processFiles:P,getDndNode:N}=X({editable:u.editable,dnd:v,getFileInput:y,addFilesToQueue:h}),O=Y(e),l=i(()=>Object(e.modelValue)===e.modelValue?"length"in e.modelValue?Array.from(e.modelValue):[e.modelValue]:[]),b=i(()=>x(l.value)),Q=i(()=>l.value.map(t=>t.name).join(", ")),g=i(()=>Z(l.value.reduce((t,a)=>t+a.size,0))),_=i(()=>({totalSize:g.value,filesNumber:l.value.length,maxFiles:e.maxFiles})),k=i(()=>({tabindex:-1,type:"file",title:"",accept:e.accept,capture:e.capture,name:A.value,...S,id:u.targetUid.value,disabled:u.editable.value!==!0})),D=i(()=>"q-file q-field--auto-height"+(v.value===!0?" q-file--dnd":"")),F=i(()=>e.multiple===!0&&e.append===!0);function c(t){const a=l.value.slice();a.splice(t,1),f(a)}function L(t){const a=l.value.findIndex(t);a>-1&&c(a)}function f(t){V("update:modelValue",e.multiple===!0?t:t[0])}function z(t){t.keyCode===13&&le(t)}function $(t){(t.keyCode===13||t.keyCode===32)&&I(t)}function y(){return r.value}function h(t,a){const n=P(t,a,l.value,F.value),m=y();m!=null&&(m.value=""),n!==void 0&&((e.multiple===!0?e.modelValue&&n.every(w=>l.value.includes(w)):e.modelValue===n[0])||f(F.value===!0?l.value.concat(n):n))}function d(){return[s("input",{class:[e.inputClass,"q-file__filler"],style:e.inputStyle})]}function E(){if(o.file!==void 0)return l.value.length===0?d():l.value.map((a,n)=>o.file({index:n,file:a,ref:this}));if(o.selected!==void 0)return l.value.length===0?d():o.selected({files:l.value,ref:this});if(e.useChips===!0)return l.value.length===0?d():l.value.map((a,n)=>s(B,{key:"file-"+n,removable:u.editable.value,dense:!0,textColor:e.color,tabindex:e.tabindex,onRemove:()=>{c(n)}},()=>s("span",{class:"ellipsis",textContent:a.name})));const t=e.displayValue!==void 0?e.displayValue:Q.value;return t.length>0?[s("div",{class:e.inputClass,style:e.inputStyle,textContent:t})]:d()}function R(){const t={ref:r,...k.value,...O.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:h};return e.multiple===!0&&(t.multiple=!0),s("input",t)}return Object.assign(u,{fieldClass:D,emitValue:f,hasValue:b,inputRef:r,innerValue:l,floatingLabel:i(()=>b.value===!0||x(e.displayValue)),computedCounter:i(()=>{if(e.counterLabel!==void 0)return e.counterLabel(_.value);const t=e.maxFiles;return`${l.value.length}${t!==void 0?" / "+t:""} (${g.value})`}),getControlChild:()=>N("file"),getControl:()=>{const t={ref:u.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:e.tabindex};return u.editable.value===!0&&Object.assign(t,{onDragover:j,onDragleave:q,onKeydown:z,onKeyup:$}),s("div",t,[R()].concat(E()))}}),Object.assign(p,{removeAtIndex:c,removeFile:L,getNativeElement:()=>r.value}),ee(u)}});export{ie as Q};
