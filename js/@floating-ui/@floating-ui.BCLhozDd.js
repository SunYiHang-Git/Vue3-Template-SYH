const j=Math.min,H=Math.max,nt=Math.round,et=Math.floor,L=t=>({x:t,y:t}),Bt={left:"right",right:"left",bottom:"top",top:"bottom"},Mt={start:"end",end:"start"};function ft(t,e,n){return H(t,j(e,n))}function Q(t,e){return typeof t=="function"?t(e):t}function $(t){return t.split("-")[0]}function Z(t){return t.split("-")[1]}function Rt(t){return t==="x"?"y":"x"}function dt(t){return t==="y"?"height":"width"}function Y(t){return["top","bottom"].includes($(t))?"y":"x"}function mt(t){return Rt(Y(t))}function Nt(t,e,n){n===void 0&&(n=!1);const o=Z(t),i=mt(t),r=dt(i);let s=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=ot(s)),[s,ot(s)]}function Wt(t){const e=ot(t);return[at(t),e,at(e)]}function at(t){return t.replace(/start|end/g,e=>Mt[e])}function Vt(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:s;default:return[]}}function Ht(t,e,n,o){const i=Z(t);let r=Vt($(t),n==="start",o);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(at)))),r}function ot(t){return t.replace(/left|right|bottom|top/g,e=>Bt[e])}function $t(t){return{top:0,right:0,bottom:0,left:0,...t}}function Ot(t){return typeof t!="number"?$t(t):{top:t,right:t,bottom:t,left:t}}function it(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function yt(t,e,n){let{reference:o,floating:i}=t;const r=Y(e),s=mt(e),c=dt(s),l=$(e),f=r==="y",d=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,m=o[c]/2-i[c]/2;let a;switch(l){case"top":a={x:d,y:o.y-i.height};break;case"bottom":a={x:d,y:o.y+o.height};break;case"right":a={x:o.x+o.width,y:u};break;case"left":a={x:o.x-i.width,y:u};break;default:a={x:o.x,y:o.y}}switch(Z(e)){case"start":a[s]-=m*(n&&f?-1:1);break;case"end":a[s]+=m*(n&&f?-1:1);break}return a}const zt=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:s}=n,c=r.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e));let f=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:d,y:u}=yt(f,o,l),m=o,a={},g=0;for(let h=0;h<c.length;h++){const{name:w,fn:p}=c[h],{x,y,data:b,reset:v}=await p({x:d,y:u,initialPlacement:o,placement:m,strategy:i,middlewareData:a,rects:f,platform:s,elements:{reference:t,floating:e}});d=x??d,u=y??u,a={...a,[w]:{...a[w],...b}},v&&g<=50&&(g++,typeof v=="object"&&(v.placement&&(m=v.placement),v.rects&&(f=v.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):v.rects),{x:d,y:u}=yt(f,m,l)),h=-1)}return{x:d,y:u,placement:m,strategy:i,middlewareData:a}};async function gt(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:r,rects:s,elements:c,strategy:l}=t,{boundary:f="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:m=!1,padding:a=0}=Q(e,t),g=Ot(a),w=c[m?u==="floating"?"reference":"floating":u],p=it(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(w)))==null||n?w:w.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:f,rootBoundary:d,strategy:l})),x=u==="floating"?{x:o,y:i,width:s.floating.width,height:s.floating.height}:s.reference,y=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),b=await(r.isElement==null?void 0:r.isElement(y))?await(r.getScale==null?void 0:r.getScale(y))||{x:1,y:1}:{x:1,y:1},v=it(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:y,strategy:l}):x);return{top:(p.top-v.top+g.top)/b.y,bottom:(v.bottom-p.bottom+g.bottom)/b.y,left:(p.left-v.left+g.left)/b.x,right:(v.right-p.right+g.right)/b.x}}const _t=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:r,platform:s,elements:c,middlewareData:l}=e,{element:f,padding:d=0}=Q(t,e)||{};if(f==null)return{};const u=Ot(d),m={x:n,y:o},a=mt(i),g=dt(a),h=await s.getDimensions(f),w=a==="y",p=w?"top":"left",x=w?"bottom":"right",y=w?"clientHeight":"clientWidth",b=r.reference[g]+r.reference[a]-m[a]-r.floating[g],v=m[a]-r.reference[a],D=await(s.getOffsetParent==null?void 0:s.getOffsetParent(f));let O=D?D[y]:0;(!O||!await(s.isElement==null?void 0:s.isElement(D)))&&(O=c.floating[y]||r.floating[g]);const U=b/2-v/2,W=O/2-h[g]/2-1,k=j(u[p],W),K=j(u[x],W),V=k,G=O-h[g]-K,A=O/2-h[g]/2+U,_=ft(V,A,G),F=!l.arrow&&Z(i)!=null&&A!==_&&r.reference[g]/2-(A<V?k:K)-h[g]/2<0,T=F?A<V?A-V:A-G:0;return{[a]:m[a]+T,data:{[a]:_,centerOffset:A-_-T,...F&&{alignmentOffset:T}},reset:F}}}),It=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:r,rects:s,initialPlacement:c,platform:l,elements:f}=e,{mainAxis:d=!0,crossAxis:u=!0,fallbackPlacements:m,fallbackStrategy:a="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:h=!0,...w}=Q(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const p=$(i),x=Y(c),y=$(c)===c,b=await(l.isRTL==null?void 0:l.isRTL(f.floating)),v=m||(y||!h?[ot(c)]:Wt(c)),D=g!=="none";!m&&D&&v.push(...Ht(c,h,g,b));const O=[c,...v],U=await gt(e,w),W=[];let k=((o=r.flip)==null?void 0:o.overflows)||[];if(d&&W.push(U[p]),u){const A=Nt(i,s,b);W.push(U[A[0]],U[A[1]])}if(k=[...k,{placement:i,overflows:W}],!W.every(A=>A<=0)){var K,V;const A=(((K=r.flip)==null?void 0:K.index)||0)+1,_=O[A];if(_)return{data:{index:A,overflows:k},reset:{placement:_}};let F=(V=k.filter(T=>T.overflows[0]<=0).sort((T,B)=>T.overflows[1]-B.overflows[1])[0])==null?void 0:V.placement;if(!F)switch(a){case"bestFit":{var G;const T=(G=k.filter(B=>{if(D){const M=Y(B.placement);return M===x||M==="y"}return!0}).map(B=>[B.placement,B.overflows.filter(M=>M>0).reduce((M,kt)=>M+kt,0)]).sort((B,M)=>B[1]-M[1])[0])==null?void 0:G[0];T&&(F=T);break}case"initialPlacement":F=c;break}if(i!==F)return{reset:{placement:F}}}return{}}}};async function jt(t,e){const{placement:n,platform:o,elements:i}=t,r=await(o.isRTL==null?void 0:o.isRTL(i.floating)),s=$(n),c=Z(n),l=Y(n)==="y",f=["left","top"].includes(s)?-1:1,d=r&&l?-1:1,u=Q(e,t);let{mainAxis:m,crossAxis:a,alignmentAxis:g}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return c&&typeof g=="number"&&(a=c==="end"?g*-1:g),l?{x:a*d,y:m*f}:{x:m*f,y:a*d}}const Yt=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:s,middlewareData:c}=e,l=await jt(e,t);return s===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+l.x,y:r+l.y,data:{...l,placement:s}}}}},qt=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:w=>{let{x:p,y:x}=w;return{x:p,y:x}}},...l}=Q(t,e),f={x:n,y:o},d=await gt(e,l),u=Y($(i)),m=Rt(u);let a=f[m],g=f[u];if(r){const w=m==="y"?"top":"left",p=m==="y"?"bottom":"right",x=a+d[w],y=a-d[p];a=ft(x,a,y)}if(s){const w=u==="y"?"top":"left",p=u==="y"?"bottom":"right",x=g+d[w],y=g-d[p];g=ft(x,g,y)}const h=c.fn({...e,[m]:a,[u]:g});return{...h,data:{x:h.x-n,y:h.y-o,enabled:{[m]:r,[u]:s}}}}}};function st(){return typeof window<"u"}function X(t){return Ct(t)?(t.nodeName||"").toLowerCase():"#document"}function R(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function S(t){var e;return(e=(Ct(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ct(t){return st()?t instanceof Node||t instanceof R(t).Node:!1}function C(t){return st()?t instanceof Element||t instanceof R(t).Element:!1}function P(t){return st()?t instanceof HTMLElement||t instanceof R(t).HTMLElement:!1}function vt(t){return!st()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof R(t).ShadowRoot}function tt(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=E(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function Xt(t){return["table","td","th"].includes(X(t))}function rt(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function ht(t){const e=pt(),n=C(t)?E(t):t;return["transform","translate","scale","rotate","perspective"].some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function Ut(t){let e=N(t);for(;P(e)&&!q(e);){if(ht(e))return e;if(rt(e))return null;e=N(e)}return null}function pt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function q(t){return["html","body","#document"].includes(X(t))}function E(t){return R(t).getComputedStyle(t)}function ct(t){return C(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function N(t){if(X(t)==="html")return t;const e=t.assignedSlot||t.parentNode||vt(t)&&t.host||S(t);return vt(e)?e.host:e}function Et(t){const e=N(t);return q(e)?t.ownerDocument?t.ownerDocument.body:t.body:P(e)&&tt(e)?e:Et(e)}function J(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=Et(t),r=i===((o=t.ownerDocument)==null?void 0:o.body),s=R(i);if(r){const c=ut(s);return e.concat(s,s.visualViewport||[],tt(i)?i:[],c&&n?J(c):[])}return e.concat(i,J(i,[],n))}function ut(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Tt(t){const e=E(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=P(t),r=i?t.offsetWidth:n,s=i?t.offsetHeight:o,c=nt(n)!==r||nt(o)!==s;return c&&(n=r,o=s),{width:n,height:o,$:c}}function wt(t){return C(t)?t:t.contextElement}function I(t){const e=wt(t);if(!P(e))return L(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Tt(e);let s=(r?nt(n.width):n.width)/o,c=(r?nt(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const Kt=L(0);function Lt(t){const e=R(t);return!pt()||!e.visualViewport?Kt:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Gt(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==R(t)?!1:e}function z(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),r=wt(t);let s=L(1);e&&(o?C(o)&&(s=I(o)):s=I(t));const c=Gt(r,n,o)?Lt(r):L(0);let l=(i.left+c.x)/s.x,f=(i.top+c.y)/s.y,d=i.width/s.x,u=i.height/s.y;if(r){const m=R(r),a=o&&C(o)?R(o):o;let g=m,h=ut(g);for(;h&&o&&a!==g;){const w=I(h),p=h.getBoundingClientRect(),x=E(h),y=p.left+(h.clientLeft+parseFloat(x.paddingLeft))*w.x,b=p.top+(h.clientTop+parseFloat(x.paddingTop))*w.y;l*=w.x,f*=w.y,d*=w.x,u*=w.y,l+=y,f+=b,g=R(h),h=ut(g)}}return it({width:d,height:u,x:l,y:f})}function xt(t,e){const n=ct(t).scrollLeft;return e?e.left+n:z(S(t)).left+n}function Pt(t,e,n){n===void 0&&(n=!1);const o=t.getBoundingClientRect(),i=o.left+e.scrollLeft-(n?0:xt(t,o)),r=o.top+e.scrollTop;return{x:i,y:r}}function Jt(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r=i==="fixed",s=S(o),c=e?rt(e.floating):!1;if(o===s||c&&r)return n;let l={scrollLeft:0,scrollTop:0},f=L(1);const d=L(0),u=P(o);if((u||!u&&!r)&&((X(o)!=="body"||tt(s))&&(l=ct(o)),P(o))){const a=z(o);f=I(o),d.x=a.x+o.clientLeft,d.y=a.y+o.clientTop}const m=s&&!u&&!r?Pt(s,l,!0):L(0);return{width:n.width*f.x,height:n.height*f.y,x:n.x*f.x-l.scrollLeft*f.x+d.x+m.x,y:n.y*f.y-l.scrollTop*f.y+d.y+m.y}}function Qt(t){return Array.from(t.getClientRects())}function Zt(t){const e=S(t),n=ct(t),o=t.ownerDocument.body,i=H(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=H(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+xt(t);const c=-n.scrollTop;return E(o).direction==="rtl"&&(s+=H(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:s,y:c}}function te(t,e){const n=R(t),o=S(t),i=n.visualViewport;let r=o.clientWidth,s=o.clientHeight,c=0,l=0;if(i){r=i.width,s=i.height;const f=pt();(!f||f&&e==="fixed")&&(c=i.offsetLeft,l=i.offsetTop)}return{width:r,height:s,x:c,y:l}}function ee(t,e){const n=z(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=P(t)?I(t):L(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,l=i*r.x,f=o*r.y;return{width:s,height:c,x:l,y:f}}function bt(t,e,n){let o;if(e==="viewport")o=te(t,n);else if(e==="document")o=Zt(S(t));else if(C(e))o=ee(e,n);else{const i=Lt(t);o={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return it(o)}function St(t,e){const n=N(t);return n===e||!C(n)||q(n)?!1:E(n).position==="fixed"||St(n,e)}function ne(t,e){const n=e.get(t);if(n)return n;let o=J(t,[],!1).filter(c=>C(c)&&X(c)!=="body"),i=null;const r=E(t).position==="fixed";let s=r?N(t):t;for(;C(s)&&!q(s);){const c=E(s),l=ht(s);!l&&c.position==="fixed"&&(i=null),(r?!l&&!i:!l&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||tt(s)&&!l&&St(t,s))?o=o.filter(d=>d!==s):i=c,s=N(s)}return e.set(t,o),o}function oe(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const s=[...n==="clippingAncestors"?rt(e)?[]:ne(e,this._c):[].concat(n),o],c=s[0],l=s.reduce((f,d)=>{const u=bt(e,d,i);return f.top=H(u.top,f.top),f.right=j(u.right,f.right),f.bottom=j(u.bottom,f.bottom),f.left=H(u.left,f.left),f},bt(e,c,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function ie(t){const{width:e,height:n}=Tt(t);return{width:e,height:n}}function se(t,e,n){const o=P(e),i=S(e),r=n==="fixed",s=z(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const l=L(0);if(o||!o&&!r)if((X(e)!=="body"||tt(i))&&(c=ct(e)),o){const m=z(e,!0,r,e);l.x=m.x+e.clientLeft,l.y=m.y+e.clientTop}else i&&(l.x=xt(i));const f=i&&!o&&!r?Pt(i,c):L(0),d=s.left+c.scrollLeft-l.x-f.x,u=s.top+c.scrollTop-l.y-f.y;return{x:d,y:u,width:s.width,height:s.height}}function lt(t){return E(t).position==="static"}function At(t,e){if(!P(t)||E(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return S(t)===n&&(n=n.ownerDocument.body),n}function Dt(t,e){const n=R(t);if(rt(t))return n;if(!P(t)){let i=N(t);for(;i&&!q(i);){if(C(i)&&!lt(i))return i;i=N(i)}return n}let o=At(t,e);for(;o&&Xt(o)&&lt(o);)o=At(o,e);return o&&q(o)&&lt(o)&&!ht(o)?n:o||Ut(t)||n}const re=async function(t){const e=this.getOffsetParent||Dt,n=this.getDimensions,o=await n(t.floating);return{reference:se(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function ce(t){return E(t).direction==="rtl"}const le={convertOffsetParentRelativeRectToViewportRelativeRect:Jt,getDocumentElement:S,getClippingRect:oe,getOffsetParent:Dt,getElementRects:re,getClientRects:Qt,getDimensions:ie,getScale:I,isElement:C,isRTL:ce};function Ft(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function fe(t,e){let n=null,o;const i=S(t);function r(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function s(c,l){c===void 0&&(c=!1),l===void 0&&(l=1),r();const f=t.getBoundingClientRect(),{left:d,top:u,width:m,height:a}=f;if(c||e(),!m||!a)return;const g=et(u),h=et(i.clientWidth-(d+m)),w=et(i.clientHeight-(u+a)),p=et(d),y={rootMargin:-g+"px "+-h+"px "+-w+"px "+-p+"px",threshold:H(0,j(1,l))||1};let b=!0;function v(D){const O=D[0].intersectionRatio;if(O!==l){if(!b)return s();O?s(!1,O):o=setTimeout(()=>{s(!1,1e-7)},1e3)}O===1&&!Ft(f,t.getBoundingClientRect())&&s(),b=!1}try{n=new IntersectionObserver(v,{...y,root:i.ownerDocument})}catch{n=new IntersectionObserver(v,y)}n.observe(t)}return s(!0),r}function ae(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,f=wt(t),d=i||r?[...f?J(f):[],...J(e)]:[];d.forEach(p=>{i&&p.addEventListener("scroll",n,{passive:!0}),r&&p.addEventListener("resize",n)});const u=f&&c?fe(f,n):null;let m=-1,a=null;s&&(a=new ResizeObserver(p=>{let[x]=p;x&&x.target===f&&a&&(a.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var y;(y=a)==null||y.observe(e)})),n()}),f&&!l&&a.observe(f),a.observe(e));let g,h=l?z(t):null;l&&w();function w(){const p=z(t);h&&!Ft(h,p)&&n(),h=p,g=requestAnimationFrame(w)}return n(),()=>{var p;d.forEach(x=>{i&&x.removeEventListener("scroll",n),r&&x.removeEventListener("resize",n)}),u?.(),(p=a)==null||p.disconnect(),a=null,l&&cancelAnimationFrame(g)}}const ue=gt,de=Yt,me=qt,ge=It,he=_t,pe=(t,e,n)=>{const o=new Map,i={platform:le,...n},r={...i.platform,_c:o};return zt(t,e,{...i,platform:r})};export{he as a,ae as b,pe as c,ue as d,ge as f,de as o,me as s};
//# sourceMappingURL=@floating-ui.BCLhozDd.js.map
