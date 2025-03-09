var W="top",L="bottom",S="right",P="left",je="auto",fe=[W,L,S,P],Q="start",ae="end",mt="clippingParents",Ze="viewport",re="popper",ht="reference",Ve=fe.reduce(function(t,e){return t.concat([e+"-"+Q,e+"-"+ae])},[]),Ye=[].concat(fe,[je]).reduce(function(t,e){return t.concat([e,e+"-"+Q,e+"-"+ae])},[]),vt="beforeRead",gt="read",yt="afterRead",bt="beforeMain",xt="main",wt="afterMain",Ot="beforeWrite",jt="write",Et="afterWrite",At=[vt,gt,yt,bt,xt,wt,Ot,jt,Et];function T(t){return t?(t.nodeName||"").toLowerCase():null}function q(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function Z(t){var e=q(t).Element;return t instanceof e||t instanceof Element}function R(t){var e=q(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Ee(t){if(typeof ShadowRoot>"u")return!1;var e=q(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Dt(t){var e=t.state;Object.keys(e.elements).forEach(function(n){var r=e.styles[n]||{},o=e.attributes[n]||{},i=e.elements[n];!R(i)||!T(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var s=o[a];s===!1?i.removeAttribute(a):i.setAttribute(a,s===!0?"":s)}))})}function kt(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach(function(r){var o=e.elements[r],i=e.attributes[r]||{},a=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:n[r]),s=a.reduce(function(f,c){return f[c]="",f},{});!R(o)||!T(o)||(Object.assign(o.style,s),Object.keys(i).forEach(function(f){o.removeAttribute(f)}))})}}var $e={name:"applyStyles",enabled:!0,phase:"write",fn:Dt,effect:kt,requires:["computeStyles"]};function N(t){return t.split("-")[0]}var J=Math.max,ge=Math.min,Y=Math.round;function $(t,e){e===void 0&&(e=!1);var n=t.getBoundingClientRect(),r=1,o=1;if(R(t)&&e){var i=t.offsetHeight,a=t.offsetWidth;a>0&&(r=Y(n.width)/a||1),i>0&&(o=Y(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function Ae(t){var e=$(t),n=t.offsetWidth,r=t.offsetHeight;return Math.abs(e.width-n)<=1&&(n=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:t.offsetLeft,y:t.offsetTop,width:n,height:r}}function _e(t,e){var n=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(n&&Ee(n)){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function I(t){return q(t).getComputedStyle(t)}function Wt(t){return["table","td","th"].indexOf(T(t))>=0}function U(t){return((Z(t)?t.ownerDocument:t.document)||window.document).documentElement}function ye(t){return T(t)==="html"?t:t.assignedSlot||t.parentNode||(Ee(t)?t.host:null)||U(t)}function Ie(t){return!R(t)||I(t).position==="fixed"?null:t.offsetParent}function Pt(t){var e=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,n=navigator.userAgent.indexOf("Trident")!==-1;if(n&&R(t)){var r=I(t);if(r.position==="fixed")return null}var o=ye(t);for(Ee(o)&&(o=o.host);R(o)&&["html","body"].indexOf(T(o))<0;){var i=I(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||e&&i.willChange==="filter"||e&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function ce(t){for(var e=q(t),n=Ie(t);n&&Wt(n)&&I(n).position==="static";)n=Ie(n);return n&&(T(n)==="html"||T(n)==="body"&&I(n).position==="static")?e:n||Pt(t)||e}function De(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function oe(t,e,n){return J(t,ge(e,n))}function Bt(t,e,n){var r=oe(t,e,n);return r>n?n:r}function Fe(){return{top:0,right:0,bottom:0,left:0}}function et(t){return Object.assign({},Fe(),t)}function tt(t,e){return e.reduce(function(n,r){return n[r]=t,n},{})}var Ht=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,et(typeof t!="number"?t:tt(t,fe))};function Rt(t){var e,n=t.state,r=t.name,o=t.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=N(n.placement),f=De(s),c=[P,S].indexOf(s)>=0,p=c?"height":"width";if(!(!i||!a)){var h=Ht(o.padding,n),v=Ae(i),l=f==="y"?W:P,m=f==="y"?L:S,u=n.rects.reference[p]+n.rects.reference[f]-a[f]-n.rects.popper[p],g=a[f]-n.rects.reference[f],w=ce(i),y=w?f==="y"?w.clientHeight||0:w.clientWidth||0:0,j=u/2-g/2,d=h[l],b=y-v[p]-h[m],x=y/2-v[p]/2+j,O=oe(d,x,b),E=f;n.modifiersData[r]=(e={},e[E]=O,e.centerOffset=O-x,e)}}function Lt(t){var e=t.state,n=t.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=e.elements.popper.querySelector(o),!o)||!_e(e.elements.popper,o)||(e.elements.arrow=o))}var St={name:"arrow",enabled:!0,phase:"main",fn:Rt,effect:Lt,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function _(t){return t.split("-")[1]}var Ct={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Mt(t){var e=t.x,n=t.y,r=window,o=r.devicePixelRatio||1;return{x:Y(e*o)/o||0,y:Y(n*o)/o||0}}function Ue(t){var e,n=t.popper,r=t.popperRect,o=t.placement,i=t.variation,a=t.offsets,s=t.position,f=t.gpuAcceleration,c=t.adaptive,p=t.roundOffsets,h=t.isFixed,v=a.x,l=v===void 0?0:v,m=a.y,u=m===void 0?0:m,g=typeof p=="function"?p({x:l,y:u}):{x:l,y:u};l=g.x,u=g.y;var w=a.hasOwnProperty("x"),y=a.hasOwnProperty("y"),j=P,d=W,b=window;if(c){var x=ce(n),O="clientHeight",E="clientWidth";if(x===q(n)&&(x=U(n),I(x).position!=="static"&&s==="absolute"&&(O="scrollHeight",E="scrollWidth")),x=x,o===W||(o===P||o===S)&&i===ae){d=L;var D=h&&x===b&&b.visualViewport?b.visualViewport.height:x[O];u-=D-r.height,u*=f?1:-1}if(o===P||(o===W||o===L)&&i===ae){j=S;var k=h&&x===b&&b.visualViewport?b.visualViewport.width:x[E];l-=k-r.width,l*=f?1:-1}}var A=Object.assign({position:s},c&&Ct),C=p===!0?Mt({x:l,y:u}):{x:l,y:u};if(l=C.x,u=C.y,f){var B;return Object.assign({},A,(B={},B[d]=y?"0":"",B[j]=w?"0":"",B.transform=(b.devicePixelRatio||1)<=1?"translate("+l+"px, "+u+"px)":"translate3d("+l+"px, "+u+"px, 0)",B))}return Object.assign({},A,(e={},e[d]=y?u+"px":"",e[j]=w?l+"px":"",e.transform="",e))}function qt(t){var e=t.state,n=t.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,s=n.roundOffsets,f=s===void 0?!0:s,c={placement:N(e.placement),variation:_(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Ue(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:a,roundOffsets:f})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Ue(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var nt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:qt,data:{}},he={passive:!0};function Nt(t){var e=t.state,n=t.instance,r=t.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,s=a===void 0?!0:a,f=q(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return i&&c.forEach(function(p){p.addEventListener("scroll",n.update,he)}),s&&f.addEventListener("resize",n.update,he),function(){i&&c.forEach(function(p){p.removeEventListener("scroll",n.update,he)}),s&&f.removeEventListener("resize",n.update,he)}}var rt={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Nt,data:{}},Tt={left:"right",right:"left",bottom:"top",top:"bottom"};function ve(t){return t.replace(/left|right|bottom|top/g,function(e){return Tt[e]})}var Vt={start:"end",end:"start"};function Xe(t){return t.replace(/start|end/g,function(e){return Vt[e]})}function ke(t){var e=q(t),n=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:n,scrollTop:r}}function We(t){return $(U(t)).left+ke(t).scrollLeft}function It(t){var e=q(t),n=U(t),r=e.visualViewport,o=n.clientWidth,i=n.clientHeight,a=0,s=0;return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,s=r.offsetTop)),{width:o,height:i,x:a+We(t),y:s}}function Ut(t){var e,n=U(t),r=ke(t),o=(e=t.ownerDocument)==null?void 0:e.body,i=J(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=J(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-r.scrollLeft+We(t),f=-r.scrollTop;return I(o||n).direction==="rtl"&&(s+=J(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}function Pe(t){var e=I(t),n=e.overflow,r=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ot(t){return["html","body","#document"].indexOf(T(t))>=0?t.ownerDocument.body:R(t)&&Pe(t)?t:ot(ye(t))}function ie(t,e){var n;e===void 0&&(e=[]);var r=ot(t),o=r===((n=t.ownerDocument)==null?void 0:n.body),i=q(r),a=o?[i].concat(i.visualViewport||[],Pe(r)?r:[]):r,s=e.concat(a);return o?s:s.concat(ie(ye(a)))}function Oe(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Xt(t){var e=$(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}function ze(t,e){return e===Ze?Oe(It(t)):Z(e)?Xt(e):Oe(Ut(U(t)))}function zt(t){var e=ie(ye(t)),n=["absolute","fixed"].indexOf(I(t).position)>=0,r=n&&R(t)?ce(t):t;return Z(r)?e.filter(function(o){return Z(o)&&_e(o,r)&&T(o)!=="body"}):[]}function Gt(t,e,n){var r=e==="clippingParents"?zt(t):[].concat(e),o=[].concat(r,[n]),i=o[0],a=o.reduce(function(s,f){var c=ze(t,f);return s.top=J(c.top,s.top),s.right=ge(c.right,s.right),s.bottom=ge(c.bottom,s.bottom),s.left=J(c.left,s.left),s},ze(t,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function it(t){var e=t.reference,n=t.element,r=t.placement,o=r?N(r):null,i=r?_(r):null,a=e.x+e.width/2-n.width/2,s=e.y+e.height/2-n.height/2,f;switch(o){case W:f={x:a,y:e.y-n.height};break;case L:f={x:a,y:e.y+e.height};break;case S:f={x:e.x+e.width,y:s};break;case P:f={x:e.x-n.width,y:s};break;default:f={x:e.x,y:e.y}}var c=o?De(o):null;if(c!=null){var p=c==="y"?"height":"width";switch(i){case Q:f[c]=f[c]-(e[p]/2-n[p]/2);break;case ae:f[c]=f[c]+(e[p]/2-n[p]/2);break}}return f}function se(t,e){e===void 0&&(e={});var n=e,r=n.placement,o=r===void 0?t.placement:r,i=n.boundary,a=i===void 0?mt:i,s=n.rootBoundary,f=s===void 0?Ze:s,c=n.elementContext,p=c===void 0?re:c,h=n.altBoundary,v=h===void 0?!1:h,l=n.padding,m=l===void 0?0:l,u=et(typeof m!="number"?m:tt(m,fe)),g=p===re?ht:re,w=t.rects.popper,y=t.elements[v?g:p],j=Gt(Z(y)?y:y.contextElement||U(t.elements.popper),a,f),d=$(t.elements.reference),b=it({reference:d,element:w,placement:o}),x=Oe(Object.assign({},w,b)),O=p===re?x:d,E={top:j.top-O.top+u.top,bottom:O.bottom-j.bottom+u.bottom,left:j.left-O.left+u.left,right:O.right-j.right+u.right},D=t.modifiersData.offset;if(p===re&&D){var k=D[o];Object.keys(E).forEach(function(A){var C=[S,L].indexOf(A)>=0?1:-1,B=[W,L].indexOf(A)>=0?"y":"x";E[A]+=k[B]*C})}return E}function Jt(t,e){e===void 0&&(e={});var n=e,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=f===void 0?Ye:f,p=_(r),h=p?s?Ve:Ve.filter(function(m){return _(m)===p}):fe,v=h.filter(function(m){return c.indexOf(m)>=0});v.length===0&&(v=h);var l=v.reduce(function(m,u){return m[u]=se(t,{placement:u,boundary:o,rootBoundary:i,padding:a})[N(u)],m},{});return Object.keys(l).sort(function(m,u){return l[m]-l[u]})}function Kt(t){if(N(t)===je)return[];var e=ve(t);return[Xe(t),e,Xe(e)]}function Qt(t){var e=t.state,n=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,s=a===void 0?!0:a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,h=n.rootBoundary,v=n.altBoundary,l=n.flipVariations,m=l===void 0?!0:l,u=n.allowedAutoPlacements,g=e.options.placement,w=N(g),y=w===g,j=f||(y||!m?[ve(g)]:Kt(g)),d=[g].concat(j).reduce(function(z,V){return z.concat(N(V)===je?Jt(e,{placement:V,boundary:p,rootBoundary:h,padding:c,flipVariations:m,allowedAutoPlacements:u}):V)},[]),b=e.rects.reference,x=e.rects.popper,O=new Map,E=!0,D=d[0],k=0;k<d.length;k++){var A=d[k],C=N(A),B=_(A)===Q,F=[W,L].indexOf(C)>=0,ee=F?"width":"height",H=se(e,{placement:A,boundary:p,rootBoundary:h,altBoundary:v,padding:c}),M=F?B?S:P:B?L:W;b[ee]>x[ee]&&(M=ve(M));var ue=ve(M),X=[];if(i&&X.push(H[C]<=0),s&&X.push(H[M]<=0,H[ue]<=0),X.every(function(z){return z})){D=A,E=!1;break}O.set(A,X)}if(E)for(var pe=m?3:1,be=function(z){var V=d.find(function(de){var ne=O.get(de);if(ne)return ne.slice(0,z).every(function(K){return K})});if(V)return D=V,"break"},te=pe;te>0;te--){var le=be(te);if(le==="break")break}e.placement!==D&&(e.modifiersData[r]._skip=!0,e.placement=D,e.reset=!0)}}var Zt={name:"flip",enabled:!0,phase:"main",fn:Qt,requiresIfExists:["offset"],data:{_skip:!1}};function Ge(t,e,n){return n===void 0&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function Je(t){return[W,S,L,P].some(function(e){return t[e]>=0})}function Yt(t){var e=t.state,n=t.name,r=e.rects.reference,o=e.rects.popper,i=e.modifiersData.preventOverflow,a=se(e,{elementContext:"reference"}),s=se(e,{altBoundary:!0}),f=Ge(a,r),c=Ge(s,o,i),p=Je(f),h=Je(c);e.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:h},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":h})}var $t={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Yt};function _t(t,e,n){var r=N(t),o=[P,W].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},e,{placement:t})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,S].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}function Ft(t){var e=t.state,n=t.options,r=t.name,o=n.offset,i=o===void 0?[0,0]:o,a=Ye.reduce(function(p,h){return p[h]=_t(h,e.rects,i),p},{}),s=a[e.placement],f=s.x,c=s.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=f,e.modifiersData.popperOffsets.y+=c),e.modifiersData[r]=a}var en={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ft};function tn(t){var e=t.state,n=t.name;e.modifiersData[n]=it({reference:e.rects.reference,element:e.rects.popper,placement:e.placement})}var at={name:"popperOffsets",enabled:!0,phase:"read",fn:tn,data:{}};function nn(t){return t==="x"?"y":"x"}function rn(t){var e=t.state,n=t.options,r=t.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,s=a===void 0?!1:a,f=n.boundary,c=n.rootBoundary,p=n.altBoundary,h=n.padding,v=n.tether,l=v===void 0?!0:v,m=n.tetherOffset,u=m===void 0?0:m,g=se(e,{boundary:f,rootBoundary:c,padding:h,altBoundary:p}),w=N(e.placement),y=_(e.placement),j=!y,d=De(w),b=nn(d),x=e.modifiersData.popperOffsets,O=e.rects.reference,E=e.rects.popper,D=typeof u=="function"?u(Object.assign({},e.rects,{placement:e.placement})):u,k=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),A=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,C={x:0,y:0};if(x){if(i){var B,F=d==="y"?W:P,ee=d==="y"?L:S,H=d==="y"?"height":"width",M=x[d],ue=M+g[F],X=M-g[ee],pe=l?-E[H]/2:0,be=y===Q?O[H]:E[H],te=y===Q?-E[H]:-O[H],le=e.elements.arrow,z=l&&le?Ae(le):{width:0,height:0},V=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Fe(),de=V[F],ne=V[ee],K=oe(0,O[H],z[H]),st=j?O[H]/2-pe-K-de-k.mainAxis:be-K-de-k.mainAxis,ft=j?-O[H]/2+pe+K+ne+k.mainAxis:te+K+ne+k.mainAxis,xe=e.elements.arrow&&ce(e.elements.arrow),ct=xe?d==="y"?xe.clientTop||0:xe.clientLeft||0:0,He=(B=A?.[d])!=null?B:0,ut=M+st-He-ct,pt=M+ft-He,Re=oe(l?ge(ue,ut):ue,M,l?J(X,pt):X);x[d]=Re,C[d]=Re-M}if(s){var Le,lt=d==="x"?W:P,dt=d==="x"?L:S,G=x[b],me=b==="y"?"height":"width",Se=G+g[lt],Ce=G-g[dt],we=[W,P].indexOf(w)!==-1,Me=(Le=A?.[b])!=null?Le:0,qe=we?Se:G-O[me]-E[me]-Me+k.altAxis,Ne=we?G+O[me]+E[me]-Me-k.altAxis:Ce,Te=l&&we?Bt(qe,G,Ne):oe(l?qe:Se,G,l?Ne:Ce);x[b]=Te,C[b]=Te-G}e.modifiersData[r]=C}}var on={name:"preventOverflow",enabled:!0,phase:"main",fn:rn,requiresIfExists:["offset"]};function an(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function sn(t){return t===q(t)||!R(t)?ke(t):an(t)}function fn(t){var e=t.getBoundingClientRect(),n=Y(e.width)/t.offsetWidth||1,r=Y(e.height)/t.offsetHeight||1;return n!==1||r!==1}function cn(t,e,n){n===void 0&&(n=!1);var r=R(e),o=R(e)&&fn(e),i=U(e),a=$(t,o),s={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(r||!r&&!n)&&((T(e)!=="body"||Pe(i))&&(s=sn(e)),R(e)?(f=$(e,!0),f.x+=e.clientLeft,f.y+=e.clientTop):i&&(f.x=We(i))),{x:a.left+s.scrollLeft-f.x,y:a.top+s.scrollTop-f.y,width:a.width,height:a.height}}function un(t){var e=new Map,n=new Set,r=[];t.forEach(function(i){e.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(s){if(!n.has(s)){var f=e.get(s);f&&o(f)}}),r.push(i)}return t.forEach(function(i){n.has(i.name)||o(i)}),r}function pn(t){var e=un(t);return At.reduce(function(n,r){return n.concat(e.filter(function(o){return o.phase===r}))},[])}function ln(t){var e;return function(){return e||(e=new Promise(function(n){Promise.resolve().then(function(){e=void 0,n(t())})})),e}}function dn(t){var e=t.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(e).map(function(n){return e[n]})}var Ke={placement:"bottom",modifiers:[],strategy:"absolute"};function Qe(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Be(t){t===void 0&&(t={});var e=t,n=e.defaultModifiers,r=n===void 0?[]:n,o=e.defaultOptions,i=o===void 0?Ke:o;return function(a,s,f){f===void 0&&(f=i);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ke,i),modifiersData:{},elements:{reference:a,popper:s},attributes:{},styles:{}},p=[],h=!1,v={state:c,setOptions:function(u){var g=typeof u=="function"?u(c.options):u;m(),c.options=Object.assign({},i,c.options,g),c.scrollParents={reference:Z(a)?ie(a):a.contextElement?ie(a.contextElement):[],popper:ie(s)};var w=pn(dn([].concat(r,c.options.modifiers)));return c.orderedModifiers=w.filter(function(y){return y.enabled}),l(),v.update()},forceUpdate:function(){if(!h){var u=c.elements,g=u.reference,w=u.popper;if(Qe(g,w)){c.rects={reference:cn(g,ce(w),c.options.strategy==="fixed"),popper:Ae(w)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(E){return c.modifiersData[E.name]=Object.assign({},E.data)});for(var y=0;y<c.orderedModifiers.length;y++){if(c.reset===!0){c.reset=!1,y=-1;continue}var j=c.orderedModifiers[y],d=j.fn,b=j.options,x=b===void 0?{}:b,O=j.name;typeof d=="function"&&(c=d({state:c,options:x,name:O,instance:v})||c)}}}},update:ln(function(){return new Promise(function(u){v.forceUpdate(),u(c)})}),destroy:function(){m(),h=!0}};if(!Qe(a,s))return v;v.setOptions(f).then(function(u){!h&&f.onFirstUpdate&&f.onFirstUpdate(u)});function l(){c.orderedModifiers.forEach(function(u){var g=u.name,w=u.options,y=w===void 0?{}:w,j=u.effect;if(typeof j=="function"){var d=j({state:c,name:g,instance:v,options:y}),b=function(){};p.push(d||b)}})}function m(){p.forEach(function(u){return u()}),p=[]}return v}}Be();var mn=[rt,at,nt,$e];Be({defaultModifiers:mn});var hn=[rt,at,nt,$e,en,Zt,on,St,$t],vn=Be({defaultModifiers:hn});export{Ye as E,vn as y};
//# sourceMappingURL=@popperjs.DB1lLFnh.js.map
