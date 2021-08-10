(()=>{"use strict";var e,t,n;!function(e){window.DotNet=e;const t=[],n=new Map,r=new Map,o="__jsObjectId",a="__byte[]";class s{constructor(e){this._jsObject=e,this._cachedFunctions=new Map}findFunction(e){const t=this._cachedFunctions.get(e);if(t)return t;let n,r=this._jsObject;if(e.split(".").forEach((t=>{if(!(t in r))throw new Error(`Could not find '${e}' ('${t}' was undefined).`);n=r,r=r[t]})),r instanceof Function)return r=r.bind(n),this._cachedFunctions.set(e,r),r;throw new Error(`The value '${e}' is not a function.`)}getWrappedObject(){return this._jsObject}}const i={},c={0:new s(window)};c[0]._cachedFunctions.set("import",(e=>("string"==typeof e&&e.startsWith("./")&&(e=document.baseURI+e.substr(2)),import(e))));let l,u=1,d=1,f=null;function h(e){t.push(e)}function m(e){if(e&&"object"==typeof e){c[d]=new s(e);const t={[o]:d};return d++,t}throw new Error(`Cannot create a JSObjectReference from the value '${e}'.`)}function p(e){let t=-1;if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),e instanceof Blob)t=e.size;else{if(!(e.buffer instanceof ArrayBuffer))throw new Error("Supplied value is not a typed array or blob.");if(void 0===e.byteLength)throw new Error(`Cannot create a JSStreamReference from the value '${e}' as it doesn't have a byteLength.`);t=e.byteLength}const n={__jsStreamReferenceLength:t};try{const t=m(e);n.__jsObjectId=t.__jsObjectId}catch{throw new Error(`Cannot create a JSStreamReference from the value '${e}'.`)}return n}function v(e){return e?JSON.parse(e,((e,n)=>t.reduce(((t,n)=>n(e,t)),n))):null}function b(e,t,n,r){const o=y();if(o.invokeDotNetFromJS){const a=R(r),s=o.invokeDotNetFromJS(e,t,n,a);return s?v(s):null}throw new Error("The current dispatcher does not support synchronous calls from JS to .NET. Use invokeMethodAsync instead.")}function g(e,t,n,r){if(e&&n)throw new Error(`For instance method calls, assemblyName should be null. Received '${e}'.`);const o=u++,a=new Promise(((e,t)=>{i[o]={resolve:e,reject:t}}));try{const a=R(r);y().beginInvokeDotNetFromJS(o,e,t,n,a)}catch(e){w(o,!1,e)}return a}function y(){if(null!==f)return f;throw new Error("No .NET call dispatcher has been set.")}function w(e,t,n){if(!i.hasOwnProperty(e))throw new Error(`There is no pending async call with ID ${e}.`);const r=i[e];delete i[e],t?r.resolve(n):r.reject(n)}function E(e){return e instanceof Error?`${e.message}\n${e.stack}`:e?e.toString():"null"}function I(e,t){let n=c[t];if(n)return n.findFunction(e);throw new Error(`JS object instance with ID ${t} does not exist (has it been disposed?).`)}function S(e){delete c[e]}e.attachDispatcher=function(e){f=e},e.attachReviver=h,e.invokeMethod=function(e,t,...n){return b(e,t,null,n)},e.invokeMethodAsync=function(e,t,...n){return g(e,t,null,n)},e.createJSObjectReference=m,e.createJSStreamReference=p,e.disposeJSObjectReference=function(e){const t=e&&e.__jsObjectId;"number"==typeof t&&S(t)},function(e){e[e.Default=0]="Default",e[e.JSObjectReference=1]="JSObjectReference",e[e.JSStreamReference=2]="JSStreamReference"}(l=e.JSCallResultType||(e.JSCallResultType={})),e.jsCallDispatcher={findJSFunction:I,disposeJSObjectReferenceById:S,invokeJSFromDotNet:(e,t,n,r)=>{const o=N(I(e,r).apply(null,v(t)),n);return null==o?null:R(o)},beginInvokeJSFromDotNet:(e,t,n,r,o)=>{const a=new Promise((e=>{e(I(t,o).apply(null,v(n)))}));e&&a.then((t=>y().endInvokeJSFromDotNet(e,!0,R([e,!0,N(t,r)]))),(t=>y().endInvokeJSFromDotNet(e,!1,JSON.stringify([e,!1,E(t)]))))},endInvokeDotNetFromJS:(e,t,n)=>{const r=t?v(n):new Error(n);w(parseInt(e),t,r)},receiveByteArray:(e,t)=>{n.set(e,t)},supplyDotNetStream:(e,t)=>{if(r.has(e)){const n=r.get(e);r.delete(e),n.resolve(t)}else{const n=new A;n.resolve(t),r.set(e,n)}}};class C{constructor(e){this._id=e}invokeMethod(e,...t){return b(null,e,this._id,t)}invokeMethodAsync(e,...t){return g(null,e,this._id,t)}dispose(){g(null,"__Dispose",this._id,null).catch((e=>console.error(e)))}serializeAsArg(){return{__dotNetObject:this._id}}}e.DotNetObject=C,h((function(e,t){if(t&&"object"==typeof t){if(t.hasOwnProperty("__dotNetObject"))return new C(t.__dotNetObject);if(t.hasOwnProperty(o)){const e=t.__jsObjectId,n=c[e];if(n)return n.getWrappedObject();throw new Error(`JS object instance with Id '${e}' does not exist. It may have been disposed.`)}if(t.hasOwnProperty(a)){const e=t["__byte[]"],r=n.get(e);if(void 0===r)throw new Error(`Byte array index '${e}' does not exist.`);return n.delete(e),r}if(t.hasOwnProperty("__dotNetStream"))return new D(t.__dotNetStream)}return t}));class D{constructor(e){var t;if(r.has(e))this._streamPromise=null===(t=r.get(e))||void 0===t?void 0:t.streamPromise,r.delete(e);else{const t=new A;r.set(e,t),this._streamPromise=t.streamPromise}}stream(){return this._streamPromise}async arrayBuffer(){return new Response(await this.stream()).arrayBuffer()}}class A{constructor(){this.streamPromise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function N(e,t){switch(t){case l.Default:return e;case l.JSObjectReference:return m(e);case l.JSStreamReference:return p(e);default:throw new Error(`Invalid JS call result type '${t}'.`)}}let k=0;function R(e){return k=0,JSON.stringify(e,T)}function T(e,t){if(t instanceof C)return t.serializeAsArg();if(t instanceof Uint8Array){f.sendByteArray(k,t);const e={[a]:k};return k++,e}return t}}(e||(e={})),function(e){e[e.prependFrame=1]="prependFrame",e[e.removeFrame=2]="removeFrame",e[e.setAttribute=3]="setAttribute",e[e.removeAttribute=4]="removeAttribute",e[e.updateText=5]="updateText",e[e.stepIn=6]="stepIn",e[e.stepOut=7]="stepOut",e[e.updateMarkup=8]="updateMarkup",e[e.permutationListEntry=9]="permutationListEntry",e[e.permutationListEnd=10]="permutationListEnd"}(t||(t={})),function(e){e[e.element=1]="element",e[e.text=2]="text",e[e.attribute=3]="attribute",e[e.component=4]="component",e[e.region=5]="region",e[e.elementReferenceCapture=6]="elementReferenceCapture",e[e.markup=8]="markup"}(n||(n={}));class r{constructor(e,t){this.componentId=e,this.fieldValue=t}static fromEvent(e,t){const n=t.target;if(n instanceof Element){const t=function(e){return e instanceof HTMLInputElement?e.type&&"checkbox"===e.type.toLowerCase()?{value:e.checked}:{value:e.value}:e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?{value:e.value}:null}(n);if(t)return new r(e,t.value)}return null}}const o=new Map,a=new Map,s={createEventArgs:()=>({})},i=[];function c(e){return o.get(e)}function l(e){const t=o.get(e);return(null==t?void 0:t.browserEventName)||e}function u(e,t){e.forEach((e=>o.set(e,t)))}function d(e){const t=[];for(let n=0;n<e.length;n++){const r=e[n];t.push({identifier:r.identifier,clientX:r.clientX,clientY:r.clientY,screenX:r.screenX,screenY:r.screenY,pageX:r.pageX,pageY:r.pageY})}return t}function f(e){return{detail:e.detail,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,pageX:e.pageX,pageY:e.pageY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey}}u(["input","change"],{createEventArgs:function(e){const t=e.target;if(function(e){return-1!==h.indexOf(e.getAttribute("type"))}(t))return{value:function(e){const t=e.value,n=e.type;switch(n){case"date":case"month":return t;case"datetime-local":return 16===t.length?t+":00":t;case"time":return 5===t.length?t+":00":t;case"week":return t}throw new Error(`Invalid element type '${n}'.`)}(t)};if(function(e){return e instanceof HTMLSelectElement&&"select-multiple"===e.type}(t)){const e=t;return{value:Array.from(e.options).filter((e=>e.selected)).map((e=>e.value))}}return{value:function(e){return!!e&&"INPUT"===e.tagName&&"checkbox"===e.getAttribute("type")}(t)?!!t.checked:t.value}}}),u(["copy","cut","paste"],s),u(["drag","dragend","dragenter","dragleave","dragover","dragstart","drop"],{createEventArgs:e=>{return{...f(t=e),dataTransfer:t.dataTransfer?{dropEffect:t.dataTransfer.dropEffect,effectAllowed:t.dataTransfer.effectAllowed,files:Array.from(t.dataTransfer.files).map((e=>e.name)),items:Array.from(t.dataTransfer.items).map((e=>({kind:e.kind,type:e.type}))),types:t.dataTransfer.types}:null};var t}}),u(["focus","blur","focusin","focusout"],s),u(["keydown","keyup","keypress"],{createEventArgs:e=>{return{key:(t=e).key,code:t.code,location:t.location,repeat:t.repeat,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey};var t}}),u(["contextmenu","click","mouseover","mouseout","mousemove","mousedown","mouseup","dblclick"],{createEventArgs:e=>f(e)}),u(["error"],{createEventArgs:e=>{return{message:(t=e).message,filename:t.filename,lineno:t.lineno,colno:t.colno};var t}}),u(["loadstart","timeout","abort","load","loadend","progress"],{createEventArgs:e=>{return{lengthComputable:(t=e).lengthComputable,loaded:t.loaded,total:t.total};var t}}),u(["touchcancel","touchend","touchmove","touchenter","touchleave","touchstart"],{createEventArgs:e=>{return{detail:(t=e).detail,touches:d(t.touches),targetTouches:d(t.targetTouches),changedTouches:d(t.changedTouches),ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey,type:t.type};var t}}),u(["gotpointercapture","lostpointercapture","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerup"],{createEventArgs:e=>{return{...f(t=e),pointerId:t.pointerId,width:t.width,height:t.height,pressure:t.pressure,tiltX:t.tiltX,tiltY:t.tiltY,pointerType:t.pointerType,isPrimary:t.isPrimary};var t}}),u(["wheel","mousewheel"],{createEventArgs:e=>{return{...f(t=e),deltaX:t.deltaX,deltaY:t.deltaY,deltaZ:t.deltaZ,deltaMode:t.deltaMode};var t}}),u(["toggle"],s);const h=["date","datetime-local","month","time","week"],m=new Map;let p,v,b=0;const g={async add(e,t,n){if(!n)throw new Error("initialParameters must be an object, even if empty.");const r="__bl-dynamic-root:"+(++b).toString();m.set(r,e);const o=await E().invokeMethodAsync("AddRootComponent",t,r),a=new w(o,v[t]);return await a.setParameters(n),a}};class y{constructor(t){this._wrapper={func:t},this._jsObjectReference=e.createJSObjectReference(this._wrapper)}setCallback(e){this._wrapper.func=e}getJSObjectReference(){return this._jsObjectReference}dispose(){e.disposeJSObjectReference(this._jsObjectReference)}}class w{constructor(e,t){this._jsEventCallbackWrappers=new Map,this._componentId=e;for(const e of t)"eventcallback"===e.type&&this._jsEventCallbackWrappers.set(e.name.toLowerCase(),null)}setParameters(e){e=e||{};const t=Object.keys(e),n=t.length;for(const n of t){const t=n.toLowerCase();let r=this._jsEventCallbackWrappers.get(t);if(void 0===r)continue;const o=e[n];null===r?(r=new y(o),this._jsEventCallbackWrappers.set(t,r),e[n]=r.getJSObjectReference()):(r.setCallback(o),delete e[n])}return E().invokeMethodAsync("SetRootComponentParameters",this._componentId,n,e)}async dispose(){if(null!==this._componentId){await E().invokeMethodAsync("RemoveRootComponent",this._componentId),this._componentId=null;for(const e of this._jsEventCallbackWrappers.values())null==e||e.dispose()}}}function E(){if(!p)throw new Error("Dynamic root components have not been enabled in this application.");return p}const I=new Map;function S(e,t,n){return D(e,t.eventHandlerId,(()=>C(e).invokeMethodAsync("DispatchEventAsync",t,n)))}function C(e){const t=I.get(e);if(!t)throw new Error(`No interop methods are registered for renderer ${e}`);return t}let D=(e,t,n)=>n();const A=O(["abort","blur","change","error","focus","load","loadend","loadstart","mouseenter","mouseleave","progress","reset","scroll","submit","unload","toggle","DOMNodeInsertedIntoDocument","DOMNodeRemovedFromDocument"]),N={submit:!0},k=O(["click","dblclick","mousedown","mousemove","mouseup"]);class R{constructor(e){this.browserRendererId=e,this.afterClickCallbacks=[];const t=++R.nextEventDelegatorId;this.eventsCollectionKey=`_blazorEvents_${t}`,this.eventInfoStore=new T(this.onGlobalEvent.bind(this))}setListener(e,t,n,r){const o=this.getEventHandlerInfosForElement(e,!0),a=o.getHandler(t);if(a)this.eventInfoStore.update(a.eventHandlerId,n);else{const a={element:e,eventName:t,eventHandlerId:n,renderingComponentId:r};this.eventInfoStore.add(a),o.setHandler(t,a)}}getHandler(e){return this.eventInfoStore.get(e)}removeListener(e){const t=this.eventInfoStore.remove(e);if(t){const e=t.element,n=this.getEventHandlerInfosForElement(e,!1);n&&n.removeHandler(t.eventName)}}notifyAfterClick(e){this.afterClickCallbacks.push(e),this.eventInfoStore.addGlobalListener("click")}setStopPropagation(e,t,n){this.getEventHandlerInfosForElement(e,!0).stopPropagation(t,n)}setPreventDefault(e,t,n){this.getEventHandlerInfosForElement(e,!0).preventDefault(t,n)}onGlobalEvent(e){if(!(e.target instanceof Element))return;this.dispatchGlobalEventToAllElements(e.type,e);const t=(n=e.type,a.get(n));var n;t&&t.forEach((t=>this.dispatchGlobalEventToAllElements(t,e))),"click"===e.type&&this.afterClickCallbacks.forEach((t=>t(e)))}dispatchGlobalEventToAllElements(e,t){const n=t.composedPath();let o=n.shift(),a=null,s=!1;const i=A.hasOwnProperty(e);let l=!1;for(;o;){const f=o,h=this.getEventHandlerInfosForElement(f,!1);if(h){const n=h.getHandler(e);if(n&&(u=f,d=t.type,!((u instanceof HTMLButtonElement||u instanceof HTMLInputElement||u instanceof HTMLTextAreaElement||u instanceof HTMLSelectElement)&&k.hasOwnProperty(d)&&u.disabled))){if(!s){const n=c(e);a=(null==n?void 0:n.createEventArgs)?n.createEventArgs(t):{},s=!0}N.hasOwnProperty(t.type)&&t.preventDefault(),S(this.browserRendererId,{eventHandlerId:n.eventHandlerId,eventName:e,eventFieldInfo:r.fromEvent(n.renderingComponentId,t)},a)}h.stopPropagation(e)&&(l=!0),h.preventDefault(e)&&t.preventDefault()}o=i||l?void 0:n.shift()}var u,d}getEventHandlerInfosForElement(e,t){return e.hasOwnProperty(this.eventsCollectionKey)?e[this.eventsCollectionKey]:t?e[this.eventsCollectionKey]=new _:null}}R.nextEventDelegatorId=0;class T{constructor(e){this.globalListener=e,this.infosByEventHandlerId={},this.countByEventName={},i.push(this.handleEventNameAliasAdded.bind(this))}add(e){if(this.infosByEventHandlerId[e.eventHandlerId])throw new Error(`Event ${e.eventHandlerId} is already tracked`);this.infosByEventHandlerId[e.eventHandlerId]=e,this.addGlobalListener(e.eventName)}get(e){return this.infosByEventHandlerId[e]}addGlobalListener(e){if(e=l(e),this.countByEventName.hasOwnProperty(e))this.countByEventName[e]++;else{this.countByEventName[e]=1;const t=A.hasOwnProperty(e);document.addEventListener(e,this.globalListener,t)}}update(e,t){if(this.infosByEventHandlerId.hasOwnProperty(t))throw new Error(`Event ${t} is already tracked`);const n=this.infosByEventHandlerId[e];delete this.infosByEventHandlerId[e],n.eventHandlerId=t,this.infosByEventHandlerId[t]=n}remove(e){const t=this.infosByEventHandlerId[e];if(t){delete this.infosByEventHandlerId[e];const n=l(t.eventName);0==--this.countByEventName[n]&&(delete this.countByEventName[n],document.removeEventListener(n,this.globalListener))}return t}handleEventNameAliasAdded(e,t){if(this.countByEventName.hasOwnProperty(e)){const n=this.countByEventName[e];delete this.countByEventName[e],document.removeEventListener(e,this.globalListener),this.addGlobalListener(t),this.countByEventName[t]+=n-1}}}class _{constructor(){this.handlers={},this.preventDefaultFlags=null,this.stopPropagationFlags=null}getHandler(e){return this.handlers.hasOwnProperty(e)?this.handlers[e]:null}setHandler(e,t){this.handlers[e]=t}removeHandler(e){delete this.handlers[e]}preventDefault(e,t){return void 0!==t&&(this.preventDefaultFlags=this.preventDefaultFlags||{},this.preventDefaultFlags[e]=t),!!this.preventDefaultFlags&&this.preventDefaultFlags[e]}stopPropagation(e,t){return void 0!==t&&(this.stopPropagationFlags=this.stopPropagationFlags||{},this.stopPropagationFlags[e]=t),!!this.stopPropagationFlags&&this.stopPropagationFlags[e]}}function O(e){const t={};return e.forEach((e=>{t[e]=!0})),t}const F=W("_blazorLogicalChildren"),x=W("_blazorLogicalParent"),P=W("_blazorLogicalEnd");function L(e,t){if(e.childNodes.length>0&&!t)throw new Error("New logical elements must start empty, or allowExistingContents must be true");return F in e||(e[F]=[]),e}function j(e,t){const n=document.createComment("!");return M(n,e,t),n}function M(e,t,n){const r=e;if(e instanceof Comment&&$(r)&&$(r).length>0)throw new Error("Not implemented: inserting non-empty logical container");if(H(r))throw new Error("Not implemented: moving existing logical children");const o=$(t);if(n<o.length){const t=o[n];t.parentNode.insertBefore(e,t),o.splice(n,0,r)}else X(e,t),o.push(r);r[x]=t,F in r||(r[F]=[])}function B(e,t){const n=$(e).splice(t,1)[0];if(n instanceof Comment){const e=$(n);if(e)for(;e.length>0;)B(n,0)}const r=n;r.parentNode.removeChild(r)}function H(e){return e[x]||null}function U(e,t){return $(e)[t]}function J(e){var t=K(e);return"http://www.w3.org/2000/svg"===t.namespaceURI&&"foreignObject"!==t.tagName}function $(e){return e[F]}function z(e,t){const n=$(e);t.forEach((e=>{e.moveRangeStart=n[e.fromSiblingIndex],e.moveRangeEnd=Y(e.moveRangeStart)})),t.forEach((t=>{const r=t.moveToBeforeMarker=document.createComment("marker"),o=n[t.toSiblingIndex+1];o?o.parentNode.insertBefore(r,o):X(r,e)})),t.forEach((e=>{const t=e.moveToBeforeMarker,n=t.parentNode,r=e.moveRangeStart,o=e.moveRangeEnd;let a=r;for(;a;){const e=a.nextSibling;if(n.insertBefore(a,t),a===o)break;a=e}n.removeChild(t)})),t.forEach((e=>{n[e.toSiblingIndex]=e.moveRangeStart}))}function K(e){if(e instanceof Element||e instanceof DocumentFragment)return e;if(e instanceof Comment)return e.parentNode;throw new Error("Not a valid logical element")}function V(e){const t=$(H(e));return t[Array.prototype.indexOf.call(t,e)+1]||null}function X(e,t){if(t instanceof Element||t instanceof DocumentFragment)t.appendChild(e);else{if(!(t instanceof Comment))throw new Error(`Cannot append node because the parent is not a valid logical element. Parent: ${t}`);{const n=V(t);n?n.parentNode.insertBefore(e,n):X(e,H(t))}}}function Y(e){if(e instanceof Element||e instanceof DocumentFragment)return e;const t=V(e);if(t)return t.previousSibling;{const t=H(e);return t instanceof Element||t instanceof DocumentFragment?t.lastChild:Y(t)}}function W(e){return"function"==typeof Symbol?Symbol():e}function G(e){return`_bl_${e}`}e.attachReviver(((e,t)=>t&&"object"==typeof t&&t.hasOwnProperty("__internalId")&&"string"==typeof t.__internalId?function(e){const t=`[${G(e)}]`;return document.querySelector(t)}(t.__internalId):t));const q="_blazorDeferredValue",Z=document.createElement("template"),Q=document.createElementNS("http://www.w3.org/2000/svg","g"),ee={},te="__internal_",ne="preventDefault_",re="stopPropagation_";class oe{constructor(e){this.rootComponentIds=new Set,this.childComponentLocations={},this.eventDelegator=new R(e),this.eventDelegator.notifyAfterClick((e=>{if(!fe)return;if(0!==e.button||function(e){return e.ctrlKey||e.shiftKey||e.altKey||e.metaKey}(e))return;if(e.defaultPrevented)return;const t=function(e){const t=!window._blazorDisableComposedPath&&e.composedPath&&e.composedPath();if(t){for(let e=0;e<t.length;e++){const n=t[e];if(n instanceof Element&&"A"===n.tagName)return n}return null}return Ee(e.target,"A")}(e);if(t&&function(e){const t=e.getAttribute("target");return(!t||"_self"===t)&&e.hasAttribute("href")&&!e.hasAttribute("download")}(t)){const n=we(t.getAttribute("href"));Ie(n)&&(e.preventDefault(),be(n,!0,!1))}}))}attachRootComponentToLogicalElement(e,t,n){this.attachComponentToElement(e,t),this.rootComponentIds.add(e),n||(ee[e]=t)}updateComponent(e,t,n,r){var o;const a=this.childComponentLocations[t];if(!a)throw new Error(`No element is currently associated with component ${t}`);const s=ee[t];if(s){const e=function(e){return e[P]||null}(s);delete ee[t],e?function(e,t){const n=H(e);if(!n)throw new Error("Can't clear between nodes. The start node does not have a logical parent.");const r=$(n),o=r.indexOf(e)+1,a=r.indexOf(t);for(let e=o;e<=a;e++)B(n,o);e.textContent="!"}(s,e):function(e){let t;for(;t=e.firstChild;)e.removeChild(t)}(s)}const i=null===(o=K(a))||void 0===o?void 0:o.getRootNode(),c=i&&i.activeElement;this.applyEdits(e,t,a,0,n,r),c instanceof HTMLElement&&i&&i.activeElement!==c&&c.focus()}disposeComponent(e){this.rootComponentIds.delete(e)&&function(e){const t=$(e);for(;t.length;)B(e,0)}(this.childComponentLocations[e]),delete this.childComponentLocations[e]}disposeEventHandler(e){this.eventDelegator.removeListener(e)}attachComponentToElement(e,t){this.childComponentLocations[e]=t}applyEdits(e,n,r,o,a,s){let i,c=0,l=o;const u=e.arrayBuilderSegmentReader,d=e.editReader,f=e.frameReader,h=u.values(a),m=u.offset(a),p=m+u.count(a);for(let a=m;a<p;a++){const u=e.diffReader.editsEntry(h,a),m=d.editType(u);switch(m){case t.prependFrame:{const t=d.newTreeIndex(u),o=e.referenceFramesEntry(s,t),a=d.siblingIndex(u);this.insertFrame(e,n,r,l+a,s,o,t);break}case t.removeFrame:B(r,l+d.siblingIndex(u));break;case t.setAttribute:{const t=d.newTreeIndex(u),o=e.referenceFramesEntry(s,t),a=U(r,l+d.siblingIndex(u));if(!(a instanceof Element))throw new Error("Cannot set attribute on non-element child");this.applyAttribute(e,n,a,o);break}case t.removeAttribute:{const t=U(r,l+d.siblingIndex(u));if(!(t instanceof HTMLElement))throw new Error("Cannot remove attribute from non-element child");{const n=d.removedAttributeName(u);this.tryApplySpecialProperty(e,t,n,null)||t.removeAttribute(n)}break}case t.updateText:{const t=d.newTreeIndex(u),n=e.referenceFramesEntry(s,t),o=U(r,l+d.siblingIndex(u));if(!(o instanceof Text))throw new Error("Cannot set text content on non-text child");o.textContent=f.textContent(n);break}case t.updateMarkup:{const t=d.newTreeIndex(u),n=e.referenceFramesEntry(s,t),o=d.siblingIndex(u);B(r,l+o),this.insertMarkup(e,r,l+o,n);break}case t.stepIn:r=U(r,l+d.siblingIndex(u)),c++,l=0;break;case t.stepOut:r=H(r),c--,l=0===c?o:0;break;case t.permutationListEntry:i=i||[],i.push({fromSiblingIndex:l+d.siblingIndex(u),toSiblingIndex:l+d.moveToSiblingIndex(u)});break;case t.permutationListEnd:z(r,i),i=void 0;break;default:throw new Error(`Unknown edit type: ${m}`)}}}insertFrame(e,t,r,o,a,s,i){const c=e.frameReader,l=c.frameType(s);switch(l){case n.element:return this.insertElement(e,t,r,o,a,s,i),1;case n.text:return this.insertText(e,r,o,s),1;case n.attribute:throw new Error("Attribute frames should only be present as leading children of element frames.");case n.component:return this.insertComponent(e,r,o,s),1;case n.region:return this.insertFrameRange(e,t,r,o,a,i+1,i+c.subtreeLength(s));case n.elementReferenceCapture:if(r instanceof Element)return u=r,d=c.elementReferenceCaptureId(s),u.setAttribute(G(d),""),0;throw new Error("Reference capture frames can only be children of element frames.");case n.markup:return this.insertMarkup(e,r,o,s),1;default:throw new Error(`Unknown frame type: ${l}`)}var u,d}insertElement(e,t,r,o,a,s,i){const c=e.frameReader,l=c.elementName(s),u="svg"===l||J(r)?document.createElementNS("http://www.w3.org/2000/svg",l):document.createElement(l),d=L(u);let f=!1;const h=i+c.subtreeLength(s);for(let s=i+1;s<h;s++){const i=e.referenceFramesEntry(a,s);if(c.frameType(i)!==n.attribute){M(u,r,o),f=!0,this.insertFrameRange(e,t,d,0,a,s,h);break}this.applyAttribute(e,t,u,i)}f||M(u,r,o),u instanceof HTMLOptionElement?this.trySetSelectValueFromOptionElement(u):q in u&&le(u,u._blazorDeferredValue)}trySetSelectValueFromOptionElement(e){const t=this.findClosestAncestorSelectElement(e);if(!t||!(q in t))return!1;if(ie(t))e.selected=-1!==t._blazorDeferredValue.indexOf(e.value);else{if(t._blazorDeferredValue!==e.value)return!1;ce(t,e.value),delete t._blazorDeferredValue}return!0}insertComponent(e,t,n,r){const o=j(t,n),a=e.frameReader.componentId(r);this.attachComponentToElement(a,o)}insertText(e,t,n,r){const o=e.frameReader.textContent(r);M(document.createTextNode(o),t,n)}insertMarkup(e,t,n,r){const o=j(t,n),a=(s=e.frameReader.markupContent(r),J(t)?(Q.innerHTML=s||" ",Q):(Z.innerHTML=s||" ",Z.content));var s;let i=0;for(;a.firstChild;)M(a.firstChild,o,i++)}applyAttribute(e,t,n,r){const o=e.frameReader,a=o.attributeName(r),s=o.attributeEventHandlerId(r);if(s){const e=se(a);this.eventDelegator.setListener(n,e,s,t)}else this.tryApplySpecialProperty(e,n,a,r)||n.setAttribute(a,o.attributeValue(r))}tryApplySpecialProperty(e,t,n,r){switch(n){case"value":return this.tryApplyValueProperty(e,t,r);case"checked":return this.tryApplyCheckedProperty(e,t,r);default:return!!n.startsWith(te)&&(this.applyInternalAttribute(e,t,n.substring(te.length),r),!0)}}applyInternalAttribute(e,t,n,r){const o=r?e.frameReader.attributeValue(r):null;if(n.startsWith(re)){const e=se(n.substring(re.length));this.eventDelegator.setStopPropagation(t,e,null!==o)}else{if(!n.startsWith(ne))throw new Error(`Unsupported internal attribute '${n}'`);{const e=se(n.substring(ne.length));this.eventDelegator.setPreventDefault(t,e,null!==o)}}}tryApplyValueProperty(e,t,n){const r=e.frameReader;if("INPUT"===t.tagName&&"time"===t.getAttribute("type")&&!t.getAttribute("step")){const e=n?r.attributeValue(n):null;if(e)return t.value=e.substring(0,5),!0}switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":{let e=n?r.attributeValue(n):null;return e&&t instanceof HTMLSelectElement&&ie(t)&&(e=JSON.parse(e)),le(t,e),t._blazorDeferredValue=e,!0}case"OPTION":{const e=n?r.attributeValue(n):null;return e||""===e?t.setAttribute("value",e):t.removeAttribute("value"),this.trySetSelectValueFromOptionElement(t),!0}default:return!1}}tryApplyCheckedProperty(e,t,n){if("INPUT"===t.tagName){const r=n?e.frameReader.attributeValue(n):null;return t.checked=null!==r,!0}return!1}findClosestAncestorSelectElement(e){for(;e;){if(e instanceof HTMLSelectElement)return e;e=e.parentElement}return null}insertFrameRange(e,t,n,r,o,a,s){const i=r;for(let i=a;i<s;i++){const a=e.referenceFramesEntry(o,i);r+=this.insertFrame(e,t,n,r,o,a,i),i+=ae(e,a)}return r-i}}function ae(e,t){const r=e.frameReader;switch(r.frameType(t)){case n.component:case n.element:case n.region:return r.subtreeLength(t)-1;default:return 0}}function se(e){if(e.startsWith("on"))return e.substring(2);throw new Error(`Attribute should be an event name, but doesn't start with 'on'. Value: '${e}'`)}function ie(e){return"select-multiple"===e.type}function ce(e,t){e.value=t||""}function le(e,t){e instanceof HTMLSelectElement?ie(e)?function(e,t){t||(t=[]);for(let n=0;n<e.options.length;n++)e.options[n].selected=-1!==t.indexOf(e.options[n].value)}(e,t):ce(e,t):e.value=t}const ue={};let de=!1,fe=!1,he=!1,me=null;const pe={listenForNavigationEvents:function(e){me=e,he||(he=!0,window.addEventListener("popstate",(()=>ge(!1))))},enableNavigationInterception:function(){fe=!0},navigateTo:ve,getBaseURI:()=>document.baseURI,getLocationHref:()=>location.href};function ve(e,t,n=!1){const r=we(e),o=t instanceof Object?t:{forceLoad:t,replaceHistoryEntry:n};!o.forceLoad&&Ie(r)?be(r,!1,o.replaceHistoryEntry):function(e,t){if(location.href===e){const t=e+"?";history.replaceState(null,"",t),location.replace(e)}else t?location.replace(e):location.href=e}(e,o.replaceHistoryEntry)}function be(e,t,n){de=!0,n?history.replaceState(null,"",e):history.pushState(null,"",e),ge(t)}async function ge(e){me&&await me(location.href,e)}let ye;function we(e){return ye=ye||document.createElement("a"),ye.href=e,ye.href}function Ee(e,t){return e?e.tagName===t?e:Ee(e.parentElement,t):null}function Ie(e){const t=(n=document.baseURI).substr(0,n.lastIndexOf("/")+1);var n;return e.startsWith(t)}const Se={focus:function(e,t){if(e instanceof HTMLElement)e.focus({preventScroll:t});else{if(!(e instanceof SVGElement))throw new Error("Unable to focus an invalid element.");if(!e.hasAttribute("tabindex"))throw new Error("Unable to focus an SVG element that does not have a tabindex.");e.focus({preventScroll:t})}},focusBySelector:function(e){const t=document.querySelector(e);t&&(t.hasAttribute("tabindex")||(t.tabIndex=-1),t.focus())}},Ce={init:function(e,t,n,r=50){const o=Ae(t);(o||document.documentElement).style.overflowAnchor="none";const a=new IntersectionObserver((function(r){r.forEach((r=>{var o;if(!r.isIntersecting)return;const a=t.getBoundingClientRect(),s=n.getBoundingClientRect().top-a.bottom,i=null===(o=r.rootBounds)||void 0===o?void 0:o.height;r.target===t?e.invokeMethodAsync("OnSpacerBeforeVisible",r.intersectionRect.top-r.boundingClientRect.top,s,i):r.target===n&&n.offsetHeight>0&&e.invokeMethodAsync("OnSpacerAfterVisible",r.boundingClientRect.bottom-r.intersectionRect.bottom,s,i)}))}),{root:o,rootMargin:`${r}px`});a.observe(t),a.observe(n);const s=c(t),i=c(n);function c(e){const t=new MutationObserver((()=>{a.unobserve(e),a.observe(e)}));return t.observe(e,{attributes:!0}),t}De[e._id]={intersectionObserver:a,mutationObserverBefore:s,mutationObserverAfter:i}},dispose:function(e){const t=De[e._id];t&&(t.intersectionObserver.disconnect(),t.mutationObserverBefore.disconnect(),t.mutationObserverAfter.disconnect(),e.dispose(),delete De[e._id])}},De={};function Ae(e){return e?"visible"!==getComputedStyle(e).overflowY?e:Ae(e.parentElement):null}const Ne={getAndRemoveExistingTitle:function(){var e;const t=document.getElementsByTagName("title");if(0===t.length)return null;let n=null;for(let r=t.length-1;r>=0;r--){const o=t[r],a=o.previousSibling;a instanceof Comment&&null!==H(a)||(null===n&&(n=o.textContent),null===(e=o.parentNode)||void 0===e||e.removeChild(o))}return n}},ke={init:function(e,t){t._blazorInputFileNextFileId=0,t.addEventListener("click",(function(){t.value=""})),t.addEventListener("change",(function(){t._blazorFilesById={};const n=Array.prototype.map.call(t.files,(function(e){const n={id:++t._blazorInputFileNextFileId,lastModified:new Date(e.lastModified).toISOString(),name:e.name,size:e.size,contentType:e.type,readPromise:void 0,arrayBuffer:void 0,blob:e};return t._blazorFilesById[n.id]=n,n}));e.invokeMethodAsync("NotifyChange",n)}))},toImageFile:async function(e,t,n,r,o){const a=Re(e,t),s=await new Promise((function(e){const t=new Image;t.onload=function(){e(t)},t.src=URL.createObjectURL(a.blob)})),i=await new Promise((function(e){var t;const a=Math.min(1,r/s.width),i=Math.min(1,o/s.height),c=Math.min(a,i),l=document.createElement("canvas");l.width=Math.round(s.width*c),l.height=Math.round(s.height*c),null===(t=l.getContext("2d"))||void 0===t||t.drawImage(s,0,0,l.width,l.height),l.toBlob(e,n)})),c={id:++e._blazorInputFileNextFileId,lastModified:a.lastModified,name:a.name,size:(null==i?void 0:i.size)||0,contentType:n,blob:i||a.blob};return e._blazorFilesById[c.id]=c,c},readFileData:async function(e,t){return Re(e,t).blob}};function Re(e,t){const n=e._blazorFilesById[t];if(!n)throw new Error(`There is no file with ID ${t}. The file list may have changed.`);return n}const Te=new Map,_e={navigateTo:ve,registerCustomEventType:function(e,t){if(!t)throw new Error("The options parameter is required.");if(o.has(e))throw new Error(`The event '${e}' is already registered.`);if(t.browserEventName){const n=a.get(t.browserEventName);n?n.push(e):a.set(t.browserEventName,[e]),i.forEach((n=>n(e,t.browserEventName)))}o.set(e,t)},rootComponents:g,_internal:{navigationManager:pe,domWrapper:Se,Virtualize:Ce,PageTitle:Ne,InputFile:ke,getJSDataStreamChunk:async function(e,t,n){return e instanceof Blob?await async function(e,t,n){const r=e.slice(t,t+n),o=await r.arrayBuffer();return new Uint8Array(o)}(e,t,n):function(e,t,n){return new Uint8Array(e.buffer,e.byteOffset+t,n)}(e,t,n)},receiveDotNetDataStream:function(t,n,r,o){let a=Te.get(t);if(!a){const n=new ReadableStream({start(e){Te.set(t,e),a=e}});e.jsCallDispatcher.supplyDotNetStream(t,n)}o?(a.error(o),Te.delete(t)):0===r?(a.close(),Te.delete(t)):a.enqueue(n.length===r?n:n.subarray(0,r))},attachWebRendererInterop:function(t,n,r,o,a){if(I.has(t))throw new Error(`Interop methods are already registered for renderer ${t}`);I.set(t,n),r&&function(t,n,r){if(p)throw new Error("Dynamic root components have already been enabled.");p=t,v=n;for(const[t,o]of Object.entries(r)){const r=e.jsCallDispatcher.findJSFunction(t,0);for(const e of o)r(e,n[e])}}(C(t),o,a)}}};window.Blazor=_e;let Oe=!1;const Fe="function"==typeof TextDecoder?new TextDecoder("utf-8"):null,xe=Fe?Fe.decode.bind(Fe):function(e){let t=0;const n=e.length,r=[],o=[];for(;t<n;){const n=e[t++];if(0===n)break;if(0==(128&n))r.push(n);else if(192==(224&n)){const o=63&e[t++];r.push((31&n)<<6|o)}else if(224==(240&n)){const o=63&e[t++],a=63&e[t++];r.push((31&n)<<12|o<<6|a)}else if(240==(248&n)){let o=(7&n)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++];o>65535&&(o-=65536,r.push(o>>>10&1023|55296),o=56320|1023&o),r.push(o)}r.length>1024&&(o.push(String.fromCharCode.apply(null,r)),r.length=0)}return o.push(String.fromCharCode.apply(null,r)),o.join("")},Pe=Math.pow(2,32),Le=Math.pow(2,21)-1;function je(e,t){return e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24}function Me(e,t){return e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24>>>0)}function Be(e,t){const n=Me(e,t+4);if(n>Le)throw new Error(`Cannot read uint64 with high order part ${n}, because the result would exceed Number.MAX_SAFE_INTEGER.`);return n*Pe+Me(e,t)}class He{constructor(e){this.batchData=e;const t=new ze(e);this.arrayRangeReader=new Ke(e),this.arrayBuilderSegmentReader=new Ve(e),this.diffReader=new Ue(e),this.editReader=new Je(e,t),this.frameReader=new $e(e,t)}updatedComponents(){return je(this.batchData,this.batchData.length-20)}referenceFrames(){return je(this.batchData,this.batchData.length-16)}disposedComponentIds(){return je(this.batchData,this.batchData.length-12)}disposedEventHandlerIds(){return je(this.batchData,this.batchData.length-8)}updatedComponentsEntry(e,t){const n=e+4*t;return je(this.batchData,n)}referenceFramesEntry(e,t){return e+20*t}disposedComponentIdsEntry(e,t){const n=e+4*t;return je(this.batchData,n)}disposedEventHandlerIdsEntry(e,t){const n=e+8*t;return Be(this.batchData,n)}}class Ue{constructor(e){this.batchDataUint8=e}componentId(e){return je(this.batchDataUint8,e)}edits(e){return e+4}editsEntry(e,t){return e+16*t}}class Je{constructor(e,t){this.batchDataUint8=e,this.stringReader=t}editType(e){return je(this.batchDataUint8,e)}siblingIndex(e){return je(this.batchDataUint8,e+4)}newTreeIndex(e){return je(this.batchDataUint8,e+8)}moveToSiblingIndex(e){return je(this.batchDataUint8,e+8)}removedAttributeName(e){const t=je(this.batchDataUint8,e+12);return this.stringReader.readString(t)}}class $e{constructor(e,t){this.batchDataUint8=e,this.stringReader=t}frameType(e){return je(this.batchDataUint8,e)}subtreeLength(e){return je(this.batchDataUint8,e+4)}elementReferenceCaptureId(e){const t=je(this.batchDataUint8,e+4);return this.stringReader.readString(t)}componentId(e){return je(this.batchDataUint8,e+8)}elementName(e){const t=je(this.batchDataUint8,e+8);return this.stringReader.readString(t)}textContent(e){const t=je(this.batchDataUint8,e+4);return this.stringReader.readString(t)}markupContent(e){const t=je(this.batchDataUint8,e+4);return this.stringReader.readString(t)}attributeName(e){const t=je(this.batchDataUint8,e+4);return this.stringReader.readString(t)}attributeValue(e){const t=je(this.batchDataUint8,e+8);return this.stringReader.readString(t)}attributeEventHandlerId(e){return Be(this.batchDataUint8,e+12)}}class ze{constructor(e){this.batchDataUint8=e,this.stringTableStartIndex=je(e,e.length-4)}readString(e){if(-1===e)return null;{const n=je(this.batchDataUint8,this.stringTableStartIndex+4*e),r=function(e,t){let n=0,r=0;for(let o=0;o<4;o++){const a=e[t+o];if(n|=(127&a)<<r,a<128)break;r+=7}return n}(this.batchDataUint8,n),o=n+((t=r)<128?1:t<16384?2:t<2097152?3:4),a=new Uint8Array(this.batchDataUint8.buffer,this.batchDataUint8.byteOffset+o,r);return xe(a)}var t}}class Ke{constructor(e){this.batchDataUint8=e}count(e){return je(this.batchDataUint8,e)}values(e){return e+4}}class Ve{constructor(e){this.batchDataUint8=e}offset(e){return 0}count(e){return je(this.batchDataUint8,e)}values(e){return e+4}}const Xe="__bwv:";let Ye=!1;function We(e,t){et("OnRenderCompleted",e,t)}function Ge(e,t,n,r,o){et("BeginInvokeDotNet",e?e.toString():null,t,n,r||0,o)}function qe(e,t,n){et("EndInvokeJS",e,t,n)}function Ze(e,t){et("ReceiveByteArrayFromJS",e,function(e){const t=new Array(e.length);for(var n=0;n<e.length;n++)t[n]=String.fromCharCode(e[n]);return btoa(t.join(""))}(t))}function Qe(e,t){return et("OnLocationChanged",e,t),Promise.resolve()}function et(e,...t){const n=function(e,t){return Ye?null:`__bwv:${JSON.stringify([e,...t])}`}(e,t);n&&window.external.sendMessage(n)}function tt(t,n){const r=nt(n);e.jsCallDispatcher.receiveByteArray(t,r)}function nt(e){const t=atob(e),n=t.length,r=new Uint8Array(n);for(let e=0;e<n;e++)r[e]=t.charCodeAt(e);return r}let rt=!1;async function ot(){if(rt)throw new Error("Blazor has already started.");rt=!0,function(){const t={AttachToDocument:(e,t)=>{!function(e,t,n){const r="::after";let o=!1;if(e.endsWith(r))e=e.slice(0,-r.length),o=!0;else if(e.endsWith("::before"))throw new Error("The '::before' selector is not supported.");const a=function(e){const t=m.get(e);if(t)return m.delete(e),t}(e)||document.querySelector(e);if(!a)throw new Error(`Could not find any element matching selector '${e}'.`);!function(e,t,n,r){let o=ue[0];o||(o=ue[0]=new oe(0)),o.attachRootComponentToLogicalElement(n,t,r)}(0,L(a,!0),t,o)}(t,e)},RenderBatch:(e,t)=>{try{const n=nt(t);(function(e,t){const n=ue[0];if(!n)throw new Error("There is no browser renderer with ID 0.");const r=t.arrayRangeReader,o=t.updatedComponents(),a=r.values(o),s=r.count(o),i=t.referenceFrames(),c=r.values(i),l=t.diffReader;for(let e=0;e<s;e++){const r=t.updatedComponentsEntry(a,e),o=l.componentId(r),s=l.edits(r);n.updateComponent(t,o,s,c)}const u=t.disposedComponentIds(),d=r.values(u),f=r.count(u);for(let e=0;e<f;e++){const r=t.disposedComponentIdsEntry(d,e);n.disposeComponent(r)}const h=t.disposedEventHandlerIds(),m=r.values(h),p=r.count(h);for(let e=0;e<p;e++){const r=t.disposedEventHandlerIdsEntry(m,e);n.disposeEventHandler(r)}de&&(de=!1,window.scrollTo&&window.scrollTo(0,0))})(0,new He(n)),We(e,null)}catch(t){We(e,t.toString())}},NotifyUnhandledException:(e,t)=>{Ye=!0,console.error(`${e}\n${t}`),async function(e=""){let t=document.querySelector("#blazor-error-ui");t&&(t.style.display="block",e&&t.firstChild&&(t.firstChild.textContent=`\n\t${e}\t\n`)),Oe||(Oe=!0,document.querySelectorAll("#blazor-error-ui .reload").forEach((e=>{e.onclick=function(e){location.reload(),e.preventDefault()}})),document.querySelectorAll("#blazor-error-ui .dismiss").forEach((e=>{e.onclick=function(e){const t=document.querySelector("#blazor-error-ui");t&&(t.style.display="none"),e.preventDefault()}})))}()},BeginInvokeJS:e.jsCallDispatcher.beginInvokeJSFromDotNet,EndInvokeDotNet:e.jsCallDispatcher.endInvokeDotNetFromJS,SendByteArrayToJS:tt,Navigate:pe.navigateTo};window.external.receiveMessage((e=>{const n=function(e){if(Ye||!e||!e.startsWith(Xe))return null;const t=e.substring(Xe.length),[n,...r]=JSON.parse(t);return{messageType:n,args:r}}(e);if(n){if(!t.hasOwnProperty(n.messageType))throw new Error(`Unsupported IPC message type '${n.messageType}'`);t[n.messageType].apply(null,n.args)}}))}(),e.attachDispatcher({beginInvokeDotNetFromJS:Ge,endInvokeJSFromDotNet:qe,sendByteArray:Ze}),pe.enableNavigationInterception(),pe.listenForNavigationEvents(Qe),et("AttachPage",pe.getBaseURI(),pe.getLocationHref())}_e.start=ot,document&&document.currentScript&&"false"!==document.currentScript.getAttribute("autostart")&&ot()})();