var Xd=Object.defineProperty;var qd=(r,e,t)=>e in r?Xd(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var ce=(r,e,t)=>qd(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ia="165",Ei={ROTATE:0,DOLLY:1,PAN:2},Ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qd=0,Oa=1,Yd=2,Yc=1,Kd=2,In=3,yn=0,Wt=1,nn=2,Jn=0,ei=1,Na=2,za=3,Ha=4,Kc=5,pi=100,jd=101,Zd=102,$d=103,Jd=104,eu=200,tu=201,nu=202,iu=203,Ps=204,Ds=205,su=206,ru=207,ou=208,au=209,lu=210,cu=211,du=212,uu=213,hu=214,fu=0,pu=1,mu=2,Cr=3,gu=4,Au=5,Su=6,xu=7,jc=0,_u=1,vu=2,ti=0,yu=1,Mu=2,Cu=3,Zc=4,Eu=5,Tu=6,wu=7,$c=300,os=301,as=302,Wo=303,Xo=304,Hr=306,qo=1e3,Si=1001,Qo=1002,Vt=1003,bu=1004,Xs=1005,dn=1006,jr=1007,xi=1008,Hn=1009,Ru=1010,Iu=1011,Er=1012,Jc=1013,un=1014,xn=1015,zs=1016,ed=1017,td=1018,ls=1020,Pu=35902,Du=1021,Fu=1022,Gt=1023,Lu=1024,Bu=1025,vi=1026,cs=1027,Uu=1028,sa=1029,Ou=1030,nd=1031,Cs=1033,Zr=33776,$r=33777,Jr=33778,eo=33779,ka=35840,Va=35841,Ga=35842,Wa=35843,Xa=36196,qa=37492,Qa=37496,Ya=37808,Ka=37809,ja=37810,Za=37811,$a=37812,Ja=37813,el=37814,tl=37815,nl=37816,il=37817,sl=37818,rl=37819,ol=37820,al=37821,to=36492,ll=36494,cl=36495,Nu=36283,dl=36284,ul=36285,hl=36286,zu=3200,Hu=3201,ku=0,Vu=1,Zn="",cn="srgb",si="srgb-linear",ra="display-p3",kr="display-p3-linear",Tr="linear",lt="srgb",wr="rec709",br="p3",wi=7680,fl=519,Gu=512,Wu=513,Xu=514,id=515,qu=516,Qu=517,Yu=518,Ku=519,pl=35044,ju=35048,ml="300 es",Nn=2e3,Rr=2001;class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let gl=1234567;const Es=Math.PI/180,Fs=180/Math.PI;function ps(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[r&255]+Pt[r>>8&255]+Pt[r>>16&255]+Pt[r>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function It(r,e,t){return Math.max(e,Math.min(t,r))}function oa(r,e){return(r%e+e)%e}function Zu(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function $u(r,e,t){return r!==e?(t-r)/(e-r):0}function Ts(r,e,t){return(1-t)*r+t*e}function Ju(r,e,t,n){return Ts(r,e,1-Math.exp(-t*n))}function eh(r,e=1){return e-Math.abs(oa(r,e*2)-e)}function th(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function nh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function ih(r,e){return r+Math.floor(Math.random()*(e-r+1))}function sh(r,e){return r+Math.random()*(e-r)}function rh(r){return r*(.5-Math.random())}function oh(r){r!==void 0&&(gl=r);let e=gl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ah(r){return r*Es}function lh(r){return r*Fs}function ch(r){return(r&r-1)===0&&r!==0}function dh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function uh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function hh(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),d=o((e+n)/2),u=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*d,l*u,l*f,a*c);break;case"YZY":r.set(l*f,a*d,l*u,a*c);break;case"ZXZ":r.set(l*u,l*f,a*d,a*c);break;case"XZX":r.set(a*d,l*g,l*h,a*c);break;case"YXY":r.set(l*h,a*d,l*g,a*c);break;case"ZYZ":r.set(l*g,l*h,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Qi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Bt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const yi={DEG2RAD:Es,RAD2DEG:Fs,generateUUID:ps,clamp:It,euclideanModulo:oa,mapLinear:Zu,inverseLerp:$u,lerp:Ts,damp:Ju,pingpong:eh,smoothstep:th,smootherstep:nh,randInt:ih,randFloat:sh,randFloatSpread:rh,seededRandom:oh,degToRad:ah,radToDeg:lh,isPowerOfTwo:ch,ceilPowerOfTwo:dh,floorPowerOfTwo:uh,setQuaternionFromProperEuler:hh,normalize:Bt,denormalize:Qi};class xe{constructor(e=0,t=0){xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,i,s,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],h=n[5],g=n[8],A=i[0],p=i[3],m=i[6],S=i[1],x=i[4],v=i[7],E=i[2],C=i[5],y=i[8];return s[0]=o*A+a*S+l*E,s[3]=o*p+a*x+l*C,s[6]=o*m+a*v+l*y,s[1]=c*A+d*S+u*E,s[4]=c*p+d*x+u*C,s[7]=c*m+d*v+u*y,s[2]=f*A+h*S+g*E,s[5]=f*p+h*x+g*C,s[8]=f*m+h*v+g*y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*s*d+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=d*o-a*c,f=a*l-d*s,h=c*s-o*l,g=t*u+n*f+i*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/g;return e[0]=u*A,e[1]=(i*c-d*n)*A,e[2]=(a*n-i*o)*A,e[3]=f*A,e[4]=(d*t-i*l)*A,e[5]=(i*s-a*t)*A,e[6]=h*A,e[7]=(n*l-c*t)*A,e[8]=(o*t-n*s)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(no.makeScale(e,t)),this}rotate(e){return this.premultiply(no.makeRotation(-e)),this}translate(e,t){return this.premultiply(no.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const no=new ke;function sd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ir(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function fh(){const r=Ir("canvas");return r.style.display="block",r}const Al={};function rd(r){r in Al||(Al[r]=!0,console.warn(r))}function ph(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Sl=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),xl=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qs={[si]:{transfer:Tr,primaries:wr,toReference:r=>r,fromReference:r=>r},[cn]:{transfer:lt,primaries:wr,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[kr]:{transfer:Tr,primaries:br,toReference:r=>r.applyMatrix3(xl),fromReference:r=>r.applyMatrix3(Sl)},[ra]:{transfer:lt,primaries:br,toReference:r=>r.convertSRGBToLinear().applyMatrix3(xl),fromReference:r=>r.applyMatrix3(Sl).convertLinearToSRGB()}},mh=new Set([si,kr]),tt={enabled:!0,_workingColorSpace:si,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!mh.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=qs[e].toReference,i=qs[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return qs[r].primaries},getTransfer:function(r){return r===Zn?Tr:qs[r].transfer}};function $i(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function io(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let bi;class gh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{bi===void 0&&(bi=Ir("canvas")),bi.width=e.width,bi.height=e.height;const n=bi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ir("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=$i(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($i(t[n]/255)*255):t[n]=$i(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ah=0;class od{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=ps(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(so(i[o].image)):s.push(so(i[o]))}else s=so(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function so(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?gh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sh=0;class zt extends Ci{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=Si,i=Si,s=dn,o=xi,a=Gt,l=Hn,c=zt.DEFAULT_ANISOTROPY,d=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=ps(),this.name="",this.source=new od(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qo:e.x=e.x-Math.floor(e.x);break;case Si:e.x=e.x<0?0:1;break;case Qo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qo:e.y=e.y-Math.floor(e.y);break;case Si:e.y=e.y<0?0:1;break;case Qo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=$c;zt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,i=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],h=l[5],g=l[9],A=l[2],p=l[6],m=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-A)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+A)<.1&&Math.abs(g+p)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(h+1)/2,E=(m+1)/2,C=(d+f)/4,y=(u+A)/4,R=(g+p)/4;return x>v&&x>E?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=C/n,s=y/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=C/i,s=R/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=y/s,i=R/s),this.set(n,i,s,t),this}let S=Math.sqrt((p-g)*(p-g)+(u-A)*(u-A)+(f-d)*(f-d));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(u-A)/S,this.z=(f-d)/S,this.w=Math.acos((c+h+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xh extends Ci{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new zt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new od(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends xh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ad extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _h extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],d=n[i+2],u=n[i+3];const f=s[o+0],h=s[o+1],g=s[o+2],A=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=A;return}if(u!==A||l!==f||c!==h||d!==g){let p=1-a;const m=l*f+c*h+d*g+u*A,S=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const E=Math.sqrt(x),C=Math.atan2(E,m*S);p=Math.sin(p*C)/E,a=Math.sin(a*C)/E}const v=a*S;if(l=l*p+f*v,c=c*p+h*v,d=d*p+g*v,u=u*p+A*v,p===1-a){const E=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=E,c*=E,d*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],d=n[i+3],u=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+d*u+l*h-c*f,e[t+1]=l*g+d*f+c*u-a*h,e[t+2]=c*g+d*h+a*f-l*u,e[t+3]=d*g-a*u-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(i/2),u=a(s/2),f=l(n/2),h=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"YXZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"ZXY":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"ZYX":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"YZX":this._x=f*d*u+c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u-f*h*g;break;case"XZY":this._x=f*d*u-c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+a+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(d-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>u){const h=2*Math.sqrt(1+n-a-u);this._w=(d-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>u){const h=2*Math.sqrt(1+a-n-u);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+u-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+i*c-s*l,this._y=i*d+o*l+s*a-n*c,this._z=s*d+o*c+n*l-i*a,this._w=o*d-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_l.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_l.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),d=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*d,this.y=n+l*d+a*c-s*u,this.z=i+l*u+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ro.copy(this).projectOnVector(e),this.sub(ro)}reflect(e){return this.sub(ro.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ro=new b,_l=new nt;class hn{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,on):on.fromBufferAttribute(s,o),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qs.copy(n.boundingBox)),Qs.applyMatrix4(e.matrixWorld),this.union(Qs)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xs),Ys.subVectors(this.max,xs),Ri.subVectors(e.a,xs),Ii.subVectors(e.b,xs),Pi.subVectors(e.c,xs),Vn.subVectors(Ii,Ri),Gn.subVectors(Pi,Ii),ai.subVectors(Ri,Pi);let t=[0,-Vn.z,Vn.y,0,-Gn.z,Gn.y,0,-ai.z,ai.y,Vn.z,0,-Vn.x,Gn.z,0,-Gn.x,ai.z,0,-ai.x,-Vn.y,Vn.x,0,-Gn.y,Gn.x,0,-ai.y,ai.x,0];return!oo(t,Ri,Ii,Pi,Ys)||(t=[1,0,0,0,1,0,0,0,1],!oo(t,Ri,Ii,Pi,Ys))?!1:(Ks.crossVectors(Vn,Gn),t=[Ks.x,Ks.y,Ks.z],oo(t,Ri,Ii,Pi,Ys))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Cn=[new b,new b,new b,new b,new b,new b,new b,new b],on=new b,Qs=new hn,Ri=new b,Ii=new b,Pi=new b,Vn=new b,Gn=new b,ai=new b,xs=new b,Ys=new b,Ks=new b,li=new b;function oo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){li.fromArray(r,s);const a=i.x*Math.abs(li.x)+i.y*Math.abs(li.y)+i.z*Math.abs(li.z),l=e.dot(li),c=t.dot(li),d=n.dot(li);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const vh=new hn,_s=new b,ao=new b;class aa{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vh.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_s,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(ao)),this.expandByPoint(_s.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new b,lo=new b,js=new b,Wn=new b,co=new b,Zs=new b,uo=new b;let la=class{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){lo.copy(e).add(t).multiplyScalar(.5),js.copy(t).sub(e).normalize(),Wn.copy(this.origin).sub(lo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(js),a=Wn.dot(this.direction),l=-Wn.dot(js),c=Wn.lengthSq(),d=Math.abs(1-o*o);let u,f,h,g;if(d>0)if(u=o*l-a,f=o*a-l,g=s*d,u>=0)if(f>=-g)if(f<=g){const A=1/d;u*=A,f*=A,h=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),h=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),h=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(lo).addScaledVector(js,f),h}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),i=En.dot(En)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,i,s){co.subVectors(t,e),Zs.subVectors(n,e),uo.crossVectors(co,Zs);let o=this.direction.dot(uo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Wn.subVectors(this.origin,e);const l=a*this.direction.dot(Zs.crossVectors(Wn,Zs));if(l<0)return null;const c=a*this.direction.dot(co.cross(Wn));if(c<0||l+c>o)return null;const d=-a*Wn.dot(uo);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ze{constructor(e,t,n,i,s,o,a,l,c,d,u,f,h,g,A,p){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,d,u,f,h,g,A,p)}set(e,t,n,i,s,o,a,l,c,d,u,f,h,g,A,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=d,m[10]=u,m[14]=f,m[3]=h,m[7]=g,m[11]=A,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Di.setFromMatrixColumn(e,0).length(),s=1/Di.setFromMatrixColumn(e,1).length(),o=1/Di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*d,h=o*u,g=a*d,A=a*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=h+g*c,t[5]=f-A*c,t[9]=-a*l,t[2]=A-f*c,t[6]=g+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*d,h=l*u,g=c*d,A=c*u;t[0]=f+A*a,t[4]=g*a-h,t[8]=o*c,t[1]=o*u,t[5]=o*d,t[9]=-a,t[2]=h*a-g,t[6]=A+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*d,h=l*u,g=c*d,A=c*u;t[0]=f-A*a,t[4]=-o*u,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*d,t[9]=A-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*d,h=o*u,g=a*d,A=a*u;t[0]=l*d,t[4]=g*c-h,t[8]=f*c+A,t[1]=l*u,t[5]=A*c+f,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,g=a*l,A=a*c;t[0]=l*d,t[4]=A-f*u,t[8]=g*u+h,t[1]=u,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=h*u+g,t[10]=f-A*u}else if(e.order==="XZY"){const f=o*l,h=o*c,g=a*l,A=a*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+A,t[5]=o*d,t[9]=h*u-g,t[2]=g*u-h,t[6]=a*d,t[10]=A*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yh,e,Mh)}lookAt(e,t,n){const i=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Xn.crossVectors(n,Qt),Xn.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Xn.crossVectors(n,Qt)),Xn.normalize(),$s.crossVectors(Qt,Xn),i[0]=Xn.x,i[4]=$s.x,i[8]=Qt.x,i[1]=Xn.y,i[5]=$s.y,i[9]=Qt.y,i[2]=Xn.z,i[6]=$s.z,i[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],h=n[13],g=n[2],A=n[6],p=n[10],m=n[14],S=n[3],x=n[7],v=n[11],E=n[15],C=i[0],y=i[4],R=i[8],M=i[12],_=i[1],I=i[5],L=i[9],D=i[13],F=i[2],z=i[6],N=i[10],G=i[14],k=i[3],Y=i[7],J=i[11],de=i[15];return s[0]=o*C+a*_+l*F+c*k,s[4]=o*y+a*I+l*z+c*Y,s[8]=o*R+a*L+l*N+c*J,s[12]=o*M+a*D+l*G+c*de,s[1]=d*C+u*_+f*F+h*k,s[5]=d*y+u*I+f*z+h*Y,s[9]=d*R+u*L+f*N+h*J,s[13]=d*M+u*D+f*G+h*de,s[2]=g*C+A*_+p*F+m*k,s[6]=g*y+A*I+p*z+m*Y,s[10]=g*R+A*L+p*N+m*J,s[14]=g*M+A*D+p*G+m*de,s[3]=S*C+x*_+v*F+E*k,s[7]=S*y+x*I+v*z+E*Y,s[11]=S*R+x*L+v*N+E*J,s[15]=S*M+x*D+v*G+E*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],h=e[14],g=e[3],A=e[7],p=e[11],m=e[15];return g*(+s*l*u-i*c*u-s*a*f+n*c*f+i*a*h-n*l*h)+A*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*d-s*l*d)+p*(+t*c*u-t*a*h-s*o*u+n*o*h+s*a*d-n*c*d)+m*(-i*a*d-t*l*u+t*a*f+i*o*u-n*o*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],h=e[11],g=e[12],A=e[13],p=e[14],m=e[15],S=u*p*c-A*f*c+A*l*h-a*p*h-u*l*m+a*f*m,x=g*f*c-d*p*c-g*l*h+o*p*h+d*l*m-o*f*m,v=d*A*c-g*u*c+g*a*h-o*A*h-d*a*m+o*u*m,E=g*u*l-d*A*l-g*a*f+o*A*f+d*a*p-o*u*p,C=t*S+n*x+i*v+s*E;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const y=1/C;return e[0]=S*y,e[1]=(A*f*s-u*p*s-A*i*h+n*p*h+u*i*m-n*f*m)*y,e[2]=(a*p*s-A*l*s+A*i*c-n*p*c-a*i*m+n*l*m)*y,e[3]=(u*l*s-a*f*s-u*i*c+n*f*c+a*i*h-n*l*h)*y,e[4]=x*y,e[5]=(d*p*s-g*f*s+g*i*h-t*p*h-d*i*m+t*f*m)*y,e[6]=(g*l*s-o*p*s-g*i*c+t*p*c+o*i*m-t*l*m)*y,e[7]=(o*f*s-d*l*s+d*i*c-t*f*c-o*i*h+t*l*h)*y,e[8]=v*y,e[9]=(g*u*s-d*A*s-g*n*h+t*A*h+d*n*m-t*u*m)*y,e[10]=(o*A*s-g*a*s+g*n*c-t*A*c-o*n*m+t*a*m)*y,e[11]=(d*a*s-o*u*s-d*n*c+t*u*c+o*n*h-t*a*h)*y,e[12]=E*y,e[13]=(d*A*i-g*u*i+g*n*f-t*A*f-d*n*p+t*u*p)*y,e[14]=(g*a*i-o*A*i-g*n*l+t*A*l+o*n*p-t*a*p)*y,e[15]=(o*u*i-d*a*i+d*n*l-t*u*l-o*n*f+t*a*f)*y,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,d*a+n,d*l-i*o,0,c*l-i*a,d*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,d=o+o,u=a+a,f=s*c,h=s*d,g=s*u,A=o*d,p=o*u,m=a*u,S=l*c,x=l*d,v=l*u,E=n.x,C=n.y,y=n.z;return i[0]=(1-(A+m))*E,i[1]=(h+v)*E,i[2]=(g-x)*E,i[3]=0,i[4]=(h-v)*C,i[5]=(1-(f+m))*C,i[6]=(p+S)*C,i[7]=0,i[8]=(g+x)*y,i[9]=(p-S)*y,i[10]=(1-(f+A))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Di.set(i[0],i[1],i[2]).length();const o=Di.set(i[4],i[5],i[6]).length(),a=Di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],an.copy(this);const c=1/s,d=1/o,u=1/a;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=d,an.elements[5]*=d,an.elements[6]*=d,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,t.setFromRotationMatrix(an),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Nn){const l=this.elements,c=2*s/(t-e),d=2*s/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i);let h,g;if(a===Nn)h=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Rr)h=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Nn){const l=this.elements,c=1/(t-e),d=1/(n-i),u=1/(o-s),f=(t+e)*c,h=(n+i)*d;let g,A;if(a===Nn)g=(o+s)*u,A=-2*u;else if(a===Rr)g=s*u,A=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=A,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Di=new b,an=new ze,yh=new b(0,0,0),Mh=new b(1,1,1),Xn=new b,$s=new b,Qt=new b,vl=new ze,yl=new nt;class fn{constructor(e=0,t=0,n=0,i=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],d=i[9],u=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(It(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-It(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(It(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-It(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(It(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yl.setFromEuler(this),this.setFromQuaternion(yl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class ca{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ch=0;const Ml=new b,Fi=new nt,Tn=new ze,Js=new b,vs=new b,Eh=new b,Th=new nt,Cl=new b(1,0,0),El=new b(0,1,0),Tl=new b(0,0,1),wl={type:"added"},wh={type:"removed"},Li={type:"childadded",child:null},ho={type:"childremoved",child:null};class Mt extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new b,t=new fn,n=new nt,i=new b(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ze},normalMatrix:{value:new ke}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Cl,e)}rotateY(e){return this.rotateOnAxis(El,e)}rotateZ(e){return this.rotateOnAxis(Tl,e)}translateOnAxis(e,t){return Ml.copy(e).applyQuaternion(this.quaternion),this.position.add(Ml.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cl,e)}translateY(e){return this.translateOnAxis(El,e)}translateZ(e){return this.translateOnAxis(Tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(vs,Js,this.up):Tn.lookAt(Js,vs,this.up),this.quaternion.setFromRotationMatrix(Tn),i&&(Tn.extractRotation(i.matrixWorld),Fi.setFromRotationMatrix(Tn),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wl),Li.child=e,this.dispatchEvent(Li),Li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wh),ho.child=e,this.dispatchEvent(ho),ho.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wl),Li.child=e,this.dispatchEvent(Li),Li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,e,Eh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,Th,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),u=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Mt.DEFAULT_UP=new b(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new b,wn=new b,fo=new b,bn=new b,Bi=new b,Ui=new b,bl=new b,po=new b,mo=new b,go=new b;class Sn{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ln.subVectors(e,t),i.cross(ln);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ln.subVectors(i,t),wn.subVectors(n,t),fo.subVectors(e,t);const o=ln.dot(ln),a=ln.dot(wn),l=ln.dot(fo),c=wn.dot(wn),d=wn.dot(fo),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,h=(c*l-a*d)*f,g=(o*d-a*l)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bn.x),l.addScaledVector(o,bn.y),l.addScaledVector(a,bn.z),l)}static isFrontFacing(e,t,n,i){return ln.subVectors(n,t),wn.subVectors(e,t),ln.cross(wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),ln.cross(wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Sn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Bi.subVectors(i,n),Ui.subVectors(s,n),po.subVectors(e,n);const l=Bi.dot(po),c=Ui.dot(po);if(l<=0&&c<=0)return t.copy(n);mo.subVectors(e,i);const d=Bi.dot(mo),u=Ui.dot(mo);if(d>=0&&u<=d)return t.copy(i);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(Bi,o);go.subVectors(e,s);const h=Bi.dot(go),g=Ui.dot(go);if(g>=0&&h<=g)return t.copy(s);const A=h*c-l*g;if(A<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ui,a);const p=d*g-h*u;if(p<=0&&u-d>=0&&h-g>=0)return bl.subVectors(s,i),a=(u-d)/(u-d+(h-g)),t.copy(i).addScaledVector(bl,a);const m=1/(p+A+f);return o=A*m,a=f*m,t.copy(n).addScaledVector(Bi,o).addScaledVector(Ui,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},er={h:0,s:0,l:0};function Ao(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=tt.workingColorSpace){if(e=oa(e,1),t=It(t,0,1),n=It(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ao(o,s,e+1/3),this.g=Ao(o,s,e),this.b=Ao(o,s,e-1/3)}return tt.toWorkingColorSpace(this,i),this}setStyle(e,t=cn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const n=ld[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=io(e.r),this.g=io(e.g),this.b=io(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return tt.fromWorkingColorSpace(Dt.copy(this),e),Math.round(It(Dt.r*255,0,255))*65536+Math.round(It(Dt.g*255,0,255))*256+Math.round(It(Dt.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(Dt.copy(this),t);const n=Dt.r,i=Dt.g,s=Dt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=d<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=cn){tt.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,i=Dt.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(qn),this.setHSL(qn.h+e,qn.s+t,qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qn),e.getHSL(er);const n=Ts(qn.h,er.h,t),i=Ts(qn.s,er.s,t),s=Ts(qn.l,er.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new je;je.NAMES=ld;let bh=0;class Vr extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=ei,this.side=yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ps,this.blendDst=Ds,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ei&&(n.blending=this.blending),this.side!==yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ps&&(n.blendSrc=this.blendSrc),this.blendDst!==Ds&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Cr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mi extends Vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bn=Rh();function Rh(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,d=0;for(;!(c&8388608);)c<<=1,d-=8388608;c&=-8388609,d+=947912704,s[l]=c|d}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function Ih(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=It(r,-65504,65504),Bn.floatView[0]=r;const e=Bn.uint32View[0],t=e>>23&511;return Bn.baseTable[t]+((e&8388607)>>Bn.shiftTable[t])}function Ph(r){const e=r>>10;return Bn.uint32View[0]=Bn.mantissaTable[Bn.offsetTable[e]+(r&1023)]+Bn.exponentTable[e],Bn.floatView[0]}const Ls={toHalfFloat:Ih,fromHalfFloat:Ph},xt=new b,tr=new xe;class sn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return rd("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tr.fromBufferAttribute(this,t),tr.applyMatrix3(e),this.setXY(t,tr.x,tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Qi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),i=Bt(i,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pl&&(e.usage=this.usage),e}}class cd extends sn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class dd extends sn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Zt extends sn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Dh=0;const en=new ze,So=new Mt,Oi=new b,Yt=new hn,ys=new hn,wt=new b;class rn extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sd(e)?dd:cd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return en.makeRotationFromQuaternion(e),this.applyMatrix4(en),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,n){return en.makeTranslation(e,t,n),this.applyMatrix4(en),this}scale(e,t,n){return en.makeScale(e,t,n),this.applyMatrix4(en),this}lookAt(e){return So.lookAt(e),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Zt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Yt.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new aa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ys.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(Yt.min,ys.min),Yt.expandByPoint(wt),wt.addVectors(Yt.max,ys.max),Yt.expandByPoint(wt)):(Yt.expandByPoint(ys.min),Yt.expandByPoint(ys.max))}Yt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)wt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)wt.fromBufferAttribute(a,c),l&&(Oi.fromBufferAttribute(e,c),wt.add(Oi)),i=Math.max(i,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new sn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new b,l[R]=new b;const c=new b,d=new b,u=new b,f=new xe,h=new xe,g=new xe,A=new b,p=new b;function m(R,M,_){c.fromBufferAttribute(n,R),d.fromBufferAttribute(n,M),u.fromBufferAttribute(n,_),f.fromBufferAttribute(s,R),h.fromBufferAttribute(s,M),g.fromBufferAttribute(s,_),d.sub(c),u.sub(c),h.sub(f),g.sub(f);const I=1/(h.x*g.y-g.x*h.y);isFinite(I)&&(A.copy(d).multiplyScalar(g.y).addScaledVector(u,-h.y).multiplyScalar(I),p.copy(u).multiplyScalar(h.x).addScaledVector(d,-g.x).multiplyScalar(I),a[R].add(A),a[M].add(A),a[_].add(A),l[R].add(p),l[M].add(p),l[_].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let R=0,M=S.length;R<M;++R){const _=S[R],I=_.start,L=_.count;for(let D=I,F=I+L;D<F;D+=3)m(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const x=new b,v=new b,E=new b,C=new b;function y(R){E.fromBufferAttribute(i,R),C.copy(E);const M=a[R];x.copy(M),x.sub(E.multiplyScalar(E.dot(M))).normalize(),v.crossVectors(C,M);const I=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,I)}for(let R=0,M=S.length;R<M;++R){const _=S[R],I=_.start,L=_.count;for(let D=I,F=I+L;D<F;D+=3)y(e.getX(D+0)),y(e.getX(D+1)),y(e.getX(D+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new sn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new b,s=new b,o=new b,a=new b,l=new b,c=new b,d=new b,u=new b;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),A=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,A),o.fromBufferAttribute(t,p),d.subVectors(o,s),u.subVectors(i,s),d.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,p),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(A,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),d.subVectors(o,s),u.subVectors(i,s),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,u=a.normalized,f=new c.constructor(l.length*d);let h=0,g=0;for(let A=0,p=l.length;A<p;A++){a.isInterleavedBufferAttribute?h=l[A]*a.data.stride+a.offset:h=l[A]*d;for(let m=0;m<d;m++)f[g++]=c[h++]}return new sn(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,u=c.length;d<u;d++){const f=c[d],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const h=c[u];d.push(h.toJSON(e.data))}d.length>0&&(i[l]=d,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],u=s[c];for(let f=0,h=u.length;f<h;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rl=new ze,ci=new la,nr=new aa,Il=new b,Ni=new b,zi=new b,Hi=new b,xo=new b,ir=new b,sr=new xe,rr=new xe,or=new xe,Pl=new b,Dl=new b,Fl=new b,ar=new b,lr=new b;class gt extends Mt{constructor(e=new rn,t=new Mi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ir.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],u=s[l];d!==0&&(xo.fromBufferAttribute(u,e),o?ir.addScaledVector(xo,d):ir.addScaledVector(xo.sub(t),d))}t.add(ir)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),ci.copy(e.ray).recast(e.near),!(nr.containsPoint(ci.origin)===!1&&(ci.intersectSphere(nr,Il)===null||ci.origin.distanceToSquared(Il)>(e.far-e.near)**2))&&(Rl.copy(s).invert(),ci.copy(e.ray).applyMatrix4(Rl),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,A=f.length;g<A;g++){const p=f[g],m=o[p.materialIndex],S=Math.max(p.start,h.start),x=Math.min(a.count,Math.min(p.start+p.count,h.start+h.count));for(let v=S,E=x;v<E;v+=3){const C=a.getX(v),y=a.getX(v+1),R=a.getX(v+2);i=cr(this,m,e,n,c,d,u,C,y,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),A=Math.min(a.count,h.start+h.count);for(let p=g,m=A;p<m;p+=3){const S=a.getX(p),x=a.getX(p+1),v=a.getX(p+2);i=cr(this,o,e,n,c,d,u,S,x,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,A=f.length;g<A;g++){const p=f[g],m=o[p.materialIndex],S=Math.max(p.start,h.start),x=Math.min(l.count,Math.min(p.start+p.count,h.start+h.count));for(let v=S,E=x;v<E;v+=3){const C=v,y=v+1,R=v+2;i=cr(this,m,e,n,c,d,u,C,y,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),A=Math.min(l.count,h.start+h.count);for(let p=g,m=A;p<m;p+=3){const S=p,x=p+1,v=p+2;i=cr(this,o,e,n,c,d,u,S,x,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Fh(r,e,t,n,i,s,o,a){let l;if(e.side===Wt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===yn,a),l===null)return null;lr.copy(a),lr.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(lr);return c<t.near||c>t.far?null:{distance:c,point:lr.clone(),object:r}}function cr(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ni),r.getVertexPosition(l,zi),r.getVertexPosition(c,Hi);const d=Fh(r,e,t,n,Ni,zi,Hi,ar);if(d){i&&(sr.fromBufferAttribute(i,a),rr.fromBufferAttribute(i,l),or.fromBufferAttribute(i,c),d.uv=Sn.getInterpolation(ar,Ni,zi,Hi,sr,rr,or,new xe)),s&&(sr.fromBufferAttribute(s,a),rr.fromBufferAttribute(s,l),or.fromBufferAttribute(s,c),d.uv1=Sn.getInterpolation(ar,Ni,zi,Hi,sr,rr,or,new xe)),o&&(Pl.fromBufferAttribute(o,a),Dl.fromBufferAttribute(o,l),Fl.fromBufferAttribute(o,c),d.normal=Sn.getInterpolation(ar,Ni,zi,Hi,Pl,Dl,Fl,new b),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new b,materialIndex:0};Sn.getNormal(Ni,zi,Hi,u.normal),d.face=u}return d}class ms extends rn{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],u=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(d,3)),this.setAttribute("uv",new Zt(u,2));function g(A,p,m,S,x,v,E,C,y,R,M){const _=v/y,I=E/R,L=v/2,D=E/2,F=C/2,z=y+1,N=R+1;let G=0,k=0;const Y=new b;for(let J=0;J<N;J++){const de=J*I-D;for(let Re=0;Re<z;Re++){const Pe=Re*_-L;Y[A]=Pe*S,Y[p]=de*x,Y[m]=F,c.push(Y.x,Y.y,Y.z),Y[A]=0,Y[p]=0,Y[m]=C>0?1:-1,d.push(Y.x,Y.y,Y.z),u.push(Re/y),u.push(1-J/R),G+=1}}for(let J=0;J<R;J++)for(let de=0;de<y;de++){const Re=f+de+z*J,Pe=f+de+z*(J+1),W=f+(de+1)+z*(J+1),$=f+(de+1)+z*J;l.push(Re,Pe,$),l.push(Pe,W,$),k+=6}a.addGroup(h,k,M),h+=k,f+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ds(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ut(r){const e={};for(let t=0;t<r.length;t++){const n=ds(r[t]);for(const i in n)e[i]=n[i]}return e}function Lh(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ud(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Bh={clone:ds,merge:Ut};var Uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $t extends Vr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uh,this.fragmentShader=Oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=Lh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class hd extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=Nn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new b,Ll=new xe,Bl=new xe;class Kt extends hd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(Es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z)}getViewSize(e,t){return this.getViewBounds(e,Ll,Bl),t.subVectors(Bl,Ll)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Es*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ki=-90,Vi=1;class Nh extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kt(ki,Vi,e,t);i.layers=this.layers,this.add(i);const s=new Kt(ki,Vi,e,t);s.layers=this.layers,this.add(s);const o=new Kt(ki,Vi,e,t);o.layers=this.layers,this.add(o);const a=new Kt(ki,Vi,e,t);a.layers=this.layers,this.add(a);const l=new Kt(ki,Vi,e,t);l.layers=this.layers,this.add(l);const c=new Kt(ki,Vi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(u,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class fd extends zt{constructor(e,t,n,i,s,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:os,super(e,t,n,i,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zh extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new fd(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ms(5,5,5),s=new $t({name:"CubemapFromEquirect",uniforms:ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Jn});s.uniforms.tEquirect.value=t;const o=new gt(i,s),a=t.minFilter;return t.minFilter===xi&&(t.minFilter=dn),new Nh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const _o=new b,Hh=new b,kh=new ke;class Fn{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=_o.subVectors(n,t).cross(Hh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(_o),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||kh.getNormalMatrix(e),i=this.coplanarPoint(_o).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new aa,dr=new b;class pd{constructor(e=new Fn,t=new Fn,n=new Fn,i=new Fn,s=new Fn,o=new Fn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],d=i[5],u=i[6],f=i[7],h=i[8],g=i[9],A=i[10],p=i[11],m=i[12],S=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,p-h,v-m).normalize(),n[1].setComponents(l+s,f+c,p+h,v+m).normalize(),n[2].setComponents(l+o,f+d,p+g,v+S).normalize(),n[3].setComponents(l-o,f-d,p-g,v-S).normalize(),n[4].setComponents(l-a,f-u,p-A,v-x).normalize(),t===Nn)n[5].setComponents(l+a,f+u,p+A,v+x).normalize();else if(t===Rr)n[5].setComponents(a,u,A,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(e){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(e.matrixWorld),this.intersectsSphere(di)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(dr.x=i.normal.x>0?e.max.x:e.min.x,dr.y=i.normal.y>0?e.max.y:e.min.y,dr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function md(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Vh(r){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,u=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,d),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const d=l.array,u=l._updateRange,f=l.updateRanges;if(r.bindBuffer(c,a),u.count===-1&&f.length===0&&r.bufferSubData(c,0,d),f.length!==0){for(let h=0,g=f.length;h<g;h++){const A=f[h];r.bufferSubData(c,A.start*d.BYTES_PER_ELEMENT,d,A.start,A.count)}l.clearUpdateRanges()}u.count!==-1&&(r.bufferSubData(c,u.offset*d.BYTES_PER_ELEMENT,d,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class us extends rn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,d=l+1,u=e/a,f=t/l,h=[],g=[],A=[],p=[];for(let m=0;m<d;m++){const S=m*f-o;for(let x=0;x<c;x++){const v=x*u-s;g.push(v,-S,0),A.push(0,0,1),p.push(x/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<a;S++){const x=S+c*m,v=S+c*(m+1),E=S+1+c*(m+1),C=S+1+c*m;h.push(x,v,C),h.push(v,E,C)}this.setIndex(h),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(A,3)),this.setAttribute("uv",new Zt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$h=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Af=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_f="gl_FragColor = linearToOutputTexel( gl_FragColor );",vf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,yf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,If=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ff=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Uf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$f=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,np=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ip=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ap=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_p=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ep=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Rp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ip=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Up=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Op=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Np=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Zp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$p=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,im=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,um=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Am=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:Gh,alphahash_pars_fragment:Wh,alphamap_fragment:Xh,alphamap_pars_fragment:qh,alphatest_fragment:Qh,alphatest_pars_fragment:Yh,aomap_fragment:Kh,aomap_pars_fragment:jh,batching_pars_vertex:Zh,batching_vertex:$h,begin_vertex:Jh,beginnormal_vertex:ef,bsdfs:tf,iridescence_fragment:nf,bumpmap_pars_fragment:sf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:of,clipping_planes_pars_vertex:af,clipping_planes_vertex:lf,color_fragment:cf,color_pars_fragment:df,color_pars_vertex:uf,color_vertex:hf,common:ff,cube_uv_reflection_fragment:pf,defaultnormal_vertex:mf,displacementmap_pars_vertex:gf,displacementmap_vertex:Af,emissivemap_fragment:Sf,emissivemap_pars_fragment:xf,colorspace_fragment:_f,colorspace_pars_fragment:vf,envmap_fragment:yf,envmap_common_pars_fragment:Mf,envmap_pars_fragment:Cf,envmap_pars_vertex:Ef,envmap_physical_pars_fragment:Uf,envmap_vertex:Tf,fog_vertex:wf,fog_pars_vertex:bf,fog_fragment:Rf,fog_pars_fragment:If,gradientmap_pars_fragment:Pf,lightmap_pars_fragment:Df,lights_lambert_fragment:Ff,lights_lambert_pars_fragment:Lf,lights_pars_begin:Bf,lights_toon_fragment:Of,lights_toon_pars_fragment:Nf,lights_phong_fragment:zf,lights_phong_pars_fragment:Hf,lights_physical_fragment:kf,lights_physical_pars_fragment:Vf,lights_fragment_begin:Gf,lights_fragment_maps:Wf,lights_fragment_end:Xf,logdepthbuf_fragment:qf,logdepthbuf_pars_fragment:Qf,logdepthbuf_pars_vertex:Yf,logdepthbuf_vertex:Kf,map_fragment:jf,map_pars_fragment:Zf,map_particle_fragment:$f,map_particle_pars_fragment:Jf,metalnessmap_fragment:ep,metalnessmap_pars_fragment:tp,morphinstance_vertex:np,morphcolor_vertex:ip,morphnormal_vertex:sp,morphtarget_pars_vertex:rp,morphtarget_vertex:op,normal_fragment_begin:ap,normal_fragment_maps:lp,normal_pars_fragment:cp,normal_pars_vertex:dp,normal_vertex:up,normalmap_pars_fragment:hp,clearcoat_normal_fragment_begin:fp,clearcoat_normal_fragment_maps:pp,clearcoat_pars_fragment:mp,iridescence_pars_fragment:gp,opaque_fragment:Ap,packing:Sp,premultiplied_alpha_fragment:xp,project_vertex:_p,dithering_fragment:vp,dithering_pars_fragment:yp,roughnessmap_fragment:Mp,roughnessmap_pars_fragment:Cp,shadowmap_pars_fragment:Ep,shadowmap_pars_vertex:Tp,shadowmap_vertex:wp,shadowmask_pars_fragment:bp,skinbase_vertex:Rp,skinning_pars_vertex:Ip,skinning_vertex:Pp,skinnormal_vertex:Dp,specularmap_fragment:Fp,specularmap_pars_fragment:Lp,tonemapping_fragment:Bp,tonemapping_pars_fragment:Up,transmission_fragment:Op,transmission_pars_fragment:Np,uv_pars_fragment:zp,uv_pars_vertex:Hp,uv_vertex:kp,worldpos_vertex:Vp,background_vert:Gp,background_frag:Wp,backgroundCube_vert:Xp,backgroundCube_frag:qp,cube_vert:Qp,cube_frag:Yp,depth_vert:Kp,depth_frag:jp,distanceRGBA_vert:Zp,distanceRGBA_frag:$p,equirect_vert:Jp,equirect_frag:em,linedashed_vert:tm,linedashed_frag:nm,meshbasic_vert:im,meshbasic_frag:sm,meshlambert_vert:rm,meshlambert_frag:om,meshmatcap_vert:am,meshmatcap_frag:lm,meshnormal_vert:cm,meshnormal_frag:dm,meshphong_vert:um,meshphong_frag:hm,meshphysical_vert:fm,meshphysical_frag:pm,meshtoon_vert:mm,meshtoon_frag:gm,points_vert:Am,points_frag:Sm,shadow_vert:xm,shadow_frag:_m,sprite_vert:vm,sprite_frag:ym},me={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},An={basic:{uniforms:Ut([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Ut([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Ut([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Ut([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Ut([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Ut([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Ut([me.points,me.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Ut([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Ut([me.common,me.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Ut([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Ut([me.sprite,me.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Ut([me.common,me.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Ut([me.lights,me.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};An.physical={uniforms:Ut([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const ur={r:0,b:0,g:0},ui=new fn,Mm=new ze;function Cm(r,e,t,n,i,s,o){const a=new je(0);let l=s===!0?0:1,c,d,u=null,f=0,h=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?t:e).get(x)),x}function A(S){let x=!1;const v=g(S);v===null?m(a,l):v&&v.isColor&&(m(v,1),x=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(S,x){const v=g(x);v&&(v.isCubeTexture||v.mapping===Hr)?(d===void 0&&(d=new gt(new ms(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:ds(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(E,C,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),ui.copy(x.backgroundRotation),ui.x*=-1,ui.y*=-1,ui.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),d.material.uniforms.envMap.value=v,d.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Mm.makeRotationFromEuler(ui)),d.material.toneMapped=tt.getTransfer(v.colorSpace)!==lt,(u!==v||f!==v.version||h!==r.toneMapping)&&(d.material.needsUpdate=!0,u=v,f=v.version,h=r.toneMapping),d.layers.enableAll(),S.unshift(d,d.geometry,d.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new gt(new us(2,2),new $t({name:"BackgroundMaterial",uniforms:ds(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=tt.getTransfer(v.colorSpace)!==lt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,h=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,x){S.getRGB(ur,ud(r)),n.buffers.color.setClear(ur.r,ur.g,ur.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(a,l)},render:A,addToRenderList:p}}function Em(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(_,I,L,D,F){let z=!1;const N=u(D,L,I);s!==N&&(s=N,c(s.object)),z=h(_,D,L,F),z&&g(_,D,L,F),F!==null&&e.update(F,r.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,v(_,I,L,D),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return r.createVertexArray()}function c(_){return r.bindVertexArray(_)}function d(_){return r.deleteVertexArray(_)}function u(_,I,L){const D=L.wireframe===!0;let F=n[_.id];F===void 0&&(F={},n[_.id]=F);let z=F[I.id];z===void 0&&(z={},F[I.id]=z);let N=z[D];return N===void 0&&(N=f(l()),z[D]=N),N}function f(_){const I=[],L=[],D=[];for(let F=0;F<t;F++)I[F]=0,L[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:D,object:_,attributes:{},index:null}}function h(_,I,L,D){const F=s.attributes,z=I.attributes;let N=0;const G=L.getAttributes();for(const k in G)if(G[k].location>=0){const J=F[k];let de=z[k];if(de===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(de=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(de=_.instanceColor)),J===void 0||J.attribute!==de||de&&J.data!==de.data)return!0;N++}return s.attributesNum!==N||s.index!==D}function g(_,I,L,D){const F={},z=I.attributes;let N=0;const G=L.getAttributes();for(const k in G)if(G[k].location>=0){let J=z[k];J===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(J=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(J=_.instanceColor));const de={};de.attribute=J,J&&J.data&&(de.data=J.data),F[k]=de,N++}s.attributes=F,s.attributesNum=N,s.index=D}function A(){const _=s.newAttributes;for(let I=0,L=_.length;I<L;I++)_[I]=0}function p(_){m(_,0)}function m(_,I){const L=s.newAttributes,D=s.enabledAttributes,F=s.attributeDivisors;L[_]=1,D[_]===0&&(r.enableVertexAttribArray(_),D[_]=1),F[_]!==I&&(r.vertexAttribDivisor(_,I),F[_]=I)}function S(){const _=s.newAttributes,I=s.enabledAttributes;for(let L=0,D=I.length;L<D;L++)I[L]!==_[L]&&(r.disableVertexAttribArray(L),I[L]=0)}function x(_,I,L,D,F,z,N){N===!0?r.vertexAttribIPointer(_,I,L,F,z):r.vertexAttribPointer(_,I,L,D,F,z)}function v(_,I,L,D){A();const F=D.attributes,z=L.getAttributes(),N=I.defaultAttributeValues;for(const G in z){const k=z[G];if(k.location>=0){let Y=F[G];if(Y===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(Y=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(Y=_.instanceColor)),Y!==void 0){const J=Y.normalized,de=Y.itemSize,Re=e.get(Y);if(Re===void 0)continue;const Pe=Re.buffer,W=Re.type,$=Re.bytesPerElement,se=W===r.INT||W===r.UNSIGNED_INT||Y.gpuType===Jc;if(Y.isInterleavedBufferAttribute){const ne=Y.data,Ee=ne.stride,ye=Y.offset;if(ne.isInstancedInterleavedBuffer){for(let Ie=0;Ie<k.locationSize;Ie++)m(k.location+Ie,ne.meshPerAttribute);_.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ie=0;Ie<k.locationSize;Ie++)p(k.location+Ie);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let Ie=0;Ie<k.locationSize;Ie++)x(k.location+Ie,de/k.locationSize,W,J,Ee*$,(ye+de/k.locationSize*Ie)*$,se)}else{if(Y.isInstancedBufferAttribute){for(let ne=0;ne<k.locationSize;ne++)m(k.location+ne,Y.meshPerAttribute);_.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ne=0;ne<k.locationSize;ne++)p(k.location+ne);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let ne=0;ne<k.locationSize;ne++)x(k.location+ne,de/k.locationSize,W,J,de*$,de/k.locationSize*ne*$,se)}}else if(N!==void 0){const J=N[G];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(k.location,J);break;case 3:r.vertexAttrib3fv(k.location,J);break;case 4:r.vertexAttrib4fv(k.location,J);break;default:r.vertexAttrib1fv(k.location,J)}}}}S()}function E(){R();for(const _ in n){const I=n[_];for(const L in I){const D=I[L];for(const F in D)d(D[F].object),delete D[F];delete I[L]}delete n[_]}}function C(_){if(n[_.id]===void 0)return;const I=n[_.id];for(const L in I){const D=I[L];for(const F in D)d(D[F].object),delete D[F];delete I[L]}delete n[_.id]}function y(_){for(const I in n){const L=n[I];if(L[_.id]===void 0)continue;const D=L[_.id];for(const F in D)d(D[F].object),delete D[F];delete L[_.id]}}function R(){M(),o=!0,s!==i&&(s=i,c(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:C,releaseStatesOfProgram:y,initAttributes:A,enableAttribute:p,disableUnusedAttributes:S}}function Tm(r,e,t){let n;function i(c){n=c}function s(c,d){r.drawArrays(n,c,d),t.update(d,n,1)}function o(c,d,u){u!==0&&(r.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function a(c,d,u){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let h=0;h<u;h++)this.render(c[h],d[h]);else{f.multiDrawArraysWEBGL(n,c,0,d,0,u);let h=0;for(let g=0;g<u;g++)h+=d[g];t.update(h,n,1)}}function l(c,d,u,f){if(u===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)o(c[g],d[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,d,0,f,0,u);let g=0;for(let A=0;A<u;A++)g+=d[A];for(let A=0;A<f.length;A++)t.update(g,n,f[A])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function wm(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==Gt&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const y=C===zs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Hn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==xn&&!y)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),h=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),A=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:A,maxAttributes:p,maxVertexUniforms:m,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:v,maxSamples:E}}function bm(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Fn,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||n!==0||i;return i=f,n=u.length,h},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,h){const g=u.clippingPlanes,A=u.clipIntersection,p=u.clipShadows,m=r.get(u);if(!i||g===null||g.length===0||s&&!p)s?d(null):c();else{const S=s?0:n,x=S*4;let v=m.clippingState||null;l.value=v,v=d(g,f,x,h);for(let E=0;E!==x;++E)v[E]=t[E];m.clippingState=v,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,h,g){const A=u!==null?u.length:0;let p=null;if(A!==0){if(p=l.value,g!==!0||p===null){const m=h+A*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,v=h;x!==A;++x,v+=4)o.copy(u[x]).applyMatrix4(S,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,p}}function Rm(r){let e=new WeakMap;function t(o,a){return a===Wo?o.mapping=os:a===Xo&&(o.mapping=as),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wo||a===Xo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zh(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class da extends hd{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ki=4,Ul=[.125,.215,.35,.446,.526,.582],mi=20,vo=new da,Ol=new je;let yo=null,Mo=0,Co=0,Eo=!1;const fi=(1+Math.sqrt(5))/2,Gi=1/fi,Nl=[new b(-fi,Gi,0),new b(fi,Gi,0),new b(-Gi,0,fi),new b(Gi,0,fi),new b(0,fi,-Gi),new b(0,fi,Gi),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class zl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){yo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(yo,Mo,Co),this._renderer.xr.enabled=Eo,e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===os||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:zs,format:Gt,colorSpace:si,depthBuffer:!1},i=Hl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Im(s)),this._blurMaterial=Pm(s,e,t)}return i}_compileMaterial(e){const t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,vo)}_sceneToCubeUV(e,t,n,i){const a=new Kt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ol),d.toneMapping=ti,d.autoClear=!1;const h=new Mi({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),g=new gt(new ms,h);let A=!1;const p=e.background;p?p.isColor&&(h.color.copy(p),e.background=null,A=!0):(h.color.copy(Ol),A=!0);for(let m=0;m<6;m++){const S=m%3;S===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):S===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;hr(i,S*x,m>2?x:0,x,x),d.setRenderTarget(i),A&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===os||e.mapping===as;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new gt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;hr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,vo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Nl[(i-s-1)%Nl.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new gt(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*mi-1),A=s/g,p=isFinite(s)?1+Math.floor(d*A):mi;p>mi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);const m=[];let S=0;for(let y=0;y<mi;++y){const R=y/A,M=Math.exp(-R*R/2);m.push(M),y===0?S+=M:y<p&&(S+=2*M)}for(let y=0;y<m.length;y++)m[y]=m[y]/S;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const v=this._sizeLods[i],E=3*v*(i>x-Ki?i-x+Ki:0),C=4*(this._cubeSize-v);hr(t,E,C,3*v,2*v),l.setRenderTarget(t),l.render(u,vo)}}function Im(r){const e=[],t=[],n=[];let i=r;const s=r-Ki+1+Ul.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Ki?l=Ul[o-r+Ki-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],h=6,g=6,A=3,p=2,m=1,S=new Float32Array(A*g*h),x=new Float32Array(p*g*h),v=new Float32Array(m*g*h);for(let C=0;C<h;C++){const y=C%3*2/3-1,R=C>2?0:-1,M=[y,R,0,y+2/3,R,0,y+2/3,R+1,0,y,R,0,y+2/3,R+1,0,y,R+1,0];S.set(M,A*g*C),x.set(f,p*g*C);const _=[C,C,C,C,C,C];v.set(_,m*g*C)}const E=new rn;E.setAttribute("position",new sn(S,A)),E.setAttribute("uv",new sn(x,p)),E.setAttribute("faceIndex",new sn(v,m)),e.push(E),i>Ki&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hl(r,e,t){const n=new ii(r,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Pm(r,e,t){const n=new Float32Array(mi),i=new b(0,1,0);return new $t({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function kl(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Vl(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function ua(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dm(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Wo||l===Xo,d=l===os||l===as;if(c||d){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new zl(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const h=a.image;return c&&h&&h.height>0||d&&h&&i(h)?(t===null&&(t=new zl(r)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Fm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&rd("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Lm(r,e,t,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const A=f.morphAttributes[g];for(let p=0,m=A.length;p<m;p++)e.remove(A[p])}f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],r.ARRAY_BUFFER);const h=u.morphAttributes;for(const g in h){const A=h[g];for(let p=0,m=A.length;p<m;p++)e.update(A[p],r.ARRAY_BUFFER)}}function c(u){const f=[],h=u.index,g=u.attributes.position;let A=0;if(h!==null){const S=h.array;A=h.version;for(let x=0,v=S.length;x<v;x+=3){const E=S[x+0],C=S[x+1],y=S[x+2];f.push(E,C,C,y,y,E)}}else if(g!==void 0){const S=g.array;A=g.version;for(let x=0,v=S.length/3-1;x<v;x+=3){const E=x+0,C=x+1,y=x+2;f.push(E,C,C,y,y,E)}}else return;const p=new(sd(f)?dd:cd)(f,1);p.version=A;const m=s.get(u);m&&e.remove(m),s.set(u,p)}function d(u){const f=s.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:d}}function Bm(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,g){g!==0&&(r.drawElementsInstanced(n,h,s,f*o,g),t.update(h,n,g))}function d(f,h,g){if(g===0)return;const A=e.get("WEBGL_multi_draw");if(A===null)for(let p=0;p<g;p++)this.render(f[p]/o,h[p]);else{A.multiDrawElementsWEBGL(n,h,0,s,f,0,g);let p=0;for(let m=0;m<g;m++)p+=h[m];t.update(p,n,1)}}function u(f,h,g,A){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)c(f[m]/o,h[m],A[m]);else{p.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,A,0,g);let m=0;for(let S=0;S<g;S++)m+=h[S];for(let S=0;S<A.length;S++)t.update(m,n,A[S])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Um(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Om(r,e,t){const n=new WeakMap,i=new _t;function s(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let _=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",_)};var h=_;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,A=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),A===!0&&(v=2),p===!0&&(v=3);let E=a.attributes.position.count*v,C=1;E>e.maxTextureSize&&(C=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const y=new Float32Array(E*C*4*u),R=new ad(y,E,C,u);R.type=xn,R.needsUpdate=!0;const M=v*4;for(let I=0;I<u;I++){const L=m[I],D=S[I],F=x[I],z=E*C*4*I;for(let N=0;N<L.count;N++){const G=N*M;g===!0&&(i.fromBufferAttribute(L,N),y[z+G+0]=i.x,y[z+G+1]=i.y,y[z+G+2]=i.z,y[z+G+3]=0),A===!0&&(i.fromBufferAttribute(D,N),y[z+G+4]=i.x,y[z+G+5]=i.y,y[z+G+6]=i.z,y[z+G+7]=0),p===!0&&(i.fromBufferAttribute(F,N),y[z+G+8]=i.x,y[z+G+9]=i.y,y[z+G+10]=i.z,y[z+G+11]=F.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new xe(E,C)},n.set(a,f),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const A=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",A),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Nm(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class ha extends zt{constructor(e,t,n,i,s,o,a,l,c,d=vi){if(d!==vi&&d!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===vi&&(n=un),n===void 0&&d===cs&&(n=ls),super(null,i,s,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Vt,this.minFilter=l!==void 0?l:Vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const gd=new zt,Ad=new ha(1,1);Ad.compareFunction=id;const Sd=new ad,xd=new _h,_d=new fd,Gl=[],Wl=[],Xl=new Float32Array(16),ql=new Float32Array(9),Ql=new Float32Array(4);function gs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Gl[i];if(s===void 0&&(s=new Float32Array(i),Gl[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Ct(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Et(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Gr(r,e){let t=Wl[e];t===void 0&&(t=new Int32Array(e),Wl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function zm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Hm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2fv(this.addr,e),Et(t,e)}}function km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;r.uniform3fv(this.addr,e),Et(t,e)}}function Vm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4fv(this.addr,e),Et(t,e)}}function Gm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(Ct(t,n))return;Ql.set(n),r.uniformMatrix2fv(this.addr,!1,Ql),Et(t,n)}}function Wm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(Ct(t,n))return;ql.set(n),r.uniformMatrix3fv(this.addr,!1,ql),Et(t,n)}}function Xm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(Ct(t,n))return;Xl.set(n),r.uniformMatrix4fv(this.addr,!1,Xl),Et(t,n)}}function qm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Qm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2iv(this.addr,e),Et(t,e)}}function Ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3iv(this.addr,e),Et(t,e)}}function Km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4iv(this.addr,e),Et(t,e)}}function jm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Zm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2uiv(this.addr,e),Et(t,e)}}function $m(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3uiv(this.addr,e),Et(t,e)}}function Jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4uiv(this.addr,e),Et(t,e)}}function eg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?Ad:gd;t.setTexture2D(e||s,i)}function tg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||xd,i)}function ng(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_d,i)}function ig(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Sd,i)}function sg(r){switch(r){case 5126:return zm;case 35664:return Hm;case 35665:return km;case 35666:return Vm;case 35674:return Gm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return qm;case 35667:case 35671:return Qm;case 35668:case 35672:return Ym;case 35669:case 35673:return Km;case 5125:return jm;case 36294:return Zm;case 36295:return $m;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}function rg(r,e){r.uniform1fv(this.addr,e)}function og(r,e){const t=gs(e,this.size,2);r.uniform2fv(this.addr,t)}function ag(r,e){const t=gs(e,this.size,3);r.uniform3fv(this.addr,t)}function lg(r,e){const t=gs(e,this.size,4);r.uniform4fv(this.addr,t)}function cg(r,e){const t=gs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function dg(r,e){const t=gs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ug(r,e){const t=gs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function hg(r,e){r.uniform1iv(this.addr,e)}function fg(r,e){r.uniform2iv(this.addr,e)}function pg(r,e){r.uniform3iv(this.addr,e)}function mg(r,e){r.uniform4iv(this.addr,e)}function gg(r,e){r.uniform1uiv(this.addr,e)}function Ag(r,e){r.uniform2uiv(this.addr,e)}function Sg(r,e){r.uniform3uiv(this.addr,e)}function xg(r,e){r.uniform4uiv(this.addr,e)}function _g(r,e,t){const n=this.cache,i=e.length,s=Gr(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||gd,s[o])}function vg(r,e,t){const n=this.cache,i=e.length,s=Gr(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||xd,s[o])}function yg(r,e,t){const n=this.cache,i=e.length,s=Gr(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||_d,s[o])}function Mg(r,e,t){const n=this.cache,i=e.length,s=Gr(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Sd,s[o])}function Cg(r){switch(r){case 5126:return rg;case 35664:return og;case 35665:return ag;case 35666:return lg;case 35674:return cg;case 35675:return dg;case 35676:return ug;case 5124:case 35670:return hg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return Ag;case 36295:return Sg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return vg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Mg}}class Eg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=sg(t.type)}}class Tg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cg(t.type)}}class wg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const To=/(\w+)(\])?(\[|\.)?/g;function Yl(r,e){r.seq.push(e),r.map[e.id]=e}function bg(r,e,t){const n=r.name,i=n.length;for(To.lastIndex=0;;){const s=To.exec(n),o=To.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Yl(t,c===void 0?new Eg(a,r,e):new Tg(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new wg(a),Yl(t,u)),t=u}}}class Mr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);bg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Kl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Rg=37297;let Ig=0;function Pg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Dg(r){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(r);let n;switch(e===t?n="":e===br&&t===wr?n="LinearDisplayP3ToLinearSRGB":e===wr&&t===br&&(n="LinearSRGBToLinearDisplayP3"),r){case si:case kr:return[n,"LinearTransferOETF"];case cn:case ra:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function jl(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Pg(r.getShaderSource(e),o)}else return i}function Fg(r,e){const t=Dg(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Lg(r,e){let t;switch(e){case yu:t="Linear";break;case Mu:t="Reinhard";break;case Cu:t="OptimizedCineon";break;case Zc:t="ACESFilmic";break;case Tu:t="AgX";break;case wu:t="Neutral";break;case Eu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Bg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function Ug(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Og(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ms(r){return r!==""}function Zl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $l(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ng=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yo(r){return r.replace(Ng,Hg)}const zg=new Map;function Hg(r,e){let t=qe[e];if(t===void 0){const n=zg.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Yo(t)}const kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jl(r){return r.replace(kg,Vg)}function Vg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ec(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Gg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Yc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Kd?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===In&&(e="SHADOWMAP_TYPE_VSM"),e}function Wg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case os:case as:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case as:e="ENVMAP_MODE_REFRACTION";break}return e}function qg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case jc:e="ENVMAP_BLENDING_MULTIPLY";break;case _u:e="ENVMAP_BLENDING_MIX";break;case vu:e="ENVMAP_BLENDING_ADD";break}return e}function Qg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Yg(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Gg(t),c=Wg(t),d=Xg(t),u=qg(t),f=Qg(t),h=Bg(t),g=Ug(s),A=i.createProgram();let p,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ms).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ms).join(`
`),m.length>0&&(m+=`
`)):(p=[ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),m=[ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?qe.tonemapping_pars_fragment:"",t.toneMapping!==ti?Lg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,Fg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ms).join(`
`)),o=Yo(o),o=Zl(o,t),o=$l(o,t),a=Yo(a),a=Zl(a,t),a=$l(a,t),o=Jl(o),a=Jl(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=S+p+o,v=S+m+a,E=Kl(i,i.VERTEX_SHADER,x),C=Kl(i,i.FRAGMENT_SHADER,v);i.attachShader(A,E),i.attachShader(A,C),t.index0AttributeName!==void 0?i.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(A,0,"position"),i.linkProgram(A);function y(I){if(r.debug.checkShaderErrors){const L=i.getProgramInfoLog(A).trim(),D=i.getShaderInfoLog(E).trim(),F=i.getShaderInfoLog(C).trim();let z=!0,N=!0;if(i.getProgramParameter(A,i.LINK_STATUS)===!1)if(z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,A,E,C);else{const G=jl(i,E,"vertex"),k=jl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(A,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+L+`
`+G+`
`+k)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(D===""||F==="")&&(N=!1);N&&(I.diagnostics={runnable:z,programLog:L,vertexShader:{log:D,prefix:p},fragmentShader:{log:F,prefix:m}})}i.deleteShader(E),i.deleteShader(C),R=new Mr(i,A),M=Og(i,A)}let R;this.getUniforms=function(){return R===void 0&&y(this),R};let M;this.getAttributes=function(){return M===void 0&&y(this),M};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(A,Rg)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ig++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=E,this.fragmentShader=C,this}let Kg=0;class jg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Zg(e),t.set(e,n)),n}}class Zg{constructor(e){this.id=Kg++,this.code=e,this.usedTimes=0}}function $g(r,e,t,n,i,s,o){const a=new ca,l=new jg,c=new Set,d=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,_,I,L,D){const F=L.fog,z=D.geometry,N=M.isMeshStandardMaterial?L.environment:null,G=(M.isMeshStandardMaterial?t:e).get(M.envMap||N),k=G&&G.mapping===Hr?G.image.height:null,Y=g[M.type];M.precision!==null&&(h=i.getMaxPrecision(M.precision),h!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const J=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,de=J!==void 0?J.length:0;let Re=0;z.morphAttributes.position!==void 0&&(Re=1),z.morphAttributes.normal!==void 0&&(Re=2),z.morphAttributes.color!==void 0&&(Re=3);let Pe,W,$,se;if(Y){const st=An[Y];Pe=st.vertexShader,W=st.fragmentShader}else Pe=M.vertexShader,W=M.fragmentShader,l.update(M),$=l.getVertexShaderID(M),se=l.getFragmentShaderID(M);const ne=r.getRenderTarget(),Ee=D.isInstancedMesh===!0,ye=D.isBatchedMesh===!0,Ie=!!M.map,B=!!M.matcap,De=!!G,Me=!!M.aoMap,We=!!M.lightMap,fe=!!M.bumpMap,Ge=!!M.normalMap,Ne=!!M.displacementMap,Te=!!M.emissiveMap,Ke=!!M.metalnessMap,P=!!M.roughnessMap,T=M.anisotropy>0,Q=M.clearcoat>0,ee=M.dispersion>0,ie=M.iridescence>0,re=M.sheen>0,Fe=M.transmission>0,pe=T&&!!M.anisotropyMap,ge=Q&&!!M.clearcoatMap,Xe=Q&&!!M.clearcoatNormalMap,le=Q&&!!M.clearcoatRoughnessMap,Ce=ie&&!!M.iridescenceMap,O=ie&&!!M.iridescenceThicknessMap,te=re&&!!M.sheenColorMap,oe=re&&!!M.sheenRoughnessMap,we=!!M.specularMap,Oe=!!M.specularColorMap,it=!!M.specularIntensityMap,U=Fe&&!!M.transmissionMap,Ae=Fe&&!!M.thicknessMap,j=!!M.gradientMap,Z=!!M.alphaMap,ae=M.alphaTest>0,Be=!!M.alphaHash,Qe=!!M.extensions;let at=ti;M.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(at=r.toneMapping);const ht={shaderID:Y,shaderType:M.type,shaderName:M.name,vertexShader:Pe,fragmentShader:W,defines:M.defines,customVertexShaderID:$,customFragmentShaderID:se,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:ye,batchingColor:ye&&D._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&D.instanceColor!==null,instancingMorph:Ee&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?r.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:si,alphaToCoverage:!!M.alphaToCoverage,map:Ie,matcap:B,envMap:De,envMapMode:De&&G.mapping,envMapCubeUVHeight:k,aoMap:Me,lightMap:We,bumpMap:fe,normalMap:Ge,displacementMap:f&&Ne,emissiveMap:Te,normalMapObjectSpace:Ge&&M.normalMapType===Vu,normalMapTangentSpace:Ge&&M.normalMapType===ku,metalnessMap:Ke,roughnessMap:P,anisotropy:T,anisotropyMap:pe,clearcoat:Q,clearcoatMap:ge,clearcoatNormalMap:Xe,clearcoatRoughnessMap:le,dispersion:ee,iridescence:ie,iridescenceMap:Ce,iridescenceThicknessMap:O,sheen:re,sheenColorMap:te,sheenRoughnessMap:oe,specularMap:we,specularColorMap:Oe,specularIntensityMap:it,transmission:Fe,transmissionMap:U,thicknessMap:Ae,gradientMap:j,opaque:M.transparent===!1&&M.blending===ei&&M.alphaToCoverage===!1,alphaMap:Z,alphaTest:ae,alphaHash:Be,combine:M.combine,mapUv:Ie&&A(M.map.channel),aoMapUv:Me&&A(M.aoMap.channel),lightMapUv:We&&A(M.lightMap.channel),bumpMapUv:fe&&A(M.bumpMap.channel),normalMapUv:Ge&&A(M.normalMap.channel),displacementMapUv:Ne&&A(M.displacementMap.channel),emissiveMapUv:Te&&A(M.emissiveMap.channel),metalnessMapUv:Ke&&A(M.metalnessMap.channel),roughnessMapUv:P&&A(M.roughnessMap.channel),anisotropyMapUv:pe&&A(M.anisotropyMap.channel),clearcoatMapUv:ge&&A(M.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&A(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&A(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&A(M.iridescenceMap.channel),iridescenceThicknessMapUv:O&&A(M.iridescenceThicknessMap.channel),sheenColorMapUv:te&&A(M.sheenColorMap.channel),sheenRoughnessMapUv:oe&&A(M.sheenRoughnessMap.channel),specularMapUv:we&&A(M.specularMap.channel),specularColorMapUv:Oe&&A(M.specularColorMap.channel),specularIntensityMapUv:it&&A(M.specularIntensityMap.channel),transmissionMapUv:U&&A(M.transmissionMap.channel),thicknessMapUv:Ae&&A(M.thicknessMap.channel),alphaMapUv:Z&&A(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ge||T),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!z.attributes.uv&&(Ie||Z),fog:!!F,useFog:M.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:D.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Re,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:at,decodeVideoTexture:Ie&&M.map.isVideoTexture===!0&&tt.getTransfer(M.map.colorSpace)===lt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===nn,flipSided:M.side===Wt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Qe&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Qe&&M.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ht.vertexUv1s=c.has(1),ht.vertexUv2s=c.has(2),ht.vertexUv3s=c.has(3),c.clear(),ht}function m(M){const _=[];if(M.shaderID?_.push(M.shaderID):(_.push(M.customVertexShaderID),_.push(M.customFragmentShaderID)),M.defines!==void 0)for(const I in M.defines)_.push(I),_.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(S(_,M),x(_,M),_.push(r.outputColorSpace)),_.push(M.customProgramCacheKey),_.join()}function S(M,_){M.push(_.precision),M.push(_.outputColorSpace),M.push(_.envMapMode),M.push(_.envMapCubeUVHeight),M.push(_.mapUv),M.push(_.alphaMapUv),M.push(_.lightMapUv),M.push(_.aoMapUv),M.push(_.bumpMapUv),M.push(_.normalMapUv),M.push(_.displacementMapUv),M.push(_.emissiveMapUv),M.push(_.metalnessMapUv),M.push(_.roughnessMapUv),M.push(_.anisotropyMapUv),M.push(_.clearcoatMapUv),M.push(_.clearcoatNormalMapUv),M.push(_.clearcoatRoughnessMapUv),M.push(_.iridescenceMapUv),M.push(_.iridescenceThicknessMapUv),M.push(_.sheenColorMapUv),M.push(_.sheenRoughnessMapUv),M.push(_.specularMapUv),M.push(_.specularColorMapUv),M.push(_.specularIntensityMapUv),M.push(_.transmissionMapUv),M.push(_.thicknessMapUv),M.push(_.combine),M.push(_.fogExp2),M.push(_.sizeAttenuation),M.push(_.morphTargetsCount),M.push(_.morphAttributeCount),M.push(_.numDirLights),M.push(_.numPointLights),M.push(_.numSpotLights),M.push(_.numSpotLightMaps),M.push(_.numHemiLights),M.push(_.numRectAreaLights),M.push(_.numDirLightShadows),M.push(_.numPointLightShadows),M.push(_.numSpotLightShadows),M.push(_.numSpotLightShadowsWithMaps),M.push(_.numLightProbes),M.push(_.shadowMapType),M.push(_.toneMapping),M.push(_.numClippingPlanes),M.push(_.numClipIntersection),M.push(_.depthPacking)}function x(M,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.skinning&&a.enable(4),_.morphTargets&&a.enable(5),_.morphNormals&&a.enable(6),_.morphColors&&a.enable(7),_.premultipliedAlpha&&a.enable(8),_.shadowMapEnabled&&a.enable(9),_.doubleSided&&a.enable(10),_.flipSided&&a.enable(11),_.useDepthPacking&&a.enable(12),_.dithering&&a.enable(13),_.transmission&&a.enable(14),_.sheen&&a.enable(15),_.opaque&&a.enable(16),_.pointsUvs&&a.enable(17),_.decodeVideoTexture&&a.enable(18),_.alphaToCoverage&&a.enable(19),M.push(a.mask)}function v(M){const _=g[M.type];let I;if(_){const L=An[_];I=Bh.clone(L.uniforms)}else I=M.uniforms;return I}function E(M,_){let I;for(let L=0,D=d.length;L<D;L++){const F=d[L];if(F.cacheKey===_){I=F,++I.usedTimes;break}}return I===void 0&&(I=new Yg(r,_,M,s),d.push(I)),I}function C(M){if(--M.usedTimes===0){const _=d.indexOf(M);d[_]=d[d.length-1],d.pop(),M.destroy()}}function y(M){l.remove(M)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:E,releaseProgram:C,releaseShaderCache:y,programs:d,dispose:R}}function Jg(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function e0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function tc(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function nc(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,f,h,g,A,p){let m=r[e];return m===void 0?(m={id:u.id,object:u,geometry:f,material:h,groupOrder:g,renderOrder:u.renderOrder,z:A,group:p},r[e]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=h,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=A,m.group=p),e++,m}function a(u,f,h,g,A,p){const m=o(u,f,h,g,A,p);h.transmission>0?n.push(m):h.transparent===!0?i.push(m):t.push(m)}function l(u,f,h,g,A,p){const m=o(u,f,h,g,A,p);h.transmission>0?n.unshift(m):h.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,f){t.length>1&&t.sort(u||e0),n.length>1&&n.sort(f||tc),i.length>1&&i.sort(f||tc)}function d(){for(let u=e,f=r.length;u<f;u++){const h=r[u];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:d,sort:c}}function t0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new nc,r.set(n,[o])):i>=s.length?(o=new nc,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function n0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new je};break;case"SpotLight":t={position:new b,direction:new b,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new b,halfWidth:new b,halfHeight:new b};break}return r[e.id]=t,t}}}function i0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let s0=0;function r0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function o0(r){const e=new n0,t=i0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const i=new b,s=new ze,o=new ze;function a(c){let d=0,u=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let h=0,g=0,A=0,p=0,m=0,S=0,x=0,v=0,E=0,C=0,y=0;c.sort(r0);for(let M=0,_=c.length;M<_;M++){const I=c[M],L=I.color,D=I.intensity,F=I.distance,z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=L.r*D,u+=L.g*D,f+=L.b*D;else if(I.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(I.sh.coefficients[N],D);y++}else if(I.isDirectionalLight){const N=e.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const G=I.shadow,k=t.get(I);k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,n.directionalShadow[h]=k,n.directionalShadowMap[h]=z,n.directionalShadowMatrix[h]=I.shadow.matrix,S++}n.directional[h]=N,h++}else if(I.isSpotLight){const N=e.get(I);N.position.setFromMatrixPosition(I.matrixWorld),N.color.copy(L).multiplyScalar(D),N.distance=F,N.coneCos=Math.cos(I.angle),N.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),N.decay=I.decay,n.spot[A]=N;const G=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,G.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[A]=G.matrix,I.castShadow){const k=t.get(I);k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,n.spotShadow[A]=k,n.spotShadowMap[A]=z,v++}A++}else if(I.isRectAreaLight){const N=e.get(I);N.color.copy(L).multiplyScalar(D),N.halfWidth.set(I.width*.5,0,0),N.halfHeight.set(0,I.height*.5,0),n.rectArea[p]=N,p++}else if(I.isPointLight){const N=e.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),N.distance=I.distance,N.decay=I.decay,I.castShadow){const G=I.shadow,k=t.get(I);k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,k.shadowCameraNear=G.camera.near,k.shadowCameraFar=G.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=z,n.pointShadowMatrix[g]=I.shadow.matrix,x++}n.point[g]=N,g++}else if(I.isHemisphereLight){const N=e.get(I);N.skyColor.copy(I.color).multiplyScalar(D),N.groundColor.copy(I.groundColor).multiplyScalar(D),n.hemi[m]=N,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==h||R.pointLength!==g||R.spotLength!==A||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==S||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==E||R.numLightProbes!==y)&&(n.directional.length=h,n.spot.length=A,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+E-C,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=y,R.directionalLength=h,R.pointLength=g,R.spotLength=A,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=S,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=E,R.numLightProbes=y,n.version=s0++)}function l(c,d){let u=0,f=0,h=0,g=0,A=0;const p=d.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const x=c[m];if(x.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(x.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),h++}else if(x.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){const v=n.hemi[A];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(p),A++}}}return{setup:a,setupView:l,state:n}}function ic(r){const e=new o0(r),t=[],n=[];function i(d){c.camera=d,t.length=0,n.length=0}function s(d){t.push(d)}function o(d){n.push(d)}function a(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function a0(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new ic(r),e.set(i,[a])):s>=o.length?(a=new ic(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class l0 extends Vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class c0 extends Vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const d0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function h0(r,e,t){let n=new pd;const i=new xe,s=new xe,o=new _t,a=new l0({depthPacking:Hu}),l=new c0,c={},d=t.maxTextureSize,u={[yn]:Wt,[Wt]:yn,[nn]:nn},f=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:d0,fragmentShader:u0}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new rn;g.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new gt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yc;let m=this.type;this.render=function(C,y,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const M=r.getRenderTarget(),_=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Jn),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const D=m!==In&&this.type===In,F=m===In&&this.type!==In;for(let z=0,N=C.length;z<N;z++){const G=C[z],k=G.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const Y=k.getFrameExtents();if(i.multiply(Y),s.copy(k.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(s.x=Math.floor(d/Y.x),i.x=s.x*Y.x,k.mapSize.x=s.x),i.y>d&&(s.y=Math.floor(d/Y.y),i.y=s.y*Y.y,k.mapSize.y=s.y)),k.map===null||D===!0||F===!0){const de=this.type!==In?{minFilter:Vt,magFilter:Vt}:{};k.map!==null&&k.map.dispose(),k.map=new ii(i.x,i.y,de),k.map.texture.name=G.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const J=k.getViewportCount();for(let de=0;de<J;de++){const Re=k.getViewport(de);o.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),L.viewport(o),k.updateMatrices(G,de),n=k.getFrustum(),v(y,R,k.camera,G,this.type)}k.isPointLightShadow!==!0&&this.type===In&&S(k,R),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(M,_,I)};function S(C,y){const R=e.update(A);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ii(i.x,i.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(y,null,R,f,A,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(y,null,R,h,A,null)}function x(C,y,R,M){let _=null;const I=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)_=I;else if(_=R.isPointLight===!0?l:a,r.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){const L=_.uuid,D=y.uuid;let F=c[L];F===void 0&&(F={},c[L]=F);let z=F[D];z===void 0&&(z=_.clone(),F[D]=z,y.addEventListener("dispose",E)),_=z}if(_.visible=y.visible,_.wireframe=y.wireframe,M===In?_.side=y.shadowSide!==null?y.shadowSide:y.side:_.side=y.shadowSide!==null?y.shadowSide:u[y.side],_.alphaMap=y.alphaMap,_.alphaTest=y.alphaTest,_.map=y.map,_.clipShadows=y.clipShadows,_.clippingPlanes=y.clippingPlanes,_.clipIntersection=y.clipIntersection,_.displacementMap=y.displacementMap,_.displacementScale=y.displacementScale,_.displacementBias=y.displacementBias,_.wireframeLinewidth=y.wireframeLinewidth,_.linewidth=y.linewidth,R.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const L=r.properties.get(_);L.light=R}return _}function v(C,y,R,M,_){if(C.visible===!1)return;if(C.layers.test(y.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&_===In)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);const D=e.update(C),F=C.material;if(Array.isArray(F)){const z=D.groups;for(let N=0,G=z.length;N<G;N++){const k=z[N],Y=F[k.materialIndex];if(Y&&Y.visible){const J=x(C,Y,M,_);C.onBeforeShadow(r,C,y,R,D,J,k),r.renderBufferDirect(R,null,D,J,C,k),C.onAfterShadow(r,C,y,R,D,J,k)}}}else if(F.visible){const z=x(C,F,M,_);C.onBeforeShadow(r,C,y,R,D,z,null),r.renderBufferDirect(R,null,D,z,C,null),C.onAfterShadow(r,C,y,R,D,z,null)}}const L=C.children;for(let D=0,F=L.length;D<F;D++)v(L[D],y,R,M,_)}function E(C){C.target.removeEventListener("dispose",E);for(const R in c){const M=c[R],_=C.target.uuid;_ in M&&(M[_].dispose(),delete M[_])}}}function f0(r){function e(){let U=!1;const Ae=new _t;let j=null;const Z=new _t(0,0,0,0);return{setMask:function(ae){j!==ae&&!U&&(r.colorMask(ae,ae,ae,ae),j=ae)},setLocked:function(ae){U=ae},setClear:function(ae,Be,Qe,at,ht){ht===!0&&(ae*=at,Be*=at,Qe*=at),Ae.set(ae,Be,Qe,at),Z.equals(Ae)===!1&&(r.clearColor(ae,Be,Qe,at),Z.copy(Ae))},reset:function(){U=!1,j=null,Z.set(-1,0,0,0)}}}function t(){let U=!1,Ae=null,j=null,Z=null;return{setTest:function(ae){ae?se(r.DEPTH_TEST):ne(r.DEPTH_TEST)},setMask:function(ae){Ae!==ae&&!U&&(r.depthMask(ae),Ae=ae)},setFunc:function(ae){if(j!==ae){switch(ae){case fu:r.depthFunc(r.NEVER);break;case pu:r.depthFunc(r.ALWAYS);break;case mu:r.depthFunc(r.LESS);break;case Cr:r.depthFunc(r.LEQUAL);break;case gu:r.depthFunc(r.EQUAL);break;case Au:r.depthFunc(r.GEQUAL);break;case Su:r.depthFunc(r.GREATER);break;case xu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}j=ae}},setLocked:function(ae){U=ae},setClear:function(ae){Z!==ae&&(r.clearDepth(ae),Z=ae)},reset:function(){U=!1,Ae=null,j=null,Z=null}}}function n(){let U=!1,Ae=null,j=null,Z=null,ae=null,Be=null,Qe=null,at=null,ht=null;return{setTest:function(st){U||(st?se(r.STENCIL_TEST):ne(r.STENCIL_TEST))},setMask:function(st){Ae!==st&&!U&&(r.stencilMask(st),Ae=st)},setFunc:function(st,pn,mn){(j!==st||Z!==pn||ae!==mn)&&(r.stencilFunc(st,pn,mn),j=st,Z=pn,ae=mn)},setOp:function(st,pn,mn){(Be!==st||Qe!==pn||at!==mn)&&(r.stencilOp(st,pn,mn),Be=st,Qe=pn,at=mn)},setLocked:function(st){U=st},setClear:function(st){ht!==st&&(r.clearStencil(st),ht=st)},reset:function(){U=!1,Ae=null,j=null,Z=null,ae=null,Be=null,Qe=null,at=null,ht=null}}}const i=new e,s=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},d={},u=new WeakMap,f=[],h=null,g=!1,A=null,p=null,m=null,S=null,x=null,v=null,E=null,C=new je(0,0,0),y=0,R=!1,M=null,_=null,I=null,L=null,D=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,N=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=N>=1):G.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=N>=2);let k=null,Y={};const J=r.getParameter(r.SCISSOR_BOX),de=r.getParameter(r.VIEWPORT),Re=new _t().fromArray(J),Pe=new _t().fromArray(de);function W(U,Ae,j,Z){const ae=new Uint8Array(4),Be=r.createTexture();r.bindTexture(U,Be),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qe=0;Qe<j;Qe++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(Ae,0,r.RGBA,1,1,Z,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(Ae+Qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return Be}const $={};$[r.TEXTURE_2D]=W(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=W(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=W(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=W(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),se(r.DEPTH_TEST),s.setFunc(Cr),fe(!1),Ge(Oa),se(r.CULL_FACE),Me(Jn);function se(U){c[U]!==!0&&(r.enable(U),c[U]=!0)}function ne(U){c[U]!==!1&&(r.disable(U),c[U]=!1)}function Ee(U,Ae){return d[U]!==Ae?(r.bindFramebuffer(U,Ae),d[U]=Ae,U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=Ae),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=Ae),!0):!1}function ye(U,Ae){let j=f,Z=!1;if(U){j=u.get(Ae),j===void 0&&(j=[],u.set(Ae,j));const ae=U.textures;if(j.length!==ae.length||j[0]!==r.COLOR_ATTACHMENT0){for(let Be=0,Qe=ae.length;Be<Qe;Be++)j[Be]=r.COLOR_ATTACHMENT0+Be;j.length=ae.length,Z=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,Z=!0);Z&&r.drawBuffers(j)}function Ie(U){return h!==U?(r.useProgram(U),h=U,!0):!1}const B={[pi]:r.FUNC_ADD,[jd]:r.FUNC_SUBTRACT,[Zd]:r.FUNC_REVERSE_SUBTRACT};B[$d]=r.MIN,B[Jd]=r.MAX;const De={[eu]:r.ZERO,[tu]:r.ONE,[nu]:r.SRC_COLOR,[Ps]:r.SRC_ALPHA,[lu]:r.SRC_ALPHA_SATURATE,[ou]:r.DST_COLOR,[su]:r.DST_ALPHA,[iu]:r.ONE_MINUS_SRC_COLOR,[Ds]:r.ONE_MINUS_SRC_ALPHA,[au]:r.ONE_MINUS_DST_COLOR,[ru]:r.ONE_MINUS_DST_ALPHA,[cu]:r.CONSTANT_COLOR,[du]:r.ONE_MINUS_CONSTANT_COLOR,[uu]:r.CONSTANT_ALPHA,[hu]:r.ONE_MINUS_CONSTANT_ALPHA};function Me(U,Ae,j,Z,ae,Be,Qe,at,ht,st){if(U===Jn){g===!0&&(ne(r.BLEND),g=!1);return}if(g===!1&&(se(r.BLEND),g=!0),U!==Kc){if(U!==A||st!==R){if((p!==pi||x!==pi)&&(r.blendEquation(r.FUNC_ADD),p=pi,x=pi),st)switch(U){case ei:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Na:r.blendFunc(r.ONE,r.ONE);break;case za:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ha:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ei:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Na:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case za:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ha:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}m=null,S=null,v=null,E=null,C.set(0,0,0),y=0,A=U,R=st}return}ae=ae||Ae,Be=Be||j,Qe=Qe||Z,(Ae!==p||ae!==x)&&(r.blendEquationSeparate(B[Ae],B[ae]),p=Ae,x=ae),(j!==m||Z!==S||Be!==v||Qe!==E)&&(r.blendFuncSeparate(De[j],De[Z],De[Be],De[Qe]),m=j,S=Z,v=Be,E=Qe),(at.equals(C)===!1||ht!==y)&&(r.blendColor(at.r,at.g,at.b,ht),C.copy(at),y=ht),A=U,R=!1}function We(U,Ae){U.side===nn?ne(r.CULL_FACE):se(r.CULL_FACE);let j=U.side===Wt;Ae&&(j=!j),fe(j),U.blending===ei&&U.transparent===!1?Me(Jn):Me(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),i.setMask(U.colorWrite);const Z=U.stencilWrite;o.setTest(Z),Z&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Te(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):ne(r.SAMPLE_ALPHA_TO_COVERAGE)}function fe(U){M!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),M=U)}function Ge(U){U!==Qd?(se(r.CULL_FACE),U!==_&&(U===Oa?r.cullFace(r.BACK):U===Yd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ne(r.CULL_FACE),_=U}function Ne(U){U!==I&&(z&&r.lineWidth(U),I=U)}function Te(U,Ae,j){U?(se(r.POLYGON_OFFSET_FILL),(L!==Ae||D!==j)&&(r.polygonOffset(Ae,j),L=Ae,D=j)):ne(r.POLYGON_OFFSET_FILL)}function Ke(U){U?se(r.SCISSOR_TEST):ne(r.SCISSOR_TEST)}function P(U){U===void 0&&(U=r.TEXTURE0+F-1),k!==U&&(r.activeTexture(U),k=U)}function T(U,Ae,j){j===void 0&&(k===null?j=r.TEXTURE0+F-1:j=k);let Z=Y[j];Z===void 0&&(Z={type:void 0,texture:void 0},Y[j]=Z),(Z.type!==U||Z.texture!==Ae)&&(k!==j&&(r.activeTexture(j),k=j),r.bindTexture(U,Ae||$[U]),Z.type=U,Z.texture=Ae)}function Q(){const U=Y[k];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ee(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xe(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function O(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(U){Re.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Re.copy(U))}function oe(U){Pe.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),Pe.copy(U))}function we(U,Ae){let j=l.get(Ae);j===void 0&&(j=new WeakMap,l.set(Ae,j));let Z=j.get(U);Z===void 0&&(Z=r.getUniformBlockIndex(Ae,U.name),j.set(U,Z))}function Oe(U,Ae){const Z=l.get(Ae).get(U);a.get(Ae)!==Z&&(r.uniformBlockBinding(Ae,Z,U.__bindingPointIndex),a.set(Ae,Z))}function it(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},k=null,Y={},d={},u=new WeakMap,f=[],h=null,g=!1,A=null,p=null,m=null,S=null,x=null,v=null,E=null,C=new je(0,0,0),y=0,R=!1,M=null,_=null,I=null,L=null,D=null,Re.set(0,0,r.canvas.width,r.canvas.height),Pe.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:se,disable:ne,bindFramebuffer:Ee,drawBuffers:ye,useProgram:Ie,setBlending:Me,setMaterial:We,setFlipSided:fe,setCullFace:Ge,setLineWidth:Ne,setPolygonOffset:Te,setScissorTest:Ke,activeTexture:P,bindTexture:T,unbindTexture:Q,compressedTexImage2D:ee,compressedTexImage3D:ie,texImage2D:Ce,texImage3D:O,updateUBOMapping:we,uniformBlockBinding:Oe,texStorage2D:Xe,texStorage3D:le,texSubImage2D:re,texSubImage3D:Fe,compressedTexSubImage2D:pe,compressedTexSubImage3D:ge,scissor:te,viewport:oe,reset:it}}function p0(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xe,d=new WeakMap;let u;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,T){return h?new OffscreenCanvas(P,T):Ir("canvas")}function A(P,T,Q){let ee=1;const ie=Ke(P);if((ie.width>Q||ie.height>Q)&&(ee=Q/Math.max(ie.width,ie.height)),ee<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const re=Math.floor(ee*ie.width),Fe=Math.floor(ee*ie.height);u===void 0&&(u=g(re,Fe));const pe=T?g(re,Fe):u;return pe.width=re,pe.height=Fe,pe.getContext("2d").drawImage(P,0,0,re,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+re+"x"+Fe+")."),pe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),P;return P}function p(P){return P.generateMipmaps&&P.minFilter!==Vt&&P.minFilter!==dn}function m(P){r.generateMipmap(P)}function S(P,T,Q,ee,ie=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let re=T;if(T===r.RED&&(Q===r.FLOAT&&(re=r.R32F),Q===r.HALF_FLOAT&&(re=r.R16F),Q===r.UNSIGNED_BYTE&&(re=r.R8)),T===r.RED_INTEGER&&(Q===r.UNSIGNED_BYTE&&(re=r.R8UI),Q===r.UNSIGNED_SHORT&&(re=r.R16UI),Q===r.UNSIGNED_INT&&(re=r.R32UI),Q===r.BYTE&&(re=r.R8I),Q===r.SHORT&&(re=r.R16I),Q===r.INT&&(re=r.R32I)),T===r.RG&&(Q===r.FLOAT&&(re=r.RG32F),Q===r.HALF_FLOAT&&(re=r.RG16F),Q===r.UNSIGNED_BYTE&&(re=r.RG8)),T===r.RG_INTEGER&&(Q===r.UNSIGNED_BYTE&&(re=r.RG8UI),Q===r.UNSIGNED_SHORT&&(re=r.RG16UI),Q===r.UNSIGNED_INT&&(re=r.RG32UI),Q===r.BYTE&&(re=r.RG8I),Q===r.SHORT&&(re=r.RG16I),Q===r.INT&&(re=r.RG32I)),T===r.RGB&&Q===r.UNSIGNED_INT_5_9_9_9_REV&&(re=r.RGB9_E5),T===r.RGBA){const Fe=ie?Tr:tt.getTransfer(ee);Q===r.FLOAT&&(re=r.RGBA32F),Q===r.HALF_FLOAT&&(re=r.RGBA16F),Q===r.UNSIGNED_BYTE&&(re=Fe===lt?r.SRGB8_ALPHA8:r.RGBA8),Q===r.UNSIGNED_SHORT_4_4_4_4&&(re=r.RGBA4),Q===r.UNSIGNED_SHORT_5_5_5_1&&(re=r.RGB5_A1)}return(re===r.R16F||re===r.R32F||re===r.RG16F||re===r.RG32F||re===r.RGBA16F||re===r.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function x(P,T){let Q;return P?T===null||T===un||T===ls?Q=r.DEPTH24_STENCIL8:T===xn?Q=r.DEPTH32F_STENCIL8:T===Er&&(Q=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===un||T===ls?Q=r.DEPTH_COMPONENT24:T===xn?Q=r.DEPTH_COMPONENT32F:T===Er&&(Q=r.DEPTH_COMPONENT16),Q}function v(P,T){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Vt&&P.minFilter!==dn?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function E(P){const T=P.target;T.removeEventListener("dispose",E),y(T),T.isVideoTexture&&d.delete(T)}function C(P){const T=P.target;T.removeEventListener("dispose",C),M(T)}function y(P){const T=n.get(P);if(T.__webglInit===void 0)return;const Q=P.source,ee=f.get(Q);if(ee){const ie=ee[T.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&R(P),Object.keys(ee).length===0&&f.delete(Q)}n.remove(P)}function R(P){const T=n.get(P);r.deleteTexture(T.__webglTexture);const Q=P.source,ee=f.get(Q);delete ee[T.__cacheKey],o.memory.textures--}function M(P){const T=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(T.__webglFramebuffer[ee]))for(let ie=0;ie<T.__webglFramebuffer[ee].length;ie++)r.deleteFramebuffer(T.__webglFramebuffer[ee][ie]);else r.deleteFramebuffer(T.__webglFramebuffer[ee]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ee])}else{if(Array.isArray(T.__webglFramebuffer))for(let ee=0;ee<T.__webglFramebuffer.length;ee++)r.deleteFramebuffer(T.__webglFramebuffer[ee]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ee=0;ee<T.__webglColorRenderbuffer.length;ee++)T.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ee]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Q=P.textures;for(let ee=0,ie=Q.length;ee<ie;ee++){const re=n.get(Q[ee]);re.__webglTexture&&(r.deleteTexture(re.__webglTexture),o.memory.textures--),n.remove(Q[ee])}n.remove(P)}let _=0;function I(){_=0}function L(){const P=_;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),_+=1,P}function D(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function F(P,T){const Q=n.get(P);if(P.isVideoTexture&&Ne(P),P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){const ee=P.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(Q,P,T);return}}t.bindTexture(r.TEXTURE_2D,Q.__webglTexture,r.TEXTURE0+T)}function z(P,T){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){Pe(Q,P,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,Q.__webglTexture,r.TEXTURE0+T)}function N(P,T){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){Pe(Q,P,T);return}t.bindTexture(r.TEXTURE_3D,Q.__webglTexture,r.TEXTURE0+T)}function G(P,T){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){W(Q,P,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture,r.TEXTURE0+T)}const k={[qo]:r.REPEAT,[Si]:r.CLAMP_TO_EDGE,[Qo]:r.MIRRORED_REPEAT},Y={[Vt]:r.NEAREST,[bu]:r.NEAREST_MIPMAP_NEAREST,[Xs]:r.NEAREST_MIPMAP_LINEAR,[dn]:r.LINEAR,[jr]:r.LINEAR_MIPMAP_NEAREST,[xi]:r.LINEAR_MIPMAP_LINEAR},J={[Gu]:r.NEVER,[Ku]:r.ALWAYS,[Wu]:r.LESS,[id]:r.LEQUAL,[Xu]:r.EQUAL,[Yu]:r.GEQUAL,[qu]:r.GREATER,[Qu]:r.NOTEQUAL};function de(P,T){if(T.type===xn&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===dn||T.magFilter===jr||T.magFilter===Xs||T.magFilter===xi||T.minFilter===dn||T.minFilter===jr||T.minFilter===Xs||T.minFilter===xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,k[T.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,k[T.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,k[T.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,Y[T.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,Y[T.minFilter]),T.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,J[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Vt||T.minFilter!==Xs&&T.minFilter!==xi||T.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Re(P,T){let Q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",E));const ee=T.source;let ie=f.get(ee);ie===void 0&&(ie={},f.set(ee,ie));const re=D(T);if(re!==P.__cacheKey){ie[re]===void 0&&(ie[re]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),ie[re].usedTimes++;const Fe=ie[P.__cacheKey];Fe!==void 0&&(ie[P.__cacheKey].usedTimes--,Fe.usedTimes===0&&R(T)),P.__cacheKey=re,P.__webglTexture=ie[re].texture}return Q}function Pe(P,T,Q){let ee=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ee=r.TEXTURE_3D);const ie=Re(P,T),re=T.source;t.bindTexture(ee,P.__webglTexture,r.TEXTURE0+Q);const Fe=n.get(re);if(re.version!==Fe.__version||ie===!0){t.activeTexture(r.TEXTURE0+Q);const pe=tt.getPrimaries(tt.workingColorSpace),ge=T.colorSpace===Zn?null:tt.getPrimaries(T.colorSpace),Xe=T.colorSpace===Zn||pe===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let le=A(T.image,!1,i.maxTextureSize);le=Te(T,le);const Ce=s.convert(T.format,T.colorSpace),O=s.convert(T.type);let te=S(T.internalFormat,Ce,O,T.colorSpace,T.isVideoTexture);de(ee,T);let oe;const we=T.mipmaps,Oe=T.isVideoTexture!==!0,it=Fe.__version===void 0||ie===!0,U=re.dataReady,Ae=v(T,le);if(T.isDepthTexture)te=x(T.format===cs,T.type),it&&(Oe?t.texStorage2D(r.TEXTURE_2D,1,te,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,te,le.width,le.height,0,Ce,O,null));else if(T.isDataTexture)if(we.length>0){Oe&&it&&t.texStorage2D(r.TEXTURE_2D,Ae,te,we[0].width,we[0].height);for(let j=0,Z=we.length;j<Z;j++)oe=we[j],Oe?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,oe.width,oe.height,Ce,O,oe.data):t.texImage2D(r.TEXTURE_2D,j,te,oe.width,oe.height,0,Ce,O,oe.data);T.generateMipmaps=!1}else Oe?(it&&t.texStorage2D(r.TEXTURE_2D,Ae,te,le.width,le.height),U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le.width,le.height,Ce,O,le.data)):t.texImage2D(r.TEXTURE_2D,0,te,le.width,le.height,0,Ce,O,le.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Oe&&it&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ae,te,we[0].width,we[0].height,le.depth);for(let j=0,Z=we.length;j<Z;j++)if(oe=we[j],T.format!==Gt)if(Ce!==null)if(Oe){if(U)if(T.layerUpdates.size>0){for(const ae of T.layerUpdates){const Be=oe.width*oe.height;t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,ae,oe.width,oe.height,1,Ce,oe.data.slice(Be*ae,Be*(ae+1)),0,0)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,le.depth,Ce,oe.data,0,0)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,te,oe.width,oe.height,le.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,le.depth,Ce,O,oe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,j,te,oe.width,oe.height,le.depth,0,Ce,O,oe.data)}else{Oe&&it&&t.texStorage2D(r.TEXTURE_2D,Ae,te,we[0].width,we[0].height);for(let j=0,Z=we.length;j<Z;j++)oe=we[j],T.format!==Gt?Ce!==null?Oe?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,oe.width,oe.height,Ce,oe.data):t.compressedTexImage2D(r.TEXTURE_2D,j,te,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,oe.width,oe.height,Ce,O,oe.data):t.texImage2D(r.TEXTURE_2D,j,te,oe.width,oe.height,0,Ce,O,oe.data)}else if(T.isDataArrayTexture)if(Oe){if(it&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ae,te,le.width,le.height,le.depth),U)if(T.layerUpdates.size>0){let j;switch(O){case r.UNSIGNED_BYTE:switch(Ce){case r.ALPHA:j=1;break;case r.LUMINANCE:j=1;break;case r.LUMINANCE_ALPHA:j=2;break;case r.RGB:j=3;break;case r.RGBA:j=4;break;default:throw new Error(`Unknown texel size for format ${Ce}.`)}break;case r.UNSIGNED_SHORT_4_4_4_4:case r.UNSIGNED_SHORT_5_5_5_1:case r.UNSIGNED_SHORT_5_6_5:j=1;break;default:throw new Error(`Unknown texel size for type ${O}.`)}const Z=le.width*le.height*j;for(const ae of T.layerUpdates)t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ae,le.width,le.height,1,Ce,O,le.data.slice(Z*ae,Z*(ae+1)));T.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ce,O,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,te,le.width,le.height,le.depth,0,Ce,O,le.data);else if(T.isData3DTexture)Oe?(it&&t.texStorage3D(r.TEXTURE_3D,Ae,te,le.width,le.height,le.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ce,O,le.data)):t.texImage3D(r.TEXTURE_3D,0,te,le.width,le.height,le.depth,0,Ce,O,le.data);else if(T.isFramebufferTexture){if(it)if(Oe)t.texStorage2D(r.TEXTURE_2D,Ae,te,le.width,le.height);else{let j=le.width,Z=le.height;for(let ae=0;ae<Ae;ae++)t.texImage2D(r.TEXTURE_2D,ae,te,j,Z,0,Ce,O,null),j>>=1,Z>>=1}}else if(we.length>0){if(Oe&&it){const j=Ke(we[0]);t.texStorage2D(r.TEXTURE_2D,Ae,te,j.width,j.height)}for(let j=0,Z=we.length;j<Z;j++)oe=we[j],Oe?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,Ce,O,oe):t.texImage2D(r.TEXTURE_2D,j,te,Ce,O,oe);T.generateMipmaps=!1}else if(Oe){if(it){const j=Ke(le);t.texStorage2D(r.TEXTURE_2D,Ae,te,j.width,j.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ce,O,le)}else t.texImage2D(r.TEXTURE_2D,0,te,Ce,O,le);p(T)&&m(ee),Fe.__version=re.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function W(P,T,Q){if(T.image.length!==6)return;const ee=Re(P,T),ie=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+Q);const re=n.get(ie);if(ie.version!==re.__version||ee===!0){t.activeTexture(r.TEXTURE0+Q);const Fe=tt.getPrimaries(tt.workingColorSpace),pe=T.colorSpace===Zn?null:tt.getPrimaries(T.colorSpace),ge=T.colorSpace===Zn||Fe===pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Xe=T.isCompressedTexture||T.image[0].isCompressedTexture,le=T.image[0]&&T.image[0].isDataTexture,Ce=[];for(let Z=0;Z<6;Z++)!Xe&&!le?Ce[Z]=A(T.image[Z],!0,i.maxCubemapSize):Ce[Z]=le?T.image[Z].image:T.image[Z],Ce[Z]=Te(T,Ce[Z]);const O=Ce[0],te=s.convert(T.format,T.colorSpace),oe=s.convert(T.type),we=S(T.internalFormat,te,oe,T.colorSpace),Oe=T.isVideoTexture!==!0,it=re.__version===void 0||ee===!0,U=ie.dataReady;let Ae=v(T,O);de(r.TEXTURE_CUBE_MAP,T);let j;if(Xe){Oe&&it&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ae,we,O.width,O.height);for(let Z=0;Z<6;Z++){j=Ce[Z].mipmaps;for(let ae=0;ae<j.length;ae++){const Be=j[ae];T.format!==Gt?te!==null?Oe?U&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae,0,0,Be.width,Be.height,te,Be.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae,we,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae,0,0,Be.width,Be.height,te,oe,Be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae,we,Be.width,Be.height,0,te,oe,Be.data)}}}else{if(j=T.mipmaps,Oe&&it){j.length>0&&Ae++;const Z=Ke(Ce[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ae,we,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(le){Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ce[Z].width,Ce[Z].height,te,oe,Ce[Z].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,we,Ce[Z].width,Ce[Z].height,0,te,oe,Ce[Z].data);for(let ae=0;ae<j.length;ae++){const Qe=j[ae].image[Z].image;Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae+1,0,0,Qe.width,Qe.height,te,oe,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae+1,we,Qe.width,Qe.height,0,te,oe,Qe.data)}}else{Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,te,oe,Ce[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,we,te,oe,Ce[Z]);for(let ae=0;ae<j.length;ae++){const Be=j[ae];Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae+1,0,0,te,oe,Be.image[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ae+1,we,te,oe,Be.image[Z])}}}p(T)&&m(r.TEXTURE_CUBE_MAP),re.__version=ie.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function $(P,T,Q,ee,ie,re){const Fe=s.convert(Q.format,Q.colorSpace),pe=s.convert(Q.type),ge=S(Q.internalFormat,Fe,pe,Q.colorSpace);if(!n.get(T).__hasExternalTextures){const le=Math.max(1,T.width>>re),Ce=Math.max(1,T.height>>re);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,re,ge,le,Ce,T.depth,0,Fe,pe,null):t.texImage2D(ie,re,ge,le,Ce,0,Fe,pe,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),Ge(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,ie,n.get(Q).__webglTexture,0,fe(T)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,ie,n.get(Q).__webglTexture,re),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(P,T,Q){if(r.bindRenderbuffer(r.RENDERBUFFER,P),T.depthBuffer){const ee=T.depthTexture,ie=ee&&ee.isDepthTexture?ee.type:null,re=x(T.stencilBuffer,ie),Fe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,pe=fe(T);Ge(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,pe,re,T.width,T.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,pe,re,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,re,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Fe,r.RENDERBUFFER,P)}else{const ee=T.textures;for(let ie=0;ie<ee.length;ie++){const re=ee[ie],Fe=s.convert(re.format,re.colorSpace),pe=s.convert(re.type),ge=S(re.internalFormat,Fe,pe,re.colorSpace),Xe=fe(T);Q&&Ge(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe,ge,T.width,T.height):Ge(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xe,ge,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ge,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ne(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),F(T.depthTexture,0);const ee=n.get(T.depthTexture).__webglTexture,ie=fe(T);if(T.depthTexture.format===vi)Ge(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0,ie):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0);else if(T.depthTexture.format===cs)Ge(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0,ie):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ee(P){const T=n.get(P),Q=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");ne(T.__webglFramebuffer,P)}else if(Q){T.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ee]),T.__webglDepthbuffer[ee]=r.createRenderbuffer(),se(T.__webglDepthbuffer[ee],P,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=r.createRenderbuffer(),se(T.__webglDepthbuffer,P,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function ye(P,T,Q){const ee=n.get(P);T!==void 0&&$(ee.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Q!==void 0&&Ee(P)}function Ie(P){const T=P.texture,Q=n.get(P),ee=n.get(T);P.addEventListener("dispose",C);const ie=P.textures,re=P.isWebGLCubeRenderTarget===!0,Fe=ie.length>1;if(Fe||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=T.version,o.memory.textures++),re){Q.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer[pe]=[];for(let ge=0;ge<T.mipmaps.length;ge++)Q.__webglFramebuffer[pe][ge]=r.createFramebuffer()}else Q.__webglFramebuffer[pe]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer=[];for(let pe=0;pe<T.mipmaps.length;pe++)Q.__webglFramebuffer[pe]=r.createFramebuffer()}else Q.__webglFramebuffer=r.createFramebuffer();if(Fe)for(let pe=0,ge=ie.length;pe<ge;pe++){const Xe=n.get(ie[pe]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&Ge(P)===!1){Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let pe=0;pe<ie.length;pe++){const ge=ie[pe];Q.__webglColorRenderbuffer[pe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Q.__webglColorRenderbuffer[pe]);const Xe=s.convert(ge.format,ge.colorSpace),le=s.convert(ge.type),Ce=S(ge.internalFormat,Xe,le,ge.colorSpace,P.isXRRenderTarget===!0),O=fe(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,O,Ce,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,Q.__webglColorRenderbuffer[pe])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),se(Q.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(re){t.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),de(r.TEXTURE_CUBE_MAP,T);for(let pe=0;pe<6;pe++)if(T.mipmaps&&T.mipmaps.length>0)for(let ge=0;ge<T.mipmaps.length;ge++)$(Q.__webglFramebuffer[pe][ge],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ge);else $(Q.__webglFramebuffer[pe],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);p(T)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let pe=0,ge=ie.length;pe<ge;pe++){const Xe=ie[pe],le=n.get(Xe);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),de(r.TEXTURE_2D,Xe),$(Q.__webglFramebuffer,P,Xe,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,0),p(Xe)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let pe=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pe=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(pe,ee.__webglTexture),de(pe,T),T.mipmaps&&T.mipmaps.length>0)for(let ge=0;ge<T.mipmaps.length;ge++)$(Q.__webglFramebuffer[ge],P,T,r.COLOR_ATTACHMENT0,pe,ge);else $(Q.__webglFramebuffer,P,T,r.COLOR_ATTACHMENT0,pe,0);p(T)&&m(pe),t.unbindTexture()}P.depthBuffer&&Ee(P)}function B(P){const T=P.textures;for(let Q=0,ee=T.length;Q<ee;Q++){const ie=T[Q];if(p(ie)){const re=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Fe=n.get(ie).__webglTexture;t.bindTexture(re,Fe),m(re),t.unbindTexture()}}}const De=[],Me=[];function We(P){if(P.samples>0){if(Ge(P)===!1){const T=P.textures,Q=P.width,ee=P.height;let ie=r.COLOR_BUFFER_BIT;const re=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Fe=n.get(P),pe=T.length>1;if(pe)for(let ge=0;ge<T.length;ge++)t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let ge=0;ge<T.length;ge++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),pe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[ge]);const Xe=n.get(T[ge]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Xe,0)}r.blitFramebuffer(0,0,Q,ee,0,0,Q,ee,ie,r.NEAREST),l===!0&&(De.length=0,Me.length=0,De.push(r.COLOR_ATTACHMENT0+ge),P.depthBuffer&&P.resolveDepthBuffer===!1&&(De.push(re),Me.push(re),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Me)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pe)for(let ge=0;ge<T.length;ge++){t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[ge]);const Xe=n.get(T[ge]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,Xe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const T=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function fe(P){return Math.min(i.maxSamples,P.samples)}function Ge(P){const T=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ne(P){const T=o.render.frame;d.get(P)!==T&&(d.set(P,T),P.update())}function Te(P,T){const Q=P.colorSpace,ee=P.format,ie=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Q!==si&&Q!==Zn&&(tt.getTransfer(Q)===lt?(ee!==Gt||ie!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),T}function Ke(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=I,this.setTexture2D=F,this.setTexture2DArray=z,this.setTexture3D=N,this.setTextureCube=G,this.rebindTextures=ye,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=We,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Ge}function vd(r,e){function t(n,i=Zn){let s;const o=tt.getTransfer(i);if(n===Hn)return r.UNSIGNED_BYTE;if(n===ed)return r.UNSIGNED_SHORT_4_4_4_4;if(n===td)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Pu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ru)return r.BYTE;if(n===Iu)return r.SHORT;if(n===Er)return r.UNSIGNED_SHORT;if(n===Jc)return r.INT;if(n===un)return r.UNSIGNED_INT;if(n===xn)return r.FLOAT;if(n===zs)return r.HALF_FLOAT;if(n===Du)return r.ALPHA;if(n===Fu)return r.RGB;if(n===Gt)return r.RGBA;if(n===Lu)return r.LUMINANCE;if(n===Bu)return r.LUMINANCE_ALPHA;if(n===vi)return r.DEPTH_COMPONENT;if(n===cs)return r.DEPTH_STENCIL;if(n===Uu)return r.RED;if(n===sa)return r.RED_INTEGER;if(n===Ou)return r.RG;if(n===nd)return r.RG_INTEGER;if(n===Cs)return r.RGBA_INTEGER;if(n===Zr||n===$r||n===Jr||n===eo)if(o===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Zr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Zr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===eo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Va||n===Ga||n===Wa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ka)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xa||n===qa||n===Qa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Xa||n===qa)return o===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Qa)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ya||n===Ka||n===ja||n===Za||n===$a||n===Ja||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol||n===al)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ya)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ka)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ja)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$a)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===el)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===nl)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===il)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sl)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===rl)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ol)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===al)return o===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===to||n===ll||n===cl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===to)return o===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ll)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nu||n===dl||n===ul||n===hl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===to)return s.COMPRESSED_RED_RGTC1_EXT;if(n===dl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ul)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class m0 extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class fr extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const g0={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const A of e.hand.values()){const p=t.getJointPose(A,n),m=this._getHandJoint(c,A);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(g0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new fr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const A0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class x0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new zt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new $t({vertexShader:A0,fragmentShader:S0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new us(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class _0 extends Ci{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,u=null,f=null,h=null,g=null;const A=new x0,p=t.getContextAttributes();let m=null,S=null;const x=[],v=[],E=new xe;let C=null;const y=new Kt;y.layers.enable(1),y.viewport=new _t;const R=new Kt;R.layers.enable(2),R.viewport=new _t;const M=[y,R],_=new m0;_.layers.enable(1),_.layers.enable(2);let I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let $=x[W];return $===void 0&&($=new wo,x[W]=$),$.getTargetRaySpace()},this.getControllerGrip=function(W){let $=x[W];return $===void 0&&($=new wo,x[W]=$),$.getGripSpace()},this.getHand=function(W){let $=x[W];return $===void 0&&($=new wo,x[W]=$),$.getHandSpace()};function D(W){const $=v.indexOf(W.inputSource);if($===-1)return;const se=x[$];se!==void 0&&(se.update(W.inputSource,W.frame,c||o),se.dispatchEvent({type:W.type,data:W.inputSource}))}function F(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",z);for(let W=0;W<x.length;W++){const $=v[W];$!==null&&(v[W]=null,x[W].disconnect($))}I=null,L=null,A.reset(),e.setRenderTarget(m),h=null,f=null,u=null,i=null,S=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",F),i.addEventListener("inputsourceschange",z),p.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0){const $={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,$),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new ii(h.framebufferWidth,h.framebufferHeight,{format:Gt,type:Hn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let $=null,se=null,ne=null;p.depth&&(ne=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=p.stencil?cs:vi,se=p.stencil?ls:un);const Ee={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:s};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(Ee),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new ii(f.textureWidth,f.textureHeight,{format:Gt,type:Hn,depthTexture:new ha(f.textureWidth,f.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Pe.setContext(i),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function z(W){for(let $=0;$<W.removed.length;$++){const se=W.removed[$],ne=v.indexOf(se);ne>=0&&(v[ne]=null,x[ne].disconnect(se))}for(let $=0;$<W.added.length;$++){const se=W.added[$];let ne=v.indexOf(se);if(ne===-1){for(let ye=0;ye<x.length;ye++)if(ye>=v.length){v.push(se),ne=ye;break}else if(v[ye]===null){v[ye]=se,ne=ye;break}if(ne===-1)break}const Ee=x[ne];Ee&&Ee.connect(se)}}const N=new b,G=new b;function k(W,$,se){N.setFromMatrixPosition($.matrixWorld),G.setFromMatrixPosition(se.matrixWorld);const ne=N.distanceTo(G),Ee=$.projectionMatrix.elements,ye=se.projectionMatrix.elements,Ie=Ee[14]/(Ee[10]-1),B=Ee[14]/(Ee[10]+1),De=(Ee[9]+1)/Ee[5],Me=(Ee[9]-1)/Ee[5],We=(Ee[8]-1)/Ee[0],fe=(ye[8]+1)/ye[0],Ge=Ie*We,Ne=Ie*fe,Te=ne/(-We+fe),Ke=Te*-We;$.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ke),W.translateZ(Te),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const P=Ie+Te,T=B+Te,Q=Ge-Ke,ee=Ne+(ne-Ke),ie=De*B/T*P,re=Me*B/T*P;W.projectionMatrix.makePerspective(Q,ee,ie,re,P,T),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function Y(W,$){$===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices($.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;A.texture!==null&&(W.near=A.depthNear,W.far=A.depthFar),_.near=R.near=y.near=W.near,_.far=R.far=y.far=W.far,(I!==_.near||L!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),I=_.near,L=_.far,y.near=I,y.far=L,R.near=I,R.far=L,y.updateProjectionMatrix(),R.updateProjectionMatrix(),W.updateProjectionMatrix());const $=W.parent,se=_.cameras;Y(_,$);for(let ne=0;ne<se.length;ne++)Y(se[ne],$);se.length===2?k(_,y,R):_.projectionMatrix.copy(y.projectionMatrix),J(W,_,$)};function J(W,$,se){se===null?W.matrix.copy($.matrixWorld):(W.matrix.copy(se.matrixWorld),W.matrix.invert(),W.matrix.multiply($.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Fs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=W)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(_)};let de=null;function Re(W,$){if(d=$.getViewerPose(c||o),g=$,d!==null){const se=d.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let ne=!1;se.length!==_.cameras.length&&(_.cameras.length=0,ne=!0);for(let ye=0;ye<se.length;ye++){const Ie=se[ye];let B=null;if(h!==null)B=h.getViewport(Ie);else{const Me=u.getViewSubImage(f,Ie);B=Me.viewport,ye===0&&(e.setRenderTargetTextures(S,Me.colorTexture,f.ignoreDepthValues?void 0:Me.depthStencilTexture),e.setRenderTarget(S))}let De=M[ye];De===void 0&&(De=new Kt,De.layers.enable(ye),De.viewport=new _t,M[ye]=De),De.matrix.fromArray(Ie.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(Ie.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(B.x,B.y,B.width,B.height),ye===0&&(_.matrix.copy(De.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ne===!0&&_.cameras.push(De)}const Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const ye=u.getDepthInformation(se[0]);ye&&ye.isValid&&ye.texture&&A.init(e,ye,i.renderState)}}for(let se=0;se<x.length;se++){const ne=v[se],Ee=x[se];ne!==null&&Ee!==void 0&&Ee.update(ne,$,c||o)}de&&de(W,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const Pe=new md;Pe.setAnimationLoop(Re),this.setAnimationLoop=function(W){de=W},this.dispose=function(){}}}const hi=new fn,v0=new ze;function y0(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,ud(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,S,x,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),d(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&h(p,m,v)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),A(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,S,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Wt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Wt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const S=e.get(m),x=S.envMap,v=S.envMapRotation;x&&(p.envMap.value=x,hi.copy(v),hi.x*=-1,hi.y*=-1,hi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),p.envMapRotation.value.setFromMatrix4(v0.makeRotationFromEuler(hi)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Wt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function A(p,m){const S=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function M0(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const v=x.program;n.uniformBlockBinding(S,v)}function c(S,x){let v=i[S.id];v===void 0&&(g(S),v=d(S),i[S.id]=v,S.addEventListener("dispose",p));const E=x.program;n.updateUBOMapping(S,E);const C=e.render.frame;s[S.id]!==C&&(f(S),s[S.id]=C)}function d(S){const x=u();S.__bindingPointIndex=x;const v=r.createBuffer(),E=S.__size,C=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const x=i[S.id],v=S.uniforms,E=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let C=0,y=v.length;C<y;C++){const R=Array.isArray(v[C])?v[C]:[v[C]];for(let M=0,_=R.length;M<_;M++){const I=R[M];if(h(I,C,M,E)===!0){const L=I.__offset,D=Array.isArray(I.value)?I.value:[I.value];let F=0;for(let z=0;z<D.length;z++){const N=D[z],G=A(N);typeof N=="number"||typeof N=="boolean"?(I.__data[0]=N,r.bufferSubData(r.UNIFORM_BUFFER,L+F,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=0,I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=0,I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=0):(N.toArray(I.__data,F),F+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(S,x,v,E){const C=S.value,y=x+"_"+v;if(E[y]===void 0)return typeof C=="number"||typeof C=="boolean"?E[y]=C:E[y]=C.clone(),!0;{const R=E[y];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return E[y]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function g(S){const x=S.uniforms;let v=0;const E=16;for(let y=0,R=x.length;y<R;y++){const M=Array.isArray(x[y])?x[y]:[x[y]];for(let _=0,I=M.length;_<I;_++){const L=M[_],D=Array.isArray(L.value)?L.value:[L.value];for(let F=0,z=D.length;F<z;F++){const N=D[F],G=A(N),k=v%E;k!==0&&E-k<G.boundary&&(v+=E-k),L.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=G.storage}}}const C=v%E;return C>0&&(v+=E-C),S.__size=v,S.__cache={},this}function A(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){const x=S.target;x.removeEventListener("dispose",p);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class yd{constructor(e={}){const{canvas:t=fh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const h=new Uint32Array(4),g=new Int32Array(4);let A=null,p=null;const m=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this.toneMapping=ti,this.toneMappingExposure=1;const x=this;let v=!1,E=0,C=0,y=null,R=-1,M=null;const _=new _t,I=new _t;let L=null;const D=new je(0);let F=0,z=t.width,N=t.height,G=1,k=null,Y=null;const J=new _t(0,0,z,N),de=new _t(0,0,z,N);let Re=!1;const Pe=new pd;let W=!1,$=!1;const se=new ze,ne=new b,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ye=!1;function Ie(){return y===null?G:1}let B=n;function De(w,H){return t.getContext(w,H)}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ia}`),t.addEventListener("webglcontextlost",Ae,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",Z,!1),B===null){const H="webgl2";if(B=De(H,w),B===null)throw De(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Me,We,fe,Ge,Ne,Te,Ke,P,T,Q,ee,ie,re,Fe,pe,ge,Xe,le,Ce,O,te,oe,we,Oe;function it(){Me=new Fm(B),Me.init(),oe=new vd(B,Me),We=new wm(B,Me,e,oe),fe=new f0(B),Ge=new Um(B),Ne=new Jg,Te=new p0(B,Me,fe,Ne,We,oe,Ge),Ke=new Rm(x),P=new Dm(x),T=new Vh(B),we=new Em(B,T),Q=new Lm(B,T,Ge,we),ee=new Nm(B,Q,T,Ge),Ce=new Om(B,We,Te),ge=new bm(Ne),ie=new $g(x,Ke,P,Me,We,we,ge),re=new y0(x,Ne),Fe=new t0,pe=new a0(Me),le=new Cm(x,Ke,P,fe,ee,f,l),Xe=new h0(x,ee,We),Oe=new M0(B,Ge,We,fe),O=new Tm(B,Me,Ge),te=new Bm(B,Me,Ge),Ge.programs=ie.programs,x.capabilities=We,x.extensions=Me,x.properties=Ne,x.renderLists=Fe,x.shadowMap=Xe,x.state=fe,x.info=Ge}it();const U=new _0(x,B);this.xr=U,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const w=Me.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Me.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(z,N,!1))},this.getSize=function(w){return w.set(z,N)},this.setSize=function(w,H,X=!0){if(U.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=w,N=H,t.width=Math.floor(w*G),t.height=Math.floor(H*G),X===!0&&(t.style.width=w+"px",t.style.height=H+"px"),this.setViewport(0,0,w,H)},this.getDrawingBufferSize=function(w){return w.set(z*G,N*G).floor()},this.setDrawingBufferSize=function(w,H,X){z=w,N=H,G=X,t.width=Math.floor(w*X),t.height=Math.floor(H*X),this.setViewport(0,0,w,H)},this.getCurrentViewport=function(w){return w.copy(_)},this.getViewport=function(w){return w.copy(J)},this.setViewport=function(w,H,X,q){w.isVector4?J.set(w.x,w.y,w.z,w.w):J.set(w,H,X,q),fe.viewport(_.copy(J).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(de)},this.setScissor=function(w,H,X,q){w.isVector4?de.set(w.x,w.y,w.z,w.w):de.set(w,H,X,q),fe.scissor(I.copy(de).multiplyScalar(G).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(w){fe.setScissorTest(Re=w)},this.setOpaqueSort=function(w){k=w},this.setTransparentSort=function(w){Y=w},this.getClearColor=function(w){return w.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor.apply(le,arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha.apply(le,arguments)},this.clear=function(w=!0,H=!0,X=!0){let q=0;if(w){let V=!1;if(y!==null){const ue=y.texture.format;V=ue===Cs||ue===nd||ue===sa}if(V){const ue=y.texture.type,Se=ue===Hn||ue===un||ue===Er||ue===ls||ue===ed||ue===td,ve=le.getClearColor(),be=le.getClearAlpha(),He=ve.r,Ve=ve.g,Ue=ve.b;Se?(h[0]=He,h[1]=Ve,h[2]=Ue,h[3]=be,B.clearBufferuiv(B.COLOR,0,h)):(g[0]=He,g[1]=Ve,g[2]=Ue,g[3]=be,B.clearBufferiv(B.COLOR,0,g))}else q|=B.COLOR_BUFFER_BIT}H&&(q|=B.DEPTH_BUFFER_BIT),X&&(q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ae,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),Fe.dispose(),pe.dispose(),Ne.dispose(),Ke.dispose(),P.dispose(),ee.dispose(),we.dispose(),Oe.dispose(),ie.dispose(),U.dispose(),U.removeEventListener("sessionstart",pn),U.removeEventListener("sessionend",mn),ri.stop()};function Ae(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const w=Ge.autoReset,H=Xe.enabled,X=Xe.autoUpdate,q=Xe.needsUpdate,V=Xe.type;it(),Ge.autoReset=w,Xe.enabled=H,Xe.autoUpdate=X,Xe.needsUpdate=q,Xe.type=V}function Z(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ae(w){const H=w.target;H.removeEventListener("dispose",ae),Be(H)}function Be(w){Qe(w),Ne.remove(w)}function Qe(w){const H=Ne.get(w).programs;H!==void 0&&(H.forEach(function(X){ie.releaseProgram(X)}),w.isShaderMaterial&&ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,H,X,q,V,ue){H===null&&(H=Ee);const Se=V.isMesh&&V.matrixWorld.determinant()<0,ve=kd(w,H,X,q,V);fe.setMaterial(q,Se);let be=X.index,He=1;if(q.wireframe===!0){if(be=Q.getWireframeAttribute(X),be===void 0)return;He=2}const Ve=X.drawRange,Ue=X.attributes.position;let Ze=Ve.start*He,pt=(Ve.start+Ve.count)*He;ue!==null&&(Ze=Math.max(Ze,ue.start*He),pt=Math.min(pt,(ue.start+ue.count)*He)),be!==null?(Ze=Math.max(Ze,0),pt=Math.min(pt,be.count)):Ue!=null&&(Ze=Math.max(Ze,0),pt=Math.min(pt,Ue.count));const mt=pt-Ze;if(mt<0||mt===1/0)return;we.setup(V,q,ve,X,be);let qt,Je=O;if(be!==null&&(qt=T.get(be),Je=te,Je.setIndex(qt)),V.isMesh)q.wireframe===!0?(fe.setLineWidth(q.wireframeLinewidth*Ie()),Je.setMode(B.LINES)):Je.setMode(B.TRIANGLES);else if(V.isLine){let Le=q.linewidth;Le===void 0&&(Le=1),fe.setLineWidth(Le*Ie()),V.isLineSegments?Je.setMode(B.LINES):V.isLineLoop?Je.setMode(B.LINE_LOOP):Je.setMode(B.LINE_STRIP)}else V.isPoints?Je.setMode(B.POINTS):V.isSprite&&Je.setMode(B.TRIANGLES);if(V.isBatchedMesh)V._multiDrawInstances!==null?Je.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances):Je.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)Je.renderInstances(Ze,mt,V.count);else if(X.isInstancedBufferGeometry){const Le=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Lt=Math.min(X.instanceCount,Le);Je.renderInstances(Ze,mt,Lt)}else Je.render(Ze,mt)};function at(w,H,X){w.transparent===!0&&w.side===nn&&w.forceSinglePass===!1?(w.side=Wt,w.needsUpdate=!0,Gs(w,H,X),w.side=yn,w.needsUpdate=!0,Gs(w,H,X),w.side=nn):Gs(w,H,X)}this.compile=function(w,H,X=null){X===null&&(X=w),p=pe.get(X),p.init(H),S.push(p),X.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),w!==X&&w.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const q=new Set;return w.traverse(function(V){const ue=V.material;if(ue)if(Array.isArray(ue))for(let Se=0;Se<ue.length;Se++){const ve=ue[Se];at(ve,X,V),q.add(ve)}else at(ue,X,V),q.add(ue)}),S.pop(),p=null,q},this.compileAsync=function(w,H,X=null){const q=this.compile(w,H,X);return new Promise(V=>{function ue(){if(q.forEach(function(Se){Ne.get(Se).currentProgram.isReady()&&q.delete(Se)}),q.size===0){V(w);return}setTimeout(ue,10)}Me.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let ht=null;function st(w){ht&&ht(w)}function pn(){ri.stop()}function mn(){ri.start()}const ri=new md;ri.setAnimationLoop(st),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(w){ht=w,U.setAnimationLoop(w),w===null?ri.stop():ri.start()},U.addEventListener("sessionstart",pn),U.addEventListener("sessionend",mn),this.render=function(w,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(U.cameraAutoUpdate===!0&&U.updateCamera(H),H=U.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,H,y),p=pe.get(w,S.length),p.init(H),S.push(p),se.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Pe.setFromProjectionMatrix(se),$=this.localClippingEnabled,W=ge.init(this.clippingPlanes,$),A=Fe.get(w,m.length),A.init(),m.push(A),U.enabled===!0&&U.isPresenting===!0){const ue=x.xr.getDepthSensingMesh();ue!==null&&qr(ue,H,-1/0,x.sortObjects)}qr(w,H,0,x.sortObjects),A.finish(),x.sortObjects===!0&&A.sort(k,Y),ye=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,ye&&le.addToRenderList(A,w),this.info.render.frame++,W===!0&&ge.beginShadows();const X=p.state.shadowsArray;Xe.render(X,w,H),W===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=A.opaque,V=A.transmissive;if(p.setupLights(),H.isArrayCamera){const ue=H.cameras;if(V.length>0)for(let Se=0,ve=ue.length;Se<ve;Se++){const be=ue[Se];Da(q,V,w,be)}ye&&le.render(w);for(let Se=0,ve=ue.length;Se<ve;Se++){const be=ue[Se];Pa(A,w,be,be.viewport)}}else V.length>0&&Da(q,V,w,H),ye&&le.render(w),Pa(A,w,H);y!==null&&(Te.updateMultisampleRenderTarget(y),Te.updateRenderTargetMipmap(y)),w.isScene===!0&&w.onAfterRender(x,w,H),we.resetDefaultState(),R=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],W===!0&&ge.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?A=m[m.length-1]:A=null};function qr(w,H,X,q){if(w.visible===!1)return;if(w.layers.test(H.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(H);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Pe.intersectsSprite(w)){q&&ne.setFromMatrixPosition(w.matrixWorld).applyMatrix4(se);const Se=ee.update(w),ve=w.material;ve.visible&&A.push(w,Se,ve,X,ne.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Pe.intersectsObject(w))){const Se=ee.update(w),ve=w.material;if(q&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ne.copy(w.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),ne.copy(Se.boundingSphere.center)),ne.applyMatrix4(w.matrixWorld).applyMatrix4(se)),Array.isArray(ve)){const be=Se.groups;for(let He=0,Ve=be.length;He<Ve;He++){const Ue=be[He],Ze=ve[Ue.materialIndex];Ze&&Ze.visible&&A.push(w,Se,Ze,X,ne.z,Ue)}}else ve.visible&&A.push(w,Se,ve,X,ne.z,null)}}const ue=w.children;for(let Se=0,ve=ue.length;Se<ve;Se++)qr(ue[Se],H,X,q)}function Pa(w,H,X,q){const V=w.opaque,ue=w.transmissive,Se=w.transparent;p.setupLightsView(X),W===!0&&ge.setGlobalState(x.clippingPlanes,X),q&&fe.viewport(_.copy(q)),V.length>0&&Vs(V,H,X),ue.length>0&&Vs(ue,H,X),Se.length>0&&Vs(Se,H,X),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Da(w,H,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new ii(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float")?zs:Hn,minFilter:xi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ue=p.state.transmissionRenderTarget[q.id],Se=q.viewport||_;ue.setSize(Se.z,Se.w);const ve=x.getRenderTarget();x.setRenderTarget(ue),x.getClearColor(D),F=x.getClearAlpha(),F<1&&x.setClearColor(16777215,.5),ye?le.render(X):x.clear();const be=x.toneMapping;x.toneMapping=ti;const He=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),W===!0&&ge.setGlobalState(x.clippingPlanes,q),Vs(w,X,q),Te.updateMultisampleRenderTarget(ue),Te.updateRenderTargetMipmap(ue),Me.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Ue=0,Ze=H.length;Ue<Ze;Ue++){const pt=H[Ue],mt=pt.object,qt=pt.geometry,Je=pt.material,Le=pt.group;if(Je.side===nn&&mt.layers.test(q.layers)){const Lt=Je.side;Je.side=Wt,Je.needsUpdate=!0,Fa(mt,X,q,qt,Je,Le),Je.side=Lt,Je.needsUpdate=!0,Ve=!0}}Ve===!0&&(Te.updateMultisampleRenderTarget(ue),Te.updateRenderTargetMipmap(ue))}x.setRenderTarget(ve),x.setClearColor(D,F),He!==void 0&&(q.viewport=He),x.toneMapping=be}function Vs(w,H,X){const q=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ue=w.length;V<ue;V++){const Se=w[V],ve=Se.object,be=Se.geometry,He=q===null?Se.material:q,Ve=Se.group;ve.layers.test(X.layers)&&Fa(ve,H,X,be,He,Ve)}}function Fa(w,H,X,q,V,ue){w.onBeforeRender(x,H,X,q,V,ue),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(x,H,X,q,w,ue),V.transparent===!0&&V.side===nn&&V.forceSinglePass===!1?(V.side=Wt,V.needsUpdate=!0,x.renderBufferDirect(X,H,q,V,w,ue),V.side=yn,V.needsUpdate=!0,x.renderBufferDirect(X,H,q,V,w,ue),V.side=nn):x.renderBufferDirect(X,H,q,V,w,ue),w.onAfterRender(x,H,X,q,V,ue)}function Gs(w,H,X){H.isScene!==!0&&(H=Ee);const q=Ne.get(w),V=p.state.lights,ue=p.state.shadowsArray,Se=V.state.version,ve=ie.getParameters(w,V.state,ue,H,X),be=ie.getProgramCacheKey(ve);let He=q.programs;q.environment=w.isMeshStandardMaterial?H.environment:null,q.fog=H.fog,q.envMap=(w.isMeshStandardMaterial?P:Ke).get(w.envMap||q.environment),q.envMapRotation=q.environment!==null&&w.envMap===null?H.environmentRotation:w.envMapRotation,He===void 0&&(w.addEventListener("dispose",ae),He=new Map,q.programs=He);let Ve=He.get(be);if(Ve!==void 0){if(q.currentProgram===Ve&&q.lightsStateVersion===Se)return Ba(w,ve),Ve}else ve.uniforms=ie.getUniforms(w),w.onBuild(X,ve,x),w.onBeforeCompile(ve,x),Ve=ie.acquireProgram(ve,be),He.set(be,Ve),q.uniforms=ve.uniforms;const Ue=q.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ue.clippingPlanes=ge.uniform),Ba(w,ve),q.needsLights=Gd(w),q.lightsStateVersion=Se,q.needsLights&&(Ue.ambientLightColor.value=V.state.ambient,Ue.lightProbe.value=V.state.probe,Ue.directionalLights.value=V.state.directional,Ue.directionalLightShadows.value=V.state.directionalShadow,Ue.spotLights.value=V.state.spot,Ue.spotLightShadows.value=V.state.spotShadow,Ue.rectAreaLights.value=V.state.rectArea,Ue.ltc_1.value=V.state.rectAreaLTC1,Ue.ltc_2.value=V.state.rectAreaLTC2,Ue.pointLights.value=V.state.point,Ue.pointLightShadows.value=V.state.pointShadow,Ue.hemisphereLights.value=V.state.hemi,Ue.directionalShadowMap.value=V.state.directionalShadowMap,Ue.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ue.spotShadowMap.value=V.state.spotShadowMap,Ue.spotLightMatrix.value=V.state.spotLightMatrix,Ue.spotLightMap.value=V.state.spotLightMap,Ue.pointShadowMap.value=V.state.pointShadowMap,Ue.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Ve,q.uniformsList=null,Ve}function La(w){if(w.uniformsList===null){const H=w.currentProgram.getUniforms();w.uniformsList=Mr.seqWithValue(H.seq,w.uniforms)}return w.uniformsList}function Ba(w,H){const X=Ne.get(w);X.outputColorSpace=H.outputColorSpace,X.batching=H.batching,X.batchingColor=H.batchingColor,X.instancing=H.instancing,X.instancingColor=H.instancingColor,X.instancingMorph=H.instancingMorph,X.skinning=H.skinning,X.morphTargets=H.morphTargets,X.morphNormals=H.morphNormals,X.morphColors=H.morphColors,X.morphTargetsCount=H.morphTargetsCount,X.numClippingPlanes=H.numClippingPlanes,X.numIntersection=H.numClipIntersection,X.vertexAlphas=H.vertexAlphas,X.vertexTangents=H.vertexTangents,X.toneMapping=H.toneMapping}function kd(w,H,X,q,V){H.isScene!==!0&&(H=Ee),Te.resetTextureUnits();const ue=H.fog,Se=q.isMeshStandardMaterial?H.environment:null,ve=y===null?x.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:si,be=(q.isMeshStandardMaterial?P:Ke).get(q.envMap||Se),He=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ve=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ue=!!X.morphAttributes.position,Ze=!!X.morphAttributes.normal,pt=!!X.morphAttributes.color;let mt=ti;q.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(mt=x.toneMapping);const qt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Je=qt!==void 0?qt.length:0,Le=Ne.get(q),Lt=p.state.lights;if(W===!0&&($===!0||w!==M)){const Jt=w===M&&q.id===R;ge.setState(q,w,Jt)}let rt=!1;q.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==Lt.state.version||Le.outputColorSpace!==ve||V.isBatchedMesh&&Le.batching===!1||!V.isBatchedMesh&&Le.batching===!0||V.isBatchedMesh&&Le.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Le.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Le.instancing===!1||!V.isInstancedMesh&&Le.instancing===!0||V.isSkinnedMesh&&Le.skinning===!1||!V.isSkinnedMesh&&Le.skinning===!0||V.isInstancedMesh&&Le.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Le.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Le.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Le.instancingMorph===!1&&V.morphTexture!==null||Le.envMap!==be||q.fog===!0&&Le.fog!==ue||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ge.numPlanes||Le.numIntersection!==ge.numIntersection)||Le.vertexAlphas!==He||Le.vertexTangents!==Ve||Le.morphTargets!==Ue||Le.morphNormals!==Ze||Le.morphColors!==pt||Le.toneMapping!==mt||Le.morphTargetsCount!==Je)&&(rt=!0):(rt=!0,Le.__version=q.version);let Mn=Le.currentProgram;rt===!0&&(Mn=Gs(q,H,V));let Ws=!1,oi=!1,Qr=!1;const Tt=Mn.getUniforms(),kn=Le.uniforms;if(fe.useProgram(Mn.program)&&(Ws=!0,oi=!0,Qr=!0),q.id!==R&&(R=q.id,oi=!0),Ws||M!==w){Tt.setValue(B,"projectionMatrix",w.projectionMatrix),Tt.setValue(B,"viewMatrix",w.matrixWorldInverse);const Jt=Tt.map.cameraPosition;Jt!==void 0&&Jt.setValue(B,ne.setFromMatrixPosition(w.matrixWorld)),We.logarithmicDepthBuffer&&Tt.setValue(B,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Tt.setValue(B,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,oi=!0,Qr=!0)}if(V.isSkinnedMesh){Tt.setOptional(B,V,"bindMatrix"),Tt.setOptional(B,V,"bindMatrixInverse");const Jt=V.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),Tt.setValue(B,"boneTexture",Jt.boneTexture,Te))}V.isBatchedMesh&&(Tt.setOptional(B,V,"batchingTexture"),Tt.setValue(B,"batchingTexture",V._matricesTexture,Te),Tt.setOptional(B,V,"batchingColorTexture"),V._colorsTexture!==null&&Tt.setValue(B,"batchingColorTexture",V._colorsTexture,Te));const Yr=X.morphAttributes;if((Yr.position!==void 0||Yr.normal!==void 0||Yr.color!==void 0)&&Ce.update(V,X,Mn),(oi||Le.receiveShadow!==V.receiveShadow)&&(Le.receiveShadow=V.receiveShadow,Tt.setValue(B,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(kn.envMap.value=be,kn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&H.environment!==null&&(kn.envMapIntensity.value=H.environmentIntensity),oi&&(Tt.setValue(B,"toneMappingExposure",x.toneMappingExposure),Le.needsLights&&Vd(kn,Qr),ue&&q.fog===!0&&re.refreshFogUniforms(kn,ue),re.refreshMaterialUniforms(kn,q,G,N,p.state.transmissionRenderTarget[w.id]),Mr.upload(B,La(Le),kn,Te)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Mr.upload(B,La(Le),kn,Te),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Tt.setValue(B,"center",V.center),Tt.setValue(B,"modelViewMatrix",V.modelViewMatrix),Tt.setValue(B,"normalMatrix",V.normalMatrix),Tt.setValue(B,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Jt=q.uniformsGroups;for(let Kr=0,Wd=Jt.length;Kr<Wd;Kr++){const Ua=Jt[Kr];Oe.update(Ua,Mn),Oe.bind(Ua,Mn)}}return Mn}function Vd(w,H){w.ambientLightColor.needsUpdate=H,w.lightProbe.needsUpdate=H,w.directionalLights.needsUpdate=H,w.directionalLightShadows.needsUpdate=H,w.pointLights.needsUpdate=H,w.pointLightShadows.needsUpdate=H,w.spotLights.needsUpdate=H,w.spotLightShadows.needsUpdate=H,w.rectAreaLights.needsUpdate=H,w.hemisphereLights.needsUpdate=H}function Gd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(w,H,X){Ne.get(w.texture).__webglTexture=H,Ne.get(w.depthTexture).__webglTexture=X;const q=Ne.get(w);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,H){const X=Ne.get(w);X.__webglFramebuffer=H,X.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(w,H=0,X=0){y=w,E=H,C=X;let q=!0,V=null,ue=!1,Se=!1;if(w){const be=Ne.get(w);be.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(B.FRAMEBUFFER,null),q=!1):be.__webglFramebuffer===void 0?Te.setupRenderTarget(w):be.__hasExternalTextures&&Te.rebindTextures(w,Ne.get(w.texture).__webglTexture,Ne.get(w.depthTexture).__webglTexture);const He=w.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Se=!0);const Ve=Ne.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ve[H])?V=Ve[H][X]:V=Ve[H],ue=!0):w.samples>0&&Te.useMultisampledRTT(w)===!1?V=Ne.get(w).__webglMultisampledFramebuffer:Array.isArray(Ve)?V=Ve[X]:V=Ve,_.copy(w.viewport),I.copy(w.scissor),L=w.scissorTest}else _.copy(J).multiplyScalar(G).floor(),I.copy(de).multiplyScalar(G).floor(),L=Re;if(fe.bindFramebuffer(B.FRAMEBUFFER,V)&&q&&fe.drawBuffers(w,V),fe.viewport(_),fe.scissor(I),fe.setScissorTest(L),ue){const be=Ne.get(w.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+H,be.__webglTexture,X)}else if(Se){const be=Ne.get(w.texture),He=H||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,be.__webglTexture,X||0,He)}R=-1},this.readRenderTargetPixels=function(w,H,X,q,V,ue,Se){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se]),ve){fe.bindFramebuffer(B.FRAMEBUFFER,ve);try{const be=w.texture,He=be.format,Ve=be.type;if(!We.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=w.width-q&&X>=0&&X<=w.height-V&&B.readPixels(H,X,q,V,oe.convert(He),oe.convert(Ve),ue)}finally{const be=y!==null?Ne.get(y).__webglFramebuffer:null;fe.bindFramebuffer(B.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(w,H,X,q,V,ue,Se){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se]),ve){fe.bindFramebuffer(B.FRAMEBUFFER,ve);try{const be=w.texture,He=be.format,Ve=be.type;if(!We.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=w.width-q&&X>=0&&X<=w.height-V){const Ue=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ue),B.bufferData(B.PIXEL_PACK_BUFFER,ue.byteLength,B.STREAM_READ),B.readPixels(H,X,q,V,oe.convert(He),oe.convert(Ve),0),B.flush();const Ze=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);await ph(B,Ze,4);try{B.bindBuffer(B.PIXEL_PACK_BUFFER,Ue),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ue)}finally{B.deleteBuffer(Ue),B.deleteSync(Ze)}return ue}}finally{const be=y!==null?Ne.get(y).__webglFramebuffer:null;fe.bindFramebuffer(B.FRAMEBUFFER,be)}}},this.copyFramebufferToTexture=function(w,H=null,X=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,w=arguments[1]);const q=Math.pow(2,-X),V=Math.floor(w.image.width*q),ue=Math.floor(w.image.height*q),Se=H!==null?H.x:0,ve=H!==null?H.y:0;Te.setTexture2D(w,0),B.copyTexSubImage2D(B.TEXTURE_2D,X,0,0,Se,ve,V,ue),fe.unbindTexture()},this.copyTextureToTexture=function(w,H,X=null,q=null,V=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,w=arguments[1],H=arguments[2],V=arguments[3]||0,X=null);let ue,Se,ve,be,He,Ve;X!==null?(ue=X.max.x-X.min.x,Se=X.max.y-X.min.y,ve=X.min.x,be=X.min.y):(ue=w.image.width,Se=w.image.height,ve=0,be=0),q!==null?(He=q.x,Ve=q.y):(He=0,Ve=0);const Ue=oe.convert(H.format),Ze=oe.convert(H.type);Te.setTexture2D(H,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const pt=B.getParameter(B.UNPACK_ROW_LENGTH),mt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),qt=B.getParameter(B.UNPACK_SKIP_PIXELS),Je=B.getParameter(B.UNPACK_SKIP_ROWS),Le=B.getParameter(B.UNPACK_SKIP_IMAGES),Lt=w.isCompressedTexture?w.mipmaps[V]:w.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,Lt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Lt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,ve),B.pixelStorei(B.UNPACK_SKIP_ROWS,be),w.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,V,He,Ve,ue,Se,Ue,Ze,Lt.data):w.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,V,He,Ve,Lt.width,Lt.height,Ue,Lt.data):B.texSubImage2D(B.TEXTURE_2D,V,He,Ve,Ue,Ze,Lt),B.pixelStorei(B.UNPACK_ROW_LENGTH,pt),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,mt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,qt),B.pixelStorei(B.UNPACK_SKIP_ROWS,Je),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Le),V===0&&H.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(w,H,X=null,q=null,V=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,w=arguments[2],H=arguments[3],V=arguments[4]||0);let ue,Se,ve,be,He,Ve,Ue,Ze,pt;const mt=w.isCompressedTexture?w.mipmaps[V]:w.image;X!==null?(ue=X.max.x-X.min.x,Se=X.max.y-X.min.y,ve=X.max.z-X.min.z,be=X.min.x,He=X.min.y,Ve=X.min.z):(ue=mt.width,Se=mt.height,ve=mt.depth,be=0,He=0,Ve=0),q!==null?(Ue=q.x,Ze=q.y,pt=q.z):(Ue=0,Ze=0,pt=0);const qt=oe.convert(H.format),Je=oe.convert(H.type);let Le;if(H.isData3DTexture)Te.setTexture3D(H,0),Le=B.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)Te.setTexture2DArray(H,0),Le=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const Lt=B.getParameter(B.UNPACK_ROW_LENGTH),rt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Mn=B.getParameter(B.UNPACK_SKIP_PIXELS),Ws=B.getParameter(B.UNPACK_SKIP_ROWS),oi=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,mt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,mt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,be),B.pixelStorei(B.UNPACK_SKIP_ROWS,He),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Ve),w.isDataTexture||w.isData3DTexture?B.texSubImage3D(Le,V,Ue,Ze,pt,ue,Se,ve,qt,Je,mt.data):H.isCompressedArrayTexture?B.compressedTexSubImage3D(Le,V,Ue,Ze,pt,ue,Se,ve,qt,mt.data):B.texSubImage3D(Le,V,Ue,Ze,pt,ue,Se,ve,qt,Je,mt),B.pixelStorei(B.UNPACK_ROW_LENGTH,Lt),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,rt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Mn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ws),B.pixelStorei(B.UNPACK_SKIP_IMAGES,oi),V===0&&H.generateMipmaps&&B.generateMipmap(Le),fe.unbindTexture()},this.initRenderTarget=function(w){Ne.get(w).__webglFramebuffer===void 0&&Te.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Te.setTextureCube(w,0):w.isData3DTexture?Te.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Te.setTexture2DArray(w,0):Te.setTexture2D(w,0),fe.unbindTexture()},this.resetState=function(){E=0,C=0,y=null,fe.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ra?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===kr?"display-p3":"srgb"}}class C0 extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Yn extends zt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Vt,d=Vt,u,f){super(null,o,a,l,c,d,i,s,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class E0 extends sn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}class Bs extends rn{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const d=[],u=[],f=[],h=[];let g=0;const A=[],p=n/2;let m=0;S(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new Zt(u,3)),this.setAttribute("normal",new Zt(f,3)),this.setAttribute("uv",new Zt(h,2));function S(){const v=new b,E=new b;let C=0;const y=(t-e)/n;for(let R=0;R<=s;R++){const M=[],_=R/s,I=_*(t-e)+e;for(let L=0;L<=i;L++){const D=L/i,F=D*l+a,z=Math.sin(F),N=Math.cos(F);E.x=I*z,E.y=-_*n+p,E.z=I*N,u.push(E.x,E.y,E.z),v.set(z,y,N).normalize(),f.push(v.x,v.y,v.z),h.push(D,1-_),M.push(g++)}A.push(M)}for(let R=0;R<i;R++)for(let M=0;M<s;M++){const _=A[M][R],I=A[M+1][R],L=A[M+1][R+1],D=A[M][R+1];d.push(_,I,D),d.push(I,L,D),C+=6}c.addGroup(m,C,0),m+=C}function x(v){const E=g,C=new xe,y=new b;let R=0;const M=v===!0?e:t,_=v===!0?1:-1;for(let L=1;L<=i;L++)u.push(0,p*_,0),f.push(0,_,0),h.push(.5,.5),g++;const I=g;for(let L=0;L<=i;L++){const F=L/i*l+a,z=Math.cos(F),N=Math.sin(F);y.x=M*N,y.y=p*_,y.z=M*z,u.push(y.x,y.y,y.z),f.push(0,_,0),C.x=z*.5+.5,C.y=N*.5*_+.5,h.push(C.x,C.y),g++}for(let L=0;L<i;L++){const D=E+L,F=I+L;v===!0?d.push(F,F+1,D):d.push(F+1,F,D),R+=3}c.addGroup(m,R,v===!0?1:2),m+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fa extends Bs{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new fa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pr extends rn{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const d=[],u=new b,f=new b,h=[],g=[],A=[],p=[];for(let m=0;m<=n;m++){const S=[],x=m/n;let v=0;m===0&&o===0?v=.5/t:m===n&&l===Math.PI&&(v=-.5/t);for(let E=0;E<=t;E++){const C=E/t;u.x=-e*Math.cos(i+C*s)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+C*s)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),A.push(f.x,f.y,f.z),p.push(C+v,1-x),S.push(c++)}d.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const x=d[m][S+1],v=d[m][S],E=d[m+1][S],C=d[m+1][S+1];(m!==0||o>0)&&h.push(x,v,C),(m!==n-1||l<Math.PI)&&h.push(v,E,C)}this.setIndex(h),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(A,3)),this.setAttribute("uv",new Zt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class T0 extends rn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const sc=new ze;let w0=class{constructor(e,t,n=0,i=1/0){this.ray=new la(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return sc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sc),this}intersectObject(e,t=!0,n=[]){return Ko(e,this,n,t),n.sort(rc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ko(e[i],this,n,t);return n.sort(rc),n}};function rc(r,e){return r.distance-e.distance}function Ko(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)Ko(s[o],e,t,!0)}}class oc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(It(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ia}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ia);const Ai=class Ai{constructor(e,t){let n,i;this.promise=new Promise((c,d)=>{n=c,i=d});const s=n.bind(this),o=i.bind(this),a=(...c)=>{s(...c)},l=c=>{o(c)};e(a.bind(this),l.bind(this)),this.abortHandler=t,this.id=Ai.idGen++}then(e){return new Ai((t,n)=>{this.promise=this.promise.then((...i)=>{const s=e(...i);s instanceof Promise||s instanceof Ai?s.then((...o)=>{t(...o)}):t(s)}).catch(i=>{n(i)})},this.abortHandler)}catch(e){return new Ai(t=>{this.promise=this.promise.then((...n)=>{t(...n)}).catch(e)},this.abortHandler)}abort(e){this.abortHandler&&this.abortHandler(e)}};ce(Ai,"idGen",0);let Us=Ai;class Md extends Error{constructor(e){super(e)}}(function(){const r=new Float32Array(1),e=new Int32Array(r.buffer);return function(t){r[0]=t;const n=e[0];let i=n>>16&32768,s=n>>12&2047;const o=n>>23&255;return o<103?i:o>142?(i|=31744,i|=(o==255?0:1)&&n&8388607,i):o<113?(s|=2048,i|=(s>>114-o)+(s>>113-o&1),i):(i|=o-112<<10|s>>1,i+=s&1,i)}})();const bo=function(){const r=new Float32Array(1),e=new Int32Array(r.buffer);return function(t){return r[0]=t,e[0]}}(),b0=function(r,e){return r[e]+(r[e+1]<<8)+(r[e+2]<<16)+(r[e+3]<<24)},Wr=function(r,e,t=!0,n){const i=new AbortController,s=i.signal;let o=!1;const a=d=>{i.abort(d),o=!0};let l=!1;const c=(d,u,f,h)=>{e&&!l&&(e(d,u,f,h),d===100&&(l=!0))};return new Us((d,u)=>{const f={signal:s};n&&(f.headers=n),fetch(r,f).then(async h=>{if(!h.ok){const x=await h.text();u(new Error(`Fetch failed: ${h.status} ${h.statusText} ${x}`));return}const g=h.body.getReader();let A=0,p=h.headers.get("Content-Length"),m=p?parseInt(p):void 0;const S=[];for(;!o;)try{const{value:x,done:v}=await g.read();if(v){if(c(100,"100%",x,m),t){const y=new Blob(S).arrayBuffer();d(y)}else d();break}A+=x.length;let E,C;m!==void 0&&(E=A/m*100,C=`${E.toFixed(2)}%`),t&&S.push(x),c(E,C,x,m)}catch(x){u(x);return}}).catch(h=>{u(new Md(h))})},a)},ut=function(r,e,t){return Math.max(Math.min(r,t),e)},Wi=function(){return performance.now()/1e3},Yi=r=>{if(r.geometry&&(r.geometry.dispose(),r.geometry=null),r.material&&(r.material.dispose(),r.material=null),r.children)for(let e of r.children)Yi(e)},jt=(r,e)=>new Promise(t=>{window.setTimeout(()=>{t(r?r():void 0)},e?1:50)}),Ji=(r=0)=>{let e=0;if(r===1)e=9;else if(r===2)e=24;else if(r===3)e=45;else if(r>3)throw new Error("getSphericalHarmonicsComponentCountForDegree() -> Invalid spherical harmonics degree");return e},pa=()=>{let r,e;return{promise:new Promise((n,i)=>{r=n,e=i}),resolve:r,reject:e}},Ro=r=>{let e,t;return r||(r=()=>{}),{promise:new Us((i,s)=>{e=i,t=s},r),resolve:e,reject:t}};class R0{constructor(e,t,n){this.major=e,this.minor=t,this.patch=n}toString(){return`${this.major}_${this.minor}_${this.patch}`}}function ma(){const r=navigator.userAgent;return r.indexOf("iPhone")>0||r.indexOf("iPad")>0}function Cd(){if(ma()){const r=navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);return new R0(parseInt(r[1]||0,10),parseInt(r[2]||0,10),parseInt(r[3]||0,10))}else return null}const I0=14,Is=class Is{constructor(e=0){this.sphericalHarmonicsDegree=e,this.sphericalHarmonicsCount=Ji(this.sphericalHarmonicsDegree),this.componentCount=this.sphericalHarmonicsCount+I0,this.defaultSphericalHarmonics=new Array(this.sphericalHarmonicsCount).fill(0),this.splats=[],this.splatCount=0}static createSplat(e=0){const t=[0,0,0,1,1,1,1,0,0,0,0,0,0,0];let n=Ji(e);for(let i=0;i<n;i++)t.push(0);return t}addSplat(e){this.splats.push(e),this.splatCount++}getSplat(e){return this.splats[e]}addDefaultSplat(){const e=Is.createSplat(this.sphericalHarmonicsDegree);return this.addSplat(e),e}addSplatFromComonents(e,t,n,i,s,o,a,l,c,d,u,f,h,g,...A){const p=[e,t,n,i,s,o,a,l,c,d,u,f,h,g,...this.defaultSphericalHarmonics];for(let m=0;m<A.length&&m<this.sphericalHarmonicsCount;m++)p[m]=A[m];return this.addSplat(p),p}addSplatFromArray(e,t){const n=e.splats[t],i=Is.createSplat(this.sphericalHarmonicsDegree);for(let s=0;s<this.componentCount&&s<n.length;s++)i[s]=n[s];this.addSplat(i)}};ce(Is,"OFFSET",{X:0,Y:1,Z:2,SCALE0:3,SCALE1:4,SCALE2:5,ROTATION0:6,ROTATION1:7,ROTATION2:8,ROTATION3:9,FDC0:10,FDC1:11,FDC2:12,OPACITY:13,FRC0:14,FRC1:15,FRC2:16,FRC3:17,FRC4:18,FRC5:19,FRC6:20,FRC7:21,FRC8:22,FRC9:23,FRC10:24,FRC11:25,FRC12:26,FRC13:27,FRC14:28,FRC15:29,FRC16:30,FRC17:31,FRC18:32,FRC19:33,FRC20:34,FRC21:35,FRC22:36,FRC23:37});let he=Is;class Ye{}ce(Ye,"DefaultSplatSortDistanceMapPrecision",16),ce(Ye,"MemoryPageSize",65536),ce(Ye,"BytesPerFloat",4),ce(Ye,"BytesPerInt",4),ce(Ye,"MaxScenes",32),ce(Ye,"ProgressiveLoadSectionSize",262144),ce(Ye,"ProgressiveLoadSectionDelayDuration",15),ce(Ye,"SphericalHarmonics8BitCompressionRange",3);const P0=Ye.SphericalHarmonics8BitCompressionRange,Kn=P0/2,vt=Ls.toHalfFloat.bind(Ls),ga=Ls.fromHalfFloat.bind(Ls),dt=(r,e,t=!1,n,i)=>{if(e===0)return r;if(e===1||e===2&&!t)return Ls.fromHalfFloat(r);if(e===2)return Aa(r,n,i)},ws=(r,e,t)=>{r=ut(r,e,t);const n=t-e;return ut(Math.floor((r-e)/n*255),0,255)},Aa=(r,e,t)=>{const n=t-e;return r/255*n+e},Ed=(r,e,t)=>ws(ga(r,e,t)),D0=(r,e,t)=>vt(Aa(r,e,t)),$e=(r,e,t,n=!1)=>t===0?r.getFloat32(e*4,!0):t===1||t===2&&!n?r.getUint16(e*2,!0):r.getUint8(e,!0),F0=function(){const r=e=>e;return function(e,t,n,i=!1){if(t===n)return e;let s=r;return t===2&&i?n===1?s=D0:n==0&&(s=Aa):t===2||t===1?n===0?s=ga:n==2&&(i?s=Ed:s=r):t===0&&(n===1?s=vt:n==2&&(i?s=ws:s=vt)),s(e)}}(),Xi=(r,e,t,n,i=0)=>{const s=new Uint8Array(r,e),o=new Uint8Array(t,n);for(let a=0;a<i;a++)o[a]=s[a]},K=class K{constructor(e,t=!0){ce(this,"getSplatScaleAndRotation",function(){const e=new ze,t=new ze,n=new ze,i=new b,s=new b,o=new nt;return function(a,l,c,d,u){const f=this.globalSplatIndexToSectionMap[a],h=this.sections[f],g=a-h.splatCountOffset,A=h.bytesPerSplat*g+K.CompressionLevels[this.compressionLevel].ScaleOffsetBytes,p=new DataView(this.bufferData,h.dataBase+A);s.set(dt($e(p,0,this.compressionLevel),this.compressionLevel),dt($e(p,1,this.compressionLevel),this.compressionLevel),dt($e(p,2,this.compressionLevel),this.compressionLevel)),u&&(u.x!==void 0&&(s.x=u.x),u.y!==void 0&&(s.y=u.y),u.z!==void 0&&(s.z=u.z)),o.set(dt($e(p,4,this.compressionLevel),this.compressionLevel),dt($e(p,5,this.compressionLevel),this.compressionLevel),dt($e(p,6,this.compressionLevel),this.compressionLevel),dt($e(p,3,this.compressionLevel),this.compressionLevel)),d?(e.makeScale(s.x,s.y,s.z),t.makeRotationFromQuaternion(o),n.copy(e).multiply(t).multiply(d),n.decompose(i,c,l)):(l.copy(s),c.copy(o))}}());ce(this,"fillSplatScaleRotationArray",function(){const e=new ze,t=new ze,n=new ze,i=new b,s=new nt,o=new b,a=l=>{const c=l.w<0?-1:1;l.x*=c,l.y*=c,l.z*=c,l.w*=c};return function(l,c,d,u,f,h,g,A){const p=this.splatCount;u=u||0,f=f||p-1,h===void 0&&(h=u);const m=(S,x)=>F0(S,x,g);for(let S=u;S<=f;S++){const x=this.globalSplatIndexToSectionMap[S],v=this.sections[x],E=S-v.splatCountOffset,C=v.bytesPerSplat*E+K.CompressionLevels[this.compressionLevel].ScaleOffsetBytes,y=(S-u+h)*K.ScaleComponentCount,R=(S-u+h)*K.RotationComponentCount,M=new DataView(this.bufferData,v.dataBase+C),_=A&&A.x!==void 0?A.x:$e(M,0,this.compressionLevel),I=A&&A.y!==void 0?A.y:$e(M,1,this.compressionLevel),L=A&&A.z!==void 0?A.z:$e(M,2,this.compressionLevel),D=$e(M,3,this.compressionLevel),F=$e(M,4,this.compressionLevel),z=$e(M,5,this.compressionLevel),N=$e(M,6,this.compressionLevel);i.set(dt(_,this.compressionLevel),dt(I,this.compressionLevel),dt(L,this.compressionLevel)),s.set(dt(F,this.compressionLevel),dt(z,this.compressionLevel),dt(N,this.compressionLevel),dt(D,this.compressionLevel)).normalize(),d&&(o.set(0,0,0),e.makeScale(i.x,i.y,i.z),t.makeRotationFromQuaternion(s),n.identity().premultiply(e).premultiply(t),n.premultiply(d),n.decompose(o,s,i),s.normalize()),a(s),l&&(l[y]=m(i.x,0),l[y+1]=m(i.y,0),l[y+2]=m(i.z,0)),c&&(c[R]=m(s.x,0),c[R+1]=m(s.y,0),c[R+2]=m(s.z,0),c[R+3]=m(s.w,0))}}}());ce(this,"fillSphericalHarmonicsArray",function(){for(let F=0;F<15;F++)new b;const e=new ke,t=new ze,n=new b,i=new b,s=new nt,o=[],a=[],l=[],c=[],d=[],u=[],f=[],h=[],g=[],A=[],p=[],m=[],S=[],x=[],v=[],E=[],C=[],y=[],R=F=>F,M=(F,z,N,G)=>{F[0]=z,F[1]=N,F[2]=G},_=(F,z,N,G,k)=>{F[0]=$e(z,G,k,!0),F[1]=$e(z,G+N,k,!0),F[2]=$e(z,G+N+N,k,!0)},I=(F,z)=>{z[0]=F[0],z[1]=F[1],z[2]=F[2]},L=(F,z,N,G)=>{z[N]=G(F[0]),z[N+1]=G(F[1]),z[N+2]=G(F[2])},D=(F,z,N,G,k)=>(z[0]=dt(F[0],N,!0,G,k),z[1]=dt(F[1],N,!0,G,k),z[2]=dt(F[2],N,!0,G,k),z);return function(F,z,N,G,k,Y,J){const de=this.splatCount;G=G||0,k=k||de-1,Y===void 0&&(Y=G),N&&z>=1&&(t.copy(N),t.decompose(n,s,i),s.normalize(),t.makeRotationFromQuaternion(s),e.setFromMatrix4(t),M(o,e.elements[4],-e.elements[7],e.elements[1]),M(a,-e.elements[5],e.elements[8],-e.elements[2]),M(l,e.elements[3],-e.elements[6],e.elements[0]));const Re=W=>Ed(W,this.minSphericalHarmonicsCoeff,this.maxSphericalHarmonicsCoeff),Pe=W=>ws(W,this.minSphericalHarmonicsCoeff,this.maxSphericalHarmonicsCoeff);for(let W=G;W<=k;W++){const $=this.globalSplatIndexToSectionMap[W],se=this.sections[$];z=Math.min(z,se.sphericalHarmonicsDegree);const ne=Ji(z),Ee=W-se.splatCountOffset,ye=se.bytesPerSplat*Ee+K.CompressionLevels[this.compressionLevel].SphericalHarmonicsOffsetBytes,Ie=new DataView(this.bufferData,se.dataBase+ye),B=(W-G+Y)*ne;let De=N?0:this.compressionLevel,Me=R;De!==J&&(De===1?J===0?Me=ga:J==2&&(Me=Re):De===0&&(J===1?Me=vt:J==2&&(Me=Pe)));const We=this.minSphericalHarmonicsCoeff,fe=this.maxSphericalHarmonicsCoeff;z>=1&&(_(g,Ie,3,0,this.compressionLevel),_(A,Ie,3,1,this.compressionLevel),_(p,Ie,3,2,this.compressionLevel),N?(D(g,g,this.compressionLevel,We,fe),D(A,A,this.compressionLevel,We,fe),D(p,p,this.compressionLevel,We,fe),K.rotateSphericalHarmonics3(g,A,p,o,a,l,x,v,E)):(I(g,x),I(A,v),I(p,E)),L(x,F,B,Me),L(v,F,B+3,Me),L(E,F,B+6,Me),z>=2&&(_(g,Ie,5,9,this.compressionLevel),_(A,Ie,5,10,this.compressionLevel),_(p,Ie,5,11,this.compressionLevel),_(m,Ie,5,12,this.compressionLevel),_(S,Ie,5,13,this.compressionLevel),N?(D(g,g,this.compressionLevel,We,fe),D(A,A,this.compressionLevel,We,fe),D(p,p,this.compressionLevel,We,fe),D(m,m,this.compressionLevel,We,fe),D(S,S,this.compressionLevel,We,fe),K.rotateSphericalHarmonics5(g,A,p,m,S,o,a,l,c,d,u,f,h,x,v,E,C,y)):(I(g,x),I(A,v),I(p,E),I(m,C),I(S,y)),L(x,F,B+9,Me),L(v,F,B+12,Me),L(E,F,B+15,Me),L(C,F,B+18,Me),L(y,F,B+21,Me)))}}}());this.constructFromBuffer(e,t)}getSplatCount(){return this.splatCount}getMaxSplatCount(){return this.maxSplatCount}getMinSphericalHarmonicsDegree(){let e=0;for(let t=0;t<this.sections.length;t++){const n=this.sections[t];(t===0||n.sphericalHarmonicsDegree<e)&&(e=n.sphericalHarmonicsDegree)}return e}getBucketIndex(e,t){let n;const i=e.fullBucketCount*e.bucketSize;if(t<i)n=Math.floor(t/e.bucketSize);else{let s=i;n=e.fullBucketCount;let o=0;for(;s<e.splatCount;){let a=e.partiallyFilledBucketLengths[o];if(t>=s&&t<s+a)break;s+=a,n++,o++}}return n}getSplatCenter(e,t,n){const i=this.globalSplatIndexToSectionMap[e],s=this.sections[i],o=e-s.splatCountOffset,a=s.bytesPerSplat*o,l=new DataView(this.bufferData,s.dataBase+a),c=$e(l,0,this.compressionLevel),d=$e(l,1,this.compressionLevel),u=$e(l,2,this.compressionLevel);if(this.compressionLevel>=1){const h=this.getBucketIndex(s,o)*K.BucketStorageSizeFloats,g=s.compressionScaleFactor,A=s.compressionScaleRange;t.x=(c-A)*g+s.bucketArray[h],t.y=(d-A)*g+s.bucketArray[h+1],t.z=(u-A)*g+s.bucketArray[h+2]}else t.x=c,t.y=d,t.z=u;n&&t.applyMatrix4(n)}getSplatColor(e,t){const n=this.globalSplatIndexToSectionMap[e],i=this.sections[n],s=e-i.splatCountOffset,o=i.bytesPerSplat*s+K.CompressionLevels[this.compressionLevel].ColorOffsetBytes,a=new Uint8Array(this.bufferData,i.dataBase+o,4);t.set(a[0],a[1],a[2],a[3])}fillSplatCenterArray(e,t,n,i,s){const o=this.splatCount;n=n||0,i=i||o-1,s===void 0&&(s=n);const a=new b;for(let l=n;l<=i;l++){const c=this.globalSplatIndexToSectionMap[l],d=this.sections[c],u=l-d.splatCountOffset,f=(l-n+s)*K.CenterComponentCount,h=d.bytesPerSplat*u,g=new DataView(this.bufferData,d.dataBase+h),A=$e(g,0,this.compressionLevel),p=$e(g,1,this.compressionLevel),m=$e(g,2,this.compressionLevel);if(this.compressionLevel>=1){const x=this.getBucketIndex(d,u)*K.BucketStorageSizeFloats,v=d.compressionScaleFactor,E=d.compressionScaleRange;a.x=(A-E)*v+d.bucketArray[x],a.y=(p-E)*v+d.bucketArray[x+1],a.z=(m-E)*v+d.bucketArray[x+2]}else a.x=A,a.y=p,a.z=m;t&&a.applyMatrix4(t),e[f]=a.x,e[f+1]=a.y,e[f+2]=a.z}}fillSplatCovarianceArray(e,t,n,i,s,o){const a=this.splatCount,l=new b,c=new nt;n=n||0,i=i||a-1,s===void 0&&(s=n);for(let d=n;d<=i;d++){const u=this.globalSplatIndexToSectionMap[d],f=this.sections[u],h=d-f.splatCountOffset,g=(d-n+s)*K.CovarianceComponentCount,A=f.bytesPerSplat*h+K.CompressionLevels[this.compressionLevel].ScaleOffsetBytes,p=new DataView(this.bufferData,f.dataBase+A);l.set(dt($e(p,0,this.compressionLevel),this.compressionLevel),dt($e(p,1,this.compressionLevel),this.compressionLevel),dt($e(p,2,this.compressionLevel),this.compressionLevel)),c.set(dt($e(p,4,this.compressionLevel),this.compressionLevel),dt($e(p,5,this.compressionLevel),this.compressionLevel),dt($e(p,6,this.compressionLevel),this.compressionLevel),dt($e(p,3,this.compressionLevel),this.compressionLevel)),K.computeCovariance(l,c,t,e,g,o)}}fillSplatColorArray(e,t,n,i,s){const o=this.splatCount;n=n||0,i=i||o-1,s===void 0&&(s=n);for(let a=n;a<=i;a++){const l=this.globalSplatIndexToSectionMap[a],c=this.sections[l],d=a-c.splatCountOffset,u=(a-n+s)*K.ColorComponentCount,f=c.bytesPerSplat*d+K.CompressionLevels[this.compressionLevel].ColorOffsetBytes,h=new Uint8Array(this.bufferData,c.dataBase+f);let g=h[3];g=g>=t?g:0,e[u]=h[0],e[u+1]=h[1],e[u+2]=h[2],e[u+3]=g}}static parseHeader(e){const t=new Uint8Array(e,0,K.HeaderSizeBytes),n=new Uint16Array(e,0,K.HeaderSizeBytes/2),i=new Uint32Array(e,0,K.HeaderSizeBytes/4),s=new Float32Array(e,0,K.HeaderSizeBytes/4),o=t[0],a=t[1],l=i[1],c=i[2],d=i[3],u=i[4],f=n[10],h=new b(s[6],s[7],s[8]),g=s[9]||-Kn,A=s[10]||Kn;return{versionMajor:o,versionMinor:a,maxSectionCount:l,sectionCount:c,maxSplatCount:d,splatCount:u,compressionLevel:f,sceneCenter:h,minSphericalHarmonicsCoeff:g,maxSphericalHarmonicsCoeff:A}}static writeHeaderCountsToBuffer(e,t,n){const i=new Uint32Array(n,0,K.HeaderSizeBytes/4);i[2]=e,i[4]=t}static writeHeaderToBuffer(e,t){const n=new Uint8Array(t,0,K.HeaderSizeBytes),i=new Uint16Array(t,0,K.HeaderSizeBytes/2),s=new Uint32Array(t,0,K.HeaderSizeBytes/4),o=new Float32Array(t,0,K.HeaderSizeBytes/4);n[0]=e.versionMajor,n[1]=e.versionMinor,n[2]=0,n[3]=0,s[1]=e.maxSectionCount,s[2]=e.sectionCount,s[3]=e.maxSplatCount,s[4]=e.splatCount,i[10]=e.compressionLevel,o[6]=e.sceneCenter.x,o[7]=e.sceneCenter.y,o[8]=e.sceneCenter.z,o[9]=e.minSphericalHarmonicsCoeff||-Kn,o[10]=e.maxSphericalHarmonicsCoeff||Kn}static parseSectionHeaders(e,t,n=0,i){const s=e.compressionLevel,o=e.maxSectionCount,a=new Uint16Array(t,n,o*K.SectionHeaderSizeBytes/2),l=new Uint32Array(t,n,o*K.SectionHeaderSizeBytes/4),c=new Float32Array(t,n,o*K.SectionHeaderSizeBytes/4),d=[];let u=0,f=u/2,h=u/4,g=K.HeaderSizeBytes+e.maxSectionCount*K.SectionHeaderSizeBytes,A=0;for(let p=0;p<o;p++){const m=l[h+1],S=l[h+2],x=l[h+3],v=c[h+4],E=v/2,C=a[f+10],y=l[h+6]||K.CompressionLevels[s].ScaleRange,R=l[h+8],M=l[h+9],_=M*4,I=C*x+_,L=a[f+20],{bytesPerSplat:D}=K.calculateComponentStorage(s,L),F=D*m,z=F+I,N={bytesPerSplat:D,splatCountOffset:A,splatCount:i?m:0,maxSplatCount:m,bucketSize:S,bucketCount:x,bucketBlockSize:v,halfBucketBlockSize:E,bucketStorageSizeBytes:C,bucketsStorageSizeBytes:I,splatDataStorageSizeBytes:F,storageSizeBytes:z,compressionScaleRange:y,compressionScaleFactor:E/y,base:g,bucketsBase:g+_,dataBase:g+I,fullBucketCount:R,partiallyFilledBucketCount:M,sphericalHarmonicsDegree:L};d[p]=N,g+=z,u+=K.SectionHeaderSizeBytes,f=u/2,h=u/4,A+=m}return d}static writeSectionHeaderToBuffer(e,t,n,i=0){const s=new Uint16Array(n,i,K.SectionHeaderSizeBytes/2),o=new Uint32Array(n,i,K.SectionHeaderSizeBytes/4),a=new Float32Array(n,i,K.SectionHeaderSizeBytes/4);o[0]=e.splatCount,o[1]=e.maxSplatCount,o[2]=t>=1?e.bucketSize:0,o[3]=t>=1?e.bucketCount:0,a[4]=t>=1?e.bucketBlockSize:0,s[10]=t>=1?K.BucketStorageSizeBytes:0,o[6]=t>=1?e.compressionScaleRange:0,o[7]=e.storageSizeBytes,o[8]=t>=1?e.fullBucketCount:0,o[9]=t>=1?e.partiallyFilledBucketCount:0,s[20]=e.sphericalHarmonicsDegree}static writeSectionHeaderSplatCountToBuffer(e,t,n=0){const i=new Uint32Array(t,n,K.SectionHeaderSizeBytes/4);i[0]=e}constructFromBuffer(e,t){this.bufferData=e,this.globalSplatIndexToLocalSplatIndexMap=[],this.globalSplatIndexToSectionMap=[];const n=K.parseHeader(this.bufferData);this.versionMajor=n.versionMajor,this.versionMinor=n.versionMinor,this.maxSectionCount=n.maxSectionCount,this.sectionCount=t?n.maxSectionCount:0,this.maxSplatCount=n.maxSplatCount,this.splatCount=t?n.maxSplatCount:0,this.compressionLevel=n.compressionLevel,this.sceneCenter=new b().copy(n.sceneCenter),this.minSphericalHarmonicsCoeff=n.minSphericalHarmonicsCoeff,this.maxSphericalHarmonicsCoeff=n.maxSphericalHarmonicsCoeff,this.sections=K.parseSectionHeaders(n,this.bufferData,K.HeaderSizeBytes,t),this.linkBufferArrays(),this.buildMaps()}static calculateComponentStorage(e,t){const n=K.CompressionLevels[e].BytesPerCenter,i=K.CompressionLevels[e].BytesPerScale,s=K.CompressionLevels[e].BytesPerRotation,o=K.CompressionLevels[e].BytesPerColor,a=Ji(t),l=K.CompressionLevels[e].BytesPerSphericalHarmonicsComponent*a,c=n+i+s+o+l;return{bytesPerCenter:n,bytesPerScale:i,bytesPerRotation:s,bytesPerColor:o,sphericalHarmonicsComponentsPerSplat:a,sphericalHarmonicsBytesPerSplat:l,bytesPerSplat:c}}linkBufferArrays(){for(let e=0;e<this.maxSectionCount;e++){const t=this.sections[e];t.bucketArray=new Float32Array(this.bufferData,t.bucketsBase,t.bucketCount*K.BucketStorageSizeFloats),t.partiallyFilledBucketCount>0&&(t.partiallyFilledBucketLengths=new Uint32Array(this.bufferData,t.base,t.partiallyFilledBucketCount))}}buildMaps(){let e=0;for(let t=0;t<this.maxSectionCount;t++){const n=this.sections[t];for(let i=0;i<n.maxSplatCount;i++){const s=e+i;this.globalSplatIndexToLocalSplatIndexMap[s]=i,this.globalSplatIndexToSectionMap[s]=t}e+=n.maxSplatCount}}updateLoadedCounts(e,t){K.writeHeaderCountsToBuffer(e,t,this.bufferData),this.sectionCount=e,this.splatCount=t}updateSectionLoadedCounts(e,t){const n=K.HeaderSizeBytes+K.SectionHeaderSizeBytes*e;K.writeSectionHeaderSplatCountToBuffer(t,this.bufferData,n),this.sections[e].splatCount=t}static generateFromUncompressedSplatArrays(e,t,n,i,s,o,a=[]){let l=0;for(let E=0;E<e.length;E++){const C=e[E];l=Math.max(C.sphericalHarmonicsDegree,l)}let c,d;for(let E=0;E<e.length;E++){const C=e[E];for(let y=0;y<C.splats.length;y++){const R=C.splats[y];for(let M=he.OFFSET.FRC0;M<he.OFFSET.FRC23&&M<R.length;M++)(!c||R[M]<c)&&(c=R[M]),(!d||R[M]>d)&&(d=R[M])}}c=c||-Kn,d=d||Kn;const{bytesPerSplat:u}=K.calculateComponentStorage(n,l),f=K.CompressionLevels[n].ScaleRange,h=[],g=[];let A=0;for(let E=0;E<e.length;E++){const C=e[E],y=new he(l);for(let $=0;$<C.splatCount;$++){const se=C.splats[$];(se[he.OFFSET.OPACITY]||0)>=t&&y.addSplat(se)}const R=a[E]||{},M=(R.blockSizeFactor||1)*(s||K.BucketBlockSize),_=Math.ceil((R.bucketSizeFactor||1)*(o||K.BucketSize)),I=K.computeBucketsForUncompressedSplatArray(y,M,_),L=I.fullBuckets.length,D=I.partiallyFullBuckets.map($=>$.splats.length),F=D.length,z=[...I.fullBuckets,...I.partiallyFullBuckets],N=y.splats.length*u,G=F*4,k=n>=1?z.length*K.BucketStorageSizeBytes+G:0,Y=N+k,J=new ArrayBuffer(Y),de=f/(M*.5),Re=new b;let Pe=0;for(let $=0;$<z.length;$++){const se=z[$];Re.fromArray(se.center);for(let ne=0;ne<se.splats.length;ne++){let Ee=se.splats[ne];const ye=y.splats[Ee],Ie=k+Pe*u;K.writeSplatDataToSectionBuffer(ye,J,Ie,n,l,Re,de,f,c,d),Pe++}}if(A+=Pe,n>=1){const $=new Uint32Array(J,0,D.length*4);for(let ne=0;ne<D.length;ne++)$[ne]=D[ne];const se=new Float32Array(J,G,z.length*K.BucketStorageSizeFloats);for(let ne=0;ne<z.length;ne++){const Ee=z[ne],ye=ne*3;se[ye]=Ee.center[0],se[ye+1]=Ee.center[1],se[ye+2]=Ee.center[2]}}h.push(J);const W=new ArrayBuffer(K.SectionHeaderSizeBytes);K.writeSectionHeaderToBuffer({maxSplatCount:Pe,splatCount:Pe,bucketSize:_,bucketCount:z.length,bucketBlockSize:M,compressionScaleRange:f,storageSizeBytes:Y,fullBucketCount:L,partiallyFilledBucketCount:F,sphericalHarmonicsDegree:l},n,W,0),g.push(W)}let p=0;for(let E of h)p+=E.byteLength;const m=K.HeaderSizeBytes+K.SectionHeaderSizeBytes*h.length+p,S=new ArrayBuffer(m);K.writeHeaderToBuffer({versionMajor:0,versionMinor:1,maxSectionCount:h.length,sectionCount:h.length,maxSplatCount:A,splatCount:A,compressionLevel:n,sceneCenter:i,minSphericalHarmonicsCoeff:c,maxSphericalHarmonicsCoeff:d},S);let x=K.HeaderSizeBytes;for(let E of g)new Uint8Array(S,x,K.SectionHeaderSizeBytes).set(new Uint8Array(E)),x+=K.SectionHeaderSizeBytes;for(let E of h)new Uint8Array(S,x,E.byteLength).set(new Uint8Array(E)),x+=E.byteLength;return new K(S)}static computeBucketsForUncompressedSplatArray(e,t,n){let i=e.splatCount;const s=t/2,o=new b,a=new b;for(let A=0;A<i;A++){const p=e.splats[A],m=[p[he.OFFSET.X],p[he.OFFSET.Y],p[he.OFFSET.Z]];(A===0||m[0]<o.x)&&(o.x=m[0]),(A===0||m[0]>a.x)&&(a.x=m[0]),(A===0||m[1]<o.y)&&(o.y=m[1]),(A===0||m[1]>a.y)&&(a.y=m[1]),(A===0||m[2]<o.z)&&(o.z=m[2]),(A===0||m[2]>a.z)&&(a.z=m[2])}const l=new b().copy(a).sub(o),c=Math.ceil(l.y/t),d=Math.ceil(l.z/t),u=new b,f=[],h={};for(let A=0;A<i;A++){const p=e.splats[A],m=[p[he.OFFSET.X],p[he.OFFSET.Y],p[he.OFFSET.Z]],S=Math.floor((m[0]-o.x)/t),x=Math.floor((m[1]-o.y)/t),v=Math.floor((m[2]-o.z)/t);u.x=S*t+o.x+s,u.y=x*t+o.y+s,u.z=v*t+o.z+s;const E=S*(c*d)+x*d+v;let C=h[E];C||(h[E]=C={splats:[],center:u.toArray()}),C.splats.push(A),C.splats.length>=n&&(f.push(C),h[E]=null)}const g=[];for(let A in h)if(h.hasOwnProperty(A)){const p=h[A];p&&g.push(p)}return{fullBuckets:f,partiallyFullBuckets:g}}static preallocateUncompressed(e,t){const n=K.CompressionLevels[0].SphericalHarmonicsDegrees[t],i=K.HeaderSizeBytes+K.SectionHeaderSizeBytes,s=i+n.BytesPerSplat*e,o=new ArrayBuffer(s);return K.writeHeaderToBuffer({versionMajor:K.CurrentMajorVersion,versionMinor:K.CurrentMinorVersion,maxSectionCount:1,sectionCount:1,maxSplatCount:e,splatCount:e,compressionLevel:0,sceneCenter:new b},o),K.writeSectionHeaderToBuffer({maxSplatCount:e,splatCount:e,bucketSize:0,bucketCount:0,bucketBlockSize:0,compressionScaleRange:0,storageSizeBytes:0,fullBucketCount:0,partiallyFilledBucketCount:0,sphericalHarmonicsDegree:t},0,o,K.HeaderSizeBytes),{splatBuffer:new K(o,!0),splatBufferDataOffsetBytes:i}}};ce(K,"CurrentMajorVersion",0),ce(K,"CurrentMinorVersion",1),ce(K,"CenterComponentCount",3),ce(K,"ScaleComponentCount",3),ce(K,"RotationComponentCount",4),ce(K,"ColorComponentCount",4),ce(K,"CovarianceComponentCount",6),ce(K,"SplatScaleOffsetFloat",3),ce(K,"SplatRotationOffsetFloat",6),ce(K,"CompressionLevels",{0:{BytesPerCenter:12,BytesPerScale:12,BytesPerRotation:16,BytesPerColor:4,ScaleOffsetBytes:12,RotationffsetBytes:24,ColorOffsetBytes:40,SphericalHarmonicsOffsetBytes:44,ScaleRange:1,BytesPerSphericalHarmonicsComponent:4,SphericalHarmonicsOffsetFloat:11,SphericalHarmonicsDegrees:{0:{BytesPerSplat:44},1:{BytesPerSplat:80},2:{BytesPerSplat:140}}},1:{BytesPerCenter:6,BytesPerScale:6,BytesPerRotation:8,BytesPerColor:4,ScaleOffsetBytes:6,RotationffsetBytes:12,ColorOffsetBytes:20,SphericalHarmonicsOffsetBytes:24,ScaleRange:32767,BytesPerSphericalHarmonicsComponent:2,SphericalHarmonicsOffsetFloat:12,SphericalHarmonicsDegrees:{0:{BytesPerSplat:24},1:{BytesPerSplat:42},2:{BytesPerSplat:72}}},2:{BytesPerCenter:6,BytesPerScale:6,BytesPerRotation:8,BytesPerColor:4,ScaleOffsetBytes:6,RotationffsetBytes:12,ColorOffsetBytes:20,SphericalHarmonicsOffsetBytes:24,ScaleRange:32767,BytesPerSphericalHarmonicsComponent:1,SphericalHarmonicsOffsetFloat:12,SphericalHarmonicsDegrees:{0:{BytesPerSplat:24},1:{BytesPerSplat:33},2:{BytesPerSplat:48}}}}),ce(K,"CovarianceSizeFloats",6),ce(K,"HeaderSizeBytes",4096),ce(K,"SectionHeaderSizeBytes",1024),ce(K,"BucketStorageSizeBytes",12),ce(K,"BucketStorageSizeFloats",3),ce(K,"BucketBlockSize",5),ce(K,"BucketSize",256),ce(K,"computeCovariance",function(){const e=new ze,t=new ke,n=new ke,i=new ke,s=new ke,o=new ke,a=new ke;return function(l,c,d,u,f=0,h){e.makeScale(l.x,l.y,l.z),t.setFromMatrix4(e),e.makeRotationFromQuaternion(c),n.setFromMatrix4(e),i.copy(n).multiply(t),s.copy(i).transpose().premultiply(i),d&&(o.setFromMatrix4(d),a.copy(o).transpose(),s.multiply(a),s.premultiply(o)),h>=1?(u[f]=vt(s.elements[0]),u[f+1]=vt(s.elements[3]),u[f+2]=vt(s.elements[6]),u[f+3]=vt(s.elements[4]),u[f+4]=vt(s.elements[7]),u[f+5]=vt(s.elements[8])):(u[f]=s.elements[0],u[f+1]=s.elements[3],u[f+2]=s.elements[6],u[f+3]=s.elements[4],u[f+4]=s.elements[7],u[f+5]=s.elements[8])}}()),ce(K,"dot3",(e,t,n,i,s)=>{s[0]=s[1]=s[2]=0;const o=i[0],a=i[1],l=i[2];K.addInto3(e[0]*o,e[1]*o,e[2]*o,s),K.addInto3(t[0]*a,t[1]*a,t[2]*a,s),K.addInto3(n[0]*l,n[1]*l,n[2]*l,s)}),ce(K,"addInto3",(e,t,n,i)=>{i[0]=i[0]+e,i[1]=i[1]+t,i[2]=i[2]+n}),ce(K,"dot5",(e,t,n,i,s,o,a)=>{a[0]=a[1]=a[2]=0;const l=o[0],c=o[1],d=o[2],u=o[3],f=o[4];K.addInto3(e[0]*l,e[1]*l,e[2]*l,a),K.addInto3(t[0]*c,t[1]*c,t[2]*c,a),K.addInto3(n[0]*d,n[1]*d,n[2]*d,a),K.addInto3(i[0]*u,i[1]*u,i[2]*u,a),K.addInto3(s[0]*f,s[1]*f,s[2]*f,a)}),ce(K,"rotateSphericalHarmonics3",(e,t,n,i,s,o,a,l,c)=>{K.dot3(e,t,n,i,a),K.dot3(e,t,n,s,l),K.dot3(e,t,n,o,c)}),ce(K,"rotateSphericalHarmonics5",(e,t,n,i,s,o,a,l,c,d,u,f,h,g,A,p,m,S)=>{const x=Math.sqrt(.25),v=Math.sqrt(3/4),E=Math.sqrt(1/3),C=Math.sqrt(4/3),y=Math.sqrt(1/12);c[0]=x*(l[2]*o[0]+l[0]*o[2]+(o[2]*l[0]+o[0]*l[2])),c[1]=l[1]*o[0]+o[1]*l[0],c[2]=v*(l[1]*o[1]+o[1]*l[1]),c[3]=l[1]*o[2]+o[1]*l[2],c[4]=x*(l[2]*o[2]-l[0]*o[0]+(o[2]*l[2]-o[0]*l[0])),K.dot5(e,t,n,i,s,c,g),d[0]=x*(a[2]*o[0]+a[0]*o[2]+(o[2]*a[0]+o[0]*a[2])),d[1]=a[1]*o[0]+o[1]*a[0],d[2]=v*(a[1]*o[1]+o[1]*a[1]),d[3]=a[1]*o[2]+o[1]*a[2],d[4]=x*(a[2]*o[2]-a[0]*o[0]+(o[2]*a[2]-o[0]*a[0])),K.dot5(e,t,n,i,s,d,A),u[0]=E*(a[2]*a[0]+a[0]*a[2])+-y*(l[2]*l[0]+l[0]*l[2]+(o[2]*o[0]+o[0]*o[2])),u[1]=C*a[1]*a[0]+-E*(l[1]*l[0]+o[1]*o[0]),u[2]=a[1]*a[1]+-x*(l[1]*l[1]+o[1]*o[1]),u[3]=C*a[1]*a[2]+-E*(l[1]*l[2]+o[1]*o[2]),u[4]=E*(a[2]*a[2]-a[0]*a[0])+-y*(l[2]*l[2]-l[0]*l[0]+(o[2]*o[2]-o[0]*o[0])),K.dot5(e,t,n,i,s,u,p),f[0]=x*(a[2]*l[0]+a[0]*l[2]+(l[2]*a[0]+l[0]*a[2])),f[1]=a[1]*l[0]+l[1]*a[0],f[2]=v*(a[1]*l[1]+l[1]*a[1]),f[3]=a[1]*l[2]+l[1]*a[2],f[4]=x*(a[2]*l[2]-a[0]*l[0]+(l[2]*a[2]-l[0]*a[0])),K.dot5(e,t,n,i,s,f,m),h[0]=x*(l[2]*l[0]+l[0]*l[2]-(o[2]*o[0]+o[0]*o[2])),h[1]=l[1]*l[0]-o[1]*o[0],h[2]=v*(l[1]*l[1]-o[1]*o[1]),h[3]=l[1]*l[2]-o[1]*o[2],h[4]=x*(l[2]*l[2]-l[0]*l[0]-(o[2]*o[2]-o[0]*o[0])),K.dot5(e,t,n,i,s,h,S)}),ce(K,"writeSplatDataToSectionBuffer",function(){const e=new ArrayBuffer(12),t=new ArrayBuffer(12),n=new ArrayBuffer(16),i=new ArrayBuffer(4),s=new ArrayBuffer(256),o=new nt,a=new b,l=new b,{X:c,Y:d,Z:u,SCALE0:f,SCALE1:h,SCALE2:g,ROTATION0:A,ROTATION1:p,ROTATION2:m,ROTATION3:S,FDC0:x,FDC1:v,FDC2:E,OPACITY:C,FRC0:y,FRC9:R}=he.OFFSET,M=(_,I,L)=>{const D=L*2+1;return _=Math.round(_*I)+L,ut(_,0,D)};return function(_,I,L,D,F,z,N,G,k=-Kn,Y=Kn){const J=Ji(F),de=K.CompressionLevels[D].BytesPerCenter,Re=K.CompressionLevels[D].BytesPerScale,Pe=K.CompressionLevels[D].BytesPerRotation,W=K.CompressionLevels[D].BytesPerColor,$=L,se=$+de,ne=se+Re,Ee=ne+Pe,ye=Ee+W;if(_[A]!==void 0?(o.set(_[A],_[p],_[m],_[S]),o.normalize()):o.set(1,0,0,0),_[f]!==void 0?a.set(_[f]||0,_[h]||0,_[g]||0):a.set(0,0,0),D===0){const B=new Float32Array(I,$,K.CenterComponentCount),De=new Float32Array(I,ne,K.RotationComponentCount),Me=new Float32Array(I,se,K.ScaleComponentCount);if(De.set([o.x,o.y,o.z,o.w]),Me.set([a.x,a.y,a.z]),B.set([_[c],_[d],_[u]]),F>0){const We=new Float32Array(I,ye,J);if(F>=1){for(let fe=0;fe<9;fe++)We[fe]=_[y+fe]||0;if(F>=2)for(let fe=0;fe<15;fe++)We[fe+9]=_[R+fe]||0}}}else{const B=new Uint16Array(e,0,K.CenterComponentCount),De=new Uint16Array(n,0,K.RotationComponentCount),Me=new Uint16Array(t,0,K.ScaleComponentCount);if(De.set([vt(o.x),vt(o.y),vt(o.z),vt(o.w)]),Me.set([vt(a.x),vt(a.y),vt(a.z)]),l.set(_[c],_[d],_[u]).sub(z),l.x=M(l.x,N,G),l.y=M(l.y,N,G),l.z=M(l.z,N,G),B.set([l.x,l.y,l.z]),F>0){const We=D===1?Uint16Array:Uint8Array,fe=D===1?2:1,Ge=new We(s,0,J);if(F>=1){for(let Te=0;Te<9;Te++){const Ke=_[y+Te]||0;Ge[Te]=D===1?vt(Ke):ws(Ke,k,Y)}const Ne=9*fe;if(Xi(Ge.buffer,0,I,ye,Ne),F>=2){for(let Te=0;Te<15;Te++){const Ke=_[R+Te]||0;Ge[Te+9]=D===1?vt(Ke):ws(Ke,k,Y)}Xi(Ge.buffer,Ne,I,ye+Ne,15*fe)}}}Xi(B.buffer,0,I,$,6),Xi(Me.buffer,0,I,se,6),Xi(De.buffer,0,I,ne,8)}const Ie=new Uint8ClampedArray(i,0,4);Ie.set([_[x]||0,_[v]||0,_[E]||0]),Ie[3]=_[C]||0,Xi(Ie.buffer,0,I,Ee,4)}}());let _e=K;const ac=new Uint8Array([112,108,121,10]),lc=new Uint8Array([10,101,110,100,95,104,101,97,100,101,114,10]),Io="end_header",Po=new Map([["char",Int8Array],["uchar",Uint8Array],["short",Int16Array],["ushort",Uint16Array],["int",Int32Array],["uint",Uint32Array],["float",Float32Array],["double",Float64Array]]),_n=(r,e)=>{const t=(1<<e)-1;return(r&t)/t},cc=(r,e)=>{r.x=_n(e>>>21,11),r.y=_n(e>>>11,10),r.z=_n(e,11)},L0=(r,e)=>{r.x=_n(e>>>24,8),r.y=_n(e>>>16,8),r.z=_n(e>>>8,8),r.w=_n(e,8)},B0=(r,e)=>{const t=1/(Math.sqrt(2)*.5),n=(_n(e>>>20,10)-.5)*t,i=(_n(e>>>10,10)-.5)*t,s=(_n(e,10)-.5)*t,o=Math.sqrt(1-(n*n+i*i+s*s));switch(e>>>30){case 0:r.set(o,n,i,s);break;case 1:r.set(n,o,i,s);break;case 2:r.set(n,i,o,s);break;case 3:r.set(n,i,s,o);break}},Rn=(r,e,t)=>r*(1-t)+e*t,ft=(r,e)=>{var t;return(t=r.properties.find(n=>n.name===e&&n.storage))==null?void 0:t.storage},ot=class ot{static decodeHeaderText(e){let t,n,i,s;const o=e.split(`
`).filter(u=>!u.startsWith("comment "));let a=0,l=!1;for(let u=1;u<o.length;++u){const f=o[u].split(" ");switch(f[0]){case"format":if(f[1]!=="binary_little_endian")throw new Error("Unsupported ply format");break;case"element":t={name:f[1],count:parseInt(f[2],10),properties:[],storageSizeBytes:0},t.name==="chunk"?n=t:t.name==="vertex"?i=t:t.name==="sh"&&(s=t);break;case"property":{if(!Po.has(f[1]))throw new Error(`Unrecognized property data type '${f[1]}' in ply header`);const h=Po.get(f[1]),g=h.BYTES_PER_ELEMENT*t.count;t.name==="vertex"&&(a+=h.BYTES_PER_ELEMENT),t.properties.push({type:f[1],name:f[2],storage:null,byteSize:h.BYTES_PER_ELEMENT,storageSizeByes:g}),t.storageSizeBytes+=g;break}case Io:l=!0;break;default:throw new Error(`Unrecognized header value '${f[0]}' in ply header`)}if(l)break}let c=0,d=0;return s&&(d=s.properties.length,s.properties.length>=45?c=3:s.properties.length>=24?c=2:s.properties.length>=9&&(c=1)),{chunkElement:n,vertexElement:i,shElement:s,bytesPerSplat:a,headerSizeBytes:e.indexOf(Io)+Io.length+1,sphericalHarmonicsDegree:c,sphericalHarmonicsPerSplat:d}}static decodeHeader(e){const t=(h,g)=>{const A=h.length-g.length;let p,m;for(p=0;p<=A;++p){for(m=0;m<g.length&&h[p+m]===g[m];++m);if(m===g.length)return p}return-1},n=(h,g)=>{if(h.length<g.length)return!1;for(let A=0;A<g.length;++A)if(h[A]!==g[A])return!1;return!0};let i=new Uint8Array(e),s;if(i.length>=ac.length&&!n(i,ac))throw new Error("Invalid PLY header");if(s=t(i,lc),s===-1)throw new Error("End of PLY header not found");const o=new TextDecoder("ascii").decode(i.slice(0,s)),{chunkElement:a,vertexElement:l,shElement:c,sphericalHarmonicsDegree:d,sphericalHarmonicsPerSplat:u,bytesPerSplat:f}=ot.decodeHeaderText(o);return{headerSizeBytes:s+lc.length,bytesPerSplat:f,chunkElement:a,vertexElement:l,shElement:c,sphericalHarmonicsDegree:d,sphericalHarmonicsPerSplat:u}}static readElementData(e,t,n,i,s,o=null){let a=t instanceof DataView?t:new DataView(t);i=i||0,s=s||e.count-1;for(let l=i;l<=s;++l)for(let c=0;c<e.properties.length;++c){const d=e.properties[c],u=Po.get(d.type),f=u.BYTES_PER_ELEMENT*e.count;if((!d.storage||d.storage.byteLength<f)&&(!o||o(d.name))&&(d.storage=new u(e.count)),d.storage)switch(d.type){case"char":d.storage[l]=a.getInt8(n);break;case"uchar":d.storage[l]=a.getUint8(n);break;case"short":d.storage[l]=a.getInt16(n,!0);break;case"ushort":d.storage[l]=a.getUint16(n,!0);break;case"int":d.storage[l]=a.getInt32(n,!0);break;case"uint":d.storage[l]=a.getUint32(n,!0);break;case"float":d.storage[l]=a.getFloat32(n,!0);break;case"double":d.storage[l]=a.getFloat64(n,!0);break}n+=d.byteSize}return n}static readPly(e,t=null){const n=ot.decodeHeader(e);let i=ot.readElementData(n.chunkElement,e,n.headerSizeBytes,null,null,t);return i=ot.readElementData(n.vertexElement,e,i,null,null,t),ot.readElementData(n.shElement,e,i,null,null,t),{chunkElement:n.chunkElement,vertexElement:n.vertexElement,shElement:n.shElement,sphericalHarmonicsDegree:n.sphericalHarmonicsDegree,sphericalHarmonicsPerSplat:n.sphericalHarmonicsPerSplat}}static getElementStorageArrays(e,t,n){const i={};if(t){const s=ft(e,"min_r"),o=ft(e,"min_g"),a=ft(e,"min_b"),l=ft(e,"max_r"),c=ft(e,"max_g"),d=ft(e,"max_b"),u=ft(e,"min_x"),f=ft(e,"min_y"),h=ft(e,"min_z"),g=ft(e,"max_x"),A=ft(e,"max_y"),p=ft(e,"max_z"),m=ft(e,"min_scale_x"),S=ft(e,"min_scale_y"),x=ft(e,"min_scale_z"),v=ft(e,"max_scale_x"),E=ft(e,"max_scale_y"),C=ft(e,"max_scale_z"),y=ft(t,"packed_position"),R=ft(t,"packed_rotation"),M=ft(t,"packed_scale"),_=ft(t,"packed_color");i.colorExtremes={minR:s,maxR:l,minG:o,maxG:c,minB:a,maxB:d},i.positionExtremes={minX:u,maxX:g,minY:f,maxY:A,minZ:h,maxZ:p},i.scaleExtremes={minScaleX:m,maxScaleX:v,minScaleY:S,maxScaleY:E,minScaleZ:x,maxScaleZ:C},i.position=y,i.rotation=R,i.scale=M,i.color=_}if(n){const s={};for(let o=0;o<45;o++){const a=`f_rest_${o}`,l=ft(n,a);if(l)s[a]=l;else break}i.sh=s}return i}static parseToUncompressedSplatBufferSection(e,t,n,i,s,o,a,l,c=null){ot.readElementData(t,o,0,n,i,c);const d=_e.CompressionLevels[0].SphericalHarmonicsDegrees[0].BytesPerSplat,{positionExtremes:u,scaleExtremes:f,colorExtremes:h,position:g,rotation:A,scale:p,color:m}=ot.getElementStorageArrays(e,t),S=he.createSplat();for(let x=n;x<=i;++x){ot.decompressBaseSplat(x,s,g,u,p,f,A,h,m,S);const v=x*d+l;_e.writeSplatDataToSectionBuffer(S,a,v,0,0)}}static parseToUncompressedSplatArraySection(e,t,n,i,s,o,a,l=null){ot.readElementData(t,o,0,n,i,l);const{positionExtremes:c,scaleExtremes:d,colorExtremes:u,position:f,rotation:h,scale:g,color:A}=ot.getElementStorageArrays(e,t);for(let p=n;p<=i;++p){const m=he.createSplat();ot.decompressBaseSplat(p,s,f,c,g,d,h,u,A,m),a.addSplat(m)}}static parseSphericalHarmonicsToUncompressedSplatArraySection(e,t,n,i,s,o,a,l,c,d=null){ot.readElementData(t,s,o,n,i,d);const{sh:u}=ot.getElementStorageArrays(e,void 0,t),f=Object.values(u);for(let h=n;h<=i;++h)ot.decompressSphericalHarmonics(h,f,a,l,c.splats[h])}static parseToUncompressedSplatArray(e,t){const{chunkElement:n,vertexElement:i,shElement:s,sphericalHarmonicsDegree:o}=ot.readPly(e);t=Math.min(t,o);const a=new he(t),{positionExtremes:l,scaleExtremes:c,colorExtremes:d,position:u,rotation:f,scale:h,color:g}=ot.getElementStorageArrays(n,i);let A;if(t>0){const{sh:p}=ot.getElementStorageArrays(n,void 0,s);A=Object.values(p)}for(let p=0;p<i.count;++p){a.addDefaultSplat();const m=a.getSplat(a.splatCount-1);ot.decompressBaseSplat(p,0,u,l,h,c,f,d,g,m),t>0&&ot.decompressSphericalHarmonics(p,A,t,o,m)}return a}static parseToUncompressedSplatBuffer(e,t){const{chunkElement:n,vertexElement:i,shElement:s,sphericalHarmonicsDegree:o}=ot.readPly(e);t=Math.min(t,o);const{splatBuffer:a,splatBufferDataOffsetBytes:l}=_e.preallocateUncompressed(i.count,t),{positionExtremes:c,scaleExtremes:d,colorExtremes:u,position:f,rotation:h,scale:g,color:A}=ot.getElementStorageArrays(n,i);let p;if(t>0){const{sh:x}=ot.getElementStorageArrays(n,void 0,s);p=Object.values(x)}const m=_e.CompressionLevels[0].SphericalHarmonicsDegrees[t].BytesPerSplat,S=he.createSplat(t);for(let x=0;x<i.count;++x){ot.decompressBaseSplat(x,0,f,c,g,d,h,u,A,S),t>0&&ot.decompressSphericalHarmonics(x,p,t,o,S);const v=x*m+l;_e.writeSplatDataToSectionBuffer(S,a.bufferData,v,0,t)}return a}};ce(ot,"decompressBaseSplat",function(){const e=new b,t=new nt,n=new b,i=new _t,s=he.OFFSET;return function(o,a,l,c,d,u,f,h,g,A){A=A||he.createSplat();const p=Math.floor((a+o)/256);return cc(e,l[o]),B0(t,f[o]),cc(n,d[o]),L0(i,g[o]),A[s.X]=Rn(c.minX[p],c.maxX[p],e.x),A[s.Y]=Rn(c.minY[p],c.maxY[p],e.y),A[s.Z]=Rn(c.minZ[p],c.maxZ[p],e.z),A[s.ROTATION0]=t.x,A[s.ROTATION1]=t.y,A[s.ROTATION2]=t.z,A[s.ROTATION3]=t.w,A[s.SCALE0]=Math.exp(Rn(u.minScaleX[p],u.maxScaleX[p],n.x)),A[s.SCALE1]=Math.exp(Rn(u.minScaleY[p],u.maxScaleY[p],n.y)),A[s.SCALE2]=Math.exp(Rn(u.minScaleZ[p],u.maxScaleZ[p],n.z)),h.minR&&h.maxR?A[s.FDC0]=ut(Math.round(Rn(h.minR[p],h.maxR[p],i.x)*255),0,255):A[s.FDC0]=ut(Math.floor(i.x*255),0,255),h.minG&&h.maxG?A[s.FDC1]=ut(Math.round(Rn(h.minG[p],h.maxG[p],i.y)*255),0,255):A[s.FDC1]=ut(Math.floor(i.y*255),0,255),h.minB&&h.maxB?A[s.FDC2]=ut(Math.round(Rn(h.minB[p],h.maxB[p],i.z)*255),0,255):A[s.FDC2]=ut(Math.floor(i.z*255),0,255),A[s.OPACITY]=ut(Math.floor(i.w*255),0,255),A}}()),ce(ot,"decompressSphericalHarmonics",function(){const e=[0,3,8,15],t=[0,1,2,9,10,11,12,13,24,25,26,27,28,29,30,3,4,5,14,15,16,17,18,31,32,33,34,35,36,37,6,7,8,19,20,21,22,23,38,39,40,41,42,43,44];return function(n,i,s,o,a){a=a||he.createSplat();let l=e[s],c=e[o];for(let d=0;d<3;++d)for(let u=0;u<15;++u){const f=t[d*15+u];u<l&&u<c&&(a[he.OFFSET.FRC0+f]=i[d*c+u][n]*(8/255)-4)}return a}}());let Un=ot;const Nt={INRIAV1:0,INRIAV2:1,PlayCanvasCompressed:2},[Td,Sa,xa,_a,va,ya,Ma]=[0,1,2,3,4,5,6],dc={double:Td,int:Sa,uint:xa,float:_a,short:va,ushort:ya,uchar:Ma},U0={[Td]:8,[Sa]:4,[xa]:4,[_a]:4,[va]:2,[ya]:2,[Ma]:1},Ht=class Ht{static decodeSectionHeader(e,t,n=0){const i=[];let s=!1,o=-1,a=0,l=!1,c=null;const d=[],u=[],f=[],h={};for(let m=n;m<e.length;m++){const S=e[m].trim();if(S.startsWith("element"))if(s){o--;break}else{s=!0,n=m,o=m;const x=S.split(" ");let v=0;for(let E of x){const C=E.trim();C.length>0&&(v++,v===2?c=C:v===3&&(a=parseInt(C)))}}else if(S.startsWith("property")){const x=S.match(/(\w+)\s+(\w+)\s+(\w+)/);if(x){const v=x[2],E=x[3];f.push(E);const C=t[E];h[E]=v;const y=dc[v];C!==void 0&&(d.push(C),u[C]=y)}}if(S===Ht.HeaderEndToken){l=!0;break}s&&(i.push(S),o++)}const g=[];let A=0;for(let m of f){const S=h[m];if(h.hasOwnProperty(m)){const x=t[m];x!==void 0&&(g[x]=A)}A+=U0[dc[S]]}const p=Ht.decodeSphericalHarmonicsFromSectionHeader(f,t);return{headerLines:i,headerStartLine:n,headerEndLine:o,fieldTypes:u,fieldIds:d,fieldOffsets:g,bytesPerVertex:A,vertexCount:a,dataSizeBytes:A*a,endOfHeader:l,sectionName:c,sphericalHarmonicsDegree:p.degree,sphericalHarmonicsCoefficientsPerChannel:p.coefficientsPerChannel,sphericalHarmonicsDegree1Fields:p.degree1Fields,sphericalHarmonicsDegree2Fields:p.degree2Fields}}static decodeSphericalHarmonicsFromSectionHeader(e,t){let n=0,i=0;for(let l of e)l.startsWith("f_rest")&&n++;i=n/3;let s=0;i>=3&&(s=1),i>=8&&(s=2);let o=[],a=[];for(let l=0;l<3;l++){if(s>=1)for(let c=0;c<3;c++)o.push(t["f_rest_"+(c+i*l)]);if(s>=2)for(let c=0;c<5;c++)a.push(t["f_rest_"+(c+i*l+3)])}return{degree:s,coefficientsPerChannel:i,degree1Fields:o,degree2Fields:a}}static getHeaderSectionNames(e){const t=[];for(let n of e)if(n.startsWith("element")){const i=n.split(" ");let s=0;for(let o of i){const a=o.trim();a.length>0&&(s++,s===2&&t.push(a))}}return t}static checkTextForEndHeader(e){return!!e.includes(Ht.HeaderEndToken)}static checkBufferForEndHeader(e,t,n,i){const s=new Uint8Array(e,Math.max(0,t-n),n),o=i.decode(s);return Ht.checkTextForEndHeader(o)}static extractHeaderFromBufferToText(e){const t=new TextDecoder;let n=0,i="";const s=100;for(;;){if(n+s>=e.byteLength)throw new Error("End of file reached while searching for end of header");const o=new Uint8Array(e,n,s);if(i+=t.decode(o),n+=s,Ht.checkBufferForEndHeader(e,n,s*2,t))break}return i}static readHeaderFromBuffer(e){const t=new TextDecoder;let n=0,i="";const s=100;for(;;){if(n+s>=e.byteLength)throw new Error("End of file reached while searching for end of header");const o=new Uint8Array(e,n,s);if(i+=t.decode(o),n+=s,Ht.checkBufferForEndHeader(e,n,s*2,t))break}return i}static convertHeaderTextToLines(e){const t=e.split(`
`),n=[];for(let i=0;i<t.length;i++){const s=t[i].trim();if(n.push(s),s===Ht.HeaderEndToken)break}return n}static determineHeaderFormatFromHeaderText(e){const t=Ht.convertHeaderTextToLines(e);let n=Nt.INRIAV1;for(let i=0;i<t.length;i++){const s=t[i].trim();if(s.startsWith("element chunk")||s.match(/[A-Za-z]*packed_[A-Za-z]*/))n=Nt.PlayCanvasCompressed;else if(s.startsWith("element codebook_centers"))n=Nt.INRIAV2;else if(s===Ht.HeaderEndToken)break}return n}static determineHeaderFormatFromPlyBuffer(e){const t=Ht.extractHeaderFromBufferToText(e);return Ht.determineHeaderFormatFromHeaderText(t)}static readVertex(e,t,n,i,s,o,a=!0){const l=n*t.bytesPerVertex+i,c=t.fieldOffsets,d=t.fieldTypes;for(let u of s){const f=d[u];f===_a?o[u]=e.getFloat32(l+c[u],!0):f===va?o[u]=e.getInt16(l+c[u],!0):f===ya?o[u]=e.getUint16(l+c[u],!0):f===Sa?o[u]=e.getInt32(l+c[u],!0):f===xa?o[u]=e.getUint32(l+c[u],!0):f===Ma&&(a?o[u]=e.getUint8(l+c[u])/255:o[u]=e.getUint8(l+c[u]))}}};ce(Ht,"HeaderEndToken","end_header");let At=Ht;const wd=["scale_0","scale_1","scale_2","rot_0","rot_1","rot_2","rot_3","x","y","z","f_dc_0","f_dc_1","f_dc_2","opacity","red","green","blue","f_rest_0"],O0=wd.map((r,e)=>e),[uc,N0,z0,H0,k0,V0,G0,W0,X0,q0,hc,Q0,Y0,fc,pc,K0,j0,Z0]=O0,tn=class tn{static decodeHeaderLines(e){let t=0;e.forEach(d=>{d.includes("f_rest_")&&t++});let n=0;t>=45?n=45:t>=24?n=24:t>=9&&(n=9);let s=Array.from(Array(Math.max(n-1,0))).map((d,u)=>`f_rest_${u+1}`);const o=[...wd,...s],a=o.map((d,u)=>u),l=a.reduce((d,u)=>(d[o[u]]=u,d),{}),c=At.decodeSectionHeader(e,l,0);return c.splatCount=c.vertexCount,c.bytesPerSplat=c.bytesPerVertex,c.fieldsToReadIndexes=a,c}static decodeHeaderText(e){const t=At.convertHeaderTextToLines(e),n=tn.decodeHeaderLines(t);return n.headerText=e,n.headerSizeBytes=e.indexOf(At.HeaderEndToken)+At.HeaderEndToken.length+1,n}static decodeHeaderFromBuffer(e){const t=At.readHeaderFromBuffer(e);return tn.decodeHeaderText(t)}static findSplatData(e,t){return new DataView(e,t.headerSizeBytes)}static parseToUncompressedSplatBufferSection(e,t,n,i,s,o,a,l=0){l=Math.min(l,e.sphericalHarmonicsDegree);const c=_e.CompressionLevels[0].SphericalHarmonicsDegrees[l].BytesPerSplat;for(let d=t;d<=n;d++){const u=tn.parseToUncompressedSplat(i,d,e,s,l),f=d*c+a;_e.writeSplatDataToSectionBuffer(u,o,f,0,l)}}static parseToUncompressedSplatArraySection(e,t,n,i,s,o,a=0){a=Math.min(a,e.sphericalHarmonicsDegree);for(let l=t;l<=n;l++){const c=tn.parseToUncompressedSplat(i,l,e,s,a);o.addSplat(c)}}static decodeSectionSplatData(e,t,n,i,s=!0){if(i=Math.min(i,n.sphericalHarmonicsDegree),s){const o=new he(i);for(let a=0;a<t;a++){const l=tn.parseToUncompressedSplat(e,a,n,0,i);o.addSplat(l)}return o}else{const{splatBuffer:o,splatBufferDataOffsetBytes:a}=_e.preallocateUncompressed(t,i);return tn.parseToUncompressedSplatBufferSection(n,0,t-1,e,0,o.bufferData,a,i),o}}static readSplat(e,t,n,i,s){return At.readVertex(e,t,n,i,t.fieldsToReadIndexes,s,!0)}static parseToUncompressedSplatArray(e,t=0){const{header:n,splatCount:i,splatData:s}=mc(e);return tn.decodeSectionSplatData(s,i,n,t,!0)}static parseToUncompressedSplatBuffer(e,t=0){const{header:n,splatCount:i,splatData:s}=mc(e);return tn.decodeSectionSplatData(s,i,n,t,!1)}};ce(tn,"parseToUncompressedSplat",function(){let e=[];const t=new nt,n=he.OFFSET.X,i=he.OFFSET.Y,s=he.OFFSET.Z,o=he.OFFSET.SCALE0,a=he.OFFSET.SCALE1,l=he.OFFSET.SCALE2,c=he.OFFSET.ROTATION0,d=he.OFFSET.ROTATION1,u=he.OFFSET.ROTATION2,f=he.OFFSET.ROTATION3,h=he.OFFSET.FDC0,g=he.OFFSET.FDC1,A=he.OFFSET.FDC2,p=he.OFFSET.OPACITY,m=[];for(let S=0;S<45;S++)m[S]=he.OFFSET.FRC0+S;return function(S,x,v,E=0,C=0){C=Math.min(C,v.sphericalHarmonicsDegree),tn.readSplat(S,v,x,E,e);const y=he.createSplat(C);if(e[uc]!==void 0?(y[o]=Math.exp(e[uc]),y[a]=Math.exp(e[N0]),y[l]=Math.exp(e[z0])):(y[o]=.01,y[a]=.01,y[l]=.01),e[hc]!==void 0){const R=.28209479177387814;y[h]=(.5+R*e[hc])*255,y[g]=(.5+R*e[Q0])*255,y[A]=(.5+R*e[Y0])*255}else e[pc]!==void 0?(y[h]=e[pc]*255,y[g]=e[K0]*255,y[A]=e[j0]*255):(y[h]=0,y[g]=0,y[A]=0);if(e[fc]!==void 0&&(y[p]=1/(1+Math.exp(-e[fc]))*255),y[h]=ut(Math.floor(y[h]),0,255),y[g]=ut(Math.floor(y[g]),0,255),y[A]=ut(Math.floor(y[A]),0,255),y[p]=ut(Math.floor(y[p]),0,255),C>=1&&e[Z0]!==void 0){for(let R=0;R<9;R++)y[m[R]]=e[v.sphericalHarmonicsDegree1Fields[R]];if(C>=2)for(let R=0;R<15;R++)y[m[9+R]]=e[v.sphericalHarmonicsDegree2Fields[R]]}return t.set(e[H0],e[k0],e[V0],e[G0]),t.normalize(),y[c]=t.x,y[d]=t.y,y[u]=t.z,y[f]=t.w,y[n]=e[W0],y[i]=e[X0],y[s]=e[q0],y}}());let zn=tn;function mc(r){const e=zn.decodeHeaderFromBuffer(r),t=e.splatCount,n=zn.findSplatData(r,e);return{header:e,splatCount:t,splatData:n}}const bd=["features_dc","features_rest_0","features_rest_1","features_rest_2","features_rest_3","features_rest_4","features_rest_5","features_rest_6","features_rest_7","features_rest_8","features_rest_9","features_rest_10","features_rest_11","features_rest_12","features_rest_13","features_rest_14","opacity","scaling","rotation_re","rotation_im"],pr=bd.map((r,e)=>e),[mr,$0,J0,gc,gr,eA,Do]=[0,1,4,16,17,18,19],Rd=["scale_0","scale_1","scale_2","rot_0","rot_1","rot_2","rot_3","x","y","z","f_dc_0","f_dc_1","f_dc_2","opacity","red","green","blue","f_rest_0","f_rest_1","f_rest_2","f_rest_3","f_rest_4","f_rest_5","f_rest_6","f_rest_7","f_rest_8","f_rest_9","f_rest_10","f_rest_11","f_rest_12","f_rest_13","f_rest_14","f_rest_15","f_rest_16","f_rest_17","f_rest_18","f_rest_19","f_rest_20","f_rest_21","f_rest_22","f_rest_23","f_rest_24","f_rest_25","f_rest_26","f_rest_27","f_rest_28","f_rest_29","f_rest_30","f_rest_31","f_rest_32","f_rest_33","f_rest_34","f_rest_35","f_rest_36","f_rest_37","f_rest_38","f_rest_39","f_rest_40","f_rest_41","f_rest_42","f_rest_43","f_rest_44","f_rest_45"],jo=Rd.map((r,e)=>e),[Ac,tA,nA,iA,sA,rA,oA,aA,lA,cA,Zo,Id,Pd,Sc]=jo,xc=Zo,dA=Id,uA=Pd,Ar=r=>{const e=(31744&r)>>10,t=1023&r;return(r>>15?-1:1)*(e?e===31?t?NaN:1/0:Math.pow(2,e-15)*(1+t/1024):t/1024*6103515625e-14)},kt=class kt{static decodeSectionHeadersFromHeaderLines(e){const t=jo.reduce((d,u)=>(d[Rd[u]]=u,d),{}),n=pr.reduce((d,u)=>(d[bd[u]]=u,d),{}),i=At.getHeaderSectionNames(e);let s;for(let d=0;d<i.length;d++)i[d]==="codebook_centers"&&(s=d);let o=0,a=!1;const l=[];let c=0;for(;!a;){let d;c===s?d=At.decodeSectionHeader(e,n,o):d=At.decodeSectionHeader(e,t,o),a=d.endOfHeader,o=d.headerEndLine+1,a||(d.splatCount=d.vertexCount,d.bytesPerSplat=d.bytesPerVertex),l.push(d),c++}return l}static decodeSectionHeadersFromHeaderText(e){const t=At.convertHeaderTextToLines(e);return kt.decodeSectionHeadersFromHeaderLines(t)}static getSplatCountFromSectionHeaders(e){let t=0;for(let n of e)n.sectionName!=="codebook_centers"&&(t+=n.vertexCount);return t}static decodeHeaderFromHeaderText(e){const t=e.indexOf(At.HeaderEndToken)+At.HeaderEndToken.length+1,n=kt.decodeSectionHeadersFromHeaderText(e),i=kt.getSplatCountFromSectionHeaders(n);return{headerSizeBytes:t,sectionHeaders:n,splatCount:i}}static decodeHeaderFromBuffer(e){const t=At.readHeaderFromBuffer(e);return kt.decodeHeaderFromHeaderText(t)}static findVertexData(e,t,n){let i=t.headerSizeBytes;for(let s=0;s<n&&s<t.sectionHeaders.length;s++){const o=t.sectionHeaders[s];i+=o.dataSizeBytes}return new DataView(e,i,t.sectionHeaders[n].dataSizeBytes)}static decodeCodeBook(e,t){const n=[],i=[];for(let s=0;s<t.vertexCount;s++){At.readVertex(e,t,s,0,pr,n);for(let o of pr){const a=pr[o];let l=i[a];l||(i[a]=l=[]),l.push(n[o])}}for(let s=0;s<i.length;s++){const o=i[s],a=.28209479177387814;for(let l=0;l<o.length;l++){const c=Ar(o[l]);s===gc?o[l]=Math.round(1/(1+Math.exp(-c))*255):s===mr?o[l]=Math.round((.5+a*c)*255):s===gr?o[l]=Math.exp(c):o[l]=c}}return i}static decodeSectionSplatData(e,t,n,i,s){s=Math.min(s,n.sphericalHarmonicsDegree);const o=new he(s);for(let a=0;a<t;a++){const l=kt.parseToUncompressedSplat(e,a,n,i,0,s);o.addSplat(l)}return o}static readSplat(e,t,n,i,s){return At.readVertex(e,t,n,i,jo,s,!1)}static parseToUncompressedSplatArray(e,t=0){const n=[],i=kt.decodeHeaderFromBuffer(e,t);let s;for(let a=0;a<i.sectionHeaders.length;a++){const l=i.sectionHeaders[a];if(l.sectionName==="codebook_centers"){const c=kt.findVertexData(e,i,a);s=kt.decodeCodeBook(c,l)}}for(let a=0;a<i.sectionHeaders.length;a++){const l=i.sectionHeaders[a];if(l.sectionName!=="codebook_centers"){const c=l.vertexCount,d=kt.findVertexData(e,i,a),u=kt.decodeSectionSplatData(d,c,l,s,t);n.push(u)}}const o=new he(t);for(let a of n)for(let l of a.splats)o.addSplat(l);return o}};ce(kt,"parseToUncompressedSplat",function(){let e=[];const t=new nt,n=he.OFFSET.X,i=he.OFFSET.Y,s=he.OFFSET.Z,o=he.OFFSET.SCALE0,a=he.OFFSET.SCALE1,l=he.OFFSET.SCALE2,c=he.OFFSET.ROTATION0,d=he.OFFSET.ROTATION1,u=he.OFFSET.ROTATION2,f=he.OFFSET.ROTATION3,h=he.OFFSET.FDC0,g=he.OFFSET.FDC1,A=he.OFFSET.FDC2,p=he.OFFSET.OPACITY,m=[];for(let S=0;S<45;S++)m[S]=he.OFFSET.FRC0+S;return function(S,x,v,E,C=0,y=0){y=Math.min(y,v.sphericalHarmonicsDegree),kt.readSplat(S,v,x,C,e);const R=he.createSplat(y);if(e[Ac]!==void 0?(R[o]=E[gr][e[Ac]],R[a]=E[gr][e[tA]],R[l]=E[gr][e[nA]]):(R[o]=.01,R[a]=.01,R[l]=.01),e[Zo]!==void 0?(R[h]=E[mr][e[Zo]],R[g]=E[mr][e[Id]],R[A]=E[mr][e[Pd]]):e[xc]!==void 0?(R[h]=e[xc]*255,R[g]=e[dA]*255,R[A]=e[uA]*255):(R[h]=0,R[g]=0,R[A]=0),e[Sc]!==void 0&&(R[p]=E[gc][e[Sc]]),R[h]=ut(Math.floor(R[h]),0,255),R[g]=ut(Math.floor(R[g]),0,255),R[A]=ut(Math.floor(R[A]),0,255),R[p]=ut(Math.floor(R[p]),0,255),y>=1&&v.sphericalHarmonicsDegree>=1){for(let D=0;D<9;D++){const F=E[$0+D%3];R[m[D]]=F[e[v.sphericalHarmonicsDegree1Fields[D]]]}if(y>=2&&v.sphericalHarmonicsDegree>=2)for(let D=0;D<15;D++){const F=E[J0+D%5];R[m[9+D]]=F[e[v.sphericalHarmonicsDegree2Fields[D]]]}}const M=E[eA][e[iA]],_=E[Do][e[sA]],I=E[Do][e[rA]],L=E[Do][e[oA]];return t.set(M,_,I,L),t.normalize(),R[c]=t.x,R[d]=t.y,R[u]=t.z,R[f]=t.w,R[n]=Ar(e[aA]),R[i]=Ar(e[lA]),R[s]=Ar(e[cA]),R}}());let $o=kt;class _c{static parseToUncompressedSplatArray(e,t=0){const n=At.determineHeaderFormatFromPlyBuffer(e);if(n===Nt.PlayCanvasCompressed)return Un.parseToUncompressedSplatArray(e,t);if(n===Nt.INRIAV1)return zn.parseToUncompressedSplatArray(e,t);if(n===Nt.INRIAV2)return $o.parseToUncompressedSplatArray(e,t)}static parseToUncompressedSplatBuffer(e,t=0){const n=At.determineHeaderFormatFromPlyBuffer(e);if(n===Nt.PlayCanvasCompressed)return Un.parseToUncompressedSplatBuffer(e,t);if(n===Nt.INRIAV1)return zn.parseToUncompressedSplatBuffer(e,t);if(n===Nt.INRIAV2)throw new Error("parseToUncompressedSplatBuffer() is not implemented for INRIA V2 PLY files")}}class Ca{constructor(e,t,n,i){this.sectionCount=e,this.sectionFilters=t,this.groupingParameters=n,this.partitionGenerator=i}partitionUncompressedSplatArray(e){let t,n,i;if(this.partitionGenerator){const o=this.partitionGenerator(e);t=o.groupingParameters,n=o.sectionCount,i=o.sectionFilters}else t=this.groupingParameters,n=this.sectionCount,i=this.sectionFilters;const s=[];for(let o=0;o<n;o++){const a=new he(e.sphericalHarmonicsDegree),l=i[o];for(let c=0;c<e.splatCount;c++)l(c)&&a.addSplat(e.splats[c]);s.push(a)}return{splatArrays:s,parameters:t}}static getStandardPartitioner(e=0,t=new b,n=_e.BucketBlockSize,i=_e.BucketSize){const s=o=>{const a=he.OFFSET.X,l=he.OFFSET.Y,c=he.OFFSET.Z;e<=0&&(e=o.splatCount);const d=new b,u=.5,f=m=>{m.x=Math.floor(m.x/u)*u,m.y=Math.floor(m.y/u)*u,m.z=Math.floor(m.z/u)*u};o.splats.forEach(m=>{d.set(m[a],m[l],m[c]).sub(t),f(d),m.centerDist=d.lengthSq()}),o.splats.sort((m,S)=>{let x=m.centerDist,v=S.centerDist;return x>v?1:-1});const h=[],g=[];e=Math.min(o.splatCount,e);const A=Math.ceil(o.splatCount/e);let p=0;for(let m=0;m<A;m++){let S=p;h.push(x=>x>=S&&x<S+e),g.push({blocksSize:n,bucketSize:i}),p+=e}return{sectionCount:h.length,sectionFilters:h,groupingParameters:g}};return new Ca(void 0,void 0,void 0,s)}}class Hs{constructor(e,t,n,i,s,o,a){this.splatPartitioner=e,this.alphaRemovalThreshold=t,this.compressionLevel=n,this.sectionSize=i,this.sceneCenter=s?new b().copy(s):void 0,this.blockSize=o,this.bucketSize=a}generateFromUncompressedSplatArray(e){const t=this.splatPartitioner.partitionUncompressedSplatArray(e);return _e.generateFromUncompressedSplatArrays(t.splatArrays,this.alphaRemovalThreshold,this.compressionLevel,this.sceneCenter,this.blockSize,this.bucketSize,t.parameters)}static getStandardGenerator(e=1,t=1,n=0,i=new b,s=_e.BucketBlockSize,o=_e.BucketSize){const a=Ca.getStandardPartitioner(n,i,s,o);return new Hs(a,e,t,n,i,s,o)}}const St={Downloading:0,Processing:1,Done:2};class Dr extends Error{constructor(e){super(e)}}const ct={ProgressiveToSplatBuffer:0,ProgressiveToSplatArray:1,DownloadBeforeProcessing:2};function vc(r,e){let t=0;for(let i of r)t+=i.sizeBytes;(!e||e.byteLength<t)&&(e=new ArrayBuffer(t));let n=0;for(let i of r)new Uint8Array(e,n,i.sizeBytes).set(i.data),n+=i.sizeBytes;return e}function yc(r,e,t,n,i,s,o,a){return e?Hs.getStandardGenerator(t,n,i,s,o,a).generateFromUncompressedSplatArray(r):_e.generateFromUncompressedSplatArrays([r],t,0,new b)}class Ea{static loadFromURL(e,t,n,i,s,o,a=!0,l=0,c,d,u,f,h){let g;!n&&!a?g=ct.DownloadBeforeProcessing:a?g=ct.ProgressiveToSplatArray:g=ct.ProgressiveToSplatBuffer;const A=Ye.ProgressiveLoadSectionSize,p=_e.HeaderSizeBytes+_e.SectionHeaderSizeBytes,m=1;let S,x,v,E,C,y=0,R=0,M=0,_=!1,I=!1,L=!1;const D=pa();let F=0,z=0,N=0,G=0,k="",Y=null,J=[],de;const Re=new TextDecoder,Pe=(W,$,se)=>{const ne=W>=100;if(se&&(J.push({data:se,sizeBytes:se.byteLength,startBytes:N,endBytes:N+se.byteLength}),N+=se.byteLength),g===ct.DownloadBeforeProcessing)ne&&D.resolve(J);else{if(_){if(S===Nt.PlayCanvasCompressed&&!I){const Ee=Y.headerSizeBytes+Y.chunkElement.storageSizeBytes;C=vc(J,C),C.byteLength>=Ee&&(Un.readElementData(Y.chunkElement,C,Y.headerSizeBytes),F=Ee,z=Ee,I=!0)}}else if(k+=Re.decode(se),At.checkTextForEndHeader(k)){if(S=At.determineHeaderFormatFromHeaderText(k),S===Nt.INRIAV1)Y=zn.decodeHeaderText(k),l=Math.min(l,Y.sphericalHarmonicsDegree),y=Y.splatCount,I=!0,G=Y.headerSizeBytes+Y.bytesPerSplat*y;else if(S===Nt.PlayCanvasCompressed){if(Y=Un.decodeHeaderText(k),l=Math.min(l,Y.sphericalHarmonicsDegree),g===ct.ProgressiveToSplatBuffer&&l>0)throw new Dr("PlyLoader.loadFromURL() -> Selected PLY format has spherical harmonics data that cannot be progressively loaded.");y=Y.vertexElement.count,G=Y.headerSizeBytes+Y.bytesPerSplat*y+Y.chunkElement.storageSizeBytes}else{if(g===ct.ProgressiveToSplatBuffer)throw new Dr("PlyLoader.loadFromURL() -> Selected PLY format cannot be progressively loaded.");g=ct.DownloadBeforeProcessing;return}if(g===ct.ProgressiveToSplatBuffer){const Ee=_e.CompressionLevels[0].SphericalHarmonicsDegrees[l],ye=p+Ee.BytesPerSplat*y;v=new ArrayBuffer(ye),_e.writeHeaderToBuffer({versionMajor:_e.CurrentMajorVersion,versionMinor:_e.CurrentMinorVersion,maxSectionCount:m,sectionCount:m,maxSplatCount:y,splatCount:0,compressionLevel:0,sceneCenter:new b},v)}else de=new he(l);F=Y.headerSizeBytes,z=Y.headerSizeBytes,_=!0}if(_&&I&&J.length>0&&(x=vc(J,x),N-F>A||N>=G&&!L||ne)){const ye=L?Y.sphericalHarmonicsPerSplat:Y.bytesPerSplat,B=(L?N:Math.min(G,N))-z,De=Math.floor(B/ye),Me=De*ye,We=N-z-Me,fe=z-J[0].startBytes,Ge=new DataView(x,fe,Me);if(L)S===Nt.PlayCanvasCompressed&&g===ct.ProgressiveToSplatArray&&(Un.parseSphericalHarmonicsToUncompressedSplatArraySection(Y.chunkElement,Y.shElement,M,M+De-1,Ge,0,l,Y.sphericalHarmonicsDegree,de),M+=De);else{if(g===ct.ProgressiveToSplatBuffer){const Ne=_e.CompressionLevels[0].SphericalHarmonicsDegrees[l],Te=R*Ne.BytesPerSplat+p;S===Nt.PlayCanvasCompressed?Un.parseToUncompressedSplatBufferSection(Y.chunkElement,Y.vertexElement,0,De-1,R,Ge,v,Te):zn.parseToUncompressedSplatBufferSection(Y,0,De-1,Ge,0,v,Te,l)}else S===Nt.PlayCanvasCompressed?Un.parseToUncompressedSplatArraySection(Y.chunkElement,Y.vertexElement,0,De-1,R,Ge,de):zn.parseToUncompressedSplatArraySection(Y,0,De-1,Ge,0,de,l);R+=De,g===ct.ProgressiveToSplatBuffer&&(E||(_e.writeSectionHeaderToBuffer({maxSplatCount:y,splatCount:R,bucketSize:0,bucketCount:0,bucketBlockSize:0,compressionScaleRange:0,storageSizeBytes:0,fullBucketCount:0,partiallyFilledBucketCount:0,sphericalHarmonicsDegree:l},0,v,_e.HeaderSizeBytes),E=new _e(v,!1)),E.updateLoadedCounts(1,R)),N>=G&&(L=!0)}if(We===0)J=[];else{let Ne=[],Te=0;for(let Ke=J.length-1;Ke>=0;Ke--){const P=J[Ke];if(Te+=P.sizeBytes,Ne.unshift(P),Te>=We)break}J=Ne}F+=A,z+=Me}i&&E&&i(E,ne),ne&&(g===ct.ProgressiveToSplatBuffer?D.resolve(E):D.resolve(de))}t&&t(W,$,St.Downloading)};return t&&t(0,"0%",St.Downloading),Wr(e,Pe,!1,c).then(()=>(t&&t(0,"0%",St.Processing),D.promise.then(W=>{if(t&&t(100,"100%",St.Done),g===ct.DownloadBeforeProcessing){const $=J.map(se=>se.data);return new Blob($).arrayBuffer().then(se=>Ea.loadFromFileData(se,s,o,a,l,d,u,f,h))}else return g===ct.ProgressiveToSplatBuffer?W:jt(()=>yc(W,a,s,o,d,u,f,h))})))}static loadFromFileData(e,t,n,i,s=0,o,a,l,c){return i?jt(()=>_c.parseToUncompressedSplatArray(e,s)).then(d=>yc(d,i,t,n,o,a,l,c)):jt(()=>_c.parseToUncompressedSplatBuffer(e,s))}}const hA=r=>new ReadableStream({async start(e){e.enqueue(r),e.close()}});async function fA(r){try{const e=hA(r);if(!e)throw new Error("Failed to create stream from data");return await pA(e)}catch(e){throw console.error("Error decompressing gzipped data:",e),e}}async function pA(r){const e=r.pipeThrough(new DecompressionStream("gzip")),n=await new Response(e).arrayBuffer();return new Uint8Array(n)}const mA=1347635022,gA=1,AA=.15;function SA(r){const e=r>>15&1,t=r>>10&31,n=r&1023,i=e===1?-1:1;return t===0?i*Math.pow(2,-14)*n/1024:t===31?n!==0?NaN:i*(1/0):i*Math.pow(2,t-15)*(1+n/1024)}function xA(r){return(r-128)/128}function _i(r){switch(r){case 0:return 0;case 1:return 3;case 2:return 8;case 3:return 15;default:return console.error(`[SPZ: ERROR] Unsupported SH degree: ${r}`),0}}const _A=function(){let r=[];const e=new nt,t=he.OFFSET.X,n=he.OFFSET.Y,i=he.OFFSET.Z,s=he.OFFSET.SCALE0,o=he.OFFSET.SCALE1,a=he.OFFSET.SCALE2,l=he.OFFSET.ROTATION0,c=he.OFFSET.ROTATION1,d=he.OFFSET.ROTATION2,u=he.OFFSET.ROTATION3,f=he.OFFSET.FDC0,h=he.OFFSET.FDC1,g=he.OFFSET.FDC2,A=he.OFFSET.OPACITY,p=[_i(0),_i(1),_i(2),_i(3)],m=[0,1,2,9,10,11,12,13,24,25,26,27,28,29,30,3,4,5,14,15,16,17,18,31,32,33,34,35,36,37,6,7,8,19,20,21,22,23,38,39,40,41,42,43,44];return function(S,x,v){v=Math.min(x,v);const E=he.createSplat(v);S.scale[0]!==void 0?(E[s]=S.scale[0],E[o]=S.scale[1],E[a]=S.scale[2]):(E[s]=.01,E[o]=.01,E[a]=.01),S.color[0]!==void 0?(E[f]=S.color[0],E[h]=S.color[1],E[g]=S.color[2]):r[RED]!==void 0?(E[f]=r[RED]*255,E[h]=r[GREEN]*255,E[g]=r[BLUE]*255):(E[f]=0,E[h]=0,E[g]=0),S.alpha!==void 0&&(E[A]=S.alpha),E[f]=ut(Math.floor(E[f]),0,255),E[h]=ut(Math.floor(E[h]),0,255),E[g]=ut(Math.floor(E[g]),0,255),E[A]=ut(Math.floor(E[A]),0,255);let C=p[v],y=p[x];for(let R=0;R<3;++R)for(let M=0;M<15;++M){const _=m[R*15+M];M<C&&M<y&&(E[he.OFFSET.FRC0+_]=S.sh[R*y+M])}return e.set(S.rotation[3],S.rotation[0],S.rotation[1],S.rotation[2]),e.normalize(),E[l]=e.x,E[c]=e.y,E[d]=e.z,E[u]=e.w,E[t]=S.position[0],E[n]=S.position[1],E[i]=S.position[2],E}}();function vA(r,e,t,n){return!(r.positions.length!==e*3*(n?2:3)||r.scales.length!==e*3||r.rotations.length!==e*3||r.alphas.length!==e||r.colors.length!==e*3||r.sh.length!==e*t*3)}function Mc(r,e,t,n,i){e=Math.min(e,r.shDegree);const s=r.numPoints,o=_i(r.shDegree),a=r.positions.length===s*3*2;if(!vA(r,s,o,a))return null;const l={position:[],scale:[],rotation:[],alpha:void 0,color:[],sh:[]};let c;a&&(c=new Uint16Array(r.positions.buffer,r.positions.byteOffset,s*3));const d=1/(1<<r.fractionalBits),u=_i(r.shDegree),f=.28209479177387814;for(let h=0;h<s;h++){if(a)for(let S=0;S<3;S++)l.position[S]=SA(c[h*3+S]);else for(let S=0;S<3;S++){const x=h*9+S*3;let v=r.positions[x];v|=r.positions[x+1]<<8,v|=r.positions[x+2]<<16,v|=v&8388608?4278190080:0,l.position[S]=v*d}for(let S=0;S<3;S++)l.scale[S]=Math.exp(r.scales[h*3+S]/16-10);const g=r.rotations.subarray(h*3,h*3+3),A=[g[0]/127.5-1,g[1]/127.5-1,g[2]/127.5-1];l.rotation[0]=A[0],l.rotation[1]=A[1],l.rotation[2]=A[2];const p=A[0]*A[0]+A[1]*A[1]+A[2]*A[2];l.rotation[3]=Math.sqrt(Math.max(0,1-p)),l.alpha=Math.floor(r.alphas[h]);for(let S=0;S<3;S++)l.color[S]=Math.floor(((r.colors[h*3+S]/255-.5)/AA*f+.5)*255);for(let S=0;S<3;S++)for(let x=0;x<u;x++)l.sh[S*u+x]=xA(r.sh[u*3*h+x*3+S]);const m=_A(l,r.shDegree,e);if(t){const S=_e.CompressionLevels[0].SphericalHarmonicsDegrees[e].BytesPerSplat,x=h*S+i;_e.writeSplatDataToSectionBuffer(m,n,x,0,e)}else n.addSplat(m)}}const yA=16,MA=1e7;function CA(r){const e=new DataView(r);let t=0;const n={magic:e.getUint32(t,!0),version:e.getUint32(t+4,!0),numPoints:e.getUint32(t+8,!0),shDegree:e.getUint8(t+12),fractionalBits:e.getUint8(t+13),flags:e.getUint8(t+14),reserved:e.getUint8(t+15)};if(t+=yA,n.magic!==mA)return console.error("[SPZ ERROR] deserializePackedGaussians: header not found"),null;if(n.version<1||n.version>2)return console.error(`[SPZ ERROR] deserializePackedGaussians: version not supported: ${n.version}`),null;if(n.numPoints>MA)return console.error(`[SPZ ERROR] deserializePackedGaussians: Too many points: ${n.numPoints}`),null;if(n.shDegree>3)return console.error(`[SPZ ERROR] deserializePackedGaussians: Unsupported SH degree: ${n.shDegree}`),null;const i=n.numPoints,s=_i(n.shDegree),o=n.version===1,a={numPoints:i,shDegree:n.shDegree,fractionalBits:n.fractionalBits,antialiased:(n.flags&gA)!==0,positions:new Uint8Array(i*3*(o?2:3)),scales:new Uint8Array(i*3),rotations:new Uint8Array(i*3),alphas:new Uint8Array(i),colors:new Uint8Array(i*3),sh:new Uint8Array(i*s*3)};try{const l=new Uint8Array(r);let c=a.positions.length,d=t;if(a.positions.set(l.slice(d,d+c)),d+=c,a.alphas.set(l.slice(d,d+a.alphas.length)),d+=a.alphas.length,a.colors.set(l.slice(d,d+a.colors.length)),d+=a.colors.length,a.scales.set(l.slice(d,d+a.scales.length)),d+=a.scales.length,a.rotations.set(l.slice(d,d+a.rotations.length)),d+=a.rotations.length,a.sh.set(l.slice(d,d+a.sh.length)),d+a.sh.length!==r.byteLength)return console.error("[SPZ ERROR] deserializePackedGaussians: incorrect buffer size"),null}catch(l){return console.error("[SPZ ERROR] deserializePackedGaussians: read error",l),null}return a}async function EA(r){try{const e=await fA(r);return CA(e.buffer)}catch(e){return console.error("[SPZ ERROR] loadSpzPacked: decompression error",e),null}}class Ta{static loadFromURL(e,t,n,i,s=!0,o=0,a,l,c,d,u){return t&&t(0,"0%",St.Downloading),Wr(e,t,!0,a).then(f=>(t&&t(0,"0%",St.Processing),Ta.loadFromFileData(f,n,i,s,o,l,c,d,u)))}static async loadFromFileData(e,t,n,i,s=0,o,a,l,c){await jt();const d=await EA(e);s=Math.min(d.shDegree,s);const u=new he(s);if(i)return Mc(d,s,!1,u,0),Hs.getStandardGenerator(t,n,o,a,l,c).generateFromUncompressedSplatArray(u);{const{splatBuffer:f,splatBufferDataOffsetBytes:h}=_e.preallocateUncompressed(d.numPoints,s);return Mc(d,s,!0,f.bufferData,h),f}}}const et=class et{static parseToUncompressedSplatBufferSection(e,t,n,i,s,o){const a=_e.CompressionLevels[0].BytesPerCenter,l=_e.CompressionLevels[0].BytesPerScale,c=_e.CompressionLevels[0].BytesPerRotation,d=_e.CompressionLevels[0].SphericalHarmonicsDegrees[0].BytesPerSplat;for(let u=e;u<=t;u++){const f=u*et.RowSizeBytes+i,h=new Float32Array(n,f,3),g=new Float32Array(n,f+et.CenterSizeBytes,3),A=new Uint8Array(n,f+et.CenterSizeBytes+et.ScaleSizeBytes,4),p=new Uint8Array(n,f+et.CenterSizeBytes+et.ScaleSizeBytes+et.RotationSizeBytes,4),m=new nt((p[1]-128)/128,(p[2]-128)/128,(p[3]-128)/128,(p[0]-128)/128);m.normalize();const S=u*d+o,x=new Float32Array(s,S,3),v=new Float32Array(s,S+a,3),E=new Float32Array(s,S+a+l,4),C=new Uint8Array(s,S+a+l+c,4);x[0]=h[0],x[1]=h[1],x[2]=h[2],v[0]=g[0],v[1]=g[1],v[2]=g[2],E[0]=m.w,E[1]=m.x,E[2]=m.y,E[3]=m.z,C[0]=A[0],C[1]=A[1],C[2]=A[2],C[3]=A[3]}}static parseToUncompressedSplatArraySection(e,t,n,i,s){for(let o=e;o<=t;o++){const a=o*et.RowSizeBytes+i,l=new Float32Array(n,a,3),c=new Float32Array(n,a+et.CenterSizeBytes,3),d=new Uint8Array(n,a+et.CenterSizeBytes+et.ScaleSizeBytes,4),u=new Uint8Array(n,a+et.CenterSizeBytes+et.ScaleSizeBytes+et.RotationSizeBytes,4),f=new nt((u[1]-128)/128,(u[2]-128)/128,(u[3]-128)/128,(u[0]-128)/128);f.normalize(),s.addSplatFromComonents(l[0],l[1],l[2],c[0],c[1],c[2],f.w,f.x,f.y,f.z,d[0],d[1],d[2],d[3])}}static parseStandardSplatToUncompressedSplatArray(e){const t=e.byteLength/et.RowSizeBytes,n=new he;for(let i=0;i<t;i++){const s=i*et.RowSizeBytes,o=new Float32Array(e,s,3),a=new Float32Array(e,s+et.CenterSizeBytes,3),l=new Uint8Array(e,s+et.CenterSizeBytes+et.ScaleSizeBytes,4),c=new Uint8Array(e,s+et.CenterSizeBytes+et.ScaleSizeBytes+et.ColorSizeBytes,4),d=new nt((c[1]-128)/128,(c[2]-128)/128,(c[3]-128)/128,(c[0]-128)/128);d.normalize(),n.addSplatFromComonents(o[0],o[1],o[2],a[0],a[1],a[2],d.w,d.x,d.y,d.z,l[0],l[1],l[2],l[3])}return n}};ce(et,"RowSizeBytes",32),ce(et,"CenterSizeBytes",12),ce(et,"ScaleSizeBytes",12),ce(et,"RotationSizeBytes",4),ce(et,"ColorSizeBytes",4);let gi=et;function Cc(r,e,t,n,i,s,o,a){return e?Hs.getStandardGenerator(t,n,i,s,o,a).generateFromUncompressedSplatArray(r):_e.generateFromUncompressedSplatArrays([r],t,0,new b)}class wa{static loadFromURL(e,t,n,i,s,o,a=!0,l,c,d,u,f){let h=n?ct.ProgressiveToSplatBuffer:ct.ProgressiveToSplatArray;a&&(h=ct.ProgressiveToSplatArray);const g=_e.HeaderSizeBytes+_e.SectionHeaderSizeBytes,A=Ye.ProgressiveLoadSectionSize,p=1;let m,S,x,v=0,E=0,C;const y=pa();let R=0,M=0,_=[];const I=(L,D,F,z)=>{const N=L>=100;if(F&&_.push(F),h===ct.DownloadBeforeProcessing){N&&y.resolve(_);return}if(!z){if(n)throw new Dr("Cannon directly load .splat because no file size info is available.");h=ct.DownloadBeforeProcessing;return}if(!m){v=z/gi.RowSizeBytes,m=new ArrayBuffer(z);const G=_e.CompressionLevels[0].SphericalHarmonicsDegrees[0].BytesPerSplat,k=g+G*v;h===ct.ProgressiveToSplatBuffer?(S=new ArrayBuffer(k),_e.writeHeaderToBuffer({versionMajor:_e.CurrentMajorVersion,versionMinor:_e.CurrentMinorVersion,maxSectionCount:p,sectionCount:p,maxSplatCount:v,splatCount:E,compressionLevel:0,sceneCenter:new b},S)):C=new he(0)}if(F){new Uint8Array(m,M,F.byteLength).set(new Uint8Array(F)),M+=F.byteLength;const G=M-R;if(G>A||N){const Y=(N?G:A)/gi.RowSizeBytes,J=E+Y;h===ct.ProgressiveToSplatBuffer?gi.parseToUncompressedSplatBufferSection(E,J-1,m,0,S,g):gi.parseToUncompressedSplatArraySection(E,J-1,m,0,C),E=J,h===ct.ProgressiveToSplatBuffer&&(x||(_e.writeSectionHeaderToBuffer({maxSplatCount:v,splatCount:E,bucketSize:0,bucketCount:0,bucketBlockSize:0,compressionScaleRange:0,storageSizeBytes:0,fullBucketCount:0,partiallyFilledBucketCount:0},0,S,_e.HeaderSizeBytes),x=new _e(S,!1)),x.updateLoadedCounts(1,E),i&&i(x,N)),R+=A}}N&&(h===ct.ProgressiveToSplatBuffer?y.resolve(x):y.resolve(C)),t&&t(L,D,St.Downloading)};return t&&t(0,"0%",St.Downloading),Wr(e,I,!1,l).then(()=>(t&&t(0,"0%",St.Processing),y.promise.then(L=>(t&&t(100,"100%",St.Done),h===ct.DownloadBeforeProcessing?new Blob(_).arrayBuffer().then(D=>wa.loadFromFileData(D,s,o,a,c,d,u,f)):h===ct.ProgressiveToSplatBuffer?L:jt(()=>Cc(L,a,s,o,c,d,u,f))))))}static loadFromFileData(e,t,n,i,s,o,a,l){return jt(()=>{const c=gi.parseStandardSplatToUncompressedSplatArray(e);return Cc(c,i,t,n,s,o,a,l)})}}const Zi=class Zi{static checkVersion(e){const t=_e.CurrentMajorVersion,n=_e.CurrentMinorVersion,i=_e.parseHeader(e);if(i.versionMajor===t&&i.versionMinor>=n||i.versionMajor>t)return!0;throw new Error(`KSplat version not supported: v${i.versionMajor}.${i.versionMinor}. Minimum required: v${t}.${n}`)}static loadFromURL(e,t,n,i,s){let o,a,l,c,d=!1,u=!1,f,h=[],g=!1,A=!1,p=0,m=0,S=0,x=!1,v=!1,E=!1,C=[];const y=pa(),R=()=>{!d&&!u&&p>=_e.HeaderSizeBytes&&(u=!0,new Blob(C).arrayBuffer().then(z=>{l=new ArrayBuffer(_e.HeaderSizeBytes),new Uint8Array(l).set(new Uint8Array(z,0,_e.HeaderSizeBytes)),Zi.checkVersion(l),u=!1,d=!0,c=_e.parseHeader(l),window.setTimeout(()=>{I()},1)}))};let M=0;const _=()=>{M===0&&(M++,window.setTimeout(()=>{M--,L()},1))},I=()=>{const F=()=>{A=!0,new Blob(C).arrayBuffer().then(N=>{A=!1,g=!0,f=new ArrayBuffer(c.maxSectionCount*_e.SectionHeaderSizeBytes),new Uint8Array(f).set(new Uint8Array(N,_e.HeaderSizeBytes,c.maxSectionCount*_e.SectionHeaderSizeBytes)),h=_e.parseSectionHeaders(c,f,0,!1);let G=0;for(let Y=0;Y<c.maxSectionCount;Y++)G+=h[Y].storageSizeBytes;const k=_e.HeaderSizeBytes+c.maxSectionCount*_e.SectionHeaderSizeBytes+G;if(!o){o=new ArrayBuffer(k);let Y=0;for(let J=0;J<C.length;J++){const de=C[J];new Uint8Array(o,Y,de.byteLength).set(new Uint8Array(de)),Y+=de.byteLength}}S=_e.HeaderSizeBytes+_e.SectionHeaderSizeBytes*c.maxSectionCount;for(let Y=0;Y<=h.length&&Y<c.maxSectionCount;Y++)S+=h[Y].storageSizeBytes;_()})};!A&&!g&&d&&p>=_e.HeaderSizeBytes+_e.SectionHeaderSizeBytes*c.maxSectionCount&&F()},L=()=>{if(E)return;E=!0;const F=()=>{if(E=!1,g){if(v)return;if(x=p>=S,p-m>Ye.ProgressiveLoadSectionSize||x){m+=Ye.ProgressiveLoadSectionSize,v=m>=S,a||(a=new _e(o,!1));const N=_e.HeaderSizeBytes+_e.SectionHeaderSizeBytes*c.maxSectionCount;let G=0,k=0,Y=0;for(let Re=0;Re<c.maxSectionCount;Re++){const Pe=h[Re],W=G+Pe.partiallyFilledBucketCount*4+Pe.bucketStorageSizeBytes*Pe.bucketCount,$=N+W;if(m>=$){k++;const se=m-$,ye=_e.CompressionLevels[c.compressionLevel].SphericalHarmonicsDegrees[Pe.sphericalHarmonicsDegree].BytesPerSplat;let Ie=Math.floor(se/ye);Ie=Math.min(Ie,Pe.maxSplatCount),Y+=Ie,a.updateLoadedCounts(k,Y),a.updateSectionLoadedCounts(Re,Ie)}else break;G+=Pe.storageSizeBytes}i(a,v);const J=m/S*100,de=J.toFixed(2)+"%";t&&t(J,de,St.Downloading),v?y.resolve(a):L()}}};window.setTimeout(F,Ye.ProgressiveLoadSectionDelayDuration)};return Wr(e,(F,z,N)=>{N&&(C.push(N),o&&new Uint8Array(o,p,N.byteLength).set(new Uint8Array(N)),p+=N.byteLength),n?(R(),I(),L()):t&&t(F,z,St.Downloading)},!n,s).then(F=>(t&&t(0,"0%",St.Processing),(n?y.promise:Zi.loadFromFileData(F)).then(N=>(t&&t(100,"100%",St.Done),N))))}static loadFromFileData(e){return jt(()=>(Zi.checkVersion(e),new _e(e)))}};ce(Zi,"downloadFile",function(){let e;return function(t,n){const i=new Blob([t.bufferData],{type:"application/octet-stream"});e||(e=document.createElement("a"),document.body.appendChild(e)),e.download=n,e.href=URL.createObjectURL(i),e.click()}}());let Jo=Zi;const Ot={Splat:0,KSplat:1,Ply:2,Spz:3},Ec=r=>r.endsWith(".ply")?Ot.Ply:r.endsWith(".splat")?Ot.Splat:r.endsWith(".ksplat")?Ot.KSplat:r.endsWith(".spz")?Ot.Spz:null,Tc={type:"change"},Fo={type:"start"},wc={type:"end"},Sr=new la,bc=new Fn,TA=Math.cos(70*yi.DEG2RAD);class xr extends Ci{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new b,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"KeyA",UP:"KeyW",RIGHT:"KeyD",BOTTOM:"KeyS"},this.mouseButtons={LEFT:Ei.ROTATE,MIDDLE:Ei.DOLLY,RIGHT:Ei.PAN},this.touches={ONE:Ti.ROTATE,TWO:Ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(O){O.addEventListener("keydown",ie),this._domElementKeyEvents=O},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ie),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,this.clearDampedRotation(),this.clearDampedPan(),n.object.updateProjectionMatrix(),n.dispatchEvent(Tc),n.update(),s=i.NONE},this.clearDampedRotation=function(){l.theta=0,l.phi=0},this.clearDampedPan=function(){d.set(0,0,0)},this.update=function(){const O=new b,te=new nt().setFromUnitVectors(e.up,new b(0,1,0)),oe=te.clone().invert(),we=new b,Oe=new nt,it=new b,U=2*Math.PI;return function(){te.setFromUnitVectors(e.up,new b(0,1,0)),oe.copy(te).invert();const j=n.object.position;O.copy(j).sub(n.target),O.applyQuaternion(te),a.setFromVector3(O),n.autoRotate&&s===i.NONE&&I(M()),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Z=n.minAzimuthAngle,ae=n.maxAzimuthAngle;isFinite(Z)&&isFinite(ae)&&(Z<-Math.PI?Z+=U:Z>Math.PI&&(Z-=U),ae<-Math.PI?ae+=U:ae>Math.PI&&(ae-=U),Z<=ae?a.theta=Math.max(Z,Math.min(ae,a.theta)):a.theta=a.theta>(Z+ae)/2?Math.max(Z,a.theta):Math.min(ae,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.zoomToCursor&&C||n.object.isOrthographicCamera?a.radius=Y(a.radius):a.radius=Y(a.radius*c),O.setFromSpherical(a),O.applyQuaternion(oe),j.copy(n.target).add(O),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),d.set(0,0,0));let Be=!1;if(n.zoomToCursor&&C){let Qe=null;if(n.object.isPerspectiveCamera){const at=O.length();Qe=Y(at*c);const ht=at-Qe;n.object.position.addScaledVector(v,ht),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const at=new b(E.x,E.y,0);at.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Be=!0;const ht=new b(E.x,E.y,0);ht.unproject(n.object),n.object.position.sub(ht).add(at),n.object.updateMatrixWorld(),Qe=O.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Qe!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Qe).add(n.object.position):(Sr.origin.copy(n.object.position),Sr.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Sr.direction))<TA?e.lookAt(n.target):(bc.setFromNormalAndCoplanarPoint(n.object.up,n.target),Sr.intersectPlane(bc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Be=!0);return c=1,C=!1,Be||we.distanceToSquared(n.object.position)>o||8*(1-Oe.dot(n.object.quaternion))>o||it.distanceToSquared(n.target)>0?(n.dispatchEvent(Tc),we.copy(n.object.position),Oe.copy(n.object.quaternion),it.copy(n.target),Be=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",pe),n.domElement.removeEventListener("pointerdown",Te),n.domElement.removeEventListener("pointercancel",P),n.domElement.removeEventListener("wheel",ee),n.domElement.removeEventListener("pointermove",Ke),n.domElement.removeEventListener("pointerup",P),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ie),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new oc,l=new oc;let c=1;const d=new b,u=new xe,f=new xe,h=new xe,g=new xe,A=new xe,p=new xe,m=new xe,S=new xe,x=new xe,v=new b,E=new xe;let C=!1;const y=[],R={};function M(){return 2*Math.PI/60/60*n.autoRotateSpeed}function _(){return Math.pow(.95,n.zoomSpeed)}function I(O){l.theta-=O}function L(O){l.phi-=O}const D=function(){const O=new b;return function(oe,we){O.setFromMatrixColumn(we,0),O.multiplyScalar(-oe),d.add(O)}}(),F=function(){const O=new b;return function(oe,we){n.screenSpacePanning===!0?O.setFromMatrixColumn(we,1):(O.setFromMatrixColumn(we,0),O.crossVectors(n.object.up,O)),O.multiplyScalar(oe),d.add(O)}}(),z=function(){const O=new b;return function(oe,we){const Oe=n.domElement;if(n.object.isPerspectiveCamera){const it=n.object.position;O.copy(it).sub(n.target);let U=O.length();U*=Math.tan(n.object.fov/2*Math.PI/180),D(2*oe*U/Oe.clientHeight,n.object.matrix),F(2*we*U/Oe.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(oe*(n.object.right-n.object.left)/n.object.zoom/Oe.clientWidth,n.object.matrix),F(we*(n.object.top-n.object.bottom)/n.object.zoom/Oe.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function N(O){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=O:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function G(O){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=O:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(O){if(!n.zoomToCursor)return;C=!0;const te=n.domElement.getBoundingClientRect(),oe=O.clientX-te.left,we=O.clientY-te.top,Oe=te.width,it=te.height;E.x=oe/Oe*2-1,E.y=-(we/it)*2+1,v.set(E.x,E.y,1).unproject(e).sub(e.position).normalize()}function Y(O){return Math.max(n.minDistance,Math.min(n.maxDistance,O))}function J(O){u.set(O.clientX,O.clientY)}function de(O){k(O),m.set(O.clientX,O.clientY)}function Re(O){g.set(O.clientX,O.clientY)}function Pe(O){f.set(O.clientX,O.clientY),h.subVectors(f,u).multiplyScalar(n.rotateSpeed);const te=n.domElement;I(2*Math.PI*h.x/te.clientHeight),L(2*Math.PI*h.y/te.clientHeight),u.copy(f),n.update()}function W(O){S.set(O.clientX,O.clientY),x.subVectors(S,m),x.y>0?N(_()):x.y<0&&G(_()),m.copy(S),n.update()}function $(O){A.set(O.clientX,O.clientY),p.subVectors(A,g).multiplyScalar(n.panSpeed),z(p.x,p.y),g.copy(A),n.update()}function se(O){k(O),O.deltaY<0?G(_()):O.deltaY>0&&N(_()),n.update()}function ne(O){let te=!1;switch(O.code){case n.keys.UP:O.ctrlKey||O.metaKey||O.shiftKey?L(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,n.keyPanSpeed),te=!0;break;case n.keys.BOTTOM:O.ctrlKey||O.metaKey||O.shiftKey?L(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,-n.keyPanSpeed),te=!0;break;case n.keys.LEFT:O.ctrlKey||O.metaKey||O.shiftKey?I(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(n.keyPanSpeed,0),te=!0;break;case n.keys.RIGHT:O.ctrlKey||O.metaKey||O.shiftKey?I(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(-n.keyPanSpeed,0),te=!0;break}te&&(O.preventDefault(),n.update())}function Ee(){if(y.length===1)u.set(y[0].pageX,y[0].pageY);else{const O=.5*(y[0].pageX+y[1].pageX),te=.5*(y[0].pageY+y[1].pageY);u.set(O,te)}}function ye(){if(y.length===1)g.set(y[0].pageX,y[0].pageY);else{const O=.5*(y[0].pageX+y[1].pageX),te=.5*(y[0].pageY+y[1].pageY);g.set(O,te)}}function Ie(){const O=y[0].pageX-y[1].pageX,te=y[0].pageY-y[1].pageY,oe=Math.sqrt(O*O+te*te);m.set(0,oe)}function B(){n.enableZoom&&Ie(),n.enablePan&&ye()}function De(){n.enableZoom&&Ie(),n.enableRotate&&Ee()}function Me(O){if(y.length==1)f.set(O.pageX,O.pageY);else{const oe=Ce(O),we=.5*(O.pageX+oe.x),Oe=.5*(O.pageY+oe.y);f.set(we,Oe)}h.subVectors(f,u).multiplyScalar(n.rotateSpeed);const te=n.domElement;I(2*Math.PI*h.x/te.clientHeight),L(2*Math.PI*h.y/te.clientHeight),u.copy(f)}function We(O){if(y.length===1)A.set(O.pageX,O.pageY);else{const te=Ce(O),oe=.5*(O.pageX+te.x),we=.5*(O.pageY+te.y);A.set(oe,we)}p.subVectors(A,g).multiplyScalar(n.panSpeed),z(p.x,p.y),g.copy(A)}function fe(O){const te=Ce(O),oe=O.pageX-te.x,we=O.pageY-te.y,Oe=Math.sqrt(oe*oe+we*we);S.set(0,Oe),x.set(0,Math.pow(S.y/m.y,n.zoomSpeed)),N(x.y),m.copy(S)}function Ge(O){n.enableZoom&&fe(O),n.enablePan&&We(O)}function Ne(O){n.enableZoom&&fe(O),n.enableRotate&&Me(O)}function Te(O){n.enabled!==!1&&(y.length===0&&(n.domElement.setPointerCapture(O.pointerId),n.domElement.addEventListener("pointermove",Ke),n.domElement.addEventListener("pointerup",P)),ge(O),O.pointerType==="touch"?re(O):T(O))}function Ke(O){n.enabled!==!1&&(O.pointerType==="touch"?Fe(O):Q(O))}function P(O){Xe(O),y.length===0&&(n.domElement.releasePointerCapture(O.pointerId),n.domElement.removeEventListener("pointermove",Ke),n.domElement.removeEventListener("pointerup",P)),n.dispatchEvent(wc),s=i.NONE}function T(O){let te;switch(O.button){case 0:te=n.mouseButtons.LEFT;break;case 1:te=n.mouseButtons.MIDDLE;break;case 2:te=n.mouseButtons.RIGHT;break;default:te=-1}switch(te){case Ei.DOLLY:if(n.enableZoom===!1)return;de(O),s=i.DOLLY;break;case Ei.ROTATE:if(O.ctrlKey||O.metaKey||O.shiftKey){if(n.enablePan===!1)return;Re(O),s=i.PAN}else{if(n.enableRotate===!1)return;J(O),s=i.ROTATE}break;case Ei.PAN:if(O.ctrlKey||O.metaKey||O.shiftKey){if(n.enableRotate===!1)return;J(O),s=i.ROTATE}else{if(n.enablePan===!1)return;Re(O),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Fo)}function Q(O){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;Pe(O);break;case i.DOLLY:if(n.enableZoom===!1)return;W(O);break;case i.PAN:if(n.enablePan===!1)return;$(O);break}}function ee(O){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(O.preventDefault(),n.dispatchEvent(Fo),se(O),n.dispatchEvent(wc))}function ie(O){n.enabled===!1||n.enablePan===!1||ne(O)}function re(O){switch(le(O),y.length){case 1:switch(n.touches.ONE){case Ti.ROTATE:if(n.enableRotate===!1)return;Ee(),s=i.TOUCH_ROTATE;break;case Ti.PAN:if(n.enablePan===!1)return;ye(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Ti.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;B(),s=i.TOUCH_DOLLY_PAN;break;case Ti.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;De(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Fo)}function Fe(O){switch(le(O),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;Me(O),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;We(O),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ge(O),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ne(O),n.update();break;default:s=i.NONE}}function pe(O){n.enabled!==!1&&O.preventDefault()}function ge(O){y.push(O)}function Xe(O){delete R[O.pointerId];for(let te=0;te<y.length;te++)if(y[te].pointerId==O.pointerId){y.splice(te,1);return}}function le(O){let te=R[O.pointerId];te===void 0&&(te=new xe,R[O.pointerId]=te),te.set(O.pageX,O.pageY)}function Ce(O){const te=O.pointerId===y[0].pointerId?y[1]:y[0];return R[te.pointerId]}n.domElement.addEventListener("contextmenu",pe),n.domElement.addEventListener("pointerdown",Te),n.domElement.addEventListener("pointercancel",P),n.domElement.addEventListener("wheel",ee,{passive:!1}),this.update()}}const wA=(r,e,t,n,i)=>{const s=performance.now();let o=r.style.display==="none"?0:parseFloat(r.style.opacity);isNaN(o)&&(o=1);const a=window.setInterval(()=>{const c=performance.now()-s;let d=Math.min(c/n,1);d>.999&&(d=1);let u;e?(u=(1-d)*o,u<1e-4&&(u=0)):u=(1-o)*d+o,u>0?(r.style.display=t,r.style.opacity=u):r.style.display="none",d>=1&&(i&&i(),window.clearInterval(a))},16);return a},bA=500,Nr=class Nr{constructor(e,t){this.taskIDGen=0,this.elementID=Nr.elementIDGen++,this.tasks=[],this.message=e||"Loading...",this.container=t||document.body,this.spinnerContainerOuter=document.createElement("div"),this.spinnerContainerOuter.className=`spinnerOuterContainer${this.elementID}`,this.spinnerContainerOuter.style.display="none",this.spinnerContainerPrimary=document.createElement("div"),this.spinnerContainerPrimary.className=`spinnerContainerPrimary${this.elementID}`,this.spinnerPrimary=document.createElement("div"),this.spinnerPrimary.classList.add(`spinner${this.elementID}`,`spinnerPrimary${this.elementID}`),this.messageContainerPrimary=document.createElement("div"),this.messageContainerPrimary.classList.add(`messageContainer${this.elementID}`,`messageContainerPrimary${this.elementID}`),this.messageContainerPrimary.innerHTML=this.message,this.spinnerContainerMin=document.createElement("div"),this.spinnerContainerMin.className=`spinnerContainerMin${this.elementID}`,this.spinnerMin=document.createElement("div"),this.spinnerMin.classList.add(`spinner${this.elementID}`,`spinnerMin${this.elementID}`),this.messageContainerMin=document.createElement("div"),this.messageContainerMin.classList.add(`messageContainer${this.elementID}`,`messageContainerMin${this.elementID}`),this.messageContainerMin.innerHTML=this.message,this.spinnerContainerPrimary.appendChild(this.spinnerPrimary),this.spinnerContainerPrimary.appendChild(this.messageContainerPrimary),this.spinnerContainerOuter.appendChild(this.spinnerContainerPrimary),this.spinnerContainerMin.appendChild(this.spinnerMin),this.spinnerContainerMin.appendChild(this.messageContainerMin),this.spinnerContainerOuter.appendChild(this.spinnerContainerMin);const n=document.createElement("style");n.innerHTML=`

            .spinnerOuterContainer${this.elementID} {
                width: 100%;
                height: 100%;
                margin: 0;
                top: 0;
                left: 0;
                position: absolute;
                pointer-events: none;
            }

            .messageContainer${this.elementID} {
                height: 20px;
                font-family: arial;
                font-size: 12pt;
                color: #ffffff;
                text-align: center;
                vertical-align: middle;
            }

            .spinner${this.elementID} {
                padding: 15px;
                background: #07e8d6;
                z-index:99999;
            
                aspect-ratio: 1;
                border-radius: 50%;
                --_m: 
                    conic-gradient(#0000,#000),
                    linear-gradient(#000 0 0) content-box;
                -webkit-mask: var(--_m);
                    mask: var(--_m);
                -webkit-mask-composite: source-out;
                    mask-composite: subtract;
                box-sizing: border-box;
                animation: load 1s linear infinite;
            }

            .spinnerContainerPrimary${this.elementID} {
                z-index:99999;
                background-color: rgba(128, 128, 128, 0.75);
                border: #666666 1px solid;
                border-radius: 5px;
                padding-top: 20px;
                padding-bottom: 10px;
                margin: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-80px, -80px);
                width: 180px;
                pointer-events: auto;
            }

            .spinnerPrimary${this.elementID} {
                width: 120px;
                margin-left: 30px;
            }

            .messageContainerPrimary${this.elementID} {
                padding-top: 15px;
            }

            .spinnerContainerMin${this.elementID} {
                z-index:99999;
                background-color: rgba(128, 128, 128, 0.75);
                border: #666666 1px solid;
                border-radius: 5px;
                padding-top: 20px;
                padding-bottom: 15px;
                margin: 0;
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translate(-50%, 0);
                display: flex;
                flex-direction: left;
                pointer-events: auto;
                min-width: 250px;
            }

            .messageContainerMin${this.elementID} {
                margin-right: 15px;
            }

            .spinnerMin${this.elementID} {
                width: 50px;
                height: 50px;
                margin-left: 15px;
                margin-right: 25px;
            }

            .messageContainerMin${this.elementID} {
                padding-top: 15px;
            }
            
            @keyframes load {
                to{transform: rotate(1turn)}
            }

        `,this.spinnerContainerOuter.appendChild(n),this.container.appendChild(this.spinnerContainerOuter),this.setMinimized(!1,!0),this.fadeTransitions=[]}addTask(e){const t={message:e,id:this.taskIDGen++};return this.tasks.push(t),this.update(),t.id}removeTask(e){let t=0;for(let n of this.tasks){if(n.id===e){this.tasks.splice(t,1);break}t++}this.update()}removeAllTasks(){this.tasks=[],this.update()}setMessageForTask(e,t){for(let n of this.tasks)if(n.id===e){n.message=t;break}this.update()}update(){this.tasks.length>0?(this.show(),this.setMessage(this.tasks[this.tasks.length-1].message)):this.hide()}show(){this.spinnerContainerOuter.style.display="block",this.visible=!0}hide(){this.spinnerContainerOuter.style.display="none",this.visible=!1}setContainer(e){this.container&&this.spinnerContainerOuter.parentElement===this.container&&this.container.removeChild(this.spinnerContainerOuter),e&&(this.container=e,this.container.appendChild(this.spinnerContainerOuter),this.spinnerContainerOuter.style.zIndex=this.container.style.zIndex+1)}setMinimized(e,t){const n=(i,s,o,a,l)=>{o?i.style.display=s?a:"none":this.fadeTransitions[l]=wA(i,!s,a,bA,()=>{this.fadeTransitions[l]=null})};n(this.spinnerContainerPrimary,!e,t,"block",0),n(this.spinnerContainerMin,e,t,"flex",1),this.minimized=e}setMessage(e){this.messageContainerPrimary.innerHTML=e,this.messageContainerMin.innerHTML=e}};ce(Nr,"elementIDGen",0);let ea=Nr;class RA{constructor(e){this.idGen=0,this.tasks=[],this.container=e||document.body,this.progressBarContainerOuter=document.createElement("div"),this.progressBarContainerOuter.className="progressBarOuterContainer",this.progressBarContainerOuter.style.display="none",this.progressBarBox=document.createElement("div"),this.progressBarBox.className="progressBarBox",this.progressBarBackground=document.createElement("div"),this.progressBarBackground.className="progressBarBackground",this.progressBar=document.createElement("div"),this.progressBar.className="progressBar",this.progressBarBackground.appendChild(this.progressBar),this.progressBarBox.appendChild(this.progressBarBackground),this.progressBarContainerOuter.appendChild(this.progressBarBox);const t=document.createElement("style");t.innerHTML=`

            .progressBarOuterContainer {
                width: 100%;
                height: 100%;
                margin: 0;
                top: 0;
                left: 0;
                position: absolute;
                pointer-events: none;
            }

            .progressBarBox {
                z-index:99999;
                padding: 7px 9px 5px 7px;
                background-color: rgba(190, 190, 190, 0.75);
                border: #555555 1px solid;
                border-radius: 15px;
                margin: 0;
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 180px;
                height: 30px;
                pointer-events: auto;
            }

            .progressBarBackground {
                width: 100%;
                height: 25px;
                border-radius:10px;
                background-color: rgba(128, 128, 128, 0.75);
                border: #444444 1px solid;
                box-shadow: inset 0 0 10px #333333;
            }

            .progressBar {
                height: 25px;
                width: 0px;
                border-radius:10px;
                background-color: rgba(0, 200, 0, 0.75);
                box-shadow: inset 0 0 10px #003300;
            }

        `,this.progressBarContainerOuter.appendChild(t),this.container.appendChild(this.progressBarContainerOuter)}show(){this.progressBarContainerOuter.style.display="block"}hide(){this.progressBarContainerOuter.style.display="none"}setProgress(e){this.progressBar.style.width=e+"%"}setContainer(e){this.container&&this.progressBarContainerOuter.parentElement===this.container&&this.container.removeChild(this.progressBarContainerOuter),e&&(this.container=e,this.container.appendChild(this.progressBarContainerOuter),this.progressBarContainerOuter.style.zIndex=this.container.style.zIndex+1)}}class IA{constructor(e){ce(this,"update",function(e,t,n,i,s,o,a,l,c,d,u,f,h,g){const A=`${t.x.toFixed(5)}, ${t.y.toFixed(5)}, ${t.z.toFixed(5)}`;if(this.infoCells.cameraPosition.innerHTML!==A&&(this.infoCells.cameraPosition.innerHTML=A),n){const m=n,S=`${m.x.toFixed(5)}, ${m.y.toFixed(5)}, ${m.z.toFixed(5)}`;this.infoCells.cameraLookAt.innerHTML!==S&&(this.infoCells.cameraLookAt.innerHTML=S)}const p=`${i.x.toFixed(5)}, ${i.y.toFixed(5)}, ${i.z.toFixed(5)}`;if(this.infoCells.cameraUp.innerHTML!==p&&(this.infoCells.cameraUp.innerHTML=p),this.infoCells.orthographicCamera.innerHTML=s?"Orthographic":"Perspective",o){const m=o,S=`${m.x.toFixed(5)}, ${m.y.toFixed(5)}, ${m.z.toFixed(5)}`;this.infoCells.cursorPosition.innerHTML=S}else this.infoCells.cursorPosition.innerHTML="N/A";this.infoCells.fps.innerHTML=a,this.infoCells.renderWindow.innerHTML=`${e.x} x ${e.y}`,this.infoCells.renderSplatCount.innerHTML=`${c} splats out of ${l} (${d.toFixed(2)}%)`,this.infoCells.sortTime.innerHTML=`${u.toFixed(3)} ms`,this.infoCells.focalAdjustment.innerHTML=`${f.toFixed(3)}`,this.infoCells.splatScale.innerHTML=`${h.toFixed(3)}`,this.infoCells.pointCloudMode.innerHTML=`${g}`});this.container=e||document.body,this.infoCells={};const t=[["Camera position","cameraPosition"],["Camera look-at","cameraLookAt"],["Camera up","cameraUp"],["Camera mode","orthographicCamera"],["Cursor position","cursorPosition"],["FPS","fps"],["Rendering:","renderSplatCount"],["Sort time","sortTime"],["Render window","renderWindow"],["Focal adjustment","focalAdjustment"],["Splat scale","splatScale"],["Point cloud mode","pointCloudMode"]];this.infoPanelContainer=document.createElement("div");const n=document.createElement("style");n.innerHTML=`

            .infoPanel {
                width: 430px;
                padding: 10px;
                background-color: rgba(50, 50, 50, 0.85);
                border: #555555 2px solid;
                color: #dddddd;
                border-radius: 10px;
                z-index: 9999;
                font-family: arial;
                font-size: 11pt;
                text-align: left;
                margin: 0;
                top: 10px;
                left:10px;
                position: absolute;
                pointer-events: auto;
            }

            .info-panel-cell {
                margin-bottom: 5px;
                padding-bottom: 2px;
            }

            .label-cell {
                font-weight: bold;
                font-size: 12pt;
                width: 140px;
            }

        `,this.infoPanelContainer.append(n),this.infoPanel=document.createElement("div"),this.infoPanel.className="infoPanel";const i=document.createElement("div");i.style.display="table";for(let s of t){const o=document.createElement("div");o.style.display="table-row",o.className="info-panel-row";const a=document.createElement("div");a.style.display="table-cell",a.innerHTML=`${s[0]}: `,a.classList.add("info-panel-cell","label-cell");const l=document.createElement("div");l.style.display="table-cell",l.style.width="10px",l.innerHTML=" ",l.className="info-panel-cell";const c=document.createElement("div");c.style.display="table-cell",c.innerHTML="",c.className="info-panel-cell",this.infoCells[s[1]]=c,o.appendChild(a),o.appendChild(l),o.appendChild(c),i.appendChild(o)}this.infoPanel.appendChild(i),this.infoPanelContainer.append(this.infoPanel),this.infoPanelContainer.style.display="none",this.container.appendChild(this.infoPanelContainer),this.visible=!1}setContainer(e){this.container&&this.infoPanelContainer.parentElement===this.container&&this.container.removeChild(this.infoPanelContainer),e&&(this.container=e,this.container.appendChild(this.infoPanelContainer),this.infoPanelContainer.style.zIndex=this.container.style.zIndex+1)}show(){this.infoPanelContainer.style.display="block",this.visible=!0}hide(){this.infoPanelContainer.style.display="none",this.visible=!1}}const Rc=new b;class PA extends Mt{constructor(e=new b(0,0,1),t=new b(0,0,0),n=1,i=.1,s=16776960,o=n*.2,a=o*.2){super(),this.type="ArrowHelper";const l=new Bs(i,i,n,32);l.translate(0,n/2,0);const c=new Bs(0,a,o,32);c.translate(0,n,0),this.position.copy(t),this.line=new gt(l,new Mi({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new gt(c,new Mi({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Rc.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Rc,t)}}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class bs{constructor(e){ce(this,"updateFocusMarker",function(){const e=new b,t=new ze,n=new b;return function(i,s,o){t.copy(s.matrixWorld).invert(),e.copy(i).applyMatrix4(t),e.normalize().multiplyScalar(10),e.applyMatrix4(s.matrixWorld),n.copy(s.position).sub(i);const a=n.length();this.focusMarker.position.copy(i),this.focusMarker.scale.set(a,a,a),this.focusMarker.material.uniforms.realFocusPosition.value.copy(i),this.focusMarker.material.uniforms.viewport.value.copy(o),this.focusMarker.material.uniformsNeedUpdate=!0}}());ce(this,"positionAndOrientControlPlane",function(){const e=new nt,t=new b(0,1,0);return function(n,i){e.setFromUnitVectors(t,i),this.controlPlane.position.copy(n),this.controlPlane.quaternion.copy(e)}}());this.threeScene=e,this.splatRenderTarget=null,this.renderTargetCopyQuad=null,this.renderTargetCopyCamera=null,this.meshCursor=null,this.focusMarker=null,this.controlPlane=null,this.debugRoot=null,this.secondaryDebugRoot=null}updateSplatRenderTargetForRenderDimensions(e,t){this.destroySplatRendertarget(),this.splatRenderTarget=new ii(e,t,{format:Gt,stencilBuffer:!1,depthBuffer:!0}),this.splatRenderTarget.depthTexture=new ha(e,t),this.splatRenderTarget.depthTexture.format=vi,this.splatRenderTarget.depthTexture.type=un}destroySplatRendertarget(){this.splatRenderTarget&&(this.splatRenderTarget=null)}setupRenderTargetCopyObjects(){const e={sourceColorTexture:{type:"t",value:null},sourceDepthTexture:{type:"t",value:null}},t=new $t({vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4( position.xy, 0.0, 1.0 );    
                }
            `,fragmentShader:`
                #include <common>
                #include <packing>
                varying vec2 vUv;
                uniform sampler2D sourceColorTexture;
                uniform sampler2D sourceDepthTexture;
                void main() {
                    vec4 color = texture2D(sourceColorTexture, vUv);
                    float fragDepth = texture2D(sourceDepthTexture, vUv).x;
                    gl_FragDepth = fragDepth;
                    gl_FragColor = vec4(color.rgb, color.a * 2.0);
              }
            `,uniforms:e,depthWrite:!1,depthTest:!1,transparent:!0,blending:Kc,blendSrc:Ps,blendSrcAlpha:Ps,blendDst:Ds,blendDstAlpha:Ds});t.extensions.fragDepth=!0,this.renderTargetCopyQuad=new gt(new us(2,2),t),this.renderTargetCopyCamera=new da(-1,1,1,-1,0,1)}destroyRenderTargetCopyObjects(){this.renderTargetCopyQuad&&(Yi(this.renderTargetCopyQuad),this.renderTargetCopyQuad=null)}setupMeshCursor(){if(!this.meshCursor){const e=new fa(.5,1.5,32),t=new Mi({color:16777215}),n=new gt(e,t);n.rotation.set(0,0,Math.PI),n.position.set(0,1,0);const i=new gt(e,t);i.position.set(0,-1,0);const s=new gt(e,t);s.rotation.set(0,0,Math.PI/2),s.position.set(1,0,0);const o=new gt(e,t);o.rotation.set(0,0,-Math.PI/2),o.position.set(-1,0,0),this.meshCursor=new Mt,this.meshCursor.add(n),this.meshCursor.add(i),this.meshCursor.add(s),this.meshCursor.add(o),this.meshCursor.scale.set(.1,.1,.1),this.threeScene.add(this.meshCursor),this.meshCursor.visible=!1}}destroyMeshCursor(){this.meshCursor&&(Yi(this.meshCursor),this.threeScene.remove(this.meshCursor),this.meshCursor=null)}setMeshCursorVisibility(e){this.meshCursor.visible=e}getMeschCursorVisibility(){return this.meshCursor.visible}setMeshCursorPosition(e){this.meshCursor.position.copy(e)}positionAndOrientMeshCursor(e,t){this.meshCursor.position.copy(e),this.meshCursor.up.copy(t.up),this.meshCursor.lookAt(t.position)}setupFocusMarker(){if(!this.focusMarker){const e=new Pr(.5,32,32),t=bs.buildFocusMarkerMaterial();t.depthTest=!1,t.depthWrite=!1,t.transparent=!0,this.focusMarker=new gt(e,t)}}destroyFocusMarker(){this.focusMarker&&(Yi(this.focusMarker),this.focusMarker=null)}setFocusMarkerVisibility(e){this.focusMarker.visible=e}setFocusMarkerOpacity(e){this.focusMarker.material.uniforms.opacity.value=e,this.focusMarker.material.uniformsNeedUpdate=!0}getFocusMarkerOpacity(){return this.focusMarker.material.uniforms.opacity.value}setupControlPlane(){if(!this.controlPlane){const e=new us(1,1);e.rotateX(-Math.PI/2);const t=new Mi({color:16777215});t.transparent=!0,t.opacity=.6,t.depthTest=!1,t.depthWrite=!1,t.side=nn;const n=new gt(e,t),i=new b(0,1,0);i.normalize();const s=new b(0,0,0),o=.5,a=.01,l=56576,c=new PA(i,s,o,a,l,.1,.03);this.controlPlane=new Mt,this.controlPlane.add(n),this.controlPlane.add(c)}}destroyControlPlane(){this.controlPlane&&(Yi(this.controlPlane),this.controlPlane=null)}setControlPlaneVisibility(e){this.controlPlane.visible=e}addDebugMeshes(){this.debugRoot=this.createDebugMeshes(),this.secondaryDebugRoot=this.createSecondaryDebugMeshes(),this.threeScene.add(this.debugRoot),this.threeScene.add(this.secondaryDebugRoot)}destroyDebugMeshes(){for(let e of[this.debugRoot,this.secondaryDebugRoot])e&&(Yi(e),this.threeScene.remove(e));this.debugRoot=null,this.secondaryDebugRoot=null}createDebugMeshes(e){const t=new Pr(1,32,32),n=new Mt,i=(s,o)=>{let a=new gt(t,bs.buildDebugMaterial(s));a.renderOrder=e,n.add(a),a.position.fromArray(o)};return i(16711680,[-50,0,0]),i(16711680,[50,0,0]),i(65280,[0,0,-50]),i(65280,[0,0,50]),i(16755200,[5,0,5]),n}createSecondaryDebugMeshes(e){const t=new ms(3,3,3),n=new Mt;let i=12303291;const s=a=>{let l=new gt(t,bs.buildDebugMaterial(i));l.renderOrder=e,n.add(l),l.position.fromArray(a)};let o=10;return s([-o,0,-o]),s([-o,0,o]),s([o,0,-o]),s([o,0,o]),n}static buildDebugMaterial(e){const t=`
            #include <common>
            varying float ndcDepth;

            void main() {
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.xyz, 1.0);
                ndcDepth = gl_Position.z / gl_Position.w;
                gl_Position.x = gl_Position.x / gl_Position.w;
                gl_Position.y = gl_Position.y / gl_Position.w;
                gl_Position.z = 0.0;
                gl_Position.w = 1.0;
    
            }
        `,n=`
            #include <common>
            uniform vec3 color;
            varying float ndcDepth;
            void main() {
                gl_FragDepth = (ndcDepth + 1.0) / 2.0;
                gl_FragColor = vec4(color.rgb, 0.0);
            }
        `,i={color:{type:"v3",value:new je(e)}},s=new $t({uniforms:i,vertexShader:t,fragmentShader:n,transparent:!1,depthTest:!0,depthWrite:!0,side:yn});return s.extensions.fragDepth=!0,s}static buildFocusMarkerMaterial(e){const t=`
            #include <common>

            uniform vec2 viewport;
            uniform vec3 realFocusPosition;

            varying vec4 ndcPosition;
            varying vec4 ndcCenter;
            varying vec4 ndcFocusPosition;

            void main() {
                float radius = 0.01;

                vec4 viewPosition = modelViewMatrix * vec4(position.xyz, 1.0);
                vec4 viewCenter = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);

                vec4 viewFocusPosition = modelViewMatrix * vec4(realFocusPosition, 1.0);

                ndcPosition = projectionMatrix * viewPosition;
                ndcPosition = ndcPosition * vec4(1.0 / ndcPosition.w);
                ndcCenter = projectionMatrix * viewCenter;
                ndcCenter = ndcCenter * vec4(1.0 / ndcCenter.w);

                ndcFocusPosition = projectionMatrix * viewFocusPosition;
                ndcFocusPosition = ndcFocusPosition * vec4(1.0 / ndcFocusPosition.w);

                gl_Position = projectionMatrix * viewPosition;

            }
        `,n=`
            #include <common>
            uniform vec3 color;
            uniform vec2 viewport;
            uniform float opacity;

            varying vec4 ndcPosition;
            varying vec4 ndcCenter;
            varying vec4 ndcFocusPosition;

            void main() {
                vec2 screenPosition = vec2(ndcPosition) * viewport;
                vec2 screenCenter = vec2(ndcCenter) * viewport;

                vec2 screenVec = screenPosition - screenCenter;

                float projectedRadius = length(screenVec);

                float lineWidth = 0.0005 * viewport.y;
                float aaRange = 0.0025 * viewport.y;
                float radius = 0.06 * viewport.y;
                float radDiff = abs(projectedRadius - radius) - lineWidth;
                float alpha = 1.0 - clamp(radDiff / 5.0, 0.0, 1.0); 

                gl_FragColor = vec4(color.rgb, alpha * opacity);
            }
        `,i={color:{type:"v3",value:new je(e)},realFocusPosition:{type:"v3",value:new b},viewport:{type:"v2",value:new xe},opacity:{value:0}};return new $t({uniforms:i,vertexShader:t,fragmentShader:n,transparent:!0,depthTest:!1,depthWrite:!1,side:yn})}dispose(){this.destroyMeshCursor(),this.destroyFocusMarker(),this.destroyDebugMeshes(),this.destroyControlPlane(),this.destroyRenderTargetCopyObjects(),this.destroySplatRendertarget()}}const DA=new b(1,0,0),FA=new b(0,1,0),LA=new b(0,0,1);class Lo{constructor(e=new b,t=new b){ce(this,"intersectBox",function(){const e=new b,t=[],n=[],i=[];return function(s,o){if(n[0]=this.origin.x,n[1]=this.origin.y,n[2]=this.origin.z,i[0]=this.direction.x,i[1]=this.direction.y,i[2]=this.direction.z,this.boxContainsPoint(s,this.origin,1e-4))return o&&(o.origin.copy(this.origin),o.normal.set(0,0,0),o.distance=-1),!0;for(let a=0;a<3;a++){if(i[a]==0)continue;const l=a==0?DA:a==1?FA:LA,c=i[a]<0?s.max:s.min;let d=-Math.sign(i[a]);t[0]=a==0?c.x:a==1?c.y:c.z;let u=t[0]-n[a];if(u*d<0){const f=(a+1)%3,h=(a+2)%3;if(t[2]=i[f]/i[a]*u+n[f],t[1]=i[h]/i[a]*u+n[h],e.set(t[a],t[h],t[f]),this.boxContainsPoint(s,e,1e-4))return o&&(o.origin.copy(e),o.normal.copy(l).multiplyScalar(d),o.distance=e.sub(this.origin).length()),!0}}return!1}}());ce(this,"intersectSphere",function(){const e=new b;return function(t,n,i){e.copy(t).sub(this.origin);const s=e.dot(this.direction),o=s*s,l=e.dot(e)-o,c=n*n;if(l>c)return!1;const d=Math.sqrt(c-l),u=s-d,f=s+d;if(f<0)return!1;let h=u<0?f:u;return i&&(i.origin.copy(this.origin).addScaledVector(this.direction,h),i.normal.copy(i.origin).sub(t).normalize(),i.distance=h),!0}}());this.origin=new b,this.direction=new b,this.setParameters(e,t)}setParameters(e,t){this.origin.copy(e),this.direction.copy(t).normalize()}boxContainsPoint(e,t,n){return!(t.x<e.min.x-n||t.x>e.max.x+n||t.y<e.min.y-n||t.y>e.max.y+n||t.z<e.min.z-n||t.z>e.max.z+n)}}class ba{constructor(){this.origin=new b,this.normal=new b,this.distance=0,this.splatIndex=0}set(e,t,n,i){this.origin.copy(e),this.normal.copy(t),this.distance=n,this.splatIndex=i}clone(){const e=new ba;return e.origin.copy(this.origin),e.normal.copy(this.normal),e.distance=this.distance,e.splatIndex=this.splatIndex,e}}const Ln={ThreeD:0,TwoD:1};class BA{constructor(e,t,n=!1){ce(this,"setFromCameraAndScreenPosition",function(){const e=new xe;return function(t,n,i){if(e.x=n.x/i.x*2-1,e.y=(i.y-n.y)/i.y*2-1,t.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t;else if(t.isOrthographicCamera)this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t;else throw new Error("Raycaster::setFromCameraAndScreenPosition() -> Unsupported camera type")}}());ce(this,"intersectSplatMesh",function(){const e=new ze,t=new ze,n=new ze,i=new Lo,s=new b;return function(o,a=[]){const l=o.getSplatTree();if(l){for(let c=0;c<l.subTrees.length;c++){const d=l.subTrees[c];t.copy(o.matrixWorld),o.dynamicMode&&(o.getSceneTransform(c,n),t.multiply(n)),e.copy(t).invert(),i.origin.copy(this.ray.origin).applyMatrix4(e),i.direction.copy(this.ray.origin).add(this.ray.direction),i.direction.applyMatrix4(e).sub(i.origin).normalize();const u=[];d.rootNode&&this.castRayAtSplatTreeNode(i,l,d.rootNode,u),u.forEach(f=>{f.origin.applyMatrix4(t),f.normal.applyMatrix4(t).normalize(),f.distance=s.copy(f.origin).sub(this.ray.origin).length()}),a.push(...u)}return a.sort((c,d)=>c.distance>d.distance?1:-1),a}}}());ce(this,"castRayAtSplatTreeNode",function(){const e=new _t,t=new b,n=new b,i=new nt,s=new ba,o=1e-7,a=new b(0,0,0),l=new ze,c=new ze,d=new ze,u=new ze,f=new ze,h=new Lo;return function(g,A,p,m=[]){if(g.intersectBox(p.boundingBox)){if(p.data&&p.data.indexes&&p.data.indexes.length>0)for(let S=0;S<p.data.indexes.length;S++){const x=p.data.indexes[S],v=A.splatMesh.getSceneIndexForSplat(x);if(A.splatMesh.getScene(v).visible&&(A.splatMesh.getSplatColor(x,e),A.splatMesh.getSplatCenter(x,t),A.splatMesh.getSplatScaleAndRotation(x,n,i),!(n.x<=o||n.y<=o||A.splatMesh.splatRenderMode===Ln.ThreeD&&n.z<=o)))if(this.raycastAgainstTrueSplatEllipsoid){c.makeScale(n.x,n.y,n.z),d.makeRotationFromQuaternion(i);const C=Math.log10(e.w)*2;if(l.makeScale(C,C,C),f.copy(l).multiply(d).multiply(c),u.copy(f).invert(),h.origin.copy(g.origin).sub(t).applyMatrix4(u),h.direction.copy(g.origin).add(g.direction).sub(t),h.direction.applyMatrix4(u).sub(h.origin).normalize(),h.intersectSphere(a,1,s)){const y=s.clone();y.splatIndex=x,y.origin.applyMatrix4(f).add(t),m.push(y)}}else{let C=n.x+n.y,y=2;if(A.splatMesh.splatRenderMode===Ln.ThreeD&&(C+=n.z,y=3),C=C/y,g.intersectSphere(t,C,s)){const R=s.clone();R.splatIndex=x,m.push(R)}}}if(p.children&&p.children.length>0)for(let S of p.children)this.castRayAtSplatTreeNode(g,A,S,m);return m}}}());this.ray=new Lo(e,t),this.raycastAgainstTrueSplatEllipsoid=n}}class es{static buildVertexShaderBase(e=!1,t=!1,n=0,i=""){let s=`
        precision highp float;
        #include <common>

        attribute uint splatIndex;
        uniform highp usampler2D centersColorsTexture;
        uniform highp sampler2D sphericalHarmonicsTexture;
        uniform highp sampler2D sphericalHarmonicsTextureR;
        uniform highp sampler2D sphericalHarmonicsTextureG;
        uniform highp sampler2D sphericalHarmonicsTextureB;

        uniform highp usampler2D sceneIndexesTexture;
        uniform vec2 sceneIndexesTextureSize;
        uniform int sceneCount;
    `;return t&&(s+=`
            uniform float sceneOpacity[${Ye.MaxScenes}];
            uniform int sceneVisibility[${Ye.MaxScenes}];
        `),e&&(s+=`
            uniform highp mat4 transforms[${Ye.MaxScenes}];
        `),s+=`
        ${i}
        uniform vec2 focal;
        uniform float orthoZoom;
        uniform int orthographicMode;
        uniform int pointCloudModeEnabled;
        uniform float inverseFocalAdjustment;
        uniform vec2 viewport;
        uniform vec2 basisViewport;
        uniform vec2 centersColorsTextureSize;
        uniform int sphericalHarmonicsDegree;
        uniform vec2 sphericalHarmonicsTextureSize;
        uniform int sphericalHarmonics8BitMode;
        uniform int sphericalHarmonicsMultiTextureMode;
        uniform float visibleRegionRadius;
        uniform float visibleRegionFadeStartRadius;
        uniform float firstRenderTime;
        uniform float currentTime;
        uniform int fadeInComplete;
        uniform vec3 sceneCenter;
        uniform float splatScale;
        uniform float sphericalHarmonics8BitCompressionRangeMin[${Ye.MaxScenes}];
        uniform float sphericalHarmonics8BitCompressionRangeMax[${Ye.MaxScenes}];

        varying vec4 vColor;
        varying vec2 vUv;
        varying vec2 vPosition;

        mat3 quaternionToRotationMatrix(float x, float y, float z, float w) {
            float s = 1.0 / sqrt(w * w + x * x + y * y + z * z);
        
            return mat3(
                1. - 2. * (y * y + z * z),
                2. * (x * y + w * z),
                2. * (x * z - w * y),
                2. * (x * y - w * z),
                1. - 2. * (x * x + z * z),
                2. * (y * z + w * x),
                2. * (x * z + w * y),
                2. * (y * z - w * x),
                1. - 2. * (x * x + y * y)
            );
        }

        const float sqrt8 = sqrt(8.0);
        const float minAlpha = 1.0 / 255.0;

        const vec4 encodeNorm4 = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
        const uvec4 mask4 = uvec4(uint(0x000000FF), uint(0x0000FF00), uint(0x00FF0000), uint(0xFF000000));
        const uvec4 shift4 = uvec4(0, 8, 16, 24);
        vec4 uintToRGBAVec (uint u) {
           uvec4 urgba = mask4 & u;
           urgba = urgba >> shift4;
           vec4 rgba = vec4(urgba) * encodeNorm4;
           return rgba;
        }

        vec2 getDataUV(in int stride, in int offset, in vec2 dimensions) {
            vec2 samplerUV = vec2(0.0, 0.0);
            float d = float(splatIndex * uint(stride) + uint(offset)) / dimensions.x;
            samplerUV.y = float(floor(d)) / dimensions.y;
            samplerUV.x = fract(d);
            return samplerUV;
        }

        vec2 getDataUVF(in uint sIndex, in float stride, in uint offset, in vec2 dimensions) {
            vec2 samplerUV = vec2(0.0, 0.0);
            float d = float(uint(float(sIndex) * stride) + offset) / dimensions.x;
            samplerUV.y = float(floor(d)) / dimensions.y;
            samplerUV.x = fract(d);
            return samplerUV;
        }

        const float SH_C1 = 0.4886025119029199f;
        const float[5] SH_C2 = float[](1.0925484, -1.0925484, 0.3153916, -1.0925484, 0.5462742);

        void main () {

            uint oddOffset = splatIndex & uint(0x00000001);
            uint doubleOddOffset = oddOffset * uint(2);
            bool isEven = oddOffset == uint(0);
            uint nearestEvenIndex = splatIndex - oddOffset;
            float fOddOffset = float(oddOffset);

            uvec4 sampledCenterColor = texture(centersColorsTexture, getDataUV(1, 0, centersColorsTextureSize));
            vec3 splatCenter = uintBitsToFloat(uvec3(sampledCenterColor.gba));

            uint sceneIndex = uint(0);
            if (sceneCount > 1) {
                sceneIndex = texture(sceneIndexesTexture, getDataUV(1, 0, sceneIndexesTextureSize)).r;
            }
            `,t&&(s+=`
                float splatOpacityFromScene = sceneOpacity[sceneIndex];
                int sceneVisible = sceneVisibility[sceneIndex];
                if (splatOpacityFromScene <= 0.01 || sceneVisible == 0) {
                    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
                    return;
                }
            `),e?s+=`
                mat4 transform = transforms[sceneIndex];
                mat4 transformModelViewMatrix = viewMatrix * transform;
            `:s+="mat4 transformModelViewMatrix = modelViewMatrix;",s+=`
            float sh8BitCompressionRangeMinForScene = sphericalHarmonics8BitCompressionRangeMin[sceneIndex];
            float sh8BitCompressionRangeMaxForScene = sphericalHarmonics8BitCompressionRangeMax[sceneIndex];
            float sh8BitCompressionRangeForScene = sh8BitCompressionRangeMaxForScene - sh8BitCompressionRangeMinForScene;
            float sh8BitCompressionHalfRangeForScene = sh8BitCompressionRangeForScene / 2.0;
            vec3 vec8BitSHShift = vec3(sh8BitCompressionRangeMinForScene);

            vec4 viewCenter = transformModelViewMatrix * vec4(splatCenter, 1.0);

            vec4 clipCenter = projectionMatrix * viewCenter;

            float clip = 1.2 * clipCenter.w;
            if (clipCenter.z < -clip || clipCenter.x < -clip || clipCenter.x > clip || clipCenter.y < -clip || clipCenter.y > clip) {
                gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
                return;
            }

            vec3 ndcCenter = clipCenter.xyz / clipCenter.w;

            vPosition = position.xy;
            vColor = uintToRGBAVec(sampledCenterColor.r);
        `,n>=1&&(s+=`   
            if (sphericalHarmonicsDegree >= 1) {
            `,e?s+=`
                    vec3 worldViewDir = normalize(splatCenter - vec3(inverse(transform) * vec4(cameraPosition, 1.0)));
                `:s+=`
                    vec3 worldViewDir = normalize(splatCenter - cameraPosition);
                `,s+=`
                vec3 sh1;
                vec3 sh2;
                vec3 sh3;
            `,n>=2&&(s+=`
                    vec3 sh4;
                    vec3 sh5;
                    vec3 sh6;
                    vec3 sh7;
                    vec3 sh8;
                `),n===1?s+=`
                    if (sphericalHarmonicsMultiTextureMode == 0) {
                        vec2 shUV = getDataUVF(nearestEvenIndex, 2.5, doubleOddOffset, sphericalHarmonicsTextureSize);
                        vec4 sampledSH0123 = texture(sphericalHarmonicsTexture, shUV);
                        shUV = getDataUVF(nearestEvenIndex, 2.5, doubleOddOffset + uint(1), sphericalHarmonicsTextureSize);
                        vec4 sampledSH4567 = texture(sphericalHarmonicsTexture, shUV);
                        shUV = getDataUVF(nearestEvenIndex, 2.5, doubleOddOffset + uint(2), sphericalHarmonicsTextureSize);
                        vec4 sampledSH891011 = texture(sphericalHarmonicsTexture, shUV);
                        sh1 = vec3(sampledSH0123.rgb) * (1.0 - fOddOffset) + vec3(sampledSH0123.ba, sampledSH4567.r) * fOddOffset;
                        sh2 = vec3(sampledSH0123.a, sampledSH4567.rg) * (1.0 - fOddOffset) + vec3(sampledSH4567.gba) * fOddOffset;
                        sh3 = vec3(sampledSH4567.ba, sampledSH891011.r) * (1.0 - fOddOffset) + vec3(sampledSH891011.rgb) * fOddOffset;
                    } else {
                        vec2 sampledSH01R = texture(sphericalHarmonicsTextureR, getDataUV(2, 0, sphericalHarmonicsTextureSize)).rg;
                        vec2 sampledSH23R = texture(sphericalHarmonicsTextureR, getDataUV(2, 1, sphericalHarmonicsTextureSize)).rg;
                        vec2 sampledSH01G = texture(sphericalHarmonicsTextureG, getDataUV(2, 0, sphericalHarmonicsTextureSize)).rg;
                        vec2 sampledSH23G = texture(sphericalHarmonicsTextureG, getDataUV(2, 1, sphericalHarmonicsTextureSize)).rg;
                        vec2 sampledSH01B = texture(sphericalHarmonicsTextureB, getDataUV(2, 0, sphericalHarmonicsTextureSize)).rg;
                        vec2 sampledSH23B = texture(sphericalHarmonicsTextureB, getDataUV(2, 1, sphericalHarmonicsTextureSize)).rg;
                        sh1 = vec3(sampledSH01R.rg, sampledSH23R.r);
                        sh2 = vec3(sampledSH01G.rg, sampledSH23G.r);
                        sh3 = vec3(sampledSH01B.rg, sampledSH23B.r);
                    }
                `:n===2&&(s+=`
                    vec4 sampledSH0123;
                    vec4 sampledSH4567;
                    vec4 sampledSH891011;

                    vec4 sampledSH0123R;
                    vec4 sampledSH0123G;
                    vec4 sampledSH0123B;

                    if (sphericalHarmonicsMultiTextureMode == 0) {
                        sampledSH0123 = texture(sphericalHarmonicsTexture, getDataUV(6, 0, sphericalHarmonicsTextureSize));
                        sampledSH4567 = texture(sphericalHarmonicsTexture, getDataUV(6, 1, sphericalHarmonicsTextureSize));
                        sampledSH891011 = texture(sphericalHarmonicsTexture, getDataUV(6, 2, sphericalHarmonicsTextureSize));
                        sh1 = sampledSH0123.rgb;
                        sh2 = vec3(sampledSH0123.a, sampledSH4567.rg);
                        sh3 = vec3(sampledSH4567.ba, sampledSH891011.r);
                    } else {
                        sampledSH0123R = texture(sphericalHarmonicsTextureR, getDataUV(2, 0, sphericalHarmonicsTextureSize));
                        sampledSH0123G = texture(sphericalHarmonicsTextureG, getDataUV(2, 0, sphericalHarmonicsTextureSize));
                        sampledSH0123B = texture(sphericalHarmonicsTextureB, getDataUV(2, 0, sphericalHarmonicsTextureSize));
                        sh1 = vec3(sampledSH0123R.rgb);
                        sh2 = vec3(sampledSH0123G.rgb);
                        sh3 = vec3(sampledSH0123B.rgb);
                    }
                `),s+=`
                    if (sphericalHarmonics8BitMode == 1) {
                        sh1 = sh1 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                        sh2 = sh2 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                        sh3 = sh3 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                    }
                    float x = worldViewDir.x;
                    float y = worldViewDir.y;
                    float z = worldViewDir.z;
                    vColor.rgb += SH_C1 * (-sh1 * y + sh2 * z - sh3 * x);
            `,n>=2&&(s+=`
                    if (sphericalHarmonicsDegree >= 2) {
                        float xx = x * x;
                        float yy = y * y;
                        float zz = z * z;
                        float xy = x * y;
                        float yz = y * z;
                        float xz = x * z;
                `,n===2&&(s+=`
                        if (sphericalHarmonicsMultiTextureMode == 0) {
                            vec4 sampledSH12131415 = texture(sphericalHarmonicsTexture, getDataUV(6, 3, sphericalHarmonicsTextureSize));
                            vec4 sampledSH16171819 = texture(sphericalHarmonicsTexture, getDataUV(6, 4, sphericalHarmonicsTextureSize));
                            vec4 sampledSH20212223 = texture(sphericalHarmonicsTexture, getDataUV(6, 5, sphericalHarmonicsTextureSize));
                            sh4 = sampledSH891011.gba;
                            sh5 = sampledSH12131415.rgb;
                            sh6 = vec3(sampledSH12131415.a, sampledSH16171819.rg);
                            sh7 = vec3(sampledSH16171819.ba, sampledSH20212223.r);
                            sh8 = sampledSH20212223.gba;
                        } else {
                            vec4 sampledSH4567R = texture(sphericalHarmonicsTextureR, getDataUV(2, 1, sphericalHarmonicsTextureSize));
                            vec4 sampledSH4567G = texture(sphericalHarmonicsTextureG, getDataUV(2, 1, sphericalHarmonicsTextureSize));
                            vec4 sampledSH4567B = texture(sphericalHarmonicsTextureB, getDataUV(2, 1, sphericalHarmonicsTextureSize));
                            sh4 = vec3(sampledSH0123R.a, sampledSH4567R.rg);
                            sh5 = vec3(sampledSH4567R.ba, sampledSH0123G.a);
                            sh6 = vec3(sampledSH4567G.rgb);
                            sh7 = vec3(sampledSH4567G.a, sampledSH0123B.a, sampledSH4567B.r);
                            sh8 = vec3(sampledSH4567B.gba);
                        }
                    `),s+=`
                        if (sphericalHarmonics8BitMode == 1) {
                            sh4 = sh4 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                            sh5 = sh5 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                            sh6 = sh6 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                            sh7 = sh7 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                            sh8 = sh8 * sh8BitCompressionRangeForScene + vec8BitSHShift;
                        }

                        vColor.rgb +=
                            (SH_C2[0] * xy) * sh4 +
                            (SH_C2[1] * yz) * sh5 +
                            (SH_C2[2] * (2.0 * zz - xx - yy)) * sh6 +
                            (SH_C2[3] * xz) * sh7 +
                            (SH_C2[4] * (xx - yy)) * sh8;
                    }
                `),s+=`

                vColor.rgb = clamp(vColor.rgb, vec3(0.), vec3(1.));

            }

            `),s}static getVertexShaderFadeIn(){return`
            if (fadeInComplete == 0) {
                float opacityAdjust = 1.0;
                float centerDist = length(splatCenter - sceneCenter);
                float renderTime = max(currentTime - firstRenderTime, 0.0);

                float fadeDistance = 0.75;
                float distanceLoadFadeInFactor = step(visibleRegionFadeStartRadius, centerDist);
                distanceLoadFadeInFactor = (1.0 - distanceLoadFadeInFactor) +
                                        (1.0 - clamp((centerDist - visibleRegionFadeStartRadius) / fadeDistance, 0.0, 1.0)) *
                                        distanceLoadFadeInFactor;
                opacityAdjust *= distanceLoadFadeInFactor;
                vColor.a *= opacityAdjust;
            }
        `}static getUniforms(e=!1,t=!1,n=0,i=1,s=!1){const o={sceneCenter:{type:"v3",value:new b},fadeInComplete:{type:"i",value:0},orthographicMode:{type:"i",value:0},visibleRegionFadeStartRadius:{type:"f",value:0},visibleRegionRadius:{type:"f",value:0},currentTime:{type:"f",value:0},firstRenderTime:{type:"f",value:0},centersColorsTexture:{type:"t",value:null},sphericalHarmonicsTexture:{type:"t",value:null},sphericalHarmonicsTextureR:{type:"t",value:null},sphericalHarmonicsTextureG:{type:"t",value:null},sphericalHarmonicsTextureB:{type:"t",value:null},sphericalHarmonics8BitCompressionRangeMin:{type:"f",value:[]},sphericalHarmonics8BitCompressionRangeMax:{type:"f",value:[]},focal:{type:"v2",value:new xe},orthoZoom:{type:"f",value:1},inverseFocalAdjustment:{type:"f",value:1},viewport:{type:"v2",value:new xe},basisViewport:{type:"v2",value:new xe},debugColor:{type:"v3",value:new je},centersColorsTextureSize:{type:"v2",value:new xe(1024,1024)},sphericalHarmonicsDegree:{type:"i",value:n},sphericalHarmonicsTextureSize:{type:"v2",value:new xe(1024,1024)},sphericalHarmonics8BitMode:{type:"i",value:0},sphericalHarmonicsMultiTextureMode:{type:"i",value:0},splatScale:{type:"f",value:i},pointCloudModeEnabled:{type:"i",value:s?1:0},sceneIndexesTexture:{type:"t",value:null},sceneIndexesTextureSize:{type:"v2",value:new xe(1024,1024)},sceneCount:{type:"i",value:1}};for(let a=0;a<Ye.MaxScenes;a++)o.sphericalHarmonics8BitCompressionRangeMin.value.push(-3/2),o.sphericalHarmonics8BitCompressionRangeMax.value.push(Ye.SphericalHarmonics8BitCompressionRange/2);if(t){const a=[];for(let c=0;c<Ye.MaxScenes;c++)a.push(1);o.sceneOpacity={type:"f",value:a};const l=[];for(let c=0;c<Ye.MaxScenes;c++)l.push(1);o.sceneVisibility={type:"i",value:l}}if(e){const a=[];for(let l=0;l<Ye.MaxScenes;l++)a.push(new ze);o.transforms={type:"mat4",value:a}}return o}}class Fr{static build(e=!1,t=!1,n=!1,i=2048,s=1,o=!1,a=0,l=.3){let d=es.buildVertexShaderBase(e,t,a,`
            uniform vec2 covariancesTextureSize;
            uniform highp sampler2D covariancesTexture;
            uniform highp usampler2D covariancesTextureHalfFloat;
            uniform int covariancesAreHalfFloat;

            void fromCovarianceHalfFloatV4(uvec4 val, out vec4 first, out vec4 second) {
                vec2 r = unpackHalf2x16(val.r);
                vec2 g = unpackHalf2x16(val.g);
                vec2 b = unpackHalf2x16(val.b);

                first = vec4(r.x, r.y, g.x, g.y);
                second = vec4(b.x, b.y, 0.0, 0.0);
            }
        `);d+=Fr.buildVertexShaderProjection(n,t,i,l);const u=Fr.buildFragmentShader(),f=es.getUniforms(e,t,a,s,o);return f.covariancesTextureSize={type:"v2",value:new xe(1024,1024)},f.covariancesTexture={type:"t",value:null},f.covariancesTextureHalfFloat={type:"t",value:null},f.covariancesAreHalfFloat={type:"i",value:0},new $t({uniforms:f,vertexShader:d,fragmentShader:u,transparent:!0,alphaTest:1,blending:ei,depthTest:!0,depthWrite:!1,side:nn})}static buildVertexShaderProjection(e,t,n,i){let s=`

            vec4 sampledCovarianceA;
            vec4 sampledCovarianceB;
            vec3 cov3D_M11_M12_M13;
            vec3 cov3D_M22_M23_M33;
            if (covariancesAreHalfFloat == 0) {
                sampledCovarianceA = texture(covariancesTexture, getDataUVF(nearestEvenIndex, 1.5, oddOffset,
                                                                            covariancesTextureSize));
                sampledCovarianceB = texture(covariancesTexture, getDataUVF(nearestEvenIndex, 1.5, oddOffset + uint(1),
                                                                            covariancesTextureSize));

                cov3D_M11_M12_M13 = vec3(sampledCovarianceA.rgb) * (1.0 - fOddOffset) +
                                    vec3(sampledCovarianceA.ba, sampledCovarianceB.r) * fOddOffset;
                cov3D_M22_M23_M33 = vec3(sampledCovarianceA.a, sampledCovarianceB.rg) * (1.0 - fOddOffset) +
                                    vec3(sampledCovarianceB.gba) * fOddOffset;
            } else {
                uvec4 sampledCovarianceU = texture(covariancesTextureHalfFloat, getDataUV(1, 0, covariancesTextureSize));
                fromCovarianceHalfFloatV4(sampledCovarianceU, sampledCovarianceA, sampledCovarianceB);
                cov3D_M11_M12_M13 = sampledCovarianceA.rgb;
                cov3D_M22_M23_M33 = vec3(sampledCovarianceA.a, sampledCovarianceB.rg);
            }
        
            // Construct the 3D covariance matrix
            mat3 Vrk = mat3(
                cov3D_M11_M12_M13.x, cov3D_M11_M12_M13.y, cov3D_M11_M12_M13.z,
                cov3D_M11_M12_M13.y, cov3D_M22_M23_M33.x, cov3D_M22_M23_M33.y,
                cov3D_M11_M12_M13.z, cov3D_M22_M23_M33.y, cov3D_M22_M23_M33.z
            );

            mat3 J;
            if (orthographicMode == 1) {
                // Since the projection is linear, we don't need an approximation
                J = transpose(mat3(orthoZoom, 0.0, 0.0,
                                0.0, orthoZoom, 0.0,
                                0.0, 0.0, 0.0));
            } else {
                // Construct the Jacobian of the affine approximation of the projection matrix. It will be used to transform the
                // 3D covariance matrix instead of using the actual projection matrix because that transformation would
                // require a non-linear component (perspective division) which would yield a non-gaussian result.
                float s = 1.0 / (viewCenter.z * viewCenter.z);
                J = mat3(
                    focal.x / viewCenter.z, 0., -(focal.x * viewCenter.x) * s,
                    0., focal.y / viewCenter.z, -(focal.y * viewCenter.y) * s,
                    0., 0., 0.
                );
            }

            // Concatenate the projection approximation with the model-view transformation
            mat3 W = transpose(mat3(transformModelViewMatrix));
            mat3 T = W * J;

            // Transform the 3D covariance matrix (Vrk) to compute the 2D covariance matrix
            mat3 cov2Dm = transpose(T) * Vrk * T;
            `;return e?s+=`
                float detOrig = cov2Dm[0][0] * cov2Dm[1][1] - cov2Dm[0][1] * cov2Dm[0][1];
                cov2Dm[0][0] += ${i};
                cov2Dm[1][1] += ${i};
                float detBlur = cov2Dm[0][0] * cov2Dm[1][1] - cov2Dm[0][1] * cov2Dm[0][1];
                vColor.a *= sqrt(max(detOrig / detBlur, 0.0));
                if (vColor.a < minAlpha) return;
            `:s+=`
                cov2Dm[0][0] += ${i};
                cov2Dm[1][1] += ${i};
            `,s+=`

            // We are interested in the upper-left 2x2 portion of the projected 3D covariance matrix because
            // we only care about the X and Y values. We want the X-diagonal, cov2Dm[0][0],
            // the Y-diagonal, cov2Dm[1][1], and the correlation between the two cov2Dm[0][1]. We don't
            // need cov2Dm[1][0] because it is a symetric matrix.
            vec3 cov2Dv = vec3(cov2Dm[0][0], cov2Dm[0][1], cov2Dm[1][1]);

            // We now need to solve for the eigen-values and eigen vectors of the 2D covariance matrix
            // so that we can determine the 2D basis for the splat. This is done using the method described
            // here: https://people.math.harvard.edu/~knill/teaching/math21b2004/exhibits/2dmatrices/index.html
            // After calculating the eigen-values and eigen-vectors, we calculate the basis for rendering the splat
            // by normalizing the eigen-vectors and then multiplying them by (sqrt(8) * sqrt(eigen-value)), which is
            // equal to scaling them by sqrt(8) standard deviations.
            //
            // This is a different approach than in the original work at INRIA. In that work they compute the
            // max extents of the projected splat in screen space to form a screen-space aligned bounding rectangle
            // which forms the geometry that is actually rasterized. The dimensions of that bounding box are 3.0
            // times the square root of the maximum eigen-value, or 3 standard deviations. They then use the inverse
            // 2D covariance matrix (called 'conic') in the CUDA rendering thread to determine fragment opacity by
            // calculating the full gaussian: exp(-0.5 * (X - mean) * conic * (X - mean)) * splat opacity
            float a = cov2Dv.x;
            float d = cov2Dv.z;
            float b = cov2Dv.y;
            float D = a * d - b * b;
            float trace = a + d;
            float traceOver2 = 0.5 * trace;
            float term2 = sqrt(max(0.1f, traceOver2 * traceOver2 - D));
            float eigenValue1 = traceOver2 + term2;
            float eigenValue2 = traceOver2 - term2;

            if (pointCloudModeEnabled == 1) {
                eigenValue1 = eigenValue2 = 0.2;
            }

            if (eigenValue2 <= 0.0) return;

            vec2 eigenVector1 = normalize(vec2(b, eigenValue1 - a));
            // since the eigen vectors are orthogonal, we derive the second one from the first
            vec2 eigenVector2 = vec2(eigenVector1.y, -eigenVector1.x);

            // We use sqrt(8) standard deviations instead of 3 to eliminate more of the splat with a very low opacity.
            vec2 basisVector1 = eigenVector1 * splatScale * min(sqrt8 * sqrt(eigenValue1), ${parseInt(n)}.0);
            vec2 basisVector2 = eigenVector2 * splatScale * min(sqrt8 * sqrt(eigenValue2), ${parseInt(n)}.0);
            `,t&&(s+=`
                vColor.a *= splatOpacityFromScene;
            `),s+=`
            vec2 ndcOffset = vec2(vPosition.x * basisVector1 + vPosition.y * basisVector2) *
                             basisViewport * 2.0 * inverseFocalAdjustment;

            vec4 quadPos = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);
            gl_Position = quadPos;

            // Scale the position data we send to the fragment shader
            vPosition *= sqrt8;
        `,s+=es.getVertexShaderFadeIn(),s+="}",s}static buildFragmentShader(){let e=`
            precision highp float;
            #include <common>
 
            uniform vec3 debugColor;

            varying vec4 vColor;
            varying vec2 vUv;
            varying vec2 vPosition;
        `;return e+=`
            void main () {
                // Compute the positional squared distance from the center of the splat to the current fragment.
                float A = dot(vPosition, vPosition);
                // Since the positional data in vPosition has been scaled by sqrt(8), the squared result will be
                // scaled by a factor of 8. If the squared result is larger than 8, it means it is outside the ellipse
                // defined by the rectangle formed by vPosition. It also means it's farther
                // away than sqrt(8) standard deviations from the mean.
                if (A > 8.0) discard;
                vec3 color = vColor.rgb;

                // Since the rendered splat is scaled by sqrt(8), the inverse covariance matrix that is part of
                // the gaussian formula becomes the identity matrix. We're then left with (X - mean) * (X - mean),
                // and since 'mean' is zero, we have X * X, which is the same as A:
                float opacity = exp(-0.5 * A) * vColor.a;

                gl_FragColor = vec4(color.rgb, opacity);
            }
        `,e}}class Lr{static build(e=!1,t=!1,n=1,i=!1,s=0){let a=es.buildVertexShaderBase(e,t,s,`
            uniform vec2 scaleRotationsTextureSize;
            uniform highp sampler2D scaleRotationsTexture;
            varying mat3 vT;
            varying vec2 vQuadCenter;
            varying vec2 vFragCoord;
        `);a+=Lr.buildVertexShaderProjection();const l=Lr.buildFragmentShader(),c=es.getUniforms(e,t,s,n,i);return c.scaleRotationsTexture={type:"t",value:null},c.scaleRotationsTextureSize={type:"v2",value:new xe(1024,1024)},new $t({uniforms:c,vertexShader:a,fragmentShader:l,transparent:!0,alphaTest:1,blending:ei,depthTest:!0,depthWrite:!1,side:nn})}static buildVertexShaderProjection(){let e=`

            vec4 scaleRotationA = texture(scaleRotationsTexture, getDataUVF(nearestEvenIndex, 1.5,
                                                                            oddOffset, scaleRotationsTextureSize));
            vec4 scaleRotationB = texture(scaleRotationsTexture, getDataUVF(nearestEvenIndex, 1.5,
                                                                            oddOffset + uint(1), scaleRotationsTextureSize));

            vec3 scaleRotation123 = vec3(scaleRotationA.rgb) * (1.0 - fOddOffset) +
                                    vec3(scaleRotationA.ba, scaleRotationB.r) * fOddOffset;
            vec3 scaleRotation456 = vec3(scaleRotationA.a, scaleRotationB.rg) * (1.0 - fOddOffset) +
                                    vec3(scaleRotationB.gba) * fOddOffset;

            float missingW = sqrt(1.0 - scaleRotation456.x * scaleRotation456.x - scaleRotation456.y *
                                    scaleRotation456.y - scaleRotation456.z * scaleRotation456.z);
            mat3 R = quaternionToRotationMatrix(scaleRotation456.r, scaleRotation456.g, scaleRotation456.b, missingW);
            mat3 S = mat3(scaleRotation123.r, 0.0, 0.0,
                            0.0, scaleRotation123.g, 0.0,
                            0.0, 0.0, scaleRotation123.b);
            
            mat3 L = R * S;

            mat3x4 splat2World = mat3x4(vec4(L[0], 0.0),
                                        vec4(L[1], 0.0),
                                        vec4(splatCenter.x, splatCenter.y, splatCenter.z, 1.0));

            mat4 world2ndc = transpose(projectionMatrix * transformModelViewMatrix);

            mat3x4 ndc2pix = mat3x4(vec4(viewport.x / 2.0, 0.0, 0.0, (viewport.x - 1.0) / 2.0),
                                    vec4(0.0, viewport.y / 2.0, 0.0, (viewport.y - 1.0) / 2.0),
                                    vec4(0.0, 0.0, 0.0, 1.0));

            mat3 T = transpose(splat2World) * world2ndc * ndc2pix;
            vec3 normal = vec3(viewMatrix * vec4(L[0][2], L[1][2], L[2][2], 0.0));
        `;return e+=`

                mat4 splat2World4 = mat4(vec4(L[0], 0.0),
                                        vec4(L[1], 0.0),
                                        vec4(L[2], 0.0),
                                        vec4(splatCenter.x, splatCenter.y, splatCenter.z, 1.0));

                mat4 Tt = transpose(transpose(splat2World4) * world2ndc);

                vec4 tempPoint1 = Tt * vec4(1.0, 0.0, 0.0, 1.0);
                tempPoint1 /= tempPoint1.w;

                vec4 tempPoint2 = Tt * vec4(0.0, 1.0, 0.0, 1.0);
                tempPoint2 /= tempPoint2.w;

                vec4 center = Tt * vec4(0.0, 0.0, 0.0, 1.0);
                center /= center.w;

                vec2 basisVector1 = tempPoint1.xy - center.xy;
                vec2 basisVector2 = tempPoint2.xy - center.xy;

                vec2 basisVector1Screen = basisVector1 * 0.5 * viewport;
                vec2 basisVector2Screen = basisVector2 * 0.5 * viewport;

                const float minPix = 1.;
                if (length(basisVector1Screen) < minPix || length(basisVector2Screen) < minPix) {
                    
            vec3 T0 = vec3(T[0][0], T[0][1], T[0][2]);
            vec3 T1 = vec3(T[1][0], T[1][1], T[1][2]);
            vec3 T3 = vec3(T[2][0], T[2][1], T[2][2]);

            vec3 tempPoint = vec3(1.0, 1.0, -1.0);
            float distance = (T3.x * T3.x * tempPoint.x) + (T3.y * T3.y * tempPoint.y) + (T3.z * T3.z * tempPoint.z);
            vec3 f = (1.0 / distance) * tempPoint;
            if (abs(distance) < 0.00001) return;

            float pointImageX = (T0.x * T3.x * f.x) + (T0.y * T3.y * f.y) + (T0.z * T3.z * f.z);
            float pointImageY = (T1.x * T3.x * f.x) + (T1.y * T3.y * f.y) + (T1.z * T3.z * f.z);
            vec2 pointImage = vec2(pointImageX, pointImageY);

            float tempX = (T0.x * T0.x * f.x) + (T0.y * T0.y * f.y) + (T0.z * T0.z * f.z);
            float tempY = (T1.x * T1.x * f.x) + (T1.y * T1.y * f.y) + (T1.z * T1.z * f.z);
            vec2 temp = vec2(tempX, tempY);

            vec2 halfExtend = pointImage * pointImage - temp;
            vec2 extent = sqrt(max(vec2(0.0001), halfExtend));
            float radius = max(extent.x, extent.y);

            vec2 ndcOffset = ((position.xy * radius * 3.0) * basisViewport * 2.0);

            vec4 quadPos = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);
            gl_Position = quadPos;

            vT = T;
            vQuadCenter = pointImage;
            vFragCoord = (quadPos.xy * 0.5 + 0.5) * viewport;
        
                } else {
                    vec2 ndcOffset = vec2(position.x * basisVector1 + position.y * basisVector2) * 3.0 * inverseFocalAdjustment;
                    vec4 quadPos = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);
                    gl_Position = quadPos;

                    vT = T;
                    vQuadCenter = center.xy;
                    vFragCoord = (quadPos.xy * 0.5 + 0.5) * viewport;
                }
            `,e+=es.getVertexShaderFadeIn(),e+="}",e}static buildFragmentShader(){return`
            precision highp float;
            #include <common>

            uniform vec3 debugColor;

            varying vec4 vColor;
            varying vec2 vUv;
            varying vec2 vPosition;
            varying mat3 vT;
            varying vec2 vQuadCenter;
            varying vec2 vFragCoord;

            void main () {

                const float FilterInvSquare = 2.0;
                const float near_n = 0.2;
                const float T = 1.0;

                vec2 xy = vQuadCenter;
                vec3 Tu = vT[0];
                vec3 Tv = vT[1];
                vec3 Tw = vT[2];
                vec3 k = vFragCoord.x * Tw - Tu;
                vec3 l = vFragCoord.y * Tw - Tv;
                vec3 p = cross(k, l);
                if (p.z == 0.0) discard;
                vec2 s = vec2(p.x / p.z, p.y / p.z);
                float rho3d = (s.x * s.x + s.y * s.y); 
                vec2 d = vec2(xy.x - vFragCoord.x, xy.y - vFragCoord.y);
                float rho2d = FilterInvSquare * (d.x * d.x + d.y * d.y); 

                // compute intersection and depth
                float rho = min(rho3d, rho2d);
                float depth = (rho3d <= rho2d) ? (s.x * Tw.x + s.y * Tw.y) + Tw.z : Tw.z; 
                if (depth < near_n) discard;
                //  vec4 nor_o = collected_normal_opacity[j];
                //  float normal[3] = {nor_o.x, nor_o.y, nor_o.z};
                float opa = vColor.a;

                float power = -0.5f * rho;
                if (power > 0.0f) discard;

                // Eq. (2) from 3D Gaussian splatting paper.
                // Obtain alpha by multiplying with Gaussian opacity
                // and its exponential falloff from mean.
                // Avoid numerical instabilities (see paper appendix). 
                float alpha = min(0.99f, opa * exp(power));
                if (alpha < 1.0f / 255.0f) discard;
                float test_T = T * (1.0 - alpha);
                if (test_T < 0.0001)discard;

                float w = alpha * T;
                gl_FragColor = vec4(vColor.rgb, w);
            }
        `}}class UA{static build(e){const t=new rn;t.setIndex([0,1,2,0,2,3]);const n=new Float32Array(4*3),i=new sn(n,3);t.setAttribute("position",i),i.setXYZ(0,-1,-1,0),i.setXYZ(1,-1,1,0),i.setXYZ(2,1,1,0),i.setXYZ(3,1,-1,0),i.needsUpdate=!0;const s=new T0().copy(t),o=new Uint32Array(e),a=new E0(o,1,!1);return a.setUsage(ju),s.setAttribute("splatIndex",a),s.instanceCount=0,s}}class OA extends Mt{constructor(e,t=new b,n=new nt,i=new b(1,1,1),s=1,o=1,a=!0){super(),this.splatBuffer=e,this.position.copy(t),this.quaternion.copy(n),this.scale.copy(i),this.transform=new ze,this.minimumAlpha=s,this.opacity=o,this.visible=a}copyTransformData(e){this.position.copy(e.position),this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.transform.copy(e.transform)}updateTransform(e){e?(this.matrixWorldAutoUpdate&&this.updateWorldMatrix(!0,!1),this.transform.copy(this.matrixWorld)):(this.matrixAutoUpdate&&this.updateMatrix(),this.transform.copy(this.matrix))}}const zr=class zr{constructor(e,t,n,i){this.min=new b().copy(e),this.max=new b().copy(t),this.boundingBox=new hn(this.min,this.max),this.center=new b().copy(this.max).sub(this.min).multiplyScalar(.5).add(this.min),this.depth=n,this.children=[],this.data=null,this.id=i||zr.idGen++}};ce(zr,"idGen",0);let ta=zr;class Rs{constructor(e,t){this.maxDepth=e,this.maxCentersPerNode=t,this.sceneDimensions=new b,this.sceneMin=new b,this.sceneMax=new b,this.rootNode=null,this.nodesWithIndexes=[],this.splatMesh=null}static convertWorkerSubTreeNode(e){const t=new b().fromArray(e.min),n=new b().fromArray(e.max),i=new ta(t,n,e.depth,e.id);if(e.data.indexes){i.data={indexes:[]};for(let s of e.data.indexes)i.data.indexes.push(s)}if(e.children)for(let s of e.children)i.children.push(Rs.convertWorkerSubTreeNode(s));return i}static convertWorkerSubTree(e,t){const n=new Rs(e.maxDepth,e.maxCentersPerNode);n.sceneMin=new b().fromArray(e.sceneMin),n.sceneMax=new b().fromArray(e.sceneMax),n.splatMesh=t,n.rootNode=Rs.convertWorkerSubTreeNode(e.rootNode);const i=(s,o)=>{s.children.length===0&&o(s);for(let a of s.children)i(a,o)};return n.nodesWithIndexes=[],i(n.rootNode,s=>{s.data&&s.data.indexes&&s.data.indexes.length>0&&n.nodesWithIndexes.push(s)}),n}}function NA(r){let e=0;class t{constructor(l,c){this.min=[l[0],l[1],l[2]],this.max=[c[0],c[1],c[2]]}containsPoint(l){return l[0]>=this.min[0]&&l[0]<=this.max[0]&&l[1]>=this.min[1]&&l[1]<=this.max[1]&&l[2]>=this.min[2]&&l[2]<=this.max[2]}}class n{constructor(l,c){this.maxDepth=l,this.maxCentersPerNode=c,this.sceneDimensions=[],this.sceneMin=[],this.sceneMax=[],this.rootNode=null,this.addedIndexes={},this.nodesWithIndexes=[],this.splatMesh=null,this.disposed=!1}}class i{constructor(l,c,d,u){this.min=[l[0],l[1],l[2]],this.max=[c[0],c[1],c[2]],this.center=[(c[0]-l[0])*.5+l[0],(c[1]-l[1])*.5+l[1],(c[2]-l[2])*.5+l[2]],this.depth=d,this.children=[],this.data=null,this.id=u||e++}}processSplatTreeNode=function(a,l,c,d){const u=l.data.indexes.length;if(u<a.maxCentersPerNode||l.depth>a.maxDepth){const S=[];for(let x=0;x<l.data.indexes.length;x++)a.addedIndexes[l.data.indexes[x]]||(S.push(l.data.indexes[x]),a.addedIndexes[l.data.indexes[x]]=!0);l.data.indexes=S,l.data.indexes.sort((x,v)=>x>v?1:-1),a.nodesWithIndexes.push(l);return}const f=[l.max[0]-l.min[0],l.max[1]-l.min[1],l.max[2]-l.min[2]],h=[f[0]*.5,f[1]*.5,f[2]*.5],g=[l.min[0]+h[0],l.min[1]+h[1],l.min[2]+h[2]],A=[new t([g[0]-h[0],g[1],g[2]-h[2]],[g[0],g[1]+h[1],g[2]]),new t([g[0],g[1],g[2]-h[2]],[g[0]+h[0],g[1]+h[1],g[2]]),new t([g[0],g[1],g[2]],[g[0]+h[0],g[1]+h[1],g[2]+h[2]]),new t([g[0]-h[0],g[1],g[2]],[g[0],g[1]+h[1],g[2]+h[2]]),new t([g[0]-h[0],g[1]-h[1],g[2]-h[2]],[g[0],g[1],g[2]]),new t([g[0],g[1]-h[1],g[2]-h[2]],[g[0]+h[0],g[1],g[2]]),new t([g[0],g[1]-h[1],g[2]],[g[0]+h[0],g[1],g[2]+h[2]]),new t([g[0]-h[0],g[1]-h[1],g[2]],[g[0],g[1],g[2]+h[2]])],p=[];for(let S=0;S<A.length;S++)p[S]=[];const m=[0,0,0];for(let S=0;S<u;S++){const x=l.data.indexes[S],v=c[x];m[0]=d[v],m[1]=d[v+1],m[2]=d[v+2];for(let E=0;E<A.length;E++)A[E].containsPoint(m)&&p[E].push(x)}for(let S=0;S<A.length;S++){const x=new i(A[S].min,A[S].max,l.depth+1);x.data={indexes:p[S]},l.children.push(x)}l.data={};for(let S of l.children)processSplatTreeNode(a,S,c,d)};const s=(a,l,c)=>{const d=[0,0,0],u=[0,0,0],f=[],h=Math.floor(a.length/4);for(let A=0;A<h;A++){const p=A*4,m=a[p],S=a[p+1],x=a[p+2],v=Math.round(a[p+3]);(A===0||m<d[0])&&(d[0]=m),(A===0||m>u[0])&&(u[0]=m),(A===0||S<d[1])&&(d[1]=S),(A===0||S>u[1])&&(u[1]=S),(A===0||x<d[2])&&(d[2]=x),(A===0||x>u[2])&&(u[2]=x),f.push(v)}const g=new n(l,c);return g.sceneMin=d,g.sceneMax=u,g.rootNode=new i(g.sceneMin,g.sceneMax,0),g.rootNode.data={indexes:f},g};function o(a,l,c){const d=[];for(let f of a){const h=Math.floor(f.length/4);for(let g=0;g<h;g++){const A=g*4,p=Math.round(f[A+3]);d[p]=A}}const u=[];for(let f of a){const h=s(f,l,c);u.push(h),processSplatTreeNode(h,h.rootNode,d,f)}r.postMessage({subTrees:u})}r.onmessage=a=>{a.data.process&&o(a.data.process.centers,a.data.process.maxDepth,a.data.process.maxCentersPerNode)}}function zA(r,e,t,n,i){r.postMessage({process:{centers:e,maxDepth:n,maxCentersPerNode:i}},t)}function HA(){return new Worker(URL.createObjectURL(new Blob(["(",NA.toString(),")(self)"],{type:"application/javascript"})))}class kA{constructor(e,t){ce(this,"processSplatMesh",function(e,t=()=>!0,n,i){this.splatTreeWorker||(this.splatTreeWorker=HA()),this.splatMesh=e,this.subTrees=[];const s=new b,o=(a,l)=>{const c=new Float32Array(l*4);let d=0;for(let u=0;u<l;u++){const f=u+a;if(t(f)){e.getSplatCenter(f,s);const h=d*4;c[h]=s.x,c[h+1]=s.y,c[h+2]=s.z,c[h+3]=f,d++}}return c};return new Promise(a=>{const l=()=>this.disposed?(this.diposeSplatTreeWorker(),a(),!0):!1;n&&n(!1),jt(()=>{if(l())return;const c=[];if(e.dynamicMode){let d=0;for(let u=0;u<e.scenes.length;u++){const h=e.getScene(u).splatBuffer.getSplatCount(),g=o(d,h);c.push(g),d+=h}}else{const d=o(0,e.getSplatCount());c.push(d)}this.splatTreeWorker.onmessage=d=>{l()||d.data.subTrees&&(i&&i(!1),jt(()=>{if(!l()){for(let u of d.data.subTrees){const f=Rs.convertWorkerSubTree(u,e);this.subTrees.push(f)}this.diposeSplatTreeWorker(),i&&i(!0),jt(()=>{a()})}}))},jt(()=>{if(l())return;n&&n(!0);const d=c.map(u=>u.buffer);zA(this.splatTreeWorker,c,d,this.maxDepth,this.maxCentersPerNode)})})})});this.maxDepth=e,this.maxCentersPerNode=t,this.subTrees=[],this.splatMesh=null}dispose(){this.diposeSplatTreeWorker(),this.disposed=!0}diposeSplatTreeWorker(){this.splatTreeWorker&&this.splatTreeWorker.terminate(),this.splatTreeWorker=null}countLeaves(){let e=0;return this.visitLeaves(()=>{e++}),e}visitLeaves(e){const t=(n,i)=>{n.children.length===0&&i(n);for(let s of n.children)t(s,i)};for(let n of this.subTrees)t(n.rootNode,e)}}function VA(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function GA(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const y=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(y){if(y==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),A=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,v=o||e.has("OES_texture_float"),E=x&&v,C=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:u,maxVertexTextures:f,maxTextureSize:h,maxCubemapSize:g,maxAttributes:A,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:v,floatVertexTextures:E,maxSamples:C}}const ts={Default:0,Instant:2},ns={None:0,Info:3},Ic=new rn,WA=new Mi,_r=6,XA=4,qA=4,QA=4,YA=6,KA=8,Bo=4,Uo=4,Pc=1,jA=.012,ZA=.003,Dc=1,Fc=16777216;class Rt extends gt{constructor(t=Ln.ThreeD,n=!1,i=!1,s=!1,o=1,a=!0,l=!1,c=!1,d=1024,u=ns.None,f=0,h=1,g=.3){super(Ic,WA);ce(this,"buildSplatTree",function(t=[],n,i){return new Promise(s=>{this.disposeSplatTree(),this.baseSplatTree=new kA(8,1e3);const o=performance.now(),a=new _t;this.baseSplatTree.processSplatMesh(this,l=>{this.getSplatColor(l,a);const c=this.getSceneIndexForSplat(l),d=t[c]||1;return a.w>=d},n,i).then(()=>{const l=performance.now()-o;if(this.logLevel>=ns.Info&&console.log("SplatTree build: "+l+" ms"),this.disposed)s();else{this.splatTree=this.baseSplatTree,this.baseSplatTree=null;let c=0,d=0,u=0;this.splatTree.visitLeaves(f=>{const h=f.data.indexes.length;h>0&&(d+=h,u++,c++)}),this.logLevel>=ns.Info&&(console.log(`SplatTree leaves: ${this.splatTree.countLeaves()}`),console.log(`SplatTree leaves with splats:${c}`),d=d/u,console.log(`Avg splat count per node: ${d}`),console.log(`Total splat count: ${this.getSplatCount()}`)),s()}})})});ce(this,"updateUniforms",function(){const t=new xe;return function(n,i,s,o,a,l){if(this.getSplatCount()>0){if(t.set(n.x*this.devicePixelRatio,n.y*this.devicePixelRatio),this.material.uniforms.viewport.value.copy(t),this.material.uniforms.basisViewport.value.set(1/t.x,1/t.y),this.material.uniforms.focal.value.set(i,s),this.material.uniforms.orthographicMode.value=o?1:0,this.material.uniforms.orthoZoom.value=a,this.material.uniforms.inverseFocalAdjustment.value=l,this.dynamicMode)for(let d=0;d<this.scenes.length;d++)this.material.uniforms.transforms.value[d].copy(this.getScene(d).transform);if(this.enableOptionalEffects)for(let d=0;d<this.scenes.length;d++)this.material.uniforms.sceneOpacity.value[d]=ut(this.getScene(d).opacity,0,1),this.material.uniforms.sceneVisibility.value[d]=this.getScene(d).visible?1:0,this.material.uniformsNeedUpdate=!0;this.material.uniformsNeedUpdate=!0}}}());ce(this,"setupDistancesComputationTransformFeedback",function(){let t;return function(){const n=this.getMaxSplatCount();if(!this.renderer)return;const i=this.lastRenderer!==this.renderer,s=t!==n;if(!i&&!s)return;i?this.disposeDistancesComputationGPUResources():s&&this.disposeDistancesComputationGPUBufferResources();const o=this.renderer.getContext(),a=(h,g,A)=>{const p=h.createShader(g);if(!p)return console.error("Fatal error: gl could not create a shader object."),null;if(h.shaderSource(p,A),h.compileShader(p),!h.getShaderParameter(p,h.COMPILE_STATUS)){let S="unknown";g===h.VERTEX_SHADER?S="vertex shader":g===h.FRAGMENT_SHADER&&(S="fragement shader");const x=h.getShaderInfoLog(p);return console.error("Failed to compile "+S+" with these errors:"+x),h.deleteShader(p),null}return p};let l;this.integerBasedDistancesComputation?(l=`#version 300 es
                in ivec4 center;
                flat out int distance;`,this.dynamicMode?l+=`
                        in uint sceneIndex;
                        uniform ivec4 transforms[${Ye.MaxScenes}];
                        void main(void) {
                            ivec4 transform = transforms[sceneIndex];
                            distance = center.x * transform.x + center.y * transform.y + center.z * transform.z + transform.w * center.w;
                        }
                    `:l+=`
                        uniform ivec3 modelViewProj;
                        void main(void) {
                            distance = center.x * modelViewProj.x + center.y * modelViewProj.y + center.z * modelViewProj.z;
                        }
                    `):(l=`#version 300 es
                in vec4 center;
                flat out float distance;`,this.dynamicMode?l+=`
                        in uint sceneIndex;
                        uniform mat4 transforms[${Ye.MaxScenes}];
                        void main(void) {
                            vec4 transformedCenter = transforms[sceneIndex] * vec4(center.xyz, 1.0);
                            distance = transformedCenter.z;
                        }
                    `:l+=`
                        uniform vec3 modelViewProj;
                        void main(void) {
                            distance = center.x * modelViewProj.x + center.y * modelViewProj.y + center.z * modelViewProj.z;
                        }
                    `);const c=`#version 300 es
                precision lowp float;
                out vec4 fragColor;
                void main(){}
            `,d=o.getParameter(o.VERTEX_ARRAY_BINDING),u=o.getParameter(o.CURRENT_PROGRAM),f=u?o.getProgramParameter(u,o.DELETE_STATUS):!1;if(i&&(this.distancesTransformFeedback.vao=o.createVertexArray()),o.bindVertexArray(this.distancesTransformFeedback.vao),i){const h=o.createProgram(),g=a(o,o.VERTEX_SHADER,l),A=a(o,o.FRAGMENT_SHADER,c);if(!g||!A)throw new Error("Could not compile shaders for distances computation on GPU.");if(o.attachShader(h,g),o.attachShader(h,A),o.transformFeedbackVaryings(h,["distance"],o.SEPARATE_ATTRIBS),o.linkProgram(h),!o.getProgramParameter(h,o.LINK_STATUS)){const m=o.getProgramInfoLog(h);throw console.error("Fatal error: Failed to link program: "+m),o.deleteProgram(h),o.deleteShader(A),o.deleteShader(g),new Error("Could not link shaders for distances computation on GPU.")}this.distancesTransformFeedback.program=h,this.distancesTransformFeedback.vertexShader=g,this.distancesTransformFeedback.vertexShader=A}if(o.useProgram(this.distancesTransformFeedback.program),this.distancesTransformFeedback.centersLoc=o.getAttribLocation(this.distancesTransformFeedback.program,"center"),this.dynamicMode){this.distancesTransformFeedback.sceneIndexesLoc=o.getAttribLocation(this.distancesTransformFeedback.program,"sceneIndex");for(let h=0;h<this.scenes.length;h++)this.distancesTransformFeedback.transformsLocs[h]=o.getUniformLocation(this.distancesTransformFeedback.program,`transforms[${h}]`)}else this.distancesTransformFeedback.modelViewProjLoc=o.getUniformLocation(this.distancesTransformFeedback.program,"modelViewProj");(i||s)&&(this.distancesTransformFeedback.centersBuffer=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,this.distancesTransformFeedback.centersBuffer),o.enableVertexAttribArray(this.distancesTransformFeedback.centersLoc),this.integerBasedDistancesComputation?o.vertexAttribIPointer(this.distancesTransformFeedback.centersLoc,4,o.INT,0,0):o.vertexAttribPointer(this.distancesTransformFeedback.centersLoc,4,o.FLOAT,!1,0,0),this.dynamicMode&&(this.distancesTransformFeedback.sceneIndexesBuffer=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,this.distancesTransformFeedback.sceneIndexesBuffer),o.enableVertexAttribArray(this.distancesTransformFeedback.sceneIndexesLoc),o.vertexAttribIPointer(this.distancesTransformFeedback.sceneIndexesLoc,1,o.UNSIGNED_INT,0,0))),(i||s)&&(this.distancesTransformFeedback.outDistancesBuffer=o.createBuffer()),o.bindBuffer(o.ARRAY_BUFFER,this.distancesTransformFeedback.outDistancesBuffer),o.bufferData(o.ARRAY_BUFFER,n*4,o.STATIC_READ),i&&(this.distancesTransformFeedback.id=o.createTransformFeedback()),o.bindTransformFeedback(o.TRANSFORM_FEEDBACK,this.distancesTransformFeedback.id),o.bindBufferBase(o.TRANSFORM_FEEDBACK_BUFFER,0,this.distancesTransformFeedback.outDistancesBuffer),u&&f!==!0&&o.useProgram(u),d&&o.bindVertexArray(d),this.lastRenderer=this.renderer,t=n}}());ce(this,"fillTransformsArray",function(){const t=[];return function(n){t.length!==n.length&&(t.length=n.length);for(let i=0;i<this.scenes.length;i++){const o=this.getScene(i).transform.elements;for(let a=0;a<16;a++)t[i*16+a]=o[a]}n.set(t)}}());ce(this,"computeDistancesOnGPU",function(){const t=new ze;return function(n,i){if(!this.renderer)return;const s=this.renderer.getContext(),o=s.getParameter(s.VERTEX_ARRAY_BINDING),a=s.getParameter(s.CURRENT_PROGRAM),l=a?s.getProgramParameter(a,s.DELETE_STATUS):!1;if(s.bindVertexArray(this.distancesTransformFeedback.vao),s.useProgram(this.distancesTransformFeedback.program),s.enable(s.RASTERIZER_DISCARD),this.dynamicMode)for(let u=0;u<this.scenes.length;u++)if(t.copy(this.getScene(u).transform),t.premultiply(n),this.integerBasedDistancesComputation){const f=Rt.getIntegerMatrixArray(t),h=[f[2],f[6],f[10],f[14]];s.uniform4i(this.distancesTransformFeedback.transformsLocs[u],h[0],h[1],h[2],h[3])}else s.uniformMatrix4fv(this.distancesTransformFeedback.transformsLocs[u],!1,t.elements);else if(this.integerBasedDistancesComputation){const u=Rt.getIntegerMatrixArray(n),f=[u[2],u[6],u[10]];s.uniform3i(this.distancesTransformFeedback.modelViewProjLoc,f[0],f[1],f[2])}else{const u=[n.elements[2],n.elements[6],n.elements[10]];s.uniform3f(this.distancesTransformFeedback.modelViewProjLoc,u[0],u[1],u[2])}s.bindBuffer(s.ARRAY_BUFFER,this.distancesTransformFeedback.centersBuffer),s.enableVertexAttribArray(this.distancesTransformFeedback.centersLoc),this.integerBasedDistancesComputation?s.vertexAttribIPointer(this.distancesTransformFeedback.centersLoc,4,s.INT,0,0):s.vertexAttribPointer(this.distancesTransformFeedback.centersLoc,4,s.FLOAT,!1,0,0),this.dynamicMode&&(s.bindBuffer(s.ARRAY_BUFFER,this.distancesTransformFeedback.sceneIndexesBuffer),s.enableVertexAttribArray(this.distancesTransformFeedback.sceneIndexesLoc),s.vertexAttribIPointer(this.distancesTransformFeedback.sceneIndexesLoc,1,s.UNSIGNED_INT,0,0)),s.bindTransformFeedback(s.TRANSFORM_FEEDBACK,this.distancesTransformFeedback.id),s.bindBufferBase(s.TRANSFORM_FEEDBACK_BUFFER,0,this.distancesTransformFeedback.outDistancesBuffer),s.beginTransformFeedback(s.POINTS),s.drawArrays(s.POINTS,0,this.getSplatCount()),s.endTransformFeedback(),s.bindBufferBase(s.TRANSFORM_FEEDBACK_BUFFER,0,null),s.bindTransformFeedback(s.TRANSFORM_FEEDBACK,null),s.disable(s.RASTERIZER_DISCARD);const c=s.fenceSync(s.SYNC_GPU_COMMANDS_COMPLETE,0);s.flush();const d=new Promise(u=>{const f=()=>{if(this.disposed)u();else switch(s.clientWaitSync(c,0,0)){case s.TIMEOUT_EXPIRED:return this.computeDistancesOnGPUSyncTimeout=setTimeout(f),this.computeDistancesOnGPUSyncTimeout;case s.WAIT_FAILED:throw new Error("should never get here");default:this.computeDistancesOnGPUSyncTimeout=null,s.deleteSync(c);const p=s.getParameter(s.VERTEX_ARRAY_BINDING);s.bindVertexArray(this.distancesTransformFeedback.vao),s.bindBuffer(s.ARRAY_BUFFER,this.distancesTransformFeedback.outDistancesBuffer),s.getBufferSubData(s.ARRAY_BUFFER,0,i),s.bindBuffer(s.ARRAY_BUFFER,null),p&&s.bindVertexArray(p),u()}};this.computeDistancesOnGPUSyncTimeout=setTimeout(f)});return a&&l!==!0&&s.useProgram(a),o&&s.bindVertexArray(o),d}}());ce(this,"getSplatCenter",function(){const t={};return function(n,i,s){this.getLocalSplatParameters(n,t,s),t.splatBuffer.getSplatCenter(t.localIndex,i,t.sceneTransform)}}());ce(this,"getSplatScaleAndRotation",function(){const t={},n=new b;return function(i,s,o,a){this.getLocalSplatParameters(i,t,a),n.x=void 0,n.y=void 0,n.z=void 0,this.splatRenderMode===Ln.TwoD&&(n.z=0),t.splatBuffer.getSplatScaleAndRotation(t.localIndex,s,o,t.sceneTransform,n)}}());ce(this,"getSplatColor",function(){const t={};return function(n,i){this.getLocalSplatParameters(n,t),t.splatBuffer.getSplatColor(t.localIndex,i)}}());this.renderer=void 0,this.splatRenderMode=t,this.dynamicMode=n,this.enableOptionalEffects=i,this.halfPrecisionCovariancesOnGPU=s,this.devicePixelRatio=o,this.enableDistancesComputationOnGPU=a,this.integerBasedDistancesComputation=l,this.antialiased=c,this.kernel2DSize=g,this.maxScreenSpaceSplatSize=d,this.logLevel=u,this.sphericalHarmonicsDegree=f,this.minSphericalHarmonicsDegree=0,this.sceneFadeInRateMultiplier=h,this.scenes=[],this.splatTree=null,this.baseSplatTree=null,this.splatDataTextures={},this.distancesTransformFeedback={id:null,vertexShader:null,fragmentShader:null,program:null,centersBuffer:null,sceneIndexesBuffer:null,outDistancesBuffer:null,centersLoc:-1,modelViewProjLoc:-1,sceneIndexesLoc:-1,transformsLocs:[]},this.globalSplatIndexToLocalSplatIndexMap=[],this.globalSplatIndexToSceneIndexMap=[],this.lastBuildSplatCount=0,this.lastBuildScenes=[],this.lastBuildMaxSplatCount=0,this.lastBuildSceneCount=0,this.firstRenderTime=-1,this.finalBuild=!1,this.webGLUtils=null,this.boundingBox=new hn,this.calculatedSceneCenter=new b,this.maxSplatDistanceFromSceneCenter=0,this.visibleRegionBufferRadius=0,this.visibleRegionRadius=0,this.visibleRegionFadeStartRadius=0,this.visibleRegionChanging=!1,this.splatScale=1,this.pointCloudModeEnabled=!1,this.disposed=!1,this.lastRenderer=null,this.visible=!1}static buildScenes(t,n,i){const s=[];s.length=n.length;for(let o=0;o<n.length;o++){const a=n[o],l=i[o]||{};let c=l.position||[0,0,0],d=l.rotation||[0,0,0,1],u=l.scale||[1,1,1];const f=new b().fromArray(c),h=new nt().fromArray(d),g=new b().fromArray(u),A=Rt.createScene(a,f,h,g,l.splatAlphaRemovalThreshold||1,l.opacity,l.visible);t.add(A),s[o]=A}return s}static createScene(t,n,i,s,o,a=1,l=!0){return new OA(t,n,i,s,o,a,l)}static buildSplatIndexMaps(t){const n=[],i=[];let s=0;for(let o=0;o<t.length;o++){const l=t[o].getMaxSplatCount();for(let c=0;c<l;c++)n[s]=c,i[s]=o,s++}return{localSplatIndexMap:n,sceneIndexMap:i}}build(t,n,i=!0,s=!1,o,a,l=!0){this.sceneOptions=n,this.finalBuild=s;const c=Rt.getTotalMaxSplatCountForSplatBuffers(t),d=Rt.buildScenes(this,t,n);if(i)for(let p=0;p<this.scenes.length&&p<d.length;p++){const m=d[p],S=this.getScene(p);m.copyTransformData(S)}this.scenes=d;let u=3;for(let p of t){const m=p.getMinSphericalHarmonicsDegree();m<u&&(u=m)}this.minSphericalHarmonicsDegree=Math.min(u,this.sphericalHarmonicsDegree);let f=!1;if(t.length!==this.lastBuildScenes.length)f=!0;else for(let p=0;p<t.length;p++)if(t[p]!==this.lastBuildScenes[p].splatBuffer){f=!0;break}let h=!0;if((this.scenes.length!==1||this.lastBuildSceneCount!==this.scenes.length||this.lastBuildMaxSplatCount!==c||f)&&(h=!1),!h){this.boundingBox=new hn,l||(this.maxSplatDistanceFromSceneCenter=0,this.visibleRegionBufferRadius=0,this.visibleRegionRadius=0,this.visibleRegionFadeStartRadius=0,this.firstRenderTime=-1),this.lastBuildScenes=[],this.lastBuildSplatCount=0,this.lastBuildMaxSplatCount=0,this.disposeMeshData(),this.geometry=UA.build(c),this.splatRenderMode===Ln.ThreeD?this.material=Fr.build(this.dynamicMode,this.enableOptionalEffects,this.antialiased,this.maxScreenSpaceSplatSize,this.splatScale,this.pointCloudModeEnabled,this.minSphericalHarmonicsDegree,this.kernel2DSize):this.material=Lr.build(this.dynamicMode,this.enableOptionalEffects,this.splatScale,this.pointCloudModeEnabled,this.minSphericalHarmonicsDegree);const p=Rt.buildSplatIndexMaps(t);this.globalSplatIndexToLocalSplatIndexMap=p.localSplatIndexMap,this.globalSplatIndexToSceneIndexMap=p.sceneIndexMap}const g=this.getSplatCount(!0);this.enableDistancesComputationOnGPU&&this.setupDistancesComputationTransformFeedback();const A=this.refreshGPUDataFromSplatBuffers(h);for(let p=0;p<this.scenes.length;p++)this.lastBuildScenes[p]=this.scenes[p];return this.lastBuildSplatCount=g,this.lastBuildMaxSplatCount=this.getMaxSplatCount(),this.lastBuildSceneCount=this.scenes.length,s&&this.scenes.length>0&&this.buildSplatTree(n.map(p=>p.splatAlphaRemovalThreshold||1),o,a).then(()=>{this.onSplatTreeReadyCallback&&this.onSplatTreeReadyCallback(this.splatTree),this.onSplatTreeReadyCallback=null}),this.visible=this.scenes.length>0,A}freeIntermediateSplatData(){const t=n=>{delete n.source.data,delete n.image,n.onUpdate=null};delete this.splatDataTextures.baseData.covariances,delete this.splatDataTextures.baseData.centers,delete this.splatDataTextures.baseData.colors,delete this.splatDataTextures.baseData.sphericalHarmonics,delete this.splatDataTextures.centerColors.data,delete this.splatDataTextures.covariances.data,this.splatDataTextures.sphericalHarmonics&&delete this.splatDataTextures.sphericalHarmonics.data,this.splatDataTextures.sceneIndexes&&delete this.splatDataTextures.sceneIndexes.data,this.splatDataTextures.centerColors.texture.needsUpdate=!0,this.splatDataTextures.centerColors.texture.onUpdate=()=>{t(this.splatDataTextures.centerColors.texture)},this.splatDataTextures.covariances.texture.needsUpdate=!0,this.splatDataTextures.covariances.texture.onUpdate=()=>{t(this.splatDataTextures.covariances.texture)},this.splatDataTextures.sphericalHarmonics&&(this.splatDataTextures.sphericalHarmonics.texture?(this.splatDataTextures.sphericalHarmonics.texture.needsUpdate=!0,this.splatDataTextures.sphericalHarmonics.texture.onUpdate=()=>{t(this.splatDataTextures.sphericalHarmonics.texture)}):this.splatDataTextures.sphericalHarmonics.textures.forEach(n=>{n.needsUpdate=!0,n.onUpdate=()=>{t(n)}})),this.splatDataTextures.sceneIndexes&&(this.splatDataTextures.sceneIndexes.texture.needsUpdate=!0,this.splatDataTextures.sceneIndexes.texture.onUpdate=()=>{t(this.splatDataTextures.sceneIndexes.texture)})}dispose(){this.disposeMeshData(),this.disposeTextures(),this.disposeSplatTree(),this.enableDistancesComputationOnGPU&&(this.computeDistancesOnGPUSyncTimeout&&(clearTimeout(this.computeDistancesOnGPUSyncTimeout),this.computeDistancesOnGPUSyncTimeout=null),this.disposeDistancesComputationGPUResources()),this.scenes=[],this.distancesTransformFeedback={id:null,vertexShader:null,fragmentShader:null,program:null,centersBuffer:null,sceneIndexesBuffer:null,outDistancesBuffer:null,centersLoc:-1,modelViewProjLoc:-1,sceneIndexesLoc:-1,transformsLocs:[]},this.renderer=null,this.globalSplatIndexToLocalSplatIndexMap=[],this.globalSplatIndexToSceneIndexMap=[],this.lastBuildSplatCount=0,this.lastBuildScenes=[],this.lastBuildMaxSplatCount=0,this.lastBuildSceneCount=0,this.firstRenderTime=-1,this.finalBuild=!1,this.webGLUtils=null,this.boundingBox=new hn,this.calculatedSceneCenter=new b,this.maxSplatDistanceFromSceneCenter=0,this.visibleRegionBufferRadius=0,this.visibleRegionRadius=0,this.visibleRegionFadeStartRadius=0,this.visibleRegionChanging=!1,this.splatScale=1,this.pointCloudModeEnabled=!1,this.disposed=!0,this.lastRenderer=null,this.visible=!1}disposeMeshData(){this.geometry&&this.geometry!==Ic&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null)}disposeTextures(){for(let t in this.splatDataTextures)if(this.splatDataTextures.hasOwnProperty(t)){const n=this.splatDataTextures[t];n.texture&&(n.texture.dispose(),n.texture=null)}this.splatDataTextures=null}disposeSplatTree(){this.splatTree&&(this.splatTree.dispose(),this.splatTree=null),this.baseSplatTree&&(this.baseSplatTree.dispose(),this.baseSplatTree=null)}getSplatTree(){return this.splatTree}onSplatTreeReady(t){this.onSplatTreeReadyCallback=t}getDataForDistancesComputation(t,n){const i=this.integerBasedDistancesComputation?this.getIntegerCenters(t,n,!0):this.getFloatCenters(t,n,!0),s=this.getSceneIndexes(t,n);return{centers:i,sceneIndexes:s}}refreshGPUDataFromSplatBuffers(t){const n=this.getSplatCount(!0);this.refreshDataTexturesFromSplatBuffers(t);const i=t?this.lastBuildSplatCount:0,{centers:s,sceneIndexes:o}=this.getDataForDistancesComputation(i,n-1);return this.enableDistancesComputationOnGPU&&this.refreshGPUBuffersForDistancesComputation(s,o,t),{from:i,to:n-1,count:n-i,centers:s,sceneIndexes:o}}refreshGPUBuffersForDistancesComputation(t,n,i=!1){const s=i?this.lastBuildSplatCount:0;this.updateGPUCentersBufferForDistancesComputation(i,t,s),this.updateGPUTransformIndexesBufferForDistancesComputation(i,n,s)}refreshDataTexturesFromSplatBuffers(t){const n=this.getSplatCount(!0),i=this.lastBuildSplatCount,s=n-1;t?this.updateBaseDataFromSplatBuffers(i,s):(this.setupDataTextures(),this.updateBaseDataFromSplatBuffers()),this.updateDataTexturesFromBaseData(i,s),this.updateVisibleRegion(t)}setupDataTextures(){const t=this.getMaxSplatCount(),n=this.getSplatCount(!0);this.disposeTextures();const i=(R,M)=>{const _=new xe(4096,1024);for(;_.x*_.y*R<t*M;)_.y*=2;return _},s=R=>R>=1?YA:qA,o=R=>{const M=s(R),_=i(M,6);return{elementsPerTexelStored:M,texSize:_}};let a=this.getTargetCovarianceCompressionLevel();const l=0,c=this.getTargetSphericalHarmonicsCompressionLevel();let d,u,f;if(this.splatRenderMode===Ln.ThreeD){const R=o(a);R.texSize.x*R.texSize.y>Fc&&a===0&&(a=1),d=new Float32Array(t*_r)}else u=new Float32Array(t*3),f=new Float32Array(t*4);const h=new Float32Array(t*3),g=new Uint8Array(t*4);let A=Float32Array;c===1?A=Uint16Array:c===2&&(A=Uint8Array);const p=Ji(this.minSphericalHarmonicsDegree),m=this.minSphericalHarmonicsDegree?new A(t*p):void 0,S=i(Uo,4),x=new Uint32Array(S.x*S.y*Uo);Rt.updateCenterColorsPaddedData(0,n-1,h,g,x);const v=new Yn(x,S.x,S.y,Cs,un);if(v.internalFormat="RGBA32UI",v.needsUpdate=!0,this.material.uniforms.centersColorsTexture.value=v,this.material.uniforms.centersColorsTextureSize.value.copy(S),this.material.uniformsNeedUpdate=!0,this.splatDataTextures={baseData:{covariances:d,scales:u,rotations:f,centers:h,colors:g,sphericalHarmonics:m},centerColors:{data:x,texture:v,size:S}},this.splatRenderMode===Ln.ThreeD){const R=o(a),M=R.elementsPerTexelStored,_=R.texSize;let I=a>=1?Uint32Array:Float32Array;const L=a>=1?KA:QA,D=new I(_.x*_.y*L);a===0?D.set(d):Rt.updatePaddedCompressedCovariancesTextureData(d,D,0,0,d.length);let F;if(a>=1)F=new Yn(D,_.x,_.y,Cs,un),F.internalFormat="RGBA32UI",this.material.uniforms.covariancesTextureHalfFloat.value=F;else{F=new Yn(D,_.x,_.y,Gt,xn),this.material.uniforms.covariancesTexture.value=F;const z=new Yn(new Uint32Array(32),2,2,Cs,un);z.internalFormat="RGBA32UI",this.material.uniforms.covariancesTextureHalfFloat.value=z,z.needsUpdate=!0}F.needsUpdate=!0,this.material.uniforms.covariancesAreHalfFloat.value=a>=1?1:0,this.material.uniforms.covariancesTextureSize.value.copy(_),this.splatDataTextures.covariances={data:D,texture:F,size:_,compressionLevel:a,elementsPerTexelStored:M,elementsPerTexelAllocated:L}}else{const M=i(Bo,6);let _=Float32Array,I=xn;const L=new _(M.x*M.y*Bo);Rt.updateScaleRotationsPaddedData(0,n-1,u,f,L);const D=new Yn(L,M.x,M.y,Gt,I);D.needsUpdate=!0,this.material.uniforms.scaleRotationsTexture.value=D,this.material.uniforms.scaleRotationsTextureSize.value.copy(M),this.splatDataTextures.scaleRotations={data:L,texture:D,size:M,compressionLevel:l}}if(m){const R=c===2?Hn:zs;let M=p;M%2!==0&&M++;const _=4,I=Gt;let L=i(_,M);if(L.x*L.y<=Fc){const D=L.x*L.y*_,F=new A(D);for(let N=0;N<n;N++){const G=p*N,k=M*N;for(let Y=0;Y<p;Y++)F[k+Y]=m[G+Y]}const z=new Yn(F,L.x,L.y,I,R);z.needsUpdate=!0,this.material.uniforms.sphericalHarmonicsTexture.value=z,this.splatDataTextures.sphericalHarmonics={componentCount:p,paddedComponentCount:M,data:F,textureCount:1,texture:z,size:L,compressionLevel:c,elementsPerTexel:_}}else{const D=p/3;M=D,M%2!==0&&M++,L=i(_,M);const F=L.x*L.y*_,z=[this.material.uniforms.sphericalHarmonicsTextureR,this.material.uniforms.sphericalHarmonicsTextureG,this.material.uniforms.sphericalHarmonicsTextureB],N=[],G=[];for(let k=0;k<3;k++){const Y=new A(F);N.push(Y);for(let de=0;de<n;de++){const Re=p*de,Pe=M*de;if(D>=3){for(let W=0;W<3;W++)Y[Pe+W]=m[Re+k*3+W];if(D>=8)for(let W=0;W<5;W++)Y[Pe+3+W]=m[Re+9+k*5+W]}}const J=new Yn(Y,L.x,L.y,I,R);G.push(J),J.needsUpdate=!0,z[k].value=J}this.material.uniforms.sphericalHarmonicsMultiTextureMode.value=1,this.splatDataTextures.sphericalHarmonics={componentCount:p,componentCountPerChannel:D,paddedComponentCount:M,data:N,textureCount:3,textures:G,size:L,compressionLevel:c,elementsPerTexel:_}}this.material.uniforms.sphericalHarmonicsTextureSize.value.copy(L),this.material.uniforms.sphericalHarmonics8BitMode.value=c===2?1:0;for(let D=0;D<this.scenes.length;D++){const F=this.scenes[D].splatBuffer;this.material.uniforms.sphericalHarmonics8BitCompressionRangeMin.value[D]=F.minSphericalHarmonicsCoeff,this.material.uniforms.sphericalHarmonics8BitCompressionRangeMax.value[D]=F.maxSphericalHarmonicsCoeff}this.material.uniformsNeedUpdate=!0}const E=i(Pc,4),C=new Uint32Array(E.x*E.y*Pc);for(let R=0;R<n;R++)C[R]=this.globalSplatIndexToSceneIndexMap[R];const y=new Yn(C,E.x,E.y,sa,un);y.internalFormat="R32UI",y.needsUpdate=!0,this.material.uniforms.sceneIndexesTexture.value=y,this.material.uniforms.sceneIndexesTextureSize.value.copy(E),this.material.uniformsNeedUpdate=!0,this.splatDataTextures.sceneIndexes={data:C,texture:y,size:E},this.material.uniforms.sceneCount.value=this.scenes.length}updateBaseDataFromSplatBuffers(t,n){const i=this.splatDataTextures.covariances,s=i?i.compressionLevel:void 0,o=this.splatDataTextures.scaleRotations,a=o?o.compressionLevel:void 0,l=this.splatDataTextures.sphericalHarmonics,c=l?l.compressionLevel:0;this.fillSplatDataArrays(this.splatDataTextures.baseData.covariances,this.splatDataTextures.baseData.scales,this.splatDataTextures.baseData.rotations,this.splatDataTextures.baseData.centers,this.splatDataTextures.baseData.colors,this.splatDataTextures.baseData.sphericalHarmonics,void 0,s,a,c,t,n,t)}updateDataTexturesFromBaseData(t,n){const i=this.splatDataTextures.covariances,s=i?i.compressionLevel:void 0,o=this.splatDataTextures.scaleRotations,a=o?o.compressionLevel:void 0,l=this.splatDataTextures.sphericalHarmonics,c=l?l.compressionLevel:0,d=this.splatDataTextures.centerColors,u=d.data,f=d.texture;Rt.updateCenterColorsPaddedData(t,n,this.splatDataTextures.baseData.centers,this.splatDataTextures.baseData.colors,u);const h=this.renderer?this.renderer.properties.get(f):null;if(!h||!h.__webglTexture?f.needsUpdate=!0:this.updateDataTexture(u,d.texture,d.size,h,Uo,XA,4,t,n),i){const x=i.texture,v=t*_r,E=n*_r;if(s===0)for(let y=v;y<=E;y++){const R=this.splatDataTextures.baseData.covariances[y];i.data[y]=R}else Rt.updatePaddedCompressedCovariancesTextureData(this.splatDataTextures.baseData.covariances,i.data,t*i.elementsPerTexelAllocated,v,E);const C=this.renderer?this.renderer.properties.get(x):null;!C||!C.__webglTexture?x.needsUpdate=!0:s===0?this.updateDataTexture(i.data,i.texture,i.size,C,i.elementsPerTexelStored,_r,4,t,n):this.updateDataTexture(i.data,i.texture,i.size,C,i.elementsPerTexelAllocated,i.elementsPerTexelAllocated,2,t,n)}if(o){const x=o.data,v=o.texture,E=6,C=a===0?4:2;Rt.updateScaleRotationsPaddedData(t,n,this.splatDataTextures.baseData.scales,this.splatDataTextures.baseData.rotations,x);const y=this.renderer?this.renderer.properties.get(v):null;!y||!y.__webglTexture?v.needsUpdate=!0:this.updateDataTexture(x,o.texture,o.size,y,Bo,E,C,t,n)}const g=this.splatDataTextures.baseData.sphericalHarmonics;if(g){let x=4;c===1?x=2:c===2&&(x=1);const v=(y,R,M,_,I)=>{const L=this.renderer?this.renderer.properties.get(y):null;!L||!L.__webglTexture?y.needsUpdate=!0:this.updateDataTexture(_,y,R,L,M,I,x,t,n)},E=l.componentCount,C=l.paddedComponentCount;if(l.textureCount===1){const y=l.data;for(let R=t;R<=n;R++){const M=E*R,_=C*R;for(let I=0;I<E;I++)y[_+I]=g[M+I]}v(l.texture,l.size,l.elementsPerTexel,y,C)}else{const y=l.componentCountPerChannel;for(let R=0;R<3;R++){const M=l.data[R];for(let _=t;_<=n;_++){const I=E*_,L=C*_;if(y>=3){for(let D=0;D<3;D++)M[L+D]=g[I+R*3+D];if(y>=8)for(let D=0;D<5;D++)M[L+3+D]=g[I+9+R*5+D]}}v(l.textures[R],l.size,l.elementsPerTexel,M,C)}}}const A=this.splatDataTextures.sceneIndexes,p=A.data;for(let x=this.lastBuildSplatCount;x<=n;x++)p[x]=this.globalSplatIndexToSceneIndexMap[x];const m=A.texture,S=this.renderer?this.renderer.properties.get(m):null;!S||!S.__webglTexture?m.needsUpdate=!0:this.updateDataTexture(p,A.texture,A.size,S,1,1,1,this.lastBuildSplatCount,n)}getTargetCovarianceCompressionLevel(){return this.halfPrecisionCovariancesOnGPU?1:0}getTargetSphericalHarmonicsCompressionLevel(){return Math.max(1,this.getMaximumSplatBufferCompressionLevel())}getMaximumSplatBufferCompressionLevel(){let t;for(let n=0;n<this.scenes.length;n++){const s=this.getScene(n).splatBuffer;(n===0||s.compressionLevel>t)&&(t=s.compressionLevel)}return t}getMinimumSplatBufferCompressionLevel(){let t;for(let n=0;n<this.scenes.length;n++){const s=this.getScene(n).splatBuffer;(n===0||s.compressionLevel<t)&&(t=s.compressionLevel)}return t}static computeTextureUpdateRegion(t,n,i,s,o){const a=o/s,l=t*a,c=Math.floor(l/i),d=c*i*s,u=n*a,f=Math.floor(u/i),h=f*i*s+i*s;return{dataStart:d,dataEnd:h,startRow:c,endRow:f}}updateDataTexture(t,n,i,s,o,a,l,c,d){const u=this.renderer.getContext(),f=Rt.computeTextureUpdateRegion(c,d,i.x,o,a),h=f.dataEnd-f.dataStart,g=new t.constructor(t.buffer,f.dataStart*l,h),A=f.endRow-f.startRow+1,p=this.webGLUtils.convert(n.type),m=this.webGLUtils.convert(n.format,n.colorSpace),S=u.getParameter(u.TEXTURE_BINDING_2D);u.bindTexture(u.TEXTURE_2D,s.__webglTexture),u.texSubImage2D(u.TEXTURE_2D,0,0,f.startRow,i.x,A,m,p,g),u.bindTexture(u.TEXTURE_2D,S)}static updatePaddedCompressedCovariancesTextureData(t,n,i,s,o){let a=new DataView(n.buffer),l=i,c=0;for(let d=s;d<=o;d+=2)a.setUint16(l*2,t[d],!0),a.setUint16(l*2+2,t[d+1],!0),l+=2,c++,c>=3&&(l+=2,c=0)}static updateCenterColorsPaddedData(t,n,i,s,o){for(let a=t;a<=n;a++){const l=a*4,c=a*3,d=a*4;o[d]=b0(s,l),o[d+1]=bo(i[c]),o[d+2]=bo(i[c+1]),o[d+3]=bo(i[c+2])}}static updateScaleRotationsPaddedData(t,n,i,s,o){for(let l=t;l<=n;l++){const c=l*3,d=l*4,u=l*6;o[u]=i[c],o[u+1]=i[c+1],o[u+2]=i[c+2],o[u+3]=s[d],o[u+4]=s[d+1],o[u+5]=s[d+2]}}updateVisibleRegion(t){const n=this.getSplatCount(!0),i=new b;if(!t){const o=new b;this.scenes.forEach(a=>{o.add(a.splatBuffer.sceneCenter)}),o.multiplyScalar(1/this.scenes.length),this.calculatedSceneCenter.copy(o),this.material.uniforms.sceneCenter.value.copy(this.calculatedSceneCenter),this.material.uniformsNeedUpdate=!0}const s=t?this.lastBuildSplatCount:0;for(let o=s;o<n;o++){this.getSplatCenter(o,i,!0);const a=i.sub(this.calculatedSceneCenter).length();a>this.maxSplatDistanceFromSceneCenter&&(this.maxSplatDistanceFromSceneCenter=a)}this.maxSplatDistanceFromSceneCenter-this.visibleRegionBufferRadius>Dc&&(this.visibleRegionBufferRadius=this.maxSplatDistanceFromSceneCenter,this.visibleRegionRadius=Math.max(this.visibleRegionBufferRadius-Dc,0)),this.finalBuild&&(this.visibleRegionRadius=this.visibleRegionBufferRadius=this.maxSplatDistanceFromSceneCenter),this.updateVisibleRegionFadeDistance()}updateVisibleRegionFadeDistance(t=ts.Default){const n=jA*this.sceneFadeInRateMultiplier,i=ZA*this.sceneFadeInRateMultiplier,s=this.finalBuild?n:i,o=t===ts.Default?s:i;this.visibleRegionFadeStartRadius=(this.visibleRegionRadius-this.visibleRegionFadeStartRadius)*o+this.visibleRegionFadeStartRadius;const l=(this.visibleRegionBufferRadius>0?this.visibleRegionFadeStartRadius/this.visibleRegionBufferRadius:0)>.99,c=l||t===ts.Instant?1:0;this.material.uniforms.visibleRegionFadeStartRadius.value=this.visibleRegionFadeStartRadius,this.material.uniforms.visibleRegionRadius.value=this.visibleRegionRadius,this.material.uniforms.firstRenderTime.value=this.firstRenderTime,this.material.uniforms.currentTime.value=performance.now(),this.material.uniforms.fadeInComplete.value=c,this.material.uniformsNeedUpdate=!0,this.visibleRegionChanging=!l}updateRenderIndexes(t,n){const i=this.geometry;i.attributes.splatIndex.set(t),i.attributes.splatIndex.needsUpdate=!0,n>0&&this.firstRenderTime===-1&&(this.firstRenderTime=performance.now()),i.instanceCount=n,i.setDrawRange(0,n)}updateTransforms(){for(let t=0;t<this.scenes.length;t++)this.getScene(t).updateTransform(this.dynamicMode)}setSplatScale(t=1){this.splatScale=t,this.material.uniforms.splatScale.value=t,this.material.uniformsNeedUpdate=!0}getSplatScale(){return this.splatScale}setPointCloudModeEnabled(t){this.pointCloudModeEnabled=t,this.material.uniforms.pointCloudModeEnabled.value=t?1:0,this.material.uniformsNeedUpdate=!0}getPointCloudModeEnabled(){return this.pointCloudModeEnabled}getSplatDataTextures(){return this.splatDataTextures}getSplatCount(t=!1){return t?Rt.getTotalSplatCountForScenes(this.scenes):this.lastBuildSplatCount}static getTotalSplatCountForScenes(t){let n=0;for(let i of t)i&&i.splatBuffer&&(n+=i.splatBuffer.getSplatCount());return n}static getTotalSplatCountForSplatBuffers(t){let n=0;for(let i of t)n+=i.getSplatCount();return n}getMaxSplatCount(){return Rt.getTotalMaxSplatCountForScenes(this.scenes)}static getTotalMaxSplatCountForScenes(t){let n=0;for(let i of t)i&&i.splatBuffer&&(n+=i.splatBuffer.getMaxSplatCount());return n}static getTotalMaxSplatCountForSplatBuffers(t){let n=0;for(let i of t)n+=i.getMaxSplatCount();return n}disposeDistancesComputationGPUResources(){if(!this.renderer)return;const t=this.renderer.getContext();this.distancesTransformFeedback.vao&&(t.deleteVertexArray(this.distancesTransformFeedback.vao),this.distancesTransformFeedback.vao=null),this.distancesTransformFeedback.program&&(t.deleteProgram(this.distancesTransformFeedback.program),t.deleteShader(this.distancesTransformFeedback.vertexShader),t.deleteShader(this.distancesTransformFeedback.fragmentShader),this.distancesTransformFeedback.program=null,this.distancesTransformFeedback.vertexShader=null,this.distancesTransformFeedback.fragmentShader=null),this.disposeDistancesComputationGPUBufferResources(),this.distancesTransformFeedback.id&&(t.deleteTransformFeedback(this.distancesTransformFeedback.id),this.distancesTransformFeedback.id=null)}disposeDistancesComputationGPUBufferResources(){if(!this.renderer)return;const t=this.renderer.getContext();this.distancesTransformFeedback.centersBuffer&&(this.distancesTransformFeedback.centersBuffer=null,t.deleteBuffer(this.distancesTransformFeedback.centersBuffer)),this.distancesTransformFeedback.outDistancesBuffer&&(t.deleteBuffer(this.distancesTransformFeedback.outDistancesBuffer),this.distancesTransformFeedback.outDistancesBuffer=null)}setRenderer(t){if(t!==this.renderer){this.renderer=t;const n=this.renderer.getContext(),i=new VA(n),s=new GA(n,i,{});if(i.init(s),this.webGLUtils=new vd(n,i),this.enableDistancesComputationOnGPU&&this.getSplatCount()>0){this.setupDistancesComputationTransformFeedback();const{centers:o,sceneIndexes:a}=this.getDataForDistancesComputation(0,this.getSplatCount()-1);this.refreshGPUBuffersForDistancesComputation(o,a)}}}updateGPUCentersBufferForDistancesComputation(t,n,i){if(!this.renderer)return;const s=this.renderer.getContext(),o=s.getParameter(s.VERTEX_ARRAY_BINDING);s.bindVertexArray(this.distancesTransformFeedback.vao);const a=this.integerBasedDistancesComputation?Uint32Array:Float32Array,l=16,c=i*l;if(s.bindBuffer(s.ARRAY_BUFFER,this.distancesTransformFeedback.centersBuffer),t)s.bufferSubData(s.ARRAY_BUFFER,c,n);else{const d=new a(this.getMaxSplatCount()*l);d.set(n),s.bufferData(s.ARRAY_BUFFER,d,s.STATIC_DRAW)}s.bindBuffer(s.ARRAY_BUFFER,null),o&&s.bindVertexArray(o)}updateGPUTransformIndexesBufferForDistancesComputation(t,n,i){if(!this.renderer||!this.dynamicMode)return;const s=this.renderer.getContext(),o=s.getParameter(s.VERTEX_ARRAY_BINDING);s.bindVertexArray(this.distancesTransformFeedback.vao);const a=i*4;if(s.bindBuffer(s.ARRAY_BUFFER,this.distancesTransformFeedback.sceneIndexesBuffer),t)s.bufferSubData(s.ARRAY_BUFFER,a,n);else{const l=new Uint32Array(this.getMaxSplatCount()*4);l.set(n),s.bufferData(s.ARRAY_BUFFER,l,s.STATIC_DRAW)}s.bindBuffer(s.ARRAY_BUFFER,null),o&&s.bindVertexArray(o)}getSceneIndexes(t,n){let i;const s=n-t+1;i=new Uint32Array(s);for(let o=t;o<=n;o++)i[o]=this.globalSplatIndexToSceneIndexMap[o];return i}getLocalSplatParameters(t,n,i){i==null&&(i=!this.dynamicMode),n.splatBuffer=this.getSplatBufferForSplat(t),n.localIndex=this.getSplatLocalIndex(t),n.sceneTransform=i?this.getSceneTransformForSplat(t):null}fillSplatDataArrays(t,n,i,s,o,a,l,c=0,d=0,u=1,f,h,g=0,A){const p=new b;p.x=void 0,p.y=void 0,this.splatRenderMode===Ln.ThreeD?p.z=void 0:p.z=1;const m=new ze;let S=0,x=this.scenes.length-1;A!=null&&A>=0&&A<=this.scenes.length&&(S=A,x=A);for(let v=S;v<=x;v++){l==null&&(l=!this.dynamicMode);const E=this.getScene(v),C=E.splatBuffer;let y;if(l&&(this.getSceneTransform(v,m),y=m),t&&C.fillSplatCovarianceArray(t,y,f,h,g,c),n||i){if(!n||!i)throw new Error('SplatMesh::fillSplatDataArrays() -> "scales" and "rotations" must both be valid.');C.fillSplatScaleRotationArray(n,i,y,f,h,g,d,p)}s&&C.fillSplatCenterArray(s,y,f,h,g),o&&C.fillSplatColorArray(o,E.minimumAlpha,f,h,g),a&&C.fillSphericalHarmonicsArray(a,this.minSphericalHarmonicsDegree,y,f,h,g,u),g+=C.getSplatCount()}}getIntegerCenters(t,n,i=!1){const s=n-t+1,o=new Float32Array(s*3);this.fillSplatDataArrays(null,null,null,o,null,null,void 0,void 0,void 0,void 0,t);let a,l=i?4:3;a=new Int32Array(s*l);for(let c=0;c<s;c++){for(let d=0;d<3;d++)a[c*l+d]=Math.round(o[c*3+d]*1e3);i&&(a[c*l+3]=1e3)}return a}getFloatCenters(t,n,i=!1){const s=n-t+1,o=new Float32Array(s*3);if(this.fillSplatDataArrays(null,null,null,o,null,null,void 0,void 0,void 0,void 0,t),!i)return o;let a=new Float32Array(s*4);for(let l=0;l<s;l++){for(let c=0;c<3;c++)a[l*4+c]=o[l*3+c];a[l*4+3]=1}return a}getSceneTransform(t,n){const i=this.getScene(t);i.updateTransform(this.dynamicMode),n.copy(i.transform)}getScene(t){if(t<0||t>=this.scenes.length)throw new Error("SplatMesh::getScene() -> Invalid scene index.");return this.scenes[t]}getSceneCount(){return this.scenes.length}getSplatBufferForSplat(t){return this.getScene(this.globalSplatIndexToSceneIndexMap[t]).splatBuffer}getSceneIndexForSplat(t){return this.globalSplatIndexToSceneIndexMap[t]}getSceneTransformForSplat(t){return this.getScene(this.globalSplatIndexToSceneIndexMap[t]).transform}getSplatLocalIndex(t){return this.globalSplatIndexToLocalSplatIndexMap[t]}static getIntegerMatrixArray(t){const n=t.elements,i=[];for(let s=0;s<16;s++)i[s]=Math.round(n[s]*1e3);return i}computeBoundingBox(t=!1,n){let i=this.getSplatCount();if(n!=null){if(n<0||n>=this.scenes.length)throw new Error("SplatMesh::computeBoundingBox() -> Invalid scene index.");i=this.scenes[n].splatBuffer.getSplatCount()}const s=new Float32Array(i*3);this.fillSplatDataArrays(null,null,null,s,null,null,t,void 0,void 0,void 0,void 0,n);const o=new b,a=new b;for(let l=0;l<i;l++){const c=l*3,d=s[c],u=s[c+1],f=s[c+2];(l===0||d<o.x)&&(o.x=d),(l===0||u<o.y)&&(o.y=u),(l===0||f<o.z)&&(o.z=f),(l===0||d>a.x)&&(a.x=d),(l===0||u>a.y)&&(a.y=u),(l===0||f>a.z)&&(a.z=f)}return new hn(o,a)}}var $A="AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAEbA2AAAGAQf39/f39/f39/f39/f39/fwBgAAF/AhIBA2VudgZtZW1vcnkCAwCAgAQDBAMAAQIHVAQRX193YXNtX2NhbGxfY3RvcnMAABhfX3dhc21fYXBwbHlfZGF0YV9yZWxvY3MAAAtzb3J0SW5kZXhlcwABE2Vtc2NyaXB0ZW5fdGxzX2luaXQAAgqWEAMDAAELihAEAXwDewN/A30gCyAKayEMAkACQCAOBEAgDQRAQfj///8HIQpBiICAgHghDSALIAxNDQMgDCEBA0AgAyABQQJ0IgVqIAIgACAFaigCAEECdGooAgAiBTYCACAFIAogBSAKSBshCiAFIA0gBSANShshDSABQQFqIgEgC0cNAAsMAwsgDwRAIAsgDE0NAkF/IQ9B+P///wchCkGIgICAeCENIAwhAgNAIA8gByAAIAJBAnQiFWooAgAiFkECdGooAgAiFEcEQAJ/IAX9CQI4IAggFEEGdGoiDv0JAgwgDioCHP0gASAOKgIs/SACIA4qAjz9IAP95gEgBf0JAiggDv0JAgggDioCGP0gASAOKgIo/SACIA4qAjj9IAP95gEgBf0JAgggDv0JAgAgDioCEP0gASAOKgIg/SACIA4qAjD9IAP95gEgBf0JAhggDv0JAgQgDioCFP0gASAOKgIk/SACIA4qAjT9IAP95gH95AH95AH95AEiEf1f/QwAAAAAAECPQAAAAAAAQI9AIhL98gEiE/0hASIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshDgJ/IBP9IQAiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgL/REgDv0cAQJ/IBEgEf0NCAkKCwwNDg8AAAAAAAAAAP1fIBL98gEiEf0hACIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAv9HAICfyAR/SEBIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4C/0cAyESIBQhDwsgAyAVaiABIBZBBHRq/QAAACAS/bUBIhH9GwAgEf0bAWogEf0bAmogEf0bA2oiDjYCACAOIAogCiAOShshCiAOIA0gDSAOSBshDSACQQFqIgIgC0cNAAsMAwsCfyAFKgIIu/0UIAUqAhi7/SIB/QwAAAAAAECPQAAAAAAAQI9A/fIBIhH9IQEiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIQ4CfyAR/SEAIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyECAn8gBSoCKLtEAAAAAABAj0CiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEFQfj///8HIQpBiICAgHghDSALIAxNDQIgAv0RIA79HAEgBf0cAiESIAwhBQNAIAMgBUECdCICaiABIAAgAmooAgBBBHRq/QAAACAS/bUBIhH9GwAgEf0bAWogEf0bAmoiAjYCACACIAogAiAKSBshCiACIA0gAiANShshDSAFQQFqIgUgC0cNAAsMAgsgDQRAQfj///8HIQpBiICAgHghDSALIAxNDQIgDCEBA0AgAyABQQJ0IgVqAn8gAiAAIAVqKAIAQQJ0aioCALtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyIONgIAIAogDiAKIA5IGyEKIA0gDiANIA5KGyENIAFBAWoiASALRw0ACwwCCyAPRQRAIAsgDE0NASAFKgIoIRcgBSoCGCEYIAUqAgghGUH4////ByEKQYiAgIB4IQ0gDCEFA0ACfyAXIAEgACAFQQJ0IgdqKAIAQQR0aiICKgIIlCAZIAIqAgCUIBggAioCBJSSkrtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEOIAMgB2ogDjYCACAKIA4gCiAOSBshCiANIA4gDSAOShshDSAFQQFqIgUgC0cNAAsMAgsgCyAMTQ0AQX8hD0H4////ByEKQYiAgIB4IQ0gDCECA0AgDyAHIAAgAkECdCIUaigCAEECdCIVaigCACIORwRAIAX9CQI4IAggDkEGdGoiD/0JAgwgDyoCHP0gASAPKgIs/SACIA8qAjz9IAP95gEgBf0JAiggD/0JAgggDyoCGP0gASAPKgIo/SACIA8qAjj9IAP95gEgBf0JAgggD/0JAgAgDyoCEP0gASAPKgIg/SACIA8qAjD9IAP95gEgBf0JAhggD/0JAgQgDyoCFP0gASAPKgIk/SACIA8qAjT9IAP95gH95AH95AH95AEhESAOIQ8LIAMgFGoCfyAR/R8DIAEgFUECdCIOQQxyaioCAJQgEf0fAiABIA5BCHJqKgIAlCAR/R8AIAEgDmoqAgCUIBH9HwEgASAOQQRyaioCAJSSkpK7RAAAAAAAALBAoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAsiDjYCACAKIA4gCiAOSBshCiANIA4gDSAOShshDSACQQFqIgIgC0cNAAsMAQtBiICAgHghDUH4////ByEKCyALIAxLBEAgCUEBa7MgDbIgCrKTlSEXIAwhDQNAAn8gFyADIA1BAnRqIgEoAgAgCmuylCIYi0MAAABPXQRAIBioDAELQYCAgIB4CyEOIAEgDjYCACAEIA5BAnRqIgEgASgCAEEBajYCACANQQFqIg0gC0cNAAsLIAlBAk8EQCAEKAIAIQ1BASEKA0AgBCAKQQJ0aiIBIAEoAgAgDWoiDTYCACAKQQFqIgogCUcNAAsLIAxBAEoEQCAMIQoDQCAGIApBAWsiAUECdCICaiAAIAJqKAIANgIAIApBAUshAiABIQogAg0ACwsgCyAMSgRAIAshCgNAIAYgCyAEIAMgCkEBayIKQQJ0IgFqKAIAQQJ0aiICKAIAIgVrQQJ0aiAAIAFqKAIANgIAIAIgBUEBazYCACAKIAxKDQALCwsEAEEACw==",Lc="AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAEXAmAAAGAQf39/f39/f39/f39/f39/fwACEgEDZW52Bm1lbW9yeQIDAICABAMDAgABBz4DEV9fd2FzbV9jYWxsX2N0b3JzAAAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAALc29ydEluZGV4ZXMAAQqiDwICAAucDwMBfAd9Bn8gCyAKayEMAkACQCAOBEAgDQRAQfj///8HIQpBiICAgHghDSALIAxNDQMgDCEFA0AgAyAFQQJ0IgFqIAIgACABaigCAEECdGooAgAiATYCACABIAogASAKSBshCiABIA0gASANShshDSAFQQFqIgUgC0cNAAsMAwsgDwRAIAsgDE0NAkF/IQ9B+P///wchCkGIgICAeCENIAwhAgNAIA8gByAAIAJBAnQiGmooAgBBAnQiG2ooAgAiDkcEQAJ/IAUqAjgiESAIIA5BBnRqIg8qAjyUIAUqAigiEiAPKgI4lCAFKgIIIhMgDyoCMJQgBSoCGCIUIA8qAjSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIRgCfyARIA8qAiyUIBIgDyoCKJQgEyAPKgIglCAUIA8qAiSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIRkCfyARIA8qAhyUIBIgDyoCGJQgEyAPKgIQlCAUIA8qAhSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIRwCfyARIA8qAgyUIBIgDyoCCJQgEyAPKgIAlCAUIA8qAgSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIR0gDiEPCyADIBpqIAEgG0ECdGoiDigCBCAcbCAOKAIAIB1saiAOKAIIIBlsaiAOKAIMIBhsaiIONgIAIA4gCiAKIA5KGyEKIA4gDSANIA5IGyENIAJBAWoiAiALRw0ACwwDCwJ/IAUqAii7RAAAAAAAQI9AoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshAgJ/IAUqAhi7RAAAAAAAQI9AoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshByALIAxNAn8gBSoCCLtEAAAAAABAj0CiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEPQfj///8HIQpBiICAgHghDQ0CIAwhBQNAIAMgBUECdCIIaiABIAAgCGooAgBBBHRqIggoAgQgB2wgCCgCACAPbGogCCgCCCACbGoiCDYCACAIIAogCCAKSBshCiAIIA0gCCANShshDSAFQQFqIgUgC0cNAAsMAgsgDQRAQfj///8HIQpBiICAgHghDSALIAxNDQIgDCEFA0AgAyAFQQJ0IgFqAn8gAiAAIAFqKAIAQQJ0aioCALtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyIONgIAIAogDiAKIA5IGyEKIA0gDiANIA5KGyENIAVBAWoiBSALRw0ACwwCCyAPRQRAIAsgDE0NASAFKgIoIREgBSoCGCESIAUqAgghE0H4////ByEKQYiAgIB4IQ0gDCEFA0ACfyARIAEgACAFQQJ0IgdqKAIAQQR0aiICKgIIlCATIAIqAgCUIBIgAioCBJSSkrtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEOIAMgB2ogDjYCACAKIA4gCiAOSBshCiANIA4gDSAOShshDSAFQQFqIgUgC0cNAAsMAgsgCyAMTQ0AQX8hD0H4////ByEKQYiAgIB4IQ0gDCECA0AgDyAHIAAgAkECdCIYaigCAEECdCIZaigCACIORwRAIAUqAjgiESAIIA5BBnRqIg8qAjyUIAUqAigiEiAPKgI4lCAFKgIIIhMgDyoCMJQgBSoCGCIUIA8qAjSUkpKSIRUgESAPKgIslCASIA8qAiiUIBMgDyoCIJQgFCAPKgIklJKSkiEWIBEgDyoCHJQgEiAPKgIYlCATIA8qAhCUIBQgDyoCFJSSkpIhFyARIA8qAgyUIBIgDyoCCJQgEyAPKgIAlCAUIA8qAgSUkpKSIREgDiEPCyADIBhqAn8gFSABIBlBAnRqIg4qAgyUIBYgDioCCJQgESAOKgIAlCAXIA4qAgSUkpKSu0QAAAAAAACwQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIg42AgAgCiAOIAogDkgbIQogDSAOIA0gDkobIQ0gAkEBaiICIAtHDQALDAELQYiAgIB4IQ1B+P///wchCgsgCyAMSwRAIAlBAWuzIA2yIAqyk5UhESAMIQ0DQAJ/IBEgAyANQQJ0aiIBKAIAIAprspQiEotDAAAAT10EQCASqAwBC0GAgICAeAshDiABIA42AgAgBCAOQQJ0aiIBIAEoAgBBAWo2AgAgDUEBaiINIAtHDQALCyAJQQJPBEAgBCgCACENQQEhCgNAIAQgCkECdGoiASABKAIAIA1qIg02AgAgCkEBaiIKIAlHDQALCyAMQQBKBEAgDCEKA0AgBiAKQQFrIgFBAnQiAmogACACaigCADYCACAKQQFLIAEhCg0ACwsgCyAMSgRAIAshCgNAIAYgCyAEIAMgCkEBayIKQQJ0IgFqKAIAQQJ0aiICKAIAIgVrQQJ0aiAAIAFqKAIANgIAIAIgBUEBazYCACAKIAxKDQALCws=",JA="AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAEXAmAAAGAQf39/f39/f39/f39/f39/fwACDwEDZW52Bm1lbW9yeQIAAAMDAgABBz4DEV9fd2FzbV9jYWxsX2N0b3JzAAAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAALc29ydEluZGV4ZXMAAQrrDwICAAvlDwQBfAN7B30DfyALIAprIQwCQAJAIA4EQCANBEBB+P///wchCkGIgICAeCENIAsgDE0NAyAMIQUDQCADIAVBAnQiAWogAiAAIAFqKAIAQQJ0aigCACIBNgIAIAEgCiABIApIGyEKIAEgDSABIA1KGyENIAVBAWoiBSALRw0ACwwDCyAPBEAgCyAMTQ0CQX8hD0H4////ByEKQYiAgIB4IQ0gDCECA0AgDyAHIAAgAkECdCIcaigCACIdQQJ0aigCACIbRwRAAn8gBf0JAjggCCAbQQZ0aiIO/QkCDCAOKgIc/SABIA4qAiz9IAIgDioCPP0gA/3mASAF/QkCKCAO/QkCCCAOKgIY/SABIA4qAij9IAIgDioCOP0gA/3mASAF/QkCCCAO/QkCACAOKgIQ/SABIA4qAiD9IAIgDioCMP0gA/3mASAF/QkCGCAO/QkCBCAOKgIU/SABIA4qAiT9IAIgDioCNP0gA/3mAf3kAf3kAf3kASIR/V/9DAAAAAAAQI9AAAAAAABAj0AiEv3yASIT/SEBIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEOAn8gE/0hACIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAv9ESAO/RwBAn8gESAR/Q0ICQoLDA0ODwABAgMAAQID/V8gEv3yASIR/SEAIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4C/0cAgJ/IBH9IQEiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgL/RwDIRIgGyEPCyADIBxqIAEgHUEEdGr9AAAAIBL9tQEiEf0bACAR/RsBaiAR/RsCaiAR/RsDaiIONgIAIA4gCiAKIA5KGyEKIA4gDSANIA5IGyENIAJBAWoiAiALRw0ACwwDCwJ/IAUqAgi7/RQgBSoCGLv9IgH9DAAAAAAAQI9AAAAAAABAj0D98gEiEf0hASIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshDgJ/IBH9IQAiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLAn8gBSoCKLtEAAAAAABAj0CiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEFQfj///8HIQpBiICAgHghDSALIAxNDQL9ESAO/RwBIAX9HAIhEiAMIQUDQCADIAVBAnQiAmogASAAIAJqKAIAQQR0av0AAAAgEv21ASIR/RsAIBH9GwFqIBH9GwJqIgI2AgAgAiAKIAIgCkgbIQogAiANIAIgDUobIQ0gBUEBaiIFIAtHDQALDAILIA0EQEH4////ByEKQYiAgIB4IQ0gCyAMTQ0CIAwhBQNAIAMgBUECdCIBagJ/IAIgACABaigCAEECdGoqAgC7RAAAAAAAALBAoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAsiDjYCACAKIA4gCiAOSBshCiANIA4gDSAOShshDSAFQQFqIgUgC0cNAAsMAgsgD0UEQCALIAxNDQEgBSoCKCEUIAUqAhghFSAFKgIIIRZB+P///wchCkGIgICAeCENIAwhBQNAAn8gFCABIAAgBUECdCIHaigCAEEEdGoiAioCCJQgFiACKgIAlCAVIAIqAgSUkpK7RAAAAAAAALBAoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshDiADIAdqIA42AgAgCiAOIAogDkgbIQogDSAOIA0gDkobIQ0gBUEBaiIFIAtHDQALDAILIAsgDE0NAEF/IQ9B+P///wchCkGIgICAeCENIAwhAgNAIA8gByAAIAJBAnQiG2ooAgBBAnQiHGooAgAiDkcEQCAFKgI4IhQgCCAOQQZ0aiIPKgI8lCAFKgIoIhUgDyoCOJQgBSoCCCIWIA8qAjCUIAUqAhgiFyAPKgI0lJKSkiEYIBQgDyoCLJQgFSAPKgIolCAWIA8qAiCUIBcgDyoCJJSSkpIhGSAUIA8qAhyUIBUgDyoCGJQgFiAPKgIQlCAXIA8qAhSUkpKSIRogFCAPKgIMlCAVIA8qAgiUIBYgDyoCAJQgFyAPKgIElJKSkiEUIA4hDwsgAyAbagJ/IBggASAcQQJ0aiIOKgIMlCAZIA4qAgiUIBQgDioCAJQgGiAOKgIElJKSkrtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyIONgIAIAogDiAKIA5IGyEKIA0gDiANIA5KGyENIAJBAWoiAiALRw0ACwwBC0GIgICAeCENQfj///8HIQoLIAsgDEsEQCAJQQFrsyANsiAKspOVIRQgDCENA0ACfyAUIAMgDUECdGoiASgCACAKa7KUIhWLQwAAAE9dBEAgFagMAQtBgICAgHgLIQ4gASAONgIAIAQgDkECdGoiASABKAIAQQFqNgIAIA1BAWoiDSALRw0ACwsgCUECTwRAIAQoAgAhDUEBIQoDQCAEIApBAnRqIgEgASgCACANaiINNgIAIApBAWoiCiAJRw0ACwsgDEEASgRAIAwhCgNAIAYgCkEBayIBQQJ0IgJqIAAgAmooAgA2AgAgCkEBSyABIQoNAAsLIAsgDEoEQCALIQoDQCAGIAsgBCADIApBAWsiCkECdCIBaigCAEECdGoiAigCACIFa0ECdGogACABaigCADYCACACIAVBAWs2AgAgCiAMSg0ACwsL",eS="AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAEXAmAAAGAQf39/f39/f39/f39/f39/fwACDwEDZW52Bm1lbW9yeQIAAAMDAgABBz4DEV9fd2FzbV9jYWxsX2N0b3JzAAAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAALc29ydEluZGV4ZXMAAQqiDwICAAucDwMBfAd9Bn8gCyAKayEMAkACQCAOBEAgDQRAQfj///8HIQpBiICAgHghDSALIAxNDQMgDCEFA0AgAyAFQQJ0IgFqIAIgACABaigCAEECdGooAgAiATYCACABIAogASAKSBshCiABIA0gASANShshDSAFQQFqIgUgC0cNAAsMAwsgDwRAIAsgDE0NAkF/IQ9B+P///wchCkGIgICAeCENIAwhAgNAIA8gByAAIAJBAnQiGmooAgBBAnQiG2ooAgAiDkcEQAJ/IAUqAjgiESAIIA5BBnRqIg8qAjyUIAUqAigiEiAPKgI4lCAFKgIIIhMgDyoCMJQgBSoCGCIUIA8qAjSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIRgCfyARIA8qAiyUIBIgDyoCKJQgEyAPKgIglCAUIA8qAiSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIRkCfyARIA8qAhyUIBIgDyoCGJQgEyAPKgIQlCAUIA8qAhSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIRwCfyARIA8qAgyUIBIgDyoCCJQgEyAPKgIAlCAUIA8qAgSUkpKSu0QAAAAAAECPQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIR0gDiEPCyADIBpqIAEgG0ECdGoiDigCBCAcbCAOKAIAIB1saiAOKAIIIBlsaiAOKAIMIBhsaiIONgIAIA4gCiAKIA5KGyEKIA4gDSANIA5IGyENIAJBAWoiAiALRw0ACwwDCwJ/IAUqAii7RAAAAAAAQI9AoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshAgJ/IAUqAhi7RAAAAAAAQI9AoiIQmUQAAAAAAADgQWMEQCAQqgwBC0GAgICAeAshByALIAxNAn8gBSoCCLtEAAAAAABAj0CiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEPQfj///8HIQpBiICAgHghDQ0CIAwhBQNAIAMgBUECdCIIaiABIAAgCGooAgBBBHRqIggoAgQgB2wgCCgCACAPbGogCCgCCCACbGoiCDYCACAIIAogCCAKSBshCiAIIA0gCCANShshDSAFQQFqIgUgC0cNAAsMAgsgDQRAQfj///8HIQpBiICAgHghDSALIAxNDQIgDCEFA0AgAyAFQQJ0IgFqAn8gAiAAIAFqKAIAQQJ0aioCALtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyIONgIAIAogDiAKIA5IGyEKIA0gDiANIA5KGyENIAVBAWoiBSALRw0ACwwCCyAPRQRAIAsgDE0NASAFKgIoIREgBSoCGCESIAUqAgghE0H4////ByEKQYiAgIB4IQ0gDCEFA0ACfyARIAEgACAFQQJ0IgdqKAIAQQR0aiICKgIIlCATIAIqAgCUIBIgAioCBJSSkrtEAAAAAAAAsECiIhCZRAAAAAAAAOBBYwRAIBCqDAELQYCAgIB4CyEOIAMgB2ogDjYCACAKIA4gCiAOSBshCiANIA4gDSAOShshDSAFQQFqIgUgC0cNAAsMAgsgCyAMTQ0AQX8hD0H4////ByEKQYiAgIB4IQ0gDCECA0AgDyAHIAAgAkECdCIYaigCAEECdCIZaigCACIORwRAIAUqAjgiESAIIA5BBnRqIg8qAjyUIAUqAigiEiAPKgI4lCAFKgIIIhMgDyoCMJQgBSoCGCIUIA8qAjSUkpKSIRUgESAPKgIslCASIA8qAiiUIBMgDyoCIJQgFCAPKgIklJKSkiEWIBEgDyoCHJQgEiAPKgIYlCATIA8qAhCUIBQgDyoCFJSSkpIhFyARIA8qAgyUIBIgDyoCCJQgEyAPKgIAlCAUIA8qAgSUkpKSIREgDiEPCyADIBhqAn8gFSABIBlBAnRqIg4qAgyUIBYgDioCCJQgESAOKgIAlCAXIA4qAgSUkpKSu0QAAAAAAACwQKIiEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLIg42AgAgCiAOIAogDkgbIQogDSAOIA0gDkobIQ0gAkEBaiICIAtHDQALDAELQYiAgIB4IQ1B+P///wchCgsgCyAMSwRAIAlBAWuzIA2yIAqyk5UhESAMIQ0DQAJ/IBEgAyANQQJ0aiIBKAIAIAprspQiEotDAAAAT10EQCASqAwBC0GAgICAeAshDiABIA42AgAgBCAOQQJ0aiIBIAEoAgBBAWo2AgAgDUEBaiINIAtHDQALCyAJQQJPBEAgBCgCACENQQEhCgNAIAQgCkECdGoiASABKAIAIA1qIg02AgAgCkEBaiIKIAlHDQALCyAMQQBKBEAgDCEKA0AgBiAKQQFrIgFBAnQiAmogACACaigCADYCACAKQQFLIAEhCg0ACwsgCyAMSgRAIAshCgNAIAYgCyAEIAMgCkEBayIKQQJ0IgFqKAIAQQJ0aiICKAIAIgVrQQJ0aiAAIAFqKAIANgIAIAIgBUEBazYCACAKIAxKDQALCws=";function tS(r){let e,t,n,i,s,o,a,l,c,d,u,f,h,g,A,p,m,S,x,v;function E(C,y,R,M,_,I,L){const D=performance.now();if(!n&&(new Uint32Array(t,a,_.byteLength/v.BytesPerInt).set(_),new Float32Array(t,d,L.byteLength/v.BytesPerFloat).set(L),M)){let k;i?k=new Int32Array(t,u,I.byteLength/v.BytesPerInt):k=new Float32Array(t,u,I.byteLength/v.BytesPerFloat),k.set(I)}p||(p=new Uint32Array(S)),new Float32Array(t,A,16).set(R),new Uint32Array(t,h,S).set(p),e.exports.sortIndexes(a,g,u,f,h,A,l,c,d,S,C,y,o,M,i,s);const F={sortDone:!0,splatSortCount:C,splatRenderCount:y,sortTime:0};if(!n){const N=new Uint32Array(t,l,y);(!m||m.length<y)&&(m=new Uint32Array(y)),m.set(N),F.sortedIndexes=m}const z=performance.now();F.sortTime=z-D,r.postMessage(F)}r.onmessage=C=>{if(C.data.centers)centers=C.data.centers,sceneIndexes=C.data.sceneIndexes,i?new Int32Array(t,g+C.data.range.from*v.BytesPerInt*4,C.data.range.count*4).set(new Int32Array(centers)):new Float32Array(t,g+C.data.range.from*v.BytesPerFloat*4,C.data.range.count*4).set(new Float32Array(centers)),s&&new Uint32Array(t,c+C.data.range.from*4,C.data.range.count).set(new Uint32Array(sceneIndexes)),x=C.data.range.from+C.data.range.count;else if(C.data.sort){const y=Math.min(C.data.sort.splatRenderCount||0,x),R=Math.min(C.data.sort.splatSortCount||0,x),M=C.data.sort.usePrecomputedDistances;let _,I,L;n||(_=C.data.sort.indexesToSort,L=C.data.sort.transforms,M&&(I=C.data.sort.precomputedDistances)),E(R,y,C.data.sort.modelViewProj,M,_,I,L)}else if(C.data.init){v=C.data.init.Constants,o=C.data.init.splatCount,n=C.data.init.useSharedMemory,i=C.data.init.integerBasedSort,s=C.data.init.dynamicMode,S=C.data.init.distanceMapRange,x=0;const y=i?v.BytesPerInt*4:v.BytesPerFloat*4,R=new Uint8Array(C.data.init.sorterWasmBytes),M=16*v.BytesPerFloat,_=o*v.BytesPerInt,I=o*y,L=M,D=i?o*v.BytesPerInt:o*v.BytesPerFloat,F=o*v.BytesPerInt,z=o*v.BytesPerInt,N=i?S*v.BytesPerInt*2:S*v.BytesPerFloat*2,G=s?o*v.BytesPerInt:0,k=s?v.MaxScenes*M:0,Y=v.MemoryPageSize*32,J=_+I+L+D+F+N+z+G+k+Y,de=Math.floor(J/v.MemoryPageSize)+1,Re={module:{},env:{memory:new WebAssembly.Memory({initial:de,maximum:de,shared:!0})}};WebAssembly.compile(R).then(Pe=>WebAssembly.instantiate(Pe,Re)).then(Pe=>{e=Pe,a=0,g=a+_,A=g+I,u=A+L,f=u+D,h=f+F,l=h+N,c=l+z,d=c+G,t=Re.env.memory.buffer,n?r.postMessage({sortSetupPhase1Complete:!0,indexesToSortBuffer:t,indexesToSortOffset:a,sortedIndexesBuffer:t,sortedIndexesOffset:l,precomputedDistancesBuffer:t,precomputedDistancesOffset:u,transformsBuffer:t,transformsOffset:d}):r.postMessage({sortSetupPhase1Complete:!0})})}}}function nS(r,e,t,n,i,s=Ye.DefaultSplatSortDistanceMapPrecision){const o=new Worker(URL.createObjectURL(new Blob(["(",tS.toString(),")(self)"],{type:"application/javascript"})));let a=$A;const l=ma()?Cd():null;!t&&!e?(a=Lc,l&&l.major<=16&&l.minor<4&&(a=eS)):t?e||l&&l.major<=16&&l.minor<4&&(a=JA):a=Lc;const c=atob(a),d=new Uint8Array(c.length);for(let u=0;u<c.length;u++)d[u]=c.charCodeAt(u);return o.postMessage({init:{sorterWasmBytes:d.buffer,splatCount:r,useSharedMemory:e,integerBasedSort:n,dynamicMode:i,distanceMapRange:1<<s,Constants:{BytesPerFloat:Ye.BytesPerFloat,BytesPerInt:Ye.BytesPerInt,MemoryPageSize:Ye.MemoryPageSize,MaxScenes:Ye.MaxScenes}}}),o}const qi={None:0,VR:1,AR:2};class hs{static createButton(e,t={}){const n=document.createElement("button");function i(){let c=null;async function d(h){h.addEventListener("end",u),await e.xr.setSession(h),n.textContent="EXIT VR",c=h}function u(){c.removeEventListener("end",u),n.textContent="ENTER VR",c=null}n.style.display="",n.style.cursor="pointer",n.style.left="calc(50% - 50px)",n.style.width="100px",n.textContent="ENTER VR";const f={...t,optionalFeatures:["local-floor","bounded-floor","layers",...t.optionalFeatures||[]]};n.onmouseenter=function(){n.style.opacity="1.0"},n.onmouseleave=function(){n.style.opacity="0.5"},n.onclick=function(){c===null?navigator.xr.requestSession("immersive-vr",f).then(d):(c.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",f).then(d).catch(h=>{console.warn(h)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",f).then(d).catch(h=>{console.warn(h)})}function s(){n.style.display="",n.style.cursor="auto",n.style.left="calc(50% - 75px)",n.style.width="150px",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null}function o(){s(),n.textContent="VR NOT SUPPORTED"}function a(c){s(),console.warn("Exception when trying to call xr.isSessionSupported",c),n.textContent="VR NOT ALLOWED"}function l(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}if("xr"in navigator)return n.id="VRButton",n.style.display="none",l(n),navigator.xr.isSessionSupported("immersive-vr").then(function(c){c?i():o(),c&&hs.xrSessionIsGranted&&n.click()}).catch(a),n;{const c=document.createElement("a");return window.isSecureContext===!1?(c.href=document.location.href.replace(/^http:/,"https:"),c.innerHTML="WEBXR NEEDS HTTPS"):(c.href="https://immersiveweb.dev/",c.innerHTML="WEBXR NOT AVAILABLE"),c.style.left="calc(50% - 90px)",c.style.width="180px",c.style.textDecoration="none",l(c),c}}static registerSessionGrantedListener(){if(typeof navigator<"u"&&"xr"in navigator){if(/WebXRViewer\//i.test(navigator.userAgent))return;navigator.xr.addEventListener("sessiongranted",()=>{hs.xrSessionIsGranted=!0})}}}hs.xrSessionIsGranted=!1;hs.registerSessionGrantedListener();class iS{static createButton(e,t={}){const n=document.createElement("button");function i(){if(t.domOverlay===void 0){const f=document.createElement("div");f.style.display="none",document.body.appendChild(f);const h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("width",38),h.setAttribute("height",38),h.style.position="absolute",h.style.right="20px",h.style.top="20px",h.addEventListener("click",function(){c.end()}),f.appendChild(h);const g=document.createElementNS("http://www.w3.org/2000/svg","path");g.setAttribute("d","M 12,12 L 28,28 M 28,12 12,28"),g.setAttribute("stroke","#fff"),g.setAttribute("stroke-width",2),h.appendChild(g),t.optionalFeatures===void 0&&(t.optionalFeatures=[]),t.optionalFeatures.push("dom-overlay"),t.domOverlay={root:f}}let c=null;async function d(f){f.addEventListener("end",u),e.xr.setReferenceSpaceType("local"),await e.xr.setSession(f),n.textContent="STOP AR",t.domOverlay.root.style.display="",c=f}function u(){c.removeEventListener("end",u),n.textContent="START AR",t.domOverlay.root.style.display="none",c=null}n.style.display="",n.style.cursor="pointer",n.style.left="calc(50% - 50px)",n.style.width="100px",n.textContent="START AR",n.onmouseenter=function(){n.style.opacity="1.0"},n.onmouseleave=function(){n.style.opacity="0.5"},n.onclick=function(){c===null?navigator.xr.requestSession("immersive-ar",t).then(d):(c.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-ar",t).then(d).catch(f=>{console.warn(f)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-ar",t).then(d).catch(f=>{console.warn(f)})}function s(){n.style.display="",n.style.cursor="auto",n.style.left="calc(50% - 75px)",n.style.width="150px",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null}function o(){s(),n.textContent="AR NOT SUPPORTED"}function a(c){s(),console.warn("Exception when trying to call xr.isSessionSupported",c),n.textContent="AR NOT ALLOWED"}function l(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}if("xr"in navigator)return n.id="ARButton",n.style.display="none",l(n),navigator.xr.isSessionSupported("immersive-ar").then(function(c){c?i():o()}).catch(a),n;{const c=document.createElement("a");return window.isSecureContext===!1?(c.href=document.location.href.replace(/^http:/,"https:"),c.innerHTML="WEBXR NEEDS HTTPS"):(c.href="https://immersiveweb.dev/",c.innerHTML="WEBXR NOT AVAILABLE"),c.style.left="calc(50% - 90px)",c.style.width="180px",c.style.textDecoration="none",l(c),c}}}const Oo={Always:0,Never:2},sS=50,rS=.75,oS=15e5,aS=10,lS=2.5,cS=60,jn=class jn{constructor(e={}){ce(this,"onKeyDown",function(){const e=new b,t=new ze,n=new ze;return function(i){switch(e.set(0,0,-1),e.transformDirection(this.camera.matrixWorld),t.makeRotationAxis(e,Math.PI/128),n.makeRotationAxis(e,-Math.PI/128),i.code){case"KeyG":this.focalAdjustment+=.02,this.forceRenderNextFrame();break;case"KeyF":this.focalAdjustment-=.02,this.forceRenderNextFrame();break;case"ArrowLeft":this.camera.up.transformDirection(t);break;case"ArrowRight":this.camera.up.transformDirection(n);break;case"KeyC":this.showMeshCursor=!this.showMeshCursor;break;case"KeyU":this.showControlPlane=!this.showControlPlane;break;case"KeyI":this.showInfo=!this.showInfo,this.showInfo?this.infoPanel.show():this.infoPanel.hide();break;case"KeyO":this.usingExternalCamera||this.setOrthographicMode(!this.camera.isOrthographicCamera);break;case"KeyP":this.usingExternalCamera||this.splatMesh.setPointCloudModeEnabled(!this.splatMesh.getPointCloudModeEnabled());break;case"Equal":this.usingExternalCamera||this.splatMesh.setSplatScale(this.splatMesh.getSplatScale()+.05);break;case"Minus":this.usingExternalCamera||this.splatMesh.setSplatScale(Math.max(this.splatMesh.getSplatScale()-.05,0));break}}}());ce(this,"onMouseUp",function(){const e=new xe;return function(t){e.copy(this.mousePosition).sub(this.mouseDownPosition),Wi()-this.mouseDownTime<.5&&e.length()<2&&this.onMouseClick(t)}}());ce(this,"checkForFocalPointChange",function(){const e=new xe,t=new b,n=[];return function(){if(!this.transitioningCameraTarget&&(this.getRenderDimensions(e),n.length=0,this.raycaster.setFromCameraAndScreenPosition(this.camera,this.mousePosition,e),this.raycaster.intersectSplatMesh(this.splatMesh,n),n.length>0)){const s=n[0].origin;t.copy(s).sub(this.camera.position),t.length()>rS&&(this.previousCameraTarget.copy(this.controls.target),this.nextCameraTarget.copy(s),this.transitioningCameraTarget=!0,this.transitioningCameraTargetStartTime=Wi())}}}());ce(this,"updateSplatMesh",function(){const e=new xe;return function(){if(!this.splatMesh)return;if(this.splatMesh.getSplatCount()>0){this.splatMesh.updateVisibleRegionFadeDistance(this.sceneRevealMode),this.splatMesh.updateTransforms(),this.getRenderDimensions(e);const n=this.camera.projectionMatrix.elements[0]*.5*this.devicePixelRatio*e.x,i=this.camera.projectionMatrix.elements[5]*.5*this.devicePixelRatio*e.y,s=this.camera.isOrthographicCamera?1/this.devicePixelRatio:1,o=this.focalAdjustment*s,a=1/o;this.adjustForWebXRStereo(e),this.splatMesh.updateUniforms(e,n*o,i*o,this.camera.isOrthographicCamera,this.camera.zoom||1,a)}}}());ce(this,"addSplatBuffers",function(){return function(e,t=[],n=!0,i=!0,s=!0,o=!1,a=!1,l=!0){if(this.isDisposingOrDisposed())return Promise.resolve();let c=null;const d=()=>{c!==null&&(this.loadingSpinner.removeTask(c),c=null)};return this.splatRenderReady=!1,new Promise(u=>{i&&(c=this.loadingSpinner.addTask("Processing splats...")),jt(()=>{if(this.isDisposingOrDisposed())u();else{const f=this.addSplatBuffersToMesh(e,t,n,s,o,l),h=this.splatMesh.getMaxSplatCount();this.sortWorker&&this.sortWorker.maxSplatCount!==h&&this.disposeSortWorker(),this.gpuAcceleratedSort||this.preSortMessages.push({centers:f.centers.buffer,sceneIndexes:f.sceneIndexes.buffer,range:{from:f.from,to:f.to,count:f.count}}),(!this.sortWorker&&h>0?this.setupSortWorker(this.splatMesh):Promise.resolve()).then(()=>{this.isDisposingOrDisposed()||this.runSplatSort(!0,!0).then(A=>{!this.sortWorker||!A?(this.splatRenderReady=!0,d(),u()):(a?this.splatRenderReady=!0:this.runAfterNextSort.push(()=>{this.splatRenderReady=!0}),this.runAfterNextSort.push(()=>{d(),u()}))})})}},!0)})}}());ce(this,"addSplatBuffersToMesh",function(){let e;return function(t,n,i=!0,s=!1,o=!1,a=!0){if(this.isDisposingOrDisposed())return;let l=[],c=[];o||(l=this.splatMesh.scenes.map(h=>h.splatBuffer)||[],c=this.splatMesh.sceneOptions?this.splatMesh.sceneOptions.map(h=>h):[]),l.push(...t),c.push(...n),this.renderer&&this.splatMesh.setRenderer(this.renderer);const d=h=>{if(this.isDisposingOrDisposed())return;const g=this.splatMesh.getSplatCount();s&&g>=oS&&!h&&!e&&(this.loadingSpinner.setMinimized(!0,!0),e=this.loadingSpinner.addTask("Optimizing data structures..."))},u=h=>{this.isDisposingOrDisposed()||h&&e&&(this.loadingSpinner.removeTask(e),e=null)},f=this.splatMesh.build(l,c,!0,i,d,u,a);return i&&this.freeIntermediateSplatData&&this.splatMesh.freeIntermediateSplatData(),f}}());ce(this,"shouldRender",function(){let e=0;const t=new b,n=new nt,i=1e-4;return function(){if(!this.initialized||!this.splatRenderReady||this.isDisposingOrDisposed())return!1;let s=!1,o=!1;if(this.camera){const a=this.camera.position,l=this.camera.quaternion;o=Math.abs(a.x-t.x)>i||Math.abs(a.y-t.y)>i||Math.abs(a.z-t.z)>i||Math.abs(l.x-n.x)>i||Math.abs(l.y-n.y)>i||Math.abs(l.z-n.z)>i||Math.abs(l.w-n.w)>i}return s=this.renderMode!==Oo.Never&&(e===0||this.splatMesh.visibleRegionChanging||o||this.renderMode===Oo.Always||this.dynamicMode===!0||this.renderNextFrame),this.camera&&(t.copy(this.camera.position),n.copy(this.camera.quaternion)),e++,s}}());ce(this,"render",function(){return function(){if(!this.initialized||!this.splatRenderReady||this.isDisposingOrDisposed())return;const e=n=>{for(let i of n.children)if(i.visible)return!0;return!1},t=this.renderer.autoClear;e(this.threeScene)&&(this.renderer.render(this.threeScene,this.camera),this.renderer.autoClear=!1),this.renderer.render(this.splatMesh,this.camera),this.renderer.autoClear=!1,this.sceneHelper.getFocusMarkerOpacity()>0&&this.renderer.render(this.sceneHelper.focusMarker,this.camera),this.showControlPlane&&this.renderer.render(this.sceneHelper.controlPlane,this.camera),this.renderer.autoClear=t}}());ce(this,"updateFPS",function(){let e=Wi(),t=0;return function(){if(this.consecutiveRenderFrames>cS){const n=Wi();n-e>=1?(this.currentFPS=t,t=0,e=n):t++}else this.currentFPS=null}}());ce(this,"updateForRendererSizeChanges",function(){const e=new xe,t=new xe;let n;return function(){this.usingExternalCamera||(this.renderer.getSize(t),(n===void 0||n!==this.camera.isOrthographicCamera||t.x!==e.x||t.y!==e.y)&&(this.camera.isOrthographicCamera?(this.camera.left=-t.x/2,this.camera.right=t.x/2,this.camera.top=t.y/2,this.camera.bottom=-t.y/2):this.camera.aspect=t.x/t.y,this.camera.updateProjectionMatrix(),e.copy(t),n=this.camera.isOrthographicCamera))}}());ce(this,"timingSensitiveUpdates",function(){let e;return function(){const t=Wi();e||(e=t);const n=t-e;this.updateCameraTransition(t),this.updateFocusMarker(n),e=t}}());ce(this,"updateCameraTransition",function(){let e=new b,t=new b,n=new b;return function(i){if(this.transitioningCameraTarget){t.copy(this.previousCameraTarget).sub(this.camera.position).normalize(),n.copy(this.nextCameraTarget).sub(this.camera.position).normalize();const s=Math.acos(t.dot(n)),a=(s/(Math.PI/3)*.65+.3)/s*(i-this.transitioningCameraTargetStartTime);e.copy(this.previousCameraTarget).lerp(this.nextCameraTarget,a),this.camera.lookAt(e),this.controls.target.copy(e),a>=1&&(this.transitioningCameraTarget=!1)}}}());ce(this,"updateFocusMarker",function(){const e=new xe;let t=!1;return function(n){if(this.getRenderDimensions(e),this.transitioningCameraTarget){this.sceneHelper.setFocusMarkerVisibility(!0);const i=Math.max(this.sceneHelper.getFocusMarkerOpacity(),0);let s=Math.min(i+aS*n,1);this.sceneHelper.setFocusMarkerOpacity(s),this.sceneHelper.updateFocusMarker(this.nextCameraTarget,this.camera,e),t=!0,this.forceRenderNextFrame()}else{let i;if(t?i=1:i=Math.min(this.sceneHelper.getFocusMarkerOpacity(),1),i>0){this.sceneHelper.updateFocusMarker(this.nextCameraTarget,this.camera,e);let s=Math.max(i-lS*n,0);this.sceneHelper.setFocusMarkerOpacity(s),s===0&&this.sceneHelper.setFocusMarkerVisibility(!1)}i>0&&this.forceRenderNextFrame(),t=!1}}}());ce(this,"updateMeshCursor",function(){const e=[],t=new xe;return function(){this.showMeshCursor?(this.forceRenderNextFrame(),this.getRenderDimensions(t),e.length=0,this.raycaster.setFromCameraAndScreenPosition(this.camera,this.mousePosition,t),this.raycaster.intersectSplatMesh(this.splatMesh,e),e.length>0?(this.sceneHelper.setMeshCursorVisibility(!0),this.sceneHelper.positionAndOrientMeshCursor(e[0].origin,this.camera)):this.sceneHelper.setMeshCursorVisibility(!1)):(this.sceneHelper.getMeschCursorVisibility()&&this.forceRenderNextFrame(),this.sceneHelper.setMeshCursorVisibility(!1))}}());ce(this,"updateInfoPanel",function(){const e=new xe;return function(){if(!this.showInfo)return;const t=this.splatMesh.getSplatCount();this.getRenderDimensions(e);const n=this.controls?this.controls.target:null,i=this.showMeshCursor?this.sceneHelper.meshCursor.position:null,s=t>0?this.splatRenderCount/t*100:0;this.infoPanel.update(e,this.camera.position,n,this.camera.up,this.camera.isOrthographicCamera,i,this.currentFPS||"N/A",t,this.splatRenderCount,s,this.lastSortTime,this.focalAdjustment,this.splatMesh.getSplatScale(),this.splatMesh.getPointCloudModeEnabled())}}());ce(this,"runSplatSort",function(){const e=new ze,t=[],n=new b(0,0,-1),i=new b(0,0,-1),s=new b,o=new b,a=[],l=[{angleThreshold:.55,sortFractions:[.125,.33333,.75]},{angleThreshold:.65,sortFractions:[.33333,.66667]},{angleThreshold:.8,sortFractions:[.5]}];return function(c=!1,d=!1){if(!this.initialized)return Promise.resolve(!1);if(this.sortRunning)return Promise.resolve(!0);if(this.splatMesh.getSplatCount()<=0)return this.splatRenderCount=0,Promise.resolve(!1);let u=0,f=0,h=!1,g=!1;if(i.set(0,0,-1).applyQuaternion(this.camera.quaternion),u=i.dot(n),f=o.copy(this.camera.position).sub(s).length(),!c&&!this.splatMesh.dynamicMode&&a.length===0&&(u<=.99&&(h=!0),f>=1&&(g=!0),!h&&!g))return Promise.resolve(!1);this.sortRunning=!0;let{splatRenderCount:A,shouldSortAll:p}=this.gatherSceneNodesForSort();p=p||d,this.splatRenderCount=A,e.copy(this.camera.matrixWorld).invert();const m=this.perspectiveCamera||this.camera;e.premultiply(m.projectionMatrix),this.splatMesh.dynamicMode||e.multiply(this.splatMesh.matrixWorld);let S=Promise.resolve(!0);return this.gpuAcceleratedSort&&(a.length<=1||a.length%2===0)&&(S=this.splatMesh.computeDistancesOnGPU(e,this.sortWorkerPrecomputedDistances)),S.then(()=>{if(a.length===0)if(this.splatMesh.dynamicMode||p)a.push(this.splatRenderCount);else{for(let E of l)if(u<E.angleThreshold){for(let C of E.sortFractions)a.push(Math.floor(this.splatRenderCount*C));break}a.push(this.splatRenderCount)}let x=Math.min(a.shift(),this.splatRenderCount);this.splatSortCount=x,t[0]=this.camera.position.x,t[1]=this.camera.position.y,t[2]=this.camera.position.z;const v={modelViewProj:e.elements,cameraPosition:t,splatRenderCount:this.splatRenderCount,splatSortCount:x,usePrecomputedDistances:this.gpuAcceleratedSort};return this.splatMesh.dynamicMode&&this.splatMesh.fillTransformsArray(this.sortWorkerTransforms),this.sharedMemoryForWorkers||(v.indexesToSort=this.sortWorkerIndexesToSort,v.transforms=this.sortWorkerTransforms,this.gpuAcceleratedSort&&(v.precomputedDistances=this.sortWorkerPrecomputedDistances)),this.sortPromise=new Promise(E=>{this.sortPromiseResolver=E}),this.preSortMessages.length>0&&(this.preSortMessages.forEach(E=>{this.sortWorker.postMessage(E)}),this.preSortMessages=[]),this.sortWorker.postMessage({sort:v}),a.length===0&&(s.copy(this.camera.position),n.copy(i)),!0}),S}}());ce(this,"gatherSceneNodesForSort",function(){const e=[];let t=null;const n=new b,i=new b,s=new b,o=new ze,a=new ze,l=new ze,c=new b,d=new b(0,0,-1),u=new b,f=h=>u.copy(h.max).sub(h.min).length();return function(h=!1){this.getRenderDimensions(c);const g=c.y/2/Math.tan(this.camera.fov/2*yi.DEG2RAD),A=Math.atan(c.x/2/g),p=Math.atan(c.y/2/g),m=Math.cos(A),S=Math.cos(p),x=this.splatMesh.getSplatTree();if(x){a.copy(this.camera.matrixWorld).invert(),this.splatMesh.dynamicMode||a.multiply(this.splatMesh.matrixWorld);let v=0,E=0;for(let y=0;y<x.subTrees.length;y++){const R=x.subTrees[y];o.copy(a),this.splatMesh.dynamicMode&&(this.splatMesh.getSceneTransform(y,l),o.multiply(l));const M=R.nodesWithIndexes.length;for(let _=0;_<M;_++){const I=R.nodesWithIndexes[_];if(!I.data||!I.data.indexes||I.data.indexes.length===0)continue;s.copy(I.center).applyMatrix4(o);const L=s.length();s.normalize(),n.copy(s).setX(0).normalize(),i.copy(s).setY(0).normalize();const D=d.dot(i),F=d.dot(n),z=f(I),N=F<S-.6,G=D<m-.6;!h&&(G||N)&&L>z||(E+=I.data.indexes.length,e[v]=I,I.data.distanceToNode=L,v++)}}e.length=v,e.sort((y,R)=>y.data.distanceToNode<R.data.distanceToNode?-1:1);let C=E*Ye.BytesPerInt;for(let y=0;y<v;y++){const R=e[y],M=R.data.indexes.length,_=M*Ye.BytesPerInt;new Uint32Array(this.sortWorkerIndexesToSort.buffer,C-_,M).set(R.data.indexes),C-=_}return{splatRenderCount:E,shouldSortAll:!1}}else{const v=this.splatMesh.getSplatCount();if(!t||t.length!==v){t=new Uint32Array(v);for(let E=0;E<v;E++)t[E]=E}return this.sortWorkerIndexesToSort.set(t),{splatRenderCount:v,shouldSortAll:!0}}}}());if(e.cameraUp||(e.cameraUp=[0,1,0]),this.cameraUp=new b().fromArray(e.cameraUp),e.initialCameraPosition||(e.initialCameraPosition=[0,10,15]),this.initialCameraPosition=new b().fromArray(e.initialCameraPosition),e.initialCameraLookAt||(e.initialCameraLookAt=[0,0,0]),this.initialCameraLookAt=new b().fromArray(e.initialCameraLookAt),this.dropInMode=e.dropInMode||!1,(e.selfDrivenMode===void 0||e.selfDrivenMode===null)&&(e.selfDrivenMode=!0),this.selfDrivenMode=e.selfDrivenMode&&!this.dropInMode,this.selfDrivenUpdateFunc=this.selfDrivenUpdate.bind(this),e.useBuiltInControls===void 0&&(e.useBuiltInControls=!0),this.useBuiltInControls=e.useBuiltInControls,this.rootElement=e.rootElement,this.ignoreDevicePixelRatio=e.ignoreDevicePixelRatio||!1,this.devicePixelRatio=this.ignoreDevicePixelRatio?1:window.devicePixelRatio||1,this.halfPrecisionCovariancesOnGPU=e.halfPrecisionCovariancesOnGPU||!1,this.threeScene=e.threeScene,this.renderer=e.renderer,this.camera=e.camera,this.gpuAcceleratedSort=e.gpuAcceleratedSort||!1,(e.integerBasedSort===void 0||e.integerBasedSort===null)&&(e.integerBasedSort=!0),this.integerBasedSort=e.integerBasedSort,(e.sharedMemoryForWorkers===void 0||e.sharedMemoryForWorkers===null)&&(e.sharedMemoryForWorkers=!0),this.sharedMemoryForWorkers=e.sharedMemoryForWorkers,this.dynamicScene=!!e.dynamicScene,this.antialiased=e.antialiased||!1,this.kernel2DSize=e.kernel2DSize===void 0?.3:e.kernel2DSize,this.webXRMode=e.webXRMode||qi.None,this.webXRMode!==qi.None&&(this.gpuAcceleratedSort=!1),this.webXRActive=!1,this.webXRSessionInit=e.webXRSessionInit||{},this.renderMode=e.renderMode||Oo.Always,this.sceneRevealMode=e.sceneRevealMode||ts.Default,this.focalAdjustment=e.focalAdjustment||1,this.maxScreenSpaceSplatSize=e.maxScreenSpaceSplatSize||1024,this.logLevel=e.logLevel||ns.None,this.sphericalHarmonicsDegree=e.sphericalHarmonicsDegree||0,this.enableOptionalEffects=e.enableOptionalEffects||!1,(e.enableSIMDInSort===void 0||e.enableSIMDInSort===null)&&(e.enableSIMDInSort=!0),this.enableSIMDInSort=e.enableSIMDInSort,(e.inMemoryCompressionLevel===void 0||e.inMemoryCompressionLevel===null)&&(e.inMemoryCompressionLevel=0),this.inMemoryCompressionLevel=e.inMemoryCompressionLevel,(e.optimizeSplatData===void 0||e.optimizeSplatData===null)&&(e.optimizeSplatData=!0),this.optimizeSplatData=e.optimizeSplatData,(e.freeIntermediateSplatData===void 0||e.freeIntermediateSplatData===null)&&(e.freeIntermediateSplatData=!1),this.freeIntermediateSplatData=e.freeIntermediateSplatData,ma()){const n=Cd();n.major<17&&(this.enableSIMDInSort=!1),n.major<16&&(this.sharedMemoryForWorkers=!1)}(e.splatRenderMode===void 0||e.splatRenderMode===null)&&(e.splatRenderMode=Ln.ThreeD),this.splatRenderMode=e.splatRenderMode,this.sceneFadeInRateMultiplier=e.sceneFadeInRateMultiplier||1,this.splatSortDistanceMapPrecision=e.splatSortDistanceMapPrecision||Ye.DefaultSplatSortDistanceMapPrecision;const t=this.integerBasedSort?20:24;this.splatSortDistanceMapPrecision=ut(this.splatSortDistanceMapPrecision,10,t),this.onSplatMeshChangedCallback=null,this.createSplatMesh(),this.controls=null,this.perspectiveControls=null,this.orthographicControls=null,this.orthographicCamera=null,this.perspectiveCamera=null,this.showMeshCursor=!1,this.showControlPlane=!1,this.showInfo=!1,this.sceneHelper=null,this.sortWorker=null,this.sortRunning=!1,this.splatRenderCount=0,this.splatSortCount=0,this.lastSplatSortCount=0,this.sortWorkerIndexesToSort=null,this.sortWorkerSortedIndexes=null,this.sortWorkerPrecomputedDistances=null,this.sortWorkerTransforms=null,this.preSortMessages=[],this.runAfterNextSort=[],this.selfDrivenModeRunning=!1,this.splatRenderReady=!1,this.raycaster=new BA,this.infoPanel=null,this.startInOrthographicMode=!1,this.currentFPS=0,this.lastSortTime=0,this.consecutiveRenderFrames=0,this.previousCameraTarget=new b,this.nextCameraTarget=new b,this.mousePosition=new xe,this.mouseDownPosition=new xe,this.mouseDownTime=null,this.resizeObserver=null,this.mouseMoveListener=null,this.mouseDownListener=null,this.mouseUpListener=null,this.keyDownListener=null,this.sortPromise=null,this.sortPromiseResolver=null,this.splatSceneDownloadPromises={},this.splatSceneDownloadAndBuildPromise=null,this.splatSceneRemovalPromise=null,this.loadingSpinner=new ea(null,this.rootElement||document.body),this.loadingSpinner.hide(),this.loadingProgressBar=new RA(this.rootElement||document.body),this.loadingProgressBar.hide(),this.infoPanel=new IA(this.rootElement||document.body),this.infoPanel.hide(),this.usingExternalCamera=!!(this.dropInMode||this.camera),this.usingExternalRenderer=!!(this.dropInMode||this.renderer),this.initialized=!1,this.disposing=!1,this.disposed=!1,this.disposePromise=null,this.dropInMode||this.init()}createSplatMesh(){this.splatMesh=new Rt(this.splatRenderMode,this.dynamicScene,this.enableOptionalEffects,this.halfPrecisionCovariancesOnGPU,this.devicePixelRatio,this.gpuAcceleratedSort,this.integerBasedSort,this.antialiased,this.maxScreenSpaceSplatSize,this.logLevel,this.sphericalHarmonicsDegree,this.sceneFadeInRateMultiplier,this.kernel2DSize),this.splatMesh.frustumCulled=!1,this.onSplatMeshChangedCallback&&this.onSplatMeshChangedCallback()}init(){this.initialized||(this.rootElement||(this.usingExternalRenderer?this.rootElement=this.renderer.domElement||document.body:(this.rootElement=document.createElement("div"),this.rootElement.style.width="100%",this.rootElement.style.height="100%",this.rootElement.style.position="absolute",document.body.appendChild(this.rootElement))),this.setupCamera(),this.setupRenderer(),this.setupWebXR(this.webXRSessionInit),this.setupControls(),this.setupEventHandlers(),this.threeScene=this.threeScene||new C0,this.sceneHelper=new bs(this.threeScene),this.sceneHelper.setupMeshCursor(),this.sceneHelper.setupFocusMarker(),this.sceneHelper.setupControlPlane(),this.loadingProgressBar.setContainer(this.rootElement),this.loadingSpinner.setContainer(this.rootElement),this.infoPanel.setContainer(this.rootElement),this.initialized=!0)}setupCamera(){if(!this.usingExternalCamera){const e=new xe;this.getRenderDimensions(e),this.perspectiveCamera=new Kt(sS,e.x/e.y,.1,1e3),this.orthographicCamera=new da(e.x/-2,e.x/2,e.y/2,e.y/-2,.1,1e3),this.camera=this.startInOrthographicMode?this.orthographicCamera:this.perspectiveCamera,this.camera.position.copy(this.initialCameraPosition),this.camera.up.copy(this.cameraUp).normalize(),this.camera.lookAt(this.initialCameraLookAt)}}setupRenderer(){if(!this.usingExternalRenderer){const e=new xe;this.getRenderDimensions(e),this.renderer=new yd({antialias:!1,precision:"highp"}),this.renderer.setPixelRatio(this.devicePixelRatio),this.renderer.autoClear=!0,this.renderer.setClearColor(new je(0),0),this.renderer.setSize(e.x,e.y),this.resizeObserver=new ResizeObserver(()=>{this.getRenderDimensions(e),this.renderer.setSize(e.x,e.y),this.forceRenderNextFrame()}),this.resizeObserver.observe(this.rootElement),this.rootElement.appendChild(this.renderer.domElement)}}setupWebXR(e){this.webXRMode&&(this.webXRMode===qi.VR?this.rootElement.appendChild(hs.createButton(this.renderer,e)):this.webXRMode===qi.AR&&this.rootElement.appendChild(iS.createButton(this.renderer,e)),this.renderer.xr.addEventListener("sessionstart",t=>{this.webXRActive=!0}),this.renderer.xr.addEventListener("sessionend",t=>{this.webXRActive=!1}),this.renderer.xr.enabled=!0,this.camera.position.copy(this.initialCameraPosition),this.camera.up.copy(this.cameraUp).normalize(),this.camera.lookAt(this.initialCameraLookAt))}setupControls(){if(this.useBuiltInControls&&this.webXRMode===qi.None){this.usingExternalCamera?this.camera.isOrthographicCamera?this.orthographicControls=new xr(this.camera,this.renderer.domElement):this.perspectiveControls=new xr(this.camera,this.renderer.domElement):(this.perspectiveControls=new xr(this.perspectiveCamera,this.renderer.domElement),this.orthographicControls=new xr(this.orthographicCamera,this.renderer.domElement));for(let e of[this.orthographicControls,this.perspectiveControls])e&&(e.listenToKeyEvents(window),e.rotateSpeed=.5,e.maxPolarAngle=Math.PI*.75,e.minPolarAngle=.1,e.enableDamping=!0,e.dampingFactor=.05,e.target.copy(this.initialCameraLookAt),e.update());this.controls=this.camera.isOrthographicCamera?this.orthographicControls:this.perspectiveControls,this.controls.update()}}setupEventHandlers(){this.useBuiltInControls&&this.webXRMode===qi.None&&(this.mouseMoveListener=this.onMouseMove.bind(this),this.renderer.domElement.addEventListener("pointermove",this.mouseMoveListener,!1),this.mouseDownListener=this.onMouseDown.bind(this),this.renderer.domElement.addEventListener("pointerdown",this.mouseDownListener,!1),this.mouseUpListener=this.onMouseUp.bind(this),this.renderer.domElement.addEventListener("pointerup",this.mouseUpListener,!1),this.keyDownListener=this.onKeyDown.bind(this),window.addEventListener("keydown",this.keyDownListener,!1))}removeEventHandlers(){this.useBuiltInControls&&(this.renderer.domElement.removeEventListener("pointermove",this.mouseMoveListener),this.mouseMoveListener=null,this.renderer.domElement.removeEventListener("pointerdown",this.mouseDownListener),this.mouseDownListener=null,this.renderer.domElement.removeEventListener("pointerup",this.mouseUpListener),this.mouseUpListener=null,window.removeEventListener("keydown",this.keyDownListener),this.keyDownListener=null)}setRenderMode(e){this.renderMode=e}setActiveSphericalHarmonicsDegrees(e){this.splatMesh.material.uniforms.sphericalHarmonicsDegree.value=e,this.splatMesh.material.uniformsNeedUpdate=!0}onSplatMeshChanged(e){this.onSplatMeshChangedCallback=e}onMouseMove(e){this.mousePosition.set(e.offsetX,e.offsetY)}onMouseDown(){this.mouseDownPosition.copy(this.mousePosition),this.mouseDownTime=Wi()}onMouseClick(e){this.mousePosition.set(e.offsetX,e.offsetY),this.checkForFocalPointChange()}getRenderDimensions(e){this.rootElement?(e.x=this.rootElement.offsetWidth,e.y=this.rootElement.offsetHeight):this.renderer.getSize(e)}setOrthographicMode(e){if(e===this.camera.isOrthographicCamera)return;const t=this.camera,n=e?this.orthographicCamera:this.perspectiveCamera;if(n.position.copy(t.position),n.up.copy(t.up),n.rotation.copy(t.rotation),n.quaternion.copy(t.quaternion),n.matrix.copy(t.matrix),this.camera=n,this.controls){const i=a=>{a.saveState(),a.reset()},s=this.controls,o=e?this.orthographicControls:this.perspectiveControls;i(o),i(s),o.target.copy(s.target),e?jn.setCameraZoomFromPosition(n,t,s):jn.setCameraPositionFromZoom(n,t,o),this.controls=o,this.camera.lookAt(this.controls.target)}}adjustForWebXRStereo(e){if(this.camera&&this.webXRActive){const n=this.renderer.xr.getCamera().projectionMatrix.elements[0],i=this.camera.projectionMatrix.elements[0];e.x*=i/n}}isLoadingOrUnloading(){return Object.keys(this.splatSceneDownloadPromises).length>0||this.splatSceneDownloadAndBuildPromise!==null||this.splatSceneRemovalPromise!==null}isDisposingOrDisposed(){return this.disposing||this.disposed}addSplatSceneDownloadPromise(e){this.splatSceneDownloadPromises[e.id]=e}removeSplatSceneDownloadPromise(e){delete this.splatSceneDownloadPromises[e.id]}setSplatSceneDownloadAndBuildPromise(e){this.splatSceneDownloadAndBuildPromise=e}clearSplatSceneDownloadAndBuildPromise(){this.splatSceneDownloadAndBuildPromise=null}addSplatScene(e,t={}){if(this.isLoadingOrUnloading())throw new Error("Cannot add splat scene while another load or unload is already in progress.");if(this.isDisposingOrDisposed())throw new Error("Cannot add splat scene after dispose() is called.");t.progressiveLoad&&this.splatMesh.scenes&&this.splatMesh.scenes.length>0&&(console.log('addSplatScene(): "progressiveLoad" option ignore because there are multiple splat scenes'),t.progressiveLoad=!1);const n=t.format!==void 0&&t.format!==null?t.format:Ec(e),i=jn.isProgressivelyLoadable(n)&&t.progressiveLoad,s=t.showLoadingUI!==void 0&&t.showLoadingUI!==null?t.showLoadingUI:!0;let o=null;s&&(this.loadingSpinner.removeAllTasks(),o=this.loadingSpinner.addTask("Downloading..."));const a=()=>{this.loadingProgressBar.hide(),this.loadingSpinner.removeAllTasks()},l=(A,p,m)=>{if(s)if(m===St.Downloading)if(A==100)this.loadingSpinner.setMessageForTask(o,"Download complete!");else if(i)this.loadingSpinner.setMessageForTask(o,"Downloading splats...");else{const S=p?`: ${p}`:"...";this.loadingSpinner.setMessageForTask(o,`Downloading${S}`)}else m===St.Processing&&this.loadingSpinner.setMessageForTask(o,"Processing splats...")};let c=!1,d=0;const u=(A,p)=>{s&&((A&&i||p&&!i)&&(this.loadingSpinner.removeTask(o),!p&&!c&&this.loadingProgressBar.show()),i&&(p?(c=!0,this.loadingProgressBar.hide()):this.loadingProgressBar.setProgress(d)))},f=(A,p,m)=>{d=A,l(A,p,m),t.onProgress&&t.onProgress(A,p,m)},h=(A,p,m)=>{!i&&t.onProgress&&t.onProgress(0,"0%",St.Processing);const S={rotation:t.rotation||t.orientation,position:t.position,scale:t.scale,splatAlphaRemovalThreshold:t.splatAlphaRemovalThreshold};return this.addSplatBuffers([A],[S],m,p&&s,s,i,i).then(()=>{!i&&t.onProgress&&t.onProgress(100,"100%",St.Processing),u(p,m)})};return(i?this.downloadAndBuildSingleSplatSceneProgressiveLoad.bind(this):this.downloadAndBuildSingleSplatSceneStandardLoad.bind(this))(e,n,t.splatAlphaRemovalThreshold,h.bind(this),f,a.bind(this),t.headers)}downloadAndBuildSingleSplatSceneStandardLoad(e,t,n,i,s,o,a){const l=this.downloadSplatSceneToSplatBuffer(e,n,s,!1,void 0,t,a),c=Ro(l.abortHandler);return l.then(d=>(this.removeSplatSceneDownloadPromise(l),i(d,!0,!0).then(()=>{c.resolve(),this.clearSplatSceneDownloadAndBuildPromise()}))).catch(d=>{o&&o(),this.clearSplatSceneDownloadAndBuildPromise(),this.removeSplatSceneDownloadPromise(l),c.reject(this.updateError(d,`Viewer::addSplatScene -> Could not load file ${e}`))}),this.addSplatSceneDownloadPromise(l),this.setSplatSceneDownloadAndBuildPromise(c.promise),c.promise}downloadAndBuildSingleSplatSceneProgressiveLoad(e,t,n,i,s,o,a){let l=0,c=!1;const d=[],u=()=>{if(d.length>0&&!c&&!this.isDisposingOrDisposed()){c=!0;const p=d.shift();i(p.splatBuffer,p.firstBuild,p.finalBuild).then(()=>{c=!1,p.firstBuild?g.resolve():p.finalBuild&&(A.resolve(),this.clearSplatSceneDownloadAndBuildPromise()),d.length>0&&jt(()=>u())})}},f=(p,m)=>{this.isDisposingOrDisposed()||(m||d.length===0||p.getSplatCount()>d[0].splatBuffer.getSplatCount())&&(d.push({splatBuffer:p,firstBuild:l===0,finalBuild:m}),l++,u())},h=this.downloadSplatSceneToSplatBuffer(e,n,s,!0,f,t,a),g=Ro(h.abortHandler),A=Ro();return this.addSplatSceneDownloadPromise(h),this.setSplatSceneDownloadAndBuildPromise(A.promise),h.then(()=>{this.removeSplatSceneDownloadPromise(h)}).catch(p=>{this.clearSplatSceneDownloadAndBuildPromise(),this.removeSplatSceneDownloadPromise(h);const m=this.updateError(p,"Viewer::addSplatScene -> Could not load one or more scenes");g.reject(m),o&&o(m)}),g.promise}addSplatScenes(e,t=!0,n=void 0){if(this.isLoadingOrUnloading())throw new Error("Cannot add splat scene while another load or unload is already in progress.");if(this.isDisposingOrDisposed())throw new Error("Cannot add splat scene after dispose() is called.");const i=e.length,s=[];let o;t&&(this.loadingSpinner.removeAllTasks(),o=this.loadingSpinner.addTask("Downloading..."));const a=(u,f,h,g)=>{s[u]=f;let A=0;for(let p=0;p<i;p++)A+=s[p]||0;A=A/i,h=`${A.toFixed(2)}%`,t&&g===St.Downloading&&this.loadingSpinner.setMessageForTask(o,A==100?"Download complete!":`Downloading: ${h}`),n&&n(A,h,g)},l=[],c=[];for(let u=0;u<e.length;u++){const f=e[u],h=f.format!==void 0&&f.format!==null?f.format:Ec(f.path),g=this.downloadSplatSceneToSplatBuffer(f.path,f.splatAlphaRemovalThreshold,a.bind(this,u),!1,void 0,h,f.headers);l.push(g),c.push(g.promise)}const d=new Us((u,f)=>{Promise.all(c).then(h=>{t&&this.loadingSpinner.removeTask(o),n&&n(0,"0%",St.Processing),this.addSplatBuffers(h,e,!0,t,t,!1,!1).then(()=>{n&&n(100,"100%",St.Processing),this.clearSplatSceneDownloadAndBuildPromise(),u()})}).catch(h=>{t&&this.loadingSpinner.removeTask(o),this.clearSplatSceneDownloadAndBuildPromise(),f(this.updateError(h,"Viewer::addSplatScenes -> Could not load one or more splat scenes."))}).finally(()=>{this.removeSplatSceneDownloadPromise(d)})},u=>{for(let f of l)f.abort(u)});return this.addSplatSceneDownloadPromise(d),this.setSplatSceneDownloadAndBuildPromise(d),d}downloadSplatSceneToSplatBuffer(e,t=1,n=void 0,i=!1,s=void 0,o,a){try{if(o===Ot.Splat||o===Ot.KSplat||o===Ot.Ply){const l=i?!1:this.optimizeSplatData;if(o===Ot.Splat)return wa.loadFromURL(e,n,i,s,t,this.inMemoryCompressionLevel,l,a);if(o===Ot.KSplat)return Jo.loadFromURL(e,n,i,s,a);if(o===Ot.Ply)return Ea.loadFromURL(e,n,i,s,t,this.inMemoryCompressionLevel,l,this.sphericalHarmonicsDegree,a)}else if(o===Ot.Spz)return Ta.loadFromURL(e,n,t,this.inMemoryCompressionLevel,this.optimizeSplatData,this.sphericalHarmonicsDegree,a)}catch(l){throw this.updateError(l,null)}throw new Error(`Viewer::downloadSplatSceneToSplatBuffer -> File format not supported: ${e}`)}static isProgressivelyLoadable(e){return e===Ot.Splat||e===Ot.KSplat||e===Ot.Ply}setupSortWorker(e){if(!this.isDisposingOrDisposed())return new Promise(t=>{const n=this.integerBasedSort?Int32Array:Float32Array,i=e.getSplatCount(),s=e.getMaxSplatCount();this.sortWorker=nS(s,this.sharedMemoryForWorkers,this.enableSIMDInSort,this.integerBasedSort,this.splatMesh.dynamicMode,this.splatSortDistanceMapPrecision),this.sortWorker.onmessage=o=>{if(o.data.sortDone){if(this.sortRunning=!1,this.sharedMemoryForWorkers)this.splatMesh.updateRenderIndexes(this.sortWorkerSortedIndexes,o.data.splatRenderCount);else{const a=new Uint32Array(o.data.sortedIndexes.buffer,0,o.data.splatRenderCount);this.splatMesh.updateRenderIndexes(a,o.data.splatRenderCount)}this.lastSplatSortCount=this.splatSortCount,this.lastSortTime=o.data.sortTime,this.sortPromiseResolver(),this.sortPromiseResolver=null,this.forceRenderNextFrame(),this.runAfterNextSort.length>0&&(this.runAfterNextSort.forEach(a=>{a()}),this.runAfterNextSort.length=0)}else if(o.data.sortCanceled)this.sortRunning=!1;else if(o.data.sortSetupPhase1Complete){this.logLevel>=ns.Info&&console.log("Sorting web worker WASM setup complete."),this.sharedMemoryForWorkers?(this.sortWorkerSortedIndexes=new Uint32Array(o.data.sortedIndexesBuffer,o.data.sortedIndexesOffset,s),this.sortWorkerIndexesToSort=new Uint32Array(o.data.indexesToSortBuffer,o.data.indexesToSortOffset,s),this.sortWorkerPrecomputedDistances=new n(o.data.precomputedDistancesBuffer,o.data.precomputedDistancesOffset,s),this.sortWorkerTransforms=new Float32Array(o.data.transformsBuffer,o.data.transformsOffset,Ye.MaxScenes*16)):(this.sortWorkerIndexesToSort=new Uint32Array(s),this.sortWorkerPrecomputedDistances=new n(s),this.sortWorkerTransforms=new Float32Array(Ye.MaxScenes*16));for(let a=0;a<i;a++)this.sortWorkerIndexesToSort[a]=a;if(this.sortWorker.maxSplatCount=s,this.logLevel>=ns.Info){console.log("Sorting web worker ready.");const a=this.splatMesh.getSplatDataTextures(),l=a.covariances.size,c=a.centerColors.size;console.log("Covariances texture size: "+l.x+" x "+l.y),console.log("Centers/colors texture size: "+c.x+" x "+c.y)}t()}}})}updateError(e,t){return e instanceof Md?e:e instanceof Dr?new Error("File type or server does not support progressive loading."):t?new Error(t):e}disposeSortWorker(){this.sortWorker&&this.sortWorker.terminate(),this.sortWorker=null,this.sortPromise=null,this.sortPromiseResolver&&(this.sortPromiseResolver(),this.sortPromiseResolver=null),this.preSortMessages=[],this.sortRunning=!1}removeSplatScene(e,t=!0){return this.removeSplatScenes([e],t)}removeSplatScenes(e,t=!0){if(this.isLoadingOrUnloading())throw new Error("Cannot remove splat scene while another load or unload is already in progress.");if(this.isDisposingOrDisposed())throw new Error("Cannot remove splat scene after dispose() is called.");let n;return this.splatSceneRemovalPromise=new Promise((i,s)=>{let o;t&&(this.loadingSpinner.removeAllTasks(),this.loadingSpinner.show(),o=this.loadingSpinner.addTask("Removing splat scene..."));const a=()=>{t&&(this.loadingSpinner.hide(),this.loadingSpinner.removeTask(o))},l=d=>{a(),this.splatSceneRemovalPromise=null,d?s(d):i()},c=()=>this.isDisposingOrDisposed()?(l(),!0):!1;n=this.sortPromise||Promise.resolve(),n.then(()=>{if(c())return;const d=[],u=[],f=[];for(let h=0;h<this.splatMesh.scenes.length;h++){let g=!1;for(let A of e)if(A===h){g=!0;break}if(!g){const A=this.splatMesh.scenes[h];d.push(A.splatBuffer),u.push(this.splatMesh.sceneOptions[h]),f.push({position:A.position.clone(),quaternion:A.quaternion.clone(),scale:A.scale.clone()})}}this.disposeSortWorker(),this.splatMesh.dispose(),this.sceneRevealMode=ts.Instant,this.createSplatMesh(),this.addSplatBuffers(d,u,!0,!1,!0).then(()=>{c()||(a(),this.splatMesh.scenes.forEach((h,g)=>{h.position.copy(f[g].position),h.quaternion.copy(f[g].quaternion),h.scale.copy(f[g].scale)}),this.splatMesh.updateTransforms(),this.splatRenderReady=!1,this.runSplatSort(!0).then(()=>{if(c()){this.splatRenderReady=!0;return}n=this.sortPromise||Promise.resolve(),n.then(()=>{this.splatRenderReady=!0,l()})}))}).catch(h=>{l(h)})})}),this.splatSceneRemovalPromise}start(){if(this.selfDrivenMode)this.webXRMode?this.renderer.setAnimationLoop(this.selfDrivenUpdateFunc):this.requestFrameId=requestAnimationFrame(this.selfDrivenUpdateFunc),this.selfDrivenModeRunning=!0;else throw new Error("Cannot start viewer unless it is in self driven mode.")}stop(){this.selfDrivenMode&&this.selfDrivenModeRunning&&(this.webXRMode?this.renderer.setAnimationLoop(null):cancelAnimationFrame(this.requestFrameId),this.selfDrivenModeRunning=!1)}async dispose(){if(this.isDisposingOrDisposed())return this.disposePromise;let e=[],t=[];for(let n in this.splatSceneDownloadPromises)if(this.splatSceneDownloadPromises.hasOwnProperty(n)){const i=this.splatSceneDownloadPromises[n];t.push(i),e.push(i.promise)}return this.sortPromise&&e.push(this.sortPromise),this.disposing=!0,this.disposePromise=Promise.all(e).finally(()=>{this.stop(),this.orthographicControls&&(this.orthographicControls.dispose(),this.orthographicControls=null),this.perspectiveControls&&(this.perspectiveControls.dispose(),this.perspectiveControls=null),this.controls=null,this.splatMesh&&(this.splatMesh.dispose(),this.splatMesh=null),this.sceneHelper&&(this.sceneHelper.dispose(),this.sceneHelper=null),this.resizeObserver&&(this.resizeObserver.unobserve(this.rootElement),this.resizeObserver=null),this.disposeSortWorker(),this.removeEventHandlers(),this.loadingSpinner.removeAllTasks(),this.loadingSpinner.setContainer(null),this.loadingProgressBar.hide(),this.loadingProgressBar.setContainer(null),this.infoPanel.setContainer(null),this.camera=null,this.threeScene=null,this.splatRenderReady=!1,this.initialized=!1,this.renderer&&(this.usingExternalRenderer||(this.rootElement.removeChild(this.renderer.domElement),this.renderer.dispose()),this.renderer=null),this.usingExternalRenderer||document.body.removeChild(this.rootElement),this.sortWorkerSortedIndexes=null,this.sortWorkerIndexesToSort=null,this.sortWorkerPrecomputedDistances=null,this.sortWorkerTransforms=null,this.disposed=!0,this.disposing=!1,this.disposePromise=null}),t.forEach(n=>{n.abort("Scene disposed")}),this.disposePromise}selfDrivenUpdate(){this.selfDrivenMode&&!this.webXRMode&&(this.requestFrameId=requestAnimationFrame(this.selfDrivenUpdateFunc)),this.update(),this.shouldRender()?(this.render(),this.consecutiveRenderFrames++):this.consecutiveRenderFrames=0,this.renderNextFrame=!1}forceRenderNextFrame(){this.renderNextFrame=!0}update(e,t){this.dropInMode&&this.updateForDropInMode(e,t),!(!this.initialized||!this.splatRenderReady||this.isDisposingOrDisposed())&&(this.controls&&(this.controls.update(),this.camera.isOrthographicCamera&&!this.usingExternalCamera&&jn.setCameraPositionFromZoom(this.camera,this.camera,this.controls)),this.runSplatSort(),this.updateForRendererSizeChanges(),this.updateSplatMesh(),this.updateMeshCursor(),this.updateFPS(),this.timingSensitiveUpdates(),this.updateInfoPanel(),this.updateControlPlane())}updateForDropInMode(e,t){this.renderer=e,this.splatMesh&&this.splatMesh.setRenderer(this.renderer),this.camera=t,this.controls&&(this.controls.object=t),this.init()}updateControlPlane(){this.showControlPlane?(this.sceneHelper.setControlPlaneVisibility(!0),this.sceneHelper.positionAndOrientControlPlane(this.controls.target,this.camera.up)):this.sceneHelper.setControlPlaneVisibility(!1)}getSplatMesh(){return this.splatMesh}getSplatScene(e){return this.splatMesh.getScene(e)}getSceneCount(){return this.splatMesh.getSceneCount()}isMobile(){return navigator.userAgent.includes("Mobi")}};ce(jn,"setCameraPositionFromZoom",function(){const e=new b;return function(t,n,i){const s=1/(n.zoom*.001);e.copy(i.target).sub(t.position).normalize().multiplyScalar(s).negate(),t.position.copy(i.target).add(e)}}()),ce(jn,"setCameraZoomFromPosition",function(){const e=new b;return function(t,n,i){const s=e.copy(i.target).sub(n.position).length();t.zoom=1/(s*.001)}}());let na=jn;const No=document.getElementById("overlay"),dS=document.getElementById("enterButton"),Dd=document.getElementById("status"),Xt=new yd({antialias:!0});Xt.setPixelRatio(Math.min(window.devicePixelRatio,2));Xt.setSize(window.innerWidth,window.innerHeight);Xt.outputColorSpace=cn;Xt.toneMapping=Zc;Xt.toneMappingExposure=1.2;Xt.setClearColor(1053720,1);document.body.appendChild(Xt.domElement);const Ft=new Kt(75,window.innerWidth/window.innerHeight,.01,2e3),Ra=new Map,On=new b,gn=new b,zo=new b,Ho=new b,ko=new b,uS=new b(0,1,0),Os=new b(0,0,-1),vr=new b,Bc=new b,Uc=new nt,Oc=new nt,Nc=new b,yt=new b(0,-1,0);let is=0;const zc=new b,Vo=new hn,Hc=new b,ss=new ze,Go=new xe,kc=new w0,Vc=new Fn,Gc=new b,Wc=new b,hS="controls-v12-profiles",fS=4,pS=2.2,mS=30,Xr=1.6;let vn=!0;const yr=.002,Fd=yi.degToRad(89),Ld=yi.degToRad(89),gS=Math.PI;let Br=0,ji=0;const bt=new na({selfDrivenMode:!1,renderer:Xt,camera:Ft,useBuiltInControls:!1,sphericalHarmonicsDegree:0,sceneRevealMode:ts.Instant,gpuAcceleratedSort:!1,integerBasedSort:!1,sharedMemoryForWorkers:!1});let $n=!1,Xc=performance.now();const Ia=[{label:"Identity",quat:new nt},{label:"X +90",quat:new nt().setFromEuler(new fn(Math.PI/2,0,0))},{label:"X -90",quat:new nt().setFromEuler(new fn(-Math.PI/2,0,0))}];let Ur=0;const qc={Digit1:0,Digit2:1,Digit3:2,Digit4:3,Digit5:4,Digit6:5,Digit7:6,Digit8:7,Digit9:8,Digit0:0},Qc={F1:0,F2:1,F3:2,F4:3,F5:4,F6:5,F7:6,F8:7,F9:8,F10:9};let rs=[],Or=0;const ks=[{name:"P0 Z+/X- yawY",forward:new b(0,0,1),right:new b(-1,0,0),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:-1,pitchSign:-1},{name:"P1 Z-/X+ yawY",forward:new b(0,0,-1),right:new b(1,0,0),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:-1,pitchSign:-1},{name:"P2 X+/Z+ yawY",forward:new b(1,0,0),right:new b(0,0,1),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:-1,pitchSign:-1},{name:"P3 X-/Z- yawY",forward:new b(-1,0,0),right:new b(0,0,-1),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:-1,pitchSign:-1},{name:"P4 Z+/X- yawY invertX",forward:new b(0,0,1),right:new b(-1,0,0),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:1,pitchSign:-1},{name:"P5 Z+/X- yawY invertY",forward:new b(0,0,1),right:new b(-1,0,0),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:-1,pitchSign:1},{name:"P6 Z+/X- swapMouse",forward:new b(0,0,1),right:new b(-1,0,0),yawAxis:new b(0,1,0),swapMouse:!0,yawSign:-1,pitchSign:-1},{name:"P7 Z+/X- yawZ",forward:new b(0,0,1),right:new b(-1,0,0),yawAxis:new b(0,0,1),swapMouse:!1,yawSign:-1,pitchSign:-1},{name:"P8 Z+/X- yawX",forward:new b(0,0,1),right:new b(-1,0,0),yawAxis:new b(1,0,0),swapMouse:!1,yawSign:-1,pitchSign:-1},{name:"P9 Z+/X+ yawY",forward:new b(0,0,1),right:new b(1,0,0),yawAxis:new b(0,1,0),swapMouse:!1,yawSign:-1,pitchSign:-1}];let ni=0;function As(){return document.pointerLockElement===Xt.domElement}function Bd(){As()||Xt.domElement.requestPointerLock()}function AS(){document.pointerLockElement&&document.exitPointerLock(),Ss()}function Ss(){const r=As();No.classList.toggle("hidden",r),r?(document.body.style.setProperty("cursor","none","important"),Xt.domElement.style.setProperty("cursor","none","important"),No.style.setProperty("cursor","none","important")):(document.body.style.setProperty("cursor","auto","important"),Xt.domElement.style.setProperty("cursor","crosshair","important"),No.style.setProperty("cursor","auto","important"))}function Pn(r){return Ra.get(r)===!0}function Ud(){yt.copy(uS)}function SS(r){var s,o;const e=(s=bt.getSplatScene)==null?void 0:s.call(bt,0);if(!r||r.isEmpty())return null;ss.identity(),e&&((o=e.updateMatrixWorld)==null||o.call(e,!0),ss.copy(e.matrixWorld));const t=[r.min.x,r.max.x],n=[r.min.y,r.max.y],i=[r.min.z,r.max.z];Vo.makeEmpty();for(const a of t)for(const l of n)for(const c of i)zc.set(a,l,c).applyMatrix4(ss),Vo.expandByPoint(zc);return Vo.clone()}function Ns(){const r=is+Xr,e=Ft.position.dot(yt);Ft.position.addScaledVector(yt,r-e)}function fs(){const e=ks[ni].yawAxis;Ft.up.copy(e);const t=Br+gS;Uc.setFromAxisAngle(e,t),vr.copy(Os).applyQuaternion(Uc).normalize(),Nc.copy(vr).cross(e).normalize(),Oc.setFromAxisAngle(Nc,ji),vr.applyQuaternion(Oc).normalize(),Bc.copy(Ft.position).add(vr),Ft.lookAt(Bc)}function xS(r){const e=r.clone().sub(Ft.position);if(e.lengthSq()===0)return;e.normalize();const t=yi.clamp(e.dot(yt),-1,1);ji=yi.clamp(Math.asin(t),-Fd,Ld);const n=e.clone().addScaledVector(yt,-t);if(n.lengthSq()>1e-8){n.normalize();const i=Os.clone().addScaledVector(yt,-Os.dot(yt));if(i.lengthSq()>1e-8){i.normalize();const s=yt.clone().cross(i).normalize();Br=Math.atan2(n.dot(s),n.dot(i))}}fs()}function _S(r){if(!As())return;const e=ks[ni];e.swapMouse?(Br+=r.movementY*yr*e.yawSign,ji+=r.movementX*yr*e.pitchSign):(Br+=r.movementX*yr*e.yawSign,ji+=r.movementY*yr*e.pitchSign),ji=yi.clamp(ji,-Fd,Ld),fs()}function vS(r){const e=r.clone(),t=is+Xr,n=e.dot(yt);return e.addScaledVector(yt,t-n),e}function yS(r,e){const t=Math.max(e*.35,4),n=Math.max(e*.7,8);let i=Os.clone().addScaledVector(yt,-Os.dot(yt));i.lengthSq()<1e-8&&(i=new b(1,0,0)),i.normalize();const s=yt.clone().cross(i).normalize(),o=vS(r),a=r.clone();return[{name:"Center",pos:o.clone(),target:r.clone().add(i)},{name:"Front",pos:o.clone().addScaledVector(i,t),target:a},{name:"Back",pos:o.clone().addScaledVector(i,-t),target:a},{name:"Right",pos:o.clone().addScaledVector(s,t),target:a},{name:"Left",pos:o.clone().addScaledVector(s,-t),target:a},{name:"Front Right",pos:o.clone().addScaledVector(i,t).addScaledVector(s,t),target:a},{name:"Front Left",pos:o.clone().addScaledVector(i,t).addScaledVector(s,-t),target:a},{name:"Back Right",pos:o.clone().addScaledVector(i,-t).addScaledVector(s,t),target:a},{name:"Back Left",pos:o.clone().addScaledVector(i,-t).addScaledVector(s,-t),target:a},{name:"High Overview",pos:o.clone().addScaledVector(yt,Math.max(e*.45,6)).addScaledVector(i,n*.3),target:a}]}function Dn(r=""){var i,s,o,a,l;const e=((o=(s=(i=bt.getSplatMesh)==null?void 0:i.call(bt))==null?void 0:s.getSplatCount)==null?void 0:o.call(s))??0,t=((a=rs[Or])==null?void 0:a.name)??"N/A",n=((l=ks[ni])==null?void 0:l.name)??"N/A";Dd.textContent=`Loaded /scene.ply (${e.toLocaleString()} splats, orientation=${Ia[Ur].label}, mode=${vn?"walk":"fly"}, view=${Or+1}:${t}, profile=${ni}:${n}, ${hS}`+(r?`, ${r}`:"")+")"}function Od(r){const e=rs[r];e&&(Or=r,Ft.position.copy(e.pos),vn&&Ns(),xS(e.target))}function MS(r,e){return!$n||(Go.x=r/window.innerWidth*2-1,Go.y=-(e/window.innerHeight)*2+1,kc.setFromCamera(Go,Ft),Vc.set(yt.x,yt.y,yt.z,-is),!kc.ray.intersectPlane(Vc,Gc))?!1:(Ft.position.copy(Gc).addScaledVector(yt,Xr),On.set(0,0,0),fs(),vn&&Ns(),!0)}function CS(){rs[0]&&(Ft.getWorldDirection(Wc).normalize(),rs[0]={...rs[0],name:"Center (manual)",pos:Ft.position.clone(),target:Ft.position.clone().add(Wc)},Or=0)}function ES(){gn.set(0,0,0);const r=ks[ni];return zo.copy(r.forward),Ho.copy(r.right),ko.copy(yt),Pn("KeyW")&&gn.add(zo),Pn("KeyS")&&gn.sub(zo),Pn("KeyD")&&gn.add(Ho),Pn("KeyA")&&gn.sub(Ho),!vn&&Pn("Space")&&gn.add(ko),!vn&&(Pn("ControlLeft")||Pn("ControlRight"))&&gn.sub(ko),gn.lengthSq()>0&&gn.normalize(),gn}function TS(r){if(!As()){On.set(0,0,0),vn&&Ns();return}const e=Pn("ShiftLeft")||Pn("ShiftRight"),t=fS*(e?pS:1),s=ES().clone().multiplyScalar(t).sub(On),o=mS*r;s.length()>o&&s.setLength(o),On.add(s);const a=Math.exp(-10*r);On.multiplyScalar(a),Ft.position.addScaledVector(On,r),vn&&Ns(),fs()}function wS(){Ft.aspect=window.innerWidth/window.innerHeight,Ft.updateProjectionMatrix(),Xt.setSize(window.innerWidth,window.innerHeight)}function Nd(){var e;const r=(e=bt.getSplatScene)==null?void 0:e.call(bt,0);r&&(r.quaternion.copy(Ia[Ur].quat),Ud())}function zd(){var a,l,c;const r=(a=bt.getSplatMesh)==null?void 0:a.call(bt),e=r==null?void 0:r.boundingBox,t=new b;r!=null&&r.calculatedSceneCenter?t.copy(r.calculatedSceneCenter):e&&!e.isEmpty()?e.getCenter(t):t.set(0,0,0),Ud();const n=(l=bt.getSplatScene)==null?void 0:l.call(bt,0);ss.identity(),n&&((c=n.updateMatrixWorld)==null||c.call(n,!0),ss.copy(n.matrixWorld));const i=t.clone().applyMatrix4(ss),s=SS(e);s&&!s.isEmpty()?(s.getCenter(Hc),i.copy(Hc),is=s.min.y):is=i.y,i.y=is+Xr;const o=s&&!s.isEmpty()?Math.max(s.getSize(new b).length()*.5,10):10;rs=yS(i,o),Od(0)}function Hd(r){const e=Math.min((r-Xc)/1e3,.1);Xc=r,Ss(),TS(e),$n&&(bt.update(),bt.render()),requestAnimationFrame(Hd)}dS.addEventListener("click",r=>{r.shiftKey||Bd()});Xt.domElement.addEventListener("click",r=>{r.shiftKey&&!As()||Bd()});document.addEventListener("mousedown",r=>{r.button!==0||!r.shiftKey||As()||MS(r.clientX,r.clientY)&&(Dn("Shift+Click floor pick applied"),r.preventDefault(),r.stopPropagation())},!0);document.addEventListener("pointerlockchange",Ss);document.addEventListener("pointerlockerror",Ss);document.addEventListener("mousemove",_S);document.addEventListener("keydown",r=>{Ra.set(r.code,!0),$n&&Object.hasOwn(qc,r.code)&&(Od(qc[r.code]),Dn("1-9/0=view, F1-F10=profile")),$n&&Object.hasOwn(Qc,r.code)&&(ni=Qc[r.code],On.set(0,0,0),fs(),Dn("1-9/0=view, F1-F10=profile")),r.code==="KeyP"&&$n&&(ni=(ni+1)%ks.length,On.set(0,0,0),fs(),Dn("1-9/0=view, F1-F10=profile")),r.code==="KeyM"&&$n&&(CS(),Dn("Saved current spot to view 0")),r.code==="KeyU"&&(AS(),Dn("Unlocked pointer (U)")),r.code==="KeyV"&&(vn=!vn,On.set(0,0,0),vn&&Ns(),Dn("1-9/0=view, F1-F10=profile")),r.code==="KeyZ"&&$n&&(Ur=(Ur+1)%Ia.length,Nd(),zd(),Dn("1-9/0=view, F1-F10=profile"))});document.addEventListener("keyup",r=>{Ra.set(r.code,!1),r.code==="Escape"&&setTimeout(Ss,0)});window.addEventListener("resize",wS);Ss();(async()=>{try{await bt.addSplatScene("/scene.ply",{format:Ot.Ply,showLoadingUI:!0,progressiveLoad:!1,splatAlphaRemovalThreshold:5}),Nd(),zd(),$n=!0,Dn("1-9/0=view, F1-F10=profile, Z=orientation, V=walk/fly, P=next-profile, Shift+Click=floor pick, M=save view0")}catch(r){Dd.textContent="Failed to load /scene.ply (see console)",console.error("Failed to load Gaussian splat scene:",r)}})();requestAnimationFrame(Hd);
