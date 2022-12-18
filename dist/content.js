(()=>{"use strict";var e;let t,n;function r(r,l){if(r.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if("html"===r.tagName.toLowerCase())return"html";const s={root:document.body,idName:e=>!0,className:e=>!0,tagName:e=>!0,attr:(e,t)=>!1,seedMinLength:1,optimizedMinLength:2,threshold:1e3,maxNumberOfTries:1e4};t=Object.assign(Object.assign({},s),l),n=function(e,t){return e.nodeType===Node.DOCUMENT_NODE?e:e===t.root?e.ownerDocument:e}(t.root,s);let a=o(r,e.All,(()=>o(r,e.Two,(()=>o(r,e.One)))));if(a){const e=w(E(a,r));return e.length>0&&(a=e[0]),i(a)}throw new Error("Selector was not found.")}function o(n,r,o){let i=null,s=[],a=n,y=0;for(;a&&a!==t.root.parentElement;){let n=p(c(a))||p(...u(a))||p(...f(a))||p(d(a))||[{name:"*",penalty:3}];const N=m(a);if(r===e.All)N&&(n=n.concat(n.filter(g).map((e=>h(e,N)))));else if(r===e.Two)n=n.slice(0,1),N&&(n=n.concat(n.filter(g).map((e=>h(e,N)))));else if(r===e.One){const[e]=n=n.slice(0,1);N&&g(e)&&(n=[h(e,N)])}for(let e of n)e.level=y;if(s.push(n),s.length>=t.seedMinLength&&(i=l(s,o),i))break;a=a.parentElement,y++}return i||(i=l(s,o)),i}function l(e,n){const r=w(N(e));if(r.length>t.threshold)return n?n():null;for(let e of r)if(a(e))return e;return null}function i(e){let t=e[0],n=t.name;for(let r=1;r<e.length;r++){const o=e[r].level||0;n=t.level===o-1?`${e[r].name} > ${n}`:`${e[r].name} ${n}`,t=e[r]}return n}function s(e){return e.map((e=>e.penalty)).reduce(((e,t)=>e+t),0)}function a(e){switch(n.querySelectorAll(i(e)).length){case 0:throw new Error(`Can't select any node with this selector: ${i(e)}`);case 1:return!0;default:return!1}}function c(e){const n=e.getAttribute("id");return n&&t.idName(n)?{name:"#"+L(n,{isIdentifier:!0}),penalty:0}:null}function u(e){const n=Array.from(e.attributes).filter((e=>t.attr(e.name,e.value)));return n.map((e=>({name:"["+L(e.name,{isIdentifier:!0})+'="'+L(e.value)+'"]',penalty:.5})))}function f(e){return Array.from(e.classList).filter(t.className).map((e=>({name:"."+L(e,{isIdentifier:!0}),penalty:1})))}function d(e){const n=e.tagName.toLowerCase();return t.tagName(n)?{name:n,penalty:2}:null}function m(e){const t=e.parentNode;if(!t)return null;let n=t.firstChild;if(!n)return null;let r=0;for(;n&&(n.nodeType===Node.ELEMENT_NODE&&r++,n!==e);)n=n.nextSibling;return r}function h(e,t){return{name:e.name+`:nth-child(${t})`,penalty:e.penalty+1}}function g(e){return"html"!==e.name&&!e.name.startsWith("#")}function p(...e){const t=e.filter(y);return t.length>0?t:null}function y(e){return null!=e}function*N(e,t=[]){if(e.length>0)for(let n of e[0])yield*N(e.slice(1,e.length),t.concat(n));else yield t}function w(e){return Array.from(e).sort(((e,t)=>s(e)-s(t)))}function*E(e,n,r={counter:0,visited:new Map}){if(e.length>2&&e.length>t.optimizedMinLength)for(let o=1;o<e.length-1;o++){if(r.counter>t.maxNumberOfTries)return;r.counter+=1;const l=[...e];l.splice(o,1);const s=i(l);if(r.visited.has(s))return;a(l)&&v(l,n)&&(yield l,r.visited.set(s,!0),yield*E(l,n,r))}}function v(e,t){return n.querySelector(i(e))===t}!function(e){e[e.All=0]="All",e[e.Two=1]="Two",e[e.One=2]="One"}(e||(e={}));const b=/[ -,\.\/:-@\[-\^`\{-~]/,A=/[ -,\.\/:-@\[\]\^`\{-~]/,C=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,O={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1};function L(e,t={}){const n=Object.assign(Object.assign({},O),t);"single"!=n.quotes&&"double"!=n.quotes&&(n.quotes="single");const r="double"==n.quotes?'"':"'",o=n.isIdentifier,l=e.charAt(0);let i="",s=0;const a=e.length;for(;s<a;){const t=e.charAt(s++);let l,c=t.charCodeAt(0);if(c<32||c>126){if(c>=55296&&c<=56319&&s<a){const t=e.charCodeAt(s++);56320==(64512&t)?c=((1023&c)<<10)+(1023&t)+65536:s--}l="\\"+c.toString(16).toUpperCase()+" "}else l=n.escapeEverything?b.test(t)?"\\"+t:"\\"+c.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(t)?"\\"+c.toString(16).toUpperCase()+" ":"\\"==t||!o&&('"'==t&&r==t||"'"==t&&r==t)||o&&A.test(t)?"\\"+t:t;i+=l}return o&&(/^-[-\d]/.test(i)?i="\\-"+i.slice(1):/\d/.test(l)&&(i="\\3"+l+" "+i.slice(1))),i=i.replace(C,(function(e,t,n){return t&&t.length%2?e:(t||"")+n})),!o&&n.wrap?r+i+r:i}document.addEventListener("click",(e=>{if(document.getElementById("doc-detective")){const t=r(e.target);let n=!1,o=[];o[0]=document.querySelector(t);for(let e=0;e<o.length;e++){let t=o[e],r=t.parentElement,l=r.nodeName.toLowerCase();"body"===l?"body"===l&&"div"===t.nodeName.toLowerCase()&&"doc-detective"===t.id&&(n=!0):o.push(r)}if(n)return;let l=document.getElementById("selectorDisplay");e.stopPropagation(),e.preventDefault(),l.innerHTML=t}}))})();