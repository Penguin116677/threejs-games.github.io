(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fl="170",Js={ROTATE:0,DOLLY:1,PAN:2},Hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bp=0,Lu=1,Hp=2,Bl=1,wd=2,pi=3,Mi=0,rn=1,sn=2,Wi=0,Qs=1,zu=2,Du=3,ku=4,Gp=5,fs=100,Vp=101,Wp=102,Xp=103,jp=104,Yp=200,Kp=201,qp=202,Zp=203,Bc=204,Hc=205,$p=206,Jp=207,Qp=208,tm=209,em=210,nm=211,im=212,sm=213,rm=214,Gc=0,Vc=1,Wc=2,rr=3,Xc=4,jc=5,Yc=6,Kc=7,Hl=0,am=1,om=2,Xi=0,cm=1,lm=2,um=3,Td=4,hm=5,fm=6,dm=7,Nu="attached",pm="detached",Ed=300,ar=301,or=302,qc=303,Zc=304,bo=306,Ki=1e3,Jn=1001,fo=1002,qe=1003,Rd=1004,Ur=1005,He=1006,so=1007,xn=1008,Pn=1009,Cd=1010,Pd=1011,$r=1012,Gl=1013,xs=1014,En=1015,mr=1016,Vl=1017,Wl=1018,cr=1020,Id=35902,Ld=1021,zd=1022,Ke=1023,Dd=1024,kd=1025,tr=1026,lr=1027,Xl=1028,jl=1029,Nd=1030,Yl=1031,Kl=1033,ro=33776,ao=33777,oo=33778,co=33779,$c=35840,Jc=35841,Qc=35842,tl=35843,el=36196,nl=37492,il=37496,sl=37808,rl=37809,al=37810,ol=37811,cl=37812,ll=37813,ul=37814,hl=37815,fl=37816,dl=37817,pl=37818,ml=37819,gl=37820,xl=37821,lo=36492,_l=36494,vl=36495,Ud=36283,yl=36284,Ml=36285,bl=36286,ql=2200,mm=2201,gm=2202,Jr=2300,Qr=2301,ko=2302,Xs=2400,js=2401,po=2402,Zl=2500,xm=2501,_m=0,Od=1,Sl=2,vm=3200,So=3201,$l=0,ym=1,Bi="",Oe="srgb",an="srgb-linear",Ao="linear",ve="srgb",As=7680,Uu=519,Mm=512,bm=513,Sm=514,Fd=515,Am=516,wm=517,Tm=518,Em=519,Al=35044,Rn=35048,Ou="300 es",xi=2e3,mo=2001;class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fu=1234567;const Wr=Math.PI/180,ur=180/Math.PI;function Gn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ze[i&255]+Ze[i>>8&255]+Ze[i>>16&255]+Ze[i>>24&255]+"-"+Ze[t&255]+Ze[t>>8&255]+"-"+Ze[t>>16&15|64]+Ze[t>>24&255]+"-"+Ze[e&63|128]+Ze[e>>8&255]+"-"+Ze[e>>16&255]+Ze[e>>24&255]+Ze[n&255]+Ze[n>>8&255]+Ze[n>>16&255]+Ze[n>>24&255]).toLowerCase()}function De(i,t,e){return Math.max(t,Math.min(e,i))}function Jl(i,t){return(i%t+t)%t}function Rm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Cm(i,t,e){return i!==t?(e-i)/(t-i):0}function Xr(i,t,e){return(1-e)*i+e*t}function Pm(i,t,e,n){return Xr(i,t,1-Math.exp(-e*n))}function Im(i,t=1){return t-Math.abs(Jl(i,t*2)-t)}function Lm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function zm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Dm(i,t){return i+Math.floor(Math.random()*(t-i+1))}function km(i,t){return i+Math.random()*(t-i)}function Nm(i){return i*(.5-Math.random())}function Um(i){i!==void 0&&(Fu=i);let t=Fu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Om(i){return i*Wr}function Fm(i){return i*ur}function Bm(i){return(i&i-1)===0&&i!==0}function Hm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Gm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vm(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Fn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ge(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const vi={DEG2RAD:Wr,RAD2DEG:ur,generateUUID:Gn,clamp:De,euclideanModulo:Jl,mapLinear:Rm,inverseLerp:Cm,lerp:Xr,damp:Pm,pingpong:Im,smoothstep:Lm,smootherstep:zm,randInt:Dm,randFloat:km,randFloatSpread:Nm,seededRandom:Um,degToRad:Om,radToDeg:Fm,isPowerOfTwo:Bm,ceilPowerOfTwo:Hm,floorPowerOfTwo:Gm,setQuaternionFromProperEuler:Vm,normalize:ge,denormalize:Fn};class Ct{constructor(t=0,e=0){Ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,s,r,a,o,c,l){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],M=s[1],y=s[4],v=s[7],w=s[2],T=s[5],L=s[8];return r[0]=a*x+o*M+c*w,r[3]=a*m+o*y+c*T,r[6]=a*p+o*v+c*L,r[1]=l*x+u*M+h*w,r[4]=l*m+u*y+h*T,r[7]=l*p+u*v+h*L,r[2]=d*x+f*M+g*w,r[5]=d*m+f*y+g*T,r[8]=d*p+f*v+g*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=e*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=h*x,t[1]=(s*l-u*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(No.makeScale(t,e)),this}rotate(t){return this.premultiply(No.makeRotation(-t)),this}translate(t,e){return this.premultiply(No.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const No=new Zt;function Bd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ta(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wm(){const i=ta("canvas");return i.style.display="block",i}const Bu={};function Or(i){i in Bu||(Bu[i]=!0,console.warn(i))}function Xm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function jm(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ym(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ae={enabled:!0,workingColorSpace:an,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(i.r=er(i.r),i.g=er(i.g),i.b=er(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Bi?Ao:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function yi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function er(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Hu=[.64,.33,.3,.6,.15,.06],Gu=[.2126,.7152,.0722],Vu=[.3127,.329],Wu=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xu=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[an]:{primaries:Hu,whitePoint:Vu,transfer:Ao,toXYZ:Wu,fromXYZ:Xu,luminanceCoefficients:Gu,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:Hu,whitePoint:Vu,transfer:ve,toXYZ:Wu,fromXYZ:Xu,luminanceCoefficients:Gu,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}});let ws;class Km{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ws===void 0&&(ws=ta("canvas")),ws.width=t.width,ws.height=t.height;const n=ws.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ws}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ta("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yi(e[n]/255)*255):e[n]=yi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qm=0;class Hd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=Gn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Uo(s[a].image)):r.push(Uo(s[a]))}else r=Uo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Uo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Km.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zm=0;class Ve extends Zi{constructor(t=Ve.DEFAULT_IMAGE,e=Ve.DEFAULT_MAPPING,n=Jn,s=Jn,r=He,a=xn,o=Ke,c=Pn,l=Ve.DEFAULT_ANISOTROPY,u=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=Gn(),this.name="",this.source=new Hd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ed)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ki:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case fo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ki:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case fo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Ed;Ve.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,s=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,v=(f+1)/2,w=(p+1)/2,T=(u+d)/4,L=(h+x)/4,B=(g+m)/4;return y>v&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=L/n):v>w?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=B/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=L/r,s=B/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-x)/M,this.z=(d-u)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $m extends Zi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ve(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Hd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bi extends $m{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Gd extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jm extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xe{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(h!==x||c!==d||l!==f||u!==g){let m=1-o;const p=c*d+l*f+u*g+h*x,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const w=Math.sqrt(y),T=Math.atan2(w,p*M);m=Math.sin(m*T)/w,o=Math.sin(o*T)/w}const v=o*M;if(c=c*m+d*v,l=l*m+f*v,u=u*m+g*v,h=h*m+x*v,m===1-o){const w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+u*h+c*f-l*d,t[e+1]=c*g+u*d+l*h-o*f,t[e+2]=l*g+u*f+o*d-c*h,t[e+3]=u*g-o*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(t=0,e=0,n=0){G.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ju.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ju.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oo.copy(this).projectOnVector(t),this.sub(Oo)}reflect(t){return this.sub(Oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oo=new G,ju=new xe;class Si{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),da.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),da.copy(n.boundingBox)),da.applyMatrix4(t.matrixWorld),this.union(da)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wr),pa.subVectors(this.max,wr),Ts.subVectors(t.a,wr),Es.subVectors(t.b,wr),Rs.subVectors(t.c,wr),Ti.subVectors(Es,Ts),Ei.subVectors(Rs,Es),Ji.subVectors(Ts,Rs);let e=[0,-Ti.z,Ti.y,0,-Ei.z,Ei.y,0,-Ji.z,Ji.y,Ti.z,0,-Ti.x,Ei.z,0,-Ei.x,Ji.z,0,-Ji.x,-Ti.y,Ti.x,0,-Ei.y,Ei.x,0,-Ji.y,Ji.x,0];return!Fo(e,Ts,Es,Rs,pa)||(e=[1,0,0,0,1,0,0,0,1],!Fo(e,Ts,Es,Rs,pa))?!1:(ma.crossVectors(Ti,Ei),e=[ma.x,ma.y,ma.z],Fo(e,Ts,Es,Rs,pa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ri=[new G,new G,new G,new G,new G,new G,new G,new G],Ln=new G,da=new Si,Ts=new G,Es=new G,Rs=new G,Ti=new G,Ei=new G,Ji=new G,wr=new G,pa=new G,ma=new G,Qi=new G;function Fo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Qi.fromArray(i,r);const o=s.x*Math.abs(Qi.x)+s.y*Math.abs(Qi.y)+s.z*Math.abs(Qi.z),c=t.dot(Qi),l=e.dot(Qi),u=n.dot(Qi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Qm=new Si,Tr=new G,Bo=new G;class cn{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Qm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Tr.subVectors(t,this.center);const e=Tr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Tr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Tr.copy(t.center).add(Bo)),this.expandByPoint(Tr.copy(t.center).sub(Bo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ai=new G,Ho=new G,ga=new G,Ri=new G,Go=new G,xa=new G,Vo=new G;class gr{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ho.copy(t).add(e).multiplyScalar(.5),ga.copy(e).sub(t).normalize(),Ri.copy(this.origin).sub(Ho);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ga),o=Ri.dot(this.direction),c=-Ri.dot(ga),l=Ri.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ho).addScaledVector(ga,d),f}intersectSphere(t,e){ai.subVectors(t.center,this.origin);const n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,n,s,r){Go.subVectors(e,t),xa.subVectors(n,t),Vo.crossVectors(Go,xa);let a=this.direction.dot(Vo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ri.subVectors(this.origin,t);const c=o*this.direction.dot(xa.crossVectors(Ri,xa));if(c<0)return null;const l=o*this.direction.dot(Go.cross(Ri));if(l<0||c+l>a)return null;const u=-o*Ri.dot(Vo);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m)}set(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Cs.setFromMatrixColumn(t,0).length(),r=1/Cs.setFromMatrixColumn(t,1).length(),a=1/Cs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,f=a*h,g=o*u,x=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=d-x*l,e[9]=-o*c,e[2]=x-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,g=l*u,x=l*h;e[0]=d+x*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=x+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,g=l*u,x=l*h;e[0]=d-x*o,e[4]=-a*h,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=x-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,f=a*h,g=o*u,x=o*h;e[0]=c*u,e[4]=g*l-f,e[8]=d*l+x,e[1]=c*h,e[5]=x*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*u,e[4]=x-d*h,e[8]=g*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*h+g,e[10]=d-x*h}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+x,e[5]=a*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=o*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(t0,t,e0)}lookAt(t,e,n){const s=this.elements;return pn.subVectors(t,e),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Ci.crossVectors(n,pn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Ci.crossVectors(n,pn)),Ci.normalize(),_a.crossVectors(pn,Ci),s[0]=Ci.x,s[4]=_a.x,s[8]=pn.x,s[1]=Ci.y,s[5]=_a.y,s[9]=pn.y,s[2]=Ci.z,s[6]=_a.z,s[10]=pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],y=n[7],v=n[11],w=n[15],T=s[0],L=s[4],B=s[8],E=s[12],A=s[1],O=s[5],j=s[9],W=s[13],$=s[2],b=s[6],S=s[10],I=s[14],_=s[3],N=s[7],z=s[11],D=s[15];return r[0]=a*T+o*A+c*$+l*_,r[4]=a*L+o*O+c*b+l*N,r[8]=a*B+o*j+c*S+l*z,r[12]=a*E+o*W+c*I+l*D,r[1]=u*T+h*A+d*$+f*_,r[5]=u*L+h*O+d*b+f*N,r[9]=u*B+h*j+d*S+f*z,r[13]=u*E+h*W+d*I+f*D,r[2]=g*T+x*A+m*$+p*_,r[6]=g*L+x*O+m*b+p*N,r[10]=g*B+x*j+m*S+p*z,r[14]=g*E+x*W+m*I+p*D,r[3]=M*T+y*A+v*$+w*_,r[7]=M*L+y*O+v*b+w*N,r[11]=M*B+y*j+v*S+w*z,r[15]=M*E+y*W+v*I+w*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+x*(+e*c*f-e*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+m*(+e*l*h-e*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-e*c*h+e*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=h*m*l-x*d*l+x*c*f-o*m*f-h*c*p+o*d*p,y=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,v=u*x*l-g*h*l+g*o*f-a*x*f-u*o*p+a*h*p,w=g*h*c-u*x*c-g*o*d+a*x*d+u*o*m-a*h*m,T=e*M+n*y+s*v+r*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/T;return t[0]=M*L,t[1]=(x*d*r-h*m*r-x*s*f+n*m*f+h*s*p-n*d*p)*L,t[2]=(o*m*r-x*c*r+x*s*l-n*m*l-o*s*p+n*c*p)*L,t[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*L,t[4]=y*L,t[5]=(u*m*r-g*d*r+g*s*f-e*m*f-u*s*p+e*d*p)*L,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*p-e*c*p)*L,t[7]=(a*d*r-u*c*r+u*s*l-e*d*l-a*s*f+e*c*f)*L,t[8]=v*L,t[9]=(g*h*r-u*x*r-g*n*f+e*x*f+u*n*p-e*h*p)*L,t[10]=(a*x*r-g*o*r+g*n*l-e*x*l-a*n*p+e*o*p)*L,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*f-e*o*f)*L,t[12]=w*L,t[13]=(u*x*s-g*h*s+g*n*d-e*x*d-u*n*m+e*h*m)*L,t[14]=(g*o*s-a*x*s-g*n*c+e*x*c+a*n*m-e*o*m)*L,t[15]=(a*h*s-u*o*s+u*n*c-e*h*c-a*n*d+e*o*d)*L,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,x=a*u,m=a*h,p=o*h,M=c*l,y=c*u,v=c*h,w=n.x,T=n.y,L=n.z;return s[0]=(1-(x+p))*w,s[1]=(f+v)*w,s[2]=(g-y)*w,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(d+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+y)*L,s[9]=(m-M)*L,s[10]=(1-(d+x))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Cs.set(s[0],s[1],s[2]).length();const a=Cs.set(s[4],s[5],s[6]).length(),o=Cs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],zn.copy(this);const l=1/r,u=1/a,h=1/o;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=h,zn.elements[9]*=h,zn.elements[10]*=h,e.setFromRotationMatrix(zn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=xi){const c=this.elements,l=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(o===xi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===mo)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=xi){const c=this.elements,l=1/(e-t),u=1/(n-s),h=1/(a-r),d=(e+t)*l,f=(n+s)*u;let g,x;if(o===xi)g=(a+r)*h,x=-2*h;else if(o===mo)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Cs=new G,zn=new Ut,t0=new G(0,0,0),e0=new G(1,1,1),Ci=new G,_a=new G,pn=new G,Yu=new Ut,Ku=new xe;class on{constructor(t=0,e=0,n=0,s=on.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-De(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(De(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ku.setFromEuler(this),this.setFromQuaternion(Ku,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class Ql{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let n0=0;const qu=new G,Ps=new xe,oi=new Ut,va=new G,Er=new G,i0=new G,s0=new xe,Zu=new G(1,0,0),$u=new G(0,1,0),Ju=new G(0,0,1),Qu={type:"added"},r0={type:"removed"},Is={type:"childadded",child:null},Wo={type:"childremoved",child:null};class Ie extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new G,e=new on,n=new xe,s=new G(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ut},normalMatrix:{value:new Zt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ql,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.premultiply(Ps),this}rotateX(t){return this.rotateOnAxis(Zu,t)}rotateY(t){return this.rotateOnAxis($u,t)}rotateZ(t){return this.rotateOnAxis(Ju,t)}translateOnAxis(t,e){return qu.copy(t).applyQuaternion(this.quaternion),this.position.add(qu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zu,t)}translateY(t){return this.translateOnAxis($u,t)}translateZ(t){return this.translateOnAxis(Ju,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?va.copy(t):va.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(Er,va,this.up):oi.lookAt(va,Er,this.up),this.quaternion.setFromRotationMatrix(oi),s&&(oi.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(oi),this.quaternion.premultiply(Ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qu),Is.child=t,this.dispatchEvent(Is),Is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(r0),Wo.child=t,this.dispatchEvent(Wo),Wo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qu),Is.child=t,this.dispatchEvent(Is),Is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,t,i0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,s0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ie.DEFAULT_UP=new G(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Dn=new G,ci=new G,Xo=new G,li=new G,Ls=new G,zs=new G,th=new G,jo=new G,Yo=new G,Ko=new G,qo=new re,Zo=new re,$o=new re;class Bn{constructor(t=new G,e=new G,n=new G){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Dn.subVectors(t,e),s.cross(Dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Dn.subVectors(s,e),ci.subVectors(n,e),Xo.subVectors(t,e);const a=Dn.dot(Dn),o=Dn.dot(ci),c=Dn.dot(Xo),l=ci.dot(ci),u=ci.dot(Xo),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,li)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,li.x),c.addScaledVector(a,li.y),c.addScaledVector(o,li.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return qo.setScalar(0),Zo.setScalar(0),$o.setScalar(0),qo.fromBufferAttribute(t,e),Zo.fromBufferAttribute(t,n),$o.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(qo,r.x),a.addScaledVector(Zo,r.y),a.addScaledVector($o,r.z),a}static isFrontFacing(t,e,n,s){return Dn.subVectors(n,e),ci.subVectors(t,e),Dn.cross(ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Dn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Dn.cross(ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Bn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ls.subVectors(s,n),zs.subVectors(r,n),jo.subVectors(t,n);const c=Ls.dot(jo),l=zs.dot(jo);if(c<=0&&l<=0)return e.copy(n);Yo.subVectors(t,s);const u=Ls.dot(Yo),h=zs.dot(Yo);if(u>=0&&h<=u)return e.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Ls,a);Ko.subVectors(t,r);const f=Ls.dot(Ko),g=zs.dot(Ko);if(g>=0&&f<=g)return e.copy(r);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(zs,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return th.subVectors(r,s),o=(h-u)/(h-u+(f-g)),e.copy(s).addScaledVector(th,o);const p=1/(m+x+d);return a=x*p,o=d*p,e.copy(n).addScaledVector(Ls,a).addScaledVector(zs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Vd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},ya={h:0,s:0,l:0};function Jo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Nt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=Jl(t,1),e=De(e,0,1),n=De(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Jo(a,r,t+1/3),this.g=Jo(a,r,t),this.b=Jo(a,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Oe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=Vd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}copyLinearToSRGB(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return ae.fromWorkingColorSpace($e.copy(this),t),Math.round(De($e.r*255,0,255))*65536+Math.round(De($e.g*255,0,255))*256+Math.round(De($e.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace($e.copy(this),e);const n=$e.r,s=$e.g,r=$e.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=Oe){ae.fromWorkingColorSpace($e.copy(this),t);const e=$e.r,n=$e.g,s=$e.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Pi),this.setHSL(Pi.h+t,Pi.s+e,Pi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Pi),t.getHSL(ya);const n=Xr(Pi.h,ya.h,e),s=Xr(Pi.s,ya.s,e),r=Xr(Pi.l,ya.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $e=new Nt;Nt.NAMES=Vd;let a0=0;class Vn extends Zi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=Gn(),this.name="",this.blending=Qs,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bc,this.blendDst=Hc,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bc&&(n.blendSrc=this.blendSrc),this.blendDst!==Hc&&(n.blendDst=this.blendDst),this.blendEquation!==fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Uu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(n.stencilFail=this.stencilFail),this.stencilZFail!==As&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ge extends Vn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ma=o0();function o0(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;!(l&8388608);)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function c0(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=De(i,-65504,65504),Ma.floatView[0]=i;const t=Ma.uint32View[0],e=t>>23&511;return Ma.baseTable[e]+((t&8388607)>>Ma.shiftTable[e])}const l0={toHalfFloat:c0},Ne=new G,ba=new Ct;class Me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Al,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ba.fromBufferAttribute(this,e),ba.applyMatrix3(t),this.setXY(e,ba.x,ba.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Fn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Al&&(t.usage=this.usage),t}}class Wd extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Xd extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Wt extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let u0=0;const bn=new Ut,Qo=new Ie,Ds=new G,mn=new Si,Rr=new Si,Ye=new G;class he extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bd(t)?Xd:Wd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return Qo.lookAt(t),Qo.updateMatrix(),this.applyMatrix4(Qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ds).negate(),this.translate(Ds.x,Ds.y,Ds.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Wt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){const n=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(mn.min,Rr.min),mn.expandByPoint(Ye),Ye.addVectors(mn.max,Rr.max),mn.expandByPoint(Ye)):(mn.expandByPoint(Rr.min),mn.expandByPoint(Rr.max))}mn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ye));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ye.fromBufferAttribute(o,l),c&&(Ds.fromBufferAttribute(t,l),Ye.add(Ds)),s=Math.max(s,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let B=0;B<n.count;B++)o[B]=new G,c[B]=new G;const l=new G,u=new G,h=new G,d=new Ct,f=new Ct,g=new Ct,x=new G,m=new G;function p(B,E,A){l.fromBufferAttribute(n,B),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,A),d.fromBufferAttribute(r,B),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,A),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const O=1/(f.x*g.y-g.x*f.y);isFinite(O)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(O),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(O),o[B].add(x),o[E].add(x),o[A].add(x),c[B].add(m),c[E].add(m),c[A].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let B=0,E=M.length;B<E;++B){const A=M[B],O=A.start,j=A.count;for(let W=O,$=O+j;W<$;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}const y=new G,v=new G,w=new G,T=new G;function L(B){w.fromBufferAttribute(s,B),T.copy(w);const E=o[B];y.copy(E),y.sub(w.multiplyScalar(w.dot(E))).normalize(),v.crossVectors(T,E);const O=v.dot(c[B])<0?-1:1;a.setXYZW(B,y.x,y.y,y.z,O)}for(let B=0,E=M.length;B<E;++B){const A=M[B],O=A.start,j=A.count;for(let W=O,$=O+j;W<$;W+=3)L(t.getX(W+0)),L(t.getX(W+1)),L(t.getX(W+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new G,r=new G,a=new G,o=new G,c=new G,l=new G,u=new G,h=new G;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new Me(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eh=new Ut,ts=new gr,Sa=new cn,nh=new G,Aa=new G,wa=new G,Ta=new G,tc=new G,Ea=new G,ih=new G,Ra=new G;class ee extends Ie{constructor(t=new he,e=new Ge){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ea.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(tc.fromBufferAttribute(h,t),a?Ea.addScaledVector(tc,u):Ea.addScaledVector(tc.sub(e),u))}e.add(Ea)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(Sa.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Sa,nh)===null||ts.origin.distanceToSquared(nh)>(t.far-t.near)**2))&&(eh.copy(r).invert(),ts.copy(t.ray).applyMatrix4(eh),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,w=y;v<w;v+=3){const T=o.getX(v),L=o.getX(v+1),B=o.getX(v+2);s=Ca(this,p,t,n,l,u,h,T,L,B),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const M=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);s=Ca(this,a,t,n,l,u,h,M,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,w=y;v<w;v+=3){const T=v,L=v+1,B=v+2;s=Ca(this,p,t,n,l,u,h,T,L,B),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const M=m,y=m+1,v=m+2;s=Ca(this,a,t,n,l,u,h,M,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function h0(i,t,e,n,s,r,a,o){let c;if(t.side===rn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Mi,o),c===null)return null;Ra.copy(o),Ra.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ra);return l<e.near||l>e.far?null:{distance:l,point:Ra.clone(),object:i}}function Ca(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Aa),i.getVertexPosition(c,wa),i.getVertexPosition(l,Ta);const u=h0(i,t,e,n,Aa,wa,Ta,ih);if(u){const h=new G;Bn.getBarycoord(ih,Aa,wa,Ta,h),s&&(u.uv=Bn.getInterpolatedAttribute(s,o,c,l,h,new Ct)),r&&(u.uv1=Bn.getInterpolatedAttribute(r,o,c,l,h,new Ct)),a&&(u.normal=Bn.getInterpolatedAttribute(a,o,c,l,h,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new G,materialIndex:0};Bn.getNormal(Aa,wa,Ta,d.normal),u.face=d,u.barycoord=h}return u}class Wn extends he{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(h,2));function g(x,m,p,M,y,v,w,T,L,B,E){const A=v/L,O=w/B,j=v/2,W=w/2,$=T/2,b=L+1,S=B+1;let I=0,_=0;const N=new G;for(let z=0;z<S;z++){const D=z*O-W;for(let U=0;U<b;U++){const X=U*A-j;N[x]=X*M,N[m]=D*y,N[p]=$,l.push(N.x,N.y,N.z),N[x]=0,N[m]=0,N[p]=T>0?1:-1,u.push(N.x,N.y,N.z),h.push(U/L),h.push(1-z/B),I+=1}}for(let z=0;z<B;z++)for(let D=0;D<L;D++){const U=d+D+b*z,X=d+D+b*(z+1),H=d+(D+1)+b*(z+1),k=d+(D+1)+b*z;c.push(U,X,k),c.push(X,H,k),_+=6}o.addGroup(f,_,E),f+=_,d+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function hr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function en(i){const t={};for(let e=0;e<i.length;e++){const n=hr(i[e]);for(const s in n)t[s]=n[s]}return t}function f0(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function jd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const d0={clone:hr,merge:en};var p0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends Vn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p0,this.fragmentShader=m0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hr(t.uniforms),this.uniformsGroups=f0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Yd extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=xi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new G,sh=new Ct,rh=new Ct;class nn extends Yd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ur*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z)}getViewSize(t,e){return this.getViewBounds(t,sh,rh),e.subVectors(rh,sh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Wr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ks=-90,Ns=1;class g0 extends Ie{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(ks,Ns,t,e);s.layers=this.layers,this.add(s);const r=new nn(ks,Ns,t,e);r.layers=this.layers,this.add(r);const a=new nn(ks,Ns,t,e);a.layers=this.layers,this.add(a);const o=new nn(ks,Ns,t,e);o.layers=this.layers,this.add(o);const c=new nn(ks,Ns,t,e);c.layers=this.layers,this.add(c);const l=new nn(ks,Ns,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===xi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kd extends Ve{constructor(t,e,n,s,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:ar,super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class x0 extends bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Kd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:He}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Wn(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:hr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:Wi});r.uniforms.tEquirect.value=e;const a=new ee(s,r),o=e.minFilter;return e.minFilter===xn&&(e.minFilter=He),new g0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const ec=new G,_0=new G,v0=new Zt;class Fi{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ec.subVectors(n,e).cross(_0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ec),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||v0.getNormalMatrix(t),s=this.coplanarPoint(ec).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const es=new cn,Pa=new G;class xr{constructor(t=new Fi,e=new Fi,n=new Fi,s=new Fi,r=new Fi,a=new Fi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xi){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],M=s[13],y=s[14],v=s[15];if(n[0].setComponents(c-r,d-l,m-f,v-p).normalize(),n[1].setComponents(c+r,d+l,m+f,v+p).normalize(),n[2].setComponents(c+a,d+u,m+g,v+M).normalize(),n[3].setComponents(c-a,d-u,m-g,v-M).normalize(),n[4].setComponents(c-o,d-h,m-x,v-y).normalize(),e===xi)n[5].setComponents(c+o,d+h,m+x,v+y).normalize();else if(e===mo)n[5].setComponents(o,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){return es.center.set(0,0,0),es.radius=.7071067811865476,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Pa.x=s.normal.x>0?t.max.x:t.min.x,Pa.y=s.normal.y>0?t.max.y:t.min.y,Pa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Pa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function y0(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class vn extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=t/o,d=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const M=p*d-a;for(let y=0;y<l;y++){const v=y*h-r;g.push(v,-M,0),x.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const y=M+l*p,v=M+l*(p+1),w=M+1+l*(p+1),T=M+1+l*p;f.push(y,v,T),f.push(v,w,T)}this.setIndex(f),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vn(t.width,t.height,t.widthSegments,t.heightSegments)}}var M0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,b0=`#ifdef USE_ALPHAHASH
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
#endif`,S0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,A0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,w0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E0=`#ifdef USE_AOMAP
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
#endif`,R0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,C0=`#ifdef USE_BATCHING
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
#endif`,P0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,I0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,z0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,D0=`#ifdef USE_IRIDESCENCE
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
#endif`,k0=`#ifdef USE_BUMPMAP
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
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,H0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,V0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,W0=`#define PI 3.141592653589793
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
} // validated`,X0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,j0=`vec3 transformedNormal = objectNormal;
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
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,K0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Z0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$0="gl_FragColor = linearToOutputTexel( gl_FragColor );",J0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Q0=`#ifdef USE_ENVMAP
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
#endif`,tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,eg=`#ifdef USE_ENVMAP
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
#endif`,ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
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
#endif`,sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cg=`#ifdef USE_GRADIENTMAP
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
}`,lg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ug=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fg=`uniform bool receiveShadow;
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
#endif`,dg=`#ifdef USE_ENVMAP
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
#endif`,pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_g=`PhysicalMaterial material;
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
#endif`,vg=`struct PhysicalMaterial {
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
}`,yg=`
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
#endif`,Mg=`#if defined( RE_IndirectDiffuse )
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
#endif`,bg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ag=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pg=`#if defined( USE_POINTS_UV )
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
#endif`,Ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ng=`#ifdef USE_MORPHTARGETS
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
#endif`,Ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Og=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vg=`#ifdef USE_NORMALMAP
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
#endif`,Wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$g=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ex=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ix=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rx=`float getShadowMask() {
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
}`,ax=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ox=`#ifdef USE_SKINNING
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
#endif`,cx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lx=`#ifdef USE_SKINNING
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
#endif`,ux=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,px=`#ifdef USE_TRANSMISSION
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
#endif`,mx=`#ifdef USE_TRANSMISSION
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
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mx=`uniform sampler2D t2D;
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
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`#include <common>
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
}`,Ex=`#if DEPTH_PACKING == 3200
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
}`,Rx=`#define DISTANCE
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
}`,Cx=`#define DISTANCE
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
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ix=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lx=`uniform float scale;
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
}`,zx=`uniform vec3 diffuse;
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
}`,Dx=`#include <common>
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
}`,kx=`uniform vec3 diffuse;
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
}`,Nx=`#define LAMBERT
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
}`,Ux=`#define LAMBERT
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
}`,Ox=`#define MATCAP
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
}`,Fx=`#define MATCAP
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
}`,Bx=`#define NORMAL
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
}`,Hx=`#define NORMAL
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
}`,Gx=`#define PHONG
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
}`,Vx=`#define PHONG
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
}`,Wx=`#define STANDARD
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
}`,Xx=`#define STANDARD
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
}`,jx=`#define TOON
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
}`,Yx=`#define TOON
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
}`,Kx=`uniform float size;
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
}`,qx=`uniform vec3 diffuse;
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
}`,Zx=`#include <common>
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
}`,$x=`uniform vec3 color;
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
}`,Jx=`uniform float rotation;
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
}`,Qx=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:M0,alphahash_pars_fragment:b0,alphamap_fragment:S0,alphamap_pars_fragment:A0,alphatest_fragment:w0,alphatest_pars_fragment:T0,aomap_fragment:E0,aomap_pars_fragment:R0,batching_pars_vertex:C0,batching_vertex:P0,begin_vertex:I0,beginnormal_vertex:L0,bsdfs:z0,iridescence_fragment:D0,bumpmap_pars_fragment:k0,clipping_planes_fragment:N0,clipping_planes_pars_fragment:U0,clipping_planes_pars_vertex:O0,clipping_planes_vertex:F0,color_fragment:B0,color_pars_fragment:H0,color_pars_vertex:G0,color_vertex:V0,common:W0,cube_uv_reflection_fragment:X0,defaultnormal_vertex:j0,displacementmap_pars_vertex:Y0,displacementmap_vertex:K0,emissivemap_fragment:q0,emissivemap_pars_fragment:Z0,colorspace_fragment:$0,colorspace_pars_fragment:J0,envmap_fragment:Q0,envmap_common_pars_fragment:tg,envmap_pars_fragment:eg,envmap_pars_vertex:ng,envmap_physical_pars_fragment:dg,envmap_vertex:ig,fog_vertex:sg,fog_pars_vertex:rg,fog_fragment:ag,fog_pars_fragment:og,gradientmap_pars_fragment:cg,lightmap_pars_fragment:lg,lights_lambert_fragment:ug,lights_lambert_pars_fragment:hg,lights_pars_begin:fg,lights_toon_fragment:pg,lights_toon_pars_fragment:mg,lights_phong_fragment:gg,lights_phong_pars_fragment:xg,lights_physical_fragment:_g,lights_physical_pars_fragment:vg,lights_fragment_begin:yg,lights_fragment_maps:Mg,lights_fragment_end:bg,logdepthbuf_fragment:Sg,logdepthbuf_pars_fragment:Ag,logdepthbuf_pars_vertex:wg,logdepthbuf_vertex:Tg,map_fragment:Eg,map_pars_fragment:Rg,map_particle_fragment:Cg,map_particle_pars_fragment:Pg,metalnessmap_fragment:Ig,metalnessmap_pars_fragment:Lg,morphinstance_vertex:zg,morphcolor_vertex:Dg,morphnormal_vertex:kg,morphtarget_pars_vertex:Ng,morphtarget_vertex:Ug,normal_fragment_begin:Og,normal_fragment_maps:Fg,normal_pars_fragment:Bg,normal_pars_vertex:Hg,normal_vertex:Gg,normalmap_pars_fragment:Vg,clearcoat_normal_fragment_begin:Wg,clearcoat_normal_fragment_maps:Xg,clearcoat_pars_fragment:jg,iridescence_pars_fragment:Yg,opaque_fragment:Kg,packing:qg,premultiplied_alpha_fragment:Zg,project_vertex:$g,dithering_fragment:Jg,dithering_pars_fragment:Qg,roughnessmap_fragment:tx,roughnessmap_pars_fragment:ex,shadowmap_pars_fragment:nx,shadowmap_pars_vertex:ix,shadowmap_vertex:sx,shadowmask_pars_fragment:rx,skinbase_vertex:ax,skinning_pars_vertex:ox,skinning_vertex:cx,skinnormal_vertex:lx,specularmap_fragment:ux,specularmap_pars_fragment:hx,tonemapping_fragment:fx,tonemapping_pars_fragment:dx,transmission_fragment:px,transmission_pars_fragment:mx,uv_pars_fragment:gx,uv_pars_vertex:xx,uv_vertex:_x,worldpos_vertex:vx,background_vert:yx,background_frag:Mx,backgroundCube_vert:bx,backgroundCube_frag:Sx,cube_vert:Ax,cube_frag:wx,depth_vert:Tx,depth_frag:Ex,distanceRGBA_vert:Rx,distanceRGBA_frag:Cx,equirect_vert:Px,equirect_frag:Ix,linedashed_vert:Lx,linedashed_frag:zx,meshbasic_vert:Dx,meshbasic_frag:kx,meshlambert_vert:Nx,meshlambert_frag:Ux,meshmatcap_vert:Ox,meshmatcap_frag:Fx,meshnormal_vert:Bx,meshnormal_frag:Hx,meshphong_vert:Gx,meshphong_frag:Vx,meshphysical_vert:Wx,meshphysical_frag:Xx,meshtoon_vert:jx,meshtoon_frag:Yx,points_vert:Kx,points_frag:qx,shadow_vert:Zx,shadow_frag:$x,sprite_vert:Jx,sprite_frag:Qx},Lt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},$n={basic:{uniforms:en([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:en([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:en([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:en([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:en([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:en([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:en([Lt.points,Lt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:en([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:en([Lt.common,Lt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:en([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:en([Lt.sprite,Lt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:en([Lt.common,Lt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:en([Lt.lights,Lt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};$n.physical={uniforms:en([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Ia={r:0,b:0,g:0},ns=new on,t_=new Ut;function e_(i,t,e,n,s,r,a){const o=new Nt(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?e:t).get(y)),y}function x(M){let y=!1;const v=g(M);v===null?p(o,c):v&&v.isColor&&(p(v,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,y){const v=g(y);v&&(v.isCubeTexture||v.mapping===bo)?(u===void 0&&(u=new ee(new Wn(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:hr($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ns.copy(y.backgroundRotation),ns.x*=-1,ns.y*=-1,ns.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(t_.makeRotationFromEuler(ns)),u.material.toneMapped=ae.getTransfer(v.colorSpace)!==ve,(h!==v||d!==v.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ee(new vn(2,2),new Xn({name:"BackgroundMaterial",uniforms:hr($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ae.getTransfer(v.colorSpace)!==ve,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,y){M.getRGB(Ia,jd(i)),n.buffers.color.setClear(Ia.r,Ia.g,Ia.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),c=y,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(o,c)},render:x,addToRenderList:m}}function n_(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(A,O,j,W,$){let b=!1;const S=h(W,j,O);r!==S&&(r=S,l(r.object)),b=f(A,W,j,$),b&&g(A,W,j,$),$!==null&&t.update($,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,v(A,O,j,W),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function u(A){return i.deleteVertexArray(A)}function h(A,O,j){const W=j.wireframe===!0;let $=n[A.id];$===void 0&&($={},n[A.id]=$);let b=$[O.id];b===void 0&&(b={},$[O.id]=b);let S=b[W];return S===void 0&&(S=d(c()),b[W]=S),S}function d(A){const O=[],j=[],W=[];for(let $=0;$<e;$++)O[$]=0,j[$]=0,W[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:j,attributeDivisors:W,object:A,attributes:{},index:null}}function f(A,O,j,W){const $=r.attributes,b=O.attributes;let S=0;const I=j.getAttributes();for(const _ in I)if(I[_].location>=0){const z=$[_];let D=b[_];if(D===void 0&&(_==="instanceMatrix"&&A.instanceMatrix&&(D=A.instanceMatrix),_==="instanceColor"&&A.instanceColor&&(D=A.instanceColor)),z===void 0||z.attribute!==D||D&&z.data!==D.data)return!0;S++}return r.attributesNum!==S||r.index!==W}function g(A,O,j,W){const $={},b=O.attributes;let S=0;const I=j.getAttributes();for(const _ in I)if(I[_].location>=0){let z=b[_];z===void 0&&(_==="instanceMatrix"&&A.instanceMatrix&&(z=A.instanceMatrix),_==="instanceColor"&&A.instanceColor&&(z=A.instanceColor));const D={};D.attribute=z,z&&z.data&&(D.data=z.data),$[_]=D,S++}r.attributes=$,r.attributesNum=S,r.index=W}function x(){const A=r.newAttributes;for(let O=0,j=A.length;O<j;O++)A[O]=0}function m(A){p(A,0)}function p(A,O){const j=r.newAttributes,W=r.enabledAttributes,$=r.attributeDivisors;j[A]=1,W[A]===0&&(i.enableVertexAttribArray(A),W[A]=1),$[A]!==O&&(i.vertexAttribDivisor(A,O),$[A]=O)}function M(){const A=r.newAttributes,O=r.enabledAttributes;for(let j=0,W=O.length;j<W;j++)O[j]!==A[j]&&(i.disableVertexAttribArray(j),O[j]=0)}function y(A,O,j,W,$,b,S){S===!0?i.vertexAttribIPointer(A,O,j,$,b):i.vertexAttribPointer(A,O,j,W,$,b)}function v(A,O,j,W){x();const $=W.attributes,b=j.getAttributes(),S=O.defaultAttributeValues;for(const I in b){const _=b[I];if(_.location>=0){let N=$[I];if(N===void 0&&(I==="instanceMatrix"&&A.instanceMatrix&&(N=A.instanceMatrix),I==="instanceColor"&&A.instanceColor&&(N=A.instanceColor)),N!==void 0){const z=N.normalized,D=N.itemSize,U=t.get(N);if(U===void 0)continue;const X=U.buffer,H=U.type,k=U.bytesPerElement,it=H===i.INT||H===i.UNSIGNED_INT||N.gpuType===Gl;if(N.isInterleavedBufferAttribute){const st=N.data,ot=st.stride,_t=N.offset;if(st.isInstancedInterleavedBuffer){for(let gt=0;gt<_.locationSize;gt++)p(_.location+gt,st.meshPerAttribute);A.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let gt=0;gt<_.locationSize;gt++)m(_.location+gt);i.bindBuffer(i.ARRAY_BUFFER,X);for(let gt=0;gt<_.locationSize;gt++)y(_.location+gt,D/_.locationSize,H,z,ot*k,(_t+D/_.locationSize*gt)*k,it)}else{if(N.isInstancedBufferAttribute){for(let st=0;st<_.locationSize;st++)p(_.location+st,N.meshPerAttribute);A.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let st=0;st<_.locationSize;st++)m(_.location+st);i.bindBuffer(i.ARRAY_BUFFER,X);for(let st=0;st<_.locationSize;st++)y(_.location+st,D/_.locationSize,H,z,D*k,D/_.locationSize*st*k,it)}}else if(S!==void 0){const z=S[I];if(z!==void 0)switch(z.length){case 2:i.vertexAttrib2fv(_.location,z);break;case 3:i.vertexAttrib3fv(_.location,z);break;case 4:i.vertexAttrib4fv(_.location,z);break;default:i.vertexAttrib1fv(_.location,z)}}}}M()}function w(){B();for(const A in n){const O=n[A];for(const j in O){const W=O[j];for(const $ in W)u(W[$].object),delete W[$];delete O[j]}delete n[A]}}function T(A){if(n[A.id]===void 0)return;const O=n[A.id];for(const j in O){const W=O[j];for(const $ in W)u(W[$].object),delete W[$];delete O[j]}delete n[A.id]}function L(A){for(const O in n){const j=n[O];if(j[A.id]===void 0)continue;const W=j[A.id];for(const $ in W)u(W[$].object),delete W[$];delete j[A.id]}}function B(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:B,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function i_(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];e.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function s_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Ke&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const B=L===mr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==Pn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==En&&!B)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:w,maxSamples:T}}function r_(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Fi,o=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const M=r?0:n,y=M*4;let v=p.clippingState||null;c.value=v,v=u(g,d,y,f);for(let w=0;w!==y;++w)v[w]=e[w];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=f;y!==x;++y,v+=4)a.copy(h[y]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function a_(i){let t=new WeakMap;function e(a,o){return o===qc?a.mapping=ar:o===Zc&&(a.mapping=or),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===qc||o===Zc)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new x0(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class wo extends Yd{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ys=4,ah=[.125,.215,.35,.446,.526,.582],ds=20,nc=new wo,oh=new Nt;let ic=null,sc=0,rc=0,ac=!1;const hs=(1+Math.sqrt(5))/2,Us=1/hs,ch=[new G(-hs,Us,0),new G(hs,Us,0),new G(-Us,0,hs),new G(Us,0,hs),new G(0,hs,-Us),new G(0,hs,Us),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)];class lh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ic=this._renderer.getRenderTarget(),sc=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ic,sc,rc),this._renderer.xr.enabled=ac,t.scissorTest=!1,La(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ar||t.mapping===or?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ic=this._renderer.getRenderTarget(),sc=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:He,minFilter:He,generateMipmaps:!1,type:mr,format:Ke,colorSpace:an,depthBuffer:!1},s=uh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o_(r)),this._blurMaterial=c_(r,t,e)}return s}_compileMaterial(t){const e=new ee(this._lodPlanes[0],t);this._renderer.compile(e,nc)}_sceneToCubeUV(t,e,n,s){const o=new nn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(oh),u.toneMapping=Xi,u.autoClear=!1;const f=new Ge({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),g=new ee(new Wn,f);let x=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(oh),x=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):M===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const y=this._cubeSize;La(s,M*y,p>2?y:0,y,y),u.setRenderTarget(s),x&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ar||t.mapping===or;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ee(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;La(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,nc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ch[(s-r-1)%ch.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ee(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ds-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):ds;m>ds&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ds}`);const p=[];let M=0;for(let L=0;L<ds;++L){const B=L/x,E=Math.exp(-B*B/2);p.push(E),L===0?M+=E:L<m&&(M+=2*E)}for(let L=0;L<p.length;L++)p[L]=p[L]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const v=this._sizeLods[s],w=3*v*(s>y-Ys?s-y+Ys:0),T=4*(this._cubeSize-v);La(e,w,T,3*v,2*v),c.setRenderTarget(e),c.render(h,nc)}}function o_(i){const t=[],e=[],n=[];let s=i;const r=i-Ys+1+ah.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Ys?c=ah[a-i+Ys-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*f),y=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let T=0;T<f;T++){const L=T%3*2/3-1,B=T>2?0:-1,E=[L,B,0,L+2/3,B,0,L+2/3,B+1,0,L,B,0,L+2/3,B+1,0,L,B+1,0];M.set(E,x*g*T),y.set(d,m*g*T);const A=[T,T,T,T,T,T];v.set(A,p*g*T)}const w=new he;w.setAttribute("position",new Me(M,x)),w.setAttribute("uv",new Me(y,m)),w.setAttribute("faceIndex",new Me(v,p)),t.push(w),s>Ys&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function uh(i,t,e){const n=new bi(i,t,e);return n.texture.mapping=bo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function La(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function c_(i,t,e){const n=new Float32Array(ds),s=new G(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:tu(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function hh(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tu(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function fh(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function tu(){return`

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
	`}function l_(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===qc||c===Zc,u=c===ar||c===or;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new lh(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new lh(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function u_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Or("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function h_(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],i.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let x=0;if(f!==null){const M=f.array;x=f.version;for(let y=0,v=M.length;y<v;y+=3){const w=M[y+0],T=M[y+1],L=M[y+2];d.push(w,T,T,L,L,w)}}else if(g!==void 0){const M=g.array;x=g.version;for(let y=0,v=M.length/3-1;y<v;y+=3){const w=y+0,T=y+1,L=y+2;d.push(w,T,T,L,L,w)}}else return;const m=new(Bd(d)?Xd:Wd)(d,1);m.version=x;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function f_(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function h(d,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function d_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function p_(i,t,e){const n=new WeakMap,s=new re;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let A=function(){B.dispose(),n.delete(o),o.removeEventListener("dispose",A)};var f=A;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let w=o.attributes.position.count*v,T=1;w>t.maxTextureSize&&(T=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const L=new Float32Array(w*T*4*h),B=new Gd(L,w,T,h);B.type=En,B.needsUpdate=!0;const E=v*4;for(let O=0;O<h;O++){const j=p[O],W=M[O],$=y[O],b=w*T*4*O;for(let S=0;S<j.count;S++){const I=S*E;g===!0&&(s.fromBufferAttribute(j,S),L[b+I+0]=s.x,L[b+I+1]=s.y,L[b+I+2]=s.z,L[b+I+3]=0),x===!0&&(s.fromBufferAttribute(W,S),L[b+I+4]=s.x,L[b+I+5]=s.y,L[b+I+6]=s.z,L[b+I+7]=0),m===!0&&(s.fromBufferAttribute($,S),L[b+I+8]=s.x,L[b+I+9]=s.y,L[b+I+10]=s.z,L[b+I+11]=$.itemSize===4?s.w:1)}}d={count:h,texture:B,size:new Ct(w,T)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function m_(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Zd extends Ve{constructor(t,e,n,s,r,a,o,c,l,u=tr){if(u!==tr&&u!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===tr&&(n=xs),n===void 0&&u===lr&&(n=cr),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:qe,this.minFilter=c!==void 0?c:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const $d=new Ve,dh=new Zd(1,1),Jd=new Gd,Qd=new Jm,tp=new Kd,ph=[],mh=[],gh=new Float32Array(16),xh=new Float32Array(9),_h=new Float32Array(4);function _r(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ph[s];if(r===void 0&&(r=new Float32Array(s),ph[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function We(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function To(i,t){let e=mh[t];e===void 0&&(e=new Int32Array(t),mh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function g_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function x_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;i.uniform2fv(this.addr,t),Xe(e,t)}}function __(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;i.uniform3fv(this.addr,t),Xe(e,t)}}function v_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;i.uniform4fv(this.addr,t),Xe(e,t)}}function y_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;_h.set(n),i.uniformMatrix2fv(this.addr,!1,_h),Xe(e,n)}}function M_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;xh.set(n),i.uniformMatrix3fv(this.addr,!1,xh),Xe(e,n)}}function b_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;gh.set(n),i.uniformMatrix4fv(this.addr,!1,gh),Xe(e,n)}}function S_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function A_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;i.uniform2iv(this.addr,t),Xe(e,t)}}function w_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;i.uniform3iv(this.addr,t),Xe(e,t)}}function T_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;i.uniform4iv(this.addr,t),Xe(e,t)}}function E_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function R_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;i.uniform2uiv(this.addr,t),Xe(e,t)}}function C_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;i.uniform3uiv(this.addr,t),Xe(e,t)}}function P_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;i.uniform4uiv(this.addr,t),Xe(e,t)}}function I_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dh.compareFunction=Fd,r=dh):r=$d,e.setTexture2D(t||r,s)}function L_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Qd,s)}function z_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||tp,s)}function D_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Jd,s)}function k_(i){switch(i){case 5126:return g_;case 35664:return x_;case 35665:return __;case 35666:return v_;case 35674:return y_;case 35675:return M_;case 35676:return b_;case 5124:case 35670:return S_;case 35667:case 35671:return A_;case 35668:case 35672:return w_;case 35669:case 35673:return T_;case 5125:return E_;case 36294:return R_;case 36295:return C_;case 36296:return P_;case 35678:case 36198:case 36298:case 36306:case 35682:return I_;case 35679:case 36299:case 36307:return L_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return D_}}function N_(i,t){i.uniform1fv(this.addr,t)}function U_(i,t){const e=_r(t,this.size,2);i.uniform2fv(this.addr,e)}function O_(i,t){const e=_r(t,this.size,3);i.uniform3fv(this.addr,e)}function F_(i,t){const e=_r(t,this.size,4);i.uniform4fv(this.addr,e)}function B_(i,t){const e=_r(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function H_(i,t){const e=_r(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function G_(i,t){const e=_r(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function V_(i,t){i.uniform1iv(this.addr,t)}function W_(i,t){i.uniform2iv(this.addr,t)}function X_(i,t){i.uniform3iv(this.addr,t)}function j_(i,t){i.uniform4iv(this.addr,t)}function Y_(i,t){i.uniform1uiv(this.addr,t)}function K_(i,t){i.uniform2uiv(this.addr,t)}function q_(i,t){i.uniform3uiv(this.addr,t)}function Z_(i,t){i.uniform4uiv(this.addr,t)}function $_(i,t,e){const n=this.cache,s=t.length,r=To(e,s);We(n,r)||(i.uniform1iv(this.addr,r),Xe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||$d,r[a])}function J_(i,t,e){const n=this.cache,s=t.length,r=To(e,s);We(n,r)||(i.uniform1iv(this.addr,r),Xe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Qd,r[a])}function Q_(i,t,e){const n=this.cache,s=t.length,r=To(e,s);We(n,r)||(i.uniform1iv(this.addr,r),Xe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||tp,r[a])}function tv(i,t,e){const n=this.cache,s=t.length,r=To(e,s);We(n,r)||(i.uniform1iv(this.addr,r),Xe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Jd,r[a])}function ev(i){switch(i){case 5126:return N_;case 35664:return U_;case 35665:return O_;case 35666:return F_;case 35674:return B_;case 35675:return H_;case 35676:return G_;case 5124:case 35670:return V_;case 35667:case 35671:return W_;case 35668:case 35672:return X_;case 35669:case 35673:return j_;case 5125:return Y_;case 36294:return K_;case 36295:return q_;case 36296:return Z_;case 35678:case 36198:case 36298:case 36306:case 35682:return $_;case 35679:case 36299:case 36307:return J_;case 35680:case 36300:case 36308:case 36293:return Q_;case 36289:case 36303:case 36311:case 36292:return tv}}class nv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=k_(e.type)}}class iv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ev(e.type)}}class sv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const oc=/(\w+)(\])?(\[|\.)?/g;function vh(i,t){i.seq.push(t),i.map[t.id]=t}function rv(i,t,e){const n=i.name,s=n.length;for(oc.lastIndex=0;;){const r=oc.exec(n),a=oc.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){vh(e,l===void 0?new nv(o,i,t):new iv(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new sv(o),vh(e,h)),e=h}}}class uo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);rv(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function yh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const av=37297;let ov=0;function cv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Mh=new Zt;function lv(i){ae._getMatrix(Mh,ae.workingColorSpace,i);const t=`mat3( ${Mh.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case Ao:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function bh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+cv(i.getShaderSource(t),a)}else return s}function uv(i,t){const e=lv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function hv(i,t){let e;switch(t){case cm:e="Linear";break;case lm:e="Reinhard";break;case um:e="Cineon";break;case Td:e="ACESFilmic";break;case fm:e="AgX";break;case dm:e="Neutral";break;case hm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const za=new G;function fv(){ae.getLuminanceCoefficients(za);const i=za.x.toFixed(4),t=za.y.toFixed(4),e=za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fr).join(`
`)}function pv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function mv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Fr(i){return i!==""}function Sh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ah(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gv=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(i){return i.replace(gv,_v)}const xv=new Map;function _v(i,t){let e=Jt[t];if(e===void 0){const n=xv.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wl(e)}const vv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(i){return i.replace(vv,yv)}function yv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Th(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Mv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===wd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===pi&&(t="SHADOWMAP_TYPE_VSM"),t}function bv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ar:case or:t="ENVMAP_TYPE_CUBE";break;case bo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Sv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case or:t="ENVMAP_MODE_REFRACTION";break}return t}function Av(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hl:t="ENVMAP_BLENDING_MULTIPLY";break;case am:t="ENVMAP_BLENDING_MIX";break;case om:t="ENVMAP_BLENDING_ADD";break}return t}function wv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Tv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Mv(e),l=bv(e),u=Sv(e),h=Av(e),d=wv(e),f=dv(e),g=pv(r),x=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fr).join(`
`),p.length>0&&(p+=`
`)):(m=[Th(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fr).join(`
`),p=[Th(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xi?"#define TONE_MAPPING":"",e.toneMapping!==Xi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Xi?hv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,uv("linearToOutputTexel",e.outputColorSpace),fv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fr).join(`
`)),a=wl(a),a=Sh(a,e),a=Ah(a,e),o=wl(o),o=Sh(o,e),o=Ah(o,e),a=wh(a),o=wh(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Ou?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ou?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+a,v=M+p+o,w=yh(s,s.VERTEX_SHADER,y),T=yh(s,s.FRAGMENT_SHADER,v);s.attachShader(x,w),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function L(O){if(i.debug.checkShaderErrors){const j=s.getProgramInfoLog(x).trim(),W=s.getShaderInfoLog(w).trim(),$=s.getShaderInfoLog(T).trim();let b=!0,S=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(b=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,w,T);else{const I=bh(s,w,"vertex"),_=bh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+j+`
`+I+`
`+_)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(W===""||$==="")&&(S=!1);S&&(O.diagnostics={runnable:b,programLog:j,vertexShader:{log:W,prefix:m},fragmentShader:{log:$,prefix:p}})}s.deleteShader(w),s.deleteShader(T),B=new uo(s,x),E=mv(s,x)}let B;this.getUniforms=function(){return B===void 0&&L(this),B};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,av)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ov++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}let Ev=0;class Rv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Cv(t),e.set(t,n)),n}}class Cv{constructor(t){this.id=Ev++,this.code=t,this.usedTimes=0}}function Pv(i,t,e,n,s,r,a){const o=new Ql,c=new Rv,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,A,O,j,W){const $=j.fog,b=W.geometry,S=E.isMeshStandardMaterial?j.environment:null,I=(E.isMeshStandardMaterial?e:t).get(E.envMap||S),_=I&&I.mapping===bo?I.image.height:null,N=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const z=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,D=z!==void 0?z.length:0;let U=0;b.morphAttributes.position!==void 0&&(U=1),b.morphAttributes.normal!==void 0&&(U=2),b.morphAttributes.color!==void 0&&(U=3);let X,H,k,it;if(N){const Qt=$n[N];X=Qt.vertexShader,H=Qt.fragmentShader}else X=E.vertexShader,H=E.fragmentShader,c.update(E),k=c.getVertexShaderID(E),it=c.getFragmentShaderID(E);const st=i.getRenderTarget(),ot=i.state.buffers.depth.getReversed(),_t=W.isInstancedMesh===!0,gt=W.isBatchedMesh===!0,Y=!!E.map,Z=!!E.matcap,rt=!!I,F=!!E.aoMap,dt=!!E.lightMap,bt=!!E.bumpMap,ft=!!E.normalMap,xt=!!E.displacementMap,R=!!E.emissiveMap,Q=!!E.metalnessMap,C=!!E.roughnessMap,P=E.anisotropy>0,J=E.clearcoat>0,tt=E.dispersion>0,K=E.iridescence>0,ht=E.sheen>0,yt=E.transmission>0,vt=P&&!!E.anisotropyMap,St=J&&!!E.clearcoatMap,Pt=J&&!!E.clearcoatNormalMap,Mt=J&&!!E.clearcoatRoughnessMap,Et=K&&!!E.iridescenceMap,Dt=K&&!!E.iridescenceThicknessMap,Ht=ht&&!!E.sheenColorMap,Tt=ht&&!!E.sheenRoughnessMap,jt=!!E.specularMap,Xt=!!E.specularColorMap,Vt=!!E.specularIntensityMap,et=yt&&!!E.transmissionMap,It=yt&&!!E.thicknessMap,q=!!E.gradientMap,ct=!!E.alphaMap,At=E.alphaTest>0,wt=!!E.alphaHash,zt=!!E.extensions;let Kt=Xi;E.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Kt=i.toneMapping);const fe={shaderID:N,shaderType:E.type,shaderName:E.name,vertexShader:X,fragmentShader:H,defines:E.defines,customVertexShaderID:k,customFragmentShaderID:it,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:gt,batchingColor:gt&&W._colorsTexture!==null,instancing:_t,instancingColor:_t&&W.instanceColor!==null,instancingMorph:_t&&W.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:an,alphaToCoverage:!!E.alphaToCoverage,map:Y,matcap:Z,envMap:rt,envMapMode:rt&&I.mapping,envMapCubeUVHeight:_,aoMap:F,lightMap:dt,bumpMap:bt,normalMap:ft,displacementMap:d&&xt,emissiveMap:R,normalMapObjectSpace:ft&&E.normalMapType===ym,normalMapTangentSpace:ft&&E.normalMapType===$l,metalnessMap:Q,roughnessMap:C,anisotropy:P,anisotropyMap:vt,clearcoat:J,clearcoatMap:St,clearcoatNormalMap:Pt,clearcoatRoughnessMap:Mt,dispersion:tt,iridescence:K,iridescenceMap:Et,iridescenceThicknessMap:Dt,sheen:ht,sheenColorMap:Ht,sheenRoughnessMap:Tt,specularMap:jt,specularColorMap:Xt,specularIntensityMap:Vt,transmission:yt,transmissionMap:et,thicknessMap:It,gradientMap:q,opaque:E.transparent===!1&&E.blending===Qs&&E.alphaToCoverage===!1,alphaMap:ct,alphaTest:At,alphaHash:wt,combine:E.combine,mapUv:Y&&x(E.map.channel),aoMapUv:F&&x(E.aoMap.channel),lightMapUv:dt&&x(E.lightMap.channel),bumpMapUv:bt&&x(E.bumpMap.channel),normalMapUv:ft&&x(E.normalMap.channel),displacementMapUv:xt&&x(E.displacementMap.channel),emissiveMapUv:R&&x(E.emissiveMap.channel),metalnessMapUv:Q&&x(E.metalnessMap.channel),roughnessMapUv:C&&x(E.roughnessMap.channel),anisotropyMapUv:vt&&x(E.anisotropyMap.channel),clearcoatMapUv:St&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&x(E.sheenRoughnessMap.channel),specularMapUv:jt&&x(E.specularMap.channel),specularColorMapUv:Xt&&x(E.specularColorMap.channel),specularIntensityMapUv:Vt&&x(E.specularIntensityMap.channel),transmissionMapUv:et&&x(E.transmissionMap.channel),thicknessMapUv:It&&x(E.thicknessMap.channel),alphaMapUv:ct&&x(E.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(ft||P),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!b.attributes.uv&&(Y||ct),fog:!!$,useFog:E.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ot,skinning:W.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:U,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:Kt,decodeVideoTexture:Y&&E.map.isVideoTexture===!0&&ae.getTransfer(E.map.colorSpace)===ve,decodeVideoTextureEmissive:R&&E.emissiveMap.isVideoTexture===!0&&ae.getTransfer(E.emissiveMap.colorSpace)===ve,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===sn,flipSided:E.side===rn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:zt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&E.extensions.multiDraw===!0||gt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return fe.vertexUv1s=l.has(1),fe.vertexUv2s=l.has(2),fe.vertexUv3s=l.has(3),l.clear(),fe}function p(E){const A=[];if(E.shaderID?A.push(E.shaderID):(A.push(E.customVertexShaderID),A.push(E.customFragmentShaderID)),E.defines!==void 0)for(const O in E.defines)A.push(O),A.push(E.defines[O]);return E.isRawShaderMaterial===!1&&(M(A,E),y(A,E),A.push(i.outputColorSpace)),A.push(E.customProgramCacheKey),A.join()}function M(E,A){E.push(A.precision),E.push(A.outputColorSpace),E.push(A.envMapMode),E.push(A.envMapCubeUVHeight),E.push(A.mapUv),E.push(A.alphaMapUv),E.push(A.lightMapUv),E.push(A.aoMapUv),E.push(A.bumpMapUv),E.push(A.normalMapUv),E.push(A.displacementMapUv),E.push(A.emissiveMapUv),E.push(A.metalnessMapUv),E.push(A.roughnessMapUv),E.push(A.anisotropyMapUv),E.push(A.clearcoatMapUv),E.push(A.clearcoatNormalMapUv),E.push(A.clearcoatRoughnessMapUv),E.push(A.iridescenceMapUv),E.push(A.iridescenceThicknessMapUv),E.push(A.sheenColorMapUv),E.push(A.sheenRoughnessMapUv),E.push(A.specularMapUv),E.push(A.specularColorMapUv),E.push(A.specularIntensityMapUv),E.push(A.transmissionMapUv),E.push(A.thicknessMapUv),E.push(A.combine),E.push(A.fogExp2),E.push(A.sizeAttenuation),E.push(A.morphTargetsCount),E.push(A.morphAttributeCount),E.push(A.numDirLights),E.push(A.numPointLights),E.push(A.numSpotLights),E.push(A.numSpotLightMaps),E.push(A.numHemiLights),E.push(A.numRectAreaLights),E.push(A.numDirLightShadows),E.push(A.numPointLightShadows),E.push(A.numSpotLightShadows),E.push(A.numSpotLightShadowsWithMaps),E.push(A.numLightProbes),E.push(A.shadowMapType),E.push(A.toneMapping),E.push(A.numClippingPlanes),E.push(A.numClipIntersection),E.push(A.depthPacking)}function y(E,A){o.disableAll(),A.supportsVertexTextures&&o.enable(0),A.instancing&&o.enable(1),A.instancingColor&&o.enable(2),A.instancingMorph&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),A.dispersion&&o.enable(20),A.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reverseDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),E.push(o.mask)}function v(E){const A=g[E.type];let O;if(A){const j=$n[A];O=d0.clone(j.uniforms)}else O=E.uniforms;return O}function w(E,A){let O;for(let j=0,W=u.length;j<W;j++){const $=u[j];if($.cacheKey===A){O=$,++O.usedTimes;break}}return O===void 0&&(O=new Tv(i,A,E,r),u.push(O)),O}function T(E){if(--E.usedTimes===0){const A=u.indexOf(E);u[A]=u[u.length-1],u.pop(),E.destroy()}}function L(E){c.remove(E)}function B(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:w,releaseProgram:T,releaseShaderCache:L,programs:u,dispose:B}}function Iv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Lv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Eh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Rh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),t++,p}function o(h,d,f,g,x,m){const p=a(h,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(h,d,f,g,x,m){const p=a(h,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||Lv),n.length>1&&n.sort(d||Eh),s.length>1&&s.sort(d||Eh)}function u(){for(let h=t,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function zv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Rh,i.set(n,[a])):s>=r.length?(a=new Rh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Dv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new Nt};break;case"SpotLight":e={position:new G,direction:new G,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new G,halfWidth:new G,halfHeight:new G};break}return i[t.id]=e,e}}}function kv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Nv=0;function Uv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ov(i){const t=new Dv,e=kv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new G);const s=new G,r=new Ut,a=new Ut;function o(l){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,M=0,y=0,v=0,w=0,T=0,L=0;l.sort(Uv);for(let E=0,A=l.length;E<A;E++){const O=l[E],j=O.color,W=O.intensity,$=O.distance,b=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)u+=j.r*W,h+=j.g*W,d+=j.b*W;else if(O.isLightProbe){for(let S=0;S<9;S++)n.probe[S].addScaledVector(O.sh.coefficients[S],W);L++}else if(O.isDirectionalLight){const S=t.get(O);if(S.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const I=O.shadow,_=e.get(O);_.shadowIntensity=I.intensity,_.shadowBias=I.bias,_.shadowNormalBias=I.normalBias,_.shadowRadius=I.radius,_.shadowMapSize=I.mapSize,n.directionalShadow[f]=_,n.directionalShadowMap[f]=b,n.directionalShadowMatrix[f]=O.shadow.matrix,M++}n.directional[f]=S,f++}else if(O.isSpotLight){const S=t.get(O);S.position.setFromMatrixPosition(O.matrixWorld),S.color.copy(j).multiplyScalar(W),S.distance=$,S.coneCos=Math.cos(O.angle),S.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),S.decay=O.decay,n.spot[x]=S;const I=O.shadow;if(O.map&&(n.spotLightMap[w]=O.map,w++,I.updateMatrices(O),O.castShadow&&T++),n.spotLightMatrix[x]=I.matrix,O.castShadow){const _=e.get(O);_.shadowIntensity=I.intensity,_.shadowBias=I.bias,_.shadowNormalBias=I.normalBias,_.shadowRadius=I.radius,_.shadowMapSize=I.mapSize,n.spotShadow[x]=_,n.spotShadowMap[x]=b,v++}x++}else if(O.isRectAreaLight){const S=t.get(O);S.color.copy(j).multiplyScalar(W),S.halfWidth.set(O.width*.5,0,0),S.halfHeight.set(0,O.height*.5,0),n.rectArea[m]=S,m++}else if(O.isPointLight){const S=t.get(O);if(S.color.copy(O.color).multiplyScalar(O.intensity),S.distance=O.distance,S.decay=O.decay,O.castShadow){const I=O.shadow,_=e.get(O);_.shadowIntensity=I.intensity,_.shadowBias=I.bias,_.shadowNormalBias=I.normalBias,_.shadowRadius=I.radius,_.shadowMapSize=I.mapSize,_.shadowCameraNear=I.camera.near,_.shadowCameraFar=I.camera.far,n.pointShadow[g]=_,n.pointShadowMap[g]=b,n.pointShadowMatrix[g]=O.shadow.matrix,y++}n.point[g]=S,g++}else if(O.isHemisphereLight){const S=t.get(O);S.skyColor.copy(O.color).multiplyScalar(W),S.groundColor.copy(O.groundColor).multiplyScalar(W),n.hemi[p]=S,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Lt.LTC_FLOAT_1,n.rectAreaLTC2=Lt.LTC_FLOAT_2):(n.rectAreaLTC1=Lt.LTC_HALF_1,n.rectAreaLTC2=Lt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const B=n.hash;(B.directionalLength!==f||B.pointLength!==g||B.spotLength!==x||B.rectAreaLength!==m||B.hemiLength!==p||B.numDirectionalShadows!==M||B.numPointShadows!==y||B.numSpotShadows!==v||B.numSpotMaps!==w||B.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=L,B.directionalLength=f,B.pointLength=g,B.spotLength=x,B.rectAreaLength=m,B.hemiLength=p,B.numDirectionalShadows=M,B.numPointShadows=y,B.numSpotShadows=v,B.numSpotMaps=w,B.numLightProbes=L,n.version=Nv++)}function c(l,u){let h=0,d=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const y=l[p];if(y.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function Ch(i){const t=new Ov(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Fv(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ch(i),t.set(s,[o])):r>=a.length?(o=new Ch(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Eo extends Vn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=vm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bv extends Vn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Hv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gv=`uniform sampler2D shadow_pass;
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
}`;function Vv(i,t,e){let n=new xr;const s=new Ct,r=new Ct,a=new re,o=new Eo({depthPacking:So}),c=new Bv,l={},u=e.maxTextureSize,h={[Mi]:rn,[rn]:Mi,[sn]:sn},d=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:Hv,fragmentShader:Gv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new he;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ee(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let p=this.type;this.render=function(T,L,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const E=i.getRenderTarget(),A=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),j=i.state;j.setBlending(Wi),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const W=p!==pi&&this.type===pi,$=p===pi&&this.type!==pi;for(let b=0,S=T.length;b<S;b++){const I=T[b],_=I.shadow;if(_===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(_.autoUpdate===!1&&_.needsUpdate===!1)continue;s.copy(_.mapSize);const N=_.getFrameExtents();if(s.multiply(N),r.copy(_.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/N.x),s.x=r.x*N.x,_.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/N.y),s.y=r.y*N.y,_.mapSize.y=r.y)),_.map===null||W===!0||$===!0){const D=this.type!==pi?{minFilter:qe,magFilter:qe}:{};_.map!==null&&_.map.dispose(),_.map=new bi(s.x,s.y,D),_.map.texture.name=I.name+".shadowMap",_.camera.updateProjectionMatrix()}i.setRenderTarget(_.map),i.clear();const z=_.getViewportCount();for(let D=0;D<z;D++){const U=_.getViewport(D);a.set(r.x*U.x,r.y*U.y,r.x*U.z,r.y*U.w),j.viewport(a),_.updateMatrices(I,D),n=_.getFrustum(),v(L,B,_.camera,I,this.type)}_.isPointLightShadow!==!0&&this.type===pi&&M(_,B),_.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,A,O)};function M(T,L){const B=t.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new bi(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(L,null,B,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(L,null,B,f,x,null)}function y(T,L,B,E){let A=null;const O=B.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)A=O;else if(A=B.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const j=A.uuid,W=L.uuid;let $=l[j];$===void 0&&($={},l[j]=$);let b=$[W];b===void 0&&(b=A.clone(),$[W]=b,L.addEventListener("dispose",w)),A=b}if(A.visible=L.visible,A.wireframe=L.wireframe,E===pi?A.side=L.shadowSide!==null?L.shadowSide:L.side:A.side=L.shadowSide!==null?L.shadowSide:h[L.side],A.alphaMap=L.alphaMap,A.alphaTest=L.alphaTest,A.map=L.map,A.clipShadows=L.clipShadows,A.clippingPlanes=L.clippingPlanes,A.clipIntersection=L.clipIntersection,A.displacementMap=L.displacementMap,A.displacementScale=L.displacementScale,A.displacementBias=L.displacementBias,A.wireframeLinewidth=L.wireframeLinewidth,A.linewidth=L.linewidth,B.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const j=i.properties.get(A);j.light=B}return A}function v(T,L,B,E,A){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===pi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld);const W=t.update(T),$=T.material;if(Array.isArray($)){const b=W.groups;for(let S=0,I=b.length;S<I;S++){const _=b[S],N=$[_.materialIndex];if(N&&N.visible){const z=y(T,N,E,A);T.onBeforeShadow(i,T,L,B,W,z,_),i.renderBufferDirect(B,null,W,z,T,_),T.onAfterShadow(i,T,L,B,W,z,_)}}}else if($.visible){const b=y(T,$,E,A);T.onBeforeShadow(i,T,L,B,W,b,null),i.renderBufferDirect(B,null,W,b,T,null),T.onAfterShadow(i,T,L,B,W,b,null)}}const j=T.children;for(let W=0,$=j.length;W<$;W++)v(j[W],L,B,E,A)}function w(T){T.target.removeEventListener("dispose",w);for(const B in l){const E=l[B],A=T.target.uuid;A in E&&(E[A].dispose(),delete E[A])}}}const Wv={[Gc]:Vc,[Wc]:Yc,[Xc]:Kc,[rr]:jc,[Vc]:Gc,[Yc]:Wc,[Kc]:Xc,[jc]:rr};function Xv(i,t){function e(){let et=!1;const It=new re;let q=null;const ct=new re(0,0,0,0);return{setMask:function(At){q!==At&&!et&&(i.colorMask(At,At,At,At),q=At)},setLocked:function(At){et=At},setClear:function(At,wt,zt,Kt,fe){fe===!0&&(At*=Kt,wt*=Kt,zt*=Kt),It.set(At,wt,zt,Kt),ct.equals(It)===!1&&(i.clearColor(At,wt,zt,Kt),ct.copy(It))},reset:function(){et=!1,q=null,ct.set(-1,0,0,0)}}}function n(){let et=!1,It=!1,q=null,ct=null,At=null;return{setReversed:function(wt){if(It!==wt){const zt=t.get("EXT_clip_control");It?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);const Kt=At;At=null,this.setClear(Kt)}It=wt},getReversed:function(){return It},setTest:function(wt){wt?st(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(wt){q!==wt&&!et&&(i.depthMask(wt),q=wt)},setFunc:function(wt){if(It&&(wt=Wv[wt]),ct!==wt){switch(wt){case Gc:i.depthFunc(i.NEVER);break;case Vc:i.depthFunc(i.ALWAYS);break;case Wc:i.depthFunc(i.LESS);break;case rr:i.depthFunc(i.LEQUAL);break;case Xc:i.depthFunc(i.EQUAL);break;case jc:i.depthFunc(i.GEQUAL);break;case Yc:i.depthFunc(i.GREATER);break;case Kc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=wt}},setLocked:function(wt){et=wt},setClear:function(wt){At!==wt&&(It&&(wt=1-wt),i.clearDepth(wt),At=wt)},reset:function(){et=!1,q=null,ct=null,At=null,It=!1}}}function s(){let et=!1,It=null,q=null,ct=null,At=null,wt=null,zt=null,Kt=null,fe=null;return{setTest:function(Qt){et||(Qt?st(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(Qt){It!==Qt&&!et&&(i.stencilMask(Qt),It=Qt)},setFunc:function(Qt,je,le){(q!==Qt||ct!==je||At!==le)&&(i.stencilFunc(Qt,je,le),q=Qt,ct=je,At=le)},setOp:function(Qt,je,le){(wt!==Qt||zt!==je||Kt!==le)&&(i.stencilOp(Qt,je,le),wt=Qt,zt=je,Kt=le)},setLocked:function(Qt){et=Qt},setClear:function(Qt){fe!==Qt&&(i.clearStencil(Qt),fe=Qt)},reset:function(){et=!1,It=null,q=null,ct=null,At=null,wt=null,zt=null,Kt=null,fe=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,y=null,v=null,w=null,T=null,L=new Nt(0,0,0),B=0,E=!1,A=null,O=null,j=null,W=null,$=null;const b=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let S=!1,I=0;const _=i.getParameter(i.VERSION);_.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(_)[1]),S=I>=1):_.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(_)[1]),S=I>=2);let N=null,z={};const D=i.getParameter(i.SCISSOR_BOX),U=i.getParameter(i.VIEWPORT),X=new re().fromArray(D),H=new re().fromArray(U);function k(et,It,q,ct){const At=new Uint8Array(4),wt=i.createTexture();i.bindTexture(et,wt),i.texParameteri(et,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(et,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<q;zt++)et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?i.texImage3D(It,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,At):i.texImage2D(It+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,At);return wt}const it={};it[i.TEXTURE_2D]=k(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=k(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=k(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=k(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(i.DEPTH_TEST),a.setFunc(rr),bt(!1),ft(Lu),st(i.CULL_FACE),F(Wi);function st(et){u[et]!==!0&&(i.enable(et),u[et]=!0)}function ot(et){u[et]!==!1&&(i.disable(et),u[et]=!1)}function _t(et,It){return h[et]!==It?(i.bindFramebuffer(et,It),h[et]=It,et===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=It),et===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=It),!0):!1}function gt(et,It){let q=f,ct=!1;if(et){q=d.get(It),q===void 0&&(q=[],d.set(It,q));const At=et.textures;if(q.length!==At.length||q[0]!==i.COLOR_ATTACHMENT0){for(let wt=0,zt=At.length;wt<zt;wt++)q[wt]=i.COLOR_ATTACHMENT0+wt;q.length=At.length,ct=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,ct=!0);ct&&i.drawBuffers(q)}function Y(et){return g!==et?(i.useProgram(et),g=et,!0):!1}const Z={[fs]:i.FUNC_ADD,[Vp]:i.FUNC_SUBTRACT,[Wp]:i.FUNC_REVERSE_SUBTRACT};Z[Xp]=i.MIN,Z[jp]=i.MAX;const rt={[Yp]:i.ZERO,[Kp]:i.ONE,[qp]:i.SRC_COLOR,[Bc]:i.SRC_ALPHA,[em]:i.SRC_ALPHA_SATURATE,[Qp]:i.DST_COLOR,[$p]:i.DST_ALPHA,[Zp]:i.ONE_MINUS_SRC_COLOR,[Hc]:i.ONE_MINUS_SRC_ALPHA,[tm]:i.ONE_MINUS_DST_COLOR,[Jp]:i.ONE_MINUS_DST_ALPHA,[nm]:i.CONSTANT_COLOR,[im]:i.ONE_MINUS_CONSTANT_COLOR,[sm]:i.CONSTANT_ALPHA,[rm]:i.ONE_MINUS_CONSTANT_ALPHA};function F(et,It,q,ct,At,wt,zt,Kt,fe,Qt){if(et===Wi){x===!0&&(ot(i.BLEND),x=!1);return}if(x===!1&&(st(i.BLEND),x=!0),et!==Gp){if(et!==m||Qt!==E){if((p!==fs||v!==fs)&&(i.blendEquation(i.FUNC_ADD),p=fs,v=fs),Qt)switch(et){case Qs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zu:i.blendFunc(i.ONE,i.ONE);break;case Du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ku:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",et);break}else switch(et){case Qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ku:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",et);break}M=null,y=null,w=null,T=null,L.set(0,0,0),B=0,m=et,E=Qt}return}At=At||It,wt=wt||q,zt=zt||ct,(It!==p||At!==v)&&(i.blendEquationSeparate(Z[It],Z[At]),p=It,v=At),(q!==M||ct!==y||wt!==w||zt!==T)&&(i.blendFuncSeparate(rt[q],rt[ct],rt[wt],rt[zt]),M=q,y=ct,w=wt,T=zt),(Kt.equals(L)===!1||fe!==B)&&(i.blendColor(Kt.r,Kt.g,Kt.b,fe),L.copy(Kt),B=fe),m=et,E=!1}function dt(et,It){et.side===sn?ot(i.CULL_FACE):st(i.CULL_FACE);let q=et.side===rn;It&&(q=!q),bt(q),et.blending===Qs&&et.transparent===!1?F(Wi):F(et.blending,et.blendEquation,et.blendSrc,et.blendDst,et.blendEquationAlpha,et.blendSrcAlpha,et.blendDstAlpha,et.blendColor,et.blendAlpha,et.premultipliedAlpha),a.setFunc(et.depthFunc),a.setTest(et.depthTest),a.setMask(et.depthWrite),r.setMask(et.colorWrite);const ct=et.stencilWrite;o.setTest(ct),ct&&(o.setMask(et.stencilWriteMask),o.setFunc(et.stencilFunc,et.stencilRef,et.stencilFuncMask),o.setOp(et.stencilFail,et.stencilZFail,et.stencilZPass)),R(et.polygonOffset,et.polygonOffsetFactor,et.polygonOffsetUnits),et.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function bt(et){A!==et&&(et?i.frontFace(i.CW):i.frontFace(i.CCW),A=et)}function ft(et){et!==Bp?(st(i.CULL_FACE),et!==O&&(et===Lu?i.cullFace(i.BACK):et===Hp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),O=et}function xt(et){et!==j&&(S&&i.lineWidth(et),j=et)}function R(et,It,q){et?(st(i.POLYGON_OFFSET_FILL),(W!==It||$!==q)&&(i.polygonOffset(It,q),W=It,$=q)):ot(i.POLYGON_OFFSET_FILL)}function Q(et){et?st(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function C(et){et===void 0&&(et=i.TEXTURE0+b-1),N!==et&&(i.activeTexture(et),N=et)}function P(et,It,q){q===void 0&&(N===null?q=i.TEXTURE0+b-1:q=N);let ct=z[q];ct===void 0&&(ct={type:void 0,texture:void 0},z[q]=ct),(ct.type!==et||ct.texture!==It)&&(N!==q&&(i.activeTexture(q),N=q),i.bindTexture(et,It||it[et]),ct.type=et,ct.texture=It)}function J(){const et=z[N];et!==void 0&&et.type!==void 0&&(i.bindTexture(et.type,null),et.type=void 0,et.texture=void 0)}function tt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function ht(){try{i.texSubImage2D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function vt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function St(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Pt(){try{i.texStorage2D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Mt(){try{i.texStorage3D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Et(){try{i.texImage2D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Dt(){try{i.texImage3D.apply(i,arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Ht(et){X.equals(et)===!1&&(i.scissor(et.x,et.y,et.z,et.w),X.copy(et))}function Tt(et){H.equals(et)===!1&&(i.viewport(et.x,et.y,et.z,et.w),H.copy(et))}function jt(et,It){let q=l.get(It);q===void 0&&(q=new WeakMap,l.set(It,q));let ct=q.get(et);ct===void 0&&(ct=i.getUniformBlockIndex(It,et.name),q.set(et,ct))}function Xt(et,It){const ct=l.get(It).get(et);c.get(It)!==ct&&(i.uniformBlockBinding(It,ct,et.__bindingPointIndex),c.set(It,ct))}function Vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},N=null,z={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,y=null,v=null,w=null,T=null,L=new Nt(0,0,0),B=0,E=!1,A=null,O=null,j=null,W=null,$=null,X.set(0,0,i.canvas.width,i.canvas.height),H.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:ot,bindFramebuffer:_t,drawBuffers:gt,useProgram:Y,setBlending:F,setMaterial:dt,setFlipSided:bt,setCullFace:ft,setLineWidth:xt,setPolygonOffset:R,setScissorTest:Q,activeTexture:C,bindTexture:P,unbindTexture:J,compressedTexImage2D:tt,compressedTexImage3D:K,texImage2D:Et,texImage3D:Dt,updateUBOMapping:jt,uniformBlockBinding:Xt,texStorage2D:Pt,texStorage3D:Mt,texSubImage2D:ht,texSubImage3D:yt,compressedTexSubImage2D:vt,compressedTexSubImage3D:St,scissor:Ht,viewport:Tt,reset:Vt}}function Ph(i,t,e,n){const s=jv(n);switch(e){case Ld:return i*t;case Dd:return i*t;case kd:return i*t*2;case Xl:return i*t/s.components*s.byteLength;case jl:return i*t/s.components*s.byteLength;case Nd:return i*t*2/s.components*s.byteLength;case Yl:return i*t*2/s.components*s.byteLength;case zd:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case Kl:return i*t*4/s.components*s.byteLength;case ro:case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case oo:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jc:case tl:return Math.max(i,16)*Math.max(t,8)/4;case $c:case Qc:return Math.max(i,8)*Math.max(t,8)/2;case el:case nl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ll:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case pl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ml:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case gl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case lo:case _l:case vl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ud:case yl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ml:case bl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jv(i){switch(i){case Pn:case Cd:return{byteLength:1,components:1};case $r:case Pd:case mr:return{byteLength:2,components:1};case Vl:case Wl:return{byteLength:2,components:4};case xs:case Gl:case En:return{byteLength:4,components:1};case Id:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Yv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ct,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,P){return f?new OffscreenCanvas(C,P):ta("canvas")}function x(C,P,J){let tt=1;const K=Q(C);if((K.width>J||K.height>J)&&(tt=J/Math.max(K.width,K.height)),tt<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ht=Math.floor(tt*K.width),yt=Math.floor(tt*K.height);h===void 0&&(h=g(ht,yt));const vt=P?g(ht,yt):h;return vt.width=ht,vt.height=yt,vt.getContext("2d").drawImage(C,0,0,ht,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ht+"x"+yt+")."),vt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,P,J,tt,K=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ht=P;if(P===i.RED&&(J===i.FLOAT&&(ht=i.R32F),J===i.HALF_FLOAT&&(ht=i.R16F),J===i.UNSIGNED_BYTE&&(ht=i.R8)),P===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(ht=i.R8UI),J===i.UNSIGNED_SHORT&&(ht=i.R16UI),J===i.UNSIGNED_INT&&(ht=i.R32UI),J===i.BYTE&&(ht=i.R8I),J===i.SHORT&&(ht=i.R16I),J===i.INT&&(ht=i.R32I)),P===i.RG&&(J===i.FLOAT&&(ht=i.RG32F),J===i.HALF_FLOAT&&(ht=i.RG16F),J===i.UNSIGNED_BYTE&&(ht=i.RG8)),P===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(ht=i.RG8UI),J===i.UNSIGNED_SHORT&&(ht=i.RG16UI),J===i.UNSIGNED_INT&&(ht=i.RG32UI),J===i.BYTE&&(ht=i.RG8I),J===i.SHORT&&(ht=i.RG16I),J===i.INT&&(ht=i.RG32I)),P===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(ht=i.RGB8UI),J===i.UNSIGNED_SHORT&&(ht=i.RGB16UI),J===i.UNSIGNED_INT&&(ht=i.RGB32UI),J===i.BYTE&&(ht=i.RGB8I),J===i.SHORT&&(ht=i.RGB16I),J===i.INT&&(ht=i.RGB32I)),P===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(ht=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(ht=i.RGBA16UI),J===i.UNSIGNED_INT&&(ht=i.RGBA32UI),J===i.BYTE&&(ht=i.RGBA8I),J===i.SHORT&&(ht=i.RGBA16I),J===i.INT&&(ht=i.RGBA32I)),P===i.RGB&&J===i.UNSIGNED_INT_5_9_9_9_REV&&(ht=i.RGB9_E5),P===i.RGBA){const yt=K?Ao:ae.getTransfer(tt);J===i.FLOAT&&(ht=i.RGBA32F),J===i.HALF_FLOAT&&(ht=i.RGBA16F),J===i.UNSIGNED_BYTE&&(ht=yt===ve?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT_4_4_4_4&&(ht=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(ht=i.RGB5_A1)}return(ht===i.R16F||ht===i.R32F||ht===i.RG16F||ht===i.RG32F||ht===i.RGBA16F||ht===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function v(C,P){let J;return C?P===null||P===xs||P===cr?J=i.DEPTH24_STENCIL8:P===En?J=i.DEPTH32F_STENCIL8:P===$r&&(J=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===xs||P===cr?J=i.DEPTH_COMPONENT24:P===En?J=i.DEPTH_COMPONENT32F:P===$r&&(J=i.DEPTH_COMPONENT16),J}function w(C,P){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==qe&&C.minFilter!==He?Math.log2(Math.max(P.width,P.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?P.mipmaps.length:1}function T(C){const P=C.target;P.removeEventListener("dispose",T),B(P),P.isVideoTexture&&u.delete(P)}function L(C){const P=C.target;P.removeEventListener("dispose",L),A(P)}function B(C){const P=n.get(C);if(P.__webglInit===void 0)return;const J=C.source,tt=d.get(J);if(tt){const K=tt[P.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(C),Object.keys(tt).length===0&&d.delete(J)}n.remove(C)}function E(C){const P=n.get(C);i.deleteTexture(P.__webglTexture);const J=C.source,tt=d.get(J);delete tt[P.__cacheKey],a.memory.textures--}function A(C){const P=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(P.__webglFramebuffer[tt]))for(let K=0;K<P.__webglFramebuffer[tt].length;K++)i.deleteFramebuffer(P.__webglFramebuffer[tt][K]);else i.deleteFramebuffer(P.__webglFramebuffer[tt]);P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer[tt])}else{if(Array.isArray(P.__webglFramebuffer))for(let tt=0;tt<P.__webglFramebuffer.length;tt++)i.deleteFramebuffer(P.__webglFramebuffer[tt]);else i.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&i.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let tt=0;tt<P.__webglColorRenderbuffer.length;tt++)P.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(P.__webglColorRenderbuffer[tt]);P.__webglDepthRenderbuffer&&i.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const J=C.textures;for(let tt=0,K=J.length;tt<K;tt++){const ht=n.get(J[tt]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),a.memory.textures--),n.remove(J[tt])}n.remove(C)}let O=0;function j(){O=0}function W(){const C=O;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),O+=1,C}function $(C){const P=[];return P.push(C.wrapS),P.push(C.wrapT),P.push(C.wrapR||0),P.push(C.magFilter),P.push(C.minFilter),P.push(C.anisotropy),P.push(C.internalFormat),P.push(C.format),P.push(C.type),P.push(C.generateMipmaps),P.push(C.premultiplyAlpha),P.push(C.flipY),P.push(C.unpackAlignment),P.push(C.colorSpace),P.join()}function b(C,P){const J=n.get(C);if(C.isVideoTexture&&xt(C),C.isRenderTargetTexture===!1&&C.version>0&&J.__version!==C.version){const tt=C.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(J,C,P);return}}e.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+P)}function S(C,P){const J=n.get(C);if(C.version>0&&J.__version!==C.version){H(J,C,P);return}e.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+P)}function I(C,P){const J=n.get(C);if(C.version>0&&J.__version!==C.version){H(J,C,P);return}e.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+P)}function _(C,P){const J=n.get(C);if(C.version>0&&J.__version!==C.version){k(J,C,P);return}e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+P)}const N={[Ki]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[fo]:i.MIRRORED_REPEAT},z={[qe]:i.NEAREST,[Rd]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[He]:i.LINEAR,[so]:i.LINEAR_MIPMAP_NEAREST,[xn]:i.LINEAR_MIPMAP_LINEAR},D={[Mm]:i.NEVER,[Em]:i.ALWAYS,[bm]:i.LESS,[Fd]:i.LEQUAL,[Sm]:i.EQUAL,[Tm]:i.GEQUAL,[Am]:i.GREATER,[wm]:i.NOTEQUAL};function U(C,P){if(P.type===En&&t.has("OES_texture_float_linear")===!1&&(P.magFilter===He||P.magFilter===so||P.magFilter===Ur||P.magFilter===xn||P.minFilter===He||P.minFilter===so||P.minFilter===Ur||P.minFilter===xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,N[P.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,N[P.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,N[P.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,z[P.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,z[P.minFilter]),P.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,D[P.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===qe||P.minFilter!==Ur&&P.minFilter!==xn||P.type===En&&t.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||n.get(P).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,s.getMaxAnisotropy())),n.get(P).__currentAnisotropy=P.anisotropy}}}function X(C,P){let J=!1;C.__webglInit===void 0&&(C.__webglInit=!0,P.addEventListener("dispose",T));const tt=P.source;let K=d.get(tt);K===void 0&&(K={},d.set(tt,K));const ht=$(P);if(ht!==C.__cacheKey){K[ht]===void 0&&(K[ht]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,J=!0),K[ht].usedTimes++;const yt=K[C.__cacheKey];yt!==void 0&&(K[C.__cacheKey].usedTimes--,yt.usedTimes===0&&E(P)),C.__cacheKey=ht,C.__webglTexture=K[ht].texture}return J}function H(C,P,J){let tt=i.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),P.isData3DTexture&&(tt=i.TEXTURE_3D);const K=X(C,P),ht=P.source;e.bindTexture(tt,C.__webglTexture,i.TEXTURE0+J);const yt=n.get(ht);if(ht.version!==yt.__version||K===!0){e.activeTexture(i.TEXTURE0+J);const vt=ae.getPrimaries(ae.workingColorSpace),St=P.colorSpace===Bi?null:ae.getPrimaries(P.colorSpace),Pt=P.colorSpace===Bi||vt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let Mt=x(P.image,!1,s.maxTextureSize);Mt=R(P,Mt);const Et=r.convert(P.format,P.colorSpace),Dt=r.convert(P.type);let Ht=y(P.internalFormat,Et,Dt,P.colorSpace,P.isVideoTexture);U(tt,P);let Tt;const jt=P.mipmaps,Xt=P.isVideoTexture!==!0,Vt=yt.__version===void 0||K===!0,et=ht.dataReady,It=w(P,Mt);if(P.isDepthTexture)Ht=v(P.format===lr,P.type),Vt&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,Ht,Mt.width,Mt.height):e.texImage2D(i.TEXTURE_2D,0,Ht,Mt.width,Mt.height,0,Et,Dt,null));else if(P.isDataTexture)if(jt.length>0){Xt&&Vt&&e.texStorage2D(i.TEXTURE_2D,It,Ht,jt[0].width,jt[0].height);for(let q=0,ct=jt.length;q<ct;q++)Tt=jt[q],Xt?et&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Tt.width,Tt.height,Et,Dt,Tt.data):e.texImage2D(i.TEXTURE_2D,q,Ht,Tt.width,Tt.height,0,Et,Dt,Tt.data);P.generateMipmaps=!1}else Xt?(Vt&&e.texStorage2D(i.TEXTURE_2D,It,Ht,Mt.width,Mt.height),et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt.width,Mt.height,Et,Dt,Mt.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,Mt.width,Mt.height,0,Et,Dt,Mt.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){Xt&&Vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,It,Ht,jt[0].width,jt[0].height,Mt.depth);for(let q=0,ct=jt.length;q<ct;q++)if(Tt=jt[q],P.format!==Ke)if(Et!==null)if(Xt){if(et)if(P.layerUpdates.size>0){const At=Ph(Tt.width,Tt.height,P.format,P.type);for(const wt of P.layerUpdates){const zt=Tt.data.subarray(wt*At/Tt.data.BYTES_PER_ELEMENT,(wt+1)*At/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,wt,Tt.width,Tt.height,1,Et,zt)}P.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Tt.width,Tt.height,Mt.depth,Et,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ht,Tt.width,Tt.height,Mt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Tt.width,Tt.height,Mt.depth,Et,Dt,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ht,Tt.width,Tt.height,Mt.depth,0,Et,Dt,Tt.data)}else{Xt&&Vt&&e.texStorage2D(i.TEXTURE_2D,It,Ht,jt[0].width,jt[0].height);for(let q=0,ct=jt.length;q<ct;q++)Tt=jt[q],P.format!==Ke?Et!==null?Xt?et&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ht,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?et&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Tt.width,Tt.height,Et,Dt,Tt.data):e.texImage2D(i.TEXTURE_2D,q,Ht,Tt.width,Tt.height,0,Et,Dt,Tt.data)}else if(P.isDataArrayTexture)if(Xt){if(Vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,It,Ht,Mt.width,Mt.height,Mt.depth),et)if(P.layerUpdates.size>0){const q=Ph(Mt.width,Mt.height,P.format,P.type);for(const ct of P.layerUpdates){const At=Mt.data.subarray(ct*q/Mt.data.BYTES_PER_ELEMENT,(ct+1)*q/Mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ct,Mt.width,Mt.height,1,Et,Dt,At)}P.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,Et,Dt,Mt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,Mt.width,Mt.height,Mt.depth,0,Et,Dt,Mt.data);else if(P.isData3DTexture)Xt?(Vt&&e.texStorage3D(i.TEXTURE_3D,It,Ht,Mt.width,Mt.height,Mt.depth),et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,Et,Dt,Mt.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,Mt.width,Mt.height,Mt.depth,0,Et,Dt,Mt.data);else if(P.isFramebufferTexture){if(Vt)if(Xt)e.texStorage2D(i.TEXTURE_2D,It,Ht,Mt.width,Mt.height);else{let q=Mt.width,ct=Mt.height;for(let At=0;At<It;At++)e.texImage2D(i.TEXTURE_2D,At,Ht,q,ct,0,Et,Dt,null),q>>=1,ct>>=1}}else if(jt.length>0){if(Xt&&Vt){const q=Q(jt[0]);e.texStorage2D(i.TEXTURE_2D,It,Ht,q.width,q.height)}for(let q=0,ct=jt.length;q<ct;q++)Tt=jt[q],Xt?et&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Et,Dt,Tt):e.texImage2D(i.TEXTURE_2D,q,Ht,Et,Dt,Tt);P.generateMipmaps=!1}else if(Xt){if(Vt){const q=Q(Mt);e.texStorage2D(i.TEXTURE_2D,It,Ht,q.width,q.height)}et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Dt,Mt)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Et,Dt,Mt);m(P)&&p(tt),yt.__version=ht.version,P.onUpdate&&P.onUpdate(P)}C.__version=P.version}function k(C,P,J){if(P.image.length!==6)return;const tt=X(C,P),K=P.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+J);const ht=n.get(K);if(K.version!==ht.__version||tt===!0){e.activeTexture(i.TEXTURE0+J);const yt=ae.getPrimaries(ae.workingColorSpace),vt=P.colorSpace===Bi?null:ae.getPrimaries(P.colorSpace),St=P.colorSpace===Bi||yt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Pt=P.isCompressedTexture||P.image[0].isCompressedTexture,Mt=P.image[0]&&P.image[0].isDataTexture,Et=[];for(let ct=0;ct<6;ct++)!Pt&&!Mt?Et[ct]=x(P.image[ct],!0,s.maxCubemapSize):Et[ct]=Mt?P.image[ct].image:P.image[ct],Et[ct]=R(P,Et[ct]);const Dt=Et[0],Ht=r.convert(P.format,P.colorSpace),Tt=r.convert(P.type),jt=y(P.internalFormat,Ht,Tt,P.colorSpace),Xt=P.isVideoTexture!==!0,Vt=ht.__version===void 0||tt===!0,et=K.dataReady;let It=w(P,Dt);U(i.TEXTURE_CUBE_MAP,P);let q;if(Pt){Xt&&Vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,It,jt,Dt.width,Dt.height);for(let ct=0;ct<6;ct++){q=Et[ct].mipmaps;for(let At=0;At<q.length;At++){const wt=q[At];P.format!==Ke?Ht!==null?Xt?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,0,0,wt.width,wt.height,Ht,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,jt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,0,0,wt.width,wt.height,Ht,Tt,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At,jt,wt.width,wt.height,0,Ht,Tt,wt.data)}}}else{if(q=P.mipmaps,Xt&&Vt){q.length>0&&It++;const ct=Q(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,It,jt,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(Mt){Xt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Et[ct].width,Et[ct].height,Ht,Tt,Et[ct].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,jt,Et[ct].width,Et[ct].height,0,Ht,Tt,Et[ct].data);for(let At=0;At<q.length;At++){const zt=q[At].image[ct].image;Xt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,0,0,zt.width,zt.height,Ht,Tt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,jt,zt.width,zt.height,0,Ht,Tt,zt.data)}}else{Xt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Ht,Tt,Et[ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,jt,Ht,Tt,Et[ct]);for(let At=0;At<q.length;At++){const wt=q[At];Xt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,0,0,Ht,Tt,wt.image[ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,At+1,jt,Ht,Tt,wt.image[ct])}}}m(P)&&p(i.TEXTURE_CUBE_MAP),ht.__version=K.version,P.onUpdate&&P.onUpdate(P)}C.__version=P.version}function it(C,P,J,tt,K,ht){const yt=r.convert(J.format,J.colorSpace),vt=r.convert(J.type),St=y(J.internalFormat,yt,vt,J.colorSpace),Pt=n.get(P),Mt=n.get(J);if(Mt.__renderTarget=P,!Pt.__hasExternalTextures){const Et=Math.max(1,P.width>>ht),Dt=Math.max(1,P.height>>ht);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,ht,St,Et,Dt,P.depth,0,yt,vt,null):e.texImage2D(K,ht,St,Et,Dt,0,yt,vt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),ft(P)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,K,Mt.__webglTexture,0,bt(P)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,K,Mt.__webglTexture,ht),e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(C,P,J){if(i.bindRenderbuffer(i.RENDERBUFFER,C),P.depthBuffer){const tt=P.depthTexture,K=tt&&tt.isDepthTexture?tt.type:null,ht=v(P.stencilBuffer,K),yt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=bt(P);ft(P)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,vt,ht,P.width,P.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,ht,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,ht,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,C)}else{const tt=P.textures;for(let K=0;K<tt.length;K++){const ht=tt[K],yt=r.convert(ht.format,ht.colorSpace),vt=r.convert(ht.type),St=y(ht.internalFormat,yt,vt,ht.colorSpace),Pt=bt(P);J&&ft(P)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,St,P.width,P.height):ft(P)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,St,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,St,P.width,P.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ot(C,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=n.get(P.depthTexture);tt.__renderTarget=P,(!tt.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),b(P.depthTexture,0);const K=tt.__webglTexture,ht=bt(P);if(P.depthTexture.format===tr)ft(P)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,ht):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(P.depthTexture.format===lr)ft(P)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,ht):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function _t(C){const P=n.get(C),J=C.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==C.depthTexture){const tt=C.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),tt){const K=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,tt.removeEventListener("dispose",K)};tt.addEventListener("dispose",K),P.__depthDisposeCallback=K}P.__boundDepthTexture=tt}if(C.depthTexture&&!P.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");ot(P.__webglFramebuffer,C)}else if(J){P.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer[tt]),P.__webglDepthbuffer[tt]===void 0)P.__webglDepthbuffer[tt]=i.createRenderbuffer(),st(P.__webglDepthbuffer[tt],C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=P.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ht)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=i.createRenderbuffer(),st(P.__webglDepthbuffer,C,!1);else{const tt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=P.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(C,P,J){const tt=n.get(C);P!==void 0&&it(tt.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&_t(C)}function Y(C){const P=C.texture,J=n.get(C),tt=n.get(P);C.addEventListener("dispose",L);const K=C.textures,ht=C.isWebGLCubeRenderTarget===!0,yt=K.length>1;if(yt||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=P.version,a.memory.textures++),ht){J.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(P.mipmaps&&P.mipmaps.length>0){J.__webglFramebuffer[vt]=[];for(let St=0;St<P.mipmaps.length;St++)J.__webglFramebuffer[vt][St]=i.createFramebuffer()}else J.__webglFramebuffer[vt]=i.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){J.__webglFramebuffer=[];for(let vt=0;vt<P.mipmaps.length;vt++)J.__webglFramebuffer[vt]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(yt)for(let vt=0,St=K.length;vt<St;vt++){const Pt=n.get(K[vt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&ft(C)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let vt=0;vt<K.length;vt++){const St=K[vt];J.__webglColorRenderbuffer[vt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[vt]);const Pt=r.convert(St.format,St.colorSpace),Mt=r.convert(St.type),Et=y(St.internalFormat,Pt,Mt,St.colorSpace,C.isXRRenderTarget===!0),Dt=bt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,Et,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,J.__webglColorRenderbuffer[vt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),st(J.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),U(i.TEXTURE_CUBE_MAP,P);for(let vt=0;vt<6;vt++)if(P.mipmaps&&P.mipmaps.length>0)for(let St=0;St<P.mipmaps.length;St++)it(J.__webglFramebuffer[vt][St],C,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,St);else it(J.__webglFramebuffer[vt],C,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);m(P)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let vt=0,St=K.length;vt<St;vt++){const Pt=K[vt],Mt=n.get(Pt);e.bindTexture(i.TEXTURE_2D,Mt.__webglTexture),U(i.TEXTURE_2D,Pt),it(J.__webglFramebuffer,C,Pt,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,0),m(Pt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let vt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(vt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,tt.__webglTexture),U(vt,P),P.mipmaps&&P.mipmaps.length>0)for(let St=0;St<P.mipmaps.length;St++)it(J.__webglFramebuffer[St],C,P,i.COLOR_ATTACHMENT0,vt,St);else it(J.__webglFramebuffer,C,P,i.COLOR_ATTACHMENT0,vt,0);m(P)&&p(vt),e.unbindTexture()}C.depthBuffer&&_t(C)}function Z(C){const P=C.textures;for(let J=0,tt=P.length;J<tt;J++){const K=P[J];if(m(K)){const ht=M(C),yt=n.get(K).__webglTexture;e.bindTexture(ht,yt),p(ht),e.unbindTexture()}}}const rt=[],F=[];function dt(C){if(C.samples>0){if(ft(C)===!1){const P=C.textures,J=C.width,tt=C.height;let K=i.COLOR_BUFFER_BIT;const ht=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(C),vt=P.length>1;if(vt)for(let St=0;St<P.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let St=0;St<P.length;St++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),vt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[St]);const Pt=n.get(P[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pt,0)}i.blitFramebuffer(0,0,J,tt,0,0,J,tt,K,i.NEAREST),c===!0&&(rt.length=0,F.length=0,rt.push(i.COLOR_ATTACHMENT0+St),C.depthBuffer&&C.resolveDepthBuffer===!1&&(rt.push(ht),F.push(ht),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),vt)for(let St=0;St<P.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,yt.__webglColorRenderbuffer[St]);const Pt=n.get(P[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,Pt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const P=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[P])}}}function bt(C){return Math.min(s.maxSamples,C.samples)}function ft(C){const P=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function xt(C){const P=a.render.frame;u.get(C)!==P&&(u.set(C,P),C.update())}function R(C,P){const J=C.colorSpace,tt=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||J!==an&&J!==Bi&&(ae.getTransfer(J)===ve?(tt!==Ke||K!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),P}function Q(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=j,this.setTexture2D=b,this.setTexture2DArray=S,this.setTexture3D=I,this.setTextureCube=_,this.rebindTextures=gt,this.setupRenderTarget=Y,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=it,this.useMultisampledRTT=ft}function Kv(i,t){function e(n,s=Bi){let r;const a=ae.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===Vl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Id)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Cd)return i.BYTE;if(n===Pd)return i.SHORT;if(n===$r)return i.UNSIGNED_SHORT;if(n===Gl)return i.INT;if(n===xs)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===mr)return i.HALF_FLOAT;if(n===Ld)return i.ALPHA;if(n===zd)return i.RGB;if(n===Ke)return i.RGBA;if(n===Dd)return i.LUMINANCE;if(n===kd)return i.LUMINANCE_ALPHA;if(n===tr)return i.DEPTH_COMPONENT;if(n===lr)return i.DEPTH_STENCIL;if(n===Xl)return i.RED;if(n===jl)return i.RED_INTEGER;if(n===Nd)return i.RG;if(n===Yl)return i.RG_INTEGER;if(n===Kl)return i.RGBA_INTEGER;if(n===ro||n===ao||n===oo||n===co)if(a===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$c||n===Jc||n===Qc||n===tl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$c)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===el||n===nl||n===il)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===el||n===nl)return a===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===il)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sl||n===rl||n===al||n===ol||n===cl||n===ll||n===ul||n===hl||n===fl||n===dl||n===pl||n===ml||n===gl||n===xl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===al)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ll)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ml)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===lo||n===_l||n===vl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===lo)return a===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ud||n===yl||n===Ml||n===bl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===lo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ml)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class qv extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ce extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zv={type:"move"};class cc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zv)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ce;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const $v=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jv=`
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

}`;class Qv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ve,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xn({vertexShader:$v,fragmentShader:Jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ty extends Zi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const x=new Qv,m=e.getContextAttributes();let p=null,M=null;const y=[],v=[],w=new Ct;let T=null;const L=new nn;L.viewport=new re;const B=new nn;B.viewport=new re;const E=[L,B],A=new qv;let O=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let k=y[H];return k===void 0&&(k=new cc,y[H]=k),k.getTargetRaySpace()},this.getControllerGrip=function(H){let k=y[H];return k===void 0&&(k=new cc,y[H]=k),k.getGripSpace()},this.getHand=function(H){let k=y[H];return k===void 0&&(k=new cc,y[H]=k),k.getHandSpace()};function W(H){const k=v.indexOf(H.inputSource);if(k===-1)return;const it=y[k];it!==void 0&&(it.update(H.inputSource,H.frame,l||a),it.dispatchEvent({type:H.type,data:H.inputSource}))}function $(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",b);for(let H=0;H<y.length;H++){const k=v[H];k!==null&&(v[H]=null,y[H].disconnect(k))}O=null,j=null,x.reset(),t.setRenderTarget(p),f=null,d=null,h=null,s=null,M=null,X.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",$),s.addEventListener("inputsourceschange",b),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(w),s.renderState.layers===void 0){const k={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,k),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new bi(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:Pn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let k=null,it=null,st=null;m.depth&&(st=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,k=m.stencil?lr:tr,it=m.stencil?cr:xs);const ot={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};h=new XRWebGLBinding(s,e),d=h.createProjectionLayer(ot),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new bi(d.textureWidth,d.textureHeight,{format:Ke,type:Pn,depthTexture:new Zd(d.textureWidth,d.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),X.setContext(s),X.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function b(H){for(let k=0;k<H.removed.length;k++){const it=H.removed[k],st=v.indexOf(it);st>=0&&(v[st]=null,y[st].disconnect(it))}for(let k=0;k<H.added.length;k++){const it=H.added[k];let st=v.indexOf(it);if(st===-1){for(let _t=0;_t<y.length;_t++)if(_t>=v.length){v.push(it),st=_t;break}else if(v[_t]===null){v[_t]=it,st=_t;break}if(st===-1)break}const ot=y[st];ot&&ot.connect(it)}}const S=new G,I=new G;function _(H,k,it){S.setFromMatrixPosition(k.matrixWorld),I.setFromMatrixPosition(it.matrixWorld);const st=S.distanceTo(I),ot=k.projectionMatrix.elements,_t=it.projectionMatrix.elements,gt=ot[14]/(ot[10]-1),Y=ot[14]/(ot[10]+1),Z=(ot[9]+1)/ot[5],rt=(ot[9]-1)/ot[5],F=(ot[8]-1)/ot[0],dt=(_t[8]+1)/_t[0],bt=gt*F,ft=gt*dt,xt=st/(-F+dt),R=xt*-F;if(k.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(R),H.translateZ(xt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),ot[10]===-1)H.projectionMatrix.copy(k.projectionMatrix),H.projectionMatrixInverse.copy(k.projectionMatrixInverse);else{const Q=gt+xt,C=Y+xt,P=bt-R,J=ft+(st-R),tt=Z*Y/C*Q,K=rt*Y/C*Q;H.projectionMatrix.makePerspective(P,J,tt,K,Q,C),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function N(H,k){k===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(k.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let k=H.near,it=H.far;x.texture!==null&&(x.depthNear>0&&(k=x.depthNear),x.depthFar>0&&(it=x.depthFar)),A.near=B.near=L.near=k,A.far=B.far=L.far=it,(O!==A.near||j!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),O=A.near,j=A.far),L.layers.mask=H.layers.mask|2,B.layers.mask=H.layers.mask|4,A.layers.mask=L.layers.mask|B.layers.mask;const st=H.parent,ot=A.cameras;N(A,st);for(let _t=0;_t<ot.length;_t++)N(ot[_t],st);ot.length===2?_(A,L,B):A.projectionMatrix.copy(L.projectionMatrix),z(H,A,st)};function z(H,k,it){it===null?H.matrix.copy(k.matrixWorld):(H.matrix.copy(it.matrixWorld),H.matrix.invert(),H.matrix.multiply(k.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(k.projectionMatrix),H.projectionMatrixInverse.copy(k.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=ur*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(H){c=H,d!==null&&(d.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(A)};let D=null;function U(H,k){if(u=k.getViewerPose(l||a),g=k,u!==null){const it=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let st=!1;it.length!==A.cameras.length&&(A.cameras.length=0,st=!0);for(let _t=0;_t<it.length;_t++){const gt=it[_t];let Y=null;if(f!==null)Y=f.getViewport(gt);else{const rt=h.getViewSubImage(d,gt);Y=rt.viewport,_t===0&&(t.setRenderTargetTextures(M,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(M))}let Z=E[_t];Z===void 0&&(Z=new nn,Z.layers.enable(_t),Z.viewport=new re,E[_t]=Z),Z.matrix.fromArray(gt.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(gt.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(Y.x,Y.y,Y.width,Y.height),_t===0&&(A.matrix.copy(Z.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),st===!0&&A.cameras.push(Z)}const ot=s.enabledFeatures;if(ot&&ot.includes("depth-sensing")){const _t=h.getDepthInformation(it[0]);_t&&_t.isValid&&_t.texture&&x.init(t,_t,s.renderState)}}for(let it=0;it<y.length;it++){const st=v[it],ot=y[it];st!==null&&ot!==void 0&&ot.update(st,k,l||a)}D&&D(H,k),k.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:k}),g=null}const X=new qd;X.setAnimationLoop(U),this.setAnimationLoop=function(H){D=H},this.dispose=function(){}}}const is=new on,ey=new Ut;function ny(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,jd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,M,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,v=M.envMapRotation;y&&(m.envMap.value=y,is.copy(v),is.x*=-1,is.y*=-1,is.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),m.envMapRotation.value.setFromMatrix4(ey.makeRotationFromEuler(is)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function iy(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,y){const v=y.program;n.uniformBlockBinding(M,v)}function l(M,y){let v=s[M.id];v===void 0&&(g(M),v=u(M),s[M.id]=v,M.addEventListener("dispose",m));const w=y.program;n.updateUBOMapping(M,w);const T=t.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function u(M){const y=h();M.__bindingPointIndex=y;const v=i.createBuffer(),w=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const y=s[M.id],v=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,L=v.length;T<L;T++){const B=Array.isArray(v[T])?v[T]:[v[T]];for(let E=0,A=B.length;E<A;E++){const O=B[E];if(f(O,T,E,w)===!0){const j=O.__offset,W=Array.isArray(O.value)?O.value:[O.value];let $=0;for(let b=0;b<W.length;b++){const S=W[b],I=x(S);typeof S=="number"||typeof S=="boolean"?(O.__data[0]=S,i.bufferSubData(i.UNIFORM_BUFFER,j+$,O.__data)):S.isMatrix3?(O.__data[0]=S.elements[0],O.__data[1]=S.elements[1],O.__data[2]=S.elements[2],O.__data[3]=0,O.__data[4]=S.elements[3],O.__data[5]=S.elements[4],O.__data[6]=S.elements[5],O.__data[7]=0,O.__data[8]=S.elements[6],O.__data[9]=S.elements[7],O.__data[10]=S.elements[8],O.__data[11]=0):(S.toArray(O.__data,$),$+=I.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,j,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,v,w){const T=M.value,L=y+"_"+v;if(w[L]===void 0)return typeof T=="number"||typeof T=="boolean"?w[L]=T:w[L]=T.clone(),!0;{const B=w[L];if(typeof T=="number"||typeof T=="boolean"){if(B!==T)return w[L]=T,!0}else if(B.equals(T)===!1)return B.copy(T),!0}return!1}function g(M){const y=M.uniforms;let v=0;const w=16;for(let L=0,B=y.length;L<B;L++){const E=Array.isArray(y[L])?y[L]:[y[L]];for(let A=0,O=E.length;A<O;A++){const j=E[A],W=Array.isArray(j.value)?j.value:[j.value];for(let $=0,b=W.length;$<b;$++){const S=W[$],I=x(S),_=v%w,N=_%I.boundary,z=_+N;v+=N,z!==0&&w-z<I.storage&&(v+=w-z),j.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=v,v+=I.storage}}}const T=v%w;return T>0&&(v+=w-T),M.__size=v,M.__cache={},this}function x(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class sy{constructor(t={}){const{canvas:e=Wm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Oe,this.toneMapping=Xi,this.toneMappingExposure=1;const v=this;let w=!1,T=0,L=0,B=null,E=-1,A=null;const O=new re,j=new re;let W=null;const $=new Nt(0);let b=0,S=e.width,I=e.height,_=1,N=null,z=null;const D=new re(0,0,S,I),U=new re(0,0,S,I);let X=!1;const H=new xr;let k=!1,it=!1;const st=new Ut,ot=new Ut,_t=new G,gt=new re,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function rt(){return B===null?_:1}let F=n;function dt(V,lt){return e.getContext(V,lt)}try{const V={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fl}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",wt,!1),F===null){const lt="webgl2";if(F=dt(lt,V),F===null)throw dt(lt)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let bt,ft,xt,R,Q,C,P,J,tt,K,ht,yt,vt,St,Pt,Mt,Et,Dt,Ht,Tt,jt,Xt,Vt,et;function It(){bt=new u_(F),bt.init(),Xt=new Kv(F,bt),ft=new s_(F,bt,t,Xt),xt=new Xv(F,bt),ft.reverseDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),R=new d_(F),Q=new Iv,C=new Yv(F,bt,xt,Q,ft,Xt,R),P=new a_(v),J=new l_(v),tt=new y0(F),Vt=new n_(F,tt),K=new h_(F,tt,R,Vt),ht=new m_(F,K,tt,R),Ht=new p_(F,ft,C),Mt=new r_(Q),yt=new Pv(v,P,J,bt,ft,Vt,Mt),vt=new ny(v,Q),St=new zv,Pt=new Fv(bt),Dt=new e_(v,P,J,xt,ht,f,c),Et=new Vv(v,ht,ft),et=new iy(F,R,ft,xt),Tt=new i_(F,bt,R),jt=new f_(F,bt,R),R.programs=yt.programs,v.capabilities=ft,v.extensions=bt,v.properties=Q,v.renderLists=St,v.shadowMap=Et,v.state=xt,v.info=R}It();const q=new ty(v,F);this.xr=q,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const V=bt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=bt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return _},this.setPixelRatio=function(V){V!==void 0&&(_=V,this.setSize(S,I,!1))},this.getSize=function(V){return V.set(S,I)},this.setSize=function(V,lt,pt=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}S=V,I=lt,e.width=Math.floor(V*_),e.height=Math.floor(lt*_),pt===!0&&(e.style.width=V+"px",e.style.height=lt+"px"),this.setViewport(0,0,V,lt)},this.getDrawingBufferSize=function(V){return V.set(S*_,I*_).floor()},this.setDrawingBufferSize=function(V,lt,pt){S=V,I=lt,_=pt,e.width=Math.floor(V*pt),e.height=Math.floor(lt*pt),this.setViewport(0,0,V,lt)},this.getCurrentViewport=function(V){return V.copy(O)},this.getViewport=function(V){return V.copy(D)},this.setViewport=function(V,lt,pt,mt){V.isVector4?D.set(V.x,V.y,V.z,V.w):D.set(V,lt,pt,mt),xt.viewport(O.copy(D).multiplyScalar(_).round())},this.getScissor=function(V){return V.copy(U)},this.setScissor=function(V,lt,pt,mt){V.isVector4?U.set(V.x,V.y,V.z,V.w):U.set(V,lt,pt,mt),xt.scissor(j.copy(U).multiplyScalar(_).round())},this.getScissorTest=function(){return X},this.setScissorTest=function(V){xt.setScissorTest(X=V)},this.setOpaqueSort=function(V){N=V},this.setTransparentSort=function(V){z=V},this.getClearColor=function(V){return V.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(V=!0,lt=!0,pt=!0){let mt=0;if(V){let ut=!1;if(B!==null){const Rt=B.texture.format;ut=Rt===Kl||Rt===Yl||Rt===jl}if(ut){const Rt=B.texture.type,kt=Rt===Pn||Rt===xs||Rt===$r||Rt===cr||Rt===Vl||Rt===Wl,Ot=Dt.getClearColor(),Ft=Dt.getClearAlpha(),qt=Ot.r,$t=Ot.g,Bt=Ot.b;kt?(g[0]=qt,g[1]=$t,g[2]=Bt,g[3]=Ft,F.clearBufferuiv(F.COLOR,0,g)):(x[0]=qt,x[1]=$t,x[2]=Bt,x[3]=Ft,F.clearBufferiv(F.COLOR,0,x))}else mt|=F.COLOR_BUFFER_BIT}lt&&(mt|=F.DEPTH_BUFFER_BIT),pt&&(mt|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(mt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),St.dispose(),Pt.dispose(),Q.dispose(),P.dispose(),J.dispose(),ht.dispose(),Vt.dispose(),et.dispose(),yt.dispose(),q.dispose(),q.removeEventListener("sessionstart",yn),q.removeEventListener("sessionend",ln),$i.stop()};function ct(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const V=R.autoReset,lt=Et.enabled,pt=Et.autoUpdate,mt=Et.needsUpdate,ut=Et.type;It(),R.autoReset=V,Et.enabled=lt,Et.autoUpdate=pt,Et.needsUpdate=mt,Et.type=ut}function wt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function zt(V){const lt=V.target;lt.removeEventListener("dispose",zt),Kt(lt)}function Kt(V){fe(V),Q.remove(V)}function fe(V){const lt=Q.get(V).programs;lt!==void 0&&(lt.forEach(function(pt){yt.releaseProgram(pt)}),V.isShaderMaterial&&yt.releaseShaderCache(V))}this.renderBufferDirect=function(V,lt,pt,mt,ut,Rt){lt===null&&(lt=Y);const kt=ut.isMesh&&ut.matrixWorld.determinant()<0,Ot=Up(V,lt,pt,mt,ut);xt.setMaterial(mt,kt);let Ft=pt.index,qt=1;if(mt.wireframe===!0){if(Ft=K.getWireframeAttribute(pt),Ft===void 0)return;qt=2}const $t=pt.drawRange,Bt=pt.attributes.position;let ue=$t.start*qt,Se=($t.start+$t.count)*qt;Rt!==null&&(ue=Math.max(ue,Rt.start*qt),Se=Math.min(Se,(Rt.start+Rt.count)*qt)),Ft!==null?(ue=Math.max(ue,0),Se=Math.min(Se,Ft.count)):Bt!=null&&(ue=Math.max(ue,0),Se=Math.min(Se,Bt.count));const Ae=Se-ue;if(Ae<0||Ae===1/0)return;Vt.setup(ut,mt,Ot,pt,Ft);let un,de=Tt;if(Ft!==null&&(un=tt.get(Ft),de=jt,de.setIndex(un)),ut.isMesh)mt.wireframe===!0?(xt.setLineWidth(mt.wireframeLinewidth*rt()),de.setMode(F.LINES)):de.setMode(F.TRIANGLES);else if(ut.isLine){let Gt=mt.linewidth;Gt===void 0&&(Gt=1),xt.setLineWidth(Gt*rt()),ut.isLineSegments?de.setMode(F.LINES):ut.isLineLoop?de.setMode(F.LINE_LOOP):de.setMode(F.LINE_STRIP)}else ut.isPoints?de.setMode(F.POINTS):ut.isSprite&&de.setMode(F.TRIANGLES);if(ut.isBatchedMesh)if(ut._multiDrawInstances!==null)de.renderMultiDrawInstances(ut._multiDrawStarts,ut._multiDrawCounts,ut._multiDrawCount,ut._multiDrawInstances);else if(bt.get("WEBGL_multi_draw"))de.renderMultiDraw(ut._multiDrawStarts,ut._multiDrawCounts,ut._multiDrawCount);else{const Gt=ut._multiDrawStarts,si=ut._multiDrawCounts,pe=ut._multiDrawCount,In=Ft?tt.get(Ft).bytesPerElement:1,Ss=Q.get(mt).currentProgram.getUniforms();for(let dn=0;dn<pe;dn++)Ss.setValue(F,"_gl_DrawID",dn),de.render(Gt[dn]/In,si[dn])}else if(ut.isInstancedMesh)de.renderInstances(ue,Ae,ut.count);else if(pt.isInstancedBufferGeometry){const Gt=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,si=Math.min(pt.instanceCount,Gt);de.renderInstances(ue,Ae,si)}else de.render(ue,Ae)};function Qt(V,lt,pt){V.transparent===!0&&V.side===sn&&V.forceSinglePass===!1?(V.side=rn,V.needsUpdate=!0,fa(V,lt,pt),V.side=Mi,V.needsUpdate=!0,fa(V,lt,pt),V.side=sn):fa(V,lt,pt)}this.compile=function(V,lt,pt=null){pt===null&&(pt=V),p=Pt.get(pt),p.init(lt),y.push(p),pt.traverseVisible(function(ut){ut.isLight&&ut.layers.test(lt.layers)&&(p.pushLight(ut),ut.castShadow&&p.pushShadow(ut))}),V!==pt&&V.traverseVisible(function(ut){ut.isLight&&ut.layers.test(lt.layers)&&(p.pushLight(ut),ut.castShadow&&p.pushShadow(ut))}),p.setupLights();const mt=new Set;return V.traverse(function(ut){if(!(ut.isMesh||ut.isPoints||ut.isLine||ut.isSprite))return;const Rt=ut.material;if(Rt)if(Array.isArray(Rt))for(let kt=0;kt<Rt.length;kt++){const Ot=Rt[kt];Qt(Ot,pt,ut),mt.add(Ot)}else Qt(Rt,pt,ut),mt.add(Rt)}),y.pop(),p=null,mt},this.compileAsync=function(V,lt,pt=null){const mt=this.compile(V,lt,pt);return new Promise(ut=>{function Rt(){if(mt.forEach(function(kt){Q.get(kt).currentProgram.isReady()&&mt.delete(kt)}),mt.size===0){ut(V);return}setTimeout(Rt,10)}bt.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let je=null;function le(V){je&&je(V)}function yn(){$i.stop()}function ln(){$i.start()}const $i=new qd;$i.setAnimationLoop(le),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(V){je=V,q.setAnimationLoop(V),V===null?$i.stop():$i.start()},q.addEventListener("sessionstart",yn),q.addEventListener("sessionend",ln),this.render=function(V,lt){if(lt!==void 0&&lt.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),lt.parent===null&&lt.matrixWorldAutoUpdate===!0&&lt.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(lt),lt=q.getCamera()),V.isScene===!0&&V.onBeforeRender(v,V,lt,B),p=Pt.get(V,y.length),p.init(lt),y.push(p),ot.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),H.setFromProjectionMatrix(ot),it=this.localClippingEnabled,k=Mt.init(this.clippingPlanes,it),m=St.get(V,M.length),m.init(),M.push(m),q.enabled===!0&&q.isPresenting===!0){const Rt=v.xr.getDepthSensingMesh();Rt!==null&&Do(Rt,lt,-1/0,v.sortObjects)}Do(V,lt,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(N,z),Z=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Z&&Dt.addToRenderList(m,V),this.info.render.frame++,k===!0&&Mt.beginShadows();const pt=p.state.shadowsArray;Et.render(pt,V,lt),k===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const mt=m.opaque,ut=m.transmissive;if(p.setupLights(),lt.isArrayCamera){const Rt=lt.cameras;if(ut.length>0)for(let kt=0,Ot=Rt.length;kt<Ot;kt++){const Ft=Rt[kt];Eu(mt,ut,V,Ft)}Z&&Dt.render(V);for(let kt=0,Ot=Rt.length;kt<Ot;kt++){const Ft=Rt[kt];Tu(m,V,Ft,Ft.viewport)}}else ut.length>0&&Eu(mt,ut,V,lt),Z&&Dt.render(V),Tu(m,V,lt);B!==null&&(C.updateMultisampleRenderTarget(B),C.updateRenderTargetMipmap(B)),V.isScene===!0&&V.onAfterRender(v,V,lt),Vt.resetDefaultState(),E=-1,A=null,y.pop(),y.length>0?(p=y[y.length-1],k===!0&&Mt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Do(V,lt,pt,mt){if(V.visible===!1)return;if(V.layers.test(lt.layers)){if(V.isGroup)pt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(lt);else if(V.isLight)p.pushLight(V),V.castShadow&&p.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||H.intersectsSprite(V)){mt&&gt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(ot);const kt=ht.update(V),Ot=V.material;Ot.visible&&m.push(V,kt,Ot,pt,gt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||H.intersectsObject(V))){const kt=ht.update(V),Ot=V.material;if(mt&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),gt.copy(V.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),gt.copy(kt.boundingSphere.center)),gt.applyMatrix4(V.matrixWorld).applyMatrix4(ot)),Array.isArray(Ot)){const Ft=kt.groups;for(let qt=0,$t=Ft.length;qt<$t;qt++){const Bt=Ft[qt],ue=Ot[Bt.materialIndex];ue&&ue.visible&&m.push(V,kt,ue,pt,gt.z,Bt)}}else Ot.visible&&m.push(V,kt,Ot,pt,gt.z,null)}}const Rt=V.children;for(let kt=0,Ot=Rt.length;kt<Ot;kt++)Do(Rt[kt],lt,pt,mt)}function Tu(V,lt,pt,mt){const ut=V.opaque,Rt=V.transmissive,kt=V.transparent;p.setupLightsView(pt),k===!0&&Mt.setGlobalState(v.clippingPlanes,pt),mt&&xt.viewport(O.copy(mt)),ut.length>0&&ha(ut,lt,pt),Rt.length>0&&ha(Rt,lt,pt),kt.length>0&&ha(kt,lt,pt),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Eu(V,lt,pt,mt){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[mt.id]===void 0&&(p.state.transmissionRenderTarget[mt.id]=new bi(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?mr:Pn,minFilter:xn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const Rt=p.state.transmissionRenderTarget[mt.id],kt=mt.viewport||O;Rt.setSize(kt.z,kt.w);const Ot=v.getRenderTarget();v.setRenderTarget(Rt),v.getClearColor($),b=v.getClearAlpha(),b<1&&v.setClearColor(16777215,.5),v.clear(),Z&&Dt.render(pt);const Ft=v.toneMapping;v.toneMapping=Xi;const qt=mt.viewport;if(mt.viewport!==void 0&&(mt.viewport=void 0),p.setupLightsView(mt),k===!0&&Mt.setGlobalState(v.clippingPlanes,mt),ha(V,pt,mt),C.updateMultisampleRenderTarget(Rt),C.updateRenderTargetMipmap(Rt),bt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Bt=0,ue=lt.length;Bt<ue;Bt++){const Se=lt[Bt],Ae=Se.object,un=Se.geometry,de=Se.material,Gt=Se.group;if(de.side===sn&&Ae.layers.test(mt.layers)){const si=de.side;de.side=rn,de.needsUpdate=!0,Ru(Ae,pt,mt,un,de,Gt),de.side=si,de.needsUpdate=!0,$t=!0}}$t===!0&&(C.updateMultisampleRenderTarget(Rt),C.updateRenderTargetMipmap(Rt))}v.setRenderTarget(Ot),v.setClearColor($,b),qt!==void 0&&(mt.viewport=qt),v.toneMapping=Ft}function ha(V,lt,pt){const mt=lt.isScene===!0?lt.overrideMaterial:null;for(let ut=0,Rt=V.length;ut<Rt;ut++){const kt=V[ut],Ot=kt.object,Ft=kt.geometry,qt=mt===null?kt.material:mt,$t=kt.group;Ot.layers.test(pt.layers)&&Ru(Ot,lt,pt,Ft,qt,$t)}}function Ru(V,lt,pt,mt,ut,Rt){V.onBeforeRender(v,lt,pt,mt,ut,Rt),V.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),ut.onBeforeRender(v,lt,pt,mt,V,Rt),ut.transparent===!0&&ut.side===sn&&ut.forceSinglePass===!1?(ut.side=rn,ut.needsUpdate=!0,v.renderBufferDirect(pt,lt,mt,ut,V,Rt),ut.side=Mi,ut.needsUpdate=!0,v.renderBufferDirect(pt,lt,mt,ut,V,Rt),ut.side=sn):v.renderBufferDirect(pt,lt,mt,ut,V,Rt),V.onAfterRender(v,lt,pt,mt,ut,Rt)}function fa(V,lt,pt){lt.isScene!==!0&&(lt=Y);const mt=Q.get(V),ut=p.state.lights,Rt=p.state.shadowsArray,kt=ut.state.version,Ot=yt.getParameters(V,ut.state,Rt,lt,pt),Ft=yt.getProgramCacheKey(Ot);let qt=mt.programs;mt.environment=V.isMeshStandardMaterial?lt.environment:null,mt.fog=lt.fog,mt.envMap=(V.isMeshStandardMaterial?J:P).get(V.envMap||mt.environment),mt.envMapRotation=mt.environment!==null&&V.envMap===null?lt.environmentRotation:V.envMapRotation,qt===void 0&&(V.addEventListener("dispose",zt),qt=new Map,mt.programs=qt);let $t=qt.get(Ft);if($t!==void 0){if(mt.currentProgram===$t&&mt.lightsStateVersion===kt)return Pu(V,Ot),$t}else Ot.uniforms=yt.getUniforms(V),V.onBeforeCompile(Ot,v),$t=yt.acquireProgram(Ot,Ft),qt.set(Ft,$t),mt.uniforms=Ot.uniforms;const Bt=mt.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(Bt.clippingPlanes=Mt.uniform),Pu(V,Ot),mt.needsLights=Fp(V),mt.lightsStateVersion=kt,mt.needsLights&&(Bt.ambientLightColor.value=ut.state.ambient,Bt.lightProbe.value=ut.state.probe,Bt.directionalLights.value=ut.state.directional,Bt.directionalLightShadows.value=ut.state.directionalShadow,Bt.spotLights.value=ut.state.spot,Bt.spotLightShadows.value=ut.state.spotShadow,Bt.rectAreaLights.value=ut.state.rectArea,Bt.ltc_1.value=ut.state.rectAreaLTC1,Bt.ltc_2.value=ut.state.rectAreaLTC2,Bt.pointLights.value=ut.state.point,Bt.pointLightShadows.value=ut.state.pointShadow,Bt.hemisphereLights.value=ut.state.hemi,Bt.directionalShadowMap.value=ut.state.directionalShadowMap,Bt.directionalShadowMatrix.value=ut.state.directionalShadowMatrix,Bt.spotShadowMap.value=ut.state.spotShadowMap,Bt.spotLightMatrix.value=ut.state.spotLightMatrix,Bt.spotLightMap.value=ut.state.spotLightMap,Bt.pointShadowMap.value=ut.state.pointShadowMap,Bt.pointShadowMatrix.value=ut.state.pointShadowMatrix),mt.currentProgram=$t,mt.uniformsList=null,$t}function Cu(V){if(V.uniformsList===null){const lt=V.currentProgram.getUniforms();V.uniformsList=uo.seqWithValue(lt.seq,V.uniforms)}return V.uniformsList}function Pu(V,lt){const pt=Q.get(V);pt.outputColorSpace=lt.outputColorSpace,pt.batching=lt.batching,pt.batchingColor=lt.batchingColor,pt.instancing=lt.instancing,pt.instancingColor=lt.instancingColor,pt.instancingMorph=lt.instancingMorph,pt.skinning=lt.skinning,pt.morphTargets=lt.morphTargets,pt.morphNormals=lt.morphNormals,pt.morphColors=lt.morphColors,pt.morphTargetsCount=lt.morphTargetsCount,pt.numClippingPlanes=lt.numClippingPlanes,pt.numIntersection=lt.numClipIntersection,pt.vertexAlphas=lt.vertexAlphas,pt.vertexTangents=lt.vertexTangents,pt.toneMapping=lt.toneMapping}function Up(V,lt,pt,mt,ut){lt.isScene!==!0&&(lt=Y),C.resetTextureUnits();const Rt=lt.fog,kt=mt.isMeshStandardMaterial?lt.environment:null,Ot=B===null?v.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:an,Ft=(mt.isMeshStandardMaterial?J:P).get(mt.envMap||kt),qt=mt.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,$t=!!pt.attributes.tangent&&(!!mt.normalMap||mt.anisotropy>0),Bt=!!pt.morphAttributes.position,ue=!!pt.morphAttributes.normal,Se=!!pt.morphAttributes.color;let Ae=Xi;mt.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ae=v.toneMapping);const un=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,de=un!==void 0?un.length:0,Gt=Q.get(mt),si=p.state.lights;if(k===!0&&(it===!0||V!==A)){const Mn=V===A&&mt.id===E;Mt.setState(mt,V,Mn)}let pe=!1;mt.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==si.state.version||Gt.outputColorSpace!==Ot||ut.isBatchedMesh&&Gt.batching===!1||!ut.isBatchedMesh&&Gt.batching===!0||ut.isBatchedMesh&&Gt.batchingColor===!0&&ut.colorTexture===null||ut.isBatchedMesh&&Gt.batchingColor===!1&&ut.colorTexture!==null||ut.isInstancedMesh&&Gt.instancing===!1||!ut.isInstancedMesh&&Gt.instancing===!0||ut.isSkinnedMesh&&Gt.skinning===!1||!ut.isSkinnedMesh&&Gt.skinning===!0||ut.isInstancedMesh&&Gt.instancingColor===!0&&ut.instanceColor===null||ut.isInstancedMesh&&Gt.instancingColor===!1&&ut.instanceColor!==null||ut.isInstancedMesh&&Gt.instancingMorph===!0&&ut.morphTexture===null||ut.isInstancedMesh&&Gt.instancingMorph===!1&&ut.morphTexture!==null||Gt.envMap!==Ft||mt.fog===!0&&Gt.fog!==Rt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==Mt.numPlanes||Gt.numIntersection!==Mt.numIntersection)||Gt.vertexAlphas!==qt||Gt.vertexTangents!==$t||Gt.morphTargets!==Bt||Gt.morphNormals!==ue||Gt.morphColors!==Se||Gt.toneMapping!==Ae||Gt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,Gt.__version=mt.version);let In=Gt.currentProgram;pe===!0&&(In=fa(mt,lt,ut));let Ss=!1,dn=!1,Sr=!1;const we=In.getUniforms(),Yn=Gt.uniforms;if(xt.useProgram(In.program)&&(Ss=!0,dn=!0,Sr=!0),mt.id!==E&&(E=mt.id,dn=!0),Ss||A!==V){xt.buffers.depth.getReversed()?(st.copy(V.projectionMatrix),jm(st),Ym(st),we.setValue(F,"projectionMatrix",st)):we.setValue(F,"projectionMatrix",V.projectionMatrix),we.setValue(F,"viewMatrix",V.matrixWorldInverse);const Ai=we.map.cameraPosition;Ai!==void 0&&Ai.setValue(F,_t.setFromMatrixPosition(V.matrixWorld)),ft.logarithmicDepthBuffer&&we.setValue(F,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(mt.isMeshPhongMaterial||mt.isMeshToonMaterial||mt.isMeshLambertMaterial||mt.isMeshBasicMaterial||mt.isMeshStandardMaterial||mt.isShaderMaterial)&&we.setValue(F,"isOrthographic",V.isOrthographicCamera===!0),A!==V&&(A=V,dn=!0,Sr=!0)}if(ut.isSkinnedMesh){we.setOptional(F,ut,"bindMatrix"),we.setOptional(F,ut,"bindMatrixInverse");const Mn=ut.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),we.setValue(F,"boneTexture",Mn.boneTexture,C))}ut.isBatchedMesh&&(we.setOptional(F,ut,"batchingTexture"),we.setValue(F,"batchingTexture",ut._matricesTexture,C),we.setOptional(F,ut,"batchingIdTexture"),we.setValue(F,"batchingIdTexture",ut._indirectTexture,C),we.setOptional(F,ut,"batchingColorTexture"),ut._colorsTexture!==null&&we.setValue(F,"batchingColorTexture",ut._colorsTexture,C));const Ar=pt.morphAttributes;if((Ar.position!==void 0||Ar.normal!==void 0||Ar.color!==void 0)&&Ht.update(ut,pt,In),(dn||Gt.receiveShadow!==ut.receiveShadow)&&(Gt.receiveShadow=ut.receiveShadow,we.setValue(F,"receiveShadow",ut.receiveShadow)),mt.isMeshGouraudMaterial&&mt.envMap!==null&&(Yn.envMap.value=Ft,Yn.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),mt.isMeshStandardMaterial&&mt.envMap===null&&lt.environment!==null&&(Yn.envMapIntensity.value=lt.environmentIntensity),dn&&(we.setValue(F,"toneMappingExposure",v.toneMappingExposure),Gt.needsLights&&Op(Yn,Sr),Rt&&mt.fog===!0&&vt.refreshFogUniforms(Yn,Rt),vt.refreshMaterialUniforms(Yn,mt,_,I,p.state.transmissionRenderTarget[V.id]),uo.upload(F,Cu(Gt),Yn,C)),mt.isShaderMaterial&&mt.uniformsNeedUpdate===!0&&(uo.upload(F,Cu(Gt),Yn,C),mt.uniformsNeedUpdate=!1),mt.isSpriteMaterial&&we.setValue(F,"center",ut.center),we.setValue(F,"modelViewMatrix",ut.modelViewMatrix),we.setValue(F,"normalMatrix",ut.normalMatrix),we.setValue(F,"modelMatrix",ut.matrixWorld),mt.isShaderMaterial||mt.isRawShaderMaterial){const Mn=mt.uniformsGroups;for(let Ai=0,wi=Mn.length;Ai<wi;Ai++){const Iu=Mn[Ai];et.update(Iu,In),et.bind(Iu,In)}}return In}function Op(V,lt){V.ambientLightColor.needsUpdate=lt,V.lightProbe.needsUpdate=lt,V.directionalLights.needsUpdate=lt,V.directionalLightShadows.needsUpdate=lt,V.pointLights.needsUpdate=lt,V.pointLightShadows.needsUpdate=lt,V.spotLights.needsUpdate=lt,V.spotLightShadows.needsUpdate=lt,V.rectAreaLights.needsUpdate=lt,V.hemisphereLights.needsUpdate=lt}function Fp(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(V,lt,pt){Q.get(V.texture).__webglTexture=lt,Q.get(V.depthTexture).__webglTexture=pt;const mt=Q.get(V);mt.__hasExternalTextures=!0,mt.__autoAllocateDepthBuffer=pt===void 0,mt.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),mt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,lt){const pt=Q.get(V);pt.__webglFramebuffer=lt,pt.__useDefaultFramebuffer=lt===void 0},this.setRenderTarget=function(V,lt=0,pt=0){B=V,T=lt,L=pt;let mt=!0,ut=null,Rt=!1,kt=!1;if(V){const Ft=Q.get(V);if(Ft.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(F.FRAMEBUFFER,null),mt=!1;else if(Ft.__webglFramebuffer===void 0)C.setupRenderTarget(V);else if(Ft.__hasExternalTextures)C.rebindTextures(V,Q.get(V.texture).__webglTexture,Q.get(V.depthTexture).__webglTexture);else if(V.depthBuffer){const Bt=V.depthTexture;if(Ft.__boundDepthTexture!==Bt){if(Bt!==null&&Q.has(Bt)&&(V.width!==Bt.image.width||V.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(V)}}const qt=V.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(kt=!0);const $t=Q.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray($t[lt])?ut=$t[lt][pt]:ut=$t[lt],Rt=!0):V.samples>0&&C.useMultisampledRTT(V)===!1?ut=Q.get(V).__webglMultisampledFramebuffer:Array.isArray($t)?ut=$t[pt]:ut=$t,O.copy(V.viewport),j.copy(V.scissor),W=V.scissorTest}else O.copy(D).multiplyScalar(_).floor(),j.copy(U).multiplyScalar(_).floor(),W=X;if(xt.bindFramebuffer(F.FRAMEBUFFER,ut)&&mt&&xt.drawBuffers(V,ut),xt.viewport(O),xt.scissor(j),xt.setScissorTest(W),Rt){const Ft=Q.get(V.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ft.__webglTexture,pt)}else if(kt){const Ft=Q.get(V.texture),qt=lt||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ft.__webglTexture,pt||0,qt)}E=-1},this.readRenderTargetPixels=function(V,lt,pt,mt,ut,Rt,kt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=Q.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&kt!==void 0&&(Ot=Ot[kt]),Ot){xt.bindFramebuffer(F.FRAMEBUFFER,Ot);try{const Ft=V.texture,qt=Ft.format,$t=Ft.type;if(!ft.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}lt>=0&&lt<=V.width-mt&&pt>=0&&pt<=V.height-ut&&F.readPixels(lt,pt,mt,ut,Xt.convert(qt),Xt.convert($t),Rt)}finally{const Ft=B!==null?Q.get(B).__webglFramebuffer:null;xt.bindFramebuffer(F.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(V,lt,pt,mt,ut,Rt,kt){if(!(V&&V.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=Q.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&kt!==void 0&&(Ot=Ot[kt]),Ot){const Ft=V.texture,qt=Ft.format,$t=Ft.type;if(!ft.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(lt>=0&&lt<=V.width-mt&&pt>=0&&pt<=V.height-ut){xt.bindFramebuffer(F.FRAMEBUFFER,Ot);const Bt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Bt),F.bufferData(F.PIXEL_PACK_BUFFER,Rt.byteLength,F.STREAM_READ),F.readPixels(lt,pt,mt,ut,Xt.convert(qt),Xt.convert($t),0);const ue=B!==null?Q.get(B).__webglFramebuffer:null;xt.bindFramebuffer(F.FRAMEBUFFER,ue);const Se=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Xm(F,Se,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Bt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Rt),F.deleteBuffer(Bt),F.deleteSync(Se),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(V,lt=null,pt=0){V.isTexture!==!0&&(Or("WebGLRenderer: copyFramebufferToTexture function signature has changed."),lt=arguments[0]||null,V=arguments[1]);const mt=Math.pow(2,-pt),ut=Math.floor(V.image.width*mt),Rt=Math.floor(V.image.height*mt),kt=lt!==null?lt.x:0,Ot=lt!==null?lt.y:0;C.setTexture2D(V,0),F.copyTexSubImage2D(F.TEXTURE_2D,pt,0,0,kt,Ot,ut,Rt),xt.unbindTexture()},this.copyTextureToTexture=function(V,lt,pt=null,mt=null,ut=0){V.isTexture!==!0&&(Or("WebGLRenderer: copyTextureToTexture function signature has changed."),mt=arguments[0]||null,V=arguments[1],lt=arguments[2],ut=arguments[3]||0,pt=null);let Rt,kt,Ot,Ft,qt,$t,Bt,ue,Se;const Ae=V.isCompressedTexture?V.mipmaps[ut]:V.image;pt!==null?(Rt=pt.max.x-pt.min.x,kt=pt.max.y-pt.min.y,Ot=pt.isBox3?pt.max.z-pt.min.z:1,Ft=pt.min.x,qt=pt.min.y,$t=pt.isBox3?pt.min.z:0):(Rt=Ae.width,kt=Ae.height,Ot=Ae.depth||1,Ft=0,qt=0,$t=0),mt!==null?(Bt=mt.x,ue=mt.y,Se=mt.z):(Bt=0,ue=0,Se=0);const un=Xt.convert(lt.format),de=Xt.convert(lt.type);let Gt;lt.isData3DTexture?(C.setTexture3D(lt,0),Gt=F.TEXTURE_3D):lt.isDataArrayTexture||lt.isCompressedArrayTexture?(C.setTexture2DArray(lt,0),Gt=F.TEXTURE_2D_ARRAY):(C.setTexture2D(lt,0),Gt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,lt.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,lt.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,lt.unpackAlignment);const si=F.getParameter(F.UNPACK_ROW_LENGTH),pe=F.getParameter(F.UNPACK_IMAGE_HEIGHT),In=F.getParameter(F.UNPACK_SKIP_PIXELS),Ss=F.getParameter(F.UNPACK_SKIP_ROWS),dn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ae.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ae.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ft),F.pixelStorei(F.UNPACK_SKIP_ROWS,qt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,$t);const Sr=V.isDataArrayTexture||V.isData3DTexture,we=lt.isDataArrayTexture||lt.isData3DTexture;if(V.isRenderTargetTexture||V.isDepthTexture){const Yn=Q.get(V),Ar=Q.get(lt),Mn=Q.get(Yn.__renderTarget),Ai=Q.get(Ar.__renderTarget);xt.bindFramebuffer(F.READ_FRAMEBUFFER,Mn.__webglFramebuffer),xt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let wi=0;wi<Ot;wi++)Sr&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Q.get(V).__webglTexture,ut,$t+wi),V.isDepthTexture?(we&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Q.get(lt).__webglTexture,ut,Se+wi),F.blitFramebuffer(Ft,qt,Rt,kt,Bt,ue,Rt,kt,F.DEPTH_BUFFER_BIT,F.NEAREST)):we?F.copyTexSubImage3D(Gt,ut,Bt,ue,Se+wi,Ft,qt,Rt,kt):F.copyTexSubImage2D(Gt,ut,Bt,ue,Se+wi,Ft,qt,Rt,kt);xt.bindFramebuffer(F.READ_FRAMEBUFFER,null),xt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else we?V.isDataTexture||V.isData3DTexture?F.texSubImage3D(Gt,ut,Bt,ue,Se,Rt,kt,Ot,un,de,Ae.data):lt.isCompressedArrayTexture?F.compressedTexSubImage3D(Gt,ut,Bt,ue,Se,Rt,kt,Ot,un,Ae.data):F.texSubImage3D(Gt,ut,Bt,ue,Se,Rt,kt,Ot,un,de,Ae):V.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ut,Bt,ue,Rt,kt,un,de,Ae.data):V.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ut,Bt,ue,Ae.width,Ae.height,un,Ae.data):F.texSubImage2D(F.TEXTURE_2D,ut,Bt,ue,Rt,kt,un,de,Ae);F.pixelStorei(F.UNPACK_ROW_LENGTH,si),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pe),F.pixelStorei(F.UNPACK_SKIP_PIXELS,In),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ss),F.pixelStorei(F.UNPACK_SKIP_IMAGES,dn),ut===0&&lt.generateMipmaps&&F.generateMipmap(Gt),xt.unbindTexture()},this.copyTextureToTexture3D=function(V,lt,pt=null,mt=null,ut=0){return V.isTexture!==!0&&(Or("WebGLRenderer: copyTextureToTexture3D function signature has changed."),pt=arguments[0]||null,mt=arguments[1]||null,V=arguments[2],lt=arguments[3],ut=arguments[4]||0),Or('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(V,lt,pt,mt,ut)},this.initRenderTarget=function(V){Q.get(V).__webglFramebuffer===void 0&&C.setupRenderTarget(V)},this.initTexture=function(V){V.isCubeTexture?C.setTextureCube(V,0):V.isData3DTexture?C.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?C.setTexture2DArray(V,0):C.setTexture2D(V,0),xt.unbindTexture()},this.resetState=function(){T=0,L=0,B=null,xt.reset(),Vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}class eu{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=n}clone(){return new eu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ho extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ep{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Al,this.updateRanges=[],this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qe=new G;class ea{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix4(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyNormalMatrix(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.transformDirection(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Fn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ge(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Fn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Fn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Fn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Fn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ea(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ih=new G,Lh=new re,zh=new re,ry=new G,Dh=new Ut,Da=new G,lc=new cn,kh=new Ut,uc=new gr;class ay extends ee{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Nu,this.bindMatrix=new Ut,this.bindMatrixInverse=new Ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Si),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Da),this.boundingBox.expandByPoint(Da)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new cn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Da),this.boundingSphere.expandByPoint(Da)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lc.copy(this.boundingSphere),lc.applyMatrix4(s),t.ray.intersectsSphere(lc)!==!1&&(kh.copy(s).invert(),uc.copy(t.ray).applyMatrix4(kh),!(this.boundingBox!==null&&uc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,uc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new re,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Nu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===pm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Lh.fromBufferAttribute(s.attributes.skinIndex,t),zh.fromBufferAttribute(s.attributes.skinWeight,t),Ih.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=zh.getComponent(r);if(a!==0){const o=Lh.getComponent(r);Dh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(ry.copy(Ih).applyMatrix4(Dh),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class np extends Ie{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ys extends Ve{constructor(t=null,e=1,n=1,s,r,a,o,c,l=qe,u=qe,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nh=new Ut,oy=new Ut;class nu{constructor(t=[],e=[]){this.uuid=Gn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ut)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ut;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:oy;Nh.multiplyMatrices(o,e[r]),Nh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new nu(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new ys(e,t,t,Ke,En);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new np),this.bones.push(a),this.boneInverses.push(new Ut().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const a=e[s];t.bones.push(a.uuid);const o=n[s];t.boneInverses.push(o.toArray())}return t}}class Cn extends Me{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Os=new Ut,Uh=new Ut,ka=[],Oh=new Si,cy=new Ut,Cr=new ee,Pr=new cn;class Ms extends ee{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Cn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,cy)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Os),Oh.copy(t.boundingBox).applyMatrix4(Os),this.boundingBox.union(Oh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new cn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Os),Pr.copy(t.boundingSphere).applyMatrix4(Os),this.boundingSphere.union(Pr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Cr.geometry=this.geometry,Cr.material=this.material,Cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(n),t.ray.intersectsSphere(Pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Os),Uh.multiplyMatrices(n,Os),Cr.matrixWorld=Uh,Cr.raycast(t,ka);for(let a=0,o=ka.length;a<o;a++){const c=ka[a];c.instanceId=r,c.object=this,e.push(c)}ka.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Cn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ys(new Float32Array(s*this.count),s,this.count,Xl,En));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ip extends Vn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const go=new G,xo=new G,Fh=new Ut,Ir=new gr,Na=new cn,hc=new G,Bh=new G;class iu extends Ie{constructor(t=new he,e=new ip){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)go.fromBufferAttribute(e,s-1),xo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=go.distanceTo(xo);t.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(s),Na.radius+=r,t.ray.intersectsSphere(Na)===!1)return;Fh.copy(s).invert(),Ir.copy(t.ray).applyMatrix4(Fh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=u.getX(x),M=u.getX(x+1),y=Ua(this,t,Ir,c,p,M);y&&e.push(y)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(f),p=Ua(this,t,Ir,c,x,m);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=Ua(this,t,Ir,c,x,x+1);p&&e.push(p)}if(this.isLineLoop){const x=Ua(this,t,Ir,c,g-1,f);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ua(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(go.fromBufferAttribute(a,s),xo.fromBufferAttribute(a,r),e.distanceSqToSegment(go,xo,hc,Bh)>n)return;hc.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(hc);if(!(c<t.near||c>t.far))return{distance:c,point:Bh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Hh=new G,Gh=new G;class ly extends iu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Hh.fromBufferAttribute(e,s),Gh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hh.distanceTo(Gh);t.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class uy extends iu{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class sp extends Vn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Vh=new Ut,Tl=new gr,Oa=new cn,Fa=new G;class hy extends Ie{constructor(t=new he,e=new sp){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(s),Oa.radius+=r,t.ray.intersectsSphere(Oa)===!1)return;Vh.copy(s).invert(),Tl.copy(t.ray).applyMatrix4(Vh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,x=f;g<x;g++){const m=l.getX(g);Fa.fromBufferAttribute(h,m),Wh(Fa,m,c,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,x=f;g<x;g++)Fa.fromBufferAttribute(h,g),Wh(Fa,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Wh(i,t,e,n,s,r,a){const o=Tl.distanceSqToPoint(i);if(o<e){const c=new G;Tl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class fy extends Ve{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ei{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new Ct:new G);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new G,s=[],r=[],a=[],o=new G,c=new Ut;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new G)}r[0]=new G,a[0]=new G;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(De(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(De(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class su extends ei{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new Ct){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class dy extends su{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ru(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Ba=new G,fc=new ru,dc=new ru,pc=new ru;class py extends ei{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new G){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Ba.subVectors(s[0],s[1]).add(s[0]),l=Ba);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Ba.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Ba),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),fc.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,x,m),dc.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,x,m),pc.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(fc.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),dc.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),pc.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(fc.calc(c),dc.calc(c),pc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new G().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Xh(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function my(i,t){const e=1-i;return e*e*t}function gy(i,t){return 2*(1-i)*i*t}function xy(i,t){return i*i*t}function jr(i,t,e,n){return my(i,t)+gy(i,e)+xy(i,n)}function _y(i,t){const e=1-i;return e*e*e*t}function vy(i,t){const e=1-i;return 3*e*e*i*t}function yy(i,t){return 3*(1-i)*i*i*t}function My(i,t){return i*i*i*t}function Yr(i,t,e,n,s){return _y(i,t)+vy(i,e)+yy(i,n)+My(i,s)}class rp extends ei{constructor(t=new Ct,e=new Ct,n=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ct){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Yr(t,s.x,r.x,a.x,o.x),Yr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class by extends ei{constructor(t=new G,e=new G,n=new G,s=new G){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new G){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Yr(t,s.x,r.x,a.x,o.x),Yr(t,s.y,r.y,a.y,o.y),Yr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ap extends ei{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sy extends ei{constructor(t=new G,e=new G){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new G){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new G){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class op extends ei{constructor(t=new Ct,e=new Ct,n=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ct){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(jr(t,s.x,r.x,a.x),jr(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ay extends ei{constructor(t=new G,e=new G,n=new G){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new G){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(jr(t,s.x,r.x,a.x),jr(t,s.y,r.y,a.y),jr(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cp extends ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Xh(o,c.x,l.x,u.x,h.x),Xh(o,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}}var jh=Object.freeze({__proto__:null,ArcCurve:dy,CatmullRomCurve3:py,CubicBezierCurve:rp,CubicBezierCurve3:by,EllipseCurve:su,LineCurve:ap,LineCurve3:Sy,QuadraticBezierCurve:op,QuadraticBezierCurve3:Ay,SplineCurve:cp});class wy extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new jh[s.type]().fromJSON(s))}return this}}class Ty extends wy{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ap(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new op(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new rp(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s),new Ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new cp(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new su(t,e,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class au extends he{constructor(t=[new Ct(0,-.5),new Ct(.5,0),new Ct(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=De(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/e,h=new G,d=new Ct,f=new G,g=new G,x=new G;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let M=0;M<=e;M++){const y=n+M*u*s,v=Math.sin(y),w=Math.cos(y);for(let T=0;T<=t.length-1;T++){h.x=t[T].x*v,h.y=t[T].y,h.z=t[T].x*w,a.push(h.x,h.y,h.z),d.x=M/e,d.y=T/(t.length-1),o.push(d.x,d.y);const L=c[3*T+0]*v,B=c[3*T+1],E=c[3*T+0]*w;l.push(L,B,E)}}for(let M=0;M<e;M++)for(let y=0;y<t.length-1;y++){const v=y+M*t.length,w=v,T=v+t.length,L=v+t.length+1,B=v+1;r.push(w,T,B),r.push(L,B,T)}this.setIndex(r),this.setAttribute("position",new Wt(a,3)),this.setAttribute("uv",new Wt(o,2)),this.setAttribute("normal",new Wt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new au(t.points,t.segments,t.phiStart,t.phiLength)}}class ou extends au{constructor(t=1,e=1,n=4,s=8){const r=new Ty;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new ou(t.radius,t.length,t.capSegments,t.radialSegments)}}class cu extends he{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new G,u=new Ct;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Wt(a,3)),this.setAttribute("normal",new Wt(o,3)),this.setAttribute("uv",new Wt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ke extends he{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;M(),a===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Wt(h,3)),this.setAttribute("normal",new Wt(d,3)),this.setAttribute("uv",new Wt(f,2));function M(){const v=new G,w=new G;let T=0;const L=(e-t)/n;for(let B=0;B<=r;B++){const E=[],A=B/r,O=A*(e-t)+t;for(let j=0;j<=s;j++){const W=j/s,$=W*c+o,b=Math.sin($),S=Math.cos($);w.x=O*b,w.y=-A*n+m,w.z=O*S,h.push(w.x,w.y,w.z),v.set(b,L,S).normalize(),d.push(v.x,v.y,v.z),f.push(W,1-A),E.push(g++)}x.push(E)}for(let B=0;B<s;B++)for(let E=0;E<r;E++){const A=x[E][B],O=x[E+1][B],j=x[E+1][B+1],W=x[E][B+1];(t>0||E!==0)&&(u.push(A,O,W),T+=3),(e>0||E!==r-1)&&(u.push(O,j,W),T+=3)}l.addGroup(p,T,0),p+=T}function y(v){const w=g,T=new Ct,L=new G;let B=0;const E=v===!0?t:e,A=v===!0?1:-1;for(let j=1;j<=s;j++)h.push(0,m*A,0),d.push(0,A,0),f.push(.5,.5),g++;const O=g;for(let j=0;j<=s;j++){const $=j/s*c+o,b=Math.cos($),S=Math.sin($);L.x=E*S,L.y=m*A,L.z=E*b,h.push(L.x,L.y,L.z),d.push(0,A,0),T.x=b*.5+.5,T.y=S*.5*A+.5,f.push(T.x,T.y),g++}for(let j=0;j<s;j++){const W=w+j,$=O+j;v===!0?u.push($,$+1,W):u.push($+1,$,W),B+=3}l.addGroup(p,B,v===!0?1:2),p+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ke(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _s extends ke{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new _s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ro extends he{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Wt(r,3)),this.setAttribute("normal",new Wt(r.slice(),3)),this.setAttribute("uv",new Wt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const y=new G,v=new G,w=new G;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],v),f(e[T+2],w),c(y,v,w,M)}function c(M,y,v,w){const T=w+1,L=[];for(let B=0;B<=T;B++){L[B]=[];const E=M.clone().lerp(v,B/T),A=y.clone().lerp(v,B/T),O=T-B;for(let j=0;j<=O;j++)j===0&&B===T?L[B][j]=E:L[B][j]=E.clone().lerp(A,j/O)}for(let B=0;B<T;B++)for(let E=0;E<2*(T-B)-1;E++){const A=Math.floor(E/2);E%2===0?(d(L[B][A+1]),d(L[B+1][A]),d(L[B][A])):(d(L[B][A+1]),d(L[B+1][A+1]),d(L[B+1][A]))}}function l(M){const y=new G;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(M),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function u(){const M=new G;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const v=m(M)/2/Math.PI+.5,w=p(M)/Math.PI+.5;a.push(v,1-w)}g(),h()}function h(){for(let M=0;M<a.length;M+=6){const y=a[M+0],v=a[M+2],w=a[M+4],T=Math.max(y,v,w),L=Math.min(y,v,w);T>.9&&L<.1&&(y<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){const v=M*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){const M=new G,y=new G,v=new G,w=new G,T=new Ct,L=new Ct,B=new Ct;for(let E=0,A=0;E<r.length;E+=9,A+=6){M.set(r[E+0],r[E+1],r[E+2]),y.set(r[E+3],r[E+4],r[E+5]),v.set(r[E+6],r[E+7],r[E+8]),T.set(a[A+0],a[A+1]),L.set(a[A+2],a[A+3]),B.set(a[A+4],a[A+5]),w.copy(M).add(y).add(v).divideScalar(3);const O=m(w);x(T,A+0,M,O),x(L,A+2,y,O),x(B,A+4,v,O)}}function x(M,y,v,w){w<0&&M.x===1&&(a[y]=M.x-1),v.x===0&&v.z===0&&(a[y]=w/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ro(t.vertices,t.indices,t.radius,t.details)}}class lu extends Ro{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new lu(t.radius,t.detail)}}class qi extends Ro{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new qi(t.radius,t.detail)}}class Co extends he{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=t;const d=(e-t)/s,f=new G,g=new Ct;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const M=p+m,y=M,v=M+n+1,w=M+n+2,T=M+1;o.push(y,v,T),o.push(v,w,T)}}this.setIndex(o),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(l,3)),this.setAttribute("uv",new Wt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Po extends he{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new G,d=new G,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n;let v=0;p===0&&a===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let w=0;w<=e;w++){const T=w/e;h.x=-t*Math.cos(s+T*r)*Math.sin(a+y*o),h.y=t*Math.cos(a+y*o),h.z=t*Math.sin(s+T*r)*Math.sin(a+y*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(T+v,1-y),M.push(l++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const y=u[p][M+1],v=u[p][M],w=u[p+1][M],T=u[p+1][M+1];(p!==0||a>0)&&f.push(y,v,T),(p!==n-1||c<Math.PI)&&f.push(v,w,T)}this.setIndex(f),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Po(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class uu extends Vn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$l,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ni extends uu{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return De(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class jn extends Vn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$l,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function Ha(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ey(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ry(i){function t(s,r){return i[s]-i[r]}const e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function Yh(i,t,e){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=e[r]*t;for(let c=0;c!==t;++c)s[a++]=i[o+c]}return s}function lp(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push.apply(e,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=i[s++];while(r!==void 0)}class ca{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break e}a=e.length;break n}if(!(t>=r)){const o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Cy extends ca{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xs,endingEnd:Xs}}intervalChanged_(t,e,n){const s=this.parameterPositions;let r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case js:r=t,o=2*e-n;break;case po:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case js:a=t,c=2*n-e;break;case po:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}const l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let w=0;w!==o;++w)r[w]=p*a[u+w]+M*a[l+w]+y*a[c+w]+v*a[h+w];return r}}class up extends ca{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class Py extends ca{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class ii{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ha(e,this.TimeBufferType),this.values=Ha(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ha(t.times,Array),values:Ha(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Py(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new up(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Cy(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Jr:e=this.InterpolantFactoryMethodDiscrete;break;case Qr:e=this.InterpolantFactoryMethodLinear;break;case ko:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return Qr;case this.InterpolantFactoryMethodSmooth:return ko}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Ey(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ko,r=t.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const x=e[h+g];if(x!==e[d+g]||x!==e[f+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}}ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=Qr;class vr extends ii{constructor(t,e,n){super(t,e,n)}}vr.prototype.ValueTypeName="bool";vr.prototype.ValueBufferType=Array;vr.prototype.DefaultInterpolation=Jr;vr.prototype.InterpolantFactoryMethodLinear=void 0;vr.prototype.InterpolantFactoryMethodSmooth=void 0;class hp extends ii{}hp.prototype.ValueTypeName="color";class fr extends ii{}fr.prototype.ValueTypeName="number";class Iy extends ca{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e);let l=t*o;for(let u=l+o;l!==u;l+=4)xe.slerpFlat(r,0,a,l-o,a,l,c);return r}}class dr extends ii{InterpolantFactoryMethodLinear(t){return new Iy(this.times,this.values,this.getValueSize(),t)}}dr.prototype.ValueTypeName="quaternion";dr.prototype.InterpolantFactoryMethodSmooth=void 0;class yr extends ii{constructor(t,e,n){super(t,e,n)}}yr.prototype.ValueTypeName="string";yr.prototype.ValueBufferType=Array;yr.prototype.DefaultInterpolation=Jr;yr.prototype.InterpolantFactoryMethodLinear=void 0;yr.prototype.InterpolantFactoryMethodSmooth=void 0;class pr extends ii{}pr.prototype.ValueTypeName="vector";class vs{constructor(t="",e=-1,n=[],s=Zl){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Gn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,s=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(zy(n[a]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,a=n.length;r!==a;++r)e.push(ii.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){const r=e.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Ry(c);c=Yh(c,1,u),l=Yh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new fr(".morphTargetInfluences["+e[o].name+"]",c,l).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=t.length;o<c;o++){const l=t[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,x){if(f.length!==0){const m=[],p=[];lp(f,m,p,g),m.length!==0&&x.push(new h(d,m,p))}},s=[],r=t.name||"default",a=t.fps||30,o=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const y=d[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}s.push(new fr(".morphTargetInfluence["+x+"]",m,p))}c=f.length*a}else{const f=".bones["+e[h].name+"]";n(pr,f+".position",d,"pos",s),n(dr,f+".quaternion",d,"rot",s),n(pr,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,s=t.length;n!==s;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ly(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fr;case"vector":case"vector2":case"vector3":case"vector4":return pr;case"color":return hp;case"quaternion":return dr;case"bool":case"boolean":return vr;case"string":return yr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function zy(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Ly(i.type);if(i.times===void 0){const e=[],n=[];lp(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const Gi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Dy{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const ky=new Dy;class Mr{constructor(t){this.manager=t!==void 0?t:ky,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Mr.DEFAULT_MATERIAL_NAME="__DEFAULT";const ui={};class Ny extends Error{constructor(t,e){super(t),this.response=e}}class fp extends Mr{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Gi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(ui[t]!==void 0){ui[t].push({onLoad:e,onProgress:n,onError:s});return}ui[t]=[],ui[t].push({onLoad:e,onProgress:n,onError:s});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ui[t],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){M();function M(){h.read().then(({done:y,value:v})=>{if(y)p.close();else{x+=v.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let T=0,L=u.length;T<L;T++){const B=u[T];B.onProgress&&B.onProgress(w)}p.enqueue(v),M()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Ny(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Gi.add(t,l);const u=ui[t];delete ui[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=ui[t];if(u===void 0)throw this.manager.itemError(t),l;delete ui[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Uy extends Mr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Gi.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=ta("img");function c(){u(),Gi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(h){u(),s&&s(h),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Oy extends Mr{constructor(t){super(t)}load(t,e,n,s){const r=new Ve,a=new Uy(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Io extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class dp extends Io{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const mc=new Ut,Kh=new G,qh=new G;class hu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xr,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Kh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kh),qh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qh),e.updateMatrixWorld(),mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Fy extends hu{constructor(){super(new nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=ur*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class By extends Io{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Fy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Zh=new Ut,Lr=new G,gc=new G;class Hy extends hu{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Lr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Lr),gc.copy(n.position),gc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(gc),n.updateMatrixWorld(),s.makeTranslation(-Lr.x,-Lr.y,-Lr.z),Zh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zh)}}class Gy extends Io{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Hy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Vy extends hu{constructor(){super(new wo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fu extends Io{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new Vy}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Kr{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,s=t.length;n<s;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class El extends he{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Wy extends Mr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Gi.get(t);if(a!==void 0){if(r.manager.itemStart(t),a.then){a.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Gi.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Gi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});Gi.add(t,c),r.manager.itemStart(t)}}class Xy{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=$h(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=$h();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function $h(){return performance.now()}class jy{constructor(t,e,n){this.binding=t,this.valueSize=n;let s,r,a;switch(e){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,s=this.valueSize,r=t*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,s=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=e*this._origIndex;this._mixBufferRegion(n,s,c,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){o.setValue(n,s);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,s=n*this._origIndex;t.getValue(e,s);for(let r=n,a=s;r!==a;++r)e[r]=e[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,s){xe.slerpFlat(t,e,t,e,t,n,s)}_slerpAdditive(t,e,n,s,r){const a=this._workIndex*r;xe.multiplyQuaternionsFlat(t,a,t,e,t,n),xe.slerpFlat(t,e,t,e,t,a,s)}_lerp(t,e,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=e+o;t[c]=t[c]*a+t[n+o]*s}}_lerpAdditive(t,e,n,s,r){for(let a=0;a!==r;++a){const o=e+a;t[o]=t[o]+t[n+a]*s}}}const du="\\[\\]\\.:\\/",Yy=new RegExp("["+du+"]","g"),pu="[^"+du+"]",Ky="[^"+du.replace("\\.","")+"]",qy=/((?:WC+[\/:])*)/.source.replace("WC",pu),Zy=/(WCOD+)?/.source.replace("WCOD",Ky),$y=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pu),Jy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pu),Qy=new RegExp("^"+qy+Zy+$y+Jy+"$"),t1=["material","materials","bones","map"];class e1{constructor(t,e,n){const s=n||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class me{constructor(t,e,n){this.path=e,this.parsedPath=n||me.parseTrackName(e),this.node=me.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new me.Composite(t,e,n):new me(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Yy,"")}static parseTrackName(t){const e=Qy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);t1.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===e||o.uuid===e)return o;const c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=me.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[s];if(a===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}me.Composite=e1;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class n1{constructor(t,e,n=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=s;const r=e.tracks,a=r.length,o=new Array(a),c={endingStart:Xs,endingEnd:Xs};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=mm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const s=this._clip.duration,r=t._clip.duration,a=r/s,o=s/r;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=t/a,l[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,s){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const c=(t-r)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case xm:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case Zl:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(s,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let s=this.time+t,r=this._loopCount;const a=n===gm;if(t===0)return r===-1?s:a&&(r&1)===1?e-s:s;if(n===ql){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else if(s<0)s=0;else{this.time=s;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=e||s<0){const o=Math.floor(s/e);s-=e*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return e-s}return s}_setEndings(t,e,n){const s=this._interpolantSettings;n?(s.endingStart=js,s.endingEnd=js):(t?s.endingStart=this.zeroSlopeAtStart?js:Xs:s.endingStart=po,e?s.endingEnd=this.zeroSlopeAtEnd?js:Xs:s.endingEnd=po)}_scheduleFading(t,e,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=e,o[1]=r+t,c[1]=n,this}}const i1=new Float32Array(1);class mu extends Zi{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,s=t._clip.tracks,r=s.length,a=t._propertyBindings,o=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=s[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const x=e&&e._propertyBindings[h].binding.parsedPath;g=new jy(me.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,s=t._clip.uuid,r=this._actionsByClip[s];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,s,n)}const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const s=this._actions,r=this._actionsByClip;let a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=s.length,s.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],s=t._cacheIndex;n._cacheIndex=s,e[s]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=t._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),t._byClipCacheIndex=null;const h=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[e];a===void 0&&(a={},s[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new up(new Float32Array(2),new Float32Array(2),1,i1),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const s=e||this._root,r=s.uuid;let a=typeof t=="string"?vs.findByName(s,t):t;const o=a!==null?a.uuid:t,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Zl),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new n1(this,a,e,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(t,e){const n=e||this._root,s=n.uuid,r=typeof t=="string"?vs.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,s=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(s,t,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,e[u]=h,e.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[e];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class s1 extends ep{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Jh=new Ut;class r1{constructor(t,e,n=0,s=1/0){this.ray=new gr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ql,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Jh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jh),this}intersectObject(t,e=!0,n=[]){return Rl(t,this,n,e),n.sort(Qh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Rl(t[s],this,n,e);return n.sort(Qh),n}}function Qh(i,t){return i.distance-t.distance}function Rl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Rl(r[a],t,e,!0)}}class tf{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(De(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class a1 extends Zi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);const ef={type:"change"},gu={type:"start"},pp={type:"end"},Ga=new gr,nf=new Fi,o1=Math.cos(70*vi.DEG2RAD),Fe=new G,hn=2*Math.PI,ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xc=1e-6;class c1 extends a1{constructor(t,e=null){super(t,e),this.state=ye.NONE,this.enabled=!0,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Js.ROTATE,MIDDLE:Js.DOLLY,RIGHT:Js.PAN},this.touches={ONE:Hi.ROTATE,TWO:Hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new xe,this._lastTargetPosition=new G,this._quat=new xe().setFromUnitVectors(t.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new tf,this._sphericalDelta=new tf,this._scale=1,this._panOffset=new G,this._rotateStart=new Ct,this._rotateEnd=new Ct,this._rotateDelta=new Ct,this._panStart=new Ct,this._panEnd=new Ct,this._panDelta=new Ct,this._dollyStart=new Ct,this._dollyEnd=new Ct,this._dollyDelta=new Ct,this._dollyDirection=new G,this._mouse=new Ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=u1.bind(this),this._onPointerDown=l1.bind(this),this._onPointerUp=h1.bind(this),this._onContextMenu=_1.bind(this),this._onMouseWheel=p1.bind(this),this._onKeyDown=m1.bind(this),this._onTouchStart=g1.bind(this),this._onTouchMove=x1.bind(this),this._onMouseDown=f1.bind(this),this._onMouseMove=d1.bind(this),this._interceptControlDown=v1.bind(this),this._interceptControlUp=y1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ef),this.update(),this.state=ye.NONE}update(t=null){const e=this.object.position;Fe.copy(e).sub(this.target),Fe.applyQuaternion(this._quat),this._spherical.setFromVector3(Fe),this.autoRotate&&this.state===ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=hn:n>Math.PI&&(n-=hn),s<-Math.PI?s+=hn:s>Math.PI&&(s-=hn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Fe.setFromSpherical(this._spherical),Fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Fe.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new G(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new G(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ga.origin.copy(this.object.position),Ga.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ga.direction))<o1?this.object.lookAt(this.target):(nf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ga.intersectPlane(nf,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>xc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xc||this._lastTargetPosition.distanceToSquared(this.target)>xc?(this.dispatchEvent(ef),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?hn/60*this.autoRotateSpeed*t:hn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fe.setFromMatrixColumn(e,0),Fe.multiplyScalar(-t),this._panOffset.add(Fe)}_panUp(t,e){this.screenSpacePanning===!0?Fe.setFromMatrixColumn(e,1):(Fe.setFromMatrixColumn(e,0),Fe.crossVectors(this.object.up,Fe)),Fe.multiplyScalar(t),this._panOffset.add(Fe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Fe.copy(s).sub(this.target);let r=Fe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function l1(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function u1(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function h1(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pp),this.state=ye.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function f1(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Js.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ye.DOLLY;break;case Js.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}break;case Js.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(gu)}function d1(i){switch(this.state){case ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function p1(i){this.enabled===!1||this.enableZoom===!1||this.state!==ye.NONE||(i.preventDefault(),this.dispatchEvent(gu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(pp))}function m1(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function g1(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Hi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ye.TOUCH_ROTATE;break;case Hi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ye.TOUCH_PAN;break;default:this.state=ye.NONE}break;case 2:switch(this.touches.TWO){case Hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ye.TOUCH_DOLLY_PAN;break;case Hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ye.TOUCH_DOLLY_ROTATE;break;default:this.state=ye.NONE}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(gu)}function x1(i){switch(this._trackPointer(i),this.state){case ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ye.NONE}}function _1(i){this.enabled!==!1&&i.preventDefault()}function v1(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function y1(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bs(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new he;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=sf(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let x=0;x<a[u].length;++x)f.push(a[u][x][d]);const g=sf(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function sf(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new Me(a,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){const x=u.getComponent(d,g);o.setComponent(d+h,g,x)}}else a.set(u.array,c);c+=u.count*e}return s!==void 0&&(o.gpuType=s),o}function rf(i,t){if(t===_m)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Sl||t===Od){let e=i.getIndex();if(e===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=e.count-2,s=[];if(t===Sl)for(let a=1;a<=n;a++)s.push(e.getX(0)),s.push(e.getX(a)),s.push(e.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(e.getX(a)),s.push(e.getX(a+1)),s.push(e.getX(a+2))):(s.push(e.getX(a+2)),s.push(e.getX(a+1)),s.push(e.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}class Cl extends Mr{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new w1(e)}),this.register(function(e){return new T1(e)}),this.register(function(e){return new k1(e)}),this.register(function(e){return new N1(e)}),this.register(function(e){return new U1(e)}),this.register(function(e){return new R1(e)}),this.register(function(e){return new C1(e)}),this.register(function(e){return new P1(e)}),this.register(function(e){return new I1(e)}),this.register(function(e){return new A1(e)}),this.register(function(e){return new L1(e)}),this.register(function(e){return new E1(e)}),this.register(function(e){return new D1(e)}),this.register(function(e){return new z1(e)}),this.register(function(e){return new b1(e)}),this.register(function(e){return new O1(e)}),this.register(function(e){return new F1(e)})}load(t,e,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Kr.extractUrlBase(t);a=Kr.resolveURL(l,this.path)}else a=Kr.extractUrlBase(t);this.manager.itemStart(t);const o=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new fp(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,a,function(u){e(u),r.manager.itemEnd(t)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===mp){try{a[se.KHR_BINARY_GLTF]=new B1(t)}catch(h){s&&s(h);return}r=JSON.parse(a[se.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Q1(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case se.KHR_MATERIALS_UNLIT:a[h]=new S1;break;case se.KHR_DRACO_MESH_COMPRESSION:a[h]=new H1(r,this.dracoLoader);break;case se.KHR_TEXTURE_TRANSFORM:a[h]=new G1;break;case se.KHR_MESH_QUANTIZATION:a[h]=new V1;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(t,e){const n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}}function M1(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const se={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class b1{constructor(t){this.parser=t,this.name=se.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let s=e.cache.get(n);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new Nt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],an);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new fu(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Gy(u),l.distance=h;break;case"spot":l=new By(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,mi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(e.cache,o,c)})}}class S1{constructor(){this.name=se.KHR_MATERIALS_UNLIT}getMaterialType(){return Ge}extendParams(t,e,n){const s=[];t.color=new Nt(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],an),t.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,Oe))}return Promise.all(s)}}class A1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class w1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(e.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Ct(o,o)}return Promise.all(r)}}class T1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class E1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(e.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(e.iridescenceIOR=a.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class R1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new Nt(0,0,0),e.sheenRoughness=0,e.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],an)}return a.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",a.sheenColorTexture,Oe)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class C1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(e.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class P1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",a.thicknessTexture)),e.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return e.attenuationColor=new Nt().setRGB(o[0],o[1],o[2],an),Promise.all(r)}}class I1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class L1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return e.specularColor=new Nt().setRGB(o[0],o[1],o[2],an),a.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",a.specularColorTexture,Oe)),Promise.all(r)}}class z1{constructor(t){this.parser=t,this.name=se.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return e.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",a.bumpTexture)),Promise.all(r)}}class D1{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(e.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(e.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class k1{constructor(t){this.parser=t,this.name=se.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,a)}}class N1{constructor(t){this.parser=t,this.name=se.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class U1{constructor(t){this.parser=t,this.name=se.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class O1{constructor(t){this.name=se.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class F1{constructor(t){this.name=se.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=e.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==wn.TRIANGLES&&l.mode!==wn.TRIANGLE_STRIP&&l.mode!==wn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const g of h){const x=new Ut,m=new G,p=new xe,M=new G(1,1,1),y=new Ms(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&M.fromBufferAttribute(c.SCALE,v),y.setMatrixAt(v,x.compose(m,p,M));for(const v in c)if(v==="_COLOR_0"){const w=c[v];y.instanceColor=new Cn(w.array,w.itemSize,w.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);Ie.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const mp="glTF",zr=12,af={JSON:1313821514,BIN:5130562};class B1{constructor(t){this.name=se.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,zr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==mp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-zr,r=new DataView(t,zr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===af.JSON){const l=new Uint8Array(t,zr+a,o);this.content=n.decode(l)}else if(c===af.BIN){const l=zr+a;this.body=t.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class H1{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=se.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Pl[u]||u.toLowerCase();o[h]=a[u]}for(const u in t.attributes){const h=Pl[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[t.attributes[u]],f=nr[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const g in f.attributes){const x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}h(f)},o,l,an,d)})})}}class G1{constructor(){this.name=se.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class V1{constructor(){this.name=se.KHR_MESH_QUANTIZATION}}class gp extends ca{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let a=0;a!==s;a++)e[a]=n[r+a];return e}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-e,h=(n-e)/u,d=h*h,f=d*h,g=t*l,x=g-l,m=-2*f+3*d,p=f-d,M=1-m,y=p-d+h;for(let v=0;v!==o;v++){const w=a[x+v+o],T=a[x+v+c]*u,L=a[g+v+o],B=a[g+v]*u;r[v]=M*w+y*T+m*L+p*B}return r}}const W1=new xe;class X1 extends gp{interpolate_(t,e,n,s){const r=super.interpolate_(t,e,n,s);return W1.fromArray(r).normalize().toArray(r),r}}const wn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},of={9728:qe,9729:He,9984:Rd,9985:so,9986:Ur,9987:xn},cf={33071:Jn,33648:fo,10497:Ki},_c={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Li={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},j1={CUBICSPLINE:void 0,LINEAR:Qr,STEP:Jr},vc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Y1(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new uu({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Mi})),i.DefaultMaterial}function ss(i,t,e){for(const n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function mi(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function K1(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(n){const d=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function q1(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Z1(i){let t;const e=i.extensions&&i.extensions[se.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+yc(e.attributes):t=i.indices+":"+yc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+yc(i.targets[n]);return t}function yc(i){let t="";const e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function Il(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $1(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const J1=new Ut;class Q1{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new M1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Oy(this.options.manager):this.textureLoader=new Wy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new fp(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ss(r,o,s),mi(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const a=e[s].joints;for(let o=0,c=a.length;o<c;o++)t[a[o]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const a=t[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const s=t(e[n]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[se.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Kr.resolveURL(e.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){const e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const a=_c[s.type],o=nr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Me(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=_c[s.type],l=nr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(f&&f!==h){const p=Math.floor(d/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=e.cache.get(M);y||(x=new l(o,p*f,s.count*f/u),y=new ep(x,f/u),e.cache.add(M,y)),m=new ea(y,c,d%f/u,g)}else o===null?x=new l(s.count*c):x=new l(o,d,s.count*c),m=new Me(x,c,g);if(s.sparse!==void 0){const p=_c.SCALAR,M=nr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,w=new M(a[1],y,s.sparse.count*p),T=new l(a[2],v,s.sparse.count*c);o!==null&&(m=new Me(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,B=w.length;L<B;L++){const E=w[L];if(m.setX(E,T[L*c]),c>=2&&m.setY(E,T[L*c+1]),c>=3&&m.setZ(E,T[L*c+2]),c>=4&&m.setW(E,T[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,a=e.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(t,r,o)}loadTextureImage(t,e,n){const s=this,r=this.json,a=r.textures[t],o=r.images[e],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=of[d.magFilter]||He,u.minFilter=of[d.minFilter]||xn,u.wrapS=cf[d.wrapS]||Ki,u.wrapT=cf[d.wrapT]||Ki,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qe&&u.minFilter!==He,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const a=s.images[t],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;e.isImageBitmapLoader===!0&&(g=function(x){const m=new Ve(x);m.needsUpdate=!0,d(m)}),e.load(Kr.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),mi(h,a),h.userData.mimeType=a.mimeType||$1(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[se.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[se.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[se.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new sp,Vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ip,Vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return uu}loadMaterial(t){const e=this,n=this.json,s=this.extensions,r=n.materials[t];let a;const o={},c=r.extensions||{},l=[];if(c[se.KHR_MATERIALS_UNLIT]){const h=s[se.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,e))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Nt(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],an),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(o,"map",h.baseColorTexture,Oe)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,o)})))}r.doubleSided===!0&&(o.side=sn);const u=r.alphaMode||vc.OPAQUE;if(u===vc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===vc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ge&&(l.push(e.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ct(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Ge&&(l.push(e.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ge){const h=r.emissiveFactor;o.emissive=new Nt().setRGB(h[0],h[1],h[2],an)}return r.emissiveTexture!==void 0&&a!==Ge&&l.push(e.assignTexture(o,"emissiveMap",r.emissiveTexture,Oe)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),mi(h,r),e.associations.set(h,{materials:t}),r.extensions&&ss(s,h,r),h})}createUniqueName(t){const e=me.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[se.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(c){return lf(c,o,e)})}const a=[];for(let o=0,c=t.length;o<c;o++){const l=t[o],u=Z1(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[se.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=lf(new he,l,e),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,s=this.extensions,r=n.meshes[t],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?Y1(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(e.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){const x=u[f],m=a[f];let p;const M=l[f];if(m.mode===wn.TRIANGLES||m.mode===wn.TRIANGLE_STRIP||m.mode===wn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new ay(x,M):new ee(x,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===wn.TRIANGLE_STRIP?p.geometry=rf(p.geometry,Od):m.mode===wn.TRIANGLE_FAN&&(p.geometry=rf(p.geometry,Sl));else if(m.mode===wn.LINES)p=new ly(x,M);else if(m.mode===wn.LINE_STRIP)p=new iu(x,M);else if(m.mode===wn.LINE_LOOP)p=new uy(x,M);else if(m.mode===wn.POINTS)p=new hy(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&q1(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),mi(p,r),m.extensions&&ss(s,p,m),e.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)e.associations.set(h[f],{meshes:t,primitives:f});if(h.length===1)return r.extensions&&ss(s,h[0],r),h[0];const d=new Ce;r.extensions&&ss(s,d,r),e.associations.set(d,{meshes:t});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new nn(vi.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new wo(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),mi(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Ut;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new nu(o,c)})}loadAnimation(t){const e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(g),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let M=0,y=d.length;M<y;M++){const v=d[M],w=f[M],T=g[M],L=x[M],B=m[M];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const E=n._createAnimationTracks(v,w,T,L,B);if(E)for(let A=0;A<E.length;A++)p.push(E[A])}return new vs(r,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(t){const e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,J1)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){o.push(l)}),this.nodeCache[t]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new np:l.length>1?u=new Ce:l.length===1?u=l[0]:u=new Ie,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),mi(u,r),r.extensions&&ss(n,u,r),r.matrix!==void 0){const h=new Ut;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],s=this,r=new Ce;n.name&&(r.name=s.createUniqueName(n.name)),mi(r,n),n.extensions&&ss(e,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof Vn||d instanceof Ve)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){const a=[],o=t.name?t.name:t.uuid,c=[];Li[r.path]===Li.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Li[r.path]){case Li.weights:l=fr;break;case Li.rotation:l=dr;break;case Li.position:case Li.scale:l=pr;break;default:switch(n.itemSize){case 1:l=fr;break;case 2:case 3:default:l=pr;break}break}const u=s.interpolation!==void 0?j1[s.interpolation]:Qr,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Li[r.path],e.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Il(e.constructor),s=new Float32Array(e.length);for(let r=0,a=e.length;r<a;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const s=this instanceof dr?X1:gp;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function tM(i,t,e){const n=t.attributes,s=new Si;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new G(c[0],c[1],c[2]),new G(l[0],l[1],l[2])),o.normalized){const u=Il(nr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const o=new G,c=new G;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=e.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const x=Il(nr[d.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new cn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function lf(i,t,e){const n=t.attributes,s=[];function r(a,o){return e.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=Pl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(t.indices!==void 0&&!i.index){const a=e.getDependency("accessor",t.indices).then(function(o){i.setIndex(o)});s.push(a)}return ae.workingColorSpace!==an&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ae.workingColorSpace}" not supported.`),mi(i,t),tM(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?K1(i,t.targets,e):i})}const xu=["rendah","sedang","tinggi"],xp="pulau-tropis:kualitas",eM={rendah:{maxPixelRatio:1.25,terrainSegments:200,shadows:!1,shadowMapSize:0,softShadows:!1,treeDensity:.75,canopyDetail:0,grass:{radius:70,near:9,density:1.6,blades:4,max:4e3,shadows:!1},caustics:!1,water:{segments:128,detailLayers:1,cloudReflection:!1,wetSand:!1,shoreRes:256}},sedang:{maxPixelRatio:1.5,terrainSegments:256,shadows:!0,shadowMapSize:1024,softShadows:!0,treeDensity:1,canopyDetail:0,grass:{radius:120,near:13,density:2.4,blades:6,max:9e3,shadows:!1},caustics:!0,water:{segments:192,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}},tinggi:{maxPixelRatio:2,terrainSegments:384,shadows:!0,shadowMapSize:2048,softShadows:!0,treeDensity:1.5,canopyDetail:1,grass:{radius:170,near:18,density:3.2,blades:8,max:26e3,shadows:!0},caustics:!0,water:{segments:240,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}}},_p=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&window.matchMedia("(pointer: coarse)").matches;function nM(){try{return localStorage.getItem(xp)}catch{return null}}function iM(){const i=new URLSearchParams(location.hash.slice(1)).get("kualitas"),t=new URLSearchParams(location.search).get("kualitas");for(const e of[i,t,nM()])if(xu.includes(e))return e;return _p?"sedang":"tinggi"}const uf=iM(),Ee={isMobile:_p,level:uf,levels:xu,...eM[uf]};function sM(i){if(xu.includes(i)){try{localStorage.setItem(xp,i)}catch{}try{const t=new URL(location.href);t.searchParams.delete("kualitas"),t.hash=`kualitas=${i}`,history.replaceState(null,"",t)}catch{location.hash=`kualitas=${i}`}location.reload()}}function Va(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const hf=i=>i*i*(3-2*i),Wa=(i,t)=>(i%t+t)%t;function rM(i,t,e,n){const s=Math.floor(i),r=Math.floor(t),a=hf(i-s),o=hf(t-r),c=Wa(s,e),l=Wa(s+1,e),u=Wa(r,e),h=Wa(r+1,e),d=Va(c,u,n),f=Va(l,u,n),g=Va(c,h,n),x=Va(l,h,n);return d+(f-d)*a+(g-d)*o+(d-f-g+x)*a*o}function Ks(i,t,e,n,s){let r=0,a=.5,o=0,c=e;for(let l=0;l<n;l++)r+=a*rM(i*c,t*c,c,s+l*13),o+=a,a*=.5,c*=2;return r/o}function vp(i){let t=1/0,e=-1/0;for(const s of i)s<t&&(t=s),s>e&&(e=s);const n=1/Math.max(1e-6,e-t);for(let s=0;s<i.length;s++)i[s]=(i[s]-t)*n}function aM(i,t=256){const e=t*t,n=[new Float32Array(e),new Float32Array(e),new Float32Array(e),new Float32Array(e)];for(let a=0;a<t;a++)for(let o=0;o<t;o++){const c=o/t,l=a/t,u=a*t+o;n[0][u]=Ks(c,l,32,3,1),n[1][u]=Ks(c,l,8,4,2),n[2][u]=Ks(c,l,4,3,3),n[3][u]=1-Math.abs(Ks(c,l,6,3,4)*2-1)}n.forEach(vp);const s=new Uint8Array(e*4);for(let a=0;a<e;a++)for(let o=0;o<4;o++)s[a*4+o]=Math.round(n[o][a]*255);const r=new ys(s,t,t,Ke,Pn);return r.wrapS=r.wrapT=Ki,r.magFilter=He,r.minFilter=xn,r.generateMipmaps=!0,r.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),r.needsUpdate=!0,r}function oM(i,t=256){const e=new Float32Array(t*t);for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=c/t,u=o/t,h=Ks(l,u,6,4,21),d=1-Math.abs(Ks(l,u,9,3,37)*2-1);e[o*t+c]=h*.6+d*.4}vp(e);const n=new Uint8Array(t*t*4),s=(o,c)=>e[(c+t)%t*t+(o+t)%t],r=5;for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=-(s(c+1,o)-s(c-1,o))*r,u=-(s(c,o+1)-s(c,o-1))*r,h=Math.hypot(l,u,1),d=(o*t+c)*4;n[d]=Math.round((l/h*.5+.5)*255),n[d+1]=Math.round((u/h*.5+.5)*255),n[d+2]=Math.round((1/h*.5+.5)*255),n[d+3]=255}const a=new ys(n,t,t,Ke,Pn);return a.wrapS=a.wrapT=Ki,a.magFilter=He,a.minFilter=xn,a.generateMipmaps=!0,a.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),a.needsUpdate=!0,a}function na(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const cM=(i,t)=>(Math.imul(i|0,73856093)^Math.imul(t|0,19349663))>>>0,ff=(i,t)=>(i+32768)*65536+(t+32768);class lM{constructor(t=8){this.cell=t,this.cells=new Map,this.maxRadius=0}add(t,e,n,s){const r=ff(Math.floor(t/this.cell),Math.floor(e/this.cell));let a=this.cells.get(r);a||this.cells.set(r,a=[]),a.push({x:t,z:e,radius:n,kind:s}),this.maxRadius=Math.max(this.maxRadius,n)}forEachNear(t,e,n,s){const r=n+this.maxRadius,a=Math.floor((t-r)/this.cell),o=Math.floor((t+r)/this.cell),c=Math.floor((e-r)/this.cell),l=Math.floor((e+r)/this.cell);for(let u=a;u<=o;u++)for(let h=c;h<=l;h++){const d=this.cells.get(ff(u,h));if(d){for(const f of d)if(s(f)===!1)return!1}}return!0}isFree(t,e,n){return this.forEachNear(t,e,n,s=>{const r=s.x-t,a=s.z-e,o=s.radius+n;return r*r+a*a>=o*o})}covered(t,e,n,s=1){return!this.forEachNear(t,e,0,r=>{if(r.kind!==n)return!0;const a=r.x-t,o=r.z-e,c=r.radius*s;return a*a+o*o>=c*c})}}function Tn({ground:i,grid:t,kind:e,count:n,seed:s,radius:r,accept:a,area:o=370,cx:c=0,cz:l=0,reserved:u=null}){const h=na(s),d=[];for(let f=0;d.length<n&&f<n*150;f++){const g=o*Math.sqrt(h()),x=h()*Math.PI*2,m=c+Math.cos(x)*g,p=l+Math.sin(x)*g,M=i.heightAt(m,p);if(!a(m,p,M,i.slopeAt(m,p),h))continue;const y=typeof r=="function"?r(h):r;if(!t.isFree(m,p,y))continue;t.add(m,p,y,e);const v={x:m,y:M,z:p,r:y,a:h(),b:h(),c:h()};u!=null&&u(m,p,y)||d.push(v)}return d}function Xa(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const df=i=>i*i*(3-2*i);function yp(i,t,e=1){const n=Math.floor(i),s=Math.floor(t),r=df(i-n),a=df(t-s),o=Xa(n,s,e),c=Xa(n+1,s,e),l=Xa(n,s+1,e),u=Xa(n+1,s+1,e);return o+(c-o)*r+(l-o)*a+(o-c-l+u)*r*a}function Qn(i,t,e=4,n=1){let s=0,r=.5,a=1,o=0;for(let c=0;c<e;c++)s+=r*yp(i*a,t*a,n+c*17),o+=r,r*=.5,a*=2.03;return s/o}const Be=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},Pe={size:1e3,seaLevel:0,seaFloor:-18,beachTop:2.2,peak:{x:70,z:-60}};function Mp(i,t){const e=Math.hypot(i,t),s=230+(Qn(i*.0035+3.1,t*.0035-7.4,3,7)-.5)*220,r=e/s;let a=Pe.seaFloor+(Pe.seaFloor*-1-1.2)*Be(1.38,1.02,r);a+=3.6*Be(1.04,.87,r);const o=Be(.92,.45,r),c=Qn(i*.011+10,t*.011-5,5,3);a+=o*o*c*26;const l=i-Pe.peak.x,u=t-Pe.peak.z,h=Math.exp(-(l*l+u*u)/(2*75*75)),d=.7+.6*Qn(i*.03,t*.03,4,11);return a+=o*h*70*d,a+=(Qn(i*.08,t*.08,2,21)-.5)*.8*o,a}const br=[{id:"kencana",name:"Pulau Kencana",x:-560,z:40,r:255,wobble:.07,hills:7,seed:51},{id:"sawah",name:"Pulau Sawah",x:-660,z:-345,r:100,wobble:.1,hills:3,seed:52},{id:"nelayan",name:"Pulau Nelayan",x:-760,z:360,r:88,wobble:.1,hills:3,seed:53},{id:"pura",name:"Pulau Pura",x:-890,z:110,r:50,wobble:.12,hills:13,seed:54},{id:"wira",name:"Pulau Wira",x:-270,z:470,rx:360,rz:185,r:360,wobble:.05,hills:2,seed:55,forest:.25}],be={x0:-700,x1:-420,z0:-60,z1:140,y:5.5},uM=[{id:"timur",x:-420,z:40,w:10,axis:"x"},{id:"barat",x:-700,z:110,w:7,axis:"x"},{id:"utara",x:-647,z:-60,w:7,axis:"z"},{id:"selatan",x:-553,z:140,w:8,axis:"z"}],bp={x0:-689,x1:-602,z0:-1,z1:81,gate:{x:-602,z:40}},pf={x0:-588,x1:-508,z0:-1,z1:81},hM={x0:-500,x1:-430,z0:-50,z1:31,x:-465,z:-10},fM={x0:-500,x1:-430,z0:47,z1:82},Br={x:-893,z:110,r:21},_n={x0:-490,x1:-50,z0:370,z1:577,y:4.2},Sp=[[-4.6,-3.2],[4.6,-3.2],[4.6,3.2],[-4.6,3.2],[-10.6,-5.3],[0,-5.3],[10.6,-5.3],[-10.6,0],[10.6,0],[-10.6,5.3],[10.6,5.3]],_o=[{id:"tenda",x0:-578,x1:-508,z0:392,z1:556},{id:"kandang",x0:-32,x1:34,z0:392,z1:540}],mf=[[-694,-54],[-426,-54],[-426,134],[-694,134]],dM=[...mf.map((i,t)=>[...i,...mf[(t+1)%4],5]),[-694,-29,-504,-29,5],[-694,-5,-504,-5,6],[-694,85,-426,85,6],[-694,110,-426,110,5],[-647,-54,-647,-5,5],[-600,-54,-600,-5,5],[-553,-54,-553,-5,5],[-647,85,-647,134,5],[-600,85,-600,134,5],[-553,85,-553,134,5],[-504,-54,-504,134,6],[-420,40,-508,40,10],[-508,40,-602,40,8],[-420,40,-300,40,7],[-553,134,-553,282,6],[-647,-54,-647,-195,5],[-694,110,-800,110,5],[-730,110,-730,228,5]],Ap=[{id:"agung",name:"Jembatan Agung",axis:"x",at:40,from:-360,to:-160,width:7,rise:2.2,stone:!0},{id:"sawah",name:"Jembatan Sawah",axis:"z",at:-646,from:-150,to:-280,width:4.6,rise:1.2},{id:"pura",name:"Jembatan Pura",axis:"x",at:110,from:-770,to:-880,width:4.6,rise:1.2},{id:"nelayan",name:"Jembatan Nelayan",axis:"z",at:-730,from:200,to:300,width:4.6,rise:1.2},{id:"wira",name:"Jembatan Wira",axis:"z",at:-470,from:230,to:360,width:6,rise:1.6}],gf=i=>br.find(t=>t.id===i);function wp(i,t,e,n,s,r){const a=s-e,o=r-n,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/(a*a+o*o||1)));return Math.hypot(e+a*c-i,n+o*c-t)}function ji(i,t,e){const n=Math.max(e.x0-i,i-e.x1),s=Math.max(e.z0-t,t-e.z1);return Math.hypot(Math.max(n,0),Math.max(s,0))+Math.min(Math.max(n,s),0)}const ms=(i,t,e,n=0)=>i>=e.x0-n&&i<=e.x1+n&&t>=e.z0-n&&t<=e.z1+n,qs=-18,ja={x0:-1e3,x1:240,z0:-500,z1:750},qr=2,pM=8.5,mM=[{..._n,z0:_n.z0-42},..._o];function la(i,t,e){return i.rx?Math.hypot((t-i.x)/i.rx,(e-i.z)/i.rz):Math.sqrt((t-i.x)**2+(e-i.z)**2)/i.r}function gM(i,t,e){let n;if(i.rx){const a=la(i,t,e);if(a>(1+i.wobble)*1.38)return qs;const o=Qn(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed);n=a/(1+(o-.5)*2*i.wobble)}else{const a=t-i.x,o=e-i.z,c=i.r*(1+i.wobble)*1.38,l=a*a+o*o;if(l>c*c)return qs;const u=Qn(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed);n=Math.sqrt(l)/(i.r*(1+(u-.5)*2*i.wobble))}let s=qs+(-qs-1.2)*Be(1.38,1.02,n);s+=3.6*Be(1.04,.87,n);const r=Be(.92,.45,n);if(s+=r*r*Qn(t*.012+i.seed,e*.012-i.seed*2,4,i.seed+9)*i.hills,s+=(Qn(t*.08,e*.08,2,21+i.seed)-.5)*.5*r,i.id==="kencana"){const a=(1-Be(8,35,ji(t,e,be)))*Be(.95,.8,n);s+=(be.y-s)*a}else if(i.id==="pura"){const a=1-Be(Br.r*.7,Br.r*1.25,Math.hypot(t-Br.x,e-Br.z));s+=(pM-s)*a}else if(i.id==="wira"){let a=1/0;for(const c of mM)a=Math.min(a,ji(t,e,c));const o=(1-Be(6,30,a))*Be(.95,.82,n);s+=(_n.y-s)*o}return s}function xM(i,t){if(i<ja.x0||i>ja.x1||t<ja.z0||t>ja.z1)return qs;let e=qs;for(const n of br)e=Math.max(e,gM(n,i,t));return e}function _M(i){return Ap.map(t=>{const e=Math.sign(t.to-t.from),n=a=>t.axis==="x"?i(a,t.at):i(t.at,a);let s=null,r=null;for(let a=t.from;e*(t.to-a)>=0;a+=e*.25){const o=n(a);if(s===null&&o<qr)s=a;else if(s!==null&&o>=qr){r=a;break}}if(s===null||r===null)throw new Error(`ujung ${t.name} tidak ditemukan`);return{...t,a:s,b:r,length:Math.abs(r-s)}})}const Yt={minX:-1125,maxX:500,minZ:-500,maxZ:750};Yt.width=Yt.maxX-Yt.minX;Yt.depth=Yt.maxZ-Yt.minZ;const vM=470*470;function yM(i,t){const e=i*i+t*t<vM?Mp(i,t):Pe.seaFloor;return Math.max(e,xM(i,t))}const MM=(i,t,e=0)=>i>Yt.minX+e&&i<Yt.maxX-e&&t>Yt.minZ+e&&t<Yt.maxZ-e,Vi=(i,t)=>Qn(i*.012+40,t*.012-13,3,31);function ia(i,t){const e=Math.hypot(i-Pe.peak.x,t-Pe.peak.z);return 1-Be(150,245,e)}function Tp(i){return Be(16,30,i)*(1-Be(66,76,i))}function bM(i,t){return{forest:Vi(i,t),patch:Qn(i*.045+7,t*.045-3,2,77)}}function xf(i,t,e,n,s,r){if(s<Pe.beachTop+1.2||s>76||r>1.15)return 0;const a=ia(e,n);if(a<=0)return 0;const o=i>.47&&s<44,c=1-Be(.42,.52,i),l=Math.max(Tp(s)*(o?.35:1),.75*c),u=Be(.25,.5,t),h=1-Be(.75,1.15,r),d=Be(Pe.beachTop+1.2,Pe.beachTop+4,s);return a*l*u*h*d}function SM(i,t,e){if(e<Pe.beachTop)return 0;const n=1-Be(.42,.52,Vi(i,t)),s=Vi(i,t)>.47&&e<44;return ia(i,t)*Math.max(Tp(e)*(s?.4:1),.75*n)}const Zr=1e20;function _f(i,t,e,n,s){let r=0;n[0]=0,s[0]=-Zr,s[1]=Zr;for(let a=1;a<t;a++){let o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);for(;o<=s[r];)r--,o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);r++,n[r]=a,s[r]=o,s[r+1]=Zr}r=0;for(let a=0;a<t;a++){for(;s[r+1]<a;)r++;e[a]=(a-n[r])*(a-n[r])+i[n[r]]}}function vf(i,t,e){const n=Math.max(t,e),s=new Float64Array(n),r=new Float64Array(n),a=new Int32Array(n),o=new Float64Array(n+1);for(let c=0;c<t;c++){for(let l=0;l<e;l++)s[l]=i[l*t+c];_f(s,e,r,a,o);for(let l=0;l<e;l++)i[l*t+c]=r[l]}for(let c=0;c<e;c++){for(let l=0;l<t;l++)s[l]=i[c*t+l];_f(s,t,r,a,o);for(let l=0;l<t;l++)i[c*t+l]=r[l]}}function AM(i,t=512){const e=Pe.size/t,n=Math.round(Yt.width/e),s=Math.round(Yt.depth/e),r=n*s,a=new Float32Array(r),o=new Float64Array(r),c=new Float64Array(r);for(let f=0;f<s;f++)for(let g=0;g<n;g++){const x=f*n+g,m=i.heightAt(Yt.minX+(g+.5)*e,Yt.minZ+(f+.5)*e);a[x]=m,o[x]=m>0?0:Zr,c[x]=m>0?Zr:0}vf(o,n,s),vf(c,n,s);const l=new Float32Array(r);for(let f=0;f<r;f++)l[f]=a[f]>0?-(Math.sqrt(c[f])-.5)*e:(Math.sqrt(o[f])-.5)*e;for(let f=1;f<s-1;f++)for(let g=1;g<n-1;g++){const x=f*n+g;if(Math.abs(l[x])>3*e)continue;const m=(a[x+1]-a[x-1])/(2*e),p=(a[x+n]-a[x-n])/(2*e),M=Math.hypot(m,p);M>.02&&(l[x]=Math.max(-3*e,Math.min(3*e,-a[x]/M)))}const u=l0.toHalfFloat,h=new Uint16Array(r*4);for(let f=0;f<s;f++)for(let g=0;g<n;g++){const x=f*n+g,m=l[Math.min(n-1,g+1)+f*n]-l[Math.max(0,g-1)+f*n],p=l[g+Math.min(s-1,f+1)*n]-l[g+Math.max(0,f-1)*n],M=Math.hypot(m,p)||1;h[x*4]=u(a[x]),h[x*4+1]=u(Math.max(-60,Math.min(600,l[x]))),h[x*4+2]=u(m/M),h[x*4+3]=u(p/M)}const d=new ys(h,n,s,Ke,mr);return d.magFilter=He,d.minFilter=He,d.wrapS=d.wrapT=Jn,d.needsUpdate=!0,{texture:d,width:n,height:s,cell:e,heights:a,distance:l}}const _u={value:0},vu=`
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
`;function yf(i,{heightFn:t=yM,rect:e=Yt}={}){const n=Pe.size/i,s=Math.round((e.maxX-e.minX)/n),r=Math.round((e.maxZ-e.minZ)/n),a=s+1,o=e.minX,c=e.minZ,l=new Float32Array(a*(r+1));for(let y=0;y<=r;y++)for(let v=0;v<=s;v++)l[y*a+v]=t(o+v*n,c+y*n);function u(y,v){const w=(y-o)/n,T=(v-c)/n;if(w<0||T<0||w>=s||T>=r)return t(y,v);const L=Math.floor(w),B=Math.floor(T),E=w-L,A=T-B,O=l[B*a+L],j=l[(B+1)*a+L],W=l[(B+1)*a+L+1],$=l[B*a+L+1];return E+A<=1?O+($-O)*E+(j-O)*A:W+(j-W)*(1-E)+($-W)*(1-A)}function h(y,v){const w=u(y,v);return Math.hypot(u(y+1,v)-w,u(y,v+1)-w)}const d=16,f=new Map,g=(y,v)=>(y+32768)*65536+(v+32768);let x=[];function m(y,v,w){const T=v-y.x,L=w-y.z,B=T*y.cos-L*y.sin,E=T*y.sin+L*y.cos;if(Math.abs(B)>y.hx||Math.abs(E)>y.hz)return-1/0;const A=(E+y.hz)/(2*y.hz);return y.y0+(y.y1-y.y0)*A+(y.arch?y.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(A-y.a0)/(y.a1-y.a0)))):0)}function p(y,v){const w=u(y,v);if(!x.length)return w;const T=f.get(g(Math.floor(y/d),Math.floor(v/d)));if(!T)return w;let L=w;for(const B of T){const E=m(B,y,v);E>L&&(L=E)}return L}function M(y){x=y.map(v=>({a0:0,a1:1,arch:0,...v,cos:Math.cos(v.rot||0),sin:Math.sin(v.rot||0)})),f.clear();for(const v of x){const w=Math.hypot(v.hx,v.hz);for(let T=Math.floor((v.x-w)/d);T<=Math.floor((v.x+w)/d);T++)for(let L=Math.floor((v.z-w)/d);L<=Math.floor((v.z+w)/d);L++){const B=g(T,L);f.has(B)||f.set(B,[]),f.get(B).push(v)}}}return{step:n,nx:s,nz:r,cols:a,x0:o,z0:c,heights:l,heightAt:u,slopeAt:h,surfaceAt:p,setSurfaces:M,get surfaces(){return x},surfaceHeight:m}}const wM=`
attribute vec2 aSurface; // x = oklusi (gelap di bawah pohon), y = padang rumput
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;
`,TM=`
uniform sampler2D uNoise;
uniform float uBeachTop;
uniform float uWaveTime;
${vu}
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
`,Fs=64,EM=-12,RM=-18.4;function CM(i){const{nx:t,nz:e,cols:n,heights:s,step:r}=i,a=new Float32Array(n*(e+1)*3),o=(l,u,h,d)=>{a[l*3]+=u,a[l*3+1]+=h,a[l*3+2]+=d},c=r*r;for(let l=0;l<e;l++)for(let u=0;u<t;u++){const h=l*n+u,d=h+n,f=d+1,g=h+1,x=r*(s[h]-s[g]),m=r*(s[h]-s[d]);o(h,x,c,m),o(d,x,c,m),o(g,x,c,m);const p=r*(s[d]-s[f]),M=r*(s[g]-s[f]);o(d,p,c,M),o(f,p,c,M),o(g,p,c,M)}for(let l=0;l<a.length;l+=3){const u=Math.hypot(a[l],a[l+1],a[l+2])||1;a[l]/=u,a[l+1]/=u,a[l+2]/=u}return a}function PM(i,{noiseTexture:t,quality:e,region:n=null}){const{nx:s,nz:r,cols:a,heights:o,x0:c,z0:l,step:u}=i,h=CM(i),d=new Float32Array(a*(r+1)*2);for(let y=0;y<=r;y++)for(let v=0;v<=s;v++){const w=y*a+v;d[w*2]=1,d[w*2+1]=SM(c+v*u,l+y*u,o[w])}const f=new jn({color:16777215});f.defines={},e.water.wetSand&&(f.defines.WAVE_WET_SAND=""),n&&(f.defines.REGION_MASK=""),f.onBeforeCompile=y=>{y.uniforms.uNoise={value:t},y.uniforms.uBeachTop={value:Pe.beachTop},y.uniforms.uWaveTime=_u,n&&(y.uniforms.uRegion={value:n.texture},y.uniforms.uRegionRect={value:new re(n.x0,n.z0,1/n.width,1/n.depth)}),y.vertexShader=wM+y.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
      vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
      vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);
      vSurface = aSurface;`),y.fragmentShader=TM+y.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb *= terrainColor();`)};const g=new Ce;g.name="terrain";const x=[];for(let y=0;y<r;y+=Fs)for(let v=0;v<s;v+=Fs){const w=Math.min(s,v+Fs),T=Math.min(r,y+Fs),L=w-v+1,B=T-y+1;let E=-1/0;for(let I=y;I<=T;I++)for(let _=v;_<=w;_++)E=Math.max(E,o[I*a+_]);if(E<EM)continue;const A=new Float32Array(L*B*3),O=new Float32Array(L*B*3),j=new Int32Array(L*B);for(let I=y;I<=T;I++)for(let _=v;_<=w;_++){const N=(I-y)*L+(_-v),z=I*a+_;A[N*3]=c+_*u,A[N*3+1]=o[z],A[N*3+2]=l+I*u,O.set(h.subarray(z*3,z*3+3),N*3),j[N]=z}const W=[];for(let I=0;I<B-1;I++)for(let _=0;_<L-1;_++){const N=I*L+_,z=N+L;W.push(N,z,N+1,z,z+1,N+1)}const $=new he;$.setAttribute("position",new Me(A,3)),$.setAttribute("normal",new Me(O,3));const b=new Me(new Float32Array(L*B*2),2);$.setAttribute("aSurface",b),$.setIndex(W),$.computeBoundingSphere();const S=new ee($,f);S.name=`terrain-${v/Fs}-${y/Fs}`,S.receiveShadow=e.shadows,g.add(S),x.push({surf:b,map:j})}const m=new vn(Yt.width,Yt.depth).rotateX(-Math.PI/2);m.translate(Yt.minX+Yt.width/2,RM,Yt.minZ+Yt.depth/2),m.deleteAttribute("uv"),m.setAttribute("aSurface",new Me(new Float32Array([1,0,1,0,1,0,1,0]),2));const p=new ee(m,f);p.name="dasar-laut",g.add(p);function M(){for(const y of x){const v=y.surf.array;for(let w=0;w<y.map.length;w++)v[w*2]=d[y.map[w]*2],v[w*2+1]=d[y.map[w]*2+1];y.surf.needsUpdate=!0}}return M(),g.userData.applyOcclusion=y=>{for(const v of y){const w=v.radius,T=Math.max(0,Math.floor((v.x-w-c)/u)),L=Math.min(s,Math.ceil((v.x+w-c)/u)),B=Math.max(0,Math.floor((v.z-w-l)/u)),E=Math.min(r,Math.ceil((v.z+w-l)/u));for(let A=B;A<=E;A++)for(let O=T;O<=L;O++){const j=c+O*u-v.x,W=l+A*u-v.z,$=1-(j*j+W*W)/(w*w);if($<=0)continue;const b=(A*a+O)*2;d[b]=Math.max(.5,d[b]*(1-v.strength*$*$))}}M()},g.userData.chunks=g.children.length-1,g}const IM=`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform float uWaveTime;
uniform vec4 uWorld; // minX, minZ, maxX, maxZ (area data pantai)
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal; // fase & kekuatan ombak lokal (berubah pelan, cukup per vertex)
${vu}

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
`,LM=`
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
${vu}

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
`;function Mf(i,t,e,n,s){const r=[];for(let o=n;o>=1;o--)r.push(i-e*(Math.pow(s,o)-1)/(s-1));const a=Math.round((t-i)/e);for(let o=0;o<=a;o++)r.push(i+o*e);for(let o=1;o<=n;o++)r.push(t+e*(Math.pow(s,o)-1)/(s-1));return r}const Bs=48;function zM(i,t){const n=Pe.size/t;let s=1.01,r=4;for(let M=0;M<60;M++){const y=(s+r)/2;n*(Math.pow(y,12)-1)/(y-1)<5500?s=y:r=y}const a=(s+r)/2,o=Mf(Yt.minX,Yt.maxX,n,12,a),c=Mf(Yt.minZ,Yt.maxZ,n,12,a),l=o.length,u=c.length,h=new Float32Array(l*u*3),d=new Float32Array(l*u);for(let M=0;M<u;M++)for(let y=0;y<l;y++){const v=M*l+y,w=o[y],T=c[M];h[v*3]=w,h[v*3+2]=T,d[v]=w>Yt.minX&&w<Yt.maxX&&T>Yt.minZ&&T<Yt.maxZ?i.heightAt(w,T):-18}const f=l-1-2*12,g=u-1-2*12,x=new Map;for(let M=0;M<u-1;M++)for(let y=0;y<l-1;y++){const v=M*l+y,w=v+1,T=v+l,L=T+1;if(Math.min(d[v],d[w],d[T],d[L])>1.6)continue;const B=y-12,E=M-12,A=B>=0&&E>=0&&B<f&&E<g?`${Math.floor(B/Bs)},${Math.floor(E/Bs)}`:"luar";let O=x.get(A);O||x.set(A,O=[]),O.push(v,T,w,w,T,L)}const m=new Me(h,3),p=[];for(const[M,y]of x){const v=new he;if(v.setAttribute("position",m),v.setIndex(y),M==="luar"){p.push({geometry:v,culled:!1});continue}const[w,T]=M.split(",").map(Number),L=o[12+w*Bs],B=o[Math.min(l-1,12+(w+1)*Bs)],E=c[12+T*Bs],A=c[Math.min(u-1,12+(T+1)*Bs)];v.boundingSphere=new cn(new G((L+B)/2,0,(E+A)/2),Math.hypot(B-L,A-E)/2+2),p.push({geometry:v,culled:!0})}return p}function DM({ground:i,shore:t,env:e,noiseTexture:n,normalTexture:s,quality:r}){const a=r.water,o={DETAIL_LAYERS:a.detailLayers};a.cloudReflection&&(o.CLOUD_REFLECTION=""),r.caustics&&(o.CAUSTICS="");const c=new Xn({vertexShader:IM,fragmentShader:LM,defines:o,transparent:!0,depthWrite:!1,uniforms:{uShore:{value:t.texture},uNoise:{value:n},uNormal:{value:s},uWaveTime:_u,uWorld:{value:new re(Yt.minX,Yt.minZ,Yt.maxX,Yt.maxZ)},uShallow:{value:new Nt("#3fd6c6")},uDeep:{value:new Nt("#0a4a82")},uZenith:{value:e.zenith},uHorizon:{value:e.horizon},uSunDir:{value:e.sunDir},uSunColor:{value:new Nt("#fff2d2")},uFogColor:{value:e.fog.color},uFogNear:{value:e.fog.near},uFogFar:{value:e.fog.far}}}),l=new Ce;l.name="laut",l.position.y=Pe.seaLevel;for(const{geometry:u,culled:h}of zM(i,a.segments)){const d=new ee(u,c);d.frustumCulled=h,d.renderOrder=1,l.add(d)}return l.userData.material=c,l}const kM=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // selalu di bidang terjauh
}
`,NM=`
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
`;function UM(i,{noiseTexture:t,quality:e}){const n=new G(.5,.52,.32).normalize(),s=new Nt("#d3ecf6"),r=new Nt("#3d8bd4");i.fog=new eu(s.clone(),380,2400),i.background=s.clone();const a={uZenith:{value:r},uHorizon:{value:s},uSunDir:{value:n},uSunColor:{value:new Nt("#fff0c8")},uNoise:{value:t},uTime:{value:0}},o=new Xn({vertexShader:kM,fragmentShader:NM,side:rn,depthWrite:!1,uniforms:a}),c=new ee(new Po(1,32,16),o);c.name="langit",c.frustumCulled=!1,c.renderOrder=-1,c.onBeforeRender=(m,p,M)=>{c.position.copy(M.position),c.scale.setScalar(M.far*.9),c.updateMatrixWorld()},i.add(c);const l=new dp("#d6ecff","#5d7a3c",1.1);i.add(l);const u=new fu("#fff1d6",2.4);u.position.copy(n).multiplyScalar(500),i.add(u,u.target),e.shadows&&(u.castShadow=!0,u.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize),u.shadow.camera.near=1,u.shadow.camera.far=1600,u.shadow.bias=-6e-4,u.shadow.radius=2);const h=new Ut().lookAt(n,new G,new G(0,1,0)),d=h.clone().invert(),f=new G,g=Math.log(1.15);function x(m,p){if(!u.castShadow)return;const M=m.position.distanceTo(p),y=vi.clamp(M*.95,45,560),v=Math.exp(Math.ceil(Math.log(y)/g)*g),w=u.shadow.camera;w.right!==v&&(w.left=-v,w.right=v,w.top=v,w.bottom=-v,w.updateProjectionMatrix());const T=2*v/u.shadow.mapSize.x;f.copy(p).lerp(m.position,.25).applyMatrix4(d),f.x=Math.round(f.x/T)*T,f.y=Math.round(f.y/T)*T,f.applyMatrix4(h),u.target.position.copy(f),u.position.copy(f).addScaledVector(n,800),u.shadow.normalBias=T*1.6}return{sunDir:n,zenith:r,horizon:s,fog:i.fog,sun:u,hemi:l,update(m,p,M){a.uTime.value=m,x(p,M)}}}const _i=Math.PI*2,yu=new G(0,1,0);function Le(i,t,{centers:e=null,dark:n=.62,light:s=1.08,rings:r=0}={}){const a=i.index?i.toNonIndexed():i;a.attributes.uv&&a.deleteAttribute("uv");const o=a.attributes.position;if(e){const f=a.attributes.normal,g=new G,x=new G;for(let m=0;m<o.count;m++){x.set(0,0,0);for(const[p,M]of e)x.addScaledVector(g.fromBufferAttribute(o,m).sub(p).normalize(),M);x.normalize(),f.setXYZ(m,x.x,x.y,x.z)}}a.computeBoundingBox();const{min:c,max:l}=a.boundingBox,u=Math.max(.001,l.y-c.y),h=new Nt(t),d=new Float32Array(o.count*3);for(let f=0;f<o.count;f++){const g=o.getY(f);let x=n+(s-n)*((g-c.y)/u);r&&(x*=.88+.12*Math.sin(g*r)),d[f*3]=h.r*x,d[f*3+1]=h.g*x,d[f*3+2]=h.b*x}return a.setAttribute("color",new Me(d,3)),a}function ua(i,t,[e,n,s],r=.82){const a=new qi(i,t);return a.scale(1,r,1),a.translate(e,n,s),a}function OM(i,t){const n=(g,x)=>x.set(0,i*(.3*g-t*g*g),i*g*(1-.12*g)),s=[],r=[],a=new G,o=new G,c=new G,l=new G,u=new G,h=new G,d=new G;for(let g=-1;g<=1;g+=2)for(let x=0;x<9;x++){const m=.08+.86*x/9,p=m+.86/9*.95,M=1.3*Math.sin(Math.PI*(.16+.76*m));n(m,a),n(p,o),n(Math.min(1,(m+p)/2+.07),l),c.set(l.x+g*M,l.y-.4*M,l.z+.3*M),u.crossVectors(h.subVectors(o,a),d.subVectors(c,a));const y=u.y<0;y&&u.negate(),u.normalize().lerp(yu,.45).normalize();for(const v of y?[a,c,o]:[a,o,c])s.push(v.x,v.y,v.z),r.push(u.x,u.y,u.z)}const f=new he;return f.setAttribute("position",new Wt(s,3)),f.setAttribute("normal",new Wt(r,3)),f}function Ep(){const i=[],n=new ke(.2,.36,8,6,5,!0);n.translate(0,8/2,0);const s=n.attributes.position;for(let l=0;l<s.count;l++)s.setX(l,s.getX(l)+.035*s.getY(l)*s.getY(l));i.push(Le(n,"#8d6d48",{dark:.7,light:1.05,rings:9}));const r=.035*8*8,a=8;for(let l=0;l<a;l++){const u=l%4===3,h=OM(u?4:4.5,u?.75:.5);h.rotateX(-.15+l%3*.12),h.rotateY(l/a*_i+l%2*.25),h.translate(r,8-.05,0),i.push(Le(h,u?"#8c9a38":l%2?"#3f8f2f":"#4c9e34",{dark:.8,light:1.05}))}const o=new qi(.42,0);o.translate(r,8-.15,0),i.push(Le(o,"#6b5a2e"));const c=[[0,.36,.5,"#5f8f23"],[.8,.42,.62,"#6f9c2b"],[1.6,.37,.52,"#c9921f"],[2.5,.43,.66,"#5f8f23"],[3.3,.36,.5,"#7c5a32"],[4.1,.42,.63,"#6f9c2b"],[4.9,.37,.54,"#5f8f23"],[5.7,.43,.67,"#d4a02a"]];for(const[l,u,h,d]of c){const f=new G(r+Math.cos(l)*u,8-h,Math.sin(l)*u),g=new qi(1,0);g.scale(.21,.26,.21),g.translate(f.x,f.y,f.z),i.push(Le(g,d,{centers:[[f,1]],dark:.7,light:1.12}))}for(const l of[.4,3.6]){const u=new G(r,7.8,0),h=new G(r+Math.cos(l)*.34,8-.6,Math.sin(l)*.34),d=h.clone().sub(u),f=new ke(.03,.05,d.length(),4,1,!0);f.applyQuaternion(new xe().setFromUnitVectors(yu,d.normalize())),f.translate((u.x+h.x)/2,(u.y+h.y)/2,(u.z+h.z)/2),i.push(Le(f,"#b8923f",{dark:.85,light:1}))}return bs(i)}function Ll(i){const t=[],e=new ke(.3,.55,6.6,6,2,!1);e.translate(0,3.3,0),t.push(Le(e,"#6b4f33",{dark:.55,light:1}));for(const r of[-1,1]){const a=new ke(.1,.18,2.6,5,1,!0);a.rotateZ(r*.75),a.translate(r*.85,5.6,r*.3),t.push(Le(a,"#6b4f33",{dark:.7,light:1}))}const n=new G(0,7.4,0),s=[[0,7.5,0,3,"#2f7d2a"],[1.7,6.7,.8,2.3,"#3a8c30"],[-1.5,6.8,-.9,2.4,"#2a7027"],[.2,9,-.2,2.1,"#3f9534"]];for(const[r,a,o,c,l]of s){const u=ua(c,i,[r,a,o]);t.push(Le(u,l,{centers:[[n,.65],[new G(r,a,o),.35]],dark:.66,light:1.12}))}return bs(t)}function Rp(i){const t=[],e=new ke(.3,.6,9,6,3,!1);e.translate(0,4.5,0);const n=e.attributes.position;for(let r=0;r<n.count;r++)n.setX(r,n.getX(r)+.006*n.getY(r)*n.getY(r));t.push(Le(e,"#75593a",{dark:.55,light:1}));for(let r=0;r<3;r++){const a=new ke(.08,.16,3.4,5,1,!0);a.rotateZ(.9),a.translate(1.3,8.4,0),a.rotateY(r*_i/3+.4),a.translate(.45,0,0),t.push(Le(a,"#75593a",{dark:.75,light:1}))}const s=new G(.5,9.8,0);for(const[r,a,o,c,l,u]of[[.5,9.7,0,4.4,"#3b7f2c",.34],[1.2,10.6,-.6,3,"#468f33",.4],[-1.4,9.9,1.1,2.6,"#357528",.4]]){const h=ua(c,i,[r,a,o],u);t.push(Le(h,l,{centers:[[s,.5],[new G(r,a-1,o),.5]],dark:.66,light:1.15}))}return bs(t)}function vo(i,t){const e=[],n=new G(0,.5,0);for(const[s,r,a,o,c]of[[0,.65,0,.95,"#3f8a2e"],[.75,.5,.3,.7,"#4b9a35"],[-.6,.45,-.4,.65,"#45922f"]]){const l=ua(o,i,[s,r,a],.75);e.push(Le(l,c,{centers:[[n,.6],[new G(s,r,a),.4]],dark:.75,light:1.15}))}return t&&[[.2,1.35,.5],[-.5,1.1,.4],[.9,.95,-.2],[-.2,1.3,-.6],[.5,1.15,.85],[-.9,.8,-.1]].forEach(([r,a,o],c)=>{const l=new qi(.17,0);l.translate(r,a,o),e.push(Le(l,t[c%t.length],{dark:.9,light:1.1}))}),bs(e)}function FM(i){const t=[],e=new ke(.85,1.7,9,9,3,!1);e.translate(0,4.5,0),t.push(Le(e,"#5d4a3a",{dark:.5,light:.95}));for(let r=0;r<6;r++){const a=new Wn(.35,1.6,2.2);a.translate(0,.6,1.4),a.rotateY(r/6*_i+.3),t.push(Le(a,"#5d4a3a",{dark:.55,light:.9}))}for(let r=0;r<22;r++){const a=r/22*_i+r%3*.37,o=2.6+r%5*.6,c=9.5-r%4*.8,l=new ke(.05,.1,c,4,1,!0);l.translate(Math.cos(a)*o,c/2,Math.sin(a)*o),t.push(Le(l,"#6e5a46",{dark:.7,light:1}))}const n=new G(0,12.5,0),s=[[0,13.5,0,6.5,"#2c6a26"]];for(let r=0;r<9;r++){const a=r/9*_i;s.push([Math.cos(a)*7.2,11.6+r%2*.8,Math.sin(a)*7.2,4.6,r%2?"#35782d":"#2a6324"])}for(let r=0;r<5;r++){const a=r/5*_i+.6;s.push([Math.cos(a)*3.6,15.6,Math.sin(a)*3.6,3.8,"#3d8433"])}for(const[r,a,o,c,l]of s){const u=ua(c,i,[r,a,o],.62);t.push(Le(u,l,{centers:[[n,.6],[new G(r,a,o),.4]],dark:.6,light:1.1}))}return bs(t)}function BM(){const i=[],t=new ke(.16,.26,2.2,6,1,!0);t.translate(0,1.1,0),i.push(Le(t,"#8d7c69",{dark:.7,light:1.05}));for(let e=0;e<5;e++){const n=e/5*_i+.4,s=new G(Math.cos(n)*1.7,3.6+e%2*.5,Math.sin(n)*1.7),r=new G(0,2.1,0),a=s.clone().sub(r),o=new ke(.07,.12,a.length(),5,1,!0);o.applyQuaternion(new xe().setFromUnitVectors(yu,a.clone().normalize())),o.translate((r.x+s.x)/2,(r.y+s.y)/2,(r.z+s.z)/2),i.push(Le(o,"#8d7c69",{dark:.75,light:1.05}));const c=ua(.95,0,[s.x,s.y+.35,s.z],.6);i.push(Le(c,"#3e8a35",{centers:[[s,1]],dark:.75,light:1.15}));for(let l=0;l<4;l++){const u=new qi(.14,0);u.translate(s.x+Math.cos(l*1.7)*.6,s.y+.75,s.z+Math.sin(l*1.7)*.6),i.push(Le(u,l%2?"#fbf6e8":"#f6e08a",{dark:.95,light:1.05}))}}return bs(i)}function HM(){const i=[],t=new ke(.13,.2,2.6,6,1,!0);t.translate(0,1.3,0),i.push(Le(t,"#7f8f3c",{dark:.7,light:1.05}));for(let e=0;e<7;e++){const n=new vn(.75,2.6,1,4),s=n.attributes.position;for(let r=0;r<s.count;r++){const a=(s.getY(r)+1.3)/2.6;s.setY(r,a*2.4),s.setZ(r,a*a*1.6),s.setY(r,s.getY(r)-a*a*1.2)}n.computeVertexNormals(),n.rotateX(-.25),n.rotateY(e/7*_i+e%2*.4),n.translate(0,2.4,0),i.push(Le(n,e%3?"#5ea83a":"#7bbf45",{dark:.8,light:1.1}))}return bs(i)}const Cp={value:0},Hn={a:{value:new G},b:{value:new G},r:{value:0}};function Pp(i){const t=new jn({vertexColors:!0,side:sn});return t.onBeforeCompile=e=>{e.uniforms.uTime=Cp,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=Hn.a,e.uniforms.uSeeB=Hn.b,e.uniforms.uSeeR=Hn.r,e.vertexShader=`uniform float uTime;
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
      diffuseColor.rgb *= 0.74 + 0.5 * leaf;`)},t}const bf=Pe.size/3;function Je(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,toMatrix:a}){const o=new Ce;o.name=i;const c=new Map;for(const h of n){const d=`${Math.floor(h.x/bf)},${Math.floor(h.z/bf)}`;c.has(d)||c.set(d,[]),c.get(d).push(h)}const l=new Ut,u=new Nt;for(const h of c.values()){const d=new Ms(t,e,h.length);h.forEach((f,g)=>{a(f,l,u),d.setMatrixAt(g,l),d.setColorAt(g,u)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.castShadow=s,d.receiveShadow=r,o.add(d)}return o}const Sf=new xe,Af=new on,wf=new G,Tf=new G;function On({scaleMin:i,scaleMax:t,tilt:e,tint:n,sink:s=.15}){return(r,a,o)=>{Af.set((r.b-.5)*e,r.a*_i,(r.c-.5)*e),Sf.setFromEuler(Af);const c=i+(t-i)*r.b;Tf.set(c,c*(.9+.2*r.c),c),wf.set(r.x,r.y-s*c,r.z),a.compose(wf,Sf,Tf);const l=1-n+n*2*r.c,u=(r.a-.5)*n;o.setRGB(l*(1+u),l,l*(1-u))}}function GM({ground:i,grid:t,quality:e,noiseTexture:n,reserved:s=null}){const r=e.treeDensity,a=e.canopyDetail,{shadows:o}=e,c=Tn({ground:i,grid:t,kind:"kelapa",seed:101,radius:1.8,reserved:s,count:Math.round(170*r),accept:(x,m,p,M,y)=>p>.9&&p<4.2&&M<.3&&y()<.55}),l=Tn({ground:i,grid:t,kind:"pohon",seed:202,radius:2.3,reserved:s,count:Math.round(900*r),accept:(x,m,p,M)=>p>4&&p<44&&M<.6&&Vi(x,m)>.47}),u=Tn({ground:i,grid:t,kind:"pohon",seed:303,radius:4.5,reserved:s,count:Math.round(110*r),accept:(x,m,p,M,y)=>{if(p<5||p>42||M>.45)return!1;const v=Vi(x,m);return v>.34&&v<.49&&y()<.35+.65*ia(x,m)}}),h=Tn({ground:i,grid:t,kind:"semak",seed:404,radius:1.1,reserved:s,count:Math.round(700*r),accept:(x,m,p,M,y)=>{if(p<Pe.beachTop+.6||p>46||M>.7)return!1;const v=Vi(x,m);return v>.4&&v<.56||y()<.06}}),d=Tn({ground:i,grid:t,kind:"semak",seed:505,radius:1,reserved:s,count:Math.round(150*r),accept:(x,m,p,M,y)=>p>Pe.beachTop+.4&&p<30&&M<.5&&Vi(x,m)<.5&&y()<.5}),f=Pp(n),g=new Ce;return g.name="vegetasi",g.add(Je("kelapa",Ep(),f,c,{castShadow:o,receiveShadow:o,toMatrix:On({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1})}),Je("pohon-hutan",Ll(a),f,l,{castShadow:o,receiveShadow:o,toMatrix:On({scaleMin:.75,scaleMax:1.4,tilt:.12,tint:.16})}),Je("pohon-payung",Rp(a),f,u,{castShadow:o,receiveShadow:o,toMatrix:On({scaleMin:.8,scaleMax:1.2,tilt:.08,tint:.12})}),Je("semak",vo(0,null),f,h,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:On({scaleMin:.7,scaleMax:1.5,tilt:.2,tint:.2,sink:.1})}),Je("semak-bunga",vo(0,["#e0353f","#f4c02c","#f06aa8"]),f,d,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:On({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),g.userData.occlusion=[...l.map(x=>({x:x.x,z:x.z,radius:4.8,strength:.4})),...u.map(x=>({x:x.x,z:x.z,radius:5.5,strength:.3})),...c.map(x=>({x:x.x,z:x.z,radius:2.4,strength:.18})),...h.map(x=>({x:x.x,z:x.z,radius:1.8,strength:.2})),...d.map(x=>({x:x.x,z:x.z,radius:1.6,strength:.15}))],g.userData.trunks=[...c.map(x=>({x:x.x,z:x.z,radius:.45,kind:"pohon"})),...l.map(x=>({x:x.x,z:x.z,radius:.7,kind:"pohon"})),...u.map(x=>({x:x.x,z:x.z,radius:.75,kind:"pohon"}))],g.userData.counts={kelapa:c.length,pohon:l.length,payung:u.length,semak:h.length,bunga:d.length},g.userData.update=x=>{Cp.value=x},g}function Ef(i,t=0){const e=new lu(1,t),n=e.attributes.position,s=new G;for(let l=0;l<n.count;l++){s.fromBufferAttribute(n,l);const u=.72+.5*yp(s.x*1.6+i,s.z*1.6+s.y*1.3-i,5);s.multiplyScalar(u),s.y*=.82,s.y<0&&(s.y*=.55),n.setXYZ(l,s.x,s.y,s.z)}e.computeVertexNormals(),e.computeBoundingBox();const{min:r,max:a}=e.boundingBox,o=new Nt("#a59c8e"),c=new Float32Array(n.count*3);for(let l=0;l<n.count;l++){const h=.66+.46*((n.getY(l)-r.y)/(a.y-r.y));c[l*3]=o.r*h,c[l*3+1]=o.g*h,c[l*3+2]=o.b*h}return e.setAttribute("color",new Me(c,3)),e.deleteAttribute("uv"),e}const Rf=new xe,Cf=new on,Pf=new G,If=new G;function VM(i,t,e){Cf.set((i.b-.5)*.5,i.a*Math.PI*2,(i.c-.5)*.5),Rf.setFromEuler(Cf);const n=i.r*.95;If.set(n*(.8+.4*i.c),n*(.8+.5*i.b),n*(.8+.4*i.a)),Pf.set(i.x,i.y-.12*n,i.z),t.compose(Pf,Rf,If);const s=.82+.36*i.c,r=(i.a-.5)*.18;e.setRGB(s*(1+r),s,s*(1-r))}function WM({ground:i,grid:t,quality:e,reserved:n=null}){const s=e.treeDensity,r=Tn({ground:i,grid:t,kind:"batu",seed:606,reserved:n,count:Math.round(160*s),radius:h=>1+h()*1.8,accept:(h,d,f,g,x)=>{if(f<12)return!1;const m=Math.min(1,g*1.2+Math.max(0,f-40)/20);return x()<ia(h,d)*(.25+.75*m)}}),a=Tn({ground:i,grid:t,kind:"batu",seed:707,reserved:n,count:Math.round(110*s),radius:h=>.4+h()*.6,accept:(h,d,f,g,x)=>f>.3&&f<Pe.beachTop+.5&&x()<.25||f>4&&f<45&&g<.8&&x()<.35+.65*ia(h,d)}),o=new jn({vertexColors:!0}),c={castShadow:e.shadows,receiveShadow:e.shadows,toMatrix:VM},l=new Ce;l.name="batu";const u=[...r,...a];return l.add(Je("batu-a",Ef(1.3),o,u.filter((h,d)=>d%2===0),c),Je("batu-b",Ef(7.9),o,u.filter((h,d)=>d%2===1),c)),l.userData.occlusion=u.map(h=>({x:h.x,z:h.z,radius:h.r*1.6,strength:.3})),l.userData.colliders=u.map(h=>({x:h.x,z:h.z,radius:h.r*.9,kind:"batu"})),l.userData.count=u.length,l}const Te=16,Ip=.02,XM=3,rs=8,zl=Math.PI*2,jM=(i,t)=>Math.min(1,Math.max(Ip,Math.pow(t/Math.max(i,.001),1.5)));function YM(i){const t=na(99),e=[],n=[],s=[],r=new Nt().setRGB(.14,.28,.05),a=new Nt().setRGB(.3,.5,.11),o=new Nt().setRGB(.4,.62,.13),c=new Nt,l=2;for(let h=0;h<i;h++){const d=h/i*zl+t()*.9,f=Math.cos(d),g=Math.sin(d),x=.2+t()*.4,m=.6+t()*.4,p=.075+t()*.05,M=.03+t()*.16,y=e.length/3;for(let w=0;w<=l;w++){const T=w/l,L=M+x*T*T,B=f*L,E=g*L,A=m*T;if(c.copy(r).lerp(a,Math.min(1,T*1.6)).lerp(o,Math.max(0,T*1.6-.6)),w<l){const O=p*(1-T*.6);e.push(B+g*O,A,E-f*O,B-g*O,A,E+f*O),n.push(c.r,c.g,c.b,c.r,c.g,c.b)}else e.push(B,A,E),n.push(c.r,c.g,c.b)}for(let w=0;w<l-1;w++){const T=y+w*2;s.push(T,T+1,T+2,T+1,T+3,T+2)}const v=y+(l-1)*2;s.push(v,v+1,v+2)}const u=new he;return u.setAttribute("position",new Wt(e,3)),u.setAttribute("color",new Wt(n,3)),u.setAttribute("normal",new Wt(new Array(e.length).fill(0).map((h,d)=>d%3===1?1:0),3)),u.setIndex(s),u}function KM(i){const t=new jn({vertexColors:!0,side:sn});return t.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=`
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
    `)},t}function qM(i,t){let e=0,n=i.length;for(;e<n;){const s=e+n>>1;i[s]<t?e=s+1:n=s}return e}const Lf={count:0};function ZM({ground:i,grid:t,quality:e}){const n=e.grass,s=YM(n.blades),r=new El;r.index=s.index;for(const A of["position","color","normal"])r.setAttribute(A,s.attributes[A]);const a=new Float32Array(n.max*rs),o=new s1(a,rs,1).setUsage(Rn);r.setAttribute("aOffset",new ea(o,4,0)),r.setAttribute("aParams",new ea(o,4,4)),r.instanceCount=0;const c={uTime:{value:0},uCamPos:{value:new G},uRadius:{value:n.radius},uNear:{value:n.near},uFar:{value:Ip},uWind:{value:new Ct(1,.45).normalize()}},l=new ee(r,KM(c));l.name="rumput",l.frustumCulled=!1,l.receiveShadow=e.shadows&&n.shadows,l.visible=!1;const u=new Map,h=4,d=new Float32Array((h+1)*(h+1)),f=new Float32Array((h+1)*(h+1)),g=(A,O,j)=>{const W=O*h,$=j*h,b=Math.min(h-1,Math.floor(W)),S=Math.min(h-1,Math.floor($)),I=W-b,_=$-S,N=A[S*(h+1)+b],z=A[S*(h+1)+b+1],D=A[(S+1)*(h+1)+b],U=A[(S+1)*(h+1)+b+1];return(N+(z-N)*I)*(1-_)+(D+(U-D)*I)*_};function x(A,O){const j=A*Te,W=O*Te;let $=!1;for(let U=0;U<=h;U++)for(let X=0;X<=h;X++){const H=j+X*Te/h,k=W+U*Te/h,it=bM(H,k);d[U*(h+1)+X]=it.forest,f[U*(h+1)+X]=it.patch,!$&&xf(it.forest,it.patch,H,k,i.heightAt(H,k),0)>.02&&($=!0)}if(!$)return Lf;const b=na(cM(A,O)^2654435769),S=Math.round(Te*Te*n.density),I=[];let _=1/0,N=-1/0;for(let U=0;U<S;U++){const X=j+b()*Te,H=W+b()*Te,k=b(),it=i.heightAt(X,H),st=(X-j)/Te,ot=(H-W)/Te;if(k>=xf(g(d,st,ot),g(f,st,ot),X,H,it,i.slopeAt(X,H))||t.covered(X,H,"batu",.85))continue;const _t=b()<.12?b()*.5:.6+b()*.4;I.push([X,it-.04,H,b(),b()*zl,.6+b()*.7,_t,b()*zl]),_=Math.min(_,it),N=Math.max(N,it)}if(!I.length)return Lf;I.sort((U,X)=>U[3]-X[3]);const z=new Float32Array(I.length*rs),D=new Float32Array(I.length);return I.forEach((U,X)=>{z.set(U,X*rs),D[X]=U[3]}),{count:I.length,data:z,ranks:D,center:new G(j+Te/2,(_+N)/2,W+Te/2),radius:Math.hypot(Te/2,Te/2,(N-_)/2)+1.4}}const m=new xr,p=new Ut,M=new cn,y=new G(1/0,0,0),v=new xe,w=[],T=[];let L=!1;function B(A,O,j){if(!A.count)return;const W=Math.max(0,O.distanceTo(A.center)-A.radius);W>j||(M.center.copy(A.center),M.radius=A.radius,m.intersectsSphere(M)&&w.push({ch:A,d:W}))}function E(A,O){c.uTime.value=O;const j=A.position;if(c.uCamPos.value.copy(j),!L&&y.equals(j)&&v.equals(A.quaternion))return;y.copy(j),v.copy(A.quaternion),L=!1,A.updateMatrixWorld(),p.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),m.setFromProjectionMatrix(p);const W=n.radius,$=Math.floor((j.x-W)/Te),b=Math.floor((j.x+W)/Te),S=Math.floor((j.z-W)/Te),I=Math.floor((j.z+W)/Te);w.length=0,T.length=0;for(let N=$;N<=b;N++)for(let z=S;z<=I;z++){const D=(N+32768)*65536+(z+32768),U=u.get(D);if(U===void 0){const X=Math.max(0,Math.abs(j.x-(N+.5)*Te)-Te*.71),H=Math.max(0,Math.abs(j.z-(z+.5)*Te)-Te*.71),k=X*X+H*H;if(k>W*W)continue;const it=(N+.5)*Te,st=(z+.5)*Te;M.center.set(it,i.heightAt(it,st),st),M.radius=Te*.71+12;const ot=m.intersectsSphere(M);T.push({i:N,j:z,key:D,order:k+(ot?0:1e9)});continue}B(U,j,W)}if(T.length){T.sort((D,U)=>D.order-U.order);const N=performance.now();let z=0;for(const D of T){if(z>0&&performance.now()-N>XM)break;const U=x(D.i,D.j);u.set(D.key,U),B(U,j,W),z++}L=z<T.length}w.sort((N,z)=>N.d-z.d);let _=0;for(const{ch:N,d:z}of w){const D=Math.min(qM(N.ranks,jM(z,n.near)),n.max-_);if(!(D<=0)&&(a.set(N.data.subarray(0,D*rs),_*rs),_+=D,_>=n.max))break}r.instanceCount=_,l.visible=_>0,_>0&&(o.clearUpdateRanges(),o.addUpdateRange(0,_*rs),o.needsUpdate=!0)}return l.userData.update=E,l.userData.stats=()=>({instances:r.instanceCount,chunks:u.size}),l}const zi=8,zf=(i,t)=>(i+32768)*65536+(t+32768);function $M(i){if(i.hx===void 0)return i;const t=i.rot||0;return{...i,cos:Math.cos(t),sin:Math.sin(t),radius:Math.hypot(i.hx,i.hz)}}function Hs(i,t,e,n){if(i.hx===void 0){const g=t-i.x,x=e-i.z,m=Math.hypot(g,x);return n.gap=m-i.radius,n.nx=m>1e-6?g/m:1,n.nz=m>1e-6?x/m:0,n.px=i.x+n.nx*i.radius,n.pz=i.z+n.nz*i.radius,n}const s=t-i.x,r=e-i.z,a=s*i.cos-r*i.sin,o=s*i.sin+r*i.cos,c=Math.abs(a)-i.hx,l=Math.abs(o)-i.hz;let u,h,d,f;if(c>0||l>0){d=Math.max(-i.hx,Math.min(i.hx,a)),f=Math.max(-i.hz,Math.min(i.hz,o));const g=a-d,x=o-f,m=Math.hypot(g,x);n.gap=m,u=g/m,h=x/m}else c>l?(n.gap=c,u=Math.sign(a)||1,h=0,d=u*i.hx,f=o):(n.gap=l,u=0,h=Math.sign(o)||1,d=a,f=h*i.hz);return n.nx=u*i.cos+h*i.sin,n.nz=-u*i.sin+h*i.cos,n.px=i.x+d*i.cos+f*i.sin,n.pz=i.z-d*i.sin+f*i.cos,n}function JM(i){const t=i.map($M),e=new Map;for(const a of t){const o=a.radius;for(let c=Math.floor((a.x-o)/zi);c<=Math.floor((a.x+o)/zi);c++)for(let l=Math.floor((a.z-o)/zi);l<=Math.floor((a.z+o)/zi);l++){const u=zf(c,l);let h=e.get(u);h||e.set(u,h=[]),h.push(a)}}let n=0;function s(a,o,c,l){n++;for(let u=Math.floor((a-c)/zi);u<=Math.floor((a+c)/zi);u++)for(let h=Math.floor((o-c)/zi);h<=Math.floor((o+c)/zi);h++){const d=e.get(zf(u,h));if(d)for(const f of d){if(f.seen===n)continue;f.seen=n;const g=f.x-a,x=f.z-o,m=f.radius+c;if(!(g*g+x*x>m*m)&&l(f)===!1)return!1}}return!0}const r={gap:0,nx:0,nz:0,px:0,pz:0};return{list:t,count:t.length,forEachNear:s,probe:Hs,resolve(a,o,c){let l=!1;return s(a.x,a.z,o,u=>{if(Hs(u,a.x,a.z,r),r.gap>=o)return!0;a.x+=r.nx*(o-r.gap),a.z+=r.nz*(o-r.gap);const h=c.x*r.nx+c.z*r.nz;return h<0&&(c.x-=h*r.nx,c.z-=h*r.nz),l=!0,!0}),l},isFree(a,o,c){return s(a,o,c,l=>Hs(l,a,o,r).gap>=c)},clearance(a,o,c=4){let l=c;return s(a,o,c,u=>(l=Math.min(l,Hs(u,a,o,r).gap),!0)),l},hitAt(a,o,c){let l=null,u=c;return s(a,o,c,h=>{const{gap:d}=Hs(h,a,o,r);return d<u&&(u=d,l=h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind}),!0}),l},hitAll(a,o,c,l=8){const u=[];return s(a,o,c,h=>{const{gap:d}=Hs(h,a,o,r);return d<c&&u.push({o:h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind},gap:d}),!0}),u.sort((h,d)=>h.gap-d.gap).slice(0,l).map(h=>h.o)}}}const _e=2,kn=-500-_e*Math.ceil((-500-Yt.minX)/_e),Nn=-500-_e*Math.ceil((-500-Yt.minZ)/_e),Mc=1.25,Dr=.45,QM=12e4,{SQRT2:Gs}=Math,tb=[[1,0,1],[0,1,2],[1,1,4],[-1,1,8]];function eb(i,t,e,n,s,r){const a=e-i,o=n-t,c=Math.max(0,Math.min(1,((s-i)*a+(r-t)*o)/(a*a+o*o))),l=i+a*c-s,u=t+o*c-r;return l*l+u*u}class nb{constructor(t){this.idx=new Int32Array(t),this.key=new Float64Array(t),this.size=0}push(t,e){let n=this.size++;for(;n>0;){const s=n-1>>1;if(this.key[s]<=e)break;this.idx[n]=this.idx[s],this.key[n]=this.key[s],n=s}this.idx[n]=t,this.key[n]=e}pop(){const t=this.idx[0],e=this.idx[--this.size],n=this.key[this.size];let s=0;for(;;){let r=2*s+1;if(r>=this.size||(r+1<this.size&&this.key[r+1]<this.key[r]&&r++,this.key[r]>=n))break;this.idx[s]=this.idx[r],this.key[s]=this.key[r],s=r}return this.idx[s]=e,this.key[s]=n,t}}function ib(i,t){const e=Math.ceil((Yt.maxX-kn)/_e),n=Math.ceil((Yt.maxZ-Nn)/_e),s=e*n,r=O=>kn+(O+.5)*_e,a=O=>Nn+(O+.5)*_e,o=new Float32Array(s);for(let O=0;O<n;O++)for(let j=0;j<e;j++)o[O*e+j]=i.heightAt(r(j),a(O));const c=new Uint8Array(s);for(let O=1;O<n-1;O++)for(let j=1;j<e-1;j++){const W=O*e+j;if(o[W]<-1)continue;const $=(o[W+1]-o[W-1])/(2*_e),b=(o[W+e]-o[W-e])/(2*_e);Math.hypot($,b)<=Mc&&(c[W]=1)}for(const O of i.surfaces){const j=Math.hypot(O.hx,O.hz),W=Math.max(0,Math.floor((O.x-j-kn)/_e)),$=Math.min(e-1,Math.floor((O.x+j-kn)/_e)),b=Math.max(0,Math.floor((O.z-j-Nn)/_e)),S=Math.min(n-1,Math.floor((O.z+j-Nn)/_e));for(let I=b;I<=S;I++)for(let _=W;_<=$;_++){const N=i.surfaceHeight(O,r(_),a(I)),z=I*e+_;N===-1/0||N<o[z]||(o[z]=N,c[z]=1)}}const l=new Uint8Array(s),u={};function h(O,j,W,$,b){if(O.hx===void 0)return Math.sqrt(eb(j,W,$,b,O.x,O.z))-O.radius;const S=Math.ceil(Math.hypot($-j,b-W)/.25);let I=1/0;for(let _=0;_<=S;_++){const N=_/S;I=Math.min(I,t.probe(O,j+($-j)*N,W+(b-W)*N,u).gap)}return I}for(const O of t.list){const j=O.radius+Dr,W=Math.max(0,Math.floor((O.x-j-kn)/_e)-1),$=Math.min(e-1,Math.floor((O.x+j-kn)/_e)+1),b=Math.max(0,Math.floor((O.z-j-Nn)/_e)-1),S=Math.min(n-1,Math.floor((O.z+j-Nn)/_e)+1);for(let N=b;N<=S;N++)for(let z=W;z<=$;z++){const D=N*e+z,{gap:U}=t.probe(O,r(z),a(N),u);if(U<Dr&&(c[D]=0),!(U>Dr+_e*Gs))for(const[X,H,k]of tb){const it=z+X,st=N+H;it<0||it>=e||st>=n||h(O,r(z),a(N),r(it),a(st))<Dr&&(l[D]|=k)}}const I=Math.floor((O.x-kn)/_e),_=Math.floor((O.z-Nn)/_e);I>=0&&_>=0&&I<e&&_<n&&(c[_*e+I]=0)}function d(O,j,W,$){return $===0?l[j*e+Math.min(O,O+W)]&1:W===0?l[Math.min(j,j+$)*e+O]&2:W===$?l[Math.min(j,j+$)*e+Math.min(O,O+W)]&4:$>0?l[j*e+O]&8:l[(j+$)*e+O+W]&8}const f=new Float32Array(s),g=new Int32Array(s),x=new Uint8Array(s),m=new nb(s*2),p=(O,j)=>{const W=Math.min(e-1,Math.max(0,Math.floor((O-kn)/_e)));return Math.min(n-1,Math.max(0,Math.floor((j-Nn)/_e)))*e+W},M=O=>r(O%e),y=O=>a(Math.floor(O/e)),v=(O,j)=>O<=kn||j<=Nn||O>=kn+e*_e||j>=Nn+n*_e?!1:c[p(O,j)]===1,w=(O,j)=>v(O,j)&&t.isFree(O,j,Dr);function T(O,j,W,$){const b=Math.hypot(W-O,$-j),S=Math.max(1,Math.ceil(b/.5));let I=i.surfaceAt(O,j);for(let _=1;_<=S;_++){const N=O+(W-O)*_/S,z=j+($-j)*_/S;if(!w(N,z))return!1;const D=i.surfaceAt(N,z);if(Math.abs(D-I)/(b/S)>Mc)return!1;I=D}return!0}function L(O,j,W,$){if(w(O,j))return{x:O,z:j};const b=i.surfaceAt(O,j)<-1,S=Math.hypot(W-O,$-j),I=Math.ceil(S/(_e*.5));for(let _=1;_<=I;_++){const N=O+(W-O)*_/I,z=j+($-j)*_/I;if(w(N,z)&&(!b||i.surfaceAt(N,z)>-.4))return{x:N,z}}return null}function B(O,j=5){if(c[O])return O;const W=O%e,$=Math.floor(O/e);for(let b=1;b<=j;b++)for(let S=-b;S<=b;S++)for(let I=-b;I<=b;I++){if(Math.max(Math.abs(I),Math.abs(S))!==b)continue;const _=W+I,N=$+S;if(!(_<0||N<0||_>=e||N>=n)&&c[N*e+_])return N*e+_}return-1}const E=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Gs],[1,-1,Gs],[-1,1,Gs],[-1,-1,Gs]];function A(O,j){const W=L(j.x,j.z,O.x,O.z);if(!W)return null;if(Math.hypot(W.x-O.x,W.z-O.z)<40&&T(O.x,O.z,W.x,W.z))return[W];const $=B(p(O.x,O.z)),b=B(p(W.x,W.z));if($<0||b<0)return null;f.fill(1/0),x.fill(0),m.size=0;const S=b%e,I=Math.floor(b/e),_=H=>{const k=Math.abs(H%e-S),it=Math.abs(Math.floor(H/e)-I);return k+it+(Gs-2)*Math.min(k,it)};f[$]=0,m.push($,_($));let N=0,z=!1;for(;m.size;){const H=m.pop();if(H===b){z=!0;break}if(x[H])continue;if(x[H]=1,++N>QM)break;const k=H%e,it=Math.floor(H/e);for(const[st,ot,_t]of E){const gt=k+st,Y=it+ot;if(gt<0||Y<0||gt>=e||Y>=n)continue;const Z=Y*e+gt;if(!c[Z]||x[Z]||st&&ot&&(!c[it*e+gt]||!c[Y*e+k])||d(k,it,st,ot)||Math.abs(o[Z]-o[H])/(_t*_e)>Mc)continue;const rt=f[H]+_t;rt<f[Z]&&(f[Z]=rt,g[Z]=H,m.push(Z,rt+_(Z)))}}if(!z)return null;const D=[b];for(let H=b;H!==$;)H=g[H],D.push(H);D.reverse();const U=[O,...D.map(H=>({x:M(H),z:y(H)})),W],X=[];for(let H=0;H<U.length-1;){let k=H+1;for(;k+1<U.length&&T(U[H].x,U[H].z,U[k+1].x,U[k+1].z);)k++;X.push(U[k]),H=k}return X}return{findPath:A,walkableAt:v,standable:w,lineClear:T,cellSize:_e,size:[e,n],origin:[kn,Nn]}}function Lo(i){const t=new Map,e=new Map,n=i.clone();return Lp(i,n,function(s,r){t.set(r,s),e.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=t.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Lp(i,t,e){e(i,t);for(let n=0;n<i.children.length;n++)Lp(i.children[n],t.children[n],e)}const bc=6,Df=.35,kf=1.1,sb=4,rb=9,ab=60,Sc=2.6,Nf=1,ob=15,Uf=5,cb=1.3,hi={size:3,speed:2.4,sight:7,reach:1.3,hit:.24,dur:.42,linger:25,view:150},lb={x:-425,z:40},Ya={x:-160,z:40},as={kind:"pemain"};function ub(){const i=new Co(.5,.58,40),t=[0,1,2,3].map(r=>{const a=new vn(.07,.26);return a.translate(0,.66,0),a.rotateZ(r*Math.PI/2),a}),n=[i,...t].map(r=>r.toNonIndexed()).flatMap(r=>[...r.attributes.position.array]),s=new he;return s.setAttribute("position",new Wt(n,3)),s}function Dl(i,t,e,n,s,r=.6){return i.heightAt(n,s)>.5&&i.slopeAt(n,s)<.6&&e.walkableAt(n,s)&&t.isFree(n,s,r)}function hb(i,t,e,n,s){for(let r=0;r<=40;r+=2)for(let a=0;a<Math.PI*2;a+=r?2/r:7){const o=n+Math.cos(a)*r,c=s+Math.sin(a)*r;if(!Dl(i,t,e,o,c,.8))continue;const l=[];for(let u=0;u<Uf;u++){const h=u/Uf*Math.PI*2;l.push({x:o+Math.cos(h)*2.6,z:c+Math.sin(h)*2.6})}if(l.every(u=>Dl(i,t,e,u.x,u.z)))return{x:o,z:c,spots:l}}return null}function fb({ground:i,colliders:t,nav:e,asset:n,spawn:s}){const r=new Ce;r.name="musuh";const a=[],o=new vn(1,1),c=new Ge({color:"#2a0d0d",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),l=new Ge({color:"#ff4636",depthTest:!1,depthWrite:!1,toneMapped:!1}),u=ub(),h=new Ge({color:"#ff2a2a",transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1,toneMapped:!1,side:sn}),d=n.model.getObjectByName("head-mesh"),f=new G;d.geometry.computeBoundingBox(),d.geometry.boundingBox.getCenter(f);const g=d.geometry.clone().translate(-f.x,-f.y,-f.z);g.deleteAttribute("skinIndex"),g.deleteAttribute("skinWeight");const x=[],m=_=>vs.findByName(n.clips,_);function p(_,N){const z=new Ce;z.name="orc";const D=Lo(n.model),U=[];D.traverse(gt=>{gt.isMesh&&(gt.material=gt.material.clone(),U.push(gt.material))}),z.add(D);const X=new mu(D),H={};for(const gt of["idle","walk","sprint","die","attack"]){const Y=X.clipAction(m(gt==="attack"?"attack-melee-right":gt));(gt==="die"||gt==="attack")&&(Y.setLoop(ql,1),Y.clampWhenFinished=!0),H[gt]=Y}H.idle.play();const k=new Ce,it=new ee(o,c);it.scale.set(1.08,.2,1),it.renderOrder=11;const st=new ee(o,l);st.renderOrder=12,k.add(it,st),k.visible=!1;const ot=new ee(u,h);ot.visible=!1,ot.renderOrder=13,r.add(z,k,ot),z.position.set(N.x,i.heightAt(N.x,N.z),N.z);const _t=Math.random()*Math.PI*2;return z.rotation.y=_t,{id:_,root:z,model:D,mixer:X,actions:H,current:H.idle,materials:U,bar:k,fill:st,reticle:ot,headMesh:D.getObjectByName("head-mesh"),headBone:D.getObjectByName("head"),home:N,pos:z.position,heading:_t,target:null,wait:Math.random()*3,hp:bc,kx:0,kz:0,flash:0,barTime:0,state:"hidup",deadT:0,headless:!1,marked:!1,raid:null}}function M(_,N,z=.2){const D=_.actions[N];_.current!==D&&(D.reset().play(),D.crossFadeFrom(_.current,z,!1),_.current=D)}const y=Math.atan2(-s.x,-s.z),v=[{x:s.x+Math.sin(y)*16,z:s.z+Math.cos(y)*16},{x:-60,z:-80},{x:205,z:25},{x:40,z:-200},{x:15,z:190}],w=[];for(const _ of v){const N=hb(i,t,e,_.x,_.z);if(N){w.push(N);for(const z of N.spots)a.push(p(a.length,{x:z.x,z:z.z,camp:N}))}}function T(_){_.state="mati",_.deadT=0,_.hp=0,_.marked=!1,_.target=null,_.raid=null,M(_,"die",.08)}function L(_){_.state="hidup",_.hp=bc,_.headless=!1,_.headMesh.visible=!0,_.kx=_.kz=0,_.flash=_.barTime=0,_.model.position.y=0,_.pos.set(_.home.x,i.heightAt(_.home.x,_.home.z),_.home.z),_.actions.die.stop(),_.current.stop(),_.current=_.actions.idle,_.current.reset().play()}function B(_){for(let N=0;N<4;N++){const z=Math.random()*Math.PI*2,D=Math.random()*sb,U=_.home.camp.x+Math.cos(z)*D,X=_.home.camp.z+Math.sin(z)*D;if(Dl(i,t,e,U,X,.5))return{x:U,z:X}}return null}function E(_,N,z){const D=Math.atan2(Math.sin(N-_.heading),Math.cos(N-_.heading));_.heading+=D*Math.min(1,6*z)}let A={near:()=>null,pos:()=>null,strike:()=>{}};function O(_,N,z){const D=_.raid;if(D.target){const st=D.target===as?z:A.pos(D.target);(!st||D.target===as&&Math.hypot(st.x-_.pos.x,st.z-_.pos.z)>25)&&(D.target=null)}if(D.scan-=N,D.scan<=0&&(D.scan=.4,D.target===as&&Math.hypot(z.x-_.pos.x,z.z-_.pos.z)<8||(D.target=A.near(_.pos.x,_.pos.z,hi.sight))),D.cd-=N,D.atk){const{atk:st}=D;st.t+=N;const ot=D.target?D.target===as?z:A.pos(D.target):null;return ot&&E(_,Math.atan2(ot.x-_.pos.x,ot.z-_.pos.z),N),!st.hit&&st.t>=hi.hit&&(st.hit=!0,ot&&Math.hypot(ot.x-_.pos.x,ot.z-_.pos.z)<hi.reach+.6&&A.strike(_,D.target,D.target===as?6:1)),st.t>=hi.dur&&D.atk===st&&(D.atk=null),!1}let U=null,{speed:X}=hi;if(D.target){const st=D.target===as?z:A.pos(D.target),ot=Math.hypot(st.x-_.pos.x,st.z-_.pos.z);if(ot<=hi.reach)return E(_,Math.atan2(st.x-_.pos.x,st.z-_.pos.z),N),D.cd<=0&&(D.atk={t:0,hit:!1},D.cd=1.5+Math.random()*.5,_.actions.attack.reset(),M(_,"attack",.05)),!1;U=st,ot<4&&(X=1.6)}else if(D.i<D.path.length)U=D.path[D.i],Math.hypot(U.x-_.pos.x,U.z-_.pos.z)<1.2&&D.i++;else return D.back?(_.raid=null,!1):(D.idle+=N,D.idle>hi.linger&&(D.back=!0,D.path=[...D.path].reverse(),D.path.push({x:_.home.x,z:_.home.z}),D.i=0),!1);const H=U.x-_.pos.x,k=U.z-_.pos.z,it=Math.hypot(H,k)||1;return E(_,Math.atan2(H,k),N),_.pos.x+=H/it*Math.min(X*N,it),_.pos.z+=k/it*Math.min(X*N,it),X}const j=new Ut,W=new Ut().makeTranslation(f.x,f.y,f.z);function $(_,N){let z=x.find(st=>!st.mesh.visible);z||(z={mesh:new ee(g),vel:new G,axis:new G,spin:0,t:0,s:1},z.mesh.castShadow=!0,r.add(z.mesh),x.push(z)),_.root.updateMatrixWorld(!0);const D=_.headMesh.skeleton;j.multiplyMatrices(_.headBone.matrixWorld,D.boneInverses[D.bones.indexOf(_.headBone)]).multiply(_.headMesh.bindMatrix).multiply(W),j.decompose(z.mesh.position,z.mesh.quaternion,z.mesh.scale),z.s=z.mesh.scale.x,z.mesh.material=_.headMesh.material,z.mesh.visible=!0;let U=_.pos.x-N.x,X=_.pos.z-N.z;const H=Math.hypot(U,X)||1;U/=H,X/=H;const k=(Math.random()-.5)*1.6,it=2+Math.random()*1.5;z.vel.set((U-X*k)*it,4.5+Math.random()*1.5,(X+U*k)*it),z.axis.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),z.spin=7+Math.random()*6,z.t=0,_.headMesh.visible=!1,_.headless=!0}function b(_){for(const N of x){if(!N.mesh.visible)continue;N.t+=_;const z=N.mesh.position;N.vel.y-=14*_,z.addScaledVector(N.vel,_),N.mesh.rotateOnWorldAxis(N.axis,N.spin*_);const D=Math.max(i.heightAt(z.x,z.z),-.2)+.4;z.y<D&&(z.y=D,N.vel.y<-2?(N.vel.set(N.vel.x*.55,-N.vel.y*.35,N.vel.z*.55),N.spin*=.5):(N.vel.set(0,0,0),N.spin=0)),N.t>3&&N.mesh.scale.setScalar(N.s*Math.max(0,1-(N.t-3)/.5)),N.t>3.5&&(N.mesh.visible=!1)}}let S=0;const I=new G;return{object:r,list:a,camps:w,get alive(){return a.filter(_=>_.state==="hidup").length},hit(_,N,z,D){const U=[];for(const X of a){if(X.state!=="hidup"||Math.hypot(X.pos.x-_.x,X.pos.z-_.z)>_.r+Df)continue;let H=X.pos.x-D.x,k=X.pos.z-D.z;const it=Math.hypot(H,k)||1;H/=it,k/=it,X.kx=H*z,X.kz=k*z,X.hp-=N,X.flash=.15,X.barTime=4,X.target=null,X.raid&&(X.raid.target=as),X.hp<=0&&T(X),U.push({id:X.id,x:X.pos.x,y:X.pos.y,z:X.pos.z,dead:X.state!=="hidup"})}return U},decapitate(_,N){const z=[];for(const D of _){const U=a[D];!U||U.state!=="hidup"||($(U,N),T(U),z.push({id:D,x:U.pos.x,y:U.pos.y,z:U.pos.z}))}return z},pickTargets(_,N,z,D){const U=a.filter(it=>it.state==="hidup"&&Math.hypot(it.pos.x-_,it.pos.z-N)<=z).sort((it,st)=>Math.hypot(it.pos.x-_,it.pos.z-N)-Math.hypot(st.pos.x-_,st.pos.z-N)).slice(0,D),X=[];let H=_,k=N;for(;U.length;){let it=0;for(let ot=1;ot<U.length;ot++)Math.hypot(U[ot].pos.x-H,U[ot].pos.z-k)<Math.hypot(U[it].pos.x-H,U[it].pos.z-k)&&(it=ot);const[st]=U.splice(it,1);X.push({id:st.id,x:st.pos.x,z:st.pos.z}),H=st.pos.x,k=st.pos.z}return X},position(_){const N=a[_];return N&&N.state==="hidup"?{x:N.pos.x,z:N.pos.z}:null},damage(_,N,z){const D=a[_];if(!D||D.state!=="hidup")return;let U=D.pos.x-z.x,X=D.pos.z-z.z;const H=Math.hypot(U,X)||1;U/=H,X/=H,D.kx=U*1.6,D.kz=X*1.6,D.hp-=N,D.flash=.15,D.barTime=4,D.hp<=0&&T(D)},setFoes(_){A=_},startRaid(_){const N=w.filter(z=>Math.hypot(z.x-_.x,z.z-_.z)>60).map(z=>({c:z,members:a.filter(D=>D.home.camp===z&&D.state==="hidup"&&!D.raid)})).filter(z=>z.members.length>=2).sort((z,D)=>Math.hypot(z.c.x-Ya.x,z.c.z-Ya.z)-Math.hypot(D.c.x-Ya.x,D.c.z-Ya.z));for(const{c:z,members:D}of N){const U=e.findPath({x:z.x,z:z.z},lb);if(U)return D.slice(0,hi.size).forEach((X,H)=>{X.target=null,X.raid={path:U.slice(),i:0,target:null,scan:H*.13,cd:0,atk:null,idle:0,back:!1},X.raid.delay=H*.9}),!0}return!1},get raidActive(){return a.some(_=>_.raid&&_.state==="hidup")},raiders(){return a.filter(_=>_.raid&&_.state==="hidup").map(_=>({id:_.id,x:_.pos.x,z:_.pos.z}))},reviveAll(){for(const _ of a)L(_)},mark(_,N){for(const z of _)a[z]&&(a[z].marked=N&&a[z].state==="hidup")},update(_,N,z,D=z.position){var H;S+=_;const U=z.position,X=z.attackMove==="penggal";for(const k of a){const it=k.pos.x-U.x,st=k.pos.z-U.z,ot=Math.hypot(it,st),_t=Math.hypot(k.pos.x-D.x,k.pos.z-D.z)<(k.raid?hi.view:ab);if(k.state==="hilang"){k.deadT+=_,k.deadT>ob&&L(k),k.root.visible=!1,k.bar.visible=k.reticle.visible=!1;continue}if(k.root.visible=_t,k.state==="mati")k.deadT+=_,k.deadT>Sc&&(k.model.position.y=-((k.deadT-Sc)/Nf)*.9),k.deadT>Sc+Nf&&(k.state="hilang",k.deadT=0);else{let gt=!1,Y=0;if(k.raid&&k.raid.delay>0&&(k.raid.delay-=_),Math.abs(k.kx)+Math.abs(k.kz)>.05){const Z=k.pos.x+k.kx*_,rt=k.pos.z+k.kz*_;i.heightAt(Z,rt)>-.3&&(k.pos.x=Z,k.pos.z=rt);const F=Math.exp(-7*_);k.kx*=F,k.kz*=F}else if(k.raid)k.raid.delay<=0&&(Y=O(k,_,U));else if(ot<rb)E(k,Math.atan2(-it,-st),_),k.target=null;else if(k.target){const Z=k.target.x-k.pos.x,rt=k.target.z-k.pos.z,F=Math.hypot(Z,rt);F<.3?(k.target=null,k.wait=1.5+Math.random()*3):(E(k,Math.atan2(Z,rt),_),k.pos.x+=Z/F*kf*_,k.pos.z+=rt/F*kf*_,gt=!0)}else(k.wait-=_)<=0&&(k.target=B(k),k.wait=2);!X&&ot<.75&&ot>1e-4&&(k.pos.x=U.x+it/ot*.75,k.pos.z=U.z+st/ot*.75);for(const Z of a){if(Z===k||Z.state!=="hidup")continue;const rt=k.pos.x-Z.pos.x,F=k.pos.z-Z.pos.z,dt=Math.hypot(rt,F);dt<.7&&dt>1e-4&&(k.pos.x+=rt/dt*(.7-dt)*.5,k.pos.z+=F/dt*(.7-dt)*.5)}t.resolve(k.pos,Df,I.set(0,0,0)),k.pos.y=i.surfaceAt(k.pos.x,k.pos.z),(H=k.raid)!=null&&H.atk||(Y?(M(k,Y>2?"sprint":"walk"),k.actions.sprint.timeScale=Y/3.6):M(k,gt?"walk":"idle"))}if(k.root.rotation.y=k.heading,k.flash>0){k.flash=Math.max(0,k.flash-_);for(const gt of k.materials)gt.emissive.setScalar(k.flash/.15*.8)}if(k.barTime-=_,k.bar.visible=_t&&k.state==="hidup"&&k.barTime>0,k.bar.visible){k.bar.position.set(k.pos.x,k.pos.y+2.05,k.pos.z),k.bar.quaternion.copy(N.quaternion);const gt=Math.max(0,k.hp/bc);k.fill.scale.set(gt,.13,1),k.fill.position.x=-(1-gt)/2}k.reticle.visible=_t&&k.marked&&k.state==="hidup",k.reticle.visible&&(k.reticle.position.set(k.pos.x,k.pos.y+cb,k.pos.z),k.reticle.quaternion.copy(N.quaternion),k.reticle.rotateZ(S*2.5),k.reticle.scale.setScalar(1+.12*Math.sin(S*14))),_t&&k.mixer.update(_)}b(_)}}}const gi=[{id:"perisai",name:"Pasukan perisai",count:5e3,flag:0,map:"#d8463c"},{id:"tombak",name:"Pasukan tombak",count:5e3,flag:3,map:"#4f78d0"},{id:"pedang",name:"Pasukan pedang",count:5e3,flag:4,map:"#3f9f6a"},{id:"pemanah",name:"Pasukan pemanah",count:5e3,flag:1,map:"#e3b43a"},{id:"kavaleri",name:"Pasukan berkuda",count:5e3,flag:2,map:"#e9e6dc"}],kl=Math.PI,Di=(_n.x0+_n.x1)/2,tn=_n.z0+30,ne={files:200,ranks:25,sx:1.2,sz:1.35,group:50,lane:4,gap:6},oe={files:50,ranks:50,sx:1.35,sz:2.75,group:25,lane:4,gap:10},ki={inf:[.55,.6],cav:[.55,1.35]},Of=(i,t,e,n)=>(i-1)*t+(Math.ceil(i/e)-1)*n,Ni=(i,t,e,n,s)=>i+t*e+Math.floor(t/n)*s;function db(i){let t=Math.imul(i^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,(t>>>0)/4294967296}function pb(){const i=gi.reduce((M,y)=>M+y.count,0),t=[],e=[],n=[],s=new Float32Array(i+8),r=new Float32Array(i+8),a=new Uint8Array(i+8);let o=0;const c=(M,y,v)=>{s[o]=M,r[o]=y,a[o]=v,o++},l=Of(ne.files,ne.sx,ne.group,ne.lane),u=(ne.ranks-1)*ne.sz,h=Di-l/2;for(let M=0;M<4;M++){const y=tn+M*(u+ne.gap);for(let v=0;v<ne.ranks;v++)for(let w=0;w<ne.files;w++)c(Ni(h,w,ne.sx,ne.group,ne.lane),y+v*ne.sz,M);for(let v=0;v<ne.files/ne.group;v++){const w=Ni(h,v*ne.group,ne.sx,ne.group,ne.lane),T=Ni(h,(v+1)*ne.group-1,ne.sx,ne.group,ne.lane);e.push({type:M,x0:w-ki.inf[0],x1:T+ki.inf[0],z0:y-ki.inf[1],z1:y+u+ki.inf[1]})}}const d=tn+3*(u+ne.gap)+u,f=Of(oe.files,oe.sx,oe.group,oe.lane),g=(oe.ranks-1)*oe.sz,x=[Di-l/2-oe.gap-f,Di+l/2+oe.gap];for(const M of x){for(let y=0;y<oe.ranks;y++)for(let v=0;v<oe.files;v++)c(Ni(M,v,oe.sx,oe.group,oe.lane),tn+y*oe.sz,4);for(let y=0;y<oe.files/oe.group;y++){const v=Ni(M,y*oe.group,oe.sx,oe.group,oe.lane),w=Ni(M,(y+1)*oe.group-1,oe.sx,oe.group,oe.lane);e.push({type:4,x0:v-ki.cav[0],x1:w+ki.cav[0],z0:tn-ki.cav[1],z1:tn+g+ki.cav[1]})}}const m=x.map(M=>M+f/2);for(const M of[m[0],Di-96,Di-32,Di+32,Di+96,m[1]])t.push({x:M,z:tn-9});t.push({x:Di,z:tn-20,chief:!0});for(const M of t)c(M.x,M.z,5);for(let M=1;M<ne.files/ne.group;M++){const y=Ni(h,M*ne.group,ne.sx,ne.group,ne.lane)-(ne.lane+ne.sx)/2;n.push([y,tn-3,y,d+3,ne.lane-.4])}for(let M=1;M<4;M++){const y=tn+M*(u+ne.gap)-(ne.gap+ne.sz)/2;n.push([h-2,y,h+l+2,y,ne.gap-.6])}for(const M of x){const y=Ni(M,oe.group,oe.sx,oe.group,oe.lane)-(oe.lane+oe.sx)/2;n.push([y,tn-3,y,tn+g+3,oe.lane-.4])}for(const M of[h-oe.gap/2,h+l+oe.gap/2])n.push([M,tn-3,M,Math.max(d,tn+g)+3,oe.gap-1]);const p=new Float32Array(o);for(let M=0;M<o;M++)p[M]=db(M);return{soldiers:{count:o,x:s.subarray(0,o),z:r.subarray(0,o),type:a.subarray(0,o),phase:p},total:i,officers:t,blocks:e,lanes:n,bounds:{x0:x[0]-2,x1:x[1]+f+2,z0:tn-22,z1:Math.max(d,tn+g)+2},heading:kl}}const ze=be.y,te={selatan:0,timur:Math.PI/2,utara:Math.PI,barat:-Math.PI/2};function mb(i){const t=na(8128),e=(b,S)=>b+(S-b)*t(),n=b=>b[Math.floor(t()*b.length)],s=_M(i.heightAt),r={spans:s,build:[],colliders:[],surfaces:[],roads:[],pave:[],lawn:[],fields:[],blocked:[],trees:[],boats:[],spots:[],paths:[],roofs:[],tracks:[],army:null},a=(b,S,I,_,N)=>{const z=Math.cos(N),D=Math.sin(N);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([U,X])=>[b+U*I/2*z+X*_/2*D,S-U*I/2*D+X*_/2*z])},o=(b,S,I,_,N)=>Math.max(...a(b,S,I,_,N).map(([z,D])=>i.heightAt(z,D)),i.heightAt(b,S)),c=(b,S,I,_,N,z)=>{r.colliders.push({x:b,z:S,hx:I/2,hz:_/2,rot:N,kind:z})},l=(b,S,I,_,N=0)=>r.blocked.push({x:b,z:S,hx:I/2,hz:_/2,rot:N}),u=b=>(r.build.push(b),b);function h(b,S,I,_,N,z,D="tembok",U="bata",X=ze){const H=Math.hypot(I-b,_-S);if(H<.5)return;const k=Math.atan2(I-b,_-S),it=(b+I)/2,st=(S+_)/2;u({type:D,x:it,y:X,z:st,rot:k,len:H,t:N,h:z}),c(it,st,N,H,k,U),l(it,st,N+2,H,k)}function d(b,S,I){const _=[];let N=b;for(const[z,D]of[...I].sort((U,X)=>U[0]-X[0]))z-D>N&&_.push([N,z-D]),N=Math.max(N,z+D);return S>N&&_.push([N,S]),_}const f=2.2,g=5,x=7.5,m={utara:[-580,-490],selatan:[-630,-480],barat:[-10,50],timur:[-20,100]},p=[[be.x0,be.z0],[be.x1,be.z0],[be.x1,be.z1],[be.x0,be.z1]];for(const[b,S]of p)u({type:"menara",x:b,y:ze,z:S,rot:0,size:x,h:7.6}),c(b,S,x,x,0,"bata"),l(b,S,x+2,x+2);const M=b=>uM.filter(S=>b==="utara"&&S.z===be.z0||b==="selatan"&&S.z===be.z1||b==="barat"&&S.x===be.x0||b==="timur"&&S.x===be.x1),y=b=>b.id==="timur"?5.5:4.5;for(const b of["utara","selatan","barat","timur"]){const S=b==="utara"||b==="selatan",I={utara:be.z0,selatan:be.z1,barat:be.x0,timur:be.x1}[b],[_,N]=S?[be.x0,be.x1]:[be.z0,be.z1],z=[[_,x/2],[N,x/2]];for(const D of m[b]){z.push([D,3]);const[U,X]=S?[D,I]:[I,D];u({type:"menara",x:U,y:ze,z:X,rot:0,size:6,h:6.8}),c(U,X,6,6,0,"bata"),l(U,X,8,8)}for(const D of M(b)){const U=S?D.x:D.z,X=y(D);z.push([U,D.w/2+X]);for(const H of[-1,1]){const k=U+H*(D.w/2+X/2),[it,st]=S?[k,I]:[I,k],ot=S?0:Math.PI/2;u({type:"bentar",x:it,y:ze,z:st,rot:ot,w:X,d:4.2,h:D.id==="timur"?13:10.5,mirror:H>0?S?1:-1:S?-1:1}),c(it,st,S?X:4.2,S?4.2:X,0,"bata"),l(it,st,X+1,5.2,ot)}for(const H of[-1,1]){const k=U+H*(D.w/2-.9);for(const it of[-3.6,3.6]){const[st,ot]=S?[k,I+it]:[I+it,k],_t=S?it>0?te.selatan:te.utara:it>0?te.timur:te.barat;r.spots.push({x:st,z:ot,rot:_t,role:"penjaga",anim:"idle"})}}}for(const[D,U]of d(_,N,z))S?h(D,I,U,I,f,g):h(I,D,I,U,f,g)}for(const b of dM)r.roads.push(b);{const b=bp,S=1.2,I=3.6,_=b.gate,N=5,z=9;h(b.x0,b.z0,b.x1,b.z0,S,I,"tembok-dalam"),h(b.x0,b.z1,b.x1,b.z1,S,I,"tembok-dalam"),h(b.x0,b.z0,b.x0,b.z1,S,I,"tembok-dalam"),h(b.x1,b.z0,b.x1,_.z-z/2,S,I,"tembok-dalam"),h(b.x1,_.z+z/2,b.x1,b.z1,S,I,"tembok-dalam"),u({type:"paduraksa",x:_.x,y:ze,z:_.z,rot:Math.PI/2,w:z,d:5,opening:N,h:15});for(const ot of[-1,1]){const _t=_.z+ot*(N/2+(z-N)/4);c(_.x,_t,5,(z-N)/2,0,"bata"),r.spots.push({x:_.x+3.4,z:_.z+ot*2.1,rot:te.timur,role:"penjaga",anim:"idle"})}l(_.x,_.z,6,z+1),r.roofs.push({x:_.x,z:_.z,hx:3.5,hz:N/2,r:6});const D={x:-628,z:40,w:30,d:28,h:1};u({type:"pendopo",x:D.x,y:ze,z:D.z,rot:Math.PI/2,w:D.d,d:D.w,h:D.h}),r.surfaces.push({x:D.x,z:D.z,hx:D.w/2,hz:D.d/2,rot:0,y0:ze+D.h,y1:ze+D.h});const U=10,X=3.2;r.surfaces.push({x:D.x+D.w/2+X/2,z:D.z,hx:U/2,hz:X/2,rot:-Math.PI/2,y0:ze+.02,y1:ze+D.h});const H=D.x+D.w/2,k=D.x-D.w/2,it=D.z-D.d/2,st=D.z+D.d/2;for(const[ot,_t,gt,Y]of[[k,it,H,it],[k,st,H,st],[k,it,k,st],[H,it,H,D.z-U/2],[H,D.z+U/2,H,st]]){const Z=Math.hypot(gt-ot,Y-_t),rt=Math.atan2(gt-ot,Y-_t);c((ot+gt)/2,(_t+Y)/2,.5,Z,rt,"batu")}l(D.x,D.z,D.w+2,D.d+2),r.roofs.push({x:D.x,z:D.z,hx:D.w/2+1.5,hz:D.d/2+1.5,r:10});for(const[ot,_t]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:D.x+ot*3.2,z:D.z+_t*3.2,radius:.35,kind:"kayu"});for(let ot=-2;ot<=2;ot++)for(const _t of[-1,1])r.colliders.push({x:D.x+ot*6.3,z:D.z+_t*12.4,radius:.28,kind:"kayu"}),Math.abs(ot)<2&&!(_t>0&&ot===0)&&r.colliders.push({x:D.x+_t*13.4,z:D.z+ot*6.2,radius:.28,kind:"kayu"});r.spots.push({x:D.x-9.2,z:D.z,rot:te.timur,role:"raja",anim:"sit",y:ze+D.h+.5}),r.spots.push({x:D.x-8,z:D.z-3,rot:te.timur,role:"penjaga",anim:"idle",y:ze+D.h}),r.spots.push({x:D.x-8,z:D.z+3,rot:te.timur,role:"penjaga",anim:"idle",y:ze+D.h});for(const ot of[-1,1])r.spots.push({x:H+X+1.2,z:D.z+ot*6,rot:te.timur,role:"penjaga",anim:"idle"});u({type:"bangsal",x:-669,y:ze,z:40,rot:Math.PI/2,w:32,d:16,h:1.5}),c(-669,40,16,32,0,"bata"),l(-669,40,18,34);for(const[ot,_t,gt]of[[-676,9,9],[-676,71,7]])u({type:"meru",x:ot,y:ze,z:_t,rot:0,base:7,tiers:gt}),c(ot,_t,7,7,0,"bata"),l(ot,_t,9,9);for(const[ot,_t]of[[-647,8],[-647,72],[-612,9],[-612,71]]){u({type:"bale",x:ot,y:ze,z:_t,rot:0,w:6,d:6}),r.roofs.push({x:ot,z:_t,hx:3.5,hz:3.5,r:5});for(const[gt,Y]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:ot+gt*2.6,z:_t+Y*2.6,radius:.22,kind:"kayu"});l(ot,_t,7,7)}r.lawn.push({x0:b.x0+1,z0:b.z0+1,x1:b.x1-1,z1:b.z1-1}),r.pave.push({x0:H,z0:_.z-5,x1:b.x1,z1:_.z+5}),r.pave.push({x0:k-2,z0:it-2,x1:H+2,z1:st+2}),r.pave.push({x0:-680,z0:20,x1:k,z1:60});for(const[ot,_t]of[[-660,4],[-660,76],[-626,4],[-626,76],[-640,16],[-640,64],[-686,30],[-686,50]])r.trees.push({type:"kamboja",x:ot,z:_t,s:e(.9,1.15)});r.pave.push({x0:b.x1,z0:b.z0,x1:pf.x0,z1:b.z1});for(let ot=b.z0+6;ot<=b.z1-6;ot+=12)Math.abs(ot-_.z)<8||(u({type:"umbul",x:b.x1+7,y:ze,z:ot,rot:Math.PI/2,h:9,color:Math.round(ot)%3}),r.colliders.push({x:b.x1+7,z:ot,radius:.18,kind:"kayu"}))}{const b=pf;r.lawn.push({...b});for(const S of[26,54]){const I=(b.x0+b.x1)/2;r.trees.push({type:"beringin",x:I,z:S,s:1}),r.colliders.push({x:I,z:S,radius:1.7,kind:"pohon"});const _=6;for(const[N,z,D,U]of[[I-_,S-_,I+_,S-_],[I-_,S+_,I+_,S+_],[I-_,S-_,I-_,S+_],[I+_,S-_,I+_,S+_]])h(N,z,D,U,.45,1.1,"pagar")}for(let S=0;S<6;S++){const I=S/6*Math.PI*2,_=S<3?26:54;r.spots.push({x:(b.x0+b.x1)/2+Math.cos(I)*8.5,z:_+Math.sin(I)*8.5,rot:I+Math.PI/2,role:"warga",anim:S%2?"sit":"idle"})}}{const b=fM;r.pave.push({...b});const S=[-492,-478,-464,-450,-437],I=[55,66,76],_=["buah","ikan","kain","sayur","gerabah"];I.forEach((N,z)=>S.forEach((D,U)=>{if(z===1&&U===2)return;const X=z===0?te.utara:te.selatan;u({type:"warung",x:D,y:ze,z:N,rot:X,color:(z*5+U)%6,goods:_[(z+U*2)%_.length]}),c(D,N,3.6,2.2,0,"kayu"),l(D,N,4.4,3.4);const H=z===0?1.9:-1.9;r.spots.push({x:D+e(-.8,.8),z:N+H,rot:X,role:"penjual",anim:n(["idle","interact","interact"])})})),u({type:"sumur",x:-464,y:ze,z:66,rot:0}),r.colliders.push({x:-464,z:66,radius:1.1,kind:"batu"});for(const[N,z]of[[-497,50],[-433,50],[-497,80],[-433,80]])r.trees.push({type:"mangga",x:N,z,s:.8});for(let N=0;N<8;N++)r.spots.push({x:e(b.x0+4,b.x1-4),z:n([60.5,71]),rot:t()*Math.PI*2,role:"pembeli",anim:"idle"})}{const b=hM;r.pave.push({...b});const S=6;h(b.x0,b.z0,b.x1,b.z0,.8,1.6,"pagar-batu","batu"),h(b.x0,b.z0,b.x0,b.z1,.8,1.6,"pagar-batu","batu"),h(b.x1,b.z0,b.x1,b.z1,.8,1.6,"pagar-batu","batu"),h(b.x0,b.z1,b.x-S/2-3,b.z1,.8,1.6,"pagar-batu","batu"),h(b.x+S/2+3,b.z1,b.x1,b.z1,.8,1.6,"pagar-batu","batu");for(const I of[-1,1]){const _=b.x+I*(S/2+1.5);u({type:"bentar",x:_,y:ze,z:b.z1,rot:0,w:3,d:2.6,h:6.5,mirror:I,stone:!0}),c(_,b.z1,3,2.6,0,"batu")}u({type:"candi",x:b.x,y:ze,z:b.z,rot:0,base:17}),c(b.x,b.z,17,17,0,"batu"),l(b.x,b.z,19,19);for(const[I,_]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const N=b.x+I*21,z=b.z+_*23;u({type:"candi",x:N,y:ze,z,rot:0,base:6}),c(N,z,6,6,0,"batu"),l(N,z,7,7)}r.spots.push({x:b.x,z:b.z+12,rot:te.utara,role:"pendeta",anim:"sit"}),r.spots.push({x:b.x-3,z:b.z+12.5,rot:te.utara,role:"warga",anim:"sit"})}const v=[-694,-647,-600,-553,-504],w={"-694":5,"-647":5,"-600":5,"-553":5,"-504":6,"-426":5},T=[{z:[-54,-29],w:[5,5]},{z:[-29,-5],w:[5,6]},{z:[85,110],w:[6,5],east:!0},{z:[110,134],w:[5,5],east:!0}],L=b=>b<-600?["joglo","joglo","bata","bata","panggung"]:["bata","bata","panggung","panggung","joglo","limasan"];function B(b,S,I,_,N){let z=b+e(.4,1.4);for(;z<S-5;){const D=n(L(z)),U=D==="joglo"?e(8,9.5):D==="panggung"?e(5.6,6.8):e(6.4,8.2);if(z+U>S)break;const X=Math.min(N,D==="joglo"?e(7,8):D==="panggung"?e(5.4,6.2):e(6,7.2)),H=z+U/2,k=I+(_===te.utara?X/2:-X/2);E(D,H,k,U,X,_),z+=U+e(1,2.4)}}function E(b,S,I,_,N,z){const D=o(S,I,_,N,z);u({type:`rumah-${b}`,x:S,y:D,z:I,rot:z,w:_,d:N,roof:Math.floor(t()*4),wall:t()}),c(S,I,_+(b==="panggung"?.3:.1),N+.1,z,b==="bata"||b==="limasan"?"bata":"kayu"),l(S,I,_+1.5,N+1.5,z)}for(const b of T){const S=b.east?[...v,-426]:v;for(let I=0;I<S.length-1;I++){const _=S[I]+w[S[I]]/2+.8,N=S[I+1]-w[S[I+1]]/2-.8,z=b.z[0]+b.w[0]/2+.8,D=b.z[1]-b.w[1]/2-.8,U=D-z;U>=13?(B(_,N,z,te.utara,(U-1)/2),B(_,N,D,te.selatan,(U-1)/2)):B(_,N,z,te.utara,U);const X=(z+D)/2;for(let H=_+6;H<N-4;H+=e(9,15))r.trees.push({type:n(["mangga","pisang","pisang","kelapa"]),x:H+e(-1,1),z:X+e(-.6,.6),s:e(.75,1)})}}const A=[{x0:-418,z0:-175,x1:-340,z1:22},{x0:-418,z0:58,x1:-345,z1:225},{x0:-790,z0:-175,x1:-665,z1:-72},{x0:-638,z0:-185,x1:-560,z1:-75}];for(const b of A)r.fields.push(b);const O=gf("sawah");r.fields.push({x:O.x,z:O.z,r:O.r*.82});const j=(b,S)=>r.fields.some(I=>I.r?Math.hypot(b-I.x,S-I.z)<I.r:ms(b,S,I));function W(b,S,I,_,N){for(const[z,D]of[...a(b,S,I+2,_+2,N),[b,S]]){const U=i.heightAt(z,D);if(U<2.6||U>16||r.roads.some(([X,H,k,it,st])=>wp(z,D,X,H,k,it)<st/2+.6)||ji(z,D,be)<6)return!1}return i.slopeAt(b,S)>.25?!1:!r.blocked.some(z=>Math.hypot(z.x-b,z.z-S)<Math.hypot(z.hx,z.hz)+Math.hypot(I,_)/2+1)}function $(b,S,I,_,N,z,D,U=!1){const X=Math.hypot(I-b,_-S),H=(I-b)/X,k=(_-S)/X;for(let it=e(4,10);it<X-4;it+=z+e(-2,4))for(const st of[-1,1]){if(t()<.22)continue;const ot=n(D),_t=ot==="lumbung"?3.6:ot==="panggung"?e(5.6,6.8):e(6.2,7.8),gt=ot==="lumbung"?3.6:ot==="panggung"?e(5.4,6.2):e(5.8,7),Y=N/2+1.8+gt/2,Z=b+H*it-k*st*Y,rt=S+k*it+H*st*Y,F=Math.atan2(k*st,-H*st);!U&&j(Z,rt)||W(Z,rt,_t,gt,F)&&E(ot,Z,rt,_t,gt,F)}}$(-420,40,-340,40,7,11,["panggung","bata","limasan","panggung"],!0),$(-553,146,-553,262,6,10,["panggung","bata","limasan","lumbung"],!0),$(-647,-64,-647,-170,5,12,["panggung","lumbung","panggung"],!0),$(-704,110,-770,110,5,11,["panggung","bata","panggung"],!0),$(-730,116,-730,196,5,11,["panggung","lumbung","panggung"],!0);{let b=250;for(;i.heightAt(-553,b)>qr&&b<320;)b+=.25;const S={x0:-590,z0:b-16,x1:-516,z1:b-1};r.pave.push(S),r.roads.push([-553,262,-553,b-8,8]);for(const _ of[-580,-526]){const N=o(_,S.z0-5,14,8,0);u({type:"gudang",x:_,y:N,z:S.z0-5,rot:te.selatan,w:14,d:8}),c(_,S.z0-5,14,8,0,"kayu"),l(_,S.z0-5,15,9)}const I=1.75;for(const _ of[-578,-553,-528]){const z=b-2+18;u({type:"dermaga",x:_,y:I,z,rot:0,w:4,len:36}),r.surfaces.push({x:_,z,hx:2,hz:36/2,rot:0,y0:I,y1:I}),l(_,z,5,36),r.paths.push([_,S.z0+6,_,b-2+36-2]),r.boats.push({type:"jukung",x:_-4.2,z:z+e(-6,8),rot:t()*.2-.1}),r.boats.push({type:"jukung",x:_+4.2,z:z+e(-8,6),rot:Math.PI+t()*.2-.1}),r.spots.push({x:_+e(-1,1),z:b+36-6,rot:te.selatan,role:"nelayan",anim:"interact"})}r.boats.push({type:"jong",x:-542,z:b+30,rot:.08}),r.paths.push([-578,S.z0+6,-528,S.z0+6]);for(let _=0;_<10;_++){const N=e(S.x0+3,S.x1-3),z=e(S.z0+1.5,S.z0+4);Math.abs(N+578)<3||Math.abs(N+553)<3||Math.abs(N+528)<3||(u({type:t()<.5?"peti":"gentong",x:N,y:i.heightAt(N,z),z,rot:t()*Math.PI}),r.colliders.push({x:N,z,radius:.55,kind:"kayu"}))}for(let _=0;_<5;_++)r.spots.push({x:e(S.x0+4,S.x1-4),z:S.z0+2.2,rot:te.selatan,role:"kuli",anim:n(["interact","idle"])});r.harbor={shore:b,quay:S}}for(const b of s){const S=Math.min(b.a,b.b)-4,I=Math.max(b.a,b.b)+4,_=(S+I)/2,N=(I-S)/2,z=qr+.15,D=b.axis==="x"?Math.PI/2:0,[U,X]=b.axis==="x"?[_,b.at]:[b.at,_],H=(Math.min(b.a,b.b)-S)/(2*N),k=(Math.max(b.a,b.b)-S)/(2*N),it={x:U,z:X,hx:b.width/2,hz:N,rot:D,y0:z,y1:z,arch:b.rise,a0:H,a1:k};r.surfaces.push(it),u({type:b.stone?"jembatan-batu":"jembatan-kayu",x:U,y:0,z:X,rot:D,len:2*N,w:b.width,surface:it,a:b.a,b:b.b,axis:b.axis,at:b.at});for(const st of[-1,1]){const ot=st*(b.width/2-.2),[_t,gt]=b.axis==="x"?[_,b.at+ot]:[b.at+ot,_];r.colliders.push({x:_t,z:gt,hx:.2,hz:N-1,rot:D,kind:b.stone?"bata":"kayu"})}if(l(U,X,b.width+3,2*N+6,D),r.roads.push(b.axis==="x"?[S-6,b.at,I+6,b.at,b.width-1]:[b.at,S-6,b.at,I+6,b.width-1]),r.paths.push(b.axis==="x"?[S-2,b.at,I+2,b.at]:[b.at,S-2,b.at,I+2]),b.stone)for(const st of[S-7,I+7]){for(const gt of[-1,1]){const Y=gt*(b.width/2+1.7),[Z,rt]=b.axis==="x"?[st,b.at+Y]:[b.at+Y,st];u({type:"bentar",x:Z,y:i.heightAt(Z,rt),z:rt,rot:D,w:3.4,d:3.4,h:9,mirror:-gt}),c(Z,rt,3.4,3.4,0,"bata"),r.spots.push({x:st+(st<_?-2.8:2.8),z:b.at+gt*(b.width/2-.4),rot:st<_?te.barat:te.timur,role:"penjaga",anim:"idle"})}const[ot,_t]=b.axis==="x"?[st+(st<_?-6:6),b.at]:[b.at,st];r.pave.push({x0:ot-9,z0:_t-9,x1:ot+9,z1:_t+9});for(const gt of[-1,1]){const[Y,Z]=[ot+(st<_?-1:1)*3,_t+gt*8];u({type:"umbul",x:Y,y:i.heightAt(Y,Z),z:Z,rot:0,h:9,color:gt>0?0:2}),r.colliders.push({x:Y,z:Z,radius:.18,kind:"kayu"})}}}{const b=s.find(N=>N.id==="sawah"),S=b.b-16,I=b.at;r.pave.push({x0:I-9,z0:S-9,x1:I+9,z1:S+9}),r.roads.push([I,b.b,I,S,3]);const _=[[-15,-2,te.timur,"panggung"],[15,-2,te.barat,"panggung"],[-14,-16,te.timur,"lumbung"],[14,-16,te.barat,"lumbung"],[-4,-22,te.selatan,"panggung"],[6,-22,te.selatan,"lumbung"],[-15,12,te.timur,"lumbung"],[15,12,te.barat,"panggung"]];for(const[N,z,D,U]of _){const X=U==="lumbung"?3.6:6.2,H=U==="lumbung"?3.6:5.8;E(U,I+N,S+z,X,H,D)}r.trees.push({type:"mangga",x:I-4,z:S+4,s:1.1});for(let N=0;N<10;N++){const z=t()*Math.PI*2,D=e(30,70),U=O.x+Math.cos(z)*D,X=O.z+Math.sin(z)*D;i.heightAt(U,X)<2.6||r.spots.push({x:U,z:X,rot:t()*Math.PI*2,role:"petani",anim:n(["pickup","pickup","idle"])})}for(const[N,z]of[[-45,-30],[40,-45],[-30,40]]){const D=O.x+N,U=O.z+z;u({type:"dangau",x:D,y:i.heightAt(D,U),z:U,rot:t()*Math.PI,w:3,d:3}),r.colliders.push({x:D,z:U,hx:1.5,hz:1.5,rot:0,kind:"kayu"}),l(D,U,4,4)}r.roads.push([I,S,I,O.z-70,2.2],[I-50,O.z,I+50,O.z,2.2])}{const b=gf("nelayan"),S=s.find(D=>D.id==="nelayan"),I=b.x,_=b.z-4;r.pave.push({x0:I-8,z0:_-8,x1:I+8,z1:_+8}),r.roads.push([S.at,S.b,S.at,_,3],[S.at,_,I,_,3]);for(let D=0;D<11;D++){const U=D/11*Math.PI*2+.3,X=22+D%2*9,H=I+Math.cos(U)*X,k=_+Math.sin(U)*X,it=Math.atan2(I-H,_-k);W(H,k,6.2,5.8,it)&&E("panggung",H,k,6.2,5.8,it)}for(let D=0;D<6;D++){const U=Math.PI*(.15+D*.13),X=I+Math.cos(U)*45,H=_+Math.sin(U)*45;i.heightAt(X,H)<1.2||(u({type:"jemuran",x:X,y:i.heightAt(X,H),z:H,rot:U}),r.colliders.push({x:X,z:H,hx:1.8,hz:.4,rot:U,kind:"kayu"}))}let N=b.z;for(;i.heightAt(b.x,N)>qr&&N<b.z+140;)N+=.25;const z=26;u({type:"dermaga",x:b.x,y:1.75,z:N-2+z/2,rot:0,w:3.2,len:z}),r.surfaces.push({x:b.x,z:N-2+z/2,hx:1.6,hz:z/2,rot:0,y0:1.75,y1:1.75}),r.roads.push([b.x,_,b.x,N-1,3]),r.paths.push([b.x,N-1,b.x,N+z-4]);for(let D=0;D<4;D++)r.boats.push({type:"jukung",x:b.x+(D%2?3.4:-3.4),z:N+6+D*5,rot:(D%2?Math.PI:0)+t()*.2});for(let D=0;D<5;D++){const U=Math.PI*(.9+D*.22);let X=40;for(;X<120&&i.heightAt(b.x+Math.cos(U)*X,b.z+Math.sin(U)*X)>.6;)X+=.5;r.boats.push({type:"jukung-darat",x:b.x+Math.cos(U)*(X-3),z:b.z+Math.sin(U)*(X-3),rot:U+Math.PI/2})}for(let D=0;D<6;D++)r.spots.push({x:I+e(-14,14),z:_+e(-14,14),rot:t()*Math.PI*2,role:"nelayan",anim:n(["interact","idle","sit"])})}{const b=s.find(z=>z.id==="pura"),S=Br,I={x0:S.x-15,z0:S.z-13,x1:S.x+15,z1:S.z+13},_=i.heightAt(S.x,S.z);r.pave.push(I),r.roads.push([b.b,S.z,I.x1,S.z,4]),r.paths.push([I.x1,S.z,S.x,S.z]);const N=4;h(I.x0,I.z0,I.x1,I.z0,.8,1.8,"pagar","bata",_),h(I.x0,I.z1,I.x1,I.z1,.8,1.8,"pagar","bata",_),h(I.x0,I.z0,I.x0,I.z1,.8,1.8,"pagar","bata",_),h(I.x1,I.z0,I.x1,S.z-N/2-2.6,.8,1.8,"pagar","bata",_),h(I.x1,S.z+N/2+2.6,I.x1,I.z1,.8,1.8,"pagar","bata",_);for(const z of[-1,1]){const D=S.z+z*(N/2+1.3);u({type:"bentar",x:I.x1,y:_,z:D,rot:Math.PI/2,w:2.6,d:2.4,h:7,mirror:-z}),c(I.x1,D,2.4,2.6,0,"bata")}for(const[z,D,U,X]of[[-8,-6,11,6],[-8,6,7,5],[2,7,3,4]])u({type:"meru",x:S.x+z,y:_,z:S.z+D,rot:0,base:X,tiers:U}),c(S.x+z,S.z+D,X,X,0,"bata");u({type:"bale",x:S.x+3,y:_,z:S.z-6,rot:0,w:5,d:5}),r.roofs.push({x:S.x+3,z:S.z-6,hx:3,hz:3,r:4.5});for(const[z,D]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:S.x+3+z*2.1,z:S.z-6+D*2.1,radius:.2,kind:"kayu"});for(const[z,D]of[[10,-9],[10,9],[-13,0]])r.trees.push({type:"kamboja",x:S.x+z,z:S.z+D,s:1});for(let z=b.b-6;z>I.x1+4;z-=7)for(const D of[-1,1]){const U=S.z+D*3.2;u({type:"umbul",x:z,y:i.heightAt(z,U),z:U,rot:0,h:7,color:1}),r.colliders.push({x:z,z:U,radius:.15,kind:"kayu"})}r.spots.push({x:S.x+1,z:S.z+1,rot:te.barat,role:"pendeta",anim:"sit",y:_}),r.spots.push({x:S.x-1,z:S.z-2,rot:te.barat,role:"warga",anim:"sit",y:_})}for(const[b,S,I,_,N]of[[-420,40,-340,40,7],[-553,146,-553,262,6]]){const z=Math.hypot(I-b,_-S);for(let D=6;D<z;D+=13)for(const U of[-1,1]){const X=D/z,H=b+(I-b)*X+(S===_?0:U*(N/2+1.2)),k=S+(_-S)*X+(S===_?U*(N/2+1.2):0);r.blocked.some(it=>Math.hypot(it.x-H,it.z-k)<Math.hypot(it.hx,it.hz)+1.5)||r.trees.push({type:"kelapa",x:H,z:k,s:e(.85,1.1)})}}{const b=na(5150),S=(F,dt)=>F+(dt-F)*b(),I=_n,_=(I.x0+I.x1)/2,N=pb();r.army=N;const z=s.find(F=>F.id==="wira"),D=r.harbor.quay,U=I.z0-10,X=I.x0-7,H=I.x1+7;r.roads.push([D.x1,(D.z0+D.z1)/2+1,z.at-3,Math.min(z.a,z.b)-7,5]),r.roads.push([z.at,Math.max(z.a,z.b)+6,z.at,U,5]),r.roads.push([X+12,U,H-12,U,7],[X,U+12,X+12,U,5],[H-12,U,H,U+12,5]),r.roads.push([X,U+12,X,I.z1-8,5],[H,U+12,H,I.z1-8,5]),r.lawn.push({...I});for(const F of N.lanes)r.tracks.push(F);for(const F of N.blocks)r.colliders.push({x:(F.x0+F.x1)/2,z:(F.z0+F.z1)/2,hx:(F.x1-F.x0)/2,hz:(F.z1-F.z0)/2,rot:0,kind:"prajurit"});for(const F of N.officers)r.colliders.push({x:F.x,z:F.z,hx:.55,hz:1.35,rot:0,kind:"prajurit"});const k={x:_,z:U-19,w:24,d:13,h:1.6},it=o(k.x,k.z,k.w,k.d,0);u({type:"siti-hinggil",x:k.x,y:it,z:k.z,rot:te.selatan,w:k.w,d:k.d,h:k.h}),r.surfaces.push({x:k.x,z:k.z,hx:k.w/2,hz:k.d/2,rot:0,y0:it+k.h,y1:it+k.h});const st=7,ot=3.6;r.surfaces.push({x:k.x,z:k.z+k.d/2+ot/2,hx:st/2,hz:ot/2,rot:Math.PI,y0:it+.02,y1:it+k.h});{const F=k.x-k.w/2,dt=k.x+k.w/2,bt=k.z-k.d/2,ft=k.z+k.d/2;for(const[xt,R,Q,C]of[[F,bt,dt,bt],[F,bt,F,ft],[dt,bt,dt,ft],[F,ft,k.x-st/2,ft],[k.x+st/2,ft,dt,ft]])c((xt+Q)/2,(R+C)/2,.5,Math.hypot(Q-xt,C-R),Math.atan2(Q-xt,C-R),"batu");for(const[xt,R]of Sp)r.colliders.push({x:k.x+xt,z:k.z+R,radius:.3,kind:"kayu"})}l(k.x,k.z,k.w+2,k.d+2+ot*2),r.roofs.push({x:k.x,z:k.z,hx:k.w/2,hz:k.d/2,r:7}),r.pave.push({x0:k.x-k.w/2-3,z0:k.z-k.d/2-3,x1:k.x+k.w/2+3,z1:U-3});for(const F of[-1,1])r.spots.push({x:k.x+F*2.4,z:k.z+k.d/2-1.4,rot:te.selatan,role:"penjaga",anim:"idle",y:it+k.h}),r.spots.push({x:k.x+F*(st/2+1.2),z:k.z+k.d/2+ot+.8,rot:te.selatan,role:"penjaga",anim:"idle"});for(const F of[-1,1])r.spots.push({x:z.at+F*4,z:Math.max(z.a,z.b)+6,rot:te.utara,role:"penjaga",anim:"idle"});const _t=(F,dt,bt,ft)=>{u({type:"umbul",x:F,y:i.heightAt(F,dt),z:dt,rot:0,h:bt,color:ft}),r.colliders.push({x:F,z:dt,radius:.18,kind:"kayu"})};for(let F=X+16,dt=0;F<H-14;F+=22,dt++)Math.abs(F-_)>16&&_t(F,U+5,9,gi[dt%gi.length].flag);for(const F of N.blocks){if(F.type===4)continue;const dt=N.blocks.find(ft=>ft.type===F.type),bt=N.blocks.filter(ft=>ft.type===F.type).pop();F===dt&&_t(F.x0-3.5,F.z0+1,11,gi[F.type].flag),F===bt&&_t(F.x1+3.5,F.z0+1,11,gi[F.type].flag)}const gt=N.blocks.filter(F=>F.type===4);_t(gt[0].x0-3.5,gt[0].z0+1,11,gi[4].flag),_t(gt[gt.length-1].x1+3.5,gt[0].z0+1,11,gi[4].flag);const Y=(F,dt,bt,ft,xt)=>a(F,dt,bt+1,ft+1,xt).every(([R,Q])=>i.heightAt(R,Q)>3)&&i.slopeAt(F,dt)<.25,Z=_o.find(F=>F.id==="tenda");for(let F=Z.x1-6;F>Z.x0+2;F-=11)for(let dt=Z.z0+18;dt<Z.z1-3;dt+=7.5){const xt=te.timur;Y(F,dt,3.4,4.4,xt)&&(u({type:"tenda",x:F,y:o(F,dt,3.4,4.4,xt),z:dt,rot:xt,w:3.4,d:4.4,color:Math.floor(S(0,3))}),c(F,dt,3.4,4.4,xt,"kayu"),l(F,dt,3.4+1,4.4+1,xt))}for(const F of[Z.x1-10,Z.x1-30]){const dt=Z.z0+6;Y(F,dt,12,7,0)&&(u({type:"gudang",x:F,y:o(F,dt,12,7,0),z:dt,rot:te.selatan,w:12,d:7}),c(F,dt,12,7,0,"kayu"),l(F,dt,13,8))}const rt=_o.find(F=>F.id==="kandang");for(const F of[rt.x0+9,rt.x0+33])for(let dt=rt.z0+22;dt<rt.z1-12;dt+=38){const xt=te.barat;Y(F,dt,30,7,xt)&&(u({type:"kandang",x:F,y:o(F,dt,30,7,xt),z:dt,rot:xt,w:30,d:7}),c(F,dt,30,7,xt,"kayu"),l(F,dt,31,8,xt))}for(let F=0;F<6;F++){const dt=S(rt.x0+4,rt.x1-4),bt=rt.z0+6+S(-2,2);i.heightAt(dt,bt)<3||(u({type:"jerami",x:dt,y:i.heightAt(dt,bt),z:bt,rot:S(0,Math.PI)}),r.colliders.push({x:dt,z:bt,radius:.9,kind:"kayu"}))}for(let F=X+20;F<H-20;F+=26)Math.abs(F-_)<22||Math.abs(F-z.at)<8||r.trees.push({type:"kelapa",x:F+S(-2,2),z:U-6.5,s:S(.85,1.1)})}for(const b of r.trees){const S={beringin:0,kamboja:.3,mangga:.5,kelapa:.4,pisang:0}[b.type];S&&r.colliders.push({x:b.x,z:b.z,radius:S*b.s,kind:"pohon"})}return r}const Ue={x0:-980,z0:-470,x1:-30,z1:640},gb=-150;function xb(i,t){const e=Ue.x1-Ue.x0,n=Ue.z1-Ue.z0,s=new Uint8Array(e*n*4),r=new Uint8Array(e*n),a=f=>Ue.x0+f+.5,o=f=>Ue.z0+f+.5;function c(f,g,x,m,p,M){const y=Math.max(0,Math.floor(g-Ue.x0)),v=Math.min(e-1,Math.ceil(m-Ue.x0)),w=Math.max(0,Math.floor(x-Ue.z0)),T=Math.min(n-1,Math.ceil(p-Ue.z0));for(let L=w;L<=T;L++)for(let B=y;B<=v;B++){const E=M(a(B),o(L));if(E<=0)continue;const A=(L*e+B)*4+f;s[A]=Math.max(s[A],Math.round(Math.min(1,E)*255))}}const l=f=>Math.min(1,Math.max(0,.5-f)),u=(f,g)=>{const x=t.heightAt(f,g);return x>2.5&&x<14&&t.slopeAt(f,g)<.22};for(const f of i.fields)f.r?c(1,f.x-f.r,f.z-f.r,f.x+f.r,f.z+f.r,(g,x)=>u(g,x)?l(Math.hypot(g-f.x,x-f.z)-f.r):0):c(1,f.x0,f.z0,f.x1,f.z1,(g,x)=>u(g,x)?l(ji(g,x,f)):0);for(const f of i.lawn)c(3,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(g,x)=>l(ji(g,x,f)));for(const[f,g,x,m,p]of[...i.roads,...i.tracks])c(0,Math.min(f,x)-p,Math.min(g,m)-p,Math.max(f,x)+p,Math.max(g,m)+p,(M,y)=>l(wp(M,y,f,g,x,m)-p/2));for(const f of i.pave)c(2,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(g,x)=>l(ji(g,x,f)));for(let f=0;f<e*n;f++){const g=Math.max(s[f*4],s[f*4+2])/255;s[f*4+1]=Math.round(s[f*4+1]*(1-g)),s[f*4+3]=Math.round(s[f*4+3]*(1-g)),(s[f*4]>60||s[f*4+1]>60||s[f*4+2]>60)&&(r[f]=1)}for(const f of i.blocked){const g=Math.hypot(f.hx,f.hz)+1,x=Math.cos(f.rot||0),m=Math.sin(f.rot||0);for(let p=Math.max(0,Math.floor(f.z-g-Ue.z0));p<=Math.min(n-1,Math.ceil(f.z+g-Ue.z0));p++)for(let M=Math.max(0,Math.floor(f.x-g-Ue.x0));M<=Math.min(e-1,Math.ceil(f.x+g-Ue.x0));M++){const y=a(M)-f.x,v=o(p)-f.z;Math.abs(y*x-v*m)<=f.hx+1&&Math.abs(y*m+v*x)<=f.hz+1&&(r[p*e+M]=1)}}const h=new ys(s,e,n,Ke,Pn);h.magFilter=He,h.minFilter=xn,h.generateMipmaps=!0,h.wrapS=h.wrapT=Jn,h.needsUpdate=!0;const d=(f,g)=>{if(f>=gb&&g<300)return!1;const x=Math.floor(f-Ue.x0),m=Math.floor(g-Ue.z0);return x>=0&&m>=0&&x<e&&m<n&&r[m*e+x]===1};return{texture:h,data:s,x0:Ue.x0,z0:Ue.z0,width:e,depth:n,reserved:(f,g,x=0)=>d(f,g)||d(f+x,g)||d(f-x,g)||d(f,g+x)||d(f,g-x),at(f,g){const x=Math.floor(f-Ue.x0),m=Math.floor(g-Ue.z0);if(x<0||m<0||x>=e||m>=n)return null;const p=(m*e+x)*4;return{jalan:s[p]/255,sawah:s[p+1]/255,batu:s[p+2]/255,rumput:s[p+3]/255}}}}const nt={POLOS:0,BATA:1,GENTENG:2,JERAMI:3,KAYU:4,BATU:5,SIRAP:6,UBIN:7,ANYAMAN:8,PLESTER:9},at={bata:"#a5523a",batuPutih:"#d3c8b2",andesit:"#8f8b84",andesitTua:"#6e6b66",kayu:"#8a5a35",kayuTua:"#5e3d24",kayuMuda:"#b08454",plester:"#ebe3d1",genteng:"#b65a32",gentengTua:"#5a4a40",ijuk:"#3d3732",alang:"#bb9c5c",bambu:"#c9ad74",emas:"#d9a82e",gelap:"#2b2420",merah:"#c8312a",putih:"#f0eee5",kuning:"#e2b32b",biru:"#2f5fa8",hijau:"#3a8a4c"},Ka=new Nt,Ac=new Ut,Ff=new Zt,Bf=new xe,Hf=new on,fi=new G,Ui=new G,qa=new G;class ce{constructor(){this.pos=[],this.nor=[],this.col=[],this.kind=[],this.sway=[]}add(t,e,n,s={}){const r=t.index?t.toNonIndexed():t;return this.addRaw(r.attributes.position.array,r.attributes.normal.array,e,n,s)}addRaw(t,e,n,s,{x:r=0,y:a=0,z:o=0,rx:c=0,ry:l=0,rz:u=0,sx:h=1,sy:d=1,sz:f=1,shade:g=[.84,1.04],sway:x=0}={}){let m=1/0,p=-1/0;for(let T=1;T<t.length;T+=3)t[T]<m&&(m=t[T]),t[T]>p&&(p=t[T]);const M=Math.max(.001,p-m);Ka.set(n);const y=c===0&&u===0&&h===1&&d===1&&f===1,v=Math.cos(l),w=Math.sin(l);y||(Hf.set(c,l,u),Bf.setFromEuler(Hf),Ac.compose(fi.set(r,a,o),Bf,Ui.set(h,d,f)),Ff.getNormalMatrix(Ac));for(let T=0;T<t.length;T+=3){const L=(t[T+1]-m)/M,B=g[0]+(g[1]-g[0])*L;y?(this.pos.push(r+t[T]*v+t[T+2]*w,a+t[T+1],o-t[T]*w+t[T+2]*v),this.nor.push(e[T]*v+e[T+2]*w,e[T+1],-e[T]*w+e[T+2]*v)):(fi.set(t[T],t[T+1],t[T+2]).applyMatrix4(Ac),this.pos.push(fi.x,fi.y,fi.z),fi.set(e[T],e[T+1],e[T+2]).applyMatrix3(Ff).normalize(),this.nor.push(fi.x,fi.y,fi.z)),this.col.push(Ka.r*B,Ka.g*B,Ka.b*B),this.kind.push(s),this.sway.push(x*L)}return this}box(t,e,n,s,r,a={}){const o=t/2,c=n/2,l=[],u=[],h=(d,f,g,x,m)=>{for(const p of[d,f,g,d,g,x])l.push(p[0],p[1],p[2]),u.push(m[0],m[1],m[2])};return h([o,0,c],[o,0,-c],[o,e,-c],[o,e,c],[1,0,0]),h([-o,0,-c],[-o,0,c],[-o,e,c],[-o,e,-c],[-1,0,0]),h([-o,0,c],[o,0,c],[o,e,c],[-o,e,c],[0,0,1]),h([o,0,-c],[-o,0,-c],[-o,e,-c],[o,e,-c],[0,0,-1]),h([-o,e,c],[o,e,c],[o,e,-c],[-o,e,-c],[0,1,0]),h([-o,0,-c],[o,0,-c],[o,0,c],[-o,0,c],[0,-1,0]),this.addRaw(l,u,s,r,a)}cyl(t,e,n,s,r,a,o={}){return this.add(new ke(t,e,n,s).translate(0,n/2,0),r,a,o)}faces(t,e,n,s={}){const r=[],a=[];for(const[o,c,l]of t){Ui.set(c[0]-o[0],c[1]-o[1],c[2]-o[2]),qa.set(l[0]-o[0],l[1]-o[1],l[2]-o[2]),Ui.cross(qa).normalize();for(const u of[o,c,l])r.push(u[0],u[1],u[2]),a.push(Ui.x,Ui.y,Ui.z)}return this.addRaw(r,a,e,n,{shade:[.96,1.04],...s})}skirt(t,e,n,s,r,a,o,c,l={}){const u=[[-t/2,n,-e/2],[t/2,n,-e/2],[t/2,n,e/2],[-t/2,n,e/2]],h=[[-s/2,a,-r/2],[s/2,a,-r/2],[s/2,a,r/2],[-s/2,a,r/2]],d=[];for(let f=0;f<4;f++){const g=(f+1)%4;d.push([u[g],u[f],h[f]],[u[g],h[f],h[g]])}return this.faces(d.filter(([f,g,x])=>(Ui.set(g[0]-f[0],g[1]-f[1],g[2]-f[2]),qa.set(x[0]-f[0],x[1]-f[1],x[2]-f[2]),Ui.cross(qa).lengthSq()>1e-8)),o,c,l)}hip(t,e,n,s,r,a,o={}){const c=Math.max(0,Math.abs(t-e)*.9);return t>=e?this.skirt(t,e,n,c,0,n+s,r,a,o):this.skirt(t,e,n,0,c,n+s,r,a,o)}gable(t,e,n,s,r,a,o=r,c=a,l={}){const u=[-t/2,n,-e/2],h=[t/2,n,-e/2],d=[t/2,n,e/2],f=[-t/2,n,e/2],g=[-t/2,n+s,0],x=[t/2,n+s,0];return this.faces([[h,u,g],[h,g,x],[f,d,x],[f,x,g]],r,a,l),this.faces([[u,f,g],[d,h,x]],o,c,l)}build(){const t=new he;return t.setAttribute("position",new Wt(this.pos,3)),t.setAttribute("normal",new Wt(this.nor,3)),t.setAttribute("color",new Wt(this.col,3)),t.setAttribute("aKind",new Wt(this.kind,1)),t.setAttribute("aSway",new Wt(this.sway,1)),t.computeBoundingSphere(),t}}function Mu(i,t,e,n,s,{windows:r=!0,door:a=1}={}){if(i.box(a,Math.min(2.1,s*.75),.1,at.kayuTua,nt.KAYU,{y:n,z:e/2+.01}),!!r)for(const o of[-1,1])t>5&&i.box(.8,.8,.1,at.gelap,nt.POLOS,{x:o*t*.3,y:n+s*.42,z:e/2+.01}),i.box(.1,.8,.8,at.gelap,nt.POLOS,{x:o*(t/2+.01),y:n+s*.42})}const zo=(i,t,e,n=.45)=>i.box(t+.3,n+1.6,e+.3,at.andesit,nt.BATU,{y:-1.6,shade:[.7,1]});function _b(i,t,e){const n=new ce;return zo(n,i,t),n.box(i,.9,t,at.bata,nt.BATA,{y:.45}),n.box(i,1.9,t,at.plester,nt.PLESTER,{y:1.35}),n.box(i+.12,.14,t+.12,at.batuPutih,nt.POLOS,{y:3.2}),Mu(n,i,t,.45,2.8),n.hip(i+1.3,t+1.3,3.3,Math.min(i,t)*.42,e,nt.GENTENG),n.box(.25,.25,.25,at.gentengTua,nt.POLOS,{x:Math.max(0,i-t)*.45,y:3.3+Math.min(i,t)*.42-.05}),n}function vb(i,t,e){const n=new ce;zo(n,i,t),n.box(i,3,t,at.kayuMuda,nt.KAYU,{y:.45}),Mu(n,i,t,.45,2.9),n.hip(i+1.2,t+1,3.4,Math.min(i,t)*.5,e,nt.SIRAP),n.box(i*.9,.12,1.6,e,nt.SIRAP,{y:2.8,z:t/2+.8,rx:.25});for(const s of[-1,1])n.cyl(.1,.1,2.75,6,at.kayuTua,nt.KAYU,{x:s*i*.4,y:.45,z:t/2+1.4});return n}function yb(i,t,e){const n=new ce;zo(n,i,t,.6),n.box(i*.86,3.1,t*.86,at.kayu,nt.KAYU,{y:.6}),Mu(n,i*.86,t*.86,.6,3.1);for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1],[0,1]])n.cyl(.12,.12,3.3,6,at.kayuTua,nt.KAYU,{x:s*i*.47,y:.6,z:r*t*.47});return n.skirt(i+1.6,t+1.6,3.6,i*.56,t*.56,4.9,e,nt.GENTENG),n.hip(i*.6,t*.6,4.8,3,e,nt.GENTENG),n.box(.3,.45,.3,at.emas,nt.POLOS,{y:7.7}),n}function Mb(i,t,e){const n=new ce;for(let s=0;s<3;s++)for(const r of[-1,1])n.cyl(.13,.15,2.9,6,at.kayuTua,nt.KAYU,{x:(s-1)*(i*.42),y:-1.5,z:r*t*.42});n.box(i,.25,t,at.kayu,nt.KAYU,{y:1.3}),n.box(i-.3,2.1,t-.3,at.bambu,nt.ANYAMAN,{y:1.55}),n.box(.95,1.8,.1,at.kayuTua,nt.KAYU,{y:1.55,z:(t-.3)/2+.01});for(const s of[-1,1])n.box(.7,.6,.1,at.gelap,nt.POLOS,{x:s*i*.3,y:2.3,z:(t-.3)/2+.01});return n.box(.9,.12,2,at.kayuTua,nt.KAYU,{y:.55,z:t/2+.75,rx:.62}),n.gable(i+1.4,t+1.7,3.55,2.7,e,nt.JERAMI,at.bambu,nt.ANYAMAN),n.box(i+1.6,.18,.3,at.ijuk,nt.POLOS,{y:6.2}),n}function bb(i){const t=new ce;for(const[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.cyl(.12,.14,3.3,6,at.kayuTua,nt.KAYU,{x:e*1.1,y:-1.5,z:n*1.1}),t.cyl(.42,.42,.1,8,at.kayu,nt.KAYU,{x:e*1.1,y:1.55,z:n*1.1});return t.box(2.8,.2,2.8,at.kayu,nt.KAYU,{y:1.65}),t.box(2.2,1,2.2,at.bambu,nt.ANYAMAN,{y:1.85}),t.skirt(4.2,4.2,2,3.4,3.4,2.7,i,nt.JERAMI),t.skirt(3.4,3.4,2.7,2.1,2.1,4.4,i,nt.JERAMI),t.skirt(2.1,2.1,4.4,0,0,6,i,nt.JERAMI),t}function Sb(i,t,e){const n=new ce;return zo(n,i,t,.3),n.box(i,3.6,t,at.kayu,nt.KAYU,{y:.3}),n.box(2.6,2.6,.12,at.kayuTua,nt.KAYU,{y:.3,z:t/2+.01}),n.gable(i+1,t+1.4,3.9,2.4,e,nt.GENTENG,at.kayu,nt.KAYU),n}const Ab={buah:["#e0a020","#d84a2a","#7fb03a","#f2d24b"],ikan:["#9fb4c2","#c7d3dc","#7d8f9c"],kain:["#c8312a","#2f62a8","#e2b32b","#3f8f4f","#8a3f9a"],sayur:["#4f9a2f","#7cbf3c","#d84a2a","#e8e0c0"],gerabah:["#a8603a","#8f4f30","#c27a4a"]},Gf=["#c8312a","#e07a20","#e2b32b","#3f8f4f","#2f62a8","#8a3f9a"];function wb(i,t){const e=new ce;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.07,.07,2.4,5,at.kayuTua,nt.KAYU,{x:s*1.8,z:r*1.3});e.box(3.4,.85,1.1,at.kayu,nt.KAYU,{z:.45}),e.gable(4.2,3.2,2.35,.7,Gf[i],nt.POLOS,Gf[i],nt.POLOS,{sway:.06});const n=Ab[t];for(let s=0;s<7;s++){const r=-1.4+s*.47;t==="kain"?e.box(.36,.22,.8,n[s%n.length],nt.POLOS,{x:r,y:.85,z:.45}):t==="gerabah"?e.cyl(.12,.17,.32,7,n[s%n.length],nt.POLOS,{x:r,y:.85,z:.45}):e.add(new qi(.2,0).translate(0,.2,0),n[s%n.length],nt.POLOS,{x:r,y:.82,z:.45,sy:t==="ikan"?.5:1,sx:t==="ikan"?1.6:1})}for(const s of[-1,1])e.cyl(.32,.25,.4,8,at.bambu,nt.ANYAMAN,{x:s*1.3,z:1.45});return e}function Tb(){const i=new ce;i.cyl(1,1.05,.9,10,at.andesit,nt.BATU),i.cyl(.8,.8,.02,10,"#26343a",nt.POLOS,{y:.85});for(const t of[-1,1])i.box(.15,2.1,.15,at.kayuTua,nt.KAYU,{x:t*.9});return i.gable(2.4,1.6,2.1,.6,at.genteng,nt.GENTENG),i}function Eb(i,t,e){const n=new ce;n.box(t+.5,1.6,i,at.andesit,nt.BATU,{y:-1.2}),n.box(t,e,i,at.bata,nt.BATA,{y:.4}),n.box(t+.35,.3,i,at.batuPutih,nt.POLOS,{y:e+.4}),n.box(t+.2,.25,i,at.bata,nt.BATA,{y:e+.7});const s=Math.max(1,Math.round(i/3));for(let r=0;r<s;r++){const a=-i/2+(r+.5)*(i/s);n.box(t*.55,.7,.9,at.bata,nt.BATA,{y:e+.95,z:a}),n.skirt(t*.55,.9,e+1.65,0,0,e+2.1,at.batuPutih,nt.POLOS,{z:a})}return n}function Rb(i,t,e){const n=new ce;return n.box(t+.3,1.5,i,at.andesit,nt.BATU,{y:-1.1}),n.box(t,1.2,i,at.bata,nt.BATA,{y:.4}),n.box(t,e-1.2,i,at.plester,nt.PLESTER,{y:1.6}),n.add(Cb(i,t+.8,.7),at.genteng,nt.GENTENG,{y:e+.4,ry:Math.PI/2}),n}function Cb(i,t,e){const n=new ce;n.gable(i,t,0,e,"#ffffff",0);const s=new he;return s.setAttribute("position",new Wt(n.pos,3)),s.setAttribute("normal",new Wt(n.nor,3)),s}function Vf(i,t,e,n=!1){const s=new ce;return s.box(t+.2,1.2,i,at.andesit,nt.BATU,{y:-1}),s.box(t,e,i,n?at.andesit:at.bata,n?nt.BATU:nt.BATA,{y:.2}),s.box(t+.2,.18,i,n?at.andesitTua:at.batuPutih,nt.POLOS,{y:e+.2}),s}function Pb(i,t){const e=new ce;e.box(i+.8,1.8,i+.8,at.andesit,nt.BATU,{y:-1.4}),e.box(i,t,i,at.bata,nt.BATA,{y:.4}),e.box(i+.5,.35,i+.5,at.batuPutih,nt.POLOS,{y:t+.4}),e.box(i+.2,.5,i+.2,at.bata,nt.BATA,{y:t+.75});const n=t+1.25;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.14,.14,2.3,6,at.kayuTua,nt.KAYU,{x:s*i*.3,y:n,z:r*i*.3});return e.hip(i*.85,i*.85,n+2.3,i*.42,at.gentengTua,nt.GENTENG),e.box(.25,.4,.25,at.emas,nt.POLOS,{y:n+2.3+i*.42-.05}),e}function Ib(i,t,e,n,s=!1){const r=new ce,a=s?at.andesit:at.bata,o=s?nt.BATU:nt.BATA,c=s?at.andesitTua:at.batuPutih,l=-n*i/2,u=6,h=1.2,d=(e-h)*.82;r.box(i+.4,h+1.2,t+.4,at.andesit,nt.BATU,{x:n*.2,y:-1.2});let f=h;for(let x=0;x<u;x++){const m=x/u,p=i*(1-.62*m),M=t*(1-.5*m),y=d/u*(x===0?1.6:.88),v=l+n*p/2;r.box(p,y,M,a,o,{x:v,y:f}),r.box(p+.12,.14,M+.18,c,nt.POLOS,{x:v+n*.06,y:f+y-.07}),f+=y}const g=i*.32;return r.skirt(g,t*.45,f,0,0,e,a,o,{x:l+n*g/2}),r}function Lb(i,t,e,n){const s=new ce,r=(i-e)/2;s.box(i+1,1.6,t+1,at.andesit,nt.BATU,{y:-1.2});for(const c of[-1,1])s.box(r,4.6,t,at.bata,nt.BATA,{x:c*(e/2+r/2),y:.4});s.box(i,1.4,t,at.bata,nt.BATA,{y:5}),s.box(i+.3,.2,t+.3,at.batuPutih,nt.POLOS,{y:6.4});let a=6.6;const o=5;for(let c=0;c<o;c++){const l=c/o,u=i*(.85-.6*l),h=t*(.95-.55*l),d=(n-9)/o;s.box(u,d,h,at.bata,nt.BATA,{y:a}),s.box(u+.2,.14,h+.2,at.batuPutih,nt.POLOS,{y:a+d-.07}),a+=d}return s.skirt(i*.3,t*.4,a,0,0,n,at.bata,nt.BATA),s}function zb(i,t,e){const n=new ce;n.box(i,e+1.4,t,at.bata,nt.BATA,{y:-1.4}),n.box(i+.3,.16,t+.3,at.batuPutih,nt.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",nt.UBIN,{y:e});for(let o=0;o<4;o++)n.box(10,e*(o+1)/4,.8,at.andesit,nt.BATU,{y:0,z:t/2+3.2-(o+.5)*.8});const s=(o,c)=>n.box(o.w,.55,o.d,at.bata,nt.BATA,{...c,y:e});s({w:i,d:.4},{z:-t/2+.2}),s({w:.4,d:t},{x:-i/2+.2}),s({w:.4,d:t},{x:i/2-.2});for(const o of[-1,1])s({w:(i-10)/2,d:.4},{x:o*(5+(i-10)/4),z:t/2-.2});for(const[o,c]of[[-1,-1],[1,-1],[1,1],[-1,1]])n.cyl(.32,.36,9.4,8,at.kayuTua,nt.KAYU,{x:o*3.2,y:e,z:c*3.2});const r=[];for(let o=-2;o<=2;o++)for(const c of[-1,1])r.push([c*12.4,o*6.3]);for(const o of[-1,0,1])for(const c of[-1,1])c>0&&o===0||r.push([o*6.2,c*13.4]);for(const[o,c]of r)n.cyl(.24,.27,4.4,8,at.kayu,nt.KAYU,{x:o,y:e,z:c});const a=e+4.3;n.skirt(i+3,t+3,a,16,17,a+2.2,at.gentengTua,nt.SIRAP),n.skirt(16.4,17.4,a+2.1,9.5,10,a+3.6,at.gentengTua,nt.SIRAP),n.hip(10,10.5,a+3.5,5.6,at.gentengTua,nt.SIRAP),n.box(.6,.9,.6,at.emas,nt.POLOS,{y:a+9});for(const o of[-1,1])n.box(.4,.6,.4,at.emas,nt.POLOS,{z:o*.3,y:a+9});return n.box(2.2,.5,1.6,at.emas,nt.POLOS,{y:e,z:-9}),n.box(2.2,1.6,.3,at.emas,nt.POLOS,{y:e+.5,z:-9.7}),n}function Db(i,t,e){const n=new ce;n.box(i+1,e+1.4,t+1,at.bata,nt.BATA,{y:-1.4}),n.box(i+1.3,.16,t+1.3,at.batuPutih,nt.POLOS,{y:e-.08}),n.box(i-1,1,t-1,at.bata,nt.BATA,{y:e}),n.box(i-1,3.2,t-1,at.plester,nt.PLESTER,{y:e+1});for(let s=-2;s<=2;s++)n.box(1,2.4,.1,at.kayuTua,nt.KAYU,{x:s*(i/5.5),y:e,z:(t-1)/2+.02});for(let s=0;s<3;s++)n.box(5,e*(s+1)/3,.7,at.andesit,nt.BATU,{y:0,z:t/2+.5+2.1-(s+.5)*.7});return n.hip(i+2.2,t+2.4,e+4.1,6.5,at.genteng,nt.GENTENG),n.box(.5,.8,.5,at.emas,nt.POLOS,{y:e+10.5,x:-(i-t)*.42}),n.box(.5,.8,.5,at.emas,nt.POLOS,{y:e+10.5,x:(i-t)*.42}),n}function kb(i,t){const e=new ce;e.box(i+.6,2.8,i+.6,at.bata,nt.BATA,{y:-1.2}),e.box(i+.9,.18,i+.9,at.batuPutih,nt.POLOS,{y:1.5});const n=i*.42;e.box(n,1.6,n,at.kayu,nt.KAYU,{y:1.6});let s=3.1;for(let r=0;r<t;r++){const a=r/Math.max(1,t-1),o=i*(1.08-.62*a);e.skirt(o,o,s,o*.4,o*.4,s+.55,at.ijuk,nt.JERAMI,{shade:[.9,1.06]}),e.box(o*.36,.5,o*.36,at.kayuTua,nt.KAYU,{y:s+.5}),s+=.95}return e.skirt(i*.4,i*.4,s,0,0,s+1,at.ijuk,nt.JERAMI),e.cyl(.05,.16,.7,6,at.emas,nt.POLOS,{y:s+.95}),e}function Nb(i){const t=new ce,e=i/17;t.box(i,1.9*e+1.2,i,at.andesit,nt.BATU,{y:-1.2}),t.box(i+.4,.2*e,i+.4,at.andesitTua,nt.POLOS,{y:1.9*e-.1}),t.box(i*.78,1.3*e,i*.78,at.andesit,nt.BATU,{y:1.9*e});const n=i*.52;let s=3.2*e;t.box(n,5.6*e,n,at.andesit,nt.BATU,{y:s}),t.box(n*.3,2.8*e,.3,at.gelap,nt.POLOS,{y:s+.2,z:n/2+.02}),t.box(n*.42,.5*e,.4,at.andesitTua,nt.BATU,{y:s+3.1*e,z:n/2}),s+=5.6*e;for(let r=0;r<3;r++){const a=n*(1.06-r*.2),o=1.7*e;t.box(a,o,a,at.andesit,nt.BATU,{y:s}),t.box(a+.3*e,.22*e,a+.3*e,at.andesitTua,nt.POLOS,{y:s-.1*e});for(const[c,l]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.box(.5*e,.6*e,.5*e,at.andesit,nt.BATU,{x:c*a/2.3,y:s+o,z:l*a/2.3}),t.skirt(.5*e,.5*e,s+o+.6*e,0,0,s+o+1.2*e,at.andesit,nt.BATU,{x:c*a/2.3,z:l*a/2.3});s+=o}t.cyl(n*.18,n*.24,1.6*e,8,at.andesit,nt.BATU,{y:s}),t.cyl(.05*e,n*.16,2.2*e,8,at.andesit,nt.BATU,{y:s+1.6*e});for(let r=0;r<4;r++)t.box(3.2*e,3.2*e*(r+1)/4,.8*e,at.andesit,nt.BATU,{z:i*.39+(3.2-(r+.5)*.8)*e});return t}function Ub(i,t,e=at.alang,n=nt.JERAMI){const s=new ce;s.box(i*.92,.6+1.2,t*.92,at.bata,nt.BATA,{y:-1.2});for(const[r,a]of[[-1,-1],[1,-1],[1,1],[-1,1]])s.cyl(.11,.11,2.6,6,at.kayuTua,nt.KAYU,{x:r*i*.43,y:.6,z:a*t*.43});return s.hip(i+1,t+1,3.1,Math.min(i,t)*.55,e,n),s}function Ob(i,t){const e=new ce;for(const[n,s]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.08,.08,3.4,5,at.kayuTua,nt.KAYU,{x:n*i*.42,y:-1,z:s*t*.42});return e.box(i*.9,.15,t*.9,at.bambu,nt.ANYAMAN,{y:.9}),e.gable(i+.8,t+.8,2.4,1.2,at.alang,nt.JERAMI,at.alang,nt.JERAMI),e}const Wf=[[at.merah,at.putih],[at.kuning,at.merah],[at.putih,at.merah],[at.biru,at.putih],[at.hijau,at.kuning]];function Fb(i,t){const e=new ce;e.cyl(.05,.08,i,5,at.bambu,nt.KAYU,{y:-.6});const[n,s]=Wf[t%Wf.length],r=i*.62,a=6;for(let l=0;l<a;l++){const u=i-.9-(l+1)*r/a;e.box(.04,r/a,.5,l%2?s:n,nt.POLOS,{y:u,z:.27})}const{sway:o,pos:c}=e;for(let l=0;l<o.length;l++){const u=c[l*3+1];c[l*3+2]>.1&&(o[l]=.12+(i-.9-u)/r*.5)}return e}function Bb(i,t,e){const n=new ce;n.box(i,e+1.8,t,at.bata,nt.BATA,{y:-1.8}),n.box(i+.3,.16,t+.3,at.batuPutih,nt.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",nt.UBIN,{y:e});for(let a=0;a<5;a++)n.box(7,e*(a+1)/5,.72,at.andesit,nt.BATU,{z:t/2+3.6-(a+.5)*.72});const s=(a,o,c)=>n.box(a,.55,o,at.bata,nt.BATA,{...c,y:e});s(i,.4,{z:-t/2+.2}),s(.4,t,{x:-i/2+.2}),s(.4,t,{x:i/2-.2});for(const a of[-1,1])s((i-7)/2,.4,{x:a*(3.5+(i-7)/4),z:t/2-.2});Sp.forEach(([a,o],c)=>n.cyl(c<4?.3:.22,c<4?.34:.25,c<4?6.4:4.2,8,c<4?at.kayuTua:at.kayu,nt.KAYU,{x:a,y:e,z:o}));const r=e+4.1;n.skirt(i+1.2,t+1.6,r,12.4,8.2,r+2.2,at.gentengTua,nt.SIRAP),n.hip(12.8,8.6,r+2.1,3.6,at.gentengTua,nt.SIRAP),n.box(.5,.8,.5,at.emas,nt.POLOS,{y:r+5.6}),n.box(2.4,.5,1.6,at.emas,nt.POLOS,{y:e,z:-2.6}),n.box(2.4,1.7,.3,at.emas,nt.POLOS,{y:e+.5,z:-3.3});for(const a of[-1,1])n.cyl(.04,.04,3.2,5,at.kayuTua,nt.KAYU,{x:a*2.2,y:e,z:-2.9}),n.cyl(.05,1,.45,8,at.kuning,nt.POLOS,{x:a*2.2,y:e+3,z:-2.9});return n}const Xf=["#e9dfc6","#e0d0ab","#ece6d6"];function Hb(i,t,e=0){const n=new ce,s=2.5,r=i/2,a=t/2,o=Xf[e%Xf.length],c=[-r,0,a],l=[-r,0,-a],u=[0,s,-a],h=[0,s,a],d=[r,0,a],f=[r,0,-a];return n.faces([[c,u,l],[c,h,u],[d,f,u],[d,u,h],[f,l,u],[c,d,h]],o,nt.POLOS),n.faces([[[-.6,0,a+.02],[.6,0,a+.02],[0,1.7,a+.02]]],at.gelap,nt.POLOS),n.box(.12,.12,t+.5,at.kayuTua,nt.KAYU,{y:s-.04}),n.cyl(.04,.04,.9,4,at.kayuTua,nt.KAYU,{y:s,z:a+.15}),n.box(.03,.3,.5,at.merah,nt.POLOS,{y:s+.55,z:a+.42,sway:.08}),n}function Gb(i,t){const e=new ce;e.box(i,1.4,.2,at.kayu,nt.KAYU,{z:-t/2+.1});for(const s of[-1,1])e.box(.2,1.4,t,at.kayu,nt.KAYU,{x:s*(i/2-.1)});const n=Math.round(i/3.4);for(let s=0;s<=n;s++)for(const r of[-t/2+.2,t/2-.3])e.cyl(.12,.13,2.9,5,at.kayuTua,nt.KAYU,{x:-i/2+.2+s*(i-.4)/n,z:r});for(let s=1;s<n;s++)e.box(.12,1.1,t*.5,at.kayu,nt.KAYU,{x:-i/2+s*i/n,z:-t*.22});return e.box(i-1,.45,.6,at.kayuTua,nt.KAYU,{z:-t/2+.6}),e.gable(i+.8,t+1.2,2.8,1.7,at.alang,nt.JERAMI,at.kayu,nt.KAYU),e}function Vb(){const i=new ce;return i.cyl(1,1.15,.9,8,at.alang,nt.JERAMI),i.cyl(.15,1,.7,8,at.alang,nt.JERAMI,{y:.9}),i}function Wb(){const i=new ce;return i.box(1,.8,.8,at.kayuMuda,nt.KAYU),i.box(.9,.7,.7,at.kayu,nt.KAYU,{y:.8,x:.1,ry:.4}),i}function Xb(){const i=new ce;return i.cyl(.32,.26,.9,8,"#a8603a",nt.POLOS),i.cyl(.36,.32,.25,8,"#a8603a",nt.POLOS,{y:.9}),i.cyl(.3,.24,.8,8,"#8f4f30",nt.POLOS,{x:.7,z:.2}),i}function jb(){const i=new ce;for(const t of[-1,1])i.cyl(.05,.05,1.4,5,at.kayuTua,nt.KAYU,{x:t*1.6});i.box(3.4,.08,1,at.bambu,nt.ANYAMAN,{y:1.1});for(let t=0;t<8;t++)i.box(.3,.05,.12,"#b7c4cc",nt.POLOS,{x:-1.4+t*.4,y:1.15,z:t%2?.2:-.2});return i}function Yb(i,t,e){const n=new ce;n.box(i,.22,t,at.kayuMuda,nt.KAYU,{y:-.22});for(const r of[-1,1])n.box(.2,.25,t,at.kayuTua,nt.KAYU,{x:r*(i/2-.1),y:-.45});const s=Math.max(2,Math.round(t/3));for(let r=0;r<=s;r++)for(const a of[-1,1])n.cyl(.13,.13,e+4.2,6,at.kayuTua,nt.KAYU,{x:a*(i/2-.1),y:-e-4,z:-t/2+r*t/s});for(const r of[-1,1])n.cyl(.14,.14,.7,6,at.kayuTua,nt.KAYU,{x:r*(i/2-.25),y:0,z:t/2-.4});return n}function Kb(i,t,e,n,{stone:s,piers:r}){const a=new ce,o=Math.ceil(i/1.5),c=s?.9:.35,l=g=>-i/2+g/o*i,u=g=>e(g/o),h=[],d=[],f=[];for(let g=0;g<o;g++){const x=l(g),m=l(g+1),p=u(g),M=u(g+1),y=[-t/2,p,x],v=[t/2,p,x],w=[t/2,M,m],T=[-t/2,M,m];h.push([y,T,w],[y,w,v]);const L=[-t/2,p-c,x],B=[t/2,p-c,x],E=[t/2,M-c,m],A=[-t/2,M-c,m];d.push([L,T,y],[L,A,T],[B,v,w],[B,w,E]),f.push([L,B,E],[L,E,A])}a.faces(h,s?"#9a958c":at.kayuMuda,s?nt.UBIN:nt.KAYU),a.faces(d,s?at.andesit:at.kayu,s?nt.BATU:nt.KAYU),a.faces(f,s?at.andesitTua:at.kayuTua,nt.POLOS);for(const g of[-1,1]){const x=g*(t/2-.2),m=[],p=s?1.05:1;for(let M=0;M<o;M++){const y=l(M),v=l(M+1),w=u(M),T=u(M+1);if(s){const L=[x-.2,x+.2];m.push([[L[1],w,y],[L[1],w+p,y],[L[1],T+p,v]],[[L[1],w,y],[L[1],T+p,v],[L[1],T,v]],[[L[0],T,v],[L[0],T+p,v],[L[0],w+p,y]],[[L[0],T,v],[L[0],w+p,y],[L[0],w,y]],[[L[0],w+p,y],[L[0],T+p,v],[L[1],T+p,v]],[[L[0],w+p,y],[L[1],T+p,v],[L[1],w+p,y]])}else M%2===0&&a.cyl(.07,.07,p,5,at.kayuTua,nt.KAYU,{x,y:w,z:y})}if(s)a.faces(m,at.bata,nt.BATA);else{const M=[];for(let y=0;y<o;y++){const v=l(y),w=l(y+1),T=u(y)+1,L=u(y+1)+1;M.push([[x-.06,T,v],[x+.06,L,w],[x+.06,T,v]],[[x-.06,T,v],[x-.06,L,w],[x+.06,L,w]])}a.faces(M,at.kayu,nt.KAYU)}}for(const g of r){const x=-i/2+g*i,m=e(g)-c,p=n(x);if(s){a.box(t+.6,m-p+.5,2,at.andesit,nt.BATU,{y:p-.5,z:x}),a.box(t+1,.3,2.4,at.andesitTua,nt.POLOS,{y:m-.3,z:x});for(const M of[-1,1]){const y=e(g)+1.05;a.box(.5,.5,.5,at.batuPutih,nt.POLOS,{x:M*(t/2-.2),y,z:x}),a.cyl(.06,.06,1.6,5,at.gelap,nt.POLOS,{x:M*(t/2-.2),y:y+.5,z:x}),a.box(.36,.48,.36,"#ffe3a0",nt.POLOS,{x:M*(t/2-.2),y:y+2.1,z:x}),a.skirt(.5,.5,y+2.58,0,0,y+2.9,at.gelap,nt.POLOS,{x:M*(t/2-.2),z:x})}}else for(const M of[-1,1])a.cyl(.16,.18,m-p+.6,6,at.kayuTua,nt.KAYU,{x:M*(t/2-.3),y:p-.6,z:x})}return a}const bu={value:0},qb=`
uniform float uTime;
attribute float aKind;
attribute float aSway;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;
`,Zb=`
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
`;function $b(i){const t=new jn({vertexColors:!0});return t.onBeforeCompile=e=>{e.uniforms.uTime=bu,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=Hn.a,e.uniforms.uSeeB=Hn.b,e.uniforms.uSeeR=Hn.r,e.vertexShader=qb+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
      vBNrm = normalize(mat3(bModel) * normal);`),e.fragmentShader=Zb+e.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
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
      diffuseColor.rgb = buildingPattern(diffuseColor.rgb);`)},t}function Jb(){const i=new Eo({depthPacking:So});return i.onBeforeCompile=t=>{t.uniforms.uTime=bu,t.vertexShader=`uniform float uTime;
attribute float aSway;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      vec3 wp0 = (modelMatrix * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;`)},i}const Za=1.6;function zp(i){const t=[],e=(a,o)=>{for(const l of t)if(Math.abs(l.x-a)<Za&&Math.abs(l.z-o)<Za)return l;const c={id:t.length,x:a,z:o,links:[],w:new Map};return t.push(c),c},n=i.map(()=>[0,1]),s=(a,o,c)=>{const[l,u,h,d]=a,f=h-l,g=d-u,x=f*f+g*g,m=((o-l)*f+(c-u)*g)/x;if(m<-1e-6||m>1+1e-6)return null;const p=l+f*m-o,M=u+g*m-c;return p*p+M*M<Za*Za?Math.min(1,Math.max(0,m)):null};for(let a=0;a<i.length;a++)for(let o=0;o<i.length;o++){if(a===o)continue;const[c,l,u,h]=i[a],[d,f,g,x]=i[o];for(const[L,B]of[[d,f],[g,x]]){const E=s(i[a],L,B);E!==null&&n[a].push(E)}const m=u-c,p=h-l,M=g-d,y=x-f,v=m*y-p*M;if(Math.abs(v)<1e-9)continue;const w=((d-c)*y-(f-l)*M)/v,T=((d-c)*p-(f-l)*m)/v;w>0&&w<1&&T>0&&T<1&&n[a].push(w)}const r=new Set;return i.forEach((a,o)=>{const[c,l,u,h]=a,d=[...new Set(n[o].map(g=>Math.round(g*1e4)/1e4))].sort((g,x)=>g-x);let f=null;for(const g of d){const x=e(c+(u-c)*g,l+(h-l)*g);if(f&&f!==x){const m=f.id<x.id?`${f.id}-${x.id}`:`${x.id}-${f.id}`;r.has(m)||(r.add(m),f.links.push(x),x.links.push(f));const p=Math.max(a[4]??3,f.w.get(x.id)??0);f.w.set(x.id,p),x.w.set(f.id,p)}f=x}}),{nodes:t,edgeCount:r.size}}const jf=128,kr={genteng:["#b65a32","#a84f2c","#c46a3a","#94482b"],sirap:["#6b4f3a","#5d4434","#7a5a40","#584a3c"],joglo:["#5a4a40","#4a4038","#62503f","#3f3a35"],alang:["#bb9c5c","#a98a4e","#c4a76a","#8f7a52"]};function Qb(i,t){const e=i.roof??0;switch(i.type){case"rumah-bata":return _b(i.w,i.d,kr.genteng[e]);case"rumah-limasan":return vb(i.w,i.d,kr.sirap[e]);case"rumah-joglo":return yb(i.w,i.d,kr.joglo[e]);case"rumah-panggung":return Mb(i.w,i.d,kr.alang[e]);case"rumah-lumbung":return bb(kr.alang[e]);case"gudang":return Sb(i.w,i.d,at.genteng);case"warung":return wb(i.color,i.goods);case"sumur":return Tb();case"tembok":return Eb(i.len,i.t,i.h);case"tembok-dalam":return Rb(i.len,i.t,i.h);case"pagar":return Vf(i.len,i.t,i.h);case"pagar-batu":return Vf(i.len,i.t,i.h,!0);case"menara":return Pb(i.size,i.h);case"bentar":return Ib(i.w,i.d,i.h,i.mirror,i.stone);case"paduraksa":return Lb(i.w,i.d,i.opening,i.h);case"pendopo":return zb(i.w,i.d,i.h);case"bangsal":return Db(i.w,i.d,i.h);case"meru":return kb(i.base,i.tiers);case"candi":return Nb(i.base);case"bale":return Ub(i.w,i.d);case"dangau":return Ob(i.w,i.d);case"umbul":return Fb(i.h,i.color);case"siti-hinggil":return Bb(i.w,i.d,i.h);case"tenda":return Hb(i.w,i.d,i.color);case"kandang":return Gb(i.w,i.d);case"jerami":return Vb();case"peti":return Wb();case"gentong":return Xb();case"jemuran":return jb();case"dermaga":return Yb(i.w,i.len,i.y);case"jembatan-batu":case"jembatan-kayu":{const n=i.surface,s=c=>n.y0+(n.y1-n.y0)*c+n.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(c-n.a0)/(n.a1-n.a0)))),r=(i.type==="jembatan-batu"?16:7)/i.len,a=[];for(let c=n.a0+r;c<n.a1-r*.4;c+=r)a.push(c);const o=c=>i.axis==="x"?t.heightAt(i.x+c,i.z):t.heightAt(i.x,i.z+c);return Kb(i.len,i.w,s,o,{stone:i.type==="jembatan-batu",piers:a})}default:throw new Error(`jenis bangunan tidak dikenal: ${i.type}`)}}function Dp(i,t,e,n,s,r){const o=[];for(let u=0;u<=10;u++){const h=u/10,d=-t/2+h*t,f=e/2*Math.pow(Math.sin(Math.PI*h),.6),g=.35*Math.pow(Math.abs(h-.5)*2,3);o.push({z:d,w:f,top:.25+g,keel:-n*Math.pow(Math.sin(Math.PI*h),.5)+g*.6})}const c=[],l=[];for(let u=0;u<10;u++){const h=o[u],d=o[u+1];for(const f of[-1,1]){const g=[f*h.w,h.top,h.z],x=[f*d.w,d.top,d.z],m=[0,h.keel,h.z],p=[0,d.keel,d.z];f>0?c.push([g,m,p],[g,p,x]):c.push([g,p,m],[g,x,p])}l.push([[-h.w,h.top-.12,h.z],[d.w,d.top-.12,d.z],[h.w,h.top-.12,h.z]],[[-h.w,h.top-.12,h.z],[-d.w,d.top-.12,d.z],[d.w,d.top-.12,d.z]])}i.faces(c,s,nt.KAYU),i.faces(l,at.kayuMuda,nt.KAYU),i.box(e*.02+.05,.12,t*.7,r,nt.POLOS,{x:e*.43,y:.05}),i.box(e*.02+.05,.12,t*.7,r,nt.POLOS,{x:-e*.43,y:.05})}function tS(){const i=new ce;Dp(i,6.2,.85,.45,"#f2efe6","#2f62a8");for(const t of[-1,1])i.cyl(.09,.09,4.6,5,at.bambu,nt.KAYU,{x:t*2.3,y:-.05,rx:Math.PI/2,z:2.3});for(const t of[-1.2,1.2])i.box(4.8,.08,.1,at.kayuTua,nt.KAYU,{y:.35,z:t});return i.cyl(.05,.06,3.4,5,at.kayuTua,nt.KAYU,{y:.2,z:.6}),i.faces([[[0,3.5,.6],[0,.9,.7],[0,.9,-2]],[[0,3.5,.6],[0,.9,-2],[0,.9,.7]]],at.merah,nt.POLOS,{sway:.03}),i.build()}function eS(){const i=new ce;Dp(i,18,5,2.2,"#7a5236",at.emas),i.box(4.2,2,5.5,at.kayu,nt.KAYU,{y:.1,z:-4.8}),i.hip(4.8,6.2,2.1,1.4,at.ijuk,nt.JERAMI,{z:-4.8});for(const[t,e]of[[2.6,11],[-1,8.5]]){i.cyl(.14,.18,e,6,at.kayuTua,nt.KAYU,{y:.1,z:t});const n=e-.6;i.faces([[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.4,t+3.4]],[[0,n,t+2.6],[0,n*.95,t-1.6],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.4,t+3.4],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.95,t-1.6]]],"#e8dcc0",nt.POLOS,{sway:.04})}return i.build()}function nS({ground:i,plan:t,mask:e,grid:n,quality:s,noiseTexture:r}){const a=new Ce;a.name="kepulauan-kencana";const{shadows:o}=s,c=new Map,l={};for(const U of t.build){l[U.type]=(l[U.type]||0)+1;const X=`${Math.floor(U.x/jf)},${Math.floor(U.z/jf)}`;let H=c.get(X);H||c.set(X,H=[]),H.push(U)}const u=$b(r),h=Jb();let d=0;for(const[U,X]of c){const H=X.map(F=>Qb(F,i)),k=H.reduce((F,dt)=>F+dt.pos.length/3,0),it=new Float32Array(k*3),st=new Float32Array(k*3),ot=new Float32Array(k*3),_t=new Float32Array(k),gt=new Float32Array(k);let Y=0;H.forEach((F,dt)=>{const bt=X[dt],ft=Math.cos(bt.rot),xt=Math.sin(bt.rot),R=F.pos.length/3;for(let Q=0;Q<R;Q++){const C=Q*3,P=(Y+Q)*3,J=F.pos[C],tt=F.pos[C+2];it[P]=bt.x+J*ft+tt*xt,it[P+1]=bt.y+F.pos[C+1],it[P+2]=bt.z-J*xt+tt*ft;const K=F.nor[C],ht=F.nor[C+2];st[P]=K*ft+ht*xt,st[P+1]=F.nor[C+1],st[P+2]=-K*xt+ht*ft}ot.set(F.col,Y*3),_t.set(F.kind,Y),gt.set(F.sway,Y),Y+=R});const Z=new he;Z.setAttribute("position",new Me(it,3)),Z.setAttribute("normal",new Me(st,3)),Z.setAttribute("color",new Me(ot,3)),Z.setAttribute("aKind",new Me(_t,1)),Z.setAttribute("aSway",new Me(gt,1)),Z.computeBoundingSphere(),d+=k;const rt=new ee(Z,u);rt.name=`bangunan-${U}`,rt.castShadow=o,rt.receiveShadow=o,rt.customDepthMaterial=h,a.add(rt)}const f=Pp(r),g=s.canopyDetail,x=s.treeDensity,m=U=>({...U,y:i.heightAt(U.x,U.z),a:((U.x*.37+U.z*.11)%1+1)%1,b:.5,c:((U.x*.13-U.z*.29)%1+1)%1}),p=U=>t.trees.filter(X=>X.type===U).map(m),M=On({scaleMin:1,scaleMax:1,tilt:.05,tint:.08,sink:.1}),y=new G,v=(U,X,H)=>{M(U,X,H),X.scale(y.setScalar(U.s)),X.elements[12]=U.x,X.elements[13]=U.y-.1,X.elements[14]=U.z},w=new Ce;w.name="pohon-kencana";const T=U=>({castShadow:o,receiveShadow:o,toMatrix:U});w.add(Je("beringin",FM(g),f,p("beringin"),T(v)),Je("kamboja",BM(),f,p("kamboja"),T(v)),Je("pisang",HM(),f,p("pisang"),T(v)),Je("mangga",Ll(g),f,p("mangga").map(U=>({...U,s:U.s*.62})),T(v)));const L=(U,X,H)=>e.reserved(U,X,H+1)||ji(U,X,be)<10||ji(U,X,_n)<10||_o.some(k=>ms(U,X,k,H+2)),B=p("kelapa"),E={kelapa:[],pohon:[],payung:[],semak:[],bunga:[]};for(const U of br){const X=!!U.rx,H=(X?Math.max(U.rx,U.rz):U.r)*1.12,k=X?U.rx*U.rz/255**2:(U.r/255)**2,it=U.forest??1,st=(ot,_t)=>la(U,ot,_t)<1.1;E.kelapa.push(...Tn({ground:i,grid:n,kind:"kelapa",seed:1101+U.seed,radius:1.8,area:H,cx:U.x,cz:U.z,reserved:L,count:Math.round(130*x*Math.sqrt(k)),accept:(ot,_t,gt,Y,Z)=>st(ot,_t)&&gt>.9&&gt<4.2&&Y<.3&&Z()<.6})),E.pohon.push(...Tn({ground:i,grid:n,kind:"pohon",seed:1202+U.seed,radius:2.3,area:H,cx:U.x,cz:U.z,reserved:L,count:Math.round(340*x*k*it)+6,accept:(ot,_t,gt,Y)=>st(ot,_t)&&gt>3&&gt<30&&Y<.6&&Vi(ot,_t)>.44})),E.payung.push(...Tn({ground:i,grid:n,kind:"pohon",seed:1303+U.seed,radius:4.5,area:H,cx:U.x,cz:U.z,reserved:L,count:Math.round(40*x*k*it)+2,accept:(ot,_t,gt,Y,Z)=>st(ot,_t)&&gt>3&&gt<30&&Y<.45&&Z()<.5})),E.semak.push(...Tn({ground:i,grid:n,kind:"semak",seed:1404+U.seed,radius:1.1,area:H,cx:U.x,cz:U.z,reserved:L,count:Math.round(260*x*k*Math.sqrt(it))+8,accept:(ot,_t,gt,Y)=>st(ot,_t)&&gt>2.8&&Y<.7})),E.bunga.push(...Tn({ground:i,grid:n,kind:"semak",seed:1505+U.seed,radius:1,area:H,cx:U.x,cz:U.z,reserved:L,count:Math.round(90*x*k*Math.sqrt(it))+6,accept:(ot,_t,gt,Y)=>st(ot,_t)&&gt>2.8&&Y<.5}))}w.add(Je("kelapa",Ep(),f,[...B,...E.kelapa],T(On({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1}))),Je("pohon-hutan",Ll(g),f,E.pohon,T(On({scaleMin:.75,scaleMax:1.3,tilt:.12,tint:.16}))),Je("pohon-payung",Rp(g),f,E.payung,T(On({scaleMin:.8,scaleMax:1.15,tilt:.08,tint:.12}))),Je("semak",vo(0,null),f,E.semak,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:On({scaleMin:.7,scaleMax:1.4,tilt:.2,tint:.2,sink:.1})}),Je("semak-bunga",vo(0,["#e0353f","#f4c02c","#f06aa8","#ffffff"]),f,E.bunga,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:On({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),a.add(w);const A={jukung:tS(),jong:eS()},O=[];for(const U of["jukung","jong"]){const X=t.boats.filter(k=>(k.type==="jukung-darat"?"jukung":k.type)===U);if(!X.length)continue;const H=new Ms(A[U],u,X.length);H.name=`perahu-${U}`,H.castShadow=o,H.receiveShadow=o,H.customDepthMaterial=h,H.instanceMatrix.setUsage(Rn),X.forEach((k,it)=>O.push({...k,mesh:H,i:it,phase:(k.x*.31+k.z*.17)%6.28,land:k.type==="jukung-darat",y:Math.max(0,i.heightAt(k.x,k.z))})),a.add(H)}const j=[...new Set(O.map(U=>U.mesh))],W=new Ut,$=new xe,b=new on,S=new G,I=new G(1,1,1);function _(U){for(const X of O)X.land?(b.set(.04,X.rot,.12),S.set(X.x,X.y+.45,X.z)):(b.set(Math.sin(U*.9+X.phase)*.025,X.rot,Math.sin(U*1.1+X.phase*1.7)*.06),S.set(X.x,.12+Math.sin(U*1.3+X.phase)*.1,X.z)),$.setFromEuler(b),X.mesh.setMatrixAt(X.i,W.compose(S,$,I));for(const X of j)X.instanceMatrix.needsUpdate=!0}_(0);for(const U of j)U.computeBoundingSphere();const N=[...E.kelapa.map(U=>({x:U.x,z:U.z,radius:.45,kind:"pohon"})),...E.pohon.map(U=>({x:U.x,z:U.z,radius:.7,kind:"pohon"})),...E.payung.map(U=>({x:U.x,z:U.z,radius:.75,kind:"pohon"}))],z=[...t.blocked.map(U=>({x:U.x,z:U.z,radius:Math.max(U.hx,U.hz)+1.5,strength:.25})),...E.pohon.map(U=>({x:U.x,z:U.z,radius:4.8,strength:.4})),...E.payung.map(U=>({x:U.x,z:U.z,radius:5.5,strength:.3})),...E.kelapa.map(U=>({x:U.x,z:U.z,radius:2.4,strength:.18})),...t.trees.filter(U=>U.type==="beringin").map(U=>({x:U.x,z:U.z,radius:12,strength:.5})),...E.semak.map(U=>({x:U.x,z:U.z,radius:1.8,strength:.2}))],D=zp([...t.roads,...t.paths]);return{object:a,colliders:[...t.colliders,...N],surfaces:t.surfaces,occlusion:z,routes:D,spots:t.spots,roofs:t.roofs,stats:{bangunan:t.build.length,rumah:Object.entries(l).filter(([U])=>U.startsWith("rumah-")).reduce((U,[,X])=>U+X,0),jenis:l,petak:c.size,titik:d,pohon:Object.values(E).reduce((U,X)=>U+X.length,0)+t.trees.length,perahu:O.length,simpulJalan:D.nodes.length},update(U){bu.value=U,_(U)}}}const yo=30,Yf=new Ut,Kf=new Ut;function Nl(i,t,e){const n=i.elements;t[e]=n[0],t[e+1]=n[4],t[e+2]=n[8],t[e+3]=n[12],t[e+4]=n[1],t[e+5]=n[5],t[e+6]=n[9],t[e+7]=n[13],t[e+8]=n[2],t[e+9]=n[6],t[e+10]=n[10],t[e+11]=n[14]}function sa(i,t,e,n){let s=null;i.traverse(u=>{!s&&u.isSkinnedMesh&&(s=u)});const{skeleton:r}=s,a=new mu(i),o={},c=u=>(o[u]||(a.stopAllAction(),a.clipAction(vs.findByName(t,u)).reset().play(),a.setTime(0),o[u]=r.bones.map(h=>h.quaternion.clone())),o[u]),l={};for(const[u,h]of Object.entries(n)){const d=vs.findByName(t,h.clip);if(!d)continue;const f=Object.entries(h.hold||{}).map(([x,m])=>[Number(x),c(m)]);a.stopAllAction(),a.clipAction(d).reset().play();const g=Math.max(1,Math.round(d.duration*yo));l[u]={row:e.length,n:g,loop:h.loop!==!1};for(let x=0;x<g;x++){a.setTime(x/yo);for(const[p,M]of f)r.bones[p].quaternion.copy(M[p]);i.updateMatrixWorld(!0),Kf.copy(i.matrixWorld).invert();const m=new Float32Array(r.bones.length*12);r.bones.forEach((p,M)=>{Yf.multiplyMatrices(Kf,p.matrixWorld).multiply(r.boneInverses[M]),Nl(Yf,m,M*12)}),e.push(m)}}return a.stopAllAction(),{table:l,skeleton:r}}function ir(i){const t=[],e=[],n=[],s=[],r=[];for(const a of i){const o=a.geometry,c=t.length/3,l=o.attributes.position,u=o.attributes.normal,h=o.attributes.uv,d=o.attributes.skinIndex,f=o.attributes.skinWeight;for(let x=0;x<l.count;x++){t.push(l.getX(x),l.getY(x),l.getZ(x)),e.push(u.getX(x),u.getY(x),u.getZ(x)),n.push(h.getX(x),h.getY(x));let m=0;for(let p=1;p<4;p++)f.getComponent(x,p)>f.getComponent(x,m)&&(m=p);s.push(d.getComponent(x,m))}const g=o.index;for(let x=0;x<g.count;x++)r.push(c+g.getX(x))}return{pos:t,nor:e,uv:n,bone:s,index:r}}function ti(i,t,e){const n=i[t].subarray(e*12,e*12+12);return new Ut().set(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],0,0,0,1)}function Re(i,t,e,n,s,r){const a=t.index?t.toNonIndexed():t;a.applyMatrix4(ti(e,n,s).invert());const o=i.pos.length/3,c=a.attributes.position,l=a.attributes.normal,u=a.attributes.uv;for(let h=0;h<c.count;h++)i.pos.push(c.getX(h),c.getY(h),c.getZ(h)),i.nor.push(l.getX(h),l.getY(h),l.getZ(h)),r?i.uv.push(r[0],r[1]):i.uv.push(u.getX(h),u.getY(h)),i.bone.push(s),i.index.push(o+h)}function Su(i){const t=new he;return t.setAttribute("position",new Wt(i.pos,3)),t.setAttribute("normal",new Wt(i.nor,3)),t.setAttribute("uv",new Wt(i.uv,2)),t.setAttribute("aBone",new Wt(i.bone,1)),t.setIndex(i.index),t}function Au(i,t){const e=t*3,n=new Float32Array(e*i.length*4);i.forEach((r,a)=>n.set(r.subarray(0,Math.min(r.length,e*4)),a*e*4));const s=new ys(n,e,i.length,Ke,En);return s.magFilter=qe,s.minFilter=qe,s.needsUpdate=!0,s}const iS=`
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
`;function ra(i,t){i.uniforms.uBones={value:t},i.vertexShader=iS+i.vertexShader.replace("void main() {",`void main() {
  mat4 animM = animMatrix();`).replace("#include <beginnormal_vertex>",`vec3 objectNormal = normalize(mat3(animM) * vec3(normal));
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif`).replace("#include <begin_vertex>","vec3 transformed = (animM * vec4(position, 1.0)).xyz;")}function Mo(i,t,e,n){const s=t*yo;let r,a,o;if(i.loop){const c=(s%i.n+i.n)%i.n;r=Math.floor(c),a=(r+1)%i.n,o=c-r}else{const c=Math.min(s,i.n-1);r=Math.floor(c),a=Math.min(r+1,i.n-1),o=c-r}e[n]=i.row+r,e[n+1]=i.row+a,e[n+2]=o}const wc=2.3,sS={idle:"idle",walk:"walk",sit:"sit",interact:"interact-right",pickup:"pick-up",wave:"emote-yes"},qf=Object.fromEntries(Object.entries(sS).map(([i,t])=>[i,{clip:t,loop:i!=="wave"}])),rS=1.4,Zf=.25,$a=2.6,aS=.35,$f=["male-a","male-b","male-e","male-f","female-a","female-b","female-c","female-f"],Ja={emas:[.3125,.5625],kayu:[.8125,.8125],besi:[.4375,.8125]},oS=new Ut;function cS({ground:i,routes:t,spots:e,quality:n,villagerGltf:s,soldier:r,scripted:a=0}){const o=new Ce;o.name="penduduk";const c=[],l=sa(s.scene,s.animations,c,qf),u={};s.scene.traverse(Y=>{Y.isSkinnedMesh&&(u[Y.name.replace("character-","")]=Y)});const h=Object.values(u)[0].material.map,d=[];for(const Y of $f){const Z=u[Y];Z&&d.push({name:Y,data:ir([Z]),table:l.table,map:h})}const f=ir([u["male-b"]]);let g=0;for(let Y=0;Y<f.bone.length;Y++)f.bone[Y]===6&&(g=Math.max(g,f.pos[Y*3+1]));const x=l.table.sit.row,m=ti(c,x,6),p=new G(0,g-.015,.02).applyMatrix4(m);Re(f,new ke(.17,.15,.07,10,1,!0).translate(p.x,p.y+.035,p.z),c,x,6,Ja.emas);for(let Y=0;Y<5;Y++){const Z=Y/5*Math.PI*2;Re(f,new _s(.035,.09,4).translate(p.x+Math.cos(Z)*.16,p.y+.11,p.z+Math.sin(Z)*.16),c,x,6,Ja.emas)}if(d.push({name:"raja",data:f,table:l.table,map:h}),r){const Y=Lo(r.model),Z=sa(Y,r.clips,c,qf),rt=[];Y.traverse(ft=>{ft.isSkinnedMesh&&rt.push(ft)});const F=ir(rt),dt=Z.table.idle.row,bt=new G(-.265,0,.068).applyMatrix4(Z.skeleton.boneInverses[5].clone().invert()).applyMatrix4(ti(c,dt,5));Re(F,new ke(.016,.016,1.3,5).translate(bt.x,bt.y+.25,bt.z),c,dt,5,Ja.kayu),Re(F,new _s(.04,.16,4).translate(bt.x,bt.y+.98,bt.z),c,dt,5,Ja.besi),d.push({name:"prajurit",data:F,table:Z.table,map:rt[0].material.map,tint:new Nt(1,.86,.68)})}const M=Au(c,7),y=[],v=Y=>d.findIndex(Z=>Z.name===Y),w=$f.map(v).filter(Y=>Y>=0),T=()=>w[Math.floor(Math.random()*w.length)],L={penjaga:"prajurit",raja:"raja",pendeta:"male-e"};for(const Y of e){let Z=L[Y.role]?v(L[Y.role]):T();Z<0&&(Z=T()),y.push({type:Z,fixed:!0,role:Y.role,x:Y.x,z:Y.z,y:Y.y??null,heading:Y.rot,homeHeading:Y.rot,anim:Y.anim,clip:Y.anim,t:Math.random()*3,prev:null,prevT:0,fade:0})}const B={rendah:120,sedang:220,tinggi:320}[n.level]??220,E=t.nodes.filter(Y=>Y.links.length),A=[];for(const Y of E)for(const Z of Y.links)Y.id<Z.id&&A.push([Y,Z,Math.hypot(Z.x-Y.x,Z.z-Y.z)]);const O=([Y,Z,rt])=>rt*(Math.max(Y.x,Z.x)<-415&&Math.max(Y.z,Z.z)<145&&Math.min(Y.z,Z.z)>-65&&Math.min(Y.x,Z.x)>-705?3:1),j=A.reduce((Y,Z)=>Y+O(Z),0);for(let Y=0;Y<B&&A.length;Y++){let Z=Math.random()*j,rt=A[0];for(const ft of A)if(Z-=O(ft),Z<=0){rt=ft;break}const[F,dt,bt]=Math.random()<.5?rt:[rt[1],rt[0],rt[2]];y.push({type:T(),fixed:!1,from:F,to:dt,len:bt,s:Math.random()*bt,side:Math.random()<.5?-1:1,lat:.6+Math.random()*1.4,speed:.95+Math.random()*.55,pause:0,x:F.x,z:F.z,y:null,heading:0,clip:"walk",anim:"walk",t:Math.random(),prev:null,prevT:0,fade:0,init:!0})}for(let Y=0;Y<a;Y++)y.push({type:T(),fixed:!1,scripted:!0,hidden:!0,x:0,z:0,y:null,heading:0,speed:1.2,clip:"idle",anim:"idle",t:0,prev:null,prevT:0,fade:0});const W=d.map(()=>0);for(const Y of y)W[Y.type]++;const $=d.map((Y,Z)=>{const rt=Su(Y.data),F=Math.max(1,W[Z]),dt=new Cn(new Float32Array(F*4),4).setUsage(Rn),bt=new Cn(new Float32Array(F*4),4).setUsage(Rn);rt.setAttribute("aAnimA",dt),rt.setAttribute("aAnimB",bt);const ft=new jn({map:Y.map});ft.onBeforeCompile=Q=>ra(Q,M);const xt=new Ms(rt,ft,F);xt.name=`penduduk-${Y.name}`,xt.instanceMatrix.setUsage(Rn),xt.frustumCulled=!1,xt.castShadow=n.shadows,xt.receiveShadow=n.shadows;const R=new Eo({depthPacking:So});if(R.onBeforeCompile=Q=>ra(Q,M),xt.customDepthMaterial=R,Y.tint)for(let Q=0;Q<F;Q++)xt.setColorAt(Q,Y.tint);return xt.count=0,o.add(xt),{mesh:xt,animA:dt,animB:bt,table:Y.table}});function b(Y,Z){Y.clip!==Z&&(Y.prev=Y.clip,Y.prevT=Y.t,Y.fade=Zf,Y.clip=Z,Y.t=0)}const S=(Y,Z,rt,F,dt)=>Mo(Y[Z]||Y.idle,rt,F,dt),I=(Y,Z,rt)=>Y+Math.atan2(Math.sin(Z-Y),Math.cos(Z-Y))*rt;function _(Y,Z,rt){const F=rt.x-Y.x,dt=rt.z-Y.z,bt=Math.hypot(F,dt);if(bt<$a){Y.greeted?Y.clip==="wave"&&Y.t>.7&&b(Y,"idle"):(Y.greeted=!0,b(Y,"wave")),Y.heading=I(Y.heading,Math.atan2(F,dt),Math.min(1,Z*6));return}if(bt>$a+2.5&&(Y.greeted=!1),Y.pause>0){Y.pause-=Z,b(Y,"idle");return}if(b(Y,"walk"),Y.s+=Y.speed*Z,Y.s>=Y.len){const tt=Y.to,K=tt.links.filter(yt=>yt!==Y.from),ht=K.length?K[Math.floor(Math.random()*K.length)]:Y.from;Y.s-=Y.len,Y.from=tt,Y.to=ht,Y.len=Math.max(.1,Math.hypot(ht.x-tt.x,ht.z-tt.z)),Math.random()<.12&&(Y.pause=2+Math.random()*5)}const ft=(Y.to.x-Y.from.x)/Y.len,xt=(Y.to.z-Y.from.z)/Y.len,R=Math.min(1,Y.s/Y.len),Q=Y.side*Math.min(Y.lat,Math.max(0,(Y.from.w.get(Y.to.id)??5)/2-.9)),C=Y.from.x+(Y.to.x-Y.from.x)*R-xt*Q,P=Y.from.z+(Y.to.z-Y.from.z)*R+ft*Q;Y.init&&(Y.x=C,Y.z=P,Y.heading=Math.atan2(ft,xt),Y.init=!1);const J=1-Math.exp(-6*Z);Y.x+=(C-Y.x)*J,Y.z+=(P-Y.z)*J,Y.heading=I(Y.heading,Math.atan2(ft,xt),Math.min(1,Z*5))}function N(Y,Z,rt){const F=rt.x-Y.x,dt=rt.z-Y.z,bt=Math.hypot(F,dt),ft=Y.role==="penjaga";bt<(ft?4:$a)&&Y.anim!=="sit"?(!ft&&!Y.greeted?(Y.greeted=!0,b(Y,"wave")):Y.clip==="wave"&&Y.t>.7&&b(Y,"idle"),Y.heading=I(Y.heading,Math.atan2(F,dt),Math.min(1,Z*5))):(bt>$a+2.5&&(Y.greeted=!1),b(Y,Y.anim),Y.heading=I(Y.heading,Y.homeHeading,Math.min(1,Z*3)))}const z=new xr,D=new Ut,U=new cn(new G,1.6),X=new xe,H=new G,k=new G(wc,wc,wc),it=new G(0,1,0);let st=0;const ot={x:0,z:0};function _t(Y,Z,rt,F,dt=110){ot.x=F?F.x:1e9,ot.z=F?F.z:1e9,Z.updateMatrixWorld(),D.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),z.setFromProjectionMatrix(D);for(const ft of $)ft.mesh.count=0;st=0;const bt=dt*dt;for(const ft of y){if(ft.hidden)continue;ft.scripted||(ft.fixed?N(ft,Y,ot):_(ft,Y,ot));const xt=ft.clip==="walk"?(ft.speed||1)/rS:1;ft.t+=Y*xt,ft.fade>0&&(ft.fade=Math.max(0,ft.fade-Y),ft.prevT+=Y);const R=ft.x-rt.x,Q=ft.z-rt.z;if(R*R+Q*Q>bt)continue;const C=ft.y??i.surfaceAt(ft.x,ft.z);if(U.center.set(ft.x,C+.8,ft.z),!z.intersectsSphere(U))continue;const P=$[ft.type],J=P.mesh.count++;H.set(ft.x,C,ft.z),X.setFromAxisAngle(it,ft.heading),P.mesh.setMatrixAt(J,oS.compose(H,X,k));const tt=P.animA.array;S(P.table,ft.clip,ft.t,tt,J*4),tt[J*4+3]=ft.fade>0?ft.fade/Zf:0,ft.fade>0&&S(P.table,ft.prev,ft.prevT,P.animB.array,J*4),st++}for(const ft of $)ft.mesh.count&&(ft.mesh.instanceMatrix.needsUpdate=!0,ft.animA.needsUpdate=!0,ft.animB.needsUpdate=!0)}function gt(Y,Z=.35){for(const rt of y){if(rt.hidden)continue;const F=Y.x-rt.x,dt=Y.z-rt.z,bt=Z+aS,ft=F*F+dt*dt;if(ft>=bt*bt||ft<1e-8)continue;const xt=Math.sqrt(ft);Y.x=rt.x+F/xt*bt,Y.z=rt.z+dt/xt*bt}}return{object:o,agents:y,update:_t,pushOut:gt,setClip:b,scripted:y.filter(Y=>Y.scripted),stats:()=>({total:y.filter(Y=>!Y.scripted).length,fixed:y.filter(Y=>Y.fixed).length,visible:st,jenis:d.length})}}const sr=2.3,kp=15,Qa=1,Hr=16,ps={first:.349,step:.349,count:4},Gr=16,Jf={rendah:{near:70,reach:12,view:32,cell:56},sedang:{near:160,reach:16,view:42,cell:80},tinggi:{near:320,reach:22,view:55,cell:112}},Zn=(i,t)=>[(i+.5)/8,(t+.5)/8],fn={kayu:Zn(6,6),kayuTua:Zn(6,7),besi:Zn(3,6),putih:Zn(4,6),emas:Zn(2,4),emasTua:Zn(2,5),ungu:Zn(7,4)},Qf=[[4,4],[5,4],[1,4],[2,4],[4,6],[7,4]],Zs=[{id:"perisai",hold:{4:"holding-left"},size:2.5,center:1.05,blob:[.55,.55]},{id:"tombak",hold:{},size:3.4,center:1.5,blob:[.5,.5]},{id:"pedang",hold:{5:"holding-right"},size:2.6,center:1.15,blob:[.5,.5]},{id:"pemanah",hold:{4:"holding-left"},size:2.5,center:1.05,blob:[.5,.5]},{id:"kavaleri",mounted:!0,size:4.6,center:1.85,blob:[.48,1.35]},{id:"senapati",mounted:!0,size:5,center:2,blob:[.48,1.35],always:!0}],Yi=new Ut,gs=new xe,wu=new G,aa=new G(0,1,0);function td(i,[t,e]){for(let n=0;n<i.uv.length;n+=2){const s=Math.floor(i.uv[n]*8),r=Math.floor(i.uv[n+1]*8);s===4&&(r===4||r===5)&&(i.uv[n]=(t+.5)/8,i.uv[n+1]=(e+(r-4)+.5)/8)}}function os(i,t,e,n=e){const s=i.distanceTo(t),r=new Wn(e,s,n);return gs.setFromUnitVectors(aa,wu.subVectors(t,i).normalize()),r.applyMatrix4(Yi.compose(i.clone().add(t).multiplyScalar(.5),gs,new G(1,1,1)))}function lS(i,t){t.updateMatrixWorld(!0);const e=i.geometry.clone();return e.applyMatrix4(Yi.copy(t.matrixWorld).invert().multiply(i.matrixWorld)),e}function uS(i,t,e){const n=Lo(i.model),s=[];n.traverse(u=>{u.isSkinnedMesh&&s.push(u)});const{map:r}=s[0].material,a=i.model.userData.sword?(()=>{let u=null;return i.model.userData.sword.traverse(h=>{!u&&h.isMesh&&(u=h)}),u})():null,o=[],c=(u,h,d)=>new G(d===5?-.265:.265,0,.068).applyMatrix4(u.boneInverses[d].clone().invert()).applyMatrix4(ti(e,h,d));for(let u=0;u<4;u++){const h=Zs[u],d=sa(n,i.clips,e,{idle:{clip:"idle",hold:h.hold}}),f=d.table.idle,{row:g}=f,x=ir(s);if(td(x,Qf[u]),h.id==="perisai"){const m=c(d.skeleton,g,4),p=t.shieldRect.clone().scale(1.5,1.5,1.5);p.translate(m.x+.02,m.y-.22,m.z+.07),Re(x,p,e,g,4,null)}else if(h.id==="tombak"){const m=c(d.skeleton,g,5),p=Math.max(.02,m.y-.42);Re(x,new ke(.017,.017,m.y+1.05-p,5).translate(m.x,(p+m.y+1.05)/2,m.z),e,g,5,fn.kayu),Re(x,new _s(.045,.18,4).translate(m.x,m.y+1.14,m.z),e,g,5,fn.besi),Re(x,new ke(.03,.03,.04,5).translate(m.x,m.y+1.04,m.z),e,g,5,fn.emas)}else if(h.id==="pedang"&&a){const m=c(d.skeleton,g,5),p=a.geometry.clone();p.applyMatrix4(Yi.makeRotationX(Math.PI-.25)),p.translate(m.x,m.y+.02,m.z),Re(x,p,e,g,5,null)}else if(h.id==="pemanah"){const m=c(d.skeleton,g,4),p=6,M=[];for(let E=0;E<=p;E++){const A=-.36+.72*E/p;M.push(new G(m.x,m.y+A,m.z+.02-.1*(A/.36)**2))}for(let E=0;E<p;E++)Re(x,os(M[E],M[E+1],.026,.034),e,g,4,fn.kayuTua);Re(x,os(M[0],M[p],.008),e,g,4,fn.putih);const y=3,v=new G(.07,.2,-.17),w=new G(.13,.42,-.2),T=ti(e,g,y),L=v.clone().applyMatrix4(T),B=w.clone().applyMatrix4(T);Re(x,os(L,B,.09,.07),e,g,y,fn.kayuTua);for(let E=0;E<4;E++){const A=new G(E%2*.03-.015,0,Math.floor(E/2)*.025-.012);Re(x,os(B.clone().add(A),B.clone().add(A).add(new G(.025,.09,-.01)),.016,.03),e,g,y,E%2?fn.putih:fn.emas)}}o.push({...h,data:x,clip:f,map:r})}const l=hS(n,i.clips,t,e);for(let u=4;u<6;u++){const h=Zs[u],d=ir(s);td(d,Qf[u]);const{row:f}=l.clip;l.parts.forEach((m,p)=>{const M=m.geometry.clone();if(h.id==="senapati"){const{uv:y}=M.attributes;for(let v=0;v<y.count;v++){const w=Math.floor(y.getX(v)*8),T=Math.floor(y.getY(v)*8);w===1&&T===7||y.setXY(v,...w===1?Zn(4,7):Zn(4,6))}}Re(d,M.applyMatrix4(ti(e,f,7+p)),e,f,7+p,null)});const g=new Wn(.34,.03,.36).translate(0,l.backY+.012,0);Re(d,g.applyMatrix4(ti(e,f,7)),e,f,7,h.id==="senapati"?fn.ungu:Zn(4,4));const x=l.hand;if(h.id==="kavaleri"){const m=new G(x.x,x.y-.4,x.z-.08),p=new G(x.x,x.y+1.6,x.z+.28);Re(d,os(m,p,.032),e,f,5,fn.kayu);const M=p.clone().add(wu.subVectors(p,m).normalize().multiplyScalar(.12));Re(d,os(p,M,.06,.02),e,f,5,fn.besi)}else{const m=new G(x.x,x.y-.3,x.z),p=new G(x.x,x.y+1.9,x.z);Re(d,os(m,p,.035),e,f,5,fn.emasTua),Re(d,new Wn(.01,.42,.34).translate(x.x,x.y+1.62,x.z-.18),e,f,5,fn.ungu),Re(d,new _s(.05,.14,4).translate(x.x,x.y+1.97,x.z),e,f,5,fn.emas)}o.push({...h,data:d,clip:l.clip,map:r})}return o}function hS(i,t,e,n){const s=[],r=sa(i,t,s,{drive:{clip:"drive"}}),{skeleton:a}=r,{horse:o}=e,c=new Ut().compose(new G(0,0,0),new xe().setFromAxisAngle(aa,Math.PI/2),new G(Qa,Qa,Qa)),l={};o.traverse(w=>{l[w.name]=w});const u=["torso","leg-back-left","leg-back-right","leg-front-left","leg-front-right","neck","head","tail"],h={};for(const w of["neck","head","tail"])h[w]=l[w].quaternion.clone();const d=w=>(o.updateMatrixWorld(!0),c.clone().multiply(Yi.copy(o.matrixWorld).invert().multiply(l[w].matrixWorld))),f=u.map(d),g=(.25+.312)*Qa,x=new G(0,.17625,-.02375).applyMatrix4(ti(s,r.table.drive.row,3)),m=new Ut().makeTranslation(0,g+.035-x.y,-.02-x.z),p=90,M=n.length;for(let w=0;w<p;w++){const T=w/p*Math.PI*2;l.neck.quaternion.copy(h.neck).multiply(gs.setFromAxisAngle(new G(0,0,1),.07*Math.sin(T))),l.head.quaternion.copy(h.head).multiply(gs.setFromAxisAngle(new G(0,0,1),.06*Math.sin(T+.8))),l.tail.quaternion.copy(h.tail).multiply(gs.setFromAxisAngle(aa,.3*Math.sin(T*2)));const L=new Float32Array(kp*12),B=s[r.table.drive.row+w%r.table.drive.n];for(let E=0;E<7;E++)Yi.set(B[E*12],B[E*12+1],B[E*12+2],B[E*12+3],B[E*12+4],B[E*12+5],B[E*12+6],B[E*12+7],B[E*12+8],B[E*12+9],B[E*12+10],B[E*12+11],0,0,0,1),Nl(m.clone().multiply(Yi),L,E*12);u.forEach((E,A)=>{Nl(d(E).multiply(f[A].clone().invert()),L,(7+A)*12)}),n.push(L)}for(const w of["neck","head","tail"])l[w].quaternion.copy(h[w]);const y=u.map((w,T)=>({geometry:l[w].geometry.clone().applyMatrix4(f[T])})),v=new G(-.265,0,.068).applyMatrix4(a.boneInverses[5].clone().invert()).applyMatrix4(ti(n,M,5));return{clip:{row:M,n:p,loop:!0},parts:y,hand:v,backY:g}}function fS(i,t,e,n){const s=Hr*ps.count,r=t.length*s,a=Math.ceil(r/Gr),o=new bi(Gr*n,a*n,{colorSpace:Oe,depthBuffer:!1,generateMipmaps:!0,minFilter:xn,magFilter:He});o.texture.name="atlas-prajurit";const c=new bi(n,n,{colorSpace:Oe,samples:4}),l=new ho;l.add(new dp(e.hemi.color,e.hemi.groundColor,e.hemi.intensity));const u=new fu(e.sun.color,e.sun.intensity);u.position.copy(e.sunDir).multiplyScalar(50),l.add(u,u.target);const h=new wo(-1,1,1,-1,1,80),d=new ee(new vn(2,2),new Xn({uniforms:{uMap:{value:c.texture}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main() { gl_FragColor = texture2D(uMap, vUv); }",depthTest:!1,depthWrite:!1}));d.frustumCulled=!1;const f=new ho;f.add(d);const g=i.getRenderTarget(),x=i.getClearColor(new Nt),m=i.getClearAlpha(),p=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1,i.setClearColor(4866104,0),i.setRenderTarget(o),i.clear(),o.texture.generateMipmaps=!1,o.scissorTest=!0,t.forEach((v,w)=>{const{mesh:T,type:L}=v,{parent:B}=T;l.add(T),T.count=1,T.setMatrixAt(0,Yi.compose(wu.set(0,0,0),gs.setFromAxisAngle(aa,kl),new G(sr,sr,sr))),T.instanceMatrix.needsUpdate=!0,v.anim.array.set([L.clip.row,L.clip.row,0,0],0),v.anim.needsUpdate=!0;const E=L.size/2;h.left=-E,h.right=E,h.top=E,h.bottom=-E,h.updateProjectionMatrix();for(let A=0;A<ps.count;A++){const O=ps.first+A*ps.step;for(let j=0;j<Hr;j++){const W=kl+j/Hr*Math.PI*2;h.position.set(Math.sin(W)*Math.cos(O)*40,L.center+Math.sin(O)*40,Math.cos(W)*Math.cos(O)*40),h.lookAt(0,L.center,0),i.setRenderTarget(c),i.clear(),i.render(l,h);const $=w*s+A*Hr+j;o.viewport.set($%Gr*n,Math.floor($/Gr)*n,n,n),o.scissor.copy(o.viewport),i.setRenderTarget(o),i.render(f,h)}}T.count=0,B.add(T)}),o.scissorTest=!1,o.viewport.set(0,0,o.width,o.height),o.scissor.set(0,0,o.width,o.height),o.texture.generateMipmaps=!0;const M=new ho,{autoClear:y}=i;return i.autoClear=!1,i.setRenderTarget(o),i.render(M,h),i.autoClear=y,i.setRenderTarget(g),i.setClearColor(x,m),i.shadowMap.autoUpdate=p,c.dispose(),d.geometry.dispose(),d.material.dispose(),{texture:o.texture,target:o,rows:a,per:s}}const dS=`
attribute vec3 aPos;
attribute vec2 aInfo; // jenis, arah hadap
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec4 uLod; // prajurit dekat (digambar 3D, bukan impostor): pusat (x, z), jari-jari², jarak² terjauh dari kamera
uniform vec4 uType[6]; // ukuran potret, tinggi titik tengah, petak pertama, -
uniform vec4 uAtlas; // kolom, baris, arah, -
uniform vec3 uPitch; // sudut pandang potret pertama, selisih antar-sudut, banyaknya
varying vec4 vUvA; // potret arah a & b pada sudut pandang bawah
varying vec4 vUvB; // … pada sudut pandang atas
varying vec2 vW; // campuran antar-arah, antar-sudut pandang
vec2 cellUv(float k) {
  return (vec2(mod(k, uAtlas.x), floor(k / uAtlas.x)) + uv) / uAtlas.xy;
}
`;function pS({ground:i,plan:t,quality:e,soldier:n,bala:s,renderer:r,env:a}){const{army:o}=t,c=o.soldiers,l=Jf[e.level]??Jf.sedang,u=new Ce;u.name="bala-tentara";const h=performance.now(),d=[],f=uS(n,s,d),g=Au(d,kp),x=Zs.map(()=>0);for(let C=0;C<c.count;C++)x[c.type[C]]++;const m=f.map((C,P)=>{const J=Su(C.data),tt=Math.max(1,Math.min(x[P],l.near+64)),K=new Cn(new Float32Array(tt*4),4).setUsage(Rn);J.setAttribute("aAnimA",K),J.setAttribute("aAnimB",new Cn(new Float32Array(tt*4),4));const ht=new jn({map:C.map});ht.onBeforeCompile=vt=>ra(vt,g);const yt=new Ms(J,ht,tt);return yt.name=`prajurit-${C.id}`,yt.instanceMatrix.setUsage(Rn),yt.frustumCulled=!1,yt.castShadow=!1,yt.receiveShadow=!1,yt.count=0,u.add(yt),{mesh:yt,anim:K,type:C,cap:tt}}),p=performance.now(),M=fS(r,m.filter(C=>!C.type.always),a,l.cell),y=performance.now(),v=new Float32Array(c.count*3),w=new Float32Array(c.count*2);for(let C=0;C<c.count;C++)v[C*3]=c.x[C],v[C*3+1]=i.heightAt(c.x[C],c.z[C]),v[C*3+2]=c.z[C],w[C*2]=c.type[C],w[C*2+1]=o.heading;const T=new Cn(v,3),L=new Cn(w,2),B=new vn(1,1),E=new El;E.index=B.index,E.setAttribute("position",B.attributes.position),E.setAttribute("uv",B.attributes.uv),E.setAttribute("aPos",T),E.setAttribute("aInfo",L),E.instanceCount=o.total;const A=o.bounds,O=new cn(new G((A.x0+A.x1)/2,v[1]+2,(A.z0+A.z1)/2),Math.hypot(A.x1-A.x0,A.z1-A.z0)/2+6);E.boundingSphere=O;const j={uCamPos:{value:new G},uCamRight:{value:new G(1,0,0)},uCamUp:{value:new G(0,1,0)},uLod:{value:new re(1e9,1e9,0,0)},uType:{value:Zs.map((C,P)=>new re(C.size,C.center,P*M.per,0))},uAtlas:{value:new re(Gr,M.rows,Hr,0)},uPitch:{value:new G(ps.first,ps.step,ps.count)}},W=new Ge({map:M.texture,alphaToCoverage:!0});W.onBeforeCompile=C=>{Object.assign(C.uniforms,j),C.vertexShader=dS+C.vertexShader.replace("#include <uv_vertex>",`
        int ti = int(aInfo.x + 0.5);
        vec4 T = uType[ti];
        vec3 center = aPos + vec3(0.0, T.y, 0.0);
        // sama dengan pemilihan di update(): yang digambar 3D = di dalam lingkaran DAN cukup dekat
        // ke kamera; yang di dalam lingkaran tetapi jauh dari kamera tetap impostor (bukan bolong)
        vec2 dl = aPos.xz - uLod.xy;
        vec3 dv = aPos + vec3(0.0, 1.0, 0.0) - uCamPos;
        bool hide = dot(dl, dl) < uLod.z && dot(dv, dv) < uLod.w;
        // arah kamera dilihat dari prajurit (relatif arah hadapnya) → dua potret arah terdekat dan
        // dua sudut pandang terdekat, dicampur halus (tanpa campuran: yang terdekat saja)
        vec3 V = uCamPos - center;
        float fy = (atan(V.x, V.z) - aInfo.y) / 6.2831853 * uAtlas.z;
        float pf = clamp((atan(V.y, length(V.xz)) - uPitch.x) / uPitch.y, 0.0, uPitch.z - 1.0);
        #ifdef IMPOSTOR_BLEND
          // campuran hanya di pita sempit sekitar batas dua potret: kebanyakan prajurit tetap tajam
          float y0 = floor(fy);
          float p0 = min(floor(pf), uPitch.z - 2.0);
          vW = smoothstep(0.32, 0.68, vec2(fy - y0, pf - p0));
        #else
          float y0 = floor(fy + 0.5);
          float p0 = floor(pf + 0.5);
          vW = vec2(0.0);
        #endif
        float ya = mod(y0, uAtlas.z);
        float yb = mod(y0 + 1.0, uAtlas.z);
        float pb = min(p0 + 1.0, uPitch.z - 1.0);
        vUvA = vec4(cellUv(T.z + p0 * uAtlas.z + ya), cellUv(T.z + p0 * uAtlas.z + yb));
        vUvB = vec4(cellUv(T.z + pb * uAtlas.z + ya), cellUv(T.z + pb * uAtlas.z + yb));
        vMapUv = vUvA.xy;
        vec3 impWorld = center + uCamRight * (position.x * T.x) + uCamUp * (position.y * T.x);
      `).replace("#include <project_vertex>",`
        vec4 mvPosition = viewMatrix * vec4(impWorld, 1.0);
        gl_Position = hide ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * mvPosition;
      `),C.fragmentShader=`varying vec4 vUvA;
varying vec4 vUvB;
varying vec2 vW;
`+C.fragmentShader.replace("#include <map_fragment>",`
        #ifdef IMPOSTOR_BLEND
          // warna dicampur menurut bobot × keburaman; keburamannya = yang terbesar di antara potret
          // yang ikut (bukan dirata-rata), jadi di pita peralihan prajurit tidak tampak pudar
          vec4 a0 = texture2D(map, vUvA.xy);
          vec4 a1 = texture2D(map, vUvA.zw);
          vec4 b0 = texture2D(map, vUvB.xy);
          vec4 b1 = texture2D(map, vUvB.zw);
          vec4 w = vec4((1.0 - vW.x) * (1.0 - vW.y), vW.x * (1.0 - vW.y), (1.0 - vW.x) * vW.y, vW.x * vW.y);
          vec4 al = vec4(a0.a, a1.a, b0.a, b1.a);
          vec4 wa = w * al;
          vec3 rgb = (a0.rgb * wa.x + a1.rgb * wa.y + b0.rgb * wa.z + b1.rgb * wa.w) / max(wa.x + wa.y + wa.z + wa.w, 1e-4);
          vec4 cov = al * smoothstep(0.0, 0.3, w);
          diffuseColor *= vec4(rgb, max(max(cov.x, cov.y), max(cov.z, cov.w)));
        #else
          diffuseColor *= texture2D(map, vUvA.xy);
        #endif
      `)},e.level!=="rendah"&&(W.defines={IMPOSTOR_BLEND:""});const $=new ee(E,W);$.name="prajurit-impostor",u.add($);const b=new vn(2,2).rotateX(-Math.PI/2),S=new El;S.index=b.index,S.setAttribute("position",b.attributes.position),S.setAttribute("aPos",T),S.setAttribute("aInfo",L),S.instanceCount=c.count,S.boundingSphere=O;const I={value:Zs.map(C=>new Ct(...C.blob))},_=new Ge({color:0,transparent:!0,opacity:.32,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});_.onBeforeCompile=C=>{C.uniforms.uBlob=I,C.vertexShader=`attribute vec3 aPos;
attribute vec2 aInfo;
uniform vec2 uBlob[6];
varying vec2 vBlob;
`+C.vertexShader.replace("#include <begin_vertex>",`
        vec2 bs = uBlob[int(aInfo.x + 0.5)];
        float c = cos(aInfo.y);
        float s = sin(aInfo.y);
        vec2 l = vec2(position.x * bs.x, position.z * bs.y);
        vec3 transformed = aPos + vec3(l.x * c + l.y * s, 0.04, -l.x * s + l.y * c);
        vBlob = position.xz;
      `),C.fragmentShader=`varying vec2 vBlob;
`+C.fragmentShader.replace("#include <opaque_fragment>",`diffuseColor.a *= 1.0 - smoothstep(0.2, 1.0, dot(vBlob, vBlob));
#include <opaque_fragment>`)};const N=new ee(S,_);N.name="prajurit-bayangan",N.renderOrder=1,u.add(N);const z=8,D=o.bounds.x0-4,U=o.bounds.z0-4,X=Math.ceil((o.bounds.x1+4-D)/z),H=Math.ceil((o.bounds.z1+4-U)/z),k=new Int32Array(X*H+1),it=C=>Math.floor((c.x[C]-D)/z)+Math.floor((c.z[C]-U)/z)*X;for(let C=0;C<c.count;C++)k[it(C)+1]++;for(let C=0;C<X*H;C++)k[C+1]+=k[C];const st=k.slice(0,X*H),ot=new Int32Array(c.count);for(let C=0;C<c.count;C++)ot[st[it(C)]++]=C;const _t=new Int32Array(4096),gt=new Float32Array(4096),Y=new Int32Array(4096),Z=new Int32Array(l.near+64);let rt=0,F=0;const dt=new G,bt=new G(sr,sr,sr);function ft(C,P,J){F+=C,P.updateMatrixWorld();const tt=P.matrixWorld.elements;j.uCamRight.value.set(tt[0],tt[1],tt[2]),j.uCamUp.value.set(tt[4],tt[5],tt[6]),j.uCamPos.value.set(tt[12],tt[13],tt[14]);const K=Math.max(A.x0-tt[12],0,tt[12]-A.x1),ht=Math.max(A.z0-tt[14],0,tt[14]-A.z1);N.visible=K*K+ht*ht<120*120;let yt=0;const vt=l.reach,St=tt[12],Pt=tt[13],Mt=tt[14],Et=l.view*l.view,Dt=Math.max(0,Math.floor((J.x-vt-D)/z)),Ht=Math.min(X-1,Math.floor((J.x+vt-D)/z)),Tt=Math.max(0,Math.floor((J.z-vt-U)/z)),jt=Math.min(H-1,Math.floor((J.z+vt-U)/z));for(let Vt=Tt;Vt<=jt;Vt++)for(let et=Dt;et<=Ht;et++){const It=et+Vt*X;for(let q=k[It];q<k[It+1]&&yt<_t.length;q++){const ct=ot[q];if(ct>=o.total)continue;const At=c.x[ct]-J.x,wt=c.z[ct]-J.z,zt=At*At+wt*wt;if(zt>vt*vt)continue;const Kt=c.x[ct]-St,fe=v[ct*3+1]+1-Pt,Qt=c.z[ct]-Mt;Kt*Kt+fe*fe+Qt*Qt>Et||(_t[yt]=ct,gt[yt]=zt,yt++)}}let Xt=vt*vt;if(rt=0,yt>l.near){for(let et=0;et<yt;et++)Y[et]=et;const Vt=Y.subarray(0,yt).sort((et,It)=>gt[et]-gt[It]);Xt=gt[Vt[l.near-1]];for(let et=0;et<yt&&rt<Z.length;et++)gt[et]<=Xt&&(Z[rt++]=_t[et])}else for(let Vt=0;Vt<yt;Vt++)Z[rt++]=_t[Vt];j.uLod.value.set(J.x,J.z,rt?Xt*.999:0,Et*.999);for(const Vt of m)Vt.mesh.count=0;for(let Vt=o.total;Vt<c.count;Vt++)xt(Vt);for(let Vt=0;Vt<rt;Vt++)xt(Z[Vt]);for(const Vt of m)Vt.mesh.count&&(Vt.mesh.instanceMatrix.needsUpdate=!0,Vt.anim.needsUpdate=!0)}function xt(C){const P=m[c.type[C]];if(P.mesh.count>=P.cap)return;const J=P.mesh.count++;dt.set(c.x[C],v[C*3+1],c.z[C]),P.mesh.setMatrixAt(J,Yi.compose(dt,gs.setFromAxisAngle(aa,o.heading),bt)),Mo(P.type.clip,F+c.phase[C]*7.3,P.anim.array,J*4),P.anim.array[J*4+3]=0}const R=gi.map((C,P)=>({id:C.id,name:C.name,count:x[P]})),Q={rangka:Math.round(p-h),atlas:Math.round(y-p),sisanya:Math.round(performance.now()-y)};return{object:u,update:ft,atlas:M,stats:()=>({total:o.total,perwira:x[5],pasukan:R,dekat:rt,impostor:o.total-rt,atlas:`${M.target.width}×${M.target.height}`,waktu:Q}),soldier:C=>({x:c.x[C],z:c.z[C],type:Zs[c.type[C]].id}),count:c.count}}function mS(i){const t=i.scene.getObjectByName("kuda"),e=i.scene.getObjectByName("shield-rectangle");return{horse:t,shieldRect:lS(e,i.scene)}}const $s=Ap.find(i=>i.id==="agung"),gS=($s.from+$s.to)/2,Np=(i,t)=>Math.abs(t-$s.at)<$s.width&&i>$s.from-12&&i<$s.to+12;function ed(i,t){if(Np(i,t))return i<gS;for(const e of br)if(la(e,i,t)<1.08)return!0;return!1}function xS(i,t){if(Np(i,t))return"agung";if(ms(i,t,be,2))return"kota";if(ms(i,t,_n,30))return"wira";let e="kencana",n=1/0;for(const s of br){const r=la(s,i,t);r<n&&(n=r,e=s.id)}return e}const Tc=2.3,Ec=.35,_S=1.4,vS=3.6,nd=.2,cs={ronda:1.15,kembali:1.6,dekati:2.6,kejar:5.2},Rc=9,id=1,sd=30,rd={hit:.24,dur:.42},ad={rendah:40,sedang:64,tinggi:96},od={kota:.28,wira:.22,kencana:.2,agung:.08,sawah:.08,nelayan:.07,pura:.07},yS=[{id:"jaga",weapon:"tombak",dye:[1,6],hp:10,reach:1.9,damage:4},{id:"tombak",weapon:"tombak",dye:[5,4],hp:8,reach:1.9,damage:4},{id:"pedang",weapon:"pedang",dye:[1,4],hp:9,reach:1.45,damage:5}],Cc=(i,t)=>[(i+.5)/8,(t+.5)/8],to={kayu:Cc(6,6),besi:Cc(3,6),emas:Cc(2,4)};function MS(i){const t={5:"idle"},e={4:"holding-left",5:"holding-right"},n=i==="tombak"?t:e;return{idle:{clip:"idle",hold:i==="tombak"?{}:e},walk:{clip:"walk",hold:n},sprint:{clip:"sprint",hold:n},attack:{clip:"attack-melee-right",hold:i==="tombak"?{}:{4:"holding-left"},loop:!1},die:{clip:"die",loop:!1},yes:{clip:"emote-yes",hold:n,loop:!1},stop:{clip:"interact-left",hold:i==="tombak"?t:{5:"holding-right"},loop:!1}}}const Ul=new Ut,Pc=new xe,bS=new G(0,1,0);function SS(i,[t,e]){for(let n=0;n<i.uv.length;n+=2){const s=Math.floor(i.uv[n]*8),r=Math.floor(i.uv[n+1]*8);s===4&&(r===4||r===5)&&(i.uv[n]=(t+.5)/8,i.uv[n+1]=(e+(r-4)+.5)/8)}}function AS(i,t,e){var c;const n=Lo(i.model),s=[];n.traverse(l=>{l.isSkinnedMesh&&s.push(l)});const{map:r}=s[0].material;let a=null;(c=i.model.userData.sword)==null||c.traverse(l=>{!a&&l.isMesh&&(a=l)});const o=(l,u,h)=>new G(h===5?-.265:.265,0,.068).applyMatrix4(l.boneInverses[h].clone().invert()).applyMatrix4(ti(e,u,h));return yS.map(l=>{const u=sa(n,i.clips,e,MS(l.weapon)),{row:h}=u.table.idle,d=ir(s);l.dye&&SS(d,l.dye);const f=o(u.skeleton,h,5);if(l.weapon==="tombak"){const g=Math.max(.02,f.y-.42);Re(d,new ke(.017,.017,f.y+1.05-g,5).translate(f.x,(g+f.y+1.05)/2,f.z),e,h,5,to.kayu),Re(d,new _s(.045,.18,4).translate(f.x,f.y+1.14,f.z),e,h,5,to.besi),Re(d,new ke(.03,.03,.04,5).translate(f.x,f.y+1.04,f.z),e,h,5,to.emas)}else{if(a){const m=a.geometry.clone();m.applyMatrix4(Ul.makeRotationX(Math.PI-.25)),m.translate(f.x,f.y+.02,f.z),Re(d,m,e,h,5,null)}const g=o(u.skeleton,h,4),x=t?t.clone().scale(1.3,1.3,1.3):new Wn(.3,.38,.04);x.translate(g.x+.02,g.y-.18,g.z+.07),Re(d,x,e,h,4,t?null:to.kayu)}return{...l,data:d,table:u.table,map:r}})}function wS(i,t){const e=[],{army:n}=i;if(n){const a=_n.z0-10,o=_n.x0-7,c=_n.x1+7,l=n.lanes.slice(-2),u=Math.max(...l.map(h=>Math.max(h[1],h[3])))+5;for(const[h,d,,f]of l)e.push([h,a,h,Math.min(d,f)],[h,Math.min(d,f),h,u]);e.push([o,u,c,u])}const s=zp([...i.roads,...i.paths,...e]),{nodes:r}=s;for(let a=0;a<6;a++){const o=new Int32Array(r.length).fill(-1),c=[];for(const h of r){if(o[h.id]>=0)continue;const d=c.length;let f=0;const g=[h];for(o[h.id]=d;g.length;){const x=g.pop();f++;for(const m of x.links)o[m.id]<0&&(o[m.id]=d,g.push(m))}c.push(f)}if(c.length<2)break;const l=c.indexOf(Math.max(...c));let u=!1;for(let h=0;h<c.length;h++){if(h===l)continue;let d=null;for(const f of r)if(o[f.id]===h)for(const g of r){if(o[g.id]!==l)continue;const x=Math.hypot(f.x-g.x,f.z-g.z);x<16&&(!d||x<d.d)&&t.lineClear(f.x,f.z,g.x,g.z)&&(d={a:f,b:g,d:x})}d&&(d.a.links.push(d.b),d.b.links.push(d.a),d.a.w.set(d.b.id,3),d.b.w.set(d.a.id,3),u=!0)}if(!u)break}return s}const eo=(i,t,e)=>i+Math.atan2(Math.sin(t-i),Math.cos(t-i))*e;function TS({ground:i,colliders:t,nav:e,plan:n,spots:s,quality:r,soldier:a,shieldRect:o}){const c=new Ce;c.name="prajurit-bertugas";const l=[],u=AS(a,o,l),h=Au(l,7),d=wS(n,e),f=new Map,g=(R,Q)=>R.id<Q.id?R.id*4096+Q.id:Q.id*4096+R.id,x={};for(const R of d.nodes)for(const Q of R.links){if(R.id>Q.id)continue;const C=xS((R.x+Q.x)/2,(R.z+Q.z)/2);f.set(g(R,Q),C),(x[C]||(x[C]=[])).push([R,Q,Math.hypot(Q.x-R.x,Q.z-R.z)])}const m=[];function p(R,Q,C,P,J){const tt=u[R],K={id:m.length,type:R,x:Q,z:C,y:i.surfaceAt(Q,C),heading:P,state:"jaga",order:null,hp:tt.hp,maxHp:tt.hp,flash:0,kx:0,kz:0,stagger:0,barT:0,atkCd:Math.random(),atk:null,clip:"idle",t:Math.random()*2,prev:null,prevT:0,fade:0,animSpeed:1,path:null,navT:0,goalX:0,goalZ:0,moved:0,downT:0,waitT:0,tpx:null,tpz:null,tvx:0,tvz:0,...J};return m.push(K),K}for(const R of s)R.role==="penjaga"&&p(0,R.x,R.z,R.rot,{kind:"pos",home:{x:R.x,z:R.z,rot:R.rot},squad:null,slot:0});const M=Math.floor((ad[r.level]??ad.sedang)/2),y=Object.keys(od).filter(R=>{var Q;return(Q=x[R])==null?void 0:Q.length}),v=Object.fromEntries(y.map(R=>[R,1]));let w=M-y.length;const T=y.map(R=>({z:R,v:od[R]*M-1}));for(;w>0;)T.sort((R,Q)=>Q.v-R.v),v[T[0].z]++,T[0].v-=1,w--;const L=[];for(const R of y)for(let Q=0;Q<v[R];Q++){const C=x[R],P=C.reduce((Pt,Mt)=>Pt+Mt[2],0);let J=Math.random()*P,tt=C[0];for(const Pt of C)if(J-=Pt[2],J<=0){tt=Pt;break}const[K,ht,yt]=Math.random()<.5?tt:[tt[1],tt[0],tt[2]],vt={id:L.length,zone:R,from:K,to:ht,len:yt,s:Math.random()*yt,pause:0,wait:0,members:[]};L.push(vt);const St=Math.atan2(ht.x-K.x,ht.z-K.z);for(const[Pt,Mt]of[[1,-1],[2,1]]){const Et=p(Pt,K.x,K.z,St,{kind:"ronda",home:null,squad:vt,slot:Mt,state:"ronda",init:!0});vt.members.push(Et)}}const B=u.map(()=>0);for(const R of m)B[R.type]++;const E=u.map((R,Q)=>{const C=Su(R.data),P=Math.max(1,B[Q]),J=new Cn(new Float32Array(P*4),4).setUsage(Rn),tt=new Cn(new Float32Array(P*4),4).setUsage(Rn),K=new Cn(new Float32Array(P),1).setUsage(Rn);C.setAttribute("aAnimA",J),C.setAttribute("aAnimB",tt),C.setAttribute("aFlash",K);const ht=new jn({map:R.map});ht.onBeforeCompile=St=>{ra(St,h),St.vertexShader=`attribute float aFlash;
varying float vFlash;
`+St.vertexShader.replace("void main() {",`void main() {
  vFlash = aFlash;`),St.fragmentShader=`varying float vFlash;
`+St.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vFlash);`)};const yt=new Ms(C,ht,P);yt.name=`prajurit-${R.id}`,yt.instanceMatrix.setUsage(Rn),yt.frustumCulled=!1,yt.castShadow=r.shadows,yt.receiveShadow=r.shadows;const vt=new Eo({depthPacking:So});return vt.onBeforeCompile=St=>ra(St,h),yt.customDepthMaterial=vt,yt.count=0,c.add(yt),{mesh:yt,animA:J,animB:tt,flash:K,table:R.table}}),A=new vn(1,1),O=new Ge({color:"#0d1a2a",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),j=new Ge({color:"#ffb02e",depthTest:!1,depthWrite:!1,toneMapped:!1}),W=[];for(let R=0;R<10;R++){const Q=new Ce,C=new ee(A,O);C.scale.set(1.08,.2,1),C.renderOrder=11;const P=new ee(A,j);P.renderOrder=12,Q.add(C,P),Q.visible=!1,c.add(Q),W.push({g:Q,fill:P})}function $(R,Q,C=!1){R.clip===Q&&!C||(R.prev=R.clip,R.prevT=R.t,R.fade=nd,R.clip=Q,R.t=0)}const b=R=>{var Q;return R.t>=(((Q=u[R.type].table[R.clip])==null?void 0:Q.n)??1)/yo-.02};let S=0;function I(R,Q,C,P,J,tt){const K=Q-R.x,ht=C-R.z,yt=Math.hypot(K,ht);if(yt<=J)return R.path=null,!0;if(R.navT-=tt,R.navT<=0){R.navT=.6+Math.random()*.4;const jt=Math.hypot(R.goalX-Q,R.goalZ-C)>3;yt<5||e.lineClear(R.x,R.z,Q,C)?R.path=null:(!R.path||jt)&&S>0&&(S--,R.path=e.findPath({x:R.x,z:R.z},{x:Q,z:C}),R.goalX=Q,R.goalZ=C,R.path||(R.navT=2))}let vt=Q,St=C;if(R.path){for(;R.path.length>1&&Math.hypot(R.path[0].x-R.x,R.path[0].z-R.z)<.8;)R.path.shift();R.path.length&&(vt=R.path[0].x,St=R.path[0].z)}const Pt=vt-R.x,Mt=St-R.z,Et=Math.hypot(Pt,Mt)||1,Dt=Math.min(P*tt,Math.max(0,yt-J)+.01),Ht=R.x+Pt/Et*Dt,Tt=R.z+Mt/Et*Dt;return i.surfaceAt(Ht,Tt)>-.6&&(R.x=Ht,R.z=Tt),R.heading=eo(R.heading,Math.atan2(Pt,Mt),Math.min(1,tt*9)),R.moved=P,!1}const _=(R,Q,C,P,J=7)=>{R.heading=eo(R.heading,Math.atan2(Q-R.x,C-R.z),Math.min(1,P*J))};function N(R,Q,C){if(R.tpx!==null&&C>0){const P=1-Math.exp(-4*C);R.tvx+=((Q.x-R.tpx)/C-R.tvx)*P,R.tvz+=((Q.z-R.tpz)/C-R.tvz)*P;const J=Math.hypot(R.tvx,R.tvz);J>8&&(R.tvx*=8/J,R.tvz*=8/J)}R.tpx=Q.x,R.tpz=Q.z}function z(R,Q){const C=Q.links.filter(tt=>f.get(g(Q,tt))===R.zone),P=C.filter(tt=>tt!==R.from),J=P.length?P:C.length?C:Q.links;return J[Math.floor(Math.random()*J.length)]}function D(R,Q,C){const P=R.members.filter(Tt=>Tt.state==="ronda");if(!P.length)return;const J=(R.to.x-R.from.x)/R.len,tt=(R.to.z-R.from.z)/R.len;let K=!1;for(const Tt of P)Math.hypot(C.x-(Tt.x+J*.9),C.z-(Tt.z+tt*.9))<.95&&(K=!0);if(K?(R.wait+=Q,R.wait>2.5&&([R.from,R.to]=[R.to,R.from],R.s=R.len-R.s,R.wait=0)):R.wait=0,R.pause>0)R.pause-=Q;else if(!K)for(R.s+=cs.ronda*Q;R.s>=R.len;){const Tt=R.to,jt=z(R,Tt);R.s-=R.len,R.from=Tt,R.to=jt,R.len=Math.max(.1,Math.hypot(jt.x-Tt.x,jt.z-Tt.z)),Math.random()<.1&&(R.pause=3+Math.random()*4)}const ht=R.pause<=0&&!K,yt=(R.to.x-R.from.x)/R.len,vt=(R.to.z-R.from.z)/R.len,St=Math.min(1,R.s/R.len),Pt=R.from.x+(R.to.x-R.from.x)*St,Mt=R.from.z+(R.to.z-R.from.z)*St,Et=R.from.w.get(R.to.id)??4,Dt=Math.min(.75,Math.max(.35,Et/2-.6)),Ht=1-Math.exp(-5*Q);for(const Tt of P){const jt=Pt-vt*Dt*Tt.slot,Xt=Mt+yt*Dt*Tt.slot;Tt.init&&(Tt.x=jt,Tt.z=Xt,Tt.heading=Math.atan2(yt,vt),Tt.init=!1),Tt.x+=(jt-Tt.x)*Ht,Tt.z+=(Xt-Tt.z)*Ht,ht&&(Tt.heading=eo(Tt.heading,Math.atan2(yt,vt),Math.min(1,Q*5))),Tt.moved=ht?cs.ronda:0}}function U(R,Q){const C=(R.to.x-R.from.x)/R.len,P=(R.to.z-R.from.z)/R.len,J=Math.min(1,R.s/R.len);return{x:R.from.x+(R.to.x-R.from.x)*J-P*.6*Q,z:R.from.z+(R.to.z-R.from.z)*J+C*.6*Q}}let X=()=>{},H=()=>{};function k(R,Q){if(R.hp=0,R.state="roboh",R.order=null,R.atk=null,R.downT=0,R.path=null,Q){const C=R.x-Q.x,P=R.z-Q.z,J=Math.hypot(C,P)||1;R.kx=C/J*3,R.kz=P/J*3}$(R,"die",!0),H(R)}function it(R,Q,C,P=2.5){if(!(R.state==="roboh"||R.state==="hilang")){if(R.hp-=Q,R.flash=.15,R.barT=5,R.stagger=.3,R.atk=null,C){const J=R.x-C.x,tt=R.z-C.z,K=Math.hypot(J,tt)||1;R.kx=J/K*P,R.kz=tt/K*P}R.hp<=0&&k(R,C)}}function st(R){R.state==="roboh"||R.state==="hilang"||(R.order=null,R.atk=null,R.path=null,R.state="kembali")}function ot(R,Q){let C;return R.kind==="pos"?C=R.home:C=R.squad.members.find(J=>J!==R&&J.state==="ronda")?U(R.squad,R.slot):{x:R.squad.from.x,z:R.squad.from.z},Math.hypot(C.x-Q.x,C.z-Q.z)<45?!1:(R.x=C.x,R.z=C.z,R.hp=R.maxHp,R.kx=R.kz=0,R.flash=R.barT=0,R.state="kembali",R.clip="idle",R.fade=0,R.t=0,!0)}function _t(R,Q,C){if(R.moved=0,R.flash>0&&(R.flash=Math.max(0,R.flash-Q)),R.barT>0&&(R.barT-=Q),R.atkCd>0&&(R.atkCd-=Q),R.state==="hilang"){R.downT+=Q,R.downT>sd&&!ot(R,C.player)&&(R.downT=sd-5);return}if(R.state==="roboh"){R.downT+=Q;const K=Math.exp(-6*Q);R.x+=R.kx*Q,R.z+=R.kz*Q,R.kx*=K,R.kz*=K,R.downT>Rc+id&&(R.state="hilang",R.downT=0);return}if(Math.abs(R.kx)+Math.abs(R.kz)>.05){const K=R.x+R.kx*Q,ht=R.z+R.kz*Q;i.surfaceAt(K,ht)>-.6&&(R.x=K,R.z=ht);const yt=Math.exp(-7*Q);R.kx*=yt,R.kz*=yt}if(R.stagger>0){R.stagger-=Q;return}const P=R.state;if(P==="jaga"){const K=R.home;Math.hypot(C.player.x-R.x,C.player.z-R.z)<5&&C.playerVisible?_(R,C.player.x,C.player.z,Q,5):R.heading=eo(R.heading,K.rot,Math.min(1,Q*3));return}if(P==="ronda")return;if(P==="kembali"){const K=R.kind==="pos"?R.home:U(R.squad,R.slot);I(R,K.x,K.z,cs.kembali,.4,Q)&&(R.kind==="pos"?R.state="jaga":(R.state="ronda",R.init=!1));return}const J=R.order,tt=J?C.targetPos(J.target):null;if(!tt){st(R);return}if(P==="tanya"){const K=Math.atan2(R.x-tt.x,R.z-tt.z),ht=J.near??2,yt=tt.x+Math.sin(K)*ht,vt=tt.z+Math.cos(K)*ht;if(!I(R,yt,vt,cs.kembali,.35,Q))return;_(R,tt.x,tt.z,Q);return}if(P==="serang"){const K=u[R.type],ht=tt.x-R.x,yt=tt.z-R.z,vt=Math.hypot(ht,yt);if(N(R,tt,Q),R.atk){const{atk:Pt}=R;_(R,tt.x,tt.z,Q,10),Pt.t+=Q,!Pt.hit&&Pt.t>=rd.hit&&(Pt.hit=!0,vt<=K.reach+.5&&X(R,J.target,K.damage)),Pt.t>=rd.dur&&R.atk===Pt&&(R.atk=null);return}const St=K.reach*.8;if(vt>St+.15){const Pt=vt>6?Math.min(2.5,vt/cs.kejar):0,Mt=vt>6||Math.hypot(R.tvx,R.tvz)>2;I(R,tt.x+R.tvx*Pt,tt.z+R.tvz*Pt,Mt?cs.kejar:cs.dekati,St,Q)}else _(R,tt.x,tt.z,Q,10),vt<.75&&vt>.001&&(R.x-=ht/vt*(.75-vt),R.z-=yt/vt*(.75-vt)),R.atkCd<=0&&(R.atk={t:0,hit:!1},R.atkCd=1.8+Math.random()*.8,$(R,"attack",!0))}}const gt=new xr,Y=new Ut,Z=new cn(new G,1.7),rt=new G,F=new G(Tc,Tc,Tc),dt={x:0,z:0};let bt=0;function ft(R,Q){S=2;for(const K of L)D(K,R,Q.player);for(const K of m)_t(K,R,Q);for(const K of m){if(K.state==="hilang"||K.state==="roboh"||K.state==="ronda"||K.state==="jaga")continue;for(const St of m){if(St===K||St.state==="hilang"||St.state==="roboh")continue;const Pt=K.x-St.x,Mt=K.z-St.z,Et=Pt*Pt+Mt*Mt;if(Et>.49||Et<1e-8)continue;const Dt=Math.sqrt(Et);K.x+=Pt/Dt*(.7-Dt)*.5,K.z+=Mt/Dt*(.7-Dt)*.5}const ht=K.x-Q.player.x,yt=K.z-Q.player.z,vt=Math.hypot(ht,yt);vt<.72&&vt>1e-4&&(K.x=Q.player.x+ht/vt*.72,K.z=Q.player.z+yt/vt*.72),dt.x=dt.z=0,t.resolve(K,Ec,dt)}for(const K of m)K.state!=="hilang"&&(K.state!=="roboh"&&!K.atk&&K.clip!=="stop"&&K.clip!=="yes"?K.moved>2.4?$(K,"sprint"):K.moved>.05?$(K,"walk"):$(K,"idle"):(K.clip==="stop"||K.clip==="yes")&&b(K)&&$(K,"idle"),K.animSpeed=K.clip==="walk"?K.moved/_S:K.clip==="sprint"?K.moved/vS:1,K.t+=R*K.animSpeed,K.fade>0&&(K.fade=Math.max(0,K.fade-R),K.prevT+=R));const{camera:C,focus:P}=Q,J=(Q.range??110)**2;C.updateMatrixWorld(),Y.multiplyMatrices(C.projectionMatrix,C.matrixWorldInverse),gt.setFromProjectionMatrix(Y);for(const K of E)K.mesh.count=0;bt=0;let tt=0;for(const K of m){if(K.state==="hilang")continue;const ht=K.x-P.x,yt=K.z-P.z;if(ht*ht+yt*yt>J)continue;K.y=i.surfaceAt(K.x,K.z);let{y:vt}=K;if(K.state==="roboh"&&K.downT>Rc&&(vt-=(K.downT-Rc)/id*.9),Z.center.set(K.x,vt+.8,K.z),!gt.intersectsSphere(Z))continue;const St=E[K.type],Pt=St.mesh.count++;rt.set(K.x,vt,K.z),Pc.setFromAxisAngle(bS,K.heading),St.mesh.setMatrixAt(Pt,Ul.compose(rt,Pc,F));const Mt=St.animA.array;if(Mo(St.table[K.clip]||St.table.idle,K.t,Mt,Pt*4),Mt[Pt*4+3]=K.fade>0?K.fade/nd:0,K.fade>0&&Mo(St.table[K.prev]||St.table.idle,K.prevT,St.animB.array,Pt*4),St.flash.array[Pt]=K.flash>0?K.flash/.15*.75:0,bt++,K.barT>0&&K.state!=="roboh"&&tt<W.length&&ht*ht+yt*yt<3600){const Et=W[tt++];Et.g.visible=!0,Et.g.position.set(K.x,vt+2.05,K.z),Et.g.quaternion.copy(C.quaternion);const Dt=Math.max(0,K.hp/K.maxHp);Et.fill.scale.set(Dt,.13,1),Et.fill.position.x=-(1-Dt)/2}}for(let K=tt;K<W.length;K++)W[K].g.visible=!1;for(const K of E)K.mesh.count&&(K.mesh.instanceMatrix.needsUpdate=!0,K.animA.needsUpdate=!0,K.animB.needsUpdate=!0,K.flash.needsUpdate=!0)}const xt=R=>R.state!=="roboh"&&R.state!=="hilang";return{object:c,list:m,squads:L,routes:d,types:u,stats(){const R={};for(const Q of L)R[Q.zone]=(R[Q.zone]||0)+Q.members.length;return{total:m.length,pos:m.filter(Q=>Q.kind==="pos").length,peronda:m.filter(Q=>Q.kind==="ronda").length,wilayah:R,siaga:m.filter(Q=>xt(Q)).length,roboh:m.filter(Q=>!xt(Q)).length,bertugas:m.filter(Q=>Q.state==="ronda"||Q.state==="jaga").length,visible:bt}},update:ft,alive:xt,onStrike(R){X=R},onDown(R){H=R},command(R,Q){var C;xt(R)&&((R.state!==Q.do||((C=R.order)==null?void 0:C.target)!==Q.target)&&(R.tpx=R.tpz=null,R.tvx=R.tvz=0),R.order=Q,R.state=Q.do,Q.do!=="serang"&&(R.atk=null))},release:st,gesture(R,Q){xt(R)&&!R.atk&&$(R,Q,!0)},nearest(R,Q,C,P=()=>!0){let J=null,tt=C;for(const K of m){if(!xt(K)||!P(K))continue;const ht=Math.hypot(K.x-R,K.z-Q);ht<tt&&(J=K,tt=ht)}return J},hit(R,Q,C,P){const J=[];for(const tt of m)xt(tt)&&(Math.hypot(tt.x-R.x,tt.z-R.z)>R.r+Ec||(J.push(tt),it(tt,Q,P,C)));return J},damage:it,knockDown:k,pushOut(R,Q=.35){for(const C of m){if(!xt(C))continue;const P=R.x-C.x,J=R.z-C.z,tt=Q+Ec,K=P*P+J*J;if(K>=tt*tt||K<1e-8)continue;const ht=Math.sqrt(K);R.x=C.x+P/ht*tt,R.z=C.z+J/ht*tt}},warmUp(R){for(const Q of E){if(!R){Q.mesh.count=0;continue}rt.set(R.x,R.y,R.z),Q.mesh.setMatrixAt(0,Ul.compose(rt,Pc.identity(),F)),Q.mesh.count=1,Q.mesh.instanceMatrix.needsUpdate=!0}},resetAll(){for(const R of m){if(R.hp=R.maxHp,R.flash=R.barT=R.stagger=0,R.order=null,R.atk=null,R.path=null,R.kind==="pos")R.x=R.home.x,R.z=R.home.z,R.state="jaga";else{const Q=U(R.squad,R.slot);R.x=Q.x,R.z=Q.z,R.state="ronda"}$(R,"idle",!0),R.fade=0}}}}const cd=40,ES=7,RS=.5,ld=3,ud=40,CS=60,PS=35,IS=80,hd={range:20,time:6},fd={calm:10,thrown:30},LS=100,Ic=[150,210],di={first:35,every:[60,110],speed:1.4,shop:[18,30]},zS=["Saya pedagang kain dari Pulau Tropis, mau berjualan di pasar.","Saya mau mengantar ikan asin ke pasar kota.","Saya hendak menjenguk saudara di Kampung Nelayan.","Saya membawa kelapa muda untuk dijual di pasar."],DS=["Berhenti! Siapa kamu?! Kamu bukan rakyat Kencana!","Musuh kerajaan! Serang!","Penyusup! Tangkap dia!","Hadang dia! Jangan biarkan masuk!"],ls=i=>i[Math.floor(Math.random()*i.length)],Vs={kind:"pemain"};function kS({soldiers:i,enemies:t,player:e,bubbles:n,message:s,villagers:r=null,visit:a=null,ground:o=null}){const c={engaged:!1,inside:!1,lostT:0,grace:0,scanT:0,raidT:LS,raids:0};let l=null;const u=new Map,h=new Map;let d=!1,f=!0,g=!1;const x=S=>S.state==="ronda"||S.state==="jaga"||S.state==="kembali",m=S=>{var I;return S.state==="serang"&&((I=S.order)==null?void 0:I.target)===Vs},p=S=>S.state==="ronda"||S.state==="jaga",M=(S,I,_=2600)=>n.say(()=>i.alive(S)?{x:S.x,y:S.y+2.2,z:S.z}:null,I,_,`p${S.id}`),y=e.position;function v(S){return S===Vs?e.defeated?null:y:S.kind==="orc"?t?t.position(S.id):null:S.kind==="orang"?S.ref.gone?null:S.ref:null}i.onStrike((S,I,_)=>{I===Vs?e.damage(_,S):I.kind==="orc"&&(t==null||t.damage(I.id,3,S))});function w(S){m(S)||u.set(S,{x:S.x,z:S.z}),i.command(S,{do:"serang",target:Vs})}function T(S,I){c.engaged=!0,c.scanT=0,l=S&&i.alive(S)?S:i.nearest(y.x,y.z,cd),l&&M(l,I),s("Kamu musuh Kerajaan Kencana! Lawan prajuritnya, atau lari keluar dari wilayah kerajaan.",3600)}function L(S,I){var _;c.engaged=!1,c.lostT=0,c.grace=I;for(const N of i.list)((_=N.order)==null?void 0:_.target)===Vs&&i.release(N);S&&s(S,3e3)}function B(S){if(e.defeated||!c.inside&&c.grace>0||(c.scanT-=S,c.scanT>0))return;c.scanT=RS;const I=c.inside?i.nearest(y.x,y.z,cd,x):i.nearest(y.x,y.z,ES,p);I&&T(I,ls(DS))}function E(S){if(e.defeated)return;let I=0;for(const z of i.list){if(!i.alive(z)||!m(z))continue;const D=u.get(z);!c.inside&&D&&Math.hypot(z.x-D.x,z.z-D.z)>PS||Math.hypot(z.x-y.x,z.z-y.z)>CS?i.release(z):I++}if(I>=ld||(c.scanT-=S,c.scanT>0))return;c.scanT=.4;const _=i.list.filter(z=>i.alive(z)&&(c.inside?x(z):p(z))).map(z=>({a:z,d:Math.hypot(z.x-y.x,z.z-y.z)})).filter(z=>z.d<(c.inside?ud:ud*.6)).sort((z,D)=>z.d-D.d).slice(0,ld-I);for(const{a:z}of _)w(z);const N=_.find(z=>z.a!==l);N&&M(N.a,ls(["Kepung dia!","Jangan biarkan lolos!","Bantu! Ada penyusup!","Serang!"]))}function A(S){let I=h.get(S);return I||h.set(S,I={kind:"orc",id:S}),I}function O(S){var I;if(t){(f||c.raidT<=0)&&(c.raidT-=S),c.raidT<=0&&!t.raidActive&&(c.raidT=Ic[0]+Math.random()*(Ic[1]-Ic[0]),t.startRaid(y)&&(c.raids++,d=!1));for(const _ of t.raiders()){if(!ed(_.x,_.z)&&!i.nearest(_.x,_.z,15,x))continue;d||(d=!0,Math.hypot(_.x-y.x,_.z-y.z)<300&&s("Gerombolan orc menyerbu Jembatan Agung! Prajurit Kencana menghadang mereka.",4200));const N=A(_.id);let z=0;for(const U of i.list)U.state==="serang"&&((I=U.order)==null?void 0:I.target)===N&&z++;if(z>=2)continue;const D=i.nearest(_.x,_.z,IS,x);D&&(i.command(D,{do:"serang",target:N}),M(D,ls(["Orc menyerbu! Hadang!","Serang orc itu!","Lindungi kerajaan!","Jangan biarkan lewat!"])))}}}const j=(r&&a?r.scripted:[]).map((S,I)=>({a:S,phase:"tunggu",t:di.first+I*45,path:[],target:{kind:"orang",ref:S},guard:null,asked:0})),W=(S,I,_)=>n.say(()=>S.hidden?null:{x:S.x,y:o.surfaceAt(S.x,S.z)+1.95,z:S.z},I,_,`v${r.agents.indexOf(S)}`);function $(S,I){const{a:_}=S,N=S.path[0];if(!N)return!0;const z=N.x-_.x,D=N.z-_.z,U=Math.hypot(z,D);if(U<.3)return S.path.shift(),!S.path.length;const X=Math.min(di.speed*I,U);return _.x+=z/U*X,_.z+=D/U*X,_.heading+=Math.atan2(Math.sin(Math.atan2(z,D)-_.heading),Math.cos(Math.atan2(z,D)-_.heading))*Math.min(1,I*6),r.setClip(_,"walk"),!1}function b(S){var I;for(const _ of j){const{a:N}=_,z=Math.hypot(y.x-a.start.x,y.z-a.start.z)>45;if(_.phase==="tunggu"){if((_.t-=S)>0||!z)continue;N.hidden=!1,N.x=a.start.x,N.z=a.start.z,N.heading=-Math.PI/2,N.speed=di.speed,_.path=[{...a.gate}],_.phase="datang"}else if(_.phase==="datang")$(_,S)&&(_.phase="ditanya",_.t=0,_.guard=null,r.setClip(N,"idle"));else if(_.phase==="ditanya"){_.t+=S,!_.guard&&_.t<8&&(_.guard=i.nearest(N.x,N.z,16,U=>U.kind==="pos"&&x(U)),_.guard&&(_.t=0,i.command(_.guard,{do:"tanya",target:_.target,near:1.8}),i.gesture(_.guard,"stop"),M(_.guard,"Berhenti! Siapa kamu dan mau ke mana?",2600)));const D=_.guard;D&&(N.heading+=Math.atan2(Math.sin(Math.atan2(D.x-N.x,D.z-N.z)-N.heading),Math.cos(Math.atan2(D.x-N.x,D.z-N.z)-N.heading))*Math.min(1,S*5),_.t>2.6&&!_.said&&(_.said=!0,_.asked++,W(N,ls(zS),3200),r.setClip(N,"interact")),_.t>6&&!_.passed&&(_.passed=!0,i.gesture(D,"yes"),M(D,ls(["Silakan lewat. Jaga sikapmu di kota.","Baik, silakan lewat.","Silakan. Pasar ada di dekat alun-alun."]),2600))),_.t>(D?7.6:8)&&(D&&((I=D.order)==null?void 0:I.target)===_.target&&i.release(D),_.guard=null,_.said=_.passed=!1,_.path=a.market.map(U=>({...U})),_.phase="masuk")}else _.phase==="masuk"?$(_,S)&&(_.phase="belanja",_.t=di.shop[0]+Math.random()*(di.shop[1]-di.shop[0]),r.setClip(N,"interact")):_.phase==="belanja"?(_.t-=S)<=0&&(_.path=[...a.market].reverse().slice(1).map(D=>({...D})),_.path.push({...a.gate},{...a.start}),_.phase="pulang"):_.phase==="pulang"&&$(_,S)&&(r.setClip(N,"idle"),z&&(N.hidden=!0,_.phase="tunggu",_.t=di.every[0]+Math.random()*(di.every[1]-di.every[0])))}}return{targetPos:v,get engaged(){return c.engaged},stats:()=>({...c,penyerang:i.list.filter(S=>i.alive(S)&&m(S)).length}),update(S){c.inside=!e.defeated&&ed(y.x,y.z),c.grace>0&&(c.grace-=S),!g&&!c.engaged?B(S):g||(c.lostT=c.inside||i.nearest(y.x,y.z,hd.range,m)?0:c.lostT+S,c.lostT>hd.time?L("Prajurit Kencana berhenti mengejarmu.",fd.calm):E(S)),O(S),j.length&&b(S)},visitors:()=>j.map(S=>({fase:S.phase,ditanya:S.asked,x:S.a.x,z:S.a.z})),visitNow(){const S=j.find(I=>I.phase==="tunggu");S&&(S.t=0)},defend(S,I){const _=A(I);[S,...S.squad?S.squad.members.filter(z=>z!==S):[]].forEach((z,D)=>{var U,X;!i.alive(z)||z.state==="serang"&&((X=(U=z.order)==null?void 0:U.target)==null?void 0:X.kind)==="orc"||!(x(z)||z===S)||(i.command(z,{do:"serang",target:_}),D===0&&M(z,ls(["Orc! Lawan!","Serang balik!","Hadang orc ini!"])))})},playerStruck(S){if(!(!S.length||g)){c.engaged||T(S[0],ls(["Berani menyerang prajurit Kencana?! Serang!","Penyerang! Lawan dia!"]));for(const I of S)i.alive(I)&&x(I)&&w(I)}},playerDefeated(){const S=c.engaged;if(S){const I=i.nearest(y.x,y.z,12,_=>{var N;return((N=_.order)==null?void 0:N.target)===Vs});I&&M(I,"Bawa dia keluar dari wilayah kerajaan!",3e3)}return L(null,S?fd.thrown:0),S},reset(){L(null,0),c.scanT=0},ceasefire(S){g=S,S&&L(null,0)},raid(){c.raidT=0},setRaids(S){f=S}}}const gn=2,NS=[{text:"Pulau Tropis",x:10,z:-175,size:15},{text:"Gunung",x:70,z:-48,size:11},{text:"Kotaraja Kencana",x:-560,z:-78,size:14},{text:"Pulau Kencana",x:-560,z:222,size:13},{text:"Pulau Sawah",x:-660,z:-425,size:13},{text:"Pulau Nelayan",x:-760,z:452,size:13},{text:"Pura Segara",x:-890,z:58,size:12},{text:"Jembatan Agung",x:-252,z:24,size:11},{text:"Pelabuhan",x:-553,z:236,size:11},{text:"Pulau Wira",x:-270,z:620,size:14},{text:"Tegal Wira · 25.000 prajurit",x:-270,z:352,size:11}],Sn=(i,t,e)=>i+(t-i)*e,Lc=i=>Math.min(1,Math.max(0,i));function US(i,t,e,n){if(ms(i,t,bp))return{id:"keraton",name:"Keraton Kencana",sub:"Istana Raja Kencana"};if(ms(i,t,be,1))return{id:"kotaraja",name:"Kotaraja Kencana",sub:"Ibu kota Kerajaan Kencana"};if(ms(i,t,_n))return{id:"tegal",name:"Tegal Wira",sub:"25.000 prajurit Kencana siap tempur"};for(const o of n){const c=o.axis==="x"?i:t,l=o.axis==="x"?t:i;if(Math.abs(l-o.at)<o.width&&c>Math.min(o.a,o.b)&&c<Math.max(o.a,o.b))return{id:`jembatan-${o.id}`,name:o.name,sub:o.id==="agung"?"Penghubung Pulau Tropis dan Kerajaan Kencana":"Kepulauan Kencana"}}if(e.heightAt(i,t)<-1.2)return null;if(Math.hypot(i,t)<340)return{id:"tropis",name:"Pulau Tropis",sub:"Pulau tengah"};let s=null,r=1/0;for(const o of br){const c=la(o,i,t);c<r&&(r=c,s=o)}if(!s||r>1.35)return null;const a={kencana:"Kepulauan Kencana",sawah:"Lumbung padi kerajaan",nelayan:"Kampung nelayan",pura:"Pura di puncak bukit",wira:"Markas bala tentara Kencana"};return{id:s.id,name:s.id==="pura"?"Pura Segara":s.name,sub:a[s.id]}}function OS(i,t,e){let n,s,r;if(i<0){const a=Lc(-i/14);n=Sn(86,22,a),s=Sn(205,78,a),r=Sn(200,140,a)}else if(i<2.2)n=226,s=208,r=156;else if(i<40){const a=Lc((i-2.2)/38);n=Sn(104,64,a),s=Sn(168,118,a),r=Sn(72,52,a)}else{const a=Lc((i-40)/40);n=Sn(120,196,a),s=Sn(118,190,a),r=Sn(100,182,a)}if(t){const a=(o,c,l,u)=>{n=Sn(n,c,o),s=Sn(s,l,o),r=Sn(r,u,o)};a(t.rumput,120,196,84),a(t.sawah,168,210,80),a(t.jalan,214,184,132),a(t.batu,214,208,196)}e[0]=n,e[1]=s,e[2]=r}function FS({ground:i,plan:t,region:e,camps:n=[]}){const s=document.getElementById("peta"),r=document.getElementById("peta-kanvas"),a=r.getContext("2d"),o=Math.round(Yt.width/gn),c=Math.round(Yt.depth/gn);let l=null;const u=x=>(x-Yt.minX)/gn,h=x=>(x-Yt.minZ)/gn;function d(){var y;const x=document.createElement("canvas");x.width=o,x.height=c;const m=x.getContext("2d"),p=m.createImageData(o,c),M=[0,0,0];for(let v=0;v<c;v++)for(let w=0;w<o;w++){const T=Yt.minX+(w+.5)*gn,L=Yt.minZ+(v+.5)*gn;OS(i.heightAt(T,L),e.at(T,L),M);const B=(v*o+w)*4;p.data[B]=M[0],p.data[B+1]=M[1],p.data[B+2]=M[2],p.data[B+3]=255}m.putImageData(p,0,0),m.fillStyle="rgba(120, 52, 36, 0.85)";for(const v of t.blocked)m.save(),m.translate(u(v.x),h(v.z)),m.rotate(-(v.rot||0)),m.fillRect(-v.hx/gn,-v.hz/gn,2*v.hx/gn,2*v.hz/gn),m.restore();for(const v of((y=t.army)==null?void 0:y.blocks)??[])m.fillStyle=gi[v.type].map,m.fillRect(u(v.x0),h(v.z0),(v.x1-v.x0)/gn,(v.z1-v.z0)/gn);m.strokeStyle="#f4efe2",m.lineCap="butt";for(const v of t.spans)m.lineWidth=Math.max(2,v.width/gn),m.beginPath(),v.axis==="x"?(m.moveTo(u(v.a),h(v.at)),m.lineTo(u(v.b),h(v.at))):(m.moveTo(u(v.at),h(v.a)),m.lineTo(u(v.at),h(v.b))),m.stroke();l=x}function f(x,m,p,M,y){a.font=`600 ${Math.round(M*y)}px system-ui, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.lineWidth=3*y,a.strokeStyle="rgba(0, 30, 45, 0.85)",a.strokeText(x,m,p),a.fillStyle="#fff",a.fillText(x,m,p)}function g(x,m){l||d();const p=r.getBoundingClientRect(),M=Math.min(2,window.devicePixelRatio||1);r.width=Math.round(p.width*M),r.height=Math.round(p.height*M);const y=r.width/o;a.imageSmoothingEnabled=!0,a.drawImage(l,0,0,r.width,r.height);const v=Math.max(.8,r.width/900);for(const A of n)a.fillStyle="#e8483a",a.beginPath(),a.arc(u(A.x)*y,h(A.z)*y,4*v,0,Math.PI*2),a.fill();for(const A of NS)f(A.text,u(A.x)*y,h(A.z)*y,A.size,v);const w=u(x.x)*y,T=h(x.z)*y,L=Math.sin(m),B=Math.cos(m),E=9*v;a.fillStyle="#ffe14a",a.strokeStyle="#1a1206",a.lineWidth=2*v,a.beginPath(),a.moveTo(w+L*E*1.4,T+B*E*1.4),a.lineTo(w-B*E*.8-L*E*.7,T+L*E*.8-B*E*.7),a.lineTo(w-L*E*.25,T-B*E*.25),a.lineTo(w+B*E*.8-L*E*.7,T-L*E*.8-B*E*.7),a.closePath(),a.fill(),a.stroke(),f("Kamu",w,T+17*v,11,v)}return{get open(){return!s.hidden},show(x,m){s.hidden=!1,g(x,m)},hide(){s.hidden=!0},sample(x,m){l||d();const p=l.getContext("2d").getImageData(Math.floor(u(x)),Math.floor(h(m)),1,1).data;return[p[0],p[1],p[2]]},size:{width:o,height:c}}}function BS({ground:i,spans:t}){const e=document.getElementById("wilayah"),n=e.querySelector(".wilayah-nama"),s=e.querySelector(".wilayah-ket");let r,a=null,o=0,c=0,l=0;return{get current(){return r},update(u,h,d=!0){if(c>0&&(c-=u,c<=0&&e.classList.remove("tampil")),(l-=u)>0)return!1;l=.25;const f=US(h.x,h.z,i,t),g=f?f.id:null;return r===void 0?(r=g,!1):g===(r??null)?(a=null,!1):!a||a.id!==g?(a={id:g,r:f},o=0,!1):(o+=.25,o<.5||(r=g,a=null,!f||!d)?!1:(n.textContent=f.name,s.textContent=f.sub,e.classList.add("tampil"),c=3.2,!0))}}}function HS(i,t){const e=[],n=new G;function s(){let r=e.find(a=>!a.anchor);if(!r&&e.length<12){const a=document.createElement("div");a.className="gelembung",a.hidden=!0,i.appendChild(a),r={el:a,anchor:null,t:0,ms:0,key:null},e.push(r)}return r||e.reduce((a,o)=>o.t>a.t?o:a)}return{say(r,a,o=2600,c=null){let l=c!==null?e.find(u=>u.anchor&&u.key===c):null;l||(l=s()),l.anchor=r,l.key=c,l.t=0,l.ms=o,l.el.textContent=a,l.el.hidden=!1,l.el.classList.remove("pudar")},get texts(){return e.filter(r=>r.anchor).map(r=>r.el.textContent)},update(r){const a=window.innerWidth,o=window.innerHeight;for(const c of e){if(!c.anchor)continue;c.t+=r*1e3;const l=c.anchor();if(!l||c.t>c.ms){c.anchor=null,c.el.hidden=!0;continue}const u=t.position.distanceTo(n.set(l.x,l.y,l.z))>90;n.project(t);const h=n.z>1||n.x<-1.1||n.x>1.1||n.y<-1.1||n.y>1.1||u;c.el.style.visibility=h?"hidden":"visible",!h&&(c.el.style.transform=`translate(${(n.x+1)/2*a}px, ${(1-n.y)/2*o}px) translate(-50%, -100%)`,c.ms-c.t<400&&c.el.classList.add("pudar"))}},clear(){for(const r of e)r.anchor=null,r.el.hidden=!0}}}function GS(i,t){const e=i.querySelector(".isi"),n=i.querySelector(".angka");let s=-1;return{set(r,a){const o=Math.ceil(r);o!==s&&(s=o,e.style.width=`${100*Math.max(0,r)/a}%`,n.textContent=`${o}`,i.classList.toggle("kritis",r<a*.3))},hurt(){t.classList.remove("kena"),t.offsetWidth,t.classList.add("kena")}}}const VS=12,dd={Digit1:"cincang",KeyQ:"cincang",Digit2:"hentak",KeyE:"hentak",Digit3:"putar",KeyR:"putar",Digit4:"penggal",KeyT:"penggal"},WS=800;function XS({canvas:i,jumpButton:t,attackButton:e,skillButtons:n,touch:s}){const r=new Set;let a=!0,o=!1,c=!1,l=null,u=0,h=1;const d=[],f=new Map;let g=0;function x(){const[w,T]=[...f.values()];return Math.hypot(w.x-T.x,w.y-T.y)}i.addEventListener("contextmenu",w=>w.preventDefault()),i.addEventListener("pointerdown",w=>{var T;if(a&&!(w.pointerType==="mouse"&&w.button!==0&&w.button!==2)){if(f.set(w.pointerId,{x:w.clientX,y:w.clientY,sx:w.clientX,sy:w.clientY,t:w.timeStamp,moved:w.pointerType==="mouse"&&w.button===2}),f.size===2){g=x();for(const L of f.values())L.moved=!0}(T=i.setPointerCapture)==null||T.call(i,w.pointerId)}}),i.addEventListener("pointermove",w=>{const T=f.get(w.pointerId);if(T&&(f.size===1&&(!T.moved&&Math.hypot(w.clientX-T.sx,w.clientY-T.sy)>VS&&(T.moved=!0),T.moved&&(u+=w.clientX-T.x)),T.x=w.clientX,T.y=w.clientY,f.size===2)){const L=x();g>0&&L>0&&(h*=g/L),g=L}});function m(w,T){const L=f.get(w.pointerId);L&&(T&&a&&!L.moved&&w.timeStamp-L.t<WS&&d.push({x:w.clientX,y:w.clientY}),f.delete(w.pointerId),g=f.size===2?x():0)}i.addEventListener("pointerup",w=>m(w,!0)),i.addEventListener("pointercancel",w=>m(w,!1)),i.addEventListener("lostpointercapture",w=>m(w,!1)),i.addEventListener("wheel",w=>{a&&(w.preventDefault(),h*=Math.exp(w.deltaY*.0012))},{passive:!1});function p(w,T){w.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),a&&T(),w.classList.add("ditekan")});for(const L of["pointerup","pointercancel","pointerleave"])w.addEventListener(L,()=>w.classList.remove("ditekan"))}p(t,()=>{o=!0}),p(e,()=>{c=!0});for(const[w,T]of Object.entries(n))p(T,()=>{l=w});const M=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"];window.addEventListener("keydown",w=>{!a||w.target instanceof HTMLInputElement||(M.includes(w.code)&&w.preventDefault(),w.code==="Space"&&!w.repeat&&(o=!0),w.code==="KeyF"&&!w.repeat&&(c=!0),dd[w.code]&&!w.repeat&&(l=dd[w.code]),r.add(w.code))}),window.addEventListener("keyup",w=>r.delete(w.code));function y(){r.clear(),f.clear(),g=0}window.addEventListener("blur",y),document.addEventListener("visibilitychange",y);const v=(...w)=>w.some(T=>r.has(T));return{read(){let w=0,T=0;const L=v("KeyD","ArrowRight")-v("KeyA","ArrowLeft"),B=v("KeyW","ArrowUp")-v("KeyS","ArrowDown");if(L||B){const A=Math.hypot(L,B),O=v("ShiftLeft","ShiftRight")?.45:1;w=L/A*O,T=B/A*O}const E={moveX:w,moveY:T,jump:o,attack:c,skill:l,lookDX:u,zoom:h,taps:d.splice(0)};return o=!1,c=!1,l=null,u=0,h=1,E},setEnabled(w){a=w,w||y();for(const T of[t,e,...Object.values(n)])T.hidden=!w||!s}}}const jS=.006,zc=10,pd=60,YS=22,md=.85,KS=1.12,qS=.8,Dc=.3;function ZS(i,t){const e={yaw:0,dist:YS},n=new G,s=new G;let r=!0,a=0,o=0;const c=()=>md+(KS-md)*(e.dist-zc)/(pd-zc);return{state:e,get yaw(){return e.yaw},lookFrom(l,u=!0){e.yaw=l,r=u},shake(l){o=Math.max(o*(a/Dc),l),a=Dc},update(l,u,h){e.yaw-=h.lookDX*jS,e.dist=vi.clamp(e.dist*h.zoom,zc,pd);const d=u.x,f=u.y+qS,g=u.z;if(r)n.set(d,f,g);else{const M=1-Math.exp(-10*l);n.x+=(d-n.x)*M,n.z+=(g-n.z)*M,n.y+=(f-n.y)*(1-Math.exp(-5*l))}const x=c(),m=Math.cos(x);s.set(n.x+Math.sin(e.yaw)*m*e.dist,n.y+Math.sin(x)*e.dist,n.z+Math.cos(e.yaw)*m*e.dist);const p=Math.max(t.surfaceAt(s.x,s.z),0)+3;if(s.y<p&&(s.y=p),r?i.position.copy(s):i.position.lerp(s,1-Math.exp(-10*l)),a>0){a=Math.max(0,a-l);const M=2*o*(a/Dc);i.position.x+=(Math.random()-.5)*M,i.position.y+=(Math.random()-.5)*M,i.position.z+=(Math.random()-.5)*M}i.lookAt(n),r=!1}}}function $S(i,t){return new Ge({color:i,transparent:!0,opacity:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}const gd=new G(0,1,0),kc=new G;function JS(i,t,e,n,s){const a=Math.max(t.surfaceAt(e,n),0);kc.set(-(t.surfaceAt(e+.6,n)-t.surfaceAt(e-.6,n))/(2*.6),1,-(t.surfaceAt(e,n+.6)-t.surfaceAt(e,n-.6))/(2*.6)).normalize(),a<=.001&&kc.copy(gd),i.position.set(e,a+s,n),i.quaternion.setFromUnitVectors(gd,kc)}function QS(i){const t=new Ce,e=$S("#ffe26a",.95),n=new ee(new Co(.5,.72,40).rotateX(-Math.PI/2),e),s=new ee(new cu(.15,20).rotateX(-Math.PI/2),e);t.add(n,s),t.visible=!1,t.renderOrder=10,n.renderOrder=10,s.renderOrder=10;let r=0,a=!1;return{objects:[t],showTarget(o,c,l=!0){JS(t,i,o,c,.06),e.color.set(l?"#ffe26a":"#ff5a5a"),e.opacity=.95,t.visible=!0,a=!l,r=0},hideTarget(){a||(t.visible=!1)},update(o){if(!t.visible)return;r+=o;const c=1+.14*Math.sin(r*7);n.scale.setScalar(c),a&&(e.opacity=Math.max(0,.95-r*1.2),r>.8&&(t.visible=!1,a=!1))}}}const Nr=60,tA=12,xd={pohon:["#6b4423","#8a5a2e","#a8743f","#4f8f2f","#6fb03a"],batu:["#7d7a74","#a19d96","#c9c5bd","#ffd27a"],debu:["#d8c497","#c4ab7a","#a88f63","#e6d8b0"],bata:["#9c4a30","#b8603c","#7e3a26","#d9b48a"],kayu:["#6b4423","#8a5a2e","#a8743f","#c99a5f"],prajurit:["#c9cfdc","#eef1f7","#ffd27a","#8a5a2e"]},no=(i={})=>new Ge({transparent:!0,opacity:0,depthWrite:!1,side:sn,toneMapped:!1,...i});function eA(i,t,e,n){const s=[],r=[],a=[];for(let c=0;c<=n;c++){const l=c/n,u=-i/2+i*l,h=Math.sin(Math.PI*l),d=t-e*h,f=Math.pow(h,.7);if(s.push(Math.sin(u)*t,0,Math.cos(u)*t,Math.sin(u)*d,0,Math.cos(u)*d),r.push(1,1,1,f,1,1,1,f*.15),c<n){const g=c*2;a.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new he;return o.setAttribute("position",new Wt(s,3)),o.setAttribute("color",new Wt(r,4)),o.setIndex(a),o}function nA(i){const t=[[.55,1,0],[.84,1,1],[1,.12,.55]],e=[],n=[],s=[];for(let a=0;a<=i;a++){const o=a/i*Math.PI*2;for(const[c,l,u]of t)e.push(Math.sin(o)*c,0,Math.cos(o)*c),n.push(l,l,l,u);if(a<i)for(let c=0;c<t.length-1;c++){const l=a*t.length+c,u=l+t.length;s.push(l,u,l+1,l+1,u,u+1)}}const r=new he;return r.setAttribute("position",new Wt(e,3)),r.setAttribute("color",new Wt(n,4)),r.setIndex(s),r}function iA(){const i=new he;return i.setAttribute("position",new Wt([-.5,0,0,.5,0,0,-.5,0,1,.5,0,1],3)),i.setAttribute("color",new Wt([1,1,1,0,1,1,1,0,1,1,1,.9,1,1,1,.9],4)),i.setIndex([0,1,2,1,3,2]),i}function sA(){const i=[],t=[],e=[];for(let r=0;r<=8;r++){const a=r/8,o=Math.sin(Math.PI*a);i.push(a-.5,0,-.04,a-.5,0,.04),t.push(1,1,1,o,1,1,1,o),r<8&&e.push(r*2,r*2+1,r*2+2,r*2+1,r*2+3,r*2+2)}const s=new he;return s.setAttribute("position",new Wt(i,3)),s.setAttribute("color",new Wt(t,4)),s.setIndex(e),s}const Nc=9,rA=new xe().setFromAxisAngle(new G(1,0,0),Math.PI/2);function aA(i){const t=new Ce;t.name="efek-serangan";const e={slashes:0,spins:0,pulses:0,streaks:0,bursts:0,cracks:0,cuts:0,sparks:0,lastKind:null,lastMove:null};function n(b,S,I,_,N,z){const D=eA(S,I,_,40),U=Array.from({length:b},()=>{const H=no({vertexColors:!0}),k=new ee(D,H);return k.visible=!1,k.renderOrder=8,t.add(k),{mesh:k,mat:H,t:0,heading:0,dir:1,tilt:0}});let X=0;return{show(H,k,it,st,ot=1,_t=0){const gt=U[X];X=(X+1)%b,gt.mesh.position.set(H,k,it),Object.assign(gt,{t:0,heading:st,dir:ot,tilt:_t}),gt.mesh.visible=!0},update(H){for(const k of U){if(!k.mesh.visible)continue;k.t+=H;const it=k.t/N;if(it>=1){k.mesh.visible=!1;continue}k.mesh.rotation.set(k.tilt,k.heading+(it-.5)*z*k.dir,0,"YXZ"),k.mesh.scale.setScalar(.85+.3*it),k.mat.opacity=.95*Math.pow(1-it,1.3)}}}}const s=n(4,Math.PI*.85,1.35,.6,.22,.9),r=n(1,Math.PI*1.85,2.3,1,.34,2.6),a=nA(48),o=Array.from({length:12},()=>{const b=no({vertexColors:!0}),S=new ee(a,b);return S.visible=!1,S.renderOrder=8,t.add(S),{mesh:S,mat:b,t:0,time:1,r0:0,r1:1,alpha:1}});let c=0;function l(b,S,I,_,N,z,D,U,X=null){const H=o[c];c=(c+1)%o.length,H.mesh.position.set(b,S,I),X?H.mesh.quaternion.copy(X).multiply(rA):H.mesh.quaternion.identity(),H.mat.color.set(D),Object.assign(H,{t:0,time:z,r0:_,r1:N,alpha:U}),H.mesh.scale.setScalar(_),H.mesh.visible=!0,e.pulses++}const u=iA(),h=Array.from({length:7},()=>{const b=no({vertexColors:!0}),S=new ee(u,b);return S.visible=!1,S.renderOrder=7,t.add(S),{mesh:S,mat:b,t:0}}),d=.5,f=Array.from({length:2},()=>{const b=new he;b.setAttribute("position",new Wt(new Float32Array(Nc*9),3));const S=new Ge({color:"#2b1d12",transparent:!0,opacity:0,depthWrite:!1,side:sn}),I=new ee(b,S);return I.visible=!1,I.frustumCulled=!1,I.renderOrder=6,t.add(I),{mesh:I,mat:S,t:0}});let g=0;const x=1.6;function m(b,S){const I=f[g];g=(g+1)%f.length;const _=I.mesh.geometry.attributes.position,N=.05;for(let z=0;z<Nc;z++){const D=z/Nc*Math.PI*2+(Math.random()-.5)*.5,U=1.3+Math.random()*1.6,X=.07+Math.random()*.05,H=b+Math.sin(D)*.15,k=S+Math.cos(D)*.15;[[H+Math.cos(D)*X,k-Math.sin(D)*X],[H-Math.cos(D)*X,k+Math.sin(D)*X],[b+Math.sin(D)*U,S+Math.cos(D)*U]].forEach(([st,ot],_t)=>_.setXYZ(z*3+_t,st,Math.max(i.surfaceAt(st,ot),0)+N,ot))}_.needsUpdate=!0,I.t=0,I.mesh.visible=!0,e.cracks++}const p=sA(),M=Array.from({length:5},()=>{const b=no({vertexColors:!0,depthTest:!1}),S=new ee(p,b);return S.visible=!1,S.renderOrder=14,t.add(S),{mesh:S,mat:b,t:0}});let y=0;const v=.4,w=new Ms(new Wn(.21,.21,.21),new Ge,Nr);w.instanceMatrix.setUsage(Rn),w.frustumCulled=!1,w.visible=!1,t.add(w);const T=Array.from({length:Nr},()=>({alive:!1,t:0,life:1,size:1,spin:1,floor:0,p:new G,v:new G})),L=new Ie,B=new Nt,E=new Ut().makeScale(0,0,0);for(let b=0;b<Nr;b++)w.setMatrixAt(b,E),w.setColorAt(b,B.set("#ffffff"));let A=0,O=0;function j(b,S,I,_,N,z,D,U){const X=xd[_]||xd.batu;for(let H=0;H<N;H++){const k=T[A];k.alive=!0,k.t=0,k.life=.45+Math.random()*.4,k.size=.6+Math.random()*.7,k.spin=(Math.random()-.5)*24,k.floor=U;const it=z===null?Math.random()*Math.PI*2:z+(Math.random()-.5)*D,st=1.5+Math.random()*3;k.p.set(b,S,I),k.v.set(Math.sin(it)*st,1.5+Math.random()*3.5,Math.cos(it)*st),w.setColorAt(A,B.set(X[H%X.length])),A=(A+1)%Nr}w.instanceColor.needsUpdate=!0,w.visible=!0,e.bursts++,e.lastKind=_}function W(b,S,I,_,N){const z=S-b.x,D=I-b.z,U=Math.hypot(z,D)||1,X=b.x+z/U*b.radius,H=b.z+D/U*b.radius;j(X,_,H,b.kind,N,Math.atan2(z,D),2.4,i.surfaceAt(X,H))}let $=new xe;return{object:t,stats:()=>({...e,alive:O}),attack(b,S=[],I=[]){const _=b.origin;if(e.lastMove=b.move,b.type==="dash"){const X=b.path;for(let H=0;H+1<X.length&&H<h.length;H++){const k=X[H],it=X[H+1],st=Math.hypot(it.x-k.x,it.z-k.z);if(st<.3)continue;const ot=h[H];ot.mesh.position.set(k.x,b.y,k.z),ot.mesh.rotation.y=Math.atan2(it.x-k.x,it.z-k.z),ot.mesh.scale.set(.7,1,st),ot.mesh.visible=!0,ot.t=-H*.04}e.streaks++;return}if(b.type!=="hit")return;const{x:N,y:z,z:D}=b;let U=14;if(b.chop)s.show(_.x,z,_.z,b.heading,b.swing,(Math.random()-.5)*.5),e.slashes++,U=6;else if(b.move==="tebas")s.show(_.x,z,_.z,b.heading),e.slashes++;else if(b.move==="tinju")l(N,z,D,.15,.7,.2,"#ffffff",1),U=8;else if(b.move==="tendang"){l(N,z,D,.2,.95,.24,"#ffe3a0",1);const X=i.surfaceAt(N,D);X>-.3&&j(N,Math.max(X,0)+.15,D,"debu",5,b.heading,1.6,X),U=10}else if(b.spin)r.show(_.x,z,_.z,b.heading),e.spins++,U=10;else if(b.plant){const X=i.surfaceAt(_.x,_.z),H=Math.max(X,0)+.08;m(b.plant.x,b.plant.z),l(b.plant.x,H+.05,b.plant.z,.1,1.2,.25,"#ffffff",1),l(_.x,H,_.z,.4,4,.5,"#fff6dc",.9),l(_.x,H+.02,_.z,.2,2.5,.35,"#ffffff",.7),j(b.plant.x,H+.1,b.plant.z,"debu",16,null,0,X),U=8}for(const X of S)W(X,_.x,_.z,b.plant?z+.5:z,U);for(const X of I)l(X.x,X.y+1,X.z,.1,.65,.16,"#fff3c0",1,$),e.sparks++},execute(b,S){for(const I of b){const _=M[y];y=(y+1)%M.length,_.mesh.position.set(I.x,I.y+.85,I.z),_.mesh.rotation.set(0,Math.atan2(I.x-S.x,I.z-S.z)+Math.PI/2+(Math.random()-.5)*.5,0),_.t=0,_.mesh.visible=!0,l(I.x,I.y+.85,I.z,.1,.8,.2,"#ffffff",1,$),e.cuts++}},update(b,S){S&&($=S.quaternion),s.update(b),r.update(b);for(const I of o){if(!I.mesh.visible)continue;I.t+=b;const _=I.t/I.time;if(_>=1){I.mesh.visible=!1;continue}const N=1-Math.pow(1-_,3);I.mesh.scale.setScalar(I.r0+(I.r1-I.r0)*N),I.mat.opacity=I.alpha*(1-_)}for(const I of h){if(!I.mesh.visible)continue;I.t+=b;const _=Math.max(0,I.t)/d;_>=1?I.mesh.visible=!1:I.mat.opacity=.95*(1-_)}for(const I of f){if(!I.mesh.visible)continue;I.t+=b;const _=I.t/x;_>=1?I.mesh.visible=!1:I.mat.opacity=.75*Math.min(1,(1-_)*2.5)}for(const I of M){if(!I.mesh.visible)continue;I.t+=b;const _=I.t/v;if(_>=1){I.mesh.visible=!1;continue}I.mesh.scale.set(.5+1.1*Math.min(1,_*3),1,1+2*(1-_)),I.mat.opacity=Math.min(1,(1-_)*2)}if(w.visible){O=0;for(let I=0;I<Nr;I++){const _=T[I];if(_.alive){if(_.t+=b,_.t>=_.life){_.alive=!1,w.setMatrixAt(I,E);continue}O++,_.v.y-=tA*b,_.p.addScaledVector(_.v,b),_.p.y<_.floor+.05&&(_.p.y=_.floor+.05,_.v.set(_.v.x*.5,0,_.v.z*.5)),L.position.copy(_.p),L.rotation.set(_.t*_.spin,_.t*_.spin*.7,0),L.scale.setScalar(_.size*(1-Math.pow(_.t/_.life,3))),L.updateMatrix(),w.setMatrixAt(I,L.matrix)}}w.instanceMatrix.needsUpdate=!0,O||(w.visible=!1)}}}}const Uc={tebas:{clip:"attack-melee-right",speed:.9,hit:.24,reach:1,radius:.7,y:.9,damage:1,knock:2.5},tinju:{clip:"attack-melee-left",speed:1,hit:.21,reach:.8,radius:.55,y:1,damage:1,knock:2.5},tendang:{clip:"attack-kick-right",speed:1,hit:.27,reach:.95,radius:.65,y:.45,damage:2,knock:4}},Oc=["tebas","tinju","tendang"],oA=.7,Ol={cincang:6,hentak:7,putar:5,penggal:15},cA=["attack-melee-right","attack-melee-left","attack-kick-right"],Kn={time:.14,from:.1,speed:2.9,hit:.05,reach:1.1,radius:.95,damage:1,knock:.8,advance:.9},lA=10,Oi={chops:3,time:.55,hit:.3,radius:2.4,damage:2,knock:6},qn={up:9.5,forward:2.2,radius:3.3,plant:.75,damage:3,knock:7,stuck:.35,recover:.35},us={range:14,max:5,aim:.55,seg:.08,pause:.35,recover:.3,past:1.6},uA=.15,_d=.45,hA=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function fA(i){let t=null,e=0,n=0,s=null;const r={cincang:0,hentak:0,putar:0,penggal:0};let a=()=>{},o={pickTargets:()=>[],position:()=>null,standable:()=>!0};const c=()=>({x:Math.sin(i.heading),z:Math.cos(i.heading)});function l(y,v){a({type:y,move:t.name,heading:i.heading,origin:{x:i.pos.x,z:i.pos.z},...v})}function u(y,v,w,T,L,B={}){const E=c();l("hit",{x:i.pos.x+E.x*y,z:i.pos.z+E.z*y,r:v,y:i.pos.y+w,damage:T,knock:L,...B})}function h(y,v,w,T,L={}){l("hit",{x:i.pos.x,z:i.pos.z,r:y,y:i.pos.y+v,damage:w,knock:T,area:!0,...L})}function d(y,v,w,T){const L=i.clipLength(v);t={name:y,t:0,dur:L?L/w:_d,hitAt:L?T/w:_d*.55,struck:!1},i.playClip(v,w)}function f(){t.t=0,t.struck=!1,i.playClip("attack-melee-right",Kn.speed,Kn.from)}function g(y){if(y==="pukul"){e=n>0?(e+1)%Oc.length:0;const v=Uc[Oc[e]];d(Oc[e],v.clip,v.speed,v.hit)}else{if(!(y in Ol)||r[y]>0)return!1;if(y==="cincang")t={name:"cincang",phase:"cincang",n:0,of:lA},f();else if(y==="putar")t={name:"putar",phase:"cincang",n:0,of:Oi.chops},f();else if(y==="hentak"){if(!i.grounded||i.depthAt(i.pos.x,i.pos.z)>.9)return!1;const v=c();i.launch(v.x*qn.forward,qn.up,v.z*qn.forward),t={name:"hentak",phase:"naik",t:0},i.pose("attack-melee-right",.16)}else{const v=o.pickTargets(i.pos.x,i.pos.z,us.range,us.max);if(!v.length)return a({type:"gagal",move:"penggal",reason:"musuh"}),!1;t={name:"penggal",phase:"bidik",t:0,ids:v.map(w=>w.id)},i.heading=Math.atan2(v[0].x-i.pos.x,v[0].z-i.pos.z),i.pose("attack-melee-right",.14),l("aim",{targets:t.ids})}r[y]=Ol[y],n=0}return i.stopWalking(),!0}function x(){const y=t.name in Uc;t=null,n=y?oA:0;const v=s;s=null,v&&g(v)}function m(){if(!t.struck&&t.t>=Kn.hit&&(t.struck=!0,u(Kn.reach,Kn.radius,.9,Kn.damage,Kn.knock,{swing:t.n%2?-1:1,chop:t.n+1})),!(t.t<Kn.time))if(t.n++,t.n<t.of)f();else if(t.name==="putar"){const y=i.clipLength("attack-melee-right");Object.assign(t,{phase:"putar",t:0,struck:!1,h0:i.heading}),i.playClip("attack-melee-right",y?y/Oi.time:1)}else Object.assign(t,{phase:"pulih",t:0})}function p(){const y=[{x:i.pos.x,z:i.pos.z}];for(const L of t.ids){const B=o.position(L);B&&y.push(B)}if(y.length<2)return y;const v=y[y.length-2],w=y[y.length-1],T=Math.hypot(w.x-v.x,w.z-v.z)||1;for(const L of[us.past,1,.6]){const B=w.x+(w.x-v.x)/T*L,E=w.z+(w.z-v.z)/T*L;if(o.standable(B,E)){y.push({x:B,z:E});break}}return y}function M(y){t.t+=y;const{name:v,phase:w}=t;if(w==="cincang"){m();return}if(w==="pulih"){t.t>=(v==="hentak"?qn.recover:v==="penggal"?us.recover:uA)&&x();return}if(v==="putar"){i.heading=t.h0+hA(.04,Oi.time-.08,t.t)*Math.PI*2,!t.struck&&t.t>=Oi.hit&&(t.struck=!0,h(Oi.radius,.85,Oi.damage,Oi.knock,{spin:!0})),t.t>=Oi.time&&(i.heading=t.h0,x());return}if(v==="hentak"){if(w==="naik"&&i.vel.y<0)t.phase="turun",i.pose("attack-melee-right",.27),i.swordDown(!0);else if(w==="turun"&&i.grounded&&t.t>.15||t.t>2.5){const T=c(),L={x:i.pos.x+T.x*qn.plant,z:i.pos.z+T.z*qn.plant};i.crouch(.28),h(qn.radius,.05,qn.damage,qn.knock,{plant:L}),Object.assign(t,{phase:"tancap",t:0})}else w==="tancap"&&t.t>=qn.stuck&&(i.crouch(0),i.swordDown(!1),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(v==="penggal"){if(w==="bidik"&&t.t>=us.aim&&(t.path=p(),Object.assign(t,{phase:"kilat",t:0})),t.phase==="kilat"){const T=t.path,L=Math.min(t.t/us.seg,T.length-1),B=Math.min(Math.floor(L),T.length-2);if(B>=0){const E=T[B],A=T[B+1],O=L-B;i.teleport(E.x+(A.x-E.x)*O,E.z+(A.z-E.z)*O),i.heading=Math.atan2(A.x-E.x,A.z-E.z)}L>=T.length-1&&(l("dash",{path:T,y:i.pos.y+.9}),i.pose("attack-melee-right",.33),Object.assign(t,{phase:"diam",t:0}))}else w==="diam"&&t.t>=us.pause&&(l("execute",{targets:t.ids}),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(!t.struck&&t.t>=t.hitAt){t.struck=!0;const T=Uc[v];u(T.reach,T.radius,T.y,T.damage,T.knock,{swing:1})}t.t>=t.dur&&x()}return{cooldown:r,get busy(){return t!==null},get current(){return t?t.name:null},get phase(){return t&&t.phase||null},onEvent(y){a=y},setArena(y){o=y},drive(){if(!t)return null;if(t.name==="hentak"&&(t.phase==="naik"||t.phase==="turun"))return{keep:!0};if(t.phase==="cincang"){const y=c();return{vx:y.x*Kn.advance,vz:y.z*Kn.advance}}return{vx:0,vz:0,instant:t.name==="penggal"}},update(y,v){for(const T in r)r[T]=Math.max(0,r[T]-y);!t&&n>0&&(n-=y);const w=v.skill||(v.attack?"pukul":null);w&&t?s=w:w&&g(w),t&&M(y)},reset(){t&&(i.swordDown(!1),i.crouch(0)),t=null,s=null,n=0}}}const dA=2.3,pA=.35,io=2,vd=5.6,mA=26,gA=8,xA=21,_A=7.2,vA=.12,yA=.15,MA=1.3,bA=.35,yd=1.3,SA=30,Vr=100,Md={delay:6,rate:5},Fc={hand:[-.265,0,.068],blade:[-.45,0,.9],grip:.05};async function AA(i,t,e){var n;try{const s=(await t(e)).scene,r=new G().fromArray(Fc.blade).normalize();s.quaternion.setFromUnitVectors(new G(0,-1,0),r),s.position.fromArray(Fc.hand).addScaledVector(r,Fc.grip),(n=i.getObjectByName("arm-right"))==null||n.add(s),Object.defineProperty(i.userData,"sword",{value:s,enumerable:!1})}catch(s){console.warn("Senjata gagal dimuat:",s)}}async function bd(i,t,e=null){const n=new Cl,s=o=>typeof o=="string"?n.loadAsync(o):n.parseAsync(o,""),r=await s(i),a=r.scene;return a.scale.setScalar(dA),e&&await AA(a,s,e),a.traverse(o=>{if(!o.isMesh)return;const c=o.material;o.material=new jn({map:c.map}),c.dispose(),o.castShadow=t.shadows,o.receiveShadow=t.shadows,o.frustumCulled=!1}),{model:a,clips:r.animations}}function wA(i){const t=new Ce,e=new ee(new ou(.3,.6,4,8),new jn({color:"#3f8f4a"}));e.position.y=.6;const n=new ee(new Po(.26,12,8),new jn({color:"#e0b48a"}));return n.position.y=1.32,t.add(e,n),t.traverse(s=>{s.castShadow=i.shadows}),t}function TA({ground:i,colliders:t,quality:e,asset:n}){const s=new Ce;s.name="pemain";const r=n?n.model:wA(e);s.add(r);const a=n?new mu(r):null,o={},c=["jump","die",...cA];if(a)for(const Z of["idle","walk","sprint","fall",...c]){const rt=vs.findByName(n.clips,Z);if(!rt)continue;const F=a.clipAction(rt);c.includes(Z)&&(F.setLoop(ql,1),F.clampWhenFinished=!0),o[Z]=F}let l=null;function u(Z,rt=.15){const F=o[Z];!F||l===F||(F.reset().play(),l&&F.crossFadeFrom(l,rt,!1),l=F)}u("idle");let h=null;if(!e.shadows){const Z=document.createElement("canvas");Z.width=Z.height=64;const rt=Z.getContext("2d"),F=rt.createRadialGradient(32,32,0,32,32,32);F.addColorStop(0,"rgba(0,0,0,0.5)"),F.addColorStop(1,"rgba(0,0,0,0)"),rt.fillStyle=F,rt.fillRect(0,0,64,64),h=new ee(new vn(1.2,1.2).rotateX(-Math.PI/2),new Ge({map:new fy(Z),transparent:!0,depthWrite:!1})),h.renderOrder=2}const d=s.position,f=new G,g=new G;let x=0,m=0,p=!0,M=0,y=0,v=0,w=0,T=0,L=()=>{},B=!1,E=Vr,A=0,O=!1,j=()=>{},W=()=>{};const $=[];let b=0,S=1/0;function I(){for(;$.length;){const ft=$[0];if(Math.hypot(ft.x-d.x,ft.z-d.z)>($.length>1?.8:.25))break;$.shift(),S=1/0,b=0}if(!$.length)return null;const Z=$[0].x-d.x,rt=$[0].z-d.z,F=Math.hypot(Z,rt);let dt=F;for(let ft=1;ft<$.length;ft++)dt+=Math.hypot($[ft].x-$[ft-1].x,$[ft].z-$[ft-1].z);const bt=Math.min(dt>7?vd:io*1.4,.8+dt*2.2);return{dx:Z/F,dz:rt/F,speed:bt}}const _={x:0,z:0,len:0};function N(Z,rt){return _.x=(i.surfaceAt(Z+.5,rt)-i.surfaceAt(Z-.5,rt))/(2*.5),_.z=(i.surfaceAt(Z,rt+.5)-i.surfaceAt(Z,rt-.5))/(2*.5),_.len=Math.hypot(_.x,_.z),_}function z(Z,rt,F){d.set(Z,i.surfaceAt(Z,rt),rt),f.set(0,0,0),x=F,s.rotation.y=F,p=!0,w=0,d.y>.4&&(g.copy(d),m=F)}const D=r.userData.sword||null,U=D?D.quaternion.clone():null,X=r.getObjectByName("arm-right");let H=!1;const k=new xe,it=new xe,st=new xe().setFromAxisAngle(new G(1,0,0),-.3),ot=new G(0,1,0);function _t(){if(D){if(!H){D.quaternion.copy(U);return}X.getWorldQuaternion(k),it.setFromAxisAngle(ot,x).multiply(st),D.quaternion.copy(k.invert().multiply(it))}}const gt=fA({pos:d,vel:f,get heading(){return x},set heading(Z){x=Z},get grounded(){return p},depthAt:(Z,rt)=>Pe.seaLevel-i.surfaceAt(Z,rt),clipLength:Z=>{var rt;return((rt=o[Z])==null?void 0:rt.getClip().duration)||0},play:u,playClip(Z,rt,F=0){const dt=o[Z];dt&&(dt.timeScale=rt,l===dt?dt.reset().play():u(Z,.06),dt.time=F)},pose(Z,rt){const F=o[Z];F&&(l!==F&&u(Z,.06),F.time=rt,F.paused=!0)},release(){l&&(l.paused=!1)},launch(Z,rt,F){f.set(Z,rt,F),p=!1,M=0,v=0},teleport(Z,rt){d.set(Z,i.surfaceAt(Z,rt),rt),f.set(0,0,0),p=!0},swordDown(Z){H=Z},crouch(Z){r.position.y=-Z},stopWalking(){$.length=0}});function Y(Z,rt,F){let dt=0,bt=0,ft=0,xt=0;const R=gt.drive();if(R)dt=R.vx||0,bt=R.vz||0,xt=1;else if(Math.abs(rt.moveX)+Math.abs(rt.moveY)>.01){$.length=0;const St=-Math.sin(F),Pt=-Math.cos(F),Mt=Math.cos(F),Et=-Math.sin(F);dt=Mt*rt.moveX+St*rt.moveY,bt=Et*rt.moveX+Pt*rt.moveY;const Dt=Math.hypot(dt,bt);ft=Math.min(1,Dt),dt/=Dt,bt/=Dt,xt=ft<.7?io*(ft/.7):io+(vd-io)*(ft-.7)/.3}else{const St=I();St&&({dx:dt,dz:bt,speed:xt}=St,ft=1)}const Q=Pe.seaLevel-i.surfaceAt(d.x,d.z);Q>bA&&!R&&(xt*=.55);const C=(p?mA:gA)*Z,P=dt*xt,J=bt*xt,tt=P-f.x,K=J-f.z,ht=Math.hypot(tt,K);if(R!=null&&R.keep||(ht<=C||R!=null&&R.instant?(f.x=P,f.z=J):(f.x+=tt/ht*C,f.z+=K/ht*C)),ft>.05){let Pt=Math.atan2(dt,bt)-x;Pt=Math.atan2(Math.sin(Pt),Math.cos(Pt)),x+=Pt*Math.min(1,12*Z)}M=p?vA:M-Z,y=rt.jump?yA:y-Z,y>0&&M>0&&Q<yd*.8&&!R&&(f.y=_A,p=!1,M=0,y=0,v=0,u("jump",.08)),f.y-=xA*Z,d.x+=f.x*Z,d.z+=f.z*Z,d.y+=f.y*Z,t.resolve(d,pA,f);const yt=N(d.x,d.z);if(yt.len>MA){const St=yt.x/yt.len,Pt=yt.z/yt.len,Mt=f.x*St+f.z*Pt;Mt>0&&(f.x-=Mt*St,f.z-=Mt*Pt,d.x-=Mt*St*Z,d.z-=Mt*Pt*Z),p&&(f.x-=St*6*Z,f.z-=Pt*6*Z)}const vt=i.surfaceAt(d.x,d.z);d.y<=vt?(d.y=vt,f.y<0&&(f.y=0),p=!0):p&&f.y<=0&&d.y-vt<.6?(d.y=vt,f.y=0):p=!1,p?v=0:v+=Z}return{root:s,blob:h,get position(){return d},get heading(){return x},get speed(){return Math.hypot(f.x,f.z)},get grounded(){return p},get usingModel(){return!!n},get hasPath(){return $.length>0},get attacking(){return gt.busy},get hp(){return E},get defeated(){return O},damage(Z,rt){if(!(O||B)){if(E=Math.max(0,E-Z),A=0,rt){const F=d.x-rt.x,dt=d.z-rt.z,bt=Math.hypot(F,dt)||1;f.x+=F/bt*3.5,f.z+=dt/bt*3.5}j(Z),E<=0&&(O=!0,$.length=0,gt.reset(),u("die",.1),W())}},revive(){E=Vr,A=0,O=!1,B=!1,u("idle",.05)},onHurt(Z){j=Z},onDefeated(Z){W=Z},face(Z,rt){x=Math.atan2(Z-d.x,rt-d.z),s.rotation.y=x},get attackMove(){return gt.current},get attackPhase(){return gt.phase},get cooldowns(){return gt.cooldown},placeAt:z,followPath(Z){$.length=0,$.push(...Z),S=1/0,b=0},stop(){$.length=0},onRespawnNeeded(Z){L=Z},onAttack(Z){gt.onEvent(Z)},setArena(Z){gt.setArena(Z)},respawn(){z(g.x,g.z,m),$.length=0,gt.reset(),B=!1,u("idle",.05)},freeze(){B=!0,f.set(0,0,0)},update(Z,rt,F){if(O){a==null||a.update(Z);return}if(E<Vr&&(A+=Z)>Md.delay&&(E=Math.min(Vr,E+Md.rate*Z)),B||gt.update(Z,rt),!B){const xt=gt.drive(),R=xt&&!xt.keep?Math.hypot(xt.vx,xt.vz):0,Q=Math.max(Math.hypot(f.x,f.z),R),C=Math.min(12,Math.max(Z>1/45?2:1,Math.ceil(Q*Z/.3)));for(let P=0;P<C;P++)Y(Z/C,P===0?rt:{...rt,jump:!1},F)}if(s.rotation.y=x,$.length&&!B&&!gt.busy){const xt=Math.hypot($[0].x-d.x,$[0].z-d.z);xt<S-.25?(S=xt,b=0):(b+=Z)>1.2&&($.shift(),S=1/0,b=0)}const dt=i.surfaceAt(d.x,d.z);w=Pe.seaLevel-dt>yd?w+Z:0,!B&&w>.6?L("laut"):!B&&!MM(d.x,d.z,SA)&&L("jauh"),T+=Z,T>.4&&p&&dt>.4&&N(d.x,d.z).len<.8&&(T=0,g.copy(d),m=x);const ft=Math.hypot(f.x,f.z);if(!gt.busy){let xt=null;p?xt=ft<.3?"idle":ft<3.6?"walk":"sprint":v>.12&&(xt=f.y>0&&l===o.jump?"jump":"fall"),xt&&u(xt,.18)}if(o.walk&&(o.walk.timeScale=vi.clamp(ft/1.4,.6,1.6)),o.sprint&&(o.sprint.timeScale=vi.clamp(ft/3.6,.8,1.6)),a==null||a.update(Z),_t(),h){const xt=d.y-dt;h.position.set(d.x,dt+.05,d.z),h.material.opacity=Math.max(0,1-xt/3),h.scale.setScalar(1+xt*.15)}}}}const ie=i=>document.getElementById(i);function oa(i){ie("loading").hidden=!0,ie("error").hidden=!1,ie("error-teks").textContent=String(i)}window.addEventListener("error",i=>{var t;return oa(((t=i.error)==null?void 0:t.stack)||i.message)});window.addEventListener("unhandledrejection",i=>{var t;return oa(((t=i.reason)==null?void 0:t.stack)||i.reason)});function EA(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function An(i){ie("loading-teks").textContent=i}const Un=()=>new Promise(i=>requestAnimationFrame(()=>setTimeout(i,0))),Sd={rendah:"Rendah",sedang:"Sedang",tinggi:"Tinggi"};let Ad=0;function Ws(i,t=2800){const e=ie("pesan");e.textContent=i,e.hidden=!1,clearTimeout(Ad),Ad=setTimeout(()=>{e.hidden=!0},t)}function RA(i,t){const e=Math.SQRT1_2;for(let n=140;n<280;n+=1){const s=-e*n,r=e*n,a=i.heightAt(s,r);if(a>.9&&a<2.2&&i.slopeAt(s,r)<.3&&t.isFree(s,r,.9))return{x:s,z:r,heading:Math.atan2(-s,-r)}}return{x:-128,z:128,heading:Math.atan2(128,-128)}}const CA="<b>Ketuk tanah</b> untuk berjalan ke sana (jauh = lari)<br>Geser: putar kamera · Cubit: zoom<br><b>Pukul</b> berulang = kombo · 4 tombol <b>jurus</b> · musuh orc ada di depan<br><b>Peta</b>: Kerajaan Kencana di barat (Jembatan Agung) — kamu musuh setiap kerajaan, prajuritnya akan menyerangmu",PA="<b>Klik tanah</b> untuk berjalan ke sana · WASD / panah juga bisa<br>Seret mouse: putar kamera · Roda: zoom · Spasi: lompat<br>F: pukul (kombo) · 1–4: jurus Cincang, Hentak, Putar, Penggal<br>M: peta — Kerajaan Kencana di barat (Jembatan Agung); kamu musuh setiap kerajaan, prajuritnya akan menyerangmu",IA={main:[55,42],lihat:[70,55]};function LA(){const i=ie("btn-kualitas"),t=ie("panel-kualitas");i.textContent=`Kualitas: ${Sd[Ee.level]}`,t.querySelectorAll("button[data-q]").forEach(e=>{e.classList.toggle("aktif",e.dataset.q===Ee.level),e.addEventListener("click",()=>{if(e.dataset.q===Ee.level){t.hidden=!0;return}t.hidden=!0,ie("loading").hidden=!1,An(`Mengganti kualitas ke ${Sd[e.dataset.q]}…`),setTimeout(()=>sM(e.dataset.q),50)})}),i.addEventListener("click",()=>{t.hidden=!t.hidden,ie("saran").hidden=!0}),ie("btn-tutup-kualitas").addEventListener("click",()=>{t.hidden=!0})}async function zA(){if(!EA()){oa(`Browser ini tidak mendukung WebGL 2.
Coba gunakan Chrome versi terbaru di Android.`);return}const i=ie("game"),t=new sy({canvas:i,antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,Ee.maxPixelRatio)),t.outputColorSpace=Oe,t.toneMapping=Td,t.toneMappingExposure=1,Ee.shadows&&(t.shadowMap.enabled=!0,t.shadowMap.type=Ee.softShadows?wd:Bl);const e=new ho,n=new nn(55,1,.5,5e3);An("Menyiapkan tekstur…"),await Un();const s=aM(t),r={noiseTexture:s,quality:Ee};An("Membuat langit dan cahaya…"),await Un();const a=UM(e,r);An("Membentuk pulau-pulau…"),await Un();const o=yf(Ee.terrainSegments),c=AM(o,Ee.water.shoreRes),l=mb(o),u=xb(l,o),h=PM(o,{...r,region:u});e.add(h),An("Menanam pohon dan menebar batu…"),await Un();const d=new lM(8),f=yf(Ee.terrainSegments,{heightFn:Mp,rect:{minX:-500,maxX:500,minZ:-500,maxZ:500}}),g=GM({ground:f,grid:d,quality:Ee,noiseTexture:s,reserved:u.reserved}),x=WM({ground:f,grid:d,quality:Ee,reserved:u.reserved});e.add(g,x),An("Membangun Kerajaan Kencana…"),await Un();const m=nS({ground:o,plan:l,mask:u,grid:d,quality:Ee,noiseTexture:s});e.add(m.object),o.setSurfaces(m.surfaces),h.userData.applyOcclusion([...g.userData.occlusion,...x.userData.occlusion,...m.occlusion]);const p=JM([...g.userData.trunks,...x.userData.colliders.filter(q=>q.radius>=.8),...m.colliders]),M=ib(o,p);An("Menumbuhkan rumput…"),await Un();const y=ZM({ground:o,grid:d,quality:Ee});e.add(y),An("Mengisi lautan…"),await Un();const v=oM(t),w=DM({ground:o,shore:c,env:a,noiseTexture:s,normalTexture:v,quality:Ee});e.add(w),An("Menyiapkan karakter…"),await Un();const T=q=>new URL(`models/${q}`,document.baseURI).href;let L=null;try{L=await bd(T("prajurit.glb"),Ee,T("pedang.glb"))}catch(q){console.warn("Model karakter gagal dimuat:",q)}let B=null;try{B=await bd(T("orc.glb"),Ee)}catch(q){console.warn("Model musuh gagal dimuat:",q)}let E=null;if(L)try{const q=await new Cl().loadAsync(T("bala.glb"));E=mS(q)}catch(q){console.warn("Model kuda & perisai gagal dimuat:",q)}An("Menugaskan prajurit penjaga…"),await Un();let A=null;if(L)try{A=TS({ground:o,colliders:p,nav:M,plan:l,spots:m.spots,quality:Ee,soldier:L,shieldRect:(E==null?void 0:E.shieldRect)??null}),e.add(A.object)}catch(q){console.warn("Prajurit penjaga gagal dibuat:",q)}An("Mengundang penduduk kerajaan…"),await Un();let O=null;try{const q=await new Cl().loadAsync(T("penduduk.glb")),ct=A?m.spots.filter(At=>At.role!=="penjaga"):m.spots;O=cS({ground:o,routes:m.routes,spots:ct,quality:Ee,villagerGltf:q,soldier:A?null:L,scripted:A?2:0}),e.add(O.object)}catch(q){console.warn("Penduduk gagal dimuat:",q)}An("Membariskan 25.000 prajurit…"),await Un();let j=null;if(L&&E)try{j=pS({ground:o,plan:l,quality:Ee,soldier:L,bala:E,renderer:t,env:a}),e.add(j.object)}catch(q){console.warn("Bala tentara gagal dimuat:",q)}const W=TA({ground:o,colliders:p,quality:Ee,asset:L});e.add(W.root),W.blob&&e.add(W.blob);const $=RA(o,p);W.placeAt($.x,$.z,$.heading);const b=B?fb({ground:o,colliders:p,nav:M,asset:B,spawn:$}):null;b&&e.add(b.object);let S=null;const I=q=>A.list[Number(q.slice(1))];W.setArena({pickTargets(q,ct,At,wt){const zt=b?b.pickTargets(q,ct,At,99).map(le=>({...le,id:`o${le.id}`})):[];if(A)for(const le of A.list)A.alive(le)&&Math.hypot(le.x-q,le.z-ct)<=At&&zt.push({id:`s${le.id}`,x:le.x,z:le.z});const Kt=zt.sort((le,yn)=>Math.hypot(le.x-q,le.z-ct)-Math.hypot(yn.x-q,yn.z-ct)).slice(0,wt),fe=[];let Qt=q,je=ct;for(;Kt.length;){let le=0;for(let ln=1;ln<Kt.length;ln++)Math.hypot(Kt[ln].x-Qt,Kt[ln].z-je)<Math.hypot(Kt[le].x-Qt,Kt[le].z-je)&&(le=ln);const[yn]=Kt.splice(le,1);fe.push(yn),Qt=yn.x,je=yn.z}return fe},position(q){if(q[0]==="o")return b?b.position(Number(q.slice(1))):null;const ct=I(q);return A.alive(ct)?{x:ct.x,z:ct.z}:null},standable:(q,ct)=>M.walkableAt(q,ct)&&p.isFree(q,ct,.45)&&o.heightAt(q,ct)>-.9});const _=q=>q.filter(ct=>ct[0]==="o").map(ct=>Number(ct.slice(1)));b&&A&&b.setFoes({near(q,ct,At){const wt=A.nearest(q,ct,At);return wt?{kind:"prajurit",ref:wt}:null},pos:q=>A.alive(q.ref)?q.ref:null,strike(q,ct,At){ct.kind==="prajurit"?(A.damage(ct.ref,At,q.pos),S==null||S.defend(ct.ref,q.id)):W.damage(At,q.pos)}});const N=navigator.maxTouchPoints>0||"ontouchstart"in window,z=ZS(n,o);z.lookFrom($.heading+Math.PI);const D={cincang:ie("btn-cincang"),hentak:ie("btn-hentak"),putar:ie("btn-putar"),penggal:ie("btn-penggal")},U=XS({canvas:i,jumpButton:ie("btn-lompat"),attackButton:ie("btn-pukul"),skillButtons:D,touch:N}),X={moveX:0,moveY:0,jump:!1,attack:!1,skill:null,lookDX:0,zoom:1,taps:[]},H=QS(o);e.add(...H.objects);const k=aA(o);e.add(k.object),W.onAttack(q=>{if(q.type==="gagal"){Ws("Tidak ada musuh dalam jangkauan Penggal (±14 m).",1800);return}if(q.type==="aim"){b==null||b.mark(_(q.targets),!0);return}if(q.type==="execute"){b==null||b.mark(_(q.targets),!1);const ct=b?b.decapitate(_(q.targets),W.position):[],At=[];for(const wt of q.targets){if(wt[0]!=="s")continue;const zt=I(wt);A.alive(zt)&&(ct.push({x:zt.x,y:zt.y,z:zt.z}),A.knockDown(zt,W.position),At.push(zt))}S==null||S.playerStruck(At),k.execute(ct,W.position),ct.length&&z.shake(.22);return}if(q.type==="hit"){const ct={x:q.x,z:q.z,r:q.r},At=b?b.hit(ct,q.damage,q.knock,q.origin):[],wt=A?A.hit(ct,q.damage,q.knock,q.origin):[];S==null||S.playerStruck(wt);for(const zt of wt)At.push({x:zt.x,y:zt.y,z:zt.z});k.attack(q,p.hitAll(q.x,q.z,q.r,5),At),q.plant?z.shake(.4):At.length&&q.spin&&z.shake(.12);return}k.attack(q)});const it={};function st(){for(const[q,ct]of Object.entries(D)){const At=W.cooldowns[q],wt=At>0?Math.ceil(At*10):0;it[q]!==wt&&(it[q]=wt,ct.style.setProperty("--cd",(At/Ol[q]).toFixed(3)),ct.querySelector(".cd").textContent=At>0?Math.ceil(At):"",ct.classList.toggle("siap",At<=0))}}const ot=new r1,_t=new Ct,gt=(q,ct)=>Math.max(o.surfaceAt(q,ct),Pe.seaLevel);function Y(q,ct){const At=i.getBoundingClientRect();_t.set((q-At.left)/At.width*2-1,-((ct-At.top)/At.height)*2+1),ot.setFromCamera(_t,n);const{origin:wt,direction:zt}=ot.ray;let Kt=0,fe=0;for(;fe<1500;){const Qt=wt.y+zt.y*fe-gt(wt.x+zt.x*fe,wt.z+zt.z*fe);if(Qt<=0){let je=Kt,le=fe;for(let yn=0;yn<14;yn++){const ln=(je+le)/2;wt.y+zt.y*ln>gt(wt.x+zt.x*ln,wt.z+zt.z*ln)?je=ln:le=ln}return{x:wt.x+zt.x*le,z:wt.z+zt.z*le}}Kt=fe,fe+=vi.clamp(Qt*.5,.3,25)}return null}function Z(q){if(W.defeated)return;const ct=Y(q.x,q.y);if(!ct)return;const At=M.findPath(W.position,ct);if(At){W.followPath(At);const wt=At[At.length-1];H.showTarget(wt.x,wt.z,!0),Et()}else H.showTarget(ct.x,ct.z,!1),Ws("Tidak ada jalan ke sana.",1600)}const rt=new c1(n,i);rt.target.set(0,8,0),n.position.set(-260,140,330),rt.enabled=!1,rt.enableDamping=!0,rt.dampingFactor=.08,rt.minDistance=12,rt.maxDistance=1500,rt.maxPolarAngle=Math.PI*.47,rt.rotateSpeed=Ee.isMobile?.6:.8,rt.zoomSpeed=.9,rt.screenSpacePanning=!1,rt.touches={ONE:Hi.ROTATE,TWO:Hi.DOLLY_PAN};function F(){const q=Math.max(o.surfaceAt(n.position.x,n.position.z),Pe.seaLevel);n.position.y<q+3&&(n.position.y=q+3),rt.target.x=vi.clamp(rt.target.x,Yt.minX+50,Yt.maxX-50),rt.target.z=vi.clamp(rt.target.z,Yt.minZ+50,Yt.maxZ-50),rt.target.y=Math.max(o.surfaceAt(rt.target.x,rt.target.z),0)+3}let dt="main";const bt=l.spans.find(q=>q.id==="agung"),ft=HS(ie("gelembung"),n),xt=GS(ie("nyawa"),ie("luka")),R=Math.min(bt.a,bt.b)-11,Q={start:{x:Math.max(bt.a,bt.b)+22,z:bt.at+1.2},gate:{x:R+3.2,z:bt.at+.8},market:[{x:-421,z:bt.at+1.2},{x:-461,z:bt.at+2.5},{x:-466,z:51}]};A&&(S=kS({soldiers:A,enemies:b,player:W,bubbles:ft,villagers:O,visit:Q,ground:o,message:Ws}));function C(){const q=window.innerWidth,ct=window.innerHeight;t.setSize(q,ct,!1),n.aspect=q/ct,n.fov=IA[dt][q<ct?0:1],n.updateProjectionMatrix()}window.addEventListener("resize",C),window.addEventListener("orientationchange",()=>setTimeout(C,200)),C();const P=ie("btn-layar-penuh");document.documentElement.requestFullscreen||(P.hidden=!0),P.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{P.textContent=document.fullscreenElement?"Keluar layar penuh":"Layar penuh"}),LA();function J(q){const ct=dt;dt=q;const At=dt==="main";if(rt.enabled=!At,U.setEnabled(At),ie("btn-mode").textContent=At?"Lihat pulau":"Main lagi",At&&ct==="lihat"){const wt=W.position,zt=n.position.x-wt.x,Kt=n.position.z-wt.z;z.lookFrom(Math.atan2(zt,Kt),!1)}else At||(W.stop(),H.hideTarget(),rt.target.copy(W.position),rt.update());C()}ie("btn-mode").addEventListener("click",()=>J(dt==="main"?"lihat":"main"));const tt=FS({ground:o,plan:l,region:u,camps:b?b.camps:[]}),K=BS({ground:o,spans:l.spans});function ht(){tt.open?tt.hide():(ie("panel-kualitas").hidden=!0,Et(),tt.show(W.position,W.heading))}ie("btn-peta").addEventListener("click",ht),ie("btn-tutup-peta").addEventListener("click",()=>tt.hide()),ie("peta").addEventListener("click",q=>{q.target.id==="peta"&&tt.hide()}),window.addEventListener("keydown",q=>{q.code==="KeyM"&&!q.repeat?ht():q.code==="Escape"&&tt.hide()}),J("main");const yt={x:Math.max(bt.a,bt.b)+26,z:bt.at,heading:Math.PI/2};W.onHurt(()=>{xt.hurt(),z.shake(.12)}),W.onDefeated(()=>{const q=S?S.playerDefeated():!1;H.hideTarget(),setTimeout(()=>ie("tirai").classList.add("gelap"),1100),setTimeout(()=>{const ct=q?yt:$;W.placeAt(ct.x,ct.z,ct.heading),W.revive(),z.lookFrom(W.heading+Math.PI),ie("tirai").classList.remove("gelap"),Ws(q?"Kamu dikalahkan prajurit Kencana dan dibawa keluar dari wilayah kerajaan.":"Kamu pingsan dikeroyok orc… dan terbangun di pantai.",4200)},1600)});let vt=!1;W.onRespawnNeeded(q=>{vt||(vt=!0,W.freeze(),ie("tirai").classList.add("gelap"),setTimeout(()=>{W.respawn(),z.lookFrom(W.heading+Math.PI),ie("tirai").classList.remove("gelap"),Ws(q==="laut"?"Airnya terlalu dalam! Kamu kembali ke pantai.":"Terlalu jauh dari pulau. Kamu kembali ke pantai."),vt=!1},450))}),L||Ws("Model karakter gagal dimuat — memakai karakter sederhana.",5e3);const St=ie("petunjuk");St.innerHTML=N?CA:PA;let Pt=0,Mt=!1;function Et(){Mt||(Mt=!0,St.style.opacity=0,setTimeout(()=>{St.hidden=!0},1e3))}i.addEventListener("webglcontextlost",q=>{q.preventDefault(),oa(`Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).
Muat ulang halaman, lalu pilih Kualitas: Rendah.`)}),A&&(z.update(.016,W.position,X),a.update(0,n,W.position),A.warmUp(W.position),t.render(e,n),A.warmUp(null));const Dt=new Xy;let Ht=0,Tt=0,jt=0,Xt=0,Vt=Ee.level==="rendah",et=0;const It={timeScale:1};t.setAnimationLoop(()=>{et++;const q=Math.min(Dt.getDelta(),.1)*It.timeScale,ct=Dt.elapsedTime;if(dt==="main"){const At=U.read();for(const Kt of At.taps)Z(Kt);W.update(q,At,z.yaw),O==null||O.pushOut(W.position),A==null||A.pushOut(W.position),W.hasPath||H.hideTarget(),z.update(q,W.position,At),!Mt&&(W.speed>.5||(Pt+=q)>15)&&Et(),Hn.a.value.copy(n.position),Hn.b.value.copy(W.position).y+=1;const wt=W.position,zt=m.roofs.find(Kt=>Math.abs(wt.x-Kt.x)<Kt.hx&&Math.abs(wt.z-Kt.z)<Kt.hz);Hn.r.value+=((zt?zt.r:3.5)-Hn.r.value)*(1-Math.exp(-6*q))}else W.update(q,X,z.yaw),rt.update(),F(),Hn.r.value=0;H.update(q),b==null||b.update(q,n,W,dt==="main"?W.position:rt.target),K.update(q,W.position,dt==="main")&&Et(),O==null||O.update(q,n,dt==="main"?W.position:rt.target,W.position,dt==="main"?110:260),j==null||j.update(q,n,dt==="main"?W.position:rt.target),S==null||S.update(q),A==null||A.update(q,{camera:n,focus:dt==="main"?W.position:rt.target,range:dt==="main"?110:260,player:W.position,playerVisible:!W.defeated,targetPos:S.targetPos}),ft.update(q),xt.set(W.hp,Vr),k.update(q,n),st(),a.update(ct,n,dt==="main"?W.position:rt.target),_u.value=ct,g.userData.update(ct),m.update(ct),y.userData.update(n,ct),t.render(e,n),Ht++,Tt+=q,Tt>=.5&&(ie("fps").textContent=`${Math.round(Ht/Tt)} FPS · kualitas ${Ee.level}`,Ht=0,Tt=0),!Vt&&ct>3&&(jt+=q,Xt++,jt>6&&(Vt=!0,Xt/jt<24&&(Et(),ie("saran").hidden=!1,setTimeout(()=>{ie("saran").hidden=!0},9e3))))}),ie("loading").hidden=!0,ie("hud").hidden=!1,window.__pulau={renderer:t,scene:e,camera:n,controls:rt,ground:o,shore:c,quality:Ee,trees:g,rocks:x,grass:y,water:w,env:a,kencana:m,region:u,plan:l,villagers:O,army:j,worldMap:tt,banner:K,player:W,cam:z,input:U,colliders:p,nav:M,markers:H,effects:k,enemies:b,soldiers:A,security:S,bubbles:ft,pickGround:Y,setMode:J,getMode:()=>dt,frames:()=>et,debug:It}}zA().catch(oa);
