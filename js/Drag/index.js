import{t as d}from"../vue-draggable-plus/vue-draggable-plus.js";import{d as p,az as g,k as f,c as a,O as h,a6 as v,a as u,P as m,M as N,ag as k,o as n,r as _,w as y}from"../@vue/@vue.js";import{_ as c}from"../../index.DJwNFrtO.js";import"../pinia/pinia.js";import"../vue-router/vue-router.js";import"../element-plus/element-plus.js";import"../lodash-es/lodash-es.js";import"../@vueuse/@vueuse.js";import"../@element-plus/@element-plus.js";import"../@popperjs/@popperjs.js";import"../@ctrl/@ctrl.js";import"../dayjs/dayjs.js";import"../async-validator/async-validator.js";import"../memoize-one/memoize-one.js";import"../normalize-wheel-es/normalize-wheel-es.js";import"../@floating-ui/@floating-ui.js";const R=p({__name:"NestedFunction",props:{modelValue:{},groupName:{}},emits:["update:modelValue"],setup(r,{emit:t}){const e=g("el"),s=t,l=f({get:()=>r.modelValue,set:o=>s("update:modelValue",o)});return d(e,l,{group:r.groupName}),(o,S)=>{const V=k("NestedFunction",!0);return n(),a("ul",{class:"drag-area",ref_key:"el",ref:e},[(n(!0),a(h,null,v(o.modelValue,i=>(n(),a("li",{key:i.name},[u("p",null,N(i.name),1),m(V,{modelValue:i.children,"onUpdate:modelValue":x=>i.children=x,groupName:o.groupName},null,8,["modelValue","onUpdate:modelValue","groupName"])]))),128))],512)}}}),b=c(R,[["__scopeId","data-v-88887e89"]]),F=p({__name:"RightMain",props:{groupName:{}},setup(r){const t=g("rightRef"),e=_([]);return d(t,e,{animation:150,group:"people"}),y(()=>e.value,()=>{console.log("treeList.value--->",e.value)},{deep:!0}),(s,l)=>(n(),a("div",{class:"right-main",ref_key:"rightRef",ref:t},[m(b,{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=o=>e.value=o),groupName:s.groupName},null,8,["modelValue","groupName"])],512))}}),L=c(F,[["__scopeId","data-v-8245f0b1"]]),M={class:"left-menu"},$={class:"box"},I=p({__name:"LeftMenu",props:{list:{default:()=>[]},groupName:{}},setup(r){const t=_(),e=f(()=>r.list);return d(t,e,{animation:150,ghostClass:"ghost",group:{name:r.groupName,pull:"clone",put:!0},onStart(){console.log("start")},onUpdate(){console.log("update")}}),(s,l)=>(n(),a("div",M,[u("div",$,[u("div",{class:"flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded",ref_key:"el",ref:t},[(n(!0),a(h,null,v(e.value,o=>(n(),a("div",{key:o.id,class:"h-30 bg-gray-500/5 rounded p-3 cursor-move"},N(o.name),1))),128))],512)])]))}}),J=c(I,[["__scopeId","data-v-0c62c612"]]),U={class:"drag-container"},w={class:"left"},B={class:"right"},C=p({__name:"index",setup(r){const t=_([{name:"Joao",id:"1",children:[]},{name:"Jean",id:"2",children:[]},{name:"Johanna",id:"3",children:[]},{name:"Juan",id:"4",children:[]}]);return(e,s)=>(n(),a("div",U,[u("div",w,[m(J,{list:t.value,groupName:"group"},null,8,["list"])]),u("div",B,[m(L,{groupName:"group"})])]))}}),Z=c(C,[["__scopeId","data-v-03452eb0"]]);export{Z as default};
