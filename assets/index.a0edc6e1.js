(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const style="";function makeMap(t,e){const n=Object.create(null),r=t.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}function normalizeStyle(t){if(isArray$1(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=isString(r)?parseStringStyle(r):normalizeStyle(r);if(s)for(const i in s)e[i]=s[i]}return e}else{if(isString(t))return t;if(isObject$2(t))return t}}const listDelimiterRE=/;(?![^(]*\))/g,propertyDelimiterRE=/:([^]+)/,styleCommentRE=/\/\*.*?\*\//gs;function parseStringStyle(t){const e={};return t.replace(styleCommentRE,"").split(listDelimiterRE).forEach(n=>{if(n){const r=n.split(propertyDelimiterRE);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function normalizeClass(t){let e="";if(isString(t))e=t;else if(isArray$1(t))for(let n=0;n<t.length;n++){const r=normalizeClass(t[n]);r&&(e+=r+" ")}else if(isObject$2(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const specialBooleanAttrs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",isSpecialBooleanAttr=makeMap(specialBooleanAttrs);function includeBooleanAttr(t){return!!t||t===""}const toDisplayString=t=>isString(t)?t:t==null?"":isArray$1(t)||isObject$2(t)&&(t.toString===objectToString||!isFunction(t.toString))?JSON.stringify(t,replacer,2):String(t),replacer=(t,e)=>e&&e.__v_isRef?replacer(t,e.value):isMap(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s])=>(n[`${r} =>`]=s,n),{})}:isSet(e)?{[`Set(${e.size})`]:[...e.values()]}:isObject$2(e)&&!isArray$1(e)&&!isPlainObject(e)?String(e):e,EMPTY_OBJ={},EMPTY_ARR=[],NOOP=()=>{},NO=()=>!1,onRE=/^on[^a-z]/,isOn=t=>onRE.test(t),isModelListener=t=>t.startsWith("onUpdate:"),extend=Object.assign,remove=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},hasOwnProperty=Object.prototype.hasOwnProperty,hasOwn=(t,e)=>hasOwnProperty.call(t,e),isArray$1=Array.isArray,isMap=t=>toTypeString(t)==="[object Map]",isSet=t=>toTypeString(t)==="[object Set]",isFunction=t=>typeof t=="function",isString=t=>typeof t=="string",isSymbol=t=>typeof t=="symbol",isObject$2=t=>t!==null&&typeof t=="object",isPromise$1=t=>isObject$2(t)&&isFunction(t.then)&&isFunction(t.catch),objectToString=Object.prototype.toString,toTypeString=t=>objectToString.call(t),toRawType=t=>toTypeString(t).slice(8,-1),isPlainObject=t=>toTypeString(t)==="[object Object]",isIntegerKey=t=>isString(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,isReservedProp=makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),cacheStringFunction=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},camelizeRE=/-(\w)/g,camelize=cacheStringFunction(t=>t.replace(camelizeRE,(e,n)=>n?n.toUpperCase():"")),hyphenateRE=/\B([A-Z])/g,hyphenate=cacheStringFunction(t=>t.replace(hyphenateRE,"-$1").toLowerCase()),capitalize=cacheStringFunction(t=>t.charAt(0).toUpperCase()+t.slice(1)),toHandlerKey=cacheStringFunction(t=>t?`on${capitalize(t)}`:""),hasChanged=(t,e)=>!Object.is(t,e),invokeArrayFns=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},def=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},toNumber=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let _globalThis;const getGlobalThis=()=>_globalThis||(_globalThis=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let activeEffectScope;class EffectScope{constructor(e=!1){this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=activeEffectScope,!e&&activeEffectScope&&(this.index=(activeEffectScope.scopes||(activeEffectScope.scopes=[])).push(this)-1)}run(e){if(this.active){const n=activeEffectScope;try{return activeEffectScope=this,e()}finally{activeEffectScope=n}}}on(){activeEffectScope=this}off(){activeEffectScope=this.parent}stop(e){if(this.active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this.active=!1}}}function recordEffectScope(t,e=activeEffectScope){e&&e.active&&e.effects.push(t)}const createDep=t=>{const e=new Set(t);return e.w=0,e.n=0,e},wasTracked=t=>(t.w&trackOpBit)>0,newTracked=t=>(t.n&trackOpBit)>0,initDepMarkers=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=trackOpBit},finalizeDepMarkers=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const s=e[r];wasTracked(s)&&!newTracked(s)?s.delete(t):e[n++]=s,s.w&=~trackOpBit,s.n&=~trackOpBit}e.length=n}},targetMap=new WeakMap;let effectTrackDepth=0,trackOpBit=1;const maxMarkerBits=30;let activeEffect;const ITERATE_KEY=Symbol(""),MAP_KEY_ITERATE_KEY=Symbol("");class ReactiveEffect{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,recordEffectScope(this,r)}run(){if(!this.active)return this.fn();let e=activeEffect,n=shouldTrack;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=activeEffect,activeEffect=this,shouldTrack=!0,trackOpBit=1<<++effectTrackDepth,effectTrackDepth<=maxMarkerBits?initDepMarkers(this):cleanupEffect(this),this.fn()}finally{effectTrackDepth<=maxMarkerBits&&finalizeDepMarkers(this),trackOpBit=1<<--effectTrackDepth,activeEffect=this.parent,shouldTrack=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){activeEffect===this?this.deferStop=!0:this.active&&(cleanupEffect(this),this.onStop&&this.onStop(),this.active=!1)}}function cleanupEffect(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let shouldTrack=!0;const trackStack=[];function pauseTracking(){trackStack.push(shouldTrack),shouldTrack=!1}function resetTracking(){const t=trackStack.pop();shouldTrack=t===void 0?!0:t}function track(t,e,n){if(shouldTrack&&activeEffect){let r=targetMap.get(t);r||targetMap.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=createDep()),trackEffects(s)}}function trackEffects(t,e){let n=!1;effectTrackDepth<=maxMarkerBits?newTracked(t)||(t.n|=trackOpBit,n=!wasTracked(t)):n=!t.has(activeEffect),n&&(t.add(activeEffect),activeEffect.deps.push(t))}function trigger(t,e,n,r,s,i){const o=targetMap.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&isArray$1(t)){const l=toNumber(r);o.forEach((c,u)=>{(u==="length"||u>=l)&&a.push(c)})}else switch(n!==void 0&&a.push(o.get(n)),e){case"add":isArray$1(t)?isIntegerKey(n)&&a.push(o.get("length")):(a.push(o.get(ITERATE_KEY)),isMap(t)&&a.push(o.get(MAP_KEY_ITERATE_KEY)));break;case"delete":isArray$1(t)||(a.push(o.get(ITERATE_KEY)),isMap(t)&&a.push(o.get(MAP_KEY_ITERATE_KEY)));break;case"set":isMap(t)&&a.push(o.get(ITERATE_KEY));break}if(a.length===1)a[0]&&triggerEffects(a[0]);else{const l=[];for(const c of a)c&&l.push(...c);triggerEffects(createDep(l))}}function triggerEffects(t,e){const n=isArray$1(t)?t:[...t];for(const r of n)r.computed&&triggerEffect(r);for(const r of n)r.computed||triggerEffect(r)}function triggerEffect(t,e){(t!==activeEffect||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const isNonTrackableKeys=makeMap("__proto__,__v_isRef,__isVue"),builtInSymbols=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(isSymbol)),get=createGetter(),shallowGet=createGetter(!1,!0),readonlyGet=createGetter(!0),arrayInstrumentations=createArrayInstrumentations();function createArrayInstrumentations(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=toRaw(this);for(let i=0,o=this.length;i<o;i++)track(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(toRaw)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){pauseTracking();const r=toRaw(this)[e].apply(this,n);return resetTracking(),r}}),t}function createGetter(t=!1,e=!1){return function(r,s,i){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&i===(t?e?shallowReadonlyMap:readonlyMap:e?shallowReactiveMap:reactiveMap).get(r))return r;const o=isArray$1(r);if(!t&&o&&hasOwn(arrayInstrumentations,s))return Reflect.get(arrayInstrumentations,s,i);const a=Reflect.get(r,s,i);return(isSymbol(s)?builtInSymbols.has(s):isNonTrackableKeys(s))||(t||track(r,"get",s),e)?a:isRef(a)?o&&isIntegerKey(s)?a:a.value:isObject$2(a)?t?readonly(a):reactive(a):a}}const set=createSetter(),shallowSet=createSetter(!0);function createSetter(t=!1){return function(n,r,s,i){let o=n[r];if(isReadonly(o)&&isRef(o)&&!isRef(s))return!1;if(!t&&(!isShallow(s)&&!isReadonly(s)&&(o=toRaw(o),s=toRaw(s)),!isArray$1(n)&&isRef(o)&&!isRef(s)))return o.value=s,!0;const a=isArray$1(n)&&isIntegerKey(r)?Number(r)<n.length:hasOwn(n,r),l=Reflect.set(n,r,s,i);return n===toRaw(i)&&(a?hasChanged(s,o)&&trigger(n,"set",r,s):trigger(n,"add",r,s)),l}}function deleteProperty(t,e){const n=hasOwn(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&trigger(t,"delete",e,void 0),r}function has(t,e){const n=Reflect.has(t,e);return(!isSymbol(e)||!builtInSymbols.has(e))&&track(t,"has",e),n}function ownKeys(t){return track(t,"iterate",isArray$1(t)?"length":ITERATE_KEY),Reflect.ownKeys(t)}const mutableHandlers={get,set,deleteProperty,has,ownKeys},readonlyHandlers={get:readonlyGet,set(t,e){return!0},deleteProperty(t,e){return!0}},shallowReactiveHandlers=extend({},mutableHandlers,{get:shallowGet,set:shallowSet}),toShallow=t=>t,getProto=t=>Reflect.getPrototypeOf(t);function get$1(t,e,n=!1,r=!1){t=t.__v_raw;const s=toRaw(t),i=toRaw(e);n||(e!==i&&track(s,"get",e),track(s,"get",i));const{has:o}=getProto(s),a=r?toShallow:n?toReadonly:toReactive;if(o.call(s,e))return a(t.get(e));if(o.call(s,i))return a(t.get(i));t!==s&&t.get(e)}function has$1(t,e=!1){const n=this.__v_raw,r=toRaw(n),s=toRaw(t);return e||(t!==s&&track(r,"has",t),track(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function size(t,e=!1){return t=t.__v_raw,!e&&track(toRaw(t),"iterate",ITERATE_KEY),Reflect.get(t,"size",t)}function add(t){t=toRaw(t);const e=toRaw(this);return getProto(e).has.call(e,t)||(e.add(t),trigger(e,"add",t,t)),this}function set$1(t,e){e=toRaw(e);const n=toRaw(this),{has:r,get:s}=getProto(n);let i=r.call(n,t);i||(t=toRaw(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?hasChanged(e,o)&&trigger(n,"set",t,e):trigger(n,"add",t,e),this}function deleteEntry(t){const e=toRaw(this),{has:n,get:r}=getProto(e);let s=n.call(e,t);s||(t=toRaw(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&trigger(e,"delete",t,void 0),i}function clear(){const t=toRaw(this),e=t.size!==0,n=t.clear();return e&&trigger(t,"clear",void 0,void 0),n}function createForEach(t,e){return function(r,s){const i=this,o=i.__v_raw,a=toRaw(o),l=e?toShallow:t?toReadonly:toReactive;return!t&&track(a,"iterate",ITERATE_KEY),o.forEach((c,u)=>r.call(s,l(c),l(u),i))}}function createIterableMethod(t,e,n){return function(...r){const s=this.__v_raw,i=toRaw(s),o=isMap(i),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=s[t](...r),u=n?toShallow:e?toReadonly:toReactive;return!e&&track(i,"iterate",l?MAP_KEY_ITERATE_KEY:ITERATE_KEY),{next(){const{value:d,done:f}=c.next();return f?{value:d,done:f}:{value:a?[u(d[0]),u(d[1])]:u(d),done:f}},[Symbol.iterator](){return this}}}}function createReadonlyMethod(t){return function(...e){return t==="delete"?!1:this}}function createInstrumentations(){const t={get(i){return get$1(this,i)},get size(){return size(this)},has:has$1,add,set:set$1,delete:deleteEntry,clear,forEach:createForEach(!1,!1)},e={get(i){return get$1(this,i,!1,!0)},get size(){return size(this)},has:has$1,add,set:set$1,delete:deleteEntry,clear,forEach:createForEach(!1,!0)},n={get(i){return get$1(this,i,!0)},get size(){return size(this,!0)},has(i){return has$1.call(this,i,!0)},add:createReadonlyMethod("add"),set:createReadonlyMethod("set"),delete:createReadonlyMethod("delete"),clear:createReadonlyMethod("clear"),forEach:createForEach(!0,!1)},r={get(i){return get$1(this,i,!0,!0)},get size(){return size(this,!0)},has(i){return has$1.call(this,i,!0)},add:createReadonlyMethod("add"),set:createReadonlyMethod("set"),delete:createReadonlyMethod("delete"),clear:createReadonlyMethod("clear"),forEach:createForEach(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=createIterableMethod(i,!1,!1),n[i]=createIterableMethod(i,!0,!1),e[i]=createIterableMethod(i,!1,!0),r[i]=createIterableMethod(i,!0,!0)}),[t,n,e,r]}const[mutableInstrumentations,readonlyInstrumentations,shallowInstrumentations,shallowReadonlyInstrumentations]=createInstrumentations();function createInstrumentationGetter(t,e){const n=e?t?shallowReadonlyInstrumentations:shallowInstrumentations:t?readonlyInstrumentations:mutableInstrumentations;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(hasOwn(n,s)&&s in r?n:r,s,i)}const mutableCollectionHandlers={get:createInstrumentationGetter(!1,!1)},shallowCollectionHandlers={get:createInstrumentationGetter(!1,!0)},readonlyCollectionHandlers={get:createInstrumentationGetter(!0,!1)},reactiveMap=new WeakMap,shallowReactiveMap=new WeakMap,readonlyMap=new WeakMap,shallowReadonlyMap=new WeakMap;function targetTypeMap(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function getTargetType(t){return t.__v_skip||!Object.isExtensible(t)?0:targetTypeMap(toRawType(t))}function reactive(t){return isReadonly(t)?t:createReactiveObject(t,!1,mutableHandlers,mutableCollectionHandlers,reactiveMap)}function shallowReactive(t){return createReactiveObject(t,!1,shallowReactiveHandlers,shallowCollectionHandlers,shallowReactiveMap)}function readonly(t){return createReactiveObject(t,!0,readonlyHandlers,readonlyCollectionHandlers,readonlyMap)}function createReactiveObject(t,e,n,r,s){if(!isObject$2(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=getTargetType(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return s.set(t,a),a}function isReactive(t){return isReadonly(t)?isReactive(t.__v_raw):!!(t&&t.__v_isReactive)}function isReadonly(t){return!!(t&&t.__v_isReadonly)}function isShallow(t){return!!(t&&t.__v_isShallow)}function isProxy(t){return isReactive(t)||isReadonly(t)}function toRaw(t){const e=t&&t.__v_raw;return e?toRaw(e):t}function markRaw(t){return def(t,"__v_skip",!0),t}const toReactive=t=>isObject$2(t)?reactive(t):t,toReadonly=t=>isObject$2(t)?readonly(t):t;function trackRefValue(t){shouldTrack&&activeEffect&&(t=toRaw(t),trackEffects(t.dep||(t.dep=createDep())))}function triggerRefValue(t,e){t=toRaw(t),t.dep&&triggerEffects(t.dep)}function isRef(t){return!!(t&&t.__v_isRef===!0)}function ref(t){return createRef(t,!1)}function shallowRef(t){return createRef(t,!0)}function createRef(t,e){return isRef(t)?t:new RefImpl(t,e)}class RefImpl{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:toRaw(e),this._value=n?e:toReactive(e)}get value(){return trackRefValue(this),this._value}set value(e){const n=this.__v_isShallow||isShallow(e)||isReadonly(e);e=n?e:toRaw(e),hasChanged(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:toReactive(e),triggerRefValue(this))}}function unref(t){return isRef(t)?t.value:t}const shallowUnwrapHandlers={get:(t,e,n)=>unref(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return isRef(s)&&!isRef(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function proxyRefs(t){return isReactive(t)?t:new Proxy(t,shallowUnwrapHandlers)}var _a;class ComputedRefImpl{constructor(e,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this[_a]=!1,this._dirty=!0,this.effect=new ReactiveEffect(e,()=>{this._dirty||(this._dirty=!0,triggerRefValue(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=toRaw(this);return trackRefValue(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}_a="__v_isReadonly";function computed$1(t,e,n=!1){let r,s;const i=isFunction(t);return i?(r=t,s=NOOP):(r=t.get,s=t.set),new ComputedRefImpl(r,s,i||!s,n)}function warn$1(t,...e){}function callWithErrorHandling(t,e,n,r){let s;try{s=r?t(...r):t()}catch(i){handleError(i,e,n)}return s}function callWithAsyncErrorHandling(t,e,n,r){if(isFunction(t)){const i=callWithErrorHandling(t,e,n,r);return i&&isPromise$1(i)&&i.catch(o=>{handleError(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(callWithAsyncErrorHandling(t[i],e,n,r));return s}function handleError(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,a=n;for(;i;){const c=i.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](t,o,a)===!1)return}i=i.parent}const l=e.appContext.config.errorHandler;if(l){callWithErrorHandling(l,null,10,[t,o,a]);return}}logError(t,n,s,r)}function logError(t,e,n,r=!0){console.error(t)}let isFlushing=!1,isFlushPending=!1;const queue=[];let flushIndex=0;const pendingPostFlushCbs=[];let activePostFlushCbs=null,postFlushIndex=0;const resolvedPromise=Promise.resolve();let currentFlushPromise=null;function nextTick(t){const e=currentFlushPromise||resolvedPromise;return t?e.then(this?t.bind(this):t):e}function findInsertionIndex(t){let e=flushIndex+1,n=queue.length;for(;e<n;){const r=e+n>>>1;getId(queue[r])<t?e=r+1:n=r}return e}function queueJob(t){(!queue.length||!queue.includes(t,isFlushing&&t.allowRecurse?flushIndex+1:flushIndex))&&(t.id==null?queue.push(t):queue.splice(findInsertionIndex(t.id),0,t),queueFlush())}function queueFlush(){!isFlushing&&!isFlushPending&&(isFlushPending=!0,currentFlushPromise=resolvedPromise.then(flushJobs))}function invalidateJob(t){const e=queue.indexOf(t);e>flushIndex&&queue.splice(e,1)}function queuePostFlushCb(t){isArray$1(t)?pendingPostFlushCbs.push(...t):(!activePostFlushCbs||!activePostFlushCbs.includes(t,t.allowRecurse?postFlushIndex+1:postFlushIndex))&&pendingPostFlushCbs.push(t),queueFlush()}function flushPreFlushCbs(t,e=isFlushing?flushIndex+1:0){for(;e<queue.length;e++){const n=queue[e];n&&n.pre&&(queue.splice(e,1),e--,n())}}function flushPostFlushCbs(t){if(pendingPostFlushCbs.length){const e=[...new Set(pendingPostFlushCbs)];if(pendingPostFlushCbs.length=0,activePostFlushCbs){activePostFlushCbs.push(...e);return}for(activePostFlushCbs=e,activePostFlushCbs.sort((n,r)=>getId(n)-getId(r)),postFlushIndex=0;postFlushIndex<activePostFlushCbs.length;postFlushIndex++)activePostFlushCbs[postFlushIndex]();activePostFlushCbs=null,postFlushIndex=0}}const getId=t=>t.id==null?1/0:t.id,comparator=(t,e)=>{const n=getId(t)-getId(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function flushJobs(t){isFlushPending=!1,isFlushing=!0,queue.sort(comparator);const e=NOOP;try{for(flushIndex=0;flushIndex<queue.length;flushIndex++){const n=queue[flushIndex];n&&n.active!==!1&&callWithErrorHandling(n,null,14)}}finally{flushIndex=0,queue.length=0,flushPostFlushCbs(),isFlushing=!1,currentFlushPromise=null,(queue.length||pendingPostFlushCbs.length)&&flushJobs()}}function emit$1(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||EMPTY_OBJ;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:d,trim:f}=r[u]||EMPTY_OBJ;f&&(s=n.map(g=>isString(g)?g.trim():g)),d&&(s=n.map(toNumber))}let a,l=r[a=toHandlerKey(e)]||r[a=toHandlerKey(camelize(e))];!l&&i&&(l=r[a=toHandlerKey(hyphenate(e))]),l&&callWithAsyncErrorHandling(l,t,6,s);const c=r[a+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,callWithAsyncErrorHandling(c,t,6,s)}}function normalizeEmitsOptions(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!isFunction(t)){const l=c=>{const u=normalizeEmitsOptions(c,e,!0);u&&(a=!0,extend(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!a?(isObject$2(t)&&r.set(t,null),null):(isArray$1(i)?i.forEach(l=>o[l]=null):extend(o,i),isObject$2(t)&&r.set(t,o),o)}function isEmitListener(t,e){return!t||!isOn(e)?!1:(e=e.slice(2).replace(/Once$/,""),hasOwn(t,e[0].toLowerCase()+e.slice(1))||hasOwn(t,hyphenate(e))||hasOwn(t,e))}let currentRenderingInstance=null,currentScopeId=null;function setCurrentRenderingInstance(t){const e=currentRenderingInstance;return currentRenderingInstance=t,currentScopeId=t&&t.type.__scopeId||null,e}function pushScopeId(t){currentScopeId=t}function popScopeId(){currentScopeId=null}function withCtx(t,e=currentRenderingInstance,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&setBlockTracking(-1);const i=setCurrentRenderingInstance(e);let o;try{o=t(...s)}finally{setCurrentRenderingInstance(i),r._d&&setBlockTracking(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function markAttrsAccessed(){}function renderComponentRoot(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:d,data:f,setupState:g,ctx:E,inheritAttrs:S}=t;let M,N;const x=setCurrentRenderingInstance(t);try{if(n.shapeFlag&4){const H=s||r;M=normalizeVNode(u.call(H,H,d,i,g,f,E)),N=l}else{const H=e;M=normalizeVNode(H.length>1?H(i,{attrs:l,slots:a,emit:c}):H(i,null)),N=e.props?l:getFunctionalFallthrough(l)}}catch(H){blockStack.length=0,handleError(H,t,1),M=createVNode(Comment)}let k=M;if(N&&S!==!1){const H=Object.keys(N),{shapeFlag:q}=k;H.length&&q&7&&(o&&H.some(isModelListener)&&(N=filterModelListeners(N,o)),k=cloneVNode(k,N))}return n.dirs&&(k=cloneVNode(k),k.dirs=k.dirs?k.dirs.concat(n.dirs):n.dirs),n.transition&&(k.transition=n.transition),M=k,setCurrentRenderingInstance(x),M}const getFunctionalFallthrough=t=>{let e;for(const n in t)(n==="class"||n==="style"||isOn(n))&&((e||(e={}))[n]=t[n]);return e},filterModelListeners=(t,e)=>{const n={};for(const r in t)(!isModelListener(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function shouldUpdateComponent(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:l}=e,c=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?hasPropsChanged(r,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let d=0;d<u.length;d++){const f=u[d];if(o[f]!==r[f]&&!isEmitListener(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?hasPropsChanged(r,o,c):!0:!!o;return!1}function hasPropsChanged(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!isEmitListener(n,i))return!0}return!1}function updateHOCHostEl({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const isSuspense=t=>t.__isSuspense;function queueEffectWithSuspense(t,e){e&&e.pendingBranch?isArray$1(t)?e.effects.push(...t):e.effects.push(t):queuePostFlushCb(t)}function provide(t,e){if(currentInstance){let n=currentInstance.provides;const r=currentInstance.parent&&currentInstance.parent.provides;r===n&&(n=currentInstance.provides=Object.create(r)),n[t]=e}}function inject(t,e,n=!1){const r=currentInstance||currentRenderingInstance;if(r){const s=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&isFunction(e)?e.call(r.proxy):e}}const INITIAL_WATCHER_VALUE={};function watch(t,e,n){return doWatch(t,e,n)}function doWatch(t,e,{immediate:n,deep:r,flush:s,onTrack:i,onTrigger:o}=EMPTY_OBJ){const a=currentInstance;let l,c=!1,u=!1;if(isRef(t)?(l=()=>t.value,c=isShallow(t)):isReactive(t)?(l=()=>t,r=!0):isArray$1(t)?(u=!0,c=t.some(k=>isReactive(k)||isShallow(k)),l=()=>t.map(k=>{if(isRef(k))return k.value;if(isReactive(k))return traverse(k);if(isFunction(k))return callWithErrorHandling(k,a,2)})):isFunction(t)?e?l=()=>callWithErrorHandling(t,a,2):l=()=>{if(!(a&&a.isUnmounted))return d&&d(),callWithAsyncErrorHandling(t,a,3,[f])}:l=NOOP,e&&r){const k=l;l=()=>traverse(k())}let d,f=k=>{d=N.onStop=()=>{callWithErrorHandling(k,a,4)}},g;if(isInSSRComponentSetup)if(f=NOOP,e?n&&callWithAsyncErrorHandling(e,a,3,[l(),u?[]:void 0,f]):l(),s==="sync"){const k=useSSRContext();g=k.__watcherHandles||(k.__watcherHandles=[])}else return NOOP;let E=u?new Array(t.length).fill(INITIAL_WATCHER_VALUE):INITIAL_WATCHER_VALUE;const S=()=>{if(!!N.active)if(e){const k=N.run();(r||c||(u?k.some((H,q)=>hasChanged(H,E[q])):hasChanged(k,E)))&&(d&&d(),callWithAsyncErrorHandling(e,a,3,[k,E===INITIAL_WATCHER_VALUE?void 0:u&&E[0]===INITIAL_WATCHER_VALUE?[]:E,f]),E=k)}else N.run()};S.allowRecurse=!!e;let M;s==="sync"?M=S:s==="post"?M=()=>queuePostRenderEffect(S,a&&a.suspense):(S.pre=!0,a&&(S.id=a.uid),M=()=>queueJob(S));const N=new ReactiveEffect(l,M);e?n?S():E=N.run():s==="post"?queuePostRenderEffect(N.run.bind(N),a&&a.suspense):N.run();const x=()=>{N.stop(),a&&a.scope&&remove(a.scope.effects,N)};return g&&g.push(x),x}function instanceWatch(t,e,n){const r=this.proxy,s=isString(t)?t.includes(".")?createPathGetter(r,t):()=>r[t]:t.bind(r,r);let i;isFunction(e)?i=e:(i=e.handler,n=e);const o=currentInstance;setCurrentInstance(this);const a=doWatch(s,i.bind(r),n);return o?setCurrentInstance(o):unsetCurrentInstance(),a}function createPathGetter(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function traverse(t,e){if(!isObject$2(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),isRef(t))traverse(t.value,e);else if(isArray$1(t))for(let n=0;n<t.length;n++)traverse(t[n],e);else if(isSet(t)||isMap(t))t.forEach(n=>{traverse(n,e)});else if(isPlainObject(t))for(const n in t)traverse(t[n],e);return t}function useTransitionState(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return onMounted(()=>{t.isMounted=!0}),onBeforeUnmount(()=>{t.isUnmounting=!0}),t}const TransitionHookValidator=[Function,Array],BaseTransitionImpl={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:TransitionHookValidator,onEnter:TransitionHookValidator,onAfterEnter:TransitionHookValidator,onEnterCancelled:TransitionHookValidator,onBeforeLeave:TransitionHookValidator,onLeave:TransitionHookValidator,onAfterLeave:TransitionHookValidator,onLeaveCancelled:TransitionHookValidator,onBeforeAppear:TransitionHookValidator,onAppear:TransitionHookValidator,onAfterAppear:TransitionHookValidator,onAppearCancelled:TransitionHookValidator},setup(t,{slots:e}){const n=getCurrentInstance(),r=useTransitionState();let s;return()=>{const i=e.default&&getTransitionRawChildren(e.default(),!0);if(!i||!i.length)return;let o=i[0];if(i.length>1){for(const S of i)if(S.type!==Comment){o=S;break}}const a=toRaw(t),{mode:l}=a;if(r.isLeaving)return emptyPlaceholder(o);const c=getKeepAliveChild(o);if(!c)return emptyPlaceholder(o);const u=resolveTransitionHooks(c,a,r,n);setTransitionHooks(c,u);const d=n.subTree,f=d&&getKeepAliveChild(d);let g=!1;const{getTransitionKey:E}=c.type;if(E){const S=E();s===void 0?s=S:S!==s&&(s=S,g=!0)}if(f&&f.type!==Comment&&(!isSameVNodeType(c,f)||g)){const S=resolveTransitionHooks(f,a,r,n);if(setTransitionHooks(f,S),l==="out-in")return r.isLeaving=!0,S.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&n.update()},emptyPlaceholder(o);l==="in-out"&&c.type!==Comment&&(S.delayLeave=(M,N,x)=>{const k=getLeavingNodesForType(r,f);k[String(f.key)]=f,M._leaveCb=()=>{N(),M._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=x})}return o}}},BaseTransition=BaseTransitionImpl;function getLeavingNodesForType(t,e){const{leavingVNodes:n}=t;let r=n.get(e.type);return r||(r=Object.create(null),n.set(e.type,r)),r}function resolveTransitionHooks(t,e,n,r){const{appear:s,mode:i,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:d,onLeave:f,onAfterLeave:g,onLeaveCancelled:E,onBeforeAppear:S,onAppear:M,onAfterAppear:N,onAppearCancelled:x}=e,k=String(t.key),H=getLeavingNodesForType(n,t),q=(V,z)=>{V&&callWithAsyncErrorHandling(V,r,9,z)},ne=(V,z)=>{const K=z[1];q(V,z),isArray$1(V)?V.every(ie=>ie.length<=1)&&K():V.length<=1&&K()},se={mode:i,persisted:o,beforeEnter(V){let z=a;if(!n.isMounted)if(s)z=S||a;else return;V._leaveCb&&V._leaveCb(!0);const K=H[k];K&&isSameVNodeType(t,K)&&K.el._leaveCb&&K.el._leaveCb(),q(z,[V])},enter(V){let z=l,K=c,ie=u;if(!n.isMounted)if(s)z=M||l,K=N||c,ie=x||u;else return;let L=!1;const Z=V._enterCb=oe=>{L||(L=!0,oe?q(ie,[V]):q(K,[V]),se.delayedLeave&&se.delayedLeave(),V._enterCb=void 0)};z?ne(z,[V,Z]):Z()},leave(V,z){const K=String(t.key);if(V._enterCb&&V._enterCb(!0),n.isUnmounting)return z();q(d,[V]);let ie=!1;const L=V._leaveCb=Z=>{ie||(ie=!0,z(),Z?q(E,[V]):q(g,[V]),V._leaveCb=void 0,H[K]===t&&delete H[K])};H[K]=t,f?ne(f,[V,L]):L()},clone(V){return resolveTransitionHooks(V,e,n,r)}};return se}function emptyPlaceholder(t){if(isKeepAlive(t))return t=cloneVNode(t),t.children=null,t}function getKeepAliveChild(t){return isKeepAlive(t)?t.children?t.children[0]:void 0:t}function setTransitionHooks(t,e){t.shapeFlag&6&&t.component?setTransitionHooks(t.component.subTree,e):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function getTransitionRawChildren(t,e=!1,n){let r=[],s=0;for(let i=0;i<t.length;i++){let o=t[i];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===Fragment?(o.patchFlag&128&&s++,r=r.concat(getTransitionRawChildren(o.children,e,a))):(e||o.type!==Comment)&&r.push(a!=null?cloneVNode(o,{key:a}):o)}if(s>1)for(let i=0;i<r.length;i++)r[i].patchFlag=-2;return r}function defineComponent(t){return isFunction(t)?{setup:t,name:t.name}:t}const isAsyncWrapper=t=>!!t.type.__asyncLoader,isKeepAlive=t=>t.type.__isKeepAlive;function onActivated(t,e){registerKeepAliveHook(t,"a",e)}function onDeactivated(t,e){registerKeepAliveHook(t,"da",e)}function registerKeepAliveHook(t,e,n=currentInstance){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(injectHook(e,r,n),n){let s=n.parent;for(;s&&s.parent;)isKeepAlive(s.parent.vnode)&&injectToKeepAliveRoot(r,e,n,s),s=s.parent}}function injectToKeepAliveRoot(t,e,n,r){const s=injectHook(e,t,r,!0);onUnmounted(()=>{remove(r[e],s)},n)}function injectHook(t,e,n=currentInstance,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;pauseTracking(),setCurrentInstance(n);const a=callWithAsyncErrorHandling(e,n,t,o);return unsetCurrentInstance(),resetTracking(),a});return r?s.unshift(i):s.push(i),i}}const createHook=t=>(e,n=currentInstance)=>(!isInSSRComponentSetup||t==="sp")&&injectHook(t,(...r)=>e(...r),n),onBeforeMount=createHook("bm"),onMounted=createHook("m"),onBeforeUpdate=createHook("bu"),onUpdated=createHook("u"),onBeforeUnmount=createHook("bum"),onUnmounted=createHook("um"),onServerPrefetch=createHook("sp"),onRenderTriggered=createHook("rtg"),onRenderTracked=createHook("rtc");function onErrorCaptured(t,e=currentInstance){injectHook("ec",t,e)}function withDirectives(t,e){const n=currentRenderingInstance;if(n===null)return t;const r=getExposeProxy(n)||n.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,a,l,c=EMPTY_OBJ]=e[i];o&&(isFunction(o)&&(o={mounted:o,updated:o}),o.deep&&traverse(a),s.push({dir:o,instance:r,value:a,oldValue:void 0,arg:l,modifiers:c}))}return t}function invokeDirectiveHook(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let l=a.dir[r];l&&(pauseTracking(),callWithAsyncErrorHandling(l,n,8,[t.el,a,t,e]),resetTracking())}}const COMPONENTS="components";function resolveComponent(t,e){return resolveAsset(COMPONENTS,t,!0,e)||t}const NULL_DYNAMIC_COMPONENT=Symbol();function resolveAsset(t,e,n=!0,r=!1){const s=currentRenderingInstance||currentInstance;if(s){const i=s.type;if(t===COMPONENTS){const a=getComponentName(i,!1);if(a&&(a===e||a===camelize(e)||a===capitalize(camelize(e))))return i}const o=resolve(s[t]||i[t],e)||resolve(s.appContext[t],e);return!o&&r?i:o}}function resolve(t,e){return t&&(t[e]||t[camelize(e)]||t[capitalize(camelize(e))])}function renderList(t,e,n,r){let s;const i=n&&n[r];if(isArray$1(t)||isString(t)){s=new Array(t.length);for(let o=0,a=t.length;o<a;o++)s[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){s=new Array(t);for(let o=0;o<t;o++)s[o]=e(o+1,o,void 0,i&&i[o])}else if(isObject$2(t))if(t[Symbol.iterator])s=Array.from(t,(o,a)=>e(o,a,void 0,i&&i[a]));else{const o=Object.keys(t);s=new Array(o.length);for(let a=0,l=o.length;a<l;a++){const c=o[a];s[a]=e(t[c],c,a,i&&i[a])}}else s=[];return n&&(n[r]=s),s}const getPublicInstance=t=>t?isStatefulComponent(t)?getExposeProxy(t)||t.proxy:getPublicInstance(t.parent):null,publicPropertiesMap=extend(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>getPublicInstance(t.parent),$root:t=>getPublicInstance(t.root),$emit:t=>t.emit,$options:t=>resolveMergedOptions(t),$forceUpdate:t=>t.f||(t.f=()=>queueJob(t.update)),$nextTick:t=>t.n||(t.n=nextTick.bind(t.proxy)),$watch:t=>instanceWatch.bind(t)}),hasSetupBinding=(t,e)=>t!==EMPTY_OBJ&&!t.__isScriptSetup&&hasOwn(t,e),PublicInstanceProxyHandlers={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:l}=t;let c;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(hasSetupBinding(r,e))return o[e]=1,r[e];if(s!==EMPTY_OBJ&&hasOwn(s,e))return o[e]=2,s[e];if((c=t.propsOptions[0])&&hasOwn(c,e))return o[e]=3,i[e];if(n!==EMPTY_OBJ&&hasOwn(n,e))return o[e]=4,n[e];shouldCacheAccess&&(o[e]=0)}}const u=publicPropertiesMap[e];let d,f;if(u)return e==="$attrs"&&track(t,"get",e),u(t);if((d=a.__cssModules)&&(d=d[e]))return d;if(n!==EMPTY_OBJ&&hasOwn(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,hasOwn(f,e))return f[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return hasSetupBinding(s,e)?(s[e]=n,!0):r!==EMPTY_OBJ&&hasOwn(r,e)?(r[e]=n,!0):hasOwn(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let a;return!!n[o]||t!==EMPTY_OBJ&&hasOwn(t,o)||hasSetupBinding(e,o)||(a=i[0])&&hasOwn(a,o)||hasOwn(r,o)||hasOwn(publicPropertiesMap,o)||hasOwn(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:hasOwn(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};let shouldCacheAccess=!0;function applyOptions(t){const e=resolveMergedOptions(t),n=t.proxy,r=t.ctx;shouldCacheAccess=!1,e.beforeCreate&&callHook$1(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:d,mounted:f,beforeUpdate:g,updated:E,activated:S,deactivated:M,beforeDestroy:N,beforeUnmount:x,destroyed:k,unmounted:H,render:q,renderTracked:ne,renderTriggered:se,errorCaptured:V,serverPrefetch:z,expose:K,inheritAttrs:ie,components:L,directives:Z,filters:oe}=e;if(c&&resolveInjections(c,r,null,t.appContext.config.unwrapInjectedRef),o)for(const J in o){const Y=o[J];isFunction(Y)&&(r[J]=Y.bind(n))}if(s){const J=s.call(n,n);isObject$2(J)&&(t.data=reactive(J))}if(shouldCacheAccess=!0,i)for(const J in i){const Y=i[J],ce=isFunction(Y)?Y.bind(n,n):isFunction(Y.get)?Y.get.bind(n,n):NOOP,pe=!isFunction(Y)&&isFunction(Y.set)?Y.set.bind(n):NOOP,ue=computed({get:ce,set:pe});Object.defineProperty(r,J,{enumerable:!0,configurable:!0,get:()=>ue.value,set:ae=>ue.value=ae})}if(a)for(const J in a)createWatcher(a[J],r,n,J);if(l){const J=isFunction(l)?l.call(n):l;Reflect.ownKeys(J).forEach(Y=>{provide(Y,J[Y])})}u&&callHook$1(u,t,"c");function ee(J,Y){isArray$1(Y)?Y.forEach(ce=>J(ce.bind(n))):Y&&J(Y.bind(n))}if(ee(onBeforeMount,d),ee(onMounted,f),ee(onBeforeUpdate,g),ee(onUpdated,E),ee(onActivated,S),ee(onDeactivated,M),ee(onErrorCaptured,V),ee(onRenderTracked,ne),ee(onRenderTriggered,se),ee(onBeforeUnmount,x),ee(onUnmounted,H),ee(onServerPrefetch,z),isArray$1(K))if(K.length){const J=t.exposed||(t.exposed={});K.forEach(Y=>{Object.defineProperty(J,Y,{get:()=>n[Y],set:ce=>n[Y]=ce})})}else t.exposed||(t.exposed={});q&&t.render===NOOP&&(t.render=q),ie!=null&&(t.inheritAttrs=ie),L&&(t.components=L),Z&&(t.directives=Z)}function resolveInjections(t,e,n=NOOP,r=!1){isArray$1(t)&&(t=normalizeInject(t));for(const s in t){const i=t[s];let o;isObject$2(i)?"default"in i?o=inject(i.from||s,i.default,!0):o=inject(i.from||s):o=inject(i),isRef(o)&&r?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:a=>o.value=a}):e[s]=o}}function callHook$1(t,e,n){callWithAsyncErrorHandling(isArray$1(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function createWatcher(t,e,n,r){const s=r.includes(".")?createPathGetter(n,r):()=>n[r];if(isString(t)){const i=e[t];isFunction(i)&&watch(s,i)}else if(isFunction(t))watch(s,t.bind(n));else if(isObject$2(t))if(isArray$1(t))t.forEach(i=>createWatcher(i,e,n,r));else{const i=isFunction(t.handler)?t.handler.bind(n):e[t.handler];isFunction(i)&&watch(s,i,t)}}function resolveMergedOptions(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let l;return a?l=a:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(c=>mergeOptions$1(l,c,o,!0)),mergeOptions$1(l,e,o)),isObject$2(e)&&i.set(e,l),l}function mergeOptions$1(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&mergeOptions$1(t,i,n,!0),s&&s.forEach(o=>mergeOptions$1(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=internalOptionMergeStrats[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const internalOptionMergeStrats={data:mergeDataFn,props:mergeObjectOptions,emits:mergeObjectOptions,methods:mergeObjectOptions,computed:mergeObjectOptions,beforeCreate:mergeAsArray,created:mergeAsArray,beforeMount:mergeAsArray,mounted:mergeAsArray,beforeUpdate:mergeAsArray,updated:mergeAsArray,beforeDestroy:mergeAsArray,beforeUnmount:mergeAsArray,destroyed:mergeAsArray,unmounted:mergeAsArray,activated:mergeAsArray,deactivated:mergeAsArray,errorCaptured:mergeAsArray,serverPrefetch:mergeAsArray,components:mergeObjectOptions,directives:mergeObjectOptions,watch:mergeWatchOptions,provide:mergeDataFn,inject:mergeInject};function mergeDataFn(t,e){return e?t?function(){return extend(isFunction(t)?t.call(this,this):t,isFunction(e)?e.call(this,this):e)}:e:t}function mergeInject(t,e){return mergeObjectOptions(normalizeInject(t),normalizeInject(e))}function normalizeInject(t){if(isArray$1(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function mergeAsArray(t,e){return t?[...new Set([].concat(t,e))]:e}function mergeObjectOptions(t,e){return t?extend(extend(Object.create(null),t),e):e}function mergeWatchOptions(t,e){if(!t)return e;if(!e)return t;const n=extend(Object.create(null),t);for(const r in e)n[r]=mergeAsArray(t[r],e[r]);return n}function initProps(t,e,n,r=!1){const s={},i={};def(i,InternalObjectKey,1),t.propsDefaults=Object.create(null),setFullProps(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:shallowReactive(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function updateProps(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=toRaw(s),[l]=t.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let d=0;d<u.length;d++){let f=u[d];if(isEmitListener(t.emitsOptions,f))continue;const g=e[f];if(l)if(hasOwn(i,f))g!==i[f]&&(i[f]=g,c=!0);else{const E=camelize(f);s[E]=resolvePropValue(l,a,E,g,t,!1)}else g!==i[f]&&(i[f]=g,c=!0)}}}else{setFullProps(t,e,s,i)&&(c=!0);let u;for(const d in a)(!e||!hasOwn(e,d)&&((u=hyphenate(d))===d||!hasOwn(e,u)))&&(l?n&&(n[d]!==void 0||n[u]!==void 0)&&(s[d]=resolvePropValue(l,a,d,void 0,t,!0)):delete s[d]);if(i!==a)for(const d in i)(!e||!hasOwn(e,d)&&!0)&&(delete i[d],c=!0)}c&&trigger(t,"set","$attrs")}function setFullProps(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(isReservedProp(l))continue;const c=e[l];let u;s&&hasOwn(s,u=camelize(l))?!i||!i.includes(u)?n[u]=c:(a||(a={}))[u]=c:isEmitListener(t.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(i){const l=toRaw(n),c=a||EMPTY_OBJ;for(let u=0;u<i.length;u++){const d=i[u];n[d]=resolvePropValue(s,l,d,c[d],t,!hasOwn(c,d))}}return o}function resolvePropValue(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=hasOwn(o,"default");if(a&&r===void 0){const l=o.default;if(o.type!==Function&&isFunction(l)){const{propsDefaults:c}=s;n in c?r=c[n]:(setCurrentInstance(s),r=c[n]=l.call(null,e),unsetCurrentInstance())}else r=l}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===hyphenate(n))&&(r=!0))}return r}function normalizePropsOptions(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let l=!1;if(!isFunction(t)){const u=d=>{l=!0;const[f,g]=normalizePropsOptions(d,e,!0);extend(o,f),g&&a.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!l)return isObject$2(t)&&r.set(t,EMPTY_ARR),EMPTY_ARR;if(isArray$1(i))for(let u=0;u<i.length;u++){const d=camelize(i[u]);validatePropName(d)&&(o[d]=EMPTY_OBJ)}else if(i)for(const u in i){const d=camelize(u);if(validatePropName(d)){const f=i[u],g=o[d]=isArray$1(f)||isFunction(f)?{type:f}:Object.assign({},f);if(g){const E=getTypeIndex(Boolean,g.type),S=getTypeIndex(String,g.type);g[0]=E>-1,g[1]=S<0||E<S,(E>-1||hasOwn(g,"default"))&&a.push(d)}}}const c=[o,a];return isObject$2(t)&&r.set(t,c),c}function validatePropName(t){return t[0]!=="$"}function getType(t){const e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:t===null?"null":""}function isSameType(t,e){return getType(t)===getType(e)}function getTypeIndex(t,e){return isArray$1(e)?e.findIndex(n=>isSameType(n,t)):isFunction(e)&&isSameType(e,t)?0:-1}const isInternalKey=t=>t[0]==="_"||t==="$stable",normalizeSlotValue=t=>isArray$1(t)?t.map(normalizeVNode):[normalizeVNode(t)],normalizeSlot$1=(t,e,n)=>{if(e._n)return e;const r=withCtx((...s)=>normalizeSlotValue(e(...s)),n);return r._c=!1,r},normalizeObjectSlots=(t,e,n)=>{const r=t._ctx;for(const s in t){if(isInternalKey(s))continue;const i=t[s];if(isFunction(i))e[s]=normalizeSlot$1(s,i,r);else if(i!=null){const o=normalizeSlotValue(i);e[s]=()=>o}}},normalizeVNodeSlots=(t,e)=>{const n=normalizeSlotValue(e);t.slots.default=()=>n},initSlots=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=toRaw(e),def(e,"_",n)):normalizeObjectSlots(e,t.slots={})}else t.slots={},e&&normalizeVNodeSlots(t,e);def(t.slots,InternalObjectKey,1)},updateSlots=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=EMPTY_OBJ;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:(extend(s,e),!n&&a===1&&delete s._):(i=!e.$stable,normalizeObjectSlots(e,s)),o=e}else e&&(normalizeVNodeSlots(t,e),o={default:1});if(i)for(const a in s)!isInternalKey(a)&&!(a in o)&&delete s[a]};function createAppContext(){return{app:null,config:{isNativeTag:NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let uid=0;function createAppAPI(t,e){return function(r,s=null){isFunction(r)||(r=Object.assign({},r)),s!=null&&!isObject$2(s)&&(s=null);const i=createAppContext(),o=new Set;let a=!1;const l=i.app={_uid:uid++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:version$4,get config(){return i.config},set config(c){},use(c,...u){return o.has(c)||(c&&isFunction(c.install)?(o.add(c),c.install(l,...u)):isFunction(c)&&(o.add(c),c(l,...u))),l},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),l},component(c,u){return u?(i.components[c]=u,l):i.components[c]},directive(c,u){return u?(i.directives[c]=u,l):i.directives[c]},mount(c,u,d){if(!a){const f=createVNode(r,s);return f.appContext=i,u&&e?e(f,c):t(f,c,d),a=!0,l._container=c,c.__vue_app__=l,getExposeProxy(f.component)||f.component.proxy}},unmount(){a&&(t(null,l._container),delete l._container.__vue_app__)},provide(c,u){return i.provides[c]=u,l}};return l}}function setRef(t,e,n,r,s=!1){if(isArray$1(t)){t.forEach((f,g)=>setRef(f,e&&(isArray$1(e)?e[g]:e),n,r,s));return}if(isAsyncWrapper(r)&&!s)return;const i=r.shapeFlag&4?getExposeProxy(r.component)||r.component.proxy:r.el,o=s?null:i,{i:a,r:l}=t,c=e&&e.r,u=a.refs===EMPTY_OBJ?a.refs={}:a.refs,d=a.setupState;if(c!=null&&c!==l&&(isString(c)?(u[c]=null,hasOwn(d,c)&&(d[c]=null)):isRef(c)&&(c.value=null)),isFunction(l))callWithErrorHandling(l,a,12,[o,u]);else{const f=isString(l),g=isRef(l);if(f||g){const E=()=>{if(t.f){const S=f?hasOwn(d,l)?d[l]:u[l]:l.value;s?isArray$1(S)&&remove(S,i):isArray$1(S)?S.includes(i)||S.push(i):f?(u[l]=[i],hasOwn(d,l)&&(d[l]=u[l])):(l.value=[i],t.k&&(u[t.k]=l.value))}else f?(u[l]=o,hasOwn(d,l)&&(d[l]=o)):g&&(l.value=o,t.k&&(u[t.k]=o))};o?(E.id=-1,queuePostRenderEffect(E,n)):E()}}}const queuePostRenderEffect=queueEffectWithSuspense;function createRenderer(t){return baseCreateRenderer(t)}function baseCreateRenderer(t,e){const n=getGlobalThis();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:d,nextSibling:f,setScopeId:g=NOOP,insertStaticContent:E}=t,S=(_,m,y,v=null,I=null,b=null,O=!1,R=null,w=!!m.dynamicChildren)=>{if(_===m)return;_&&!isSameVNodeType(_,m)&&(v=A(_),ae(_,I,b,!0),_=null),m.patchFlag===-2&&(w=!1,m.dynamicChildren=null);const{type:C,ref:B,shapeFlag:D}=m;switch(C){case Text:M(_,m,y,v);break;case Comment:N(_,m,y,v);break;case Static:_==null&&x(m,y,v,O);break;case Fragment:L(_,m,y,v,I,b,O,R,w);break;default:D&1?q(_,m,y,v,I,b,O,R,w):D&6?Z(_,m,y,v,I,b,O,R,w):(D&64||D&128)&&C.process(_,m,y,v,I,b,O,R,w,j)}B!=null&&I&&setRef(B,_&&_.ref,b,m||_,!m)},M=(_,m,y,v)=>{if(_==null)r(m.el=a(m.children),y,v);else{const I=m.el=_.el;m.children!==_.children&&c(I,m.children)}},N=(_,m,y,v)=>{_==null?r(m.el=l(m.children||""),y,v):m.el=_.el},x=(_,m,y,v)=>{[_.el,_.anchor]=E(_.children,m,y,v,_.el,_.anchor)},k=({el:_,anchor:m},y,v)=>{let I;for(;_&&_!==m;)I=f(_),r(_,y,v),_=I;r(m,y,v)},H=({el:_,anchor:m})=>{let y;for(;_&&_!==m;)y=f(_),s(_),_=y;s(m)},q=(_,m,y,v,I,b,O,R,w)=>{O=O||m.type==="svg",_==null?ne(m,y,v,I,b,O,R,w):z(_,m,I,b,O,R,w)},ne=(_,m,y,v,I,b,O,R)=>{let w,C;const{type:B,props:D,shapeFlag:$,transition:U,dirs:G}=_;if(w=_.el=o(_.type,b,D&&D.is,D),$&8?u(w,_.children):$&16&&V(_.children,w,null,v,I,b&&B!=="foreignObject",O,R),G&&invokeDirectiveHook(_,null,v,"created"),D){for(const Q in D)Q!=="value"&&!isReservedProp(Q)&&i(w,Q,null,D[Q],b,_.children,v,I,P);"value"in D&&i(w,"value",null,D.value),(C=D.onVnodeBeforeMount)&&invokeVNodeHook(C,v,_)}se(w,_,_.scopeId,O,v),G&&invokeDirectiveHook(_,null,v,"beforeMount");const X=(!I||I&&!I.pendingBranch)&&U&&!U.persisted;X&&U.beforeEnter(w),r(w,m,y),((C=D&&D.onVnodeMounted)||X||G)&&queuePostRenderEffect(()=>{C&&invokeVNodeHook(C,v,_),X&&U.enter(w),G&&invokeDirectiveHook(_,null,v,"mounted")},I)},se=(_,m,y,v,I)=>{if(y&&g(_,y),v)for(let b=0;b<v.length;b++)g(_,v[b]);if(I){let b=I.subTree;if(m===b){const O=I.vnode;se(_,O,O.scopeId,O.slotScopeIds,I.parent)}}},V=(_,m,y,v,I,b,O,R,w=0)=>{for(let C=w;C<_.length;C++){const B=_[C]=R?cloneIfMounted(_[C]):normalizeVNode(_[C]);S(null,B,m,y,v,I,b,O,R)}},z=(_,m,y,v,I,b,O)=>{const R=m.el=_.el;let{patchFlag:w,dynamicChildren:C,dirs:B}=m;w|=_.patchFlag&16;const D=_.props||EMPTY_OBJ,$=m.props||EMPTY_OBJ;let U;y&&toggleRecurse(y,!1),(U=$.onVnodeBeforeUpdate)&&invokeVNodeHook(U,y,m,_),B&&invokeDirectiveHook(m,_,y,"beforeUpdate"),y&&toggleRecurse(y,!0);const G=I&&m.type!=="foreignObject";if(C?K(_.dynamicChildren,C,R,y,v,G,b):O||Y(_,m,R,null,y,v,G,b,!1),w>0){if(w&16)ie(R,m,D,$,y,v,I);else if(w&2&&D.class!==$.class&&i(R,"class",null,$.class,I),w&4&&i(R,"style",D.style,$.style,I),w&8){const X=m.dynamicProps;for(let Q=0;Q<X.length;Q++){const re=X[Q],de=D[re],me=$[re];(me!==de||re==="value")&&i(R,re,de,me,I,_.children,y,v,P)}}w&1&&_.children!==m.children&&u(R,m.children)}else!O&&C==null&&ie(R,m,D,$,y,v,I);((U=$.onVnodeUpdated)||B)&&queuePostRenderEffect(()=>{U&&invokeVNodeHook(U,y,m,_),B&&invokeDirectiveHook(m,_,y,"updated")},v)},K=(_,m,y,v,I,b,O)=>{for(let R=0;R<m.length;R++){const w=_[R],C=m[R],B=w.el&&(w.type===Fragment||!isSameVNodeType(w,C)||w.shapeFlag&70)?d(w.el):y;S(w,C,B,null,v,I,b,O,!0)}},ie=(_,m,y,v,I,b,O)=>{if(y!==v){if(y!==EMPTY_OBJ)for(const R in y)!isReservedProp(R)&&!(R in v)&&i(_,R,y[R],null,O,m.children,I,b,P);for(const R in v){if(isReservedProp(R))continue;const w=v[R],C=y[R];w!==C&&R!=="value"&&i(_,R,C,w,O,m.children,I,b,P)}"value"in v&&i(_,"value",y.value,v.value)}},L=(_,m,y,v,I,b,O,R,w)=>{const C=m.el=_?_.el:a(""),B=m.anchor=_?_.anchor:a("");let{patchFlag:D,dynamicChildren:$,slotScopeIds:U}=m;U&&(R=R?R.concat(U):U),_==null?(r(C,y,v),r(B,y,v),V(m.children,y,B,I,b,O,R,w)):D>0&&D&64&&$&&_.dynamicChildren?(K(_.dynamicChildren,$,y,I,b,O,R),(m.key!=null||I&&m===I.subTree)&&traverseStaticChildren(_,m,!0)):Y(_,m,y,B,I,b,O,R,w)},Z=(_,m,y,v,I,b,O,R,w)=>{m.slotScopeIds=R,_==null?m.shapeFlag&512?I.ctx.activate(m,y,v,O,w):oe(m,y,v,I,b,O,w):fe(_,m,w)},oe=(_,m,y,v,I,b,O)=>{const R=_.component=createComponentInstance(_,v,I);if(isKeepAlive(_)&&(R.ctx.renderer=j),setupComponent(R),R.asyncDep){if(I&&I.registerDep(R,ee),!_.el){const w=R.subTree=createVNode(Comment);N(null,w,m,y)}return}ee(R,_,m,y,I,b,O)},fe=(_,m,y)=>{const v=m.component=_.component;if(shouldUpdateComponent(_,m,y))if(v.asyncDep&&!v.asyncResolved){J(v,m,y);return}else v.next=m,invalidateJob(v.update),v.update();else m.el=_.el,v.vnode=m},ee=(_,m,y,v,I,b,O)=>{const R=()=>{if(_.isMounted){let{next:B,bu:D,u:$,parent:U,vnode:G}=_,X=B,Q;toggleRecurse(_,!1),B?(B.el=G.el,J(_,B,O)):B=G,D&&invokeArrayFns(D),(Q=B.props&&B.props.onVnodeBeforeUpdate)&&invokeVNodeHook(Q,U,B,G),toggleRecurse(_,!0);const re=renderComponentRoot(_),de=_.subTree;_.subTree=re,S(de,re,d(de.el),A(de),_,I,b),B.el=re.el,X===null&&updateHOCHostEl(_,re.el),$&&queuePostRenderEffect($,I),(Q=B.props&&B.props.onVnodeUpdated)&&queuePostRenderEffect(()=>invokeVNodeHook(Q,U,B,G),I)}else{let B;const{el:D,props:$}=m,{bm:U,m:G,parent:X}=_,Q=isAsyncWrapper(m);if(toggleRecurse(_,!1),U&&invokeArrayFns(U),!Q&&(B=$&&$.onVnodeBeforeMount)&&invokeVNodeHook(B,X,m),toggleRecurse(_,!0),D&&W){const re=()=>{_.subTree=renderComponentRoot(_),W(D,_.subTree,_,I,null)};Q?m.type.__asyncLoader().then(()=>!_.isUnmounted&&re()):re()}else{const re=_.subTree=renderComponentRoot(_);S(null,re,y,v,_,I,b),m.el=re.el}if(G&&queuePostRenderEffect(G,I),!Q&&(B=$&&$.onVnodeMounted)){const re=m;queuePostRenderEffect(()=>invokeVNodeHook(B,X,re),I)}(m.shapeFlag&256||X&&isAsyncWrapper(X.vnode)&&X.vnode.shapeFlag&256)&&_.a&&queuePostRenderEffect(_.a,I),_.isMounted=!0,m=y=v=null}},w=_.effect=new ReactiveEffect(R,()=>queueJob(C),_.scope),C=_.update=()=>w.run();C.id=_.uid,toggleRecurse(_,!0),C()},J=(_,m,y)=>{m.component=_;const v=_.vnode.props;_.vnode=m,_.next=null,updateProps(_,m.props,v,y),updateSlots(_,m.children,y),pauseTracking(),flushPreFlushCbs(),resetTracking()},Y=(_,m,y,v,I,b,O,R,w=!1)=>{const C=_&&_.children,B=_?_.shapeFlag:0,D=m.children,{patchFlag:$,shapeFlag:U}=m;if($>0){if($&128){pe(C,D,y,v,I,b,O,R,w);return}else if($&256){ce(C,D,y,v,I,b,O,R,w);return}}U&8?(B&16&&P(C,I,b),D!==C&&u(y,D)):B&16?U&16?pe(C,D,y,v,I,b,O,R,w):P(C,I,b,!0):(B&8&&u(y,""),U&16&&V(D,y,v,I,b,O,R,w))},ce=(_,m,y,v,I,b,O,R,w)=>{_=_||EMPTY_ARR,m=m||EMPTY_ARR;const C=_.length,B=m.length,D=Math.min(C,B);let $;for($=0;$<D;$++){const U=m[$]=w?cloneIfMounted(m[$]):normalizeVNode(m[$]);S(_[$],U,y,null,I,b,O,R,w)}C>B?P(_,I,b,!0,!1,D):V(m,y,v,I,b,O,R,w,D)},pe=(_,m,y,v,I,b,O,R,w)=>{let C=0;const B=m.length;let D=_.length-1,$=B-1;for(;C<=D&&C<=$;){const U=_[C],G=m[C]=w?cloneIfMounted(m[C]):normalizeVNode(m[C]);if(isSameVNodeType(U,G))S(U,G,y,null,I,b,O,R,w);else break;C++}for(;C<=D&&C<=$;){const U=_[D],G=m[$]=w?cloneIfMounted(m[$]):normalizeVNode(m[$]);if(isSameVNodeType(U,G))S(U,G,y,null,I,b,O,R,w);else break;D--,$--}if(C>D){if(C<=$){const U=$+1,G=U<B?m[U].el:v;for(;C<=$;)S(null,m[C]=w?cloneIfMounted(m[C]):normalizeVNode(m[C]),y,G,I,b,O,R,w),C++}}else if(C>$)for(;C<=D;)ae(_[C],I,b,!0),C++;else{const U=C,G=C,X=new Map;for(C=G;C<=$;C++){const le=m[C]=w?cloneIfMounted(m[C]):normalizeVNode(m[C]);le.key!=null&&X.set(le.key,C)}let Q,re=0;const de=$-G+1;let me=!1,Ee=0;const ge=new Array(de);for(C=0;C<de;C++)ge[C]=0;for(C=U;C<=D;C++){const le=_[C];if(re>=de){ae(le,I,b,!0);continue}let he;if(le.key!=null)he=X.get(le.key);else for(Q=G;Q<=$;Q++)if(ge[Q-G]===0&&isSameVNodeType(le,m[Q])){he=Q;break}he===void 0?ae(le,I,b,!0):(ge[he-G]=C+1,he>=Ee?Ee=he:me=!0,S(le,m[he],y,null,I,b,O,R,w),re++)}const ve=me?getSequence(ge):EMPTY_ARR;for(Q=ve.length-1,C=de-1;C>=0;C--){const le=G+C,he=m[le],Te=le+1<B?m[le+1].el:v;ge[C]===0?S(null,he,y,Te,I,b,O,R,w):me&&(Q<0||C!==ve[Q]?ue(he,y,Te,2):Q--)}}},ue=(_,m,y,v,I=null)=>{const{el:b,type:O,transition:R,children:w,shapeFlag:C}=_;if(C&6){ue(_.component.subTree,m,y,v);return}if(C&128){_.suspense.move(m,y,v);return}if(C&64){O.move(_,m,y,j);return}if(O===Fragment){r(b,m,y);for(let D=0;D<w.length;D++)ue(w[D],m,y,v);r(_.anchor,m,y);return}if(O===Static){k(_,m,y);return}if(v!==2&&C&1&&R)if(v===0)R.beforeEnter(b),r(b,m,y),queuePostRenderEffect(()=>R.enter(b),I);else{const{leave:D,delayLeave:$,afterLeave:U}=R,G=()=>r(b,m,y),X=()=>{D(b,()=>{G(),U&&U()})};$?$(b,G,X):X()}else r(b,m,y)},ae=(_,m,y,v=!1,I=!1)=>{const{type:b,props:O,ref:R,children:w,dynamicChildren:C,shapeFlag:B,patchFlag:D,dirs:$}=_;if(R!=null&&setRef(R,null,y,_,!0),B&256){m.ctx.deactivate(_);return}const U=B&1&&$,G=!isAsyncWrapper(_);let X;if(G&&(X=O&&O.onVnodeBeforeUnmount)&&invokeVNodeHook(X,m,_),B&6)T(_.component,y,v);else{if(B&128){_.suspense.unmount(y,v);return}U&&invokeDirectiveHook(_,null,m,"beforeUnmount"),B&64?_.type.remove(_,m,y,I,j,v):C&&(b!==Fragment||D>0&&D&64)?P(C,m,y,!1,!0):(b===Fragment&&D&384||!I&&B&16)&&P(w,m,y),v&&_e(_)}(G&&(X=O&&O.onVnodeUnmounted)||U)&&queuePostRenderEffect(()=>{X&&invokeVNodeHook(X,m,_),U&&invokeDirectiveHook(_,null,m,"unmounted")},y)},_e=_=>{const{type:m,el:y,anchor:v,transition:I}=_;if(m===Fragment){ye(y,v);return}if(m===Static){H(_);return}const b=()=>{s(y),I&&!I.persisted&&I.afterLeave&&I.afterLeave()};if(_.shapeFlag&1&&I&&!I.persisted){const{leave:O,delayLeave:R}=I,w=()=>O(y,b);R?R(_.el,b,w):w()}else b()},ye=(_,m)=>{let y;for(;_!==m;)y=f(_),s(_),_=y;s(m)},T=(_,m,y)=>{const{bum:v,scope:I,update:b,subTree:O,um:R}=_;v&&invokeArrayFns(v),I.stop(),b&&(b.active=!1,ae(O,_,m,y)),R&&queuePostRenderEffect(R,m),queuePostRenderEffect(()=>{_.isUnmounted=!0},m),m&&m.pendingBranch&&!m.isUnmounted&&_.asyncDep&&!_.asyncResolved&&_.suspenseId===m.pendingId&&(m.deps--,m.deps===0&&m.resolve())},P=(_,m,y,v=!1,I=!1,b=0)=>{for(let O=b;O<_.length;O++)ae(_[O],m,y,v,I)},A=_=>_.shapeFlag&6?A(_.component.subTree):_.shapeFlag&128?_.suspense.next():f(_.anchor||_.el),F=(_,m,y)=>{_==null?m._vnode&&ae(m._vnode,null,null,!0):S(m._vnode||null,_,m,null,null,null,y),flushPreFlushCbs(),flushPostFlushCbs(),m._vnode=_},j={p:S,um:ae,m:ue,r:_e,mt:oe,mc:V,pc:Y,pbc:K,n:A,o:t};let te,W;return e&&([te,W]=e(j)),{render:F,hydrate:te,createApp:createAppAPI(F,te)}}function toggleRecurse({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function traverseStaticChildren(t,e,n=!1){const r=t.children,s=e.children;if(isArray$1(r)&&isArray$1(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=cloneIfMounted(s[i]),a.el=o.el),n||traverseStaticChildren(o,a)),a.type===Text&&(a.el=o.el)}}function getSequence(t){const e=t.slice(),n=[0];let r,s,i,o,a;const l=t.length;for(r=0;r<l;r++){const c=t[r];if(c!==0){if(s=n[n.length-1],t[s]<c){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<c?i=a+1:o=a;c<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const isTeleport=t=>t.__isTeleport,Fragment=Symbol(void 0),Text=Symbol(void 0),Comment=Symbol(void 0),Static=Symbol(void 0),blockStack=[];let currentBlock=null;function openBlock(t=!1){blockStack.push(currentBlock=t?null:[])}function closeBlock(){blockStack.pop(),currentBlock=blockStack[blockStack.length-1]||null}let isBlockTreeEnabled=1;function setBlockTracking(t){isBlockTreeEnabled+=t}function setupBlock(t){return t.dynamicChildren=isBlockTreeEnabled>0?currentBlock||EMPTY_ARR:null,closeBlock(),isBlockTreeEnabled>0&&currentBlock&&currentBlock.push(t),t}function createElementBlock(t,e,n,r,s,i){return setupBlock(createBaseVNode(t,e,n,r,s,i,!0))}function createBlock(t,e,n,r,s){return setupBlock(createVNode(t,e,n,r,s,!0))}function isVNode(t){return t?t.__v_isVNode===!0:!1}function isSameVNodeType(t,e){return t.type===e.type&&t.key===e.key}const InternalObjectKey="__vInternal",normalizeKey=({key:t})=>t!=null?t:null,normalizeRef=({ref:t,ref_key:e,ref_for:n})=>t!=null?isString(t)||isRef(t)||isFunction(t)?{i:currentRenderingInstance,r:t,k:e,f:!!n}:t:null;function createBaseVNode(t,e=null,n=null,r=0,s=null,i=t===Fragment?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&normalizeKey(e),ref:e&&normalizeRef(e),scopeId:currentScopeId,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:currentRenderingInstance};return a?(normalizeChildren(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=isString(n)?8:16),isBlockTreeEnabled>0&&!o&&currentBlock&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&currentBlock.push(l),l}const createVNode=_createVNode;function _createVNode(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===NULL_DYNAMIC_COMPONENT)&&(t=Comment),isVNode(t)){const a=cloneVNode(t,e,!0);return n&&normalizeChildren(a,n),isBlockTreeEnabled>0&&!i&&currentBlock&&(a.shapeFlag&6?currentBlock[currentBlock.indexOf(t)]=a:currentBlock.push(a)),a.patchFlag|=-2,a}if(isClassComponent(t)&&(t=t.__vccOpts),e){e=guardReactiveProps(e);let{class:a,style:l}=e;a&&!isString(a)&&(e.class=normalizeClass(a)),isObject$2(l)&&(isProxy(l)&&!isArray$1(l)&&(l=extend({},l)),e.style=normalizeStyle(l))}const o=isString(t)?1:isSuspense(t)?128:isTeleport(t)?64:isObject$2(t)?4:isFunction(t)?2:0;return createBaseVNode(t,e,n,r,s,o,i,!0)}function guardReactiveProps(t){return t?isProxy(t)||InternalObjectKey in t?extend({},t):t:null}function cloneVNode(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,a=e?mergeProps(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:a,key:a&&normalizeKey(a),ref:e&&e.ref?n&&s?isArray$1(s)?s.concat(normalizeRef(e)):[s,normalizeRef(e)]:normalizeRef(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Fragment?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&cloneVNode(t.ssContent),ssFallback:t.ssFallback&&cloneVNode(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx}}function createTextVNode(t=" ",e=0){return createVNode(Text,null,t,e)}function createStaticVNode(t,e){const n=createVNode(Static,null,t);return n.staticCount=e,n}function createCommentVNode(t="",e=!1){return e?(openBlock(),createBlock(Comment,null,t)):createVNode(Comment,null,t)}function normalizeVNode(t){return t==null||typeof t=="boolean"?createVNode(Comment):isArray$1(t)?createVNode(Fragment,null,t.slice()):typeof t=="object"?cloneIfMounted(t):createVNode(Text,null,String(t))}function cloneIfMounted(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:cloneVNode(t)}function normalizeChildren(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(isArray$1(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),normalizeChildren(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(InternalObjectKey in e)?e._ctx=currentRenderingInstance:s===3&&currentRenderingInstance&&(currentRenderingInstance.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else isFunction(e)?(e={default:e,_ctx:currentRenderingInstance},n=32):(e=String(e),r&64?(n=16,e=[createTextVNode(e)]):n=8);t.children=e,t.shapeFlag|=n}function mergeProps(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=normalizeClass([e.class,r.class]));else if(s==="style")e.style=normalizeStyle([e.style,r.style]);else if(isOn(s)){const i=e[s],o=r[s];o&&i!==o&&!(isArray$1(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function invokeVNodeHook(t,e,n,r=null){callWithAsyncErrorHandling(t,e,7,[n,r])}const emptyAppContext=createAppContext();let uid$1=0;function createComponentInstance(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||emptyAppContext,i={uid:uid$1++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new EffectScope(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:normalizePropsOptions(r,s),emitsOptions:normalizeEmitsOptions(r,s),emit:null,emitted:null,propsDefaults:EMPTY_OBJ,inheritAttrs:r.inheritAttrs,ctx:EMPTY_OBJ,data:EMPTY_OBJ,props:EMPTY_OBJ,attrs:EMPTY_OBJ,slots:EMPTY_OBJ,refs:EMPTY_OBJ,setupState:EMPTY_OBJ,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=emit$1.bind(null,i),t.ce&&t.ce(i),i}let currentInstance=null;const getCurrentInstance=()=>currentInstance||currentRenderingInstance,setCurrentInstance=t=>{currentInstance=t,t.scope.on()},unsetCurrentInstance=()=>{currentInstance&&currentInstance.scope.off(),currentInstance=null};function isStatefulComponent(t){return t.vnode.shapeFlag&4}let isInSSRComponentSetup=!1;function setupComponent(t,e=!1){isInSSRComponentSetup=e;const{props:n,children:r}=t.vnode,s=isStatefulComponent(t);initProps(t,n,s,e),initSlots(t,r);const i=s?setupStatefulComponent(t,e):void 0;return isInSSRComponentSetup=!1,i}function setupStatefulComponent(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=markRaw(new Proxy(t.ctx,PublicInstanceProxyHandlers));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?createSetupContext(t):null;setCurrentInstance(t),pauseTracking();const i=callWithErrorHandling(r,t,0,[t.props,s]);if(resetTracking(),unsetCurrentInstance(),isPromise$1(i)){if(i.then(unsetCurrentInstance,unsetCurrentInstance),e)return i.then(o=>{handleSetupResult(t,o,e)}).catch(o=>{handleError(o,t,0)});t.asyncDep=i}else handleSetupResult(t,i,e)}else finishComponentSetup(t,e)}function handleSetupResult(t,e,n){isFunction(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:isObject$2(e)&&(t.setupState=proxyRefs(e)),finishComponentSetup(t,n)}let compile;function finishComponentSetup(t,e,n){const r=t.type;if(!t.render){if(!e&&compile&&!r.render){const s=r.template||resolveMergedOptions(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:l}=r,c=extend(extend({isCustomElement:i,delimiters:a},o),l);r.render=compile(s,c)}}t.render=r.render||NOOP}setCurrentInstance(t),pauseTracking(),applyOptions(t),resetTracking(),unsetCurrentInstance()}function createAttrsProxy(t){return new Proxy(t.attrs,{get(e,n){return track(t,"get","$attrs"),e[n]}})}function createSetupContext(t){const e=r=>{t.exposed=r||{}};let n;return{get attrs(){return n||(n=createAttrsProxy(t))},slots:t.slots,emit:t.emit,expose:e}}function getExposeProxy(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(proxyRefs(markRaw(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in publicPropertiesMap)return publicPropertiesMap[n](t)},has(e,n){return n in e||n in publicPropertiesMap}}))}function getComponentName(t,e=!0){return isFunction(t)?t.displayName||t.name:t.name||e&&t.__name}function isClassComponent(t){return isFunction(t)&&"__vccOpts"in t}const computed=(t,e)=>computed$1(t,e,isInSSRComponentSetup);function h(t,e,n){const r=arguments.length;return r===2?isObject$2(e)&&!isArray$1(e)?isVNode(e)?createVNode(t,null,[e]):createVNode(t,e):createVNode(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&isVNode(n)&&(n=[n]),createVNode(t,e,n))}const ssrContextKey=Symbol(""),useSSRContext=()=>inject(ssrContextKey),version$4="3.2.45",svgNS="http://www.w3.org/2000/svg",doc=typeof document<"u"?document:null,templateContainer=doc&&doc.createElement("template"),nodeOps={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e?doc.createElementNS(svgNS,t):doc.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>doc.createTextNode(t),createComment:t=>doc.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>doc.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{templateContainer.innerHTML=r?`<svg>${t}</svg>`:t;const a=templateContainer.content;if(r){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function patchClass(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function patchStyle(t,e,n){const r=t.style,s=isString(n);if(n&&!s){for(const i in n)setStyle(r,i,n[i]);if(e&&!isString(e))for(const i in e)n[i]==null&&setStyle(r,i,"")}else{const i=r.display;s?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const importantRE=/\s*!important$/;function setStyle(t,e,n){if(isArray$1(n))n.forEach(r=>setStyle(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=autoPrefix(t,e);importantRE.test(n)?t.setProperty(hyphenate(r),n.replace(importantRE,""),"important"):t[r]=n}}const prefixes=["Webkit","Moz","ms"],prefixCache={};function autoPrefix(t,e){const n=prefixCache[e];if(n)return n;let r=camelize(e);if(r!=="filter"&&r in t)return prefixCache[e]=r;r=capitalize(r);for(let s=0;s<prefixes.length;s++){const i=prefixes[s]+r;if(i in t)return prefixCache[e]=i}return e}const xlinkNS="http://www.w3.org/1999/xlink";function patchAttr(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(xlinkNS,e.slice(6,e.length)):t.setAttributeNS(xlinkNS,e,n);else{const i=isSpecialBooleanAttr(e);n==null||i&&!includeBooleanAttr(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function patchDOMProp(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n==null?"":n;return}if(e==="value"&&t.tagName!=="PROGRESS"&&!t.tagName.includes("-")){t._value=n;const l=n==null?"":n;(t.value!==l||t.tagName==="OPTION")&&(t.value=l),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=includeBooleanAttr(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function addEventListener(t,e,n,r){t.addEventListener(e,n,r)}function removeEventListener(t,e,n,r){t.removeEventListener(e,n,r)}function patchEvent(t,e,n,r,s=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[a,l]=parseName(e);if(r){const c=i[e]=createInvoker(r,s);addEventListener(t,a,c,l)}else o&&(removeEventListener(t,a,o,l),i[e]=void 0)}}const optionsModifierRE=/(?:Once|Passive|Capture)$/;function parseName(t){let e;if(optionsModifierRE.test(t)){e={};let r;for(;r=t.match(optionsModifierRE);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):hyphenate(t.slice(2)),e]}let cachedNow=0;const p=Promise.resolve(),getNow=()=>cachedNow||(p.then(()=>cachedNow=0),cachedNow=Date.now());function createInvoker(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;callWithAsyncErrorHandling(patchStopImmediatePropagation(r,n.value),e,5,[r])};return n.value=t,n.attached=getNow(),n}function patchStopImmediatePropagation(t,e){if(isArray$1(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const nativeOnRE=/^on[a-z]/,patchProp=(t,e,n,r,s=!1,i,o,a,l)=>{e==="class"?patchClass(t,r,s):e==="style"?patchStyle(t,n,r):isOn(e)?isModelListener(e)||patchEvent(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):shouldSetAsProp(t,e,r,s))?patchDOMProp(t,e,r,i,o,a,l):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),patchAttr(t,e,r,s))};function shouldSetAsProp(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&nativeOnRE.test(e)&&isFunction(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||nativeOnRE.test(e)&&isString(n)?!1:e in t}const TRANSITION="transition",ANIMATION="animation",Transition=(t,{slots:e})=>h(BaseTransition,resolveTransitionProps(t),e);Transition.displayName="Transition";const DOMTransitionPropsValidators={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},TransitionPropsValidators=Transition.props=extend({},BaseTransition.props,DOMTransitionPropsValidators),callHook=(t,e=[])=>{isArray$1(t)?t.forEach(n=>n(...e)):t&&t(...e)},hasExplicitCallback=t=>t?isArray$1(t)?t.some(e=>e.length>1):t.length>1:!1;function resolveTransitionProps(t){const e={};for(const L in t)L in DOMTransitionPropsValidators||(e[L]=t[L]);if(t.css===!1)return e;const{name:n="v",type:r,duration:s,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=i,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:g=`${n}-leave-to`}=t,E=normalizeDuration(s),S=E&&E[0],M=E&&E[1],{onBeforeEnter:N,onEnter:x,onEnterCancelled:k,onLeave:H,onLeaveCancelled:q,onBeforeAppear:ne=N,onAppear:se=x,onAppearCancelled:V=k}=e,z=(L,Z,oe)=>{removeTransitionClass(L,Z?u:a),removeTransitionClass(L,Z?c:o),oe&&oe()},K=(L,Z)=>{L._isLeaving=!1,removeTransitionClass(L,d),removeTransitionClass(L,g),removeTransitionClass(L,f),Z&&Z()},ie=L=>(Z,oe)=>{const fe=L?se:x,ee=()=>z(Z,L,oe);callHook(fe,[Z,ee]),nextFrame(()=>{removeTransitionClass(Z,L?l:i),addTransitionClass(Z,L?u:a),hasExplicitCallback(fe)||whenTransitionEnds(Z,r,S,ee)})};return extend(e,{onBeforeEnter(L){callHook(N,[L]),addTransitionClass(L,i),addTransitionClass(L,o)},onBeforeAppear(L){callHook(ne,[L]),addTransitionClass(L,l),addTransitionClass(L,c)},onEnter:ie(!1),onAppear:ie(!0),onLeave(L,Z){L._isLeaving=!0;const oe=()=>K(L,Z);addTransitionClass(L,d),forceReflow(),addTransitionClass(L,f),nextFrame(()=>{!L._isLeaving||(removeTransitionClass(L,d),addTransitionClass(L,g),hasExplicitCallback(H)||whenTransitionEnds(L,r,M,oe))}),callHook(H,[L,oe])},onEnterCancelled(L){z(L,!1),callHook(k,[L])},onAppearCancelled(L){z(L,!0),callHook(V,[L])},onLeaveCancelled(L){K(L),callHook(q,[L])}})}function normalizeDuration(t){if(t==null)return null;if(isObject$2(t))return[NumberOf(t.enter),NumberOf(t.leave)];{const e=NumberOf(t);return[e,e]}}function NumberOf(t){return toNumber(t)}function addTransitionClass(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t._vtc||(t._vtc=new Set)).add(e)}function removeTransitionClass(t,e){e.split(/\s+/).forEach(r=>r&&t.classList.remove(r));const{_vtc:n}=t;n&&(n.delete(e),n.size||(t._vtc=void 0))}function nextFrame(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let endId=0;function whenTransitionEnds(t,e,n,r){const s=t._endId=++endId,i=()=>{s===t._endId&&r()};if(n)return setTimeout(i,n);const{type:o,timeout:a,propCount:l}=getTransitionInfo(t,e);if(!o)return r();const c=o+"end";let u=0;const d=()=>{t.removeEventListener(c,f),i()},f=g=>{g.target===t&&++u>=l&&d()};setTimeout(()=>{u<l&&d()},a+1),t.addEventListener(c,f)}function getTransitionInfo(t,e){const n=window.getComputedStyle(t),r=E=>(n[E]||"").split(", "),s=r(`${TRANSITION}Delay`),i=r(`${TRANSITION}Duration`),o=getTimeout(s,i),a=r(`${ANIMATION}Delay`),l=r(`${ANIMATION}Duration`),c=getTimeout(a,l);let u=null,d=0,f=0;e===TRANSITION?o>0&&(u=TRANSITION,d=o,f=i.length):e===ANIMATION?c>0&&(u=ANIMATION,d=c,f=l.length):(d=Math.max(o,c),u=d>0?o>c?TRANSITION:ANIMATION:null,f=u?u===TRANSITION?i.length:l.length:0);const g=u===TRANSITION&&/\b(transform|all)(,|$)/.test(r(`${TRANSITION}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:g}}function getTimeout(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,r)=>toMs(n)+toMs(t[r])))}function toMs(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function forceReflow(){return document.body.offsetHeight}const positionMap=new WeakMap,newPositionMap=new WeakMap,TransitionGroupImpl={name:"TransitionGroup",props:extend({},TransitionPropsValidators,{tag:String,moveClass:String}),setup(t,{slots:e}){const n=getCurrentInstance(),r=useTransitionState();let s,i;return onUpdated(()=>{if(!s.length)return;const o=t.moveClass||`${t.name||"v"}-move`;if(!hasCSSTransform(s[0].el,n.vnode.el,o))return;s.forEach(callPendingCbs),s.forEach(recordPosition);const a=s.filter(applyTranslation);forceReflow(),a.forEach(l=>{const c=l.el,u=c.style;addTransitionClass(c,o),u.transform=u.webkitTransform=u.transitionDuration="";const d=c._moveCb=f=>{f&&f.target!==c||(!f||/transform$/.test(f.propertyName))&&(c.removeEventListener("transitionend",d),c._moveCb=null,removeTransitionClass(c,o))};c.addEventListener("transitionend",d)})}),()=>{const o=toRaw(t),a=resolveTransitionProps(o);let l=o.tag||Fragment;s=i,i=e.default?getTransitionRawChildren(e.default()):[];for(let c=0;c<i.length;c++){const u=i[c];u.key!=null&&setTransitionHooks(u,resolveTransitionHooks(u,a,r,n))}if(s)for(let c=0;c<s.length;c++){const u=s[c];setTransitionHooks(u,resolveTransitionHooks(u,a,r,n)),positionMap.set(u,u.el.getBoundingClientRect())}return createVNode(l,null,i)}}},TransitionGroup=TransitionGroupImpl;function callPendingCbs(t){const e=t.el;e._moveCb&&e._moveCb(),e._enterCb&&e._enterCb()}function recordPosition(t){newPositionMap.set(t,t.el.getBoundingClientRect())}function applyTranslation(t){const e=positionMap.get(t),n=newPositionMap.get(t),r=e.left-n.left,s=e.top-n.top;if(r||s){const i=t.el.style;return i.transform=i.webkitTransform=`translate(${r}px,${s}px)`,i.transitionDuration="0s",t}}function hasCSSTransform(t,e,n){const r=t.cloneNode();t._vtc&&t._vtc.forEach(o=>{o.split(/\s+/).forEach(a=>a&&r.classList.remove(a))}),n.split(/\s+/).forEach(o=>o&&r.classList.add(o)),r.style.display="none";const s=e.nodeType===1?e:e.parentNode;s.appendChild(r);const{hasTransform:i}=getTransitionInfo(r);return s.removeChild(r),i}const getModelAssigner=t=>{const e=t.props["onUpdate:modelValue"]||!1;return isArray$1(e)?n=>invokeArrayFns(e,n):e};function onCompositionStart(t){t.target.composing=!0}function onCompositionEnd(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const vModelText={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t._assign=getModelAssigner(s);const i=r||s.props&&s.props.type==="number";addEventListener(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=toNumber(a)),t._assign(a)}),n&&addEventListener(t,"change",()=>{t.value=t.value.trim()}),e||(addEventListener(t,"compositionstart",onCompositionStart),addEventListener(t,"compositionend",onCompositionEnd),addEventListener(t,"change",onCompositionEnd))},mounted(t,{value:e}){t.value=e==null?"":e},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t._assign=getModelAssigner(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(s||t.type==="number")&&toNumber(t.value)===e))return;const o=e==null?"":e;t.value!==o&&(t.value=o)}},systemModifiers=["ctrl","shift","alt","meta"],modifierGuards={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>systemModifiers.some(n=>t[`${n}Key`]&&!e.includes(n))},withModifiers=(t,e)=>(n,...r)=>{for(let s=0;s<e.length;s++){const i=modifierGuards[e[s]];if(i&&i(n,e))return}return t(n,...r)},vShow={beforeMount(t,{value:e},{transition:n}){t._vod=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):setDisplay(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),setDisplay(t,!0),r.enter(t)):r.leave(t,()=>{setDisplay(t,!1)}):setDisplay(t,e))},beforeUnmount(t,{value:e}){setDisplay(t,e)}};function setDisplay(t,e){t.style.display=e?t._vod:"none"}const rendererOptions=extend({patchProp},nodeOps);let renderer;function ensureRenderer(){return renderer||(renderer=createRenderer(rendererOptions))}const render=(...t)=>{ensureRenderer().render(...t)},createApp=(...t)=>{const e=ensureRenderer().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=normalizeContainer(r);if(!s)return;const i=e._component;!isFunction(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function normalizeContainer(t){return isString(t)?document.querySelector(t):t}function getDevtoolsGlobalHook(){return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__}function getTarget(){return typeof navigator<"u"&&typeof window<"u"?window:typeof global<"u"?global:{}}const isProxyAvailable=typeof Proxy=="function",HOOK_SETUP="devtools-plugin:setup",HOOK_PLUGIN_SETTINGS_SET="plugin:settings:set";let supported,perf;function isPerformanceSupported(){var t;return supported!==void 0||(typeof window<"u"&&window.performance?(supported=!0,perf=window.performance):typeof global<"u"&&((t=global.perf_hooks)===null||t===void 0?void 0:t.performance)?(supported=!0,perf=global.perf_hooks.performance):supported=!1),supported}function now(){return isPerformanceSupported()?perf.now():Date.now()}class ApiProxy{constructor(e,n){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=n;const r={};if(e.settings)for(const o in e.settings){const a=e.settings[o];r[o]=a.defaultValue}const s=`__vue-devtools-plugin-settings__${e.id}`;let i=Object.assign({},r);try{const o=localStorage.getItem(s),a=JSON.parse(o);Object.assign(i,a)}catch{}this.fallbacks={getSettings(){return i},setSettings(o){try{localStorage.setItem(s,JSON.stringify(o))}catch{}i=o},now(){return now()}},n&&n.on(HOOK_PLUGIN_SETTINGS_SET,(o,a)=>{o===this.plugin.id&&this.fallbacks.setSettings(a)}),this.proxiedOn=new Proxy({},{get:(o,a)=>this.target?this.target.on[a]:(...l)=>{this.onQueue.push({method:a,args:l})}}),this.proxiedTarget=new Proxy({},{get:(o,a)=>this.target?this.target[a]:a==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(a)?(...l)=>(this.targetQueue.push({method:a,args:l,resolve:()=>{}}),this.fallbacks[a](...l)):(...l)=>new Promise(c=>{this.targetQueue.push({method:a,args:l,resolve:c})})})}async setRealTarget(e){this.target=e;for(const n of this.onQueue)this.target.on[n.method](...n.args);for(const n of this.targetQueue)n.resolve(await this.target[n.method](...n.args))}}function setupDevtoolsPlugin(t,e){const n=t,r=getTarget(),s=getDevtoolsGlobalHook(),i=isProxyAvailable&&n.enableEarlyProxy;if(s&&(r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!i))s.emit(HOOK_SETUP,t,e);else{const o=i?new ApiProxy(n,s):null;(r.__VUE_DEVTOOLS_PLUGINS__=r.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:n,setupFn:e,proxy:o}),o&&e(o.proxiedTarget)}}/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const isBrowser=typeof window<"u";function isESModule(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const assign=Object.assign;function applyToParams(t,e){const n={};for(const r in e){const s=e[r];n[r]=isArray(s)?s.map(t):t(s)}return n}const noop$1=()=>{},isArray=Array.isArray,TRAILING_SLASH_RE=/\/$/,removeTrailingSlash=t=>t.replace(TRAILING_SLASH_RE,"");function parseURL(t,e,n="/"){let r,s={},i="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(r=e.slice(0,l),i=e.slice(l+1,a>-1?a:e.length),s=t(i)),a>-1&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=resolveRelativePath(r!=null?r:e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:o}}function stringifyURL(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function stripBase(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function isSameRouteLocation(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&isSameRouteRecord(e.matched[r],n.matched[s])&&isSameRouteLocationParams(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function isSameRouteRecord(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function isSameRouteLocationParams(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!isSameRouteLocationParamsValue(t[n],e[n]))return!1;return!0}function isSameRouteLocationParamsValue(t,e){return isArray(t)?isEquivalentArray(t,e):isArray(e)?isEquivalentArray(e,t):t===e}function isEquivalentArray(t,e){return isArray(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function resolveRelativePath(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/");let s=n.length-1,i,o;for(i=0;i<r.length;i++)if(o=r[i],o!==".")if(o==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+r.slice(i-(i===r.length?1:0)).join("/")}var NavigationType;(function(t){t.pop="pop",t.push="push"})(NavigationType||(NavigationType={}));var NavigationDirection;(function(t){t.back="back",t.forward="forward",t.unknown=""})(NavigationDirection||(NavigationDirection={}));function normalizeBase(t){if(!t)if(isBrowser){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),removeTrailingSlash(t)}const BEFORE_HASH_RE=/^[^#]+#/;function createHref(t,e){return t.replace(BEFORE_HASH_RE,"#")+e}function getElementPosition(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const computeScrollPosition=()=>({left:window.pageXOffset,top:window.pageYOffset});function scrollToPosition(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=getElementPosition(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function getScrollKey(t,e){return(history.state?history.state.position-e:-1)+t}const scrollPositions=new Map;function saveScrollPosition(t,e){scrollPositions.set(t,e)}function getSavedScrollPosition(t){const e=scrollPositions.get(t);return scrollPositions.delete(t),e}let createBaseLocation=()=>location.protocol+"//"+location.host;function createCurrentLocation(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let a=s.includes(t.slice(i))?t.slice(i).length:1,l=s.slice(a);return l[0]!=="/"&&(l="/"+l),stripBase(l,"")}return stripBase(n,t)+r+s}function useHistoryListeners(t,e,n,r){let s=[],i=[],o=null;const a=({state:f})=>{const g=createCurrentLocation(t,location),E=n.value,S=e.value;let M=0;if(f){if(n.value=g,e.value=f,o&&o===E){o=null;return}M=S?f.position-S.position:0}else r(g);s.forEach(N=>{N(n.value,E,{delta:M,type:NavigationType.pop,direction:M?M>0?NavigationDirection.forward:NavigationDirection.back:NavigationDirection.unknown})})};function l(){o=n.value}function c(f){s.push(f);const g=()=>{const E=s.indexOf(f);E>-1&&s.splice(E,1)};return i.push(g),g}function u(){const{history:f}=window;!f.state||f.replaceState(assign({},f.state,{scroll:computeScrollPosition()}),"")}function d(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u),{pauseListeners:l,listen:c,destroy:d}}function buildState(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?computeScrollPosition():null}}function useHistoryStateNavigation(t){const{history:e,location:n}=window,r={value:createCurrentLocation(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,c,u){const d=t.indexOf("#"),f=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+l:createBaseLocation()+t+l;try{e[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(g){console.error(g),n[u?"replace":"assign"](f)}}function o(l,c){const u=assign({},e.state,buildState(s.value.back,l,s.value.forward,!0),c,{position:s.value.position});i(l,u,!0),r.value=l}function a(l,c){const u=assign({},s.value,e.state,{forward:l,scroll:computeScrollPosition()});i(u.current,u,!0);const d=assign({},buildState(r.value,l,null),{position:u.position+1},c);i(l,d,!1),r.value=l}return{location:r,state:s,push:a,replace:o}}function createWebHistory(t){t=normalizeBase(t);const e=useHistoryStateNavigation(t),n=useHistoryListeners(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=assign({location:"",base:t,go:r,createHref:createHref.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function createWebHashHistory(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),createWebHistory(t)}function isRouteLocation(t){return typeof t=="string"||t&&typeof t=="object"}function isRouteName(t){return typeof t=="string"||typeof t=="symbol"}const START_LOCATION_NORMALIZED={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},NavigationFailureSymbol=Symbol("");var NavigationFailureType;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(NavigationFailureType||(NavigationFailureType={}));function createRouterError(t,e){return assign(new Error,{type:t,[NavigationFailureSymbol]:!0},e)}function isNavigationFailure(t,e){return t instanceof Error&&NavigationFailureSymbol in t&&(e==null||!!(t.type&e))}const BASE_PARAM_PATTERN="[^/]+?",BASE_PATH_PARSER_OPTIONS={sensitive:!1,strict:!1,start:!0,end:!0},REGEX_CHARS_RE=/[.+*?^${}()[\]/\\]/g;function tokensToParser(t,e){const n=assign({},BASE_PATH_PARSER_OPTIONS,e),r=[];let s=n.start?"^":"";const i=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(s+="/");for(let d=0;d<c.length;d++){const f=c[d];let g=40+(n.sensitive?.25:0);if(f.type===0)d||(s+="/"),s+=f.value.replace(REGEX_CHARS_RE,"\\$&"),g+=40;else if(f.type===1){const{value:E,repeatable:S,optional:M,regexp:N}=f;i.push({name:E,repeatable:S,optional:M});const x=N||BASE_PARAM_PATTERN;if(x!==BASE_PARAM_PATTERN){g+=10;try{new RegExp(`(${x})`)}catch(H){throw new Error(`Invalid custom RegExp for param "${E}" (${x}): `+H.message)}}let k=S?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;d||(k=M&&c.length<2?`(?:/${k})`:"/"+k),M&&(k+="?"),s+=k,g+=20,M&&(g+=-8),S&&(g+=-20),x===".*"&&(g+=-50)}u.push(g)}r.push(u)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(c){const u=c.match(o),d={};if(!u)return null;for(let f=1;f<u.length;f++){const g=u[f]||"",E=i[f-1];d[E.name]=g&&E.repeatable?g.split("/"):g}return d}function l(c){let u="",d=!1;for(const f of t){(!d||!u.endsWith("/"))&&(u+="/"),d=!1;for(const g of f)if(g.type===0)u+=g.value;else if(g.type===1){const{value:E,repeatable:S,optional:M}=g,N=E in c?c[E]:"";if(isArray(N)&&!S)throw new Error(`Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`);const x=isArray(N)?N.join("/"):N;if(!x)if(M)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):d=!0);else throw new Error(`Missing required param "${E}"`);u+=x}}return u||"/"}return{re:o,score:r,keys:i,parse:a,stringify:l}}function compareScoreArray(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function comparePathParserScore(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=compareScoreArray(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(isLastScoreNegative(r))return 1;if(isLastScoreNegative(s))return-1}return s.length-r.length}function isLastScoreNegative(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const ROOT_TOKEN={type:0,value:""},VALID_PARAM_RE=/[a-zA-Z0-9_]/;function tokenizePath(t){if(!t)return[[]];if(t==="/")return[[ROOT_TOKEN]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${c}": ${g}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,l,c="",u="";function d(){!c||(n===0?i.push({type:0,value:c}):n===1||n===2||n===3?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:l==="/"?(c&&d(),o()):l===":"?(d(),n=1):f();break;case 4:f(),n=r;break;case 1:l==="("?n=2:VALID_PARAM_RE.test(l)?f():(d(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=3:u+=l;break;case 3:d(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),d(),o(),s}function createRouteRecordMatcher(t,e,n){const r=tokensToParser(tokenizePath(t.path),n),s=assign(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function createRouterMatcher(t,e){const n=[],r=new Map;e=mergeOptions({strict:!1,end:!0,sensitive:!1},e);function s(u){return r.get(u)}function i(u,d,f){const g=!f,E=normalizeRouteRecord(u);E.aliasOf=f&&f.record;const S=mergeOptions(e,u),M=[E];if("alias"in u){const k=typeof u.alias=="string"?[u.alias]:u.alias;for(const H of k)M.push(assign({},E,{components:f?f.record.components:E.components,path:H,aliasOf:f?f.record:E}))}let N,x;for(const k of M){const{path:H}=k;if(d&&H[0]!=="/"){const q=d.record.path,ne=q[q.length-1]==="/"?"":"/";k.path=d.record.path+(H&&ne+H)}if(N=createRouteRecordMatcher(k,d,S),f?f.alias.push(N):(x=x||N,x!==N&&x.alias.push(N),g&&u.name&&!isAliasRecord(N)&&o(u.name)),E.children){const q=E.children;for(let ne=0;ne<q.length;ne++)i(q[ne],N,f&&f.children[ne])}f=f||N,(N.record.components&&Object.keys(N.record.components).length||N.record.name||N.record.redirect)&&l(N)}return x?()=>{o(x)}:noop$1}function o(u){if(isRouteName(u)){const d=r.get(u);d&&(r.delete(u),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(u);d>-1&&(n.splice(d,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return n}function l(u){let d=0;for(;d<n.length&&comparePathParserScore(u,n[d])>=0&&(u.record.path!==n[d].record.path||!isRecordChildOf(u,n[d]));)d++;n.splice(d,0,u),u.record.name&&!isAliasRecord(u)&&r.set(u.record.name,u)}function c(u,d){let f,g={},E,S;if("name"in u&&u.name){if(f=r.get(u.name),!f)throw createRouterError(1,{location:u});S=f.record.name,g=assign(paramsFromLocation(d.params,f.keys.filter(x=>!x.optional).map(x=>x.name)),u.params&&paramsFromLocation(u.params,f.keys.map(x=>x.name))),E=f.stringify(g)}else if("path"in u)E=u.path,f=n.find(x=>x.re.test(E)),f&&(g=f.parse(E),S=f.record.name);else{if(f=d.name?r.get(d.name):n.find(x=>x.re.test(d.path)),!f)throw createRouterError(1,{location:u,currentLocation:d});S=f.record.name,g=assign({},d.params,u.params),E=f.stringify(g)}const M=[];let N=f;for(;N;)M.unshift(N.record),N=N.parent;return{name:S,path:E,params:g,matched:M,meta:mergeMetaFields(M)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:c,removeRoute:o,getRoutes:a,getRecordMatcher:s}}function paramsFromLocation(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function normalizeRouteRecord(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:normalizeRecordProps(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function normalizeRecordProps(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="boolean"?n:n[r];return e}function isAliasRecord(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function mergeMetaFields(t){return t.reduce((e,n)=>assign(e,n.meta),{})}function mergeOptions(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function isRecordChildOf(t,e){return e.children.some(n=>n===t||isRecordChildOf(t,n))}const HASH_RE=/#/g,AMPERSAND_RE=/&/g,SLASH_RE=/\//g,EQUAL_RE=/=/g,IM_RE=/\?/g,PLUS_RE=/\+/g,ENC_BRACKET_OPEN_RE=/%5B/g,ENC_BRACKET_CLOSE_RE=/%5D/g,ENC_CARET_RE=/%5E/g,ENC_BACKTICK_RE=/%60/g,ENC_CURLY_OPEN_RE=/%7B/g,ENC_PIPE_RE=/%7C/g,ENC_CURLY_CLOSE_RE=/%7D/g,ENC_SPACE_RE=/%20/g;function commonEncode(t){return encodeURI(""+t).replace(ENC_PIPE_RE,"|").replace(ENC_BRACKET_OPEN_RE,"[").replace(ENC_BRACKET_CLOSE_RE,"]")}function encodeHash(t){return commonEncode(t).replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryValue(t){return commonEncode(t).replace(PLUS_RE,"%2B").replace(ENC_SPACE_RE,"+").replace(HASH_RE,"%23").replace(AMPERSAND_RE,"%26").replace(ENC_BACKTICK_RE,"`").replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryKey(t){return encodeQueryValue(t).replace(EQUAL_RE,"%3D")}function encodePath(t){return commonEncode(t).replace(HASH_RE,"%23").replace(IM_RE,"%3F")}function encodeParam(t){return t==null?"":encodePath(t).replace(SLASH_RE,"%2F")}function decode$1(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function parseQuery(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(PLUS_RE," "),o=i.indexOf("="),a=decode$1(o<0?i:i.slice(0,o)),l=o<0?null:decode$1(i.slice(o+1));if(a in e){let c=e[a];isArray(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function stringifyQuery(t){let e="";for(let n in t){const r=t[n];if(n=encodeQueryKey(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(isArray(r)?r.map(i=>i&&encodeQueryValue(i)):[r&&encodeQueryValue(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function normalizeQuery(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=isArray(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const matchedRouteKey=Symbol(""),viewDepthKey=Symbol(""),routerKey=Symbol(""),routeLocationKey=Symbol(""),routerViewLocationKey=Symbol("");function useCallbacks(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t,reset:n}}function guardToPromiseFn(t,e,n,r,s){const i=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,a)=>{const l=d=>{d===!1?a(createRouterError(4,{from:n,to:e})):d instanceof Error?a(d):isRouteLocation(d)?a(createRouterError(2,{from:e,to:d})):(i&&r.enterCallbacks[s]===i&&typeof d=="function"&&i.push(d),o())},c=t.call(r&&r.instances[s],e,n,l);let u=Promise.resolve(c);t.length<3&&(u=u.then(l)),u.catch(d=>a(d))})}function extractComponentsGuards(t,e,n,r){const s=[];for(const i of t)for(const o in i.components){let a=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(isRouteComponent(a)){const c=(a.__vccOpts||a)[e];c&&s.push(guardToPromiseFn(c,n,r,i,o))}else{let l=a();s.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=isESModule(c)?c.default:c;i.components[o]=u;const f=(u.__vccOpts||u)[e];return f&&guardToPromiseFn(f,n,r,i,o)()}))}}return s}function isRouteComponent(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function useLink(t){const e=inject(routerKey),n=inject(routeLocationKey),r=computed(()=>e.resolve(unref(t.to))),s=computed(()=>{const{matched:l}=r.value,{length:c}=l,u=l[c-1],d=n.matched;if(!u||!d.length)return-1;const f=d.findIndex(isSameRouteRecord.bind(null,u));if(f>-1)return f;const g=getOriginalPath(l[c-2]);return c>1&&getOriginalPath(u)===g&&d[d.length-1].path!==g?d.findIndex(isSameRouteRecord.bind(null,l[c-2])):f}),i=computed(()=>s.value>-1&&includesParams(n.params,r.value.params)),o=computed(()=>s.value>-1&&s.value===n.matched.length-1&&isSameRouteLocationParams(n.params,r.value.params));function a(l={}){return guardEvent(l)?e[unref(t.replace)?"replace":"push"](unref(t.to)).catch(noop$1):Promise.resolve()}return{route:r,href:computed(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}const RouterLinkImpl=defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink,setup(t,{slots:e}){const n=reactive(useLink(t)),{options:r}=inject(routerKey),s=computed(()=>({[getLinkClass(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[getLinkClass(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:h("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),RouterLink=RouterLinkImpl;function guardEvent(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function includesParams(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!isArray(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function getOriginalPath(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const getLinkClass=(t,e,n)=>t!=null?t:e!=null?e:n,RouterViewImpl=defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=inject(routerViewLocationKey),s=computed(()=>t.route||r.value),i=inject(viewDepthKey,0),o=computed(()=>{let c=unref(i);const{matched:u}=s.value;let d;for(;(d=u[c])&&!d.components;)c++;return c}),a=computed(()=>s.value.matched[o.value]);provide(viewDepthKey,computed(()=>o.value+1)),provide(matchedRouteKey,a),provide(routerViewLocationKey,s);const l=ref();return watch(()=>[l.value,a.value,t.name],([c,u,d],[f,g,E])=>{u&&(u.instances[d]=c,g&&g!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=g.leaveGuards),u.updateGuards.size||(u.updateGuards=g.updateGuards))),c&&u&&(!g||!isSameRouteRecord(u,g)||!f)&&(u.enterCallbacks[d]||[]).forEach(S=>S(c))},{flush:"post"}),()=>{const c=s.value,u=t.name,d=a.value,f=d&&d.components[u];if(!f)return normalizeSlot(n.default,{Component:f,route:c});const g=d.props[u],E=g?g===!0?c.params:typeof g=="function"?g(c):g:null,M=h(f,assign({},E,e,{onVnodeUnmounted:N=>{N.component.isUnmounted&&(d.instances[u]=null)},ref:l}));return normalizeSlot(n.default,{Component:M,route:c})||M}}});function normalizeSlot(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const RouterView=RouterViewImpl;function createRouter(t){const e=createRouterMatcher(t.routes,t),n=t.parseQuery||parseQuery,r=t.stringifyQuery||stringifyQuery,s=t.history,i=useCallbacks(),o=useCallbacks(),a=useCallbacks(),l=shallowRef(START_LOCATION_NORMALIZED);let c=START_LOCATION_NORMALIZED;isBrowser&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=applyToParams.bind(null,T=>""+T),d=applyToParams.bind(null,encodeParam),f=applyToParams.bind(null,decode$1);function g(T,P){let A,F;return isRouteName(T)?(A=e.getRecordMatcher(T),F=P):F=T,e.addRoute(F,A)}function E(T){const P=e.getRecordMatcher(T);P&&e.removeRoute(P)}function S(){return e.getRoutes().map(T=>T.record)}function M(T){return!!e.getRecordMatcher(T)}function N(T,P){if(P=assign({},P||l.value),typeof T=="string"){const _=parseURL(n,T,P.path),m=e.resolve({path:_.path},P),y=s.createHref(_.fullPath);return assign(_,m,{params:f(m.params),hash:decode$1(_.hash),redirectedFrom:void 0,href:y})}let A;if("path"in T)A=assign({},T,{path:parseURL(n,T.path,P.path).path});else{const _=assign({},T.params);for(const m in _)_[m]==null&&delete _[m];A=assign({},T,{params:d(T.params)}),P.params=d(P.params)}const F=e.resolve(A,P),j=T.hash||"";F.params=u(f(F.params));const te=stringifyURL(r,assign({},T,{hash:encodeHash(j),path:F.path})),W=s.createHref(te);return assign({fullPath:te,hash:j,query:r===stringifyQuery?normalizeQuery(T.query):T.query||{}},F,{redirectedFrom:void 0,href:W})}function x(T){return typeof T=="string"?parseURL(n,T,l.value.path):assign({},T)}function k(T,P){if(c!==T)return createRouterError(8,{from:P,to:T})}function H(T){return se(T)}function q(T){return H(assign(x(T),{replace:!0}))}function ne(T){const P=T.matched[T.matched.length-1];if(P&&P.redirect){const{redirect:A}=P;let F=typeof A=="function"?A(T):A;return typeof F=="string"&&(F=F.includes("?")||F.includes("#")?F=x(F):{path:F},F.params={}),assign({query:T.query,hash:T.hash,params:"path"in F?{}:T.params},F)}}function se(T,P){const A=c=N(T),F=l.value,j=T.state,te=T.force,W=T.replace===!0,_=ne(A);if(_)return se(assign(x(_),{state:typeof _=="object"?assign({},j,_.state):j,force:te,replace:W}),P||A);const m=A;m.redirectedFrom=P;let y;return!te&&isSameRouteLocation(r,F,A)&&(y=createRouterError(16,{to:m,from:F}),pe(F,F,!0,!1)),(y?Promise.resolve(y):z(m,F)).catch(v=>isNavigationFailure(v)?isNavigationFailure(v,2)?v:ce(v):J(v,m,F)).then(v=>{if(v){if(isNavigationFailure(v,2))return se(assign({replace:W},x(v.to),{state:typeof v.to=="object"?assign({},j,v.to.state):j,force:te}),P||m)}else v=ie(m,F,!0,W,j);return K(m,F,v),v})}function V(T,P){const A=k(T,P);return A?Promise.reject(A):Promise.resolve()}function z(T,P){let A;const[F,j,te]=extractChangingRecords(T,P);A=extractComponentsGuards(F.reverse(),"beforeRouteLeave",T,P);for(const _ of F)_.leaveGuards.forEach(m=>{A.push(guardToPromiseFn(m,T,P))});const W=V.bind(null,T,P);return A.push(W),runGuardQueue(A).then(()=>{A=[];for(const _ of i.list())A.push(guardToPromiseFn(_,T,P));return A.push(W),runGuardQueue(A)}).then(()=>{A=extractComponentsGuards(j,"beforeRouteUpdate",T,P);for(const _ of j)_.updateGuards.forEach(m=>{A.push(guardToPromiseFn(m,T,P))});return A.push(W),runGuardQueue(A)}).then(()=>{A=[];for(const _ of T.matched)if(_.beforeEnter&&!P.matched.includes(_))if(isArray(_.beforeEnter))for(const m of _.beforeEnter)A.push(guardToPromiseFn(m,T,P));else A.push(guardToPromiseFn(_.beforeEnter,T,P));return A.push(W),runGuardQueue(A)}).then(()=>(T.matched.forEach(_=>_.enterCallbacks={}),A=extractComponentsGuards(te,"beforeRouteEnter",T,P),A.push(W),runGuardQueue(A))).then(()=>{A=[];for(const _ of o.list())A.push(guardToPromiseFn(_,T,P));return A.push(W),runGuardQueue(A)}).catch(_=>isNavigationFailure(_,8)?_:Promise.reject(_))}function K(T,P,A){for(const F of a.list())F(T,P,A)}function ie(T,P,A,F,j){const te=k(T,P);if(te)return te;const W=P===START_LOCATION_NORMALIZED,_=isBrowser?history.state:{};A&&(F||W?s.replace(T.fullPath,assign({scroll:W&&_&&_.scroll},j)):s.push(T.fullPath,j)),l.value=T,pe(T,P,A,W),ce()}let L;function Z(){L||(L=s.listen((T,P,A)=>{if(!ye.listening)return;const F=N(T),j=ne(F);if(j){se(assign(j,{replace:!0}),F).catch(noop$1);return}c=F;const te=l.value;isBrowser&&saveScrollPosition(getScrollKey(te.fullPath,A.delta),computeScrollPosition()),z(F,te).catch(W=>isNavigationFailure(W,12)?W:isNavigationFailure(W,2)?(se(W.to,F).then(_=>{isNavigationFailure(_,20)&&!A.delta&&A.type===NavigationType.pop&&s.go(-1,!1)}).catch(noop$1),Promise.reject()):(A.delta&&s.go(-A.delta,!1),J(W,F,te))).then(W=>{W=W||ie(F,te,!1),W&&(A.delta&&!isNavigationFailure(W,8)?s.go(-A.delta,!1):A.type===NavigationType.pop&&isNavigationFailure(W,20)&&s.go(-1,!1)),K(F,te,W)}).catch(noop$1)}))}let oe=useCallbacks(),fe=useCallbacks(),ee;function J(T,P,A){ce(T);const F=fe.list();return F.length?F.forEach(j=>j(T,P,A)):console.error(T),Promise.reject(T)}function Y(){return ee&&l.value!==START_LOCATION_NORMALIZED?Promise.resolve():new Promise((T,P)=>{oe.add([T,P])})}function ce(T){return ee||(ee=!T,Z(),oe.list().forEach(([P,A])=>T?A(T):P()),oe.reset()),T}function pe(T,P,A,F){const{scrollBehavior:j}=t;if(!isBrowser||!j)return Promise.resolve();const te=!A&&getSavedScrollPosition(getScrollKey(T.fullPath,0))||(F||!A)&&history.state&&history.state.scroll||null;return nextTick().then(()=>j(T,P,te)).then(W=>W&&scrollToPosition(W)).catch(W=>J(W,T,P))}const ue=T=>s.go(T);let ae;const _e=new Set,ye={currentRoute:l,listening:!0,addRoute:g,removeRoute:E,hasRoute:M,getRoutes:S,resolve:N,options:t,push:H,replace:q,go:ue,back:()=>ue(-1),forward:()=>ue(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:fe.add,isReady:Y,install(T){const P=this;T.component("RouterLink",RouterLink),T.component("RouterView",RouterView),T.config.globalProperties.$router=P,Object.defineProperty(T.config.globalProperties,"$route",{enumerable:!0,get:()=>unref(l)}),isBrowser&&!ae&&l.value===START_LOCATION_NORMALIZED&&(ae=!0,H(s.location).catch(j=>{}));const A={};for(const j in START_LOCATION_NORMALIZED)A[j]=computed(()=>l.value[j]);T.provide(routerKey,P),T.provide(routeLocationKey,reactive(A)),T.provide(routerViewLocationKey,l);const F=T.unmount;_e.add(T),T.unmount=function(){_e.delete(T),_e.size<1&&(c=START_LOCATION_NORMALIZED,L&&L(),L=null,l.value=START_LOCATION_NORMALIZED,ae=!1,ee=!1),F()}}};return ye}function runGuardQueue(t){return t.reduce((e,n)=>e.then(()=>n()),Promise.resolve())}function extractChangingRecords(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(c=>isSameRouteRecord(c,a))?r.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(c=>isSameRouteRecord(c,l))||s.push(l))}return[n,r,s]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CONSTANTS={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const assert=function(t,e){if(!t)throw assertionError(e)},assertionError=function(t){return new Error("Firebase Database ("+CONSTANTS.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const stringToByteArray$1=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},byteArrayToString=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},base64={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let f=(a&15)<<2|c>>6,g=c&63;l||(g=64,o||(f=64)),r.push(n[u],n[d],n[f],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(stringToByteArray$1(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):byteArrayToString(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||c==null||d==null)throw Error();const f=i<<2|a>>4;if(r.push(f),c!==64){const g=a<<4&240|c>>2;if(r.push(g),d!==64){const E=c<<6&192|d;r.push(E)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},base64Encode=function(t){const e=stringToByteArray$1(t);return base64.encodeByteArray(e,!0)},base64urlEncodeWithoutPadding=function(t){return base64Encode(t).replace(/\./g,"")},base64Decode=function(t){try{return base64.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function deepCopy(t){return deepExtend(void 0,t)}function deepExtend(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!isValidKey$1(n)||(t[n]=deepExtend(t[n],e[n]));return t}function isValidKey$1(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getUA(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function isMobileCordova(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA())}function isBrowserExtension(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function isReactNative(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function isIE(){const t=getUA();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function isNodeSdk(){return CONSTANTS.NODE_ADMIN===!0}function isIndexedDBAvailable(){return typeof indexedDB=="object"}function validateIndexedDBOpenable(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function getGlobal(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const getDefaultsFromGlobal=()=>getGlobal().__FIREBASE_DEFAULTS__,getDefaultsFromEnvVariable=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},getDefaultsFromCookie=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&base64Decode(t[1]);return e&&JSON.parse(e)},getDefaults=()=>{try{return getDefaultsFromGlobal()||getDefaultsFromEnvVariable()||getDefaultsFromCookie()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},getDefaultEmulatorHost=t=>{var e,n;return(n=(e=getDefaults())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},getDefaultAppConfig=()=>{var t;return(t=getDefaults())===null||t===void 0?void 0:t.config},getExperimentalSetting=t=>{var e;return(e=getDefaults())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Deferred{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ERROR_NAME="FirebaseError";class FirebaseError extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=ERROR_NAME,Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?replaceTemplate(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new FirebaseError(s,a,r)}}function replaceTemplate(t,e){return t.replace(PATTERN,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const PATTERN=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jsonEval(t){return JSON.parse(t)}function stringify(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const decode=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=jsonEval(base64Decode(i[0])||""),n=jsonEval(base64Decode(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},isValidFormat=function(t){const e=decode(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},isAdmin=function(t){const e=decode(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function contains(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function safeGet(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function isEmpty(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function map(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function deepEqual(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(isObject$1(i)&&isObject$1(o)){if(!deepEqual(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function isObject$1(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function querystring(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function querystringDecode(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function extractQuerystring(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sha1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)r[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const f=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(f<<1|f>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let d=0;d<80;d++){d<40?d<20?(c=a^i&(o^a),u=1518500249):(c=i^o^a,u=1859775393):d<60?(c=i&o|a&(i|o),u=2400959708):(c=i^o^a,u=3395469782);const f=(s<<5|s>>>27)+c+l+u+r[d]&4294967295;l=a,a=o,o=(i<<30|i>>>2)&4294967295,i=s,s=f}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function createSubscribe(t,e){const n=new ObserverProxy(t,e);return n.subscribe.bind(n)}class ObserverProxy{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");implementsAnyMethods(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=noop),s.error===void 0&&(s.error=noop),s.complete===void 0&&(s.complete=noop);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function implementsAnyMethods(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function noop(){}function errorPrefix(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const stringToByteArray=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,assert(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},stringLength=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getModularInstance(t){return t&&t._delegate?t._delegate:t}class Component{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_ENTRY_NAME$1="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Provider{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Deferred;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(isComponentEager(e))try{this.getOrInitializeService({instanceIdentifier:DEFAULT_ENTRY_NAME$1})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=DEFAULT_ENTRY_NAME$1){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=DEFAULT_ENTRY_NAME$1){return this.instances.has(e)}getOptions(e=DEFAULT_ENTRY_NAME$1){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(!!r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:normalizeIdentifierForFactory(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=DEFAULT_ENTRY_NAME$1){return this.component?this.component.multipleInstances?e:DEFAULT_ENTRY_NAME$1:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function normalizeIdentifierForFactory(t){return t===DEFAULT_ENTRY_NAME$1?void 0:t}function isComponentEager(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ComponentContainer{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Provider(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var LogLevel;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(LogLevel||(LogLevel={}));const levelStringToEnum={debug:LogLevel.DEBUG,verbose:LogLevel.VERBOSE,info:LogLevel.INFO,warn:LogLevel.WARN,error:LogLevel.ERROR,silent:LogLevel.SILENT},defaultLogLevel=LogLevel.INFO,ConsoleMethod={[LogLevel.DEBUG]:"log",[LogLevel.VERBOSE]:"log",[LogLevel.INFO]:"info",[LogLevel.WARN]:"warn",[LogLevel.ERROR]:"error"},defaultLogHandler=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=ConsoleMethod[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Logger{constructor(e){this.name=e,this._logLevel=defaultLogLevel,this._logHandler=defaultLogHandler,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in LogLevel))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?levelStringToEnum[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.DEBUG,...e),this._logHandler(this,LogLevel.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.VERBOSE,...e),this._logHandler(this,LogLevel.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.INFO,...e),this._logHandler(this,LogLevel.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.WARN,...e),this._logHandler(this,LogLevel.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.ERROR,...e),this._logHandler(this,LogLevel.ERROR,...e)}}const instanceOfAny=(t,e)=>e.some(n=>t instanceof n);let idbProxyableTypes,cursorAdvanceMethods;function getIdbProxyableTypes(){return idbProxyableTypes||(idbProxyableTypes=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function getCursorAdvanceMethods(){return cursorAdvanceMethods||(cursorAdvanceMethods=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cursorRequestMap=new WeakMap,transactionDoneMap=new WeakMap,transactionStoreNamesMap=new WeakMap,transformCache=new WeakMap,reverseTransformCache=new WeakMap;function promisifyRequest(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(wrap(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&cursorRequestMap.set(n,t)}).catch(()=>{}),reverseTransformCache.set(e,t),e}function cacheDonePromiseForTransaction(t){if(transactionDoneMap.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});transactionDoneMap.set(t,e)}let idbProxyTraps={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return transactionDoneMap.get(t);if(e==="objectStoreNames")return t.objectStoreNames||transactionStoreNamesMap.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wrap(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function replaceTraps(t){idbProxyTraps=t(idbProxyTraps)}function wrapFunction(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(unwrap(this),e,...n);return transactionStoreNamesMap.set(r,e.sort?e.sort():[e]),wrap(r)}:getCursorAdvanceMethods().includes(t)?function(...e){return t.apply(unwrap(this),e),wrap(cursorRequestMap.get(this))}:function(...e){return wrap(t.apply(unwrap(this),e))}}function transformCachableValue(t){return typeof t=="function"?wrapFunction(t):(t instanceof IDBTransaction&&cacheDonePromiseForTransaction(t),instanceOfAny(t,getIdbProxyableTypes())?new Proxy(t,idbProxyTraps):t)}function wrap(t){if(t instanceof IDBRequest)return promisifyRequest(t);if(transformCache.has(t))return transformCache.get(t);const e=transformCachableValue(t);return e!==t&&(transformCache.set(t,e),reverseTransformCache.set(e,t)),e}const unwrap=t=>reverseTransformCache.get(t);function openDB(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=wrap(o);return r&&o.addEventListener("upgradeneeded",l=>{r(wrap(o.result),l.oldVersion,l.newVersion,wrap(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",()=>s())}).catch(()=>{}),a}const readMethods=["get","getKey","getAll","getAllKeys","count"],writeMethods=["put","add","delete","clear"],cachedMethods=new Map;function getMethod(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(cachedMethods.get(e))return cachedMethods.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=writeMethods.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||readMethods.includes(n)))return;const i=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return cachedMethods.set(e,i),i}replaceTraps(t=>({...t,get:(e,n,r)=>getMethod(e,n)||t.get(e,n,r),has:(e,n)=>!!getMethod(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PlatformLoggerServiceImpl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(isVersionServiceProvider(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function isVersionServiceProvider(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const name$o="@firebase/app",version$1$1="0.8.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const logger$1=new Logger("@firebase/app"),name$n="@firebase/app-compat",name$m="@firebase/analytics-compat",name$l="@firebase/analytics",name$k="@firebase/app-check-compat",name$j="@firebase/app-check",name$i="@firebase/auth",name$h="@firebase/auth-compat",name$g="@firebase/database",name$f="@firebase/database-compat",name$e="@firebase/functions",name$d="@firebase/functions-compat",name$c="@firebase/installations",name$b="@firebase/installations-compat",name$a="@firebase/messaging",name$9="@firebase/messaging-compat",name$8="@firebase/performance",name$7="@firebase/performance-compat",name$6="@firebase/remote-config",name$5="@firebase/remote-config-compat",name$4="@firebase/storage",name$3="@firebase/storage-compat",name$2$1="@firebase/firestore",name$1$1="@firebase/firestore-compat",name$p="firebase",version$3="9.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_ENTRY_NAME="[DEFAULT]",PLATFORM_LOG_STRING={[name$o]:"fire-core",[name$n]:"fire-core-compat",[name$l]:"fire-analytics",[name$m]:"fire-analytics-compat",[name$j]:"fire-app-check",[name$k]:"fire-app-check-compat",[name$i]:"fire-auth",[name$h]:"fire-auth-compat",[name$g]:"fire-rtdb",[name$f]:"fire-rtdb-compat",[name$e]:"fire-fn",[name$d]:"fire-fn-compat",[name$c]:"fire-iid",[name$b]:"fire-iid-compat",[name$a]:"fire-fcm",[name$9]:"fire-fcm-compat",[name$8]:"fire-perf",[name$7]:"fire-perf-compat",[name$6]:"fire-rc",[name$5]:"fire-rc-compat",[name$4]:"fire-gcs",[name$3]:"fire-gcs-compat",[name$2$1]:"fire-fst",[name$1$1]:"fire-fst-compat","fire-js":"fire-js",[name$p]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _apps=new Map,_components=new Map;function _addComponent(t,e){try{t.container.addComponent(e)}catch(n){logger$1.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function _registerComponent(t){const e=t.name;if(_components.has(e))return logger$1.debug(`There were multiple attempts to register component ${e}.`),!1;_components.set(e,t);for(const n of _apps.values())_addComponent(n,t);return!0}function _getProvider(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ERRORS={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},ERROR_FACTORY=new ErrorFactory("app","Firebase",ERRORS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FirebaseAppImpl{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ERROR_FACTORY.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SDK_VERSION$1=version$3;function initializeApp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:DEFAULT_ENTRY_NAME,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ERROR_FACTORY.create("bad-app-name",{appName:String(s)});if(n||(n=getDefaultAppConfig()),!n)throw ERROR_FACTORY.create("no-options");const i=_apps.get(s);if(i){if(deepEqual(n,i.options)&&deepEqual(r,i.config))return i;throw ERROR_FACTORY.create("duplicate-app",{appName:s})}const o=new ComponentContainer(s);for(const l of _components.values())o.addComponent(l);const a=new FirebaseAppImpl(n,r,o);return _apps.set(s,a),a}function getApp(t=DEFAULT_ENTRY_NAME){const e=_apps.get(t);if(!e&&t===DEFAULT_ENTRY_NAME)return initializeApp();if(!e)throw ERROR_FACTORY.create("no-app",{appName:t});return e}function registerVersion(t,e,n){var r;let s=(r=PLATFORM_LOG_STRING[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),logger$1.warn(a.join(" "));return}_registerComponent(new Component(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DB_NAME$1="firebase-heartbeat-database",DB_VERSION$1=1,STORE_NAME="firebase-heartbeat-store";let dbPromise=null;function getDbPromise(){return dbPromise||(dbPromise=openDB(DB_NAME$1,DB_VERSION$1,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(STORE_NAME)}}}).catch(t=>{throw ERROR_FACTORY.create("idb-open",{originalErrorMessage:t.message})})),dbPromise}async function readHeartbeatsFromIndexedDB(t){var e;try{return(await getDbPromise()).transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(t))}catch(n){if(n instanceof FirebaseError)logger$1.warn(n.message);else{const r=ERROR_FACTORY.create("idb-get",{originalErrorMessage:(e=n)===null||e===void 0?void 0:e.message});logger$1.warn(r.message)}}}async function writeHeartbeatsToIndexedDB(t,e){var n;try{const s=(await getDbPromise()).transaction(STORE_NAME,"readwrite");return await s.objectStore(STORE_NAME).put(e,computeKey(t)),s.done}catch(r){if(r instanceof FirebaseError)logger$1.warn(r.message);else{const s=ERROR_FACTORY.create("idb-set",{originalErrorMessage:(n=r)===null||n===void 0?void 0:n.message});logger$1.warn(s.message)}}}function computeKey(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MAX_HEADER_BYTES=1024,STORED_HEARTBEAT_RETENTION_MAX_MILLIS=30*24*60*60*1e3;class HeartbeatServiceImpl{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new HeartbeatStorageImpl(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=getUTCDateString();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=STORED_HEARTBEAT_RETENTION_MAX_MILLIS}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=getUTCDateString(),{heartbeatsToSend:n,unsentEntries:r}=extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats),s=base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function getUTCDateString(){return new Date().toISOString().substring(0,10)}function extractHeartbeatsForHeader(t,e=MAX_HEADER_BYTES){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),countBytes(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),countBytes(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class HeartbeatStorageImpl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return isIndexedDBAvailable()?validateIndexedDBOpenable().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await readHeartbeatsFromIndexedDB(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function countBytes(t){return base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function registerCoreComponents(t){_registerComponent(new Component("platform-logger",e=>new PlatformLoggerServiceImpl(e),"PRIVATE")),_registerComponent(new Component("heartbeat",e=>new HeartbeatServiceImpl(e),"PRIVATE")),registerVersion(name$o,version$1$1,t),registerVersion(name$o,version$1$1,"esm2017"),registerVersion("fire-js","")}registerCoreComponents("");function __rest(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function _prodErrorMap(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const prodErrorMap=_prodErrorMap,_DEFAULT_AUTH_ERROR_FACTORY=new ErrorFactory("auth","Firebase",_prodErrorMap());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const logClient$1=new Logger("@firebase/auth");function _logError(t,...e){logClient$1.logLevel<=LogLevel.ERROR&&logClient$1.error(`Auth (${SDK_VERSION$1}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _fail(t,...e){throw createErrorInternal(t,...e)}function _createError(t,...e){return createErrorInternal(t,...e)}function _errorWithCustomMessage(t,e,n){const r=Object.assign(Object.assign({},prodErrorMap()),{[e]:n});return new ErrorFactory("auth","Firebase",r).create(e,{appName:t.name})}function createErrorInternal(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return _DEFAULT_AUTH_ERROR_FACTORY.create(t,...e)}function _assert(t,e,...n){if(!t)throw createErrorInternal(e,...n)}function debugFail(t){const e="INTERNAL ASSERTION FAILED: "+t;throw _logError(e),new Error(e)}function debugAssert(t,e){t||debugFail(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const instanceCache=new Map;function _getInstance(t){debugAssert(t instanceof Function,"Expected a class definition");let e=instanceCache.get(t);return e?(debugAssert(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,instanceCache.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function initializeAuth(t,e){const n=_getProvider(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(deepEqual(i,e!=null?e:{}))return s;_fail(s,"already-initialized")}return n.initialize({options:e})}function _initializeAuthInstance(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_getInstance);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getCurrentUrl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function _isHttpOrHttps(){return _getCurrentScheme()==="http:"||_getCurrentScheme()==="https:"}function _getCurrentScheme(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _isOnline(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_isHttpOrHttps()||isBrowserExtension()||"connection"in navigator)?navigator.onLine:!0}function _getUserLanguage(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Delay{constructor(e,n){this.shortDelay=e,this.longDelay=n,debugAssert(n>e,"Short delay should be less than long delay!"),this.isMobile=isMobileCordova()||isReactNative()}get(){return _isOnline()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _emulatorUrl(t,e){debugAssert(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FetchProvider{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SERVER_ERROR_MAP={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_API_TIMEOUT_MS=new Delay(3e4,6e4);function _addTidIfNecessary(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function _performApiRequest(t,e,n,r,s={}){return _performFetchWithErrorHandling(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=querystring(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode),FetchProvider.fetch()(_getFinalTarget(t,t.config.apiHost,n,a),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},i))})}async function _performFetchWithErrorHandling(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},SERVER_ERROR_MAP),e);try{const s=new NetworkTimeout(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw _makeTaggedError(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw _makeTaggedError(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw _makeTaggedError(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw _makeTaggedError(t,"user-disabled",o);const u=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw _errorWithCustomMessage(t,u,c);_fail(t,u)}}catch(s){if(s instanceof FirebaseError)throw s;_fail(t,"network-request-failed")}}async function _performSignInRequest(t,e,n,r,s={}){const i=await _performApiRequest(t,e,n,r,s);return"mfaPendingCredential"in i&&_fail(t,"multi-factor-auth-required",{_serverResponse:i}),i}function _getFinalTarget(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?_emulatorUrl(t.config,s):`${t.config.apiScheme}://${s}`}class NetworkTimeout{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(_createError(this.auth,"network-request-failed")),DEFAULT_API_TIMEOUT_MS.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function _makeTaggedError(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=_createError(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function deleteAccount(t,e){return _performApiRequest(t,"POST","/v1/accounts:delete",e)}async function getAccountInfo(t,e){return _performApiRequest(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function utcTimestampToDateString(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function getIdTokenResult(t,e=!1){const n=getModularInstance(t),r=await n.getIdToken(e),s=_parseToken(r);_assert(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:utcTimestampToDateString(secondsStringToMilliseconds(s.auth_time)),issuedAtTime:utcTimestampToDateString(secondsStringToMilliseconds(s.iat)),expirationTime:utcTimestampToDateString(secondsStringToMilliseconds(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function secondsStringToMilliseconds(t){return Number(t)*1e3}function _parseToken(t){var e;const[n,r,s]=t.split(".");if(n===void 0||r===void 0||s===void 0)return _logError("JWT malformed, contained fewer than 3 sections"),null;try{const i=base64Decode(r);return i?JSON.parse(i):(_logError("Failed to decode base64 JWT payload"),null)}catch(i){return _logError("Caught error parsing JWT payload as JSON",(e=i)===null||e===void 0?void 0:e.toString()),null}}function _tokenExpiresIn(t){const e=_parseToken(t);return _assert(e,"internal-error"),_assert(typeof e.exp<"u","internal-error"),_assert(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _logoutIfInvalidated(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof FirebaseError&&isUserInvalidated(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function isUserInvalidated({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ProactiveRefresh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(n){((e=n)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UserMetadata{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=utcTimestampToDateString(this.lastLoginAt),this.creationTime=utcTimestampToDateString(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _reloadWithoutSaving(t){var e;const n=t.auth,r=await t.getIdToken(),s=await _logoutIfInvalidated(t,getAccountInfo(n,{idToken:r}));_assert(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?extractProviderData(i.providerUserInfo):[],a=mergeProviderData(t.providerData,o),l=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new UserMetadata(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,d)}async function reload(t){const e=getModularInstance(t);await _reloadWithoutSaving(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function mergeProviderData(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function extractProviderData(t){return t.map(e=>{var{providerId:n}=e,r=__rest(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function requestStsToken(t,e){const n=await _performFetchWithErrorHandling(t,{},async()=>{const r=querystring({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=_getFinalTarget(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",FetchProvider.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class StsTokenManager{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_assert(e.idToken,"internal-error"),_assert(typeof e.idToken<"u","internal-error"),_assert(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_tokenExpiresIn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return _assert(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await requestStsToken(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new StsTokenManager;return r&&(_assert(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(_assert(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(_assert(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new StsTokenManager,this.toJSON())}_performRefresh(){return debugFail("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function assertStringOrUndefined(t,e){_assert(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class UserImpl{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=__rest(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ProactiveRefresh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new UserMetadata(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await _logoutIfInvalidated(this,this.stsTokenManager.getToken(this.auth,e));return _assert(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return getIdTokenResult(this,e)}reload(){return reload(this)}_assign(e){this!==e&&(_assert(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new UserImpl(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){_assert(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await _reloadWithoutSaving(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await _logoutIfInvalidated(this,deleteAccount(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,l,c,u;const d=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(s=n.email)!==null&&s!==void 0?s:void 0,g=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,E=(o=n.photoURL)!==null&&o!==void 0?o:void 0,S=(a=n.tenantId)!==null&&a!==void 0?a:void 0,M=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,N=(c=n.createdAt)!==null&&c!==void 0?c:void 0,x=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:k,emailVerified:H,isAnonymous:q,providerData:ne,stsTokenManager:se}=n;_assert(k&&se,e,"internal-error");const V=StsTokenManager.fromJSON(this.name,se);_assert(typeof k=="string",e,"internal-error"),assertStringOrUndefined(d,e.name),assertStringOrUndefined(f,e.name),_assert(typeof H=="boolean",e,"internal-error"),_assert(typeof q=="boolean",e,"internal-error"),assertStringOrUndefined(g,e.name),assertStringOrUndefined(E,e.name),assertStringOrUndefined(S,e.name),assertStringOrUndefined(M,e.name),assertStringOrUndefined(N,e.name),assertStringOrUndefined(x,e.name);const z=new UserImpl({uid:k,auth:e,email:f,emailVerified:H,displayName:d,isAnonymous:q,photoURL:E,phoneNumber:g,tenantId:S,stsTokenManager:V,createdAt:N,lastLoginAt:x});return ne&&Array.isArray(ne)&&(z.providerData=ne.map(K=>Object.assign({},K))),M&&(z._redirectEventId=M),z}static async _fromIdTokenResponse(e,n,r=!1){const s=new StsTokenManager;s.updateFromServerResponse(n);const i=new UserImpl({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await _reloadWithoutSaving(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class InMemoryPersistence{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}InMemoryPersistence.type="NONE";const inMemoryPersistence=InMemoryPersistence;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _persistenceKeyName(t,e,n){return`firebase:${t}:${e}:${n}`}class PersistenceUserManager{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=_persistenceKeyName(this.userKey,s.apiKey,i),this.fullPersistenceKey=_persistenceKeyName("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?UserImpl._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new PersistenceUserManager(_getInstance(inMemoryPersistence),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||_getInstance(inMemoryPersistence);const o=_persistenceKeyName(r,e.config.apiKey,e.name);let a=null;for(const c of n)try{const u=await c._get(o);if(u){const d=UserImpl._fromJSON(e,u);c!==i&&(a=d),i=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new PersistenceUserManager(i,e,r):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new PersistenceUserManager(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getBrowserName(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(_isIEMobile(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_isFirefox(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_isBlackBerry(e))return"Blackberry";if(_isWebOS(e))return"Webos";if(_isSafari(e))return"Safari";if((e.includes("chrome/")||_isChromeIOS(e))&&!e.includes("edge/"))return"Chrome";if(_isAndroid(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _isFirefox(t=getUA()){return/firefox\//i.test(t)}function _isSafari(t=getUA()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _isChromeIOS(t=getUA()){return/crios\//i.test(t)}function _isIEMobile(t=getUA()){return/iemobile/i.test(t)}function _isAndroid(t=getUA()){return/android/i.test(t)}function _isBlackBerry(t=getUA()){return/blackberry/i.test(t)}function _isWebOS(t=getUA()){return/webos/i.test(t)}function _isIOS(t=getUA()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function _isIOSStandalone(t=getUA()){var e;return _isIOS(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function _isIE10(){return isIE()&&document.documentMode===10}function _isMobileBrowser(t=getUA()){return _isIOS(t)||_isAndroid(t)||_isWebOS(t)||_isBlackBerry(t)||/windows phone/i.test(t)||_isIEMobile(t)}function _isIframe(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getClientVersion(t,e=[]){let n;switch(t){case"Browser":n=_getBrowserName(getUA());break;case"Worker":n=`${_getBrowserName(getUA())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${SDK_VERSION$1}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthMiddlewareQueue{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){var n;if(this.auth.currentUser===e)return;const r=[];try{for(const s of this.queue)await s(e),s.onAbort&&r.push(s.onAbort)}catch(s){r.reverse();for(const i of r)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(n=s)===null||n===void 0?void 0:n.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthImpl{constructor(e,n,r){this.app=e,this.heartbeatServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Subscription(this),this.idTokenSubscription=new Subscription(this),this.beforeStateQueue=new AuthMiddlewareQueue(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_DEFAULT_AUTH_ERROR_FACTORY,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=_getInstance(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await PersistenceUserManager.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l==null?void 0:l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return _assert(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){var n;try{await _reloadWithoutSaving(e)}catch(r){if(((n=r)===null||n===void 0?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=_getUserLanguage()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?getModularInstance(e):null;return n&&_assert(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&_assert(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(_getInstance(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ErrorFactory("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&_getInstance(e)||this._popupRedirectResolver;_assert(n,this,"argument-error"),this.redirectPersistenceManager=await PersistenceUserManager.create(this,[_getInstance(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return _assert(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,r,s):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _assert(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_getClientVersion(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(n["X-Firebase-Client"]=r),n}}function _castAuth(t){return getModularInstance(t)}class Subscription{constructor(e){this.auth=e,this.observer=null,this.addObserver=createSubscribe(n=>this.observer=n)}get next(){return _assert(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function connectAuthEmulator(t,e,n){const r=_castAuth(t);_assert(r._canInitEmulator,r,"emulator-config-failed"),_assert(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=extractProtocol(e),{host:o,port:a}=extractHostAndPort(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||emitEmulatorWarning()}function extractProtocol(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function extractHostAndPort(t){const e=extractProtocol(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:parsePort(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:parsePort(o)}}}function parsePort(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function emitEmulatorWarning(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthCredential{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return debugFail("not implemented")}_getIdTokenResponse(e){return debugFail("not implemented")}_linkToIdToken(e,n){return debugFail("not implemented")}_getReauthenticationResolver(e){return debugFail("not implemented")}}async function updateEmailPassword(t,e){return _performApiRequest(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function signInWithPassword(t,e){return _performSignInRequest(t,"POST","/v1/accounts:signInWithPassword",_addTidIfNecessary(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function signInWithEmailLink$1(t,e){return _performSignInRequest(t,"POST","/v1/accounts:signInWithEmailLink",_addTidIfNecessary(t,e))}async function signInWithEmailLinkForLinking(t,e){return _performSignInRequest(t,"POST","/v1/accounts:signInWithEmailLink",_addTidIfNecessary(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EmailAuthCredential extends AuthCredential{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new EmailAuthCredential(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new EmailAuthCredential(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if((n==null?void 0:n.email)&&(n==null?void 0:n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return signInWithPassword(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return signInWithEmailLink$1(e,{email:this._email,oobCode:this._password});default:_fail(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return updateEmailPassword(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return signInWithEmailLinkForLinking(e,{idToken:n,email:this._email,oobCode:this._password});default:_fail(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function signInWithIdp(t,e){return _performSignInRequest(t,"POST","/v1/accounts:signInWithIdp",_addTidIfNecessary(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IDP_REQUEST_URI$1="http://localhost";class OAuthCredential extends AuthCredential{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new OAuthCredential(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):_fail("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=__rest(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new OAuthCredential(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return signInWithIdp(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,signInWithIdp(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,signInWithIdp(e,n)}buildRequest(){const e={requestUri:IDP_REQUEST_URI$1,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=querystring(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function parseMode(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function parseDeepLink(t){const e=querystringDecode(extractQuerystring(t)).link,n=e?querystringDecode(extractQuerystring(e)).deep_link_id:null,r=querystringDecode(extractQuerystring(t)).deep_link_id;return(r?querystringDecode(extractQuerystring(r)).link:null)||r||n||e||t}class ActionCodeURL{constructor(e){var n,r,s,i,o,a;const l=querystringDecode(extractQuerystring(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,u=(r=l.oobCode)!==null&&r!==void 0?r:null,d=parseMode((s=l.mode)!==null&&s!==void 0?s:null);_assert(c&&u&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=u,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=parseDeepLink(e);try{return new ActionCodeURL(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EmailAuthProvider{constructor(){this.providerId=EmailAuthProvider.PROVIDER_ID}static credential(e,n){return EmailAuthCredential._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=ActionCodeURL.parseLink(n);return _assert(r,"argument-error"),EmailAuthCredential._fromEmailAndCode(e,r.code,r.tenantId)}}EmailAuthProvider.PROVIDER_ID="password";EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD="password";EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FederatedAuthProvider{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BaseOAuthProvider extends FederatedAuthProvider{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FacebookAuthProvider extends BaseOAuthProvider{constructor(){super("facebook.com")}static credential(e){return OAuthCredential._fromParams({providerId:FacebookAuthProvider.PROVIDER_ID,signInMethod:FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return FacebookAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return FacebookAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return FacebookAuthProvider.credential(e.oauthAccessToken)}catch{return null}}}FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD="facebook.com";FacebookAuthProvider.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GoogleAuthProvider extends BaseOAuthProvider{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return OAuthCredential._fromParams({providerId:GoogleAuthProvider.PROVIDER_ID,signInMethod:GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return GoogleAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return GoogleAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return GoogleAuthProvider.credential(n,r)}catch{return null}}}GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD="google.com";GoogleAuthProvider.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GithubAuthProvider extends BaseOAuthProvider{constructor(){super("github.com")}static credential(e){return OAuthCredential._fromParams({providerId:GithubAuthProvider.PROVIDER_ID,signInMethod:GithubAuthProvider.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return GithubAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return GithubAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return GithubAuthProvider.credential(e.oauthAccessToken)}catch{return null}}}GithubAuthProvider.GITHUB_SIGN_IN_METHOD="github.com";GithubAuthProvider.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TwitterAuthProvider extends BaseOAuthProvider{constructor(){super("twitter.com")}static credential(e,n){return OAuthCredential._fromParams({providerId:TwitterAuthProvider.PROVIDER_ID,signInMethod:TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return TwitterAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return TwitterAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return TwitterAuthProvider.credential(n,r)}catch{return null}}}TwitterAuthProvider.TWITTER_SIGN_IN_METHOD="twitter.com";TwitterAuthProvider.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function signUp(t,e){return _performSignInRequest(t,"POST","/v1/accounts:signUp",_addTidIfNecessary(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UserCredentialImpl{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await UserImpl._fromIdTokenResponse(e,r,s),o=providerIdForResponse(r);return new UserCredentialImpl({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=providerIdForResponse(r);return new UserCredentialImpl({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function providerIdForResponse(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MultiFactorError extends FirebaseError{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,MultiFactorError.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new MultiFactorError(e,n,r,s)}}function _processCredentialSavingMfaContextIfNecessary(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?MultiFactorError._fromErrorAndOperation(t,i,e,r):i})}async function _link$1(t,e,n=!1){const r=await _logoutIfInvalidated(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return UserCredentialImpl._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _reauthenticate(t,e,n=!1){var r;const{auth:s}=t,i="reauthenticate";try{const o=await _logoutIfInvalidated(t,_processCredentialSavingMfaContextIfNecessary(s,i,e,t),n);_assert(o.idToken,s,"internal-error");const a=_parseToken(o.idToken);_assert(a,s,"internal-error");const{sub:l}=a;return _assert(t.uid===l,s,"user-mismatch"),UserCredentialImpl._forOperation(t,i,o)}catch(o){throw((r=o)===null||r===void 0?void 0:r.code)==="auth/user-not-found"&&_fail(s,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _signInWithCredential(t,e,n=!1){const r="signIn",s=await _processCredentialSavingMfaContextIfNecessary(t,r,e),i=await UserCredentialImpl._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function signInWithCredential(t,e){return _signInWithCredential(_castAuth(t),e)}async function createUserWithEmailAndPassword(t,e,n){const r=_castAuth(t),s=await signUp(r,{returnSecureToken:!0,email:e,password:n}),i=await UserCredentialImpl._fromIdTokenResponse(r,"signIn",s);return await r._updateCurrentUser(i.user),i}function signInWithEmailAndPassword(t,e,n){return signInWithCredential(getModularInstance(t),EmailAuthProvider.credential(e,n))}function onIdTokenChanged(t,e,n,r){return getModularInstance(t).onIdTokenChanged(e,n,r)}function beforeAuthStateChanged(t,e,n){return getModularInstance(t).beforeAuthStateChanged(e,n)}function signOut(t){return getModularInstance(t).signOut()}const STORAGE_AVAILABLE_KEY="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BrowserPersistenceClass{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(STORAGE_AVAILABLE_KEY,"1"),this.storage.removeItem(STORAGE_AVAILABLE_KEY),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _iframeCannotSyncWebStorage(){const t=getUA();return _isSafari(t)||_isIOS(t)}const _POLLING_INTERVAL_MS$1=1e3,IE10_LOCAL_STORAGE_SYNC_DELAY=10;class BrowserLocalPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=_iframeCannotSyncWebStorage()&&_isIframe(),this.fallbackToPolling=_isMobileBrowser(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);_isIE10()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,IE10_LOCAL_STORAGE_SYNC_DELAY):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},_POLLING_INTERVAL_MS$1)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}BrowserLocalPersistence.type="LOCAL";const browserLocalPersistence=BrowserLocalPersistence;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BrowserSessionPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}BrowserSessionPersistence.type="SESSION";const browserSessionPersistence=BrowserSessionPersistence;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _allSettled(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Receiver{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Receiver(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async c=>c(n.origin,i)),l=await _allSettled(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Receiver.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _generateEventId(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sender{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,l)=>{const c=_generateEventId("",20);s.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(d){const f=d;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _window(){return window}function _setWindowLocation(t){_window().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _isWorker(){return typeof _window().WorkerGlobalScope<"u"&&typeof _window().importScripts=="function"}async function _getActiveServiceWorker(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function _getServiceWorkerController(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function _getWorkerGlobalScope(){return _isWorker()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DB_NAME="firebaseLocalStorageDb",DB_VERSION=1,DB_OBJECTSTORE_NAME="firebaseLocalStorage",DB_DATA_KEYPATH="fbase_key";class DBPromise{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function getObjectStore(t,e){return t.transaction([DB_OBJECTSTORE_NAME],e?"readwrite":"readonly").objectStore(DB_OBJECTSTORE_NAME)}function _deleteDatabase(){const t=indexedDB.deleteDatabase(DB_NAME);return new DBPromise(t).toPromise()}function _openDatabase(){const t=indexedDB.open(DB_NAME,DB_VERSION);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(DB_OBJECTSTORE_NAME,{keyPath:DB_DATA_KEYPATH})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(DB_OBJECTSTORE_NAME)?e(r):(r.close(),await _deleteDatabase(),e(await _openDatabase()))})})}async function _putObject(t,e,n){const r=getObjectStore(t,!0).put({[DB_DATA_KEYPATH]:e,value:n});return new DBPromise(r).toPromise()}async function getObject(t,e){const n=getObjectStore(t,!1).get(e),r=await new DBPromise(n).toPromise();return r===void 0?null:r.value}function _deleteObject(t,e){const n=getObjectStore(t,!0).delete(e);return new DBPromise(n).toPromise()}const _POLLING_INTERVAL_MS=800,_TRANSACTION_RETRY_COUNT=3;class IndexedDBLocalPersistence{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _openDatabase(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>_TRANSACTION_RETRY_COUNT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _isWorker()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Receiver._getInstance(_getWorkerGlobalScope()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await _getActiveServiceWorker(),!this.activeServiceWorker)return;this.sender=new Sender(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((n=r[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||_getServiceWorkerController()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _openDatabase();return await _putObject(e,STORAGE_AVAILABLE_KEY,"1"),await _deleteObject(e,STORAGE_AVAILABLE_KEY),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>_putObject(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>getObject(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>_deleteObject(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=getObjectStore(s,!1).getAll();return new DBPromise(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_POLLING_INTERVAL_MS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}IndexedDBLocalPersistence.type="LOCAL";const indexedDBLocalPersistence=IndexedDBLocalPersistence;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getScriptParentElement(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function _loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=_createError("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",getScriptParentElement().appendChild(r)})}function _generateCallbackName(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Delay(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _withDefaultResolver(t,e){return e?_getInstance(e):(_assert(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IdpCredential extends AuthCredential{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return signInWithIdp(e,this._buildIdpRequest())}_linkToIdToken(e,n){return signInWithIdp(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return signInWithIdp(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function _signIn(t){return _signInWithCredential(t.auth,new IdpCredential(t),t.bypassAuthState)}function _reauth(t){const{auth:e,user:n}=t;return _assert(n,e,"internal-error"),_reauthenticate(n,new IdpCredential(t),t.bypassAuthState)}async function _link(t){const{auth:e,user:n}=t;return _assert(n,e,"internal-error"),_link$1(n,new IdpCredential(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AbstractPopupRedirectOperation{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _signIn;case"linkViaPopup":case"linkViaRedirect":return _link;case"reauthViaPopup":case"reauthViaRedirect":return _reauth;default:_fail(this.auth,"internal-error")}}resolve(e){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _POLL_WINDOW_CLOSE_TIMEOUT=new Delay(2e3,1e4);class PopupOperation extends AbstractPopupRedirectOperation{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction&&PopupOperation.currentPopupAction.cancel(),PopupOperation.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _assert(e,this.auth,"internal-error"),e}async onExecution(){debugAssert(this.filter.length===1,"Popup operations only handle one event");const e=_generateEventId();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(_createError(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_createError(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_createError(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,_POLL_WINDOW_CLOSE_TIMEOUT.get())};e()}}PopupOperation.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PENDING_REDIRECT_KEY="pendingRedirect",redirectOutcomeMap=new Map;class RedirectAction extends AbstractPopupRedirectOperation{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=redirectOutcomeMap.get(this.auth._key());if(!e){try{const r=await _getAndClearPendingRedirectStatus(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}redirectOutcomeMap.set(this.auth._key(),e)}return this.bypassAuthState||redirectOutcomeMap.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _getAndClearPendingRedirectStatus(t,e){const n=pendingRedirectKey(e),r=resolverPersistence(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function _overrideRedirectResult(t,e){redirectOutcomeMap.set(t._key(),e)}function resolverPersistence(t){return _getInstance(t._redirectPersistence)}function pendingRedirectKey(t){return _persistenceKeyName(PENDING_REDIRECT_KEY,t.config.apiKey,t.name)}async function _getRedirectResult(t,e,n=!1){const r=_castAuth(t),s=_withDefaultResolver(r,e),o=await new RedirectAction(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EVENT_DUPLICATION_CACHE_DURATION_MS=10*60*1e3;class AuthEventManager{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!isRedirectEvent(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!isNullRedirectEvent(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(_createError(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=EVENT_DUPLICATION_CACHE_DURATION_MS&&this.cachedEventUids.clear(),this.cachedEventUids.has(eventUid(e))}saveEventToCache(e){this.cachedEventUids.add(eventUid(e)),this.lastProcessedEventTime=Date.now()}}function eventUid(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function isNullRedirectEvent({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function isRedirectEvent(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return isNullRedirectEvent(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _getProjectConfig(t,e={}){return _performApiRequest(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IP_ADDRESS_REGEX=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,HTTP_REGEX=/^https?/;async function _validateOrigin(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _getProjectConfig(t);for(const n of e)try{if(matchDomain(n))return}catch{}_fail(t,"unauthorized-domain")}function matchDomain(t){const e=_getCurrentUrl(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!HTTP_REGEX.test(n))return!1;if(IP_ADDRESS_REGEX.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NETWORK_TIMEOUT=new Delay(3e4,6e4);function resetUnloadedGapiModules(){const t=_window().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function loadGapi(t){return new Promise((e,n)=>{var r,s,i;function o(){resetUnloadedGapiModules(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{resetUnloadedGapiModules(),n(_createError(t,"network-request-failed"))},timeout:NETWORK_TIMEOUT.get()})}if(!((s=(r=_window().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=_window().gapi)===null||i===void 0)&&i.load)o();else{const a=_generateCallbackName("iframefcb");return _window()[a]=()=>{gapi.load?o():n(_createError(t,"network-request-failed"))},_loadJS(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw cachedGApiLoader=null,e})}let cachedGApiLoader=null;function _loadGapi(t){return cachedGApiLoader=cachedGApiLoader||loadGapi(t),cachedGApiLoader}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PING_TIMEOUT=new Delay(5e3,15e3),IFRAME_PATH="__/auth/iframe",EMULATED_IFRAME_PATH="emulator/auth/iframe",IFRAME_ATTRIBUTES={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EID_FROM_APIHOST=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function getIframeUrl(t){const e=t.config;_assert(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?_emulatorUrl(e,EMULATED_IFRAME_PATH):`https://${t.config.authDomain}/${IFRAME_PATH}`,r={apiKey:e.apiKey,appName:t.name,v:SDK_VERSION$1},s=EID_FROM_APIHOST.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${querystring(r).slice(1)}`}async function _openIframe(t){const e=await _loadGapi(t),n=_window().gapi;return _assert(n,t,"internal-error"),e.open({where:document.body,url:getIframeUrl(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:IFRAME_ATTRIBUTES,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=_createError(t,"network-request-failed"),a=_window().setTimeout(()=>{i(o)},PING_TIMEOUT.get());function l(){_window().clearTimeout(a),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BASE_POPUP_OPTIONS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DEFAULT_WIDTH=500,DEFAULT_HEIGHT=600,TARGET_BLANK="_blank",FIREFOX_EMPTY_URL="http://localhost";class AuthPopup{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _open(t,e,n,r=DEFAULT_WIDTH,s=DEFAULT_HEIGHT){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},BASE_POPUP_OPTIONS),{width:r.toString(),height:s.toString(),top:i,left:o}),c=getUA().toLowerCase();n&&(a=_isChromeIOS(c)?TARGET_BLANK:n),_isFirefox(c)&&(e=e||FIREFOX_EMPTY_URL,l.scrollbars="yes");const u=Object.entries(l).reduce((f,[g,E])=>`${f}${g}=${E},`,"");if(_isIOSStandalone(c)&&a!=="_self")return openAsNewWindowIOS(e||"",a),new AuthPopup(null);const d=window.open(e||"",a,u);_assert(d,t,"popup-blocked");try{d.focus()}catch{}return new AuthPopup(d)}function openAsNewWindowIOS(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WIDGET_PATH="__/auth/handler",EMULATOR_WIDGET_PATH="emulator/auth/handler";function _getRedirectUrl(t,e,n,r,s,i){_assert(t.config.authDomain,t,"auth-domain-config-required"),_assert(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:SDK_VERSION$1,eventId:s};if(e instanceof FederatedAuthProvider){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",isEmpty(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[l,c]of Object.entries(i||{}))o[l]=c}if(e instanceof BaseOAuthProvider){const l=e.getScopes().filter(c=>c!=="");l.length>0&&(o.scopes=l.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];return`${getHandlerBase(t)}?${querystring(a).slice(1)}`}function getHandlerBase({config:t}){return t.emulator?_emulatorUrl(t,EMULATOR_WIDGET_PATH):`https://${t.authDomain}/${WIDGET_PATH}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WEB_STORAGE_SUPPORT_KEY="webStorageSupport";class BrowserPopupRedirectResolver{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=browserSessionPersistence,this._completeRedirectFn=_getRedirectResult,this._overrideRedirectResult=_overrideRedirectResult}async _openPopup(e,n,r,s){var i;debugAssert((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=_getRedirectUrl(e,n,r,_getCurrentUrl(),s);return _open(e,o,_generateEventId())}async _openRedirect(e,n,r,s){return await this._originValidation(e),_setWindowLocation(_getRedirectUrl(e,n,r,_getCurrentUrl(),s)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(debugAssert(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await _openIframe(e),r=new AuthEventManager(e);return n.register("authEvent",s=>(_assert(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(WEB_STORAGE_SUPPORT_KEY,{type:WEB_STORAGE_SUPPORT_KEY},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[WEB_STORAGE_SUPPORT_KEY];o!==void 0&&n(!!o),_fail(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=_validateOrigin(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return _isMobileBrowser()||_isSafari()||_isIOS()}}const browserPopupRedirectResolver=BrowserPopupRedirectResolver;var name$2="@firebase/auth",version$2="0.20.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthInterop{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{var s;e(((s=r)===null||s===void 0?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){_assert(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getVersionForPlatform(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function registerAuth(t){_registerComponent(new Component("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),{apiKey:i,authDomain:o}=r.options;return((a,l)=>{_assert(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),_assert(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const c={apiKey:i,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_getClientVersion(t)},u=new AuthImpl(a,l,c);return _initializeAuthInstance(u,n),u})(r,s)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),_registerComponent(new Component("auth-internal",e=>{const n=_castAuth(e.getProvider("auth").getImmediate());return(r=>new AuthInterop(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),registerVersion(name$2,version$2,getVersionForPlatform(t)),registerVersion(name$2,version$2,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_ID_TOKEN_MAX_AGE=5*60,authIdTokenMaxAge=getExperimentalSetting("authIdTokenMaxAge")||DEFAULT_ID_TOKEN_MAX_AGE;let lastPostedIdToken=null;const mintCookieFactory=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>authIdTokenMaxAge)return;const s=n==null?void 0:n.token;lastPostedIdToken!==s&&(lastPostedIdToken=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function getAuth(t=getApp()){const e=_getProvider(t,"auth");if(e.isInitialized())return e.getImmediate();const n=initializeAuth(t,{popupRedirectResolver:browserPopupRedirectResolver,persistence:[indexedDBLocalPersistence,browserLocalPersistence,browserSessionPersistence]}),r=getExperimentalSetting("authTokenSyncURL");if(r){const i=mintCookieFactory(r);beforeAuthStateChanged(n,i,()=>i(n.currentUser)),onIdTokenChanged(n,o=>i(o))}const s=getDefaultEmulatorHost("auth");return s&&connectAuthEmulator(n,`http://${s}`),n}registerAuth("Browser");const name$1="@firebase/database",version$1="0.13.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let SDK_VERSION="";function setSDKVersion(t){SDK_VERSION=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DOMStorageWrapper{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),stringify(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:jsonEval(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MemoryStorage{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return contains(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const createStoragefor=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new DOMStorageWrapper(e)}}catch{}return new MemoryStorage},PersistentStorage=createStoragefor("localStorage"),SessionStorage=createStoragefor("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const logClient=new Logger("@firebase/database"),LUIDGenerator=function(){let t=1;return function(){return t++}}(),sha1=function(t){const e=stringToByteArray(t),n=new Sha1;n.update(e);const r=n.digest();return base64.encodeByteArray(r)},buildLogMessage_=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=buildLogMessage_.apply(null,r):typeof r=="object"?e+=stringify(r):e+=r,e+=" "}return e};let logger=null,firstLog_=!0;const enableLogging$1=function(t,e){assert(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(logClient.logLevel=LogLevel.VERBOSE,logger=logClient.log.bind(logClient),e&&SessionStorage.set("logging_enabled",!0)):typeof t=="function"?logger=t:(logger=null,SessionStorage.remove("logging_enabled"))},log=function(...t){if(firstLog_===!0&&(firstLog_=!1,logger===null&&SessionStorage.get("logging_enabled")===!0&&enableLogging$1(!0)),logger){const e=buildLogMessage_.apply(null,t);logger(e)}},logWrapper=function(t){return function(...e){log(t,...e)}},error=function(...t){const e="FIREBASE INTERNAL ERROR: "+buildLogMessage_(...t);logClient.error(e)},fatal=function(...t){const e=`FIREBASE FATAL ERROR: ${buildLogMessage_(...t)}`;throw logClient.error(e),new Error(e)},warn=function(...t){const e="FIREBASE WARNING: "+buildLogMessage_(...t);logClient.warn(e)},warnIfPageIsSecure=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&warn("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},isInvalidJSONNumber=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},executeWhenDOMReady=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},MIN_NAME="[MIN_NAME]",MAX_NAME="[MAX_NAME]",nameCompare=function(t,e){if(t===e)return 0;if(t===MIN_NAME||e===MAX_NAME)return-1;if(e===MIN_NAME||t===MAX_NAME)return 1;{const n=tryParseInt(t),r=tryParseInt(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},stringCompare=function(t,e){return t===e?0:t<e?-1:1},requireKey=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+stringify(e))},ObjectToUniqueKey=function(t){if(typeof t!="object"||t===null)return stringify(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=stringify(e[r]),n+=":",n+=ObjectToUniqueKey(t[e[r]]);return n+="}",n},splitStringBySize=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function each(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const doubleToIEEE754String=function(t){assert(!isInvalidJSONNumber(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,a,l;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(i%2?1:0),i=Math.floor(i/2);c.push(s?1:0),c.reverse();const u=c.join("");let d="";for(l=0;l<64;l+=8){let f=parseInt(u.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),d=d+f}return d.toLowerCase()},isChromeExtensionContentScript=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},isWindowsStoreApp=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"},INTEGER_REGEXP_=new RegExp("^-?(0*)\\d{1,10}$"),INTEGER_32_MIN=-2147483648,INTEGER_32_MAX=2147483647,tryParseInt=function(t){if(INTEGER_REGEXP_.test(t)){const e=Number(t);if(e>=INTEGER_32_MIN&&e<=INTEGER_32_MAX)return e}return null},exceptionGuard=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw warn("Exception was thrown by user callback.",n),e},Math.floor(0))}},beingCrawled=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},setTimeoutNonBlocking=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AppCheckTokenProvider{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){warn(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FirebaseAuthTokenProvider{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(log("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',warn(e)}}class EmulatorTokenProvider{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}EmulatorTokenProvider.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PROTOCOL_VERSION="5",VERSION_PARAM="v",TRANSPORT_SESSION_PARAM="s",REFERER_PARAM="r",FORGE_REF="f",FORGE_DOMAIN_RE=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,LAST_SESSION_PARAM="ls",APPLICATION_ID_PARAM="p",APP_CHECK_TOKEN_PARAM="ac",WEBSOCKET="websocket",LONG_POLLING="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RepoInfo{constructor(e,n,r,s,i=!1,o="",a=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=PersistentStorage.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&PersistentStorage.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function repoInfoNeedsQueryParam(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function repoInfoConnectionURL(t,e,n){assert(typeof e=="string","typeof type must == string"),assert(typeof n=="object","typeof params must == object");let r;if(e===WEBSOCKET)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===LONG_POLLING)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);repoInfoNeedsQueryParam(t)&&(n.ns=t.namespace);const s=[];return each(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class StatsCollection{constructor(){this.counters_={}}incrementCounter(e,n=1){contains(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return deepCopy(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const collections={},reporters={};function statsManagerGetCollection(t){const e=t.toString();return collections[e]||(collections[e]=new StatsCollection),collections[e]}function statsManagerGetOrCreateReporter(t,e){const n=t.toString();return reporters[n]||(reporters[n]=e()),reporters[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PacketReceiver{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&exceptionGuard(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FIREBASE_LONGPOLL_START_PARAM="start",FIREBASE_LONGPOLL_CLOSE_COMMAND="close",FIREBASE_LONGPOLL_COMMAND_CB_NAME="pLPCommand",FIREBASE_LONGPOLL_DATA_CB_NAME="pRTLPCB",FIREBASE_LONGPOLL_ID_PARAM="id",FIREBASE_LONGPOLL_PW_PARAM="pw",FIREBASE_LONGPOLL_SERIAL_PARAM="ser",FIREBASE_LONGPOLL_CALLBACK_ID_PARAM="cb",FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM="seg",FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET="ts",FIREBASE_LONGPOLL_DATA_PARAM="d",FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM="dframe",MAX_URL_DATA_SIZE=1870,SEG_HEADER_SIZE=30,MAX_PAYLOAD_SIZE=MAX_URL_DATA_SIZE-SEG_HEADER_SIZE,KEEPALIVE_REQUEST_INTERVAL=25e3,LP_CONNECT_TIMEOUT=3e4;class BrowserPollConnection{constructor(e,n,r,s,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=logWrapper(e),this.stats_=statsManagerGetCollection(n),this.urlFn=l=>(this.appCheckToken&&(l[APP_CHECK_TOKEN_PARAM]=this.appCheckToken),repoInfoConnectionURL(n,LONG_POLLING,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new PacketReceiver(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(LP_CONNECT_TIMEOUT)),executeWhenDOMReady(()=>{if(this.isClosed_)return;this.scriptTagHolder=new FirebaseIFrameScriptHolder((...i)=>{const[o,a,l,c,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===FIREBASE_LONGPOLL_START_PARAM)this.id=a,this.password=l;else if(o===FIREBASE_LONGPOLL_CLOSE_COMMAND)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[FIREBASE_LONGPOLL_START_PARAM]="t",r[FIREBASE_LONGPOLL_SERIAL_PARAM]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM]=this.scriptTagHolder.uniqueCallbackIdentifier),r[VERSION_PARAM]=PROTOCOL_VERSION,this.transportSessionId&&(r[TRANSPORT_SESSION_PARAM]=this.transportSessionId),this.lastSessionId&&(r[LAST_SESSION_PARAM]=this.lastSessionId),this.applicationId&&(r[APPLICATION_ID_PARAM]=this.applicationId),this.appCheckToken&&(r[APP_CHECK_TOKEN_PARAM]=this.appCheckToken),typeof location<"u"&&location.hostname&&FORGE_DOMAIN_RE.test(location.hostname)&&(r[REFERER_PARAM]=FORGE_REF);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){BrowserPollConnection.forceAllow_=!0}static forceDisallow(){BrowserPollConnection.forceDisallow_=!0}static isAvailable(){return BrowserPollConnection.forceAllow_?!0:!BrowserPollConnection.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!isChromeExtensionContentScript()&&!isWindowsStoreApp()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=stringify(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=base64Encode(n),s=splitStringBySize(r,MAX_PAYLOAD_SIZE);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM]="t",r[FIREBASE_LONGPOLL_ID_PARAM]=e,r[FIREBASE_LONGPOLL_PW_PARAM]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=stringify(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class FirebaseIFrameScriptHolder{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=LUIDGenerator(),window[FIREBASE_LONGPOLL_COMMAND_CB_NAME+this.uniqueCallbackIdentifier]=e,window[FIREBASE_LONGPOLL_DATA_CB_NAME+this.uniqueCallbackIdentifier]=n,this.myIFrame=FirebaseIFrameScriptHolder.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){log("frame writing exception"),a.stack&&log(a.stack),log(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||log("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.innerHTML="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[FIREBASE_LONGPOLL_ID_PARAM]=this.myID,e[FIREBASE_LONGPOLL_PW_PARAM]=this.myPW,e[FIREBASE_LONGPOLL_SERIAL_PARAM]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+SEG_HEADER_SIZE+r.length<=MAX_URL_DATA_SIZE;){const o=this.pendingSegs.shift();r=r+"&"+FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM+s+"="+o.seg+"&"+FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET+s+"="+o.ts+"&"+FIREBASE_LONGPOLL_DATA_PARAM+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(KEEPALIVE_REQUEST_INTERVAL)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{log("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WEBSOCKET_MAX_FRAME_SIZE=16384,WEBSOCKET_KEEPALIVE_INTERVAL=45e3;let WebSocketImpl=null;typeof MozWebSocket<"u"?WebSocketImpl=MozWebSocket:typeof WebSocket<"u"&&(WebSocketImpl=WebSocket);class WebSocketConnection{constructor(e,n,r,s,i,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=logWrapper(this.connId),this.stats_=statsManagerGetCollection(n),this.connURL=WebSocketConnection.connectionURL_(n,o,a,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[VERSION_PARAM]=PROTOCOL_VERSION,typeof location<"u"&&location.hostname&&FORGE_DOMAIN_RE.test(location.hostname)&&(o[REFERER_PARAM]=FORGE_REF),n&&(o[TRANSPORT_SESSION_PARAM]=n),r&&(o[LAST_SESSION_PARAM]=r),s&&(o[APP_CHECK_TOKEN_PARAM]=s),i&&(o[APPLICATION_ID_PARAM]=i),repoInfoConnectionURL(e,WEBSOCKET,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,PersistentStorage.set("previous_websocket_failure",!0);try{let r;isNodeSdk(),this.mySock=new WebSocketImpl(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){WebSocketConnection.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&WebSocketImpl!==null&&!WebSocketConnection.forceDisallow_}static previouslyFailed(){return PersistentStorage.isInMemoryStorage||PersistentStorage.get("previous_websocket_failure")===!0}markConnectionHealthy(){PersistentStorage.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=jsonEval(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(assert(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=stringify(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=splitStringBySize(n,WEBSOCKET_MAX_FRAME_SIZE);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}WebSocketConnection.responsesRequiredToBeHealthy=2;WebSocketConnection.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TransportManager{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[BrowserPollConnection,WebSocketConnection]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=WebSocketConnection&&WebSocketConnection.isAvailable();let r=n&&!WebSocketConnection.previouslyFailed();if(e.webSocketOnly&&(n||warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[WebSocketConnection];else{const s=this.transports_=[];for(const i of TransportManager.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);TransportManager.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}TransportManager.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UPGRADE_TIMEOUT=6e4,DELAY_BEFORE_SENDING_EXTRA_REQUESTS=5e3,BYTES_SENT_HEALTHY_OVERRIDE=10*1024,BYTES_RECEIVED_HEALTHY_OVERRIDE=100*1024,MESSAGE_TYPE="t",MESSAGE_DATA="d",CONTROL_SHUTDOWN="s",CONTROL_RESET="r",CONTROL_ERROR="e",CONTROL_PONG="o",SWITCH_ACK="a",END_TRANSMISSION="n",PING="p",SERVER_HELLO="h";class Connection{constructor(e,n,r,s,i,o,a,l,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=logWrapper("c:"+this.id+":"),this.transportManager_=new TransportManager(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=setTimeoutNonBlocking(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>BYTES_RECEIVED_HEALTHY_OVERRIDE?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>BYTES_SENT_HEALTHY_OVERRIDE?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(MESSAGE_TYPE in e){const n=e[MESSAGE_TYPE];n===SWITCH_ACK?this.upgradeIfSecondaryHealthy_():n===CONTROL_RESET?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===CONTROL_PONG&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=requireKey("t",e),r=requireKey("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:PING,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:SWITCH_ACK,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:END_TRANSMISSION,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=requireKey("t",e),r=requireKey("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=requireKey(MESSAGE_TYPE,e);if(MESSAGE_DATA in e){const r=e[MESSAGE_DATA];if(n===SERVER_HELLO)this.onHandshake_(r);else if(n===END_TRANSMISSION){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===CONTROL_SHUTDOWN?this.onConnectionShutdown_(r):n===CONTROL_RESET?this.onReset_(r):n===CONTROL_ERROR?error("Server Error: "+r):n===CONTROL_PONG?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):error("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),PROTOCOL_VERSION!==r&&warn("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),setTimeoutNonBlocking(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(UPGRADE_TIMEOUT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):setTimeoutNonBlocking(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:PING,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(PersistentStorage.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ServerActions{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EventEmitter{constructor(e){this.allowedEvents_=e,this.listeners_={},assert(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){assert(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OnlineMonitor extends EventEmitter{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!isMobileCordova()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new OnlineMonitor}getInitialEvent(e){return assert(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MAX_PATH_DEPTH=32,MAX_PATH_LENGTH_BYTES=768;class Path{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function newEmptyPath(){return new Path("")}function pathGetFront(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function pathGetLength(t){return t.pieces_.length-t.pieceNum_}function pathPopFront(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new Path(t.pieces_,e)}function pathGetBack(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function pathToUrlEncodedString(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function pathSlice(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function pathParent(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new Path(e,0)}function pathChild(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof Path)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new Path(n,0)}function pathIsEmpty(t){return t.pieceNum_>=t.pieces_.length}function newRelativePath(t,e){const n=pathGetFront(t),r=pathGetFront(e);if(n===null)return e;if(n===r)return newRelativePath(pathPopFront(t),pathPopFront(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function pathEquals(t,e){if(pathGetLength(t)!==pathGetLength(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function pathContains(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(pathGetLength(t)>pathGetLength(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class ValidationPath{constructor(e,n){this.errorPrefix_=n,this.parts_=pathSlice(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=stringLength(this.parts_[r]);validationPathCheckValid(this)}}function validationPathPush(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=stringLength(e),validationPathCheckValid(t)}function validationPathPop(t){const e=t.parts_.pop();t.byteLength_-=stringLength(e),t.parts_.length>0&&(t.byteLength_-=1)}function validationPathCheckValid(t){if(t.byteLength_>MAX_PATH_LENGTH_BYTES)throw new Error(t.errorPrefix_+"has a key path longer than "+MAX_PATH_LENGTH_BYTES+" bytes ("+t.byteLength_+").");if(t.parts_.length>MAX_PATH_DEPTH)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+MAX_PATH_DEPTH+") or object contains a cycle "+validationPathToErrorString(t))}function validationPathToErrorString(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VisibilityMonitor extends EventEmitter{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new VisibilityMonitor}getInitialEvent(e){return assert(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RECONNECT_MIN_DELAY=1e3,RECONNECT_MAX_DELAY_DEFAULT=60*5*1e3,RECONNECT_MAX_DELAY_FOR_ADMINS=30*1e3,RECONNECT_DELAY_MULTIPLIER=1.3,RECONNECT_DELAY_RESET_TIMEOUT=3e4,SERVER_KILL_INTERRUPT_REASON="server_kill",INVALID_TOKEN_THRESHOLD=3;class PersistentConnection extends ServerActions{constructor(e,n,r,s,i,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=PersistentConnection.nextPersistentConnectionId_++,this.log_=logWrapper("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=RECONNECT_MIN_DELAY,this.maxReconnectDelay_=RECONNECT_MAX_DELAY_DEFAULT,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l&&!isNodeSdk())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");VisibilityMonitor.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&OnlineMonitor.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(stringify(i)),assert(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new Deferred,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),assert(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),assert(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const l=a.d,c=a.s;PersistentConnection.warnOnListenWarnings_(l,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&contains(e,"w")){const r=safeGet(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();warn(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||isAdmin(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=RECONNECT_MAX_DELAY_FOR_ADMINS)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=isValidFormat(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),assert(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+stringify(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):error("Unrecognized action received from server: "+stringify(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){assert(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=RECONNECT_MIN_DELAY,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=RECONNECT_MIN_DELAY,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>RECONNECT_DELAY_RESET_TIMEOUT&&(this.reconnectDelay_=RECONNECT_MIN_DELAY),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*RECONNECT_DELAY_MULTIPLIER)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+PersistentConnection.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},c=function(d){assert(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?log("getToken() completed but was canceled"):(log("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=f&&f.token,a=new Connection(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,g=>{warn(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(SERVER_KILL_INTERRUPT_REASON)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&warn(d),l())}}}interrupt(e){log("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){log("Resuming connection for reason: "+e),delete this.interruptReasons_[e],isEmpty(this.interruptReasons_)&&(this.reconnectDelay_=RECONNECT_MIN_DELAY,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>ObjectToUniqueKey(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new Path(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){log("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=INVALID_TOKEN_THRESHOLD&&(this.reconnectDelay_=RECONNECT_MAX_DELAY_FOR_ADMINS,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){log("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=INVALID_TOKEN_THRESHOLD&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+SDK_VERSION.replace(/\./g,"-")]=1,isMobileCordova()?e["framework.cordova"]=1:isReactNative()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=OnlineMonitor.getInstance().currentlyOnline();return isEmpty(this.interruptReasons_)&&e}}PersistentConnection.nextPersistentConnectionId_=0;PersistentConnection.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NamedNode{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new NamedNode(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Index{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new NamedNode(MIN_NAME,e),s=new NamedNode(MIN_NAME,n);return this.compare(r,s)!==0}minPost(){return NamedNode.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let __EMPTY_NODE;class KeyIndex extends Index{static get __EMPTY_NODE(){return __EMPTY_NODE}static set __EMPTY_NODE(e){__EMPTY_NODE=e}compare(e,n){return nameCompare(e.name,n.name)}isDefinedOn(e){throw assertionError("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return NamedNode.MIN}maxPost(){return new NamedNode(MAX_NAME,__EMPTY_NODE)}makePost(e,n){return assert(typeof e=="string","KeyIndex indexValue must always be a string."),new NamedNode(e,__EMPTY_NODE)}toString(){return".key"}}const KEY_INDEX=new KeyIndex;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SortedMapIterator{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class LLRBNode{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r!=null?r:LLRBNode.RED,this.left=s!=null?s:SortedMap.EMPTY_NODE,this.right=i!=null?i:SortedMap.EMPTY_NODE}copy(e,n,r,s,i){return new LLRBNode(e!=null?e:this.key,n!=null?n:this.value,r!=null?r:this.color,s!=null?s:this.left,i!=null?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return SortedMap.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return SortedMap.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,LLRBNode.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,LLRBNode.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}LLRBNode.RED=!0;LLRBNode.BLACK=!1;class LLRBEmptyNode{copy(e,n,r,s,i){return this}insert(e,n,r){return new LLRBNode(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class SortedMap{constructor(e,n=SortedMap.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new SortedMap(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,LLRBNode.BLACK,null,null))}remove(e){return new SortedMap(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,LLRBNode.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new SortedMapIterator(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new SortedMapIterator(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new SortedMapIterator(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new SortedMapIterator(this.root_,null,this.comparator_,!0,e)}}SortedMap.EMPTY_NODE=new LLRBEmptyNode;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NAME_ONLY_COMPARATOR(t,e){return nameCompare(t.name,e.name)}function NAME_COMPARATOR(t,e){return nameCompare(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let MAX_NODE$2;function setMaxNode$1(t){MAX_NODE$2=t}const priorityHashText=function(t){return typeof t=="number"?"number:"+doubleToIEEE754String(t):"string:"+t},validatePriorityNode=function(t){if(t.isLeafNode()){const e=t.val();assert(typeof e=="string"||typeof e=="number"||typeof e=="object"&&contains(e,".sv"),"Priority must be a string or number.")}else assert(t===MAX_NODE$2||t.isEmpty(),"priority of unexpected type.");assert(t===MAX_NODE$2||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let __childrenNodeConstructor;class LeafNode{constructor(e,n=LeafNode.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,assert(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),validatePriorityNode(this.priorityNode_)}static set __childrenNodeConstructor(e){__childrenNodeConstructor=e}static get __childrenNodeConstructor(){return __childrenNodeConstructor}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new LeafNode(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:LeafNode.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return pathIsEmpty(e)?this:pathGetFront(e)===".priority"?this.priorityNode_:LeafNode.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=pathGetFront(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(assert(r!==".priority"||pathGetLength(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+priorityHashText(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=doubleToIEEE754String(this.value_):e+=this.value_,this.lazyHash_=sha1(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===LeafNode.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof LeafNode.__childrenNodeConstructor?-1:(assert(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=LeafNode.VALUE_TYPE_ORDER.indexOf(n),i=LeafNode.VALUE_TYPE_ORDER.indexOf(r);return assert(s>=0,"Unknown leaf type: "+n),assert(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}LeafNode.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nodeFromJSON$1,MAX_NODE$1;function setNodeFromJSON(t){nodeFromJSON$1=t}function setMaxNode(t){MAX_NODE$1=t}class PriorityIndex extends Index{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?nameCompare(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return NamedNode.MIN}maxPost(){return new NamedNode(MAX_NAME,new LeafNode("[PRIORITY-POST]",MAX_NODE$1))}makePost(e,n){const r=nodeFromJSON$1(e);return new NamedNode(n,new LeafNode("[PRIORITY-POST]",r))}toString(){return".priority"}}const PRIORITY_INDEX=new PriorityIndex;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LOG_2=Math.log(2);class Base12Num{constructor(e){const n=i=>parseInt(Math.log(i)/LOG_2,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const buildChildSet=function(t,e,n,r){t.sort(e);const s=function(l,c){const u=c-l;let d,f;if(u===0)return null;if(u===1)return d=t[l],f=n?n(d):d,new LLRBNode(f,d.node,LLRBNode.BLACK,null,null);{const g=parseInt(u/2,10)+l,E=s(l,g),S=s(g+1,c);return d=t[g],f=n?n(d):d,new LLRBNode(f,d.node,LLRBNode.BLACK,E,S)}},i=function(l){let c=null,u=null,d=t.length;const f=function(E,S){const M=d-E,N=d;d-=E;const x=s(M+1,N),k=t[M],H=n?n(k):k;g(new LLRBNode(H,k.node,S,null,x))},g=function(E){c?(c.left=E,c=E):(u=E,c=E)};for(let E=0;E<l.count;++E){const S=l.nextBitIsOne(),M=Math.pow(2,l.count-(E+1));S?f(M,LLRBNode.BLACK):(f(M,LLRBNode.BLACK),f(M,LLRBNode.RED))}return u},o=new Base12Num(t.length),a=i(o);return new SortedMap(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _defaultIndexMap;const fallbackObject={};class IndexMap{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return assert(fallbackObject&&PRIORITY_INDEX,"ChildrenNode.ts has not been loaded"),_defaultIndexMap=_defaultIndexMap||new IndexMap({".priority":fallbackObject},{".priority":PRIORITY_INDEX}),_defaultIndexMap}get(e){const n=safeGet(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof SortedMap?n:null}hasIndex(e){return contains(this.indexSet_,e.toString())}addIndex(e,n){assert(e!==KEY_INDEX,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(NamedNode.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let a;s?a=buildChildSet(r,e.getCompare()):a=fallbackObject;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new IndexMap(u,c)}addToIndexes(e,n){const r=map(this.indexes_,(s,i)=>{const o=safeGet(this.indexSet_,i);if(assert(o,"Missing index implementation for "+i),s===fallbackObject)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(NamedNode.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),buildChildSet(a,o.getCompare())}else return fallbackObject;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new NamedNode(e.name,a))),l.insert(e,e.node)}});return new IndexMap(r,this.indexSet_)}removeFromIndexes(e,n){const r=map(this.indexes_,s=>{if(s===fallbackObject)return s;{const i=n.get(e.name);return i?s.remove(new NamedNode(e.name,i)):s}});return new IndexMap(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let EMPTY_NODE;class ChildrenNode{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&validatePriorityNode(this.priorityNode_),this.children_.isEmpty()&&assert(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return EMPTY_NODE||(EMPTY_NODE=new ChildrenNode(new SortedMap(NAME_COMPARATOR),null,IndexMap.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||EMPTY_NODE}updatePriority(e){return this.children_.isEmpty()?this:new ChildrenNode(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?EMPTY_NODE:n}}getChild(e){const n=pathGetFront(e);return n===null?this:this.getImmediateChild(n).getChild(pathPopFront(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(assert(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new NamedNode(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?EMPTY_NODE:this.priorityNode_;return new ChildrenNode(s,o,i)}}updateChild(e,n){const r=pathGetFront(e);if(r===null)return n;{assert(pathGetFront(e)!==".priority"||pathGetLength(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(pathPopFront(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(PRIORITY_INDEX,(o,a)=>{n[o]=a.val(e),r++,i&&ChildrenNode.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+priorityHashText(this.getPriority().val())+":"),this.forEachChild(PRIORITY_INDEX,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":sha1(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new NamedNode(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new NamedNode(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new NamedNode(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,NamedNode.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,NamedNode.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===MAX_NODE?-1:0}withIndex(e){if(e===KEY_INDEX||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new ChildrenNode(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===KEY_INDEX||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(PRIORITY_INDEX),s=n.getIterator(PRIORITY_INDEX);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===KEY_INDEX?null:this.indexMap_.get(e.toString())}}ChildrenNode.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class MaxNode extends ChildrenNode{constructor(){super(new SortedMap(NAME_COMPARATOR),ChildrenNode.EMPTY_NODE,IndexMap.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return ChildrenNode.EMPTY_NODE}isEmpty(){return!1}}const MAX_NODE=new MaxNode;Object.defineProperties(NamedNode,{MIN:{value:new NamedNode(MIN_NAME,ChildrenNode.EMPTY_NODE)},MAX:{value:new NamedNode(MAX_NAME,MAX_NODE)}});KeyIndex.__EMPTY_NODE=ChildrenNode.EMPTY_NODE;LeafNode.__childrenNodeConstructor=ChildrenNode;setMaxNode$1(MAX_NODE);setMaxNode(MAX_NODE);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const USE_HINZE=!0;function nodeFromJSON(t,e=null){if(t===null)return ChildrenNode.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),assert(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new LeafNode(n,nodeFromJSON(e))}if(!(t instanceof Array)&&USE_HINZE){const n=[];let r=!1;if(each(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=nodeFromJSON(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),n.push(new NamedNode(o,l)))}}),n.length===0)return ChildrenNode.EMPTY_NODE;const i=buildChildSet(n,NAME_ONLY_COMPARATOR,o=>o.name,NAME_COMPARATOR);if(r){const o=buildChildSet(n,PRIORITY_INDEX.getCompare());return new ChildrenNode(i,nodeFromJSON(e),new IndexMap({".priority":o},{".priority":PRIORITY_INDEX}))}else return new ChildrenNode(i,nodeFromJSON(e),IndexMap.Default)}else{let n=ChildrenNode.EMPTY_NODE;return each(t,(r,s)=>{if(contains(t,r)&&r.substring(0,1)!=="."){const i=nodeFromJSON(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(nodeFromJSON(e))}}setNodeFromJSON(nodeFromJSON);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PathIndex extends Index{constructor(e){super(),this.indexPath_=e,assert(!pathIsEmpty(e)&&pathGetFront(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?nameCompare(e.name,n.name):i}makePost(e,n){const r=nodeFromJSON(e),s=ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_,r);return new NamedNode(n,s)}maxPost(){const e=ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_,MAX_NODE);return new NamedNode(MAX_NAME,e)}toString(){return pathSlice(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ValueIndex extends Index{compare(e,n){const r=e.node.compareTo(n.node);return r===0?nameCompare(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return NamedNode.MIN}maxPost(){return NamedNode.MAX}makePost(e,n){const r=nodeFromJSON(e);return new NamedNode(n,r)}toString(){return".value"}}const VALUE_INDEX=new ValueIndex;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function changeValue(t){return{type:"value",snapshotNode:t}}function changeChildAdded(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function changeChildRemoved(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function changeChildChanged(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function changeChildMoved(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QueryParams{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=PRIORITY_INDEX}hasStart(){return this.startSet_}hasStartAfter(){return this.startAfterSet_}hasEndBefore(){return this.endBeforeSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return assert(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return assert(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:MIN_NAME}hasEnd(){return this.endSet_}getIndexEndValue(){return assert(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return assert(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:MAX_NAME}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return assert(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===PRIORITY_INDEX}copy(){const e=new QueryParams;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function queryParamsToRestQueryStringParameters(t){const e={};if(t.isDefault())return e;let n;return t.index_===PRIORITY_INDEX?n="$priority":t.index_===VALUE_INDEX?n="$value":t.index_===KEY_INDEX?n="$key":(assert(t.index_ instanceof PathIndex,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=stringify(n),t.startSet_&&(e.startAt=stringify(t.indexStartValue_),t.startNameSet_&&(e.startAt+=","+stringify(t.indexStartName_))),t.endSet_&&(e.endAt=stringify(t.indexEndValue_),t.endNameSet_&&(e.endAt+=","+stringify(t.indexEndName_))),t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function queryParamsGetQueryObject(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_)),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_)),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==PRIORITY_INDEX&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ReadonlyRestClient extends ServerActions{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=logWrapper("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(assert(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=ReadonlyRestClient.getListenId_(e,r),a={};this.listens_[o]=a;const l=queryParamsToRestQueryStringParameters(e._queryParams);this.restRequest_(i+".json",l,(c,u)=>{let d=u;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(i,d,!1,r),safeGet(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",s(f,null)}})}unlisten(e,n){const r=ReadonlyRestClient.getListenId_(e,n);delete this.listens_[r]}get(e){const n=queryParamsToRestQueryStringParameters(e._queryParams),r=e._path.toString(),s=new Deferred;return this.restRequest_(r+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(r,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+querystring(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=jsonEval(a.responseText)}catch{warn("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&warn("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SnapshotHolder{constructor(){this.rootNode_=ChildrenNode.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function newSparseSnapshotTree(){return{value:null,children:new Map}}function sparseSnapshotTreeRemember(t,e,n){if(pathIsEmpty(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=pathGetFront(e);t.children.has(r)||t.children.set(r,newSparseSnapshotTree());const s=t.children.get(r);e=pathPopFront(e),sparseSnapshotTreeRemember(s,e,n)}}function sparseSnapshotTreeForEachTree(t,e,n){t.value!==null?n(e,t.value):sparseSnapshotTreeForEachChild(t,(r,s)=>{const i=new Path(e.toString()+"/"+r);sparseSnapshotTreeForEachTree(s,i,n)})}function sparseSnapshotTreeForEachChild(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class StatsListener{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&each(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FIRST_STATS_MIN_TIME=10*1e3,FIRST_STATS_MAX_TIME=30*1e3,REPORT_STATS_INTERVAL=5*60*1e3;class StatsReporter{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new StatsListener(e);const r=FIRST_STATS_MIN_TIME+(FIRST_STATS_MAX_TIME-FIRST_STATS_MIN_TIME)*Math.random();setTimeoutNonBlocking(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;each(e,(s,i)=>{i>0&&contains(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),setTimeoutNonBlocking(this.reportStats_.bind(this),Math.floor(Math.random()*2*REPORT_STATS_INTERVAL))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var OperationType;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(OperationType||(OperationType={}));function newOperationSourceUser(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function newOperationSourceServer(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function newOperationSourceServerTaggedQuery(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AckUserWrite{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=OperationType.ACK_USER_WRITE,this.source=newOperationSourceUser()}operationForChild(e){if(pathIsEmpty(this.path)){if(this.affectedTree.value!=null)return assert(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new Path(e));return new AckUserWrite(newEmptyPath(),n,this.revert)}}else return assert(pathGetFront(this.path)===e,"operationForChild called for unrelated child."),new AckUserWrite(pathPopFront(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Overwrite{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=OperationType.OVERWRITE}operationForChild(e){return pathIsEmpty(this.path)?new Overwrite(this.source,newEmptyPath(),this.snap.getImmediateChild(e)):new Overwrite(this.source,pathPopFront(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Merge{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=OperationType.MERGE}operationForChild(e){if(pathIsEmpty(this.path)){const n=this.children.subtree(new Path(e));return n.isEmpty()?null:n.value?new Overwrite(this.source,newEmptyPath(),n.value):new Merge(this.source,newEmptyPath(),n)}else return assert(pathGetFront(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Merge(this.source,pathPopFront(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CacheNode{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(pathIsEmpty(e))return this.isFullyInitialized()&&!this.filtered_;const n=pathGetFront(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}function eventGeneratorGenerateEventsForChanges(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(changeChildMoved(o.childName,o.snapshotNode))}),eventGeneratorGenerateEventsForType(t,s,"child_removed",e,r,n),eventGeneratorGenerateEventsForType(t,s,"child_added",e,r,n),eventGeneratorGenerateEventsForType(t,s,"child_moved",i,r,n),eventGeneratorGenerateEventsForType(t,s,"child_changed",e,r,n),eventGeneratorGenerateEventsForType(t,s,"value",e,r,n),s}function eventGeneratorGenerateEventsForType(t,e,n,r,s,i){const o=r.filter(a=>a.type===n);o.sort((a,l)=>eventGeneratorCompareChanges(t,a,l)),o.forEach(a=>{const l=eventGeneratorMaterializeSingleChange(t,a,i);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function eventGeneratorMaterializeSingleChange(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function eventGeneratorCompareChanges(t,e,n){if(e.childName==null||n.childName==null)throw assertionError("Should only compare child_ events.");const r=new NamedNode(e.childName,e.snapshotNode),s=new NamedNode(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function newViewCache(t,e){return{eventCache:t,serverCache:e}}function viewCacheUpdateEventSnap(t,e,n,r){return newViewCache(new CacheNode(e,n,r),t.serverCache)}function viewCacheUpdateServerSnap(t,e,n,r){return newViewCache(t.eventCache,new CacheNode(e,n,r))}function viewCacheGetCompleteEventSnap(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function viewCacheGetCompleteServerSnap(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let emptyChildrenSingleton;const EmptyChildren=()=>(emptyChildrenSingleton||(emptyChildrenSingleton=new SortedMap(stringCompare)),emptyChildrenSingleton);class ImmutableTree{constructor(e,n=EmptyChildren()){this.value=e,this.children=n}static fromObject(e){let n=new ImmutableTree(null);return each(e,(r,s)=>{n=n.set(new Path(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:newEmptyPath(),value:this.value};if(pathIsEmpty(e))return null;{const r=pathGetFront(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(pathPopFront(e),n);return i!=null?{path:pathChild(new Path(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(pathIsEmpty(e))return this;{const n=pathGetFront(e),r=this.children.get(n);return r!==null?r.subtree(pathPopFront(e)):new ImmutableTree(null)}}set(e,n){if(pathIsEmpty(e))return new ImmutableTree(n,this.children);{const r=pathGetFront(e),i=(this.children.get(r)||new ImmutableTree(null)).set(pathPopFront(e),n),o=this.children.insert(r,i);return new ImmutableTree(this.value,o)}}remove(e){if(pathIsEmpty(e))return this.children.isEmpty()?new ImmutableTree(null):new ImmutableTree(null,this.children);{const n=pathGetFront(e),r=this.children.get(n);if(r){const s=r.remove(pathPopFront(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new ImmutableTree(null):new ImmutableTree(this.value,i)}else return this}}get(e){if(pathIsEmpty(e))return this.value;{const n=pathGetFront(e),r=this.children.get(n);return r?r.get(pathPopFront(e)):null}}setTree(e,n){if(pathIsEmpty(e))return n;{const r=pathGetFront(e),i=(this.children.get(r)||new ImmutableTree(null)).setTree(pathPopFront(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new ImmutableTree(this.value,o)}}fold(e){return this.fold_(newEmptyPath(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(pathChild(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,newEmptyPath(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(pathIsEmpty(e))return null;{const i=pathGetFront(e),o=this.children.get(i);return o?o.findOnPath_(pathPopFront(e),pathChild(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,newEmptyPath(),n)}foreachOnPath_(e,n,r){if(pathIsEmpty(e))return this;{this.value&&r(n,this.value);const s=pathGetFront(e),i=this.children.get(s);return i?i.foreachOnPath_(pathPopFront(e),pathChild(n,s),r):new ImmutableTree(null)}}foreach(e){this.foreach_(newEmptyPath(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(pathChild(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CompoundWrite{constructor(e){this.writeTree_=e}static empty(){return new CompoundWrite(new ImmutableTree(null))}}function compoundWriteAddWrite(t,e,n){if(pathIsEmpty(e))return new CompoundWrite(new ImmutableTree(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=newRelativePath(s,e);return i=i.updateChild(o,n),new CompoundWrite(t.writeTree_.set(s,i))}else{const s=new ImmutableTree(n),i=t.writeTree_.setTree(e,s);return new CompoundWrite(i)}}}function compoundWriteAddWrites(t,e,n){let r=t;return each(n,(s,i)=>{r=compoundWriteAddWrite(r,pathChild(e,s),i)}),r}function compoundWriteRemoveWrite(t,e){if(pathIsEmpty(e))return CompoundWrite.empty();{const n=t.writeTree_.setTree(e,new ImmutableTree(null));return new CompoundWrite(n)}}function compoundWriteHasCompleteWrite(t,e){return compoundWriteGetCompleteNode(t,e)!=null}function compoundWriteGetCompleteNode(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(newRelativePath(n.path,e)):null}function compoundWriteGetCompleteChildren(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(PRIORITY_INDEX,(r,s)=>{e.push(new NamedNode(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new NamedNode(r,s.value))}),e}function compoundWriteChildCompoundWrite(t,e){if(pathIsEmpty(e))return t;{const n=compoundWriteGetCompleteNode(t,e);return n!=null?new CompoundWrite(new ImmutableTree(n)):new CompoundWrite(t.writeTree_.subtree(e))}}function compoundWriteIsEmpty(t){return t.writeTree_.isEmpty()}function compoundWriteApply(t,e){return applySubtreeWrite(newEmptyPath(),t.writeTree_,e)}function applySubtreeWrite(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(assert(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=applySubtreeWrite(pathChild(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(pathChild(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function writeTreeChildWrites(t,e){return newWriteTreeRef(e,t)}function writeTreeAddOverwrite(t,e,n,r,s){assert(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=compoundWriteAddWrite(t.visibleWrites,e,n)),t.lastWriteId=r}function writeTreeGetWrite(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function writeTreeRemoveWrite(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);assert(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&writeTreeRecordContainsPath_(a,r.path)?s=!1:pathContains(r.path,a.path)&&(i=!0)),o--}if(s){if(i)return writeTreeResetTree_(t),!0;if(r.snap)t.visibleWrites=compoundWriteRemoveWrite(t.visibleWrites,r.path);else{const a=r.children;each(a,l=>{t.visibleWrites=compoundWriteRemoveWrite(t.visibleWrites,pathChild(r.path,l))})}return!0}else return!1}function writeTreeRecordContainsPath_(t,e){if(t.snap)return pathContains(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&pathContains(pathChild(t.path,n),e))return!0;return!1}function writeTreeResetTree_(t){t.visibleWrites=writeTreeLayerTree_(t.allWrites,writeTreeDefaultFilter_,newEmptyPath()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function writeTreeDefaultFilter_(t){return t.visible}function writeTreeLayerTree_(t,e,n){let r=CompoundWrite.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let a;if(i.snap)pathContains(n,o)?(a=newRelativePath(n,o),r=compoundWriteAddWrite(r,a,i.snap)):pathContains(o,n)&&(a=newRelativePath(o,n),r=compoundWriteAddWrite(r,newEmptyPath(),i.snap.getChild(a)));else if(i.children){if(pathContains(n,o))a=newRelativePath(n,o),r=compoundWriteAddWrites(r,a,i.children);else if(pathContains(o,n))if(a=newRelativePath(o,n),pathIsEmpty(a))r=compoundWriteAddWrites(r,newEmptyPath(),i.children);else{const l=safeGet(i.children,pathGetFront(a));if(l){const c=l.getChild(pathPopFront(a));r=compoundWriteAddWrite(r,newEmptyPath(),c)}}}else throw assertionError("WriteRecord should have .snap or .children")}}return r}function writeTreeCalcCompleteEventCache(t,e,n,r,s){if(!r&&!s){const i=compoundWriteGetCompleteNode(t.visibleWrites,e);if(i!=null)return i;{const o=compoundWriteChildCompoundWrite(t.visibleWrites,e);if(compoundWriteIsEmpty(o))return n;if(n==null&&!compoundWriteHasCompleteWrite(o,newEmptyPath()))return null;{const a=n||ChildrenNode.EMPTY_NODE;return compoundWriteApply(o,a)}}}else{const i=compoundWriteChildCompoundWrite(t.visibleWrites,e);if(!s&&compoundWriteIsEmpty(i))return n;if(!s&&n==null&&!compoundWriteHasCompleteWrite(i,newEmptyPath()))return null;{const o=function(c){return(c.visible||s)&&(!r||!~r.indexOf(c.writeId))&&(pathContains(c.path,e)||pathContains(e,c.path))},a=writeTreeLayerTree_(t.allWrites,o,e),l=n||ChildrenNode.EMPTY_NODE;return compoundWriteApply(a,l)}}}function writeTreeCalcCompleteEventChildren(t,e,n){let r=ChildrenNode.EMPTY_NODE;const s=compoundWriteGetCompleteNode(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(PRIORITY_INDEX,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=compoundWriteChildCompoundWrite(t.visibleWrites,e);return n.forEachChild(PRIORITY_INDEX,(o,a)=>{const l=compoundWriteApply(compoundWriteChildCompoundWrite(i,new Path(o)),a);r=r.updateImmediateChild(o,l)}),compoundWriteGetCompleteChildren(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=compoundWriteChildCompoundWrite(t.visibleWrites,e);return compoundWriteGetCompleteChildren(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function writeTreeCalcEventCacheAfterServerOverwrite(t,e,n,r,s){assert(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=pathChild(e,n);if(compoundWriteHasCompleteWrite(t.visibleWrites,i))return null;{const o=compoundWriteChildCompoundWrite(t.visibleWrites,i);return compoundWriteIsEmpty(o)?s.getChild(n):compoundWriteApply(o,s.getChild(n))}}function writeTreeCalcCompleteChild(t,e,n,r){const s=pathChild(e,n),i=compoundWriteGetCompleteNode(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=compoundWriteChildCompoundWrite(t.visibleWrites,s);return compoundWriteApply(o,r.getNode().getImmediateChild(n))}else return null}function writeTreeShadowingWrite(t,e){return compoundWriteGetCompleteNode(t.visibleWrites,e)}function writeTreeCalcIndexedSlice(t,e,n,r,s,i,o){let a;const l=compoundWriteChildCompoundWrite(t.visibleWrites,e),c=compoundWriteGetCompleteNode(l,newEmptyPath());if(c!=null)a=c;else if(n!=null)a=compoundWriteApply(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),f=i?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let g=f.getNext();for(;g&&u.length<s;)d(g,r)!==0&&u.push(g),g=f.getNext();return u}else return[]}function newWriteTree(){return{visibleWrites:CompoundWrite.empty(),allWrites:[],lastWriteId:-1}}function writeTreeRefCalcCompleteEventCache(t,e,n,r){return writeTreeCalcCompleteEventCache(t.writeTree,t.treePath,e,n,r)}function writeTreeRefCalcCompleteEventChildren(t,e){return writeTreeCalcCompleteEventChildren(t.writeTree,t.treePath,e)}function writeTreeRefCalcEventCacheAfterServerOverwrite(t,e,n,r){return writeTreeCalcEventCacheAfterServerOverwrite(t.writeTree,t.treePath,e,n,r)}function writeTreeRefShadowingWrite(t,e){return writeTreeShadowingWrite(t.writeTree,pathChild(t.treePath,e))}function writeTreeRefCalcIndexedSlice(t,e,n,r,s,i){return writeTreeCalcIndexedSlice(t.writeTree,t.treePath,e,n,r,s,i)}function writeTreeRefCalcCompleteChild(t,e,n){return writeTreeCalcCompleteChild(t.writeTree,t.treePath,e,n)}function writeTreeRefChild(t,e){return newWriteTreeRef(pathChild(t.treePath,e),t.writeTree)}function newWriteTreeRef(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ChildChangeAccumulator{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;assert(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),assert(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,changeChildChanged(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,changeChildRemoved(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,changeChildAdded(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,changeChildChanged(r,e.snapshotNode,s.oldSnap));else throw assertionError("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NoCompleteChildSource_{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const NO_COMPLETE_CHILD_SOURCE=new NoCompleteChildSource_;class WriteTreeCompleteChildSource{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new CacheNode(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return writeTreeRefCalcCompleteChild(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:viewCacheGetCompleteServerSnap(this.viewCache_),i=writeTreeRefCalcIndexedSlice(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}function viewProcessorAssertIndexed(t,e){assert(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),assert(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function viewProcessorApplyOperation(t,e,n,r,s){const i=new ChildChangeAccumulator;let o,a;if(n.type===OperationType.OVERWRITE){const c=n;c.source.fromUser?o=viewProcessorApplyUserOverwrite(t,e,c.path,c.snap,r,s,i):(assert(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!pathIsEmpty(c.path),o=viewProcessorApplyServerOverwrite(t,e,c.path,c.snap,r,s,a,i))}else if(n.type===OperationType.MERGE){const c=n;c.source.fromUser?o=viewProcessorApplyUserMerge(t,e,c.path,c.children,r,s,i):(assert(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=viewProcessorApplyServerMerge(t,e,c.path,c.children,r,s,a,i))}else if(n.type===OperationType.ACK_USER_WRITE){const c=n;c.revert?o=viewProcessorRevertUserWrite(t,e,c.path,r,s,i):o=viewProcessorAckUserWrite(t,e,c.path,c.affectedTree,r,s,i)}else if(n.type===OperationType.LISTEN_COMPLETE)o=viewProcessorListenComplete(t,e,n.path,r,i);else throw assertionError("Unknown operation type: "+n.type);const l=i.getChanges();return viewProcessorMaybeAddValueEvent(e,o,l),{viewCache:o,changes:l}}function viewProcessorMaybeAddValueEvent(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=viewCacheGetCompleteEventSnap(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(changeValue(viewCacheGetCompleteEventSnap(e)))}}function viewProcessorGenerateEventCacheAfterServerEvent(t,e,n,r,s,i){const o=e.eventCache;if(writeTreeRefShadowingWrite(r,n)!=null)return e;{let a,l;if(pathIsEmpty(n))if(assert(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=viewCacheGetCompleteServerSnap(e),u=c instanceof ChildrenNode?c:ChildrenNode.EMPTY_NODE,d=writeTreeRefCalcCompleteEventChildren(r,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const c=writeTreeRefCalcCompleteEventCache(r,viewCacheGetCompleteServerSnap(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,i)}else{const c=pathGetFront(n);if(c===".priority"){assert(pathGetLength(n)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const d=writeTreeRefCalcEventCacheAfterServerOverwrite(r,n,u,l);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=pathPopFront(n);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=writeTreeRefCalcEventCacheAfterServerOverwrite(r,n,o.getNode(),l);f!=null?d=o.getNode().getImmediateChild(c).updateChild(u,f):d=o.getNode().getImmediateChild(c)}else d=writeTreeRefCalcCompleteChild(r,c,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),c,d,u,s,i):a=o.getNode()}}return viewCacheUpdateEventSnap(e,a,o.isFullyInitialized()||pathIsEmpty(n),t.filter.filtersNodes())}}function viewProcessorApplyServerOverwrite(t,e,n,r,s,i,o,a){const l=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(pathIsEmpty(n))c=u.updateFullNode(l.getNode(),r,null);else if(u.filtersNodes()&&!l.isFiltered()){const g=l.getNode().updateChild(n,r);c=u.updateFullNode(l.getNode(),g,null)}else{const g=pathGetFront(n);if(!l.isCompleteForPath(n)&&pathGetLength(n)>1)return e;const E=pathPopFront(n),M=l.getNode().getImmediateChild(g).updateChild(E,r);g===".priority"?c=u.updatePriority(l.getNode(),M):c=u.updateChild(l.getNode(),g,M,E,NO_COMPLETE_CHILD_SOURCE,null)}const d=viewCacheUpdateServerSnap(e,c,l.isFullyInitialized()||pathIsEmpty(n),u.filtersNodes()),f=new WriteTreeCompleteChildSource(s,d,i);return viewProcessorGenerateEventCacheAfterServerEvent(t,d,n,s,f,a)}function viewProcessorApplyUserOverwrite(t,e,n,r,s,i,o){const a=e.eventCache;let l,c;const u=new WriteTreeCompleteChildSource(s,e,i);if(pathIsEmpty(n))c=t.filter.updateFullNode(e.eventCache.getNode(),r,o),l=viewCacheUpdateEventSnap(e,c,!0,t.filter.filtersNodes());else{const d=pathGetFront(n);if(d===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),r),l=viewCacheUpdateEventSnap(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=pathPopFront(n),g=a.getNode().getImmediateChild(d);let E;if(pathIsEmpty(f))E=r;else{const S=u.getCompleteChild(d);S!=null?pathGetBack(f)===".priority"&&S.getChild(pathParent(f)).isEmpty()?E=S:E=S.updateChild(f,r):E=ChildrenNode.EMPTY_NODE}if(g.equals(E))l=e;else{const S=t.filter.updateChild(a.getNode(),d,E,f,u,o);l=viewCacheUpdateEventSnap(e,S,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function viewProcessorCacheHasChild(t,e){return t.eventCache.isCompleteForChild(e)}function viewProcessorApplyUserMerge(t,e,n,r,s,i,o){let a=e;return r.foreach((l,c)=>{const u=pathChild(n,l);viewProcessorCacheHasChild(e,pathGetFront(u))&&(a=viewProcessorApplyUserOverwrite(t,a,u,c,s,i,o))}),r.foreach((l,c)=>{const u=pathChild(n,l);viewProcessorCacheHasChild(e,pathGetFront(u))||(a=viewProcessorApplyUserOverwrite(t,a,u,c,s,i,o))}),a}function viewProcessorApplyMerge(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function viewProcessorApplyServerMerge(t,e,n,r,s,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;pathIsEmpty(n)?c=r:c=new ImmutableTree(null).setTree(n,r);const u=e.serverCache.getNode();return c.children.inorderTraversal((d,f)=>{if(u.hasChild(d)){const g=e.serverCache.getNode().getImmediateChild(d),E=viewProcessorApplyMerge(t,g,f);l=viewProcessorApplyServerOverwrite(t,l,new Path(d),E,s,i,o,a)}}),c.children.inorderTraversal((d,f)=>{const g=!e.serverCache.isCompleteForChild(d)&&f.value===null;if(!u.hasChild(d)&&!g){const E=e.serverCache.getNode().getImmediateChild(d),S=viewProcessorApplyMerge(t,E,f);l=viewProcessorApplyServerOverwrite(t,l,new Path(d),S,s,i,o,a)}}),l}function viewProcessorAckUserWrite(t,e,n,r,s,i,o){if(writeTreeRefShadowingWrite(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(pathIsEmpty(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return viewProcessorApplyServerOverwrite(t,e,n,l.getNode().getChild(n),s,i,a,o);if(pathIsEmpty(n)){let c=new ImmutableTree(null);return l.getNode().forEachChild(KEY_INDEX,(u,d)=>{c=c.set(new Path(u),d)}),viewProcessorApplyServerMerge(t,e,n,c,s,i,a,o)}else return e}else{let c=new ImmutableTree(null);return r.foreach((u,d)=>{const f=pathChild(n,u);l.isCompleteForPath(f)&&(c=c.set(u,l.getNode().getChild(f)))}),viewProcessorApplyServerMerge(t,e,n,c,s,i,a,o)}}function viewProcessorListenComplete(t,e,n,r,s){const i=e.serverCache,o=viewCacheUpdateServerSnap(e,i.getNode(),i.isFullyInitialized()||pathIsEmpty(n),i.isFiltered());return viewProcessorGenerateEventCacheAfterServerEvent(t,o,n,r,NO_COMPLETE_CHILD_SOURCE,s)}function viewProcessorRevertUserWrite(t,e,n,r,s,i){let o;if(writeTreeRefShadowingWrite(r,n)!=null)return e;{const a=new WriteTreeCompleteChildSource(r,e,s),l=e.eventCache.getNode();let c;if(pathIsEmpty(n)||pathGetFront(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=writeTreeRefCalcCompleteEventCache(r,viewCacheGetCompleteServerSnap(e));else{const d=e.serverCache.getNode();assert(d instanceof ChildrenNode,"serverChildren would be complete if leaf node"),u=writeTreeRefCalcCompleteEventChildren(r,d)}u=u,c=t.filter.updateFullNode(l,u,i)}else{const u=pathGetFront(n);let d=writeTreeRefCalcCompleteChild(r,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=l.getImmediateChild(u)),d!=null?c=t.filter.updateChild(l,u,d,pathPopFront(n),a,i):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(l,u,ChildrenNode.EMPTY_NODE,pathPopFront(n),a,i):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=writeTreeRefCalcCompleteEventCache(r,viewCacheGetCompleteServerSnap(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,i)))}return o=e.serverCache.isFullyInitialized()||writeTreeRefShadowingWrite(r,newEmptyPath())!=null,viewCacheUpdateEventSnap(e,c,o,t.filter.filtersNodes())}}function viewGetCompleteServerCache(t,e){const n=viewCacheGetCompleteServerSnap(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!pathIsEmpty(e)&&!n.getImmediateChild(pathGetFront(e)).isEmpty())?n.getChild(e):null}function viewApplyOperation(t,e,n,r){e.type===OperationType.MERGE&&e.source.queryId!==null&&(assert(viewCacheGetCompleteServerSnap(t.viewCache_),"We should always have a full cache before handling merges"),assert(viewCacheGetCompleteEventSnap(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=viewProcessorApplyOperation(t.processor_,s,e,n,r);return viewProcessorAssertIndexed(t.processor_,i.viewCache),assert(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,viewGenerateEventsForChanges_(t,i.changes,i.viewCache.eventCache.getNode(),null)}function viewGenerateEventsForChanges_(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return eventGeneratorGenerateEventsForChanges(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let referenceConstructor$1;function syncPointSetReferenceConstructor(t){assert(!referenceConstructor$1,"__referenceConstructor has already been defined"),referenceConstructor$1=t}function syncPointApplyOperation(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return assert(i!=null,"SyncTree gave us an op for an invalid query."),viewApplyOperation(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(viewApplyOperation(o,e,n,r));return i}}function syncPointGetCompleteServerCache(t,e){let n=null;for(const r of t.views.values())n=n||viewGetCompleteServerCache(r,e);return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let referenceConstructor;function syncTreeSetReferenceConstructor(t){assert(!referenceConstructor,"__referenceConstructor has already been defined"),referenceConstructor=t}class SyncTree{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ImmutableTree(null),this.pendingWriteTree_=newWriteTree(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function syncTreeApplyUserOverwrite(t,e,n,r,s){return writeTreeAddOverwrite(t.pendingWriteTree_,e,n,r,s),s?syncTreeApplyOperationToSyncPoints_(t,new Overwrite(newOperationSourceUser(),e,n)):[]}function syncTreeAckUserWrite(t,e,n=!1){const r=writeTreeGetWrite(t.pendingWriteTree_,e);if(writeTreeRemoveWrite(t.pendingWriteTree_,e)){let i=new ImmutableTree(null);return r.snap!=null?i=i.set(newEmptyPath(),!0):each(r.children,o=>{i=i.set(new Path(o),!0)}),syncTreeApplyOperationToSyncPoints_(t,new AckUserWrite(r.path,i,n))}else return[]}function syncTreeApplyServerOverwrite(t,e,n){return syncTreeApplyOperationToSyncPoints_(t,new Overwrite(newOperationSourceServer(),e,n))}function syncTreeApplyServerMerge(t,e,n){const r=ImmutableTree.fromObject(n);return syncTreeApplyOperationToSyncPoints_(t,new Merge(newOperationSourceServer(),e,r))}function syncTreeApplyTaggedQueryOverwrite(t,e,n,r){const s=syncTreeQueryKeyForTag_(t,r);if(s!=null){const i=syncTreeParseQueryKey_(s),o=i.path,a=i.queryId,l=newRelativePath(o,e),c=new Overwrite(newOperationSourceServerTaggedQuery(a),l,n);return syncTreeApplyTaggedOperation_(t,o,c)}else return[]}function syncTreeApplyTaggedQueryMerge(t,e,n,r){const s=syncTreeQueryKeyForTag_(t,r);if(s){const i=syncTreeParseQueryKey_(s),o=i.path,a=i.queryId,l=newRelativePath(o,e),c=ImmutableTree.fromObject(n),u=new Merge(newOperationSourceServerTaggedQuery(a),l,c);return syncTreeApplyTaggedOperation_(t,o,u)}else return[]}function syncTreeCalcCompleteEventCache(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=newRelativePath(o,e),c=syncPointGetCompleteServerCache(a,l);if(c)return c});return writeTreeCalcCompleteEventCache(s,e,i,n,!0)}function syncTreeApplyOperationToSyncPoints_(t,e){return syncTreeApplyOperationHelper_(e,t.syncPointTree_,null,writeTreeChildWrites(t.pendingWriteTree_,newEmptyPath()))}function syncTreeApplyOperationHelper_(t,e,n,r){if(pathIsEmpty(t.path))return syncTreeApplyOperationDescendantsHelper_(t,e,n,r);{const s=e.get(newEmptyPath());n==null&&s!=null&&(n=syncPointGetCompleteServerCache(s,newEmptyPath()));let i=[];const o=pathGetFront(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,u=writeTreeRefChild(r,o);i=i.concat(syncTreeApplyOperationHelper_(a,l,c,u))}return s&&(i=i.concat(syncPointApplyOperation(s,t,r,n))),i}}function syncTreeApplyOperationDescendantsHelper_(t,e,n,r){const s=e.get(newEmptyPath());n==null&&s!=null&&(n=syncPointGetCompleteServerCache(s,newEmptyPath()));let i=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=writeTreeRefChild(r,o),u=t.operationForChild(o);u&&(i=i.concat(syncTreeApplyOperationDescendantsHelper_(u,a,l,c)))}),s&&(i=i.concat(syncPointApplyOperation(s,t,r,n))),i}function syncTreeQueryKeyForTag_(t,e){return t.tagToQueryMap.get(e)}function syncTreeParseQueryKey_(t){const e=t.indexOf("$");return assert(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new Path(t.substr(0,e))}}function syncTreeApplyTaggedOperation_(t,e,n){const r=t.syncPointTree_.get(e);assert(r,"Missing sync point for query tag that we're tracking");const s=writeTreeChildWrites(t.pendingWriteTree_,e);return syncPointApplyOperation(r,n,s,null)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ExistingValueProvider{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new ExistingValueProvider(n)}node(){return this.node_}}class DeferredValueProvider{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=pathChild(this.path_,e);return new DeferredValueProvider(this.syncTree_,n)}node(){return syncTreeCalcCompleteEventCache(this.syncTree_,this.path_)}}const generateWithValues=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},resolveDeferredLeafValue=function(t,e,n){if(!t||typeof t!="object")return t;if(assert(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return resolveScalarDeferredValue(t[".sv"],e,n);if(typeof t[".sv"]=="object")return resolveComplexDeferredValue(t[".sv"],e);assert(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},resolveScalarDeferredValue=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:assert(!1,"Unexpected server value: "+t)}},resolveComplexDeferredValue=function(t,e,n){t.hasOwnProperty("increment")||assert(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&assert(!1,"Unexpected increment value: "+r);const s=e.node();if(assert(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},resolveDeferredValueTree=function(t,e,n,r){return resolveDeferredValue(e,new DeferredValueProvider(n,t),r)},resolveDeferredValueSnapshot=function(t,e,n){return resolveDeferredValue(t,new ExistingValueProvider(e),n)};function resolveDeferredValue(t,e,n){const r=t.getPriority().val(),s=resolveDeferredLeafValue(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=resolveDeferredLeafValue(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new LeafNode(a,nodeFromJSON(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new LeafNode(s))),o.forEachChild(PRIORITY_INDEX,(a,l)=>{const c=resolveDeferredValue(l,e.getImmediateChild(a),n);c!==l&&(i=i.updateImmediateChild(a,c))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tree{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function treeSubTree(t,e){let n=e instanceof Path?e:new Path(e),r=t,s=pathGetFront(n);for(;s!==null;){const i=safeGet(r.node.children,s)||{children:{},childCount:0};r=new Tree(s,r,i),n=pathPopFront(n),s=pathGetFront(n)}return r}function treeGetValue(t){return t.node.value}function treeSetValue(t,e){t.node.value=e,treeUpdateParents(t)}function treeHasChildren(t){return t.node.childCount>0}function treeIsEmpty(t){return treeGetValue(t)===void 0&&!treeHasChildren(t)}function treeForEachChild(t,e){each(t.node.children,(n,r)=>{e(new Tree(n,t,r))})}function treeForEachDescendant(t,e,n,r){n&&!r&&e(t),treeForEachChild(t,s=>{treeForEachDescendant(s,e,!0,r)}),n&&r&&e(t)}function treeForEachAncestor(t,e,n){let r=n?t:t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function treeGetPath(t){return new Path(t.parent===null?t.name:treeGetPath(t.parent)+"/"+t.name)}function treeUpdateParents(t){t.parent!==null&&treeUpdateChild(t.parent,t.name,t)}function treeUpdateChild(t,e,n){const r=treeIsEmpty(n),s=contains(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,treeUpdateParents(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,treeUpdateParents(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const INVALID_KEY_REGEX_=/[\[\].#$\/\u0000-\u001F\u007F]/,INVALID_PATH_REGEX_=/[\[\].#$\u0000-\u001F\u007F]/,MAX_LEAF_SIZE_=10*1024*1024,isValidKey=function(t){return typeof t=="string"&&t.length!==0&&!INVALID_KEY_REGEX_.test(t)},isValidPathString=function(t){return typeof t=="string"&&t.length!==0&&!INVALID_PATH_REGEX_.test(t)},isValidRootPathString=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),isValidPathString(t)},validateFirebaseData=function(t,e,n){const r=n instanceof Path?new ValidationPath(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+validationPathToErrorString(r));if(typeof e=="function")throw new Error(t+"contains a function "+validationPathToErrorString(r)+" with contents = "+e.toString());if(isInvalidJSONNumber(e))throw new Error(t+"contains "+e.toString()+" "+validationPathToErrorString(r));if(typeof e=="string"&&e.length>MAX_LEAF_SIZE_/3&&stringLength(e)>MAX_LEAF_SIZE_)throw new Error(t+"contains a string greater than "+MAX_LEAF_SIZE_+" utf8 bytes "+validationPathToErrorString(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(each(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!isValidKey(o)))throw new Error(t+" contains an invalid key ("+o+") "+validationPathToErrorString(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);validationPathPush(r,o),validateFirebaseData(t,a,r),validationPathPop(r)}),s&&i)throw new Error(t+' contains ".value" child '+validationPathToErrorString(r)+" in addition to actual children.")}},validateUrl=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!isValidKey(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!isValidRootPathString(n))throw new Error(errorPrefix(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EventQueue{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function eventQueueQueueEvents(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!pathEquals(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function eventQueueRaiseEventsForChangedPath(t,e,n){eventQueueQueueEvents(t,n),eventQueueRaiseQueuedEventsMatchingPredicate(t,r=>pathContains(r,e)||pathContains(e,r))}function eventQueueRaiseQueuedEventsMatchingPredicate(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(eventListRaise(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function eventListRaise(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();logger&&log("event: "+n.toString()),exceptionGuard(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const INTERRUPT_REASON="repo_interrupt",MAX_TRANSACTION_RETRIES=25;class Repo{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new EventQueue,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=newSparseSnapshotTree(),this.transactionQueueTree_=new Tree,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function repoStart(t,e,n){if(t.stats_=statsManagerGetCollection(t.repoInfo_),t.forceRestClient_||beingCrawled())t.server_=new ReadonlyRestClient(t.repoInfo_,(r,s,i,o)=>{repoOnDataUpdate(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>repoOnConnectStatus(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{stringify(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new PersistentConnection(t.repoInfo_,e,(r,s,i,o)=>{repoOnDataUpdate(t,r,s,i,o)},r=>{repoOnConnectStatus(t,r)},r=>{repoOnServerInfoUpdate(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=statsManagerGetOrCreateReporter(t.repoInfo_,()=>new StatsReporter(t.stats_,t.server_)),t.infoData_=new SnapshotHolder,t.infoSyncTree_=new SyncTree({startListening:(r,s,i,o)=>{let a=[];const l=t.infoData_.getNode(r._path);return l.isEmpty()||(a=syncTreeApplyServerOverwrite(t.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),repoUpdateInfo(t,"connected",!1),t.serverSyncTree_=new SyncTree({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(a,l)=>{const c=o(a,l);eventQueueRaiseEventsForChangedPath(t.eventQueue_,r._path,c)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function repoServerTime(t){const n=t.infoData_.getNode(new Path(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function repoGenerateServerValues(t){return generateWithValues({timestamp:repoServerTime(t)})}function repoOnDataUpdate(t,e,n,r,s){t.dataUpdateCount++;const i=new Path(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const l=map(n,c=>nodeFromJSON(c));o=syncTreeApplyTaggedQueryMerge(t.serverSyncTree_,i,l,s)}else{const l=nodeFromJSON(n);o=syncTreeApplyTaggedQueryOverwrite(t.serverSyncTree_,i,l,s)}else if(r){const l=map(n,c=>nodeFromJSON(c));o=syncTreeApplyServerMerge(t.serverSyncTree_,i,l)}else{const l=nodeFromJSON(n);o=syncTreeApplyServerOverwrite(t.serverSyncTree_,i,l)}let a=i;o.length>0&&(a=repoRerunTransactions(t,i)),eventQueueRaiseEventsForChangedPath(t.eventQueue_,a,o)}function repoOnConnectStatus(t,e){repoUpdateInfo(t,"connected",e),e===!1&&repoRunOnDisconnectEvents(t)}function repoOnServerInfoUpdate(t,e){each(e,(n,r)=>{repoUpdateInfo(t,n,r)})}function repoUpdateInfo(t,e,n){const r=new Path("/.info/"+e),s=nodeFromJSON(n);t.infoData_.updateSnapshot(r,s);const i=syncTreeApplyServerOverwrite(t.infoSyncTree_,r,s);eventQueueRaiseEventsForChangedPath(t.eventQueue_,r,i)}function repoGetNextWriteId(t){return t.nextWriteId_++}function repoRunOnDisconnectEvents(t){repoLog(t,"onDisconnectEvents");const e=repoGenerateServerValues(t),n=newSparseSnapshotTree();sparseSnapshotTreeForEachTree(t.onDisconnect_,newEmptyPath(),(s,i)=>{const o=resolveDeferredValueTree(s,i,t.serverSyncTree_,e);sparseSnapshotTreeRemember(n,s,o)});let r=[];sparseSnapshotTreeForEachTree(n,newEmptyPath(),(s,i)=>{r=r.concat(syncTreeApplyServerOverwrite(t.serverSyncTree_,s,i));const o=repoAbortTransactions(t,s);repoRerunTransactions(t,o)}),t.onDisconnect_=newSparseSnapshotTree(),eventQueueRaiseEventsForChangedPath(t.eventQueue_,newEmptyPath(),r)}function repoInterrupt(t){t.persistentConnection_&&t.persistentConnection_.interrupt(INTERRUPT_REASON)}function repoLog(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),log(n,...e)}function repoGetLatestState(t,e,n){return syncTreeCalcCompleteEventCache(t.serverSyncTree_,e,n)||ChildrenNode.EMPTY_NODE}function repoSendReadyTransactions(t,e=t.transactionQueueTree_){if(e||repoPruneCompletedTransactionsBelowNode(t,e),treeGetValue(e)){const n=repoBuildTransactionQueue(t,e);assert(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&repoSendTransactionQueue(t,treeGetPath(e),n)}else treeHasChildren(e)&&treeForEachChild(e,n=>{repoSendReadyTransactions(t,n)})}function repoSendTransactionQueue(t,e,n){const r=n.map(c=>c.currentWriteId),s=repoGetLatestState(t,e,r);let i=s;const o=s.hash();for(let c=0;c<n.length;c++){const u=n[c];assert(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=newRelativePath(e,u.path);i=i.updateChild(d,u.currentOutputSnapshotRaw)}const a=i.val(!0),l=e;t.server_.put(l.toString(),a,c=>{repoLog(t,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const d=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(syncTreeAckUserWrite(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&d.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();repoPruneCompletedTransactionsBelowNode(t,treeSubTree(t.transactionQueueTree_,e)),repoSendReadyTransactions(t,t.transactionQueueTree_),eventQueueRaiseEventsForChangedPath(t.eventQueue_,e,u);for(let f=0;f<d.length;f++)exceptionGuard(d[f])}else{if(c==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{warn("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=c}repoRerunTransactions(t,e)}},o)}function repoRerunTransactions(t,e){const n=repoGetAncestorTransactionNode(t,e),r=treeGetPath(n),s=repoBuildTransactionQueue(t,n);return repoRerunTransactionQueue(t,s,r),r}function repoRerunTransactionQueue(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=newRelativePath(n,l.path);let u=!1,d;if(assert(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,d=l.abortReason,s=s.concat(syncTreeAckUserWrite(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=MAX_TRANSACTION_RETRIES)u=!0,d="maxretry",s=s.concat(syncTreeAckUserWrite(t.serverSyncTree_,l.currentWriteId,!0));else{const f=repoGetLatestState(t,l.path,o);l.currentInputSnapshot=f;const g=e[a].update(f.val());if(g!==void 0){validateFirebaseData("transaction failed: Data returned ",g,l.path);let E=nodeFromJSON(g);typeof g=="object"&&g!=null&&contains(g,".priority")||(E=E.updatePriority(f.getPriority()));const M=l.currentWriteId,N=repoGenerateServerValues(t),x=resolveDeferredValueSnapshot(E,f,N);l.currentOutputSnapshotRaw=E,l.currentOutputSnapshotResolved=x,l.currentWriteId=repoGetNextWriteId(t),o.splice(o.indexOf(M),1),s=s.concat(syncTreeApplyUserOverwrite(t.serverSyncTree_,l.path,x,l.currentWriteId,l.applyLocally)),s=s.concat(syncTreeAckUserWrite(t.serverSyncTree_,M,!0))}else u=!0,d="nodata",s=s.concat(syncTreeAckUserWrite(t.serverSyncTree_,l.currentWriteId,!0))}eventQueueRaiseEventsForChangedPath(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}repoPruneCompletedTransactionsBelowNode(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)exceptionGuard(r[a]);repoSendReadyTransactions(t,t.transactionQueueTree_)}function repoGetAncestorTransactionNode(t,e){let n,r=t.transactionQueueTree_;for(n=pathGetFront(e);n!==null&&treeGetValue(r)===void 0;)r=treeSubTree(r,n),e=pathPopFront(e),n=pathGetFront(e);return r}function repoBuildTransactionQueue(t,e){const n=[];return repoAggregateTransactionQueuesForNode(t,e,n),n.sort((r,s)=>r.order-s.order),n}function repoAggregateTransactionQueuesForNode(t,e,n){const r=treeGetValue(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);treeForEachChild(e,s=>{repoAggregateTransactionQueuesForNode(t,s,n)})}function repoPruneCompletedTransactionsBelowNode(t,e){const n=treeGetValue(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,treeSetValue(e,n.length>0?n:void 0)}treeForEachChild(e,r=>{repoPruneCompletedTransactionsBelowNode(t,r)})}function repoAbortTransactions(t,e){const n=treeGetPath(repoGetAncestorTransactionNode(t,e)),r=treeSubTree(t.transactionQueueTree_,e);return treeForEachAncestor(r,s=>{repoAbortTransactionsOnNode(t,s)}),repoAbortTransactionsOnNode(t,r),treeForEachDescendant(r,s=>{repoAbortTransactionsOnNode(t,s)}),n}function repoAbortTransactionsOnNode(t,e){const n=treeGetValue(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(assert(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(assert(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(syncTreeAckUserWrite(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?treeSetValue(e,void 0):n.length=i+1,eventQueueRaiseEventsForChangedPath(t.eventQueue_,treeGetPath(e),s);for(let o=0;o<r.length;o++)exceptionGuard(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function decodePath(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function decodeQuery(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):warn(`Invalid query segment '${n}' in query '${t}'`)}return e}const parseRepoInfo=function(t,e){const n=parseDatabaseURL(t),r=n.namespace;n.domain==="firebase.com"&&fatal(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&fatal("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||warnIfPageIsSecure();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new RepoInfo(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new Path(n.pathString)}},parseDatabaseURL=function(t){let e="",n="",r="",s="",i="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=decodePath(t.substring(u,d)));const f=decodeQuery(t.substring(Math.min(t.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")n="localhost";else if(g.split(".").length<=2)n=g;else{const E=e.indexOf(".");r=e.substring(0,E).toLowerCase(),n=e.substring(E+1),i=r}"ns"in f&&(i=f.ns)}return{host:e,port:l,domain:n,subdomain:r,secure:o,scheme:a,pathString:s,namespace:i}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QueryImpl{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return pathIsEmpty(this._path)?null:pathGetBack(this._path)}get ref(){return new ReferenceImpl(this._repo,this._path)}get _queryIdentifier(){const e=queryParamsGetQueryObject(this._queryParams),n=ObjectToUniqueKey(e);return n==="{}"?"default":n}get _queryObject(){return queryParamsGetQueryObject(this._queryParams)}isEqual(e){if(e=getModularInstance(e),!(e instanceof QueryImpl))return!1;const n=this._repo===e._repo,r=pathEquals(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+pathToUrlEncodedString(this._path)}}class ReferenceImpl extends QueryImpl{constructor(e,n){super(e,n,new QueryParams,!1)}get parent(){const e=pathParent(this._path);return e===null?null:new ReferenceImpl(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}syncPointSetReferenceConstructor(ReferenceImpl);syncTreeSetReferenceConstructor(ReferenceImpl);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FIREBASE_DATABASE_EMULATOR_HOST_VAR="FIREBASE_DATABASE_EMULATOR_HOST",repos={};let useRestClient=!1;function repoManagerDatabaseFromApp(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||fatal("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),log("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=parseRepoInfo(i,s),a=o.repoInfo,l,c;typeof process<"u"&&process.env&&(c=process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR]),c?(l=!0,i=`http://${c}?ns=${a.namespace}`,o=parseRepoInfo(i,s),a=o.repoInfo):l=!o.repoInfo.secure;const u=s&&l?new EmulatorTokenProvider(EmulatorTokenProvider.OWNER):new FirebaseAuthTokenProvider(t.name,t.options,e);validateUrl("Invalid Firebase Database URL",o),pathIsEmpty(o.path)||fatal("Database URL must point to the root of a Firebase Database (not including a child path).");const d=repoManagerCreateRepo(a,t,u,new AppCheckTokenProvider(t.name,n));return new Database(d,t)}function repoManagerDeleteRepo(t,e){const n=repos[e];(!n||n[t.key]!==t)&&fatal(`Database ${e}(${t.repoInfo_}) has already been deleted.`),repoInterrupt(t),delete n[t.key]}function repoManagerCreateRepo(t,e,n,r){let s=repos[e.name];s||(s={},repos[e.name]=s);let i=s[t.toURLString()];return i&&fatal("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new Repo(t,useRestClient,n,r),s[t.toURLString()]=i,i}class Database{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(repoStart(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ReferenceImpl(this._repo,newEmptyPath())),this._rootInternal}_delete(){return this._rootInternal!==null&&(repoManagerDeleteRepo(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&fatal("Cannot call "+e+" on a deleted database.")}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function registerDatabase(t){setSDKVersion(SDK_VERSION$1),_registerComponent(new Component("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return repoManagerDatabaseFromApp(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),registerVersion(name$1,version$1,t),registerVersion(name$1,version$1,"esm2017")}PersistentConnection.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};PersistentConnection.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};registerDatabase();var name="firebase",version="9.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */registerVersion(name,version,"app");const firebaseConfig={apiKey:"AIzaSyDj6Fsz-Aem3ydUr-LwZB8FrEBsjhb_qgA",authDomain:"vue-training-dd609.firebaseapp.com",projectId:"vue-training-dd609",storageBucket:"vue-training-dd609.appspot.com",messagingSenderId:"64576047074",appId:"1:64576047074:web:a6c026e1f88360649f5bbb",measurementId:"G-EZ89R773TQ"},app=initializeApp(firebaseConfig),auth=getAuth(app),Card_vue_vue_type_style_index_0_scoped_c6d246aa_lang="",_export_sfc=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},_sfc_main$b={props:{title:{type:String},text:{type:String},navigation:{type:String}}},_hoisted_1$a={class:"flex-items-center"},_hoisted_2$8={class:"item"},_hoisted_3$8={class:"item-title"},_hoisted_4$7={class:"item-text"},_hoisted_5$4={class:"btn-card"};function _sfc_render$b(t,e,n,r,s,i){const o=resolveComponent("router-link");return openBlock(),createElementBlock("div",_hoisted_1$a,[createBaseVNode("div",_hoisted_2$8,[createBaseVNode("h3",_hoisted_3$8,toDisplayString(n.title),1),createBaseVNode("p",_hoisted_4$7,toDisplayString(n.text),1),createBaseVNode("button",_hoisted_5$4,[createVNode(o,{to:n.navigation},{default:withCtx(()=>[createTextVNode(" Try")]),_:1},8,["to"])])])])}const Card=_export_sfc(_sfc_main$b,[["render",_sfc_render$b],["__scopeId","data-v-c6d246aa"]]),Home_vue_vue_type_style_index_0_lang="",_sfc_main$a={props:{name:{type:String}},components:{Card},data(){return{cards:[{title:"Calculator",text:"This is simple calculator which help you to do a mathematic`s calculations.Try to use app-calculator!",navigation:"/calculator"},{title:"Todo-List",text:"It is a good app if you need to write some important affairs which you don`t want to forget.Try to use app-todo-list!",navigation:"/todo"},{title:"Weather Forecast",text:"If you are going to travel somewhere, you should use this weather foreacts.Try to use app-weather-forecast!",navigation:"/weather-forecast"}]}}},_hoisted_1$9={class:"wrapper"},_hoisted_2$7={class:"container"},_hoisted_3$7={class:"flex-center"};function _sfc_render$a(t,e,n,r,s,i){const o=resolveComponent("Card"),a=resolveComponent("router-view");return openBlock(),createElementBlock(Fragment,null,[createBaseVNode("div",_hoisted_1$9,[createBaseVNode("div",_hoisted_2$7,[createBaseVNode("div",null,[createBaseVNode("ul",_hoisted_3$7,[(openBlock(!0),createElementBlock(Fragment,null,renderList(s.cards,l=>(openBlock(),createElementBlock("li",{key:l},[createVNode(o,{title:l.title,text:l.text,navigation:l.navigation},null,8,["title","text","navigation"])]))),128))])])])]),createVNode(a)],64)}const Home=_export_sfc(_sfc_main$a,[["render",_sfc_render$a]]),Login_vue_vue_type_style_index_0_scoped_2809d3c4_lang="",_sfc_main$9={data(){return{loginForm:{email:"",login:""}}},methods:{enterLoginInfo(){this.$store.dispatch("login",this.loginForm)}}},_withScopeId$3=t=>(pushScopeId("data-v-2809d3c4"),t=t(),popScopeId(),t),_hoisted_1$8={class:"login"},_hoisted_2$6={class:"forms"},_hoisted_3$6=_withScopeId$3(()=>createBaseVNode("h2",null,"Login",-1)),_hoisted_4$6={class:"register-note"};function _sfc_render$9(t,e,n,r,s,i){const o=resolveComponent("router-link");return openBlock(),createElementBlock("main",_hoisted_1$8,[createBaseVNode("section",_hoisted_2$6,[createBaseVNode("form",{class:"login",onSubmit:e[3]||(e[3]=withModifiers((...a)=>t.login&&t.login(...a),["prevent"]))},[_hoisted_3$6,withDirectives(createBaseVNode("input",{name:"email",type:"email",placeholder:"Email address","onUpdate:modelValue":e[0]||(e[0]=a=>s.loginForm.email=a)},null,512),[[vModelText,s.loginForm.email]]),withDirectives(createBaseVNode("input",{name:"password",type:"password",placeholder:"Password","onUpdate:modelValue":e[1]||(e[1]=a=>s.loginForm.password=a)},null,512),[[vModelText,s.loginForm.password]]),createBaseVNode("button",{class:"login_btn",onClick:e[2]||(e[2]=withModifiers(a=>i.enterLoginInfo(),["prevent"]))}," Login "),createBaseVNode("p",_hoisted_4$6,[createTextVNode("Don't have an account? "),createVNode(o,{class:"access-link",to:"/register"},{default:withCtx(()=>[createTextVNode("Register")]),_:1})])],32)])])}const Login=_export_sfc(_sfc_main$9,[["render",_sfc_render$9],["__scopeId","data-v-2809d3c4"]]),Register_vue_vue_type_style_index_0_scoped_3d25ec9d_lang="",_sfc_main$8={data(){return{registerForm:{email:"",login:""}}},methods:{enterRegisterInfo(){this.$store.dispatch("register",this.registerForm)}}},_withScopeId$2=t=>(pushScopeId("data-v-3d25ec9d"),t=t(),popScopeId(),t),_hoisted_1$7={class:"login"},_hoisted_2$5={class:"forms"},_hoisted_3$5=_withScopeId$2(()=>createBaseVNode("h2",null,"Register",-1)),_hoisted_4$5={class:"login-note"};function _sfc_render$8(t,e,n,r,s,i){const o=resolveComponent("router-link");return openBlock(),createElementBlock("main",_hoisted_1$7,[createBaseVNode("section",_hoisted_2$5,[createBaseVNode("form",{class:"register",onSubmit:e[3]||(e[3]=withModifiers((...a)=>t.register&&t.register(...a),["prevent"]))},[_hoisted_3$5,withDirectives(createBaseVNode("input",{name:"email",type:"email",placeholder:"Email address","onUpdate:modelValue":e[0]||(e[0]=a=>s.registerForm.email=a)},null,512),[[vModelText,s.registerForm.email]]),withDirectives(createBaseVNode("input",{name:"password",type:"password",placeholder:"Password","onUpdate:modelValue":e[1]||(e[1]=a=>s.registerForm.password=a)},null,512),[[vModelText,s.registerForm.password]]),createBaseVNode("button",{class:"register_btn",onClick:e[2]||(e[2]=withModifiers(a=>i.enterRegisterInfo(),["prevent"]))}," Register "),createBaseVNode("p",_hoisted_4$5,[createTextVNode("Already have an account?"),createBaseVNode("span",null,[createVNode(o,{class:"access-linklog",to:"/Login"},{default:withCtx(()=>[createTextVNode("Login")]),_:1})])])],32)])])}const Register=_export_sfc(_sfc_main$8,[["render",_sfc_render$8],["__scopeId","data-v-3d25ec9d"]]),Calculator_vue_vue_type_style_index_0_scoped_a55b2efa_lang="",_sfc_main$7={data(){return{result:"",numbers:[1,2,3,4,5,6,7,8,9,0],operations:["+","-","*","/","."]}},methods:{show(t){this.result=this.result.toString(),this.result+=t,console.log(t)},reset(){this.result=""},calc(){this.result=eval(this.result)},calcPercent(){this.result=`${parseFloat(this.result)/100}`}}},_withScopeId$1=t=>(pushScopeId("data-v-a55b2efa"),t=t(),popScopeId(),t),_hoisted_1$6={class:"wrapper"},_hoisted_2$4={class:"container-column-center"},_hoisted_3$4=_withScopeId$1(()=>createBaseVNode("h1",null,"Calculator",-1)),_hoisted_4$4={class:"app-calc"},_hoisted_5$3={class:"calculator"},_hoisted_6$3=["onClick"],_hoisted_7$3=["onClick"];function _sfc_render$7(t,e,n,r,s,i){return openBlock(),createElementBlock("div",_hoisted_1$6,[createBaseVNode("div",_hoisted_2$4,[_hoisted_3$4,createBaseVNode("div",_hoisted_4$4,[createBaseVNode("div",_hoisted_5$3,[withDirectives(createBaseVNode("input",{class:"main-display",type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>s.result=o),placeholder:"0"},null,512),[[vModelText,s.result]]),(openBlock(!0),createElementBlock(Fragment,null,renderList(s.numbers,o=>(openBlock(),createElementBlock("button",{class:"cell num",onClick:a=>i.show(o),key:o},toDisplayString(o),9,_hoisted_6$3))),128)),(openBlock(!0),createElementBlock(Fragment,null,renderList(s.operations,o=>(openBlock(),createElementBlock("button",{class:"cell op",onClick:a=>i.show(o),key:o},toDisplayString(o),9,_hoisted_7$3))),128)),createBaseVNode("button",{class:"cell op",onClick:e[1]||(e[1]=o=>i.calcPercent())},"%"),createBaseVNode("button",{class:"cell op",onClick:e[2]||(e[2]=o=>i.reset())},"R"),createBaseVNode("button",{class:"cell op",onClick:e[3]||(e[3]=o=>i.calc())},"=")])])])])}const Calculator=_export_sfc(_sfc_main$7,[["render",_sfc_render$7],["__scopeId","data-v-a55b2efa"]]),Todo_vue_vue_type_style_index_0_scoped_c4eec670_lang="",_sfc_main$6={data(){return{selectedIndex:null,isEditing:!1,todo:"",todos:[]}},mounted(){const t=localStorage.getItem("todos");t&&(this.todos=JSON.parse(t))},computed:{actionButtonName(){return this.isEditing?"Edit":"Add Note"}},methods:{noteHandler(){this.isEditing?this.updateTodo():this.addToDo()},addToDo(){this.todo.length>0&&(this.todos.push(this.todo),this.todo=""),localStorage.setItem("todos",JSON.stringify(this.todos))},deleteTodo(t){this.todos.splice(t,1),localStorage.setItem("todos",JSON.stringify(this.todos))},editTodo(t,e){console.log(t),this.todo=t,this.selectedIndex=e,this.isEditing=!0},updateTodo(){this.todos.splice(this.selectedIndex,1,this.todo),this.isEditing=!1,this.todo=""}}},_withScopeId=t=>(pushScopeId("data-v-c4eec670"),t=t(),popScopeId(),t),_hoisted_1$5={class:"wrapper"},_hoisted_2$3={class:"container"},_hoisted_3$3=_withScopeId(()=>createBaseVNode("h1",null," Todo-List",-1)),_hoisted_4$3={class:"body-block"},_hoisted_5$2={class:"input-wrapper"},_hoisted_6$2=["textContent"],_hoisted_7$2=_withScopeId(()=>createBaseVNode("br",null,null,-1)),_hoisted_8$2=_withScopeId(()=>createBaseVNode("hr",null,null,-1)),_hoisted_9$1=["onClick"],_hoisted_10$1=["onClick"],_hoisted_11$1={key:0,class:"nothing-to-do"};function _sfc_render$6(t,e,n,r,s,i){return openBlock(),createElementBlock("div",_hoisted_1$5,[createBaseVNode("div",_hoisted_2$3,[_hoisted_3$3,createBaseVNode("div",_hoisted_4$3,[createBaseVNode("div",_hoisted_5$2,[withDirectives(createBaseVNode("input",{class:"main-input",type:"text",placeholder:"Add your note","onUpdate:modelValue":e[0]||(e[0]=o=>s.todo=o)},null,512),[[vModelText,s.todo]])]),createBaseVNode("button",{class:"main-btn",type:"submit",value:"add",onClick:e[1]||(e[1]=(...o)=>i.noteHandler&&i.noteHandler(...o)),textContent:toDisplayString(i.actionButtonName)},null,8,_hoisted_6$2)]),_hoisted_7$2,_hoisted_8$2,createVNode(TransitionGroup,{tag:"ul",name:"list",class:"list",appear:""},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(s.todos,(o,a)=>(openBlock(),createElementBlock("li",{class:"list-item",key:o},[createTextVNode(toDisplayString(a+1)+") "+toDisplayString(o)+" ",1),createBaseVNode("div",null,[createBaseVNode("button",{class:"edit-btn",onClick:l=>i.editTodo(o,a)},"Edit",8,_hoisted_9$1),createBaseVNode("button",{class:"delete-btn",onClick:l=>i.deleteTodo(a)},"Delete",8,_hoisted_10$1)])]))),128))]),_:1}),s.todos.length===0?(openBlock(),createElementBlock("p",_hoisted_11$1,"Nothing to do")):createCommentVNode("",!0)])])}const Todo=_export_sfc(_sfc_main$6,[["render",_sfc_render$6],["__scopeId","data-v-c4eec670"]]),_imports_0="https://tarasishe.github.io/VueApp/assets/spinner-svgrepo-com.1461a1cc.svg",Spinner_vue_vue_type_style_index_0_scoped_5cd7fbdf_lang="",_sfc_main$5={name:"Spinner"},_hoisted_1$4={class:"spinner",src:_imports_0,alt:""};function _sfc_render$5(t,e,n,r,s,i){return openBlock(),createElementBlock("img",_hoisted_1$4)}const Spinner=_export_sfc(_sfc_main$5,[["render",_sfc_render$5],["__scopeId","data-v-5cd7fbdf"]]),WeatherForecast_vue_vue_type_style_index_0_lang="",_sfc_main$4={components:{Spinner},data(){return{urlBase:"https://api.openweathermap.org/data/2.5/",query:"",weather:{},loading:!1,queryTimeout:null,cities:{},searchCityPanel:!1}},methods:{async fetchWeather(t,e){this.loading=!0;try{const r=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=776cbefeb4e33b7b80b3a1af5b49be36&units=metric`)).json();this.weather=r,console.log(r)}catch(n){alert(`Error:${n}`)}finally{this.loading=!1}},getSearchResults(){this.searchCityPanel=!0,clearTimeout(this.queryTimeout),this.queryTimeout=setTimeout(async()=>{if(this.query!==""){const e=await(await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.query}.json?access_token=pk.eyJ1IjoidGFyYXNpc2hlIiwiYSI6ImNsYXh4ZDJjbzA2M2Yzem81c3Z6ZTFsMDgifQ.TYjCtwTUeohyUJo_ustV5w&types=place`)).json();this.cities=e.features}},300)},appendCity(t,[e,n]){this.searchCityPanel=!0,this.query=t,this.fetchWeather(e,n),this.searchCityPanel=!1}},computed:{changePicture(){return this.weather.main&&this.weather.main.temp>16?"warm":this.weather.main&&this.weather.main.temp<16?"cold":""},dateBuilder(){let t=new Date;const e=["January","February","March","April","May","June","July","August","September","October","November","December"],r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()],s=t.getDate(),i=e[t.getMonth()],o=t.getFullYear();return`${r} , ${s} ${i} ${o}`}},created(){}},_hoisted_1$3={class:"search-box"},_hoisted_2$2={key:0,class:"search-filter"},_hoisted_3$2=["onClick"],_hoisted_4$2={key:0},_hoisted_5$1={key:1,class:"weather-wrap"},_hoisted_6$1={class:"location-box"},_hoisted_7$1={class:"location"},_hoisted_8$1={class:"date"},_hoisted_9={class:"weather-box"},_hoisted_10={class:"temp"},_hoisted_11={class:"weather"};function _sfc_render$4(t,e,n,r,s,i){const o=resolveComponent("Spinner");return openBlock(),createElementBlock("div",{id:"apps",class:normalizeClass(i.changePicture)},[createBaseVNode("main",null,[createBaseVNode("div",_hoisted_1$3,[withDirectives(createBaseVNode("input",{type:"text",class:"search-bar",placeholder:"Search...","onUpdate:modelValue":e[0]||(e[0]=a=>s.query=a),onInput:e[1]||(e[1]=(...a)=>i.getSearchResults&&i.getSearchResults(...a))},null,544),[[vModelText,s.query]]),this.searchCityPanel?(openBlock(),createElementBlock("ul",_hoisted_2$2,[(openBlock(!0),createElementBlock(Fragment,null,renderList(s.cities,a=>(openBlock(),createElementBlock("li",{class:"search-item",key:a.id,onClick:l=>i.appendCity(a.place_name,a.geometry.coordinates)},toDisplayString(a.place_name),9,_hoisted_3$2))),128))])):createCommentVNode("",!0)]),s.loading?(openBlock(),createElementBlock("div",_hoisted_4$2,[createVNode(o)])):createCommentVNode("",!0),s.weather.main?(openBlock(),createElementBlock("div",_hoisted_5$1,[createBaseVNode("div",_hoisted_6$1,[createBaseVNode("div",_hoisted_7$1,toDisplayString(s.query),1),createBaseVNode("div",_hoisted_8$1,toDisplayString(i.dateBuilder),1)]),createBaseVNode("div",_hoisted_9,[createBaseVNode("div",_hoisted_10,toDisplayString(Math.round(s.weather.main.temp))+"\xB0C",1),createBaseVNode("div",_hoisted_11,toDisplayString(s.weather.weather[0].main),1)])])):createCommentVNode("",!0)])],2)}const WeatherForecast=_export_sfc(_sfc_main$4,[["render",_sfc_render$4]]),router=createRouter({history:createWebHashHistory("https://tarasishe.github.io/VueApp/"),routes:[{path:"/",name:"Home",component:Home,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:Login},{path:"/register",name:"Register",component:Register},{path:"/calculator",name:"Calculator",component:Calculator,meta:{requiresAuth:!0}},{path:"/todo",name:"Todo",component:Todo,meta:{requiresAuth:!0}},{path:"/weather-forecast",name:"Weather-Forecast",component:WeatherForecast,meta:{requiresAuth:!0}}]});router.beforeEach((t,e,n)=>{if(t.path==="/login"&&auth.currentUser){n("/");return}else if(t.matched.some(r=>r.meta.requiresAuth)&&!auth.currentUser){n("/login");return}n()});/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */var storeKey="store";function forEachValue(t,e){Object.keys(t).forEach(function(n){return e(t[n],n)})}function isObject(t){return t!==null&&typeof t=="object"}function isPromise(t){return t&&typeof t.then=="function"}function partial(t,e){return function(){return t(e)}}function genericSubscribe(t,e,n){return e.indexOf(t)<0&&(n&&n.prepend?e.unshift(t):e.push(t)),function(){var r=e.indexOf(t);r>-1&&e.splice(r,1)}}function resetStore(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;installModule(t,n,[],t._modules.root,!0),resetStoreState(t,n,e)}function resetStoreState(t,e,n){var r=t._state;t.getters={},t._makeLocalGettersCache=Object.create(null);var s=t._wrappedGetters,i={};forEachValue(s,function(o,a){i[a]=partial(o,t),Object.defineProperty(t.getters,a,{get:function(){return i[a]()},enumerable:!0})}),t._state=reactive({data:e}),t.strict&&enableStrictMode(t),r&&n&&t._withCommit(function(){r.data=null})}function installModule(t,e,n,r,s){var i=!n.length,o=t._modules.getNamespace(n);if(r.namespaced&&(t._modulesNamespaceMap[o],t._modulesNamespaceMap[o]=r),!i&&!s){var a=getNestedState(e,n.slice(0,-1)),l=n[n.length-1];t._withCommit(function(){a[l]=r.state})}var c=r.context=makeLocalContext(t,o,n);r.forEachMutation(function(u,d){var f=o+d;registerMutation(t,f,u,c)}),r.forEachAction(function(u,d){var f=u.root?d:o+d,g=u.handler||u;registerAction(t,f,g,c)}),r.forEachGetter(function(u,d){var f=o+d;registerGetter(t,f,u,c)}),r.forEachChild(function(u,d){installModule(t,e,n.concat(d),u,s)})}function makeLocalContext(t,e,n){var r=e==="",s={dispatch:r?t.dispatch:function(i,o,a){var l=unifyObjectStyle(i,o,a),c=l.payload,u=l.options,d=l.type;return(!u||!u.root)&&(d=e+d),t.dispatch(d,c)},commit:r?t.commit:function(i,o,a){var l=unifyObjectStyle(i,o,a),c=l.payload,u=l.options,d=l.type;(!u||!u.root)&&(d=e+d),t.commit(d,c,u)}};return Object.defineProperties(s,{getters:{get:r?function(){return t.getters}:function(){return makeLocalGetters(t,e)}},state:{get:function(){return getNestedState(t.state,n)}}}),s}function makeLocalGetters(t,e){if(!t._makeLocalGettersCache[e]){var n={},r=e.length;Object.keys(t.getters).forEach(function(s){if(s.slice(0,r)===e){var i=s.slice(r);Object.defineProperty(n,i,{get:function(){return t.getters[s]},enumerable:!0})}}),t._makeLocalGettersCache[e]=n}return t._makeLocalGettersCache[e]}function registerMutation(t,e,n,r){var s=t._mutations[e]||(t._mutations[e]=[]);s.push(function(o){n.call(t,r.state,o)})}function registerAction(t,e,n,r){var s=t._actions[e]||(t._actions[e]=[]);s.push(function(o){var a=n.call(t,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:t.getters,rootState:t.state},o);return isPromise(a)||(a=Promise.resolve(a)),t._devtoolHook?a.catch(function(l){throw t._devtoolHook.emit("vuex:error",l),l}):a})}function registerGetter(t,e,n,r){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(i){return n(r.state,r.getters,i.state,i.getters)})}function enableStrictMode(t){watch(function(){return t._state.data},function(){},{deep:!0,flush:"sync"})}function getNestedState(t,e){return e.reduce(function(n,r){return n[r]},t)}function unifyObjectStyle(t,e,n){return isObject(t)&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}var LABEL_VUEX_BINDINGS="vuex bindings",MUTATIONS_LAYER_ID="vuex:mutations",ACTIONS_LAYER_ID="vuex:actions",INSPECTOR_ID="vuex",actionId=0;function addDevtools(t,e){setupDevtoolsPlugin({id:"org.vuejs.vuex",app:t,label:"Vuex",homepage:"https://next.vuex.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",packageName:"vuex",componentStateTypes:[LABEL_VUEX_BINDINGS]},function(n){n.addTimelineLayer({id:MUTATIONS_LAYER_ID,label:"Vuex Mutations",color:COLOR_LIME_500}),n.addTimelineLayer({id:ACTIONS_LAYER_ID,label:"Vuex Actions",color:COLOR_LIME_500}),n.addInspector({id:INSPECTOR_ID,label:"Vuex",icon:"storage",treeFilterPlaceholder:"Filter stores..."}),n.on.getInspectorTree(function(r){if(r.app===t&&r.inspectorId===INSPECTOR_ID)if(r.filter){var s=[];flattenStoreForInspectorTree(s,e._modules.root,r.filter,""),r.rootNodes=s}else r.rootNodes=[formatStoreForInspectorTree(e._modules.root,"")]}),n.on.getInspectorState(function(r){if(r.app===t&&r.inspectorId===INSPECTOR_ID){var s=r.nodeId;makeLocalGetters(e,s),r.state=formatStoreForInspectorState(getStoreModule(e._modules,s),s==="root"?e.getters:e._makeLocalGettersCache,s)}}),n.on.editInspectorState(function(r){if(r.app===t&&r.inspectorId===INSPECTOR_ID){var s=r.nodeId,i=r.path;s!=="root"&&(i=s.split("/").filter(Boolean).concat(i)),e._withCommit(function(){r.set(e._state.data,i,r.state.value)})}}),e.subscribe(function(r,s){var i={};r.payload&&(i.payload=r.payload),i.state=s,n.notifyComponentUpdate(),n.sendInspectorTree(INSPECTOR_ID),n.sendInspectorState(INSPECTOR_ID),n.addTimelineEvent({layerId:MUTATIONS_LAYER_ID,event:{time:Date.now(),title:r.type,data:i}})}),e.subscribeAction({before:function(r,s){var i={};r.payload&&(i.payload=r.payload),r._id=actionId++,r._time=Date.now(),i.state=s,n.addTimelineEvent({layerId:ACTIONS_LAYER_ID,event:{time:r._time,title:r.type,groupId:r._id,subtitle:"start",data:i}})},after:function(r,s){var i={},o=Date.now()-r._time;i.duration={_custom:{type:"duration",display:o+"ms",tooltip:"Action duration",value:o}},r.payload&&(i.payload=r.payload),i.state=s,n.addTimelineEvent({layerId:ACTIONS_LAYER_ID,event:{time:Date.now(),title:r.type,groupId:r._id,subtitle:"end",data:i}})}})})}var COLOR_LIME_500=8702998,COLOR_DARK=6710886,COLOR_WHITE=16777215,TAG_NAMESPACED={label:"namespaced",textColor:COLOR_WHITE,backgroundColor:COLOR_DARK};function extractNameFromPath(t){return t&&t!=="root"?t.split("/").slice(-2,-1)[0]:"Root"}function formatStoreForInspectorTree(t,e){return{id:e||"root",label:extractNameFromPath(e),tags:t.namespaced?[TAG_NAMESPACED]:[],children:Object.keys(t._children).map(function(n){return formatStoreForInspectorTree(t._children[n],e+n+"/")})}}function flattenStoreForInspectorTree(t,e,n,r){r.includes(n)&&t.push({id:r||"root",label:r.endsWith("/")?r.slice(0,r.length-1):r||"Root",tags:e.namespaced?[TAG_NAMESPACED]:[]}),Object.keys(e._children).forEach(function(s){flattenStoreForInspectorTree(t,e._children[s],n,r+s+"/")})}function formatStoreForInspectorState(t,e,n){e=n==="root"?e:e[n];var r=Object.keys(e),s={state:Object.keys(t.state).map(function(o){return{key:o,editable:!0,value:t.state[o]}})};if(r.length){var i=transformPathsToObjectTree(e);s.getters=Object.keys(i).map(function(o){return{key:o.endsWith("/")?extractNameFromPath(o):o,editable:!1,value:canThrow(function(){return i[o]})}})}return s}function transformPathsToObjectTree(t){var e={};return Object.keys(t).forEach(function(n){var r=n.split("/");if(r.length>1){var s=e,i=r.pop();r.forEach(function(o){s[o]||(s[o]={_custom:{value:{},display:o,tooltip:"Module",abstract:!0}}),s=s[o]._custom.value}),s[i]=canThrow(function(){return t[n]})}else e[n]=canThrow(function(){return t[n]})}),e}function getStoreModule(t,e){var n=e.split("/").filter(function(r){return r});return n.reduce(function(r,s,i){var o=r[s];if(!o)throw new Error('Missing module "'+s+'" for path "'+e+'".');return i===n.length-1?o:o._children},e==="root"?t:t.root._children)}function canThrow(t){try{return t()}catch(e){return e}}var Module=function t(e,n){this.runtime=n,this._children=Object.create(null),this._rawModule=e;var r=e.state;this.state=(typeof r=="function"?r():r)||{}},prototypeAccessors$1={namespaced:{configurable:!0}};prototypeAccessors$1.namespaced.get=function(){return!!this._rawModule.namespaced};Module.prototype.addChild=function t(e,n){this._children[e]=n};Module.prototype.removeChild=function t(e){delete this._children[e]};Module.prototype.getChild=function t(e){return this._children[e]};Module.prototype.hasChild=function t(e){return e in this._children};Module.prototype.update=function t(e){this._rawModule.namespaced=e.namespaced,e.actions&&(this._rawModule.actions=e.actions),e.mutations&&(this._rawModule.mutations=e.mutations),e.getters&&(this._rawModule.getters=e.getters)};Module.prototype.forEachChild=function t(e){forEachValue(this._children,e)};Module.prototype.forEachGetter=function t(e){this._rawModule.getters&&forEachValue(this._rawModule.getters,e)};Module.prototype.forEachAction=function t(e){this._rawModule.actions&&forEachValue(this._rawModule.actions,e)};Module.prototype.forEachMutation=function t(e){this._rawModule.mutations&&forEachValue(this._rawModule.mutations,e)};Object.defineProperties(Module.prototype,prototypeAccessors$1);var ModuleCollection=function t(e){this.register([],e,!1)};ModuleCollection.prototype.get=function t(e){return e.reduce(function(n,r){return n.getChild(r)},this.root)};ModuleCollection.prototype.getNamespace=function t(e){var n=this.root;return e.reduce(function(r,s){return n=n.getChild(s),r+(n.namespaced?s+"/":"")},"")};ModuleCollection.prototype.update=function t(e){update([],this.root,e)};ModuleCollection.prototype.register=function t(e,n,r){var s=this;r===void 0&&(r=!0);var i=new Module(n,r);if(e.length===0)this.root=i;else{var o=this.get(e.slice(0,-1));o.addChild(e[e.length-1],i)}n.modules&&forEachValue(n.modules,function(a,l){s.register(e.concat(l),a,r)})};ModuleCollection.prototype.unregister=function t(e){var n=this.get(e.slice(0,-1)),r=e[e.length-1],s=n.getChild(r);!s||!s.runtime||n.removeChild(r)};ModuleCollection.prototype.isRegistered=function t(e){var n=this.get(e.slice(0,-1)),r=e[e.length-1];return n?n.hasChild(r):!1};function update(t,e,n){if(e.update(n),n.modules)for(var r in n.modules){if(!e.getChild(r))return;update(t.concat(r),e.getChild(r),n.modules[r])}}function createStore(t){return new Store(t)}var Store=function t(e){var n=this;e===void 0&&(e={});var r=e.plugins;r===void 0&&(r=[]);var s=e.strict;s===void 0&&(s=!1);var i=e.devtools;this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new ModuleCollection(e),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._makeLocalGettersCache=Object.create(null),this._devtools=i;var o=this,a=this,l=a.dispatch,c=a.commit;this.dispatch=function(f,g){return l.call(o,f,g)},this.commit=function(f,g,E){return c.call(o,f,g,E)},this.strict=s;var u=this._modules.root.state;installModule(this,u,[],this._modules.root),resetStoreState(this,u),r.forEach(function(d){return d(n)})},prototypeAccessors={state:{configurable:!0}};Store.prototype.install=function t(e,n){e.provide(n||storeKey,this),e.config.globalProperties.$store=this;var r=this._devtools!==void 0?this._devtools:!1;r&&addDevtools(e,this)};prototypeAccessors.state.get=function(){return this._state.data};prototypeAccessors.state.set=function(t){};Store.prototype.commit=function t(e,n,r){var s=this,i=unifyObjectStyle(e,n,r),o=i.type,a=i.payload,l={type:o,payload:a},c=this._mutations[o];!c||(this._withCommit(function(){c.forEach(function(d){d(a)})}),this._subscribers.slice().forEach(function(u){return u(l,s.state)}))};Store.prototype.dispatch=function t(e,n){var r=this,s=unifyObjectStyle(e,n),i=s.type,o=s.payload,a={type:i,payload:o},l=this._actions[i];if(!!l){try{this._actionSubscribers.slice().filter(function(u){return u.before}).forEach(function(u){return u.before(a,r.state)})}catch{}var c=l.length>1?Promise.all(l.map(function(u){return u(o)})):l[0](o);return new Promise(function(u,d){c.then(function(f){try{r._actionSubscribers.filter(function(g){return g.after}).forEach(function(g){return g.after(a,r.state)})}catch{}u(f)},function(f){try{r._actionSubscribers.filter(function(g){return g.error}).forEach(function(g){return g.error(a,r.state,f)})}catch{}d(f)})})}};Store.prototype.subscribe=function t(e,n){return genericSubscribe(e,this._subscribers,n)};Store.prototype.subscribeAction=function t(e,n){var r=typeof e=="function"?{before:e}:e;return genericSubscribe(r,this._actionSubscribers,n)};Store.prototype.watch=function t(e,n,r){var s=this;return watch(function(){return e(s.state,s.getters)},n,Object.assign({},r))};Store.prototype.replaceState=function t(e){var n=this;this._withCommit(function(){n._state.data=e})};Store.prototype.registerModule=function t(e,n,r){r===void 0&&(r={}),typeof e=="string"&&(e=[e]),this._modules.register(e,n),installModule(this,this.state,e,this._modules.get(e),r.preserveState),resetStoreState(this,this.state)};Store.prototype.unregisterModule=function t(e){var n=this;typeof e=="string"&&(e=[e]),this._modules.unregister(e),this._withCommit(function(){var r=getNestedState(n.state,e.slice(0,-1));delete r[e[e.length-1]]}),resetStore(this)};Store.prototype.hasModule=function t(e){return typeof e=="string"&&(e=[e]),this._modules.isRegistered(e)};Store.prototype.hotUpdate=function t(e){this._modules.update(e),resetStore(this,!0)};Store.prototype._withCommit=function t(e){var n=this._committing;this._committing=!0,e(),this._committing=n};Object.defineProperties(Store.prototype,prototypeAccessors);const removeElement=t=>{typeof t.remove<"u"?t.remove():t.parentNode.removeChild(t)};class Timer{constructor(e,n){this.startedAt=Date.now(),this.callback=e,this.delay=n,this.timer=setTimeout(e,n)}pause(){this.stop(),this.delay-=Date.now()-this.startedAt}resume(){this.stop(),this.startedAt=Date.now(),this.timer=setTimeout(this.callback,this.delay)}stop(){clearTimeout(this.timer)}}const POSITIONS={TOP_RIGHT:"top-right",TOP:"top",TOP_LEFT:"top-left",BOTTOM_RIGHT:"bottom-right",BOTTOM:"bottom",BOTTOM_LEFT:"bottom-left"},Positions=Object.freeze(POSITIONS);function definePosition(t,e,n){let r=null;switch(t){case POSITIONS.TOP:case POSITIONS.TOP_RIGHT:case POSITIONS.TOP_LEFT:r=e;break;case POSITIONS.BOTTOM:case POSITIONS.BOTTOM_RIGHT:case POSITIONS.BOTTOM_LEFT:r=n;break}return r}class Event$1{constructor(){this.queue={}}$on(e,n){this.queue[e]=this.queue[e]||[],this.queue[e].push(n)}$off(e,n){if(this.queue[e]){for(var r=0;r<this.queue[e].length;r++)if(this.queue[e][r]===n){this.queue[e].splice(r,1);break}}}$emit(e,n){this.queue[e]&&this.queue[e].forEach(function(r){r(n)})}}const eventBus=new Event$1,Toaster_vue_vue_type_style_index_0_lang="",_sfc_main$3={name:"toast",props:{message:{type:String,required:!0},type:{type:String,default:"default"},position:{type:String,default:Positions.BOTTOM_RIGHT,validator(t){return Object.values(Positions).includes(t)}},maxToasts:{type:[Number,Boolean],default:!1},duration:{type:[Number,Boolean],default:4e3},dismissible:{type:Boolean,default:!0},queue:{type:Boolean,default:!1},pauseOnHover:{type:Boolean,default:!0},useDefaultCss:{type:Boolean,default:!0},onClose:{type:Function,default:()=>{}},onClick:{type:Function,default:()=>{}}},data(){return{isActive:!1,parentTop:null,parentBottom:null,isHovered:!1,timer:null}},beforeMount(){this.createParents(),this.setDefaultCss(),this.setupContainer()},mounted(){this.showNotice(),eventBus.$on("toast-clear",this.close)},methods:{createParents(){this.parentTop=document.querySelector(".c-toast-container--top"),this.parentBottom=document.querySelector(".c-toast-container--bottom"),!(this.parentTop&&this.parentBottom)&&(this.parentTop||(this.parentTop=document.createElement("div"),this.parentTop.className="c-toast-container c-toast-container--top"),this.parentBottom||(this.parentBottom=document.createElement("div"),this.parentBottom.className="c-toast-container c-toast-container--bottom"))},setDefaultCss(){const t=this.useDefaultCss?"add":"remove";this.parentTop.classList[t]("v--default-css"),this.parentBottom.classList[t]("v--default-css")},setupContainer(){const t=document.body;t.appendChild(this.parentTop),t.appendChild(this.parentBottom)},shouldQueue(){return!this.queue&&this.maxToasts===!1?!1:this.maxToasts!==!1?this.maxToasts<=this.parentTop.childElementCount+this.parentBottom.childElementCount:this.parentTop.childElementCount>0||this.parentBottom.childElementCount>0},showNotice(){if(this.shouldQueue()){this.queueTimer=setTimeout(this.showNotice,250);return}this.correctParent.insertAdjacentElement("afterbegin",this.$el),this.isActive=!0,this.timer=this.duration!==!1?new Timer(this.close,this.duration):null},click(){this.onClick.apply(null,arguments),this.dismissible&&this.close()},toggleTimer(t){this.timer&&this.pauseOnHover&&(t?this.timer.pause():this.timer.resume())},stopTimer(){this.timer&&this.timer.stop(),clearTimeout(this.queueTimer)},close(){this.stopTimer(),this.isActive=!1,setTimeout(()=>{this.onClose.apply(null,arguments),removeElement(this.$el)},150)}},computed:{correctParent(){return definePosition(this.position,this.parentTop,this.parentBottom)},transition(){return definePosition(this.position,{enter:"fadeInDown",leave:"fadeOut"},{enter:"fadeInUp",leave:"fadeOut"})}},beforeUnmount(){eventBus.$off("toast-clear",this.close)}},_hoisted_1$2=["innerHTML"];function _sfc_render$3(t,e,n,r,s,i){return openBlock(),createBlock(Transition,{"enter-active-class":i.transition.enter,"leave-active-class":i.transition.leave},{default:withCtx(()=>[withDirectives(createBaseVNode("div",{class:normalizeClass(["c-toast",`c-toast--${n.type}`,`c-toast--${n.position}`]),onMouseover:e[0]||(e[0]=o=>i.toggleTimer(!0)),onMouseleave:e[1]||(e[1]=o=>i.toggleTimer(!1)),onClick:e[2]||(e[2]=(...o)=>i.click&&i.click(...o)),role:"alert",innerHTML:n.message},null,42,_hoisted_1$2),[[vShow,s.isActive]])]),_:1},8,["enter-active-class","leave-active-class"])}const Toaster=_export_sfc(_sfc_main$3,[["render",_sfc_render$3]]),createElement=()=>typeof document<"u"&&document.createElement("div"),mount=(t,{props:e,children:n,element:r,app:s}={})=>{let i=r||createElement(),o=h(t,e,n);return s&&s._context&&(o.appContext=s._context),render(o,i),{vNode:o,destroy:()=>{i&&render(null,i),i=null,o=null},el:i}},Api=(t={})=>({show(e,n={}){let r={message:e,...n};return mount(Toaster,{props:{...t,...r}})},clear(){eventBus.$emit("toast-clear")},success(e,n={}){return n.type="success",this.show(e,n)},error(e,n={}){return n.type="error",this.show(e,n)},info(e,n={}){return n.type="info",this.show(e,n)},warning(e,n={}){return n.type="warning",this.show(e,n)}}),Plugin=(t,e={})=>{let n=Api(e);t.$toast=n,t.config.globalProperties.$toast=n};Toaster.install=Plugin;const toaster=Api({position:"top-right"}),store=createStore({state:{user:null,toast:!1,userIsLoaded:!1,skeletonLoaded:!1},mutations:{SET_USER(t,e){t.user=e},CLEAR_USER(t){t.user=null},setUserLoadedState(t){t.userIsLoaded=!0},setSkeletonLoaded(t){t.skeletonLoaded=!0}},actions:{async login({commit:t},e){const{email:n,password:r}=e;try{await signInWithEmailAndPassword(auth,n,r)}catch(s){switch(s.code){case"auth/user-not-found":toaster.show("User not found");break;case"auth/wrong-password":toaster.show("Wrong password");break;default:toaster.show("Something went wrong")}return}t("SET_USER",auth.currentUser),router.push("/"),toaster.show("Welcome back")},async register({commit:t},e){const{email:n,password:r}=e;try{await createUserWithEmailAndPassword(auth,n,r)}catch(s){switch(s.code){case"auth/email-already-in-use":toaster.show("Email already in use");break;case"auth/invalid-email":toaster.show("Invalid email");break;case"auth/operation-not-allowed":toaster.show("Operation not allowed");break;case"auth/weak-password":toaster.show("Weak password");break}return}t("SET_USER",auth.currentUser),router.push("/"),toaster.show("Hi, it is your profile. Have a nice time")},async logout({commit:t}){await signOut(auth),t("CLEAR_USER"),router.push("/login?=message=logout"),toaster.show("LOGOUT")},fetchUser({commit:t}){auth.onAuthStateChanged(async e=>{e===null?t("CLEAR_USER"):(t("SET_USER",e),router.isReady()&&router.currentRoute.value.path==="/login"&&router.push("/")),t("setUserLoadedState"),t("setSkeletonLoaded")})}}}),Header_vue_vue_type_style_index_0_lang="",_sfc_main$2={},_hoisted_1$1={id:"nav",class:"nav"},_hoisted_2$1={class:"container"},_hoisted_3$1={class:"flex-center-between"},_hoisted_4$1={class:"list"},_hoisted_5={class:"list-link"},_hoisted_6={class:"list-link"},_hoisted_7={class:"list-link"},_hoisted_8={class:"list-link"};function _sfc_render$2(t,e){const n=resolveComponent("router-link");return openBlock(),createElementBlock("div",_hoisted_1$1,[createBaseVNode("div",_hoisted_2$1,[createBaseVNode("div",_hoisted_3$1,[createBaseVNode("ul",_hoisted_4$1,[createBaseVNode("li",_hoisted_5,[createVNode(n,{to:"/"},{default:withCtx(()=>[createTextVNode("Home")]),_:1})]),createBaseVNode("li",_hoisted_6,[createVNode(n,{to:"/calculator"},{default:withCtx(()=>[createTextVNode("Calculator")]),_:1})]),createBaseVNode("li",_hoisted_7,[createVNode(n,{to:"/todo"},{default:withCtx(()=>[createTextVNode("Todo-List")]),_:1})]),createBaseVNode("li",_hoisted_8,[createVNode(n,{to:"/weather-forecast"},{default:withCtx(()=>[createTextVNode("Weather Forecast")]),_:1})])]),createBaseVNode("button",{class:"btn-logout",onClick:e[0]||(e[0]=r=>t.$store.dispatch("logout"))},"Logout")])])])}const Header=_export_sfc(_sfc_main$2,[["render",_sfc_render$2]]),SkeletonHeader_vue_vue_type_style_index_0_scoped_de13db63_lang="",_sfc_main$1={},_hoisted_1={id:"nav",class:"nav"},_hoisted_2={class:"container"},_hoisted_3={class:"flex-center-between"},_hoisted_4=createStaticVNode('<ul class="list" data-v-de13db63><li class="list-link" data-v-de13db63></li><li class="list-link" data-v-de13db63></li><li class="list-link" data-v-de13db63></li><li class="list-link" data-v-de13db63></li></ul>',1);function _sfc_render$1(t,e){return openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",_hoisted_2,[createBaseVNode("div",_hoisted_3,[_hoisted_4,createBaseVNode("button",{class:"btn-logout",onClick:e[0]||(e[0]=n=>t.$store.dispatch("logout"))},"Logout")])])])}const SkeletonHeader=_export_sfc(_sfc_main$1,[["render",_sfc_render$1],["__scopeId","data-v-de13db63"]]),app_vue_vue_type_style_index_0_lang="",_sfc_main={components:{Header,Spinner,SkeletonHeader},created(){this.$store.dispatch("fetchUser")}};function _sfc_render(t,e,n,r,s,i){const o=resolveComponent("SkeletonHeader"),a=resolveComponent("Header"),l=resolveComponent("Spinner"),c=resolveComponent("router-view");return openBlock(),createElementBlock(Fragment,null,[t.$store.state.skeletonLoaded?createCommentVNode("",!0):(openBlock(),createBlock(o,{key:0})),t.$store.state.user?(openBlock(),createBlock(a,{key:1})):createCommentVNode("",!0),createVNode(Transition,{name:"fade",mode:"out-in"},{default:withCtx(()=>[t.$store.state.userIsLoaded?(openBlock(),createBlock(c,{key:1})):(openBlock(),createBlock(l,{key:0}))]),_:1})],64)}const App=_export_sfc(_sfc_main,[["render",_sfc_render]]);createApp(App).use(store).use(router).mount("#app");
