(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bc="170",xs={ROTATE:0,DOLLY:1,PAN:2},Mi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Md=0,Nl=1,bd=2,Hc=1,lf=2,Zn=3,ii=0,Je=1,Ze=2,Ai=0,_s=1,Ul=2,zl=3,kl=4,Sd=5,Bi=100,Ad=101,Ed=102,Td=103,wd=104,Rd=200,Cd=201,Pd=202,Ld=203,Go=204,Vo=205,Id=206,Dd=207,Nd=208,Ud=209,zd=210,kd=211,Od=212,Fd=213,Bd=214,Wo=0,Xo=1,jo=2,As=3,Yo=4,Ko=5,qo=6,Zo=7,Gc=0,Hd=1,Gd=2,Ei=0,Vd=1,Wd=2,Xd=3,uf=4,jd=5,Yd=6,Kd=7,Ol="attached",qd="detached",hf=300,Es=301,Ts=302,$o=303,Jo=304,Pa=306,Ti=1e3,Un=1001,Sa=1002,He=1003,ff=1004,er=1005,Oe=1006,ga=1007,dn=1008,mn=1009,df=1010,pf=1011,dr=1012,Vc=1013,Gi=1014,pn=1015,Us=1016,Wc=1017,Xc=1018,ws=1020,mf=35902,gf=1021,xf=1022,Be=1023,_f=1024,vf=1025,vs=1026,Rs=1027,jc=1028,Yc=1029,yf=1030,Kc=1031,qc=1033,xa=33776,_a=33777,va=33778,ya=33779,Qo=35840,tc=35841,ec=35842,nc=35843,ic=36196,sc=37492,rc=37496,ac=37808,oc=37809,cc=37810,lc=37811,uc=37812,hc=37813,fc=37814,dc=37815,pc=37816,mc=37817,gc=37818,xc=37819,_c=37820,vc=37821,Ma=36492,yc=36494,Mc=36495,Mf=36283,bc=36284,Sc=36285,Ac=36286,Zc=2200,Zd=2201,$d=2202,pr=2300,mr=2301,Ha=2302,ds=2400,ps=2401,Aa=2402,$c=2500,Jd=2501,Qd=0,bf=1,Ec=2,tp=3200,Jc=3201,Qc=0,ep=1,yi="",ke="srgb",Qe="srgb-linear",La="linear",de="srgb",Ki=7680,Fl=519,np=512,ip=513,sp=514,Sf=515,rp=516,ap=517,op=518,cp=519,Tc=35044,ys=35048,Bl="300 es",Jn=2e3,Ea=2001;class Ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hl=1234567;const rr=Math.PI/180,Cs=180/Math.PI;function Rn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function Ce(i,t,e){return Math.max(t,Math.min(e,i))}function tl(i,t){return(i%t+t)%t}function lp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function up(i,t,e){return i!==t?(e-i)/(t-i):0}function ar(i,t,e){return(1-e)*i+e*t}function hp(i,t,e,n){return ar(i,t,1-Math.exp(-e*n))}function fp(i,t=1){return t-Math.abs(tl(i,t*2)-t)}function dp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function pp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function mp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function gp(i,t){return i+Math.random()*(t-i)}function xp(i){return i*(.5-Math.random())}function _p(i){i!==void 0&&(Hl=i);let t=Hl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vp(i){return i*rr}function yp(i){return i*Cs}function Mp(i){return(i&i-1)===0&&i!==0}function bp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Sp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ap(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function En(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ei={DEG2RAD:rr,RAD2DEG:Cs,generateUUID:Rn,clamp:Ce,euclideanModulo:tl,mapLinear:lp,inverseLerp:up,lerp:ar,damp:hp,pingpong:fp,smoothstep:dp,smootherstep:pp,randInt:mp,randFloat:gp,randFloatSpread:xp,seededRandom:_p,degToRad:vp,radToDeg:yp,isPowerOfTwo:Mp,ceilPowerOfTwo:bp,floorPowerOfTwo:Sp,setQuaternionFromProperEuler:Ap,normalize:ue,denormalize:En};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jt{constructor(t,e,n,s,r,a,o,c,l){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],x=s[0],g=s[3],p=s[6],M=s[1],v=s[4],_=s[7],E=s[2],T=s[5],P=s[8];return r[0]=a*x+o*M+c*E,r[3]=a*g+o*v+c*T,r[6]=a*p+o*_+c*P,r[1]=l*x+u*M+h*E,r[4]=l*g+u*v+h*T,r[7]=l*p+u*_+h*P,r[2]=d*x+f*M+m*E,r[5]=d*g+f*v+m*T,r[8]=d*p+f*_+m*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,m=e*h+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=h*x,t[1]=(s*l-u*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ga.makeScale(t,e)),this}rotate(t){return this.premultiply(Ga.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ga.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ga=new jt;function Af(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ep(){const i=gr("canvas");return i.style.display="block",i}const Gl={};function nr(i){i in Gl||(Gl[i]=!0,console.warn(i))}function Tp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function wp(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Rp(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jt={enabled:!0,workingColorSpace:Qe,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===de&&(i.r=ni(i.r),i.g=ni(i.g),i.b=ni(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===de&&(i.r=Ms(i.r),i.g=Ms(i.g),i.b=Ms(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===yi?La:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ms(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Vl=[.64,.33,.3,.6,.15,.06],Wl=[.2126,.7152,.0722],Xl=[.3127,.329],jl=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yl=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[Qe]:{primaries:Vl,whitePoint:Xl,transfer:La,toXYZ:jl,fromXYZ:Yl,luminanceCoefficients:Wl,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:Vl,whitePoint:Xl,transfer:de,toXYZ:jl,fromXYZ:Yl,luminanceCoefficients:Wl,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}});let qi;class Cp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{qi===void 0&&(qi=gr("canvas")),qi.width=t.width,qi.height=t.height;const n=qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ni(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ni(e[n]/255)*255):e[n]=ni(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pp=0;class Ef{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Rn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Va(s[a].image)):r.push(Va(s[a]))}else r=Va(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Va(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Lp=0;class De extends Ri{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=Un,s=Un,r=Oe,a=dn,o=Be,c=mn,l=De.DEFAULT_ANISOTROPY,u=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=Rn(),this.name="",this.source=new Ef(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ti:t.x=t.x-Math.floor(t.x);break;case Un:t.x=t.x<0?0:1;break;case Sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ti:t.y=t.y-Math.floor(t.y);break;case Un:t.y=t.y<0?0:1;break;case Sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=hf;De.DEFAULT_ANISOTROPY=1;class Qt{constructor(t=0,e=0,n=0,s=1){Qt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,_=(f+1)/2,E=(p+1)/2,T=(u+d)/4,P=(h+x)/4,N=(m+g)/4;return v>_&&v>E?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=P/n):_>E?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=N/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=P/r,s=N/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(h-x)/M,this.z=(d-u)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ip extends Ri{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Qt(0,0,t,e),this.scissorTest=!1,this.viewport=new Qt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new De(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ef(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vi extends Ip{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Tf extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dp extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _e{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],m=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=x;return}if(h!==x||c!==d||l!==f||u!==m){let g=1-o;const p=c*d+l*f+u*m+h*x,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const E=Math.sqrt(v),T=Math.atan2(E,p*M);g=Math.sin(g*T)/E,o=Math.sin(o*T)/E}const _=o*M;if(c=c*g+d*_,l=l*g+f*_,u=u*g+m*_,h=h*g+x*_,g===1-o){const E=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=E,l*=E,u*=E,h*=E}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+u*h+c*f-l*d,t[e+1]=c*m+u*d+l*h-o*f,t[e+2]=l*m+u*f+o*d-c*h,t[e+3]=u*m-o*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h+d*f*m;break;case"YZX":this._x=d*u*h+l*f*m,this._y=l*f*h+d*u*m,this._z=l*u*m-d*f*h,this._w=l*u*h-d*f*m;break;case"XZY":this._x=d*u*h-l*f*m,this._y=l*f*h-d*u*m,this._z=l*u*m+d*f*h,this._w=l*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ce(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Wa.copy(this).projectOnVector(t),this.sub(Wa)}reflect(t){return this.sub(Wa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wa=new B,Kl=new _e;class ri{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)),wr.applyMatrix4(t.matrixWorld),this.union(wr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vs),Rr.subVectors(this.max,Vs),Zi.subVectors(t.a,Vs),$i.subVectors(t.b,Vs),Ji.subVectors(t.c,Vs),li.subVectors($i,Zi),ui.subVectors(Ji,$i),Pi.subVectors(Zi,Ji);let e=[0,-li.z,li.y,0,-ui.z,ui.y,0,-Pi.z,Pi.y,li.z,0,-li.x,ui.z,0,-ui.x,Pi.z,0,-Pi.x,-li.y,li.x,0,-ui.y,ui.x,0,-Pi.y,Pi.x,0];return!Xa(e,Zi,$i,Ji,Rr)||(e=[1,0,0,0,1,0,0,0,1],!Xa(e,Zi,$i,Ji,Rr))?!1:(Cr.crossVectors(li,ui),e=[Cr.x,Cr.y,Cr.z],Xa(e,Zi,$i,Ji,Rr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Gn=[new B,new B,new B,new B,new B,new B,new B,new B],_n=new B,wr=new ri,Zi=new B,$i=new B,Ji=new B,li=new B,ui=new B,Pi=new B,Vs=new B,Rr=new B,Cr=new B,Li=new B;function Xa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Li.fromArray(i,r);const o=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),c=t.dot(Li),l=e.dot(Li),u=n.dot(Li);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Np=new ri,Ws=new B,ja=new B;class on{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Np.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ws.subVectors(t,this.center);const e=Ws.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ja.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ws.copy(t.center).add(ja)),this.expandByPoint(Ws.copy(t.center).sub(ja))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Vn=new B,Ya=new B,Pr=new B,hi=new B,Ka=new B,Lr=new B,qa=new B;class zs{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vn.copy(this.origin).addScaledVector(this.direction,e),Vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ya.copy(t).add(e).multiplyScalar(.5),Pr.copy(e).sub(t).normalize(),hi.copy(this.origin).sub(Ya);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Pr),o=hi.dot(this.direction),c=-hi.dot(Pr),l=hi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*c-o,d=a*o-c,m=r*u,h>=0)if(d>=-m)if(d<=m){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=m?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ya).addScaledVector(Pr,d),f}intersectSphere(t,e){Vn.subVectors(t.center,this.origin);const n=Vn.dot(this.direction),s=Vn.dot(Vn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Vn)!==null}intersectTriangle(t,e,n,s,r){Ka.subVectors(e,t),Lr.subVectors(n,t),qa.crossVectors(Ka,Lr);let a=this.direction.dot(qa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;hi.subVectors(this.origin,t);const c=o*this.direction.dot(Lr.crossVectors(hi,Lr));if(c<0)return null;const l=o*this.direction.dot(Ka.cross(hi));if(l<0||c+l>a)return null;const u=-o*hi.dot(qa);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(t,e,n,s,r,a,o,c,l,u,h,d,f,m,x,g){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,h,d,f,m,x,g)}set(t,e,n,s,r,a,o,c,l,u,h,d,f,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Qi.setFromMatrixColumn(t,0).length(),r=1/Qi.setFromMatrixColumn(t,1).length(),a=1/Qi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,f=a*h,m=o*u,x=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+m*l,e[5]=d-x*l,e[9]=-o*c,e[2]=x-d*l,e[6]=m+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,m=l*u,x=l*h;e[0]=d+x*o,e[4]=m*o-f,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-m,e[6]=x+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,m=l*u,x=l*h;e[0]=d-x*o,e[4]=-a*h,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*u,e[9]=x-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,f=a*h,m=o*u,x=o*h;e[0]=c*u,e[4]=m*l-f,e[8]=d*l+x,e[1]=c*h,e[5]=x*l+d,e[9]=f*l-m,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,m=o*c,x=o*l;e[0]=c*u,e[4]=x-d*h,e[8]=m*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*h+m,e[10]=d-x*h}else if(t.order==="XZY"){const d=a*c,f=a*l,m=o*c,x=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+x,e[5]=a*u,e[9]=f*h-m,e[2]=m*h-f,e[6]=o*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Up,t,zp)}lookAt(t,e,n){const s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),fi.crossVectors(n,rn),fi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),fi.crossVectors(n,rn)),fi.normalize(),Ir.crossVectors(rn,fi),s[0]=fi.x,s[4]=Ir.x,s[8]=rn.x,s[1]=fi.y,s[5]=Ir.y,s[9]=rn.y,s[2]=fi.z,s[6]=Ir.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],M=n[3],v=n[7],_=n[11],E=n[15],T=s[0],P=s[4],N=s[8],w=s[12],A=s[1],I=s[5],G=s[9],j=s[13],q=s[2],y=s[6],b=s[10],R=s[14],S=s[3],z=s[7],O=s[11],C=s[15];return r[0]=a*T+o*A+c*q+l*S,r[4]=a*P+o*I+c*y+l*z,r[8]=a*N+o*G+c*b+l*O,r[12]=a*w+o*j+c*R+l*C,r[1]=u*T+h*A+d*q+f*S,r[5]=u*P+h*I+d*y+f*z,r[9]=u*N+h*G+d*b+f*O,r[13]=u*w+h*j+d*R+f*C,r[2]=m*T+x*A+g*q+p*S,r[6]=m*P+x*I+g*y+p*z,r[10]=m*N+x*G+g*b+p*O,r[14]=m*w+x*j+g*R+p*C,r[3]=M*T+v*A+_*q+E*S,r[7]=M*P+v*I+_*y+E*z,r[11]=M*N+v*G+_*b+E*O,r[15]=M*w+v*j+_*R+E*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+x*(+e*c*f-e*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+g*(+e*l*h-e*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-e*c*h+e*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],m=t[12],x=t[13],g=t[14],p=t[15],M=h*g*l-x*d*l+x*c*f-o*g*f-h*c*p+o*d*p,v=m*d*l-u*g*l-m*c*f+a*g*f+u*c*p-a*d*p,_=u*x*l-m*h*l+m*o*f-a*x*f-u*o*p+a*h*p,E=m*h*c-u*x*c-m*o*d+a*x*d+u*o*g-a*h*g,T=e*M+n*v+s*_+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/T;return t[0]=M*P,t[1]=(x*d*r-h*g*r-x*s*f+n*g*f+h*s*p-n*d*p)*P,t[2]=(o*g*r-x*c*r+x*s*l-n*g*l-o*s*p+n*c*p)*P,t[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*P,t[4]=v*P,t[5]=(u*g*r-m*d*r+m*s*f-e*g*f-u*s*p+e*d*p)*P,t[6]=(m*c*r-a*g*r-m*s*l+e*g*l+a*s*p-e*c*p)*P,t[7]=(a*d*r-u*c*r+u*s*l-e*d*l-a*s*f+e*c*f)*P,t[8]=_*P,t[9]=(m*h*r-u*x*r-m*n*f+e*x*f+u*n*p-e*h*p)*P,t[10]=(a*x*r-m*o*r+m*n*l-e*x*l-a*n*p+e*o*p)*P,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*f-e*o*f)*P,t[12]=E*P,t[13]=(u*x*s-m*h*s+m*n*d-e*x*d-u*n*g+e*h*g)*P,t[14]=(m*o*s-a*x*s-m*n*c+e*x*c+a*n*g-e*o*g)*P,t[15]=(a*h*s-u*o*s+u*n*c-e*h*c-a*n*d+e*o*d)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,m=r*h,x=a*u,g=a*h,p=o*h,M=c*l,v=c*u,_=c*h,E=n.x,T=n.y,P=n.z;return s[0]=(1-(x+p))*E,s[1]=(f+_)*E,s[2]=(m-v)*E,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(d+p))*T,s[6]=(g+M)*T,s[7]=0,s[8]=(m+v)*P,s[9]=(g-M)*P,s[10]=(1-(d+x))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Qi.set(s[0],s[1],s[2]).length();const a=Qi.set(s[4],s[5],s[6]).length(),o=Qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],vn.copy(this);const l=1/r,u=1/a,h=1/o;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=h,vn.elements[9]*=h,vn.elements[10]*=h,e.setFromRotationMatrix(vn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Jn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s);let f,m;if(o===Jn)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Ea)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Jn){const c=this.elements,l=1/(e-t),u=1/(n-s),h=1/(a-r),d=(e+t)*l,f=(n+s)*u;let m,x;if(o===Jn)m=(a+r)*h,x=-2*h;else if(o===Ea)m=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Qi=new B,vn=new Ht,Up=new B(0,0,0),zp=new B(1,1,1),fi=new B,Ir=new B,rn=new B,ql=new Ht,Zl=new _e;class tn{constructor(t=0,e=0,n=0,s=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ce(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ce(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ce(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zl.setFromEuler(this),this.setFromQuaternion(Zl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class el{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kp=0;const $l=new B,ts=new _e,Wn=new Ht,Dr=new B,Xs=new B,Op=new B,Fp=new _e,Jl=new B(1,0,0),Ql=new B(0,1,0),tu=new B(0,0,1),eu={type:"added"},Bp={type:"removed"},es={type:"childadded",child:null},Za={type:"childremoved",child:null};class Se extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new B,e=new tn,n=new _e,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ht},normalMatrix:{value:new jt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new el,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.multiply(ts),this}rotateOnWorldAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.premultiply(ts),this}rotateX(t){return this.rotateOnAxis(Jl,t)}rotateY(t){return this.rotateOnAxis(Ql,t)}rotateZ(t){return this.rotateOnAxis(tu,t)}translateOnAxis(t,e){return $l.copy(t).applyQuaternion(this.quaternion),this.position.add($l.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jl,t)}translateY(t){return this.translateOnAxis(Ql,t)}translateZ(t){return this.translateOnAxis(tu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Dr.copy(t):Dr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Xs,Dr,this.up):Wn.lookAt(Dr,Xs,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),ts.setFromRotationMatrix(Wn),this.quaternion.premultiply(ts.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eu),es.child=t,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bp),Za.child=t,this.dispatchEvent(Za),Za.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eu),es.child=t,this.dispatchEvent(es),es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,t,Op),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,Fp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Se.DEFAULT_UP=new B(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new B,Xn=new B,$a=new B,jn=new B,ns=new B,is=new B,nu=new B,Ja=new B,Qa=new B,to=new B,eo=new Qt,no=new Qt,io=new Qt;class Tn{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),Xn.subVectors(n,e),$a.subVectors(t,e);const a=yn.dot(yn),o=yn.dot(Xn),c=yn.dot($a),l=Xn.dot(Xn),u=Xn.dot($a),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,m=(a*u-o*c)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,jn.x),c.addScaledVector(a,jn.y),c.addScaledVector(o,jn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return eo.setScalar(0),no.setScalar(0),io.setScalar(0),eo.fromBufferAttribute(t,e),no.fromBufferAttribute(t,n),io.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(eo,r.x),a.addScaledVector(no,r.y),a.addScaledVector(io,r.z),a}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),Xn.subVectors(t,e),yn.cross(Xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),yn.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Tn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ns.subVectors(s,n),is.subVectors(r,n),Ja.subVectors(t,n);const c=ns.dot(Ja),l=is.dot(Ja);if(c<=0&&l<=0)return e.copy(n);Qa.subVectors(t,s);const u=ns.dot(Qa),h=is.dot(Qa);if(u>=0&&h<=u)return e.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(ns,a);to.subVectors(t,r);const f=ns.dot(to),m=is.dot(to);if(m>=0&&f<=m)return e.copy(r);const x=f*l-c*m;if(x<=0&&l>=0&&m<=0)return o=l/(l-m),e.copy(n).addScaledVector(is,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return nu.subVectors(r,s),o=(h-u)/(h-u+(f-m)),e.copy(s).addScaledVector(nu,o);const p=1/(g+x+d);return a=x*p,o=d*p,e.copy(n).addScaledVector(ns,a).addScaledVector(is,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function so(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=tl(t,1),e=Ce(e,0,1),n=Ce(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=so(a,r,t+1/3),this.g=so(a,r,t),this.b=so(a,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=wf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=Ms(t.r),this.g=Ms(t.g),this.b=Ms(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Jt.fromWorkingColorSpace(Xe.copy(this),t),Math.round(Ce(Xe.r*255,0,255))*65536+Math.round(Ce(Xe.g*255,0,255))*256+Math.round(Ce(Xe.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Xe.copy(this),e);const n=Xe.r,s=Xe.g,r=Xe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=ke){Jt.fromWorkingColorSpace(Xe.copy(this),t);const e=Xe.r,n=Xe.g,s=Xe.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(Nr);const n=ar(di.h,Nr.h,e),s=ar(di.s,Nr.s,e),r=ar(di.l,Nr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new Dt;Dt.NAMES=wf;let Hp=0;class Cn extends Ri{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=Rn(),this.name="",this.blending=_s,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Vo,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_s&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Go&&(n.blendSrc=this.blendSrc),this.blendDst!==Vo&&(n.blendDst=this.blendDst),this.blendEquation!==Bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class $e extends Cn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ur=Gp();function Gp(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;!(l&8388608);)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Vp(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Ce(i,-65504,65504),Ur.floatView[0]=i;const t=Ur.uint32View[0],e=t>>23&511;return Ur.baseTable[e]+((t&8388607)>>Ur.shiftTable[e])}const Wp={toHalfFloat:Vp},Pe=new B,zr=new vt;class me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Tc,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=En(e,this.array)),e}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=En(e,this.array)),e}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=En(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=En(e,this.array)),e}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),s=ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),s=ue(s,this.array),r=ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tc&&(t.usage=this.usage),t}}class Rf extends me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Cf extends me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Gt extends me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Xp=0;const ln=new Ht,ro=new Se,ss=new B,an=new ri,js=new ri,ze=new B;class se extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Af(t)?Cf:Rf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return ro.lookAt(t),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Gt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new on);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];js.setFromBufferAttribute(o),this.morphTargetsRelative?(ze.addVectors(an.min,js.min),an.expandByPoint(ze),ze.addVectors(an.max,js.max),an.expandByPoint(ze)):(an.expandByPoint(js.min),an.expandByPoint(js.max))}an.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ze.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ze));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)ze.fromBufferAttribute(o,l),c&&(ss.fromBufferAttribute(t,l),ze.add(ss)),s=Math.max(s,n.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new me(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new B,c[N]=new B;const l=new B,u=new B,h=new B,d=new vt,f=new vt,m=new vt,x=new B,g=new B;function p(N,w,A){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,w),h.fromBufferAttribute(n,A),d.fromBufferAttribute(r,N),f.fromBufferAttribute(r,w),m.fromBufferAttribute(r,A),u.sub(l),h.sub(l),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[N].add(x),o[w].add(x),o[A].add(x),c[N].add(g),c[w].add(g),c[A].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let N=0,w=M.length;N<w;++N){const A=M[N],I=A.start,G=A.count;for(let j=I,q=I+G;j<q;j+=3)p(t.getX(j+0),t.getX(j+1),t.getX(j+2))}const v=new B,_=new B,E=new B,T=new B;function P(N){E.fromBufferAttribute(s,N),T.copy(E);const w=o[N];v.copy(w),v.sub(E.multiplyScalar(E.dot(w))).normalize(),_.crossVectors(T,w);const I=_.dot(c[N])<0?-1:1;a.setXYZW(N,v.x,v.y,v.z,I)}for(let N=0,w=M.length;N<w;++N){const A=M[N],I=A.start,G=A.count;for(let j=I,q=I+G;j<q;j+=3)P(t.getX(j+0)),P(t.getX(j+1)),P(t.getX(j+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new B,r=new B,a=new B,o=new B,c=new B,l=new B,u=new B,h=new B;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),x=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,m=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*u;for(let p=0;p<u;p++)d[m++]=l[f++]}return new me(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new se,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const iu=new Ht,Ii=new zs,kr=new on,su=new B,Or=new B,Fr=new B,Br=new B,ao=new B,Hr=new B,ru=new B,Gr=new B;class te extends Se{constructor(t=new se,e=new $e){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(ao.fromBufferAttribute(h,t),a?Hr.addScaledVector(ao,u):Hr.addScaledVector(ao.sub(e),u))}e.add(Hr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),Ii.copy(t.ray).recast(t.near),!(kr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(kr,su)===null||Ii.origin.distanceToSquared(su)>(t.far-t.near)**2))&&(iu.copy(r).invert(),Ii.copy(t.ray).applyMatrix4(iu),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ii)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),v=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=M,E=v;_<E;_+=3){const T=o.getX(_),P=o.getX(_+1),N=o.getX(_+2);s=Vr(this,p,t,n,l,u,h,T,P,N),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const M=o.getX(g),v=o.getX(g+1),_=o.getX(g+2);s=Vr(this,a,t,n,l,u,h,M,v,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),v=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=M,E=v;_<E;_+=3){const T=_,P=_+1,N=_+2;s=Vr(this,p,t,n,l,u,h,T,P,N),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const M=g,v=g+1,_=g+2;s=Vr(this,a,t,n,l,u,h,M,v,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function jp(i,t,e,n,s,r,a,o){let c;if(t.side===Je?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===ii,o),c===null)return null;Gr.copy(o),Gr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Gr);return l<e.near||l>e.far?null:{distance:l,point:Gr.clone(),object:i}}function Vr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Or),i.getVertexPosition(c,Fr),i.getVertexPosition(l,Br);const u=jp(i,t,e,n,Or,Fr,Br,ru);if(u){const h=new B;Tn.getBarycoord(ru,Or,Fr,Br,h),s&&(u.uv=Tn.getInterpolatedAttribute(s,o,c,l,h,new vt)),r&&(u.uv1=Tn.getInterpolatedAttribute(r,o,c,l,h,new vt)),a&&(u.normal=Tn.getInterpolatedAttribute(a,o,c,l,h,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new B,materialIndex:0};Tn.getNormal(Or,Fr,Br,d.normal),u.face=d,u.barycoord=h}return u}class Wi extends se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(u,3)),this.setAttribute("uv",new Gt(h,2));function m(x,g,p,M,v,_,E,T,P,N,w){const A=_/P,I=E/N,G=_/2,j=E/2,q=T/2,y=P+1,b=N+1;let R=0,S=0;const z=new B;for(let O=0;O<b;O++){const C=O*I-j;for(let U=0;U<y;U++){const Y=U*A-G;z[x]=Y*M,z[g]=C*v,z[p]=q,l.push(z.x,z.y,z.z),z[x]=0,z[g]=0,z[p]=T>0?1:-1,u.push(z.x,z.y,z.z),h.push(U/P),h.push(1-O/N),R+=1}}for(let O=0;O<N;O++)for(let C=0;C<P;C++){const U=d+C+y*O,Y=d+C+y*(O+1),k=d+(C+1)+y*(O+1),W=d+(C+1)+y*O;c.push(U,Y,W),c.push(Y,k,W),S+=6}o.addGroup(f,S,w),f+=S,d+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ps(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ke(i){const t={};for(let e=0;e<i.length;e++){const n=Ps(i[e]);for(const s in n)t[s]=n[s]}return t}function Yp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Pf(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Kp={clone:Ps,merge:Ke};var qp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zn extends Cn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qp,this.fragmentShader=Zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ps(t.uniforms),this.uniformsGroups=Yp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lf extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Jn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new B,au=new vt,ou=new vt;class qe extends Lf{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(rr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,au,ou),e.subVectors(ou,au)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(rr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const rs=-90,as=1;class $p extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qe(rs,as,t,e);s.layers=this.layers,this.add(s);const r=new qe(rs,as,t,e);r.layers=this.layers,this.add(r);const a=new qe(rs,as,t,e);a.layers=this.layers,this.add(a);const o=new qe(rs,as,t,e);o.layers=this.layers,this.add(o);const c=new qe(rs,as,t,e);c.layers=this.layers,this.add(c);const l=new qe(rs,as,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class If extends De{constructor(t,e,n,s,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Es,super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Jp extends Vi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new If(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Oe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Wi(5,5,5),r=new zn({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:Ai});r.uniforms.tEquirect.value=e;const a=new te(s,r),o=e.minFilter;return e.minFilter===dn&&(e.minFilter=Oe),new $p(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const oo=new B,Qp=new B,tm=new jt;class vi{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=oo.subVectors(n,e).cross(Qp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(oo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||tm.getNormalMatrix(t),s=this.coplanarPoint(oo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new on,Wr=new B;class Mr{constructor(t=new vi,e=new vi,n=new vi,s=new vi,r=new vi,a=new vi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Jn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],m=s[9],x=s[10],g=s[11],p=s[12],M=s[13],v=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,g-f,_-p).normalize(),n[1].setComponents(c+r,d+l,g+f,_+p).normalize(),n[2].setComponents(c+a,d+u,g+m,_+M).normalize(),n[3].setComponents(c-a,d-u,g-m,_-M).normalize(),n[4].setComponents(c-o,d-h,g-x,_-v).normalize(),e===Jn)n[5].setComponents(c+o,d+h,g+x,_+v).normalize();else if(e===Ea)n[5].setComponents(o,h,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(t){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(t.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Wr.x=s.normal.x>0?t.max.x:t.min.x,Wr.y=s.normal.y>0?t.max.y:t.min.y,Wr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Df(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function em(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],x=h[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class ai extends se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=t/o,d=e/c,f=[],m=[],x=[],g=[];for(let p=0;p<u;p++){const M=p*d-a;for(let v=0;v<l;v++){const _=v*h-r;m.push(_,-M,0),x.push(0,0,1),g.push(v/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const v=M+l*p,_=M+l*(p+1),E=M+1+l*(p+1),T=M+1+l*p;f.push(v,_,T),f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(x,3)),this.setAttribute("uv",new Gt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.width,t.height,t.widthSegments,t.heightSegments)}}var nm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,im=`#ifdef USE_ALPHAHASH
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
#endif`,sm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,am=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,om=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cm=`#ifdef USE_AOMAP
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
#endif`,lm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,um=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
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
#endif`,hm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mm=`#ifdef USE_IRIDESCENCE
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
#endif`,gm=`#ifdef USE_BUMPMAP
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
#endif`,xm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
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
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Em=`#define PI 3.141592653589793
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
} // validated`,Tm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wm=`vec3 transformedNormal = objectNormal;
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
#endif`,Rm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Im="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nm=`#ifdef USE_ENVMAP
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
#endif`,Um=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zm=`#ifdef USE_ENVMAP
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
#endif`,km=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
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
#endif`,Fm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vm=`#ifdef USE_GRADIENTMAP
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
}`,Wm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ym=`uniform bool receiveShadow;
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
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,qm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$m=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qm=`PhysicalMaterial material;
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
#endif`,t0=`struct PhysicalMaterial {
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
}`,e0=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,n0=`#if defined( RE_IndirectDiffuse )
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
#endif`,i0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,s0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,r0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,a0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,c0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,u0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,h0=`#if defined( USE_POINTS_UV )
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
#endif`,f0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,d0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,p0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,m0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,g0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`#ifdef USE_MORPHTARGETS
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
#endif`,_0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,y0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,M0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,A0=`#ifdef USE_NORMALMAP
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
#endif`,E0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,w0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,R0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,P0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
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
}`,L0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,D0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,N0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,z0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
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
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,O0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,F0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,H0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G0=`#ifdef USE_SKINNING
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
#endif`,V0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,W0=`#ifdef USE_SKINNING
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
#endif`,X0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Y0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K0=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,q0=`#ifdef USE_TRANSMISSION
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
#endif`,Z0=`#ifdef USE_TRANSMISSION
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
#endif`,$0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ng=`uniform sampler2D t2D;
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
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ag=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`#include <common>
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
}`,cg=`#if DEPTH_PACKING == 3200
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
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lg=`#define DISTANCE
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
}`,ug=`#define DISTANCE
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
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`uniform float scale;
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
}`,pg=`uniform vec3 diffuse;
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
}`,mg=`#include <common>
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
}`,gg=`uniform vec3 diffuse;
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
}`,xg=`#define LAMBERT
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
}`,_g=`#define LAMBERT
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
}`,vg=`#define MATCAP
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
}`,yg=`#define MATCAP
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
}`,Mg=`#define NORMAL
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
}`,bg=`#define NORMAL
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
}`,Sg=`#define PHONG
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
}`,Ag=`#define PHONG
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
}`,Eg=`#define STANDARD
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
}`,Tg=`#define STANDARD
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
}`,wg=`#define TOON
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
}`,Rg=`#define TOON
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
}`,Cg=`uniform float size;
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
}`,Pg=`uniform vec3 diffuse;
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
}`,Lg=`#include <common>
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
}`,Ig=`uniform vec3 color;
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
}`,Dg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,Ng=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:nm,alphahash_pars_fragment:im,alphamap_fragment:sm,alphamap_pars_fragment:rm,alphatest_fragment:am,alphatest_pars_fragment:om,aomap_fragment:cm,aomap_pars_fragment:lm,batching_pars_vertex:um,batching_vertex:hm,begin_vertex:fm,beginnormal_vertex:dm,bsdfs:pm,iridescence_fragment:mm,bumpmap_pars_fragment:gm,clipping_planes_fragment:xm,clipping_planes_pars_fragment:_m,clipping_planes_pars_vertex:vm,clipping_planes_vertex:ym,color_fragment:Mm,color_pars_fragment:bm,color_pars_vertex:Sm,color_vertex:Am,common:Em,cube_uv_reflection_fragment:Tm,defaultnormal_vertex:wm,displacementmap_pars_vertex:Rm,displacementmap_vertex:Cm,emissivemap_fragment:Pm,emissivemap_pars_fragment:Lm,colorspace_fragment:Im,colorspace_pars_fragment:Dm,envmap_fragment:Nm,envmap_common_pars_fragment:Um,envmap_pars_fragment:zm,envmap_pars_vertex:km,envmap_physical_pars_fragment:Km,envmap_vertex:Om,fog_vertex:Fm,fog_pars_vertex:Bm,fog_fragment:Hm,fog_pars_fragment:Gm,gradientmap_pars_fragment:Vm,lightmap_pars_fragment:Wm,lights_lambert_fragment:Xm,lights_lambert_pars_fragment:jm,lights_pars_begin:Ym,lights_toon_fragment:qm,lights_toon_pars_fragment:Zm,lights_phong_fragment:$m,lights_phong_pars_fragment:Jm,lights_physical_fragment:Qm,lights_physical_pars_fragment:t0,lights_fragment_begin:e0,lights_fragment_maps:n0,lights_fragment_end:i0,logdepthbuf_fragment:s0,logdepthbuf_pars_fragment:r0,logdepthbuf_pars_vertex:a0,logdepthbuf_vertex:o0,map_fragment:c0,map_pars_fragment:l0,map_particle_fragment:u0,map_particle_pars_fragment:h0,metalnessmap_fragment:f0,metalnessmap_pars_fragment:d0,morphinstance_vertex:p0,morphcolor_vertex:m0,morphnormal_vertex:g0,morphtarget_pars_vertex:x0,morphtarget_vertex:_0,normal_fragment_begin:v0,normal_fragment_maps:y0,normal_pars_fragment:M0,normal_pars_vertex:b0,normal_vertex:S0,normalmap_pars_fragment:A0,clearcoat_normal_fragment_begin:E0,clearcoat_normal_fragment_maps:T0,clearcoat_pars_fragment:w0,iridescence_pars_fragment:R0,opaque_fragment:C0,packing:P0,premultiplied_alpha_fragment:L0,project_vertex:I0,dithering_fragment:D0,dithering_pars_fragment:N0,roughnessmap_fragment:U0,roughnessmap_pars_fragment:z0,shadowmap_pars_fragment:k0,shadowmap_pars_vertex:O0,shadowmap_vertex:F0,shadowmask_pars_fragment:B0,skinbase_vertex:H0,skinning_pars_vertex:G0,skinning_vertex:V0,skinnormal_vertex:W0,specularmap_fragment:X0,specularmap_pars_fragment:j0,tonemapping_fragment:Y0,tonemapping_pars_fragment:K0,transmission_fragment:q0,transmission_pars_fragment:Z0,uv_pars_fragment:$0,uv_pars_vertex:J0,uv_vertex:Q0,worldpos_vertex:tg,background_vert:eg,background_frag:ng,backgroundCube_vert:ig,backgroundCube_frag:sg,cube_vert:rg,cube_frag:ag,depth_vert:og,depth_frag:cg,distanceRGBA_vert:lg,distanceRGBA_frag:ug,equirect_vert:hg,equirect_frag:fg,linedashed_vert:dg,linedashed_frag:pg,meshbasic_vert:mg,meshbasic_frag:gg,meshlambert_vert:xg,meshlambert_frag:_g,meshmatcap_vert:vg,meshmatcap_frag:yg,meshnormal_vert:Mg,meshnormal_frag:bg,meshphong_vert:Sg,meshphong_frag:Ag,meshphysical_vert:Eg,meshphysical_frag:Tg,meshtoon_vert:wg,meshtoon_frag:Rg,points_vert:Cg,points_frag:Pg,shadow_vert:Lg,shadow_frag:Ig,sprite_vert:Dg,sprite_frag:Ng},At={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},Nn={basic:{uniforms:Ke([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Ke([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Dt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Ke([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Ke([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Ke([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new Dt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Ke([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Ke([At.points,At.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Ke([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Ke([At.common,At.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Ke([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Ke([At.sprite,At.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:Ke([At.common,At.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:Ke([At.lights,At.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Nn.physical={uniforms:Ke([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const Xr={r:0,b:0,g:0},Ni=new tn,Ug=new Ht;function zg(i,t,e,n,s,r,a){const o=new Dt(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function m(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function x(M){let v=!1;const _=m(M);_===null?p(o,c):_&&_.isColor&&(p(_,1),v=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,v){const _=m(v);_&&(_.isCubeTexture||_.mapping===Pa)?(u===void 0&&(u=new te(new Wi(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Ps(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ni.copy(v.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ug.makeRotationFromEuler(Ni)),u.material.toneMapped=Jt.getTransfer(_.colorSpace)!==de,(h!==_||d!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new te(new ai(2,2),new zn({name:"BackgroundMaterial",uniforms:Ps(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(_.colorSpace)!==de,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(Xr,Pf(i)),n.buffers.color.setClear(Xr.r,Xr.g,Xr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(o,c)},render:x,addToRenderList:g}}function kg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(A,I,G,j,q){let y=!1;const b=h(j,G,I);r!==b&&(r=b,l(r.object)),y=f(A,j,G,q),y&&m(A,j,G,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(y||a)&&(a=!1,_(A,I,G,j),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function u(A){return i.deleteVertexArray(A)}function h(A,I,G){const j=G.wireframe===!0;let q=n[A.id];q===void 0&&(q={},n[A.id]=q);let y=q[I.id];y===void 0&&(y={},q[I.id]=y);let b=y[j];return b===void 0&&(b=d(c()),y[j]=b),b}function d(A){const I=[],G=[],j=[];for(let q=0;q<e;q++)I[q]=0,G[q]=0,j[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:j,object:A,attributes:{},index:null}}function f(A,I,G,j){const q=r.attributes,y=I.attributes;let b=0;const R=G.getAttributes();for(const S in R)if(R[S].location>=0){const O=q[S];let C=y[S];if(C===void 0&&(S==="instanceMatrix"&&A.instanceMatrix&&(C=A.instanceMatrix),S==="instanceColor"&&A.instanceColor&&(C=A.instanceColor)),O===void 0||O.attribute!==C||C&&O.data!==C.data)return!0;b++}return r.attributesNum!==b||r.index!==j}function m(A,I,G,j){const q={},y=I.attributes;let b=0;const R=G.getAttributes();for(const S in R)if(R[S].location>=0){let O=y[S];O===void 0&&(S==="instanceMatrix"&&A.instanceMatrix&&(O=A.instanceMatrix),S==="instanceColor"&&A.instanceColor&&(O=A.instanceColor));const C={};C.attribute=O,O&&O.data&&(C.data=O.data),q[S]=C,b++}r.attributes=q,r.attributesNum=b,r.index=j}function x(){const A=r.newAttributes;for(let I=0,G=A.length;I<G;I++)A[I]=0}function g(A){p(A,0)}function p(A,I){const G=r.newAttributes,j=r.enabledAttributes,q=r.attributeDivisors;G[A]=1,j[A]===0&&(i.enableVertexAttribArray(A),j[A]=1),q[A]!==I&&(i.vertexAttribDivisor(A,I),q[A]=I)}function M(){const A=r.newAttributes,I=r.enabledAttributes;for(let G=0,j=I.length;G<j;G++)I[G]!==A[G]&&(i.disableVertexAttribArray(G),I[G]=0)}function v(A,I,G,j,q,y,b){b===!0?i.vertexAttribIPointer(A,I,G,q,y):i.vertexAttribPointer(A,I,G,j,q,y)}function _(A,I,G,j){x();const q=j.attributes,y=G.getAttributes(),b=I.defaultAttributeValues;for(const R in y){const S=y[R];if(S.location>=0){let z=q[R];if(z===void 0&&(R==="instanceMatrix"&&A.instanceMatrix&&(z=A.instanceMatrix),R==="instanceColor"&&A.instanceColor&&(z=A.instanceColor)),z!==void 0){const O=z.normalized,C=z.itemSize,U=t.get(z);if(U===void 0)continue;const Y=U.buffer,k=U.type,W=U.bytesPerElement,tt=k===i.INT||k===i.UNSIGNED_INT||z.gpuType===Vc;if(z.isInterleavedBufferAttribute){const H=z.data,K=H.stride,nt=z.offset;if(H.isInstancedInterleavedBuffer){for(let pt=0;pt<S.locationSize;pt++)p(S.location+pt,H.meshPerAttribute);A.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let pt=0;pt<S.locationSize;pt++)g(S.location+pt);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let pt=0;pt<S.locationSize;pt++)v(S.location+pt,C/S.locationSize,k,O,K*W,(nt+C/S.locationSize*pt)*W,tt)}else{if(z.isInstancedBufferAttribute){for(let H=0;H<S.locationSize;H++)p(S.location+H,z.meshPerAttribute);A.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let H=0;H<S.locationSize;H++)g(S.location+H);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let H=0;H<S.locationSize;H++)v(S.location+H,C/S.locationSize,k,O,C*W,C/S.locationSize*H*W,tt)}}else if(b!==void 0){const O=b[R];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(S.location,O);break;case 3:i.vertexAttrib3fv(S.location,O);break;case 4:i.vertexAttrib4fv(S.location,O);break;default:i.vertexAttrib1fv(S.location,O)}}}}M()}function E(){N();for(const A in n){const I=n[A];for(const G in I){const j=I[G];for(const q in j)u(j[q].object),delete j[q];delete I[G]}delete n[A]}}function T(A){if(n[A.id]===void 0)return;const I=n[A.id];for(const G in I){const j=I[G];for(const q in j)u(j[q].object),delete j[q];delete I[G]}delete n[A.id]}function P(A){for(const I in n){const G=n[I];if(G[A.id]===void 0)continue;const j=G[A.id];for(const q in j)u(j[q].object),delete j[q];delete G[A.id]}}function N(){w(),a=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:w,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function Og(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];e.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let m=0;for(let x=0;x<h;x++)m+=u[x]*d[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Fg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Be&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const N=P===Us&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==mn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==pn&&!N)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:E,maxSamples:T}}function Bg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new vi,o=new jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{const M=r?0:n,v=M*4;let _=p.clippingState||null;c.value=_,_=u(m,d,v,f);for(let E=0;E!==v;++E)_[E]=e[E];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,m){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=c.value,m!==!0||g===null){const p=f+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,_=f;v!==x;++v,_+=4)a.copy(h[v]).applyMatrix4(M,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function Hg(i){let t=new WeakMap;function e(a,o){return o===$o?a.mapping=Es:o===Jo&&(a.mapping=Ts),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===$o||o===Jo)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Jp(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class nl extends Lf{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ms=4,cu=[.125,.215,.35,.446,.526,.582],Hi=20,co=new nl,lu=new Dt;let lo=null,uo=0,ho=0,fo=!1;const Fi=(1+Math.sqrt(5))/2,os=1/Fi,uu=[new B(-Fi,os,0),new B(Fi,os,0),new B(-os,0,Fi),new B(os,0,Fi),new B(0,Fi,-os),new B(0,Fi,os),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class hu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){lo=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=du(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(lo,uo,ho),this._renderer.xr.enabled=fo,t.scissorTest=!1,jr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Es||t.mapping===Ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),lo=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:Us,format:Be,colorSpace:Qe,depthBuffer:!1},s=fu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gg(r)),this._blurMaterial=Vg(r,t,e)}return s}_compileMaterial(t){const e=new te(this._lodPlanes[0],t);this._renderer.compile(e,co)}_sceneToCubeUV(t,e,n,s){const o=new qe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(lu),u.toneMapping=Ei,u.autoClear=!1;const f=new $e({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),m=new te(new Wi,f);let x=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,x=!0):(f.color.copy(lu),x=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):M===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const v=this._cubeSize;jr(s,M*v,p>2?v:0,v,v),u.setRenderTarget(s),x&&u.render(m,o),u.render(t,o)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Es||t.mapping===Ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=du());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new te(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;jr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,co)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=uu[(s-r-1)%uu.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new te(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Hi-1),x=r/m,g=isFinite(r)?1+Math.floor(u*x):Hi;g>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Hi}`);const p=[];let M=0;for(let P=0;P<Hi;++P){const N=P/x,w=Math.exp(-N*N/2);p.push(w),P===0?M+=w:P<g&&(M+=2*w)}for(let P=0;P<p.length;P++)p[P]=p[P]/M;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;const _=this._sizeLods[s],E=3*_*(s>v-ms?s-v+ms:0),T=4*(this._cubeSize-_);jr(e,E,T,3*_,2*_),c.setRenderTarget(e),c.render(h,co)}}function Gg(i){const t=[],e=[],n=[];let s=i;const r=i-ms+1+cu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-ms?c=cu[a-i+ms-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,x=3,g=2,p=1,M=new Float32Array(x*m*f),v=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let T=0;T<f;T++){const P=T%3*2/3-1,N=T>2?0:-1,w=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];M.set(w,x*m*T),v.set(d,g*m*T);const A=[T,T,T,T,T,T];_.set(A,p*m*T)}const E=new se;E.setAttribute("position",new me(M,x)),E.setAttribute("uv",new me(v,g)),E.setAttribute("faceIndex",new me(_,p)),t.push(E),s>ms&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fu(i,t,e){const n=new Vi(i,t,e);return n.texture.mapping=Pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Vg(i,t,e){const n=new Float32Array(Hi),s=new B(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:il(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function du(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:il(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function pu(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function il(){return`

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
	`}function Wg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===$o||c===Jo,u=c===Es||c===Ts;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new hu(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new hu(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Xg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&nr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function jg(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const x=d.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)t.remove(x[g])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const m in d)t.update(d[m],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const m in f){const x=f[m];for(let g=0,p=x.length;g<p;g++)t.update(x[g],i.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,m=h.attributes.position;let x=0;if(f!==null){const M=f.array;x=f.version;for(let v=0,_=M.length;v<_;v+=3){const E=M[v+0],T=M[v+1],P=M[v+2];d.push(E,T,T,P,P,E)}}else if(m!==void 0){const M=m.array;x=m.version;for(let v=0,_=M.length/3-1;v<_;v+=3){const E=v+0,T=v+1,P=v+2;d.push(E,T,T,P,P,E)}}else return;const g=new(Af(d)?Cf:Rf)(d,1);g.version=x;const p=r.get(h);p&&t.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Yg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),e.update(f,n,m))}function u(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function h(d,f,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,m);let p=0;for(let M=0;M<m;M++)p+=f[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Kg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function qg(i,t,e){const n=new WeakMap,s=new Qt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let A=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",A)};var f=A;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),x===!0&&(_=2),g===!0&&(_=3);let E=o.attributes.position.count*_,T=1;E>t.maxTextureSize&&(T=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const P=new Float32Array(E*T*4*h),N=new Tf(P,E,T,h);N.type=pn,N.needsUpdate=!0;const w=_*4;for(let I=0;I<h;I++){const G=p[I],j=M[I],q=v[I],y=E*T*4*I;for(let b=0;b<G.count;b++){const R=b*w;m===!0&&(s.fromBufferAttribute(G,b),P[y+R+0]=s.x,P[y+R+1]=s.y,P[y+R+2]=s.z,P[y+R+3]=0),x===!0&&(s.fromBufferAttribute(j,b),P[y+R+4]=s.x,P[y+R+5]=s.y,P[y+R+6]=s.z,P[y+R+7]=0),g===!0&&(s.fromBufferAttribute(q,b),P[y+R+8]=s.x,P[y+R+9]=s.y,P[y+R+10]=s.z,P[y+R+11]=q.itemSize===4?s.w:1)}}d={count:h,texture:N,size:new vt(E,T)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Zg(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Nf extends De{constructor(t,e,n,s,r,a,o,c,l,u=vs){if(u!==vs&&u!==Rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===vs&&(n=Gi),n===void 0&&u===Rs&&(n=ws),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:He,this.minFilter=c!==void 0?c:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Uf=new De,mu=new Nf(1,1),zf=new Tf,kf=new Dp,Of=new If,gu=[],xu=[],_u=new Float32Array(16),vu=new Float32Array(9),yu=new Float32Array(4);function ks(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=gu[s];if(r===void 0&&(r=new Float32Array(s),gu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ue(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ia(i,t){let e=xu[t];e===void 0&&(e=new Int32Array(t),xu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function $g(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Jg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Ue(e,t)}}function Qg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Ue(e,t)}}function tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Ue(e,t)}}function ex(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;yu.set(n),i.uniformMatrix2fv(this.addr,!1,yu),Ue(e,n)}}function nx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;vu.set(n),i.uniformMatrix3fv(this.addr,!1,vu),Ue(e,n)}}function ix(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;_u.set(n),i.uniformMatrix4fv(this.addr,!1,_u),Ue(e,n)}}function sx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function rx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Ue(e,t)}}function ax(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Ue(e,t)}}function ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Ue(e,t)}}function cx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function lx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Ue(e,t)}}function ux(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Ue(e,t)}}function hx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Ue(e,t)}}function fx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mu.compareFunction=Sf,r=mu):r=Uf,e.setTexture2D(t||r,s)}function dx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||kf,s)}function px(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Of,s)}function mx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||zf,s)}function gx(i){switch(i){case 5126:return $g;case 35664:return Jg;case 35665:return Qg;case 35666:return tx;case 35674:return ex;case 35675:return nx;case 35676:return ix;case 5124:case 35670:return sx;case 35667:case 35671:return rx;case 35668:case 35672:return ax;case 35669:case 35673:return ox;case 5125:return cx;case 36294:return lx;case 36295:return ux;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return fx;case 35679:case 36299:case 36307:return dx;case 35680:case 36300:case 36308:case 36293:return px;case 36289:case 36303:case 36311:case 36292:return mx}}function xx(i,t){i.uniform1fv(this.addr,t)}function _x(i,t){const e=ks(t,this.size,2);i.uniform2fv(this.addr,e)}function vx(i,t){const e=ks(t,this.size,3);i.uniform3fv(this.addr,e)}function yx(i,t){const e=ks(t,this.size,4);i.uniform4fv(this.addr,e)}function Mx(i,t){const e=ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function bx(i,t){const e=ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Sx(i,t){const e=ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ax(i,t){i.uniform1iv(this.addr,t)}function Ex(i,t){i.uniform2iv(this.addr,t)}function Tx(i,t){i.uniform3iv(this.addr,t)}function wx(i,t){i.uniform4iv(this.addr,t)}function Rx(i,t){i.uniform1uiv(this.addr,t)}function Cx(i,t){i.uniform2uiv(this.addr,t)}function Px(i,t){i.uniform3uiv(this.addr,t)}function Lx(i,t){i.uniform4uiv(this.addr,t)}function Ix(i,t,e){const n=this.cache,s=t.length,r=Ia(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Uf,r[a])}function Dx(i,t,e){const n=this.cache,s=t.length,r=Ia(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||kf,r[a])}function Nx(i,t,e){const n=this.cache,s=t.length,r=Ia(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Of,r[a])}function Ux(i,t,e){const n=this.cache,s=t.length,r=Ia(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||zf,r[a])}function zx(i){switch(i){case 5126:return xx;case 35664:return _x;case 35665:return vx;case 35666:return yx;case 35674:return Mx;case 35675:return bx;case 35676:return Sx;case 5124:case 35670:return Ax;case 35667:case 35671:return Ex;case 35668:case 35672:return Tx;case 35669:case 35673:return wx;case 5125:return Rx;case 36294:return Cx;case 36295:return Px;case 36296:return Lx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ix;case 35679:case 36299:case 36307:return Dx;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Ux}}class kx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gx(e.type)}}class Ox{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zx(e.type)}}class Fx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function Mu(i,t){i.seq.push(t),i.map[t.id]=t}function Bx(i,t,e){const n=i.name,s=n.length;for(po.lastIndex=0;;){const r=po.exec(n),a=po.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Mu(e,l===void 0?new kx(o,i,t):new Ox(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new Fx(o),Mu(e,h)),e=h}}}class ba{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Bx(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function bu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Hx=37297;let Gx=0;function Vx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Su=new jt;function Wx(i){Jt._getMatrix(Su,Jt.workingColorSpace,i);const t=`mat3( ${Su.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case La:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Au(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Vx(i.getShaderSource(t),a)}else return s}function Xx(i,t){const e=Wx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function jx(i,t){let e;switch(t){case Vd:e="Linear";break;case Wd:e="Reinhard";break;case Xd:e="Cineon";break;case uf:e="ACESFilmic";break;case Yd:e="AgX";break;case Kd:e="Neutral";break;case jd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Yr=new B;function Yx(){Jt.getLuminanceCoefficients(Yr);const i=Yr.x.toFixed(4),t=Yr.y.toFixed(4),e=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function qx(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ir(i){return i!==""}function Eu(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const $x=/^[ \t]*#include +<([\w\d./]+)>/gm;function wc(i){return i.replace($x,Qx)}const Jx=new Map;function Qx(i,t){let e=qt[t];if(e===void 0){const n=Jx.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wc(e)}const t_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wu(i){return i.replace(t_,e_)}function e_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ru(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function n_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Hc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===lf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function i_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Es:case Ts:t="ENVMAP_TYPE_CUBE";break;case Pa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function s_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ts:t="ENVMAP_MODE_REFRACTION";break}return t}function r_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Gc:t="ENVMAP_BLENDING_MULTIPLY";break;case Hd:t="ENVMAP_BLENDING_MIX";break;case Gd:t="ENVMAP_BLENDING_ADD";break}return t}function a_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function o_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=n_(e),l=i_(e),u=s_(e),h=r_(e),d=a_(e),f=Kx(e),m=qx(r),x=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ir).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ir).join(`
`),p.length>0&&(p+=`
`)):(g=[Ru(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),p=[Ru(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ei?"#define TONE_MAPPING":"",e.toneMapping!==Ei?qt.tonemapping_pars_fragment:"",e.toneMapping!==Ei?jx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Xx("linearToOutputTexel",e.outputColorSpace),Yx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ir).join(`
`)),a=wc(a),a=Eu(a,e),a=Tu(a,e),o=wc(o),o=Eu(o,e),o=Tu(o,e),a=wu(a),o=wu(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=M+g+a,_=M+p+o,E=bu(s,s.VERTEX_SHADER,v),T=bu(s,s.FRAGMENT_SHADER,_);s.attachShader(x,E),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(I){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(x).trim(),j=s.getShaderInfoLog(E).trim(),q=s.getShaderInfoLog(T).trim();let y=!0,b=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,E,T);else{const R=Au(s,E,"vertex"),S=Au(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+G+`
`+R+`
`+S)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(j===""||q==="")&&(b=!1);b&&(I.diagnostics={runnable:y,programLog:G,vertexShader:{log:j,prefix:g},fragmentShader:{log:q,prefix:p}})}s.deleteShader(E),s.deleteShader(T),N=new ba(s,x),w=Zx(s,x)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,Hx)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Gx++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=T,this}let c_=0;class l_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new u_(t),e.set(t,n)),n}}class u_{constructor(t){this.id=c_++,this.code=t,this.usedTimes=0}}function h_(i,t,e,n,s,r,a){const o=new el,c=new l_,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return l.add(w),w===0?"uv":`uv${w}`}function g(w,A,I,G,j){const q=G.fog,y=j.geometry,b=w.isMeshStandardMaterial?G.environment:null,R=(w.isMeshStandardMaterial?e:t).get(w.envMap||b),S=R&&R.mapping===Pa?R.image.height:null,z=m[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const O=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,C=O!==void 0?O.length:0;let U=0;y.morphAttributes.position!==void 0&&(U=1),y.morphAttributes.normal!==void 0&&(U=2),y.morphAttributes.color!==void 0&&(U=3);let Y,k,W,tt;if(z){const le=Nn[z];Y=le.vertexShader,k=le.fragmentShader}else Y=w.vertexShader,k=w.fragmentShader,c.update(w),W=c.getVertexShaderID(w),tt=c.getFragmentShaderID(w);const H=i.getRenderTarget(),K=i.state.buffers.depth.getReversed(),nt=j.isInstancedMesh===!0,pt=j.isBatchedMesh===!0,Pt=!!w.map,V=!!w.matcap,ct=!!R,X=!!w.aoMap,Ft=!!w.lightMap,bt=!!w.bumpMap,gt=!!w.normalMap,ft=!!w.displacementMap,It=!!w.emissiveMap,St=!!w.metalnessMap,F=!!w.roughnessMap,L=w.anisotropy>0,et=w.clearcoat>0,ot=w.dispersion>0,ht=w.iridescence>0,lt=w.sheen>0,Lt=w.transmission>0,yt=L&&!!w.anisotropyMap,st=et&&!!w.clearcoatMap,Tt=et&&!!w.clearcoatNormalMap,dt=et&&!!w.clearcoatRoughnessMap,xt=ht&&!!w.iridescenceMap,Nt=ht&&!!w.iridescenceThicknessMap,Ot=lt&&!!w.sheenColorMap,Et=lt&&!!w.sheenRoughnessMap,Zt=!!w.specularMap,Xt=!!w.specularColorMap,re=!!w.specularIntensityMap,Z=Lt&&!!w.transmissionMap,Mt=Lt&&!!w.thicknessMap,ut=!!w.gradientMap,mt=!!w.alphaMap,Ct=w.alphaTest>0,wt=!!w.alphaHash,Yt=!!w.extensions;let Te=Ei;w.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Te=i.toneMapping);const Ve={shaderID:z,shaderType:w.type,shaderName:w.name,vertexShader:Y,fragmentShader:k,defines:w.defines,customVertexShaderID:W,customFragmentShaderID:tt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:pt,batchingColor:pt&&j._colorsTexture!==null,instancing:nt,instancingColor:nt&&j.instanceColor!==null,instancingMorph:nt&&j.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:H===null?i.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Qe,alphaToCoverage:!!w.alphaToCoverage,map:Pt,matcap:V,envMap:ct,envMapMode:ct&&R.mapping,envMapCubeUVHeight:S,aoMap:X,lightMap:Ft,bumpMap:bt,normalMap:gt,displacementMap:d&&ft,emissiveMap:It,normalMapObjectSpace:gt&&w.normalMapType===ep,normalMapTangentSpace:gt&&w.normalMapType===Qc,metalnessMap:St,roughnessMap:F,anisotropy:L,anisotropyMap:yt,clearcoat:et,clearcoatMap:st,clearcoatNormalMap:Tt,clearcoatRoughnessMap:dt,dispersion:ot,iridescence:ht,iridescenceMap:xt,iridescenceThicknessMap:Nt,sheen:lt,sheenColorMap:Ot,sheenRoughnessMap:Et,specularMap:Zt,specularColorMap:Xt,specularIntensityMap:re,transmission:Lt,transmissionMap:Z,thicknessMap:Mt,gradientMap:ut,opaque:w.transparent===!1&&w.blending===_s&&w.alphaToCoverage===!1,alphaMap:mt,alphaTest:Ct,alphaHash:wt,combine:w.combine,mapUv:Pt&&x(w.map.channel),aoMapUv:X&&x(w.aoMap.channel),lightMapUv:Ft&&x(w.lightMap.channel),bumpMapUv:bt&&x(w.bumpMap.channel),normalMapUv:gt&&x(w.normalMap.channel),displacementMapUv:ft&&x(w.displacementMap.channel),emissiveMapUv:It&&x(w.emissiveMap.channel),metalnessMapUv:St&&x(w.metalnessMap.channel),roughnessMapUv:F&&x(w.roughnessMap.channel),anisotropyMapUv:yt&&x(w.anisotropyMap.channel),clearcoatMapUv:st&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:Tt&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:Et&&x(w.sheenRoughnessMap.channel),specularMapUv:Zt&&x(w.specularMap.channel),specularColorMapUv:Xt&&x(w.specularColorMap.channel),specularIntensityMapUv:re&&x(w.specularIntensityMap.channel),transmissionMapUv:Z&&x(w.transmissionMap.channel),thicknessMapUv:Mt&&x(w.thicknessMap.channel),alphaMapUv:mt&&x(w.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(gt||L),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!y.attributes.uv&&(Pt||mt),fog:!!q,useFog:w.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:K,skinning:j.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:C,morphTextureStride:U,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Te,decodeVideoTexture:Pt&&w.map.isVideoTexture===!0&&Jt.getTransfer(w.map.colorSpace)===de,decodeVideoTextureEmissive:It&&w.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(w.emissiveMap.colorSpace)===de,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ze,flipSided:w.side===Je,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Yt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&w.extensions.multiDraw===!0||pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ve.vertexUv1s=l.has(1),Ve.vertexUv2s=l.has(2),Ve.vertexUv3s=l.has(3),l.clear(),Ve}function p(w){const A=[];if(w.shaderID?A.push(w.shaderID):(A.push(w.customVertexShaderID),A.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)A.push(I),A.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(M(A,w),v(A,w),A.push(i.outputColorSpace)),A.push(w.customProgramCacheKey),A.join()}function M(w,A){w.push(A.precision),w.push(A.outputColorSpace),w.push(A.envMapMode),w.push(A.envMapCubeUVHeight),w.push(A.mapUv),w.push(A.alphaMapUv),w.push(A.lightMapUv),w.push(A.aoMapUv),w.push(A.bumpMapUv),w.push(A.normalMapUv),w.push(A.displacementMapUv),w.push(A.emissiveMapUv),w.push(A.metalnessMapUv),w.push(A.roughnessMapUv),w.push(A.anisotropyMapUv),w.push(A.clearcoatMapUv),w.push(A.clearcoatNormalMapUv),w.push(A.clearcoatRoughnessMapUv),w.push(A.iridescenceMapUv),w.push(A.iridescenceThicknessMapUv),w.push(A.sheenColorMapUv),w.push(A.sheenRoughnessMapUv),w.push(A.specularMapUv),w.push(A.specularColorMapUv),w.push(A.specularIntensityMapUv),w.push(A.transmissionMapUv),w.push(A.thicknessMapUv),w.push(A.combine),w.push(A.fogExp2),w.push(A.sizeAttenuation),w.push(A.morphTargetsCount),w.push(A.morphAttributeCount),w.push(A.numDirLights),w.push(A.numPointLights),w.push(A.numSpotLights),w.push(A.numSpotLightMaps),w.push(A.numHemiLights),w.push(A.numRectAreaLights),w.push(A.numDirLightShadows),w.push(A.numPointLightShadows),w.push(A.numSpotLightShadows),w.push(A.numSpotLightShadowsWithMaps),w.push(A.numLightProbes),w.push(A.shadowMapType),w.push(A.toneMapping),w.push(A.numClippingPlanes),w.push(A.numClipIntersection),w.push(A.depthPacking)}function v(w,A){o.disableAll(),A.supportsVertexTextures&&o.enable(0),A.instancing&&o.enable(1),A.instancingColor&&o.enable(2),A.instancingMorph&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),A.dispersion&&o.enable(20),A.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reverseDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),w.push(o.mask)}function _(w){const A=m[w.type];let I;if(A){const G=Nn[A];I=Kp.clone(G.uniforms)}else I=w.uniforms;return I}function E(w,A){let I;for(let G=0,j=u.length;G<j;G++){const q=u[G];if(q.cacheKey===A){I=q,++I.usedTimes;break}}return I===void 0&&(I=new o_(i,A,w,r),u.push(I)),I}function T(w){if(--w.usedTimes===0){const A=u.indexOf(w);u[A]=u[u.length-1],u.pop(),w.destroy()}}function P(w){c.remove(w)}function N(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:E,releaseProgram:T,releaseShaderCache:P,programs:u,dispose:N}}function f_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function d_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Cu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Pu(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,f,m,x,g){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:x,group:g},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=x,p.group=g),t++,p}function o(h,d,f,m,x,g){const p=a(h,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(h,d,f,m,x,g){const p=a(h,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||d_),n.length>1&&n.sort(d||Cu),s.length>1&&s.sort(d||Cu)}function u(){for(let h=t,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function p_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Pu,i.set(n,[a])):s>=r.length?(a=new Pu,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function m_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Dt};break;case"SpotLight":e={position:new B,direction:new B,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function g_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let x_=0;function __(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function v_(i){const t=new m_,e=g_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const s=new B,r=new Ht,a=new Ht;function o(l){let u=0,h=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,M=0,v=0,_=0,E=0,T=0,P=0;l.sort(__);for(let w=0,A=l.length;w<A;w++){const I=l[w],G=I.color,j=I.intensity,q=I.distance,y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=G.r*j,h+=G.g*j,d+=G.b*j;else if(I.isLightProbe){for(let b=0;b<9;b++)n.probe[b].addScaledVector(I.sh.coefficients[b],j);P++}else if(I.isDirectionalLight){const b=t.get(I);if(b.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const R=I.shadow,S=e.get(I);S.shadowIntensity=R.intensity,S.shadowBias=R.bias,S.shadowNormalBias=R.normalBias,S.shadowRadius=R.radius,S.shadowMapSize=R.mapSize,n.directionalShadow[f]=S,n.directionalShadowMap[f]=y,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=b,f++}else if(I.isSpotLight){const b=t.get(I);b.position.setFromMatrixPosition(I.matrixWorld),b.color.copy(G).multiplyScalar(j),b.distance=q,b.coneCos=Math.cos(I.angle),b.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),b.decay=I.decay,n.spot[x]=b;const R=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,R.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[x]=R.matrix,I.castShadow){const S=e.get(I);S.shadowIntensity=R.intensity,S.shadowBias=R.bias,S.shadowNormalBias=R.normalBias,S.shadowRadius=R.radius,S.shadowMapSize=R.mapSize,n.spotShadow[x]=S,n.spotShadowMap[x]=y,_++}x++}else if(I.isRectAreaLight){const b=t.get(I);b.color.copy(G).multiplyScalar(j),b.halfWidth.set(I.width*.5,0,0),b.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=b,g++}else if(I.isPointLight){const b=t.get(I);if(b.color.copy(I.color).multiplyScalar(I.intensity),b.distance=I.distance,b.decay=I.decay,I.castShadow){const R=I.shadow,S=e.get(I);S.shadowIntensity=R.intensity,S.shadowBias=R.bias,S.shadowNormalBias=R.normalBias,S.shadowRadius=R.radius,S.shadowMapSize=R.mapSize,S.shadowCameraNear=R.camera.near,S.shadowCameraFar=R.camera.far,n.pointShadow[m]=S,n.pointShadowMap[m]=y,n.pointShadowMatrix[m]=I.shadow.matrix,v++}n.point[m]=b,m++}else if(I.isHemisphereLight){const b=t.get(I);b.skyColor.copy(I.color).multiplyScalar(j),b.groundColor.copy(I.groundColor).multiplyScalar(j),n.hemi[p]=b,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==f||N.pointLength!==m||N.spotLength!==x||N.rectAreaLength!==g||N.hemiLength!==p||N.numDirectionalShadows!==M||N.numPointShadows!==v||N.numSpotShadows!==_||N.numSpotMaps!==E||N.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,N.directionalLength=f,N.pointLength=m,N.spotLength=x,N.rectAreaLength=g,N.hemiLength=p,N.numDirectionalShadows=M,N.numPointShadows=v,N.numSpotShadows=_,N.numSpotMaps=E,N.numLightProbes=P,n.version=x_++)}function c(l,u){let h=0,d=0,f=0,m=0,x=0;const g=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const v=l[p];if(v.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),h++}else if(v.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(v.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(v.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(g),x++}}}return{setup:o,setupView:c,state:n}}function Lu(i){const t=new v_(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function y_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Lu(i),t.set(s,[o])):r>=a.length?(o=new Lu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class sl extends Cn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class M_ extends Cn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const b_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,S_=`uniform sampler2D shadow_pass;
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
}`;function A_(i,t,e){let n=new Mr;const s=new vt,r=new vt,a=new Qt,o=new sl({depthPacking:Jc}),c=new M_,l={},u=e.maxTextureSize,h={[ii]:Je,[Je]:ii,[Ze]:Ze},d=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:b_,fragmentShader:S_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new se;m.setAttribute("position",new me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new te(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hc;let p=this.type;this.render=function(T,P,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),A=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Ai),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const j=p!==Zn&&this.type===Zn,q=p===Zn&&this.type!==Zn;for(let y=0,b=T.length;y<b;y++){const R=T[y],S=R.shadow;if(S===void 0){console.warn("THREE.WebGLShadowMap:",R,"has no shadow.");continue}if(S.autoUpdate===!1&&S.needsUpdate===!1)continue;s.copy(S.mapSize);const z=S.getFrameExtents();if(s.multiply(z),r.copy(S.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/z.x),s.x=r.x*z.x,S.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/z.y),s.y=r.y*z.y,S.mapSize.y=r.y)),S.map===null||j===!0||q===!0){const C=this.type!==Zn?{minFilter:He,magFilter:He}:{};S.map!==null&&S.map.dispose(),S.map=new Vi(s.x,s.y,C),S.map.texture.name=R.name+".shadowMap",S.camera.updateProjectionMatrix()}i.setRenderTarget(S.map),i.clear();const O=S.getViewportCount();for(let C=0;C<O;C++){const U=S.getViewport(C);a.set(r.x*U.x,r.y*U.y,r.x*U.z,r.y*U.w),G.viewport(a),S.updateMatrices(R,C),n=S.getFrustum(),_(P,N,S.camera,R,this.type)}S.isPointLightShadow!==!0&&this.type===Zn&&M(S,N),S.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(w,A,I)};function M(T,P){const N=t.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Vi(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,N,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,N,f,x,null)}function v(T,P,N,w){let A=null;const I=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)A=I;else if(A=N.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const G=A.uuid,j=P.uuid;let q=l[G];q===void 0&&(q={},l[G]=q);let y=q[j];y===void 0&&(y=A.clone(),q[j]=y,P.addEventListener("dispose",E)),A=y}if(A.visible=P.visible,A.wireframe=P.wireframe,w===Zn?A.side=P.shadowSide!==null?P.shadowSide:P.side:A.side=P.shadowSide!==null?P.shadowSide:h[P.side],A.alphaMap=P.alphaMap,A.alphaTest=P.alphaTest,A.map=P.map,A.clipShadows=P.clipShadows,A.clippingPlanes=P.clippingPlanes,A.clipIntersection=P.clipIntersection,A.displacementMap=P.displacementMap,A.displacementScale=P.displacementScale,A.displacementBias=P.displacementBias,A.wireframeLinewidth=P.wireframeLinewidth,A.linewidth=P.linewidth,N.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const G=i.properties.get(A);G.light=N}return A}function _(T,P,N,w,A){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===Zn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const j=t.update(T),q=T.material;if(Array.isArray(q)){const y=j.groups;for(let b=0,R=y.length;b<R;b++){const S=y[b],z=q[S.materialIndex];if(z&&z.visible){const O=v(T,z,w,A);T.onBeforeShadow(i,T,P,N,j,O,S),i.renderBufferDirect(N,null,j,O,T,S),T.onAfterShadow(i,T,P,N,j,O,S)}}}else if(q.visible){const y=v(T,q,w,A);T.onBeforeShadow(i,T,P,N,j,y,null),i.renderBufferDirect(N,null,j,y,T,null),T.onAfterShadow(i,T,P,N,j,y,null)}}const G=T.children;for(let j=0,q=G.length;j<q;j++)_(G[j],P,N,w,A)}function E(T){T.target.removeEventListener("dispose",E);for(const N in l){const w=l[N],A=T.target.uuid;A in w&&(w[A].dispose(),delete w[A])}}}const E_={[Wo]:Xo,[jo]:qo,[Yo]:Zo,[As]:Ko,[Xo]:Wo,[qo]:jo,[Zo]:Yo,[Ko]:As};function T_(i,t){function e(){let Z=!1;const Mt=new Qt;let ut=null;const mt=new Qt(0,0,0,0);return{setMask:function(Ct){ut!==Ct&&!Z&&(i.colorMask(Ct,Ct,Ct,Ct),ut=Ct)},setLocked:function(Ct){Z=Ct},setClear:function(Ct,wt,Yt,Te,Ve){Ve===!0&&(Ct*=Te,wt*=Te,Yt*=Te),Mt.set(Ct,wt,Yt,Te),mt.equals(Mt)===!1&&(i.clearColor(Ct,wt,Yt,Te),mt.copy(Mt))},reset:function(){Z=!1,ut=null,mt.set(-1,0,0,0)}}}function n(){let Z=!1,Mt=!1,ut=null,mt=null,Ct=null;return{setReversed:function(wt){if(Mt!==wt){const Yt=t.get("EXT_clip_control");Mt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT);const Te=Ct;Ct=null,this.setClear(Te)}Mt=wt},getReversed:function(){return Mt},setTest:function(wt){wt?H(i.DEPTH_TEST):K(i.DEPTH_TEST)},setMask:function(wt){ut!==wt&&!Z&&(i.depthMask(wt),ut=wt)},setFunc:function(wt){if(Mt&&(wt=E_[wt]),mt!==wt){switch(wt){case Wo:i.depthFunc(i.NEVER);break;case Xo:i.depthFunc(i.ALWAYS);break;case jo:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case Yo:i.depthFunc(i.EQUAL);break;case Ko:i.depthFunc(i.GEQUAL);break;case qo:i.depthFunc(i.GREATER);break;case Zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=wt}},setLocked:function(wt){Z=wt},setClear:function(wt){Ct!==wt&&(Mt&&(wt=1-wt),i.clearDepth(wt),Ct=wt)},reset:function(){Z=!1,ut=null,mt=null,Ct=null,Mt=!1}}}function s(){let Z=!1,Mt=null,ut=null,mt=null,Ct=null,wt=null,Yt=null,Te=null,Ve=null;return{setTest:function(le){Z||(le?H(i.STENCIL_TEST):K(i.STENCIL_TEST))},setMask:function(le){Mt!==le&&!Z&&(i.stencilMask(le),Mt=le)},setFunc:function(le,gn,Bn){(ut!==le||mt!==gn||Ct!==Bn)&&(i.stencilFunc(le,gn,Bn),ut=le,mt=gn,Ct=Bn)},setOp:function(le,gn,Bn){(wt!==le||Yt!==gn||Te!==Bn)&&(i.stencilOp(le,gn,Bn),wt=le,Yt=gn,Te=Bn)},setLocked:function(le){Z=le},setClear:function(le){Ve!==le&&(i.clearStencil(le),Ve=le)},reset:function(){Z=!1,Mt=null,ut=null,mt=null,Ct=null,wt=null,Yt=null,Te=null,Ve=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,M=null,v=null,_=null,E=null,T=null,P=new Dt(0,0,0),N=0,w=!1,A=null,I=null,G=null,j=null,q=null;const y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let b=!1,R=0;const S=i.getParameter(i.VERSION);S.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(S)[1]),b=R>=1):S.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(S)[1]),b=R>=2);let z=null,O={};const C=i.getParameter(i.SCISSOR_BOX),U=i.getParameter(i.VIEWPORT),Y=new Qt().fromArray(C),k=new Qt().fromArray(U);function W(Z,Mt,ut,mt){const Ct=new Uint8Array(4),wt=i.createTexture();i.bindTexture(Z,wt),i.texParameteri(Z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Yt=0;Yt<ut;Yt++)Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?i.texImage3D(Mt,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,Ct):i.texImage2D(Mt+Yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ct);return wt}const tt={};tt[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),H(i.DEPTH_TEST),a.setFunc(As),bt(!1),gt(Nl),H(i.CULL_FACE),X(Ai);function H(Z){u[Z]!==!0&&(i.enable(Z),u[Z]=!0)}function K(Z){u[Z]!==!1&&(i.disable(Z),u[Z]=!1)}function nt(Z,Mt){return h[Z]!==Mt?(i.bindFramebuffer(Z,Mt),h[Z]=Mt,Z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Mt),Z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Mt),!0):!1}function pt(Z,Mt){let ut=f,mt=!1;if(Z){ut=d.get(Mt),ut===void 0&&(ut=[],d.set(Mt,ut));const Ct=Z.textures;if(ut.length!==Ct.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let wt=0,Yt=Ct.length;wt<Yt;wt++)ut[wt]=i.COLOR_ATTACHMENT0+wt;ut.length=Ct.length,mt=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,mt=!0);mt&&i.drawBuffers(ut)}function Pt(Z){return m!==Z?(i.useProgram(Z),m=Z,!0):!1}const V={[Bi]:i.FUNC_ADD,[Ad]:i.FUNC_SUBTRACT,[Ed]:i.FUNC_REVERSE_SUBTRACT};V[Td]=i.MIN,V[wd]=i.MAX;const ct={[Rd]:i.ZERO,[Cd]:i.ONE,[Pd]:i.SRC_COLOR,[Go]:i.SRC_ALPHA,[zd]:i.SRC_ALPHA_SATURATE,[Nd]:i.DST_COLOR,[Id]:i.DST_ALPHA,[Ld]:i.ONE_MINUS_SRC_COLOR,[Vo]:i.ONE_MINUS_SRC_ALPHA,[Ud]:i.ONE_MINUS_DST_COLOR,[Dd]:i.ONE_MINUS_DST_ALPHA,[kd]:i.CONSTANT_COLOR,[Od]:i.ONE_MINUS_CONSTANT_COLOR,[Fd]:i.CONSTANT_ALPHA,[Bd]:i.ONE_MINUS_CONSTANT_ALPHA};function X(Z,Mt,ut,mt,Ct,wt,Yt,Te,Ve,le){if(Z===Ai){x===!0&&(K(i.BLEND),x=!1);return}if(x===!1&&(H(i.BLEND),x=!0),Z!==Sd){if(Z!==g||le!==w){if((p!==Bi||_!==Bi)&&(i.blendEquation(i.FUNC_ADD),p=Bi,_=Bi),le)switch(Z){case _s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ul:i.blendFunc(i.ONE,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}else switch(Z){case _s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ul:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}M=null,v=null,E=null,T=null,P.set(0,0,0),N=0,g=Z,w=le}return}Ct=Ct||Mt,wt=wt||ut,Yt=Yt||mt,(Mt!==p||Ct!==_)&&(i.blendEquationSeparate(V[Mt],V[Ct]),p=Mt,_=Ct),(ut!==M||mt!==v||wt!==E||Yt!==T)&&(i.blendFuncSeparate(ct[ut],ct[mt],ct[wt],ct[Yt]),M=ut,v=mt,E=wt,T=Yt),(Te.equals(P)===!1||Ve!==N)&&(i.blendColor(Te.r,Te.g,Te.b,Ve),P.copy(Te),N=Ve),g=Z,w=!1}function Ft(Z,Mt){Z.side===Ze?K(i.CULL_FACE):H(i.CULL_FACE);let ut=Z.side===Je;Mt&&(ut=!ut),bt(ut),Z.blending===_s&&Z.transparent===!1?X(Ai):X(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),a.setFunc(Z.depthFunc),a.setTest(Z.depthTest),a.setMask(Z.depthWrite),r.setMask(Z.colorWrite);const mt=Z.stencilWrite;o.setTest(mt),mt&&(o.setMask(Z.stencilWriteMask),o.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),o.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),It(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?H(i.SAMPLE_ALPHA_TO_COVERAGE):K(i.SAMPLE_ALPHA_TO_COVERAGE)}function bt(Z){A!==Z&&(Z?i.frontFace(i.CW):i.frontFace(i.CCW),A=Z)}function gt(Z){Z!==Md?(H(i.CULL_FACE),Z!==I&&(Z===Nl?i.cullFace(i.BACK):Z===bd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):K(i.CULL_FACE),I=Z}function ft(Z){Z!==G&&(b&&i.lineWidth(Z),G=Z)}function It(Z,Mt,ut){Z?(H(i.POLYGON_OFFSET_FILL),(j!==Mt||q!==ut)&&(i.polygonOffset(Mt,ut),j=Mt,q=ut)):K(i.POLYGON_OFFSET_FILL)}function St(Z){Z?H(i.SCISSOR_TEST):K(i.SCISSOR_TEST)}function F(Z){Z===void 0&&(Z=i.TEXTURE0+y-1),z!==Z&&(i.activeTexture(Z),z=Z)}function L(Z,Mt,ut){ut===void 0&&(z===null?ut=i.TEXTURE0+y-1:ut=z);let mt=O[ut];mt===void 0&&(mt={type:void 0,texture:void 0},O[ut]=mt),(mt.type!==Z||mt.texture!==Mt)&&(z!==ut&&(i.activeTexture(ut),z=ut),i.bindTexture(Z,Mt||tt[Z]),mt.type=Z,mt.texture=Mt)}function et(){const Z=O[z];Z!==void 0&&Z.type!==void 0&&(i.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function ot(){try{i.compressedTexImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ht(){try{i.compressedTexImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function lt(){try{i.texSubImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Lt(){try{i.texSubImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function yt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function st(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Tt(){try{i.texStorage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function dt(){try{i.texStorage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function xt(){try{i.texImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Nt(){try{i.texImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Ot(Z){Y.equals(Z)===!1&&(i.scissor(Z.x,Z.y,Z.z,Z.w),Y.copy(Z))}function Et(Z){k.equals(Z)===!1&&(i.viewport(Z.x,Z.y,Z.z,Z.w),k.copy(Z))}function Zt(Z,Mt){let ut=l.get(Mt);ut===void 0&&(ut=new WeakMap,l.set(Mt,ut));let mt=ut.get(Z);mt===void 0&&(mt=i.getUniformBlockIndex(Mt,Z.name),ut.set(Z,mt))}function Xt(Z,Mt){const mt=l.get(Mt).get(Z);c.get(Mt)!==mt&&(i.uniformBlockBinding(Mt,mt,Z.__bindingPointIndex),c.set(Mt,mt))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},z=null,O={},h={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,M=null,v=null,_=null,E=null,T=null,P=new Dt(0,0,0),N=0,w=!1,A=null,I=null,G=null,j=null,q=null,Y.set(0,0,i.canvas.width,i.canvas.height),k.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:H,disable:K,bindFramebuffer:nt,drawBuffers:pt,useProgram:Pt,setBlending:X,setMaterial:Ft,setFlipSided:bt,setCullFace:gt,setLineWidth:ft,setPolygonOffset:It,setScissorTest:St,activeTexture:F,bindTexture:L,unbindTexture:et,compressedTexImage2D:ot,compressedTexImage3D:ht,texImage2D:xt,texImage3D:Nt,updateUBOMapping:Zt,uniformBlockBinding:Xt,texStorage2D:Tt,texStorage3D:dt,texSubImage2D:lt,texSubImage3D:Lt,compressedTexSubImage2D:yt,compressedTexSubImage3D:st,scissor:Ot,viewport:Et,reset:re}}function Iu(i,t,e,n){const s=w_(n);switch(e){case gf:return i*t;case _f:return i*t;case vf:return i*t*2;case jc:return i*t/s.components*s.byteLength;case Yc:return i*t/s.components*s.byteLength;case yf:return i*t*2/s.components*s.byteLength;case Kc:return i*t*2/s.components*s.byteLength;case xf:return i*t*3/s.components*s.byteLength;case Be:return i*t*4/s.components*s.byteLength;case qc:return i*t*4/s.components*s.byteLength;case xa:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case va:case ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case tc:case nc:return Math.max(i,16)*Math.max(t,8)/4;case Qo:case ec:return Math.max(i,8)*Math.max(t,8)/2;case ic:case sc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case rc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ac:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case cc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case lc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case uc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case hc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case dc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case pc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case mc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case gc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _c:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case vc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ma:case yc:case Mc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Mf:case bc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Sc:case Ac:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function w_(i){switch(i){case mn:case df:return{byteLength:1,components:1};case dr:case pf:case Us:return{byteLength:2,components:1};case Wc:case Xc:return{byteLength:2,components:4};case Gi:case Vc:case pn:return{byteLength:4,components:1};case mf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function R_(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new vt,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(F,L){return f?new OffscreenCanvas(F,L):gr("canvas")}function x(F,L,et){let ot=1;const ht=St(F);if((ht.width>et||ht.height>et)&&(ot=et/Math.max(ht.width,ht.height)),ot<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const lt=Math.floor(ot*ht.width),Lt=Math.floor(ot*ht.height);h===void 0&&(h=m(lt,Lt));const yt=L?m(lt,Lt):h;return yt.width=lt,yt.height=Lt,yt.getContext("2d").drawImage(F,0,0,lt,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+lt+"x"+Lt+")."),yt}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),F;return F}function g(F){return F.generateMipmaps}function p(F){i.generateMipmap(F)}function M(F){return F.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?i.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(F,L,et,ot,ht=!1){if(F!==null){if(i[F]!==void 0)return i[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let lt=L;if(L===i.RED&&(et===i.FLOAT&&(lt=i.R32F),et===i.HALF_FLOAT&&(lt=i.R16F),et===i.UNSIGNED_BYTE&&(lt=i.R8)),L===i.RED_INTEGER&&(et===i.UNSIGNED_BYTE&&(lt=i.R8UI),et===i.UNSIGNED_SHORT&&(lt=i.R16UI),et===i.UNSIGNED_INT&&(lt=i.R32UI),et===i.BYTE&&(lt=i.R8I),et===i.SHORT&&(lt=i.R16I),et===i.INT&&(lt=i.R32I)),L===i.RG&&(et===i.FLOAT&&(lt=i.RG32F),et===i.HALF_FLOAT&&(lt=i.RG16F),et===i.UNSIGNED_BYTE&&(lt=i.RG8)),L===i.RG_INTEGER&&(et===i.UNSIGNED_BYTE&&(lt=i.RG8UI),et===i.UNSIGNED_SHORT&&(lt=i.RG16UI),et===i.UNSIGNED_INT&&(lt=i.RG32UI),et===i.BYTE&&(lt=i.RG8I),et===i.SHORT&&(lt=i.RG16I),et===i.INT&&(lt=i.RG32I)),L===i.RGB_INTEGER&&(et===i.UNSIGNED_BYTE&&(lt=i.RGB8UI),et===i.UNSIGNED_SHORT&&(lt=i.RGB16UI),et===i.UNSIGNED_INT&&(lt=i.RGB32UI),et===i.BYTE&&(lt=i.RGB8I),et===i.SHORT&&(lt=i.RGB16I),et===i.INT&&(lt=i.RGB32I)),L===i.RGBA_INTEGER&&(et===i.UNSIGNED_BYTE&&(lt=i.RGBA8UI),et===i.UNSIGNED_SHORT&&(lt=i.RGBA16UI),et===i.UNSIGNED_INT&&(lt=i.RGBA32UI),et===i.BYTE&&(lt=i.RGBA8I),et===i.SHORT&&(lt=i.RGBA16I),et===i.INT&&(lt=i.RGBA32I)),L===i.RGB&&et===i.UNSIGNED_INT_5_9_9_9_REV&&(lt=i.RGB9_E5),L===i.RGBA){const Lt=ht?La:Jt.getTransfer(ot);et===i.FLOAT&&(lt=i.RGBA32F),et===i.HALF_FLOAT&&(lt=i.RGBA16F),et===i.UNSIGNED_BYTE&&(lt=Lt===de?i.SRGB8_ALPHA8:i.RGBA8),et===i.UNSIGNED_SHORT_4_4_4_4&&(lt=i.RGBA4),et===i.UNSIGNED_SHORT_5_5_5_1&&(lt=i.RGB5_A1)}return(lt===i.R16F||lt===i.R32F||lt===i.RG16F||lt===i.RG32F||lt===i.RGBA16F||lt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function _(F,L){let et;return F?L===null||L===Gi||L===ws?et=i.DEPTH24_STENCIL8:L===pn?et=i.DEPTH32F_STENCIL8:L===dr&&(et=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):L===null||L===Gi||L===ws?et=i.DEPTH_COMPONENT24:L===pn?et=i.DEPTH_COMPONENT32F:L===dr&&(et=i.DEPTH_COMPONENT16),et}function E(F,L){return g(F)===!0||F.isFramebufferTexture&&F.minFilter!==He&&F.minFilter!==Oe?Math.log2(Math.max(L.width,L.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?L.mipmaps.length:1}function T(F){const L=F.target;L.removeEventListener("dispose",T),N(L),L.isVideoTexture&&u.delete(L)}function P(F){const L=F.target;L.removeEventListener("dispose",P),A(L)}function N(F){const L=n.get(F);if(L.__webglInit===void 0)return;const et=F.source,ot=d.get(et);if(ot){const ht=ot[L.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&w(F),Object.keys(ot).length===0&&d.delete(et)}n.remove(F)}function w(F){const L=n.get(F);i.deleteTexture(L.__webglTexture);const et=F.source,ot=d.get(et);delete ot[L.__cacheKey],a.memory.textures--}function A(F){const L=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(L.__webglFramebuffer[ot]))for(let ht=0;ht<L.__webglFramebuffer[ot].length;ht++)i.deleteFramebuffer(L.__webglFramebuffer[ot][ht]);else i.deleteFramebuffer(L.__webglFramebuffer[ot]);L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer[ot])}else{if(Array.isArray(L.__webglFramebuffer))for(let ot=0;ot<L.__webglFramebuffer.length;ot++)i.deleteFramebuffer(L.__webglFramebuffer[ot]);else i.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&i.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let ot=0;ot<L.__webglColorRenderbuffer.length;ot++)L.__webglColorRenderbuffer[ot]&&i.deleteRenderbuffer(L.__webglColorRenderbuffer[ot]);L.__webglDepthRenderbuffer&&i.deleteRenderbuffer(L.__webglDepthRenderbuffer)}const et=F.textures;for(let ot=0,ht=et.length;ot<ht;ot++){const lt=n.get(et[ot]);lt.__webglTexture&&(i.deleteTexture(lt.__webglTexture),a.memory.textures--),n.remove(et[ot])}n.remove(F)}let I=0;function G(){I=0}function j(){const F=I;return F>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+s.maxTextures),I+=1,F}function q(F){const L=[];return L.push(F.wrapS),L.push(F.wrapT),L.push(F.wrapR||0),L.push(F.magFilter),L.push(F.minFilter),L.push(F.anisotropy),L.push(F.internalFormat),L.push(F.format),L.push(F.type),L.push(F.generateMipmaps),L.push(F.premultiplyAlpha),L.push(F.flipY),L.push(F.unpackAlignment),L.push(F.colorSpace),L.join()}function y(F,L){const et=n.get(F);if(F.isVideoTexture&&ft(F),F.isRenderTargetTexture===!1&&F.version>0&&et.__version!==F.version){const ot=F.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(et,F,L);return}}e.bindTexture(i.TEXTURE_2D,et.__webglTexture,i.TEXTURE0+L)}function b(F,L){const et=n.get(F);if(F.version>0&&et.__version!==F.version){k(et,F,L);return}e.bindTexture(i.TEXTURE_2D_ARRAY,et.__webglTexture,i.TEXTURE0+L)}function R(F,L){const et=n.get(F);if(F.version>0&&et.__version!==F.version){k(et,F,L);return}e.bindTexture(i.TEXTURE_3D,et.__webglTexture,i.TEXTURE0+L)}function S(F,L){const et=n.get(F);if(F.version>0&&et.__version!==F.version){W(et,F,L);return}e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture,i.TEXTURE0+L)}const z={[Ti]:i.REPEAT,[Un]:i.CLAMP_TO_EDGE,[Sa]:i.MIRRORED_REPEAT},O={[He]:i.NEAREST,[ff]:i.NEAREST_MIPMAP_NEAREST,[er]:i.NEAREST_MIPMAP_LINEAR,[Oe]:i.LINEAR,[ga]:i.LINEAR_MIPMAP_NEAREST,[dn]:i.LINEAR_MIPMAP_LINEAR},C={[np]:i.NEVER,[cp]:i.ALWAYS,[ip]:i.LESS,[Sf]:i.LEQUAL,[sp]:i.EQUAL,[op]:i.GEQUAL,[rp]:i.GREATER,[ap]:i.NOTEQUAL};function U(F,L){if(L.type===pn&&t.has("OES_texture_float_linear")===!1&&(L.magFilter===Oe||L.magFilter===ga||L.magFilter===er||L.magFilter===dn||L.minFilter===Oe||L.minFilter===ga||L.minFilter===er||L.minFilter===dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(F,i.TEXTURE_WRAP_S,z[L.wrapS]),i.texParameteri(F,i.TEXTURE_WRAP_T,z[L.wrapT]),(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)&&i.texParameteri(F,i.TEXTURE_WRAP_R,z[L.wrapR]),i.texParameteri(F,i.TEXTURE_MAG_FILTER,O[L.magFilter]),i.texParameteri(F,i.TEXTURE_MIN_FILTER,O[L.minFilter]),L.compareFunction&&(i.texParameteri(F,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(F,i.TEXTURE_COMPARE_FUNC,C[L.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(L.magFilter===He||L.minFilter!==er&&L.minFilter!==dn||L.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(L.anisotropy>1||n.get(L).__currentAnisotropy){const et=t.get("EXT_texture_filter_anisotropic");i.texParameterf(F,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,s.getMaxAnisotropy())),n.get(L).__currentAnisotropy=L.anisotropy}}}function Y(F,L){let et=!1;F.__webglInit===void 0&&(F.__webglInit=!0,L.addEventListener("dispose",T));const ot=L.source;let ht=d.get(ot);ht===void 0&&(ht={},d.set(ot,ht));const lt=q(L);if(lt!==F.__cacheKey){ht[lt]===void 0&&(ht[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,et=!0),ht[lt].usedTimes++;const Lt=ht[F.__cacheKey];Lt!==void 0&&(ht[F.__cacheKey].usedTimes--,Lt.usedTimes===0&&w(L)),F.__cacheKey=lt,F.__webglTexture=ht[lt].texture}return et}function k(F,L,et){let ot=i.TEXTURE_2D;(L.isDataArrayTexture||L.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),L.isData3DTexture&&(ot=i.TEXTURE_3D);const ht=Y(F,L),lt=L.source;e.bindTexture(ot,F.__webglTexture,i.TEXTURE0+et);const Lt=n.get(lt);if(lt.version!==Lt.__version||ht===!0){e.activeTexture(i.TEXTURE0+et);const yt=Jt.getPrimaries(Jt.workingColorSpace),st=L.colorSpace===yi?null:Jt.getPrimaries(L.colorSpace),Tt=L.colorSpace===yi||yt===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,L.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,L.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let dt=x(L.image,!1,s.maxTextureSize);dt=It(L,dt);const xt=r.convert(L.format,L.colorSpace),Nt=r.convert(L.type);let Ot=v(L.internalFormat,xt,Nt,L.colorSpace,L.isVideoTexture);U(ot,L);let Et;const Zt=L.mipmaps,Xt=L.isVideoTexture!==!0,re=Lt.__version===void 0||ht===!0,Z=lt.dataReady,Mt=E(L,dt);if(L.isDepthTexture)Ot=_(L.format===Rs,L.type),re&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,Ot,dt.width,dt.height):e.texImage2D(i.TEXTURE_2D,0,Ot,dt.width,dt.height,0,xt,Nt,null));else if(L.isDataTexture)if(Zt.length>0){Xt&&re&&e.texStorage2D(i.TEXTURE_2D,Mt,Ot,Zt[0].width,Zt[0].height);for(let ut=0,mt=Zt.length;ut<mt;ut++)Et=Zt[ut],Xt?Z&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,Et.width,Et.height,xt,Nt,Et.data):e.texImage2D(i.TEXTURE_2D,ut,Ot,Et.width,Et.height,0,xt,Nt,Et.data);L.generateMipmaps=!1}else Xt?(re&&e.texStorage2D(i.TEXTURE_2D,Mt,Ot,dt.width,dt.height),Z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt.width,dt.height,xt,Nt,dt.data)):e.texImage2D(i.TEXTURE_2D,0,Ot,dt.width,dt.height,0,xt,Nt,dt.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){Xt&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ot,Zt[0].width,Zt[0].height,dt.depth);for(let ut=0,mt=Zt.length;ut<mt;ut++)if(Et=Zt[ut],L.format!==Be)if(xt!==null)if(Xt){if(Z)if(L.layerUpdates.size>0){const Ct=Iu(Et.width,Et.height,L.format,L.type);for(const wt of L.layerUpdates){const Yt=Et.data.subarray(wt*Ct/Et.data.BYTES_PER_ELEMENT,(wt+1)*Ct/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,wt,Et.width,Et.height,1,xt,Yt)}L.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,Et.width,Et.height,dt.depth,xt,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ut,Ot,Et.width,Et.height,dt.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?Z&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,Et.width,Et.height,dt.depth,xt,Nt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ut,Ot,Et.width,Et.height,dt.depth,0,xt,Nt,Et.data)}else{Xt&&re&&e.texStorage2D(i.TEXTURE_2D,Mt,Ot,Zt[0].width,Zt[0].height);for(let ut=0,mt=Zt.length;ut<mt;ut++)Et=Zt[ut],L.format!==Be?xt!==null?Xt?Z&&e.compressedTexSubImage2D(i.TEXTURE_2D,ut,0,0,Et.width,Et.height,xt,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,ut,Ot,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?Z&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,Et.width,Et.height,xt,Nt,Et.data):e.texImage2D(i.TEXTURE_2D,ut,Ot,Et.width,Et.height,0,xt,Nt,Et.data)}else if(L.isDataArrayTexture)if(Xt){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ot,dt.width,dt.height,dt.depth),Z)if(L.layerUpdates.size>0){const ut=Iu(dt.width,dt.height,L.format,L.type);for(const mt of L.layerUpdates){const Ct=dt.data.subarray(mt*ut/dt.data.BYTES_PER_ELEMENT,(mt+1)*ut/dt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,mt,dt.width,dt.height,1,xt,Nt,Ct)}L.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,xt,Nt,dt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,dt.width,dt.height,dt.depth,0,xt,Nt,dt.data);else if(L.isData3DTexture)Xt?(re&&e.texStorage3D(i.TEXTURE_3D,Mt,Ot,dt.width,dt.height,dt.depth),Z&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,xt,Nt,dt.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,dt.width,dt.height,dt.depth,0,xt,Nt,dt.data);else if(L.isFramebufferTexture){if(re)if(Xt)e.texStorage2D(i.TEXTURE_2D,Mt,Ot,dt.width,dt.height);else{let ut=dt.width,mt=dt.height;for(let Ct=0;Ct<Mt;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,Ot,ut,mt,0,xt,Nt,null),ut>>=1,mt>>=1}}else if(Zt.length>0){if(Xt&&re){const ut=St(Zt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Ot,ut.width,ut.height)}for(let ut=0,mt=Zt.length;ut<mt;ut++)Et=Zt[ut],Xt?Z&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,xt,Nt,Et):e.texImage2D(i.TEXTURE_2D,ut,Ot,xt,Nt,Et);L.generateMipmaps=!1}else if(Xt){if(re){const ut=St(dt);e.texStorage2D(i.TEXTURE_2D,Mt,Ot,ut.width,ut.height)}Z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Nt,dt)}else e.texImage2D(i.TEXTURE_2D,0,Ot,xt,Nt,dt);g(L)&&p(ot),Lt.__version=lt.version,L.onUpdate&&L.onUpdate(L)}F.__version=L.version}function W(F,L,et){if(L.image.length!==6)return;const ot=Y(F,L),ht=L.source;e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+et);const lt=n.get(ht);if(ht.version!==lt.__version||ot===!0){e.activeTexture(i.TEXTURE0+et);const Lt=Jt.getPrimaries(Jt.workingColorSpace),yt=L.colorSpace===yi?null:Jt.getPrimaries(L.colorSpace),st=L.colorSpace===yi||Lt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,L.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,L.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);const Tt=L.isCompressedTexture||L.image[0].isCompressedTexture,dt=L.image[0]&&L.image[0].isDataTexture,xt=[];for(let mt=0;mt<6;mt++)!Tt&&!dt?xt[mt]=x(L.image[mt],!0,s.maxCubemapSize):xt[mt]=dt?L.image[mt].image:L.image[mt],xt[mt]=It(L,xt[mt]);const Nt=xt[0],Ot=r.convert(L.format,L.colorSpace),Et=r.convert(L.type),Zt=v(L.internalFormat,Ot,Et,L.colorSpace),Xt=L.isVideoTexture!==!0,re=lt.__version===void 0||ot===!0,Z=ht.dataReady;let Mt=E(L,Nt);U(i.TEXTURE_CUBE_MAP,L);let ut;if(Tt){Xt&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Zt,Nt.width,Nt.height);for(let mt=0;mt<6;mt++){ut=xt[mt].mipmaps;for(let Ct=0;Ct<ut.length;Ct++){const wt=ut[Ct];L.format!==Be?Ot!==null?Xt?Z&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct,0,0,wt.width,wt.height,Ot,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct,Zt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct,0,0,wt.width,wt.height,Ot,Et,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct,Zt,wt.width,wt.height,0,Ot,Et,wt.data)}}}else{if(ut=L.mipmaps,Xt&&re){ut.length>0&&Mt++;const mt=St(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Zt,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(dt){Xt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,xt[mt].width,xt[mt].height,Ot,Et,xt[mt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,Zt,xt[mt].width,xt[mt].height,0,Ot,Et,xt[mt].data);for(let Ct=0;Ct<ut.length;Ct++){const Yt=ut[Ct].image[mt].image;Xt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct+1,0,0,Yt.width,Yt.height,Ot,Et,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct+1,Zt,Yt.width,Yt.height,0,Ot,Et,Yt.data)}}else{Xt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Ot,Et,xt[mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,Zt,Ot,Et,xt[mt]);for(let Ct=0;Ct<ut.length;Ct++){const wt=ut[Ct];Xt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct+1,0,0,Ot,Et,wt.image[mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct+1,Zt,Ot,Et,wt.image[mt])}}}g(L)&&p(i.TEXTURE_CUBE_MAP),lt.__version=ht.version,L.onUpdate&&L.onUpdate(L)}F.__version=L.version}function tt(F,L,et,ot,ht,lt){const Lt=r.convert(et.format,et.colorSpace),yt=r.convert(et.type),st=v(et.internalFormat,Lt,yt,et.colorSpace),Tt=n.get(L),dt=n.get(et);if(dt.__renderTarget=L,!Tt.__hasExternalTextures){const xt=Math.max(1,L.width>>lt),Nt=Math.max(1,L.height>>lt);ht===i.TEXTURE_3D||ht===i.TEXTURE_2D_ARRAY?e.texImage3D(ht,lt,st,xt,Nt,L.depth,0,Lt,yt,null):e.texImage2D(ht,lt,st,xt,Nt,0,Lt,yt,null)}e.bindFramebuffer(i.FRAMEBUFFER,F),gt(L)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,ht,dt.__webglTexture,0,bt(L)):(ht===i.TEXTURE_2D||ht>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,ht,dt.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function H(F,L,et){if(i.bindRenderbuffer(i.RENDERBUFFER,F),L.depthBuffer){const ot=L.depthTexture,ht=ot&&ot.isDepthTexture?ot.type:null,lt=_(L.stencilBuffer,ht),Lt=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=bt(L);gt(L)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,lt,L.width,L.height):et?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,lt,L.width,L.height):i.renderbufferStorage(i.RENDERBUFFER,lt,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,F)}else{const ot=L.textures;for(let ht=0;ht<ot.length;ht++){const lt=ot[ht],Lt=r.convert(lt.format,lt.colorSpace),yt=r.convert(lt.type),st=v(lt.internalFormat,Lt,yt,lt.colorSpace),Tt=bt(L);et&&gt(L)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,st,L.width,L.height):gt(L)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt,st,L.width,L.height):i.renderbufferStorage(i.RENDERBUFFER,st,L.width,L.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function K(F,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,F),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ot=n.get(L.depthTexture);ot.__renderTarget=L,(!ot.__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),y(L.depthTexture,0);const ht=ot.__webglTexture,lt=bt(L);if(L.depthTexture.format===vs)gt(L)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ht,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ht,0);else if(L.depthTexture.format===Rs)gt(L)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ht,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ht,0);else throw new Error("Unknown depthTexture format")}function nt(F){const L=n.get(F),et=F.isWebGLCubeRenderTarget===!0;if(L.__boundDepthTexture!==F.depthTexture){const ot=F.depthTexture;if(L.__depthDisposeCallback&&L.__depthDisposeCallback(),ot){const ht=()=>{delete L.__boundDepthTexture,delete L.__depthDisposeCallback,ot.removeEventListener("dispose",ht)};ot.addEventListener("dispose",ht),L.__depthDisposeCallback=ht}L.__boundDepthTexture=ot}if(F.depthTexture&&!L.__autoAllocateDepthBuffer){if(et)throw new Error("target.depthTexture not supported in Cube render targets");K(L.__webglFramebuffer,F)}else if(et){L.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer[ot]),L.__webglDepthbuffer[ot]===void 0)L.__webglDepthbuffer[ot]=i.createRenderbuffer(),H(L.__webglDepthbuffer[ot],F,!1);else{const ht=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=L.__webglDepthbuffer[ot];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,lt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer),L.__webglDepthbuffer===void 0)L.__webglDepthbuffer=i.createRenderbuffer(),H(L.__webglDepthbuffer,F,!1);else{const ot=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=L.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,ht)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(F,L,et){const ot=n.get(F);L!==void 0&&tt(ot.__webglFramebuffer,F,F.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),et!==void 0&&nt(F)}function Pt(F){const L=F.texture,et=n.get(F),ot=n.get(L);F.addEventListener("dispose",P);const ht=F.textures,lt=F.isWebGLCubeRenderTarget===!0,Lt=ht.length>1;if(Lt||(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=L.version,a.memory.textures++),lt){et.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(L.mipmaps&&L.mipmaps.length>0){et.__webglFramebuffer[yt]=[];for(let st=0;st<L.mipmaps.length;st++)et.__webglFramebuffer[yt][st]=i.createFramebuffer()}else et.__webglFramebuffer[yt]=i.createFramebuffer()}else{if(L.mipmaps&&L.mipmaps.length>0){et.__webglFramebuffer=[];for(let yt=0;yt<L.mipmaps.length;yt++)et.__webglFramebuffer[yt]=i.createFramebuffer()}else et.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let yt=0,st=ht.length;yt<st;yt++){const Tt=n.get(ht[yt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),a.memory.textures++)}if(F.samples>0&&gt(F)===!1){et.__webglMultisampledFramebuffer=i.createFramebuffer(),et.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,et.__webglMultisampledFramebuffer);for(let yt=0;yt<ht.length;yt++){const st=ht[yt];et.__webglColorRenderbuffer[yt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,et.__webglColorRenderbuffer[yt]);const Tt=r.convert(st.format,st.colorSpace),dt=r.convert(st.type),xt=v(st.internalFormat,Tt,dt,st.colorSpace,F.isXRRenderTarget===!0),Nt=bt(F);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,xt,F.width,F.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,et.__webglColorRenderbuffer[yt])}i.bindRenderbuffer(i.RENDERBUFFER,null),F.depthBuffer&&(et.__webglDepthRenderbuffer=i.createRenderbuffer(),H(et.__webglDepthRenderbuffer,F,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),U(i.TEXTURE_CUBE_MAP,L);for(let yt=0;yt<6;yt++)if(L.mipmaps&&L.mipmaps.length>0)for(let st=0;st<L.mipmaps.length;st++)tt(et.__webglFramebuffer[yt][st],F,L,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,st);else tt(et.__webglFramebuffer[yt],F,L,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);g(L)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let yt=0,st=ht.length;yt<st;yt++){const Tt=ht[yt],dt=n.get(Tt);e.bindTexture(i.TEXTURE_2D,dt.__webglTexture),U(i.TEXTURE_2D,Tt),tt(et.__webglFramebuffer,F,Tt,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,0),g(Tt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let yt=i.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(yt=F.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,ot.__webglTexture),U(yt,L),L.mipmaps&&L.mipmaps.length>0)for(let st=0;st<L.mipmaps.length;st++)tt(et.__webglFramebuffer[st],F,L,i.COLOR_ATTACHMENT0,yt,st);else tt(et.__webglFramebuffer,F,L,i.COLOR_ATTACHMENT0,yt,0);g(L)&&p(yt),e.unbindTexture()}F.depthBuffer&&nt(F)}function V(F){const L=F.textures;for(let et=0,ot=L.length;et<ot;et++){const ht=L[et];if(g(ht)){const lt=M(F),Lt=n.get(ht).__webglTexture;e.bindTexture(lt,Lt),p(lt),e.unbindTexture()}}}const ct=[],X=[];function Ft(F){if(F.samples>0){if(gt(F)===!1){const L=F.textures,et=F.width,ot=F.height;let ht=i.COLOR_BUFFER_BIT;const lt=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(F),yt=L.length>1;if(yt)for(let st=0;st<L.length;st++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let st=0;st<L.length;st++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(ht|=i.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(ht|=i.STENCIL_BUFFER_BIT)),yt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[st]);const Tt=n.get(L[st]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Tt,0)}i.blitFramebuffer(0,0,et,ot,0,0,et,ot,ht,i.NEAREST),c===!0&&(ct.length=0,X.length=0,ct.push(i.COLOR_ATTACHMENT0+st),F.depthBuffer&&F.resolveDepthBuffer===!1&&(ct.push(lt),X.push(lt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,X)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),yt)for(let st=0;st<L.length;st++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[st]);const Tt=n.get(L[st]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.TEXTURE_2D,Tt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&c){const L=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[L])}}}function bt(F){return Math.min(s.maxSamples,F.samples)}function gt(F){const L=n.get(F);return F.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function ft(F){const L=a.render.frame;u.get(F)!==L&&(u.set(F,L),F.update())}function It(F,L){const et=F.colorSpace,ot=F.format,ht=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||et!==Qe&&et!==yi&&(Jt.getTransfer(et)===de?(ot!==Be||ht!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",et)),L}function St(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(l.width=F.naturalWidth||F.width,l.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(l.width=F.displayWidth,l.height=F.displayHeight):(l.width=F.width,l.height=F.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=G,this.setTexture2D=y,this.setTexture2DArray=b,this.setTexture3D=R,this.setTextureCube=S,this.rebindTextures=pt,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=gt}function C_(i,t){function e(n,s=yi){let r;const a=Jt.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===Wc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===df)return i.BYTE;if(n===pf)return i.SHORT;if(n===dr)return i.UNSIGNED_SHORT;if(n===Vc)return i.INT;if(n===Gi)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===Us)return i.HALF_FLOAT;if(n===gf)return i.ALPHA;if(n===xf)return i.RGB;if(n===Be)return i.RGBA;if(n===_f)return i.LUMINANCE;if(n===vf)return i.LUMINANCE_ALPHA;if(n===vs)return i.DEPTH_COMPONENT;if(n===Rs)return i.DEPTH_STENCIL;if(n===jc)return i.RED;if(n===Yc)return i.RED_INTEGER;if(n===yf)return i.RG;if(n===Kc)return i.RG_INTEGER;if(n===qc)return i.RGBA_INTEGER;if(n===xa||n===_a||n===va||n===ya)if(a===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qo||n===tc||n===ec||n===nc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===tc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ec)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ic||n===sc||n===rc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ic||n===sc)return a===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ac||n===oc||n===cc||n===lc||n===uc||n===hc||n===fc||n===dc||n===pc||n===mc||n===gc||n===xc||n===_c||n===vc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ac)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_c)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vc)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ma||n===yc||n===Mc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ma)return a===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mf||n===bc||n===Sc||n===Ac)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ma)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class P_ extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Re extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const L_={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(L_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const I_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D_=`
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

}`;class N_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new De,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new zn({vertexShader:I_,fragmentShader:D_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new te(new ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class U_ extends Ri{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,m=null;const x=new N_,g=e.getContextAttributes();let p=null,M=null;const v=[],_=[],E=new vt;let T=null;const P=new qe;P.viewport=new Qt;const N=new qe;N.viewport=new Qt;const w=[P,N],A=new P_;let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let W=v[k];return W===void 0&&(W=new mo,v[k]=W),W.getTargetRaySpace()},this.getControllerGrip=function(k){let W=v[k];return W===void 0&&(W=new mo,v[k]=W),W.getGripSpace()},this.getHand=function(k){let W=v[k];return W===void 0&&(W=new mo,v[k]=W),W.getHandSpace()};function j(k){const W=_.indexOf(k.inputSource);if(W===-1)return;const tt=v[W];tt!==void 0&&(tt.update(k.inputSource,k.frame,l||a),tt.dispatchEvent({type:k.type,data:k.inputSource}))}function q(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",y);for(let k=0;k<v.length;k++){const W=_[k];W!==null&&(_[k]=null,v[k].disconnect(W))}I=null,G=null,x.reset(),t.setRenderTarget(p),f=null,d=null,h=null,s=null,M=null,Y.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",q),s.addEventListener("inputsourceschange",y),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(E),s.renderState.layers===void 0){const W={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,W),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Vi(f.framebufferWidth,f.framebufferHeight,{format:Be,type:mn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let W=null,tt=null,H=null;g.depth&&(H=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,W=g.stencil?Rs:vs,tt=g.stencil?ws:Gi);const K={colorFormat:e.RGBA8,depthFormat:H,scaleFactor:r};h=new XRWebGLBinding(s,e),d=h.createProjectionLayer(K),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Vi(d.textureWidth,d.textureHeight,{format:Be,type:mn,depthTexture:new Nf(d.textureWidth,d.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Y.setContext(s),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function y(k){for(let W=0;W<k.removed.length;W++){const tt=k.removed[W],H=_.indexOf(tt);H>=0&&(_[H]=null,v[H].disconnect(tt))}for(let W=0;W<k.added.length;W++){const tt=k.added[W];let H=_.indexOf(tt);if(H===-1){for(let nt=0;nt<v.length;nt++)if(nt>=_.length){_.push(tt),H=nt;break}else if(_[nt]===null){_[nt]=tt,H=nt;break}if(H===-1)break}const K=v[H];K&&K.connect(tt)}}const b=new B,R=new B;function S(k,W,tt){b.setFromMatrixPosition(W.matrixWorld),R.setFromMatrixPosition(tt.matrixWorld);const H=b.distanceTo(R),K=W.projectionMatrix.elements,nt=tt.projectionMatrix.elements,pt=K[14]/(K[10]-1),Pt=K[14]/(K[10]+1),V=(K[9]+1)/K[5],ct=(K[9]-1)/K[5],X=(K[8]-1)/K[0],Ft=(nt[8]+1)/nt[0],bt=pt*X,gt=pt*Ft,ft=H/(-X+Ft),It=ft*-X;if(W.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(It),k.translateZ(ft),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),K[10]===-1)k.projectionMatrix.copy(W.projectionMatrix),k.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{const St=pt+ft,F=Pt+ft,L=bt-It,et=gt+(H-It),ot=V*Pt/F*St,ht=ct*Pt/F*St;k.projectionMatrix.makePerspective(L,et,ot,ht,St,F),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function z(k,W){W===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(W.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let W=k.near,tt=k.far;x.texture!==null&&(x.depthNear>0&&(W=x.depthNear),x.depthFar>0&&(tt=x.depthFar)),A.near=N.near=P.near=W,A.far=N.far=P.far=tt,(I!==A.near||G!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),I=A.near,G=A.far),P.layers.mask=k.layers.mask|2,N.layers.mask=k.layers.mask|4,A.layers.mask=P.layers.mask|N.layers.mask;const H=k.parent,K=A.cameras;z(A,H);for(let nt=0;nt<K.length;nt++)z(K[nt],H);K.length===2?S(A,P,N):A.projectionMatrix.copy(P.projectionMatrix),O(k,A,H)};function O(k,W,tt){tt===null?k.matrix.copy(W.matrixWorld):(k.matrix.copy(tt.matrixWorld),k.matrix.invert(),k.matrix.multiply(W.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(W.projectionMatrix),k.projectionMatrixInverse.copy(W.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Cs*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(k){c=k,d!==null&&(d.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(A)};let C=null;function U(k,W){if(u=W.getViewerPose(l||a),m=W,u!==null){const tt=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let H=!1;tt.length!==A.cameras.length&&(A.cameras.length=0,H=!0);for(let nt=0;nt<tt.length;nt++){const pt=tt[nt];let Pt=null;if(f!==null)Pt=f.getViewport(pt);else{const ct=h.getViewSubImage(d,pt);Pt=ct.viewport,nt===0&&(t.setRenderTargetTextures(M,ct.colorTexture,d.ignoreDepthValues?void 0:ct.depthStencilTexture),t.setRenderTarget(M))}let V=w[nt];V===void 0&&(V=new qe,V.layers.enable(nt),V.viewport=new Qt,w[nt]=V),V.matrix.fromArray(pt.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(pt.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),nt===0&&(A.matrix.copy(V.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),H===!0&&A.cameras.push(V)}const K=s.enabledFeatures;if(K&&K.includes("depth-sensing")){const nt=h.getDepthInformation(tt[0]);nt&&nt.isValid&&nt.texture&&x.init(t,nt,s.renderState)}}for(let tt=0;tt<v.length;tt++){const H=_[tt],K=v[tt];H!==null&&K!==void 0&&K.update(H,W,l||a)}C&&C(k,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),m=null}const Y=new Df;Y.setAnimationLoop(U),this.setAnimationLoop=function(k){C=k},this.dispose=function(){}}}const Ui=new tn,z_=new Ht;function k_(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Pf(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,M,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Je&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Je&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),v=M.envMap,_=M.envMapRotation;v&&(g.envMap.value=v,Ui.copy(_),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),g.envMapRotation.value.setFromMatrix4(z_.makeRotationFromEuler(Ui)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function O_(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){const _=v.program;n.uniformBlockBinding(M,_)}function l(M,v){let _=s[M.id];_===void 0&&(m(M),_=u(M),s[M.id]=_,M.addEventListener("dispose",g));const E=v.program;n.updateUBOMapping(M,E);const T=t.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function u(M){const v=h();M.__bindingPointIndex=v;const _=i.createBuffer(),E=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,E,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const v=s[M.id],_=M.uniforms,E=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,P=_.length;T<P;T++){const N=Array.isArray(_[T])?_[T]:[_[T]];for(let w=0,A=N.length;w<A;w++){const I=N[w];if(f(I,T,w,E)===!0){const G=I.__offset,j=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let y=0;y<j.length;y++){const b=j[y],R=x(b);typeof b=="number"||typeof b=="boolean"?(I.__data[0]=b,i.bufferSubData(i.UNIFORM_BUFFER,G+q,I.__data)):b.isMatrix3?(I.__data[0]=b.elements[0],I.__data[1]=b.elements[1],I.__data[2]=b.elements[2],I.__data[3]=0,I.__data[4]=b.elements[3],I.__data[5]=b.elements[4],I.__data[6]=b.elements[5],I.__data[7]=0,I.__data[8]=b.elements[6],I.__data[9]=b.elements[7],I.__data[10]=b.elements[8],I.__data[11]=0):(b.toArray(I.__data,q),q+=R.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,_,E){const T=M.value,P=v+"_"+_;if(E[P]===void 0)return typeof T=="number"||typeof T=="boolean"?E[P]=T:E[P]=T.clone(),!0;{const N=E[P];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return E[P]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function m(M){const v=M.uniforms;let _=0;const E=16;for(let P=0,N=v.length;P<N;P++){const w=Array.isArray(v[P])?v[P]:[v[P]];for(let A=0,I=w.length;A<I;A++){const G=w[A],j=Array.isArray(G.value)?G.value:[G.value];for(let q=0,y=j.length;q<y;q++){const b=j[q],R=x(b),S=_%E,z=S%R.boundary,O=S+z;_+=z,O!==0&&E-O<R.storage&&(_+=E-O),G.__data=new Float32Array(R.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=_,_+=R.storage}}}const T=_%E;return T>0&&(_+=E-T),M.__size=_,M.__cache={},this}function x(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function g(M){const v=M.target;v.removeEventListener("dispose",g);const _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class F_{constructor(t={}){const{canvas:e=Ep(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),x=new Int32Array(4);let g=null,p=null;const M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=Ei,this.toneMappingExposure=1;const _=this;let E=!1,T=0,P=0,N=null,w=-1,A=null;const I=new Qt,G=new Qt;let j=null;const q=new Dt(0);let y=0,b=e.width,R=e.height,S=1,z=null,O=null;const C=new Qt(0,0,b,R),U=new Qt(0,0,b,R);let Y=!1;const k=new Mr;let W=!1,tt=!1;const H=new Ht,K=new Ht,nt=new B,pt=new Qt,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let V=!1;function ct(){return N===null?S:1}let X=n;function Ft(D,$){return e.getContext(D,$)}try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Bc}`),e.addEventListener("webglcontextlost",mt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",wt,!1),X===null){const $="webgl2";if(X=Ft($,D),X===null)throw Ft($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let bt,gt,ft,It,St,F,L,et,ot,ht,lt,Lt,yt,st,Tt,dt,xt,Nt,Ot,Et,Zt,Xt,re,Z;function Mt(){bt=new Xg(X),bt.init(),Xt=new C_(X,bt),gt=new Fg(X,bt,t,Xt),ft=new T_(X,bt),gt.reverseDepthBuffer&&d&&ft.buffers.depth.setReversed(!0),It=new Kg(X),St=new f_,F=new R_(X,bt,ft,St,gt,Xt,It),L=new Hg(_),et=new Wg(_),ot=new em(X),re=new kg(X,ot),ht=new jg(X,ot,It,re),lt=new Zg(X,ht,ot,It),Ot=new qg(X,gt,F),dt=new Bg(St),Lt=new h_(_,L,et,bt,gt,re,dt),yt=new k_(_,St),st=new p_,Tt=new y_(bt),Nt=new zg(_,L,et,ft,lt,f,c),xt=new A_(_,lt,gt),Z=new O_(X,It,gt,ft),Et=new Og(X,bt,It),Zt=new Yg(X,bt,It),It.programs=Lt.programs,_.capabilities=gt,_.extensions=bt,_.properties=St,_.renderLists=st,_.shadowMap=xt,_.state=ft,_.info=It}Mt();const ut=new U_(_,X);this.xr=ut,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const D=bt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=bt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return S},this.setPixelRatio=function(D){D!==void 0&&(S=D,this.setSize(b,R,!1))},this.getSize=function(D){return D.set(b,R)},this.setSize=function(D,$,rt=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}b=D,R=$,e.width=Math.floor(D*S),e.height=Math.floor($*S),rt===!0&&(e.style.width=D+"px",e.style.height=$+"px"),this.setViewport(0,0,D,$)},this.getDrawingBufferSize=function(D){return D.set(b*S,R*S).floor()},this.setDrawingBufferSize=function(D,$,rt){b=D,R=$,S=rt,e.width=Math.floor(D*rt),e.height=Math.floor($*rt),this.setViewport(0,0,D,$)},this.getCurrentViewport=function(D){return D.copy(I)},this.getViewport=function(D){return D.copy(C)},this.setViewport=function(D,$,rt,at){D.isVector4?C.set(D.x,D.y,D.z,D.w):C.set(D,$,rt,at),ft.viewport(I.copy(C).multiplyScalar(S).round())},this.getScissor=function(D){return D.copy(U)},this.setScissor=function(D,$,rt,at){D.isVector4?U.set(D.x,D.y,D.z,D.w):U.set(D,$,rt,at),ft.scissor(G.copy(U).multiplyScalar(S).round())},this.getScissorTest=function(){return Y},this.setScissorTest=function(D){ft.setScissorTest(Y=D)},this.setOpaqueSort=function(D){z=D},this.setTransparentSort=function(D){O=D},this.getClearColor=function(D){return D.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(D=!0,$=!0,rt=!0){let at=0;if(D){let J=!1;if(N!==null){const _t=N.texture.format;J=_t===qc||_t===Kc||_t===Yc}if(J){const _t=N.texture.type,Rt=_t===mn||_t===Gi||_t===dr||_t===ws||_t===Wc||_t===Xc,Ut=Nt.getClearColor(),zt=Nt.getClearAlpha(),Wt=Ut.r,Kt=Ut.g,kt=Ut.b;Rt?(m[0]=Wt,m[1]=Kt,m[2]=kt,m[3]=zt,X.clearBufferuiv(X.COLOR,0,m)):(x[0]=Wt,x[1]=Kt,x[2]=kt,x[3]=zt,X.clearBufferiv(X.COLOR,0,x))}else at|=X.COLOR_BUFFER_BIT}$&&(at|=X.DEPTH_BUFFER_BIT),rt&&(at|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",mt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),st.dispose(),Tt.dispose(),St.dispose(),L.dispose(),et.dispose(),lt.dispose(),re.dispose(),Z.dispose(),Lt.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",Tl),ut.removeEventListener("sessionend",wl),Ci.stop()};function mt(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const D=It.autoReset,$=xt.enabled,rt=xt.autoUpdate,at=xt.needsUpdate,J=xt.type;Mt(),It.autoReset=D,xt.enabled=$,xt.autoUpdate=rt,xt.needsUpdate=at,xt.type=J}function wt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Yt(D){const $=D.target;$.removeEventListener("dispose",Yt),Te($)}function Te(D){Ve(D),St.remove(D)}function Ve(D){const $=St.get(D).programs;$!==void 0&&($.forEach(function(rt){Lt.releaseProgram(rt)}),D.isShaderMaterial&&Lt.releaseShaderCache(D))}this.renderBufferDirect=function(D,$,rt,at,J,_t){$===null&&($=Pt);const Rt=J.isMesh&&J.matrixWorld.determinant()<0,Ut=_d(D,$,rt,at,J);ft.setMaterial(at,Rt);let zt=rt.index,Wt=1;if(at.wireframe===!0){if(zt=ht.getWireframeAttribute(rt),zt===void 0)return;Wt=2}const Kt=rt.drawRange,kt=rt.attributes.position;let ee=Kt.start*Wt,ge=(Kt.start+Kt.count)*Wt;_t!==null&&(ee=Math.max(ee,_t.start*Wt),ge=Math.min(ge,(_t.start+_t.count)*Wt)),zt!==null?(ee=Math.max(ee,0),ge=Math.min(ge,zt.count)):kt!=null&&(ee=Math.max(ee,0),ge=Math.min(ge,kt.count));const ve=ge-ee;if(ve<0||ve===1/0)return;re.setup(J,at,Ut,rt,zt);let en,ae=Et;if(zt!==null&&(en=ot.get(zt),ae=Zt,ae.setIndex(en)),J.isMesh)at.wireframe===!0?(ft.setLineWidth(at.wireframeLinewidth*ct()),ae.setMode(X.LINES)):ae.setMode(X.TRIANGLES);else if(J.isLine){let Bt=at.linewidth;Bt===void 0&&(Bt=1),ft.setLineWidth(Bt*ct()),J.isLineSegments?ae.setMode(X.LINES):J.isLineLoop?ae.setMode(X.LINE_LOOP):ae.setMode(X.LINE_STRIP)}else J.isPoints?ae.setMode(X.POINTS):J.isSprite&&ae.setMode(X.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)ae.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(bt.get("WEBGL_multi_draw"))ae.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Bt=J._multiDrawStarts,Hn=J._multiDrawCounts,oe=J._multiDrawCount,xn=zt?ot.get(zt).bytesPerElement:1,Yi=St.get(at).currentProgram.getUniforms();for(let sn=0;sn<oe;sn++)Yi.setValue(X,"_gl_DrawID",sn),ae.render(Bt[sn]/xn,Hn[sn])}else if(J.isInstancedMesh)ae.renderInstances(ee,ve,J.count);else if(rt.isInstancedBufferGeometry){const Bt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Hn=Math.min(rt.instanceCount,Bt);ae.renderInstances(ee,ve,Hn)}else ae.render(ee,ve)};function le(D,$,rt){D.transparent===!0&&D.side===Ze&&D.forceSinglePass===!1?(D.side=Je,D.needsUpdate=!0,Tr(D,$,rt),D.side=ii,D.needsUpdate=!0,Tr(D,$,rt),D.side=Ze):Tr(D,$,rt)}this.compile=function(D,$,rt=null){rt===null&&(rt=D),p=Tt.get(rt),p.init($),v.push(p),rt.traverseVisible(function(J){J.isLight&&J.layers.test($.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),D!==rt&&D.traverseVisible(function(J){J.isLight&&J.layers.test($.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights();const at=new Set;return D.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const _t=J.material;if(_t)if(Array.isArray(_t))for(let Rt=0;Rt<_t.length;Rt++){const Ut=_t[Rt];le(Ut,rt,J),at.add(Ut)}else le(_t,rt,J),at.add(_t)}),v.pop(),p=null,at},this.compileAsync=function(D,$,rt=null){const at=this.compile(D,$,rt);return new Promise(J=>{function _t(){if(at.forEach(function(Rt){St.get(Rt).currentProgram.isReady()&&at.delete(Rt)}),at.size===0){J(D);return}setTimeout(_t,10)}bt.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let gn=null;function Bn(D){gn&&gn(D)}function Tl(){Ci.stop()}function wl(){Ci.start()}const Ci=new Df;Ci.setAnimationLoop(Bn),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(D){gn=D,ut.setAnimationLoop(D),D===null?Ci.stop():Ci.start()},ut.addEventListener("sessionstart",Tl),ut.addEventListener("sessionend",wl),this.render=function(D,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera($),$=ut.getCamera()),D.isScene===!0&&D.onBeforeRender(_,D,$,N),p=Tt.get(D,v.length),p.init($),v.push(p),K.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),k.setFromProjectionMatrix(K),tt=this.localClippingEnabled,W=dt.init(this.clippingPlanes,tt),g=st.get(D,M.length),g.init(),M.push(g),ut.enabled===!0&&ut.isPresenting===!0){const _t=_.xr.getDepthSensingMesh();_t!==null&&Ba(_t,$,-1/0,_.sortObjects)}Ba(D,$,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(z,O),V=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,V&&Nt.addToRenderList(g,D),this.info.render.frame++,W===!0&&dt.beginShadows();const rt=p.state.shadowsArray;xt.render(rt,D,$),W===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const at=g.opaque,J=g.transmissive;if(p.setupLights(),$.isArrayCamera){const _t=$.cameras;if(J.length>0)for(let Rt=0,Ut=_t.length;Rt<Ut;Rt++){const zt=_t[Rt];Cl(at,J,D,zt)}V&&Nt.render(D);for(let Rt=0,Ut=_t.length;Rt<Ut;Rt++){const zt=_t[Rt];Rl(g,D,zt,zt.viewport)}}else J.length>0&&Cl(at,J,D,$),V&&Nt.render(D),Rl(g,D,$);N!==null&&(F.updateMultisampleRenderTarget(N),F.updateRenderTargetMipmap(N)),D.isScene===!0&&D.onAfterRender(_,D,$),re.resetDefaultState(),w=-1,A=null,v.pop(),v.length>0?(p=v[v.length-1],W===!0&&dt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Ba(D,$,rt,at){if(D.visible===!1)return;if(D.layers.test($.layers)){if(D.isGroup)rt=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update($);else if(D.isLight)p.pushLight(D),D.castShadow&&p.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||k.intersectsSprite(D)){at&&pt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(K);const Rt=lt.update(D),Ut=D.material;Ut.visible&&g.push(D,Rt,Ut,rt,pt.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||k.intersectsObject(D))){const Rt=lt.update(D),Ut=D.material;if(at&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),pt.copy(D.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),pt.copy(Rt.boundingSphere.center)),pt.applyMatrix4(D.matrixWorld).applyMatrix4(K)),Array.isArray(Ut)){const zt=Rt.groups;for(let Wt=0,Kt=zt.length;Wt<Kt;Wt++){const kt=zt[Wt],ee=Ut[kt.materialIndex];ee&&ee.visible&&g.push(D,Rt,ee,rt,pt.z,kt)}}else Ut.visible&&g.push(D,Rt,Ut,rt,pt.z,null)}}const _t=D.children;for(let Rt=0,Ut=_t.length;Rt<Ut;Rt++)Ba(_t[Rt],$,rt,at)}function Rl(D,$,rt,at){const J=D.opaque,_t=D.transmissive,Rt=D.transparent;p.setupLightsView(rt),W===!0&&dt.setGlobalState(_.clippingPlanes,rt),at&&ft.viewport(I.copy(at)),J.length>0&&Er(J,$,rt),_t.length>0&&Er(_t,$,rt),Rt.length>0&&Er(Rt,$,rt),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function Cl(D,$,rt,at){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[at.id]===void 0&&(p.state.transmissionRenderTarget[at.id]=new Vi(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?Us:mn,minFilter:dn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const _t=p.state.transmissionRenderTarget[at.id],Rt=at.viewport||I;_t.setSize(Rt.z,Rt.w);const Ut=_.getRenderTarget();_.setRenderTarget(_t),_.getClearColor(q),y=_.getClearAlpha(),y<1&&_.setClearColor(16777215,.5),_.clear(),V&&Nt.render(rt);const zt=_.toneMapping;_.toneMapping=Ei;const Wt=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),p.setupLightsView(at),W===!0&&dt.setGlobalState(_.clippingPlanes,at),Er(D,rt,at),F.updateMultisampleRenderTarget(_t),F.updateRenderTargetMipmap(_t),bt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let kt=0,ee=$.length;kt<ee;kt++){const ge=$[kt],ve=ge.object,en=ge.geometry,ae=ge.material,Bt=ge.group;if(ae.side===Ze&&ve.layers.test(at.layers)){const Hn=ae.side;ae.side=Je,ae.needsUpdate=!0,Pl(ve,rt,at,en,ae,Bt),ae.side=Hn,ae.needsUpdate=!0,Kt=!0}}Kt===!0&&(F.updateMultisampleRenderTarget(_t),F.updateRenderTargetMipmap(_t))}_.setRenderTarget(Ut),_.setClearColor(q,y),Wt!==void 0&&(at.viewport=Wt),_.toneMapping=zt}function Er(D,$,rt){const at=$.isScene===!0?$.overrideMaterial:null;for(let J=0,_t=D.length;J<_t;J++){const Rt=D[J],Ut=Rt.object,zt=Rt.geometry,Wt=at===null?Rt.material:at,Kt=Rt.group;Ut.layers.test(rt.layers)&&Pl(Ut,$,rt,zt,Wt,Kt)}}function Pl(D,$,rt,at,J,_t){D.onBeforeRender(_,$,rt,at,J,_t),D.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),J.onBeforeRender(_,$,rt,at,D,_t),J.transparent===!0&&J.side===Ze&&J.forceSinglePass===!1?(J.side=Je,J.needsUpdate=!0,_.renderBufferDirect(rt,$,at,J,D,_t),J.side=ii,J.needsUpdate=!0,_.renderBufferDirect(rt,$,at,J,D,_t),J.side=Ze):_.renderBufferDirect(rt,$,at,J,D,_t),D.onAfterRender(_,$,rt,at,J,_t)}function Tr(D,$,rt){$.isScene!==!0&&($=Pt);const at=St.get(D),J=p.state.lights,_t=p.state.shadowsArray,Rt=J.state.version,Ut=Lt.getParameters(D,J.state,_t,$,rt),zt=Lt.getProgramCacheKey(Ut);let Wt=at.programs;at.environment=D.isMeshStandardMaterial?$.environment:null,at.fog=$.fog,at.envMap=(D.isMeshStandardMaterial?et:L).get(D.envMap||at.environment),at.envMapRotation=at.environment!==null&&D.envMap===null?$.environmentRotation:D.envMapRotation,Wt===void 0&&(D.addEventListener("dispose",Yt),Wt=new Map,at.programs=Wt);let Kt=Wt.get(zt);if(Kt!==void 0){if(at.currentProgram===Kt&&at.lightsStateVersion===Rt)return Il(D,Ut),Kt}else Ut.uniforms=Lt.getUniforms(D),D.onBeforeCompile(Ut,_),Kt=Lt.acquireProgram(Ut,zt),Wt.set(zt,Kt),at.uniforms=Ut.uniforms;const kt=at.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(kt.clippingPlanes=dt.uniform),Il(D,Ut),at.needsLights=yd(D),at.lightsStateVersion=Rt,at.needsLights&&(kt.ambientLightColor.value=J.state.ambient,kt.lightProbe.value=J.state.probe,kt.directionalLights.value=J.state.directional,kt.directionalLightShadows.value=J.state.directionalShadow,kt.spotLights.value=J.state.spot,kt.spotLightShadows.value=J.state.spotShadow,kt.rectAreaLights.value=J.state.rectArea,kt.ltc_1.value=J.state.rectAreaLTC1,kt.ltc_2.value=J.state.rectAreaLTC2,kt.pointLights.value=J.state.point,kt.pointLightShadows.value=J.state.pointShadow,kt.hemisphereLights.value=J.state.hemi,kt.directionalShadowMap.value=J.state.directionalShadowMap,kt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,kt.spotShadowMap.value=J.state.spotShadowMap,kt.spotLightMatrix.value=J.state.spotLightMatrix,kt.spotLightMap.value=J.state.spotLightMap,kt.pointShadowMap.value=J.state.pointShadowMap,kt.pointShadowMatrix.value=J.state.pointShadowMatrix),at.currentProgram=Kt,at.uniformsList=null,Kt}function Ll(D){if(D.uniformsList===null){const $=D.currentProgram.getUniforms();D.uniformsList=ba.seqWithValue($.seq,D.uniforms)}return D.uniformsList}function Il(D,$){const rt=St.get(D);rt.outputColorSpace=$.outputColorSpace,rt.batching=$.batching,rt.batchingColor=$.batchingColor,rt.instancing=$.instancing,rt.instancingColor=$.instancingColor,rt.instancingMorph=$.instancingMorph,rt.skinning=$.skinning,rt.morphTargets=$.morphTargets,rt.morphNormals=$.morphNormals,rt.morphColors=$.morphColors,rt.morphTargetsCount=$.morphTargetsCount,rt.numClippingPlanes=$.numClippingPlanes,rt.numIntersection=$.numClipIntersection,rt.vertexAlphas=$.vertexAlphas,rt.vertexTangents=$.vertexTangents,rt.toneMapping=$.toneMapping}function _d(D,$,rt,at,J){$.isScene!==!0&&($=Pt),F.resetTextureUnits();const _t=$.fog,Rt=at.isMeshStandardMaterial?$.environment:null,Ut=N===null?_.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Qe,zt=(at.isMeshStandardMaterial?et:L).get(at.envMap||Rt),Wt=at.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,Kt=!!rt.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),kt=!!rt.morphAttributes.position,ee=!!rt.morphAttributes.normal,ge=!!rt.morphAttributes.color;let ve=Ei;at.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ve=_.toneMapping);const en=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,ae=en!==void 0?en.length:0,Bt=St.get(at),Hn=p.state.lights;if(W===!0&&(tt===!0||D!==A)){const cn=D===A&&at.id===w;dt.setState(at,D,cn)}let oe=!1;at.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Hn.state.version||Bt.outputColorSpace!==Ut||J.isBatchedMesh&&Bt.batching===!1||!J.isBatchedMesh&&Bt.batching===!0||J.isBatchedMesh&&Bt.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Bt.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Bt.instancing===!1||!J.isInstancedMesh&&Bt.instancing===!0||J.isSkinnedMesh&&Bt.skinning===!1||!J.isSkinnedMesh&&Bt.skinning===!0||J.isInstancedMesh&&Bt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Bt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Bt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Bt.instancingMorph===!1&&J.morphTexture!==null||Bt.envMap!==zt||at.fog===!0&&Bt.fog!==_t||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==dt.numPlanes||Bt.numIntersection!==dt.numIntersection)||Bt.vertexAlphas!==Wt||Bt.vertexTangents!==Kt||Bt.morphTargets!==kt||Bt.morphNormals!==ee||Bt.morphColors!==ge||Bt.toneMapping!==ve||Bt.morphTargetsCount!==ae)&&(oe=!0):(oe=!0,Bt.__version=at.version);let xn=Bt.currentProgram;oe===!0&&(xn=Tr(at,$,J));let Yi=!1,sn=!1,Hs=!1;const ye=xn.getUniforms(),Pn=Bt.uniforms;if(ft.useProgram(xn.program)&&(Yi=!0,sn=!0,Hs=!0),at.id!==w&&(w=at.id,sn=!0),Yi||A!==D){ft.buffers.depth.getReversed()?(H.copy(D.projectionMatrix),wp(H),Rp(H),ye.setValue(X,"projectionMatrix",H)):ye.setValue(X,"projectionMatrix",D.projectionMatrix),ye.setValue(X,"viewMatrix",D.matrixWorldInverse);const oi=ye.map.cameraPosition;oi!==void 0&&oi.setValue(X,nt.setFromMatrixPosition(D.matrixWorld)),gt.logarithmicDepthBuffer&&ye.setValue(X,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&ye.setValue(X,"isOrthographic",D.isOrthographicCamera===!0),A!==D&&(A=D,sn=!0,Hs=!0)}if(J.isSkinnedMesh){ye.setOptional(X,J,"bindMatrix"),ye.setOptional(X,J,"bindMatrixInverse");const cn=J.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),ye.setValue(X,"boneTexture",cn.boneTexture,F))}J.isBatchedMesh&&(ye.setOptional(X,J,"batchingTexture"),ye.setValue(X,"batchingTexture",J._matricesTexture,F),ye.setOptional(X,J,"batchingIdTexture"),ye.setValue(X,"batchingIdTexture",J._indirectTexture,F),ye.setOptional(X,J,"batchingColorTexture"),J._colorsTexture!==null&&ye.setValue(X,"batchingColorTexture",J._colorsTexture,F));const Gs=rt.morphAttributes;if((Gs.position!==void 0||Gs.normal!==void 0||Gs.color!==void 0)&&Ot.update(J,rt,xn),(sn||Bt.receiveShadow!==J.receiveShadow)&&(Bt.receiveShadow=J.receiveShadow,ye.setValue(X,"receiveShadow",J.receiveShadow)),at.isMeshGouraudMaterial&&at.envMap!==null&&(Pn.envMap.value=zt,Pn.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),at.isMeshStandardMaterial&&at.envMap===null&&$.environment!==null&&(Pn.envMapIntensity.value=$.environmentIntensity),sn&&(ye.setValue(X,"toneMappingExposure",_.toneMappingExposure),Bt.needsLights&&vd(Pn,Hs),_t&&at.fog===!0&&yt.refreshFogUniforms(Pn,_t),yt.refreshMaterialUniforms(Pn,at,S,R,p.state.transmissionRenderTarget[D.id]),ba.upload(X,Ll(Bt),Pn,F)),at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(ba.upload(X,Ll(Bt),Pn,F),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&ye.setValue(X,"center",J.center),ye.setValue(X,"modelViewMatrix",J.modelViewMatrix),ye.setValue(X,"normalMatrix",J.normalMatrix),ye.setValue(X,"modelMatrix",J.matrixWorld),at.isShaderMaterial||at.isRawShaderMaterial){const cn=at.uniformsGroups;for(let oi=0,ci=cn.length;oi<ci;oi++){const Dl=cn[oi];Z.update(Dl,xn),Z.bind(Dl,xn)}}return xn}function vd(D,$){D.ambientLightColor.needsUpdate=$,D.lightProbe.needsUpdate=$,D.directionalLights.needsUpdate=$,D.directionalLightShadows.needsUpdate=$,D.pointLights.needsUpdate=$,D.pointLightShadows.needsUpdate=$,D.spotLights.needsUpdate=$,D.spotLightShadows.needsUpdate=$,D.rectAreaLights.needsUpdate=$,D.hemisphereLights.needsUpdate=$}function yd(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(D,$,rt){St.get(D.texture).__webglTexture=$,St.get(D.depthTexture).__webglTexture=rt;const at=St.get(D);at.__hasExternalTextures=!0,at.__autoAllocateDepthBuffer=rt===void 0,at.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),at.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,$){const rt=St.get(D);rt.__webglFramebuffer=$,rt.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(D,$=0,rt=0){N=D,T=$,P=rt;let at=!0,J=null,_t=!1,Rt=!1;if(D){const zt=St.get(D);if(zt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(X.FRAMEBUFFER,null),at=!1;else if(zt.__webglFramebuffer===void 0)F.setupRenderTarget(D);else if(zt.__hasExternalTextures)F.rebindTextures(D,St.get(D.texture).__webglTexture,St.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const kt=D.depthTexture;if(zt.__boundDepthTexture!==kt){if(kt!==null&&St.has(kt)&&(D.width!==kt.image.width||D.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");F.setupDepthRenderbuffer(D)}}const Wt=D.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(Rt=!0);const Kt=St.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Kt[$])?J=Kt[$][rt]:J=Kt[$],_t=!0):D.samples>0&&F.useMultisampledRTT(D)===!1?J=St.get(D).__webglMultisampledFramebuffer:Array.isArray(Kt)?J=Kt[rt]:J=Kt,I.copy(D.viewport),G.copy(D.scissor),j=D.scissorTest}else I.copy(C).multiplyScalar(S).floor(),G.copy(U).multiplyScalar(S).floor(),j=Y;if(ft.bindFramebuffer(X.FRAMEBUFFER,J)&&at&&ft.drawBuffers(D,J),ft.viewport(I),ft.scissor(G),ft.setScissorTest(j),_t){const zt=St.get(D.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+$,zt.__webglTexture,rt)}else if(Rt){const zt=St.get(D.texture),Wt=$||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,zt.__webglTexture,rt||0,Wt)}w=-1},this.readRenderTargetPixels=function(D,$,rt,at,J,_t,Rt){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=St.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ut=Ut[Rt]),Ut){ft.bindFramebuffer(X.FRAMEBUFFER,Ut);try{const zt=D.texture,Wt=zt.format,Kt=zt.type;if(!gt.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=D.width-at&&rt>=0&&rt<=D.height-J&&X.readPixels($,rt,at,J,Xt.convert(Wt),Xt.convert(Kt),_t)}finally{const zt=N!==null?St.get(N).__webglFramebuffer:null;ft.bindFramebuffer(X.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(D,$,rt,at,J,_t,Rt){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=St.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ut=Ut[Rt]),Ut){const zt=D.texture,Wt=zt.format,Kt=zt.type;if(!gt.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if($>=0&&$<=D.width-at&&rt>=0&&rt<=D.height-J){ft.bindFramebuffer(X.FRAMEBUFFER,Ut);const kt=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,kt),X.bufferData(X.PIXEL_PACK_BUFFER,_t.byteLength,X.STREAM_READ),X.readPixels($,rt,at,J,Xt.convert(Wt),Xt.convert(Kt),0);const ee=N!==null?St.get(N).__webglFramebuffer:null;ft.bindFramebuffer(X.FRAMEBUFFER,ee);const ge=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await Tp(X,ge,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,kt),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,_t),X.deleteBuffer(kt),X.deleteSync(ge),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,$=null,rt=0){D.isTexture!==!0&&(nr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),$=arguments[0]||null,D=arguments[1]);const at=Math.pow(2,-rt),J=Math.floor(D.image.width*at),_t=Math.floor(D.image.height*at),Rt=$!==null?$.x:0,Ut=$!==null?$.y:0;F.setTexture2D(D,0),X.copyTexSubImage2D(X.TEXTURE_2D,rt,0,0,Rt,Ut,J,_t),ft.unbindTexture()},this.copyTextureToTexture=function(D,$,rt=null,at=null,J=0){D.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture function signature has changed."),at=arguments[0]||null,D=arguments[1],$=arguments[2],J=arguments[3]||0,rt=null);let _t,Rt,Ut,zt,Wt,Kt,kt,ee,ge;const ve=D.isCompressedTexture?D.mipmaps[J]:D.image;rt!==null?(_t=rt.max.x-rt.min.x,Rt=rt.max.y-rt.min.y,Ut=rt.isBox3?rt.max.z-rt.min.z:1,zt=rt.min.x,Wt=rt.min.y,Kt=rt.isBox3?rt.min.z:0):(_t=ve.width,Rt=ve.height,Ut=ve.depth||1,zt=0,Wt=0,Kt=0),at!==null?(kt=at.x,ee=at.y,ge=at.z):(kt=0,ee=0,ge=0);const en=Xt.convert($.format),ae=Xt.convert($.type);let Bt;$.isData3DTexture?(F.setTexture3D($,0),Bt=X.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(F.setTexture2DArray($,0),Bt=X.TEXTURE_2D_ARRAY):(F.setTexture2D($,0),Bt=X.TEXTURE_2D),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,$.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,$.unpackAlignment);const Hn=X.getParameter(X.UNPACK_ROW_LENGTH),oe=X.getParameter(X.UNPACK_IMAGE_HEIGHT),xn=X.getParameter(X.UNPACK_SKIP_PIXELS),Yi=X.getParameter(X.UNPACK_SKIP_ROWS),sn=X.getParameter(X.UNPACK_SKIP_IMAGES);X.pixelStorei(X.UNPACK_ROW_LENGTH,ve.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,ve.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,zt),X.pixelStorei(X.UNPACK_SKIP_ROWS,Wt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Kt);const Hs=D.isDataArrayTexture||D.isData3DTexture,ye=$.isDataArrayTexture||$.isData3DTexture;if(D.isRenderTargetTexture||D.isDepthTexture){const Pn=St.get(D),Gs=St.get($),cn=St.get(Pn.__renderTarget),oi=St.get(Gs.__renderTarget);ft.bindFramebuffer(X.READ_FRAMEBUFFER,cn.__webglFramebuffer),ft.bindFramebuffer(X.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let ci=0;ci<Ut;ci++)Hs&&X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,St.get(D).__webglTexture,J,Kt+ci),D.isDepthTexture?(ye&&X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,St.get($).__webglTexture,J,ge+ci),X.blitFramebuffer(zt,Wt,_t,Rt,kt,ee,_t,Rt,X.DEPTH_BUFFER_BIT,X.NEAREST)):ye?X.copyTexSubImage3D(Bt,J,kt,ee,ge+ci,zt,Wt,_t,Rt):X.copyTexSubImage2D(Bt,J,kt,ee,ge+ci,zt,Wt,_t,Rt);ft.bindFramebuffer(X.READ_FRAMEBUFFER,null),ft.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else ye?D.isDataTexture||D.isData3DTexture?X.texSubImage3D(Bt,J,kt,ee,ge,_t,Rt,Ut,en,ae,ve.data):$.isCompressedArrayTexture?X.compressedTexSubImage3D(Bt,J,kt,ee,ge,_t,Rt,Ut,en,ve.data):X.texSubImage3D(Bt,J,kt,ee,ge,_t,Rt,Ut,en,ae,ve):D.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,J,kt,ee,_t,Rt,en,ae,ve.data):D.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,J,kt,ee,ve.width,ve.height,en,ve.data):X.texSubImage2D(X.TEXTURE_2D,J,kt,ee,_t,Rt,en,ae,ve);X.pixelStorei(X.UNPACK_ROW_LENGTH,Hn),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,oe),X.pixelStorei(X.UNPACK_SKIP_PIXELS,xn),X.pixelStorei(X.UNPACK_SKIP_ROWS,Yi),X.pixelStorei(X.UNPACK_SKIP_IMAGES,sn),J===0&&$.generateMipmaps&&X.generateMipmap(Bt),ft.unbindTexture()},this.copyTextureToTexture3D=function(D,$,rt=null,at=null,J=0){return D.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,at=arguments[1]||null,D=arguments[2],$=arguments[3],J=arguments[4]||0),nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,$,rt,at,J)},this.initRenderTarget=function(D){St.get(D).__webglFramebuffer===void 0&&F.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?F.setTextureCube(D,0):D.isData3DTexture?F.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?F.setTexture2DArray(D,0):F.setTexture2D(D,0),ft.unbindTexture()},this.resetState=function(){T=0,P=0,N=null,ft.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}class rl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Dt(t),this.near=e,this.far=n}clone(){return new rl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class B_ extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ff{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Tc,this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ye=new B;class xr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=En(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=En(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=En(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=En(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),s=ue(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),s=ue(s,this.array),r=ue(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new xr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Du=new B,Nu=new Qt,Uu=new Qt,H_=new B,zu=new Ht,Kr=new B,go=new on,ku=new Ht,xo=new zs;class G_ extends te{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ol,this.bindMatrix=new Ht,this.bindMatrixInverse=new Ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ri),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Kr),this.boundingBox.expandByPoint(Kr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new on),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Kr),this.boundingSphere.expandByPoint(Kr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),go.copy(this.boundingSphere),go.applyMatrix4(s),t.ray.intersectsSphere(go)!==!1&&(ku.copy(s).invert(),xo.copy(t.ray).applyMatrix4(ku),!(this.boundingBox!==null&&xo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,xo)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Qt,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Ol?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===qd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Nu.fromBufferAttribute(s.attributes.skinIndex,t),Uu.fromBufferAttribute(s.attributes.skinWeight,t),Du.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=Uu.getComponent(r);if(a!==0){const o=Nu.getComponent(r);zu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(H_.copy(Du).applyMatrix4(zu),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Bf extends Se{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Xi extends De{constructor(t=null,e=1,n=1,s,r,a,o,c,l=He,u=He,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ou=new Ht,V_=new Ht;class al{constructor(t=[],e=[]){this.uuid=Rn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ht)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ht;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:V_;Ou.multiplyMatrices(o,e[r]),Ou.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new al(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Xi(e,t,t,Be,pn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Bf),this.bones.push(a),this.boneInverses.push(new Ht().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const a=e[s];t.bones.push(a.uuid);const o=n[s];t.boneInverses.push(o.toArray())}return t}}class _r extends me{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const cs=new Ht,Fu=new Ht,qr=[],Bu=new ri,W_=new Ht,Ys=new te,Ks=new on;class br extends te{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new _r(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,W_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ri),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,cs),Bu.copy(t.boundingBox).applyMatrix4(cs),this.boundingBox.union(Bu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new on),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,cs),Ks.copy(t.boundingSphere).applyMatrix4(cs),this.boundingSphere.union(Ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ys.geometry=this.geometry,Ys.material=this.material,Ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ks.copy(this.boundingSphere),Ks.applyMatrix4(n),t.ray.intersectsSphere(Ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,cs),Fu.multiplyMatrices(n,cs),Ys.matrixWorld=Fu,Ys.raycast(t,qr);for(let a=0,o=qr.length;a<o;a++){const c=qr[a];c.instanceId=r,c.object=this,e.push(c)}qr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new _r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xi(new Float32Array(s*this.count),s,this.count,jc,pn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Hf extends Cn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ta=new B,wa=new B,Hu=new Ht,qs=new zs,Zr=new on,_o=new B,Gu=new B;class ol extends Se{constructor(t=new se,e=new Hf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ta.fromBufferAttribute(e,s-1),wa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ta.distanceTo(wa);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,t.ray.intersectsSphere(Zr)===!1)return;Hu.copy(s).invert(),qs.copy(t.ray).applyMatrix4(Hu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=l){const p=u.getX(x),M=u.getX(x+1),v=$r(this,t,qs,c,p,M);v&&e.push(v)}if(this.isLineLoop){const x=u.getX(m-1),g=u.getX(f),p=$r(this,t,qs,c,x,g);p&&e.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=l){const p=$r(this,t,qs,c,x,x+1);p&&e.push(p)}if(this.isLineLoop){const x=$r(this,t,qs,c,m-1,f);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function $r(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(Ta.fromBufferAttribute(a,s),wa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ta,wa,_o,Gu)>n)return;_o.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(_o);if(!(c<t.near||c>t.far))return{distance:c,point:Gu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Vu=new B,Wu=new B;class X_ extends ol{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Vu.fromBufferAttribute(e,s),Wu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Vu.distanceTo(Wu);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class j_ extends ol{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Gf extends Cn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Xu=new Ht,Rc=new zs,Jr=new on,Qr=new B;class Y_ extends Se{constructor(t=new se,e=new Gf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,t.ray.intersectsSphere(Jr)===!1)return;Xu.copy(s).invert(),Rc.copy(t.ray).applyMatrix4(Xu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=d,x=f;m<x;m++){const g=l.getX(m);Qr.fromBufferAttribute(h,g),ju(Qr,g,c,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,x=f;m<x;m++)Qr.fromBufferAttribute(h,m),ju(Qr,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ju(i,t,e,n,s,r,a){const o=Rc.distanceSqToPoint(i);if(o<e){const c=new B;Rc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class K_ extends De{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new vt:new B);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new B,s=[],r=[],a=[],o=new B,c=new Ht;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new B)}r[0]=new B,a[0]=new B;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Ce(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ce(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class cl extends kn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new vt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class q_ extends cl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ll(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const ta=new B,vo=new ll,yo=new ll,Mo=new ll;class Z_ extends kn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new B){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(ta.subVectors(s[0],s[1]).add(s[0]),l=ta);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(ta.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=ta),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),vo.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,m,x,g),yo.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,m,x,g),Mo.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(vo.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),yo.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Mo.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(vo.calc(c),yo.calc(c),Mo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new B().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Yu(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function $_(i,t){const e=1-i;return e*e*t}function J_(i,t){return 2*(1-i)*i*t}function Q_(i,t){return i*i*t}function or(i,t,e,n){return $_(i,t)+J_(i,e)+Q_(i,n)}function tv(i,t){const e=1-i;return e*e*e*t}function ev(i,t){const e=1-i;return 3*e*e*i*t}function nv(i,t){return 3*(1-i)*i*i*t}function iv(i,t){return i*i*i*t}function cr(i,t,e,n,s){return tv(i,t)+ev(i,e)+nv(i,n)+iv(i,s)}class Vf extends kn{constructor(t=new vt,e=new vt,n=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new vt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(cr(t,s.x,r.x,a.x,o.x),cr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sv extends kn{constructor(t=new B,e=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new B){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(cr(t,s.x,r.x,a.x,o.x),cr(t,s.y,r.y,a.y,o.y),cr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wf extends kn{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rv extends kn{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xf extends kn{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(or(t,s.x,r.x,a.x),or(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class av extends kn{constructor(t=new B,e=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new B){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(or(t,s.x,r.x,a.x),or(t,s.y,r.y,a.y),or(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jf extends kn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Yu(o,c.x,l.x,u.x,h.x),Yu(o,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var Ku=Object.freeze({__proto__:null,ArcCurve:q_,CatmullRomCurve3:Z_,CubicBezierCurve:Vf,CubicBezierCurve3:sv,EllipseCurve:cl,LineCurve:Wf,LineCurve3:rv,QuadraticBezierCurve:Xf,QuadraticBezierCurve3:av,SplineCurve:jf});class ov extends kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ku[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Ku[s.type]().fromJSON(s))}return this}}class cv extends ov{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Wf(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Xf(this.currentPoint.clone(),new vt(t,e),new vt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Vf(this.currentPoint.clone(),new vt(t,e),new vt(n,s),new vt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new jf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new cl(t,e,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ul extends se{constructor(t=[new vt(0,-.5),new vt(.5,0),new vt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ce(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/e,h=new B,d=new vt,f=new B,m=new B,x=new B;let g=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-g,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(m)}for(let M=0;M<=e;M++){const v=n+M*u*s,_=Math.sin(v),E=Math.cos(v);for(let T=0;T<=t.length-1;T++){h.x=t[T].x*_,h.y=t[T].y,h.z=t[T].x*E,a.push(h.x,h.y,h.z),d.x=M/e,d.y=T/(t.length-1),o.push(d.x,d.y);const P=c[3*T+0]*_,N=c[3*T+1],w=c[3*T+0]*E;l.push(P,N,w)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){const _=v+M*t.length,E=_,T=_+t.length,P=_+t.length+1,N=_+1;r.push(E,T,N),r.push(P,N,T)}this.setIndex(r),this.setAttribute("position",new Gt(a,3)),this.setAttribute("uv",new Gt(o,2)),this.setAttribute("normal",new Gt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.points,t.segments,t.phiStart,t.phiLength)}}class hl extends ul{constructor(t=1,e=1,n=4,s=8){const r=new cv;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new hl(t.radius,t.length,t.capSegments,t.radialSegments)}}class fl extends se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new B,u=new vt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(o,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ge extends se{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;M(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Gt(h,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function M(){const _=new B,E=new B;let T=0;const P=(e-t)/n;for(let N=0;N<=r;N++){const w=[],A=N/r,I=A*(e-t)+t;for(let G=0;G<=s;G++){const j=G/s,q=j*c+o,y=Math.sin(q),b=Math.cos(q);E.x=I*y,E.y=-A*n+g,E.z=I*b,h.push(E.x,E.y,E.z),_.set(y,P,b).normalize(),d.push(_.x,_.y,_.z),f.push(j,1-A),w.push(m++)}x.push(w)}for(let N=0;N<s;N++)for(let w=0;w<r;w++){const A=x[w][N],I=x[w+1][N],G=x[w+1][N+1],j=x[w][N+1];(t>0||w!==0)&&(u.push(A,I,j),T+=3),(e>0||w!==r-1)&&(u.push(I,G,j),T+=3)}l.addGroup(p,T,0),p+=T}function v(_){const E=m,T=new vt,P=new B;let N=0;const w=_===!0?t:e,A=_===!0?1:-1;for(let G=1;G<=s;G++)h.push(0,g*A,0),d.push(0,A,0),f.push(.5,.5),m++;const I=m;for(let G=0;G<=s;G++){const q=G/s*c+o,y=Math.cos(q),b=Math.sin(q);P.x=w*b,P.y=g*A,P.z=w*y,h.push(P.x,P.y,P.z),d.push(0,A,0),T.x=y*.5+.5,T.y=b*.5*A+.5,f.push(T.x,T.y),m++}for(let G=0;G<s;G++){const j=E+G,q=I+G;_===!0?u.push(q,q+1,j):u.push(q+1,q,j),N+=3}l.addGroup(p,N,_===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ge(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ra extends Ge{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ra(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Da extends se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const v=new B,_=new B,E=new B;for(let T=0;T<e.length;T+=3)f(e[T+0],v),f(e[T+1],_),f(e[T+2],E),c(v,_,E,M)}function c(M,v,_,E){const T=E+1,P=[];for(let N=0;N<=T;N++){P[N]=[];const w=M.clone().lerp(_,N/T),A=v.clone().lerp(_,N/T),I=T-N;for(let G=0;G<=I;G++)G===0&&N===T?P[N][G]=w:P[N][G]=w.clone().lerp(A,G/I)}for(let N=0;N<T;N++)for(let w=0;w<2*(T-N)-1;w++){const A=Math.floor(w/2);w%2===0?(d(P[N][A+1]),d(P[N+1][A]),d(P[N][A])):(d(P[N][A+1]),d(P[N+1][A+1]),d(P[N+1][A]))}}function l(M){const v=new B;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(M),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function u(){const M=new B;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];const _=g(M)/2/Math.PI+.5,E=p(M)/Math.PI+.5;a.push(_,1-E)}m(),h()}function h(){for(let M=0;M<a.length;M+=6){const v=a[M+0],_=a[M+2],E=a[M+4],T=Math.max(v,_,E),P=Math.min(v,_,E);T>.9&&P<.1&&(v<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,v){const _=M*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function m(){const M=new B,v=new B,_=new B,E=new B,T=new vt,P=new vt,N=new vt;for(let w=0,A=0;w<r.length;w+=9,A+=6){M.set(r[w+0],r[w+1],r[w+2]),v.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),T.set(a[A+0],a[A+1]),P.set(a[A+2],a[A+3]),N.set(a[A+4],a[A+5]),E.copy(M).add(v).add(_).divideScalar(3);const I=g(E);x(T,A+0,M,I),x(P,A+2,v,I),x(N,A+4,_,I)}}function x(M,v,_,E){E<0&&M.x===1&&(a[v]=M.x-1),_.x===0&&_.z===0&&(a[v]=E/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Da(t.vertices,t.indices,t.radius,t.details)}}class dl extends Da{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new dl(t.radius,t.detail)}}class wi extends Da{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new wi(t.radius,t.detail)}}class Na extends se{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=t;const d=(e-t)/s,f=new B,m=new vt;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}h+=d}for(let x=0;x<s;x++){const g=x*(n+1);for(let p=0;p<n;p++){const M=p+g,v=M,_=M+n+1,E=M+n+2,T=M+1;o.push(v,_,T),o.push(_,E,T)}}this.setIndex(o),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(l,3)),this.setAttribute("uv",new Gt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ua extends se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new B,d=new B,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const M=[],v=p/n;let _=0;p===0&&a===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let E=0;E<=e;E++){const T=E/e;h.x=-t*Math.cos(s+T*r)*Math.sin(a+v*o),h.y=t*Math.cos(a+v*o),h.z=t*Math.sin(s+T*r)*Math.sin(a+v*o),m.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),g.push(T+_,1-v),M.push(l++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const v=u[p][M+1],_=u[p][M],E=u[p+1][M],T=u[p+1][M+1];(p!==0||a>0)&&f.push(v,_,T),(p!==n-1||c<Math.PI)&&f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(x,3)),this.setAttribute("uv",new Gt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ua(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class pl extends Cn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class On extends pl{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new vt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ce(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class si extends Cn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function ea(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function lv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function uv(i){function t(s,r){return i[s]-i[r]}const e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function qu(i,t,e){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=e[r]*t;for(let c=0;c!==t;++c)s[a++]=i[o+c]}return s}function Yf(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push.apply(e,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=i[s++];while(r!==void 0)}class Sr{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break e}a=e.length;break n}if(!(t>=r)){const o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class hv extends Sr{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ds,endingEnd:ds}}intervalChanged_(t,e,n){const s=this.parameterPositions;let r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case ps:r=t,o=2*e-n;break;case Aa:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ps:a=t,c=2*n-e;break;case Aa:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}const l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,M=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,v=(-1-f)*g+(1.5+f)*x+.5*m,_=f*g-f*x;for(let E=0;E!==o;++E)r[E]=p*a[u+E]+M*a[l+E]+v*a[c+E]+_*a[h+E];return r}}class Kf extends Sr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class fv extends Sr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class Fn{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ea(e,this.TimeBufferType),this.values=ea(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ea(t.times,Array),values:ea(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new fv(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Kf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new hv(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case pr:e=this.InterpolantFactoryMethodDiscrete;break;case mr:e=this.InterpolantFactoryMethodLinear;break;case Ha:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return mr;case this.InterpolantFactoryMethodSmooth:return Ha}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&lv(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ha,r=t.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const x=e[h+m];if(x!==e[d+m]||x!==e[f+m]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}}Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=mr;class Os extends Fn{constructor(t,e,n){super(t,e,n)}}Os.prototype.ValueTypeName="bool";Os.prototype.ValueBufferType=Array;Os.prototype.DefaultInterpolation=pr;Os.prototype.InterpolantFactoryMethodLinear=void 0;Os.prototype.InterpolantFactoryMethodSmooth=void 0;class qf extends Fn{}qf.prototype.ValueTypeName="color";class Ls extends Fn{}Ls.prototype.ValueTypeName="number";class dv extends Sr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e);let l=t*o;for(let u=l+o;l!==u;l+=4)_e.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Is extends Fn{InterpolantFactoryMethodLinear(t){return new dv(this.times,this.values,this.getValueSize(),t)}}Is.prototype.ValueTypeName="quaternion";Is.prototype.InterpolantFactoryMethodSmooth=void 0;class Fs extends Fn{constructor(t,e,n){super(t,e,n)}}Fs.prototype.ValueTypeName="string";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=pr;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ds extends Fn{}Ds.prototype.ValueTypeName="vector";class Ns{constructor(t="",e=-1,n=[],s=$c){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Rn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,s=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(mv(n[a]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,a=n.length;r!==a;++r)e.push(Fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){const r=e.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=uv(c);c=qu(c,1,u),l=qu(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Ls(".morphTargetInfluences["+e[o].name+"]",c,l).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=t.length;o<c;o++){const l=t[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,x){if(f.length!==0){const g=[],p=[];Yf(f,g,p,m),g.length!==0&&x.push(new h(d,g,p))}},s=[],r=t.name||"default",a=t.fps||30,o=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(const x in f){const g=[],p=[];for(let M=0;M!==d[m].morphTargets.length;++M){const v=d[m];g.push(v.time),p.push(v.morphTarget===x?1:0)}s.push(new Ls(".morphTargetInfluence["+x+"]",g,p))}c=f.length*a}else{const f=".bones["+e[h].name+"]";n(Ds,f+".position",d,"pos",s),n(Is,f+".quaternion",d,"rot",s),n(Ds,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,s=t.length;n!==s;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function pv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ls;case"vector":case"vector2":case"vector3":case"vector4":return Ds;case"color":return qf;case"quaternion":return Is;case"bool":case"boolean":return Os;case"string":return Fs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function mv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=pv(i.type);if(i.times===void 0){const e=[],n=[];Yf(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const bi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class gv{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],m=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}}const xv=new gv;class Bs{constructor(t){this.manager=t!==void 0?t:xv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Bs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Yn={};class _v extends Error{constructor(t,e){super(t),this.response=e}}class Zf extends Bs{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=bi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Yn[t]!==void 0){Yn[t].push({onLoad:e,onProgress:n,onError:s});return}Yn[t]=[],Yn[t].push({onLoad:e,onProgress:n,onError:s});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Yn[t],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let x=0;const g=new ReadableStream({start(p){M();function M(){h.read().then(({done:v,value:_})=>{if(v)p.close();else{x+=_.byteLength;const E=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:f});for(let T=0,P=u.length;T<P;T++){const N=u[T];N.onProgress&&N.onProgress(E)}p.enqueue(_),M()}},v=>{p.error(v)})}}});return new Response(g)}else throw new _v(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{bi.add(t,l);const u=Yn[t];delete Yn[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=Yn[t];if(u===void 0)throw this.manager.itemError(t),l;delete Yn[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class vv extends Bs{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=bi.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=gr("img");function c(){u(),bi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(h){u(),s&&s(h),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class yv extends Bs{constructor(t){super(t)}load(t,e,n,s){const r=new De,a=new vv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class za extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Mv extends za{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const bo=new Ht,Zu=new B,$u=new B;class ml{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mr,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Zu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zu),$u.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($u),e.updateMatrixWorld(),bo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class bv extends ml{constructor(){super(new qe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Cs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Sv extends za{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new bv}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ju=new Ht,Zs=new B,So=new B;class Av extends ml{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new vt(4,2),this._viewportCount=6,this._viewports=[new Qt(2,1,1,1),new Qt(0,1,1,1),new Qt(3,1,1,1),new Qt(1,1,1,1),new Qt(3,0,1,1),new Qt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Zs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Zs),So.copy(n.position),So.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(So),n.updateMatrixWorld(),s.makeTranslation(-Zs.x,-Zs.y,-Zs.z),Ju.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ju)}}class Ev extends za{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Av}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Tv extends ml{constructor(){super(new nl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $f extends za{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Tv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class lr{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,s=t.length;n<s;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class wv extends se{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Rv extends Bs{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=bi.get(t);if(a!==void 0){if(r.manager.itemStart(t),a.then){a.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return bi.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),bi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});bi.add(t,c),r.manager.itemStart(t)}}class Cv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Qu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Qu(){return performance.now()}class Pv{constructor(t,e,n){this.binding=t,this.valueSize=n;let s,r,a;switch(e){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,s=this.valueSize,r=t*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,s=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=e*this._origIndex;this._mixBufferRegion(n,s,c,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){o.setValue(n,s);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,s=n*this._origIndex;t.getValue(e,s);for(let r=n,a=s;r!==a;++r)e[r]=e[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,s){_e.slerpFlat(t,e,t,e,t,n,s)}_slerpAdditive(t,e,n,s,r){const a=this._workIndex*r;_e.multiplyQuaternionsFlat(t,a,t,e,t,n),_e.slerpFlat(t,e,t,e,t,a,s)}_lerp(t,e,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=e+o;t[c]=t[c]*a+t[n+o]*s}}_lerpAdditive(t,e,n,s,r){for(let a=0;a!==r;++a){const o=e+a;t[o]=t[o]+t[n+a]*s}}}const gl="\\[\\]\\.:\\/",Lv=new RegExp("["+gl+"]","g"),xl="[^"+gl+"]",Iv="[^"+gl.replace("\\.","")+"]",Dv=/((?:WC+[\/:])*)/.source.replace("WC",xl),Nv=/(WCOD+)?/.source.replace("WCOD",Iv),Uv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xl),zv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xl),kv=new RegExp("^"+Dv+Nv+Uv+zv+"$"),Ov=["material","materials","bones","map"];class Fv{constructor(t,e,n){const s=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ce{constructor(t,e,n){this.path=e,this.parsedPath=n||ce.parseTrackName(e),this.node=ce.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ce.Composite(t,e,n):new ce(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Lv,"")}static parseTrackName(t){const e=kv.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Ov.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===e||o.uuid===e)return o;const c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=ce.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[s];if(a===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ce.Composite=Fv;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Bv{constructor(t,e,n=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=s;const r=e.tracks,a=r.length,o=new Array(a),c={endingStart:ds,endingEnd:ds};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Zd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const s=this._clip.duration,r=t._clip.duration,a=r/s,o=s/r;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=t/a,l[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,s){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const c=(t-r)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Jd:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case $c:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(s,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let s=this.time+t,r=this._loopCount;const a=n===$d;if(t===0)return r===-1?s:a&&(r&1)===1?e-s:s;if(n===Zc){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else if(s<0)s=0;else{this.time=s;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=e||s<0){const o=Math.floor(s/e);s-=e*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return e-s}return s}_setEndings(t,e,n){const s=this._interpolantSettings;n?(s.endingStart=ps,s.endingEnd=ps):(t?s.endingStart=this.zeroSlopeAtStart?ps:ds:s.endingStart=Aa,e?s.endingEnd=this.zeroSlopeAtEnd?ps:ds:s.endingEnd=Aa)}_scheduleFading(t,e,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=e,o[1]=r+t,c[1]=n,this}}const Hv=new Float32Array(1);class _l extends Ri{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,s=t._clip.tracks,r=s.length,a=t._propertyBindings,o=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=s[h],f=d.name;let m=u[f];if(m!==void 0)++m.referenceCount,a[h]=m;else{if(m=a[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,f));continue}const x=e&&e._propertyBindings[h].binding.parsedPath;m=new Pv(ce.create(n,f,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,f),a[h]=m}o[h].resultBuffer=m.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,s=t._clip.uuid,r=this._actionsByClip[s];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,s,n)}const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const s=this._actions,r=this._actionsByClip;let a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=s.length,s.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],s=t._cacheIndex;n._cacheIndex=s,e[s]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=t._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),t._byClipCacheIndex=null;const h=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[e];a===void 0&&(a={},s[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Kf(new Float32Array(2),new Float32Array(2),1,Hv),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const s=e||this._root,r=s.uuid;let a=typeof t=="string"?Ns.findByName(s,t):t;const o=a!==null?a.uuid:t,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=$c),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new Bv(this,a,e,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(t,e){const n=e||this._root,s=n.uuid,r=typeof t=="string"?Ns.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,s=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(s,t,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,e[u]=h,e.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[e];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Gv extends Ff{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const th=new Ht;class Vv{constructor(t,e,n=0,s=1/0){this.ray=new zs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new el,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return th.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(th),this}intersectObject(t,e=!0,n=[]){return Cc(t,this,n,e),n.sort(eh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Cc(t[s],this,n,e);return n.sort(eh),n}}function eh(i,t){return i.distance-t.distance}function Cc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Cc(r[a],t,e,!0)}}class nh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ce(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Wv extends Ri{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bc);const ih={type:"change"},vl={type:"start"},Jf={type:"end"},na=new zs,sh=new vi,Xv=Math.cos(70*ei.DEG2RAD),Ie=new B,nn=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ao=1e-6;class jv extends Wv{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xs.ROTATE,MIDDLE:xs.DOLLY,RIGHT:xs.PAN},this.touches={ONE:Mi.ROTATE,TWO:Mi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new _e,this._lastTargetPosition=new B,this._quat=new _e().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new nh,this._sphericalDelta=new nh,this._scale=1,this._panOffset=new B,this._rotateStart=new vt,this._rotateEnd=new vt,this._rotateDelta=new vt,this._panStart=new vt,this._panEnd=new vt,this._panDelta=new vt,this._dollyStart=new vt,this._dollyEnd=new vt,this._dollyDelta=new vt,this._dollyDirection=new B,this._mouse=new vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Kv.bind(this),this._onPointerDown=Yv.bind(this),this._onPointerUp=qv.bind(this),this._onContextMenu=ny.bind(this),this._onMouseWheel=Jv.bind(this),this._onKeyDown=Qv.bind(this),this._onTouchStart=ty.bind(this),this._onTouchMove=ey.bind(this),this._onMouseDown=Zv.bind(this),this._onMouseMove=$v.bind(this),this._interceptControlDown=iy.bind(this),this._interceptControlUp=sy.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ih),this.update(),this.state=pe.NONE}update(t=null){const e=this.object.position;Ie.copy(e).sub(this.target),Ie.applyQuaternion(this._quat),this._spherical.setFromVector3(Ie),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=nn:n>Math.PI&&(n-=nn),s<-Math.PI?s+=nn:s>Math.PI&&(s-=nn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ie.setFromSpherical(this._spherical),Ie.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ie),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ie.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new B(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ie.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(na.origin.copy(this.object.position),na.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(na.direction))<Xv?this.object.lookAt(this.target):(sh.setFromNormalAndCoplanarPoint(this.object.up,this.target),na.intersectPlane(sh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ao||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ao||this._lastTargetPosition.distanceToSquared(this.target)>Ao?(this.dispatchEvent(ih),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?nn/60*this.autoRotateSpeed*t:nn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ie.setFromMatrixColumn(e,0),Ie.multiplyScalar(-t),this._panOffset.add(Ie)}_panUp(t,e){this.screenSpacePanning===!0?Ie.setFromMatrixColumn(e,1):(Ie.setFromMatrixColumn(e,0),Ie.crossVectors(this.object.up,Ie)),Ie.multiplyScalar(t),this._panOffset.add(Ie)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ie.copy(s).sub(this.target);let r=Ie.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Yv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Kv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function qv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jf),this.state=pe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Zv(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case xs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=pe.DOLLY;break;case xs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=pe.ROTATE}break;case xs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(vl)}function $v(i){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Jv(i){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(i.preventDefault(),this.dispatchEvent(vl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Jf))}function Qv(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function ty(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Mi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=pe.TOUCH_ROTATE;break;case Mi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case Mi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=pe.TOUCH_DOLLY_PAN;break;case Mi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(vl)}function ey(i){switch(this._trackPointer(i),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=pe.NONE}}function ny(i){this.enabled!==!1&&i.preventDefault()}function iy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function sy(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ji(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new se;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)h.push(f.getX(m)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=rh(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let x=0;x<a[u].length;++x)f.push(a[u][x][d]);const m=rh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}return c}function rh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new me(a,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,f=u.count;d<f;d++)for(let m=0;m<e;m++){const x=u.getComponent(d,m);o.setComponent(d+h,m,x)}}else a.set(u.array,c);c+=u.count*e}return s!==void 0&&(o.gpuType=s),o}function ah(i,t){if(t===Qd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Ec||t===bf){let e=i.getIndex();if(e===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=e.count-2,s=[];if(t===Ec)for(let a=1;a<=n;a++)s.push(e.getX(0)),s.push(e.getX(a)),s.push(e.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(e.getX(a)),s.push(e.getX(a+1)),s.push(e.getX(a+2))):(s.push(e.getX(a+2)),s.push(e.getX(a+1)),s.push(e.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}class Qf extends Bs{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new ly(e)}),this.register(function(e){return new uy(e)}),this.register(function(e){return new vy(e)}),this.register(function(e){return new yy(e)}),this.register(function(e){return new My(e)}),this.register(function(e){return new fy(e)}),this.register(function(e){return new dy(e)}),this.register(function(e){return new py(e)}),this.register(function(e){return new my(e)}),this.register(function(e){return new cy(e)}),this.register(function(e){return new gy(e)}),this.register(function(e){return new hy(e)}),this.register(function(e){return new _y(e)}),this.register(function(e){return new xy(e)}),this.register(function(e){return new ay(e)}),this.register(function(e){return new by(e)}),this.register(function(e){return new Sy(e)})}load(t,e,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=lr.extractUrlBase(t);a=lr.resolveURL(l,this.path)}else a=lr.extractUrlBase(t);this.manager.itemStart(t);const o=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Zf(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,a,function(u){e(u),r.manager.itemEnd(t)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===td){try{a[$t.KHR_BINARY_GLTF]=new Ay(t)}catch(h){s&&s(h);return}r=JSON.parse(a[$t.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new ky(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case $t.KHR_MATERIALS_UNLIT:a[h]=new oy;break;case $t.KHR_DRACO_MESH_COMPRESSION:a[h]=new Ey(r,this.dracoLoader);break;case $t.KHR_TEXTURE_TRANSFORM:a[h]=new Ty;break;case $t.KHR_MESH_QUANTIZATION:a[h]=new wy;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(t,e){const n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}}function ry(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const $t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ay{constructor(t){this.parser=t,this.name=$t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let s=e.cache.get(n);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new Dt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Qe);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new $f(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ev(u),l.distance=h;break;case"spot":l=new Sv(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,$n(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(e.cache,o,c)})}}class oy{constructor(){this.name=$t.KHR_MATERIALS_UNLIT}getMaterialType(){return $e}extendParams(t,e,n){const s=[];t.color=new Dt(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],Qe),t.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,ke))}return Promise.all(s)}}class cy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class ly{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(e.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new vt(o,o)}return Promise.all(r)}}class uy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class hy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(e.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(e.iridescenceIOR=a.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class fy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new Dt(0,0,0),e.sheenRoughness=0,e.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],Qe)}return a.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",a.sheenColorTexture,ke)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class dy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(e.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class py{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",a.thicknessTexture)),e.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return e.attenuationColor=new Dt().setRGB(o[0],o[1],o[2],Qe),Promise.all(r)}}class my{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class gy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return e.specularColor=new Dt().setRGB(o[0],o[1],o[2],Qe),a.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",a.specularColorTexture,ke)),Promise.all(r)}}class xy{constructor(t){this.parser=t,this.name=$t.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return e.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",a.bumpTexture)),Promise.all(r)}}class _y{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(e.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(e.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class vy{constructor(t){this.parser=t,this.name=$t.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,a)}}class yy{constructor(t){this.parser=t,this.name=$t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class My{constructor(t){this.parser=t,this.name=$t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class by{constructor(t){this.name=$t.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class Sy{constructor(t){this.name=$t.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=e.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==hn.TRIANGLES&&l.mode!==hn.TRIANGLE_STRIP&&l.mode!==hn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const m of h){const x=new Ht,g=new B,p=new _e,M=new B(1,1,1),v=new br(m.geometry,m.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),v.setMatrixAt(_,x.compose(g,p,M));for(const _ in c)if(_==="_COLOR_0"){const E=c[_];v.instanceColor=new _r(E.array,E.itemSize,E.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&m.geometry.setAttribute(_,c[_]);Se.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),f.push(v)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const td="glTF",$s=12,oh={JSON:1313821514,BIN:5130562};class Ay{constructor(t){this.name=$t.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,$s),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==td)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-$s,r=new DataView(t,$s);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===oh.JSON){const l=new Uint8Array(t,$s+a,o);this.content=n.decode(l)}else if(c===oh.BIN){const l=$s+a;this.body=t.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ey{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$t.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Pc[u]||u.toLowerCase();o[h]=a[u]}for(const u in t.attributes){const h=Pc[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[t.attributes[u]],f=bs[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const m in f.attributes){const x=f.attributes[m],g=c[m];g!==void 0&&(x.normalized=g)}h(f)},o,l,Qe,d)})})}}class Ty{constructor(){this.name=$t.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class wy{constructor(){this.name=$t.KHR_MESH_QUANTIZATION}}class ed extends Sr{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let a=0;a!==s;a++)e[a]=n[r+a];return e}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-e,h=(n-e)/u,d=h*h,f=d*h,m=t*l,x=m-l,g=-2*f+3*d,p=f-d,M=1-g,v=p-d+h;for(let _=0;_!==o;_++){const E=a[x+_+o],T=a[x+_+c]*u,P=a[m+_+o],N=a[m+_]*u;r[_]=M*E+v*T+g*P+p*N}return r}}const Ry=new _e;class Cy extends ed{interpolate_(t,e,n,s){const r=super.interpolate_(t,e,n,s);return Ry.fromArray(r).normalize().toArray(r),r}}const hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},bs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ch={9728:He,9729:Oe,9984:ff,9985:ga,9986:er,9987:dn},lh={33071:Un,33648:Sa,10497:Ti},Eo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Py={CUBICSPLINE:void 0,LINEAR:mr,STEP:pr},To={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ly(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new pl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ii})),i.DefaultMaterial}function zi(i,t,e){for(const n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function $n(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function Iy(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(n){const d=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Dy(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ny(i){let t;const e=i.extensions&&i.extensions[$t.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+wo(e.attributes):t=i.indices+":"+wo(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+wo(i.targets[n]);return t}function wo(i){let t="";const e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function Lc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Uy(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const zy=new Ht;class ky{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new ry,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new yv(this.options.manager):this.textureLoader=new Rv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Zf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return zi(r,o,s),$n(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const a=e[s].joints;for(let o=0,c=a.length;o<c;o++)t[a[o]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const a=t[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const s=t(e[n]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[$t.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(lr.resolveURL(e.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){const e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const a=Eo[s.type],o=bs[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new me(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Eo[s.type],l=bs[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let x,g;if(f&&f!==h){const p=Math.floor(d/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let v=e.cache.get(M);v||(x=new l(o,p*f,s.count*f/u),v=new Ff(x,f/u),e.cache.add(M,v)),g=new xr(v,c,d%f/u,m)}else o===null?x=new l(s.count*c):x=new l(o,d,s.count*c),g=new me(x,c,m);if(s.sparse!==void 0){const p=Eo.SCALAR,M=bs[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,E=new M(a[1],v,s.sparse.count*p),T=new l(a[2],_,s.sparse.count*c);o!==null&&(g=new me(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,N=E.length;P<N;P++){const w=E[P];if(g.setX(w,T[P*c]),c>=2&&g.setY(w,T[P*c+1]),c>=3&&g.setZ(w,T[P*c+2]),c>=4&&g.setW(w,T[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,a=e.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(t,r,o)}loadTextureImage(t,e,n){const s=this,r=this.json,a=r.textures[t],o=r.images[e],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=ch[d.magFilter]||Oe,u.minFilter=ch[d.minFilter]||dn,u.wrapS=lh[d.wrapS]||Ti,u.wrapT=lh[d.wrapT]||Ti,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==He&&u.minFilter!==Oe,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const a=s.images[t],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let m=d;e.isImageBitmapLoader===!0&&(m=function(x){const g=new De(x);g.needsUpdate=!0,d(g)}),e.load(lr.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),$n(h,a),h.userData.mimeType=a.mimeType||Uy(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[$t.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[$t.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[$t.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Gf,Cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Hf,Cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return pl}loadMaterial(t){const e=this,n=this.json,s=this.extensions,r=n.materials[t];let a;const o={},c=r.extensions||{},l=[];if(c[$t.KHR_MATERIALS_UNLIT]){const h=s[$t.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,e))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Dt(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Qe),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(o,"map",h.baseColorTexture,ke)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,o)})))}r.doubleSided===!0&&(o.side=Ze);const u=r.alphaMode||To.OPAQUE;if(u===To.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===To.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==$e&&(l.push(e.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new vt(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==$e&&(l.push(e.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==$e){const h=r.emissiveFactor;o.emissive=new Dt().setRGB(h[0],h[1],h[2],Qe)}return r.emissiveTexture!==void 0&&a!==$e&&l.push(e.assignTexture(o,"emissiveMap",r.emissiveTexture,ke)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),$n(h,r),e.associations.set(h,{materials:t}),r.extensions&&zi(s,h,r),h})}createUniqueName(t){const e=ce.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[$t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(c){return uh(c,o,e)})}const a=[];for(let o=0,c=t.length;o<c;o++){const l=t[o],u=Ny(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[$t.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=uh(new se,l,e),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,s=this.extensions,r=n.meshes[t],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?Ly(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(e.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const x=u[f],g=a[f];let p;const M=l[f];if(g.mode===hn.TRIANGLES||g.mode===hn.TRIANGLE_STRIP||g.mode===hn.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new G_(x,M):new te(x,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===hn.TRIANGLE_STRIP?p.geometry=ah(p.geometry,bf):g.mode===hn.TRIANGLE_FAN&&(p.geometry=ah(p.geometry,Ec));else if(g.mode===hn.LINES)p=new X_(x,M);else if(g.mode===hn.LINE_STRIP)p=new ol(x,M);else if(g.mode===hn.LINE_LOOP)p=new j_(x,M);else if(g.mode===hn.POINTS)p=new Y_(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&Dy(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),$n(p,r),g.extensions&&zi(s,p,g),e.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)e.associations.set(h[f],{meshes:t,primitives:f});if(h.length===1)return r.extensions&&zi(s,h[0],r),h[0];const d=new Re;r.extensions&&zi(s,d,r),e.associations.set(d,{meshes:t});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new qe(ei.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new nl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),$n(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Ht;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new al(o,c)})}loadAnimation(t){const e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],m=s.samplers[f.sampler],x=f.target,g=x.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,M=s.parameters!==void 0?s.parameters[m.output]:m.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(m),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],x=h[3],g=h[4],p=[];for(let M=0,v=d.length;M<v;M++){const _=d[M],E=f[M],T=m[M],P=x[M],N=g[M];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const w=n._createAnimationTracks(_,E,T,P,N);if(w)for(let A=0;A<w.length;A++)p.push(w[A])}return new Ns(r,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(t){const e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,zy)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){o.push(l)}),this.nodeCache[t]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Bf:l.length>1?u=new Re:l.length===1?u=l[0]:u=new Se,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),$n(u,r),r.extensions&&zi(n,u,r),r.matrix!==void 0){const h=new Ht;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],s=this,r=new Re;n.name&&(r.name=s.createUniqueName(n.name)),$n(r,n),n.extensions&&zi(e,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof Cn||d instanceof De)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){const a=[],o=t.name?t.name:t.uuid,c=[];mi[r.path]===mi.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(mi[r.path]){case mi.weights:l=Ls;break;case mi.rotation:l=Is;break;case mi.position:case mi.scale:l=Ds;break;default:switch(n.itemSize){case 1:l=Ls;break;case 2:case 3:default:l=Ds;break}break}const u=s.interpolation!==void 0?Py[s.interpolation]:mr,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+mi[r.path],e.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Lc(e.constructor),s=new Float32Array(e.length);for(let r=0,a=e.length;r<a;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const s=this instanceof Is?Cy:ed;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Oy(i,t,e){const n=t.attributes,s=new ri;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),o.normalized){const u=Lc(bs[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const o=new B,c=new B;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=e.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const x=Lc(bs[d.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new on;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function uh(i,t,e){const n=t.attributes,s=[];function r(a,o){return e.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=Pc[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(t.indices!==void 0&&!i.index){const a=e.getDependency("accessor",t.indices).then(function(o){i.setIndex(o)});s.push(a)}return Jt.workingColorSpace!==Qe&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Jt.workingColorSpace}" not supported.`),$n(i,t),Oy(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?Iy(i,t.targets,e):i})}const yl=["rendah","sedang","tinggi"],nd="pulau-tropis:kualitas",Fy={rendah:{maxPixelRatio:1.25,terrainSegments:200,shadows:!1,shadowMapSize:0,softShadows:!1,treeDensity:.75,canopyDetail:0,grass:{radius:70,near:9,density:1.6,blades:4,max:4e3,shadows:!1},caustics:!1,water:{segments:128,detailLayers:1,cloudReflection:!1,wetSand:!1,shoreRes:256}},sedang:{maxPixelRatio:1.5,terrainSegments:256,shadows:!0,shadowMapSize:1024,softShadows:!0,treeDensity:1,canopyDetail:0,grass:{radius:120,near:13,density:2.4,blades:6,max:9e3,shadows:!1},caustics:!0,water:{segments:192,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}},tinggi:{maxPixelRatio:2,terrainSegments:384,shadows:!0,shadowMapSize:2048,softShadows:!0,treeDensity:1.5,canopyDetail:1,grass:{radius:170,near:18,density:3.2,blades:8,max:26e3,shadows:!0},caustics:!0,water:{segments:240,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}}},id=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&window.matchMedia("(pointer: coarse)").matches;function By(){try{return localStorage.getItem(nd)}catch{return null}}function Hy(){const i=new URLSearchParams(location.hash.slice(1)).get("kualitas"),t=new URLSearchParams(location.search).get("kualitas");for(const e of[i,t,By()])if(yl.includes(e))return e;return id?"sedang":"tinggi"}const hh=Hy(),Ae={isMobile:id,level:hh,levels:yl,...Fy[hh]};function Gy(i){if(yl.includes(i)){try{localStorage.setItem(nd,i)}catch{}try{const t=new URL(location.href);t.searchParams.delete("kualitas"),t.hash=`kualitas=${i}`,history.replaceState(null,"",t)}catch{location.hash=`kualitas=${i}`}location.reload()}}function ia(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const fh=i=>i*i*(3-2*i),sa=(i,t)=>(i%t+t)%t;function Vy(i,t,e,n){const s=Math.floor(i),r=Math.floor(t),a=fh(i-s),o=fh(t-r),c=sa(s,e),l=sa(s+1,e),u=sa(r,e),h=sa(r+1,e),d=ia(c,u,n),f=ia(l,u,n),m=ia(c,h,n),x=ia(l,h,n);return d+(f-d)*a+(m-d)*o+(d-f-m+x)*a*o}function gs(i,t,e,n,s){let r=0,a=.5,o=0,c=e;for(let l=0;l<n;l++)r+=a*Vy(i*c,t*c,c,s+l*13),o+=a,a*=.5,c*=2;return r/o}function sd(i){let t=1/0,e=-1/0;for(const s of i)s<t&&(t=s),s>e&&(e=s);const n=1/Math.max(1e-6,e-t);for(let s=0;s<i.length;s++)i[s]=(i[s]-t)*n}function Wy(i,t=256){const e=t*t,n=[new Float32Array(e),new Float32Array(e),new Float32Array(e),new Float32Array(e)];for(let a=0;a<t;a++)for(let o=0;o<t;o++){const c=o/t,l=a/t,u=a*t+o;n[0][u]=gs(c,l,32,3,1),n[1][u]=gs(c,l,8,4,2),n[2][u]=gs(c,l,4,3,3),n[3][u]=1-Math.abs(gs(c,l,6,3,4)*2-1)}n.forEach(sd);const s=new Uint8Array(e*4);for(let a=0;a<e;a++)for(let o=0;o<4;o++)s[a*4+o]=Math.round(n[o][a]*255);const r=new Xi(s,t,t,Be,mn);return r.wrapS=r.wrapT=Ti,r.magFilter=Oe,r.minFilter=dn,r.generateMipmaps=!0,r.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),r.needsUpdate=!0,r}function Xy(i,t=256){const e=new Float32Array(t*t);for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=c/t,u=o/t,h=gs(l,u,6,4,21),d=1-Math.abs(gs(l,u,9,3,37)*2-1);e[o*t+c]=h*.6+d*.4}sd(e);const n=new Uint8Array(t*t*4),s=(o,c)=>e[(c+t)%t*t+(o+t)%t],r=5;for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=-(s(c+1,o)-s(c-1,o))*r,u=-(s(c,o+1)-s(c,o-1))*r,h=Math.hypot(l,u,1),d=(o*t+c)*4;n[d]=Math.round((l/h*.5+.5)*255),n[d+1]=Math.round((u/h*.5+.5)*255),n[d+2]=Math.round((1/h*.5+.5)*255),n[d+3]=255}const a=new Xi(n,t,t,Be,mn);return a.wrapS=a.wrapT=Ti,a.magFilter=Oe,a.minFilter=dn,a.generateMipmaps=!0,a.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),a.needsUpdate=!0,a}function ka(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const jy=(i,t)=>(Math.imul(i|0,73856093)^Math.imul(t|0,19349663))>>>0,dh=(i,t)=>(i+32768)*65536+(t+32768);class Yy{constructor(t=8){this.cell=t,this.cells=new Map,this.maxRadius=0}add(t,e,n,s){const r=dh(Math.floor(t/this.cell),Math.floor(e/this.cell));let a=this.cells.get(r);a||this.cells.set(r,a=[]),a.push({x:t,z:e,radius:n,kind:s}),this.maxRadius=Math.max(this.maxRadius,n)}forEachNear(t,e,n,s){const r=n+this.maxRadius,a=Math.floor((t-r)/this.cell),o=Math.floor((t+r)/this.cell),c=Math.floor((e-r)/this.cell),l=Math.floor((e+r)/this.cell);for(let u=a;u<=o;u++)for(let h=c;h<=l;h++){const d=this.cells.get(dh(u,h));if(d){for(const f of d)if(s(f)===!1)return!1}}return!0}isFree(t,e,n){return this.forEachNear(t,e,n,s=>{const r=s.x-t,a=s.z-e,o=s.radius+n;return r*r+a*a>=o*o})}covered(t,e,n,s=1){return!this.forEachNear(t,e,0,r=>{if(r.kind!==n)return!0;const a=r.x-t,o=r.z-e,c=r.radius*s;return a*a+o*o>=c*c})}}function fn({ground:i,grid:t,kind:e,count:n,seed:s,radius:r,accept:a,area:o=370,cx:c=0,cz:l=0,reserved:u=null}){const h=ka(s),d=[];for(let f=0;d.length<n&&f<n*150;f++){const m=o*Math.sqrt(h()),x=h()*Math.PI*2,g=c+Math.cos(x)*m,p=l+Math.sin(x)*m,M=i.heightAt(g,p);if(!a(g,p,M,i.slopeAt(g,p),h))continue;const v=typeof r=="function"?r(h):r;if(!t.isFree(g,p,v))continue;t.add(g,p,v,e);const _={x:g,y:M,z:p,r:v,a:h(),b:h(),c:h()};u!=null&&u(g,p,v)||d.push(_)}return d}function ra(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const ph=i=>i*i*(3-2*i);function rd(i,t,e=1){const n=Math.floor(i),s=Math.floor(t),r=ph(i-n),a=ph(t-s),o=ra(n,s,e),c=ra(n+1,s,e),l=ra(n,s+1,e),u=ra(n+1,s+1,e);return o+(c-o)*r+(l-o)*a+(o-c-l+u)*r*a}function Qn(i,t,e=4,n=1){let s=0,r=.5,a=1,o=0;for(let c=0;c<e;c++)s+=r*rd(i*a,t*a,n+c*17),o+=r,r*=.5,a*=2.03;return s/o}const Fe=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},be={size:1e3,seaLevel:0,seaFloor:-18,beachTop:2.2,peak:{x:70,z:-60}};function ad(i,t){const e=Math.hypot(i,t),s=230+(Qn(i*.0035+3.1,t*.0035-7.4,3,7)-.5)*220,r=e/s;let a=be.seaFloor+(be.seaFloor*-1-1.2)*Fe(1.38,1.02,r);a+=3.6*Fe(1.04,.87,r);const o=Fe(.92,.45,r),c=Qn(i*.011+10,t*.011-5,5,3);a+=o*o*c*26;const l=i-be.peak.x,u=t-be.peak.z,h=Math.exp(-(l*l+u*u)/(2*75*75)),d=.7+.6*Qn(i*.03,t*.03,4,11);return a+=o*h*70*d,a+=(Qn(i*.08,t*.08,2,21)-.5)*.8*o,a}const Oa=[{id:"kencana",name:"Pulau Kencana",x:-560,z:40,r:255,wobble:.07,hills:7,seed:51},{id:"sawah",name:"Pulau Sawah",x:-660,z:-345,r:100,wobble:.1,hills:3,seed:52},{id:"nelayan",name:"Pulau Nelayan",x:-760,z:360,r:88,wobble:.1,hills:3,seed:53},{id:"pura",name:"Pulau Pura",x:-890,z:110,r:50,wobble:.12,hills:13,seed:54}],xe={x0:-700,x1:-420,z0:-60,z1:140,y:5.5},Ky=[{id:"timur",x:-420,z:40,w:10,axis:"x"},{id:"barat",x:-700,z:110,w:7,axis:"x"},{id:"utara",x:-647,z:-60,w:7,axis:"z"},{id:"selatan",x:-553,z:140,w:8,axis:"z"}],od={x0:-689,x1:-602,z0:-1,z1:81,gate:{x:-602,z:40}},mh={x0:-588,x1:-508,z0:-1,z1:81},qy={x0:-500,x1:-430,z0:-50,z1:31,x:-465,z:-10},Zy={x0:-500,x1:-430,z0:47,z1:82},sr={x:-893,z:110,r:21},gh=[[-694,-54],[-426,-54],[-426,134],[-694,134]],$y=[...gh.map((i,t)=>[...i,...gh[(t+1)%4],5]),[-694,-29,-504,-29,5],[-694,-5,-504,-5,6],[-694,85,-426,85,6],[-694,110,-426,110,5],[-647,-54,-647,-5,5],[-600,-54,-600,-5,5],[-553,-54,-553,-5,5],[-647,85,-647,134,5],[-600,85,-600,134,5],[-553,85,-553,134,5],[-504,-54,-504,134,6],[-420,40,-508,40,10],[-508,40,-602,40,8],[-420,40,-300,40,7],[-553,134,-553,282,6],[-647,-54,-647,-195,5],[-694,110,-800,110,5],[-730,110,-730,228,5]],Jy=[{id:"agung",name:"Jembatan Agung",axis:"x",at:40,from:-360,to:-160,width:7,rise:2.2,stone:!0},{id:"sawah",name:"Jembatan Sawah",axis:"z",at:-646,from:-150,to:-280,width:4.6,rise:1.2},{id:"pura",name:"Jembatan Pura",axis:"x",at:110,from:-770,to:-880,width:4.6,rise:1.2},{id:"nelayan",name:"Jembatan Nelayan",axis:"z",at:-730,from:200,to:300,width:4.6,rise:1.2}],xh=i=>Oa.find(t=>t.id===i);function cd(i,t,e,n,s,r){const a=s-e,o=r-n,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/(a*a+o*o||1)));return Math.hypot(e+a*c-i,n+o*c-t)}function Ss(i,t,e){const n=Math.max(e.x0-i,i-e.x1),s=Math.max(e.z0-t,t-e.z1);return Math.hypot(Math.max(n,0),Math.max(s,0))+Math.min(Math.max(n,s),0)}const Ic=(i,t,e,n=0)=>i>=e.x0-n&&i<=e.x1+n&&t>=e.z0-n&&t<=e.z1+n,ur=-18,aa={x0:-1e3,x1:-180,z0:-500,z1:500},hr=2,Qy=8.5;function tM(i,t,e){const n=t-i.x,s=e-i.z,r=i.r*(1+i.wobble)*1.38,a=n*n+s*s;if(a>r*r)return ur;const o=Qn(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed),c=Math.sqrt(a)/(i.r*(1+(o-.5)*2*i.wobble));let l=ur+(-ur-1.2)*Fe(1.38,1.02,c);l+=3.6*Fe(1.04,.87,c);const u=Fe(.92,.45,c);if(l+=u*u*Qn(t*.012+i.seed,e*.012-i.seed*2,4,i.seed+9)*i.hills,l+=(Qn(t*.08,e*.08,2,21+i.seed)-.5)*.5*u,i.id==="kencana"){const h=(1-Fe(8,35,Ss(t,e,xe)))*Fe(.95,.8,c);l+=(xe.y-l)*h}else if(i.id==="pura"){const h=1-Fe(sr.r*.7,sr.r*1.25,Math.hypot(t-sr.x,e-sr.z));l+=(Qy-l)*h}return l}function eM(i,t){if(i<aa.x0||i>aa.x1||t<aa.z0||t>aa.z1)return ur;let e=ur;for(const n of Oa)e=Math.max(e,tM(n,i,t));return e}function nM(i){return Jy.map(t=>{const e=Math.sign(t.to-t.from),n=a=>t.axis==="x"?i(a,t.at):i(t.at,a);let s=null,r=null;for(let a=t.from;e*(t.to-a)>=0;a+=e*.25){const o=n(a);if(s===null&&o<hr)s=a;else if(s!==null&&o>=hr){r=a;break}}if(s===null||r===null)throw new Error(`ujung ${t.name} tidak ditemukan`);return{...t,a:s,b:r,length:Math.abs(r-s)}})}const Vt={minX:-1125,maxX:500,minZ:-500,maxZ:500};Vt.width=Vt.maxX-Vt.minX;Vt.depth=Vt.maxZ-Vt.minZ;const iM=470*470;function sM(i,t){const e=i*i+t*t<iM?ad(i,t):be.seaFloor;return Math.max(e,eM(i,t))}const rM=(i,t,e=0)=>i>Vt.minX+e&&i<Vt.maxX-e&&t>Vt.minZ+e&&t<Vt.maxZ-e,Si=(i,t)=>Qn(i*.012+40,t*.012-13,3,31);function vr(i,t){const e=Math.hypot(i-be.peak.x,t-be.peak.z);return 1-Fe(150,245,e)}function ld(i){return Fe(16,30,i)*(1-Fe(66,76,i))}function aM(i,t){return{forest:Si(i,t),patch:Qn(i*.045+7,t*.045-3,2,77)}}function _h(i,t,e,n,s,r){if(s<be.beachTop+1.2||s>76||r>1.15)return 0;const a=vr(e,n);if(a<=0)return 0;const o=i>.47&&s<44,c=1-Fe(.42,.52,i),l=Math.max(ld(s)*(o?.35:1),.75*c),u=Fe(.25,.5,t),h=1-Fe(.75,1.15,r),d=Fe(be.beachTop+1.2,be.beachTop+4,s);return a*l*u*h*d}function oM(i,t,e){if(e<be.beachTop)return 0;const n=1-Fe(.42,.52,Si(i,t)),s=Si(i,t)>.47&&e<44;return vr(i,t)*Math.max(ld(e)*(s?.4:1),.75*n)}const fr=1e20;function vh(i,t,e,n,s){let r=0;n[0]=0,s[0]=-fr,s[1]=fr;for(let a=1;a<t;a++){let o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);for(;o<=s[r];)r--,o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);r++,n[r]=a,s[r]=o,s[r+1]=fr}r=0;for(let a=0;a<t;a++){for(;s[r+1]<a;)r++;e[a]=(a-n[r])*(a-n[r])+i[n[r]]}}function yh(i,t,e){const n=Math.max(t,e),s=new Float64Array(n),r=new Float64Array(n),a=new Int32Array(n),o=new Float64Array(n+1);for(let c=0;c<t;c++){for(let l=0;l<e;l++)s[l]=i[l*t+c];vh(s,e,r,a,o);for(let l=0;l<e;l++)i[l*t+c]=r[l]}for(let c=0;c<e;c++){for(let l=0;l<t;l++)s[l]=i[c*t+l];vh(s,t,r,a,o);for(let l=0;l<t;l++)i[c*t+l]=r[l]}}function cM(i,t=512){const e=be.size/t,n=Math.round(Vt.width/e),s=Math.round(Vt.depth/e),r=n*s,a=new Float32Array(r),o=new Float64Array(r),c=new Float64Array(r);for(let f=0;f<s;f++)for(let m=0;m<n;m++){const x=f*n+m,g=i.heightAt(Vt.minX+(m+.5)*e,Vt.minZ+(f+.5)*e);a[x]=g,o[x]=g>0?0:fr,c[x]=g>0?fr:0}yh(o,n,s),yh(c,n,s);const l=new Float32Array(r);for(let f=0;f<r;f++)l[f]=a[f]>0?-(Math.sqrt(c[f])-.5)*e:(Math.sqrt(o[f])-.5)*e;for(let f=1;f<s-1;f++)for(let m=1;m<n-1;m++){const x=f*n+m;if(Math.abs(l[x])>3*e)continue;const g=(a[x+1]-a[x-1])/(2*e),p=(a[x+n]-a[x-n])/(2*e),M=Math.hypot(g,p);M>.02&&(l[x]=Math.max(-3*e,Math.min(3*e,-a[x]/M)))}const u=Wp.toHalfFloat,h=new Uint16Array(r*4);for(let f=0;f<s;f++)for(let m=0;m<n;m++){const x=f*n+m,g=l[Math.min(n-1,m+1)+f*n]-l[Math.max(0,m-1)+f*n],p=l[m+Math.min(s-1,f+1)*n]-l[m+Math.max(0,f-1)*n],M=Math.hypot(g,p)||1;h[x*4]=u(a[x]),h[x*4+1]=u(Math.max(-60,Math.min(600,l[x]))),h[x*4+2]=u(g/M),h[x*4+3]=u(p/M)}const d=new Xi(h,n,s,Be,Us);return d.magFilter=Oe,d.minFilter=Oe,d.wrapS=d.wrapT=Un,d.needsUpdate=!0,{texture:d,width:n,height:s,cell:e,heights:a,distance:l}}const Ml={value:0},bl=`
const float WAVE_LEN = 15.0;   // jarak antar puncak ombak (m)
const float WAVE_SPEED = 2.4;  // kecepatan ombak menuju pantai (m/s)
const float WAVE_AMP = 0.5;    // tinggi ombak maksimum (m)

// profil satu ombak: muka depan curam menghadap pantai (u kecil), punggung landai
float waveProfile(float u) {
  return smoothstep(0.0, 0.12, u) * (1.0 - smoothstep(0.12, 1.0, u));
}

// fase ombak pada jarak s (m) dari pantai; ph = geser fase lokal
float wavePhase(float s, float ph, float t) {
  return fract((s + t * WAVE_SPEED) / WAVE_LEN + ph);
}

// tinggi ombak: muncul ±65 m dari pantai, membesar saat mendekat (laut makin dangkal)
float waveAmp(float s, float sets) {
  return WAVE_AMP * sets * smoothstep(65.0, 35.0, s) * (0.55 + 0.45 * smoothstep(24.0, 4.0, s));
}

// variasi lokal sepanjang pantai: x = geser fase (puncak ombak berkelok), y = kekuatan (set ombak)
vec2 waveLocal(sampler2D noiseTex, vec2 p, float t) {
  float ph = textureLod(noiseTex, p * 0.0023, 0.0).b * 1.7 + textureLod(noiseTex, p * 0.0091 + 0.53, 0.0).g * 0.6;
  float sets = 0.72 + 0.28 * sin(t * 0.33 + textureLod(noiseTex, p * 0.0031 + 0.37, 0.0).g * 12.0);
  return vec2(ph, sets);
}

// ketinggian air di garis pantai: naik cepat saat ombak tiba, surut perlahan
float swashLevel(vec2 local, float t) {
  return waveAmp(0.0, local.y) * waveProfile(wavePhase(0.0, local.x, t));
}
`;function Mh(i,{heightFn:t=sM,rect:e=Vt}={}){const n=be.size/i,s=Math.round((e.maxX-e.minX)/n),r=Math.round((e.maxZ-e.minZ)/n),a=s+1,o=e.minX,c=e.minZ,l=new Float32Array(a*(r+1));for(let v=0;v<=r;v++)for(let _=0;_<=s;_++)l[v*a+_]=t(o+_*n,c+v*n);function u(v,_){const E=(v-o)/n,T=(_-c)/n;if(E<0||T<0||E>=s||T>=r)return t(v,_);const P=Math.floor(E),N=Math.floor(T),w=E-P,A=T-N,I=l[N*a+P],G=l[(N+1)*a+P],j=l[(N+1)*a+P+1],q=l[N*a+P+1];return w+A<=1?I+(q-I)*w+(G-I)*A:j+(G-j)*(1-w)+(q-j)*(1-A)}function h(v,_){const E=u(v,_);return Math.hypot(u(v+1,_)-E,u(v,_+1)-E)}const d=16,f=new Map,m=(v,_)=>(v+32768)*65536+(_+32768);let x=[];function g(v,_,E){const T=_-v.x,P=E-v.z,N=T*v.cos-P*v.sin,w=T*v.sin+P*v.cos;if(Math.abs(N)>v.hx||Math.abs(w)>v.hz)return-1/0;const A=(w+v.hz)/(2*v.hz);return v.y0+(v.y1-v.y0)*A+(v.arch?v.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(A-v.a0)/(v.a1-v.a0)))):0)}function p(v,_){const E=u(v,_);if(!x.length)return E;const T=f.get(m(Math.floor(v/d),Math.floor(_/d)));if(!T)return E;let P=E;for(const N of T){const w=g(N,v,_);w>P&&(P=w)}return P}function M(v){x=v.map(_=>({a0:0,a1:1,arch:0,..._,cos:Math.cos(_.rot||0),sin:Math.sin(_.rot||0)})),f.clear();for(const _ of x){const E=Math.hypot(_.hx,_.hz);for(let T=Math.floor((_.x-E)/d);T<=Math.floor((_.x+E)/d);T++)for(let P=Math.floor((_.z-E)/d);P<=Math.floor((_.z+E)/d);P++){const N=m(T,P);f.has(N)||f.set(N,[]),f.get(N).push(_)}}}return{step:n,nx:s,nz:r,cols:a,x0:o,z0:c,heights:l,heightAt:u,slopeAt:h,surfaceAt:p,setSurfaces:M,get surfaces(){return x},surfaceHeight:g}}const lM=`
attribute vec2 aSurface; // x = oklusi (gelap di bawah pohon), y = padang rumput
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;
`,uM=`
uniform sampler2D uNoise;
uniform float uBeachTop;
uniform float uWaveTime;
${bl}
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;

const vec3 DEEP_SAND = vec3(0.47, 0.37, 0.22);
const vec3 WET_SAND = vec3(0.62, 0.50, 0.30);
const vec3 SAND = vec3(0.83, 0.72, 0.47);
const vec3 GRASS = vec3(0.24, 0.47, 0.12);
const vec3 GRASS_DARK = vec3(0.11, 0.30, 0.08);
const vec3 MEADOW = vec3(0.32, 0.52, 0.12);
const vec3 DRY = vec3(0.60, 0.58, 0.26);
const vec3 ROCK = vec3(0.42, 0.39, 0.35);
const vec3 ROCK_DARK = vec3(0.26, 0.24, 0.22);

#ifdef REGION_MASK
// Masker Kepulauan Kencana: r = jalan tanah, g = sawah, b = lantai batu, a = rumput halus
uniform sampler2D uRegion;
uniform vec4 uRegionRect; // x0, z0, 1/lebar, 1/panjang
const vec3 ROAD = vec3(0.60, 0.49, 0.33);
const vec3 PAVE = vec3(0.60, 0.56, 0.50);
const vec3 LAWN = vec3(0.27, 0.52, 0.12);
const vec3 RICE = vec3(0.36, 0.62, 0.09);
const vec3 RICE_RIPE = vec3(0.74, 0.62, 0.20);
const vec3 PADDY_WATER = vec3(0.30, 0.42, 0.40);
const vec3 DIKE = vec3(0.40, 0.42, 0.20);

// 1 di garis kisi (tiap cell m, tebal w m), memudar halus saat garis lebih rapat dari piksel
float gridLine(vec2 p, vec2 cell, float w) {
  vec2 q = p / cell;
  vec2 d = abs(fract(q + 0.5) - 0.5) * cell; // jarak ke garis terdekat (m)
  vec2 aa = fwidth(p) + 1e-4;
  vec2 l = 1.0 - smoothstep(vec2(w) - aa, vec2(w) + aa, d);
  float fade = 1.0 - smoothstep(0.2, 0.6, max(aa.x, aa.y) / w);
  return max(l.x, l.y) * fade;
}

vec3 regionColor(vec3 col, vec2 p, float nF, float nM, float nD) {
  vec2 ruv = (p - uRegionRect.xy) * uRegionRect.zw;
  if (ruv.x <= 0.0 || ruv.x >= 1.0 || ruv.y <= 0.0 || ruv.y >= 1.0) return col;
  vec4 m = texture2D(uRegion, ruv);
  // rumput halus (alun-alun, halaman): hijau rata dengan jalur bekas pangkasan
  float stripe = 0.94 + 0.06 * step(0.5, fract(p.x * 0.125));
  col = mix(col, LAWN * stripe * (0.9 + 0.2 * nF), m.a);
  // sawah: petak 12×8 m dibatasi pematang, tiap petak beda umur padinya
  if (m.g > 0.01) {
    vec2 plot = floor(p / vec2(12.0, 8.0));
    float age = texture2D(uNoise, (plot + 0.5) * 0.173).g;
    float rows = 0.5 + 0.5 * sin(p.y * 20.9 + p.x * 0.3);
    rows = mix(0.5, rows, 1.0 - smoothstep(0.02, 0.06, fwidth(p.y)));
    vec3 rice = mix(RICE, RICE_RIPE, smoothstep(0.62, 0.78, age));
    float water = (1.0 - smoothstep(0.2, 0.5, age)) * (0.55 + 0.45 * rows);
    vec3 paddy = mix(rice * (0.82 + 0.3 * rows), PADDY_WATER, water * 0.6) * (0.9 + 0.2 * nF);
    paddy = mix(paddy, DIKE * (0.85 + 0.3 * nD), gridLine(p, vec2(12.0, 8.0), 0.35));
    col = mix(col, paddy, m.g);
  }
  // jalan tanah: coklat muda, sedikit belang
  col = mix(col, ROAD * (0.86 + 0.22 * nM) * (0.9 + 0.2 * nD), m.r);
  // lantai batu: ubin 1,2 m bernat gelap, warna tiap ubin sedikit beda
  if (m.b > 0.01) {
    vec2 tile = floor(p / 1.2);
    float tv = texture2D(uNoise, (tile + 0.5) * 0.37).r;
    vec3 pave = PAVE * (0.82 + 0.3 * tv) * (0.94 + 0.12 * nD);
    pave *= 1.0 - 0.35 * gridLine(p, vec2(1.2), 0.04);
    col = mix(col, pave, m.b);
  }
  return col;
}
#endif

vec3 terrainColor() {
  vec2 p = vWorldPos.xz;
  float h = vWorldPos.y;
  float slope = 1.0 - clamp(normalize(vWorldNrm).y, 0.0, 1.0);
  float nF = texture2D(uNoise, p * 0.055).r;     // butiran ±0.5 m
  float nM = texture2D(uNoise, p * 0.0173).g;    // variasi ±10 m
  float nL = texture2D(uNoise, p * 0.0037).b;    // bercak besar ±60 m
  float nD = texture2D(uNoise, p * 0.37).r;      // detail halus ±8 cm (tajam dari kamera atas)

  // pasir: basah di tepi air, kering di atasnya, lebih gelap di dasar laut
  vec3 sand = mix(WET_SAND, SAND, smoothstep(-0.2, 1.0, h + (nM - 0.5) * 0.8));
  sand = mix(DEEP_SAND, sand, smoothstep(-6.0, -0.3, h));
  sand *= (0.9 + 0.2 * nF) * (0.92 + 0.16 * nD);
#ifdef WAVE_WET_SAND
  // pasir yang baru dijilat ombak tetap gelap (basah) sebentar setelah air surut
  if (h > -0.4 && h < 1.0) {
    vec2 loc = waveLocal(uNoise, p, uWaveTime);
    float top = max(swashLevel(loc, uWaveTime),
      max(swashLevel(loc, uWaveTime - 1.3) * 0.9, swashLevel(loc, uWaveTime - 2.8) * 0.75));
    sand *= mix(1.0, 0.66, 1.0 - smoothstep(top - 0.03, top + 0.05, h));
  }
#endif

  // rumput/hutan: bercak terang-gelap, lebih kekuningan di padang sekitar gunung
  vec3 grass = mix(GRASS, GRASS_DARK, smoothstep(0.3, 0.75, nL + (nM - 0.5) * 0.4));
  grass = mix(grass, MEADOW, vSurface.y * 0.7);
  grass = mix(grass, DRY, vSurface.y * smoothstep(0.55, 0.85, nM) * 0.45);
  grass *= (0.86 + 0.28 * nF) * (0.88 + 0.24 * nD);

  // batu: lereng curam dan dekat puncak
  vec3 rock = mix(ROCK, ROCK_DARK, smoothstep(0.3, 0.8, nM));
  rock *= (0.8 + 0.4 * nF) * (0.9 + 0.2 * nD);

  float edge = uBeachTop + (nM - 0.5) * 1.6;
  vec3 col = mix(sand, grass, smoothstep(edge - 0.3, edge + 0.3, h));
  float rocky = max(
    smoothstep(0.32, 0.42, slope + (nM - 0.5) * 0.12),
    smoothstep(70.0, 80.0, h + (nL - 0.5) * 14.0)
  );
  rocky *= smoothstep(uBeachTop, uBeachTop + 1.5, h);
  col = mix(col, rock, rocky);
#ifdef REGION_MASK
  col = regionColor(col, p, nF, nM, nD);
#endif

  return col * vSurface.x;
}
`,ls=64,hM=-12,fM=-18.4;function dM(i){const{nx:t,nz:e,cols:n,heights:s,step:r}=i,a=new Float32Array(n*(e+1)*3),o=(l,u,h,d)=>{a[l*3]+=u,a[l*3+1]+=h,a[l*3+2]+=d},c=r*r;for(let l=0;l<e;l++)for(let u=0;u<t;u++){const h=l*n+u,d=h+n,f=d+1,m=h+1,x=r*(s[h]-s[m]),g=r*(s[h]-s[d]);o(h,x,c,g),o(d,x,c,g),o(m,x,c,g);const p=r*(s[d]-s[f]),M=r*(s[m]-s[f]);o(d,p,c,M),o(f,p,c,M),o(m,p,c,M)}for(let l=0;l<a.length;l+=3){const u=Math.hypot(a[l],a[l+1],a[l+2])||1;a[l]/=u,a[l+1]/=u,a[l+2]/=u}return a}function pM(i,{noiseTexture:t,quality:e,region:n=null}){const{nx:s,nz:r,cols:a,heights:o,x0:c,z0:l,step:u}=i,h=dM(i),d=new Float32Array(a*(r+1)*2);for(let v=0;v<=r;v++)for(let _=0;_<=s;_++){const E=v*a+_;d[E*2]=1,d[E*2+1]=oM(c+_*u,l+v*u,o[E])}const f=new si({color:16777215});f.defines={},e.water.wetSand&&(f.defines.WAVE_WET_SAND=""),n&&(f.defines.REGION_MASK=""),f.onBeforeCompile=v=>{v.uniforms.uNoise={value:t},v.uniforms.uBeachTop={value:be.beachTop},v.uniforms.uWaveTime=Ml,n&&(v.uniforms.uRegion={value:n.texture},v.uniforms.uRegionRect={value:new Qt(n.x0,n.z0,1/n.width,1/n.depth)}),v.vertexShader=lM+v.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
      vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
      vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);
      vSurface = aSurface;`),v.fragmentShader=uM+v.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb *= terrainColor();`)};const m=new Re;m.name="terrain";const x=[];for(let v=0;v<r;v+=ls)for(let _=0;_<s;_+=ls){const E=Math.min(s,_+ls),T=Math.min(r,v+ls),P=E-_+1,N=T-v+1;let w=-1/0;for(let R=v;R<=T;R++)for(let S=_;S<=E;S++)w=Math.max(w,o[R*a+S]);if(w<hM)continue;const A=new Float32Array(P*N*3),I=new Float32Array(P*N*3),G=new Int32Array(P*N);for(let R=v;R<=T;R++)for(let S=_;S<=E;S++){const z=(R-v)*P+(S-_),O=R*a+S;A[z*3]=c+S*u,A[z*3+1]=o[O],A[z*3+2]=l+R*u,I.set(h.subarray(O*3,O*3+3),z*3),G[z]=O}const j=[];for(let R=0;R<N-1;R++)for(let S=0;S<P-1;S++){const z=R*P+S,O=z+P;j.push(z,O,z+1,O,O+1,z+1)}const q=new se;q.setAttribute("position",new me(A,3)),q.setAttribute("normal",new me(I,3));const y=new me(new Float32Array(P*N*2),2);q.setAttribute("aSurface",y),q.setIndex(j),q.computeBoundingSphere();const b=new te(q,f);b.name=`terrain-${_/ls}-${v/ls}`,b.receiveShadow=e.shadows,m.add(b),x.push({surf:y,map:G})}const g=new ai(Vt.width,Vt.depth).rotateX(-Math.PI/2);g.translate(Vt.minX+Vt.width/2,fM,Vt.minZ+Vt.depth/2),g.deleteAttribute("uv"),g.setAttribute("aSurface",new me(new Float32Array([1,0,1,0,1,0,1,0]),2));const p=new te(g,f);p.name="dasar-laut",m.add(p);function M(){for(const v of x){const _=v.surf.array;for(let E=0;E<v.map.length;E++)_[E*2]=d[v.map[E]*2],_[E*2+1]=d[v.map[E]*2+1];v.surf.needsUpdate=!0}}return M(),m.userData.applyOcclusion=v=>{for(const _ of v){const E=_.radius,T=Math.max(0,Math.floor((_.x-E-c)/u)),P=Math.min(s,Math.ceil((_.x+E-c)/u)),N=Math.max(0,Math.floor((_.z-E-l)/u)),w=Math.min(r,Math.ceil((_.z+E-l)/u));for(let A=N;A<=w;A++)for(let I=T;I<=P;I++){const G=c+I*u-_.x,j=l+A*u-_.z,q=1-(G*G+j*j)/(E*E);if(q<=0)continue;const y=(A*a+I)*2;d[y]=Math.max(.5,d[y]*(1-_.strength*q*q))}}M()},m.userData.chunks=m.children.length-1,m}const mM=`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform float uWaveTime;
uniform vec4 uWorld; // minX, minZ, maxX, maxZ (area data pantai)
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal; // fase & kekuatan ombak lokal (berubah pelan, cukup per vertex)
${bl}

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec2 p = world.xz;
  vec2 uv = (p - uWorld.xy) / (uWorld.zw - uWorld.xy);
  bool inside = uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0;
  float s = inside ? textureLod(uShore, uv, 0.0).g : 600.0;
  vec2 local = waveLocal(uNoise, p, uWaveTime);
  vLocal = local;

  float y;
  if (s < 0.0) {
    // di atas pasir: permukaan air pantai naik-turun; tanah menutupinya bila lebih tinggi
    y = s > -14.0 ? swashLevel(local, uWaveTime) : -3.0;
  } else {
    float u = wavePhase(s, local.x, uWaveTime);
    // puncak di lepas pantai sedikit diratakan di geometri (grid lebih kasar dari ombak);
    // bentuk tajamnya digambar di fragment shader. Dekat garis pantai permukaan menyatu
    // dengan tinggi air di pasir, supaya tepi air di pasir tetap mulus (tidak bergerigi).
    float crestY = waveAmp(s, local.y) * waveProfile(u) * 0.45;
    y = mix(swashLevel(local, uWaveTime), crestY, smoothstep(0.0, 9.0, s));
  }
  // alun lembut di laut lepas
  y += (sin(dot(p, vec2(0.021, 0.008)) + uWaveTime * 0.7) * 0.16
    + sin(dot(p, vec2(-0.012, 0.023)) + uWaveTime * 0.55) * 0.1) * smoothstep(30.0, 120.0, s);
  // di luar area dunia (sel grid makin besar) air dibuat datar (60 m terakhir memudar)
  vec2 out2 = max(uWorld.xy - p, p - uWorld.zw);
  float edge = 1.0 - smoothstep(-60.0, 0.0, max(out2.x, out2.y));
  world.y += y * edge;

  vWorld = world.xyz;
  vec4 mv = viewMatrix * world;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,gM=`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform sampler2D uNormal;
uniform float uWaveTime;
uniform vec4 uWorld;
uniform vec3 uShallow;
uniform vec3 uDeep;
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal;
${bl}

// warna langit pada arah pantulan r (gradasi + awan, sama seperti kubah langit)
vec3 skyReflection(vec3 r) {
  vec3 c = mix(uHorizon, uZenith, pow(max(r.y, 0.0), 0.5));
#ifdef CLOUD_REFLECTION
  vec2 cuv = r.xz / (r.y + 0.15) * 0.22 + vec2(uWaveTime * 0.0025, uWaveTime * 0.001);
  float n = texture2D(uNoise, cuv).b * 0.62 + texture2D(uNoise, cuv * 2.9 + 0.31).g * 0.28 + 0.05;
  float cover = smoothstep(0.5, 0.74, n) * smoothstep(0.0, 0.16, r.y);
  c = mix(c, vec3(0.86, 0.9, 0.95), cover * 0.85);
#endif
  return c;
}

void main() {
  vec2 p = vWorld.xz;
  vec2 uv = (p - uWorld.xy) / (uWorld.zw - uWorld.xy);
  vec4 sh = vec4(-18.0, 600.0, 0.0, 1.0);
  if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) sh = texture2D(uShore, uv);
  float ground = sh.r;                        // tinggi dasar/pasir di bawah air
  float s = sh.g;                             // jarak ke garis pantai (+ di laut)
  vec2 dir = sh.ba / max(length(sh.ba), 1e-3); // arah ke laut lepas
  float depth = max(-ground, 0.0);            // kedalaman laut saat tenang
  float water = vWorld.y - ground;            // tebal air saat ini (ikut ombak)
  float far = smoothstep(80.0, 900.0, vFogDepth);
  // garis ombak memudar dari jauh (dari udara pulau tidak tampak dikelilingi "garis kontur")
  float waveFade = 1.0 - 0.8 * smoothstep(120.0, 560.0, vFogDepth);

  // --- ombak pantai: fase, tinggi, kemiringan
  float sc = max(s, 0.0);
  float u = wavePhase(sc, vLocal.x, uWaveTime);
  float amp = waveAmp(sc, vLocal.y);
  // kemiringan ombak (dilebihkan sedikit untuk pencahayaan agar ombak terbaca dari jauh)
  float slope = 1.6 * waveFade * amp * (waveProfile(fract(u + 0.02)) - waveProfile(fract(u - 0.02))) / (0.04 * WAVE_LEN);

  // --- normal permukaan: alun + ombak pantai + riak (tekstur normal)
  vec2 g = vec2(0.021, 0.008) * cos(dot(p, vec2(0.021, 0.008)) + uWaveTime * 0.7) * 0.16
    + vec2(-0.012, 0.023) * cos(dot(p, vec2(-0.012, 0.023)) + uWaveTime * 0.55) * 0.1;
  g *= smoothstep(30.0, 120.0, s);
  g += dir * slope;
  vec2 ripple = texture2D(uNormal, p * 0.045 + vec2(uWaveTime * 0.021, uWaveTime * 0.013)).xy * 2.0 - 1.0;
#if DETAIL_LAYERS > 1
  ripple += texture2D(uNormal, p * 0.083 + vec2(-uWaveTime * 0.017, uWaveTime * 0.024)).xy * 2.0 - 1.0;
  ripple *= 0.6;
#endif
  ripple *= mix(0.5, 0.18, far);
  vec3 n = normalize(vec3(-g.x + ripple.x, 1.0, -g.y + ripple.y));

  vec3 V = normalize(cameraPosition - vWorld);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, V), 0.0), 5.0);
  vec3 R = reflect(-V, n);
  R.y = abs(R.y);
  vec3 refl = skyReflection(R);

  // warna badan air: toska di dangkal → biru tua di laut dalam
  vec3 body = mix(uShallow, uDeep, smoothstep(0.5, 12.0, depth));
  // puncak ombak lebih terang (cahaya menembus air tipis), lembah sedikit lebih gelap;
  // puncak putus-putus sepanjang pantai dan lebih samar dari jauh agar tidak seperti garis kontur
  float breakup = smoothstep(0.2, 0.6, texture2D(uNoise, p * 0.013 + 0.71).g);
  float shade = (amp / WAVE_AMP) * waveFade * mix(0.45, 1.0, breakup);
  body = body * (1.0 - 0.1 * shade * (1.0 - waveProfile(u)) * (1.0 - smoothstep(4.0, 10.0, depth)))
    + uShallow * waveProfile(u) * shade * 0.5;
#ifdef CAUSTICS
  vec2 cp = p * 0.045;
  float c1 = texture2D(uNoise, cp + vec2(uWaveTime * 0.011, uWaveTime * 0.007)).a;
  float c2 = texture2D(uNoise, cp * 1.37 + vec2(-uWaveTime * 0.009, uWaveTime * 0.012)).a;
  float caustic = pow(smoothstep(0.55, 1.0, 1.0 - abs(c1 - c2)), 3.0);
  body += vec3(0.85, 1.0, 0.95) * caustic * 0.3 * (1.0 - smoothstep(0.6, 8.0, depth)) * (1.0 - far);
#endif
  vec3 col = mix(body, refl, fres);

  // kilau matahari: pantulan tajam + kilauan lebar yang lembut
  vec3 H = normalize(uSunDir + V);
  float NdotH = max(dot(n, H), 0.0);
  col += uSunColor * (pow(NdotH, 320.0) * 2.6 + pow(NdotH, 48.0) * 0.07);

  // --- buih
  float lace = texture2D(uNoise, p * 0.19 + dir * u * 0.6 + vec2(uWaveTime * 0.012, 0.0)).r * 0.65
    + texture2D(uNoise, p * 0.47 - dir * u * 0.9).r * 0.35;
  float strength = amp / WAVE_AMP;
  // 1) ombak pecah: muka depan putih + jejak buih di belakangnya, dekat pantai
  float breaking = smoothstep(28.0, 9.0, s) * smoothstep(-0.5, 1.5, s) * sqrt(strength);
  float front = smoothstep(0.0, 0.04, u) * (1.0 - smoothstep(0.1, 0.42, u));
  float foam = breaking * front * smoothstep(0.4, 0.75, lace * 0.95 + front * 0.25);
  // 2) garis putih tipis di puncak ombak yang masih di tengah (belum pecah)
  float whitecap = smoothstep(0.07, 0.11, u) * (1.0 - smoothstep(0.12, 0.2, u));
  foam = max(foam, whitecap * smoothstep(50.0, 24.0, s) * strength * breakup * smoothstep(0.3, 0.6, lace) * 0.6 * waveFade);
  // 3) air yang naik ke pasir berbuih, dengan garis buih di ujungnya
  float swash = (1.0 - smoothstep(0.0, 0.3, water)) * (1.0 - smoothstep(0.0, 6.0, s));
  foam = max(foam, swash * smoothstep(0.3, 0.65, lace) * 0.75);
  float edgeFoam = (1.0 - smoothstep(0.0, 0.1 + 0.1 * lace, water)) * step(0.0, water);
  foam = max(foam, edgeFoam * 0.9);
  // 4) sisa buih tipis berpola di air dangkal
  foam = max(foam, smoothstep(0.64, 0.86, lace) * (1.0 - smoothstep(0.3, 2.5, depth)) * 0.4);
  foam *= 1.0 - far * 0.6;
  col = mix(col, vec3(0.93, 0.97, 1.0) * (0.82 + 0.18 * uSunDir.y), foam);

  // transparansi: air tipis tembus pandang (pasir terlihat), tepi air lembut
  float alpha = mix(0.32, 0.96, smoothstep(0.0, 2.2, water));
  alpha = max(alpha, fres * 0.9);
  alpha = max(alpha, foam);
  alpha *= smoothstep(-0.005, 0.03, water);

  col = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, vFogDepth));
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function bh(i,t,e,n,s){const r=[];for(let o=n;o>=1;o--)r.push(i-e*(Math.pow(s,o)-1)/(s-1));const a=Math.round((t-i)/e);for(let o=0;o<=a;o++)r.push(i+o*e);for(let o=1;o<=n;o++)r.push(t+e*(Math.pow(s,o)-1)/(s-1));return r}const us=48;function xM(i,t){const n=be.size/t;let s=1.01,r=4;for(let M=0;M<60;M++){const v=(s+r)/2;n*(Math.pow(v,12)-1)/(v-1)<5500?s=v:r=v}const a=(s+r)/2,o=bh(Vt.minX,Vt.maxX,n,12,a),c=bh(Vt.minZ,Vt.maxZ,n,12,a),l=o.length,u=c.length,h=new Float32Array(l*u*3),d=new Float32Array(l*u);for(let M=0;M<u;M++)for(let v=0;v<l;v++){const _=M*l+v,E=o[v],T=c[M];h[_*3]=E,h[_*3+2]=T,d[_]=E>Vt.minX&&E<Vt.maxX&&T>Vt.minZ&&T<Vt.maxZ?i.heightAt(E,T):-18}const f=l-1-2*12,m=u-1-2*12,x=new Map;for(let M=0;M<u-1;M++)for(let v=0;v<l-1;v++){const _=M*l+v,E=_+1,T=_+l,P=T+1;if(Math.min(d[_],d[E],d[T],d[P])>1.6)continue;const N=v-12,w=M-12,A=N>=0&&w>=0&&N<f&&w<m?`${Math.floor(N/us)},${Math.floor(w/us)}`:"luar";let I=x.get(A);I||x.set(A,I=[]),I.push(_,T,E,E,T,P)}const g=new me(h,3),p=[];for(const[M,v]of x){const _=new se;if(_.setAttribute("position",g),_.setIndex(v),M==="luar"){p.push({geometry:_,culled:!1});continue}const[E,T]=M.split(",").map(Number),P=o[12+E*us],N=o[Math.min(l-1,12+(E+1)*us)],w=c[12+T*us],A=c[Math.min(u-1,12+(T+1)*us)];_.boundingSphere=new on(new B((P+N)/2,0,(w+A)/2),Math.hypot(N-P,A-w)/2+2),p.push({geometry:_,culled:!0})}return p}function _M({ground:i,shore:t,env:e,noiseTexture:n,normalTexture:s,quality:r}){const a=r.water,o={DETAIL_LAYERS:a.detailLayers};a.cloudReflection&&(o.CLOUD_REFLECTION=""),r.caustics&&(o.CAUSTICS="");const c=new zn({vertexShader:mM,fragmentShader:gM,defines:o,transparent:!0,depthWrite:!1,uniforms:{uShore:{value:t.texture},uNoise:{value:n},uNormal:{value:s},uWaveTime:Ml,uWorld:{value:new Qt(Vt.minX,Vt.minZ,Vt.maxX,Vt.maxZ)},uShallow:{value:new Dt("#3fd6c6")},uDeep:{value:new Dt("#0a4a82")},uZenith:{value:e.zenith},uHorizon:{value:e.horizon},uSunDir:{value:e.sunDir},uSunColor:{value:new Dt("#fff2d2")},uFogColor:{value:e.fog.color},uFogNear:{value:e.fog.near},uFogFar:{value:e.fog.far}}}),l=new Re;l.name="laut",l.position.y=be.seaLevel;for(const{geometry:u,culled:h}of xM(i,a.segments)){const d=new te(u,c);d.frustumCulled=h,d.renderOrder=1,l.add(d)}return l.userData.material=c,l}const vM=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // selalu di bidang terjauh
}
`,yM=`
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform sampler2D uNoise;
uniform float uTime;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float up = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(up, 0.5));
  float s = max(dot(d, uSunDir), 0.0);
  col += uSunColor * (pow(s, 12.0) * 0.22 + pow(s, 120.0) * 0.4);

  // awan: diproyeksikan ke "langit-langit" datar, bergerak pelan
  if (d.y > 0.0) {
    vec2 uv = d.xz / (d.y + 0.15) * 0.22 + vec2(uTime * 0.0025, uTime * 0.001);
    float n = texture2D(uNoise, uv).b * 0.62
      + texture2D(uNoise, uv * 2.9 + 0.31).g * 0.28
      + texture2D(uNoise, uv * 7.3 + 0.67).r * 0.1;
    float cover = smoothstep(0.5, 0.74, n) * smoothstep(0.0, 0.16, d.y);
    vec3 cloud = mix(vec3(0.72, 0.78, 0.86), vec3(1.0), smoothstep(0.5, 0.82, n));
    cloud += uSunColor * pow(s, 6.0) * 0.25; // tepi awan bercahaya ke arah matahari
    col = mix(col, cloud, cover * 0.92);
  }
  // cakram matahari (di atas awan tipis)
  col += uSunColor * pow(s, 1800.0) * 4.0;
  // di bawah cakrawala: warna kabut (menyatu dengan laut di kejauhan)
  col = mix(col, uHorizon, smoothstep(0.0, -0.05, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function MM(i,{noiseTexture:t,quality:e}){const n=new B(.5,.52,.32).normalize(),s=new Dt("#d3ecf6"),r=new Dt("#3d8bd4");i.fog=new rl(s.clone(),380,2400),i.background=s.clone();const a={uZenith:{value:r},uHorizon:{value:s},uSunDir:{value:n},uSunColor:{value:new Dt("#fff0c8")},uNoise:{value:t},uTime:{value:0}},o=new zn({vertexShader:vM,fragmentShader:yM,side:Je,depthWrite:!1,uniforms:a}),c=new te(new Ua(1,32,16),o);c.name="langit",c.frustumCulled=!1,c.renderOrder=-1,c.onBeforeRender=(g,p,M)=>{c.position.copy(M.position),c.scale.setScalar(M.far*.9),c.updateMatrixWorld()},i.add(c);const l=new Mv("#d6ecff","#5d7a3c",1.1);i.add(l);const u=new $f("#fff1d6",2.4);u.position.copy(n).multiplyScalar(500),i.add(u,u.target),e.shadows&&(u.castShadow=!0,u.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize),u.shadow.camera.near=1,u.shadow.camera.far=1600,u.shadow.bias=-6e-4,u.shadow.radius=2);const h=new Ht().lookAt(n,new B,new B(0,1,0)),d=h.clone().invert(),f=new B,m=Math.log(1.15);function x(g,p){if(!u.castShadow)return;const M=g.position.distanceTo(p),v=ei.clamp(M*.95,45,560),_=Math.exp(Math.ceil(Math.log(v)/m)*m),E=u.shadow.camera;E.right!==_&&(E.left=-_,E.right=_,E.top=_,E.bottom=-_,E.updateProjectionMatrix());const T=2*_/u.shadow.mapSize.x;f.copy(p).lerp(g.position,.25).applyMatrix4(d),f.x=Math.round(f.x/T)*T,f.y=Math.round(f.y/T)*T,f.applyMatrix4(h),u.target.position.copy(f),u.position.copy(f).addScaledVector(n,800),u.shadow.normalBias=T*1.6}return{sunDir:n,zenith:r,horizon:s,fog:i.fog,sun:u,hemi:l,update(g,p,M){a.uTime.value=g,x(p,M)}}}const ti=Math.PI*2,Sl=new B(0,1,0);function Ee(i,t,{centers:e=null,dark:n=.62,light:s=1.08,rings:r=0}={}){const a=i.index?i.toNonIndexed():i;a.attributes.uv&&a.deleteAttribute("uv");const o=a.attributes.position;if(e){const f=a.attributes.normal,m=new B,x=new B;for(let g=0;g<o.count;g++){x.set(0,0,0);for(const[p,M]of e)x.addScaledVector(m.fromBufferAttribute(o,g).sub(p).normalize(),M);x.normalize(),f.setXYZ(g,x.x,x.y,x.z)}}a.computeBoundingBox();const{min:c,max:l}=a.boundingBox,u=Math.max(.001,l.y-c.y),h=new Dt(t),d=new Float32Array(o.count*3);for(let f=0;f<o.count;f++){const m=o.getY(f);let x=n+(s-n)*((m-c.y)/u);r&&(x*=.88+.12*Math.sin(m*r)),d[f*3]=h.r*x,d[f*3+1]=h.g*x,d[f*3+2]=h.b*x}return a.setAttribute("color",new me(d,3)),a}function Ar(i,t,[e,n,s],r=.82){const a=new wi(i,t);return a.scale(1,r,1),a.translate(e,n,s),a}function bM(i,t){const n=(m,x)=>x.set(0,i*(.3*m-t*m*m),i*m*(1-.12*m)),s=[],r=[],a=new B,o=new B,c=new B,l=new B,u=new B,h=new B,d=new B;for(let m=-1;m<=1;m+=2)for(let x=0;x<9;x++){const g=.08+.86*x/9,p=g+.86/9*.95,M=1.3*Math.sin(Math.PI*(.16+.76*g));n(g,a),n(p,o),n(Math.min(1,(g+p)/2+.07),l),c.set(l.x+m*M,l.y-.4*M,l.z+.3*M),u.crossVectors(h.subVectors(o,a),d.subVectors(c,a));const v=u.y<0;v&&u.negate(),u.normalize().lerp(Sl,.45).normalize();for(const _ of v?[a,c,o]:[a,o,c])s.push(_.x,_.y,_.z),r.push(u.x,u.y,u.z)}const f=new se;return f.setAttribute("position",new Gt(s,3)),f.setAttribute("normal",new Gt(r,3)),f}function ud(){const i=[],n=new Ge(.2,.36,8,6,5,!0);n.translate(0,8/2,0);const s=n.attributes.position;for(let l=0;l<s.count;l++)s.setX(l,s.getX(l)+.035*s.getY(l)*s.getY(l));i.push(Ee(n,"#8d6d48",{dark:.7,light:1.05,rings:9}));const r=.035*8*8,a=8;for(let l=0;l<a;l++){const u=l%4===3,h=bM(u?4:4.5,u?.75:.5);h.rotateX(-.15+l%3*.12),h.rotateY(l/a*ti+l%2*.25),h.translate(r,8-.05,0),i.push(Ee(h,u?"#8c9a38":l%2?"#3f8f2f":"#4c9e34",{dark:.8,light:1.05}))}const o=new wi(.42,0);o.translate(r,8-.15,0),i.push(Ee(o,"#6b5a2e"));const c=[[0,.36,.5,"#5f8f23"],[.8,.42,.62,"#6f9c2b"],[1.6,.37,.52,"#c9921f"],[2.5,.43,.66,"#5f8f23"],[3.3,.36,.5,"#7c5a32"],[4.1,.42,.63,"#6f9c2b"],[4.9,.37,.54,"#5f8f23"],[5.7,.43,.67,"#d4a02a"]];for(const[l,u,h,d]of c){const f=new B(r+Math.cos(l)*u,8-h,Math.sin(l)*u),m=new wi(1,0);m.scale(.21,.26,.21),m.translate(f.x,f.y,f.z),i.push(Ee(m,d,{centers:[[f,1]],dark:.7,light:1.12}))}for(const l of[.4,3.6]){const u=new B(r,7.8,0),h=new B(r+Math.cos(l)*.34,8-.6,Math.sin(l)*.34),d=h.clone().sub(u),f=new Ge(.03,.05,d.length(),4,1,!0);f.applyQuaternion(new _e().setFromUnitVectors(Sl,d.normalize())),f.translate((u.x+h.x)/2,(u.y+h.y)/2,(u.z+h.z)/2),i.push(Ee(f,"#b8923f",{dark:.85,light:1}))}return ji(i)}function Dc(i){const t=[],e=new Ge(.3,.55,6.6,6,2,!1);e.translate(0,3.3,0),t.push(Ee(e,"#6b4f33",{dark:.55,light:1}));for(const r of[-1,1]){const a=new Ge(.1,.18,2.6,5,1,!0);a.rotateZ(r*.75),a.translate(r*.85,5.6,r*.3),t.push(Ee(a,"#6b4f33",{dark:.7,light:1}))}const n=new B(0,7.4,0),s=[[0,7.5,0,3,"#2f7d2a"],[1.7,6.7,.8,2.3,"#3a8c30"],[-1.5,6.8,-.9,2.4,"#2a7027"],[.2,9,-.2,2.1,"#3f9534"]];for(const[r,a,o,c,l]of s){const u=Ar(c,i,[r,a,o]);t.push(Ee(u,l,{centers:[[n,.65],[new B(r,a,o),.35]],dark:.66,light:1.12}))}return ji(t)}function hd(i){const t=[],e=new Ge(.3,.6,9,6,3,!1);e.translate(0,4.5,0);const n=e.attributes.position;for(let r=0;r<n.count;r++)n.setX(r,n.getX(r)+.006*n.getY(r)*n.getY(r));t.push(Ee(e,"#75593a",{dark:.55,light:1}));for(let r=0;r<3;r++){const a=new Ge(.08,.16,3.4,5,1,!0);a.rotateZ(.9),a.translate(1.3,8.4,0),a.rotateY(r*ti/3+.4),a.translate(.45,0,0),t.push(Ee(a,"#75593a",{dark:.75,light:1}))}const s=new B(.5,9.8,0);for(const[r,a,o,c,l,u]of[[.5,9.7,0,4.4,"#3b7f2c",.34],[1.2,10.6,-.6,3,"#468f33",.4],[-1.4,9.9,1.1,2.6,"#357528",.4]]){const h=Ar(c,i,[r,a,o],u);t.push(Ee(h,l,{centers:[[s,.5],[new B(r,a-1,o),.5]],dark:.66,light:1.15}))}return ji(t)}function Ca(i,t){const e=[],n=new B(0,.5,0);for(const[s,r,a,o,c]of[[0,.65,0,.95,"#3f8a2e"],[.75,.5,.3,.7,"#4b9a35"],[-.6,.45,-.4,.65,"#45922f"]]){const l=Ar(o,i,[s,r,a],.75);e.push(Ee(l,c,{centers:[[n,.6],[new B(s,r,a),.4]],dark:.75,light:1.15}))}return t&&[[.2,1.35,.5],[-.5,1.1,.4],[.9,.95,-.2],[-.2,1.3,-.6],[.5,1.15,.85],[-.9,.8,-.1]].forEach(([r,a,o],c)=>{const l=new wi(.17,0);l.translate(r,a,o),e.push(Ee(l,t[c%t.length],{dark:.9,light:1.1}))}),ji(e)}function SM(i){const t=[],e=new Ge(.85,1.7,9,9,3,!1);e.translate(0,4.5,0),t.push(Ee(e,"#5d4a3a",{dark:.5,light:.95}));for(let r=0;r<6;r++){const a=new Wi(.35,1.6,2.2);a.translate(0,.6,1.4),a.rotateY(r/6*ti+.3),t.push(Ee(a,"#5d4a3a",{dark:.55,light:.9}))}for(let r=0;r<22;r++){const a=r/22*ti+r%3*.37,o=2.6+r%5*.6,c=9.5-r%4*.8,l=new Ge(.05,.1,c,4,1,!0);l.translate(Math.cos(a)*o,c/2,Math.sin(a)*o),t.push(Ee(l,"#6e5a46",{dark:.7,light:1}))}const n=new B(0,12.5,0),s=[[0,13.5,0,6.5,"#2c6a26"]];for(let r=0;r<9;r++){const a=r/9*ti;s.push([Math.cos(a)*7.2,11.6+r%2*.8,Math.sin(a)*7.2,4.6,r%2?"#35782d":"#2a6324"])}for(let r=0;r<5;r++){const a=r/5*ti+.6;s.push([Math.cos(a)*3.6,15.6,Math.sin(a)*3.6,3.8,"#3d8433"])}for(const[r,a,o,c,l]of s){const u=Ar(c,i,[r,a,o],.62);t.push(Ee(u,l,{centers:[[n,.6],[new B(r,a,o),.4]],dark:.6,light:1.1}))}return ji(t)}function AM(){const i=[],t=new Ge(.16,.26,2.2,6,1,!0);t.translate(0,1.1,0),i.push(Ee(t,"#8d7c69",{dark:.7,light:1.05}));for(let e=0;e<5;e++){const n=e/5*ti+.4,s=new B(Math.cos(n)*1.7,3.6+e%2*.5,Math.sin(n)*1.7),r=new B(0,2.1,0),a=s.clone().sub(r),o=new Ge(.07,.12,a.length(),5,1,!0);o.applyQuaternion(new _e().setFromUnitVectors(Sl,a.clone().normalize())),o.translate((r.x+s.x)/2,(r.y+s.y)/2,(r.z+s.z)/2),i.push(Ee(o,"#8d7c69",{dark:.75,light:1.05}));const c=Ar(.95,0,[s.x,s.y+.35,s.z],.6);i.push(Ee(c,"#3e8a35",{centers:[[s,1]],dark:.75,light:1.15}));for(let l=0;l<4;l++){const u=new wi(.14,0);u.translate(s.x+Math.cos(l*1.7)*.6,s.y+.75,s.z+Math.sin(l*1.7)*.6),i.push(Ee(u,l%2?"#fbf6e8":"#f6e08a",{dark:.95,light:1.05}))}}return ji(i)}function EM(){const i=[],t=new Ge(.13,.2,2.6,6,1,!0);t.translate(0,1.3,0),i.push(Ee(t,"#7f8f3c",{dark:.7,light:1.05}));for(let e=0;e<7;e++){const n=new ai(.75,2.6,1,4),s=n.attributes.position;for(let r=0;r<s.count;r++){const a=(s.getY(r)+1.3)/2.6;s.setY(r,a*2.4),s.setZ(r,a*a*1.6),s.setY(r,s.getY(r)-a*a*1.2)}n.computeVertexNormals(),n.rotateX(-.25),n.rotateY(e/7*ti+e%2*.4),n.translate(0,2.4,0),i.push(Ee(n,e%3?"#5ea83a":"#7bbf45",{dark:.8,light:1.1}))}return ji(i)}const fd={value:0},wn={a:{value:new B},b:{value:new B},r:{value:0}};function dd(i){const t=new si({vertexColors:!0,side:Ze});return t.onBeforeCompile=e=>{e.uniforms.uTime=fd,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=wn.a,e.uniforms.uSeeB=wn.b,e.uniforms.uSeeR=wn.r,e.vertexShader=`uniform float uTime;
varying vec3 vLocal;
varying vec3 vSeeWorld;
`+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      float hh = max(position.y, 0.0);
      vec3 ip = vec3(instanceMatrix[3]);
      float ph = ip.x * 0.13 + ip.z * 0.17;
      vLocal = position + ip * 0.05;
      transformed.x += sin(uTime * 1.3 + ph) * hh * hh * 0.0035;
      transformed.z += cos(uTime * 1.1 + ph) * hh * hh * 0.0025;
      vSeeWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=`uniform sampler2D uNoise;
      uniform vec3 uSeeA;
      uniform vec3 uSeeB;
      uniform float uSeeR;
      varying vec3 vLocal;
      varying vec3 vSeeWorld;
    `+e.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
      if (uSeeR > 0.0) {
        vec3 ab = uSeeB - uSeeA;
        float tt = clamp(dot(vSeeWorld - uSeeA, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
        float rr = uSeeR * (0.35 + 0.65 * tt); // makin dekat ke prajurit makin lebar
        float dd = distance(vSeeWorld, uSeeA + ab * tt);
        if (tt < 0.97 && dd < rr) {
          // interleaved gradient noise: pola halus & aman untuk presisi GPU HP
          float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          if (dither > smoothstep(rr * 0.55, rr, dd)) discard;
        }
      }`).replace("#include <color_fragment>",`#include <color_fragment>
      float leaf = texture2D(uNoise, vLocal.xz * 0.42 + vLocal.y * 0.29).g;
      diffuseColor.rgb *= 0.74 + 0.5 * leaf;`)},t}const Sh=be.size/3;function je(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,toMatrix:a}){const o=new Re;o.name=i;const c=new Map;for(const h of n){const d=`${Math.floor(h.x/Sh)},${Math.floor(h.z/Sh)}`;c.has(d)||c.set(d,[]),c.get(d).push(h)}const l=new Ht,u=new Dt;for(const h of c.values()){const d=new br(t,e,h.length);h.forEach((f,m)=>{a(f,l,u),d.setMatrixAt(m,l),d.setColorAt(m,u)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.castShadow=s,d.receiveShadow=r,o.add(d)}return o}const Ah=new _e,Eh=new tn,Th=new B,wh=new B;function An({scaleMin:i,scaleMax:t,tilt:e,tint:n,sink:s=.15}){return(r,a,o)=>{Eh.set((r.b-.5)*e,r.a*ti,(r.c-.5)*e),Ah.setFromEuler(Eh);const c=i+(t-i)*r.b;wh.set(c,c*(.9+.2*r.c),c),Th.set(r.x,r.y-s*c,r.z),a.compose(Th,Ah,wh);const l=1-n+n*2*r.c,u=(r.a-.5)*n;o.setRGB(l*(1+u),l,l*(1-u))}}function TM({ground:i,grid:t,quality:e,noiseTexture:n,reserved:s=null}){const r=e.treeDensity,a=e.canopyDetail,{shadows:o}=e,c=fn({ground:i,grid:t,kind:"kelapa",seed:101,radius:1.8,reserved:s,count:Math.round(170*r),accept:(x,g,p,M,v)=>p>.9&&p<4.2&&M<.3&&v()<.55}),l=fn({ground:i,grid:t,kind:"pohon",seed:202,radius:2.3,reserved:s,count:Math.round(900*r),accept:(x,g,p,M)=>p>4&&p<44&&M<.6&&Si(x,g)>.47}),u=fn({ground:i,grid:t,kind:"pohon",seed:303,radius:4.5,reserved:s,count:Math.round(110*r),accept:(x,g,p,M,v)=>{if(p<5||p>42||M>.45)return!1;const _=Si(x,g);return _>.34&&_<.49&&v()<.35+.65*vr(x,g)}}),h=fn({ground:i,grid:t,kind:"semak",seed:404,radius:1.1,reserved:s,count:Math.round(700*r),accept:(x,g,p,M,v)=>{if(p<be.beachTop+.6||p>46||M>.7)return!1;const _=Si(x,g);return _>.4&&_<.56||v()<.06}}),d=fn({ground:i,grid:t,kind:"semak",seed:505,radius:1,reserved:s,count:Math.round(150*r),accept:(x,g,p,M,v)=>p>be.beachTop+.4&&p<30&&M<.5&&Si(x,g)<.5&&v()<.5}),f=dd(n),m=new Re;return m.name="vegetasi",m.add(je("kelapa",ud(),f,c,{castShadow:o,receiveShadow:o,toMatrix:An({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1})}),je("pohon-hutan",Dc(a),f,l,{castShadow:o,receiveShadow:o,toMatrix:An({scaleMin:.75,scaleMax:1.4,tilt:.12,tint:.16})}),je("pohon-payung",hd(a),f,u,{castShadow:o,receiveShadow:o,toMatrix:An({scaleMin:.8,scaleMax:1.2,tilt:.08,tint:.12})}),je("semak",Ca(0,null),f,h,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:An({scaleMin:.7,scaleMax:1.5,tilt:.2,tint:.2,sink:.1})}),je("semak-bunga",Ca(0,["#e0353f","#f4c02c","#f06aa8"]),f,d,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:An({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),m.userData.occlusion=[...l.map(x=>({x:x.x,z:x.z,radius:4.8,strength:.4})),...u.map(x=>({x:x.x,z:x.z,radius:5.5,strength:.3})),...c.map(x=>({x:x.x,z:x.z,radius:2.4,strength:.18})),...h.map(x=>({x:x.x,z:x.z,radius:1.8,strength:.2})),...d.map(x=>({x:x.x,z:x.z,radius:1.6,strength:.15}))],m.userData.trunks=[...c.map(x=>({x:x.x,z:x.z,radius:.45,kind:"pohon"})),...l.map(x=>({x:x.x,z:x.z,radius:.7,kind:"pohon"})),...u.map(x=>({x:x.x,z:x.z,radius:.75,kind:"pohon"}))],m.userData.counts={kelapa:c.length,pohon:l.length,payung:u.length,semak:h.length,bunga:d.length},m.userData.update=x=>{fd.value=x},m}function Rh(i,t=0){const e=new dl(1,t),n=e.attributes.position,s=new B;for(let l=0;l<n.count;l++){s.fromBufferAttribute(n,l);const u=.72+.5*rd(s.x*1.6+i,s.z*1.6+s.y*1.3-i,5);s.multiplyScalar(u),s.y*=.82,s.y<0&&(s.y*=.55),n.setXYZ(l,s.x,s.y,s.z)}e.computeVertexNormals(),e.computeBoundingBox();const{min:r,max:a}=e.boundingBox,o=new Dt("#a59c8e"),c=new Float32Array(n.count*3);for(let l=0;l<n.count;l++){const h=.66+.46*((n.getY(l)-r.y)/(a.y-r.y));c[l*3]=o.r*h,c[l*3+1]=o.g*h,c[l*3+2]=o.b*h}return e.setAttribute("color",new me(c,3)),e.deleteAttribute("uv"),e}const Ch=new _e,Ph=new tn,Lh=new B,Ih=new B;function wM(i,t,e){Ph.set((i.b-.5)*.5,i.a*Math.PI*2,(i.c-.5)*.5),Ch.setFromEuler(Ph);const n=i.r*.95;Ih.set(n*(.8+.4*i.c),n*(.8+.5*i.b),n*(.8+.4*i.a)),Lh.set(i.x,i.y-.12*n,i.z),t.compose(Lh,Ch,Ih);const s=.82+.36*i.c,r=(i.a-.5)*.18;e.setRGB(s*(1+r),s,s*(1-r))}function RM({ground:i,grid:t,quality:e,reserved:n=null}){const s=e.treeDensity,r=fn({ground:i,grid:t,kind:"batu",seed:606,reserved:n,count:Math.round(160*s),radius:h=>1+h()*1.8,accept:(h,d,f,m,x)=>{if(f<12)return!1;const g=Math.min(1,m*1.2+Math.max(0,f-40)/20);return x()<vr(h,d)*(.25+.75*g)}}),a=fn({ground:i,grid:t,kind:"batu",seed:707,reserved:n,count:Math.round(110*s),radius:h=>.4+h()*.6,accept:(h,d,f,m,x)=>f>.3&&f<be.beachTop+.5&&x()<.25||f>4&&f<45&&m<.8&&x()<.35+.65*vr(h,d)}),o=new si({vertexColors:!0}),c={castShadow:e.shadows,receiveShadow:e.shadows,toMatrix:wM},l=new Re;l.name="batu";const u=[...r,...a];return l.add(je("batu-a",Rh(1.3),o,u.filter((h,d)=>d%2===0),c),je("batu-b",Rh(7.9),o,u.filter((h,d)=>d%2===1),c)),l.userData.occlusion=u.map(h=>({x:h.x,z:h.z,radius:h.r*1.6,strength:.3})),l.userData.colliders=u.map(h=>({x:h.x,z:h.z,radius:h.r*.9,kind:"batu"})),l.userData.count=u.length,l}const Me=16,pd=.02,CM=3,ki=8,Nc=Math.PI*2,PM=(i,t)=>Math.min(1,Math.max(pd,Math.pow(t/Math.max(i,.001),1.5)));function LM(i){const t=ka(99),e=[],n=[],s=[],r=new Dt().setRGB(.14,.28,.05),a=new Dt().setRGB(.3,.5,.11),o=new Dt().setRGB(.4,.62,.13),c=new Dt,l=2;for(let h=0;h<i;h++){const d=h/i*Nc+t()*.9,f=Math.cos(d),m=Math.sin(d),x=.2+t()*.4,g=.6+t()*.4,p=.075+t()*.05,M=.03+t()*.16,v=e.length/3;for(let E=0;E<=l;E++){const T=E/l,P=M+x*T*T,N=f*P,w=m*P,A=g*T;if(c.copy(r).lerp(a,Math.min(1,T*1.6)).lerp(o,Math.max(0,T*1.6-.6)),E<l){const I=p*(1-T*.6);e.push(N+m*I,A,w-f*I,N-m*I,A,w+f*I),n.push(c.r,c.g,c.b,c.r,c.g,c.b)}else e.push(N,A,w),n.push(c.r,c.g,c.b)}for(let E=0;E<l-1;E++){const T=v+E*2;s.push(T,T+1,T+2,T+1,T+3,T+2)}const _=v+(l-1)*2;s.push(_,_+1,_+2)}const u=new se;return u.setAttribute("position",new Gt(e,3)),u.setAttribute("color",new Gt(n,3)),u.setAttribute("normal",new Gt(new Array(e.length).fill(0).map((h,d)=>d%3===1?1:0),3)),u.setIndex(s),u}function IM(i){const t=new si({vertexColors:!0,side:Ze});return t.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=`
      attribute vec4 aOffset; // xyz = posisi, w = urutan acak (untuk LOD)
      attribute vec4 aParams; // x = rotasi, y = skala, z = warna (0 kering..1 segar), w = fase angin
      uniform float uTime;
      uniform vec3 uCamPos;
      uniform float uRadius;
      uniform float uNear;
      uniform float uFar;
      uniform vec2 uWind;
    `+e.vertexShader.replace("#include <beginnormal_vertex>","vec3 objectNormal = vec3(0.0, 1.0, 0.0);").replace("#include <begin_vertex>",`
        vec3 transformed = vec3(position);
        float camDist = distance(uCamPos, aOffset.xyz);
        float lod = clamp(pow(uNear / max(camDist, 0.001), 1.5), uFar, 1.0);
        float grow = smoothstep(0.0, 0.15 * lod + 0.002, lod - aOffset.w)
          * (1.0 - smoothstep(uRadius * 0.8, uRadius, camDist))
          * min(1.6, pow(1.0 / lod, 0.2)); // rumpun jauh sedikit lebih besar
        float cr = cos(aParams.x);
        float sr = sin(aParams.x);
        transformed.xz = vec2(cr * transformed.x - sr * transformed.z, sr * transformed.x + cr * transformed.z);
        // angin: gelombang yang menyapu padang + getaran kecil per rumpun
        float bend = position.y * position.y;
        float gust = sin(uTime * 1.7 + dot(aOffset.xz, vec2(0.11, 0.07)) + aParams.w * 0.4) * 0.6
          + sin(uTime * 3.1 + aParams.w) * 0.2;
        transformed.xz += uWind * gust * bend * 0.35;
        transformed.y -= abs(gust) * bend * 0.08;
        transformed *= aParams.y * grow;
        transformed += aOffset.xyz;
      `).replace("#include <color_vertex>",`#include <color_vertex>
        vColor.rgb *= mix(vec3(1.35, 1.1, 0.6), vec3(0.92, 1.0, 0.92), aParams.z);`),e.fragmentShader=e.fragmentShader.replace("#include <normal_fragment_begin>",`
      float faceDirection = 1.0;
      vec3 normal = normalize(vNormal);
      vec3 nonPerturbedNormal = normal;
    `)},t}function DM(i,t){let e=0,n=i.length;for(;e<n;){const s=e+n>>1;i[s]<t?e=s+1:n=s}return e}const Dh={count:0};function NM({ground:i,grid:t,quality:e}){const n=e.grass,s=LM(n.blades),r=new wv;r.index=s.index;for(const A of["position","color","normal"])r.setAttribute(A,s.attributes[A]);const a=new Float32Array(n.max*ki),o=new Gv(a,ki,1).setUsage(ys);r.setAttribute("aOffset",new xr(o,4,0)),r.setAttribute("aParams",new xr(o,4,4)),r.instanceCount=0;const c={uTime:{value:0},uCamPos:{value:new B},uRadius:{value:n.radius},uNear:{value:n.near},uFar:{value:pd},uWind:{value:new vt(1,.45).normalize()}},l=new te(r,IM(c));l.name="rumput",l.frustumCulled=!1,l.receiveShadow=e.shadows&&n.shadows,l.visible=!1;const u=new Map,h=4,d=new Float32Array((h+1)*(h+1)),f=new Float32Array((h+1)*(h+1)),m=(A,I,G)=>{const j=I*h,q=G*h,y=Math.min(h-1,Math.floor(j)),b=Math.min(h-1,Math.floor(q)),R=j-y,S=q-b,z=A[b*(h+1)+y],O=A[b*(h+1)+y+1],C=A[(b+1)*(h+1)+y],U=A[(b+1)*(h+1)+y+1];return(z+(O-z)*R)*(1-S)+(C+(U-C)*R)*S};function x(A,I){const G=A*Me,j=I*Me;let q=!1;for(let U=0;U<=h;U++)for(let Y=0;Y<=h;Y++){const k=G+Y*Me/h,W=j+U*Me/h,tt=aM(k,W);d[U*(h+1)+Y]=tt.forest,f[U*(h+1)+Y]=tt.patch,!q&&_h(tt.forest,tt.patch,k,W,i.heightAt(k,W),0)>.02&&(q=!0)}if(!q)return Dh;const y=ka(jy(A,I)^2654435769),b=Math.round(Me*Me*n.density),R=[];let S=1/0,z=-1/0;for(let U=0;U<b;U++){const Y=G+y()*Me,k=j+y()*Me,W=y(),tt=i.heightAt(Y,k),H=(Y-G)/Me,K=(k-j)/Me;if(W>=_h(m(d,H,K),m(f,H,K),Y,k,tt,i.slopeAt(Y,k))||t.covered(Y,k,"batu",.85))continue;const nt=y()<.12?y()*.5:.6+y()*.4;R.push([Y,tt-.04,k,y(),y()*Nc,.6+y()*.7,nt,y()*Nc]),S=Math.min(S,tt),z=Math.max(z,tt)}if(!R.length)return Dh;R.sort((U,Y)=>U[3]-Y[3]);const O=new Float32Array(R.length*ki),C=new Float32Array(R.length);return R.forEach((U,Y)=>{O.set(U,Y*ki),C[Y]=U[3]}),{count:R.length,data:O,ranks:C,center:new B(G+Me/2,(S+z)/2,j+Me/2),radius:Math.hypot(Me/2,Me/2,(z-S)/2)+1.4}}const g=new Mr,p=new Ht,M=new on,v=new B(1/0,0,0),_=new _e,E=[],T=[];let P=!1;function N(A,I,G){if(!A.count)return;const j=Math.max(0,I.distanceTo(A.center)-A.radius);j>G||(M.center.copy(A.center),M.radius=A.radius,g.intersectsSphere(M)&&E.push({ch:A,d:j}))}function w(A,I){c.uTime.value=I;const G=A.position;if(c.uCamPos.value.copy(G),!P&&v.equals(G)&&_.equals(A.quaternion))return;v.copy(G),_.copy(A.quaternion),P=!1,A.updateMatrixWorld(),p.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),g.setFromProjectionMatrix(p);const j=n.radius,q=Math.floor((G.x-j)/Me),y=Math.floor((G.x+j)/Me),b=Math.floor((G.z-j)/Me),R=Math.floor((G.z+j)/Me);E.length=0,T.length=0;for(let z=q;z<=y;z++)for(let O=b;O<=R;O++){const C=(z+32768)*65536+(O+32768),U=u.get(C);if(U===void 0){const Y=Math.max(0,Math.abs(G.x-(z+.5)*Me)-Me*.71),k=Math.max(0,Math.abs(G.z-(O+.5)*Me)-Me*.71),W=Y*Y+k*k;if(W>j*j)continue;const tt=(z+.5)*Me,H=(O+.5)*Me;M.center.set(tt,i.heightAt(tt,H),H),M.radius=Me*.71+12;const K=g.intersectsSphere(M);T.push({i:z,j:O,key:C,order:W+(K?0:1e9)});continue}N(U,G,j)}if(T.length){T.sort((C,U)=>C.order-U.order);const z=performance.now();let O=0;for(const C of T){if(O>0&&performance.now()-z>CM)break;const U=x(C.i,C.j);u.set(C.key,U),N(U,G,j),O++}P=O<T.length}E.sort((z,O)=>z.d-O.d);let S=0;for(const{ch:z,d:O}of E){const C=Math.min(DM(z.ranks,PM(O,n.near)),n.max-S);if(!(C<=0)&&(a.set(z.data.subarray(0,C*ki),S*ki),S+=C,S>=n.max))break}r.instanceCount=S,l.visible=S>0,S>0&&(o.clearUpdateRanges(),o.addUpdateRange(0,S*ki),o.needsUpdate=!0)}return l.userData.update=w,l.userData.stats=()=>({instances:r.instanceCount,chunks:u.size}),l}const gi=8,Nh=(i,t)=>(i+32768)*65536+(t+32768);function UM(i){if(i.hx===void 0)return i;const t=i.rot||0;return{...i,cos:Math.cos(t),sin:Math.sin(t),radius:Math.hypot(i.hx,i.hz)}}function hs(i,t,e,n){if(i.hx===void 0){const m=t-i.x,x=e-i.z,g=Math.hypot(m,x);return n.gap=g-i.radius,n.nx=g>1e-6?m/g:1,n.nz=g>1e-6?x/g:0,n.px=i.x+n.nx*i.radius,n.pz=i.z+n.nz*i.radius,n}const s=t-i.x,r=e-i.z,a=s*i.cos-r*i.sin,o=s*i.sin+r*i.cos,c=Math.abs(a)-i.hx,l=Math.abs(o)-i.hz;let u,h,d,f;if(c>0||l>0){d=Math.max(-i.hx,Math.min(i.hx,a)),f=Math.max(-i.hz,Math.min(i.hz,o));const m=a-d,x=o-f,g=Math.hypot(m,x);n.gap=g,u=m/g,h=x/g}else c>l?(n.gap=c,u=Math.sign(a)||1,h=0,d=u*i.hx,f=o):(n.gap=l,u=0,h=Math.sign(o)||1,d=a,f=h*i.hz);return n.nx=u*i.cos+h*i.sin,n.nz=-u*i.sin+h*i.cos,n.px=i.x+d*i.cos+f*i.sin,n.pz=i.z-d*i.sin+f*i.cos,n}function zM(i){const t=i.map(UM),e=new Map;for(const a of t){const o=a.radius;for(let c=Math.floor((a.x-o)/gi);c<=Math.floor((a.x+o)/gi);c++)for(let l=Math.floor((a.z-o)/gi);l<=Math.floor((a.z+o)/gi);l++){const u=Nh(c,l);let h=e.get(u);h||e.set(u,h=[]),h.push(a)}}let n=0;function s(a,o,c,l){n++;for(let u=Math.floor((a-c)/gi);u<=Math.floor((a+c)/gi);u++)for(let h=Math.floor((o-c)/gi);h<=Math.floor((o+c)/gi);h++){const d=e.get(Nh(u,h));if(d)for(const f of d){if(f.seen===n)continue;f.seen=n;const m=f.x-a,x=f.z-o,g=f.radius+c;if(!(m*m+x*x>g*g)&&l(f)===!1)return!1}}return!0}const r={gap:0,nx:0,nz:0,px:0,pz:0};return{list:t,count:t.length,forEachNear:s,probe:hs,resolve(a,o,c){let l=!1;return s(a.x,a.z,o,u=>{if(hs(u,a.x,a.z,r),r.gap>=o)return!0;a.x+=r.nx*(o-r.gap),a.z+=r.nz*(o-r.gap);const h=c.x*r.nx+c.z*r.nz;return h<0&&(c.x-=h*r.nx,c.z-=h*r.nz),l=!0,!0}),l},isFree(a,o,c){return s(a,o,c,l=>hs(l,a,o,r).gap>=c)},clearance(a,o,c=4){let l=c;return s(a,o,c,u=>(l=Math.min(l,hs(u,a,o,r).gap),!0)),l},hitAt(a,o,c){let l=null,u=c;return s(a,o,c,h=>{const{gap:d}=hs(h,a,o,r);return d<u&&(u=d,l=h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind}),!0}),l},hitAll(a,o,c,l=8){const u=[];return s(a,o,c,h=>{const{gap:d}=hs(h,a,o,r);return d<c&&u.push({o:h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind},gap:d}),!0}),u.sort((h,d)=>h.gap-d.gap).slice(0,l).map(h=>h.o)}}}const fe=2,Mn=-500-fe*Math.ceil((-500-Vt.minX)/fe),bn=-500-fe*Math.ceil((-500-Vt.minZ)/fe),Ro=1.25,Js=.45,kM=12e4,{SQRT2:fs}=Math,OM=[[1,0,1],[0,1,2],[1,1,4],[-1,1,8]];function FM(i,t,e,n,s,r){const a=e-i,o=n-t,c=Math.max(0,Math.min(1,((s-i)*a+(r-t)*o)/(a*a+o*o))),l=i+a*c-s,u=t+o*c-r;return l*l+u*u}class BM{constructor(t){this.idx=new Int32Array(t),this.key=new Float64Array(t),this.size=0}push(t,e){let n=this.size++;for(;n>0;){const s=n-1>>1;if(this.key[s]<=e)break;this.idx[n]=this.idx[s],this.key[n]=this.key[s],n=s}this.idx[n]=t,this.key[n]=e}pop(){const t=this.idx[0],e=this.idx[--this.size],n=this.key[this.size];let s=0;for(;;){let r=2*s+1;if(r>=this.size||(r+1<this.size&&this.key[r+1]<this.key[r]&&r++,this.key[r]>=n))break;this.idx[s]=this.idx[r],this.key[s]=this.key[r],s=r}return this.idx[s]=e,this.key[s]=n,t}}function HM(i,t){const e=Math.ceil((Vt.maxX-Mn)/fe),n=Math.ceil((Vt.maxZ-bn)/fe),s=e*n,r=I=>Mn+(I+.5)*fe,a=I=>bn+(I+.5)*fe,o=new Float32Array(s);for(let I=0;I<n;I++)for(let G=0;G<e;G++)o[I*e+G]=i.heightAt(r(G),a(I));const c=new Uint8Array(s);for(let I=1;I<n-1;I++)for(let G=1;G<e-1;G++){const j=I*e+G;if(o[j]<-1)continue;const q=(o[j+1]-o[j-1])/(2*fe),y=(o[j+e]-o[j-e])/(2*fe);Math.hypot(q,y)<=Ro&&(c[j]=1)}for(const I of i.surfaces){const G=Math.hypot(I.hx,I.hz),j=Math.max(0,Math.floor((I.x-G-Mn)/fe)),q=Math.min(e-1,Math.floor((I.x+G-Mn)/fe)),y=Math.max(0,Math.floor((I.z-G-bn)/fe)),b=Math.min(n-1,Math.floor((I.z+G-bn)/fe));for(let R=y;R<=b;R++)for(let S=j;S<=q;S++){const z=i.surfaceHeight(I,r(S),a(R)),O=R*e+S;z===-1/0||z<o[O]||(o[O]=z,c[O]=1)}}const l=new Uint8Array(s),u={};function h(I,G,j,q,y){if(I.hx===void 0)return Math.sqrt(FM(G,j,q,y,I.x,I.z))-I.radius;const b=Math.ceil(Math.hypot(q-G,y-j)/.25);let R=1/0;for(let S=0;S<=b;S++){const z=S/b;R=Math.min(R,t.probe(I,G+(q-G)*z,j+(y-j)*z,u).gap)}return R}for(const I of t.list){const G=I.radius+Js,j=Math.max(0,Math.floor((I.x-G-Mn)/fe)-1),q=Math.min(e-1,Math.floor((I.x+G-Mn)/fe)+1),y=Math.max(0,Math.floor((I.z-G-bn)/fe)-1),b=Math.min(n-1,Math.floor((I.z+G-bn)/fe)+1);for(let z=y;z<=b;z++)for(let O=j;O<=q;O++){const C=z*e+O,{gap:U}=t.probe(I,r(O),a(z),u);if(U<Js&&(c[C]=0),!(U>Js+fe*fs))for(const[Y,k,W]of OM){const tt=O+Y,H=z+k;tt<0||tt>=e||H>=n||h(I,r(O),a(z),r(tt),a(H))<Js&&(l[C]|=W)}}const R=Math.floor((I.x-Mn)/fe),S=Math.floor((I.z-bn)/fe);R>=0&&S>=0&&R<e&&S<n&&(c[S*e+R]=0)}function d(I,G,j,q){return q===0?l[G*e+Math.min(I,I+j)]&1:j===0?l[Math.min(G,G+q)*e+I]&2:j===q?l[Math.min(G,G+q)*e+Math.min(I,I+j)]&4:q>0?l[G*e+I]&8:l[(G+q)*e+I+j]&8}const f=new Float32Array(s),m=new Int32Array(s),x=new Uint8Array(s),g=new BM(s*2),p=(I,G)=>{const j=Math.min(e-1,Math.max(0,Math.floor((I-Mn)/fe)));return Math.min(n-1,Math.max(0,Math.floor((G-bn)/fe)))*e+j},M=I=>r(I%e),v=I=>a(Math.floor(I/e)),_=(I,G)=>I<=Mn||G<=bn||I>=Mn+e*fe||G>=bn+n*fe?!1:c[p(I,G)]===1,E=(I,G)=>_(I,G)&&t.isFree(I,G,Js);function T(I,G,j,q){const y=Math.hypot(j-I,q-G),b=Math.max(1,Math.ceil(y/.5));let R=i.surfaceAt(I,G);for(let S=1;S<=b;S++){const z=I+(j-I)*S/b,O=G+(q-G)*S/b;if(!E(z,O))return!1;const C=i.surfaceAt(z,O);if(Math.abs(C-R)/(y/b)>Ro)return!1;R=C}return!0}function P(I,G,j,q){if(E(I,G))return{x:I,z:G};const y=i.surfaceAt(I,G)<-1,b=Math.hypot(j-I,q-G),R=Math.ceil(b/(fe*.5));for(let S=1;S<=R;S++){const z=I+(j-I)*S/R,O=G+(q-G)*S/R;if(E(z,O)&&(!y||i.surfaceAt(z,O)>-.4))return{x:z,z:O}}return null}function N(I,G=5){if(c[I])return I;const j=I%e,q=Math.floor(I/e);for(let y=1;y<=G;y++)for(let b=-y;b<=y;b++)for(let R=-y;R<=y;R++){if(Math.max(Math.abs(R),Math.abs(b))!==y)continue;const S=j+R,z=q+b;if(!(S<0||z<0||S>=e||z>=n)&&c[z*e+S])return z*e+S}return-1}const w=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,fs],[1,-1,fs],[-1,1,fs],[-1,-1,fs]];function A(I,G){const j=P(G.x,G.z,I.x,I.z);if(!j)return null;if(Math.hypot(j.x-I.x,j.z-I.z)<40&&T(I.x,I.z,j.x,j.z))return[j];const q=N(p(I.x,I.z)),y=N(p(j.x,j.z));if(q<0||y<0)return null;f.fill(1/0),x.fill(0),g.size=0;const b=y%e,R=Math.floor(y/e),S=k=>{const W=Math.abs(k%e-b),tt=Math.abs(Math.floor(k/e)-R);return W+tt+(fs-2)*Math.min(W,tt)};f[q]=0,g.push(q,S(q));let z=0,O=!1;for(;g.size;){const k=g.pop();if(k===y){O=!0;break}if(x[k])continue;if(x[k]=1,++z>kM)break;const W=k%e,tt=Math.floor(k/e);for(const[H,K,nt]of w){const pt=W+H,Pt=tt+K;if(pt<0||Pt<0||pt>=e||Pt>=n)continue;const V=Pt*e+pt;if(!c[V]||x[V]||H&&K&&(!c[tt*e+pt]||!c[Pt*e+W])||d(W,tt,H,K)||Math.abs(o[V]-o[k])/(nt*fe)>Ro)continue;const ct=f[k]+nt;ct<f[V]&&(f[V]=ct,m[V]=k,g.push(V,ct+S(V)))}}if(!O)return null;const C=[y];for(let k=y;k!==q;)k=m[k],C.push(k);C.reverse();const U=[I,...C.map(k=>({x:M(k),z:v(k)})),j],Y=[];for(let k=0;k<U.length-1;){let W=k+1;for(;W+1<U.length&&T(U[k].x,U[k].z,U[W+1].x,U[W+1].z);)W++;Y.push(U[W]),k=W}return Y}return{findPath:A,walkableAt:_,standable:E,lineClear:T,cellSize:fe,size:[e,n],origin:[Mn,bn]}}function md(i){const t=new Map,e=new Map,n=i.clone();return gd(i,n,function(s,r){t.set(r,s),e.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=t.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function gd(i,t,e){e(i,t);for(let n=0;n<i.children.length;n++)gd(i.children[n],t.children[n],e)}const Co=6,Uh=.35,zh=1.1,GM=4,VM=9,WM=60,Po=2.6,kh=1,XM=15,Oh=5,jM=1.3;function YM(){const i=new Na(.5,.58,40),t=[0,1,2,3].map(r=>{const a=new ai(.07,.26);return a.translate(0,.66,0),a.rotateZ(r*Math.PI/2),a}),n=[i,...t].map(r=>r.toNonIndexed()).flatMap(r=>[...r.attributes.position.array]),s=new se;return s.setAttribute("position",new Gt(n,3)),s}function Uc(i,t,e,n,s,r=.6){return i.heightAt(n,s)>.5&&i.slopeAt(n,s)<.6&&e.walkableAt(n,s)&&t.isFree(n,s,r)}function KM(i,t,e,n,s){for(let r=0;r<=40;r+=2)for(let a=0;a<Math.PI*2;a+=r?2/r:7){const o=n+Math.cos(a)*r,c=s+Math.sin(a)*r;if(!Uc(i,t,e,o,c,.8))continue;const l=[];for(let u=0;u<Oh;u++){const h=u/Oh*Math.PI*2;l.push({x:o+Math.cos(h)*2.6,z:c+Math.sin(h)*2.6})}if(l.every(u=>Uc(i,t,e,u.x,u.z)))return{x:o,z:c,spots:l}}return null}function qM({ground:i,colliders:t,nav:e,asset:n,spawn:s}){const r=new Re;r.name="musuh";const a=[],o=new ai(1,1),c=new $e({color:"#2a0d0d",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),l=new $e({color:"#ff4636",depthTest:!1,depthWrite:!1,toneMapped:!1}),u=YM(),h=new $e({color:"#ff2a2a",transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1,toneMapped:!1,side:Ze}),d=n.model.getObjectByName("head-mesh"),f=new B;d.geometry.computeBoundingBox(),d.geometry.boundingBox.getCenter(f);const m=d.geometry.clone().translate(-f.x,-f.y,-f.z);m.deleteAttribute("skinIndex"),m.deleteAttribute("skinWeight");const x=[],g=b=>Ns.findByName(n.clips,b);function p(b,R){const S=new Re;S.name="orc";const z=md(n.model),O=[];z.traverse(K=>{K.isMesh&&(K.material=K.material.clone(),O.push(K.material))}),S.add(z);const C=new _l(z),U={};for(const K of["idle","walk","die"]){const nt=C.clipAction(g(K));K==="die"&&(nt.setLoop(Zc,1),nt.clampWhenFinished=!0),U[K]=nt}U.idle.play();const Y=new Re,k=new te(o,c);k.scale.set(1.08,.2,1),k.renderOrder=11;const W=new te(o,l);W.renderOrder=12,Y.add(k,W),Y.visible=!1;const tt=new te(u,h);tt.visible=!1,tt.renderOrder=13,r.add(S,Y,tt),S.position.set(R.x,i.heightAt(R.x,R.z),R.z);const H=Math.random()*Math.PI*2;return S.rotation.y=H,{id:b,root:S,model:z,mixer:C,actions:U,current:U.idle,materials:O,bar:Y,fill:W,reticle:tt,headMesh:z.getObjectByName("head-mesh"),headBone:z.getObjectByName("head"),home:R,pos:S.position,heading:H,target:null,wait:Math.random()*3,hp:Co,kx:0,kz:0,flash:0,barTime:0,state:"hidup",deadT:0,headless:!1,marked:!1}}function M(b,R,S=.2){const z=b.actions[R];b.current!==z&&(z.reset().play(),z.crossFadeFrom(b.current,S,!1),b.current=z)}const v=Math.atan2(-s.x,-s.z),_=[{x:s.x+Math.sin(v)*16,z:s.z+Math.cos(v)*16},{x:-60,z:-80},{x:205,z:25},{x:40,z:-200},{x:15,z:190}],E=[];for(const b of _){const R=KM(i,t,e,b.x,b.z);if(R){E.push(R);for(const S of R.spots)a.push(p(a.length,{x:S.x,z:S.z,camp:R}))}}function T(b){b.state="mati",b.deadT=0,b.hp=0,b.marked=!1,b.target=null,M(b,"die",.08)}function P(b){b.state="hidup",b.hp=Co,b.headless=!1,b.headMesh.visible=!0,b.kx=b.kz=0,b.flash=b.barTime=0,b.model.position.y=0,b.pos.set(b.home.x,i.heightAt(b.home.x,b.home.z),b.home.z),b.actions.die.stop(),b.current.stop(),b.current=b.actions.idle,b.current.reset().play()}function N(b){for(let R=0;R<4;R++){const S=Math.random()*Math.PI*2,z=Math.random()*GM,O=b.home.camp.x+Math.cos(S)*z,C=b.home.camp.z+Math.sin(S)*z;if(Uc(i,t,e,O,C,.5))return{x:O,z:C}}return null}function w(b,R,S){const z=Math.atan2(Math.sin(R-b.heading),Math.cos(R-b.heading));b.heading+=z*Math.min(1,6*S)}const A=new Ht,I=new Ht().makeTranslation(f.x,f.y,f.z);function G(b,R){let S=x.find(W=>!W.mesh.visible);S||(S={mesh:new te(m),vel:new B,axis:new B,spin:0,t:0,s:1},S.mesh.castShadow=!0,r.add(S.mesh),x.push(S)),b.root.updateMatrixWorld(!0);const z=b.headMesh.skeleton;A.multiplyMatrices(b.headBone.matrixWorld,z.boneInverses[z.bones.indexOf(b.headBone)]).multiply(b.headMesh.bindMatrix).multiply(I),A.decompose(S.mesh.position,S.mesh.quaternion,S.mesh.scale),S.s=S.mesh.scale.x,S.mesh.material=b.headMesh.material,S.mesh.visible=!0;let O=b.pos.x-R.x,C=b.pos.z-R.z;const U=Math.hypot(O,C)||1;O/=U,C/=U;const Y=(Math.random()-.5)*1.6,k=2+Math.random()*1.5;S.vel.set((O-C*Y)*k,4.5+Math.random()*1.5,(C+O*Y)*k),S.axis.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),S.spin=7+Math.random()*6,S.t=0,b.headMesh.visible=!1,b.headless=!0}function j(b){for(const R of x){if(!R.mesh.visible)continue;R.t+=b;const S=R.mesh.position;R.vel.y-=14*b,S.addScaledVector(R.vel,b),R.mesh.rotateOnWorldAxis(R.axis,R.spin*b);const z=Math.max(i.heightAt(S.x,S.z),-.2)+.4;S.y<z&&(S.y=z,R.vel.y<-2?(R.vel.set(R.vel.x*.55,-R.vel.y*.35,R.vel.z*.55),R.spin*=.5):(R.vel.set(0,0,0),R.spin=0)),R.t>3&&R.mesh.scale.setScalar(R.s*Math.max(0,1-(R.t-3)/.5)),R.t>3.5&&(R.mesh.visible=!1)}}let q=0;const y=new B;return{object:r,list:a,camps:E,get alive(){return a.filter(b=>b.state==="hidup").length},hit(b,R,S,z){const O=[];for(const C of a){if(C.state!=="hidup"||Math.hypot(C.pos.x-b.x,C.pos.z-b.z)>b.r+Uh)continue;let U=C.pos.x-z.x,Y=C.pos.z-z.z;const k=Math.hypot(U,Y)||1;U/=k,Y/=k,C.kx=U*S,C.kz=Y*S,C.hp-=R,C.flash=.15,C.barTime=4,C.target=null,C.hp<=0&&T(C),O.push({id:C.id,x:C.pos.x,y:C.pos.y,z:C.pos.z,dead:C.state!=="hidup"})}return O},decapitate(b,R){const S=[];for(const z of b){const O=a[z];!O||O.state!=="hidup"||(G(O,R),T(O),S.push({id:z,x:O.pos.x,y:O.pos.y,z:O.pos.z}))}return S},pickTargets(b,R,S,z){const O=a.filter(k=>k.state==="hidup"&&Math.hypot(k.pos.x-b,k.pos.z-R)<=S).sort((k,W)=>Math.hypot(k.pos.x-b,k.pos.z-R)-Math.hypot(W.pos.x-b,W.pos.z-R)).slice(0,z),C=[];let U=b,Y=R;for(;O.length;){let k=0;for(let tt=1;tt<O.length;tt++)Math.hypot(O[tt].pos.x-U,O[tt].pos.z-Y)<Math.hypot(O[k].pos.x-U,O[k].pos.z-Y)&&(k=tt);const[W]=O.splice(k,1);C.push({id:W.id,x:W.pos.x,z:W.pos.z}),U=W.pos.x,Y=W.pos.z}return C},position(b){const R=a[b];return R&&R.state==="hidup"?{x:R.pos.x,z:R.pos.z}:null},reviveAll(){for(const b of a)P(b)},mark(b,R){for(const S of b)a[S]&&(a[S].marked=R&&a[S].state==="hidup")},update(b,R,S){q+=b;const z=S.position,O=S.attackMove==="penggal";for(const C of a){const U=C.pos.x-z.x,Y=C.pos.z-z.z,k=Math.hypot(U,Y),W=k<WM;if(C.state==="hilang"){C.deadT+=b,C.deadT>XM&&P(C),C.root.visible=!1,C.bar.visible=C.reticle.visible=!1;continue}if(C.root.visible=W,C.state==="mati")C.deadT+=b,C.deadT>Po&&(C.model.position.y=-((C.deadT-Po)/kh)*.9),C.deadT>Po+kh&&(C.state="hilang",C.deadT=0);else{let tt=!1;if(Math.abs(C.kx)+Math.abs(C.kz)>.05){const H=C.pos.x+C.kx*b,K=C.pos.z+C.kz*b;i.heightAt(H,K)>-.3&&(C.pos.x=H,C.pos.z=K);const nt=Math.exp(-7*b);C.kx*=nt,C.kz*=nt}else if(k<VM)w(C,Math.atan2(-U,-Y),b),C.target=null;else if(C.target){const H=C.target.x-C.pos.x,K=C.target.z-C.pos.z,nt=Math.hypot(H,K);nt<.3?(C.target=null,C.wait=1.5+Math.random()*3):(w(C,Math.atan2(H,K),b),C.pos.x+=H/nt*zh*b,C.pos.z+=K/nt*zh*b,tt=!0)}else(C.wait-=b)<=0&&(C.target=N(C),C.wait=2);!O&&k<.75&&k>1e-4&&(C.pos.x=z.x+U/k*.75,C.pos.z=z.z+Y/k*.75);for(const H of a){if(H===C||H.state!=="hidup")continue;const K=C.pos.x-H.pos.x,nt=C.pos.z-H.pos.z,pt=Math.hypot(K,nt);pt<.7&&pt>1e-4&&(C.pos.x+=K/pt*(.7-pt)*.5,C.pos.z+=nt/pt*(.7-pt)*.5)}t.resolve(C.pos,Uh,y.set(0,0,0)),C.pos.y=i.heightAt(C.pos.x,C.pos.z),M(C,tt?"walk":"idle")}if(C.root.rotation.y=C.heading,C.flash>0){C.flash=Math.max(0,C.flash-b);for(const tt of C.materials)tt.emissive.setScalar(C.flash/.15*.8)}if(C.barTime-=b,C.bar.visible=W&&C.state==="hidup"&&C.barTime>0,C.bar.visible){C.bar.position.set(C.pos.x,C.pos.y+2.05,C.pos.z),C.bar.quaternion.copy(R.quaternion);const tt=Math.max(0,C.hp/Co);C.fill.scale.set(tt,.13,1),C.fill.position.x=-(1-tt)/2}C.reticle.visible=W&&C.marked&&C.state==="hidup",C.reticle.visible&&(C.reticle.position.set(C.pos.x,C.pos.y+jM,C.pos.z),C.reticle.quaternion.copy(R.quaternion),C.reticle.rotateZ(q*2.5),C.reticle.scale.setScalar(1+.12*Math.sin(q*14))),W&&C.mixer.update(b)}j(b)}}}const we=xe.y,ne={selatan:0,timur:Math.PI/2,utara:Math.PI,barat:-Math.PI/2};function ZM(i){const t=ka(8128),e=(y,b)=>y+(b-y)*t(),n=y=>y[Math.floor(t()*y.length)],s=nM(i.heightAt),r={spans:s,build:[],colliders:[],surfaces:[],roads:[],pave:[],lawn:[],fields:[],blocked:[],trees:[],boats:[],spots:[],paths:[],roofs:[]},a=(y,b,R,S,z)=>{const O=Math.cos(z),C=Math.sin(z);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([U,Y])=>[y+U*R/2*O+Y*S/2*C,b-U*R/2*C+Y*S/2*O])},o=(y,b,R,S,z)=>Math.max(...a(y,b,R,S,z).map(([O,C])=>i.heightAt(O,C)),i.heightAt(y,b)),c=(y,b,R,S,z,O)=>{r.colliders.push({x:y,z:b,hx:R/2,hz:S/2,rot:z,kind:O})},l=(y,b,R,S,z=0)=>r.blocked.push({x:y,z:b,hx:R/2,hz:S/2,rot:z}),u=y=>(r.build.push(y),y);function h(y,b,R,S,z,O,C="tembok",U="bata",Y=we){const k=Math.hypot(R-y,S-b);if(k<.5)return;const W=Math.atan2(R-y,S-b),tt=(y+R)/2,H=(b+S)/2;u({type:C,x:tt,y:Y,z:H,rot:W,len:k,t:z,h:O}),c(tt,H,z,k,W,U),l(tt,H,z+2,k,W)}function d(y,b,R){const S=[];let z=y;for(const[O,C]of[...R].sort((U,Y)=>U[0]-Y[0]))O-C>z&&S.push([z,O-C]),z=Math.max(z,O+C);return b>z&&S.push([z,b]),S}const f=2.2,m=5,x=7.5,g={utara:[-580,-490],selatan:[-630,-480],barat:[-10,50],timur:[-20,100]},p=[[xe.x0,xe.z0],[xe.x1,xe.z0],[xe.x1,xe.z1],[xe.x0,xe.z1]];for(const[y,b]of p)u({type:"menara",x:y,y:we,z:b,rot:0,size:x,h:7.6}),c(y,b,x,x,0,"bata"),l(y,b,x+2,x+2);const M=y=>Ky.filter(b=>y==="utara"&&b.z===xe.z0||y==="selatan"&&b.z===xe.z1||y==="barat"&&b.x===xe.x0||y==="timur"&&b.x===xe.x1),v=y=>y.id==="timur"?5.5:4.5;for(const y of["utara","selatan","barat","timur"]){const b=y==="utara"||y==="selatan",R={utara:xe.z0,selatan:xe.z1,barat:xe.x0,timur:xe.x1}[y],[S,z]=b?[xe.x0,xe.x1]:[xe.z0,xe.z1],O=[[S,x/2],[z,x/2]];for(const C of g[y]){O.push([C,3]);const[U,Y]=b?[C,R]:[R,C];u({type:"menara",x:U,y:we,z:Y,rot:0,size:6,h:6.8}),c(U,Y,6,6,0,"bata"),l(U,Y,8,8)}for(const C of M(y)){const U=b?C.x:C.z,Y=v(C);O.push([U,C.w/2+Y]);for(const k of[-1,1]){const W=U+k*(C.w/2+Y/2),[tt,H]=b?[W,R]:[R,W],K=b?0:Math.PI/2;u({type:"bentar",x:tt,y:we,z:H,rot:K,w:Y,d:4.2,h:C.id==="timur"?13:10.5,mirror:k>0?b?1:-1:b?-1:1}),c(tt,H,b?Y:4.2,b?4.2:Y,0,"bata"),l(tt,H,Y+1,5.2,K)}for(const k of[-1,1]){const W=U+k*(C.w/2-.9);for(const tt of[-3.6,3.6]){const[H,K]=b?[W,R+tt]:[R+tt,W],nt=b?tt>0?ne.selatan:ne.utara:tt>0?ne.timur:ne.barat;r.spots.push({x:H,z:K,rot:nt,role:"penjaga",anim:"idle"})}}}for(const[C,U]of d(S,z,O))b?h(C,R,U,R,f,m):h(R,C,R,U,f,m)}for(const y of $y)r.roads.push(y);{const y=od,b=1.2,R=3.6,S=y.gate,z=5,O=9;h(y.x0,y.z0,y.x1,y.z0,b,R,"tembok-dalam"),h(y.x0,y.z1,y.x1,y.z1,b,R,"tembok-dalam"),h(y.x0,y.z0,y.x0,y.z1,b,R,"tembok-dalam"),h(y.x1,y.z0,y.x1,S.z-O/2,b,R,"tembok-dalam"),h(y.x1,S.z+O/2,y.x1,y.z1,b,R,"tembok-dalam"),u({type:"paduraksa",x:S.x,y:we,z:S.z,rot:Math.PI/2,w:O,d:5,opening:z,h:15});for(const K of[-1,1]){const nt=S.z+K*(z/2+(O-z)/4);c(S.x,nt,5,(O-z)/2,0,"bata"),r.spots.push({x:S.x+3.4,z:S.z+K*2.1,rot:ne.timur,role:"penjaga",anim:"idle"})}l(S.x,S.z,6,O+1),r.roofs.push({x:S.x,z:S.z,hx:3.5,hz:z/2,r:6});const C={x:-628,z:40,w:30,d:28,h:1};u({type:"pendopo",x:C.x,y:we,z:C.z,rot:Math.PI/2,w:C.d,d:C.w,h:C.h}),r.surfaces.push({x:C.x,z:C.z,hx:C.w/2,hz:C.d/2,rot:0,y0:we+C.h,y1:we+C.h});const U=10,Y=3.2;r.surfaces.push({x:C.x+C.w/2+Y/2,z:C.z,hx:U/2,hz:Y/2,rot:-Math.PI/2,y0:we+.02,y1:we+C.h});const k=C.x+C.w/2,W=C.x-C.w/2,tt=C.z-C.d/2,H=C.z+C.d/2;for(const[K,nt,pt,Pt]of[[W,tt,k,tt],[W,H,k,H],[W,tt,W,H],[k,tt,k,C.z-U/2],[k,C.z+U/2,k,H]]){const V=Math.hypot(pt-K,Pt-nt),ct=Math.atan2(pt-K,Pt-nt);c((K+pt)/2,(nt+Pt)/2,.5,V,ct,"batu")}l(C.x,C.z,C.w+2,C.d+2),r.roofs.push({x:C.x,z:C.z,hx:C.w/2+1.5,hz:C.d/2+1.5,r:10});for(const[K,nt]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:C.x+K*3.2,z:C.z+nt*3.2,radius:.35,kind:"kayu"});for(let K=-2;K<=2;K++)for(const nt of[-1,1])r.colliders.push({x:C.x+K*6.3,z:C.z+nt*12.4,radius:.28,kind:"kayu"}),Math.abs(K)<2&&!(nt>0&&K===0)&&r.colliders.push({x:C.x+nt*13.4,z:C.z+K*6.2,radius:.28,kind:"kayu"});r.spots.push({x:C.x-9.2,z:C.z,rot:ne.timur,role:"raja",anim:"sit",y:we+C.h+.5}),r.spots.push({x:C.x-8,z:C.z-3,rot:ne.timur,role:"penjaga",anim:"idle",y:we+C.h}),r.spots.push({x:C.x-8,z:C.z+3,rot:ne.timur,role:"penjaga",anim:"idle",y:we+C.h});for(const K of[-1,1])r.spots.push({x:k+Y+1.2,z:C.z+K*6,rot:ne.timur,role:"penjaga",anim:"idle"});u({type:"bangsal",x:-669,y:we,z:40,rot:Math.PI/2,w:32,d:16,h:1.5}),c(-669,40,16,32,0,"bata"),l(-669,40,18,34);for(const[K,nt,pt]of[[-676,9,9],[-676,71,7]])u({type:"meru",x:K,y:we,z:nt,rot:0,base:7,tiers:pt}),c(K,nt,7,7,0,"bata"),l(K,nt,9,9);for(const[K,nt]of[[-647,8],[-647,72],[-612,9],[-612,71]]){u({type:"bale",x:K,y:we,z:nt,rot:0,w:6,d:6}),r.roofs.push({x:K,z:nt,hx:3.5,hz:3.5,r:5});for(const[pt,Pt]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:K+pt*2.6,z:nt+Pt*2.6,radius:.22,kind:"kayu"});l(K,nt,7,7)}r.lawn.push({x0:y.x0+1,z0:y.z0+1,x1:y.x1-1,z1:y.z1-1}),r.pave.push({x0:k,z0:S.z-5,x1:y.x1,z1:S.z+5}),r.pave.push({x0:W-2,z0:tt-2,x1:k+2,z1:H+2}),r.pave.push({x0:-680,z0:20,x1:W,z1:60});for(const[K,nt]of[[-660,4],[-660,76],[-626,4],[-626,76],[-640,16],[-640,64],[-686,30],[-686,50]])r.trees.push({type:"kamboja",x:K,z:nt,s:e(.9,1.15)});r.pave.push({x0:y.x1,z0:y.z0,x1:mh.x0,z1:y.z1});for(let K=y.z0+6;K<=y.z1-6;K+=12)Math.abs(K-S.z)<8||(u({type:"umbul",x:y.x1+7,y:we,z:K,rot:Math.PI/2,h:9,color:Math.round(K)%3}),r.colliders.push({x:y.x1+7,z:K,radius:.18,kind:"kayu"}))}{const y=mh;r.lawn.push({...y});for(const b of[26,54]){const R=(y.x0+y.x1)/2;r.trees.push({type:"beringin",x:R,z:b,s:1}),r.colliders.push({x:R,z:b,radius:1.7,kind:"pohon"});const S=6;for(const[z,O,C,U]of[[R-S,b-S,R+S,b-S],[R-S,b+S,R+S,b+S],[R-S,b-S,R-S,b+S],[R+S,b-S,R+S,b+S]])h(z,O,C,U,.45,1.1,"pagar")}for(let b=0;b<6;b++){const R=b/6*Math.PI*2,S=b<3?26:54;r.spots.push({x:(y.x0+y.x1)/2+Math.cos(R)*8.5,z:S+Math.sin(R)*8.5,rot:R+Math.PI/2,role:"warga",anim:b%2?"sit":"idle"})}}{const y=Zy;r.pave.push({...y});const b=[-492,-478,-464,-450,-437],R=[55,66,76],S=["buah","ikan","kain","sayur","gerabah"];R.forEach((z,O)=>b.forEach((C,U)=>{if(O===1&&U===2)return;const Y=O===0?ne.utara:ne.selatan;u({type:"warung",x:C,y:we,z,rot:Y,color:(O*5+U)%6,goods:S[(O+U*2)%S.length]}),c(C,z,3.6,2.2,0,"kayu"),l(C,z,4.4,3.4);const k=O===0?1.9:-1.9;r.spots.push({x:C+e(-.8,.8),z:z+k,rot:Y,role:"penjual",anim:n(["idle","interact","interact"])})})),u({type:"sumur",x:-464,y:we,z:66,rot:0}),r.colliders.push({x:-464,z:66,radius:1.1,kind:"batu"});for(const[z,O]of[[-497,50],[-433,50],[-497,80],[-433,80]])r.trees.push({type:"mangga",x:z,z:O,s:.8});for(let z=0;z<8;z++)r.spots.push({x:e(y.x0+4,y.x1-4),z:n([60.5,71]),rot:t()*Math.PI*2,role:"pembeli",anim:"idle"})}{const y=qy;r.pave.push({...y});const b=6;h(y.x0,y.z0,y.x1,y.z0,.8,1.6,"pagar-batu","batu"),h(y.x0,y.z0,y.x0,y.z1,.8,1.6,"pagar-batu","batu"),h(y.x1,y.z0,y.x1,y.z1,.8,1.6,"pagar-batu","batu"),h(y.x0,y.z1,y.x-b/2-3,y.z1,.8,1.6,"pagar-batu","batu"),h(y.x+b/2+3,y.z1,y.x1,y.z1,.8,1.6,"pagar-batu","batu");for(const R of[-1,1]){const S=y.x+R*(b/2+1.5);u({type:"bentar",x:S,y:we,z:y.z1,rot:0,w:3,d:2.6,h:6.5,mirror:R,stone:!0}),c(S,y.z1,3,2.6,0,"batu")}u({type:"candi",x:y.x,y:we,z:y.z,rot:0,base:17}),c(y.x,y.z,17,17,0,"batu"),l(y.x,y.z,19,19);for(const[R,S]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const z=y.x+R*21,O=y.z+S*23;u({type:"candi",x:z,y:we,z:O,rot:0,base:6}),c(z,O,6,6,0,"batu"),l(z,O,7,7)}r.spots.push({x:y.x,z:y.z+12,rot:ne.utara,role:"pendeta",anim:"sit"}),r.spots.push({x:y.x-3,z:y.z+12.5,rot:ne.utara,role:"warga",anim:"sit"})}const _=[-694,-647,-600,-553,-504],E={"-694":5,"-647":5,"-600":5,"-553":5,"-504":6,"-426":5},T=[{z:[-54,-29],w:[5,5]},{z:[-29,-5],w:[5,6]},{z:[85,110],w:[6,5],east:!0},{z:[110,134],w:[5,5],east:!0}],P=y=>y<-600?["joglo","joglo","bata","bata","panggung"]:["bata","bata","panggung","panggung","joglo","limasan"];function N(y,b,R,S,z){let O=y+e(.4,1.4);for(;O<b-5;){const C=n(P(O)),U=C==="joglo"?e(8,9.5):C==="panggung"?e(5.6,6.8):e(6.4,8.2);if(O+U>b)break;const Y=Math.min(z,C==="joglo"?e(7,8):C==="panggung"?e(5.4,6.2):e(6,7.2)),k=O+U/2,W=R+(S===ne.utara?Y/2:-Y/2);w(C,k,W,U,Y,S),O+=U+e(1,2.4)}}function w(y,b,R,S,z,O){const C=o(b,R,S,z,O);u({type:`rumah-${y}`,x:b,y:C,z:R,rot:O,w:S,d:z,roof:Math.floor(t()*4),wall:t()}),c(b,R,S+(y==="panggung"?.3:.1),z+.1,O,y==="bata"||y==="limasan"?"bata":"kayu"),l(b,R,S+1.5,z+1.5,O)}for(const y of T){const b=y.east?[..._,-426]:_;for(let R=0;R<b.length-1;R++){const S=b[R]+E[b[R]]/2+.8,z=b[R+1]-E[b[R+1]]/2-.8,O=y.z[0]+y.w[0]/2+.8,C=y.z[1]-y.w[1]/2-.8,U=C-O;U>=13?(N(S,z,O,ne.utara,(U-1)/2),N(S,z,C,ne.selatan,(U-1)/2)):N(S,z,O,ne.utara,U);const Y=(O+C)/2;for(let k=S+6;k<z-4;k+=e(9,15))r.trees.push({type:n(["mangga","pisang","pisang","kelapa"]),x:k+e(-1,1),z:Y+e(-.6,.6),s:e(.75,1)})}}const A=[{x0:-418,z0:-175,x1:-340,z1:22},{x0:-418,z0:58,x1:-345,z1:225},{x0:-790,z0:-175,x1:-665,z1:-72},{x0:-638,z0:-185,x1:-560,z1:-75}];for(const y of A)r.fields.push(y);const I=xh("sawah");r.fields.push({x:I.x,z:I.z,r:I.r*.82});const G=(y,b)=>r.fields.some(R=>R.r?Math.hypot(y-R.x,b-R.z)<R.r:Ic(y,b,R));function j(y,b,R,S,z){for(const[O,C]of[...a(y,b,R+2,S+2,z),[y,b]]){const U=i.heightAt(O,C);if(U<2.6||U>16||r.roads.some(([Y,k,W,tt,H])=>cd(O,C,Y,k,W,tt)<H/2+.6)||Ss(O,C,xe)<6)return!1}return i.slopeAt(y,b)>.25?!1:!r.blocked.some(O=>Math.hypot(O.x-y,O.z-b)<Math.hypot(O.hx,O.hz)+Math.hypot(R,S)/2+1)}function q(y,b,R,S,z,O,C,U=!1){const Y=Math.hypot(R-y,S-b),k=(R-y)/Y,W=(S-b)/Y;for(let tt=e(4,10);tt<Y-4;tt+=O+e(-2,4))for(const H of[-1,1]){if(t()<.22)continue;const K=n(C),nt=K==="lumbung"?3.6:K==="panggung"?e(5.6,6.8):e(6.2,7.8),pt=K==="lumbung"?3.6:K==="panggung"?e(5.4,6.2):e(5.8,7),Pt=z/2+1.8+pt/2,V=y+k*tt-W*H*Pt,ct=b+W*tt+k*H*Pt,X=Math.atan2(W*H,-k*H);!U&&G(V,ct)||j(V,ct,nt,pt,X)&&w(K,V,ct,nt,pt,X)}}q(-420,40,-340,40,7,11,["panggung","bata","limasan","panggung"],!0),q(-553,146,-553,262,6,10,["panggung","bata","limasan","lumbung"],!0),q(-647,-64,-647,-170,5,12,["panggung","lumbung","panggung"],!0),q(-704,110,-770,110,5,11,["panggung","bata","panggung"],!0),q(-730,116,-730,196,5,11,["panggung","lumbung","panggung"],!0);{let y=250;for(;i.heightAt(-553,y)>hr&&y<320;)y+=.25;const b={x0:-590,z0:y-16,x1:-516,z1:y-1};r.pave.push(b),r.roads.push([-553,262,-553,y-8,8]);for(const S of[-580,-526]){const z=o(S,b.z0-5,14,8,0);u({type:"gudang",x:S,y:z,z:b.z0-5,rot:ne.selatan,w:14,d:8}),c(S,b.z0-5,14,8,0,"kayu"),l(S,b.z0-5,15,9)}const R=1.75;for(const S of[-578,-553,-528]){const O=y-2+18;u({type:"dermaga",x:S,y:R,z:O,rot:0,w:4,len:36}),r.surfaces.push({x:S,z:O,hx:2,hz:36/2,rot:0,y0:R,y1:R}),l(S,O,5,36),r.paths.push([S,b.z0+6,S,y-2+36-2]),r.boats.push({type:"jukung",x:S-4.2,z:O+e(-6,8),rot:t()*.2-.1}),r.boats.push({type:"jukung",x:S+4.2,z:O+e(-8,6),rot:Math.PI+t()*.2-.1}),r.spots.push({x:S+e(-1,1),z:y+36-6,rot:ne.selatan,role:"nelayan",anim:"interact"})}r.boats.push({type:"jong",x:-542,z:y+30,rot:.08}),r.paths.push([-578,b.z0+6,-528,b.z0+6]);for(let S=0;S<10;S++){const z=e(b.x0+3,b.x1-3),O=e(b.z0+1.5,b.z0+4);Math.abs(z+578)<3||Math.abs(z+553)<3||Math.abs(z+528)<3||(u({type:t()<.5?"peti":"gentong",x:z,y:i.heightAt(z,O),z:O,rot:t()*Math.PI}),r.colliders.push({x:z,z:O,radius:.55,kind:"kayu"}))}for(let S=0;S<5;S++)r.spots.push({x:e(b.x0+4,b.x1-4),z:b.z0+2.2,rot:ne.selatan,role:"kuli",anim:n(["interact","idle"])});r.harbor={shore:y,quay:b}}for(const y of s){const b=Math.min(y.a,y.b)-4,R=Math.max(y.a,y.b)+4,S=(b+R)/2,z=(R-b)/2,O=hr+.15,C=y.axis==="x"?Math.PI/2:0,[U,Y]=y.axis==="x"?[S,y.at]:[y.at,S],k=(Math.min(y.a,y.b)-b)/(2*z),W=(Math.max(y.a,y.b)-b)/(2*z),tt={x:U,z:Y,hx:y.width/2,hz:z,rot:C,y0:O,y1:O,arch:y.rise,a0:k,a1:W};r.surfaces.push(tt),u({type:y.stone?"jembatan-batu":"jembatan-kayu",x:U,y:0,z:Y,rot:C,len:2*z,w:y.width,surface:tt,a:y.a,b:y.b,axis:y.axis,at:y.at});for(const H of[-1,1]){const K=H*(y.width/2-.2),[nt,pt]=y.axis==="x"?[S,y.at+K]:[y.at+K,S];r.colliders.push({x:nt,z:pt,hx:.2,hz:z-1,rot:C,kind:y.stone?"bata":"kayu"})}if(l(U,Y,y.width+3,2*z+6,C),r.roads.push(y.axis==="x"?[b-6,y.at,R+6,y.at,y.width-1]:[y.at,b-6,y.at,R+6,y.width-1]),r.paths.push(y.axis==="x"?[b-2,y.at,R+2,y.at]:[y.at,b-2,y.at,R+2]),y.stone)for(const H of[b-7,R+7]){for(const pt of[-1,1]){const Pt=pt*(y.width/2+1.7),[V,ct]=y.axis==="x"?[H,y.at+Pt]:[y.at+Pt,H];u({type:"bentar",x:V,y:i.heightAt(V,ct),z:ct,rot:C,w:3.4,d:3.4,h:9,mirror:-pt}),c(V,ct,3.4,3.4,0,"bata"),r.spots.push({x:H+(H<S?-2.8:2.8),z:y.at+pt*(y.width/2-.4),rot:H<S?ne.barat:ne.timur,role:"penjaga",anim:"idle"})}const[K,nt]=y.axis==="x"?[H+(H<S?-6:6),y.at]:[y.at,H];r.pave.push({x0:K-9,z0:nt-9,x1:K+9,z1:nt+9});for(const pt of[-1,1]){const[Pt,V]=[K+(H<S?-1:1)*3,nt+pt*8];u({type:"umbul",x:Pt,y:i.heightAt(Pt,V),z:V,rot:0,h:9,color:pt>0?0:2}),r.colliders.push({x:Pt,z:V,radius:.18,kind:"kayu"})}}}{const y=s.find(z=>z.id==="sawah"),b=y.b-16,R=y.at;r.pave.push({x0:R-9,z0:b-9,x1:R+9,z1:b+9}),r.roads.push([R,y.b,R,b,3]);const S=[[-15,-2,ne.timur,"panggung"],[15,-2,ne.barat,"panggung"],[-14,-16,ne.timur,"lumbung"],[14,-16,ne.barat,"lumbung"],[-4,-22,ne.selatan,"panggung"],[6,-22,ne.selatan,"lumbung"],[-15,12,ne.timur,"lumbung"],[15,12,ne.barat,"panggung"]];for(const[z,O,C,U]of S){const Y=U==="lumbung"?3.6:6.2,k=U==="lumbung"?3.6:5.8;w(U,R+z,b+O,Y,k,C)}r.trees.push({type:"mangga",x:R-4,z:b+4,s:1.1});for(let z=0;z<10;z++){const O=t()*Math.PI*2,C=e(30,70),U=I.x+Math.cos(O)*C,Y=I.z+Math.sin(O)*C;i.heightAt(U,Y)<2.6||r.spots.push({x:U,z:Y,rot:t()*Math.PI*2,role:"petani",anim:n(["pickup","pickup","idle"])})}for(const[z,O]of[[-45,-30],[40,-45],[-30,40]]){const C=I.x+z,U=I.z+O;u({type:"dangau",x:C,y:i.heightAt(C,U),z:U,rot:t()*Math.PI,w:3,d:3}),r.colliders.push({x:C,z:U,hx:1.5,hz:1.5,rot:0,kind:"kayu"}),l(C,U,4,4)}r.roads.push([R,b,R,I.z-70,2.2],[R-50,I.z,R+50,I.z,2.2])}{const y=xh("nelayan"),b=s.find(C=>C.id==="nelayan"),R=y.x,S=y.z-4;r.pave.push({x0:R-8,z0:S-8,x1:R+8,z1:S+8}),r.roads.push([b.at,b.b,b.at,S,3],[b.at,S,R,S,3]);for(let C=0;C<11;C++){const U=C/11*Math.PI*2+.3,Y=22+C%2*9,k=R+Math.cos(U)*Y,W=S+Math.sin(U)*Y,tt=Math.atan2(R-k,S-W);j(k,W,6.2,5.8,tt)&&w("panggung",k,W,6.2,5.8,tt)}for(let C=0;C<6;C++){const U=Math.PI*(.15+C*.13),Y=R+Math.cos(U)*45,k=S+Math.sin(U)*45;i.heightAt(Y,k)<1.2||(u({type:"jemuran",x:Y,y:i.heightAt(Y,k),z:k,rot:U}),r.colliders.push({x:Y,z:k,hx:1.8,hz:.4,rot:U,kind:"kayu"}))}let z=y.z;for(;i.heightAt(y.x,z)>hr&&z<y.z+140;)z+=.25;const O=26;u({type:"dermaga",x:y.x,y:1.75,z:z-2+O/2,rot:0,w:3.2,len:O}),r.surfaces.push({x:y.x,z:z-2+O/2,hx:1.6,hz:O/2,rot:0,y0:1.75,y1:1.75}),r.roads.push([y.x,S,y.x,z-1,3]),r.paths.push([y.x,z-1,y.x,z+O-4]);for(let C=0;C<4;C++)r.boats.push({type:"jukung",x:y.x+(C%2?3.4:-3.4),z:z+6+C*5,rot:(C%2?Math.PI:0)+t()*.2});for(let C=0;C<5;C++){const U=Math.PI*(.9+C*.22);let Y=40;for(;Y<120&&i.heightAt(y.x+Math.cos(U)*Y,y.z+Math.sin(U)*Y)>.6;)Y+=.5;r.boats.push({type:"jukung-darat",x:y.x+Math.cos(U)*(Y-3),z:y.z+Math.sin(U)*(Y-3),rot:U+Math.PI/2})}for(let C=0;C<6;C++)r.spots.push({x:R+e(-14,14),z:S+e(-14,14),rot:t()*Math.PI*2,role:"nelayan",anim:n(["interact","idle","sit"])})}{const y=s.find(O=>O.id==="pura"),b=sr,R={x0:b.x-15,z0:b.z-13,x1:b.x+15,z1:b.z+13},S=i.heightAt(b.x,b.z);r.pave.push(R),r.roads.push([y.b,b.z,R.x1,b.z,4]),r.paths.push([R.x1,b.z,b.x,b.z]);const z=4;h(R.x0,R.z0,R.x1,R.z0,.8,1.8,"pagar","bata",S),h(R.x0,R.z1,R.x1,R.z1,.8,1.8,"pagar","bata",S),h(R.x0,R.z0,R.x0,R.z1,.8,1.8,"pagar","bata",S),h(R.x1,R.z0,R.x1,b.z-z/2-2.6,.8,1.8,"pagar","bata",S),h(R.x1,b.z+z/2+2.6,R.x1,R.z1,.8,1.8,"pagar","bata",S);for(const O of[-1,1]){const C=b.z+O*(z/2+1.3);u({type:"bentar",x:R.x1,y:S,z:C,rot:Math.PI/2,w:2.6,d:2.4,h:7,mirror:-O}),c(R.x1,C,2.4,2.6,0,"bata")}for(const[O,C,U,Y]of[[-8,-6,11,6],[-8,6,7,5],[2,7,3,4]])u({type:"meru",x:b.x+O,y:S,z:b.z+C,rot:0,base:Y,tiers:U}),c(b.x+O,b.z+C,Y,Y,0,"bata");u({type:"bale",x:b.x+3,y:S,z:b.z-6,rot:0,w:5,d:5}),r.roofs.push({x:b.x+3,z:b.z-6,hx:3,hz:3,r:4.5});for(const[O,C]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:b.x+3+O*2.1,z:b.z-6+C*2.1,radius:.2,kind:"kayu"});for(const[O,C]of[[10,-9],[10,9],[-13,0]])r.trees.push({type:"kamboja",x:b.x+O,z:b.z+C,s:1});for(let O=y.b-6;O>R.x1+4;O-=7)for(const C of[-1,1]){const U=b.z+C*3.2;u({type:"umbul",x:O,y:i.heightAt(O,U),z:U,rot:0,h:7,color:1}),r.colliders.push({x:O,z:U,radius:.15,kind:"kayu"})}r.spots.push({x:b.x+1,z:b.z+1,rot:ne.barat,role:"pendeta",anim:"sit",y:S}),r.spots.push({x:b.x-1,z:b.z-2,rot:ne.barat,role:"warga",anim:"sit",y:S})}for(const[y,b,R,S,z]of[[-420,40,-340,40,7],[-553,146,-553,262,6]]){const O=Math.hypot(R-y,S-b);for(let C=6;C<O;C+=13)for(const U of[-1,1]){const Y=C/O,k=y+(R-y)*Y+(b===S?0:U*(z/2+1.2)),W=b+(S-b)*Y+(b===S?U*(z/2+1.2):0);r.blocked.some(tt=>Math.hypot(tt.x-k,tt.z-W)<Math.hypot(tt.hx,tt.hz)+1.5)||r.trees.push({type:"kelapa",x:k,z:W,s:e(.85,1.1)})}}for(const y of r.trees){const b={beringin:0,kamboja:.3,mangga:.5,kelapa:.4,pisang:0}[y.type];b&&r.colliders.push({x:y.x,z:y.z,radius:b*y.s,kind:"pohon"})}return r}const Le={x0:-980,z0:-470,x1:-150,z1:480};function $M(i,t){const e=Le.x1-Le.x0,n=Le.z1-Le.z0,s=new Uint8Array(e*n*4),r=new Uint8Array(e*n),a=f=>Le.x0+f+.5,o=f=>Le.z0+f+.5;function c(f,m,x,g,p,M){const v=Math.max(0,Math.floor(m-Le.x0)),_=Math.min(e-1,Math.ceil(g-Le.x0)),E=Math.max(0,Math.floor(x-Le.z0)),T=Math.min(n-1,Math.ceil(p-Le.z0));for(let P=E;P<=T;P++)for(let N=v;N<=_;N++){const w=M(a(N),o(P));if(w<=0)continue;const A=(P*e+N)*4+f;s[A]=Math.max(s[A],Math.round(Math.min(1,w)*255))}}const l=f=>Math.min(1,Math.max(0,.5-f)),u=(f,m)=>{const x=t.heightAt(f,m);return x>2.5&&x<14&&t.slopeAt(f,m)<.22};for(const f of i.fields)f.r?c(1,f.x-f.r,f.z-f.r,f.x+f.r,f.z+f.r,(m,x)=>u(m,x)?l(Math.hypot(m-f.x,x-f.z)-f.r):0):c(1,f.x0,f.z0,f.x1,f.z1,(m,x)=>u(m,x)?l(Ss(m,x,f)):0);for(const f of i.lawn)c(3,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(m,x)=>l(Ss(m,x,f)));for(const[f,m,x,g,p]of i.roads)c(0,Math.min(f,x)-p,Math.min(m,g)-p,Math.max(f,x)+p,Math.max(m,g)+p,(M,v)=>l(cd(M,v,f,m,x,g)-p/2));for(const f of i.pave)c(2,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(m,x)=>l(Ss(m,x,f)));for(let f=0;f<e*n;f++){const m=Math.max(s[f*4],s[f*4+2])/255;s[f*4+1]=Math.round(s[f*4+1]*(1-m)),s[f*4+3]=Math.round(s[f*4+3]*(1-m)),(s[f*4]>60||s[f*4+1]>60||s[f*4+2]>60)&&(r[f]=1)}for(const f of i.blocked){const m=Math.hypot(f.hx,f.hz)+1,x=Math.cos(f.rot||0),g=Math.sin(f.rot||0);for(let p=Math.max(0,Math.floor(f.z-m-Le.z0));p<=Math.min(n-1,Math.ceil(f.z+m-Le.z0));p++)for(let M=Math.max(0,Math.floor(f.x-m-Le.x0));M<=Math.min(e-1,Math.ceil(f.x+m-Le.x0));M++){const v=a(M)-f.x,_=o(p)-f.z;Math.abs(v*x-_*g)<=f.hx+1&&Math.abs(v*g+_*x)<=f.hz+1&&(r[p*e+M]=1)}}const h=new Xi(s,e,n,Be,mn);h.magFilter=Oe,h.minFilter=dn,h.generateMipmaps=!0,h.wrapS=h.wrapT=Un,h.needsUpdate=!0;const d=(f,m)=>{const x=Math.floor(f-Le.x0),g=Math.floor(m-Le.z0);return x>=0&&g>=0&&x<e&&g<n&&r[g*e+x]===1};return{texture:h,data:s,x0:Le.x0,z0:Le.z0,width:e,depth:n,reserved:(f,m,x=0)=>d(f,m)||d(f+x,m)||d(f-x,m)||d(f,m+x)||d(f,m-x),at(f,m){const x=Math.floor(f-Le.x0),g=Math.floor(m-Le.z0);if(x<0||g<0||x>=e||g>=n)return null;const p=(g*e+x)*4;return{jalan:s[p]/255,sawah:s[p+1]/255,batu:s[p+2]/255,rumput:s[p+3]/255}}}}const Q={POLOS:0,BATA:1,GENTENG:2,JERAMI:3,KAYU:4,BATU:5,SIRAP:6,UBIN:7,ANYAMAN:8,PLESTER:9},it={bata:"#a5523a",batuPutih:"#d3c8b2",andesit:"#8f8b84",andesitTua:"#6e6b66",kayu:"#8a5a35",kayuTua:"#5e3d24",kayuMuda:"#b08454",plester:"#ebe3d1",genteng:"#b65a32",gentengTua:"#5a4a40",ijuk:"#3d3732",alang:"#bb9c5c",bambu:"#c9ad74",emas:"#d9a82e",gelap:"#2b2420",merah:"#c8312a",putih:"#f0eee5",kuning:"#e2b32b"},oa=new Dt,Lo=new Ht,Fh=new jt,Bh=new _e,Hh=new tn,Kn=new B,xi=new B,ca=new B;class he{constructor(){this.pos=[],this.nor=[],this.col=[],this.kind=[],this.sway=[]}add(t,e,n,s={}){const r=t.index?t.toNonIndexed():t;return this.addRaw(r.attributes.position.array,r.attributes.normal.array,e,n,s)}addRaw(t,e,n,s,{x:r=0,y:a=0,z:o=0,rx:c=0,ry:l=0,rz:u=0,sx:h=1,sy:d=1,sz:f=1,shade:m=[.84,1.04],sway:x=0}={}){let g=1/0,p=-1/0;for(let T=1;T<t.length;T+=3)t[T]<g&&(g=t[T]),t[T]>p&&(p=t[T]);const M=Math.max(.001,p-g);oa.set(n);const v=c===0&&u===0&&h===1&&d===1&&f===1,_=Math.cos(l),E=Math.sin(l);v||(Hh.set(c,l,u),Bh.setFromEuler(Hh),Lo.compose(Kn.set(r,a,o),Bh,xi.set(h,d,f)),Fh.getNormalMatrix(Lo));for(let T=0;T<t.length;T+=3){const P=(t[T+1]-g)/M,N=m[0]+(m[1]-m[0])*P;v?(this.pos.push(r+t[T]*_+t[T+2]*E,a+t[T+1],o-t[T]*E+t[T+2]*_),this.nor.push(e[T]*_+e[T+2]*E,e[T+1],-e[T]*E+e[T+2]*_)):(Kn.set(t[T],t[T+1],t[T+2]).applyMatrix4(Lo),this.pos.push(Kn.x,Kn.y,Kn.z),Kn.set(e[T],e[T+1],e[T+2]).applyMatrix3(Fh).normalize(),this.nor.push(Kn.x,Kn.y,Kn.z)),this.col.push(oa.r*N,oa.g*N,oa.b*N),this.kind.push(s),this.sway.push(x*P)}return this}box(t,e,n,s,r,a={}){const o=t/2,c=n/2,l=[],u=[],h=(d,f,m,x,g)=>{for(const p of[d,f,m,d,m,x])l.push(p[0],p[1],p[2]),u.push(g[0],g[1],g[2])};return h([o,0,c],[o,0,-c],[o,e,-c],[o,e,c],[1,0,0]),h([-o,0,-c],[-o,0,c],[-o,e,c],[-o,e,-c],[-1,0,0]),h([-o,0,c],[o,0,c],[o,e,c],[-o,e,c],[0,0,1]),h([o,0,-c],[-o,0,-c],[-o,e,-c],[o,e,-c],[0,0,-1]),h([-o,e,c],[o,e,c],[o,e,-c],[-o,e,-c],[0,1,0]),h([-o,0,-c],[o,0,-c],[o,0,c],[-o,0,c],[0,-1,0]),this.addRaw(l,u,s,r,a)}cyl(t,e,n,s,r,a,o={}){return this.add(new Ge(t,e,n,s).translate(0,n/2,0),r,a,o)}faces(t,e,n,s={}){const r=[],a=[];for(const[o,c,l]of t){xi.set(c[0]-o[0],c[1]-o[1],c[2]-o[2]),ca.set(l[0]-o[0],l[1]-o[1],l[2]-o[2]),xi.cross(ca).normalize();for(const u of[o,c,l])r.push(u[0],u[1],u[2]),a.push(xi.x,xi.y,xi.z)}return this.addRaw(r,a,e,n,{shade:[.96,1.04],...s})}skirt(t,e,n,s,r,a,o,c,l={}){const u=[[-t/2,n,-e/2],[t/2,n,-e/2],[t/2,n,e/2],[-t/2,n,e/2]],h=[[-s/2,a,-r/2],[s/2,a,-r/2],[s/2,a,r/2],[-s/2,a,r/2]],d=[];for(let f=0;f<4;f++){const m=(f+1)%4;d.push([u[m],u[f],h[f]],[u[m],h[f],h[m]])}return this.faces(d.filter(([f,m,x])=>(xi.set(m[0]-f[0],m[1]-f[1],m[2]-f[2]),ca.set(x[0]-f[0],x[1]-f[1],x[2]-f[2]),xi.cross(ca).lengthSq()>1e-8)),o,c,l)}hip(t,e,n,s,r,a,o={}){const c=Math.max(0,Math.abs(t-e)*.9);return t>=e?this.skirt(t,e,n,c,0,n+s,r,a,o):this.skirt(t,e,n,0,c,n+s,r,a,o)}gable(t,e,n,s,r,a,o=r,c=a,l={}){const u=[-t/2,n,-e/2],h=[t/2,n,-e/2],d=[t/2,n,e/2],f=[-t/2,n,e/2],m=[-t/2,n+s,0],x=[t/2,n+s,0];return this.faces([[h,u,m],[h,m,x],[f,d,x],[f,x,m]],r,a,l),this.faces([[u,f,m],[d,h,x]],o,c,l)}build(){const t=new se;return t.setAttribute("position",new Gt(this.pos,3)),t.setAttribute("normal",new Gt(this.nor,3)),t.setAttribute("color",new Gt(this.col,3)),t.setAttribute("aKind",new Gt(this.kind,1)),t.setAttribute("aSway",new Gt(this.sway,1)),t.computeBoundingSphere(),t}}function Al(i,t,e,n,s,{windows:r=!0,door:a=1}={}){if(i.box(a,Math.min(2.1,s*.75),.1,it.kayuTua,Q.KAYU,{y:n,z:e/2+.01}),!!r)for(const o of[-1,1])t>5&&i.box(.8,.8,.1,it.gelap,Q.POLOS,{x:o*t*.3,y:n+s*.42,z:e/2+.01}),i.box(.1,.8,.8,it.gelap,Q.POLOS,{x:o*(t/2+.01),y:n+s*.42})}const Fa=(i,t,e,n=.45)=>i.box(t+.3,n+1.6,e+.3,it.andesit,Q.BATU,{y:-1.6,shade:[.7,1]});function JM(i,t,e){const n=new he;return Fa(n,i,t),n.box(i,.9,t,it.bata,Q.BATA,{y:.45}),n.box(i,1.9,t,it.plester,Q.PLESTER,{y:1.35}),n.box(i+.12,.14,t+.12,it.batuPutih,Q.POLOS,{y:3.2}),Al(n,i,t,.45,2.8),n.hip(i+1.3,t+1.3,3.3,Math.min(i,t)*.42,e,Q.GENTENG),n.box(.25,.25,.25,it.gentengTua,Q.POLOS,{x:Math.max(0,i-t)*.45,y:3.3+Math.min(i,t)*.42-.05}),n}function QM(i,t,e){const n=new he;Fa(n,i,t),n.box(i,3,t,it.kayuMuda,Q.KAYU,{y:.45}),Al(n,i,t,.45,2.9),n.hip(i+1.2,t+1,3.4,Math.min(i,t)*.5,e,Q.SIRAP),n.box(i*.9,.12,1.6,e,Q.SIRAP,{y:2.8,z:t/2+.8,rx:.25});for(const s of[-1,1])n.cyl(.1,.1,2.75,6,it.kayuTua,Q.KAYU,{x:s*i*.4,y:.45,z:t/2+1.4});return n}function t1(i,t,e){const n=new he;Fa(n,i,t,.6),n.box(i*.86,3.1,t*.86,it.kayu,Q.KAYU,{y:.6}),Al(n,i*.86,t*.86,.6,3.1);for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1],[0,1]])n.cyl(.12,.12,3.3,6,it.kayuTua,Q.KAYU,{x:s*i*.47,y:.6,z:r*t*.47});return n.skirt(i+1.6,t+1.6,3.6,i*.56,t*.56,4.9,e,Q.GENTENG),n.hip(i*.6,t*.6,4.8,3,e,Q.GENTENG),n.box(.3,.45,.3,it.emas,Q.POLOS,{y:7.7}),n}function e1(i,t,e){const n=new he;for(let s=0;s<3;s++)for(const r of[-1,1])n.cyl(.13,.15,2.9,6,it.kayuTua,Q.KAYU,{x:(s-1)*(i*.42),y:-1.5,z:r*t*.42});n.box(i,.25,t,it.kayu,Q.KAYU,{y:1.3}),n.box(i-.3,2.1,t-.3,it.bambu,Q.ANYAMAN,{y:1.55}),n.box(.95,1.8,.1,it.kayuTua,Q.KAYU,{y:1.55,z:(t-.3)/2+.01});for(const s of[-1,1])n.box(.7,.6,.1,it.gelap,Q.POLOS,{x:s*i*.3,y:2.3,z:(t-.3)/2+.01});return n.box(.9,.12,2,it.kayuTua,Q.KAYU,{y:.55,z:t/2+.75,rx:.62}),n.gable(i+1.4,t+1.7,3.55,2.7,e,Q.JERAMI,it.bambu,Q.ANYAMAN),n.box(i+1.6,.18,.3,it.ijuk,Q.POLOS,{y:6.2}),n}function n1(i){const t=new he;for(const[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.cyl(.12,.14,3.3,6,it.kayuTua,Q.KAYU,{x:e*1.1,y:-1.5,z:n*1.1}),t.cyl(.42,.42,.1,8,it.kayu,Q.KAYU,{x:e*1.1,y:1.55,z:n*1.1});return t.box(2.8,.2,2.8,it.kayu,Q.KAYU,{y:1.65}),t.box(2.2,1,2.2,it.bambu,Q.ANYAMAN,{y:1.85}),t.skirt(4.2,4.2,2,3.4,3.4,2.7,i,Q.JERAMI),t.skirt(3.4,3.4,2.7,2.1,2.1,4.4,i,Q.JERAMI),t.skirt(2.1,2.1,4.4,0,0,6,i,Q.JERAMI),t}function i1(i,t,e){const n=new he;return Fa(n,i,t,.3),n.box(i,3.6,t,it.kayu,Q.KAYU,{y:.3}),n.box(2.6,2.6,.12,it.kayuTua,Q.KAYU,{y:.3,z:t/2+.01}),n.gable(i+1,t+1.4,3.9,2.4,e,Q.GENTENG,it.kayu,Q.KAYU),n}const s1={buah:["#e0a020","#d84a2a","#7fb03a","#f2d24b"],ikan:["#9fb4c2","#c7d3dc","#7d8f9c"],kain:["#c8312a","#2f62a8","#e2b32b","#3f8f4f","#8a3f9a"],sayur:["#4f9a2f","#7cbf3c","#d84a2a","#e8e0c0"],gerabah:["#a8603a","#8f4f30","#c27a4a"]},Gh=["#c8312a","#e07a20","#e2b32b","#3f8f4f","#2f62a8","#8a3f9a"];function r1(i,t){const e=new he;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.07,.07,2.4,5,it.kayuTua,Q.KAYU,{x:s*1.8,z:r*1.3});e.box(3.4,.85,1.1,it.kayu,Q.KAYU,{z:.45}),e.gable(4.2,3.2,2.35,.7,Gh[i],Q.POLOS,Gh[i],Q.POLOS,{sway:.06});const n=s1[t];for(let s=0;s<7;s++){const r=-1.4+s*.47;t==="kain"?e.box(.36,.22,.8,n[s%n.length],Q.POLOS,{x:r,y:.85,z:.45}):t==="gerabah"?e.cyl(.12,.17,.32,7,n[s%n.length],Q.POLOS,{x:r,y:.85,z:.45}):e.add(new wi(.2,0).translate(0,.2,0),n[s%n.length],Q.POLOS,{x:r,y:.82,z:.45,sy:t==="ikan"?.5:1,sx:t==="ikan"?1.6:1})}for(const s of[-1,1])e.cyl(.32,.25,.4,8,it.bambu,Q.ANYAMAN,{x:s*1.3,z:1.45});return e}function a1(){const i=new he;i.cyl(1,1.05,.9,10,it.andesit,Q.BATU),i.cyl(.8,.8,.02,10,"#26343a",Q.POLOS,{y:.85});for(const t of[-1,1])i.box(.15,2.1,.15,it.kayuTua,Q.KAYU,{x:t*.9});return i.gable(2.4,1.6,2.1,.6,it.genteng,Q.GENTENG),i}function o1(i,t,e){const n=new he;n.box(t+.5,1.6,i,it.andesit,Q.BATU,{y:-1.2}),n.box(t,e,i,it.bata,Q.BATA,{y:.4}),n.box(t+.35,.3,i,it.batuPutih,Q.POLOS,{y:e+.4}),n.box(t+.2,.25,i,it.bata,Q.BATA,{y:e+.7});const s=Math.max(1,Math.round(i/3));for(let r=0;r<s;r++){const a=-i/2+(r+.5)*(i/s);n.box(t*.55,.7,.9,it.bata,Q.BATA,{y:e+.95,z:a}),n.skirt(t*.55,.9,e+1.65,0,0,e+2.1,it.batuPutih,Q.POLOS,{z:a})}return n}function c1(i,t,e){const n=new he;return n.box(t+.3,1.5,i,it.andesit,Q.BATU,{y:-1.1}),n.box(t,1.2,i,it.bata,Q.BATA,{y:.4}),n.box(t,e-1.2,i,it.plester,Q.PLESTER,{y:1.6}),n.add(l1(i,t+.8,.7),it.genteng,Q.GENTENG,{y:e+.4,ry:Math.PI/2}),n}function l1(i,t,e){const n=new he;n.gable(i,t,0,e,"#ffffff",0);const s=new se;return s.setAttribute("position",new Gt(n.pos,3)),s.setAttribute("normal",new Gt(n.nor,3)),s}function Vh(i,t,e,n=!1){const s=new he;return s.box(t+.2,1.2,i,it.andesit,Q.BATU,{y:-1}),s.box(t,e,i,n?it.andesit:it.bata,n?Q.BATU:Q.BATA,{y:.2}),s.box(t+.2,.18,i,n?it.andesitTua:it.batuPutih,Q.POLOS,{y:e+.2}),s}function u1(i,t){const e=new he;e.box(i+.8,1.8,i+.8,it.andesit,Q.BATU,{y:-1.4}),e.box(i,t,i,it.bata,Q.BATA,{y:.4}),e.box(i+.5,.35,i+.5,it.batuPutih,Q.POLOS,{y:t+.4}),e.box(i+.2,.5,i+.2,it.bata,Q.BATA,{y:t+.75});const n=t+1.25;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.14,.14,2.3,6,it.kayuTua,Q.KAYU,{x:s*i*.3,y:n,z:r*i*.3});return e.hip(i*.85,i*.85,n+2.3,i*.42,it.gentengTua,Q.GENTENG),e.box(.25,.4,.25,it.emas,Q.POLOS,{y:n+2.3+i*.42-.05}),e}function h1(i,t,e,n,s=!1){const r=new he,a=s?it.andesit:it.bata,o=s?Q.BATU:Q.BATA,c=s?it.andesitTua:it.batuPutih,l=-n*i/2,u=6,h=1.2,d=(e-h)*.82;r.box(i+.4,h+1.2,t+.4,it.andesit,Q.BATU,{x:n*.2,y:-1.2});let f=h;for(let x=0;x<u;x++){const g=x/u,p=i*(1-.62*g),M=t*(1-.5*g),v=d/u*(x===0?1.6:.88),_=l+n*p/2;r.box(p,v,M,a,o,{x:_,y:f}),r.box(p+.12,.14,M+.18,c,Q.POLOS,{x:_+n*.06,y:f+v-.07}),f+=v}const m=i*.32;return r.skirt(m,t*.45,f,0,0,e,a,o,{x:l+n*m/2}),r}function f1(i,t,e,n){const s=new he,r=(i-e)/2;s.box(i+1,1.6,t+1,it.andesit,Q.BATU,{y:-1.2});for(const c of[-1,1])s.box(r,4.6,t,it.bata,Q.BATA,{x:c*(e/2+r/2),y:.4});s.box(i,1.4,t,it.bata,Q.BATA,{y:5}),s.box(i+.3,.2,t+.3,it.batuPutih,Q.POLOS,{y:6.4});let a=6.6;const o=5;for(let c=0;c<o;c++){const l=c/o,u=i*(.85-.6*l),h=t*(.95-.55*l),d=(n-9)/o;s.box(u,d,h,it.bata,Q.BATA,{y:a}),s.box(u+.2,.14,h+.2,it.batuPutih,Q.POLOS,{y:a+d-.07}),a+=d}return s.skirt(i*.3,t*.4,a,0,0,n,it.bata,Q.BATA),s}function d1(i,t,e){const n=new he;n.box(i,e+1.4,t,it.bata,Q.BATA,{y:-1.4}),n.box(i+.3,.16,t+.3,it.batuPutih,Q.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",Q.UBIN,{y:e});for(let o=0;o<4;o++)n.box(10,e*(o+1)/4,.8,it.andesit,Q.BATU,{y:0,z:t/2+3.2-(o+.5)*.8});const s=(o,c)=>n.box(o.w,.55,o.d,it.bata,Q.BATA,{...c,y:e});s({w:i,d:.4},{z:-t/2+.2}),s({w:.4,d:t},{x:-i/2+.2}),s({w:.4,d:t},{x:i/2-.2});for(const o of[-1,1])s({w:(i-10)/2,d:.4},{x:o*(5+(i-10)/4),z:t/2-.2});for(const[o,c]of[[-1,-1],[1,-1],[1,1],[-1,1]])n.cyl(.32,.36,9.4,8,it.kayuTua,Q.KAYU,{x:o*3.2,y:e,z:c*3.2});const r=[];for(let o=-2;o<=2;o++)for(const c of[-1,1])r.push([c*12.4,o*6.3]);for(const o of[-1,0,1])for(const c of[-1,1])c>0&&o===0||r.push([o*6.2,c*13.4]);for(const[o,c]of r)n.cyl(.24,.27,4.4,8,it.kayu,Q.KAYU,{x:o,y:e,z:c});const a=e+4.3;n.skirt(i+3,t+3,a,16,17,a+2.2,it.gentengTua,Q.SIRAP),n.skirt(16.4,17.4,a+2.1,9.5,10,a+3.6,it.gentengTua,Q.SIRAP),n.hip(10,10.5,a+3.5,5.6,it.gentengTua,Q.SIRAP),n.box(.6,.9,.6,it.emas,Q.POLOS,{y:a+9});for(const o of[-1,1])n.box(.4,.6,.4,it.emas,Q.POLOS,{z:o*.3,y:a+9});return n.box(2.2,.5,1.6,it.emas,Q.POLOS,{y:e,z:-9}),n.box(2.2,1.6,.3,it.emas,Q.POLOS,{y:e+.5,z:-9.7}),n}function p1(i,t,e){const n=new he;n.box(i+1,e+1.4,t+1,it.bata,Q.BATA,{y:-1.4}),n.box(i+1.3,.16,t+1.3,it.batuPutih,Q.POLOS,{y:e-.08}),n.box(i-1,1,t-1,it.bata,Q.BATA,{y:e}),n.box(i-1,3.2,t-1,it.plester,Q.PLESTER,{y:e+1});for(let s=-2;s<=2;s++)n.box(1,2.4,.1,it.kayuTua,Q.KAYU,{x:s*(i/5.5),y:e,z:(t-1)/2+.02});for(let s=0;s<3;s++)n.box(5,e*(s+1)/3,.7,it.andesit,Q.BATU,{y:0,z:t/2+.5+2.1-(s+.5)*.7});return n.hip(i+2.2,t+2.4,e+4.1,6.5,it.genteng,Q.GENTENG),n.box(.5,.8,.5,it.emas,Q.POLOS,{y:e+10.5,x:-(i-t)*.42}),n.box(.5,.8,.5,it.emas,Q.POLOS,{y:e+10.5,x:(i-t)*.42}),n}function m1(i,t){const e=new he;e.box(i+.6,2.8,i+.6,it.bata,Q.BATA,{y:-1.2}),e.box(i+.9,.18,i+.9,it.batuPutih,Q.POLOS,{y:1.5});const n=i*.42;e.box(n,1.6,n,it.kayu,Q.KAYU,{y:1.6});let s=3.1;for(let r=0;r<t;r++){const a=r/Math.max(1,t-1),o=i*(1.08-.62*a);e.skirt(o,o,s,o*.4,o*.4,s+.55,it.ijuk,Q.JERAMI,{shade:[.9,1.06]}),e.box(o*.36,.5,o*.36,it.kayuTua,Q.KAYU,{y:s+.5}),s+=.95}return e.skirt(i*.4,i*.4,s,0,0,s+1,it.ijuk,Q.JERAMI),e.cyl(.05,.16,.7,6,it.emas,Q.POLOS,{y:s+.95}),e}function g1(i){const t=new he,e=i/17;t.box(i,1.9*e+1.2,i,it.andesit,Q.BATU,{y:-1.2}),t.box(i+.4,.2*e,i+.4,it.andesitTua,Q.POLOS,{y:1.9*e-.1}),t.box(i*.78,1.3*e,i*.78,it.andesit,Q.BATU,{y:1.9*e});const n=i*.52;let s=3.2*e;t.box(n,5.6*e,n,it.andesit,Q.BATU,{y:s}),t.box(n*.3,2.8*e,.3,it.gelap,Q.POLOS,{y:s+.2,z:n/2+.02}),t.box(n*.42,.5*e,.4,it.andesitTua,Q.BATU,{y:s+3.1*e,z:n/2}),s+=5.6*e;for(let r=0;r<3;r++){const a=n*(1.06-r*.2),o=1.7*e;t.box(a,o,a,it.andesit,Q.BATU,{y:s}),t.box(a+.3*e,.22*e,a+.3*e,it.andesitTua,Q.POLOS,{y:s-.1*e});for(const[c,l]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.box(.5*e,.6*e,.5*e,it.andesit,Q.BATU,{x:c*a/2.3,y:s+o,z:l*a/2.3}),t.skirt(.5*e,.5*e,s+o+.6*e,0,0,s+o+1.2*e,it.andesit,Q.BATU,{x:c*a/2.3,z:l*a/2.3});s+=o}t.cyl(n*.18,n*.24,1.6*e,8,it.andesit,Q.BATU,{y:s}),t.cyl(.05*e,n*.16,2.2*e,8,it.andesit,Q.BATU,{y:s+1.6*e});for(let r=0;r<4;r++)t.box(3.2*e,3.2*e*(r+1)/4,.8*e,it.andesit,Q.BATU,{z:i*.39+(3.2-(r+.5)*.8)*e});return t}function x1(i,t,e=it.alang,n=Q.JERAMI){const s=new he;s.box(i*.92,.6+1.2,t*.92,it.bata,Q.BATA,{y:-1.2});for(const[r,a]of[[-1,-1],[1,-1],[1,1],[-1,1]])s.cyl(.11,.11,2.6,6,it.kayuTua,Q.KAYU,{x:r*i*.43,y:.6,z:a*t*.43});return s.hip(i+1,t+1,3.1,Math.min(i,t)*.55,e,n),s}function _1(i,t){const e=new he;for(const[n,s]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.08,.08,3.4,5,it.kayuTua,Q.KAYU,{x:n*i*.42,y:-1,z:s*t*.42});return e.box(i*.9,.15,t*.9,it.bambu,Q.ANYAMAN,{y:.9}),e.gable(i+.8,t+.8,2.4,1.2,it.alang,Q.JERAMI,it.alang,Q.JERAMI),e}const Wh=[[it.merah,it.putih],[it.kuning,it.merah],[it.putih,it.merah]];function v1(i,t){const e=new he;e.cyl(.05,.08,i,5,it.bambu,Q.KAYU,{y:-.6});const[n,s]=Wh[t%Wh.length],r=i*.62,a=6;for(let l=0;l<a;l++){const u=i-.9-(l+1)*r/a;e.box(.04,r/a,.5,l%2?s:n,Q.POLOS,{y:u,z:.27})}const{sway:o,pos:c}=e;for(let l=0;l<o.length;l++){const u=c[l*3+1];c[l*3+2]>.1&&(o[l]=.12+(i-.9-u)/r*.5)}return e}function y1(){const i=new he;return i.box(1,.8,.8,it.kayuMuda,Q.KAYU),i.box(.9,.7,.7,it.kayu,Q.KAYU,{y:.8,x:.1,ry:.4}),i}function M1(){const i=new he;return i.cyl(.32,.26,.9,8,"#a8603a",Q.POLOS),i.cyl(.36,.32,.25,8,"#a8603a",Q.POLOS,{y:.9}),i.cyl(.3,.24,.8,8,"#8f4f30",Q.POLOS,{x:.7,z:.2}),i}function b1(){const i=new he;for(const t of[-1,1])i.cyl(.05,.05,1.4,5,it.kayuTua,Q.KAYU,{x:t*1.6});i.box(3.4,.08,1,it.bambu,Q.ANYAMAN,{y:1.1});for(let t=0;t<8;t++)i.box(.3,.05,.12,"#b7c4cc",Q.POLOS,{x:-1.4+t*.4,y:1.15,z:t%2?.2:-.2});return i}function S1(i,t,e){const n=new he;n.box(i,.22,t,it.kayuMuda,Q.KAYU,{y:-.22});for(const r of[-1,1])n.box(.2,.25,t,it.kayuTua,Q.KAYU,{x:r*(i/2-.1),y:-.45});const s=Math.max(2,Math.round(t/3));for(let r=0;r<=s;r++)for(const a of[-1,1])n.cyl(.13,.13,e+4.2,6,it.kayuTua,Q.KAYU,{x:a*(i/2-.1),y:-e-4,z:-t/2+r*t/s});for(const r of[-1,1])n.cyl(.14,.14,.7,6,it.kayuTua,Q.KAYU,{x:r*(i/2-.25),y:0,z:t/2-.4});return n}function A1(i,t,e,n,{stone:s,piers:r}){const a=new he,o=Math.ceil(i/1.5),c=s?.9:.35,l=m=>-i/2+m/o*i,u=m=>e(m/o),h=[],d=[],f=[];for(let m=0;m<o;m++){const x=l(m),g=l(m+1),p=u(m),M=u(m+1),v=[-t/2,p,x],_=[t/2,p,x],E=[t/2,M,g],T=[-t/2,M,g];h.push([v,T,E],[v,E,_]);const P=[-t/2,p-c,x],N=[t/2,p-c,x],w=[t/2,M-c,g],A=[-t/2,M-c,g];d.push([P,T,v],[P,A,T],[N,_,E],[N,E,w]),f.push([P,N,w],[P,w,A])}a.faces(h,s?"#9a958c":it.kayuMuda,s?Q.UBIN:Q.KAYU),a.faces(d,s?it.andesit:it.kayu,s?Q.BATU:Q.KAYU),a.faces(f,s?it.andesitTua:it.kayuTua,Q.POLOS);for(const m of[-1,1]){const x=m*(t/2-.2),g=[],p=s?1.05:1;for(let M=0;M<o;M++){const v=l(M),_=l(M+1),E=u(M),T=u(M+1);if(s){const P=[x-.2,x+.2];g.push([[P[1],E,v],[P[1],E+p,v],[P[1],T+p,_]],[[P[1],E,v],[P[1],T+p,_],[P[1],T,_]],[[P[0],T,_],[P[0],T+p,_],[P[0],E+p,v]],[[P[0],T,_],[P[0],E+p,v],[P[0],E,v]],[[P[0],E+p,v],[P[0],T+p,_],[P[1],T+p,_]],[[P[0],E+p,v],[P[1],T+p,_],[P[1],E+p,v]])}else M%2===0&&a.cyl(.07,.07,p,5,it.kayuTua,Q.KAYU,{x,y:E,z:v})}if(s)a.faces(g,it.bata,Q.BATA);else{const M=[];for(let v=0;v<o;v++){const _=l(v),E=l(v+1),T=u(v)+1,P=u(v+1)+1;M.push([[x-.06,T,_],[x+.06,P,E],[x+.06,T,_]],[[x-.06,T,_],[x-.06,P,E],[x+.06,P,E]])}a.faces(M,it.kayu,Q.KAYU)}}for(const m of r){const x=-i/2+m*i,g=e(m)-c,p=n(x);if(s){a.box(t+.6,g-p+.5,2,it.andesit,Q.BATU,{y:p-.5,z:x}),a.box(t+1,.3,2.4,it.andesitTua,Q.POLOS,{y:g-.3,z:x});for(const M of[-1,1]){const v=e(m)+1.05;a.box(.5,.5,.5,it.batuPutih,Q.POLOS,{x:M*(t/2-.2),y:v,z:x}),a.cyl(.06,.06,1.6,5,it.gelap,Q.POLOS,{x:M*(t/2-.2),y:v+.5,z:x}),a.box(.36,.48,.36,"#ffe3a0",Q.POLOS,{x:M*(t/2-.2),y:v+2.1,z:x}),a.skirt(.5,.5,v+2.58,0,0,v+2.9,it.gelap,Q.POLOS,{x:M*(t/2-.2),z:x})}}else for(const M of[-1,1])a.cyl(.16,.18,g-p+.6,6,it.kayuTua,Q.KAYU,{x:M*(t/2-.3),y:p-.6,z:x})}return a}const El={value:0},E1=`
uniform float uTime;
attribute float aKind;
attribute float aSway;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;
`,T1=`
uniform sampler2D uNoise;
uniform vec3 uSeeA;
uniform vec3 uSeeB;
uniform float uSeeR;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;

// 1 di garis (nilai v bulat) setebal w (satuan pola), 0 di luar; hilang halus bila terlalu rapat
float lineAA(float v, float w) {
  float d = abs(fract(v + 0.5) - 0.5);
  float aa = fwidth(v);
  return (1.0 - smoothstep(w - aa, w + aa, d)) * (1.0 - smoothstep(0.18, 0.4, aa));
}

float cellNoise(vec2 id) {
  return texture2D(uNoise, id * 0.1371 + 0.5).r;
}

vec3 buildingPattern(vec3 col) {
  int kind = int(vKind + 0.5);
  if (kind == 0) return col;
  vec3 n = normalize(vBNrm);
  vec3 p = vBWorld;
  // koordinat permukaan: u mendatar sepanjang bidang, v tegak (atau z untuk bidang datar)
  float u = abs(n.x) > abs(n.z) ? p.z : p.x;
  float v = p.y;
  if (abs(n.y) > 0.8) {
    u = p.x;
    v = p.z;
  }
  if (kind == 1) { // bata merah
    float row = floor(v / 0.2);
    float bu = u / 0.44 + 0.5 * mod(row, 2.0);
    float mortar = max(lineAA(v / 0.2, 0.07), lineAA(bu, 0.04));
    col *= 0.84 + 0.3 * cellNoise(vec2(floor(bu), row));
    return mix(col, vec3(0.62, 0.55, 0.47), mortar * 0.75);
  }
  if (kind == 2) { // genteng: lajur bertumpuk + alur tegak
    float row = v / 0.27;
    float shade = 0.72 + 0.28 * smoothstep(0.0, 0.45, fract(row));
    float fadeRow = 1.0 - smoothstep(0.1, 0.35, fwidth(row));
    float groove = 0.5 + 0.5 * sin(u * 28.5);
    float fadeG = 1.0 - smoothstep(0.08, 0.3, fwidth(u * 4.5));
    col *= mix(0.88, shade, fadeRow) * (1.0 - 0.12 * groove * fadeG);
    return col * (0.9 + 0.2 * cellNoise(vec2(floor(u / 0.22), floor(row))));
  }
  if (kind == 3) { // jerami / ijuk: serat tegak + lapisan
    float s = texture2D(uNoise, vec2(u * 2.3, v * 0.25)).r;
    float band = smoothstep(0.0, 0.6, fract(v / 0.42));
    float fade = 1.0 - smoothstep(0.1, 0.4, fwidth(v / 0.42));
    return col * mix(0.95, (0.74 + 0.42 * s) * (0.8 + 0.2 * band), fade);
  }
  if (kind == 4) { // papan kayu mendatar
    float gap = lineAA(v / 0.24, 0.06);
    float grain = texture2D(uNoise, vec2(u * 0.35, v * 4.0)).g;
    col *= (0.86 + 0.26 * grain) * (0.9 + 0.2 * cellNoise(vec2(0.0, floor(v / 0.24)) + floor(u / 3.0)));
    return mix(col, col * 0.45, gap);
  }
  if (kind == 5) { // batu andesit: balok besar bernat
    float row = floor(v / 0.36);
    float bu = u / 0.62 + 0.5 * mod(row, 2.0);
    float joint = max(lineAA(v / 0.36, 0.05), lineAA(bu, 0.03));
    col *= 0.82 + 0.32 * cellNoise(vec2(floor(bu), row) + 7.0);
    return mix(col, col * 0.5, joint);
  }
  if (kind == 6) { // sirap kayu
    float row = floor(v / 0.2);
    float bu = u / 0.17 + 0.5 * mod(row, 2.0);
    float gap = max(lineAA(v / 0.2, 0.08), lineAA(bu, 0.05) * 0.6);
    col *= 0.82 + 0.3 * cellNoise(vec2(floor(bu), row) + 3.0);
    return mix(col, col * 0.55, gap);
  }
  if (kind == 7) { // ubin lantai
    float joint = max(lineAA(u / 0.9, 0.03), lineAA(v / 0.9, 0.03));
    col *= 0.88 + 0.22 * cellNoise(floor(vec2(u, v) / 0.9) + 11.0);
    return mix(col, col * 0.6, joint);
  }
  if (kind == 8) { // anyaman bambu (gedek): kotak-kotak miring bergantian
    float a = sin((u + v) * 22.0);
    float b = sin((u - v) * 22.0);
    float weave = step(0.0, a * b);
    float fade = 1.0 - smoothstep(0.04, 0.14, fwidth((u + v) * 3.5));
    return col * mix(0.95, 0.84 + 0.22 * weave, fade);
  }
  // 9: plester, sedikit noda
  return col * (0.9 + 0.14 * texture2D(uNoise, p.xz * 0.11 + p.y * 0.07).b);
}
`;function w1(i){const t=new si({vertexColors:!0});return t.onBeforeCompile=e=>{e.uniforms.uTime=El,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=wn.a,e.uniforms.uSeeB=wn.b,e.uniforms.uSeeR=wn.r,e.vertexShader=E1+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        mat4 bModel = modelMatrix * instanceMatrix;
      #else
        mat4 bModel = modelMatrix;
      #endif
      vec3 wp0 = (bModel * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;
      vKind = aKind;
      vBWorld = (bModel * vec4(transformed, 1.0)).xyz;
      vBNrm = normalize(mat3(bModel) * normal);`),e.fragmentShader=T1+e.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
      if (uSeeR > 0.0) {
        vec3 ab = uSeeB - uSeeA;
        float tt = clamp(dot(vBWorld - uSeeA, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
        float rr = uSeeR * (0.35 + 0.65 * tt);
        float dd = distance(vBWorld, uSeeA + ab * tt);
        if (tt < 0.95 && dd < rr) {
          float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          if (dither > smoothstep(rr * 0.55, rr, dd)) discard;
        }
      }`).replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb = buildingPattern(diffuseColor.rgb);`)},t}function R1(){const i=new sl({depthPacking:Jc});return i.onBeforeCompile=t=>{t.uniforms.uTime=El,t.vertexShader=`uniform float uTime;
attribute float aSway;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      vec3 wp0 = (modelMatrix * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;`)},i}const la=1.6;function C1(i){const t=[],e=(a,o)=>{for(const l of t)if(Math.abs(l.x-a)<la&&Math.abs(l.z-o)<la)return l;const c={id:t.length,x:a,z:o,links:[],w:new Map};return t.push(c),c},n=i.map(()=>[0,1]),s=(a,o,c)=>{const[l,u,h,d]=a,f=h-l,m=d-u,x=f*f+m*m,g=((o-l)*f+(c-u)*m)/x;if(g<-1e-6||g>1+1e-6)return null;const p=l+f*g-o,M=u+m*g-c;return p*p+M*M<la*la?Math.min(1,Math.max(0,g)):null};for(let a=0;a<i.length;a++)for(let o=0;o<i.length;o++){if(a===o)continue;const[c,l,u,h]=i[a],[d,f,m,x]=i[o];for(const[P,N]of[[d,f],[m,x]]){const w=s(i[a],P,N);w!==null&&n[a].push(w)}const g=u-c,p=h-l,M=m-d,v=x-f,_=g*v-p*M;if(Math.abs(_)<1e-9)continue;const E=((d-c)*v-(f-l)*M)/_,T=((d-c)*p-(f-l)*g)/_;E>0&&E<1&&T>0&&T<1&&n[a].push(E)}const r=new Set;return i.forEach((a,o)=>{const[c,l,u,h]=a,d=[...new Set(n[o].map(m=>Math.round(m*1e4)/1e4))].sort((m,x)=>m-x);let f=null;for(const m of d){const x=e(c+(u-c)*m,l+(h-l)*m);if(f&&f!==x){const g=f.id<x.id?`${f.id}-${x.id}`:`${x.id}-${f.id}`;r.has(g)||(r.add(g),f.links.push(x),x.links.push(f));const p=Math.max(a[4]??3,f.w.get(x.id)??0);f.w.set(x.id,p),x.w.set(f.id,p)}f=x}}),{nodes:t,edgeCount:r.size}}const Xh=128,Qs={genteng:["#b65a32","#a84f2c","#c46a3a","#94482b"],sirap:["#6b4f3a","#5d4434","#7a5a40","#584a3c"],joglo:["#5a4a40","#4a4038","#62503f","#3f3a35"],alang:["#bb9c5c","#a98a4e","#c4a76a","#8f7a52"]};function P1(i,t){const e=i.roof??0;switch(i.type){case"rumah-bata":return JM(i.w,i.d,Qs.genteng[e]);case"rumah-limasan":return QM(i.w,i.d,Qs.sirap[e]);case"rumah-joglo":return t1(i.w,i.d,Qs.joglo[e]);case"rumah-panggung":return e1(i.w,i.d,Qs.alang[e]);case"rumah-lumbung":return n1(Qs.alang[e]);case"gudang":return i1(i.w,i.d,it.genteng);case"warung":return r1(i.color,i.goods);case"sumur":return a1();case"tembok":return o1(i.len,i.t,i.h);case"tembok-dalam":return c1(i.len,i.t,i.h);case"pagar":return Vh(i.len,i.t,i.h);case"pagar-batu":return Vh(i.len,i.t,i.h,!0);case"menara":return u1(i.size,i.h);case"bentar":return h1(i.w,i.d,i.h,i.mirror,i.stone);case"paduraksa":return f1(i.w,i.d,i.opening,i.h);case"pendopo":return d1(i.w,i.d,i.h);case"bangsal":return p1(i.w,i.d,i.h);case"meru":return m1(i.base,i.tiers);case"candi":return g1(i.base);case"bale":return x1(i.w,i.d);case"dangau":return _1(i.w,i.d);case"umbul":return v1(i.h,i.color);case"peti":return y1();case"gentong":return M1();case"jemuran":return b1();case"dermaga":return S1(i.w,i.len,i.y);case"jembatan-batu":case"jembatan-kayu":{const n=i.surface,s=c=>n.y0+(n.y1-n.y0)*c+n.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(c-n.a0)/(n.a1-n.a0)))),r=(i.type==="jembatan-batu"?16:7)/i.len,a=[];for(let c=n.a0+r;c<n.a1-r*.4;c+=r)a.push(c);const o=c=>i.axis==="x"?t.heightAt(i.x+c,i.z):t.heightAt(i.x,i.z+c);return A1(i.len,i.w,s,o,{stone:i.type==="jembatan-batu",piers:a})}default:throw new Error(`jenis bangunan tidak dikenal: ${i.type}`)}}function xd(i,t,e,n,s,r){const o=[];for(let u=0;u<=10;u++){const h=u/10,d=-t/2+h*t,f=e/2*Math.pow(Math.sin(Math.PI*h),.6),m=.35*Math.pow(Math.abs(h-.5)*2,3);o.push({z:d,w:f,top:.25+m,keel:-n*Math.pow(Math.sin(Math.PI*h),.5)+m*.6})}const c=[],l=[];for(let u=0;u<10;u++){const h=o[u],d=o[u+1];for(const f of[-1,1]){const m=[f*h.w,h.top,h.z],x=[f*d.w,d.top,d.z],g=[0,h.keel,h.z],p=[0,d.keel,d.z];f>0?c.push([m,g,p],[m,p,x]):c.push([m,p,g],[m,x,p])}l.push([[-h.w,h.top-.12,h.z],[d.w,d.top-.12,d.z],[h.w,h.top-.12,h.z]],[[-h.w,h.top-.12,h.z],[-d.w,d.top-.12,d.z],[d.w,d.top-.12,d.z]])}i.faces(c,s,Q.KAYU),i.faces(l,it.kayuMuda,Q.KAYU),i.box(e*.02+.05,.12,t*.7,r,Q.POLOS,{x:e*.43,y:.05}),i.box(e*.02+.05,.12,t*.7,r,Q.POLOS,{x:-e*.43,y:.05})}function L1(){const i=new he;xd(i,6.2,.85,.45,"#f2efe6","#2f62a8");for(const t of[-1,1])i.cyl(.09,.09,4.6,5,it.bambu,Q.KAYU,{x:t*2.3,y:-.05,rx:Math.PI/2,z:2.3});for(const t of[-1.2,1.2])i.box(4.8,.08,.1,it.kayuTua,Q.KAYU,{y:.35,z:t});return i.cyl(.05,.06,3.4,5,it.kayuTua,Q.KAYU,{y:.2,z:.6}),i.faces([[[0,3.5,.6],[0,.9,.7],[0,.9,-2]],[[0,3.5,.6],[0,.9,-2],[0,.9,.7]]],it.merah,Q.POLOS,{sway:.03}),i.build()}function I1(){const i=new he;xd(i,18,5,2.2,"#7a5236",it.emas),i.box(4.2,2,5.5,it.kayu,Q.KAYU,{y:.1,z:-4.8}),i.hip(4.8,6.2,2.1,1.4,it.ijuk,Q.JERAMI,{z:-4.8});for(const[t,e]of[[2.6,11],[-1,8.5]]){i.cyl(.14,.18,e,6,it.kayuTua,Q.KAYU,{y:.1,z:t});const n=e-.6;i.faces([[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.4,t+3.4]],[[0,n,t+2.6],[0,n*.95,t-1.6],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.4,t+3.4],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.95,t-1.6]]],"#e8dcc0",Q.POLOS,{sway:.04})}return i.build()}function D1({ground:i,plan:t,mask:e,grid:n,quality:s,noiseTexture:r}){const a=new Re;a.name="kepulauan-kencana";const{shadows:o}=s,c=new Map,l={};for(const U of t.build){l[U.type]=(l[U.type]||0)+1;const Y=`${Math.floor(U.x/Xh)},${Math.floor(U.z/Xh)}`;let k=c.get(Y);k||c.set(Y,k=[]),k.push(U)}const u=w1(r),h=R1();let d=0;for(const[U,Y]of c){const k=Y.map(X=>P1(X,i)),W=k.reduce((X,Ft)=>X+Ft.pos.length/3,0),tt=new Float32Array(W*3),H=new Float32Array(W*3),K=new Float32Array(W*3),nt=new Float32Array(W),pt=new Float32Array(W);let Pt=0;k.forEach((X,Ft)=>{const bt=Y[Ft],gt=Math.cos(bt.rot),ft=Math.sin(bt.rot),It=X.pos.length/3;for(let St=0;St<It;St++){const F=St*3,L=(Pt+St)*3,et=X.pos[F],ot=X.pos[F+2];tt[L]=bt.x+et*gt+ot*ft,tt[L+1]=bt.y+X.pos[F+1],tt[L+2]=bt.z-et*ft+ot*gt;const ht=X.nor[F],lt=X.nor[F+2];H[L]=ht*gt+lt*ft,H[L+1]=X.nor[F+1],H[L+2]=-ht*ft+lt*gt}K.set(X.col,Pt*3),nt.set(X.kind,Pt),pt.set(X.sway,Pt),Pt+=It});const V=new se;V.setAttribute("position",new me(tt,3)),V.setAttribute("normal",new me(H,3)),V.setAttribute("color",new me(K,3)),V.setAttribute("aKind",new me(nt,1)),V.setAttribute("aSway",new me(pt,1)),V.computeBoundingSphere(),d+=W;const ct=new te(V,u);ct.name=`bangunan-${U}`,ct.castShadow=o,ct.receiveShadow=o,ct.customDepthMaterial=h,a.add(ct)}const f=dd(r),m=s.canopyDetail,x=s.treeDensity,g=U=>({...U,y:i.heightAt(U.x,U.z),a:((U.x*.37+U.z*.11)%1+1)%1,b:.5,c:((U.x*.13-U.z*.29)%1+1)%1}),p=U=>t.trees.filter(Y=>Y.type===U).map(g),M=An({scaleMin:1,scaleMax:1,tilt:.05,tint:.08,sink:.1}),v=new B,_=(U,Y,k)=>{M(U,Y,k),Y.scale(v.setScalar(U.s)),Y.elements[12]=U.x,Y.elements[13]=U.y-.1,Y.elements[14]=U.z},E=new Re;E.name="pohon-kencana";const T=U=>({castShadow:o,receiveShadow:o,toMatrix:U});E.add(je("beringin",SM(m),f,p("beringin"),T(_)),je("kamboja",AM(),f,p("kamboja"),T(_)),je("pisang",EM(),f,p("pisang"),T(_)),je("mangga",Dc(m),f,p("mangga").map(U=>({...U,s:U.s*.62})),T(_)));const P=(U,Y,k)=>e.reserved(U,Y,k+1)||Ss(U,Y,xe)<10,N=p("kelapa"),w={kelapa:[],pohon:[],payung:[],semak:[],bunga:[]};for(const U of Oa){const Y=U.r*1.12,k=(U.r/255)**2;w.kelapa.push(...fn({ground:i,grid:n,kind:"kelapa",seed:1101+U.seed,radius:1.8,area:Y,cx:U.x,cz:U.z,reserved:P,count:Math.round(130*x*Math.sqrt(k)),accept:(W,tt,H,K,nt)=>H>.9&&H<4.2&&K<.3&&nt()<.6})),w.pohon.push(...fn({ground:i,grid:n,kind:"pohon",seed:1202+U.seed,radius:2.3,area:Y,cx:U.x,cz:U.z,reserved:P,count:Math.round(340*x*k)+6,accept:(W,tt,H,K)=>H>3&&H<30&&K<.6&&Si(W,tt)>.44})),w.payung.push(...fn({ground:i,grid:n,kind:"pohon",seed:1303+U.seed,radius:4.5,area:Y,cx:U.x,cz:U.z,reserved:P,count:Math.round(40*x*k)+2,accept:(W,tt,H,K,nt)=>H>3&&H<30&&K<.45&&nt()<.5})),w.semak.push(...fn({ground:i,grid:n,kind:"semak",seed:1404+U.seed,radius:1.1,area:Y,cx:U.x,cz:U.z,reserved:P,count:Math.round(260*x*k)+8,accept:(W,tt,H,K)=>H>2.8&&K<.7})),w.bunga.push(...fn({ground:i,grid:n,kind:"semak",seed:1505+U.seed,radius:1,area:Y,cx:U.x,cz:U.z,reserved:P,count:Math.round(90*x*k)+6,accept:(W,tt,H,K)=>H>2.8&&K<.5}))}E.add(je("kelapa",ud(),f,[...N,...w.kelapa],T(An({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1}))),je("pohon-hutan",Dc(m),f,w.pohon,T(An({scaleMin:.75,scaleMax:1.3,tilt:.12,tint:.16}))),je("pohon-payung",hd(m),f,w.payung,T(An({scaleMin:.8,scaleMax:1.15,tilt:.08,tint:.12}))),je("semak",Ca(0,null),f,w.semak,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:An({scaleMin:.7,scaleMax:1.4,tilt:.2,tint:.2,sink:.1})}),je("semak-bunga",Ca(0,["#e0353f","#f4c02c","#f06aa8","#ffffff"]),f,w.bunga,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:An({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),a.add(E);const A={jukung:L1(),jong:I1()},I=[];for(const U of["jukung","jong"]){const Y=t.boats.filter(W=>(W.type==="jukung-darat"?"jukung":W.type)===U);if(!Y.length)continue;const k=new br(A[U],u,Y.length);k.name=`perahu-${U}`,k.castShadow=o,k.receiveShadow=o,k.customDepthMaterial=h,k.instanceMatrix.setUsage(ys),Y.forEach((W,tt)=>I.push({...W,mesh:k,i:tt,phase:(W.x*.31+W.z*.17)%6.28,land:W.type==="jukung-darat",y:Math.max(0,i.heightAt(W.x,W.z))})),a.add(k)}const G=[...new Set(I.map(U=>U.mesh))],j=new Ht,q=new _e,y=new tn,b=new B,R=new B(1,1,1);function S(U){for(const Y of I)Y.land?(y.set(.04,Y.rot,.12),b.set(Y.x,Y.y+.45,Y.z)):(y.set(Math.sin(U*.9+Y.phase)*.025,Y.rot,Math.sin(U*1.1+Y.phase*1.7)*.06),b.set(Y.x,.12+Math.sin(U*1.3+Y.phase)*.1,Y.z)),q.setFromEuler(y),Y.mesh.setMatrixAt(Y.i,j.compose(b,q,R));for(const Y of G)Y.instanceMatrix.needsUpdate=!0}S(0);for(const U of G)U.computeBoundingSphere();const z=[...w.kelapa.map(U=>({x:U.x,z:U.z,radius:.45,kind:"pohon"})),...w.pohon.map(U=>({x:U.x,z:U.z,radius:.7,kind:"pohon"})),...w.payung.map(U=>({x:U.x,z:U.z,radius:.75,kind:"pohon"}))],O=[...t.blocked.map(U=>({x:U.x,z:U.z,radius:Math.max(U.hx,U.hz)+1.5,strength:.25})),...w.pohon.map(U=>({x:U.x,z:U.z,radius:4.8,strength:.4})),...w.payung.map(U=>({x:U.x,z:U.z,radius:5.5,strength:.3})),...w.kelapa.map(U=>({x:U.x,z:U.z,radius:2.4,strength:.18})),...t.trees.filter(U=>U.type==="beringin").map(U=>({x:U.x,z:U.z,radius:12,strength:.5})),...w.semak.map(U=>({x:U.x,z:U.z,radius:1.8,strength:.2}))],C=C1([...t.roads,...t.paths]);return{object:a,colliders:[...t.colliders,...z],surfaces:t.surfaces,occlusion:O,routes:C,spots:t.spots,roofs:t.roofs,stats:{bangunan:t.build.length,rumah:Object.entries(l).filter(([U])=>U.startsWith("rumah-")).reduce((U,[,Y])=>U+Y,0),jenis:l,petak:c.size,titik:d,pohon:Object.values(w).reduce((U,Y)=>U+Y.length,0)+t.trees.length,perahu:I.length,simpulJalan:C.nodes.length},update(U){El.value=U,S(U)}}}const Io=2.3,zc=30,N1={idle:"idle",walk:"walk",sit:"sit",interact:"interact-right",pickup:"pick-up",wave:"emote-yes"},U1=1.4,jh=.25,ua=2.6,z1=.35,Yh=["male-a","male-b","male-e","male-f","female-a","female-b","female-c","female-f"],ha={emas:[.3125,.5625],kayu:[.8125,.8125],besi:[.4375,.8125]},kc=new Ht,Kh=new Ht;function qh(i,t,e){let n=null;i.traverse(o=>{!n&&o.isSkinnedMesh&&(n=o)});const{skeleton:s}=n,r=new _l(i),a={};for(const[o,c]of Object.entries(N1)){const l=Ns.findByName(t,c);if(!l)continue;r.stopAllAction(),r.clipAction(l).reset().play();const u=Math.max(1,Math.round(l.duration*zc));a[o]={row:e.length,n:u,loop:o!=="wave"};for(let h=0;h<u;h++){r.setTime(h/zc),i.updateMatrixWorld(!0),Kh.copy(i.matrixWorld).invert();const d=new Float32Array(s.bones.length*12);s.bones.forEach((f,m)=>{kc.multiplyMatrices(Kh,f.matrixWorld).multiply(s.boneInverses[m]);const x=kc.elements;d.set([x[0],x[4],x[8],x[12],x[1],x[5],x[9],x[13],x[2],x[6],x[10],x[14]],m*12)}),e.push(d)}}return r.stopAllAction(),{table:a,skeleton:s}}function Do(i){const t=[],e=[],n=[],s=[],r=[];for(const a of i){const o=a.geometry,c=t.length/3,l=o.attributes.position,u=o.attributes.normal,h=o.attributes.uv,d=o.attributes.skinIndex,f=o.attributes.skinWeight;for(let x=0;x<l.count;x++){t.push(l.getX(x),l.getY(x),l.getZ(x)),e.push(u.getX(x),u.getY(x),u.getZ(x)),n.push(h.getX(x),h.getY(x));let g=0;for(let p=1;p<4;p++)f.getComponent(x,p)>f.getComponent(x,g)&&(g=p);s.push(d.getComponent(x,g))}const m=o.index;for(let x=0;x<m.count;x++)r.push(c+m.getX(x))}return{pos:t,nor:e,uv:n,bone:s,index:r}}function Oc(i,t,e){const n=i[t].subarray(e*12,e*12+12);return new Ht().set(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],0,0,0,1)}function fa(i,t,e,n,s,r){const a=t.index?t.toNonIndexed():t;a.applyMatrix4(Oc(e,n,s).invert());const o=i.pos.length/3,c=a.attributes.position,l=a.attributes.normal;for(let u=0;u<c.count;u++)i.pos.push(c.getX(u),c.getY(u),c.getZ(u)),i.nor.push(l.getX(u),l.getY(u),l.getZ(u)),i.uv.push(r[0],r[1]),i.bone.push(s),i.index.push(o+u)}function k1(i){const t=new se;return t.setAttribute("position",new Gt(i.pos,3)),t.setAttribute("normal",new Gt(i.nor,3)),t.setAttribute("uv",new Gt(i.uv,2)),t.setAttribute("aBone",new Gt(i.bone,1)),t.setIndex(i.index),t}const O1=`
uniform sampler2D uBones;
attribute float aBone;
attribute vec4 aAnimA; // baris bingkai 0, baris bingkai 1, campuran, bobot klip B
attribute vec4 aAnimB; // baris bingkai 0, baris bingkai 1, campuran (klip sebelumnya, memudar)
mat4 boneAt(int b, float row) {
  ivec2 c = ivec2(b * 3, int(row));
  vec4 r0 = texelFetch(uBones, c, 0);
  vec4 r1 = texelFetch(uBones, c + ivec2(1, 0), 0);
  vec4 r2 = texelFetch(uBones, c + ivec2(2, 0), 0);
  return mat4(r0.x, r1.x, r2.x, 0.0, r0.y, r1.y, r2.y, 0.0, r0.z, r1.z, r2.z, 0.0, r0.w, r1.w, r2.w, 1.0);
}
mat4 animMatrix() {
  int b = int(aBone + 0.5);
  mat4 a = boneAt(b, aAnimA.x) * (1.0 - aAnimA.z) + boneAt(b, aAnimA.y) * aAnimA.z;
  if (aAnimA.w <= 0.0) return a;
  mat4 c = boneAt(b, aAnimB.x) * (1.0 - aAnimB.z) + boneAt(b, aAnimB.y) * aAnimB.z;
  return a * (1.0 - aAnimA.w) + c * aAnimA.w;
}
`;function Zh(i,t){i.uniforms.uBones={value:t},i.vertexShader=O1+i.vertexShader.replace("void main() {",`void main() {
  mat4 animM = animMatrix();`).replace("#include <beginnormal_vertex>",`vec3 objectNormal = normalize(mat3(animM) * vec3(normal));
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif`).replace("#include <begin_vertex>","vec3 transformed = (animM * vec4(position, 1.0)).xyz;")}function F1({ground:i,routes:t,spots:e,quality:n,villagerGltf:s,soldier:r}){const a=new Re;a.name="penduduk";const o=[],c=qh(s.scene,s.animations,o),l={};s.scene.traverse(V=>{V.isSkinnedMesh&&(l[V.name.replace("character-","")]=V)});const u=Object.values(l)[0].material.map,h=[];for(const V of Yh){const ct=l[V];ct&&h.push({name:V,data:Do([ct]),table:c.table,map:u})}const d=Do([l["male-b"]]);let f=0;for(let V=0;V<d.bone.length;V++)d.bone[V]===6&&(f=Math.max(f,d.pos[V*3+1]));const m=c.table.sit.row,x=Oc(o,m,6),g=new B(0,f-.015,.02).applyMatrix4(x);fa(d,new Ge(.17,.15,.07,10,1,!0).translate(g.x,g.y+.035,g.z),o,m,6,ha.emas);for(let V=0;V<5;V++){const ct=V/5*Math.PI*2;fa(d,new Ra(.035,.09,4).translate(g.x+Math.cos(ct)*.16,g.y+.11,g.z+Math.sin(ct)*.16),o,m,6,ha.emas)}if(h.push({name:"raja",data:d,table:c.table,map:u}),r){const V=md(r.model),ct=qh(V,r.clips,o),X=[];V.traverse(ft=>{ft.isSkinnedMesh&&X.push(ft)});const Ft=Do(X),bt=ct.table.idle.row,gt=new B(-.265,0,.068).applyMatrix4(ct.skeleton.boneInverses[5].clone().invert()).applyMatrix4(Oc(o,bt,5));fa(Ft,new Ge(.016,.016,1.3,5).translate(gt.x,gt.y+.25,gt.z),o,bt,5,ha.kayu),fa(Ft,new Ra(.04,.16,4).translate(gt.x,gt.y+.98,gt.z),o,bt,5,ha.besi),h.push({name:"prajurit",data:Ft,table:ct.table,map:X[0].material.map,tint:new Dt(1,.86,.68)})}const p=7*3,M=new Float32Array(p*o.length*4);o.forEach((V,ct)=>M.set(V,ct*p*4));const v=new Xi(M,p,o.length,Be,pn);v.magFilter=He,v.minFilter=He,v.needsUpdate=!0;const _=[],E=V=>h.findIndex(ct=>ct.name===V),T=Yh.map(E).filter(V=>V>=0),P=()=>T[Math.floor(Math.random()*T.length)],N={penjaga:"prajurit",raja:"raja",pendeta:"male-e"};for(const V of e){let ct=N[V.role]?E(N[V.role]):P();ct<0&&(ct=P()),_.push({type:ct,fixed:!0,role:V.role,x:V.x,z:V.z,y:V.y??null,heading:V.rot,homeHeading:V.rot,anim:V.anim,clip:V.anim,t:Math.random()*3,prev:null,prevT:0,fade:0})}const w={rendah:120,sedang:220,tinggi:320}[n.level]??220,A=t.nodes.filter(V=>V.links.length),I=[];for(const V of A)for(const ct of V.links)V.id<ct.id&&I.push([V,ct,Math.hypot(ct.x-V.x,ct.z-V.z)]);const G=([V,ct,X])=>X*(Math.max(V.x,ct.x)<-415&&Math.max(V.z,ct.z)<145&&Math.min(V.z,ct.z)>-65&&Math.min(V.x,ct.x)>-705?3:1),j=I.reduce((V,ct)=>V+G(ct),0);for(let V=0;V<w&&I.length;V++){let ct=Math.random()*j,X=I[0];for(const ft of I)if(ct-=G(ft),ct<=0){X=ft;break}const[Ft,bt,gt]=Math.random()<.5?X:[X[1],X[0],X[2]];_.push({type:P(),fixed:!1,from:Ft,to:bt,len:gt,s:Math.random()*gt,side:Math.random()<.5?-1:1,lat:.6+Math.random()*1.4,speed:.95+Math.random()*.55,pause:0,x:Ft.x,z:Ft.z,y:null,heading:0,clip:"walk",anim:"walk",t:Math.random(),prev:null,prevT:0,fade:0,init:!0})}const q=h.map(()=>0);for(const V of _)q[V.type]++;const y=h.map((V,ct)=>{const X=k1(V.data),Ft=Math.max(1,q[ct]),bt=new _r(new Float32Array(Ft*4),4).setUsage(ys),gt=new _r(new Float32Array(Ft*4),4).setUsage(ys);X.setAttribute("aAnimA",bt),X.setAttribute("aAnimB",gt);const ft=new si({map:V.map});ft.onBeforeCompile=F=>Zh(F,v);const It=new br(X,ft,Ft);It.name=`penduduk-${V.name}`,It.instanceMatrix.setUsage(ys),It.frustumCulled=!1,It.castShadow=n.shadows,It.receiveShadow=n.shadows;const St=new sl({depthPacking:Jc});if(St.onBeforeCompile=F=>Zh(F,v),It.customDepthMaterial=St,V.tint)for(let F=0;F<Ft;F++)It.setColorAt(F,V.tint);return It.count=0,a.add(It),{mesh:It,animA:bt,animB:gt,table:V.table}});function b(V,ct){V.clip!==ct&&(V.prev=V.clip,V.prevT=V.t,V.fade=jh,V.clip=ct,V.t=0)}function R(V,ct,X,Ft,bt){const gt=V[ct]||V.idle,ft=X*zc;let It,St,F;if(gt.loop){const L=(ft%gt.n+gt.n)%gt.n;It=Math.floor(L),St=(It+1)%gt.n,F=L-It}else{const L=Math.min(ft,gt.n-1);It=Math.floor(L),St=Math.min(It+1,gt.n-1),F=L-It}Ft[bt]=gt.row+It,Ft[bt+1]=gt.row+St,Ft[bt+2]=F}const S=(V,ct,X)=>V+Math.atan2(Math.sin(ct-V),Math.cos(ct-V))*X;function z(V,ct,X){const Ft=X.x-V.x,bt=X.z-V.z,gt=Math.hypot(Ft,bt);if(gt<ua){V.greeted?V.clip==="wave"&&V.t>.7&&b(V,"idle"):(V.greeted=!0,b(V,"wave")),V.heading=S(V.heading,Math.atan2(Ft,bt),Math.min(1,ct*6));return}if(gt>ua+2.5&&(V.greeted=!1),V.pause>0){V.pause-=ct,b(V,"idle");return}if(b(V,"walk"),V.s+=V.speed*ct,V.s>=V.len){const ht=V.to,lt=ht.links.filter(yt=>yt!==V.from),Lt=lt.length?lt[Math.floor(Math.random()*lt.length)]:V.from;V.s-=V.len,V.from=ht,V.to=Lt,V.len=Math.max(.1,Math.hypot(Lt.x-ht.x,Lt.z-ht.z)),Math.random()<.12&&(V.pause=2+Math.random()*5)}const ft=(V.to.x-V.from.x)/V.len,It=(V.to.z-V.from.z)/V.len,St=Math.min(1,V.s/V.len),F=V.side*Math.min(V.lat,Math.max(0,(V.from.w.get(V.to.id)??5)/2-.9)),L=V.from.x+(V.to.x-V.from.x)*St-It*F,et=V.from.z+(V.to.z-V.from.z)*St+ft*F;V.init&&(V.x=L,V.z=et,V.heading=Math.atan2(ft,It),V.init=!1);const ot=1-Math.exp(-6*ct);V.x+=(L-V.x)*ot,V.z+=(et-V.z)*ot,V.heading=S(V.heading,Math.atan2(ft,It),Math.min(1,ct*5))}function O(V,ct,X){const Ft=X.x-V.x,bt=X.z-V.z,gt=Math.hypot(Ft,bt),ft=V.role==="penjaga";gt<(ft?4:ua)&&V.anim!=="sit"?(!ft&&!V.greeted?(V.greeted=!0,b(V,"wave")):V.clip==="wave"&&V.t>.7&&b(V,"idle"),V.heading=S(V.heading,Math.atan2(Ft,bt),Math.min(1,ct*5))):(gt>ua+2.5&&(V.greeted=!1),b(V,V.anim),V.heading=S(V.heading,V.homeHeading,Math.min(1,ct*3)))}const C=new Mr,U=new Ht,Y=new on(new B,1.6),k=new _e,W=new B,tt=new B(Io,Io,Io),H=new B(0,1,0);let K=0;const nt={x:0,z:0};function pt(V,ct,X,Ft,bt=110){nt.x=Ft?Ft.x:1e9,nt.z=Ft?Ft.z:1e9,ct.updateMatrixWorld(),U.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),C.setFromProjectionMatrix(U);for(const ft of y)ft.mesh.count=0;K=0;const gt=bt*bt;for(const ft of _){ft.fixed?O(ft,V,nt):z(ft,V,nt);const It=ft.clip==="walk"?(ft.speed||1)/U1:1;ft.t+=V*It,ft.fade>0&&(ft.fade=Math.max(0,ft.fade-V),ft.prevT+=V);const St=ft.x-X.x,F=ft.z-X.z;if(St*St+F*F>gt)continue;const L=ft.y??i.surfaceAt(ft.x,ft.z);if(Y.center.set(ft.x,L+.8,ft.z),!C.intersectsSphere(Y))continue;const et=y[ft.type],ot=et.mesh.count++;W.set(ft.x,L,ft.z),k.setFromAxisAngle(H,ft.heading),et.mesh.setMatrixAt(ot,kc.compose(W,k,tt));const ht=et.animA.array;R(et.table,ft.clip,ft.t,ht,ot*4),ht[ot*4+3]=ft.fade>0?ft.fade/jh:0,ft.fade>0&&R(et.table,ft.prev,ft.prevT,et.animB.array,ot*4),K++}for(const ft of y)ft.mesh.count&&(ft.mesh.instanceMatrix.needsUpdate=!0,ft.animA.needsUpdate=!0,ft.animB.needsUpdate=!0)}function Pt(V,ct=.35){for(const X of _){const Ft=V.x-X.x,bt=V.z-X.z,gt=ct+z1,ft=Ft*Ft+bt*bt;if(ft>=gt*gt||ft<1e-8)continue;const It=Math.sqrt(ft);V.x=X.x+Ft/It*gt,V.z=X.z+bt/It*gt}}return{object:a,agents:_,update:pt,pushOut:Pt,stats:()=>({total:_.length,fixed:_.filter(V=>V.fixed).length,visible:K,jenis:h.length})}}const Sn=2,B1=[{text:"Pulau Tropis",x:10,z:-175,size:15},{text:"Gunung",x:70,z:-48,size:11},{text:"Kotaraja Kencana",x:-560,z:-78,size:14},{text:"Pulau Kencana",x:-560,z:222,size:13},{text:"Pulau Sawah",x:-660,z:-425,size:13},{text:"Pulau Nelayan",x:-760,z:452,size:13},{text:"Pura Segara",x:-890,z:58,size:12},{text:"Jembatan Agung",x:-252,z:24,size:11},{text:"Pelabuhan",x:-553,z:322,size:11}],un=(i,t,e)=>i+(t-i)*e,No=i=>Math.min(1,Math.max(0,i));function H1(i,t,e,n){if(Ic(i,t,od))return{id:"keraton",name:"Keraton Kencana",sub:"Istana Raja Kencana"};if(Ic(i,t,xe,1))return{id:"kotaraja",name:"Kotaraja Kencana",sub:"Ibu kota Kerajaan Kencana"};for(const o of n){const c=o.axis==="x"?i:t,l=o.axis==="x"?t:i;if(Math.abs(l-o.at)<o.width&&c>Math.min(o.a,o.b)&&c<Math.max(o.a,o.b))return{id:`jembatan-${o.id}`,name:o.name,sub:o.id==="agung"?"Penghubung Pulau Tropis dan Kerajaan Kencana":"Kepulauan Kencana"}}if(e.heightAt(i,t)<-1.2)return null;if(Math.hypot(i,t)<340)return{id:"tropis",name:"Pulau Tropis",sub:"Pulau tengah"};let s=null,r=1/0;for(const o of Oa){const c=Math.hypot(i-o.x,t-o.z)/o.r;c<r&&(r=c,s=o)}if(!s||r>1.35)return null;const a={kencana:"Kepulauan Kencana",sawah:"Lumbung padi kerajaan",nelayan:"Kampung nelayan",pura:"Pura di puncak bukit"};return{id:s.id,name:s.id==="pura"?"Pura Segara":s.name,sub:a[s.id]}}function G1(i,t,e){let n,s,r;if(i<0){const a=No(-i/14);n=un(86,22,a),s=un(205,78,a),r=un(200,140,a)}else if(i<2.2)n=226,s=208,r=156;else if(i<40){const a=No((i-2.2)/38);n=un(104,64,a),s=un(168,118,a),r=un(72,52,a)}else{const a=No((i-40)/40);n=un(120,196,a),s=un(118,190,a),r=un(100,182,a)}if(t){const a=(o,c,l,u)=>{n=un(n,c,o),s=un(s,l,o),r=un(r,u,o)};a(t.rumput,120,196,84),a(t.sawah,168,210,80),a(t.jalan,214,184,132),a(t.batu,214,208,196)}e[0]=n,e[1]=s,e[2]=r}function V1({ground:i,plan:t,region:e,camps:n=[]}){const s=document.getElementById("peta"),r=document.getElementById("peta-kanvas"),a=r.getContext("2d"),o=Math.round(Vt.width/Sn),c=Math.round(Vt.depth/Sn);let l=null;const u=x=>(x-Vt.minX)/Sn,h=x=>(x-Vt.minZ)/Sn;function d(){const x=document.createElement("canvas");x.width=o,x.height=c;const g=x.getContext("2d"),p=g.createImageData(o,c),M=[0,0,0];for(let v=0;v<c;v++)for(let _=0;_<o;_++){const E=Vt.minX+(_+.5)*Sn,T=Vt.minZ+(v+.5)*Sn;G1(i.heightAt(E,T),e.at(E,T),M);const P=(v*o+_)*4;p.data[P]=M[0],p.data[P+1]=M[1],p.data[P+2]=M[2],p.data[P+3]=255}g.putImageData(p,0,0),g.fillStyle="rgba(120, 52, 36, 0.85)";for(const v of t.blocked)g.save(),g.translate(u(v.x),h(v.z)),g.rotate(-(v.rot||0)),g.fillRect(-v.hx/Sn,-v.hz/Sn,2*v.hx/Sn,2*v.hz/Sn),g.restore();g.strokeStyle="#f4efe2",g.lineCap="butt";for(const v of t.spans)g.lineWidth=Math.max(2,v.width/Sn),g.beginPath(),v.axis==="x"?(g.moveTo(u(v.a),h(v.at)),g.lineTo(u(v.b),h(v.at))):(g.moveTo(u(v.at),h(v.a)),g.lineTo(u(v.at),h(v.b))),g.stroke();l=x}function f(x,g,p,M,v){a.font=`600 ${Math.round(M*v)}px system-ui, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.lineWidth=3*v,a.strokeStyle="rgba(0, 30, 45, 0.85)",a.strokeText(x,g,p),a.fillStyle="#fff",a.fillText(x,g,p)}function m(x,g){l||d();const p=r.getBoundingClientRect(),M=Math.min(2,window.devicePixelRatio||1);r.width=Math.round(p.width*M),r.height=Math.round(p.height*M);const v=r.width/o;a.imageSmoothingEnabled=!0,a.drawImage(l,0,0,r.width,r.height);const _=Math.max(.8,r.width/900);for(const A of n)a.fillStyle="#e8483a",a.beginPath(),a.arc(u(A.x)*v,h(A.z)*v,4*_,0,Math.PI*2),a.fill();for(const A of B1)f(A.text,u(A.x)*v,h(A.z)*v,A.size,_);const E=u(x.x)*v,T=h(x.z)*v,P=Math.sin(g),N=Math.cos(g),w=9*_;a.fillStyle="#ffe14a",a.strokeStyle="#1a1206",a.lineWidth=2*_,a.beginPath(),a.moveTo(E+P*w*1.4,T+N*w*1.4),a.lineTo(E-N*w*.8-P*w*.7,T+P*w*.8-N*w*.7),a.lineTo(E-P*w*.25,T-N*w*.25),a.lineTo(E+N*w*.8-P*w*.7,T-P*w*.8-N*w*.7),a.closePath(),a.fill(),a.stroke(),f("Kamu",E,T+17*_,11,_)}return{get open(){return!s.hidden},show(x,g){s.hidden=!1,m(x,g)},hide(){s.hidden=!0},sample(x,g){l||d();const p=l.getContext("2d").getImageData(Math.floor(u(x)),Math.floor(h(g)),1,1).data;return[p[0],p[1],p[2]]},size:{width:o,height:c}}}function W1({ground:i,spans:t}){const e=document.getElementById("wilayah"),n=e.querySelector(".wilayah-nama"),s=e.querySelector(".wilayah-ket");let r,a=null,o=0,c=0,l=0;return{get current(){return r},update(u,h,d=!0){if(c>0&&(c-=u,c<=0&&e.classList.remove("tampil")),(l-=u)>0)return!1;l=.25;const f=H1(h.x,h.z,i,t),m=f?f.id:null;return r===void 0?(r=m,!1):m===(r??null)?(a=null,!1):!a||a.id!==m?(a={id:m,r:f},o=0,!1):(o+=.25,o<.5||(r=m,a=null,!f||!d)?!1:(n.textContent=f.name,s.textContent=f.sub,e.classList.add("tampil"),c=3.2,!0))}}}const X1=12,$h={Digit1:"cincang",KeyQ:"cincang",Digit2:"hentak",KeyE:"hentak",Digit3:"putar",KeyR:"putar",Digit4:"penggal",KeyT:"penggal"},j1=800;function Y1({canvas:i,jumpButton:t,attackButton:e,skillButtons:n,touch:s}){const r=new Set;let a=!0,o=!1,c=!1,l=null,u=0,h=1;const d=[],f=new Map;let m=0;function x(){const[E,T]=[...f.values()];return Math.hypot(E.x-T.x,E.y-T.y)}i.addEventListener("contextmenu",E=>E.preventDefault()),i.addEventListener("pointerdown",E=>{var T;if(a&&!(E.pointerType==="mouse"&&E.button!==0&&E.button!==2)){if(f.set(E.pointerId,{x:E.clientX,y:E.clientY,sx:E.clientX,sy:E.clientY,t:E.timeStamp,moved:E.pointerType==="mouse"&&E.button===2}),f.size===2){m=x();for(const P of f.values())P.moved=!0}(T=i.setPointerCapture)==null||T.call(i,E.pointerId)}}),i.addEventListener("pointermove",E=>{const T=f.get(E.pointerId);if(T&&(f.size===1&&(!T.moved&&Math.hypot(E.clientX-T.sx,E.clientY-T.sy)>X1&&(T.moved=!0),T.moved&&(u+=E.clientX-T.x)),T.x=E.clientX,T.y=E.clientY,f.size===2)){const P=x();m>0&&P>0&&(h*=m/P),m=P}});function g(E,T){const P=f.get(E.pointerId);P&&(T&&a&&!P.moved&&E.timeStamp-P.t<j1&&d.push({x:E.clientX,y:E.clientY}),f.delete(E.pointerId),m=f.size===2?x():0)}i.addEventListener("pointerup",E=>g(E,!0)),i.addEventListener("pointercancel",E=>g(E,!1)),i.addEventListener("lostpointercapture",E=>g(E,!1)),i.addEventListener("wheel",E=>{a&&(E.preventDefault(),h*=Math.exp(E.deltaY*.0012))},{passive:!1});function p(E,T){E.addEventListener("pointerdown",P=>{P.preventDefault(),P.stopPropagation(),a&&T(),E.classList.add("ditekan")});for(const P of["pointerup","pointercancel","pointerleave"])E.addEventListener(P,()=>E.classList.remove("ditekan"))}p(t,()=>{o=!0}),p(e,()=>{c=!0});for(const[E,T]of Object.entries(n))p(T,()=>{l=E});const M=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"];window.addEventListener("keydown",E=>{!a||E.target instanceof HTMLInputElement||(M.includes(E.code)&&E.preventDefault(),E.code==="Space"&&!E.repeat&&(o=!0),E.code==="KeyF"&&!E.repeat&&(c=!0),$h[E.code]&&!E.repeat&&(l=$h[E.code]),r.add(E.code))}),window.addEventListener("keyup",E=>r.delete(E.code));function v(){r.clear(),f.clear(),m=0}window.addEventListener("blur",v),document.addEventListener("visibilitychange",v);const _=(...E)=>E.some(T=>r.has(T));return{read(){let E=0,T=0;const P=_("KeyD","ArrowRight")-_("KeyA","ArrowLeft"),N=_("KeyW","ArrowUp")-_("KeyS","ArrowDown");if(P||N){const A=Math.hypot(P,N),I=_("ShiftLeft","ShiftRight")?.45:1;E=P/A*I,T=N/A*I}const w={moveX:E,moveY:T,jump:o,attack:c,skill:l,lookDX:u,zoom:h,taps:d.splice(0)};return o=!1,c=!1,l=null,u=0,h=1,w},setEnabled(E){a=E,E||v();for(const T of[t,e,...Object.values(n)])T.hidden=!E||!s}}}const K1=.006,Uo=10,Jh=60,q1=22,Qh=.85,Z1=1.12,$1=.8,zo=.3;function J1(i,t){const e={yaw:0,dist:q1},n=new B,s=new B;let r=!0,a=0,o=0;const c=()=>Qh+(Z1-Qh)*(e.dist-Uo)/(Jh-Uo);return{state:e,get yaw(){return e.yaw},lookFrom(l,u=!0){e.yaw=l,r=u},shake(l){o=Math.max(o*(a/zo),l),a=zo},update(l,u,h){e.yaw-=h.lookDX*K1,e.dist=ei.clamp(e.dist*h.zoom,Uo,Jh);const d=u.x,f=u.y+$1,m=u.z;if(r)n.set(d,f,m);else{const M=1-Math.exp(-10*l);n.x+=(d-n.x)*M,n.z+=(m-n.z)*M,n.y+=(f-n.y)*(1-Math.exp(-5*l))}const x=c(),g=Math.cos(x);s.set(n.x+Math.sin(e.yaw)*g*e.dist,n.y+Math.sin(x)*e.dist,n.z+Math.cos(e.yaw)*g*e.dist);const p=Math.max(t.surfaceAt(s.x,s.z),0)+3;if(s.y<p&&(s.y=p),r?i.position.copy(s):i.position.lerp(s,1-Math.exp(-10*l)),a>0){a=Math.max(0,a-l);const M=2*o*(a/zo);i.position.x+=(Math.random()-.5)*M,i.position.y+=(Math.random()-.5)*M,i.position.z+=(Math.random()-.5)*M}i.lookAt(n),r=!1}}}function Q1(i,t){return new $e({color:i,transparent:!0,opacity:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}const tf=new B(0,1,0),ko=new B;function tb(i,t,e,n,s){const a=Math.max(t.surfaceAt(e,n),0);ko.set(-(t.surfaceAt(e+.6,n)-t.surfaceAt(e-.6,n))/(2*.6),1,-(t.surfaceAt(e,n+.6)-t.surfaceAt(e,n-.6))/(2*.6)).normalize(),a<=.001&&ko.copy(tf),i.position.set(e,a+s,n),i.quaternion.setFromUnitVectors(tf,ko)}function eb(i){const t=new Re,e=Q1("#ffe26a",.95),n=new te(new Na(.5,.72,40).rotateX(-Math.PI/2),e),s=new te(new fl(.15,20).rotateX(-Math.PI/2),e);t.add(n,s),t.visible=!1,t.renderOrder=10,n.renderOrder=10,s.renderOrder=10;let r=0,a=!1;return{objects:[t],showTarget(o,c,l=!0){tb(t,i,o,c,.06),e.color.set(l?"#ffe26a":"#ff5a5a"),e.opacity=.95,t.visible=!0,a=!l,r=0},hideTarget(){a||(t.visible=!1)},update(o){if(!t.visible)return;r+=o;const c=1+.14*Math.sin(r*7);n.scale.setScalar(c),a&&(e.opacity=Math.max(0,.95-r*1.2),r>.8&&(t.visible=!1,a=!1))}}}const tr=60,nb=12,ef={pohon:["#6b4423","#8a5a2e","#a8743f","#4f8f2f","#6fb03a"],batu:["#7d7a74","#a19d96","#c9c5bd","#ffd27a"],debu:["#d8c497","#c4ab7a","#a88f63","#e6d8b0"],bata:["#9c4a30","#b8603c","#7e3a26","#d9b48a"],kayu:["#6b4423","#8a5a2e","#a8743f","#c99a5f"]},da=(i={})=>new $e({transparent:!0,opacity:0,depthWrite:!1,side:Ze,toneMapped:!1,...i});function ib(i,t,e,n){const s=[],r=[],a=[];for(let c=0;c<=n;c++){const l=c/n,u=-i/2+i*l,h=Math.sin(Math.PI*l),d=t-e*h,f=Math.pow(h,.7);if(s.push(Math.sin(u)*t,0,Math.cos(u)*t,Math.sin(u)*d,0,Math.cos(u)*d),r.push(1,1,1,f,1,1,1,f*.15),c<n){const m=c*2;a.push(m,m+1,m+2,m+1,m+3,m+2)}}const o=new se;return o.setAttribute("position",new Gt(s,3)),o.setAttribute("color",new Gt(r,4)),o.setIndex(a),o}function sb(i){const t=[[.55,1,0],[.84,1,1],[1,.12,.55]],e=[],n=[],s=[];for(let a=0;a<=i;a++){const o=a/i*Math.PI*2;for(const[c,l,u]of t)e.push(Math.sin(o)*c,0,Math.cos(o)*c),n.push(l,l,l,u);if(a<i)for(let c=0;c<t.length-1;c++){const l=a*t.length+c,u=l+t.length;s.push(l,u,l+1,l+1,u,u+1)}}const r=new se;return r.setAttribute("position",new Gt(e,3)),r.setAttribute("color",new Gt(n,4)),r.setIndex(s),r}function rb(){const i=new se;return i.setAttribute("position",new Gt([-.5,0,0,.5,0,0,-.5,0,1,.5,0,1],3)),i.setAttribute("color",new Gt([1,1,1,0,1,1,1,0,1,1,1,.9,1,1,1,.9],4)),i.setIndex([0,1,2,1,3,2]),i}function ab(){const i=[],t=[],e=[];for(let r=0;r<=8;r++){const a=r/8,o=Math.sin(Math.PI*a);i.push(a-.5,0,-.04,a-.5,0,.04),t.push(1,1,1,o,1,1,1,o),r<8&&e.push(r*2,r*2+1,r*2+2,r*2+1,r*2+3,r*2+2)}const s=new se;return s.setAttribute("position",new Gt(i,3)),s.setAttribute("color",new Gt(t,4)),s.setIndex(e),s}const Oo=9,ob=new _e().setFromAxisAngle(new B(1,0,0),Math.PI/2);function cb(i){const t=new Re;t.name="efek-serangan";const e={slashes:0,spins:0,pulses:0,streaks:0,bursts:0,cracks:0,cuts:0,sparks:0,lastKind:null,lastMove:null};function n(y,b,R,S,z,O){const C=ib(b,R,S,40),U=Array.from({length:y},()=>{const k=da({vertexColors:!0}),W=new te(C,k);return W.visible=!1,W.renderOrder=8,t.add(W),{mesh:W,mat:k,t:0,heading:0,dir:1,tilt:0}});let Y=0;return{show(k,W,tt,H,K=1,nt=0){const pt=U[Y];Y=(Y+1)%y,pt.mesh.position.set(k,W,tt),Object.assign(pt,{t:0,heading:H,dir:K,tilt:nt}),pt.mesh.visible=!0},update(k){for(const W of U){if(!W.mesh.visible)continue;W.t+=k;const tt=W.t/z;if(tt>=1){W.mesh.visible=!1;continue}W.mesh.rotation.set(W.tilt,W.heading+(tt-.5)*O*W.dir,0,"YXZ"),W.mesh.scale.setScalar(.85+.3*tt),W.mat.opacity=.95*Math.pow(1-tt,1.3)}}}}const s=n(4,Math.PI*.85,1.35,.6,.22,.9),r=n(1,Math.PI*1.85,2.3,1,.34,2.6),a=sb(48),o=Array.from({length:12},()=>{const y=da({vertexColors:!0}),b=new te(a,y);return b.visible=!1,b.renderOrder=8,t.add(b),{mesh:b,mat:y,t:0,time:1,r0:0,r1:1,alpha:1}});let c=0;function l(y,b,R,S,z,O,C,U,Y=null){const k=o[c];c=(c+1)%o.length,k.mesh.position.set(y,b,R),Y?k.mesh.quaternion.copy(Y).multiply(ob):k.mesh.quaternion.identity(),k.mat.color.set(C),Object.assign(k,{t:0,time:O,r0:S,r1:z,alpha:U}),k.mesh.scale.setScalar(S),k.mesh.visible=!0,e.pulses++}const u=rb(),h=Array.from({length:7},()=>{const y=da({vertexColors:!0}),b=new te(u,y);return b.visible=!1,b.renderOrder=7,t.add(b),{mesh:b,mat:y,t:0}}),d=.5,f=Array.from({length:2},()=>{const y=new se;y.setAttribute("position",new Gt(new Float32Array(Oo*9),3));const b=new $e({color:"#2b1d12",transparent:!0,opacity:0,depthWrite:!1,side:Ze}),R=new te(y,b);return R.visible=!1,R.frustumCulled=!1,R.renderOrder=6,t.add(R),{mesh:R,mat:b,t:0}});let m=0;const x=1.6;function g(y,b){const R=f[m];m=(m+1)%f.length;const S=R.mesh.geometry.attributes.position,z=.05;for(let O=0;O<Oo;O++){const C=O/Oo*Math.PI*2+(Math.random()-.5)*.5,U=1.3+Math.random()*1.6,Y=.07+Math.random()*.05,k=y+Math.sin(C)*.15,W=b+Math.cos(C)*.15;[[k+Math.cos(C)*Y,W-Math.sin(C)*Y],[k-Math.cos(C)*Y,W+Math.sin(C)*Y],[y+Math.sin(C)*U,b+Math.cos(C)*U]].forEach(([H,K],nt)=>S.setXYZ(O*3+nt,H,Math.max(i.surfaceAt(H,K),0)+z,K))}S.needsUpdate=!0,R.t=0,R.mesh.visible=!0,e.cracks++}const p=ab(),M=Array.from({length:5},()=>{const y=da({vertexColors:!0,depthTest:!1}),b=new te(p,y);return b.visible=!1,b.renderOrder=14,t.add(b),{mesh:b,mat:y,t:0}});let v=0;const _=.4,E=new br(new Wi(.21,.21,.21),new $e,tr);E.instanceMatrix.setUsage(ys),E.frustumCulled=!1,E.visible=!1,t.add(E);const T=Array.from({length:tr},()=>({alive:!1,t:0,life:1,size:1,spin:1,floor:0,p:new B,v:new B})),P=new Se,N=new Dt,w=new Ht().makeScale(0,0,0);for(let y=0;y<tr;y++)E.setMatrixAt(y,w),E.setColorAt(y,N.set("#ffffff"));let A=0,I=0;function G(y,b,R,S,z,O,C,U){const Y=ef[S]||ef.batu;for(let k=0;k<z;k++){const W=T[A];W.alive=!0,W.t=0,W.life=.45+Math.random()*.4,W.size=.6+Math.random()*.7,W.spin=(Math.random()-.5)*24,W.floor=U;const tt=O===null?Math.random()*Math.PI*2:O+(Math.random()-.5)*C,H=1.5+Math.random()*3;W.p.set(y,b,R),W.v.set(Math.sin(tt)*H,1.5+Math.random()*3.5,Math.cos(tt)*H),E.setColorAt(A,N.set(Y[k%Y.length])),A=(A+1)%tr}E.instanceColor.needsUpdate=!0,E.visible=!0,e.bursts++,e.lastKind=S}function j(y,b,R,S,z){const O=b-y.x,C=R-y.z,U=Math.hypot(O,C)||1,Y=y.x+O/U*y.radius,k=y.z+C/U*y.radius;G(Y,S,k,y.kind,z,Math.atan2(O,C),2.4,i.surfaceAt(Y,k))}let q=new _e;return{object:t,stats:()=>({...e,alive:I}),attack(y,b=[],R=[]){const S=y.origin;if(e.lastMove=y.move,y.type==="dash"){const Y=y.path;for(let k=0;k+1<Y.length&&k<h.length;k++){const W=Y[k],tt=Y[k+1],H=Math.hypot(tt.x-W.x,tt.z-W.z);if(H<.3)continue;const K=h[k];K.mesh.position.set(W.x,y.y,W.z),K.mesh.rotation.y=Math.atan2(tt.x-W.x,tt.z-W.z),K.mesh.scale.set(.7,1,H),K.mesh.visible=!0,K.t=-k*.04}e.streaks++;return}if(y.type!=="hit")return;const{x:z,y:O,z:C}=y;let U=14;if(y.chop)s.show(S.x,O,S.z,y.heading,y.swing,(Math.random()-.5)*.5),e.slashes++,U=6;else if(y.move==="tebas")s.show(S.x,O,S.z,y.heading),e.slashes++;else if(y.move==="tinju")l(z,O,C,.15,.7,.2,"#ffffff",1),U=8;else if(y.move==="tendang"){l(z,O,C,.2,.95,.24,"#ffe3a0",1);const Y=i.surfaceAt(z,C);Y>-.3&&G(z,Math.max(Y,0)+.15,C,"debu",5,y.heading,1.6,Y),U=10}else if(y.spin)r.show(S.x,O,S.z,y.heading),e.spins++,U=10;else if(y.plant){const Y=i.surfaceAt(S.x,S.z),k=Math.max(Y,0)+.08;g(y.plant.x,y.plant.z),l(y.plant.x,k+.05,y.plant.z,.1,1.2,.25,"#ffffff",1),l(S.x,k,S.z,.4,4,.5,"#fff6dc",.9),l(S.x,k+.02,S.z,.2,2.5,.35,"#ffffff",.7),G(y.plant.x,k+.1,y.plant.z,"debu",16,null,0,Y),U=8}for(const Y of b)j(Y,S.x,S.z,y.plant?O+.5:O,U);for(const Y of R)l(Y.x,Y.y+1,Y.z,.1,.65,.16,"#fff3c0",1,q),e.sparks++},execute(y,b){for(const R of y){const S=M[v];v=(v+1)%M.length,S.mesh.position.set(R.x,R.y+.85,R.z),S.mesh.rotation.set(0,Math.atan2(R.x-b.x,R.z-b.z)+Math.PI/2+(Math.random()-.5)*.5,0),S.t=0,S.mesh.visible=!0,l(R.x,R.y+.85,R.z,.1,.8,.2,"#ffffff",1,q),e.cuts++}},update(y,b){b&&(q=b.quaternion),s.update(y),r.update(y);for(const R of o){if(!R.mesh.visible)continue;R.t+=y;const S=R.t/R.time;if(S>=1){R.mesh.visible=!1;continue}const z=1-Math.pow(1-S,3);R.mesh.scale.setScalar(R.r0+(R.r1-R.r0)*z),R.mat.opacity=R.alpha*(1-S)}for(const R of h){if(!R.mesh.visible)continue;R.t+=y;const S=Math.max(0,R.t)/d;S>=1?R.mesh.visible=!1:R.mat.opacity=.95*(1-S)}for(const R of f){if(!R.mesh.visible)continue;R.t+=y;const S=R.t/x;S>=1?R.mesh.visible=!1:R.mat.opacity=.75*Math.min(1,(1-S)*2.5)}for(const R of M){if(!R.mesh.visible)continue;R.t+=y;const S=R.t/_;if(S>=1){R.mesh.visible=!1;continue}R.mesh.scale.set(.5+1.1*Math.min(1,S*3),1,1+2*(1-S)),R.mat.opacity=Math.min(1,(1-S)*2)}if(E.visible){I=0;for(let R=0;R<tr;R++){const S=T[R];if(S.alive){if(S.t+=y,S.t>=S.life){S.alive=!1,E.setMatrixAt(R,w);continue}I++,S.v.y-=nb*y,S.p.addScaledVector(S.v,y),S.p.y<S.floor+.05&&(S.p.y=S.floor+.05,S.v.set(S.v.x*.5,0,S.v.z*.5)),P.position.copy(S.p),P.rotation.set(S.t*S.spin,S.t*S.spin*.7,0),P.scale.setScalar(S.size*(1-Math.pow(S.t/S.life,3))),P.updateMatrix(),E.setMatrixAt(R,P.matrix)}}E.instanceMatrix.needsUpdate=!0,I||(E.visible=!1)}}}}const Fo={tebas:{clip:"attack-melee-right",speed:.9,hit:.24,reach:1,radius:.7,y:.9,damage:1,knock:2.5},tinju:{clip:"attack-melee-left",speed:1,hit:.21,reach:.8,radius:.55,y:1,damage:1,knock:2.5},tendang:{clip:"attack-kick-right",speed:1,hit:.27,reach:.95,radius:.65,y:.45,damage:2,knock:4}},Bo=["tebas","tinju","tendang"],lb=.7,Fc={cincang:6,hentak:7,putar:5,penggal:15},ub=["attack-melee-right","attack-melee-left","attack-kick-right"],Ln={time:.14,from:.1,speed:2.9,hit:.05,reach:1.1,radius:.95,damage:1,knock:.8,advance:.9},hb=10,_i={chops:3,time:.55,hit:.3,radius:2.4,damage:2,knock:6},In={up:9.5,forward:2.2,radius:3.3,plant:.75,damage:3,knock:7,stuck:.35,recover:.35},Oi={range:14,max:5,aim:.55,seg:.08,pause:.35,recover:.3,past:1.6},fb=.15,nf=.45,db=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function pb(i){let t=null,e=0,n=0,s=null;const r={cincang:0,hentak:0,putar:0,penggal:0};let a=()=>{},o={pickTargets:()=>[],position:()=>null,standable:()=>!0};const c=()=>({x:Math.sin(i.heading),z:Math.cos(i.heading)});function l(v,_){a({type:v,move:t.name,heading:i.heading,origin:{x:i.pos.x,z:i.pos.z},..._})}function u(v,_,E,T,P,N={}){const w=c();l("hit",{x:i.pos.x+w.x*v,z:i.pos.z+w.z*v,r:_,y:i.pos.y+E,damage:T,knock:P,...N})}function h(v,_,E,T,P={}){l("hit",{x:i.pos.x,z:i.pos.z,r:v,y:i.pos.y+_,damage:E,knock:T,area:!0,...P})}function d(v,_,E,T){const P=i.clipLength(_);t={name:v,t:0,dur:P?P/E:nf,hitAt:P?T/E:nf*.55,struck:!1},i.playClip(_,E)}function f(){t.t=0,t.struck=!1,i.playClip("attack-melee-right",Ln.speed,Ln.from)}function m(v){if(v==="pukul"){e=n>0?(e+1)%Bo.length:0;const _=Fo[Bo[e]];d(Bo[e],_.clip,_.speed,_.hit)}else{if(!(v in Fc)||r[v]>0)return!1;if(v==="cincang")t={name:"cincang",phase:"cincang",n:0,of:hb},f();else if(v==="putar")t={name:"putar",phase:"cincang",n:0,of:_i.chops},f();else if(v==="hentak"){if(!i.grounded||i.depthAt(i.pos.x,i.pos.z)>.9)return!1;const _=c();i.launch(_.x*In.forward,In.up,_.z*In.forward),t={name:"hentak",phase:"naik",t:0},i.pose("attack-melee-right",.16)}else{const _=o.pickTargets(i.pos.x,i.pos.z,Oi.range,Oi.max);if(!_.length)return a({type:"gagal",move:"penggal",reason:"musuh"}),!1;t={name:"penggal",phase:"bidik",t:0,ids:_.map(E=>E.id)},i.heading=Math.atan2(_[0].x-i.pos.x,_[0].z-i.pos.z),i.pose("attack-melee-right",.14),l("aim",{targets:t.ids})}r[v]=Fc[v],n=0}return i.stopWalking(),!0}function x(){const v=t.name in Fo;t=null,n=v?lb:0;const _=s;s=null,_&&m(_)}function g(){if(!t.struck&&t.t>=Ln.hit&&(t.struck=!0,u(Ln.reach,Ln.radius,.9,Ln.damage,Ln.knock,{swing:t.n%2?-1:1,chop:t.n+1})),!(t.t<Ln.time))if(t.n++,t.n<t.of)f();else if(t.name==="putar"){const v=i.clipLength("attack-melee-right");Object.assign(t,{phase:"putar",t:0,struck:!1,h0:i.heading}),i.playClip("attack-melee-right",v?v/_i.time:1)}else Object.assign(t,{phase:"pulih",t:0})}function p(){const v=[{x:i.pos.x,z:i.pos.z}];for(const P of t.ids){const N=o.position(P);N&&v.push(N)}if(v.length<2)return v;const _=v[v.length-2],E=v[v.length-1],T=Math.hypot(E.x-_.x,E.z-_.z)||1;for(const P of[Oi.past,1,.6]){const N=E.x+(E.x-_.x)/T*P,w=E.z+(E.z-_.z)/T*P;if(o.standable(N,w)){v.push({x:N,z:w});break}}return v}function M(v){t.t+=v;const{name:_,phase:E}=t;if(E==="cincang"){g();return}if(E==="pulih"){t.t>=(_==="hentak"?In.recover:_==="penggal"?Oi.recover:fb)&&x();return}if(_==="putar"){i.heading=t.h0+db(.04,_i.time-.08,t.t)*Math.PI*2,!t.struck&&t.t>=_i.hit&&(t.struck=!0,h(_i.radius,.85,_i.damage,_i.knock,{spin:!0})),t.t>=_i.time&&(i.heading=t.h0,x());return}if(_==="hentak"){if(E==="naik"&&i.vel.y<0)t.phase="turun",i.pose("attack-melee-right",.27),i.swordDown(!0);else if(E==="turun"&&i.grounded&&t.t>.15||t.t>2.5){const T=c(),P={x:i.pos.x+T.x*In.plant,z:i.pos.z+T.z*In.plant};i.crouch(.28),h(In.radius,.05,In.damage,In.knock,{plant:P}),Object.assign(t,{phase:"tancap",t:0})}else E==="tancap"&&t.t>=In.stuck&&(i.crouch(0),i.swordDown(!1),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(_==="penggal"){if(E==="bidik"&&t.t>=Oi.aim&&(t.path=p(),Object.assign(t,{phase:"kilat",t:0})),t.phase==="kilat"){const T=t.path,P=Math.min(t.t/Oi.seg,T.length-1),N=Math.min(Math.floor(P),T.length-2);if(N>=0){const w=T[N],A=T[N+1],I=P-N;i.teleport(w.x+(A.x-w.x)*I,w.z+(A.z-w.z)*I),i.heading=Math.atan2(A.x-w.x,A.z-w.z)}P>=T.length-1&&(l("dash",{path:T,y:i.pos.y+.9}),i.pose("attack-melee-right",.33),Object.assign(t,{phase:"diam",t:0}))}else E==="diam"&&t.t>=Oi.pause&&(l("execute",{targets:t.ids}),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(!t.struck&&t.t>=t.hitAt){t.struck=!0;const T=Fo[_];u(T.reach,T.radius,T.y,T.damage,T.knock,{swing:1})}t.t>=t.dur&&x()}return{cooldown:r,get busy(){return t!==null},get current(){return t?t.name:null},get phase(){return t&&t.phase||null},onEvent(v){a=v},setArena(v){o=v},drive(){if(!t)return null;if(t.name==="hentak"&&(t.phase==="naik"||t.phase==="turun"))return{keep:!0};if(t.phase==="cincang"){const v=c();return{vx:v.x*Ln.advance,vz:v.z*Ln.advance}}return{vx:0,vz:0,instant:t.name==="penggal"}},update(v,_){for(const T in r)r[T]=Math.max(0,r[T]-v);!t&&n>0&&(n-=v);const E=_.skill||(_.attack?"pukul":null);E&&t?s=E:E&&m(E),t&&M(v)},reset(){t&&(i.swordDown(!1),i.crouch(0)),t=null,s=null,n=0}}}const mb=2.3,gb=.35,pa=2,sf=5.6,xb=26,_b=8,vb=21,yb=7.2,Mb=.12,bb=.15,Sb=1.3,Ab=.35,rf=1.3,Eb=30,Ho={hand:[-.265,0,.068],blade:[-.45,0,.9],grip:.05};async function Tb(i,t,e){var n;try{const s=(await t(e)).scene,r=new B().fromArray(Ho.blade).normalize();s.quaternion.setFromUnitVectors(new B(0,-1,0),r),s.position.fromArray(Ho.hand).addScaledVector(r,Ho.grip),(n=i.getObjectByName("arm-right"))==null||n.add(s),Object.defineProperty(i.userData,"sword",{value:s,enumerable:!1})}catch(s){console.warn("Senjata gagal dimuat:",s)}}async function af(i,t,e=null){const n=new Qf,s=o=>typeof o=="string"?n.loadAsync(o):n.parseAsync(o,""),r=await s(i),a=r.scene;return a.scale.setScalar(mb),e&&await Tb(a,s,e),a.traverse(o=>{if(!o.isMesh)return;const c=o.material;o.material=new si({map:c.map}),c.dispose(),o.castShadow=t.shadows,o.receiveShadow=t.shadows,o.frustumCulled=!1}),{model:a,clips:r.animations}}function wb(i){const t=new Re,e=new te(new hl(.3,.6,4,8),new si({color:"#3f8f4a"}));e.position.y=.6;const n=new te(new Ua(.26,12,8),new si({color:"#e0b48a"}));return n.position.y=1.32,t.add(e,n),t.traverse(s=>{s.castShadow=i.shadows}),t}function Rb({ground:i,colliders:t,quality:e,asset:n}){const s=new Re;s.name="pemain";const r=n?n.model:wb(e);s.add(r);const a=n?new _l(r):null,o={},c=["jump",...ub];if(a)for(const H of["idle","walk","sprint","fall",...c]){const K=Ns.findByName(n.clips,H);if(!K)continue;const nt=a.clipAction(K);c.includes(H)&&(nt.setLoop(Zc,1),nt.clampWhenFinished=!0),o[H]=nt}let l=null;function u(H,K=.15){const nt=o[H];!nt||l===nt||(nt.reset().play(),l&&nt.crossFadeFrom(l,K,!1),l=nt)}u("idle");let h=null;if(!e.shadows){const H=document.createElement("canvas");H.width=H.height=64;const K=H.getContext("2d"),nt=K.createRadialGradient(32,32,0,32,32,32);nt.addColorStop(0,"rgba(0,0,0,0.5)"),nt.addColorStop(1,"rgba(0,0,0,0)"),K.fillStyle=nt,K.fillRect(0,0,64,64),h=new te(new ai(1.2,1.2).rotateX(-Math.PI/2),new $e({map:new K_(H),transparent:!0,depthWrite:!1})),h.renderOrder=2}const d=s.position,f=new B,m=new B;let x=0,g=0,p=!0,M=0,v=0,_=0,E=0,T=0,P=()=>{},N=!1;const w=[];let A=0,I=1/0;function G(){for(;w.length;){const V=w[0];if(Math.hypot(V.x-d.x,V.z-d.z)>(w.length>1?.8:.25))break;w.shift(),I=1/0,A=0}if(!w.length)return null;const H=w[0].x-d.x,K=w[0].z-d.z,nt=Math.hypot(H,K);let pt=nt;for(let V=1;V<w.length;V++)pt+=Math.hypot(w[V].x-w[V-1].x,w[V].z-w[V-1].z);const Pt=Math.min(pt>7?sf:pa*1.4,.8+pt*2.2);return{dx:H/nt,dz:K/nt,speed:Pt}}const j={x:0,z:0,len:0};function q(H,K){return j.x=(i.surfaceAt(H+.5,K)-i.surfaceAt(H-.5,K))/(2*.5),j.z=(i.surfaceAt(H,K+.5)-i.surfaceAt(H,K-.5))/(2*.5),j.len=Math.hypot(j.x,j.z),j}function y(H,K,nt){d.set(H,i.surfaceAt(H,K),K),f.set(0,0,0),x=nt,s.rotation.y=nt,p=!0,E=0,d.y>.4&&(m.copy(d),g=nt)}const b=r.userData.sword||null,R=b?b.quaternion.clone():null,S=r.getObjectByName("arm-right");let z=!1;const O=new _e,C=new _e,U=new _e().setFromAxisAngle(new B(1,0,0),-.3),Y=new B(0,1,0);function k(){if(b){if(!z){b.quaternion.copy(R);return}S.getWorldQuaternion(O),C.setFromAxisAngle(Y,x).multiply(U),b.quaternion.copy(O.invert().multiply(C))}}const W=pb({pos:d,vel:f,get heading(){return x},set heading(H){x=H},get grounded(){return p},depthAt:(H,K)=>be.seaLevel-i.surfaceAt(H,K),clipLength:H=>{var K;return((K=o[H])==null?void 0:K.getClip().duration)||0},play:u,playClip(H,K,nt=0){const pt=o[H];pt&&(pt.timeScale=K,l===pt?pt.reset().play():u(H,.06),pt.time=nt)},pose(H,K){const nt=o[H];nt&&(l!==nt&&u(H,.06),nt.time=K,nt.paused=!0)},release(){l&&(l.paused=!1)},launch(H,K,nt){f.set(H,K,nt),p=!1,M=0,_=0},teleport(H,K){d.set(H,i.surfaceAt(H,K),K),f.set(0,0,0),p=!0},swordDown(H){z=H},crouch(H){r.position.y=-H},stopWalking(){w.length=0}});function tt(H,K,nt){let pt=0,Pt=0,V=0,ct=0;const X=W.drive();if(X)pt=X.vx||0,Pt=X.vz||0,ct=1;else if(Math.abs(K.moveX)+Math.abs(K.moveY)>.01){w.length=0;const ot=-Math.sin(nt),ht=-Math.cos(nt),lt=Math.cos(nt),Lt=-Math.sin(nt);pt=lt*K.moveX+ot*K.moveY,Pt=Lt*K.moveX+ht*K.moveY;const yt=Math.hypot(pt,Pt);V=Math.min(1,yt),pt/=yt,Pt/=yt,ct=V<.7?pa*(V/.7):pa+(sf-pa)*(V-.7)/.3}else{const ot=G();ot&&({dx:pt,dz:Pt,speed:ct}=ot,V=1)}const Ft=be.seaLevel-i.surfaceAt(d.x,d.z);Ft>Ab&&!X&&(ct*=.55);const bt=(p?xb:_b)*H,gt=pt*ct,ft=Pt*ct,It=gt-f.x,St=ft-f.z,F=Math.hypot(It,St);if(X!=null&&X.keep||(F<=bt||X!=null&&X.instant?(f.x=gt,f.z=ft):(f.x+=It/F*bt,f.z+=St/F*bt)),V>.05){let ht=Math.atan2(pt,Pt)-x;ht=Math.atan2(Math.sin(ht),Math.cos(ht)),x+=ht*Math.min(1,12*H)}M=p?Mb:M-H,v=K.jump?bb:v-H,v>0&&M>0&&Ft<rf*.8&&!X&&(f.y=yb,p=!1,M=0,v=0,_=0,u("jump",.08)),f.y-=vb*H,d.x+=f.x*H,d.z+=f.z*H,d.y+=f.y*H,t.resolve(d,gb,f);const L=q(d.x,d.z);if(L.len>Sb){const ot=L.x/L.len,ht=L.z/L.len,lt=f.x*ot+f.z*ht;lt>0&&(f.x-=lt*ot,f.z-=lt*ht,d.x-=lt*ot*H,d.z-=lt*ht*H),p&&(f.x-=ot*6*H,f.z-=ht*6*H)}const et=i.surfaceAt(d.x,d.z);d.y<=et?(d.y=et,f.y<0&&(f.y=0),p=!0):p&&f.y<=0&&d.y-et<.6?(d.y=et,f.y=0):p=!1,p?_=0:_+=H}return{root:s,blob:h,get position(){return d},get heading(){return x},get speed(){return Math.hypot(f.x,f.z)},get grounded(){return p},get usingModel(){return!!n},get hasPath(){return w.length>0},get attacking(){return W.busy},get attackMove(){return W.current},get attackPhase(){return W.phase},get cooldowns(){return W.cooldown},placeAt:y,followPath(H){w.length=0,w.push(...H),I=1/0,A=0},stop(){w.length=0},onRespawnNeeded(H){P=H},onAttack(H){W.onEvent(H)},setArena(H){W.setArena(H)},respawn(){y(m.x,m.z,g),w.length=0,W.reset(),N=!1,u("idle",.05)},freeze(){N=!0,f.set(0,0,0)},update(H,K,nt){if(N||W.update(H,K),!N){const ct=W.drive(),X=ct&&!ct.keep?Math.hypot(ct.vx,ct.vz):0,Ft=Math.max(Math.hypot(f.x,f.z),X),bt=Math.min(12,Math.max(H>1/45?2:1,Math.ceil(Ft*H/.3)));for(let gt=0;gt<bt;gt++)tt(H/bt,gt===0?K:{...K,jump:!1},nt)}if(s.rotation.y=x,w.length&&!N&&!W.busy){const ct=Math.hypot(w[0].x-d.x,w[0].z-d.z);ct<I-.25?(I=ct,A=0):(A+=H)>1.2&&(w.shift(),I=1/0,A=0)}const pt=i.surfaceAt(d.x,d.z);E=be.seaLevel-pt>rf?E+H:0,!N&&E>.6?P("laut"):!N&&!rM(d.x,d.z,Eb)&&P("jauh"),T+=H,T>.4&&p&&pt>.4&&q(d.x,d.z).len<.8&&(T=0,m.copy(d),g=x);const V=Math.hypot(f.x,f.z);if(!W.busy){let ct=null;p?ct=V<.3?"idle":V<3.6?"walk":"sprint":_>.12&&(ct=f.y>0&&l===o.jump?"jump":"fall"),ct&&u(ct,.18)}if(o.walk&&(o.walk.timeScale=ei.clamp(V/1.4,.6,1.6)),o.sprint&&(o.sprint.timeScale=ei.clamp(V/3.6,.8,1.6)),a==null||a.update(H),k(),h){const ct=d.y-pt;h.position.set(d.x,pt+.05,d.z),h.material.opacity=Math.max(0,1-ct/3),h.scale.setScalar(1+ct*.15)}}}}const ie=i=>document.getElementById(i);function yr(i){ie("loading").hidden=!0,ie("error").hidden=!1,ie("error-teks").textContent=String(i)}window.addEventListener("error",i=>{var t;return yr(((t=i.error)==null?void 0:t.stack)||i.message)});window.addEventListener("unhandledrejection",i=>{var t;return yr(((t=i.reason)==null?void 0:t.stack)||i.reason)});function Cb(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Dn(i){ie("loading-teks").textContent=i}const qn=()=>new Promise(i=>requestAnimationFrame(()=>setTimeout(i,0))),of={rendah:"Rendah",sedang:"Sedang",tinggi:"Tinggi"};let cf=0;function ma(i,t=2800){const e=ie("pesan");e.textContent=i,e.hidden=!1,clearTimeout(cf),cf=setTimeout(()=>{e.hidden=!0},t)}function Pb(i,t){const e=Math.SQRT1_2;for(let n=140;n<280;n+=1){const s=-e*n,r=e*n,a=i.heightAt(s,r);if(a>.9&&a<2.2&&i.slopeAt(s,r)<.3&&t.isFree(s,r,.9))return{x:s,z:r,heading:Math.atan2(-s,-r)}}return{x:-128,z:128,heading:Math.atan2(128,-128)}}const Lb="<b>Ketuk tanah</b> untuk berjalan ke sana (jauh = lari)<br>Geser: putar kamera · Cubit: zoom<br><b>Pukul</b> berulang = kombo · 4 tombol <b>jurus</b> · musuh orc ada di depan<br><b>Peta</b>: Kerajaan Kencana ada di barat, lewat Jembatan Agung",Ib="<b>Klik tanah</b> untuk berjalan ke sana · WASD / panah juga bisa<br>Seret mouse: putar kamera · Roda: zoom · Spasi: lompat<br>F: pukul (kombo) · 1–4: jurus Cincang, Hentak, Putar, Penggal<br>M: peta — Kerajaan Kencana ada di barat, lewat Jembatan Agung",Db={main:[55,42],lihat:[70,55]};function Nb(){const i=ie("btn-kualitas"),t=ie("panel-kualitas");i.textContent=`Kualitas: ${of[Ae.level]}`,t.querySelectorAll("button[data-q]").forEach(e=>{e.classList.toggle("aktif",e.dataset.q===Ae.level),e.addEventListener("click",()=>{if(e.dataset.q===Ae.level){t.hidden=!0;return}t.hidden=!0,ie("loading").hidden=!1,Dn(`Mengganti kualitas ke ${of[e.dataset.q]}…`),setTimeout(()=>Gy(e.dataset.q),50)})}),i.addEventListener("click",()=>{t.hidden=!t.hidden,ie("saran").hidden=!0}),ie("btn-tutup-kualitas").addEventListener("click",()=>{t.hidden=!0})}async function Ub(){if(!Cb()){yr(`Browser ini tidak mendukung WebGL 2.
Coba gunakan Chrome versi terbaru di Android.`);return}const i=ie("game"),t=new F_({canvas:i,antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,Ae.maxPixelRatio)),t.outputColorSpace=ke,t.toneMapping=uf,t.toneMappingExposure=1,Ae.shadows&&(t.shadowMap.enabled=!0,t.shadowMap.type=Ae.softShadows?lf:Hc);const e=new B_,n=new qe(55,1,.5,5e3);Dn("Menyiapkan tekstur…"),await qn();const s=Wy(t),r={noiseTexture:s,quality:Ae};Dn("Membuat langit dan cahaya…"),await qn();const a=MM(e,r);Dn("Membentuk pulau-pulau…"),await qn();const o=Mh(Ae.terrainSegments),c=cM(o,Ae.water.shoreRes),l=ZM(o),u=$M(l,o),h=pM(o,{...r,region:u});e.add(h),Dn("Menanam pohon dan menebar batu…"),await qn();const d=new Yy(8),f=Mh(Ae.terrainSegments,{heightFn:ad,rect:{minX:-500,maxX:500,minZ:-500,maxZ:500}}),m=TM({ground:f,grid:d,quality:Ae,noiseTexture:s,reserved:u.reserved}),x=RM({ground:f,grid:d,quality:Ae,reserved:u.reserved});e.add(m,x),Dn("Membangun Kerajaan Kencana…"),await qn();const g=D1({ground:o,plan:l,mask:u,grid:d,quality:Ae,noiseTexture:s});e.add(g.object),o.setSurfaces(g.surfaces),h.userData.applyOcclusion([...m.userData.occlusion,...x.userData.occlusion,...g.occlusion]);const p=zM([...m.userData.trunks,...x.userData.colliders.filter(st=>st.radius>=.8),...g.colliders]),M=HM(o,p);Dn("Menumbuhkan rumput…"),await qn();const v=NM({ground:o,grid:d,quality:Ae});e.add(v),Dn("Mengisi lautan…"),await qn();const _=Xy(t),E=_M({ground:o,shore:c,env:a,noiseTexture:s,normalTexture:_,quality:Ae});e.add(E),Dn("Menyiapkan karakter…"),await qn();const T=st=>new URL(`models/${st}`,document.baseURI).href;let P=null;try{P=await af(T("prajurit.glb"),Ae,T("pedang.glb"))}catch(st){console.warn("Model karakter gagal dimuat:",st)}let N=null;try{N=await af(T("orc.glb"),Ae)}catch(st){console.warn("Model musuh gagal dimuat:",st)}Dn("Mengundang penduduk kerajaan…"),await qn();let w=null;try{const st=await new Qf().loadAsync(T("penduduk.glb"));w=F1({ground:o,routes:g.routes,spots:g.spots,quality:Ae,villagerGltf:st,soldier:P}),e.add(w.object)}catch(st){console.warn("Penduduk gagal dimuat:",st)}const A=Rb({ground:o,colliders:p,quality:Ae,asset:P});e.add(A.root),A.blob&&e.add(A.blob);const I=Pb(o,p);A.placeAt(I.x,I.z,I.heading);const G=N?qM({ground:o,colliders:p,nav:M,asset:N,spawn:I}):null;G&&e.add(G.object),A.setArena({pickTargets:(st,Tt,dt,xt)=>G?G.pickTargets(st,Tt,dt,xt):[],position:st=>G?G.position(st):null,standable:(st,Tt)=>M.walkableAt(st,Tt)&&p.isFree(st,Tt,.45)&&o.heightAt(st,Tt)>-.9});const j=navigator.maxTouchPoints>0||"ontouchstart"in window,q=J1(n,o);q.lookFrom(I.heading+Math.PI);const y={cincang:ie("btn-cincang"),hentak:ie("btn-hentak"),putar:ie("btn-putar"),penggal:ie("btn-penggal")},b=Y1({canvas:i,jumpButton:ie("btn-lompat"),attackButton:ie("btn-pukul"),skillButtons:y,touch:j}),R={moveX:0,moveY:0,jump:!1,attack:!1,skill:null,lookDX:0,zoom:1,taps:[]},S=eb(o);e.add(...S.objects);const z=cb(o);e.add(z.object),A.onAttack(st=>{if(st.type==="gagal"){ma("Tidak ada musuh dalam jangkauan Penggal (±14 m).",1800);return}if(st.type==="aim"){G==null||G.mark(st.targets,!0);return}if(st.type==="execute"){G==null||G.mark(st.targets,!1);const Tt=G?G.decapitate(st.targets,A.position):[];z.execute(Tt,A.position),Tt.length&&q.shake(.22);return}if(st.type==="hit"){const Tt={x:st.x,z:st.z,r:st.r},dt=G?G.hit(Tt,st.damage,st.knock,st.origin):[];z.attack(st,p.hitAll(st.x,st.z,st.r,5),dt),st.plant?q.shake(.4):dt.length&&st.spin&&q.shake(.12);return}z.attack(st)});const O={};function C(){for(const[st,Tt]of Object.entries(y)){const dt=A.cooldowns[st],xt=dt>0?Math.ceil(dt*10):0;O[st]!==xt&&(O[st]=xt,Tt.style.setProperty("--cd",(dt/Fc[st]).toFixed(3)),Tt.querySelector(".cd").textContent=dt>0?Math.ceil(dt):"",Tt.classList.toggle("siap",dt<=0))}}const U=new Vv,Y=new vt,k=(st,Tt)=>Math.max(o.surfaceAt(st,Tt),be.seaLevel);function W(st,Tt){const dt=i.getBoundingClientRect();Y.set((st-dt.left)/dt.width*2-1,-((Tt-dt.top)/dt.height)*2+1),U.setFromCamera(Y,n);const{origin:xt,direction:Nt}=U.ray;let Ot=0,Et=0;for(;Et<1500;){const Zt=xt.y+Nt.y*Et-k(xt.x+Nt.x*Et,xt.z+Nt.z*Et);if(Zt<=0){let Xt=Ot,re=Et;for(let Z=0;Z<14;Z++){const Mt=(Xt+re)/2;xt.y+Nt.y*Mt>k(xt.x+Nt.x*Mt,xt.z+Nt.z*Mt)?Xt=Mt:re=Mt}return{x:xt.x+Nt.x*re,z:xt.z+Nt.z*re}}Ot=Et,Et+=ei.clamp(Zt*.5,.3,25)}return null}function tt(st){const Tt=W(st.x,st.y);if(!Tt)return;const dt=M.findPath(A.position,Tt);if(dt){A.followPath(dt);const xt=dt[dt.length-1];S.showTarget(xt.x,xt.z,!0),St()}else S.showTarget(Tt.x,Tt.z,!1),ma("Tidak ada jalan ke sana.",1600)}const H=new jv(n,i);H.target.set(0,8,0),n.position.set(-260,140,330),H.enabled=!1,H.enableDamping=!0,H.dampingFactor=.08,H.minDistance=12,H.maxDistance=1500,H.maxPolarAngle=Math.PI*.47,H.rotateSpeed=Ae.isMobile?.6:.8,H.zoomSpeed=.9,H.screenSpacePanning=!1,H.touches={ONE:Mi.ROTATE,TWO:Mi.DOLLY_PAN};function K(){const st=Math.max(o.surfaceAt(n.position.x,n.position.z),be.seaLevel);n.position.y<st+3&&(n.position.y=st+3),H.target.x=ei.clamp(H.target.x,Vt.minX+50,Vt.maxX-50),H.target.z=ei.clamp(H.target.z,Vt.minZ+50,Vt.maxZ-50),H.target.y=Math.max(o.surfaceAt(H.target.x,H.target.z),0)+3}let nt="main";function pt(){const st=window.innerWidth,Tt=window.innerHeight;t.setSize(st,Tt,!1),n.aspect=st/Tt,n.fov=Db[nt][st<Tt?0:1],n.updateProjectionMatrix()}window.addEventListener("resize",pt),window.addEventListener("orientationchange",()=>setTimeout(pt,200)),pt();const Pt=ie("btn-layar-penuh");document.documentElement.requestFullscreen||(Pt.hidden=!0),Pt.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{Pt.textContent=document.fullscreenElement?"Keluar layar penuh":"Layar penuh"}),Nb();function V(st){const Tt=nt;nt=st;const dt=nt==="main";if(H.enabled=!dt,b.setEnabled(dt),ie("btn-mode").textContent=dt?"Lihat pulau":"Main lagi",dt&&Tt==="lihat"){const xt=A.position,Nt=n.position.x-xt.x,Ot=n.position.z-xt.z;q.lookFrom(Math.atan2(Nt,Ot),!1)}else dt||(A.stop(),S.hideTarget(),H.target.copy(A.position),H.update());pt()}ie("btn-mode").addEventListener("click",()=>V(nt==="main"?"lihat":"main"));const ct=V1({ground:o,plan:l,region:u,camps:G?G.camps:[]}),X=W1({ground:o,spans:l.spans});function Ft(){ct.open?ct.hide():(ie("panel-kualitas").hidden=!0,St(),ct.show(A.position,A.heading))}ie("btn-peta").addEventListener("click",Ft),ie("btn-tutup-peta").addEventListener("click",()=>ct.hide()),ie("peta").addEventListener("click",st=>{st.target.id==="peta"&&ct.hide()}),window.addEventListener("keydown",st=>{st.code==="KeyM"&&!st.repeat?Ft():st.code==="Escape"&&ct.hide()}),V("main");let bt=!1;A.onRespawnNeeded(st=>{bt||(bt=!0,A.freeze(),ie("tirai").classList.add("gelap"),setTimeout(()=>{A.respawn(),q.lookFrom(A.heading+Math.PI),ie("tirai").classList.remove("gelap"),ma(st==="laut"?"Airnya terlalu dalam! Kamu kembali ke pantai.":"Terlalu jauh dari pulau. Kamu kembali ke pantai."),bt=!1},450))}),P||ma("Model karakter gagal dimuat — memakai karakter sederhana.",5e3);const gt=ie("petunjuk");gt.innerHTML=j?Lb:Ib;let ft=0,It=!1;function St(){It||(It=!0,gt.style.opacity=0,setTimeout(()=>{gt.hidden=!0},1e3))}i.addEventListener("webglcontextlost",st=>{st.preventDefault(),yr(`Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).
Muat ulang halaman, lalu pilih Kualitas: Rendah.`)});const F=new Cv;let L=0,et=0,ot=0,ht=0,lt=Ae.level==="rendah",Lt=0;const yt={timeScale:1};t.setAnimationLoop(()=>{Lt++;const st=Math.min(F.getDelta(),.1)*yt.timeScale,Tt=F.elapsedTime;if(nt==="main"){const dt=b.read();for(const Ot of dt.taps)tt(Ot);A.update(st,dt,q.yaw),w==null||w.pushOut(A.position),A.hasPath||S.hideTarget(),q.update(st,A.position,dt),!It&&(A.speed>.5||(ft+=st)>15)&&St(),wn.a.value.copy(n.position),wn.b.value.copy(A.position).y+=1;const xt=A.position,Nt=g.roofs.find(Ot=>Math.abs(xt.x-Ot.x)<Ot.hx&&Math.abs(xt.z-Ot.z)<Ot.hz);wn.r.value+=((Nt?Nt.r:3.5)-wn.r.value)*(1-Math.exp(-6*st))}else A.update(st,R,q.yaw),H.update(),K(),wn.r.value=0;S.update(st),G==null||G.update(st,n,A),X.update(st,A.position,nt==="main")&&St(),w==null||w.update(st,n,nt==="main"?A.position:H.target,A.position,nt==="main"?110:260),z.update(st,n),C(),a.update(Tt,n,nt==="main"?A.position:H.target),Ml.value=Tt,m.userData.update(Tt),g.update(Tt),v.userData.update(n,Tt),t.render(e,n),L++,et+=st,et>=.5&&(ie("fps").textContent=`${Math.round(L/et)} FPS · kualitas ${Ae.level}`,L=0,et=0),!lt&&Tt>3&&(ot+=st,ht++,ot>6&&(lt=!0,ht/ot<24&&(St(),ie("saran").hidden=!1,setTimeout(()=>{ie("saran").hidden=!0},9e3))))}),ie("loading").hidden=!0,ie("hud").hidden=!1,window.__pulau={renderer:t,scene:e,camera:n,controls:H,ground:o,shore:c,quality:Ae,trees:m,rocks:x,grass:v,water:E,env:a,kencana:g,region:u,plan:l,villagers:w,worldMap:ct,banner:X,player:A,cam:q,input:b,colliders:p,nav:M,markers:S,effects:z,enemies:G,pickGround:W,setMode:V,getMode:()=>nt,frames:()=>Lt,debug:yt}}Ub().catch(yr);
