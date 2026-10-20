(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ol="170",tr={ROTATE:0,DOLLY:1,PAN:2},Wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Fp=0,Iu=1,Bp=2,Fl=1,Sd=2,xi=3,Ai=0,cn=1,on=2,Yi=0,er=1,Lu=2,zu=3,Du=4,Hp=5,ps=100,Gp=101,Vp=102,Wp=103,Xp=104,jp=200,Yp=201,Kp=202,qp=203,Bc=204,Hc=205,Zp=206,$p=207,Jp=208,Qp=209,tm=210,em=211,nm=212,im=213,sm=214,Gc=0,Vc=1,Wc=2,or=3,Xc=4,jc=5,Yc=6,Kc=7,Bl=0,rm=1,am=2,Ki=0,om=1,cm=2,lm=3,Ad=4,um=5,hm=6,fm=7,ku="attached",dm="detached",wd=300,cr=301,lr=302,qc=303,Zc=304,Ao=306,$i=1e3,ei=1001,mo=1002,$e=1003,Td=1004,Fr=1005,We=1006,ao=1007,yn=1008,zn=1009,Ed=1010,Rd=1011,Qr=1012,Hl=1013,vs=1014,Pn=1015,xr=1016,Gl=1017,Vl=1018,ur=1020,Cd=35902,Pd=1021,Id=1022,Ze=1023,Ld=1024,zd=1025,nr=1026,hr=1027,Wl=1028,Xl=1029,Dd=1030,jl=1031,Yl=1033,oo=33776,co=33777,lo=33778,uo=33779,$c=35840,Jc=35841,Qc=35842,tl=35843,el=36196,nl=37492,il=37496,sl=37808,rl=37809,al=37810,ol=37811,cl=37812,ll=37813,ul=37814,hl=37815,fl=37816,dl=37817,pl=37818,ml=37819,gl=37820,xl=37821,ho=36492,_l=36494,vl=36495,kd=36283,yl=36284,Ml=36285,bl=36286,Kl=2200,pm=2201,mm=2202,ta=2300,ea=2301,No=2302,Ys=2400,Ks=2401,go=2402,ql=2500,gm=2501,xm=0,Nd=1,Sl=2,_m=3200,wo=3201,Zl=0,vm=1,Vi="",Be="srgb",ln="srgb-linear",To="linear",ye="srgb",Ts=7680,Nu=519,ym=512,Mm=513,bm=514,Ud=515,Sm=516,Am=517,wm=518,Tm=519,Al=35044,In=35048,Uu="300 es",yi=2e3,xo=2001;class Qi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ou=1234567;const jr=Math.PI/180,fr=180/Math.PI;function Xn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function ke(i,t,e){return Math.max(t,Math.min(e,i))}function $l(i,t){return(i%t+t)%t}function Em(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Rm(i,t,e){return i!==t?(e-i)/(t-i):0}function Yr(i,t,e){return(1-e)*i+e*t}function Cm(i,t,e,n){return Yr(i,t,1-Math.exp(-e*n))}function Pm(i,t=1){return t-Math.abs($l(i,t*2)-t)}function Im(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Lm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function zm(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Dm(i,t){return i+Math.random()*(t-i)}function km(i){return i*(.5-Math.random())}function Nm(i){i!==void 0&&(Ou=i);let t=Ou+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Um(i){return i*jr}function Om(i){return i*fr}function Fm(i){return(i&i-1)===0&&i!==0}function Bm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gm(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const bi={DEG2RAD:jr,RAD2DEG:fr,generateUUID:Xn,clamp:ke,euclideanModulo:$l,mapLinear:Em,inverseLerp:Rm,lerp:Yr,damp:Cm,pingpong:Pm,smoothstep:Im,smootherstep:Lm,randInt:zm,randFloat:Dm,randFloatSpread:km,seededRandom:Nm,degToRad:Um,radToDeg:Om,isPowerOfTwo:Fm,ceilPowerOfTwo:Bm,floorPowerOfTwo:Hm,setQuaternionFromProperEuler:Gm,normalize:xe,denormalize:Gn};class Ct{constructor(t=0,e=0){Ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,s,r,a,o,c,l){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],M=s[1],v=s[4],_=s[7],S=s[2],T=s[5],L=s[8];return r[0]=a*x+o*M+c*S,r[3]=a*m+o*v+c*T,r[6]=a*p+o*_+c*L,r[1]=l*x+u*M+h*S,r[4]=l*m+u*v+h*T,r[7]=l*p+u*_+h*L,r[2]=d*x+f*M+g*S,r[5]=d*m+f*v+g*T,r[8]=d*p+f*_+g*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=e*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=h*x,t[1]=(s*l-u*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Uo.makeScale(t,e)),this}rotate(t){return this.premultiply(Uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new $t;function Od(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function na(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vm(){const i=na("canvas");return i.style.display="block",i}const Fu={};function Br(i){i in Fu||(Fu[i]=!0,console.warn(i))}function Wm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Xm(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function jm(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const oe={enabled:!0,workingColorSpace:ln,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ye&&(i.r=Si(i.r),i.g=Si(i.g),i.b=Si(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ye&&(i.r=ir(i.r),i.g=ir(i.g),i.b=ir(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Vi?To:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ir(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Bu=[.64,.33,.3,.6,.15,.06],Hu=[.2126,.7152,.0722],Gu=[.3127,.329],Vu=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wu=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);oe.define({[ln]:{primaries:Bu,whitePoint:Gu,transfer:To,toXYZ:Vu,fromXYZ:Wu,luminanceCoefficients:Hu,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:Bu,whitePoint:Gu,transfer:ye,toXYZ:Vu,fromXYZ:Wu,luminanceCoefficients:Hu,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}});let Es;class Ym{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Es===void 0&&(Es=na("canvas")),Es.width=t.width,Es.height=t.height;const n=Es.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Es}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=na("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Si(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Si(e[n]/255)*255):e[n]=Si(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Km=0;class Fd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Xn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Oo(s[a].image)):r.push(Oo(s[a]))}else r=Oo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Oo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ym.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qm=0;class je extends Qi{constructor(t=je.DEFAULT_IMAGE,e=je.DEFAULT_MAPPING,n=ei,s=ei,r=We,a=yn,o=Ze,c=zn,l=je.DEFAULT_ANISOTROPY,u=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=Xn(),this.name="",this.source=new Fd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $i:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $i:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=wd;je.DEFAULT_ANISOTROPY=1;class ae{constructor(t=0,e=0,n=0,s=1){ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,_=(f+1)/2,S=(p+1)/2,T=(u+d)/4,L=(h+x)/4,G=(g+m)/4;return v>_&&v>S?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=L/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=G/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=L/r,s=G/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-x)/M,this.z=(d-u)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zm extends Qi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new je(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wi extends Zm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Bd extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $m extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _e{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(h!==x||c!==d||l!==f||u!==g){let m=1-o;const p=c*d+l*f+u*g+h*x,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const S=Math.sqrt(v),T=Math.atan2(S,p*M);m=Math.sin(m*T)/S,o=Math.sin(o*T)/S}const _=o*M;if(c=c*m+d*_,l=l*m+f*_,u=u*m+g*_,h=h*m+x*_,m===1-o){const S=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=S,l*=S,u*=S,h*=S}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+u*h+c*f-l*d,t[e+1]=c*g+u*d+l*h-o*f,t[e+2]=l*g+u*f+o*d-c*h,t[e+3]=u*g-o*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ke(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,n=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fo.copy(this).projectOnVector(t),this.sub(Fo)}reflect(t){return this.sub(Fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fo=new V,Xu=new _e;class Ti{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,kn):kn.fromBufferAttribute(r,a),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ma.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ma.copy(n.boundingBox)),ma.applyMatrix4(t.matrixWorld),this.union(ma)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Er),ga.subVectors(this.max,Er),Rs.subVectors(t.a,Er),Cs.subVectors(t.b,Er),Ps.subVectors(t.c,Er),Ci.subVectors(Cs,Rs),Pi.subVectors(Ps,Cs),ts.subVectors(Rs,Ps);let e=[0,-Ci.z,Ci.y,0,-Pi.z,Pi.y,0,-ts.z,ts.y,Ci.z,0,-Ci.x,Pi.z,0,-Pi.x,ts.z,0,-ts.x,-Ci.y,Ci.x,0,-Pi.y,Pi.x,0,-ts.y,ts.x,0];return!Bo(e,Rs,Cs,Ps,ga)||(e=[1,0,0,0,1,0,0,0,1],!Bo(e,Rs,Cs,Ps,ga))?!1:(xa.crossVectors(Ci,Pi),e=[xa.x,xa.y,xa.z],Bo(e,Rs,Cs,Ps,ga))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ci=[new V,new V,new V,new V,new V,new V,new V,new V],kn=new V,ma=new Ti,Rs=new V,Cs=new V,Ps=new V,Ci=new V,Pi=new V,ts=new V,Er=new V,ga=new V,xa=new V,es=new V;function Bo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){es.fromArray(i,r);const o=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),c=t.dot(es),l=e.dot(es),u=n.dot(es);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Jm=new Ti,Rr=new V,Ho=new V;class hn{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Jm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rr.subVectors(t,this.center);const e=Rr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ho.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rr.copy(t.center).add(Ho)),this.expandByPoint(Rr.copy(t.center).sub(Ho))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new V,Go=new V,_a=new V,Ii=new V,Vo=new V,va=new V,Wo=new V;class _r{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Go.copy(t).add(e).multiplyScalar(.5),_a.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(Go);const r=t.distanceTo(e)*.5,a=-this.direction.dot(_a),o=Ii.dot(this.direction),c=-Ii.dot(_a),l=Ii.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Go).addScaledVector(_a,d),f}intersectSphere(t,e){li.subVectors(t.center,this.origin);const n=li.dot(this.direction),s=li.dot(li)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,n,s,r){Vo.subVectors(e,t),va.subVectors(n,t),Wo.crossVectors(Vo,va);let a=this.direction.dot(Wo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,t);const c=o*this.direction.dot(va.crossVectors(Ii,va));if(c<0)return null;const l=o*this.direction.dot(Vo.cross(Ii));if(l<0||c+l>a)return null;const u=-o*Ii.dot(Wo);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ot{constructor(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m){Ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m)}set(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Is.setFromMatrixColumn(t,0).length(),r=1/Is.setFromMatrixColumn(t,1).length(),a=1/Is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,f=a*h,g=o*u,x=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=d-x*l,e[9]=-o*c,e[2]=x-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,g=l*u,x=l*h;e[0]=d+x*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=x+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,g=l*u,x=l*h;e[0]=d-x*o,e[4]=-a*h,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=x-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,f=a*h,g=o*u,x=o*h;e[0]=c*u,e[4]=g*l-f,e[8]=d*l+x,e[1]=c*h,e[5]=x*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*u,e[4]=x-d*h,e[8]=g*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*h+g,e[10]=d-x*h}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+x,e[5]=a*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=o*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qm,t,t0)}lookAt(t,e,n){const s=this.elements;return xn.subVectors(t,e),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Li.crossVectors(n,xn),Li.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Li.crossVectors(n,xn)),Li.normalize(),ya.crossVectors(xn,Li),s[0]=Li.x,s[4]=ya.x,s[8]=xn.x,s[1]=Li.y,s[5]=ya.y,s[9]=xn.y,s[2]=Li.z,s[6]=ya.z,s[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],v=n[7],_=n[11],S=n[15],T=s[0],L=s[4],G=s[8],E=s[12],A=s[1],U=s[5],Y=s[9],X=s[13],J=s[2],b=s[6],z=s[10],N=s[14],y=s[3],B=s[7],O=s[11],k=s[15];return r[0]=a*T+o*A+c*J+l*y,r[4]=a*L+o*U+c*b+l*B,r[8]=a*G+o*Y+c*z+l*O,r[12]=a*E+o*X+c*N+l*k,r[1]=u*T+h*A+d*J+f*y,r[5]=u*L+h*U+d*b+f*B,r[9]=u*G+h*Y+d*z+f*O,r[13]=u*E+h*X+d*N+f*k,r[2]=g*T+x*A+m*J+p*y,r[6]=g*L+x*U+m*b+p*B,r[10]=g*G+x*Y+m*z+p*O,r[14]=g*E+x*X+m*N+p*k,r[3]=M*T+v*A+_*J+S*y,r[7]=M*L+v*U+_*b+S*B,r[11]=M*G+v*Y+_*z+S*O,r[15]=M*E+v*X+_*N+S*k,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+x*(+e*c*f-e*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+m*(+e*l*h-e*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-e*c*h+e*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=h*m*l-x*d*l+x*c*f-o*m*f-h*c*p+o*d*p,v=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,_=u*x*l-g*h*l+g*o*f-a*x*f-u*o*p+a*h*p,S=g*h*c-u*x*c-g*o*d+a*x*d+u*o*m-a*h*m,T=e*M+n*v+s*_+r*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/T;return t[0]=M*L,t[1]=(x*d*r-h*m*r-x*s*f+n*m*f+h*s*p-n*d*p)*L,t[2]=(o*m*r-x*c*r+x*s*l-n*m*l-o*s*p+n*c*p)*L,t[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*L,t[4]=v*L,t[5]=(u*m*r-g*d*r+g*s*f-e*m*f-u*s*p+e*d*p)*L,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*p-e*c*p)*L,t[7]=(a*d*r-u*c*r+u*s*l-e*d*l-a*s*f+e*c*f)*L,t[8]=_*L,t[9]=(g*h*r-u*x*r-g*n*f+e*x*f+u*n*p-e*h*p)*L,t[10]=(a*x*r-g*o*r+g*n*l-e*x*l-a*n*p+e*o*p)*L,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*f-e*o*f)*L,t[12]=S*L,t[13]=(u*x*s-g*h*s+g*n*d-e*x*d-u*n*m+e*h*m)*L,t[14]=(g*o*s-a*x*s-g*n*c+e*x*c+a*n*m-e*o*m)*L,t[15]=(a*h*s-u*o*s+u*n*c-e*h*c-a*n*d+e*o*d)*L,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,x=a*u,m=a*h,p=o*h,M=c*l,v=c*u,_=c*h,S=n.x,T=n.y,L=n.z;return s[0]=(1-(x+p))*S,s[1]=(f+_)*S,s[2]=(g-v)*S,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(d+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+v)*L,s[9]=(m-M)*L,s[10]=(1-(d+x))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Is.set(s[0],s[1],s[2]).length();const a=Is.set(s[4],s[5],s[6]).length(),o=Is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Nn.copy(this);const l=1/r,u=1/a,h=1/o;return Nn.elements[0]*=l,Nn.elements[1]*=l,Nn.elements[2]*=l,Nn.elements[4]*=u,Nn.elements[5]*=u,Nn.elements[6]*=u,Nn.elements[8]*=h,Nn.elements[9]*=h,Nn.elements[10]*=h,e.setFromRotationMatrix(Nn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=yi){const c=this.elements,l=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(o===yi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===xo)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=yi){const c=this.elements,l=1/(e-t),u=1/(n-s),h=1/(a-r),d=(e+t)*l,f=(n+s)*u;let g,x;if(o===yi)g=(a+r)*h,x=-2*h;else if(o===xo)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Is=new V,Nn=new Ot,Qm=new V(0,0,0),t0=new V(1,1,1),Li=new V,ya=new V,xn=new V,ju=new Ot,Yu=new _e;class un{constructor(t=0,e=0,n=0,s=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ju.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ju,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yu.setFromEuler(this),this.setFromQuaternion(Yu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class Jl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let e0=0;const Ku=new V,Ls=new _e,ui=new Ot,Ma=new V,Cr=new V,n0=new V,i0=new _e,qu=new V(1,0,0),Zu=new V(0,1,0),$u=new V(0,0,1),Ju={type:"added"},s0={type:"removed"},zs={type:"childadded",child:null},Xo={type:"childremoved",child:null};class Le extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new V,e=new un,n=new _e,s=new V(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new $t}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ls.setFromAxisAngle(t,e),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(t,e){return Ls.setFromAxisAngle(t,e),this.quaternion.premultiply(Ls),this}rotateX(t){return this.rotateOnAxis(qu,t)}rotateY(t){return this.rotateOnAxis(Zu,t)}rotateZ(t){return this.rotateOnAxis($u,t)}translateOnAxis(t,e){return Ku.copy(t).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qu,t)}translateY(t){return this.translateOnAxis(Zu,t)}translateZ(t){return this.translateOnAxis($u,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ma.copy(t):Ma.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Cr,Ma,this.up):ui.lookAt(Ma,Cr,this.up),this.quaternion.setFromRotationMatrix(ui),s&&(ui.extractRotation(s.matrixWorld),Ls.setFromRotationMatrix(ui),this.quaternion.premultiply(Ls.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ju),zs.child=t,this.dispatchEvent(zs),zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(s0),Xo.child=t,this.dispatchEvent(Xo),Xo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ju),zs.child=t,this.dispatchEvent(zs),zs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,t,n0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,i0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Le.DEFAULT_UP=new V(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Un=new V,hi=new V,jo=new V,fi=new V,Ds=new V,ks=new V,Qu=new V,Yo=new V,Ko=new V,qo=new V,Zo=new ae,$o=new ae,Jo=new ae;class Vn{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Un.subVectors(t,e),s.cross(Un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Un.subVectors(s,e),hi.subVectors(n,e),jo.subVectors(t,e);const a=Un.dot(Un),o=Un.dot(hi),c=Un.dot(jo),l=hi.dot(hi),u=hi.dot(jo),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(a,fi.y),c.addScaledVector(o,fi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Zo.setScalar(0),$o.setScalar(0),Jo.setScalar(0),Zo.fromBufferAttribute(t,e),$o.fromBufferAttribute(t,n),Jo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Zo,r.x),a.addScaledVector($o,r.y),a.addScaledVector(Jo,r.z),a}static isFrontFacing(t,e,n,s){return Un.subVectors(n,e),hi.subVectors(t,e),Un.cross(hi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Un.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Un.cross(hi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Vn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ds.subVectors(s,n),ks.subVectors(r,n),Yo.subVectors(t,n);const c=Ds.dot(Yo),l=ks.dot(Yo);if(c<=0&&l<=0)return e.copy(n);Ko.subVectors(t,s);const u=Ds.dot(Ko),h=ks.dot(Ko);if(u>=0&&h<=u)return e.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Ds,a);qo.subVectors(t,r);const f=Ds.dot(qo),g=ks.dot(qo);if(g>=0&&f<=g)return e.copy(r);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(ks,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return Qu.subVectors(r,s),o=(h-u)/(h-u+(f-g)),e.copy(s).addScaledVector(Qu,o);const p=1/(m+x+d);return a=x*p,o=d*p,e.copy(n).addScaledVector(Ds,a).addScaledVector(ks,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},ba={h:0,s:0,l:0};function Qo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ut{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=$l(t,1),e=ke(e,0,1),n=ke(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Qo(a,r,t+1/3),this.g=Qo(a,r,t),this.b=Qo(a,r,t-1/3)}return oe.toWorkingColorSpace(this,s),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=Hd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}copyLinearToSRGB(t){return this.r=ir(t.r),this.g=ir(t.g),this.b=ir(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return oe.fromWorkingColorSpace(Qe.copy(this),t),Math.round(ke(Qe.r*255,0,255))*65536+Math.round(ke(Qe.g*255,0,255))*256+Math.round(ke(Qe.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(Qe.copy(this),e);const n=Qe.r,s=Qe.g,r=Qe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=Be){oe.fromWorkingColorSpace(Qe.copy(this),t);const e=Qe.r,n=Qe.g,s=Qe.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL(ba);const n=Yr(zi.h,ba.h,e),s=Yr(zi.s,ba.s,e),r=Yr(zi.l,ba.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qe=new Ut;Ut.NAMES=Hd;let r0=0;class jn extends Qi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=Xn(),this.name="",this.blending=er,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bc,this.blendDst=Hc,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(n.blending=this.blending),this.side!==Ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bc&&(n.blendSrc=this.blendSrc),this.blendDst!==Hc&&(n.blendDst=this.blendDst),this.blendEquation!==ps&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==or&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xe extends jn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=Bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Sa=a0();function a0(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;!(l&8388608);)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function o0(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=ke(i,-65504,65504),Sa.floatView[0]=i;const t=Sa.uint32View[0],e=t>>23&511;return Sa.baseTable[e]+((t&8388607)>>Sa.shiftTable[e])}const c0={toHalfFloat:o0},Oe=new V,Aa=new Ct;class be{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Al,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Aa.fromBufferAttribute(this,e),Aa.applyMatrix3(t),this.setXY(e,Aa.x,Aa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Al&&(t.usage=this.usage),t}}class Gd extends be{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Vd extends be{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Xt extends be{constructor(t,e,n){super(new Float32Array(t),e,n)}}let l0=0;const An=new Ot,tc=new Le,Ns=new V,_n=new Ti,Pr=new Ti,qe=new V;class fe extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Od(t)?Vd:Gd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return An.makeRotationFromQuaternion(t),this.applyMatrix4(An),this}rotateX(t){return An.makeRotationX(t),this.applyMatrix4(An),this}rotateY(t){return An.makeRotationY(t),this.applyMatrix4(An),this}rotateZ(t){return An.makeRotationZ(t),this.applyMatrix4(An),this}translate(t,e,n){return An.makeTranslation(t,e,n),this.applyMatrix4(An),this}scale(t,e,n){return An.makeScale(t,e,n),this.applyMatrix4(An),this}lookAt(t){return tc.lookAt(t),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ti);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Pr.setFromBufferAttribute(o),this.morphTargetsRelative?(qe.addVectors(_n.min,Pr.min),_n.expandByPoint(qe),qe.addVectors(_n.max,Pr.max),_n.expandByPoint(qe)):(_n.expandByPoint(Pr.min),_n.expandByPoint(Pr.max))}_n.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)qe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(qe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)qe.fromBufferAttribute(o,l),c&&(Ns.fromBufferAttribute(t,l),qe.add(Ns)),s=Math.max(s,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new be(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let G=0;G<n.count;G++)o[G]=new V,c[G]=new V;const l=new V,u=new V,h=new V,d=new Ct,f=new Ct,g=new Ct,x=new V,m=new V;function p(G,E,A){l.fromBufferAttribute(n,G),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,A),d.fromBufferAttribute(r,G),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,A),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const U=1/(f.x*g.y-g.x*f.y);isFinite(U)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(U),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(U),o[G].add(x),o[E].add(x),o[A].add(x),c[G].add(m),c[E].add(m),c[A].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let G=0,E=M.length;G<E;++G){const A=M[G],U=A.start,Y=A.count;for(let X=U,J=U+Y;X<J;X+=3)p(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const v=new V,_=new V,S=new V,T=new V;function L(G){S.fromBufferAttribute(s,G),T.copy(S);const E=o[G];v.copy(E),v.sub(S.multiplyScalar(S.dot(E))).normalize(),_.crossVectors(T,E);const U=_.dot(c[G])<0?-1:1;a.setXYZW(G,v.x,v.y,v.z,U)}for(let G=0,E=M.length;G<E;++G){const A=M[G],U=A.start,Y=A.count;for(let X=U,J=U+Y;X<J;X+=3)L(t.getX(X+0)),L(t.getX(X+1)),L(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new V,r=new V,a=new V,o=new V,c=new V,l=new V,u=new V,h=new V;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new be(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const th=new Ot,ns=new _r,wa=new hn,eh=new V,Ta=new V,Ea=new V,Ra=new V,ec=new V,Ca=new V,nh=new V,Pa=new V;class ie extends Le{constructor(t=new fe,e=new Xe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ca.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(ec.fromBufferAttribute(h,t),a?Ca.addScaledVector(ec,u):Ca.addScaledVector(ec.sub(e),u))}e.add(Ca)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(r),ns.copy(t.ray).recast(t.near),!(wa.containsPoint(ns.origin)===!1&&(ns.intersectSphere(wa,eh)===null||ns.origin.distanceToSquared(eh)>(t.far-t.near)**2))&&(th.copy(r).invert(),ns.copy(t.ray).applyMatrix4(th),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ns)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,S=v;_<S;_+=3){const T=o.getX(_),L=o.getX(_+1),G=o.getX(_+2);s=Ia(this,p,t,n,l,u,h,T,L,G),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const M=o.getX(m),v=o.getX(m+1),_=o.getX(m+2);s=Ia(this,a,t,n,l,u,h,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,S=v;_<S;_+=3){const T=_,L=_+1,G=_+2;s=Ia(this,p,t,n,l,u,h,T,L,G),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const M=m,v=m+1,_=m+2;s=Ia(this,a,t,n,l,u,h,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function u0(i,t,e,n,s,r,a,o){let c;if(t.side===cn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Ai,o),c===null)return null;Pa.copy(o),Pa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Pa);return l<e.near||l>e.far?null:{distance:l,point:Pa.clone(),object:i}}function Ia(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Ta),i.getVertexPosition(c,Ea),i.getVertexPosition(l,Ra);const u=u0(i,t,e,n,Ta,Ea,Ra,nh);if(u){const h=new V;Vn.getBarycoord(nh,Ta,Ea,Ra,h),s&&(u.uv=Vn.getInterpolatedAttribute(s,o,c,l,h,new Ct)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,o,c,l,h,new Ct)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,c,l,h,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new V,materialIndex:0};Vn.getNormal(Ta,Ea,Ra,d.normal),u.face=d,u.barycoord=h}return u}class Yn extends fe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Xt(l,3)),this.setAttribute("normal",new Xt(u,3)),this.setAttribute("uv",new Xt(h,2));function g(x,m,p,M,v,_,S,T,L,G,E){const A=_/L,U=S/G,Y=_/2,X=S/2,J=T/2,b=L+1,z=G+1;let N=0,y=0;const B=new V;for(let O=0;O<z;O++){const k=O*U-X;for(let R=0;R<b;R++){const H=R*A-Y;B[x]=H*M,B[m]=k*v,B[p]=J,l.push(B.x,B.y,B.z),B[x]=0,B[m]=0,B[p]=T>0?1:-1,u.push(B.x,B.y,B.z),h.push(R/L),h.push(1-O/G),N+=1}}for(let O=0;O<G;O++)for(let k=0;k<L;k++){const R=d+k+b*O,H=d+k+b*(O+1),I=d+(k+1)+b*(O+1),C=d+(k+1)+b*O;c.push(R,H,C),c.push(H,I,C),y+=6}o.addGroup(f,y,E),f+=y,d+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function dr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function rn(i){const t={};for(let e=0;e<i.length;e++){const n=dr(i[e]);for(const s in n)t[s]=n[s]}return t}function h0(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const f0={clone:dr,merge:rn};var d0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kn extends jn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=d0,this.fragmentShader=p0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=dr(t.uniforms),this.uniformsGroups=h0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xd extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=yi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Di=new V,ih=new Ct,sh=new Ct;class an extends Xd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Di.x,Di.y).multiplyScalar(-t/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-t/Di.z)}getViewSize(t,e){return this.getViewBounds(t,ih,sh),e.subVectors(sh,ih)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(jr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Us=-90,Os=1;class m0 extends Le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new an(Us,Os,t,e);s.layers=this.layers,this.add(s);const r=new an(Us,Os,t,e);r.layers=this.layers,this.add(r);const a=new an(Us,Os,t,e);a.layers=this.layers,this.add(a);const o=new an(Us,Os,t,e);o.layers=this.layers,this.add(o);const c=new an(Us,Os,t,e);c.layers=this.layers,this.add(c);const l=new an(Us,Os,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===yi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===xo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class jd extends je{constructor(t,e,n,s,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:cr,super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class g0 extends wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new jd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:We}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Yn(5,5,5),r=new Kn({name:"CubemapFromEquirect",uniforms:dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:Yi});r.uniforms.tEquirect.value=e;const a=new ie(s,r),o=e.minFilter;return e.minFilter===yn&&(e.minFilter=We),new m0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const nc=new V,x0=new V,_0=new $t;class Gi{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=nc.subVectors(n,e).cross(x0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(nc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||_0.getNormalMatrix(t),s=this.coplanarPoint(nc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const is=new hn,La=new V;class vr{constructor(t=new Gi,e=new Gi,n=new Gi,s=new Gi,r=new Gi,a=new Gi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=yi){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],M=s[13],v=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+a,d+u,m+g,_+M).normalize(),n[3].setComponents(c-a,d-u,m-g,_-M).normalize(),n[4].setComponents(c-o,d-h,m-x,_-v).normalize(),e===yi)n[5].setComponents(c+o,d+h,m+x,_+v).normalize();else if(e===xo)n[5].setComponents(o,h,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(t){return is.center.set(0,0,0),is.radius=.7071067811865476,is.applyMatrix4(t.matrixWorld),this.intersectsSphere(is)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(La.x=s.normal.x>0?t.max.x:t.min.x,La.y=s.normal.y>0?t.max.y:t.min.y,La.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(La)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function v0(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class bn extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=t/o,d=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const M=p*d-a;for(let v=0;v<l;v++){const _=v*h-r;g.push(_,-M,0),x.push(0,0,1),m.push(v/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const v=M+l*p,_=M+l*(p+1),S=M+1+l*(p+1),T=M+1+l*p;f.push(v,_,T),f.push(_,S,T)}this.setIndex(f),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(x,3)),this.setAttribute("uv",new Xt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bn(t.width,t.height,t.widthSegments,t.heightSegments)}}var y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M0=`#ifdef USE_ALPHAHASH
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
#endif`,b0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,S0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,w0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,T0=`#ifdef USE_AOMAP
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
#endif`,E0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,R0=`#ifdef USE_BATCHING
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
#endif`,C0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,P0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,I0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,L0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,z0=`#ifdef USE_IRIDESCENCE
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
#endif`,D0=`#ifdef USE_BUMPMAP
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
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,H0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,V0=`#define PI 3.141592653589793
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
} // validated`,W0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,X0=`vec3 transformedNormal = objectNormal;
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
#endif`,j0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z0="gl_FragColor = linearToOutputTexel( gl_FragColor );",$0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,J0=`#ifdef USE_ENVMAP
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
#endif`,Q0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tg=`#ifdef USE_ENVMAP
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
#endif`,eg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ng=`#ifdef USE_ENVMAP
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
#endif`,ig=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ag=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,og=`#ifdef USE_GRADIENTMAP
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
}`,cg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hg=`uniform bool receiveShadow;
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
#endif`,fg=`#ifdef USE_ENVMAP
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
#endif`,dg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xg=`PhysicalMaterial material;
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
#endif`,_g=`struct PhysicalMaterial {
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
}`,vg=`
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
#endif`,yg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ag=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cg=`#if defined( USE_POINTS_UV )
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
#endif`,Pg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kg=`#ifdef USE_MORPHTARGETS
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
#endif`,Ng=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ug=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Og=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gg=`#ifdef USE_NORMALMAP
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
#endif`,Vg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$g=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ex=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ix=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sx=`float getShadowMask() {
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
}`,rx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ax=`#ifdef USE_SKINNING
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
#endif`,ox=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cx=`#ifdef USE_SKINNING
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
#endif`,lx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ux=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dx=`#ifdef USE_TRANSMISSION
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
#endif`,px=`#ifdef USE_TRANSMISSION
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
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_x=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yx=`uniform sampler2D t2D;
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
}`,Mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wx=`#include <common>
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
}`,Tx=`#if DEPTH_PACKING == 3200
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
}`,Ex=`#define DISTANCE
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
}`,Rx=`#define DISTANCE
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
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Px=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ix=`uniform float scale;
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
}`,Lx=`uniform vec3 diffuse;
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
}`,zx=`#include <common>
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
}`,Dx=`uniform vec3 diffuse;
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
}`,kx=`#define LAMBERT
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
}`,Nx=`#define LAMBERT
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
}`,Ux=`#define MATCAP
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
}`,Ox=`#define MATCAP
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
}`,Fx=`#define NORMAL
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
}`,Bx=`#define NORMAL
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
}`,Hx=`#define PHONG
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
}`,Gx=`#define PHONG
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
}`,Vx=`#define STANDARD
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
}`,Wx=`#define STANDARD
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
}`,Xx=`#define TOON
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
}`,jx=`#define TOON
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
}`,Yx=`uniform float size;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,qx=`#include <common>
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
}`,Zx=`uniform vec3 color;
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
}`,$x=`uniform float rotation;
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
}`,Jx=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:y0,alphahash_pars_fragment:M0,alphamap_fragment:b0,alphamap_pars_fragment:S0,alphatest_fragment:A0,alphatest_pars_fragment:w0,aomap_fragment:T0,aomap_pars_fragment:E0,batching_pars_vertex:R0,batching_vertex:C0,begin_vertex:P0,beginnormal_vertex:I0,bsdfs:L0,iridescence_fragment:z0,bumpmap_pars_fragment:D0,clipping_planes_fragment:k0,clipping_planes_pars_fragment:N0,clipping_planes_pars_vertex:U0,clipping_planes_vertex:O0,color_fragment:F0,color_pars_fragment:B0,color_pars_vertex:H0,color_vertex:G0,common:V0,cube_uv_reflection_fragment:W0,defaultnormal_vertex:X0,displacementmap_pars_vertex:j0,displacementmap_vertex:Y0,emissivemap_fragment:K0,emissivemap_pars_fragment:q0,colorspace_fragment:Z0,colorspace_pars_fragment:$0,envmap_fragment:J0,envmap_common_pars_fragment:Q0,envmap_pars_fragment:tg,envmap_pars_vertex:eg,envmap_physical_pars_fragment:fg,envmap_vertex:ng,fog_vertex:ig,fog_pars_vertex:sg,fog_fragment:rg,fog_pars_fragment:ag,gradientmap_pars_fragment:og,lightmap_pars_fragment:cg,lights_lambert_fragment:lg,lights_lambert_pars_fragment:ug,lights_pars_begin:hg,lights_toon_fragment:dg,lights_toon_pars_fragment:pg,lights_phong_fragment:mg,lights_phong_pars_fragment:gg,lights_physical_fragment:xg,lights_physical_pars_fragment:_g,lights_fragment_begin:vg,lights_fragment_maps:yg,lights_fragment_end:Mg,logdepthbuf_fragment:bg,logdepthbuf_pars_fragment:Sg,logdepthbuf_pars_vertex:Ag,logdepthbuf_vertex:wg,map_fragment:Tg,map_pars_fragment:Eg,map_particle_fragment:Rg,map_particle_pars_fragment:Cg,metalnessmap_fragment:Pg,metalnessmap_pars_fragment:Ig,morphinstance_vertex:Lg,morphcolor_vertex:zg,morphnormal_vertex:Dg,morphtarget_pars_vertex:kg,morphtarget_vertex:Ng,normal_fragment_begin:Ug,normal_fragment_maps:Og,normal_pars_fragment:Fg,normal_pars_vertex:Bg,normal_vertex:Hg,normalmap_pars_fragment:Gg,clearcoat_normal_fragment_begin:Vg,clearcoat_normal_fragment_maps:Wg,clearcoat_pars_fragment:Xg,iridescence_pars_fragment:jg,opaque_fragment:Yg,packing:Kg,premultiplied_alpha_fragment:qg,project_vertex:Zg,dithering_fragment:$g,dithering_pars_fragment:Jg,roughnessmap_fragment:Qg,roughnessmap_pars_fragment:tx,shadowmap_pars_fragment:ex,shadowmap_pars_vertex:nx,shadowmap_vertex:ix,shadowmask_pars_fragment:sx,skinbase_vertex:rx,skinning_pars_vertex:ax,skinning_vertex:ox,skinnormal_vertex:cx,specularmap_fragment:lx,specularmap_pars_fragment:ux,tonemapping_fragment:hx,tonemapping_pars_fragment:fx,transmission_fragment:dx,transmission_pars_fragment:px,uv_pars_fragment:mx,uv_pars_vertex:gx,uv_vertex:xx,worldpos_vertex:_x,background_vert:vx,background_frag:yx,backgroundCube_vert:Mx,backgroundCube_frag:bx,cube_vert:Sx,cube_frag:Ax,depth_vert:wx,depth_frag:Tx,distanceRGBA_vert:Ex,distanceRGBA_frag:Rx,equirect_vert:Cx,equirect_frag:Px,linedashed_vert:Ix,linedashed_frag:Lx,meshbasic_vert:zx,meshbasic_frag:Dx,meshlambert_vert:kx,meshlambert_frag:Nx,meshmatcap_vert:Ux,meshmatcap_frag:Ox,meshnormal_vert:Fx,meshnormal_frag:Bx,meshphong_vert:Hx,meshphong_frag:Gx,meshphysical_vert:Vx,meshphysical_frag:Wx,meshtoon_vert:Xx,meshtoon_frag:jx,points_vert:Yx,points_frag:Kx,shadow_vert:qx,shadow_frag:Zx,sprite_vert:$x,sprite_frag:Jx},zt={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},ti={basic:{uniforms:rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:rn([zt.common,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.roughnessmap,zt.metalnessmap,zt.fog,zt.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:rn([zt.common,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.gradientmap,zt.fog,zt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:rn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:rn([zt.points,zt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:rn([zt.common,zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:rn([zt.common,zt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:rn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:rn([zt.sprite,zt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:rn([zt.common,zt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:rn([zt.lights,zt.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};ti.physical={uniforms:rn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const za={r:0,b:0,g:0},ss=new un,Qx=new Ot;function t_(i,t,e,n,s,r,a){const o=new Ut(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function x(M){let v=!1;const _=g(M);_===null?p(o,c):_&&_.isColor&&(p(_,1),v=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){const _=g(v);_&&(_.isCubeTexture||_.mapping===Ao)?(u===void 0&&(u=new ie(new Yn(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:dr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ss.copy(v.backgroundRotation),ss.x*=-1,ss.y*=-1,ss.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Qx.makeRotationFromEuler(ss)),u.material.toneMapped=oe.getTransfer(_.colorSpace)!==ye,(h!==_||d!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ie(new bn(2,2),new Kn({name:"BackgroundMaterial",uniforms:dr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=oe.getTransfer(_.colorSpace)!==ye,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(za,Wd(i)),n.buffers.color.setClear(za.r,za.g,za.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(o,c)},render:x,addToRenderList:m}}function e_(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(A,U,Y,X,J){let b=!1;const z=h(X,Y,U);r!==z&&(r=z,l(r.object)),b=f(A,X,Y,J),b&&g(A,X,Y,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,_(A,U,Y,X),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function u(A){return i.deleteVertexArray(A)}function h(A,U,Y){const X=Y.wireframe===!0;let J=n[A.id];J===void 0&&(J={},n[A.id]=J);let b=J[U.id];b===void 0&&(b={},J[U.id]=b);let z=b[X];return z===void 0&&(z=d(c()),b[X]=z),z}function d(A){const U=[],Y=[],X=[];for(let J=0;J<e;J++)U[J]=0,Y[J]=0,X[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:Y,attributeDivisors:X,object:A,attributes:{},index:null}}function f(A,U,Y,X){const J=r.attributes,b=U.attributes;let z=0;const N=Y.getAttributes();for(const y in N)if(N[y].location>=0){const O=J[y];let k=b[y];if(k===void 0&&(y==="instanceMatrix"&&A.instanceMatrix&&(k=A.instanceMatrix),y==="instanceColor"&&A.instanceColor&&(k=A.instanceColor)),O===void 0||O.attribute!==k||k&&O.data!==k.data)return!0;z++}return r.attributesNum!==z||r.index!==X}function g(A,U,Y,X){const J={},b=U.attributes;let z=0;const N=Y.getAttributes();for(const y in N)if(N[y].location>=0){let O=b[y];O===void 0&&(y==="instanceMatrix"&&A.instanceMatrix&&(O=A.instanceMatrix),y==="instanceColor"&&A.instanceColor&&(O=A.instanceColor));const k={};k.attribute=O,O&&O.data&&(k.data=O.data),J[y]=k,z++}r.attributes=J,r.attributesNum=z,r.index=X}function x(){const A=r.newAttributes;for(let U=0,Y=A.length;U<Y;U++)A[U]=0}function m(A){p(A,0)}function p(A,U){const Y=r.newAttributes,X=r.enabledAttributes,J=r.attributeDivisors;Y[A]=1,X[A]===0&&(i.enableVertexAttribArray(A),X[A]=1),J[A]!==U&&(i.vertexAttribDivisor(A,U),J[A]=U)}function M(){const A=r.newAttributes,U=r.enabledAttributes;for(let Y=0,X=U.length;Y<X;Y++)U[Y]!==A[Y]&&(i.disableVertexAttribArray(Y),U[Y]=0)}function v(A,U,Y,X,J,b,z){z===!0?i.vertexAttribIPointer(A,U,Y,J,b):i.vertexAttribPointer(A,U,Y,X,J,b)}function _(A,U,Y,X){x();const J=X.attributes,b=Y.getAttributes(),z=U.defaultAttributeValues;for(const N in b){const y=b[N];if(y.location>=0){let B=J[N];if(B===void 0&&(N==="instanceMatrix"&&A.instanceMatrix&&(B=A.instanceMatrix),N==="instanceColor"&&A.instanceColor&&(B=A.instanceColor)),B!==void 0){const O=B.normalized,k=B.itemSize,R=t.get(B);if(R===void 0)continue;const H=R.buffer,I=R.type,C=R.bytesPerElement,Z=I===i.INT||I===i.UNSIGNED_INT||B.gpuType===Hl;if(B.isInterleavedBufferAttribute){const Q=B.data,et=Q.stride,gt=B.offset;if(Q.isInstancedInterleavedBuffer){for(let xt=0;xt<y.locationSize;xt++)p(y.location+xt,Q.meshPerAttribute);A.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let xt=0;xt<y.locationSize;xt++)m(y.location+xt);i.bindBuffer(i.ARRAY_BUFFER,H);for(let xt=0;xt<y.locationSize;xt++)v(y.location+xt,k/y.locationSize,I,O,et*C,(gt+k/y.locationSize*xt)*C,Z)}else{if(B.isInstancedBufferAttribute){for(let Q=0;Q<y.locationSize;Q++)p(y.location+Q,B.meshPerAttribute);A.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let Q=0;Q<y.locationSize;Q++)m(y.location+Q);i.bindBuffer(i.ARRAY_BUFFER,H);for(let Q=0;Q<y.locationSize;Q++)v(y.location+Q,k/y.locationSize,I,O,k*C,k/y.locationSize*Q*C,Z)}}else if(z!==void 0){const O=z[N];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(y.location,O);break;case 3:i.vertexAttrib3fv(y.location,O);break;case 4:i.vertexAttrib4fv(y.location,O);break;default:i.vertexAttrib1fv(y.location,O)}}}}M()}function S(){G();for(const A in n){const U=n[A];for(const Y in U){const X=U[Y];for(const J in X)u(X[J].object),delete X[J];delete U[Y]}delete n[A]}}function T(A){if(n[A.id]===void 0)return;const U=n[A.id];for(const Y in U){const X=U[Y];for(const J in X)u(X[J].object),delete X[J];delete U[Y]}delete n[A.id]}function L(A){for(const U in n){const Y=n[U];if(Y[A.id]===void 0)continue;const X=Y[A.id];for(const J in X)u(X[J].object),delete X[J];delete Y[A.id]}}function G(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:G,resetDefaultState:E,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function n_(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];e.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function i_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Ze&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const G=L===xr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==zn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Pn&&!G)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:S,maxSamples:T}}function s_(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Gi,o=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const M=r?0:n,v=M*4;let _=p.clippingState||null;c.value=_,_=u(g,d,v,f);for(let S=0;S!==v;++S)_[S]=e[S];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,_=f;v!==x;++v,_+=4)a.copy(h[v]).applyMatrix4(M,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function r_(i){let t=new WeakMap;function e(a,o){return o===qc?a.mapping=cr:o===Zc&&(a.mapping=lr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===qc||o===Zc)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new g0(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Eo extends Xd{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qs=4,rh=[.125,.215,.35,.446,.526,.582],ms=20,ic=new Eo,ah=new Ut;let sc=null,rc=0,ac=0,oc=!1;const ds=(1+Math.sqrt(5))/2,Fs=1/ds,oh=[new V(-ds,Fs,0),new V(ds,Fs,0),new V(-Fs,0,ds),new V(Fs,0,ds),new V(0,ds,-Fs),new V(0,ds,Fs),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class ch{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sc,rc,ac),this._renderer.xr.enabled=oc,t.scissorTest=!1,Da(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cr||t.mapping===lr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:We,minFilter:We,generateMipmaps:!1,type:xr,format:Ze,colorSpace:ln,depthBuffer:!1},s=lh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=a_(r)),this._blurMaterial=o_(r,t,e)}return s}_compileMaterial(t){const e=new ie(this._lodPlanes[0],t);this._renderer.compile(e,ic)}_sceneToCubeUV(t,e,n,s){const o=new an(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(ah),u.toneMapping=Ki,u.autoClear=!1;const f=new Xe({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new ie(new Yn,f);let x=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(ah),x=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):M===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const v=this._cubeSize;Da(s,M*v,p>2?v:0,v,v),u.setRenderTarget(s),x&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===cr||t.mapping===lr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ie(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Da(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ic)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=oh[(s-r-1)%oh.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ie(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ms-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):ms;m>ms&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ms}`);const p=[];let M=0;for(let L=0;L<ms;++L){const G=L/x,E=Math.exp(-G*G/2);p.push(E),L===0?M+=E:L<m&&(M+=2*E)}for(let L=0;L<p.length;L++)p[L]=p[L]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const _=this._sizeLods[s],S=3*_*(s>v-qs?s-v+qs:0),T=4*(this._cubeSize-_);Da(e,S,T,3*_,2*_),c.setRenderTarget(e),c.render(h,ic)}}function a_(i){const t=[],e=[],n=[];let s=i;const r=i-qs+1+rh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-qs?c=rh[a-i+qs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*f),v=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){const L=T%3*2/3-1,G=T>2?0:-1,E=[L,G,0,L+2/3,G,0,L+2/3,G+1,0,L,G,0,L+2/3,G+1,0,L,G+1,0];M.set(E,x*g*T),v.set(d,m*g*T);const A=[T,T,T,T,T,T];_.set(A,p*g*T)}const S=new fe;S.setAttribute("position",new be(M,x)),S.setAttribute("uv",new be(v,m)),S.setAttribute("faceIndex",new be(_,p)),t.push(S),s>qs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function lh(i,t,e){const n=new wi(i,t,e);return n.texture.mapping=Ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Da(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function o_(i,t,e){const n=new Float32Array(ms),s=new V(0,1,0);return new Kn({name:"SphericalGaussianBlur",defines:{n:ms,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ql(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function uh(){return new Kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ql(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function hh(){return new Kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Ql(){return`

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
	`}function c_(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===qc||c===Zc,u=c===cr||c===lr;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new ch(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new ch(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function l_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Br("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function u_(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],i.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let x=0;if(f!==null){const M=f.array;x=f.version;for(let v=0,_=M.length;v<_;v+=3){const S=M[v+0],T=M[v+1],L=M[v+2];d.push(S,T,T,L,L,S)}}else if(g!==void 0){const M=g.array;x=g.version;for(let v=0,_=M.length/3-1;v<_;v+=3){const S=v+0,T=v+1,L=v+2;d.push(S,T,T,L,L,S)}}else return;const m=new(Od(d)?Vd:Gd)(d,1);m.version=x;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function h_(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function h(d,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function f_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function d_(i,t,e){const n=new WeakMap,s=new ae;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let A=function(){G.dispose(),n.delete(o),o.removeEventListener("dispose",A)};var f=A;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let S=o.attributes.position.count*_,T=1;S>t.maxTextureSize&&(T=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const L=new Float32Array(S*T*4*h),G=new Bd(L,S,T,h);G.type=Pn,G.needsUpdate=!0;const E=_*4;for(let U=0;U<h;U++){const Y=p[U],X=M[U],J=v[U],b=S*T*4*U;for(let z=0;z<Y.count;z++){const N=z*E;g===!0&&(s.fromBufferAttribute(Y,z),L[b+N+0]=s.x,L[b+N+1]=s.y,L[b+N+2]=s.z,L[b+N+3]=0),x===!0&&(s.fromBufferAttribute(X,z),L[b+N+4]=s.x,L[b+N+5]=s.y,L[b+N+6]=s.z,L[b+N+7]=0),m===!0&&(s.fromBufferAttribute(J,z),L[b+N+8]=s.x,L[b+N+9]=s.y,L[b+N+10]=s.z,L[b+N+11]=J.itemSize===4?s.w:1)}}d={count:h,texture:G,size:new Ct(S,T)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function p_(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Kd extends je{constructor(t,e,n,s,r,a,o,c,l,u=nr){if(u!==nr&&u!==hr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===nr&&(n=vs),n===void 0&&u===hr&&(n=ur),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:$e,this.minFilter=c!==void 0?c:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const qd=new je,fh=new Kd(1,1),Zd=new Bd,$d=new $m,Jd=new jd,dh=[],ph=[],mh=new Float32Array(16),gh=new Float32Array(9),xh=new Float32Array(4);function yr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dh[s];if(r===void 0&&(r=new Float32Array(s),dh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ke(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ro(i,t){let e=ph[t];e===void 0&&(e=new Int32Array(t),ph[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function m_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function g_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2fv(this.addr,t),Ke(e,t)}}function x_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ye(e,t))return;i.uniform3fv(this.addr,t),Ke(e,t)}}function __(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4fv(this.addr,t),Ke(e,t)}}function v_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ke(e,t)}else{if(Ye(e,n))return;xh.set(n),i.uniformMatrix2fv(this.addr,!1,xh),Ke(e,n)}}function y_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ke(e,t)}else{if(Ye(e,n))return;gh.set(n),i.uniformMatrix3fv(this.addr,!1,gh),Ke(e,n)}}function M_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ke(e,t)}else{if(Ye(e,n))return;mh.set(n),i.uniformMatrix4fv(this.addr,!1,mh),Ke(e,n)}}function b_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function S_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2iv(this.addr,t),Ke(e,t)}}function A_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;i.uniform3iv(this.addr,t),Ke(e,t)}}function w_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4iv(this.addr,t),Ke(e,t)}}function T_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function E_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2uiv(this.addr,t),Ke(e,t)}}function R_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;i.uniform3uiv(this.addr,t),Ke(e,t)}}function C_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4uiv(this.addr,t),Ke(e,t)}}function P_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(fh.compareFunction=Ud,r=fh):r=qd,e.setTexture2D(t||r,s)}function I_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$d,s)}function L_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Jd,s)}function z_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zd,s)}function D_(i){switch(i){case 5126:return m_;case 35664:return g_;case 35665:return x_;case 35666:return __;case 35674:return v_;case 35675:return y_;case 35676:return M_;case 5124:case 35670:return b_;case 35667:case 35671:return S_;case 35668:case 35672:return A_;case 35669:case 35673:return w_;case 5125:return T_;case 36294:return E_;case 36295:return R_;case 36296:return C_;case 35678:case 36198:case 36298:case 36306:case 35682:return P_;case 35679:case 36299:case 36307:return I_;case 35680:case 36300:case 36308:case 36293:return L_;case 36289:case 36303:case 36311:case 36292:return z_}}function k_(i,t){i.uniform1fv(this.addr,t)}function N_(i,t){const e=yr(t,this.size,2);i.uniform2fv(this.addr,e)}function U_(i,t){const e=yr(t,this.size,3);i.uniform3fv(this.addr,e)}function O_(i,t){const e=yr(t,this.size,4);i.uniform4fv(this.addr,e)}function F_(i,t){const e=yr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function B_(i,t){const e=yr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function H_(i,t){const e=yr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function G_(i,t){i.uniform1iv(this.addr,t)}function V_(i,t){i.uniform2iv(this.addr,t)}function W_(i,t){i.uniform3iv(this.addr,t)}function X_(i,t){i.uniform4iv(this.addr,t)}function j_(i,t){i.uniform1uiv(this.addr,t)}function Y_(i,t){i.uniform2uiv(this.addr,t)}function K_(i,t){i.uniform3uiv(this.addr,t)}function q_(i,t){i.uniform4uiv(this.addr,t)}function Z_(i,t,e){const n=this.cache,s=t.length,r=Ro(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||qd,r[a])}function $_(i,t,e){const n=this.cache,s=t.length,r=Ro(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||$d,r[a])}function J_(i,t,e){const n=this.cache,s=t.length,r=Ro(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Jd,r[a])}function Q_(i,t,e){const n=this.cache,s=t.length,r=Ro(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),Ke(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zd,r[a])}function tv(i){switch(i){case 5126:return k_;case 35664:return N_;case 35665:return U_;case 35666:return O_;case 35674:return F_;case 35675:return B_;case 35676:return H_;case 5124:case 35670:return G_;case 35667:case 35671:return V_;case 35668:case 35672:return W_;case 35669:case 35673:return X_;case 5125:return j_;case 36294:return Y_;case 36295:return K_;case 36296:return q_;case 35678:case 36198:case 36298:case 36306:case 35682:return Z_;case 35679:case 36299:case 36307:return $_;case 35680:case 36300:case 36308:case 36293:return J_;case 36289:case 36303:case 36311:case 36292:return Q_}}class ev{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=D_(e.type)}}class nv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=tv(e.type)}}class iv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const cc=/(\w+)(\])?(\[|\.)?/g;function _h(i,t){i.seq.push(t),i.map[t.id]=t}function sv(i,t,e){const n=i.name,s=n.length;for(cc.lastIndex=0;;){const r=cc.exec(n),a=cc.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){_h(e,l===void 0?new ev(o,i,t):new nv(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new iv(o),_h(e,h)),e=h}}}class fo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);sv(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function vh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const rv=37297;let av=0;function ov(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const yh=new $t;function cv(i){oe._getMatrix(yh,oe.workingColorSpace,i);const t=`mat3( ${yh.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case To:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Mh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ov(i.getShaderSource(t),a)}else return s}function lv(i,t){const e=cv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function uv(i,t){let e;switch(t){case om:e="Linear";break;case cm:e="Reinhard";break;case lm:e="Cineon";break;case Ad:e="ACESFilmic";break;case hm:e="AgX";break;case fm:e="Neutral";break;case um:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ka=new V;function hv(){oe.getLuminanceCoefficients(ka);const i=ka.x.toFixed(4),t=ka.y.toFixed(4),e=ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function dv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function pv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Hr(i){return i!==""}function bh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const mv=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(i){return i.replace(mv,xv)}const gv=new Map;function xv(i,t){let e=te[t];if(e===void 0){const n=gv.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wl(e)}const _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ah(i){return i.replace(_v,vv)}function vv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function yv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Fl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Sd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xi&&(t="SHADOWMAP_TYPE_VSM"),t}function Mv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cr:case lr:t="ENVMAP_TYPE_CUBE";break;case Ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case lr:t="ENVMAP_MODE_REFRACTION";break}return t}function Sv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Bl:t="ENVMAP_BLENDING_MULTIPLY";break;case rm:t="ENVMAP_BLENDING_MIX";break;case am:t="ENVMAP_BLENDING_ADD";break}return t}function Av(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function wv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=yv(e),l=Mv(e),u=bv(e),h=Sv(e),d=Av(e),f=fv(e),g=dv(r),x=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hr).join(`
`),p.length>0&&(p+=`
`)):(m=[wh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),p=[wh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ki?"#define TONE_MAPPING":"",e.toneMapping!==Ki?te.tonemapping_pars_fragment:"",e.toneMapping!==Ki?uv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,lv("linearToOutputTexel",e.outputColorSpace),hv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hr).join(`
`)),a=wl(a),a=bh(a,e),a=Sh(a,e),o=wl(o),o=bh(o,e),o=Sh(o,e),a=Ah(a),o=Ah(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=M+m+a,_=M+p+o,S=vh(s,s.VERTEX_SHADER,v),T=vh(s,s.FRAGMENT_SHADER,_);s.attachShader(x,S),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function L(U){if(i.debug.checkShaderErrors){const Y=s.getProgramInfoLog(x).trim(),X=s.getShaderInfoLog(S).trim(),J=s.getShaderInfoLog(T).trim();let b=!0,z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(b=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,S,T);else{const N=Mh(s,S,"vertex"),y=Mh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Y+`
`+N+`
`+y)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||J==="")&&(z=!1);z&&(U.diagnostics={runnable:b,programLog:Y,vertexShader:{log:X,prefix:m},fragmentShader:{log:J,prefix:p}})}s.deleteShader(S),s.deleteShader(T),G=new fo(s,x),E=pv(s,x)}let G;this.getUniforms=function(){return G===void 0&&L(this),G};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,rv)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=av++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=T,this}let Tv=0;class Ev{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Rv(t),e.set(t,n)),n}}class Rv{constructor(t){this.id=Tv++,this.code=t,this.usedTimes=0}}function Cv(i,t,e,n,s,r,a){const o=new Jl,c=new Ev,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,A,U,Y,X){const J=Y.fog,b=X.geometry,z=E.isMeshStandardMaterial?Y.environment:null,N=(E.isMeshStandardMaterial?e:t).get(E.envMap||z),y=N&&N.mapping===Ao?N.image.height:null,B=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const O=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,k=O!==void 0?O.length:0;let R=0;b.morphAttributes.position!==void 0&&(R=1),b.morphAttributes.normal!==void 0&&(R=2),b.morphAttributes.color!==void 0&&(R=3);let H,I,C,Z;if(B){const Yt=ti[B];H=Yt.vertexShader,I=Yt.fragmentShader}else H=E.vertexShader,I=E.fragmentShader,c.update(E),C=c.getVertexShaderID(E),Z=c.getFragmentShaderID(E);const Q=i.getRenderTarget(),et=i.state.buffers.depth.getReversed(),gt=X.isInstancedMesh===!0,xt=X.isBatchedMesh===!0,K=!!E.map,$=!!E.matcap,rt=!!N,F=!!E.aoMap,dt=!!E.lightMap,At=!!E.bumpMap,ft=!!E.normalMap,w=!!E.displacementMap,st=!!E.emissiveMap,ut=!!E.metalnessMap,D=!!E.roughnessMap,P=E.anisotropy>0,q=E.clearcoat>0,j=E.dispersion>0,ht=E.iridescence>0,lt=E.sheen>0,Mt=E.transmission>0,yt=P&&!!E.anisotropyMap,wt=q&&!!E.clearcoatMap,kt=q&&!!E.clearcoatNormalMap,St=q&&!!E.clearcoatRoughnessMap,Et=ht&&!!E.iridescenceMap,Nt=ht&&!!E.iridescenceThicknessMap,It=lt&&!!E.sheenColorMap,Lt=lt&&!!E.sheenRoughnessMap,qt=!!E.specularMap,jt=!!E.specularColorMap,Wt=!!E.specularIntensityMap,tt=Mt&&!!E.transmissionMap,Pt=Mt&&!!E.thicknessMap,vt=!!E.gradientMap,bt=!!E.alphaMap,nt=E.alphaTest>0,_t=!!E.alphaHash,Tt=!!E.extensions;let Ft=Ki;E.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ft=i.toneMapping);const Qt={shaderID:B,shaderType:E.type,shaderName:E.name,vertexShader:H,fragmentShader:I,defines:E.defines,customVertexShaderID:C,customFragmentShaderID:Z,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:xt,batchingColor:xt&&X._colorsTexture!==null,instancing:gt,instancingColor:gt&&X.instanceColor!==null,instancingMorph:gt&&X.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ln,alphaToCoverage:!!E.alphaToCoverage,map:K,matcap:$,envMap:rt,envMapMode:rt&&N.mapping,envMapCubeUVHeight:y,aoMap:F,lightMap:dt,bumpMap:At,normalMap:ft,displacementMap:d&&w,emissiveMap:st,normalMapObjectSpace:ft&&E.normalMapType===vm,normalMapTangentSpace:ft&&E.normalMapType===Zl,metalnessMap:ut,roughnessMap:D,anisotropy:P,anisotropyMap:yt,clearcoat:q,clearcoatMap:wt,clearcoatNormalMap:kt,clearcoatRoughnessMap:St,dispersion:j,iridescence:ht,iridescenceMap:Et,iridescenceThicknessMap:Nt,sheen:lt,sheenColorMap:It,sheenRoughnessMap:Lt,specularMap:qt,specularColorMap:jt,specularIntensityMap:Wt,transmission:Mt,transmissionMap:tt,thicknessMap:Pt,gradientMap:vt,opaque:E.transparent===!1&&E.blending===er&&E.alphaToCoverage===!1,alphaMap:bt,alphaTest:nt,alphaHash:_t,combine:E.combine,mapUv:K&&x(E.map.channel),aoMapUv:F&&x(E.aoMap.channel),lightMapUv:dt&&x(E.lightMap.channel),bumpMapUv:At&&x(E.bumpMap.channel),normalMapUv:ft&&x(E.normalMap.channel),displacementMapUv:w&&x(E.displacementMap.channel),emissiveMapUv:st&&x(E.emissiveMap.channel),metalnessMapUv:ut&&x(E.metalnessMap.channel),roughnessMapUv:D&&x(E.roughnessMap.channel),anisotropyMapUv:yt&&x(E.anisotropyMap.channel),clearcoatMapUv:wt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:kt&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:It&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&x(E.sheenRoughnessMap.channel),specularMapUv:qt&&x(E.specularMap.channel),specularColorMapUv:jt&&x(E.specularColorMap.channel),specularIntensityMapUv:Wt&&x(E.specularIntensityMap.channel),transmissionMapUv:tt&&x(E.transmissionMap.channel),thicknessMapUv:Pt&&x(E.thicknessMap.channel),alphaMapUv:bt&&x(E.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(ft||P),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!b.attributes.uv&&(K||bt),fog:!!J,useFog:E.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:et,skinning:X.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:R,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ft,decodeVideoTexture:K&&E.map.isVideoTexture===!0&&oe.getTransfer(E.map.colorSpace)===ye,decodeVideoTextureEmissive:st&&E.emissiveMap.isVideoTexture===!0&&oe.getTransfer(E.emissiveMap.colorSpace)===ye,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===on,flipSided:E.side===cn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Tt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Tt&&E.extensions.multiDraw===!0||xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Qt.vertexUv1s=l.has(1),Qt.vertexUv2s=l.has(2),Qt.vertexUv3s=l.has(3),l.clear(),Qt}function p(E){const A=[];if(E.shaderID?A.push(E.shaderID):(A.push(E.customVertexShaderID),A.push(E.customFragmentShaderID)),E.defines!==void 0)for(const U in E.defines)A.push(U),A.push(E.defines[U]);return E.isRawShaderMaterial===!1&&(M(A,E),v(A,E),A.push(i.outputColorSpace)),A.push(E.customProgramCacheKey),A.join()}function M(E,A){E.push(A.precision),E.push(A.outputColorSpace),E.push(A.envMapMode),E.push(A.envMapCubeUVHeight),E.push(A.mapUv),E.push(A.alphaMapUv),E.push(A.lightMapUv),E.push(A.aoMapUv),E.push(A.bumpMapUv),E.push(A.normalMapUv),E.push(A.displacementMapUv),E.push(A.emissiveMapUv),E.push(A.metalnessMapUv),E.push(A.roughnessMapUv),E.push(A.anisotropyMapUv),E.push(A.clearcoatMapUv),E.push(A.clearcoatNormalMapUv),E.push(A.clearcoatRoughnessMapUv),E.push(A.iridescenceMapUv),E.push(A.iridescenceThicknessMapUv),E.push(A.sheenColorMapUv),E.push(A.sheenRoughnessMapUv),E.push(A.specularMapUv),E.push(A.specularColorMapUv),E.push(A.specularIntensityMapUv),E.push(A.transmissionMapUv),E.push(A.thicknessMapUv),E.push(A.combine),E.push(A.fogExp2),E.push(A.sizeAttenuation),E.push(A.morphTargetsCount),E.push(A.morphAttributeCount),E.push(A.numDirLights),E.push(A.numPointLights),E.push(A.numSpotLights),E.push(A.numSpotLightMaps),E.push(A.numHemiLights),E.push(A.numRectAreaLights),E.push(A.numDirLightShadows),E.push(A.numPointLightShadows),E.push(A.numSpotLightShadows),E.push(A.numSpotLightShadowsWithMaps),E.push(A.numLightProbes),E.push(A.shadowMapType),E.push(A.toneMapping),E.push(A.numClippingPlanes),E.push(A.numClipIntersection),E.push(A.depthPacking)}function v(E,A){o.disableAll(),A.supportsVertexTextures&&o.enable(0),A.instancing&&o.enable(1),A.instancingColor&&o.enable(2),A.instancingMorph&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),A.dispersion&&o.enable(20),A.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reverseDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),E.push(o.mask)}function _(E){const A=g[E.type];let U;if(A){const Y=ti[A];U=f0.clone(Y.uniforms)}else U=E.uniforms;return U}function S(E,A){let U;for(let Y=0,X=u.length;Y<X;Y++){const J=u[Y];if(J.cacheKey===A){U=J,++U.usedTimes;break}}return U===void 0&&(U=new wv(i,A,E,r),u.push(U)),U}function T(E){if(--E.usedTimes===0){const A=u.indexOf(E);u[A]=u[u.length-1],u.pop(),E.destroy()}}function L(E){c.remove(E)}function G(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:S,releaseProgram:T,releaseShaderCache:L,programs:u,dispose:G}}function Pv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Iv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Th(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Eh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),t++,p}function o(h,d,f,g,x,m){const p=a(h,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(h,d,f,g,x,m){const p=a(h,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||Iv),n.length>1&&n.sort(d||Th),s.length>1&&s.sort(d||Th)}function u(){for(let h=t,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function Lv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Eh,i.set(n,[a])):s>=r.length?(a=new Eh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function zv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new Ut};break;case"SpotLight":e={position:new V,direction:new V,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new V,halfWidth:new V,halfHeight:new V};break}return i[t.id]=e,e}}}function Dv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let kv=0;function Nv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Uv(i){const t=new zv,e=Dv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const s=new V,r=new Ot,a=new Ot;function o(l){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,M=0,v=0,_=0,S=0,T=0,L=0;l.sort(Nv);for(let E=0,A=l.length;E<A;E++){const U=l[E],Y=U.color,X=U.intensity,J=U.distance,b=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=Y.r*X,h+=Y.g*X,d+=Y.b*X;else if(U.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(U.sh.coefficients[z],X);L++}else if(U.isDirectionalLight){const z=t.get(U);if(z.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const N=U.shadow,y=e.get(U);y.shadowIntensity=N.intensity,y.shadowBias=N.bias,y.shadowNormalBias=N.normalBias,y.shadowRadius=N.radius,y.shadowMapSize=N.mapSize,n.directionalShadow[f]=y,n.directionalShadowMap[f]=b,n.directionalShadowMatrix[f]=U.shadow.matrix,M++}n.directional[f]=z,f++}else if(U.isSpotLight){const z=t.get(U);z.position.setFromMatrixPosition(U.matrixWorld),z.color.copy(Y).multiplyScalar(X),z.distance=J,z.coneCos=Math.cos(U.angle),z.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),z.decay=U.decay,n.spot[x]=z;const N=U.shadow;if(U.map&&(n.spotLightMap[S]=U.map,S++,N.updateMatrices(U),U.castShadow&&T++),n.spotLightMatrix[x]=N.matrix,U.castShadow){const y=e.get(U);y.shadowIntensity=N.intensity,y.shadowBias=N.bias,y.shadowNormalBias=N.normalBias,y.shadowRadius=N.radius,y.shadowMapSize=N.mapSize,n.spotShadow[x]=y,n.spotShadowMap[x]=b,_++}x++}else if(U.isRectAreaLight){const z=t.get(U);z.color.copy(Y).multiplyScalar(X),z.halfWidth.set(U.width*.5,0,0),z.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=z,m++}else if(U.isPointLight){const z=t.get(U);if(z.color.copy(U.color).multiplyScalar(U.intensity),z.distance=U.distance,z.decay=U.decay,U.castShadow){const N=U.shadow,y=e.get(U);y.shadowIntensity=N.intensity,y.shadowBias=N.bias,y.shadowNormalBias=N.normalBias,y.shadowRadius=N.radius,y.shadowMapSize=N.mapSize,y.shadowCameraNear=N.camera.near,y.shadowCameraFar=N.camera.far,n.pointShadow[g]=y,n.pointShadowMap[g]=b,n.pointShadowMatrix[g]=U.shadow.matrix,v++}n.point[g]=z,g++}else if(U.isHemisphereLight){const z=t.get(U);z.skyColor.copy(U.color).multiplyScalar(X),z.groundColor.copy(U.groundColor).multiplyScalar(X),n.hemi[p]=z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=zt.LTC_FLOAT_1,n.rectAreaLTC2=zt.LTC_FLOAT_2):(n.rectAreaLTC1=zt.LTC_HALF_1,n.rectAreaLTC2=zt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const G=n.hash;(G.directionalLength!==f||G.pointLength!==g||G.spotLength!==x||G.rectAreaLength!==m||G.hemiLength!==p||G.numDirectionalShadows!==M||G.numPointShadows!==v||G.numSpotShadows!==_||G.numSpotMaps!==S||G.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+S-T,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=L,G.directionalLength=f,G.pointLength=g,G.spotLength=x,G.rectAreaLength=m,G.hemiLength=p,G.numDirectionalShadows=M,G.numPointShadows=v,G.numSpotShadows=_,G.numSpotMaps=S,G.numLightProbes=L,n.version=kv++)}function c(l,u){let h=0,d=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const v=l[p];if(v.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(v.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function Rh(i){const t=new Uv(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Ov(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Rh(i),t.set(s,[o])):r>=a.length?(o=new Rh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Co extends jn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=_m,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Fv extends jn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hv=`uniform sampler2D shadow_pass;
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
}`;function Gv(i,t,e){let n=new vr;const s=new Ct,r=new Ct,a=new ae,o=new Co({depthPacking:wo}),c=new Fv,l={},u=e.maxTextureSize,h={[Ai]:cn,[cn]:Ai,[on]:on},d=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:Bv,fragmentShader:Hv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new fe;g.setAttribute("position",new be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fl;let p=this.type;this.render=function(T,L,G){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const E=i.getRenderTarget(),A=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),Y=i.state;Y.setBlending(Yi),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const X=p!==xi&&this.type===xi,J=p===xi&&this.type!==xi;for(let b=0,z=T.length;b<z;b++){const N=T[b],y=N.shadow;if(y===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(y.autoUpdate===!1&&y.needsUpdate===!1)continue;s.copy(y.mapSize);const B=y.getFrameExtents();if(s.multiply(B),r.copy(y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/B.x),s.x=r.x*B.x,y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/B.y),s.y=r.y*B.y,y.mapSize.y=r.y)),y.map===null||X===!0||J===!0){const k=this.type!==xi?{minFilter:$e,magFilter:$e}:{};y.map!==null&&y.map.dispose(),y.map=new wi(s.x,s.y,k),y.map.texture.name=N.name+".shadowMap",y.camera.updateProjectionMatrix()}i.setRenderTarget(y.map),i.clear();const O=y.getViewportCount();for(let k=0;k<O;k++){const R=y.getViewport(k);a.set(r.x*R.x,r.y*R.y,r.x*R.z,r.y*R.w),Y.viewport(a),y.updateMatrices(N,k),n=y.getFrustum(),_(L,G,y.camera,N,this.type)}y.isPointLightShadow!==!0&&this.type===xi&&M(y,G),y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,A,U)};function M(T,L){const G=t.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new wi(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(L,null,G,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(L,null,G,f,x,null)}function v(T,L,G,E){let A=null;const U=G.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)A=U;else if(A=G.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const Y=A.uuid,X=L.uuid;let J=l[Y];J===void 0&&(J={},l[Y]=J);let b=J[X];b===void 0&&(b=A.clone(),J[X]=b,L.addEventListener("dispose",S)),A=b}if(A.visible=L.visible,A.wireframe=L.wireframe,E===xi?A.side=L.shadowSide!==null?L.shadowSide:L.side:A.side=L.shadowSide!==null?L.shadowSide:h[L.side],A.alphaMap=L.alphaMap,A.alphaTest=L.alphaTest,A.map=L.map,A.clipShadows=L.clipShadows,A.clippingPlanes=L.clippingPlanes,A.clipIntersection=L.clipIntersection,A.displacementMap=L.displacementMap,A.displacementScale=L.displacementScale,A.displacementBias=L.displacementBias,A.wireframeLinewidth=L.wireframeLinewidth,A.linewidth=L.linewidth,G.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const Y=i.properties.get(A);Y.light=G}return A}function _(T,L,G,E,A){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===xi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld);const X=t.update(T),J=T.material;if(Array.isArray(J)){const b=X.groups;for(let z=0,N=b.length;z<N;z++){const y=b[z],B=J[y.materialIndex];if(B&&B.visible){const O=v(T,B,E,A);T.onBeforeShadow(i,T,L,G,X,O,y),i.renderBufferDirect(G,null,X,O,T,y),T.onAfterShadow(i,T,L,G,X,O,y)}}}else if(J.visible){const b=v(T,J,E,A);T.onBeforeShadow(i,T,L,G,X,b,null),i.renderBufferDirect(G,null,X,b,T,null),T.onAfterShadow(i,T,L,G,X,b,null)}}const Y=T.children;for(let X=0,J=Y.length;X<J;X++)_(Y[X],L,G,E,A)}function S(T){T.target.removeEventListener("dispose",S);for(const G in l){const E=l[G],A=T.target.uuid;A in E&&(E[A].dispose(),delete E[A])}}}const Vv={[Gc]:Vc,[Wc]:Yc,[Xc]:Kc,[or]:jc,[Vc]:Gc,[Yc]:Wc,[Kc]:Xc,[jc]:or};function Wv(i,t){function e(){let tt=!1;const Pt=new ae;let vt=null;const bt=new ae(0,0,0,0);return{setMask:function(nt){vt!==nt&&!tt&&(i.colorMask(nt,nt,nt,nt),vt=nt)},setLocked:function(nt){tt=nt},setClear:function(nt,_t,Tt,Ft,Qt){Qt===!0&&(nt*=Ft,_t*=Ft,Tt*=Ft),Pt.set(nt,_t,Tt,Ft),bt.equals(Pt)===!1&&(i.clearColor(nt,_t,Tt,Ft),bt.copy(Pt))},reset:function(){tt=!1,vt=null,bt.set(-1,0,0,0)}}}function n(){let tt=!1,Pt=!1,vt=null,bt=null,nt=null;return{setReversed:function(_t){if(Pt!==_t){const Tt=t.get("EXT_clip_control");Pt?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT);const Ft=nt;nt=null,this.setClear(Ft)}Pt=_t},getReversed:function(){return Pt},setTest:function(_t){_t?Q(i.DEPTH_TEST):et(i.DEPTH_TEST)},setMask:function(_t){vt!==_t&&!tt&&(i.depthMask(_t),vt=_t)},setFunc:function(_t){if(Pt&&(_t=Vv[_t]),bt!==_t){switch(_t){case Gc:i.depthFunc(i.NEVER);break;case Vc:i.depthFunc(i.ALWAYS);break;case Wc:i.depthFunc(i.LESS);break;case or:i.depthFunc(i.LEQUAL);break;case Xc:i.depthFunc(i.EQUAL);break;case jc:i.depthFunc(i.GEQUAL);break;case Yc:i.depthFunc(i.GREATER);break;case Kc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=_t}},setLocked:function(_t){tt=_t},setClear:function(_t){nt!==_t&&(Pt&&(_t=1-_t),i.clearDepth(_t),nt=_t)},reset:function(){tt=!1,vt=null,bt=null,nt=null,Pt=!1}}}function s(){let tt=!1,Pt=null,vt=null,bt=null,nt=null,_t=null,Tt=null,Ft=null,Qt=null;return{setTest:function(Yt){tt||(Yt?Q(i.STENCIL_TEST):et(i.STENCIL_TEST))},setMask:function(Yt){Pt!==Yt&&!tt&&(i.stencilMask(Yt),Pt=Yt)},setFunc:function(Yt,ue,He){(vt!==Yt||bt!==ue||nt!==He)&&(i.stencilFunc(Yt,ue,He),vt=Yt,bt=ue,nt=He)},setOp:function(Yt,ue,He){(_t!==Yt||Tt!==ue||Ft!==He)&&(i.stencilOp(Yt,ue,He),_t=Yt,Tt=ue,Ft=He)},setLocked:function(Yt){tt=Yt},setClear:function(Yt){Qt!==Yt&&(i.clearStencil(Yt),Qt=Yt)},reset:function(){tt=!1,Pt=null,vt=null,bt=null,nt=null,_t=null,Tt=null,Ft=null,Qt=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,v=null,_=null,S=null,T=null,L=new Ut(0,0,0),G=0,E=!1,A=null,U=null,Y=null,X=null,J=null;const b=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,N=0;const y=i.getParameter(i.VERSION);y.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(y)[1]),z=N>=1):y.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(y)[1]),z=N>=2);let B=null,O={};const k=i.getParameter(i.SCISSOR_BOX),R=i.getParameter(i.VIEWPORT),H=new ae().fromArray(k),I=new ae().fromArray(R);function C(tt,Pt,vt,bt){const nt=new Uint8Array(4),_t=i.createTexture();i.bindTexture(tt,_t),i.texParameteri(tt,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(tt,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<vt;Tt++)tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?i.texImage3D(Pt,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,nt):i.texImage2D(Pt+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,nt);return _t}const Z={};Z[i.TEXTURE_2D]=C(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=C(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=C(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=C(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(or),At(!1),ft(Iu),Q(i.CULL_FACE),F(Yi);function Q(tt){u[tt]!==!0&&(i.enable(tt),u[tt]=!0)}function et(tt){u[tt]!==!1&&(i.disable(tt),u[tt]=!1)}function gt(tt,Pt){return h[tt]!==Pt?(i.bindFramebuffer(tt,Pt),h[tt]=Pt,tt===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Pt),tt===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Pt),!0):!1}function xt(tt,Pt){let vt=f,bt=!1;if(tt){vt=d.get(Pt),vt===void 0&&(vt=[],d.set(Pt,vt));const nt=tt.textures;if(vt.length!==nt.length||vt[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,Tt=nt.length;_t<Tt;_t++)vt[_t]=i.COLOR_ATTACHMENT0+_t;vt.length=nt.length,bt=!0}}else vt[0]!==i.BACK&&(vt[0]=i.BACK,bt=!0);bt&&i.drawBuffers(vt)}function K(tt){return g!==tt?(i.useProgram(tt),g=tt,!0):!1}const $={[ps]:i.FUNC_ADD,[Gp]:i.FUNC_SUBTRACT,[Vp]:i.FUNC_REVERSE_SUBTRACT};$[Wp]=i.MIN,$[Xp]=i.MAX;const rt={[jp]:i.ZERO,[Yp]:i.ONE,[Kp]:i.SRC_COLOR,[Bc]:i.SRC_ALPHA,[tm]:i.SRC_ALPHA_SATURATE,[Jp]:i.DST_COLOR,[Zp]:i.DST_ALPHA,[qp]:i.ONE_MINUS_SRC_COLOR,[Hc]:i.ONE_MINUS_SRC_ALPHA,[Qp]:i.ONE_MINUS_DST_COLOR,[$p]:i.ONE_MINUS_DST_ALPHA,[em]:i.CONSTANT_COLOR,[nm]:i.ONE_MINUS_CONSTANT_COLOR,[im]:i.CONSTANT_ALPHA,[sm]:i.ONE_MINUS_CONSTANT_ALPHA};function F(tt,Pt,vt,bt,nt,_t,Tt,Ft,Qt,Yt){if(tt===Yi){x===!0&&(et(i.BLEND),x=!1);return}if(x===!1&&(Q(i.BLEND),x=!0),tt!==Hp){if(tt!==m||Yt!==E){if((p!==ps||_!==ps)&&(i.blendEquation(i.FUNC_ADD),p=ps,_=ps),Yt)switch(tt){case er:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lu:i.blendFunc(i.ONE,i.ONE);break;case zu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Du:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",tt);break}else switch(tt){case er:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case zu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Du:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",tt);break}M=null,v=null,S=null,T=null,L.set(0,0,0),G=0,m=tt,E=Yt}return}nt=nt||Pt,_t=_t||vt,Tt=Tt||bt,(Pt!==p||nt!==_)&&(i.blendEquationSeparate($[Pt],$[nt]),p=Pt,_=nt),(vt!==M||bt!==v||_t!==S||Tt!==T)&&(i.blendFuncSeparate(rt[vt],rt[bt],rt[_t],rt[Tt]),M=vt,v=bt,S=_t,T=Tt),(Ft.equals(L)===!1||Qt!==G)&&(i.blendColor(Ft.r,Ft.g,Ft.b,Qt),L.copy(Ft),G=Qt),m=tt,E=!1}function dt(tt,Pt){tt.side===on?et(i.CULL_FACE):Q(i.CULL_FACE);let vt=tt.side===cn;Pt&&(vt=!vt),At(vt),tt.blending===er&&tt.transparent===!1?F(Yi):F(tt.blending,tt.blendEquation,tt.blendSrc,tt.blendDst,tt.blendEquationAlpha,tt.blendSrcAlpha,tt.blendDstAlpha,tt.blendColor,tt.blendAlpha,tt.premultipliedAlpha),a.setFunc(tt.depthFunc),a.setTest(tt.depthTest),a.setMask(tt.depthWrite),r.setMask(tt.colorWrite);const bt=tt.stencilWrite;o.setTest(bt),bt&&(o.setMask(tt.stencilWriteMask),o.setFunc(tt.stencilFunc,tt.stencilRef,tt.stencilFuncMask),o.setOp(tt.stencilFail,tt.stencilZFail,tt.stencilZPass)),st(tt.polygonOffset,tt.polygonOffsetFactor,tt.polygonOffsetUnits),tt.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):et(i.SAMPLE_ALPHA_TO_COVERAGE)}function At(tt){A!==tt&&(tt?i.frontFace(i.CW):i.frontFace(i.CCW),A=tt)}function ft(tt){tt!==Fp?(Q(i.CULL_FACE),tt!==U&&(tt===Iu?i.cullFace(i.BACK):tt===Bp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):et(i.CULL_FACE),U=tt}function w(tt){tt!==Y&&(z&&i.lineWidth(tt),Y=tt)}function st(tt,Pt,vt){tt?(Q(i.POLYGON_OFFSET_FILL),(X!==Pt||J!==vt)&&(i.polygonOffset(Pt,vt),X=Pt,J=vt)):et(i.POLYGON_OFFSET_FILL)}function ut(tt){tt?Q(i.SCISSOR_TEST):et(i.SCISSOR_TEST)}function D(tt){tt===void 0&&(tt=i.TEXTURE0+b-1),B!==tt&&(i.activeTexture(tt),B=tt)}function P(tt,Pt,vt){vt===void 0&&(B===null?vt=i.TEXTURE0+b-1:vt=B);let bt=O[vt];bt===void 0&&(bt={type:void 0,texture:void 0},O[vt]=bt),(bt.type!==tt||bt.texture!==Pt)&&(B!==vt&&(i.activeTexture(vt),B=vt),i.bindTexture(tt,Pt||Z[tt]),bt.type=tt,bt.texture=Pt)}function q(){const tt=O[B];tt!==void 0&&tt.type!==void 0&&(i.bindTexture(tt.type,null),tt.type=void 0,tt.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function ht(){try{i.compressedTexImage3D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function lt(){try{i.texSubImage2D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function Mt(){try{i.texSubImage3D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function yt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function kt(){try{i.texStorage2D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function St(){try{i.texStorage3D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function Et(){try{i.texImage2D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function Nt(){try{i.texImage3D.apply(i,arguments)}catch(tt){console.error("THREE.WebGLState:",tt)}}function It(tt){H.equals(tt)===!1&&(i.scissor(tt.x,tt.y,tt.z,tt.w),H.copy(tt))}function Lt(tt){I.equals(tt)===!1&&(i.viewport(tt.x,tt.y,tt.z,tt.w),I.copy(tt))}function qt(tt,Pt){let vt=l.get(Pt);vt===void 0&&(vt=new WeakMap,l.set(Pt,vt));let bt=vt.get(tt);bt===void 0&&(bt=i.getUniformBlockIndex(Pt,tt.name),vt.set(tt,bt))}function jt(tt,Pt){const bt=l.get(Pt).get(tt);c.get(Pt)!==bt&&(i.uniformBlockBinding(Pt,bt,tt.__bindingPointIndex),c.set(Pt,bt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},B=null,O={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,v=null,_=null,S=null,T=null,L=new Ut(0,0,0),G=0,E=!1,A=null,U=null,Y=null,X=null,J=null,H.set(0,0,i.canvas.width,i.canvas.height),I.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:et,bindFramebuffer:gt,drawBuffers:xt,useProgram:K,setBlending:F,setMaterial:dt,setFlipSided:At,setCullFace:ft,setLineWidth:w,setPolygonOffset:st,setScissorTest:ut,activeTexture:D,bindTexture:P,unbindTexture:q,compressedTexImage2D:j,compressedTexImage3D:ht,texImage2D:Et,texImage3D:Nt,updateUBOMapping:qt,uniformBlockBinding:jt,texStorage2D:kt,texStorage3D:St,texSubImage2D:lt,texSubImage3D:Mt,compressedTexSubImage2D:yt,compressedTexSubImage3D:wt,scissor:It,viewport:Lt,reset:Wt}}function Ch(i,t,e,n){const s=Xv(n);switch(e){case Pd:return i*t;case Ld:return i*t;case zd:return i*t*2;case Wl:return i*t/s.components*s.byteLength;case Xl:return i*t/s.components*s.byteLength;case Dd:return i*t*2/s.components*s.byteLength;case jl:return i*t*2/s.components*s.byteLength;case Id:return i*t*3/s.components*s.byteLength;case Ze:return i*t*4/s.components*s.byteLength;case Yl:return i*t*4/s.components*s.byteLength;case oo:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case lo:case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jc:case tl:return Math.max(i,16)*Math.max(t,8)/4;case $c:case Qc:return Math.max(i,8)*Math.max(t,8)/2;case el:case nl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ll:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case pl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ml:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case gl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ho:case _l:case vl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case kd:case yl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ml:case bl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Xv(i){switch(i){case zn:case Ed:return{byteLength:1,components:1};case Qr:case Rd:case xr:return{byteLength:2,components:1};case Gl:case Vl:return{byteLength:2,components:4};case vs:case Hl:case Pn:return{byteLength:4,components:1};case Cd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function jv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ct,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,P){return f?new OffscreenCanvas(D,P):na("canvas")}function x(D,P,q){let j=1;const ht=ut(D);if((ht.width>q||ht.height>q)&&(j=q/Math.max(ht.width,ht.height)),j<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const lt=Math.floor(j*ht.width),Mt=Math.floor(j*ht.height);h===void 0&&(h=g(lt,Mt));const yt=P?g(lt,Mt):h;return yt.width=lt,yt.height=Mt,yt.getContext("2d").drawImage(D,0,0,lt,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+lt+"x"+Mt+")."),yt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){i.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(D,P,q,j,ht=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let lt=P;if(P===i.RED&&(q===i.FLOAT&&(lt=i.R32F),q===i.HALF_FLOAT&&(lt=i.R16F),q===i.UNSIGNED_BYTE&&(lt=i.R8)),P===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(lt=i.R8UI),q===i.UNSIGNED_SHORT&&(lt=i.R16UI),q===i.UNSIGNED_INT&&(lt=i.R32UI),q===i.BYTE&&(lt=i.R8I),q===i.SHORT&&(lt=i.R16I),q===i.INT&&(lt=i.R32I)),P===i.RG&&(q===i.FLOAT&&(lt=i.RG32F),q===i.HALF_FLOAT&&(lt=i.RG16F),q===i.UNSIGNED_BYTE&&(lt=i.RG8)),P===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(lt=i.RG8UI),q===i.UNSIGNED_SHORT&&(lt=i.RG16UI),q===i.UNSIGNED_INT&&(lt=i.RG32UI),q===i.BYTE&&(lt=i.RG8I),q===i.SHORT&&(lt=i.RG16I),q===i.INT&&(lt=i.RG32I)),P===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(lt=i.RGB8UI),q===i.UNSIGNED_SHORT&&(lt=i.RGB16UI),q===i.UNSIGNED_INT&&(lt=i.RGB32UI),q===i.BYTE&&(lt=i.RGB8I),q===i.SHORT&&(lt=i.RGB16I),q===i.INT&&(lt=i.RGB32I)),P===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(lt=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(lt=i.RGBA16UI),q===i.UNSIGNED_INT&&(lt=i.RGBA32UI),q===i.BYTE&&(lt=i.RGBA8I),q===i.SHORT&&(lt=i.RGBA16I),q===i.INT&&(lt=i.RGBA32I)),P===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(lt=i.RGB9_E5),P===i.RGBA){const Mt=ht?To:oe.getTransfer(j);q===i.FLOAT&&(lt=i.RGBA32F),q===i.HALF_FLOAT&&(lt=i.RGBA16F),q===i.UNSIGNED_BYTE&&(lt=Mt===ye?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(lt=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(lt=i.RGB5_A1)}return(lt===i.R16F||lt===i.R32F||lt===i.RG16F||lt===i.RG32F||lt===i.RGBA16F||lt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function _(D,P){let q;return D?P===null||P===vs||P===ur?q=i.DEPTH24_STENCIL8:P===Pn?q=i.DEPTH32F_STENCIL8:P===Qr&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===vs||P===ur?q=i.DEPTH_COMPONENT24:P===Pn?q=i.DEPTH_COMPONENT32F:P===Qr&&(q=i.DEPTH_COMPONENT16),q}function S(D,P){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==$e&&D.minFilter!==We?Math.log2(Math.max(P.width,P.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?P.mipmaps.length:1}function T(D){const P=D.target;P.removeEventListener("dispose",T),G(P),P.isVideoTexture&&u.delete(P)}function L(D){const P=D.target;P.removeEventListener("dispose",L),A(P)}function G(D){const P=n.get(D);if(P.__webglInit===void 0)return;const q=D.source,j=d.get(q);if(j){const ht=j[P.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&E(D),Object.keys(j).length===0&&d.delete(q)}n.remove(D)}function E(D){const P=n.get(D);i.deleteTexture(P.__webglTexture);const q=D.source,j=d.get(q);delete j[P.__cacheKey],a.memory.textures--}function A(D){const P=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(P.__webglFramebuffer[j]))for(let ht=0;ht<P.__webglFramebuffer[j].length;ht++)i.deleteFramebuffer(P.__webglFramebuffer[j][ht]);else i.deleteFramebuffer(P.__webglFramebuffer[j]);P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer[j])}else{if(Array.isArray(P.__webglFramebuffer))for(let j=0;j<P.__webglFramebuffer.length;j++)i.deleteFramebuffer(P.__webglFramebuffer[j]);else i.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&i.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let j=0;j<P.__webglColorRenderbuffer.length;j++)P.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(P.__webglColorRenderbuffer[j]);P.__webglDepthRenderbuffer&&i.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const q=D.textures;for(let j=0,ht=q.length;j<ht;j++){const lt=n.get(q[j]);lt.__webglTexture&&(i.deleteTexture(lt.__webglTexture),a.memory.textures--),n.remove(q[j])}n.remove(D)}let U=0;function Y(){U=0}function X(){const D=U;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),U+=1,D}function J(D){const P=[];return P.push(D.wrapS),P.push(D.wrapT),P.push(D.wrapR||0),P.push(D.magFilter),P.push(D.minFilter),P.push(D.anisotropy),P.push(D.internalFormat),P.push(D.format),P.push(D.type),P.push(D.generateMipmaps),P.push(D.premultiplyAlpha),P.push(D.flipY),P.push(D.unpackAlignment),P.push(D.colorSpace),P.join()}function b(D,P){const q=n.get(D);if(D.isVideoTexture&&w(D),D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){const j=D.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{I(q,D,P);return}}e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+P)}function z(D,P){const q=n.get(D);if(D.version>0&&q.__version!==D.version){I(q,D,P);return}e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+P)}function N(D,P){const q=n.get(D);if(D.version>0&&q.__version!==D.version){I(q,D,P);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+P)}function y(D,P){const q=n.get(D);if(D.version>0&&q.__version!==D.version){C(q,D,P);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+P)}const B={[$i]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},O={[$e]:i.NEAREST,[Td]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[We]:i.LINEAR,[ao]:i.LINEAR_MIPMAP_NEAREST,[yn]:i.LINEAR_MIPMAP_LINEAR},k={[ym]:i.NEVER,[Tm]:i.ALWAYS,[Mm]:i.LESS,[Ud]:i.LEQUAL,[bm]:i.EQUAL,[wm]:i.GEQUAL,[Sm]:i.GREATER,[Am]:i.NOTEQUAL};function R(D,P){if(P.type===Pn&&t.has("OES_texture_float_linear")===!1&&(P.magFilter===We||P.magFilter===ao||P.magFilter===Fr||P.magFilter===yn||P.minFilter===We||P.minFilter===ao||P.minFilter===Fr||P.minFilter===yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,B[P.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,B[P.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,B[P.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,O[P.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,O[P.minFilter]),P.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,k[P.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===$e||P.minFilter!==Fr&&P.minFilter!==yn||P.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||n.get(P).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,s.getMaxAnisotropy())),n.get(P).__currentAnisotropy=P.anisotropy}}}function H(D,P){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,P.addEventListener("dispose",T));const j=P.source;let ht=d.get(j);ht===void 0&&(ht={},d.set(j,ht));const lt=J(P);if(lt!==D.__cacheKey){ht[lt]===void 0&&(ht[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ht[lt].usedTimes++;const Mt=ht[D.__cacheKey];Mt!==void 0&&(ht[D.__cacheKey].usedTimes--,Mt.usedTimes===0&&E(P)),D.__cacheKey=lt,D.__webglTexture=ht[lt].texture}return q}function I(D,P,q){let j=i.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),P.isData3DTexture&&(j=i.TEXTURE_3D);const ht=H(D,P),lt=P.source;e.bindTexture(j,D.__webglTexture,i.TEXTURE0+q);const Mt=n.get(lt);if(lt.version!==Mt.__version||ht===!0){e.activeTexture(i.TEXTURE0+q);const yt=oe.getPrimaries(oe.workingColorSpace),wt=P.colorSpace===Vi?null:oe.getPrimaries(P.colorSpace),kt=P.colorSpace===Vi||yt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt);let St=x(P.image,!1,s.maxTextureSize);St=st(P,St);const Et=r.convert(P.format,P.colorSpace),Nt=r.convert(P.type);let It=v(P.internalFormat,Et,Nt,P.colorSpace,P.isVideoTexture);R(j,P);let Lt;const qt=P.mipmaps,jt=P.isVideoTexture!==!0,Wt=Mt.__version===void 0||ht===!0,tt=lt.dataReady,Pt=S(P,St);if(P.isDepthTexture)It=_(P.format===hr,P.type),Wt&&(jt?e.texStorage2D(i.TEXTURE_2D,1,It,St.width,St.height):e.texImage2D(i.TEXTURE_2D,0,It,St.width,St.height,0,Et,Nt,null));else if(P.isDataTexture)if(qt.length>0){jt&&Wt&&e.texStorage2D(i.TEXTURE_2D,Pt,It,qt[0].width,qt[0].height);for(let vt=0,bt=qt.length;vt<bt;vt++)Lt=qt[vt],jt?tt&&e.texSubImage2D(i.TEXTURE_2D,vt,0,0,Lt.width,Lt.height,Et,Nt,Lt.data):e.texImage2D(i.TEXTURE_2D,vt,It,Lt.width,Lt.height,0,Et,Nt,Lt.data);P.generateMipmaps=!1}else jt?(Wt&&e.texStorage2D(i.TEXTURE_2D,Pt,It,St.width,St.height),tt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St.width,St.height,Et,Nt,St.data)):e.texImage2D(i.TEXTURE_2D,0,It,St.width,St.height,0,Et,Nt,St.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){jt&&Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Pt,It,qt[0].width,qt[0].height,St.depth);for(let vt=0,bt=qt.length;vt<bt;vt++)if(Lt=qt[vt],P.format!==Ze)if(Et!==null)if(jt){if(tt)if(P.layerUpdates.size>0){const nt=Ch(Lt.width,Lt.height,P.format,P.type);for(const _t of P.layerUpdates){const Tt=Lt.data.subarray(_t*nt/Lt.data.BYTES_PER_ELEMENT,(_t+1)*nt/Lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,vt,0,0,_t,Lt.width,Lt.height,1,Et,Tt)}P.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,vt,0,0,0,Lt.width,Lt.height,St.depth,Et,Lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,vt,It,Lt.width,Lt.height,St.depth,0,Lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else jt?tt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,vt,0,0,0,Lt.width,Lt.height,St.depth,Et,Nt,Lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,vt,It,Lt.width,Lt.height,St.depth,0,Et,Nt,Lt.data)}else{jt&&Wt&&e.texStorage2D(i.TEXTURE_2D,Pt,It,qt[0].width,qt[0].height);for(let vt=0,bt=qt.length;vt<bt;vt++)Lt=qt[vt],P.format!==Ze?Et!==null?jt?tt&&e.compressedTexSubImage2D(i.TEXTURE_2D,vt,0,0,Lt.width,Lt.height,Et,Lt.data):e.compressedTexImage2D(i.TEXTURE_2D,vt,It,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?tt&&e.texSubImage2D(i.TEXTURE_2D,vt,0,0,Lt.width,Lt.height,Et,Nt,Lt.data):e.texImage2D(i.TEXTURE_2D,vt,It,Lt.width,Lt.height,0,Et,Nt,Lt.data)}else if(P.isDataArrayTexture)if(jt){if(Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Pt,It,St.width,St.height,St.depth),tt)if(P.layerUpdates.size>0){const vt=Ch(St.width,St.height,P.format,P.type);for(const bt of P.layerUpdates){const nt=St.data.subarray(bt*vt/St.data.BYTES_PER_ELEMENT,(bt+1)*vt/St.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,bt,St.width,St.height,1,Et,Nt,nt)}P.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,St.width,St.height,St.depth,Et,Nt,St.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,St.width,St.height,St.depth,0,Et,Nt,St.data);else if(P.isData3DTexture)jt?(Wt&&e.texStorage3D(i.TEXTURE_3D,Pt,It,St.width,St.height,St.depth),tt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,St.width,St.height,St.depth,Et,Nt,St.data)):e.texImage3D(i.TEXTURE_3D,0,It,St.width,St.height,St.depth,0,Et,Nt,St.data);else if(P.isFramebufferTexture){if(Wt)if(jt)e.texStorage2D(i.TEXTURE_2D,Pt,It,St.width,St.height);else{let vt=St.width,bt=St.height;for(let nt=0;nt<Pt;nt++)e.texImage2D(i.TEXTURE_2D,nt,It,vt,bt,0,Et,Nt,null),vt>>=1,bt>>=1}}else if(qt.length>0){if(jt&&Wt){const vt=ut(qt[0]);e.texStorage2D(i.TEXTURE_2D,Pt,It,vt.width,vt.height)}for(let vt=0,bt=qt.length;vt<bt;vt++)Lt=qt[vt],jt?tt&&e.texSubImage2D(i.TEXTURE_2D,vt,0,0,Et,Nt,Lt):e.texImage2D(i.TEXTURE_2D,vt,It,Et,Nt,Lt);P.generateMipmaps=!1}else if(jt){if(Wt){const vt=ut(St);e.texStorage2D(i.TEXTURE_2D,Pt,It,vt.width,vt.height)}tt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Nt,St)}else e.texImage2D(i.TEXTURE_2D,0,It,Et,Nt,St);m(P)&&p(j),Mt.__version=lt.version,P.onUpdate&&P.onUpdate(P)}D.__version=P.version}function C(D,P,q){if(P.image.length!==6)return;const j=H(D,P),ht=P.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+q);const lt=n.get(ht);if(ht.version!==lt.__version||j===!0){e.activeTexture(i.TEXTURE0+q);const Mt=oe.getPrimaries(oe.workingColorSpace),yt=P.colorSpace===Vi?null:oe.getPrimaries(P.colorSpace),wt=P.colorSpace===Vi||Mt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const kt=P.isCompressedTexture||P.image[0].isCompressedTexture,St=P.image[0]&&P.image[0].isDataTexture,Et=[];for(let bt=0;bt<6;bt++)!kt&&!St?Et[bt]=x(P.image[bt],!0,s.maxCubemapSize):Et[bt]=St?P.image[bt].image:P.image[bt],Et[bt]=st(P,Et[bt]);const Nt=Et[0],It=r.convert(P.format,P.colorSpace),Lt=r.convert(P.type),qt=v(P.internalFormat,It,Lt,P.colorSpace),jt=P.isVideoTexture!==!0,Wt=lt.__version===void 0||j===!0,tt=ht.dataReady;let Pt=S(P,Nt);R(i.TEXTURE_CUBE_MAP,P);let vt;if(kt){jt&&Wt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Pt,qt,Nt.width,Nt.height);for(let bt=0;bt<6;bt++){vt=Et[bt].mipmaps;for(let nt=0;nt<vt.length;nt++){const _t=vt[nt];P.format!==Ze?It!==null?jt?tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt,0,0,_t.width,_t.height,It,_t.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt,qt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):jt?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt,0,0,_t.width,_t.height,It,Lt,_t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt,qt,_t.width,_t.height,0,It,Lt,_t.data)}}}else{if(vt=P.mipmaps,jt&&Wt){vt.length>0&&Pt++;const bt=ut(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Pt,qt,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(St){jt?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Et[bt].width,Et[bt].height,It,Lt,Et[bt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,qt,Et[bt].width,Et[bt].height,0,It,Lt,Et[bt].data);for(let nt=0;nt<vt.length;nt++){const Tt=vt[nt].image[bt].image;jt?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt+1,0,0,Tt.width,Tt.height,It,Lt,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt+1,qt,Tt.width,Tt.height,0,It,Lt,Tt.data)}}else{jt?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,It,Lt,Et[bt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,qt,It,Lt,Et[bt]);for(let nt=0;nt<vt.length;nt++){const _t=vt[nt];jt?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt+1,0,0,It,Lt,_t.image[bt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,nt+1,qt,It,Lt,_t.image[bt])}}}m(P)&&p(i.TEXTURE_CUBE_MAP),lt.__version=ht.version,P.onUpdate&&P.onUpdate(P)}D.__version=P.version}function Z(D,P,q,j,ht,lt){const Mt=r.convert(q.format,q.colorSpace),yt=r.convert(q.type),wt=v(q.internalFormat,Mt,yt,q.colorSpace),kt=n.get(P),St=n.get(q);if(St.__renderTarget=P,!kt.__hasExternalTextures){const Et=Math.max(1,P.width>>lt),Nt=Math.max(1,P.height>>lt);ht===i.TEXTURE_3D||ht===i.TEXTURE_2D_ARRAY?e.texImage3D(ht,lt,wt,Et,Nt,P.depth,0,Mt,yt,null):e.texImage2D(ht,lt,wt,Et,Nt,0,Mt,yt,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),ft(P)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,ht,St.__webglTexture,0,At(P)):(ht===i.TEXTURE_2D||ht>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,ht,St.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Q(D,P,q){if(i.bindRenderbuffer(i.RENDERBUFFER,D),P.depthBuffer){const j=P.depthTexture,ht=j&&j.isDepthTexture?j.type:null,lt=_(P.stencilBuffer,ht),Mt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=At(P);ft(P)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,lt,P.width,P.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,lt,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,lt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Mt,i.RENDERBUFFER,D)}else{const j=P.textures;for(let ht=0;ht<j.length;ht++){const lt=j[ht],Mt=r.convert(lt.format,lt.colorSpace),yt=r.convert(lt.type),wt=v(lt.internalFormat,Mt,yt,lt.colorSpace),kt=At(P);q&&ft(P)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,wt,P.width,P.height):ft(P)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,kt,wt,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,wt,P.width,P.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function et(D,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(P.depthTexture);j.__renderTarget=P,(!j.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),b(P.depthTexture,0);const ht=j.__webglTexture,lt=At(P);if(P.depthTexture.format===nr)ft(P)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ht,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ht,0);else if(P.depthTexture.format===hr)ft(P)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ht,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ht,0);else throw new Error("Unknown depthTexture format")}function gt(D){const P=n.get(D),q=D.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==D.depthTexture){const j=D.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),j){const ht=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,j.removeEventListener("dispose",ht)};j.addEventListener("dispose",ht),P.__depthDisposeCallback=ht}P.__boundDepthTexture=j}if(D.depthTexture&&!P.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");et(P.__webglFramebuffer,D)}else if(q){P.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer[j]),P.__webglDepthbuffer[j]===void 0)P.__webglDepthbuffer[j]=i.createRenderbuffer(),Q(P.__webglDepthbuffer[j],D,!1);else{const ht=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=P.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,lt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=i.createRenderbuffer(),Q(P.__webglDepthbuffer,D,!1);else{const j=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=P.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ht)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(D,P,q){const j=n.get(D);P!==void 0&&Z(j.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&gt(D)}function K(D){const P=D.texture,q=n.get(D),j=n.get(P);D.addEventListener("dispose",L);const ht=D.textures,lt=D.isWebGLCubeRenderTarget===!0,Mt=ht.length>1;if(Mt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=P.version,a.memory.textures++),lt){q.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(P.mipmaps&&P.mipmaps.length>0){q.__webglFramebuffer[yt]=[];for(let wt=0;wt<P.mipmaps.length;wt++)q.__webglFramebuffer[yt][wt]=i.createFramebuffer()}else q.__webglFramebuffer[yt]=i.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){q.__webglFramebuffer=[];for(let yt=0;yt<P.mipmaps.length;yt++)q.__webglFramebuffer[yt]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Mt)for(let yt=0,wt=ht.length;yt<wt;yt++){const kt=n.get(ht[yt]);kt.__webglTexture===void 0&&(kt.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&ft(D)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let yt=0;yt<ht.length;yt++){const wt=ht[yt];q.__webglColorRenderbuffer[yt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[yt]);const kt=r.convert(wt.format,wt.colorSpace),St=r.convert(wt.type),Et=v(wt.internalFormat,kt,St,wt.colorSpace,D.isXRRenderTarget===!0),Nt=At(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,Et,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,q.__webglColorRenderbuffer[yt])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Q(q.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),R(i.TEXTURE_CUBE_MAP,P);for(let yt=0;yt<6;yt++)if(P.mipmaps&&P.mipmaps.length>0)for(let wt=0;wt<P.mipmaps.length;wt++)Z(q.__webglFramebuffer[yt][wt],D,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,wt);else Z(q.__webglFramebuffer[yt],D,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);m(P)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let yt=0,wt=ht.length;yt<wt;yt++){const kt=ht[yt],St=n.get(kt);e.bindTexture(i.TEXTURE_2D,St.__webglTexture),R(i.TEXTURE_2D,kt),Z(q.__webglFramebuffer,D,kt,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,0),m(kt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let yt=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(yt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,j.__webglTexture),R(yt,P),P.mipmaps&&P.mipmaps.length>0)for(let wt=0;wt<P.mipmaps.length;wt++)Z(q.__webglFramebuffer[wt],D,P,i.COLOR_ATTACHMENT0,yt,wt);else Z(q.__webglFramebuffer,D,P,i.COLOR_ATTACHMENT0,yt,0);m(P)&&p(yt),e.unbindTexture()}D.depthBuffer&&gt(D)}function $(D){const P=D.textures;for(let q=0,j=P.length;q<j;q++){const ht=P[q];if(m(ht)){const lt=M(D),Mt=n.get(ht).__webglTexture;e.bindTexture(lt,Mt),p(lt),e.unbindTexture()}}}const rt=[],F=[];function dt(D){if(D.samples>0){if(ft(D)===!1){const P=D.textures,q=D.width,j=D.height;let ht=i.COLOR_BUFFER_BIT;const lt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(D),yt=P.length>1;if(yt)for(let wt=0;wt<P.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let wt=0;wt<P.length;wt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ht|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ht|=i.STENCIL_BUFFER_BIT)),yt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[wt]);const kt=n.get(P[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,kt,0)}i.blitFramebuffer(0,0,q,j,0,0,q,j,ht,i.NEAREST),c===!0&&(rt.length=0,F.length=0,rt.push(i.COLOR_ATTACHMENT0+wt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(rt.push(lt),F.push(lt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),yt)for(let wt=0;wt<P.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[wt]);const kt=n.get(P[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const P=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[P])}}}function At(D){return Math.min(s.maxSamples,D.samples)}function ft(D){const P=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function w(D){const P=a.render.frame;u.get(D)!==P&&(u.set(D,P),D.update())}function st(D,P){const q=D.colorSpace,j=D.format,ht=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==ln&&q!==Vi&&(oe.getTransfer(q)===ye?(j!==Ze||ht!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),P}function ut(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=Y,this.setTexture2D=b,this.setTexture2DArray=z,this.setTexture3D=N,this.setTextureCube=y,this.rebindTextures=xt,this.setupRenderTarget=K,this.updateRenderTargetMipmap=$,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=ft}function Yv(i,t){function e(n,s=Vi){let r;const a=oe.getTransfer(s);if(n===zn)return i.UNSIGNED_BYTE;if(n===Gl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ed)return i.BYTE;if(n===Rd)return i.SHORT;if(n===Qr)return i.UNSIGNED_SHORT;if(n===Hl)return i.INT;if(n===vs)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===xr)return i.HALF_FLOAT;if(n===Pd)return i.ALPHA;if(n===Id)return i.RGB;if(n===Ze)return i.RGBA;if(n===Ld)return i.LUMINANCE;if(n===zd)return i.LUMINANCE_ALPHA;if(n===nr)return i.DEPTH_COMPONENT;if(n===hr)return i.DEPTH_STENCIL;if(n===Wl)return i.RED;if(n===Xl)return i.RED_INTEGER;if(n===Dd)return i.RG;if(n===jl)return i.RG_INTEGER;if(n===Yl)return i.RGBA_INTEGER;if(n===oo||n===co||n===lo||n===uo)if(a===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===oo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===oo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$c||n===Jc||n===Qc||n===tl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$c)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===el||n===nl||n===il)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===el||n===nl)return a===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===il)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sl||n===rl||n===al||n===ol||n===cl||n===ll||n===ul||n===hl||n===fl||n===dl||n===pl||n===ml||n===gl||n===xl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===al)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ll)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ml)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ho||n===_l||n===vl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ho)return a===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kd||n===yl||n===Ml||n===bl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ho)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ml)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ur?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Kv extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pe extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qv={type:"move"};class lc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qv)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Zv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$v=`
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

}`;class Jv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new je,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Kn({vertexShader:Zv,fragmentShader:$v,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ie(new bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qv extends Qi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const x=new Jv,m=e.getContextAttributes();let p=null,M=null;const v=[],_=[],S=new Ct;let T=null;const L=new an;L.viewport=new ae;const G=new an;G.viewport=new ae;const E=[L,G],A=new Kv;let U=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let C=v[I];return C===void 0&&(C=new lc,v[I]=C),C.getTargetRaySpace()},this.getControllerGrip=function(I){let C=v[I];return C===void 0&&(C=new lc,v[I]=C),C.getGripSpace()},this.getHand=function(I){let C=v[I];return C===void 0&&(C=new lc,v[I]=C),C.getHandSpace()};function X(I){const C=_.indexOf(I.inputSource);if(C===-1)return;const Z=v[C];Z!==void 0&&(Z.update(I.inputSource,I.frame,l||a),Z.dispatchEvent({type:I.type,data:I.inputSource}))}function J(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",b);for(let I=0;I<v.length;I++){const C=_[I];C!==null&&(_[I]=null,v[I].disconnect(C))}U=null,Y=null,x.reset(),t.setRenderTarget(p),f=null,d=null,h=null,s=null,M=null,H.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(I){if(s=I,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",J),s.addEventListener("inputsourceschange",b),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(S),s.renderState.layers===void 0){const C={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,C),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new wi(f.framebufferWidth,f.framebufferHeight,{format:Ze,type:zn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let C=null,Z=null,Q=null;m.depth&&(Q=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,C=m.stencil?hr:nr,Z=m.stencil?ur:vs);const et={colorFormat:e.RGBA8,depthFormat:Q,scaleFactor:r};h=new XRWebGLBinding(s,e),d=h.createProjectionLayer(et),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new wi(d.textureWidth,d.textureHeight,{format:Ze,type:zn,depthTexture:new Kd(d.textureWidth,d.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,C),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),H.setContext(s),H.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function b(I){for(let C=0;C<I.removed.length;C++){const Z=I.removed[C],Q=_.indexOf(Z);Q>=0&&(_[Q]=null,v[Q].disconnect(Z))}for(let C=0;C<I.added.length;C++){const Z=I.added[C];let Q=_.indexOf(Z);if(Q===-1){for(let gt=0;gt<v.length;gt++)if(gt>=_.length){_.push(Z),Q=gt;break}else if(_[gt]===null){_[gt]=Z,Q=gt;break}if(Q===-1)break}const et=v[Q];et&&et.connect(Z)}}const z=new V,N=new V;function y(I,C,Z){z.setFromMatrixPosition(C.matrixWorld),N.setFromMatrixPosition(Z.matrixWorld);const Q=z.distanceTo(N),et=C.projectionMatrix.elements,gt=Z.projectionMatrix.elements,xt=et[14]/(et[10]-1),K=et[14]/(et[10]+1),$=(et[9]+1)/et[5],rt=(et[9]-1)/et[5],F=(et[8]-1)/et[0],dt=(gt[8]+1)/gt[0],At=xt*F,ft=xt*dt,w=Q/(-F+dt),st=w*-F;if(C.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(st),I.translateZ(w),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),et[10]===-1)I.projectionMatrix.copy(C.projectionMatrix),I.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{const ut=xt+w,D=K+w,P=At-st,q=ft+(Q-st),j=$*K/D*ut,ht=rt*K/D*ut;I.projectionMatrix.makePerspective(P,q,j,ht,ut,D),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function B(I,C){C===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(C.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(s===null)return;let C=I.near,Z=I.far;x.texture!==null&&(x.depthNear>0&&(C=x.depthNear),x.depthFar>0&&(Z=x.depthFar)),A.near=G.near=L.near=C,A.far=G.far=L.far=Z,(U!==A.near||Y!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),U=A.near,Y=A.far),L.layers.mask=I.layers.mask|2,G.layers.mask=I.layers.mask|4,A.layers.mask=L.layers.mask|G.layers.mask;const Q=I.parent,et=A.cameras;B(A,Q);for(let gt=0;gt<et.length;gt++)B(et[gt],Q);et.length===2?y(A,L,G):A.projectionMatrix.copy(L.projectionMatrix),O(I,A,Q)};function O(I,C,Z){Z===null?I.matrix.copy(C.matrixWorld):(I.matrix.copy(Z.matrixWorld),I.matrix.invert(),I.matrix.multiply(C.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(C.projectionMatrix),I.projectionMatrixInverse.copy(C.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=fr*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(I){c=I,d!==null&&(d.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(A)};let k=null;function R(I,C){if(u=C.getViewerPose(l||a),g=C,u!==null){const Z=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Q=!1;Z.length!==A.cameras.length&&(A.cameras.length=0,Q=!0);for(let gt=0;gt<Z.length;gt++){const xt=Z[gt];let K=null;if(f!==null)K=f.getViewport(xt);else{const rt=h.getViewSubImage(d,xt);K=rt.viewport,gt===0&&(t.setRenderTargetTextures(M,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(M))}let $=E[gt];$===void 0&&($=new an,$.layers.enable(gt),$.viewport=new ae,E[gt]=$),$.matrix.fromArray(xt.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(xt.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(K.x,K.y,K.width,K.height),gt===0&&(A.matrix.copy($.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Q===!0&&A.cameras.push($)}const et=s.enabledFeatures;if(et&&et.includes("depth-sensing")){const gt=h.getDepthInformation(Z[0]);gt&&gt.isValid&&gt.texture&&x.init(t,gt,s.renderState)}}for(let Z=0;Z<v.length;Z++){const Q=_[Z],et=v[Z];Q!==null&&et!==void 0&&et.update(Q,C,l||a)}k&&k(I,C),C.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:C}),g=null}const H=new Yd;H.setAnimationLoop(R),this.setAnimationLoop=function(I){k=I},this.dispose=function(){}}}const rs=new un,ty=new Ot;function ey(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,M,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),v=M.envMap,_=M.envMapRotation;v&&(m.envMap.value=v,rs.copy(_),rs.x*=-1,rs.y*=-1,rs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(rs.y*=-1,rs.z*=-1),m.envMapRotation.value.setFromMatrix4(ty.makeRotationFromEuler(rs)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ny(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){const _=v.program;n.uniformBlockBinding(M,_)}function l(M,v){let _=s[M.id];_===void 0&&(g(M),_=u(M),s[M.id]=_,M.addEventListener("dispose",m));const S=v.program;n.updateUBOMapping(M,S);const T=t.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function u(M){const v=h();M.__bindingPointIndex=v;const _=i.createBuffer(),S=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,S,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const v=s[M.id],_=M.uniforms,S=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,L=_.length;T<L;T++){const G=Array.isArray(_[T])?_[T]:[_[T]];for(let E=0,A=G.length;E<A;E++){const U=G[E];if(f(U,T,E,S)===!0){const Y=U.__offset,X=Array.isArray(U.value)?U.value:[U.value];let J=0;for(let b=0;b<X.length;b++){const z=X[b],N=x(z);typeof z=="number"||typeof z=="boolean"?(U.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,Y+J,U.__data)):z.isMatrix3?(U.__data[0]=z.elements[0],U.__data[1]=z.elements[1],U.__data[2]=z.elements[2],U.__data[3]=0,U.__data[4]=z.elements[3],U.__data[5]=z.elements[4],U.__data[6]=z.elements[5],U.__data[7]=0,U.__data[8]=z.elements[6],U.__data[9]=z.elements[7],U.__data[10]=z.elements[8],U.__data[11]=0):(z.toArray(U.__data,J),J+=N.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,_,S){const T=M.value,L=v+"_"+_;if(S[L]===void 0)return typeof T=="number"||typeof T=="boolean"?S[L]=T:S[L]=T.clone(),!0;{const G=S[L];if(typeof T=="number"||typeof T=="boolean"){if(G!==T)return S[L]=T,!0}else if(G.equals(T)===!1)return G.copy(T),!0}return!1}function g(M){const v=M.uniforms;let _=0;const S=16;for(let L=0,G=v.length;L<G;L++){const E=Array.isArray(v[L])?v[L]:[v[L]];for(let A=0,U=E.length;A<U;A++){const Y=E[A],X=Array.isArray(Y.value)?Y.value:[Y.value];for(let J=0,b=X.length;J<b;J++){const z=X[J],N=x(z),y=_%S,B=y%N.boundary,O=y+B;_+=B,O!==0&&S-O<N.storage&&(_+=S-O),Y.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=_,_+=N.storage}}}const T=_%S;return T>0&&(_+=S-T),M.__size=_,M.__cache={},this}function x(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){const v=M.target;v.removeEventListener("dispose",m);const _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class iy{constructor(t={}){const{canvas:e=Vm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=Ki,this.toneMappingExposure=1;const _=this;let S=!1,T=0,L=0,G=null,E=-1,A=null;const U=new ae,Y=new ae;let X=null;const J=new Ut(0);let b=0,z=e.width,N=e.height,y=1,B=null,O=null;const k=new ae(0,0,z,N),R=new ae(0,0,z,N);let H=!1;const I=new vr;let C=!1,Z=!1;const Q=new Ot,et=new Ot,gt=new V,xt=new ae,K={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $=!1;function rt(){return G===null?y:1}let F=n;function dt(W,ot){return e.getContext(W,ot)}try{const W={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ol}`),e.addEventListener("webglcontextlost",bt,!1),e.addEventListener("webglcontextrestored",nt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),F===null){const ot="webgl2";if(F=dt(ot,W),F===null)throw dt(ot)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(W){throw console.error("THREE.WebGLRenderer: "+W.message),W}let At,ft,w,st,ut,D,P,q,j,ht,lt,Mt,yt,wt,kt,St,Et,Nt,It,Lt,qt,jt,Wt,tt;function Pt(){At=new l_(F),At.init(),jt=new Yv(F,At),ft=new i_(F,At,t,jt),w=new Wv(F,At),ft.reverseDepthBuffer&&d&&w.buffers.depth.setReversed(!0),st=new f_(F),ut=new Pv,D=new jv(F,At,w,ut,ft,jt,st),P=new r_(_),q=new c_(_),j=new v0(F),Wt=new e_(F,j),ht=new u_(F,j,st,Wt),lt=new p_(F,ht,j,st),It=new d_(F,ft,D),St=new s_(ut),Mt=new Cv(_,P,q,At,ft,Wt,St),yt=new ey(_,ut),wt=new Lv,kt=new Ov(At),Nt=new t_(_,P,q,w,lt,f,c),Et=new Gv(_,lt,ft),tt=new ny(F,st,ft,w),Lt=new n_(F,At,st),qt=new h_(F,At,st),st.programs=Mt.programs,_.capabilities=ft,_.extensions=At,_.properties=ut,_.renderLists=wt,_.shadowMap=Et,_.state=w,_.info=st}Pt();const vt=new Qv(_,F);this.xr=vt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const W=At.get("WEBGL_lose_context");W&&W.loseContext()},this.forceContextRestore=function(){const W=At.get("WEBGL_lose_context");W&&W.restoreContext()},this.getPixelRatio=function(){return y},this.setPixelRatio=function(W){W!==void 0&&(y=W,this.setSize(z,N,!1))},this.getSize=function(W){return W.set(z,N)},this.setSize=function(W,ot,pt=!0){if(vt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=W,N=ot,e.width=Math.floor(W*y),e.height=Math.floor(ot*y),pt===!0&&(e.style.width=W+"px",e.style.height=ot+"px"),this.setViewport(0,0,W,ot)},this.getDrawingBufferSize=function(W){return W.set(z*y,N*y).floor()},this.setDrawingBufferSize=function(W,ot,pt){z=W,N=ot,y=pt,e.width=Math.floor(W*pt),e.height=Math.floor(ot*pt),this.setViewport(0,0,W,ot)},this.getCurrentViewport=function(W){return W.copy(U)},this.getViewport=function(W){return W.copy(k)},this.setViewport=function(W,ot,pt,mt){W.isVector4?k.set(W.x,W.y,W.z,W.w):k.set(W,ot,pt,mt),w.viewport(U.copy(k).multiplyScalar(y).round())},this.getScissor=function(W){return W.copy(R)},this.setScissor=function(W,ot,pt,mt){W.isVector4?R.set(W.x,W.y,W.z,W.w):R.set(W,ot,pt,mt),w.scissor(Y.copy(R).multiplyScalar(y).round())},this.getScissorTest=function(){return H},this.setScissorTest=function(W){w.setScissorTest(H=W)},this.setOpaqueSort=function(W){B=W},this.setTransparentSort=function(W){O=W},this.getClearColor=function(W){return W.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(W=!0,ot=!0,pt=!0){let mt=0;if(W){let ct=!1;if(G!==null){const Rt=G.texture.format;ct=Rt===Yl||Rt===jl||Rt===Xl}if(ct){const Rt=G.texture.type,Dt=Rt===zn||Rt===vs||Rt===Qr||Rt===ur||Rt===Gl||Rt===Vl,Bt=Nt.getClearColor(),Ht=Nt.getClearAlpha(),Zt=Bt.r,Jt=Bt.g,Gt=Bt.b;Dt?(g[0]=Zt,g[1]=Jt,g[2]=Gt,g[3]=Ht,F.clearBufferuiv(F.COLOR,0,g)):(x[0]=Zt,x[1]=Jt,x[2]=Gt,x[3]=Ht,F.clearBufferiv(F.COLOR,0,x))}else mt|=F.COLOR_BUFFER_BIT}ot&&(mt|=F.DEPTH_BUFFER_BIT),pt&&(mt|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(mt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",bt,!1),e.removeEventListener("webglcontextrestored",nt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),wt.dispose(),kt.dispose(),ut.dispose(),P.dispose(),q.dispose(),lt.dispose(),Wt.dispose(),tt.dispose(),Mt.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",mn),vt.removeEventListener("sessionend",ge),Ue.stop()};function bt(W){W.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const W=st.autoReset,ot=Et.enabled,pt=Et.autoUpdate,mt=Et.needsUpdate,ct=Et.type;Pt(),st.autoReset=W,Et.enabled=ot,Et.autoUpdate=pt,Et.needsUpdate=mt,Et.type=ct}function _t(W){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",W.statusMessage)}function Tt(W){const ot=W.target;ot.removeEventListener("dispose",Tt),Ft(ot)}function Ft(W){Qt(W),ut.remove(W)}function Qt(W){const ot=ut.get(W).programs;ot!==void 0&&(ot.forEach(function(pt){Mt.releaseProgram(pt)}),W.isShaderMaterial&&Mt.releaseShaderCache(W))}this.renderBufferDirect=function(W,ot,pt,mt,ct,Rt){ot===null&&(ot=K);const Dt=ct.isMesh&&ct.matrixWorld.determinant()<0,Bt=Np(W,ot,pt,mt,ct);w.setMaterial(mt,Dt);let Ht=pt.index,Zt=1;if(mt.wireframe===!0){if(Ht=ht.getWireframeAttribute(pt),Ht===void 0)return;Zt=2}const Jt=pt.drawRange,Gt=pt.attributes.position;let he=Jt.start*Zt,Ae=(Jt.start+Jt.count)*Zt;Rt!==null&&(he=Math.max(he,Rt.start*Zt),Ae=Math.min(Ae,(Rt.start+Rt.count)*Zt)),Ht!==null?(he=Math.max(he,0),Ae=Math.min(Ae,Ht.count)):Gt!=null&&(he=Math.max(he,0),Ae=Math.min(Ae,Gt.count));const we=Ae-he;if(we<0||we===1/0)return;Wt.setup(ct,mt,Bt,pt,Ht);let fn,de=Lt;if(Ht!==null&&(fn=j.get(Ht),de=qt,de.setIndex(fn)),ct.isMesh)mt.wireframe===!0?(w.setLineWidth(mt.wireframeLinewidth*rt()),de.setMode(F.LINES)):de.setMode(F.TRIANGLES);else if(ct.isLine){let Vt=mt.linewidth;Vt===void 0&&(Vt=1),w.setLineWidth(Vt*rt()),ct.isLineSegments?de.setMode(F.LINES):ct.isLineLoop?de.setMode(F.LINE_LOOP):de.setMode(F.LINE_STRIP)}else ct.isPoints?de.setMode(F.POINTS):ct.isSprite&&de.setMode(F.TRIANGLES);if(ct.isBatchedMesh)if(ct._multiDrawInstances!==null)de.renderMultiDrawInstances(ct._multiDrawStarts,ct._multiDrawCounts,ct._multiDrawCount,ct._multiDrawInstances);else if(At.get("WEBGL_multi_draw"))de.renderMultiDraw(ct._multiDrawStarts,ct._multiDrawCounts,ct._multiDrawCount);else{const Vt=ct._multiDrawStarts,oi=ct._multiDrawCounts,pe=ct._multiDrawCount,Dn=Ht?j.get(Ht).bytesPerElement:1,ws=ut.get(mt).currentProgram.getUniforms();for(let gn=0;gn<pe;gn++)ws.setValue(F,"_gl_DrawID",gn),de.render(Vt[gn]/Dn,oi[gn])}else if(ct.isInstancedMesh)de.renderInstances(he,we,ct.count);else if(pt.isInstancedBufferGeometry){const Vt=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,oi=Math.min(pt.instanceCount,Vt);de.renderInstances(he,we,oi)}else de.render(he,we)};function Yt(W,ot,pt){W.transparent===!0&&W.side===on&&W.forceSinglePass===!1?(W.side=cn,W.needsUpdate=!0,pa(W,ot,pt),W.side=Ai,W.needsUpdate=!0,pa(W,ot,pt),W.side=on):pa(W,ot,pt)}this.compile=function(W,ot,pt=null){pt===null&&(pt=W),p=kt.get(pt),p.init(ot),v.push(p),pt.traverseVisible(function(ct){ct.isLight&&ct.layers.test(ot.layers)&&(p.pushLight(ct),ct.castShadow&&p.pushShadow(ct))}),W!==pt&&W.traverseVisible(function(ct){ct.isLight&&ct.layers.test(ot.layers)&&(p.pushLight(ct),ct.castShadow&&p.pushShadow(ct))}),p.setupLights();const mt=new Set;return W.traverse(function(ct){if(!(ct.isMesh||ct.isPoints||ct.isLine||ct.isSprite))return;const Rt=ct.material;if(Rt)if(Array.isArray(Rt))for(let Dt=0;Dt<Rt.length;Dt++){const Bt=Rt[Dt];Yt(Bt,pt,ct),mt.add(Bt)}else Yt(Rt,pt,ct),mt.add(Rt)}),v.pop(),p=null,mt},this.compileAsync=function(W,ot,pt=null){const mt=this.compile(W,ot,pt);return new Promise(ct=>{function Rt(){if(mt.forEach(function(Dt){ut.get(Dt).currentProgram.isReady()&&mt.delete(Dt)}),mt.size===0){ct(W);return}setTimeout(Rt,10)}At.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let ue=null;function He(W){ue&&ue(W)}function mn(){Ue.stop()}function ge(){Ue.start()}const Ue=new Yd;Ue.setAnimationLoop(He),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(W){ue=W,vt.setAnimationLoop(W),W===null?Ue.stop():Ue.start()},vt.addEventListener("sessionstart",mn),vt.addEventListener("sessionend",ge),this.render=function(W,ot){if(ot!==void 0&&ot.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ot.parent===null&&ot.matrixWorldAutoUpdate===!0&&ot.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(ot),ot=vt.getCamera()),W.isScene===!0&&W.onBeforeRender(_,W,ot,G),p=kt.get(W,v.length),p.init(ot),v.push(p),et.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),I.setFromProjectionMatrix(et),Z=this.localClippingEnabled,C=St.init(this.clippingPlanes,Z),m=wt.get(W,M.length),m.init(),M.push(m),vt.enabled===!0&&vt.isPresenting===!0){const Rt=_.xr.getDepthSensingMesh();Rt!==null&&en(Rt,ot,-1/0,_.sortObjects)}en(W,ot,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(B,O),$=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,$&&Nt.addToRenderList(m,W),this.info.render.frame++,C===!0&&St.beginShadows();const pt=p.state.shadowsArray;Et.render(pt,W,ot),C===!0&&St.endShadows(),this.info.autoReset===!0&&this.info.reset();const mt=m.opaque,ct=m.transmissive;if(p.setupLights(),ot.isArrayCamera){const Rt=ot.cameras;if(ct.length>0)for(let Dt=0,Bt=Rt.length;Dt<Bt;Dt++){const Ht=Rt[Dt];Tu(mt,ct,W,Ht)}$&&Nt.render(W);for(let Dt=0,Bt=Rt.length;Dt<Bt;Dt++){const Ht=Rt[Dt];wu(m,W,Ht,Ht.viewport)}}else ct.length>0&&Tu(mt,ct,W,ot),$&&Nt.render(W),wu(m,W,ot);G!==null&&(D.updateMultisampleRenderTarget(G),D.updateRenderTargetMipmap(G)),W.isScene===!0&&W.onAfterRender(_,W,ot),Wt.resetDefaultState(),E=-1,A=null,v.pop(),v.length>0?(p=v[v.length-1],C===!0&&St.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function en(W,ot,pt,mt){if(W.visible===!1)return;if(W.layers.test(ot.layers)){if(W.isGroup)pt=W.renderOrder;else if(W.isLOD)W.autoUpdate===!0&&W.update(ot);else if(W.isLight)p.pushLight(W),W.castShadow&&p.pushShadow(W);else if(W.isSprite){if(!W.frustumCulled||I.intersectsSprite(W)){mt&&xt.setFromMatrixPosition(W.matrixWorld).applyMatrix4(et);const Dt=lt.update(W),Bt=W.material;Bt.visible&&m.push(W,Dt,Bt,pt,xt.z,null)}}else if((W.isMesh||W.isLine||W.isPoints)&&(!W.frustumCulled||I.intersectsObject(W))){const Dt=lt.update(W),Bt=W.material;if(mt&&(W.boundingSphere!==void 0?(W.boundingSphere===null&&W.computeBoundingSphere(),xt.copy(W.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),xt.copy(Dt.boundingSphere.center)),xt.applyMatrix4(W.matrixWorld).applyMatrix4(et)),Array.isArray(Bt)){const Ht=Dt.groups;for(let Zt=0,Jt=Ht.length;Zt<Jt;Zt++){const Gt=Ht[Zt],he=Bt[Gt.materialIndex];he&&he.visible&&m.push(W,Dt,he,pt,xt.z,Gt)}}else Bt.visible&&m.push(W,Dt,Bt,pt,xt.z,null)}}const Rt=W.children;for(let Dt=0,Bt=Rt.length;Dt<Bt;Dt++)en(Rt[Dt],ot,pt,mt)}function wu(W,ot,pt,mt){const ct=W.opaque,Rt=W.transmissive,Dt=W.transparent;p.setupLightsView(pt),C===!0&&St.setGlobalState(_.clippingPlanes,pt),mt&&w.viewport(U.copy(mt)),ct.length>0&&da(ct,ot,pt),Rt.length>0&&da(Rt,ot,pt),Dt.length>0&&da(Dt,ot,pt),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Tu(W,ot,pt,mt){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[mt.id]===void 0&&(p.state.transmissionRenderTarget[mt.id]=new wi(1,1,{generateMipmaps:!0,type:At.has("EXT_color_buffer_half_float")||At.has("EXT_color_buffer_float")?xr:zn,minFilter:yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));const Rt=p.state.transmissionRenderTarget[mt.id],Dt=mt.viewport||U;Rt.setSize(Dt.z,Dt.w);const Bt=_.getRenderTarget();_.setRenderTarget(Rt),_.getClearColor(J),b=_.getClearAlpha(),b<1&&_.setClearColor(16777215,.5),_.clear(),$&&Nt.render(pt);const Ht=_.toneMapping;_.toneMapping=Ki;const Zt=mt.viewport;if(mt.viewport!==void 0&&(mt.viewport=void 0),p.setupLightsView(mt),C===!0&&St.setGlobalState(_.clippingPlanes,mt),da(W,pt,mt),D.updateMultisampleRenderTarget(Rt),D.updateRenderTargetMipmap(Rt),At.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let Gt=0,he=ot.length;Gt<he;Gt++){const Ae=ot[Gt],we=Ae.object,fn=Ae.geometry,de=Ae.material,Vt=Ae.group;if(de.side===on&&we.layers.test(mt.layers)){const oi=de.side;de.side=cn,de.needsUpdate=!0,Eu(we,pt,mt,fn,de,Vt),de.side=oi,de.needsUpdate=!0,Jt=!0}}Jt===!0&&(D.updateMultisampleRenderTarget(Rt),D.updateRenderTargetMipmap(Rt))}_.setRenderTarget(Bt),_.setClearColor(J,b),Zt!==void 0&&(mt.viewport=Zt),_.toneMapping=Ht}function da(W,ot,pt){const mt=ot.isScene===!0?ot.overrideMaterial:null;for(let ct=0,Rt=W.length;ct<Rt;ct++){const Dt=W[ct],Bt=Dt.object,Ht=Dt.geometry,Zt=mt===null?Dt.material:mt,Jt=Dt.group;Bt.layers.test(pt.layers)&&Eu(Bt,ot,pt,Ht,Zt,Jt)}}function Eu(W,ot,pt,mt,ct,Rt){W.onBeforeRender(_,ot,pt,mt,ct,Rt),W.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,W.matrixWorld),W.normalMatrix.getNormalMatrix(W.modelViewMatrix),ct.onBeforeRender(_,ot,pt,mt,W,Rt),ct.transparent===!0&&ct.side===on&&ct.forceSinglePass===!1?(ct.side=cn,ct.needsUpdate=!0,_.renderBufferDirect(pt,ot,mt,ct,W,Rt),ct.side=Ai,ct.needsUpdate=!0,_.renderBufferDirect(pt,ot,mt,ct,W,Rt),ct.side=on):_.renderBufferDirect(pt,ot,mt,ct,W,Rt),W.onAfterRender(_,ot,pt,mt,ct,Rt)}function pa(W,ot,pt){ot.isScene!==!0&&(ot=K);const mt=ut.get(W),ct=p.state.lights,Rt=p.state.shadowsArray,Dt=ct.state.version,Bt=Mt.getParameters(W,ct.state,Rt,ot,pt),Ht=Mt.getProgramCacheKey(Bt);let Zt=mt.programs;mt.environment=W.isMeshStandardMaterial?ot.environment:null,mt.fog=ot.fog,mt.envMap=(W.isMeshStandardMaterial?q:P).get(W.envMap||mt.environment),mt.envMapRotation=mt.environment!==null&&W.envMap===null?ot.environmentRotation:W.envMapRotation,Zt===void 0&&(W.addEventListener("dispose",Tt),Zt=new Map,mt.programs=Zt);let Jt=Zt.get(Ht);if(Jt!==void 0){if(mt.currentProgram===Jt&&mt.lightsStateVersion===Dt)return Cu(W,Bt),Jt}else Bt.uniforms=Mt.getUniforms(W),W.onBeforeCompile(Bt,_),Jt=Mt.acquireProgram(Bt,Ht),Zt.set(Ht,Jt),mt.uniforms=Bt.uniforms;const Gt=mt.uniforms;return(!W.isShaderMaterial&&!W.isRawShaderMaterial||W.clipping===!0)&&(Gt.clippingPlanes=St.uniform),Cu(W,Bt),mt.needsLights=Op(W),mt.lightsStateVersion=Dt,mt.needsLights&&(Gt.ambientLightColor.value=ct.state.ambient,Gt.lightProbe.value=ct.state.probe,Gt.directionalLights.value=ct.state.directional,Gt.directionalLightShadows.value=ct.state.directionalShadow,Gt.spotLights.value=ct.state.spot,Gt.spotLightShadows.value=ct.state.spotShadow,Gt.rectAreaLights.value=ct.state.rectArea,Gt.ltc_1.value=ct.state.rectAreaLTC1,Gt.ltc_2.value=ct.state.rectAreaLTC2,Gt.pointLights.value=ct.state.point,Gt.pointLightShadows.value=ct.state.pointShadow,Gt.hemisphereLights.value=ct.state.hemi,Gt.directionalShadowMap.value=ct.state.directionalShadowMap,Gt.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Gt.spotShadowMap.value=ct.state.spotShadowMap,Gt.spotLightMatrix.value=ct.state.spotLightMatrix,Gt.spotLightMap.value=ct.state.spotLightMap,Gt.pointShadowMap.value=ct.state.pointShadowMap,Gt.pointShadowMatrix.value=ct.state.pointShadowMatrix),mt.currentProgram=Jt,mt.uniformsList=null,Jt}function Ru(W){if(W.uniformsList===null){const ot=W.currentProgram.getUniforms();W.uniformsList=fo.seqWithValue(ot.seq,W.uniforms)}return W.uniformsList}function Cu(W,ot){const pt=ut.get(W);pt.outputColorSpace=ot.outputColorSpace,pt.batching=ot.batching,pt.batchingColor=ot.batchingColor,pt.instancing=ot.instancing,pt.instancingColor=ot.instancingColor,pt.instancingMorph=ot.instancingMorph,pt.skinning=ot.skinning,pt.morphTargets=ot.morphTargets,pt.morphNormals=ot.morphNormals,pt.morphColors=ot.morphColors,pt.morphTargetsCount=ot.morphTargetsCount,pt.numClippingPlanes=ot.numClippingPlanes,pt.numIntersection=ot.numClipIntersection,pt.vertexAlphas=ot.vertexAlphas,pt.vertexTangents=ot.vertexTangents,pt.toneMapping=ot.toneMapping}function Np(W,ot,pt,mt,ct){ot.isScene!==!0&&(ot=K),D.resetTextureUnits();const Rt=ot.fog,Dt=mt.isMeshStandardMaterial?ot.environment:null,Bt=G===null?_.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:ln,Ht=(mt.isMeshStandardMaterial?q:P).get(mt.envMap||Dt),Zt=mt.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,Jt=!!pt.attributes.tangent&&(!!mt.normalMap||mt.anisotropy>0),Gt=!!pt.morphAttributes.position,he=!!pt.morphAttributes.normal,Ae=!!pt.morphAttributes.color;let we=Ki;mt.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(we=_.toneMapping);const fn=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,de=fn!==void 0?fn.length:0,Vt=ut.get(mt),oi=p.state.lights;if(C===!0&&(Z===!0||W!==A)){const Sn=W===A&&mt.id===E;St.setState(mt,W,Sn)}let pe=!1;mt.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==oi.state.version||Vt.outputColorSpace!==Bt||ct.isBatchedMesh&&Vt.batching===!1||!ct.isBatchedMesh&&Vt.batching===!0||ct.isBatchedMesh&&Vt.batchingColor===!0&&ct.colorTexture===null||ct.isBatchedMesh&&Vt.batchingColor===!1&&ct.colorTexture!==null||ct.isInstancedMesh&&Vt.instancing===!1||!ct.isInstancedMesh&&Vt.instancing===!0||ct.isSkinnedMesh&&Vt.skinning===!1||!ct.isSkinnedMesh&&Vt.skinning===!0||ct.isInstancedMesh&&Vt.instancingColor===!0&&ct.instanceColor===null||ct.isInstancedMesh&&Vt.instancingColor===!1&&ct.instanceColor!==null||ct.isInstancedMesh&&Vt.instancingMorph===!0&&ct.morphTexture===null||ct.isInstancedMesh&&Vt.instancingMorph===!1&&ct.morphTexture!==null||Vt.envMap!==Ht||mt.fog===!0&&Vt.fog!==Rt||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==St.numPlanes||Vt.numIntersection!==St.numIntersection)||Vt.vertexAlphas!==Zt||Vt.vertexTangents!==Jt||Vt.morphTargets!==Gt||Vt.morphNormals!==he||Vt.morphColors!==Ae||Vt.toneMapping!==we||Vt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,Vt.__version=mt.version);let Dn=Vt.currentProgram;pe===!0&&(Dn=pa(mt,ot,ct));let ws=!1,gn=!1,wr=!1;const Te=Dn.getUniforms(),Zn=Vt.uniforms;if(w.useProgram(Dn.program)&&(ws=!0,gn=!0,wr=!0),mt.id!==E&&(E=mt.id,gn=!0),ws||A!==W){w.buffers.depth.getReversed()?(Q.copy(W.projectionMatrix),Xm(Q),jm(Q),Te.setValue(F,"projectionMatrix",Q)):Te.setValue(F,"projectionMatrix",W.projectionMatrix),Te.setValue(F,"viewMatrix",W.matrixWorldInverse);const Ei=Te.map.cameraPosition;Ei!==void 0&&Ei.setValue(F,gt.setFromMatrixPosition(W.matrixWorld)),ft.logarithmicDepthBuffer&&Te.setValue(F,"logDepthBufFC",2/(Math.log(W.far+1)/Math.LN2)),(mt.isMeshPhongMaterial||mt.isMeshToonMaterial||mt.isMeshLambertMaterial||mt.isMeshBasicMaterial||mt.isMeshStandardMaterial||mt.isShaderMaterial)&&Te.setValue(F,"isOrthographic",W.isOrthographicCamera===!0),A!==W&&(A=W,gn=!0,wr=!0)}if(ct.isSkinnedMesh){Te.setOptional(F,ct,"bindMatrix"),Te.setOptional(F,ct,"bindMatrixInverse");const Sn=ct.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),Te.setValue(F,"boneTexture",Sn.boneTexture,D))}ct.isBatchedMesh&&(Te.setOptional(F,ct,"batchingTexture"),Te.setValue(F,"batchingTexture",ct._matricesTexture,D),Te.setOptional(F,ct,"batchingIdTexture"),Te.setValue(F,"batchingIdTexture",ct._indirectTexture,D),Te.setOptional(F,ct,"batchingColorTexture"),ct._colorsTexture!==null&&Te.setValue(F,"batchingColorTexture",ct._colorsTexture,D));const Tr=pt.morphAttributes;if((Tr.position!==void 0||Tr.normal!==void 0||Tr.color!==void 0)&&It.update(ct,pt,Dn),(gn||Vt.receiveShadow!==ct.receiveShadow)&&(Vt.receiveShadow=ct.receiveShadow,Te.setValue(F,"receiveShadow",ct.receiveShadow)),mt.isMeshGouraudMaterial&&mt.envMap!==null&&(Zn.envMap.value=Ht,Zn.flipEnvMap.value=Ht.isCubeTexture&&Ht.isRenderTargetTexture===!1?-1:1),mt.isMeshStandardMaterial&&mt.envMap===null&&ot.environment!==null&&(Zn.envMapIntensity.value=ot.environmentIntensity),gn&&(Te.setValue(F,"toneMappingExposure",_.toneMappingExposure),Vt.needsLights&&Up(Zn,wr),Rt&&mt.fog===!0&&yt.refreshFogUniforms(Zn,Rt),yt.refreshMaterialUniforms(Zn,mt,y,N,p.state.transmissionRenderTarget[W.id]),fo.upload(F,Ru(Vt),Zn,D)),mt.isShaderMaterial&&mt.uniformsNeedUpdate===!0&&(fo.upload(F,Ru(Vt),Zn,D),mt.uniformsNeedUpdate=!1),mt.isSpriteMaterial&&Te.setValue(F,"center",ct.center),Te.setValue(F,"modelViewMatrix",ct.modelViewMatrix),Te.setValue(F,"normalMatrix",ct.normalMatrix),Te.setValue(F,"modelMatrix",ct.matrixWorld),mt.isShaderMaterial||mt.isRawShaderMaterial){const Sn=mt.uniformsGroups;for(let Ei=0,Ri=Sn.length;Ei<Ri;Ei++){const Pu=Sn[Ei];tt.update(Pu,Dn),tt.bind(Pu,Dn)}}return Dn}function Up(W,ot){W.ambientLightColor.needsUpdate=ot,W.lightProbe.needsUpdate=ot,W.directionalLights.needsUpdate=ot,W.directionalLightShadows.needsUpdate=ot,W.pointLights.needsUpdate=ot,W.pointLightShadows.needsUpdate=ot,W.spotLights.needsUpdate=ot,W.spotLightShadows.needsUpdate=ot,W.rectAreaLights.needsUpdate=ot,W.hemisphereLights.needsUpdate=ot}function Op(W){return W.isMeshLambertMaterial||W.isMeshToonMaterial||W.isMeshPhongMaterial||W.isMeshStandardMaterial||W.isShadowMaterial||W.isShaderMaterial&&W.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(W,ot,pt){ut.get(W.texture).__webglTexture=ot,ut.get(W.depthTexture).__webglTexture=pt;const mt=ut.get(W);mt.__hasExternalTextures=!0,mt.__autoAllocateDepthBuffer=pt===void 0,mt.__autoAllocateDepthBuffer||At.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),mt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(W,ot){const pt=ut.get(W);pt.__webglFramebuffer=ot,pt.__useDefaultFramebuffer=ot===void 0},this.setRenderTarget=function(W,ot=0,pt=0){G=W,T=ot,L=pt;let mt=!0,ct=null,Rt=!1,Dt=!1;if(W){const Ht=ut.get(W);if(Ht.__useDefaultFramebuffer!==void 0)w.bindFramebuffer(F.FRAMEBUFFER,null),mt=!1;else if(Ht.__webglFramebuffer===void 0)D.setupRenderTarget(W);else if(Ht.__hasExternalTextures)D.rebindTextures(W,ut.get(W.texture).__webglTexture,ut.get(W.depthTexture).__webglTexture);else if(W.depthBuffer){const Gt=W.depthTexture;if(Ht.__boundDepthTexture!==Gt){if(Gt!==null&&ut.has(Gt)&&(W.width!==Gt.image.width||W.height!==Gt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(W)}}const Zt=W.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Dt=!0);const Jt=ut.get(W).__webglFramebuffer;W.isWebGLCubeRenderTarget?(Array.isArray(Jt[ot])?ct=Jt[ot][pt]:ct=Jt[ot],Rt=!0):W.samples>0&&D.useMultisampledRTT(W)===!1?ct=ut.get(W).__webglMultisampledFramebuffer:Array.isArray(Jt)?ct=Jt[pt]:ct=Jt,U.copy(W.viewport),Y.copy(W.scissor),X=W.scissorTest}else U.copy(k).multiplyScalar(y).floor(),Y.copy(R).multiplyScalar(y).floor(),X=H;if(w.bindFramebuffer(F.FRAMEBUFFER,ct)&&mt&&w.drawBuffers(W,ct),w.viewport(U),w.scissor(Y),w.setScissorTest(X),Rt){const Ht=ut.get(W.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ht.__webglTexture,pt)}else if(Dt){const Ht=ut.get(W.texture),Zt=ot||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ht.__webglTexture,pt||0,Zt)}E=-1},this.readRenderTargetPixels=function(W,ot,pt,mt,ct,Rt,Dt){if(!(W&&W.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=ut.get(W).__webglFramebuffer;if(W.isWebGLCubeRenderTarget&&Dt!==void 0&&(Bt=Bt[Dt]),Bt){w.bindFramebuffer(F.FRAMEBUFFER,Bt);try{const Ht=W.texture,Zt=Ht.format,Jt=Ht.type;if(!ft.textureFormatReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ot>=0&&ot<=W.width-mt&&pt>=0&&pt<=W.height-ct&&F.readPixels(ot,pt,mt,ct,jt.convert(Zt),jt.convert(Jt),Rt)}finally{const Ht=G!==null?ut.get(G).__webglFramebuffer:null;w.bindFramebuffer(F.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(W,ot,pt,mt,ct,Rt,Dt){if(!(W&&W.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=ut.get(W).__webglFramebuffer;if(W.isWebGLCubeRenderTarget&&Dt!==void 0&&(Bt=Bt[Dt]),Bt){const Ht=W.texture,Zt=Ht.format,Jt=Ht.type;if(!ft.textureFormatReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(ot>=0&&ot<=W.width-mt&&pt>=0&&pt<=W.height-ct){w.bindFramebuffer(F.FRAMEBUFFER,Bt);const Gt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Gt),F.bufferData(F.PIXEL_PACK_BUFFER,Rt.byteLength,F.STREAM_READ),F.readPixels(ot,pt,mt,ct,jt.convert(Zt),jt.convert(Jt),0);const he=G!==null?ut.get(G).__webglFramebuffer:null;w.bindFramebuffer(F.FRAMEBUFFER,he);const Ae=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Wm(F,Ae,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Gt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Rt),F.deleteBuffer(Gt),F.deleteSync(Ae),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(W,ot=null,pt=0){W.isTexture!==!0&&(Br("WebGLRenderer: copyFramebufferToTexture function signature has changed."),ot=arguments[0]||null,W=arguments[1]);const mt=Math.pow(2,-pt),ct=Math.floor(W.image.width*mt),Rt=Math.floor(W.image.height*mt),Dt=ot!==null?ot.x:0,Bt=ot!==null?ot.y:0;D.setTexture2D(W,0),F.copyTexSubImage2D(F.TEXTURE_2D,pt,0,0,Dt,Bt,ct,Rt),w.unbindTexture()},this.copyTextureToTexture=function(W,ot,pt=null,mt=null,ct=0){W.isTexture!==!0&&(Br("WebGLRenderer: copyTextureToTexture function signature has changed."),mt=arguments[0]||null,W=arguments[1],ot=arguments[2],ct=arguments[3]||0,pt=null);let Rt,Dt,Bt,Ht,Zt,Jt,Gt,he,Ae;const we=W.isCompressedTexture?W.mipmaps[ct]:W.image;pt!==null?(Rt=pt.max.x-pt.min.x,Dt=pt.max.y-pt.min.y,Bt=pt.isBox3?pt.max.z-pt.min.z:1,Ht=pt.min.x,Zt=pt.min.y,Jt=pt.isBox3?pt.min.z:0):(Rt=we.width,Dt=we.height,Bt=we.depth||1,Ht=0,Zt=0,Jt=0),mt!==null?(Gt=mt.x,he=mt.y,Ae=mt.z):(Gt=0,he=0,Ae=0);const fn=jt.convert(ot.format),de=jt.convert(ot.type);let Vt;ot.isData3DTexture?(D.setTexture3D(ot,0),Vt=F.TEXTURE_3D):ot.isDataArrayTexture||ot.isCompressedArrayTexture?(D.setTexture2DArray(ot,0),Vt=F.TEXTURE_2D_ARRAY):(D.setTexture2D(ot,0),Vt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,ot.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ot.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,ot.unpackAlignment);const oi=F.getParameter(F.UNPACK_ROW_LENGTH),pe=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Dn=F.getParameter(F.UNPACK_SKIP_PIXELS),ws=F.getParameter(F.UNPACK_SKIP_ROWS),gn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,we.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,we.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ht),F.pixelStorei(F.UNPACK_SKIP_ROWS,Zt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Jt);const wr=W.isDataArrayTexture||W.isData3DTexture,Te=ot.isDataArrayTexture||ot.isData3DTexture;if(W.isRenderTargetTexture||W.isDepthTexture){const Zn=ut.get(W),Tr=ut.get(ot),Sn=ut.get(Zn.__renderTarget),Ei=ut.get(Tr.__renderTarget);w.bindFramebuffer(F.READ_FRAMEBUFFER,Sn.__webglFramebuffer),w.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ei.__webglFramebuffer);for(let Ri=0;Ri<Bt;Ri++)wr&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ut.get(W).__webglTexture,ct,Jt+Ri),W.isDepthTexture?(Te&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ut.get(ot).__webglTexture,ct,Ae+Ri),F.blitFramebuffer(Ht,Zt,Rt,Dt,Gt,he,Rt,Dt,F.DEPTH_BUFFER_BIT,F.NEAREST)):Te?F.copyTexSubImage3D(Vt,ct,Gt,he,Ae+Ri,Ht,Zt,Rt,Dt):F.copyTexSubImage2D(Vt,ct,Gt,he,Ae+Ri,Ht,Zt,Rt,Dt);w.bindFramebuffer(F.READ_FRAMEBUFFER,null),w.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Te?W.isDataTexture||W.isData3DTexture?F.texSubImage3D(Vt,ct,Gt,he,Ae,Rt,Dt,Bt,fn,de,we.data):ot.isCompressedArrayTexture?F.compressedTexSubImage3D(Vt,ct,Gt,he,Ae,Rt,Dt,Bt,fn,we.data):F.texSubImage3D(Vt,ct,Gt,he,Ae,Rt,Dt,Bt,fn,de,we):W.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ct,Gt,he,Rt,Dt,fn,de,we.data):W.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ct,Gt,he,we.width,we.height,fn,we.data):F.texSubImage2D(F.TEXTURE_2D,ct,Gt,he,Rt,Dt,fn,de,we);F.pixelStorei(F.UNPACK_ROW_LENGTH,oi),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pe),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Dn),F.pixelStorei(F.UNPACK_SKIP_ROWS,ws),F.pixelStorei(F.UNPACK_SKIP_IMAGES,gn),ct===0&&ot.generateMipmaps&&F.generateMipmap(Vt),w.unbindTexture()},this.copyTextureToTexture3D=function(W,ot,pt=null,mt=null,ct=0){return W.isTexture!==!0&&(Br("WebGLRenderer: copyTextureToTexture3D function signature has changed."),pt=arguments[0]||null,mt=arguments[1]||null,W=arguments[2],ot=arguments[3],ct=arguments[4]||0),Br('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(W,ot,pt,mt,ct)},this.initRenderTarget=function(W){ut.get(W).__webglFramebuffer===void 0&&D.setupRenderTarget(W)},this.initTexture=function(W){W.isCubeTexture?D.setTextureCube(W,0):W.isData3DTexture?D.setTexture3D(W,0):W.isDataArrayTexture||W.isCompressedArrayTexture?D.setTexture2DArray(W,0):D.setTexture2D(W,0),w.unbindTexture()},this.resetState=function(){T=0,L=0,G=null,w.reset(),Wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}class tu{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ut(t),this.near=e,this.far=n}clone(){return new tu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class po extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Al,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new V;class ia{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix4(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyNormalMatrix(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.transformDirection(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ia(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ph=new V,Ih=new ae,Lh=new ae,sy=new V,zh=new Ot,Na=new V,uc=new hn,Dh=new Ot,hc=new _r;class ry extends ie{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ku,this.bindMatrix=new Ot,this.bindMatrixInverse=new Ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ti),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Na),this.boundingBox.expandByPoint(Na)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Na),this.boundingSphere.expandByPoint(Na)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uc.copy(this.boundingSphere),uc.applyMatrix4(s),t.ray.intersectsSphere(uc)!==!1&&(Dh.copy(s).invert(),hc.copy(t.ray).applyMatrix4(Dh),!(this.boundingBox!==null&&hc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,hc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ae,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===ku?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===dm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Ih.fromBufferAttribute(s.attributes.skinIndex,t),Lh.fromBufferAttribute(s.attributes.skinWeight,t),Ph.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=Lh.getComponent(r);if(a!==0){const o=Ih.getComponent(r);zh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(sy.copy(Ph).applyMatrix4(zh),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class tp extends Le{constructor(){super(),this.isBone=!0,this.type="Bone"}}class bs extends je{constructor(t=null,e=1,n=1,s,r,a,o,c,l=$e,u=$e,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const kh=new Ot,ay=new Ot;class eu{constructor(t=[],e=[]){this.uuid=Xn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ot)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ot;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:ay;kh.multiplyMatrices(o,e[r]),kh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new eu(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new bs(e,t,t,Ze,Pn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new tp),this.bones.push(a),this.boneInverses.push(new Ot().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const a=e[s];t.bones.push(a.uuid);const o=n[s];t.boneInverses.push(o.toArray())}return t}}class Ln extends be{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Bs=new Ot,Nh=new Ot,Ua=[],Uh=new Ti,oy=new Ot,Ir=new ie,Lr=new hn;class Ss extends ie{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ln(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,oy)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ti),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Bs),Uh.copy(t.boundingBox).applyMatrix4(Bs),this.boundingBox.union(Uh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Bs),Lr.copy(t.boundingSphere).applyMatrix4(Bs),this.boundingSphere.union(Lr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ir.geometry=this.geometry,Ir.material=this.material,Ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Lr.copy(this.boundingSphere),Lr.applyMatrix4(n),t.ray.intersectsSphere(Lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Bs),Nh.multiplyMatrices(n,Bs),Ir.matrixWorld=Nh,Ir.raycast(t,Ua);for(let a=0,o=Ua.length;a<o;a++){const c=Ua[a];c.instanceId=r,c.object=this,e.push(c)}Ua.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ln(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new bs(new Float32Array(s*this.count),s,this.count,Wl,Pn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ep extends jn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _o=new V,vo=new V,Oh=new Ot,zr=new _r,Oa=new hn,fc=new V,Fh=new V;class nu extends Le{constructor(t=new fe,e=new ep){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)_o.fromBufferAttribute(e,s-1),vo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=_o.distanceTo(vo);t.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(s),Oa.radius+=r,t.ray.intersectsSphere(Oa)===!1)return;Oh.copy(s).invert(),zr.copy(t.ray).applyMatrix4(Oh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=u.getX(x),M=u.getX(x+1),v=Fa(this,t,zr,c,p,M);v&&e.push(v)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(f),p=Fa(this,t,zr,c,x,m);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=Fa(this,t,zr,c,x,x+1);p&&e.push(p)}if(this.isLineLoop){const x=Fa(this,t,zr,c,g-1,f);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fa(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(_o.fromBufferAttribute(a,s),vo.fromBufferAttribute(a,r),e.distanceSqToSegment(_o,vo,fc,Fh)>n)return;fc.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(fc);if(!(c<t.near||c>t.far))return{distance:c,point:Fh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Bh=new V,Hh=new V;class cy extends nu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Bh.fromBufferAttribute(e,s),Hh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bh.distanceTo(Hh);t.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ly extends nu{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class np extends jn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Gh=new Ot,Tl=new _r,Ba=new hn,Ha=new V;class uy extends Le{constructor(t=new fe,e=new np){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ba.copy(n.boundingSphere),Ba.applyMatrix4(s),Ba.radius+=r,t.ray.intersectsSphere(Ba)===!1)return;Gh.copy(s).invert(),Tl.copy(t.ray).applyMatrix4(Gh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,x=f;g<x;g++){const m=l.getX(g);Ha.fromBufferAttribute(h,m),Vh(Ha,m,c,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,x=f;g<x;g++)Ha.fromBufferAttribute(h,g),Vh(Ha,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Vh(i,t,e,n,s,r,a){const o=Tl.distanceSqToPoint(i);if(o<e){const c=new V;Tl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class hy extends je{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new Ct:new V);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new V,s=[],r=[],a=[],o=new V,c=new Ot;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new V)}r[0]=new V,a[0]=new V;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ke(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ke(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class iu extends si{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new Ct){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class fy extends iu{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function su(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Ga=new V,dc=new su,pc=new su,mc=new su;class dy extends si{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new V){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Ga.subVectors(s[0],s[1]).add(s[0]),l=Ga);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Ga.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Ga),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),dc.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,x,m),pc.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,x,m),mc.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(dc.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),pc.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),mc.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(dc.calc(c),pc.calc(c),mc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new V().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Wh(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function py(i,t){const e=1-i;return e*e*t}function my(i,t){return 2*(1-i)*i*t}function gy(i,t){return i*i*t}function Kr(i,t,e,n){return py(i,t)+my(i,e)+gy(i,n)}function xy(i,t){const e=1-i;return e*e*e*t}function _y(i,t){const e=1-i;return 3*e*e*i*t}function vy(i,t){return 3*(1-i)*i*i*t}function yy(i,t){return i*i*i*t}function qr(i,t,e,n,s){return xy(i,t)+_y(i,e)+vy(i,n)+yy(i,s)}class ip extends si{constructor(t=new Ct,e=new Ct,n=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ct){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(qr(t,s.x,r.x,a.x,o.x),qr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class My extends si{constructor(t=new V,e=new V,n=new V,s=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new V){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(qr(t,s.x,r.x,a.x,o.x),qr(t,s.y,r.y,a.y,o.y),qr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sp extends si{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class by extends si{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rp extends si{constructor(t=new Ct,e=new Ct,n=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ct){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Kr(t,s.x,r.x,a.x),Kr(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sy extends si{constructor(t=new V,e=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new V){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Kr(t,s.x,r.x,a.x),Kr(t,s.y,r.y,a.y),Kr(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ap extends si{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Wh(o,c.x,l.x,u.x,h.x),Wh(o,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}}var Xh=Object.freeze({__proto__:null,ArcCurve:fy,CatmullRomCurve3:dy,CubicBezierCurve:ip,CubicBezierCurve3:My,EllipseCurve:iu,LineCurve:sp,LineCurve3:by,QuadraticBezierCurve:rp,QuadraticBezierCurve3:Sy,SplineCurve:ap});class Ay extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Xh[s.type]().fromJSON(s))}return this}}class wy extends Ay{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new sp(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new rp(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new ip(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s),new Ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ap(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new iu(t,e,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ru extends fe{constructor(t=[new Ct(0,-.5),new Ct(.5,0),new Ct(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ke(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/e,h=new V,d=new Ct,f=new V,g=new V,x=new V;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let M=0;M<=e;M++){const v=n+M*u*s,_=Math.sin(v),S=Math.cos(v);for(let T=0;T<=t.length-1;T++){h.x=t[T].x*_,h.y=t[T].y,h.z=t[T].x*S,a.push(h.x,h.y,h.z),d.x=M/e,d.y=T/(t.length-1),o.push(d.x,d.y);const L=c[3*T+0]*_,G=c[3*T+1],E=c[3*T+0]*S;l.push(L,G,E)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){const _=v+M*t.length,S=_,T=_+t.length,L=_+t.length+1,G=_+1;r.push(S,T,G),r.push(L,G,T)}this.setIndex(r),this.setAttribute("position",new Xt(a,3)),this.setAttribute("uv",new Xt(o,2)),this.setAttribute("normal",new Xt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ru(t.points,t.segments,t.phiStart,t.phiLength)}}class au extends ru{constructor(t=1,e=1,n=4,s=8){const r=new wy;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new au(t.radius,t.length,t.capSegments,t.radialSegments)}}class ou extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new V,u=new Ct;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Xt(a,3)),this.setAttribute("normal",new Xt(o,3)),this.setAttribute("uv",new Xt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ou(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ne extends fe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;M(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Xt(h,3)),this.setAttribute("normal",new Xt(d,3)),this.setAttribute("uv",new Xt(f,2));function M(){const _=new V,S=new V;let T=0;const L=(e-t)/n;for(let G=0;G<=r;G++){const E=[],A=G/r,U=A*(e-t)+t;for(let Y=0;Y<=s;Y++){const X=Y/s,J=X*c+o,b=Math.sin(J),z=Math.cos(J);S.x=U*b,S.y=-A*n+m,S.z=U*z,h.push(S.x,S.y,S.z),_.set(b,L,z).normalize(),d.push(_.x,_.y,_.z),f.push(X,1-A),E.push(g++)}x.push(E)}for(let G=0;G<s;G++)for(let E=0;E<r;E++){const A=x[E][G],U=x[E+1][G],Y=x[E+1][G+1],X=x[E][G+1];(t>0||E!==0)&&(u.push(A,U,X),T+=3),(e>0||E!==r-1)&&(u.push(U,Y,X),T+=3)}l.addGroup(p,T,0),p+=T}function v(_){const S=g,T=new Ct,L=new V;let G=0;const E=_===!0?t:e,A=_===!0?1:-1;for(let Y=1;Y<=s;Y++)h.push(0,m*A,0),d.push(0,A,0),f.push(.5,.5),g++;const U=g;for(let Y=0;Y<=s;Y++){const J=Y/s*c+o,b=Math.cos(J),z=Math.sin(J);L.x=E*z,L.y=m*A,L.z=E*b,h.push(L.x,L.y,L.z),d.push(0,A,0),T.x=b*.5+.5,T.y=z*.5*A+.5,f.push(T.x,T.y),g++}for(let Y=0;Y<s;Y++){const X=S+Y,J=U+Y;_===!0?u.push(J,J+1,X):u.push(J+1,J,X),G+=3}l.addGroup(p,G,_===!0?1:2),p+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ys extends Ne{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ys(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Po extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Xt(r,3)),this.setAttribute("normal",new Xt(r.slice(),3)),this.setAttribute("uv",new Xt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const v=new V,_=new V,S=new V;for(let T=0;T<e.length;T+=3)f(e[T+0],v),f(e[T+1],_),f(e[T+2],S),c(v,_,S,M)}function c(M,v,_,S){const T=S+1,L=[];for(let G=0;G<=T;G++){L[G]=[];const E=M.clone().lerp(_,G/T),A=v.clone().lerp(_,G/T),U=T-G;for(let Y=0;Y<=U;Y++)Y===0&&G===T?L[G][Y]=E:L[G][Y]=E.clone().lerp(A,Y/U)}for(let G=0;G<T;G++)for(let E=0;E<2*(T-G)-1;E++){const A=Math.floor(E/2);E%2===0?(d(L[G][A+1]),d(L[G+1][A]),d(L[G][A])):(d(L[G][A+1]),d(L[G+1][A+1]),d(L[G+1][A]))}}function l(M){const v=new V;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(M),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function u(){const M=new V;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];const _=m(M)/2/Math.PI+.5,S=p(M)/Math.PI+.5;a.push(_,1-S)}g(),h()}function h(){for(let M=0;M<a.length;M+=6){const v=a[M+0],_=a[M+2],S=a[M+4],T=Math.max(v,_,S),L=Math.min(v,_,S);T>.9&&L<.1&&(v<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,v){const _=M*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function g(){const M=new V,v=new V,_=new V,S=new V,T=new Ct,L=new Ct,G=new Ct;for(let E=0,A=0;E<r.length;E+=9,A+=6){M.set(r[E+0],r[E+1],r[E+2]),v.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),T.set(a[A+0],a[A+1]),L.set(a[A+2],a[A+3]),G.set(a[A+4],a[A+5]),S.copy(M).add(v).add(_).divideScalar(3);const U=m(S);x(T,A+0,M,U),x(L,A+2,v,U),x(G,A+4,_,U)}}function x(M,v,_,S){S<0&&M.x===1&&(a[v]=M.x-1),_.x===0&&_.z===0&&(a[v]=S/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Po(t.vertices,t.indices,t.radius,t.details)}}class cu extends Po{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cu(t.radius,t.detail)}}class Ji extends Po{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ji(t.radius,t.detail)}}class Io extends fe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=t;const d=(e-t)/s,f=new V,g=new Ct;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const M=p+m,v=M,_=M+n+1,S=M+n+2,T=M+1;o.push(v,_,T),o.push(_,S,T)}}this.setIndex(o),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(l,3)),this.setAttribute("uv",new Xt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Lo extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new V,d=new V,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],v=p/n;let _=0;p===0&&a===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let S=0;S<=e;S++){const T=S/e;h.x=-t*Math.cos(s+T*r)*Math.sin(a+v*o),h.y=t*Math.cos(a+v*o),h.z=t*Math.sin(s+T*r)*Math.sin(a+v*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(T+_,1-v),M.push(l++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const v=u[p][M+1],_=u[p][M],S=u[p+1][M],T=u[p+1][M+1];(p!==0||a>0)&&f.push(v,_,T),(p!==n-1||c<Math.PI)&&f.push(_,S,T)}this.setIndex(f),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(x,3)),this.setAttribute("uv",new Xt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class lu extends jn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zl,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ri extends lu{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ut(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ut(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ut(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class qn extends jn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zl,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=Bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function Va(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ty(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ey(i){function t(s,r){return i[s]-i[r]}const e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function jh(i,t,e){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=e[r]*t;for(let c=0;c!==t;++c)s[a++]=i[o+c]}return s}function op(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push.apply(e,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=i[s++];while(r!==void 0)}class ua{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break e}a=e.length;break n}if(!(t>=r)){const o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ry extends ua{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ys,endingEnd:Ys}}intervalChanged_(t,e,n){const s=this.parameterPositions;let r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ks:r=t,o=2*e-n;break;case go:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ks:a=t,c=2*n-e;break;case go:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}const l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let S=0;S!==o;++S)r[S]=p*a[u+S]+M*a[l+S]+v*a[c+S]+_*a[h+S];return r}}class cp extends ua{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class Cy extends ua{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class ai{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Va(e,this.TimeBufferType),this.values=Va(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Va(t.times,Array),values:Va(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Cy(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new cp(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ry(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ta:e=this.InterpolantFactoryMethodDiscrete;break;case ea:e=this.InterpolantFactoryMethodLinear;break;case No:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ta;case this.InterpolantFactoryMethodLinear:return ea;case this.InterpolantFactoryMethodSmooth:return No}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Ty(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===No,r=t.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const x=e[h+g];if(x!==e[d+g]||x!==e[f+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}}ai.prototype.TimeBufferType=Float32Array;ai.prototype.ValueBufferType=Float32Array;ai.prototype.DefaultInterpolation=ea;class Mr extends ai{constructor(t,e,n){super(t,e,n)}}Mr.prototype.ValueTypeName="bool";Mr.prototype.ValueBufferType=Array;Mr.prototype.DefaultInterpolation=ta;Mr.prototype.InterpolantFactoryMethodLinear=void 0;Mr.prototype.InterpolantFactoryMethodSmooth=void 0;class lp extends ai{}lp.prototype.ValueTypeName="color";class pr extends ai{}pr.prototype.ValueTypeName="number";class Py extends ua{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e);let l=t*o;for(let u=l+o;l!==u;l+=4)_e.slerpFlat(r,0,a,l-o,a,l,c);return r}}class mr extends ai{InterpolantFactoryMethodLinear(t){return new Py(this.times,this.values,this.getValueSize(),t)}}mr.prototype.ValueTypeName="quaternion";mr.prototype.InterpolantFactoryMethodSmooth=void 0;class br extends ai{constructor(t,e,n){super(t,e,n)}}br.prototype.ValueTypeName="string";br.prototype.ValueBufferType=Array;br.prototype.DefaultInterpolation=ta;br.prototype.InterpolantFactoryMethodLinear=void 0;br.prototype.InterpolantFactoryMethodSmooth=void 0;class gr extends ai{}gr.prototype.ValueTypeName="vector";class Ms{constructor(t="",e=-1,n=[],s=ql){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Xn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,s=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Ly(n[a]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,a=n.length;r!==a;++r)e.push(ai.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){const r=e.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Ey(c);c=jh(c,1,u),l=jh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new pr(".morphTargetInfluences["+e[o].name+"]",c,l).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=t.length;o<c;o++){const l=t[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,x){if(f.length!==0){const m=[],p=[];op(f,m,p,g),m.length!==0&&x.push(new h(d,m,p))}},s=[],r=t.name||"default",a=t.fps||30,o=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const v=d[g];m.push(v.time),p.push(v.morphTarget===x?1:0)}s.push(new pr(".morphTargetInfluence["+x+"]",m,p))}c=f.length*a}else{const f=".bones["+e[h].name+"]";n(gr,f+".position",d,"pos",s),n(mr,f+".quaternion",d,"rot",s),n(gr,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,s=t.length;n!==s;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Iy(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return pr;case"vector":case"vector2":case"vector3":case"vector4":return gr;case"color":return lp;case"quaternion":return mr;case"bool":case"boolean":return Mr;case"string":return br}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ly(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Iy(i.type);if(i.times===void 0){const e=[],n=[];op(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const Xi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class zy{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const Dy=new zy;class Sr{constructor(t){this.manager=t!==void 0?t:Dy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Sr.DEFAULT_MATERIAL_NAME="__DEFAULT";const di={};class ky extends Error{constructor(t,e){super(t),this.response=e}}class up extends Sr{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Xi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(di[t]!==void 0){di[t].push({onLoad:e,onProgress:n,onError:s});return}di[t]=[],di[t].push({onLoad:e,onProgress:n,onError:s});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=di[t],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){M();function M(){h.read().then(({done:v,value:_})=>{if(v)p.close();else{x+=_.byteLength;const S=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let T=0,L=u.length;T<L;T++){const G=u[T];G.onProgress&&G.onProgress(S)}p.enqueue(_),M()}},v=>{p.error(v)})}}});return new Response(m)}else throw new ky(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Xi.add(t,l);const u=di[t];delete di[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=di[t];if(u===void 0)throw this.manager.itemError(t),l;delete di[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Ny extends Sr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Xi.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=na("img");function c(){u(),Xi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(h){u(),s&&s(h),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Uy extends Sr{constructor(t){super(t)}load(t,e,n,s){const r=new je,a=new Ny(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class zo extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class hp extends zo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const gc=new Ot,Yh=new V,Kh=new V;class uu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vr,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Yh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Yh),Kh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kh),e.updateMatrixWorld(),gc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(gc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Oy extends uu{constructor(){super(new an(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=fr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Fy extends zo{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Oy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const qh=new Ot,Dr=new V,xc=new V;class By extends uu{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new ae(2,1,1,1),new ae(0,1,1,1),new ae(3,1,1,1),new ae(1,1,1,1),new ae(3,0,1,1),new ae(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Dr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Dr),xc.copy(n.position),xc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(xc),n.updateMatrixWorld(),s.makeTranslation(-Dr.x,-Dr.y,-Dr.z),qh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qh)}}class Hy extends zo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new By}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Gy extends uu{constructor(){super(new Eo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hu extends zo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new Gy}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Zr{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,s=t.length;n<s;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class El extends fe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Vy extends Sr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Xi.get(t);if(a!==void 0){if(r.manager.itemStart(t),a.then){a.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Xi.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Xi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});Xi.add(t,c),r.manager.itemStart(t)}}class Wy{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Zh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Zh(){return performance.now()}class Xy{constructor(t,e,n){this.binding=t,this.valueSize=n;let s,r,a;switch(e){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,s=this.valueSize,r=t*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,s=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=e*this._origIndex;this._mixBufferRegion(n,s,c,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){o.setValue(n,s);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,s=n*this._origIndex;t.getValue(e,s);for(let r=n,a=s;r!==a;++r)e[r]=e[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,s){_e.slerpFlat(t,e,t,e,t,n,s)}_slerpAdditive(t,e,n,s,r){const a=this._workIndex*r;_e.multiplyQuaternionsFlat(t,a,t,e,t,n),_e.slerpFlat(t,e,t,e,t,a,s)}_lerp(t,e,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=e+o;t[c]=t[c]*a+t[n+o]*s}}_lerpAdditive(t,e,n,s,r){for(let a=0;a!==r;++a){const o=e+a;t[o]=t[o]+t[n+a]*s}}}const fu="\\[\\]\\.:\\/",jy=new RegExp("["+fu+"]","g"),du="[^"+fu+"]",Yy="[^"+fu.replace("\\.","")+"]",Ky=/((?:WC+[\/:])*)/.source.replace("WC",du),qy=/(WCOD+)?/.source.replace("WCOD",Yy),Zy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",du),$y=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",du),Jy=new RegExp("^"+Ky+qy+Zy+$y+"$"),Qy=["material","materials","bones","map"];class t1{constructor(t,e,n){const s=n||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class me{constructor(t,e,n){this.path=e,this.parsedPath=n||me.parseTrackName(e),this.node=me.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new me.Composite(t,e,n):new me(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(jy,"")}static parseTrackName(t){const e=Jy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Qy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===e||o.uuid===e)return o;const c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=me.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[s];if(a===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}me.Composite=t1;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class e1{constructor(t,e,n=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=s;const r=e.tracks,a=r.length,o=new Array(a),c={endingStart:Ys,endingEnd:Ys};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=pm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const s=this._clip.duration,r=t._clip.duration,a=r/s,o=s/r;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=t/a,l[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,s){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const c=(t-r)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case gm:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case ql:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(s,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let s=this.time+t,r=this._loopCount;const a=n===mm;if(t===0)return r===-1?s:a&&(r&1)===1?e-s:s;if(n===Kl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else if(s<0)s=0;else{this.time=s;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=e||s<0){const o=Math.floor(s/e);s-=e*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return e-s}return s}_setEndings(t,e,n){const s=this._interpolantSettings;n?(s.endingStart=Ks,s.endingEnd=Ks):(t?s.endingStart=this.zeroSlopeAtStart?Ks:Ys:s.endingStart=go,e?s.endingEnd=this.zeroSlopeAtEnd?Ks:Ys:s.endingEnd=go)}_scheduleFading(t,e,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=e,o[1]=r+t,c[1]=n,this}}const n1=new Float32Array(1);class pu extends Qi{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,s=t._clip.tracks,r=s.length,a=t._propertyBindings,o=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=s[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const x=e&&e._propertyBindings[h].binding.parsedPath;g=new Xy(me.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,s=t._clip.uuid,r=this._actionsByClip[s];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,s,n)}const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const s=this._actions,r=this._actionsByClip;let a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=s.length,s.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],s=t._cacheIndex;n._cacheIndex=s,e[s]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=t._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),t._byClipCacheIndex=null;const h=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[e];a===void 0&&(a={},s[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new cp(new Float32Array(2),new Float32Array(2),1,n1),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const s=e||this._root,r=s.uuid;let a=typeof t=="string"?Ms.findByName(s,t):t;const o=a!==null?a.uuid:t,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=ql),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new e1(this,a,e,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(t,e){const n=e||this._root,s=n.uuid,r=typeof t=="string"?Ms.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,s=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(s,t,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,e[u]=h,e.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[e];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class i1 extends Qd{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const $h=new Ot;class s1{constructor(t,e,n=0,s=1/0){this.ray=new _r(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return $h.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($h),this}intersectObject(t,e=!0,n=[]){return Rl(t,this,n,e),n.sort(Jh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Rl(t[s],this,n,e);return n.sort(Jh),n}}function Jh(i,t){return i.distance-t.distance}function Rl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Rl(r[a],t,e,!0)}}class Qh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ke(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class r1 extends Qi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ol}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ol);const tf={type:"change"},mu={type:"start"},fp={type:"end"},Wa=new _r,ef=new Gi,a1=Math.cos(70*bi.DEG2RAD),Ge=new V,dn=2*Math.PI,Me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_c=1e-6;class o1 extends r1{constructor(t,e=null){super(t,e),this.state=Me.NONE,this.enabled=!0,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:tr.ROTATE,MIDDLE:tr.DOLLY,RIGHT:tr.PAN},this.touches={ONE:Wi.ROTATE,TWO:Wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new _e,this._lastTargetPosition=new V,this._quat=new _e().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Qh,this._sphericalDelta=new Qh,this._scale=1,this._panOffset=new V,this._rotateStart=new Ct,this._rotateEnd=new Ct,this._rotateDelta=new Ct,this._panStart=new Ct,this._panEnd=new Ct,this._panDelta=new Ct,this._dollyStart=new Ct,this._dollyEnd=new Ct,this._dollyDelta=new Ct,this._dollyDirection=new V,this._mouse=new Ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=l1.bind(this),this._onPointerDown=c1.bind(this),this._onPointerUp=u1.bind(this),this._onContextMenu=x1.bind(this),this._onMouseWheel=d1.bind(this),this._onKeyDown=p1.bind(this),this._onTouchStart=m1.bind(this),this._onTouchMove=g1.bind(this),this._onMouseDown=h1.bind(this),this._onMouseMove=f1.bind(this),this._interceptControlDown=_1.bind(this),this._interceptControlUp=v1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(tf),this.update(),this.state=Me.NONE}update(t=null){const e=this.object.position;Ge.copy(e).sub(this.target),Ge.applyQuaternion(this._quat),this._spherical.setFromVector3(Ge),this.autoRotate&&this.state===Me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=dn:n>Math.PI&&(n-=dn),s<-Math.PI?s+=dn:s>Math.PI&&(s-=dn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ge.setFromSpherical(this._spherical),Ge.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ge),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ge.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new V(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new V(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ge.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Wa.origin.copy(this.object.position),Wa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wa.direction))<a1?this.object.lookAt(this.target):(ef.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wa.intersectPlane(ef,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_c||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_c||this._lastTargetPosition.distanceToSquared(this.target)>_c?(this.dispatchEvent(tf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?dn/60*this.autoRotateSpeed*t:dn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ge.setFromMatrixColumn(e,0),Ge.multiplyScalar(-t),this._panOffset.add(Ge)}_panUp(t,e){this.screenSpacePanning===!0?Ge.setFromMatrixColumn(e,1):(Ge.setFromMatrixColumn(e,0),Ge.crossVectors(this.object.up,Ge)),Ge.multiplyScalar(t),this._panOffset.add(Ge)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ge.copy(s).sub(this.target);let r=Ge.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function c1(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function l1(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function u1(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fp),this.state=Me.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function h1(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case tr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Me.DOLLY;break;case tr.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Me.ROTATE}break;case tr.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Me.PAN}break;default:this.state=Me.NONE}this.state!==Me.NONE&&this.dispatchEvent(mu)}function f1(i){switch(this.state){case Me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function d1(i){this.enabled===!1||this.enableZoom===!1||this.state!==Me.NONE||(i.preventDefault(),this.dispatchEvent(mu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fp))}function p1(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function m1(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Me.TOUCH_ROTATE;break;case Wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Me.TOUCH_PAN;break;default:this.state=Me.NONE}break;case 2:switch(this.touches.TWO){case Wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Me.TOUCH_DOLLY_PAN;break;case Wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Me.TOUCH_DOLLY_ROTATE;break;default:this.state=Me.NONE}break;default:this.state=Me.NONE}this.state!==Me.NONE&&this.dispatchEvent(mu)}function g1(i){switch(this._trackPointer(i),this.state){case Me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Me.NONE}}function x1(i){this.enabled!==!1&&i.preventDefault()}function _1(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function v1(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function As(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new fe;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=nf(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let x=0;x<a[u].length;++x)f.push(a[u][x][d]);const g=nf(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function nf(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new be(a,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){const x=u.getComponent(d,g);o.setComponent(d+h,g,x)}}else a.set(u.array,c);c+=u.count*e}return s!==void 0&&(o.gpuType=s),o}function sf(i,t){if(t===xm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Sl||t===Nd){let e=i.getIndex();if(e===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=e.count-2,s=[];if(t===Sl)for(let a=1;a<=n;a++)s.push(e.getX(0)),s.push(e.getX(a)),s.push(e.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(e.getX(a)),s.push(e.getX(a+1)),s.push(e.getX(a+2))):(s.push(e.getX(a+2)),s.push(e.getX(a+1)),s.push(e.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}class Cl extends Sr{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new A1(e)}),this.register(function(e){return new w1(e)}),this.register(function(e){return new D1(e)}),this.register(function(e){return new k1(e)}),this.register(function(e){return new N1(e)}),this.register(function(e){return new E1(e)}),this.register(function(e){return new R1(e)}),this.register(function(e){return new C1(e)}),this.register(function(e){return new P1(e)}),this.register(function(e){return new S1(e)}),this.register(function(e){return new I1(e)}),this.register(function(e){return new T1(e)}),this.register(function(e){return new z1(e)}),this.register(function(e){return new L1(e)}),this.register(function(e){return new M1(e)}),this.register(function(e){return new U1(e)}),this.register(function(e){return new O1(e)})}load(t,e,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Zr.extractUrlBase(t);a=Zr.resolveURL(l,this.path)}else a=Zr.extractUrlBase(t);this.manager.itemStart(t);const o=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new up(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,a,function(u){e(u),r.manager.itemEnd(t)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===dp){try{a[re.KHR_BINARY_GLTF]=new F1(t)}catch(h){s&&s(h);return}r=JSON.parse(a[re.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new J1(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case re.KHR_MATERIALS_UNLIT:a[h]=new b1;break;case re.KHR_DRACO_MESH_COMPRESSION:a[h]=new B1(r,this.dracoLoader);break;case re.KHR_TEXTURE_TRANSFORM:a[h]=new H1;break;case re.KHR_MESH_QUANTIZATION:a[h]=new G1;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(t,e){const n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}}function y1(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const re={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class M1{constructor(t){this.parser=t,this.name=re.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let s=e.cache.get(n);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new Ut(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],ln);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new hu(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Hy(u),l.distance=h;break;case"spot":l=new Fy(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,_i(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(e.cache,o,c)})}}class b1{constructor(){this.name=re.KHR_MATERIALS_UNLIT}getMaterialType(){return Xe}extendParams(t,e,n){const s=[];t.color=new Ut(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],ln),t.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,Be))}return Promise.all(s)}}class S1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class A1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(e.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Ct(o,o)}return Promise.all(r)}}class w1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class T1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(e.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(e.iridescenceIOR=a.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class E1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new Ut(0,0,0),e.sheenRoughness=0,e.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],ln)}return a.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",a.sheenColorTexture,Be)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class R1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(e.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class C1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",a.thicknessTexture)),e.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return e.attenuationColor=new Ut().setRGB(o[0],o[1],o[2],ln),Promise.all(r)}}class P1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class I1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return e.specularColor=new Ut().setRGB(o[0],o[1],o[2],ln),a.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",a.specularColorTexture,Be)),Promise.all(r)}}class L1{constructor(t){this.parser=t,this.name=re.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return e.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",a.bumpTexture)),Promise.all(r)}}class z1{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:ri}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(e.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(e.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class D1{constructor(t){this.parser=t,this.name=re.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,a)}}class k1{constructor(t){this.parser=t,this.name=re.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class N1{constructor(t){this.parser=t,this.name=re.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class U1{constructor(t){this.name=re.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class O1{constructor(t){this.name=re.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=e.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Rn.TRIANGLES&&l.mode!==Rn.TRIANGLE_STRIP&&l.mode!==Rn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const g of h){const x=new Ot,m=new V,p=new _e,M=new V(1,1,1),v=new Ss(g.geometry,g.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),v.setMatrixAt(_,x.compose(m,p,M));for(const _ in c)if(_==="_COLOR_0"){const S=c[_];v.instanceColor=new Ln(S.array,S.itemSize,S.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);Le.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),f.push(v)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const dp="glTF",kr=12,rf={JSON:1313821514,BIN:5130562};class F1{constructor(t){this.name=re.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,kr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==dp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-kr,r=new DataView(t,kr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===rf.JSON){const l=new Uint8Array(t,kr+a,o);this.content=n.decode(l)}else if(c===rf.BIN){const l=kr+a;this.body=t.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class B1{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=re.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Pl[u]||u.toLowerCase();o[h]=a[u]}for(const u in t.attributes){const h=Pl[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[t.attributes[u]],f=sr[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const g in f.attributes){const x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}h(f)},o,l,ln,d)})})}}class H1{constructor(){this.name=re.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class G1{constructor(){this.name=re.KHR_MESH_QUANTIZATION}}class pp extends ua{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let a=0;a!==s;a++)e[a]=n[r+a];return e}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-e,h=(n-e)/u,d=h*h,f=d*h,g=t*l,x=g-l,m=-2*f+3*d,p=f-d,M=1-m,v=p-d+h;for(let _=0;_!==o;_++){const S=a[x+_+o],T=a[x+_+c]*u,L=a[g+_+o],G=a[g+_]*u;r[_]=M*S+v*T+m*L+p*G}return r}}const V1=new _e;class W1 extends pp{interpolate_(t,e,n,s){const r=super.interpolate_(t,e,n,s);return V1.fromArray(r).normalize().toArray(r),r}}const Rn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},sr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},af={9728:$e,9729:We,9984:Td,9985:ao,9986:Fr,9987:yn},of={33071:ei,33648:mo,10497:$i},vc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},X1={CUBICSPLINE:void 0,LINEAR:ea,STEP:ta},yc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function j1(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new lu({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ai})),i.DefaultMaterial}function as(i,t,e){for(const n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function _i(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function Y1(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(n){const d=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function K1(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function q1(i){let t;const e=i.extensions&&i.extensions[re.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Mc(e.attributes):t=i.indices+":"+Mc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+Mc(i.targets[n]);return t}function Mc(i){let t="";const e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function Il(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Z1(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const $1=new Ot;class J1{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new y1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Uy(this.options.manager):this.textureLoader=new Vy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new up(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return as(r,o,s),_i(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const a=e[s].joints;for(let o=0,c=a.length;o<c;o++)t[a[o]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const a=t[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const s=t(e[n]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[re.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Zr.resolveURL(e.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){const e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const a=vc[s.type],o=sr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new be(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=vc[s.type],l=sr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(f&&f!==h){const p=Math.floor(d/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let v=e.cache.get(M);v||(x=new l(o,p*f,s.count*f/u),v=new Qd(x,f/u),e.cache.add(M,v)),m=new ia(v,c,d%f/u,g)}else o===null?x=new l(s.count*c):x=new l(o,d,s.count*c),m=new be(x,c,g);if(s.sparse!==void 0){const p=vc.SCALAR,M=sr[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,S=new M(a[1],v,s.sparse.count*p),T=new l(a[2],_,s.sparse.count*c);o!==null&&(m=new be(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,G=S.length;L<G;L++){const E=S[L];if(m.setX(E,T[L*c]),c>=2&&m.setY(E,T[L*c+1]),c>=3&&m.setZ(E,T[L*c+2]),c>=4&&m.setW(E,T[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,a=e.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(t,r,o)}loadTextureImage(t,e,n){const s=this,r=this.json,a=r.textures[t],o=r.images[e],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=af[d.magFilter]||We,u.minFilter=af[d.minFilter]||yn,u.wrapS=of[d.wrapS]||$i,u.wrapT=of[d.wrapT]||$i,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==$e&&u.minFilter!==We,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const a=s.images[t],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;e.isImageBitmapLoader===!0&&(g=function(x){const m=new je(x);m.needsUpdate=!0,d(m)}),e.load(Zr.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),_i(h,a),h.userData.mimeType=a.mimeType||Z1(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[re.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[re.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[re.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new np,jn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ep,jn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return lu}loadMaterial(t){const e=this,n=this.json,s=this.extensions,r=n.materials[t];let a;const o={},c=r.extensions||{},l=[];if(c[re.KHR_MATERIALS_UNLIT]){const h=s[re.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,e))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Ut(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],ln),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(o,"map",h.baseColorTexture,Be)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,o)})))}r.doubleSided===!0&&(o.side=on);const u=r.alphaMode||yc.OPAQUE;if(u===yc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===yc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Xe&&(l.push(e.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ct(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Xe&&(l.push(e.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Xe){const h=r.emissiveFactor;o.emissive=new Ut().setRGB(h[0],h[1],h[2],ln)}return r.emissiveTexture!==void 0&&a!==Xe&&l.push(e.assignTexture(o,"emissiveMap",r.emissiveTexture,Be)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),_i(h,r),e.associations.set(h,{materials:t}),r.extensions&&as(s,h,r),h})}createUniqueName(t){const e=me.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[re.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(c){return cf(c,o,e)})}const a=[];for(let o=0,c=t.length;o<c;o++){const l=t[o],u=q1(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[re.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=cf(new fe,l,e),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,s=this.extensions,r=n.meshes[t],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?j1(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(e.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){const x=u[f],m=a[f];let p;const M=l[f];if(m.mode===Rn.TRIANGLES||m.mode===Rn.TRIANGLE_STRIP||m.mode===Rn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new ry(x,M):new ie(x,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Rn.TRIANGLE_STRIP?p.geometry=sf(p.geometry,Nd):m.mode===Rn.TRIANGLE_FAN&&(p.geometry=sf(p.geometry,Sl));else if(m.mode===Rn.LINES)p=new cy(x,M);else if(m.mode===Rn.LINE_STRIP)p=new nu(x,M);else if(m.mode===Rn.LINE_LOOP)p=new ly(x,M);else if(m.mode===Rn.POINTS)p=new uy(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&K1(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),_i(p,r),m.extensions&&as(s,p,m),e.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)e.associations.set(h[f],{meshes:t,primitives:f});if(h.length===1)return r.extensions&&as(s,h[0],r),h[0];const d=new Pe;r.extensions&&as(s,d,r),e.associations.set(d,{meshes:t});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new an(bi.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Eo(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),_i(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Ot;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new eu(o,c)})}loadAnimation(t){const e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(g),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let M=0,v=d.length;M<v;M++){const _=d[M],S=f[M],T=g[M],L=x[M],G=m[M];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const E=n._createAnimationTracks(_,S,T,L,G);if(E)for(let A=0;A<E.length;A++)p.push(E[A])}return new Ms(r,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(t){const e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,$1)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){o.push(l)}),this.nodeCache[t]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new tp:l.length>1?u=new Pe:l.length===1?u=l[0]:u=new Le,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),_i(u,r),r.extensions&&as(n,u,r),r.matrix!==void 0){const h=new Ot;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],s=this,r=new Pe;n.name&&(r.name=s.createUniqueName(n.name)),_i(r,n),n.extensions&&as(e,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof jn||d instanceof je)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){const a=[],o=t.name?t.name:t.uuid,c=[];ki[r.path]===ki.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(ki[r.path]){case ki.weights:l=pr;break;case ki.rotation:l=mr;break;case ki.position:case ki.scale:l=gr;break;default:switch(n.itemSize){case 1:l=pr;break;case 2:case 3:default:l=gr;break}break}const u=s.interpolation!==void 0?X1[s.interpolation]:ea,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+ki[r.path],e.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Il(e.constructor),s=new Float32Array(e.length);for(let r=0,a=e.length;r<a;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const s=this instanceof mr?W1:pp;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Q1(i,t,e){const n=t.attributes,s=new Ti;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new V(c[0],c[1],c[2]),new V(l[0],l[1],l[2])),o.normalized){const u=Il(sr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const o=new V,c=new V;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=e.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const x=Il(sr[d.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new hn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function cf(i,t,e){const n=t.attributes,s=[];function r(a,o){return e.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=Pl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(t.indices!==void 0&&!i.index){const a=e.getDependency("accessor",t.indices).then(function(o){i.setIndex(o)});s.push(a)}return oe.workingColorSpace!==ln&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${oe.workingColorSpace}" not supported.`),_i(i,t),Q1(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?Y1(i,t.targets,e):i})}const gu=["rendah","sedang","tinggi"],mp="pulau-tropis:kualitas",tM={rendah:{maxPixelRatio:1.25,terrainSegments:200,shadows:!1,shadowMapSize:0,softShadows:!1,treeDensity:.75,canopyDetail:0,grass:{radius:70,near:9,density:1.6,blades:4,max:4e3,shadows:!1},caustics:!1,water:{segments:128,detailLayers:1,cloudReflection:!1,wetSand:!1,shoreRes:256}},sedang:{maxPixelRatio:1.5,terrainSegments:256,shadows:!0,shadowMapSize:1024,softShadows:!0,treeDensity:1,canopyDetail:0,grass:{radius:120,near:13,density:2.4,blades:6,max:9e3,shadows:!1},caustics:!0,water:{segments:192,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}},tinggi:{maxPixelRatio:2,terrainSegments:384,shadows:!0,shadowMapSize:2048,softShadows:!0,treeDensity:1.5,canopyDetail:1,grass:{radius:170,near:18,density:3.2,blades:8,max:26e3,shadows:!0},caustics:!0,water:{segments:240,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}}},gp=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&window.matchMedia("(pointer: coarse)").matches;function eM(){try{return localStorage.getItem(mp)}catch{return null}}function nM(){const i=new URLSearchParams(location.hash.slice(1)).get("kualitas"),t=new URLSearchParams(location.search).get("kualitas");for(const e of[i,t,eM()])if(gu.includes(e))return e;return gp?"sedang":"tinggi"}const lf=nM(),Re={isMobile:gp,level:lf,levels:gu,...tM[lf]};function iM(i){if(gu.includes(i)){try{localStorage.setItem(mp,i)}catch{}try{const t=new URL(location.href);t.searchParams.delete("kualitas"),t.hash=`kualitas=${i}`,history.replaceState(null,"",t)}catch{location.hash=`kualitas=${i}`}location.reload()}}function Xa(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const uf=i=>i*i*(3-2*i),ja=(i,t)=>(i%t+t)%t;function sM(i,t,e,n){const s=Math.floor(i),r=Math.floor(t),a=uf(i-s),o=uf(t-r),c=ja(s,e),l=ja(s+1,e),u=ja(r,e),h=ja(r+1,e),d=Xa(c,u,n),f=Xa(l,u,n),g=Xa(c,h,n),x=Xa(l,h,n);return d+(f-d)*a+(g-d)*o+(d-f-g+x)*a*o}function Zs(i,t,e,n,s){let r=0,a=.5,o=0,c=e;for(let l=0;l<n;l++)r+=a*sM(i*c,t*c,c,s+l*13),o+=a,a*=.5,c*=2;return r/o}function xp(i){let t=1/0,e=-1/0;for(const s of i)s<t&&(t=s),s>e&&(e=s);const n=1/Math.max(1e-6,e-t);for(let s=0;s<i.length;s++)i[s]=(i[s]-t)*n}function rM(i,t=256){const e=t*t,n=[new Float32Array(e),new Float32Array(e),new Float32Array(e),new Float32Array(e)];for(let a=0;a<t;a++)for(let o=0;o<t;o++){const c=o/t,l=a/t,u=a*t+o;n[0][u]=Zs(c,l,32,3,1),n[1][u]=Zs(c,l,8,4,2),n[2][u]=Zs(c,l,4,3,3),n[3][u]=1-Math.abs(Zs(c,l,6,3,4)*2-1)}n.forEach(xp);const s=new Uint8Array(e*4);for(let a=0;a<e;a++)for(let o=0;o<4;o++)s[a*4+o]=Math.round(n[o][a]*255);const r=new bs(s,t,t,Ze,zn);return r.wrapS=r.wrapT=$i,r.magFilter=We,r.minFilter=yn,r.generateMipmaps=!0,r.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),r.needsUpdate=!0,r}function aM(i,t=256){const e=new Float32Array(t*t);for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=c/t,u=o/t,h=Zs(l,u,6,4,21),d=1-Math.abs(Zs(l,u,9,3,37)*2-1);e[o*t+c]=h*.6+d*.4}xp(e);const n=new Uint8Array(t*t*4),s=(o,c)=>e[(c+t)%t*t+(o+t)%t],r=5;for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=-(s(c+1,o)-s(c-1,o))*r,u=-(s(c,o+1)-s(c,o-1))*r,h=Math.hypot(l,u,1),d=(o*t+c)*4;n[d]=Math.round((l/h*.5+.5)*255),n[d+1]=Math.round((u/h*.5+.5)*255),n[d+2]=Math.round((1/h*.5+.5)*255),n[d+3]=255}const a=new bs(n,t,t,Ze,zn);return a.wrapS=a.wrapT=$i,a.magFilter=We,a.minFilter=yn,a.generateMipmaps=!0,a.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),a.needsUpdate=!0,a}function sa(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const oM=(i,t)=>(Math.imul(i|0,73856093)^Math.imul(t|0,19349663))>>>0,hf=(i,t)=>(i+32768)*65536+(t+32768);class cM{constructor(t=8){this.cell=t,this.cells=new Map,this.maxRadius=0}add(t,e,n,s){const r=hf(Math.floor(t/this.cell),Math.floor(e/this.cell));let a=this.cells.get(r);a||this.cells.set(r,a=[]),a.push({x:t,z:e,radius:n,kind:s}),this.maxRadius=Math.max(this.maxRadius,n)}forEachNear(t,e,n,s){const r=n+this.maxRadius,a=Math.floor((t-r)/this.cell),o=Math.floor((t+r)/this.cell),c=Math.floor((e-r)/this.cell),l=Math.floor((e+r)/this.cell);for(let u=a;u<=o;u++)for(let h=c;h<=l;h++){const d=this.cells.get(hf(u,h));if(d){for(const f of d)if(s(f)===!1)return!1}}return!0}isFree(t,e,n){return this.forEachNear(t,e,n,s=>{const r=s.x-t,a=s.z-e,o=s.radius+n;return r*r+a*a>=o*o})}covered(t,e,n,s=1){return!this.forEachNear(t,e,0,r=>{if(r.kind!==n)return!0;const a=r.x-t,o=r.z-e,c=r.radius*s;return a*a+o*o>=c*c})}}function Cn({ground:i,grid:t,kind:e,count:n,seed:s,radius:r,accept:a,area:o=370,cx:c=0,cz:l=0,reserved:u=null}){const h=sa(s),d=[];for(let f=0;d.length<n&&f<n*150;f++){const g=o*Math.sqrt(h()),x=h()*Math.PI*2,m=c+Math.cos(x)*g,p=l+Math.sin(x)*g,M=i.heightAt(m,p);if(!a(m,p,M,i.slopeAt(m,p),h))continue;const v=typeof r=="function"?r(h):r;if(!t.isFree(m,p,v))continue;t.add(m,p,v,e);const _={x:m,y:M,z:p,r:v,a:h(),b:h(),c:h()};u!=null&&u(m,p,v)||d.push(_)}return d}function Ya(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const ff=i=>i*i*(3-2*i);function _p(i,t,e=1){const n=Math.floor(i),s=Math.floor(t),r=ff(i-n),a=ff(t-s),o=Ya(n,s,e),c=Ya(n+1,s,e),l=Ya(n,s+1,e),u=Ya(n+1,s+1,e);return o+(c-o)*r+(l-o)*a+(o-c-l+u)*r*a}function ni(i,t,e=4,n=1){let s=0,r=.5,a=1,o=0;for(let c=0;c<e;c++)s+=r*_p(i*a,t*a,n+c*17),o+=r,r*=.5,a*=2.03;return s/o}const Ve=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},Ie={size:1e3,seaLevel:0,seaFloor:-18,beachTop:2.2,peak:{x:70,z:-60}};function vp(i,t){const e=Math.hypot(i,t),s=230+(ni(i*.0035+3.1,t*.0035-7.4,3,7)-.5)*220,r=e/s;let a=Ie.seaFloor+(Ie.seaFloor*-1-1.2)*Ve(1.38,1.02,r);a+=3.6*Ve(1.04,.87,r);const o=Ve(.92,.45,r),c=ni(i*.011+10,t*.011-5,5,3);a+=o*o*c*26;const l=i-Ie.peak.x,u=t-Ie.peak.z,h=Math.exp(-(l*l+u*u)/(2*75*75)),d=.7+.6*ni(i*.03,t*.03,4,11);return a+=o*h*70*d,a+=(ni(i*.08,t*.08,2,21)-.5)*.8*o,a}const Ar=[{id:"kencana",name:"Pulau Kencana",x:-560,z:40,r:255,wobble:.07,hills:7,seed:51},{id:"sawah",name:"Pulau Sawah",x:-660,z:-345,r:100,wobble:.1,hills:3,seed:52},{id:"nelayan",name:"Pulau Nelayan",x:-760,z:360,r:88,wobble:.1,hills:3,seed:53},{id:"pura",name:"Pulau Pura",x:-890,z:110,r:50,wobble:.12,hills:13,seed:54},{id:"wira",name:"Pulau Wira",x:-270,z:470,rx:360,rz:185,r:360,wobble:.05,hills:2,seed:55,forest:.25}],Se={x0:-700,x1:-420,z0:-60,z1:140,y:5.5},lM=[{id:"timur",x:-420,z:40,w:10,axis:"x"},{id:"barat",x:-700,z:110,w:7,axis:"x"},{id:"utara",x:-647,z:-60,w:7,axis:"z"},{id:"selatan",x:-553,z:140,w:8,axis:"z"}],yp={x0:-689,x1:-602,z0:-1,z1:81,gate:{x:-602,z:40}},df={x0:-588,x1:-508,z0:-1,z1:81},uM={x0:-500,x1:-430,z0:-50,z1:31,x:-465,z:-10},hM={x0:-500,x1:-430,z0:47,z1:82},Gr={x:-893,z:110,r:21},Mn={x0:-490,x1:-50,z0:370,z1:577,y:4.2},Mp=[[-4.6,-3.2],[4.6,-3.2],[4.6,3.2],[-4.6,3.2],[-10.6,-5.3],[0,-5.3],[10.6,-5.3],[-10.6,0],[10.6,0],[-10.6,5.3],[10.6,5.3]],yo=[{id:"tenda",x0:-578,x1:-508,z0:392,z1:556},{id:"kandang",x0:-32,x1:34,z0:392,z1:540}],pf=[[-694,-54],[-426,-54],[-426,134],[-694,134]],fM=[...pf.map((i,t)=>[...i,...pf[(t+1)%4],5]),[-694,-29,-504,-29,5],[-694,-5,-504,-5,6],[-694,85,-426,85,6],[-694,110,-426,110,5],[-647,-54,-647,-5,5],[-600,-54,-600,-5,5],[-553,-54,-553,-5,5],[-647,85,-647,134,5],[-600,85,-600,134,5],[-553,85,-553,134,5],[-504,-54,-504,134,6],[-420,40,-508,40,10],[-508,40,-602,40,8],[-420,40,-300,40,7],[-553,134,-553,282,6],[-647,-54,-647,-195,5],[-694,110,-800,110,5],[-730,110,-730,228,5]],bp=[{id:"agung",name:"Jembatan Agung",axis:"x",at:40,from:-360,to:-160,width:7,rise:2.2,stone:!0},{id:"sawah",name:"Jembatan Sawah",axis:"z",at:-646,from:-150,to:-280,width:4.6,rise:1.2},{id:"pura",name:"Jembatan Pura",axis:"x",at:110,from:-770,to:-880,width:4.6,rise:1.2},{id:"nelayan",name:"Jembatan Nelayan",axis:"z",at:-730,from:200,to:300,width:4.6,rise:1.2},{id:"wira",name:"Jembatan Wira",axis:"z",at:-470,from:230,to:360,width:6,rise:1.6}],mf=i=>Ar.find(t=>t.id===i);function Sp(i,t,e,n,s,r){const a=s-e,o=r-n,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/(a*a+o*o||1)));return Math.hypot(e+a*c-i,n+o*c-t)}function qi(i,t,e){const n=Math.max(e.x0-i,i-e.x1),s=Math.max(e.z0-t,t-e.z1);return Math.hypot(Math.max(n,0),Math.max(s,0))+Math.min(Math.max(n,s),0)}const xs=(i,t,e,n=0)=>i>=e.x0-n&&i<=e.x1+n&&t>=e.z0-n&&t<=e.z1+n,$s=-18,Ka={x0:-1e3,x1:240,z0:-500,z1:750},$r=2,dM=8.5,pM=[{...Mn,z0:Mn.z0-42},...yo];function ha(i,t,e){return i.rx?Math.hypot((t-i.x)/i.rx,(e-i.z)/i.rz):Math.sqrt((t-i.x)**2+(e-i.z)**2)/i.r}function mM(i,t,e){let n;if(i.rx){const a=ha(i,t,e);if(a>(1+i.wobble)*1.38)return $s;const o=ni(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed);n=a/(1+(o-.5)*2*i.wobble)}else{const a=t-i.x,o=e-i.z,c=i.r*(1+i.wobble)*1.38,l=a*a+o*o;if(l>c*c)return $s;const u=ni(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed);n=Math.sqrt(l)/(i.r*(1+(u-.5)*2*i.wobble))}let s=$s+(-$s-1.2)*Ve(1.38,1.02,n);s+=3.6*Ve(1.04,.87,n);const r=Ve(.92,.45,n);if(s+=r*r*ni(t*.012+i.seed,e*.012-i.seed*2,4,i.seed+9)*i.hills,s+=(ni(t*.08,e*.08,2,21+i.seed)-.5)*.5*r,i.id==="kencana"){const a=(1-Ve(8,35,qi(t,e,Se)))*Ve(.95,.8,n);s+=(Se.y-s)*a}else if(i.id==="pura"){const a=1-Ve(Gr.r*.7,Gr.r*1.25,Math.hypot(t-Gr.x,e-Gr.z));s+=(dM-s)*a}else if(i.id==="wira"){let a=1/0;for(const c of pM)a=Math.min(a,qi(t,e,c));const o=(1-Ve(6,30,a))*Ve(.95,.82,n);s+=(Mn.y-s)*o}return s}function gM(i,t){if(i<Ka.x0||i>Ka.x1||t<Ka.z0||t>Ka.z1)return $s;let e=$s;for(const n of Ar)e=Math.max(e,mM(n,i,t));return e}function xM(i){return bp.map(t=>{const e=Math.sign(t.to-t.from),n=a=>t.axis==="x"?i(a,t.at):i(t.at,a);let s=null,r=null;for(let a=t.from;e*(t.to-a)>=0;a+=e*.25){const o=n(a);if(s===null&&o<$r)s=a;else if(s!==null&&o>=$r){r=a;break}}if(s===null||r===null)throw new Error(`ujung ${t.name} tidak ditemukan`);return{...t,a:s,b:r,length:Math.abs(r-s)}})}const Kt={minX:-1125,maxX:500,minZ:-500,maxZ:750};Kt.width=Kt.maxX-Kt.minX;Kt.depth=Kt.maxZ-Kt.minZ;const _M=470*470;function vM(i,t){const e=i*i+t*t<_M?vp(i,t):Ie.seaFloor;return Math.max(e,gM(i,t))}const yM=(i,t,e=0)=>i>Kt.minX+e&&i<Kt.maxX-e&&t>Kt.minZ+e&&t<Kt.maxZ-e,ji=(i,t)=>ni(i*.012+40,t*.012-13,3,31);function ra(i,t){const e=Math.hypot(i-Ie.peak.x,t-Ie.peak.z);return 1-Ve(150,245,e)}function Ap(i){return Ve(16,30,i)*(1-Ve(66,76,i))}function MM(i,t){return{forest:ji(i,t),patch:ni(i*.045+7,t*.045-3,2,77)}}function gf(i,t,e,n,s,r){if(s<Ie.beachTop+1.2||s>76||r>1.15)return 0;const a=ra(e,n);if(a<=0)return 0;const o=i>.47&&s<44,c=1-Ve(.42,.52,i),l=Math.max(Ap(s)*(o?.35:1),.75*c),u=Ve(.25,.5,t),h=1-Ve(.75,1.15,r),d=Ve(Ie.beachTop+1.2,Ie.beachTop+4,s);return a*l*u*h*d}function bM(i,t,e){if(e<Ie.beachTop)return 0;const n=1-Ve(.42,.52,ji(i,t)),s=ji(i,t)>.47&&e<44;return ra(i,t)*Math.max(Ap(e)*(s?.4:1),.75*n)}const Jr=1e20;function xf(i,t,e,n,s){let r=0;n[0]=0,s[0]=-Jr,s[1]=Jr;for(let a=1;a<t;a++){let o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);for(;o<=s[r];)r--,o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);r++,n[r]=a,s[r]=o,s[r+1]=Jr}r=0;for(let a=0;a<t;a++){for(;s[r+1]<a;)r++;e[a]=(a-n[r])*(a-n[r])+i[n[r]]}}function _f(i,t,e){const n=Math.max(t,e),s=new Float64Array(n),r=new Float64Array(n),a=new Int32Array(n),o=new Float64Array(n+1);for(let c=0;c<t;c++){for(let l=0;l<e;l++)s[l]=i[l*t+c];xf(s,e,r,a,o);for(let l=0;l<e;l++)i[l*t+c]=r[l]}for(let c=0;c<e;c++){for(let l=0;l<t;l++)s[l]=i[c*t+l];xf(s,t,r,a,o);for(let l=0;l<t;l++)i[c*t+l]=r[l]}}function SM(i,t=512){const e=Ie.size/t,n=Math.round(Kt.width/e),s=Math.round(Kt.depth/e),r=n*s,a=new Float32Array(r),o=new Float64Array(r),c=new Float64Array(r);for(let f=0;f<s;f++)for(let g=0;g<n;g++){const x=f*n+g,m=i.heightAt(Kt.minX+(g+.5)*e,Kt.minZ+(f+.5)*e);a[x]=m,o[x]=m>0?0:Jr,c[x]=m>0?Jr:0}_f(o,n,s),_f(c,n,s);const l=new Float32Array(r);for(let f=0;f<r;f++)l[f]=a[f]>0?-(Math.sqrt(c[f])-.5)*e:(Math.sqrt(o[f])-.5)*e;for(let f=1;f<s-1;f++)for(let g=1;g<n-1;g++){const x=f*n+g;if(Math.abs(l[x])>3*e)continue;const m=(a[x+1]-a[x-1])/(2*e),p=(a[x+n]-a[x-n])/(2*e),M=Math.hypot(m,p);M>.02&&(l[x]=Math.max(-3*e,Math.min(3*e,-a[x]/M)))}const u=c0.toHalfFloat,h=new Uint16Array(r*4);for(let f=0;f<s;f++)for(let g=0;g<n;g++){const x=f*n+g,m=l[Math.min(n-1,g+1)+f*n]-l[Math.max(0,g-1)+f*n],p=l[g+Math.min(s-1,f+1)*n]-l[g+Math.max(0,f-1)*n],M=Math.hypot(m,p)||1;h[x*4]=u(a[x]),h[x*4+1]=u(Math.max(-60,Math.min(600,l[x]))),h[x*4+2]=u(m/M),h[x*4+3]=u(p/M)}const d=new bs(h,n,s,Ze,xr);return d.magFilter=We,d.minFilter=We,d.wrapS=d.wrapT=ei,d.needsUpdate=!0,{texture:d,width:n,height:s,cell:e,heights:a,distance:l}}const xu={value:0},_u=`
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
`;function vf(i,{heightFn:t=vM,rect:e=Kt}={}){const n=Ie.size/i,s=Math.round((e.maxX-e.minX)/n),r=Math.round((e.maxZ-e.minZ)/n),a=s+1,o=e.minX,c=e.minZ,l=new Float32Array(a*(r+1));for(let v=0;v<=r;v++)for(let _=0;_<=s;_++)l[v*a+_]=t(o+_*n,c+v*n);function u(v,_){const S=(v-o)/n,T=(_-c)/n;if(S<0||T<0||S>=s||T>=r)return t(v,_);const L=Math.floor(S),G=Math.floor(T),E=S-L,A=T-G,U=l[G*a+L],Y=l[(G+1)*a+L],X=l[(G+1)*a+L+1],J=l[G*a+L+1];return E+A<=1?U+(J-U)*E+(Y-U)*A:X+(Y-X)*(1-E)+(J-X)*(1-A)}function h(v,_){const S=u(v,_);return Math.hypot(u(v+1,_)-S,u(v,_+1)-S)}const d=16,f=new Map,g=(v,_)=>(v+32768)*65536+(_+32768);let x=[];function m(v,_,S){const T=_-v.x,L=S-v.z,G=T*v.cos-L*v.sin,E=T*v.sin+L*v.cos;if(Math.abs(G)>v.hx||Math.abs(E)>v.hz)return-1/0;const A=(E+v.hz)/(2*v.hz);return v.y0+(v.y1-v.y0)*A+(v.arch?v.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(A-v.a0)/(v.a1-v.a0)))):0)}function p(v,_){const S=u(v,_);if(!x.length)return S;const T=f.get(g(Math.floor(v/d),Math.floor(_/d)));if(!T)return S;let L=S;for(const G of T){const E=m(G,v,_);E>L&&(L=E)}return L}function M(v){x=v.map(_=>({a0:0,a1:1,arch:0,..._,cos:Math.cos(_.rot||0),sin:Math.sin(_.rot||0)})),f.clear();for(const _ of x){const S=Math.hypot(_.hx,_.hz);for(let T=Math.floor((_.x-S)/d);T<=Math.floor((_.x+S)/d);T++)for(let L=Math.floor((_.z-S)/d);L<=Math.floor((_.z+S)/d);L++){const G=g(T,L);f.has(G)||f.set(G,[]),f.get(G).push(_)}}}return{step:n,nx:s,nz:r,cols:a,x0:o,z0:c,heights:l,heightAt:u,slopeAt:h,surfaceAt:p,setSurfaces:M,get surfaces(){return x},surfaceHeight:m}}const AM=`
attribute vec2 aSurface; // x = oklusi (gelap di bawah pohon), y = padang rumput
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;
`,wM=`
uniform sampler2D uNoise;
uniform float uBeachTop;
uniform float uWaveTime;
${_u}
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
`,Hs=64,TM=-12,EM=-18.4;function RM(i){const{nx:t,nz:e,cols:n,heights:s,step:r}=i,a=new Float32Array(n*(e+1)*3),o=(l,u,h,d)=>{a[l*3]+=u,a[l*3+1]+=h,a[l*3+2]+=d},c=r*r;for(let l=0;l<e;l++)for(let u=0;u<t;u++){const h=l*n+u,d=h+n,f=d+1,g=h+1,x=r*(s[h]-s[g]),m=r*(s[h]-s[d]);o(h,x,c,m),o(d,x,c,m),o(g,x,c,m);const p=r*(s[d]-s[f]),M=r*(s[g]-s[f]);o(d,p,c,M),o(f,p,c,M),o(g,p,c,M)}for(let l=0;l<a.length;l+=3){const u=Math.hypot(a[l],a[l+1],a[l+2])||1;a[l]/=u,a[l+1]/=u,a[l+2]/=u}return a}function CM(i,{noiseTexture:t,quality:e,region:n=null}){const{nx:s,nz:r,cols:a,heights:o,x0:c,z0:l,step:u}=i,h=RM(i),d=new Float32Array(a*(r+1)*2);for(let v=0;v<=r;v++)for(let _=0;_<=s;_++){const S=v*a+_;d[S*2]=1,d[S*2+1]=bM(c+_*u,l+v*u,o[S])}const f=new qn({color:16777215});f.defines={},e.water.wetSand&&(f.defines.WAVE_WET_SAND=""),n&&(f.defines.REGION_MASK=""),f.onBeforeCompile=v=>{v.uniforms.uNoise={value:t},v.uniforms.uBeachTop={value:Ie.beachTop},v.uniforms.uWaveTime=xu,n&&(v.uniforms.uRegion={value:n.texture},v.uniforms.uRegionRect={value:new ae(n.x0,n.z0,1/n.width,1/n.depth)}),v.vertexShader=AM+v.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
      vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
      vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);
      vSurface = aSurface;`),v.fragmentShader=wM+v.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb *= terrainColor();`)};const g=new Pe;g.name="terrain";const x=[];for(let v=0;v<r;v+=Hs)for(let _=0;_<s;_+=Hs){const S=Math.min(s,_+Hs),T=Math.min(r,v+Hs),L=S-_+1,G=T-v+1;let E=-1/0;for(let N=v;N<=T;N++)for(let y=_;y<=S;y++)E=Math.max(E,o[N*a+y]);if(E<TM)continue;const A=new Float32Array(L*G*3),U=new Float32Array(L*G*3),Y=new Int32Array(L*G);for(let N=v;N<=T;N++)for(let y=_;y<=S;y++){const B=(N-v)*L+(y-_),O=N*a+y;A[B*3]=c+y*u,A[B*3+1]=o[O],A[B*3+2]=l+N*u,U.set(h.subarray(O*3,O*3+3),B*3),Y[B]=O}const X=[];for(let N=0;N<G-1;N++)for(let y=0;y<L-1;y++){const B=N*L+y,O=B+L;X.push(B,O,B+1,O,O+1,B+1)}const J=new fe;J.setAttribute("position",new be(A,3)),J.setAttribute("normal",new be(U,3));const b=new be(new Float32Array(L*G*2),2);J.setAttribute("aSurface",b),J.setIndex(X),J.computeBoundingSphere();const z=new ie(J,f);z.name=`terrain-${_/Hs}-${v/Hs}`,z.receiveShadow=e.shadows,g.add(z),x.push({surf:b,map:Y})}const m=new bn(Kt.width,Kt.depth).rotateX(-Math.PI/2);m.translate(Kt.minX+Kt.width/2,EM,Kt.minZ+Kt.depth/2),m.deleteAttribute("uv"),m.setAttribute("aSurface",new be(new Float32Array([1,0,1,0,1,0,1,0]),2));const p=new ie(m,f);p.name="dasar-laut",g.add(p);function M(){for(const v of x){const _=v.surf.array;for(let S=0;S<v.map.length;S++)_[S*2]=d[v.map[S]*2],_[S*2+1]=d[v.map[S]*2+1];v.surf.needsUpdate=!0}}return M(),g.userData.applyOcclusion=v=>{for(const _ of v){const S=_.radius,T=Math.max(0,Math.floor((_.x-S-c)/u)),L=Math.min(s,Math.ceil((_.x+S-c)/u)),G=Math.max(0,Math.floor((_.z-S-l)/u)),E=Math.min(r,Math.ceil((_.z+S-l)/u));for(let A=G;A<=E;A++)for(let U=T;U<=L;U++){const Y=c+U*u-_.x,X=l+A*u-_.z,J=1-(Y*Y+X*X)/(S*S);if(J<=0)continue;const b=(A*a+U)*2;d[b]=Math.max(.5,d[b]*(1-_.strength*J*J))}}M()},g.userData.chunks=g.children.length-1,g}const PM=`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform float uWaveTime;
uniform vec4 uWorld; // minX, minZ, maxX, maxZ (area data pantai)
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal; // fase & kekuatan ombak lokal (berubah pelan, cukup per vertex)
${_u}

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
`,IM=`
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
${_u}

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
`;function yf(i,t,e,n,s){const r=[];for(let o=n;o>=1;o--)r.push(i-e*(Math.pow(s,o)-1)/(s-1));const a=Math.round((t-i)/e);for(let o=0;o<=a;o++)r.push(i+o*e);for(let o=1;o<=n;o++)r.push(t+e*(Math.pow(s,o)-1)/(s-1));return r}const Gs=48;function LM(i,t){const n=Ie.size/t;let s=1.01,r=4;for(let M=0;M<60;M++){const v=(s+r)/2;n*(Math.pow(v,12)-1)/(v-1)<5500?s=v:r=v}const a=(s+r)/2,o=yf(Kt.minX,Kt.maxX,n,12,a),c=yf(Kt.minZ,Kt.maxZ,n,12,a),l=o.length,u=c.length,h=new Float32Array(l*u*3),d=new Float32Array(l*u);for(let M=0;M<u;M++)for(let v=0;v<l;v++){const _=M*l+v,S=o[v],T=c[M];h[_*3]=S,h[_*3+2]=T,d[_]=S>Kt.minX&&S<Kt.maxX&&T>Kt.minZ&&T<Kt.maxZ?i.heightAt(S,T):-18}const f=l-1-2*12,g=u-1-2*12,x=new Map;for(let M=0;M<u-1;M++)for(let v=0;v<l-1;v++){const _=M*l+v,S=_+1,T=_+l,L=T+1;if(Math.min(d[_],d[S],d[T],d[L])>1.6)continue;const G=v-12,E=M-12,A=G>=0&&E>=0&&G<f&&E<g?`${Math.floor(G/Gs)},${Math.floor(E/Gs)}`:"luar";let U=x.get(A);U||x.set(A,U=[]),U.push(_,T,S,S,T,L)}const m=new be(h,3),p=[];for(const[M,v]of x){const _=new fe;if(_.setAttribute("position",m),_.setIndex(v),M==="luar"){p.push({geometry:_,culled:!1});continue}const[S,T]=M.split(",").map(Number),L=o[12+S*Gs],G=o[Math.min(l-1,12+(S+1)*Gs)],E=c[12+T*Gs],A=c[Math.min(u-1,12+(T+1)*Gs)];_.boundingSphere=new hn(new V((L+G)/2,0,(E+A)/2),Math.hypot(G-L,A-E)/2+2),p.push({geometry:_,culled:!0})}return p}function zM({ground:i,shore:t,env:e,noiseTexture:n,normalTexture:s,quality:r}){const a=r.water,o={DETAIL_LAYERS:a.detailLayers};a.cloudReflection&&(o.CLOUD_REFLECTION=""),r.caustics&&(o.CAUSTICS="");const c=new Kn({vertexShader:PM,fragmentShader:IM,defines:o,transparent:!0,depthWrite:!1,uniforms:{uShore:{value:t.texture},uNoise:{value:n},uNormal:{value:s},uWaveTime:xu,uWorld:{value:new ae(Kt.minX,Kt.minZ,Kt.maxX,Kt.maxZ)},uShallow:{value:new Ut("#3fd6c6")},uDeep:{value:new Ut("#0a4a82")},uZenith:{value:e.zenith},uHorizon:{value:e.horizon},uSunDir:{value:e.sunDir},uSunColor:{value:new Ut("#fff2d2")},uFogColor:{value:e.fog.color},uFogNear:{value:e.fog.near},uFogFar:{value:e.fog.far}}}),l=new Pe;l.name="laut",l.position.y=Ie.seaLevel;for(const{geometry:u,culled:h}of LM(i,a.segments)){const d=new ie(u,c);d.frustumCulled=h,d.renderOrder=1,l.add(d)}return l.userData.material=c,l}const DM=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // selalu di bidang terjauh
}
`,kM=`
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
`;function NM(i,{noiseTexture:t,quality:e}){const n=new V(.5,.52,.32).normalize(),s=new Ut("#d3ecf6"),r=new Ut("#3d8bd4");i.fog=new tu(s.clone(),380,2400),i.background=s.clone();const a={uZenith:{value:r},uHorizon:{value:s},uSunDir:{value:n},uSunColor:{value:new Ut("#fff0c8")},uNoise:{value:t},uTime:{value:0}},o=new Kn({vertexShader:DM,fragmentShader:kM,side:cn,depthWrite:!1,uniforms:a}),c=new ie(new Lo(1,32,16),o);c.name="langit",c.frustumCulled=!1,c.renderOrder=-1,c.onBeforeRender=(m,p,M)=>{c.position.copy(M.position),c.scale.setScalar(M.far*.9),c.updateMatrixWorld()},i.add(c);const l=new hp("#d6ecff","#5d7a3c",1.1);i.add(l);const u=new hu("#fff1d6",2.4);u.position.copy(n).multiplyScalar(500),i.add(u,u.target),e.shadows&&(u.castShadow=!0,u.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize),u.shadow.camera.near=1,u.shadow.camera.far=1600,u.shadow.bias=-6e-4,u.shadow.radius=2);const h=new Ot().lookAt(n,new V,new V(0,1,0)),d=h.clone().invert(),f=new V,g=Math.log(1.15);function x(m,p){if(!u.castShadow)return;const M=m.position.distanceTo(p),v=bi.clamp(M*.95,45,560),_=Math.exp(Math.ceil(Math.log(v)/g)*g),S=u.shadow.camera;S.right!==_&&(S.left=-_,S.right=_,S.top=_,S.bottom=-_,S.updateProjectionMatrix());const T=2*_/u.shadow.mapSize.x;f.copy(p).lerp(m.position,.25).applyMatrix4(d),f.x=Math.round(f.x/T)*T,f.y=Math.round(f.y/T)*T,f.applyMatrix4(h),u.target.position.copy(f),u.position.copy(f).addScaledVector(n,800),u.shadow.normalBias=T*1.6}return{sunDir:n,zenith:r,horizon:s,fog:i.fog,sun:u,hemi:l,update(m,p,M){a.uTime.value=m,x(p,M)}}}const Mi=Math.PI*2,vu=new V(0,1,0);function ze(i,t,{centers:e=null,dark:n=.62,light:s=1.08,rings:r=0}={}){const a=i.index?i.toNonIndexed():i;a.attributes.uv&&a.deleteAttribute("uv");const o=a.attributes.position;if(e){const f=a.attributes.normal,g=new V,x=new V;for(let m=0;m<o.count;m++){x.set(0,0,0);for(const[p,M]of e)x.addScaledVector(g.fromBufferAttribute(o,m).sub(p).normalize(),M);x.normalize(),f.setXYZ(m,x.x,x.y,x.z)}}a.computeBoundingBox();const{min:c,max:l}=a.boundingBox,u=Math.max(.001,l.y-c.y),h=new Ut(t),d=new Float32Array(o.count*3);for(let f=0;f<o.count;f++){const g=o.getY(f);let x=n+(s-n)*((g-c.y)/u);r&&(x*=.88+.12*Math.sin(g*r)),d[f*3]=h.r*x,d[f*3+1]=h.g*x,d[f*3+2]=h.b*x}return a.setAttribute("color",new be(d,3)),a}function fa(i,t,[e,n,s],r=.82){const a=new Ji(i,t);return a.scale(1,r,1),a.translate(e,n,s),a}function UM(i,t){const n=(g,x)=>x.set(0,i*(.3*g-t*g*g),i*g*(1-.12*g)),s=[],r=[],a=new V,o=new V,c=new V,l=new V,u=new V,h=new V,d=new V;for(let g=-1;g<=1;g+=2)for(let x=0;x<9;x++){const m=.08+.86*x/9,p=m+.86/9*.95,M=1.3*Math.sin(Math.PI*(.16+.76*m));n(m,a),n(p,o),n(Math.min(1,(m+p)/2+.07),l),c.set(l.x+g*M,l.y-.4*M,l.z+.3*M),u.crossVectors(h.subVectors(o,a),d.subVectors(c,a));const v=u.y<0;v&&u.negate(),u.normalize().lerp(vu,.45).normalize();for(const _ of v?[a,c,o]:[a,o,c])s.push(_.x,_.y,_.z),r.push(u.x,u.y,u.z)}const f=new fe;return f.setAttribute("position",new Xt(s,3)),f.setAttribute("normal",new Xt(r,3)),f}function wp(){const i=[],n=new Ne(.2,.36,8,6,5,!0);n.translate(0,8/2,0);const s=n.attributes.position;for(let l=0;l<s.count;l++)s.setX(l,s.getX(l)+.035*s.getY(l)*s.getY(l));i.push(ze(n,"#8d6d48",{dark:.7,light:1.05,rings:9}));const r=.035*8*8,a=8;for(let l=0;l<a;l++){const u=l%4===3,h=UM(u?4:4.5,u?.75:.5);h.rotateX(-.15+l%3*.12),h.rotateY(l/a*Mi+l%2*.25),h.translate(r,8-.05,0),i.push(ze(h,u?"#8c9a38":l%2?"#3f8f2f":"#4c9e34",{dark:.8,light:1.05}))}const o=new Ji(.42,0);o.translate(r,8-.15,0),i.push(ze(o,"#6b5a2e"));const c=[[0,.36,.5,"#5f8f23"],[.8,.42,.62,"#6f9c2b"],[1.6,.37,.52,"#c9921f"],[2.5,.43,.66,"#5f8f23"],[3.3,.36,.5,"#7c5a32"],[4.1,.42,.63,"#6f9c2b"],[4.9,.37,.54,"#5f8f23"],[5.7,.43,.67,"#d4a02a"]];for(const[l,u,h,d]of c){const f=new V(r+Math.cos(l)*u,8-h,Math.sin(l)*u),g=new Ji(1,0);g.scale(.21,.26,.21),g.translate(f.x,f.y,f.z),i.push(ze(g,d,{centers:[[f,1]],dark:.7,light:1.12}))}for(const l of[.4,3.6]){const u=new V(r,7.8,0),h=new V(r+Math.cos(l)*.34,8-.6,Math.sin(l)*.34),d=h.clone().sub(u),f=new Ne(.03,.05,d.length(),4,1,!0);f.applyQuaternion(new _e().setFromUnitVectors(vu,d.normalize())),f.translate((u.x+h.x)/2,(u.y+h.y)/2,(u.z+h.z)/2),i.push(ze(f,"#b8923f",{dark:.85,light:1}))}return As(i)}function Ll(i){const t=[],e=new Ne(.3,.55,6.6,6,2,!1);e.translate(0,3.3,0),t.push(ze(e,"#6b4f33",{dark:.55,light:1}));for(const r of[-1,1]){const a=new Ne(.1,.18,2.6,5,1,!0);a.rotateZ(r*.75),a.translate(r*.85,5.6,r*.3),t.push(ze(a,"#6b4f33",{dark:.7,light:1}))}const n=new V(0,7.4,0),s=[[0,7.5,0,3,"#2f7d2a"],[1.7,6.7,.8,2.3,"#3a8c30"],[-1.5,6.8,-.9,2.4,"#2a7027"],[.2,9,-.2,2.1,"#3f9534"]];for(const[r,a,o,c,l]of s){const u=fa(c,i,[r,a,o]);t.push(ze(u,l,{centers:[[n,.65],[new V(r,a,o),.35]],dark:.66,light:1.12}))}return As(t)}function Tp(i){const t=[],e=new Ne(.3,.6,9,6,3,!1);e.translate(0,4.5,0);const n=e.attributes.position;for(let r=0;r<n.count;r++)n.setX(r,n.getX(r)+.006*n.getY(r)*n.getY(r));t.push(ze(e,"#75593a",{dark:.55,light:1}));for(let r=0;r<3;r++){const a=new Ne(.08,.16,3.4,5,1,!0);a.rotateZ(.9),a.translate(1.3,8.4,0),a.rotateY(r*Mi/3+.4),a.translate(.45,0,0),t.push(ze(a,"#75593a",{dark:.75,light:1}))}const s=new V(.5,9.8,0);for(const[r,a,o,c,l,u]of[[.5,9.7,0,4.4,"#3b7f2c",.34],[1.2,10.6,-.6,3,"#468f33",.4],[-1.4,9.9,1.1,2.6,"#357528",.4]]){const h=fa(c,i,[r,a,o],u);t.push(ze(h,l,{centers:[[s,.5],[new V(r,a-1,o),.5]],dark:.66,light:1.15}))}return As(t)}function Mo(i,t){const e=[],n=new V(0,.5,0);for(const[s,r,a,o,c]of[[0,.65,0,.95,"#3f8a2e"],[.75,.5,.3,.7,"#4b9a35"],[-.6,.45,-.4,.65,"#45922f"]]){const l=fa(o,i,[s,r,a],.75);e.push(ze(l,c,{centers:[[n,.6],[new V(s,r,a),.4]],dark:.75,light:1.15}))}return t&&[[.2,1.35,.5],[-.5,1.1,.4],[.9,.95,-.2],[-.2,1.3,-.6],[.5,1.15,.85],[-.9,.8,-.1]].forEach(([r,a,o],c)=>{const l=new Ji(.17,0);l.translate(r,a,o),e.push(ze(l,t[c%t.length],{dark:.9,light:1.1}))}),As(e)}function OM(i){const t=[],e=new Ne(.85,1.7,9,9,3,!1);e.translate(0,4.5,0),t.push(ze(e,"#5d4a3a",{dark:.5,light:.95}));for(let r=0;r<6;r++){const a=new Yn(.35,1.6,2.2);a.translate(0,.6,1.4),a.rotateY(r/6*Mi+.3),t.push(ze(a,"#5d4a3a",{dark:.55,light:.9}))}for(let r=0;r<22;r++){const a=r/22*Mi+r%3*.37,o=2.6+r%5*.6,c=9.5-r%4*.8,l=new Ne(.05,.1,c,4,1,!0);l.translate(Math.cos(a)*o,c/2,Math.sin(a)*o),t.push(ze(l,"#6e5a46",{dark:.7,light:1}))}const n=new V(0,12.5,0),s=[[0,13.5,0,6.5,"#2c6a26"]];for(let r=0;r<9;r++){const a=r/9*Mi;s.push([Math.cos(a)*7.2,11.6+r%2*.8,Math.sin(a)*7.2,4.6,r%2?"#35782d":"#2a6324"])}for(let r=0;r<5;r++){const a=r/5*Mi+.6;s.push([Math.cos(a)*3.6,15.6,Math.sin(a)*3.6,3.8,"#3d8433"])}for(const[r,a,o,c,l]of s){const u=fa(c,i,[r,a,o],.62);t.push(ze(u,l,{centers:[[n,.6],[new V(r,a,o),.4]],dark:.6,light:1.1}))}return As(t)}function FM(){const i=[],t=new Ne(.16,.26,2.2,6,1,!0);t.translate(0,1.1,0),i.push(ze(t,"#8d7c69",{dark:.7,light:1.05}));for(let e=0;e<5;e++){const n=e/5*Mi+.4,s=new V(Math.cos(n)*1.7,3.6+e%2*.5,Math.sin(n)*1.7),r=new V(0,2.1,0),a=s.clone().sub(r),o=new Ne(.07,.12,a.length(),5,1,!0);o.applyQuaternion(new _e().setFromUnitVectors(vu,a.clone().normalize())),o.translate((r.x+s.x)/2,(r.y+s.y)/2,(r.z+s.z)/2),i.push(ze(o,"#8d7c69",{dark:.75,light:1.05}));const c=fa(.95,0,[s.x,s.y+.35,s.z],.6);i.push(ze(c,"#3e8a35",{centers:[[s,1]],dark:.75,light:1.15}));for(let l=0;l<4;l++){const u=new Ji(.14,0);u.translate(s.x+Math.cos(l*1.7)*.6,s.y+.75,s.z+Math.sin(l*1.7)*.6),i.push(ze(u,l%2?"#fbf6e8":"#f6e08a",{dark:.95,light:1.05}))}}return As(i)}function BM(){const i=[],t=new Ne(.13,.2,2.6,6,1,!0);t.translate(0,1.3,0),i.push(ze(t,"#7f8f3c",{dark:.7,light:1.05}));for(let e=0;e<7;e++){const n=new bn(.75,2.6,1,4),s=n.attributes.position;for(let r=0;r<s.count;r++){const a=(s.getY(r)+1.3)/2.6;s.setY(r,a*2.4),s.setZ(r,a*a*1.6),s.setY(r,s.getY(r)-a*a*1.2)}n.computeVertexNormals(),n.rotateX(-.25),n.rotateY(e/7*Mi+e%2*.4),n.translate(0,2.4,0),i.push(ze(n,e%3?"#5ea83a":"#7bbf45",{dark:.8,light:1.1}))}return As(i)}const Ep={value:0},Wn={a:{value:new V},b:{value:new V},r:{value:0}};function Rp(i){const t=new qn({vertexColors:!0,side:on});return t.onBeforeCompile=e=>{e.uniforms.uTime=Ep,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=Wn.a,e.uniforms.uSeeB=Wn.b,e.uniforms.uSeeR=Wn.r,e.vertexShader=`uniform float uTime;
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
      diffuseColor.rgb *= 0.74 + 0.5 * leaf;`)},t}const Mf=Ie.size/3;function tn(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,toMatrix:a}){const o=new Pe;o.name=i;const c=new Map;for(const h of n){const d=`${Math.floor(h.x/Mf)},${Math.floor(h.z/Mf)}`;c.has(d)||c.set(d,[]),c.get(d).push(h)}const l=new Ot,u=new Ut;for(const h of c.values()){const d=new Ss(t,e,h.length);h.forEach((f,g)=>{a(f,l,u),d.setMatrixAt(g,l),d.setColorAt(g,u)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.castShadow=s,d.receiveShadow=r,o.add(d)}return o}const bf=new _e,Sf=new un,Af=new V,wf=new V;function Hn({scaleMin:i,scaleMax:t,tilt:e,tint:n,sink:s=.15}){return(r,a,o)=>{Sf.set((r.b-.5)*e,r.a*Mi,(r.c-.5)*e),bf.setFromEuler(Sf);const c=i+(t-i)*r.b;wf.set(c,c*(.9+.2*r.c),c),Af.set(r.x,r.y-s*c,r.z),a.compose(Af,bf,wf);const l=1-n+n*2*r.c,u=(r.a-.5)*n;o.setRGB(l*(1+u),l,l*(1-u))}}function HM({ground:i,grid:t,quality:e,noiseTexture:n,reserved:s=null}){const r=e.treeDensity,a=e.canopyDetail,{shadows:o}=e,c=Cn({ground:i,grid:t,kind:"kelapa",seed:101,radius:1.8,reserved:s,count:Math.round(170*r),accept:(x,m,p,M,v)=>p>.9&&p<4.2&&M<.3&&v()<.55}),l=Cn({ground:i,grid:t,kind:"pohon",seed:202,radius:2.3,reserved:s,count:Math.round(900*r),accept:(x,m,p,M)=>p>4&&p<44&&M<.6&&ji(x,m)>.47}),u=Cn({ground:i,grid:t,kind:"pohon",seed:303,radius:4.5,reserved:s,count:Math.round(110*r),accept:(x,m,p,M,v)=>{if(p<5||p>42||M>.45)return!1;const _=ji(x,m);return _>.34&&_<.49&&v()<.35+.65*ra(x,m)}}),h=Cn({ground:i,grid:t,kind:"semak",seed:404,radius:1.1,reserved:s,count:Math.round(700*r),accept:(x,m,p,M,v)=>{if(p<Ie.beachTop+.6||p>46||M>.7)return!1;const _=ji(x,m);return _>.4&&_<.56||v()<.06}}),d=Cn({ground:i,grid:t,kind:"semak",seed:505,radius:1,reserved:s,count:Math.round(150*r),accept:(x,m,p,M,v)=>p>Ie.beachTop+.4&&p<30&&M<.5&&ji(x,m)<.5&&v()<.5}),f=Rp(n),g=new Pe;return g.name="vegetasi",g.add(tn("kelapa",wp(),f,c,{castShadow:o,receiveShadow:o,toMatrix:Hn({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1})}),tn("pohon-hutan",Ll(a),f,l,{castShadow:o,receiveShadow:o,toMatrix:Hn({scaleMin:.75,scaleMax:1.4,tilt:.12,tint:.16})}),tn("pohon-payung",Tp(a),f,u,{castShadow:o,receiveShadow:o,toMatrix:Hn({scaleMin:.8,scaleMax:1.2,tilt:.08,tint:.12})}),tn("semak",Mo(0,null),f,h,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:Hn({scaleMin:.7,scaleMax:1.5,tilt:.2,tint:.2,sink:.1})}),tn("semak-bunga",Mo(0,["#e0353f","#f4c02c","#f06aa8"]),f,d,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:Hn({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),g.userData.occlusion=[...l.map(x=>({x:x.x,z:x.z,radius:4.8,strength:.4})),...u.map(x=>({x:x.x,z:x.z,radius:5.5,strength:.3})),...c.map(x=>({x:x.x,z:x.z,radius:2.4,strength:.18})),...h.map(x=>({x:x.x,z:x.z,radius:1.8,strength:.2})),...d.map(x=>({x:x.x,z:x.z,radius:1.6,strength:.15}))],g.userData.trunks=[...c.map(x=>({x:x.x,z:x.z,radius:.45,kind:"pohon"})),...l.map(x=>({x:x.x,z:x.z,radius:.7,kind:"pohon"})),...u.map(x=>({x:x.x,z:x.z,radius:.75,kind:"pohon"}))],g.userData.counts={kelapa:c.length,pohon:l.length,payung:u.length,semak:h.length,bunga:d.length},g.userData.update=x=>{Ep.value=x},g}function Tf(i,t=0){const e=new cu(1,t),n=e.attributes.position,s=new V;for(let l=0;l<n.count;l++){s.fromBufferAttribute(n,l);const u=.72+.5*_p(s.x*1.6+i,s.z*1.6+s.y*1.3-i,5);s.multiplyScalar(u),s.y*=.82,s.y<0&&(s.y*=.55),n.setXYZ(l,s.x,s.y,s.z)}e.computeVertexNormals(),e.computeBoundingBox();const{min:r,max:a}=e.boundingBox,o=new Ut("#a59c8e"),c=new Float32Array(n.count*3);for(let l=0;l<n.count;l++){const h=.66+.46*((n.getY(l)-r.y)/(a.y-r.y));c[l*3]=o.r*h,c[l*3+1]=o.g*h,c[l*3+2]=o.b*h}return e.setAttribute("color",new be(c,3)),e.deleteAttribute("uv"),e}const Ef=new _e,Rf=new un,Cf=new V,Pf=new V;function GM(i,t,e){Rf.set((i.b-.5)*.5,i.a*Math.PI*2,(i.c-.5)*.5),Ef.setFromEuler(Rf);const n=i.r*.95;Pf.set(n*(.8+.4*i.c),n*(.8+.5*i.b),n*(.8+.4*i.a)),Cf.set(i.x,i.y-.12*n,i.z),t.compose(Cf,Ef,Pf);const s=.82+.36*i.c,r=(i.a-.5)*.18;e.setRGB(s*(1+r),s,s*(1-r))}function VM({ground:i,grid:t,quality:e,reserved:n=null}){const s=e.treeDensity,r=Cn({ground:i,grid:t,kind:"batu",seed:606,reserved:n,count:Math.round(160*s),radius:h=>1+h()*1.8,accept:(h,d,f,g,x)=>{if(f<12)return!1;const m=Math.min(1,g*1.2+Math.max(0,f-40)/20);return x()<ra(h,d)*(.25+.75*m)}}),a=Cn({ground:i,grid:t,kind:"batu",seed:707,reserved:n,count:Math.round(110*s),radius:h=>.4+h()*.6,accept:(h,d,f,g,x)=>f>.3&&f<Ie.beachTop+.5&&x()<.25||f>4&&f<45&&g<.8&&x()<.35+.65*ra(h,d)}),o=new qn({vertexColors:!0}),c={castShadow:e.shadows,receiveShadow:e.shadows,toMatrix:GM},l=new Pe;l.name="batu";const u=[...r,...a];return l.add(tn("batu-a",Tf(1.3),o,u.filter((h,d)=>d%2===0),c),tn("batu-b",Tf(7.9),o,u.filter((h,d)=>d%2===1),c)),l.userData.occlusion=u.map(h=>({x:h.x,z:h.z,radius:h.r*1.6,strength:.3})),l.userData.colliders=u.map(h=>({x:h.x,z:h.z,radius:h.r*.9,kind:"batu"})),l.userData.count=u.length,l}const Ee=16,Cp=.02,WM=3,os=8,zl=Math.PI*2,XM=(i,t)=>Math.min(1,Math.max(Cp,Math.pow(t/Math.max(i,.001),1.5)));function jM(i){const t=sa(99),e=[],n=[],s=[],r=new Ut().setRGB(.14,.28,.05),a=new Ut().setRGB(.3,.5,.11),o=new Ut().setRGB(.4,.62,.13),c=new Ut,l=2;for(let h=0;h<i;h++){const d=h/i*zl+t()*.9,f=Math.cos(d),g=Math.sin(d),x=.2+t()*.4,m=.6+t()*.4,p=.075+t()*.05,M=.03+t()*.16,v=e.length/3;for(let S=0;S<=l;S++){const T=S/l,L=M+x*T*T,G=f*L,E=g*L,A=m*T;if(c.copy(r).lerp(a,Math.min(1,T*1.6)).lerp(o,Math.max(0,T*1.6-.6)),S<l){const U=p*(1-T*.6);e.push(G+g*U,A,E-f*U,G-g*U,A,E+f*U),n.push(c.r,c.g,c.b,c.r,c.g,c.b)}else e.push(G,A,E),n.push(c.r,c.g,c.b)}for(let S=0;S<l-1;S++){const T=v+S*2;s.push(T,T+1,T+2,T+1,T+3,T+2)}const _=v+(l-1)*2;s.push(_,_+1,_+2)}const u=new fe;return u.setAttribute("position",new Xt(e,3)),u.setAttribute("color",new Xt(n,3)),u.setAttribute("normal",new Xt(new Array(e.length).fill(0).map((h,d)=>d%3===1?1:0),3)),u.setIndex(s),u}function YM(i){const t=new qn({vertexColors:!0,side:on});return t.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=`
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
    `)},t}function KM(i,t){let e=0,n=i.length;for(;e<n;){const s=e+n>>1;i[s]<t?e=s+1:n=s}return e}const If={count:0};function qM({ground:i,grid:t,quality:e}){const n=e.grass,s=jM(n.blades),r=new El;r.index=s.index;for(const A of["position","color","normal"])r.setAttribute(A,s.attributes[A]);const a=new Float32Array(n.max*os),o=new i1(a,os,1).setUsage(In);r.setAttribute("aOffset",new ia(o,4,0)),r.setAttribute("aParams",new ia(o,4,4)),r.instanceCount=0;const c={uTime:{value:0},uCamPos:{value:new V},uRadius:{value:n.radius},uNear:{value:n.near},uFar:{value:Cp},uWind:{value:new Ct(1,.45).normalize()}},l=new ie(r,YM(c));l.name="rumput",l.frustumCulled=!1,l.receiveShadow=e.shadows&&n.shadows,l.visible=!1;const u=new Map,h=4,d=new Float32Array((h+1)*(h+1)),f=new Float32Array((h+1)*(h+1)),g=(A,U,Y)=>{const X=U*h,J=Y*h,b=Math.min(h-1,Math.floor(X)),z=Math.min(h-1,Math.floor(J)),N=X-b,y=J-z,B=A[z*(h+1)+b],O=A[z*(h+1)+b+1],k=A[(z+1)*(h+1)+b],R=A[(z+1)*(h+1)+b+1];return(B+(O-B)*N)*(1-y)+(k+(R-k)*N)*y};function x(A,U){const Y=A*Ee,X=U*Ee;let J=!1;for(let R=0;R<=h;R++)for(let H=0;H<=h;H++){const I=Y+H*Ee/h,C=X+R*Ee/h,Z=MM(I,C);d[R*(h+1)+H]=Z.forest,f[R*(h+1)+H]=Z.patch,!J&&gf(Z.forest,Z.patch,I,C,i.heightAt(I,C),0)>.02&&(J=!0)}if(!J)return If;const b=sa(oM(A,U)^2654435769),z=Math.round(Ee*Ee*n.density),N=[];let y=1/0,B=-1/0;for(let R=0;R<z;R++){const H=Y+b()*Ee,I=X+b()*Ee,C=b(),Z=i.heightAt(H,I),Q=(H-Y)/Ee,et=(I-X)/Ee;if(C>=gf(g(d,Q,et),g(f,Q,et),H,I,Z,i.slopeAt(H,I))||t.covered(H,I,"batu",.85))continue;const gt=b()<.12?b()*.5:.6+b()*.4;N.push([H,Z-.04,I,b(),b()*zl,.6+b()*.7,gt,b()*zl]),y=Math.min(y,Z),B=Math.max(B,Z)}if(!N.length)return If;N.sort((R,H)=>R[3]-H[3]);const O=new Float32Array(N.length*os),k=new Float32Array(N.length);return N.forEach((R,H)=>{O.set(R,H*os),k[H]=R[3]}),{count:N.length,data:O,ranks:k,center:new V(Y+Ee/2,(y+B)/2,X+Ee/2),radius:Math.hypot(Ee/2,Ee/2,(B-y)/2)+1.4}}const m=new vr,p=new Ot,M=new hn,v=new V(1/0,0,0),_=new _e,S=[],T=[];let L=!1;function G(A,U,Y){if(!A.count)return;const X=Math.max(0,U.distanceTo(A.center)-A.radius);X>Y||(M.center.copy(A.center),M.radius=A.radius,m.intersectsSphere(M)&&S.push({ch:A,d:X}))}function E(A,U){c.uTime.value=U;const Y=A.position;if(c.uCamPos.value.copy(Y),!L&&v.equals(Y)&&_.equals(A.quaternion))return;v.copy(Y),_.copy(A.quaternion),L=!1,A.updateMatrixWorld(),p.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),m.setFromProjectionMatrix(p);const X=n.radius,J=Math.floor((Y.x-X)/Ee),b=Math.floor((Y.x+X)/Ee),z=Math.floor((Y.z-X)/Ee),N=Math.floor((Y.z+X)/Ee);S.length=0,T.length=0;for(let B=J;B<=b;B++)for(let O=z;O<=N;O++){const k=(B+32768)*65536+(O+32768),R=u.get(k);if(R===void 0){const H=Math.max(0,Math.abs(Y.x-(B+.5)*Ee)-Ee*.71),I=Math.max(0,Math.abs(Y.z-(O+.5)*Ee)-Ee*.71),C=H*H+I*I;if(C>X*X)continue;const Z=(B+.5)*Ee,Q=(O+.5)*Ee;M.center.set(Z,i.heightAt(Z,Q),Q),M.radius=Ee*.71+12;const et=m.intersectsSphere(M);T.push({i:B,j:O,key:k,order:C+(et?0:1e9)});continue}G(R,Y,X)}if(T.length){T.sort((k,R)=>k.order-R.order);const B=performance.now();let O=0;for(const k of T){if(O>0&&performance.now()-B>WM)break;const R=x(k.i,k.j);u.set(k.key,R),G(R,Y,X),O++}L=O<T.length}S.sort((B,O)=>B.d-O.d);let y=0;for(const{ch:B,d:O}of S){const k=Math.min(KM(B.ranks,XM(O,n.near)),n.max-y);if(!(k<=0)&&(a.set(B.data.subarray(0,k*os),y*os),y+=k,y>=n.max))break}r.instanceCount=y,l.visible=y>0,y>0&&(o.clearUpdateRanges(),o.addUpdateRange(0,y*os),o.needsUpdate=!0)}return l.userData.update=E,l.userData.stats=()=>({instances:r.instanceCount,chunks:u.size}),l}const Ni=8,Lf=(i,t)=>(i+32768)*65536+(t+32768);function ZM(i){if(i.hx===void 0)return i;const t=i.rot||0;return{...i,cos:Math.cos(t),sin:Math.sin(t),radius:Math.hypot(i.hx,i.hz)}}function Vs(i,t,e,n){if(i.hx===void 0){const g=t-i.x,x=e-i.z,m=Math.hypot(g,x);return n.gap=m-i.radius,n.nx=m>1e-6?g/m:1,n.nz=m>1e-6?x/m:0,n.px=i.x+n.nx*i.radius,n.pz=i.z+n.nz*i.radius,n}const s=t-i.x,r=e-i.z,a=s*i.cos-r*i.sin,o=s*i.sin+r*i.cos,c=Math.abs(a)-i.hx,l=Math.abs(o)-i.hz;let u,h,d,f;if(c>0||l>0){d=Math.max(-i.hx,Math.min(i.hx,a)),f=Math.max(-i.hz,Math.min(i.hz,o));const g=a-d,x=o-f,m=Math.hypot(g,x);n.gap=m,u=g/m,h=x/m}else c>l?(n.gap=c,u=Math.sign(a)||1,h=0,d=u*i.hx,f=o):(n.gap=l,u=0,h=Math.sign(o)||1,d=a,f=h*i.hz);return n.nx=u*i.cos+h*i.sin,n.nz=-u*i.sin+h*i.cos,n.px=i.x+d*i.cos+f*i.sin,n.pz=i.z-d*i.sin+f*i.cos,n}function $M(i){const t=i.map(ZM),e=new Map;for(const a of t){const o=a.radius;for(let c=Math.floor((a.x-o)/Ni);c<=Math.floor((a.x+o)/Ni);c++)for(let l=Math.floor((a.z-o)/Ni);l<=Math.floor((a.z+o)/Ni);l++){const u=Lf(c,l);let h=e.get(u);h||e.set(u,h=[]),h.push(a)}}let n=0;function s(a,o,c,l){n++;for(let u=Math.floor((a-c)/Ni);u<=Math.floor((a+c)/Ni);u++)for(let h=Math.floor((o-c)/Ni);h<=Math.floor((o+c)/Ni);h++){const d=e.get(Lf(u,h));if(d)for(const f of d){if(f.seen===n)continue;f.seen=n;const g=f.x-a,x=f.z-o,m=f.radius+c;if(!(g*g+x*x>m*m)&&l(f)===!1)return!1}}return!0}const r={gap:0,nx:0,nz:0,px:0,pz:0};return{list:t,count:t.length,forEachNear:s,probe:Vs,resolve(a,o,c){let l=!1;return s(a.x,a.z,o,u=>{if(Vs(u,a.x,a.z,r),r.gap>=o)return!0;a.x+=r.nx*(o-r.gap),a.z+=r.nz*(o-r.gap);const h=c.x*r.nx+c.z*r.nz;return h<0&&(c.x-=h*r.nx,c.z-=h*r.nz),l=!0,!0}),l},isFree(a,o,c){return s(a,o,c,l=>Vs(l,a,o,r).gap>=c)},clearance(a,o,c=4){let l=c;return s(a,o,c,u=>(l=Math.min(l,Vs(u,a,o,r).gap),!0)),l},hitAt(a,o,c){let l=null,u=c;return s(a,o,c,h=>{const{gap:d}=Vs(h,a,o,r);return d<u&&(u=d,l=h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind}),!0}),l},hitAll(a,o,c,l=8){const u=[];return s(a,o,c,h=>{const{gap:d}=Vs(h,a,o,r);return d<c&&u.push({o:h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind},gap:d}),!0}),u.sort((h,d)=>h.gap-d.gap).slice(0,l).map(h=>h.o)}}}const ve=2,On=-500-ve*Math.ceil((-500-Kt.minX)/ve),Fn=-500-ve*Math.ceil((-500-Kt.minZ)/ve),bc=1.25,Nr=.45,JM=12e4,{SQRT2:Ws}=Math,QM=[[1,0,1],[0,1,2],[1,1,4],[-1,1,8]];function tb(i,t,e,n,s,r){const a=e-i,o=n-t,c=Math.max(0,Math.min(1,((s-i)*a+(r-t)*o)/(a*a+o*o))),l=i+a*c-s,u=t+o*c-r;return l*l+u*u}class eb{constructor(t){this.idx=new Int32Array(t),this.key=new Float64Array(t),this.size=0}push(t,e){let n=this.size++;for(;n>0;){const s=n-1>>1;if(this.key[s]<=e)break;this.idx[n]=this.idx[s],this.key[n]=this.key[s],n=s}this.idx[n]=t,this.key[n]=e}pop(){const t=this.idx[0],e=this.idx[--this.size],n=this.key[this.size];let s=0;for(;;){let r=2*s+1;if(r>=this.size||(r+1<this.size&&this.key[r+1]<this.key[r]&&r++,this.key[r]>=n))break;this.idx[s]=this.idx[r],this.key[s]=this.key[r],s=r}return this.idx[s]=e,this.key[s]=n,t}}function nb(i,t){const e=Math.ceil((Kt.maxX-On)/ve),n=Math.ceil((Kt.maxZ-Fn)/ve),s=e*n,r=U=>On+(U+.5)*ve,a=U=>Fn+(U+.5)*ve,o=new Float32Array(s);for(let U=0;U<n;U++)for(let Y=0;Y<e;Y++)o[U*e+Y]=i.heightAt(r(Y),a(U));const c=new Uint8Array(s);for(let U=1;U<n-1;U++)for(let Y=1;Y<e-1;Y++){const X=U*e+Y;if(o[X]<-1)continue;const J=(o[X+1]-o[X-1])/(2*ve),b=(o[X+e]-o[X-e])/(2*ve);Math.hypot(J,b)<=bc&&(c[X]=1)}for(const U of i.surfaces){const Y=Math.hypot(U.hx,U.hz),X=Math.max(0,Math.floor((U.x-Y-On)/ve)),J=Math.min(e-1,Math.floor((U.x+Y-On)/ve)),b=Math.max(0,Math.floor((U.z-Y-Fn)/ve)),z=Math.min(n-1,Math.floor((U.z+Y-Fn)/ve));for(let N=b;N<=z;N++)for(let y=X;y<=J;y++){const B=i.surfaceHeight(U,r(y),a(N)),O=N*e+y;B===-1/0||B<o[O]||(o[O]=B,c[O]=1)}}const l=new Uint8Array(s),u={};function h(U,Y,X,J,b){if(U.hx===void 0)return Math.sqrt(tb(Y,X,J,b,U.x,U.z))-U.radius;const z=Math.ceil(Math.hypot(J-Y,b-X)/.25);let N=1/0;for(let y=0;y<=z;y++){const B=y/z;N=Math.min(N,t.probe(U,Y+(J-Y)*B,X+(b-X)*B,u).gap)}return N}for(const U of t.list){const Y=U.radius+Nr,X=Math.max(0,Math.floor((U.x-Y-On)/ve)-1),J=Math.min(e-1,Math.floor((U.x+Y-On)/ve)+1),b=Math.max(0,Math.floor((U.z-Y-Fn)/ve)-1),z=Math.min(n-1,Math.floor((U.z+Y-Fn)/ve)+1);for(let B=b;B<=z;B++)for(let O=X;O<=J;O++){const k=B*e+O,{gap:R}=t.probe(U,r(O),a(B),u);if(R<Nr&&(c[k]=0),!(R>Nr+ve*Ws))for(const[H,I,C]of QM){const Z=O+H,Q=B+I;Z<0||Z>=e||Q>=n||h(U,r(O),a(B),r(Z),a(Q))<Nr&&(l[k]|=C)}}const N=Math.floor((U.x-On)/ve),y=Math.floor((U.z-Fn)/ve);N>=0&&y>=0&&N<e&&y<n&&(c[y*e+N]=0)}function d(U,Y,X,J){return J===0?l[Y*e+Math.min(U,U+X)]&1:X===0?l[Math.min(Y,Y+J)*e+U]&2:X===J?l[Math.min(Y,Y+J)*e+Math.min(U,U+X)]&4:J>0?l[Y*e+U]&8:l[(Y+J)*e+U+X]&8}const f=new Float32Array(s),g=new Int32Array(s),x=new Uint8Array(s),m=new eb(s*2),p=(U,Y)=>{const X=Math.min(e-1,Math.max(0,Math.floor((U-On)/ve)));return Math.min(n-1,Math.max(0,Math.floor((Y-Fn)/ve)))*e+X},M=U=>r(U%e),v=U=>a(Math.floor(U/e)),_=(U,Y)=>U<=On||Y<=Fn||U>=On+e*ve||Y>=Fn+n*ve?!1:c[p(U,Y)]===1,S=(U,Y)=>_(U,Y)&&t.isFree(U,Y,Nr);function T(U,Y,X,J){const b=Math.hypot(X-U,J-Y),z=Math.max(1,Math.ceil(b/.5));let N=i.surfaceAt(U,Y);for(let y=1;y<=z;y++){const B=U+(X-U)*y/z,O=Y+(J-Y)*y/z;if(!S(B,O))return!1;const k=i.surfaceAt(B,O);if(Math.abs(k-N)/(b/z)>bc)return!1;N=k}return!0}function L(U,Y,X,J){if(S(U,Y))return{x:U,z:Y};const b=i.surfaceAt(U,Y)<-1,z=Math.hypot(X-U,J-Y),N=Math.ceil(z/(ve*.5));for(let y=1;y<=N;y++){const B=U+(X-U)*y/N,O=Y+(J-Y)*y/N;if(S(B,O)&&(!b||i.surfaceAt(B,O)>-.4))return{x:B,z:O}}return null}function G(U,Y=5){if(c[U])return U;const X=U%e,J=Math.floor(U/e);for(let b=1;b<=Y;b++)for(let z=-b;z<=b;z++)for(let N=-b;N<=b;N++){if(Math.max(Math.abs(N),Math.abs(z))!==b)continue;const y=X+N,B=J+z;if(!(y<0||B<0||y>=e||B>=n)&&c[B*e+y])return B*e+y}return-1}const E=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Ws],[1,-1,Ws],[-1,1,Ws],[-1,-1,Ws]];function A(U,Y){const X=L(Y.x,Y.z,U.x,U.z);if(!X)return null;if(Math.hypot(X.x-U.x,X.z-U.z)<40&&T(U.x,U.z,X.x,X.z))return[X];const J=G(p(U.x,U.z)),b=G(p(X.x,X.z));if(J<0||b<0)return null;f.fill(1/0),x.fill(0),m.size=0;const z=b%e,N=Math.floor(b/e),y=I=>{const C=Math.abs(I%e-z),Z=Math.abs(Math.floor(I/e)-N);return C+Z+(Ws-2)*Math.min(C,Z)};f[J]=0,m.push(J,y(J));let B=0,O=!1;for(;m.size;){const I=m.pop();if(I===b){O=!0;break}if(x[I])continue;if(x[I]=1,++B>JM)break;const C=I%e,Z=Math.floor(I/e);for(const[Q,et,gt]of E){const xt=C+Q,K=Z+et;if(xt<0||K<0||xt>=e||K>=n)continue;const $=K*e+xt;if(!c[$]||x[$]||Q&&et&&(!c[Z*e+xt]||!c[K*e+C])||d(C,Z,Q,et)||Math.abs(o[$]-o[I])/(gt*ve)>bc)continue;const rt=f[I]+gt;rt<f[$]&&(f[$]=rt,g[$]=I,m.push($,rt+y($)))}}if(!O)return null;const k=[b];for(let I=b;I!==J;)I=g[I],k.push(I);k.reverse();const R=[U,...k.map(I=>({x:M(I),z:v(I)})),X],H=[];for(let I=0;I<R.length-1;){let C=I+1;for(;C+1<R.length&&T(R[I].x,R[I].z,R[C+1].x,R[C+1].z);)C++;H.push(R[C]),I=C}return H}return{findPath:A,walkableAt:_,standable:S,lineClear:T,cellSize:ve,size:[e,n],origin:[On,Fn]}}function Do(i){const t=new Map,e=new Map,n=i.clone();return Pp(i,n,function(s,r){t.set(r,s),e.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=t.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Pp(i,t,e){e(i,t);for(let n=0;n<i.children.length;n++)Pp(i.children[n],t.children[n],e)}const Sc=6,zf=.35,Df=1.1,ib=4,sb=9,rb=60,Ac=2.6,kf=1,ab=15,Nf=5,ob=1.3,pi={size:3,speed:2.4,sight:7,reach:1.3,hit:.24,dur:.42,linger:25,view:150},cb={x:-425,z:40},qa={x:-160,z:40},cs={kind:"pemain"};function lb(){const i=new Io(.5,.58,40),t=[0,1,2,3].map(r=>{const a=new bn(.07,.26);return a.translate(0,.66,0),a.rotateZ(r*Math.PI/2),a}),n=[i,...t].map(r=>r.toNonIndexed()).flatMap(r=>[...r.attributes.position.array]),s=new fe;return s.setAttribute("position",new Xt(n,3)),s}function Dl(i,t,e,n,s,r=.6){return i.heightAt(n,s)>.5&&i.slopeAt(n,s)<.6&&e.walkableAt(n,s)&&t.isFree(n,s,r)}function ub(i,t,e,n,s){for(let r=0;r<=40;r+=2)for(let a=0;a<Math.PI*2;a+=r?2/r:7){const o=n+Math.cos(a)*r,c=s+Math.sin(a)*r;if(!Dl(i,t,e,o,c,.8))continue;const l=[];for(let u=0;u<Nf;u++){const h=u/Nf*Math.PI*2;l.push({x:o+Math.cos(h)*2.6,z:c+Math.sin(h)*2.6})}if(l.every(u=>Dl(i,t,e,u.x,u.z)))return{x:o,z:c,spots:l}}return null}function hb({ground:i,colliders:t,nav:e,asset:n,spawn:s}){const r=new Pe;r.name="musuh";const a=[],o=new bn(1,1),c=new Xe({color:"#2a0d0d",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),l=new Xe({color:"#ff4636",depthTest:!1,depthWrite:!1,toneMapped:!1}),u=lb(),h=new Xe({color:"#ff2a2a",transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1,toneMapped:!1,side:on}),d=n.model.getObjectByName("head-mesh"),f=new V;d.geometry.computeBoundingBox(),d.geometry.boundingBox.getCenter(f);const g=d.geometry.clone().translate(-f.x,-f.y,-f.z);g.deleteAttribute("skinIndex"),g.deleteAttribute("skinWeight");const x=[],m=y=>Ms.findByName(n.clips,y);function p(y,B){const O=new Pe;O.name="orc";const k=Do(n.model),R=[];k.traverse(xt=>{xt.isMesh&&(xt.material=xt.material.clone(),R.push(xt.material))}),O.add(k);const H=new pu(k),I={};for(const xt of["idle","walk","sprint","die","attack"]){const K=H.clipAction(m(xt==="attack"?"attack-melee-right":xt));(xt==="die"||xt==="attack")&&(K.setLoop(Kl,1),K.clampWhenFinished=!0),I[xt]=K}I.idle.play();const C=new Pe,Z=new ie(o,c);Z.scale.set(1.08,.2,1),Z.renderOrder=11;const Q=new ie(o,l);Q.renderOrder=12,C.add(Z,Q),C.visible=!1;const et=new ie(u,h);et.visible=!1,et.renderOrder=13,r.add(O,C,et),O.position.set(B.x,i.heightAt(B.x,B.z),B.z);const gt=Math.random()*Math.PI*2;return O.rotation.y=gt,{id:y,root:O,model:k,mixer:H,actions:I,current:I.idle,materials:R,bar:C,fill:Q,reticle:et,headMesh:k.getObjectByName("head-mesh"),headBone:k.getObjectByName("head"),home:B,pos:O.position,heading:gt,target:null,wait:Math.random()*3,hp:Sc,kx:0,kz:0,flash:0,barTime:0,state:"hidup",deadT:0,headless:!1,marked:!1,raid:null}}function M(y,B,O=.2){const k=y.actions[B];y.current!==k&&(k.reset().play(),k.crossFadeFrom(y.current,O,!1),y.current=k)}const v=Math.atan2(-s.x,-s.z),_=[{x:s.x+Math.sin(v)*16,z:s.z+Math.cos(v)*16},{x:-60,z:-80},{x:205,z:25},{x:40,z:-200},{x:15,z:190}],S=[];for(const y of _){const B=ub(i,t,e,y.x,y.z);if(B){S.push(B);for(const O of B.spots)a.push(p(a.length,{x:O.x,z:O.z,camp:B}))}}function T(y){y.state="mati",y.deadT=0,y.hp=0,y.marked=!1,y.target=null,y.raid=null,M(y,"die",.08)}function L(y){y.state="hidup",y.hp=Sc,y.headless=!1,y.headMesh.visible=!0,y.kx=y.kz=0,y.flash=y.barTime=0,y.model.position.y=0,y.pos.set(y.home.x,i.heightAt(y.home.x,y.home.z),y.home.z),y.actions.die.stop(),y.current.stop(),y.current=y.actions.idle,y.current.reset().play()}function G(y){for(let B=0;B<4;B++){const O=Math.random()*Math.PI*2,k=Math.random()*ib,R=y.home.camp.x+Math.cos(O)*k,H=y.home.camp.z+Math.sin(O)*k;if(Dl(i,t,e,R,H,.5))return{x:R,z:H}}return null}function E(y,B,O){const k=Math.atan2(Math.sin(B-y.heading),Math.cos(B-y.heading));y.heading+=k*Math.min(1,6*O)}let A={near:()=>null,pos:()=>null,strike:()=>{}};function U(y,B,O){const k=y.raid;if(k.target){const Q=k.target===cs?O:A.pos(k.target);(!Q||k.target===cs&&Math.hypot(Q.x-y.pos.x,Q.z-y.pos.z)>25)&&(k.target=null)}if(k.scan-=B,k.scan<=0&&(k.scan=.4,k.target===cs&&Math.hypot(O.x-y.pos.x,O.z-y.pos.z)<8||(k.target=A.near(y.pos.x,y.pos.z,pi.sight))),k.cd-=B,k.atk){const{atk:Q}=k;Q.t+=B;const et=k.target?k.target===cs?O:A.pos(k.target):null;return et&&E(y,Math.atan2(et.x-y.pos.x,et.z-y.pos.z),B),!Q.hit&&Q.t>=pi.hit&&(Q.hit=!0,et&&Math.hypot(et.x-y.pos.x,et.z-y.pos.z)<pi.reach+.6&&A.strike(y,k.target,k.target===cs?6:1)),Q.t>=pi.dur&&k.atk===Q&&(k.atk=null),!1}let R=null,{speed:H}=pi;if(k.target){const Q=k.target===cs?O:A.pos(k.target),et=Math.hypot(Q.x-y.pos.x,Q.z-y.pos.z);if(et<=pi.reach)return E(y,Math.atan2(Q.x-y.pos.x,Q.z-y.pos.z),B),k.cd<=0&&(k.atk={t:0,hit:!1},k.cd=1.5+Math.random()*.5,y.actions.attack.reset(),M(y,"attack",.05)),!1;R=Q,et<4&&(H=1.6)}else if(k.i<k.path.length)R=k.path[k.i],Math.hypot(R.x-y.pos.x,R.z-y.pos.z)<1.2&&k.i++;else return k.back?(y.raid=null,!1):(k.idle+=B,k.idle>pi.linger&&(k.back=!0,k.path=[...k.path].reverse(),k.path.push({x:y.home.x,z:y.home.z}),k.i=0),!1);const I=R.x-y.pos.x,C=R.z-y.pos.z,Z=Math.hypot(I,C)||1;return E(y,Math.atan2(I,C),B),y.pos.x+=I/Z*Math.min(H*B,Z),y.pos.z+=C/Z*Math.min(H*B,Z),H}const Y=new Ot,X=new Ot().makeTranslation(f.x,f.y,f.z);function J(y,B){let O=x.find(Q=>!Q.mesh.visible);O||(O={mesh:new ie(g),vel:new V,axis:new V,spin:0,t:0,s:1},O.mesh.castShadow=!0,r.add(O.mesh),x.push(O)),y.root.updateMatrixWorld(!0);const k=y.headMesh.skeleton;Y.multiplyMatrices(y.headBone.matrixWorld,k.boneInverses[k.bones.indexOf(y.headBone)]).multiply(y.headMesh.bindMatrix).multiply(X),Y.decompose(O.mesh.position,O.mesh.quaternion,O.mesh.scale),O.s=O.mesh.scale.x,O.mesh.material=y.headMesh.material,O.mesh.visible=!0;let R=y.pos.x-B.x,H=y.pos.z-B.z;const I=Math.hypot(R,H)||1;R/=I,H/=I;const C=(Math.random()-.5)*1.6,Z=2+Math.random()*1.5;O.vel.set((R-H*C)*Z,4.5+Math.random()*1.5,(H+R*C)*Z),O.axis.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),O.spin=7+Math.random()*6,O.t=0,y.headMesh.visible=!1,y.headless=!0}function b(y){for(const B of x){if(!B.mesh.visible)continue;B.t+=y;const O=B.mesh.position;B.vel.y-=14*y,O.addScaledVector(B.vel,y),B.mesh.rotateOnWorldAxis(B.axis,B.spin*y);const k=Math.max(i.heightAt(O.x,O.z),-.2)+.4;O.y<k&&(O.y=k,B.vel.y<-2?(B.vel.set(B.vel.x*.55,-B.vel.y*.35,B.vel.z*.55),B.spin*=.5):(B.vel.set(0,0,0),B.spin=0)),B.t>3&&B.mesh.scale.setScalar(B.s*Math.max(0,1-(B.t-3)/.5)),B.t>3.5&&(B.mesh.visible=!1)}}let z=0;const N=new V;return{object:r,list:a,camps:S,get alive(){return a.filter(y=>y.state==="hidup").length},hit(y,B,O,k){const R=[];for(const H of a){if(H.state!=="hidup"||Math.hypot(H.pos.x-y.x,H.pos.z-y.z)>y.r+zf)continue;let I=H.pos.x-k.x,C=H.pos.z-k.z;const Z=Math.hypot(I,C)||1;I/=Z,C/=Z,H.kx=I*O,H.kz=C*O,H.hp-=B,H.flash=.15,H.barTime=4,H.target=null,H.raid&&(H.raid.target=cs),H.hp<=0&&T(H),R.push({id:H.id,x:H.pos.x,y:H.pos.y,z:H.pos.z,dead:H.state!=="hidup"})}return R},decapitate(y,B){const O=[];for(const k of y){const R=a[k];!R||R.state!=="hidup"||(J(R,B),T(R),O.push({id:k,x:R.pos.x,y:R.pos.y,z:R.pos.z}))}return O},pickTargets(y,B,O,k){const R=a.filter(Z=>Z.state==="hidup"&&Math.hypot(Z.pos.x-y,Z.pos.z-B)<=O).sort((Z,Q)=>Math.hypot(Z.pos.x-y,Z.pos.z-B)-Math.hypot(Q.pos.x-y,Q.pos.z-B)).slice(0,k),H=[];let I=y,C=B;for(;R.length;){let Z=0;for(let et=1;et<R.length;et++)Math.hypot(R[et].pos.x-I,R[et].pos.z-C)<Math.hypot(R[Z].pos.x-I,R[Z].pos.z-C)&&(Z=et);const[Q]=R.splice(Z,1);H.push({id:Q.id,x:Q.pos.x,z:Q.pos.z}),I=Q.pos.x,C=Q.pos.z}return H},position(y){const B=a[y];return B&&B.state==="hidup"?{x:B.pos.x,z:B.pos.z}:null},damage(y,B,O){const k=a[y];if(!k||k.state!=="hidup")return;let R=k.pos.x-O.x,H=k.pos.z-O.z;const I=Math.hypot(R,H)||1;R/=I,H/=I,k.kx=R*1.6,k.kz=H*1.6,k.hp-=B,k.flash=.15,k.barTime=4,k.hp<=0&&T(k)},setFoes(y){A=y},startRaid(y){const B=S.filter(O=>Math.hypot(O.x-y.x,O.z-y.z)>60).map(O=>({c:O,members:a.filter(k=>k.home.camp===O&&k.state==="hidup"&&!k.raid)})).filter(O=>O.members.length>=2).sort((O,k)=>Math.hypot(O.c.x-qa.x,O.c.z-qa.z)-Math.hypot(k.c.x-qa.x,k.c.z-qa.z));for(const{c:O,members:k}of B){const R=e.findPath({x:O.x,z:O.z},cb);if(R)return k.slice(0,pi.size).forEach((H,I)=>{H.target=null,H.raid={path:R.slice(),i:0,target:null,scan:I*.13,cd:0,atk:null,idle:0,back:!1},H.raid.delay=I*.9}),!0}return!1},get raidActive(){return a.some(y=>y.raid&&y.state==="hidup")},raiders(){return a.filter(y=>y.raid&&y.state==="hidup").map(y=>({id:y.id,x:y.pos.x,z:y.pos.z}))},reviveAll(){for(const y of a)L(y)},mark(y,B){for(const O of y)a[O]&&(a[O].marked=B&&a[O].state==="hidup")},update(y,B,O,k=O.position){var I;z+=y;const R=O.position,H=O.attackMove==="penggal";for(const C of a){const Z=C.pos.x-R.x,Q=C.pos.z-R.z,et=Math.hypot(Z,Q),gt=Math.hypot(C.pos.x-k.x,C.pos.z-k.z)<(C.raid?pi.view:rb);if(C.state==="hilang"){C.deadT+=y,C.deadT>ab&&L(C),C.root.visible=!1,C.bar.visible=C.reticle.visible=!1;continue}if(C.root.visible=gt,C.state==="mati")C.deadT+=y,C.deadT>Ac&&(C.model.position.y=-((C.deadT-Ac)/kf)*.9),C.deadT>Ac+kf&&(C.state="hilang",C.deadT=0);else{let xt=!1,K=0;if(C.raid&&C.raid.delay>0&&(C.raid.delay-=y),Math.abs(C.kx)+Math.abs(C.kz)>.05){const $=C.pos.x+C.kx*y,rt=C.pos.z+C.kz*y;i.heightAt($,rt)>-.3&&(C.pos.x=$,C.pos.z=rt);const F=Math.exp(-7*y);C.kx*=F,C.kz*=F}else if(C.raid)C.raid.delay<=0&&(K=U(C,y,R));else if(et<sb)E(C,Math.atan2(-Z,-Q),y),C.target=null;else if(C.target){const $=C.target.x-C.pos.x,rt=C.target.z-C.pos.z,F=Math.hypot($,rt);F<.3?(C.target=null,C.wait=1.5+Math.random()*3):(E(C,Math.atan2($,rt),y),C.pos.x+=$/F*Df*y,C.pos.z+=rt/F*Df*y,xt=!0)}else(C.wait-=y)<=0&&(C.target=G(C),C.wait=2);!H&&et<.75&&et>1e-4&&(C.pos.x=R.x+Z/et*.75,C.pos.z=R.z+Q/et*.75);for(const $ of a){if($===C||$.state!=="hidup")continue;const rt=C.pos.x-$.pos.x,F=C.pos.z-$.pos.z,dt=Math.hypot(rt,F);dt<.7&&dt>1e-4&&(C.pos.x+=rt/dt*(.7-dt)*.5,C.pos.z+=F/dt*(.7-dt)*.5)}t.resolve(C.pos,zf,N.set(0,0,0)),C.pos.y=i.surfaceAt(C.pos.x,C.pos.z),(I=C.raid)!=null&&I.atk||(K?(M(C,K>2?"sprint":"walk"),C.actions.sprint.timeScale=K/3.6):M(C,xt?"walk":"idle"))}if(C.root.rotation.y=C.heading,C.flash>0){C.flash=Math.max(0,C.flash-y);for(const xt of C.materials)xt.emissive.setScalar(C.flash/.15*.8)}if(C.barTime-=y,C.bar.visible=gt&&C.state==="hidup"&&C.barTime>0,C.bar.visible){C.bar.position.set(C.pos.x,C.pos.y+2.05,C.pos.z),C.bar.quaternion.copy(B.quaternion);const xt=Math.max(0,C.hp/Sc);C.fill.scale.set(xt,.13,1),C.fill.position.x=-(1-xt)/2}C.reticle.visible=gt&&C.marked&&C.state==="hidup",C.reticle.visible&&(C.reticle.position.set(C.pos.x,C.pos.y+ob,C.pos.z),C.reticle.quaternion.copy(B.quaternion),C.reticle.rotateZ(z*2.5),C.reticle.scale.setScalar(1+.12*Math.sin(z*14))),gt&&C.mixer.update(y)}b(y)}}}const vi=[{id:"perisai",name:"Pasukan perisai",count:5e3,flag:0,map:"#d8463c"},{id:"tombak",name:"Pasukan tombak",count:5e3,flag:3,map:"#4f78d0"},{id:"pedang",name:"Pasukan pedang",count:5e3,flag:4,map:"#3f9f6a"},{id:"pemanah",name:"Pasukan pemanah",count:5e3,flag:1,map:"#e3b43a"},{id:"kavaleri",name:"Pasukan berkuda",count:5e3,flag:2,map:"#e9e6dc"}],kl=Math.PI,Ui=(Mn.x0+Mn.x1)/2,sn=Mn.z0+30,se={files:200,ranks:25,sx:1.2,sz:1.35,group:50,lane:4,gap:6},ce={files:50,ranks:50,sx:1.35,sz:2.75,group:25,lane:4,gap:10},Oi={inf:[.55,.6],cav:[.55,1.35]},Uf=(i,t,e,n)=>(i-1)*t+(Math.ceil(i/e)-1)*n,Fi=(i,t,e,n,s)=>i+t*e+Math.floor(t/n)*s;function fb(i){let t=Math.imul(i^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,(t>>>0)/4294967296}function db(){const i=vi.reduce((M,v)=>M+v.count,0),t=[],e=[],n=[],s=new Float32Array(i+8),r=new Float32Array(i+8),a=new Uint8Array(i+8);let o=0;const c=(M,v,_)=>{s[o]=M,r[o]=v,a[o]=_,o++},l=Uf(se.files,se.sx,se.group,se.lane),u=(se.ranks-1)*se.sz,h=Ui-l/2;for(let M=0;M<4;M++){const v=sn+M*(u+se.gap);for(let _=0;_<se.ranks;_++)for(let S=0;S<se.files;S++)c(Fi(h,S,se.sx,se.group,se.lane),v+_*se.sz,M);for(let _=0;_<se.files/se.group;_++){const S=Fi(h,_*se.group,se.sx,se.group,se.lane),T=Fi(h,(_+1)*se.group-1,se.sx,se.group,se.lane);e.push({type:M,x0:S-Oi.inf[0],x1:T+Oi.inf[0],z0:v-Oi.inf[1],z1:v+u+Oi.inf[1]})}}const d=sn+3*(u+se.gap)+u,f=Uf(ce.files,ce.sx,ce.group,ce.lane),g=(ce.ranks-1)*ce.sz,x=[Ui-l/2-ce.gap-f,Ui+l/2+ce.gap];for(const M of x){for(let v=0;v<ce.ranks;v++)for(let _=0;_<ce.files;_++)c(Fi(M,_,ce.sx,ce.group,ce.lane),sn+v*ce.sz,4);for(let v=0;v<ce.files/ce.group;v++){const _=Fi(M,v*ce.group,ce.sx,ce.group,ce.lane),S=Fi(M,(v+1)*ce.group-1,ce.sx,ce.group,ce.lane);e.push({type:4,x0:_-Oi.cav[0],x1:S+Oi.cav[0],z0:sn-Oi.cav[1],z1:sn+g+Oi.cav[1]})}}const m=x.map(M=>M+f/2);for(const M of[m[0],Ui-96,Ui-32,Ui+32,Ui+96,m[1]])t.push({x:M,z:sn-9});t.push({x:Ui,z:sn-20,chief:!0});for(const M of t)c(M.x,M.z,5);for(let M=1;M<se.files/se.group;M++){const v=Fi(h,M*se.group,se.sx,se.group,se.lane)-(se.lane+se.sx)/2;n.push([v,sn-3,v,d+3,se.lane-.4])}for(let M=1;M<4;M++){const v=sn+M*(u+se.gap)-(se.gap+se.sz)/2;n.push([h-2,v,h+l+2,v,se.gap-.6])}for(const M of x){const v=Fi(M,ce.group,ce.sx,ce.group,ce.lane)-(ce.lane+ce.sx)/2;n.push([v,sn-3,v,sn+g+3,ce.lane-.4])}for(const M of[h-ce.gap/2,h+l+ce.gap/2])n.push([M,sn-3,M,Math.max(d,sn+g)+3,ce.gap-1]);const p=new Float32Array(o);for(let M=0;M<o;M++)p[M]=fb(M);return{soldiers:{count:o,x:s.subarray(0,o),z:r.subarray(0,o),type:a.subarray(0,o),phase:p},total:i,officers:t,blocks:e,lanes:n,bounds:{x0:x[0]-2,x1:x[1]+f+2,z0:sn-22,z1:Math.max(d,sn+g)+2},heading:kl}}const De=Se.y,ee={selatan:0,timur:Math.PI/2,utara:Math.PI,barat:-Math.PI/2};function pb(i){const t=sa(8128),e=(b,z)=>b+(z-b)*t(),n=b=>b[Math.floor(t()*b.length)],s=xM(i.heightAt),r={spans:s,build:[],colliders:[],surfaces:[],roads:[],pave:[],lawn:[],fields:[],blocked:[],trees:[],boats:[],spots:[],paths:[],roofs:[],tracks:[],army:null},a=(b,z,N,y,B)=>{const O=Math.cos(B),k=Math.sin(B);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([R,H])=>[b+R*N/2*O+H*y/2*k,z-R*N/2*k+H*y/2*O])},o=(b,z,N,y,B)=>Math.max(...a(b,z,N,y,B).map(([O,k])=>i.heightAt(O,k)),i.heightAt(b,z)),c=(b,z,N,y,B,O)=>{r.colliders.push({x:b,z,hx:N/2,hz:y/2,rot:B,kind:O})},l=(b,z,N,y,B=0)=>r.blocked.push({x:b,z,hx:N/2,hz:y/2,rot:B}),u=b=>(r.build.push(b),b);function h(b,z,N,y,B,O,k="tembok",R="bata",H=De){const I=Math.hypot(N-b,y-z);if(I<.5)return;const C=Math.atan2(N-b,y-z),Z=(b+N)/2,Q=(z+y)/2;u({type:k,x:Z,y:H,z:Q,rot:C,len:I,t:B,h:O}),c(Z,Q,B,I,C,R),l(Z,Q,B+2,I,C)}function d(b,z,N){const y=[];let B=b;for(const[O,k]of[...N].sort((R,H)=>R[0]-H[0]))O-k>B&&y.push([B,O-k]),B=Math.max(B,O+k);return z>B&&y.push([B,z]),y}const f=2.2,g=5,x=7.5,m={utara:[-580,-490],selatan:[-630,-480],barat:[-10,50],timur:[-20,100]},p=[[Se.x0,Se.z0],[Se.x1,Se.z0],[Se.x1,Se.z1],[Se.x0,Se.z1]];for(const[b,z]of p)u({type:"menara",x:b,y:De,z,rot:0,size:x,h:7.6}),c(b,z,x,x,0,"bata"),l(b,z,x+2,x+2);const M=b=>lM.filter(z=>b==="utara"&&z.z===Se.z0||b==="selatan"&&z.z===Se.z1||b==="barat"&&z.x===Se.x0||b==="timur"&&z.x===Se.x1),v=b=>b.id==="timur"?5.5:4.5;for(const b of["utara","selatan","barat","timur"]){const z=b==="utara"||b==="selatan",N={utara:Se.z0,selatan:Se.z1,barat:Se.x0,timur:Se.x1}[b],[y,B]=z?[Se.x0,Se.x1]:[Se.z0,Se.z1],O=[[y,x/2],[B,x/2]];for(const k of m[b]){O.push([k,3]);const[R,H]=z?[k,N]:[N,k];u({type:"menara",x:R,y:De,z:H,rot:0,size:6,h:6.8}),c(R,H,6,6,0,"bata"),l(R,H,8,8)}for(const k of M(b)){const R=z?k.x:k.z,H=v(k);O.push([R,k.w/2+H]);for(const I of[-1,1]){const C=R+I*(k.w/2+H/2),[Z,Q]=z?[C,N]:[N,C],et=z?0:Math.PI/2;u({type:"bentar",x:Z,y:De,z:Q,rot:et,w:H,d:4.2,h:k.id==="timur"?13:10.5,mirror:I>0?z?1:-1:z?-1:1}),c(Z,Q,z?H:4.2,z?4.2:H,0,"bata"),l(Z,Q,H+1,5.2,et)}for(const I of[-1,1]){const C=R+I*(k.w/2-.9);for(const Z of[-3.6,3.6]){const[Q,et]=z?[C,N+Z]:[N+Z,C],gt=z?Z>0?ee.selatan:ee.utara:Z>0?ee.timur:ee.barat;r.spots.push({x:Q,z:et,rot:gt,role:"penjaga",anim:"idle"})}}}for(const[k,R]of d(y,B,O))z?h(k,N,R,N,f,g):h(N,k,N,R,f,g)}for(const b of fM)r.roads.push(b);{const b=yp,z=1.2,N=3.6,y=b.gate,B=5,O=9;h(b.x0,b.z0,b.x1,b.z0,z,N,"tembok-dalam"),h(b.x0,b.z1,b.x1,b.z1,z,N,"tembok-dalam"),h(b.x0,b.z0,b.x0,b.z1,z,N,"tembok-dalam"),h(b.x1,b.z0,b.x1,y.z-O/2,z,N,"tembok-dalam"),h(b.x1,y.z+O/2,b.x1,b.z1,z,N,"tembok-dalam"),u({type:"paduraksa",x:y.x,y:De,z:y.z,rot:Math.PI/2,w:O,d:5,opening:B,h:15});for(const et of[-1,1]){const gt=y.z+et*(B/2+(O-B)/4);c(y.x,gt,5,(O-B)/2,0,"bata"),r.spots.push({x:y.x+3.4,z:y.z+et*2.1,rot:ee.timur,role:"penjaga",anim:"idle"})}l(y.x,y.z,6,O+1),r.roofs.push({x:y.x,z:y.z,hx:3.5,hz:B/2,r:6});const k={x:-628,z:40,w:30,d:28,h:1};u({type:"pendopo",x:k.x,y:De,z:k.z,rot:Math.PI/2,w:k.d,d:k.w,h:k.h}),r.surfaces.push({x:k.x,z:k.z,hx:k.w/2,hz:k.d/2,rot:0,y0:De+k.h,y1:De+k.h});const R=10,H=3.2;r.surfaces.push({x:k.x+k.w/2+H/2,z:k.z,hx:R/2,hz:H/2,rot:-Math.PI/2,y0:De+.02,y1:De+k.h});const I=k.x+k.w/2,C=k.x-k.w/2,Z=k.z-k.d/2,Q=k.z+k.d/2;for(const[et,gt,xt,K]of[[C,Z,I,Z],[C,Q,I,Q],[C,Z,C,Q],[I,Z,I,k.z-R/2],[I,k.z+R/2,I,Q]]){const $=Math.hypot(xt-et,K-gt),rt=Math.atan2(xt-et,K-gt);c((et+xt)/2,(gt+K)/2,.5,$,rt,"batu")}l(k.x,k.z,k.w+2,k.d+2),r.roofs.push({x:k.x,z:k.z,hx:k.w/2+1.5,hz:k.d/2+1.5,r:10});for(const[et,gt]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:k.x+et*3.2,z:k.z+gt*3.2,radius:.35,kind:"kayu"});for(let et=-2;et<=2;et++)for(const gt of[-1,1])r.colliders.push({x:k.x+et*6.3,z:k.z+gt*12.4,radius:.28,kind:"kayu"}),Math.abs(et)<2&&!(gt>0&&et===0)&&r.colliders.push({x:k.x+gt*13.4,z:k.z+et*6.2,radius:.28,kind:"kayu"});r.spots.push({x:k.x-9.2,z:k.z,rot:ee.timur,role:"raja",anim:"sit",y:De+k.h+.5}),r.spots.push({x:k.x-8,z:k.z-3,rot:ee.timur,role:"penjaga",anim:"idle",y:De+k.h}),r.spots.push({x:k.x-8,z:k.z+3,rot:ee.timur,role:"penjaga",anim:"idle",y:De+k.h});for(const et of[-1,1])r.spots.push({x:I+H+1.2,z:k.z+et*6,rot:ee.timur,role:"penjaga",anim:"idle"});u({type:"bangsal",x:-669,y:De,z:40,rot:Math.PI/2,w:32,d:16,h:1.5}),c(-669,40,16,32,0,"bata"),l(-669,40,18,34);for(const[et,gt,xt]of[[-676,9,9],[-676,71,7]])u({type:"meru",x:et,y:De,z:gt,rot:0,base:7,tiers:xt}),c(et,gt,7,7,0,"bata"),l(et,gt,9,9);for(const[et,gt]of[[-647,8],[-647,72],[-612,9],[-612,71]]){u({type:"bale",x:et,y:De,z:gt,rot:0,w:6,d:6}),r.roofs.push({x:et,z:gt,hx:3.5,hz:3.5,r:5});for(const[xt,K]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:et+xt*2.6,z:gt+K*2.6,radius:.22,kind:"kayu"});l(et,gt,7,7)}r.lawn.push({x0:b.x0+1,z0:b.z0+1,x1:b.x1-1,z1:b.z1-1}),r.pave.push({x0:I,z0:y.z-5,x1:b.x1,z1:y.z+5}),r.pave.push({x0:C-2,z0:Z-2,x1:I+2,z1:Q+2}),r.pave.push({x0:-680,z0:20,x1:C,z1:60});for(const[et,gt]of[[-660,4],[-660,76],[-626,4],[-626,76],[-640,16],[-640,64],[-686,30],[-686,50]])r.trees.push({type:"kamboja",x:et,z:gt,s:e(.9,1.15)});r.pave.push({x0:b.x1,z0:b.z0,x1:df.x0,z1:b.z1});for(let et=b.z0+6;et<=b.z1-6;et+=12)Math.abs(et-y.z)<8||(u({type:"umbul",x:b.x1+7,y:De,z:et,rot:Math.PI/2,h:9,color:Math.round(et)%3}),r.colliders.push({x:b.x1+7,z:et,radius:.18,kind:"kayu"}))}{const b=df;r.lawn.push({...b});for(const z of[26,54]){const N=(b.x0+b.x1)/2;r.trees.push({type:"beringin",x:N,z,s:1}),r.colliders.push({x:N,z,radius:1.7,kind:"pohon"});const y=6;for(const[B,O,k,R]of[[N-y,z-y,N+y,z-y],[N-y,z+y,N+y,z+y],[N-y,z-y,N-y,z+y],[N+y,z-y,N+y,z+y]])h(B,O,k,R,.45,1.1,"pagar")}for(let z=0;z<6;z++){const N=z/6*Math.PI*2,y=z<3?26:54;r.spots.push({x:(b.x0+b.x1)/2+Math.cos(N)*8.5,z:y+Math.sin(N)*8.5,rot:N+Math.PI/2,role:"warga",anim:z%2?"sit":"idle"})}}{const b=hM;r.pave.push({...b});const z=[-492,-478,-464,-450,-437],N=[55,66,76],y=["buah","ikan","kain","sayur","gerabah"];N.forEach((B,O)=>z.forEach((k,R)=>{if(O===1&&R===2)return;const H=O===0?ee.utara:ee.selatan;u({type:"warung",x:k,y:De,z:B,rot:H,color:(O*5+R)%6,goods:y[(O+R*2)%y.length]}),c(k,B,3.6,2.2,0,"kayu"),l(k,B,4.4,3.4);const I=O===0?1.9:-1.9;r.spots.push({x:k+e(-.8,.8),z:B+I,rot:H,role:"penjual",anim:n(["idle","interact","interact"])})})),u({type:"sumur",x:-464,y:De,z:66,rot:0}),r.colliders.push({x:-464,z:66,radius:1.1,kind:"batu"});for(const[B,O]of[[-497,50],[-433,50],[-497,80],[-433,80]])r.trees.push({type:"mangga",x:B,z:O,s:.8});for(let B=0;B<8;B++)r.spots.push({x:e(b.x0+4,b.x1-4),z:n([60.5,71]),rot:t()*Math.PI*2,role:"pembeli",anim:"idle"})}{const b=uM;r.pave.push({...b});const z=6;h(b.x0,b.z0,b.x1,b.z0,.8,1.6,"pagar-batu","batu"),h(b.x0,b.z0,b.x0,b.z1,.8,1.6,"pagar-batu","batu"),h(b.x1,b.z0,b.x1,b.z1,.8,1.6,"pagar-batu","batu"),h(b.x0,b.z1,b.x-z/2-3,b.z1,.8,1.6,"pagar-batu","batu"),h(b.x+z/2+3,b.z1,b.x1,b.z1,.8,1.6,"pagar-batu","batu");for(const N of[-1,1]){const y=b.x+N*(z/2+1.5);u({type:"bentar",x:y,y:De,z:b.z1,rot:0,w:3,d:2.6,h:6.5,mirror:N,stone:!0}),c(y,b.z1,3,2.6,0,"batu")}u({type:"candi",x:b.x,y:De,z:b.z,rot:0,base:17}),c(b.x,b.z,17,17,0,"batu"),l(b.x,b.z,19,19);for(const[N,y]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const B=b.x+N*21,O=b.z+y*23;u({type:"candi",x:B,y:De,z:O,rot:0,base:6}),c(B,O,6,6,0,"batu"),l(B,O,7,7)}r.spots.push({x:b.x,z:b.z+12,rot:ee.utara,role:"pendeta",anim:"sit"}),r.spots.push({x:b.x-3,z:b.z+12.5,rot:ee.utara,role:"warga",anim:"sit"})}const _=[-694,-647,-600,-553,-504],S={"-694":5,"-647":5,"-600":5,"-553":5,"-504":6,"-426":5},T=[{z:[-54,-29],w:[5,5]},{z:[-29,-5],w:[5,6]},{z:[85,110],w:[6,5],east:!0},{z:[110,134],w:[5,5],east:!0}],L=b=>b<-600?["joglo","joglo","bata","bata","panggung"]:["bata","bata","panggung","panggung","joglo","limasan"];function G(b,z,N,y,B){let O=b+e(.4,1.4);for(;O<z-5;){const k=n(L(O)),R=k==="joglo"?e(8,9.5):k==="panggung"?e(5.6,6.8):e(6.4,8.2);if(O+R>z)break;const H=Math.min(B,k==="joglo"?e(7,8):k==="panggung"?e(5.4,6.2):e(6,7.2)),I=O+R/2,C=N+(y===ee.utara?H/2:-H/2);E(k,I,C,R,H,y),O+=R+e(1,2.4)}}function E(b,z,N,y,B,O){const k=o(z,N,y,B,O);u({type:`rumah-${b}`,x:z,y:k,z:N,rot:O,w:y,d:B,roof:Math.floor(t()*4),wall:t()}),c(z,N,y+(b==="panggung"?.3:.1),B+.1,O,b==="bata"||b==="limasan"?"bata":"kayu"),l(z,N,y+1.5,B+1.5,O)}for(const b of T){const z=b.east?[..._,-426]:_;for(let N=0;N<z.length-1;N++){const y=z[N]+S[z[N]]/2+.8,B=z[N+1]-S[z[N+1]]/2-.8,O=b.z[0]+b.w[0]/2+.8,k=b.z[1]-b.w[1]/2-.8,R=k-O;R>=13?(G(y,B,O,ee.utara,(R-1)/2),G(y,B,k,ee.selatan,(R-1)/2)):G(y,B,O,ee.utara,R);const H=(O+k)/2;for(let I=y+6;I<B-4;I+=e(9,15))r.trees.push({type:n(["mangga","pisang","pisang","kelapa"]),x:I+e(-1,1),z:H+e(-.6,.6),s:e(.75,1)})}}const A=[{x0:-418,z0:-175,x1:-340,z1:22},{x0:-418,z0:58,x1:-345,z1:225},{x0:-790,z0:-175,x1:-665,z1:-72},{x0:-638,z0:-185,x1:-560,z1:-75}];for(const b of A)r.fields.push(b);const U=mf("sawah");r.fields.push({x:U.x,z:U.z,r:U.r*.82});const Y=(b,z)=>r.fields.some(N=>N.r?Math.hypot(b-N.x,z-N.z)<N.r:xs(b,z,N));function X(b,z,N,y,B){for(const[O,k]of[...a(b,z,N+2,y+2,B),[b,z]]){const R=i.heightAt(O,k);if(R<2.6||R>16||r.roads.some(([H,I,C,Z,Q])=>Sp(O,k,H,I,C,Z)<Q/2+.6)||qi(O,k,Se)<6)return!1}return i.slopeAt(b,z)>.25?!1:!r.blocked.some(O=>Math.hypot(O.x-b,O.z-z)<Math.hypot(O.hx,O.hz)+Math.hypot(N,y)/2+1)}function J(b,z,N,y,B,O,k,R=!1){const H=Math.hypot(N-b,y-z),I=(N-b)/H,C=(y-z)/H;for(let Z=e(4,10);Z<H-4;Z+=O+e(-2,4))for(const Q of[-1,1]){if(t()<.22)continue;const et=n(k),gt=et==="lumbung"?3.6:et==="panggung"?e(5.6,6.8):e(6.2,7.8),xt=et==="lumbung"?3.6:et==="panggung"?e(5.4,6.2):e(5.8,7),K=B/2+1.8+xt/2,$=b+I*Z-C*Q*K,rt=z+C*Z+I*Q*K,F=Math.atan2(C*Q,-I*Q);!R&&Y($,rt)||X($,rt,gt,xt,F)&&E(et,$,rt,gt,xt,F)}}J(-420,40,-340,40,7,11,["panggung","bata","limasan","panggung"],!0),J(-553,146,-553,262,6,10,["panggung","bata","limasan","lumbung"],!0),J(-647,-64,-647,-170,5,12,["panggung","lumbung","panggung"],!0),J(-704,110,-770,110,5,11,["panggung","bata","panggung"],!0),J(-730,116,-730,196,5,11,["panggung","lumbung","panggung"],!0);{let b=250;for(;i.heightAt(-553,b)>$r&&b<320;)b+=.25;const z={x0:-590,z0:b-16,x1:-516,z1:b-1};r.pave.push(z),r.roads.push([-553,262,-553,b-8,8]);for(const y of[-580,-526]){const B=o(y,z.z0-5,14,8,0);u({type:"gudang",x:y,y:B,z:z.z0-5,rot:ee.selatan,w:14,d:8}),c(y,z.z0-5,14,8,0,"kayu"),l(y,z.z0-5,15,9)}const N=1.75;for(const y of[-578,-553,-528]){const O=b-2+18;u({type:"dermaga",x:y,y:N,z:O,rot:0,w:4,len:36}),r.surfaces.push({x:y,z:O,hx:2,hz:36/2,rot:0,y0:N,y1:N}),l(y,O,5,36),r.paths.push([y,z.z0+6,y,b-2+36-2]),r.boats.push({type:"jukung",x:y-4.2,z:O+e(-6,8),rot:t()*.2-.1}),r.boats.push({type:"jukung",x:y+4.2,z:O+e(-8,6),rot:Math.PI+t()*.2-.1}),r.spots.push({x:y+e(-1,1),z:b+36-6,rot:ee.selatan,role:"nelayan",anim:"interact"})}r.boats.push({type:"jong",x:-542,z:b+30,rot:.08}),r.paths.push([-578,z.z0+6,-528,z.z0+6]);for(let y=0;y<10;y++){const B=e(z.x0+3,z.x1-3),O=e(z.z0+1.5,z.z0+4);Math.abs(B+578)<3||Math.abs(B+553)<3||Math.abs(B+528)<3||(u({type:t()<.5?"peti":"gentong",x:B,y:i.heightAt(B,O),z:O,rot:t()*Math.PI}),r.colliders.push({x:B,z:O,radius:.55,kind:"kayu"}))}for(let y=0;y<5;y++)r.spots.push({x:e(z.x0+4,z.x1-4),z:z.z0+2.2,rot:ee.selatan,role:"kuli",anim:n(["interact","idle"])});r.harbor={shore:b,quay:z}}for(const b of s){const z=Math.min(b.a,b.b)-4,N=Math.max(b.a,b.b)+4,y=(z+N)/2,B=(N-z)/2,O=$r+.15,k=b.axis==="x"?Math.PI/2:0,[R,H]=b.axis==="x"?[y,b.at]:[b.at,y],I=(Math.min(b.a,b.b)-z)/(2*B),C=(Math.max(b.a,b.b)-z)/(2*B),Z={x:R,z:H,hx:b.width/2,hz:B,rot:k,y0:O,y1:O,arch:b.rise,a0:I,a1:C};r.surfaces.push(Z),u({type:b.stone?"jembatan-batu":"jembatan-kayu",x:R,y:0,z:H,rot:k,len:2*B,w:b.width,surface:Z,a:b.a,b:b.b,axis:b.axis,at:b.at});for(const Q of[-1,1]){const et=Q*(b.width/2-.2),[gt,xt]=b.axis==="x"?[y,b.at+et]:[b.at+et,y];r.colliders.push({x:gt,z:xt,hx:.2,hz:B-1,rot:k,kind:b.stone?"bata":"kayu"})}if(l(R,H,b.width+3,2*B+6,k),r.roads.push(b.axis==="x"?[z-6,b.at,N+6,b.at,b.width-1]:[b.at,z-6,b.at,N+6,b.width-1]),r.paths.push(b.axis==="x"?[z-2,b.at,N+2,b.at]:[b.at,z-2,b.at,N+2]),b.stone)for(const Q of[z-7,N+7]){for(const xt of[-1,1]){const K=xt*(b.width/2+1.7),[$,rt]=b.axis==="x"?[Q,b.at+K]:[b.at+K,Q];u({type:"bentar",x:$,y:i.heightAt($,rt),z:rt,rot:k,w:3.4,d:3.4,h:9,mirror:-xt}),c($,rt,3.4,3.4,0,"bata"),r.spots.push({x:Q+(Q<y?-2.8:2.8),z:b.at+xt*(b.width/2-.4),rot:Q<y?ee.barat:ee.timur,role:"penjaga",anim:"idle"})}const[et,gt]=b.axis==="x"?[Q+(Q<y?-6:6),b.at]:[b.at,Q];r.pave.push({x0:et-9,z0:gt-9,x1:et+9,z1:gt+9});for(const xt of[-1,1]){const[K,$]=[et+(Q<y?-1:1)*3,gt+xt*8];u({type:"umbul",x:K,y:i.heightAt(K,$),z:$,rot:0,h:9,color:xt>0?0:2}),r.colliders.push({x:K,z:$,radius:.18,kind:"kayu"})}}}{const b=s.find(B=>B.id==="sawah"),z=b.b-16,N=b.at;r.pave.push({x0:N-9,z0:z-9,x1:N+9,z1:z+9}),r.roads.push([N,b.b,N,z,3]);const y=[[-15,-2,ee.timur,"panggung"],[15,-2,ee.barat,"panggung"],[-14,-16,ee.timur,"lumbung"],[14,-16,ee.barat,"lumbung"],[-4,-22,ee.selatan,"panggung"],[6,-22,ee.selatan,"lumbung"],[-15,12,ee.timur,"lumbung"],[15,12,ee.barat,"panggung"]];for(const[B,O,k,R]of y){const H=R==="lumbung"?3.6:6.2,I=R==="lumbung"?3.6:5.8;E(R,N+B,z+O,H,I,k)}r.trees.push({type:"mangga",x:N-4,z:z+4,s:1.1});for(let B=0;B<10;B++){const O=t()*Math.PI*2,k=e(30,70),R=U.x+Math.cos(O)*k,H=U.z+Math.sin(O)*k;i.heightAt(R,H)<2.6||r.spots.push({x:R,z:H,rot:t()*Math.PI*2,role:"petani",anim:n(["pickup","pickup","idle"])})}for(const[B,O]of[[-45,-30],[40,-45],[-30,40]]){const k=U.x+B,R=U.z+O;u({type:"dangau",x:k,y:i.heightAt(k,R),z:R,rot:t()*Math.PI,w:3,d:3}),r.colliders.push({x:k,z:R,hx:1.5,hz:1.5,rot:0,kind:"kayu"}),l(k,R,4,4)}r.roads.push([N,z,N,U.z-70,2.2],[N-50,U.z,N+50,U.z,2.2])}{const b=mf("nelayan"),z=s.find(k=>k.id==="nelayan"),N=b.x,y=b.z-4;r.pave.push({x0:N-8,z0:y-8,x1:N+8,z1:y+8}),r.roads.push([z.at,z.b,z.at,y,3],[z.at,y,N,y,3]);for(let k=0;k<11;k++){const R=k/11*Math.PI*2+.3,H=22+k%2*9,I=N+Math.cos(R)*H,C=y+Math.sin(R)*H,Z=Math.atan2(N-I,y-C);X(I,C,6.2,5.8,Z)&&E("panggung",I,C,6.2,5.8,Z)}for(let k=0;k<6;k++){const R=Math.PI*(.15+k*.13),H=N+Math.cos(R)*45,I=y+Math.sin(R)*45;i.heightAt(H,I)<1.2||(u({type:"jemuran",x:H,y:i.heightAt(H,I),z:I,rot:R}),r.colliders.push({x:H,z:I,hx:1.8,hz:.4,rot:R,kind:"kayu"}))}let B=b.z;for(;i.heightAt(b.x,B)>$r&&B<b.z+140;)B+=.25;const O=26;u({type:"dermaga",x:b.x,y:1.75,z:B-2+O/2,rot:0,w:3.2,len:O}),r.surfaces.push({x:b.x,z:B-2+O/2,hx:1.6,hz:O/2,rot:0,y0:1.75,y1:1.75}),r.roads.push([b.x,y,b.x,B-1,3]),r.paths.push([b.x,B-1,b.x,B+O-4]);for(let k=0;k<4;k++)r.boats.push({type:"jukung",x:b.x+(k%2?3.4:-3.4),z:B+6+k*5,rot:(k%2?Math.PI:0)+t()*.2});for(let k=0;k<5;k++){const R=Math.PI*(.9+k*.22);let H=40;for(;H<120&&i.heightAt(b.x+Math.cos(R)*H,b.z+Math.sin(R)*H)>.6;)H+=.5;r.boats.push({type:"jukung-darat",x:b.x+Math.cos(R)*(H-3),z:b.z+Math.sin(R)*(H-3),rot:R+Math.PI/2})}for(let k=0;k<6;k++)r.spots.push({x:N+e(-14,14),z:y+e(-14,14),rot:t()*Math.PI*2,role:"nelayan",anim:n(["interact","idle","sit"])})}{const b=s.find(O=>O.id==="pura"),z=Gr,N={x0:z.x-15,z0:z.z-13,x1:z.x+15,z1:z.z+13},y=i.heightAt(z.x,z.z);r.pave.push(N),r.roads.push([b.b,z.z,N.x1,z.z,4]),r.paths.push([N.x1,z.z,z.x,z.z]);const B=4;h(N.x0,N.z0,N.x1,N.z0,.8,1.8,"pagar","bata",y),h(N.x0,N.z1,N.x1,N.z1,.8,1.8,"pagar","bata",y),h(N.x0,N.z0,N.x0,N.z1,.8,1.8,"pagar","bata",y),h(N.x1,N.z0,N.x1,z.z-B/2-2.6,.8,1.8,"pagar","bata",y),h(N.x1,z.z+B/2+2.6,N.x1,N.z1,.8,1.8,"pagar","bata",y);for(const O of[-1,1]){const k=z.z+O*(B/2+1.3);u({type:"bentar",x:N.x1,y,z:k,rot:Math.PI/2,w:2.6,d:2.4,h:7,mirror:-O}),c(N.x1,k,2.4,2.6,0,"bata")}for(const[O,k,R,H]of[[-8,-6,11,6],[-8,6,7,5],[2,7,3,4]])u({type:"meru",x:z.x+O,y,z:z.z+k,rot:0,base:H,tiers:R}),c(z.x+O,z.z+k,H,H,0,"bata");u({type:"bale",x:z.x+3,y,z:z.z-6,rot:0,w:5,d:5}),r.roofs.push({x:z.x+3,z:z.z-6,hx:3,hz:3,r:4.5});for(const[O,k]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:z.x+3+O*2.1,z:z.z-6+k*2.1,radius:.2,kind:"kayu"});for(const[O,k]of[[10,-9],[10,9],[-13,0]])r.trees.push({type:"kamboja",x:z.x+O,z:z.z+k,s:1});for(let O=b.b-6;O>N.x1+4;O-=7)for(const k of[-1,1]){const R=z.z+k*3.2;u({type:"umbul",x:O,y:i.heightAt(O,R),z:R,rot:0,h:7,color:1}),r.colliders.push({x:O,z:R,radius:.15,kind:"kayu"})}r.spots.push({x:z.x+1,z:z.z+1,rot:ee.barat,role:"pendeta",anim:"sit",y}),r.spots.push({x:z.x-1,z:z.z-2,rot:ee.barat,role:"warga",anim:"sit",y})}for(const[b,z,N,y,B]of[[-420,40,-340,40,7],[-553,146,-553,262,6]]){const O=Math.hypot(N-b,y-z);for(let k=6;k<O;k+=13)for(const R of[-1,1]){const H=k/O,I=b+(N-b)*H+(z===y?0:R*(B/2+1.2)),C=z+(y-z)*H+(z===y?R*(B/2+1.2):0);r.blocked.some(Z=>Math.hypot(Z.x-I,Z.z-C)<Math.hypot(Z.hx,Z.hz)+1.5)||r.trees.push({type:"kelapa",x:I,z:C,s:e(.85,1.1)})}}{const b=sa(5150),z=(F,dt)=>F+(dt-F)*b(),N=Mn,y=(N.x0+N.x1)/2,B=db();r.army=B;const O=s.find(F=>F.id==="wira"),k=r.harbor.quay,R=N.z0-10,H=N.x0-7,I=N.x1+7;r.roads.push([k.x1,(k.z0+k.z1)/2+1,O.at-3,Math.min(O.a,O.b)-7,5]),r.roads.push([O.at,Math.max(O.a,O.b)+6,O.at,R,5]),r.roads.push([H+12,R,I-12,R,7],[H,R+12,H+12,R,5],[I-12,R,I,R+12,5]),r.roads.push([H,R+12,H,N.z1-8,5],[I,R+12,I,N.z1-8,5]),r.lawn.push({...N});for(const F of B.lanes)r.tracks.push(F);for(const F of B.blocks)r.colliders.push({x:(F.x0+F.x1)/2,z:(F.z0+F.z1)/2,hx:(F.x1-F.x0)/2,hz:(F.z1-F.z0)/2,rot:0,kind:"prajurit"});for(const F of B.officers)r.colliders.push({x:F.x,z:F.z,hx:.55,hz:1.35,rot:0,kind:"prajurit"});const C={x:y,z:R-19,w:24,d:13,h:1.6},Z=o(C.x,C.z,C.w,C.d,0);u({type:"siti-hinggil",x:C.x,y:Z,z:C.z,rot:ee.selatan,w:C.w,d:C.d,h:C.h}),r.surfaces.push({x:C.x,z:C.z,hx:C.w/2,hz:C.d/2,rot:0,y0:Z+C.h,y1:Z+C.h});const Q=7,et=3.6;r.surfaces.push({x:C.x,z:C.z+C.d/2+et/2,hx:Q/2,hz:et/2,rot:Math.PI,y0:Z+.02,y1:Z+C.h});{const F=C.x-C.w/2,dt=C.x+C.w/2,At=C.z-C.d/2,ft=C.z+C.d/2;for(const[w,st,ut,D]of[[F,At,dt,At],[F,At,F,ft],[dt,At,dt,ft],[F,ft,C.x-Q/2,ft],[C.x+Q/2,ft,dt,ft]])c((w+ut)/2,(st+D)/2,.5,Math.hypot(ut-w,D-st),Math.atan2(ut-w,D-st),"batu");for(const[w,st]of Mp)r.colliders.push({x:C.x+w,z:C.z+st,radius:.3,kind:"kayu"})}l(C.x,C.z,C.w+2,C.d+2+et*2),r.roofs.push({x:C.x,z:C.z,hx:C.w/2,hz:C.d/2,r:7}),r.pave.push({x0:C.x-C.w/2-3,z0:C.z-C.d/2-3,x1:C.x+C.w/2+3,z1:R-3});for(const F of[-1,1])r.spots.push({x:C.x+F*2.4,z:C.z+C.d/2-1.4,rot:ee.selatan,role:"penjaga",anim:"idle",y:Z+C.h}),r.spots.push({x:C.x+F*(Q/2+1.2),z:C.z+C.d/2+et+.8,rot:ee.selatan,role:"penjaga",anim:"idle"});for(const F of[-1,1])r.spots.push({x:O.at+F*4,z:Math.max(O.a,O.b)+6,rot:ee.utara,role:"penjaga",anim:"idle"});const gt=(F,dt,At,ft)=>{u({type:"umbul",x:F,y:i.heightAt(F,dt),z:dt,rot:0,h:At,color:ft}),r.colliders.push({x:F,z:dt,radius:.18,kind:"kayu"})};for(let F=H+16,dt=0;F<I-14;F+=22,dt++)Math.abs(F-y)>16&&gt(F,R+5,9,vi[dt%vi.length].flag);for(const F of B.blocks){if(F.type===4)continue;const dt=B.blocks.find(ft=>ft.type===F.type),At=B.blocks.filter(ft=>ft.type===F.type).pop();F===dt&&gt(F.x0-3.5,F.z0+1,11,vi[F.type].flag),F===At&&gt(F.x1+3.5,F.z0+1,11,vi[F.type].flag)}const xt=B.blocks.filter(F=>F.type===4);gt(xt[0].x0-3.5,xt[0].z0+1,11,vi[4].flag),gt(xt[xt.length-1].x1+3.5,xt[0].z0+1,11,vi[4].flag);const K=(F,dt,At,ft,w)=>a(F,dt,At+1,ft+1,w).every(([st,ut])=>i.heightAt(st,ut)>3)&&i.slopeAt(F,dt)<.25,$=yo.find(F=>F.id==="tenda");for(let F=$.x1-6;F>$.x0+2;F-=11)for(let dt=$.z0+18;dt<$.z1-3;dt+=7.5){const w=ee.timur;K(F,dt,3.4,4.4,w)&&(u({type:"tenda",x:F,y:o(F,dt,3.4,4.4,w),z:dt,rot:w,w:3.4,d:4.4,color:Math.floor(z(0,3))}),c(F,dt,3.4,4.4,w,"kayu"),l(F,dt,3.4+1,4.4+1,w))}for(const F of[$.x1-10,$.x1-30]){const dt=$.z0+6;K(F,dt,12,7,0)&&(u({type:"gudang",x:F,y:o(F,dt,12,7,0),z:dt,rot:ee.selatan,w:12,d:7}),c(F,dt,12,7,0,"kayu"),l(F,dt,13,8))}const rt=yo.find(F=>F.id==="kandang");for(const F of[rt.x0+9,rt.x0+33])for(let dt=rt.z0+22;dt<rt.z1-12;dt+=38){const w=ee.barat;K(F,dt,30,7,w)&&(u({type:"kandang",x:F,y:o(F,dt,30,7,w),z:dt,rot:w,w:30,d:7}),c(F,dt,30,7,w,"kayu"),l(F,dt,31,8,w))}for(let F=0;F<6;F++){const dt=z(rt.x0+4,rt.x1-4),At=rt.z0+6+z(-2,2);i.heightAt(dt,At)<3||(u({type:"jerami",x:dt,y:i.heightAt(dt,At),z:At,rot:z(0,Math.PI)}),r.colliders.push({x:dt,z:At,radius:.9,kind:"kayu"}))}for(let F=H+20;F<I-20;F+=26)Math.abs(F-y)<22||Math.abs(F-O.at)<8||r.trees.push({type:"kelapa",x:F+z(-2,2),z:R-6.5,s:z(.85,1.1)})}for(const b of r.trees){const z={beringin:0,kamboja:.3,mangga:.5,kelapa:.4,pisang:0}[b.type];z&&r.colliders.push({x:b.x,z:b.z,radius:z*b.s,kind:"pohon"})}return r}const Fe={x0:-980,z0:-470,x1:-30,z1:640},mb=-150;function gb(i,t){const e=Fe.x1-Fe.x0,n=Fe.z1-Fe.z0,s=new Uint8Array(e*n*4),r=new Uint8Array(e*n),a=f=>Fe.x0+f+.5,o=f=>Fe.z0+f+.5;function c(f,g,x,m,p,M){const v=Math.max(0,Math.floor(g-Fe.x0)),_=Math.min(e-1,Math.ceil(m-Fe.x0)),S=Math.max(0,Math.floor(x-Fe.z0)),T=Math.min(n-1,Math.ceil(p-Fe.z0));for(let L=S;L<=T;L++)for(let G=v;G<=_;G++){const E=M(a(G),o(L));if(E<=0)continue;const A=(L*e+G)*4+f;s[A]=Math.max(s[A],Math.round(Math.min(1,E)*255))}}const l=f=>Math.min(1,Math.max(0,.5-f)),u=(f,g)=>{const x=t.heightAt(f,g);return x>2.5&&x<14&&t.slopeAt(f,g)<.22};for(const f of i.fields)f.r?c(1,f.x-f.r,f.z-f.r,f.x+f.r,f.z+f.r,(g,x)=>u(g,x)?l(Math.hypot(g-f.x,x-f.z)-f.r):0):c(1,f.x0,f.z0,f.x1,f.z1,(g,x)=>u(g,x)?l(qi(g,x,f)):0);for(const f of i.lawn)c(3,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(g,x)=>l(qi(g,x,f)));for(const[f,g,x,m,p]of[...i.roads,...i.tracks])c(0,Math.min(f,x)-p,Math.min(g,m)-p,Math.max(f,x)+p,Math.max(g,m)+p,(M,v)=>l(Sp(M,v,f,g,x,m)-p/2));for(const f of i.pave)c(2,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(g,x)=>l(qi(g,x,f)));for(let f=0;f<e*n;f++){const g=Math.max(s[f*4],s[f*4+2])/255;s[f*4+1]=Math.round(s[f*4+1]*(1-g)),s[f*4+3]=Math.round(s[f*4+3]*(1-g)),(s[f*4]>60||s[f*4+1]>60||s[f*4+2]>60)&&(r[f]=1)}for(const f of i.blocked){const g=Math.hypot(f.hx,f.hz)+1,x=Math.cos(f.rot||0),m=Math.sin(f.rot||0);for(let p=Math.max(0,Math.floor(f.z-g-Fe.z0));p<=Math.min(n-1,Math.ceil(f.z+g-Fe.z0));p++)for(let M=Math.max(0,Math.floor(f.x-g-Fe.x0));M<=Math.min(e-1,Math.ceil(f.x+g-Fe.x0));M++){const v=a(M)-f.x,_=o(p)-f.z;Math.abs(v*x-_*m)<=f.hx+1&&Math.abs(v*m+_*x)<=f.hz+1&&(r[p*e+M]=1)}}const h=new bs(s,e,n,Ze,zn);h.magFilter=We,h.minFilter=yn,h.generateMipmaps=!0,h.wrapS=h.wrapT=ei,h.needsUpdate=!0;const d=(f,g)=>{if(f>=mb&&g<300)return!1;const x=Math.floor(f-Fe.x0),m=Math.floor(g-Fe.z0);return x>=0&&m>=0&&x<e&&m<n&&r[m*e+x]===1};return{texture:h,data:s,x0:Fe.x0,z0:Fe.z0,width:e,depth:n,reserved:(f,g,x=0)=>d(f,g)||d(f+x,g)||d(f-x,g)||d(f,g+x)||d(f,g-x),at(f,g){const x=Math.floor(f-Fe.x0),m=Math.floor(g-Fe.z0);if(x<0||m<0||x>=e||m>=n)return null;const p=(m*e+x)*4;return{jalan:s[p]/255,sawah:s[p+1]/255,batu:s[p+2]/255,rumput:s[p+3]/255}}}}const it={POLOS:0,BATA:1,GENTENG:2,JERAMI:3,KAYU:4,BATU:5,SIRAP:6,UBIN:7,ANYAMAN:8,PLESTER:9},at={bata:"#a5523a",batuPutih:"#d3c8b2",andesit:"#8f8b84",andesitTua:"#6e6b66",kayu:"#8a5a35",kayuTua:"#5e3d24",kayuMuda:"#b08454",plester:"#ebe3d1",genteng:"#b65a32",gentengTua:"#5a4a40",ijuk:"#3d3732",alang:"#bb9c5c",bambu:"#c9ad74",emas:"#d9a82e",gelap:"#2b2420",merah:"#c8312a",putih:"#f0eee5",kuning:"#e2b32b",biru:"#2f5fa8",hijau:"#3a8a4c"},Za=new Ut,wc=new Ot,Of=new $t,Ff=new _e,Bf=new un,mi=new V,Bi=new V,$a=new V;class le{constructor(){this.pos=[],this.nor=[],this.col=[],this.kind=[],this.sway=[]}add(t,e,n,s={}){const r=t.index?t.toNonIndexed():t;return this.addRaw(r.attributes.position.array,r.attributes.normal.array,e,n,s)}addRaw(t,e,n,s,{x:r=0,y:a=0,z:o=0,rx:c=0,ry:l=0,rz:u=0,sx:h=1,sy:d=1,sz:f=1,shade:g=[.84,1.04],sway:x=0}={}){let m=1/0,p=-1/0;for(let T=1;T<t.length;T+=3)t[T]<m&&(m=t[T]),t[T]>p&&(p=t[T]);const M=Math.max(.001,p-m);Za.set(n);const v=c===0&&u===0&&h===1&&d===1&&f===1,_=Math.cos(l),S=Math.sin(l);v||(Bf.set(c,l,u),Ff.setFromEuler(Bf),wc.compose(mi.set(r,a,o),Ff,Bi.set(h,d,f)),Of.getNormalMatrix(wc));for(let T=0;T<t.length;T+=3){const L=(t[T+1]-m)/M,G=g[0]+(g[1]-g[0])*L;v?(this.pos.push(r+t[T]*_+t[T+2]*S,a+t[T+1],o-t[T]*S+t[T+2]*_),this.nor.push(e[T]*_+e[T+2]*S,e[T+1],-e[T]*S+e[T+2]*_)):(mi.set(t[T],t[T+1],t[T+2]).applyMatrix4(wc),this.pos.push(mi.x,mi.y,mi.z),mi.set(e[T],e[T+1],e[T+2]).applyMatrix3(Of).normalize(),this.nor.push(mi.x,mi.y,mi.z)),this.col.push(Za.r*G,Za.g*G,Za.b*G),this.kind.push(s),this.sway.push(x*L)}return this}box(t,e,n,s,r,a={}){const o=t/2,c=n/2,l=[],u=[],h=(d,f,g,x,m)=>{for(const p of[d,f,g,d,g,x])l.push(p[0],p[1],p[2]),u.push(m[0],m[1],m[2])};return h([o,0,c],[o,0,-c],[o,e,-c],[o,e,c],[1,0,0]),h([-o,0,-c],[-o,0,c],[-o,e,c],[-o,e,-c],[-1,0,0]),h([-o,0,c],[o,0,c],[o,e,c],[-o,e,c],[0,0,1]),h([o,0,-c],[-o,0,-c],[-o,e,-c],[o,e,-c],[0,0,-1]),h([-o,e,c],[o,e,c],[o,e,-c],[-o,e,-c],[0,1,0]),h([-o,0,-c],[o,0,-c],[o,0,c],[-o,0,c],[0,-1,0]),this.addRaw(l,u,s,r,a)}cyl(t,e,n,s,r,a,o={}){return this.add(new Ne(t,e,n,s).translate(0,n/2,0),r,a,o)}faces(t,e,n,s={}){const r=[],a=[];for(const[o,c,l]of t){Bi.set(c[0]-o[0],c[1]-o[1],c[2]-o[2]),$a.set(l[0]-o[0],l[1]-o[1],l[2]-o[2]),Bi.cross($a).normalize();for(const u of[o,c,l])r.push(u[0],u[1],u[2]),a.push(Bi.x,Bi.y,Bi.z)}return this.addRaw(r,a,e,n,{shade:[.96,1.04],...s})}skirt(t,e,n,s,r,a,o,c,l={}){const u=[[-t/2,n,-e/2],[t/2,n,-e/2],[t/2,n,e/2],[-t/2,n,e/2]],h=[[-s/2,a,-r/2],[s/2,a,-r/2],[s/2,a,r/2],[-s/2,a,r/2]],d=[];for(let f=0;f<4;f++){const g=(f+1)%4;d.push([u[g],u[f],h[f]],[u[g],h[f],h[g]])}return this.faces(d.filter(([f,g,x])=>(Bi.set(g[0]-f[0],g[1]-f[1],g[2]-f[2]),$a.set(x[0]-f[0],x[1]-f[1],x[2]-f[2]),Bi.cross($a).lengthSq()>1e-8)),o,c,l)}hip(t,e,n,s,r,a,o={}){const c=Math.max(0,Math.abs(t-e)*.9);return t>=e?this.skirt(t,e,n,c,0,n+s,r,a,o):this.skirt(t,e,n,0,c,n+s,r,a,o)}gable(t,e,n,s,r,a,o=r,c=a,l={}){const u=[-t/2,n,-e/2],h=[t/2,n,-e/2],d=[t/2,n,e/2],f=[-t/2,n,e/2],g=[-t/2,n+s,0],x=[t/2,n+s,0];return this.faces([[h,u,g],[h,g,x],[f,d,x],[f,x,g]],r,a,l),this.faces([[u,f,g],[d,h,x]],o,c,l)}build(){const t=new fe;return t.setAttribute("position",new Xt(this.pos,3)),t.setAttribute("normal",new Xt(this.nor,3)),t.setAttribute("color",new Xt(this.col,3)),t.setAttribute("aKind",new Xt(this.kind,1)),t.setAttribute("aSway",new Xt(this.sway,1)),t.computeBoundingSphere(),t}}function yu(i,t,e,n,s,{windows:r=!0,door:a=1}={}){if(i.box(a,Math.min(2.1,s*.75),.1,at.kayuTua,it.KAYU,{y:n,z:e/2+.01}),!!r)for(const o of[-1,1])t>5&&i.box(.8,.8,.1,at.gelap,it.POLOS,{x:o*t*.3,y:n+s*.42,z:e/2+.01}),i.box(.1,.8,.8,at.gelap,it.POLOS,{x:o*(t/2+.01),y:n+s*.42})}const ko=(i,t,e,n=.45)=>i.box(t+.3,n+1.6,e+.3,at.andesit,it.BATU,{y:-1.6,shade:[.7,1]});function xb(i,t,e){const n=new le;return ko(n,i,t),n.box(i,.9,t,at.bata,it.BATA,{y:.45}),n.box(i,1.9,t,at.plester,it.PLESTER,{y:1.35}),n.box(i+.12,.14,t+.12,at.batuPutih,it.POLOS,{y:3.2}),yu(n,i,t,.45,2.8),n.hip(i+1.3,t+1.3,3.3,Math.min(i,t)*.42,e,it.GENTENG),n.box(.25,.25,.25,at.gentengTua,it.POLOS,{x:Math.max(0,i-t)*.45,y:3.3+Math.min(i,t)*.42-.05}),n}function _b(i,t,e){const n=new le;ko(n,i,t),n.box(i,3,t,at.kayuMuda,it.KAYU,{y:.45}),yu(n,i,t,.45,2.9),n.hip(i+1.2,t+1,3.4,Math.min(i,t)*.5,e,it.SIRAP),n.box(i*.9,.12,1.6,e,it.SIRAP,{y:2.8,z:t/2+.8,rx:.25});for(const s of[-1,1])n.cyl(.1,.1,2.75,6,at.kayuTua,it.KAYU,{x:s*i*.4,y:.45,z:t/2+1.4});return n}function vb(i,t,e){const n=new le;ko(n,i,t,.6),n.box(i*.86,3.1,t*.86,at.kayu,it.KAYU,{y:.6}),yu(n,i*.86,t*.86,.6,3.1);for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1],[0,1]])n.cyl(.12,.12,3.3,6,at.kayuTua,it.KAYU,{x:s*i*.47,y:.6,z:r*t*.47});return n.skirt(i+1.6,t+1.6,3.6,i*.56,t*.56,4.9,e,it.GENTENG),n.hip(i*.6,t*.6,4.8,3,e,it.GENTENG),n.box(.3,.45,.3,at.emas,it.POLOS,{y:7.7}),n}function yb(i,t,e){const n=new le;for(let s=0;s<3;s++)for(const r of[-1,1])n.cyl(.13,.15,2.9,6,at.kayuTua,it.KAYU,{x:(s-1)*(i*.42),y:-1.5,z:r*t*.42});n.box(i,.25,t,at.kayu,it.KAYU,{y:1.3}),n.box(i-.3,2.1,t-.3,at.bambu,it.ANYAMAN,{y:1.55}),n.box(.95,1.8,.1,at.kayuTua,it.KAYU,{y:1.55,z:(t-.3)/2+.01});for(const s of[-1,1])n.box(.7,.6,.1,at.gelap,it.POLOS,{x:s*i*.3,y:2.3,z:(t-.3)/2+.01});return n.box(.9,.12,2,at.kayuTua,it.KAYU,{y:.55,z:t/2+.75,rx:.62}),n.gable(i+1.4,t+1.7,3.55,2.7,e,it.JERAMI,at.bambu,it.ANYAMAN),n.box(i+1.6,.18,.3,at.ijuk,it.POLOS,{y:6.2}),n}function Mb(i){const t=new le;for(const[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.cyl(.12,.14,3.3,6,at.kayuTua,it.KAYU,{x:e*1.1,y:-1.5,z:n*1.1}),t.cyl(.42,.42,.1,8,at.kayu,it.KAYU,{x:e*1.1,y:1.55,z:n*1.1});return t.box(2.8,.2,2.8,at.kayu,it.KAYU,{y:1.65}),t.box(2.2,1,2.2,at.bambu,it.ANYAMAN,{y:1.85}),t.skirt(4.2,4.2,2,3.4,3.4,2.7,i,it.JERAMI),t.skirt(3.4,3.4,2.7,2.1,2.1,4.4,i,it.JERAMI),t.skirt(2.1,2.1,4.4,0,0,6,i,it.JERAMI),t}function bb(i,t,e){const n=new le;return ko(n,i,t,.3),n.box(i,3.6,t,at.kayu,it.KAYU,{y:.3}),n.box(2.6,2.6,.12,at.kayuTua,it.KAYU,{y:.3,z:t/2+.01}),n.gable(i+1,t+1.4,3.9,2.4,e,it.GENTENG,at.kayu,it.KAYU),n}const Sb={buah:["#e0a020","#d84a2a","#7fb03a","#f2d24b"],ikan:["#9fb4c2","#c7d3dc","#7d8f9c"],kain:["#c8312a","#2f62a8","#e2b32b","#3f8f4f","#8a3f9a"],sayur:["#4f9a2f","#7cbf3c","#d84a2a","#e8e0c0"],gerabah:["#a8603a","#8f4f30","#c27a4a"]},Hf=["#c8312a","#e07a20","#e2b32b","#3f8f4f","#2f62a8","#8a3f9a"];function Ab(i,t){const e=new le;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.07,.07,2.4,5,at.kayuTua,it.KAYU,{x:s*1.8,z:r*1.3});e.box(3.4,.85,1.1,at.kayu,it.KAYU,{z:.45}),e.gable(4.2,3.2,2.35,.7,Hf[i],it.POLOS,Hf[i],it.POLOS,{sway:.06});const n=Sb[t];for(let s=0;s<7;s++){const r=-1.4+s*.47;t==="kain"?e.box(.36,.22,.8,n[s%n.length],it.POLOS,{x:r,y:.85,z:.45}):t==="gerabah"?e.cyl(.12,.17,.32,7,n[s%n.length],it.POLOS,{x:r,y:.85,z:.45}):e.add(new Ji(.2,0).translate(0,.2,0),n[s%n.length],it.POLOS,{x:r,y:.82,z:.45,sy:t==="ikan"?.5:1,sx:t==="ikan"?1.6:1})}for(const s of[-1,1])e.cyl(.32,.25,.4,8,at.bambu,it.ANYAMAN,{x:s*1.3,z:1.45});return e}function wb(){const i=new le;i.cyl(1,1.05,.9,10,at.andesit,it.BATU),i.cyl(.8,.8,.02,10,"#26343a",it.POLOS,{y:.85});for(const t of[-1,1])i.box(.15,2.1,.15,at.kayuTua,it.KAYU,{x:t*.9});return i.gable(2.4,1.6,2.1,.6,at.genteng,it.GENTENG),i}function Tb(i,t,e){const n=new le;n.box(t+.5,1.6,i,at.andesit,it.BATU,{y:-1.2}),n.box(t,e,i,at.bata,it.BATA,{y:.4}),n.box(t+.35,.3,i,at.batuPutih,it.POLOS,{y:e+.4}),n.box(t+.2,.25,i,at.bata,it.BATA,{y:e+.7});const s=Math.max(1,Math.round(i/3));for(let r=0;r<s;r++){const a=-i/2+(r+.5)*(i/s);n.box(t*.55,.7,.9,at.bata,it.BATA,{y:e+.95,z:a}),n.skirt(t*.55,.9,e+1.65,0,0,e+2.1,at.batuPutih,it.POLOS,{z:a})}return n}function Eb(i,t,e){const n=new le;return n.box(t+.3,1.5,i,at.andesit,it.BATU,{y:-1.1}),n.box(t,1.2,i,at.bata,it.BATA,{y:.4}),n.box(t,e-1.2,i,at.plester,it.PLESTER,{y:1.6}),n.add(Rb(i,t+.8,.7),at.genteng,it.GENTENG,{y:e+.4,ry:Math.PI/2}),n}function Rb(i,t,e){const n=new le;n.gable(i,t,0,e,"#ffffff",0);const s=new fe;return s.setAttribute("position",new Xt(n.pos,3)),s.setAttribute("normal",new Xt(n.nor,3)),s}function Gf(i,t,e,n=!1){const s=new le;return s.box(t+.2,1.2,i,at.andesit,it.BATU,{y:-1}),s.box(t,e,i,n?at.andesit:at.bata,n?it.BATU:it.BATA,{y:.2}),s.box(t+.2,.18,i,n?at.andesitTua:at.batuPutih,it.POLOS,{y:e+.2}),s}function Cb(i,t){const e=new le;e.box(i+.8,1.8,i+.8,at.andesit,it.BATU,{y:-1.4}),e.box(i,t,i,at.bata,it.BATA,{y:.4}),e.box(i+.5,.35,i+.5,at.batuPutih,it.POLOS,{y:t+.4}),e.box(i+.2,.5,i+.2,at.bata,it.BATA,{y:t+.75});const n=t+1.25;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.14,.14,2.3,6,at.kayuTua,it.KAYU,{x:s*i*.3,y:n,z:r*i*.3});return e.hip(i*.85,i*.85,n+2.3,i*.42,at.gentengTua,it.GENTENG),e.box(.25,.4,.25,at.emas,it.POLOS,{y:n+2.3+i*.42-.05}),e}function Pb(i,t,e,n,s=!1){const r=new le,a=s?at.andesit:at.bata,o=s?it.BATU:it.BATA,c=s?at.andesitTua:at.batuPutih,l=-n*i/2,u=6,h=1.2,d=(e-h)*.82;r.box(i+.4,h+1.2,t+.4,at.andesit,it.BATU,{x:n*.2,y:-1.2});let f=h;for(let x=0;x<u;x++){const m=x/u,p=i*(1-.62*m),M=t*(1-.5*m),v=d/u*(x===0?1.6:.88),_=l+n*p/2;r.box(p,v,M,a,o,{x:_,y:f}),r.box(p+.12,.14,M+.18,c,it.POLOS,{x:_+n*.06,y:f+v-.07}),f+=v}const g=i*.32;return r.skirt(g,t*.45,f,0,0,e,a,o,{x:l+n*g/2}),r}function Ib(i,t,e,n){const s=new le,r=(i-e)/2;s.box(i+1,1.6,t+1,at.andesit,it.BATU,{y:-1.2});for(const c of[-1,1])s.box(r,4.6,t,at.bata,it.BATA,{x:c*(e/2+r/2),y:.4});s.box(i,1.4,t,at.bata,it.BATA,{y:5}),s.box(i+.3,.2,t+.3,at.batuPutih,it.POLOS,{y:6.4});let a=6.6;const o=5;for(let c=0;c<o;c++){const l=c/o,u=i*(.85-.6*l),h=t*(.95-.55*l),d=(n-9)/o;s.box(u,d,h,at.bata,it.BATA,{y:a}),s.box(u+.2,.14,h+.2,at.batuPutih,it.POLOS,{y:a+d-.07}),a+=d}return s.skirt(i*.3,t*.4,a,0,0,n,at.bata,it.BATA),s}function Lb(i,t,e){const n=new le;n.box(i,e+1.4,t,at.bata,it.BATA,{y:-1.4}),n.box(i+.3,.16,t+.3,at.batuPutih,it.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",it.UBIN,{y:e});for(let o=0;o<4;o++)n.box(10,e*(o+1)/4,.8,at.andesit,it.BATU,{y:0,z:t/2+3.2-(o+.5)*.8});const s=(o,c)=>n.box(o.w,.55,o.d,at.bata,it.BATA,{...c,y:e});s({w:i,d:.4},{z:-t/2+.2}),s({w:.4,d:t},{x:-i/2+.2}),s({w:.4,d:t},{x:i/2-.2});for(const o of[-1,1])s({w:(i-10)/2,d:.4},{x:o*(5+(i-10)/4),z:t/2-.2});for(const[o,c]of[[-1,-1],[1,-1],[1,1],[-1,1]])n.cyl(.32,.36,9.4,8,at.kayuTua,it.KAYU,{x:o*3.2,y:e,z:c*3.2});const r=[];for(let o=-2;o<=2;o++)for(const c of[-1,1])r.push([c*12.4,o*6.3]);for(const o of[-1,0,1])for(const c of[-1,1])c>0&&o===0||r.push([o*6.2,c*13.4]);for(const[o,c]of r)n.cyl(.24,.27,4.4,8,at.kayu,it.KAYU,{x:o,y:e,z:c});const a=e+4.3;n.skirt(i+3,t+3,a,16,17,a+2.2,at.gentengTua,it.SIRAP),n.skirt(16.4,17.4,a+2.1,9.5,10,a+3.6,at.gentengTua,it.SIRAP),n.hip(10,10.5,a+3.5,5.6,at.gentengTua,it.SIRAP),n.box(.6,.9,.6,at.emas,it.POLOS,{y:a+9});for(const o of[-1,1])n.box(.4,.6,.4,at.emas,it.POLOS,{z:o*.3,y:a+9});return n.box(2.2,.5,1.6,at.emas,it.POLOS,{y:e,z:-9}),n.box(2.2,1.6,.3,at.emas,it.POLOS,{y:e+.5,z:-9.7}),n}function zb(i,t,e){const n=new le;n.box(i+1,e+1.4,t+1,at.bata,it.BATA,{y:-1.4}),n.box(i+1.3,.16,t+1.3,at.batuPutih,it.POLOS,{y:e-.08}),n.box(i-1,1,t-1,at.bata,it.BATA,{y:e}),n.box(i-1,3.2,t-1,at.plester,it.PLESTER,{y:e+1});for(let s=-2;s<=2;s++)n.box(1,2.4,.1,at.kayuTua,it.KAYU,{x:s*(i/5.5),y:e,z:(t-1)/2+.02});for(let s=0;s<3;s++)n.box(5,e*(s+1)/3,.7,at.andesit,it.BATU,{y:0,z:t/2+.5+2.1-(s+.5)*.7});return n.hip(i+2.2,t+2.4,e+4.1,6.5,at.genteng,it.GENTENG),n.box(.5,.8,.5,at.emas,it.POLOS,{y:e+10.5,x:-(i-t)*.42}),n.box(.5,.8,.5,at.emas,it.POLOS,{y:e+10.5,x:(i-t)*.42}),n}function Db(i,t){const e=new le;e.box(i+.6,2.8,i+.6,at.bata,it.BATA,{y:-1.2}),e.box(i+.9,.18,i+.9,at.batuPutih,it.POLOS,{y:1.5});const n=i*.42;e.box(n,1.6,n,at.kayu,it.KAYU,{y:1.6});let s=3.1;for(let r=0;r<t;r++){const a=r/Math.max(1,t-1),o=i*(1.08-.62*a);e.skirt(o,o,s,o*.4,o*.4,s+.55,at.ijuk,it.JERAMI,{shade:[.9,1.06]}),e.box(o*.36,.5,o*.36,at.kayuTua,it.KAYU,{y:s+.5}),s+=.95}return e.skirt(i*.4,i*.4,s,0,0,s+1,at.ijuk,it.JERAMI),e.cyl(.05,.16,.7,6,at.emas,it.POLOS,{y:s+.95}),e}function kb(i){const t=new le,e=i/17;t.box(i,1.9*e+1.2,i,at.andesit,it.BATU,{y:-1.2}),t.box(i+.4,.2*e,i+.4,at.andesitTua,it.POLOS,{y:1.9*e-.1}),t.box(i*.78,1.3*e,i*.78,at.andesit,it.BATU,{y:1.9*e});const n=i*.52;let s=3.2*e;t.box(n,5.6*e,n,at.andesit,it.BATU,{y:s}),t.box(n*.3,2.8*e,.3,at.gelap,it.POLOS,{y:s+.2,z:n/2+.02}),t.box(n*.42,.5*e,.4,at.andesitTua,it.BATU,{y:s+3.1*e,z:n/2}),s+=5.6*e;for(let r=0;r<3;r++){const a=n*(1.06-r*.2),o=1.7*e;t.box(a,o,a,at.andesit,it.BATU,{y:s}),t.box(a+.3*e,.22*e,a+.3*e,at.andesitTua,it.POLOS,{y:s-.1*e});for(const[c,l]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.box(.5*e,.6*e,.5*e,at.andesit,it.BATU,{x:c*a/2.3,y:s+o,z:l*a/2.3}),t.skirt(.5*e,.5*e,s+o+.6*e,0,0,s+o+1.2*e,at.andesit,it.BATU,{x:c*a/2.3,z:l*a/2.3});s+=o}t.cyl(n*.18,n*.24,1.6*e,8,at.andesit,it.BATU,{y:s}),t.cyl(.05*e,n*.16,2.2*e,8,at.andesit,it.BATU,{y:s+1.6*e});for(let r=0;r<4;r++)t.box(3.2*e,3.2*e*(r+1)/4,.8*e,at.andesit,it.BATU,{z:i*.39+(3.2-(r+.5)*.8)*e});return t}function Nb(i,t,e=at.alang,n=it.JERAMI){const s=new le;s.box(i*.92,.6+1.2,t*.92,at.bata,it.BATA,{y:-1.2});for(const[r,a]of[[-1,-1],[1,-1],[1,1],[-1,1]])s.cyl(.11,.11,2.6,6,at.kayuTua,it.KAYU,{x:r*i*.43,y:.6,z:a*t*.43});return s.hip(i+1,t+1,3.1,Math.min(i,t)*.55,e,n),s}function Ub(i,t){const e=new le;for(const[n,s]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.08,.08,3.4,5,at.kayuTua,it.KAYU,{x:n*i*.42,y:-1,z:s*t*.42});return e.box(i*.9,.15,t*.9,at.bambu,it.ANYAMAN,{y:.9}),e.gable(i+.8,t+.8,2.4,1.2,at.alang,it.JERAMI,at.alang,it.JERAMI),e}const Vf=[[at.merah,at.putih],[at.kuning,at.merah],[at.putih,at.merah],[at.biru,at.putih],[at.hijau,at.kuning]];function Ob(i,t){const e=new le;e.cyl(.05,.08,i,5,at.bambu,it.KAYU,{y:-.6});const[n,s]=Vf[t%Vf.length],r=i*.62,a=6;for(let l=0;l<a;l++){const u=i-.9-(l+1)*r/a;e.box(.04,r/a,.5,l%2?s:n,it.POLOS,{y:u,z:.27})}const{sway:o,pos:c}=e;for(let l=0;l<o.length;l++){const u=c[l*3+1];c[l*3+2]>.1&&(o[l]=.12+(i-.9-u)/r*.5)}return e}function Fb(i,t,e){const n=new le;n.box(i,e+1.8,t,at.bata,it.BATA,{y:-1.8}),n.box(i+.3,.16,t+.3,at.batuPutih,it.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",it.UBIN,{y:e});for(let a=0;a<5;a++)n.box(7,e*(a+1)/5,.72,at.andesit,it.BATU,{z:t/2+3.6-(a+.5)*.72});const s=(a,o,c)=>n.box(a,.55,o,at.bata,it.BATA,{...c,y:e});s(i,.4,{z:-t/2+.2}),s(.4,t,{x:-i/2+.2}),s(.4,t,{x:i/2-.2});for(const a of[-1,1])s((i-7)/2,.4,{x:a*(3.5+(i-7)/4),z:t/2-.2});Mp.forEach(([a,o],c)=>n.cyl(c<4?.3:.22,c<4?.34:.25,c<4?6.4:4.2,8,c<4?at.kayuTua:at.kayu,it.KAYU,{x:a,y:e,z:o}));const r=e+4.1;n.skirt(i+1.2,t+1.6,r,12.4,8.2,r+2.2,at.gentengTua,it.SIRAP),n.hip(12.8,8.6,r+2.1,3.6,at.gentengTua,it.SIRAP),n.box(.5,.8,.5,at.emas,it.POLOS,{y:r+5.6}),n.box(2.4,.5,1.6,at.emas,it.POLOS,{y:e,z:-2.6}),n.box(2.4,1.7,.3,at.emas,it.POLOS,{y:e+.5,z:-3.3});for(const a of[-1,1])n.cyl(.04,.04,3.2,5,at.kayuTua,it.KAYU,{x:a*2.2,y:e,z:-2.9}),n.cyl(.05,1,.45,8,at.kuning,it.POLOS,{x:a*2.2,y:e+3,z:-2.9});return n}const Wf=["#e9dfc6","#e0d0ab","#ece6d6"];function Bb(i,t,e=0){const n=new le,s=2.5,r=i/2,a=t/2,o=Wf[e%Wf.length],c=[-r,0,a],l=[-r,0,-a],u=[0,s,-a],h=[0,s,a],d=[r,0,a],f=[r,0,-a];return n.faces([[c,u,l],[c,h,u],[d,f,u],[d,u,h],[f,l,u],[c,d,h]],o,it.POLOS),n.faces([[[-.6,0,a+.02],[.6,0,a+.02],[0,1.7,a+.02]]],at.gelap,it.POLOS),n.box(.12,.12,t+.5,at.kayuTua,it.KAYU,{y:s-.04}),n.cyl(.04,.04,.9,4,at.kayuTua,it.KAYU,{y:s,z:a+.15}),n.box(.03,.3,.5,at.merah,it.POLOS,{y:s+.55,z:a+.42,sway:.08}),n}function Hb(i,t){const e=new le;e.box(i,1.4,.2,at.kayu,it.KAYU,{z:-t/2+.1});for(const s of[-1,1])e.box(.2,1.4,t,at.kayu,it.KAYU,{x:s*(i/2-.1)});const n=Math.round(i/3.4);for(let s=0;s<=n;s++)for(const r of[-t/2+.2,t/2-.3])e.cyl(.12,.13,2.9,5,at.kayuTua,it.KAYU,{x:-i/2+.2+s*(i-.4)/n,z:r});for(let s=1;s<n;s++)e.box(.12,1.1,t*.5,at.kayu,it.KAYU,{x:-i/2+s*i/n,z:-t*.22});return e.box(i-1,.45,.6,at.kayuTua,it.KAYU,{z:-t/2+.6}),e.gable(i+.8,t+1.2,2.8,1.7,at.alang,it.JERAMI,at.kayu,it.KAYU),e}function Gb(){const i=new le;return i.cyl(1,1.15,.9,8,at.alang,it.JERAMI),i.cyl(.15,1,.7,8,at.alang,it.JERAMI,{y:.9}),i}function Vb(){const i=new le;return i.box(1,.8,.8,at.kayuMuda,it.KAYU),i.box(.9,.7,.7,at.kayu,it.KAYU,{y:.8,x:.1,ry:.4}),i}function Wb(){const i=new le;return i.cyl(.32,.26,.9,8,"#a8603a",it.POLOS),i.cyl(.36,.32,.25,8,"#a8603a",it.POLOS,{y:.9}),i.cyl(.3,.24,.8,8,"#8f4f30",it.POLOS,{x:.7,z:.2}),i}function Xb(){const i=new le;for(const t of[-1,1])i.cyl(.05,.05,1.4,5,at.kayuTua,it.KAYU,{x:t*1.6});i.box(3.4,.08,1,at.bambu,it.ANYAMAN,{y:1.1});for(let t=0;t<8;t++)i.box(.3,.05,.12,"#b7c4cc",it.POLOS,{x:-1.4+t*.4,y:1.15,z:t%2?.2:-.2});return i}function jb(i,t,e){const n=new le;n.box(i,.22,t,at.kayuMuda,it.KAYU,{y:-.22});for(const r of[-1,1])n.box(.2,.25,t,at.kayuTua,it.KAYU,{x:r*(i/2-.1),y:-.45});const s=Math.max(2,Math.round(t/3));for(let r=0;r<=s;r++)for(const a of[-1,1])n.cyl(.13,.13,e+4.2,6,at.kayuTua,it.KAYU,{x:a*(i/2-.1),y:-e-4,z:-t/2+r*t/s});for(const r of[-1,1])n.cyl(.14,.14,.7,6,at.kayuTua,it.KAYU,{x:r*(i/2-.25),y:0,z:t/2-.4});return n}function Yb(i,t,e,n,{stone:s,piers:r}){const a=new le,o=Math.ceil(i/1.5),c=s?.9:.35,l=g=>-i/2+g/o*i,u=g=>e(g/o),h=[],d=[],f=[];for(let g=0;g<o;g++){const x=l(g),m=l(g+1),p=u(g),M=u(g+1),v=[-t/2,p,x],_=[t/2,p,x],S=[t/2,M,m],T=[-t/2,M,m];h.push([v,T,S],[v,S,_]);const L=[-t/2,p-c,x],G=[t/2,p-c,x],E=[t/2,M-c,m],A=[-t/2,M-c,m];d.push([L,T,v],[L,A,T],[G,_,S],[G,S,E]),f.push([L,G,E],[L,E,A])}a.faces(h,s?"#9a958c":at.kayuMuda,s?it.UBIN:it.KAYU),a.faces(d,s?at.andesit:at.kayu,s?it.BATU:it.KAYU),a.faces(f,s?at.andesitTua:at.kayuTua,it.POLOS);for(const g of[-1,1]){const x=g*(t/2-.2),m=[],p=s?1.05:1;for(let M=0;M<o;M++){const v=l(M),_=l(M+1),S=u(M),T=u(M+1);if(s){const L=[x-.2,x+.2];m.push([[L[1],S,v],[L[1],S+p,v],[L[1],T+p,_]],[[L[1],S,v],[L[1],T+p,_],[L[1],T,_]],[[L[0],T,_],[L[0],T+p,_],[L[0],S+p,v]],[[L[0],T,_],[L[0],S+p,v],[L[0],S,v]],[[L[0],S+p,v],[L[0],T+p,_],[L[1],T+p,_]],[[L[0],S+p,v],[L[1],T+p,_],[L[1],S+p,v]])}else M%2===0&&a.cyl(.07,.07,p,5,at.kayuTua,it.KAYU,{x,y:S,z:v})}if(s)a.faces(m,at.bata,it.BATA);else{const M=[];for(let v=0;v<o;v++){const _=l(v),S=l(v+1),T=u(v)+1,L=u(v+1)+1;M.push([[x-.06,T,_],[x+.06,L,S],[x+.06,T,_]],[[x-.06,T,_],[x-.06,L,S],[x+.06,L,S]])}a.faces(M,at.kayu,it.KAYU)}}for(const g of r){const x=-i/2+g*i,m=e(g)-c,p=n(x);if(s){a.box(t+.6,m-p+.5,2,at.andesit,it.BATU,{y:p-.5,z:x}),a.box(t+1,.3,2.4,at.andesitTua,it.POLOS,{y:m-.3,z:x});for(const M of[-1,1]){const v=e(g)+1.05;a.box(.5,.5,.5,at.batuPutih,it.POLOS,{x:M*(t/2-.2),y:v,z:x}),a.cyl(.06,.06,1.6,5,at.gelap,it.POLOS,{x:M*(t/2-.2),y:v+.5,z:x}),a.box(.36,.48,.36,"#ffe3a0",it.POLOS,{x:M*(t/2-.2),y:v+2.1,z:x}),a.skirt(.5,.5,v+2.58,0,0,v+2.9,at.gelap,it.POLOS,{x:M*(t/2-.2),z:x})}}else for(const M of[-1,1])a.cyl(.16,.18,m-p+.6,6,at.kayuTua,it.KAYU,{x:M*(t/2-.3),y:p-.6,z:x})}return a}const Mu={value:0},Kb=`
uniform float uTime;
attribute float aKind;
attribute float aSway;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;
`,qb=`
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
`;function Zb(i){const t=new qn({vertexColors:!0});return t.onBeforeCompile=e=>{e.uniforms.uTime=Mu,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=Wn.a,e.uniforms.uSeeB=Wn.b,e.uniforms.uSeeR=Wn.r,e.vertexShader=Kb+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
      vBNrm = normalize(mat3(bModel) * normal);`),e.fragmentShader=qb+e.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
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
      diffuseColor.rgb = buildingPattern(diffuseColor.rgb);`)},t}function $b(){const i=new Co({depthPacking:wo});return i.onBeforeCompile=t=>{t.uniforms.uTime=Mu,t.vertexShader=`uniform float uTime;
attribute float aSway;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      vec3 wp0 = (modelMatrix * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;`)},i}const Ja=1.6;function Ip(i){const t=[],e=(a,o)=>{for(const l of t)if(Math.abs(l.x-a)<Ja&&Math.abs(l.z-o)<Ja)return l;const c={id:t.length,x:a,z:o,links:[],w:new Map};return t.push(c),c},n=i.map(()=>[0,1]),s=(a,o,c)=>{const[l,u,h,d]=a,f=h-l,g=d-u,x=f*f+g*g,m=((o-l)*f+(c-u)*g)/x;if(m<-1e-6||m>1+1e-6)return null;const p=l+f*m-o,M=u+g*m-c;return p*p+M*M<Ja*Ja?Math.min(1,Math.max(0,m)):null};for(let a=0;a<i.length;a++)for(let o=0;o<i.length;o++){if(a===o)continue;const[c,l,u,h]=i[a],[d,f,g,x]=i[o];for(const[L,G]of[[d,f],[g,x]]){const E=s(i[a],L,G);E!==null&&n[a].push(E)}const m=u-c,p=h-l,M=g-d,v=x-f,_=m*v-p*M;if(Math.abs(_)<1e-9)continue;const S=((d-c)*v-(f-l)*M)/_,T=((d-c)*p-(f-l)*m)/_;S>0&&S<1&&T>0&&T<1&&n[a].push(S)}const r=new Set;return i.forEach((a,o)=>{const[c,l,u,h]=a,d=[...new Set(n[o].map(g=>Math.round(g*1e4)/1e4))].sort((g,x)=>g-x);let f=null;for(const g of d){const x=e(c+(u-c)*g,l+(h-l)*g);if(f&&f!==x){const m=f.id<x.id?`${f.id}-${x.id}`:`${x.id}-${f.id}`;r.has(m)||(r.add(m),f.links.push(x),x.links.push(f));const p=Math.max(a[4]??3,f.w.get(x.id)??0);f.w.set(x.id,p),x.w.set(f.id,p)}f=x}}),{nodes:t,edgeCount:r.size}}const Xf=128,Ur={genteng:["#b65a32","#a84f2c","#c46a3a","#94482b"],sirap:["#6b4f3a","#5d4434","#7a5a40","#584a3c"],joglo:["#5a4a40","#4a4038","#62503f","#3f3a35"],alang:["#bb9c5c","#a98a4e","#c4a76a","#8f7a52"]};function Jb(i,t){const e=i.roof??0;switch(i.type){case"rumah-bata":return xb(i.w,i.d,Ur.genteng[e]);case"rumah-limasan":return _b(i.w,i.d,Ur.sirap[e]);case"rumah-joglo":return vb(i.w,i.d,Ur.joglo[e]);case"rumah-panggung":return yb(i.w,i.d,Ur.alang[e]);case"rumah-lumbung":return Mb(Ur.alang[e]);case"gudang":return bb(i.w,i.d,at.genteng);case"warung":return Ab(i.color,i.goods);case"sumur":return wb();case"tembok":return Tb(i.len,i.t,i.h);case"tembok-dalam":return Eb(i.len,i.t,i.h);case"pagar":return Gf(i.len,i.t,i.h);case"pagar-batu":return Gf(i.len,i.t,i.h,!0);case"menara":return Cb(i.size,i.h);case"bentar":return Pb(i.w,i.d,i.h,i.mirror,i.stone);case"paduraksa":return Ib(i.w,i.d,i.opening,i.h);case"pendopo":return Lb(i.w,i.d,i.h);case"bangsal":return zb(i.w,i.d,i.h);case"meru":return Db(i.base,i.tiers);case"candi":return kb(i.base);case"bale":return Nb(i.w,i.d);case"dangau":return Ub(i.w,i.d);case"umbul":return Ob(i.h,i.color);case"siti-hinggil":return Fb(i.w,i.d,i.h);case"tenda":return Bb(i.w,i.d,i.color);case"kandang":return Hb(i.w,i.d);case"jerami":return Gb();case"peti":return Vb();case"gentong":return Wb();case"jemuran":return Xb();case"dermaga":return jb(i.w,i.len,i.y);case"jembatan-batu":case"jembatan-kayu":{const n=i.surface,s=c=>n.y0+(n.y1-n.y0)*c+n.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(c-n.a0)/(n.a1-n.a0)))),r=(i.type==="jembatan-batu"?16:7)/i.len,a=[];for(let c=n.a0+r;c<n.a1-r*.4;c+=r)a.push(c);const o=c=>i.axis==="x"?t.heightAt(i.x+c,i.z):t.heightAt(i.x,i.z+c);return Yb(i.len,i.w,s,o,{stone:i.type==="jembatan-batu",piers:a})}default:throw new Error(`jenis bangunan tidak dikenal: ${i.type}`)}}function Lp(i,t,e,n,s,r){const o=[];for(let u=0;u<=10;u++){const h=u/10,d=-t/2+h*t,f=e/2*Math.pow(Math.sin(Math.PI*h),.6),g=.35*Math.pow(Math.abs(h-.5)*2,3);o.push({z:d,w:f,top:.25+g,keel:-n*Math.pow(Math.sin(Math.PI*h),.5)+g*.6})}const c=[],l=[];for(let u=0;u<10;u++){const h=o[u],d=o[u+1];for(const f of[-1,1]){const g=[f*h.w,h.top,h.z],x=[f*d.w,d.top,d.z],m=[0,h.keel,h.z],p=[0,d.keel,d.z];f>0?c.push([g,m,p],[g,p,x]):c.push([g,p,m],[g,x,p])}l.push([[-h.w,h.top-.12,h.z],[d.w,d.top-.12,d.z],[h.w,h.top-.12,h.z]],[[-h.w,h.top-.12,h.z],[-d.w,d.top-.12,d.z],[d.w,d.top-.12,d.z]])}i.faces(c,s,it.KAYU),i.faces(l,at.kayuMuda,it.KAYU),i.box(e*.02+.05,.12,t*.7,r,it.POLOS,{x:e*.43,y:.05}),i.box(e*.02+.05,.12,t*.7,r,it.POLOS,{x:-e*.43,y:.05})}function Qb(){const i=new le;Lp(i,6.2,.85,.45,"#f2efe6","#2f62a8");for(const t of[-1,1])i.cyl(.09,.09,4.6,5,at.bambu,it.KAYU,{x:t*2.3,y:-.05,rx:Math.PI/2,z:2.3});for(const t of[-1.2,1.2])i.box(4.8,.08,.1,at.kayuTua,it.KAYU,{y:.35,z:t});return i.cyl(.05,.06,3.4,5,at.kayuTua,it.KAYU,{y:.2,z:.6}),i.faces([[[0,3.5,.6],[0,.9,.7],[0,.9,-2]],[[0,3.5,.6],[0,.9,-2],[0,.9,.7]]],at.merah,it.POLOS,{sway:.03}),i.build()}function tS(){const i=new le;Lp(i,18,5,2.2,"#7a5236",at.emas),i.box(4.2,2,5.5,at.kayu,it.KAYU,{y:.1,z:-4.8}),i.hip(4.8,6.2,2.1,1.4,at.ijuk,it.JERAMI,{z:-4.8});for(const[t,e]of[[2.6,11],[-1,8.5]]){i.cyl(.14,.18,e,6,at.kayuTua,it.KAYU,{y:.1,z:t});const n=e-.6;i.faces([[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.4,t+3.4]],[[0,n,t+2.6],[0,n*.95,t-1.6],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.4,t+3.4],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.95,t-1.6]]],"#e8dcc0",it.POLOS,{sway:.04})}return i.build()}function eS({ground:i,plan:t,mask:e,grid:n,quality:s,noiseTexture:r}){const a=new Pe;a.name="kepulauan-kencana";const{shadows:o}=s,c=new Map,l={};for(const R of t.build){l[R.type]=(l[R.type]||0)+1;const H=`${Math.floor(R.x/Xf)},${Math.floor(R.z/Xf)}`;let I=c.get(H);I||c.set(H,I=[]),I.push(R)}const u=Zb(r),h=$b();let d=0;for(const[R,H]of c){const I=H.map(F=>Jb(F,i)),C=I.reduce((F,dt)=>F+dt.pos.length/3,0),Z=new Float32Array(C*3),Q=new Float32Array(C*3),et=new Float32Array(C*3),gt=new Float32Array(C),xt=new Float32Array(C);let K=0;I.forEach((F,dt)=>{const At=H[dt],ft=Math.cos(At.rot),w=Math.sin(At.rot),st=F.pos.length/3;for(let ut=0;ut<st;ut++){const D=ut*3,P=(K+ut)*3,q=F.pos[D],j=F.pos[D+2];Z[P]=At.x+q*ft+j*w,Z[P+1]=At.y+F.pos[D+1],Z[P+2]=At.z-q*w+j*ft;const ht=F.nor[D],lt=F.nor[D+2];Q[P]=ht*ft+lt*w,Q[P+1]=F.nor[D+1],Q[P+2]=-ht*w+lt*ft}et.set(F.col,K*3),gt.set(F.kind,K),xt.set(F.sway,K),K+=st});const $=new fe;$.setAttribute("position",new be(Z,3)),$.setAttribute("normal",new be(Q,3)),$.setAttribute("color",new be(et,3)),$.setAttribute("aKind",new be(gt,1)),$.setAttribute("aSway",new be(xt,1)),$.computeBoundingSphere(),d+=C;const rt=new ie($,u);rt.name=`bangunan-${R}`,rt.castShadow=o,rt.receiveShadow=o,rt.customDepthMaterial=h,a.add(rt)}const f=Rp(r),g=s.canopyDetail,x=s.treeDensity,m=R=>({...R,y:i.heightAt(R.x,R.z),a:((R.x*.37+R.z*.11)%1+1)%1,b:.5,c:((R.x*.13-R.z*.29)%1+1)%1}),p=R=>t.trees.filter(H=>H.type===R).map(m),M=Hn({scaleMin:1,scaleMax:1,tilt:.05,tint:.08,sink:.1}),v=new V,_=(R,H,I)=>{M(R,H,I),H.scale(v.setScalar(R.s)),H.elements[12]=R.x,H.elements[13]=R.y-.1,H.elements[14]=R.z},S=new Pe;S.name="pohon-kencana";const T=R=>({castShadow:o,receiveShadow:o,toMatrix:R});S.add(tn("beringin",OM(g),f,p("beringin"),T(_)),tn("kamboja",FM(),f,p("kamboja"),T(_)),tn("pisang",BM(),f,p("pisang"),T(_)),tn("mangga",Ll(g),f,p("mangga").map(R=>({...R,s:R.s*.62})),T(_)));const L=(R,H,I)=>e.reserved(R,H,I+1)||qi(R,H,Se)<10||qi(R,H,Mn)<10||yo.some(C=>xs(R,H,C,I+2)),G=p("kelapa"),E={kelapa:[],pohon:[],payung:[],semak:[],bunga:[]};for(const R of Ar){const H=!!R.rx,I=(H?Math.max(R.rx,R.rz):R.r)*1.12,C=H?R.rx*R.rz/255**2:(R.r/255)**2,Z=R.forest??1,Q=(et,gt)=>ha(R,et,gt)<1.1;E.kelapa.push(...Cn({ground:i,grid:n,kind:"kelapa",seed:1101+R.seed,radius:1.8,area:I,cx:R.x,cz:R.z,reserved:L,count:Math.round(130*x*Math.sqrt(C)),accept:(et,gt,xt,K,$)=>Q(et,gt)&&xt>.9&&xt<4.2&&K<.3&&$()<.6})),E.pohon.push(...Cn({ground:i,grid:n,kind:"pohon",seed:1202+R.seed,radius:2.3,area:I,cx:R.x,cz:R.z,reserved:L,count:Math.round(340*x*C*Z)+6,accept:(et,gt,xt,K)=>Q(et,gt)&&xt>3&&xt<30&&K<.6&&ji(et,gt)>.44})),E.payung.push(...Cn({ground:i,grid:n,kind:"pohon",seed:1303+R.seed,radius:4.5,area:I,cx:R.x,cz:R.z,reserved:L,count:Math.round(40*x*C*Z)+2,accept:(et,gt,xt,K,$)=>Q(et,gt)&&xt>3&&xt<30&&K<.45&&$()<.5})),E.semak.push(...Cn({ground:i,grid:n,kind:"semak",seed:1404+R.seed,radius:1.1,area:I,cx:R.x,cz:R.z,reserved:L,count:Math.round(260*x*C*Math.sqrt(Z))+8,accept:(et,gt,xt,K)=>Q(et,gt)&&xt>2.8&&K<.7})),E.bunga.push(...Cn({ground:i,grid:n,kind:"semak",seed:1505+R.seed,radius:1,area:I,cx:R.x,cz:R.z,reserved:L,count:Math.round(90*x*C*Math.sqrt(Z))+6,accept:(et,gt,xt,K)=>Q(et,gt)&&xt>2.8&&K<.5}))}S.add(tn("kelapa",wp(),f,[...G,...E.kelapa],T(Hn({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1}))),tn("pohon-hutan",Ll(g),f,E.pohon,T(Hn({scaleMin:.75,scaleMax:1.3,tilt:.12,tint:.16}))),tn("pohon-payung",Tp(g),f,E.payung,T(Hn({scaleMin:.8,scaleMax:1.15,tilt:.08,tint:.12}))),tn("semak",Mo(0,null),f,E.semak,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:Hn({scaleMin:.7,scaleMax:1.4,tilt:.2,tint:.2,sink:.1})}),tn("semak-bunga",Mo(0,["#e0353f","#f4c02c","#f06aa8","#ffffff"]),f,E.bunga,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:Hn({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),a.add(S);const A={jukung:Qb(),jong:tS()},U=[];for(const R of["jukung","jong"]){const H=t.boats.filter(C=>(C.type==="jukung-darat"?"jukung":C.type)===R);if(!H.length)continue;const I=new Ss(A[R],u,H.length);I.name=`perahu-${R}`,I.castShadow=o,I.receiveShadow=o,I.customDepthMaterial=h,I.instanceMatrix.setUsage(In),H.forEach((C,Z)=>U.push({...C,mesh:I,i:Z,phase:(C.x*.31+C.z*.17)%6.28,land:C.type==="jukung-darat",y:Math.max(0,i.heightAt(C.x,C.z))})),a.add(I)}const Y=[...new Set(U.map(R=>R.mesh))],X=new Ot,J=new _e,b=new un,z=new V,N=new V(1,1,1);function y(R){for(const H of U)H.land?(b.set(.04,H.rot,.12),z.set(H.x,H.y+.45,H.z)):(b.set(Math.sin(R*.9+H.phase)*.025,H.rot,Math.sin(R*1.1+H.phase*1.7)*.06),z.set(H.x,.12+Math.sin(R*1.3+H.phase)*.1,H.z)),J.setFromEuler(b),H.mesh.setMatrixAt(H.i,X.compose(z,J,N));for(const H of Y)H.instanceMatrix.needsUpdate=!0}y(0);for(const R of Y)R.computeBoundingSphere();const B=[...E.kelapa.map(R=>({x:R.x,z:R.z,radius:.45,kind:"pohon"})),...E.pohon.map(R=>({x:R.x,z:R.z,radius:.7,kind:"pohon"})),...E.payung.map(R=>({x:R.x,z:R.z,radius:.75,kind:"pohon"}))],O=[...t.blocked.map(R=>({x:R.x,z:R.z,radius:Math.max(R.hx,R.hz)+1.5,strength:.25})),...E.pohon.map(R=>({x:R.x,z:R.z,radius:4.8,strength:.4})),...E.payung.map(R=>({x:R.x,z:R.z,radius:5.5,strength:.3})),...E.kelapa.map(R=>({x:R.x,z:R.z,radius:2.4,strength:.18})),...t.trees.filter(R=>R.type==="beringin").map(R=>({x:R.x,z:R.z,radius:12,strength:.5})),...E.semak.map(R=>({x:R.x,z:R.z,radius:1.8,strength:.2}))],k=Ip([...t.roads,...t.paths]);return{object:a,colliders:[...t.colliders,...B],surfaces:t.surfaces,occlusion:O,routes:k,spots:t.spots,roofs:t.roofs,stats:{bangunan:t.build.length,rumah:Object.entries(l).filter(([R])=>R.startsWith("rumah-")).reduce((R,[,H])=>R+H,0),jenis:l,petak:c.size,titik:d,pohon:Object.values(E).reduce((R,H)=>R+H.length,0)+t.trees.length,perahu:U.length,simpulJalan:k.nodes.length},update(R){Mu.value=R,y(R)}}}const bo=30,jf=new Ot,Yf=new Ot;function Nl(i,t,e){const n=i.elements;t[e]=n[0],t[e+1]=n[4],t[e+2]=n[8],t[e+3]=n[12],t[e+4]=n[1],t[e+5]=n[5],t[e+6]=n[9],t[e+7]=n[13],t[e+8]=n[2],t[e+9]=n[6],t[e+10]=n[10],t[e+11]=n[14]}function aa(i,t,e,n){let s=null;i.traverse(u=>{!s&&u.isSkinnedMesh&&(s=u)});const{skeleton:r}=s,a=new pu(i),o={},c=u=>(o[u]||(a.stopAllAction(),a.clipAction(Ms.findByName(t,u)).reset().play(),a.setTime(0),o[u]=r.bones.map(h=>h.quaternion.clone())),o[u]),l={};for(const[u,h]of Object.entries(n)){const d=Ms.findByName(t,h.clip);if(!d)continue;const f=Object.entries(h.hold||{}).map(([x,m])=>[Number(x),c(m)]);a.stopAllAction(),a.clipAction(d).reset().play();const g=Math.max(1,Math.round(d.duration*bo));l[u]={row:e.length,n:g,loop:h.loop!==!1};for(let x=0;x<g;x++){a.setTime(x/bo);for(const[p,M]of f)r.bones[p].quaternion.copy(M[p]);i.updateMatrixWorld(!0),Yf.copy(i.matrixWorld).invert();const m=new Float32Array(r.bones.length*12);r.bones.forEach((p,M)=>{jf.multiplyMatrices(Yf,p.matrixWorld).multiply(r.boneInverses[M]),Nl(jf,m,M*12)}),e.push(m)}}return a.stopAllAction(),{table:l,skeleton:r}}function rr(i){const t=[],e=[],n=[],s=[],r=[];for(const a of i){const o=a.geometry,c=t.length/3,l=o.attributes.position,u=o.attributes.normal,h=o.attributes.uv,d=o.attributes.skinIndex,f=o.attributes.skinWeight;for(let x=0;x<l.count;x++){t.push(l.getX(x),l.getY(x),l.getZ(x)),e.push(u.getX(x),u.getY(x),u.getZ(x)),n.push(h.getX(x),h.getY(x));let m=0;for(let p=1;p<4;p++)f.getComponent(x,p)>f.getComponent(x,m)&&(m=p);s.push(d.getComponent(x,m))}const g=o.index;for(let x=0;x<g.count;x++)r.push(c+g.getX(x))}return{pos:t,nor:e,uv:n,bone:s,index:r}}function ii(i,t,e){const n=i[t].subarray(e*12,e*12+12);return new Ot().set(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],0,0,0,1)}function Ce(i,t,e,n,s,r){const a=t.index?t.toNonIndexed():t;a.applyMatrix4(ii(e,n,s).invert());const o=i.pos.length/3,c=a.attributes.position,l=a.attributes.normal,u=a.attributes.uv;for(let h=0;h<c.count;h++)i.pos.push(c.getX(h),c.getY(h),c.getZ(h)),i.nor.push(l.getX(h),l.getY(h),l.getZ(h)),r?i.uv.push(r[0],r[1]):i.uv.push(u.getX(h),u.getY(h)),i.bone.push(s),i.index.push(o+h)}function bu(i){const t=new fe;return t.setAttribute("position",new Xt(i.pos,3)),t.setAttribute("normal",new Xt(i.nor,3)),t.setAttribute("uv",new Xt(i.uv,2)),t.setAttribute("aBone",new Xt(i.bone,1)),t.setIndex(i.index),t}function Su(i,t){const e=t*3,n=new Float32Array(e*i.length*4);i.forEach((r,a)=>n.set(r.subarray(0,Math.min(r.length,e*4)),a*e*4));const s=new bs(n,e,i.length,Ze,Pn);return s.magFilter=$e,s.minFilter=$e,s.needsUpdate=!0,s}const nS=`
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
`;function oa(i,t){i.uniforms.uBones={value:t},i.vertexShader=nS+i.vertexShader.replace("void main() {",`void main() {
  mat4 animM = animMatrix();`).replace("#include <beginnormal_vertex>",`vec3 objectNormal = normalize(mat3(animM) * vec3(normal));
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif`).replace("#include <begin_vertex>","vec3 transformed = (animM * vec4(position, 1.0)).xyz;")}function So(i,t,e,n){const s=t*bo;let r,a,o;if(i.loop){const c=(s%i.n+i.n)%i.n;r=Math.floor(c),a=(r+1)%i.n,o=c-r}else{const c=Math.min(s,i.n-1);r=Math.floor(c),a=Math.min(r+1,i.n-1),o=c-r}e[n]=i.row+r,e[n+1]=i.row+a,e[n+2]=o}const Tc=2.3,iS={idle:"idle",walk:"walk",sit:"sit",interact:"interact-right",pickup:"pick-up",wave:"emote-yes"},Kf=Object.fromEntries(Object.entries(iS).map(([i,t])=>[i,{clip:t,loop:i!=="wave"}])),sS=1.4,qf=.25,Qa=2.6,rS=.35,Zf=["male-a","male-b","male-e","male-f","female-a","female-b","female-c","female-f"],to={emas:[.3125,.5625],kayu:[.8125,.8125],besi:[.4375,.8125]},aS=new Ot;function oS({ground:i,routes:t,spots:e,quality:n,villagerGltf:s,soldier:r,scripted:a=0}){const o=new Pe;o.name="penduduk";const c=[],l=aa(s.scene,s.animations,c,Kf),u={};s.scene.traverse(K=>{K.isSkinnedMesh&&(u[K.name.replace("character-","")]=K)});const h=Object.values(u)[0].material.map,d=[];for(const K of Zf){const $=u[K];$&&d.push({name:K,data:rr([$]),table:l.table,map:h})}const f=rr([u["male-b"]]);let g=0;for(let K=0;K<f.bone.length;K++)f.bone[K]===6&&(g=Math.max(g,f.pos[K*3+1]));const x=l.table.sit.row,m=ii(c,x,6),p=new V(0,g-.015,.02).applyMatrix4(m);Ce(f,new Ne(.17,.15,.07,10,1,!0).translate(p.x,p.y+.035,p.z),c,x,6,to.emas);for(let K=0;K<5;K++){const $=K/5*Math.PI*2;Ce(f,new ys(.035,.09,4).translate(p.x+Math.cos($)*.16,p.y+.11,p.z+Math.sin($)*.16),c,x,6,to.emas)}if(d.push({name:"raja",data:f,table:l.table,map:h}),r){const K=Do(r.model),$=aa(K,r.clips,c,Kf),rt=[];K.traverse(ft=>{ft.isSkinnedMesh&&rt.push(ft)});const F=rr(rt),dt=$.table.idle.row,At=new V(-.265,0,.068).applyMatrix4($.skeleton.boneInverses[5].clone().invert()).applyMatrix4(ii(c,dt,5));Ce(F,new Ne(.016,.016,1.3,5).translate(At.x,At.y+.25,At.z),c,dt,5,to.kayu),Ce(F,new ys(.04,.16,4).translate(At.x,At.y+.98,At.z),c,dt,5,to.besi),d.push({name:"prajurit",data:F,table:$.table,map:rt[0].material.map,tint:new Ut(1,.86,.68)})}const M=Su(c,7),v=[],_=K=>d.findIndex($=>$.name===K),S=Zf.map(_).filter(K=>K>=0),T=()=>S[Math.floor(Math.random()*S.length)],L={penjaga:"prajurit",raja:"raja",pendeta:"male-e"};for(const K of e){let $=L[K.role]?_(L[K.role]):T();$<0&&($=T()),v.push({type:$,fixed:!0,role:K.role,x:K.x,z:K.z,y:K.y??null,heading:K.rot,homeHeading:K.rot,anim:K.anim,clip:K.anim,t:Math.random()*3,prev:null,prevT:0,fade:0})}const G={rendah:120,sedang:220,tinggi:320}[n.level]??220,E=t.nodes.filter(K=>K.links.length),A=[];for(const K of E)for(const $ of K.links)K.id<$.id&&A.push([K,$,Math.hypot($.x-K.x,$.z-K.z)]);const U=([K,$,rt])=>rt*(Math.max(K.x,$.x)<-415&&Math.max(K.z,$.z)<145&&Math.min(K.z,$.z)>-65&&Math.min(K.x,$.x)>-705?3:1),Y=A.reduce((K,$)=>K+U($),0);for(let K=0;K<G&&A.length;K++){let $=Math.random()*Y,rt=A[0];for(const ft of A)if($-=U(ft),$<=0){rt=ft;break}const[F,dt,At]=Math.random()<.5?rt:[rt[1],rt[0],rt[2]];v.push({type:T(),fixed:!1,from:F,to:dt,len:At,s:Math.random()*At,side:Math.random()<.5?-1:1,lat:.6+Math.random()*1.4,speed:.95+Math.random()*.55,pause:0,x:F.x,z:F.z,y:null,heading:0,clip:"walk",anim:"walk",t:Math.random(),prev:null,prevT:0,fade:0,init:!0})}for(let K=0;K<a;K++)v.push({type:T(),fixed:!1,scripted:!0,hidden:!0,x:0,z:0,y:null,heading:0,speed:1.2,clip:"idle",anim:"idle",t:0,prev:null,prevT:0,fade:0});const X=d.map(()=>0);for(const K of v)X[K.type]++;const J=d.map((K,$)=>{const rt=bu(K.data),F=Math.max(1,X[$]),dt=new Ln(new Float32Array(F*4),4).setUsage(In),At=new Ln(new Float32Array(F*4),4).setUsage(In);rt.setAttribute("aAnimA",dt),rt.setAttribute("aAnimB",At);const ft=new qn({map:K.map});ft.onBeforeCompile=ut=>oa(ut,M);const w=new Ss(rt,ft,F);w.name=`penduduk-${K.name}`,w.instanceMatrix.setUsage(In),w.frustumCulled=!1,w.castShadow=n.shadows,w.receiveShadow=n.shadows;const st=new Co({depthPacking:wo});if(st.onBeforeCompile=ut=>oa(ut,M),w.customDepthMaterial=st,K.tint)for(let ut=0;ut<F;ut++)w.setColorAt(ut,K.tint);return w.count=0,o.add(w),{mesh:w,animA:dt,animB:At,table:K.table}});function b(K,$){K.clip!==$&&(K.prev=K.clip,K.prevT=K.t,K.fade=qf,K.clip=$,K.t=0)}const z=(K,$,rt,F,dt)=>So(K[$]||K.idle,rt,F,dt),N=(K,$,rt)=>K+Math.atan2(Math.sin($-K),Math.cos($-K))*rt;function y(K,$,rt){const F=rt.x-K.x,dt=rt.z-K.z,At=Math.hypot(F,dt);if(At<Qa){K.greeted?K.clip==="wave"&&K.t>.7&&b(K,"idle"):(K.greeted=!0,b(K,"wave")),K.heading=N(K.heading,Math.atan2(F,dt),Math.min(1,$*6));return}if(At>Qa+2.5&&(K.greeted=!1),K.pause>0){K.pause-=$,b(K,"idle");return}if(b(K,"walk"),K.s+=K.speed*$,K.s>=K.len){const j=K.to,ht=j.links.filter(Mt=>Mt!==K.from),lt=ht.length?ht[Math.floor(Math.random()*ht.length)]:K.from;K.s-=K.len,K.from=j,K.to=lt,K.len=Math.max(.1,Math.hypot(lt.x-j.x,lt.z-j.z)),Math.random()<.12&&(K.pause=2+Math.random()*5)}const ft=(K.to.x-K.from.x)/K.len,w=(K.to.z-K.from.z)/K.len,st=Math.min(1,K.s/K.len),ut=K.side*Math.min(K.lat,Math.max(0,(K.from.w.get(K.to.id)??5)/2-.9)),D=K.from.x+(K.to.x-K.from.x)*st-w*ut,P=K.from.z+(K.to.z-K.from.z)*st+ft*ut;K.init&&(K.x=D,K.z=P,K.heading=Math.atan2(ft,w),K.init=!1);const q=1-Math.exp(-6*$);K.x+=(D-K.x)*q,K.z+=(P-K.z)*q,K.heading=N(K.heading,Math.atan2(ft,w),Math.min(1,$*5))}function B(K,$,rt){const F=rt.x-K.x,dt=rt.z-K.z,At=Math.hypot(F,dt),ft=K.role==="penjaga";At<(ft?4:Qa)&&K.anim!=="sit"?(!ft&&!K.greeted?(K.greeted=!0,b(K,"wave")):K.clip==="wave"&&K.t>.7&&b(K,"idle"),K.heading=N(K.heading,Math.atan2(F,dt),Math.min(1,$*5))):(At>Qa+2.5&&(K.greeted=!1),b(K,K.anim),K.heading=N(K.heading,K.homeHeading,Math.min(1,$*3)))}const O=new vr,k=new Ot,R=new hn(new V,1.6),H=new _e,I=new V,C=new V(Tc,Tc,Tc),Z=new V(0,1,0);let Q=0;const et={x:0,z:0};function gt(K,$,rt,F,dt=110){et.x=F?F.x:1e9,et.z=F?F.z:1e9,$.updateMatrixWorld(),k.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),O.setFromProjectionMatrix(k);for(const ft of J)ft.mesh.count=0;Q=0;const At=dt*dt;for(const ft of v){if(ft.hidden)continue;ft.scripted||(ft.fixed?B(ft,K,et):y(ft,K,et));const w=ft.clip==="walk"?(ft.speed||1)/sS:1;ft.t+=K*w,ft.fade>0&&(ft.fade=Math.max(0,ft.fade-K),ft.prevT+=K);const st=ft.x-rt.x,ut=ft.z-rt.z;if(st*st+ut*ut>At)continue;const D=ft.y??i.surfaceAt(ft.x,ft.z);if(R.center.set(ft.x,D+.8,ft.z),!O.intersectsSphere(R))continue;const P=J[ft.type],q=P.mesh.count++;I.set(ft.x,D,ft.z),H.setFromAxisAngle(Z,ft.heading),P.mesh.setMatrixAt(q,aS.compose(I,H,C));const j=P.animA.array;z(P.table,ft.clip,ft.t,j,q*4),j[q*4+3]=ft.fade>0?ft.fade/qf:0,ft.fade>0&&z(P.table,ft.prev,ft.prevT,P.animB.array,q*4),Q++}for(const ft of J)ft.mesh.count&&(ft.mesh.instanceMatrix.needsUpdate=!0,ft.animA.needsUpdate=!0,ft.animB.needsUpdate=!0)}function xt(K,$=.35){for(const rt of v){if(rt.hidden)continue;const F=K.x-rt.x,dt=K.z-rt.z,At=$+rS,ft=F*F+dt*dt;if(ft>=At*At||ft<1e-8)continue;const w=Math.sqrt(ft);K.x=rt.x+F/w*At,K.z=rt.z+dt/w*At}}return{object:o,agents:v,update:gt,pushOut:xt,setClip:b,scripted:v.filter(K=>K.scripted),stats:()=>({total:v.filter(K=>!K.scripted).length,fixed:v.filter(K=>K.fixed).length,visible:Q,jenis:d.length})}}const ar=2.3,zp=15,eo=1,Vr=16,gs={first:.349,step:.349,count:4},Wr=16,$f={rendah:{near:70,reach:12,view:32,cell:56},sedang:{near:160,reach:16,view:42,cell:80},tinggi:{near:320,reach:22,view:55,cell:112}},Qn=(i,t)=>[(i+.5)/8,(t+.5)/8],pn={kayu:Qn(6,6),kayuTua:Qn(6,7),besi:Qn(3,6),putih:Qn(4,6),emas:Qn(2,4),emasTua:Qn(2,5),ungu:Qn(7,4)},Jf=[[4,4],[5,4],[1,4],[2,4],[4,6],[7,4]],Js=[{id:"perisai",hold:{4:"holding-left"},size:2.5,center:1.05,blob:[.55,.55]},{id:"tombak",hold:{},size:3.4,center:1.5,blob:[.5,.5]},{id:"pedang",hold:{5:"holding-right"},size:2.6,center:1.15,blob:[.5,.5]},{id:"pemanah",hold:{4:"holding-left"},size:2.5,center:1.05,blob:[.5,.5]},{id:"kavaleri",mounted:!0,size:4.6,center:1.85,blob:[.48,1.35]},{id:"senapati",mounted:!0,size:5,center:2,blob:[.48,1.35],always:!0}],Zi=new Ot,_s=new _e,Au=new V,ca=new V(0,1,0);function Qf(i,[t,e]){for(let n=0;n<i.uv.length;n+=2){const s=Math.floor(i.uv[n]*8),r=Math.floor(i.uv[n+1]*8);s===4&&(r===4||r===5)&&(i.uv[n]=(t+.5)/8,i.uv[n+1]=(e+(r-4)+.5)/8)}}function ls(i,t,e,n=e){const s=i.distanceTo(t),r=new Yn(e,s,n);return _s.setFromUnitVectors(ca,Au.subVectors(t,i).normalize()),r.applyMatrix4(Zi.compose(i.clone().add(t).multiplyScalar(.5),_s,new V(1,1,1)))}function cS(i,t){t.updateMatrixWorld(!0);const e=i.geometry.clone();return e.applyMatrix4(Zi.copy(t.matrixWorld).invert().multiply(i.matrixWorld)),e}function lS(i,t,e){const n=Do(i.model),s=[];n.traverse(u=>{u.isSkinnedMesh&&s.push(u)});const{map:r}=s[0].material,a=i.model.userData.sword?(()=>{let u=null;return i.model.userData.sword.traverse(h=>{!u&&h.isMesh&&(u=h)}),u})():null,o=[],c=(u,h,d)=>new V(d===5?-.265:.265,0,.068).applyMatrix4(u.boneInverses[d].clone().invert()).applyMatrix4(ii(e,h,d));for(let u=0;u<4;u++){const h=Js[u],d=aa(n,i.clips,e,{idle:{clip:"idle",hold:h.hold}}),f=d.table.idle,{row:g}=f,x=rr(s);if(Qf(x,Jf[u]),h.id==="perisai"){const m=c(d.skeleton,g,4),p=t.shieldRect.clone().scale(1.5,1.5,1.5);p.translate(m.x+.02,m.y-.22,m.z+.07),Ce(x,p,e,g,4,null)}else if(h.id==="tombak"){const m=c(d.skeleton,g,5),p=Math.max(.02,m.y-.42);Ce(x,new Ne(.017,.017,m.y+1.05-p,5).translate(m.x,(p+m.y+1.05)/2,m.z),e,g,5,pn.kayu),Ce(x,new ys(.045,.18,4).translate(m.x,m.y+1.14,m.z),e,g,5,pn.besi),Ce(x,new Ne(.03,.03,.04,5).translate(m.x,m.y+1.04,m.z),e,g,5,pn.emas)}else if(h.id==="pedang"&&a){const m=c(d.skeleton,g,5),p=a.geometry.clone();p.applyMatrix4(Zi.makeRotationX(Math.PI-.25)),p.translate(m.x,m.y+.02,m.z),Ce(x,p,e,g,5,null)}else if(h.id==="pemanah"){const m=c(d.skeleton,g,4),p=6,M=[];for(let E=0;E<=p;E++){const A=-.36+.72*E/p;M.push(new V(m.x,m.y+A,m.z+.02-.1*(A/.36)**2))}for(let E=0;E<p;E++)Ce(x,ls(M[E],M[E+1],.026,.034),e,g,4,pn.kayuTua);Ce(x,ls(M[0],M[p],.008),e,g,4,pn.putih);const v=3,_=new V(.07,.2,-.17),S=new V(.13,.42,-.2),T=ii(e,g,v),L=_.clone().applyMatrix4(T),G=S.clone().applyMatrix4(T);Ce(x,ls(L,G,.09,.07),e,g,v,pn.kayuTua);for(let E=0;E<4;E++){const A=new V(E%2*.03-.015,0,Math.floor(E/2)*.025-.012);Ce(x,ls(G.clone().add(A),G.clone().add(A).add(new V(.025,.09,-.01)),.016,.03),e,g,v,E%2?pn.putih:pn.emas)}}o.push({...h,data:x,clip:f,map:r})}const l=uS(n,i.clips,t,e);for(let u=4;u<6;u++){const h=Js[u],d=rr(s);Qf(d,Jf[u]);const{row:f}=l.clip;l.parts.forEach((m,p)=>{const M=m.geometry.clone();if(h.id==="senapati"){const{uv:v}=M.attributes;for(let _=0;_<v.count;_++){const S=Math.floor(v.getX(_)*8),T=Math.floor(v.getY(_)*8);S===1&&T===7||v.setXY(_,...S===1?Qn(4,7):Qn(4,6))}}Ce(d,M.applyMatrix4(ii(e,f,7+p)),e,f,7+p,null)});const g=new Yn(.34,.03,.36).translate(0,l.backY+.012,0);Ce(d,g.applyMatrix4(ii(e,f,7)),e,f,7,h.id==="senapati"?pn.ungu:Qn(4,4));const x=l.hand;if(h.id==="kavaleri"){const m=new V(x.x,x.y-.4,x.z-.08),p=new V(x.x,x.y+1.6,x.z+.28);Ce(d,ls(m,p,.032),e,f,5,pn.kayu);const M=p.clone().add(Au.subVectors(p,m).normalize().multiplyScalar(.12));Ce(d,ls(p,M,.06,.02),e,f,5,pn.besi)}else{const m=new V(x.x,x.y-.3,x.z),p=new V(x.x,x.y+1.9,x.z);Ce(d,ls(m,p,.035),e,f,5,pn.emasTua),Ce(d,new Yn(.01,.42,.34).translate(x.x,x.y+1.62,x.z-.18),e,f,5,pn.ungu),Ce(d,new ys(.05,.14,4).translate(x.x,x.y+1.97,x.z),e,f,5,pn.emas)}o.push({...h,data:d,clip:l.clip,map:r})}return o}function uS(i,t,e,n){const s=[],r=aa(i,t,s,{drive:{clip:"drive"}}),{skeleton:a}=r,{horse:o}=e,c=new Ot().compose(new V(0,0,0),new _e().setFromAxisAngle(ca,Math.PI/2),new V(eo,eo,eo)),l={};o.traverse(S=>{l[S.name]=S});const u=["torso","leg-back-left","leg-back-right","leg-front-left","leg-front-right","neck","head","tail"],h={};for(const S of["neck","head","tail"])h[S]=l[S].quaternion.clone();const d=S=>(o.updateMatrixWorld(!0),c.clone().multiply(Zi.copy(o.matrixWorld).invert().multiply(l[S].matrixWorld))),f=u.map(d),g=(.25+.312)*eo,x=new V(0,.17625,-.02375).applyMatrix4(ii(s,r.table.drive.row,3)),m=new Ot().makeTranslation(0,g+.035-x.y,-.02-x.z),p=90,M=n.length;for(let S=0;S<p;S++){const T=S/p*Math.PI*2;l.neck.quaternion.copy(h.neck).multiply(_s.setFromAxisAngle(new V(0,0,1),.07*Math.sin(T))),l.head.quaternion.copy(h.head).multiply(_s.setFromAxisAngle(new V(0,0,1),.06*Math.sin(T+.8))),l.tail.quaternion.copy(h.tail).multiply(_s.setFromAxisAngle(ca,.3*Math.sin(T*2)));const L=new Float32Array(zp*12),G=s[r.table.drive.row+S%r.table.drive.n];for(let E=0;E<7;E++)Zi.set(G[E*12],G[E*12+1],G[E*12+2],G[E*12+3],G[E*12+4],G[E*12+5],G[E*12+6],G[E*12+7],G[E*12+8],G[E*12+9],G[E*12+10],G[E*12+11],0,0,0,1),Nl(m.clone().multiply(Zi),L,E*12);u.forEach((E,A)=>{Nl(d(E).multiply(f[A].clone().invert()),L,(7+A)*12)}),n.push(L)}for(const S of["neck","head","tail"])l[S].quaternion.copy(h[S]);const v=u.map((S,T)=>({geometry:l[S].geometry.clone().applyMatrix4(f[T])})),_=new V(-.265,0,.068).applyMatrix4(a.boneInverses[5].clone().invert()).applyMatrix4(ii(n,M,5));return{clip:{row:M,n:p,loop:!0},parts:v,hand:_,backY:g}}function hS(i,t,e,n){const s=Vr*gs.count,r=t.length*s,a=Math.ceil(r/Wr),o=new wi(Wr*n,a*n,{colorSpace:Be,depthBuffer:!1,generateMipmaps:!0,minFilter:yn,magFilter:We});o.texture.name="atlas-prajurit";const c=new wi(n,n,{colorSpace:Be,samples:4}),l=new po;l.add(new hp(e.hemi.color,e.hemi.groundColor,e.hemi.intensity));const u=new hu(e.sun.color,e.sun.intensity);u.position.copy(e.sunDir).multiplyScalar(50),l.add(u,u.target);const h=new Eo(-1,1,1,-1,1,80),d=new ie(new bn(2,2),new Kn({uniforms:{uMap:{value:c.texture}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main() { gl_FragColor = texture2D(uMap, vUv); }",depthTest:!1,depthWrite:!1}));d.frustumCulled=!1;const f=new po;f.add(d);const g=i.getRenderTarget(),x=i.getClearColor(new Ut),m=i.getClearAlpha(),p=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1,i.setClearColor(4866104,0),i.setRenderTarget(o),i.clear(),o.texture.generateMipmaps=!1,o.scissorTest=!0,t.forEach((_,S)=>{const{mesh:T,type:L}=_,{parent:G}=T;l.add(T),T.count=1,T.setMatrixAt(0,Zi.compose(Au.set(0,0,0),_s.setFromAxisAngle(ca,kl),new V(ar,ar,ar))),T.instanceMatrix.needsUpdate=!0,_.anim.array.set([L.clip.row,L.clip.row,0,0],0),_.anim.needsUpdate=!0;const E=L.size/2;h.left=-E,h.right=E,h.top=E,h.bottom=-E,h.updateProjectionMatrix();for(let A=0;A<gs.count;A++){const U=gs.first+A*gs.step;for(let Y=0;Y<Vr;Y++){const X=kl+Y/Vr*Math.PI*2;h.position.set(Math.sin(X)*Math.cos(U)*40,L.center+Math.sin(U)*40,Math.cos(X)*Math.cos(U)*40),h.lookAt(0,L.center,0),i.setRenderTarget(c),i.clear(),i.render(l,h);const J=S*s+A*Vr+Y;o.viewport.set(J%Wr*n,Math.floor(J/Wr)*n,n,n),o.scissor.copy(o.viewport),i.setRenderTarget(o),i.render(f,h)}}T.count=0,G.add(T)}),o.scissorTest=!1,o.viewport.set(0,0,o.width,o.height),o.scissor.set(0,0,o.width,o.height),o.texture.generateMipmaps=!0;const M=new po,{autoClear:v}=i;return i.autoClear=!1,i.setRenderTarget(o),i.render(M,h),i.autoClear=v,i.setRenderTarget(g),i.setClearColor(x,m),i.shadowMap.autoUpdate=p,c.dispose(),d.geometry.dispose(),d.material.dispose(),{texture:o.texture,target:o,rows:a,per:s}}const fS=`
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
`;function dS({ground:i,plan:t,quality:e,soldier:n,bala:s,renderer:r,env:a}){const{army:o}=t,c=o.soldiers,l=$f[e.level]??$f.sedang,u=new Pe;u.name="bala-tentara";const h=performance.now(),d=[],f=lS(n,s,d),g=Su(d,zp),x=Js.map(()=>0);for(let D=0;D<c.count;D++)x[c.type[D]]++;const m=f.map((D,P)=>{const q=bu(D.data),j=Math.max(1,Math.min(x[P],l.near+64)),ht=new Ln(new Float32Array(j*4),4).setUsage(In);q.setAttribute("aAnimA",ht),q.setAttribute("aAnimB",new Ln(new Float32Array(j*4),4));const lt=new qn({map:D.map});lt.onBeforeCompile=yt=>oa(yt,g);const Mt=new Ss(q,lt,j);return Mt.name=`prajurit-${D.id}`,Mt.instanceMatrix.setUsage(In),Mt.frustumCulled=!1,Mt.castShadow=!1,Mt.receiveShadow=!1,Mt.count=0,u.add(Mt),{mesh:Mt,anim:ht,type:D,cap:j}}),p=performance.now(),M=hS(r,m.filter(D=>!D.type.always),a,l.cell),v=performance.now(),_=new Float32Array(c.count*3),S=new Float32Array(c.count*2);for(let D=0;D<c.count;D++)_[D*3]=c.x[D],_[D*3+1]=i.heightAt(c.x[D],c.z[D]),_[D*3+2]=c.z[D],S[D*2]=c.type[D],S[D*2+1]=o.heading;const T=new Ln(_,3),L=new Ln(S,2),G=new bn(1,1),E=new El;E.index=G.index,E.setAttribute("position",G.attributes.position),E.setAttribute("uv",G.attributes.uv),E.setAttribute("aPos",T),E.setAttribute("aInfo",L),E.instanceCount=o.total;const A=o.bounds,U=new hn(new V((A.x0+A.x1)/2,_[1]+2,(A.z0+A.z1)/2),Math.hypot(A.x1-A.x0,A.z1-A.z0)/2+6);E.boundingSphere=U;const Y={uCamPos:{value:new V},uCamRight:{value:new V(1,0,0)},uCamUp:{value:new V(0,1,0)},uLod:{value:new ae(1e9,1e9,0,0)},uType:{value:Js.map((D,P)=>new ae(D.size,D.center,P*M.per,0))},uAtlas:{value:new ae(Wr,M.rows,Vr,0)},uPitch:{value:new V(gs.first,gs.step,gs.count)}},X=new Xe({map:M.texture,alphaToCoverage:!0});X.onBeforeCompile=D=>{Object.assign(D.uniforms,Y),D.vertexShader=fS+D.vertexShader.replace("#include <uv_vertex>",`
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
      `),D.fragmentShader=`varying vec4 vUvA;
varying vec4 vUvB;
varying vec2 vW;
`+D.fragmentShader.replace("#include <map_fragment>",`
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
      `)},e.level!=="rendah"&&(X.defines={IMPOSTOR_BLEND:""});const J=new ie(E,X);J.name="prajurit-impostor",u.add(J);const b=new bn(2,2).rotateX(-Math.PI/2),z=new El;z.index=b.index,z.setAttribute("position",b.attributes.position),z.setAttribute("aPos",T),z.setAttribute("aInfo",L),z.instanceCount=c.count,z.boundingSphere=U;const N={value:Js.map(D=>new Ct(...D.blob))},y=new Xe({color:0,transparent:!0,opacity:.32,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});y.onBeforeCompile=D=>{D.uniforms.uBlob=N,D.vertexShader=`attribute vec3 aPos;
attribute vec2 aInfo;
uniform vec2 uBlob[6];
varying vec2 vBlob;
`+D.vertexShader.replace("#include <begin_vertex>",`
        vec2 bs = uBlob[int(aInfo.x + 0.5)];
        float c = cos(aInfo.y);
        float s = sin(aInfo.y);
        vec2 l = vec2(position.x * bs.x, position.z * bs.y);
        vec3 transformed = aPos + vec3(l.x * c + l.y * s, 0.04, -l.x * s + l.y * c);
        vBlob = position.xz;
      `),D.fragmentShader=`varying vec2 vBlob;
`+D.fragmentShader.replace("#include <opaque_fragment>",`diffuseColor.a *= 1.0 - smoothstep(0.2, 1.0, dot(vBlob, vBlob));
#include <opaque_fragment>`)};const B=new ie(z,y);B.name="prajurit-bayangan",B.renderOrder=1,u.add(B);const O=8,k=o.bounds.x0-4,R=o.bounds.z0-4,H=Math.ceil((o.bounds.x1+4-k)/O),I=Math.ceil((o.bounds.z1+4-R)/O),C=new Int32Array(H*I+1),Z=D=>Math.floor((c.x[D]-k)/O)+Math.floor((c.z[D]-R)/O)*H;for(let D=0;D<c.count;D++)C[Z(D)+1]++;for(let D=0;D<H*I;D++)C[D+1]+=C[D];const Q=C.slice(0,H*I),et=new Int32Array(c.count);for(let D=0;D<c.count;D++)et[Q[Z(D)]++]=D;const gt=new Int32Array(4096),xt=new Float32Array(4096),K=new Int32Array(4096),$=new Int32Array(l.near+64);let rt=0,F=0;const dt=new V,At=new V(ar,ar,ar);function ft(D,P,q){F+=D,P.updateMatrixWorld();const j=P.matrixWorld.elements;Y.uCamRight.value.set(j[0],j[1],j[2]),Y.uCamUp.value.set(j[4],j[5],j[6]),Y.uCamPos.value.set(j[12],j[13],j[14]);const ht=Math.max(A.x0-j[12],0,j[12]-A.x1),lt=Math.max(A.z0-j[14],0,j[14]-A.z1);B.visible=ht*ht+lt*lt<120*120;let Mt=0;const yt=l.reach,wt=j[12],kt=j[13],St=j[14],Et=l.view*l.view,Nt=Math.max(0,Math.floor((q.x-yt-k)/O)),It=Math.min(H-1,Math.floor((q.x+yt-k)/O)),Lt=Math.max(0,Math.floor((q.z-yt-R)/O)),qt=Math.min(I-1,Math.floor((q.z+yt-R)/O));for(let Wt=Lt;Wt<=qt;Wt++)for(let tt=Nt;tt<=It;tt++){const Pt=tt+Wt*H;for(let vt=C[Pt];vt<C[Pt+1]&&Mt<gt.length;vt++){const bt=et[vt];if(bt>=o.total)continue;const nt=c.x[bt]-q.x,_t=c.z[bt]-q.z,Tt=nt*nt+_t*_t;if(Tt>yt*yt)continue;const Ft=c.x[bt]-wt,Qt=_[bt*3+1]+1-kt,Yt=c.z[bt]-St;Ft*Ft+Qt*Qt+Yt*Yt>Et||(gt[Mt]=bt,xt[Mt]=Tt,Mt++)}}let jt=yt*yt;if(rt=0,Mt>l.near){for(let tt=0;tt<Mt;tt++)K[tt]=tt;const Wt=K.subarray(0,Mt).sort((tt,Pt)=>xt[tt]-xt[Pt]);jt=xt[Wt[l.near-1]];for(let tt=0;tt<Mt&&rt<$.length;tt++)xt[tt]<=jt&&($[rt++]=gt[tt])}else for(let Wt=0;Wt<Mt;Wt++)$[rt++]=gt[Wt];Y.uLod.value.set(q.x,q.z,rt?jt*.999:0,Et*.999);for(const Wt of m)Wt.mesh.count=0;for(let Wt=o.total;Wt<c.count;Wt++)w(Wt);for(let Wt=0;Wt<rt;Wt++)w($[Wt]);for(const Wt of m)Wt.mesh.count&&(Wt.mesh.instanceMatrix.needsUpdate=!0,Wt.anim.needsUpdate=!0)}function w(D){const P=m[c.type[D]];if(P.mesh.count>=P.cap)return;const q=P.mesh.count++;dt.set(c.x[D],_[D*3+1],c.z[D]),P.mesh.setMatrixAt(q,Zi.compose(dt,_s.setFromAxisAngle(ca,o.heading),At)),So(P.type.clip,F+c.phase[D]*7.3,P.anim.array,q*4),P.anim.array[q*4+3]=0}const st=vi.map((D,P)=>({id:D.id,name:D.name,count:x[P]})),ut={rangka:Math.round(p-h),atlas:Math.round(v-p),sisanya:Math.round(performance.now()-v)};return{object:u,update:ft,atlas:M,stats:()=>({total:o.total,perwira:x[5],pasukan:st,dekat:rt,impostor:o.total-rt,atlas:`${M.target.width}×${M.target.height}`,waktu:ut}),soldier:D=>({x:c.x[D],z:c.z[D],type:Js[c.type[D]].id}),count:c.count}}function pS(i){const t=i.scene.getObjectByName("kuda"),e=i.scene.getObjectByName("shield-rectangle");return{horse:t,shieldRect:cS(e,i.scene)}}const Qs=bp.find(i=>i.id==="agung"),mS=(Qs.from+Qs.to)/2,Dp=(i,t)=>Math.abs(t-Qs.at)<Qs.width&&i>Qs.from-12&&i<Qs.to+12;function td(i,t){if(Dp(i,t))return i<mS;for(const e of Ar)if(ha(e,i,t)<1.08)return!0;return!1}function gS(i,t){if(Dp(i,t))return"agung";if(xs(i,t,Se,2))return"kota";if(xs(i,t,Mn,30))return"wira";let e="kencana",n=1/0;for(const s of Ar){const r=ha(s,i,t);r<n&&(n=r,e=s.id)}return e}const Ec=2.3,Rc=.35,xS=1.4,_S=3.6,ed=.2,us={ronda:1.15,kembali:1.6,lari:4,kejar:4.4},Cc=9,nd=1,id=30,sd={hit:.24,dur:.42},rd={rendah:40,sedang:64,tinggi:96},ad={kota:.28,wira:.22,kencana:.2,agung:.08,sawah:.08,nelayan:.07,pura:.07},vS=[{id:"jaga",weapon:"tombak",dye:[1,6],hp:10,reach:1.9,damage:4},{id:"tombak",weapon:"tombak",dye:[5,4],hp:8,reach:1.9,damage:4},{id:"pedang",weapon:"pedang",dye:[1,4],hp:9,reach:1.45,damage:5}],Pc=(i,t)=>[(i+.5)/8,(t+.5)/8],no={kayu:Pc(6,6),besi:Pc(3,6),emas:Pc(2,4)};function yS(i){const t={5:"idle"},e={4:"holding-left",5:"holding-right"},n=i==="tombak"?t:e;return{idle:{clip:"idle",hold:i==="tombak"?{}:e},walk:{clip:"walk",hold:n},sprint:{clip:"sprint",hold:n},attack:{clip:"attack-melee-right",hold:i==="tombak"?{}:{4:"holding-left"},loop:!1},die:{clip:"die",loop:!1},yes:{clip:"emote-yes",hold:n,loop:!1},no:{clip:"emote-no",hold:n,loop:!1},stop:{clip:"interact-left",hold:i==="tombak"?t:{5:"holding-right"},loop:!1}}}const kp=new Ot,od=new _e,MS=new V(0,1,0);function bS(i,[t,e]){for(let n=0;n<i.uv.length;n+=2){const s=Math.floor(i.uv[n]*8),r=Math.floor(i.uv[n+1]*8);s===4&&(r===4||r===5)&&(i.uv[n]=(t+.5)/8,i.uv[n+1]=(e+(r-4)+.5)/8)}}function SS(i,t,e){var c;const n=Do(i.model),s=[];n.traverse(l=>{l.isSkinnedMesh&&s.push(l)});const{map:r}=s[0].material;let a=null;(c=i.model.userData.sword)==null||c.traverse(l=>{!a&&l.isMesh&&(a=l)});const o=(l,u,h)=>new V(h===5?-.265:.265,0,.068).applyMatrix4(l.boneInverses[h].clone().invert()).applyMatrix4(ii(e,u,h));return vS.map(l=>{const u=aa(n,i.clips,e,yS(l.weapon)),{row:h}=u.table.idle,d=rr(s);l.dye&&bS(d,l.dye);const f=o(u.skeleton,h,5);if(l.weapon==="tombak"){const g=Math.max(.02,f.y-.42);Ce(d,new Ne(.017,.017,f.y+1.05-g,5).translate(f.x,(g+f.y+1.05)/2,f.z),e,h,5,no.kayu),Ce(d,new ys(.045,.18,4).translate(f.x,f.y+1.14,f.z),e,h,5,no.besi),Ce(d,new Ne(.03,.03,.04,5).translate(f.x,f.y+1.04,f.z),e,h,5,no.emas)}else{if(a){const m=a.geometry.clone();m.applyMatrix4(kp.makeRotationX(Math.PI-.25)),m.translate(f.x,f.y+.02,f.z),Ce(d,m,e,h,5,null)}const g=o(u.skeleton,h,4),x=t?t.clone().scale(1.3,1.3,1.3):new Yn(.3,.38,.04);x.translate(g.x+.02,g.y-.18,g.z+.07),Ce(d,x,e,h,4,t?null:no.kayu)}return{...l,data:d,table:u.table,map:r}})}function AS(i,t){const e=[],{army:n}=i;if(n){const a=Mn.z0-10,o=Mn.x0-7,c=Mn.x1+7,l=n.lanes.slice(-2),u=Math.max(...l.map(h=>Math.max(h[1],h[3])))+5;for(const[h,d,,f]of l)e.push([h,a,h,Math.min(d,f)],[h,Math.min(d,f),h,u]);e.push([o,u,c,u])}const s=Ip([...i.roads,...i.paths,...e]),{nodes:r}=s;for(let a=0;a<6;a++){const o=new Int32Array(r.length).fill(-1),c=[];for(const h of r){if(o[h.id]>=0)continue;const d=c.length;let f=0;const g=[h];for(o[h.id]=d;g.length;){const x=g.pop();f++;for(const m of x.links)o[m.id]<0&&(o[m.id]=d,g.push(m))}c.push(f)}if(c.length<2)break;const l=c.indexOf(Math.max(...c));let u=!1;for(let h=0;h<c.length;h++){if(h===l)continue;let d=null;for(const f of r)if(o[f.id]===h)for(const g of r){if(o[g.id]!==l)continue;const x=Math.hypot(f.x-g.x,f.z-g.z);x<16&&(!d||x<d.d)&&t.lineClear(f.x,f.z,g.x,g.z)&&(d={a:f,b:g,d:x})}d&&(d.a.links.push(d.b),d.b.links.push(d.a),d.a.w.set(d.b.id,3),d.b.w.set(d.a.id,3),u=!0)}if(!u)break}return s}const io=(i,t,e)=>i+Math.atan2(Math.sin(t-i),Math.cos(t-i))*e;function wS({ground:i,colliders:t,nav:e,plan:n,spots:s,quality:r,soldier:a,shieldRect:o}){const c=new Pe;c.name="prajurit-bertugas";const l=[],u=SS(a,o,l),h=Su(l,7),d=AS(n,e),f=new Map,g=(w,st)=>w.id<st.id?w.id*4096+st.id:st.id*4096+w.id,x={};for(const w of d.nodes)for(const st of w.links){if(w.id>st.id)continue;const ut=gS((w.x+st.x)/2,(w.z+st.z)/2);f.set(g(w,st),ut),(x[ut]||(x[ut]=[])).push([w,st,Math.hypot(st.x-w.x,st.z-w.z)])}const m=[];function p(w,st,ut,D,P){const q=u[w],j={id:m.length,type:w,x:st,z:ut,y:i.surfaceAt(st,ut),heading:D,state:"jaga",order:null,arrived:!1,hp:q.hp,maxHp:q.hp,flash:0,kx:0,kz:0,stagger:0,barT:0,atkCd:Math.random(),atk:null,clip:"idle",t:Math.random()*2,prev:null,prevT:0,fade:0,animSpeed:1,path:null,navT:0,goalX:0,goalZ:0,moved:0,downT:0,waitT:0,...P};return m.push(j),j}for(const w of s)w.role==="penjaga"&&p(0,w.x,w.z,w.rot,{kind:"pos",home:{x:w.x,z:w.z,rot:w.rot},squad:null,slot:0});const M=Math.floor((rd[r.level]??rd.sedang)/2),v=Object.keys(ad).filter(w=>{var st;return(st=x[w])==null?void 0:st.length}),_=Object.fromEntries(v.map(w=>[w,1]));let S=M-v.length;const T=v.map(w=>({z:w,v:ad[w]*M-1}));for(;S>0;)T.sort((w,st)=>st.v-w.v),_[T[0].z]++,T[0].v-=1,S--;const L=[];for(const w of v)for(let st=0;st<_[w];st++){const ut=x[w],D=ut.reduce((wt,kt)=>wt+kt[2],0);let P=Math.random()*D,q=ut[0];for(const wt of ut)if(P-=wt[2],P<=0){q=wt;break}const[j,ht,lt]=Math.random()<.5?q:[q[1],q[0],q[2]],Mt={id:L.length,zone:w,from:j,to:ht,len:lt,s:Math.random()*lt,pause:0,wait:0,members:[]};L.push(Mt);const yt=Math.atan2(ht.x-j.x,ht.z-j.z);for(const[wt,kt]of[[1,-1],[2,1]]){const St=p(wt,j.x,j.z,yt,{kind:"ronda",home:null,squad:Mt,slot:kt,state:"ronda",init:!0});Mt.members.push(St)}}const G=u.map(()=>0);for(const w of m)G[w.type]++;const E=u.map((w,st)=>{const ut=bu(w.data),D=Math.max(1,G[st]),P=new Ln(new Float32Array(D*4),4).setUsage(In),q=new Ln(new Float32Array(D*4),4).setUsage(In),j=new Ln(new Float32Array(D),1).setUsage(In);ut.setAttribute("aAnimA",P),ut.setAttribute("aAnimB",q),ut.setAttribute("aFlash",j);const ht=new qn({map:w.map});ht.onBeforeCompile=yt=>{oa(yt,h),yt.vertexShader=`attribute float aFlash;
varying float vFlash;
`+yt.vertexShader.replace("void main() {",`void main() {
  vFlash = aFlash;`),yt.fragmentShader=`varying float vFlash;
`+yt.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vFlash);`)};const lt=new Ss(ut,ht,D);lt.name=`prajurit-${w.id}`,lt.instanceMatrix.setUsage(In),lt.frustumCulled=!1,lt.castShadow=r.shadows,lt.receiveShadow=r.shadows;const Mt=new Co({depthPacking:wo});return Mt.onBeforeCompile=yt=>oa(yt,h),lt.customDepthMaterial=Mt,lt.count=0,c.add(lt),{mesh:lt,animA:P,animB:q,flash:j,table:w.table}}),A=new bn(1,1),U=new Xe({color:"#0d1a2a",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),Y=new Xe({color:"#ffb02e",depthTest:!1,depthWrite:!1,toneMapped:!1}),X=[];for(let w=0;w<10;w++){const st=new Pe,ut=new ie(A,U);ut.scale.set(1.08,.2,1),ut.renderOrder=11;const D=new ie(A,Y);D.renderOrder=12,st.add(ut,D),st.visible=!1,c.add(st),X.push({g:st,fill:D})}function J(w,st,ut=!1){w.clip===st&&!ut||(w.prev=w.clip,w.prevT=w.t,w.fade=ed,w.clip=st,w.t=0)}const b=w=>{var st;return w.t>=(((st=u[w.type].table[w.clip])==null?void 0:st.n)??1)/bo-.02};let z=0;function N(w,st,ut,D,P,q){const j=st-w.x,ht=ut-w.z,lt=Math.hypot(j,ht);if(lt<=P)return w.path=null,!0;if(w.navT-=q,w.navT<=0){w.navT=.6+Math.random()*.4;const Lt=Math.hypot(w.goalX-st,w.goalZ-ut)>3;lt<5||e.lineClear(w.x,w.z,st,ut)?w.path=null:(!w.path||Lt)&&z>0&&(z--,w.path=e.findPath({x:w.x,z:w.z},{x:st,z:ut}),w.goalX=st,w.goalZ=ut,w.path||(w.navT=2))}let Mt=st,yt=ut;if(w.path){for(;w.path.length>1&&Math.hypot(w.path[0].x-w.x,w.path[0].z-w.z)<.8;)w.path.shift();w.path.length&&(Mt=w.path[0].x,yt=w.path[0].z)}const wt=Mt-w.x,kt=yt-w.z,St=Math.hypot(wt,kt)||1,Et=Math.min(D*q,Math.max(0,lt-P)+.01),Nt=w.x+wt/St*Et,It=w.z+kt/St*Et;return i.surfaceAt(Nt,It)>-.6&&(w.x=Nt,w.z=It),w.heading=io(w.heading,Math.atan2(wt,kt),Math.min(1,q*9)),w.moved=D,!1}const y=(w,st,ut,D,P=7)=>{w.heading=io(w.heading,Math.atan2(st-w.x,ut-w.z),Math.min(1,D*P))};function B(w,st){const ut=st.links.filter(q=>f.get(g(st,q))===w.zone),D=ut.filter(q=>q!==w.from),P=D.length?D:ut.length?ut:st.links;return P[Math.floor(Math.random()*P.length)]}function O(w,st,ut){const D=w.members.filter(It=>It.state==="ronda");if(!D.length)return;const P=(w.to.x-w.from.x)/w.len,q=(w.to.z-w.from.z)/w.len;let j=!1;for(const It of D)Math.hypot(ut.x-(It.x+P*.9),ut.z-(It.z+q*.9))<.95&&(j=!0);if(j?(w.wait+=st,w.wait>2.5&&([w.from,w.to]=[w.to,w.from],w.s=w.len-w.s,w.wait=0)):w.wait=0,w.pause>0)w.pause-=st;else if(!j)for(w.s+=us.ronda*st;w.s>=w.len;){const It=w.to,Lt=B(w,It);w.s-=w.len,w.from=It,w.to=Lt,w.len=Math.max(.1,Math.hypot(Lt.x-It.x,Lt.z-It.z)),Math.random()<.1&&(w.pause=3+Math.random()*4)}const ht=w.pause<=0&&!j,lt=(w.to.x-w.from.x)/w.len,Mt=(w.to.z-w.from.z)/w.len,yt=Math.min(1,w.s/w.len),wt=w.from.x+(w.to.x-w.from.x)*yt,kt=w.from.z+(w.to.z-w.from.z)*yt,St=w.from.w.get(w.to.id)??4,Et=Math.min(.75,Math.max(.35,St/2-.6)),Nt=1-Math.exp(-5*st);for(const It of D){const Lt=wt-Mt*Et*It.slot,qt=kt+lt*Et*It.slot;It.init&&(It.x=Lt,It.z=qt,It.heading=Math.atan2(lt,Mt),It.init=!1),It.x+=(Lt-It.x)*Nt,It.z+=(qt-It.z)*Nt,ht&&(It.heading=io(It.heading,Math.atan2(lt,Mt),Math.min(1,st*5))),It.moved=ht?us.ronda:0}}function k(w,st){const ut=(w.to.x-w.from.x)/w.len,D=(w.to.z-w.from.z)/w.len,P=Math.min(1,w.s/w.len);return{x:w.from.x+(w.to.x-w.from.x)*P-D*.6*st,z:w.from.z+(w.to.z-w.from.z)*P+ut*.6*st}}let R=()=>{},H=()=>{};function I(w,st){if(w.hp=0,w.state="roboh",w.order=null,w.atk=null,w.downT=0,w.path=null,st){const ut=w.x-st.x,D=w.z-st.z,P=Math.hypot(ut,D)||1;w.kx=ut/P*3,w.kz=D/P*3}J(w,"die",!0),H(w)}function C(w,st,ut,D=2.5){if(!(w.state==="roboh"||w.state==="hilang")){if(w.hp-=st,w.flash=.15,w.barT=5,w.stagger=.3,w.atk=null,ut){const P=w.x-ut.x,q=w.z-ut.z,j=Math.hypot(P,q)||1;w.kx=P/j*D,w.kz=q/j*D}w.hp<=0&&I(w,ut)}}function Z(w){w.state==="roboh"||w.state==="hilang"||(w.order=null,w.atk=null,w.arrived=!1,w.path=null,w.state="kembali")}function Q(w,st){let ut;return w.kind==="pos"?ut=w.home:ut=w.squad.members.find(P=>P!==w&&P.state==="ronda")?k(w.squad,w.slot):{x:w.squad.from.x,z:w.squad.from.z},Math.hypot(ut.x-st.x,ut.z-st.z)<45?!1:(w.x=ut.x,w.z=ut.z,w.hp=w.maxHp,w.kx=w.kz=0,w.flash=w.barT=0,w.state="kembali",w.clip="idle",w.fade=0,w.t=0,!0)}function et(w,st,ut){if(w.moved=0,w.flash>0&&(w.flash=Math.max(0,w.flash-st)),w.barT>0&&(w.barT-=st),w.atkCd>0&&(w.atkCd-=st),w.state==="hilang"){w.downT+=st,w.downT>id&&!Q(w,ut.player)&&(w.downT=id-5);return}if(w.state==="roboh"){w.downT+=st;const j=Math.exp(-6*st);w.x+=w.kx*st,w.z+=w.kz*st,w.kx*=j,w.kz*=j,w.downT>Cc+nd&&(w.state="hilang",w.downT=0);return}if(Math.abs(w.kx)+Math.abs(w.kz)>.05){const j=w.x+w.kx*st,ht=w.z+w.kz*st;i.surfaceAt(j,ht)>-.6&&(w.x=j,w.z=ht);const lt=Math.exp(-7*st);w.kx*=lt,w.kz*=lt}if(w.stagger>0){w.stagger-=st;return}const D=w.state;if(D==="jaga"){const j=w.home;Math.hypot(ut.player.x-w.x,ut.player.z-w.z)<5&&ut.playerVisible?y(w,ut.player.x,ut.player.z,st,5):w.heading=io(w.heading,j.rot,Math.min(1,st*3));return}if(D==="ronda")return;if(D==="kembali"){const j=w.kind==="pos"?w.home:k(w.squad,w.slot);N(w,j.x,j.z,us.kembali,.4,st)&&(w.kind==="pos"?w.state="jaga":(w.state="ronda",w.init=!1));return}const P=w.order,q=P?ut.targetPos(P.target):null;if(!q){Z(w);return}if(D==="cegat"){w.arrived=N(w,q.x,q.z,us.lari,P.near??2.3,st),w.arrived&&y(w,q.x,q.z,st);return}if(D==="tanya"||D==="awasi"){const j=Math.atan2(w.x-q.x,w.z-q.z)+(D==="awasi"?P.side??.9:0),ht=P.near??(D==="tanya"?2:2.6),lt=q.x+Math.sin(j)*ht,Mt=q.z+Math.cos(j)*ht;if(!N(w,lt,Mt,us.kembali,.35,st))return;y(w,q.x,q.z,st);return}if(D==="serang"){const j=u[w.type],ht=q.x-w.x,lt=q.z-w.z,Mt=Math.hypot(ht,lt);if(w.atk){const{atk:wt}=w;y(w,q.x,q.z,st,10),wt.t+=st,!wt.hit&&wt.t>=sd.hit&&(wt.hit=!0,Mt<=j.reach+.5&&R(w,P.target,j.damage)),wt.t>=sd.dur&&w.atk===wt&&(w.atk=null);return}const yt=j.reach*.8;Mt>yt+.15?N(w,q.x,q.z,Mt>6?us.kejar:us.kembali,yt,st):(y(w,q.x,q.z,st,10),Mt<.75&&Mt>.001&&(w.x-=ht/Mt*(.75-Mt),w.z-=lt/Mt*(.75-Mt)),w.atkCd<=0&&(w.atk={t:0,hit:!1},w.atkCd=1.8+Math.random()*.8,J(w,"attack",!0)))}}const gt=new vr,xt=new Ot,K=new hn(new V,1.7),$=new V,rt=new V(Ec,Ec,Ec),F={x:0,z:0};let dt=0;function At(w,st){z=2;for(const j of L)O(j,w,st.player);for(const j of m)et(j,w,st);for(const j of m){if(j.state==="hilang"||j.state==="roboh"||j.state==="ronda"||j.state==="jaga")continue;for(const yt of m){if(yt===j||yt.state==="hilang"||yt.state==="roboh")continue;const wt=j.x-yt.x,kt=j.z-yt.z,St=wt*wt+kt*kt;if(St>.49||St<1e-8)continue;const Et=Math.sqrt(St);j.x+=wt/Et*(.7-Et)*.5,j.z+=kt/Et*(.7-Et)*.5}const ht=j.x-st.player.x,lt=j.z-st.player.z,Mt=Math.hypot(ht,lt);Mt<.72&&Mt>1e-4&&(j.x=st.player.x+ht/Mt*.72,j.z=st.player.z+lt/Mt*.72),F.x=F.z=0,t.resolve(j,Rc,F)}for(const j of m)j.state!=="hilang"&&(j.state!=="roboh"&&!j.atk&&j.clip!=="stop"&&j.clip!=="yes"&&j.clip!=="no"?j.moved>2.4?J(j,"sprint"):j.moved>.05?J(j,"walk"):J(j,"idle"):(j.clip==="stop"||j.clip==="yes"||j.clip==="no")&&b(j)&&J(j,"idle"),j.animSpeed=j.clip==="walk"?j.moved/xS:j.clip==="sprint"?j.moved/_S:1,j.t+=w*j.animSpeed,j.fade>0&&(j.fade=Math.max(0,j.fade-w),j.prevT+=w));const{camera:ut,focus:D}=st,P=(st.range??110)**2;ut.updateMatrixWorld(),xt.multiplyMatrices(ut.projectionMatrix,ut.matrixWorldInverse),gt.setFromProjectionMatrix(xt);for(const j of E)j.mesh.count=0;dt=0;let q=0;for(const j of m){if(j.state==="hilang")continue;const ht=j.x-D.x,lt=j.z-D.z;if(ht*ht+lt*lt>P)continue;j.y=i.surfaceAt(j.x,j.z);let{y:Mt}=j;if(j.state==="roboh"&&j.downT>Cc&&(Mt-=(j.downT-Cc)/nd*.9),K.center.set(j.x,Mt+.8,j.z),!gt.intersectsSphere(K))continue;const yt=E[j.type],wt=yt.mesh.count++;$.set(j.x,Mt,j.z),od.setFromAxisAngle(MS,j.heading),yt.mesh.setMatrixAt(wt,kp.compose($,od,rt));const kt=yt.animA.array;if(So(yt.table[j.clip]||yt.table.idle,j.t,kt,wt*4),kt[wt*4+3]=j.fade>0?j.fade/ed:0,j.fade>0&&So(yt.table[j.prev]||yt.table.idle,j.prevT,yt.animB.array,wt*4),yt.flash.array[wt]=j.flash>0?j.flash/.15*.75:0,dt++,j.barT>0&&j.state!=="roboh"&&q<X.length&&ht*ht+lt*lt<3600){const St=X[q++];St.g.visible=!0,St.g.position.set(j.x,Mt+2.05,j.z),St.g.quaternion.copy(ut.quaternion);const Et=Math.max(0,j.hp/j.maxHp);St.fill.scale.set(Et,.13,1),St.fill.position.x=-(1-Et)/2}}for(let j=q;j<X.length;j++)X[j].g.visible=!1;for(const j of E)j.mesh.count&&(j.mesh.instanceMatrix.needsUpdate=!0,j.animA.needsUpdate=!0,j.animB.needsUpdate=!0,j.flash.needsUpdate=!0)}const ft=w=>w.state!=="roboh"&&w.state!=="hilang";return{object:c,list:m,squads:L,routes:d,types:u,stats(){const w={};for(const st of L)w[st.zone]=(w[st.zone]||0)+st.members.length;return{total:m.length,pos:m.filter(st=>st.kind==="pos").length,peronda:m.filter(st=>st.kind==="ronda").length,wilayah:w,siaga:m.filter(st=>ft(st)).length,roboh:m.filter(st=>!ft(st)).length,bertugas:m.filter(st=>st.state==="ronda"||st.state==="jaga").length,visible:dt}},update:At,alive:ft,onStrike(w){R=w},onDown(w){H=w},command(w,st){var ut;ft(w)&&((w.state!==st.do||((ut=w.order)==null?void 0:ut.target)!==st.target)&&(w.arrived=!1),w.order=st,w.state=st.do,st.do!=="serang"&&(w.atk=null))},release:Z,gesture(w,st){ft(w)&&!w.atk&&J(w,st,!0)},nearest(w,st,ut,D=()=>!0){let P=null,q=ut;for(const j of m){if(!ft(j)||!D(j))continue;const ht=Math.hypot(j.x-w,j.z-st);ht<q&&(P=j,q=ht)}return P},hit(w,st,ut,D){const P=[];for(const q of m)ft(q)&&(Math.hypot(q.x-w.x,q.z-w.z)>w.r+Rc||(P.push(q),C(q,st,D,ut)));return P},damage:C,knockDown:I,pushOut(w,st=.35){for(const ut of m){if(!ft(ut))continue;const D=w.x-ut.x,P=w.z-ut.z,q=st+Rc,j=D*D+P*P;if(j>=q*q||j<1e-8)continue;const ht=Math.sqrt(j);w.x=ut.x+D/ht*q,w.z=ut.z+P/ht*q}},resetAll(){for(const w of m){if(w.hp=w.maxHp,w.flash=w.barT=w.stagger=0,w.order=null,w.atk=null,w.path=null,w.kind==="pos")w.x=w.home.x,w.z=w.home.z,w.state="jaga";else{const st=k(w.squad,w.slot);w.x=st.x,w.z=st.z,w.state="ronda"}J(w,"idle",!0),w.fade=0}}}}const TS=40,ES=.5,cd=3,ld=40,RS=80,CS=30,PS=25,IS=20,LS=100,Ic=[150,210],gi={first:35,every:[60,110],speed:1.4,shop:[18,30]},zS=["Saya pedagang kain dari Pulau Tropis, mau berjualan di pasar.","Saya mau mengantar ikan asin ke pasar kota.","Saya hendak menjenguk saudara di Kampung Nelayan.","Saya membawa kelapa muda untuk dijual di pasar."],hs="Prajurit Kencana",Xs=i=>i[Math.floor(Math.random()*i.length)],wn={kind:"pemain"},ud={pengembara:"Baiklah, pengembara. Kamu boleh masuk. Jangan membuat keributan!",raja:"Sang Raja bersemayam di Keraton, di tengah Kotaraja. Silakan, tapi kami mengawasimu.",orc:"Pemburu orc? Bagus! Gerombolan orc kadang menyerbu lewat Jembatan Agung. Selamat datang!",kembali:"Silakan masuk.",maaf:"Baiklah. Sekali lagi berbuat onar, kami tidak akan segan."};function DS({soldiers:i,enemies:t,player:e,dialog:n,bubbles:s,message:r,setInput:a,villagers:o=null,visit:c=null,ground:l=null}){const u={status:"asing",record:0,visits:0,inside:!1,outsideT:0,cooldown:0,chaseT:0,scanT:0,greetT:0,raidT:LS,raids:0};let h=0,d=null;const f=[],g=new Map,x=[];let m=!1,p=!0;const M=(R,H)=>x.push({t:R,fn:H}),v=R=>R.state==="ronda"||R.state==="jaga"||R.state==="kembali",_=(R,H,I=2600)=>s.say(()=>i.alive(R)?{x:R.x,y:R.y+2.2,z:R.z}:null,H,I,`p${R.id}`),S=e.position;function T(R){return R===wn?e.defeated?null:S:R.kind==="orc"?t?t.position(R.id):null:R.kind==="orang"?R.ref.gone?null:R.ref:null}i.onStrike((R,H,I)=>{H===wn?e.damage(I,R):H.kind==="orc"&&(t==null||t.damage(H.id,3,R))});function L(){n.close(),a(!0),d=null}function G(R,H){d={lead:R,partner:H,reason:null},f.length=0,e.stop(),e.face(R.x,R.z),a(!1),i.command(R,{do:"tanya",target:wn,near:2.1}),i.gesture(R,"stop"),H&&i.command(H,{do:"awasi",target:wn,near:2.9,side:1.2}),_(R,"Berhenti!",1800),u.record>0?n.open({name:hs,text:"Kamu lagi! Kali ini jangan membuat onar. Mau apa kamu ke sini?",options:[{text:"Aku minta maaf. Aku datang dengan damai.",value:"maaf"},{text:"Aku belum selesai denganmu!",value:"kasar"},{text:"Aku tidak jadi masuk.",value:"pergi"}],onChoose:A}):u.visits>0?n.open({name:hs,text:"Kamu lagi, pengembara dari Pulau Tropis. Ada perlu apa kali ini?",options:[{text:"Hanya lewat. Aku datang dengan damai.",value:"kembali"},{text:"Bukan urusanmu!",value:"kasar"}],onChoose:A}):n.open({name:hs,text:"Berhenti! Siapa kamu? Ada keperluan apa datang ke Kerajaan Kencana?",options:[{text:"Aku pengembara dari Pulau Tropis. Aku datang dengan damai.",value:"pengembara"},{text:"Aku ingin menghadap Sang Raja.",value:"raja"},{text:"Aku pemburu orc. Aku datang untuk membantu.",value:"orc"},{text:"Bukan urusanmu! Minggir!",value:"kasar"},{text:"Maaf, aku tidak jadi masuk.",value:"pergi"}],onChoose:I=>I==="pengembara"||I==="raja"||I==="orc"?E(I):A(I)})}function E(R){d.reason=R,i.gesture(d.lead,"no"),n.open({name:hs,text:"Pedang itu untuk apa? Senjata tidak boleh dipakai sembarangan di wilayah kerajaan.",options:[{text:"Hanya untuk melawan orc dan menjaga diri.",value:R},{text:"Untuk menebas siapa pun yang menghalangiku!",value:"kasar"}],onChoose:A})}function A(R){if(!d)return;const{lead:H,partner:I}=d;R==="kasar"?n.open({name:hs,text:"Lancang! Prajurit, tangkap penyusup ini!",options:[{text:"Bersiap bertarung!",value:"ok"}],onChoose:()=>{L(),i.gesture(H,"no"),U(H,"Penyusup! Serang!"),I&&_(I,"Tangkap dia!")}}):R==="pergi"?n.open({name:hs,text:"Kalau begitu, kembalilah ke Pulau Tropis.",options:[{text:"Pergi.",value:"ok"}],onChoose:()=>{L(),u.cooldown=15,i.gesture(H,"no"),_(H,"Jangan kembali tanpa keperluan!"),M(1.2,()=>{i.release(H),I&&i.release(I)})}}):n.open({name:hs,text:ud[R]??ud.pengembara,options:[{text:"Terima kasih.",value:"ok"}],onChoose:()=>{L(),u.status="tamu",u.visits++,i.gesture(H,"yes"),_(H,"Silakan lewat."),M(1.6,()=>{i.release(H),I&&i.release(I)})}})}function U(R,H){d&&L(),f.length=0,u.status!=="musuh"&&u.record++,u.status="musuh",u.scanT=0,R&&_(R,H),r("Prajurit Kencana menyerangmu! Lawan, atau lari keluar dari wilayah kerajaan.",3600)}function Y(R){var H;u.status="asing";for(const I of i.list)((H=I.order)==null?void 0:H.target)===wn&&i.release(I);f.length=0,R&&r(R,3e3)}function X(R){var C;if(e.defeated)return;let H=0;for(const Z of i.list)i.alive(Z)&&Z.state==="serang"&&((C=Z.order)==null?void 0:C.target)===wn&&H++;if(H>=cd||(u.scanT-=R,u.scanT>0))return;u.scanT=.4,i.list.filter(Z=>{var Q;return i.alive(Z)&&(v(Z)||((Q=Z.order)==null?void 0:Q.target)===wn&&Z.state!=="serang")}).map(Z=>({a:Z,d:Math.hypot(Z.x-S.x,Z.z-S.z)})).filter(Z=>Z.d<(u.inside?ld:ld*.6)).sort((Z,Q)=>Z.d-Q.d).slice(0,cd-H).forEach(({a:Z},Q)=>{i.command(Z,{do:"serang",target:wn}),Q===0&&_(Z,Xs(["Kepung dia!","Jangan biarkan lolos!","Bantu! Ada penyusup!","Serang!"]))})}function J(R){if(u.greetT-=R,u.greetT>0)return;u.greetT=1;const H=i.nearest(S.x,S.z,3.2,I=>I.state==="ronda"||I.state==="jaga");!H||(H.greetAt??-1e9)>h-60||(H.greetAt=h,u.greetT=8,_(H,Xs(["Selamat datang di Kencana.","Salam, pengembara.","Jaga sikapmu, ya.","Hati-hati di jalan."])))}function b(R){if(d||e.defeated)return;for(let C=f.length-1;C>=0;C--)(!i.alive(f[C])||f[C].state!=="cegat")&&f.splice(C,1);if(!u.inside){if(f.length&&u.outsideT>3){for(const C of f)i.release(C);f.length=0}return}if(u.cooldown>0)return;if(!f.length){if(u.scanT-=R,u.scanT>0)return;u.scanT=ES;const C=i.nearest(S.x,S.z,TS,v);if(!C)return;f.push(C),i.command(C,{do:"cegat",target:wn,near:2.2}),_(C,u.record?"Kamu lagi! Berhenti di situ!":"Hei, kamu! Berhenti!");const Z=i.nearest(C.x,C.z,25,Q=>v(Q)&&Q!==C);Z&&(f.push(Z),i.command(Z,{do:"cegat",target:wn,near:3.4})),u.chaseT=0;return}u.chaseT+=R;const H=f[0],I=Math.hypot(H.x-S.x,H.z-S.z);H.arrived&&I<3&&!e.attacking&&e.grounded?G(H,f[1]||null):u.chaseT>CS&&U(H,"Dia kabur! Tangkap!")}function z(R){let H=g.get(R);return H||g.set(R,H={kind:"orc",id:R}),H}function N(R){var H;if(t){(p||u.raidT<=0)&&(u.raidT-=R),u.raidT<=0&&!t.raidActive&&(u.raidT=Ic[0]+Math.random()*(Ic[1]-Ic[0]),t.startRaid(S)&&(u.raids++,m=!1));for(const I of t.raiders()){if(!td(I.x,I.z)&&!i.nearest(I.x,I.z,15,v))continue;m||(m=!0,Math.hypot(I.x-S.x,I.z-S.z)<300&&r("Gerombolan orc menyerbu Jembatan Agung! Prajurit Kencana menghadang mereka.",4200));const C=z(I.id);let Z=0;for(const et of i.list)et.state==="serang"&&((H=et.order)==null?void 0:H.target)===C&&Z++;if(Z>=2)continue;const Q=i.nearest(I.x,I.z,RS,v);Q&&(i.command(Q,{do:"serang",target:C}),_(Q,Xs(["Orc menyerbu! Hadang!","Serang orc itu!","Lindungi kerajaan!","Jangan biarkan lewat!"])))}}}const y=(o&&c?o.scripted:[]).map((R,H)=>({a:R,phase:"tunggu",t:gi.first+H*45,path:[],target:{kind:"orang",ref:R},guard:null,asked:0})),B=(R,H,I)=>s.say(()=>R.hidden?null:{x:R.x,y:l.surfaceAt(R.x,R.z)+1.95,z:R.z},H,I,`v${o.agents.indexOf(R)}`);function O(R,H){const{a:I}=R,C=R.path[0];if(!C)return!0;const Z=C.x-I.x,Q=C.z-I.z,et=Math.hypot(Z,Q);if(et<.3)return R.path.shift(),!R.path.length;const gt=Math.min(gi.speed*H,et);return I.x+=Z/et*gt,I.z+=Q/et*gt,I.heading+=Math.atan2(Math.sin(Math.atan2(Z,Q)-I.heading),Math.cos(Math.atan2(Z,Q)-I.heading))*Math.min(1,H*6),o.setClip(I,"walk"),!1}function k(R){var H;for(const I of y){const{a:C}=I,Z=Math.hypot(S.x-c.start.x,S.z-c.start.z)>45;if(I.phase==="tunggu"){if((I.t-=R)>0||!Z)continue;C.hidden=!1,C.x=c.start.x,C.z=c.start.z,C.heading=-Math.PI/2,C.speed=gi.speed,I.path=[{...c.gate}],I.phase="datang"}else if(I.phase==="datang")O(I,R)&&(I.phase="ditanya",I.t=0,I.guard=null,o.setClip(C,"idle"));else if(I.phase==="ditanya"){I.t+=R,!I.guard&&I.t<8&&(I.guard=i.nearest(C.x,C.z,16,et=>et.kind==="pos"&&v(et)),I.guard&&(I.t=0,i.command(I.guard,{do:"tanya",target:I.target,near:1.8}),i.gesture(I.guard,"stop"),_(I.guard,"Berhenti! Siapa kamu dan mau ke mana?",2600)));const Q=I.guard;Q&&(C.heading+=Math.atan2(Math.sin(Math.atan2(Q.x-C.x,Q.z-C.z)-C.heading),Math.cos(Math.atan2(Q.x-C.x,Q.z-C.z)-C.heading))*Math.min(1,R*5),I.t>2.6&&!I.said&&(I.said=!0,I.asked++,B(C,Xs(zS),3200),o.setClip(C,"interact")),I.t>6&&!I.passed&&(I.passed=!0,i.gesture(Q,"yes"),_(Q,Xs(["Silakan lewat. Jaga sikapmu di kota.","Baik, silakan lewat.","Silakan. Pasar ada di dekat alun-alun."]),2600))),I.t>(Q?7.6:8)&&(Q&&((H=Q.order)==null?void 0:H.target)===I.target&&i.release(Q),I.guard=null,I.said=I.passed=!1,I.path=c.market.map(et=>({...et})),I.phase="masuk")}else I.phase==="masuk"?O(I,R)&&(I.phase="belanja",I.t=gi.shop[0]+Math.random()*(gi.shop[1]-gi.shop[0]),o.setClip(C,"interact")):I.phase==="belanja"?(I.t-=R)<=0&&(I.path=[...c.market].reverse().slice(1).map(Q=>({...Q})),I.path.push({...c.gate},{...c.start}),I.phase="pulang"):I.phase==="pulang"&&O(I,R)&&(o.setClip(C,"idle"),Z&&(C.hidden=!0,I.phase="tunggu",I.t=gi.every[0]+Math.random()*(gi.every[1]-gi.every[0])))}}return{targetPos:T,get status(){return u.status},get questioning(){return d!==null},stats:()=>({...u,pengejar:f.length,ditanya:d!==null}),update(R){h+=R;for(let H=x.length-1;H>=0;H--)if((x[H].t-=R)<=0){const[I]=x.splice(H,1);I.fn()}u.inside=!e.defeated&&td(S.x,S.z),u.outsideT=u.inside?0:u.outsideT+R,u.cooldown>0&&(u.cooldown-=R),u.status==="musuh"?u.outsideT>PS?Y("Prajurit Kencana berhenti mengejarmu."):X(R):u.status==="tamu"&&(u.outsideT>IS?u.status="asing":J(R)),u.status==="asing"&&b(R),N(R),y.length&&k(R)},visitors:()=>y.map(R=>({fase:R.phase,ditanya:R.asked,x:R.a.x,z:R.a.z})),visitNow(){const R=y.find(H=>H.phase==="tunggu");R&&(R.t=0)},defend(R,H){const I=z(H);[R,...R.squad?R.squad.members.filter(Z=>Z!==R):[]].forEach((Z,Q)=>{var et,gt;!i.alive(Z)||Z.state==="serang"&&((gt=(et=Z.order)==null?void 0:et.target)==null?void 0:gt.kind)==="orc"||!(v(Z)||Z===R)||(i.command(Z,{do:"serang",target:I}),Q===0&&_(Z,Xs(["Orc! Lawan!","Serang balik!","Hadang orc ini!"])))})},playerStruck(R){if(R.length){u.status!=="musuh"&&U(R[0],"Penyerang! Lawan dia!");for(const H of R)i.alive(H)&&v(H)&&i.command(H,{do:"serang",target:wn})}},playerDefeated(){const R=u.status==="musuh";if(R){const H=i.nearest(S.x,S.z,12,I=>{var C;return((C=I.order)==null?void 0:C.target)===wn});H&&_(H,"Bawa dia keluar dari wilayah kerajaan!",3e3)}return d&&L(),Y(null),R},reset(){d&&L(),Y(null),Object.assign(u,{record:0,visits:0,cooldown:0,chaseT:0,scanT:0})},raid(){u.raidT=0},setRaids(R){p=R}}}const vn=2,kS=[{text:"Pulau Tropis",x:10,z:-175,size:15},{text:"Gunung",x:70,z:-48,size:11},{text:"Kotaraja Kencana",x:-560,z:-78,size:14},{text:"Pulau Kencana",x:-560,z:222,size:13},{text:"Pulau Sawah",x:-660,z:-425,size:13},{text:"Pulau Nelayan",x:-760,z:452,size:13},{text:"Pura Segara",x:-890,z:58,size:12},{text:"Jembatan Agung",x:-252,z:24,size:11},{text:"Pelabuhan",x:-553,z:236,size:11},{text:"Pulau Wira",x:-270,z:620,size:14},{text:"Tegal Wira · 25.000 prajurit",x:-270,z:352,size:11}],Tn=(i,t,e)=>i+(t-i)*e,Lc=i=>Math.min(1,Math.max(0,i));function NS(i,t,e,n){if(xs(i,t,yp))return{id:"keraton",name:"Keraton Kencana",sub:"Istana Raja Kencana"};if(xs(i,t,Se,1))return{id:"kotaraja",name:"Kotaraja Kencana",sub:"Ibu kota Kerajaan Kencana"};if(xs(i,t,Mn))return{id:"tegal",name:"Tegal Wira",sub:"25.000 prajurit Kencana siap tempur"};for(const o of n){const c=o.axis==="x"?i:t,l=o.axis==="x"?t:i;if(Math.abs(l-o.at)<o.width&&c>Math.min(o.a,o.b)&&c<Math.max(o.a,o.b))return{id:`jembatan-${o.id}`,name:o.name,sub:o.id==="agung"?"Penghubung Pulau Tropis dan Kerajaan Kencana":"Kepulauan Kencana"}}if(e.heightAt(i,t)<-1.2)return null;if(Math.hypot(i,t)<340)return{id:"tropis",name:"Pulau Tropis",sub:"Pulau tengah"};let s=null,r=1/0;for(const o of Ar){const c=ha(o,i,t);c<r&&(r=c,s=o)}if(!s||r>1.35)return null;const a={kencana:"Kepulauan Kencana",sawah:"Lumbung padi kerajaan",nelayan:"Kampung nelayan",pura:"Pura di puncak bukit",wira:"Markas bala tentara Kencana"};return{id:s.id,name:s.id==="pura"?"Pura Segara":s.name,sub:a[s.id]}}function US(i,t,e){let n,s,r;if(i<0){const a=Lc(-i/14);n=Tn(86,22,a),s=Tn(205,78,a),r=Tn(200,140,a)}else if(i<2.2)n=226,s=208,r=156;else if(i<40){const a=Lc((i-2.2)/38);n=Tn(104,64,a),s=Tn(168,118,a),r=Tn(72,52,a)}else{const a=Lc((i-40)/40);n=Tn(120,196,a),s=Tn(118,190,a),r=Tn(100,182,a)}if(t){const a=(o,c,l,u)=>{n=Tn(n,c,o),s=Tn(s,l,o),r=Tn(r,u,o)};a(t.rumput,120,196,84),a(t.sawah,168,210,80),a(t.jalan,214,184,132),a(t.batu,214,208,196)}e[0]=n,e[1]=s,e[2]=r}function OS({ground:i,plan:t,region:e,camps:n=[]}){const s=document.getElementById("peta"),r=document.getElementById("peta-kanvas"),a=r.getContext("2d"),o=Math.round(Kt.width/vn),c=Math.round(Kt.depth/vn);let l=null;const u=x=>(x-Kt.minX)/vn,h=x=>(x-Kt.minZ)/vn;function d(){var v;const x=document.createElement("canvas");x.width=o,x.height=c;const m=x.getContext("2d"),p=m.createImageData(o,c),M=[0,0,0];for(let _=0;_<c;_++)for(let S=0;S<o;S++){const T=Kt.minX+(S+.5)*vn,L=Kt.minZ+(_+.5)*vn;US(i.heightAt(T,L),e.at(T,L),M);const G=(_*o+S)*4;p.data[G]=M[0],p.data[G+1]=M[1],p.data[G+2]=M[2],p.data[G+3]=255}m.putImageData(p,0,0),m.fillStyle="rgba(120, 52, 36, 0.85)";for(const _ of t.blocked)m.save(),m.translate(u(_.x),h(_.z)),m.rotate(-(_.rot||0)),m.fillRect(-_.hx/vn,-_.hz/vn,2*_.hx/vn,2*_.hz/vn),m.restore();for(const _ of((v=t.army)==null?void 0:v.blocks)??[])m.fillStyle=vi[_.type].map,m.fillRect(u(_.x0),h(_.z0),(_.x1-_.x0)/vn,(_.z1-_.z0)/vn);m.strokeStyle="#f4efe2",m.lineCap="butt";for(const _ of t.spans)m.lineWidth=Math.max(2,_.width/vn),m.beginPath(),_.axis==="x"?(m.moveTo(u(_.a),h(_.at)),m.lineTo(u(_.b),h(_.at))):(m.moveTo(u(_.at),h(_.a)),m.lineTo(u(_.at),h(_.b))),m.stroke();l=x}function f(x,m,p,M,v){a.font=`600 ${Math.round(M*v)}px system-ui, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.lineWidth=3*v,a.strokeStyle="rgba(0, 30, 45, 0.85)",a.strokeText(x,m,p),a.fillStyle="#fff",a.fillText(x,m,p)}function g(x,m){l||d();const p=r.getBoundingClientRect(),M=Math.min(2,window.devicePixelRatio||1);r.width=Math.round(p.width*M),r.height=Math.round(p.height*M);const v=r.width/o;a.imageSmoothingEnabled=!0,a.drawImage(l,0,0,r.width,r.height);const _=Math.max(.8,r.width/900);for(const A of n)a.fillStyle="#e8483a",a.beginPath(),a.arc(u(A.x)*v,h(A.z)*v,4*_,0,Math.PI*2),a.fill();for(const A of kS)f(A.text,u(A.x)*v,h(A.z)*v,A.size,_);const S=u(x.x)*v,T=h(x.z)*v,L=Math.sin(m),G=Math.cos(m),E=9*_;a.fillStyle="#ffe14a",a.strokeStyle="#1a1206",a.lineWidth=2*_,a.beginPath(),a.moveTo(S+L*E*1.4,T+G*E*1.4),a.lineTo(S-G*E*.8-L*E*.7,T+L*E*.8-G*E*.7),a.lineTo(S-L*E*.25,T-G*E*.25),a.lineTo(S+G*E*.8-L*E*.7,T-L*E*.8-G*E*.7),a.closePath(),a.fill(),a.stroke(),f("Kamu",S,T+17*_,11,_)}return{get open(){return!s.hidden},show(x,m){s.hidden=!1,g(x,m)},hide(){s.hidden=!0},sample(x,m){l||d();const p=l.getContext("2d").getImageData(Math.floor(u(x)),Math.floor(h(m)),1,1).data;return[p[0],p[1],p[2]]},size:{width:o,height:c}}}function FS({ground:i,spans:t}){const e=document.getElementById("wilayah"),n=e.querySelector(".wilayah-nama"),s=e.querySelector(".wilayah-ket");let r,a=null,o=0,c=0,l=0;return{get current(){return r},update(u,h,d=!0){if(c>0&&(c-=u,c<=0&&e.classList.remove("tampil")),(l-=u)>0)return!1;l=.25;const f=NS(h.x,h.z,i,t),g=f?f.id:null;return r===void 0?(r=g,!1):g===(r??null)?(a=null,!1):!a||a.id!==g?(a={id:g,r:f},o=0,!1):(o+=.25,o<.5||(r=g,a=null,!f||!d)?!1:(n.textContent=f.name,s.textContent=f.sub,e.classList.add("tampil"),c=3.2,!0))}}}function BS(i){const t=i.querySelector(".tanya-nama"),e=i.querySelector(".tanya-teks"),n=i.querySelector(".tanya-pilihan");let s=null;const r=a=>{const o=s;if(!o||!o.options[a])return;const{value:c}=o.options[a];s=null,i.hidden=!0,o.onChoose(c)};return window.addEventListener("keydown",a=>{if(!s||a.repeat)return;const o=Number(a.key);o>=1&&o<=s.options.length&&(a.preventDefault(),r(o-1))}),{get isOpen(){return s!==null},get current(){return s},open(a){s=a,t.textContent=a.name,e.textContent=a.text,n.replaceChildren(...a.options.map((o,c)=>{const l=document.createElement("button");return l.type="button",l.innerHTML="<b></b><span></span>",l.firstChild.textContent=`${c+1}`,l.lastChild.textContent=o.text,l.addEventListener("click",()=>r(c)),l})),i.hidden=!1},choose:r,close(){s=null,i.hidden=!0}}}function HS(i,t){const e=[],n=new V;function s(){let r=e.find(a=>!a.anchor);if(!r&&e.length<12){const a=document.createElement("div");a.className="gelembung",a.hidden=!0,i.appendChild(a),r={el:a,anchor:null,t:0,ms:0,key:null},e.push(r)}return r||e.reduce((a,o)=>o.t>a.t?o:a)}return{say(r,a,o=2600,c=null){let l=c!==null?e.find(u=>u.anchor&&u.key===c):null;l||(l=s()),l.anchor=r,l.key=c,l.t=0,l.ms=o,l.el.textContent=a,l.el.hidden=!1,l.el.classList.remove("pudar")},get texts(){return e.filter(r=>r.anchor).map(r=>r.el.textContent)},update(r){const a=window.innerWidth,o=window.innerHeight;for(const c of e){if(!c.anchor)continue;c.t+=r*1e3;const l=c.anchor();if(!l||c.t>c.ms){c.anchor=null,c.el.hidden=!0;continue}const u=t.position.distanceTo(n.set(l.x,l.y,l.z))>90;n.project(t);const h=n.z>1||n.x<-1.1||n.x>1.1||n.y<-1.1||n.y>1.1||u;c.el.style.visibility=h?"hidden":"visible",!h&&(c.el.style.transform=`translate(${(n.x+1)/2*a}px, ${(1-n.y)/2*o}px) translate(-50%, -100%)`,c.ms-c.t<400&&c.el.classList.add("pudar"))}},clear(){for(const r of e)r.anchor=null,r.el.hidden=!0}}}function GS(i,t){const e=i.querySelector(".isi"),n=i.querySelector(".angka");let s=-1;return{set(r,a){const o=Math.ceil(r);o!==s&&(s=o,e.style.width=`${100*Math.max(0,r)/a}%`,n.textContent=`${o}`,i.classList.toggle("kritis",r<a*.3))},hurt(){t.classList.remove("kena"),t.offsetWidth,t.classList.add("kena")}}}const VS=12,hd={Digit1:"cincang",KeyQ:"cincang",Digit2:"hentak",KeyE:"hentak",Digit3:"putar",KeyR:"putar",Digit4:"penggal",KeyT:"penggal"},WS=800;function XS({canvas:i,jumpButton:t,attackButton:e,skillButtons:n,touch:s}){const r=new Set;let a=!0,o=!1,c=!1,l=null,u=0,h=1;const d=[],f=new Map;let g=0;function x(){const[S,T]=[...f.values()];return Math.hypot(S.x-T.x,S.y-T.y)}i.addEventListener("contextmenu",S=>S.preventDefault()),i.addEventListener("pointerdown",S=>{var T;if(a&&!(S.pointerType==="mouse"&&S.button!==0&&S.button!==2)){if(f.set(S.pointerId,{x:S.clientX,y:S.clientY,sx:S.clientX,sy:S.clientY,t:S.timeStamp,moved:S.pointerType==="mouse"&&S.button===2}),f.size===2){g=x();for(const L of f.values())L.moved=!0}(T=i.setPointerCapture)==null||T.call(i,S.pointerId)}}),i.addEventListener("pointermove",S=>{const T=f.get(S.pointerId);if(T&&(f.size===1&&(!T.moved&&Math.hypot(S.clientX-T.sx,S.clientY-T.sy)>VS&&(T.moved=!0),T.moved&&(u+=S.clientX-T.x)),T.x=S.clientX,T.y=S.clientY,f.size===2)){const L=x();g>0&&L>0&&(h*=g/L),g=L}});function m(S,T){const L=f.get(S.pointerId);L&&(T&&a&&!L.moved&&S.timeStamp-L.t<WS&&d.push({x:S.clientX,y:S.clientY}),f.delete(S.pointerId),g=f.size===2?x():0)}i.addEventListener("pointerup",S=>m(S,!0)),i.addEventListener("pointercancel",S=>m(S,!1)),i.addEventListener("lostpointercapture",S=>m(S,!1)),i.addEventListener("wheel",S=>{a&&(S.preventDefault(),h*=Math.exp(S.deltaY*.0012))},{passive:!1});function p(S,T){S.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),a&&T(),S.classList.add("ditekan")});for(const L of["pointerup","pointercancel","pointerleave"])S.addEventListener(L,()=>S.classList.remove("ditekan"))}p(t,()=>{o=!0}),p(e,()=>{c=!0});for(const[S,T]of Object.entries(n))p(T,()=>{l=S});const M=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"];window.addEventListener("keydown",S=>{!a||S.target instanceof HTMLInputElement||(M.includes(S.code)&&S.preventDefault(),S.code==="Space"&&!S.repeat&&(o=!0),S.code==="KeyF"&&!S.repeat&&(c=!0),hd[S.code]&&!S.repeat&&(l=hd[S.code]),r.add(S.code))}),window.addEventListener("keyup",S=>r.delete(S.code));function v(){r.clear(),f.clear(),g=0}window.addEventListener("blur",v),document.addEventListener("visibilitychange",v);const _=(...S)=>S.some(T=>r.has(T));return{read(){let S=0,T=0;const L=_("KeyD","ArrowRight")-_("KeyA","ArrowLeft"),G=_("KeyW","ArrowUp")-_("KeyS","ArrowDown");if(L||G){const A=Math.hypot(L,G),U=_("ShiftLeft","ShiftRight")?.45:1;S=L/A*U,T=G/A*U}const E={moveX:S,moveY:T,jump:o,attack:c,skill:l,lookDX:u,zoom:h,taps:d.splice(0)};return o=!1,c=!1,l=null,u=0,h=1,E},setEnabled(S){a=S,S||v();for(const T of[t,e,...Object.values(n)])T.hidden=!S||!s}}}const jS=.006,zc=10,fd=60,YS=22,dd=.85,KS=1.12,qS=.8,Dc=.3;function ZS(i,t){const e={yaw:0,dist:YS},n=new V,s=new V;let r=!0,a=0,o=0;const c=()=>dd+(KS-dd)*(e.dist-zc)/(fd-zc);return{state:e,get yaw(){return e.yaw},lookFrom(l,u=!0){e.yaw=l,r=u},shake(l){o=Math.max(o*(a/Dc),l),a=Dc},update(l,u,h){e.yaw-=h.lookDX*jS,e.dist=bi.clamp(e.dist*h.zoom,zc,fd);const d=u.x,f=u.y+qS,g=u.z;if(r)n.set(d,f,g);else{const M=1-Math.exp(-10*l);n.x+=(d-n.x)*M,n.z+=(g-n.z)*M,n.y+=(f-n.y)*(1-Math.exp(-5*l))}const x=c(),m=Math.cos(x);s.set(n.x+Math.sin(e.yaw)*m*e.dist,n.y+Math.sin(x)*e.dist,n.z+Math.cos(e.yaw)*m*e.dist);const p=Math.max(t.surfaceAt(s.x,s.z),0)+3;if(s.y<p&&(s.y=p),r?i.position.copy(s):i.position.lerp(s,1-Math.exp(-10*l)),a>0){a=Math.max(0,a-l);const M=2*o*(a/Dc);i.position.x+=(Math.random()-.5)*M,i.position.y+=(Math.random()-.5)*M,i.position.z+=(Math.random()-.5)*M}i.lookAt(n),r=!1}}}function $S(i,t){return new Xe({color:i,transparent:!0,opacity:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}const pd=new V(0,1,0),kc=new V;function JS(i,t,e,n,s){const a=Math.max(t.surfaceAt(e,n),0);kc.set(-(t.surfaceAt(e+.6,n)-t.surfaceAt(e-.6,n))/(2*.6),1,-(t.surfaceAt(e,n+.6)-t.surfaceAt(e,n-.6))/(2*.6)).normalize(),a<=.001&&kc.copy(pd),i.position.set(e,a+s,n),i.quaternion.setFromUnitVectors(pd,kc)}function QS(i){const t=new Pe,e=$S("#ffe26a",.95),n=new ie(new Io(.5,.72,40).rotateX(-Math.PI/2),e),s=new ie(new ou(.15,20).rotateX(-Math.PI/2),e);t.add(n,s),t.visible=!1,t.renderOrder=10,n.renderOrder=10,s.renderOrder=10;let r=0,a=!1;return{objects:[t],showTarget(o,c,l=!0){JS(t,i,o,c,.06),e.color.set(l?"#ffe26a":"#ff5a5a"),e.opacity=.95,t.visible=!0,a=!l,r=0},hideTarget(){a||(t.visible=!1)},update(o){if(!t.visible)return;r+=o;const c=1+.14*Math.sin(r*7);n.scale.setScalar(c),a&&(e.opacity=Math.max(0,.95-r*1.2),r>.8&&(t.visible=!1,a=!1))}}}const Or=60,tA=12,md={pohon:["#6b4423","#8a5a2e","#a8743f","#4f8f2f","#6fb03a"],batu:["#7d7a74","#a19d96","#c9c5bd","#ffd27a"],debu:["#d8c497","#c4ab7a","#a88f63","#e6d8b0"],bata:["#9c4a30","#b8603c","#7e3a26","#d9b48a"],kayu:["#6b4423","#8a5a2e","#a8743f","#c99a5f"],prajurit:["#c9cfdc","#eef1f7","#ffd27a","#8a5a2e"]},so=(i={})=>new Xe({transparent:!0,opacity:0,depthWrite:!1,side:on,toneMapped:!1,...i});function eA(i,t,e,n){const s=[],r=[],a=[];for(let c=0;c<=n;c++){const l=c/n,u=-i/2+i*l,h=Math.sin(Math.PI*l),d=t-e*h,f=Math.pow(h,.7);if(s.push(Math.sin(u)*t,0,Math.cos(u)*t,Math.sin(u)*d,0,Math.cos(u)*d),r.push(1,1,1,f,1,1,1,f*.15),c<n){const g=c*2;a.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new fe;return o.setAttribute("position",new Xt(s,3)),o.setAttribute("color",new Xt(r,4)),o.setIndex(a),o}function nA(i){const t=[[.55,1,0],[.84,1,1],[1,.12,.55]],e=[],n=[],s=[];for(let a=0;a<=i;a++){const o=a/i*Math.PI*2;for(const[c,l,u]of t)e.push(Math.sin(o)*c,0,Math.cos(o)*c),n.push(l,l,l,u);if(a<i)for(let c=0;c<t.length-1;c++){const l=a*t.length+c,u=l+t.length;s.push(l,u,l+1,l+1,u,u+1)}}const r=new fe;return r.setAttribute("position",new Xt(e,3)),r.setAttribute("color",new Xt(n,4)),r.setIndex(s),r}function iA(){const i=new fe;return i.setAttribute("position",new Xt([-.5,0,0,.5,0,0,-.5,0,1,.5,0,1],3)),i.setAttribute("color",new Xt([1,1,1,0,1,1,1,0,1,1,1,.9,1,1,1,.9],4)),i.setIndex([0,1,2,1,3,2]),i}function sA(){const i=[],t=[],e=[];for(let r=0;r<=8;r++){const a=r/8,o=Math.sin(Math.PI*a);i.push(a-.5,0,-.04,a-.5,0,.04),t.push(1,1,1,o,1,1,1,o),r<8&&e.push(r*2,r*2+1,r*2+2,r*2+1,r*2+3,r*2+2)}const s=new fe;return s.setAttribute("position",new Xt(i,3)),s.setAttribute("color",new Xt(t,4)),s.setIndex(e),s}const Nc=9,rA=new _e().setFromAxisAngle(new V(1,0,0),Math.PI/2);function aA(i){const t=new Pe;t.name="efek-serangan";const e={slashes:0,spins:0,pulses:0,streaks:0,bursts:0,cracks:0,cuts:0,sparks:0,lastKind:null,lastMove:null};function n(b,z,N,y,B,O){const k=eA(z,N,y,40),R=Array.from({length:b},()=>{const I=so({vertexColors:!0}),C=new ie(k,I);return C.visible=!1,C.renderOrder=8,t.add(C),{mesh:C,mat:I,t:0,heading:0,dir:1,tilt:0}});let H=0;return{show(I,C,Z,Q,et=1,gt=0){const xt=R[H];H=(H+1)%b,xt.mesh.position.set(I,C,Z),Object.assign(xt,{t:0,heading:Q,dir:et,tilt:gt}),xt.mesh.visible=!0},update(I){for(const C of R){if(!C.mesh.visible)continue;C.t+=I;const Z=C.t/B;if(Z>=1){C.mesh.visible=!1;continue}C.mesh.rotation.set(C.tilt,C.heading+(Z-.5)*O*C.dir,0,"YXZ"),C.mesh.scale.setScalar(.85+.3*Z),C.mat.opacity=.95*Math.pow(1-Z,1.3)}}}}const s=n(4,Math.PI*.85,1.35,.6,.22,.9),r=n(1,Math.PI*1.85,2.3,1,.34,2.6),a=nA(48),o=Array.from({length:12},()=>{const b=so({vertexColors:!0}),z=new ie(a,b);return z.visible=!1,z.renderOrder=8,t.add(z),{mesh:z,mat:b,t:0,time:1,r0:0,r1:1,alpha:1}});let c=0;function l(b,z,N,y,B,O,k,R,H=null){const I=o[c];c=(c+1)%o.length,I.mesh.position.set(b,z,N),H?I.mesh.quaternion.copy(H).multiply(rA):I.mesh.quaternion.identity(),I.mat.color.set(k),Object.assign(I,{t:0,time:O,r0:y,r1:B,alpha:R}),I.mesh.scale.setScalar(y),I.mesh.visible=!0,e.pulses++}const u=iA(),h=Array.from({length:7},()=>{const b=so({vertexColors:!0}),z=new ie(u,b);return z.visible=!1,z.renderOrder=7,t.add(z),{mesh:z,mat:b,t:0}}),d=.5,f=Array.from({length:2},()=>{const b=new fe;b.setAttribute("position",new Xt(new Float32Array(Nc*9),3));const z=new Xe({color:"#2b1d12",transparent:!0,opacity:0,depthWrite:!1,side:on}),N=new ie(b,z);return N.visible=!1,N.frustumCulled=!1,N.renderOrder=6,t.add(N),{mesh:N,mat:z,t:0}});let g=0;const x=1.6;function m(b,z){const N=f[g];g=(g+1)%f.length;const y=N.mesh.geometry.attributes.position,B=.05;for(let O=0;O<Nc;O++){const k=O/Nc*Math.PI*2+(Math.random()-.5)*.5,R=1.3+Math.random()*1.6,H=.07+Math.random()*.05,I=b+Math.sin(k)*.15,C=z+Math.cos(k)*.15;[[I+Math.cos(k)*H,C-Math.sin(k)*H],[I-Math.cos(k)*H,C+Math.sin(k)*H],[b+Math.sin(k)*R,z+Math.cos(k)*R]].forEach(([Q,et],gt)=>y.setXYZ(O*3+gt,Q,Math.max(i.surfaceAt(Q,et),0)+B,et))}y.needsUpdate=!0,N.t=0,N.mesh.visible=!0,e.cracks++}const p=sA(),M=Array.from({length:5},()=>{const b=so({vertexColors:!0,depthTest:!1}),z=new ie(p,b);return z.visible=!1,z.renderOrder=14,t.add(z),{mesh:z,mat:b,t:0}});let v=0;const _=.4,S=new Ss(new Yn(.21,.21,.21),new Xe,Or);S.instanceMatrix.setUsage(In),S.frustumCulled=!1,S.visible=!1,t.add(S);const T=Array.from({length:Or},()=>({alive:!1,t:0,life:1,size:1,spin:1,floor:0,p:new V,v:new V})),L=new Le,G=new Ut,E=new Ot().makeScale(0,0,0);for(let b=0;b<Or;b++)S.setMatrixAt(b,E),S.setColorAt(b,G.set("#ffffff"));let A=0,U=0;function Y(b,z,N,y,B,O,k,R){const H=md[y]||md.batu;for(let I=0;I<B;I++){const C=T[A];C.alive=!0,C.t=0,C.life=.45+Math.random()*.4,C.size=.6+Math.random()*.7,C.spin=(Math.random()-.5)*24,C.floor=R;const Z=O===null?Math.random()*Math.PI*2:O+(Math.random()-.5)*k,Q=1.5+Math.random()*3;C.p.set(b,z,N),C.v.set(Math.sin(Z)*Q,1.5+Math.random()*3.5,Math.cos(Z)*Q),S.setColorAt(A,G.set(H[I%H.length])),A=(A+1)%Or}S.instanceColor.needsUpdate=!0,S.visible=!0,e.bursts++,e.lastKind=y}function X(b,z,N,y,B){const O=z-b.x,k=N-b.z,R=Math.hypot(O,k)||1,H=b.x+O/R*b.radius,I=b.z+k/R*b.radius;Y(H,y,I,b.kind,B,Math.atan2(O,k),2.4,i.surfaceAt(H,I))}let J=new _e;return{object:t,stats:()=>({...e,alive:U}),attack(b,z=[],N=[]){const y=b.origin;if(e.lastMove=b.move,b.type==="dash"){const H=b.path;for(let I=0;I+1<H.length&&I<h.length;I++){const C=H[I],Z=H[I+1],Q=Math.hypot(Z.x-C.x,Z.z-C.z);if(Q<.3)continue;const et=h[I];et.mesh.position.set(C.x,b.y,C.z),et.mesh.rotation.y=Math.atan2(Z.x-C.x,Z.z-C.z),et.mesh.scale.set(.7,1,Q),et.mesh.visible=!0,et.t=-I*.04}e.streaks++;return}if(b.type!=="hit")return;const{x:B,y:O,z:k}=b;let R=14;if(b.chop)s.show(y.x,O,y.z,b.heading,b.swing,(Math.random()-.5)*.5),e.slashes++,R=6;else if(b.move==="tebas")s.show(y.x,O,y.z,b.heading),e.slashes++;else if(b.move==="tinju")l(B,O,k,.15,.7,.2,"#ffffff",1),R=8;else if(b.move==="tendang"){l(B,O,k,.2,.95,.24,"#ffe3a0",1);const H=i.surfaceAt(B,k);H>-.3&&Y(B,Math.max(H,0)+.15,k,"debu",5,b.heading,1.6,H),R=10}else if(b.spin)r.show(y.x,O,y.z,b.heading),e.spins++,R=10;else if(b.plant){const H=i.surfaceAt(y.x,y.z),I=Math.max(H,0)+.08;m(b.plant.x,b.plant.z),l(b.plant.x,I+.05,b.plant.z,.1,1.2,.25,"#ffffff",1),l(y.x,I,y.z,.4,4,.5,"#fff6dc",.9),l(y.x,I+.02,y.z,.2,2.5,.35,"#ffffff",.7),Y(b.plant.x,I+.1,b.plant.z,"debu",16,null,0,H),R=8}for(const H of z)X(H,y.x,y.z,b.plant?O+.5:O,R);for(const H of N)l(H.x,H.y+1,H.z,.1,.65,.16,"#fff3c0",1,J),e.sparks++},execute(b,z){for(const N of b){const y=M[v];v=(v+1)%M.length,y.mesh.position.set(N.x,N.y+.85,N.z),y.mesh.rotation.set(0,Math.atan2(N.x-z.x,N.z-z.z)+Math.PI/2+(Math.random()-.5)*.5,0),y.t=0,y.mesh.visible=!0,l(N.x,N.y+.85,N.z,.1,.8,.2,"#ffffff",1,J),e.cuts++}},update(b,z){z&&(J=z.quaternion),s.update(b),r.update(b);for(const N of o){if(!N.mesh.visible)continue;N.t+=b;const y=N.t/N.time;if(y>=1){N.mesh.visible=!1;continue}const B=1-Math.pow(1-y,3);N.mesh.scale.setScalar(N.r0+(N.r1-N.r0)*B),N.mat.opacity=N.alpha*(1-y)}for(const N of h){if(!N.mesh.visible)continue;N.t+=b;const y=Math.max(0,N.t)/d;y>=1?N.mesh.visible=!1:N.mat.opacity=.95*(1-y)}for(const N of f){if(!N.mesh.visible)continue;N.t+=b;const y=N.t/x;y>=1?N.mesh.visible=!1:N.mat.opacity=.75*Math.min(1,(1-y)*2.5)}for(const N of M){if(!N.mesh.visible)continue;N.t+=b;const y=N.t/_;if(y>=1){N.mesh.visible=!1;continue}N.mesh.scale.set(.5+1.1*Math.min(1,y*3),1,1+2*(1-y)),N.mat.opacity=Math.min(1,(1-y)*2)}if(S.visible){U=0;for(let N=0;N<Or;N++){const y=T[N];if(y.alive){if(y.t+=b,y.t>=y.life){y.alive=!1,S.setMatrixAt(N,E);continue}U++,y.v.y-=tA*b,y.p.addScaledVector(y.v,b),y.p.y<y.floor+.05&&(y.p.y=y.floor+.05,y.v.set(y.v.x*.5,0,y.v.z*.5)),L.position.copy(y.p),L.rotation.set(y.t*y.spin,y.t*y.spin*.7,0),L.scale.setScalar(y.size*(1-Math.pow(y.t/y.life,3))),L.updateMatrix(),S.setMatrixAt(N,L.matrix)}}S.instanceMatrix.needsUpdate=!0,U||(S.visible=!1)}}}}const Uc={tebas:{clip:"attack-melee-right",speed:.9,hit:.24,reach:1,radius:.7,y:.9,damage:1,knock:2.5},tinju:{clip:"attack-melee-left",speed:1,hit:.21,reach:.8,radius:.55,y:1,damage:1,knock:2.5},tendang:{clip:"attack-kick-right",speed:1,hit:.27,reach:.95,radius:.65,y:.45,damage:2,knock:4}},Oc=["tebas","tinju","tendang"],oA=.7,Ul={cincang:6,hentak:7,putar:5,penggal:15},cA=["attack-melee-right","attack-melee-left","attack-kick-right"],$n={time:.14,from:.1,speed:2.9,hit:.05,reach:1.1,radius:.95,damage:1,knock:.8,advance:.9},lA=10,Hi={chops:3,time:.55,hit:.3,radius:2.4,damage:2,knock:6},Jn={up:9.5,forward:2.2,radius:3.3,plant:.75,damage:3,knock:7,stuck:.35,recover:.35},fs={range:14,max:5,aim:.55,seg:.08,pause:.35,recover:.3,past:1.6},uA=.15,gd=.45,hA=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function fA(i){let t=null,e=0,n=0,s=null;const r={cincang:0,hentak:0,putar:0,penggal:0};let a=()=>{},o={pickTargets:()=>[],position:()=>null,standable:()=>!0};const c=()=>({x:Math.sin(i.heading),z:Math.cos(i.heading)});function l(v,_){a({type:v,move:t.name,heading:i.heading,origin:{x:i.pos.x,z:i.pos.z},..._})}function u(v,_,S,T,L,G={}){const E=c();l("hit",{x:i.pos.x+E.x*v,z:i.pos.z+E.z*v,r:_,y:i.pos.y+S,damage:T,knock:L,...G})}function h(v,_,S,T,L={}){l("hit",{x:i.pos.x,z:i.pos.z,r:v,y:i.pos.y+_,damage:S,knock:T,area:!0,...L})}function d(v,_,S,T){const L=i.clipLength(_);t={name:v,t:0,dur:L?L/S:gd,hitAt:L?T/S:gd*.55,struck:!1},i.playClip(_,S)}function f(){t.t=0,t.struck=!1,i.playClip("attack-melee-right",$n.speed,$n.from)}function g(v){if(v==="pukul"){e=n>0?(e+1)%Oc.length:0;const _=Uc[Oc[e]];d(Oc[e],_.clip,_.speed,_.hit)}else{if(!(v in Ul)||r[v]>0)return!1;if(v==="cincang")t={name:"cincang",phase:"cincang",n:0,of:lA},f();else if(v==="putar")t={name:"putar",phase:"cincang",n:0,of:Hi.chops},f();else if(v==="hentak"){if(!i.grounded||i.depthAt(i.pos.x,i.pos.z)>.9)return!1;const _=c();i.launch(_.x*Jn.forward,Jn.up,_.z*Jn.forward),t={name:"hentak",phase:"naik",t:0},i.pose("attack-melee-right",.16)}else{const _=o.pickTargets(i.pos.x,i.pos.z,fs.range,fs.max);if(!_.length)return a({type:"gagal",move:"penggal",reason:"musuh"}),!1;t={name:"penggal",phase:"bidik",t:0,ids:_.map(S=>S.id)},i.heading=Math.atan2(_[0].x-i.pos.x,_[0].z-i.pos.z),i.pose("attack-melee-right",.14),l("aim",{targets:t.ids})}r[v]=Ul[v],n=0}return i.stopWalking(),!0}function x(){const v=t.name in Uc;t=null,n=v?oA:0;const _=s;s=null,_&&g(_)}function m(){if(!t.struck&&t.t>=$n.hit&&(t.struck=!0,u($n.reach,$n.radius,.9,$n.damage,$n.knock,{swing:t.n%2?-1:1,chop:t.n+1})),!(t.t<$n.time))if(t.n++,t.n<t.of)f();else if(t.name==="putar"){const v=i.clipLength("attack-melee-right");Object.assign(t,{phase:"putar",t:0,struck:!1,h0:i.heading}),i.playClip("attack-melee-right",v?v/Hi.time:1)}else Object.assign(t,{phase:"pulih",t:0})}function p(){const v=[{x:i.pos.x,z:i.pos.z}];for(const L of t.ids){const G=o.position(L);G&&v.push(G)}if(v.length<2)return v;const _=v[v.length-2],S=v[v.length-1],T=Math.hypot(S.x-_.x,S.z-_.z)||1;for(const L of[fs.past,1,.6]){const G=S.x+(S.x-_.x)/T*L,E=S.z+(S.z-_.z)/T*L;if(o.standable(G,E)){v.push({x:G,z:E});break}}return v}function M(v){t.t+=v;const{name:_,phase:S}=t;if(S==="cincang"){m();return}if(S==="pulih"){t.t>=(_==="hentak"?Jn.recover:_==="penggal"?fs.recover:uA)&&x();return}if(_==="putar"){i.heading=t.h0+hA(.04,Hi.time-.08,t.t)*Math.PI*2,!t.struck&&t.t>=Hi.hit&&(t.struck=!0,h(Hi.radius,.85,Hi.damage,Hi.knock,{spin:!0})),t.t>=Hi.time&&(i.heading=t.h0,x());return}if(_==="hentak"){if(S==="naik"&&i.vel.y<0)t.phase="turun",i.pose("attack-melee-right",.27),i.swordDown(!0);else if(S==="turun"&&i.grounded&&t.t>.15||t.t>2.5){const T=c(),L={x:i.pos.x+T.x*Jn.plant,z:i.pos.z+T.z*Jn.plant};i.crouch(.28),h(Jn.radius,.05,Jn.damage,Jn.knock,{plant:L}),Object.assign(t,{phase:"tancap",t:0})}else S==="tancap"&&t.t>=Jn.stuck&&(i.crouch(0),i.swordDown(!1),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(_==="penggal"){if(S==="bidik"&&t.t>=fs.aim&&(t.path=p(),Object.assign(t,{phase:"kilat",t:0})),t.phase==="kilat"){const T=t.path,L=Math.min(t.t/fs.seg,T.length-1),G=Math.min(Math.floor(L),T.length-2);if(G>=0){const E=T[G],A=T[G+1],U=L-G;i.teleport(E.x+(A.x-E.x)*U,E.z+(A.z-E.z)*U),i.heading=Math.atan2(A.x-E.x,A.z-E.z)}L>=T.length-1&&(l("dash",{path:T,y:i.pos.y+.9}),i.pose("attack-melee-right",.33),Object.assign(t,{phase:"diam",t:0}))}else S==="diam"&&t.t>=fs.pause&&(l("execute",{targets:t.ids}),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(!t.struck&&t.t>=t.hitAt){t.struck=!0;const T=Uc[_];u(T.reach,T.radius,T.y,T.damage,T.knock,{swing:1})}t.t>=t.dur&&x()}return{cooldown:r,get busy(){return t!==null},get current(){return t?t.name:null},get phase(){return t&&t.phase||null},onEvent(v){a=v},setArena(v){o=v},drive(){if(!t)return null;if(t.name==="hentak"&&(t.phase==="naik"||t.phase==="turun"))return{keep:!0};if(t.phase==="cincang"){const v=c();return{vx:v.x*$n.advance,vz:v.z*$n.advance}}return{vx:0,vz:0,instant:t.name==="penggal"}},update(v,_){for(const T in r)r[T]=Math.max(0,r[T]-v);!t&&n>0&&(n-=v);const S=_.skill||(_.attack?"pukul":null);S&&t?s=S:S&&g(S),t&&M(v)},reset(){t&&(i.swordDown(!1),i.crouch(0)),t=null,s=null,n=0}}}const dA=2.3,pA=.35,ro=2,xd=5.6,mA=26,gA=8,xA=21,_A=7.2,vA=.12,yA=.15,MA=1.3,bA=.35,_d=1.3,SA=30,Xr=100,vd={delay:6,rate:5},Fc={hand:[-.265,0,.068],blade:[-.45,0,.9],grip:.05};async function AA(i,t,e){var n;try{const s=(await t(e)).scene,r=new V().fromArray(Fc.blade).normalize();s.quaternion.setFromUnitVectors(new V(0,-1,0),r),s.position.fromArray(Fc.hand).addScaledVector(r,Fc.grip),(n=i.getObjectByName("arm-right"))==null||n.add(s),Object.defineProperty(i.userData,"sword",{value:s,enumerable:!1})}catch(s){console.warn("Senjata gagal dimuat:",s)}}async function yd(i,t,e=null){const n=new Cl,s=o=>typeof o=="string"?n.loadAsync(o):n.parseAsync(o,""),r=await s(i),a=r.scene;return a.scale.setScalar(dA),e&&await AA(a,s,e),a.traverse(o=>{if(!o.isMesh)return;const c=o.material;o.material=new qn({map:c.map}),c.dispose(),o.castShadow=t.shadows,o.receiveShadow=t.shadows,o.frustumCulled=!1}),{model:a,clips:r.animations}}function wA(i){const t=new Pe,e=new ie(new au(.3,.6,4,8),new qn({color:"#3f8f4a"}));e.position.y=.6;const n=new ie(new Lo(.26,12,8),new qn({color:"#e0b48a"}));return n.position.y=1.32,t.add(e,n),t.traverse(s=>{s.castShadow=i.shadows}),t}function TA({ground:i,colliders:t,quality:e,asset:n}){const s=new Pe;s.name="pemain";const r=n?n.model:wA(e);s.add(r);const a=n?new pu(r):null,o={},c=["jump","die",...cA];if(a)for(const $ of["idle","walk","sprint","fall",...c]){const rt=Ms.findByName(n.clips,$);if(!rt)continue;const F=a.clipAction(rt);c.includes($)&&(F.setLoop(Kl,1),F.clampWhenFinished=!0),o[$]=F}let l=null;function u($,rt=.15){const F=o[$];!F||l===F||(F.reset().play(),l&&F.crossFadeFrom(l,rt,!1),l=F)}u("idle");let h=null;if(!e.shadows){const $=document.createElement("canvas");$.width=$.height=64;const rt=$.getContext("2d"),F=rt.createRadialGradient(32,32,0,32,32,32);F.addColorStop(0,"rgba(0,0,0,0.5)"),F.addColorStop(1,"rgba(0,0,0,0)"),rt.fillStyle=F,rt.fillRect(0,0,64,64),h=new ie(new bn(1.2,1.2).rotateX(-Math.PI/2),new Xe({map:new hy($),transparent:!0,depthWrite:!1})),h.renderOrder=2}const d=s.position,f=new V,g=new V;let x=0,m=0,p=!0,M=0,v=0,_=0,S=0,T=0,L=()=>{},G=!1,E=Xr,A=0,U=!1,Y=()=>{},X=()=>{};const J=[];let b=0,z=1/0;function N(){for(;J.length;){const ft=J[0];if(Math.hypot(ft.x-d.x,ft.z-d.z)>(J.length>1?.8:.25))break;J.shift(),z=1/0,b=0}if(!J.length)return null;const $=J[0].x-d.x,rt=J[0].z-d.z,F=Math.hypot($,rt);let dt=F;for(let ft=1;ft<J.length;ft++)dt+=Math.hypot(J[ft].x-J[ft-1].x,J[ft].z-J[ft-1].z);const At=Math.min(dt>7?xd:ro*1.4,.8+dt*2.2);return{dx:$/F,dz:rt/F,speed:At}}const y={x:0,z:0,len:0};function B($,rt){return y.x=(i.surfaceAt($+.5,rt)-i.surfaceAt($-.5,rt))/(2*.5),y.z=(i.surfaceAt($,rt+.5)-i.surfaceAt($,rt-.5))/(2*.5),y.len=Math.hypot(y.x,y.z),y}function O($,rt,F){d.set($,i.surfaceAt($,rt),rt),f.set(0,0,0),x=F,s.rotation.y=F,p=!0,S=0,d.y>.4&&(g.copy(d),m=F)}const k=r.userData.sword||null,R=k?k.quaternion.clone():null,H=r.getObjectByName("arm-right");let I=!1;const C=new _e,Z=new _e,Q=new _e().setFromAxisAngle(new V(1,0,0),-.3),et=new V(0,1,0);function gt(){if(k){if(!I){k.quaternion.copy(R);return}H.getWorldQuaternion(C),Z.setFromAxisAngle(et,x).multiply(Q),k.quaternion.copy(C.invert().multiply(Z))}}const xt=fA({pos:d,vel:f,get heading(){return x},set heading($){x=$},get grounded(){return p},depthAt:($,rt)=>Ie.seaLevel-i.surfaceAt($,rt),clipLength:$=>{var rt;return((rt=o[$])==null?void 0:rt.getClip().duration)||0},play:u,playClip($,rt,F=0){const dt=o[$];dt&&(dt.timeScale=rt,l===dt?dt.reset().play():u($,.06),dt.time=F)},pose($,rt){const F=o[$];F&&(l!==F&&u($,.06),F.time=rt,F.paused=!0)},release(){l&&(l.paused=!1)},launch($,rt,F){f.set($,rt,F),p=!1,M=0,_=0},teleport($,rt){d.set($,i.surfaceAt($,rt),rt),f.set(0,0,0),p=!0},swordDown($){I=$},crouch($){r.position.y=-$},stopWalking(){J.length=0}});function K($,rt,F){let dt=0,At=0,ft=0,w=0;const st=xt.drive();if(st)dt=st.vx||0,At=st.vz||0,w=1;else if(Math.abs(rt.moveX)+Math.abs(rt.moveY)>.01){J.length=0;const wt=-Math.sin(F),kt=-Math.cos(F),St=Math.cos(F),Et=-Math.sin(F);dt=St*rt.moveX+wt*rt.moveY,At=Et*rt.moveX+kt*rt.moveY;const Nt=Math.hypot(dt,At);ft=Math.min(1,Nt),dt/=Nt,At/=Nt,w=ft<.7?ro*(ft/.7):ro+(xd-ro)*(ft-.7)/.3}else{const wt=N();wt&&({dx:dt,dz:At,speed:w}=wt,ft=1)}const ut=Ie.seaLevel-i.surfaceAt(d.x,d.z);ut>bA&&!st&&(w*=.55);const D=(p?mA:gA)*$,P=dt*w,q=At*w,j=P-f.x,ht=q-f.z,lt=Math.hypot(j,ht);if(st!=null&&st.keep||(lt<=D||st!=null&&st.instant?(f.x=P,f.z=q):(f.x+=j/lt*D,f.z+=ht/lt*D)),ft>.05){let kt=Math.atan2(dt,At)-x;kt=Math.atan2(Math.sin(kt),Math.cos(kt)),x+=kt*Math.min(1,12*$)}M=p?vA:M-$,v=rt.jump?yA:v-$,v>0&&M>0&&ut<_d*.8&&!st&&(f.y=_A,p=!1,M=0,v=0,_=0,u("jump",.08)),f.y-=xA*$,d.x+=f.x*$,d.z+=f.z*$,d.y+=f.y*$,t.resolve(d,pA,f);const Mt=B(d.x,d.z);if(Mt.len>MA){const wt=Mt.x/Mt.len,kt=Mt.z/Mt.len,St=f.x*wt+f.z*kt;St>0&&(f.x-=St*wt,f.z-=St*kt,d.x-=St*wt*$,d.z-=St*kt*$),p&&(f.x-=wt*6*$,f.z-=kt*6*$)}const yt=i.surfaceAt(d.x,d.z);d.y<=yt?(d.y=yt,f.y<0&&(f.y=0),p=!0):p&&f.y<=0&&d.y-yt<.6?(d.y=yt,f.y=0):p=!1,p?_=0:_+=$}return{root:s,blob:h,get position(){return d},get heading(){return x},get speed(){return Math.hypot(f.x,f.z)},get grounded(){return p},get usingModel(){return!!n},get hasPath(){return J.length>0},get attacking(){return xt.busy},get hp(){return E},get defeated(){return U},damage($,rt){if(!(U||G)){if(E=Math.max(0,E-$),A=0,rt){const F=d.x-rt.x,dt=d.z-rt.z,At=Math.hypot(F,dt)||1;f.x+=F/At*3.5,f.z+=dt/At*3.5}Y($),E<=0&&(U=!0,J.length=0,xt.reset(),u("die",.1),X())}},revive(){E=Xr,A=0,U=!1,G=!1,u("idle",.05)},onHurt($){Y=$},onDefeated($){X=$},face($,rt){x=Math.atan2($-d.x,rt-d.z),s.rotation.y=x},get attackMove(){return xt.current},get attackPhase(){return xt.phase},get cooldowns(){return xt.cooldown},placeAt:O,followPath($){J.length=0,J.push(...$),z=1/0,b=0},stop(){J.length=0},onRespawnNeeded($){L=$},onAttack($){xt.onEvent($)},setArena($){xt.setArena($)},respawn(){O(g.x,g.z,m),J.length=0,xt.reset(),G=!1,u("idle",.05)},freeze(){G=!0,f.set(0,0,0)},update($,rt,F){if(U){a==null||a.update($);return}if(E<Xr&&(A+=$)>vd.delay&&(E=Math.min(Xr,E+vd.rate*$)),G||xt.update($,rt),!G){const w=xt.drive(),st=w&&!w.keep?Math.hypot(w.vx,w.vz):0,ut=Math.max(Math.hypot(f.x,f.z),st),D=Math.min(12,Math.max($>1/45?2:1,Math.ceil(ut*$/.3)));for(let P=0;P<D;P++)K($/D,P===0?rt:{...rt,jump:!1},F)}if(s.rotation.y=x,J.length&&!G&&!xt.busy){const w=Math.hypot(J[0].x-d.x,J[0].z-d.z);w<z-.25?(z=w,b=0):(b+=$)>1.2&&(J.shift(),z=1/0,b=0)}const dt=i.surfaceAt(d.x,d.z);S=Ie.seaLevel-dt>_d?S+$:0,!G&&S>.6?L("laut"):!G&&!yM(d.x,d.z,SA)&&L("jauh"),T+=$,T>.4&&p&&dt>.4&&B(d.x,d.z).len<.8&&(T=0,g.copy(d),m=x);const ft=Math.hypot(f.x,f.z);if(!xt.busy){let w=null;p?w=ft<.3?"idle":ft<3.6?"walk":"sprint":_>.12&&(w=f.y>0&&l===o.jump?"jump":"fall"),w&&u(w,.18)}if(o.walk&&(o.walk.timeScale=bi.clamp(ft/1.4,.6,1.6)),o.sprint&&(o.sprint.timeScale=bi.clamp(ft/3.6,.8,1.6)),a==null||a.update($),gt(),h){const w=d.y-dt;h.position.set(d.x,dt+.05,d.z),h.material.opacity=Math.max(0,1-w/3),h.scale.setScalar(1+w*.15)}}}}const ne=i=>document.getElementById(i);function la(i){ne("loading").hidden=!0,ne("error").hidden=!1,ne("error-teks").textContent=String(i)}window.addEventListener("error",i=>{var t;return la(((t=i.error)==null?void 0:t.stack)||i.message)});window.addEventListener("unhandledrejection",i=>{var t;return la(((t=i.reason)==null?void 0:t.stack)||i.reason)});function EA(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function En(i){ne("loading-teks").textContent=i}const Bn=()=>new Promise(i=>requestAnimationFrame(()=>setTimeout(i,0))),Md={rendah:"Rendah",sedang:"Sedang",tinggi:"Tinggi"};let bd=0;function js(i,t=2800){const e=ne("pesan");e.textContent=i,e.hidden=!1,clearTimeout(bd),bd=setTimeout(()=>{e.hidden=!0},t)}function RA(i,t){const e=Math.SQRT1_2;for(let n=140;n<280;n+=1){const s=-e*n,r=e*n,a=i.heightAt(s,r);if(a>.9&&a<2.2&&i.slopeAt(s,r)<.3&&t.isFree(s,r,.9))return{x:s,z:r,heading:Math.atan2(-s,-r)}}return{x:-128,z:128,heading:Math.atan2(128,-128)}}const CA="<b>Ketuk tanah</b> untuk berjalan ke sana (jauh = lari)<br>Geser: putar kamera · Cubit: zoom<br><b>Pukul</b> berulang = kombo · 4 tombol <b>jurus</b> · musuh orc ada di depan<br><b>Peta</b>: Kerajaan Kencana di barat (Jembatan Agung) — prajuritnya akan menanyaimu",PA="<b>Klik tanah</b> untuk berjalan ke sana · WASD / panah juga bisa<br>Seret mouse: putar kamera · Roda: zoom · Spasi: lompat<br>F: pukul (kombo) · 1–4: jurus Cincang, Hentak, Putar, Penggal<br>M: peta — Kerajaan Kencana di barat (Jembatan Agung), prajuritnya akan menanyaimu",IA={main:[55,42],lihat:[70,55]};function LA(){const i=ne("btn-kualitas"),t=ne("panel-kualitas");i.textContent=`Kualitas: ${Md[Re.level]}`,t.querySelectorAll("button[data-q]").forEach(e=>{e.classList.toggle("aktif",e.dataset.q===Re.level),e.addEventListener("click",()=>{if(e.dataset.q===Re.level){t.hidden=!0;return}t.hidden=!0,ne("loading").hidden=!1,En(`Mengganti kualitas ke ${Md[e.dataset.q]}…`),setTimeout(()=>iM(e.dataset.q),50)})}),i.addEventListener("click",()=>{t.hidden=!t.hidden,ne("saran").hidden=!0}),ne("btn-tutup-kualitas").addEventListener("click",()=>{t.hidden=!0})}async function zA(){if(!EA()){la(`Browser ini tidak mendukung WebGL 2.
Coba gunakan Chrome versi terbaru di Android.`);return}const i=ne("game"),t=new iy({canvas:i,antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,Re.maxPixelRatio)),t.outputColorSpace=Be,t.toneMapping=Ad,t.toneMappingExposure=1,Re.shadows&&(t.shadowMap.enabled=!0,t.shadowMap.type=Re.softShadows?Sd:Fl);const e=new po,n=new an(55,1,.5,5e3);En("Menyiapkan tekstur…"),await Bn();const s=rM(t),r={noiseTexture:s,quality:Re};En("Membuat langit dan cahaya…"),await Bn();const a=NM(e,r);En("Membentuk pulau-pulau…"),await Bn();const o=vf(Re.terrainSegments),c=SM(o,Re.water.shoreRes),l=pb(o),u=gb(l,o),h=CM(o,{...r,region:u});e.add(h),En("Menanam pohon dan menebar batu…"),await Bn();const d=new cM(8),f=vf(Re.terrainSegments,{heightFn:vp,rect:{minX:-500,maxX:500,minZ:-500,maxZ:500}}),g=HM({ground:f,grid:d,quality:Re,noiseTexture:s,reserved:u.reserved}),x=VM({ground:f,grid:d,quality:Re,reserved:u.reserved});e.add(g,x),En("Membangun Kerajaan Kencana…"),await Bn();const m=eS({ground:o,plan:l,mask:u,grid:d,quality:Re,noiseTexture:s});e.add(m.object),o.setSurfaces(m.surfaces),h.userData.applyOcclusion([...g.userData.occlusion,...x.userData.occlusion,...m.occlusion]);const p=$M([...g.userData.trunks,...x.userData.colliders.filter(nt=>nt.radius>=.8),...m.colliders]),M=nb(o,p);En("Menumbuhkan rumput…"),await Bn();const v=qM({ground:o,grid:d,quality:Re});e.add(v),En("Mengisi lautan…"),await Bn();const _=aM(t),S=zM({ground:o,shore:c,env:a,noiseTexture:s,normalTexture:_,quality:Re});e.add(S),En("Menyiapkan karakter…"),await Bn();const T=nt=>new URL(`models/${nt}`,document.baseURI).href;let L=null;try{L=await yd(T("prajurit.glb"),Re,T("pedang.glb"))}catch(nt){console.warn("Model karakter gagal dimuat:",nt)}let G=null;try{G=await yd(T("orc.glb"),Re)}catch(nt){console.warn("Model musuh gagal dimuat:",nt)}let E=null;if(L)try{const nt=await new Cl().loadAsync(T("bala.glb"));E=pS(nt)}catch(nt){console.warn("Model kuda & perisai gagal dimuat:",nt)}En("Menugaskan prajurit penjaga…"),await Bn();let A=null;if(L)try{A=wS({ground:o,colliders:p,nav:M,plan:l,spots:m.spots,quality:Re,soldier:L,shieldRect:(E==null?void 0:E.shieldRect)??null}),e.add(A.object)}catch(nt){console.warn("Prajurit penjaga gagal dibuat:",nt)}En("Mengundang penduduk kerajaan…"),await Bn();let U=null;try{const nt=await new Cl().loadAsync(T("penduduk.glb")),_t=A?m.spots.filter(Tt=>Tt.role!=="penjaga"):m.spots;U=oS({ground:o,routes:m.routes,spots:_t,quality:Re,villagerGltf:nt,soldier:A?null:L,scripted:A?2:0}),e.add(U.object)}catch(nt){console.warn("Penduduk gagal dimuat:",nt)}En("Membariskan 25.000 prajurit…"),await Bn();let Y=null;if(L&&E)try{Y=dS({ground:o,plan:l,quality:Re,soldier:L,bala:E,renderer:t,env:a}),e.add(Y.object)}catch(nt){console.warn("Bala tentara gagal dimuat:",nt)}const X=TA({ground:o,colliders:p,quality:Re,asset:L});e.add(X.root),X.blob&&e.add(X.blob);const J=RA(o,p);X.placeAt(J.x,J.z,J.heading);const b=G?hb({ground:o,colliders:p,nav:M,asset:G,spawn:J}):null;b&&e.add(b.object);let z=null;const N=nt=>A.list[Number(nt.slice(1))];X.setArena({pickTargets(nt,_t,Tt,Ft){const Qt=b?b.pickTargets(nt,_t,Tt,99).map(ge=>({...ge,id:`o${ge.id}`})):[];if(A&&(z==null?void 0:z.status)==="musuh")for(const ge of A.list)A.alive(ge)&&Math.hypot(ge.x-nt,ge.z-_t)<=Tt&&Qt.push({id:`s${ge.id}`,x:ge.x,z:ge.z});const Yt=Qt.sort((ge,Ue)=>Math.hypot(ge.x-nt,ge.z-_t)-Math.hypot(Ue.x-nt,Ue.z-_t)).slice(0,Ft),ue=[];let He=nt,mn=_t;for(;Yt.length;){let ge=0;for(let en=1;en<Yt.length;en++)Math.hypot(Yt[en].x-He,Yt[en].z-mn)<Math.hypot(Yt[ge].x-He,Yt[ge].z-mn)&&(ge=en);const[Ue]=Yt.splice(ge,1);ue.push(Ue),He=Ue.x,mn=Ue.z}return ue},position(nt){if(nt[0]==="o")return b?b.position(Number(nt.slice(1))):null;const _t=N(nt);return A.alive(_t)?{x:_t.x,z:_t.z}:null},standable:(nt,_t)=>M.walkableAt(nt,_t)&&p.isFree(nt,_t,.45)&&o.heightAt(nt,_t)>-.9});const y=nt=>nt.filter(_t=>_t[0]==="o").map(_t=>Number(_t.slice(1)));b&&A&&b.setFoes({near(nt,_t,Tt){const Ft=A.nearest(nt,_t,Tt);return Ft?{kind:"prajurit",ref:Ft}:null},pos:nt=>A.alive(nt.ref)?nt.ref:null,strike(nt,_t,Tt){_t.kind==="prajurit"?(A.damage(_t.ref,Tt,nt.pos),z==null||z.defend(_t.ref,nt.id)):X.damage(Tt,nt.pos)}});const B=navigator.maxTouchPoints>0||"ontouchstart"in window,O=ZS(n,o);O.lookFrom(J.heading+Math.PI);const k={cincang:ne("btn-cincang"),hentak:ne("btn-hentak"),putar:ne("btn-putar"),penggal:ne("btn-penggal")},R=XS({canvas:i,jumpButton:ne("btn-lompat"),attackButton:ne("btn-pukul"),skillButtons:k,touch:B}),H={moveX:0,moveY:0,jump:!1,attack:!1,skill:null,lookDX:0,zoom:1,taps:[]},I=QS(o);e.add(...I.objects);const C=aA(o);e.add(C.object),X.onAttack(nt=>{if(nt.type==="gagal"){js("Tidak ada musuh dalam jangkauan Penggal (±14 m).",1800);return}if(nt.type==="aim"){b==null||b.mark(y(nt.targets),!0);return}if(nt.type==="execute"){b==null||b.mark(y(nt.targets),!1);const _t=b?b.decapitate(y(nt.targets),X.position):[];for(const Tt of nt.targets){if(Tt[0]!=="s")continue;const Ft=N(Tt);A.alive(Ft)&&(_t.push({x:Ft.x,y:Ft.y,z:Ft.z}),A.knockDown(Ft,X.position))}C.execute(_t,X.position),_t.length&&O.shake(.22);return}if(nt.type==="hit"){const _t={x:nt.x,z:nt.z,r:nt.r},Tt=b?b.hit(_t,nt.damage,nt.knock,nt.origin):[],Ft=A?A.hit(_t,nt.damage,nt.knock,nt.origin):[];z==null||z.playerStruck(Ft);for(const Qt of Ft)Tt.push({x:Qt.x,y:Qt.y,z:Qt.z});C.attack(nt,p.hitAll(nt.x,nt.z,nt.r,5),Tt),nt.plant?O.shake(.4):Tt.length&&nt.spin&&O.shake(.12);return}C.attack(nt)});const Z={};function Q(){for(const[nt,_t]of Object.entries(k)){const Tt=X.cooldowns[nt],Ft=Tt>0?Math.ceil(Tt*10):0;Z[nt]!==Ft&&(Z[nt]=Ft,_t.style.setProperty("--cd",(Tt/Ul[nt]).toFixed(3)),_t.querySelector(".cd").textContent=Tt>0?Math.ceil(Tt):"",_t.classList.toggle("siap",Tt<=0))}}const et=new s1,gt=new Ct,xt=(nt,_t)=>Math.max(o.surfaceAt(nt,_t),Ie.seaLevel);function K(nt,_t){const Tt=i.getBoundingClientRect();gt.set((nt-Tt.left)/Tt.width*2-1,-((_t-Tt.top)/Tt.height)*2+1),et.setFromCamera(gt,n);const{origin:Ft,direction:Qt}=et.ray;let Yt=0,ue=0;for(;ue<1500;){const He=Ft.y+Qt.y*ue-xt(Ft.x+Qt.x*ue,Ft.z+Qt.z*ue);if(He<=0){let mn=Yt,ge=ue;for(let Ue=0;Ue<14;Ue++){const en=(mn+ge)/2;Ft.y+Qt.y*en>xt(Ft.x+Qt.x*en,Ft.z+Qt.z*en)?mn=en:ge=en}return{x:Ft.x+Qt.x*ge,z:Ft.z+Qt.z*ge}}Yt=ue,ue+=bi.clamp(He*.5,.3,25)}return null}function $(nt){if(X.defeated)return;const _t=K(nt.x,nt.y);if(!_t)return;const Tt=M.findPath(X.position,_t);if(Tt){X.followPath(Tt);const Ft=Tt[Tt.length-1];I.showTarget(Ft.x,Ft.z,!0),Nt()}else I.showTarget(_t.x,_t.z,!1),js("Tidak ada jalan ke sana.",1600)}const rt=new o1(n,i);rt.target.set(0,8,0),n.position.set(-260,140,330),rt.enabled=!1,rt.enableDamping=!0,rt.dampingFactor=.08,rt.minDistance=12,rt.maxDistance=1500,rt.maxPolarAngle=Math.PI*.47,rt.rotateSpeed=Re.isMobile?.6:.8,rt.zoomSpeed=.9,rt.screenSpacePanning=!1,rt.touches={ONE:Wi.ROTATE,TWO:Wi.DOLLY_PAN};function F(){const nt=Math.max(o.surfaceAt(n.position.x,n.position.z),Ie.seaLevel);n.position.y<nt+3&&(n.position.y=nt+3),rt.target.x=bi.clamp(rt.target.x,Kt.minX+50,Kt.maxX-50),rt.target.z=bi.clamp(rt.target.z,Kt.minZ+50,Kt.maxZ-50),rt.target.y=Math.max(o.surfaceAt(rt.target.x,rt.target.z),0)+3}let dt="main";const At=l.spans.find(nt=>nt.id==="agung"),ft=BS(ne("tanya")),w=HS(ne("gelembung"),n),st=GS(ne("nyawa"),ne("luka")),ut=Math.min(At.a,At.b)-11,D={start:{x:Math.max(At.a,At.b)+22,z:At.at+1.2},gate:{x:ut+3.2,z:At.at+.8},market:[{x:-421,z:At.at+1.2},{x:-461,z:At.at+2.5},{x:-466,z:51}]};A&&(z=DS({soldiers:A,enemies:b,player:X,dialog:ft,bubbles:w,villagers:U,visit:D,ground:o,message:js,setInput(nt){R.setEnabled(nt&&dt==="main"),ne("hud").classList.toggle("bertanya",!nt)}}));function P(){const nt=window.innerWidth,_t=window.innerHeight;t.setSize(nt,_t,!1),n.aspect=nt/_t,n.fov=IA[dt][nt<_t?0:1],n.updateProjectionMatrix()}window.addEventListener("resize",P),window.addEventListener("orientationchange",()=>setTimeout(P,200)),P();const q=ne("btn-layar-penuh");document.documentElement.requestFullscreen||(q.hidden=!0),q.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{q.textContent=document.fullscreenElement?"Keluar layar penuh":"Layar penuh"}),LA();function j(nt){const _t=dt;dt=nt;const Tt=dt==="main";if(rt.enabled=!Tt,R.setEnabled(Tt&&!ft.isOpen),ne("btn-mode").textContent=Tt?"Lihat pulau":"Main lagi",Tt&&_t==="lihat"){const Ft=X.position,Qt=n.position.x-Ft.x,Yt=n.position.z-Ft.z;O.lookFrom(Math.atan2(Qt,Yt),!1)}else Tt||(X.stop(),I.hideTarget(),rt.target.copy(X.position),rt.update());P()}ne("btn-mode").addEventListener("click",()=>j(dt==="main"?"lihat":"main"));const ht=OS({ground:o,plan:l,region:u,camps:b?b.camps:[]}),lt=FS({ground:o,spans:l.spans});function Mt(){ht.open?ht.hide():(ne("panel-kualitas").hidden=!0,Nt(),ht.show(X.position,X.heading))}ne("btn-peta").addEventListener("click",Mt),ne("btn-tutup-peta").addEventListener("click",()=>ht.hide()),ne("peta").addEventListener("click",nt=>{nt.target.id==="peta"&&ht.hide()}),window.addEventListener("keydown",nt=>{nt.code==="KeyM"&&!nt.repeat?Mt():nt.code==="Escape"&&ht.hide()}),j("main");const yt={x:Math.max(At.a,At.b)+14,z:At.at,heading:Math.PI/2};X.onHurt(()=>{st.hurt(),O.shake(.12)}),X.onDefeated(()=>{const nt=z?z.playerDefeated():!1;I.hideTarget(),setTimeout(()=>ne("tirai").classList.add("gelap"),1100),setTimeout(()=>{const _t=nt?yt:J;X.placeAt(_t.x,_t.z,_t.heading),X.revive(),O.lookFrom(X.heading+Math.PI),ne("tirai").classList.remove("gelap"),js(nt?"Kamu dikalahkan prajurit Kencana dan dibawa keluar dari wilayah kerajaan.":"Kamu pingsan dikeroyok orc… dan terbangun di pantai.",4200)},1600)});let wt=!1;X.onRespawnNeeded(nt=>{wt||(wt=!0,X.freeze(),ne("tirai").classList.add("gelap"),setTimeout(()=>{X.respawn(),O.lookFrom(X.heading+Math.PI),ne("tirai").classList.remove("gelap"),js(nt==="laut"?"Airnya terlalu dalam! Kamu kembali ke pantai.":"Terlalu jauh dari pulau. Kamu kembali ke pantai."),wt=!1},450))}),L||js("Model karakter gagal dimuat — memakai karakter sederhana.",5e3);const kt=ne("petunjuk");kt.innerHTML=B?CA:PA;let St=0,Et=!1;function Nt(){Et||(Et=!0,kt.style.opacity=0,setTimeout(()=>{kt.hidden=!0},1e3))}i.addEventListener("webglcontextlost",nt=>{nt.preventDefault(),la(`Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).
Muat ulang halaman, lalu pilih Kualitas: Rendah.`)});const It=new Wy;let Lt=0,qt=0,jt=0,Wt=0,tt=Re.level==="rendah",Pt=0;const vt=new V,bt={timeScale:1};t.setAnimationLoop(()=>{Pt++;const nt=Math.min(It.getDelta(),.1)*bt.timeScale,_t=It.elapsedTime;if(dt==="main"){const Tt=R.read();for(const ue of Tt.taps)$(ue);X.update(nt,Tt,O.yaw),U==null||U.pushOut(X.position),A==null||A.pushOut(X.position),X.hasPath||I.hideTarget();let Ft=X.position;if(ft.isOpen){const ue=n.matrixWorld.elements,He=window.innerHeight>window.innerWidth;let mn=He?n.position.x-X.position.x:ue[0],ge=He?n.position.z-X.position.z:ue[2];const Ue=Math.hypot(mn,ge)||1;mn/=Ue,ge/=Ue,vt.set(X.position.x+mn*5,X.position.y,X.position.z+ge*5),Ft=vt}O.update(nt,Ft,Tt),!Et&&(X.speed>.5||(St+=nt)>15)&&Nt(),Wn.a.value.copy(n.position),Wn.b.value.copy(X.position).y+=1;const Qt=X.position,Yt=m.roofs.find(ue=>Math.abs(Qt.x-ue.x)<ue.hx&&Math.abs(Qt.z-ue.z)<ue.hz);Wn.r.value+=((Yt?Yt.r:3.5)-Wn.r.value)*(1-Math.exp(-6*nt))}else X.update(nt,H,O.yaw),rt.update(),F(),Wn.r.value=0;I.update(nt),b==null||b.update(nt,n,X,dt==="main"?X.position:rt.target),lt.update(nt,X.position,dt==="main")&&Nt(),U==null||U.update(nt,n,dt==="main"?X.position:rt.target,X.position,dt==="main"?110:260),Y==null||Y.update(nt,n,dt==="main"?X.position:rt.target),z==null||z.update(nt),A==null||A.update(nt,{camera:n,focus:dt==="main"?X.position:rt.target,range:dt==="main"?110:260,player:X.position,playerVisible:!X.defeated,targetPos:z.targetPos}),w.update(nt),st.set(X.hp,Xr),C.update(nt,n),Q(),a.update(_t,n,dt==="main"?X.position:rt.target),xu.value=_t,g.userData.update(_t),m.update(_t),v.userData.update(n,_t),t.render(e,n),Lt++,qt+=nt,qt>=.5&&(ne("fps").textContent=`${Math.round(Lt/qt)} FPS · kualitas ${Re.level}`,Lt=0,qt=0),!tt&&_t>3&&(jt+=nt,Wt++,jt>6&&(tt=!0,Wt/jt<24&&(Nt(),ne("saran").hidden=!1,setTimeout(()=>{ne("saran").hidden=!0},9e3))))}),ne("loading").hidden=!0,ne("hud").hidden=!1,window.__pulau={renderer:t,scene:e,camera:n,controls:rt,ground:o,shore:c,quality:Re,trees:g,rocks:x,grass:v,water:S,env:a,kencana:m,region:u,plan:l,villagers:U,army:Y,worldMap:ht,banner:lt,player:X,cam:O,input:R,colliders:p,nav:M,markers:I,effects:C,enemies:b,soldiers:A,security:z,dialog:ft,bubbles:w,pickGround:K,setMode:j,getMode:()=>dt,frames:()=>Pt,debug:bt}}zA().catch(la);
